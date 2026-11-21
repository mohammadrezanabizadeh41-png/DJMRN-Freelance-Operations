# M01 — نقشه راه اجرایی ترتیبی ساخت نمونه پنج‌زبانه
**Status:** RESEARCH-ONLY; 20 stages planned, NO SITE BUILT / no stage checked.  
**Source:** [01 Brief](01-RESEARCH-AND-BRIEF.md) · [02 Tools](02-STACK-TOOLS-AND-MCP.md) · [04 Cross-cutting contracts](04-I18N-SEO-COMMERCE-SECURITY.md) · [05 Acceptance](05-QA-AND-HANDOFF.md).  
**Parent build checklist:** [M01 of 22](../../05-MODEL-BUILD-CHECKLIST.md). The parent M01 must remain unchecked until real acceptance.

## قوانین اجرا
- مراحل به‌ترتیب `S01 → S20`؛ در هر turn کوچک‌ترین مرحله مجاز را انجام بده، سپس خروجی و **نتیجه TEST/FAIL/NOT TESTED** را اعلام کن. هیچ تیکی بدون فایل، تست و شواهد عملی نزن.
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

- [ ] **S01 — تأیید مبنا، دسترسی و جداسازی**
  - **کار:** محل Git شاخه M01، مسیر مجزا روی لپ‌تاپ، RAM/Node/Git/Browser و ابزارهای ضروری را فقط‌خواندنی تطبیق بده.
  - **ابزار/نقش:** Bridgerator/Git/Node/Windows.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** Git branch/path درست، اتصال مستقیم برقرار، RAM و ports سنجیده؛ هیچ فایل 09 تغییر نکند.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S02 — Brief کاربردی و مشتری فرضی**
  - **کار:** مخاطب/ارزش پیشنهادی، ۵ زبان، ۵ صفحه عمومی، Demo checkout، **سه کلاس اصلی نمایشگر موبایل/تبلت/لپ‌تاپ-دسکتاپ** و حالت افقی/عمودی را به‌عنوان نیاز قطعی ثبت کن.
  - **ابزار/نقش:** GPT-6 + سند 01.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** پیشنهاد برند/خدمات/محصولات demo با پیام صادقانه و CTA روشن، تایید کاربر.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

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
  - **قبولی:** ساختار فایل، قرارداد ورودی/خروجی state UI و استراتژی برگشت‌پذیری تایید.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S05 — معماری اطلاعات، صفحات و مسیرها**
  - **کار:** navigation، sitemap، CTA، product data dummy، مسیر داده و حالت خطا برای زبان‌ها و هر سه سطح نمایش؛ منوی موبایل، ناوبری تبلت و desktop، سبد خرید و فرم بدون قابلیت گم‌شده.
  - **ابزار/نقش:** HTML map/JSON fixtures.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** تمام مسیرهای کاربر و وضعیت empty/error مشخص، هیچ data collection واقعی.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S06 — سیستم بصری و تایپوگرافی**
  - **کار:** **سه wireframe واضح موبایل، تبلت، دسکتاپ** + wide-screen fluid max-width، توکن رنگ/space/type با clamp، Grid/Flex، media/container queries لازم، RTL/LTR، touch/hover/keyboard، کنتراست، ۱ hero original؛ بدون WebGL سنگین.
  - **ابزار/نقش:** CSS Grid/Flex/Container Query، optional GIMP/Inkscape.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** wireframe موبایل/دسکتاپ و سبک تایید؛ readable 320px و keyboard order معنادار.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S07 — طراحی i18n و محتوای پنج زبان**
  - **کار:** fa/en/ar/tr/de، ترجمه معنا و title/meta/CTA/alt؛ تست طول واژه‌ها و شکست خطوط در **۳ کلاس صفحه**، direction در چرخش portrait/landscape، و bidi.
  - **ابزار/نقش:** HTML lang/dir + CSS logical + Intl.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** کلید/صفحه‌های عمومی هر locale منطبق، ترجمه موقت صادقانه و آماده بازبینی.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S08 — قالب HTML، Git و پیش‌نمایش محلی**
  - **کار:** پوشه مستقل کد، فایل‌های پایه/README/test؛ preview Node built-in روی 127.0.0.1؛ **اولین smoke responsive در عرض‌های 320، 768 و 1366 CSS px** بدون سه HTML متفاوت.
  - **ابزار/نقش:** Bridgerator + Git + Node/Python.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** صفحه واقعی در مرورگر از localhost باز شود، سورس تمیز و branch درست.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S09 — کامپوننت‌های مشترک و ناوبری**
  - **کار:** header/footer، language switcher، menu موبایل/تبلت و navigation دسکتاپ با **یک مدل DOM**، skip link، active page، نقاط لمس مناسب و focus-visible.
  - **ابزار/نقش:** HTML semantic + CSS + vanilla JS.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** menu با keyboard/touch، زبان حفظ شود، layout shift مهم نباشد.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S10 — صفحه اصلی حرفه‌ای**
  - **کار:** hero، ارزش پیشنهادی، خدمات منتخب، نمونه‌های DEMO، CTA و motion کاربردی؛ **نسخه ۱، ۲ و ۳ ستونه متناسب فضای محتوا**، بدون crop مخرب تصویر، چیدمان سازگار با صفحه عریض.
  - **ابزار/نقش:** HTML/CSS + DOM JS.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** نمایش ۵ زبان و RTL/LTR؛ CTA و محتوای main بدون JS هم معنی‌دار.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S11 — صفحات خدمات و نمونه‌کار**
  - **کار:** Services + Portfolio با case studies واضح DEMO، جزئیات و CTA به contact؛ grid کارت‌ها و طول متن fa/ar/de در موبایل/تبلت/دسکتاپ.
  - **ابزار/نقش:** static localized HTML + CSS.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** مسیرها در ۵ زبان، محتوای شفاف و بدون لوگو/نقل‌قول ساختگی.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S12 — کاتالوگ استاتیک و فیلتر**
  - **کار:** ۴–۶ آیتم آزمایشی، جست‌وجو، فیلتر، حالت no-result، price labels nonreal؛ **فیلتر و cart قابل استفاده با لمس موبایل/تبلت و موس/کیبورد دسکتاپ**، بدون hover-only UX.
  - **ابزار/نقش:** vanilla JS modules + JSON/static HTML.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** filter و keyboard کار کند، اختلال JS محتوای اصلی را پنهان نکند.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S13 — سبد و پرداخت نمایشی**
  - **کار:** cart, quantity, sum in integer minor units, mock checkout, demo receipt; **فرم و جدول خلاصه reflow در موبایل و تبلت** و banner ثابت و خوانای «پرداخت نمایشی» در همه اندازه‌ها.
  - **ابزار/نقش:** vanilla JS + Node built-in unit tests.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** جمع درست و حالت خطا/refresh/empty cart کار کند، هیچ PAN/PII/secret، فقط MOCK.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S14 — تماس، اعتماد و صفحات حقوقی نمایشی**
  - **کار:** Contact, privacy/terms placeholder فقط صادقانه، بدون فرم ارسال واقعی یا شخص/نشانی جعلی؛ کنترل‌ها و برچسب‌های form در موبایل، تبلت و دسکتاپ با لمس و keyboard تست شوند.
  - **ابزار/نقش:** semantic HTML + validation UI.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** کاربر بفهمد ارسال نشده؛ بدون third-party collection؛ پیوندهای contact سالم.
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
  - **قبولی:** تست صفحه‌ها ۵ زبان، RTL و قیمت‌ها؛ نقض جدی  keyboard/focus/contrast رفع.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S17 — بهینه‌سازی و بودجه عملکرد**
  - **کار:** WebP/AVIF با **srcset/sizes/picture در صورت نیاز** و حفظ نسبت، fonts subsetting، no hydration، defer JS، CWV/Lighthouse روی پروفایل موبایل و دسکتاپ؛ استفاده از width محدود در نمایشگرهای بزرگ.
  - **ابزار/نقش:** Chrome DevTools + Lighthouse; Sharp/SVGO optional.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** بدون overflow در 320px، عکس‌ها aspect-ratio، هدف Lighthouse >=90 با گزارش واقعی؛ baseline و trade-off ثبت.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S18 — تست جامع عملکرد، امنیت و بازیابی**
  - **کار:** URL/lang routes، link crawl، unit/e2e، **ماتریس عرض 320/360/390/430/600/768/820/1024/1280/1440/1920 px** با ۳ کلاس اصلی، portrait/landscape، touch+mouse+keyboard، RTL/LTR، zoom، failure، XSS، no secrets.
  - **ابزار/نقش:** node --test, node --check, Playwright if verified, OWASP.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** smoke+unit+e2e+negative cases، صفر تراکنش واقعی، تجربه fallback و error تست‌شده.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S19 — پکیج نمونه‌کار و تحویل**
  - **کار:** سورس خوانا، دستور اجرا، **تصویر تأییدشده از هر سه کلاس نمایشگر** (موبایل، تبلت، لپ‌تاپ/دسکتاپ) در fa RTL و en LTR، LICENSE assets، محدودیت پرداخت.
  - **ابزار/نقش:** Git + GitHub branch + screenshot tools optional.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** commit مستقل، بازخوانی GitHub، راهنمای اجرا و شواهد آزمون، تایید مالک.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S20 — بازبینی مشتری و تصمیم انتشار/گسترش**
  - **کار:** **بازبینی واقعی در گوشی، تبلت در صورت دسترس، و لپ‌تاپ/PC** (یا شبیه‌سازی مستند در نبود دستگاه)، مقایسه portrait/landscape، دریافت بازخورد، اصلاح محدود، بررسی مجوز deploy اختیاری.
  - **ابزار/نقش:** browser/owner + Git; hosting only after approval.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** نمونه به‌صورت محلی usable؛ هر انتشار عمومی/دامنه/PSP/حساب نیازمند پیشنهاد و اجازه جدید.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

## خوشه‌های تحویل؛ زیرمجموعه همین ۲۰ مرحله، نه پروژه‌های موازی
| Milestone | Stages | خروجی مطلوب | Stop / recovery |
|---|---|---|---|
| Brief and design approved | S01–S07 | معماری، محتوا و طراحی تایید شده | اگر ترجمه/برند/حق استفاده مبهم است، با fixture صریح ادامه بده و ادعای نهایی نکن |
| Real minimal working vertical | S08–S10 | Home در ۵ زبان + navigation واقعی محلی | اگر preview/route خراب است، توسعه قابلیت بعدی متوقف |
| Service and shop demo functional | S11–S14 | Services/Portfolio/Catalog + cart/checkout DEMO end-to-end | اگر مبلغ/حالت خطا/برچسب غیرواقعی روشن نیست، checkout نمایشی مسدود |
| Professional quality gates | S15–S18 | SEO/i18n/RTL/a11y/performance/security/functional evidence | failureها fix شوند، FAIL را PASS اعلام نکن |
| Handoff and real user proof | S19–S20 | branch+README+test+portable local demo | public deploy/real payments فقط با approval جدا |

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
