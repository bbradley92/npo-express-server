# NPO Grant Writing website handoff

This repository contains the developed design direction and working source for a streamlined redesign of [npograntwriting.com](https://www.npograntwriting.com). The public architecture has four primary pages:

1. Home
2. Grant Growth System
3. About
4. Contact

Privacy, Thank You, 404, and legacy redirects remain as utility routes. Services are summarized on Home. The full GGS method lives on the Grant Growth System page. The site has not been published to production.

## Local setup

Requirements:

- Node.js 20 or newer
- pnpm 10 or newer
- Google Chrome for the browser and Lighthouse tests

Install and start the local site:

```bash
pnpm install
pnpm dev
```

Open `http://127.0.0.1:5173/`. To use the test port, run:

```bash
pnpm dev -- --port 4173
```

## Content editing

Shared business information and page metadata live in `site.config.mjs`. Update contact information, registration details, navigation, Calendly, form endpoints, metadata, the six GGS stages, the three services, the client and partner logos, and the Home FAQ there. Structured data (organization, FAQ, breadcrumbs, and the GGS stage list) is generated from the same config in `vite.config.mjs`, so the visible copy and the schema never drift.

Shared site elements live in `partials/`:

- `head.html`: metadata, social cards, and shared organization schema
- `header.html`: navigation and mobile menu
- `footer.html`: contact, registration, disclaimer, copyright, and utility links
- `final-cta.html`: the shared Grant Growth Review call to action

Page content lives in the root HTML files. Global behavior and styles live in `src/main.js` and `src/styles.css`.

## Updating public facts and assets

- Registration and contact information: `site.config.mjs`
- NPO logo: `public/images/npo-logo.png`
- Quill icon: `public/images/npo-quill.png`
- Social card: `public/images/npo-social-card.png` and `.svg`
- Team photographs: `public/images/team/`
- Client and partner logos: `public/images/clients/` (kebab-case file names; add each to `site.clients` with its exact pixel width and height and a `tone` of `light` or `dark` for the chip background)

Replace an image with the same optimized dimensions when practical. Keep descriptive `alt`, `width`, and `height` attributes on every content image. Approved redacted GGS screenshots may be added later, but the current interface diagrams are honest HTML and CSS schematics rather than simulated client dashboards.

## Build and test

```bash
pnpm build
pnpm test:content
pnpm test:browser
pnpm test:lighthouse
```

The browser suite runs at 375, 768, and 1440 pixel widths. It verifies routes, navigation, calls to action, images, form validation, mocked success and failure behavior, accessibility, reduced motion, the legacy process route, and responsive screenshots.

The Lighthouse script expects the local site at `http://127.0.0.1:4173/`. Set `LIGHTHOUSE_URL` to audit a different authorized staging URL.

## Deployment

The receiving web team may implement this design in its preferred hosting environment, but it should preserve the four-page architecture, visible copy, accessibility behavior, redirects, metadata, privacy disclosures, and human-directed GGS positioning. Review `docs/WEBTEAM_HANDOFF.md` and `docs/launch-checklist.md` first. Vercel builds the site with Vite (`vercel.json` sets the framework, build command, and `dist` output). Branch pushes create preview deployments for staging review; production only changes when `main` is updated.

Do not deploy to the public Vercel project until Brendan has approved:

1. the staging pages and responsive screenshots;
2. the ownership language;
3. a real end-to-end FormSubmit delivery test; and
4. the final launch checklist.

Never commit credentials, provider tokens, API keys, or form secrets.
