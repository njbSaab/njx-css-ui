# Рефакторинг index.html — 3 подхода

## TODO — Прогресс рефакторинга

### Структура проекта
- [x] Создать папку `pages/`
- [x] Создать папку `components/`
- [x] Перенести `showcase.html` → `pages/showcase.html`
- [x] Перенести `doc.html` → `pages/doc.html`
- [x] Перенести `check.html` → `pages/check.html`
- [x] Перенести `quickstart.html` → `pages/quickstart.html`
- [x] Создать `js/loader.js` — загрузчик HTML-партиалов

### Компоненты (components/)
- [x] `components/sidebar.html` — вынесен из index.html
- [x] `components/topbar.html` — шапка с логотипом и переключателем тем

### Секции (sections/)
- [x] `sections/tokens.html` (249 строк)
- [x] `sections/grid.html` (90 строк)
- [x] `sections/typography.html` (77 строк)
- [x] `sections/utils.html` (20 строк)
- [x] `sections/buttons.html` (200 строк)
- [x] `sections/cards.html` (110 строк)
- [x] `sections/tags.html` (119 строк)
- [x] `sections/animations.html` (177 строк)
- [x] `sections/forms.html` (718 строк)
- [x] `sections/sections.html` (220 строк)
- [x] `sections/tabs.html` (288 строк)
- [x] `sections/collapse.html` (279 строк)
- [x] `sections/popups.html` (88 строк)
- [x] `sections/nav.html` (269 строк)
- [x] `sections/notifications.html` (146 строк)
- [x] `sections/progress.html` (63 строк)
- [x] `sections/table.html` (72 строк)
- [x] `sections/breadcrumb.html` (46 строк)
- [x] `sections/pagination.html` (36 строк)
- [x] `sections/panel.html` (41 строк)
- [x] `sections/links.html` (257 строк)
- [x] `sections/dropdown.html` (305 строк)
- [x] `sections/carousel.html` (408 строк)
- [x] `sections/gradients.html` (295 строк)
- [x] `sections/hovers.html` (378 строк)

### Разделение библиотека / сайт
- [x] Создать `styles/` — CSS только для сайта документации
- [x] Создать `scripts/` — JS только для сайта документации
- [x] Вынести `<style>` блок (1222 строки) → `styles/lib-docs.css`
- [x] Вынести inline JS (277 + 50 строк) → `scripts/lib-docs.js`
- [x] Перенести `js/loader.js` → `scripts/loader.js`
- [x] `index.html` сокращён: 7068 → 547 строк

### Итоговая структура
```
БИБЛИОТЕКА          САЙТ
css/  (27 файлов)   styles/     lib-docs.css
js/   njx.js        scripts/    lib-docs.js, loader.js
                    components/ topbar.html, sidebar.html
                    sections/   25 HTML файлов
                    pages/      showcase, doc, check, quickstart
```

### Осталось
- [x] Обновить ссылки в `index.html`, `index.html` → `pages/`
- [x] Обновить ссылки в `components/sidebar.html` → `pages/`
- [x] Обновить ссылки внутри `pages/*.html` (между собой + на главную)
- [ ] Проверить что `index.html` открывается через Live Server и всё загружается
- [ ] Удалить оригинальные файлы из корня (`showcase.html`, `doc.html`, `check.html`, `quickstart.html`) после проверки

---

> Проблема: `index.html` — 7000+ строк в одном файле. Тяжело найти нужную секцию, тяжело добавлять компоненты, тяжело поддерживать.
> Цель: разбить на управляемые части без build step — файл открывается как обычный HTML.

---

## Сравнение подходов

| | Вариант 1: HTML Partials | Вариант 2: Alpine.js | Вариант 3: Vue 3 CDN |
|---|---|---|---|
| HTML как HTML | ✅ | ✅ | ❌ (строки в JS) |
| Нужен сервер | ✅ (Live Server) | ✅ (Live Server) | ✅ (Live Server) |
| Размер зависимости | 0 KB | ~15 KB | ~100 KB |
| Подсветка синтаксиса | ✅ | ✅ | ❌ |
| Решает разбивку файлов | ✅ | ❌ сам по себе | частично |
| Реактивность / интерактивность | ❌ | ✅ | ✅ |
| Порог входа | минимум | низкий | средний |

**Рекомендация:** Вариант 1 для структуры + при желании Alpine.js для интерактивности.

---

## Вариант 1 — HTML Partials + fetch() (без фреймворка)

### Идея

`index.html` становится пустой оболочкой (~80 строк). Каждая секция — отдельный `.html` файл в папке `sections/`. Маленький JS-загрузчик читает их через `fetch()` и вставляет в страницу.

### Структура файлов

```
njx-css-lib/
├── index.html          ← оболочка: topbar, sidebar, main с плейсхолдерами
├── sections/
│   ├── tokens.html        ← секция Design Tokens
│   ├── grid.html          ← секция Grid
│   ├── typography.html    ← секция Typography
│   ├── utils.html         ← секция Utils
│   ├── buttons.html       ← секция Buttons
│   ├── cards.html         ← секция Cards
│   ├── tags.html          ← секция Tags
│   ├── animations.html    ← секция Animations
│   ├── forms.html         ← секция Forms
│   ├── nav.html           ← секция Navigation
│   ├── tabs.html          ← секция Tabs
│   ├── collapse.html      ← секция Accordion
│   ├── dropdown.html      ← секция Dropdown
│   ├── slider.html        ← секция Slider
│   ├── popups.html        ← секция Modals
│   ├── hovers.html        ← секция Hover FX
│   ├── notifications.html ← секция Notifications
│   ├── table.html         ← секция Table
│   └── gradients.html     ← секция Gradients
└── js/
    ├── njx.js             ← компонентные хелперы (без изменений)
    └── loader.js          ← новый: загрузчик партиалов
```

### index.html — оболочка

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>njX UI — Component Library</title>
  <link rel="stylesheet" href="css/style.css" />
  <!-- page-specific styles остаются здесь -->
</head>
<body>

  <!-- Topbar -->
  <header class="lib-topbar">...</header>

  <div class="lib-layout">

    <!-- Sidebar -->
    <aside class="lib-sidebar">...</aside>

    <!-- Main — плейсхолдеры для каждой секции -->
    <main class="lib-main">
      <div data-section="tokens"></div>
      <div data-section="grid"></div>
      <div data-section="typography"></div>
      <div data-section="utils"></div>
      <div data-section="buttons"></div>
      <div data-section="cards"></div>
      <div data-section="tags"></div>
      <div data-section="animations"></div>
      <div data-section="forms"></div>
      <div data-section="nav"></div>
      <div data-section="tabs"></div>
      <div data-section="collapse"></div>
      <div data-section="dropdown"></div>
      <div data-section="slider"></div>
      <div data-section="popups"></div>
      <div data-section="hovers"></div>
      <div data-section="notifications"></div>
      <div data-section="table"></div>
      <div data-section="gradients"></div>
    </main>

  </div>

  <script src="js/loader.js"></script>
  <script src="js/njx.js"></script>
</body>
</html>
```

### js/loader.js — загрузчик (20 строк)

```js
// Находит все [data-section] и загружает sections/<name>.html
(async function () {
  const placeholders = document.querySelectorAll('[data-section]');

  const loads = Array.from(placeholders).map(async (el) => {
    const name = el.getAttribute('data-section');
    try {
      const res = await fetch(`sections/${name}.html`);
      if (!res.ok) throw new Error(`${name}: ${res.status}`);
      el.innerHTML = await res.text();
    } catch (e) {
      el.innerHTML = `<p style="color:red">Failed to load section: ${name}</p>`;
      console.error(e);
    }
  });

  await Promise.all(loads);       // загружаем параллельно
  document.dispatchEvent(new Event('sections-loaded'));  // сигнал для njx.js
})();
```

### sections/buttons.html — пример секции

```html
<section class="lib-section" id="buttons">
  <div class="lib-section-title">Buttons</div>
  <div class="lib-section-desc">
    All variants from <code>_buttons.css</code>. Base class: <code>.btn</code> + variant.
  </div>

  <div class="lib-component">
    <div class="lib-preview">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-accent">Accent</button>
      <button class="btn btn-outline">Outline</button>
      <button class="btn btn-ghost">Ghost</button>
    </div>
    <pre class="lib-code"><code>
&lt;button class="btn btn-primary"&gt;Primary&lt;/button&gt;
&lt;button class="btn btn-accent"&gt;Accent&lt;/button&gt;
    </code></pre>
  </div>
</section>
```

### Как запустить

Нужен локальный сервер (fetch не работает с `file://`):

```bash
# VS Code — расширение Live Server (кнопка Go Live внизу)

# или через npm
npx serve .

# или через Python
python3 -m http.server 3000
```

### Как добавить новый компонент

1. Создать `sections/mycomponent.html` с HTML секции
2. Добавить одну строку в `index.html`:
   ```html
   <div data-section="mycomponent"></div>
   ```
3. Добавить пункт в сайдбар. Готово.

---

## Вариант 2 — Alpine.js CDN

### Идея

Alpine.js — микрофреймворк (~15 KB) для добавления реактивности в обычный HTML. Он не решает разбивку на файлы, но делает интерактивность (`x-show`, `x-on`, `x-data`) чище и убирает необходимость в части `njx.js`.

### Подключение (CDN, без установки)

```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"></script>
```

### Примеры — замена njx.js на Alpine

**Переключатель темы (было в njx.js):**

```html
<!-- было: onclick="setTheme('dark')" в njx.js -->

<!-- стало: Alpine -->
<div x-data="{ theme: 'dark' }" x-init="document.documentElement.setAttribute('data-theme', theme)">
  <select x-model="theme" @change="document.documentElement.setAttribute('data-theme', theme)">
    <option value="dark">Dark</option>
    <option value="light">Light</option>
    <option value="red">Red</option>
    <option value="blue">Blue</option>
  </select>
</div>
```

**Аккордеон (было: accordionToggle() в njx.js):**

```html
<!-- было -->
<div class="collapse-header" onclick="accordionToggle(this)">...</div>

<!-- стало: Alpine -->
<div x-data="{ open: false }">
  <div class="collapse-header" @click="open = !open">
    <span>Question</span>
    <span class="collapse-icon" :class="{ 'is-open': open }">▾</span>
  </div>
  <div class="collapse-body" x-show="open" x-transition>
    Answer content here.
  </div>
</div>
```

**Табы:**

```html
<div x-data="{ active: 'tab1' }">
  <div class="tab-nav">
    <button class="tab-btn" :class="{ 'is-active': active === 'tab1' }" @click="active = 'tab1'">Tab 1</button>
    <button class="tab-btn" :class="{ 'is-active': active === 'tab2' }" @click="active = 'tab2'">Tab 2</button>
  </div>
  <div class="tab-content">
    <div class="tab-panel" x-show="active === 'tab1'">Content 1</div>
    <div class="tab-panel" x-show="active === 'tab2'">Content 2</div>
  </div>
</div>
```

**Уведомление (Toast):**

```html
<div x-data="{ show: false, msg: '', type: 'success' }"
     @toast.window="show = true; msg = $event.detail.msg; type = $event.detail.type; setTimeout(() => show = false, 3000)">
  <div class="lib-toast" x-show="show" x-transition :class="`lib-toast-${type}`" x-text="msg"></div>
</div>

<!-- вызов из любого места страницы -->
<button @click="$dispatch('toast', { msg: 'Saved!', type: 'success' })">Save</button>
```

### Лучший сценарий для Alpine

Используй **Вариант 1 (HTML партиалы)** для структуры + Alpine для интерактивности внутри каждого партиала. Это даёт и чистую файловую структуру, и реактивный HTML без лишнего JS.

---

## Вариант 3 — Vue 3 CDN

### Идея

Vue 3 через CDN — полноценный компонентный фреймворк без сборки. Компоненты определяются как JS-объекты с шаблонами в виде строк или через `<template>` теги.

### Подключение

```html
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
```

### Пример — компонент кнопок

```html
<div id="app">
  <buttons-section></buttons-section>
  <cards-section></cards-section>
</div>

<script>
const { createApp } = Vue;

// Компонент секции кнопок
const ButtonsSection = {
  template: `
    <section class="lib-section" id="buttons">
      <div class="lib-section-title">Buttons</div>
      <div class="lib-preview">
        <button v-for="v in variants" :key="v" :class="['btn', 'btn-' + v]">{{ v }}</button>
      </div>
    </section>
  `,
  data() {
    return {
      variants: ['primary', 'accent', 'outline', 'ghost', 'gradient']
    }
  }
};

createApp({
  components: {
    'buttons-section': ButtonsSection,
    // добавляй компоненты здесь
  }
}).mount('#app');
</script>
```

### Компоненты в отдельных JS-файлах

Чтобы не держать всё в одном файле — выноси компоненты:

```
js/
  components/
    buttons.js
    cards.js
    forms.js
    ...
  app.js
```

```js
// js/components/buttons.js
window.ButtonsSection = {
  template: `
    <section class="lib-section" id="buttons">
      ...
    </section>
  `
};
```

```html
<!-- index.html -->
<script src="js/components/buttons.js"></script>
<script src="js/components/cards.js"></script>
<script src="js/app.js"></script>
```

```js
// js/app.js
const { createApp } = Vue;
createApp({
  components: {
    'buttons-section': window.ButtonsSection,
    'cards-section': window.CardsSection,
  }
}).mount('#app');
```

### Минусы Vue 3 CDN для этого проекта

- Шаблоны — строки в JS. Нет подсветки HTML, IDE не подскажет классы.
- Для сложной вёрстки (секция с 200+ строками HTML) строки неудобны.
- Vue раскрывает весь потенциал только со сборкой (`.vue` файлы).
- Для документационной страницы это избыточно.

### Когда выбирать Vue 3 CDN

Если в будущем планируется интерактивный playground (менять пропсы компонентов в реальном времени, фильтрация, поиск по компонентам) — Vue даст для этого хорошую базу.

---

## Итог и рекомендация

Для этого проекта оптимальна **комбинация**:

```
Вариант 1 (HTML Partials)   ← решает проблему 7000 строк в одном файле
      +
Вариант 2 (Alpine.js)       ← чистая интерактивность внутри партиалов
```

Это даёт:
- Каждая секция — свой HTML файл (~100-400 строк)
- Добавить компонент = создать один файл + одну строку в `index.html`
- Интерактивность без разрастания `njx.js`
- Ноль зависимостей для CSS, минимум для JS (~15 KB Alpine)

**Следующий шаг:** разбить `index.html` на партиалы по Варианту 1.
