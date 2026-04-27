#!/usr/bin/env node
/**
 * build-classless-mode.js
 * ─────────────────────────────────────────────────────────────
 * Reads classless.css and produces classless-mode.css where
 * every selector is scoped to html[data-classless], giving
 * zero cascade conflicts when loaded alongside style.min.css.
 *
 * Usage: node scripts/build-classless-mode.js
 * ─────────────────────────────────────────────────────────────
 */

const fs   = require('fs');
const path = require('path');

const SRC  = path.join(__dirname, '../css/classless.css');
const DEST = path.join(__dirname, '../css/classless-mode.css');
const P    = 'html[data-classless]'; // scope prefix

const raw = fs.readFileSync(SRC, 'utf8');

// ── 1. Strip @import lines ──────────────────────────────────
let css = raw.replace(/@import\s+url\([^)]+\)[^;]*;/g, '');
css = css.replace(/@import\s+['"][^'"]+['"]\s*;/g, '');

// ── 2. Scope a single selector string ───────────────────────
function scopeSel(s) {
  s = s.trim();
  if (!s) return '';

  // :root → html[data-classless]
  if (s === ':root') return P;
  if (s.startsWith(':root ')) return P + s.slice(5);

  // html element selectors → html[data-classless]...
  if (/^html(\s|:|>|\[|$)/.test(s)) {
    return P + s.slice(4);
  }

  // [data-theme="..."] on the root — should be html[data-classless][data-theme]
  // These appear as bare attribute selectors at root level
  if (/^\[data-theme/.test(s) || /^\[data-variant/.test(s)) {
    return P + s;
  }

  // ::selection — scope as html[data-classless] ::selection
  if (s.startsWith('::')) return `${P} ${s}`;

  // :target, :root: …
  if (s.startsWith(':target')) return `${P} ${s}`;

  // Already has our prefix
  if (s.startsWith(P)) return s;

  // Everything else: prepend as ancestor
  return `${P} ${s}`;
}

// ── 3. Scope a comma-separated selector list ────────────────
function scopeList(selList) {
  return selList
    .split(',')
    .map(scopeSel)
    .filter(Boolean)
    .join(',\n');
}

// ── 4. Simple CSS block splitter ────────────────────────────
// Extracts top-level tokens: comments, @rules, regular rules.
// Returns array of { type, raw } objects.
function tokenise(src) {
  const tokens = [];
  let i = 0;

  while (i < src.length) {
    // Skip whitespace
    while (i < src.length && /\s/.test(src[i])) i++;
    if (i >= src.length) break;

    // Comment /* ... */
    if (src[i] === '/' && src[i+1] === '*') {
      const start = i;
      i += 2;
      while (i < src.length && !(src[i-1] === '*' && src[i] === '/')) i++;
      i++;
      tokens.push({ type: 'comment', raw: src.slice(start, i) });
      continue;
    }

    // @rule
    if (src[i] === '@') {
      const start = i;
      // Read keyword
      while (i < src.length && src[i] !== '{' && src[i] !== ';') i++;

      if (src[i] === ';') {
        i++;
        tokens.push({ type: 'at-simple', raw: src.slice(start, i) });
        continue;
      }

      if (src[i] === '{') {
        // Read balanced block
        let depth = 0;
        while (i < src.length) {
          if (src[i] === '{') depth++;
          if (src[i] === '}') { depth--; if (depth === 0) { i++; break; } }
          i++;
        }
        tokens.push({ type: 'at-block', raw: src.slice(start, i) });
        continue;
      }
      continue;
    }

    // Stray }
    if (src[i] === '}') { i++; continue; }

    // Regular rule: selector { declarations }
    const start = i;
    // Read selector (up to first {, respecting strings)
    while (i < src.length && src[i] !== '{') {
      if (src[i] === '"') { i++; while (i < src.length && src[i] !== '"') i++; i++; }
      else if (src[i] === "'") { i++; while (i < src.length && src[i] !== "'") i++; i++; }
      else i++;
    }
    const selector = src.slice(start, i).trim();
    if (!selector || i >= src.length) { i++; continue; }

    // Read block
    i++; // skip {
    let depth = 1;
    const bodyStart = i;
    while (i < src.length && depth > 0) {
      if (src[i] === '{') depth++;
      if (src[i] === '}') depth--;
      if (depth > 0) i++;
      else i++;
    }
    const body = src.slice(bodyStart, i - 1);
    tokens.push({ type: 'rule', selector, body });
  }

  return tokens;
}

// ── 5. Transform a block's tokens ───────────────────────────
function transformTokens(tokens, inMedia = false) {
  const out = [];

  for (const tok of tokens) {
    if (tok.type === 'comment') {
      out.push(tok.raw);
      continue;
    }

    if (tok.type === 'at-simple') {
      // Drop @import
      if (!tok.raw.trim().startsWith('@import')) {
        out.push(tok.raw);
      }
      continue;
    }

    if (tok.type === 'at-block') {
      const raw = tok.raw;
      // Get the at-keyword
      const kwMatch = raw.match(/^(@[\w-]+)/);
      const kw = kwMatch ? kwMatch[1].toLowerCase() : '';

      if (kw === '@keyframes' || kw === '@-webkit-keyframes') {
        // Pass through unchanged
        out.push(raw);
        continue;
      }

      // @media / @supports / @layer — scope selectors inside
      const openBrace = raw.indexOf('{');
      const header = raw.slice(0, openBrace);
      const inner  = raw.slice(openBrace + 1, raw.lastIndexOf('}'));
      const innerTokens = tokenise(inner);
      const transformed = transformTokens(innerTokens, true);
      out.push(`${header.trim()} {\n${transformed}\n}`);
      continue;
    }

    if (tok.type === 'rule') {
      const scoped = scopeList(tok.selector);
      if (scoped) {
        out.push(`${scoped} {\n${tok.body.trim()}\n}`);
      }
      continue;
    }
  }

  return out.join('\n\n');
}

// ── 6. Run ──────────────────────────────────────────────────
const tokens = tokenise(css);
const body   = transformTokens(tokens);

const output = `/* ================================================================
   _classless-mode.css  —  AUTO-GENERATED, DO NOT EDIT
   Generated by: scripts/build-classless-mode.js
   ================================================================
   Classless mode addon for njX UI.

   HOW IT WORKS
   ────────────
   Every selector from classless.css is scoped to html[data-classless].
   This means you can load it alongside style.min.css with ZERO
   cascade conflicts. Component classes (.btn, .card-glow, etc.) and
   classless element styles (button, table, nav...) live in separate
   CSS layers and never collide.

   USAGE — Full + Classless together (recommended):
     <link rel="stylesheet" href="style.min.css">
     <link rel="stylesheet" href="classless-mode.css">
     <html data-classless data-theme="dark">
     → All element semantics styled + all component classes available.
     → Mix freely: <button> and <button class="btn-glow"> both work.

   USAGE — Classless only (same as classic classless.css):
     <link rel="stylesheet" href="classless.css">

   USAGE — Full only (no classless):
     <link rel="stylesheet" href="style.min.css">
     <!-- omit data-classless attribute -->
================================================================ */

${body}
`;

fs.writeFileSync(DEST, output, 'utf8');

const inKB  = (Buffer.byteLength(css,    'utf8') / 1024).toFixed(1);
const outKB = (Buffer.byteLength(output, 'utf8') / 1024).toFixed(1);
console.log(`✓ Written: ${path.relative(process.cwd(), DEST)}`);
console.log(`  Source:  ${inKB} KB  →  Output: ${outKB} KB`);
console.log(`  Selectors scoped to: ${P}`);
