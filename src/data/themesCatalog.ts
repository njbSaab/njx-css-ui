/**
 * Single source of truth for the themes storefront:
 * /themes (grid) and /themes/[slug] (product pages).
 */

export type ThemeProduct = {
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  longDesc: string;
  tags: string[];
  demo: string;
  repo: string;
  img: string;
  category: 'ecommerce' | 'site';
  liteFeatures: string[];
  pro?: {
    single: number;
    unlimited: number;
    demo?: string;
    ready: boolean;
    features: string[];
  };
};

export const SERVICES = [
  { name: 'Setup service', price: '$99–149', desc: 'We connect the theme to your live Shopify store: catalog, tokens, checkout, deploy to Cloudflare Pages. Ready in one working day.' },
  { name: 'Branding package', price: '$199–249', desc: 'Your colors, fonts, logo and copy applied through the design tokens and constants — a store that looks like yours, not a template.' },
  { name: 'Custom work', price: 'from $80/hour', desc: 'New sections, integrations, features beyond the theme — scoped and quoted from your brief before any work starts.' },
];

export const ECOMMERCE: ThemeProduct[] = [
  {
    slug: 'dark-lux',
    name: 'astro-njx-dark-lux',
    tagline: 'Monochrome dark luxury',
    desc: 'Hairline borders, zero radius, overlay search, quick-view popups, cart with saved-for-later. A full design system for brands that sell in black and white.',
    longDesc: 'A complete storefront in a pure-monochrome design system: dark catalogs meet white content pages, wide-tracked type, hairline borders that light up on hover. Made for coffee roasters, bars, beauty studios and any brand with an editorial-luxury voice. Runs on bundled mock data out of the box; one env var connects your live Shopify catalog with hosted checkout.',
    tags: ['Ecommerce', 'Shopify-ready', 'Tailwind v4'],
    demo: 'https://astro-njx-dark-lux.pages.dev',
    repo: 'https://github.com/njbSaab/astro-njx-dark-lux',
    img: '/img/themes/dark-lux.jpg',
    category: 'ecommerce',
    liteFeatures: [
      'Full design system: monochrome palette, hairline interactive borders, uppercase tracking type',
      'Quick-view popups + real product pages for SEO',
      'Overlay search with live results',
      'Persistent cart with saved-for-later inside it',
      'Collections with tag filters and counts',
      'Touch-aware product cards (IntersectionObserver)',
      'Light/dark as composition — token remap classes',
      '20+ static pages · zero client framework',
      'Mock JSON or Shopify Storefront API — one env var',
    ],
    pro: {
      single: 79,
      unlimited: 139,
      demo: 'https://astro-njx-dark-lux-pro.pages.dev',
      ready: true,
      features: [
        '48-SKU demo catalog with brands (vendors)',
        'Reviews & ratings + schema.org stars in Google',
        'Reviews page with Questions & Answers tabs',
        'Customer account: orders with progress tracking, favorites, compare, addresses CRUD, profile, settings',
        'Mock checkout flow: customer form, delivery methods, payment options',
        'Advanced catalog: price slider with inputs, brand/options/rating dropdown filters, grid/list views, per-page, load more',
        'Product comparison (one category, floating access, compare page)',
        'Cart extras: promo code → Shopify discountCodes, upsell shelf, back-in-stock form',
        'Journal blog on content collections: tag filters, post ratings, comments',
        'Search v2: category chips, popular queries, trending products',
        'Google-rating social proof strip + store map block',
        'SEO pack: canonical, OG per page, Organization/Product/Breadcrumb/Article JSON-LD, GA4 ecommerce events',
      ],
    },
  },
  {
    slug: 'verdant',
    name: 'astro-njx-verdant',
    tagline: 'Botanical apothecary',
    desc: 'Deep forest green with a brass accent and a clean white light mode. Made for skincare, spa and any brand with a garden-first voice.',
    longDesc: 'A botanical storefront: deep greens, brass accents, staggered category tiles over a full-bleed hero and a clean white light mode. Built for skincare brands, apothecaries, spas and florists. Same provider-agnostic engine: mock JSON out of the box, live Shopify with one env var.',
    tags: ['Ecommerce', 'Shopify-ready', 'Tailwind v4'],
    demo: 'https://astro-njx-verdant.pages.dev',
    repo: 'https://github.com/njbSaab/astro-njx-verdant',
    img: '/img/themes/verdant.jpg',
    category: 'ecommerce',
    liteFeatures: [
      'Deep-green design system with brass accent + white light mode',
      'Staggered category tiles over the hero',
      'Persistent cart drawer with quick-add',
      'Favorites with badge counter · instant search',
      'Collections with filters and sorting',
      '28+ static pages · zero client framework',
      'Mock JSON or Shopify Storefront API — one env var',
    ],
    pro: { single: 69, unlimited: 119, ready: false, features: [
      'Everything from dark-lux Pro, ported to the botanical system',
      'Reviews & ratings + schema.org', 'Customer account with order tracking',
      'Advanced catalog filters · comparison · checkout flow', 'Journal blog · SEO pack · GA4 events',
    ] },
  },
  {
    slug: 'boutique',
    name: 'astro-njx-boutique',
    tagline: 'Editorial fashion',
    desc: 'Serif display type, full-bleed imagery, 3:4 photography and an oxblood accent. An editorial storefront for ateliers and small fashion brands.',
    longDesc: 'An editorial boutique: serif display typography (Fraunces), full-bleed lookbook imagery, 3:4 product photography, oxblood accents. For ateliers and small fashion brands that sell a point of view. Mock data out of the box, Shopify with one env var.',
    tags: ['Ecommerce', 'Shopify-ready', 'Tailwind v4'],
    demo: 'https://astro-njx-boutique.pages.dev',
    repo: 'https://github.com/njbSaab/astro-njx-boutique',
    img: '/img/themes/boutique.jpg',
    category: 'ecommerce',
    liteFeatures: [
      'Editorial system: serif display type, hairlines, full-bleed imagery',
      'Hero slider with lookbook frames',
      'Bag drawer with quick-add · favorites · instant search',
      'Catalog with tag filters (piece counts) and sorting',
      'Product pages: sizes, sticky 3:4 gallery, lightbox, trust details',
      '20 static pages · light & dark theme',
      'Mock JSON or Shopify Storefront API — one env var',
    ],
    pro: { single: 59, unlimited: 99, ready: false, features: [
      'Reviews & ratings + schema.org', 'Customer account with order tracking',
      'Advanced catalog filters · comparison · checkout flow', 'Lookbook pages · SEO pack · GA4 events',
    ] },
  },
  {
    slug: 'store',
    name: 'astro-njx-store',
    tagline: 'Warm paper & pine',
    desc: 'The original: 18 static pages, cart with hosted checkout, filters, search, favorites and dark mode. Friendly, versatile, ready for any catalog.',
    longDesc: 'The original njX storefront: warm paper-and-pine palette, friendly rounded cards, a versatile layout that fits almost any catalog. The engine that powers the whole line: provider-agnostic commerce layer, all copy in two constants files, design tokens in one block.',
    tags: ['Ecommerce', 'Shopify-ready', 'Tailwind v4'],
    demo: 'https://astro-njx-store.pages.dev',
    repo: 'https://github.com/njbSaab/astro-njx-store',
    img: '/img/themes/store.jpg',
    category: 'ecommerce',
    liteFeatures: [
      'Warm, versatile design — fits any product category',
      'Cart drawer with hosted Shopify checkout',
      'Tag filters, sorting, instant search ("/" to open)',
      'Favorites with a dedicated page',
      'Light & dark theme without reload flash',
      '18 static pages · zero client framework',
      'Mock JSON or Shopify Storefront API — one env var',
    ],
    pro: { single: 69, unlimited: 119, ready: false, features: [
      'Reviews & ratings + schema.org', 'Customer account with order tracking',
      'Advanced catalog: pagination, price slider, swatches', 'Comparison · checkout flow · SEO pack · GA4 events',
    ] },
  },
];

export const SITES: ThemeProduct[] = [
  {
    slug: 'saas',
    name: 'astro-njx-saas',
    tagline: 'Product landing',
    desc: 'Glow hero, reviews slider, 9 runtime themes — a complete product landing built 100% with njX UI and Alpine.js.',
    longDesc: 'A complete product landing built 100% with njX UI — one CSS import, nine runtime color themes, Alpine.js interactivity in the markup. Rebrand in a single config file.',
    tags: ['Landing', 'njX UI', 'Alpine.js'],
    demo: 'https://astro-njx-saas.pages.dev',
    repo: 'https://github.com/njbSaab/astro-njx-saas',
    img: '/img/themes/saas.jpg',
    category: 'site',
    liteFeatures: ['Glow hero with copy-to-clipboard pill', 'Reviews slider with autoplay and touch swipe', '9 runtime themes', 'Config-file rebranding'],
  },
  {
    slug: 'portfolio',
    name: 'astro-njx-portfolio',
    tagline: 'Personal portfolio',
    desc: 'Filterable project grid, glass stat card, gradient CTA — a personal site you rebrand in one config file.',
    longDesc: 'A personal portfolio on njX UI: filterable project grid, glass stat card, gradient contact CTA. One config file to make it yours.',
    tags: ['Portfolio', 'njX UI', 'Alpine.js'],
    demo: 'https://astro-njx-portfolio.pages.dev',
    repo: 'https://github.com/njbSaab/astro-njx-portfolio',
    img: '/img/themes/portfolio.jpg',
    category: 'site',
    liteFeatures: ['Filterable project grid', 'Glass stat card', 'Gradient CTA', '9 runtime themes'],
  },
  {
    slug: 'launch',
    name: 'astro-njx-launch',
    tagline: 'Launch / waitlist',
    desc: 'Waitlist counter, video modal, testimonial slider and an optimistic signup form — everything a launch page needs.',
    longDesc: 'A launch/waitlist landing on njX UI: waitlist counter badge, video modal, testimonial slider, optimistic signup form with success state.',
    tags: ['Landing', 'njX UI', 'Alpine.js'],
    demo: 'https://astro-njx-launch.pages.dev',
    repo: 'https://github.com/njbSaab/astro-njx-launch',
    img: '/img/themes/launch.jpg',
    category: 'site',
    liteFeatures: ['Waitlist counter + video modal', 'Testimonial slider', 'Optimistic signup form', '9 runtime themes'],
  },
];

export const ALL_THEMES = [...ECOMMERCE, ...SITES];
