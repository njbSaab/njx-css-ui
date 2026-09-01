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

// ВАЖНО: заменяем версию только у нашего пакета — огульный /@\d+\.\d+\.\d+/
// ломал сторонние CDN-ссылки (например, jszip@3.10.1 → jszip@1.1.4).
const major = version.split('.')[0];

// CDN-ссылки САЙТА держим на мажорной версии (не протухают);
// README не трогаем этим правилом — там pinned-пример с точной версией.
const cdnMajorReplacement = [
  new RegExp(`npm/${meta.npmPackage}@\\d+(?:\\.\\d+\\.\\d+)?/`, 'g'),
  `npm/${meta.npmPackage}@${major}/`,
];

const commonVersionReplacements = [
  [/v\d+\.\d+\.\d+/g, `v${version}`],
  [/njx-css-ui@\d+\.\d+\.\d+/g, `${meta.npmPackage}@${version}`],
  [new RegExp(`${meta.npmPackage}@\\d+\\.\\d+\\.\\d+`, 'g'), `${meta.npmPackage}@${version}`],
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
    file: 'src/components/PagesTopbar.astro',
    replacements: [cdnMajorReplacement, ...commonVersionReplacements],
  },
  {
    file: 'src/pages/index.astro',
    replacements: [cdnMajorReplacement, ...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/pages/overview.astro',
    replacements: [cdnMajorReplacement, ...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/pages/quickstart.astro',
    replacements: [cdnMajorReplacement, ...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/pages/documentation.astro',
    replacements: [cdnMajorReplacement, ...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/pages/classless-components.astro',
    replacements: [cdnMajorReplacement, ...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/pages/demo.astro',
    replacements: [cdnMajorReplacement, ...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/components/njx-sections/Carousel.astro',
    replacements: [cdnMajorReplacement, ...commonVersionReplacements, ...commonSizeReplacements],
  },
  {
    file: 'src/components/DownloadModal.astro',
    replacements: [cdnMajorReplacement, ...commonVersionReplacements],
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
