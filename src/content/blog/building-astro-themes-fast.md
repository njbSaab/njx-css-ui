---
title: "What I learned shipping a lineup of Astro storefront themes"
description: "Notes from building and selling a set of static Astro + Shopify themes: the provider layer, delivery over Paddle, and the small esbuild gotchas that cost real time."
pubDate: 2026-09-10
tags: ["astro", "build-in-public", "themes", "notes"]
keyword: "building astro themes"
author: "njX UI"
---

A short build-in-public note on shipping the njX Astro storefront lineup — the
decisions that held up and the ones that bit.

## One engine, many storefronts

Every theme sits on the same spine: **Astro 5 + Tailwind CSS v4**, static output, a
provider-agnostic commerce layer, and nanostores for the little bit of client state
(cart, wishlist, compare). That meant a new theme is mostly **art direction** — type,
color tokens, imagery, section rhythm — not new plumbing. Reusing the engine is what
made a whole lineup feasible instead of one theme at a time.

The payoff of the **provider layer** (`mock` vs `shopify` behind one interface) shows up
twice: demos run with zero config on bundled data, and going live is a two-variable
change. Pages import the interface, never a concrete backend.

## Delivery: static site, real product

Selling a downloadable theme needs three moving parts that a static site doesn't have on
its own:

- **Checkout** — an overlay checkout that, on completion, redirects to a thank-you page
  with the transaction id.
- **A tiny worker** — verifies the transaction server-side, maps the purchased price to
  the right zip, and serves a signed download.
- **Object storage** — the built theme zips (with the secret `.env` excluded — check
  this twice).

None of it is heavy, but the **verify-before-serve** step is the part you can't skip: the
thank-you URL alone should never be enough to download the file.

## The gotchas that actually cost time

- **Non-ASCII in `.astro` frontmatter comments.** A `★` or `…` inside a `//` comment in
  the component script broke the build with a misleading *"Unexpected export"*. esbuild
  parses that frontmatter as TS/JSX. Same class of problem: `new Set<number>()` and a
  bare generic arrow `<T,>` get read as JSX. Fix: keep frontmatter comments ASCII and
  avoid inline generics there.
- **Overlay checkout and redirect params.** Don't assume the payment overlay appends the
  transaction id to your success URL — drive the redirect yourself from the completion
  event so the thank-you page always has what it needs.
- **Secrets in the shipped zip.** A real `.env` with a live token can ride along in a
  package step if you're not explicit. Exclude it and assert it's gone before upload.

## The takeaway

Static-first commerce is a genuinely good place to be in 2026: fast sites, near-free
hosting, and a clean handoff to Shopify for the hard parts. Most of the work is design;
the engineering, once the engine exists, is small and repeatable.

If you want to start from a working engine, the [free Astro + Shopify themes](/blog/free-astro-shopify-ecommerce-themes)
are on GitHub, and the [full lineup](/themes) is here.
