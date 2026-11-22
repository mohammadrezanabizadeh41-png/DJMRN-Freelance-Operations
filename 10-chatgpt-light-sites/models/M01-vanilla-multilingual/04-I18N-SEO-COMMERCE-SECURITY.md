# M01 — قراردادهای فنی i18n، SEO، پرداخت نمایشی، امنیت و معماری فایل
**S04 architecture contract accepted for planning — 2026-11-22; no site code yet.**  
**Stack:** real output pure HTML/CSS/JS. Rendering and crawlability must work even if JavaScript is disabled.  
**Related:** [research brief](01-RESEARCH-AND-BRIEF.md), [tools](02-STACK-TOOLS-AND-MCP.md), [roadmap](03-EXECUTION-ROADMAP.md).

## 1) S04 — قرارداد تأییدشدهٔ معماری استاتیک (2026-11-22)

**S04 result:** `PASS — architecture/contract only`. This stage ratifies the **target source layout and boundaries**. It is **not** evidence that any `site/` code exists or has passed browser tests; S05–S08 create data, visual design, then the real HTML. Branch `project/light-sites-m01-vanilla-20261121` and folder `10-chatgpt-light-sites/models/M01-vanilla-multilingual/` are the only project write scope; parent `main`/other models/Codex `09-` are out of scope.

### Architectural decision, why it is minimal

- **Family/M01:** static multi-page HTML + mobile-first CSS + native ES modules JavaScript. No React/Vite/Astro/WordPress, SSR, backend, Docker, database, external CMS/checkout, hosted API or runtime package installation.
- **Output:** 5 locale prefixes (`fa,en,ar,tr,de`) × 6 route kinds (`home,services,work,catalog,contact,demo-checkout`) = **30 planned HTML routes**; 25 information pages + 5 `noindex` DEMO checkout pages. Each route contains **meaningful static HTML content and native anchors without JS**. A root `index.html` explicit language choice and `404.html` are optional ancillary pages, **not** part of the 30.
- **One semantic DOM hierarchy per page kind:** layout changes only by CSS: Grid/Flex, fluid sizing and media/container queries where content requires. Different language **documents** have translated contents and `lang/dir`, but do not fork device-specific DOM. `fa/ar` RTL; `en/tr/de` LTR.
- **Smallest-first delivery:** S08 begins with **one actual `en/index.html` or `fa/index.html`** and a local HTTP smoke test, not 30 empty files. S09–S14 add the requested vertical slices; additional locale pages only when supported by verified copy. No generator until duplicated edits actually justify it. If the 30 routes make manual markup/error control wasteful, a **single built-in Node deterministic render script** can be proposed/tested later, producing plain HTML; this does **not** require Vite or change M01's runtime architecture.
- **Alternatives rejected at S04:** fully client-rendered SPA (breaks no-JS content/SEO); 30 separate hand-coded device variants (duplication); WordPress/full-stack (unnecessary RAM/services); paid design component/checkout service (rights/cost/real-payment risk). Costs for this architecture: **zero new paid dependencies**; hosting/public-domain terms remain UNKNOWN and separate approval-gated.

### Proposed physical tree; paths are a specification until S08

```text
M01-vanilla-multilingual/       # existing approved model folder
  01-RESEARCH-AND-BRIEF.md
  02-STACK-TOOLS-AND-MCP.md
  03-EXECUTION-ROADMAP.md        # one canonical stage/TEST/PASS record
  04-I18N-SEO-COMMERCE-SECURITY.md  # this engineering contract
  05-QA-AND-HANDOFF.md
  site/                         # TO BE CREATED in S08+, NOT created at S04
    index.html                  # optional x-default language chooser; never geo-forced redirect
    404.html                    # optional localized navigation fallback
    fa/
      index.html                # home
      services/index.html
      work/index.html
      catalog/index.html
      contact/index.html
      demo-checkout/index.html # noindex + always-visible DEMO warning
    en/                         # same six route kinds
    ar/                         # same six; RTL
    tr/                         # same six; LTR
    de/                         # same six; LTR
    assets/
      css/
        tokens.css              # custom properties for fluid spacing/type/colors
        base.css                # reset, fonts, focus, semantic containers, bidi
        components.css          # header/nav/cards/form/cart + CSS grid + motion+media
      js/
        main.js                 # small page-kind bootstrap, no global framework
        nav.js                  # progressive menu + accessible focus/Escape
        locale.js               # locale-safe equivalent-page links + UI text
        catalog.js              # filter/search enhancement; never sole HTML content source
        cart.js                 # pure bounded cart math/state + storage fallback
        checkout.js             # synthetic receipt state/UI; no PSP interaction
      img/                      # original or separately licensed assets only
      fonts/                    # ONLY when chosen/approved and license checked
    data/
      items.demo.json           # single synthetic product-data fixture for IDs/prices
  scripts/
    serve-local.mjs             # optional Node built-in static server; 127.0.0.1 only
  tests/
    cart.test.mjs               # Node built-in tests when cart exists
    routes.test.mjs             # 30 route/anchor/locale expectations once files exist
    smoke.test.mjs              # optional existing Playwright when browser exists
```

**No empty `site/` folders or placeholder pages are created as S04 evidence.** The physical layout above must be reviewed before S08 creation. Keep engineering documents in the existing M01 scope and stage outcomes only in `03-EXECUTION-ROADMAP.md`.

### File ownership, module I/O and failure contracts

| Boundary | Owner / canonical input | Output / allowed I/O | Failure or isolation policy |
|---|---|---|---|
| Route HTML | One localized `site/{locale}/{kind}/index.html` for the selected page kind | Static heading, metadata, content, native internal links, DOM landmarks and `data-page`; `<html lang dir>`, viewport | Basic navigation/content work **without JS**. Missing locale page is a build/test failure, not silent redirect to unrelated home |
| CSS presentation | `tokens.css` → `base.css` → `components.css`; shared responsive tokens | A single semantic page DOM rendered across 320–1920 CSS px; logical properties and `prefers-reduced-motion` | No layout controlled by JS, no mandatory hover and no page-level horizontal overflow; adapt breakpoints only on evidence/content |
| `main.js` | `data-page` + current locale from document/URL | Imports `nav.js`/`locale.js`; conditionally starts catalog/cart/checkout only on matching pages | Missing optional elements are harmless; errors scoped to page behavior; not an authority for primary content |
| `nav.js` and `locale.js` | Native HTML anchors + `lang/dir` + equivalent page-kind map | Optional accessible menu controls, active state and locale switching via **real hrefs** | No JS: nav/locale anchors remain reachable. JS: `aria-expanded`, Escape, visible focus; no interaction can be hidden by JS failure |
| `catalog.js` | Public synthetic `/data/items.demo.json`, shared product IDs | Optional local search/category filter/empty/reset on pre-rendered cards; no external calls | Fetch/JSON failure leaves static cards and an honest state message; don't clear content before data validated |
| `cart.js` | Validated IDs and integer `priceMinor` from canonical fixture, bounded quantities | Deterministic total in **integer minor units**; `sessionStorage` optional, anonymous only | Invalid item, overflow, corrupted storage, storage denied → ignore/reset safely and show message; no sensitive data or order proof |
| `checkout.js` | Cart snapshot validated against same fixture | Mock review, no-money-charged state, synthetic receipt with `role=status` | No real PAN/CVV, payment provider, identity fields, webhook, API, transmission or legally valid receipt |
| Local preview | `site/` static root only; localhost URL | Simple `127.0.0.1` HTTP, correct HTML/CSS/JS/JSON/SVG MIME, `index.html` resolving and 404 | Do not run via `file://` for modules/fetch. Reject `..\\` traversal, no exposed secret parent directory; stop process after tests |
| Tests + Git | `tests/`, current M01 branch and current project folder | Deterministic validators, Node `--test`, browser viewport evidence, versioned changes | Never mutate other model folders, `main`, `09-` or private credentials; revert via Git commit |

**S05 data authority:** the exact six ID/category/`priceMinor` values and state/failure rules are now recorded under section **1B** below. No real ISO currency or FX conversion is used. Physical `site/data/items.demo.json` begins only when implementation reaches S08/S12.

### HTML, JS and CSS interoperability contract (S08 implementation targets, not code shipped in S04)

- HTML head: `charset=utf-8`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, localized `<title>` and description, `<html lang="fa|en|ar|tr|de" dir="rtl|ltr">`, and ordered native CSS links. Use a single `<script type="module" src=".../assets/js/main.js">` referencing same-origin assets. Modules defer execution by default; test correct MIME.
- Layout: `header` containing a single `nav` with native links and always-discoverable language controls; `main id=main-content`, accessible page heading, `footer`, skip link. JS-enhanced mobile menu control starts hidden in no-JS mode and only becomes active once JS has initialized; without JS, native nav links remain visible and keyboard-reachable.
- Use relative or site-root-based links **consistently** for localhost (S08); hosting under a subpath is UNVERIFIED and must not be assumed. S19 tests final base-path mapping before a permitted deploy. Localization switch targets corresponding kind, never automatically changes language by IP/UA.
- CSS uses logical box properties, `min-inline-size:0`, `max-inline-size:100%`, `clamp()`, `auto-fit/minmax` where useful. Desktop nav and 2–3-column content expand only when enough space; breakpoints are specified in S06 after real content, not hardcoded to device user agents. No permanent mandatory font download or oversized image/animation.
- JS enhancement loads on **localhost HTTP**; `fetch('/data/items.demo.json')` only if local static server serves `site/` at origin root. No `eval`, injecting user strings through `innerHTML`, analytics, external payment scripts or remote APIs.
- Contact form has client validation/mock result only; no `action` that sends PII or hidden submission. No-JS message honestly says preview is interactive only when enabled.
- Persisted demo cart does **not** represent durable orders. Changing locale on the same origin may keep anonymous `sessionStorage` cart with validation; no guarantee across browsers, tabs, origins or restarts. A reset is available.

### S04 acceptance checks and handover

| ID | Non-runtime test (S04) | Expected result | Later operational verification |
|---|---|---|---|
| A01 | fixed 5 locale keys × 6 page-kind keys; distinct canonical route strings | exactly 30 unique `site/{locale}/...` targets, checkout `noindex` | S05 IA; S08–S15 actual outputs |
| A02 | architecture path stays in approved model folder; current local branch and clean status | isolated `project/light-sites-m01-vanilla-20261121`, no project 09 touched | S08 git change/diff |
| A03 | 3 CSS/6 ES-module roles, one fixture and one localhost preview; no framework/back end | explicit I/O, storage, failures and stop conditions | S08–S14 real localhost/I/O |
| A04 | no-JS semantic content, 5 locale/RTL contract and 3 responsive classes | complete written contract, not a render pass | S09/S10/S16/S18 browser QA |
| A05 | no real PSP/PII, missing product/browser/network/fetch failures, rollback policy | documented safety and reversibility | S13–S19 failure tests |
| A06 | external documentation rechecked: [MDN ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules/Modules_on_the_web), [MDN Local server/CORS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/set_up_a_local_testing_server), [Google localized variants](https://developers.google.com/search/docs/specialty/international/localized-versions), [MDN responsive](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) | URLs/provenance recorded; no claim of tests on site | S08/S15/S18 |

**S04 definition of PASS:** contract and all A01–A06 static checks accepted with evidence in same roadmap; no actual pages/tests are required yet. S05 (route IA and fixture) and S06–S07 (visual/i18n) are still unticked and must not be silently marked complete. Build/live preview starts **S08**.

## 1A) قرارداد معماری Responsive برای سه کلاس اصلی دستگاه
**Single codebase, one semantic HTML per locale-route:** سایت جداگانه برای موبایل/تبلت/دسکتاپ نداریم. هر سه کلاس یک محتوا و ساختار معنایی می‌بینند؛ فقط چیدمان fluid متناسب **viewport، اندازه container، جهت و امکانات input** متفاوت می‌شود. CSS و JS پروژه همچنان Vanilla باقی می‌مانند.

### رفتار طراحی
| بخش | موبایل (هدف 320–430 px) | تبلت (هدف 600–1024 px) | لپ‌تاپ/دسکتاپ (هدف 1024–1440 px) | مانیتور عریض 1920 px |
|---|---|---|---|---|
| Header / Navigation | لوگو، منوی قابل لمس و انتخاب زبان accessible، بدون hover-only | منوی فشرده یا افقی بسته به جا، هدف لمس واضح | منوی افقی کامل در صورت جا، keyboard/mouse | همان منو، عرض محتوا محدود |
| Hero | متن/CTA اول، تصویر زیر یا کنار در فضای کافی، عدم crop نامناسب | دو ستونه در صورت فضای کافی | متن و تصویر متعادل، عنوان بزرگ با `clamp()` | متن خوانا با `max-width`، فضای خالی کنترل‌شده |
| Service/Portfolio grid | غالباً یک ستون؛ کارت‌ها resize fluid | معمولاً دو ستون، بر اساس متن و عرض container | ۲–۳ ستون یا CSS Grid بانتو محدود | بدون ستون‌های بسیار کشیده |
| Catalog | فیلتر/کارت/سبد روی هم، دکمه‌ها لمسی | فیلتر کنار یا بالای محصولات؛ ۲ ستون | فیلتر/کارت/سبد در شبکه متناسب عرض | حداکثر عرض ثابت‌تر و whitespace |
| Contact/demo checkout | فرم و خلاصه در یک ستون؛ دکمه‌ها تمام‌عرض در صورت لزوم | فرم + خلاصه در دو ستون اگر usable | دو ستون، بدون خروج محتوا | ستون‌ها محدود به عرض مناسب |
| Language + bidi | `lang/dir`, `bdi`، متن بلند بدون overflow | همان محتوای واقعی با wrap مناسب | همان محتوا و دسترسی یکسان | همان قواعد |

**این‌ها heuristic هستند، نه breakpoint ثابت.** پیکربندی واقعی در S06 با دیدن محتوا انتخاب می‌شود؛ عرض 820px الزاماً «فقط تبلت» نیست.

### قواعد فنی حداقلی
- `<meta name="viewport" content="width=device-width, initial-scale=1">` در هر صفحه؛ از `user-scalable=no` و محدودکردن بزرگ‌نمایی خودداری کن.
- mobile-first CSS؛ Flex/Grid با `minmax(0,1fr)`, `repeat(auto-fit, minmax(...))`, `min-width:0`, `max-inline-size`, `max-width:100%`؛ در صورت نیاز media queries مبتنی بر محتوا با `rem` و container queries برای کارت‌های درون شبکه. JS برای تغییر layout استفاده نشود مگر ضرورت اثبات‌شده.
- typography fluid: `clamp()` و واحد `rem`، طول خط خوانا (مثلاً 60–75ch برای متن Latin و آزمون مستقل متن فارسی/عربی)، فاصله و padding منطقی (`padding-inline`).
- تصاویر: `<picture>` فقط اگر تغییر هنری واقعاً لازم شد، `srcset/sizes` برای انتخاب اندازه فایل، width/height یا `aspect-ratio` برای جلوگیری از CLS؛ آیکون/متن باید در zoom/RTL درست بمانند.
- touch targets: **WCAG 2.2 AA حداقل 24×24 CSS px با استثناهای مقرر؛ ترجیح طراحی 44×44 CSS px برای کنترل‌های اصلی**؛ focus keyboard قابل مشاهده، state منو با Escape و بدون hover اجباری.
- landscape و orientation: فقط viewport را مدنظر قرار بده؛ scroll افقی کل صفحه، sticky محتوای مزاحم یا پوشاندن CTA در صفحه کوتاه ممنوع. safe-area `env(safe-area-inset-*)` فقط هنگام نیاز، بدون طراحی مختص یک گوشی.
- Reflow: آزمون در 320 CSS px و zoom تا 400% برای سناریوی W3C (از جمله محتوای 1280px در 400% ≈320 CSS px). Zoom 200% و text resize نیز جدا سنجیده شود؛ اسکرول افقی فقط برای استثنای واقعی محتوای دوبعدی و در container محدود.
- هیچ قابلیت (language switcher، catalog filter، cart، demo receipt، contact) نباید در کلاس نمایش دیگر حذف شود؛ فقط محل و چیدمانش عوض می‌شود.
- retina/large screens: رزولوشن فیزیکی و viewport CSS دو چیز جدا هستند؛ devicePixelRatio معیار تصمیم ساختار نیست. 1920px یک تست تکمیلی است نه یک «نسخه چهارم».

### آزمون مداوم
- **طراحی/بازبینی اولیه:** 390 موبایل + 820 تبلت + 1366 یا 1440 دسکتاپ، fa RTL و en LTR.
- **آزمون نهایی S18:** 320/360/390/430، 600/768/820/1024، 1280/1440 و 1920 CSS px؛ هر پنج زبان با حالت‌ها و آزمون‌های ریسک‌محور؛ portrait/landscape در viewportهای مناسب، zoom، pointer/touch و keyboard.
- **دستگاه واقعی:** اگر کاربر تبلت فیزیکی ندارد، مرورگرِ شبیه‌ساز viewport برای تست layout قابل استفاده است ولی «تست تبلت واقعی» نباید ادعا شود. موبایل و لپ‌تاپ واقعی تا حد دسترسی کاربر تست شوند.
- شواهد هر گام در checkbox همان Sxx و ماتریس تست T10/T08 ثبت می‌شود، نه سند وضعیت موازی.

**منابع رسمی:** [MDN Responsive Web Design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design); [MDN Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries); [web.dev Choose Breakpoints](https://web.dev/learn/design/media-queries); [W3C WCAG Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html); [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/).


## 1B) S05 — معماری اطلاعات، URL/CTA، دادهٔ نمونه و حالت‌های خطا (2026-11-22)

**S05 contract:** `PASS as specification only`. No website has been created: `site/` still belongs to S08, and no screenshot or real interaction of NOVA Atelier is asserted. The S02 brief remains canonical for product/audience, S04 for architecture, and **this subsection** is the detailed current IA/product-data contract; execution progress belongs **only** to `03-EXECUTION-ROADMAP.md`.

### Routes: one locale × one page kind

- Locale keys: `fa` (RTL), `en` (LTR), `ar` (RTL), `tr` (LTR), `de` (LTR); switcher autonyms are `فارسی / English / العربية / Türkçe / Deutsch`. Language selection always preserves the **page kind**, not necessarily search/filter UI state. No automatic geolocation/IP redirect.
- Exactly six page kinds per locale: `home`, `services`, `work`, `catalog`, `contact`, `demo-checkout`. Home path `/{locale}/`; others `/{locale}/{kind}/`. File targets are respectively `site/{locale}/index.html` and `site/{locale}/{kind}/index.html`.
- This yields **30 distinct HTML targets = 25 public-information pages plus 5 DEMO checkout pages**. All checkout variants have `meta name="robots" content="noindex"` and explicit "DEMO — no money charged" in their language; none appear in a production sitemap. Root language chooser and `404.html`, if created, do **not** count as the 30.
- The **six future routes per language** are `/{locale}/`, `/{locale}/services/`, `/{locale}/work/`, `/{locale}/catalog/`, `/{locale}/contact/`, `/{locale}/demo-checkout/`. Locale equivalents must exist **before** creating links to them. During incremental S08–S14, hide/disable links to not-yet-built page routes rather than generate 404s. At S15, reciprocal `hreflang` annotations require the **final real public absolute URLs**, not example.com/localhost.
- Origin for S08 testing: `http://127.0.0.1:<port>/` with `site/` as web root; trailing slash/`index.html` resolution and correct asset MIME required. No claims about eventual hosting base path; it is UNKNOWN and separately approved.

### Navigation graph, CTAs and deliberate no-JS behavior

**Global header:** logo → same-language Home, native anchor links Home / Services / Work / Catalog / Contact, the five-language switcher with autonyms, and discoverable DEMO cart entry where relevant. **Checkout is not a sixth permanent main menu entry**; access it only via demo cart, never advertise a real payment product. Footer shows truthful DEMO identity, navigation and contact disclaimer; no fake ratings, clients or physical address.

| Page | Primary CTA / behavior | Secondary / recovery | Main required content |
|---|---|---|---|
| Home | `/{l}/services/` — Explore services | `/{l}/work/`, `/{l}/catalog/` | Value proposition, six services preview, three labelled Concept/DEMO projects |
| Services | `/{l}/work/` — View conceptual work | `/{l}/contact/` | Six genuine capability descriptions (not unverified delivery claims), Demo notice |
| Work | `/{l}/catalog/` — Explore demo catalog | `/{l}/contact/` | Three clearly marked Concept/DEMO cases, never fabricated clients or KPIs |
| Catalog | `Add to DEMO cart` local JS action; then `/{l}/demo-checkout/` only if cart valid | `/{l}/work/`; clear filters | Six static product summaries, category/search controls, no-results/reset |
| Contact | `Preview validation` with explicit **not sent** status, local-only | `/{l}/services/` | Labelled mock input controls, no network action or PII storage |
| Demo checkout | `Confirm DEMO` local JS action only, never a real order | `/{l}/catalog/`, remove/reset cart | Item/quantity/fictional total, banner "no money charged", mock acknowledgement |

Here `{l}` is exactly one of `fa/en/ar/tr/de`; it is **not** a literal production URL segment. **Three accepted journeys:** Services: Home → Services → Work → Contact; Demo catalog: Home → Work → Catalog → Cart → Demo checkout → simulated receipt; Language: any page kind → equivalent kind in selected locale. All anchored page navigation works without JS where implemented; filtering/cart/receipt are progressive enhancements and display an honest fallback when JS is disabled.

**Contact no-leak rule:** no real `form action` or implicit GET submit can carry typed text into the URL. Initial static HTML can use a non-submitting group with disabled inputs until a local-only handler is installed; the preview control is `type=button`. A demo validation result must explicitly say that nothing was transmitted or stored.

### Synthetic catalog fixture — S05 canonical JSON specification

The following six entries are the **only S05 reference values**, matching the six names in the S02 Brief. S08/S12 will create `site/data/items.demo.json` from this single approved specification and then make the physical fixture canonical; do **not** maintain parallel prices. `titleKey` labels are translated at S07. Product/case assets must be original or separately licensed.

```json
{
  "schemaVersion": 1,
  "mode": "DEMO_ONLY",
  "priceUnit": {
    "code": "DEMO_CREDIT",
    "minorPerUnit": 100
  },
  "categories": [
    "web",
    "design",
    "audit"
  ],
  "items": [
    {
      "id": "landing-kit",
      "titleKey": "catalog.landingKit",
      "category": "web",
      "priceMinor": 18000
    },
    {
      "id": "company-site-kit",
      "titleKey": "catalog.companySiteKit",
      "category": "web",
      "priceMinor": 48000
    },
    {
      "id": "portfolio-kit",
      "titleKey": "catalog.portfolioKit",
      "category": "web",
      "priceMinor": 28000
    },
    {
      "id": "multilingual-ui-kit",
      "titleKey": "catalog.multilingualUiKit",
      "category": "design",
      "priceMinor": 36000
    },
    {
      "id": "seo-starter-audit",
      "titleKey": "catalog.seoStarterAudit",
      "category": "audit",
      "priceMinor": 12000
    },
    {
      "id": "performance-check-pack",
      "titleKey": "catalog.performanceCheckPack",
      "category": "audit",
      "priceMinor": 16000
    }
  ]
}
```

- Categories for actual items: `web` (3), `design` (1), `audit` (2). Filter choices: `all` plus those three; `all` is **not** an item category.
- `DEMO_CREDIT` is a **fictional unit**, not legal tender, cryptocurrency, gift card or an ISO currency. `priceMinor` is a safe integer representing **1/100** of a fictional demo credit. Format `priceMinor/100` with `Intl.NumberFormat(locale)` in **decimal** style followed by a localized "demo credits" label; **never currency-style, FX conversion, bank symbols or provider checkout**.
- Default catalog visible = six items. Search is local over approved translated labels, categories and descriptions; no-results state has explicit "0 results" and "Clear filters" action. Empty input + `all` resets all six. Invalid category is a reset/error, not a fatal exception.
- The **maximum cart** is six distinct IDs, each integer quantity from **1 to 9**; unit prices always come from validated fixture, **never the UI or session storage**. All-six-nine maximum = **1422000 minor units**, i.e. **14220 fictional demo credits**; math remains below `Number.MAX_SAFE_INTEGER`.
- Session-only anonymous optional state key `nova.m01.demoCart.v1` with `{schemaVersion:1,items:[{id,qty}]}`. Unknown item, duplicate ID, NaN, fractional or over-limit quantity, unsupported version, failed storage access or corrupted JSON triggers explicit local reset/validation and never an uncaught error. No names, emails, cards, actual delivery or PII stored.
- Checkout state machine: `EMPTY` → prompt Catalog; `REVIEW` validated cart → `DEMO_CONFIRMED` with local synthetic acknowledgement and `role=status`; `RESET` back to empty. No transaction, PSP, order API, paid service, real receipt or durable order. If JS is off, show an honest non-functional demo disclaimer and navigation, not a false success.
- Failed JSON fetch, unavailable JS or empty search must leave meaningful **HTML catalog cards** and truthful status text; never clear static content before validating fixture. File `/data/items.demo.json` is requested from same-origin localhost only after S08 creates it.

### Three-screen interaction map, no hidden features

| Surface | Mobile 320–430px | Tablet 600–1024px | Desktop ≥1024px | Required input/error |
|---|---|---|---|---|
| Navigation, locale and cart | One accessible menu plus visible access to language/cart | Compact or expanded per available content width | Full nav when room exists | Native keyboard links; touch targets ≥24 CSS px WCAG AA (aim 44); Escape/focus-visible; no hover-only |
| Services & Work | One column, CTA reachable | 1–2 cards if readable | 2–3-column bounded grid | Cards link to correct local route and keep DEMO text |
| Catalog search/filter | Search and category controls before 1-column cards | 1–2 columns, controls still accessible | Up to 3 columns and readable filters | Touch/mouse/keyboard, clear filter, no-match, invalid fixture fallback |
| DEMO cart/checkout | Stacked summary, visible DEMO banner | Responsive group without truncated totals | Balanced layout with max-width | +/-/remove/reset/confirm, storage denied, invalid qty, 0 items |
| Contact demo | Preview only, status never says "sent" | Same semantic controls | Same capability | Disabled-by-default or non-submitting controls; no GET/POST |
| Language and direction | fa/ar RTL, en/tr/de LTR | Long German/Turkish strings reflow | Never hide locale switcher | Preserve kind, readable bidi product IDs, no forced redirect |

Breakpoints are determined from content in **S06**, not chosen solely from the above test-width labels. Device-independent HTML/DOM remains constant. Zoom/reflow/landscape and actual hardware quality are **S16/S18/S20**, not S05 claims.

### S05 acceptance (contract-only, tests must be deterministic)

| ID | Static test now | Later real-product test |
|---|---|---|
| B01 | 5 locales × 6 kinds = 30 distinct route paths; 25 public + 5 noindex | S08/S15 real files/hreflang/robots |
| B02 | Five main-nav targets per locale, 3 journeys, all CTA references resolve within the future route registry | S09–S14 browser navigation and same-kind language links |
| B03 | JSON parses, 6 non-repeating IDs, categories valid, safe integer prices; total bounded | S12/S13 rendered data/cart tests |
| B04 | Coverage for no-results/reset, invalid ID/qty, unavailable JSON/storage, no-JS, mock Contact and Checkout | S12–S14 injection/failure tests |
| B05 | One UX contract for mobile/tablet/desktop and fa/ar RTL vs en/tr/de LTR | S06/S07/S16/S18 actual rendered QA |
| B06 | No real payment/data transfer, new tooling, outside-folder access, invented domain or unlicensed assets | S13/S15/S18/S19 privacy/license checks |

**S05 does not build pages.** S06 chooses layout/token/wireframes, S07 authors/validates five-language copy, S08 builds the first actually runnable HTML under the isolated M01 folder. No new packages, payment infrastructure, framework or live deployment is authorized.

**Canonical references:** [Google localized URLs/hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions), [Google multilingual site structure](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites), [MDN local server for JS modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules/Modules_on_the_web), [W3C WCAG 2.2 24px minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum).

## 2) i18n conventions and content QA
- Locale: `fa` RTL, `ar` RTL; `en`, `tr`, `de` LTR. Root HTML always sets `lang` and `dir` and a locale-specific page title.
- Language switcher: each page links to the **equivalent route in other locales**, not blindly to each homepage. Text labels are human-readable language autonyms.
- `<bdi>`/`dir="auto"` for product names, codes and Latin snippets inserted into RTL text, not overriding large page areas with text-align hacks.
- CSS use `margin-inline`, `padding-inline`, `inset-inline`, `border-start-start-radius` where appropriate; bidi directional icons reviewed. Logical properties do not imply that photographs and logos should be mirrored.
- **S07 canonical draft content:** [`content/i18n.v1.json`](content/i18n.v1.json), one source for `fa/en/ar/tr/de` across all six page kinds. Includes `title/description/H1/lead`, UI/CTA/accessible labels, six service cards, three DEMO case descriptions and six synthetic product descriptions and proposed image alt text per locale. This is **model-authored draft copy**, not human native-speaker-certified translation. Structural completeness, keyboard-safe semantic proof and overflow/reflow were tested in S07; independent linguistic proofreading of Persian/Arabic/Turkish/German (and English editorial proof) remains an explicit **S16/publication blocker**, not something to declare verified merely from browser tests. At S08 consume or deterministically render from this *single* JSON source; no shadow/parallel translation database.
- `Intl.NumberFormat` (decimal, not currency-style) can format integer `priceMinor / 100` according to locale; label it with locally translated **fictional `DEMO_CREDIT`**. This is **not an ISO currency**, never convertible and no paid or provider checkout exists. `Intl.DateTimeFormat`/`Intl.PluralRules` are optional only when actual copy needs them, not extra dependencies.
- Avoid mismatched locale and price/currency semantics. Do NOT simply convert demo currency in browser at unverified FX rates; same safe fixture price units may be shown everywhere with clear DEMO unit.
- Locales need translated title/H1/alt/CTA/meta/labels, accessible names and any structured data fields. Long German/Turkish labels and RTL punctuation require QA.

## 3) SEO localization matrix and crawlability
**Core rule:** meaningful main content appears as HTML, not only client-rendered JS. Every important page has a crawlable `<a href>`, stable URL and appropriate HTML document metadata. Google explicitly warns that JavaScript crawling/rendering differs from static HTML and depends on discoverability.

For each valid page kind (home/services/work/catalog/contact):
- self canonical when public, unique descriptive `title`, `meta name=description`, one visible `h1`, semantic regions and breadcrumbs where useful.
- all five reciprocal `<link rel="alternate" hreflang="fa|en|ar|tr|de" href="...">` in every counterpart and `x-default` pointing to actual neutral selector page. Do not add `x-default` if there is no matching fallback.
- `hreflang` also in sitemap if chosen; sitemap uses only absolute final URLs; avoid duplicate or fake language page entries.
- correct `lang`/`dir`, Open Graph description/image using original rights-cleared assets, no deceptive review stars.
- avoid auto language redirect based on geo/IP/Accept-Language without user choice; explicit language links are robust and accessible.
- `robots.txt` must reflect what is actually allowed to index; `noindex` for demo checkout and any provisional demo-only products, no contradictory robots blocking `noindex` fetch.
- `WebSite` and `Organization` JSON-LD **only with truthful publisher/brand facts** once authorized. `Product`/`Offer` merchant structured data **NOT** for nonexistent purchasable sample products; no fabricated reviews/ratings. Rich result eligibility is never guaranteed.
- `FAQPage` schema if Google guidelines and genuine content support it; avoid markups not backed by visible page.

**Local SEO gate:** parse the HTML files, check unique titles/H1, internal links, alternate hreflang reciprocity, canonical consistency, valid sitemap, noindex demo routes. **No claim of Google indexing while only localhost exists.**

Sources: [Google localized](https://developers.google.com/search/docs/specialty/international/localized-versions), [Google developer guide](https://developers.google.com/search/docs/fundamentals/get-started-developers), [Google sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Google link crawlability](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [Google structured data quality](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

## 4) Payment/cart boundary and future integration contract
The user requests a **professional demo with payment gateway capabilities**. At M01 **no real gateway exists or can be safely implemented with browser-only HTML/CSS/JS**. We design a visible mock that exercises UX, not a financial transaction.

### State transitions, all client demo
```text
Catalog → Add to DEMO cart → Review quantities → Confirm mock checkout
→ display "DEMO — no money charged" → mock receipt reference (clearly synthetic)
```
- Only fixture products, safe IDs, bounded quantities and integer monetary units; revalidate cart on load and reset corrupted state.
- No actual payment iframe, bank branding, card PAN/CVV fields, full name, phone, address, external PSP API keys, token, real order or ledger. UI cannot take/claim funds.
- Product prices in demo are not real merchant offers. No receipt sent anywhere and no background network submission. No fake paid order statuses.
- `demo-checkout` `noindex`; visually labeled in **all five languages**. Mock payment feedback must be discernible to screen readers (`role=status`).

### If later requiring real payment (separate proposal and probably M21/M18 classification)
1. Verify seller's legal eligibility/KYC, PSP provider support, pricing/quota and required host region **from the actual provider's official terms**. Unknown/paid = STOP until approval. Do not promise Stripe/PayPal/ZarinPal or other provider approval for this user.
2. Backend creates order from **authoritative** product prices; validates stock/total and currency, signs server-side payment session/checkout redirect. No secret in browser or public GitHub.
3. Hosted checkout/redirect from authorized PSP, followed by **server-side verified webhook/callback**, signature verification and idempotency. Client return-page success is not payment proof.
4. Persistent order status and refunds/reconciliation, privacy/retention/rate limiting/observability, failure handling. No real charge until standalone approval.
5. If these production requirements appear, the **site's M01 frontend can remain static**, but its production e-commerce system is *not* pure M01 anymore. Explicitly record the change to M21/fullstack path; do not tick M01 as a completed production store.

**Source:** [OWASP Frontend Security](https://cheatsheetseries.owasp.org/cheatsheets/Web_Frontend_Security_Cheat_Sheet.html) (never trust client security logic/secrets), [Stripe example of hosted checkout with server endpoint + verified webhook](https://docs.stripe.com/payments/existing-customers?platform=web&ui=stripe-hosted). Stripe is a **generic architecture reference only**, not a selected/available provider.

## 5) Forms, privacy, security headers and static hosting
- For M01, Contact screen uses native form controls with **client validation demonstration only** and clearly explains that data is not transmitted. No storing or sending PII, no third-party analytics/CRM without approval. If the owner wants actual contact delivery, implement an approved serverless/backend with its own domain/data retention policy and consent.
- Security: do not render untrusted strings via `innerHTML`; use `textContent`, DOM APIs, trusted static templates. Sanitize/validate if user content ever appears.
- No secrets, keys, sessions, personal addresses or .env in public GitHub; test only synthetic data. No unsafe `eval`, tracking scripts, ad pixels or third-party dynamic widgets.
- Server/hoster later should implement HTTPS, restrictive CSP, Referrer-Policy and other applicable headers with a tested rollout; `meta http-equiv` CSP only partial substitute. Check real hosting support before promising any header feature.
- Route/asset errors: no broken links, meaningful 404 page, correct cache policy and security headers once deployed.
- Session/localStorage optional only for anonymous demo cart, bounded data and clear action to reset; localStorage is **not** a secret store, proof of purchase or durable commerce database.
- Before any public site: verify asset redistribution licenses, domain, organization facts, privacy/legal text, hosting availability/pricing/overage/retention/region and owner approval.

Sources: [OWASP Frontend](https://cheatsheetseries.owasp.org/cheatsheets/Web_Frontend_Security_Cheat_Sheet.html), [OWASP CSP](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html), [MDN RTL](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir).

## 6) SEO/performance targets are acceptance targets, not measured results
- Internal Lighthouse aspiration: Performance/Accessibility/Best Practices/SEO **≥90**, subject to representative lab measurement; not yet measured, no guaranteed score.
- Google Core Web Vitals field **good** thresholds at 75th percentile: **LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1**, when there is real public traffic. Local Lighthouse lab reports are NOT a substitute for field 75th percentiles.
- Keep images dimensioned, lazy-load below-the-fold only, reserve layout space, responsive images, small JS modules, no unnecessary npm runtime, preload only actual critical asset.
- WCAG 2.2 AA as a **target** with manual keyboard, meaningful focus, language, reduced motion, contrast plus axe; automated scanner alone does not certify compliance.
- Motion: no scroll traps, no gratuitous parallax, no auto-playing background video. Prefer CSS transitions + `prefers-reduced-motion`.
- Test 320, 360, 390, 430 (mobile), 600, 768, 820, 1024 (tablet and small laptop), 1280/1440 (laptop/desktop) and 1920 CSS px (wide optional), including orientation and locale combinations. Require real browser screenshots and no unintended page-level horizontal overflow; record whether tested on real hardware or emulation.

Sources: [web.dev CWV](https://web.dev/articles/defining-core-web-vitals-thresholds), [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview), [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), [MDN prefers reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion).

## 7) Reversibility and source-of-truth
- Existing parent: `10-chatgpt-light-sites/`; M01 branch `project/light-sites-m01-vanilla-20261121`, folder `models/M01-vanilla-multilingual/`. Never edit `09-self-marketing-website/`.
- Documents here are design contracts and acceptance before code. Source code lives **in this model folder**, no cross-copy of original site files or unpublished vendor resources.
- Step status lives in `03-EXECUTION-ROADMAP.md`; checkbox for M01 in parent `05-MODEL-BUILD-CHECKLIST.md` stays unchecked until full finish. No additional recurring status log.
- After each approved implementation slice: diff/test/commit and possible revert; preserve ability to roll back without schema migration or cloud account changes.

**Status:** S04 architecture contract PASS (specification only); no site code created, no runtime/security test or public deployment.

## 8) S09 content-dashboard architecture gap audit — 2026-11-22; stage S14A is NOT STARTED

### 8.1 Fact / assumption / judgment

- **FACT (repo + real PC inspection):** Current M01 is five static localized Home pages and a root chooser; `site/` has no admin/editor/dashboard route, no DB, no auth, and Node `serve-local.mjs` serves `site/` only.
- **FACT:** S02 explicitly excludes actual accounts, database, payments and contact collection. The prior 20-stage roadmap had **no independently testable operator/authoring dashboard deliverable**.
- **OWNER REQUIREMENT:** A professional, complete-in-its-category M01 sample must also demonstrate a real **management UI**.
- **JUDGMENT / PROPOSED IMPLEMENTATION:** Keep M01 **pure HTML/CSS/vanilla JS output** and add one **local-only content studio** as extra stage S14A. Public 30-route contract and existing model identity remain unchanged. Prefer a small separate loopback-only authoring tool over introducing a second CMS, DB, authentication system or frontend framework.

### 8.2 Boundaries, authority and architecture (decision for future S14A build)

| Concern | Canonical authority / contract | Not allowed |
|---|---|---|
| Public site | `site/`: 30 intended public/demo HTML routes; deterministic static files | Host dashboard/auth logic or sensitive draft files under `site/` |
| Content | `content/i18n.v1.json`: single canonical approved source, IDs and 5 locale keys | Parallel production content DB, shadow translation store |
| Editor draft | Private local-only file *outside* `site/`; explicit draft version, original hash, bounded schema and reversible backup | Silent overwrite of canonical data, uncontrolled file writes |
| Rendering | Existing Node deterministic build script(s); preview differences in **local browser** | Runtime dependency on paid SaaS, React/Vite/CMS, secret client-side keys |
| Auth/security | **No genuine admin account in M01.** Run the authoring endpoint **loopback-only**, never through the LAN preview or public host; restrict origin, HTTP methods, file paths and input limits | Client-only password, fake access-control role, storage of secrets, open CORS or remote write API |
| Publishing | Owner reviews diff and explicitly approves production-relevant content/hosting changes; GitHub source/commit provides history and rollback | Auto-publish, silent PR merge, direct write to live site |
| Analytics / sales | Only measured static page count, content readiness, fictional product count and QA results with provenance | Fabricated visits/orders/revenue/customer data or implicit telemetry |

### 8.3 One small but professional management experience

**IA and dashboard screens:** `Overview` (coverage + build/QA health), `Pages & Languages` (30-route planning/locale matrix), `Services` (six descriptions), `Concept Work` (three clearly DEMO cases), `Catalog` (six fictional kits, tags/category, DEMO_CREDIT), `Media/Alt/Licenses`, `Settings/SEO`, `Review Changes & Preview`, `Recovery`. Display each status honestly as `draft / needs review / validated / locally built`; do not claim public traffic.

**Minimum real I/O:** Read canonical fixture; edit a synthetic value in at least two languages; dirty-state and unsaved-change warning; schema validation with field-level errors and summary; import/export safe UTF-8 JSON or explicit local draft file; persist and reload draft after process restart; show before/after diff; rebuild static HTML only after explicit approval; test resulting pages; rollback to previous Git/draft version on failure. Image workflow must preserve provenance/licenses and alt correctness. Support mouse, touch, keyboard, RTL/LTR and 320/820/1366px.

**Security and reliability:** No `/admin` in public `site/`; no stored password/token/session ID in `localStorage`; never trust client-only role checks. Any local Node authoring HTTP service needs explicit loopback binding, restrictive same-origin/Host/CSRF defenses where applicable, allowlisted methods and paths, bounded JSON, schema and filename checks, atomic safe draft writes, no path traversal/symlink escape, no external egress, and tests for invalid data, duplicate IDs, tampered DEMO price, locale gaps, crash/restart and rollback. A passive file import/export UI may be preferable if it meets actual durable editing use. Do not copy draft/PII into a public GitHub repo.

**Alternative comparison and activation gate:**

| Candidate | Role / fit | Cost, permissions and risk | Decision |
|---|---|---|---|
| Built-in local editor + Node/vanilla JS | One small content-authoring UI; Git+JSON source; sufficient for M01 | Existing tools, no new provider, smallest reversible option | **PLANNED DEFAULT**; S14A proves real I/O |
| Decap CMS / Git-backed editor | External CMS editor for static sites with Git backend | Official docs require Git host authentication/OAuth or other backend; exact provider quota/hosted auth pricing **UNKNOWN**, new auth/security work | **ALTERNATIVE / NOT ACTIVATED** |
| M10 WordPress / M15 Grav CMS | Fully different CMS showcase model with publishing/editor runtime | Extra runtime, configuration, CMS auth and RAM/maintenance | **SEPARATE MODEL / NOT INSTALLED HERE** |
| M21 real full-stack service | Real multiuser admin, authenticated writes, server-side roles, orders/CRM | Requires backend/durable state, authorization and security review, approval | **ONLY if real production use case explicitly approved** |

**References checked 2026-11-22:** [Decap CMS architecture](https://decapcms.org/docs/intro/), [Decap GitHub backend](https://decapcms.org/docs/github-backend/), [OWASP access-control authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), [OWASP session storage](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), [MDN client-side storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), [MDN File System API and user permission](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API), [GOV.UK task list / errors](https://design-system.service.gov.uk/components/), [W3C accessible data tables](https://www.w3.org/WAI/tutorials/tables/), [GitHub protected review](https://docs.github.com/en/pull-requests/reference/managing-and-standardizing-pull-requests). No provider, installer, paid tier, login or sensitive permission activated during this research.

**Status:** RESEARCHED + SPECIFIED (not coded). The stage checkbox in `03-EXECUTION-ROADMAP.md` and independent tests in `05-QA-AND-HANDOFF.md` govern S14A PASS; do not confuse this design contract with functioning admin capability.
## 9) Professional visitor/operator experience — 2026-11-22 architecture review (PLANNED)

**Decision:** Refine M01 without changing its technical model, 30 public/demo URL kinds, content authority or adding a production backend. Requirements in [Brief §11](01-RESEARCH-AND-BRIEF.md) are acceptance targets for **S10–S20 plus S14A**, not implemented software.

### 9.1 Shared presentation / page contracts

- Each `/{locale}/{page-kind}/` delivers meaningful server-readable **static HTML** with title, H1, logical heading hierarchy, breadcrumbs on inner page kinds, translated summaries, useful descriptions and **actual links only to existing route kinds**. On build, detect orphaned/dead links and ensure same-kind language alternates only where pages exist. No auth or public admin route.
- A small **component contract** (implemented with existing Node deterministic renderers, HTML and CSS custom properties, *not a new component framework*) should cover `ServiceCard`, `CaseNarrative`, `KitCard`, `FeatureSummary`, `ProcessSteps`, `FAQ`, `Breadcrumbs`, `DemoStatus`, `Empty/ErrorState` and `Action/CTA`. Reuse only on the second stable occurrence; no speculative registry or new design system service.
- **Service schema** extends existing six stable IDs only with content fields genuinely needed for scope/intent/process/deliverables/inclusions/exclusions and FAQ. **Concept case schema** extends existing three IDs for problem, approach, deliverable/visual artifact and learning labeled `DEMO`; no fake results or actual client claims. **Kit schema** extends existing six IDs for scope, demo-only specification and comparable attributes. All five locales must share required keys. Upgrade `schemaVersion` **only with a backward-compatible migration/test plan and explicit approval if data is durable**; do not bulk-rewrite the current JSON merely to implement a planning note.
- Proposed **guided brief simulator** is an anonymous, local-only state machine in Contact: typed synthetic selections, validation, summary output, reset and copy/download. Do not ask for/store/submit names, emails, phone numbers or real business data; no network call, no contact delivery claim. It is *not* a lead capture system.
- **Advanced polish** is driven by informative visual composition: useful original media, well-paced typography, intentful hover/focus states, low-motion microinteractions, consistent theme/tokens and a strong no-JS view. Optional same-origin cross-document View Transitions `@view-transition` only if browser support and reduced-motion/focus tests pass. No autoplay, mandatory 3D, scroll hijacking or new third-party JS.

### 9.2 Information architecture and acceptance boundaries

- **Keep exactly six page kinds:** Home, Services, Work, Catalog, Contact, Demo Checkout. Add **sections** inside these routes, not new public page families. Optional `404.html` and root chooser are ancillary, not counted among 30.
- **Service decision support:** clear navigation from Home to service scope/process, conceptual portfolio and an anonymous brief summary. No invented times/prices/testimonials. **Portfolio storytelling:** problem, design rationale, artifact, learning and media license per case; explicit concept badge in all locales.
- **Catalog decision support:** simple filters suitable for **six** items, descriptive details, clear reset/empty feedback; conditional comparison maximum 2–3 items only if testing reveals a real user need. Do not implement Elasticsearch, recommendation models, subscriptions, dynamic pricing, reviews or real checkout.
- **Error/offline states:** return a useful static 404 without leaking internal file paths; preserve HTML content/no-JS reading and static links when optional scripts fail; show honest zero-item and invalid-synthetic-input states. Do not install offline PWA/service worker for imagined future use.
- **Operator editing:** S14A local-only console is kept outside `site/`, with draft, provenance, validation, preview, diff and rollback. Its readiness checks include missing locale fields, demo labeling, absent alt/license, internal broken links, and unreviewed translation; public build and local editor never share an unauthenticated write endpoint.
- **Privacy/SEO:** keep demo `noindex` until approval and public deployment, and never insert fake ratings, `Offer`/Merchant `AggregateRating`, organization identity or fake customer claims into structured data. Only after a real public domain exists may S15 generate reciprocal absolute `hreflang`/canonical and truthful applicable schema. No automatic analytics or third-party trackers.

### 9.3 Risk, fallbacks and tool review

| Concern | Default | Failure mode + required test |
|---|---|---|
| Content schema | Existing JSON + deterministic Node | Missing locale/duplicate IDs → build blocked; no silent fallback to wrong language |
| Art/editorial | Original assets with credits; `alt=""` for purely decorative | Unlicensed media/irrelevant alt → publish blocked; manual S16/S19 audit |
| Service matching | Deterministic client-only demo with synthetic input | Invalid input/JS off → clear explanation, safe reset and no network |
| Experience motion | Native HTML/CSS with reduced-motion default respect | Unsupported View Transitions or high INP → immediate plain-navigation fallback |
| Local editor | Loopback-only draft, validation + rollback | Wrong Origin/Host/LAN request → denied; no public admin or secrets |
| Real services | No deployment, real identities, provider or commerce | Scope requested → separate proposal, cost/security/permission verification and approval |

### 9.4 Official and observed evidence

- [GOV.UK user needs](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs), [Google people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Baymard product-list UX](https://baymard.com/research/ecommerce-product-lists).
- [Instrument Work and its Eames case-study methodology](https://www.instrument.com/work/eames-institute/), [Pentagram Work browsing](https://www.pentagram.com/work/). **References only**, no copyright transfer or site cloning.
- [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API), [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), [W3C alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/), [web.dev INP](https://web.dev/articles/optimize-inp), [OWASP DOM XSS](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html), [Google misleading structured data](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

**Status: researched/specification only.** Existing S01–S09 PASS remains based on prior evidence; S10–S20 and S14A remain NOT STARTED. A stage may be checked only after its actual code, I/O, tests, observations and verified Git revision exist.

## 10) Resource-aware professional content-authoring pipeline (owner correction 2026-11-22)

**Clarification to earlier S04 minimal-runtime decision:** Pure native HTML/CSS/vanilla JS is the **published site/runtime architecture**, not a restriction on authoring tools. Professional design boards (Penpot/Figma when authorized), GIMP image editing, Blender offline modelling/rendering, Node generation, VS Code and browser QA can be composed to create original polished assets/UX. No React/WordPress/Vite/CMS/runtime WebGL dependency is created merely by using an offline production tool.

**Corrected memory principle:** On the 8GiB-installed laptop, Windows reported ~6020MiB usable and a new free snapshot of 1664MiB; user directs ~2048MiB **free before** heavy sessions. This is neither a universal work-stopping threshold after app start nor a prohibition on professional apps or beneficial concurrency. Monitor Windows RAM Available, committed/limit, pagefile, CPU/GPU and actual UI responsiveness while doing a representative professional render/design/test. Adjust samples, textures, cache, browser workers and process scheduling gradually. Keep VPN/remote access and unsaved documents safe. A successful version command for GIMP/Blender does NOT prove heavy scene performance, and the pagefile is not extra physical RAM.

**Authority and contracts remain unchanged:** `content/i18n.v1.json` is source for text; GitHub M01 branch for code; `site/` is static public output; any editable Penpot board, GIMP project or Blender scene is an *asset source/projection*, not a competing content authority. Save optional source artifacts with ownership/provenance and original licenses when approved. Generated visual imports must be tested for size/LCP/CLS/RTL/no-JS/reduced-motion and user-visible improvement. S14A local editor remains loopback-only with proper draft/backup/isolation.

**Decision gate:** No new purchases, permissions, installs or public deployment from this correction. Conditionally selected advanced-media combinations require before/after UX quality and stability tests, including QA **T30** in [05](05-QA-AND-HANDOFF.md). Existing S01–S10 historical PASS is unchanged; S11–S20 and S14A unstarted. Detailed resource policy authority: [parent tools §O](../../tools/REGISTRY.md) and [M01 selected tools §8](02-STACK-TOOLS-AND-MCP.md).

## 10) Production identity, member orders and separate admin contract — 2026-11-22 (PROPOSAL ONLY)

**Authority and scope:** The current 30 planned `/{locale}/{home,services,work,catalog,contact,demo-checkout}` routes and `content/i18n.v1.json` remain the M01 **demo** contract. **Production** needs real server-side sessions/authorization, persistent transactional DB, lawful email/SMS delivery, and payment provider before live customer authentication/commerce; it cannot be created by frontend-only state. No producer, credential, user record or new paid dependency has been activated. All new requirements are tracked as S12A + P00–P18 in the **existing canonical [03 roadmap](03-EXECUTION-ROADMAP.md)**.

### Customer journey and user identifier
- Step 1: register customer (email + phone + only minimum other data) with consent notice, never request unnecessary PII.
- Step 2: prove mailbox ownership via single-use expiring confirmation email link/code; mark `email_verified_at` server-side. This is **address confirmation, not NIST-compliant email out-of-band login MFA**.
- Step 3: prove mobile number via SMS code with bounded attempts, expiry, rate limits, international-format normalization and anti-enumeration; a failed/unavailable SMS keeps the account PENDING. Delivery is provider-dependent and may cost money.
- Step 4: after both checks, create `customer_id` immutable internal UUID plus unique `membership_code` opaque nonsequential **public reference**, not an access token. Associate every order by authoritative `owner_principal_id` FK, optionally snapshot the code. Never use a customer-supplied membership code to impersonate/read an order.
- Step 5: only authenticated, ACTIVE customer can create a **real** order; server recalculates price, currency and item availability. Order status transitions occur from verified PSP server events, never from a success page. Preserve association after contact changes; account recovery, suspension, export/deletion rights, payment dispute and refunds need tested workflows.

### Separate admin trust boundary
- No public admin signup. Admin/employee provisioned by approved invite, strong MFA (prefer phishing-resistant passkey/WebAuthn; TOTP fallback as justified), tightly scoped permissions and server-enforced deny-by-default. Privilege/phone/MFA changes require step-up, owner approval and tamper-aware audit.
- Admin UI/session isolated from customer UI/session: distinct path, preferably origin and cookie scope, short-lived server-verified session, independent role guards; `customer` cannot reach `/admin` APIs even with crafted request, modified JavaScript or guessed ID. Admin panel is **NOT** local-only S14A: S14A edits drafts on loopback and must never read orders/user secrets.
- For password-based auth, adaptive password hash (e.g. Argon2id) through vetted library, safe recovery, generic errors, rate limits; `Secure; HttpOnly; SameSite` session cookies, rotation/expiry/revocation, CSRF defense. No JWT in browser storage by default; never log OTP/password/tokens or expose them in repository.

### Security, payments, data governance
- Write-side DB is selected only after P01/P02 review. Backend validates resource ownership (`order.owner_principal_id == authenticated principal`), roles per action, idempotent order/payment event handling, server prices with integer minor currency unit and `UNIQUE(provider,event_id)`, outbox/retry/observability/restore. `DEMO_CREDIT` remains fake and can never flow into a real charge.
- Do not collect card numbers/CVV. Prefer approved hosted third-party checkout if eligible; check PCI scope and merchant country/legal conditions. Transaction proof requires verified signed webhook and authoritative provider status; no duplicate grants, no success redirect shortcut.
- Data protection and privacy by design: consent, minimal contact data, clear localized terms/refunds/delivery/privacy, jurisdiction/legal review, retention limits, access/export/delete and appropriate accounting-record exceptions, encryption/backup, sanitized logs and incident handling. URL/profile/receipt/admin private → noindex and access control; indexing flags do not replace authorization.
- Use WCAG 2.2 AA login guidance: proper autocomplete/password manager, pasteable OTP, accessible resend/timer, error summary/focus, touch 320–1920, RTL fa/ar, LTR en/tr/de, screen-reader and human test.
- Provider/cost gate: examine official Free tier, SMS per-message costs, email quota, backup, database, regional eligibility, overage, paid add-ons, KYC/settlement; **UNKNOWN = NO ACTIVATION**. Research references and checklist: [03 Production Track](03-EXECUTION-ROADMAP.md), [05 T31–T45](05-QA-AND-HANDOFF.md).

**Compatibility amendment:** Old statements in §6–§9 excluding backend/payment/login still apply **only to M01 DEMO**; they are superseded **for the new production goal** by this §10. Do not change existing demo behavior or claim a new real system before reviewed P00–P18 gates.

## 11) Infrastructure transport/authority/security contracts (2026-11-22 / PROPOSAL)

Read [03 / I00–I20](03-EXECUTION-ROADMAP.md) for provider quotes, official links, free quota, MCP visibility, registration guidance and independently checkable acceptance. The public static M01 demo remains source-compatible and private account/order features are **not implemented**.

- **Transport:** A DNS hostname, correctly routed domain or free preview subdomain, edge TLS, valid origin TLS (e.g. Cloudflare Full strict or host managed end-to-end), cookie scope/flags, secure origin for WebAuthn and explicit redirect/HSTS rollout are distinct requirements. `HTTPS on CDN` does not imply secure edge→origin, or a free registered domain.
- **Authority separation:** GitHub code/CI, selected DB principals/orders, selected identity engine verified sessions, payment provider signed result, email/SMS senders delivery status, selected runtime execution, local Notion rationale. No alternate second customer DB or unaudited provider events.
- **Secrets and permissions:** runtime-managed config, narrow service accounts, secret rotation/revocation, neither GitHub public source nor Browser/Notion/chat transcripts store secrets/OTP/customer PII. Host account permissions must not silently grant production data to optional MCP operators.
- **Reliability:** DB transactions + unique constraints, outbox durable retry/idempotency, health checks with realistic free idle/sleep limits, encrypted off-site backups and tested restore, error redaction, WAF/rate-limits and cost/spam alerting. Use a small first vertical before queue/cache/analytics services.
- **Legal/pricing:** merchant KYC, eligible account and destination countries, SMS delivery, PSP settlement/fees, invoices, GDPR/other applicable privacy, domain ownership and full production availability are NOT verified until P00/I00/I13. Free plan quotas alone do not authorize provider setup or represent 24×7 production commitment.
- **T46–T55:** measured DNS/HTTPS, host/API, DB/restore, messages, IAM, PSP, jobs/storage, monitoring/billing, staging/approval; T31–T45 remain end-to-end customer/admin/order requirements. Neither set has been run.
