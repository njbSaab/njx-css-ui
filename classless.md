<div align="center">

# classless.css

### A semantic stylesheet for njX UI — style native HTML with zero classes.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![CSS](https://img.shields.io/badge/Pure_CSS-No_JS-1572B6?logo=css3&logoColor=white)](#)
[![Themes](https://img.shields.io/badge/Themes-9-blueviolet)](#themes)
[![Size](https://img.shields.io/badge/~47KB-minified-green)](#)

</div>

---

## What is classless.css?

`classless.css` is a drop-in stylesheet that makes plain, unstyled HTML look great — **without adding a single class to your markup.** Just link the file and write semantic HTML.

It follows the same philosophy as [PicoCSS](https://picocss.com): every native HTML element gets thoughtful, accessible styles automatically. Variants and states use **`data-*` attributes** — keeping markup clean and readable.

> **Scoping:** styles only activate inside `<main>`, `<article>`, `<section>`, or `<form>` elements that have no class. This prevents conflicts with the Full library (`style.min.css`).

```html
<!-- This is all you need -->
<link rel="stylesheet" href="css/classless.min.css" />
```

```html
<!-- Then write plain HTML -->
<main>
  <h1>Hello World</h1>
  <p>No classes. No configuration. Just HTML.</p>
  <button>Get started</button>
</main>
```

---

## Table of Contents

- [Quick Start](#quick-start)
- [Philosophy](#philosophy)
- [Themes](#themes)
- [Typography](#typography)
- [Links & Inline Elements](#links--inline-elements)
- [Lists](#lists)
- [Code](#code)
- [Tables](#tables)
- [Forms](#forms)
  - [Input Variants & Validation](#input-variants--validation)
  - [Input Types](#input-types)
  - [Checkbox, Radio & Switch](#checkbox-radio--switch)
  - [Loading State (aria-busy)](#loading-state-aria-busy)
- [Buttons](#buttons)
- [Details / Accordion](#details--accordion)
- [Article (Card)](#article-card)
- [Dialog (Modal)](#dialog-modal)
- [Progress & Meter](#progress--meter)
- [Semantic HTML5 Elements](#semantic-html5-elements)
- [Semantic Roles](#semantic-roles)
- [Definition List](#definition-list)
- [Media Elements](#media-elements)
- [Tooltip](#tooltip)
- [Loading Spinner](#loading-spinner)
- [CSS Variables Reference](#css-variables-reference)
- [Browser Support](#browser-support)

---

## Quick Start

**CDN (jsDelivr)**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/classless.min.css" />
```

**npm**
```bash
npm install njx-ui
```
```html
<link rel="stylesheet" href="node_modules/njx-ui/css/classless.min.css" />
```

**Recommended HTML shell:**
```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Page</title>
  <link rel="stylesheet" href="css/classless.min.css" />
</head>
<body>
  <main>
    <h1>Hello World</h1>
    <p>Styles applied automatically.</p>
    <button>Click me</button>
  </main>
</body>
</html>
```

---

## Philosophy

**One rule: write semantic HTML. classless.css styles it.**

| Instead of… | Write… |
|---|---|
| `<div class="card">` | `<article>` |
| `<div class="btn btn-primary">` | `<button>` |
| `<div class="alert alert-error">` | `<div role="alert">` |
| `<div class="spinner">` | `<span data-loading></span>` |
| `<div class="badge success">Valid</div>` | `<input data-variant="success">` |

Where variants are needed, they use **`data-*` attributes** — no class names:

```html
<button data-variant="accent">Accent</button>
<button data-variant="success">Success</button>
<input type="text" data-variant="error" value="Invalid value" />
```

---

## Themes

Set `data-theme` on `<html>` (or any container). Default is `dark`.

```html
<html data-theme="dark">     <!-- default -->
<html data-theme="light">
<html data-theme="blue">
<html data-theme="red">
<html data-theme="green">
<html data-theme="cyan">
<html data-theme="yellow">
<html data-theme="pink">
<html data-theme="purple">
```

**Switch theme with JS:**
```js
document.documentElement.setAttribute('data-theme', 'purple');
localStorage.setItem('njx-theme', 'purple');
```

---

## Typography

All heading levels, paragraphs, and text modifiers are styled automatically inside `<main>`, `<article>`, or `<section>` (no class).

```html
<main>
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>

  <p>Regular paragraph with <strong>bold</strong>, <em>italic</em>, and <small>small</small> text.</p>

  <blockquote>
    A meaningful quote or highlighted passage.
    <cite>— Author Name</cite>
  </blockquote>

  <hr />
</main>
```

---

## Links & Inline Elements

```html
<p>Visit <a href="#">our documentation</a> for more.</p>

<!-- Highlighted text -->
<p>Press <mark>Ctrl+K</mark> to open search.</p>

<!-- Abbreviation -->
<p><abbr title="Cascading Style Sheets">CSS</abbr> is great.</p>

<!-- Sub / superscript -->
<p>H<sub>2</sub>O and E = mc<sup>2</sup></p>

<!-- Inserted / deleted text -->
<p>Price: <del>$99</del> <ins>$49</ins></p>

<!-- Italic/bold inline -->
<p><cite>Article title</cite> — <dfn>Term definition</dfn> — <var>x</var> = 42</p>

<!-- Quote -->
<p><q>Inline quoted text appears here.</q></p>
```

**Link variants** — `data-variant` on `<a>`:

```html
<a href="#" data-variant="accent">Accent</a>
<a href="#" data-variant="success">Success</a>
<a href="#" data-variant="warning">Warning</a>
<a href="#" data-variant="error">Error</a>
<a href="#" data-variant="dark">Dark</a>
```

---

## Lists

```html
<ul>
  <li>Unordered item</li>
  <li>Another item
    <ul><li>Nested item</li></ul>
  </li>
</ul>

<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

---

## Code

```html
<!-- Inline code -->
<p>Use the <code>npm install</code> command.</p>

<!-- Keyboard shortcut -->
<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>

<!-- Code block -->
<pre><code>const greeting = "Hello, World!";
console.log(greeting);</code></pre>
```

---

## Tables

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>classless.min.css</td>
      <td>Stylesheet</td>
      <td>Stable</td>
    </tr>
  </tbody>
</table>
```

---

## Forms

All form elements are styled out of the box inside `<form>` or `<main>` (no class).

```html
<form>
  <fieldset>
    <legend>Account details</legend>

    <label for="name">Full name</label>
    <input type="text" id="name" placeholder="John Doe" />

    <label for="email">Email</label>
    <input type="email" id="email" placeholder="you@example.com" />

    <label for="bio">Bio</label>
    <textarea id="bio" rows="4" placeholder="Tell us about yourself"></textarea>

    <label for="role">Role</label>
    <select id="role">
      <option>Designer</option>
      <option>Developer</option>
      <option>Manager</option>
    </select>

    <button type="submit">Create account</button>
    <input type="reset" value="Clear form" />
  </fieldset>
</form>
```

### Input Variants & Validation

Use `data-variant` for semantic color states, or `aria-invalid` for ARIA-compliant validation:

```html
<!-- data-variant — always visible state -->
<input type="text" data-variant="error" value="invalid input" />
<input type="text" data-variant="success" value="valid@email.com" />
<input type="text" data-variant="warning" placeholder="Warning state" />
<input type="text" data-variant="accent" placeholder="Accent" />

<!-- aria-invalid — ARIA-compliant validation -->
<input type="email" aria-invalid="true" value="not-an-email" />
<input type="email" aria-invalid="false" value="user@example.com" />
<textarea aria-invalid="true">Too short</textarea>
```

Available `data-variant` values for inputs: `accent` · `success` · `warning` · `error`

### Input Types

```html
<!-- Range slider -->
<input type="range" min="0" max="100" value="65" />

<!-- Color picker -->
<input type="color" value="#14a0ff" />

<!-- Date / time -->
<input type="date" />
<input type="time" />
<input type="datetime-local" />

<!-- File upload -->
<input type="file" accept="image/*" />

<!-- Search -->
<input type="search" placeholder="Search..." />
```

### Checkbox, Radio & Switch

```html
<!-- Checkbox -->
<label>
  <input type="checkbox" /> Subscribe to newsletter
</label>

<!-- Radio -->
<label><input type="radio" name="plan" /> Free</label>
<label><input type="radio" name="plan" /> Pro</label>

<!-- Toggle switch — use role="switch" on checkbox -->
<label>
  <input type="checkbox" role="switch" />
  Enable notifications
</label>
```

### Loading State (aria-busy)

Apply `aria-busy="true"` to show a frosted overlay with spinner — no JS required for the visual.

```html
<!-- Button in loading state (hides text, shows spinner) -->
<button aria-busy="true">Saving…</button>
<button aria-busy="true" data-variant="accent">Submitting…</button>

<!-- Container loading overlay -->
<article aria-busy="true">
  <p>Loading content…</p>
</article>

<section aria-busy="true">
  <p>Fetching data…</p>
</section>
```

---

## Buttons

Buttons are styled by default. Use `data-variant` for color variants:

```html
<!-- Default (primary color) -->
<button>Click me</button>

<!-- Variants -->
<button data-variant="accent">Accent</button>
<button data-variant="success">Success</button>
<button data-variant="error">Danger</button>
<button data-variant="warning">Warning</button>
<button data-variant="dark">Dark</button>
<button data-variant="light">Light</button>

<!-- Disabled -->
<button disabled>Disabled</button>

<!-- Loading -->
<button aria-busy="true">Loading</button>

<!-- input types also styled -->
<input type="submit" value="Submit" />
<input type="reset" value="Reset" />
```

---

## Details / Accordion

```html
<details>
  <summary>What is classless.css?</summary>
  <p>A drop-in stylesheet that styles semantic HTML with no classes required.</p>
</details>

<details open>
  <summary>Is it free?</summary>
  <p>Yes, completely free under the MIT license.</p>
</details>
```

---

## Article (Card)

`<article>` inside `<main>` or `<section>` (no class) renders as a styled card:

```html
<article>
  <header>
    <h3>Card Title</h3>
    <p>Subtitle or meta info</p>
  </header>
  <p>Card content goes here.</p>
  <footer>
    <small>Published April 2026</small>
    <button>Read more</button>
  </footer>
</article>
```

---

## Dialog (Modal)

Native `<dialog>` element with backdrop blur. Open via JS `showModal()`.

```html
<dialog id="my-dialog">
  <article>
    <header>
      <h2>Confirm action</h2>
      <button rel="prev" onclick="document.getElementById('my-dialog').close()"></button>
    </header>
    <p>Are you sure you want to delete this item?</p>
    <footer>
      <button data-variant="error">Delete</button>
      <button onclick="document.getElementById('my-dialog').close()">Cancel</button>
    </footer>
  </article>
</dialog>

<button onclick="document.getElementById('my-dialog').showModal()">Open dialog</button>
```

---

## Progress & Meter

```html
<!-- Indeterminate progress (shows animated bar) -->
<progress></progress>

<!-- Determinate progress -->
<progress value="65" max="100"></progress>

<!-- Meter (semantic value indicator) -->
<meter value="0.7" min="0" max="1" low="0.3" high="0.75" optimum="0.5"></meter>

<!-- Output (computed form result) -->
<form oninput="result.value = +a.value + +b.value">
  <input type="range" id="a" value="50" /> +
  <input type="range" id="b" value="25" />
  = <output id="result">75</output>
</form>
```

---

## Semantic HTML5 Elements

```html
<!-- aside — side note / callout -->
<aside>
  This is a side note or supplementary content.
</aside>

<!-- address -->
<address>
  123 Street, City<br />
  <a href="mailto:hello@example.com">hello@example.com</a>
</address>

<!-- time -->
<p>Published on <time datetime="2026-04-13">April 13, 2026</time>.</p>

<!-- var — mathematical / programming variables -->
<p>Area: <var>A</var> = <var>π</var> × <var>r</var>²</p>

<!-- sub / superscript -->
<p>H<sub>2</sub>O and E = mc<sup>2</sup></p>

<!-- ins / del -->
<p>Price: <del>$99</del> <ins>$49</ins></p>

<!-- q — inline quotation -->
<p><q>This is an inline quote with decorative marks.</q></p>

<!-- dfn — term definition -->
<p><dfn>Classless CSS</dfn> means styling without adding class names.</p>

<!-- search element -->
<search>
  <input type="search" placeholder="Search…" />
  <button>Go</button>
</search>
```

---

## Semantic Roles

ARIA roles trigger styled alert/status/note banners automatically:

```html
<!-- Error / alert (red) -->
<div role="alert">
  Something went wrong. Please try again.
</div>

<!-- Success / status (green) -->
<div role="status">
  Your changes have been saved successfully.
</div>

<!-- Warning / note (yellow) -->
<div role="note">
  This action cannot be undone.
</div>
```

---

## Definition List

```html
<dl>
  <dt>Version</dt>
  <dd>1.0.5</dd>

  <dt>License</dt>
  <dd>MIT</dd>

  <dt>Dependencies</dt>
  <dd>None</dd>
</dl>
```

---

## Media Elements

```html
<!-- Audio player -->
<audio controls src="audio.mp3"></audio>

<!-- Video player -->
<video controls src="video.mp4" poster="thumb.jpg"></video>

<!-- Iframe (e.g. embedded map) -->
<iframe src="https://example.com" title="Embedded content"></iframe>

<!-- Figure with caption -->
<figure>
  <img src="photo.jpg" alt="Description" />
  <figcaption>Caption text goes here.</figcaption>
</figure>
```

---

## Tooltip

Add a tooltip to any element via `data-tooltip` attribute — no JS required:

```html
<button data-tooltip="Click to save your changes">Save</button>

<abbr data-tooltip="Cascading Style Sheets">CSS</abbr>

<span data-tooltip="This field is required">* Name</span>
```

---

## Loading Spinner

### Overlay spinner — `aria-busy`

Applies a frosted-glass overlay with a centered spinner to any block element:

```html
<article aria-busy="true">
  <p>Loading content…</p>
</article>
```

### Inline spinner — `data-loading`

A small spinning indicator for inline use (inside text, next to labels):

```html
<p><span data-loading></span> Fetching data…</p>

<button>
  <span data-loading></span> Saving
</button>
```

---

## CSS Variables Reference

All design tokens are defined in `_base.css`. Key variables:

### Colors

```css
--color-primary       /* Main brand color  (default: #14a0ff) */
--color-accent        /* Secondary accent  (default: #ff6e00) */
--color-success       /* Green             (default: #9ce700) */
--color-error         /* Red               (default: #d43939) */
--color-warning       /* Yellow            (default: #ffdd00) */
--color-muted         /* Subdued text      (default: #8a8f99) */
```

### Backgrounds & Text

```css
--color-dark             /* Page background      */
--color-dark-secondary   /* Cards, inputs, nav   */
--color-light            /* Primary text         */
--color-muted            /* Secondary/hint text  */
```

### Color scales

```css
--color-primary-100 … --color-primary-900   /* Light → dark shades */
--color-accent-100  … --color-accent-900
--color-success-100 … --color-success-800
--color-error-100   … --color-error-800
--color-neutral-50  … --color-neutral-900
```

### Typography

```css
--font-sans           /* Body font     (Inter)       */
--font-heading        /* Heading font  (Poppins)     */
--font-mono           /* Code font     (Roboto Mono) */

--fs-xs:   12px
--fs-sm:   14px
--fs-base: 16px
--fs-lg:   18px
--fs-xl:   20px
--fs-2xl:  24px
--fs-3xl:  30px
--fs-4xl:  36px
--fs-5xl:  48px
--fs-hero: 96px

/* Fluid / responsive variants */
--fs-f-base  --fs-f-lg  --fs-f-xl  --fs-f-2xl  /* etc. */
```

### Spacing

```css
--space-1:  4px    --space-2:  8px    --space-3:  12px
--space-4:  16px   --space-5:  20px   --space-6:  24px
--space-8:  32px   --space-10: 40px   --space-12: 48px
--space-16: 64px   --space-20: 80px   --space-24: 96px
```

### Border Radius

```css
--radius-none: 0px     --radius-sm:  6px
--radius-md:  12px     --radius-lg:  20px
--radius-xl:  30px     --radius-2xl: 40px
--radius-full: 9999px
```

### Shadows

```css
--shadow-sm       --shadow-md       --shadow-lg
--shadow-primary  --shadow-accent   --shadow-glow
```

### Transitions

```css
--ease-fast: 0.15s ease-in-out
--ease:      0.3s  ease-in-out
--ease-slow: 0.5s  ease-in-out
```

### Form customization

Override form appearance per-scope with local CSS variables:

```css
article {
  --form-border:      #444;           /* input border color  */
  --form-bg-input:    #1a1a1a;        /* input background    */
  --form-radius:      8px;            /* input border-radius */
  --form-padding:     8px 12px;       /* input padding       */
  --form-font-size:   14px;           /* input font size     */
}
```

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| Core styles | 90+ | 90+ | 14+ | 90+ |
| `color-mix()` | 111+ | 113+ | 16.2+ | 111+ |
| `backdrop-filter` (blur overlay) | 76+ | 103+ | 9+ | 79+ |
| `dialog` element | 37+ | 98+ | 15.4+ | 79+ |
| CSS `:where()` (scoping) | 88+ | 78+ | 14+ | 88+ |
| `input[type="color"]` styling | 53+ | 29+ | 12.1+ | 14+ |

---

## What's Included

| Feature | Status |
|---|---|
| 9 color themes (`data-theme`) | ✅ |
| Typography — headings, paragraphs, blockquote | ✅ |
| Inline elements — mark, kbd, code, abbr, q, dfn, var | ✅ |
| Lists — ul, ol, nested | ✅ |
| Tables | ✅ |
| Forms — all input types, select, textarea, fieldset | ✅ |
| `aria-invalid` validation states | ✅ |
| `data-variant` on inputs (success/error/warning/accent) | ✅ |
| Toggle switch (`input[role="switch"]`) | ✅ |
| Buttons with `data-variant` | ✅ |
| `aria-busy` loading (button + container overlay) | ✅ |
| `data-loading` inline spinner | ✅ |
| Details / accordion | ✅ |
| Article card | ✅ |
| Dialog with backdrop | ✅ |
| Progress, meter, output | ✅ |
| Aside callout | ✅ |
| Address, cite, del, ins, sub, sup | ✅ |
| `[role="alert/status/note"]` banners | ✅ |
| Definition list (`dl/dt/dd`) | ✅ |
| Audio, video, iframe | ✅ |
| `<search>` element | ✅ |
| `data-tooltip` | ✅ |
| Custom scrollbar | ✅ |
| `::selection` themed | ✅ |
| Focus ring (keyboard navigation) | ✅ |
| Responsive tokens (breakpoints) | ✅ |

---

## License

MIT — free for personal and commercial use.

Part of [njX UI](https://github.com/njbSaab/njx-css-ui) by [@njbSaab](https://github.com/njbSaab).
