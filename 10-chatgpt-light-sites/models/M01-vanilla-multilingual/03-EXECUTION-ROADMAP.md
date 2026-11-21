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

## کارتابل ۲۰ مرحله‌ای — تیک پس از اثبات معیار قبول

- [ ] **S01 — تأیید مبنا، دسترسی و جداسازی**
  - **کار:** محل Git شاخه M01، مسیر مجزا روی لپ‌تاپ، RAM/Node/Git/Browser و ابزارهای ضروری را فقط‌خواندنی تطبیق بده.
  - **ابزار/نقش:** Bridgerator/Git/Node/Windows.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** Git branch/path درست، اتصال مستقیم برقرار، RAM و ports سنجیده؛ هیچ فایل 09 تغییر نکند.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S02 — Brief کاربردی و مشتری فرضی**
  - **کار:** مخاطب/ارزش پیشنهادی، ۵ زبان، ۵ صفحه عمومی و Demo checkout، مرز واقعی/نمایشی را نهایی کن.
  - **ابزار/نقش:** GPT-6 + سند 01.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** پیشنهاد برند/خدمات/محصولات demo با پیام صادقانه و CTA روشن، تایید کاربر.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S03 — مرور رقبا/الگوهای طراحی روز**
  - **کار:** ۳–۵ نمونه موفق و ۲–۳ الگوی UX با منابع/مجوز؛ نقاط قوت/ضعف نه کپی کد/دارایی.
  - **ابزار/نقش:** Web research + GitHub + browser read-only.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** جدول شاهد، تاریخ، انتخاب moodboard و ریسک کپی‌رایت.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S04 — معماری ساده و قرارداد توسعه**
  - **کار:** نقشه HTML/CSS/JS ماژولار، JavaScript صرفاً interaction، SSR/DB صفر؛ مرورگر و preview loopback.
  - **ابزار/نقش:** GPT-6 + Git.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** ساختار فایل، قرارداد ورودی/خروجی state UI و استراتژی برگشت‌پذیری تایید.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S05 — معماری اطلاعات، صفحات و مسیرها**
  - **کار:** navigation، sitemap ذهنی، CTA، product data dummy، مسیر داده و حالت خطا برای زبان‌ها.
  - **ابزار/نقش:** HTML map/JSON fixtures.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** تمام مسیرهای کاربر و وضعیت empty/error مشخص، هیچ data collection واقعی.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S06 — سیستم بصری و تایپوگرافی**
  - **کار:** توکن رنگ/space/type، grid، responsive، RTL/LTR، کنتراست، ۱ hero original، no heavy 3D.
  - **ابزار/نقش:** CSS Grid/Flex/Container Query، optional GIMP/Inkscape.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** wireframe موبایل/دسکتاپ و سبک تایید؛ readable 320px و keyboard order معنادار.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S07 — طراحی i18n و محتوای پنج زبان**
  - **کار:** fa/en/ar/tr/de، ترجمه معنا و title/meta/CTA/alt؛ ارزیابی طول متن و bidi.
  - **ابزار/نقش:** HTML lang/dir + CSS logical + Intl.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** کلید/صفحه‌های عمومی هر locale منطبق، ترجمه موقت صادقانه و آماده بازبینی.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S08 — قالب HTML، Git و پیش‌نمایش محلی**
  - **کار:** پوشه مستقل کد، فایل‌های پایه/README/test؛ preview Node built-in روی 127.0.0.1.
  - **ابزار/نقش:** Bridgerator + Git + Node/Python.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** صفحه واقعی در مرورگر از localhost باز شود، سورس تمیز و branch درست.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S09 — کامپوننت‌های مشترک و ناوبری**
  - **کار:** header/footer، language switcher، menu موبایل، skip link، active page.
  - **ابزار/نقش:** HTML semantic + CSS + vanilla JS.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** menu با keyboard/touch، زبان حفظ شود، layout shift مهم نباشد.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S10 — صفحه اصلی حرفه‌ای**
  - **کار:** hero، ارزش پیشنهادی، خدمات منتخب، نمونه‌های DEMO، CTA و motion کاربردی.
  - **ابزار/نقش:** HTML/CSS + DOM JS.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** نمایش ۵ زبان و RTL/LTR؛ CTA و محتوای main بدون JS هم معنی‌دار.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S11 — صفحات خدمات و نمونه‌کار**
  - **کار:** Services + Portfolio با case studies واضح DEMO، جزئیات و CTA به contact.
  - **ابزار/نقش:** static localized HTML + CSS.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** مسیرها در ۵ زبان، محتوای شفاف و بدون لوگو/نقل‌قول ساختگی.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S12 — کاتالوگ استاتیک و فیلتر**
  - **کار:** ۴–۶ آیتم آزمایشی، جست‌وجو، فیلتر، حالت no-result، price labels nonreal.
  - **ابزار/نقش:** vanilla JS modules + JSON/static HTML.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** filter و keyboard کار کند، اختلال JS محتوای اصلی را پنهان نکند.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S13 — سبد و پرداخت نمایشی**
  - **کار:** cart, quantity, sum in integer minor units, mock checkout, demo receipt; clear nonpayment banner.
  - **ابزار/نقش:** vanilla JS + Node built-in unit tests.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** جمع درست و حالت خطا/refresh/empty cart کار کند، هیچ PAN/PII/secret، فقط MOCK.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S14 — تماس، اعتماد و صفحات حقوقی نمایشی**
  - **کار:** Contact, privacy/terms placeholder فقط صادقانه، بدون فرم ارسال واقعی یا شخص/نشانی جعلی.
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
  - **کار:** WCAG 2.2 AA target، keyboard, focus, contrast, lang/dir, bdi, forms, alt, reduced-motion.
  - **ابزار/نقش:** axe-core optional + manual browser.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** تست صفحه‌ها ۵ زبان، RTL و قیمت‌ها؛ نقض جدی  keyboard/focus/contrast رفع.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S17 — بهینه‌سازی و بودجه عملکرد**
  - **کار:** WebP/AVIF responsive original assets، fonts subsetting، no hydration, defer JS, CWV/Lighthouse check.
  - **ابزار/نقش:** Chrome DevTools + Lighthouse; Sharp/SVGO optional.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** بدون overflow در 320px، عکس‌ها aspect-ratio، هدف Lighthouse >=90 با گزارش واقعی؛ baseline و trade-off ثبت.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S18 — تست جامع عملکرد، امنیت و بازیابی**
  - **کار:** URL/lang routes, link crawl, test logic, responsive 320/390/768/1440, failure, XSS scan, no secrets.
  - **ابزار/نقش:** node --test, node --check, Playwright if verified, OWASP.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** smoke+unit+e2e+negative cases، صفر تراکنش واقعی، تجربه fallback و error تست‌شده.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S19 — پکیج نمونه‌کار و تحویل**
  - **کار:** سورس خوانا، دستور اجرا، تصاویر/ویدئوی تست مجاز، LICENSE assets، محدودیت پرداخت.
  - **ابزار/نقش:** Git + GitHub branch + screenshot tools optional.
  - **خروجی قابل بررسی:** فایل/صفحه/تست مرحله‌ای در پوشه کد M01، با تغییرات قابل Diff.
  - **قبولی:** commit مستقل، بازخوانی GitHub، راهنمای اجرا و شواهد آزمون، تایید مالک.
  - **شواهد اجرا:** `NOT STARTED` — مسیر خروجی: — ؛ تست: — ؛ commit/تصویر: — .

- [ ] **S20 — بازبینی مشتری و تصمیم انتشار/گسترش**
  - **کار:** نمایش روی موبایل و PC، دریافت بازخورد، اصلاح محدود، بررسی مجوز deploy اختیاری.
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
- Desktop/mobile، navigation، forms mock، filter، cart and mock checkout واقعی در مرورگر، تست‌های failure و reduced-motion.
- Accessibility WCAG 2.2 AA target، حقوق assets و security baseline بررسی؛ no real PII/payments.
- کد و راهنمای اجرای خوانا، commit خود M01، test evidence و owner review؛ تا قبل آن checkbox مدل M01 در parent **[ ]**.
- هیچ کد یکپارچه‌ای از پروژه heavy Codex یا فایل‌های 3D وارد M01 نشود.
