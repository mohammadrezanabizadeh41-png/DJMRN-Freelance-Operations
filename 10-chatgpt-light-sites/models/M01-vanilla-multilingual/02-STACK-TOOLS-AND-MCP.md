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
- Laptop reported 8 GB RAM; memory availability varies. Only ONE browser test worker and ONE loopback dev server; do not launch Docker, multiple Chromium runtimes or WordPress.
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
