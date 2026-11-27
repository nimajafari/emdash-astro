import { defineMiddleware } from "astro:middleware";

const EDGE_SLASHES = /^\/+|\/+$/g;

/**
 * Redirect trailing-slash URLs to the slashless version.
 *
 * Astro's `trailingSlash: "never"` would do this too, but it runs before
 * EmDash's redirect rules, so an old URL like `/about-us/` would take two
 * hops. EmDash's middleware runs first, so this only sees requests that no
 * redirect rule matched. Internal routes (`/_emdash`, `/_astro`, `/_image`)
 * are left alone.
 */
export const onRequest = defineMiddleware((context, next) => {
	const { pathname, search } = context.url;
	if (pathname === "/" || !pathname.endsWith("/") || pathname.startsWith("/_")) {
		return next();
	}

	// Collapse leading slashes as well, so `//evil.example/` can't become a
	// protocol-relative redirect to another host.
	const target = `/${pathname.replace(EDGE_SLASHES, "")}${search}`;
	const method = context.request.method;
	return new Response(null, {
		status: method === "GET" || method === "HEAD" ? 301 : 308,
		headers: { Location: target },
	});
});
