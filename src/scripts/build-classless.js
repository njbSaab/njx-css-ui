#!/usr/bin/env node
/**
 * build-classless.js
 * Builds css/classless.min.css from css/classless.css.
 *
 * classless.css starts with a Google Fonts @import URL that lightningcss
 * cannot bundle (external URL). Strategy:
 *   1. Strip line 1 (the @import url(...) line) into a temp file
 *   2. Bundle + minify the temp file (inlines _base.css)
 *   3. Prepend the original Google Fonts @import to the output
 *   4. Clean up temp file
 */

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const cssDir   = path.join(__dirname, '..', 'css');
const src      = path.join(cssDir, 'classless.css');
const out      = path.join(cssDir, 'classless.min.css');
const tmp      = path.join(cssDir, '_classless_build_tmp.css');

const content  = fs.readFileSync(src, 'utf8');
const lines    = content.split('\n');
const fontsLine = lines[0]; // @import url('https://fonts.googleapis.com/...')
const rest     = lines.slice(1).join('\n');

fs.writeFileSync(tmp, rest, 'utf8');

try {
  execSync(`npx lightningcss --minify --bundle "${tmp}" -o "${out}"`, {
    cwd: cssDir,
    stdio: 'inherit',
  });

  const minified = fs.readFileSync(out, 'utf8');
  fs.writeFileSync(out, fontsLine + '\n' + minified, 'utf8');

  const size = (fs.statSync(out).size / 1024).toFixed(1);
  console.log(`  – css/classless.min.css (${size} KB)`);
} finally {
  if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
}
