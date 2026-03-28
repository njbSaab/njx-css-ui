# njX UI — npm: публикация пакета

> Опубликовать библиотеку как `njx-ui` на npm и связать с GitHub репозиторием

---

## Содержание

1. [Что получим](#1-что-получим)
2. [Регистрация на npm](#2-регистрация-на-npm)
3. [Подготовка пакета](#3-подготовка-пакета)
4. [Первая публикация](#4-первая-публикация)
5. [Проверка пакета](#5-проверка-пакета)
6. [CDN через jsDelivr](#6-cdn-через-jsdelivr)
7. [Обновление пакета](#7-обновление-пакета)
8. [Связь GitHub ↔ npm](#8-связь-github--npm)
9. [Badges для README](#9-badges-для-readme)
10. [Частые проблемы](#10-частые-проблемы)

---

## 1. Что получим

После публикации библиотека будет доступна тремя способами:

```bash
# npm
npm install njx-ui
```

```html
<!-- jsDelivr CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/style.min.css">
<script src="https://cdn.jsdelivr.net/npm/njx-ui/js/njx.js"></script>
```

```html
<!-- unpkg CDN -->
<link rel="stylesheet" href="https://unpkg.com/njx-ui/css/style.min.css">
```

Страница пакета: `https://www.npmjs.com/package/njx-ui`

---

## 2. Регистрация на npm

### Создай аккаунт

Перейди на `https://www.npmjs.com/signup` и зарегистрируйся.

> Имя пользователя будет видно в ссылках пакета.  
> Рекомендуется использовать то же имя что на GitHub: `njbSaab`

### Включи двухфакторную аутентификацию (2FA)

npm **требует** 2FA для публикации пакетов начиная с 2023 года.

```
npmjs.com → аватар → Account Settings → Two-Factor Authentication → Enable
```

Используй приложение: **Google Authenticator** или **Authy**.

---

## 3. Подготовка пакета

### Проверь `package.json`

Текущее содержимое уже настроено. Убедись что все поля корректны:

```json
{
  "name": "njx-ui",
  "version": "1.0.0",
  "description": "Lightweight CSS component library — 25+ components, 9 themes, zero dependencies. ~40KB.",
  "main": "css/style.css",
  "style": "css/style.css",
  "files": [
    "css/",
    "js/njx.js",
    "README.md",
    "LICENSE"
  ],
  "keywords": [
    "css", "ui-library", "css-framework", "dark-theme",
    "themes", "css-variables", "zero-dependencies",
    "tailwind-alternative", "bulma-compatible", "frontend"
  ],
  "author": "njbSaab",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/njbSaab/njx-css-ui.git"
  },
  "homepage": "https://njbSaab.github.io/njx-css-ui"
}
```

### Поле `files` — что попадёт в пакет

```
"files": ["css/", "js/njx.js", "README.md", "LICENSE"]
```

В npm пойдут только эти файлы. `node_modules/`, `docs/`, `*.html` — **не попадут**.  
Это правильно — пользователю нужны только CSS и JS.

### Проверь содержимое пакета до публикации

```bash
npm pack --dry-run
```

Покажет список файлов которые войдут в пакет:

```
npm notice 📦  njx-ui@1.0.0
npm notice === Tarball Contents ===
npm notice 215kB css/style.min.css
npm notice 293kB css/style.css
npm notice ...   css/_base.css
npm notice ...   (все _*.css файлы)
npm notice 7kB   js/njx.js
npm notice 10kB  README.md
npm notice 1kB   LICENSE
npm notice === Tarball Details ===
npm notice total files: 28
```

Убедись что `style.min.css` в списке. Если нет — запусти `npm run build` и закоммить.

---

## 4. Первая публикация

### Шаг 1 — Войди в npm

```bash
npm login
```

Введи:
- Username: `njbSaab`
- Password: (твой пароль от npm)
- Email: (твой email)
- OTP: (код из приложения 2FA)

Проверить что вошёл:

```bash
npm whoami
# → njbSaab
```

### Шаг 2 — Собери свежий минифицированный CSS

```bash
npm run build
```

### Шаг 3 — Закоммить и запушить

```bash
git add -A
git commit -m "release: v1.0.0"
git push origin main
```

### Шаг 4 — Опубликовать

```bash
npm publish
```

Введи OTP-код из приложения 2FA когда попросит.

Успешный вывод:

```
npm notice 📦  njx-ui@1.0.0
npm notice Publishing to https://registry.npmjs.org/ with tag latest and default access
+ njx-ui@1.0.0
```

🎉 Пакет опубликован! Через 1–2 минуты появится на:
```
https://www.npmjs.com/package/njx-ui
```

---

## 5. Проверка пакета

### Страница на npm

```
https://www.npmjs.com/package/njx-ui
```

Там будет: описание из `package.json`, README.md, список файлов, статистика загрузок.

### Тест установки

В любой пустой папке:

```bash
mkdir test-njx && cd test-njx
npm install njx-ui
ls node_modules/njx-ui/css/
# → style.css  style.min.css  _base.css  ...
```

### CDN работает автоматически

Сразу после публикации доступны CDN-ссылки:

```
https://cdn.jsdelivr.net/npm/njx-ui@1.0.0/css/style.min.css
https://cdn.jsdelivr.net/npm/njx-ui/css/style.min.css        ← всегда latest
https://unpkg.com/njx-ui@1.0.0/css/style.min.css
```

---

## 6. CDN через jsDelivr

После публикации на npm — jsDelivr автоматически раздаёт файлы пакета.

### Рекомендуемые ссылки

```html
<!-- Конкретная версия (стабильно, не меняется) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui@1.0.0/css/style.min.css">
<script src="https://cdn.jsdelivr.net/npm/njx-ui@1.0.0/js/njx.js"></script>

<!-- Последняя версия (всегда актуально) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/style.min.css">
<script src="https://cdn.jsdelivr.net/npm/njx-ui/js/njx.js"></script>
```

> **Рекомендация:** в продакшене используй ссылку с конкретной версией (`@1.0.0`).  
> Это защищает от неожиданных изменений при обновлениях библиотеки.

### Проверить доступность CDN

```
https://cdn.jsdelivr.net/npm/njx-ui/
```

Откроется список файлов пакета.

---

## 7. Обновление пакета

### Изменил CSS / добавил компонент

```bash
# 1. Пересобери CSS
npm run build

# 2. Обнови версию (patch = исправление, minor = новая фича)
npm version patch    # 1.0.0 → 1.0.1
# или
npm version minor    # 1.0.0 → 1.1.0

# Команда npm version автоматически:
# - обновит "version" в package.json
# - создаст git коммит "1.0.1"
# - создаст git тег "v1.0.1"

# 3. Пересобери с новой версией в заголовке
npm run build

# 4. Запуши с тегами
git push origin main --tags

# 5. Опубликуй
npm publish
```

### Таблица типов версий

| Команда | Было | Стало | Когда использовать |
|---------|------|-------|-------------------|
| `npm version patch` | 1.0.0 | 1.0.1 | Фикс бага в компоненте |
| `npm version minor` | 1.0.0 | 1.1.0 | Новый компонент, новая фича |
| `npm version major` | 1.0.0 | 2.0.0 | Переименование классов, breaking change |

---

## 8. Связь GitHub ↔ npm

### Как связаны

```
GitHub репозиторий                    npm пакет
─────────────────────                 ────────────────
njbSaab/njx-css-ui          ←→      njx-ui
  └── package.json                     └── "repository" поле
        "repository":                  └── "homepage" поле
          "url": "github.com/..."
```

Поле `repository` в `package.json` уже настроено:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/njbSaab/njx-css-ui.git"
},
"homepage": "https://njbSaab.github.io/njx-css-ui"
```

npm показывает ссылку на GitHub автоматически — она появится на странице пакета в разделе **Repository**.

### Связь через GitHub Releases

Когда создаёшь тег через `npm version`, он попадает в GitHub как тег.  
Чтобы создать красивый **Release** на GitHub:

```
github.com/njbSaab/njx-css-ui/releases/new
```

- Tag: `v1.0.0` (выбрать существующий тег)
- Title: `v1.0.0 — Initial Release`
- Description: список изменений

### GitHub Topics — для находимости

В настройках репозитория добавь topics:

```
github.com/njbSaab/njx-css-ui → About (шестерёнка) → Topics
```

Добавить:
```
css  ui-library  css-framework  dark-theme  themes  css-variables
zero-dependencies  tailwind-alternative  bulma-compatible  frontend
```

### npm + GitHub связь в обе стороны

На странице `npmjs.com/package/njx-ui` появятся:
- Ссылка на GitHub репо (из поля `repository`)
- Ссылка на homepage — GitHub Pages (из поля `homepage`)
- Число звёзд GitHub (npm подтягивает автоматически)

---

## 9. Badges для README

После публикации добавь в `README.md` живые бейджи:

```markdown
[![npm version](https://img.shields.io/npm/v/njx-ui.svg)](https://www.npmjs.com/package/njx-ui)
[![npm downloads](https://img.shields.io/npm/dm/njx-ui.svg)](https://www.npmjs.com/package/njx-ui)
[![npm bundle size](https://img.shields.io/bundlephobia/min/njx-ui)](https://bundlephobia.com/package/njx-ui)
[![GitHub stars](https://img.shields.io/github/stars/njbSaab/njx-css-ui?style=social)](https://github.com/njbSaab/njx-css-ui)
```

Как будут выглядеть:

```
[npm v1.0.0]  [↓ 128/month]  [215kB]  [★ 47]
```

---

## 10. Частые проблемы

### `npm publish` — ошибка `403 Forbidden`

Пакет с именем `njx-ui` уже занят другим пользователем.

Решения:
1. Проверь: `https://www.npmjs.com/package/njx-ui`
2. Если занят — переименуй в `package.json`:
   - `njxui` — без дефиса
   - `@njbSaab/njx-ui` — scoped пакет (требует `npm publish --access public`)
   - `njx-css` / `njx-lib`

```bash
# Для scoped пакета (@njbSaab/njx-ui):
npm publish --access public
```

---

### `npm publish` — ошибка `402 Payment Required`

Пытаешься опубликовать приватный пакет бесплатно.  
Добавь в `package.json`:

```json
"publishConfig": {
  "access": "public"
}
```

---

### `You must be logged in` / `ENEEDAUTH`

```bash
npm login
npm whoami    # проверить
```

---

### OTP required

```bash
npm publish --otp=123456
```

Замени `123456` на актуальный код из приложения 2FA.

---

### Версия уже опубликована — `E403`

npm не позволяет перезаписать уже опубликованную версию.  
Всегда увеличивай версию перед публикацией:

```bash
npm version patch && npm run build && npm publish
```

---

### CDN не обновился после публикации

jsDelivr кеширует файлы. Для принудительного обновления:

```
https://purge.jsdelivr.net/npm/njx-ui/css/style.min.css
```

Или дождись — кеш обновляется автоматически через 7 дней.

---

## Итоговый чеклист публикации

```
□ npm аккаунт создан
□ 2FA включена
□ npm login выполнен (npm whoami работает)
□ package.json: name, version, description, files, repository заполнены
□ npm run build выполнен (style.min.css свежий)
□ npm pack --dry-run проверен (style.min.css в списке)
□ git push origin main выполнен
□ npm publish выполнен
□ https://www.npmjs.com/package/njx-ui открывается
□ CDN ссылка работает
□ README.md обновлён с CDN ссылками и npm badge
□ GitHub Topics добавлены
```

---

*Документ: `docs/NPM.md` · Репозиторий: github.com/njbSaab/njx-css-ui*
npm set //registry.npmjs.org/:_authToken=YOUR_TOKEN