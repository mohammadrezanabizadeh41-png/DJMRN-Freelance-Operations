# DJMRN — ساخت مدل 01 (M01) | سایت حرفه‌ای پنج‌زبانه با HTML، CSS و JavaScript خالص

**ID:** DJMRN-LIGHT-SITES-M01-001  
**Created:** 2026-11-21  
**Project branch:** `project/light-sites-m01-vanilla-20261121`  
**Base branch:** `project/chatgpt-light-sites-20261121`  
**Path:** `10-chatgpt-light-sites/models/M01-vanilla-multilingual/`  
**Project stage:** **RESEARCH AND PROFESSIONAL PLAN COMPLETE — NO SITE CODE, NO INSTALL, NO LAUNCH**  
**Upstream model:** [parent build checklist, M01 is unchecked](../../05-MODEL-BUILD-CHECKLIST.md).  
**Isolation:** No changes to `main`, parent project branch, or `09-self-marketing-website/` heavy Codex/3D site.

## Concept chosen for professional portfolio sample
**Provisional fictional identity:** NOVA Atelier — multilingual digital services studio with visual portfolio, catalog of **demo** services/products, interactive demo cart and explicit mock checkout. Sample should look like a plausible client-facing premium website but must be clearly labeled a fictional demonstration. **No real merchant, bank gateway, order processing, account, payment, collection of PII or production hosting.**

**Languages:** فارسی (`fa`, RTL), English (`en`, LTR), العربية (`ar`, RTL), Türkçe (`tr`, LTR), Deutsch (`de`, LTR).  
**Architecture:** semantic crawlable `HTML` + modern `CSS` + modular `JavaScript` only. **No Vite, React, WordPress, Next.js, backend or database** in M01 runtime. Existing Node/Git/Bridgerator are development/test executors, not website runtime dependencies.

## Read in order — one decision contract per topic
1. **[01-RESEARCH-AND-BRIEF.md](01-RESEARCH-AND-BRIEF.md):** where pure HTML sites fit, why this sample was selected, 2026 visually modern direction, five languages, page plan, alternatives and real versus mock boundary.
2. **[02-STACK-TOOLS-AND-MCP.md](02-STACK-TOOLS-AND-MCP.md):** professional tool stack drawn from parent registry, MCP vs deterministic CLI, local install status, fonts/icons/license, optional Playwright/Lighthouse/axe.
3. **[03-EXECUTION-ROADMAP.md](03-EXECUTION-ROADMAP.md):** **20 sequential checkable stages S01–S20** with owner-facing outcomes, selected tool, real test/exit condition, recordable evidence and stop rules. This is the **only working step checklist** for M01.
4. **[04-I18N-SEO-COMMERCE-SECURITY.md](04-I18N-SEO-COMMERCE-SECURITY.md):** URL/lang/dir/hreflang/canonical/sitemap, static directory tree, demo payment limitation, privacy and CSP rules, performance and a11y targets.
5. **[05-QA-AND-HANDOFF.md](05-QA-AND-HANDOFF.md):** **20 concrete QA tests T01–T20**, 5×6 locale route matrix, browser/mobile/keyboard/security failure tests and documented handoff.

**Parent project references, reused rather than duplicated:** [tools/REGISTRY.md](../../tools/REGISTRY.md) · [22 building methods](../../04-WEBSITE-BUILD-MODELS.md) · [overall stages](../../01-PROFESSIONAL-STAGES.md).

## Most important decisions
| Topic | Selection |
|---|---|
| Website archetype | Premium service/portfolio + illustrative digital-products catalog, small creative interaction |
| Business objective | Portfolio that demonstrates broad everyday website work, not a fake merchant |
| Main runtime | HTML5 + CSS modern + vanilla JavaScript, no frontend framework/build tool |
| Develop/edit | GPT-6 → **existing Bridgerator MCP** → local files/PowerShell; Git and Node tests |
| Optional OSS QA | browser DevTools/Lighthouse, Playwright CLI, axe-core, HTML-Validate, SiteOne if tested need |
| Visual direction | original editorial hero, strong type, responsive asymmetric/bento grids, purposeful subtle motion |
| Fonts/assets | self-host approved Vazirmatn/Inter, optional Lucide SVG; no font or image is copied/installed in this planning turn |
| SEO | meaningful static HTML in 5 language URL subfolders, no JS-only SEO content, `hreflang` reciprocity, original truthful metadata |
| Cart/payment | synthetic inventory/amounts, mock cart and mock receipt with no card fields; real payment future independent architecture |
| Responsive | 320px–1440px, keyboard and touch, fa/ar RTL and en/tr/de LTR |
| Performance and access | WCAG 2.2 AA target, reduced-motion, CWV aspirations; never claim passing without measurements |
| Permissions | no new software installed, no MCP/server configured, no provider sign-up, no actual data transmitted or external deploy |

## Where to begin next
**S01 of 20 — verify the isolated local working directory, the M01 branch, current RAM/browser/Node/Git and actual file tools.** Then S02 selects exact synthetic brand/offer based on owner feedback; after small design gates S08 starts the first real running page. Do not mistake these documentation commits for completion of S01–S20.

A live payment gateway is intentionally not part of this pure-front-end implementation: real checkout requires a secure server-side provider session and verified callback/webhook, legitimate merchant eligibility, privacy and additional approval. A realistic demo checkout remains in scope.

## Explicitly not done
- No local `site/` code, HTML/CSS/JS written for this model, no browser QA, screenshot, translation verification or real checkout.
- No npm install, downloaded archives moved, plugins/MCP activated, data/provider sent, paid usage, public publishing or merge.
- No old 3D source/media files copied and no Codex involvement.

**Source control:** This is an independent Git branch from the *existing light-site project branch*. GitHub is canonical; any later status or artifact change occurs only with user-approved execution and readback. Parent **M01 remains unchecked** until a full functional demo is built/tested and accepted.
