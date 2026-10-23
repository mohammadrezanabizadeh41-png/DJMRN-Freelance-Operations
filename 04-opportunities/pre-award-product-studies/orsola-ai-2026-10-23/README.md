# ORSOLA-20261023 — پرونده پژوهش و آماده‌سازی تبلیغ ویدیویی

**شناسه یکتا:** PREAWARD-ORSOLA-20261023-001
**تاریخ شواهد:** 2026-10-23؛ Europe/Berlin
**منبع معرفی کار:** USER_REPORTED — یک وب‌سایت محصول برای ساخت ویدیوی تبلیغاتی به کاربر معرفی شده است.
**محصول:** [Orsola AI](https://www.orsola.ai/en) / سازنده طبق توضیح رسمی: Shuark Inc. کانادا
**وضعیت:** SITE_MAP_COMPLETE + OFFICIAL_DOCS_REVIEW_COMPLETE + AD_READINESS_BRIEF_COMPLETE
**حدود اعتبار:** تحقیق از وب‌سایت عمومی؛ عملکرد واقعی، پذیرش سفارش، قرارداد، نسخه دمو، ساخت ویدیو، تحویل و دستمزد **UNVERIFIED / NOT DONE**.
**مکان پروژه:** فقط DJMRN-Freelance-Operations؛ نه DJMRN-Research-Bridge، نه DJMRN-Intelligent-Assistant، نه Notion.
**هشدار انتشار:** وضعیت مخزن GitHub در 2026-10-23 برابر PUBLIC مشاهده شد؛ در این سند فقط اطلاعات عمومی محصول، روش تحقیق و نتایج غیرمحرمانه استفاده شده است.

## ۱. هدف و تصمیم‌های کاربر
- ابتدا وب‌سایت را مانند یک «محصول تبلیغاتی» شناسایی کنیم و صرفاً از صفحه اول برداشت نکنیم.
- ابزارهای موجود و پلاگین‌های جدید را بررسی کنیم؛ نصب افزونه غیرضروری، مصرف پولی و پیچیدگی بی‌مورد ممنوع.
- سه مرحله انجام شود: (1) Map/Discovery، (2) Product research، (3) Advertising dossier.
- تجربه واقعی، منابع، محدودیت‌ها و روش‌های قابل استفاده مجدد فقط در همین مخزن فریلنسری ثبت شود.
- دامنه اجرایی پیشنهادی در این مرحله: کار **یک‌باره با خروجی ویدیویی مشخص** در صورت دریافت سفارش واقعی، نه استخدام یا قرارداد نگهداری مستمر.

## ۲. مرحله اول — کشف ساختار سایت (DIRECTLY_OBSERVED)
با اتصال فعلی Firecrawl، نقشه سایت استخراج شد: **۴۱۰ URL عمومی** در چهار نسخه en / fr / es / ar؛ نمونهٔ نخست شامل **۱۰۲ آدرس انگلیسی** و حدود ۸۳ لینک راهنما برای هر زبان بود. لینک‌های زبان‌های مختلف عمدتاً محتوای هم‌موضوع دارند؛ بنابراین انگلیسی به‌عنوان زبان پژوهش نخست انتخاب شد و نسخه‌های دیگر به‌عنوان مقایسه نگه داشته می‌شوند.
دامنه صفحات کشف‌شده: Home, Features, About, Pricing, Contact, Download, Security, Privacy, Terms, Support, blog و مقالات جزئی درباره حساب، گفتگو، ایمیل، تقویم، فایل، تماس، جلسه، یادآوری، هزینه، تغذیه، تنظیمات و ویدیو.
فهرست کامل قابل بازیابی از [نقشه عمومی و مرحله اول](SITE-INVENTORY.md)؛ وجود URL در فهرست به معنی باز شدن یا صحت عملکرد آن نیست.

## ۳. مرحله دوم — تحقیق محصول و دسته‌بندی قابلیت‌ها
**روش:** Firecrawl تعداد **۱۰۳ آدرس انگلیسی** را Crawl کرد. پاسخ اولیه شامل **۲۵ URL با محتوای عمومی ۴۰۴** بود؛ حداقل یک صفحه در Scrape مجدد به‌درستی بازیابی شد. بنابراین ادعای «۲۵ صفحه خراب سایت» اثبات نشده؛ خطای استخراج یا پاسخ متغیر محتمل است. مطالب با صفحات رسمی و مستندات وب تطبیق داده شدند، ولی **هیچ‌گونه login یا تست واقعی داخل Orsola انجام نشد**.

**هویت و هدف:** دستیار شخصی/حرفه‌ای AI که از مکالمه برای خواندن، تهیه خروجی، زمان‌بندی و هدایت کار میان ابزارهای مختلف استفاده می‌کند. تمایز مورد ادعای شرکت «از مکالمه تا اقدام» و اتصال Google Workspace و Microsoft 365 است؛ کیفیت اجرا مستقلاً ثابت نشده است. [Home](https://www.orsola.ai/en) / [About](https://www.orsola.ai/en/about) / [Features](https://www.orsola.ai/en/features).

### ماتریس امکانات و شرط تبلیغ

| حوزه | آنچه شرکت معرفی کرده | شرط و محدودیت | شاهد رسمی |
|---|---|---|---|
| چت و برنامه‌ریزی | پاسخ، نگارش و هدایت وظایف | دقت AI و کارکرد عملی آزمون‌نشده | [features](https://www.orsola.ai/en/features) |
| ایمیل Gmail و Outlook | جستجو، خلاصه، پیش‌نویس، ارسال | OAuth، تأیید ارسال، اختلاف راهنما در Archive و Trash | [email](https://www.orsola.ai/en/support/connections/email) |
| تقویم Google/Outlook | خواندن، ساخت/تغییر قرارها | نیاز به مجوز و بررسی رفتار تأیید نهایی | [calendar](https://www.orsola.ai/en/support/connections/calendar) |
| Google Drive / OneDrive / Sheets | بازیابی و کار با فایل، پوشه و برگه | اختلاف متن راهنما در دامنه مجوز Google Drive؛ بررسی OAuth لازم | [files](https://www.orsola.ai/en/support/connections/files) |
| اسناد و رسانه ورودی | PDF/DOCX/XLSX/CSV، تصویر و صوت | تا ۵ فایل در پیام و ۲۰MB برای هر فایل طبق راهنما؛ هنوز تست نشده | [supported files](https://www.orsola.ai/en/support/files/supported-files) |
| Agentهای آماده | Task، Meeting، Phone، Expense، Nutrition، Video | بعضی وابسته به پلن و اعتبار | [agents](https://www.orsola.ai/en/support/chat/choose-a-helper) |
| Agent سفارشی | System Prompt و انتخاب capability | پلن Pro یا Max؛ عملکرد تست‌نشده | [custom](https://www.orsola.ai/en/support/settings/build-your-own-helper) |
| وظایف تکراری و زمان‌بندی | یادآوری، کار بعداً یا هفتگی | تأیید تحویل اعلان/خطاها لازم | [tasks](https://www.orsola.ai/en/support/reminders/set-one-up) |
| جلسه و صوت | ضبط، رونویسی، تفکیک گویندگان، ترجمه، خلاصه | رضایت افراد، زبان مختلط، اینترنت، مصرف اعتبار | [meeting options](https://www.orsola.ai/en/support/audio/recording-options) |
| تلفن هوشمند | پاسخ تماس، تماس خروجی، SMS و پیگیری | فقط Max، شماره US/Canada، هزینه جداگانه، بدون اورژانس | [phone](https://www.orsola.ai/en/support/audio/get-a-phone-number) |
| هزینه‌ها | ثبت رسید، دسته‌بندی و گزارش | دقت و نرخ ارز تست نشده | [expense](https://www.orsola.ai/en/support/spending/log-an-expense) |
| تغذیه | غذا، بارکد، آلرژی، آب/وزن | بزرگسالان، رضایت مجزا، بازار US/CA، نه توصیه پزشکی | [nutrition](https://www.orsola.ai/en/support/nutrition/start-with-nutrition) |
| تولید سند، عکس و ویدیو | خروجی رسانه، Video Agent برای آگهی/اسلایدشو | تضاد شمول در پلن‌ها؛ هزینه اعتباری و کیفیت نامعلوم | [video](https://www.orsola.ai/en/support/video/make-a-video) |
| جستجوی وب | جستجوی محتوای روز در مکالمه | صحت نتیجه باید بررسی شود | [features](https://www.orsola.ai/en/features) |
| حافظه | attributes و دستورالعمل‌های ثابت | کل گفت‌وگوهای گذشته به هر گفت‌وگوی جدید منتقل نمی‌شوند | [memory](https://www.orsola.ai/en/support/settings/what-orsola-remembers) |
| هماهنگی ابزارها | ایمیل → تقویم → پیش‌نویس؛ جلسه → Task | مثال رسمی، نه شواهد موفقیت تست end-to-end | [features](https://www.orsola.ai/en/features) |

### تعرفه و ارزش تجاری در تاریخ بررسی
بر اساس [Pricing](https://www.orsola.ai/en/pricing)، قیمت تبلیغی دوره بتا: Free=$0/1000 credit ماهانه؛ Plus=$3/3000؛ Pro=$5/5000؛ Max=$8/8000. تعداد اتصال ذکرشده در راهنما به‌ترتیب ۱، ۲، ۵ و نامحدود است. **نرخ‌ها فقط snapshot هستند**؛ قیمت‌ها ممکن است تغییر کنند، مصرف تولید صوت/ویدیو و تلفن جداگانه است و هیچ مصرف یا پرداختی مجاز نشده. Video Agent ممکن است در Free در فهرست دیده شود ولی جدول Pricing ساخت تصویر/ویدیو را در Free/Plus شامل نمی‌داند: **UNVERIFIED**.

### محدودیت‌های اساسی حقوقی/محصولی
- [Terms §5.4](https://www.orsola.ai/en/terms): سرویس در بتای فعلی **برای ساکنان آمریکا و کانادا** ارائه و هدف‌گذاری می‌شود. چندزبانه‌بودن به معنی عرضه جهانی نیست.
- [Download](https://www.orsola.ai/en/download): iPhone/iPad، Android و Windows در تاریخ تحقیق «Coming soon» نشان می‌دهند. بعضی راهنماها از اپ منتشرشده سخن گفته‌اند؛ ادعای «اپ موبایل آماده دانلود» بدون بررسی انتشار مجاز نیست.
- رابط EN/FR/ES/AR در [language settings](https://www.orsola.ai/en/support/settings/language)؛ ادعای زبان‌های بیشتر در مکالمه به معنی رابط فارسی نیست.
- [Security](https://www.orsola.ai/en/security) و [Privacy](https://www.orsola.ai/en/privacy): OAuth، رمزنگاری، کنترل دسترسی و عدم استفاده از داده کاربر برای آموزش مدل، **ادعای رسمی فروشنده** هستند، نه حسابرسی مستقل. داده اصلی طبق سند در Azure آمریکا و بعضی پردازش‌ها در ارائه‌دهندگان ثالث است.
- بعضی صفحات Features از GDPR-compliant می‌گویند اما Terms/Privacy دامنه خدمات را US/CA تعیین کرده‌اند و خودشان EEA را هدف فعلی نمی‌دانند؛ **از ادعای GDPR-certified/GDPR-compliant در تبلیغ بدون تأیید حقوقی خودداری شود**.
- پیام‌های ارسالی، تغییر تقویم، تماس و عملیات بیرونی ممکن است برگشت‌ناپذیر باشند. «همه اقدامات همیشه نیازمند تأیید مستقل‌اند» از اسناد اثبات نشده؛ برای بعضی workflowهای ازقبل مجاز، اقدام خودکار توصیف شده است.

### ده ابهام باز و مسیر راستی‌آزمایی
U01: اپ موبایل/ویندوز: صفحه دانلود vs راهنما → لینک زنده فروشگاه.
U02: پلن Free و Video Studio → صفحه entitlement و quote واقعی.
U03: دامنه مجوز Google Drive → صفحه واقعی OAuth با حساب تست.
U04: توانایی Gmail برای archive/Trash/label → صندوق آزمایشی.
U05: قواعد تأیید تقویم/تلفن → سناریو عملی با داده مصنوعی.
U06: موفقیت ۱۳ قابلیت و هماهنگی چند ابزار → یک تست عملی end-to-end.
U07: زبان فارسی در چت و رابط → آزمایش دو مسیر مستقل.
U08: حق استفاده از لوگو، UI، تصاویر و ادعاها → اجازه صاحب برند.
U09: هدف جغرافیایی و تبلیغ خارج از US/CA → تأیید حقوقی و Terms تازه.
U10: ۲۵ پاسخ Crawl ناموفق → retest انتخابی و browser مستقل.

## ۴. مرحله سوم — استراتژی ارتباطی/تبلیغاتی (ANALYTICAL, NOT APPROVED)
**جایگاه پیشنهادی:** دستیار AI که بخشی از روز پراکنده بین ایمیل، تقویم و فایل را در یک جریان مکالمه‌ای مدیریت می‌کند؛ تأکید بر کمک واقعی و تأیید کاربر، نه وعده اتوماسیون جادویی.
**پیام محوری پیشنهادی:** “One AI. Your tools. Your day, handled.” (عبارت برند در وب‌سایت؛ استفاده نهایی با تأیید صاحب برند).
**مخاطب اولویت ۱:** بنیان‌گذاران، مدیران کسب‌وکار کوچک و فریلنسرهای US/CA؛ **اولویت ۲** حرفه‌ای‌ها با ایمیل/جلسات متعدد؛ **مشروط** زندگی روزمره و تغذیه. این‌ها فرضیه مخاطب‌اند، نه داده سنجش واقعی بازار.
**CTA پیشنهادی:** “Start Free” همراه اشاره روشن به محدودیت credit و بازار مجاز؛ قبل از انتشار قیمت/شرایط تازه تأیید شود.

### ماتریس ادعا و تصویرِ قابل‌نمایش
| جمله پیشنهادی | نوع شاهد | تصویر مجاز پس از تست | وضعیت |
|---|---|---|---|
| “Bring email and calendar into one conversation.” | صفحات رسمی email/calendar | نمایش سناریوی synthetic | CANDIDATE؛ دمو لازم |
| “Ask for the next step, not just an answer.” | جایگاه رسمی در Home/Features | چت + پیش‌نویس واقعی | CANDIDATE |
| “Review the draft before it is sent.” | راهنمای رسمی email | UI واقعی confirmation | CANDIDATE؛ تست |
| “Start free with monthly credits.” | Pricing بتا | متن نرخ تازه با شرط‌ها | CONDITIONAL |
| “Save 10 hours each week” | پژوهش مستقل ندارد | هیچ | REJECT |
| “Unlimited free AI video generation” | با pricing ناسازگار | هیچ | REJECT |
| “Available worldwide and on Android/iOS/Windows now” | برخلاف Terms/Download | هیچ | REJECT |
| “100% guaranteed secure, certified, never wrong” | بدون آزمون/حسابـرسی | هیچ | REJECT |
| “Fully autonomous, every action without review” | با سازوکار تأیید در تضاد | هیچ | REJECT |

### سه جهت خلاقه قابل‌بررسی، نه تصمیم نهایی
**A — نمایش واقعی محصول، ۳۵–۴۵ ثانیه (اولویت تحلیلی):** مشکل چند برنامه، ورود به Orsola، دستور نمونه، بررسی email/calendar، پیش‌نویس نتیجه، کنترل کاربر، CTA. مناسب‌ترین مسیر فقط **اگر** UI دمو با داده امن تأیید شود.
**B — اکسپلینر هویت برند، ۲۰–۳۰ ثانیه:** موشن‌گرافیک برای پراکندگی کارها و یک دستیار. اگر UI قابل‌استفاده نداریم، نمایش ایده‌ها باید «تصویری/illustrative» باشد نه جعل صحنه اجرای واقعی.
**C — مونتاژ کاربردها، ۴۵–۶۰ ثانیه:** فریلنسر/مدیر/کار روزمره؛ هزینه و ریسک ادعاها بیشتر؛ پس از تأیید کاربردها.

### طرح پیشنهادی سکانس نسخه A (DRAFT، نه اسکریپت مصوب)
| زمان تقریبی | محتوا | کنترل صحت |
|---|---|---|
| ۰–۵ | چند تب و پیگیری روزانه | اغراق عددی درباره زمان تلف‌شده ممنوع |
| ۵–۱۰ | معرفی برند Orsola | تأیید لوگو و هویت بصری |
| ۱۰–۱۸ | درخواست: «ایمیل مشتری را بخوان، پنجشنبه را بررسی و جواب آماده کن» | داده مصنوعی و حساب مجاز |
| ۱۸–۲۸ | خواندن ایمیل و بررسی تقویم | تنها پس از تست واقعی؛ Mockup باید مشخص باشد |
| ۲۸–۳۵ | پیش‌نویس + تأیید قبل از ارسال | رفتار UX و متن واقعی ثبت شود |
| ۳۵–۴۵ | پایان، شعار، CTA | قیمت/پلن/Geo تازه، حق نشر و مشخصات خروجی |

### پرسش‌های لازم برای تبدیل به سفارش واقعی
- صاحب محصول/نماینده مجاز و رضایت نشر لوگو، UI و نشان‌های تجاری کیست؟
- کدام بازار/زبان/پرسونا و کدام رسانه انتشار؟ وب، YouTube، Reels، تبلیغات پولی؟
- هدف کمپین و CTA، مدت و تعداد نسخه، نسبت تصویر، صداگذاری، زیرنویس، محدودیت بودجه، موعد، دفعات اصلاح و مالکیت خروجی چیست؟
- داده تست ساختگی، حساب sandbox و نمایشی بدون اطلاعات مشتری واقعی در دسترس است؟
- چه ادعاهایی را صاحب محصول صریحاً تأیید و امضا می‌کند؟
- آیا هدف دقیقاً ویدیوی یک‌باره با تحویل نهایی است؟ هنوز **UNVERIFIED**.

### برنامه اعتبارسنجی و کنترل کیفیت قبل از ساخت
1. دامنه کاری و حقوق برند/داده با تأیید صریح صاحب سفارش.
2. آزمایش کم‌خطر با ایمیل و تقویم **مصنوعی**: دستور → دسترسی → پیش‌نویس → confirmation؛ موفقیت/خطا مستند.
3. تست خطاهای مجوز وصل‌نشده، گیرنده مبهم، کمبود اعتبار و انصراف.
4. طراحی 16:9 اصلی و نسخه 9:16 فقط اگر سفارش بخواهد؛ خوانایی متن گوشی، Safe area، موسیقی/گویندگی دارای مجوز، کپشن.
5. هر ادعای روایی به یک منبع یا دمو واقعی وصل شود؛ تاریخ و تاییدکننده داشته باشد.
6. export/test/video delivery/client approval مستند و جداگانه ثبت شود؛ این مرحله هیچ‌کدام انجام نشده است.

## ۵. ابزارها، هزینه و کیفیت شواهد
- ابزار اصلی: **Firecrawl متصل** Map/Crawl/Scrape؛ هیچ پلاگین تازه‌ای نصب نشده است.
- سهمیه بررسی‌شده: ماهانه ۱۰۰۰ اعتبار. موجودی‌های مشاهده‌شده در این مسیر: ۸۹۲ پیش از مطالعه، ۸۸۹ پس از نقشه‌برداری، ۷۶۶ بعد از مرحله دوم و بازیابی‌ها. این‌ها snapshotهای حساب‌اند، نه نرخ تبدیل یا تأیید پرداخت.
- جست‌وجوی وب برای بررسی مستقل محتوای رسمی انجام شد. TinyFish/مرورگر پولی یا ساخت محتوا با مدل‌های مولد فعال نشدند.
- **پژوهش وب ≠ آزمایش محصول**؛ AI synthesis نظر تحلیلی است. لینک‌های رسمی Orsola مرجع ادعاهای سازنده‌اند و اظهارات رسمی سازنده لزوماً اثبات مستقل نیستند.
- مجوز عمومی GitHub دیده شد؛ اسرار، پیام محرمانه مشتری، دارایی محافظت‌شده یا اطلاعات شخصی در مخزن ثبت نشده است.

## ۶. نتیجه و ادامه
**تحویل این مرحله:** dossier پژوهشی و ماتریس ادعا/ریسک و آماده‌سازی تصمیم تولید، بدون ویدیوی ساخته‌شده یا شواهد قرارداد.  
**آستانه شروع فاز ساخت:** شرح سفارشِ محدود و قابل تحویل + تأیید مالک برند + دمو امن + دامنه واقعی قابلیت‌ها + زمان/بودجه/فرمت‌های خروجی + approval روشن.
**پرونده‌های تکمیلی:** [SITE-INVENTORY](SITE-INVENTORY.md) · [Stage 2 focused evidence](PRODUCT-RESEARCH.md) · [Creative detailed brief](ADVERTISING-STRATEGY.md) · [Journal](../../../08-operations-and-continuity/sessions/ORSOLA-SESSION-001.md) · [Reusable lesson](../../../07-lessons-and-playbooks/LESSON-2026-005.md).

## ۷. مرحله چهارم و پنجم — ارزیابی تکمیلی پس از شناسایی نیاز (۲۰۲۶-۱۰-۲۳)
پس از سه مرحله اولیه، کمبود «شناخت بازار، رقبا، سگمنت مخاطب، مسیر تبدیل و شواهد عملکرد واقعی» تشخیص داده شد. بر اساس خواسته کاربر، مرحلهٔ چهارم پژوهش کتابخانه‌ای اجرا شد و سپس مرحلهٔ پنجم برای دسته‌بندی فرصت‌های احتمالی آغاز و به یک فهرست ۳۲ ایدهٔ مشروط تبدیل شد. این مرحله ثبت قرارداد، انتخاب کانال برنده یا آزمون تبلیغات نیست.

- [**STAGE-4-MARKET-AND-CAMPAIGN-VALIDATION.md**](STAGE-4-MARKET-AND-CAMPAIGN-VALIDATION.md): مقایسه دسته‌های رقابتی با منابع رسمی Lindy/Fyxer/Motion/Reclaim/Zapier؛ فرضیه‌های مخاطب؛ کانال‌ها؛ تعریف قیف Conversion/Activation/Retention/WTP؛ شواهد و اطلاعاتی که هنوز از صاحب محصول لازم است.
- [**STAGE-5-ADVERTISING-OPPORTUNITY-CATALOG.md**](STAGE-5-ADVERTISING-OPPORTUNITY-CATALOG.md): **۳۲ نامزد برای پروژه‌های تبلیغاتی تک‌مرحله‌ای** در ۵ دسته، با اولویت آمادگی P1/P2/P3، پیشنهاد شکل خروجی، مجوزها و تست‌های لازم.
- **یافته جدید:** شعار «AI که کار انجام می‌دهد» در بازار رقبا نیز دیده می‌شود؛ تمایز واقعی نیازمند نمایش سناریوی درست و اندازه‌گیری است. سند Orsola هدف‌های Activation، Retention و Willingness to Pay را بیان می‌کند، اما داده محصول/کمپین در دسترس ما نیست.
- **وضعیت:** STAGE4_PUBLIC_DESK_RESEARCH_COMPLETE + STAGE5_CONDITIONAL_IDEA_CATALOG_COMPLETE؛ REAL_PRODUCT_DEMO, BRAND_APPROVAL, CUSTOMER_ANALYTICS, CAMPAIGN_TEST, CONTRACT, VIDEO_DELIVERY = NOT_DONE.
- **گام بعدی:** کسب اجازه برند و شرح سفارش با هدف/مخاطب/رسانه/دارایی‌ها و تست دمو با داده مصنوعی. هنوز هیچ ادعای موفقیت واقعی کمپین یا درآمد مجاز نیست.

## CURRENT ADDENDUM — 2026-10-23 — اعلام همکاری مستقیم و دامنه تبلیغاتی جهانی
این داده‌ها USER_REPORTED هستند و برداشت‌های محدودتر پیشین درباره مخاطب خلاقه را اصلاح می‌کنند:
- کاربر مستقیم با برند Orsola همکاری دارد و مجوز گسترده‌ای برای ساخت نمونه با لوگو و هویت برند اعلام کرده است. **اجازه نمونه‌سازی: اعلام‌شده توسط کاربر**؛ قرارداد نهایی، پذیرش خروجی، حقوق دارایی‌های ثالث، انتشار عمومی، اکانت تبلیغاتی و پرداخت/فروش مستقل تأیید نشده‌اند.
- اهداف مشترک: G1 معرفی برند، G2 معرفی سایت، G3 افزایش ثبت‌نام، G4 فعال‌سازی اولیه، G5 فروش اشتراک و G6 بازگشت کاربر به‌عنوان هدف مکمل.
- بازار **خلاقه و پژوهش** بین‌المللی و چندزبانه است؛ محدودیت ایران معیار حذف مخاطبان نیست. **بازار جهانی محتوا به معنی تأیید فروش جهانی سرویس نیست**؛ در Terms تاریخچه‌ای US/Canada ذکر شده بود و متن تازه Terms از مسیر عمومی فقط پوسته جاوااسکریپت برگرداند. GEO signup/checkout نیازمند اطلاعات جدید صاحب محصول است.
- [مرحله چهارم CURRENT v2 — Global full funnel](STAGE-4-MARKET-AND-CAMPAIGN-VALIDATION.md): هدف، زبان/مخاطب، کانال‌ها، سنجش.
- [مرحله پنجم CURRENT v2 — ۳۲ فرصت با نگاشت اهداف](STAGE-5-ADVERTISING-OPPORTUNITY-CATALOG.md): پرونده‌های O01–O32 حفظ شده و شش بسته نمونه تعریف شده‌اند.
- [بسته ساخت نمونه بین‌المللی](INTERNATIONAL-PILOT-CREATIVE-KIT.md): شش سناریوی ۲۰ تا ۴۰ ثانیه‌ای، متن انگلیسی، صحنه‌ها، قالب‌ها، شرایط محتوای حقوقی و نسخه‌سازی.
- **گام نمونه حداقلی** P-A: موشن‌گرافیک جهانی ۲۰ثانیه‌ای با برچسب Concept و بدون شبیه‌سازی فریبنده رابط واقعی؛ P-D پس از دموی ایمن ساختگی. هیچ ویدیویی واقعاً تولید/انتشار/تحویل نشده است.

## CURRENT PREPRODUCTION SYSTEM — 2026-10-23 · قبل از تولید اولین ویدیو
بنابر درخواست جدید کاربر، پیش از پرامپت‌نویسی و اجرای AI video باید **چهار بانک کاربردی قابل‌بازیابی** برای هر شش هدف G1–G6 نگهداری شود:
1. [بانک داده‌های ثابت برند، دارایی‌ها، URLها و درخواست فایل از کاربر](AD-MASTER-DATA-AND-ASSET-REGISTRY.md): لوگو/مارک/رنگ‌های استخراج‌شده، CTA، عکس‌های واقعی سایت، شناسه S-001…S-014 و B-001…B-013، دسترسی غیرمحرمانه و موج‌های A/B/C.
2. [روش‌ها و مرجع‌های تبلیغات AI/SaaS](AD-CREATIVE-METHODS-REFERENCE-RESEARCH.md): ۱۶ تکنیک روایی/موشن/UI، Google ABCD، TikTok Top Ads و کتابخانه‌های آگهی، نمونه‌کارهای بصری و case studyهای سنجش‌دار با محدودیت انتقال نتایج.
3. [کتابخانه پرامپت و روش‌های Seedance/Runway](AD-GENERATION-PROMPT-PLAYBOOK.md): شش پرامپت تصویری مستقل، پرامپت کارگردان خلاقه/گویندگی/لوکالیزه‌کردن، مدل/ورژن/هزینه و وضعیت آزمایش.
4. [خط تولید، ویرایش، کنترل کیفیت و قرارداد فایل‌نام‌گذاری](AD-PRODUCTION-WORKFLOW-AND-QA.md): ده گیت، ثبت مدرک، محدودیت نمایش UI جعلی، تهیه فایل 16:9/9:16، VO/captions، تحویل و بازبینی.
**داده قطعی موجود:** نام Orsola، دامنه، برخی لوگوهای رسمی SVG، font و CSS رنگ‌های فعلی سایت (توکن‌ها *پیشنهادی تا تأیید Brand Kit*). USER_REPORTED اجازه استفاده از برند برای ساخت نمونه به قوت خود باقی است.
**پرسش کوچک در مرحله بعد:** آیا لوگو/رنگ فعلی سایت مورد تأیید است یا برند کیت تازه دارد؟ تصاویر/ویدیوهای داخل نرم‌افزار برای G4 به بعد با داده ساختگی دریافت شود؛ آدرس فیزیکی/موبایل شخصی لازم نیست.
**وضعیت:** PREPRODUCTION_FRAMEWORK_AND_PROMPTS_RESEARCHED / NO_VIDEO_GENERATED / NO_PAID_TOOL_ACTIVATED. مخزن PUBLIC است؛ صرفاً منابع عمومی و نکات غیرمحرمانه ثبت شد.

## ORSOLA-005 — 2026-10-23 — USER-CONFIRMED STYLE + ADVERTISING LANE
- **USER_CONFIRMED** settings: current website logos/colors as approved reference for sample creative, HYBRID cinema+motion/typography/UI, EN narration. No actual video created.
- [**CREATIVE-DECISION-001: storyboard P-A v1**](AD-DIRECTION-DECISION-AND-PILOT-PA-STORYBOARD-v1.md): 20-second six-shot human-first global brand sample “Less Switching. More Living”; includes exact VO draft, timestamped frame descriptions and asset needs, and makes no untested runtime claim.
- **NEW independent ad lane**: everyday nontechnical users, family/organizer, students and professionals; convenience of voice/text requests, recurring schedules and reminders, controlled cross-tool handoff, quality-of-life and *testable* value vs fragmented tools. [First-party competitor and fairness research](AD-LANE-SIMPLICITY-TIME-VALUE-COMPETITOR-RESEARCH.md).
- [**SCENARIOS-001: 12 original human-use story treatments + 12 hooks**](AD-SCENARIO-LAB-UNIVERSAL-USE-CASES-AND-COMPETITOR-INSIGHTS.md): scenes and draft scripts for ordinary use plus working life, mapped across campaigns G1–G6; NOT measured winning creatives.
- **Competitive caution:** Lindy/Motion/Reclaim/Fyxer/Zapier/Calendly provide overlapping scheduling/AI/automation; Orsola uniqueness, time savings, cheaper completed tasks or zero-setup are unproved. The comparison requires same dummy task, successful outcome, active minutes, errors, permissions and credit-inclusive billing; unverified claims barred.
- Official [Tasks](https://www.orsola.ai/en/support/reminders/set-one-up) documents recurring scheduled work with quotas; [Voice](https://www.orsola.ai/en/support/chat/push-to-talk) documents speech with credit use. Simple request doesn't eliminate OAuth, user review, time-zone validation, account/credit requirements.
- **NEXT:** revise storyboard based on user preference or create approved still/keyframes in next turn; NO video generation, service activation, publication or price claim in this turn.
