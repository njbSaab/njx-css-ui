/**
 * loader.js — HTML component loader
 *
 * Usage:
 *   <div data-component="sidebar"></div>      → loads components/sidebar.html
 *   <div data-section="buttons"></div>        → loads sections/buttons.html
 */
(async function () {
  const all = [
    ...document.querySelectorAll('[data-component]'),
    ...document.querySelectorAll('[data-section]'),
  ];

  const loads = all.map(async (el) => {
    const isComponent = el.hasAttribute('data-component');
    const name = isComponent
      ? el.getAttribute('data-component')
      : el.getAttribute('data-section');
    const path = isComponent
      ? `components/${name}.html`
      : `sections/${name}.html`;

    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
      el.innerHTML = await res.text();
    } catch (e) {
      el.innerHTML = `<p style="color:red;padding:8px">Failed to load: ${path}</p>`;
      console.error('[loader]', e);
    }
  });

  await Promise.all(loads);

  // Сигнал для njx.js — все компоненты загружены
  document.dispatchEvent(new Event('components-loaded'));
})();
