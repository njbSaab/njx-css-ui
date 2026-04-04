# njX UI — Classless Mode Implementation Notes

This document describes the technical implementation of Classless Mode in njX UI.

---

## Architecture

Classless Mode is a **separate CSS bundle** that reuses the design token layer (`_base.css`) but applies them to semantic HTML elements directly instead of class-based components.

```
css/
├── _base.css           ← shared design tokens (colors, fonts, spacing, themes)
├── _reset.css          ← used by Full UI Mode only
├── classless.css       ← classless entry point (imports _base.css, adds element styles)
├── classless.min.css   ← minified classless bundle (~20 KB)
├── style.css           ← full UI entry point (imports all files)
└── style.min.css       ← minified full UI bundle (~243 KB)
```

### Why a Separate Entry File?

- Keeps bundles independent — no risk of Full UI components interfering with classless styles.
- Allows lightningcss `--bundle` to inline only what classless needs.
- Users link exactly one file and nothing else.

---

## classless.css Structure

`css/classless.css` is organized in logical sections:

1. **Token import** — `@import "_base.css"` brings in all CSS variables and theme definitions.
2. **Auto theme** — `@media (prefers-color-scheme: light)` block sets light-theme variables when no `data-theme` attribute is present.
3. **Base reset** — lightweight inline reset (box-sizing, transitions, html/body).
4. **Typography** — `body`, `h1`–`h6`, `p`, `small`, `strong`, `em`.
5. **Links** — `a`, `:hover`, `:focus`, `:focus-visible`.
6. **Lists** — `ul`, `ol`, `li` with proper nesting.
7. **Code** — `code`, `kbd`, `samp`, `pre`, `pre code`.
8. **Blockquote** — left-border style + `cite`.
9. **Separator** — `hr`.
10. **Media** — `img`, `figure`, `figcaption`.
11. **Tables** — `table`, `thead`, `tbody`, `th`, `td`, row hover.
12. **Forms** — all native form elements styled consistently.
13. **Details/Summary** — animated FAQ accordion without JS.
14. **Article** — default card container.
15. **Navigation** — `nav a`, `body > header`, `body > footer`, `main`, `section`.
16. **Misc** — `address`, `mark`, `abbr`, `sub`, `sup`, `iframe`.

---

## Theme System

Classless Mode inherits the full theme system from `_base.css`:

- `[data-theme="dark"]` (default)
- `[data-theme="light"]`
- `[data-theme="red"]`, `[data-theme="blue"]`, `[data-theme="green"]`, etc.
- Auto mode: when no `data-theme` is present, `@media (prefers-color-scheme: light)` applies light theme variables.

The auto-light rule is scoped to `:root:not([data-theme])` to ensure it does **not** override explicit `data-theme` attributes. This keeps full compatibility with Full UI Mode's existing theme convention.

---

## Build Pipeline

Two new npm scripts were added to `package.json`:

```json
"build:css:full":      "lightningcss --minify --bundle css/style.css -o css/style.min.css && <header script>",
"build:css:classless": "lightningcss --minify --bundle css/classless.css -o css/classless.min.css && <header script>"
```

The top-level `build` script was updated to run both:

```json
"build": "npm run build:css:full && npm run build:css:classless && npm run sync-version"
```

The old `minify` and `header` scripts are retained for backward compatibility.

`lightningcss --bundle` inlines `@import "_base.css"` at build time, so `classless.min.css` is a fully self-contained file — no additional network requests.

---

## Demo Page (`classless.html`)

`classless.html` demonstrates every styled element using **only semantic HTML** and **no utility classes**. It includes:

- Sticky navbar (`<header role="banner">`) with nav links
- Hero section with heading, description, and call-to-action buttons
- Feature cards (`<article>`) in a CSS Grid layout (demo-only grid styles in a `<style>` block)
- Pricing table (three `<article>` cards)
- FAQ section using native `<details>`/`<summary>`
- Full form (`<fieldset>`, `<legend>`, `<input>`, `<select>`, `<textarea>`, `<button>`)
- Table comparing Classless vs Full UI Mode
- Footer with links grid
- Theme toggle cycling through all 9 themes (inline `<script>`, no external deps)

The demo page uses a small `<style>` block for **layout only** (CSS Grid columns, flex hero, badge pill) — these are presentation utilities specific to the demo page and not part of `classless.css`. All _styling_ comes from `classless.min.css`.

---

## Constraints Honored

- No new build tools introduced — uses existing `lightningcss-cli`.
- Full UI Mode (`style.min.css`) is not modified.
- Existing `data-theme` convention is unchanged.
- `classless.css` does not import `_reset.css` — instead it contains a minimal inline reset to avoid the aggressive list/link reset in `_reset.css` (which strips underlines and list bullets — classless mode needs them).
- Bundle size kept minimal: tokens (~18 KB source) + classless styles (~14 KB source) = ~20 KB minified.

---

## File Checklist

| File | Status | Description |
|---|---|---|
| `css/classless.css` | ✅ New | Classless mode source |
| `css/classless.min.css` | ✅ New | Minified bundle (~20 KB) |
| `package.json` | ✅ Updated | New `build:css:full`, `build:css:classless`, updated `build` |
| `classless.html` | ✅ New | Full demo page |
| `docs/MODES.md` | ✅ New | User-facing guide |
| `docs/MODES-IMPLEMENTATION.md` | ✅ New | This file |
| `README.md` | ✅ Updated | "Choose your mode" section added |
