# DJMRN-FREELANCE-WEBSITE-001 — Research, standards, tools, and evidence register

**Status:** CURRENT research reference (not a daily progress log)  
**Consolidation date:** 2026-11-14  
**Scope:** Service-first DJMRN freelance/Vibe Coding promotional portfolio with **per-service galleries of distinct sample applications** (including one planned Perfume Store demo under E-commerce Website Development). Provider/licensing observations are historical research inputs, not current activation decisions.  
**Authority:** [Project brief](README.md) for accepted scope, [execution plan](EXECUTION-PLAN.md) for gates, [project log](PROJECT-LOG.md) for observed stage progress, Git commit/diff for source evidence.  
**Evidence tags:** OFFICIAL (provider/standard documentation); LIVE_ACCOUNT (connector directory); LIVE_WINDOWS (device command); PRIOR_PROJECT_EVIDENCE (dated, linked GitHub record); PROPOSAL (not owner-approved); UNVERIFIED (no successful test). Distinguish installation from authenticated provider access, and tool presence from successful execution.

## A. Business and page strategy — PROPOSAL

The site must itself demonstrate engineering competence while attracting legitimate, bounded, deliverable-based freelance projects. Potential categories: modern websites and landing pages; frontend/UI/UX; JavaScript/Python/API automation; QA and browser testing; data workflow; AI-assisted development with human QA; selected creative/video and promotional design. Confirm exact services and their evidence with owner before public copy. **Never invent clients, credentials, testimonials, awards, technical capacity or past paid work**.

Latest OWNER-confirmed nested IA, documented in [MASTER-ROADMAP §1A–§1B](MASTER-ROADMAP.md): DJMRN Home → multi-category Services → specific service detail → **related sample gallery** → separately styled **contained demo route** + accessible return to that service; Work/case-study explanations share sample IDs and can link to the runnable demo. One service may have multiple real samples, all only listed as working when actually built. **Perfume Store B23** belongs under the E-commerce Website Development service, not DJMRN global navigation; simulated cart/payment/invoice/finance steps are planned, no real transactions. Earlier top-level page outline (Home, Services, Work, Process, About, Contact, Privacy) is retained as the outer website shell; exact routes are approved at B03/B04. Proposed audience is international remote clients; bilingual EN/FA and RTL/LTR remains OPEN. Work-case studies must differentiate owner-made concept/demonstration from paid commissioned work. The prior Orsola conceptual video may only be used if rights, attribution and user-selected official link are confirmed.

## B. Current engineering standards — OFFICIAL reference baseline

| Dimension | Proposed acceptance and checks | Canonical source |
|---|---|---|
| Responsive | One mobile-first responsive site, semantic landmarks, CSS Grid/Flexbox, fluid layouts, images and sensible content-driven breakpoints. Test 320, 360, 390, 768, 1024, 1440, 1920 CSS px, landscape, zoom. Not separate duplicated sites. | MDN https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design ; Google https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing |
| Accessibility | Target WCAG 2.2 AA; manual keyboard-only, visible focus, text alternatives, contrast, logical reading order, form labels/errors, focus states, touch sizes, high zoom. Automated axe can detect some failures but cannot certify WCAG. | W3C https://www.w3.org/TR/WCAG22/ ; https://www.w3.org/WAI/WCAG22/quickref/ |
| Performance | Production real-user p75 mobile/desktop LCP <=2.5s, INP <=200ms, CLS <=0.1. Lab Lighthouse/Playwright not equivalent to real-user evidence. Low JS, optimized responsive assets, stable sizes, cache/font strategy. | Google https://web.dev/articles/defining-core-web-vitals-thresholds |
| UX/motion | Distinctive premium editorial/tech aesthetic, purposeful microinteractions, predictable CTAs, responsive animation budget; respect `prefers-reduced-motion`, no heavy mandatory WebGL. Static fallback. | W3C https://www.w3.org/WAI/WCAG22/Techniques/css/C39 |
| Security | OWASP Top 10:2025, ASVS 5.0 where applicable; HTTPS, correct auth/authorization boundaries, restrictive CSP/security headers after testing, validation/encoding, rate limiting if server contact form exists, no secrets client-side. | https://owasp.org/Top10/ ; https://owasp.org/www-project-application-security-verification-standard/ ; https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP |
| Authentication | **No visitor login in version one by default**. If real admin/client portal needed, separately approved server-side identity and authorization, maintained auth library/provider, secure cookies, expiry/revocation and failure tests. Never claim a visual login form is secure auth. | OWASP https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet ; Next.js https://nextjs.org/docs/app/guides/authentication |
| SEO | Crawlable semantic content, unique titles/meta, sitemap/robots/canonical where hosted, real accurate structured data, alt text and social previews; mobile-content parity. No guarantee of ranking or AI recommendations. | Google https://developers.google.com/search/docs/fundamentals/seo-starter-guide ; https://developers.google.com/search/docs/appearance/structured-data/sd-policies |
| Locale | Real EN/FA translation only with owner-approved copy; `lang`, `dir`, mixed-direction isolation, proper locale routes; hreflang only for genuine localized equivalents. | W3C https://www.w3.org/International/questions/qa-html-dir.en ; Google https://developers.google.com/search/docs/specialty/international/localized-versions |
| Testing | Reproducible build, type/lint, Playwright functional and viewport regression, accessible interaction and manual keyboard, axe, Lighthouse, dependency checks, link and form behavior, safe rollback/smoke after separate deploy approval. | Playwright https://playwright.dev/docs/emulation ; Chrome https://developer.chrome.com/docs/lighthouse/overview ; axe https://github.com/dequelabs/axe-core |
| Privacy/trust | Accurate provider/identity/contact/portfolio representation, data handling and cookie policy match real site behavior. Requirements depend on actual audience, site features and jurisdictions: legal duties are **UNVERIFIED until release**. | To be assessed for selected deployment and audience |

Quality is not a single Lighthouse score. For example, iOS Safari must be evaluated on a real device when practical; Playwright emulation alone is insufficient. Performance targets are targets to measure, **not a promise or a completed test**.

## C. Visual directions previously researched — design candidates, not chosen

1. **Creative Portfolio:** bolder typography, cinematic visuals, distinctive personal identity.
2. **Premium Digital Studio:** polished case studies, clear commercial trust, restrained motion.
3. **Interactive Tech:** interactive examples and graphical flourishes showing engineering capability.

**PROPOSAL:** combine premium studio clarity with carefully budgeted technical interactions. Multiple fully powered 3D, parallax/video backgrounds and animation libraries add performance/fallback risk. Figma design is canonical only once owner reviews it. Asset licenses, sources, editing rights and credits must be recorded.

## D. Installed ChatGPT plugins (LIVE_ACCOUNT directory search; provider-session readiness not inferred)

| Tool | Plugin status observed | Role and boundary |
|---|---|---|
| Figma | INSTALLED / ENABLED | Potential approved visual design authority for frames/components/variants; actual account/file permissions not tested this stage. |
| MagicPath | INSTALLED / ENABLED | Optional **prototype** and interactive concept generator; React/TS export capability advertised; spending credits and project account need verification. |
| Canva | INSTALLED / ENABLED | Visual asset authoring; AI credit/free asset constraints and copyright need per-asset checks. |
| GitHub | INSTALLED / VERIFIED FILE READ & WRITE | Canonical source/version history and project reference; desktop Git network separately failed in a live test. |
| tldraw | INSTALLED / ENABLED | Optional wireframe/user-flow diagram, NOT a second design authority. |
| Firecrawl | INSTALLED / ENABLED | Optional public site/competitor research; provider credits may be metered. |
| TinyFish | INSTALLED / ENABLED | Cloud browser service, not free confirmed local Windows transport; charges/credits UNKNOWN. |
| Render / Railway | INSTALLED / ENABLED | Candidate hosting/deployment tools, actual cost/eligibility not cleared. |
| Neon / Supabase | Installed connectors from broader workspace | Backend databases are **NOT** requirements for initial static marketing site. |
| OpenSEO | Installed during user-approved connection on 2026-11-14 | SEO research/audit. Prior provider docs suggested limited nonrenewing initial free credit. Remaining account quota and any lookup costs **UNKNOWN; don't consume paid API**. |
| Adobe Express | Tool endpoints available to this assistant; account connection/specific availability NOT TESTED | Optional graphic asset editor, overlaps Canva. |

Other discoverable but not installed: Lovable, Replit, Webflow, Wix, WordPress, Product Design, Vercel, Firebase, PostHog. They are **alternatives**, not required dependencies. Do not install merely to increase tool count.

## E. Official free-offer research from earlier Nov-14 review (re-check before activating)

| Service | Source-backed possibility | Decision / outstanding limits |
|---|---|---|
| Figma Starter | $0 tier, limited team design files and no paid Dev Mode | Existing plugin sufficient for design exploration. https://help.figma.com/hc/en-us/articles/13838684089751-Starter-plan-overview |
| MagicPath Free | Provider pricing earlier stated $0/no card; 20 AI design credits/day, up to 120/month; 5 Figma imports/3 exports/month | Experimental; these quotas may change. https://www.magicpath.ai/pricing |
| Canva Free | Free graphic design with limited AI use | Use for assets if truly free; watch licensing/credit limits. https://www.canva.com/pricing/ |
| Penpot | Open-source design alternative; hosted Professional advertised $0 | Replaces Figma only if measured fit; do not run two canonical design tools. https://penpot.app/pricing |
| Spline | Interactive 3D design with free tier but embedding/watermark/export and AI limits | Optional demo only; avoid mandatory heavy 3D. https://spline.design/pricing |
| axe-core | Open-source accessibility testing engine | Use locally plus human WCAG inspection. https://github.com/dequelabs/axe-core |
| Lighthouse | Free/open-source local audit from Chrome/CLI | Baseline LCP/CLS/SEO/contrast checks; limitations. https://developer.chrome.com/docs/lighthouse/overview/ |
| PageSpeed Insights | Public free web auditing; API key usually desirable for repeated use | Only after URL available; separate field/lab data. https://pagespeed.web.dev/ |
| Microsoft Clarity | Provider advertises free heatmaps/session insight | Analytics/privacy/consent activation is separate release decision. https://clarity.microsoft.com/pricing |
| OpenSEO | Plugin installed; possible one-time free credit per official billing; live balance unknown | No spend or paid request without check and approval. https://www.openseo.so/docs/billing |
| Cloudflare Pages | Free plan documented 500 builds/month and static hosting allowances | Candidate for static site; commercial eligibility, country/residency terms, account card, Pages Functions/limits must be verified before deployment. https://developers.cloudflare.com/pages/platform/limits/ ; https://developers.cloudflare.com/pages/functions/pricing/ |
| Netlify | Has a Free pricing option | Verify current Free quotas, hard stops/overages, features and commercial/geographic use before selection. https://www.netlify.com/pricing/ |
| Vercel Hobby | Official Hobby plan noncommercial/personal-use restriction | **Not default host for paid freelance commercial site**. https://vercel.com/docs/plans/hobby |
| GitHub Pages | Free service not intended to operate an online business/transaction-oriented website | **Not default commercial production host**. https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits |

Provider offer != an approved accessible account. **FREE-FIRST; UNKNOWN costs/overage/geographic eligibility = STOP at activation.** No new service should receive client data or secret tokens on this research basis.

## F. Live Windows installation/remote-control audit — 2026-11-14

**Device:** DJMRN-LAPTOP online, Desktop Commander v0.3.2, 8GB RAM. Only Commander bridges this ordinary ChatGPT mobile conversation to local Windows in actual tool tests; local ChatGPT Desktop Work has separately passed one MCP `list_windows` invocation returning seven windows. Direct browser connector from this mobile context failed origin binding.

**Local developer commands directly verified:** Git 2.55.0.windows.5, Node 24.22.1, Python 3.14.7, VS Code CLI, Codex CLI 0.166.0; `codex.cmd login status` returned **Logged in using ChatGPT**. PowerShell `codex` shortcut selected `codex.ps1`, blocked by system execution policy; `codex.cmd` is the no-policy-change launcher. This is NOT a reason to weaken PowerShell security policy.

**Windows network blocker:** `git ls-remote https://github.com/mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations.git HEAD` failed due to inability to connect `github.com:443` (~21s timeout). ChatGPT GitHub connector remains operational for canonical document writes. Direct local clone/pull/push therefore **NOT VERIFIED / BLOCKED at snapshot**; do not claim that the local Codex workspace is already GitHub-synced. Network/VPN diagnostics must avoid weakening firewall or exporting secrets.

**Installed local tools verified by prior local README-STATUS.txt (local test history, not full new live test):**
- Windows-MCP 0.8.9 (21 tools, screenshot passed), Windows Commander MCP 0.1.1 (57 tools; UIA Calculator 2+2=4), OpenDesk 0.3.0 (22 tools; screenshot/Calculator passed).
- Microsoft Playwright MCP 0.0.85 (isolated Edge click/screenshot passed), Chrome DevTools MCP 1.13.0 (CLI help; end-to-end debug UNVERIFIED).
- Native GUIs: gptme 0.36.0, Backboard Studio 3.1.27, Chat On Steroids 2.1.53, ChatGPT Desktop Community 0.2.1, Yep Anywhere 0.10.0, Web GPT Agent 2.3.1; also OpenAgents 1.1.9, OmniRoute 3.8.52, OpenMausBot 0.1.153.
- Executables/bridges: Browser Use 1.0.4, chatgpt-use, Browser MCP, chrome-use, codex-browser-bridge. Experimental extensions staged in isolated profiles only; not given broad authenticated-browser permissions.
- Chrome DevTools and all agent-host/API end-to-end runs not yet accepted. All background apps should NOT be started together on 8GB.
- Parent audit: [DJMRN Windows capability report, sections N/V/W](https://github.com/mohammadrezanabizadeh41-png/DJMRN-Intelligent-Assistant/blob/main/06-tests-and-evidence/provider-research/DJMRN-AGENT-SERVICES-2026/NEW/CHATGPT-WINDOWS-FULL-CONTROL-IMPLEMENTATION-PLAN-2026-11-14.md).

## G. Coding-host comparison and tool governance — current recommendation

| Coding host | Actual model / work path | Advantage | Verified limitation / classification |
|---|---|---|---|
| **Official ChatGPT Desktop Codex / Codex CLI** | Logged-in ChatGPT subscription, Codex model usage | Source-aware development, tests/terminal, review, first-party Git workflow | **PREFERRED primary runner** now user explicitly accepts Codex quota; CLI login status PASS, one actual website task yet untested. Official product https://help.openai.com/en/articles/20001276-moving-to-the-new-chatgpt-desktop-app |
| **ChatGPT Desktop Work local** | Separate local Work mode + MCP plugin | Can perform local computer work, 1 read-only local MCP call passed | Different mode/quotas from Codex; good for bounded external tool work, not automatic substitute for coding workflow |
| **gptme 0.36.0** | OpenAI subscription **uses Codex endpoint**; optional independent OpenRouter/Gemini/local provider | Model-flexible CLI agent, real separate-model alternative | Installed only; no independent free-model + real code acceptance. Free provider quota must be verified; ChatGPT-subscription route not a Codex quota escape. https://gptme.org/docs/providers-supported.html ; https://gptme.org/docs/providers.html |
| **Backboard Studio** | GUI agent/provider access varies | Alternative coding UI, potentially useful visual workflow | Installed; actual model route and no-cost quota **UNVERIFIED**. https://github.com/Backboard-io/Backboard-Desktop |
| **Yep Anywhere** | Official Codex/Claude process backend | Better remote session supervision if needed | If Codex backend selected, it uses Codex quota; additional server/reachability considerations. https://yepanywhere.com/docs/providers |
| **ChatGPT Desktop Community** | Alternative frontend to Codex app server | Another UI | Not an independent model/quota source; no demonstrated value over first party for this task. See parent audit. |
| **OpenMausBot** | Harness runs installed Codex/Claude or other configured engines | Multi-agent/team orchestration | Overkill for one marketing website, 8GB RAM; Codex under it still uses Codex; paid/remote service features not assumed. https://github.com/OpenMausBot/OpenMausBot |
| **OpenAgents / OmniRoute** | Agent group / model gateway | Potential future free-model routing | Need per-model free allowance, role, real-run test; not needed before first site vertical. |
| **Chat On Steroids, Web GPT Agent, Browser MCP, chatgpt-use** | Browser / Windows / ChatGPT bridge tooling | May add browser control | Browser-origin access/transport, full MCP connection or authorization not demonstrated for this mobile chat; some extensions request broad permissions. Do not reactivate full access. See prior audit. |
| **Direct Commander + Node/Git/Playwright** | Ordinary chat writes and tests via Commander; no Codex inference | Simple deterministic fallback and independent from Codex model quota | Consumes ChatGPT conversation and Commander quotas; user now explicitly permits Codex, so not mandatory as exclusive runner. |

**JUDGMENT:** One official Codex coding task/session at a time with local Git repo, standardized project instruction and tests; ChatGPT conversation acts as owner-facing manager and independent reviewer. We can use Figma/MagicPath to design; Codex executes code; Playwright/Lighthouse/axe report quality; GitHub is single version authority. Try gptme with an independently verified free provider only if the first-party runner has measurable shortfall. No new agent army, mirror repository or second DB.

**Failure/rollback policy:** Code should be changed on a task branch, reviewed via diff, tested and committed only under approved scope. No automatic merge to production, publishing, third-party credits, payments, new accounts or environment-variable disclosure. If Windows Git network still fails, do not create an unrelated local Git history or pretend synchronization; either restore official Git connectivity safely or use a clearly marked unsynced staging area and explicitly record blocker. In any case GitHub commits/readbacks remain canonical. No credentials or personal data in logs.

## H. Open project decisions and next validation

- Owner-approved initial design, colors/type/brand, English/Persian content, services and portfolio rights.
- True contact route and whether an authenticated private editor is ever required.
- Confirm actual Figma account/plugin project capacity and any nonrenewing MagicPath/OpenSEO credits before consuming.
- Check selected hosting legal country access, no bill/overage and commercial use before deployment.
- **Historical network blocker is RESOLVED as of 2026-11-14:** canonical repo was successfully sparse-cloned and repeated fast-forward syncs succeeded using the existing Windows proxy **scoped to Git commands** and intact TLS verification; retest remote access at actual execution time, never weaken host security or create another authority.
- Read-only official Codex task and local Git branch were previously verified; actual site implementation/tests are **not started**. After owner final roadmap approval, run one scoped P2/RQ01 requirements stage, then app/code work only after its design/stack gate and independent QA.
- See [Execution plan](EXECUTION-PLAN.md) and [Project log](PROJECT-LOG.md) for approved scope and next tasks.

**Provenance:** current user instructions; verified live Notion DJMRN policies; above official reference links; official Codex/gptme/Yep/README web pages (2026-11-14); GitHub tool directory and user-owned canonical records; Windows Remote Desktop Commander observed CLI, login, network and installed software. Unknown or feature claims not tested remain labeled.
