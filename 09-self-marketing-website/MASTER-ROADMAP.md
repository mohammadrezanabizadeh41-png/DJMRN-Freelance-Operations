# DJMRN-FREELANCE-WEBSITE-001 — MASTER ROADMAP: International Multilingual Creative Engineering Portfolio

**Document type:** CANONICAL design/build ROADMAP and research backlog (not the project activity log).  
**Version:** 1.0 — 2026-11-14 — research-backed planning baseline; **NOT a blanket approval of every feature/provider/production deployment**.  
**Owner's request (latest explicit clarification 2026-11-14):** a distinctive, multi-dimensional **demonstration-first promotional portfolio that INCLUDES a functional DEMO of commerce, simulated checkout/payment, invoices and financial/accounting capabilities**, with no real money or financial obligations. Display technical capability with genuinely working synthetic-data workflows or accurately labeled simulations of freelance / AI-assisted coding work with modular services, convincing actual demonstrations, advanced visual motion/3D where useful, ~8+ languages, social-network integration, excellent responsive UX, SEO, security, performance and future expansion; research each branch before selecting its implementation.  
**Source authority:** `mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations/09-self-marketing-website/`.  
**Execution authority:** site source / Git commits; [AGENTS.md](AGENTS.md) governs Codex; [EXECUTION-PLAN.md](EXECUTION-PLAN.md) holds P0–P10 macro gates; [PROJECT-LOG.md](PROJECT-LOG.md) is the **ONE** changing stage/approval/test history. This ROADMAP specifies structure, dependencies and criteria, not duplicate daily progress.  
**Design authority (upon owner adoption):** Figma approved master frames + tokens. Other builders (MagicPath etc.) are noncanonical experiments/prototypes.  
**Evidence language:** FACT=official/live evidence; PROPOSAL=engineering judgment requiring owner sign-off; UNKNOWN=unverified eligibility/price/ability; PASS requires reproducible real output, not an AI assertion.

---

## 0. Product promise, hard constraints, definition of professional

**North star (OWNER CLARIFIED):** a technically impressive **demonstration and promotional portfolio**, proving what the owner can design/build rather than operating a shop or live commercial service. It combines (1) truthful professional identity, (2) browsable capabilities and service descriptions, (3) real/clearly labeled concept case studies, (4) optional interactive demonstrations including automation/motion/3D, (5) optional accurate human contact links, and (6) multilingual, accessible, search-friendly presentation. Visual sophistication demonstrates craft **without blocking usability, performance or accurate claims**. Its core success is *inspectable quality and credible evidence of capabilities*, including **end-to-end demonstrable sample purchase/order/payment and accounting workflows**, not *actual* charges, sales, paid traffic or lead conversion at all costs.

**Scope interpretation and legal caveat (latest owner instruction overrides earlier exclusions):** V1 project scope includes a **realistic but entirely sandboxed commerce-and-finance showcase** (B23), with browsable products, cart, simulated checkout/gateway outcomes, sample orders, invoices, journal/accounting and reports as an **advanced demonstrable sample**, built in staged slices. The site is NOT a *real operating merchant*, licensed payment processor, live customer business or custodian of money; never send a charge, create a real payment intent, take a card number, issue a legally operative invoice, or store real financial/client records. A workflow may perform actual *local demo calculations/state transitions* on **synthetic data** and must display obvious permanent 'DEMO — NO REAL PAYMENTS/ORDERS' messaging. No real payment-provider account, credentials, external payment API, production transaction backend, real customer auth or live fulfillment without separately scoped owner approval. Promotional sites may still count as **commercial-use** under hosting/tool terms; check B20.

Nonnegotiable constraints: zero new paid usage until separately and explicitly approved; no production publication/domain/payments or sensitive account/security changes without impact + approval; content and portfolio claims verifiable; no fake testimonials or fake agency identity; no reliance on browser scraping or gated tools to render public pages; mobile/desktop must work without mandatory WebGL; no visitor auth, database or CRM until real I/O justifies them; only one canonical GitHub source. The Windows laptop has 8 GB RAM: only one active heavy agent/graphics editor at a time. GPT-6 Luna / Medium in official Codex is current economical implementation default; GPT-6.1 Sol / Medium is task-level escalation for genuinely complex reasoning; no default Ultra/paid credits. **Tool policy:** existing tool → verified free alternative → scoped trial; no app accumulation.

**Quality is multidimensional**: user trust + information findability + original design + **working and honestly described interactive demonstrations** + discoverable capabilities + accessible international content + tested code + measurable performance + operational reversibility. Contacts are optional evidence of interest, not the only success metric. A screenshot/mockup or a 100 Lighthouse score alone is not DONE.

### Core user journeys (each tested end to end)
- **J1 new client:** Search/social URL → localized landing → discover relevant service → evidence/case → understanding deliverable/process → contact without account.
- **J2 technical evaluator:** service → case-study explanation → actual working demo/source (only if truly available) → QA/performance evidence → contact.
- **J3 international visitor:** search landing in supported locale → explicit language switch retaining equivalent route when translated → RTL/LTR correct → same contact outcome.
- **J4 mobile visitor:** arrives on slow device → sees actual content before interactive graphics → accessible nav, working social links, contact.
- **J5 return visitor:** share a direct deep link to a service or case, not forced into a fake desktop-like window that search engines cannot index.
- **J6 site maintainer:** update a service/project/locale asset without duplicating page implementations; automated checks catch broken routes, missing translations and expired links.

---

**Latest owner precedence (2026-11-14):** All historical 'no checkout/order/payment/invoices' wording throughout this roadmap, its subplans and future-feature matrices means **NO REAL FINANCIAL TRANSACTIONS**, NOT 'exclude ecommerce/financial demonstrations'. A working **synthetic-data e-commerce + accounting showcase (B23)** is an approved project feature target, with its prioritization/build starting only at the appropriate approved milestone after the website foundation. Monetary-looking UI and finance calculations are allowed within this clearly labeled isolated demo. Actual payment network, real charge, bank/financial credentials, unsandboxed user data, operational merchant/CRM remain out of scope. An advertising portfolio may still be 'commercial use' under provider terms, to verify at B20.

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

## 1A. OWNER-CONFIRMED INFORMATION ARCHITECTURE — service-first portal with nested demo applications (2026-11-14)

**This section is the latest CANONICAL scope and navigation clarification, superseding any sentence that might suggest turning the DJMRN home page or global layout into a perfume shop, store dashboard or financial gateway.** The primary site is a broad independent freelancer / Vibe Coding **capabilities and services showcase**. Service explanations come first; *samples are subordinate, explorable proofs of individual services*. The showroom's primary value is letting a prospective client inspect and try examples, not operating a single demonstration business as the DJMRN main site.

```text
DJMRN main marketing/portfolio site (global shell)
├── Home: capability overview, service category windows, selected example previews
├── Services index: web / automation / AI / graphics / video / etc.
│   ├── Service: Website building
│   │   └── Subservice: E-commerce website creation
│   │       ├── What we can build, UI/architecture/performance/security explanation
│   │       └── Relevant sample gallery (1 now / 2, 3 ... later only when built)
│   │           ├── Sample A: Perfume Store → open contained working storefront DEMO
│   │           │   ├── Own sample-store front, products, search, cart, fake checkout
│   │           │   ├── Fake payment outcomes, demo orders/invoices
│   │           │   └── Optional sample accounting/back-office panels (B23)
│   │           └── Sample B: Different industry/visual system (NOT YET CREATED)
│   ├── Service: Automation
│   │   └── Gallery → example workflows and truthful live/simulated demo pages
│   ├── Service: AI-assisted apps / chat interfaces
│   │   └── Gallery → safe guided/AI samples (D0–D3 gates; future)
│   ├── Service: Creative graphic/motion/3D
│   │   └── Gallery → rich interactive illustrations, case studies or demos
│   └── Service: Other real freelance skills → own evidence-backed galleries
├── Work: all approved samples and case studies, filterable by service/category
├── About / Process / Contact / Social links (only verified owner channels)
└── Lab/Demos: execution shells reached from relevant Service + Work links
```

**Visitor journey example (perfume):** `DJMRN home → Services → Website Building → E-commerce Websites → Perfume Shop sample card → Open demo → Interact with *fictional* storefront/cart/gateway → View sample invoice/report → Back to e-commerce service → Compare more samples → Contact creator if desired.` At no step does DJMRN global navigation become real perfume-store inventory, real payment or real customer finance. The visitor knows this is a **showcase within the freelancer's website**.

### Deep-link and window UX rule

A visually distinctive service **window/card/tab** is a presentation layer for site navigation; **every public service, case study and important working demo must also have its own stable, directly shareable URL** (locale-prefixed where real translations exist). Proposed *illustrative* URL structure:
```text
/[locale]/                            DJMRN site home
/[locale]/services/                   All service categories
/[locale]/services/web-development/   Website development overview
/[locale]/services/ecommerce/         E-commerce website service: explanation + sample gallery
/[locale]/work/perfume-store/          Perfume-store case study/provenance/preview
/[locale]/demos/perfume-store/         Actual contained perfume shop demo application
/[locale]/work/[case-id]/              Other published case studies
/[locale]/demos/[demo-id]/             Other published demo apps
```
This is **a route proposal**, not final approved slug implementation; B03/B04/B07 decide locale/slug hierarchy from tested information architecture. Existing `/[locale]/lab/[demo]/` routes are also a valid option: choose **ONE canonical execution URL** at B03/B07 and use links/redirects from both service cards and `Work` index, never duplicate a full shop or content at two competing live URLs. Open demo as an integrated page / full-screen contained surface **inside the same main site/domain** by default; don't force a new domain, external link, repo, browser tab or iframe for trusted first-party demo. Use a persistent unobtrusive **'DJMRN — Demo / Return to service'** control and recognizable fictional sample-brand UI; route refresh/back/forward and direct links must work. Optional embedded preview dialog/iframe is an enhancement only; never trap keyboard or prevent navigation/SEO. A game/untrusted HTML sample might need a **separate origin** for security while retaining an in-site navigation surface—only after an explicit trust review.

### Reusable service→sample relationship, no independent clone sites by default

- **Canonical service IDs:** one service/capability hierarchy `serviceId`, `parentServiceId?`, title/description per approved locale, categories and evidence, with a stable ID independent of translated slugs.
- **Canonical sample registry:** each real sample has `sampleId`, `relatedServiceIds[]`, `previewAssetId`, `caseStudyId?`, `demoRoute?`, `status` (`planned|prototype|tested|published`), `type` (`interactive|video|gallery|code`), `mode` (`working-demo|clearly-simulated`), rights provenance and locale coverage. A service may reference **zero, one or many** approved samples; a demo may demonstrate multiple services via references without duplicate physical pages.
- **Main site service + gallery** queries approved sample metadata; **individual demo runtime owns its own UI/state**. E.g. `features/demos/perfume-store/` can have isolated cart/order/fake payment/finance modules; future `features/demos/automation-workflow/` has different logic and own test harness. Reuse global accessibility/route/media/design-token mechanisms when valuable but allow sample-specific branding, layouts and technology stacks within tested boundaries. No globally imported heavy Three.js/payment/UI/state libraries just because one demo uses them.
- The **case-study page** explains what was built and evidence/tests; the **demo application route** is where users perform the simulated actions. A dedicated service explanation may link both. Store and accounting UI appear ONLY in the relevant demo or perhaps a screenshot/preview; don't promote them into global site navigation as primary offerings.
- **Future growth:** adding sample #2 to e-commerce should be a sample record, targeted app module, tests and gallery listing—not a second DJMRN homepage, duplicate service page, new repository or whole-site i18n refactor. A new demo can have its own design, but common navigation, registry IDs, public metadata, accessibility and security are shared consistently.
- **Never auto-display a placeholder sample as working.** A 'future sample' idea is internal planning only until real preview/demo and rights exist. Demos contain explicit synthetic-data/zero-real-payment notices, safe reset and no public personal/financial data, while the main site's contact remains entirely separate.

### Ownership, sequencing and test gates

**B01/B02:** what services are actually offered, which samples can be truthfully shown, and sample rights. **B03/B04:** the required navigation, service hierarchy, sample gallery links and locale-aware deep links. **B05/B06:** two related but distinct visual systems: coherent DJMRN presentation plus a legitimately different fictional sample-brand experience, with an accessible return path. **B07:** choose framework/content contracts and progressive loading; no unneeded multi-app build service. **B14** owns service explanations and sample associations; **B15** owns case studies, gallery and sample discovery; **B23** owns the *implementation of one e-commerce/finance demo application*, not the top-level site. For other sample types, the corresponding domain (automation, interactive AI, creative/media) owns runtime and B15 links it. **B17–B19** verify isolation, security, performance and functionality in both the site shell and demo. **B20** later verifies hosting terms/quotas and optional routing constraints, separately approved.

**New integrative checks (planned, not passed):**
- **T32 — service→sample discovery & navigation:** main site → service details → relevant sample gallery → demo opens at its own deep link → sample interaction → return to the correct service → another sample, including refresh/back/forward, locale availability, 404 and keyboard/mobile.
- **T33 — demo boundary and extensibility:** a demo's app CSS/state/payment simulation cannot affect DJMRN global navigation, another visitor/demo's data or other samples; adding another sample only updates a canonical registry record + new actual demo with no duplicated service UI; tested graceful fallback/error, on-demand JS and media budgets.

**Current plan action:** revise B03/B14/B15/B23 descriptions to follow this nested portal model. Do NOT build perfume store, finance engine, contact form or other features now. At each implementation stage, evaluate design patterns and provider/free services then—not ahead of time.

---

## 2. Workstreams: 23 branches, each independently researchable and testable

**Each branch carries ID, subwork, dependencies, proof of value, research questions and exit test.** Dates/completion are tracked ONLY in PROJECT-LOG.md.

### B01 — Market, positioning, audience & measurable goals
- **Subtasks (showcase-first):** prioritize portfolio viewers and potential employers/clients (international SME/startup/agency/individual); define which technical skills are demonstrated, the visitor's path to inspect/try working samples, design uniqueness, truthful scope and real evidence; optional human contact is secondary. No checkout funnels, paid conversion campaign, actual transactions or client portal in V1.
- **Dependencies:** none. **Output:** approved showcase brief, demonstrated capability priorities, visitor personas, measurable demonstration quality/credibility/UX goals; **Research RQ01:** outstanding interactive portfolio examples, credible employer expectations, discovery and accessibility patterns, free design references. Don't optimize for monetary leads before quality.
- **Gate:** owner confirms positioning; marketing copy distinguishes proven abilities from aspirations.

### B02 — Content inventory, evidence, rights & truthful copy
- **Subtasks:** list actual software demos, screenshots, source links, video examples, drafts and legal ownership; label sample vs paid work; verify brand/name/contact details; create service detail/case-study content templates; create controlled copy approval and change workflow.
- **Dependencies:** B01. **Output:** evidence-backed content catalog (IDs, provenance, rights, approval, URL/hash, allowed depiction). **Research RQ02:** example case-study storytelling, content UX, asset licenses and portfolio rights.
- **Gate:** no claimed paid job, result statistic, testimonial, company identity or credential lacking direct evidence. No private client files in public repo.

### B03 — Information architecture, navigation & discovery
- **Subtasks (owner-confirmed):** main DJMRN home/service windows → specific service explanation → **matching sample gallery** → independent nested sample-demo page → accessible return link to originating service; full sitemap/deep links, service category/tag filters; case-study index; breadcrumbs; keyboard-friendly dialogs, mobile IA, empty/filter and 404. A demo sample is not the main website, and one service can reference multiple independently developed samples.
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
- **Subtasks:** category IDs and filters; hierarchy of services and subservices; evidence-backed descriptions of what DJMRN can build; **gallery of real related demos/case studies** on each service page; one-to-many stable service→sample links, 'view live sample' and 'read case study' actions, return paths; contextual contact CTA as optional. Pricing only when owner authorizes real pricing. Search by tags if content volume warrants; responsive cards/filters and view modes.
- **Dependencies:** B02–B04, B07, B12/13. **Research RQ14:** best service-page UX and B2B inquiry conversion; real portfolio patterns.
- **Gate:** update one service record once → all appropriate locale/index links update; no phantom service, blank filter result without an empty state, SEO duplicate content or broken CTA.

### B15 — Portfolio, case studies, demonstrations and media gallery
- **Subtasks:** a **single discoverable sample registry** maps approved service categories to zero/many examples; preview cards/gallery within service pages, independent sample case-study pages with provenance, and dedicated **open working demo** routes with sample-specific UI while remaining part of the DJMRN site; image/video previews, code/demo links if allowed, test evidence, optional safe sandboxes; captions/transcripts and privacy/consent for third-party media. Samples can have their own fictional brand, but keep a clear 'Back to DJMRN / Service' path and avoid duplicating the global site.
- **Dependencies:** B02, B07, B09–B13. **Research RQ15:** OSS CodeMirror/Monaco licensing *only if real editable showcase requires it*; iframe sandbox/CSP; safe live demo vs recorded video; video hosting free limits.
- **Gate:** 1 case study with real rights and provenance + at least one demonstrable functional sample; all demo errors fail gracefully, do not touch production auth, no exposure of sensitive source/client data.

### B16 — Optional real creator contact and promotional UX (distinct from B23 simulated shop checkout)
- **Subtasks:** optional verified public email/social/contact links and explanatory service CTAs; a safe `mailto:` link is enough for V1 if owner approves address. No **real** customer checkout/order queue, financial obligations or real account creation from creator-contact pages; **B23 separately owns genuine interactive synthetic checkout/order demo**. Optional contact form comes only after delivery/retention/abuse/storage/privacy and test are approved; show any nonfunctional sample form as **DEMO / NO SUBMISSION**. Never promise a form works when it is frontend-only.
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

### B21 — Showcase quality, search visibility and optional interest measurement
- **Subtasks:** privacy-preserving baseline; measure performance/accessibility, working demo reachability, language comprehension, social discovery and honest portfolio clarity; optional Search Console after publication and inquiry/referral signals only if real and privacy/consent acceptable. No paid-traffic, checkout, sales-funnel or revenue KPI is required for V1.
- **Dependencies:** B16–B20; real public launch. **Research RQ21:** free privacy-aware analytics, official search console features, third-party script performance and consent.
- **Gate:** useful measurements without unnecessary surveillance, reversible tracking, real iteration linked to user value.

### B22 — Expansion: future services, languages, social channels, articles, portal
- **Subtasks:** add languages through locale manifest and reviewed translations; add services/cases through content schema; add verified social link through icon manifest; blog/articles only when maintainable; CMS only if owner cannot edit Git content; secure private client portal only after real need, auth model, roles, costs and full security approval; PWA/offline/search only after evidenced demand.
- **Dependencies:** stable B04/B07/B14–B20; baseline conversion measured. **Research RQ22:** each new feature's direct ROI, simpler alternatives, authorization, migration and rollback.
- **Gate:** new feature passes isolated approval, no authority duplication, performance and localization parity preserved.

---


### B23 — DEMO Commerce, checkout, financial/accounting application showcase (OWNER REQUIRED; staged, no real money)

**Classification / owner scope:** a visible, substantial **interactive EXAMPLE APPLICATION ACCESSED THROUGH THE 'E-COMMERCE WEBSITE CREATION' SERVICE PAGE AND ITS SAMPLE GALLERY**, owned by the same DJMRN website/portfolio project. B23 is a **specialized sample implementation subordinate to B14 service descriptions and B15 sample gallery**, **NOT** the DJMRN homepage, global service brand or a general sales checkout for DJMRN. Not a live merchant, payment operator, invoice issuer or customer finance system. The owner's latest explicit instruction **supersedes earlier exclusions that had removed checkout/payment/finance entirely**. This module is a project target, not a claim it has already been implemented. Build only in phase-appropriate, tested increments, with its actual code within the existing repo. A separate project/repository may be considered only after a demonstrated independent operational need and owner approval.

**Candidate public experience:** DJMRN Home → Services → Website Building → E-commerce Websites → **Sample gallery** → click **Perfume Shop example** (one of potentially several independent e-commerce samples) → enter its contained branded demo route and optional financial/back-office views. The case study explains the work, and the demo is where the visitor interacts. Route spelling (e.g. `/[locale]/demos/perfume-store/` vs `/[locale]/lab/perfume-store/`) is a B03/B04/B07 decision; choose one canonical route, keep it inside the site, and provide a 'Return to e-commerce service' control. A visitor can follow a **real working demo** flow in a contained fictional shop, choose examples of **simulated gateway results**, inspect a **sample invoice/order**, and switch to a **sample financial dashboard** showing the results. Cross-links explain architecture, edge cases, QA and implemented code. Put persistent **"DEMO / TEST DATA / NO REAL PAYMENT OR ORDER"** wording in the shopping, fake gateway, receipt and accounting interfaces. A visitor must not mistake demo products or financial statements for real items, charges, balance or legal receipts.

**Subbranches and acceptance contracts (each researched at its own implementation phase, not now):**
- **B23.1 Scenario/UX + feature inventory:** decide one coherent fictional brand/store and realistic user journeys; product categories, sample catalog, search/filter/sort, carts, addresses **synthetic only**, currencies and responsive layouts; separate visitor showcase from admin/finance preview. Research **RQ24a**: credible ecommerce interaction patterns and accessibility before design. Gate: clickable agreed journey and truthful demo labeling.
- **B23.2 Catalog, cart & pricing:** sample products, price and inventory representation, cart item changes, product options, promo/voucher rules, shipping/tax illustration. Enforce simple exact **Money** representation (integer minor units or a proper decimal library, currency-aware; never unsafe binary floats for monetary arithmetic), predictable rounding and invariants; no invented legally correct tax rates. Gate: deterministic totals and cross-device cart behavior with labeled synthetic data.
- **B23.3 Order lifecycle:** fake order IDs, `DRAFT → CART → SUBMITTED → DEMO_PAID | DEMO_FAILED | DEMO_CANCELLED | DEMO_REFUNDED` and selected inventory movement. States/transitions must be centrally validated; UI alone is not authority for a future real business. Gate: valid and invalid transitions tested, no double order/replay.
- **B23.4 SIMULATED payment gateway demonstration:** visually convincing gateway selection / payment progress / success, decline, timeout, cancellation and refund **without any live payment provider, card collection or transaction**. Fake payment adapter returns deterministic demo result; show *simulation*, not a misleading external company checkout. **Use fake test transaction identifiers** and never solicit card credentials, payment passwords, bank IDs, API keys or genuine PCI payment data. If future sandbox from a real provider is desired, separately verify official test mode, free/region terms and isolation at that stage; not a requirement for the initial demo. Gate: no network call to financial providers, all failure paths displayed and tested.
- **B23.5 Invoices, receipts & business documents:** generate visibly watermarked **sample invoices / pro forma / receipts**, order status and simulated refund/credit notes; export a safe demo PDF/print view only after P2/P3 UI/content approval; document number and timestamps synthetic/clear. Gate: computed document totals reconcile with fake order events; no legally operative invoice represented.
- **B23.6 Accounting and finance subdomain:** **sample double-entry ledger** with balanced journal entries (debits=credits), mock revenue/expense/refund/receivables and reconciliation; separation of order vs payment attempt vs ledger entry; no fake bank feed represented as live. Reports: sample trial balance, P&L-like summary, cash flow/transactions, basic export and clear fictional-data labeling. Do not claim tax/accounting jurisdiction compliance. Gate: totals balance for success/failure/refund and repeat/undo scenarios; no actual funds.
- **B23.7 Demo administration / back office:** fictional admin console for inventory/orders/customer-example listing, invoice previews and finance charts; **public role-switcher is a demo scene, not secure authentication**. Synthetic profiles only. No actual personal information, notifications, live payment reconciliation, privileged website editor, or real manager access. Gate: actions change only isolated sample state; public user cannot touch owner files, Gmail, desktop, repositories or real services.
- **B23.8 Data-state boundary & reproducibility:** default deterministic seed + **reset demo** controls, browser-only in-memory/session local state for initial pilot or a **scoped non-sensitive demo backend** only if actual tested multi-session persistence justifies it. Clearly state that browser storage is not durable/secure. No cookie/credential leakage, real PII, indefinite log collection or cross-visitor state sharing. Simulated API responses must be honestly identified. Gate: reset/reload and simultaneous visitor isolation tests.
- **B23.9 Engineering demonstration:** accompany each workflow with a short diagram or inspectable explanation of architecture, validation, error states, accessibility, performance, data contracts, security and test results; show quality beyond attractive mock screens. Optional developer/source link only if publicly permitted. Gate: independent QA of actual behavior, no fabricated test badges.
- **B23.10 Future modularity:** if the owner later wants **real** payments, live transactions, client invoicing/accounting, membership or CRM, that's a **new operational security/legal/cost/authorization review**, never a toggle that accidentally turns public demo flows into real financial processing. Evaluate license, eligibility, ledger/state DB, compliance and backups at that future stage.

**Minimal logical boundaries / ownership:**
```text
Portfolio Website (public, multilingual, indexable)
  ├── Work / Service / Case Study (evidence and navigation)
  └── Lab: Demo Commerce & Finance application (sandbox ONLY)
       ├── Store UI / product catalog / cart / simulated checkout
       ├── Demo order and payment state-machine (no real provider)
       ├── Sample invoices / refund documents
       ├── Finance engine: mock journal entries / trial balance / reports
       ├── Demo back-office UI and synthetic scenarios
       └── Seed/Reset + test harness (isolated from real visitors/data/accounts)
```
No universal platform framework; begin as a single contained demonstrator slice. Use **explicit command/query contracts**, stable IDs and one canonical synthetic data set; any module's behavior must be testable without a network service. Internal payment success should produce an *illustrative* ledger posting consistently; failure/retry should not create duplicate postings. This separation is forward-compatible without creating actual operational infrastructure.

**Time-of-stage research ticket RQ24 — commerce/finance demo:** At B23 starting point, research official UX/a11y, platform/framework options, license/free usable components, money arithmetic and invoices, finance data semantics, security of sandboxing, hosting/bundle/locale/performance implications and realistic demo fixtures. Only then compare 1–2 smallest solutions. Cloud demo databases/payment sandbox/MCP connectors are not required by default and cannot be activated by this document. Cross-link B02 assets/rights, B03 routes, B04 languages, B05/B06 UX, B07 architecture, B12/B13 responsive/accessibility, B15 case studies, B17 security, B18 SEO/performance, B19 QA, B20 hosting and B22 expansion.

**Acceptance suite T27–T31 (defined, NOT passed):**
- **T27 demo E2E:** seeded catalog → choose item/quantity → cart update → synthetic checkout → demo payment success → sample order + invoice → sample finance dashboard; every step independently inspected in real desktop/mobile browsers.
- **T28 negative branches/idempotency:** demo decline, timeout, cancel and refund; no duplicate charged-looking record or ledger entry on retry, totals and inventory state valid after failure/replay.
- **T29 accounting arithmetic:** exact minor-unit/decimal monetary math and currency/rounding tests; every synthetic journal posting balanced, reports reconcile to sample events, fabricated tax/legal assertions prohibited.
- **T30 safety & resets:** no real payment endpoint, card fields, bank/login secrets, client PII or unapproved API traffic; demo banner everywhere, seed/reset/reload behavior and isolation verified, no leaking changes into real portfolio/config.
- **T31 international UX & resilience:** mobile/tablet/desktop, LTR/RTL, keyboard/labels, PDF/print if implemented, slow network, JS-disabled fallback documentation, and no dependence of primary site on demo runtime.

**Release gate:** B23 not `DONE` until at least one genuinely working, accessible and visually credible end-to-end **synthetic** purchase-to-ledger journey, realistic failure tests, visible disclaimers and a real browser review exist; a decorative payment screen, static images, fake badges, untested dashboard or 'simulation' that cannot advance state is insufficient. Other B23 subbranches may continue after first vertical; no real payments or genuine user data are part of B23 acceptance.

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
| P6 EXPAND | S4–S6; B10–B16/B18 and **B23 commerce/finance demo** | Services, cases, lab, synthetic end-to-end demo, selected locale and motion passes |
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

**B23 scope note:** B23 is a nested E-commerce service/sample implementation, not top-level website commerce. T27–T31 are the additional planned demonstration QA checks; no real payment, financial obligation, bank credentials or customer records are authorized. RQ24 research runs at the actual B23 milestone, not now.

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

**Owner added a core commerce/finance DEMO track B23:** It uses fake data and simulated payment outcomes to demonstrate engineering abilities, not live payment services. **No claims of actual UX/build/security/hosting acceptance are made by the creation of this plan.** Professional readiness is earned only at each tested gate; production actions always separately require owner approval.

---

## 10A. Architecture extension-readiness audit — FUTURE OPTIONAL FEATURES, researched 2026-11-14

**Purpose:** a *pre-implementation architecture consistency check*, not advance selection of providers, agents, model APIs or libraries. This adds explicit acceptance gates for possible future logins, browser games, client portals, payment, user content and offline features. **No active implementation is authorized; all features remain DEFERRED.** When the relevant B## stage actually starts, research official documentation, current Free terms, alternatives and security/compatibility with the THEN-current source again. An existing concept map is **not** permission to install/use a service today.

### A. Required extension boundary / smallest adequate first

**Baseline remains:** a public multilingual SEO-friendly content site, with separately bounded **B23 commerce/finance demonstrator** based only on synthetic data and fake payment success/failure. No **real visitor financial accounts, payment processor, money movement, durable financial DB**, game backend, CMS, websocket server, job queue, PWA/service worker, realtime server or custom plugin registry until a real user-visible operational requirement exists. Future modularity is achieved with **stable URLs + content IDs + component boundaries + explicit ownership and input/output contracts**, not empty implementation folders or speculative microservices.

Before any consequential expansion, record one succinct feature proposal:
1. **Use case and value:** actual visitor journey, owner objective, alternatives and smallest working vertical, acceptance criteria.
2. **Ownership / source:** UI route and semantic module, canonical data owner, who edits/authorizes it, persistent vs temporary data.
3. **Contracts:** route and message/API boundaries, typed input/output, validation, error/fallback, version/compatibility and localization behavior.
4. **Trust:** who can view/change each item, authz at the server/object boundary, data sensitivity, secrets, privacy and abuse handling.
5. **External dependency:** free/commercial eligibility, region, quotas, card/overage, permissions, API license, provider migration and failure.
6. **Operation:** testable first real I/O, logs without secrets, rollback, deletion/export/retention if data saved, monitoring.
7. **Change impact:** existing navigation/metadata/hreflang, cache strategy/CSP/COEP, mobile performance, accessibility, CI, deployment and domain.
8. **Approval:** owner approves scope and any paid usage, sensitive access, schema migration or public deployment separately. If no supported option passes, **STOP**, don't invent a working capability.

**First use:** implement locally in one feature. **Second independent need:** compare explicit duplication. **Repeated proven need:** consider extracting a shared mechanism. Do not create a universal plugins/roles/events/feature-flag framework on speculation.

### B. Future capability readiness matrix (each is currently NOT BUILT)

| Future capability | Present-day architecture constraint to preserve | Actual future research/build gate | Why / source |
|---|---|---|---|
| **Login, sign-up, private client portal, admin** | Public services, cases, multilingual pages remain static/indexable. Reserve conceptual **public vs protected route/security boundary**; do **not** render pseudo-login or assume browser storage is authoritative. | When needed, compare managed maintained auth libraries/providers and server runtime; use selected backend adapter/on-demand routes **only for private paths**; define real identity, roles, permission per object, deny-by-default, logout/timeout, session/cookie policy, CSRF, abuse, password reset and data erasure. Security tests must try user A reading user B's objects. | Astro auth/on-demand route guidance https://docs.astro.build/en/guides/authentication/ ; https://docs.astro.build/en/guides/on-demand-rendering/ ; OWASP https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html ; https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/ ; MDN https://developer.mozilla.org/en-US/docs/Web/Security/Authentication/Session_management |
| **Embedded browser mini-game or playable creative demonstration** | Own distinct `/lab/[demo]` or optional `/games/[game]` route with real description, static fallback, accessibility label and provenance; do not block home/services/SEO. A first-party trusted small demo can be an isolated on-demand JS/canvas island. | Per actual game, choose HTML Canvas/2D vs Three.js/WebGL/WASM, licensed assets, keyboard/touch/gamepad, user-gesture-controlled sound, pause/mute, reduced motion, low-end CPU/GPU, tab-hidden pause and unload/cleanup, lost/restored WebGL context. Test no-JS/no-WebGL, lost GPU context and iframe/extension restrictions. | https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices ; https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context ; https://developer.mozilla.org/en-US/docs/Media/Guides/Autoplay ; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy/gamepad |
| **Untrusted/third-party games, code playground, downloadable user mods** | Treat game/demo as separate **trust boundary**. For third-party or untrusted active HTML, consider **a distinct origin** and restrictive sandbox, exact origin allowlists and content restrictions; NEVER give embedded untrusted code main site's cookies/auth. No user-supplied arbitrary code execution on public site without secure sandbox architecture and approval. | Compare sandbox iframe vs separately hosted demo; verify `allow-scripts`, `allow-same-origin`, `allow-popups`, `allow` feature permissions, CSP, safe `postMessage` origin/type validation, abuse and user data exposure. Same-origin iframe plus `allow-scripts allow-same-origin` is **not an effective security sandbox**; build isolation tests. | https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe ; https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage ; https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Permissions_Policy |
| **Heavy WASM/threads/game engine** | Do not set global cross-origin isolation headers just to make one future game work: COOP/COEP could break third-party fonts/media/social embeds, popups and other pages. Prefer a separate route/origin and explicit asset CORS/CORP policy if threads/`SharedArrayBuffer` truly required. | Confirm actual engine requirements and browser/device support; only then test COOP/COEP/Permissions-Policy per affected deployment, asset and embed compatibility, fallback when `crossOriginIsolated=false`. | https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated ; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy |
| **Game scores, saved progress, accounts, multiplayer** | Temporary browser state is **not durable business/game authority**: storage may be evicted, private mode clears it; avoid trusted high-score leaderboards or valuable user records in localStorage alone. Main static site does not receive game state by default. | For genuine saved progress, define schema version, migrations, backup/export/erase, sync and authoritative server ownership if score fairness matters. Multiplayer would demand server concurrency/reconnect/retry/idempotency, abuse protections and distinct latency/cost assessment. Do not create WebSocket/DB infrastructure now. | https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria ; https://web.dev/learn/pwa/service-workers |
| **Client upload, profile images, community comments, editable portfolios** | No upload endpoint or user-generated HTML pipeline now. Future uploads, comments and rich text form a separate moderated trust domain; published site content stays curated. | Validate MIME/signature/size, transform/sanitize, separate file serving and storage ACLs, malware and abuse handling, moderation/removal, user rights, backup/retention and object-level access. Avoid executing uploaded SVG/HTML as trusted origin code. | https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html ; https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/ |
| **Real payments, subscriptions, customer booking/orders (DISTINCT from B23 DEMO)** | The **B23 demo must include safe synthetic checkout/payment/accounting workflows** but the site does NOT process *real* purchases. A public contact CTA is not a payment gateway. Never collect actual card numbers or initiate real charges. | For *future real payment processing only*, separately assess business/legal/payment eligibility, identity/sanctions, chargebacks, taxes and actual zero-cost limits; prefer compliant hosted provider flows if eligible, server verification/webhooks/idempotency, refunds and reconciliation, explicit owner approval; do not enable if location eligibility fails. | OWASP authorization https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html ; official provider legal/pricing sources **to be researched at stage** |
| **AI chat widgets, live integrations, external APIs** | No provider secrets in static JS or committed files. Prefer demonstrative static content until real user intent/limits/abuse handling is approved. Future server API and its cost/abuse budget separated from marketing site's core. | Need-by-need provider discovery and fee/overage verification, data transfer impact and permissions, token control/server-side keys, rate limiting, moderation/log redaction and fallback on network failure; no unapproved AI endpoint exposed. | OWASP API Security https://owasp.org/projects/api-security-project ; MDN CSP https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy |
| **PWA/offline installation and notifications** | Avoid premature service worker: cache may show outdated translated text, previous builds or private content; background lifecycle isn't a reliable always-running worker. | Once real offline use exists, design clear cache version/scope, updates and rollback, storage quotas/eviction, private API no-store, notification consent/opt-out and test upgrade from old release. | https://web.dev/learn/pwa/service-workers ; https://web.dev/learn/pwa/assets-and-data ; https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria |
| **Expanded locale, social networks, advanced CMS/search** | Keep published locales tracked by **reviewed real page content**, stable IDs, route parity and explicit `hreflang` only for available translations. Social marks are verified links not affiliation claims. CMS/search database only after editing/search demand. | At each language/content expansion, test i18n fallback/redirect/canonical and build size; validate new social URL and icon rights; compare Git content editing vs CMS with actual value and permission scope. | https://docs.astro.build/en/guides/internationalization/ ; https://developers.google.com/search/docs/specialty/international/localized-versions ; https://developers.google.com/search/docs/crawling-indexing/canonicalization |

### C. Additional future-only acceptance tests (NOT YET APPLICABLE)

- **T16 auth & roles:** guest blocked from protected routes; session expires on server; identity verified on every protected object; second-user unauthorized access denied; logout/revocation, CSRF, password recovery and data deletion tested if relevant.
- **T17 embedded game & demo:** real playable control tests keyboard/touch/mobile, start/pause/mute, WebGL context lost/restored, no-WebGL/static fallback, low-memory and no autoplay audio; isolated untrusted game cannot read main site's DOM/cookies or navigate top-level without allowed user action.
- **T18 engine/header compatibility:** if `SharedArrayBuffer` or threaded WASM actually required, COOP/COEP/CSP/Permissions-Policy applied only where justified; social/video/font embeds continue to work in main marketing site; browser matrix and rollback tested.
- **T19 persistence & multiplayer:** reload, storage eviction/private mode, version migration, duplicate/retry and reconnect tested. For any user progress with value, durable state and ownership/recovery validated.
- **T20 uploads/payment/external API:** only when such endpoints actually exist: object-level permission checks, malicious file cases, CSRF/XSS/CSP, idempotent webhook/order handling, server-side secret handling, legal/commercial/provider quota confirmed.
- **T21 service worker / locale update:** if activated, old→new build cache update, offline navigation, privacy/private content, changed locale content, and unregister/rollback tested.

### D. Audit disposition and timing

**Audit status:** architecture assumptions reviewed against official Astro, OWASP, MDN, web.dev and Google docs. **No blocking contradiction requiring a new framework, database, account, auth code or game module now.** Important missing future-gate detail was added here. The public website still requires P2 owner content/design prioritization before implementation. **Every provider/library/MCP/pricing question is researched again at its actual B## stage**—not preapproved by this audit. No external call is recurring or automatic, and no background monitoring was scheduled.


---

## 10B. Visitor-facing AI and automation showroom: staged future integration — assessed 2026-11-14

**Owner's real use case:** Prospective international clients should be able to try the owner's web/AI/automation capabilities, ask about real services, explore project options and find approved contact channels, with potentially helpful ready-made answers and a limited free cloud model. **Decision classification:** architectural **POSSIBLE**, service/model deployment **DEFERRED**. This is an optional site feature, not a reason to create a separate repository, agent swarm, full-time paid backend, user login or AI infrastructure before the marketing website proves useful.

### 1. Product options, increasing complexity

| Tier & independent acceptance | User-visible behavior | Implementation boundary and true status |
|---|---|---|
| **D0 — Client guide (default, smallest adequate)** | Localized, keyboard-accessible Q&A with predefined questions and reviewed answers; service selection, portfolio links, safe call-to-action and a visible human contact path; no free-form AI promise. | **Same static site module**, content in reviewed locale-aware service/FAQ records; deterministic JS or native HTML controls; no API key, cloud model or server. Can be added as part of main B06/B14/B16 only after P2 UX brief. Currently **NOT BUILT**. |
| **D1 — Guided automation playground** | Visitor picks a public, non-sensitive example (e.g. classify a sample inquiry, transform synthetic CSV, propose steps for a fictitious website brief), observes input → operation → output, and may reset or download a safe sample. | Prefer **deterministic isolated browser demo** using fake/sample data and transparency about simulated vs actually executed workflows. Same `/lab` product section; don't expose Windows, Codex, email or arbitrary third-party automation APIs. **NOT BUILT**. |
| **D2 — AI-assisted service FAQ / project scoping** | Free-form multilingual natural-language input, model-supported explanation only from reviewed public knowledge base, links to service and case pages, suggest a non-binding project outline and refer uncertain matters to human. | **Future independently governed runtime/API boundary**; serverless proxy or own runtime after legal/free-tier verification; abstract provider behind one narrow internal capability (no generic agent framework). Includes anti-abuse, quota and privacy controls, observability and deterministic fallback to D0. **NOT BUILT / NEEDS APPROVAL**. |
| **D3 — Operational client assistant** | With clear informed consent, a customer may submit an actual inquiry, request an appointment or later use private account workflows; can include human-in-the-loop automation. | **Distinct high-trust application subproject** with ownership, real delivery/notifications, durable state, optional authz and independently approved third-party APIs. Requires its own security/permissions/payment/hosting design at the stage of real need. It may share UI brand and public route but **must not inherit unrestricted site/agent privileges**. **OUT OF CURRENT SCOPE**. |

**Recommendation:** Build marketing site without AI dependency; after owner-approved service copy and real case studies, launch D0 (a credible, honest client guide) first; trial D1 only when a specific automation is reproducible; evaluate D2 with small capped traffic and provider eligibility; consider D3 only if actual client workflows warrant it. Do not market a deterministic script as an autonomous AI agent. A `Contact` page never implies a working server form or committed order unless delivery is actually implemented/tested.

### 2. Site integration without premature infrastructure

- Existing proposed public routes remain `/[locale]/lab/` and `/[locale]/contact/`. Optional direct route `/[locale]/lab/assistant/` or `/[locale]/lab/automation/` is created **only when actual page content exists**; homepage can use a small optional widget linking to it, not load an LLM on initial page view.
- Keep service and case factual content **canonical in the existing site content records**. Approved FAQ/inquiry prompts may reference the same stable content IDs. Never let an external model revise factual source records or synthesize false pricing, availability, past clients, production guarantees or contacts. Public chat output is not source of truth.
- Suggested **future contract, not a code/type to instantiate yet**: `AssistantRequest {locale, query, publicServiceContextIds[], demoMode, clientRequestId?}` → `AssistantResponse {mode: deterministic|model|fallback, answer, citedPublicPageIds[], canHandoff, usageStatus}`. All fields undergo server-side validation and size limits if D2 exists. No client-set `systemPrompt`, `model`, `providerKey`, arbitrary URLs, secrets, tool choice or destination addresses. Provide consistent timeout, cancellation and fallback semantics; output is displayed as plain text/sanitized markup, not directly executed/rendered as HTML.
- **Optional backend separation:** Astro can prerender public pages and later host an **on-demand API endpoint** when a real supported adapter/runtime is selected. If the static host cannot legally/technically serve it, independently deploy one scoped backend or endpoint and connect through an explicit versioned API; not a blanket migration to Next.js. No special separate GitHub repository required merely to isolate runtime. High-trust D3 may be proposed as a separate project when justified, but GitHub remains one canonical owner of current site's code.
- **Site resilience:** D2 disabled/error/quota-exhausted → D0 predefined answer menu plus human contact visible. No black-box widget blocks page content, locale navigation or portfolio. Accessibility: chat log announcements (not intrusive), labels, focus, chat keyboard/screen-reader, mobile viewport, RTL/LTR, languages, contrast, loading/error and reduced motion. Response length and latency must be bounded.
- **Future social integrations** are *outbound verified profile links* initially; never auto-publish or automate social account actions without separate narrow authorization. Likewise lead emailing/scheduling/payment are external consequential operations requiring explicit approval and server-enforced rules; public visitors cannot command DJMRN's connected Gmail, GitHub, Notion, Windows, ChatGPT account, Codex, remote desktop, agent MCP connectors or stored credentials.

### 3. What can be FREE and what cannot be assumed

Research snapshot only, **NOT vendor selection, account entitlement, or approval to use credits**:
- **Cloudflare Workers Free**, official pricing (2026-10-02) states **100,000 requests/day** and **10 ms CPU / invocation**; this is an HTTP execution budget, **NOT included LLM inference**. Actual site/legal/commercial/geographic eligibility and limits must be validated before activation. https://developers.cloudflare.com/workers/platform/pricing/ ; https://developers.cloudflare.com/workers/platform/limits/
- **OpenRouter free model variants** official page currently advertises **20 requests/minute and 50 requests/day** without purchased credits, and failed requests can count; could be enough for a carefully capped private demo, **not a reliable unlimited anonymous public chatbot**. A paid-credit threshold can increase caps; **not authorized**. https://openrouter.ai/collections/free-models ; https://openrouter.ai/pricing
- **Google Gemini Developer API Free** applies only to eligible named models/tiers and current account limits; Google says content sent to eligible Free may be used to improve its products. Therefore real leads, confidential client briefs, user PII and secrets must not be automatically forwarded to such provider. Validate terms/data processing/region/account at future D2 selection. https://ai.google.dev/gemini-api/docs/pricing ; https://ai.google.dev/gemini-api/docs/rate-limits
- **Cloudflare Turnstile** does not itself stop server abuse if only client widget is used; server-side Siteverify is mandatory, along with practical per-IP/session quotas, payload/token/cost ceilings and optional daily hard-off. https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- **Secrets** for any provider are server-side only and never shipped in browser source, Git, client prompts, public demos or analytics. Google explicitly says API keys must never be exposed client-side. https://ai.google.dev/gemini-api/docs/api-key
- **MCP, DSAP, desktop integrations and existing powerful agents:** integration transport/tools are **not** a free public AI model, internet-scale runtime, secure authorization boundary or cost waiver. Use them for internal owner-authorized research/development only. Public visitor chatbot must not be bridged directly to the same broad-trust desktop/Gmail/Codex tools.
- **Operating rule:** Free → usable free tier with verified remaining quota → truly free alternative → **STOP**. Unknown price, overage, data policy, regional access or paid-path risk means no activation. Research exact current services/models and model quality at the implementation stage, not now.

### 4. Security, customer trust and operational safety

**Threats**: anonymous automated traffic exhausts 50/day model requests; prompt-injection asks model to reveal private data or access tool capabilities; fabricated work/pricing/contacts; spam messages; malicious HTML/script output; model/API provider outage; false promises that messages were sent or orders placed; private messages retained/sent to model without notice; unintended paid inference if free limit/plan changes; multilingual moderation inconsistency.

**Mandatory D2 gate**:
1. **Read-only allowlisted content** with grounded answer links and small authorized public knowledge base; no email, calendar, repository, local desktop, third-party tooling or arbitrary website fetch. Treat all visitor and retrieved text as untrusted data, never privileged instructions.
2. Server-side endpoint uses **strict allowlisted request/response contract**, max request size, history count, token/response caps, request timeout, output encoding/sanitization, refusal for unsupported questions and no invented facts/pricing. Provider-specific code only behind one simple adapter if real switching is needed.
3. Public abuse controls: independent site-defined quotas, cooldown, per-IP/session counter where privacy-safe, optional server-side verified challenge, no billing-based overages, daily hard budget and shutoff. A burst of visitors should not silently debit private credit funds.
4. Trust statement: show visitors whether a reply is **predefined, simulated or AI-generated**; display appropriate privacy text and **human handoff**. Don't imply a real staff member, official guaranteed quote, completed order, action or notification if none occurred.
5. For D2 model trials, use synthetic or explicitly consented non-sensitive prompts only. Any user message potentially passed to another provider triggers disclosure and jurisdiction/privacy review. Avoid retaining raw chat/PII by default. If retained, specify owner, lifecycle, consent, access, deletion and data incident plan.
6. No vendor fail-open path: 429/provider timeout/unauthorized/geoblock/quota/data leak risk → D0 or offline message. No automatic paid model fallback or unapproved provider rerouting. Test prompt-injection, abusive traffic, 3rd-party outages, authorization and cost hard-stop.
7. **Agentic actions (D3)** require explicit allowlisted action type and payload validation, server-side authorization, human/owner confirmation for sending real inquiries or making commitments, per-action audit with no sensitive secrets, idempotency and recovery; LLM text alone does not authorize actions. OWASP prompt-injection guidance identifies excessive agency and privilege boundaries as central risks.

Sources: https://genai.owasp.org/llmrisk/llm01-prompt-injection/ ; https://owasp.org/projects/top-10-for-large-language-model-applications ; https://developers.cloudflare.com/turnstile/get-started/server-side-validation/ .

### 5. Scope ownership, phase timing, decision ticket and tests

- **B03/B06/B13/B16** own future UX, content discovery, accessible chat interface, handoff and lead journey. **B04** owns all locale text, directions and translation sign-off. **B07** owns one narrow optional backend/API boundary; no actual endpoint now. **B09/B10** own visuals and graceful degradation. **B15** owns realistic lab demonstration and proof. **B17/B18/B19** security, CWV/SEO, quality. **B20** hosting eligibility, actual LLM-inference quota, region/legal verification and separately approved deployment. **B21** qualified lead measurement without unapproved tracking. **B22** expansion/activation only with real need. This is a cross-cutting feature package, NOT a mandatory twenty-third always-active domain.
- **New deferred ticket `RQ23 — AI visitor guide and automation demo`**: At the point D1/D2 is requested, research public visitor use cases, deterministic vs AI benefit, exact cloud model and inference quota, production/free eligibility, data handling/training, key storage, serverless cost and cold-start, abuse controls, fallback, translations, sample demo safety, visitor-to-human handoff, maintainers/incident response. Compare one simple implementation and up to two justified alternatives; stop if cost/permissions unknown.
- **Acceptance `T22 — deterministic guide`:** real desktop/mobile and keyboard user finds service, follows approved links and human contact; localizations/RTL and offline/no-model mode tested; no network model call, no fake AI label.
- **Acceptance `T23 — bounded model demo`:** on test environment, synthetic queries only; measure answer grounding/quality vs canonical approved pages, latency, 429/500/timeout, quotas hard-stop, no secrets, malicious prompt handling, server-side provider key, user-visible mode indicator, accessible conversation, fallback. Test failure mode and cost-free request accounting before any public activation.
- **Acceptance `T24 — automation scenario demo`:** demonstrates actual deterministic input/output for at least one harmless user scenario or clearly labels simulation; no ability to execute user-supplied arbitrary code, trigger emails, access account tools, place orders or store unauthorized data. Confirm value and replayability.
- **Acceptance `T25 — real lead/action boundary`:** only if real submission integration exists: human handoff actually delivered, explicit user confirmation/consent, correct notification destination, idempotency, validation, spam constraints, retention and deletion; deny unauthorized role/account actions. All claims independently checked.
- **Acceptance `T26 — graceful provider removal`:** no model availability/blocked API/removed provider does not break home, service navigation, portfolio, localized content, contact or static guide; tests from mobile/desktop and link/SEO remain green.
- **Release disposition:** Site baseline may ship with no AI chat at all. D0 can follow once FAQ content exists. D1 can be its own bounded demonstrator. D2/D3 require their own proposal/security/cost/permission owner sign-off and then actual proof; none are `DONE` now.

**Conclusion:** The existing site architecture and master roadmap already provide suitable extension points. The only missing part was an explicit *public visitor trust boundary*, free-quota safety plan and phased AI/demo contract; these are now captured here without prematurely implementing any service. **No new project/repo or provider activation is required now.**
