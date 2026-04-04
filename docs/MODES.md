# njX UI — Two Modes Guide

njX UI ships with **two independent CSS bundles**. Pick the one that fits your project.

> ⚠️ **Use one mode per page.** Do not include both CSS files on the same page — they target the same elements and combining them will cause conflicts.

---

## Classless Mode

**File:** `css/classless.min.css` (~20 KB)

Classless Mode styles standard HTML elements directly — no class names required.  
Drop it into any page and your semantic HTML looks great instantly.

**Best for:**
- Content-heavy pages (blogs, docs, articles)
- Markdown/CMS output where you don't control the HTML
- Rapid prototyping
- Minimal markup requirements

**Install:**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/classless.min.css">
```

**Usage:**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/classless.min.css">
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This paragraph is styled automatically.</p>
  <a href="#">This link is styled.</a>
  <table>
    <thead><tr><th>Name</th><th>Value</th></tr></thead>
    <tbody><tr><td>foo</td><td>bar</td></tr></tbody>
  </table>
  <details>
    <summary>FAQ Item</summary>
    <p>Answer text here.</p>
  </details>
</body>
</html>
```

**Styled elements:**

| Category | Elements |
|---|---|
| Typography | `body`, `h1`–`h6`, `p`, `small`, `strong`, `em`, `mark`, `abbr` |
| Links | `a` with hover/focus rings |
| Lists | `ul`, `ol`, `li` (nested) |
| Code | `pre`, `code`, `kbd`, `samp` |
| Quotes | `blockquote`, `cite` |
| Separator | `hr` |
| Media | `img`, `figure`, `figcaption` |
| Tables | `table`, `thead`, `tbody`, `th`, `td` |
| Forms | `form`, `fieldset`, `legend`, `label`, `input`, `textarea`, `select`, `button` |
| FAQ | `details`, `summary` |
| Cards | `article` as default card container |
| Navigation | `nav`, `a` inside `nav`, `body > header`, `body > footer`, `main`, `section` |

**Theme support:**

Classless Mode supports all 9 njX UI themes via `data-theme` on `<html>`:

```html
<html data-theme="light">   <!-- or dark, red, blue, green, cyan, yellow, pink, purple -->
```

If no `data-theme` is set, it automatically respects `prefers-color-scheme` (light/dark based on OS setting).

**Demo:** [classless.html](../classless.html)

---

## Full UI Mode

**Files:** `css/style.min.css` (~243 KB) + `js/njx.js`

Full UI Mode is the complete njX UI library with utility classes, components, animations, and interactive JavaScript helpers.

**Best for:**
- Landing pages, dashboards, web apps
- Projects where you want full control over styling via classes
- Teams using Tailwind-style utility workflows
- Complex UI with modals, sidebars, carousels, etc.

**Install:**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/style.min.css">
<script src="https://cdn.jsdelivr.net/npm/njx-ui/js/njx.js"></script>
```

**Usage:**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/style.min.css">
</head>
<body>
  <button class="btn btn-primary">Primary Button</button>
  <div class="card mt-4">
    <p class="text-muted">A card with utility classes.</p>
  </div>
  <div class="flex items-center gap-4 mt-6">
    <span class="badge badge-success">Active</span>
    <span class="text-sm text-muted">Status indicator</span>
  </div>
</body>
</html>
```

**Includes:**
- 600+ utility classes (Tailwind-style)
- 25+ components (buttons, cards, modals, sidebar, etc.)
- 9 themes
- 30+ hover effects
- 15+ gradients
- Responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- Keyframe animations

**Demo:** [index.html](../index.html)

---

## Quick Comparison

| Feature | Classless | Full UI |
|---|:---:|:---:|
| Semantic element styling | ✅ | ✅ (via reset) |
| Utility classes | ❌ | ✅ 600+ |
| Components (btn, card…) | ❌ | ✅ 25+ |
| Bundle size | ~20 KB | ~243 KB |
| Themes | ✅ 9 | ✅ 9 |
| Auto dark/light via OS | ✅ | ❌ |
| JavaScript helpers | ❌ | ✅ |
| No markup changes needed | ✅ | ❌ |
| Responsive prefixes | ❌ | ✅ |

---

## CDN Links

### Classless Mode

```html
<!-- Latest -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/classless.min.css">

<!-- Pinned version (recommended for production) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui@1.0.5/css/classless.min.css">

<!-- Via GitHub -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbSaab/njx-css-ui@main/css/classless.min.css">

<!-- unpkg -->
<link rel="stylesheet" href="https://unpkg.com/njx-ui/css/classless.min.css">
```

### Full UI Mode

```html
<!-- Latest -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/style.min.css">
<script src="https://cdn.jsdelivr.net/npm/njx-ui/js/njx.js"></script>

<!-- Pinned version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui@1.0.5/css/style.min.css">
```
