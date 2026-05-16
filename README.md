# UPI QR Codes

Static browser-based UPI QR Code Generator for [upiqrcodes.com](https://upiqrcodes.com/).

UPI QR Codes is a free online tool for creating UPI payment QR codes and UPI payment links in the browser. It supports payer-entered amount QR codes, fixed amount QR codes, printable shop counter QR cards, invoice payment QR codes, and direct `upi://pay` payment links.

## Live Tools

- [Free UPI QR Code Generator](https://upiqrcodes.com/)
- [Static UPI QR Code Generator](https://upiqrcodes.com/static-upi-qr-code/)
- [UPI QR Code Generator with Amount](https://upiqrcodes.com/upi-qr-code-with-amount/)
- [UPI Payment Link Generator](https://upiqrcodes.com/upi-payment-link-generator/)
- [UPI QR Code for Shop](https://upiqrcodes.com/upi-qr-code-for-shop/)
- [UPI QR Code for Invoice](https://upiqrcodes.com/upi-qr-code-for-invoice/)
- [What is UPI QR Code?](https://upiqrcodes.com/what-is-upi-qr-code/)

## Features

- Generate `upi://pay` payment links from payee name, UPI ID / VPA, optional amount, and note.
- Create static UPI QR codes where the payer enters the amount.
- Create fixed amount UPI QR codes for invoices, fees, bookings, and order totals.
- Download QR cards or QR-only files from the main generator.
- Browser-based generation; entered UPI details are not stored by the site.

Current status: launched on Cloudflare Pages and connected to GitHub for automatic deployment from `main`.

## Files

- `index.html` - homepage generator and SEO landing page.
- `static-upi-qr-code/`, `upi-qr-code-with-amount/`, `upi-payment-link-generator/`, `upi-qr-code-for-shop/`, `upi-qr-code-for-invoice/`, and `what-is-upi-qr-code/` - long-tail tool and guide pages.
- `about.html`, `privacy.html`, and `terms.html` - public trust and policy pages.
- `assets/brand/` - site logo assets.
- `assets/logos/` - local UPI app logos and canvas-safe logo data.
- `sitemap.xml` - production SEO discovery file.
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
