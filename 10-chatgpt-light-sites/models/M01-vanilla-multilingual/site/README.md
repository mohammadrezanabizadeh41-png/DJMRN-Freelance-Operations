# M01 — S08 first running vertical slice (local only)

This folder is the **first actually runnable** NOVA Atelier prototype in the dedicated M01 branch. It is **not** the finished 30-route/five-language site and not publicly deployed. Implementation is pure HTML, CSS and vanilla ES modules; Node is only a local preview/test tool.

## Run on the authorized DJMRN laptop

From `models/M01-vanilla-multilingual`:

```powershell
node .\scripts\serve-local.mjs
```

Open **http://127.0.0.1:4173/en/**. Root **http://127.0.0.1:4173/** offers an explicit language chooser. Do **not** use `file://` for module and origin checks. Stop the server with Ctrl+C when done. The server binds **loopback only**, serves nothing outside `site/`, does not access external services or collect data.

```powershell
node --test .\tests\s08-static.test.mjs
```

The first real page is `site/en/index.html`; the root chooser is an ancillary route outside the planned 30. The rest of `fa/en/ar/tr/de` services/work/catalog/contact/demo-checkout remain future stages. Only the already-built English Home is a link; other language choices are deliberately disabled until routes exist.

## State and boundaries

- S07 `content/i18n.v1.json` is the current **draft content authority**. Static English Home markup is manually synchronized here; avoid duplicating translation keys or creating a second content registry. During S10/S15, compare the rendered content to S07.
- Original S06 SVG is copied unaltered to `site/assets/img` so localhost can serve it with the same-origin CSP.
- Header anchors, services, concept work, catalog preview and disclaimer all function without JavaScript. `main.js` enhances the compact menu only; no shop/cart/contact submission yet.
- Security: no PSP, payments, order/receipt processing, back-end, tracking, collection of PII, external fonts or API.
- The previews and browser QA are S08 evidence; the implementation and final copy/polish of all routes are **S09–S18**, with publication gated by owner approval and human translation review.
- GitHub branch: `project/light-sites-m01-vanilla-20261121`; write scope: `10-chatgpt-light-sites/models/M01-vanilla-multilingual/`. Do not alter M02, the parent general branch, `main`, or the Codex-heavy `09-` project.

Stage evidence and pass/fail are tracked **only** in [03-EXECUTION-ROADMAP.md](../03-EXECUTION-ROADMAP.md).
