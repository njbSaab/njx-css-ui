import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const metaPath = path.join(root, 'src/data/library-meta.json');
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

function fileSizeKiB(relativePath) {
  const bytes = fs.statSync(path.join(root, relativePath)).size;
  return Math.round(bytes / 1024);
}

function replaceInFile(file, replacements) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    console.warn(`not found: ${file}`);
    return false;
  }

  const before = fs.readFileSync(fullPath, 'utf8');
  const after = replacements.reduce(
    (content, [pattern, replacement]) => content.replace(pattern, replacement),
    before,
  );

  if (after === before) return false;
  fs.writeFileSync(fullPath, after, 'utf8');
  return true;
}

const version = meta.version;
const fullSize = fileSizeKiB(meta.files.full);
const classlessSize = fileSizeKiB(meta.files.classless);
const sizeLabel = {
  full: `${fullSize} KB`,
  classless: `${classlessSize} KB`,
};

const commonVersionReplacements = [
  [/v\d+\.\d+\.\d+/g, `v${version}`],
  [/@\d+\.\d+\.\d+/g, `@${version}`],
];

const commonSizeReplacements = [
  [/~40KB/g, sizeLabel.full],
  [/~40 KB/g, sizeLabel.full],
  [/40KB/g, sizeLabel.full],
  [/40 KB/g, sizeLabel.full],
  [/293 KB/g, sizeLabel.full],
  [/296 KB/g, sizeLabel.full],
  [/48 KB/g, sizeLabel.classless],
  [/48 KB/g, sizeLabel.classless],
];

const targets = [
  {
    file: 'README.md',
    replacements: commonVersionReplacements,
  },
  {
    file: 'src/lib/meta.ts',
    replacements: commonVersionReplacements,
  },
  {
    file: 'src/components/PagesTopbar.astro',
    replacements: commonVersionReplacements,
  },
  {
    file: 'src/pages/index.astro',
    replacements: [...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/pages/overview.astro',
    replacements: [...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/pages/quickstart.astro',
    replacements: [...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/pages/documentation.astro',
    replacements: [...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/pages/classless-components.astro',
    replacements: [...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/pages/demo.astro',
    replacements: [...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/components/njx-sections/Carousel.astro',
    replacements: [...commonVersionReplacements, ...commonSizeReplacements],
  },
];

let updated = 0;
for (const target of targets) {
  if (replaceInFile(target.file, target.replacements)) {
    console.log(`updated: ${target.file}`);
    updated += 1;
  }
}

console.log(
  `library meta synced: v${version}, full ${sizeLabel.full}, classless ${sizeLabel.classless}`,
);
console.log(`changed files: ${updated}`);
