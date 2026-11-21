# M01 — ماتریس تست، معیار پذیرش و تحویل نمونه‌کار
**State:** TEST PLAN ONLY — zero tests executed and zero claims of real compatibility.  
**Build plan:** [03 Execution Roadmap](03-EXECUTION-ROADMAP.md); [04 i18n/SEO/payment/security](04-I18N-SEO-COMMERCE-SECURITY.md).

## 1) What we will actually test
| ID | Test target | Test input / procedure | Evidence required | Pass criterion |
|---|---|---|---|---|
| T01 | Git isolation | `git rev-parse --show-toplevel`, current branch, `git status` and diff before/after | branch/path+diff | only `models/M01-vanilla-multilingual/` changed, no 09 and no main |
| T02 | Local preview | Serve static site on `127.0.0.1`, open Home with JS on/off | HTTP result/browser screenshot | real page loads, content and links available without JS |
| T03 | Locale availability | request `fa en ar tr de` home + 5 page kinds | machine-readable coverage report | 5×5 = 25 intended public static routes exist and have nonempty content |
| T04 | Language switching | on each kind switch to every other language and back | route traversal/screenshot | equivalent route, correct URL, `lang`, `dir`, language stays consistent |
| T05 | RTL/bidi/layout | fa+ar with Latin product names and localized numbers; tr/de long labels | screenshots at six widths | correct `bdi`, no reversed codes, no inaccessible nav/overflow |
| T06 | SEO metadata | HTML parse, title/H1/description, canonical/self, robots, hreflang reciprocal | 25-page report | unique meaningful metadata, no broken alternates or fake schema |
| T07 | Sitemap/crawl | all public URLs reachable via native anchors, sitemap entries and sitemap absolute URLs | link report | no internal 404s; demo checkout excluded from public index/sitemap |
| T08 | Accessibility keyboard | Tab/Shift+Tab/Enter/Escape, skip link, nav, tabs/cart, focus visible | manual checklist plus browser capture | predictable focus, no keyboard trap, landmark/label semantics |
| T09 | Accessibility automated | axe-core where available, manual alt/contrast/heading review, reduced motion | violation log with severity and fix | zero known critical/serious findings; manual accessibility gate signed off |
| T10 | Responsive/device | 320/360/390/768/1024/1440 widths; pointer and touch emulator | screenshot matrix | no accidental horizontal overflow, CTA/menu/cart usable |
| T11 | Catalog interactions | 4–6 synthetic products, filter/search, no-match and reset | automated interaction log | result counts consistent and messages accessible |
| T12 | Cart arithmetic | qty=0,1,max, negative, NaN, unknown ID, corrupted storage, integers | `node --test` results | guarded quantities and deterministic totals, no currency conversion |
| T13 | Mock checkout safety | follow catalog→cart→receipt and inspect network/DOM | screenshot + network test | visible DEMO warning, no PAN/CVV/PII, no external payment/API call |
| T14 | Forms and privacy | input invalid/empty/form submit, check storage/network | capture | demo form never sends personal data; no analytics/tracking cookies |
| T15 | JS/runtime errors | browser console, DOM no-JS, failed asset, offline fixture | error evidence | important content still visible, clear error/empty states |
| T16 | CSS motion/contrast | OS `prefers-reduced-motion`, high zoom 200%, high-contrast where available | screenshots/manual log | no essential motion, readable text and focus |
| T17 | Images/fonts licensing | list included files and license provenance | dependency/asset credits | no unlicensed fonts/icons/stock or external copyrighted asset |
| T18 | Performance | Lighthouse in Chrome/Edge, inspect LCP/CLS, JS sizes, requests | run report with device/test params | internal aspiration ≥90 scores; explicit failures/limits and no false CWV field claim |
| T19 | Security hygiene | text scan for secrets, forbidden endpoints and unsafe DOM APIs | `git grep`/manual review | no keys/passwords or untrusted `innerHTML`; no insecure paid endpoint |
| T20 | Customer handoff | clean checkout of branch, follow README run steps, review on actual mobile if possible | repo SHA + commands + owner feedback | reviewer can operate all primary flows and inspect proofs without private PC files |

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
