# P1 — راه‌اندازی runtime و قرارداد Valley

وضعیت سند: برنامهٔ اجرایی؛ اجرای موتور اصلی و نتیجهٔ G03–G06 هنوز اثبات نشده است. این سند فقط baseline اصلی Fernhollow را پوشش می‌دهد. هیچ artwork یا prototype مستقل ورودی این مرحله نیست.

## منبع، مرز و مسئول

مرجع نام‌های کوتاه، `../SOURCE-ROUTES.md` است. مسیرهای `X44/`، `X45/` و `X46/` نسبت به handoff خصوصی‌اند؛ `F17` خانوادهٔ اول کامل X03، `OWNER` prompt اصلی، `INDEX` نمایه و `A10` crosswalk ده asset است. این aliasها مجوز کپی، اجرا یا انتشار ایجاد نمی‌کنند.

| منبع | هویت و مقدار اثبات‌شده | چیزی که اثبات نمی‌کند |
|---|---|---|
| `OWNER` | SHA256 `e2ea5a1c99a69f0a234c9ac75435947aacda54a03c07a45e48185f33b520533d`؛ قرارداد اصلی محفوظ | مجوز مستقل انتشار vendor یا موتور اجرایی آماده |
| `X45/X45-EXECUTION-CHECKLIST.csv` | SHA256 `e4b44acb174c060e3540bcb255dc41b85b0484f2b48195969cb1ecbc922b3836`؛ تعریف رسمی gateها | PASS runtime |
| `X45/COMPONENT-CONTRACTS.md` | SHA256 `823fbbcfe1080986f825f4c53eab2e6762952e587d1c2d303b4f8b3e36a967c5`؛ I/O هدف | پیاده‌سازی قرارداد |
| `F17/_next/static/chunks/webpack-a76c04a7ba9aa4ef.js` | 4,026 بایت؛ SHA256 `13f586eb25d4e6f57051065209d08451be11457460cf434215df3382d047ffcf`؛ ثبت `webpackChunk_N_E` در بررسی ایستا | ترتیب بارگذاری موفق در browser |
| `F17/_next/static/chunks/app/page-4c279de0997d388f.js` | 82,742 بایت؛ SHA256 `90a44e1948b6b44ce64ae15342f69e71d2ccd3dfbb22919a17e02d649174ce52`؛ module 889 و کلاس خصوصی `et` و audio store وجود دارند؛ `__GE` در اصل دیده نشد | کلاس عمومی Valley یا constructor قابل فراخوانی از harness |
| `X19/static/889.js` | SHA256 `60abecd12cdf56e25ffb16ea236d2287f32b6d46393e17c131d29fba6be40603`؛ source مشتق‌شده با importهای unpack | نبودن واقعی dependency در captured family؛ `webcrack:missing` به تنهایی چنین مدرکی نیست |

مسئول آیندهٔ کدنویسی: یک مجری Codex برای `BootAdapter` و `ValleyContract`. بازبین شواهد باید receiptها را از ورودی‌های pin شده بازبینی کند؛ صاحب پروژه تصمیم اجرای original و سپس انتشار را می‌گیرد. جداسازی این مسئولیت‌ها به معنی ساخت سرویس، agent host یا tracker تازه نیست.

## نقطهٔ ورود و دو اجازهٔ متفاوت

`CODE-01` مرحلهٔ P0 و پیش‌نیاز این سند است: checker ایستای آفلاین هویت prompt/index، انتخاب F17، تمام 17 SHA و A10 را بررسی کند. نتیجهٔ مطلوب آن «static source preflight» است. این نتیجه G03 یا G05 را پاس نمی‌کند.

`CODE-02` نخستین کار این سند است: **تحلیل ایستای module closure و طرح bridge**. کدِ vendor load، eval، import اجرایی، VM یا browser-run نمی‌شود. ورودی checker در `prototype-original/tools/closure.mjs` و قرارداد قابل بازبینی در `QA/artifacts/runtime/bridge-contract.json` پیشنهاد می‌شوند؛ CODE-01 پیش‌نیاز در `prototype-original/tools/preflight.mjs` است. خروجی‌های تشخیصی: `QA/artifacts/runtime/module-889-closure.json`، `QA/artifacts/runtime/bridge-contract.json`، `QA/artifacts/runtime/boot-order.json` و `QA/artifacts/runtime/static-preflight-report.json`. AST/parser فقط از ابزار ازقبل‌موجود و مجاز استفاده کند؛ نبود parser باید گزارش شود، نه اینکه با نصب خودکار یا regex ناقص ادعای closure کامل شود. هیچ package/framework پیش‌فرضی انتخاب نشده است.

مسیر کد پس از brief مجاز: `prototype-original/src/runtime/boot-adapter.mjs`، `prototype-original/src/runtime/bridge-adapter.mjs` و `prototype-original/src/runtime/valley-contract.mjs`؛ آزمون authored در `prototype-original/tests/runtime-contract.mjs`. این‌ها مسیرهای آینده نسبت به W هستند؛ W یک working run خصوصیِ خارج از repository است که فقط پس از اجازه انتخاب می‌شود. `review/` و `QA/` هم‌سطح `prototype-original/` هستند.

F17 انتخاب‌شده خروجی SiteOne است، نه اثبات برابری با bytes upstream: scan ایستای ثبت‌شده در workstream منبع، تغییر publicPath به `_SiteOneUrlDepth` و تغییرهای loader/crossOrigin/prefetch را نشان می‌دهد. CODE-02 باید وابستگی و حالت undefined این global را به‌عنوان startup diagnostic صریح ثبت کند. trim خاموش، تزریق مقدار حدسی یا آمیختن familyها مجاز نیست؛ adapter پیشنهادی باید dependency و دلیلش را مستند کند و تا runtime مجاز، compatibility باز بماند.

اجرای original یک زیرمرحلهٔ جدا با اجازهٔ صریح، حقوق/امنیت بررسی‌شده و harness خصوصی است. مجوز نوشتن مستندات، ساخت checker یا static PASS چنین اجازه‌ای نیست.

## واحدهای اجرایی و معیار خروج

تمام مسیرهای زیر نسبت به `<RUN>`، working run خصوصی و قابل کنارگذاشتن آینده‌اند؛ در این بسته هیچ‌یک ساخته یا اجرا نمی‌شود. شناسه‌های X44 در جدول با پیشوند کامل `DJMRN-X44-` خوانده می‌شوند.

| کار / gate / X44 | ورودی، خروجی و شکاف | تصمیم inspect → reuse/extend → compatible | پیش‌نیاز و پذیرش قطعی پیشنهادی |
|---|---|---|---|
| P1.1 / G04 / P004,P029,P030,P031,P033,P041,P042 | ورودی F17 و ترتیب 17 script از OWNER؛ خروجی `QA/artifacts/runtime/module-889-closure.json` شامل module ID، chunk owner، require edge، export و نوع dynamic edge. شکاف: transitive closure هنوز خواندنی/اجرایی ثابت نیست. | ابتدا graph ایستا؛ IDهای بسته را reuse؛ فقط edge مشخص و فاقد تعریف را برای compatible module نام‌گذاری کن. دیدن marker unpack دلیل بازنویسی نیست. | CODE-01 معتبر؛ 17/17 input مطابق SHA؛ module889 دقیقاً یک provider منتخب؛ هر edge یا resolved است یا صریح UNKNOWN/UNRESOLVED. static PASS فقط اگر unresolved و unknown dynamic edge هر دو صفر باشند؛ در غیراین‌صورت G04 باز می‌ماند. دو اجرای checker روی ورودی یکسان، خروجی normalized یکسان بدهند. |
| P1.2 / G06 / P029,P030,P031,P033,P042 | ورودی page اصل، module/export graph و قرارداد `et`/`Y`؛ خروجی `QA/artifacts/runtime/bridge-contract.json` و طرح adapter در `prototype-original/src/runtime/bridge-adapter.mjs` فقط پس از مجوز کد. شکاف: اصل `__GE` ندارد. | نقطهٔ scope و availability را ایستا مشخص کن؛ bridge فقط در working copy/adapter؛ archived bytes تغییر نکند. اگر دسترسی scope امن/قابل اثبات نیست، shim را به‌عنوان compatible مشخص کن. | P1.1؛ قرارداد شامل نام factory، audio methods، زمانی که bridge آماده است و teardown. static check: هر symbol دقیقاً به provider شناخته‌شده برسد و global-before-ready ممنوع باشد. اجرای بعدی: دو چرخهٔ init/destroy، صفر race/global stale و دو عضو موردنیاز قابل فراخوانی؛ این معیار تا اجرا PENDING است. |
| P1.3 / G03 / P004,P029,P041,P042 | ورودی 17 فایل pin شده، boot-order و bridge؛ خروجی `QA/artifacts/runtime/boot-console-trace.json` و timeline ثبت chunk. شکاف: ترتیب registration در harness اجرا نشده. | با ترتیب اصلی شروع؛ در شکست نخست علت/module-ID ثبت؛ تغییر حداقلی adapter فقط در working copy. family دیگر فقط با manifest جدا و hash مستقل؛ mixing ممنوع. | زیرمرحلهٔ original execution دارای اجازه؛ P1.1/P1.2 static شفاف؛ شبکهٔ خارجی مسدود در harness بدون تغییر امنیت سیستم. در 3 cold boot متوالی: صفر uncaught exception/rejection، 17 script موردانتظار، صفر script خارجی و ترتیب dependency معتبر. timeout پیشنهادی 30s به ERROR قابل مشاهده برسد، نه انتظار بی‌پایان. |
| P1.4 / G05 / P030,P031,P032,P042 | ورودی root DOM، factory و `onLoaded/onIntroDone`؛ خروجی `QA/artifacts/runtime/Valley-API-contract-test.json`. شکاف: private `new et(root,callbacks)` در source دیده شده، lifecycle واقعی نه. | constructor و hover/destroy API موجود را نخست امتحان؛ callback adaptation حداقلی و ثبت‌شده؛ اگر engine unsafe/incomplete شد فقط همان قرارداد با compatible Valley تأمین شود. | boot موفق؛ پیش‌نیاز واقعی `onLoaded` باید با P2 asset readiness قابل ردگیری باشد. 3 cold boot: root درست، شمارش خام هر callback ثبت شود؛ reveal فقط بار اول انجام شود حتی اگر `onIntroDone` پس از intro هر frame تکرار شود؛ پس از destroy هیچ اثر UI یا callback تازه باقی نماند. بارگذاری خراب: ERROR کنترل‌شده و صفر callback موفقیت کاذب. مدت intro از منبع استخراج شود؛ عدد حدسی جای آن ننشیند. |

P1.3 با registration واقعی chunkها و P1.4 با ساخت instance و ثبت قرارداد callback آغاز می‌شود. در P1 مسیرهای محلی ورودی از lock P0 در اختیار harness خصوصی‌اند. اگر اثبات callback واقعی به resolver مرحلهٔ بعد نیاز داشت، G05 با علت مشخص PARTIAL می‌ماند. در P2 ابتدا G08 و G09 مستقل از G05 تکمیل می‌شوند، سپس callback واقعی G05 دوباره سنجیده می‌شود و فقط پس از آن G07 قابل بستن است. fixture خودساخته صرفاً کنترل تشخیصی است. این ترتیب، وابستگی حلقوی به اولین frame را حذف می‌کند.

## receipt، شکست و بازگشت

برای هر G03، G04، G05 و G06 یک `QA/receipts/Gnn.json` در `<RUN>` لازم است. فیلدهای اجباری: `gateId`، `phase`، `status` از `NOT_RUN|PARTIAL|PASS|FAIL|BLOCKED`، `evidenceClass` از `STATIC|ORIGINAL_RUNTIME|OWN_FIXTURE|COMPATIBLE_RUNTIME`، زمان/نسخهٔ ابزار، source alias+SHA، working-copy SHA، command، input fixture/seed، assertionهای expected/actual، مسیر artifact، error، limitations، مجوز اجرای مرتبط و `rollback`. schema و receipt صرفاً پیشنهاد خروجی آینده‌اند؛ receipt خالی PASS نیست. static result در G04/G06 باید `runtimeVerified:false` داشته باشد.

در hash mismatch فوراً توقف؛ original را overwrite نکن و از family دیگر patch تصادفی نگیر. در missing module ابتدا graph و علت را کامل کن؛ فقط بعد از انتخاب صاحب پروژه compatible module authored بساز. در exception یا timeout، console/network trace خصوصی حفظ شود، owned harness بسته و working run کنار گذاشته شود؛ archive، VPN، browser شخصی و تنظیم امنیتی تغییر نکنند. re-init فقط پس از تشخیص failure و با run شناسهٔ تازه انجام شود.

## اجازه، هزینه و حافظه

این سند اجرای تازه‌ای مجاز نمی‌کند. خواندن/ساخت ابزار ایستا در brief بعدی از اجرای captured vendor جداست؛ کپی/اجرای original، نصب وابستگی، هزینه، انتشار و تغییر امنیت اجازهٔ مستقل می‌خواهند. کار باید آفلاین، بدون secret، با ابزار موجود و صفر درخواست پولی باشد. روی دستگاه 8GB فقط یک harness/browser متعلق به همان run؛ RAM آزاد پیش از start و حین اجرا نمونه‌برداری شود. زیر 100MiB RAM آزاد توقف اضطراری و teardown؛ رندر بدون guard و اندازه‌گیری اجازهٔ PASS ندارد.

تعریف DONE این workstream: قرارداد و closure قابل بازبینی، نتایج original یا compatible با برچسب صحیح، receiptهای چهار gate با evidence واقعی و همهٔ UNKNOWNها صریح. وجود کلاس، فایل یا static PASS معادل موتور اصلی کارا نیست.

