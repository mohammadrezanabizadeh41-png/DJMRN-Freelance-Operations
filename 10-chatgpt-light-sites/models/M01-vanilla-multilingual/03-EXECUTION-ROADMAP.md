# M01 — نقشه راه اجرایی ترتیبی ساخت نمونه پنج‌زبانه
**Status:** S01–S02 **PASS (environment + product brief)**; S03–S20 **NOT STARTED**; no website code has been built or tested.  
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
  - **مرحله بعد:** **S03 — NOT STARTED**؛ مقایسه ۳–۵ نمونه مرجع از منظر UX و طراحی، بدون کپی منابع؛ سپس S04 ساختار اجرایی. بازگشت/اصلاح Brief از طریق Git commit قابل ردگیری است.

- [ ] **S03 — مرور رقبا/الگوهای طراحی روز**
  - **کار:** ۳–۵ نمونه موفق و ۲–۳ الگوی UX با منابع/مجوز؛ از هر الگو رفتار layout در موبایل، تبلت و دسکتاپ را مقایسه کن، نه کپی کد/دارایی.
  - **ابزار/نقش:** Web research + GitHub + browser read-only.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** جدول شاهد، تاریخ، انتخاب moodboard و ریسک کپی‌رایت.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S04 — معماری ساده و قرارداد توسعه**
  - **کار:** نقشه HTML/CSS/JS ماژولار با **یک DOM معنایی و CSS mobile-first، viewport meta، توکن‌های fluid و breakpoints محتوامحور**؛ JavaScript صرفاً تعامل، SSR/DB صفر؛ preview loopback.
  - **ابزار/نقش:** GPT-6 + Git.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** ساختار فایل/قرارداد state، یک DOM یکسان در هر locale، متای viewport، رویکرد mobile-first، breakpoints محتوامحور و rollback تأیید.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S05 — معماری اطلاعات، صفحات و مسیرها**
  - **کار:** navigation، sitemap، CTA، product data dummy، مسیر داده و حالت خطا برای زبان‌ها و هر سه سطح نمایش؛ منوی موبایل، ناوبری تبلت و desktop، سبد خرید و فرم بدون قابلیت گم‌شده.
  - **ابزار/نقش:** HTML map/JSON fixtures.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** همه مسیرها و CTA در موبایل/تبلت/دسکتاپ و حالت‌های empty/error با ورودی touch/mouse/keyboard مشخص باشند؛ جمع‌آوری واقعی داده وجود ندارد.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S06 — سیستم بصری و تایپوگرافی**
  - **کار:** **سه wireframe واضح موبایل، تبلت، دسکتاپ** + wide-screen fluid max-width، توکن رنگ/space/type با clamp، Grid/Flex، media/container queries لازم، RTL/LTR، touch/hover/keyboard، کنتراست، ۱ hero original؛ بدون WebGL سنگین.
  - **ابزار/نقش:** CSS Grid/Flex/Container Query، optional GIMP/Inkscape.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** wireframe مجزای سه کلاس **موبایل، تبلت، لپ‌تاپ/دسکتاپ** با یک سیستم CSS، RTL/LTR، 320px reflow و خوانایی wide screen بررسی/تأیید شود.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S07 — طراحی i18n و محتوای پنج زبان**
  - **کار:** fa/en/ar/tr/de، ترجمه معنا و title/meta/CTA/alt؛ تست طول واژه‌ها و شکست خطوط در **۳ کلاس صفحه**، direction در چرخش portrait/landscape، و bidi.
  - **ابزار/نقش:** HTML lang/dir + CSS logical + Intl.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** ترجمه و navigation همه localeها با طول متن واقعی، RTL/LTR و شکست خطوط سه کلاس نمایش بررسی شده و بازبینی انسانی ترجمه پیگیری شود.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

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
