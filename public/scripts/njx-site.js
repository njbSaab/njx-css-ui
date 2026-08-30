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
