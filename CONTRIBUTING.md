# Contributing to njX UI

Thanks for your interest in improving njX UI. Here's how to add components, fix bugs, or improve the library.

---

## Setup

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/njx-css-ui.git
cd njx-css-ui

# Install dev tools (for building style.min.css)
npm install
```

---

## Project structure

```
css/
├── style.css          ← entry point — only @import, no styles here
├── _base.css          ← ALL design tokens (colors, spacing, fonts…)
│                         edit this file to change variables globally
├── _buttons.css       ← button components
├── _cards.css         ← card variants
├── _form.css          ← form elements
├── _nav.css           ← navigation
├── _utils.css         ← utility classes (Tailwind-style)
├── _animations.css    ← @keyframes and animation classes
├── _hovers.css        ← hover effects
├── _gradients.css     ← gradient classes
└── ...                ← other component files

js/
└── njx.js             ← vanilla JS helpers (tabs, modal, accordion, toast)
```

**Rule:** never hardcode values. Always use variables from `_base.css`.

```css
/* Wrong */
.my-component { color: #14a0ff; padding: 16px; border-radius: 12px; }

/* Correct */
.my-component { color: var(--color-primary); padding: var(--space-4); border-radius: var(--radius-md); }
```

---

## How to add a new component

### 1. Create the CSS file

Create `css/_mycomponent.css`:

```css
/* ============================================================
   _mycomponent.css — Short description
   ============================================================ */

.my-component {
  background: var(--color-primary-opacity);
  color: var(--color-light);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  transition: var(--ease);
}

.my-component:hover {
  box-shadow: var(--shadow-primary);
}
```

### 2. Add to style.css

Open `css/style.css` and add the import in the right section:

```css
/* 3. Components */
@import "_buttons.css";
@import "_cards.css";
@import "_mycomponent.css";   /* ← add here */
```

### 3. Rebuild style.min.css

```bash
npm run build
# or
npx lightningcss --bundle --minify css/style.css -o css/style.min.css
```

### 4. Test it

Open `index.html` in a browser and check your component looks right across themes:

```js
// Test in browser console
['dark','light','red','blue','green','cyan','yellow','pink','purple'].forEach((t, i) => {
  setTimeout(() => document.documentElement.setAttribute('data-theme', t), i * 800)
})
```

---

## How to add utility classes

Utility classes go in `css/_utils.css`. Follow the existing naming:

```css
/* Display */
.d-block { display: block !important; }

/* Spacing — use --space-* variables */
.mt-4 { margin-top: var(--space-4) !important; }
.px-6 { padding-left: var(--space-6) !important; padding-right: var(--space-6) !important; }

/* Typography */
.text-primary { color: var(--color-primary) !important; }
```

For responsive variants, add to `css/_responsive.css` following the `sm:`, `md:`, `lg:`, `xl:` pattern already there.

---

## How to modify design tokens

All tokens live in `css/_base.css`. To add a new variable:

```css
:root {
  /* add your token here */
  --my-new-token: value;
}
```

If the token needs to change per theme, add it to each `[data-theme="..."]` block too.

---

## How to submit a Pull Request

### 1. Create a branch

```bash
git checkout -b feat/my-new-component
```

### 2. Make your changes

Follow the rules above. Build the minified file:

```bash
npm run build
```

### 3. Commit

```bash
git add css/_mycomponent.css css/style.css css/style.min.css
git commit -m "feat: add MyComponent"
```

### 4. Push to your fork

```bash
git push origin feat/my-new-component
```

### 5. Open a Pull Request

1. Go to your fork on GitHub
2. Click **Compare & pull request**
3. Describe what you added and why
4. Submit

---

## Commit message format

```
feat: add slider component
fix: button outline border on dark theme
docs: update README with new examples
refactor: move keyframes to _animations.css
```

Types: `feat` · `fix` · `docs` · `refactor` · `chore`

---

## Rules

- No hardcoded colors or sizes — use variables
- No external dependencies
- Every component must work across all 9 themes
- `style.min.css` must be rebuilt before committing
- One component per file, one PR per feature
