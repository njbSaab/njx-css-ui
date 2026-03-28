# Using njX UI from GitHub

## Option 1 — CDN via jsDelivr (no download needed)

The fastest way. Just paste the link into your HTML — no installation, no build step.

```html
<!DOCTYPE html>
<html data-theme="dark" lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Landing</title>

  <!-- njX UI -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbSaab/njx-css-ui@main/css/style.min.css">
</head>
<body>

  <button class="btn btn-primary">Hello njX</button>

  <script src="https://cdn.jsdelivr.net/gh/njbSaab/njx-css-ui@main/js/njx.js"></script>
</body>
</html>
```

For a stable pinned version (won't break when the library updates):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbSaab/njx-css-ui@1.0.0/css/style.min.css">
<script src="https://cdn.jsdelivr.net/gh/njbSaab/njx-css-ui@1.0.0/js/njx.js"></script>
```

---

## Option 2 — Download ZIP

1. Go to [github.com/njbSaab/njx-css-ui](https://github.com/njbSaab/njx-css-ui)
2. Click **Code → Download ZIP**
3. Unzip and copy the `css/` and `js/` folders into your project
4. Connect in HTML:

```html
<link rel="stylesheet" href="css/style.min.css">
<script src="js/njx.js"></script>
```

---

## Option 3 — Clone via Git

```bash
git clone https://github.com/njbSaab/njx-css-ui.git
cd njx-css-ui
```

Then copy `css/` and `js/` into your project.

---

## Option 4 — npm

```bash
npm install njx-ui
```

```html
<link rel="stylesheet" href="node_modules/njx-ui/css/style.min.css">
```

---

## How to Fork the repository

Forking creates your own copy of njX under your GitHub account — useful if you want to customize the library or contribute back.

### Step 1 — Fork on GitHub

1. Open [github.com/njbSaab/njx-css-ui](https://github.com/njbSaab/njx-css-ui)
2. Click **Fork** (top right)
3. Choose your GitHub account
4. GitHub creates `your-username/njx-css-ui`

### Step 2 — Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/njx-css-ui.git
cd njx-css-ui
```

### Step 3 — Add the original repo as upstream (optional but recommended)

This lets you pull in future updates from the original:

```bash
git remote add upstream https://github.com/njbSaab/njx-css-ui.git
```

Check remotes:

```bash
git remote -v
# origin    https://github.com/YOUR_USERNAME/njx-css-ui.git
# upstream  https://github.com/njbSaab/njx-css-ui.git
```

### Step 4 — Sync with the original (when updates arrive)

```bash
git fetch upstream
git merge upstream/main
git push origin main
```

---

## How to use your fork as a CDN

After forking, you can use your own version via jsDelivr:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/njx-css-ui@main/css/style.min.css">
```

This way you can modify the library and serve your custom version from CDN.
