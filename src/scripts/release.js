/**
 * release.js — full release pipeline from terminal
 *
 * Usage:
 *   node scripts/release.js          ← uses version from package.json
 *   node scripts/release.js 1.0.6    ← bumps version first, then releases
 *
 * What it does:
 *   1. Optionally bumps version in package.json
 *   2. npm run build  (minify CSS + inject header + sync version to HTML)
 *   3. git add + commit + push
 *   4. git tag vX.X.X + push tag
 *   5. gh release create  (GitHub Release with notes from Releases.md)
 *   6. npm publish
 */

const { execSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// ── 1. Version ──────────────────────────────────────────────
const pkgPath = path.join(root, 'package.json');
const pkg     = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const newVersion = process.argv[2];
if (newVersion) {
  pkg.version = newVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  console.log(`\n📦 Version bumped → ${newVersion}`);
}

const version = pkg.version;
const tag     = `v${version}`;
console.log(`\n🚀 Releasing ${tag}\n`);

// ── Helper ───────────────────────────────────────────────────
function run(cmd, label) {
  console.log(`▶ ${label || cmd}`);
  execSync(cmd, { cwd: root, stdio: 'inherit' });
}

// ── 2. Build ─────────────────────────────────────────────────
run('npm run build', 'Build CSS + sync versions');

// ── 3. Git commit + push ─────────────────────────────────────
run('git add -A', 'Git stage all');
run(`git commit -m "release: ${tag}"`, 'Git commit');
run('git push', 'Git push');

// ── 4. Git tag ───────────────────────────────────────────────
run(`git tag ${tag}`, `Git tag ${tag}`);
run(`git push origin ${tag}`, 'Push tag');

// ── 5. GitHub Release ────────────────────────────────────────
// Extract release notes for this version from Releases.md
const releasesPath = path.join(root, 'docs', 'Releases.md');
let notes = '';
if (fs.existsSync(releasesPath)) {
  const content = fs.readFileSync(releasesPath, 'utf8');
  // Grab section between this version header and the next ## header
  const regex = new RegExp(
    `## 🎉 njX UI ${tag.replace('.', '\\.')}[\\s\\S]*?(?=\\n## |$)`
  );
  const match = content.match(regex);
  if (match) notes = match[0].trim();
}

if (!notes) {
  notes = `njX UI ${tag} — see docs/Releases.md for full changelog.`;
}

// Write notes to temp file (avoids shell escaping issues)
const notesFile = path.join(root, '.release-notes.tmp.md');
fs.writeFileSync(notesFile, notes, 'utf8');

try {
  run(
    `gh release create ${tag} --title "njX UI ${tag}" --notes-file .release-notes.tmp.md`,
    'GitHub Release'
  );
} finally {
  fs.unlinkSync(notesFile);
}

// ── 6. npm publish ───────────────────────────────────────────
run('npm publish', 'npm publish');

console.log(`\n✅ Done! njX UI ${tag} is live.\n`);
console.log(`   npm  → https://www.npmjs.com/package/njx-ui`);
console.log(`   gh   → https://github.com/njbSaab/njx-css-ui/releases/tag/${tag}\n`);
