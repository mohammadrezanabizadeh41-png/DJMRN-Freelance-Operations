# مسیر و هویت منابع مرجع

[نقشه‌راه](ROADMAP.md) · [راهنمای شروع](START-HERE.md)

**قدرت هر منبع به پرسش بستگی دارد.** OWNER مرجع خواستهٔ مالک است. F17 و A10 مشخص می‌کنند چه بایت‌هایی در آرشیو وجود دارد. X28 و X35 رفتار مشاهده‌شدهٔ تاریخی را توصیف می‌کنند. هر ادعای رفتار بازسازی، رسید همان اجرا را لازم دارد.

## یافتن منابع در نشست بعدی

از ریشهٔ پروژهٔ والد، `00-program/profiles/website-sources/CODEX-START.md` و `PROFILE.json` محلی را بخوانید. شاخهٔ `pc.historic_original_archive` ریشهٔ آرشیو و `pc.X46_handoff` محل index را تعیین می‌کنند. مسیرهای جدول نسبت به آرشیو هستند؛ برای X42، X43-A/B، X44، X45، X46، X48 و X49، پیشوند `OFFLINE-CODEX-HANDOFF/` را اضافه کنید. در فایل‌های کار، X19/static/889.js و X20/module-9169.js به ترتیب به LOCAL-02485 و LOCAL-02970 اشاره دارند. آدرس‌های کامل PC فقط در پروفایل محلی حل می‌شوند.

- **OWNER** همان LOCAL-00001، ۱۸۴ خط، ۱۳۲۴۱ بایت است. متن کامل و HTML داخل آن فقط محلی خوانده می‌شود.
- **INDEX** همان `X46/EVIDENCE-INDEX.json` با SHA-256 `129f08cbd4d2f760e5f162b3991630a2337edf6961801f2a8c29a93e0aad6872` است. ۱۰۶۶۹ ردیف metadata شامل ۹۲۸۳ رکورد اصلی X01–X35، ۱۵۲ ورودی تکمیلی و ۱۲۳۴ ورودی درخت GitHub است. شمارش، ادعای خواندن بدنه‌ها نیست.
- **F17** خانوادهٔ `X03-20261118T182114Z/offline-export` در X03 و اولین خانوادهٔ کامل DERIVED-0088 است. ترتیب و SHA در جدول پایین مرجع preflight آینده است. سه X03، یک X04 و یک X05 پنج خانوادهٔ کامل تاریخی را تشکیل می‌دهند.
- **A10** نگاشت ده نام منطقی به بایت‌های X01 در DERIVED-0090 است؛ X46 همان دارایی‌ها را با alias مبتنی بر SHA قابل جست‌وجو می‌کند.
- مسیر عمومی از ریشهٔ repo، `10-website-workspace/01-reference-sites/gladeye-fernhollow/roadmap/` است. سابقهٔ فنی در `09-self-marketing-website/graphics/flower-valley/evidence/` و `handoffs/` در commit `96900a7919881eb620295d11471da52450f7bf23` قابل مقابله است. نام‌های عمومی X44-ORIGINAL-PROMPT-PUZZLE-MATRIX و X45-ORIGINAL-ENGINE-COMPONENT-IO-CONTRACTS در همان evidence قرار دارند. مرجع روی PC برای گیت‌ها DERIVED-0085 و برای قطعات DERIVED-0045 است.
- برای یک سؤال مشخص، از ریشهٔ والد با Python موجود `py -3.14 -B 00-program/QUERY-SOURCES.py --status` و سپس مثلاً `--query camera-path07 --limit 5` یا `--verify-id LOCAL-02485` استفاده شود. اگر مسیر خواندنی در دسترس نبود، همان locator و خطا در رسید ثبت شود. snapshot قدیمی GitHub فقط فهرست است.
- X43-B تعداد ۶۹ اختلاف جای‌گذاری/محتوا بین PC و GitHub را باز می‌گذارد. ۹۰ تصویر به برچسب مالک نیاز دارند. checksum یک شاهد را شناسایی می‌کند؛ برابری رفتار، نسخهٔ تصویری و حق انتشار موضوع تصمیم دیگری‌اند.

## جدول ارجاع، با SHA-256 ثبت‌شده در INDEX

| شناسه | مسیر نسبی | SHA-256 |
|---|---|---|
| `LOCAL-00001` | `00-source-prompt/owner-supplied-Fernhollow-prompt-PRIVATE.txt` | `e2ea5a1c99a69f0a234c9ac75435947aacda54a03c07a45e48185f33b520533d` |
| `LOCAL-02485` | `01-private-captures/X19/full-verified-js-unpack/06-5f164d7403807a/static/889.js` | `60abecd12cdf56e25ffb16ea236d2287f32b6d46393e17c131d29fba6be40603` |
| `LOCAL-02970` | `01-private-captures/X20/wakaru/app-page-strict/module-9169.js` | `4ccb7f819360194d8f87145de11803c3ee4ff2170c334647c7f8116d0ffcad13` |
| `LOCAL-06445` | `02-reviewed-derived/X28-CURRENT/X28-FULL-SPECTOR-ISPETTORE-PLAYWRIGHT-2X90S-X01-X27-HANDOFF-2026-11-20.md` | `2ed532c6c31485c158e9cb8417d815cfd29c793675b71a41926c20722946b9f6` |
| `LOCAL-09275` | `02-reviewed-derived/X35-CURRENT/X35-FULL-STRICT-90S-LIVE-INTERACTIONS-OWN-PNG-X01-X34-FINAL-HANDOFF-2026-11-21.md` | `0fee4b398f6515992d7802b08147b388a1abb37a351e740975d8df8743a60c46` |
| `DERIVED-0045` | `X44/PROMPT-EVIDENCE-TRACE.csv` | `c33f1a3dfac1ff2824d55dd651c27b23665ad8a69d1f48b2a93e73a6c1dc642b` |
| `DERIVED-0050` | `X44/X44-ORIGINAL-PUZZLE-ROWS.json` | `7956ca2ed0e2477550e97d53183e5b97edec392c1ba975ba270111c5de4c3393` |
| `DERIVED-0065` | `X48/X48-SHADER-DEPENDENCY-MAP.md` | `c27e223037281886951b5db153f6d87edb1b78e4ccc8325993a832d4ea44ed77` |
| `DERIVED-0071` | `X49/EXTRACTION-LOSS-REPORT.md` | `83e5aeb449be86ac35cefbc0f047f6fcb94aa77cd56df7a30a5be591a27f8b30` |
| `DERIVED-0079` | `X45/COMPONENT-CONTRACTS.md` | `823fbbcfe1080986f825f4c53eab2e6762952e587d1c2d303b4f8b3e36a967c5` |
| `DERIVED-0080` | `X45/IMPLEMENTATION-ARCHITECTURE.md` | `c7fbdcc80faafbb4ac721252197f8a9614d61e83a97f476a71666412e8ecafd4` |
| `DERIVED-0081` | `X45/PERFORMANCE-TEST-PLAN.md` | `f4c9a333399b199c44d079cf915e57fd4c6fd630c7f416f741c399acfdab70af` |
| `DERIVED-0084` | `X45/X45-DETAILED-GAP-MATRIX.csv` | `dd4b22f94abff13a9318f7866f8acfdf5b0ae64c50f88b97e6653457039c70ca` |
| `DERIVED-0085` | `X45/X45-EXECUTION-CHECKLIST.csv` | `e4b44acb174c060e3540bcb255dc41b85b0484f2b48195969cb1ecbc922b3836` |
| `DERIVED-0088` | `X45/X45-PRIVATE-SNAPSHOT-FAMILIES.json` | `cd4346b38110b159f04de34ccab5214256bccdb27c7be74ea25101b0cb034f05` |
| `DERIVED-0090` | `X45/X45-PRIVATE-TEN-ASSET-CROSSWALK.json` | `2329dca56f565d999e6b9001ac098271a786c5757ad70d194d355f915c961ff5` |
| `DERIVED-0092` | `X45/X45-RIGHTS-AND-FAILURE-GATES.md` | `7de3881607ead141af69d5ae14bf6c0340023e5aa02ea7144c645d2910886858` |
| `DERIVED-0007` | `X42/X42-PUBLIC-SAFE-RESULT.json` | `c0489f51d80318990afc0504c26246db7805e3e838ef1b0bc0857080dc835dd1` |
| `DERIVED-0017` | `X43-A/X43-A-DUAL-SOURCE-REPORT.md` | `c824b4a7918df1d8a60b65b9b919489e5d5b4bd08331bddfa6630ef1cb02f93a` |
| `DERIVED-0041` | `X43-B/X43-B-PUBLIC-SAFE-RESULT.json` | `5afd414cf850914435718490be47c2d544cd2d752245c4b67ae5a449eb5d59b6` |
| `DERIVED-0060` | `X48/X48-LIMITATIONS-AND-GAPS.md` | `73f1e149889956d18752f05ca9499a42fdbd13df09889d86acbe4b6d9cf1ef03` |
| `DERIVED-0077` | `X49/X49-TESTS.json` | `07e1dc4ca3e134014dfd0fdc8eea2f4645e25b5b4b7f2b015b230913a348334f` |

## ترتیب بارگیری F17

مسیرها نسبت به ریشهٔ F17 هستند. هر ۱۷ SHA در ممیزی روی همین خانواده تطبیق داشتند.

| ردیف | مسیر منطقی | SHA-256 |
|---|---|---|
| 1 | `_next/static/chunks/webpack-a76c04a7ba9aa4ef.js` | `13f586eb25d4e6f57051065209d08451be11457460cf434215df3382d047ffcf` |
| 2 | `_next/static/chunks/fd9d1056-76aadce26f555392.js` | `1ddb9d41f476ede4d9323e44750c2cc1a0979422c8ab2a2926cc621192e4b414` |
| 3 | `_next/static/chunks/123-3b7f3df3cc5866d7.js` | `3e7769adb300b07540540a441ee768d720cda8d31d38fe1f897f9b4a51e47154` |
| 4 | `_next/static/chunks/450-96e2a31dde902aa5.js` | `07f6da685fd76e30a9c1f1d9a0e55a121025fdc70da239ff79420f6af73d661e` |
| 5 | `_next/static/chunks/567-6466d5cc81546a43.js` | `d760ffed0990e4d67451e4ad9034a4204b902520d063bd3c12c8fa8c70b8911f` |
| 6 | `_next/static/chunks/340-4c85e05b44fc7370.js` | `5e520073975eefe554444e98fb4ca660868702c2b476035897781c3ca35ce0e9` |
| 7 | `_next/static/chunks/15-91b52fecfdd8e21a.js` | `d6e8133aa3ab4e2fadc541e3cb559dc20845f36ee08df7b5783b07102c6b5022` |
| 8 | `_next/static/chunks/780-35f43a00462f78e8.js` | `bef8c0267c6ab029782194ecaa11472ad1a16d67e867834c53010eecbca64683` |
| 9 | `_next/static/chunks/419-c9aec889e32d9e7b.js` | `e4de34bf8a456614d34fd366586215992568f441d4c6782df2b3ac7c43b6651d` |
| 10 | `_next/static/chunks/131-8efcfd03f067c029.js` | `369384fe40390e3453ffb3c0e08ff528346d7b617bc9195715c8a5e38c882e8b` |
| 11 | `_next/static/chunks/app/layout-681f1a9fe4dd4628.js` | `133b733f5eab7e315ef06ec9841d9f7c00106d9884482581377325478c9a9fa1` |
| 12 | `_next/static/chunks/4b5b508e-6dceef0b9f02cb18.js` | `c837957c63f427ac0a093eb8a98c196c7aed24dd62c115e1df877cd53634a1de` |
| 13 | `_next/static/chunks/8-5234b317a5794281.js` | `31a365665836e8f3829c1a30bd34c95370c63f1b62902a11f20c20e74ccf0804` |
| 14 | `_next/static/chunks/785-3ec288b614fa287f.js` | `285f3d2c524ff2953aa51867725163ed08d13aa0f2e923d60255b94189c392a7` |
| 15 | `_next/static/chunks/b536a0f1-51636bd4ac051d8f.js` | `6cb3547ef492a1005a14e1c974dc12e5f4111a350e263ddbca3ded751019a419` |
| 16 | `_next/static/chunks/596-40a806be0d0d2bb3.js` | `ae2e3d716255d05c27d1784cfbaeb52c1d7ce264314cf29e0e4b2c18c66fa3a7` |
| 17 | `_next/static/chunks/app/page-4c279de0997d388f.js` | `90a44e1948b6b44ce64ae15342f69e71d2ccd3dfbb22919a17e02d649174ce52` |

## نگاشت A10

هر ده بدنه در ممیزی دوباره SHA شدند. نام فیزیکی می‌تواند بر پایهٔ hash باشد. برای رسید خصوصی از مسیر دقیق DERIVED-0090 استفاده کنید.

| مسیر منطقی | بایت | SHA-256 |
|---|---:|---|
| `/valley/audio/ge-ambient.mp3` | 3315774 | `e56ff90d828a14701832e4ece56f13791dfa25dfcddb0a64f40370ec763514d3` |
| `/valley/camera-path07.glb` | 10132 | `dab4459358d8d22ec633152119ec9939947336a0f116c7aca746407403630d4e` |
| `/valley/dust-particle.png` | 2102 | `6a1dde1724aac0069dea0fb01fd42c362efa647da85acb6a83a2c12c3f9c7efe` |
| `/valley/flowers/pool_summer.png` | 249287 | `6f16b2d004f5260df4bbd1b49b19c0e978f0bff709fd7385107dd90226dbec47` |
| `/valley/flowers/pool_winter.png` | 915892 | `bea3c0bd21f77a65d09650f9030fdd54cec3f92234ef6e79769f493ba8bf1c71` |
| `/valley/rays/ray1.png` | 295868 | `705002f9736633069b868df111942cdb3806de5f6b11f31b73995e4cbf638087` |
| `/valley/rays/ray2.png` | 225311 | `f6d0c3128ba89b03fa2cf93004736712664b810d9513a4fc6167f7ade2fa58d2` |
| `/valley/rays/ray3.png` | 222220 | `f45d34a16445db569800053b6edcc015682f4e35613fdf2793442f41eb5417f7` |
| `/valley/terrain.png` | 8562 | `13e59c971bcf087298c52086a9163914cfa026624fd14f55eaa8ac652c9c372e` |
| `/valley/vignette.png` | 7436 | `cb96021890661683b94bae5f0dda04c6aab9c2f86af5a96468c0a0fabdc32334` |

GLB شامل سه track با ۲۰۰ کلید و صفر mesh است. PNGها و MP3 هویت محتوایی مشخص دارند. UV، نمایش، مسیر صوت و مجوز هریک به شواهد جداگانه وابسته‌اند. برای بررسی ۴۳ الزام فقط trace رسمی X44 و OWNER ملاک‌اند. پیش‌نویس قدیمی X44 مرجع اجرایی نیست.
