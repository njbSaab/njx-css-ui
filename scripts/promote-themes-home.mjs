// Promote the themes catalogue to the site root for the standalone themes.njxui.dev deploy.
//
// njx-css-ui is one Astro project: index.astro => / (the CSS library homepage),
// themes.astro => /themes/ (the ecommerce theme catalogue). The library lives on
// njxui.dev; the catalogue is its own site on themes.njxui.dev where it must be the
// HOMEPAGE. This step runs after `PUBLIC_STORE_MODE=1 astro build` (see the
// `build:store` npm script) and copies the built catalogue to dist/index.html,
// fixing its self-referential canonical/og:url from /themes/ to the site root.
//
// The default `build` (what deploys to njxui.dev) never runs this, so njxui.dev is
// unaffected. Deploy the result only to the `njx-themes` Pages project.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const CATALOGUE = 'dist/themes/index.html';
if (!existsSync(CATALOGUE)) {
  console.error('[promote-themes-home] dist/themes/index.html not found — build the store variant first: PUBLIC_STORE_MODE=1 npm run build');
  process.exit(1);
}

let html = readFileSync(CATALOGUE, 'utf8');
// Now served at /, so the catalogue's own canonical + og:url must point to the root.
html = html.split('https://themes.njxui.dev/themes/"').join('https://themes.njxui.dev/"');
writeFileSync('dist/index.html', html);
console.log('[promote-themes-home] catalogue promoted to dist/index.html (canonical/og:url -> site root).');
