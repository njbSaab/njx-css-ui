# njX UI — Build System

> Документация по сборке `style.min.css` с помощью **lightningcss**.

---

## Содержание

1. [Обзор](#1-обзор)
2. [Установка](#2-установка)
3. [Команды](#3-команды)
4. [Как это работает](#4-как-это-работает)
5. [Добавление нового компонента](#5-добавление-нового-компонента)
6. [Обновление версии](#6-обновление-версии)
7. [Структура CSS-файлов](#7-структура-css-файлов)
8. [Результаты сборки](#8-результаты-сборки)
9. [Подключение в HTML](#9-подключение-в-html)
10. [Устранение проблем](#10-устранение-проблем)

---

## 1. Обзор

Библиотека состоит из **25 модульных CSS-файлов**. Для продакшена все они собираются в один минифицированный файл `css/style.min.css`.

Инструмент сборки — **lightningcss** (Rust-based минификатор):
- ⚡ Быстрый (обрабатывает весь проект за ~200ms)
- 🧩 Поддерживает **CSS Nesting** (современный синтаксис вложенных правил)
- 🎯 Понимает CSS Custom Properties, `@media`, `@keyframes`, `color-mix()`
- 📦 Умеет `--bundle` — читает `@import` и собирает всё в один файл

### Сравнение размеров

| Файл | Размер | Gzip |
|------|--------|------|
| Исходники (25 файлов) | 293 KB | 45 KB |
| `style.css` (через @import) | 1 KB | — |
| **`style.min.css`** | **~215 KB** | **~32 KB** |

---

## 2. Установка

**Первый раз** — выполни один раз после клонирования репозитория:

```bash
npm install
```

Это установит `lightningcss-cli` из `devDependencies` в `package.json`.

> `node_modules/` добавлен в `.gitignore` — в репозиторий не попадает.  
> При клонировании на новой машине всегда запускай `npm install`.

**Требования:**
- Node.js ≥ 16
- npm ≥ 7

Проверить версии:
```bash
node --version
npm --version
```

---

## 3. Команды

### `npm run build` — основная команда

```bash
npm run build
```

Выполняет полную пересборку:
1. Минифицирует все CSS-модули в `style.min.css`
2. Добавляет лицензионный заголовок с номером версии

**Используй после:**
- добавления нового CSS-компонента
- изменения существующих стилей
- обновления версии в `package.json`

---

### `npm run minify` — только минификация

```bash
npm run minify
```

Запускает только lightningcss без добавления заголовка.  
Полезно при отладке.

---

## 4. Как это работает

### Схема сборки

```
css/style.css  ←── точка входа (только @import)
     │
     ├── @import "_base.css"
     ├── @import "_reset.css"
     ├── @import "_grid.css"
     ├── @import "_typography.css"
     ├── @import "_utils.css"
     ├── @import "_gradients.css"
     ├── @import "_animations.css"
     ├── @import "_buttons.css"
     ├── @import "_cards.css"
     ├── @import "_form.css"
     ├── @import "_tags.css"
     ├── @import "_nav.css"
     ├── @import "_tab.css"
     ├── @import "_collapse.css"
     ├── @import "_dropdown.css"
     ├── @import "_slider.css"
     ├── @import "_popups.css"
     ├── @import "_hovers.css"
     ├── @import "_notifications.css"
     ├── @import "_table.css"
     ├── @import "_breadcrumb.css"
     ├── @import "_links.css"
     ├── @import "_sections.css"
     ├── @import "_global.css"
     └── @import "_responsive.css"
          │
          ▼
   lightningcss --minify --bundle
          │
          ▼
   css/style.min.css  ←── один файл, без комментариев, сжатый
```

### Что делает lightningcss

| Операция | Пример |
|----------|--------|
| Удаляет комментарии | `/* кнопки */` → удалено |
| Убирает лишние пробелы | `color:  red;` → `color:red` |
| Схлопывает пустые строки | 3 переноса → нет |
| Убирает лишние `;` | `};` → `}` |
| Объединяет правила | дублирующиеся селекторы → один |
| Сохраняет CSS Nesting | `.parent { .child {} }` → без изменений |

### Что делает заголовочный скрипт

После минификации в начало файла вставляется строка:

```css
/* njX UI v1.0.0 | MIT License | github.com/njbSaab/njx-ui-libe */
```

Версия берётся автоматически из поля `"version"` в `package.json`.

---

## 5. Добавление нового компонента

Пошаговый процесс на примере компонента **Tooltip**:

### Шаг 1 — Создай CSS-файл

```
css/_tooltips.css
```

Придерживайся соглашения об именовании: `_название.css` (нижнее подчёркивание в начале).

```css
/* ============================================================
   _tooltips.css — Тултипы
   ============================================================ */

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip-content {
  /* стили тултипа */
}
```

### Шаг 2 — Зарегистрируй в `css/style.css`

Открой `css/style.css` и добавь `@import` в нужном месте:

```css
/* 3. Компоненты */
@import "_buttons.css";
@import "_cards.css";
@import "_form.css";
@import "_tags.css";
@import "_nav.css";
@import "_tab.css";
@import "_collapse.css";
@import "_dropdown.css";
@import "_slider.css";
@import "_popups.css";
@import "_hovers.css";
@import "_notifications.css";
@import "_table.css";
@import "_breadcrumb.css";
@import "_links.css";
@import "_tooltips.css";   /* ← добавить здесь */
```

### Шаг 3 — Пересобери min-файл

```bash
npm run build
```

Готово. `css/style.min.css` содержит новый компонент.

---

## 6. Обновление версии

При выпуске новой версии библиотеки:

### Шаг 1 — Обнови версию в `package.json`

```json
{
  "version": "1.1.0"
}
```

Используй семантическое версионирование:
- `PATCH` (1.0.**1**) — исправление бага в компоненте
- `MINOR` (1.**1**.0) — новый компонент или фича, обратная совместимость сохранена
- `MAJOR` (**2**.0.0) — breaking change (переименование классов и т.д.)

### Шаг 2 — Пересобери

```bash
npm run build
```

Заголовок обновится автоматически:

```css
/* njX UI v1.1.0 | MIT License | github.com/njbSaab/njx-ui-libe */
```

### Шаг 3 — Тегируй релиз в Git

```bash
git add css/style.min.css package.json
git commit -m "release: v1.1.0"
git tag v1.1.0
git push && git push --tags
```

---

## 7. Структура CSS-файлов

```
css/
├── style.css          ← ТОЛЬКО @import. Точка входа для сборки.
│                        Никаких стилей здесь.
│
├── style.min.css      ← Результат сборки. Не редактировать вручную.
│                        Пересоздаётся командой npm run build.
│
├── _base.css          ← Design Tokens: цвета, шрифты, отступы, тени
├── _reset.css         ← Сброс браузерных стилей
│
├── _grid.css          ← Сетка (12-col flex + CSS Grid)
├── _typography.css    ← Типографика
├── _utils.css         ← Утилиты (Tailwind-style)
├── _gradients.css     ← Градиенты
├── _animations.css    ← Анимации и @keyframes
│
├── _buttons.css       ← Кнопки
├── _cards.css         ← Карточки
├── _form.css          ← Формы
├── _tags.css          ← Теги / Badges
├── _nav.css           ← Навигация
├── _tab.css           ← Табы
├── _collapse.css      ← Аккордеон
├── _dropdown.css      ← Дропдаун
├── _slider.css        ← Карусель / Слайдер
├── _popups.css        ← Модалки
├── _hovers.css        ← Hover-эффекты
├── _notifications.css ← Уведомления / Toast
├── _table.css         ← Таблицы
├── _breadcrumb.css    ← Хлебные крошки
├── _links.css         ← Ссылки
├── _sections.css      ← Layout-секции
├── _global.css        ← Глобальные стили
└── _responsive.css    ← Responsive-утилиты (sm: md: lg: xl:)
```

> **Правило:** `style.css` — только `@import`, никаких стилей.  
> `style.min.css` — только результат сборки, не редактировать вручную.

---

## 8. Результаты сборки

После `npm run build` в терминале увидишь вывод lightningcss:

```
> njx-ui@1.0.0 build
> npm run minify && npm run header

> njx-ui@1.0.0 minify
> lightningcss --minify --bundle css/style.css -o css/style.min.css

> njx-ui@1.0.0 header
> node -e "..."
```

Если никаких ошибок нет — сборка прошла успешно.

### Проверить размер вручную

```bash
# Размер файла
wc -c css/style.min.css

# Gzip-размер (реальный размер при загрузке)
gzip -c css/style.min.css | wc -c

# Первые 100 символов (проверить заголовок)
head -c 100 css/style.min.css
```

---

## 9. Подключение в HTML

### Разработка — исходники

```html
<head>
  <!-- Читает @import, браузер подтягивает все 25 файлов -->
  <link rel="stylesheet" href="css/style.css" />
</head>
```

Удобно при разработке — изменения в любом `_компонент.css` видны сразу без пересборки.

### Продакшен — минифицированный

```html
<head>
  <!-- Один файл, быстрая загрузка -->
  <link rel="stylesheet" href="css/style.min.css" />
</head>
```

### CDN (после npm publish)

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui@1.0.0/css/style.min.css" />
</head>
```

---

## 10. Устранение проблем

### `lightningcss: command not found`

```bash
npm install
```

Зависимости не установлены. Запусти из корня проекта.

---

### `Cannot find module 'package.json'`

Убедись, что запускаешь команды из корневой папки проекта (там, где лежит `package.json`):

```bash
cd /path/to/njx-css-lib
npm run build
```

---

### Новый компонент не попал в `style.min.css`

Проверь что:
1. Файл `css/_мой-компонент.css` существует
2. В `css/style.css` есть строка `@import "_мой-компонент.css";`
3. Запущен `npm run build` после изменений

---

### CSS Nesting не работает в старых браузерах

lightningcss сохраняет CSS Nesting как есть (не раскрывает). Если нужна поддержка старых браузеров — добавь флаг:

```bash
# Раскрыть CSS Nesting в обычные правила (совместимость с IE11+)
npx lightningcss --minify --bundle --targets '>= 0.5%' css/style.css -o css/style.min.css
```

---

*Документ: `docs/BUILD.md` · Версия инструмента: lightningcss 1.x*
