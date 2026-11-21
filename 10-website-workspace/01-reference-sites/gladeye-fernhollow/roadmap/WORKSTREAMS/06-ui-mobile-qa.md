# P6 و P7 — پوستهٔ اصلی، موبایل و اثبات مستقل

وضعیت همهٔ gateهای این سند **NOT_EXECUTED** است. این برنامه فقط بازسازی baseline اصلی Fernhollow است؛ سایت چندزبانهٔ DJMRN یا طرح هنریِ بعدی موضوع این سند نیست. فایل مستقل prototype HTML باز/استفاده نشده و مبنای این roadmap نیست؛ مسیرهای کد زیر فقط خروجی آیندهٔ NOT_CREATED هستند.

## مرجع و قرارداد مسیر

`A` ریشهٔ آرشیو در `PROJECT.json`؛ مسیرهای شواهد نسبت به `A/OFFLINE-CODEX-HANDOFF/`. هر منبع اصل از `SOURCE-ROUTES` و `X46/EVIDENCE-INDEX.json` resolve، و SHA فایل پیش از استفاده کنترل می‌شود. index مورد انتظار: `129f08cbd4d2f760e5f162b3991630a2337edf6961801f2a8c29a93e0aad6872`. متن خصوصی اصلی با SHA `e2ea5a1c99a69f0a234c9ac75435947aacda54a03c07a45e48185f33b520533d` تغییر نمی‌کند.

| مرجع خوانده‌شده | SHA-256 |
|---|---|
| `X44/PROMPT-EVIDENCE-TRACE.csv` | `c33f1a3dfac1ff2824d55dd651c27b23665ad8a69d1f48b2a93e73a6c1dc642b` |
| `X45/X45-EXECUTION-CHECKLIST.csv` | `e4b44acb174c060e3540bcb255dc41b85b0484f2b48195969cb1ecbc922b3836` |
| `X45/COMPONENT-CONTRACTS.md` | `823fbbcfe1080986f825f4c53eab2e6762952e587d1c2d303b4f8b3e36a967c5` |
| `X45/PERFORMANCE-TEST-PLAN.md` | `f4c9a333399b199c44d079cf915e57fd4c6fd630c7f416f741c399acfdab70af` |
| `X45/X45-RIGHTS-AND-FAILURE-GATES.md` | `7de3881607ead141af69d5ae14bf6c0340023e5aa02ea7144c645d2910886858` |

`Pnnn` کوتاه‌شدهٔ `DJMRN-X44-Pnnn` است. `W` ریشهٔ خصوصی آینده، بیرون از public/Git و فقط پس از مجوز اجرا تعیین می‌شود. کد در `W/prototype-original/`، خروجی بصری خصوصی در `W/review/` و QA در `W/QA/`. هیچ bytes خصوصی به پوشهٔ navigation پروژه کپی نمی‌شود.

مجری هر مرحله Codex با brief محدود؛ مالک تصمیم دربارهٔ reference/OLD/NEW/فونت/حقوق، کاربر؛ بازبین مستقل نتیجه، مسئول QA. declaration API/وجود فایل یا تست تاریخی extraction اثبات renderer ساخته‌شده نیست. convention receipt: `QA/receipts/Gnn.json` با status، source/family/config hashes، مجری/بازبین، device/browser، ورودی seed/time، expected/actual/tolerance، trace/artifact hash، gap و دلیل PASS/FAIL/BLOCKED/UNVERIFIED. هیچ receipt اجرایی اکنون ساخته نمی‌شود.

## P6.01 — هویت فونت و پوستهٔ اصلی

**Gate:** G12، G31، G32؛ **X44:** P001/P020–P025/P037–P040. **داریم:** متن HTML/CSS/metadata با target رنگ cream/black و جایگاه header/headline/CTA؛ پنج font resource مرجع گزارش‌شده. **اثبات‌نشده:** Antonio/Manrope با variant صحیح و مجوز embed، metrics و browser rendering برابر، focus/pointer layout. پیدا نشدن نام فونت در index اثبات نبود bytes نیست.

**پیش‌نیاز/روش:** G00/G08 و طرح ثابت viewport؛ INVESTIGATE MIME/header/name table/font-face در رکوردهای hashدار، مقایسه با prompt؛ REUSE فقط font مجاز، ADAPT CSS متن اصلی؛ BUILD پوستهٔ مستقل تنها در W. **کد آینده:** `prototype-original/src/ui/page-shell.js`، `page-shell.css`، `font-resolver.js`، `tests/ui-shell.test.js`. I/O: original spec + viewport + fonts + lifecycle → DOM/metadata و controls readable؛ PageShell مالک UI است، engine owner رندر را نگه می‌دارد.

**قبولی قابل اندازه‌گیری:** G12 برای هر دو فونت family/weight/MIME/SHA/حقوق و codepoint coverage را ثبت؛ پس از `document.fonts.ready` تعداد missing glyph نمونهٔ baseline صفر، metrics و fallback delta گزارش شود. fallback مجاز و اندازه‌گیری‌شده ممکن است قابلیت را اثبات کند ولی exact-font fidelity را PASS نمی‌کند. G31 title/description/رنگ‌های computed و نسبت‌بندی متن با مقادیر private prompt در baseline viewport یکسان، صفر missing resource. G32 header/hero/CTA با box measurements و focus order در snapshot دارای hash ثبت؛ صفر CTA پوشیده یا focus نامرئی. لینک‌های `#` به عنوان placeholder ثبت، مقصد جعلی/route ساخته نشود. pixel fidelity فقط بعد reference approval P7؛ یک screenshot زیبا به تنهایی معیار نیست. receiptهای G12/G31/G32 مستقل.

**fallback/rollback:** متن و کنترل قابل‌خواندن با فونت offline مجاز و اختلاف مستند؛ stylesheet/version سالم قبلی بازگردد. دانلود Google Fonts یا انتشار font ناشناخته به‌صورت خودکار ممنوع؛ اختلال صوت/GL نباید متن را پنهان کند.

## P6.02 — loader، intro و کنترل صدا

**Gate:** G33/G35؛ **X44:** P026–P028/P030/P031/P042. **داریم:** متن callback، pulse و fade اصلی ۱s و ۱٫۶s، introShown guard، sound aria-pressed. **اثبات‌نشده:** actual ready/error، callback ordering، unlock audio و focus در runtime.

**پیش‌نیاز:** G05–G07/G29–G30. **کد آینده:** `prototype-original/src/ui/lifecycle-ui.js`، `sound-control.js`، `tests/ui-lifecycle.test.js`. I/O: `{loaded,introDone,error,audioInitialized,muted}` → overlay/UI visibility و aria/button state؛ loader سیگنال engine را می‌گیرد، خودش readiness جعل نمی‌کند.

**آزمون:** G33 clock کنترل‌شده: loaded یک بار loader fade ۱s را شروع، introDone یک بار reveal ۱٫۶s را شروع؛ callback تکراری تغییر زمان/DOM تازه نسازد. load failure/missing asset/timeout با deadline ازپیش‌ثبت‌شده به error قابل بازیابی برسد، هرگز loader ابدی؛ actual timing در real browser هم ثبت شود. G35 Enter/Space و pointer روی sound فقط در initialized/فعال، `aria-pressed` همواره با muted mapping مستند یکسان؛ tab order منطقی، نام دسترس‌پذیر غیرخالی، focus visible و disabled درست، صدا بدون gesture شنیده نشود. receipt G33/G35 و DOM/audio state trace لازم است.

**fallback:** overlay خطا با retry کنترل‌شده یا shell ساکن؛ muted/disabled با توضیح درست. rollback adapter قدیمی؛ callbackهای اصلی و source archive تغییر نکنند.

## P6.03 — responsive و interaction parity

**Gate:** G34؛ **X44:** P023/P035/P036/P038/P039. **داریم:** breakpoint اصلی ۸۲۰px، mobile header و clamp، قواعد loader reduced-motion. **اثبات‌نشده:** رفتار canvas هنگام resize، touch و کیبورد، narrow screen، real phone و reduced-motion خود scene. کاهش pulse loader را نباید کاهش تمام حرکت canvas دانست.

**کد آینده:** `prototype-original/src/ui/responsive.css`، `src/runtime/viewport.js`، `tests/ui-mobile.test.js`. I/O: viewport/DPR/resize/input capability/motion preference → canvas dimensions و UI layout؛ pointer normalization باید با canvas جدید و CTA مطابقت داشته باشد. ADAPT متن CSS اصلی؛ تغییر لازم برای usability با برچسب و ثبت gap، نه بازنویسی سلیقه‌ای baseline.

**قبول:** viewportهای ۳۹۰×۸۴۴، ۸۲۰×۸۴۴، ۸۲۱×۸۴۴ و desktop baseline ثابت، portrait/landscape و zoom در replay؛ horizontal overflow ناخواسته صفر، CTA/sound/label در viewport، mobile nav طبق source، touch target در دسترس و صفر input trap. mouse/touch/focus روی CTA باید همان event contract را فعال کند؛ hover-only operation بدون راه تعامل ثبت FAIL می‌شود. `prefers-reduced-motion` در دو حالت، scene-off و WebGL unavailable هم بررسی و تفاوت با اصل صریح گزارش شود. تصاویر خصوصی نسخه‌دار، bounding boxes و trusted input trace در `QA/P6/`؛ receipt G34. این امولیشن جای G42 فیزیکی نیست.

## P7.01 — بودجه، حافظه و چرخهٔ عمر

**Gate:** G36/G37؛ **X44:** P002/P004/P007/P014/P023/P039/P042؛ **وابسته به:** G07–G35 مرتبط. **داریم:** X45 فقط plan دارد؛ extraction sampleهای قدیمی benchmark renderer جدید نیستند. **کد آینده:** `prototype-original/src/runtime/adaptive-quality.js`، `resource-lifecycle.js`، `tests/performance.test.js`، `tests/resource-lifecycle.test.js`؛ ابزار اندازه‌گیری host در `QA/tools/` فقط بعد اجازه. I/O: FPS/frame-time/Windows available RAM/visibility/context state → کیفیت و stop/dispose/recreate.

**پروتکل تکرارپذیر پیشنهادی:** یک renderer فعال روی Ryzen3500U/Vega8/8GB؛ manifest/family/seed/camera/input ثابت، ۱۰s warmup و ۹۰s ثبت، هر ۱s availableMiB host و هر frame duration. G36 median FPS دسکتاپ حداقل۳۰؛ موبایل فیزیکی هدف۲۴ یا fallback ساکن کارا، 1%low/p95 نیز بدون ادعای استاندارد ثبت شود. این targets از X45 پیشنهادی‌اند، achieved نیستند. در `availableMiB<=100` فوراً heavy render متوقف و receipt FAIL/BLOCKED همراه minimum RAM و زمان stop؛ override مجاز نیست. RAM مرورگر جای RAM آزاد host نیست؛ نبود سنجهٔ host مانع run سنگین است.

**کیفیت:** ابتدا presentation اصلی؛ سپس DPR/postprocess resolution، سپس bloom/ray/dust و در آخر density/complexity، هر تغییر جدا با تصویر و metrics. G37 ده چرخه resize→contextlost→recover→hide/show→dispose/remount؛ صفر orphan RAF/audio loop، resource counters پس از dispose به baseline برسند؛ تعداد context/texture/FBO/audio node در هر چرخه ثبت و رشد پایدار صفر. اندازه‌گیری resource تخمینی را VRAM قطعی ننامید. یک failure به fallback static، trace حفظ و برگشت به config آخرین نسخهٔ سالم می‌انجامد؛ VPN/remote و فرایند دیگر بسته نمی‌شوند.

## P7.02 — تعیین نسخهٔ بصری و رگرسیون

**Gate:** G38/G39؛ **X44:** همهٔ قطعه‌های بصری با تمرکز P002/P007–P019/P020–P028/P035–P040. **داریم:** ۹۰ screenshot candidate و ۳۹ تصویر دیگرِ طبقه‌بندی‌نشده گزارش شده‌اند؛ timestamp/filename به تنهایی OLD/NEW نیست. **کمبود:** owner-approved reference set و replay aligned. **کد آینده:** `prototype-original/tests/scene-regression.test.js` و `QA/visual-version-decisions.csv`؛ input replay config و capture index در `review/P7/<run-id>/`.

**P7 owner gate:** همین‌جا از مالک بخواهید subset موردنظر از ۹۰ تصویر را با `OLD|NEW|UNKNOWN`، نسخه/viewport و دلیل تعیین کند. تصمیم را با SHA تصویر، تاریخ، نام تصمیم‌گیر و source ID ثبت کنید؛ قبل از این مرحله انتخاب اجباری یا ادعای label نکنید. G38 بدون این تصمیم UNVERIFIED/BLOCKED است.

**قبول G39:** از build خودی با camera/time/seed/viewport/quality یکسان، NORMAL، near/far growth، wheel/touch، hover-enter/stopped/dispersed/return، audio mute/unmute/lowpass و mobile ثبت؛ هر قطعه نیاز به test/receipt واقعی دارد. input timestamp با frame capture هم‌راستا و tolerance تصویری/رفتاری پیش از مقایسه تعیین و مالک بپذیرد. diff/همبستگی به تنهایی اثبات camera matrix یا علیت نیست؛ control/no-input نیز ذخیره شود. سه replay روی یک host باید deterministic در tolerance ثبت‌شده باشند؛ اختلاف‌ها فهرست، نتیجهٔ هنری به بازبینی انسانی متصل. baseline بدون approval عوض نشود. شکست: iterate در renderer خودی و برگشت به baseline قبلی، نه پاک‌کردن اختلاف.

## P7.03 — موبایل فیزیکی

**Gate:** G42؛ **X44:** P010/P023/P026/P035/P036/P039. **پیش‌نیاز:** G34/G36/G37/G39 و مجوز دسترسی دستگاه/preview خصوصی. **خروجی آینده:** `prototype-original/tests/mobile-qa.md` و `QA/P7/mobile/<run-id>.json` با مدل/OS/browser/RAM/viewport/تاریخ/رویداد و تصاویر مجاز.

یک گوشی واقعی و یک دستگاه ضعیف در صورت دسترسی، tap/swipe، تغییر orientation، mute gesture، back/focus، visibility، context recovery و fallback را آزمایش کنند. G42 فقط با دستگاه واقعی، صفر input trap/کنترل خارج صفحه، fallback readable و نبود crash در مسیر کامل می‌تواند PASS شود. دستگاه در دسترس نباشد BLOCKED و emulation جدا گزارش شود؛ وعدهٔ Safari/iOS بدون دستگاه یا evidence داده نشود. شبکه عمومی/tunnel یا upload vendor assets برای راحتی QA خودکار مجاز نیست؛ روش preview خصوصی محدود پس از scope approval.

## خروج مرحله

P6 به receiptهای G12/G31–G35 و P7 به G36–G39/G42 با evidence مستقل نیاز دارد. فونت fallback، screenshot نامعلوم، موبایل فقط emulated یا benchmark انجام‌نشده gap باقی می‌ماند. هزینه، حقوق font/media، نشر و اجرای third-party به مجوز خود نیاز دارند؛ این مستندات هیچ‌یک را فعال نمی‌کنند. بازگشت فنی با نسخه/config/asset manifest سالم قبلی در W؛ source archive immutable باقی می‌ماند.
