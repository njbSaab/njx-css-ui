/**
 * Канонический список тем njX UI: ЕДИНЫЙ порядок и цвета индикаторов
 * для всех переключателей на сайте (сначала dark/light, затем спектр).
 *
 * Потребители (порядок/цвета должны совпадать с этим файлом):
 *  - LibsTopbar.astro    — генерирует пилюли из THEMES (map)
 *  - PagesTopbar.astro   — точки .sc-theme-dot (разметка вручную)
 *  - Bottombar.astro     — точки .bb-dot (разметка вручную)
 *  - documentation.astro — свотчи .doc-theme-swatch (разметка вручную)
 *  - classless-sections/Themes.astro — карточки (разметка вручную)
 *  - overview.astro      — пилюли .sc-tpill из THEMES (map) + OV_THEMES в инлайн-скрипте
 */
export const THEMES = [
    { name: 'dark', hex: '#4a4a56' },
    { name: 'light', hex: '#e2e8f0' },
    { name: 'red', hex: '#f43f5e' },
    { name: 'blue', hex: '#3b82f6' },
    { name: 'green', hex: '#22c55e' },
    { name: 'cyan', hex: '#00e5ff' },
    { name: 'yellow', hex: '#facc15' },
    { name: 'pink', hex: '#ec4899' },
    { name: 'purple', hex: '#a855f7' },
] as const;
