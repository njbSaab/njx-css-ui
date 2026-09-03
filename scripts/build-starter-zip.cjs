#!/usr/bin/env node
/**
 * build-starter-zip.cjs
 * Packs public/examples/starter/ into public/examples/njxui-your-project.zip
 * with a proper root folder (njxui-your-project/) inside the archive.
 * Run after any change to the starter files: npm run examples:zip
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const src = path.join(root, 'public', 'examples', 'starter');
const out = path.join(root, 'public', 'examples', 'njxui-your-project.zip');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'njx-starter-'));
const staged = path.join(tmp, 'njxui-your-project');

fs.cpSync(src, staged, { recursive: true });
if (fs.existsSync(out)) fs.unlinkSync(out);
execSync(`zip -r -X "${out}" njxui-your-project`, { cwd: tmp, stdio: 'pipe' });
fs.rmSync(tmp, { recursive: true, force: true });

const size = (fs.statSync(out).size / 1024).toFixed(1);
console.log(`starter zip built: public/examples/njxui-your-project.zip (${size} KB)`);
