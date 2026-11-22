# M01 — ماتریس تست، معیار پذیرش و تحویل نمونه‌کار
**State (2026-11-22):** S01–S12 have evidence for **DEMO** (S12: 40 Node tests, 40 Edge viewports, 20 interactions, five HTML-Validate pages, ten automated axe scans). S12A, S13–S20, S14A and new I00–I20 infrastructure gates are **NOT IMPLEMENTED/NOT TESTED**. **T31–T45 production and T46–T55 infrastructure are PLANNED / ALL NOT RUN.** No user registration, admin login, SMS/email delivery, paid purchase, production DB or cloud service exists. Human translation/accessibility review and publication pending.
**Build plan:** [03 Execution Roadmap](03-EXECUTION-ROADMAP.md); [04 i18n/SEO/payment/security](04-I18N-SEO-COMMERCE-SECURITY.md).

## 1) What we will actually test
| ID | Test target | Test input / procedure | Evidence required | Pass criterion |
|---|---|---|---|---|
| T01 | Git isolation | `git rev-parse --show-toplevel`, current branch, `git status` and diff before/after | branch/path+diff | only `models/M01-vanilla-multilingual/` changed, no 09 and no main |
| T02 | Local preview across 3 display classes | Serve static site on `127.0.0.1`; open Home at 390px, 820px and 1366px with JS on/off | HTTP result + browser viewport captures | real semantic content and links work without JS; no broken tablet layout |
| T03 | Locale availability | request `fa en ar tr de` home + 5 page kinds | machine-readable coverage report | 5×5 = 25 intended public static routes exist and have nonempty content |
| T04 | Language switching across mobile/tablet/desktop | on each page type switch to every other language with mobile menu and full nav | route traversal/capture of at least fa+en in three classes | equivalent URL and correct `lang`/`dir`; switcher never hidden or inaccessible |
| T05 | RTL/bidi/long translations on screens | fa/ar RTL with Latin product IDs, de/tr long nav strings; portrait and landscape | fa+ar+de viewport screenshots and wrap report | no reversed codes, clipped navigation, wrong order or unexpected overflow |
| T06 | SEO metadata | HTML parse, title/H1/description, canonical/self, robots, hreflang reciprocal | 25-page report | unique meaningful metadata, no broken alternates or fake schema |
| T07 | Sitemap/crawl | all public URLs reachable via native anchors, sitemap entries and sitemap absolute URLs | link report | no internal 404s; demo checkout excluded from public index/sitemap |
| T08 | Keyboard + touch/mouse accessibility | Tab/Shift+Tab/Enter/Escape on nav, language switch, cart; coarse pointer touch, fine pointer mouse | manual test + browser capture at mobile/tablet/desktop | accessible focus, no hover-only control, touch targets WCAG 2.2 AA 24px minimum except valid exceptions (prefer 44px), no keyboard trap |
| T09 | Accessibility automated and human review | axe-core if available, manual contrast/alt/heading, text resizing, reduced motion and reflow at 320 CSS px | violation log with severity and fixes + manual checklist | zero known serious/critical blockers, no inaccessible content on zoom, human review required |
| T10 | **3-class responsive regression** | mobile **320/360/390/430**; tablet **600/768/820/1024**; laptop/desktop **1280/1440**, optional wide **1920**; portrait/landscape, hybrid input and zoom | screenshot grid with browser viewport dimensions, source locale and device/emulation noted | no unintended horizontal overflow, touch/keyboard/desktop nav/cart/form usable, consistent page information and one DOM per locale/page |
| T11 | Catalog interactions all screen classes | 4–6 synthetic items; filter/search, no-match/reset; test mobile touch, tablet tap, desktop keyboard/mouse | functional test log and representative screenshots | result count consistent; filters/cart never disappear or become pointer-specific |
| T12 | Cart arithmetic | qty=0,1,max, negative, NaN, unknown ID, corrupted storage, integers | `node --test` results | guarded quantities and deterministic totals, no currency conversion |
| T13 | Demo checkout safety and responsive flow | catalog→cart→receipt on mobile/tablet/desktop at least fa+en, inspect DOM/network | screenshots + network checks | permanent visible DEMO warning, no PAN/CVV/PII/external payment call, accessible reflow |
| T14 | Forms and privacy | input invalid/empty/form submit, check storage/network | capture | demo form never sends personal data; no analytics/tracking cookies |
| T15 | JS/runtime errors | browser console, DOM no-JS, failed asset, offline fixture | error evidence | important content still visible, clear error/empty states |
| T16 | CSS reflow, reduced motion and zoom | prefers-reduced-motion, 200% text zoom; W3C reflow equivalent at 320 CSS px, 400% browser zoom from a 1280px viewport where applicable | zoom/orientation screenshots and manual notes | no functional loss, readable text/focus, no unintended page horizontal scroll, no sticky obstruction |
| T17 | Images/fonts licensing | list included files and license provenance | dependency/asset credits | no unlicensed fonts/icons/stock or external copyrighted asset |
| T18 | Performance for mobile, desktop and large images | Lighthouse mobile+desktop diagnostic, image `srcset/sizes`, inspect JS sizes/requests and LCP/CLS lab | reports with emulation settings and real hardware caveat | internal aspiration ≥90 scores measured, no false claim of field CWV; tablet UX separately checked |
| T19 | Security hygiene | text scan for secrets, forbidden endpoints and unsafe DOM APIs | `git grep`/manual review | no keys/passwords or untrusted `innerHTML`; no insecure paid endpoint |
| T20 | Cross-device customer handoff | clone branch, follow README, review on actual phone + laptop, tablet real if available (otherwise explicitly simulated) | commit SHA, screens per class, owner feedback and QA summary | core flows work across all 3 classes, responsive evidence and limits recorded without claiming untested real hardware |
| T21 | Local content management dashboard (S14A) | Open loopback-only editor; inspect 5-language overview, six services/three cases/six DEMO kits, edit at least 2 locale fields, validate, preview and export/import | Edge/Node logs, changed draft checksums, 320/820/1366 captures | Real operator I/O works; honest data counts, no invented sales/analytics; never directly edits live/public site |
| T22 | Admin isolation and authorization truth (S14A/S18) | Probe LAN/public static server for /admin, management API and draft files; try invalid Host/Origin/HTTP method/path, XSS strings, oversized JSON and injected roles | status-code+network trace, source scan and error handling | Only laptop loopback editor can read/write draft; public/LAN preview has no editor/API/draft exposure; no client-only fake auth, no secrets or unsafe remote calls |
| T23 | Content integrity, version conflict and rollback (S14A/S18/S19) | Edit synthetic catalog item in 2 locales; invalid schema/duplicate ID/stale hash, lost disk/restart, change preview, export validated version, repeat build, revert | canonical hash before/after, Git diff/test output, draft backup and recovery | No silent canonical overwrite; invalid/stale writes denied; real draft persisted, reproducible rebuild and rollback with no corrupt data |
| T24 | Dashboard accessibility, RTL/LTR and operator handoff (S14A/S16/S20) | Navigate with keyboard/touch/mouse and screen-size 320/820/1366, fa/ar RTL vs de long text; active filter/forms/error summary/unsaved warning; owner walkthrough | representative screenshots+functional captures+feedback | No unreachable controls/false status, usable focus/labels/error feedback; independent owner demonstrates edit→preview→rollback |
| T25 | Service discovery and service→case→brief end-to-end (S10/S11/S14) | In all five locales follow Home CTA→Services scope/inputs/inclusions→CONCEPT Work→Contact guided synthetic brief; repeat representative mobile/tablet/desktop with JS on/off where links apply | HTTP/link crawl + Playwright flow + user-review notes | Every real route works; service process is understandable, scope/CTA actionable, no fake timelines/prices/clients, no dead link; no-JS basic content accessible |
| T26 | Three transparent concept case studies (S11/S16/S19) | For three existing case IDs verify problem→approach→artifact→learning narrative, original asset license provenance and decorative/functional alt distinctions in five languages | JSON field parity report, case screenshots and artifact/license inventory | 3/3 clearly DEMO, genuine conceptual design details, no fake outcome/KPI/testimonial or copied competitor art; no inaccessible missing media |
| T27 | Six-kit decision support and states (S12/S13) | Inspect six demo kit detail attributes, filter/search/reset/count/empty state, native details when JS off, demo credits, quantity/total/receipt after selection; optional comparison only when built | Catalog DOM/functional tests across 5 locales and mobile/tablet/desktop, no-result and corruption cases | Intended audience/deliverables/exclusions visible, fictional units unambiguous, zero/no-match clear, totals integer-safe, no real commerce/PII endpoints |
| T28 | Anonymous project-brief simulator safety/usability (S14) | Simulate choosing service→objective→scope→summary→copy/download/reset; invalid/blank/long input, JS-off fallback, keyboard/touch/RTL and inspect requests/storage | Playwright network trace, local screenshot, field-error+focus checks and empty state | No real name/email/phone captured or stored, no remote send; non-personal synthetic selections only, visible NOT SUBMITTED banner, valid summary and safe reset; no trapped focus |
| T29 | Visitor experience resilience and honest content (S10–S20) | Crawl every built locale/page, trigger 404/invalid route, deny JS, fail optional asset, prefer reduced motion, test View Transition graceful fallback if enabled; inspect breadcrumbs/CTA, no fake schema/metrics | Route report, screenshots, console/network, accessibility/performance baseline, manual false-claim review | Useful 404/recovery, no orphaned/dead internal links, page readable without JS, no forced motion, original licensed media, no false clients/SEO data/traffic or auto-publish |
| T30 | Professional asset workflow and controlled RAM-concurrency (conditional for S06/S10 rebuild, S11/S12/S17/S19) | When GIMP/Blender/connected design tool is used, capture editable source/provenance + original media → optimized static export; compare viewport render, LCP/size, reduced motion and real available/committed RAM during the selected parallel/serial workflow | Source/asset hashes, before-after images, browser performance baseline, OS Available/Commit/Pagefile/GPU sampling and reproducible render notes | No unnecessary quality downgrade due transient RAM reading; useful professional asset passes legal/visual/performance gates, safe rollback and stable run; **not required if such media is not selected** |

**Not every automated test suite must be installed.** Begin with deterministic Node tests and built-in browser DevTools; introduce Playwright/axe/HTML validator only when needed and after dependency/version/privacy review. No scan scores invented. For stress/security testing, only site we own/control and only approved scope.

## 2) Test coverage cross-matrix
| Surface | Persian RTL | Arabic RTL | English LTR | Turkish LTR | German LTR |
|---|---|---|---|---|---|
| Home | required | required | required | required | required |
| Services | required | required | required | required | required |
| Portfolio | required | required | required | required | required |
| Catalog | required | required | required | required | required |
| Contact | required | required | required | required | required |
| Demo checkout | required, **noindex** | required, **noindex** | required, **noindex** | required, **noindex** | required, **noindex** |

For each column, test language switch, nav, basic accessible names and long translations; don't declare translation quality PASS until reviewed. 25 intended indexable pages is a design plan, not actual indexed Google URLs.

## 2A) Responsive test coverage matrix — three primary device classes
**This is a test plan, not test result.** Simulated viewport is a valid CSS-layout check, not a claim of real hardware parity.

| Class | CSS viewport widths | Navigation/UI to verify | Input + accessibility | Language coverage |
|---|---|---|---|---|
| Mobile | 320, 360, 390, 430 | mobile menu, language switch, CTA, catalog/cart/checkout stacked, image crop | touch, keyboard/focus, zoom/reflow, portrait and sample landscape | fa RTL and en LTR each milestone; ar/tr/de full gate |
| Tablet | 600, 768, 820, 1024 | 1–2/3 col as content allows, menu state, filters and form + cart layout | touch/pen/hybrid, keyboard, portrait↔landscape state | fa/ar RTL + de long text mid-stage; all five full gate |
| Laptop/desktop | 1024, 1280, 1440 | desktop nav, multi-column cards, readable line length, focused CTA | mouse/keyboard/hybrid touch; zoom; contrast | fa/en and long German/Turkish labels; all five full gate |
| Wide-screen check | 1920 (optional) | sane max-width, no stretched text/cards, stable hero | keyboard/mouse | fa+en representative |

**Three-class milestone gate:** at S08 first smoke 390/820/1366, at S09/S10 navigation+hero on 3 classes, S11–S14 each feature smoke in 3 classes, S16 reflow/zoom/RTL, S17 mobile+desktop performance, S18 full viewport/locale functional matrix, S19 evidence of each class and S20 real-hardware check where possible.

**Language × screen practical coverage:** full route links and metadata for all five locales across all six page types are deterministic checks; visually/behaviorally test at least Home/Catalog/Mock Checkout in all five locales and all three screen classes, and remaining page kinds with representative locale/class samples plus risk cases. This keeps the 30-route × 12-width exhaustive screenshot explosion out of the default low-RAM setup, while still requiring no known broken class/locale combination. Increase coverage wherever a failure suggests a gap.

**Pass rule:** never tick a stage if any of the three primary classes has a blocking layout/interaction failure (unreachable controls, invisible focus, unintended page overflow, wrong language navigation, broken cart/form). Wide 1920 is a useful additional check, not a required fourth codebase. Target WCAG 2.2 AA reflow at 320 CSS px; 24×24 CSS px minimum touch targets includes specified exceptions; prefer larger actual touch affordance.

## 3) Concrete safe commands to consider at implementation (NOT RUN now)
These are illustrative snippets only, not instructions to install or run now:
```powershell
# only inside verified approved local project directory
git status --short
git diff --check
node --version
node --check .\site\assets\js\cart.js
node --test .\tests\cart.test.mjs
# Static preview through an approved existing Node HTTP script, localhost only.
# Browser testing depends on available approved browser runtime.
```
To verify link and locale invariants, prefer small Node scripts using built-in `fs` and HTML URL parsing, or a reviewed HTML validation library. Avoid dangerous `npm install -g`, `npx package@latest`, shared browser profile, unsolicited OAuth, public deploy or port exposure.

## 4) Cost, RAM, privacy and provider gate
- Core libraries in the output are none; Node/Git/browser available. Fonts/icons only approved self-host source. Project software and test-tool source may be free under licenses, but SaaS/hosting/merchant/analytics payments **unverified** until chosen.
- **Owner correction 2026-11-22:** Windows hardware has 2×4GiB installed, ~6020MiB visible. Prepare intensive sessions toward **~2048MiB free**, then run appropriate professional graphics/design and test tools **concurrently if real measurements support it**. One worker/one browser is a baseline, NOT a hard maximum. Monitor Windows Available/Committed/Pagefile/GPU/response and adapt settings gradually; historical 100MiB was emergency risk, not a preferred operating target. Preserve VPN/Bridge and unsaved work; avoid Docker if architecturally unnecessary, not merely due to low current RAM.
- Development/output on laptop and GitHub: repository is public; no private sample from another project, customer data, login tokens or profile sessions.
- No real card processing, user registration, public launch or sending private data to third parties. Future production features require new technical model/consent/security and commercial authorization.

## 5) Evidence shape when a stage is executed
Use the **existing stage checkbox itself** in `03-EXECUTION-ROADMAP.md` and fill below it:
- `Stage:` Sxx | `Commit:` SHA or local path | `Time:` ISO with timezone
- `Evidence:` command/test result and screenshot/repro steps | `Status:` PASS/FAIL/BLOCKED/NOT TESTED
- `Risk/rollback:` what changed, how to undo
- `Next dependency:` one clear next stage
Do not make a second status/counter file. Only tick **parent M01** after final evidence and owner evaluation.

## 5A) Content-management dashboard test contract (S14A added 2026-11-22)

- **Local operator-only**: Console source and draft state must be outside public `site/`; preview over LAN at port 4174 is never an administrator. Gate on an explicit `127.0.0.1` editor endpoint if implemented.
- **Functional end-to-end**: User edits two localized synthetic content entries, sees validation and content diff, saves a draft that survives reload/restart, previews a real resulting page, imports/exports a validated JSON copy, and can revert. A static mock screenshot is not a PASS.
- **No user accounts/revenue**: Dashboard overview can show verified content counts (30 planned routes, 5 local Home currently built, 6 services, 3 concept cases, 6 demo kits), locale coverage and real test data. Never fabricate visitor stats or purchased orders.
- **Permissions / security**: No remote editing, Git credential in browser, authentication claim, real payment or PII. Check malformed input, unsafe markup, duplicate ID, link to private files, accidental admin inclusion in public build, stale draft conflicts, and rollback.
- **Responsive and a11y**: Mobile 320/390, tablet 820/1024 and desktop 1366; RTL fa/ar, LTR en/tr/de; keyboard/visible focus, touch, form errors, unsaved warning, empty/loading states and zoom.
- **Dependency chain**: Run S14A after S14, then include T21–T24 in S16/S18/S19/S20 gates. A new CMS/Auth/hosted service is not authorized by this plan. S14A is an **additional mandatory extension** under the existing 20-step roadmap; M01 parent remains unchecked.

## 5B) Professional five-language studio UX proof — reviewed 2026-11-22

**Scope is still the six existing page kinds (30 planned localized routes) plus optional root chooser and local-only operator S14A; no 7th public page or new model.** Added T25–T29 as **future tests**, not present-tense PASS. Related mandatory features are mapped to existing S10–S14; cross-cutting reliability S15–S20. The operator-specific tests are T21–T24.

- **Narrative:** in every locale, visitor should find a meaningful value proposition, coherent six-service scope/process, 3 fictional **DEMO** cases with explicit narrative and original artwork, 6 synthetic kits with understandable comparable specifications, and a truthful Contact flow. No client outcomes, ratings, timelines or testimonials may be fabricated.
- **Guided intake:** S14 brief simulator makes selections locally for a *fictional* requirement and gives a reviewable/copyable summary. No real email/name/phone, authentication, server POST, third-party SDK, analytics or background transfer. No-JS fallback explains how to browse scope but never pretends submission happened.
- **Site-level quality:** semantic headings/breadcrumbs, meaningful state/error messages, 404 recovery, action labels, local link integrity, language-switch parity and accessible keyboard/touch/focus across three device classes. Motion is purely optional progressive enhancement: if unsupported, no-JS or reduced-motion, navigation still works.
- **Operator integrity:** T21–T24 additionally require draft change review against canonical `content/i18n.v1.json`, validation of all five locales before output, asset/alt/licenses, failure/rollback, and **public server isolation**. No placeholder dashboard screenshot can pass.
- **Evidence:** Node deterministic tests + actual Edge browser smoke + minimum visible screenshots per representative viewport for each implemented feature; a source citation is not evidence of implementation. Each stage remains `[ ]` until its own tests pass. References and prioritization live in [01 Brief §11](01-RESEARCH-AND-BRIEF.md) and [04 Contract §9](04-I18N-SEO-COMMERCE-SECURITY.md).
- **Excluded by default:** real CRM, purchases, authentication, paid APIs, CMS, online admin, chatbots, newsletters, tracking, speculative PWA caching, mandatory 3D. Any added provider or production service needs a separate documented need, reliable free-tier/cost verification and approval.

## 5C) Reusable actual-tool QA protocol (audited 2026-11-22; NOT a test execution)

**Audit provenance:** The S10-completed local laptop was inspected read-only. Playwright 1.65.1 / @playwright/test, axe-core 4.14.1, html-validate 11.21.1 and Prettier 3.10.1 are resolvable from the **existing M01-Prep/qa package context**, not automatically from the M01 source tree, and not guaranteed globally. Node 24.22.1, Chrome 157, Edge 158 and Git 2.55 are installed. S08–S10 pass results used Edge/Playwright and Node; **no axe/HTML-Validate/Lighthouse score exists yet**. Installation snapshot is the single [parent tools registry §N](../../tools/REGISTRY.md); actual stage tool placement is the [M01 profile §7](02-STACK-TOOLS-AND-MCP.md). This QA matrix remains a **plan** for unexecuted checks.

| Existing acceptance cases | Required smallest tool | New/retrospective usage rule |
|---|---|---|
| T01–T07, T25–T26 — pages, routes, journeys, conceptual work | Native Node URL/JSON/HTML checks + existing Playwright/Edge E2E | Repeat 5 locales × mobile/tablet/desktop; HTML-Validate can find markup errors after baseline. Old PASS must not be reattributed to new analyzer |
| T08–T11, T24, T29 — RTL, reading order, keyboard, motion, focus | axe-core 4.14.1 injected only into isolated local test pages, Playwright + manual keyboard/touch/zoom/reading review | Save rule IDs/severity/elements/evidence; automated tests **cannot** claim full WCAG compliance. Browser reduced-motion and no-JS fallback required |
| T12–T19, T27–T28 — demo cart, contact, security, recovery | Node built-in test for state/math/validation + Playwright one-worker browser/network; offline HTML-Validate | No PSP/PII/remote POST, inspect public/LAN request paths; fail with clear reproduction, don't infer safety from a clean static scan |
| T20, T25 and T29 — load/SEO/overall handoff | Chrome DevTools Performance/Lighthouse already in Chrome + native link checks and original-asset size measurements | Separate real runs on representative mobile/desktop; record actual scores and runtime constraints. Zero scores before execution |
| T21–T24 — S14A local content studio | Node/Git draft/validate/backup+rollback tests + Playwright UI + HTML-Validate and axe + manual operator walkthrough | Loopback-only editor, negative external/LAN access checks, real diff/preview and version recovery. Figma/Penpot cannot substitute for editor authorization |

**Rebuild/QA procedure, free-first and reproducible:**
1. Read target source, verify branch/diff, hardware/OS-usable RAM and installed tool versions, keep Node preview loopback-only. **Aim for ~2048MiB available before high-demand work** by reversible approved preparation, then evaluate Blender/GIMP/multiple browsers based on expected professional value and measured responsiveness; no blanket exclusion.
2. Use the current Node renderer, Node built-in tests and Playwright/Edge with a **measured initial worker profile**, increasing concurrency when RAM/commit/performance headroom permits; otherwise sequence without reducing five-language/JS on-off/device acceptance coverage. For a new feature test 390/820/1366 first and expand risk-based.
3. Use offline HTML-Validate for a **measured baseline** before making validation mandatory; inspect configuration and report false positives vs HTML Living Standard. Use Prettier in **check/diff only** mode, never indiscriminately reformat all generated files without updating the generator.
4. At S16/S18 integrate the already-present axe-core with a reviewed local Playwright script. Store test input/URL, version, WCAG rule finding, affected DOM/locale, evidence and remediation in the corresponding **existing stage**, not a new current-status log. Pair with human review based on W3C evaluation guidance.
5. In S17 measure Lighthouse/Performance via built-in Chrome DevTools instead of installing a second CLI by default; capture CPU/connection/device and actual 75th-percentile **field** values only if real field data exists. Local lab score is not field data or production proof.
6. Prettier/HTML-Validate/axe modules in M01-Prep/qa **must not** become an implicit runtime dependency or leak npm artifacts to site/. Any committed QA dependency later requires pinned version/license/security review and explicit bounded scope. No npx fetching, no install/upgrade/paid API/permission changes in this audit.
7. Re-run Node smoke whenever the content schema, five-language render or public routes change. W3C screen reader, zoom/reflow, manual linguistic approval, copyright/licenses and physical-phone checks remain separate, and stage PASS still requires independent evidence.

**Official sources:** [Playwright docs](https://playwright.dev/docs/browsers), [HTML-Validate](https://html-validate.org/), [Prettier check](https://prettier.io/docs/cli), [axe-core](https://www.deque.com/axe/axe-core/), [Chrome DevTools Lighthouse](https://developer.chrome.com/docs/lighthouse/overview), [W3C evaluation tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/), [GitHub dependency security](https://docs.github.com/en/code-security/concepts/supply-chain-security/supply-chain-security).

**Status:** Tool-to-test MAPPING ONLY; no new S-stage PASS, test result, cloud plugin activation, dashboard feature or actual Lighthouse/axe scan is claimed.


## 5D) Professional multi-tool resource and asset-quality acceptance (2026-11-22, owner correction)

The earlier snapshots of 535MiB free were **not an architecture ceiling**. New observed available RAM: 1664MiB (repeat 1613MiB), OS-visible ~6020MiB, physical modules 2×4GiB; user-directed **~2048MiB preflight preparation target** (difference at first check 384MiB). Pagefile ~8644MiB is virtual commit support, not additional physical RAM. Blender 5.3.0 and GIMP 3.2.8 both successfully returned installed executable versions; heavy rendering has **NOT** been tested.

**Workflow to accept a professional toolchain:** Specify why GIMP, Blender, Penpot/Figma or other existing professional tool improves the actual NOVA artifact (e.g. original case-study imagery or editable advanced admin UX). Prepare memory by inspecting apps and safely closing only owner-approved disposable work. Pilot the **chosen combination**, including beneficial concurrent design+browser sessions, and sample Windows Available RAM, commit/limit, pagefile, GPU/CPU and UI responsiveness. Tune scene polygon count, render samples, image-cache size and browser worker parallelism in small reversible steps. If concurrent rendering truly causes severe paging/lag, serialize expensive stages while keeping the **same final visual quality and full QA coverage**.

**Acceptance when advanced media is selected:** T30 is CONDITIONAL on chosen toolchain, not a forced dependency. Record program versions, project scene/design file, license/source provenance, optimized web export and measured before/after in five-language pages. Compare asset size, aspect ratio, LCP/CLS and reduced-motion behavior, keyboard/RTL fallback, CPU/GPU/memory stability and rollback. A 2GiB starting buffer does **not** guarantee every Blender scene can finish smoothly; historical 100MiB emergency mark is not normal budget. No undisclosed account login/paid operations/automatic publish or closing VPN/remote bridge.

**Scope:** These are future acceptance/test methods. No retroactive S01–S10 PASS upgrade, no claim that GIMP/Blender generated past site assets, and no new tests executed by this documentation update. Authority for tool policy is [parent REGISTRY §O](../../tools/REGISTRY.md), M01 role selection is [02 §8](02-STACK-TOOLS-AND-MCP.md), and stage ownership remains [03](03-EXECUTION-ROADMAP.md).

## 6) Finish-line review by person
- Visual originality and legibility on mobile in both RTL and LTR.
- Minimum real flows: navigate and switch language, inspect services/cases, filter products, add to cart, mock checkout and reset.
- Confirm sample's identity as fictional/demo: no false client stories, purchasable items or pretend bank payments.
- Distinguish **professional deploy-ready structure** from **verified live site**. Search rankings, PageSpeed field scores, KYC/PSP eligibility and customer conversion are not measured in this plan.
- No deployment or actual provider activation without explicit later approval.

## 5D) Production security/account/order acceptance — NEW T31–T45 (2026-11-22, ALL PLANNED / NOT EXECUTED)

**Dependency:** S12A confirms scope/contracts before production P00–P18. Existing T01–T30 remain demo criteria; **T21–T24 apply only to the local S14A editor**, not an authenticated admin portal. No `T31–T45` can be marked PASS via screenshots, mocked accounts, UI role flags or documentation; real server/DB and independent negative tests are required before live activation.

| ID | Real I/O + attack/failure exercise | Strict PASS gate / evidence |
|---|---|---|
| **T31** Registration/Email | duplicate/invalid IDNA email, normalization policy, generic errors, resend/expiry/one-time proof, existing account enumeration, concurrent requests | verified email only after legitimate issued challenge; audit/retry/rate-limit, no account enumeration |
| **T32** Phone challenge | E.164 country codes, SMS provider unavailable, wrong/replayed/expired OTP, resend and lockouts, number change, duplicate verification | cannot activate without successful unique code verification; no true SMS sends or costs without approved provider |
| **T33** Membership code | two proven channels, parallel activation requests, retry after crash, changed contact, account suspension | exactly one immutable customer_id and unique random nonsecret membership_code; no code as authenticator |
| **T34** Customer login/session | credential validation, recovery, cookie attributes, fixation, logout/revoke all, expiry, CSRF, brute-force, browser password manager | session verified server-side; no secrets in storage/logs; equivalent accessible path in five locales |
| **T35** Admin separated login | customer tries `/admin` and APIs, crafted role claims, privilege changes, admin MFA/passkey reset/recovery, invite revocation | server responds 401/403 appropriate, no customer privilege escalation, step-up and audit on risky actions |
| **T36** Object-level authorization | user A guessing user B `membership_code`/order ID, bulk exports, IDOR/BOLA, API param overrides | each resource checked against authenticated internal principal and role; no cross-account leakage |
| **T37** Live catalog/price | client-modified price/quantity/tax/currency, stale SKU, concurrent updates, invalid/unknown IDs | total sourced solely from versioned server catalog in integer minor units; rejection clean |
| **T38** Order idempotency | double-click, parallel tabs, retry after network fail, temporary DB outage, canceled/expired order | one durable intended order, correct ownership and status/line snapshots through restart |
| **T39** PSP callback/payment | forged signature, duplicate/out-of-order event, delayed redirect, timeout, refund/chargeback, mismatched amounts | only verified provider event/reconciled reference changes PAID; no double capture/fulfillment or client-side completion |
| **T40** Fulfillment/receipts | payment event delivered twice, queue restarts, failed email/SMS, rejected entitlement, refund restoration | exactly-once business effect using idempotency/outbox; durable receipt and correct user history |
| **T41** Customer self-service | order view/download own vs other customer, identity change/reverify, disabled account, account deletion/export | ownership preserved; no PII or purchase history leak, retention rules respected |
| **T42** Admin operations/audit | role matrix for content/support/refund/user/owner, logging action origin, export approval, forced downgrade | unauthorized writes denied; sensitive changes audited, reversible where practical; no secrets in logs |
| **T43** Privacy/compliance | consent, purpose minimization, accessible policies, account/data export & deletion, security notifications, legal retention | region-appropriate legal review, minimal records, deletion/export proof and privacy controls |
| **T44** Reliability/load/incident | rate-limit under abuse, email/SMS/PSP outage, backups restorable, worker retry, parallel orders, source upgrade/rollback | monitored health + tested recovery, no silent lost state, fake PAID or repeated charge |
| **T45** Full E2E/launch | five-language mobile/tablet/desktop + accessibility auth 3.3.8; real sandbox verified register→email→SMS→member→buy→signed-paid→delivery; admin review; isolated staging/security test | independent provenance, T31–T44 PASS, approved providers/hosting/country/fees, owner acceptance before public launch |

**No false claims:** Screen-sized mock accounts never count as secure login. Sending a code to a test fixture is not real delivery. Provider eligibility/price/OTP quota are not verified until live official sources and user-specific constraints are checked at P03. After P18, record exact runtime evidence in the **existing [03 roadmap](03-EXECUTION-ROADMAP.md)** under the matching P-stage checkbox, not a second status ledger.

**Official test baselines:** [OWASP ASVS 5](https://asvs.owasp.org/), [Auth](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html), [Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), [API BOLA](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/), [NIST 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html), [WCAG 2.2 Accessible Authentication](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html).

## 5E) Infrastructure readiness test contract — NEW T46–T55 (2026-11-22, ALL NOT RUN)

**S12A/I00–I20/P00–P18 contract:** each I stage requires evidence from actual provider/local fixture, NOT a researched link, MCP connector listing, screenshot or plan. Staging only after approval; live only after explicit owner permission and T31–T55. Tests T01–T45 remain intact. External service may have a free quota without being free for the project's account and country.

| Test | Real test and failure condition | PASS evidence / STOP rule |
|---|---|---|
| **T46** DNS + HTTPS end-to-end | authoritative DNS propagation, subdomain/ownership, valid cert/renewal, HTTP→HTTPS/HSTS plan, edge→origin **Full(strict)** where applicable, Cookie Secure/HttpOnly and no mixed content | measured curl/browser/TLS chain and rollback; deny if free cert but insecure origin |
| **T47** Static host/API limits | five locales pages/asset cache/CDN, 320/820/1366, staging routing and 404/500, cold starts, timeout/body limits, failure simulation and actual commercial-plan eligibility | HTTP/network trace, real error handling and uptime budget; Render sleep/Workers CPU/Netlify credits recorded |
| **T48** DB transaction and free-tier safety | concurrent customer activation/unique code, order state transaction, restart persistence, corruption, RLS/authorization, migration up/down, DB quota/pause | one canonical store, exact state after restart; quota/backup/free-pausing documented, migration controlled |
| **T49** Backups and disaster recovery | encrypted offsite backup, backup age/retention, restore to disposable DB, forced bad migration/server loss, no plaintext secrets | measured RPO/RTO and verified sample restore; no dependency on temporary free DB alone |
| **T50** OTP email + SMS delivery | SPF/DKIM/DMARC, bounce/suppression, verified single-use email link, legal recipient reachability/price of real SMS, failure/timeouts/retry, cost-limit attack test | mock PASS only dev; real provider provenance + country/cost approval required to pass live |
| **T51** IAM/secret/least privilege | independent customer/admin login, MFA, DB/service account scopes, secret leakage scan, role downgrade/revoke, GitHub/Provider permission boundaries | deny-by-default 401/403, revocation works, no secret in logs or source |
| **T52** Payment adapter and money | sandbox signed webhook, duplicate/forged/late events, origin verification, legal PSP/merchant country, refund, idempotency and price_minor vs DEMO_CREDIT | live eligibility/fees confirmed, no PAN/CVV, only signed settlement updates order |
| **T53** Queue/media/notifications | outbox worker restart, idempotent deliveries, dead-letter, optional file signed URL/ACL/retention, misconfigured public bucket and account quotas | exactly-once business effect with retry; unused queue/storage not provisioned unnecessarily |
| **T54** Security/observability/billing | WAF/rate limit, Turnstile server validation, log redaction, OTP pumping, uptime, error alerts, Free quota thresholds, billing/card/overage lockout | test alerts and cap/hard stop; UNKNOWN spending or region = DENY activation |
| **T55** Reproducible staging→production readiness | isolated staging users/DB/keys, preview build, CI, legal pages, five-language flow, owner rehearsal, rollback and permissions | approved production rollout only after T31–T54 and I00–I20, independent owner sign-off |

**Evidence rule:** record I-ID/test ID, provider/account project label (nonsecret), official URL + checked date, quota/price/overage, exact result, failure, security/rollback, local script + Git commit and owner approval state in [03 canonical roadmap](03-EXECUTION-ROADMAP.md). Do not put API keys/OTP/credentials or customer records into reports, Notion, ChatGPT or GitHub. No I-checkbox is PASS in this research-only update.
