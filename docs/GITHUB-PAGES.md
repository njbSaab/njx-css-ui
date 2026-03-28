# njX UI — GitHub Pages: пошаговый деплой

> Сделать живое демо доступным по адресу `https://njbSaab.github.io/njx-ui-libe`  
> Бесплатно. Без сервера. Автоматически обновляется при каждом `git push`.

---

## Содержание

1. [Подготовка репозитория](#1-подготовка-репозитория)
2. [Включение GitHub Pages](#2-включение-github-pages)
3. [Проверка деплоя](#3-проверка-деплоя)
4. [Как обновлять сайт](#4-как-обновлять-сайт)
5. [Что доступно после деплоя](#5-что-доступно-после-деплоя)
6. [CDN через jsDelivr без npm](#6-cdn-через-jsdelivr-без-npm)
7. [Кастомный домен](#7-кастомный-домен)
8. [Частые проблемы](#8-частые-проблемы)

---

## 1. Подготовка репозитория

Перед включением Pages убедись что всё в порядке.

### Репозиторий должен быть публичным

GitHub Pages бесплатно работает только для **публичных** репозиториев.

Проверить: открой `https://github.com/njbSaab/njx-ui-libe`  
Рядом с названием должно быть `Public`.

Если `Private`:
```
Settings → General → Danger Zone → Change visibility → Make public
```

### Собери свежий style.min.css

```bash
npm run build
```

### Закоммить и запушить всё в main

```bash
git add -A
git status        # проверь список файлов
git commit -m "release: prepare for GitHub Pages"
git push origin main
```

Убедись что `css/style.min.css` попал в коммит:

```bash
git ls-files css/style.min.css
# → css/style.min.css  (должен вывести путь)
```

---

## 2. Включение GitHub Pages

### Открой Settings → Pages

Прямая ссылка:
```
https://github.com/njbSaab/njx-ui-libe/settings/pages
```

Или вручную: репозиторий → вкладка **Settings** → левое меню → **Pages**.

### Настрой источник деплоя

В блоке **"Build and deployment"** выбери:

```
Source:   Deploy from a branch   ←── выбрать из выпадающего
Branch:   main   ←── ветка
Folder:   / (root)   ←── корень репозитория
```

Нажми **Save**.

> Папку `/docs` не выбирать — у нас сайт лежит в корне репозитория,  
> а `docs/` содержит документацию для разработчиков.

### Что произойдёт

GitHub автоматически запустит workflow `pages build and deployment`.  
Обычно занимает **1–3 минуты**.

После успеха на странице Settings → Pages появится:

```
🌐 Your site is live at
   https://njbSaab.github.io/njx-ui-libe/
              [Visit site]
```

---

## 3. Проверка деплоя

### Статус в Actions

```
https://github.com/njbSaab/njx-ui-libe/actions
```

Найди workflow `pages build and deployment`:
- 🟡 Жёлтый круг — в процессе, подожди
- ✅ Зелёная галочка — готово
- ❌ Красный крест — ошибка (смотри логи)

### Открой все страницы

```
https://njbSaab.github.io/njx-ui-libe/               ← главная (index.html)
https://njbSaab.github.io/njx-ui-libe/index.html  ← английская версия
https://njbSaab.github.io/njx-ui-libe/doc.html       ← документация компонентов
https://njbSaab.github.io/njx-ui-libe/quickstart.html
https://njbSaab.github.io/njx-ui-libe/showcase.html  ← лендинг
https://njbSaab.github.io/njx-ui-libe/check.html     ← changelog
```

### Проверь загрузку CSS

Открой в браузере — должен увидеть минифицированный CSS:

```
https://njbSaab.github.io/njx-ui-libe/css/style.min.css
```

Первые символы: `/* njX UI v1.0.0 | MIT License | ... */`

---

## 4. Как обновлять сайт

Каждый `git push` в ветку `main` **автоматически** запускает новый деплой.  
Никаких ручных действий на GitHub не нужно.

### Рабочий процесс

```
┌─────────────────────────────────────────────────────┐
│ 1. Внёс изменения в CSS или HTML                     │
│                                                     │
│ 2. Если менял CSS — пересобери:                     │
│    npm run build                                    │
│                                                     │
│ 3. Коммит и пуш:                                    │
│    git add -A                                       │
│    git commit -m "feat: add tooltip component"      │
│    git push origin main                             │
│                                                     │
│ 4. GitHub деплоит автоматически (1–3 минуты)        │
│    Статус: github.com/njbSaab/njx-ui-libe/actions  │
└─────────────────────────────────────────────────────┘
```

### Проверить обновление на сайте

Если страница показывает старую версию — принудительно обнови кеш браузера:

| ОС | Комбинация |
|----|-----------|
| Mac | `Cmd + Shift + R` |
| Windows / Linux | `Ctrl + Shift + R` |

---

## 5. Что доступно после деплоя

### Страницы

```
/                    → index.html      (главная — все компоненты)
/index.html       → английская версия
/doc.html            → документация
/quickstart.html     → быстрый старт
/showcase.html       → лендинг
/check.html          → changelog
```

### CSS и JS как статические файлы

```
/css/style.css           → исходник (с @import)
/css/style.min.css       → минифицированный (~32 KB gzip)
/js/njx.js               → JS-хелперы компонентов
```

### Документация

```
/docs/BUILD.md           → инструкция по сборке
/docs/DEPLOY.md          → деплой и CDN
/docs/NPM.md             → публикация на npm
/docs/roadmap.md         → план развития
```

---

## 6. CDN через jsDelivr без npm

После того как репозиторий публичный — jsDelivr **сразу** умеет раздавать файлы.  
npm для этого **не нужен**.

### Формат ссылки

```
https://cdn.jsdelivr.net/gh/{user}/{repo}@{branch-or-tag}/{path}
```

### Актуальные ссылки для njX UI

```html
<!-- Всегда последняя версия из main -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbSaab/njx-ui-libe@main/css/style.min.css">
<script src="https://cdn.jsdelivr.net/gh/njbSaab/njx-ui-libe@main/js/njx.js"></script>

<!-- Зафиксированная версия (рекомендуется для продакшена) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbSaab/njx-ui-libe@v1.0.0/css/style.min.css">
<script src="https://cdn.jsdelivr.net/gh/njbSaab/njx-ui-libe@v1.0.0/js/njx.js"></script>
```

> Версия `@main` — всегда актуальна, но может измениться.  
> `@v1.0.0` — зафиксирована навсегда, кешируется jsDelivr бессрочно.

### Создать git-тег для версии

```bash
git tag v1.0.0
git push origin v1.0.0
```

После этого ссылка с `@v1.0.0` становится активной.

---

## 7. Кастомный домен

Если есть домен (например `njx-ui.dev` или `njx.css`):

### Шаг 1 — Создай файл CNAME в корне репозитория

```bash
echo "njx-ui.dev" > CNAME
git add CNAME
git commit -m "chore: add custom domain CNAME"
git push origin main
```

Файл должен содержать только домен, одна строка, без протокола.

### Шаг 2 — DNS у регистратора домена

Добавь запись типа **CNAME** в DNS-настройках:

| Поле | Значение |
|------|----------|
| Тип | `CNAME` |
| Имя/Host | `@` (или `www`) |
| Значение/Target | `njbSaab.github.io` |
| TTL | 3600 (или Auto) |

### Шаг 3 — В Settings → Pages

В поле **Custom domain** введи: `njx-ui.dev`  
Нажми **Save**.  
Поставь галочку **Enforce HTTPS**.

> DNS-изменения распространяются до 24 часов.  
> Статус HTTPS-сертификата появится через 15–30 минут после DNS.

---

## 8. Частые проблемы

### Сайт открывается, но стили не применяются

CSS не загружается. Проверь что `style.min.css` в репозитории:

```bash
git ls-files css/style.min.css
```

Если пусто — файл не закоммичен:

```bash
npm run build
git add css/style.min.css
git commit -m "build: add style.min.css"
git push origin main
```

---

### 404 на всех страницах

Убедись в Settings → Pages:
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)` — **не** `/docs`

---

### Сайт не обновился после пуша

1. Подожди 3–5 минут
2. Проверь статус деплоя в Actions
3. Принудительно обнови браузер: `Cmd+Shift+R` / `Ctrl+Shift+R`

---

### Settings → Pages нет в меню

Репозиторий приватный. Сделай публичным:
```
Settings → General → Danger Zone → Change visibility → Make public
```

---

### Деплой упал с ошибкой в Actions

Открой Actions → `pages build and deployment` → нажми на упавший workflow → посмотри логи.

Частые причины:
- Конфликт в ветке
- Файл `index.html` не найден в корне
- Проблемы с правами (редко)

Решение — убедись что `index.html` находится в корне репозитория, а не в папке.

---

### Кеш CDN не обновился

jsDelivr кеширует файлы из `@main` до 7 дней. Для принудительной очистки:

```
https://purge.jsdelivr.net/gh/njbSaab/njx-ui-libe@main/css/style.min.css
```

Откройте ссылку в браузере — кеш сбросится для этого файла.

---

## Итоговый чеклист

```
□ Репозиторий публичный
□ npm run build выполнен (style.min.css свежий)
□ git push origin main выполнен
□ Settings → Pages → Source: main / root → Save
□ Ждём 1–3 минуты
□ Открываем https://njbSaab.github.io/njx-ui-libe/
□ Все страницы открываются
□ CSS загружается (/css/style.min.css)
□ Ссылки в README.md обновлены на реальный URL
```

---

*Документ: `docs/GITHUB-PAGES.md` · Репозиторий: github.com/njbSaab/njx-ui-libe*
