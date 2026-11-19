# DJMRN — X15 | Canonical all-tools coverage, provenance reconciliation and closure

**Date:** 2026-11-19. **Mission:** DJMRN-FREELANCE-WEBSITE-001, E1/X15. **Status:** **COMPLETE (SCOPE-QUALIFIED)** for reconciling *observed* resource/state evidence across X01–X14 and a bounded X15 route observation; **NOT** 100% of Gladeye. **Next:** X16 public JS chunks, Source Maps and source attribution. Single CURRENT stage authority: [PROJECT-LOG](../../../PROJECT-LOG.md); X00–X46 sequence authority: [EXTRACTION-RUNBOOK](../EXTRACTION-RUNBOOK.md).

## 1. Correct X15 scope and tool ownership

The original X15 entry requires: **'Reconcile ALL capture/archive tools and set freshness/coverage per resource/state'**, uses **Deterministic Node/Python; outputs X01–X14**, and requires an explicit denominator, per-tool differences and UNKNOWN marking for inaccessible/never-requested sources. **No unique third-party X15 extractor was specified or required.** The X16/X17 tools are DevTools Sources and Source Map Explorer, respectively. No new free/paid service, browser, subscription, installation, privileged permissions, Docker or WSL was needed for this closure.

X15's canonical inputs are the owner's local X01–X14 original capture manifests, CDP/SPA/HAR fingerprints and private source bodies; its outputs are **derived, reproducible indexes and decisions**. Source of truth for source code and stage log: GitHub; exact private captured bytes: owner's Windows desktop; architecture continuity: Notion. Tool-source folders and built-by-us fixtures are **not** treated as source files belonging to Gladeye.

## 2. Exact final verified counts — avoid false claims of site completeness

| Metric | Audited measurement | Meaning |
|---|---:|---|
| On-device capture-folder physical files re-hashed | **2,247** | Includes upstream tools, test fixtures, archive files, metadata and site assets, not 2,247 unique site resources |
| Total capture-folder disk bytes in audit | **331,355,219** | Sum over scoped X01–X15 private capture folders |
| Unique local byte SHA-256 values | **1,409** | Different file digests; 187 duplicate-hash groups and 838 physical copies beyond unique digests |
| Candidate normalized first-party paths | **72** | Includes six synthetic/offline-rewritten paths that cannot be asserted to be actual network resources |
| First-party paths independently seen in HTTP network evidence | **66** | **Only valid known-resource denominator** for this scoped URL-level audit |
| Verified original standalone response-body URL paths | **63** | Original HTTP payload byte hashes match real local files; includes X01, X14 and X15 work/previously saved evidence |
| Remaining network-observed paths without valid standalone response bodies | **3** | Explicitly classified below, not automatically missing reconstructable model files |
| Valid archive ZIP structures / CRC checks | **16/16** | Includes controlled fixtures, not all archives equivalent to Gladeye; 3 expected container SHAs PASS, 0 failed |
| X10 Browsertrix source records | **47 CDXJ entries, 46 unique site paths** | **Fixes erroneous previous X10=0 attribution** in the reconciler |
| X01 original capture SHA check | **47/47** | X01 original response-body manifest file SHA checks |
| X14 selective new body SHA check | **7/7** | X14 two route JS + two CSS + three HTML first-party payloads |
| X15 new Work route and JS body SHA check | **6/6** | Two JS + four case-study HTML payloads |
| Final acceptance diagnostics | **0** | Generated test result `COMPLETE_SCOPE_QUALIFIED` |

**DO NOT call 63/66 'site 95% complete'.** It is only the fraction of *already observed, normalized HTTP first-party paths* with locally verified standalone response bodies, not all routes, all interactions, all original authored modules or GPU frames. The original full-site denominator is **UNKNOWN**. Network paths like `/_next/image` aggregate distinct parameterized requests when the safe report deliberately drops query values. Separately, 6 offline filename projections are **not verified network-origin URLs** and are excluded from the 66.

## 3. Detailed reconciliation of X01–X14 and the X15 complement

| Stage(s) | Tool/capability | Verified role and caveat |
|---|---|---|
| X01–X02 | Playwright/Chrome and CDP | Original HTTP bodies (X01) and dependent script/runtime/network analysis (X02) |
| X03–X04 | SiteOne Crawler CLI / GUI | Crawling/mirrors and independent render checks; rewritten mirror URLs are not automatically original network-source URLs |
| X05–X06 | decant / WebScoop | Scene-description and alternate browser/offline capture; separate authored/test outputs from original site bytes |
| X07–X08 | SingleFile / WebScrapBook | Page snapshot and archival/annotation forms; tool sources/own fixtures not website assets |
| X09 | HTTrack | Public network URL discovery and offline mirror; content may be rewritten |
| **X10** | **Browsertrix WACZ** | **47 indexed first-party CDXJ response records, 46 unique paths**; 16/16 ZIP+CRC archive checks across mixed site/fixture containers; X10 is **not empty**. CDX `archiveSHA256` hashes the **whole archive** and MUST NOT be misrepresented as a per-response SHA |
| X11 | ArchiveBox JS and Web Archive | 48 embedded-response URL paths indexed in the selected X11 WARC crosswalk; replays/contents not independently extracted as standalone bodies by X15 |
| X12 | PinchTab + WebGraph | SPA graph and 187s sampled temporal interaction, Menu hrefs including Careers/Contact/Ventures; not GPU frame capture |
| X13 | HAR Viewer + CDP | 180s safe HTTP waterfall and JS initiator metadata, no raw response bodies; 46 already known site paths at that run |
| X14 | HTTPArchive/Wappalyzer | 180s library signature evidence (Three.js r154 / Next.js 13.4.19 heuristic versions) and **7** selectively saved first-party bodies; three page hrefs were known in X12 but page bodies newly stored in X14 |
| X15 | Built-in Node 24 / Python 3.14, existing Chrome | Local file SHA inventory, archive/CDX verification, source role normalization, 180s bounded route snapshot and **6** newly archived Work-page/JS responses; final coverage decision |

Note: a zero URL count for X04/X06/X07/X08 in one *manifest-extractor column* is a lack of parsed network-path records in that reconciler, **not** evidence those tools were never installed, tested or produced archive files. Their local physical files are counted separately and original stage evidence remains authoritative.

## 4. Actual X15 independent 180-second public route observation

The dedicated X15 live observer ran for **180.66 seconds** with **13 fifteen-second checkpoints**, **7 private screenshots**, **7 visits covering 6 distinct public routes**: `/`, `/work`, `/about`, `/careers`, `/contact`, `/ventures`, and back to `/`; all **7 navigation responses HTTP 200**. The corrected collector logged **933 network events**, with **no event-cap truncation**, **19 failed third-party requests** and **0 failed first-party request events**. Separately, the HTTP response log includes **404 and 502 on the parameterized first-party `/_next/image` endpoint**, and one **401 from Vimeo**, a third-party video service. A successful top-level page response does **not** prove every embedded resource succeeded. The six-route tour is **not 180 seconds of continuous homepage flower-scene frames**; that observation belonged to X11/X12.

Private run: `X15-ROUTE-FRESHNESS-TRUE180-2026-11-19T14-59-34-333Z`; original time-series in owner desktop `02-reviewed-derived/`; screenshots kept under `01-private-captures/X15/<run-id>/`. No authenticated sessions, credentials, private data or third-party raw response contents were exported.

## 5. Novel body acquisition and corrections

**Five targeted previously known URLs:** 4 returned HTTP 200 and their exact response hashes were **already present** in the earlier local capture/mirror/archive; no duplicate was saved. The remaining `/favicon.ico` returned HTTP 404 and its HTML error body SHA was already indexed in the X11 source. Source examples: `polyfills-*.js`, `9a7e*.css`, `soehne-buch*.woff2`, `robots.txt`. This proved older site bytes existed outside the narrow X01-only original-body catalog; no new copy required.

**Six X15 newly saved first-party HTTP response bodies (six SHA-256 PASS):** two Next.js JavaScript modules and four case-study HTML documents for:

- `/_next/static/chunks/743-c1c23600c4e6dd0e.js`
- `/_next/static/chunks/app/%5Bpage%5D/page-c639dc70f189dc2f.js`
- `/work/hypercinema`
- `/work/into-the-amazon`
- `/work/the-dj-and-the-war-crimes`
- `/work/where-opportunity-takes-root`

These are **new standalone archived bodies relative to the scoped earlier physical SHA index**, not proof that every URL/HTML page was previously undiscovered. The last work case-study URL, for example, had already been seen in earlier navigation evidence. No new original 3D GLB/flower shader/GPU trace is claimed.

**Four HTML filename corrections:** The four `text/html` case studies were originally named with `.ico` extension due to a fallback naming rule. Their private files were **renamed to `.html` in place**, not re-downloaded or changed; each stored byte SHA remains identical. Their X15 private mapping manifest was updated, a pre-correction manifest copy retained locally, the selective downloader extension logic corrected, and **4/4 file type/byte-hash acceptance PASS**. No private original file contents moved into GitHub.

## 6. The only three known paths lacking valid standalone original bodies

| Path | Verified evidence | Correct status/action |
|---|---|---|
| `/_next` | **HTTP 308 redirect** in HTTrack path index | `DIRECTORY_REDIRECT_308`: a redirect endpoint, not a standalone 3D asset; preserve status/target evidence only |
| `/_next/image` | **Query-dependent image optimization**; multiple live statuses including 200, 404 and 502 depending on request | `QUERY_DEPENDENT_IMAGE_OPTIMIZER`: cannot associate these sanitized path-only observations with one original image. Keep UNKNOWN for the query variants; do not guess query arguments |
| `/favicon.ico` | **HTTP 404**; earlier archive captured HTML error response, not an icon; separate favicon SVG URL is observed | `HTTP_404_NOT_VALID_ICON`: retain 404 provenance, not falsely mark a missing useful `.ico` payload |

This explicit unresolved classification is sufficient for **X15's coverage/reconciliation task**, and must **not** be converted into a fictional '100% original site captured' claim. Other never requested routes, server-only code, proprietary source, live shader uniforms and camera/GPU state remain UNKNOWN.

## 7. Private machine-readable authoritative evidence and reproducible code

**Local evidence root:** `%USERPROFILE%/Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261118-NEW-EXTRACTION`.

Under its `02-reviewed-derived/X15-AUDIT-CURRENT/` directory:

- `X15-integrated-coverage-and-gaps.json` — final recomputed source-role, stage and resource coverage, including X10 attribution and three UNKNOWN classifications
- `X15-acceptance-check.json` — all required booleans PASS, `COMPLETE_SCOPE_QUALIFIED`, 0 diagnostics
- `raw-captures-content-hash-index.json` — file-level local SHA-256 inventory (includes private paths; **do not publish**)
- `observed-first-party-resource-coverage.json` / `observed-resource-coverage.csv` — exact URL-by-stage/role crosswalk and raw-body integrity
- `stage-tool-complementarity.csv` / `X15-DETERMINISTIC-RESULTS.md` — stage comparison and definition of denominator
- `X15-archive-container-and-X10-CDX-index.json` — ZIP/CRC and X10 WACZ index evidence
- `X15-six-new-work-route-response-bodies.json` — six private original payload hashes and corrected `.html` paths
- `X15-five-targeted-missing-response-bodies.json` — five selectively probed known resource outcomes, no duplicate payloads
- `X15-closure-provenance-fixes.json` — historical filename and X10 patch provenance; `.pre-X15-closure.bak` preserves old manifest.

**Owned source code preserved in public GitHub (no captured copyrighted site bodies):**

- [Deterministic X15 reconciler](../scripts/X15-Audit-All-Extraction-Captures.mjs)
- [X10 archive/container/CDX inspector](../scripts/X15-Inspect-WACZ-CDX-Archives.py)
- [Reversible/verified X15 provenance repair](../scripts/X15-Correct-HTML-and-X10-Provenance.mjs)
- [Bounded 180-second route observer](../scripts/X15-Bounded-180s-Route-Freshness.mjs)
- [Known resource verification, no duplicate download](../scripts/X15-Verify-Known-Response-Bodies.mjs)
- [Six Work route/body original SHA verifier](../scripts/X15-Verify-New-Work-Route-Bodies.mjs)

**Rerun:** installed scripts live at `%LOCALAPPDATA%/DJMRN-Website-Toolkit/04-Runtimes/X15-Source-Coverage-Reconciler/scripts/` and rely on existing project files, Node 24 and Python 3.14; deterministic audit rerun: `node <local-runtime>/scripts/x15-audit-all-captures.mjs`. The optional live route observer runs from the existing ArchiveBox JS Playwright workspace with the owner's **100 MiB free physical RAM emergency supervisor**, not without it. Selective fetchers are **not** prerequisites to offline X15 repeat runs; they were executed once on six actual public routes and five documented URLs. The code's known route list and source profile must be checked against current site changes before any new live run. X15 report generation itself performs **no network requests** and requires no new tools.

## 8. Final acceptance and transition gate

**Accepted offline:** `X15-AUDIT-2026-11-19T15-24-17-814Z`; 2,247 files SHA-scanned; **63/66 scoped observed network URL paths** with byte-identical original standalone payloads, 3 correctly classified incomplete/non-file endpoints, **X10 WACZ CDXJ attribution 46/47**, X01 47/47 SHA, X14 7/7 SHA, X15 Work 6/6 SHA, corrected 4/4 `.html`, archive ZIP CRC 16/16, 0 diagnostics. Final JSON status: `COMPLETE_SCOPE_QUALIFIED`.

**Not accepted/not claimed:** comprehensive private backend source, complete authored original source, exhaustive interactive app graph, every hidden asset, private endpoints, WebGL uniform values, shader instruction trace, per-frame camera matrices, production web release or rebuilt-site fitness. These belong to dedicated later stages and independently authorized testing. **Sequential next stage: X16**, not started by this closure.
