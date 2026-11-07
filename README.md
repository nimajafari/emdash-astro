# EmDash SEO Demo

A demo site and technical SEO test of [EmDash](https://emdashcms.com/), an open source CMS built on Astro.

The site, Crawl Notes, publishes short technical SEO guides and includes test cases for drafts and redirects. It runs locally with Node.js and SQLite, so it needs no cloud account.

## Test results

EmDash has strong SEO foundations, but the default Blog template needed fixes before launch. Redirects, sitemaps, robots.txt and draft handling all worked well.

Fixing production image optimization gave the largest measured improvement. This table compares the same EmDash site with and without that fix. No other CMS was tested.

| Page | LCP: default template | LCP: with image fix | Page weight: default template | Page weight: with image fix |
| --- | --- | --- | --- | --- |
| Home | 3.1 s | 2.3 s | 1,063 KiB | 423 KiB |
| Article | 5.0 s | 3.0 s | 924 KiB | 411 KiB |

These are Lighthouse mobile results from a local production build, so they don't predict live speed.

Read the [full test report](emdash-seo-test-results.md) for all findings, remaining limits and what wasn't tested.

## Run it yourself

Follow the [setup guide](SETUP.md) to create your own copy. You need Node.js 22.23.4 or later, pnpm and GitHub CLI.

Once it's running, the site is usually at `http://localhost:4321` and the admin at `http://localhost:4321/_emdash/admin`.

## What's in this repo

| Path | Contents |
| --- | --- |
| [`seo-demo/`](seo-demo/) | The EmDash site |
| [`seo-demo/seed/seed.json`](seo-demo/seed/seed.json) | Demo content and redirect rules |
| [`emdash-seo-test-results.md`](emdash-seo-test-results.md) | The technical SEO test report |
| [`SETUP.md`](SETUP.md) | Step-by-step setup guide |

## Changes from the default template

- Enabled production image optimization and added `sharp`
- Added default canonicals to home, listing, category and tag pages
- Added `noindex, follow` to search pages
- Added the author to article metadata and structured data
- Made page titles follow the Title Separator setting

## Before deploying

This demo is set up for local use. Before putting a copy online:

1. Add your live domain to `image.domains` in [`astro.config.mjs`](seo-demo/astro.config.mjs).
2. Set your Site URL in the EmDash admin.
3. Keep the site out of search results until launch. EmDash 1.4.0 doesn't include the staging protection described in its documentation.

## Versions tested

EmDash 1.4.0 and Astro 7.4.7, tested on November 6, 2026.
