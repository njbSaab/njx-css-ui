# Деплой njx-ui на CDN

## Способ 1 — jsDelivr (GitHub) — рекомендуется

Не нужен npm. Работает сразу после пуша на GitHub.

### Ссылки (актуальные после пуша в `main`)

```html
<!-- Минифицированная версия — для продакшна -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbSaab/njx-ui-libe@main/css/style.min.css">

<!-- Исходная версия — для разработки -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbSaab/njx-ui-libe@main/css/style.css">
```

### Закреплённая версия (рекомендуется для продакшна)

Чтобы обновления не ломали чужие проекты — используй тег версии вместо `@main`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbSaab/njx-ui-libe@1.0.0/css/style.min.css">
```

### Как выпустить версию (тег)

```bash
git tag 1.0.0
git push origin 1.0.0
```

После этого ссылка с `@1.0.0` становится активной и кешируется навсегда.

---

## Способ 2 — npm + unpkg

### Шаг 1 — зарегистрироваться на npmjs.com (если ещё нет)

```bash
npm login
```

### Шаг 2 — опубликовать пакет

```bash
npm publish
```

Имя пакета — `njx-ui` (из `package.json`).

### Ссылки после публикации

```html
<!-- Конкретная версия -->
<link rel="stylesheet" href="https://unpkg.com/njx-ui@1.0.0/css/style.min.css">

<!-- Последняя версия (не рекомендуется для продакшна) -->
<link rel="stylesheet" href="https://unpkg.com/njx-ui/css/style.min.css">
```

### Обновить версию и переопубликовать

```bash
npm version patch   # 1.0.0 → 1.0.1 (багфиксы)
npm version minor   # 1.0.0 → 1.1.0 (новые компоненты)
npm version major   # 1.0.0 → 2.0.0 (breaking changes)
npm publish
git push origin --tags
```

---

## Способ 3 — GitHub Pages (хостинг файлов напрямую)

### Шаг 1 — включить GitHub Pages

1. Открыть репозиторий на GitHub
2. Settings → Pages
3. Source: Deploy from a branch → `main` → `/ (root)`
4. Save

### Ссылка после активации (занимает 1–2 минуты)

```html
<link rel="stylesheet" href="https://njbSaab.github.io/njx-ui-libe/css/style.min.css">
```

---

## Сравнение способов

| Способ      | CDN | Версионирование | Сложность |
|-------------|-----|-----------------|-----------|
| jsDelivr    | Да  | Через git теги  | Минимум   |
| unpkg/npm   | Да  | Через npm версию| Средняя   |
| GitHub Pages| Нет | Нет             | Минимум   |

**Вывод:** для публичного CDN — jsDelivr. Для npm-экосистемы — unpkg.

---

## Чеклист перед деплоем

- [ ] `style.min.css` актуален (пересобран из `style.css`)
- [ ] Версия в `package.json` обновлена
- [ ] Все изменения запушены в `main`
- [ ] Git тег создан и запушен (`git tag X.X.X && git push origin X.X.X`)

---

## Сборка и минификация

### Почему нужна сборка (бандлинг)

`style.css` содержит 25+ строк `@import`. При подключении через CDN браузер делает **отдельный HTTP-запрос на каждый файл** — это медленно. Бандлер собирает всё в один файл перед деплоем.

```
style.css + 25 @import → [бандлер] → style.min.css (один файл, всё внутри)
```

---

### Вариант 1 — lightningcss (уже в зависимостях) ✅

`lightningcss` умеет и бандлить (`--bundle`) и минифицировать (`--minify`) за одну команду.

```bash
# Установить (уже есть в package.json)
npm install

# Собрать: раскрыть все @import + минифицировать
npx lightningcss --bundle --minify css/style.css -o css/style.min.css
```

Флаги:
- `--bundle` — раскрывает все `@import` в один файл
- `--minify` — убирает пробелы, комментарии, сокращает значения

---

### Вариант 2 — PostCSS (гибкий, с плагинами)

```bash
npm install --save-dev postcss postcss-cli postcss-import cssnano
```

Создать `postcss.config.js`:

```js
module.exports = {
  plugins: [
    require('postcss-import'),   // раскрывает @import
    require('cssnano')({ preset: 'default' })  // минифицирует
  ]
};
```

Запуск:

```bash
npx postcss css/style.css -o css/style.min.css
```

---

### Вариант 3 — esbuild (самый быстрый)

```bash
npm install --save-dev esbuild
```

```bash
npx esbuild css/style.css --bundle --minify --outfile=css/style.min.css
```

---

### npm-скрипты (рекомендуется добавить в package.json)

```json
"scripts": {
  "build": "lightningcss --bundle --minify css/style.css -o css/style.min.css",
  "watch": "lightningcss --bundle --minify --watch css/style.css -o css/style.min.css"
}
```

После этого:

```bash
npm run build   # собрать style.min.css
npm run watch   # пересобирать автоматически при изменениях
```

---

### Сравнение инструментов

| Инструмент  | Бандлинг @import | Минификация | Скорость | Доп. зависимости |
|-------------|-----------------|-------------|----------|-----------------|
| lightningcss| Да (`--bundle`) | Да          | Очень быстро | Уже есть |
| PostCSS     | Да (плагин)     | Да (плагин) | Средняя  | 3 пакета |
| esbuild     | Да              | Да          | Быстро   | 1 пакет |

**Вывод:** используй `lightningcss` — он уже установлен.