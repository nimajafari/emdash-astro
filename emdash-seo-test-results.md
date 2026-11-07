# EmDash CMS: Technical SEO Test Results

Tested November 6, 2026 on EmDash 1.4.0, using the Blog template with Node.js and SQLite on a local machine.

## Verdict

EmDash has strong SEO foundations, but it isn't ready to launch straight from the default template. Redirects, sitemaps, robots.txt and draft handling all worked well. The default template needed fixes in 6 files, mostly small, and adding one package.

It suits new, content-led sites with developer support. For a large migration, test your own content first, because the WordPress import and Cloudflare hosting weren't part of this test.

**Biggest launch risk:** version 1.4.0 can be indexed as soon as it's deployed. The documentation describes automatic staging protection, but that feature isn't in this release.

## What worked

| Area | Result |
| --- | --- |
| Article canonicals | Stayed correct with a trailing slash or tracking parameters |
| SEO fields per page | Custom title, description and canonical all appeared on the page |
| Hide from search engines | Added a noindex tag and removed the page from the sitemap |
| URL changes | Changing a published URL created a 301 automatically |
| Redirect chains | After two URL changes, both old URLs pointed directly to the final URL |
| Redirect rules | Exact and catch-all rules worked, and so did 410 responses |
| 404 log | Recorded missing URLs and how often each was requested |
| Drafts and scheduled posts | Returned 404 and stayed out of the sitemap and RSS feed |
| Unpublished pages | Returned 404 and left the sitemap |
| robots.txt and sitemap | Generated automatically |
| Host header spoofing | Canonicals, sitemap and robots.txt kept the configured site URL |
| Page content | Present in the server HTML, with one H1 per page tested |
| Lighthouse | SEO 100, Accessibility 100 and layout shift 0 on both pages tested |

## What needed fixing

These gaps were in the default Blog template. All of them are fixed in the demo site.

| Gap | Why it matters | Fix |
| --- | --- | --- |
| Images weren't optimized in production | Pages loaded full-size JPEGs, slowing mobile load times | Allow the site's domain for image processing and install `sharp` |
| No canonical on home, listing, category or tag pages | Parameter and trailing-slash versions had nothing pointing to the preferred URL | Add a default self-referencing canonical |
| Search result pages could be indexed | Could create a large number of low-value URLs | Add `noindex, follow` |
| No author in article schema | The byline was visible but missing from structured data | Pass the byline to the page metadata |
| Title Separator setting was ignored | Titles mixed `\|` and `—` across page types | Use the setting in all templates |

The image problem appeared only in the production build, because development mode optimized images correctly. Audit a production build of any EmDash site, not just a development preview.

## Performance

Fixing image optimization cut mobile load time (LCP) by 26% on the home page and 40% on the article page. Page weight fell by more than half on both.

| Page | LCP before | LCP after | Page weight before | Page weight after | Performance before | Performance after |
| --- | --- | --- | --- | --- | --- | --- |
| Home | 3.1 s | 2.3 s | 1,063 KiB | 423 KiB | 94 | 98 |
| Article | 5.0 s | 3.0 s | 924 KiB | 411 KiB | 80 | 93 |

These are Lighthouse 12 mobile results, using the median of three runs on identical content. They come from a local production build, so use them to compare the two versions, not to predict live speed. The article page's 3.0 s LCP is still above Google's 2.5 s "good" threshold.

## Remaining limits

These aren't fixed in the demo, so plan for them on a real project.

| Limit | What to do |
| --- | --- |
| No staging protection in 1.4.0 | Protect pre-launch sites with a password or noindex until a release includes staging |
| Sitemap covers content entries only, not the homepage, categories or tags | Build a custom sitemap if those pages matter |
| Featured images aren't added to the sitemap | Set an image in each page's SEO panel to include it |
| Seed files can't carry SEO field values | Set them through the admin or API after import |
| Hiding a page always applies `noindex, nofollow` | It also stays in the RSS feed and on listing pages, so remove it there if needed |
| URL changes don't update links inside content | Update internal links so they don't rely on redirects |
| Trailing-slash URLs return 200 instead of redirecting | Canonicals now cover this, but a redirect would be cleaner |
| An invalid pagination URL returns 200 with "No more posts" | Return a 404 from the template |
| The Node server sends no compression or cache headers | Put a CDN or reverse proxy in front of it |
| No default favicon, and pages have no automatic meta description | Add both during setup |

The "Disallow AI training" setting adds a `Content-Signal` line to robots.txt. Lighthouse reports this line as an unknown directive, and the SEO score dropped to about 92 in testing with the setting on. That reflects Lighthouse not recognizing the line, not a crawl problem.

## Not tested

- WordPress migration, including Yoast and Rank Math data
- Cloudflare hosting
- Live indexing, Search Console data and real-user Core Web Vitals
- Multilingual sites and hreflang
- Sitemaps over 2,000 entries
- Plugins
- Day-to-day editing in the admin interface

## Sources

- [EmDash website](https://emdashcms.com/)
- [EmDash SEO documentation](https://docs.emdashcms.com/guides/seo/)
- [Staging feature pull request #3716](https://github.com/emdash-cms/emdash/pull/3716), merged November 5, 2026, after version 1.4.0 was published on October 29, 2026
- [Google: Core Web Vitals thresholds](https://web.dev/articles/vitals)
