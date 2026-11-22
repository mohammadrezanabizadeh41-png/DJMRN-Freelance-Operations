# DJMRN — ساخت مدل 01 (M01) | سایت حرفه‌ای پنج‌زبانه با HTML، CSS و JavaScript خالص

**ID:** DJMRN-LIGHT-SITES-M01-001  
**Created:** 2026-11-21  
**Project branch:** `project/light-sites-m01-vanilla-20261121`  
**Base branch:** `project/chatgpt-light-sites-20261121`  
**Path:** `10-chatgpt-light-sites/models/M01-vanilla-multilingual/`  
**Project stage (2026-11-22):** **S01–S12 PASS for the static DEMO**, 20/30 local routes built; **S12A mandatory + I00–I20 infrastructure readiness PLANNED**, then S13–S20 + local S14A. **Production membership/admin/order track P00–P18 RESEARCHED/PLANNED, NOT IMPLEMENTED.** No signup, SMS, real order/payment, production database or deployment.
**Upstream model:** [parent build checklist, M01 is unchecked](../../05-MODEL-BUILD-CHECKLIST.md).  
**Isolation:** No changes to `main`, parent project branch, or `09-self-marketing-website/` heavy Codex/3D site.

## Concept chosen for professional portfolio sample
**Provisional fictional identity:** NOVA Atelier — multilingual digital services studio with visual portfolio, catalog of **demo** services/products, interactive demo cart and explicit mock checkout. Sample should look like a plausible client-facing premium website but must be clearly labeled a fictional demonstration. **No real merchant, bank gateway, order processing, account, payment, collection of PII or production hosting.**

**Responsive display target (required):** **Mobile + Tablet + Laptop/Desktop** using one fluid responsive codebase; 1920px wide-screen is an additional check, not a fourth separately built version. Test both portrait/landscape where relevant, touch/mouse/keyboard, RTL/LTR and zoom/reflow. See [04 responsive contract](04-I18N-SEO-COMMERCE-SECURITY.md), [03 updated 20-stage roadmap](03-EXECUTION-ROADMAP.md), [05 device QA](05-QA-AND-HANDOFF.md).  
**Languages:** فارسی (`fa`, RTL), English (`en`, LTR), العربية (`ar`, RTL), Türkçe (`tr`, LTR), Deutsch (`de`, LTR).  
**Architecture:** semantic crawlable `HTML` + modern `CSS` + modular `JavaScript` only. **No Vite, React, WordPress, Next.js, backend or database** in M01 runtime. Existing Node/Git/Bridgerator are development/test executors, not website runtime dependencies.

## Read in order — one decision contract per topic
1. **[01-RESEARCH-AND-BRIEF.md](01-RESEARCH-AND-BRIEF.md):** where pure HTML sites fit, why this sample was selected, 2026 visually modern direction, five languages, page plan, alternatives and real versus mock boundary.
2. **[02-STACK-TOOLS-AND-MCP.md](02-STACK-TOOLS-AND-MCP.md):** professional tool stack drawn from parent registry, MCP vs deterministic CLI, local install status, fonts/icons/license, optional Playwright/Lighthouse/axe.
3. **[03-EXECUTION-ROADMAP.md](03-EXECUTION-ROADMAP.md):** **20 sequential checkable stages S01–S20** with owner-facing outcomes, selected tool, real test/exit condition, recordable evidence and stop rules. This is the **only working step checklist** for M01.
4. **[04-I18N-SEO-COMMERCE-SECURITY.md](04-I18N-SEO-COMMERCE-SECURITY.md):** URL/lang/dir/hreflang/canonical/sitemap, static directory tree, demo payment limitation, privacy and CSP rules, performance and a11y targets.
5. **[05-QA-AND-HANDOFF.md](05-QA-AND-HANDOFF.md):** **30 planned QA gates T01–T30**, 5×6 locale route matrix, browser/mobile/keyboard/security failure tests and documented handoff.

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
| Fonts/assets | System-font fallback; original S06 hero, three S11 concept vectors and six original editable S12 kit SVGs; no external or paid imagery |
| SEO | meaningful static HTML in 5 language URL subfolders, no JS-only SEO content, `hreflang` reciprocity, original truthful metadata |
| Cart/payment | synthetic inventory/amounts, mock cart and mock receipt with no card fields; real payment future independent architecture |
| Responsive | **Mobile 320–430px, tablet 600–1024px, laptop/desktop 1024–1440px, wide 1920px optional**; keyboard/touch/mouse, rotation/zoom and fa/ar RTL + en/tr/de LTR |
| Performance and access | WCAG 2.2 AA target, reduced-motion, CWV aspirations; never claim passing without measurements |
| Permissions | no new software installed, no MCP/server configured, no provider sign-up, no actual data transmitted or external deploy |

## Where to begin next
**First S12A:** revisit S02/S04/S05/S07 contracts and readiness map **I00–I20** for customer registration, dual-channel verification, membership code, server-owned orders, separate admin authentication and legal/provider/cost gates. **Then S13 of 20** builds the five-language **synthetic** DEMO_CREDIT cart/receipt with guarded integer arithmetic and real browser tests. Home, Services, Work and Catalog are built across five locales; no live sale or real transaction is allowed. S14 is the non-submitting Contact preview, S14A the local-only content-management dashboard. Review [stage evidence](03-EXECUTION-ROADMAP.md) before advancing.

A live payment gateway is intentionally not part of this pure-front-end implementation: real checkout requires a secure server-side provider session and verified callback/webhook, legitimate merchant eligibility, privacy and additional approval. A realistic demo checkout remains in scope.

## Explicitly not done
- No independent Contact or DEMO Checkout routes, demo cart/receipt, actual payment, production backend, management dashboard or public deployment yet.
- Home ×5, Services ×5, Work ×5 and Catalog ×5 are built with original editable SVG art and functional catalog search/filter/reset. Automated Node, HTML-Validate, Edge/Playwright and representative axe QA are recorded in S08–S12. **Qualified human translation review and manual WCAG validation are still pending.**
- No new npm install, provider integration, paid usage, source transfer from project 09, publication or merge during S12.
- No old 3D source/media files copied and no Codex involvement.

**Source control:** This is an independent Git branch from the *existing light-site project branch*. GitHub is canonical; any later status or artifact change occurs only with user-approved execution and readback. Parent **M01 remains unchecked** until a full functional demo is built/tested and accepted.

## 2026-11-22 scope expansion — real-site membership, admin and commerce (planning only)

The owner explicitly requires a **real** member account flow (email confirmation + phone SMS confirmation, then unique public membership code and authenticated order history) and a **separate invite-only secure administration login/dashboard**. Static M01 remains reusable presentation/Demo and is NOT a secure user/auth/order system. The mandatory pre-S13 **S12A** re-examines requirements in S02/S04/S05/S07. A distinct **production P00–P18** track, with server/DB/security/identity/notification/payment/operations/legal/QA gates, is mapped in the existing [03 roadmap](03-EXECUTION-ROADMAP.md), [01 new brief §12](01-RESEARCH-AND-BRIEF.md), [04 security contract §10](04-I18N-SEO-COMMERCE-SECURITY.md) and [05 tests T31–T45](05-QA-AND-HANDOFF.md).

**No real auth/backend, emails/SMS, provider connection, production schema, checkout, permissions, credential storage or costs were activated in this roadmap revision.** Decisions on jurisdiction, SMS delivery, PSP account/fee/settlement, DB and runtime remain UNVERIFIED and require explicit approval. The local-only S14A content editor is not the online Admin Console. Parent M01 and all unexecuted stage checkboxes remain unchanged until actual tested implementation.

## Infrastructure discovery checklist — research-only expansion, 2026-11-22

**Canonical source:** [03 Roadmap → Infrastructure Readiness I00–I20](03-EXECUTION-ROADMAP.md) maps **21 infrastructure layers/gates** (legal merchant/cost eligibility, DNS/domain, static CDN, origin HTTPS, API runtime, secrets, CI, SQL database, backups, sender email DNS, SMS OTP, customer sessions, separated admin, merchant PSP, order fulfillment, private assets, queue/retry, WAF, monitoring, legal/privacy, staging and launch). Each has a concrete test and unmarked checkbox; none has been provisioned.

**Service discovery:** Existing connected ChatGPT plugins GitHub/Supabase/Neon/Render/Railway were verified through plugin discovery. Direct plugin name searches for Cloudflare, Resend, Twilio and Sentry returned no match, so official dashboard/CLI/API/manual signup options and exact selection gates are listed. Candidate Free-tier capacities are evidence for comparison, **not** proof that the owner's account/region/usage is entitled or that live SMS/PSP/24×7 hosting is free.

**Next operational step remains S12A**, a contract and infrastructure decision gate before implementing M01 S13 demo cart; a free-first local backend vertical (Node+SQLite+mock email/SMS/payment) can then be tested before permissioned cloud selection P00–P18. Nothing was installed, connected or published in this infrastructure research turn. [QA infra T46–T55](05-QA-AND-HANDOFF.md) are all NOT RUN. S01–S12 DEMO PASS and parent model NOT DONE remain unchanged.
