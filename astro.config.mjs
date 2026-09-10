// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  redirects: { '/donate': '/' },
  site: process.env.PUBLIC_STORE_MODE ? 'https://themes.njxui.dev' : 'https://njxui.dev',
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});
