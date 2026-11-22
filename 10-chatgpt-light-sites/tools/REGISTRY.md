# DJMRN — TOOLS / REGISTRY | کاتالوگ مرجع ابزارهای ساخت سایت سبک با GPT-6 و MCP
**Project ID:** DJMRN-CHATGPT-LIGHT-SITES-001 | **Research snapshot:** 2026-11-21  
**Stage map:** [01-PROFESSIONAL-STAGES.md](../01-PROFESSIONAL-STAGES.md)  
**Canonical tool catalog of this independent project:** tools/REGISTRY.md; the old top-level 02-TOOLS-CATALOG.md is only a pointer. Crosswalk to former 09/ tool research: [LEGACY-CROSSWALK.md](LEGACY-CROSSWALK.md).  
**Not an installation plan:** این فهرست «گزینه‌های موجود و کشف‌شده» است، نه فهرست نصب اجباری. هر پایلوت کمترین زیرمجموعه لازم را انتخاب می‌کند.

## واژه‌نامه حقیقت اتصال و موجودی
- **CONNECTED:** ابزار در همین چت آزمایش شد و اتصال پاسخ داد. **INSTALLED:** از winget/OS یا PATH موجود بودن ثبت شد؛ کیفیت اجرای پروژه هنوز تضمین نیست.
- **ARCHIVED:** فایل بسته/installer در Downloads یافت شد؛ **نه نصب است نه اتصال**. **CANDIDATE:** مخزن/مستند GitHub بررسی شد؛ نصب/سازگاری محلی آزموده نشده.
- **MCP DIRECT:** اکنون در toolset همین چت قابل فراخوانی است. **MCP OPTIONAL:** سرور MCP دارد ولی باید جدا با client bridge/permission متصل شود. **CLI INDIRECT:** می‌توان پس از setup و approval با Bridgerator آن را به‌صورت command اجرا کرد؛ خود CLI ابزار MCP این چت نیست.
- **MCP CLIENT:** خودش مصرف‌کننده MCP است؛ نصب آن لزوماً ابزار ویرایش را به ChatGPT expose نمی‌کند.
- **Cost:** کد OSS/اجرای لوکال ممکن است بدون هزینه مجوز باشد؛ cloud، hosting، API/model، نسخه Pro و افزونه تجاری جداگانه‌اند. unknown cost/terms = STOP قبل از activation.
- **Security:** فقط localhost و پوشه مصوب؛ هیچ dev server عمومی، browser-profile-sharing یا انتقال secrets بدون approval.

## A — لایه اجرای مرکزی، موجود روی لپ‌تاپ
| Tool | نوع / مرجع | مرحله و دلیل کاربرد | MCP / دسترسی | وضعیت دستگاه و تصمیم |
|---|---|---|---|---|
| **Bridgerator 1.1.19** | پل Remote MCP؛ ابزار متصل حساب | P01–P12: فایل/جست‌وجو/patch، PowerShell، تست و گزارش | **DIRECT**، تست online 2026-11-21 | **CONNECTED, CORE**؛ نیاز به نصب عامل دوم ندارد |
| **GitHub connector** | مرجع source/git در همین چت | P05/P11: branch، commit، read-back؛ یک code authority | ابزار متصل مستقیم | **CONNECTED, CORE**؛ از main و 09 جدا |
| **Git 2.55.0** | https://github.com/git/git | P05/P11: commit/diff/branch/revert | CLI INDIRECT | **INSTALLED**؛ بدون force-push/merge |
| **Node.js 24.22.1 + npm 11.19.1** | https://github.com/nodejs/node | P05–P09: dev server/build/test | CLI INDIRECT | **INSTALLED**؛ verify per-project lockfile |
| **VS Code 1.142.0** | https://github.com/microsoft/vscode | P05–P09: editor, find, refactor، بررسی پروژه | MCP client optional، no exposed server | **INSTALLED**؛ در تست قبلی extensions list خالی |
| **Python 3.14.7** | https://github.com/python/cpython | P03/P09: fixture، فایل/تصاویر، اسکریپت deterministic | CLI INDIRECT | **INSTALLED**؛ برای کار ساده به venv جدید نیاز نیست |
| **uv 0.13.5** | [astral-sh/uv](https://github.com/astral-sh/uv)، Python package/project environment manager | P05/P09: محیط ایزوله، نصب وابستگی‌های Python فقط در پروژه‌ای که واقعاً Python لازم دارد، lock/reproducibility | CLI INDIRECT از طریق Bridgerator؛ MCP Server مستقل نیست | **INSTALLED — winget live check 2026-11-21**؛ برای M02 با Node/Vite ضروری نیست، هیچ پکیجی اکنون نصب نشد |
| **Docker Desktop** | https://www.docker.com/products/docker-desktop/ | مسیر WP پیشرفته فقط در صورت نیاز DB سازگار | CLI INDIRECT؛ app نه لزوماً OSS | **INSTALLED**، runtime لازم نیست و پرمصرف؛ **HOLD** |
| **PHP / WP-CLI** | https://github.com/wp-cli/wp-cli | C/E: توسعه WordPress واقعی | CLI INDIRECT | دستورهای php/wp در PATH پیدا نشدند؛ نصب سراسری **مجاز نیست تا تصمیم** |

## B — فریم‌ورک‌های ساخت و UI، فقط یکی در هر پروژه
| Tool | نوع / GitHub | مرحله / تأثیر | MCP/وضعیت | انتخاب |
|---|---|---|---|---|
| **Vanilla HTML/CSS/JS** | Web platform standard، بدون package | A/D، P06–P08: سریع، کوچک، کنترل کامل | مستقیم با Bridgerator | **DEFAULT** |
| **Vite 8.3.8 archive** | ابزار dev/build https://github.com/vitejs/vite | A/D، P05–P09: dev server و build | CLI INDIRECT؛ بسته tgz قبلاً دانلود شده | **ARCHIVED, CORE IF NEEDED**؛ فایل tgz نصب پروژه نیست |
| **Astro** | SSG/SSR https://github.com/withastro/astro | B: صفحات زیاد، محتوا، SEO و islands | CLI INDIRECT | **CANDIDATE, SELECT FOR B** |
| **Starlight** | تم/فریم‌ورک مستندات https://github.com/withastro/starlight | B: سایت دانشنامه/مستندات، منوی آماده | CLI INDIRECT | **CONDITIONAL** |
| **React** | UI library https://github.com/facebook/react | SPA/admin اگر واقعاً state پیچیده شود | CLI INDIRECT | **ALTERNATIVE**؛ برای landing ضروری نیست |
| **SvelteKit** | Web framework https://github.com/sveltejs/kit | وب‌اپ چندمسیره interactive | CLI INDIRECT | **ALTERNATIVE** به Astro/React، نه هر دو |
| **Next.js** | full-stack React https://github.com/vercel/next.js | F: SSR/auth/API اگر ثابتاً لازم باشد | CLI INDIRECT | **DEFER**؛ RAM و پیچیدگی بیشتر |
| **Tailwind CSS** | utility CSS https://github.com/tailwindlabs/tailwindcss | P06: design tokens/component styling | CLI INDIRECT | **OPTIONAL**؛ CSS معمولی اول |
| **daisyUI** | کتابخانه component برای Tailwind https://github.com/saadeghi/daisyui | P06–P08: UI رایگان و سریع | CLI INDIRECT | **OPTIONAL**، جایگزین CSS custom |
| **shadcn/ui** | کامپوننت‌های کدبنیان https://github.com/shadcn-ui/ui | React admin/forms حرفه‌ای | CLI INDIRECT | **OPTIONAL FOR REACT** |
| **GrapesJS** | Visual HTML page builder https://github.com/GrapesJS/grapesjs | P06/P08: drag-and-drop و export layout | JS integration، نه MCP مستقیم | **OPTIONAL** با نیاز ویرایش بصری |
| **Puck** | React visual editor https://github.com/puckeditor/puck | P06/P08: صفحه‌ساز React با schema | JS integration، نه MCP مستقیم | **ALTERNATIVE TO GRAPESJS**؛ نیاز به React |

## C — وردپرس و فروشگاه
| Tool | نوع / GitHub | مرحله / تأثیر | MCP/وضعیت | تصمیم |
|---|---|---|---|---|
| **WordPress Playground + CLI** | WordPress WASM https://github.com/WordPress/wordpress-playground | C، P05–P09: محیط WordPress بدون Docker/MySQL جدا؛ blueprint قابل تکرار | CLI INDIRECT | **SELECT FOR WP PILOT**؛ سازگاری افزونه‌ها باید تست شود |
| **WordPress Studio** | free desktop local WP https://github.com/Automattic/studio | C: GUI ساخت چند سایت محلی، theme/plugin | CLI/UI؛ MCP خودکار نه | **ALTERNATIVE to Playground**، نصب فعلی تأیید نشده |
| **Gutenberg / block themes / theme.json** | https://github.com/WordPress/gutenberg | C، P06–P08: طراحی قالب مدیریت‌پذیر و بلوک | کد theme مستقیم؛ داخل WordPress | **CORE FOR C** |
| **WordPress Create Block** | https://github.com/WordPress/gutenberg/tree/trunk/packages/create-block | C، P08: scaffold بلوک سفارشی | CLI INDIRECT | **ONLY WHEN CUSTOM BLOCK NEEDED** |
| **WordPress Agent Skills** | skills https://github.com/WordPress/agent-skills | P04/P08: روش‌های معتبر توسعه قالب/بلوک/افزونه | skill مرجع، نه MCP server | **RESEARCH/OPTIONAL**؛ اجرای مستقیم مجوز نصب نیست |
| **WordPress MCP Adapter** | official MCP https://github.com/WordPress/mcp-adapter | C، P10: discover/get-info/execute WordPress Abilities، نقش اختیار محدود | **MCP OPTIONAL**, NOT CONNECTED | فقط بعد از WP، auth، ability opt-in و bridge معتبر |
| **WP-CLI** | ابزار WordPress https://github.com/wp-cli/wp-cli | C/E: نصب plugin، مدیریت محتوا و تست | CLI INDIRECT | دستور wp در PATH نیست؛ ممکن است داخل WP runner باشد |
| **wp-env** | Docker dev https://github.com/WordPress/gutenberg/tree/trunk/packages/env | C/E: محیط WordPress معادل‌تر برای توسعه plugin/theme | CLI INDIRECT | **DEFER**: نیاز Docker و منابع بیشتر |
| **WooCommerce** | فروشگاه WP https://github.com/woocommerce/woocommerce | E: product/cart/order/checkout واقعی یا sandbox | PHP/WordPress API، نه MCP chat پیش‌فرض | **ONLY AFTER WP + real e-commerce demand**؛ تست SQLite compatibility |
| **WordPress Playground VS Code** | https://github.com/WordPress/playground-tools | C: اجرای سریع theme/plugin در VS Code | VS Code extension/client | **ALTERNATIVE**، افزونه محلی فعلاً تأیید نشده |

## D — طراحی، محتوا و دارایی
| Tool | نوع / GitHub | مرحله / ارزش افزوده | MCP/وضعیت | تصمیم |
|---|---|---|---|---|
| **Penpot + official MCP** | design https://github.com/penpot/penpot/tree/develop/mcp | P06: طراحی زنده، tokens و inspect طراحی | **MCP OPTIONAL** با پلاگین/اجازه مشخص | **CONDITIONAL**؛ self-host روی 8GB به‌طور پیش‌فرض نه |
| **GIMP 3** | raster editor https://gitlab.gnome.org/GNOME/gimp | P02/P06: ویرایش تصاویر مجاز | GUI؛ file export با Bridgerator | **INSTALLED**؛ بازکردن فقط در صورت نیاز |
| **Inkscape** | SVG editor https://gitlab.com/inkscape/inkscape | P06: آیکون و logo SVG | GUI/CLI در صورت نصب | **CANDIDATE**؛ موجودی قطعی نصب تأیید نشده |
| **Sharp** | Node image transforms https://github.com/lovell/sharp | P06/P09: resize, WebP/AVIF و batch assets | CLI/Node INDIRECT | **OPTIONAL** برای asset pipeline |
| **SVGO** | optimize SVG https://github.com/svg/svgo | P06/P09: کاهش حجم آیکون | CLI INDIRECT | **OPTIONAL** |
| **Pagefind** | static client-side search https://github.com/Pagefind/pagefind | B، P08: جست‌وجوی داخلی بدون API خارجی | CLI build | **OPTIONAL** برای محتوای زیاد |
| **i18next** | internationalization https://github.com/i18next/i18next | P03/P08: locale و متن چندزبانه | library، no MCP | **OPTIONAL**؛ ترجمه‌ها باید واقعی/بازبینی‌شده باشند |

## E — داده، API و فروشگاه Headless (فقط اگر مرحله P04 الزام آورد)
| Tool | GitHub | کاربرد | MCP/وضعیت | تصمیم |
|---|---|---|---|---|
| **Zod** | https://github.com/colinhacks/zod | P03/P08: validation اسکیمای فرم/fixture | library INDIRECT | **OPTIONAL**، نه substitute برای server validation |
| **Hono** | https://github.com/honojs/hono | F: API کوچک Node/edge | library CLI INDIRECT | **SIMPLE SERVER OPTION**؛ فقط برای I/O واقعی |
| **PocketBase** | https://github.com/pocketbase/pocketbase | F: SQLite/auth/admin/files یک باینری | local API؛ MCP مستقیم نه | **OPTIONAL**؛ نیاز backup/auth review |
| **Payload** | https://github.com/payloadcms/payload | headless CMS/fullstack TypeScript | API/CLI، نه MCP خودکار | **DEFER**؛ سنگین‌تر و نیاز DB |
| **Medusa** | https://github.com/medusajs/medusa | تجارت واقعی headless و API | backend API، MCP خودکار نه | **DEFER**؛ نه برای فروشگاه نمایشی |
| **Directus** | https://github.com/directus/directus | CMS/admin DB-first | REST API، MCP جدا | **LICENSE/ELIGIBILITY GATE**؛ free grant محدود/شرایط ناشر، پیش‌فرض نه |

## F — QA، مرورگر، SEO، امنیت و مشاهده
| Tool | GitHub | مرحله / آزمون | MCP/وضعیت | انتخاب |
|---|---|---|---|---|
| **Node built-in test runner** | https://nodejs.org/api/test.html | P09: unit test بدون package برای سایت کوچک | CLI موجود | **FIRST CHOICE** اگر کافی |
| **Vitest** | https://github.com/vitest-dev/vitest | P09: unit/component tests برای Vite | CLI INDIRECT | **OPTIONAL** وقتی test suite رشد کرد |
| **Playwright** | https://github.com/microsoft/playwright | P09: E2E واقعی desktop/mobile/form | CLI/library; Browser runtime دارد | **PRIORITY**؛ نصب فعلی project-specific تأیید نشده |
| **Playwright MCP** | https://github.com/microsoft/playwright-mcp | P09/P10: snapshot و تعامل browser از agent | **MCP OPTIONAL**, NOT CONNECTED | فقط بعد از نیاز ثابت، isolated browser و permission |
| **Chrome DevTools MCP** | https://github.com/ChromeDevTools/chrome-devtools-mcp | P10: console/network/performance عمیق | **MCP OPTIONAL**, NOT CONNECTED | نگذارید آمار/CrUX URL حساس بی‌مجوز ارسال شود |
| **axe-core + Playwright adapter** | https://github.com/dequelabs/axe-core | P09: WCAG automated rule checks | library CLI | **RECOMMENDED**؛ معادل تست دستی نیست |
| **Pa11y** | https://github.com/pa11y/pa11y | P09: a11y CLI report | CLI INDIRECT | **ALTERNATIVE** به axe automation |
| **Lighthouse** | https://github.com/GoogleChrome/lighthouse | P09: perf, SEO, best practices | CLI/browser | **PERFORMANCE GATE**؛ تست device واقعی تکمیلی |
| **Biome** | https://github.com/biomejs/biome | P09: format/lint برای JS/CSS/HTML | CLI INDIRECT | **RECOMMENDED** اگر source بیش از نمونه کوچک شد |
| **ESLint** | https://github.com/eslint/eslint | P09: lint rule ecosystem | CLI INDIRECT | **ALTERNATIVE** به Biome، نه الزام دوگانه |
| **GitHub Actions** | https://github.com/features/actions | P11: lint/test روی PR پس از approval | CI remote quota/terms جدا | **OPTIONAL**؛ minutes و secrets قبل از فعال‌سازی |
| **GitHub Pages** | https://docs.github.com/pages | P12: انتشار سایت استاتیک با مجوز | hosting بیرونی | **NOT ACTIVATED**؛ شرایط هزینه/visibility پیش از deploy |
| **OWASP ZAP** | https://github.com/zaproxy/zaproxy | P09 advanced security test روی سایت مجاز | CLI/GUI، RAM سنگین | **DEFER**؛ only if actual attack surface |

## G — ایجنت‌ها و عامل‌های کدنویسی از این ممیزی خارج‌اند
مطابق دستور فعلی کاربر، **عامل‌های کدنویسی مستقل** مانند gptme، Goose، OpenCode، Pi Coding Agent و GitHub Copilot و برنامه‌های agent-first مثل Dyad را در **شمارش و انتخاب ابزارهای پروژه سبک وارد نمی‌کنیم**. وجود آن‌ها در Downloads/نصب ویندوز به معنای نقش در این پروژه نیست. سابقه قبلی در Git history محفوظ است؛ هیچ برنامه‌ای حذف یا غیرفعال نشده.

سرورهای MCP «Anode» و «Ghost» با خودِ coding agent یکی نیستند؛ آن‌ها ابزارهای کنترل دسکتاپ برای یک کلاینت MCP هستند و به‌صورت گزینه مشروط در بخش M ثبت شده‌اند.

## H — انتخاب فشرده بر اساس مرحله و نوع سایت
| مرحله | A ساده | B Astro | C WordPress | D demo shop | E واقعی | F app |
|---|---|---|---|---|---|---|
| P00–P04 تحلیل/انتخاب | ChatGPT+GitHub | همان | همان+WP official docs | همان | همان+legal/payment | همان+auth/security |
| P05 محیط | VS Code + Node (Vite if needed) | Astro | Playground **یا** Studio | A | WP + DB compatible | minimal backend after proof |
| P06 طراحی | CSS | CSS | Gutenberg/theme.json | CSS | Gutenberg | React/UI only if justified |
| P07 اولین خروجی | landing + CTA | 2 routes | page+theme | product→cart→demo receipt | sandbox product/order | one real I/O |
| P08 قابلیت‌های بیشتر | forms/sections | content/Pagefind | block/custom theme | filtering/state | WooCommerce after test | Hono/PocketBase |
| P09 QA | Node test+Playwright | +routes/SEO | +WP compatibility | +exact money/refund if needed | +security/order failure | +auth/data safety |
| P10 MCP تخصصی | browser only if needed | browser only | WP Adapter if needed | browser only | WP Adapter limited | API tool only if needed |
| P11/P12 | build and approval | static build | WP export/backup | demo build | deployment gate | operation gate |

## I — Selection/Failure/Cost/Security gates
1. **Need → simplest capability**: standalone code → deterministic command → MCP-only when interaction gains value → agent framework only when proven.
2. **No duplicated tools by default**: choose Astro OR SPA framework; GrapesJS OR Puck; Playground OR Studio; Biome OR ESLint; one browser automation route.
3. **Failure modes**: Vite archive ≠ installed; zip ≠ runtime; server ≠ client; WordPress Playground SQLite ≠ all Woo plugins compatible; visual editor artifact ≠ testable page; automated a11y ≠ actual keyboard test; passing local fixture ≠ real production payment.
4. **Free-first**: no paid AI API/host/plugin/theme/domain. Check official license, commercial use, provider geo/terms, quotas, telemetry, card requirement **before** activation. Unknown cost = UNKNOWN / do not enable.
5. **Permissions**: least privilege local folder; WordPress abilities opt-in; no remote MCP to public site by default; no private browser profile attached to tests; no tokens in logs/repo.
6. **PC memory — owner correction 2026-11-22:** 8 GiB physically installed (2×4 GiB), about 6020 MiB Windows-visible. **~2048 MiB available RAM is the pre-session preparation target**, not the workload ceiling or a permanent post-launch minimum. Use professional tools concurrently when outcome warrants and measured memory/commit/response remain stable. The old 100 MiB emergency observation is NOT the normal operating target. Docker is excluded from the static M01 runtime for architectural reasons, not solely RAM.
7. **Reversibility**: pinned dependencies + lockfile + git diff/commit + app data backup for WordPress; no installing to globally mutating environment without approval.
8. **Licensing**: GitHub source location itself is **not** license proof; consult exact LICENSE at selected commit. Third-party visual/media rights require explicit authorization.

## J — local evidence and public canonical sources
**Local read-only facts verified via Bridgerator on 2026-11-21:**
- machine online Bridgerator 1.1.19; read/write tools advertised, file-read previously tested; actual build of this new project **NOT TESTED**.
- OS commands Node 24.22.1, npm 11.19.1, Git and VS Code available; Python 3.14.7 previously verified; global npm lists Codex only.
- php and wp command **not** on PATH (does not prove all PHP binaries absent).
- prior Downloads/DJMRN-Website-Tools/00_READ_ME_CORE_TOOLS.txt states Vite 8.3.8 and Three.js 0.187.0 archives verified on disk, not installed.
- winget reported VS Code, Docker Desktop, Dyad, GitHub Copilot, gptme; archives Goose, OpenCode, Pi etc in Downloads in earlier live inspection.

**Authoritative projects verified through GitHub research:**
https://github.com/vitejs/vite · https://github.com/withastro/astro · https://github.com/WordPress/wordpress-playground · https://github.com/Automattic/studio · https://github.com/WordPress/mcp-adapter · https://github.com/WordPress/agent-skills · https://github.com/woocommerce/woocommerce · https://github.com/WordPress/gutenberg · https://github.com/microsoft/playwright-mcp · https://github.com/ChromeDevTools/chrome-devtools-mcp · https://github.com/penpot/penpot/tree/develop/mcp · https://github.com/biomejs/biome · https://github.com/vitest-dev/vitest · https://github.com/dequelabs/axe-core · https://github.com/Pagefind/pagefind · https://github.com/GrapesJS/grapesjs · https://github.com/puckeditor/puck · https://github.com/pocketbase/pocketbase · https://github.com/medusajs/medusa · https://github.com/directus/directus

**Last verification:** research/official code descriptions as of 2026-11-21; exact package versions, dependency licenses, paid tiers, deployment/hosting, remote MCP endpoint eligibility remain **UNVERIFIED until selection**. The tools in this document are not currently all loaded into ChatGPT, and listing them does not grant access.

## K — NEW verified architecture-specific options, 2026-11-21 (research only)
| Tool / reference | Specific capability & model | Connection reality / decision |
|---|---|---|
| **Grav 2 + first-party grav-mcp** — https://github.com/getgrav/grav ; https://github.com/getgrav/grav-mcp ; https://learn.getgrav.org/2/advanced/mcp-server | Model **M15**: flat-file PHP CMS with admin/API and standalone Node MCP server speaking to first-party Grav API plugin (auth/API key); content administration with permissions | **CANDIDATE, NOT INSTALLED/CONNECTED**. Needs PHP, Grav 2, API Plugin and client bridge. Not a free direct tool just because code exists. |
| **WordPress Studio app/CLI + agent MCP route** — https://github.com/Automattic/studio | Models **M09–M12/M18**: local WordPress sites with bundled PHP/SQLite, WP-CLI, backups; official repo now mentions AI agents connected via MCP | **CANDIDATE, NOT INSTALLED/CONNECTED**. Evaluate against Playground, use ONE host. AI cloud credits/account, preview/cloud features require their own cost/eligibility check; local editor is free per vendor. |
| **WordPress MCP Adapter** — https://github.com/WordPress/mcp-adapter/blob/trunk/docs/getting-started/site-owners.md | Current site-owner docs require WordPress **6.9+**, exposed/public Abilities, authenticated user permissions; exposes list/info/execute abilities, not blanket WordPress root | **MCP OPTIONAL, NOT CONNECTED**. Never ask user for application passwords in chat; use approved credential UI and least privilege if ever connected. |

**Architecture models:** [04-WEBSITE-BUILD-MODELS.md](../04-WEBSITE-BUILD-MODELS.md). These are incremental research findings; they do not change default tool selection (Bridgerator + Node) or authorize installs.


## L — ابزارهای دیگرِ مفید از پژوهش و دانلود قبلی 09 (انتقال نام و نقش؛ بدون جابه‌جایی باینری)
این جدول **ابزارهایی را که در قسمت‌های A/B/D/E/F کاتالوگ قدیمی وجود داشتند و در بخش‌های A–G این رجیستری به‌عنوان ردیف مستقل نبودند** یک‌جا برای همین پروژه فهرست می‌کند. نصب/اتصال این موارد در پروژه جدید ثابت نشده؛ بسیاری **ALTERNATIVE/ON-DEMAND** هستند. برای تطبیق یک‌به‌یک و موارد حذف‌شده مربوط به 3D به [LEGACY-CROSSWALK.md](LEGACY-CROSSWALK.md) مراجعه کنید.

| ابزار | منبع/نوع | مصرف در پروژه سبک و ارزش واقعی | مسیر/اولویت | وضعیت |
|---|---|---|---|---|
| **Windows-MCP / Windows Commander / OpenDesk** | historical desktop-control alternatives; [MCP servers](https://github.com/modelcontextprotocol/servers) | P05/P10، کنترل پنجره/اپ در صورت شکاف واقعی Bridgerator | **ALTERNATIVE / NOT DEFAULT**؛ Desktop Commander and Bridgerator already overlap | status تاریخی و اتصال موثر به این گفتگو UNVERIFIED |
| **REA / Reverse Engineer Anything** | [rea](https://github.com/morluto/rea), analyzer/MCP candidate | P02/P10، تحلیل ساختار JS صرفاً برای سایت خودمان یا با مجوز؛ جایگزین audit استاندارد نیست | research-only, heavy overlap | ZIP/TGZ در آرشیو قبلی؛ MCP به این چت متصل نیست |
| **SiteOne Crawler GUI/CLI** | [GUI](https://github.com/janreges/siteone-crawler-gui) / [CLI](https://github.com/janreges/siteone-crawler) | P09، audit پیوندها، ساختار صفحات و منابع سایت محلی/مجاز | conditional QA | موجودی دانلود قدیمی؛ نصب/اجرا برای این پروژه UNVERIFIED |
| **decant** | [repo](https://github.com/codingstark-dev/decant), CLI | P02، گرفتن نمای ساختاری و viewport مرجع مجاز | optional research | وضعیت نصب UNVERIFIED |
| **WebScoop** | [repo](https://github.com/MIDILLI-Tech/WebScoop), desktop | P02، ذخیره offline ساختار/منابع مرجع مجاز | optional research | قبلاً winget installed report؛ اتصال MCP ندارد |
| **SingleFile MV3 + CLI** | [repo](https://github.com/gildas-lormeau/SingleFile-MV3) | P02/P09، snapshot یک صفحه طراحی برای بررسی و rollback | optional read-only QA | در پروژه قدیمی تست شده، در این پروژه NOT TESTED |
| **HTTrack / WinHTTrack** | [repo](https://github.com/xroche/httrack), CLI/GUI | P02، کپی مجاز صفحات استاتیک برای audit؛ نه بازسازی JS مدرن | fallback | در پروژه قدیمی مورد استفاده؛ در این پروژه NOT TESTED |
| **WebScrapBook** | [repo](https://github.com/danny0838/webscrapbook), browser extension | P02، archive پژوهش/شواهد مجاز | optional research | قدیمی فعال؛ در پروژه جدید UNVERIFIED |
| **webcrack** | [repo](https://github.com/j4k0xb/webcrack), JS analyzer | P10، تحلیل bundleهای خودمان هنگام اختلال سورس‌مپ | optional diagnostic | CLI/source قدیمی؛ بدون نیاز MVP |
| **jsdj** | [repo](https://github.com/ejfkdev/jsdj), source analysis | P10، تحلیل JS/source maps خودمان | optional | source candidate |
| **Source Map Explorer** | [repo](https://github.com/danvk/source-map-explorer), CLI | P09، اندازه‌گیری سهم بسته‌ها در build و بهینه‌سازی | conditional performance | نصب این پروژه UNVERIFIED |
| **HAR Viewer** | [repo](https://github.com/janodvarko/harviewer), browser tool | P09/P10، بررسی HAR پاکسازی‌شده از کوکی/توکن | optional | source only/UNVERIFIED |
| **Wappalyzer** | [repo](https://github.com/HTTPArchive/wappalyzer), technology heuristics | P02، شناسایی تقریبی استک سایت‌های عمومی | research optional | نتیجه اکتشافی، نه evidence قطعی |
| **PinchTab WebGraph** | [repo](https://github.com/egouilliard/pinchtab-webgraph) | P09/P10، کشف حالات DOM/ARIA در تست پیچیده | deferred; Playwright first | در X12 قدیمی نامزد بود؛ اینجا NOT INSTALLED |
| **Browsertrix Crawler** | [repo](https://github.com/webrecorder/browsertrix-crawler), Docker archive | در تست خاص snapshot/WARC سایت خودمان؛ معمولاً برای ساخت لازم نیست | **HOLD: RAM heavy** | اجرای قدیمی به معنای نیاز این پروژه نیست |
| **ArchiveBox / ArchiveBox JS / abx-dl** | [ArchiveBox](https://github.com/ArchiveBox/ArchiveBox) / [JS](https://github.com/ArchiveBox/archivebox-js) | فقط برای نیاز خاص archival قانونی؛ نه کدنویسی سایت | **EXCLUDED AS DEFAULT** | در پروژه قبلی شکست native Windows/RAM گزارش شده؛ no auto retry |
| **FFmpeg** | [official](https://ffmpeg.org/) media CLI | P06، فشرده‌سازی/تبدیل ویدئوی مالک و تولید poster | optional when video | آرشیو قبلی؛ نصب موثر UNVERIFIED |
| **OpenCV** | [repo](https://github.com/opencv/opencv), library | P06، crop/analysis تصاویر و ویدئوهای مالک؛ برای سایت عادی ضرورت ندارد | deferred | package installation unknown |
| **ScreenToGif** | [repo](https://github.com/NickeManarin/ScreenToGif), GUI | P09/P11، ضبط تعامل واقعی UI نمونه‌کار برای ارائه | optional evidence | قبلاً تست شده؛ اجرای این پروژه UNVERIFIED |
| **ShareX** | [repo](https://github.com/ShareX/ShareX), screenshot | P09/P11، تصویر مرحله تست و نمونه‌کار | alternative to ScreenToGif | نسخه نصب/آمادگی این پروژه UNVERIFIED |
| **LosslessCut** | [repo](https://github.com/mifi/lossless-cut), video editor | P06/P11، کوتاه کردن فیلم نمونه‌کار | optional | نصب این پروژه UNVERIFIED |
| **Perfetto** | [repo](https://github.com/google/perfetto), traces | P09/P10، تحلیل trace مرورگر اگر Lighthouse کافی نبود | deferred | web viewer; no MCP direct |
| **Onlook** | [repo](https://github.com/onlook-dev/onlook), visual editing | P06، ویرایش بصری UI React/Next در صورت نیاز | alternative visual workflow | پوشه قدیمی دیده شده؛ نصب/آمادگی این پروژه تأیید نشده |
| **Webstudio** | [repo](https://github.com/webstudio-is/webstudio), open website builder | P06–P08، page builder متن‌باز و قابلیت export/hosting؛ بررسی license و self-host | alternative to custom UI | در پروژه جدید نصب نشده؛ cloud terms verify |
| **Tweakpane** | [repo](https://github.com/cocopon/tweakpane), JS dev UI | P07/P09، پنل تنظیم زنده پارامترهای UI در prototype | optional developer-only; remove from production | library candidate |
| **Krita** | [repo](https://invent.kde.org/graphics/krita), desktop raster | P06، طراحی و اصلاح گرافیک و asset | alternative to installed GIMP | قدیمی downloaded/installed state reverify |
| **ImageMagick** | [repo](https://github.com/ImageMagick/ImageMagick), CLI | P06/P09، تبدیل/resize دسته‌ای assetهای مجاز | alternative to Sharp, not both by default | CLI presence not retested |
| **Free Texture Packer / FastPack** | [FT](https://github.com/odrick/free-tex-packer-core) / image atlas tools | P06، ترکیب آیکون یا spriteهای دوبعدی در صورت نیاز واقعی | conditional specialized | در آرشیو قبلی، بدون ضرورت برای UI ساده |
| **MCP Inspector** | [official](https://github.com/modelcontextprotocol/inspector) | P10، tools/list و تست اتصال MCP جدید در محیط کنترل‌شده | conditional security/debug | **NOT CONNECTED**, Node package/tools not activated |

**سایر موارد old catalog شامل 3D/GPU/GLB/Shader/particle هستند و برای این پروژه سبک آورده نشده‌اند.** فقط شواهد نام و دسته در crosswalk برای تشخیص scope حفظ شده‌اند؛ نه نصب، نه اجرا، نه دانلود یا کپی باینری صورت گرفته است.


## M — ممیزی صریح ابزارهای غیرایجنتی معرفی‌شده در چت‌ها (2026-11-21)
**Purpose:** verify that the user-mentioned website-building tools, laptop fundamentals and downloaded non-agent MCPB bundles are actually in this ONE canonical registry. This is **not** a request to start any program or install packages. Agent host apps are excluded, not silently counted as website tools.

| Mentioned tool or group | Where in THIS registry | Why useful | Actual status |
|---|---|---|---|
| Bridgerator, GitHub connector, Git, VS Code, Node/npm, Python | A | P05–P12: direct code/terminal/git/build/test | Bridgerator and GitHub connected; OS tools installed, independent capability |
| **uv** | **A — newly corrected** | Python env/package management if relevant (not for vanilla first pilot) | winget 0.13.5 verified; not MCP itself |
| Vite, Astro, HTML/CSS/JS, React, Tailwind, GrapesJS, Puck | B | construct static/SPA/content sites and optionally edit visually | Vite archive only; most libs candidates, no MCP by default |
| WordPress Playground, Studio, Gutenberg, WooCommerce, WP MCP Adapter, WP Agent Skills | C, K | CMS, block themes, commerce and optional permitted WordPress abilities | no direct WordPress MCP connected, no WP site created |
| Grav 2 + official grav-mcp | K | lightweight file-backed CMS, optional structured editing through MCP | not installed/connected |
| Playwright MCP, Chrome DevTools MCP, MCP Inspector | F, L | browser QA, console/network/performance and MCP handshake tests | optional; not connected as separate tools |
| SiteOne, WebScoop, decant, SingleFile, HTTrack, Wappalyzer, Source Map Explorer, Onlook, Webstudio | L | permitted research/asset capture, structural audits, visual editing | mostly deferred/archived/untested in this project |
| GIMP, Inkscape, Sharp, SVGO, Pagefind, FFmpeg, ShareX | D, L | licensed design assets, image/media optimization, content search and demos | choose on demand; install/active status varies |
| **Anode MCPB** | **M — newly added** | separate *background Windows desktop* seat for UI testing native apps and browser, not a coding agent | [upstream official](https://github.com/skulitom/Anode), [docs](https://github.com/skulitom/Anode#readme); `anode-windows-x64.mcpb` found in Downloads historical inspection, **NOT INSTALLED/CONNECTED**; Windows Pro requirement and separate session; no isolated secrets sandbox |
| **Ghost MCPB** | **M — newly added** | native desktop/GUI control, browser app tests without relying on foreground focus, not a coding agent | [upstream official](https://github.com/NORTHTEKDevs/ghost); `ghost-windows-x64.mcpb` found in Downloads historical inspection, **NOT INSTALLED/CONNECTED** |
 
**Decision on Anode/Ghost:** Both overlap with Bridgerator as desktop-control executors, but might add native GUI background control for Playwright-unfriendly programs. **Role = ALTERNATIVE, NOT DEFAULT; NEED NOT PROVEN for our first M02 storefront.** Their MIT source code exists in official GitHub repositories; check exact bundle hash, license at selected version, host MCPB compatibility, session/permission/security, memory and whether the ChatGPT-side connection actually works before any activation. Neither grants this chat an MCP tool merely by having a downloaded `.mcpb`.

**Coverage and counts:** Former A–F entries were audited separately in [LEGACY-CROSSWALK.md](LEGACY-CROSSWALK.md) (86 historical grouped rows = 14 already represented + 32 assessed for relevant optional reuse + 40 out of scope). Rows in this registry include groups and variants; they are **not a unique software count**. The previously drafted section G covering coding agents was explicitly excluded in this 2026-11-21 non-agent-only reconciliation.

**Active base remains unchanged:** GPT-6 + Bridgerator + Git + Node.js + browser QA; Vite only when chosen project needs build. No install, code execution, MCPB activation, payment or merge in this audit.

## N — M01 verified local tool reconciliation (2026-11-22, read-only inventory)

**Provenance and authority:** Read-only inspection of DJMRN-LAPTOP with Bridgerator: git status, Windows executable discovery, installed-app registry, global npm list and Node package resolution from the existing M01-Prep/qa directory. This dated verification supersedes older unverified installation labels above; it does not retroactively mark unexecuted tests PASS. This remains the project-wide canonical inventory; stage-specific usage belongs to the [M01 selected tool profile](../models/M01-vanilla-multilingual/02-STACK-TOOLS-AND-MCP.md).

| Tool | Verified status in this inventory | Placement and decision for M01 |
|---|---|---|
| Bridgerator, GitHub connector | Available and used through this chat; laptop online; GitHub commits verified in S01–S10 | **Executor + GitHub code authority**. No new MCP needed |
| Node.js 24.22.1 / Git 2.55.0.5 | Installed and used for source build, tests and commits | **SELECTED**. Native HTML/CSS/JS + deterministic build |
| Chrome 157 / Edge 158 | Installed; Edge used in prior Playwright S08–S10 QA | **SELECTED Observer**. Chrome DevTools for manual audit |
| Playwright 1.65.1 (also playwright-core and @playwright/test) | Resolves from existing M01-Prep/qa; used S08–S10 | **PRIORITY S11–S20**, start with tested profile and scale browser workers after measured stability; Edge channel=msedge |
| axe-core 4.14.1 | Resolves from M01-Prep/qa; not yet run as S16 scan | **PRIORITY S16/S18**; human a11y testing still mandatory |
| html-validate 11.21.1 | Resolves from M01-Prep/qa; not globally on PATH | **PRIORITY S11+** for offline HTML checks; first establish baseline |
| Prettier 3.10.1 | Resolves from M01-Prep/qa; not globally on PATH | **OPTIONAL CHECK** only; never bulk reformat prior source without diff |
| Lighthouse | Not on CLI PATH and not in tested QA modules; included as Chrome DevTools capability per official documentation | **S17 via Chrome**, measure actual score before claim |
| VS Code 1.142.0 | Installed (user installation) | **OPTIONAL EDITOR**; no runtime or MCP requirement |
| Python 3.14.7 | Installed; bare python is a WindowsApps alias; real interpreter/py launcher exists | **ALTERNATIVE HELPER**; Node default |
| GIMP 3.2.8 | Executable verified and version command passed on 2026-11-22; M01 project artwork not yet produced with it | **PROFESSIONAL ARTWORK CANDIDATE** for S06/S10 revisits and S11/S17; use as needed with asset provenance and measured resource impact |
| Blender 5.3.0 | Executable verified, version command passed 2026-11-22; complex scene/render/GPU test still unverified | **PROFESSIONAL ASSET PILOT CANDIDATE** for original pre-rendered hero/case stills/video in S06/S10 revisits and S11/S17, with performance tests; static site runtime remains vanilla |
| GitHub Copilot 1.1.30, Codex 0.166.0 | Copilot in installed list; Codex in global npm list; actual license/quota unknown | **NOT NEEDED** as default for M01, no automatic model spending |
| Inkscape, Sharp, SVGO, ESLint, Lighthouse CLI | Not found in inspected PATH/QA module scope; installed elsewhere unverified | **CANDIDATES** only on demonstrated gap, no install now |
| Docker Desktop 4.99.0 and WSL | Installed/available commands but not launched in this audit | **EXCLUDED** for memory-light M01 |
| Penpot MCP, Figma, Canva, Adobe Express, tldraw | Tools advertised in this ChatGPT tool catalog; project authorization, provider quota and working M01 design file NOT TESTED here. Does not prove local Windows installation | **DESIGN PROJECTION/ALTERNATIVE** only when editable wireframe need is proven |
| Playwright MCP / Chrome DevTools MCP | No separate direct tool connection verified; existing local Playwright already works via laptop | **NOT SELECTED**, avoids duplicate tool |

**Free-first and memory:** No installation, download, browser package setup, account login, provider activation, OAuth, payment, API usage or public deployment occurred during this audit. Local OSS can be free without cloud permissions or usage being free; optional provider cost/quota is UNKNOWN/DENY until a concrete action is approved. Prior read-only audit observed 535 MiB available. New owner-corrected read-only audit on 2026-11-22 observed **1664 MiB available**; the **pre-session goal is 2048 MiB**, a 384 MiB gap at that instant. **Do not discard professional tools based on the old transient number**; prepare the session, then benchmark actual combinations and adapt configuration in small steps; see §O.

**Official evidence:** [Playwright installed Edge channel](https://playwright.dev/docs/browsers), [HTML-Validate offline](https://html-validate.org/), [Prettier check](https://prettier.io/docs/cli), [axe-core free OSS](https://www.deque.com/axe/axe-core/), [Chrome DevTools Lighthouse](https://developer.chrome.com/docs/lighthouse/overview), [W3C limits of automated a11y](https://www.w3.org/WAI/test-evaluate/tools/selecting/), [GIMP](https://www.gimp.org/), [Blender](https://www.blender.org/), [GitHub supply-chain guidance](https://docs.github.com/en/code-security/concepts/supply-chain-security/supply-chain-security), [Penpot official pricing](https://penpot.app/pricing).

**Status:** VERIFIED INVENTORY + SELECTED ROLES only. The project's active code authority and earlier S01–S10 PASS evidence remain unchanged.

## O — M01 professional tooling and RAM policy correction (owner decision, 2026-11-22)

**Supersedes previous blanket restrictions** in this catalog that treated one browser worker or avoidance of Blender/GIMP as permanent policy. Professional tool use is decided by deliverable quality and measured fit, not current free RAM alone. This update does NOT change past S01–S10 PASS evidence or mean these tools were previously used.

### Verified local facts and resource budget

| Evidence | Observation | Meaning |
|---|---|---|
| Windows physical-memory modules | Two 4 GiB modules: **8 GiB physically installed** | Hardware is not a 6 GB configuration |
| Windows OS-visible RAM | About **6020 MiB** | Usable is lower; exact reserved-memory cause not fully verified |
| Available RAM snapshot | **1664 MiB**; repeat after version checks **1613 MiB** | Variable instantaneous readings, not fixed tool limits |
| User-directed preparation goal | **~2048 MiB free before demanding work** | A target to prepare the workspace, NOT a constant floor after apps launch |
| Shortfall at initial snapshot | **384 MiB** | Investigate reversible ways to recover, do not terminate user apps without approval |
| Disk/pagefile | C: free **84.9 GiB**, pagefile allocated **8644 MiB** | Storage-backed commit headroom; NOT extra physical RAM or equal speed |
| GPU | AMD Radeon Vega 8 | Check render backend and graphics memory during a real pilot |
| Professional apps | GIMP **3.2.8**, Blender **5.3.0** both installed and version commands returned | Programs usable for small trials; demanding scenes/render results NOT benchmarked |

### Operational workflow

1. **Pick tools based on the desired visual or functional improvement.** The pure HTML/CSS/JS site output can still be authored with GIMP, Blender, Penpot/Figma (if authorized), VS Code, Playwright and Chrome. Static runtime simplicity does not mean a restricted offline creation workflow.
2. Before an intensive session aim for **~2 GiB RAM available** by first inspecting processes, closing only demonstrably idle and owner-approved user programs or our disposable test instances, while preserving VPN, bridge, active project server and unsaved work. No blind process killing, disablement of antivirus/memory compression, forced memory cleaner or permanent pagefile/security changes.
3. **Allow measured concurrent use** when useful: e.g. design board + GIMP + Chrome preview, Blender + export preview, or Edge/Playwright + Chrome DevTools. Collect actual available RAM, commit/pagefile use, CPU/GPU load, latency and errors while exercising the real workload. If thrashing emerges, adjust in small reversible increments; phase render/export/test only if verified necessary, without discarding advanced artwork.
4. Tune worker count, number of tabs, texture resolution, image tile cache, Blender samples/scene size, parallel tasks and asset preview sizes **adaptively**, but do not reduce final deliverable fidelity or skip acceptance coverage. Start small and scale after evidence; **one worker is an initial safe profile, not a permanent maximum**.
5. Treat failure/low free memory as diagnostic context, not an automatic rejection. If Windows becomes unresponsive, crashes, or severe sustained paging/commit pressure occurs, preserve current files and pause further heavy launches; revert workload settings. Historical 100 MiB is an emergency danger indicator, not an operating strategy.
6. Retain **free-first / provider approval / one authority**. Locally installed free tools do not authorize cloud credits, OAuth scopes or hosting. Verify optional plugin plan/quota/cost and rights before activation; GitHub retains source authority.

### Professional chains now eligible for evaluation

| Output | Complementary tools and acceptance |
|---|---|
| Premium five-language design | Existing CSS/SVG + authorized Penpot/Figma for editable artboards if useful → actual semantic HTML/Node renderer and review. No requirement to keep the design app running in production |
| Rich original hero and three concept cases | GIMP for raster composites/textures, Blender for carefully bounded original 3D models/pre-rendered images/short clips, Chrome/Edge preview; verify originality/licenses, dimensions, file size, LCP and reduced-motion |
| Accessibility + fast UI | axe-core + Playwright/Edge + DevTools/Lighthouse; these are test tools, not web runtime dependencies |
| Real S14A editing interface | Penpot/Figma optional UX exploration + native Node/JSON/Git and browser tests; keep authoring server loopback/private |

**Official sources:** [Blender requirements](https://www.blender.org/download/requirements/) (8GB minimum, 32GB recommended); [GIMP memory and swap](https://docs.gimp.org/3.2/en/gimp-prefs-system-resources.html); [Microsoft available/committed memory](https://learn.microsoft.com/en-us/windows/win32/memory/memory-performance-information); [Windows pagefile](https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/how-to-determine-the-appropriate-page-file-size-for-64-bit-versions-of-windows); [Playwright workers](https://playwright.dev/docs/test-parallel).

**Scope/status:** Read-only resource/profile measurements, GIMP and Blender CLI version checks, architectural/tool-policy update only. Neither application was used for project artwork; no benchmark of a heavy scene, new installation, process termination, account/permission change or paid usage occurred.
