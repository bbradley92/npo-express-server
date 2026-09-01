# NPO Grant Writing website handoff

## Objective

Construct and host a streamlined NPO Grant Writing website centered on the Grant Growth System™. The site should feel like a serious, human-directed grant strategy consultancy, not an autonomous AI product or a generic writing service.

## Primary architecture

The primary navigation and indexed sitemap should contain only:

1. Home
2. Grant Growth System
3. About
4. Contact

Keep Privacy, Thank You, 404, and redirect behavior as utility routes. Privacy should remain linked from the footer and contact form.

## Content placement

- Home contains the core positioning, problem, six-stage overview, funding lanes, human-control distinction, service summaries, client fit, FAQ, and call to action.
- Grant Growth System contains the complete method, qualification framework, risk controls, approval model, submission evidence, portfolio measurement, ownership distinction, and readiness guidance.
- About contains Brendan Bradley and Heidi Roux, their approved photographs, supplied biographies, and the reason GGS was developed.
- Contact contains the Grant Growth Review pathway, direct contact information, scheduling link, privacy warning, accessible form, success handling, and safe error state.

## Design direction

- Preserve the existing NPO logo and current deep teal, charcoal, cream, and restrained gold palette.
- Preserve the current typography, spacing, cards, six-stage diagram, team photography, and mobile behavior unless a documented accessibility or technical constraint requires a change.
- Keep paragraphs short and direct.
- Do not use robots, AI imagery, fake dashboards, fabricated metrics, unapproved client logos, or confidential client material.
- Do not use em dashes.

## Nonnegotiable claims and controls

- Use `Human Directed Grant Growth, Powered by GGS™`.
- Do not promise awards or describe submissions as autonomous.
- State that every external submission receives authorized human approval.
- Keep client-owned information and deliverables distinct from NPO-owned GGS methodology, workflows, and system design. This ownership language still requires final business or legal review before launch.
- Keep the disclaimer that grant decisions are made solely by funders and NPO does not charge a percentage of grant funding secured.
- Preserve the Pennsylvania Professional Fundraising Counsel registration information only after confirming it is still current at launch.

## Technical reference

The supplied implementation is a working Vite and Handlebars reference build. It includes:

- centralized business details and metadata in `site.config.mjs`;
- shared header, footer, head, and call-to-action partials;
- responsive styles in `src/styles.css`;
- accessible navigation and form behavior in `src/main.js`;
- redirect and security-header examples in `vercel.json`;
- tests for routes, content, accessibility, responsiveness, form states, and reduced motion;
- optimized team photography and social-sharing assets under `public/images/`.

The web team may reproduce this in another stack, but the final build should meet WCAG 2.2 AA where reasonably possible, preserve all essential copy and controls, and maintain the four-page architecture.

## Before launch

1. Build and review a private staging URL.
2. Confirm Heidi Roux’s public title, biography, quotation, and photo permission.
3. Obtain final business or legal review of the GGS ownership language and Privacy page.
4. Verify the business name, address, telephone, email, scheduling URL, and Pennsylvania registration.
5. Test one real form submission and one safe failure state.
6. Verify redirects, sitemap, robots, structured data, social previews, accessibility, performance, and mobile behavior.
7. Obtain Brendan Bradley’s explicit production approval.

Do not alter the current production site until that approval is documented.
