# DJMRN — Freelance & Vibe Coding Promotional Website
**Project ID:** DJMRN-FREELANCE-WEBSITE-001  
**Persian title:** سایت تبلیغاتی حرفه‌ای فریلنسری و وایب‌کدینگ  
**Created:** 2026-11-14  
**Status:** READY FOR P2 / S1 / B01+RQ01 research and owner-led requirements kickoff; source implementation NOT STARTED  
**Type (OWNER CONFIRMED 2026-11-14):** DJMRN's own **advanced public demonstration portfolio and promotional capability showcase**, not an operating store, commercial transaction service, live client-delivery platform, hired-client contract or agency business.  
**Repository authority:** this existing DJMRN-Freelance-Operations repository. Source code, if later authorized, should live here until a separate repository is explicitly justified and approved.  
**Canonical project-specific progress and approvals (owner update 2026-11-14):** [PROJECT-LOG.md](PROJECT-LOG.md) in this same website directory, plus Git history. Previous entries in the parent [CURRENT-STATUS](../08-operations-and-continuity/CURRENT-STATUS.md) remain historical; future routine site stage logging occurs only here, not in competing parent logs. This README defines scope and standards; [MASTER-ROADMAP.md](MASTER-ROADMAP.md) is the detailed research-backed architecture and phased branch map; the execution plan remains a proposal until relevant owner sign-off.

## Site project navigation
- [Research and tools](RESEARCH-AND-TOOLS.md) — standards, source URLs, free offerings, plugin/MCP capability, Codex and alternatives, observed network blockers.
- **[MASTER ROADMAP — Full professional site architecture](MASTER-ROADMAP.md)** — the controlling B01–B22 main/subbranch map, ~8–10 language architecture, modular service and showcase pages, motion/3D, research questions, dependency graph, tool/free-tier decisions, test matrix and staged approvals.
- [Execution plan — START HERE](EXECUTION-PLAN.md) — operational per-stage procedure, P0–P10 gates, scoped Codex tasks and approvals.
- [Agent instructions](AGENTS.md) — project-scoped software-development guardrails for Codex, Work and other hosts.
- [Current site log](PROJECT-LOG.md) — the **single ongoing** site work/state/handoff record by explicit owner request.
- Canonical source repo: `DJMRN-Freelance-Operations`; source code, tests, assets and site records all stay under `09-self-marketing-website/`.

## Operational start checkpoint
**Governing sequence:** [MASTER-ROADMAP](MASTER-ROADMAP.md) → [EXECUTION-PLAN START HERE](EXECUTION-PLAN.md) → one approved B##/RQ## Codex task → real tests T## → **single** [PROJECT-LOG](PROJECT-LOG.md) checkpoint → user review → next stage. Do not create a second task/progress database. Current first stage is **P2/S1/B01/RQ01**; no paid/public action authorized.

## 1. Business objective and truth requirements
Create a distinctive, technically rigorous public demonstration website that **proves DJMRN's website-design, AI-assisted coding, automation, visual/motion, localization and related freelance capabilities through inspectable, playable or otherwise honestly described examples**. Its primary success measure is demonstrable capability and a trustworthy promotional portfolio, **not immediate commercial sales, payment conversion, order processing or running a customer business on this site**. A prospective employer/client may learn about available services and contact the owner through verified channels, but contact is secondary to proof.

**Owner-approved product classification / exclusions:** V1 = showcase, interactive demonstrations, clear service descriptions, case studies and optionally verified contact/social links. V1 does **not** require real commerce, payments, order status, customer accounts, client CRM, AI agent serving business inquiries, custom backend or production data storage. Future public AI guide, demo games and optional operational client workflows remain governed by [MASTER-ROADMAP §10A–10B](MASTER-ROADMAP.md), and require separate need/approval and clear labeling of **real vs simulated demonstrations**. **Hosting license caveat:** marketing professional services can still count as 'commercial use' under some provider terms; do not assume noncommercial hosting eligibility solely because checkout is absent. Check current provider terms, residency and actual free limits at B20.

Candidate services to confirm with owner and demonstrations: web/landing pages; UI/UX; JavaScript/Python/API and process automation; AI-assisted coding ("vibe coding") with engineering review; browser/website QA; data handling; visual/creative/media work. Do not promise expertise, a client, an outcome, production readiness, awards, income, testimonials, company status or completed customer project without evidence. Clearly distinguish a self-initiated concept/demo from paid customer work.

Suggested information architecture **proposal**: Home / Services / Selected Work & Case Studies / Method & Quality / About & Scope / Contact / Privacy (plus Terms if actually needed). A visitor should be able to explore and evaluate honest technical demonstrations and selected service capabilities; if interested in commissioning work, they can find a verified, optional human contact channel without creating an account.

## 2. Official evidence baseline — checked 2026-11-14
All items below are **proposed acceptance criteria**, not a claim that the website passes them. Up-to-date official references:
- **Responsive/mobile:** MDN https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design and Google mobile-first indexing https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing
- **Accessibility:** W3C WCAG 2.2 https://www.w3.org/TR/wcag/ ; QuickRef https://www.w3.org/WAI/WCAG22/quickref/ ; forms https://www.w3.org/WAI/tutorials/forms/labels/ ; reduced motion https://www.w3.org/WAI/WCAG22/Techniques/css/C39
- **Performance:** Google Core Web Vitals https://web.dev/articles/vitals and thresholds https://web.dev/articles/defining-core-web-vitals-thresholds
- **Security:** OWASP Top 10:2025 https://top10.owasp.org/ ; ASVS 5.0.0 https://asvs.owasp.org/ ; session guidance https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet ; MDN CSP https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
- **SEO:** Google Search Essentials https://developers.google.com/search/docs/fundamentals/seo-starter-guide ; structured data policies https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- **Internationalization:** W3C direction https://www.w3.org/International/questions/qa-html-dir.en ; Google localized pages https://developers.google.com/search/docs/specialty/international/localized-versions
- **E2E:** Playwright device emulation https://playwright.dev/docs/emulation

### 2.1 Responsive design / compatibility
Use *one responsive website* with shared URLs/content, not separately maintained mobile and desktop sites. Semantic HTML; mobile-first CSS; Grid/Flexbox, fluid type, responsive images, relative units and content-driven breakpoints. Acceptance proposal: no unintended horizontal overflow or overlapping controls at 320, 360, 390, 768, 1024, 1440 and 1920 CSS-px widths; inspect landscape, keyboard navigation and high zoom. Test actual Safari/iOS, Android/Chrome and desktop Chrome/Edge/Firefox where feasible; browser emulation is not a substitute for real-device sampling.

### 2.2 Accessibility / usability
Target **WCAG 2.2 Level AA** and manually check keyboard-only navigation, visible focus, form labels/errors, meaningful landmarks/headings, image alt text, sufficient contrast, logical reading order, touch targets and zoom. Conformance requires the complete page and all responsive variants to meet the success criteria; passing an automated scan alone does not establish conformance. Avoid uncontrolled auto-motion and use `prefers-reduced-motion` / accessible fallbacks.

### 2.3 Performance
Core Web Vitals intended production target (real-user 75th percentile separately for mobile/desktop): LCP <= 2.5 seconds; INP <= 200 ms; CLS <= 0.1. Use compressed responsive images, predictable dimensions, lazy loading *below the fold*, careful font strategy, caching and minimal JavaScript. No heavy animation/WebGL on the primary conversion path. Lab Lighthouse audits, build-size and network-throttle tests supplement real-user data; no guarantees before live measurement.

### 2.4 Design and motion quality
Define a coherent visual system: typography scale; consistent spacing/grid; reusable components; colors and contrast; modern editorial layout; distinctive hero; strong case-study visuals; clear calls to action; touch/hover/focus states; comfortable micro-interactions; dark/light treatment only if valuable. Motion must serve comprehension and not block content or reduce accessibility/performance. Optional 3D/WebGL only after a measurable benefit and a static fallback are established. Approved design language, brand, color palette and content rights remain OPEN.

### 2.5 Security and future authentication
Initial public marketing/portfolio pages normally **do not need visitor sign-up/login**. Do not introduce a customer-account backend, empty database or custom password implementation preemptively. If a private admin editor or client portal becomes a real requirement, design a separate authorized authenticated boundary after an explicit requirements/security review; prefer a reputable maintained auth library/provider, server-enforced authorization, secure cookies, session expiry/revocation, role checks and OWASP ASVS controls. A UI-only login screen or localStorage token is never a security boundary.
For production: HTTPS; restrictive security headers/CSP as compatible; dependency and secret checks; input validation/output encoding; rate limits/abuse protection on server-backed forms; CSRF controls where applicable; no API secrets in browser bundles; least privilege, backups/recovery for any actual stored data. Login and transactional tests are mandatory only if those features are actually implemented.

### 2.6 SEO, languages and commercial trust
Choose initial audience and languages before content creation; possible EN-first with FA RTL, subject to owner review. Correct `lang` and `dir`, bidirectional isolation for mixed Persian/English, translation consistency and locale routes; `hreflang` only where real alternate localized pages exist. Unique meaningful title/description, headings, crawlable content, canonical URLs, sitemap/robots when hosted, social previews, truthful structured data JSON-LD only for real public facts. No misleading review/organization snippets or promises of rankings.
Commercial trust: state services, deliverables, boundaries, realistic turnaround as agreed per project, real portfolio provenance, and accessible contact method. Privacy policy/consent and data retention must match actual site behavior and relevant jurisdictions; legal obligations reviewed before publication, not invented.

### 2.7 QA / maintenance / delivery
Future project acceptance gate: reproducible local build, lint/type checks as applicable, dependency review, E2E navigation/contact-path tests with Playwright, responsive screenshots and regression, keyboard/manual accessibility, automated accessibility scan, Lighthouse baseline, SEO metadata/links validation, security/headers scan and smoke check on chosen hosting. Logs/test reports are evidence; success must be independently observed. Plan rollback and route ownership before deployment. Never publish or connect a payment/login/customer-data service without owner approval.

## 3. Technology decisions — not yet approved
| Option | Suitable case | Cost/complexity and tradeoff |
|---|---|---|
| Semantic HTML + CSS + small JS/TypeScript | Small fixed website or first proof | Lowest complexity; repeated multi-page content may need lightweight templating |
| **Astro static + isolated interactive islands** | Strong candidate for content/portfolio + selective animation | Fast static output, controllable JavaScript; introduces framework build/dependencies; official https://docs.astro.build/en/concepts/islands/ |
| React/Vite SPA | Rich interactive app/site where client routing is important | Needs deliberate SEO/rendering and can ship more JS; not automatically justified for marketing |
| Next.js | Real authenticated dashboard, substantial server/data requirements or advanced rendering | Auth, sessions, deployment and framework maintenance add moving parts; official auth guidance recommends libraries https://nextjs.org/docs/app/guides/authentication |

**Judgment:** begin evaluation from the simplest content-focused static architecture; Astro is a *candidate*, not a finalized stack. If later login/admin becomes necessary, extension options remain open: no premature microservices, backend, provider or schema. Compare alternatives using actual design/content and interactive requirements.

## 4. Hosting/cost eligibility — research only
- Initial development and browser QA can be performed locally with existing Windows Node/Python/Git/Playwright and ChatGPT + Remote Desktop Commander, without launching Codex. This is established capability, **not yet a completed website**.
- **Cloudflare Pages Free** has published limits including 500 builds/month (2026-09-05 docs) and is a candidate; eligibility from Iran, legal terms, feature costs, card requirements, forms/backends and overage remain UNKNOWN pending actual deployment review. https://developers.cloudflare.com/pages/platform/limits/
- **Vercel Hobby Free** is expressly for personal/noncommercial use, not a default host for a site that advertises paid freelance services. https://vercel.com/docs/plans/hobby and https://vercel.com/legal/terms
- **GitHub Pages** docs say it is not intended/allowed as free hosting for operating an online business or commercial transaction-oriented site. Not selected for commercial deployment. https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- Domain name/registrar, email/contact infrastructure, analytics, monitoring and hosting must each pass cost/quota/eligibility/security review; **UNKNOWN cost=DENY activation**. No purchase, cloud registration, domain, deployment or publication authorized.

## 5. Open owner decisions before APPROVED roadmap
1. Primary audience: global businesses, startups, agencies, individual clients; priority paid service types and truthful scope.
2. Language strategy: English first, Persian first or equal bilingual; translation ownership.
3. Public brand/name, visual identity and reference examples; choose an animation intensity and 3D policy.
4. Actual demo/case-study assets permitted to show, their licenses, credits and explicit concept vs paid-project labeling.
5. Contact workflow: email link, secure form, scheduling link, messaging; no authentication until clearly needed.
6. Page list and content model; owner editing requirements; whether a private admin/editor is necessary.
7. Hosting/domain decision only after eligibility, limits, commercial use and zero-overage checks.

## 6. Historical high-level gates (details superseded by MASTER-ROADMAP)
R0 owner reviews standards/vision -> R1 requirements and actual portfolio evidence -> R2 wireframes & visual system/mobile/desktop design review -> R3 select smallest adequate frontend approach and local bootstrap -> R4 build public site and visual interactions in small vertical slices -> R5 local cross-device/performance/accessibility/security/SEO acceptance -> R6 reviewed hosting proposal with cost/legal/security -> R7 separately approved deployment and live smoke/monitoring -> R8 measure inquiry conversion and improve.

**Execution logging (owner-specific override, 2026-11-14):** On each authorized work stage, append one concise evidence-backed checkpoint (before-state, approved scope, exact files/commands, real results, tests, failures/recovery, Git commit/diff, next action) to [PROJECT-LOG.md](PROJECT-LOG.md) **inside this website folder only**. No competing daily log, duplicate registry, unapproved service/agent infrastructure, or simultaneous updates to the parent project status for routine site work. Source code, assets and tests must remain under this project folder. Every GitHub write needs commit/readback verification.

## 7. Current boundary and next decision
**Completed this turn:** research of standards and hosting terms; scope/acceptance proposal; repository project registration.  
**Not completed/not authorized:** final standards sign-off, site design, code scaffolding, local deployment, real login, contact form, production deploy or publishing.  
**Next (2026-11-14):** P0/P1 and read-only Codex kickoff passed; the authenticated local Git checkout and sync work with the existing WinINET proxy passed per Git command, without global security changes. Begin B01/RQ01 under P2/S1 using [EXECUTION-PLAN START HERE](EXECUTION-PLAN.md). The site code and hosting remain NOT STARTED / NOT APPROVED. See [PROJECT-LOG](PROJECT-LOG.md). 
