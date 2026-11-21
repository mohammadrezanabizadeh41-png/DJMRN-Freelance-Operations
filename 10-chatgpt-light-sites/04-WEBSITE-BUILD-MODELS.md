# DJMRN — مدل‌های فنی ساخت سایت | Architecture / Stack Selection Matrix
**Project:** DJMRN-CHATGPT-LIGHT-SITES-001  
**Research reviewed:** 2026-11-21 | **Status:** RESEARCHED/CLASSIFIED, PILOT STACK SELECTED FOR PLANNING; NO INSTALL/BUILD/DEPLOY  
**Authority:** this taxonomy extends existing [01 Professional Stages](01-PROFESSIONAL-STAGES.md), and uses the tool identity/status definitions of [Canonical Tools Registry](tools/REGISTRY.md). It does **not** supersede that roadmap, and does not touch 09-self-marketing-website or Codex.

## 0. Precise terminology and counting method
**What is a build model?** A repeatable composition of frontend rendering + content/data source + backend (if any) + build/hosting/runtime + editor/operator + testing route. It is **not** the business type (store/portfolio/blog), and not a product name. The same shop demo could be built using A02, C10 or E18.

**Counts in THIS reviewed shortlist, not a market census:**
- **6 engineering families**
- **22 concrete build recipes (M01–M22)**, several sharing components or alternative implementations; these are not 22 mutually exclusive global standards.
- Family A 5 models, B 3, C 7, D 2, E 3, F 2. Total 5+3+7+2+3+2 = 22.
- SaaS-only hosted builders (Shopify/Wix/Webflow), PWA packaging, drag-and-drop editing, MCP bridges, and deployment choices are **orthogonal choices**, not additional core architectures counted in 22.
- Scope EXCLUDES high-cost 3D/game-engine/webgl scenes. Official code or downloads are *evidence of availability*, NOT proof of installed runtime, local compatibility, or active MCP connection.

## 1. Model/stack overview: 22 reviewed technical recipes
Each row is a concrete starting composition. Score **Effort 1–5** is OUR comparative engineering estimate for a minimal working prototype (1 simplest, 5 most dependencies); it is not vendor performance/industry benchmark. **MCP path**: default is ChatGPT -> existing Bridgerator -> local files/CLI; 'WP/Grav MCP' is a separate **unconnected optional** server.

### Family A — static and client-side, 5 recipes
| ID | Build model, key stack | Rendering / state | Suitable for | Effort | MCP / dependencies / official code |
|---|---|---|---|---:|---|
| **M01** | Handwritten HTML + CSS + vanilla JS | Static HTML; small local interaction; JSON if needed | one-page services, landing, small portfolio | 1 | Bridgerator direct; no build dependencies; MDN web standards |
| **M02** | Vanilla JS + **Vite** + CSS + static JSON | Static bundle; local cart/demo state | **first demo store/website**; featureful landing | 1–2 | Bridgerator + Node/npm; [Vite](https://github.com/vitejs/vite); Vite archive locally downloaded, not yet installed in pilot |
| **M03** | SSG via **Eleventy OR Hugo** + Markdown/templates | Prebuilt HTML; no app server at runtime | blog/docs/many repetitive content pages | 2 | CLI via Bridgerator; [Eleventy](https://github.com/11ty/buildawesome), [Hugo](https://github.com/gohugoio/hugo); choose ONE |
| **M04** | **Astro** + content files + isolated interactive islands | SSG default; optional server routes | multi-page SEO, brochure, selective interactivity | 2 | CLI via Bridgerator; [Astro](https://github.com/withastro/astro); adapter only for on-demand runtime |
| **M05** | React OR Vue OR Svelte **SPA** + Vite | CSR/SPA; browser state; backend only if needed | dashboards/widgets and application-like UI | 2–3 | CLI; [React](https://github.com/facebook/react), [Vue](https://github.com/vuejs/core), [Svelte](https://github.com/sveltejs/svelte); not necessary for basic landing |

### Family B — server-rendered and full-stack code, 3 recipes
| ID | Build model, key stack | Rendering / state | Suitable for | Effort | MCP / dependencies |
|---|---|---|---|---:|---|
| **M06** | Next.js OR Nuxt OR SvelteKit full-stack | SSR, SSG, CSR or mixed depending on framework/config; API routes | many routes, logged-in dashboard, server needs | 4 | Node runtime and CLI; [Next](https://github.com/vercel/next.js), [Nuxt](https://github.com/nuxt/nuxt), [SvelteKit](https://github.com/sveltejs/kit); do not install all |
| **M07** | Django + templates (+ SQLite for pilot) | Server-rendered MPA, Python models/forms | data-backed Python business site, admin | 3–4 | Python via Bridgerator; [Django](https://github.com/django/django); no extra MCP required |
| **M08** | Laravel + Blade templates (+ supported DB) | Server-rendered MPA, PHP | PHP business application with actual server state | 4 | PHP/Composer needed; [Laravel](https://github.com/laravel/framework); local PHP executable not found on PATH |

### Family C — integrated/traditional CMS, 7 recipes
| ID | Build model, key stack | Rendering / state | Suitable for | Effort | MCP / environment |
|---|---|---|---|---:|---|
| **M09** | **WordPress Classic** theme + PHP/templates + WP DB | Traditional PHP server rendering, admin-editable CMS | inherited themes/custom WP sites | 3 | [WordPress](https://github.com/WordPress/wordpress-develop); Playground or Studio local; PHP in runtime |
| **M10** | **WordPress Block Theme** + Gutenberg + theme.json | integrated CMS + editable templates/blocks | **first WordPress sample**; service/blog sites | 3 | [Gutenberg](https://github.com/WordPress/gutenberg); Playground or Studio; WP MCP Adapter optional |
| **M11** | **WordPress Hybrid Theme** (classic PHP + block capabilities) | mix of classic templates and modern editor features | migration of classic theme without rewrite | 3–4 | [WordPress Theme Handbook](https://developer.wordpress.org/themes/); optional WP MCP |
| **M12** | WordPress + third-party visual page builder/theme | CMS plus editor plugin and vendor layout format | clients needing drag-and-drop page design | 3–4 | verify exact plugin/version/free-tier/lock-in; [Gutenberg](https://github.com/WordPress/gutenberg) free native first, commercial plugin NOT approved |
| **M13** | Traditional non-WP CMS (**Drupal OR Joomla**) | CMS database + themes/extensions | structured enterprise/institutional content | 4 | [Drupal](https://www.drupal.org/), [Joomla](https://github.com/joomla/joomla-cms); PHP/DB/runtime; no active ChatGPT MCP |
| **M14** | **Ghost** publishing CMS + theme | publishing/newsletter/member-focused CMS | independent editorial publication | 4 | [Ghost](https://github.com/TryGhost/Ghost); Node + DB and hosting conditions; membership/payment features not used in pilot |
| **M15** | **Grav 2** flat-file CMS + Twig/Markdown + first-party API | file-backed CMS, optional structured API/admin | docs, small editable websites with Git-friendly content | 3–4 | [Grav](https://github.com/getgrav/grav), [grav-mcp](https://github.com/getgrav/grav-mcp); official MCP requires Grav 2 + API plugin + authorized key + compatible client. **NOT CONNECTED.** PHP prerequisite; install/licensing versions unverified |

### Family D — decoupled/headless content, 2 recipes
| ID | Build model, key stack | Rendering / state | Suitable for | Effort | MCP / dependencies |
|---|---|---|---|---:|---|
| **M16** | **Headless WordPress** content API + Astro OR Next frontend | WP manages content; separate static/SSR frontend | content team needs WP editor but bespoke fast design | 4–5 | [WP REST API](https://developer.wordpress.org/rest-api/), [Astro CMS guide](https://docs.astro.build/en/guides/cms/wordpress/); two runtimes/deployment concerns; WP MCP optional |
| **M17** | Headless CMS **Strapi OR Wagtail OR Payload** + Astro/Next | content via REST/GraphQL; independent frontend | multi-channel, structured content, larger site | 5 | [Strapi](https://github.com/strapi/strapi), [Wagtail](https://github.com/wagtail/wagtail), [Payload](https://github.com/payloadcms/payload); server/database/roles; select ONE; pricing/feature license separately |

### Family E — e-commerce, 3 recipes
| ID | Build model, key stack | Rendering / state | Suitable for | Effort | MCP / dependencies |
|---|---|---|---|---:|---|
| **M18** | WordPress + **WooCommerce** + theme | monolithic WP ecommerce DB/orders/plugins | real standard shop after separate approvals | 4 | [WooCommerce](https://github.com/woocommerce/woocommerce); verify DB compatibility, backups and production order/payment gates |
| **M19** | Monolithic standalone ecommerce: **PrestaShop OR OpenCart** | PHP commerce engine + templates/admin/DB | alternative to WP for classic store | 4–5 | [PrestaShop](https://github.com/PrestaShop/PrestaShop), [OpenCart](https://github.com/opencart/opencart); PHP/DB, localization/extension tests |
| **M20** | Headless commerce: **Medusa OR Vendure OR Saleor** + separate storefront | ecommerce API/backend/admin + JS frontend | advanced commerce, custom integration | 5 | [Medusa](https://github.com/medusajs/medusa), [Vendure](https://github.com/vendurehq/vendure), [Saleor](https://github.com/saleor/saleor); multiple services + DB; NOT a lightweight first experiment |

### Family F — stateful sites / managed services, 2 recipes
| ID | Build model, key stack | Rendering / state | Suitable for | Effort | MCP / cost |
|---|---|---|---|---:|---|
| **M21** | Small full-stack site: static/Vite front + **Hono OR Django** API + **PocketBase OR SQLite** | real local HTTP I/O + durable state; separate admin if needed | login-less contact workflow, small data app, validated forms | 3–4 | [Hono](https://github.com/honojs/hono), [PocketBase](https://github.com/pocketbase/pocketbase); choose smallest; auth only if proven necessary |
| **M22** | Static/Astro frontend + BaaS/serverless backend (e.g. Supabase self-host/cloud) | frontend on static host, database/Auth/functions external | multiuser app requiring cloud storage/service | 4–5 | [Supabase](https://github.com/supabase/supabase); provider plan/credit/egress, regional eligibility and credential/security **UNKNOWN: NOT ACTIVATED** |

## 2. Cross-cutting choices (NOT additional distinct construction models)
| Layer | Options | How/when we use |
|---|---|---|
| Content ownership | hardcoded text, Markdown, JSON, CMS-admin, headless API | pick by who edits and how often; avoid DB if no durable mutable state |
| Runtime/rendering | static HTML, SSG, CSR/SPA, SSR, hybrid/islands | prioritize HTML availability, SEO, mobile and accessibility; choice depends on project |
| Site editor | direct code, Gutenberg, visual builder, GrapesJS/Puck, Penpot | editor is interface, not architecture. Need reversible/exportable source and license |
| Installability | PWA manifest/service-worker | optional web enhancement, **not a standalone build model**; [MDN PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) |
| Backend | none, JSON fixture, local SQLite, PHP/MySQL, Node API, hosted BaaS | add only with real I/O and ownership need |
| Deployment | local preview; static hosting; PHP/Node hosting; managed SaaS | no deployment authorized; hosting commercial terms and overage must be verified |
| Hosted proprietary builders | Wix, Shopify, Webflow | separate SaaS workflow, not a reusable local open-source stack; costs/accounts/cloud rights unknown, **NOT selected** |
| MCP/agent control | Bridgerator already connected; WP MCP Adapter, Grav MCP, WordPress Studio MCP/CLI, Playwright MCP | existing tool first; new adapter is **not automatically present** in chat. Check transport, auth, least privilege, costs, RAM, observed advantage |

## 3. WordPress subtypes and hosting distinction (important)
- **Classic M09** uses PHP templates and WordPress hooks/filters.
- **Block M10** uses HTML block templates, Gutenberg and theme.json; preferred modern native editor for a fresh WordPress demo.
- **Hybrid M11** combines classic structure with available block/theme.json features; good migration path, not a reason to build both systems fresh.
- **Page-builder M12** adds a visual plugin; NOT a separate backend or license-free by implication, has potential lock-in.
- **Headless M16** runs WordPress as a content authority only, external frontend as separate runtime; avoid two-runtimes until justified.
- **Store M18** adds WooCommerce; product and payment data must never be conflated with a static cart demo. WordPress Playground uses SQLite and has compatibility/persistence limits: it is NOT evidence that every WooCommerce/payment extension will run in production.
- **Development hosts** are not website build models: Playground browser/WASM CLI or WordPress Studio app/CLI are *alternative local environments*. WordPress Studio's official repo explicitly describes site management via desktop, CLI, **AI agent connected through MCP**; not yet installed/connected here.
- Official WordPress MCP Adapter works through the Abilities API, **WordPress 6.9+** per current site-owner docs, permission-checked/publicly exposed abilities only. This is optional for M09–M12/M16/M18; it does not provide unrestricted site control.

Official references:
https://developer.wordpress.org/themes/getting-started/what-is-a-theme/  
https://developer.wordpress.org/news/2024/12/bridging-the-gap-hybrid-themes/  
https://wordpress.github.io/wordpress-playground/limitations/  
https://github.com/Automattic/studio  
https://github.com/WordPress/mcp-adapter  
https://github.com/WordPress/mcp-adapter/blob/trunk/docs/getting-started/site-owners.md  
https://learn.getgrav.org/2/advanced/mcp-server

## 4. Selection for pilot one — **M02**, not a new website category
**Selected construction recipe (engineering recommendation, no production approval):**
**ChatGPT GPT-6 → Bridgerator (already connected) → existing Node/npm + a project-local Vite installation (only after review) → vanilla HTML/CSS/JS → static JSON fixtures and deterministic cart calculations → one local browser QA route → branch-specific GitHub commit.**

**Proposed artifact:** synthetic six-item ecommerce portfolio demo, responsive, searchable items, quantity/cart, exact money arithmetic, clear permanent demo warning, mock receipt, reload/error reset, keyboard + mobile tests. Frontend-only, NO real checkout, customer account, backend, DB, payment, data collection or serverless service.

**Why M02 over others for the first proof:**
- Lower dependency count and RAM pressure on the 8 GB DJMRN Windows laptop.
- Node/npm already work; Vite source archive previously identified in Downloads. Need to check archive SHA, current official Node compatibility and pin a safe version before using (download archive ≠ installed runtime).
- JS/CSS/HTML can be edited directly by Bridgerator without an extra agent or specialized MCP.
- Produces a runnable local outcome to benchmark this chat's coding and QA quality before WP/SSR or backend.
- Better feature coverage than M01 if several modules/asset pipeline/tests are needed; *if one file is sufficient, fall back to M01 instead of forcing Vite.*

**Short candidate comparison (Judgment, NOT measured benchmarks):**
| Model | Dependencies for first demo | Local editing | Real shop later | Immediate pilot |
|---|---|---|---|---|
| M01 HTML only | minimal | direct | cannot be a real secure server/payment system alone | fallback even simpler |
| **M02 Vite + Vanilla** | Node/npm (present), project-local Vite | direct | later migrate architecture if real backend needed | **SELECTED FOR PLAN** |
| M04 Astro | Node + Astro | direct | needs backend for real shop | good second content-heavy site |
| M10 WP Block | PHP/WP environment via Playground/Studio | editor + code, optional MCP | WooCommerce after compatibility checks | second experiment |
| M18 WooCommerce | WP + ecom plugin + persistent compatible DB | editor/admin | yes with security/approval | defer until actual real use |
| M20 Headless commerce | multiple runtimes/DB/integrations | more tools | yes, advanced | reject as first pilot |

### How this choice maps to existing P00–P12
P00 choose a nonreal product category/brand later → P01 simple brief → P02 two visual references/asset rights → P03 six synthetic JSON products and routes → P04 **M02** chosen provisionally → P05 dedicated local folder + locked Vite only if necessary → P06 accessible design tokens → P07 product→cart→mock receipt end-to-end → P08 filter/search/responsive & persist/reset as approved → P09 Node test + browser test + keyboard & accessible markup → P10 optional MCP only if measured gap → P11 Git branch commit + read back → P12 human mobile evaluation then decide next.

**Pilot is NOT started.** No installer, package, public hosting, merge, provider activation, publishing, WP setup, credit usage, or runtime test was authorized or performed for this site in this research turn.

## 5. Future decision triggers
- **Need CMS editor and WordPress demonstration:** switch to M10; prefer one local host Playground OR Studio, not both by default; separate plugin and PHP/runtime acceptance.
- **Need fast multi-page content/SEO:** M04 Astro before M06 SSR. If static docs specifically, M03 Eleventy/Hugo.
- **Need WordPress layout but bespoke frontend:** M16 only when content ownership justifies two systems.
- **Need low-database editable CMS with direct API/MCP:** consider M15 Grav 2 only after PHP, API-plugin, CLI/cost/license and MCP bridge test.
- **Need real orders/payment:** M18/M19 only after independent security/payment approvals; mock M02 does not count as production commerce.
- **Need user login/durable state:** compare M21 vs M22 with privacy and real I/O; M22 cloud unknown cost = STOP.

## 6. Evidence index — source-of-truth references grouped by actual behavior
**Static/SPA/SSR:**
- https://vite.dev/guide/
- https://www.11ty.dev/docs/
- https://gohugo.io/about/introduction/
- https://docs.astro.build/en/concepts/islands/
- https://docs.astro.build/en/guides/on-demand-rendering/
- https://react.dev/learn/creating-a-react-app
- https://nextjs.org/docs/app
- https://svelte.dev/docs/kit/introduction
- https://nuxt.com/docs/guide
**CMS / WordPress / headless:**
- https://developer.wordpress.org/themes/getting-started/what-is-a-theme/
- https://developer.wordpress.org/news/2024/12/bridging-the-gap-hybrid-themes/
- https://wordpress.github.io/wordpress-playground/architecture/wordpress-database/
- https://github.com/Automattic/studio
- https://github.com/WordPress/mcp-adapter
- https://github.com/WordPress/mcp-adapter/blob/trunk/docs/getting-started/site-owners.md
- https://getgrav.org/
- https://learn.getgrav.org/2/advanced/mcp-server
- https://www.drupal.org/docs/develop/decoupled-drupal
- https://github.com/joomla/joomla-cms
- https://docs.ghost.org/hosting/
- https://docs.strapi.io/cms/intro
- https://docs.wagtail.org/en/stable/
- https://docs.astro.build/en/guides/cms/wordpress/
**Commerce and backend:**
- https://github.com/woocommerce/woocommerce
- https://github.com/PrestaShop/PrestaShop
- https://github.com/opencart/opencart
- https://docs.medusajs.com/learn/storefront-development
- https://docs.vendure.io/current/framework/developer-guide/overview
- https://docs.saleor.io/
- https://github.com/honojs/hono
- https://github.com/pocketbase/pocketbase
- https://github.com/supabase/supabase

**Research caveat:** A listed official GitHub repository proves source existence, not that the package is present on user's PC, that every feature is free, or that all cross-border/cloud licensing applies. Third-party integrations, premium extensions, image assets and paid deployments need independent evidence at selection. Direct-MCP availability currently belongs to Bridgerator and GitHub connector only. Other MCP options are **documented possibilities, not tested connections**.

**Checkpoint:** only construction-model research and initial recommendation complete; real selected pilot stack is NOT yet installed, built, served, or tested. No 3D/Codex source touched.
