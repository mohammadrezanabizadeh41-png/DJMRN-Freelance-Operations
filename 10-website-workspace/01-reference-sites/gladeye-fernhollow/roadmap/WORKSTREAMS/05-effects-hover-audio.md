# P5 — افکت‌ها، گذار hover و صدای نسخهٔ اصلی

وضعیت همهٔ مراحل این سند: **NOT_EXECUTED**. این سند برنامهٔ اجرایی است؛ فایل runtime، renderer، آزمایش صوت یا PASS ایجاد نشده است. هدف فقط baseline اصلی Fernhollow است. تغییرهای هنری بعدی وارد این مراحل نمی‌شوند.

## مسیر و شاهد

`A` ریشهٔ آرشیو خصوصی معرفی‌شده در `PROJECT.json` است. مسیرهای زیر نسبت به `A/OFFLINE-CODEX-HANDOFF/` هستند و از `SOURCE-ROUTES` / index X46 resolve می‌شوند؛ path یا LOCAL-ID حدس زده نمی‌شود.

| منبع خوانده‌شده | SHA-256 |
|---|---|
| `X44/PROMPT-EVIDENCE-TRACE.csv` | `c33f1a3dfac1ff2824d55dd651c27b23665ad8a69d1f48b2a93e73a6c1dc642b` |
| `X45/X45-EXECUTION-CHECKLIST.csv` | `e4b44acb174c060e3540bcb255dc41b85b0484f2b48195969cb1ecbc922b3836` |
| `X45/COMPONENT-CONTRACTS.md` | `823fbbcfe1080986f825f4c53eab2e6762952e587d1c2d303b4f8b3e36a967c5` |
| `X45/X45-RIGHTS-AND-FAILURE-GATES.md` | `7de3881607ead141af69d5ae14bf6c0340023e5aa02ea7144c645d2910886858` |

شناسهٔ قطعه در این سند `P014` یعنی `DJMRN-X44-P014`. prompt اصلی با SHA `e2ea5a1c99a69f0a234c9ac75435947aacda54a03c07a45e48185f33b520533d` تغییرناپذیر است. `X46/EVIDENCE-INDEX.json` با SHA `129f08cbd4d2f760e5f162b3991630a2337edf6961801f2a8c29a93e0aad6872` مرجع کشف رکوردهای اصل X22/X27/X28 و GLSL خصوصی X48 است؛ حضور ۲۲ hash shader و graph واژگانی X48 به معنی AST کامل یا اثبات خروجی پیکسلی نیست.

`W` ریشهٔ کار خصوصی آینده است که پس از مجوز اجرا، بیرون از Git/public tree انتخاب می‌شود. همهٔ مسیرهای کد زیر **پیشنهادی و NOT_CREATED** و نسبت به W هستند. `QA/` و `review/` هم‌سطح `prototype-original/` هستند. هیچ prototype HTML مستقل، یافتهٔ آن یا کد آن مبنای این سند نیست.

## قرارداد مشترک اجرا و پاسخ‌گویی

مجری: Codex برای تنها مرحلهٔ واگذارشده؛ بازبین فنی مستقل: مسئول QA تعیین‌شده در brief؛ تصمیم هنری و حقوق نشر: مالک. مجوز فعلی ایجاد این مستندات، مجوز اجرای vendor JS یا انتشار آن نیست. پیش‌نیاز P5: G00 و gateهای boot/assets/camera/points مرتبط واقعاً پاس شوند، یک frame قابل تکرار و manifest یک خانوادهٔ ۱۷تایی وجود داشته باشد. G11 از P02 به این workstream ارجاع داده شده، شماره/معنای اصلی آن عوض نمی‌شود.

برای هر G، در اجرای آینده فقط `QA/receipts/Gnn.json` دارای `status=PASS|FAIL|BLOCKED|UNVERIFIED`، زمان، مجری/بازبین، source SHA، family ID، config/seed، device/browser، ورودی، expected/actual، خطا، artifact path+hash و دلیل نتیجه تولید می‌شود. اکنون receipt وجود ندارد. snapshotهای خصوصی در `review/P5/<run-id>/`؛ trace و معیارها در `QA/P5/<run-id>/`. نبود receipt یا مدرک visual، وضعیت NOT_EXECUTED را حفظ می‌کند.

## P5.01 — اتصال textureها و graph افکت‌ها

**نگاشت:** G11، G23، G24، G25؛ X44 P002/P005/P014/P015. **داریم:** bytes ده asset طبق crosswalk X45 یافت شده، composer/bloom/blur/composite در شواهد GPU گزارش شده؛ ۱۱ program/۲۲ shader hash و ۱۶ draw نمونهٔ مرجع. **اثبات‌نشده:** هر image در کدام sampler/pass، alpha/color-space، ترتیب، ابعاد render target و معادلهٔ دقیق fog/RGB/noise/vignette. ۹۶۰۰۰۰ index یا ۱۶ draw هدف اجباری عملکرد و شمار گل نیست.

**روش:** INVESTIGATE interface از sourceهای index‌شده و `X45/X45-PRIVATE-TEN-ASSET-CROSSWALK.json`؛ REUSE فقط دادهٔ مجاز خصوصی؛ ADAPT اتصال موجود در یک family؛ BUILD pass سازگار مستقل فقط برای قطعهٔ واقعاً حل‌نشده. هیچ texture یا GLSL گم‌شده بدون query و hash «مفقود» نامیده نمی‌شود.

**فایل آینده:** `prototype-original/src/effects/texture-pass-map.js`، `composer.js`، `bloom.js`، `rgb-fog-vignette.js`، `ray-dust.js` و `tests/effects.test.js`. I/O: scene color/depth + سرعت + texture resolver → تصویر نهایی، آمار pass/resource؛ هر pass ورودی و خروجی اندازه‌دار و dispose دارد. owner کد EffectsComposer؛ کنترل frame فقط در SceneCoordinator.

**آزمون و قبول:** G11 شش auxiliary image (terrain، vignette، dust، سه ray) را به SHA و sampler مقصد وصل کند؛ همهٔ slotهای لازم resolve، صفر درخواست اینترنت و صفر texture missing. G23 graph در هر تکرار seed یکسان، ترتیب و ابعاد یکسان و صفر FBO-incomplete/GL error بدهد. G24 در زمان/دوربین ثابت و دو سرعت ازپیش‌ثبت‌شده، هر toggle فقط شاخهٔ مشخص را عوض کند؛ تصویر، uniform trace و pixel-diff قبل/بعد خصوصی ذخیره شود. G25 برای هر ray/dust، render با alpha=0 سهم همان لایه را حذف و با alpha تعریف‌شده بازگرداند، بدون لایهٔ وارونه/لبهٔ opaque. تطبیق هنری دقیق فقط با reference نسخه‌دارِ تأییدشدهٔ P7 پذیرفته می‌شود؛ صرف nonzero pixel-diff PASS وفاداری نیست. receipt جدا برای G11/G23/G24/G25.

**fallback/rollback:** pass اختیاریِ شکست‌خورده خاموش و علت/اختلاف بصری ثبت شود؛ graph آخرین نسخهٔ سالم خصوصی و config آن بازگردد. خروجی با افکت غایب PARTIAL است. original source دست نمی‌خورد و hot-swap shader با شکست compile، program قبلی را نگه می‌دارد.

## P5.02 — توقف، dispersal و برگشت قطع‌پذیر

**نگاشت:** G26/G27/G28؛ X44 P016/P017/P032/P042. **داریم:** API توصیفی `startHoverTransition/stopHoverTransition`، CTA handler متن اصلی، نام uniformهای dispersal و snapshots گزارش‌شده. **اثبات‌نشده:** منحنی ease، سرعت توقف، destination ذره‌ها، رابطهٔ علّی input و تصویر و برگشت واقعی. مقدار صفر sampled uniform اثبات dispersal نیست.

**پیش‌نیاز:** G05/G07/G13–G22 و frame ثابت. **فایل آینده:** `prototype-original/src/interaction/hover-transition.js`، `src/runtime/scene-coordinator.js`، `tests/hover-transition.test.js`. I/O: enter/leave + time + scene-ready → `progress∈[0,1]`، camera velocity factor، flower state و audio filter target. stateها `NORMAL→DISPERSING→DISPERSED→REFORMING` و camera `EASE_TO_STOP→STOPPED→RESUMING`؛ همه یک clock دارند. مجری اول implementation family را trace و ADAPT می‌کند؛ اگر واقعیِ سازگار نبود BUILD state machine مستقل با حفظ API. تنها state owner همین controller است.

**آزمون و قبول:** G26 replay ثابت enter، hold، leave، hold با زمان نمونه‌برداری ثبت‌شده؛ progress محدود، velocity در توقف به tolerance پیکربندی‌شده برسد و بعد leave به baseline بازگردد. tolerance و duration پیش از run ثبت، از prompt/source استخراج یا صریحاً پیشنهادی باشند. G27 تصویر و attribute snapshots حالت normal/dispersed/reformed را ثبت کند؛ در seed و time مشابه، برگشت به مختصات baseline در tolerance ثبت‌شده و resource count برابر باشد. G28 حداقل ۱۰۰ توالی enter/leave با seed ثابت، شامل قبل از ready و برگشت وسط انیمیشن، سپس ۵ ثانیه idle؛ صفر exception/NaN/دوربین stuck/duplicate RAF و رشد صفر resource count پس از dispose. مقایسهٔ trace دو replay باید در tolerance یکسان باشد. زمان و دامنهٔ پاسخ وفادار هنوز نیازمند شاهد نسخه‌دار است. receipt جدا `G26.json` تا `G28.json` و trace ورودی کامل.

**fallback/rollback:** pause/return با timeline resettable و state روشن؛ در failure، zero influence و حالت NORMAL، audio muted و دوربین baseline. حذف بی‌نام الزام dispersal مجاز نیست؛ gap ثبت و نسخهٔ سالم controller بازگردانده شود. در این baseline قراردادهای جدید click-to-hold یا تغییرهای هنری بعدی اضافه نشوند.

## P5.03 — صدای محیط، mute، low-pass و fade

**نگاشت:** G29/G30؛ X44 P018/P019/P026/P031/P042. **داریم:** MP3 خصوصی ۳۳۱۵۷۷۴بایتی در crosswalk و API متن اصلی. **اثبات‌نشده:** مجوز موسیقی/نشر، graph واقعی AudioListener/AudioStore، زمان‌بندی و cutoff/Q/gain. فایل یافت‌شده مجوز تجاری نیست.

**پیش‌نیاز:** G00/G08، G26–G28، user-gesture policy و مجوز رسانه برای اجرای مربوط. **فایل آینده:** `prototype-original/src/audio/ambient-audio.js`، `audio-store-adapter.js`، `tests/audio.test.js`. I/O: SHA-verified local audio + gesture/mute + hover progress → initialized/muted/playing، gain/filter targets، dispose. تنها Audio owner context/listener/loop دارد؛ UI مالک صدا نیست. INVESTIGATE/ADAPT API family پیش از BUILD adapter مستقل.

**آزمون و قبول:** G29 قبل از gesture، gain=0 و autoplay audible=0؛ denied AudioContext به SILENT/BLOCKED با UI روشن برسد؛ نخستین gesture مجاز یک context و یک loop بسازد؛ ۲۰ mute/unmute context یا loop تازه نسازد و dispose شمار nodeهای تحت کنترل برنامه را صفر کند. G30 offline sample test با signal مصنوعیِ خودی، envelope/cutoff/Q و timestamps ثبت‌شده؛ endpoint صحیح، parameterهای finite، peak ناگهانی خارج tolerance ازپیش‌تعریف‌شده صفر و reversal به baseline انجام شود؛ سپس گوش‌دادن انسانیِ محدود برای click/pop با ثبت نتیجه، نه ادعای اندازه‌گیری از گوش. MP3 خصوصی تنها پس از مجوز استفاده در محیط مربوط آزمایش شود. gain/filter trace و WAV test خودی در `QA/P5/`، receipt جدا G29/G30. نبود معیار شنیداری/مجوز یا دستگاه به معنی BLOCKED، نه PASS.

**fallback/rollback:** حالت سکوت و sound control با پیام درست؛ low-pass/gain adapter سالم قبلی. فایل صوتی vendor یا prompt خصوصی وارد Git/خروجی عمومی نشود. اگر حقوق روشن نشد، صدای تألیفی/دارای مجوز با برچسب replacement؛ معادل‌بودن فنی جای ادعای صدای عین مرجع را نمی‌گیرد.

## توقف و هزینه

یک renderer سنگین در هر نوبت؛ روی دستگاه 8GB، RAM آزاد host پایش شود. در `availableMiB<=100` heavy render/audio run متوقف، status و آخرین trace حفظ و نتیجه FAIL/BLOCKED ثبت شود؛ VPN/remote یا فرایند نامرتبط بسته نشود. افت کیفیت مرحله‌ای ثبت می‌شود. هیچ نصب، provider، credit، اینترنت یا نشر asset بدون مجوز مربوط لازم/فعال فرض نمی‌شود. P5 DONE فقط با receiptهای G11 و G23–G30، gapهای صریح، بررسی مستقل و تأیید لازم؛ سند حاضر هیچ‌کدام را PASS اعلام نمی‌کند.
