# M01 — پژوهش بازار، انتخاب نمونه و Brief ساخت سایت حرفه‌ای
**Parent project:** DJMRN-CHATGPT-LIGHT-SITES-001 | **Model:** M01 «HTML + CSS + JavaScript خالص»  
**Researched:** 2026-11-21 | **S02 brief baseline:** 2026-11-22 — COMPLETE for reversible demo specification. **No website HTML/CSS/JS built or tested**.  
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

## 2A) S02 — Brief اجرایی تثبیت‌شده برای نمونه M01 (نسخه 1.0)
**Stage status:** `S02 BRIEF BASELINE COMPLETE` — 2026-11-22. **Product specification is the working default, not final commercial/trademark/visual approval.** User explicitly authorized conducting S02 and previously specified M01 + five languages + three device classes + professional portfolio showcase. Final commercial identity, final visual design, owned real client data and public deployment are **NOT** approved.

### A. هویت و وعده ارزش نمونه‌کار
- **نام کاری/ساختگی:** **NOVA Atelier**؛ زیرعنوان: **Digital Services & Creative Products**. فقط نام **موقت نمونه نمایشی** است، نه ادعای ثبت شرکت/مالکیت برند. قبل از انتشار واقعی باید تداخل نام/دامنه/علائم تجاری بررسی و نام مالک تأیید شود.
- **نوع سایت:** نمونه حرفه‌ای خدمات دیجیتال + نمونه‌کار مفهومی + کاتالوگ بسته‌های دیجیتال با **سبد و رسید پرداخت کاملاً نمایشی**. موضوع تجارت واقعی/مشتری واقعی نیست.
- **مسئله مخاطب:** مشتری بالقوه می‌خواهد سریع بفهمد چه خدماتی عرضه می‌شود، کیفیت طراحی و مسیر انتخاب خدمات چگونه است و پیش از تماس چه اطلاعاتی لازم دارد.
- **ارزش نمایشی:** چندزبانه، سریع و قابل استفاده در موبایل/تبلت/دسکتاپ، خوانایی عالی RTL/LTR، ناوبری قابل فهم، قابلیت مرور نمونه‌ها، کاتالوگ فیلترپذیر و تجربه سبد خرید بدون تراکنش واقعی.
- **خروجی قابل عرضه:** سورس Git قابل بازبینی + پیش‌نمایش محلی + تست‌های مستند؛ **نه** قرارداد مشتری، وعده رتبه گوگل، سایت منتشرشده یا فروشگاه فعال.
- **لحن:** حرفه‌ای، روشن، صمیمیِ کنترل‌شده، غیراغراق‌آمیز؛ بدون «پرفروش‌ترین»، آمار رشد ساختگی یا رضایت‌نامه تقلبی.
- **معیار موفقیت S02:** یک خواننده جدید بتواند بدون تفسیر اضافه، برند نمایشی/مخاطب/خدمات/صفحات/CTA/زبان/نمایشگر/حد پرداخت و محدوده v1 را از همین سند استخراج کند.

### B. مخاطبان و نیازهای اصلی (Personas)
| مخاطب | نیاز/پرسش | اقدام مطلوب در UI | چیزی که در نمونه نشان می‌دهیم |
|---|---|---|---|
| کسب‌وکار کوچک/شرکتی | «برای معرفی خدماتم چه سایتی لازم است؟» | Services → Portfolio → Contact | ساختار خدمت، شفافیت فرایند، نمونه طراحی مفهومی، CTA درخواست مشاوره نمایشی |
| فریلنسر/استودیوی مستقل | «نمونه کار و برندم چطور حرفه‌ای نمایش داده شود؟» | Home → Work → Services | هویت بصری، صفحات نمونه‌کار، پاسخ‌گویی انواع نمایشگر |
| خریدار محصول/قالب دیجیتال (صرفاً آزمایشی) | «چطور در کاتالوگ پیدا و مقایسه کنم؟» | Catalog → Filter → Demo Cart → Demo Receipt | تعامل، state، فیلتر، جمع عددی نمونه، خطایابی و سبد شفاف |

**هدف اصلی:** نمایش مهارت ساخت یک سایت خدماتی حرفه‌ای و چندزبانه. **هدف ثانویه:** نمایش ظرفیت تعامل فروشگاهی **فقط در حالت demo**. هیچ مخاطب واقعی یا داده مشتری ادعا نشده است.

### C. خدمات، نمونه‌کار و اقلام کاتالوگ v1
**شش خدمت نمایشی (تایپ ثابت محتوا، بدون وعده قیمت/تحویل واقعی):**
1. طراحی سایت معرفی شرکت و خدمات
2. طراحی Landing Page و صفحه معرفی محصول
3. طراحی UI/UX و دسترس‌پذیری
4. بهینه‌سازی عملکرد و تجربه موبایل
5. بررسی فنی SEO و ساختار چندزبانه
6. هویت بصری سبک و محتوای دیجیتال

**سه مطالعه موردی:** `Concept 01 — Corporate Presence`، `Concept 02 — Creative Portfolio`، `Concept 03 — Digital Catalog`. هر سه در همه زبان‌ها با نشان **Concept / Demo** و شرح مسئله/راه‌حل فرضی ارائه می‌شوند. بدون تصویر پروژه واقعی دیگران، لوگوی مشتری جعلی، KPI ساختگی یا testimonial.

**شش آیتم کاتالوگ آزمایشی:** `Landing Kit`، `Company Site Kit`، `Portfolio Kit`، `Multilingual UI Kit`، `SEO Starter Audit`، `Performance Check Pack`. نام‌ها قابل ترجمه‌اند؛ هر آیتم ID پایدار، دسته، توضیح، برچسب DEMO و قیمت **کاملاً ساختگی به واحد آزمایشی** دارد؛ عدد و واحد نهایی در S05 به‌صورت fixture مشخص می‌شود. نمایش آن‌ها **پیشنهاد فروش واقعی** نیست.

### D. معماری صفحات و مسیرهای کاربر — Scope ثابت v1
| Page kind | هدف | عناصر ضروری | CTA اصلی |
|---|---|---|---|
| Home | بیان سریع هویت، ارزش و تجربه طراحی | Hero، خدمات منتخب، بخش Concept Work، دعوت به کاتالوگ | **مشاهده خدمات / Explore services** |
| Services | معرفی شش خدمت و شرایط نمایشی | کارت/جزئیات خدمت، چگونگی همکاری فرضی، پرسش‌های صادقانه | **دیدن نمونه‌ها / View work** |
| Work (Portfolio) | نمایش سه مطالعه موردی مفهومی | عنوان DEMO، خلاصه مسئله، توضیح تصمیم طراحی، تصویر/وکتور اصل | **دیدن کاتالوگ / Explore catalog** |
| Catalog | مرور و فیلتر شش محصول/بسته | فیلتر دسته، جست‌وجو، empty state، افزودن به سبد DEMO | **افزودن به سبد نمایشی / Add to demo cart** |
| Contact | معرفی راه ارتباطی و UX فرم امن | اطلاعات ارتباطی نمایشیِ واضح؛ فرم بدون ارسال، validation/feedback | **نمایش نتیجه فرم / Preview form response** |
| Demo Checkout | تمرین خرید بدون پول | خلاصه سبد، افزایش/کاهش، جمع مبلغ آزمایشی، پیام دائمی DEMO، رسید مصنوعی | **تأیید آزمایشی / Confirm demo** |

**فهرست خروجی:** ۵ نوع صفحه عمومی × ۵ زبان = **۲۵ HTML قابل خزش ساختاری**؛ یک نوع صفحه پرداخت نمایشی × ۵ زبان = **۵ HTML غیرقابل ایندکس**؛ صفحهٔ انتخاب زبان `/` و `404` فقط اگر لازم باشد. این تعداد **هدف ساخت آینده** است، نه فایل موجود در S02.

**سه مسیر کاربر اصلی:**
- `Home → Services → Work → Contact` برای مخاطب خدمات.
- `Home → Work → Catalog → Demo Cart → Mock Receipt` برای نمایش تعامل.
- `Any page → same page in other language → continue the task` با حفظ نوع صفحه و پیام‌های قابل فهم.

### E. پنج زبان، ترجمه و CTA پایه
| Locale | جهت | Home CTA اصلی (پیش‌نویس) | Label شفاف Demo |
|---|---|---|---|
| `fa` فارسی | RTL | مشاهده خدمات | نمونه نمایشی — هیچ پرداختی انجام نمی‌شود |
| `en` English | LTR | Explore services | Demo only — no payment is made |
| `ar` العربية | RTL | استكشف الخدمات | عرض تجريبي — لا تُجرى أي عملية دفع |
| `tr` Türkçe | LTR | Hizmetleri keşfedin | Yalnızca demo — ödeme yapılmaz |
| `de` Deutsch | LTR | Leistungen entdecken | Nur Demo — es erfolgt keine Zahlung |

**این عبارت‌ها draft ترجمه‌اند؛** صحت اصطلاحات و تجربه زبان‌مادری در S07 و S16 بازبینی می‌شوند. برای هر route محتوای معنایی مستقل، `lang`/`dir`، title/H1، متن CTA و alt لازم است. زبان منتخب با لینک‌های HTML قابل دسترس عوض می‌شود؛ محتوا نباید فقط با JS تزریق شود.

### F. الزام دستگاه و تعامل (ثابت در هر صفحه و زبان)
| کلاس | بازه مرجع عرض CSS | هدف UI | تست ورودی/حالت |
|---|---|---|---|
| موبایل | 320–430px | چیدمان یک‌ستونی، منوی لمسی، فرم و سبد بدون overflow | touch، keyboard، portrait و نمونه landscape |
| تبلت | 600–1024px | grid منعطف ۱–۲/۳ستونه، منوی مناسب عرض و لمس | touch/pen/keyboard، چرخش |
| لپ‌تاپ و دسکتاپ | 1024–1440px | ناوبری گسترده، محدودیت عرض خواندن و نمایش متعادل کارت‌ها | mouse و keyboard |
| مانیتور عریض (بررسی مکمل) | 1920px | max-width خوانا، کشیدگی کنترل‌شده | mouse/keyboard |

**یک codebase responsive و یک DOM معنایی برای هر locale/page**؛ breakpoint واقعی با S06 بر اساس محتوا تعیین می‌شود، نه نوع دستگاه. همه قابلیت‌ها در همه دستگاه‌ها حاضرند.

### G. محدوده عملکرد، امنیت، سئو و معیار پذیرش در نسخه اولیه
- **در محدوده:** صفحات پنج‌زبانه استاتیک، navigation/locale switching، CSS responsive، فیلتر و سبد نمایشی، رسید مصنوعی، metadata/hreflang/canonicalِ معتبر پس از تعیین URL، accessibility و تست مرورگر.
- **خارج از محدوده:** ثبت‌نام، ورود، دیتابیس، ارسال واقعی فرم، درگاه/کارت بانکی، webhook، فاکتور معتبر، تراکنش پولی، domain، انتشار عمومی، رهگیری تحلیلی و اتصال حساب حساس.
- **امنیت:** هیچ PAN/CVV/اطلاعات مشتری، راز، پرداخت یا درخواست پس‌زمینه به PSP. Demo Checkout دائماً برچسب واضح دارد؛ داده‌ها synthetic.
- **سئو:** ساختار قابل خزش و آماده بهینه‌سازی، اما بدون ادعای ایندکس شدن، رتبه یا نتیجه واقعی تا زمان انتشار و سنجش.
- **کیفیت:** ۵ زبان و ۳ کلاس دستگاه باید در تست نهایی عملکردی باشند؛ WCAG 2.2 AA هدف است، نه تضمین قبل از تست. Core Web Vitals/Lighthouse فقط بعد از اندازه‌گیری گزارش شوند.
- **نرم‌افزار:** مدل M01 = HTML/CSS/JS خالص، ابزارهای موجود Bridgerator + Git + Node/Playwright برای توسعه/تست؛ هیچ Vite/React/WordPress/Agent جدید و سرویس پولی در runtime.

### H. دروازه پذیرش S02 و مواردی که آگاهانه باز مانده‌اند
| شرط S02 | وضعیت | شواهد |
|---|---|---|
| انتخاب نوع پروژه و هویت آزمایشی | **DEFINED / PASS for working demo** | NOVA Atelier، نمونه ساختگی و مرزبندی حقوق برند |
| مخاطب و وعده ارزش | **DEFINED / PASS** | personas و مسیرها در B، C، D |
| خدمات، CTA و نقشه صفحات | **DEFINED / PASS** | شش خدمت، سه case، شش آیتم، شش نوع صفحه، CTA پنج‌زبانه |
| پنج زبان و RTL/LTR | **DEFINED / PASS** | fa/en/ar/tr/de و locale table |
| موبایل، تبلت و دسکتاپ | **DEFINED / PASS** | سه کلاس و input modes، responsive one-codebase |
| پرداخت/فرم/داده واقعی | **BOUNDARY VERIFIED / PASS** | mock-only، no personal data و no real PSP |
| تأیید دامنه اجرا توسط مالک | **USER-INSTRUCTED / PASS for S02 execution** | کاربر خواسته S02 را در پروژه M01 انجام دهیم؛ انتخاب‌های موضوع/صفحه برای طراحی نمونه و قابل برگشت‌اند |
| **تأیید نهایی نام تجاری/رنگ و ظاهر توسط مالک** | **PENDING — not required for reversible S02 prototype brief; gate at S06/S19** | نام NOVA موقت و قبل از استفاده عمومی/نهایی باید تأیید و از لحاظ حقوقی بررسی شود |
| **بازبینی کیفیت ترجمه انسانی** | **PENDING — S07/S16** | ترجمه‌ها پیش‌نویس هستند |

**S02 conclusion:** Brief نمونه **عملیاتی، سازگار با محدودیت‌ها و آماده S03** است، مشروط به حفظ برچسب DEMO و موقتی بودن برند. این مرحله به معنی تأیید حقوقی یا نهایی هویت تجاری نیست. هر تغییر کاربر در نام/خدمات/محصولات در همان brief اعمال می‌شود؛ بدون ساخت status file موازی.

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

## 10) S09 dashboard gap audit — addendum requested 2026-11-22 (PLANNED, not implemented)

**Finding from source and roadmap:** S01–S09 produced five localized Home documents with responsive public navigation. **There is no dashboard, admin/editor application, authenticated management account, CMS or database.** Public route plan remains exactly **5 languages × 6 page kinds = 30**; a private local editing console is **not** a seventh public page type or part of the five checkout URLs.

**New explicit owner requirement / M01 fit:** A professional M01 sample should demonstrate a **functional local content-management dashboard** for the fictional NOVA Atelier site. This shall be a **separate local-only authoring tool** (proposed S14A) with genuine draft read/edit/validate/preview/export/import/recovery, and **no separate framework, production API, live user registration or public credential**. It must look and function as a responsive management interface, while labeling any dashboard metrics as **content counts and test status only**. No invented clients, sales, traffic, revenue, payments, reviews or messages.

**Target operator journeys, distinct from public visitors:**
1. `Local editor → Overview → five-language coverage / missing-field indicators → choose locale and page → edit safe draft`.
2. `Local editor → Services / Concept Work / DEMO Catalog → change one synthetic item and its localized descriptions / categories / demo-credit label → validate schema → preview result`.
3. `Local editor → Assets / alt text / provenance → validate appropriate rights → preview mobile/tablet/desktop → save local draft safely`.
4. `Local editor → change summary / diff / quality gate → export or apply explicitly approved canonical JSON update → deterministic rebuild → local tests → Git commit and reversible rollback`. The canonical content authority stays `content/i18n.v1.json`; **a draft must not silently overwrite it**.

**Out of scope for M01:** Public `/admin`, fake login, user roles, account management, real order/inventory/CRM, payment processing, production analytics, online remote content mutation, cloud database, and GitHub OAuth by default. Genuine internet-accessible authenticated administration belongs to a separately justified CMS/full-stack choice (existing models M10/M15/M21, or optional Git-based CMS research), plus provider/cost/security/approval gate. Do not use browser-only hiding or localStorage to impersonate secure authorization.

**Acceptance linkage:** S14A must pass its local editor functional tests before M01's final DONE; S15–S18 include admin isolation, accessibility, mobile/tablet/desktop layout, draft validation and recovery; S19–S20 include independent operator instructions and an owner hands-on walkthrough. **S14A = NOT STARTED** at this research/update. This addendum does not retroactively change S02's original PASS or mark any product feature implemented.

**Canonical references:** [Decap CMS official Git backend](https://decapcms.org/docs/github-backend/), [OWASP authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), [MDN File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API), [GOV.UK Design System components](https://design-system.service.gov.uk/components/).
## 11) Comprehensive professional-completeness research for the NOVA Atelier model — 2026-11-22

**User request / research status:** Expand the professional sophistication of the **visitor-facing five-language service studio + authentic CONCEPT portfolio + six-item DEMO catalog** and the **local content-management experience**, while preserving M01's **static HTML/CSS/vanilla JS, one JSON content authority and no production backend**. This section is a researched requirement and decision matrix; **none of these newly added capabilities is implemented merely by recording it.**

### Verified facts, reasoned choices, and exclusions

- **Verified in current M01 S01–S09:** five localized Home routes + root chooser exist; shared semantic responsive navigation and no-JS language links pass recorded tests. Independent Services, Work, Catalog, Contact and DEMO Checkout routes, rich case narratives, guided brief and S14A operator dashboard are **NOT YET IMPLEMENTED**. The finished goal remains 25 public-language informational pages + five non-indexed fictional checkouts; no public site launch.
- **Independent comparison:** [Instrument Work](https://www.instrument.com/work/) uses clear Work/Services/Contact pathways and discipline categories; [Instrument Eames Institute case study](https://www.instrument.com/work/eames-institute/) presents narrative rationale, creative interaction, content authoring/preview and accessibility; [Pentagram Work](https://www.pentagram.com/work/) provides project browse/filter context. These are **experience patterns, not permission to copy layout, images, brand, proprietary code, analytics or customer claims**.
- **Independent guidance:** [GOV.UK user-needs service design](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs), [Google people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Baymard product-list filtering](https://baymard.com/research/ecommerce-product-lists), [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), [MDN MPA view transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API), [OWASP web frontend](https://cheatsheetseries.owasp.org/cheatsheets/Web_Frontend_Security_Cheat_Sheet.html). These support design/technical quality considerations, not proof that NOVA has implemented or measured them.

### Feature gap / action matrix: new or strengthened items only

| Priority | User's actual need | Specific NOVA Atelier deliverable / acceptance | Existing owner stage |
|---|---|---|---|
| **P0** | Understand the studio immediately | Hero with concise value, audience relevance, two differentiated CTAs, clear six-service grouping, **fictional concept status**, original editorial graphics; visible useful content with JS off; no meaningless hero animation | **S10** |
| **P0** | Know how an engagement would work | Clear scope, expected artifacts, input prerequisites, indicative **process phases without fabricated timelines/prices**, what is included/excluded and FAQ/objection handling; accessible internal links toward Work and Contact | **S11** |
| **P0** | Judge portfolio work credibly | Three **DEMO/Concept** case narratives with **problem → approach/design decision → artifact → learning**, original/legally sourced media and descriptive alt; no fake client, results, testimonial, KPI or completion date | **S11** |
| **P0** | Choose a suitable demo kit | Product details: purpose, target user, deliverables, inclusions/exclusions, DEMO credit units and unambiguous fictional nature; lightweight text search / category filter / result count / reset / no-results; progressive native HTML fallback | **S12** |
| **P0** | Test a complete demo purchasing interaction | 6-kit cart with quantity, guarded totals, review/edit/back/reset, mock receipt and persistent multilingual **NO PAYMENT** message; absolutely no PSP, card entry, order database or PII | **S13** |
| **P0** | Understand how to request a service | Short **local-only guided project-brief simulator** using **non-personal synthetic selections**: choose service, objective, scope and see editable summary/copy or download; clear "not submitted" state, validation/errors, optional safe reset. No name/email/phone or network request | **S14** |
| **P0** | Feel trust without deception | Compact **method / collaboration process / project scope / FAQ / site demo identity** integrated into **existing** Home/Services/Contact routes; honest privacy/terms notices, explicit fictional brand and no customer impersonation | **S10/S11/S14** |
| **P0** | Keep the site professionally editable | Local-only real content studio from **S14A**: structured editor, multilingual completion heatmap, draft diff, preview, safe asset/alt/license checks, validation, publish proposal, backup/rollback; no fake traffic/sales or fake login | **S14A** |
| **P0** | Every visitor can find the next step | Meaningful header/footer crosslinks, **contextual breadcrumbs on deeper existing page kinds**, descriptive CTA, 404 not-found with available languages, native keyboard/focus, clearly actionable empty/error states | **S10–S16** |
| **P0** | Consistent five-language experience | Reusable content component contracts and same-kind locale switch for the complete 30-route plan; per-locale length/RTL/bidi, content parity/translation drift, no browser-only translation, human linguistic signoff before public use | **S11–S16; S14A** |
| **P0** | High-quality UI on affordable hardware | One original design system, typography hierarchy, restrained imagery/motion, reusable CSS states, accessible interactions and measured performance (INP/LCP/CLS laboratory evidence, not invented field data) | **S10/S16/S17/S18** |
| **P0** | Trustworthy technical handoff | Deterministic content build, link crawl, per-locale metadata and reciprocal hreflang **only when real URLs exist**, accessibility and security regression, performance evidence, clean Git and deployment approvals separated | **S15–S20** |
| **P1 conditional** | Compare a few fictional packages | A **two-or-three-item comparison** of existing six products if users cannot distinguish bundles in usability tests; no new backend, no recommendation AI or multi-filter engine | **S12**, only after P0 filtering works |
| **P1 conditional** | Add premium but respectful motion | Subtle CSS micro-interactions, optional cross-document `@view-transition` with feature support and `prefers-reduced-motion` / no-JS fallback; preserve focus, scroll and performance | **S10/S17**, measured before adoption |
| **P1 conditional** | Offer more detail without new pages | Native `<details>/<summary>` FAQs, a lightweight conceptual artifact preview or before/after *design iterations* **labeled fictional**, not fake measured business outcomes | **S11/S14**, if useful |
| **P1 conditional** | Convenience for return visits | Explicit reset for **fictional** cart/filter in anonymous browser; avoid offline caching/service workers and persistence for personal contact data by default | **S12/S13**, only if tests justify |
| **DEFER / new approval** | Real client account, online multiuser admin, sales/inventory/CRM, payment, live contact, booked consultations, analytics/tracking, chatbots/AI agents, newsletter, PWA offline sync or hosted CMS | Requires **real business use case**, separate security/data/cost/provider proposal and owner approval; belongs in an appropriately selected M10/M15/M21/M22 or alternative, **not an automatic M01 dependency** | **After S20 decision**, not M01 DONE |

### End-to-end proof of professional completeness

**Visitor paths:** (A) `Home → Services → scope/process/FAQ → Work concept → guided brief (local) → copy summary`; (B) `Home → Work narrative → Catalog detail/filter → DEMO cart → mock receipt → reset`; (C) `Any real page → same page kind in other locale → task remains navigable`. The additional process/FAQ/brief functions are **embedded in existing page kinds**; do **not** add 5× extra route types or new business identities.

**Operator path:** `S14A loopback editor → Overview → locale/page/asset readiness → safe draft edit → validation → preview/diff → explicit local build proposal → reproducible tests → approved Git update or rollback`. Public page content stays from `content/i18n.v1.json`. A local content studio is **not** a remotely authenticated CMS.

**Evidence quality:** P0 additions must be implemented in later stages with testable real I/O, screenshots, mobile/tablet/desktop and 5-locale QA. Research findings, attractive stills, and component-code existence alone **never** qualify as stage PASS. Test failure blocks acceptance; no invented commercial outcomes, keyword stuffing, external analytics or unnecessary plugin installation.

**Cost/security/reversibility:** Existing Node/browser/Git/vanilla stack first, no new paid or unknown-cost provider. The source does not change outside the dedicated M01 branch. The user may later approve separate full-stack capabilities; until then, maintain the original security and fictional demo constraints.

## 12) New owner-required REAL website scope — distinct member and admin auth (2026-11-22)

**Previous brief preserved as the M01 prototype baseline:** NOVA Atelier's existing six demonstration page kinds × five languages and S01–S12 PASS describe a fictional studio and `DEMO_CREDIT` kits with no payment or PII. The owner has now explicitly added a second, **production-operational** outcome: customer membership with independently confirmed mailbox + mobile, durable membership code, subsequent purchases/orders bound to the account, and an isolated professionally secured administrator login/dashboard. Thus old “real auth/commerce permanently excluded” decisions are superseded **only for the future production layer**.

**Two actors, separate journeys:**
- **Customer:** discover kits/services as guest → register → verify email (ownership of address, not auth second factor) → verify phone by delivered single-use SMS → receive distinct membership code → log in to active profile → buy using selected PSP → order linked internally to immutable customer principal → track receipt/fulfillment/refund/recovery. Member code is not a password, session credential or authorization boundary.
- **Admin/staff:** no public registration. Invited role → secure login/passkey-MFA → limited server-enforced admin console → real customer/order/catalog and transactional operations with audit; invite/role/refund sensitive actions require step-up. Content Studio S14A only edits local draft and is not a substitute for this console.

**Definition of a working real site** (not a mockup): persistently verified user identity; successful real email/SMS challenge via legally available approved provider; durable membership/role/order relations; correct server-side access checks; signed payment confirmation, idempotent order and delivery effects; customer self-service and admin logs; safe recovery, privacy, refund, backups, monitoring, accessibility, and authenticated-domain security E2E. A fake client PIN, client-side role, localStorage customer registry, screenshots, demo receipts or unverified service credit cannot meet these criteria.

**System choice is still gated:** Retain original HTML/CSS/vanilla JS UX if possible, add one modular server/API with durable DB and adapters after S12A/P00–P03 risk/cost/provider selection. The decision whether live merchant eligibility/phone delivery is available to this project's owner and customers is **UNVERIFIED**; no vendor is committed. Site production build cannot be considered DONE without legal/merchant/region and end-to-end verification; all expenses/installations/migrations/secret operations require explicit approval.

**New gap inventory:** missing password/passkey/session recovery, email/SMS resend/abuse/rate limits, immutable member ID, distinct admin roles and backend authorization, live product/price/tax/currency, inventory and delivery, order/refund/chargeback, privacy/consent, terms/support, events/notification outbox, backup, incident response, accessibility of login/OTP, signed PSP webhooks and actual monitoring. These are mapped to S12A and **P00–P18 in [03](03-EXECUTION-ROADMAP.md)** and acceptance **T31–T45 in [05](05-QA-AND-HANDOFF.md)**, not silently added to already-passed DEMO S01–S12.

**Priority:** this isn't an optional complexity trim. Complete scoping, dependencies and test gates are mandatory for the desired real site even if implementation needs more infrastructure than M01. Keeping the simpler demo runnable and building the minimum real backend vertical avoids unnecessary framework rewrites, not needed functionality. Owner acceptance/deployment is a distinct future gate.

## 13) Real-site infrastructure completeness and ownership (2026-11-22)

The owner additionally requires that **all necessary supporting infrastructure** be discovered explicitly—not skipped for weight or complexity—and mapped to available connected MCP plugins or official service signup when no plugin exists. The current M01 remains its own project/branch. Infrastructure is separated into 21 individually checkable gates **I00–I20** with free-provider candidates, limits, failure modes and formal cost/security/region approval in the [single canonical roadmap](03-EXECUTION-ROADMAP.md).

The discovered classes include business jurisdiction and identity, domain/DNS/CDN/TLS, API runtime, secrets/IAM/CI, transactional database and restore, transactional email and verification DNS, legal SMS verification, customer/admin auth, merchant payments, durable order and fulfillment, private files, outbox/retry, WAF/rate limits, monitoring and billing, legal/privacy, staging and approved launch. These are not necessarily 21 different SaaS providers. Existing connected Supabase/Neon/Render/Railway/GitHub tools can manage selected portions; Cloudflare/Brevo/Resend/Twilio/monitoring may be enrolled via their official sites if verified and explicitly approved.

**Free-first distinction:** local mock integration is free to test but not equal to live SMS/email/payment; production merchant payout, account geography, domain fee, overage, operational backups and 24/7 reliability can block a zero-budget launch. No hosted infrastructure or account was provisioned in this planning-only update.
