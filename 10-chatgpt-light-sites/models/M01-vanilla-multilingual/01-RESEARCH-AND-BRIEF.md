# M01 — پژوهش بازار، انتخاب نمونه و Brief ساخت سایت حرفه‌ای
**Parent project:** DJMRN-CHATGPT-LIGHT-SITES-001 | **Model:** M01 «HTML + CSS + JavaScript خالص»  
**Researched:** 2026-11-21 | **State:** RESEARCHED / PROPOSAL — هیچ سایتی هنوز ساخته یا تست نشده است.  
**Scope boundary:** مدل 01 این پروژه؛ هیچ ربطی به Codex/Flower Valley، وب‌سایت 3D یا مدل 02 (Vite) ندارد.

## 1) تعریف دقیق M01
خروجی اجراشونده صرفاً استانداردهای وب **HTML5 معنایی + CSS مدرن + JavaScript بدون فریم‌ورک** است. هیچ React/Vue/Svelte، وردپرس/PHP، Vite/Astro یا دیتابیس به‌عنوان dependency لازم نیست. استفاده از Node.js موجود، Git، مرورگر، validator یا Playwright برای **تست/پیش‌نمایش** این ماهیت را تغییر نمی‌دهد؛ اگر روزی برای ۳۰+ فایل زبانی تولید قطعی HTML با یک script ساده لازم شود، artifact نهایی همچنان استاتیک خالص می‌ماند، مشروط به این‌که هیچ runtime سمت سرور در production نیاز نباشد.

### چه سایت‌هایی معمولاً با این مدل مناسب‌اند؟
| نوع سایت / سطح | تناسب M01 | مرز واقعی |
|---|---|---|
| Landing page / معرفی محصول / کمپین | عالی | CTA و لینک قابل اجرا، فرم صرفاً نمایشی یا سرویس مجاز |
| سایت شرکتی، خدمات حرفه‌ای و چندزبانه | عالی | محتوای هر زبان HTML indexable، لینک و URL مستقل |
| نمونه‌کار طراح/برنامه‌نویس و استودیو | عالی | پروژه‌ها و نتایج **واقعی یا صریحاً DEMO** |
| مجله یا بلاگ چندصفحه‌ای محدود | خوب | انتشارهای زیاد بعداً Astro/Eleventy/WordPress مناسب‌تر |
| کاتالوگ محصولات و خدمات + فیلتر | خوب | داده را می‌توان با JSON استاتیک یا HTML نگه داشت |
| سبد خرید آزمایشی و شبیه‌ساز پرداخت | خوب با برچسب DEMO | **هیچ سفارش/پرداخت واقعی** بدون server معتبر و PSP |
| فروشگاه واقعی با موجودی/کاربر/تراکنش | نامناسب به‌تنهایی | نیاز backend امن، durable state، auth/payment validation |
| پنل مشتری/حساب و داده شخصی | نامناسب به‌تنهایی | این امکانات باید در مدل M21 یا مشابه با security review پیاده شوند |

**حاصل تصمیم مهندسی:** سایت پنج‌زبانه معرفی «استودیوی خلاق خدمات دیجیتال» + بخش «کاتالوگ خدمات/محصولات دیجیتال» + «سبد و رسید نمایشی» بهترین برش برای نمایش توان طراحی، تجربه کاربری، محتوا، SEO، تعامل و مرز امن پرداخت است. یک نمونه، چند capability واقعی؛ بدون ادعای فروش یا مشتری واقعی.

## 2) پیشنهاد شخصیت/موضوع و مخاطب
**Working title (fictional demo):** «NOVA Atelier — Digital Services & Products» / «نووا آتلیه» (نام موقت؛ نیاز به بررسی حقوق برند پیش از انتشار). از نام کارفرمای واقعی، نتیجه پروژه انجام‌نشده، نظر مشتری ساختگی یا لوگوی دیگران استفاده نشود. برچسب DEMO / Portfolio Sample در زبان‌های مربوط واضح باشد.

**Audience:** مشتری کسب‌وکار کوچک یا شخص مستقل که می‌خواهد خدمات طراحی سایت، هویت بصری، ساخت محتوای دیجیتال و محصولات/قالب‌های نمایشی را ببیند. مسیر تصمیم: **Discover → Services → Proof/Samples → Catalog → Demo Cart/Inquiry**.

**Offer/content demo:**
- خدمات: وب‌سایت شرکتی، طراحی رابط، بهینه‌سازی عملکرد، بازبینی سئو و دسترس‌پذیری، محتوای دیجیتال (بدون تعهد تبلیغاتی جعلی)
- نمونه‌کار: ۳ concept case study صریحاً «نمونه مفهومی»، نه ادعای پروژه مشتری
- کاتالوگ: ۴–۶ بسته دیجیتال آزمایشی با قیمت‌های مصنوعی و **بدون امکان خرید واقعی**
- ارتباط: راه ارتباطی نمایشگاهی بدون پردازش اطلاعات شخصی؛ فرم نمایشی با تایید عدم ارسال داده یا `mailto:` پس از تایید مالک

## 3) پنج زبان — قرارداد محتوایی
| Language / locale | URL prefix | Direction | UI and locale considerations |
|---|---|---|---|
| فارسی `fa` | `/fa/` | RTL | فونت فارسی قانونی، عدد و مبلغ با formatter مناسب، جابه‌جایی صحیح آیکون جهت‌دار |
| English `en` | `/en/` | LTR | نسخه مرجع برای مقایسه و کلیدهای محتوا |
| العربية `ar` | `/ar/` | RTL | ترجمه مستقل از فارسی، تست `bdi` و اعداد/نام لاتین |
| Türkçe `tr` | `/tr/` | LTR | Unicode/حروف ترکی و متن بلندتر در منو |
| Deutsch `de` | `/de/` | LTR | متن بلند، ترکیب کلمات و شکست خط/استفاده از hyphenation قابل تست |

**Quality gate:** هر صفحه مهم در هر پنج زبان فایل HTML و محتوای معنی‌دار دارد. `<html lang="..." dir="...">`، title/meta/H1، alt، aria-label، جهت، منو و CTA ترجمه شده باشند؛ fallback با برچسب صادقانه، بدون ادعای ترجمه انسانی اگر بازبینی نشده است. هیچ auto-translation یا API هزینه‌دار بدون approval. `hreflang` متقابل و `x-default` فقط برای URLهای موجود و public.

## 4) طرح اولیه IA / صفحات
**Pages planned per language:** Home, Services, Portfolio, Catalog, Contact (5 public page kinds ×5 = 25 HTML entries). A Demo Checkout/Receipt page per language (=5 additional demo pages) is clearly DEMO and `noindex` if ever public. An optional product detail template can be added only after the base site works; do not pre-create 40 empty pages for hypothetical products.

**Navigation:** logo/home, services, work, catalog, contact, language switcher; mobile nav accessible and keyboard operable; breadcrumb where appropriate. Each locale's navigation routes to same language. Broken/absent translation links explicitly managed.

**Contact/inquiry:** no live PII-collecting form, email backend or spam service in this prototype; demonstrate UX validation on synthetic content only.

## 5) 2026 visual design directions — evidence vs decision
**External trend observation (not a guarantee of conversion):** Contemporary 2026 reporting features expressive/editorial typography, bento/informal grids, selective micro-interactions and stronger performance/accessibility emphasis. Examples: [Webflow 2026 trend editorial](https://webflow.com/blog/web-design-trends-2026), [Envato Elements 2026 trends](https://elements.envato.com/learn/web-design-trends), [Netguru 2026 adopt/test/skip](https://www.netguru.com/blog/modern-web-design-trends). These are editorials/opinions, not scientific proof; do NOT copy site layout/brand/assets from them.

**DJMRN design judgment (proposed):**
- **Expressive editorial minimalism:** warm off-white or deep navy background, one electric accent and strong typographic hierarchy. Quality through whitespace, grid and content, NOT heavy WebGL.
- **Bento-ish service grid:** controlled asymmetric CSS Grid cards, reading order remains semantic.
- **Signature visual:** one original vector/raster hero illustration plus an original abstract pattern; avoid large background videos and non-owned stock.
- **Micro-interactions that convey state:** card hover/focus, menu reveal, cart confirmation, gentle section entry. Always retain usability with `prefers-reduced-motion: reduce`.
- **Optional theme switch:** only if content and contrast tests justify. Avoid feature creep.
- **Container queries/CSS logical properties:** apply when they simplify layout; maintain fallback behavior.
- **View Transitions API:** progressive enhancement only if stable across target browsers, never required for navigation.
- **Typography:** self-hosted licensed **Vazirmatn** for Persian/Arabic and **Inter** for Latin if approved; native system stacks as zero-download fallback. Verify exact font artifact license and bundle size.

## 5A) الزامات دستگاه و نمایشگر — به‌روزرسانی 2026-11-21
**درخواست قطعی:** یک سایت با طراحی Fluid/Responsive مناسب **موبایل، تبلت و لپ‌تاپ/دسکتاپ**. لپ‌تاپ و دسکتاپ یک کلاس تجربه‌اند؛ صفحه عریض 1920 آزمون تکمیلی است. **سه سایت جداگانه ایجاد نمی‌شود**؛ در همه دستگاه‌ها همان ۵ زبان و همان قابلیت‌های services/portfolio/catalog/cart/demo checkout برقرار می‌ماند.

**نمای طراحی اولیه:** موبایل باریک/عریض (320–430px)، تبلت عمودی/افقی (600–1024px)، لپ‌تاپ/دسکتاپ (1024–1440px)؛ breakpointهای واقعی بر اساس شکستن محتوا مشخص می‌شوند نه این تقسیم‌های توصیفی. در منوی موبایل، فیلتر کاتالوگ، فرم‌ها و سبد خرید هیچ عملکردی فقط به hover وابسته نیست. RTL فارسی/عربی و LTR انگلیسی/ترکی/آلمانی در هر سه کلاس بررسی می‌شوند.

**ابزار کمینه:** CSS Grid/Flex, media/container queries, fluid `clamp()`, `srcset/sizes` و پیش‌نمایش مرورگر موجود؛ Playwright CLI و axe-core فقط در مرحله QA در صورت نیاز و مجوز. هیچ ابزار جدیدی صرفاً برای چندنمایشی بودن لازم نیست. **قواعد فنی واحد:** [04 Responsive Contract](04-I18N-SEO-COMMERCE-SECURITY.md)؛ [Roadmap S02–S20](03-EXECUTION-ROADMAP.md)؛ [Test T10](05-QA-AND-HANDOFF.md).

## 6) Explicit technical boundaries of the sample
- Demo checkout state machine `cart → confirm → simulated result` is never a real payment. Display permanent "DEMO — no money charged" in each language; no card input fields, no bank logos impersonation, no order submission.
- Client calculations are illustrative and mutable. Never take client totals as the source of truth in a production checkout.
- No stored customer name/phone/email/addresses, no analytics tracking or cookies. Optional cart persistence uses anonymous non-sensitive `sessionStorage` or `localStorage` with validated product IDs and bounded quantities, no PII.
- Original brand marks and SVG assets only; verify attribution/license for external icons/fonts before including them.
- Distinguish **SEO-ready structure** from actually indexed site: no real domain or public deployment exists. No fabricated FAQ ratings, Merchant Listing or fake reviews.

## 7) Alternatives reviewed / why not now
| Alternative | Pros | Why not for M01 |
|---|---|---|
| M02 Vite/Vanilla | simpler asset dev/build at scale | separate model 02 already catalogued; M01 should prove zero-framework code |
| Astro / Eleventy | good multi-page + language content automation | becomes another model; first prove 25 static HTML entries feasible |
| WordPress Playground | editorial CMS for nondevelopers | model 10, not plain HTML/JS |
| React/Svelte frontend | reusable stateful components | cost/dependency not justified for brochure/sample cart |
| GrapesJS/Penpot/WYSIWYG | editable visual design | use if human visual iterations prove need, not a default runtime |
| WooCommerce/hosted PSP | real commerce lifecycle | bank/payment/hosting/data/terms demand separate authorization and backend |
| 3D/Canvas-heavy hero | high visual spectacle | scope conflicts with light site and laptop RAM limits |

## 8) Decision and open items (not blockers to drafting research)
- **SELECTED FOR PLANNING:** Five-lingual services/portfolio + digital catalog DEMO, in pure HTML/CSS/JS.
- **UNVERIFIED:** physical assets/font files/licenses on laptop, real client brand rights, selected payment provider eligibility/cost, deploy hosting/region and target public domain.
- **USER INPUT NEEDED BEFORE FINAL ART:** final brand/look/business category may override the working concept; synthetic placeholder allowed for pilot.
- **NOT AUTHORIZED:** install packages, extra MCP, account linking, real payments, publication/merge or sending private PC data to providers.

## 9) Sources
- [Google: JavaScript SEO/developer guide](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [Google: Localized versions/hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [W3C: HTML RTL/bidi](https://www.w3.org/International/questions/qa-html-dir)
- [MDN: logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values)
- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion)
- [Google: structured-data quality](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [OWASP: frontend security](https://cheatsheetseries.owasp.org/cheatsheets/Web_Frontend_Security_Cheat_Sheet.html)
- [Webflow: 2026 design trends](https://webflow.com/blog/web-design-trends-2026)
- [Envato: 2026 design trends](https://elements.envato.com/learn/web-design-trends)

**Evidence rule:** these official and editorial links are research inputs; no claim of implementation or tested appearance yet.
