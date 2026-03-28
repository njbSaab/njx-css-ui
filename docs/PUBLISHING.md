# Публикация njX UI — полный путь

> GitHub → GitHub Pages → npm → CDN (jsDelivr / unpkg)

---

## Содержание

1. [GitHub — пушим код](#1-github--пушим-код)
2. [GitHub Pages — сайт документации](#2-github-pages--сайт-документации)
3. [npm — публикация пакета](#3-npm--публикация-пакета)
4. [CDN — jsDelivr и unpkg](#4-cdn--jsdelivr-и-unpkg)
5. [Обновление версии (полный цикл)](#5-обновление-версии-полный-цикл)
6. [Чеклист деплоя](#6-чеклист-деплоя)

---

## 1. GitHub — пушим код

### Репозиторий

```
https://github.com/njbSaab/njx-css-ui
```

### Стандартный пуш после изменений

```bash
# 1. Пересобрать CSS (всегда перед коммитом)
npm run build

# 2. Закоммить
git add .
git commit -m "feat: описание изменений"

# 3. Запушить
git push origin main
```

### Пуш с тегом версии (для релизов)

```bash
git push origin main --tags
```

### Если нужно посмотреть что изменилось

```bash
git status
git diff
git log --oneline -5
```

---

## 2. GitHub Pages — сайт документации

### Как включить (один раз)

1. Открыть репозиторий: `github.com/njbSaab/njx-css-ui`
2. **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** → папка **/ (root)**
5. **Save**

Через 1–2 минуты сайт будет доступен:

```
https://njbSaab.github.io/njx-css-ui/
```

### Как обновить сайт

Просто пушишь в `main` — GitHub Pages обновляется автоматически в течение ~1 минуты:

```bash
git push origin main
```

### Структура проекта для Pages

```
/ (root)
├── index.html              ← главная страница библиотеки
├── pages/                  ← дополнительные страницы
│   ├── showcase.html
│   ├── doc.html
│   ├── check.html
│   └── quickstart.html
├── components/             ← loader.js грузит через fetch()
│   ├── topbar.html
│   ├── sidebar.html
│   └── download-modal.html
├── sections/               ← loader.js грузит через fetch()
│   └── (25 файлов компонентов)
├── css/
│   ├── style.css           ← исходник (с @import)
│   └── style.min.css       ← бандл (без @import, для Pages и CDN)
├── js/njx.js
├── styles/lib-docs.css
└── scripts/
    ├── loader.js
    └── lib-docs.js
```

> **Важно:** Pages и CDN используют `style.min.css` — он полностью собран без `@import`.
> Локально через `file://` fetch() не работает. Используй локальный сервер:
> ```bash
> npx serve .
> ```

---

## 3. npm — публикация пакета

### Пакет на npm

```
https://www.npmjs.com/package/njx-ui
```

### Что попадает в пакет

Только файлы из поля `files` в `package.json`:

```json
"files": ["css/", "js/njx.js", "README.md", "LICENSE"]
```

Папки `pages/`, `sections/`, `components/`, `docs/`, `scripts/` — **не попадут**.

### Вход в npm

```bash
npm login
# Введи: username / password / email / OTP (код из 2FA приложения)

# Проверить:
npm whoami
# → njbSaab
```

> Если 2FA включён — нужен Granular Access Token с флагом **"Bypass two-factor authentication"**.
> Создаётся на: `npmjs.com → avatar → Access Tokens → Generate New Token → Granular Access Token`

### Первая публикация

```bash
# 1. Собрать CSS
npm run build

# 2. Проверить что попадёт в пакет
npm pack --dry-run

# 3. Опубликовать
npm publish
# или с OTP:
npm publish --otp=123456
```

### Использование после публикации

```bash
npm install njx-ui
```

```html
<link rel="stylesheet" href="node_modules/njx-ui/css/style.min.css">
<script src="node_modules/njx-ui/js/njx.js"></script>
```

---

## 4. CDN — jsDelivr и unpkg

После публикации на npm — CDN-ссылки становятся доступны **автоматически**.

### jsDelivr (рекомендуется)

```html
<!-- Последняя версия — всегда актуально -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/style.min.css">
<script src="https://cdn.jsdelivr.net/npm/njx-ui/js/njx.js"></script>

<!-- Конкретная версия — стабильно, не меняется -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui@1.0.0/css/style.min.css">
<script src="https://cdn.jsdelivr.net/npm/njx-ui@1.0.0/js/njx.js"></script>
```

### jsDelivr через GitHub (без npm, сразу после пуша)

```html
<!-- Последняя версия из main ветки -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbSaab/njx-css-ui@main/css/style.min.css">
<script src="https://cdn.jsdelivr.net/gh/njbSaab/njx-css-ui@main/js/njx.js"></script>

<!-- Конкретный тег -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbSaab/njx-css-ui@v1.0.0/css/style.min.css">
```

### unpkg

```html
<!-- Последняя версия -->
<link rel="stylesheet" href="https://unpkg.com/njx-ui/css/style.min.css">
<script src="https://unpkg.com/njx-ui/js/njx.js"></script>

<!-- Конкретная версия -->
<link rel="stylesheet" href="https://unpkg.com/njx-ui@1.0.0/css/style.min.css">
```

### Проверить доступность CDN

```
https://cdn.jsdelivr.net/npm/njx-ui/          ← список файлов (npm)
https://cdn.jsdelivr.net/gh/njbSaab/njx-css-ui@main/   ← список файлов (GitHub)
```

### Если CDN не обновился после публикации

jsDelivr кеширует файлы. Принудительная очистка кеша:

```
https://purge.jsdelivr.net/npm/njx-ui/css/style.min.css
https://purge.jsdelivr.net/gh/njbSaab/njx-css-ui@main/css/style.min.css
```

---

## 5. Обновление версии (полный цикл)

### Таблица версий

| Команда | Было | Стало | Когда |
|---------|------|-------|-------|
| `npm version patch` | 1.0.0 | 1.0.1 | Багфикс |
| `npm version minor` | 1.0.0 | 1.1.0 | Новый компонент |
| `npm version major` | 1.0.0 | 2.0.0 | Breaking change |

### Полный процесс обновления

```bash
# 1. Подними версию (обновит package.json + создаст git tag)
npm version patch
# или minor / major

# 2. Пересобери CSS (версия попадёт в заголовок style.min.css)
npm run build

# 3. Добавь style.min.css в тот же коммит
git add css/style.min.css
git commit --amend --no-edit

# 4. Запушь код и тег
git push origin main --tags

# 5. Опубликуй на npm
npm publish
# или с OTP:
npm publish --otp=123456
```

После этого новая версия появится на:
- `https://www.npmjs.com/package/njx-ui`
- `https://cdn.jsdelivr.net/npm/njx-ui@1.0.1/css/style.min.css`
- `https://unpkg.com/njx-ui@1.0.1/css/style.min.css`

---

## 6. Чеклист деплоя

### Обновить GitHub + Pages

```
□ npm run build               — style.min.css пересобран
□ git add . && git commit     — изменения закоммичены
□ git push origin main        — запушено
□ Pages обновился через ~1 мин
```

### Публикация на npm + CDN

```
□ npm run build               — style.min.css свежий
□ npm version patch/minor     — версия поднята, тег создан
□ npm run build               — CSS пересобран с новой версией
□ git add css/style.min.css && git commit --amend --no-edit
□ git push origin main --tags — код + тег на GitHub
□ npm publish                 — пакет опубликован на npm
□ https://www.npmjs.com/package/njx-ui — проверить страницу
□ CDN-ссылка с новой версией работает
```

---

*Репозиторий: `github.com/njbSaab/njx-css-ui` · npm: `npmjs.com/package/njx-ui`*
