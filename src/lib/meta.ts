/** Single source of truth for njX UI library metadata */
import meta from '../data/library-meta.json';

export const LIB_VERSION = meta.version;
export const NPM_PACKAGE = meta.npmPackage;
export const CDN_BASE = `https://cdn.jsdelivr.net/npm/${NPM_PACKAGE}@${LIB_VERSION}/css/`;

/** Sizes: minified on-disk / gzip over the wire */
export const SIZE_FULL           = '308 KB';  // style.min.css (44 KB gzip)
export const SIZE_FULL_GZIP      = '44 KB';
export const SIZE_CLASSLESS      = '48 KB';   // classless.min.css
export const SIZE_CLASSLESS_SRC  = '~62 KB';  // classless.css (unminified _base + _native)
export const SIZE_JS             = '14 KB';   // njx.js
