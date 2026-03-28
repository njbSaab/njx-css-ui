# njX UI Library — Позиционирование и стратегия роста

---

## ЧАСТЬ 1. Преимущества для showcase.html

### Главный hook (заголовок страницы)
```
40 KB. Zero dependencies. 9 themes. Instant.
```
Или вариант с болью пользователя:
```
Stop configuring. Start building.
The CSS library that works out of the box.
```

---

### Блок 1 — Цифры (hero-секция)

| Метрика | Значение |
|---|---|
| Размер | **~40 KB** (gzip ~8 KB) |
| Зависимости | **0** |
| Тем | **9** |
| Компонентов | **25+** |
| CSS-переменных | **60+** |
| JS | **не нужен** |

Эти цифры — в большие карточки рядом с заголовком. Смотрится как Stripe/Tailwind.

---

### Блок 2 — Ключевые преимущества (feature cards)

**🎨 9 тем одним атрибутом**
Переключение темы без перезагрузки страницы — просто `data-theme="dark"` на `<html>`.
Dark, Light, Red, Blue, Green, Cyan, Yellow, Pink, Purple. Все компоненты адаптируются автоматически.
```html
<html data-theme="purple">  <!-- и всё уже фиолетовое -->
```

**⚡ Подключается за 30 секунд**
Одна строка CSS — и готово. Никакого npm, никакой сборки, никакого конфига.
```html
<link rel="stylesheet" href="https://cdn.../njx/style.min.css">
```

**🔑 CSS Variables First**
Вся система построена на CSS Custom Properties. Хочешь изменить primary цвет во всём проекте — меняешь одну переменную. Не ищешь классы по всему коду.
```css
:root { --color-primary: #ff6b35; }  /* всё стало оранжевым */
```

**🌈 Градиенты и hover-эффекты из коробки**
То, за чем обычно идут в отдельные библиотеки. 30+ hover-классов, 15+ градиентов, анимации — всё уже внутри.

**📦 25+ компонентов**
Buttons, Cards, Forms, Tags, Modals, Tabs, Accordion, Tables, Notifications, Breadcrumbs, Progress — стандартный UI без дополнительных зависимостей.

**🎭 Анимации готовые к использованию**
`.animate-float`, `.animate-pulse`, `.animate-glow`, fade-in/up/left, text effects — просто добавь класс.

**🔤 Типографика под контроль**
Полная шкала заголовков и текста через классы. Работает последовательно на любом размере экрана.

**♻️ Bulma-совместимость**
Если уже используешь Bulma — классы `.button`, `.is-primary`, `.is-rounded` работают без изменений. Миграция без боли.

**📐 Две grid-системы**
Классическая 12-колоночная flex-сетка (`.row` + `.col-*`) и современная CSS Grid (`.grid-col-3`). На выбор.

**🎯 Tailwind-утилиты без Tailwind**
`px-4`, `mt-2`, `text-sm`, `flex`, `gap-4` — привычные утилиты есть. Но без 3MB PostCSS конфига.

---

### Блок 3 — Сравнение с конкурентами (таблица)

| | chota | Pico CSS | Bulma | Bootstrap | **njX** |
|---|---|---|---|---|---|
| Размер | 3 KB | 9 KB | 78 KB | 152 KB | **~40 KB** |
| Темы | ❌ | 2 | ❌ | 2 | **9** |
| CSS Variables | частично | ✅ | ❌ | частично | **✅ полностью** |
| Hover FX | ❌ | ❌ | ❌ | ❌ | **✅ 30+** |
| Градиенты | ❌ | ❌ | ❌ | ❌ | **✅ 15+** |
| Анимации | ❌ | ❌ | ❌ | ❌ | **✅** |
| Text Gradients | ❌ | ❌ | ❌ | ❌ | **✅** |
| JS зависимости | 0 | 0 | 0 | требует | **0** |
| Bulma-совместим | ❌ | ❌ | — | ❌ | **✅** |

Позиционирование: **"тяжелее chota, но в 4 раза легче Bulma — и умеет то, чего нет ни у кого"**

---

### Блок 4 — Для кого (use cases)

- **Landing pages** — быстрый красивый UI без настройки
- **Admin panels** — темизация, таблицы, формы, модалки
- **Prototyping** — поднять интерфейс за час, переключить тему под заказчика
- **Side projects** — не тратить день на настройку Tailwind для пет-проекта
- **Migrations** — плавный переход с Bulma без переписывания классов

---

### Блок 5 — Quick start код (для showcase)

```html
<!-- 1. Подключи -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/njx-ui/css/style.min.css">

<!-- 2. Выбери тему -->
<html data-theme="dark">

<!-- 3. Используй -->
<button class="btn btn-primary">Get Started</button>
<div class="card-glow">
  <h2 class="text-gradient-primary">Hello njX</h2>
  <p class="text-muted">Built in 30 seconds.</p>
</div>
```

---

## ЧАСТЬ 2. Стратегия роста на GitHub

### Минимальный старт (нужно сделать до любого постинга)

Без этого даже хороший пост не конвертируется в звёзды:

1. **README.md** с живым скриншотом всех 9 тем (GIF 5 сек — переключение тем)
2. **GitHub Pages** → `username.github.io/njx` — живое демо прямо из репо (бесплатно)
3. **CDN через jsDelivr** — автоматически работает после npm publish
4. **npm publish** — `npm install njx-ui` + значок версии в README
5. **LICENSE** (MIT)
6. **Topics в репо:** `css`, `ui-library`, `dark-theme`, `themes`, `css-variables`, `zero-dependencies`, `tailwind-alternative`, `frontend`, `web`

Это занимает 1 день и без этого всё остальное бесполезно.

---

### Волна 1 — Органика (0 денег, 1–2 недели)

#### GitHub сам
- Хороший README → попадание в GitHub Trending (CSS раздел) если набрать 30+ звёзд за день
- Ответить на каждый issue и PR первые 3 месяца — алгоритм GitHub учитывает активность

#### Reddit
- **r/webdev** (4.2M) — пост: `"I built a 40KB CSS library with 9 built-in themes — no JS, no build step"`
  Показать GIF с переключением тем. Не рекламный тон — "я сделал, хочу фидбек"
- **r/Frontend** (500K) — то же самое через неделю, другой заголовок
- **r/css** (300K) — акцент на технической стороне: CSS Variables architecture
- **r/SideProject** — история создания, что было сложно

Правило Reddit: **не продавай — делись**. "Сделал штуку, хочу услышать мнение" работает лучше чем "посмотрите какая крутая библиотека".

#### Hacker News
- `Show HN: njX — 40KB CSS library, 9 themes, zero dependencies`
- Постить в **9:00 EST вторник/среда** — пик трафика
- В комментах быть готовым ответить на технические вопросы (почему не Tailwind, как устроены токены)
- Одно попадание на фронт HN = 300–800 звёзд за 24 часа

#### Dev.to / Hashnode
Написать статью: **"Why I stopped using Tailwind for small projects"**
- Не bash Tailwind — показать альтернативу
- Показать реальный пример: лендинг на njX vs Tailwind, сравнить объём кода
- Dev.to индексируется Google — долгосрочный трафик

---

### Волна 2 — Контент (месяц 2–3)

**YouTube Shorts / TikTok (30 сек видео)**
```
"Смени тему сайта одной строкой кода"
data-theme="dark" → data-theme="purple"  [экран меняется]
"40 KB. Ноль зависимостей. github.com/..."
```
Такие видео набирают 50K–500K просмотров в dev-нише. Одно вирусное = 1000+ звёзд.

**Twitter/X**
- Пост с GIF: переключение 9 тем в 5 секунд
- Thread: "Как я сократил CSS с 200KB до 40KB используя только переменные"
- Тег `#CSS`, `#WebDev`, `#Frontend`, `#100DaysOfCode`

**CSS-Tricks / Smashing Magazine**
- Написать гостевую статью: "Building a themeable component library with CSS Custom Properties"
- Бесплатно, но требует качественный материал
- Один пост = стабильный трафик годами

---

### Волна 3 — Сообщество (месяц 3–6)

**Discord серверы**
- Theo's T3 Community, Kevin Powell's Discord, Frontend Masters Discord
- Не спам — участвуй в дискуссиях, потом упомяни проект когда уместно

**Awesome Lists**
- `awesome-css` на GitHub — PR с добавлением njX
- `awesome-tailwind-alternatives` — создать такой список самому если нет
- Попадание в Awesome list = стабильные звёзды каждый день

**Интеграции**
- Сделать стартер для **Astro** (`npm create astro` + njX)
- Стартер для **11ty** (популярен в indie web)
- Написать в их Discord что есть интеграция — там активно делятся стартерами

---

### Механика роста: что реально работает

```
Reddit пост (r/webdev)
    ↓
300 переходов на GitHub
    ↓
30 звёзд за день
    ↓
GitHub Trending (CSS)
    ↓
ещё 200 звёзд органически
    ↓
Hacker News Show HN
    ↓
500+ звёзд за сутки
    ↓
Попадание в рассылки (JavaScript Weekly, Frontend Focus)
    ↓
Стабильный органический рост
```

Рассылки **JavaScript Weekly** (180K подписчиков) и **CSS Weekly** (34K) сами пишут о популярных проектах — не нужно их просить, просто набрать 500+ звёзд.

---

### Конкурентный анализ — что делает chota популярной

chota: 1000+ звёзд при весе 3 KB.
Причина не в качестве — причина в **одном конкретном сообщении**: "smallest CSS framework".
У людей есть крючок чтобы поделиться: "смотри, 3 KB фреймворк существует".

**У njX тоже должен быть такой крючок:**
> "CSS library with 9 built-in themes — switch with one HTML attribute"

Это то, чего нет ни у кого. Это легко показать. Это легко пересказать.
Весь маркетинг строится вокруг одного этого demo.

---

### KPI по месяцам (реалистично)

| Месяц | Звёзды | Действия |
|---|---|---|
| 0 | 0 | README + GitHub Pages + npm |
| 1 | 50–150 | Reddit r/webdev + r/Frontend |
| 2 | 200–500 | Show HN + dev.to статья |
| 3 | 500–1000 | Twitter GIF + YouTube Short |
| 6 | 1000–2500 | Awesome lists + интеграции |
| 12 | 2500+ | Органика + рассылки |

chota сейчас ~1100 звёзд. Это реальная цель на 6–12 месяцев при последовательных действиях.

---

### Чеклист перед первым постом

- [ ] README.md с GIF или скриншотом
- [ ] GitHub Pages живое демо работает
- [ ] npm publish `njx-ui` (или другое имя)
- [ ] CDN ссылка рабочая
- [ ] LICENSE MIT
- [ ] Topics заполнены (9 штук)
- [ ] showcase.html с преимуществами и сравнением
- [ ] quickstart.html — 3 способа подключения
- [ ] `<meta>` теги для превью ссылки (og:image, og:title)

---

*Создан: 2026-03-26*
