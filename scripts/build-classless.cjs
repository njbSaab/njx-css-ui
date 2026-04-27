#!/usr/bin/env node
/**
 * build-classless.cjs
 * Builds public/css/classless.min.css from public/css/classless.css.
 * Strips external @import url(...) lines from classless.css and _base.css
 * before bundling (lightningcss cannot resolve external URLs).
 */

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const cssDir   = path.join(__dirname, '..', 'public', 'css');
const out      = path.join(cssDir, 'classless.min.css');

const filesToStrip = [
  path.join(cssDir, 'classless.css'),
  path.join(cssDir, '_base.css'),
];

const backups = {};

// Strip external @import url(...) from all relevant files
filesToStrip.forEach(f => {
  const original = fs.readFileSync(f, 'utf8');
  backups[f] = original;
  const stripped = original.split('\n')
    .filter(line => !/^\s*@import\s+url\(['"]https?:\/\//.test(line))
    .join('\n');
  fs.writeFileSync(f, stripped, 'utf8');
});

try {
  const src = path.join(cssDir, 'classless.css');
  execSync(`npx lightningcss --minify --bundle "${src}" -o "${out}"`, {
    cwd: cssDir,
    stdio: 'inherit',
  });

  const size = (fs.statSync(out).size / 1024).toFixed(1);
  console.log(`  – public/css/classless.min.css (${size} KB)`);
} finally {
  // Restore all original files
  filesToStrip.forEach(f => {
    if (backups[f]) fs.writeFileSync(f, backups[f], 'utf8');
  });
}
