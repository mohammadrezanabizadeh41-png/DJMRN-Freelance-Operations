# M01 — مهندسی ابزار، کتابخانه، MCP و تصمیم استفاده
**Research date:** 2026-11-21 | **Scope:** pure HTML/CSS/JS site; no coding agents, no Vite, no WordPress in M01.  
**Shared comprehensive parent registry:** [../../tools/REGISTRY.md](../../tools/REGISTRY.md). This file is **only the selected project profile**, not an alternative authoritative catalog. Tool inventories and download status must be reverified immediately before running.

## Tool roles and availability vocabulary
- **CONNECTED-CHAT:** exposed and successfully queried by this ChatGPT turn.
- **INSTALLED-OS / CLI:** local command/Windows app exists, but new M01 behavior not tested.
- **ARCHIVE:** package downloaded elsewhere, not equal to installed or running.
- **CANDIDATE:** code/docs exist, but local prerequisites, runtime, permissions and costs remain unverified.
- **DIRECT MCP ≠ MCP Client ≠ CLI:** running a tool through Bridgerator PowerShell is not a new MCP connection in ChatGPT.
- **No automatic installation, OAuth, paid API, cloud/service enrollment, new MCP grants or public deploy.**

## 1 — Core, for first working HTML slice
| Tool/source | Class, source | P-phase and use | Device/connection evidence | Why selected / costs |
|---|---|---|---|---|
| **GPT-6 in this chat** | model reasoning, editing decisions, NOT source authority | all: specification, code generation/review | active | use existing ChatGPT access; no new agent |
| **Bridgerator** | direct laptop MCP | S01–S20: read files, run PowerShell, source patch, Node/test | **CONNECTED-CHAT** DJMRN-LAPTOP live online 2026-11-21 | primary executor; no new install |
| **GitHub connector** | connected Git authority | branch and file review, commit, diff | **CONNECTED-CHAT** | canonical source, keep M01 independent of main/09 |
| **Git** | [git-scm](https://git-scm.com/) / version control | diff/restore/commits and inspect repository root | previously verified installed 2.55.0 | deterministic, no model quota |
| **VS Code** | [microsoft/vscode](https://github.com/microsoft/vscode) / optional text editor UI | editing files, debugging, manual inspection | previously installed 1.142.0; not an MCP server in this chat | use existing; GPT-6 can edit via Bridgerator anyway |
| **HTML5, CSS, JS Web APIs** | [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML); CSS; [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | rendered site itself | browser-native | **M01 runtime**, zero application dependencies |
| **Edge/Chrome local browser** | browser/devtools | interactive render, responsive, keyboard, network and console | previously available; reverify at S01 | single test browser/profile, localhost only |
| **Node.js 24.22.1** | [nodejs/node](https://github.com/nodejs/node) / optional development-only | simple loopback dev HTTP server, `node --test`, `node --check`, URL/sitemap validation | installed in prior live test | zero additional test packages for first slice |
| **Python 3.14.7** | [python/cpython](https://github.com/python/cpython) / backup CLI | simple preview `py -m http.server` if Node preview unavailable | installed | choose Node **or** Python server, not both |

**Minimal executable vertical:** five language-linked Home HTML documents + base CSS + locale navigation JS + one service card/CTA. Test with local browser via existing bridge. Add cart only after this is real.

## 2 — Actual libraries/assets suitable for pure web (no framework)
| Candidate | OSS source/license evidence | Concrete value | Trigger; status; cost gate |
|---|---|---|---|
| **Vazirmatn** | [rastikerdar/vazirmatn](https://github.com/rastikerdar/vazirmatn) — OFL font | readable Persian/Arabic with self-host `woff2` | S06/S09; **CANDIDATE**, inspect selected version OFL/bytes before copying |
| **Inter** | [rsms/inter](https://github.com/rsms/inter) — OFL | Latin typography incl. English/Turkish/German; variable font if warranted | S06/S09; **CANDIDATE**; system font fallback if too large |
| **Lucide SVG** | [lucide-icons/lucide](https://github.com/lucide-icons/lucide) — ISC | concise consistent icons; embed only needed SVGs with license notice | S06/S10–S14; **OPTIONAL**, no live CDN dependency |
| **CSS logical properties/Container Queries** | [MDN logical CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values) / [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) | RTL/LTR margins/paddings, responsive bento cards and long labels | browser built-in, **SELECTED** only where support checked |
| **Intl APIs** | [MDN Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) | locale-sensitive number, date and demo currency formatting | native JS, **SELECTED**; cannot be trusted as payment pricing backend |
| **View Transitions API** | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) | smooth optional navigation/cart updates | **DEFER** until basic navigation tested + prefers-reduced-motion fallback |
| **Prettier** | [prettier/prettier](https://github.com/prettier/prettier) | format HTML/CSS/JS consistently | **OPTIONAL** for growing project; not installed by this task |
| **HTML-Validate** | [official](https://html-validate.org/) / [GitHub mirror](https://github.com/html-validate/html-validate) | offline HTML structure validator; no source uploaded | S16/S18, **OPTIONAL** if built-in/manual validator insufficient |
| **ESLint** | [eslint/eslint](https://github.com/eslint/eslint) | static JS correctness rules | S17, **OPTIONAL** when modules grow; Node --check first |
| **SVGO** | [svg/svgo](https://github.com/svg/svgo) — MIT | SVG file size reduction | S06/S16 only if original vector asset large; **CANDIDATE** |
| **Sharp** | [lovell/sharp](https://github.com/lovell/sharp) — Apache-2.0 | resize/convert images to WebP/AVIF | S06/S16 only for many assets, **CANDIDATE**; image app alternative |
| **GIMP/Inkscape** | [GIMP](https://www.gimp.org/); [Inkscape](https://inkscape.org/) desktop | original local graphics/assets | GIMP previously installed, Inkscape status unverified; GUI via available tool only when required |
| **ScreenToGif / ShareX** | [ScreenToGif](https://github.com/NickeManarin/ScreenToGif) / [ShareX](https://github.com/ShareX/ShareX) | record approved demo interaction and screenshot evidence | S19, **OPTIONAL**; source-only/laptop status check |

**Avoid for M01 runtime:** jQuery, Bootstrap, Tailwind, React, Vite, Astro, WordPress, UI animations packages, external translation API, cloud fonts, heavy 3D. Add only after a measurable need, and reconsider model ID if application architecture changes.

## 3 — Testing & SEO diagnostics — direct CLI first, MCP later
| Tool | Source | Test task | Cost/permission/selection |
|---|---|---|---|
| **Browser DevTools** | existing Edge/Chrome | network, console, mobile simulation, accessibility inspection | **FIRST**; no additional server |
| **Node built-in test** | https://nodejs.org/api/test.html | cart arithmetic pure functions, i18n key matching, sitemap/hreflang reciprocity scripts | **FIRST**; no npm package |
| **Playwright library / test runner** | [microsoft/playwright](https://github.com/microsoft/playwright) | S15/S18 screenshots across 5 languages and 320–1440 widths, keyboard, cart | **CONDITIONAL**; verify whether existing installation works and browser resource/RAM; do not auto-download |
| **Playwright MCP** | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | agent-driven snapshots/interaction if CLI cannot capture a needed workflow | **NOT CONNECTED** to ChatGPT; requires client bridge/approval |
| **Chrome DevTools MCP** | [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | deeper console/network/performance debugging | **NOT CONNECTED**; overlap with existing DevTools; S17 only if gap |
| **Lighthouse** | [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse) | perf/accessibility/best practices/SEO diagnostic | **S17/S18**, prefer existing browser DevTools; 90 target is local goal NOT verified score |
| **axe-core** | [dequelabs/axe-core](https://github.com/dequelabs/axe-core) | WCAG automated checks per locale | **S18**, free OSS core, manual screen-reader/keyboard also necessary; no paid Deque cloud |
| **SiteOne Crawler** | [janreges/siteone-crawler](https://github.com/janreges/siteone-crawler) | internal link audit for 25+ HTML pages | **OPTIONAL** if deterministic Node link check insufficient |
| **MCP Inspector** | [modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector) | test remote MCP server tools/permissions before connecting | **ONLY IF NEW MCP**; not a website-building requirement |
| **Anode/Ghost MCPB** | see [parent registry](../../tools/REGISTRY.md) | optional GUI background if Bridgerator cannot reach test window | **NOT CONNECTED; NOT SELECTED**, security and RAM unknown |

## 3A — ابزار انتخاب‌شده برای طراحی و QA چندنمایشی
| مرحله/نیاز | ابزار فعلی / روش | خروجی واقعی | ابزار تخصصی فقط در صورت ضرورت |
|---|---|---|---|
| S04/S06 — Grid و تغییر چیدمان | **CSS Grid, Flexbox, `clamp()`, media queries و logical properties**؛ همه native browser | طرح واحد موبایل/تبلت/دسکتاپ بدون JS برای layout | Container Queries در صورت استفاده مجدد از کارت در عرض‌های مختلف (خود CSS است، افزونه نیست) |
| S06/S17 — تصاویر واکنش‌گرا | native `picture`, `srcset`, `sizes`, `aspect-ratio` | حجم متناسب تصویر و عدم اعوجاج/CLS | Sharp یا SVGO برای تعداد زیاد تصاویر، بعد از بررسی نصب/مجوز |
| S08–S14 — تکرار smoke | **DevTools مرورگر موجود** + preview loopback از Node/Bridgerator | عرض 390/820/1366، بررسی keyboard/touch و screenshot | **Playwright CLI** فقط اگر runtime از قبل قابل استفاده یا نیاز اثبات شود |
| S16/S18 — reflow و a11y | zoom مرورگر + keyboard/touch دستی، `lang/dir` | 320px reflow، 200% text zoom، 400% browser zoom در سناریوی مرتبط | **axe-core** برای lint دسترس‌پذیری، نه جایگزین تست دستی |
| S17 — عملکرد موبایل/دسکتاپ | browser Performance panel / Lighthouse موجود | گزارش جداگانه موبایل/دسکتاپ، بدون ادعای نمره قبل از اجرا | Chrome DevTools MCP فقط اگر gap واقعی و اتصال جدا تأیید شود |
| S18–S20 — تست/تحویل سه کلاس | Node test برای logic، browser capture و بازبینی کاربر | شواهد گوشی، تبلت و لپ‌تاپ/دسکتاپ؛ واقعی در صورت دسترس، در غیر این صورت emulated با برچسب | Playwright MCP/Anode/Ghost پیش‌فرض نیستند و **NOT CONNECTED** |

**معماری انتخاب:** یک CSS/HTML واحد با تغییر مبتنی بر محتوای viewport، نه تشخیص مدل گوشی یا user-agent. تست هر سه کلاس در تمام مراحل کار اهمیت دارد؛ **نیازی به نصب نرم‌افزار اضافه برای آغاز طراحی responsive وجود ندارد**. منابع: [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)، [web.dev](https://web.dev/learn/design/media-queries)، [W3C Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

## 4 — Tools/services NOT to activate for this M01 research
| Capability | Reason / proposal |
|---|---|
| WordPress Playground/Studio + WP MCP Adapter, Grav MCP, WooCommerce | these belong to M09–M18; not pure M01, avoid misleading stack fusion |
| Figma/Penpot/MCP graphical design | optional if owner requests editable artboard; manual CSS design/approval first, no extra service by default |
| Email/form backend | real inbound PII requires secure endpoint, consent, retention policy and ownership; for this demo use an explicit local mock |
| Payment provider / Stripe/PayPal/Irani PSP | real integration cannot safely happen with browser-only JS and user/provider eligibility, fees, KYC, API rights remain UNKNOWN. No account, credential or merchant action |
| Analytics/tracking, CDN, font API | creates privacy/legal/deployment dependencies; not needed for local sample |
| Hosting provider | no public domain/deploy approval; GitHub Pages/static hosting later after comparing policy, quota, visibility, copyright, geographical eligibility |
| New AI agents / Codex / Goose / OpenCode | excluded by user's request; model itself is GPT-6, execution through existing Bridgerator |

## 5 — Runtime / environment / memory plan
- **Revised owner direction (2026-11-22):** 8 GiB installed in two 4 GiB sticks; ~6020 MiB OS-visible. Prepare intensive sessions toward **~2048 MiB available**, then test needed **professional tools concurrently** when quality benefits; worker/app counts are adaptive, NOT a hard one-browser ceiling. A base M01 static build does not need Docker/WordPress because of architecture, not because current free RAM forbids sophisticated authoring.
- For preview use only `127.0.0.1` with a fixed dev port after checking availability; do not expose `0.0.0.0` or enable remote port tunneling.
- Choose file patches after `git status`, compare diff and run tests. Do not write to `09-self-marketing-website/` or another machine without explicit scope.
- No package manager global installs or `npx ...@latest` calls. Optional packages require official LICENSE/version, SHA/lockfile, download size, permissions and cost review.
- Never request secret/password/OTP in chat or put it in GitHub.

## 6 — Official evidence / reproducible research
- [Microsoft Playwright](https://github.com/microsoft/playwright) | [Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview)
- [axe-core](https://github.com/dequelabs/axe-core)
- [HTML-Validate local offline](https://html-validate.org/)
- [Vazirmatn](https://github.com/rastikerdar/vazirmatn) / [Inter](https://github.com/rsms/inter) / [Lucide](https://github.com/lucide-icons/lucide)
- [Node test](https://nodejs.org/api/test.html)

**Current status:** tools researched/selected, NOT installed, downloaded, connected or executed by this M01 planning operation.

## 7 — S10-after-action audit: actually available laptop tools and reusable stage policy (2026-11-22)

**This is a selected M01 tool-placement profile, not a second tool inventory.** The canonical verified cross-model installation snapshot and superseded CANDIDATE states live in [parent tools/REGISTRY.md §N](../../tools/REGISTRY.md). Re-read both before reconstructing old stages or running new ones. Earlier sections were planning-time snapshots and should not be interpreted as today's availability claims.

### A. Real use vs present but unused

| Tool group | Prior S01–S10 evidence | Now-verified reusable capability | Decision |
|---|---|---|---|
| Node, Git, Bridgerator, GitHub | **USED** for deterministic render, Git source commits, M01 isolated worktree, QA and local server | Versions Node 24.22.1, Git 2.55; connector online | **DEFAULT** all remaining stages; one canonical data source |
| Edge and Playwright 1.65.1 | **USED** during S08–S10 for actual page/click/touch/keyboard/5-locale screenshots; Chrome installed, not the browser used in those passed E2E tests | Playwright modules resolve from **M01-Prep/qa**, Edge channel msedge; Chrome/Edge local executables | **DEFAULT browser QA**; begin with known worker count, scale after measured headroom and stability rather than banning parallel runs |
| HTML-Validate 11.21.1 | **NOT USED / NOT MEASURED** in the previous PASS gates | Existing offline validator in M01-Prep/qa, no global binary required | **ADOPT from S11 as complementary read-only lint**; baseline first, do not mark past stages newly tested |
| axe-core 4.14.1 | **NOT USED / NOT MEASURED** as axe scan | Existing library in M01-Prep/qa; can be injected into one existing Playwright page after a reviewed non-writing test script | **ADOPT S16/S18**; not proof of complete WCAG conformance |
| Prettier 3.10.1 | **NOT USED** for old generated site; old markup deliberately generated by Node | Existing package in M01-Prep/qa | **OPTIONAL --check/format diff**, not automatic full HTML rewrite; keep generator authority and stable outputs |
| Chrome DevTools Lighthouse/Performance | **NOT MEASURED** as S17 scores | Chrome 157 and Edge 158 installed, Lighthouse available as browser panel according to official docs; CLI not present | **S17** local site analysis, sequential mobile/desktop; baseline and scores only after actual run |
| VS Code, GIMP 3.2.8 | Both installed; GIMP executable returned version 3.2.8 during 2026-11-22 audit. S01–S10 use remains **NOT VERIFIED** | Code review; GIMP professional layered raster/matte/textures for original service, concept and hero artwork | **PROFESSIONAL ASSET OPTION** for S06/S10 revisit and S11/S17; quality+rights+file size decide |
| Blender 5.3.0 | Executable verified and version command returned 5.3.0; no actual M01 scene/render benchmark yet | Original dimensional visual assets: studio motifs, 3D typography, stills/short clips exported as optimized static files | **PILOT-ELIGIBLE** for S06/S10 revisit/S11/S17 when improving quality; test simple scene then scale, not banned by transient RAM |
| Penpot/Figma/Canva/Adobe Express/tldraw tool catalog | **NOT USED** in recorded S01–S10 M01 implementation | ChatGPT tool endpoints advertised, but M01 file, auth, provider quotas/terms and publishing rights unverified | **OPTIONAL REVIEW/PROJECTION**, not source authority nor reason to install/connect. Penpot's free edition exists; actual workspace/plan/limits need verification before action |
| WordPress Studio, Grav, Docker, Codex and parallel browser-control MCPs | Not required for pure static M01 | Other project models / tool roles; memory + auth + maintenance overhead | **EXCLUDE** unless a demonstrated M01 gap justifies documented alternative and owner approval |

### B. Stage-to-tool placement; past stages are *rebuild notes*, not a second PASS claim

| Stage window | Actual need and smallest adequate tool | Upgrade trigger / evidence gate |
|---|---|---|
| S01–S05 (already PASS) | Bridgerator read-only environment check, Git, Node deterministic fixtures, official docs. **Rebuild option:** use existing HTML-Validate/Prettier read-only for preflight only if current source exists | Preserve original evidence, branch isolation and content authority; never re-label planning as execution |
| S06 (already PASS) | Original SVG/CSS/wireframes with system fonts, native responsive design. **Rebuild option:** Penpot/Figma for editable concept/tokens, GIMP for professional textures, Blender for original light pre-rendered scenes; use complementary tools if their outputs improve visual design | Compare original/new, asset/license/perf and measured concurrent tool stability; no claim these apps were used in original PASS |
| S07 (already PASS) | One five-language JSON draft + structural parity and native Intl/RTL. **Rebuild option:** VS Code + Prettier check and locale diff | No automatic translation, human editorial review before publication |
| S08–S10 (already PASS) | Node static renderer and tests; existing Playwright + Edge actual browser on one worker; manual screenshot review. **Rebuild option:** HTML-Validate and axe smoke on a new run, never pretend already done | If new validator finds errors, log new follow-up issue in the current stage evidence; don't erase prior acceptance proof |
| S11–S12 | Shared renderer/content JSON/HTML-Validate/Node/Playwright, plus professional artboard/compositing/render pipeline (Penpot/Figma, GIMP, Blender) when it elevates real case-study imagery and storytelling | Keep static HTML runtime; optional design software is an authoring aid, not a CMS; test asset rights, loading and LCP |
| S13–S14 | Native JS state machine for DEMO cart and anonymous guided brief; Node test for arithmetic/failure; Playwright for real keyboard/touch, network/PII assertions | No payment gateway, real lead form or network integration |
| S14A | Local-only content editor using existing Node, JSON/Git/draft/backup; Playwright UI and schema tests; HTML-Validate, axe and security negative tests | Loopback-only, real edit→validate→preview→recover. Penpot may be used for *design exploration* if needed; cannot supply authentication |
| S15 | Built-in Node link/route/i18n/hreflang/robots checker and offline HTML-Validate; browser manual verification | Crawler or SEO SaaS only if Node link matrix demonstrably insufficient |
| S16 | axe-core in already-installed Playwright+Edge, then manual W3C checks for keyboard, zoom, real translations and assistive tech as available | Automated scanning cannot certify WCAG; no paid accessibility service by default |
| S17 | Chrome DevTools Performance + Lighthouse, Node asset-size metrics, GIMP/Blender-optimized original assets and responsive media when warranted | Optimize delivery with export settings and measured results; WebGL/real-time 3D only on proven use case with device-performance gate, never purely prohibited by RAM snapshot |
| S18 | Existing Playwright 1 worker + Node/HTML-Validate/axe, invalid-state and failure tests, Git diff/CI candidate | MCP browser duplication, remote scanners or cloud test farm only on proven coverage gap and verified cost/permissions |
| S19–S20 | GitHub canonical source, Playwright screenshots/traces, manually inspect actual laptop/phone, owner acceptance; VS Code/Chrome optional | No new screen-recorder install if Playwright images are sufficient; public deploy/login/security actions need separate approval |

### C. Minimal instructions for future rebuild

1. Reconfirm the exact M01 branch, clean Git worktree, no customer data and localhost preview. **Before intensive tasks aim for ~2048 MiB free by safe reversible preparation**. Do not ban Blender, GIMP or multi-browser work; use a monitored workload trial and preserve VPN/bridge/unsaved state. Docker remains an architecture-fit decision.
2. For authored code, run Node built-in check/test and the existing deterministic renderer. The preview must remain static HTML and work when JS is off.
3. Existing test packages are currently **resolved from M01-Prep/qa**; scripts under the M01 source folder must not assume npm dependencies are vendored there. Invoke them from QA directory or reviewed module location. If running several complementary design/QA tools improves output, **measure first and adjust concurrency gradually**, not by installing duplicates. No npx network fallback or silent package install.
4. Apply HTML-Validate as an **independent complementary check**, first measure its baseline and review false positives with code/ARIA source before enforcing. For Prettier use non-writing check/diff first. Axe-core needs browser integration and a manual W3C audit; both unexecuted here.
5. Record tool version, purpose, actual command, result, exceptions, route/locale/viewport, RAM and source commit in the existing stage's evidence; no separate progress/authority tracker. Verify whether a proposed plugin is actually connected and available before claiming it can edit a Penpot/Figma/Canva workspace.
6. If any new dependency is genuinely needed, independently check official license/version/download bytes/locked dependencies, security, privacy, free pricing/quota/overage and rollback; unknown cost or privileges means **STOP**. No installations, paid usage or new sensitive app permissions were approved by this audit.

**Official references:** [Playwright browser channels](https://playwright.dev/docs/browsers), [HTML-Validate offline](https://html-validate.org/), [Prettier CLI](https://prettier.io/docs/cli), [axe-core free OSS](https://www.deque.com/axe/axe-core/), [Chrome DevTools Lighthouse](https://developer.chrome.com/docs/lighthouse/overview), [W3C evaluation caveats](https://www.w3.org/WAI/test-evaluate/tools/selecting/), [Penpot pricing](https://penpot.app/pricing), [GitHub dependency security](https://docs.github.com/en/code-security/concepts/supply-chain-security/supply-chain-security).

**As-of result:** AUDITED and SELECTED only; installed-tool presence is not proof of successful S11–S20/S14A integration. Old S01–S10 PASS and future unchecked boxes remain unchanged.

## 8 — Owner RAM correction and higher-quality professional tool combinations (2026-11-22)

**Canonical resource decision:** The project-wide verified facts and current user correction live in [REGISTRY §O](../../tools/REGISTRY.md). The previous S10 audit's **535 MiB** reading was temporary and is not a capability limit. A new read-only snapshot measured **1664 MiB** available; user proposes preparing to **around 2048 MiB free** before professional sessions (384 MiB gap in that snapshot), without dropping capable tools from scope. The target is **preflight headroom**, not a hard minimum that must remain after a professional application consumes RAM. Hardware: **2×4 GiB physically installed**, about 6020 MiB OS-visible; pagefile ~8644 MiB cannot substitute for RAM throughput. GIMP 3.2.8 and Blender 5.3.0 executable version calls **actually succeeded**, while complex render performance is still UNVERIFIED.

**Change of tool priority:** Instead of a blanket preference for lightweight-only authoring or at-most-one-browser, use the **best suitable combination** for professional site quality and manage actual resource demands. Simple web output remains pure HTML/CSS/JS; advanced **offline authoring** and test tooling can coexist. No extra service is required in production.

| Stage / deliverable | Professional chain considered | Proof required before adopting artifact |
|---|---|---|
| S06 visual design rebuild and S10 hero refinement (already PASS historically) | Penpot/Figma for editable artboard/tokens if authorized, original SVG/CSS, GIMP layered composition, Blender original 3D still or short pre-rendered animation | Measured before/after visual quality, original/licensed files, semantic HTML/RTL, dimensions/asset KB, LCP/motion and rollback. **Do not backfill historical PASS with a claim of new app use** |
| S11 service and three concept case studies | GIMP for original collages, Blender for unique dimensional illustrations, optional editable design file, then Node static generator | User-facing story improved; case media genuinely original, 5-locales, responsive images and actual loading tests |
| S12/S13 DEMO catalog, product visuals and cart | Simple graphics/CSS plus GIMP/Blender as needed for reusable kit imagery; native JS cart & Playwright | Clear fictional items and accurate math, no hidden heavy runtime framework |
| S14/S14A contact wizard and management UI | Penpot/Figma/tldraw for admin workflow and form UX, Node/JSON/Git drafts, real HTML/JS, Chrome/Edge and axe | Genuine operator I/O and accessible interaction; design tool never becomes auth system or data authority |
| S15–S18 full quality | HTML-Validate/axe/Playwright, Chrome DevTools/Lighthouse and optional GIMP/Blender export optimization | Actual rendered lab/interaction results and asset budgets, not guessed scores |
| S19/S20 proof and acceptance | Original design/source files, actual browser captures, reproducible build, physical-phone feedback | Inspect the *professional output*, not whether only one application was used |

**Concurrent execution plan:** Preflight RAM near 2 GiB, record OS Available/Committed/Pagefile plus GPU/CPU and relevant processes. Start selected apps in a measured pilot with an immediately reversible state; observe if combining them improves handoff. Try Chrome preview + GIMP, or Blender render + preview, or browser artboard + Node build, and increase worker/task parallelism if stable. If paging/lag grows, reduce render samples/texture previews, close explicitly approved nonessential windows, or sequence expensive render and browser-test phases *without removing the professional feature from the roadmap*. Keep test coverage and final export quality.

**Failure/security/cost boundaries:** Respect private local source, no permanent Windows memory tweaks or closing VPN/remote bridge. No account, permission change, paid service, cloud quota usage, installation, source merge or production deployment without independent authorization. Existing installed software is eligible for resource-managed pilots; **not automatically a dependency**. Blender's official [8 GB minimum / 32 GB recommended](https://www.blender.org/download/requirements/) and [GIMP swap](https://docs.gimp.org/3.2/en/gimp-prefs-system-resources.html) mean light jobs should be benchmarked before assumptions of stability.

**State:** This section is a policy/roadmap update only; it does not mark S11–S20 or S14A complete, and no professional design application has been used to generate new site media in this turn.

## 8) New production identity/admin/commerce tool roles (2026-11-22, RESEARCH ONLY)

**Scope change (updated 2026-11-22):** S01–S12 tools were selected for a static five-language M01 demo. I00–I20 now map every infrastructure dependency in the canonical roadmap, with official Free-tier provider alternatives and standalone signup routes; no provisioning performed. Real customer signup with email+SMS verification, stable order ownership and independently protected admin access require a server, durable database, identity/session software and controlled notification/payment adapters. **No new tool or package has been installed or activated**, no provider selected and no paid/free credit consumed by this planning update. S14A local editor remains separate from production admin.

| Actual capability need | Existing verified fit | Candidate classes / alternatives (NOT SELECTED) | Safety, quota and execution gate |
|---|---|---|---|
| Server/domain API | Laptop Node 24/Git/PowerShell for isolated local fixture only; original static M01 frontend reusable | one modular Node server or Python server → only as required, no new frontend framework | SSR not mandatory; test auth/session/I/O/backup before hosting; production platform selected after permissions/cost review |
| Durable principal/order state | JSON content is **not** identity/order authority | local transactional SQLite prototype → reviewed managed/self-hosted relational DB for production | ownership, unique constraints, migrations, lock/concurrency, backups/restore and data-region law |
| Identity and session | no existing M01 auth runtime | managed Supabase Auth or Clerk; vetted self-hosted identity libs/Keycloak/ZITADEL after cost/compliance comparison | MFA/passkey, roles server-side, CSRF/session/recovery, no client-only trust; account/provider connection requires approval |
| Email verification | no approved production email sender | provider-managed email or approved SMTP delivery | anti-abuse, deliverability, bounce, template localization; legal sender identity/cost/quota verified first |
| Phone verification | no free/approved SMS channel | provider-native OTP with external SMS provider or regional compliant gateway | per-message billing, coverage, identity/region, restrictions, hard spend cap; Free-first: **UNKNOWN/DENY** until verified and approved |
| Payment lifecycle | no payment provider | hosted PSP + signed webhook; one replaceable adapter | KYC/merchant country/settlement, fees, PCI scope; Stripe docs used only for general patterns, no recommendation/activation |
| Admin UX and access control | S14A local draft studio is **not** multiuser admin | separate admin login UI + backend roles and passkey/MFA | invite-only, deny by default, audit/step-up, no public admin signup |
| QA and operations | existing local Playwright/Edge, Node test, axe/HTML-Validate, GitHub | add DB integration, OTP mock, signed webhook fixture, security tests + backup/restore, monitoring only on operational vertical | T31–T45; no unnecessary new SaaS or CI spend |

**Initial official evidence:** [Supabase Auth/phone](https://supabase.com/docs/guides/auth/phone-login) and [pricing](https://supabase.com/pricing); [Firebase SMS pay-as-you-go](https://firebase.google.com/pricing); [Clerk free plan](https://clerk.com/pricing); [Keycloak open-source](https://www.keycloak.org/); [ZITADEL self-hosting](https://zitadel.com/docs/self-hosting/deploy/overview); [OWASP ASVS 5](https://asvs.owasp.org/); [NIST 800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html). No assumed eligibility (especially geography/merchant), free SMS, overage protection, or provider activation. The canonical **ordered production stages** stay in [03 P00–P18](03-EXECUTION-ROADMAP.md), not a new tracking ledger.

## 9) Infrastructure discovery and placement update — 2026-11-22 (RESEARCH ONLY)

The **single authoritative infrastructure dependency matrix**, vendor Free-tier/MCP/standalone-signup comparison, source citations, no-spend gates and **21 unchecked I00–I20 infrastructure stages** are in [03 / Infrastructure Readiness](03-EXECUTION-ROADMAP.md). This section only clarifies tool placement and source of truth; it is not a second progress ledger.

- **Connected ChatGPT plugins confirmed through Plugin Management:** `GitHub` (canonical code/CI), `Supabase` (candidate managed DB/Auth/Storage), `Neon` (alternative DB), `Render` and `Railway` (alternative runtime operators). Installed/connected != account-project selected or currently billable usage authorized.
- **Direct plugin name searches with zero match (non-exhaustive):** `Cloudflare`, `Resend`, `Twilio`, `Sentry`. Their official Dashboard/CLI/REST APIs are valid future choices, with user-assisted signup if needed. Do not favor an obscure third-party MCP bridge over official provider control or least privilege.
- **Account decisions:** choose ONE database authority, ONE identity authority, ONE runtime API; optional edge/CDN/monitor/storage only when each solves its own measured need. A browser/ChatGPT MCP is a management executor and never replaces real hosted app runtime, SMS delivery, paid-PSP eligibility or server auth.
- **Free-first verified examples:** Cloudflare Pages 500 free builds/month and static asset free; Workers 100k/day requests; D1 read/write caps; Supabase Free 2 projects/500MB and pauses; Neon Free 1GB/100 CU-hours per project; Render free sleep and ephemeral disk; Railway $1/mo resource usage and time-limited $5 trial; Resend 100 free email/day; Brevo 300/day; UptimeRobot free five-minute uptime; GitHub public standard runners free. **These are dated candidate facts, not account entitlement or production SLA.**
- **High-risk constraints:** SMS verification is not universally free (Twilio Verify fees/Firebase SMS Blaze); cloud object storage may require billing profile; actual merchant country, payout legality, email sending domain, database recovery, regional permissions and overage hard stop remain UNVERIFIED. No activation, subscription, provider migration or cloud write during this research.
- **Execution order:** start with existing local Node + SQLite fixture + mocked senders/PSP; only then compare Cloudflare integrated vs Supabase+Render/Railway vs Neon+API using I00–I20 and approval. Track tested tool value, failure, quota, permissions and fallback under each checkbox in the roadmap.
