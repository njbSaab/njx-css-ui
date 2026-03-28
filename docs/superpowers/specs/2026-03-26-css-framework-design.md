# CSS Framework Design Spec
Date: 2026-03-26

## Goal
Reorganize the `css/` folder into a unified, maintainable CSS micro-framework for fast LP development. All sizes, colors, and spacing driven by variables in one place (`_base.css`). Tailwind-style utils. 9 color themes via `data-theme`. Bulma components ported to plain CSS. Living component library in `components.html`.

---

## 1. File Structure

```
css/
  _base.css        ← ALL design tokens (:root + data-theme)
  _reset.css       ← normalize + base reset (from current style.css + _base.css)
  _grid.css        ← grid system (unchanged)
  _typography.css  ← .title-* and .text-* classes via vars
  _utils.css       ← all utility classes using vars (no hardcoded px)
  _animations.css  ← ALL @keyframes + animation utility classes
  _buttons.css     ← button components (no @keyframes)
  _cards.css       ← card components
  _forms.css       ← form components
  _nav.css         ← navigation
  _tabs.css        ← tabs
  _collapse.css    ← accordion/collapse
  _dropdown.css    ← dropdowns
  _slider.css      ← slider
  _popups.css      ← modals/popups
  _hovers.css      ← hover effects
  _tags.css        ← tags/badges
  _sections.css    ← global section/wrapper styles (from _global.css)
  style.css        ← ONLY @import statements, zero styles

components.html    ← living component library with sidebar
```

### What changes vs current
- `style.css`: remove all styles, keep only `@import`
- All `@keyframes` consolidated into `_animations.css` (currently scattered across `style.css`, `_animations.css`, `_buttons.css`)
- `_global.css` split into `_typography.css` + `_sections.css`
- `_base.css` gets full token set (currently missing spacing, radius, z-index, transitions)
- All duplicates removed: `z-0/z-1/z-10/z-50`, `w-25/w-50/w-75`, `pb-60/pb-80`, `pt-30/pt-40/pt-50`, `text-success`, `mx-auto`
- Typos fixed: `flex-center-cetner` → `flex-center`, `tranlate-center` → `translate-center`, `rouded-xl` → `rounded-xl`

---

## 2. Design Tokens (_base.css)

### Colors — base + shades (Tailwind-style)
```css
:root {
  /* Base semantic colors */
  --color-primary:   #14a0ff;
  --color-accent:    #F9063F;
  --color-success:   #9ce700;
  --color-error:     #d43939;
  --color-warning:   #ffdd00;
  --color-shadow:    #14a1ff8e;
  --bg-main:         #212121;
  --bg-card:         rgba(0, 0, 0, 0.38);
  --bg-secondary:    #1a1a1a;
  --text-main:       #ffffff;
  --text-secondary:  #000000;
  --text-muted:      #747681;
  --text-light:      #d2d6dd;

  /* Extended shades — primary (100=lightest, 900=darkest) */
  --color-primary-100: #e6f4ff;
  --color-primary-200: #bde0ff;
  --color-primary-300: #7ec8ff;
  --color-primary-400: #3db1ff;
  --color-primary-500: #14a0ff;  /* base */
  --color-primary-600: #0080e0;
  --color-primary-700: #0060b0;
  --color-primary-800: #004080;
  --color-primary-900: #002050;

  /* Extended shades — accent */
  --color-accent-100:  #ffe6ec;
  --color-accent-200:  #ffb3c2;
  --color-accent-300:  #ff6680;
  --color-accent-400:  #ff2255;
  --color-accent-500:  #F9063F;  /* base */
  --color-accent-600:  #cc0030;
  --color-accent-700:  #990020;
  --color-accent-800:  #660015;
  --color-accent-900:  #33000a;

  /* Extended shades — success */
  --color-success-100: #edffd1;
  --color-success-200: #ccff80;
  --color-success-300: #aaee33;
  --color-success-400: #9ce700;  /* base */
  --color-success-500: #80cc00;
  --color-success-600: #60a000;
  --color-success-700: #407000;
  --color-success-800: #204000;

  /* Neutrals (greys) */
  --color-neutral-50:  #f9f9f9;
  --color-neutral-100: #f0f0f0;
  --color-neutral-200: #d2d6dd;
  --color-neutral-300: #aaaaaa;
  --color-neutral-400: #747681;
  --color-neutral-500: #555555;
  --color-neutral-600: #3f4144;
  --color-neutral-700: #2a2a2a;
  --color-neutral-800: #1a1a1a;
  --color-neutral-900: #0a0a0a;
}
```

Each theme overrides only the base semantic tokens (`--color-primary`, `--color-accent`, etc.) — shades are auto-generated relative to base values.

### Font Sizes — Fixed (px)
```css
  --fs-xs:   12px;
  --fs-sm:   14px;
  --fs-base: 16px;
  --fs-lg:   18px;
  --fs-xl:   20px;
  --fs-2xl:  24px;
  --fs-3xl:  30px;
  --fs-4xl:  36px;
  --fs-5xl:  48px;
  --fs-6xl:  60px;
  --fs-7xl:  72px;
  --fs-hero: 96px;
```

### Font Sizes — Fluid (vw via clamp)
```css
  --fs-f-xs:   clamp(10px, 1vw,   12px);
  --fs-f-sm:   clamp(12px, 1.2vw, 14px);
  --fs-f-base: clamp(14px, 1.4vw, 16px);
  --fs-f-lg:   clamp(16px, 1.6vw, 20px);
  --fs-f-xl:   clamp(18px, 2vw,   24px);
  --fs-f-2xl:  clamp(20px, 2.5vw, 30px);
  --fs-f-3xl:  clamp(24px, 3vw,   36px);
  --fs-f-4xl:  clamp(28px, 4vw,   48px);
  --fs-f-5xl:  clamp(36px, 5vw,   60px);
  --fs-f-6xl:  clamp(40px, 6vw,   72px);
  --fs-f-7xl:  clamp(48px, 8vw,   96px);
  --fs-f-hero: clamp(60px, 10vw, 120px);
```

### Spacing Scale
```css
  --space-1:  4px;   --space-2:  8px;   --space-3:  12px;
  --space-4:  16px;  --space-5:  20px;  --space-6:  24px;
  --space-8:  32px;  --space-10: 40px;  --space-12: 48px;
  --space-16: 64px;  --space-20: 80px;  --space-24: 96px;
```

### Border Radius
```css
  --radius-sm:   6px;    --radius-md:   12px;
  --radius-lg:   20px;   --radius-xl:   30px;
  --radius-2xl:  40px;   --radius-full: 9999px;
```

### Transitions
```css
  --ease-fast: 0.15s ease-in-out;
  --ease:      0.3s ease-in-out;
  --ease-slow: 0.5s ease-in-out;
```

### Z-index
```css
  --z-0: 0;  --z-1: 1;  --z-10: 10;
  --z-50: 50; --z-100: 100; --z-modal: 1000;
```

### Line Height
```css
  --lh-tight:   0.9;   --lh-snug:    1.2;
  --lh-normal:  1.5;   --lh-relaxed: 1.8;
```

### Font Families
```css
  --font-sans: "Roboto", -apple-system, "Segoe UI", sans-serif;
  --font-mono: "Consolas", "Monaco", monospace;
```

---

## 3. Theme System

9 themes via `data-theme` attribute on `<html>`. Each theme overrides only color tokens. All other tokens (spacing, radius, etc.) stay constant.

```css
:root, [data-theme="dark"]   { /* default, current colors */ }
[data-theme="light"]         { --bg-main: #f5f5f5; --text-main: #111; ... }
[data-theme="red"]           { --color-primary: #ff2233; --bg-main: #1a0505; ... }
[data-theme="blue"]          { --color-primary: #0055ff; --bg-main: #030d1a; ... }
[data-theme="green"]         { --color-primary: #00cc44; --bg-main: #031a05; ... }
[data-theme="cyan"]          { --color-primary: #00e5ff; --bg-main: #031418; ... }
[data-theme="yellow"]        { --color-primary: #ffdd00; --bg-main: #1a1400; ... }
[data-theme="pink"]          { --color-primary: #ff0088; --bg-main: #1a0312; ... }
[data-theme="purple"]        { --color-primary: #9933ff; --bg-main: #0d0318; ... }
```

Switch: `document.documentElement.setAttribute('data-theme', 'purple')`

---

## 4. Typography Naming (_typography.css)

### Title classes (all use vars, font-weight: 900)
| Class | Size var | Fluid var |
|---|---|---|
| `.title-hero` | `--fs-hero` | `--fs-f-hero` |
| `.title-xl` | `--fs-7xl` | `--fs-f-7xl` |
| `.title-lg` | `--fs-6xl` | `--fs-f-6xl` |
| `.title-md` | `--fs-5xl` | `--fs-f-5xl` |
| `.title-sm` | `--fs-4xl` | `--fs-f-4xl` |
| `.title-xs` | `--fs-3xl` | `--fs-f-3xl` |

Add `.fluid` modifier to switch to fluid (vw) size: `<h1 class="title-hero fluid">`

### Text classes
| Class | Size | Weight |
|---|---|---|
| `.text-lead` | `--fs-xl` | 500 |
| `.text-body` | `--fs-base` | 400 |
| `.text-sm` | `--fs-sm` | 400 |
| `.text-xs` | `--fs-xs` | 400 |
| `.text-caption` | `--fs-xs` | 500, uppercase |
| `.text-label` | `--fs-sm` | 600 |

### Text modifier utilities
`.text-upper`, `.text-lower`, `.text-cap`, `.text-center`, `.text-left`, `.text-right`, `.text-justify`
`.text-bold` (700), `.text-black` (900), `.text-normal` (400)
`.text-primary`, `.text-accent`, `.text-success`, `.text-error`, `.text-warning`, `.text-muted`, `.text-white`

---

## 5. Utils (_utils.css) — Tailwind-style, all via vars

### Spacing — margin/padding use `--space-*`
`mt-1..mt-24`, `mb-1..mb-24`, `ml-1..ml-24`, `mr-1..mr-24`
`mx-1..mx-24`, `my-1..my-24`
`pt-1..pt-24`, `pb-1..pb-24`, `px-1..px-24`, `py-1..py-24`
`m-0`, `p-0`, `mx-auto`

### Gap — use `--space-*`
`gap-1..gap-24`

### Sizing
`w-full`, `w-fit`, `w-screen`, `w-auto`, `w-25`, `w-50`, `w-75`
`h-full`, `h-screen`, `h-auto`
`max-w-full`, `max-w-container` (1340px)

### Flex
`flex`, `flex-col`, `flex-row`, `flex-wrap`, `flex-nowrap`
`items-start`, `items-center`, `items-end`, `items-stretch`
`justify-start`, `justify-center`, `justify-end`, `justify-between`, `justify-around`
`flex-center` (flex + center + center), `flex-grow`, `flex-shrink`, `flex-none`

### Position
`relative`, `absolute`, `fixed`, `sticky`
`top-0`, `bottom-0`, `left-0`, `right-0`
`translate-center`, `translateX-center`, `translateY-center`

### Display
`block`, `inline`, `inline-block`, `flex`, `grid`, `none`, `hidden`

### Border Radius — use `--radius-*`
`rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`

### Z-index — use `--z-*`
`z-0`, `z-1`, `z-10`, `z-50`, `z-100`, `z-modal`

### Opacity
`opacity-0`, `opacity-25`, `opacity-50`, `opacity-75`, `opacity-100`

### Overflow
`overflow-hidden`, `overflow-auto`, `overflow-scroll`

### Transitions — use `--ease-*`
`transition` (0.3s), `transition-fast` (0.15s), `transition-slow` (0.5s)

### Shadows
`shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-none`
`shadow-primary` (glow with --color-primary), `shadow-accent` (glow with --color-accent)

### Responsive visibility
`hide-xs` (<599px), `hide-sm` (600-899px), `hide-md` (900-1199px), `hide-lg` (>1200px)
`mobile` (hidden on desktop, show on mobile), `desktop` (hidden on mobile)

### Background
`bg-primary`, `bg-accent`, `bg-success`, `bg-error`, `bg-main`, `bg-card`
`bg-img` (cover+center), `bg-after`, `bg-before`

### Cursor
`cursor-pointer`, `cursor-default`

---

## 6. Components from Bulma (ported to plain CSS + our vars)

### Elements
- **button** → merges with our existing `_buttons.css`
- **tag/badge** → `.tag`, `.tag-primary`, `.tag-accent`, `.tag-success`, `.tag-error`
- **notification** → `.notification`, `.notification-primary`, `.notification-success`
- **progress** → `.progress`, `.progress-primary`, `.progress-accent`
- **table** → `.table`, `.table-striped`, `.table-bordered`
- **box** → `.box` (card-like container)
- **loader** → `.loader`, `.loader-primary`
- **delete** → `.btn-delete` (× button)
- **icon** → `.icon`, `.icon-sm`, `.icon-lg`

### Components
- **card** → merges with our `_cards.css`: `.card`, `.card-header`, `.card-body`, `.card-footer`
  Variants: `.card-glass`, `.card-dark`, `.card-bordered`, `.card-primary`
- **dropdown** → `.dropdown`, `.dropdown-menu`, `.dropdown-item` (our existing + Bulma structure)
- **modal** → merges with `_popups.css`: `.modal`, `.modal-overlay`, `.modal-content`
- **navbar** → merges with `_nav.css`
- **tabs** → merges with `_tabs.css`: `.tabs`, `.tab`, `.tab.is-active`
- **breadcrumb** → `.breadcrumb`, `.breadcrumb-item`
- **pagination** → `.pagination`, `.pagination-item`, `.pagination-prev`, `.pagination-next`
- **message** → `.message`, `.message-header`, `.message-body`
  Variants: `.message-primary`, `.message-success`, `.message-error`, `.message-warning`
- **panel** → `.panel`, `.panel-header`, `.panel-item`

---

## 7. Animations (_animations.css)

All `@keyframes` consolidated here (from `style.css`, `_animations.css`, `_buttons.css`):
`floating`, `fadeIn`, `fadeOut`, `fadeInOut`, `scaling`, `scaling-2`, `heartbeat`, `moveLight`, `moveAndRotate`, `rotate90`, `rotate90-smooth`, `rainbow-shadow`, `breathe`, `scan`, `borderPulse`, `colorShift`, `animate-gradient`, `AnimateBorder`, `shimmer`, `glowing`, `glint`, `border-glint`

Animation utility classes:
`.animate-float`, `.animate-scale`, `.animate-fade-in`, `.animate-fade-out`
`.animate-pulse`, `.animate-spin`, `.animate-heartbeat`
`.animate-rainbow`, `.animate-breathe`, `.animate-scan`

---

## 8. components.html — Living Component Library

Layout: fixed sidebar (200px) + scrollable main content.

### Sidebar sections
1. 🎨 Tokens (colors, fonts, spacing preview)
2. 🔤 Typography (.title-*, .text-*)
3. ⚡ Utils (spacing, flex, position)
4. 🔲 Buttons (all variants)
5. 🃏 Cards (all variants)
6. ✨ Animations (all classes with live demo)
7. 📋 Forms
8. 🗂 Tabs
9. 💬 Popups / Modals
10. 📌 Nav
11. 🏷 Tags & Badges
12. 🎭 Hovers
13. 📊 Tables, Progress, Notifications (from Bulma)
14. 🔔 Message, Panel, Breadcrumb, Pagination

### Each component block shows
- Live rendered example
- Class name(s)
- Copy-paste HTML snippet (code block)
- Theme switcher at top (changes `data-theme` on the preview)
