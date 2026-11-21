# Tools — ابزارهای پروژه مستقل ساخت سایت سبک با ChatGPT
**Project:** DJMRN-CHATGPT-LIGHT-SITES-001 | **Directory:** `10-chatgpt-light-sites/tools/`  
**Status:** Documentation/reconciliation complete, not software installation.  
**Main project:** [../README.md](../README.md) | [Stages](../01-PROFESSIONAL-STAGES.md) | [22 build models](../04-WEBSITE-BUILD-MODELS.md).

## اینجا کاتالوگ اصلی ابزارهای همین پروژه است
1. **[REGISTRY.md](REGISTRY.md) — کاتالوگ مرجع و واحد ابزارها:** همه ابزارهای پژوهش‌شده در گفت‌وگوهای قبلیِ این پروژه، نقش واقعی، وضعیت نصب/آرشیو/اتصال، MCP vs CLI، هزینه و اینکه در P00–P12 چه کار می‌کنند؛ به‌اضافه ابزارهای مفیدِ تطبیق‌شده با پروژه قدیمی. **این فایل تنها مرجع فعال ابزارها در پروژه جدید است.**
2. **[LEGACY-CROSSWALK.md](LEGACY-CROSSWALK.md) — تطبیق کامل فهرست قدیمی:** برای ۸۶ ردیف از بخش‌های A–F کاتالوگ قبلی در پروژه 09، مشخص شده ۱۴ ردیف قبلاً پوشش داده شده‌اند، ۳۲ ردیف برای استفاده احتمالی در پروژه سبک منتقل/دسته‌بندی شده‌اند و ۴۰ ردیف مربوط به 3D/GPU و کارهای خارج از محدوده نگه داشته نشده‌اند. **فهرست قدیمی تغییر نکرده است.**

**شمارش قابل بازبینی:** رجیستری ابتدایی ۶۳ ردیف A–G شامل ۷ ردیف ابزارهای agent-first/خارج از دامنه داشت. در ممیزی فعلی بخش G از شمارش و انتخاب حذف شد؛ **uv 0.13.5** در بخش A ثبت شد؛ ابزارهای مناسب کاتالوگ قدیمی در L نگهداری شده‌اند و MCPهای WordPress/Grav/Studio و **Anode/Ghost MCPB** در K/M نیز ثبت هستند. این‌ها ردیف‌های گروهی و هم‌پوشان دارند، بنابراین **نباید تعدادشان را به‌عنوان تعداد نرم‌افزار نصب‌شده یا محصولات یکتا گزارش کرد**. تطبیق ۸۶ ردیف تاریخی در crosswalk قرار دارد.

## انتخاب‌های فوری در مقابل گزینه‌های آینده
| فاز | پیش‌فرض انتخاب‌شده | ابزار فقط در صورت نیاز اثبات‌شده |
|---|---|---|
| P00–P04 تحلیل، طراحی و انتخاب | GPT-6 + منابع رسمی GitHub | Penpot، Grav/WP docs و مهارت‌های توسعه |
| P05 محیط اجرای مستقل | **Bridgerator متصل + Node/npm + Git + VS Code** | Vite محلی بسته‌بندی‌شده، با مجوز نصب پروژه |
| P06 طراحی و asset | HTML/CSS و تصاویر دارای مجوز | GIMP، Krita، Inkscape، Sharp، SVGO، Onlook، Webstudio، GrapesJS |
| P07–P08 ساخت سایت سبک | **M02 = Vanilla + Vite** فقط در صورت نیاز bundling | Astro، WordPress Playground/Studio، Gutenberg، WooCommerce در مسیر دیگر |
| P09 QA و عملکرد | Node test + مرورگر موجود/Playwright تست‌شده | axe, Lighthouse, Biome, SiteOne Crawler, Playwright MCP |
| P10 بررسی تخصصی | Bridgerator file/terminal + browser CLI | Chrome DevTools MCP, WordPress MCP Adapter, Grav MCP, MCP Inspector؛ Anode/Ghost MCPB فقط در صورت نیاز به GUI background |
| P11 تحویل | GitHub branch مخصوص پروژه + readback | انتشار فقط بعد از تأیید و بررسی هزینه |

## نتیجه ممیزی جدید بدون ایجنت‌ها
- ابزارهای اصلی ذکرشده در گفتگوهای گذشته (Vite, Astro, WordPress Playground/Studio/Adapter, WooCommerce, Gutenberg, GrapesJS, Puck, Playwright/DevTools MCP, Grav, onlook, SiteOne, WebScoop و غیره) در REGISTRY مستند هستند.
- سه مورد جاافتاده اصلاح شد: **uv** به‌عنوان ابزار محلی نصب‌شده؛ **Anode MCPB و Ghost MCPB** به‌عنوان سرورهای جایگزین کنترل GUI که فایل دانلودشان قبلاً شناسایی شده، اما وصل نشده‌اند.
- **gptme، Goose، OpenCode، Pi Coding Agent، GitHub Copilot، Dyad** و دیگر عامل‌های مستقل برای تصمیم و شمارش این پروژه **خارج از دامنه** هستند؛ حذف از رجیستری فعال به معنی uninstall آن‌ها از لپ‌تاپ نیست.

## تمایز سه وضعیت که در تمام ابزارها رعایت می‌کنیم
- **Connected to this ChatGPT:** فقط Bridgerator و GitHub connector در این پروژه تأیید شده‌اند. اگر ابزار دیگری از MCP پشتیبانی می‌کند، این به‌معنای اتصال فعال نیست.
- **Installed on laptop / CLI available:** فقط برای مواردی که در فهرست نصب یا PATH مستند زنده دارند. وجود فایل EXE، ZIP، TGZ، package و حتی مسیر قدیمی نصب مساوی فعالیت runtime نیست.
- **Researched / alternative:** ابزارهای OSS/سرویس‌های جدید که GitHub یا مستند رسمی دارند، ولی هنوز اجرا، pricing/overage، دسترسی حساب، اعتبار مجوز یا کیفیتشان در محیط پروژه تست نشده است.

## محل فیزیکی ابزارهای قبلی؛ صرفاً مرجع و بدون کپی
- آرشیو روی PC: `C:\Users\Mrn7206\Downloads\DJMRN-Website-Tools\`
- کاتالوگ GitHub قدیمی و متعلق به **پروژه 09**: `09-self-marketing-website/design/home/TOOLING-DOWNLOAD-INSTALL-CATALOG.md` در branch main.
- **تغییری در این دو منبع داده نشده است.** فایل‌های ثانویه third-party به repo جدید منتقل نشده‌اند؛ فقط نام، آدرس upstream، شواهد مربوط و تصمیم انتخاب **مستند** شده‌اند.

## قواعد تغییر
- No automatic installs/activation/permission changes; OSS بودن به معنی هزینه صفر hosting/API نیست.
- No duplicated registries: فایل `../02-TOOLS-CATALOG.md` یک اشاره‌گر به `REGISTRY.md` است.
- No files or run from 09-heavy 3D/Codex; no Third-party vendor shader/asset copies; no secrets/private archives.
- هر ابزار تازه پس از اثبات نیاز، source/licensing, quota/price, permissions, RAM, reversibility و smoke test در همین رجیستری بررسی شود.
