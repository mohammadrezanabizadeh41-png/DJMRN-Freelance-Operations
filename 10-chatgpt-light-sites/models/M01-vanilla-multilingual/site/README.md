# M01 — S08 first running vertical slice (local only)

This folder is the **first actually runnable** NOVA Atelier prototype in the dedicated M01 branch. **All five Home locales** (fa/en/ar/tr/de) now run locally, but the full 30-route site is not finished and nothing is publicly deployed. Implementation is pure HTML, CSS and vanilla ES modules; Node is only a local preview/test tool.

## Run on the authorized DJMRN laptop

From `models/M01-vanilla-multilingual`:

```powershell
node .\scripts\serve-local.mjs
```

Open **http://127.0.0.1:4173/** to choose any of the five Home languages, or visit **http://127.0.0.1:4173/fa/**, **/en/**, **/ar/**, **/tr/** or **/de/** directly. Do **not** use `file://` for module and origin checks. Stop the server with Ctrl+C when done. The server binds **loopback only**, serves nothing outside `site/`, does not access external services or collect data.

```powershell
node --test .\tests\*.test.mjs
```

The first five real pages are `site/{fa,en,ar,tr,de}/index.html`. The root chooser is an ancillary route outside the planned 30. **All five Home links now work**, including without JavaScript. Independent services/work/catalog/contact/demo-checkout pages are future stages and are not linked as separate routes yet.

## State and boundaries

- S07 `content/i18n.v1.json` is the current **draft content authority**. The five static Home pages are deterministically rendered with `scripts/render-home-locales.mjs` from this one JSON content source, not manually maintained as five diverging templates. During S10/S15, compare the rendered content to S07.
- Original S06 SVG is copied unaltered to `site/assets/img` so localhost can serve it with the same-origin CSP.
- Header anchors, services, concept work, catalog preview and disclaimer all function without JavaScript. `main.js` enhances the compact menu only; no shop/cart/contact submission yet.
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
