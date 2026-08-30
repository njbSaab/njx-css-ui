# njX UI — Full Build (`style.min.css`)

> The complete njX UI library: **30+ component classes, 9 themes, Tailwind-style utilities, responsive prefixes** — one CSS file, zero dependencies.
>
> **Size:** 308 KB minified · **44 KB gzip** over the wire.

Full and Classless are **standalone builds — use one stylesheet at a time**, never both together. If you want to style plain semantic HTML without classes, see [CLASSLESS.md](CLASSLESS.md) instead.

---

## Installation

**CDN (recommended):**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/style.min.css" />
<html data-theme="dark">
```

**npm:**

```bash
npm i njx-ui
```

```html
<link rel="stylesheet" href="node_modules/njx-ui/css/style.min.css" />
```

**Self-hosted:** download from [njxui.dev](https://njxui.dev) (Download → Full UI) and link the file locally. For development there is also the unminified modular entry `css/style.css` (`@import`-only, pulls the `_*.css` partials).

Optional JS helper (tabs, modals, toasts, carousels — 14 KB):

```html
<script src="https://cdn.jsdelivr.net/npm/njx-ui/js/njx.js"></script>
```

---

## Architecture

Design Tokens → System → Components → Sections. Every layer is a separate partial:

| Layer | Files | What's inside |
|---|---|---|
| Tokens | `_base.css` | Color scales, fonts, spacing, radius, shadows, z-index, 9 themes |
| Reset | `_reset.css` | Minimal CSS reset |
| Elements | `_native.css` | Base styles for bare HTML elements |
| System | `_grid.css`, `_typography.css`, `_utils.css`, `_responsive.css` | 12-col grid, type scale, utilities, `sm:`/`md:`/`lg:`/`xl:` prefixes |
| Components | `_buttons.css`, `_cards.css`, `_form.css`, `_nav.css`, `_tab.css`, `_collapse.css`, `_dropdown.css`, `_slider.css`, `_popups.css`, `_sidebar.css`, `_notifications.css`, `_table.css`, `_breadcrumb.css`, `_tags.css`, `_links.css`, `_tooltip.css`, `_skeleton.css`, `_social.css`, `_sections.css` | 30+ UI components |
| Visual | `_gradients.css`, `_animations.css`, `_hovers.css` | Gradients, keyframe animations, hover effects |

---

## Themes

9 built-in themes switched by one attribute — every token updates automatically:

```html
<html data-theme="dark">   <!-- default -->
```

`dark` · `light` · `red` · `blue` · `green` · `cyan` · `yellow` · `pink` · `purple`

Switch at runtime:

```js
document.documentElement.setAttribute('data-theme', 'cyan');
```

---

## Components at a glance

- **Buttons** — `.btn`, variants (`.btn-primary`, `.btn-outline`…), sizes, groups, loading state
- **Cards** — `.card` with header/body/footer, hover and gradient variants
- **Forms** — inputs, selects, checkbox/radio/switch, validation states
- **Navigation** — navbar, breadcrumbs, tabs, dropdowns
- **Overlays** — modals/popups, sidebar/drawer, tooltips
- **Feedback** — notifications/toasts, skeleton loaders, progress
- **Data** — tables, tags/badges, definition lists
- **Content** — sections, social icons, links, slider/carousel

Full class-by-class reference with live examples: [CSS-DOCS.en.md](CSS-DOCS.en.md) and [njxui.dev/documentation](https://njxui.dev/documentation).

---

## Utilities & responsive

Tailwind-style utility classes for display/flex, spacing, sizing, position, radius, background, shadows, borders, opacity, gap and transitions — plus **mobile-first responsive prefixes**:

```html
<!-- Column on mobile → row on tablet → bigger gap on desktop -->
<div class="d-flex flex-col md:flex-row lg:gap-8 p-4">…</div>
```

Breakpoints: `sm:` `md:` `lg:` `xl:` (min-width). In custom CSS selectors the colon must be escaped: `.md\:flex-row`.

---

## Customization

Override design tokens — no build step required:

```css
:root {
  --color-primary: #7c3aed;
  --radius-md: 6px;
}
```

The token catalogue (colors, scales, fonts, spacing, shadows) lives in [CSS-DOCS.en.md → Design Tokens](CSS-DOCS.en.md#2-design-tokens).

---

## When to choose Full

| You need… | Build |
|---|---|
| Component classes, utilities, grids, complex UI | **Full (`style.min.css`)** |
| Plain semantic HTML styled automatically, zero classes | [Classless (`classless.min.css`)](CLASSLESS.md) |

MIT License · [GitHub](https://github.com/njbSaab/njx-css-ui) · [njxui.dev](https://njxui.dev)
