# DJMRN-FREELANCE-WEBSITE-001 — MASTER ROADMAP: International Multilingual Creative Engineering Portfolio

**Document type:** CANONICAL design/build ROADMAP and research backlog (not the project activity log).  
**Version:** 1.0 — 2026-11-14 — research-backed planning baseline; **NOT a blanket approval of every feature/provider/production deployment**.  
**Owner's request:** a distinctive, multi-dimensional, commercially useful and technically professional personal freelance / AI-assisted coding showcase with modular services, convincing actual demonstrations, advanced visual motion/3D where useful, ~8+ languages, social-network integration, excellent responsive UX, SEO, security, performance and future expansion; research each branch before selecting its implementation.  
**Source authority:** `mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations/09-self-marketing-website/`.  
**Execution authority:** site source / Git commits; [AGENTS.md](AGENTS.md) governs Codex; [EXECUTION-PLAN.md](EXECUTION-PLAN.md) holds P0–P10 macro gates; [PROJECT-LOG.md](PROJECT-LOG.md) is the **ONE** changing stage/approval/test history. This ROADMAP specifies structure, dependencies and criteria, not duplicate daily progress.  
**Design authority (upon owner adoption):** Figma approved master frames + tokens. Other builders (MagicPath etc.) are noncanonical experiments/prototypes.  
**Evidence language:** FACT=official/live evidence; PROPOSAL=engineering judgment requiring owner sign-off; UNKNOWN=unverified eligibility/price/ability; PASS requires reproducible real output, not an AI assertion.

---

## 0. Product promise, hard constraints, definition of professional

**North star:** a website that acts simultaneously as (1) trustworthy freelancer identity, (2) service directory, (3) verified portfolio/case-study library, (4) optional interactive technology showcase, (5) frictionless client inquiry path, and (6) maintainable international search entry point. Visual spectacle **supports** clarity, accessibility and conversion, not replaces them.

Nonnegotiable constraints: zero new paid usage until separately and explicitly approved; no production publication/domain/payments or sensitive account/security changes without impact + approval; content and portfolio claims verifiable; no fake testimonials or fake agency identity; no reliance on browser scraping or gated tools to render public pages; mobile/desktop must work without mandatory WebGL; no visitor auth, database or CRM until real I/O justifies them; only one canonical GitHub source. The Windows laptop has 8 GB RAM: only one active heavy agent/graphics editor at a time. GPT-6 Luna / Medium in official Codex is current economical implementation default; GPT-6.1 Sol / Medium is task-level escalation for genuinely complex reasoning; no default Ultra/paid credits. **Tool policy:** existing tool → verified free alternative → scoped trial; no app accumulation.

**Quality is multidimensional**: user trust + information findability + original design + useful demonstrations + reliable conversions + accessible international content + tested code + measurable performance + operational reversibility. A screenshot/mockup or a 100 Lighthouse score alone is not DONE.

### Core user journeys (each tested end to end)
- **J1 new client:** Search/social URL → localized landing → discover relevant service → evidence/case → understanding deliverable/process → contact without account.
- **J2 technical evaluator:** service → case-study explanation → actual working demo/source (only if truly available) → QA/performance evidence → contact.
- **J3 international visitor:** search landing in supported locale → explicit language switch retaining equivalent route when translated → RTL/LTR correct → same contact outcome.
- **J4 mobile visitor:** arrives on slow device → sees actual content before interactive graphics → accessible nav, working social links, contact.
- **J5 return visitor:** share a direct deep link to a service or case, not forced into a fake desktop-like window that search engines cannot index.
- **J6 site maintainer:** update a service/project/locale asset without duplicating page implementations; automated checks catch broken routes, missing translations and expired links.

---

## 1. Proposed public site map — all subdomains clearly owned

```text
/[locale]/                         Home / global service gateway
/[locale]/services/                Searchable/filterable service directory
/[locale]/services/[service]/      Individual service: scope, output, process, proof, CTA
/[locale]/work/                    Verified portfolio / selected concepts with clear badges
/[locale]/work/[case]/             Individual case study with provenance, methods, results, media
/[locale]/lab/                     Demonstrations index (interactive, media, code)
(/[locale]/lab/[demo]/)            Optional isolated lab demo, only after content and safety review
/[locale]/process/                 Workflow: discovery → build → testing → handover
/[locale]/capabilities/            Technologies, tooling and boundaries (if material)
(/[locale]/insights/)              Optional research/articles only with real maintained content
/[locale]/about/                   Real, honest professional profile and scope
/[locale]/contact/                 Contact choice, disclosures/privacy and fallback
/[locale]/privacy/                 Actual privacy practice, locale-specific where applicable
/[locale]/terms/                   Only if actual terms/legal need arises
/[locale]/404/                     Helpful recovery/route fallback if host permits
/sitemap.xml; /robots.txt          Real deployed route/site metadata
```

Default navigation: compact Home / Services / Work / Lab / Process / About / Contact; language selector and social links in appropriate accessible locations. Contact CTA remains visible; mobile navigation collapses cleanly. A **visual "workspace/window" metaphor** (cards/tabs/overlays) can be layered over this semantic route system: each important service/case/demo still has a direct, crawlable URL and complete document title, no route becomes trapped in a JavaScript-only modal.

### Showcase taxonomy (not a promise that every service is already supported)
Websites & landing pages; app/UI prototypes; JavaScript/Python/API automation; AI-assisted coding & integration; data/Excel/reporting; browser/website QA; creative graphics/motion/media; SEO/content implementation; VA/other services **only if genuine verified deliverable evidence exists**. Use broad index cards and specific detail pages, with real examples, tool stack and delivery conditions where verified. Distinguish CURRENT AVAILABLE / DEMONSTRATED CONCEPT / INVESTIGATING / NOT OFFERED. No unapproved service claims.

### Case-study template
Challenge → intended users → constraints → owned contribution → method/architecture → gallery/demo → tests/evidence → result (observed, not invented) → lessons/limitations → source permissions → contact CTA. Evidence status `client-paid | self-initiated-concept | internal-demo`; client identity only with written authorization; redacted/synthetic sample data only.

---

## 2. Workstreams: 22 branches, each independently researchable and testable

**Each branch carries ID, subwork, dependencies, proof of value, research questions and exit test.** Dates/completion are tracked ONLY in PROJECT-LOG.md.

### B01 — Market, positioning, audience & measurable goals
- **Subtasks:** prioritize real buyer types (international SME/startup/agency/individual); value proposition, differentiation, project scopes, user journeys, service demand/honest eligibility; definition of lead vs vanity traffic; clear geographic/legal constraints on service provision and payments.
- **Dependencies:** none. **Output:** approved creative brief, service priorities, target audiences, success criteria; **Research RQ01:** competitor portfolios, credible user expectations, search intent by language, locally relevant competitors, free analytic methods. Use public official portfolios / community inspiration, no invented ranking.
- **Gate:** owner confirms positioning; marketing copy distinguishes proven abilities from aspirations.

### B02 — Content inventory, evidence, rights & truthful copy
- **Subtasks:** list actual software demos, screenshots, source links, video examples, drafts and legal ownership; label sample vs paid work; verify brand/name/contact details; create service detail/case-study content templates; create controlled copy approval and change workflow.
- **Dependencies:** B01. **Output:** evidence-backed content catalog (IDs, provenance, rights, approval, URL/hash, allowed depiction). **Research RQ02:** example case-study storytelling, content UX, asset licenses and portfolio rights.
- **Gate:** no claimed paid job, result statistic, testimonial, company identity or credential lacking direct evidence. No private client files in public repo.

### B03 — Information architecture, navigation & discovery
- **Subtasks:** full sitemap and depth; home gateway and service panes; service category/tag filters; searchable case-study list only if needed; contextual CTAs; breadcrumbs; accessible expandable content and keyboard-friendly dialogs; mobile IA; empty/filter states and 404.
- **Dependencies:** B01–B02. **Output:** route matrix, journey maps, wireframes, navigation contracts. **Research RQ03:** compare tabs/mega menus/dialogs with native HTML disclosure/links and actual UX; use MDN dialog guidance, WAI-ARIA APG.
- **Gate:** J1–J6 journeys clickable from static prototypes; all important pages reachable without JS-only event navigation; no dead links.

### B04 — Internationalization architecture (plan for 8–10, translate progressively)
- **Proposed core locales:** `en` English, `fa` Persian, `de` German, `fr` French, `es` Spanish, `pt-BR` Brazilian Portuguese (regional target to validate), `ja` Japanese, `ar` Arabic. **Candidates only:** `tr`, `it`, `zh-Hans`, `ko` after actual demand and translation quality review. Owner must confirm shortlist/priority; no public "supports 8 languages" until translations exist.
- **Subtasks:** locale registry and naming conventions, default/fallback URL, stable content ID→per-locale slug map, route generation, per-locale page availability, translation coverage status `draft|reviewed|published`, glossary/style guides, approved human-reviewed machine assistance, formatting (dates/numbers/quotes/currency), 404/fallback strategy, language switcher with self-language names, keyboard and screen-reader labels, full-page `lang/dir` and localized metadata.
- **RTL:** `fa/ar` `dir=rtl`; other proposed locales LTR; use logical CSS properties `margin-inline/padding-inline/inset-inline`, `bdi` and `dir=auto` for mixed-script inline values. Don't blindly flip logos, icons with meaningful direction, video controls or diagrams. Test German long words, Arabic shaping, Persian digits, Japanese line breaks and fallback fonts.
- **SEO:** per-published-equivalent explicit URLs (prefer consistent `/[locale]/` including English, pending decision); per-page reciprocal `hreflang`, self-referential canonical, optional `x-default`, localized sitemap and social descriptions. Never show English copy under a /de URL as if translated; redirect or plainly declare fallback. No invisible language auto-redirect that traps crawlers or strips a manual visitor choice.
- **Dependencies:** B03, B05 for copy length/fonts, B07 for build architecture. **Research RQ04:** W3C bidi/locale typography, Google international SEO, Astro i18n routing/translation fallbacks, no-cost translation tools and post-edit workflow. LibreTranslate/Argos Translate is open source but local model downloads/quality/RAM need a *small measured trial*, not an always-on service.
- **Gate:** at least one fully reviewed RTL and one LTR route in pilot, then smoke a full route×locale matrix before publishing each additional locale; no orphan locale selectors or phantom `hreflang`.

### B05 — Brand identity, art direction & design tokens
- **Subtasks:** owner name/brand voice, visual directions (premium agency × tech lab; optional minimal/editorial, expressive/3D variants); wordmark and favicon; color and dark/light behavior if worth it; type scales including CJK/Arabic and fallback fonts, spacing, grid, radii, responsive token scales, surfaces, shadows, icon and motion tokens.
- **Dependencies:** B01–B04 language/font/space needs. **Research RQ05:** moodboards and high-quality *real* portfolios; Figma Starter limits, typography families/license/performance (Fontsource/self hosting); verify visual originality and international readability.
- **Gate:** owner approves a cohesive Figma frame/token system for mobile+desktop and RTL/LTR; contrast/focus reviewed; creative direction documented without copying third-party designs.

### B06 — Interaction design & reusable component contracts
- **Subtasks:** primary CTA, service cards and subpages, project previews, tabs/accordions, accessible dialogs, hover/touch/focus/active, filters, carousels only where useful, progressive disclosure, page transitions, responsive menus, screen-reader names, loading/empty/error states.
- **Dependencies:** B03, B05, B12, B13. **Research RQ06:** MDN native dialog/popover, WAI keyboard patterns, alternatives to heavy UI kits. MagicPath may generate quick prototypes; only approved Figma components become design authority.
- **Gate:** interaction matrix describes keyboard/mouse/touch, no trapped focus, Escape closes modals, deep links are real links, no loss when JS unavailable for primary content.

### B07 — Framework/architecture decision and component/content boundaries
- **Alternatives:** (a) semantic HTML/CSS/light JS for very few static pages; (b) **Astro static pages + content collections + selectively hydrated islands** as a strong candidate for ~8 locales, many service/case pages and isolated interactive demos; (c) Next.js/server architecture only if authenticated portal/real dynamic apps justify it. Do not pick "latest" for prestige.
- **Subtasks:** score stack vs content volume, locale route generation, build/static hosting, SEO HTML availability, interactive island complexity, skill maintenance, dependency/version risks, 8GB dev RAM, rollback; choose Node package manager and lockfile, stable TS config, format/lint, import boundaries, one repository, no microservices.
- **Dependencies:** B01–B06 first. **Research RQ07:** official Astro 6 (fonts/CSP/content collections/islands), Next.js auth, browser support. **Gate:** short ADR recorded in PROJECT-LOG with measured local build+prerender smoke and reason rejected alternatives; no architecture selection before content/locale needs.

### B08 — Developer experience, Codex role, Git workflow & CI gates
- **Subtasks:** existing Codex Desktop project linked to the same sparse Git checkout, task branch, AGENTS.md, task packets, per-module acceptance, PR/diff review, safe commit conventions, local build/scripts/lockfile, gitignore, optional CI only after free quota review. Read source once, code in bounded vertical slices; no untracked generated dumps.
- **Dependencies:** B07 selection; current P0/P1 already verified. **Research RQ08:** official Codex app usage/quotas, GitHub Actions free quotas for this repo, Playwright CI baseline maintenance.
- **Gate:** actual repo branch and clean checkout; reproducible `install/build/test` using project-local scripts; Codex output audited by assistant; no auto merge/publish. CLI and Web MCP are not interchangeable transport.

### B09 — Media pipeline, licensing, typography, icons, social assets
- **Subtasks:** asset registry `assetId/owner/license/source/version/attribution/locale/alt/focal-point/dimensions`; portraits/logos/illustrations/covers/video/3D models; image optimization AVIF/WebP and semantic alt, responsive crop/focal point, SVG sanitization; local self-hosted subset fonts; graphics fallback.
- **Social links:** reusable provider manifest with official external URL, actual user-controlled profile, accessible label, permitted SVG, safe `target/rel`, optional theme; show only **verified live accounts**. Icon pack `simple-icons` CC0 project but **brand trademark and individual icon license conditions still apply**; verify brand marks and no implied endorsement. Keep placeholders internal, never publish fake links.
- **Dependencies:** B02 rights, B05 tokens, B07 asset pipeline. **Research RQ09:** Fontsource, Astro image optimization, Blender asset export, Simple Icons disclaimer, self-hosting vs provider images.
- **Gate:** every published media file has allowed use and alt/fallback; no missing 404 assets, huge uncompressed image, unauthorized third-party logo or private metadata.

### B10 — Motion language, transitions and microinteractions
- **Subtasks:** hierarchy of motion: CSS transition → Web Animations API → Motion MIT JS where needed → specialized custom animation only after need; reduced-motion policy; scroll/touch/hover state; focus-safe transitions; animation duration/easing tokens; subtle nav and page transitions; loading/exit states.
- **Dependencies:** B05, B06, B12/13, performance budget B18. **Research RQ10:** Motion docs & free MIT license; GSAP license current only if needed; native CSS vs JS; dotLottie web player and *per-asset* export/license; Rive production export pricing.
- **Gate:** animations do not hide required content, hijack scrolling, cause vestibular risk, delay LCP or block inputs; motion disabled/reduced mode shows static equivalent; screen-reader/keyboard pass.

### B11 — 3D/WebGL/interactive hero and showcase lab (OPTIONAL, independently discardable)
- **Subtasks:** decide **one** visual differentiator with owner, e.g. generative geometric hero or portfolio 3D object; scene/storyboard; prototype at real laptop/mobile CPU/GPU; scene lazy load and asset LOD, pause offscreen/background; static poster for no WebGL/reduced motion/slow network, accessibility textual equivalents; only activate when measured ROI justifies.
- **Tool candidates:** free commercial-permitted Blender production of own models; Three.js/WebGL as one contained module; React Three Fiber **only if this isolated demo genuinely requires React**; Spline Free for exploration but watermarked web output (no watermark-free free production claim); Rive Free editor does **not** include runtime export for commercial shipping according to current pricing; do not rely on paid render exports.
- **Dependencies:** B05, B07, B09, B10, B12/13, B18. **Research RQ11:** shader alternatives, Three renderer fallback/context loss, glTF compression/tools, memory/network budgets, GPU accessibility, current provider commercial license and credits.
- **Gate:** optional 3D module can be removed with no broken navigation/conversion; tested at mobile low power, WebGL disabled, offline/reduced-motion, GPU lost; separate performance results, not primary LCP.

### B12 — Responsive/adaptive layouts and device matrix
- **Subtasks:** mobile-first CSS grid and type, fluid breakpoints, touch controls and menus, desktop wide layouts, tablet/landscape/zoom, high density images, RTL mirrors only where semantic, navigation parity; do not make a second mobile codebase.
- **Dependencies:** B03, B05, B06, B04. **Research RQ12:** MDN Responsive Layout, W3C WCAG Reflow, browser-specific patterns. **Gate:** page smoke at 320/360/390/768/1024/1440/1920 CSS px and 400% zoom-equivalent 320 CSS px; no unintended 2D scroll, clipped content/controls, hidden CTAs or lost menus.

### B13 — Accessibility (continuous, not only end-of-project)
- **Subtasks:** semantic heading/landmark structure, visible keyboard focus, skip navigation, accessible name and role, color contrast, touch target sizes, errors and validation, usable modals, language changes announced and `lang` tags, alt/captions/transcripts, animations with reduced-motion, content under zoom.
- **Dependencies:** every UI/media/locale branch. **Research RQ13:** WCAG 2.2 AA, APG for custom widgets, axe-core/manual tests. **Gate:** no critical automated axe findings; manual keyboard and screen reader representative journey; human review of color contrast, focus order, motion and content semantics. Automation cannot certify WCAG by itself.

### B14 — Service directory and deep service pages
- **Subtasks:** category IDs and filters; service evidence status, summary/detail, deliverables/scope/non-scope, skills proof and matching cases; contextual CTA, pricing only when owner authorizes verified pricing. Search by tags if content volume warrants; responsive cards/filters and view modes.
- **Dependencies:** B02–B04, B07, B12/13. **Research RQ14:** best service-page UX and B2B inquiry conversion; real portfolio patterns.
- **Gate:** update one service record once → all appropriate locale/index links update; no phantom service, blank filter result without an empty state, SEO duplicate content or broken CTA.

### B15 — Portfolio, case studies, demonstrations and media gallery
- **Subtasks:** image/video/website gallery with performance-aware previews; independently inspectable case pages; actual public code/demo links if permitted, before/after where evidence exists; project status labeling, proof/test excerpts; optional contained interactive sandboxes (do not execute visitor code); video subtitles/transcripts, privacy/consent for third-party embeds.
- **Dependencies:** B02, B07, B09–B13. **Research RQ15:** OSS CodeMirror/Monaco licensing *only if real editable showcase requires it*; iframe sandbox/CSP; safe live demo vs recorded video; video hosting free limits.
- **Gate:** 1 case study with real rights and provenance + at least one demonstrable functional sample; all demo errors fail gracefully, do not touch production auth, no exposure of sensitive source/client data.

### B16 — Contact, inbound lead and conversion UX
- **Subtasks:** link-based `mailto:` fallback or verified public email, then optional form only after receiving/retention/abuse/storage/notification channel tested; minimal fields with consent/privacy messaging, basic anti-spam, success/failure/double-submit states, no guest account; mobile social/contact support; translations of responses. Never promise a form works when it's a frontend-only mock.
- **Dependencies:** B01 trust, B04 locale, B07 backend choice, B13 accessibility, B17 privacy. **Research RQ16:** Formspree Free $0 50 submissions/month explicitly positioned for **testing/development** (commercial production eligibility must be verified), Cloudflare Turnstile Free business use with verification requiring a **server-side endpoint**, independent form alternative, spam/overage.
- **Gate:** real end-to-end inquiry test to authorized controlled inbox, failure handling/dedupe/abuse guard/retention and privacy checks, no secret client bundle. If no eligible free service, use safe email/contact links before building backend.

### B17 — Security, privacy, rights and compliance
- **Subtasks:** threat model by actual feature; HTTPS, headers/CSP, dependency/license inventory, supply-chain scanning, external embed/iframe sandbox, safe links and form input, rate limiting only if server, test auth only if added later; privacy/cookies analytics/retention per user jurisdiction; domain/hosting regulatory eligibility; secret handling; security regression.
- **Dependencies:** all third-party service/lead/analytics/hosting features. **Research RQ17:** OWASP Top 10:2025/ASVS5, MDN CSP, vendor data processing agreements and legal local eligibility.
- **Gate:** no unresolved critical security findings, no exposed credentials/client PII, permissions scoped, correct disclosure/legal plan, no production auth without separate architectural + user approval.

### B18 — Performance, SEO crawlability, discoverability and quality budgets
- **Subtasks:** prerender core content and metadata, lazy load noncritical 3D/media, Core Web Vitals and bundle budget, image/font optimization, structured data from real facts, canonical/hreflang/sitemap, robots/404, link previews, OpenGraph, local keyword topic mapping and copy quality; no doorway/duplicate auto-translation pages.
- **Dependencies:** B04 locale, B07 rendering, B09 assets, B10/11 visual effects, B14/15 content, B19 deploy. **Research RQ18:** Google Search Essentials, helpful people-first content, Core Web Vitals, Astro prerender and images, Google structured-data policies, OpenSEO **only if free live quota verified**.
- **Gate:** lab Lighthouse baseline and web vitals budgets: **LCP ≤2.5s; INP ≤200ms; CLS ≤0.1** at real-user p75 mobile+desktop when data exists. Before deployment, report lab metrics as LAB, never false field PASS. Compare SEO page source for crawlers, locale metadata reciprocity, indexing eligibility; JS-off core content still readable.
- **Initial budget proposal (adjust after measurement, not standards):** core first-view compressed JS target under ~100 KB where practical, no forced 3D download on first paint, media sized/responsive, avoid extra third-party trackers. Use actual trace and viewport results rather than arbitrary score-only optimization.

### B19 — Automated QA, manual review and regression matrix
- **Subtasks:** type/lint/build, unit tests of locale route and content schemas, smoke of all primary journeys, Playwright viewport/accessibility-tree/screenshots, Lighthouse/axe/manual keyboard, fake missing images/locale fallback/404, slow network/offline, broken JSON/data, optional WebGL context loss, forms server failures, link checking, external integration and SEO metadata. GitHub Actions optional pending free quota verification.
- **Dependencies:** every functional branch. **Research RQ19:** Playwright visual snapshots (same host baseline), axe-core, Lighthouse, device emulation, Safari/iOS physical QA if available.
- **Gate:** build reproducible, no unhandled exceptions or broken primary journeys, no critical a11y/security issues, screenshots reviewed, failure cases measured, regression tracked before next milestone.

### B20 — Hosting, DNS, deployment, rollback and observability
- **Subtasks:** compare verified legal/commercial/region eligibility and hard $0 limits for Cloudflare Pages/other candidates, card requirement/no overage, custom domain costs, CDN/TLS/CSP/headers, environment and preview deploy isolation, GitHub integration, redirects/404, sitemap, rollback tested, uptime/alerting. Domain purchase and public release **separately approved**.
- **Dependencies:** B07, B17–B19. **Research RQ20:** Cloudflare Pages Free 500 builds/month, static file caps and Functions quota; Netlify current pricing; commercial restrictions on Vercel Hobby and GitHub Pages; deployment from owner's actual residency/legal access is **UNVERIFIED**.
- **Gate:** documented release proposal including cost/rights/security/privacy/rollback + explicit user approval; real post-deploy smoke, TLS, crawlability and locale checks. No silent production deploy or permission change.

### B21 — Analytics, search visibility, lead measurement and iteration
- **Subtasks:** privacy-preserving baseline; Search Console after publication, optional Microsoft Clarity only after consent/legal assessment, measure qualified inbound inquiries, social referrals, popular language routes, scroll/CTA friction and CWV if actual field data exists; no speculative traffic promises.
- **Dependencies:** B16–B20; real public launch. **Research RQ21:** free privacy-aware analytics, official search console features, third-party script performance and consent.
- **Gate:** useful measurements without unnecessary surveillance, reversible tracking, real iteration linked to user value.

### B22 — Expansion: future services, languages, social channels, articles, portal
- **Subtasks:** add languages through locale manifest and reviewed translations; add services/cases through content schema; add verified social link through icon manifest; blog/articles only when maintainable; CMS only if owner cannot edit Git content; secure private client portal only after real need, auth model, roles, costs and full security approval; PWA/offline/search only after evidenced demand.
- **Dependencies:** stable B04/B07/B14–B20; baseline conversion measured. **Research RQ22:** each new feature's direct ROI, simpler alternatives, authorization, migration and rollback.
- **Gate:** new feature passes isolated approval, no authority duplication, performance and localization parity preserved.

---

## 3. Dependency graph and execution sequencing — avoid integration surprises

```text
P0/P1 DONE (research, tools, official Codex, Git checkout)
                   |
                   v
S1 B01 Business + B02 Evidence + B03 IA -----------> OWNER brief/claims approval
                   |                                       |
                   v                                       v
S2 B04 Locale model + B05 Brand + B06 UX components ----> Figma visual review
                   |                                       |
                   +-------------------+-------------------+
                                       v
S3 B07 Stack ADR + B08 Git/Codex + B09 asset contracts ---> LOCAL real build
                                       |
                                       v
S4 B12 Responsive + B13 A11y + B14 Services
                                       |
                                       v
S5 B15 Cases/Lab + B16 Contact + B18 SEO metadata
                                       |
                          +------------+-------------+
                          v                          v
S6 B10 Motion            B11 optional 3D        B04 locale expansion
                          +------------+-------------+
                                       v
S7 B17 Security/privacy + B19 QA/Visual Regression/CWV
                                       |
                                       v
S8 B20 $0 hosting/legal proposal ---> OWNER deployment approval
                                       |
                                       v
S9 live smoke + B21 analytics ---> B22 prioritized expansion
```

**Dependency rules:** (a) brand before effect production; (b) content evidence before public claims; (c) locale/route contract before multiplying pages; (d) shared design tokens before individual service cards; (e) core experience before Three/WebGL; (f) non-3D working pages before any motion and with motion disabled; (g) form data workflow before collecting real inquiries; (h) security and tests are continuous, not postponed until S7; (i) production only with separate user approval; (j) every code task begins from latest upstream GitHub and finishes with actual diff/test/evidence log.

### Existing P0–P10 macro-stage mapping (do not invent a second status authority)
| Existing stage | Expanded sessions / branches | Completion criterion |
|---|---|---|
| P0 RESEARCH | B01–B22 source survey + baseline documents | Current **research documentation** recorded; detailed B01–B22 owner choices not all made |
| P1 TOOL READINESS | B08 preliminary | Already verified Codex/Git; per-task service checks still needed |
| P2 BRIEF APPROVAL | S1; B01/B02/B03 + locale priorities | Owner confirms positioning, content rights, sitemap & first slice |
| P3 DESIGN | S2; B04/B05/B06/B09 | Approved Figma mobile/desktop/RTL layouts and component design |
| P4 ARCH + WORKSPACE | S3; B07/B08 | ADR, build scripts, locale/content contracts and branch |
| P5 FIRST VERTICAL | S4 small end-to-end route | Real home/CTA/locale proof with manual+automated tests |
| P6 EXPAND | S4–S6; B10–B16/B18 | Services, cases, lab, selected locale and motion passes |
| P7 QA | S7; B12/B13/B17/B18/B19 | All mandated test matrices and remediation, no critical blockers |
| P8 HOST REVIEW | S8; B20 | Verified account/region/free costs/rollback proposal |
| P9 RELEASE | S9, explicitly approved B20 deployment | Public TLS/links/locale/SEO and recovery smoke |
| P10 ITERATE | B21/B22 | Evidence-based value improvements, optional features only as needed |

**Do not mark an entire branch complete when one subtask or prototype passes.** Codex must not implement all B01–B22 in one unsupervised mega-prompt. Every S stage has at least one independent result and sign-off.

---

## 4. Architecture contracts and change-safe data model (PROPOSAL)

**Single modular content-first codebase**: static site is default runtime; an optional interactive island may use JS, Motion/Three or React only in that module, with lazy import and fallback. No sitewide SPA/SSR/database/agent swarm without measurable requirement.

**Responsibility and interfaces**:
| Ownership / module | Input → output contract | Dependency and security boundary |
|---|---|---|
| `site-config` | approved brand, locale, navigation, links → validated immutable config | No API keys; single source for public metadata |
| `content` | real service/case evidence + translations → typed records | No runtime arbitrary Markdown scripts; versioned source |
| `i18n` | `canonicalContentId + locale` → translated slug/title/text/status | No unreviewed locale published; SEO route parity |
| `design-system` | approved Figma tokens → CSS variables + reusable accessible components | RTL via logical properties; no duplicated styles per locale |
| `routing` | route type + content ID + locale → URL/HTML/sitemap/canonical | Prerender main pages; deep links work sans JS |
| `media` | approved asset ID → srcset/alt/captions/license record | Optimization + fallback; no private files |
| `motion` | approved motion tokens + reduced-motion preference → safe state | Does not own content/navigation |
| `3d-lab` | optional scene input + capability flags → enhancement or static poster | Own rendering context; never block initial content/contact |
| `lead-channel` | validated minimal inquiry fields → controlled destination + outcome | Separate backend only if necessary, no secrets front end |
| `seo` | canonical published locale+record → meta/sitemap/hreflang/schema | Only verified public facts; reciprocal alt tags |
| `tests` | routes/components/docs → reproducible PASS/FAIL artifacts | Never self-certify; browser evidence |
| `deploy` | approved build artifact/version → preview/production + rollback | No write without approval; free eligibility verified |

**Possible typed content record schema after stack selection (concept only)**:
```text
ServiceRecord {
  id: stable string; status: planned|verified|offered; evidenceIds: string[];
  categoryIds: string[]; caseIds: string[]; mediaIds: string[];
  locales: { localeCode: { slug, title, summary, fullText,
            seoTitle, description, translationStatus,
            reviewedAt, approvedBy } };
}
CaseRecord {
  id: stable string; provenance: paid-client|self-initiated|internal-demo;
  evidenceIds: string[]; rightsApproved: boolean; sourceUrl?: string;
  demoUrl?: string; mediaIds: string[]; locales: {...};
}
SocialLink { platformId, verifiedProfileUrl, iconAssetId, accessibleLabel, enabled }
AssetRecord { id, source, license, allowedUse, credits, altByLocale, sizeVariants }
LocaleRecord { tag, nativeName, dir, fontFamily, enabled, defaultRoutePolicy }
```

**Why these fields matter:** one update flows to the cards, details, locale routes, SEO and social previews. Stable IDs prevent breaking links when translated slugs change; require redirect mapping in later migrations. This is a proposed *logical* contract, not approval to create database tables, registries everywhere or new abstraction layers. Begin with simple local files and one schema where volume justifies; review existing before inventing types.

**User-facing "windows/panes" are presentation only**. They must not become OS-like isolated separate web apps or hidden inaccessible dialogs. Any preview modal is optional; canonical URLs and readable semantic page contents remain public even with animations/JavaScript disabled.

---

## 5. Research-first, free-first service selection matrix

All quotas/pricing below are source-backed *snapshots* as of Nov 2026; actual account availability, regional permission and remaining free balance require a test at point of use. **UNKNOWN=DENY paid activation.**

| Need / research trigger | Existing primary | Free candidate + official current limit | Decision/anti-lock-in |
|---|---|---|---|
| System design | Figma plugin connected | Figma Starter $0, file limits; Penpot hosted $0 as alternative | Figma once approved, no parallel design authority. |
| Interactive visual prototyping | MagicPath installed | $0 quota-limited design credits; Canva Free assets | Export only evidence-backed reusable ideas; do not adopt generated UI unreviewed. |
| Branded icons & fonts | SVG/CSS, Canva/Figma | Simple Icons CC0 repo with trademark exceptions; Fontsource open fonts self-hosted | Use actual verified social accounts; check individual trademarks and font license. |
| Micro-interactions | CSS/WAAPI | Motion library MIT and free https://motion.dev/ | Native CSS first; lazy JS; reduce-motion. |
| 2D animations | CSS/SVG | dotLottie JS runtime; animation assets' licensing separately verified | Rive $0 editor **does not ship runtime exports**; do not base production on that free tier. |
| 3D visuals | Blender | Blender GPL editor free to use/ship own artwork; Three.js JS | Do not require Spline Free watermark for production unless user approves. |
| 3D service | No required cloud provider | Spline $0 with 20 MCP calls/day and web-export watermark, no AI credits | Experimental; no paid export, no account dependency before pilot. |
| Translation/locales | ChatGPT-assisted drafts + owner review | LibreTranslate/Argos language models OSS; Japanese/Persian/Arabic etc supported unevenly | 8GB RAM/translation quality trial first; no paid API or blind SEO translations. |
| Website builder | Node/Git/Codex | Astro MIT content-first static/prerender and selective islands; basic HTML fallback | Framework decision only after final content/locale/interaction brief. |
| Visual QA | Desktop Playwright tools | Playwright, axe-core, Lighthouse open source | Tests first; avoid paid cloud browser testing by default. |
| Competitive/keyword research | Existing web research, OpenSEO installed | OpenSEO limited/no verified current balance; Google Search Essentials free | Never run paid metered lookup without verification. |
| Forms/contact | Email link | Formspree Free $0/50 monthly **development/testing-oriented**; Cloudflare Turnstile Free for business spam control (server validation) | Production form only if legal/commercial tier actually eligible and real receipt verified. |
| Analytics | None by default | Google Search Console, Microsoft Clarity $0 advertised; self-host analytics optional | Tracking/privacy/cookies overhead => separate approval after launch. |
| Hosting | None selected | Cloudflare Pages Free 500 builds/month, 20k files, 25MiB/asset; Netlify Free under review | Verify actual country/account/commercial rights, overage and domain before production. |
| Codex execution | Official ChatGPT Desktop Codex | Existing included quota, Luna/Medium | No paid credits, external inference or agent swarm. |

**Special caveats:** GitHub Pages commercial operation and Vercel Hobby noncommercial usage are not accepted default commercial hosts; video hosts may have advertising/privacy and embed rules; site text is not a claim of being an agency or employing a team.

**Governance trigger for any new app/MCP/browser site:** `Need → exact capability gap → existing plugins/local tools → official Free offer/limits + permissions + terms → small read-only trial → security and rights review → owner approval for connection/write → implement one slot → measure → record decision in PROJECT-LOG`. No plugin is installed solely because it appears attractive in a tool listing.

---

## 6. Detailed evidence and acceptance test matrix

| Test ID | Automated/manual evidence required | Release requirement |
|---|---|---|
| T01 | Successful local `install/build/typecheck/lint` and deterministic URL output | PASS; no unexplained warnings |
| T02 | Playwright J1–J5 navigation, service→case→contact, real deep-link and 404 | PASS on approved routes |
| T03 | Language switch `en/fa/de/fr/es/pt-BR/ja/ar` **for each actually published route**; correct self/reciprocal `hreflang`/canonicals, correct `lang/dir`, localized metadata, translated slugs and missing-page behavior | PASS per published locale only; no false translation claim |
| T04 | 320/360/390/768/1024/1440/1920, landscape, 400% zoom/reflow | No unintended overflow/clipping or lost CTA |
| T05 | Keyboard, focus, contrast, form validation, headings, dialog focus/Escape, reduced motion, captions/alt | Target WCAG 2.2 AA, zero critical axe issues + human checks |
| T06 | Slow network/low-end emulation, JS disabled for core content, WebGL disabled/lost context, static poster fallback | Main marketing/conversion content remains accessible |
| T07 | Lighthouse and trace of homepage and every expensive visual page; server delivery; assets/fonts payload; LCP/INP/CLS field when available | Baseline, regression limits and correct lab vs field classification |
| T08 | Security: lint/dependency/licenses, HTML injection/CSP behavior, public secrets scan, optional form spam+rate limit, safe `target=blank` | No critical unresolved issue |
| T09 | Real content evidence, image/video usage permission, verified social profile URLs, no false claims | 100% published evidence-backed records |
| T10 | SEO: prerender text, meta/social, canonical/robots/sitemap/hreflang, clean link status, accurate schema | PASS before publish |
| T11 | Contact path end-to-end to user-approved destination (not mock); privacy disclosures and failure/retry | Real delivery verified or contact via tested email link |
| T12 | Rollback rehearsal, chosen host limits, no surprise billing/regional block, TLS headers/live sitemap | Approval + PASS before public DONE |
| T13 | Performance/UX audit of 3D/animation on reduced motion, mobile GPU weak, screen readers | Enhancement safely removable |
| T14 | User review of desktop/mobile visuals in each requested brand variant and available RTL/LTR | Explicit owner approval; do not invent acceptance |
| T15 | Post-release: actual index presence, contact receipt, uptime/errors and limited analytics | Monitor after user-approved release |

No test is claimed PASS in this roadmap just because its criterion is defined. Save test scripts and reports with code under site directory; update only PROJECT-LOG.md for rolling status.

---

## 7. Risk register & rollback: practical failure modes

| Risk / likely symptom | Prevention / measurable rollback |
|---|---|
| 8+ locales double page maintenance | one route+content schema; add locale record/translation, not duplicated templates |
| False localized content/auto-translation penalties | reviewed page-specific translations; no indexable phantom pages; language selector honest about availability |
| Mixed RTL/LTR phone/email/brand display broken | W3C bidi isolation + logical properties + locale test corpus |
| Hero 3D kills mobile LCP or crashes GPU | feature flag, static first-paint, lazy isolated renderer, terminate WebGL on failure |
| Vendor locks export behind payment | no essential vendor-only runtime, inspect free commercial shipping license before design dependence |
| Fancy panes hide SEO content or trap keyboard | semantic route is canonical; modals/tabs are progressive UX, links still navigate |
| Icons/logos imply affiliations or violate trademarks | official external profile URL + individual license/brand guide check, accessible text |
| Fake sample work or unapproved client data | evidence IDs, rights approval, transparent concept/demo labeling |
| Contact form fails silently / spam data leak | staged fake data → real opt-in inbox test, rate limiting, privacy, fallback mailto |
| CI/hosting free tier overage or geographic block | no deployment without exact account/quota/overage/legal confirmation; hard stop |
| Codex edits unrelated folders or pushes unstable code | branch scoped prompt, AGENTS.md, git diff, user stage approval and tests |
| Original repo changes since clone | fast-forward-only fetch with command-scoped proxy, abort on merge conflict; no force pushes |
| Massive generated abstraction library | choose minimal typed records/one shared mechanism, defer CMS/backend/agent team |
| Website search impressions don't bring project work | measure qualified inquiries by service/locale; refine truthful case studies and CTA |

Recovery rule: keep the previous known-good Git commit, run local `git diff` and targeted tests before/after fixes, stop adding effects until the broken user journey passes, preserve no paid provider lock-in.

---

## 8. Stage task template for official Codex (one narrow task per run)

```text
ROLE: coding agent for DJMRN-FREELANCE-WEBSITE-001 only.
PROJECT: existing DJMRN-Freelance-Operations repo / 09-self-marketing-website.
SOURCE OF TRUTH: README.md + MASTER-ROADMAP.md + approved EXECUTION-PLAN.md
 + latest PROJECT-LOG.md + project AGENTS.md + root PROJECT-RULES.md.
STAGE: P# / S# / B## / T## and RQ## (only those listed as approved).
BEFORE WORK: verify branch/upstream, scope, approved owner choices and real asset provenance.
RESEARCH: check current official docs and free quota for the specific feature. Distinguish fact,
 assumption and recommendation. Compare built-in functionality vs 1-2 alternatives. STOP on UNKNOWN COST.
IMPLEMENT: smallest complete vertical, semantic HTML/typed content; browser-safe, locale-safe,
 reduced-motion, mobile-first, predictable dependencies. Never make fake testimonials.
ACCEPTANCE: run reproducible build plus tests T##, report exact PASS/FAIL and screenshot/log path.
REPORT: changed files, git diff/commit, input/output, artifacts, QA, security/privacy, failure,
 rollback and remaining unknowns. Record one concise site PROJECT-LOG checkpoint.
HARD BOUNDARIES: no unapproved production deployment/merge/paid usage/credentials/accounts
 /public tunnel/tracking activation/customer data transfer, no changes outside site folder.
Use Luna/Medium for contained tasks; ask permission/record why stronger model is needed.
```

**Project manager (this chat)** independently verifies output with Desktop Commander/local browser, reviews the tool's claim against real files/screenshots/tests, checks official references, updates the single site log in GitHub, then presents exact open choices for next stage. Codex is the executor, not the authority for product requirements or user approval.

---

## 9. Initial research queue, in required execution order

| Research ticket | Question we will actually answer then | Sources / experiments |
|---|---|---|
| RQ01 + RQ02 | Which top 3 services attract legitimate targeted clients and what evidence can we publicly show? | owner-approved evidence, public portfolio examples, Google Search Essentials |
| RQ03 | What home/services/work/lab routing and window metaphors best preserve accessibility+SEO? | clickable Figma sitemap, WAI/MDN patterns |
| RQ04 | Which 8 locales first, true copy creation cost/quality, content schema and SEO? | Google/W3C/Astro docs, 2 locale prototype, translation review |
| RQ05 + RQ06 | Which of 3 coherent creative directions works for RTL/LTR and touch/keyboard? | Figma+MagicPath free quotas, tested desktop/mobile prototype |
| RQ07 | HTML vs Astro vs Next.js with approved page count, 8 locales and optional demos? | two tiny local build spikes only if required, CI feasibility |
| RQ09 | Which exact icons/fonts/images/video/3D assets are genuinely freely usable commercially? | licenses/trademark rights, asset source and screenshot tests |
| RQ10 + RQ11 | CSS/Motion vs Three.js vs Spline/Rive, where can effects ship truly $0 and pass mobile GPU fallback? | local performance proof, official provider pricing/licensing |
| RQ14 + RQ15 | Which actual case studies/labs demonstrate capability and how do we safely show them? | real portfolio rights, iframe/video/demo trials |
| RQ16 | Can a commercial contact form actually receive and retain leads at hard $0 without hidden overage? | official form provider terms and real controlled inbox test |
| RQ18 + RQ19 | Do pages score and function well for SEO, CWV, keyboard, locales, mobile, browser differences? | Playwright + axe + Lighthouse + human QA |
| RQ20 + RQ21 | Which host/analytics truly meet commercial/legal/account/free limits? | provider terms/account tests, release proposal and explicit approval |

**Later optional research** RQ08/RQ12/RQ13/RQ17/RQ22 runs continuously as each component crosses its integration boundary. Research evidence and outcomes are appended to PROJECT-LOG, but this document's plan remains a controlled reference, revised only when scope/architecture changes.

---

## 10. Official references rechecked for this master plan — 2026-11-14

1. Google multilingual architecture and language URL/locale caveats: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites ; https://developers.google.com/search/docs/specialty/international/localized-versions
2. W3C RTL, bidi, Japanese/other script concerns: https://www.w3.org/International/questions/qa-html-dir ; WCAG 2.2: https://www.w3.org/TR/WCAG22/ ; 320px/reflow: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
3. Astro locale routing and fallback, schema validated content collections, partial hydration/islands and images: https://docs.astro.build/en/guides/internationalization/ ; https://docs.astro.build/en/guides/content-collections/ ; https://docs.astro.build/en/concepts/islands/ ; https://docs.astro.build/en/guides/images/ ; https://astro.build/blog/astro-6/
4. Performance thresholds and prerender priority: https://web.dev/articles/defining-core-web-vitals-thresholds ; https://web.dev/articles/optimize-lcp
5. Motion MIT/free: https://motion.dev/ ; Three.js: https://threejs.org/manual/pages/creating-a-scene.html ; React-three-fiber: https://r3f.docs.pmnd.rs/getting-started/introduction
6. Rive free edit but paid-to-ship runtime exports: https://rive.app/pricing ; Spline Free watermark and MCP cap: https://spline.design/pricing ; Blender free commercial work: https://www.blender.org/about/license/ ; dotLottie player docs: https://docs.lottiefiles.com/en/runtimes/distributions/js
7. Fonts and brand-mark licensing: https://fontsource.org/docs/getting-started/introduction ; https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md
8. Search helpful content and JavaScript/prerender: https://developers.google.com/search/docs/fundamentals/creating-helpful-content ; https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering
9. Playwright screenshot regression: https://playwright.dev/docs/test-snapshots ; HTML native dialogs: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
10. Security: https://top10.owasp.org/ ; https://owasp.org/www-project-application-security-verification-standard/
11. Formspree Free $0/50 for testing/dev: https://formspree.io/plans/ ; Cloudflare Turnstile Free for small-business production: https://developers.cloudflare.com/turnstile/plans/
12. Cloudflare Pages Free limits: https://developers.cloudflare.com/pages/platform/limits/ ; https://developers.cloudflare.com/pages/functions/pricing/ ; https://www.netlify.com/pricing/
13. LibreTranslate/Argos language-model availability: https://github.com/LibreTranslate/Documentation/blob/main/src/content/docs/guides/supported_languages.md
14. Prior connected tool audit and more commercial-host caveats: [RESEARCH-AND-TOOLS.md](RESEARCH-AND-TOOLS.md); global site requirements and references: [README.md](README.md).

**No claims of actual UX/build/security/hosting acceptance are made by the creation of this plan.** Professional readiness is earned only at each tested gate; production actions always separately require owner approval.
