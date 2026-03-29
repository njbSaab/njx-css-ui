/* ─────────────────────────────────────────────
   njx.js — Component JS helpers
   ─────────────────────────────────────────────
   Include this file once in your project:
     <script src="js/njx.js"></script>

   All functions are global and work via onclick="..."
   or you can call them programmatically.
───────────────────────────────────────────── */

/* ═══════════════════════════════
   THEME
   Saves selected theme to localStorage and applies it to <html>.
   Add this snippet once in <head> to restore theme before first paint:
     <script>try{var t=localStorage.getItem('njx-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}</script>

   Usage:
     njxSetTheme('dark')           — set a specific theme
     njxToggleTheme()              — toggle dark ↔ light
   Themes: dark | light | red | blue | green | cyan | yellow | pink | purple
═══════════════════════════════ */
function njxSetTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('njx-theme', theme); } catch(e) {}
}

function njxToggleTheme() {
  var current = document.documentElement.getAttribute('data-theme') || 'dark';
  njxSetTheme(current === 'light' ? 'dark' : 'light');
}
/* ═══════════════════════════════
   COLLAPSE
   Usage: onclick="collapseToggle(this)"
═══════════════════════════════ */
function collapseToggle(header) {
  header.closest('.collapse').classList.toggle('is-open');
}

/* ═══════════════════════════════
   ACCORDION (JS-based)
   Closes sibling collapses when one opens.
   Usage: onclick="accordionToggle(this)"
   Wrap collapses in .accordion or .accordion-flush
═══════════════════════════════ */
function accordionToggle(header) {
  const collapse = header.closest('.collapse');
  const accordion = collapse.closest('.accordion, .accordion-flush');
  const isOpen = collapse.classList.contains('is-open');
  if (accordion) {
    accordion.querySelectorAll('.collapse.is-open').forEach(c => c.classList.remove('is-open'));
  }
  if (!isOpen) collapse.classList.add('is-open');
}

/* ═══════════════════════════════
   DROPDOWN
   Usage: onclick="dropdownToggle(this.parentElement)"
   or:    onclick="dropdownToggle(this.closest('.dropdown'))"
═══════════════════════════════ */
function dropdownToggle(el) {
  const isOpen = el.classList.contains('is-open');
  document.querySelectorAll('.dropdown.is-open').forEach(d => d.classList.remove('is-open'));
  if (!isOpen) el.classList.add('is-open');
}

// Close dropdown on outside click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown.is-open').forEach(d => d.classList.remove('is-open'));
  }
});

/* ═══════════════════════════════
   TABS
   Usage: onclick="tabSwitch(this)"
   Requires .tab-wrap > .tab-nav + .tab-content > .tab-panel
═══════════════════════════════ */
function tabSwitch(btn) {
  const wrap = btn.closest('.tab-wrap');
  if (wrap) {
    wrap.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('is-active'));
    wrap.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('is-active'));
    const idx = [...btn.parentElement.children].indexOf(btn);
    btn.classList.add('is-active');
    const panels = wrap.querySelectorAll('.tab-panel');
    if (panels[idx]) panels[idx].classList.add('is-active');
  } else {
    btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  }
}

/* ═══════════════════════════════
   MODAL
   Usage:
     openModal('my-modal')       — open by id
     closeModal(overlayElement)  — close by element ref
     onclick="closeModal(document.getElementById('my-modal'))"
     onclick="if(event.target===this)closeModal(this)"  — on overlay
═══════════════════════════════ */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(el) {
  el.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.lib-modal-overlay.open').forEach(m => closeModal(m));
  }
});

/* ═══════════════════════════════
   CAROUSEL
   Auto-initializes all .carousel-wrap on DOMContentLoaded.
   Syncs .carousel-dot active state on scroll.
═══════════════════════════════ */
function initCarousels() {
  document.querySelectorAll('.carousel-wrap').forEach(function(wrap) {
    var carousel = wrap.querySelector('.carousel');
    var dots = wrap.querySelectorAll('.carousel-dot');
    if (!carousel || !dots.length) return;

    function syncDots() {
      var items = carousel.querySelectorAll('.carousel-item');
      if (!items.length) return;
      var activeIdx = 0;
      var minDist = Infinity;
      items.forEach(function(item, i) {
        var dist = Math.abs(item.offsetLeft - carousel.scrollLeft);
        if (dist < minDist) { minDist = dist; activeIdx = i; }
      });
      dots.forEach(function(dot, i) {
        dot.classList.toggle('is-active', i === activeIdx);
      });
    }

    carousel.addEventListener('scroll', syncDots, { passive: true });
    syncDots();
  });
}

/* ─────────────────────────────
   Programmatically scroll to a slide (0-based index).
   Usage: carouselGo(document.querySelector('.carousel'), 2)
───────────────────────────── */
function carouselGo(carousel, idx) {
  var items = carousel.querySelectorAll('.carousel-item');
  if (items[idx]) {
    carousel.scrollTo({ left: items[idx].offsetLeft, behavior: 'smooth' });
  }
}

/* ═══════════════════════════════
   SIDEBAR
   Opens/closes sidebar drawer with optional backdrop.
   Backdrop element id = sidebar id + '-backdrop'

   Usage:
     sidebarOpen('my-sidebar')
     sidebarClose('my-sidebar')
     sidebarToggle('my-sidebar')

   HTML structure:
     <div class="sidebar-backdrop" id="my-sidebar-backdrop" onclick="sidebarClose('my-sidebar')"></div>
     <aside class="sidebar" id="my-sidebar">
       <div class="sidebar-header">
         <span class="sidebar-title">Menu</span>
         <button class="sidebar-close" onclick="sidebarClose('my-sidebar')">✕</button>
       </div>
       <div class="sidebar-body">...</div>
     </aside>

   Variants (add modifier classes to .sidebar):
     sidebar-right      — slides from right
     sidebar-push       — pushes content (wrap page in .sidebar-layout)
     sidebar-fullpage   — full viewport overlay
═══════════════════════════════ */
function sidebarOpen(id) {
  var sidebar = document.getElementById(id);
  if (!sidebar) return;
  sidebar.classList.add('is-open');
  var backdrop = document.getElementById(id + '-backdrop');
  if (backdrop) backdrop.classList.add('is-visible');
  if (!sidebar.classList.contains('sidebar-push')) {
    document.body.classList.add('sidebar-open');
  }
  // Remove any stale listener, then attach a fresh outside-click handler
  if (sidebar._njxOutside) {
    document.removeEventListener('pointerdown', sidebar._njxOutside);
  }
  sidebar._njxOutside = function(e) {
    if (sidebar.contains(e.target)) return;
    // backdrop click = also "outside" → close
    sidebarClose(id);
  };
  // Push sidebars are persistent panels — no outside-click to close
  // Overlay/fullpage variants close when clicking outside
  setTimeout(function() {
    if (!sidebar.classList.contains('sidebar-push')) {
      document.addEventListener('pointerdown', sidebar._njxOutside);
    }
  }, 50);
}

function sidebarClose(id) {
  var sidebar = document.getElementById(id);
  if (!sidebar) return;
  sidebar.classList.remove('is-open');
  var backdrop = document.getElementById(id + '-backdrop');
  if (backdrop) backdrop.classList.remove('is-visible');
  document.body.classList.remove('sidebar-open');
  if (sidebar._njxOutside) {
    document.removeEventListener('pointerdown', sidebar._njxOutside);
    delete sidebar._njxOutside;
  }
}

function sidebarToggle(id) {
  var sidebar = document.getElementById(id);
  if (!sidebar) return;
  sidebar.classList.contains('is-open') ? sidebarClose(id) : sidebarOpen(id);
}

// Expand/collapse mini icon-rail sidebar (toggles is-expanded class)
function sidebarExpandToggle(id) {
  var sidebar = document.getElementById(id);
  if (!sidebar) return;
  sidebar.classList.toggle('is-expanded');
}

// Close all open sidebars and clean up listeners
function sidebarCloseAll() {
  document.querySelectorAll('.sidebar.is-open').forEach(function(s) {
    s.classList.remove('is-open');
    if (s._njxOutside) {
      document.removeEventListener('pointerdown', s._njxOutside);
      delete s._njxOutside;
    }
  });
  document.querySelectorAll('.sidebar-backdrop.is-visible').forEach(function(b) {
    b.classList.remove('is-visible');
  });
  document.body.classList.remove('sidebar-open');
}

// Close sidebar on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') sidebarCloseAll();
});

/* ═══════════════════════════════
   TOAST
   Usage: showToast('Message', 'success', 2200)
   Types: success | error | primary | dark
   Requires #lib-toast-container in HTML
═══════════════════════════════ */
function showToast(msg, type, duration) {
  type = type || 'success';
  duration = duration || 2200;

  var container = document.getElementById('lib-toast-container');
  if (!container) return;

  var toast = document.createElement('div');
  toast.className = 'lib-toast lib-toast-' + type;

  var icons = { success: '✓', error: '✕', primary: 'ℹ', dark: '📋' };
  toast.innerHTML = '<span style="font-size:14px">' + (icons[type] || '✓') + '</span><span>' + msg + '</span>';

  container.appendChild(toast);

  var timer = setTimeout(function() {
    toast.classList.add('out');
    toast.addEventListener('animationend', function() { toast.remove(); }, { once: true });
  }, duration);

  toast.addEventListener('click', function() {
    clearTimeout(timer);
    toast.classList.add('out');
    toast.addEventListener('animationend', function() { toast.remove(); }, { once: true });
  });
}

/* ═══════════════════════════════
   AUTO INIT
═══════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  // Restore saved theme (fallback if inline <head> script is not present)
  try {
    var saved = localStorage.getItem('njx-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  } catch(e) {}

  initCarousels();
});
