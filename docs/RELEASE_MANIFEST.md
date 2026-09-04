# Release manifest

Prepared: August 31, 2026  
Source branch: `codex/ggs-website-overhaul-staging`  
Source commit: `2c37c363ec12cb9dc676304a1f16f5580494d1d7`

## Architecture

- Four primary pages: Home, Grant Growth System, About, Contact
- Utility routes: Privacy, Thank You, 404, Process redirect
- Services consolidated into the Home page
- Retired staging Services and Insights routes redirected to active content

## Verification

- Production build: PASS
- Static content and internal asset QA: PASS
- Playwright: 26 passed, 4 intentional responsive duplicates skipped, 0 failed
- Automated critical and serious accessibility issues: 0
- Lighthouse: Performance 93, Accessibility 100, Best Practices 100, SEO 100
- Active build client-confidentiality scan: PASS

This archive contains no Git history, credentials, production backups, registration evidence, or client grant records. The `dist/` directory is a compiled reference build; the editable source is included at the archive root.
