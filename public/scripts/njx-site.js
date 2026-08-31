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

    /** Сменить тему (канонично, с GA-событием) + засинкать индикаторы. */
    window.njxApplyTheme = function (theme) {
        if (window.njxSetTheme) {
            njxSetTheme(theme);
        } else {
            document.documentElement.setAttribute('data-theme', theme);
            try { localStorage.setItem('njx-theme', theme); } catch (e) {}
        }
        njxSyncThemeUI(theme);
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
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', njxRestoreThemeUI);
    } else {
        njxRestoreThemeUI();
    }
    document.addEventListener('astro:page-load', njxRestoreThemeUI);

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
