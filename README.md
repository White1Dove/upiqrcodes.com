# UPI QR Codes

Static browser-based UPI QR Codes Generator for `https://upiqrcodes.com/`.

Current status: launched on Cloudflare Pages and connected to GitHub for automatic deployment from `main`.

## Files

- `index.html` - the single-page generator.
- `privacy.html` and `terms.html` - public policy pages.
- `assets/brand/` - site logo assets.
- `assets/logos/` - local UPI app logos and canvas-safe logo data.
- `robots.txt` and `sitemap.xml` - production SEO discovery files.
- `_redirects` and `_headers` - Cloudflare Pages production routing and headers.
- `PROJECT_CONTEXT.md` - local working context for future AI/dev sessions. This file is intentionally not committed.

## Deploy

This site is designed for Cloudflare Pages as a static project. There is no build step; deploy the repository root as the output directory.

Production host: `https://upiqrcodes.com/`

GitHub repository: `https://github.com/White1Dove/upiqrcodes.com`

Cloudflare Pages project: `upiqrcodes-com`

Build settings:

- Framework preset: None
- Build command: empty
- Build output directory: repository root `/`

Pushing to `main` deploys automatically through Cloudflare Pages. If GitHub push fails with an HTTP/2 framing error, use:

```sh
GIT_TERMINAL_PROMPT=0 git -c http.version=HTTP/1.1 push origin main
```

## Production SEO And Analytics

- Canonical URL: `https://upiqrcodes.com/`
- `www` host redirects to apex with a Cloudflare Bulk Redirects 301 rule.
- Google Search Console is verified for the `upiqrcodes.com` Domain property.
- Submitted sitemap: `https://upiqrcodes.com/sitemap.xml`
- GA4 Measurement ID: `G-PX4DBQMEJ7`
