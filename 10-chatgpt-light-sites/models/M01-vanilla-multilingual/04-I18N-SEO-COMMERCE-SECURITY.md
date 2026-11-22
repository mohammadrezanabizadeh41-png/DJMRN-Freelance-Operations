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
