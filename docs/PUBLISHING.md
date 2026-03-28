# Публикация njX UI — GitHub Pages + npm

---

## Часть 1 — GitHub Pages (сайт документации)

### Как это работает

GitHub Pages раздаёт файлы прямо из репозитория как статический сайт.
`loader.js` использует `fetch()` — это работает на Pages, потому что это обычный HTTP-сервер.

### Шаг 1 — убедись что всё собрано

```bash
# Пересобрать style.min.css перед деплоем
npm run build
```

### Шаг 2 — закоммить и запушить

```bash
git add .
git commit -m "chore: deploy docs site"
git push origin main
```

### Шаг 3 — включить GitHub Pages

1. Открыть репозиторий: **github.com/njbSaab/njx-ui-libe**
2. **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** → папка **/ (root)**
5. **Save**

Через 1-2 минуты сайт будет доступен по адресу:
```
https://njbSaab.github.io/njx-ui-libe/
```

### Структура которую увидит GitHub Pages

```
/ (root)
├── index.html              ← главная страница (компонентная библиотека)
├── pages/
│   ├── showcase.html
│   ├── doc.html
│   ├── check.html
│   └── quickstart.html
├── components/             ← loader.js загружает через fetch()
│   ├── topbar.html
│   ├── sidebar.html
│   └── download-modal.html
├── sections/               ← loader.js загружает через fetch()
│   ├── buttons.html
│   ├── cards.html
│   └── ...25 файлов
├── css/                    ← библиотека
├── js/                     ← njx.js
├── styles/                 ← стили документации
└── scripts/                ← JS документации
```

### Важно: fetch() и GitHub Pages

`loader.js` грузит компоненты через `fetch('components/sidebar.html')`.
На GitHub Pages это работает — сервер отдаёт файлы по HTTP.
Локально через `file://` — **не работает**, нужен локальный сервер:

```bash
npx serve .
# или
python3 -m http.server 3000
```

### Обновить сайт после изменений

```bash
git add .
git commit -m "feat: update components"
git push origin main
# GitHub Pages обновится автоматически через ~1 минуту
```

### Выпустить версию с тегом

```bash
git tag v1.0.0
git push origin v1.0.0
```

CDN-ссылка на конкретную версию:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbSaab/njx-ui-libe@v1.0.0/css/style.min.css">
```

---

## Часть 2 — npm публикация

### Что попадёт в npm-пакет

В `package.json` поле `files` включает только файлы библиотеки:

```json
"files": [
  "css/",
  "js/njx.js",
  "README.md",
  "LICENSE"
]
```

Папки `pages/`, `sections/`, `components/`, `styles/`, `scripts/` — **не попадут** в пакет.
Это правильно — в npm идёт только библиотека, не сайт документации.

### Шаг 1 — зарегистрироваться / войти на npmjs.com

```bash
npm login
# Введи username, password, email, OTP если включён 2FA
```

Проверить что залогинен:
```bash
npm whoami
# → njbSaab
```

### Шаг 2 — собрать минифицированный CSS

```bash
npm run build
```

Это создаст `css/style.min.css` с заголовком:
```css
/* njX UI v1.0.0 | MIT License | github.com/njbSaab/njx-ui-libe */
```

### Шаг 3 — проверить что попадёт в пакет

```bash
npm pack --dry-run
```

Вывод покажет список файлов. Должны быть только `css/` и `js/njx.js`.

### Шаг 4 — опубликовать

```bash
npm publish
```

Пакет будет доступен по адресу:
```
https://www.npmjs.com/package/njx-ui
```

### Использование после публикации

```bash
npm install njx-ui
```

```html
<link rel="stylesheet" href="node_modules/njx-ui/css/style.min.css">
<script src="node_modules/njx-ui/js/njx.js"></script>
```

Или через unpkg CDN:
```html
<link rel="stylesheet" href="https://unpkg.com/njx-ui@1.0.0/css/style.min.css">
```

---

## Часть 3 — обновление версии

Когда добавляешь компоненты или исправляешь баги — обновляй версию по semver:

```bash
# Патч: 1.0.0 → 1.0.1 (багфикс)
npm version patch

# Минор: 1.0.0 → 1.1.0 (новый компонент)
npm version minor

# Мажор: 1.0.0 → 2.0.0 (breaking changes)
npm version major
```

Команда автоматически:
- Обновит `version` в `package.json`
- Создаст git commit
- Создаст git tag

После этого:
```bash
npm run build          # пересобрать CSS с новой версией в заголовке
git add css/style.min.css
git commit --amend --no-edit   # добавить min.css в тот же коммит
git push origin main --tags    # запушить коммит + тег
npm publish                    # опубликовать на npm
```

---

## Чеклист деплоя

### GitHub Pages
- [ ] `npm run build` — `style.min.css` пересобран
- [ ] `index.html` в корне (переименован из `index.html`)
- [ ] Старые дублирующие `.html` в корне удалены
- [ ] `git push origin main`
- [ ] GitHub Pages включён в Settings → Pages

### npm
- [ ] `npm run build`
- [ ] `npm version patch/minor/major`
- [ ] `npm pack --dry-run` — проверить список файлов
- [ ] `npm publish`
- [ ] `git push origin main --tags`
