# M01 — static local demo through S11 (Home + Services + Work × five locales)

This folder is the running NOVA Atelier prototype in the dedicated M01 branch. **Fifteen routes** are now built (Home, Services, Work across fa/en/ar/tr/de); the remaining fifteen planned routes (Catalog, Contact, DEMO Checkout × five) are not built, and nothing is publicly deployed. Implementation is pure HTML, CSS and vanilla ES modules; Node is only a local preview/test tool.

## Run on the authorized DJMRN laptop

From `models/M01-vanilla-multilingual`:

```powershell
node .\scripts\serve-local.mjs
```

Open **http://127.0.0.1:4173/** to choose any of the five Home languages, or visit **http://127.0.0.1:4173/fa/**, **/en/**, **/ar/**, **/tr/** or **/de/** directly. Do **not** use `file://` for module and origin checks. Stop the server with Ctrl+C when done. The server binds **loopback only**, serves nothing outside `site/`, does not access external services or collect data.

```powershell
node --test .\tests\*.test.mjs
```

Built routes: `site/{fa,en,ar,tr,de}/index.html` plus `site/{locale}/{services,work}/index.html` for every locale. The root chooser is an ancillary route outside the planned 30. Navigation Home→Services→Work works without JavaScript, and the future Contact action currently points to the existing Home `#contact` preview, not a non-existent page. Catalog and DEMO Checkout remain pending.

## State and boundaries

- `content/i18n.v1.json` is the single **draft content authority** for all fifteen static pages. `scripts/render-home-locales.mjs` and `scripts/render-service-work.mjs` deterministically regenerate Home and Services/Work. They do not maintain separate translation authorities.
- Original S06 SVG is copied unaltered to `site/assets/img` so localhost can serve it with the same-origin CSP.
- Header, footer, services/work/catalog anchors and the five-language switch remain native links without JavaScript. `main.js` imports the small `nav.js` disclosure module for keyboard, pointer and touch behavior of the compact mobile/tablet menu; no shop/cart/contact submission yet.
- Security: no PSP, payments, order/receipt processing, back-end, tracking, collection of PII, external fonts or API.
- The previews and browser QA are S08 evidence; the implementation and final copy/polish of all routes are **S09–S18**, with publication gated by owner approval and human translation review.
- GitHub branch: `project/light-sites-m01-vanilla-20261121`; write scope: `10-chatgpt-light-sites/models/M01-vanilla-multilingual/`. Do not alter M02, the parent general branch, `main`, or the Codex-heavy `09-` project.

Stage evidence and pass/fail are tracked **only** in [03-EXECUTION-ROADMAP.md](../03-EXECUTION-ROADMAP.md).

## S08 language completion (five working Home pages)

The five static HTML Home pages now exist in site/{fa,en,ar,tr,de}/index.html. The root page / links to all five, and each Home has a five-language native link switch. This works without JavaScript; only the compact menu is enhanced.

To regenerate all five from the **single S07 copy authority** content/i18n.v1.json:

- node ./scripts/render-home-locales.mjs

To run all static tests:

- node --test ./tests/*.test.mjs

The renderer is a deterministic build-time Node script. It requires no framework or server-side production runtime.

Remaining out of scope for S08: independent Services, Work, Catalog, Contact, DEMO Checkout pages and their final functionality. Those stages are tracked as S09–S14; translation drafts require human review before publication.

## S09 shared navigation — all five Home languages

The same deterministic build script now generates semantic header, main/skip, footer and language navigation for every locale. Language and current-page controls are real links. The disclosure menu is progressive enhancement only: at viewports up to 56rem with JavaScript it opens/closes through a native button, manages aria-expanded, closes on Escape, outside click, link choice and resize, and returns keyboard focus to the trigger on Escape. Without JavaScript the navigation stays visible and usable.

For reproducibility: run node ./scripts/render-home-locales.mjs, then node --test ./tests/*.test.mjs. Edge/Playwright interaction evidence and checksums are recorded once in the existing 03-EXECUTION-ROADMAP.md stage S09. No separate route kind beyond Home was created here, and the 25 remaining independent pages are still pending.
## S10 editorial Home release (five locales; local demo)

The existing Home pages for fa/ar RTL and en/tr/de LTR now have:
- a focused editorial hero with original S06 artwork, localized audience and message, and two real same-page CTAs;
- **actual content counts** (six service entries, three fictional concept cases and six demo kits) instead of claimed visitor/sales statistics;
- three localized design principles, an illustrative three-step workflow and closing navigation that works without JavaScript;
- one shared responsive stylesheet at site/assets/css/home.css, with keyboard focus and reduced-motion fallback.

The copy authority stays content/i18n.v1.json (the existing DRAFT_EDITORIAL_HUMAN_REVIEW_PENDING status). The deterministic scripts/render-home-locales.mjs imports scripts/home-sections.mjs. Run node scripts/render-home-locales.mjs and then node --test tests/*.test.mjs from the model root. The visible Home references are functional sections only; separate /services/, /work/, /catalog/, /contact/ and /demo-checkout/ routes are still planned for S11–S14.

Local preview: http://127.0.0.1:4173/fa/ on the laptop (requires running the existing Node preview server). If the already authorized same-Wi-Fi LAN relay is running, its address can be checked separately; it does not expose the content editor or create a public website.

No real clients, analytics, purchases, form submission, production hosting, paid dependencies or CMS have been added. S10 does not complete S14A and does not authorize deployment.
## S11 — real localized Services and Work (2026-11-22)

- **Build:** From the model root run `node scripts/render-home-locales.mjs` followed by `node scripts/render-service-work.mjs`. Both consume **only** `content/i18n.v1.json`. Then run `node --test tests/*.test.mjs`.
- **Routes:** `/{locale}/services/` has six fictional service scopes, process steps, a native FAQ and linked concept stories. `/{locale}/work/` has three explicit Concept/DEMO case studies with problem → approach → original artifact → learning, each linked to a real service anchor.
- **Contact route:** Since S14 is not built, the S11 CTA goes to `/{locale}/#contact`, the existing non-submitting preview; it is not an inquiry endpoint.
- **Original artwork:** `assets/img/s11-corporate-presence.svg`, `s11-creative-portfolio.svg`, `s11-digital-catalog.svg` are original editable SVG source/output made specifically for M01, with no outside images/fonts. No Blender/GIMP rendering or new cloud design service was used, so conditional T30 is not claimed.
- **Runtime:** `assets/css/s11-detail.css` follows the shared palette. `main.js` and `nav.js` remain shared progressive navigation; content and links work without JavaScript.
- **S11 tests:** 32 Node tests; 10 HTML-Validate checks with zero errors; 40 Edge/Playwright viewport checks with JS on/off plus real click flows; four representative automated axe scans with zero violations (one incomplete/manual check per scan). Screenshots and QA evidence remain in the separate local QA directory and are referenced by the existing S11 roadmap checkbox.
- **Limitations:** Five Catalog, five Contact, five DEMO Checkout routes and S14A are future work. Translation drafts and manual accessibility/WCAG review remain pending. No field Web Vitals, physical-phone test, real purchase, client or public deployment is claimed.
