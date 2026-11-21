# DJMRN — جامع ابزارهای ساخت سایت سبک با GPT-6 و MCP
**Project ID:** DJMRN-CHATGPT-LIGHT-SITES-001 | **Research snapshot:** 2026-11-21  
**Stage map:** [01-PROFESSIONAL-STAGES.md](01-PROFESSIONAL-STAGES.md)  
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

## G — عامل‌های دانلودشده/نصب‌شده: گزینه جایگزین، نه نیاز پیش‌فرض
| Tool | مرجع | وضعیت دیده‌شده 2026-11-21 | دلیل عدم استفاده پیش‌فرض |
|---|---|---|---|
| **gptme 0.36.0** | https://github.com/gptme/gptme | winget installed؛ binary gptme و MCP server روی PATH دیده نشدند | نیاز به بررسی standalone MCP و هزینه provider؛ Bridgerator کافی است |
| **Goose 1.58.1 installer** | https://github.com/block/goose | Downloads، command روی PATH نبود | agent میزبان مستقل؛ هزینه مدل/رم و duplicate capability |
| **OpenCode Desktop installer** | https://github.com/anomalyco/opencode | Downloads، command روی PATH نبود | agent و API server جدا؛ no need for current chat |
| **Pi Coding Agent ZIP** | https://github.com/badlogic/pi-mono | Downloads، نصب/اتصال تأیید نشده | agent replacement؛ نه ضرورت |
| **Dyad 1.23.0** | https://github.com/dyad-sh/dyad | installed در winget | GUI builder، MCP client؛ inverse connection to chat verified نیست |
| **GitHub Copilot app** | https://github.com/features/copilot | installed | provider/entitlement هزینه و overlap؛ نه code bridge این گفتگو |
| **Spector.js / Three.js / REA / RenderDoc** | آرشیو تاریخی DJMRN-Website-Tools | بسته‌های محلی در سیستم وجود دارند | برای پروژه سه‌بعدی قدیمی‌اند؛ **OUT OF SCOPE** و تحت این پروژه اجرا نمی‌شوند |

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
6. **PC memory**: 8GB; one browser worker, one dev host, no Docker for base. Monitor RAM; Windows free memory hard emergency stop historically 100MiB.
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

**Architecture models:** [04-WEBSITE-BUILD-MODELS.md](04-WEBSITE-BUILD-MODELS.md). These are incremental research findings; they do not change default tool selection (Bridgerator + Node) or authorize installs.
