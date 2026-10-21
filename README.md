# DJMRN — Freelance Operations

**حافظهٔ عملیاتی دائمی و خصوصی برای یافتن پروژه، فعالیت در سایت‌ها، تهیه و ارسال پیشنهاد با تأیید کاربر، اجرای سفارش، ابزارها و تجربه‌های قابل بازیابی.**

**CURRENT authority of this freelance project: THIS GitHub repository.** اسناد Notion و فایل‌های قبلی فقط منابع تاریخی‌اند؛ مراجعه یا ثبت در Notion برای اجرای این پروژه الزامی نیست و بدون درخواست صریح کاربر هیچ تغییری در آن انجام نمی‌شود. مخزن‌های Research-Bridge و Intelligent-Assistant مستقل و بدون تغییر می‌مانند.

## شروع هر گفت‌وگو یا همیار جدید (کم‌مصرف و دقیق)

1. [PROJECT-RULES.md](PROJECT-RULES.md) و [CURRENT-STATUS.md](08-operations-and-continuity/CURRENT-STATUS.md) را بخوان.
2. [WORK-INDEX.md](08-operations-and-continuity/WORK-INDEX.md) را بخوان و **فقط پروندهٔ مربوط به کار فعلی** را باز کن.
3. برای ثبت عملیات: [HANDOFF.md](08-operations-and-continuity/HANDOFF.md) و سپس [ACTIVITY-LOG.md](08-operations-and-continuity/ACTIVITY-LOG.md) را بخوان.
4. اگر تصمیم جدی یا ابهامی وجود دارد: [ARCHITECTURE.md](ARCHITECTURE.md)، [تصمیم‌ها](08-operations-and-continuity/decisions/DR-0001-github-operational-authority.md) و [AGENTS.md](AGENTS.md). لازم نیست برای هر سؤال ساده تمام آرشیو را بخوانی.

## دسته‌بندی موجود و حفظ‌شده

| مسیر | مأموریت | نقطه شروع |
|---|---|---|
| `01-platforms` | ۱۳۱۳ سایت تاریخی، برنامهٔ A/B، سایت‌های ایرانی | [فهرست ۱۳۱۳](01-platforms/discovery/1313-sites.csv) |
| `02-screening` | سابقهٔ کامل بررسی و کنارگذاری | [راهنما](02-screening/README.md) |
| `03-accounts-and-operations` | وضعیت ثبت‌نام و صف اقدام سایت‌ها | [۷ سایت در صف](03-accounts-and-operations/current-7-site-queue.csv) |
| `04-opportunities` | آگهی، تناسب، پیشنهاد، مذاکره و نتیجه | [روش ثبت](04-opportunities/WORKFLOW.md) |
| `05-client-projects` | سفارش، اجرا، تحویل، کنترل کیفیت | [روش اجرا](05-client-projects/WORKFLOW.md) |
| `06-tooling` | نرم‌افزار و ابزار **واقعاً به‌کاررفته** | [Tool Registry](06-tooling/TOOL-REGISTRY.md) |
| `07-lessons-and-playbooks` | درس‌های قابل استفادهٔ مجدد | [فهرست تجربه‌ها](07-lessons-and-playbooks/LESSONS-INDEX.md) |
| `08-operations-and-continuity` | وضعیت جاری، جریان کار، رویدادها، تصمیم‌ها | [وضعیت جاری](08-operations-and-continuity/CURRENT-STATUS.md) |

## اصل ثبت هر کار
**Evidence → Decision → Approved Action → Observed Result → Reusable Lesson → Next Action.**

سایت، حساب، آگهی، پیشنهاد، سفارش، ابزار و درس تجربه **یک موجودیت نیستند**؛ با شناسه و لینک به هم وصل می‌شوند. CSVهای تاریخی را به وضعیت زنده تبدیل نکن. هیچ رمز/توکن/مدرک KYC/اطلاعات مشتری را در GitHub نگهداری نکن، حتی در مخزن خصوصی.

## آمار «فقط تاریخچهٔ بازیابی‌شده»
۱۳۱۳ سایت کشف‌شده (ردیف ۳۱۹ URL ندارد)؛ دسته‌بندی خارجی A=۲۵ / B=۱۷؛ صف مستقل عملیاتی ۷ سایت. فهرست مستقل A/B ایرانی و تجربه‌های کاربران ایرانی هنوز [UNVERIFIED](provenance/MIGRATION-GAPS.md) است. «سایت کشف‌شده» نه «قابل اقدام» است و نه «درآمد کسب‌شده».

## پژوهش معماری و آزمایش
- [بررسی و مقایسهٔ روش‌های واقعی](provenance/ARCHITECTURE-RESEARCH-2026-10-21.md)
- [کیفیت، آزمون و بازیابی](08-operations-and-continuity/QUALITY-CHECKS.md)
- `python scripts/validate_repository.py` (فقط خواندنی، کتابخانهٔ استاندارد Python، بدون نصب یا مصرف API)
