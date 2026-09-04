# Final launch checklist

## Content and authority

- [ ] Brendan approves every staging page at desktop and mobile widths.
- [ ] Ownership and confidentiality language receives final business or legal review.
- [ ] No client logo, result, testimonial, case study, screenshot, or funder relationship is added without approval.
- [ ] Registration number and expiration are checked against the current certificate.
- [ ] Brendan confirms permission to display the Elwyn, Emmaus Home, and Bloom logos in the "Clients and partners" section on Home.
- [ ] Optional: request a dark-on-transparent Bloom logo if a uniform light logo strip is preferred (the supplied file is white artwork, shown on a dark teal chip).
- [ ] Client decision: keep the contact form at eight required fields (as approved) or make "Organization website" and "Current grant capacity" optional to reduce friction. Recommendation from the web team: make them optional.

## Forms and privacy

- [ ] One approved real FormSubmit test reaches `info@npograntwriting.com`. The first submission to a new FormSubmit address triggers an activation email that must be confirmed before delivery works; the form now treats any response without `success: "true"` as a failure so inquiries are not silently lost.
- [ ] Spam-folder and reply behavior are checked.
- [ ] NPO’s inquiry-retention practice matches the Privacy page.
- [ ] Calendly link reaches the intended scheduling page.
- [ ] No analytics, chat, embed, or cookie-producing service has been added without review.

## Technical release

- [ ] Exact release commit is recorded.
- [ ] `pnpm build` passes.
- [ ] static content QA passes.
- [ ] Playwright passes at 375, 768, and 1440 widths.
- [ ] axe has no critical or serious violations.
- [ ] Lighthouse meets 90/95/95/95 targets.
- [ ] internal and external links are checked.
- [ ] redirects return permanent responses in production.
- [ ] sitemap and robots file are reachable.
- [ ] canonical and social metadata use the public domain.
- [ ] `privacy.html` "Last updated" date and `public/sitemap.xml` `lastmod` values are set to the launch date.
- [ ] Legacy URL redirects verified on the preview: `/process.html`, `/services`, `/public/images/new quill logo 1.png` (old social image), and `/public/...` catch-all.
- [ ] security headers are present.
- [ ] custom 404 returns the intended error status and page.
- [ ] browser console has no errors.

## Deployment and rollback

- [ ] Current production deployment identifier is preserved.
- [ ] Backup branch, commit, tar archive, and hash manifest are accessible.
- [ ] Vercel project and source remote are reconciled.
- [ ] The release source is private or uses a clean public-safe history without the local backup commit’s client assets.
- [ ] DNS, domain, form provider, scheduling provider, analytics, and email destination remain unchanged unless separately approved.
- [ ] Post-launch desktop and mobile screenshots are captured.
- [ ] Rollback owner and trigger are documented.

## Recommendation

Approve production only when every required item above is complete. A private staging approval is not by itself authorization to alter the public site.
