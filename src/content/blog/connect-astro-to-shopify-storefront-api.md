---
title: "Connect an Astro site to the Shopify Storefront API"
description: "A practical guide to wiring a static Astro storefront to Shopify: get a Storefront API token, fetch products with GraphQL, and hand off to Shopify's hosted checkout."
pubDate: 2026-09-09
tags: ["astro", "shopify", "storefront-api", "tutorial"]
keyword: "connect astro to shopify storefront api"
author: "njX UI"
---

Astro builds static HTML, and Shopify's **Storefront API** is a public, read-oriented
GraphQL API designed to be called from the browser. Together they let you build a fully
custom storefront where **your** design serves the catalog and **Shopify** owns the
checkout, payments and fulfilment. No server of your own.

Here's the whole path.

## 1. Create a Storefront API token

In your Shopify admin:

1. **Settings → Apps and sales channels → Develop apps → Create an app.**
2. Open **Configuration → Storefront API** and enable the scopes you need:
   read products, read collections, unauthenticated checkout, and customer (if you want
   accounts).
3. **Install the app**, then copy the **Storefront API access token**.

This token is a **public client token** — it's safe in the browser. Never ship an
**Admin** API key in a static site; that one is secret.

## 2. Put it in the environment

```bash
# .env
COMMERCE_PROVIDER=shopify
PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_storefront_api_access_token
```

The `PUBLIC_` prefix tells Astro/Vite it's allowed in client code.

## 3. Query products with GraphQL

A minimal fetch against the Storefront API endpoint:

```js
const endpoint = `https://${import.meta.env.PUBLIC_SHOPIFY_DOMAIN}/api/2024-10/graphql.json`;

async function shopify(query, variables = {}) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const { data, errors } = await res.json();
  if (errors) throw new Error(JSON.stringify(errors));
  return data;
}

const PRODUCTS = `
  query Products($first: Int!) {
    products(first: $first) {
      nodes {
        handle
        title
        featuredImage { url altText }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  }
`;

const { products } = await shopify(PRODUCTS, { first: 24 });
```

Run these queries in Astro frontmatter (at build time) to pre-render product pages, or
client-side for anything that needs to be live.

## 4. Hand off to checkout

You don't rebuild checkout — you send the customer to Shopify's hosted one. Create a
cart and redirect to its `checkoutUrl`:

```js
const CART_CREATE = `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
    }
  }
`;

const { cartCreate } = await shopify(CART_CREATE, {
  lines: [{ merchandiseId: variantGid, quantity: 1 }],
});
window.location.href = cartCreate.cart.checkoutUrl;
```

Payments, taxes, discounts and fulfilment all stay inside Shopify.

## 5. Keep it swappable

Don't scatter `fetch` calls across your pages. Put them behind a small **provider
interface** — `listProducts`, `getProduct`, `listCollections`, `checkoutUrl` — and
select the implementation from one env var. That's exactly how the
[njX Astro themes](/themes) are built: a `mock` provider for zero-config demos and a
`shopify` provider for production, with pages importing neither directly. Switching
backends becomes a one-line change.

## Common gotchas

- **Products don't appear** → check the three env vars, confirm the app is installed
  with Storefront scopes, and rebuild (static build reads env at build time).
- **Wrong API version** → the date in the endpoint (`2024-10`) is the API version; keep
  it current.
- **Sizes/colors missing** → map your product options to size/color in Shopify.

Want this already wired? Every theme in the
[free Astro + Shopify lineup](/blog/free-astro-shopify-ecommerce-themes) ships with the
provider layer done — clone, add two env vars, deploy.
