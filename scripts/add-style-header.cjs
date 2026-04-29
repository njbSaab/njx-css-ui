#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const meta = fs.readFileSync(path.join(root, 'src', 'lib', 'meta.ts'), 'utf8');
const match = meta.match(/LIB_VERSION\s*=\s*'([^']+)'/);
const version = match ? match[1] : '1.0.5';
const header = `/* njX UI v${version} | MIT License | github.com/njbSaab/njx-css-ui */\n`;

[
  path.join(root, 'css', 'style.min.css'),
  path.join(root, 'public', 'css', 'style.min.css'),
].forEach(file => {
  const css = fs.readFileSync(file, 'utf8').replace(/^\/\* njX UI v[^\n]*\*\/\n/, '');
  fs.writeFileSync(file, header + css, 'utf8');
});
