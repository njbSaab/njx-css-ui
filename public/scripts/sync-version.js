/**
 * sync-version.js
 * Reads version from package.json and updates it in all HTML/MD files.
 * Run: node scripts/sync-version.js
 */

const fs   = require('fs');
const path = require('path');

const version = require('../package.json').version;

const targets = [
  // [ filePath, regex to find old version, replacement ]
  {
    file: 'index.html',
    pattern: /v\d+\.\d+\.\d+ · MIT License/g,
    replace: `v${version} · MIT License`,
  },
  {
    file: 'pages/quickstart.html',
    pattern: /(<span class="sc-nav-ver">)v\d+\.\d+\.\d+(<\/span>)/g,
    replace: `$1v${version}$2`,
  },
  {
    file: 'pages/showcase.html',
    pattern: /(<span class="sc-nav-ver">)v\d+\.\d+\.\d+(<\/span>)/g,
    replace: `$1v${version}$2`,
  },
  {
    file: 'pages/showcase.html',
    pattern: /(Open Source · MIT License · )v\d+\.\d+\.\d+/g,
    replace: `$1v${version}`,
  },
  {
    file: 'pages/doc.html',
    pattern: /(<span class="sc-nav-ver">)v\d+\.\d+\.\d+(<\/span>)/g,
    replace: `$1v${version}$2`,
  },
];

const root = path.resolve(__dirname, '..');
let updated = 0;

targets.forEach(({ file, pattern, replace }) => {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ not found: ${file}`);
    return;
  }
  const before = fs.readFileSync(fullPath, 'utf8');
  const after  = before.replace(pattern, replace);
  if (before !== after) {
    fs.writeFileSync(fullPath, after, 'utf8');
    console.log(`  ✓ ${file}`);
    updated++;
  } else {
    console.log(`  – ${file} (already v${version})`);
  }
});

console.log(`\nDone — v${version} synced to ${updated} file(s).`);
