# Orsola AD-MASTER-001 — data, brand and asset registry for six advertising goals

**Captured 2026-10-23 (Europe/Berlin)** · **Status:** FOUND_PUBLIC_ASSETS / BRAND_MASTER_APPROVAL_AND_PRIVATE_DEMO_PENDING.
**Canonical owner:** [Orsola case](README.md); [pilot creative plan](INTERNATIONAL-PILOT-CREATIVE-KIT.md).
**Purpose:** reusable factual and graphical foundation (single source of truth) for G1 brand, G2 website, G3 signup, G4 activation, G5 subscription and G6 repeat use. No real ad/video has been created.

**Provenance:** OFFICIAL_PUBLIC_SOURCE = directly observed page/asset URL; USER_REPORTED = user states direct brand affiliation and commercial sample-use permission; PROVISIONAL_EXTRACTION = Firecrawl CSS/branding result awaiting brand guideline comparison; OWNER_TO_CONFIRM = not safely settled; PRIVATE_DO_NOT_COMMIT = only user-approved secure exchange outside PUBLIC GitHub.

## A. Source-verified official identity — proposed stable end-card metadata

| Field ID | Value as of captured date | Status / creative rule |
|---|---|---|
| DATA-001 | Brand display name: **Orsola** | OFFICIAL_PUBLIC_SOURCE |
| DATA-002 | Domain: **orsola.ai**; canonical English home: https://www.orsola.ai/en | OFFICIAL_PUBLIC_SOURCE; choose exact approved landing link per campaign |
| DATA-003 | Product category: AI personal & professional assistant | OFFICIAL_PUBLIC_SOURCE wording |
| DATA-004 | Manufacturer described as **Shuark Inc.** (Canada) | OFFICIAL_PUBLIC_SOURCE; normally omit manufacturer from video end card unless requested |
| DATA-005 | Homepage baseline: “Your AI personal & professional assistant” / “From conversation to completion” | OFFICIAL_PUBLIC_SOURCE; tagline/use approval from brand if used literally |
| DATA-006 | Brand support mail: support@orsola.ai; phone: +1 (416) 832-3226 | OFFICIAL_PUBLIC_SOURCE https://www.orsola.ai/en/contact; default **NOT** to display in short ad; support contact != sales CTA |
| DATA-007 | Physical/postal office address for video | OWNER_TO_CONFIRM; **not required** for advertising and do not invent |
| DATA-008 | Primary call to action and eligible destination per G1...G6 | OWNER_TO_CONFIRM; never make up signup/checkout location |
| DATA-009 | Brand usage for samples | USER_REPORTED permission from direct brand collaborator; no independent legal document in public repo |
| DATA-010 | Market availability for paid users in all countries | UNVERIFIED; earlier Terms offered US/Canada; global *creative* allowed but promise "available globally" prohibited until owner clarifies |
| DATA-011 | Public beta Free plan advertised 1000 credits per month | OFFICIAL_PUBLIC_SOURCE https://www.orsola.ai/en/pricing; MUST refresh at publication |
| DATA-012 | Download iOS/Android/Windows | OFFICIAL_PUBLIC_SOURCE current page https://www.orsola.ai/en/download displays Coming soon; no mobile-app-ready ad CTA |
| DATA-013 | Social accounts | OFFICIAL_PUBLIC_SOURCE links below |
| DATA-014 | Official legal brand kit / fonts licenses / master colors | OWNER_TO_CONFIRM; auto-extracted CSS is **not** an official style guideline |

### Official public social/source links
- YouTube: https://www.youtube.com/@orsolaai
- TikTok: https://www.tiktok.com/@orsolasocial
- Instagram: https://www.instagram.com/orsolaai/
- Facebook: https://www.facebook.com/orsolaai
- X: https://x.com/orsolaai
- LinkedIn: https://www.linkedin.com/showcase/orsolaai
- Home: https://www.orsola.ai/en
- Features: https://www.orsola.ai/en/features
- Pricing: https://www.orsola.ai/en/pricing
- Contact: https://www.orsola.ai/en/contact
- Support: https://www.orsola.ai/en/support
- Product usage hero: https://www.orsola.ai/en#see-orsola-in-action
- Public sign-in route (not a verified global signup): https://www.orsola.ai/en/auth

## B. Verified website resource URLs (do not publish as a master brand kit until owner reviews)

| Asset ID | Found source URL | Proposed local filename; owner approval status |
|---|---|---|
| B-001 | https://www.orsola.ai/brand/orsola-logo-light-beta.svg | `OR_BRAND_LOGO_LIGHT_BETA_v01.svg` · official-site resource; verify when to use light/dark |
| B-002 | https://www.orsola.ai/brand/orsola-logo-dark-beta.svg | `OR_BRAND_LOGO_DARK_BETA_v01.svg` · official-site resource |
| B-003 | https://www.orsola.ai/brand/orsola-logo-hero.svg | `OR_BRAND_LOGO_HERO_v01.svg` · official-site resource |
| B-004 | https://www.orsola.ai/brand/orsola-mark-light.svg | `OR_BRAND_MARK_LIGHT_v01.svg` · official-site resource |
| B-005 | https://www.orsola.ai/brand/orsola-mark-dark.svg | `OR_BRAND_MARK_DARK_v01.svg` · official-site resource |
| B-006 | https://www.orsola.ai/brand/orsola-beta-badge-light.svg | `OR_BRAND_BETA_LIGHT_v01.svg` · beta badge, remove/change when product exits beta |
| B-007 | https://www.orsola.ai/brand/orsola-beta-badge-dark.svg | `OR_BRAND_BETA_DARK_v01.svg` · beta badge |
| B-008 | https://www.orsola.ai/og-image.png | `OR_SITE_SOCIAL_PREVIEW_v01.png` · source og image, not guaranteed creative-ready |
| B-009 | https://www.orsola.ai/brand/features-image-sample.svg | `OR_SITE_FEATURES_SAMPLE_v01.svg` · validate context and resolution |
| B-010 | https://cdn.orsola.ai/public/shared/orsola-intro-poster.webp | `OR_SITE_INTRO_POSTER_v01.webp` · source marketing poster, not a real app result |
| B-011 | https://www.orsola.ai/brand/orsola-persona-1.webp | `OR_PERSONA_WEB_01_v01.webp` · website visual; verify any individuals/photo rights |
| B-012 | https://www.orsola.ai/brand/orsola-persona-2.webp | `OR_PERSONA_WEB_02_v01.webp` · verify any individual rights |
| B-013 | https://www.orsola.ai/brand/orsola-persona-3.webp | `OR_PERSONA_WEB_03_v01.webp` · verify individual rights |

**Note:** last 3 URLs are direct original paths inferred from Next image optimized URLs; they were **not independently fetched** as original files in this turn, so treat B-011/012/013 as UNVERIFIED until downloaded/checked. No file bytes/assets were copied to GitHub. Short links not proofs of image dimensions.

## C. Inferred visual design tokens (Firecrawl brand extractor; NOT official identity manual)

| Token ID | CSS-observed value | Validation status |
|---|---|---|
| COLOR-01 proposed primary purple | `#7133D2` | PROVISIONAL_EXTRACTION |
| COLOR-02 observed main CTA purple | `#663399` | PROVISIONAL_EXTRACTION |
| COLOR-03 deep dark | `#1B1627` | PROVISIONAL_EXTRACTION |
| COLOR-04 background pale | `#F8FAFC` (homepage), `#FAF7FC` (pricing) | PROVISIONAL_EXTRACTION |
| COLOR-05 neutral support | `#7B758A` or `#64748B` by page | PROVISIONAL_EXTRACTION |
| TYPE-01 inferred heading and body | **Plus Jakarta Sans** | PROVISIONAL_EXTRACTION; license/source and brand hierarchy need owner validation |
| UI-01 CTA visual | rounded/pill buttons in several main public pages | site observation, may not govern video templates |

Never distribute source font binaries in GitHub or to collaborators unless rights are confirmed. Brand designer may override every extracted token.

## D. Screenshot / product footage manifest (do not collect personal account images)

| Asset ID | Frame needed | Public URL or safe capture source | Main goal | Readiness |
|---|---|---|---|---|
| S-001 | Home hero, logo, product sentence, main CTA (desktop) | https://www.orsola.ai/en | G1 G2 | PUBLIC_CAPTURABLE |
| S-002 | Features overview and capability cards | https://www.orsola.ai/en/features | G2 G3 | PUBLIC_CAPTURABLE |
| S-003 | Pricing/plan comparison incl credit limits | https://www.orsola.ai/en/pricing | G3 G5 | PUBLIC_CAPTURABLE, TIME_SENSITIVE |
| S-004 | About/team or product story excerpt | https://www.orsola.ai/en/about | G1 | PUBLIC_CAPTURABLE |
| S-005 | Consent/privacy/security story | https://www.orsola.ai/en/security | G2 G3 | PUBLIC_CAPTURABLE, CLAIMS_LIMIT |
| S-006 | Documentation workflow illustrated screenshot | https://www.orsola.ai/en/support | G4 G6 | PUBLIC_CAPTURABLE, NOT REAL UI PROOF |
| S-007 | Real sign up → first setup flow | product-owner test account or safe browser session | G3 G4 | OWNER_DEMO_REQUIRED / no personal info |
| S-008 | Connected app permission screen | dummy Google/Microsoft connector, no tokens exposed | G4 | OWNER_DEMO_REQUIRED |
| S-009 | Dummy client email + fictional availability calendar | fabricated *test* inbox and synthetic calendar | G4 | OWNER_DEMO_REQUIRED |
| S-010 | Orsola true chat prompt → drafted response → review control | authorized demo only | G4 | OWNER_DEMO_REQUIRED |
| S-011 | Custom agent actual setup/preview | approved Pro test environment | G5 | OWNER_DEMO_REQUIRED |
| S-012 | Approved current checkout/paid-plan entitlement UI | vendor sanitized demonstration | G5 | OWNER_DEMO_REQUIRED |
| S-013 | Real recurring reminder setup/results | dummy event | G6 | OWNER_DEMO_REQUIRED |
| S-014 | Approved sample ad stills or brand animation/stinger | brand designer deliverable | G1–G6 | USER_CAN_SUPPLY |

Public screenshots S-001...S-006 can be gathered by assistant-supported browser or the user; do not demand that the user reproduce assets publicly accessible already. S-007+ require authorized controlled app environment, not private user data.

## E. Exact source files user can provide in PRIORITY WAVES

**WAVE A — enough for safe branded concept/sample:**
1. Latest approved brand kit if any (SVG/PNG logos, light/dark choice, official HEX/Pantone if different, colors, icon/wordmark rules, clean brand graphic PNG/SVG; or say the public website designs are the approved masters).
2. Approved **end-card wording**: Orsola brand name, preferred domain `orsola.ai`, approved tagline/CTA ("Discover Orsola" vs "Start Free"), desired country/language of prototype.
3. One or two reference advertisements or descriptions of the desired visual personality (minimal corporate, cinematic, typographic, playful, app-demo; user selection can come after research). **Not mandatory** for initial research.

**WAVE B — for authentic product demonstration and signup/paid messages:**
4. 4–6 sanitized screenshots or short screen recording with **synthetic account data**: Login/Welcome, connected tools, user's command, cross-tool response/draft, review step, and optionally plan/checkout. Never send username/password/tokens or original confidential customer data.
5. Product-side country availability, eligible signup and purchase URLs per selected region, latest offer/prices/features and any restrictions; not required to design global neutral brand sample.
6. Brand-approved demonstration clips and any release-date/paid subscription claims.

**WAVE C — only for client-approved paid distribution / high polish:**
7. Exact campaign media placement, portrait/landscape deliverables, runtime per cut, number of revisions, languages/VO, start/end frame guidelines, disclaimers, review signoff owner, delivery format.
8. Licensed music, SFX, spokesperson/interview releases, audio logo/stinger (if brand has it). No asset is mandatory merely for the concept.
9. Analytics baselines and event definitions for registration→activation→upgrade if an actual campaign will be measured.

**Explicitly not required now:** postal address, telephone in video, financial cards, user KYC, real customers' emails, account credentials, customer list, tracking pixels, subscriptions, paid-generation access or login of the freelancer.

## F. Filename, reference, privacy and version contract

**Pattern:** `OR_<G1-G6>_<ASSET-TYPE>_<SUBJECT>_<LOCALE>_<RATIO>_vNN.<ext>`.
Examples: `OR_G1_LOGO_WORDMARK_EN_16x9_v01.svg`, `OR_G2_CAPTURE_HOME_EN_16x9_v01.png`, `OR_G4_DEMO_EMAIL-CALENDAR_EN_16x9_v01.mp4`, `OR_G3_ENDCARD_EXPLORE_ES_9x16_v02.png`, `OR_G1_VOICE_NARRATION_EN_WAV_v01.wav`.
- Do NOT rename original owner files in place; create safe working copies and record original filename/URL, date, license, usage scope, hash when materialized, status and owner's final version.
- `SOURCE_ORIGINAL` untouched; `WORKING_DRAFT`; `BRAND_APPROVED`; `FINAL_DELIVERY` statuses separate.
- Large binaries, private demo recordings and protected media stay in user/owner-approved private workspace; PUBLIC GitHub stores only safe manifests, no secrets, no private screenshots, no imported footage.
- If a third-party font is used: reference its licensing page/name, do not attach/distribute font file via this project.
- Re-check public assets at time of production because SVG logo may change between beta and public release.

## G. Final minimal handoff
Once Wave A is provided or current public brand style is explicitly accepted as production master, proceed to [creative method selection](AD-CREATIVE-METHODS-REFERENCE-RESEARCH.md), [prompt templates](AD-GENERATION-PROMPT-PLAYBOOK.md) and [quality workflow](AD-PRODUCTION-WORKFLOW-AND-QA.md) for ONE pilot at a time. G3/G5 transactional claims require Wave B and region eligibility first.
