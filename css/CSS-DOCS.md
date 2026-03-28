# CSS Library — Документация

> Файл подключения: `css/style.css`  
> Архитектура: **Design Tokens → Система → Компоненты → Секции**

---

## Содержание

1. [Подключение](#1-подключение)
2. [Design Tokens (_base.css)](#2-design-tokens)
3. [Темы (data-theme)](#3-темы)
4. [Responsive Tokens — брейкпоинты](#4-responsive-tokens)
5. [Responsive Prefix Utils (_responsive.css)](#5-responsive-prefix-utils)
6. [Сетка (_grid.css)](#6-сетка)
7. [Типографика (_typography.css)](#7-типографика)
8. [Утилиты (_utils.css)](#8-утилиты)
9. [Кнопки (_buttons.css)](#9-кнопки)
10. [Карточки (_cards.css)](#10-карточки)
11. [Формы (_form.css)](#11-формы)
12. [Градиенты (_gradients.css)](#12-градиенты)
13. [Анимации (_animations.css)](#13-анимации)
14. [Навигация (_nav.css)](#14-навигация)
15. [Табы (_tab.css)](#15-табы)
16. [Уведомления (_notifications.css)](#16-уведомления)

---

## 1. Подключение

```html
<link rel="stylesheet" href="css/style.css" />
```

Файл `style.css` — только точка входа с `@import`. Все стили модульные.

```
_base.css          ← Design Tokens + Responsive Tokens
_reset.css         ← Сброс стилей
_grid.css          ← Сетка
_typography.css    ← Типографика
_utils.css         ← Утилиты (Tailwind-style)
...компоненты...
_responsive.css    ← Responsive prefix utilities (sm: md: lg: xl:)
```

---

## 2. Design Tokens

Файл: `css/_base.css`  
Все переменные задаются в `:root`. **Меняй здесь — работает везде.**

### Цвета — семантические

```css
--color-primary:  #14a0ff   /* синий */
--color-accent:   #F9063F   /* красный */
--color-success:  #9ce700
--color-error:    #d43939
--color-warning:  #ffdd00
```

Каждый цвет имеет шейды от 100 (светлый) до 900 (тёмный):

```css
--color-primary-100  /* #e6f4ff */
--color-primary-500  /* #14a0ff — базовый */
--color-primary-900  /* #002050 */
```

### Фон и текст

```css
--bg-main:        #0a0a0a
--bg-secondary:   #151515
--bg-card:        rgba(20,160,255,0.12)
--text-main:      #ffffff
--text-muted:     #8a8f99
```

### Шрифты

```css
--font-sans:  "Roboto", system-ui, sans-serif
--font-mono:  "Consolas", monospace

/* Фиксированные размеры */
--fs-xs:   12px
--fs-sm:   14px
--fs-base: 16px
--fs-lg:   18px
--fs-xl:   20px
--fs-2xl:  24px
--fs-3xl:  30px
--fs-4xl:  36px
--fs-5xl:  48px
--fs-6xl:  60px
--fs-7xl:  72px
--fs-hero: 96px

/* Fluid (адаптивные через clamp) */
--fs-f-base: clamp(14px, 1.4vw, 16px)
--fs-f-hero: clamp(60px, 10vw, 120px)
/* и т.д. */
```

### Отступы (spacing scale)

```css
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

### Скругления

```css
--radius-sm:   6px
--radius-md:   12px
--radius-lg:   20px
--radius-xl:   30px
--radius-2xl:  40px
--radius-full: 9999px
```

### Переходы

```css
--ease-fast: 0.15s ease-in-out
--ease:      0.3s ease-in-out
--ease-slow: 0.5s ease-in-out
```

### Тени

```css
--shadow-sm:      0 1px 3px rgba(0,0,0,0.3)
--shadow-md:      0 4px 6px rgba(0,0,0,0.4)
--shadow-lg:      0 10px 20px rgba(0,0,0,0.5)
--shadow-primary: 0 0 20px var(--color-shadow)   /* синее свечение */
--shadow-accent:  0 0 20px rgba(249,6,63,0.5)    /* красное свечение */
--shadow-glow:    0 0 30px rgba(255,255,255,0.2)
```

### Z-индексы

```css
--z-0: 0  --z-1: 1  --z-10: 10  --z-50: 50  --z-100: 100  --z-modal: 1000
```

---

## 3. Темы

Переключение через атрибут `data-theme` на теге `<html>`:

```js
document.documentElement.setAttribute('data-theme', 'red')
```

| Тема      | `data-theme` |
|-----------|-------------|
| Тёмная (по умолчанию) | `dark` |
| Светлая   | `light`  |
| Красная   | `red`    |
| Синяя     | `blue`   |
| Зелёная   | `green`  |
| Голубая   | `cyan`   |
| Жёлтая    | `yellow` |
| Розовая   | `pink`   |
| Фиолетовая | `purple` |

```html
<!-- Светлая тема -->
<html data-theme="light">

<!-- Красная тема (casino-стиль) -->
<html data-theme="red">
```

---

## 4. Responsive Tokens

Файл: `css/_base.css` (в конце файла)

Все CSS-переменные `:root` автоматически переопределяются на каждом брейкпоинте.  
**Менять ничего не нужно** — все компоненты, утилиты и типографика масштабируются сами.

### Брейкпоинты (desktop-first, max-width)

| Брейкпоинт | Устройства | `--fs-hero` | `--fs-base` | `--space-8` |
|---|---|---|---|---|
| base (> 1200px) | Десктоп | 96px | 16px | 32px |
| `≤ 1200px` | Ноутбук / планшет альбом | 80px | 15px | 28px |
| `≤ 768px` | Планшет / мобильный | 64px | 14px | 24px |
| `≤ 480px` | Мобильный | 48px | 13px | 18px |
| `≤ 390px` | iPhone 14 / стандарт | 44px | 12px | 16px |
| `≤ 360px` | Android / мелкий | 40px | 11px | 14px |
| `≤ 320px` | Очень маленький | 35px | 10px | 12px |

### Что масштабируется

- **Шрифты** — `--fs-xs` … `--fs-hero` и все fluid-варианты `--fs-f-*`
- **Отступы** — `--space-1` … `--space-24`
- **Скругления** — `--radius-md` … `--radius-2xl`
- **Сетка** — `--grid-gutter`, `--container-width`

### Пример

```css
/* Класс .title-hero использует --fs-hero */
/* На 320px он автоматически станет 35px вместо 96px */
/* Никаких дополнительных стилей писать не нужно */
```

---

## 5. Responsive Prefix Utils

Файл: `css/_responsive.css`

Система адаптивных префиксных классов в стиле Tailwind.  
Принцип **mobile-first**: базовые стили — для мобильного, классы с префиксом активируются при **расширении** экрана.

### Брейкпоинты (mobile-first, min-width)

| Префикс | Активен при | Устройства |
|---|---|---|
| *(без префикса)* | всегда | все экраны |
| `sm:` | ≥ 480px | большой мобильный и выше |
| `md:` | ≥ 768px | планшет и выше |
| `lg:` | ≥ 1200px | десктоп |
| `xl:` | ≥ 1400px | широкий десктоп |

### Синтаксис

```html
<div class="базовый-класс брейкпоинт:класс">
```

### Покрытые категории

| Категория | Примеры классов |
|---|---|
| Display | `d-none`, `d-flex`, `d-block`, `d-grid`, `hidden` |
| Flex direction/wrap | `flex-row`, `flex-col`, `flex-wrap`, `flex-nowrap`, `flex-grow` |
| Align / Justify | `items-center`, `items-start`, `justify-between`, `justify-center` |
| Align self | `self-center`, `self-start`, `self-end` |
| Flex combos | `flex-center`, `flex-col-center`, `flex-center-between`, `flex-center-right` |
| Gap | `gap-0` … `gap-24` |
| Padding | `p-*`, `px-*`, `py-*`, `pt-*`, `pb-*`, `pl-*`, `pr-*` |
| Margin | `m-*`, `mx-*`, `my-*`, `mt-*`, `mb-*`, `ml-*`, `mr-*`, `mx-auto`, `ml-auto` |
| Text align | `text-center`, `text-left`, `text-right`, `text-justify` |
| Text transform | `text-uppercase`, `text-lowercase`, `text-capitalize`, `text-nowrap`, `text-wrap` |
| Font size | `text-xs` … `text-6xl` |
| Font weight | `font-thin` … `font-black` |
| Width | `w-full`, `w-auto`, `w-fit`, `w-25`, `w-50`, `w-75`, `w-80`, `w-90`, `w-95` |
| Height | `h-full`, `h-auto`, `h-screen`, `h-dvh`, `h-25`, `h-50`, `h-75` |
| Position | `relative`, `absolute`, `fixed`, `sticky`, `static` |
| Overflow | `overflow-hidden`, `overflow-auto`, `overflow-scroll`, `overflow-x-hidden` |
| Border radius | `rounded-none` … `rounded-full` |
| Opacity | `opacity-0`, `opacity-25`, `opacity-50`, `opacity-75`, `opacity-100` |
| Z-index | `z-0`, `z-1`, `z-10`, `z-50`, `z-100`, `z-modal` |

### Примеры использования

```html
<!-- Колонка на мобиле → строка на планшете → gap-8 на десктопе -->
<div class="flex-col md:flex-row lg:gap-8">...</div>

<!-- Скрыт на мобиле, виден с планшета -->
<div class="d-none md:d-block">Только планшет+</div>

<!-- Виден на мобиле, скрыт на десктопе -->
<div class="d-flex lg:d-none">Только мобильный</div>

<!-- Текст по центру на мобиле, слева на десктопе -->
<p class="text-center lg:text-left">...</p>

<!-- Разные размеры шрифта по брейкпоинтам -->
<h1 class="text-3xl md:text-5xl lg:text-6xl">Заголовок</h1>

<!-- Padding растёт с экраном -->
<section class="py-4 md:py-8 lg:py-16">...</section>

<!-- Ширина адаптируется -->
<div class="w-full md:w-75 lg:w-50 mx-auto">...</div>

<!-- Flex-сетка: 1 → 2 → 3 колонки -->
<div class="d-flex flex-col sm:flex-row flex-wrap gap-4">
  <div class="w-full sm:w-50 lg:w-full" style="flex:1">...</div>
  <div class="w-full sm:w-50 lg:w-full" style="flex:1">...</div>
</div>
```

### Важно — экранирование двоеточия

В CSS двоеточие в имени класса экранируется обратным слешем:

```css
/* В файле _responsive.css записано так: */
.md\:d-flex { display: flex !important; }

/* В HTML используется без слеша: */
<div class="md:d-flex">
```

---

## 6. Сетка

Файл: `css/_grid.css`

### Контейнер

```html
<div class="container">...</div>
```

Максимальная ширина: `120rem`, выравнивание по центру, ширина `96%`.

### 12-колоночная Flex-сетка

```html
<div class="row">
  <div class="col-6">Половина</div>
  <div class="col-6">Половина</div>
</div>

<div class="row">
  <div class="col-4">1/3</div>
  <div class="col-4">1/3</div>
  <div class="col-4">1/3</div>
</div>
```

**Доступные классы:** `.col-1` … `.col-12`

**Адаптивные:**
- `.col-{n}-md` — применяется при `min-width: 900px`
- `.col-{n}-lg` — применяется при `min-width: 1200px`
- На мобиле (< 600px) все колонки становятся 100%

```html
<!-- 2 колонки на десктопе, 1 на мобиле -->
<div class="row">
  <div class="col-12 col-6-md">...</div>
  <div class="col-12 col-6-md">...</div>
</div>
```

### CSS Grid helpers

```html
<div class="grid-col-3"><!-- 3 равных колонки через CSS grid --></div>
<div class="col-d2-m1"><!-- 2 кол. на десктопе, 1 на мобиле --></div>
```

---

## 7. Типографика

Файл: `css/_typography.css`

### Заголовки

| Класс | Размер | Вес |
|-------|--------|-----|
| `.title-hero` | 96px | 900 |
| `.title-xl`   | 72px | 900 |
| `.title-lg`   | 60px | 900 |
| `.title-md`   | 48px | 900 |
| `.title-sm`   | 36px | 800 |
| `.title-xs`   | 30px | 700 |

Добавь `.fluid` для адаптивного размера через `clamp()`:

```html
<h1 class="title-hero fluid">Заголовок</h1>
```

### Текст

| Класс | Размер |
|-------|--------|
| `.text-lead`    | 20px, weight 500 |
| `.text-body`    | 16px, weight 400 |
| `.text-sm`      | 14px |
| `.text-xs`      | 12px |
| `.text-caption` | 12px, uppercase, letter-spacing |
| `.text-label`   | 14px, weight 600 |

### Цвет текста

```html
<p class="text-primary">Синий</p>
<p class="text-accent">Красный</p>
<p class="text-success">Зелёный</p>
<p class="text-error">Ошибка</p>
<p class="text-warning">Предупреждение</p>
<p class="text-muted">Серый</p>
<p class="text-white">Белый</p>
```

### Выравнивание

```html
<p class="text-center">По центру</p>
<p class="text-left">По левому</p>
<p class="text-right">По правому</p>
```

### Вес шрифта

```html
<span class="font-thin">100</span>
<span class="font-light">300</span>
<span class="font-normal">400</span>
<span class="font-medium">500</span>
<span class="font-semi">600</span>
<span class="font-bold">700</span>
<span class="font-extra">800</span>
<span class="font-black">900</span>
```

### Трансформации и декорации

```html
<p class="text-upper">uppercase</p>
<p class="text-lower">lowercase</p>
<p class="text-cap">Capitalize</p>
<p class="text-underline">Подчёркнутый</p>
<p class="text-line-through">Зачёркнутый</p>
<p class="text-nowrap">Не переносить</p>
```

---

## 8. Утилиты

Файл: `css/_utils.css` — Tailwind-style классы.

### Display / Flex

```html
<div class="d-flex">flex</div>
<div class="d-none">скрыто</div>
<div class="flex-col">колонка</div>
<div class="flex-center">по центру (x и y)</div>
<div class="flex-center-between">по центру + space-between</div>
<div class="flex-col-center">колонка по центру</div>
<div class="items-center justify-between">...</div>
```

### Отступы (margin / padding)

Формат: `.mt-{n}`, `.mb-{n}`, `.ml-{n}`, `.mr-{n}`, `.mx-{n}`, `.my-{n}`  
Формат: `.pt-{n}`, `.pb-{n}`, `.pl-{n}`, `.pr-{n}`, `.px-{n}`, `.py-{n}`

Значения n: `0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24`

```html
<div class="mt-8 px-4">...</div>
<div class="mx-auto">Центрирование горизонтально</div>
```

### Ширина / Высота

```html
<div class="w-full">100%</div>
<div class="w-50">50%</div>
<div class="h-screen">100vh</div>
<div class="min-h-dvh">min-height 100dvh</div>
<div class="w-80">max-width 80%, auto margin</div>
```

### Позиционирование

```html
<div class="relative">
  <div class="absolute inset-0">overlay</div>
</div>
<div class="fixed top-0 left-0 w-full z-100">шапка</div>
<div class="translate-center">абсолютный центр (left+top 50% + transform)</div>
```

### Скругления

```html
<div class="rounded-sm">6px</div>
<div class="rounded-md">12px</div>
<div class="rounded-lg">20px</div>
<div class="rounded-full">pill</div>
```

### Фон

```html
<div class="bg-primary">синий фон</div>
<div class="bg-card">фон карточки</div>
<div class="bg-transparent">прозрачный</div>
```

### Тени

```html
<div class="shadow-md">обычная тень</div>
<div class="shadow-primary">синее свечение</div>
<div class="shadow-accent">красное свечение</div>
<div class="shadow-glow">белое свечение</div>
```

### Рамки

```html
<div class="border">серая</div>
<div class="border-primary">синяя</div>
<div class="border-accent">красная</div>
<div class="border-none">без рамки</div>
```

### Прозрачность

```html
<div class="opacity-0">невидимый</div>
<div class="opacity-50">50%</div>
<div class="opacity-100">видимый</div>
```

### Адаптивная видимость

```html
<div class="mobile">виден только на мобиле (≤768px)</div>
<div class="desktop">виден только на десктопе (>768px)</div>
<div class="hide-xs">скрыт на <600px</div>
<div class="hide-lg">скрыт на >1200px</div>
```

### Gap

```html
<div class="d-flex gap-4">gap 16px</div>
<div class="d-flex gap-8">gap 32px</div>
```

### Переходы

```html
<div class="transition">0.3s</div>
<div class="transition-fast">0.15s</div>
<div class="transition-slow">0.5s</div>
```

---

## 9. Кнопки

Файл: `css/_buttons.css`

### Базовая кнопка

```html
<button class="btn">Кнопка</button>
```

### Размеры

```html
<button class="btn btn-xs">xs (28px)</button>
<button class="btn btn-sm">sm (36px)</button>
<button class="btn btn-md">md (48px)</button>   <!-- по умолчанию -->
<button class="btn btn-lg">lg (56px)</button>
<button class="btn btn-xl">xl (64px)</button>
<button class="btn btn-2xl">2xl (72px)</button>
<button class="btn btn-wide">100% ширина</button>
```

### Цветовые варианты

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-error">Error</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-dark">Dark</button>
<button class="btn btn-light">Light</button>
```

### Outline

```html
<button class="btn btn-outline">Outline Primary</button>
<button class="btn btn-outline-accent">Outline Accent</button>
<button class="btn btn-outline-white">Outline White</button>
```

### Ghost

```html
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-ghost-primary">Ghost Primary</button>
```

### Градиентные

```html
<button class="btn btn-gradient">Gradient</button>
<button class="btn btn-gradient-hover">Animated Gradient</button>
<button class="btn btn-gradient-1">Ocean Blue</button>
<button class="btn btn-gradient-2">Pink Peach</button>
<button class="btn btn-gradient-3">Mint</button>
<button class="btn btn-gradient-4">Gold Glow</button>
<button class="btn btn-gradient-5">Purple</button>
```

### Специальные эффекты

```html
<button class="btn btn-glow">Glow (pulse)</button>
<button class="btn btn-glow-primary">Glow Primary</button>
<button class="btn btn-shine">Shine sweep</button>
<button class="btn btn-rainbow">Rainbow animated</button>
<button class="btn btn-animated-bg">Animated BG</button>
<button class="btn btn-glow-hover">Glow on Hover</button>
<button class="btn btn-bounce">Bounce on hover</button>
<button class="btn btn-color-shift pulse">Color Shift</button>
```

### Gradient-border

```html
<div class="btn-wrapper-effect">
  <button class="btn btn-gradient-border">
    Кнопка
    <span class="btn-bg-effect"></span>
  </button>
</div>
```

### Состояние disabled

```html
<button class="btn btn-primary" disabled>Недоступна</button>
<button class="btn btn-primary is-disabled">Недоступна</button>
```

### Bulma-style `.button`

```html
<button class="button">Default</button>
<button class="button is-primary">Primary</button>
<button class="button is-accent is-rounded">Rounded</button>
<button class="button is-success is-large">Large</button>
<button class="button is-outlined">Outlined</button>
<button class="button is-loading">Loading...</button>
<button class="button is-fullwidth">Full Width</button>

<!-- Группа кнопок -->
<div class="buttons">
  <button class="button">A</button>
  <button class="button is-primary">B</button>
</div>
```

---

## 10. Карточки

Файл: `css/_cards.css`

```html
<!-- Базовая -->
<div class="card">Контент</div>

<!-- Стеклянная (glassmorphism) -->
<div class="card-glass">Контент</div>

<!-- Тёмная -->
<div class="card-dark">Контент</div>

<!-- С рамкой -->
<div class="card-bordered">Контент</div>
<div class="card-bordered-primary">С синей рамкой и свечением</div>
<div class="card-bordered-accent">С красной рамкой</div>

<!-- С градиентом -->
<div class="card-gradient">Контент</div>

<!-- С свечением -->
<div class="card-glow">Контент</div>

<!-- Главная карточка (max-width 600px) -->
<div class="card-primary">Контент</div>
```

### Текстовые элементы внутри карточки

```html
<div class="card">
  <div class="card-title">Заголовок</div>
  <div class="card-subtitle">Подзаголовок</div>
  <div class="card-text">Текст</div>
</div>
```

### Bulma-style карточка

```html
<div class="card-bulma">
  <div class="card-header">
    <span class="card-header-title">Заголовок</span>
    <button class="card-header-icon">⚙</button>
  </div>
  <div class="card-content">Основной контент</div>
  <div class="card-footer">
    <a class="card-footer-item">Ссылка</a>
    <a class="card-footer-item">Ещё</a>
  </div>
</div>
```

### Сетки карточек

```html
<div class="card-grid">
  <div class="card">1</div>
  <div class="card">2</div>
  <div class="card">3</div>
</div>

<div class="card-list">
  <div class="card">Элемент списка</div>
  <div class="card">Элемент списка</div>
</div>
```

### Box

```html
<div class="box">Простой блок</div>
<div class="box-glass">Стеклянный блок</div>
```

---

## 11. Формы

Файл: `css/_form.css`

### Нативные инпуты (авто-стилизация)

Все `input`, `select`, `textarea` стилизованы автоматически — ничего добавлять не надо.

```html
<input type="text" placeholder="Имя" />
<input type="email" placeholder="Email" />
<select><option>Вариант</option></select>
<textarea placeholder="Сообщение"></textarea>
```

### Form group

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" placeholder="user@mail.com" />
  <span class="form-hint">Используем для связи</span>
</div>

<!-- Состояние error -->
<div class="form-group error">
  <label class="form-label">Email</label>
  <input type="email" />
  <span class="form-error-msg">Неверный формат</span>
</div>

<!-- Состояние success -->
<div class="form-group success">
  <input type="text" />
  <span class="form-success-msg">Отлично!</span>
</div>
```

### Floating Label (лейбл поднимается при вводе)

```html
<div class="input-group">
  <input class="input" type="text" placeholder=" " />
  <label class="user-label">Ваше имя</label>
</div>
```

### Инпут с состоянием error / success

```html
<input class="error" type="text" />
<input class="success" type="text" />
```

### Radio group (кастомный)

```html
<div class="radio-input">
  <label class="label">
    <input type="radio" name="choice" value="1" />
    Вариант 1
  </label>
  <label class="label">
    <input type="radio" name="choice" value="2" />
    Вариант 2
  </label>
  <label class="label">
    <input type="radio" name="choice" value="3" />
    Вариант 3
  </label>
</div>
```

### Lead-gen форма (`.form.tg-list`)

```html
<form class="form tg-list">
  <div class="form-group">
    <label>Ваше имя</label>
    <input type="text" placeholder="Введите имя" />
  </div>
  <div class="form-group">
    <label>Email</label>
    <input type="email" placeholder="email@mail.com" />
  </div>
  <div class="button-wrapp">
    <button type="submit" class="btn btn-gradient-hover">Отправить</button>
  </div>
</form>
```

### Анимация shake (ошибка)

```js
formElement.classList.add('shake-popup')
setTimeout(() => formElement.classList.remove('shake-popup'), 500)
```

---

## 12. Градиенты

Файл: `css/_gradients.css`

### Фоновые градиенты — семантические

```html
<div class="gradient-primary">синий</div>
<div class="gradient-accent">красный</div>
<div class="gradient-success">зелёный</div>
<div class="gradient-error">ошибка</div>
<div class="gradient-warning">жёлтый</div>
```

### Фоновые градиенты — пресеты

```html
<div class="gradient-ocean">голубой</div>
<div class="gradient-sky">сине-фиолетовый</div>
<div class="gradient-sunset">закат</div>
<div class="gradient-fire">огонь</div>
<div class="gradient-nature">природа</div>
<div class="gradient-gold">золото</div>
<div class="gradient-honey">мёд</div>
<div class="gradient-cosmic">космос</div>
<div class="gradient-galaxy">галактика</div>
<div class="gradient-rainbow">радуга</div>
<div class="gradient-gold-metal">золотой металл</div>
<div class="gradient-silver">серебро</div>
```

### Тёмные градиенты

```html
<div class="gradient-dark-midnight">тёмно-серый</div>
<div class="gradient-dark-void">тёмно-синий</div>
<div class="gradient-dark-shadow">чёрный</div>
```

### Текстовые градиенты

```html
<h2 class="gradient-primary text-gradient-primary">Синий текст</h2>
<h2 class="text-gradient-gold">Золотой текст</h2>
<h2 class="text-gradient-rainbow">Радужный текст</h2>
<h2 class="text-gradient-metallic">Металлический</h2>
<h2 class="text-gradient-cosmic">Космический</h2>
```

### Градиентные рамки

```html
<div class="border-gradient-primary rounded-md p-4">Синяя рамка</div>
<div class="border-gradient-accent rounded-md p-4">Красная рамка</div>
<div class="border-gradient-rainbow rounded-md p-4">Радужная рамка</div>
<div class="border-gradient-gold rounded-md p-4">Золотая рамка</div>
```

### Анимированные градиенты

```html
<div class="gradient-animated">плавно анимированный фон</div>
<div class="gradient-animated-subtle">тонкий анимированный</div>
```

### Оверлеи

```html
<div class="gradient-overlay-dark">
  <img src="...">
  <!-- снизу появится тёмный градиент -->
</div>
<div class="gradient-overlay-primary">...</div>
```

### Hover-эффект sweep

```html
<div class="hover-gradient-animate p-4">
  Светлая волна при наведении
</div>
```

### Утилиты направления (через CSS-переменные)

```html
<div class="gradient-horizontal" style="--gradient-from: #ff0; --gradient-to: #f0f">→</div>
<div class="gradient-vertical">↓</div>
<div class="gradient-diagonal">↘</div>
<div class="gradient-radial">⊙</div>
```

---

## 13. Анимации

Файл: `css/_animations.css`

Просто добавь класс к любому элементу.

### Fade

```html
<div class="animate-fade-in">появление</div>
<div class="animate-fade-out">исчезновение</div>
<div class="animate-fade-in-up">снизу вверх</div>
<div class="animate-fade-in-down">сверху вниз</div>
<div class="animate-fade-in-left">слева</div>
<div class="animate-fade-in-right">справа</div>
```

### Scale / Bounce

```html
<div class="animate-scale-in">появление масштабом</div>
<div class="animate-scale">пульсация (1x)</div>
<div class="animate-scale-big">пульсация (big)</div>
<div class="animate-bounce">прыжок</div>
<div class="animate-bounce-in">прыжок при появлении</div>
```

### Float

```html
<div class="animate-float">парение (±10px)</div>
<div class="animate-float-big">парение (±20px)</div>
```

### Rotate / Spin

```html
<div class="animate-spin">кружится</div>
<div class="animate-spin-slow">кружится медленно</div>
<div class="animate-rotate">rotate 90°</div>
```

### Shake / Wiggle

```html
<div class="animate-shake">тряска</div>
<div class="animate-wiggle">покачивание</div>
```

### Pulse / Glow / Heartbeat

```html
<div class="animate-pulse">пульсация</div>
<div class="animate-heartbeat">биение сердца</div>
<div class="animate-glow">синее свечение</div>
<div class="animate-glow-accent">красное свечение</div>
<div class="animate-border-pulse">пульсирующая рамка</div>
```

### Текстовые эффекты

```html
<span class="animate-rainbow">радужная тень</span>
<span class="animate-neon">неон жёлтый</span>
<span class="animate-neon-blue">неон синий</span>
<span class="animate-breathe">дыхание</span>
<!-- Эффект сканирования (нужен data-text) -->
<span class="animate-scan" data-text="ТЕКСТ">ТЕКСТ</span>
```

### Shadow / Shimmer

```html
<div class="shadow-neon">белое свечение тени</div>
<div class="shadow-neon-primary">синее свечение тени</div>
<div class="animate-shimmer">skeleton-loading эффект</div>
```

### Misc

```html
<div class="animate-flip">3D flip</div>
<div class="animate-rubber">rubber band</div>
<div class="animate-tada">tada</div>
```

### Управление скоростью и задержкой

```html
<div class="animate-bounce anim-fast">быстро (0.3s)</div>
<div class="animate-bounce anim-slow">медленно (2s)</div>
<div class="animate-bounce anim-slower">очень медленно (4s)</div>

<div class="animate-fade-in anim-delay-3">задержка 0.3s</div>
<div class="animate-fade-in anim-delay-1s">задержка 1s</div>
<div class="animate-bounce anim-paused">на паузе</div>
<div class="animate-bounce anim-none">без анимации</div>
```

---

## 14. Навигация

Файл: `css/_nav.css`

### Базовая структура

```html
<nav class="nav">
  <div class="nav-left">
    <a class="nav-brand" href="#">
      <img src="logo.svg" alt="Logo" />
      Brand
    </a>
  </div>
  <div class="nav-center">
    <a href="#" class="nav-link is-active">Главная</a>
    <a href="#" class="nav-link">О нас</a>
    <span class="nav-sep"></span>
    <a href="#" class="nav-link">Контакты</a>
  </div>
  <div class="nav-right">
    <button class="btn btn-primary btn-sm">Войти</button>
  </div>
</nav>
```

### Варианты навбара

```html
<nav class="nav nav-glass">стеклянный (backdrop-filter)</nav>
<nav class="nav nav-solid">непрозрачный с рамкой</nav>
<nav class="nav nav-primary">синий тинт</nav>
<nav class="nav nav-dark">всегда тёмный</nav>
<nav class="nav nav-floating">плавающий (pill, скруглённый)</nav>
```

### Размеры

```html
<nav class="nav nav-sm">маленький (48px)</nav>
<nav class="nav nav-lg">большой (72px)</nav>
```

### Стиль ссылок — underline

```html
<nav class="nav nav-underline">
  <a href="#" class="nav-link is-active">Активный</a>
  <a href="#" class="nav-link">Обычный</a>
</nav>
```

### Активная ссылка

```html
<a href="#" class="nav-link is-active">Активный (класс)</a>
<a href="/home" class="nav-link" aria-current="page">Активный (aria)</a>
```

---

## 15. Табы

Файл: `css/_tab.css`

### Базовая структура

```html
<div class="tab-wrap">
  <div class="tab-nav">
    <button class="tab-btn is-active" onclick="tabSwitch(this)">Вкладка 1</button>
    <button class="tab-btn" onclick="tabSwitch(this)">Вкладка 2</button>
    <button class="tab-btn" onclick="tabSwitch(this)">
      Вкладка 3
      <span class="tab-badge">3</span>
    </button>
  </div>
  <div class="tab-content">
    <div class="tab-panel is-active">Контент 1</div>
    <div class="tab-panel">Контент 2</div>
    <div class="tab-panel">Контент 3</div>
  </div>
</div>
```

Минимальный JS для переключения:

```js
function tabSwitch(btn) {
  const nav = btn.closest('.tab-nav');
  const wrap = btn.closest('.tab-wrap');
  nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('is-active'));
  btn.classList.add('is-active');
  const idx = [...nav.querySelectorAll('.tab-btn')].indexOf(btn);
  wrap.querySelectorAll('.tab-panel').forEach((p, i) => {
    p.classList.toggle('is-active', i === idx);
  });
}
```

### Варианты навбара

```html
<div class="tab-nav tab-nav-pills"><!-- скруглённые таблетки --></div>
<div class="tab-nav tab-nav-boxed"><!-- рамка вокруг активного --></div>
<div class="tab-nav tab-nav-card"><!-- VS Code стиль, цветная верхняя линия --></div>
```

### Размеры

```html
<div class="tab-nav tab-nav-sm">маленький</div>
<div class="tab-nav tab-nav-lg">большой</div>
```

### Растянуть на всю ширину

```html
<div class="tab-nav is-full">...</div>
```

### Контент с рамкой

```html
<div class="tab-content tab-content-bordered">...</div>
```

---

## 16. Уведомления

Файл: `css/_notifications.css`

### Notification (блочное)

```html
<div class="notification">Обычное</div>
<div class="notification is-primary">Информация</div>
<div class="notification is-success">Успех</div>
<div class="notification is-warning">Предупреждение</div>
<div class="notification is-danger">Ошибка</div>
<div class="notification is-info">Info</div>

<!-- С кнопкой закрытия -->
<div class="notification is-primary">
  Текст уведомления
  <button class="delete"></button>
</div>
```

### Toast (всплывающее, анимировано)

```html
<div class="toast toast-primary">Primary</div>
<div class="toast toast-success">Успех!</div>
<div class="toast toast-error">Ошибка!</div>
<div class="toast toast-warning">Внимание!</div>
<div class="toast toast-dark">Тёмное</div>
```

### Message (заголовок + тело)

```html
<div class="message is-primary">
  <div class="message-header">
    <span>Заголовок</span>
    <button class="delete"></button>
  </div>
  <div class="message-body">Тело сообщения</div>
</div>
```

### Progress bar

```html
<!-- Нативный <progress> -->
<progress class="progress" value="70" max="100"></progress>
<progress class="progress is-accent is-medium" value="50" max="100"></progress>

<!-- Кастомный (для анимации и цвета) -->
<div class="progress-bar">
  <div class="progress-bar-fill" style="width: 65%"></div>
</div>
<div class="progress-bar">
  <div class="progress-bar-fill is-gradient is-animated" style="width: 80%"></div>
</div>
```

### Loader / Spinner

```html
<span class="loader"></span>
<span class="loader loader-sm loader-accent"></span>
<span class="loader loader-lg loader-success"></span>
<span class="loader loader-xl loader-white"></span>

<!-- Оверлей поверх страницы -->
<div class="loader-overlay">
  <span class="loader loader-xl"></span>
</div>
```

### Delete button (×)

```html
<button class="delete"></button>
<button class="delete is-small"></button>
<button class="delete is-medium"></button>
<button class="delete is-large"></button>
```

---

## Быстрая шпаргалка — частые паттерны

```html
<!-- Центрирование по всему экрану -->
<div class="flex-center h-screen">
  <div class="card-primary">Контент</div>
</div>

<!-- Hero секция -->
<section class="flex-col-center text-center py-24 px-4">
  <h1 class="title-hero fluid animate-fade-in-down">Заголовок</h1>
  <p class="text-lead text-muted mt-4 animate-fade-in-up">Подзаголовок</p>
  <button class="btn btn-gradient-hover mt-8">Кнопка</button>
</section>

<!-- Карточки в сетке -->
<div class="card-grid gap-5 w-90">
  <div class="card-glass animate-fade-in">Карточка 1</div>
  <div class="card-glass animate-fade-in anim-delay-2">Карточка 2</div>
  <div class="card-glass animate-fade-in anim-delay-3">Карточка 3</div>
</div>

<!-- Форма регистрации -->
<div class="card-primary">
  <form class="form tg-list">
    <div class="form-group">
      <label class="form-label">Имя</label>
      <input type="text" placeholder="Ваше имя" />
    </div>
    <button class="btn btn-gradient-hover w-full mt-4">Зарегистрироваться</button>
  </form>
</div>

<!-- Текст с градиентом + анимация -->
<h2 class="title-lg fluid text-gradient-gold animate-neon">CASINO</h2>
```

---

## Быстрая шпаргалка — responsive

```html
<!-- Колонка на мобиле → строка на планшете -->
<div class="flex-col md:flex-row gap-4 md:gap-8">
  <div class="w-full md:w-50">Половина</div>
  <div class="w-full md:w-50">Половина</div>
</div>

<!-- Скрыт на мобиле, виден на десктопе -->
<aside class="d-none lg:d-block">Сайдбар</aside>

<!-- Виден только на мобиле -->
<nav class="d-flex lg:d-none">Мобильный navbar</nav>

<!-- Размер заголовка растёт с экраном -->
<h1 class="text-3xl md:text-5xl lg:text-6xl font-black text-center">
  Заголовок
</h1>

<!-- Padding увеличивается на широких экранах -->
<section class="py-6 px-4 md:py-12 md:px-8 lg:py-20 lg:px-16">
  Секция
</section>

<!-- Центрирование только на десктопе -->
<div class="text-left md:text-center lg:text-left">Текст</div>

<!-- Flex → Grid на десктопе (через display) -->
<div class="d-flex flex-col sm:flex-row flex-wrap gap-4 lg:gap-8">
  <div class="w-full sm:w-50 lg:w-full" style="flex:1 1 200px">Элемент</div>
  <div class="w-full sm:w-50 lg:w-full" style="flex:1 1 200px">Элемент</div>
  <div class="w-full sm:w-50 lg:w-full" style="flex:1 1 200px">Элемент</div>
</div>

<!-- Кнопка: маленькая на мобиле → большая на десктопе -->
<button class="btn btn-primary text-sm md:text-base lg:text-lg py-2 md:py-4">
  Нажми
</button>
```

---

## Изменение темы

```js
// Переключить тему программно
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Восстановить тему
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);
```
