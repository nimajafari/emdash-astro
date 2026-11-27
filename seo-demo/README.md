# Crawl Notes

The EmDash site for this repo's technical SEO test. It started from the [EmDash Blog template](https://github.com/emdash-cms/templates/tree/main/blog) and runs on Node.js with SQLite and local file storage.

To run it, follow the [setup guide](../SETUP.md). For what changed from the template and why, see the [repo README](../README.md) and the [test report](../emdash-seo-test-results.md).

## Pages

| Page | Route |
|---|---|
| Homepage | `/` |
| All posts | `/posts` |
| Single post | `/posts/:slug` |
| Category archive | `/category/:slug` |
| Tag archive | `/tag/:slug` |
| Search | `/search` |
| Static pages | `/pages/:slug` |
| RSS feed | `/rss.xml` |
| Default favicon | `/favicon.svg` |
| 404 | fallback |

EmDash generates `/sitemap.xml` and `/robots.txt`, and serves the admin at `/_emdash/admin`.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Run the production build |
| `pnpm typecheck` | Type-check the project with `astro check` |

Audit a production build, not just `pnpm dev`. Image optimization only failed in production during testing.

## Where things live

| Path | Contents |
|---|---|
| `seed/seed.json` | Demo content, menus and redirect rules |
| `src/layouts/Base.astro` | Head tags, canonicals, favicon fallback, header and footer |
| `src/middleware.ts` | Trailing-slash redirects |
| `src/pages/` | Page routes |
| `src/utils/description.ts` | Meta description fallback from page content |
