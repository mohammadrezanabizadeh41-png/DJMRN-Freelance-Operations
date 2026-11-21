# M01 — قراردادهای فنی i18n، SEO، پرداخت نمایشی، امنیت و معماری فایل
**Design-stage decision record, not implementation evidence — 2026-11-21.**  
**Stack:** real output pure HTML/CSS/JS. Rendering and crawlability must work even if JavaScript is disabled.  
**Related:** [research brief](01-RESEARCH-AND-BRIEF.md), [tools](02-STACK-TOOLS-AND-MCP.md), [roadmap](03-EXECUTION-ROADMAP.md).

## 1) Static-site / locality file plan (proposed, to be verified at S04/S08)
This is not an existing folder listing. It is the **planned structure** of the first build.

```text
site/                         # only in this M01 project, isolated from old 09/
  index.html                  # explicit x-default language chooser or redirects without forced geo
  404.html
  fa/
    index.html
    services/index.html
    work/index.html
    catalog/index.html
    contact/index.html
    demo-checkout/index.html
  en/                         # same 6 page kinds
  ar/                         # same, RTL
  tr/                         # same, LTR
  de/                         # same, LTR
  assets/
    css/
      tokens.css
      reset.css
      base.css
      layout.css
      components.css
      motion.css
    js/
      nav.js
      locale.js
      catalog.js
      cart.js
      demo-checkout.js
    img/
      original-icons.svg
      original-hero.svg
      [approved asset images]
    fonts/                     # only if fonts selected/licensed and approved locally
  data/
    items.demo.json            # synthetic safe product data, no private records
  sitemap.xml                  # generated AFTER real public URL/base path known
  robots.txt                   # adjusted before approved deploy
scripts/                       # optional development helpers, built-in Node only
  serve-local.mjs
  check-locales.mjs
  check-links.mjs
  check-sitemap.mjs
tests/
  cart.test.mjs
  locale.test.mjs
  links.test.mjs
README.md                      # how to run and inspect, not a separate status log
```

The planned `site/{lang}` pages are **5 publicly indexable page kinds × 5 locales = 25 static pages**, plus **5 DEMO checkout routes** kept `noindex`. That is a plan, not files created. Avoid placeholder canonicals `https://example.com` in published data. May later use a small deterministic Node HTML writer for shared template duplication, but shipping runtime stays framework-free, static HTML; do not introduce Vite/Astro.

## 2) i18n conventions and content QA
- Locale: `fa` RTL, `ar` RTL; `en`, `tr`, `de` LTR. Root HTML always sets `lang` and `dir` and a locale-specific page title.
- Language switcher: each page links to the **equivalent route in other locales**, not blindly to each homepage. Text labels are human-readable language autonyms.
- `<bdi>`/`dir="auto"` for product names, codes and Latin snippets inserted into RTL text, not overriding large page areas with text-align hacks.
- CSS use `margin-inline`, `padding-inline`, `inset-inline`, `border-start-start-radius` where appropriate; bidi directional icons reviewed. Logical properties do not imply that photographs and logos should be mirrored.
- No true machine-translated publishing claims without human checking; translation completeness and accuracy tracked per page before DONE. `fa` and `ar` independently validated.
- Use `Intl.NumberFormat`, `Intl.DateTimeFormat`, `Intl.PluralRules` for labels and formatting; keep money as integer minor units and explicit currency code. `Intl` is display helper not a trusted pricing/checkout processor.
- Avoid mismatched locale and price/currency semantics. Do NOT simply convert demo currency in browser at unverified FX rates; same safe fixture price units may be shown everywhere with clear DEMO unit.
- Locales need translated title/H1/alt/CTA/meta/labels, accessible names and any structured data fields. Long German/Turkish labels and RTL punctuation require QA.

## 3) SEO localization matrix and crawlability
**Core rule:** meaningful main content appears as HTML, not only client-rendered JS. Every important page has a crawlable `<a href>`, stable URL and appropriate HTML document metadata. Google explicitly warns that JavaScript crawling/rendering differs from static HTML and depends on discoverability.

For each valid page kind (home/services/work/catalog/contact):
- self canonical when public, unique descriptive `title`, `meta name=description`, one visible `h1`, semantic regions and breadcrumbs where useful.
- all five reciprocal `<link rel="alternate" hreflang="fa|en|ar|tr|de" href="...">` in every counterpart and `x-default` pointing to actual neutral selector page. Do not add `x-default` if there is no matching fallback.
- `hreflang` also in sitemap if chosen; sitemap uses only absolute final URLs; avoid duplicate or fake language page entries.
- correct `lang`/`dir`, Open Graph description/image using original rights-cleared assets, no deceptive review stars.
- avoid auto language redirect based on geo/IP/Accept-Language without user choice; explicit language links are robust and accessible.
- `robots.txt` must reflect what is actually allowed to index; `noindex` for demo checkout and any provisional demo-only products, no contradictory robots blocking `noindex` fetch.
- `WebSite` and `Organization` JSON-LD **only with truthful publisher/brand facts** once authorized. `Product`/`Offer` merchant structured data **NOT** for nonexistent purchasable sample products; no fabricated reviews/ratings. Rich result eligibility is never guaranteed.
- `FAQPage` schema if Google guidelines and genuine content support it; avoid markups not backed by visible page.

**Local SEO gate:** parse the HTML files, check unique titles/H1, internal links, alternate hreflang reciprocity, canonical consistency, valid sitemap, noindex demo routes. **No claim of Google indexing while only localhost exists.**

Sources: [Google localized](https://developers.google.com/search/docs/specialty/international/localized-versions), [Google developer guide](https://developers.google.com/search/docs/fundamentals/get-started-developers), [Google sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Google link crawlability](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [Google structured data quality](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

## 4) Payment/cart boundary and future integration contract
The user requests a **professional demo with payment gateway capabilities**. At M01 **no real gateway exists or can be safely implemented with browser-only HTML/CSS/JS**. We design a visible mock that exercises UX, not a financial transaction.

### State transitions, all client demo
```text
Catalog → Add to DEMO cart → Review quantities → Confirm mock checkout
→ display "DEMO — no money charged" → mock receipt reference (clearly synthetic)
```
- Only fixture products, safe IDs, bounded quantities and integer monetary units; revalidate cart on load and reset corrupted state.
- No actual payment iframe, bank branding, card PAN/CVV fields, full name, phone, address, external PSP API keys, token, real order or ledger. UI cannot take/claim funds.
- Product prices in demo are not real merchant offers. No receipt sent anywhere and no background network submission. No fake paid order statuses.
- `demo-checkout` `noindex`; visually labeled in **all five languages**. Mock payment feedback must be discernible to screen readers (`role=status`).

### If later requiring real payment (separate proposal and probably M21/M18 classification)
1. Verify seller's legal eligibility/KYC, PSP provider support, pricing/quota and required host region **from the actual provider's official terms**. Unknown/paid = STOP until approval. Do not promise Stripe/PayPal/ZarinPal or other provider approval for this user.
2. Backend creates order from **authoritative** product prices; validates stock/total and currency, signs server-side payment session/checkout redirect. No secret in browser or public GitHub.
3. Hosted checkout/redirect from authorized PSP, followed by **server-side verified webhook/callback**, signature verification and idempotency. Client return-page success is not payment proof.
4. Persistent order status and refunds/reconciliation, privacy/retention/rate limiting/observability, failure handling. No real charge until standalone approval.
5. If these production requirements appear, the **site's M01 frontend can remain static**, but its production e-commerce system is *not* pure M01 anymore. Explicitly record the change to M21/fullstack path; do not tick M01 as a completed production store.

**Source:** [OWASP Frontend Security](https://cheatsheetseries.owasp.org/cheatsheets/Web_Frontend_Security_Cheat_Sheet.html) (never trust client security logic/secrets), [Stripe example of hosted checkout with server endpoint + verified webhook](https://docs.stripe.com/payments/existing-customers?platform=web&ui=stripe-hosted). Stripe is a **generic architecture reference only**, not a selected/available provider.

## 5) Forms, privacy, security headers and static hosting
- For M01, Contact screen uses native form controls with **client validation demonstration only** and clearly explains that data is not transmitted. No storing or sending PII, no third-party analytics/CRM without approval. If the owner wants actual contact delivery, implement an approved serverless/backend with its own domain/data retention policy and consent.
- Security: do not render untrusted strings via `innerHTML`; use `textContent`, DOM APIs, trusted static templates. Sanitize/validate if user content ever appears.
- No secrets, keys, sessions, personal addresses or .env in public GitHub; test only synthetic data. No unsafe `eval`, tracking scripts, ad pixels or third-party dynamic widgets.
- Server/hoster later should implement HTTPS, restrictive CSP, Referrer-Policy and other applicable headers with a tested rollout; `meta http-equiv` CSP only partial substitute. Check real hosting support before promising any header feature.
- Route/asset errors: no broken links, meaningful 404 page, correct cache policy and security headers once deployed.
- Session/localStorage optional only for anonymous demo cart, bounded data and clear action to reset; localStorage is **not** a secret store, proof of purchase or durable commerce database.
- Before any public site: verify asset redistribution licenses, domain, organization facts, privacy/legal text, hosting availability/pricing/overage/retention/region and owner approval.

Sources: [OWASP Frontend](https://cheatsheetseries.owasp.org/cheatsheets/Web_Frontend_Security_Cheat_Sheet.html), [OWASP CSP](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html), [MDN RTL](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir).

## 6) SEO/performance targets are acceptance targets, not measured results
- Internal Lighthouse aspiration: Performance/Accessibility/Best Practices/SEO **≥90**, subject to representative lab measurement; not yet measured, no guaranteed score.
- Google Core Web Vitals field **good** thresholds at 75th percentile: **LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1**, when there is real public traffic. Local Lighthouse lab reports are NOT a substitute for field 75th percentiles.
- Keep images dimensioned, lazy-load below-the-fold only, reserve layout space, responsive images, small JS modules, no unnecessary npm runtime, preload only actual critical asset.
- WCAG 2.2 AA as a **target** with manual keyboard, meaningful focus, language, reduced motion, contrast plus axe; automated scanner alone does not certify compliance.
- Motion: no scroll traps, no gratuitous parallax, no auto-playing background video. Prefer CSS transitions + `prefers-reduced-motion`.
- Test 320, 360, 390, 768, 1024 and 1440 CSS pixel widths with real browser screenshots and no horizontal overflow except where design calls for scrollable component.

Sources: [web.dev CWV](https://web.dev/articles/defining-core-web-vitals-thresholds), [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview), [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), [MDN prefers reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion).

## 7) Reversibility and source-of-truth
- Existing parent: `10-chatgpt-light-sites/`; M01 branch `project/light-sites-m01-vanilla-20261121`, folder `models/M01-vanilla-multilingual/`. Never edit `09-self-marketing-website/`.
- Documents here are design contracts and acceptance before code. Source code lives **in this model folder**, no cross-copy of original site files or unpublished vendor resources.
- Step status lives in `03-EXECUTION-ROADMAP.md`; checkbox for M01 in parent `05-MODEL-BUILD-CHECKLIST.md` stays unchecked until full finish. No additional recurring status log.
- After each approved implementation slice: diff/test/commit and possible revert; preserve ability to roll back without schema migration or cloud account changes.

**Status:** architecture accepted for initial planning, not security verified and no site running.
