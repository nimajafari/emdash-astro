import type { APIRoute } from "astro";
import { getSiteSettings } from "emdash";
import { resolveBlogSiteIdentity } from "../utils/site-identity";

// Default favicon: the header's monogram mark, used until a favicon is
// uploaded in Settings. Base.astro only links it when none is set.
export const GET: APIRoute = async () => {
	const { siteTitle } = resolveBlogSiteIdentity(await getSiteSettings());
	const monogram = ([...siteTitle.trim()][0] ?? "").toUpperCase();
	const escaped = monogram.replace(
		/[&<>"']/g,
		(char) => `&#${char.charCodeAt(0)};`,
	);

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<style>rect{fill:#171717}text{fill:#fff}@media (prefers-color-scheme:dark){rect{fill:#fafafa}text{fill:#0a0a0a}}</style>
<rect width="32" height="32" rx="7"/>
<text x="16" y="16" dy=".35em" text-anchor="middle" font-family="system-ui,-apple-system,'Segoe UI',sans-serif" font-size="19" font-weight="600">${escaped}</text>
</svg>`;

	return new Response(svg, {
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
