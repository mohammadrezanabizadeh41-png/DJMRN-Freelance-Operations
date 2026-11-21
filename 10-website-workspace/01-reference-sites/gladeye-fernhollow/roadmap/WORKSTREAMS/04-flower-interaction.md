# P4 — گل/برگ، geometry سازگار و تعامل pointer

وضعیت: قرارداد ساخت و اثبات؛ هنوز renderer یکپارچهٔ original یا compatible و gateهای این فاز اجرا نشده‌اند. زمینه، رفتار و منابع از baseline اصلی می‌آیند؛ artwork جدید یا prototype مستقل ورودی این فاز نیست.

## منبع و تفاوت نوع مدرک

aliasها در `../SOURCE-ROUTES.md` آمده‌اند و هیچ مجوز اجرایی/انتشار نمی‌دهند. `F17` یک خانوادهٔ pin شده است؛ `A10` ده media اصلی و `OWNER` الزام184خطی خصوصی را معرفی می‌کند. خروجی‌های این سند فقط برای `<RUN>` خصوصی آینده تعریف می‌شوند.

| منبع | هویت | نتیجهٔ مجاز و محدودیت |
|---|---|---|
| `X45/X45-EXECUTION-CHECKLIST.csv` | SHA256 `e4b44acb174c060e3540bcb255dc41b85b0484f2b48195969cb1ecbc922b3836` | تعریف G10 و G18–22؛ بدون نتیجهٔ runtime |
| `A10` | SHA256 crosswalk `2329dca56f565d999e6b9001ac098271a786c5757ad70d194d355f915c961ff5` | summer/winter هرکدام1500×1312؛ byte identity ثابت، cell layout و sampling هنوز نیازمند آزمون |
| summer atlas | SHA256 `6f16b2d004f5260df4bbd1b49b19c0e978f0bff709fd7385107dd90226dbec47` | تصویر اصلی بازیابی‌شده، حقوق انتشار باز |
| winter atlas | SHA256 `bea3c0bd21f77a65d09650f9030fdd54cec3f92234ef6e79769f493ba8bf1c71` | تصویر اصلی بازیابی‌شده، visual fidelity هنوز اثبات نشده |
| `X19/static/889.js` | SHA256 `60abecd12cdf56e25ffb16ea236d2287f32b6d46393e17c131d29fba6be40603` | point attributes، terrain، growth و mouse/dispersal uniforms در source مشتق‌شده دیده شده؛ وجود source اثبات frame صحیح نیست |
| `X20/module-9169.js` | SHA256 `4ccb7f819360194d8f87145de11803c3ee4ff2170c334647c7f8116d0ffcad13` | vertex shader متن رشد/برگ/repulsion/dispersal دارد؛ کد کامل خصوصی، بدون کپی در این سند |
| `X48/X48-SHADER-DEPENDENCY-MAP.md` | SHA256 `c27e223037281886951b5db153f6d87edb1b78e4ccc8325993a832d4ea44ed77` |22source/11pair و graph ایستا؛ AST کامل، runtime usage و pixel causality ندارد |
| `X49/GEOMETRY-FIDELITY-MATRIX.csv` | SHA256 `7b105208ce41fd1cc79c58990bbab532b820c30a2d11e17b59cb594733378bec` | OWN fixtures: POINTS و instancing کامل حفظ نشده‌اند؛ vendor flower mesh بازیابی نشده |
| `LOCAL-06445` و `LOCAL-09275` | به SHA در SOURCE-ROUTES و سند assets-camera مراجعه شود | draw/uniform/input و image delta گذشته؛960000 submitted index تعداد گل نیست؛ pointer→pixel causality هنوز کامل ثابت نیست |

مسئول کد آینده: `FlowerPointField` و `PointerInteraction`؛ CameraRig از P3، shader/effects از P5 و source/rights gate از P0 ورودی می‌دهند. بازبین باید «recovered bytes»، «archived observation»، «authored compatible implementation» و «visual comparison» را در receipt جدا نگه دارد.

W پس از اجازه، working run خصوصی خارج از repository است. مسیرهای کد پیشنهادی: `prototype-original/src/scene/flower-field.mjs`، `prototype-original/src/scene/atlas-sampler.mjs` و `prototype-original/src/interaction/pointer-field.mjs`. قراردادهای بررسی‌شده در `prototype-original/analysis/`، آزمون‌های authored در `prototype-original/tests/flower-field.mjs` و `prototype-original/tests/pointer-effects.mjs`، دادهٔ نتیجه در `QA/artifacts/` و تصاویر خصوصی در `review/` قرار می‌گیرند. `QA/receipts/Gnn.json` نسبت به همان W است؛ هیچ کد، fixture یا renderer با این سند ساخته نشده است.

## کارهای قابل ارجاع به کد و اثبات

پیش‌نیاز مشترک: P0 identity/rights، P1 closure/bridge، P2 resolver و فریم، P3 coordinate/camera contract. بررسی ایستای atlas interface می‌تواند پیش از render انجام شود؛ runtime vendor نیاز به اجازهٔ جدا دارد. پیشوند شناسه‌های جدول `DJMRN-X44-` است.

| کار / gate / X44 | ورودی و خروجی پیشنهادی | شکاف و مسیر inspect → reuse/extend → compatible | آزمون قطعی پیشنهادی و وابستگی |
|---|---|---|---|
| P4.1 / G10 / P005,P007 | ورودی دو atlas از A10 و sampler/interface source؛ خروجی `QA/artifacts/scene/atlas-layout.json`، `QA/artifacts/scene/flower-atlas-uv-test.json` و sheet review خصوصی. | ابعاد معلوم، cell selection/UV و نقش flower/leaf نه. نخست selector source و padding/flip/color-space را inspect؛ valid sampler reuse؛ artwork authored فقط اگر مجوز/asset ناکافی و با برچسب compatible. تعداد cell حدس زده نشود. | تمام cellهای استفاده‌شده schema و UV در[0,1]؛ صفر unknown index؛ fixture هر index را یک‌بار نشان دهد؛ 3 مقدار مرزی index خطای کنترل‌شده؛ summer/winter mapping برابر layout تأییدشده. pixel/color-space/alpha در corner/center نمونه‌های ثابت گزارش شود؛ هیچ texture fetch خارجی. وابسته G08؛ اثر glow هنوز G22 نیست. |
| P4.2 / G18 / P007 | ورودی draw metadata، generated geometry و attribute arrays؛ خروجی `QA/artifacts/scene/geometry-capacity.json` و `QA/artifacts/scene/geometry-point-count-test.json`. |960000 index submission با تعداد گل/برگ/unique vertex برابر نیست. inspect index/attribute lengths و repeat/draw count؛ existing geometry فقط اگر سازگار؛ در نبود داده original instance data مستقل بساز. | draw mode، indexCount، unique referenced vertex، capacity، rendered flower/leaf counts جدا ثبت؛ تمام indices<capacity و finite attrs؛ تعداد logical instance از schema نه draw count؛ fixed seed در دو اجرا array hash یکسان. هر عدد unknown صریح باشد. وابسته G07/G10. |
| P4.3 / G19 / P007 | ورودی terrain A10، atlas layout، camera basis و point attributes؛ خروجی `prototype-original/src/scene/flower-field.mjs`، `QA/artifacts/scene/flower-geometry-compat-test.json` و `QA/artifacts/scene/attribute-contract.json`. | vendor mesh موجود نیست؛ camera GLB صفرmesh دارد؛ OWN GLB exporter نتیجهٔ original نیست. نخست field generation source را inspect؛ generator قابل استفاده در route مجاز reuse؛ تنها attr/generator فاقد شواهد compatible authored شود. | تمام required attr names/itemSize/length مشخص؛0NaN/Inf، bounds و seed ثابت؛ terrain UV داخل دامنه؛ هیچ fallback پنهان؛ screenshot نزدیک/میانه/دور با camera ثابت. label هر buffer و artwork origin؛ این PASS ادعای recovered vendor mesh نمی‌دهد. وابسته G18 و G13/G14. |
| P4.4 / G20 / P008 | ورودی normalized camera depth، per-point flower/leaf flag و growth parameters؛ خروجی `QA/artifacts/scene/depth-growth-contract.json` و `QA/artifacts/scene/depth-growth-test.json`. | source hints موجود، curve/timing بصری اصلی کامل ثابت نیست. ابتدا equation/update order را inspect؛ original driver با اجازه reuse؛ simulation مستقل فقط با curve/واحدهای اعلام‌شده. | 3depth ثابت near/mid/far و حداقل یک flower و یک leaf؛ output scale finite/nonnegative؛ near flower بزرگ‌تر از far طبق قرارداد، leaf growth threshold دورتر از flower؛ camera fixed وtime fixed نتایج تکراری. تغییر یک پارامتر فقط همان اثر مستند را عوض کند؛ exact source equation معیار، یا tolerance authored جدا اعلام شود. وابسته G19/G14. |
| P4.5 / G21 / P012 | ورودی pointer normalized، viewport aspect، point screen coords و time step؛ خروجی `QA/artifacts/interaction/pointer-repulsion-contract.json` و `QA/artifacts/interaction/pointer-repulsion-test.json`. | uniform موجود اثبات falloff و cause نیست. inspect transform و sign؛ input adapter را extend؛ در missing algorithm distance field authored با radius/falloff و coordinate units ثابت بساز. | replay مرکز/چپ/راست/خارج viewport، همان seed وdt؛ nearby point جهت دورشدن صحیح و finite؛ خارج radius در authored field اثر0باtolerance1e-6؛ leave/cancel اثر را به baseline برگرداند؛ 2replay خطا≤1e-5. اگر source global influence دارد آن را به radius محلی تحریف نکن: تفاوت و تصمیم صاحب پروژه ثبت شود. وابسته G13/G19؛ touch/scroll مالک G15 است. |
| P4.6 / G22 / P013 | ورودی همان replay، glow factor، camera tilt factor، exposure/bloom ثابت؛ خروجی `QA/artifacts/interaction/glow-tilt-contract.json` و `QA/artifacts/interaction/glow-tilt-test.json`. | per-sprite brightness، tilt و bloom در تصاویر گذشته تفکیک نشده‌اند. ابتدا source uniform driver؛ هر کدام را جدا instrument؛ compatible uniform driver اگر linkage اصلی روشن نیست. | سه replay یکسان: glow-only، tilt-only، هردو off؛ off→glow تصویر فقط اثر منتسب و camera matrix بدون تغییر≤1e-5؛ off→tilt matrix تغییر finite/bounded مطابق قرارداد و glow uniform ثابت؛ leave→baseline≤1e-5 پس از زمان settling مستند. shader output clipping/NaN صفر؛ exposure/bloom ثابت ثبت. وابسته G21/G17؛ full bloom gateG23 جداست. |

بازه‌های tolerance این سند **معیار پیشنهادی تست آینده** هستند، نه نتیجهٔ اندازه‌گیری vendor. پارامترهای رفتار از source قابل اثبات استخراج شوند؛ اگر موجود نبود، authored contract با شمارهٔ تصمیم ثبت شود. شاخهٔ سازگار نباید به‌عنوان original commercial implementation معرفی شود.

## برش عمودی و مرز فاز بعد

برش قابل اجرا پس از مجوز: یک field کوچک با seed ثابت و atlas/camera source روشن؛ سه pose دوربین؛ یک pointer replay؛ نمایش جداگانهٔ count/attributes و امکان خاموش‌کردن growth/glow/tilt در review فقط توسعه‌دهنده. نخست G10/G18/G19، سپس G20 و G21/G22. تعداد کم test point برای اثبات قرارداد کافی است؛ equivalence کیفیت و scale تمام scene باید در G36/G39 جدا اثبات شود.

hover stop، dispersal و بازگشت کامل مالک G26–G28 هستند؛ گرچه source vertex `uDispersalProgress` دارد، PASS این فاز آنها را کامل نمی‌کند. audio lowpass/gain نیز G29/G30 است. pointer hover، state transition و camera flight سه I/O جدا با یک coordinator/clock باشند تا اثرها قابل انتساب بمانند.

## receipt، شکست، هزینه و rollback

برای هر G10، G18، G19، G20، G21 و G22، `QA/receipts/Gnn.json` در `<RUN>` لازم است: run/code/source SHA، evidenceClass و origin هر buffer/texture، seed، viewport/DPR، camera pose، dt/replay، پارامترهای fixed و changed، expected/actual assertions، artifactهای خصوصی نسبی، وضعیت، limit/unknown، مجوز مرتبط و rollback. receipt static که فقط schema یا source را می‌خواند `runtimeVerified:false` داشته باشد؛ screenshot بدون input/state ثابت مدرک causal نیست.

در mismatched SHA، UV نامعلوم، count مبهم یا NaN/fatalGL توقف؛ «960000 گل» ننویس و mesh fixture را vendor معرفی نکن. rollback با خاموش‌کردن تنها feature جدید یا بازگشت به run pin شده و seed/pose ثابت؛ source archive تغییر نکند. پس از failure همان replay حداقلی بازاجرا شود، نه گسترش بی‌هدف quality. منابع GL/RAF/input listener متعلق به field پاک‌سازی شوند؛ آزمون lifecycle کامل G37 را باز نگه دار.

رندر original/کپی media خصوصی و اجرای vendor اجازهٔ جدا می‌خواهد؛ public output فقط پس از حقوق روشن یا authored assets/code. هیچ parser/install/download یا هزینهٔ بیرونی پیش‌فرض نیست. روی8GB یک harness، کمترین pointCount/DPR برای قرارداد، effects غیرضروری خاموش و تنظیم‌ها داخل receipt. RAM زیر100MiB available: توقف اضطراری، ثبت state و teardown. CPU timings جای timingGPU نیست؛ physical mobile QA و fallback به G42 وابسته‌اند.

DONE این فاز: قرارداد atlas/geometry/depth/pointer با source provenance روشن، replayهای قطعی و شش receipt دارای proof واقعی؛ unknownهای fidelity، حقوق و causal vendor effect همچنان جدا اعلام شوند. فایل source یا تصویر زیبا به‌تنهایی تکمیل این مرحله نیست.

