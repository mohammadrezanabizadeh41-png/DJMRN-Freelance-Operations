# M01 — نقشه راه اجرایی ترتیبی ساخت نمونه پنج‌زبانه
**Status:** S01–S07 **PASS (environment + brief + UX research + architecture + IA + design + draft five-language content QA)**; S08–S20 **NOT STARTED**; no actual website code has been built or tested. Human linguistic review remains pending for publication.  
**Source:** [01 Brief](01-RESEARCH-AND-BRIEF.md) · [02 Tools](02-STACK-TOOLS-AND-MCP.md) · [04 Cross-cutting contracts](04-I18N-SEO-COMMERCE-SECURITY.md) · [05 Acceptance](05-QA-AND-HANDOFF.md).  
**Parent build checklist:** [M01 of 22](../../05-MODEL-BUILD-CHECKLIST.md). The parent M01 must remain unchecked until real acceptance.

## قوانین اجرا
- مراحل به‌ترتیب `S01 → S20`؛ در هر turn کوچک‌ترین مرحله مجاز را انجام بده، سپس خروجی و **نتیجه TEST/FAIL/NOT TESTED** را اعلام کن. هیچ تیکی بدون فایل، تست و شواهد عملی نزن.
- **روال ثبت مورد تأیید کاربر از 2026-11-21:** پس از اجرای هر مرحله، فقط **همان checkbox در همین سند** در شاخه M01 به‌روزرسانی و در GitHub commit شود؛ اقدام، زمان، ابزار، خروجی، آزمون و PASS/FAIL/BLOCKED، محدودیت‌ها و اقدام بعد زیر همان مرحله نوشته شود. PASS با `[x]` و شواهد؛ FAIL/BLOCKED بدون تیک همراه شرح علت. SHA commit در پاسخ داده شود. هیچ فایل پیشرفت موازی ساخته نشود. چک‌باکس M01 در کارتابل ۲۲ مدل والد تا پایان کامل سایت همچنان خالی است.
- هر مرحله شامل ورودی‌های تاییدشده، file(s)/output، test و مسئله بازگشت‌پذیری است. در صورت کمبود ورودی واقعی، از fixture ساده و صریح استفاده کن؛ به ساخت Agent یا dependency جدید فرار نکن.
- GitHub فقط در شاخه `project/light-sites-m01-vanilla-20261121` و زیر `10-chatgpt-light-sites/models/M01-vanilla-multilingual/`. مسیرهای اصلی/3D ممنوع.
- نوشته‌های پژوهش و برنامه = اماده‌سازی، **نه** build؛ هر نصب جدید/اتصال MCP/هزینه/انتشار/تغییر Production/خدمات پرداخت نیازمند approval جداگانه.
- مراحل بنیادین سایت مستقل از Codex، از طریق GPT-6 + Bridgerator + ابزارهای deterministic محلی انجام شود.
- کنترل پروژه در **همین فایل** است؛ تیک‌ها و لینک evidence زیر هر مرحله، **نه ایجاد وضعیت روزانه موازی**. کاتالوگ ۲۲ مدل در پروژه مادر وضعیت final را دارد.

## قرارداد سراسری واکنش‌گرایی — موبایل، تبلت، لپ‌تاپ و دسکتاپ
این **الزام افقی تمام S02–S20** است، نه یک پروژه جدید یا افزونه‌ای که فقط در پایان بررسی شود. **یک HTML/DOM معنایی برای هر صفحه/زبان** با CSS fluid و حداقل breakpointهای مبتنی بر محتوا؛ mobile-first، `<meta name="viewport" content="width=device-width, initial-scale=1">`، Grid/Flexbox و در صورت نیاز Container Queries. هیچ وابستگی Vite/React/WordPress اضافه نمی‌شود.

| کلاس نمایش (هدف UX) | نمونه عرض تست CSS px | رفتار طراحی مورد انتظار | ورودی‌ها |
|---|---|---|---|
| موبایل (باریک و عریض) | **320، 360، 390، 430** | یک ستون اصلی، دکمه/ناوبری قابل لمس، فرم و cart بدون overflow؛ منوی موبایل قابل استفاده | touch و keyboard/assistive |
| تبلت portrait/landscape | **600، 768، 820، 1024** | ۱–۲ یا ۳ ستون برحسب محتوا، navigation و کارت‌ها مناسب لمس؛ چرخش بدون گم‌شدن state | touch، قلم، keyboard اختیاری |
| لپ‌تاپ و دسکتاپ | **1024، 1280، 1440** | navigation کامل متناسب عرض، layout چندستونی با سقف عرض خواندن؛ hover به‌عنوان enhancement نه تنها راه تعامل | mouse، keyboard، touch hybrid |
| صفحه عریض (تکمیلی، نه خانواده مستقل) | **1920** | محتوا با `max-width` خوانا بماند، فضا به حاشیه/تصویر مناسب اختصاص یابد، اجزا بی‌دلیل کشیده نشوند | mouse/keyboard |

*این اعداد **نقاط نمونه‌برداری برای آزمون** هستند، نه breakpoints اجباری یا تضمین رفتار مدل خاص گوشی/تبلت. breakpoint واقعی از جایی که محتوا می‌شکند در S06 تعیین می‌شود؛ می‌تواند در `rem` و با `clamp()`، `minmax()` و `auto-fit` پیاده شود. تبلت افقی و لپ‌تاپ کوچک ممکن است عرض یکسان داشته باشند؛ سایت به **viewport و قابلیت ورودی** واکنش نشان می‌دهد نه user agent.*

**خروجی هر مرحله از S08:** در نمونه HTML واقعی، حداقل snapshot/تست عرض 390 (موبایل)، 820 (تبلت)، 1366/1440 (لپ‌تاپ/دسکتاپ). در S18 ماتریس کامل اجرا شود؛ RTL فارسی/عربی، LTR انگلیسی/ترکی/آلمانی با طول رشته متفاوت، portrait/landscape، zoom، صفحه‌کلید و touch تست شوند. ساختار و محتوای سایت برای هر دستگاه واحد می‌ماند.

**معیار توقف:** هر horizontal overflow ناخواسته، محتوای حذف‌شده، دکمه غیرقابل‌دسترس، شکست language switcher، سبد خرید unusable، اجزای فقط-hover یا ترتیب خواندن نادرست در هر کلاس نمایش = مرحله FAIL. موارد carousel/tables که ماهیتاً نیازمند اسکرول افقی هستند باید فقط درون container مشخص، accessible و با کنترل دیده‌شونده باشند.

**مبنای منابع:** [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) · [web.dev Breakpoints](https://web.dev/learn/design/media-queries) · [W3C WCAG 2.2 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html). جزئیات فنی در [04-I18N-SEO-COMMERCE-SECURITY.md](04-I18N-SEO-COMMERCE-SECURITY.md) و تست‌ها در [05-QA-AND-HANDOFF.md](05-QA-AND-HANDOFF.md).

## کارتابل ۲۰ مرحله‌ای — تیک پس از اثبات معیار قبول

- [x] **S01 — تأیید مبنا، دسترسی و جداسازی**
  - **کار:** تطبیق شاخه Git و مسیر مستقل پروژه با RAM، Node/Git/VS Code، مرورگرها و تست viewport.
  - **ابزار/نقش:** Bridgerator + PowerShell + Git؛ Playwright Test + Edge برای smoke test پیش‌نیاز.
  - **نتیجه و زمان:** **PASS** — 2026-11-21، حدود 23:50 به ساعت دستگاه؛ شواهد در اجرای همان روز جمع‌آوری شدند و به درخواست صریح کاربر در GitHub ثبت شدند.
  - **ایزوله‌سازی:** پروژه محلی `C:\Users\Mrn7206\Desktop\DJMRN-LightSites-M01`؛ branch `project/light-sites-m01-vanilla-20261121`، HEAD زمان آزمون `18d37653ad70f6641151763d8665c9b82bf63440`، `git status --porcelain` خالی، sparse checkout فقط پوشه `10-chatgpt-light-sites/models/M01-vanilla-multilingual`؛ ۶ سند موجود، `09-self-marketing-website` در checkout وجود ندارد.
  - **ابزارهای تأییدشده:** Bridgerator online `DJMRN-LAPTOP`، Node `v24.22.1`، npm `11.19.1`، Git `2.55.0.windows.5`، Python `3.14.7`، VS Code CLI، Edge `158.0.4370.33`، Chrome `157.0.8103.79`. ابزار QA جدا: `C:\Users\Mrn7206\Desktop\DJMRN-LightSites-M01-Prep\qa` شامل Playwright، axe-core، html-validate و prettier.
  - **آزمون مرورگر:** اجرای `node .\preflight.cjs` در محیط QA با Playwright + Edge: موبایل `390→390`، تبلت `820→820`، دسکتاپ `1366→1366`، خروجی `BROWSER_SMOKE_EXIT=0` → **PASS**. این فقط تأیید launch/viewport است؛ هنوز سایت واقعی M01 ساخته یا آزمایش نشده است.
  - **پایداری و منابع:** RAM فیزیکی `8192 MiB`، قابل‌مشاهده برای ویندوز `6020 MiB` (علت اختلاف قطعی نیست)، آزاد زمان آزمون `593–857 MiB`، فضای آزاد C حدود `87.6 GiB`؛ پورت‌های محلی `4173`، `3000` و `8080` در بررسی listener نداشتند. یک مرورگر آزمایشی و یک server محلی، بدون Docker و مصرف سنگین موازی.
  - **قبولی:** اتصال Bridge/Git/Node/Browser، شبیه‌سازی ۳ viewport، RAM/port و ایزوله‌سازی پروژه تأیید شد؛ فایل‌های Codex/09 تغییر نکردند.
  - **شواهد/محدودیت:** نتایج PowerShell و smoke در گفتگوی اجرای S01 گزارش شده‌اند، هیچ screenshot محصول یا آزمون ۵ زبان انجام نشده؛ نصب/تغییر مجوز جدیدی در خود S01 انجام نشد. برگشت با revert همین commit سند امکان‌پذیر است.
  - **مرحله بعد:** `S02 — NOT STARTED`. قبل از نوشتن سورس روی لپ‌تاپ، شاخه local به HEAD جدید GitHub fast-forward شود.

- [x] **S02 — Brief کاربردی و مشتری فرضی**
  - **کار انجام‌شده:** تثبیت Brief اجرایی v1 برای مدل M01: سایت حرفه‌ای نمونه‌کار با برند نمایشی **NOVA Atelier**، خدمات دیجیتال و UI، سه مطالعه موردی مفهومی، کاتالوگ ۶ بسته دیجیتال و جریان پرداخت کاملاً آزمایشی. برند **موقت و قابل تعویض** است؛ حقوق نام تجاری/دامنه و هویت تجاری قطعی تأیید نشده‌اند.
  - **ابزار و منبع:** GPT-6 + سند موجود [01-RESEARCH-AND-BRIEF.md](01-RESEARCH-AND-BRIEF.md) (بخش جدید **2A — S02**)، نیازهای قبلاً تعیین‌شده کاربر، GitHub برای منبع کد.
  - **مخاطبان و مسیرها:** کسب‌وکار کوچک، شرکت/فریلنسر و مخاطب کاتالوگ نمایشی؛ سه مسیر `Home→Services→Work→Contact`، `Home→Work→Catalog→Demo Cart→Mock Receipt` و `Same page→Other language`. CTA اصلی «مشاهده خدمات / Explore services»، CTA ثانویه نمونه‌کار و کاتالوگ.
  - **دامنه صفحات:** `Home / Services / Work / Catalog / Contact` در **۵ زبان = هدف ۲۵ صفحه عمومی HTML**، `Demo Checkout` در ۵ زبان = هدف ۵ صفحه noindex. این‌ها **طرح هستند، نه فایل‌های ساخته‌شده**.
  - **قرارداد زبان و نمایش:** `fa/ar` راست‌به‌چپ، `en/tr/de` چپ‌به‌راست؛ یک codebase HTML/CSS/JS خالص برای موبایل `320–430px`، تبلت `600–1024px` و لپ‌تاپ/دسکتاپ `1024–1440px`، صفحه عریض `1920px` فقط آزمون تکمیلی. لمس، کیبورد، موس و تغییر جهت دستگاه در برنامه تست هستند.
  - **حدود و ریسک‌ها:** شش خدمت، سه Concept Case Study و شش آیتم DEMO در Brief تعریف شدند؛ بدون داده مشتری، حساب، فرم ارسال واقعی، پرداخت/درگاه بانکی حقیقی، analytics، انتشار یا هزینه. شعار، CTA و پیام «پرداختی انجام نمی‌شود» در پنج زبان به‌صورت **پیش‌نویس** ثبت شد؛ بررسی کیفیت ترجمه در `S07/S16` است.
  - **نتیجه آزمون مرحله:** **PASS — تست سازگاری و کامل‌بودن سند**: ۱۸ نشانه موردنیاز Brief (نام، مخاطب، خدمات، صفحات، CTA، ۵ locale، ۳ کلاس دستگاه، حدود DEMO و دروازه پذیرش) بررسی شدند؛ مورد مفقود **صفر**. همچنین ۵ ردیف locale و بسته‌بودن S01 و بازبودن S02 پیش از ثبت تأیید شد. **تست اجرایی سایت: NOT TESTED (هنوز کدی ساخته نشده).**
  - **پذیرش مالک:** کاربر اجرای S02 و الزامات M01/پنج زبان/سه کلاس دستگاه را صریحاً خواسته است؛ **انتخاب برند نمایشی، رنگ نهایی، متن ترجمه‌ها و هویت تجاری واقعی از جانب مالک جداگانه تأیید نشده‌اند** و در S06/S07 و قبل از انتشار باید بررسی شوند. این شرط مانع تأیید *Brief موقت و برگشت‌پذیر برای نمونه‌کار* نیست.
  - **خروجی و شواهد:** [Brief ثبت‌شده](01-RESEARCH-AND-BRIEF.md)، commit تعریف Brief: `9b047a3e1ce96d309f997adfc052469b037312ce`؛ نتیجه `PASS` برای S02 در همین کارتابل. بدون نصب/اتصال جدید و بدون تغییر 09/Codex.
  - **مرحله بعد در زمان ثبت S02:** S03 پژوهش نمونه‌های مرجع بود و اکنون در همان کارتابل به حالت PASS رسیده است؛ پس از آن S04 آغاز می‌شود. بازگشت/اصلاح Brief از طریق Git commit قابل ردگیری است.

- [x] **S03 — مرور رقبا/الگوهای طراحی روز**
  - **کار:** مقایسهٔ منابع حرفه‌ای مرتبط با **NOVA Atelier** در سه viewport و سنجش ناوبری، گالری، کاتالوگ، حقوق دارایی و قابلیت انتقال الگو به HTML/CSS/JS بدون کپی. **زمان تکمیل پژوهش/آزمون:** 2026-11-22. **وضعیت S03: PASS (research/reference acceptance)**؛ این قبولی به معنی ساخت سایت یا تأیید QA نهایی M01 نیست.
  - **مبنای S01/S02:** محیط مستقل `C:\Users\Mrn7206\Desktop\DJMRN-LightSites-M01`، QA موجود در `C:\Users\Mrn7206\Desktop\DJMRN-LightSites-M01-Prep\qa`، پنچ زبان `fa/ar RTL`, `en/tr/de LTR`، شش خدمت، سه Concept/Demo case، شش بستهٔ DEMO، ۲۵ صفحهٔ عمومی + ۵ checkout نمایشی `noindex` **فقط هدف آینده**. هیچ سایت واقعی، درگاه، دیتابیس، نصب تازه یا استقرار ساخته نشد.
  - **روش آزمون واقعی (نه صرفاً تئوری):** Bridgerator → PowerShell → Playwright موجود → Edge headless، یک مرورگر و فقط URLهای عمومی؛ `page.goto(waitUntil: 'commit')`، اندازه‌های 390×844، 820×900 و 1366×768 CSS px، ثبت `HTTP`، `documentElement.scrollWidth`، nav/headings/buttons/cardRect و screenshot در فایل محلی. در تلاش نخست همه URLها با پراکسی پیش‌فرض مرورگر timeout شدند؛ راه‌حل فقط برای فرایند Edge آزمایشی `--no-proxy-server` بود، **بدون دستکاری پراکسی سیستم/VPN**. مسیر HTTPS با `curl` پاسخ 200 داشت. بدون login/cookie accept/payment و بدون انتقال asset به GitHub.
  - **نتیجهٔ مرور پنج مرجع، ۱۵ viewport — HTTP 200 همه، بدون سرریز افقیِ سراسری در عرض‌های نمونه؛ نام‌گذاری هر screenshot: `<slug>-<device>-<width>.png`:**

    | مرجع رسمی | موبایل 390 | تبلت 820 | دسکتاپ 1366 | الگوی قابل اقتباس/خطر |
    |---|---|---|---|---|
    | [Instrument](https://www.instrument.com/) | nav به `Open Menu` فشرده | `Work / Services / Contact` در nav | منوی گسترده‌تر + Work/Services | hierarchy خدمات→نمونه‌کار→تماس؛ ویدئو و assets برند وارد M01 نشوند |
    | [Pentagram Work](https://www.pentagram.com/work/) | `Toggle menu`، بررسی باز شدن nav با کلیک | نمونه کارت‌ها حدود دو ستون در نمای مشاهده‌شده | نمونه کارت‌ها حدود سه ستون | ۳ Concept case + دسته‌بندی ساده به‌جای فیلتربندی سنگین |
    | [Framer Marketplace Templates](https://www.framer.com/marketplace/templates/) | دسته‌ها و حدود دو ستون کارت در نمونه DOM/تصویر، `Open filters` | حدود سه ستون کارت | حدود چهار ستون کارت | navigation دسته‌ها + فیلتر discoverable؛ استفاده از طرح/تم تجاری ممنوع |
    | [Framer Product Listing Page](https://www.framer.com/marketplace/components/product-listing-page/) | صفحه معرفی component واکنش‌گرا، نه خود ویترین | منوی Marketplace گسترده‌تر | معرفی و CTA `Show Preview` | ارجاع به دموی زنده؛ component **$6 / Single-Use** و بدون خرید/کپی |
    | [Stripe Checkout](https://stripe.com/payments/checkout) | navigation بازاریابی فشرده | چینش بازاریابی responsive | navigation گسترده Products/Solutions | فقط سلسله‌مراتب خلاصه سفارش و تجربه mobile؛ **این تست خودِ checkout پرداختی نیست** |

  - **آزمون اضافی کاتالوگ واقعی (نمایشیِ مرجع):** [Product Listing Preview](https://productlistingpage.framer.website/) با HTTP 200، در 390/820/1366 CSS px و **سه screenshot مستقل**؛ ۹ کارت محصول در DOM. تصویر اولیه پیش از تکمیل hydration/render، grid را سفید/نامرئی نشان می‌داد و معیار قابل اتکا نبود. بعد از انتظار ۵ ثانیه و بازبینی بصری، در موبایل sidebar بالای grid و کارت‌ها به‌صورت یک‌ستونی با عرض حدود 358px و در دسکتاپ sidebar کنار grid سه‌ستونی با کارت‌های حدود 347px مشاهده شد؛ **هیچ قابلیت در M01 از کد Framer گرفته نمی‌شود**. در آزمون کلیک روی دستهٔ `Electronics` با locatorهای قابل مشاهده، تعداد محصول مرئی **۹→۳** شد؛ شمارش کل nodeهای DOM همچنان ۹ می‌ماند، پس در QA باید `visible` را بسنجیم. آزمون کلیک `Open filters` در Framer (موبایل و تبلت) و `Toggle menu` در Pentagram هم بدون خطای ابزار انجام شد؛ **کیفیت تمام interactionهای ثالث، WCAG و touch واقعی تأیید نشده**.
  - **شواهد محلی قابل بازبینی:** `C:\Users\Mrn7206\Desktop\DJMRN-LightSites-M01-Prep\qa\S03-reference-audit-20261122\` شامل `summary.json`، `interaction-summary.json`، `product-preview-summary.json`، `filter-interaction.json` و PNGهای research-only. `summary.json` SHA256=`F976EE2D7C648C25850707CC17E4A0D0AAACEFD608EED35FB398516191DAE802`، `interaction-summary.json` SHA256=`AD105C6917DEDDE9C5E8A55B34B5132D1A4BFA781F7B8BA2400BEF998AB5ED15`، `product-preview-summary.json` SHA256=`CA5DCB26DB4E82311B897BAA69EAD8A8DA4B7B92C1785FD720EA2038C6F83024`. Screenshots سایت‌های ثالث **محلی** می‌مانند و در مخزن عمومی منتشر نشده‌اند. اصل سورس و تست‌های M01 هنوز شروع نشده‌اند.
  - **سه الگوی نهایی پژوهش برای M01:** (۱) `EDITORIAL_SERVICE_STORY`: Home، شش خدمت، سه Demo case و CTA به Contact؛ (۲) `COMPACT_DISCOVERABLE_CATALOG`: شش محصول ساختگی، دسته/جست‌وجوی ساده، no-result/reset و CTA سبد؛ (۳) `HONEST_MOCK_CHECKOUT`: quantity/total/receipt با برچسب دائمی `DEMO — no payment` و بدون ورود کارت/PII/API. **جهت moodboard پیشنهادی:** editorial مینیمال + CTA روشن + کارت‌های کنترل‌شده + میکروتعامل‌های سبک. این **انتخاب پژوهشی قابل بازگشت** است؛ تأیید نهایی رنگ/برند و artwork در S06 با مالک است.
  - **رفتار موردنیاز به تفکیک نمایشگر (نتیجه طراحی، نه ادعای یکسان بودن سایت‌های ثالث):**

    | بخش | موبایل 320–430 CSS px | تبلت 600–1024 | لپ‌تاپ/دسکتاپ 1024–1920 | Gate |
    |---|---|---|---|---|
    | nav + locale + cart | منوی آشکار و قابل لمس، switch زبان و cart accessible | ساختار responsive با لمس/کیبورد | nav عریض و max-width | S05/S06/S09، بررسی S16/S18 |
    | Home/Services/Work | یک ستون و CTA نزدیک hero | ۱–۲ ستون بر اساس محتوا | ۲–۳ ستون، متن خوانا | S06/S10/S11 |
    | Catalog | جست‌وجو/فیلتر قبل از کارت‌ها، یک ستون | دو ستون اگر جا شود | ۲–۳ ستون، بدون sidebar اجباری | S05/S12 |
    | Mock cart/receipt | جمع و دکمه‌ها عمودی، `DEMO` همیشه پیداست | summary سیال | summary با فاصله مناسب | S13/S16/S18 |
    | Locale | `fa/ar` RTL و `en/tr/de` LTR، متن بلند | تغییر جهت/چرخش | متن و grid ثابت بدون crop | S07/S15/S16/S18 |

  - **حقوق دارایی و سیاست قطعی استفاده:** از تصاویر و ویدئوهای Instrument/Pentagram/Stripe، نام/لوگو/اسکرین‌شات محصولات شخص ثالث یا template/component Framer **هیچ کپی/Embed در سایت** انجام نشود؛ مجوز استفاده تجاری آنها تأیید نشده است. گرافیک hero و ۳ case و ۶ محصول **اصل/تولید خودمان** با برچسب Demo باشند. برای فونت [Vazirmatn](https://github.com/rastikerdar/vazirmatn/blob/master/OFL.txt) و [Inter](https://github.com/rsms/inter/blob/master/LICENSE.txt) مجوز **SIL OFL 1.1** و برای [Lucide](https://github.com/lucide-icons/lucide/blob/main/LICENSE) مجوز **ISC** از منابع خودشان احراز شد؛ استفاده مشروط به حفظ مجوز/attribution در بستهٔ تحویل و بررسی نسخهٔ فایل واقعی هنگام ورود در S06/S19. بدون نیاز فوری به نصب فونت/آیکون، system fonts و SVG اصل پیش‌فرض‌اند. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) و [MDN Responsive](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) مراجع معیار آینده‌اند، نه تستی که امروز روی M01 انجام شده باشد.
  - **امنیت/حافظه/کیفیت:** در آزمون ۱۵ viewport نخست، RAM آزاد مشاهده‌شده در حدود 612–799MiB و بعد از بستن مرورگر بیش از 1GiB بود، آستانهٔ اضطراری 100MiB نقض نشد؛ فقط یک Edge headless در هر اجرا و بدون Docker/نصب جدید. `documentWidth <= viewport` تنها smoke reflow است، نه اثبات UX کامل؛ داده قابل مشاهده، render پایدار، keyboard/touch و console برای سایت خودمان در S08–S18 تست می‌شوند.
  - **نتیجهٔ پذیرش:** **PASS برای گیت پژوهش S03** = پنج مرجع با URL/تاریخ/استنتاج/ریسک حقوقی، ۱۵ viewport واقعی+۳ viewport پیش‌نمایش کاتالوگ، screenshots محلی، یک نمونه فیلتر قابل مشاهده 9→3، سه الگوی قابل پیاده‌سازی و جهت بصری موقت. **NOT TESTED برای سایت M01:** هیچ صفحهٔ ساخته‌شده، زبان‌ها، backend، پرداخت، درگاه، Lighthouse/WCAG یا تست واقعی روی گوشی. **مراحل بعد S04 → S20 هنوز [ ]**؛ S04 تصمیم معماری/فایل، S05 IA/data، S06 طراحی مصوب، S07 i18n، S08 اولین HTML واقعی. تیک نهایی M01 در فهرست ۲۲ مدل خالی می‌ماند.
  - **Commit و بازگشت:** همه تغییرات فقط در همین فایل و همین branch ثبت می‌شوند؛ با Git revert قابل بازگشت‌اند. شاخه والد، `main` و `09-self-marketing-website` دست‌نخورده‌اند.

- [x] **S04 — معماری ساده و قرارداد توسعه**
  - **وضعیت و زمان:** **PASS — 2026-11-22** برای قرارداد معماری/طراحی مهندسی؛ **NOT BUILT / NOT RUNTIME TESTED** برای کد سایت. `S01–S03` از قبل PASS بودند.
  - **ورودی تأییدشده:** [S02 Brief](01-RESEARCH-AND-BRIEF.md) و [S03 evidence](03-EXECUTION-ROADMAP.md)؛ برند آزمایشی `NOVA Atelier`، شش خدمت، سه Concept/Demo case، شش محصول ساختگی، ۵ زبان و ۳ کلاس نمایشگر.
  - **خروجی قابل بازبینی:** بند [S04 — قرارداد تأییدشدهٔ معماری استاتیک](04-I18N-SEO-COMMERCE-SECURITY.md) در سند موجود، نه گزارش موازی؛ شامل درخت `site/`، مالکیت CSS/JS، ۳۰ route هدف، public HTML/no-JS، state/data، failure modes، اجرای localhost، امنیت، rollback و انتقال به S05–S08.
  - **فناوری و Boundary:** HTML چندصفحه‌ای قابل خواندن بدون JS؛ CSS mobile-first در `tokens.css/base.css/components.css` با یک DOM معنایی در هر locale/page؛ شش ماژول JS `main/nav/locale/catalog/cart/checkout` فقط برای تعامل؛ یک `items.demo.json` مصنوعی؛ SSR/DB/framework/real payment/real contact submission/CDN وابسته = **هیچ**. `site/` فقط نقشهٔ ساخت تا شروع S08 است، پوشه/صفحات سایت هنوز ایجاد نشده‌اند.
  - **قرارداد زبان/مسیر:** `fa/ar` RTL و `en/tr/de` LTR؛ ۵ نوع صفحهٔ عمومی × ۵ زبان = **۲۵**؛ `demo-checkout` × ۵ = **۵** `noindex`، جمعاً **۳۰**. صفحهٔ انتخاب زبان یا 404 در صورت نیاز خارج از این ۳۰. تغییر زبان به همان نوع صفحه، لینک واقعی HTML؛ breakpoint بر اساس محتوا در S06.
  - **State و Failure:** محصول/مبلغ canonical فقط fixture آزمایشی؛ `priceMinor` عدد صحیح، کمیت محدود، `sessionStorage` اختیاری و پاک‌سازی در خطا؛ catalog static fallback هنگام fail JSON؛ nav قابل استفاده بدون JS؛ نمایش دائمی `DEMO — no money charged`، بدون PSP/PII/CVV/حساب واقعی. `file://` برای module/fetch ممنوع؛ S08 روی `127.0.0.1` با MIME درست و مسیرهای امن آزمایش شود.
  - **شواهد آزمون قرارداد A01–A06:** A01 `PASS` شمارش `5×6=30` route یکتا، `25` عمومی/`5` DEMO؛ A02 `PASS` بررسی محلی Git branch `project/light-sites-m01-vanilla-20261121`، sparse فقط M01، `git status` پاک، `site/` موجود نیست؛ A03 `PASS` دامنه مسئولیت ۳ CSS/۶ JS/یک داده + failure policy؛ A04 `PASS` ثبت no-JS, lang/dir, responsive؛ A05 `PASS` جداسازی پرداخت/PII و بازگشت با Git؛ A06 `PASS` ارجاع به MDN و Google official. **همه PASSها قرارداد/مطابقت ایستا هستند؛ مرورگر و کد M01 تست نشده‌اند**.
  - **ریسک/محدودیت:** نام تجاری/رنگ نهایی، حقوق asset واقعی و ترجمه انسانی هنوز نهایی نیستند؛ دامنه یا مسیر میزبانی نامشخص است؛ اسکریپت تولید HTML، server و JSON هنوز فایل فیزیکی نیستند؛ دو مسیر پرداخت/فرم واقعی عامدانه حذف‌اند. پیشنهاد Node generator فقط در صورت نیاز اثبات‌شده و بدون package جدید.
  - **سیاست فضا و هزینه:** فقط [شاخهٔ اختصاصی M01](https://github.com/mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations/tree/project/light-sites-m01-vanilla-20261121/10-chatgpt-light-sites/models/M01-vanilla-multilingual)؛ هیچ ویرایش در `main`، `09-self-marketing-website/` یا مدل‌های دیگر؛ بدون نصب/خرید/credit.
  - **مرحله بعد:** `S05` — IA، جدول URL و CTA، شکل دقیق fixture ۶ محصول، قوانین دسته/خطا و گردش‌های کار. `S06` visual و `S07` ترجمه؛ اولین سایت قابل اجرای واقعی در `S08`، نه این مرحله.

- [x] **S05 — معماری اطلاعات، صفحات و مسیرها**
  - **وضعیت/تاریخ:** **PASS — 2026-11-22** برای `IA + fixture specification + state/failure contracts`. **تست صفحات واقعی M01: NOT TESTED**؛ `site/` هنوز ساخته نشده است. مراحل S01 تا S04 قبلاً PASS بودند.
  - **خروجی اصلی قابل Diff:** [بخش 1B — S05 در سند فنی موجود](04-I18N-SEO-COMMERCE-SECURITY.md): ۳۰ URL از ۵ locale `fa/en/ar/tr/de` × ۶ page kinds؛ ۲۵ صفحه عمومی و پنج `demo-checkout` با `noindex`. فرمت آینده `/{locale}/` و `/{locale}/{services|work|catalog|contact|demo-checkout}/`، بدون URL جعلی عمومی یا redirect خودکار. نقشه‌های Header/Footer، CTAs، تغییر زبان به equivalent kind، سه journey و fallback روشن شدند.
  - **۵ لینک اصلی ناوبری:** Home / Services / Work / Catalog / Contact؛ پرداخت نمایشی فقط از cart. مسیر خدمات `Home→Services→Work→Contact`؛ مسیر نمایش کاتالوگ `Home→Work→Catalog→DEMO cart→mock checkout/receipt`؛ زبان بعدی همان نوع صفحه را باز می‌کند. لینک صفحات هنوز ساخته‌نشده باید تا مرحلهٔ ایجادشان غیرفعال/حذف شود، نه اینکه 404 بسازد.
  - **Fixture شش‌تایی دقیق:** `landing-kit(18000)`, `company-site-kit(48000)`, `portfolio-kit(28000)`, `multilingual-ui-kit(36000)`, `seo-starter-audit(12000)`, `performance-check-pack(16000)` به واحد `priceMinor`؛ دسته‌ها `web=3, design=1, audit=2`. `DEMO_CREDIT` **پول واقعی نیست**؛ `minorPerUnit=100`، حداکثر ۶ شناسه × مقدار ۱…۹، بیشینهٔ همه اقلام ×۹ برابر `1,422,000 priceMinor` یا `14,220.00` اعتبار کاملاً خیالی است؛ هیچ نرخ ارز یا ارائه‌دهنده پرداخت وارد نشده. محتوا/ترجمهٔ `titleKey` در S07 نهایی می‌شود.
  - **State و رفتار شکست:** دستهٔ `all/web/design/audit`، جست‌وجو و `no-results/reset`؛ `sessionStorage` ناشناس اختیاری با اعتبارسنجی schema/ID/qty و بازنشانی دادهٔ خراب؛ بدون JS صفحه و لینک‌های HTML معنادار و کارت‌های محصول قابل دیدن می‌مانند؛ Contact فقط نمایش اعتبارسنجی بدون ارسال یا ذخیره اطلاعات، بدون implicit GET؛ mock Checkout از `EMPTY→REVIEW→DEMO_CONFIRMED`، اعلان دائمی **no payment** و بدون PAN/CVV/PII/API/سفارش حقیقی. راه بازیابی هر failure در سند مشخص است.
  - **تعهد سه نمایشگر:** موبایل 320–430، تبلت 600–1024، دسکتاپ ≥1024؛ همه بخش‌ها و زبان‌ها، منو/فیلتر/CTA/cart/contact با touch/mouse/keyboard و RTL/LTR قابل دسترس بمانند. اعداد width فقط اندازهٔ آزمون هستند؛ breakpoint نهایی و visual confirmation در S06 تعیین می‌شود.
  - **تست واقعی قرارداد در لپ‌تاپ:** Bridgerator+Node 24 موجود؛ test code محلی مستقل در `C:\Users\Mrn7206\Desktop\DJMRN-LightSites-M01-Prep\qa\S05-contract-check.cjs`، **۶ تست B01…B06 PASS / ۰ FAIL / exit 0**: B01 محاسبه ۳۰ مسیر یکتا، B02 صحت لینک‌های هدف و معادل‌های زبان، B03 parse JSON و six IDs + bounded integer total، B04 حالت‌های خطا، B05 RTL/LTR و کنترل‌های واکنش‌گرا، B06 مجزا بودن مسیر و نساختن سایت/پرداخت واقعی. `SHA256` اسکریپت QA: `9146908B8E20CC57C701EB26BB30FFA52DFF5813D50A262B73D94FF06AA7878A`. یک شکست اولیهٔ تست B06 به دلیل انتظار واژه‌ای سخت‌گیرانه و یک اجرای بدون متغیر محیطی `S05_ROOT` رخ داد؛ بدون دستکاری سورس/قرارداد اصلاح شدند و **اجرای نهایی همگی PASS** است. این آزمون، render/browser/e2e محصول نیست.
  - **مرزها/حقوق و ادامه:** `S05` فقط تحلیل IA و fixture در سند موجود است؛ هنوز فایل واقعی `items.demo.json`، HTML یا CSS/JS ساخته نشده. نمونه‌کار و برند NOVA همچنان DEMO/موقت و ترجمه‌ها تأیید انسانی نشده؛ هیچ ابزار تازه، هزینه، سرور عمومی، حساب واقعی، انتشار یا تغییر در پروژه 09. تغییرات فقط در `project/light-sites-m01-vanilla-20261121` و همین پوشه است؛ با Git revert برگشت‌پذیر.
  - **مرحلهٔ بعد:** `S06` — سه wireframe موبایل/تبلت/دسکتاپ، توکن رنگ/تایپ و تصویر اصل با تأیید بصری. `S07` متن و i18n؛ شروع HTML عملی و تست browser در `S08`.

- [x] **S06 — سیستم بصری و تایپوگرافی**
  - **زمان و نتیجه:** **PASS — 2026-11-22** برای مبنای طراحی بصری **موقت و برگشت‌پذیر**، سه اندازهٔ نمایشگر، نمای RTL و کنترل ایستای نمونهٔ طراحی. **این PASS به معنی تأیید تجاری نام NOVA یا کیفیت ترجمه، تست واقعی سایت، خرید یا انتشار نیست.** S07–S20 انجام‌نشده‌اند.
  - **خروجی‌های واقعی در همین شاخه M01:** [قرارداد سیستم طراحی S06](design/S06-VISUAL-SYSTEM.md)، [وایرفریم موبایل 390](design/wireframe-mobile-390.svg)، [وایرفریم فارسی RTL موبایل](design/wireframe-mobile-rtl-390.svg)، [وایرفریم تبلت 820](design/wireframe-tablet-820.svg)، [وایرفریم دسکتاپ 1366](design/wireframe-desktop-1366.svg)، [Hero برداری اصل](design/nova-hero-original.svg) و [اثبات استاتیک واکنش‌گرایی HTML/CSS](design/s06-responsive-proof.html). فایل‌های SVG منابع **قابل ویرایش** و اصیل هستند و بدون کپی منبع ثالث طراحی شده‌اند؛ HTML نمونه در پوشه `design/` است، نه سایت اجرایی `site/`.
  - **تصمیم بصریِ قابل تغییر:** `Midnight Editorial` با canvas `#0C1220`، panel `#172335`، متن `#F8F5EE`، متن کم‌رنگ `#BECADD`، تأکید `#F2C37A`، برچسب روی تأکید `#161C29` و فوکوس `#8FE5F5`. font stack سیستم `system-ui/Segoe UI/Tahoma/Arial` و در نسخه اجرایی `clamp()` برای مقیاس تایپ؛ هیچ خرید یا نصب فونت جدید نیست.
  - **کنتراست حساب‌شده، فقط جفت‌رنگ‌های معین:** متن روشن روی bg حدود `17.17:1`، متن muted روی bg `11.29:1`، متن روشن روی panel `14.52:1`، muted روی panel `9.55:1` و متن تیره روی CTA طلایی `10.44:1`؛ همگی بالاتر از هدف 4.5:1 متن معمولی. حاشیه `#425069` روی bg فقط `2.30:1` و **صرفاً تزئینی** است، نه نشانهٔ کافی برای کنترل فعال. WCAG کل سایت در S16 بررسی خواهد شد.
  - **قرارداد Responsive:** یک DOM و CSS fluid با عرض محتوا تا `75rem` و حاشیه `clamp(1rem,3.2vw,3.2rem)`؛ موبایل یک ستون، تبلت دو ستون، دسکتاپ سه ستون در صورت فضای کافی. breakpointهای **پیشنهادی** طراحی `47rem` و `69rem` برای کارت‌ها و `36rem` برای فشردگی ناوبری، با حفظ امکانات لمس، کیبورد، focus-visible و `prefers-reduced-motion`. `fa/ar` RTL و `en/tr/de` LTR در قرارداد؛ نوشته‌های فارسی وایرفریم **متن اولیه، نه ترجمهٔ بازبینی‌شده**.
  - **تست محلی واقعی در همان لپ‌تاپ، Bridgerator + Edge/Playwright:** ۵ SVG با XML parser PowerShell بدون خطا باز شدند؛ ۵ تصویر مستقیم SVG در Edge ثبت و بازبینی شد (**۵ PASS**). نسخهٔ نهایی نمونهٔ HTML/CSS در عرض‌های LTR `320/390/820/1366/1920` و RTL `320/390/820`، با JavaScript غیرفعال و `reducedMotion:reduce`، **۸ تست PASS، صفر شکست/سرریز افقیِ کل صفحه**؛ در همه ۴ لینک nav، ۶ کارت خدمت، ۳ نمونهٔ DEMO، ۶ کارت کاتالوگ و تصویر Hero موجود بود؛ grid به ۱/۲/۳ ستون تغییر کرد. آزمون Tab فوکوس روی لینک `#services` با outline ظاهرشده PASS شد. تست گوشی فیزیکی، تجربهٔ واقعی کاربر، Checkout و ۵ زبان انجام نشده‌اند.
  - **یافته و اصلاح QA:** ابتدا `height` ذاتی تصویر Hero فضای خالی اضافی ایجاد می‌کرد؛ با `block-size:auto` در نمونهٔ design اصلاح و در عرض 390 مجدداً سنجیده شد (`hero≈530px, image≈182px`). تلاش نخست screenshot بلند SVG timeout داشت؛ اجرای دوم تصویر هر پنج SVG را بدون خطا ثبت کرد. همهٔ این‌ها طراحی‌اند، نه کد محصول.
  - **مسیر شواهد با provenance:** `C:\Users\Mrn7206\Desktop\DJMRN-LightSites-M01-Prep\qa\S06-visual-evidence-20261122\` (تصاویر و `final-s06-validation.json` و `svg-validation.json`)؛ SHA256 اول `2242D4251B60D41175CC3E5D6972AFBCEB2161B7957882CA2FE41EDE29630539`، دوم `FFDD01318D1669E5FBBE19BDDA22BDFB18D0CB5AE4706F184BD71EA7BECAA7BA`. متن و شواهد فنی در همان [سند S06](design/S06-VISUAL-SYSTEM.md) باقی می‌ماند؛ **هیچ صفحه/فایل گزارش پیشرفت موازی** ساخته نشده است.
  - **محدودیت/ادامه:** رنگ، برند، گرافیک و فونت نهایی هنوز برای استفاده عمومی به تأیید سلیقه‌ای مالک و بررسی حقوقی نیاز دارند؛ S07 ترجمه/بومی‌سازی واقعی را انجام می‌دهد، S08 نخستین HTML/CSS/JS اجرایی را. پوشه `site/` هنوز وجود ندارد؛ کارتابل مدل 01 از 22 همچنان ساخت را کامل نمی‌داند. بدون React/Vite/3D/پرداخت واقعی و بدون دستکاری `09-self-marketing-website/` یا `main`.

- [x] **S07 — طراحی i18n و محتوای پنج زبان**
  - **تاریخ و نتیجه:** **PASS — 2026-11-22** برای **تکمیل پیش‌نویس چندزبانه + اعتبارسنجی ساختاری و مرورگر**. این تیک به معنی **تأیید کیفیت زبانی توسط مترجم انسانی یا آماده بودن سایت برای انتشار نیست**؛ بازبینی تخصصی هر پنج زبان **PENDING** و گیت کیفیت S16/انتشار است. S08–S20 هنوز انجام نشده‌اند.
  - **فایل خروجی واقعی و تنها authority محتوایی S07:** [`content/i18n.v1.json`](content/i18n.v1.json) در همین مسیر M01 و branch اختصاصی. `schemaVersion=1`، `contentStatus=DRAFT_EDITORIAL_HUMAN_REVIEW_PENDING`، برند آزمایشی NOVA Atelier. **۵ locale** `fa/en/ar/tr/de` با `dir=rtl/ltr/rtl/ltr/ltr`، **۶ نوع صفحه** در هر زبان، `title`، `meta description`، `H1`، متن معرفی، ۳۸ کلید UI/CTA/a11y در هر زبان، شش خدمت، سه Concept case و شش محصول DEMO در هر زبان؛ **۳۰ متن alt پیشنهادی برای محصولات** و ۱۵ متن alt برای سه case (هر یک در پنج زبان). Service card decoration می‌تواند `alt=""` داشته باشد. همهٔ نمونه‌ها از برندها/کارفرمایان واقعی، ادعای KPI و گواهی کارفرما خالی‌اند.
  - **قرارداد UI:** `lang` و `dir` در `html`؛ سوییچ زبان به **همان page kind** `/{locale}/{kind}/`، `<bdi>` برای شناسه‌های لاتین در جملهٔ RTL، layout با CSS منطقی و متن طولانی آلمانی/ترکی. Demo Checkout `noindex`، اعلان دائمیِ عدم پرداخت، سبد با اعتبار خیالی `DEMO_CREDIT` (نه ارز واقعی)؛ Contact فقط پیش‌نمایش بدون ارسال یا ذخیره داده. در S08 HTML واقعی باید به‌صورت محتوای استاتیک قابل‌خواندن بدون JS ساخته شود، نه تزریق صرفاً با JS.
  - **کنترل صحت منبع:** JSON معتبر در Node/PowerShell؛ پنج دسته کلید UI یکسان (۳۸ برچسب)، `5×6=30` ترکیب صفحه؛ ۶ شناسهٔ ثابت service، ۳ case، ۶ product برای هر زبان، و شمارش **۳۰/۳۰ alt محصول غیرخالی**. `title/description/H1/lead` در هر ۳۰ صفحه وجود دارند، طول متا در حد قرارداد آزمون کنترل شد؛ هیچ فایل `site/` یا پرداخت واقعی ساخته نشد.
  - **QA واقعی لپ‌تاپ:** Bridgerator → Node 24 + Edge/Playwright موجود، یک مرورگر با JS غیرفعال و `reducedMotion:reduce`. یک proof موقت **خارج از محصول، از JSON اصلی و CSS آزمایشی S06** در مرورگر ساخته شد؛ **۱۰۵ بررسی PASS / صفر خطا**: هر یک از ۳۰ ترکیب زبان/نوع صفحه در عرض‌های `390/820/1366` (۹۰)؛ پنج زبان در `320px` و landscape `844×390` (+۱۰)، و پنج آزمون افزایش font-size تا `200%` در 390px (+۵). `lang/dir`، منو ۵ لینک، پنج لینک سوییچ زبان، تعداد کارت‌های خدمات/آثار/محصول، عنوان/meta و هشدار DEMO بررسی شدند؛ **هیچ سرریز افقی سراسری** ثبت نشد. لینک سوییچ `fa/catalog → de/catalog` و سایر زبان‌ها در proof تأیید شد؛ **۹ تصویر QA** از صفحات فارسی/عربی/آلمانی ثبت و چند نمونه بازبینی بصری شدند. این‌ها صرفاً **نمایش proof در مرورگر** هستند، نه تست مسیرهای واقعی localhost یا گوشی فیزیکی.
  - **مراجع قواعد رسمی (2026-11-22):** [W3C HTML language](https://www.w3.org/International/questions/qa-html-language-declarations.en)، [W3C bidi/dir](https://www.w3.org/International/questions/qa-html-dir.en.html)، [Google localized URLs/hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)، [MDN Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat). `hreflang` متقابل فقط پس از ایجاد URL عمومی واقعی در S15، نه روی آدرس فرضی.
  - **Provenance & QA script:** `C:\Users\Mrn7206\Desktop\DJMRN-LightSites-M01-Prep\qa\S07-localization-QA.cjs` (فقط ابزار آزمون محلی)، شواهد `C:\Users\Mrn7206\Desktop\DJMRN-LightSites-M01-Prep\qa\S07-i18n-evidence-20261122\summary.json` و ۹ PNG؛ SHA256 خلاصهٔ نهایی `D96E09AB13E514D3086CCD0C12A6429C92DD07252E6409BD5BD5867E430D5BB3`، SHA256 اسکریپت `5D7C81B27F44EEB006FA08EF632CD038B83BA722A953F5DC1CDF44D5C9CD05B5`، SHA256 متن `7C6A05C427EEBAFD5048ECE0033EEDC8C37C78C61A32B4CA031397D921E5B7B5`. فایل‌های تصویری سایت/دیگران منتشر نشدند.
  - **محدودیت و مسیر بعد:** ترجمه‌ها **مدل‌نویس و draft**، بدون گواهی ترجمه تخصصی؛ بومی‌سازی اصطلاحات، دقت معنایی، alt مطابق artwork واقعی، نمایش ۵ زبان در مرورگر سایت ساخته‌شده و WCAG هدف S08/S11–S16 است. S08 نخستین واقعی `site/` HTML/CSS/JS و تست localhost را شروع می‌کند؛ ۳۰ صفحه هنوز وجود ندارند. ابزار/کتابخانه/هزینه/ساخت Agent جدید یا تغییر شاخهٔ `main`، سایر مدل‌ها و پروژه سنگین Codex انجام نشده است؛ فقط یک فایل داده و دو سند موجود M01 تغییر کرده‌اند.

- [ ] **S08 — قالب HTML، Git و پیش‌نمایش محلی**
  - **کار:** پوشه مستقل کد، فایل‌های پایه/README/test؛ preview Node built-in روی 127.0.0.1؛ **اولین smoke responsive در عرض‌های 320، 768 و 1366 CSS px** بدون سه HTML متفاوت.
  - **ابزار/نقش:** Bridgerator + Git + Node/Python.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** سایت واقعی با browser در localhost در عرض‌های 390/820/1366 ظاهر شود؛ تک HTML/DOM قابل استفاده در هر کلاس و Git branch درست باشد.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S09 — کامپوننت‌های مشترک و ناوبری**
  - **کار:** header/footer، language switcher، menu موبایل/تبلت و navigation دسکتاپ با **یک مدل DOM**، skip link، active page، نقاط لمس مناسب و focus-visible.
  - **ابزار/نقش:** HTML semantic + CSS + vanilla JS.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** منوی موبایل/تبلت/دسکتاپ + language switch با touch و mouse/keyboard کار کند؛ رنگ/Focus و بدون جابه‌جایی بزرگ layout.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S10 — صفحه اصلی حرفه‌ای**
  - **کار:** hero، ارزش پیشنهادی، خدمات منتخب، نمونه‌های DEMO، CTA و motion کاربردی؛ **نسخه ۱، ۲ و ۳ ستونه متناسب فضای محتوا**، بدون crop مخرب تصویر، چیدمان سازگار با صفحه عریض.
  - **ابزار/نقش:** HTML/CSS + DOM JS.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** Home در همه پنج زبان با سه viewport نماینده کار کند، محتوا/CTA بدون JS معنی‌دار، hero و typography بدون crop/overflow مخرب.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S11 — صفحات خدمات و نمونه‌کار**
  - **کار:** Services + Portfolio با case studies واضح DEMO، جزئیات و CTA به contact؛ grid کارت‌ها و طول متن fa/ar/de در موبایل/تبلت/دسکتاپ.
  - **ابزار/نقش:** static localized HTML + CSS.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** خدمات و نمونه‌کار در پنج زبان و سه کلاس بدون بریدگی کارت/متن، با لینک‌های واقعی محلی و بدون testimonials جعلی.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S12 — کاتالوگ استاتیک و فیلتر**
  - **کار:** ۴–۶ آیتم آزمایشی، جست‌وجو، فیلتر، حالت no-result، price labels nonreal؛ **فیلتر و cart قابل استفاده با لمس موبایل/تبلت و موس/کیبورد دسکتاپ**، بدون hover-only UX.
  - **ابزار/نقش:** vanilla JS modules + JSON/static HTML.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** فیلتر و جست‌وجو در mobile touch، tablet tap و desktop keyboard/mouse قابل استفاده؛ حالت خالی accessible و layout پایدار.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S13 — سبد و پرداخت نمایشی**
  - **کار:** cart, quantity, sum in integer minor units, mock checkout, demo receipt; **فرم و جدول خلاصه reflow در موبایل و تبلت** و banner ثابت و خوانای «پرداخت نمایشی» در همه اندازه‌ها.
  - **ابزار/نقش:** vanilla JS + Node built-in unit tests.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** cart و receipt آزمایشی در هر سه کلاس screen با reflow درست و بنر DEMO روشن کار کند؛ بدون واقعی‌سازی پرداخت/PII و total غلط.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S14 — تماس، اعتماد و صفحات حقوقی نمایشی**
  - **کار:** Contact, privacy/terms placeholder فقط صادقانه، بدون فرم ارسال واقعی یا شخص/نشانی جعلی؛ کنترل‌ها و برچسب‌های form در موبایل، تبلت و دسکتاپ با لمس و keyboard تست شوند.
  - **ابزار/نقش:** semantic HTML + validation UI.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** Contact و disclaimer در موبایل/تبلت/دسکتاپ با focus/touch keyboard قابل استفاده و صادقانه فاقد ارسال واقعی باشند.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S15 — سئوی فنی چندزبانه**
  - **کار:** URLهای ثابت locale، title/meta/OG، hreflang reciprocal، canonical، XML sitemap، robots، 404 policy.
  - **ابزار/نقش:** HTML/Node static checks + Google docs.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** هر صفحه indexable نسخه‌های ترجمه واقعی دارد، demo checkout noindex، هیچ structured data جعلی.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S16 — دسترس‌پذیری و بومی‌سازی دقیق**
  - **کار:** WCAG 2.2 AA target، **reflow تا 320 CSS px و زوم 200%/400% مطابق تست مرتبط**، keyboard، pointer coarse/fine، touch targets، focus، contrast، lang/dir، bdi، forms، alt و reduced-motion در سه کلاس نمایش.
  - **ابزار/نقش:** axe-core optional + manual browser.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** reflow تا 320 CSS px، zoom 200% و سناریوی 400%، focus/keyboard/touch و WCAG 2.2 AA target در fa/ar RTL و LTR بررسی؛ blockerهای جدی صفر.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S17 — بهینه‌سازی و بودجه عملکرد**
  - **کار:** WebP/AVIF با **srcset/sizes/picture در صورت نیاز** و حفظ نسبت، fonts subsetting، no hydration، defer JS، CWV/Lighthouse روی پروفایل موبایل و دسکتاپ؛ استفاده از width محدود در نمایشگرهای بزرگ.
  - **ابزار/نقش:** Chrome DevTools + Lighthouse; Sharp/SVGO optional.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** اندازه/عکس/فونت و کشیدگی 1920 با شواهد lab mobile + desktop بررسی؛ Lighthouse ≥90 فقط هدف و نه PASS تضمینی.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S18 — تست جامع عملکرد، امنیت و بازیابی**
  - **کار:** URL/lang routes، link crawl، unit/e2e، **ماتریس عرض 320/360/390/430/600/768/820/1024/1280/1440/1920 px** با ۳ کلاس اصلی، portrait/landscape، touch+mouse+keyboard، RTL/LTR، zoom، failure، XSS، no secrets.
  - **ابزار/نقش:** node --test, node --check, Playwright if verified, OWASP.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** ماتریس 3 کلاس × 5 زبان، zoom/portrait-landscape، touch/mouse/keyboard و مسیرها/سبد/فرم/test failures با شواهد PASS/FAIL واقعی کامل شود؛ هیچ class بلاک‌شده باقی نماند.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S19 — پکیج نمونه‌کار و تحویل**
  - **کار:** سورس خوانا، دستور اجرا، **تصویر تأییدشده از هر سه کلاس نمایشگر** (موبایل، تبلت، لپ‌تاپ/دسکتاپ) در fa RTL و en LTR، LICENSE assets، محدودیت پرداخت.
  - **ابزار/نقش:** Git + GitHub branch + screenshot tools optional.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** حداقل screenshot و تست قابل بازبینی برای موبایل، تبلت و لپ‌تاپ/دسکتاپ، fa RTL و en LTR، commit مستند و مجوز asset ثبت شود.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S20 — بازبینی مشتری و تصمیم انتشار/گسترش**
  - **کار:** **بازبینی واقعی در گوشی، تبلت در صورت دسترس، و لپ‌تاپ/PC** (یا شبیه‌سازی مستند در نبود دستگاه)، مقایسه portrait/landscape، دریافت بازخورد، اصلاح محدود، بررسی مجوز deploy اختیاری.
  - **ابزار/نقش:** browser/owner + Git; hosting only after approval.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** UX نهایی موبایل و لپ‌تاپ واقعی و تبلت واقعی در صورت دسترس (وگرنه emulator با برچسب) تأیید شود؛ انتشار/دامنه/درگاه با approval مستقل.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

## خوشه‌های تحویل؛ زیرمجموعه همین ۲۰ مرحله، نه پروژه‌های موازی
| Milestone | Stages | خروجی مطلوب | Stop / recovery |
|---|---|---|---|
| Brief and design approved | S01–S07 | معماری، محتوا و طراحی تایید شده | اگر ترجمه/برند/حق استفاده مبهم است، با fixture صریح ادامه بده و ادعای نهایی نکن |
| Real minimal working vertical | S08–S10 | Home در ۵ زبان + navigation واقعی محلی، سه viewport نماینده و یک DOM responsive | اگر preview/route خراب است، توسعه قابلیت بعدی متوقف |
| Service and shop demo functional | S11–S14 | Services/Portfolio/Catalog + cart/checkout DEMO end-to-end در سه کلاس نمایشگر | اگر مبلغ/حالت خطا/برچسب غیرواقعی روشن نیست، checkout نمایشی مسدود |
| Professional quality gates | S15–S18 | SEO/i18n/RTL/a11y/performance/security و responsive mobile/tablet/desktop functional evidence | failureها fix شوند، FAIL را PASS اعلام نکن |
| Handoff and real user proof | S19–S20 | branch+README+test+portable local demo و screenshots سه کلاس دستگاه | public deploy/real payments فقط با approval جدا |

## Dependency rules و برش‌های کوچک
- فقط S01–S07 پژوهش/brief هستند؛ اگر همه تصمیم‌ها از پیش روشن شد سریع به S08/S09 برو؛ از بازتولید گزارش‌های یکسان خودداری کن.
- S08 **smoke first**: یک فایل HTML با locale و یک CTA که از یک local HTTP server واقعی باز می‌شود؛ S09 navigation; S10 یک صفحه Home کامل؛ سپس S11–S14.
- برای ۵ زبان «ترجمه اتوماتیک جاوااسکریپتی در مرورگر» جایگزین ۵ URL HTML مستقل نیست؛ در همه مراحل no-JS fallback را حفظ کن.
- اگر استفاده از JSON data برای توسعه سبد نیازمند fetch شد، localhost origin را تضمین کن. Browser-only file:// تست معتبر fetch نیست.
- برای mock checkout محصول/قیمت فقط fixture و واحد پول نمایشی؛ محاسبه integer minor units + Intl برای **نمایش**.
- هزینه Unknown → stop؛ ابزار جدید بدون اثبات شکاف واقعی نصب نشود.

## Definition of Done overall
- ۵ زبان با URL و محتوای مستقل، دو جهت RTL/LTR؛ صفحات Home/Services/Portfolio/Catalog/Contact، به‌علاوه Checkout DEMO روشن.
- سئو ساختاری قابل ممیزی: title/H1/description/canonical/hreflang sitemap/robots/schema truthful. Indexed status NOT claimed without public domain/Search Console.
- **Mobile + tablet + laptop/desktop (wide-screen optional)**: responsive fluid layout، portrait/landscape، touch/mouse/keyboard و zoom/reflow، هر پنج زبان RTL/LTR؛ navigation، forms mock، filter، cart and mock checkout واقعی در مرورگر، failure و reduced-motion.
- Accessibility WCAG 2.2 AA target، حقوق assets و security baseline بررسی؛ no real PII/payments.
- کد و راهنمای اجرای خوانا، commit خود M01، test evidence و owner review؛ تا قبل آن checkbox مدل M01 در parent **[ ]**.
- هیچ کد یکپارچه‌ای از پروژه heavy Codex یا فایل‌های 3D وارد M01 نشود.
