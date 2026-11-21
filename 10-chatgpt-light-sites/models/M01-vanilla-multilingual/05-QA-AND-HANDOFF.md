# M01 — ماتریس تست، معیار پذیرش و تحویل نمونه‌کار
**State:** TEST PLAN ONLY — zero tests executed and zero claims of real compatibility.  
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
- Windows laptop 8GB RAM: one browser worker, one localhost server; stop/pause heavy execution if available RAM approaches user emergency 100MiB. Avoid Docker/parallel agent processes.
- Development/output on laptop and GitHub: repository is public; no private sample from another project, customer data, login tokens or profile sessions.
- No real card processing, user registration, public launch or sending private data to third parties. Future production features require new technical model/consent/security and commercial authorization.

## 5) Evidence shape when a stage is executed
Use the **existing stage checkbox itself** in `03-EXECUTION-ROADMAP.md` and fill below it:
- `Stage:` Sxx | `Commit:` SHA or local path | `Time:` ISO with timezone
- `Evidence:` command/test result and screenshot/repro steps | `Status:` PASS/FAIL/BLOCKED/NOT TESTED
- `Risk/rollback:` what changed, how to undo
- `Next dependency:` one clear next stage
Do not make a second status/counter file. Only tick **parent M01** after final evidence and owner evaluation.

## 6) Finish-line review by person
- Visual originality and legibility on mobile in both RTL and LTR.
- Minimum real flows: navigate and switch language, inspect services/cases, filter products, add to cart, mock checkout and reset.
- Confirm sample's identity as fictional/demo: no false client stories, purchasable items or pretend bank payments.
- Distinguish **professional deploy-ready structure** from **verified live site**. Search rankings, PageSpeed field scores, KYC/PSP eligibility and customer conversion are not measured in this plan.
- No deployment or actual provider activation without explicit later approval.
