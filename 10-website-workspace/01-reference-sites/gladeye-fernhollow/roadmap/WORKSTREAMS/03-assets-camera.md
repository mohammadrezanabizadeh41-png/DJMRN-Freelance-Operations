# P2 / P3 — منابع، نخستین فریم و دوربین/اسکرول

وضعیت: طرح مرحله‌ای برای baseline اصلی؛ file bytes موجودند، اتصال loader/camera/renderer در یک برنامهٔ اجراشده هنوز اثبات نشده است. تغییرات هنری بعدی و prototype مستقل خارج از ورودی این سند هستند.

## هویت منابع و مسئولیت

aliasها در `../SOURCE-ROUTES.md` تعریف می‌شوند: `OWNER`، `INDEX`، `F17`، `A10`، `X44/`، `X45/`، `X46/`، `X19/static/889.js` و sourceهای آرشیوی. مسیرهای این سند هیچ مسیر خصوصی مطلقی افشا نمی‌کنند. pathهای خروجی نسبت به `<RUN>` خصوصی آینده‌اند.

| منبع | شاهد قابل اتکا | حد شاهد |
|---|---|---|
| `A10` = `X45/X45-PRIVATE-TEN-ASSET-CROSSWALK.json` | SHA256 `2329dca56f565d999e6b9001ac098271a786c5757ad70d194d355f915c961ff5`؛ ده resource دقیق | loader، sampling یا playback کارا |
| `X45/X45-EXECUTION-CHECKLIST.csv` | SHA256 `e4b44acb174c060e3540bcb255dc41b85b0484f2b48195969cb1ecbc922b3836`؛ G07–09 و G13–17 | نتیجهٔ PASS |
| camera GLB از A10 | 10,132B؛ SHA256 `dab4459358d8d22ec633152119ec9939947336a0f116c7aca746407403630d4e`؛ glTF2، صفر mesh، یک perspective camera، translation/rotation/scale هرکدام200 key، LINEAR، بازه0 تا8.291667s | flower mesh یا برابری با active OrthographicCamera آرشیوی |
| `02-reviewed-derived/X01-render-camera-material-study.json` نسبت به آرشیو | SHA256 `b08a350e8202d63a471e0c11555fd6d7808270dd64ce27dee50bb642b47565e3`؛ camera metadata و canvas قدیمی WebGL2 | runtime جدید، علت حرکت و fidelity |
| `X19/static/889.js` | SHA256 `60abecd12cdf56e25ffb16ea236d2287f32b6d46393e17c131d29fba6be40603`؛ loadAssets، camera/scroller و `touchMultiplier:20` در بررسی ایستا | کالیبراسیون ورودی فیزیکی و camera rig صحیح |
| `LOCAL-06445` در SOURCE-ROUTES | SHA256 `2ed532c6c31485c158e9cb8417d815cfd29c793675b71a41926c20722946b9f6`؛ snapshot گذشته OrthographicCamera، draw/uniform | اثبات اینکه camera GLB همان camera خروجی است |
| `LOCAL-09275` در SOURCE-ROUTES | SHA256 `0fee4b398f6515992d7802b08147b388a1abb37a351e740975d8df8743a60c46`؛ input trusted و تصویر متغیر در24phase | cause pointer→camera، idle drift دوربین یا موبایل فیزیکی |

مسئول کد P2: `ResourceResolver` و `SceneCoordinator`؛ مسئول P3: `CameraRig` و `VirtualScroller`؛ یک مجری scoped می‌تواند هر دو را بنویسد. بازبین باید binary/trace را از screenshot جدا ارزیابی کند. تصمیم استفاده از original engine یا compatible route با صاحب پروژه است.

W پس از اجازه، working run خصوصی خارج از repository است. مسیرهای کد پیشنهادی: `prototype-original/src/assets/resource-resolver.mjs`، `prototype-original/src/runtime/scene-coordinator.mjs`، `prototype-original/src/camera/camera-rig.mjs` و `prototype-original/src/camera/virtual-scroller.mjs`. fixture/replay و آزمون authored در `prototype-original/tests/assets-loader.mjs` و `prototype-original/tests/camera-input.mjs` قرار می‌گیرند؛ manifest بررسی‌شده در `prototype-original/analysis/valley-10-local-manifest.json` و نتیجه‌های اجرا در `QA/artifacts/` ثبت می‌شوند. `QA/receipts/` و `review/` هم‌سطح `prototype-original/` هستند. این مسیرها موجودبودن کد یا اجازهٔ اجرای vendor را ادعا نمی‌کنند.

## P2 — ورودی محلی و فریم قابل مشاهده

پیش‌نیاز مشترک: CODE-01 خروجی pin شده، CODE-02 closure/bridge contract و تصمیم حقوقی/امنیتی پیش از اجرای original. G08 را می‌توان ایستا بررسی کرد؛ G07 اجرای واقعی است. ساخت map ده resource با font resolution یکی نیست؛ G12 در workstream UI/asset وابسته باقی می‌ماند.

| کار / gate / X44 | I/O، شاهد و شکاف | inspect → reuse/extend → compatible | آزمون بعدی و معیار قطعی پیشنهادی |
|---|---|---|---|
| P2.1 / G08 / P005,P034 | ورودی A10 و bodyهای اصلی؛ خروجی `QA/artifacts/assets/valley-10-local-manifest.json` با logical URL، MIME، byteSize، SHA، origin و working-copy path. ده bytes مستقل بررسی شده‌اند؛ URL rewriting/runtime هنوز نه. | A10 را reuse؛ alias hashed basename را به نام منطقی دقیق نگاشت کن. missing نباید با fetch خاموش پوشانده شود. substitute فقط با provenance و برچسب compatible و تصمیم مستقل. | دقیقاً10 URL یکتا و10 MATCH؛ ambiguity/escape path صفر؛ هر MIME از نوع فایل تعیین شود. برای هر مورد یک آزمون «فایل حذف‌شده از working fixture» باید `MissingResource` بدهد و هیچ fetch خارجی نکند. SHAهای قبل/بعد source مساوی؛ manifest normalized در دو بار یکسان. |
| P2.2 / G09 / P009,P034 | ورودی GLB اصلی، URL/MIME/filename rule OWNER؛ خروجی `QA/artifacts/assets/camera-loader-test.json` و `QA/artifacts/camera/camera-glb-metadata.json`. شکاف: data URI با نام `camera-path.glb` و loader اجرا نشده‌اند. | ابتدا parser/loader موجود را inspect؛ local resolver/name adapter را extend؛ اگر parser مجاز سازگار نیست فقط loader مستقل مجاز یا compatible trajectory با برچسب authored. | کنترل GLB magic/version/declared length و bounds؛ صفر nonfinite در200 sample/channel. parse محلی با MIME/name منتخب موفق؛ خراب‌کردن header یا missing buffer به error مشخص برسد. data URI و local-file route در نمونه‌های t=0,25%,50%,75%,100% transform یکسان با tolerance1e-5 بدهند؛ اجرای loader نیازمند brief مجاز. |
| P2.3 / G07 / P002,P004,P029,P030,P041,P042 | ورودی boot P1 و resolver P2؛ خروجی `QA/artifacts/runtime/first-frame.json`، screenshot خصوصی و trace WebGL. bytes حاضر به معنی render حاضر نیست. | نخست coherent original با اجازه؛ adapter حداقلی. اگر وابستگی حل‌نشدنی/ناامن است، فقط زیرجزء لازم authored شود و artifact `COMPATIBLE_RUNTIME` ثبت شود. | 3 cold boot در viewport1280×720: canvas>0، WebGL2، صفر fatal error/rejection، و حداقل یک scene draw پیش از timeout30s. حداقل0.1% pixel با رنگ background متفاوت در دو frame پس از readiness؛ این فقط nonblank check پیشنهادی است، نه fidelity. source/render size، renderer و timestamp ثبت؛ صفر درخواست شبکهٔ خارجی. |

ده مورد A10: ambient MP3، camera GLB، summer/winter atlas، dust، سه ray، terrain و vignette. مجموع ده file از fonts مستقل است. G10 در P4 و G11 در effects باید «مصرف صحیح» آنها را بعداً نشان دهند؛ G08 فقط identity/mapping را پاس می‌کند.

## P3 — مسیر دوربین و ورودی قابل بازپخش

قبل از قضاوت visual، active scene camera از cameraهای composer جدا شود. OrthographicCamera موجود در snapshot ممکن است متعلق به fullscreen pass باشد؛ این احتمال فقط فرضیه است تا trace آن را نشان دهد. دادهٔ GLB یا pixel delta به‌تنهایی سببیت حرکت را ثابت نمی‌کند.

| کار / gate / X44 | I/O و شکاف | تصمیم کمینه و وابستگی | معیار قطعی پیشنهادی / artifact |
|---|---|---|---|
| P3.1 / G13 / P009,P004 | ورودی GLB، source F17/X19 و نمونهٔ X28؛ خروجی `QA/artifacts/camera/camera-binding-evidence.json`: graph parent/child، camera type، active camera هر pass و source transform. رابطهٔ perspective/orthographic باز است. | inspect source و trace مجاز؛ reuse rig اصلی اگر ارتباط مستقیم ثابت شود؛ transform bridge فقط با ماتریس/واحد/محور مستند. اگر ثابت نشد compatible rig جدا، بدون ادعای recovered mapping. وابسته G07/G09. | در هر scene draw cameraID/type/projection مشخص؛ صفر pass با camera ناشناخته؛ پنج زمان ثابت graph/matrix finite؛ camera composer به‌اشتباه مرجع flight نشود. UNKNOWN→PARTIAL، نه PASS. |
| P3.2 / G14 / P009 | ورودی200key/channel و rig؛ خروجی `QA/artifacts/camera/camera-path-regression.json` و `QA/artifacts/camera/path-samples.json`. interpolation/orientation اتصال نهایی ثابت نیست. | خود keyها را read-only تحلیل؛ playback مجاز را reuse؛ اگر spline authored لازم شد تفاوت با LINEAR و دادهٔ اصلی صریح ثبت، بدون تغییر GLB. وابسته G13. | هر600 key/channel entry finite و time مرتب؛ duration با8.291667 در tolerance1e-5؛ t=0,1/4,1/2,3/4,end با sampler مرجع مستقل: position/scale max abs error≤1e-5 و quaternion angular error≤1e-4 rad. world matrix با tolerance1e-4؛ loop/endpoint rule از source مشخص و بدون jump ثبت. |
| P3.3 / G15 / P010 | ورودی wheel/touch delta، dt، bounds و camera progress؛ خروجی `QA/artifacts/camera/scroller-input-contract.json` و `QA/artifacts/camera/input-replay.json`. source calibration/damping اجرا نشده. | inspect virtual-scroller و reuse؛ حداقل adapter برای event normalization. در missing/unsafe module فقط scroller authored با unit/sign/bounds/damping مشخص. وابسته G14. | fixture seed ثابت و600tick ثابت1/60s؛ دو replay normalized یکسان؛ progress همیشه finite و داخل bound قرارداد؛ overscroll هر دو جهت از bound خارج نشود؛ leave/cancel پاک‌سازی شود؛ net-zero fixture طبق damping تعریف‌شده به حالت انتظار برسد. camera progress و raw scroll جدا log شوند. |
| P3.4 / G16 / P010 | ورودی همان delta نرمال‌شده و switch wheel/touch؛ خروجی `QA/artifacts/camera/touch-scale-test.json`.20x از OWNER و source آمده، حس فیزیکی دستگاه ثابت نیست. | مقدار20 را حفظ کن؛ ابتدا مقایسه در نقطهٔ multiplier قبل از clamp/damping؛ tuning جدید فقط overlay و تصمیم جدا. وابسته G15. | delta برابر و بدون clamp: ratio touch/wheel در همان stage برابر20 با tolerance1e-6؛ پس از damping همان normalized replay قابل تکرار؛ pointercancel/touchend گیر ایجاد نکنند. mobile emulation نتیجهٔ physical-phone محسوب نشود. |
| P3.5 / G17 / P011,P013 | ورودی clock ثابت، input خاموش/فعال و camera state؛ خروجی `QA/artifacts/camera/idle-camera-test.json` با no-input/hold/resume. pixel change گذشته فقط autonomous rendering را ثابت می‌کند. | ابتدا source rate/trigger را inspect؛ drift/tilt موجود را instrument؛ اگر الگوریتم بازیابی نشد compatible state با نرخ و pause/resume قراردادی اعلام شود. وابسته G15؛ hover pause به G26 و tilt attribution به G22 وصل است. | replay10s no-input،10s input/hold و10s resume با dt ثابت؛ trajectory در دو تکرار با max error≤1e-5؛ rate از source/قرارداد ثبت شود؛ no-input drawing به‌جای camera motion شمرده نشود. حالت pause باید progress ثابت با tolerance1e-5 داشته باشد و resume از همان pose ادامه یابد؛ زمان easing از source یا تصمیم authored صریح بیاید. |

## شواهد، failure و rollback

برای G07، G08، G09 و G13 تا G17، مسیر `QA/receipts/Gnn.json` لازم است. هر receipt: source alias+SHA، run/code SHA، ابزار/نسخه، مجوز مرتبط، evidenceClass، inputs/seed/viewport/dt، expected/actual هر assertion، artifactهای نسبی، limitations، state و rollback. `STATIC_IDENTITY`، `ARCHIVED_OBSERVATION` و `ORIGINAL_RUNTIME/COMPATIBLE_RUNTIME` جدا باشند؛ PASS hash به معنی PASS shader/visual نیست.

در hash mismatch، mapping مبهم، nonfinite transform، network request غیرمنتظره یا parse failure توقف؛ source را اصلاح نکن. خطای resolver به placeholder خودکار و موفقیت کاذب تبدیل نشود؛ missing path صریح ثبت گردد. rollback: harness owned بسته، working run حفظ/کنارگذاشته و run سالم قبلی فقط از manifest pin شده بازتولید شود؛ هیچ reset/pull/merge یا حذف آرشیو لازم نیست. در شکست camera، snapshot آخرین pose/phase و input replay پیش از هر تغییر گرفته شود؛ تغییر یک مؤلفه و re-test همان fixture انجام گیرد.

## اجازه و منابع دستگاه

در این بسته فقط برنامه نوشته می‌شود. original loader/renderer و vendor chunks بدون اجازهٔ جدا اجرا نمی‌شوند؛ حقوق media و کد هنوز مانع انتشارند. هیچ download/install، حساب، tunnel، billing یا سرویس بیرونی پیش‌نیاز اجباری نیست. single-file packing متعلق به G40 بعدی است؛ فعلاً resolver چندفایلی خصوصی ساده‌تر برای تشخیص است و هنوز ساخته نشده.

روی8GB: یک browser/harness، DPR پایین اولیه و postprocess حداقلی؛ نوع کیفیت در receipt ثبت شود تا کاهش کیفیت با fidelity اشتباه نشود. RAM قبل از start و طی run خوانده شود؛ زیر100MiB available توقف اضطراری، ثبت آخرین وضعیت و teardown. camera/asset parse سبک نیز نباید هم‌زمان با render سنگین اجرا شود. physical mobile، context loss و lifecycle نهایی به G37/G42 وابسته‌اند و با این سند DONE نمی‌شوند.

DONE این دو فاز: mapping10/10 و GLB identity روشن، فریم واقعی با برچسب original/compatible، camera binding و replay قابل تکرار، receiptهای هشت gate و unresolvedهای باقی‌ماندهٔ صریح؛ هیچ ادعای full-scene fidelity صرفاً از binary metadata پذیرفته نیست.

