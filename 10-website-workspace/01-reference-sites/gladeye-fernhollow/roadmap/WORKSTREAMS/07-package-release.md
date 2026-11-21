# P8 — بستهٔ خصوصی، حفظ منبع و تصمیم انتشار

همهٔ gateها در این سند **NOT_EXECUTED** هستند. P8 فقط نام workstream برنامه است؛ شماره/phase اصلی X45 تغییر نمی‌کند: G40/G41/G43–G45 در checklist اصلی P07 هستند. هیچ HTML، بسته، preview، commit یا deployment اینجا ساخته/انجام نشده است. فقط baseline اصلی Fernhollow و ۴۳ قطعهٔ X44 هدف‌اند؛ roadmap وب‌سایت مستقل DJMRN و تغییر هنری جدید موضوع این سند نیست.

## شاهد، مسیر و مسئولیت

`A` ریشهٔ آرشیو خصوصی در `PROJECT.json`. منابع زیر نسبت به `A/OFFLINE-CODEX-HANDOFF/` و از `SOURCE-ROUTES`/index resolve می‌شوند. هر resource به رکورد واقعی index/alias ten-asset وصل می‌شود؛ شناسه یا hash فرضی پذیرفته نیست.

| منبع خوانده‌شده | SHA-256 |
|---|---|
| `X44/PROMPT-EVIDENCE-TRACE.csv` | `c33f1a3dfac1ff2824d55dd651c27b23665ad8a69d1f48b2a93e73a6c1dc642b` |
| `X45/X45-EXECUTION-CHECKLIST.csv` | `e4b44acb174c060e3540bcb255dc41b85b0484f2b48195969cb1ecbc922b3836` |
| `X45/X45-RIGHTS-AND-FAILURE-GATES.md` | `7de3881607ead141af69d5ae14bf6c0340023e5aa02ea7144c645d2910886858` |
| `X45/COMPONENT-CONTRACTS.md` | `823fbbcfe1080986f825f4c53eab2e6762952e587d1c2d303b4f8b3e36a967c5` |

prompt اصلی: `A/00-source-prompt/owner-supplied-Fernhollow-prompt-PRIVATE.txt` با SHA `e2ea5a1c99a69f0a234c9ac75435947aacda54a03c07a45e48185f33b520533d`. index: `X46/EVIDENCE-INDEX.json` با SHA `129f08cbd4d2f760e5f162b3991630a2337edf6961801f2a8c29a93e0aad6872`. hashes در مقایسهٔ واقعی باید از bytes محاسبه شوند؛ متن manifest جای آن را نمی‌گیرد.

`W` ریشهٔ run خصوصی آینده بیرون از public/Git، فقط پس از مجوز. مسیرهای `prototype-original/`، `QA/` و `review/` هم‌سطح در W؛ فایل‌های کد/تست زیر **NOT_CREATED** هستند. prototype HTML مستقل باز/استفاده نمی‌شود و منبع این برنامه نیست.

مجری ساخت بسته Codex طبق brief محدود؛ تأیید فنی و receiptها با بازبین مستقل؛ انتخاب reference، حقوق استفاده/نشر، هزینه/میزبان و هر انتشار با مالک. مجوز مستندسازی به معنی مجوز build، اجرای third-party، upload یا deploy نیست. خروجی عمومیِ دارای vendor source/asset در وضعیت حقوق نامعلوم ممنوع می‌ماند.

## P8.01 — بسته‌بندی یک‌فایلیِ واقعاً offline

**Gate:** G40؛ **X44:** P005/P006/P021/P034/P037/P041/P042/P043. **داریم:** متن اصلی خواهان single HTML و ۱۷ script + ده resource + دو font است؛ bytes اسکریپت/asset یافت شده‌اند. **اثبات‌نشده:** assemble کامل، GLB data URI با MIME/name صحیح، font embed، CSP/import/runtime، startup در browser target. متن اصلی با external src، یک standalone کامل نیست.

**پیش‌نیاز:** G00–G39 و G42 مربوط، manifest یک family کامل، asset SHA map و تصمیم حقوق G41 برای مقصد موردنظر. INVESTIGATE assembler موجود در index/backup member names بدون اجرای آن؛ REUSE/ADAPT فقط ابزار خودی/مجاز؛ BUILD packer کوچک deterministic در صورت نبود. extraction ZIP/اجرای HTML قدیمی یا merge familyها راه میان‌بر نیست.

**فایل آینده:** `prototype-original/tools/package-private.mjs`، `prototype-original/tests/single-file.test.js`؛ خروجی خصوصی پیشنهادی `prototype-original/dist-private/fernhollow-original.html` و `QA/P8/package-manifest.json`. I/O: approved ordered module set + ten SHA resource buffers + authorized fonts + source shell → یک فایل و manifest شامل SHA ورودی/خروجی، version، family ID، rights tags و byte size. build timestamp تصادفی داخل artifact قرار نگیرد تا تکرارپذیری قابل سنجش بماند. raw prompt با توضیحات خصوصی داخل metadata عمومی embed نشود.

**آزمون و قبول G40:** دو build با ورودی ثابت، SHA خروجی یکسان. در محیط isolated/offline، cache خالی و تمام egress مسدود، فایل در browser واقعی target باز شود؛ شمار external request موفق صفر، ده asset با bytes پس از decode یکسان، fontهای مصوب resolve، GLB transforms finite و بدون import/chunk error؛ loaded/intro callbacks صحیح و حداقل یک frame، input و hover/audio مجاز طبق gateهای قبلی واقعی باشند. اندازه و peak RAM هنگام base64 encode/decode گزارش شود؛ فرمول افزایش اندازهٔ base64 را به‌جای اندازهٔ واقعی artifact ننویسید. receipt `QA/receipts/G40.json` و console/network trace + screenshot خصوصی لازم‌اند. single-file با `file:` و localhost، اگر هر دو هدف بسته‌اند، جدا تست شوند؛ failure یکی مخفی نشود.

**fallback/rollback:** اگر یک‌فایلی محدودیت browser/MIME/حافظه دارد، `MULTIFILE_OFFLINE_HARNESS` خصوصی با مسیرهای محلی نگه داشته و G40 FAIL/PARTIAL اعلام شود؛ الزام single HTML حذف نشود. خروجی قبلی با hash معلوم حفظ؛ packer فقط در W می‌نویسد و archive تغییر نمی‌کند. هیچ فایلی به GitHub یا میزبان منتقل نمی‌شود.

## P8.02 — مجوز منبع، asset، font و release

**Gate:** G41؛ **X44:** P003/P005/P006/P018/P019/P021/P034 و همهٔ resources. **داریم:** permission claim در prompt محفوظ؛ سند مستقلِ کافی برای reuse/redistribution تأیید نشده. **کمبود:** حق هر code/chunk/GLSL/image/GLB/music/font برای private execution، adaptation، embedded distribution و public hosting.

**خروجی آینده:** `QA/P8/rights-private.csv` و `prototype-original/tools/release-allowlist.mjs`، `tests/release-rights.test.js`. هر ورودی: source ID/path/SHA، صاحب/مجوز/سند، اجازهٔ کاربرد، attribution، ممنوعیت توزیع، تاریخ/تصمیم‌گیر. سند حساس در W خصوصی، گزارش عمومی فقط خلاصهٔ مجاز. I/O: package manifest + rights records → allowed destination `PRIVATE_ANALYSIS_ONLY|PRIVATE_EXECUTION_ALLOWED|PUBLIC_ALLOWED` یا BLOCKED با item دقیق.

**قبولی G41:** ۱۰۰٪ bytes خروجی پیشنهادی باید رکورد حقوق متناسب با مقصد داشته باشند؛ UNKNOWN هیچ‌وقت به PUBLIC_ALLOWED تبدیل نشود. تست deny با یک entry فاقد مجوز باید release را مسدود، مسیر/hash آن را گزارش و صفر upload تولید کند. public scan نباید prompt خصوصی، vendor chunk/GLSL/GLB/screenshot/media غیرمجاز، cookie/token/profile یا path خصوصی نامناسب داشته باشد. مجوز Three.js/ابزار export، مجوز هنر/صدای Gladeye نیست. حقوق بررسی‌شده + تأیید صریح انتشار شرط است؛ PASS technical single-file مجوز انتشار نمی‌دهد.

**fallback:** تحلیل و renderer دارای bytes vendor فقط خصوصی؛ برای محصول قابل انتشار، implementation/هنر/صوت/فونت مستقل یا دارای مجوز مشخص، با provenance و label replacement. تفاوت fidelity و origin صریح ثبت شود؛ مالکیت بازسازی‌شده به vendor نسبت جعلی داده نشود. قیمت/credit/commercial use/region میزبان در زمان انتخاب با شواهد رسمی و سقف هزینه بررسی؛ هیچ provider یا domain به علت نوشته‌شدن این plan فعال نشود. rollback انتشار در صورت مجوز آینده باید از پیش release-ID/روش برگشت مصوب داشته باشد؛ اکنون release وجود ندارد.

## P8.03 — حفظ منبع و جلوگیری از drift

**Gate:** G43/G44؛ **X44:** تمام P001–P043. **پیش‌نیاز:** manifest before معتبر از G00، snapshot family و asset baseline. **فایل آینده:** `prototype-original/tools/verify-source-preservation.mjs`، `tests/source-preservation.test.js`، `QA/P8/source-preservation.json` و `scope-comparison.csv`.

G43: hash قبل/بعد private prompt باید دقیقاً مقدار pin باشد؛ ۱۸۴ line record و مسیرهای تاریخی baseline و هر input استفاده‌شده با hash پیشین تطبیق داده شوند. snapshot گستردهٔ browser profile لازم نیست و secretها خوانده/لاگ نشوند. تعداد mismatch و missing برای محدودهٔ رسمی باید صفر باشد؛ mismatch موجب STOP و FAIL است، هیچ original به نسخهٔ فرضی «اصلاح» نمی‌شود. لینک یک فایل/بازشدن مسیر شاهد preservation نیست.

G44: ماتریس هر feature ساخته‌شده را به یک یا چند P001–P043 وصل؛ feature جدید بدون منبع تعدادش صفر. moon/Earth، click-to-hold جدید، صفحه‌ها/ناوبری DJMRN و تغییرهای هنری بعدی در baseline ممنوع؛ نیازهای بعدی فقط workstream جدا پس از تأیید. تغییر لازم ایمنی/fallback باید با دلیل و deviation ثبت شود، حذف الزام اصلی را با نام adaptation پنهان نکند. تست با feature ساختگیِ خارج scope باید drift را آشکار کند. receiptهای `G43.json` و `G44.json` جدا؛ مقایسهٔ source raw bytes بر حقیقت sanitized public variant مقدم است. ۶۹ اختلاف placement/content در تاریخچه X43-B با overwrite حل نمی‌شوند؛ فقط ورودی انتخابی با provenance روشن پذیرفته شود.

**rollback:** run متوقف، trace/config/output در W حفظ، source archive دست‌نخورده، artifact جدید از چرخهٔ قبول خارج و نسخهٔ شناخته‌شدهٔ قبل بازگردد. mismatch ورودی با گرفتن hash جدید و جایگزینی pin دور زده نشود.

## P8.04 — جمع‌بندی ۴۳ قطعه و ۴۶ receipt واقعی

**Gate:** G45؛ **X44:** P001–P043. **خروجی آینده:** `prototype-original/tools/verify-gate-ledger.mjs`، `tests/final-coverage.test.js`، `QA/P8/gap-verification-final.json` و `QA/P8/43-piece-final.csv`. وضعیت اولیهٔ همهٔ gateها NOT_EXECUTED است، نه PASS تاریخی X45 artifact checks.

I/O: X44 matrix immutable + G00–G45 checklist immutable + receipts Gnn + artifact hashes + owner version/rights decisions → coverage و residual gap. validator باید دقیقاً ۴۶ شناسهٔ یکتای G00–G45 و ۴۳ شناسهٔ یکتای P001–P043 را بشناسد؛ هر receipt PASS دارای expected/actual، device/config/source identity و artifact موجود با hash مطابق باشد. duplicate/missing receipt، hash mismatch، device emulation به‌جای G42، reference بدون label در G38، حق نامعلوم در G41 یا صرف نام API به‌جای runtime باید نتیجه را رد/qualify کند. status enum و دلیل تصمیم اجباری؛ هیچ percentage کلی جای gateهای لازم را نگیرد.

مجموعهٔ تست آینده شامل ورودی سالم مصنوعی و حالات negative: receipt حذف‌شده، P ID تکراری، artifact دست‌خورده، حقوق UNKNOWN و PASS بدون artifact؛ همه باید دقیقاً failure مربوط را گزارش کنند. این فقط validator خودی را می‌سنجد؛ PASS واقعی scene همچنان نیازمند اجرای جداست. بازبین مستقل شاهد ۴۳ قطعه و مانع‌های باقی‌مانده را بازخوانی کند. تنها اگر تمام موارد لازم با شواهد معتبر و approvalهای مربوط تکمیل‌اند، scope «بازسازی اصلی آزموده‌شده» قابل ادعاست؛ در غیر این صورت PARTIAL با فهرست گیت/قطعه/علت، بدون عبارت complete vendor engine. receipt `QA/receipts/G45.json` به همین گزارش و hashes وصل می‌شود.

## توقف و بستهٔ تحویل

یک کار سنگین در هر زمان؛ سنجش RAM آزاد Windows پیش و حین pack/browser. در `availableMiB<=100` عملیات سنگین متوقف و وضعیت/trace باقی بماند؛ اندازهٔ base64/texture/AudioBuffer می‌تواند peak متفاوت بسازد. فرایند غیرمرتبط یا VPN/remote دست‌کاری نشود. preview خصوصی، نشر عمومی و هزینه سه تصمیم جدا با مجوزهای مربوط‌اند.

بستهٔ تحویل آینده شامل manifest منبع/خروجی، family انتخاب‌شده، rights disposition، نتیجهٔ واقعی G00–G45، پوشش P001–P043، معیارهای GPU/RAM/mobile، تصمیم OLD/NEW مالک، gaps و روش rollback است. فقط سند/receipt مجاز تحویل داده شود؛ raw vendor bytes و prompt خصوصی عمومی نشوند. P8 DONE از وجود یک HTML یا گزارش validator به‌تنهایی نتیجه نمی‌شود.
