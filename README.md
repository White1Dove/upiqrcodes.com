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
- `PROJECT_CONTEXT.md` - working context for future AI/dev sessions.

## Product Positioning

The target keyword lineage started from `upi qr code generator`, with the current page optimized around `UPI QR Codes Generator`.

This is a browser-based static UPI QR/payment-link generator for Indian payment use cases. It should not be positioned as a generic QR generator, payment gateway, settlement system, or payment-status verification service.

Auxiliary references for future planning:

- Conversation ID: `019dfc81-95b4-7102-a159-0763186f7503`
- Keyword report, for auxiliary reference only: `/Users/liangkaixiang/Documents/Codex/2026-04-29/compress-image-to-50kb/upi-qr-code-generator-hv-analysis.md`

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
