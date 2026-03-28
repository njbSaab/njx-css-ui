/* ─────────────────────────────────────────────
   njx.js — Component JS helpers
   ─────────────────────────────────────────────
   Include this file once in your project:
     <script src="js/njx.js"></script>

   All functions are global and work via onclick="..."
   or you can call them programmatically.
───────────────────────────────────────────── */

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
  initCarousels();
});
