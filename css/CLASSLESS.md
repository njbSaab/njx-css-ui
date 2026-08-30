# njX UI — Classless Build (`classless.min.css`)

> A semantic stylesheet that makes plain HTML look great **without a single class in your markup**. Same philosophy as PicoCSS: every native element gets thoughtful, accessible styles automatically.
>
> **Size:** ~47 KB minified · pure CSS, no JS.

Full and Classless are **standalone builds — use one stylesheet at a time**, never both together. If you need component classes, utilities and grids, see [FULL.md](FULL.md) instead.

---

## Installation

**CDN (recommended):**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/classless.min.css" />
<html data-theme="dark">
```

**npm:**

```bash
npm i njx-ui
```

```html
<link rel="stylesheet" href="node_modules/njx-ui/css/classless.min.css" />
```

**Self-hosted:** download from [njxui.dev](https://njxui.dev) (Download → Classless). Source partials: `_base.css` (tokens + themes) and `_native.css` (element styles), bundled by `classless.css`.

---

## How it works

Write semantic HTML — that's the whole API:

```html
<main>
  <h1>Hello World</h1>
  <p>No classes. No configuration. Just HTML.</p>
  <button>Get started</button>
</main>
```

**Scoping rule:** styles activate inside `<main>`, `<article>`, `<section>` and `<form>` elements **that have no class attribute**. Add any class to a container and njX leaves it alone — your own CSS stays in control.

**Variants via `data-*` attributes**, so markup stays clean:

```html
<button data-variant="accent">Accent</button>
<input type="email" aria-invalid="true" value="not-an-email" />
<article aria-busy="true">Loading…</article>
```

Button variants: `accent` · `success` · `error` · `warning` · `dark` · `light`. Input states: `data-variant="accent|success|warning|error"` or ARIA-compliant `aria-invalid`.

---

## Themes

The same 9 themes as the Full build, switched by one attribute:

```html
<html data-theme="dark">   <!-- default -->
```

`dark` · `light` · `red` · `blue` · `green` · `cyan` · `yellow` · `pink` · `purple`

```js
document.documentElement.setAttribute('data-theme', 'green');
```

---

## What gets styled

Everything a content page or app shell is built from:

- **Typography** — headings, paragraphs, blockquotes, `hr`, small/mark/kbd
- **Links & inline elements** — `a`, `abbr`, `code`, `samp`, `sub`/`sup`
- **Lists** — `ul`, `ol`, nested lists, definition lists (`dl`)
- **Code** — inline `code` and `pre` blocks
- **Tables** — striped, hoverable, responsive out of the box
- **Forms** — `input` (all types), `select`, `textarea`, labels, fieldsets; validation states, checkbox/radio/**switch**, loading via `aria-busy`
- **Buttons** — default, variants and sizes via `data-*`
- **Interactive HTML** — `details`/`summary` (accordion), `dialog` (modal), `progress`, `meter`
- **Structure** — `article` (renders as a card), `header`/`footer`/`nav`/`aside`, semantic roles
- **Media** — `img`, `figure`/`figcaption`, `video`, `iframe`
- **Extras** — tooltips (`data-tooltip`), loading spinners (`aria-busy`, `data-loading`)

Element-by-element reference with examples: [../classless.md](../classless.md) and [njxui.dev/classless-components](https://njxui.dev/classless-components).

---

## Customization

All visuals are driven by CSS variables — override tokens, no build step:

```css
:root {
  --color-primary: #7c3aed;
  --font-body: 'Inter', sans-serif;
  --radius-md: 6px;
}
```

The variable catalogue (colors, scales, typography, spacing, radius, shadows, form tokens) is documented in [../classless.md → CSS Variables Reference](../classless.md#css-variables-reference).

---

## When to choose Classless

| You need… | Build |
|---|---|
| Prototypes, docs, blogs, admin pages — styled HTML with zero classes | **Classless (`classless.min.css`)** |
| Component classes, utilities, grids, complex UI | [Full (`style.min.css`)](FULL.md) |

MIT License · [GitHub](https://github.com/njbSaab/njx-css-ui) · [njxui.dev](https://njxui.dev)
