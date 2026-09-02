/* ============================================================
   njx-site.js — общие утилиты САЙТА njxui.dev.
   Не путать с public/js/njx.js — тот файл дистрибутив библиотеки
   и уходит в npm; сайтовые хелперы живут здесь.
   Подключается в BaseLayout безусловно, сразу после njx.js.
   ============================================================ */
(function () {
    'use strict';

    /**
     * Копирование в буфер с фоллбэком для не-secure контекста
     * (http://, file:// — там navigator.clipboard недоступен).
     * @returns {Promise<void>}
     */
    window.njxCopy = function (text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function (resolve, reject) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.cssText = 'position:fixed;left:-9999px';
            document.body.appendChild(ta);
            ta.select();
            try {
                if (document.execCommand('copy')) resolve();
                else reject(new Error('execCommand copy failed'));
            } catch (e) {
                reject(e);
            } finally {
                ta.remove();
            }
        });
    };

    /**
     * Копирование + временный «Copied!»-фидбек на кнопке/элементе.
     * idle-состояние снимается с innerHTML в момент клика, поэтому
     * повторный клик во время фидбека не «запомнит» надпись Copied.
     *
     * opts:
     *   done        innerHTML на время фидбека (по умолчанию 'Copied!')
     *   ms          длительность фидбека, мс (по умолчанию 1800)
     *   doneClass   css-класс на время фидбека
     *   onDone      (btn) => доп. визуал (цвета/фоны инлайн-стилями)
     *   onRestore   (btn) => откат доп. визуала
     *   toast       текст success-тоста (через showToast из njx.js)
     *   track       имя GA-события (через njxTrack) + trackParams
     */
    /* ── Тема ─────────────────────────────────────────────────────────
       Канонический сеттер — njxSetTheme из njx.js (его оборачивает
       GA-аналитика в BaseLayout). Здесь — синхронизация ВСЕХ индикаторов
       темы на сайте одним декларативным реестром: селектор → откуда взять
       тему элемента → какой класс ставить. Новый переключатель темы =
       одна строка в реестре, а не своя функция синка. */
    var THEME_UI = [
        { sel: '.bb-dot',                 key: function (el) { return el.dataset.t; },     cls: 'active' },   // Bottombar
        { sel: '.sc-theme-dot',           key: function (el) { return el.dataset.t; },     cls: 'active' },   // PagesTopbar
        { sel: '.sc-tpill',               key: function (el) { return el.dataset.t; },     cls: 'active' },   // overview: пилюли
        { sel: '#ov-tswatches .s',        key: function (el) { return el.dataset.t; },     cls: 'on' },       // overview: свотчи
        { sel: '.doc-theme-swatch',       key: function (el) { return el.dataset.tc; },    cls: 'selected' }, // documentation
        { sel: '.theme-card[data-theme]', key: function (el) { return el.dataset.theme; }, cls: 'active' },   // classless: карточки
        { sel: '.lib-theme-pill',         key: function (el) { return (el.title || '').toLowerCase(); }, cls: 'active' }, // libs topbar
        { sel: '.ts-tile',                key: function (el) { return el.dataset.ts; },    cls: 'active' },   // theme showcase
    ];

    /** Синхронизировать все индикаторы темы (без смены самой темы). */
    window.njxSyncThemeUI = function (theme) {
        THEME_UI.forEach(function (r) {
            document.querySelectorAll(r.sel).forEach(function (el) {
                el.classList.toggle(r.cls, r.key(el) === theme);
            });
        });
        // Текстовые индикаторы
        var t1 = document.getElementById('tsAttrTheme');
        var t2 = document.getElementById('tsCodeTheme');
        if (t1) t1.textContent = theme;
        if (t2) t2.textContent = theme;
        ['ov-attr', 'ov-attr2'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.textContent = 'data-theme="' + theme + '"';
        });
    };

    /**
     * Сменить тему (канонично, с GA-событием) + засинкать индикаторы.
     * Смена завёрнута в View Transition — единый кроссфейд всей страницы
     * вместо «кусочной» перекраски (каждый элемент со своей скоростью
     * transition). .vt-active глушит поэлементные transition на время
     * кроссфейда (правило — в BaseLayout, действует на всех страницах);
     * Firefox без startViewTransition получает мгновенную смену.
     */
    window.njxApplyTheme = function (theme) {
        function setIt() {
            if (window.njxSetTheme) {
                njxSetTheme(theme);
            } else {
                document.documentElement.setAttribute('data-theme', theme);
                try { localStorage.setItem('njx-theme', theme); } catch (e) {}
            }
            njxSyncThemeUI(theme);
        }
        if (document.startViewTransition) {
            document.documentElement.classList.add('vt-active');
            var vt = document.startViewTransition(setIt);
            vt.finished.finally(function () {
                document.documentElement.classList.remove('vt-active');
            });
        } else {
            setIt();
        }
    };

    /* Восстановление индикаторов: и на первой загрузке, и после каждой
       VT-навигации (инлайн-restore на страницах не перевыполнялся —
       индикаторы «отставали» после переходов навбаром). */
    function njxRestoreThemeUI() {
        var saved = null;
        try { saved = localStorage.getItem('njx-theme'); } catch (e) {}
        saved = saved
            || document.documentElement.getAttribute('data-theme')
            || 'dark';
        njxSyncThemeUI(saved);
    }

    /** Экранирование HTML для вставки кода/текста в innerHTML. */
    window.njxEscHtml = function (str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    /* ── Flavor/mode: full | classless | interactive ─────────────────
       Общая часть переключателей режима на quickstart и documentation.
       Тексты подсказок и ключ localStorage (njx-flavor) — единственная
       связь между страницами, поэтому живут здесь, а не в инлайнах. */
    window.NJX_MODE_HINTS = {
        full: 'Classless built-in — your HTML is styled automatically',
        classless: 'Standalone — no component classes, 47 KB',
        interactive: 'Full library + JS: modals, tabs, toasts and more',
    };

    /** Сохранённый режим (общий для quickstart/documentation). */
    window.njxSavedFlavor = function () {
        try {
            return localStorage.getItem('njx-flavor') || 'full';
        } catch (e) {
            return 'full';
        }
    };

    /**
     * Общая механика переключения режима: табы + hint + show/hide блоков
     * (значение атрибута — режимы через пробел) + persist.
     * Страничная специфика (карточки, ре-рендеры) остаётся в вызывающем коде.
     * opts: tabSel (default '.doc-mode-tab'), hintId, blockAttr
     */
    window.njxSyncModeUI = function (flavor, opts) {
        opts = opts || {};
        document
            .querySelectorAll(opts.tabSel || '.doc-mode-tab')
            .forEach(function (b) {
                b.classList.toggle('active', b.dataset.mode === flavor);
            });
        if (opts.hintId) {
            var hint = document.getElementById(opts.hintId);
            if (hint) {
                hint.textContent =
                    NJX_MODE_HINTS[flavor] || NJX_MODE_HINTS.full;
            }
        }
        if (opts.blockAttr) {
            document
                .querySelectorAll('[' + opts.blockAttr + ']')
                .forEach(function (el) {
                    var modes = el.getAttribute(opts.blockAttr).split(' ');
                    el.style.display =
                        modes.indexOf(flavor) !== -1 ? '' : 'none';
                });
        }
        try {
            localStorage.setItem('njx-flavor', flavor);
        } catch (e) {}
    };

    /* Тосты: showToast из njx.js МОЛЧА не работает без #lib-toast-container
       (так на documentation терялись «Code copied»/«Copy failed»).
       Гарантируем контейнер на каждой странице; после VT-навигации body
       пересоздаётся, поэтому проверяем и на astro:page-load. Стили тостов —
       в lib-docs.css (на страницах без него тост останется невидимым в
       потоке — не хуже, чем было, и без ошибок). */
    function njxEnsureToastContainer() {
        if (!document.getElementById('lib-toast-container')) {
            var c = document.createElement('div');
            c.id = 'lib-toast-container';
            document.body.appendChild(c);
        }
    }

    function njxPageInit() {
        njxRestoreThemeUI();
        njxEnsureToastContainer();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', njxPageInit);
    } else {
        njxPageInit();
    }
    document.addEventListener('astro:page-load', njxPageInit);

    /* ── Делегированный хром код-окон (статическая разметка CodeBlock.astro) ──
       Атрибуты data-code-toggle / data-code-copy есть только у статического
       хрома — runtime-кнопки легаси-окон (lib-docs.js) сюда не попадают и
       не срабатывают дважды. Слушатель на document переживает VT-своп body
       и работает на страницах без lib-docs.js (например, /demo). */
    document.addEventListener('click', function (e) {
        if (!e.target || !e.target.closest) return;

        var toggle = e.target.closest('.lib-code-reveal-btn[data-code-toggle]');
        if (toggle) {
            var wrapper = toggle.nextElementSibling;
            if (wrapper && wrapper.classList.contains('lib-code-wrapper')) {
                var isOpen = wrapper.classList.contains('code-open');
                wrapper.classList.toggle('code-open', !isOpen);
                toggle.classList.toggle('open', !isOpen);
                var t = toggle.querySelector('.lib-crb-text');
                if (t) t.textContent = isOpen ? 'Show code' : 'Hide code';
            }
            return;
        }

        /* Табы вариантов кода (HTML / Alpine.js) — статический хром CodeBlock */
        var tab = e.target.closest('.lib-code-tab[data-code-tab]');
        if (tab) {
            var tabWrap = tab.closest('.lib-code-wrapper');
            if (tabWrap) {
                var id = tab.getAttribute('data-code-tab');
                tabWrap.querySelectorAll('.lib-code-tab').forEach(function (t) {
                    t.classList.toggle('is-active', t === tab);
                });
                tabWrap
                    .querySelectorAll('.lib-code[data-code-variant]')
                    .forEach(function (c) {
                        c.classList.toggle(
                            'is-active',
                            c.getAttribute('data-code-variant') === id
                        );
                    });
            }
            return;
        }

        var copy = e.target.closest('[data-code-copy]');
        if (copy) {
            e.stopPropagation();
            var wrap = copy.closest('.lib-code-wrapper, .sc-code-wrap');
            // при табах вариантов копируем активный .lib-code
            var codeEl =
                wrap &&
                (wrap.querySelector('.lib-code.is-active') ||
                    wrap.querySelector('.lib-code, .sc-code-body'));
            if (!codeEl) return;
            njxCopyBtn(copy, codeEl.dataset.raw || codeEl.innerText.trim(), {
                done:
                    '<svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">' +
                    '<path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"/>' +
                    '</svg> Copied!',
                doneClass: 'copied',
                toast: 'Code copied',
                track: 'copy_code',
                trackParams: { copy_type: 'code_block' },
            });
        }
    });

    /**
     * Scroll-spy: подсвечивает пункт навигации (класс .active), чья секция
     * сейчас в зоне видимости. ВАЖНО: один вызов на страницу для одного
     * набора ссылок — два обсервера на тех же ссылках дерутся за active
     * (так было на classless-странице до дедупликации).
     * @returns {IntersectionObserver|null}
     */
    window.njxScrollSpy = function (linkSel, sectionSel, rootMargin) {
        var links = document.querySelectorAll(linkSel);
        if (!links.length) return null;
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var id = entry.target.id;
                    links.forEach(function (a) {
                        a.classList.toggle(
                            'active',
                            a.getAttribute('href') === '#' + id
                        );
                    });
                });
            },
            { rootMargin: rootMargin || '-20% 0px -70% 0px' }
        );
        document.querySelectorAll(sectionSel).forEach(function (s) {
            observer.observe(s);
        });
        return observer;
    };

    window.njxCopyBtn = function (btn, text, opts) {
        opts = opts || {};
        if (opts.track && window.njxTrack) {
            njxTrack(opts.track, opts.trackParams || {});
        }
        return njxCopy(text)
            .then(function () {
                if (btn._njxCopyTimer) {
                    clearTimeout(btn._njxCopyTimer);
                } else {
                    btn._njxCopyIdle = btn.innerHTML;
                }
                btn.innerHTML = opts.done != null ? opts.done : 'Copied!';
                if (opts.doneClass) btn.classList.add(opts.doneClass);
                if (opts.onDone) opts.onDone(btn);
                if (opts.toast && window.showToast) {
                    showToast(opts.toast, 'success');
                }
                btn._njxCopyTimer = setTimeout(function () {
                    btn.innerHTML = btn._njxCopyIdle;
                    if (opts.doneClass) btn.classList.remove(opts.doneClass);
                    if (opts.onRestore) opts.onRestore(btn);
                    btn._njxCopyTimer = null;
                }, opts.ms || 1800);
            })
            .catch(function () {
                if (window.showToast) showToast('Copy failed', 'error');
            });
    };
})();
