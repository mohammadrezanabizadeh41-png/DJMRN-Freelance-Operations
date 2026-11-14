# DJMRN-FREELANCE-WEBSITE-001 — MASTER ROADMAP: International Multilingual Creative Engineering Portfolio

**Document type:** CANONICAL design/build ROADMAP and research backlog (not the project activity log).  
**Version:** 1.2 — 2026-11-14 — **creative critique + mandatory stage-specific research integrated**, pending owner choice of final art direction and P2 kickoff. No blanket authorization to implement, install, activate providers, merge or deploy.  
**Owner's request (latest clarified hierarchy 2026-11-14):** a creative **SERVICE-FIRST freelancer/Vibe Coding website** with many explained service categories, each able to display one or more separately branded, nested and inspectable sample applications. The **Perfume Store (illustrative candidate)** with fictional cart, fake payment and accounting is **a linked sample under the E-commerce Website Development service**, NOT DJMRN's main site checkout, and involves no real money or financial obligations. Display technical capability with genuinely working synthetic-data workflows or accurately labeled simulations of freelance / AI-assisted coding work with modular services, convincing actual demonstrations, advanced visual motion/3D where useful, ~8+ languages, social-network integration, excellent responsive UX, SEO, security, performance and future expansion; research each branch before selecting its implementation.  
**Source authority:** `mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations/09-self-marketing-website/`.  
**Execution authority:** site source / Git commits; [AGENTS.md](AGENTS.md) governs Codex; [EXECUTION-PLAN.md](EXECUTION-PLAN.md) holds P0–P10 macro gates; [PROJECT-LOG.md](PROJECT-LOG.md) is the **ONE** changing stage/approval/test history. This ROADMAP specifies structure, dependencies and criteria, not duplicate daily progress.  
**Design authority (upon owner adoption):** Figma approved master frames + tokens. Other builders (MagicPath etc.) are noncanonical experiments/prototypes.  
**Evidence language:** FACT=official/live evidence; PROPOSAL=engineering judgment requiring owner sign-off; UNKNOWN=unverified eligibility/price/ability; PASS requires reproducible real output, not an AI assertion.

---

## 0. Product promise, hard constraints, definition of professional

**North star (OWNER CLARIFIED):** a technically impressive **service-first freelancer/Vibe Coding showcase**: meaningful service explanations → associated evidence-backed sample galleries → individually branded and testable demo app routes within the main website → a clear return to the parent service. Not a shop or live commercial service. It combines (1) truthful professional identity, (2) browsable capabilities and service descriptions, (3) real/clearly labeled concept case studies, (4) optional interactive demonstrations including automation/motion/3D, (5) optional accurate human contact links, and (6) multilingual, accessible, search-friendly presentation. Visual sophistication demonstrates craft **without blocking usability, performance or accurate claims**. Its core success is *inspectable quality and credible evidence of capabilities*, including **end-to-end demonstrable sample purchase/order/payment and accounting workflows**, not *actual* charges, sales, paid traffic or lead conversion at all costs.

**Scope interpretation and legal caveat:** the complete showcase includes a **realistic but sandboxed commerce-and-finance example under the e-commerce service page** (B23), with browsable products, cart, simulated checkout/gateway outcomes, sample orders, invoices, journal/accounting and reports as an **advanced demonstrable sample**, built in staged slices. The site is NOT a *real operating merchant*, licensed payment processor, live customer business or custodian of money; never send a charge, create a real payment intent, take a card number, issue a legally operative invoice, or store real financial/client records. A workflow may perform actual *local demo calculations/state transitions* on **synthetic data** and must display obvious permanent 'DEMO — NO REAL PAYMENTS/ORDERS' messaging. No real payment-provider account, credentials, external payment API, production transaction backend, real customer auth or live fulfillment without separately scoped owner approval. Promotional sites may still count as **commercial-use** under hosting/tool terms; check B20.

Nonnegotiable constraints: zero new paid usage until separately and explicitly approved; no production publication/domain/payments or sensitive account/security changes without impact + approval; content and portfolio claims verifiable; no fake testimonials or fake agency identity; no reliance on browser scraping or gated tools to render public pages; mobile/desktop must work without mandatory WebGL; no visitor auth, database or CRM until real I/O justifies them; only one canonical GitHub source. The Windows laptop has 8 GB RAM: only one active heavy agent/graphics editor at a time. GPT-6 Luna / Medium in official Codex is current economical implementation default; GPT-6.1 Sol / Medium is task-level escalation for genuinely complex reasoning; no default Ultra/paid credits. **Tool policy:** existing tool → verified free alternative → scoped trial; no app accumulation.

**Quality is multidimensional**: one coherent creative thesis + unmistakably original art direction + meaningful navigation + user trust + information findability + original design + **working and honestly described interactive demonstrations** + discoverable capabilities + accessible international content + tested code + measurable performance + operational reversibility. Contacts are optional evidence of interest, not the only success metric. A screenshot/mockup or a 100 Lighthouse score alone is not DONE.

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

### Candidate buyer-facing service taxonomy — P2/B01–B03 research snapshot (2026-11-14)

**OWNER-DIRECTED AUDIT / STATUS:** 8 visual *portals* → 24 optional *corridors* (2–3 per portal) → **52 distinct buyer-facing service families** (each may have 0–many truthful samples, with further subtypes added only for real needs). This is the CANDIDATE SERVICE COVERAGE MAP, **NOT 52 verified current offerings, 52 built sample apps, nor 52 new roadmap B## workstreams**. The existing **B01–B23 workstreams** still own planning/implementation. These `VP##/SC##/SV##` IDs are descriptive **proposed taxonomy labels for discussion**, not an implemented database/schema/provider registry; final identity/route names are accepted only at B02/B03 approval. 

**Interaction structure:** one artistically unified, multi-layer, optionally spatial DJMRN main hub displays **8 recognizably distinct graphical portals**, not a wall of 52 cards. Each portal expands into 3 labeled corridors, each corridor into 2–3 **separate services**, each service into one truthful explanation + **0–many** relevant gallery items; each actually built sample can be a video, playable website, audio, graphic gallery, code or working app, with its own media/visual branding, clear status and direct-link/back route. Show direct search/filter and a clear list-mode in parallel for users who want speed; no mandatory 3D/hover or obscure nomenclature. The active first fold should show brief visitor outcomes, not frameworks. Do not create unnecessary routes/depth for one-service scenarios. Grouping is a PRESENTATION strategy; semantic stable service URLs remain. 

**Market-evidence interpretation:** 
- **FACT [Upwork, 2026-02-04]:** https://www.upwork.com/research/in-demand-skills-2026 , https://www.upwork.com/press/releases/upworks-in-demand-skills-2026-demand-for-top-ai-skills-more-than-doubles-as-ai-is-embedded-into-everyday-work . 2025 US-origin CONTRACT earnings favor established full stack/web design/mobile/ecommerce/UX/automation/testing, graphics, video editing/production, data, SEO and virtual assistance; strong AI skill growth in *AI integration* +178%, *AI video generation/editing* +329%, *AI chatbot development* +71%, *AI data annotation* +154%. These are platform/period-specific growth rates, not global market-share, job counts or DJMRN earning forecasts.
- **FACT [Upwork, published 2026-10-14]:** https://www.upwork.com/research/upwork-monthly-hiring-insights-september-2026 . September 2026 searches particularly show AI SaaS, agent, workflow automation and AI video demand signals, plus WordPress/web customization; searches alone differ from signed contracts.
- **FACT [Fiverr, published 2026-06-09, search window 2025-11 to 2026-04]:** https://www.fiverr.com/news/business-trends-index-ai-2026 , https://www.fiverr.com/resources/guides/reports/business-trends-index-june-2026/ . Rising searches for AI video, editing, website creation, vibe coding, n8n automation, data-cleaning, social creative and translation; growth percentages are SEARCH trends, not measured available jobs or verified client eligibility. Source publication date differs from a guide page's later update date.
- **FACT [Upwork 2026-08 monthly / freelance jobs, source-limited]:** https://www.upwork.com/research/upwork-monthly-hiring-insights-july-2026 documents prompt-engineering persistence and AI-oriented services; https://www.upwork.com/freelance-jobs/voice-over/ indicates a distinct voice-over job category, but dynamic displayed counts are not a stable rank. Other categories below are practical, plausible client-facing catalog candidates, NOT proven equally high demand or active offerings.
- **JUDGMENT:** first research and example priority candidates include SV01/SV02/SV07/SV09/SV13/SV15/SV18/SV20/SV24/SV31/SV42/SV45; **priority is provisional**, must be adjusted by user's actual demonstrable skills, owned samples, language/legal geography, time/cost and provider access rather than market-growth rankings alone. Marketing, prompt-only or basic input work may have lower earnings or heavy competition. Never claim every listed category is similarly profitable.
- **B02 PROOF GATE:** label each SV## as `AVAILABLE_VERIFIED | CONCEPT_ONLY | RESEARCHING | NOT_OFFERED` after checking real output, skills, sample ownership, localization/voice ability, tool/free-quota, permission/security, and delivery. Pending verification, each SV## is **RESEARCHING / UNVERIFIED FOR PUBLIC OFFERING**, irrespective of marketplace demand. Only approved verified services appear as actively orderable; planned samples must never show as live or real customer commissions. No regulated finance/legal/tax, fraudulent marketing, scraping without rights, impersonation/voice cloning without consent, or paid ad spend without approval.

#### VP01 — وب‌سایت و تجارت آنلاین / Websites & Commerce (6 services)

**SC01 — سایت و مدیریت محتوا**

- **SV01 · طراحی و ساخت وب‌سایت:** شرکتی، شخصی، لندینگ، چندزبانه
- **SV03 · توسعهٔ WordPress و CMS:** قالب، افزونه، سفارشی‌سازی و سیستم مدیریت محتوا

**SC02 — فروشگاه و وب خلاق**

- **SV02 · ساخت فروشگاه اینترنتی:** کاتالوگ، سبد، سفارش؛ B23 پرداخت کاملاً ساختگی
- **SV05 · وب‌سایت تعاملی و سه‌بعدی:** گرافیک پویا، نمایش تعاملی، صحنهٔ سه‌بعدی اختیاری

**SC03 — تجربه و بهینه‌سازی وب**

- **SV04 · طراحی UI/UX وب و محصول:** وایرفریم، پروتوتایپ، سیستم طراحی
- **SV06 · نگهداری و بهبود فنی وب‌سایت:** رفع خطا، سرعت، واکنش‌گرایی و دسترس‌پذیری

#### VP02 — اپلیکیشن و برنامه‌نویسی / Apps & Software (6 services)

**SC04 — اپلیکیشن‌های کاربری**

- **SV07 · ساخت اپلیکیشن موبایل:** Android و iOS یا کراس‌پلتفرم مشروط به توان عملی
- **SV08 · ساخت نرم‌افزار دسکتاپ:** ابزارهای اختصاصی Windows و برنامه‌های کاربردی

**SC05 — محصول و زیرساخت نرم‌افزاری**

- **SV09 · ساخت وب‌اپلیکیشن و SaaS:** داشبورد، پنل و سامانهٔ تحت وب؛ متفاوت از سایت معرفی
- **SV10 · توسعهٔ بک‌اند و API:** منطق سرور، API و یکپارچه‌سازی فنی

**SC06 — ابزار، اصلاح و آزمون**

- **SV11 · اسکریپت‌نویسی و ابزار Python/JavaScript:** پردازش فایل، خط فرمان، ابزار کمکی؛ نه سناریوی رسانه‌ای
- **SV12 · آزمون، رفع باگ و QA نرم‌افزار:** آزمون مرورگر، عملکرد، رگرسیون و گزارش خطا

#### VP03 — هوش مصنوعی و خودکارسازی / AI & Automation (6 services)

**SC07 — گفتگو و عامل‌های هوشمند**

- **SV13 · ساخت چت‌بات و دستیار AI:** پرسش‌وپاسخ و رابط گفتگویی با کنترل دسترسی
- **SV14 · ساخت ایجنت هوشمند:** عامل وظیفه‌محور با ابزار مجاز و نظارت انسان

**SC08 — ادغام و پرامپت**

- **SV15 · یکپارچه‌سازی AI با محصولات:** افزودن قابلیت AI به اپ و گردش‌کار با هزینهٔ کنترل‌شده
- **SV16 · مهندسی پرامپت و طراحی دستورها:** پرامپت ساختاریافته، ارزیابی کیفیت و الگوی اجرا

**SC09 — توسعهٔ AI-assisted و فرایند**

- **SV17 · Vibe Coding و نمونه‌سازی با AI:** ساخت نمونهٔ کاربردی با بازبینی و آزمون مهندسی
- **SV18 · اتوماسیون گردش‌کار و RPA:** فرایندهای فایل، وب و اتصال سرویس‌های مجاز

#### VP04 — ویدیو و تصویر متحرک / Video & Motion (6 services)

**SC10 — تولید و تدوین**

- **SV19 · ساخت و تولید ویدیو:** تیزر، آموزش، معرفی برند و محصول
- **SV20 · تدوین و ادیت ویدیو:** مونتاژ، اصلاح رنگ، میکس و خروجی نهایی

**SC11 — کوتاه‌فرم و موشن**

- **SV21 · ویدیوی کوتاه و شبکه‌های اجتماعی:** Reels، Shorts، تیزر عمودی و UGC مفهومی
- **SV22 · موشن‌گرافیک:** تایپوگرافی متحرک، موشن لوگو و اکسپلینر

**SC12 — انیمیشن و ویدیوی هوشمند**

- **SV23 · ساخت انیمیشن دوبعدی و سه‌بعدی:** حرکت شخصیت، محصول و روایت انیمیشنی
- **SV24 · تولید ویدیوی AI و پس‌تولید:** نماهای تولیدی، انتخاب، اصلاح و تدوین انسانی

#### VP05 — صدا، گویندگی و موسیقی / Audio & Voice (6 services)

**SC13 — گویندگی طبیعی و مصنوعی**

- **SV25 · گویندگی و ساخت وویس:** نریشن، دوبله و وویس‌اور فقط در زبان‌های واقعاً قابل ارائه
- **SV26 · ساخت صدای AI و متن‌به‌گفتار:** TTS و صدای مصنوعی با رضایت صاحب صدا، بدون جعل هویت

**SC14 — ویرایش و پادکست**

- **SV27 · ادیت و ترمیم صدا:** نویزگیری، میکس، مستر و اصلاح فایل صوتی
- **SV28 · تولید و تدوین پادکست:** ساختار اپیزود، ویرایش، بسته‌بندی و خروجی

**SC15 — موسیقی و متن صوتی**

- **SV29 · ساخت موسیقی و طراحی صدا:** جینگل، موسیقی اختصاصی مجاز و افکت صوتی
- **SV30 · پیاده‌سازی صوت و زیرنویس:** رونوشت، زمان‌بندی کپشن، زیرنویس و تبدیل صوت به متن

#### VP06 — گرافیک، هنر دیجیتال و سه‌بعدی / Graphic, Visual & 3D (6 services)

**SC16 — هویت و تبلیغات**

- **SV31 · طراحی لوگو و هویت بصری:** نشان، سیستم رنگ و عناصر برند
- **SV32 · طراحی گرافیک تبلیغاتی و شبکهٔ اجتماعی:** پوستر، بنر، کاور، پست و کمپین

**SC17 — تصویرسازی و تصویر**

- **SV33 · تصویرسازی و تولید تصویر با AI:** تصویر هنری و تبلیغاتی با حقوق و اصالت روشن
- **SV34 · ادیت و روتوش عکس:** اصلاح عکس، حذف پس‌زمینه و ترکیب تصویر

**SC18 — سه‌بعدی و ارائه**

- **SV35 · مدل‌سازی و رندر سه‌بعدی:** مدل محصول، صحنه، متریال و رندر
- **SV36 · طراحی ارائه و اسلاید:** PowerPoint، Pitch Deck و ارائهٔ آموزشی/تجاری

#### VP07 — نویسندگی، محتوا و بازاریابی / Writing, Content & Marketing (8 services)

**SC19 — متن و سناریو**

- **SV37 · کپی‌رایتینگ و متن تبلیغاتی:** متن لندینگ، محصول و پیام کمپین
- **SV38 · سناریونویسی و اسکریپت رسانه‌ای حرفه‌ای:** سناریوی ویدیو، پادکست، تبلیغ و یوتیوب؛ جدا از اسکریپت برنامه‌نویسی
- **SV39 · مقاله‌نویسی و محتوای متنی:** وبلاگ، راهنما، شرح خدمات و محتوای تخصصی

**SC20 — ویرایش و زبان**

- **SV40 · ویراستاری، بازنویسی و اصلاح متن:** Proofreading، ساختاربندی و کنترل کیفیت متن
- **SV41 · ترجمه و بومی‌سازی:** محتوای چندزبانه، UI copy و زیرنویس با بازبینی انسانی

**SC21 — رشد و ارتباطات**

- **SV42 · خدمات SEO و جست‌وجوپذیری:** SEO فنی، تحقیق کلمه و بهینه‌سازی محتوای وب
- **SV43 · مدیریت محتوا و شبکه‌های اجتماعی:** تقویم محتوا، مدیریت انتشار با مجوز و گزارش
- **SV44 · ایمیل‌مارکتینگ و کمپین دیجیتال:** کمپین ایمیل، پیام‌ها و تحلیل؛ بدون ارسال ناخواسته یا هزینهٔ تبلیغ بدون مجوز

#### VP08 — داده، تحقیق و خدمات اداری / Data, Research & Operations (8 services)

**SC22 — اکسل و امور اجرایی**

- **SV45 · Excel و Google Sheets:** فرمول، فایل کاری، پاک‌سازی و اتوماسیون صفحه‌گسترده
- **SV48 · تایپ، ورود داده و تبدیل اسناد:** تایپ، تبدیل PDF به جدول/متن، قالب‌بندی اسناد
- **SV50 · دستیار مجازی و امور اداری آنلاین:** ساماندهی فایل، تقویم، هماهنگی و پشتیبانی مجاز

**SC23 — تحلیل و تحقیق**

- **SV46 · تحلیل داده و داشبورد:** گزارش KPI، مصورسازی و آمار کاربردی
- **SV47 · استخراج و پردازش داده:** ETL سبک، پاک‌سازی، جمع‌آوری از منابع مجاز
- **SV49 · تحقیق اینترنتی و بازار:** رقبا، گردآوری شواهد، گزارش ارجاع‌دار و تحلیل

**SC24 — مدیریت عملیاتی و AI data**

- **SV51 · مدیریت محتوایی و عملیاتی فروشگاه:** ورود کالا، کاتالوگ و عملیات مجاز؛ نه توسعهٔ فروشگاه
- **SV52 · برچسب‌گذاری داده و ارزیابی AI:** Annotation، طبقه‌بندی و کنترل کیفیت دادهٔ مجاز

**Boundary and expansion rules:** (a) SV01 brochure website ≠ SV02 real/synthetic storefront ≠ SV09 working web app; (b) SV07 mobile app ≠ SV08 desktop program; (c) SV11 executable Python/JS scripting ≠ SV38 copy/scriptwriting for video; (d) SV19 end-to-end video production ≠ SV20 edit-only ≠ SV24 AI video production; (e) SV25 recorded natural voice ≠ SV26 authorized synthetic voice ≠ SV27 sound cleanup; (f) SV16 prompt engineering is an explicit deliverable, while SV17 AI-assisted development must still produce tested code; (g) SV02 website development ≠ SV51 ecommerce catalog/admin operations; (h) SV23 animation ≠ SV35 3D still model/render. Cross-domain services can tag shared relatedServiceIds and share *existing* samples without duplicate identities or cloned app shells. Future games, cybersecurity, high-risk financial/legal consulting, account login and production provider integrations stay stage-gated, not advertised simply to inflate the catalog.

**B03/P3 handoff:** owner first approves distinct buyer-service wording and proof readiness, then P3 explores 2–3 different original visual arrangements of the SAME 8 portal / 24 corridor / 52 service taxonomy (not 52 home-page icons), with 1 fully designed portal→corridor→service→sample-gallery→contained demo/return slice, mobile/fa-RTL/en-LTR/list fallback and direct searchable service entry; compare T34–T40. No local coding, service publication, skill claims, third-party billing or design-library lock authorized by this taxonomy decision.

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
│   │       └── Relevant sample gallery (0 live until built; may later show 1, 2, 3...)
│   │           ├── Sample A (ILLUSTRATIVE CANDIDATE, NOT CHOSEN/BUILT): Perfume Store → working storefront DEMO when tested
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

**Brand/niche status (important):** the owner used a perfume store only as an EXAMPLE to illustrate service→sample linking. The **required feature target** is at least one believable, fully bounded ecommerce/finance demonstration associated with the ecommerce service; the actual niche (perfume, apparel, etc.), fictional shop name, visual direction and exact scope remain OPEN for P2/P3 review. Do not silently treat perfume as chosen, built or published. This preserves creative exploration and makes B23 a reusable exemplar rather than a fixed product brand.

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

**Current plan action:** existing B03/B14/B15/B23 align with this nested portal. Audit now reconciles cross-stage contracts and tests. This planning review is not approval to build the perfume store, finance engine, form or other feature; research each tool/provider only when its actual stage starts.

---


## 1B. Owner-requirement coverage and final-stage review matrix (2026-11-14)

**Meaning of COVERED:** a requirement is explicitly mapped to an owner/workstream, research-at-execution gate and planned validation; it is **NOT evidence that UI, demos, translations, security, hosting or test cases are built or passed**. Product concept is owner-confirmed; **the full implementation roadmap remains PENDING FINAL OWNER REVIEW**. When historical sections conflict, §0 + §1A + this matrix represent the latest clarified intent.

| User intent / example | Workstream ownership and validation | Planning status |
|---|---|---|
| DJMRN home is an imaginative **multi-service freelancer and Vibe Coding portal**, not a shop | B01/B03/B05/B14; P2/P3, T02/T32 | COVERED |
| Category windows and substantial explanation pages for different services | B03/B06/B14, B04 locale routes, T02/T04/T05 | COVERED |
| A service may lead to **zero, one or several real sample cards** and later gain more | B02 evidence; B14 service; B15 sample registry; B07 contracts; T32/T33 | COVERED |
| Clicking a service sample opens **an independently styled, contained real demonstration inside DJMRN**, with its own shareable URL, back/forward and return-to-service | §1A, B03/B05/B07/B15, T32/T33 | COVERED |
| A sample has separate optional case-study explanation and executable demo pages, not duplicated sites | B15/sample ID, B18 metadata, T32 | COVERED |
| Under **E-commerce Website Development**, a **Perfume Store (illustrative example, brand not selected yet)** could provide fictional products, cart, simulated gateway, invoice, ledger and reports, but DJMRN home does NOT | B14/B15/**B23**, RQ24, T27–T33 | COVERED, NOT BUILT |
| Fake success/decline/refund, exact money arithmetic, sample-data labels, safe reset; no real bank/payment info | B17/B23, T27–T31 | COVERED, NOT BUILT |
| New store samples and later automation/AI/creative/video/game demos fit under appropriate services without cloning DJMRN | B07/B14/B15/B22, §§10A–10B, T33 | COVERED, FUTURE GATES |
| Distinct visual identities per sample; consistent DJMRN navigation/accessible return | B05/B06/B15/B23, T14/T32/T33 | COVERED |
| Creative effects, video, 2D/3D, optional games; mobile fallback and reduced motion | B09–B13/B18, T04–T07/T13, §10A | COVERED, SPECIFIC FEATURES STAGED |
| International site prepared for ~8–10 languages, approved translations, correct RTL/LTR and SEO | B04/B18, T03/T05/T32 | COVERED, LOCALES NOT YET APPROVED |
| Real verified creator social links; optional contact/feedback distinct from fictional storefront checkout | B09/B16/B17, T09/T11; permission/privacy gates | COVERED, CONTACTS OPEN |
| Optional predefined Q&A, AI assistant and automation demos, with no unrestricted access to private agents/desktop | §10B, RQ23, T22–T26, security/cost approval | COVERED, OPTIONAL/DEFERRED |
| Future login/portal, untrusted games, uploads, PWA and *real* payment integrations can be reviewed later | §10A, B07/B22, T16–T21 | COVERED, NO PREMATURE BACKEND |
| Show only truthful capabilities and permitted original assets, never invent paid clients or technical test passes | B02/B09/B15/B17, T09 | COVERED, ACTUAL EVIDENCE OPEN |
| Responsive, accessible, secure, fast, measurable source code and independently tested samples | B08/B12/B13/B17–B20, T01–T33 | COVERED, NOT TESTED |
| Unmistakably authored creative thesis, distinctive typography, original narrative and purposeful signature (not a generic prompt-created template) | §1C, B01/B05/B06/B10, P3, T34/T37/T40 | COVERED; ART DIRECTION A/B/C NOT CHOSEN |
| **Mandatory live research** before every substantive design/build task: real successful sites, current trends, peer-reviewed/credible UX, official docs, options/failures, licensing/security/free tier and test | §5A, all B01–B23/RQ stages, EXECUTION-PLAN, T34–T40 | COVERED; EACH FUTURE STAGE RESEARCH NOT YET DONE |
| Fast path and creative discovery path, optional Inspect behind actual build evidence, independent art-direction bakeoff BEFORE mass pages | §1C, B03/B05/B15/B19, P2/P3/P5/P7, T35–T40 | COVERED, NOT BUILT/APPROVED |
| Free-first, research each stage when it starts, one GitHub code authority, Codex + independent desktop QA | B07/B08/B20, EXECUTION-PLAN, PROJECT-LOG | COVERED, PROVIDERS OPEN |

**Audit verdict (amended creative critique 2026-11-14):** no known critical omission in *requirements and planned module boundaries* after §1C's distinctiveness and §5A's mandatory research-first governance are incorporated. Artistic direction and research outcomes for future stages are explicitly still OPEN. This is **READY FOR OWNER REVIEW**, not permission to start coding without the user's next approval and not a guarantee of deployment feasibility. Real design, stack, providers, working software, asset rights, test results, locale publication and hosting approval are still **OPEN**.

**Approval phases stay separate:** (a) owner may approve the overall roadmap and kickoff **P2/B01**; (b) later accept the actual service taxonomy, concept content, visual designs and stack at P2–P4; (c) authorize specific implementation increments; (d) approve any cost, sensitive provider and production deployment separately.

**P2 must produce before P3:** a researched original **creative thesis / experience promise**, fast vs exploratory discovery paths and coherent 'service → demo → optional Inspect' concept; P3 must then compare 2–3 genuinely distinct art directions; confirm which fictional e-commerce sample niche/brand (Perfume Store is ONE POSSIBLE IDEA, not a mandatory choice); capability/service taxonomy with real evidence status, service → sample map, sample status **planned vs prototype vs tested vs published**, example perfume-store navigation + a second different service/sample concept, service and demo direct-link/return wireframes, main versus example visual style direction, launch locale priorities, initial working vertical and independent acceptance scope. *An unbuilt sample must never be advertised as live.*

---


## 1C. OWNER-REQUESTED CREATIVE CRITIQUE INTEGRATION — crafted, unmistakably original service-and-demo experience (2026-11-14)

**Status:** APPROVED to **incorporate all recommendations into the ROADMAP for comparison and staged research**; **specific visual style, final creative concept, tools, layout and code remain PROPOSAL until the owner's design-stage choice**. These recommendations refine B01/B03/B05/B06/B10/B11/B14/B15/B18/B19 and P2/P3/P5/P6, not a new site/repository/agent architecture or an extra mandatory microservice. The owner requests a portfolio whose thoughtful composition, craft, real engineering and original execution stand apart from quickly generated generic prompt-to-website templates.

### A. Critique of the current plan: strengths and creative gaps

| Dimension | Current strength | Actual failure risk / necessary corrective gate |
|---|---|---|
| Architecture | 23 branches, service-first shell, per-service sample galleries and nested demo apps | Too much structure without a unified **creative thesis**, uneven integration, scattered visual identity |
| Capability coverage | Broad freelancer/Web/Vibe Coding services, 3D, creative, AI, automation, finance examples | Too many superficial demos; prioritize **one deep working proof** before adding many shallow examples |
| Art direction | B05 tokens, fonts, dark/light, variants and B10/B11 motion/3D | A palette + gradient + glow + stock-looking hero + repetitive bento cards is not a distinctive brand; requires **custom art direction and visual grammar** |
| Visitor experience | Semantic routes, service/gallery/demo navigation, accessible return | Route can be correct yet feel ordinary; need **distinct exploration, signature moment and useful discovery**, without making users decode an OS-themed site |
| Engineering credibility | Real demo QA, synthetic financial state/tests, B19 checks | Impressive screenshots can hide broken interactions; need **inspectable proof of craft**, actual failure handling, clear source/QA provenance |
| Accessibility/performance | WCAG 2.2 AA target, language + fallback, Core Web Vitals | Excess WebGL/scroll hijack and loader theatrics may alienate visitors, especially mobile/RTL or reduced motion |
| Creative production | Design iterations possible in P3 | Code 20 pages before validating distinctiveness → expensive rework; **art-direction bakeoff and one proof-of-experience vertical** before template multiplication |

**Anti-template diagnostic / RED FLAGS:** indistinct "We create digital experiences" prose; unearned huge claims/testimonials; identical rectangle/card grids everywhere; generic gradients/glassmorphism/neon, arbitrary animated particles, obligatory 3D planet/cube, unlicensed stock artwork, stock SaaS dashboard appearance, a single massive scroll-only presentation, and novelty UI that hides simple service navigation. These motifs are **not categorically banned**—they fail when unmotivated, copied, or indistinguishable from defaults. Every decoration or interactive choice needs an identifiable brand/visitor/story purpose.

**Authenticity caveat:** no one can scientifically prove a site "cannot be produced with four prompts." The defensible difference is a coherent creative concept, original assets/copy, purposeful interaction, measured execution, resilient UX and honest functional evidence.

### B. Proposed overarching experience concept: "DJMRN / Living Digital Workshop"

**Creative PROPOSAL, not selected branding:** A **living digital workshop / creative engineering atelier** where the visitor can (1) **Explore** the real service catalog, (2) **Experience** purpose-built sample applications, (3) optionally **Inspect** the actual design/engineering choices and QA evidence. This is a semantic/visual metaphor for ownership, craftsmanship and multiple skills, **not** a requirement to mimic an operating system, window manager, IDE or 3D game.

Visitor paths must be deliberately dual-mode:
- **Fast path / 5-second clarity:** from any landing, promptly understand *who DJMRN is, which services are offered, one convincing example, and where to continue*; visible native service links, meaningful copy and restrained first paint. The "five-second" exercise is an **internal qualitative usability heuristic**, not a published universal standard or guaranteed numerical UX score.
- **Discovery path / deeper exploration:** intentionally composed service portals, adaptive preview motion, controlled navigation transitions, sample gallery/interactive demo and optional "behind the build" view; never mandatory before basic information.
- **Expert proof path:** "Result → Try it → Behind the Build": project constraints, what the creator actually authored, architecture sketch, intentional visual/interaction decisions, actual behavior/invariants, errors and tests with dated evidence, limitations and permission-aware code link (when appropriate); avoid false badges, fake benchmark figures or exposing secrets.
- **Return/context:** transitions preserve context and accessible "Back to [real originating service]" affordance. No forced new tab, dead-end immersive exhibit, compulsory tutorial, audio autoplay, cursor hijacking or loss of keyboard focus.

**Proposed distinctive details to research, prototype and choose only if they improve value:** a custom typographic logotype or monogram, precise editorial grid and asymmetry with responsive logic; one original visual motif appearing across selected service cards and case-study graphics; one remarkable transition that explains entering a sample rather than just decorates it; dynamic but performance-bounded previews using **real demo media**; credible engineering/art-direction annotations; a "compare how two implementations solve a problem" view; a bounded one-click sample walkthrough; and subtle bespoke hover/focus states. More effects are not automatically better.

**"Inspect / Behind the Build" is optional per sample and NOT a separate app or obligatory code dump.** Its minimum is a readable section on the sample/case page with e.g. a single before/after, state-machine/interaction explanation, actual screen/mobile testing and known limitations. A more interactive visualization is justified only if it materially improves understanding.

### C. THREE researchable visual directions (A/B/C, do not pick yet)

| Direction | Character and opportunity | Failure risks | Default proposal to compare |
|---|---|---|---|
| **A. Premium Creative Engineering Atelier** | Bespoke editorial typography, white/negative space or balanced dark palette, precise hierarchy, original graphics, distinctive responsive rhythm; clarity and credibility | Can become generic minimal agency website if under-designed; needs unique storytelling, typographic detail and original assets | **Leading candidate** |
| **B. Curated Interactive Gallery** | Purposeful exploration of project artifacts, controlled spatial transitions, compelling samples with differentiated sample branding, high visual surprise | Navigation/SEO/motion performance and mobile cost; often tempts mandatory WebGL | **Borrow selectively for sample transitions/gallery** |
| **C. Service-window / Creative Workspace Metaphor** | User's conceptual "windows" can provide expressive service grouping, interactive inspect/expand/compare pattern | OS/desktop imitation, complex state, poor touch/keyboard, repetitive modal dialogs | **Use only as useful interaction metaphor, not a forced whole-site OS** |

**Working hypothesis (DESIGN PROPOSAL):** blend **A + restrained B** with **C only where it helps service windows**, retaining one strong global DJMRN identity and allowing independently branded demos. The decision belongs to **P3 owner visual approval**, after inspecting deliberately different original prototypes. No external award entry, screenshot, visual asset or template may be replicated, traced or misrepresented as DJMRN's authored invention. Inspiration is a research input, not a design authority.

### D. Bespoke professional visual & motion rules

1. **Creative thesis before tokens:** define audience impression, unique conceptual metaphor, 3–5 recognizable design signatures, service-page information priority, originality justification and what to deliberately NOT do; only then choose fonts/colors/shapes.
2. **One custom visual signature:** a coherent high-impact feature (e.g. typographic/graphic service-to-demo handoff); not several competing heavy WebGL pieces. Prototype as static/CSS first and escalate to Motion/WebGL only after measuring value.
3. **Different but connected worlds:** DJMRN global site retains primary navigation/branding; each sample demo may create its own fictional brand, photography/3D style, cart/workflow interaction and layout. The return control survives every sample and breakpoints. Share only stable access/a11y mechanisms, not a global sample-only design system.
4. **Motion has semantics:** entrance reveals hierarchy, feedback communicates state, transition preserves context, interactive affordance supports discovery. Avoid lengthy blocking loaders, scroll-jacking, looping motion without purpose and effects that conceal text. Honor reduced motion; keyboard/touch and no-JS core content always work.
5. **Visual originality review:** explicitly compare proposed screens with several distinct public precedents and common AI-generated template tropes; name what is borrowed at *principle* level and what is newly authored. No unlicensed reuse/copy. Treat any external gallery badges/awards as **curated examples**, not user-tested proof or license grants.
6. **Portfolio should be credible before sprawling:** sample breadth demonstrates categories, but one **deep, real end-to-end demo**, preferably with graceful failure paths and public process evidence, makes stronger proof than ten attractive nonworking cards.
7. **Mobile/RTL are first-class art direction:** editorial typography, motion timing, navigation/overscroll and any sample-specific controls must work on lower-power devices and actual supported scripts, not be an English desktop-only mock.

### E. Early design methodology — do NOT mass-build from the first mockup

- **P2 / B01–B03:** Create concise audience + service-proof + unique experience promise; invent 2–3 original narrative directions, map fast and discovery journeys, define sample statuses and which first demo gives maximum proof.
- **P3 / B05–B06 (ART-DIRECTION BAKEOFF):** produce **2–3 genuinely distinct** concept studies, not three recolors of one template. Each should contain coordinated mini-scenes: **a first-screen homepage / one service explanation / one sample preview + its entry transition**. Compare static/desktop/mobile and initial RTL/LTR, respecting production licenses and Free-first. Candidate A/B/C above are seed hypotheses; owner may combine or reject all.
- **Evaluate before expanding:** critique layout/typography/composition/brand recognizability, 5-second comprehensibility, demo discoverability, contrast/focus, mobile, RTL, reduced motion and engineering feasibility. Use a small internal heuristic matrix, including **novelty/consistency, clarity/usability, credible proof, implementability/performance, asset/license risk and maintainability**; weights owner-approved at P3. Do **not** claim scored prototype tests are a representative population survey.
- **Proof-of-experience slice (P3 prototype → P5 real implementation):** one beautiful but real interaction covering **home → selected service → sample/case preview → distinct sample entry (or honestly marked not-yet-built) → safe return**; preserve direct links and semantic headings. **No mass production of 20+ pages until this slice demonstrates both originality and functioning navigation.**
- **P5/P6:** reuse audited design grammar to scale service windows; then implement one real sample's unique brand, functional scenario and optional Behind the Build case, with tests rather than mock-only claims. Expand only after meaningful evidence.
- **P7 critique pass:** an **independent design/art-direction reviewer perspective** and end-user usability critique complement automated type/lint/a11y/perf; compare across international/mobile/RTL, no artificial "perfect Lighthouse" claim.

### F. Stage-specific creative research references — observed 2026-11-14, refresh during each actual stage

**Actual research must be conducted in the stage where the design/implementation decision is needed** (§5A protocol); following are **starting reference roles, NOT permanent rankings or approved copyable designs**:

- **Awards and proven published examples (INSPIRATION, NOT UX proof):** Awwwards curated site/case portfolios (https://www.awwwards.com/), FWA (https://thefwa.com/), CSS Design Awards (https://www.cssdesignawards.com/). Relevant published 2026 examples: **Webdrift** (3D hero + alternative 1-bit mode; CSSDA 2026-10-27, https://www.cssdesignawards.com/sites/webdrift/50418/); **Maxim Kich** (CLI-like playful experimental personal site; 2026-01-07, https://www.cssdesignawards.com/sites/maxim-kich/48682/); **Hello, Designers** (scroll narrative + playable journey; 2026-10-21, https://www.cssdesignawards.com/sites/hello-designers/50398/). Analyze *interaction purpose and tradeoffs*; never reproduce assets/composition/code or assume winners perform well on slow phones.
- **Evidence-based UX (GUIDANCE):** NN/g aesthetic-usability effect, reviewed 2026-09-01 https://www.nngroup.com/articles/aesthetic-usability-effect/ — attractive design can mask poor usability; NN/g pattern guidance https://www.nngroup.com/articles/design-pattern-guidelines/.
- **Standards and browser behavior (NORMATIVE/ENGINEERING):** W3C WCAG 2.2 https://www.w3.org/TR/wcag/ and reduced-motion technique https://www.w3.org/WAI/WCAG22/Techniques/css/C39 ; Google crawlable links https://developers.google.com/search/docs/crawling-indexing/links-crawlable ; official Core Web Vitals https://web.dev/articles/vitals ; MDN view transitions and fallback https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using .
- **Trend overviews (TIME-SENSITIVE OPINION, not evidence of performance):** IONOS 2026 web design trends (https://www.ionos.co.uk/digitalguide/websites/web-design/webdesign-trends/) mention expressive typography, immersive interactivity, accessibility and performance. Verify actual date and relevance, treat as candidates to accept or reject, not automatic style mandates.

**No screenshots, score, brand logos or third-party creative assets are copied into the repo by this research; page URL and summarized evaluation are the proper evidence artifacts.**

### G. OWNER REAFFIRMATION — primary DJMRN site itself is the graphical/interactive proof (2026-11-14)

**STATUS:** Owner-confirmed product/design REQUIREMENTS, not a final art direction, technology selection, approval to code or claim of design/test success. This clarifies §0/§1A/§1B/§1C and strengthens existing B01/B03/B05/B06/B09–B15/B19/P2–P7 without creating B24 or a separate website.

- **The main DJMRN website MUST itself be a bespoke, highly crafted, visually strong and interactive experience BEFORE entering any sample app.** It cannot devolve into a conventional card-based service-directory shell whose only creativity lives in child demos. The homepage, service-category organization, visual previews, service explanation, navigation, meaningful motion and transition into independently branded work must themselves demonstrate DJMRN creative/engineering quality.
- **First-contact clarity for nontechnical visitors:** each major service needs understandable labels, graphical context, meaningful previews or truthful illustrations of what could be delivered, and immediate native access to its description. Technical visitors can optionally inspect design decisions and real evidence. Never require jargon knowledge, scrolling through a game, hovering, sound, WebGL, or a compulsory immersive tour to understand services. Empty/no-sample services remain honest; imaginary unbuilt demos must not be presented as live.
- **Hybrid creative composition is explicitly permitted and ENCOURAGED as a comparative design strategy, never preselected final style:** combine selected visual principles (A editorial identity / B curated interaction / C accessible category windows) with other researched approaches such as kinetic typography, graphic objects, interactive posters, restrained spatial depth, a useful before→after, meaningful transitions, or two reading lenses ONLY when each supports the same coherent original brand thesis and the relevant service/user journey. Compare combinations against a simpler single-direction baseline. Different parts/services may have differentiated art direction within a consistent DJMRN grammar. "Hybrid" does NOT mean simultaneous heavy libraries, forced multi-model AI, multiple agent runtimes, duplicate state or incoherent template collage.
- **Premium differentiation is DEMONSTRATED, not a boast:** illustrate why an intentionally researched, custom-built solution can address varied briefs better than a one-size-fits-all template through real controlled interactions, visual craftsmanship, documented decisions, explicit limitations, responsive/localized behavior, test evidence and honest sample provenance. Do not state universal superiority, fabricated customer savings, paid references or impossibility of recreating a design with AI prompts.
- **Latest first-example priority:** initial flagship CHILD example is an independently branded **visual/interactive website** within a real relevant service. The advanced B23 synthetic ecommerce/finance showcase remains a REQUIRED PLANNED LATER CAPABILITY under the ecommerce service but is NOT the first sample, and its illustrative perfume niche is unselected. Importantly, P5's first *main-site* home→service→sample-preview/entry/back slice must prove the MAIN-SITE graphical/interactive promise; its quality is not delegated solely to the child demo.
- **P2→P3 preparation:** collect real service descriptions and owner-verified sample/asset rights (B02), research 2026 primary studio precedents + credible UX + relevant standards (per §5A), develop three genuinely different original mini-scene systems (first fold + multi-service discovery + one service + demo entry), and compare optional hybrids by nontechnical clarity, visual novelty/cohesion, actual usability, CSS/SVG/native baseline vs richer motion/3D, performance on modest hardware, RTL/LTR, rights/$0 eligibility and testability. P3 chooses; no framework/provider/visual thesis is locked now. T34–T40 remain NOT RUN until actual prototypes and reviewers exist.

**Time-of-need research seed (2026-11-14; facts vs inspiration):** Figma 2026 https://www.figma.com/resource-library/web-design-trends/ and Webflow 2026 https://webflow.com/blog/web-design-trends-2026 describe expressive typography / experimental navigation / motion / 3D as TRENDS, not proven UX outcomes. Real published examples for PRINCIPLE-level critique: Studio K95 https://k95.it/en (Rings/Spiral alternative work layouts), Studio Feixen https://www.studiofeixen.ch/ (interactive type/poster tools), Lusion https://lusion.co/ (art-directed motion/3D and project taxonomy), Obys https://obys.agency/ (editorial project categorization), darkroom.engineering https://darkroom.engineering/ (services plus independent OSS proof), Locomotive https://locomotive.ca/en (clear service/work structure). Research baselines: Nielsen Norman Group https://www.nngroup.com/articles/information-scent/ and https://www.nngroup.com/articles/aesthetic-usability-effect/ ; W3C https://www.w3.org/TR/WCAG22/ and https://www.w3.org/WAI/WCAG22/Techniques/css/C39 ; MDN https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using and https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations ; Google crawlable links https://developers.google.com/search/docs/crawling-indexing/links-crawlable . Examples/awards are inspiration, NOT evidence that DJMRN passed device/UX tests or license to reuse third-party assets. Exact P2 research findings/approvals/checkpoints live only in PROJECT-LOG.md.

---

## 2. Workstreams: 23 branches, each independently researchable and testable

**Each branch carries ID, subwork, dependencies, proof of value, research questions and exit test.** Dates/completion are tracked ONLY in PROJECT-LOG.md.

### B01 — Market, positioning, audience & measurable goals
- **Subtasks (showcase-first):** prioritize portfolio viewers and potential employers/clients (international SME/startup/agency/individual); define which technical skills are demonstrated, the visitor's path to inspect/try working samples, design uniqueness, truthful scope and real evidence; optional human contact is secondary. No checkout funnels, paid conversion campaign, actual transactions or client portal in V1.
- **Dependencies:** none. **Output:** approved showcase brief with **distinctiveness promise / creative thesis**, actual service taxonomy plus service→sample map, viewer personas, sample evidence/status, and proposed **Explore→Experience→Inspect** journey. **Research RQ01:** apply mandatory §5A live search across several real strong service-first portfolios, evidence-based UX and competing creative approaches; compare what looks template-generated and what demonstrates uniquely authored craft. No default sales-funnel priority.
- **Gate:** owner confirms truthful capability positioning AND a proposed **creative differentiator with one original signature idea**; professional visual promises cannot outrun actual sample evidence. Test planned T34/T35, do not assert originality purely because AI proposed it.

### B02 — Content inventory, evidence, rights & truthful copy
- **Subtasks:** list actual software demos, screenshots, source links, video examples, drafts and legal ownership; label sample vs paid work; verify brand/name/contact details; create service detail/case-study content templates; create controlled copy approval and change workflow.
- **Dependencies:** B01. **Output:** evidence-backed content catalog (IDs, provenance, rights, approval, URL/hash, allowed depiction). **Research RQ02:** example case-study storytelling, content UX, asset licenses and portfolio rights.
- **Gate:** no claimed paid job, result statistic, testimonial, company identity or credential lacking direct evidence. No private client files in public repo.

### B03 — Information architecture, navigation & discovery
- **Subtasks (owner-confirmed):** main DJMRN home/service windows → specific service explanation → **matching sample gallery** → independent nested sample-demo page → accessible return link to originating service; ALSO **dual pathways**: quick visitor route for immediate comprehension and deeper discovery/expert proof route for willing evaluators. Define first-view service promise, sample-first CTA, optional Inspect/Behind the Build link, return/history/breadcrumbs, content hierarchy, semantic direct URL, keyboard/mobile/RTL, empty/404 states. One service may reference many samples; no entire-site desktop/OS imitation.
- **Dependencies:** B01–B02. **Output:** route matrix, journey maps, wireframes, navigation contracts. **Research RQ03:** compare tabs/mega menus/dialogs with native HTML disclosure/links and actual UX; use MDN dialog guidance, WAI-ARIA APG.
- **Gate:** J1–J6 and the owner-confirmed **service→sample gallery→demo→back** journey sketched/reviewed for P2/P3 (T32); all eventual published pages shareable without JS-only route navigation, with no dead links or active cards for unbuilt samples.

### B04 — Internationalization architecture (plan for 8–10, translate progressively)
- **Proposed core locales:** `en` English, `fa` Persian, `de` German, `fr` French, `es` Spanish, `pt-BR` Brazilian Portuguese (regional target to validate), `ja` Japanese, `ar` Arabic. **Candidates only:** `tr`, `it`, `zh-Hans`, `ko` after actual demand and translation quality review. Owner must confirm shortlist/priority; no public "supports 8 languages" until translations exist.
- **Subtasks:** locale registry and naming conventions, default/fallback URL, stable content ID→per-locale slug map, route generation, per-locale page availability, translation coverage status `draft|reviewed|published`, glossary/style guides, approved human-reviewed machine assistance, formatting (dates/numbers/quotes/currency), 404/fallback strategy, language switcher with self-language names, keyboard and screen-reader labels, full-page `lang/dir` and localized metadata.
- **RTL:** `fa/ar` `dir=rtl`; other proposed locales LTR; use logical CSS properties `margin-inline/padding-inline/inset-inline`, `bdi` and `dir=auto` for mixed-script inline values. Don't blindly flip logos, icons with meaningful direction, video controls or diagrams. Test German long words, Arabic shaping, Persian digits, Japanese line breaks and fallback fonts.
- **SEO:** per-published-equivalent explicit URLs (prefer consistent `/[locale]/` including English, pending decision); per-page reciprocal `hreflang`, self-referential canonical, optional `x-default`, localized sitemap and social descriptions. Never show English copy under a /de URL as if translated; redirect or plainly declare fallback. No invisible language auto-redirect that traps crawlers or strips a manual visitor choice.
- **Dependencies:** B03, B05 for copy length/fonts, B07 for build architecture. **Research RQ04:** W3C bidi/locale typography, Google international SEO, Astro i18n routing/translation fallbacks, no-cost translation tools and post-edit workflow. LibreTranslate/Argos Translate is open source but local model downloads/quality/RAM need a *small measured trial*, not an always-on service.
- **Gate:** at least one fully reviewed RTL and one LTR route in pilot, then smoke a full route×locale matrix before publishing each additional locale; no orphan locale selectors or phantom `hreflang`.

### B05 — Brand identity, art direction & design tokens
- **Subtasks:** creative thesis, **custom authored typographic/graphic signatures** and coherence before ordinary palette/token selection; owner brand voice, original logo/motif/visual system, compare **2–3 genuinely different A/B/C art directions** (premium atelier, curated interactive gallery, restrained workspace metaphor), original rather than stock/SaaS-looking hero, precise composition/responsive rhythm; **mini-scenes must cover first-fold home + service detail + sample entry**, mobile and RTL/LTR. Sample-specific unique fictional brands may deliberately differ while DJMRN primary identity stays consistent. Fonts/licenses, dark/light, CJK/Arabic, spacing/color/type/motion tokens only after concept selected.
- **Dependencies:** B01–B04 language/font/space needs. **Research RQ05:** moodboards and high-quality *real* portfolios; Figma Starter limits, typography families/license/performance (Fontsource/self hosting); verify visual originality and international readability.
- **Gate:** owner sees and critiques **2–3 original concepts, not recolors**, and chooses/combines/rejects directions. Require source-based inspiration-vs-copy check, custom-asset rights, two-device + RTL/LTR accessibility/performance feasibility, and the T34/T37 design decision record **BEFORE mass coding**. A cohesive approved Figma/token system is the output, not the starting assumption.

### B06 — Interaction design & reusable component contracts
- **Subtasks:** create a **purposeful interaction grammar**: first-view clarity, service-window discovery, explain-before-click, compelling preview→demo entry handoff, optional **Explore / Experience / Inspect** patterns, return-to-service and Behind the Build proof; compare simple native tabs/links with an intentional hybrid rather than a fake OS. Define service cards/pages, real sample previews, keyboard/touch/focus, reversible motion, accessible dialogs, loading/empty/error, screen-reader labels, reduced-motion and no-JS fallback.
- **Dependencies:** B03, B05, B12, B13. **Research RQ06:** MDN native dialog/popover, WAI keyboard patterns, alternatives to heavy UI kits. MagicPath may generate quick prototypes; only approved Figma components become design authority.
- **Gate:** interaction matrix describes keyboard/mouse/touch, no trapped focus, Escape closes modals, deep links are real links, no loss when JS unavailable for primary content.

### B07 — Framework/architecture decision and component/content boundaries
- **Alternatives:** (a) semantic HTML/CSS/light JS for very few static pages; (b) **Astro static pages + content collections + selectively hydrated islands** as a strong candidate for ~8 locales, many service/case pages and isolated interactive demos; (c) Next.js/server architecture only if authenticated portal/real dynamic apps justify it. Do not pick "latest" for prestige.
- **Subtasks:** score stack vs content volume, locale route generation, build/static hosting, SEO HTML availability, interactive island complexity, skill maintenance, dependency/version risks, 8GB dev RAM, rollback; **prove a real service→sample→demo deep link and per-demo lazy code/style loading** without adopting a site-wide SPA or requiring server/database; choose package manager/lockfile, TS config, format/lint, explicit import/state boundaries, one repository, no microservices.
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
- **Subtasks:** **motion must explain hierarchy, state or sample-entry context**, not be decorative by default; test a single signature handoff/preview before multiplication. Research native CSS and MDN View Transitions compatibility/fallback → Web Animations API → Motion library → custom effects ONLY if actual benefit. Avoid scroll hijack, looping high-motion backgrounds, opaque preloaders and unnecessary cursor effects. Define timing, focus-safe navigation, touch/scroll/hover feedback, reduced motion and static equivalent before production.
- **Dependencies:** B05, B06, B12/13, performance budget B18. **Research RQ10:** Motion docs & free MIT license; GSAP license current only if needed; native CSS vs JS; dotLottie web player and *per-asset* export/license; Rive production export pricing.
- **Gate:** animations do not hide required content, hijack scrolling, cause vestibular risk, delay LCP or block inputs; motion disabled/reduced mode shows static equivalent; screen-reader/keyboard pass.

### B11 — 3D/WebGL/interactive hero and showcase lab (OPTIONAL, independently discardable)
- **Subtasks:** decide **at most one meaningful first-stage signature** only after compare against simpler typography, CSS/SVG and 2D storytelling; optional original 3D object/scene may distinguish a particular service/sample but not become mandatory for discovering services. Storyboard, low-end device proof, lazy on-demand renderer, LOD/memory limits, pauses offscreen, fallback poster/no-WebGL/reduced-motion, own artwork/license/alt description. If visual novelty is achievable without WebGL, omit WebGL.
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
- **Subtasks:** category IDs and filters; hierarchy of services and subservices; evidence-backed descriptions of what DJMRN can build; **gallery of real related demos/case studies** on each service page; one-to-many service→sample links derived from one canonical SampleRecord mapping, 'view live sample' and 'read case study' actions, return paths; contextual contact CTA as optional. Pricing only when owner authorizes real pricing. Search by tags if content volume warrants; responsive cards/filters and view modes.
- **Dependencies:** B02–B04, B07, B12/13. **Research RQ14:** best service-page UX and B2B inquiry conversion; real portfolio patterns.
- **Gate:** update one service record once → all appropriate locale/index links update; no phantom service, blank filter result without an empty state, SEO duplicate content or broken CTA.

### B15 — Portfolio, case studies, demonstrations and media gallery
- **Subtasks:** a **single discoverable sample registry** maps approved service categories to zero/many examples; preview cards/gallery within service pages, independent sample case-study pages with provenance, and dedicated **open working demo** routes with sample-specific UI while remaining part of the DJMRN site; image/video previews, code/demo links if allowed, test evidence, optional safe sandboxes; captions/transcripts and privacy/consent for third-party media. Samples can have their own fictional brand, but keep a clear 'Back to DJMRN / Service' path and avoid duplicating the global site.
- **Dependencies:** B02, B07, B09–B13. **Research RQ15:** OSS CodeMirror/Monaco licensing *only if real editable showcase requires it*; iframe sandbox/CSP; safe live demo vs recorded video; video hosting free limits.
- **Gate:** 1 honest case explanation and **at least one genuinely functional, deep proof-of-work example** with actual owned contribution/tests and an optional small **Result→Try It→Behind the Build** explanation: problem, design rationale, architecture sketch or meaningful state transition, real PASS/FAIL evidence, known limitations, source licensing. Visitor can ignore expert detail and still navigate; sample errors fail gracefully and no sensitive data/code leaks (T38/T39).

### B16 — Optional real creator contact and promotional UX (distinct from B23 simulated shop checkout)
- **Subtasks:** optional verified public email/social/contact links, explanatory service CTAs and a clear visitor **inquiry/feedback** route. If the owner later wants public comments on demos or a response widget, distinguish **nonfunctional visual prototype** from a genuine submitted/received message; require consent, moderation/spam/privacy/retention and destination tests for any actual posting. A safe `mailto:` link is enough for V1 if owner approves address. No **real** customer checkout/order queue, financial obligations or real account creation from creator-contact pages; **B23 separately owns genuine interactive synthetic checkout/order demo**. Optional contact form comes only after delivery/retention/abuse/storage/privacy and test are approved; show any nonfunctional sample form as **DEMO / NO SUBMISSION**. Never promise a form works when it is frontend-only.
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
- **Gate:** reproducible build and real functional journeys; **independent critic pass** for distinctive art direction, generic-template indicators, 5-second clarity, discovery vs fast paths, sample Inspect proof, mobile/RTL and no-effects experience (T34–T40). No unhandled exceptions, critical a11y/security faults or unreviewed regressions. Record failures and remedies before next milestone; pretty screenshots alone never PASS.

### B20 — Hosting, DNS, deployment, rollback and observability
- **Subtasks:** compare verified legal/commercial/region eligibility and hard $0 limits for Cloudflare Pages/other candidates, card requirement/no overage, custom domain costs, CDN/TLS/CSP/headers, environment and preview deploy isolation, GitHub integration, redirects/404, sitemap, rollback tested, uptime/alerting. Domain purchase and public release **separately approved**.
- **Dependencies:** B07, B17–B19. **Research RQ20:** Cloudflare Pages Free 500 builds/month, static file caps and Functions quota; Netlify current pricing; commercial restrictions on Vercel Hobby and GitHub Pages; deployment from owner's actual residency/legal access is **UNVERIFIED**.
- **Gate:** documented release proposal including cost/rights/security/privacy/rollback + explicit user approval; real post-deploy smoke, TLS, crawlability and locale checks. No silent production deploy or permission change.

### B21 — Showcase quality, search visibility and optional interest measurement
- **Subtasks:** privacy-preserving measured technical quality plus **ability to recognize DJMRN services quickly, discover/use at least one genuine demo and understand craft/limitations**, mobile/RTL clarity, original brand recognition and voluntary deeper exploration. Optional Search Console after release and approved inquiry/referral signals where privacy/consent appropriate; avoid paid-traffic/revenue KPI as the core site score.
- **Dependencies:** B16–B20; real public launch. **Research RQ21:** free privacy-aware analytics, official search console features, third-party script performance and consent.
- **Gate:** useful measurements without unnecessary surveillance, reversible tracking, real iteration linked to user value.

### B22 — Expansion: future services, languages, social channels, articles, portal
- **Subtasks:** add languages through locale manifest and reviewed translations; add services/cases through content schema; add verified social link through icon manifest; blog/articles only when maintainable; CMS only if owner cannot edit Git content; secure private client portal only after real need, auth model, roles, costs and full security approval; PWA/offline/search only after evidenced demand.
- **Dependencies:** stable B04/B07/B14–B20; baseline conversion measured. **Research RQ22:** each new feature's direct ROI, simpler alternatives, authorization, migration and rollback.
- **Gate:** new feature passes isolated approval, no authority duplication, performance and localization parity preserved.

---


### B23 — DEMO Commerce, checkout, financial/accounting application showcase (REQUIRED CAPABILITY DEMO, SAMPLE THEME OPEN; staged, no real money)

**Classification / owner scope:** a visible, substantial **interactive EXAMPLE APPLICATION ACCESSED THROUGH THE 'E-COMMERCE WEBSITE CREATION' SERVICE PAGE AND ITS SAMPLE GALLERY**, owned by the same DJMRN website/portfolio project. B23 is a **specialized sample implementation subordinate to B14 service descriptions and B15 sample gallery**, **NOT** the DJMRN homepage, global service brand or a general sales checkout for DJMRN. Not a live merchant, payment operator, invoice issuer or customer finance system. The owner's latest explicit instruction **supersedes earlier exclusions that had removed checkout/payment/finance entirely**. This module is a project target, not a claim it has already been implemented. Build only in phase-appropriate, tested increments, with its actual code within the existing repo. A separate project/repository may be considered only after a demonstrated independent operational need and owner approval.

**Illustrative public experience (sample theme NOT APPROVED YET):** DJMRN Home → Services → Website Building → E-commerce Websites → **Sample gallery** → click **Perfume Shop example** (one of potentially several independent e-commerce samples) → enter its contained branded demo route and optional financial/back-office views. The case study explains the work, and the demo is where the visitor interacts. Route spelling (e.g. `/[locale]/demos/perfume-store/` vs `/[locale]/lab/perfume-store/`) is a B03/B04/B07 decision; choose one canonical route, keep it inside the site, and provide a 'Return to e-commerce service' control. A visitor can follow a **real working demo** flow in a contained fictional shop, choose examples of **simulated gateway results**, inspect a **sample invoice/order**, and switch to a **sample financial dashboard** showing the results. Cross-links explain architecture, edge cases, QA and implemented code. Put persistent **"DEMO / TEST DATA / NO REAL PAYMENT OR ORDER"** wording in the shopping, fake gateway, receipt and accounting interfaces. A visitor must not mistake demo products or financial statements for real items, charges, balance or legal receipts.

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
S5 B15 Service-linked Case/Example Galleries + B16 Contact + B18 SEO
                   |
                   +------> S6 B23 SELECTED E-commerce/Finance SAMPLE application (B14/B15 child)
                   |            fake checkout / sample invoice + ledger, T27–T33
                   |
                   +------> S6 B10 Motion / B11 optional 3D / B04 locale expansion
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
| P0 RESEARCH | B01–B23 initial planning inventory and baseline documentation | Scope mapped; detailed implementation research / final owner decisions not yet completed |
| P1 TOOL READINESS | B08 preliminary | Already verified Codex/Git; per-task service checks still needed |
| P2 BRIEF APPROVAL | S1; B01/B02/B03 + locale priorities + §1C/§5A | Confirm **unique creative thesis, fast vs discovery flows, service→sample map/evidence, original experience promise**, relevant example competitor/UX research and first small slice (no locked sample brand) |
| P3 DESIGN | S2; B04/B05/B06/B09/B10 concept | **2–3 original art-direction bakeoff** on home-first-fold/service/sample-entry mini-scenes, then owner selection/hybrid + approved desktop/mobile/RTL tokens, interactions, reduced-motion and rights (T34–T37) |
| P4 ARCH + WORKSPACE | S3; B07/B08; §5A technical research | ADR, direct service/demo route plus lazy sample feasibility spike, build/locale/content scripts and clean branch; technology comparison not chosen for prestige |
| P5 FIRST VERTICAL | S4 **proof-of-experience** before mass pages | **Distinct, truthful home first fold → real service → approved preview/case (or explicitly not-live) → contextual return**, real links, original composition and focused transition; T35–T39 + keyboard/mobile/locale fallback before multiplication |
| P6 EXPAND | S4–S6; B10–B16/B18 + selected e-commerce example B23 | Publish tested service galleries and **one deep functional sample** with unique sample brand and optional behind-build explanation; B23 synthetic checkout/invoice/finance, T27–T40, actual chosen locale + optional motion; more shallow demos do not substitute for working proof |
| P7 QA | S7; B12/B13/B17/B18/B19 + independent creative review | T01–T40 appropriate gates, critic/design originality, fast/deep UX, real demo proof + mobile/RTL/reduced motion, performance/security/SEO; measured remediation not visual-only approval |
| P8 HOST REVIEW | S8; B20 | Verified account/region/free costs/rollback proposal |
| P9 RELEASE | S9, explicitly approved B20 deployment | Public TLS/links/locale/SEO and recovery smoke |
| P10 ITERATE | B21/B22 | Evidence-based value improvements, optional features only as needed |

**Do not mark an entire branch complete when one subtask or prototype passes.** Codex must not implement all B01–B23 in one unsupervised mega-prompt. Every S stage has at least one independent result and sign-off.

---

## 4. Architecture contracts and change-safe data model (PROPOSAL)

**Single modular content-first codebase**: static site is default runtime; an optional interactive island may use JS, Motion/Three or React only in that module, with lazy import and fallback. No sitewide SPA/SSR/database/agent swarm without measurable requirement.

**Responsibility and interfaces**:
| Ownership / module | Input → output contract | Dependency and security boundary |
|---|---|---|
| `site-config` | approved brand, locale, navigation, links → validated immutable config | No API keys; single source for public metadata |
| `content` | canonical service/sample/case evidence + translations → typed records | No scripts in public Markdown; **SampleRecord** owns relationships; versioned source |
| `i18n` | `canonicalContentId + locale` → translated slug/title/text/status | No unreviewed locale published; SEO route parity |
| `design-system` | approved Figma tokens → CSS variables + reusable accessible components | RTL via logical properties; no duplicated styles per locale |
| `routing` | route type + content ID + locale → URL/HTML/sitemap/canonical | Prerender main pages; deep links work sans JS |
| `media` | approved asset ID → srcset/alt/captions/license record | Optimization + fallback; no private files |
| `motion` | approved motion tokens + reduced-motion preference → safe state | Does not own content/navigation |
| `3d-lab` | optional scene input + capability flags → enhancement or static poster | Own rendering context; never block initial content/contact |
| `demo-routes` | published sample ID + locale → one canonical demo/case link, preview and return-to-parent-service path | Lazy demo asset loading; do not mount app logic on DJMRN global pages |
| `demo-app` | test/synthetic scenario → isolated interactive state, fake payment/finance or other demo response | Each sample owns its state/styles, never owner secrets or real customer data; reusable mechanisms only when proven |
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
SampleRecord {
  id: stable string; relatedServiceIds: string[]; caseStudyId?: string;
  type: interactive|video|gallery|code;
  stage: planned|prototype|tested|published;
  execution: working-demo|clearly-simulated;
  publishedDemoRoute?: string; previewAssetId?; rightsEvidenceIds: string[];
  locales: {...}; // only reviewed and actually published pages get routes
}
CaseRecord {
  id: stable string; sampleId?: stable string;
  provenance: paid-client|self-initiated|internal-demo;
  evidenceIds: string[]; rightsApproved: boolean; sourceUrl?: string;
  demoUrl?: string; mediaIds: string[]; locales: {...};
}
SocialLink { platformId, verifiedProfileUrl, iconAssetId, accessibleLabel, enabled }
AssetRecord { id, source, license, allowedUse, credits, altByLocale, sizeVariants }
LocaleRecord { tag, nativeName, dir, fontFamily, enabled, defaultRoutePolicy }
```

**Why these fields matter:** **SampleRecord.relatedServiceIds** is the **only authority** for service→sample membership. A service's gallery is derived from approved/published sample records, not duplicate arrays; an unbuilt demo cannot acquire a 'live' URL or CTA. Stable sample IDs link case-study explanation and actual interactive route. One update flows to the cards, details, locale routes, SEO and social previews. Stable IDs prevent breaking links when translated slugs change; require redirect mapping in later migrations. This is a proposed *logical* contract, not approval to create database tables, registries everywhere or new abstraction layers. Begin with simple local files and one schema where volume justifies; review existing before inventing types.

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


## 5A. MANDATORY research-before-design/build protocol for EVERY substantive B##/RQ## stage (OWNER RULE, 2026-11-14)

**Binding sequence for all modules (including site copy/positioning, visual design, typography, layout, navigation, sample apps, animation, 3D, backend, AI, SEO, hosting, tests and future features):**
**Define the real problem → Search the web for current credible evidence and strong comparable real websites/products → inspect successful and failed patterns → distinguish trends vs standards → compare practical alternatives → define an original fit-for-DJMRN hybrid → check constraints/rights/cost/security → prototype the smallest candidate → independently test with actual I/O → owner gate → build/reuse → measure and document.**

**Mandatory research at time of implementation**, not a single up-front discovery backlog or automatic recurring crawl. Each *substantive* branch task must check live sources and save concise findings in the one PROJECT-LOG checkpoint. For minor within-stage fixes, reuse a **recent, task-relevant** research packet when it remains applicable and note reuse; do not run pointless redundant searches for every CSS character change. No blind tool/provider/model choice; no implementation claim based only on generated AI output. If required authoritative source/eligibility cannot be verified, mark **UNVERIFIED**, do not invent a result, and block that dependent consequential decision (pursue a simpler safe local alternative instead).

### Required evidence lenses, proportional to each task

1. **Official/canonical guidance (mandatory for applicable technology/security/cost):** W3C/WHATWG, MDN, Google/web.dev, framework package/vendor official docs, license + terms + pricing/quota, browser support and regional permissions. Record version/date/URL and whether information governs actual functionality.
2. **Best-in-class functioning real examples (mandatory for product/UX/art decisions):** browse several credible live public portfolios, award showcases, established studios and service/product sites; inspect mobile & desktop layouts, interaction details, speed, keyboard/navigation, language use, source claims and provenance where inspectable. **Award status is discovery evidence, NOT proof of UX, conversion, license, speed or relevance**.
3. **Design/UX research (mandatory for meaningful user-flow choice):** use credible usability literature and tested interaction patterns e.g. NN/g, W3C/WAI, Baymard for relevant ecommerce patterns and peer-reviewed work if materially relevant. Note study scope, date and limits; no universal claims without evidence.
4. **Contemporary trends (review, not mandate):** search current editorial reports, curated sites, communities and released implementations for possible typography, editorial composition, spatial/3D, motion, microinteraction or content presentation. Identify both novelty and saturation/fatigue. Reject trends that make DJMRN generic, inaccessible, slow, expensive or irrelevant.
5. **Implementation and failure evidence:** official API/docs + real source/case writeups, maintained OSS repo/release/issue/CI evidence, security advisories and failure modes; community/Reddit may surface pain points but is not authoritative for price, legality or safety.
6. **Owner-specific facts and actual tests:** real screenshots/assets/rights and on-device behavior, observed Codex/Git, user tasks, mobile/RTL constraints and tracked QA. A simulated or award-winning screenshot is not a usable production implementation test.

### Minimal per-stage research packet (in existing PROJECT-LOG, not new database)

For each assigned **P#/S#/B##/RQ##**, record:
- **User problem + constraints:** deliverable, related service/sample, owner/audience intent, genuine input/data, required language/device, rights/privacy, hard $0 boundary.
- **Source review:** typically **≥3 independently selected concrete relevant public examples or design precedents** for creative/UX work **when available**, plus **≥1 applicable primary official reference** for standards/technology; research/professional guidance where applicable. These are **planning heuristics**, not a requirement to fabricate a list or browse unrelated sources. Record title/URL/date/what works/what fails, and why applicable. An unavailable category is documented as GAP/UNVERIFIED.
- **Alternatives:** simplest native/deterministic implementation first; usually compare **2–3 materially different design approaches** or a small technical shortlist (including no-new-tool option). State functionality, accessibility, mobile/RTL, performance, security, maintenance, reversibility, license, $0 eligibility and risks.
- **Original synthesis / non-copy rule:** explain which *principles* are learnt, how an original DJMRN visual language or purposeful hybrid differs from precedents, and what template tropes were deliberately avoided. **No unauthorized copying of layouts, code, artwork, text, trademarks, photos, interactions or branded identity.** Inspirations may be cited by URL without reuse.
- **Decision evidence:** small real prototype/test with annotated observed output, edge cases, low-end/mobile/keyboard/RTL where applicable, failure/rollback, and budget. Identify FACT vs ASSUMPTION vs DESIGN JUDGMENT and owner sign-off required. If premium/cloud option has unknown costs or overages, **UNKNOWN/DENY**.
- **Compact artifact:** retain actual approved code/tests/frames in their designated authority (GitHub; Figma if user-approved); store only URLs/source evidence, comparison, decisions, test results and handoff in the **ONE PROJECT-LOG**. Do not create a parallel research registry, duplicate status tracker or speculative service catalog.

### Research-by-stage matrix and practical accept/reject questions

| Gate / owner | Live research focus (before that stage's implementation) | Evidence needed before approval |
|---|---|---|
| **B01/B02; P2** | Best proven freelancer/service portfolios, truthful cases, differentiated positioning, service discovery, user personas, reliable samples and attribution | Genuine services + 2–3 contrasting information/storytelling approaches; proposed uniqueness promise + rights inventory |
| **B03/B14/B15; P2/P5** | Native accessible navigation, award-winning discovery ideas, UX evidence for category/service/sample galleries, direct URL vs modal and return journeys | Working clickable home→service→gallery→demo/return prototype, route/SEO/keyboards, no phantom sample |
| **B04; P2/P3/P7** | Internationalization, linguistic typography, RTL/LTR, hreflang, locale routing/content coverage, real exemplar sites | Two approved locale prototypes first; tested navigation/overflow and reviewed translations before publishing more |
| **B05/B09; P3** | Current editorial/typography/branding trends, visual precedents including awards/studios, fonts/assets licenses, originality risks | A/B/C original art-direction concepts with thesis/moodboard provenance, first fold/service/demo mini-scenes, feasible fonts/assets |
| **B06/B10; P3/P5** | Research-backed interaction patterns, hover/touch/keyboard, purposeful motion, native View Transitions/CSS vs JS, reduced motion | Interaction/motion rationale, prototype on real devices, fallback, no scroll hijack |
| **B07/B08; P4** | Official current framework docs/release, static content + isolated demo app feasibility, maintainability, versions/licenses/CI/free resources | Small stack ADR with measured build/deep links and no speculative full SPA/microservices |
| **B11/B12/B13/B18; P3–P7** | Three/WebGL and motion alternatives, image compression, responsible immersive patterns, WCAG, SEO, CWV | Before/after measurable fallback/keyboard/mobile/RTL/CWV; one high-impact effect if justified |
| **B16/B17; P5–P7** | Verified contact patterns, optional feedback input, privacy/anti-spam/moderation, security advisories, rights | Only truthful receiving path; no mock claim or exposed private messages; no unapproved secrets/provider |
| **B19; every gate/P7** | Test patterns, Playwright/axe/Lighthouse docs, testability of original design, visually differentiated QA, sample isolation | Reproducible PASS/FAIL, actual screenshots/diff and fixes, independent critic pass; real I/O |
| **B20/B21; P8–P10** | Current official $0 tiers, commercial and regional eligibility, TLS/DNS/SEO, deployment rollback, privacy analytics | Verified eligible real account/legal terms, no overage and explicit release approval |
| **B23/RQ24; assigned P6** | Proven ecommerce user journeys, cart/payment failure UX, exact currency maths, double-entry ledger examples, safe sample brands | Real **synthetic** order→invoice→ledger demo, T27–T33, no payment connection or tax-compliance claim |
| **§10B/RQ23; future** | Deterministic vs AI assistant, free inference quotas, actual service regions/training/privacy, threat models, abuse controls | Side-by-side model-free and verified eligible $0 candidate; hard quota/fallback, no sensitive owner tools |
| **§10A/B22; future** | Real client need for games/uploads/portal, browser sandbox and auth, standards, rights, simpler alternatives | Proposal and user approval at actual need; not a speculative infrastructure build |

**Stop conditions:** research shows no original/artistic point-of-view; sample cannot be honestly demonstrated; demo requires sensitive/private data or paid service not approved; design blocks core navigation/keyboard/mobile/locale; performance or source license unknown; unable to verify critical terms. Report smallest compliant fallback and re-evaluate, rather than silently selecting a fashionable tool.

---

## 6. Detailed evidence and acceptance test matrix

| Test ID | Automated/manual evidence required | Release requirement |
|---|---|---|
| T01 | Successful local `install/build/typecheck/lint` and deterministic URL output | PASS; no unexplained warnings |
| T02 | Playwright J1–J6 route navigation, home→service→gallery→published case/demo→back→optional contact, direct deep-link/browser history and 404 | PASS for implemented routes; use T32 for actual demo path |
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
| T15 | Post-release: actual index presence, optional real contact receipt where enabled, uptime/errors and minimal analytics | Monitor after owner-approved release |
| T32 | Service→relevant sample gallery→case/demo deep link→working sample interactions→return to same service; browser history/refresh, mobile and locale | PASS only when relevant sample is actually published |
| T33 | Independent per-sample style/JS/state, sample-route isolation, loading budgets, graceful failure, no effects on main shell; adding a second real sample requires no duplicate site | PASS before publishing each demo; second example test when it truly exists |
| T34 | **Originality/composition critique:** compare site screens to multiple distinct real references and common AI/template tropes; source/rights/provenance + articulate 3–5 original signatures | Owner-reviewed, reasoned original concept; no claim that originality is mathematically proven |
| T35 | **First-view clarity (internal five-second exercise):** ask a small fresh viewer cohort or independent reviewers to describe services and available next action before extensive explanation | Recorded qualitative confusion and iteration; five seconds is an internal design probe, not universal UX standard |
| T36 | **Dual-path navigation:** fast visitor finds service and valid sample/contact; deeper evaluator follows Explore→Experience→optional Inspect→return using real routes | Usable on keyboard/touch, mobile/RTL, back/forward and no mandatory tour |
| T37 | **Art-direction bakeoff:** 2–3 meaningfully distinct original home/service/demo-entry mini-scenes reviewed with owner; mobile/RTL, accessible/feasible budget, license check | No 'three recolors'; explicit owner selects/combines/rejects after documented criticism, no silent design lock |
| T38 | **Behind the Build credibility:** an actual sample/case discloses owned work, design decisions, useful state/engineering evidence, real test results, honest limitations | No fabricated badges, external sensitive code, invented clients/results or decorative only Inspect mode |
| T39 | **Purposeful motion/resilience:** signature transition/progressive demo reveals improve context; reduced-motion/no-WebGL/slow link/low-end fallback and screen-reader/focus tests | No scroll hijack/blocked content, no heavy 3D requirement; sample/site loads independently |
| T40 | **Independent creative quality gate:** senior-critic checklist assesses brand distinctiveness, typographic craft, layout coherence, usefulness, demo depth and failures beyond automated scores | Logged critique, corrections and owner review; no self-certified 'award quality' or UX score claim |

No test (including **creative criticism/5-second internal exercises T34–T40**) is claimed PASS merely because its criterion is written here. Save test scripts and reports with code under site directory; update only PROJECT-LOG.md for rolling status.

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
| Attractive site looks like a generic prompt-built template | §1C authored visual thesis, original typography/assets, 2–3 art-direction comparison, T34/T37/T40, revise before mass pages |
| Awarded immersive inspiration copied uncritically; design loses usefulness | §5A sources as inspiration not approval/copy permission; fast path T35/T36, keyboard/RTL/no-motion and actual device trials |
| A visually convincing but nonworking sample displaces proven capability | One deep working scenario, optional Behind the Build with real tests/limitations, T38 and existing T27–T33 |
| DJMRN global site accidentally styled/routed as the perfume shop | Service B14 + sample discovery B15 control entry; B23 owns demo only; T32 |
| Planned demo card misrepresented as live, or sample state leaks to another demo | Explicit sample status publishing gate, isolated demo JS/style/state, reset and T33 |
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
RESEARCH (MANDATORY §5A): FOR EVERY substantive B## stage, live-search credible official/academic
 guidance, strong real sites, current trends, real failures and source licensing. Compare native/simpler
 vs 1–2 justified alternatives; inspect multiple relevant examples. Original synthesis, no copying.
 Record source URLs/date, applicability, actual experiments; FACT vs ASSUMPTION vs JUDGMENT.
 STOP on UNKNOWN COST/rights/security/eligibility or missing mandatory evidence.
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
| RQ01 + RQ02 | Which complete service categories and service-linked samples credibly show our capabilities, and what evidence can we truthfully publish? | owner service brief, rights inventory, portfolio and UX examples, Google Search Essentials |
| RQ03 | What home/services/work/lab routing and window metaphors best preserve accessibility+SEO? | clickable Figma sitemap, WAI/MDN patterns |
| RQ04 | Which 8 locales first, true copy creation cost/quality, content schema and SEO? | Google/W3C/Astro docs, 2 locale prototype, translation review |
| RQ05 + RQ06 | Which 2–3 **original full art directions** create the most unmistakably DJMRN visual thesis while preserving fast service discovery and mobile/RTL? | §1C A/B/C visual research, award/UX/official source comparisons per §5A, T34–T37, owner critique before Figma approval |
| RQ07 | HTML vs Astro vs Next.js with approved page count, 8 locales and optional demos? | two tiny local build spikes only if required, CI feasibility |
| RQ09 | Which exact icons/fonts/images/video/3D assets are genuinely freely usable commercially? | licenses/trademark rights, asset source and screenshot tests |
| RQ10 + RQ11 | CSS/Motion vs Three.js vs Spline/Rive, where can effects ship truly $0 and pass mobile GPU fallback? | local performance proof, official provider pricing/licensing |
| RQ14 + RQ15 | How do service detail pages show multiple sample cards, with separate case-study versus working-demo deep links and safe app shells? | service→sample link tests T32–T33, rights inventory, iframe/video/demo experiments |
| RQ16 | Can a commercial contact form actually receive and retain leads at hard $0 without hidden overage? | official form provider terms and real controlled inbox test |
| RQ18 + RQ19 | Do pages score and function well for SEO, CWV, keyboard, locales, mobile, browser differences? | Playwright + axe + Lighthouse + human QA |
| RQ20 + RQ21 | Which host/analytics truly meet commercial/legal/account/free limits? | provider terms/account tests, release proposal and explicit approval |
| RQ23 — later optional visitor AI | Is a deterministic guide enough or would a limited AI model be justified? | §§10B, official provider and data handling terms researched **only when implemented**, T22–T26 |
| RQ24 — P6/B23 perfume sample | How do we build a responsive, isolated and functional sample shop → simulated checkout → sample ledger at no required financial-provider cost? | targeted provider/license/money-math/accounting research **at B23 execution**; T27–T33 |

**Other deferred research** RQ08/RQ12/RQ13/RQ17/RQ22 is performed **on demand** when its actual feature/stage needs it; it is not automatic recurring monitoring and does not approve any tool or cloud spend. Research evidence and outcomes are appended to PROJECT-LOG, but this document's plan remains a controlled reference, revised only when scope/architecture changes.

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

**Service-link placement for AI:** If the owner elects to build D0/D1/D2 later, AI/automation service pages can each show one or more separate sample cards leading to their own dedicated demo URLs, exactly as for the ecommerce sample. An optional small guidance widget on the DJMRN home page must NOT replace or require the service-linked demos; keep provider/cost/security boundaries isolated.

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
