// ── Theme switcher ──
function setTheme(pill, theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('.lib-theme-pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
}

// ── Download modal ──
function downloadCssZip() {
  document.getElementById('njx-download-overlay').classList.add('open');
  dlUpdateCount();
}

function closeDownloadModal() {
  document.getElementById('njx-download-overlay').classList.remove('open');
}

function dlSelectAll(state) {
  document.querySelectorAll('#njx-download-overlay input[type="checkbox"]:not(:disabled)')
    .forEach(cb => { cb.checked = state; });
  dlUpdateCount();
}

function dlUpdateCount() {
  const all = document.querySelectorAll('#njx-download-overlay input[type="checkbox"]');
  const checked = document.querySelectorAll('#njx-download-overlay input[type="checkbox"]:checked');
  const countEl = document.getElementById('njx-dl-count');
  if (countEl) countEl.textContent = `${checked.length} of ${all.length} files selected`;
}

// Обновляем счётчик при каждом клике на чекбокс
document.addEventListener('change', e => {
  if (e.target.closest('#njx-download-overlay')) dlUpdateCount();
});

// ── README для архива ──
const DL_README = `# njX UI

A lightweight CSS component library — 9 themes, 25+ components, zero dependencies.

## Files

css/
  style.css        ← entry point, connect this file
  _base.css        ← design tokens (colors, fonts, spacing)
  _reset.css       ← CSS reset
  _grid.css        ← grid system
  _typography.css  ← typography classes
  _utils.css       ← utility classes (Tailwind-style)
  _responsive.css  ← responsive prefix utilities (sm: md: lg: xl:)
  ...components    ← only the components you selected

js/
  njx.js           ← vanilla JS helpers (tabs, modal, accordion, toast)

## Usage

Connect in HTML:

  <link rel="stylesheet" href="css/style.css">
  <script src="js/njx.js"></script>

Set theme on <html>:

  <html data-theme="dark">   <!-- dark / light / red / blue / green / cyan / yellow / pink / purple -->

## CDN (no download needed)

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbSaab/njx-ui-libe@main/css/style.min.css">
  <script src="https://cdn.jsdelivr.net/gh/njbSaab/njx-ui-libe@main/js/njx.js"></script>

## Docs

  https://github.com/njbSaab/njx-ui-libe

MIT License
`;

// ── Сборка и скачивание ZIP ──
async function buildAndDownload() {
  const btn = document.getElementById('njx-dl-confirm');
  btn.disabled = true;
  btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5" stroke-dasharray="20" stroke-dashoffset="5"/></svg> Packing...`;

  // Фиксированные файлы (foundation)
  const foundation = ['_base.css', '_reset.css', '_grid.css', '_typography.css', '_utils.css', '_responsive.css'];

  // Выбранные пользователем компоненты
  const selected = Array.from(
    document.querySelectorAll('#njx-download-overlay input[type="checkbox"]:checked:not(:disabled)')
  ).map(cb => cb.value).filter(v => v && v.endsWith('.css'));

  const cssFiles = [...foundation, ...selected];
  const includeJs = document.getElementById('njx-dl-js')?.checked;

  // Генерируем style.css с @import только выбранных файлов
  const styleEntry = [
    '/* njX UI — generated build */',
    '/* Connect this file: <link rel="stylesheet" href="css/style.css"> */',
    '',
    '/* 1. Foundation */',
    ...foundation.map(f => `@import "${f}";`),
    '',
    '/* 2. Components */',
    ...selected.map(f => `@import "${f}";`),
  ].join('\n');

  try {
    // eslint-disable-next-line no-undef
    const zip = new JSZip();
    const cssFolder = zip.folder('njx-ui/css');
    const jsFolder  = zip.folder('njx-ui/js');

    // Загружаем CSS файлы → в папку css/
    await Promise.all(cssFiles.map(async (file) => {
      try {
        const res = await fetch(`css/${file}`);
        if (res.ok) cssFolder.file(file, await res.text());
      } catch (e) {}
    }));

    // style.css — кастомный entry point
    cssFolder.file('style.css', styleEntry);

    // njx.js → в папку js/
    if (includeJs) {
      try {
        const res = await fetch('js/njx.js');
        if (res.ok) jsFolder.file('njx.js', await res.text());
      } catch (e) {}
    }

    // README
    zip.file('njx-ui/README.md', DL_README);

    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: 'njx-ui.zip'
    });
    a.click();
    URL.revokeObjectURL(a.href);

    closeDownloadModal();
    showToast('Download ready!', 'success');

  } catch (err) {
    console.error('ZIP error:', err);
    showToast('Build failed', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 1v8M5 6l3 3 3-3M2 11v1a1 1 0 001 1h10a1 1 0 001-1v-1"/></svg> Download ZIP`;
  }
}

// ── Trigger one-shot animation ──
function triggerAnim(id, cls) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
  el.addEventListener('animationend', () => el.classList.remove(cls), { once: true });
}

// ── Fade demo ──
const fadeMap = {
  fadeUp: 'animate-fade-in-up',
  fadeDown: 'animate-fade-in-down',
  fadeLeft: 'animate-fade-in-left',
  fadeRight: 'animate-fade-in-right',
  scaleIn: 'animate-scale-in',
  bounceIn: 'animate-bounce-in',
  flipIn: 'animate-flip',
};
function playFade(type) {
  const el = document.getElementById('fade-demo');
  el.className = '';
  el.style.cssText = 'width:60px;height:60px;background:var(--color-primary);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;opacity:0';
  el.textContent = type.replace('fade', '');
  requestAnimationFrame(() => { el.classList.add(fadeMap[type]); });
}

// ── Tab demo ──
function switchTab(idx) {
  document.querySelectorAll('.tab-btn').forEach((b, i) => {
    b.style.color = i === idx ? 'var(--color-primary)' : 'var(--text-muted)';
    b.style.borderBottom = i === idx ? '2px solid var(--color-primary)' : '2px solid transparent';
  });
  document.querySelectorAll('.tab-panel').forEach((p, i) => {
    p.style.display = i === idx ? 'block' : 'none';
  });
}

// ── Code blocks: copy button + expand toggle ──
function getRawCode(codeEl) {
  if (codeEl.dataset.raw) return codeEl.dataset.raw;
  return codeEl.innerText.trim();
}

function initCodeToggles() {
  document.querySelectorAll('.lib-code-wrapper').forEach((wrapper) => {
    const container = wrapper.querySelector('.lib-code-container');
    const code = wrapper.querySelector('.lib-code');
    if (!container || !code) return;

    const component = wrapper.closest('.lib-component');
    const labelEl = component ? component.querySelector('.lib-component-label') : null;
    const labelText = labelEl ? labelEl.textContent.trim() : 'HTML';

    const header = document.createElement('div');
    header.className = 'lib-code-header';
    header.innerHTML = `
      <div class="lib-code-mac-dots">
        <div class="lib-code-mac-dot" style="background:#ff5f57"></div>
        <div class="lib-code-mac-dot" style="background:#febc2e"></div>
        <div class="lib-code-mac-dot" style="background:#28c840"></div>
      </div>
      <span class="lib-code-label">${labelText}</span>
    `;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'lib-copy-btn';
    copyBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M4 4v8h8V4H4zm-1-1h10v10H3V3zM1 1h10v1H2v9H1V1z"/></svg> Copy`;

    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rawCode = getRawCode(code);
      navigator.clipboard.writeText(rawCode).then(() => {
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"/></svg> Copied`;
        showToast('Code copied', 'success');
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M4 4v8h8V4H4zm-1-1h10v10H3V3zM1 1h10v1H2v9H1V1z"/></svg> Copy`;
        }, 1800);
      }).catch(() => showToast('Copy failed', 'error'));
    });

    header.appendChild(copyBtn);
    wrapper.insertBefore(header, container);

    if (code.scrollHeight > 200) {
      const toggle = document.createElement('button');
      toggle.className = 'lib-code-toggle';
      toggle.innerHTML = '▶ Show more';
      toggle.addEventListener('click', function () {
        const isExpanded = container.classList.contains('expanded');
        container.classList.toggle('expanded', !isExpanded);
        toggle.classList.toggle('expanded', !isExpanded);
        toggle.innerHTML = isExpanded ? '▶ Show more' : '▼ Show less';
      });
      wrapper.appendChild(toggle);
    }
  });
}

// ── Utils grid ──
const UTILS_DATA = {
  '📦 Display': ['d-block', 'd-inline', 'd-inline-block', 'd-flex', 'd-grid', 'd-none', 'hidden', 'visible', 'invisible'],
  '🔀 Flex': [
    'flex', 'flex-row', 'flex-col', 'flex-wrap', 'flex-nowrap', 'flex-grow', 'flex-shrink', 'flex-none',
    'items-start', 'items-center', 'items-end', 'items-stretch', 'items-baseline',
    'justify-start', 'justify-center', 'justify-end', 'justify-between', 'justify-around', 'justify-evenly',
    'flex-center', 'flex-center-start', 'flex-center-end', 'flex-center-between', 'flex-col-center'
  ],
  '🔲 Grid': ['d-grid', 'gap-0', 'gap-1', 'gap-2', 'gap-3', 'gap-4', 'gap-5', 'gap-6', 'gap-8', 'gap-10', 'gap-12', 'gap-16', 'gap-20'],
  '📏 Margin': [
    'm-0', 'm-auto', 'mx-auto', 'my-auto',
    'mt-0', 'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-5', 'mt-6', 'mt-8', 'mt-10', 'mt-12', 'mt-16', 'mt-20', 'mt-24',
    'mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5', 'mb-6', 'mb-8', 'mb-10', 'mb-12', 'mb-16', 'mb-20', 'mb-24',
    'ml-0', 'ml-1', 'ml-2', 'ml-4', 'ml-6', 'ml-8', 'ml-auto',
    'mr-0', 'mr-1', 'mr-2', 'mr-4', 'mr-6', 'mr-8', 'mr-auto',
    'mx-0', 'mx-1', 'mx-2', 'mx-4', 'mx-6', 'mx-8',
    'my-0', 'my-1', 'my-2', 'my-4', 'my-6', 'my-8', 'my-10', 'my-12'
  ],
  '📐 Padding': [
    'p-0', 'p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-8', 'p-10', 'p-12',
    'pt-0', 'pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5', 'pt-6', 'pt-8', 'pt-10', 'pt-12', 'pt-16', 'pt-20', 'pt-24',
    'pb-0', 'pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5', 'pb-6', 'pb-8', 'pb-10', 'pb-12', 'pb-16', 'pb-20', 'pb-24',
    'pl-0', 'pl-2', 'pl-4', 'pl-6', 'pl-8',
    'pr-0', 'pr-2', 'pr-4', 'pr-6', 'pr-8',
    'px-0', 'px-1', 'px-2', 'px-3', 'px-4', 'px-5', 'px-6', 'px-8', 'px-10', 'px-12',
    'py-0', 'py-1', 'py-2', 'py-3', 'py-4', 'py-5', 'py-6', 'py-8', 'py-10', 'py-12'
  ],
  '📐 Width / Height': [
    'w-auto', 'w-full', 'w-screen', 'w-fit', 'w-25', 'w-50', 'w-75', 'w-80', 'w-90', 'w-95', 'max-w-full', 'max-w-container',
    'h-auto', 'h-full', 'h-screen', 'h-dvh', 'h-25', 'h-50', 'h-75', 'min-h-screen', 'min-h-dvh'
  ],
  '📍 Position': [
    'static', 'relative', 'absolute', 'fixed', 'sticky',
    'top-0', 'bottom-0', 'left-0', 'right-0', 'inset-0',
    'translate-center', 'translateX-center', 'translateY-center'
  ],
  '🎚 Z-Index': ['z-0', 'z-1', 'z-10', 'z-50', 'z-100', 'z-modal'],
  '🔄 Overflow': ['overflow-hidden', 'overflow-auto', 'overflow-scroll', 'overflow-x-hidden', 'overflow-y-auto'],
  '🔡 Text color': ['text-primary', 'text-accent', 'text-success', 'text-error', 'text-warning', 'text-muted', 'text-main', 'text-white', 'text-black', 'text-light'],
  '↔️ Text alignment': ['text-left', 'text-center', 'text-right', 'text-justify'],
  '🔠 Text transform': ['text-uppercase', 'text-lowercase', 'text-capitalize', 'text-normal-case'],
  '📏 Text size': ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'],
  '⚖️ Font weight': ['font-thin', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black'],
  '✍️ Text misc': ['text-bold', 'text-balance', 'text-nowrap', 'text-pretty', 'text-wrap', 'truncate', 'line-clamp-2', 'line-clamp-3', 'italic', 'not-italic', 'underline', 'line-through', 'no-underline'],
  '🎨 Rounded': ['rounded-none', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-full'],
  '🖼️ Background': ['bg-main', 'bg-secondary', 'bg-card', 'bg-primary', 'bg-accent', 'bg-success', 'bg-error', 'bg-warning', 'bg-transparent', 'bg-white', 'bg-black', 'bg-light', 'bg-dark', 'bg-grey', 'bg-img', 'bg-cover', 'bg-contain', 'bg-center', 'bg-no-repeat'],
  '🟫 Border': ['border', 'border-primary', 'border-accent', 'border-success', 'border-error', 'border-white', 'border-none', 'border-2', 'bd-primary', 'bd-error', 'bd-success', 'bd-grey'],
  '👁️ Opacity': ['opacity-0', 'opacity-25', 'opacity-50', 'opacity-75', 'opacity-100'],
  '💫 Shadows': ['shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-none', 'shadow-primary', 'shadow-accent', 'shadow-glow'],
  '⚡ Transitions': ['transition', 'transition-fast', 'transition-slow', 'transition-none'],
  '🖱️ Cursor': ['cursor-pointer', 'cursor-default', 'cursor-not-allowed', 'cursor-grab'],
  '📸 Object Fit': ['object-cover', 'object-contain', 'object-center'],
  '📺 Aspect Ratio': ['aspect-square', 'aspect-video', 'aspect-4-3'],
  '🌊 Float': ['pull-right', 'pull-left', 'clearfix'],
  '👆 Pointer / Select': ['pointer-none', 'pointer-auto', 'select-none', 'select-all'],
  '📱 Responsive': ['mobile', 'desktop', 'item-mobile', 'item-desktop', 'hide-xs', 'hide-sm', 'hide-md', 'hide-lg'],
  '🎯 Misc': ['is-full-screen', 'is-full-width', 'is-full-height', 'is-hidden', 'sr-only']
};

function renderUtils(filter) {
  const container = document.getElementById('utils-all');
  const countEl = document.getElementById('utils-count');
  if (!container || !countEl) return;
  const q = (filter || '').toLowerCase().trim();
  container.innerHTML = '';
  let total = 0;

  Object.entries(UTILS_DATA).forEach(([category, classes]) => {
    const filtered = q ? classes.filter(c => c.includes(q)) : classes;
    if (!filtered.length) return;
    total += filtered.length;

    const section = document.createElement('div');
    section.style.cssText = 'border:1px solid var(--lib-comp-brd);border-radius:10px;overflow:hidden';

    const head = document.createElement('div');
    head.style.cssText = 'padding:10px 16px;background:var(--lib-label-bg);border-bottom:1px solid var(--lib-sep);font-size:12px;font-weight:700;color:var(--color-primary);letter-spacing:0.5px;display:flex;align-items:center;justify-content:space-between';
    head.innerHTML = `<span>${category}</span><span style="font-size:11px;font-weight:400;color:var(--text-muted)">${filtered.length} classes</span>`;
    section.appendChild(head);

    const grid = document.createElement('div');
    grid.style.cssText = 'padding:12px 16px;display:flex;flex-wrap:wrap;gap:6px;background:var(--lib-preview-bg)';

    filtered.forEach(cls => {
      const chip = document.createElement('button');
      chip.style.cssText = 'padding:4px 10px;background:var(--lib-inp-bg);border:1.5px solid var(--lib-inp-brd);border-radius:6px;color:var(--text-main);font-family:monospace;font-size:11px;cursor:pointer;transition:all 0.15s;white-space:nowrap;outline:none';
      chip.textContent = '.' + cls;
      chip.title = 'Copy';
      chip.onmouseover = () => { chip.style.borderColor = 'var(--color-primary)'; chip.style.color = 'var(--color-primary)'; };
      chip.onmouseout = () => { chip.style.borderColor = 'var(--lib-inp-brd)'; chip.style.color = 'var(--text-main)'; };
      chip.onclick = () => {
        navigator.clipboard.writeText(cls).catch(() => {});
        chip.style.background = 'var(--color-primary)';
        chip.style.color = '#000';
        chip.style.borderColor = 'var(--color-primary)';
        chip.textContent = '✓ ' + cls;
        setTimeout(() => {
          chip.style.background = 'var(--lib-inp-bg)';
          chip.style.color = 'var(--text-main)';
          chip.style.borderColor = 'var(--lib-inp-brd)';
          chip.textContent = '.' + cls;
        }, 700);
      };
      grid.appendChild(chip);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });

  countEl.textContent = q ? `${total} matches` : `${total} classes total`;
}

function filterUtils() {
  const q = document.getElementById('utils-search').value;
  renderUtils(q);
}

// ── Section eyebrow labels ──
const SECTION_GROUPS = {
  tokens: 'Foundation', grid: 'Foundation', typography: 'Foundation', utils: 'Foundation',
  buttons: 'Components', cards: 'Components', tags: 'Components', forms: 'Components',
  tabs: 'Components', collapse: 'Components', popups: 'Components', nav: 'Components',
  sections: 'Components', panel: 'Components', table: 'Components',
  breadcrumb: 'Components', pagination: 'Components',
  notifications: 'Components', progress: 'Components', links: 'Components',
  dropdown: 'Components', carousel: 'Components',
  animations: 'Visual', gradients: 'Visual', hovers: 'Visual'
};

function initSectionHeaders() {
  document.querySelectorAll('.lib-section[id]').forEach(section => {
    const group = SECTION_GROUPS[section.id];
    if (!group) return;
    const titleEl = section.querySelector('.lib-section-title');
    if (!titleEl || titleEl.previousElementSibling?.classList.contains('lib-section-eyebrow')) return;
    const eyebrow = document.createElement('div');
    eyebrow.className = 'lib-section-eyebrow';
    eyebrow.textContent = group;
    titleEl.parentNode.insertBefore(eyebrow, titleEl);
  });
}

// ── Sidebar active link (IntersectionObserver) ──
function initSidebarObserver() {
  const navLinks = document.querySelectorAll('.lib-sidebar a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  document.querySelectorAll('.lib-section').forEach(s => observer.observe(s));
}

// ── JS Carousel (sequential prev/next) ──
// Target .js-carousel-wrap so dots can live anywhere inside it.
function initCarousels() {
  document.querySelectorAll('.js-carousel-wrap').forEach((container) => {
    const track = container.querySelector('.js-carousel-track');
    const slides = track ? Array.from(track.children) : [];
    if (!slides.length) return;

    let current = 0;
    let timer = null;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      const slideWidth = slides[0].offsetWidth;
      track.style.transform = `translateX(-${current * slideWidth}px)`;
      container.querySelectorAll('.js-dot').forEach((d, i) => {
        d.classList.toggle('is-active', i === current);
      });
    }

    // Use event delegation on the container — works regardless of button nesting
    container.addEventListener('click', (e) => {
      if (e.target.closest('.js-prev')) goTo(current - 1);
      if (e.target.closest('.js-next')) goTo(current + 1);
    });
    container.querySelectorAll('.js-dot').forEach((d, i) => {
      d.addEventListener('click', () => goTo(i));
    });

    // Auto-play if data-autoplay attribute is set
    const delay = parseInt(container.dataset.autoplay);
    if (delay > 0) {
      timer = setInterval(() => goTo(current + 1), delay);
      container.addEventListener('mouseenter', () => clearInterval(timer));
      container.addEventListener('mouseleave', () => {
        timer = setInterval(() => goTo(current + 1), delay);
      });
    }

    // Fading carousel support
    if (container.classList.contains('js-carousel-fade')) {
      const items = Array.from(container.querySelectorAll('.js-fade-slide'));
      const origGoTo = goTo;
      function fadeTo(index) {
        current = (index + items.length) % items.length;
        items.forEach((item, i) => {
          item.style.opacity = i === current ? '1' : '0';
          item.style.zIndex  = i === current ? '1' : '0';
        });
        container.querySelectorAll('.js-dot').forEach((d, i) => {
          d.classList.toggle('is-active', i === current);
        });
      }
      container.querySelector('.js-prev')?.removeEventListener('click', () => goTo(current - 1));
      container.querySelector('.js-next')?.removeEventListener('click', () => goTo(current + 1));
      container.querySelector('.js-prev')?.addEventListener('click', () => fadeTo(current - 1));
      container.querySelector('.js-next')?.addEventListener('click', () => fadeTo(current + 1));
      container.querySelectorAll('.js-dot').forEach((d, i) => {
        d.addEventListener('click', () => fadeTo(i));
      });
    }
  });
}

// ── Inline <code> copy on click ──
function initInlineCodeCopy() {
  document.querySelectorAll(
    '.lib-section-desc code, .lib-component-label code, .lib-section-title code, .lib-section-eyebrow code'
  ).forEach(el => {
    if (el.dataset.copyReady) return;
    el.dataset.copyReady = '1';
    el.classList.add('lib-code-inline');
    el.title = 'Click to copy';

    el.addEventListener('click', () => {
      const text = el.textContent.trim();
      navigator.clipboard.writeText(text).catch(() => {});
      el.classList.add('lib-code-inline--copied');
      const prev = el.textContent;
      el.textContent = '✓ copied';
      setTimeout(() => {
        el.textContent = prev;
        el.classList.remove('lib-code-inline--copied');
      }, 1200);
    });
  });
}

// ── Search ──
function initSearch() {
  const input = document.getElementById('libSearchInput');
  const dropdown = document.getElementById('libSearchDropdown');
  if (!input || !dropdown) return;

  // Build index: sections + component labels
  const index = [];

  const SECTION_ICONS = {
    tokens: '🎨', grid: '▦', typography: '𝐓', utils: '⚡',
    buttons: '🔲', cards: '🃏', tags: '🏷', forms: '📋',
    tabs: '📑', collapse: '🔽', popups: '💬', nav: '🧭',
    sections: '📐', panel: '🗂', table: '📊', breadcrumb: '›',
    pagination: '«»', notifications: '🔔', progress: '▮',
    links: '🔗', dropdown: '⌄', carousel: '🎠',
    animations: '✨', gradients: '🌈', hovers: '🖱',
  };

  document.querySelectorAll('.lib-section[id]').forEach(section => {
    const id = section.id;
    const titleEl = section.querySelector('.lib-section-title');
    const title = titleEl ? titleEl.textContent.replace(/^[^\w\s]+/, '').trim() : id;
    const group = SECTION_GROUPS[id] || 'Other';
    const icon = SECTION_ICONS[id] || '◻';

    // Section itself
    index.push({ label: title, section: group, icon, el: section, type: 'section' });

    // Component labels inside section
    section.querySelectorAll('.lib-component-label').forEach(labelEl => {
      const labelText = labelEl.textContent.trim();
      if (!labelText) return;
      index.push({ label: labelText, section: title, icon: '◈', el: labelEl.closest('.lib-component') || section, type: 'component' });
    });
  });

  let focusedIndex = -1;
  let currentItems = [];

  function highlight(text, query) {
    if (!query) return text;
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    dropdown.innerHTML = '';
    focusedIndex = -1;

    if (!q) { dropdown.classList.remove('open'); return; }

    const results = index.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q)
    );

    if (!results.length) {
      dropdown.innerHTML = `<div class="lib-search-empty">No results for "<strong>${query}</strong>"</div>`;
      dropdown.classList.add('open');
      currentItems = [];
      return;
    }

    // Group by section category
    const groups = {};
    results.forEach(item => {
      const g = item.type === 'section' ? 'Sections' : item.section;
      if (!groups[g]) groups[g] = [];
      groups[g].push(item);
    });

    currentItems = [];
    Object.entries(groups).forEach(([groupName, items]) => {
      const groupLabel = document.createElement('div');
      groupLabel.className = 'lib-search-group-label';
      groupLabel.textContent = groupName;
      dropdown.appendChild(groupLabel);

      items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'lib-search-item';
        row.innerHTML = `
          <div class="lib-search-item-icon">${item.icon}</div>
          <div class="lib-search-item-body">
            <div class="lib-search-item-name">${highlight(item.label, q)}</div>
            <div class="lib-search-item-section">${item.section}</div>
          </div>`;
        row.addEventListener('click', () => selectItem(item));
        dropdown.appendChild(row);
        currentItems.push({ el: row, item });
      });
    });

    dropdown.classList.add('open');
  }

  function selectItem(item) {
    item.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    input.value = '';
    dropdown.classList.remove('open');
    input.blur();
  }

  function moveFocus(dir) {
    if (!currentItems.length) return;
    currentItems[focusedIndex]?.el.classList.remove('focused');
    focusedIndex = (focusedIndex + dir + currentItems.length) % currentItems.length;
    currentItems[focusedIndex].el.classList.add('focused');
    currentItems[focusedIndex].el.scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('input', () => renderResults(input.value));

  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveFocus(-1); }
    else if (e.key === 'Enter') {
      if (focusedIndex >= 0 && currentItems[focusedIndex]) {
        selectItem(currentItems[focusedIndex].item);
      }
    }
    else if (e.key === 'Escape') {
      dropdown.classList.remove('open');
      input.blur();
    }
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('#libSearch')) dropdown.classList.remove('open');
  });

  // ⌘K / Ctrl+K to focus
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });
}

// ── Init после загрузки всех компонентов через loader.js ──
document.addEventListener('components-loaded', () => {
  initSectionHeaders();
  initCodeToggles();
  renderUtils();
  initSidebarObserver();
  initCarousels();
  initSearch();
  initInlineCodeCopy();
});
