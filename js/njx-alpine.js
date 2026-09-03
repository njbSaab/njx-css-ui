/*!
 * njx-alpine.js — Alpine.data() presets for njX UI components.
 * One word instead of a hand-written x-data object:
 *
 *   <script defer src="https://cdn.jsdelivr.net/npm/njx-ui@1/js/njx-alpine.js"></script>
 *   <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"></script>
 *
 *   <div class="collapse" x-data="njxCollapse">…</div>
 *   <div class="tab-wrap" x-data="njxTabs">…</div>
 *   <div x-data="njxToasts">…</div>
 *
 * Load BEFORE Alpine (both defer — order in the document decides).
 * Presets toggle the same classes njx.js uses (.is-open, .is-active, .open),
 * so all njX CSS works unchanged. njx.js itself is NOT required.
 *
 * https://njxui.dev · npm: njx-ui · MIT
 */
(function () {
  'use strict';

  function register() {
    var Alpine = window.Alpine;

    /* ── njxCollapse(open = false) ──────────────────────────────
       <div class="collapse" x-data="njxCollapse">
         <button class="collapse-header" @click="toggle()">…</button>
         <div class="collapse-body">…</div>
       </div>
       Keeps .is-open on the root in sync with `open`. */
    Alpine.data('njxCollapse', function (open) {
      return {
        open: open === true,
        toggle: function () { this.open = !this.open; },
        init: function () {
          var el = this.$el;
          el.classList.toggle('is-open', this.open);
          this.$watch('open', function (v) { el.classList.toggle('is-open', v); });
        },
      };
    });

    /* ── njxAccordion(active = null) ────────────────────────────
       Exclusive accordion by index:
       <div class="accordion" x-data="njxAccordion">
         <div class="collapse" :class="{ 'is-open': isOpen(0) }">
           <button class="collapse-header" @click="toggle(0)">…</button>…
         </div>
         … isOpen(1) / toggle(1) …
       </div> */
    Alpine.data('njxAccordion', function (active) {
      return {
        active: typeof active === 'number' ? active : null,
        toggle: function (i) { this.active = this.active === i ? null : i; },
        isOpen: function (i) { return this.active === i; },
      };
    });

    /* ── njxTabs(tab = 0) ───────────────────────────────────────
       <div class="tab-wrap" x-data="njxTabs">
         <div class="tab-nav">
           <button class="tab-btn" :class="{ 'is-active': isActive(0) }" @click="select(0)">…</button>
         </div>
         <div class="tab-panel" :class="{ 'is-active': isActive(0) }">…</div>
       </div> */
    Alpine.data('njxTabs', function (tab) {
      return {
        tab: typeof tab === 'number' ? tab : 0,
        select: function (i) { this.tab = i; },
        isActive: function (i) { return this.tab === i; },
      };
    });

    /* ── njxDropdown(open = false) ──────────────────────────────
       <div class="dropdown" x-data="njxDropdown">
         <button @click="toggle()">Menu</button>
         <div class="dropdown-menu">…</div>
       </div>
       .is-open on the root; closes on outside click and Escape. */
    Alpine.data('njxDropdown', function (open) {
      return {
        open: open === true,
        toggle: function () { this.open = !this.open; },
        close: function () { this.open = false; },
        init: function () {
          var self = this;
          var el = this.$el;
          el.classList.toggle('is-open', this.open);
          this.$watch('open', function (v) { el.classList.toggle('is-open', v); });
          this._njxOut = function (e) { if (!el.contains(e.target)) self.open = false; };
          this._njxEsc = function (e) { if (e.key === 'Escape') self.open = false; };
          document.addEventListener('click', this._njxOut);
          document.addEventListener('keydown', this._njxEsc);
        },
        destroy: function () {
          document.removeEventListener('click', this._njxOut);
          document.removeEventListener('keydown', this._njxEsc);
        },
      };
    });

    /* ── njxModal(open = false) ─────────────────────────────────
       <div x-data="njxModal">
         <button class="btn" @click="show()">Open</button>
         <div class="lib-modal-overlay">
           <div class="lib-modal-box">… <button @click="hide()">✕</button></div>
         </div>
       </div>
       Toggles .open on the overlay, locks body scroll,
       closes on Escape and backdrop click. */
    Alpine.data('njxModal', function (open) {
      return {
        open: open === true,
        show: function () { this.open = true; },
        hide: function () { this.open = false; },
        init: function () {
          var self = this;
          var overlay = this.$el.classList.contains('lib-modal-overlay')
            ? this.$el
            : this.$el.querySelector('.lib-modal-overlay');
          if (!overlay) return;
          var apply = function (v) {
            overlay.classList.toggle('open', v);
            document.body.style.overflow = v ? 'hidden' : '';
          };
          apply(this.open);
          this.$watch('open', apply);
          overlay.addEventListener('click', function (e) {
            if (e.target === overlay) self.hide();
          });
          this._njxEsc = function (e) { if (e.key === 'Escape') self.hide(); };
          document.addEventListener('keydown', this._njxEsc);
        },
        destroy: function () {
          document.removeEventListener('keydown', this._njxEsc);
          document.body.style.overflow = '';
        },
      };
    });

    /* ── njxToasts() ────────────────────────────────────────────
       <div x-data="njxToasts">
         <button class="btn" @click="fire('Saved!', 'success')">Save</button>
         <div style="position:fixed;bottom:24px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:8px;z-index:9500;pointer-events:none">
           <template x-for="t in toasts" :key="t.id">
             <div class="toast" :class="'toast-' + t.type" x-text="t.msg"></div>
           </template>
         </div>
       </div>
       Types map to njX classes: primary · success · error · warning · dark. */
    Alpine.data('njxToasts', function () {
      return {
        toasts: [],
        _id: 0,
        fire: function (msg, type, ms) {
          var id = ++this._id;
          var self = this;
          this.toasts.push({ id: id, msg: msg, type: type || 'primary' });
          if (ms !== 0) setTimeout(function () { self.dismiss(id); }, ms || 3000);
        },
        dismiss: function (id) {
          this.toasts = this.toasts.filter(function (t) { return t.id !== id; });
        },
      };
    });

    /* ── njxCarousel(n = auto, autoplay = 0) ────────────────────
       <div class="js-carousel-wrap" x-data="njxCarousel()">
         <div class="js-carousel">
           <div class="js-carousel-track" :style="offset">…slides…</div>
         </div>
         <button class="js-carousel-btn js-prev" @click="prev()">‹</button>
         <button class="js-carousel-btn js-next" @click="next()">›</button>
         <div class="js-dots">
           <template x-for="d in n" :key="d">
             <button class="js-dot" :class="{ 'is-active': i === d - 1 }" @click="go(d - 1)"></button>
           </template>
         </div>
       </div>
       Slide count is read from the track automatically; pass n to override.
       autoplay in ms (0 = off), pauses on hover. Works with .js-carousel-track,
       .hero-slider-track and .testi-track alike. */
    Alpine.data('njxCarousel', function (n, autoplay) {
      return {
        i: 0,
        n: typeof n === 'number' ? n : 0,
        init: function () {
          var self = this;
          if (!this.n) {
            var track = this.$el.querySelector('.js-carousel-track, .hero-slider-track, .testi-track');
            if (track) this.n = track.children.length;
          }
          if (autoplay) {
            var start = function () {
              self._njxT = setInterval(function () { self.next(); }, autoplay);
            };
            start();
            this.$el.addEventListener('mouseenter', function () { clearInterval(self._njxT); });
            this.$el.addEventListener('mouseleave', start);
          }
        },
        destroy: function () { clearInterval(this._njxT); },
        go: function (idx) { this.i = (idx + this.n) % this.n; },
        next: function () { this.go(this.i + 1); },
        prev: function () { this.go(this.i - 1); },
        get offset() { return 'transform: translateX(-' + this.i * 100 + '%)'; },
      };
    });

    /* ── njxTheme(def = 'dark') ─────────────────────────────────
       <button x-data="njxTheme" @click="toggle()" x-text="t === 'dark' ? '☀️' : '🌙'"></button>
       <button x-data="njxTheme" @click="set('purple')">Purple</button>
       data-theme on <html> + localStorage. Restore on load stays your
       one-liner in <head> (see the docs FOUC snippet). */
    Alpine.data('njxTheme', function (def) {
      return {
        t: document.documentElement.dataset.theme || def || 'dark',
        set: function (theme) {
          this.t = theme;
          document.documentElement.dataset.theme = theme;
          try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ }
        },
        toggle: function (a, b) {
          a = a || 'dark'; b = b || 'light';
          this.set(this.t === a ? b : a);
        },
      };
    });
  }

  if (window.Alpine) register();
  else document.addEventListener('alpine:init', register);
})();
