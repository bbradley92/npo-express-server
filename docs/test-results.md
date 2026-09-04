# Staging test results

Tested: August 31, 2026

## Build and static content

- Vite production build: PASS
- Built HTML routes: 8, including four primary pages and four utility or redirect routes
- Unique page titles: 7, excluding the redirect fallback
- Internal links and assets: PASS
- Required image dimensions and alternative text: PASS
- JSON-LD parsing: PASS
- Sitemap and canonical checks: PASS
- Prohibited copy check: PASS
- Manual confidential client-name and asset scan of the active build: PASS
- Legacy sample PDF and client assets absent from active public build: PASS

## Responsive browser tests

Playwright result: **26 passed, 4 intentionally skipped, 0 failed**.

Viewports:

- 375 × 812 mobile
- 768 × 1024 tablet
- 1440 × 1000 desktop

Verified:

- all required routes render with one visible H1 and no browser-console errors;
- homepage headline, GGS positioning, and calls to action;
- keyboard-accessible desktop and mobile navigation;
- approved Brendan and Heidi images load at their intended natural dimensions;
- form validation;
- mocked FormSubmit success flow and branded confirmation page;
- mocked FormSubmit failure flow and safe retry state;
- four-item primary navigation plus the Grant Growth Review call to action;
- critical and serious axe violations across the four primary pages;
- reduced-motion behavior;
- dynamic copyright year;
- legacy process fallback;
- full-page screenshots at all three viewports.

The four skips are intentional: the two detailed form scenarios run once on desktop rather than repeating on both tablet and mobile. Responsive form structure is still covered by route, accessibility, and page rendering checks.

## Accessibility

- Axe critical violations: 0
- Axe serious violations: 0
- Lighthouse accessibility: 100
- Required manual considerations represented in the build: keyboard navigation, visible focus, skip link, semantic landmarks, native form labels, descriptive links, alt text, responsive menu state, reduced motion, and sufficient contrast.

Automated tests do not replace assistive-technology user testing, but no known WCAG 2.2 AA blocker remains in staging.

## Lighthouse

| Category | Target | Result |
|---|---:|---:|
| Performance | 90 | 93 |
| Accessibility | 95 | 100 |
| Best Practices | 95 | 100 |
| SEO | 95 | 100 |

Selected homepage lab metrics:

- First Contentful Paint: 2.3 seconds
- Largest Contentful Paint: 2.7 seconds
- Total Blocking Time: 0 milliseconds
- Cumulative Layout Shift: 0

Full result: `artifacts/lighthouse/home.json`.

## Form testing

PASS:

- required-field browser validation;
- representative field completion;
- FormSubmit AJAX payload path;
- mocked 200 response;
- redirect to the branded Thank You page;
- mocked 503 response;
- visible, focusable failure message;
- restored submit control;
- privacy and sensitive-data warning;
- honeypot field.

Not performed:

- a real provider submission and inbox-delivery confirmation.

That final test would send an external inquiry. It should be run once with Brendan’s approval immediately before production launch, followed by receipt verification and deletion or retention according to NPO’s practice.

## Screenshots

Before:

- `artifacts/screenshots/production-before-home-desktop-1440.png`
- `artifacts/screenshots/production-before-home-mobile-375.png`

After:

- `artifacts/screenshots/staging-home-desktop-1440.png`
- `artifacts/screenshots/staging-home-tablet-768.png`
- `artifacts/screenshots/staging-home-mobile-375.png`
- `artifacts/screenshots/staging-about-desktop-1440.png`
- `artifacts/screenshots/staging-about-tablet-768.png`
- `artifacts/screenshots/staging-about-mobile-375.png`
