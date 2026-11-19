# DJMRN — X12 True-180s extraction, X01–X11 dedup, parameter catalog & coverage audit

**Verified:** 2026-11-19, DJMRN-LAPTOP, Windows 11, free local PinchTab + PinchTab WebGraph. **Scope:** Gladeye public unauthenticated background reference `https://www.gladeye.com/`. This is a **corrective technical addendum** to the original [X12 installation/live graph handoff](X12-PINCHTAB-WEBGRAPH-WINDOWS-LIVE-COMPLETE-REPRODUCIBLE-2026-11-19.md) and [X11 TRUE180 handoff](X11-ARCHIVEBOX-JS-LIVE-180S-REPRODUCIBLE-COMPLETION-2026-11-19.md). **Current stage authority:** [PROJECT-LOG](../../../PROJECT-LOG.md). Data is stored privately on the owner desktop, not copied to GitHub.

## 1. What was missing and what has actually been done

Earlier X12 PinchTab WebGraph **successfully created a live state/action graph** (4 nav/UI states, 8 edges, 0 form triggers; 102 observed controls and 271 sampled items in 17 collections; queries offline) and compared its 4 page-state URLs to 53 prior X01–X11 derived metadata files. **But its live crawl ran ~60 seconds, not a continuously observed three-minute animation**, and its `frontier-exhausted` flag meant only its own navigable frontier was exhausted, not every DOM overlay or every changing GPU/3D scene state. The user's follow-up correctly identified this omission.

On 2026-11-19 we ran a **separate real 180-second X12 live observation** with the installed PinchTab browser. Final observer run **`X12-PINCHTAB-TRUE180-2026-11-19T12-11-45-554Z`**, elapsed wall clock **187.03 seconds** including final screenshots, `COMPLETE_180_SECONDS`, **13 sampled browser-state observations** at t=0,15,…,180s, **7 screenshots** at t=0,30,…,180s, **7 successful mouse-move/wheel input gestures**, **0 errors**, continuous first-party page URL, one canvas present throughout the samples, and lowest observed Windows free physical memory **1,329 MiB** (owner's emergency floor **100 MiB**, never breached).

**This is a *sampled* observation covering 3 minutes, not a full 60-fps recording or GPU draw-call trace.** X11 itself previously proved continuous 180s WARC recording plus 180s visual observations; do not confuse that WACZ recorder with PinchTab's independent X12 DOM/performance/screenshot observation.

## 2. Primary local artifact paths and provenance

Use the actual Windows user profile rather than hardcoding the username:

```powershell
$EVID = Join-Path $env:USERPROFILE 'Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION'
$X12  = Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X12-PinchTab-WebGraph'
$RUN  = 'X12-PINCHTAB-TRUE180-2026-11-19T12-11-45-554Z'
$RAW  = Join-Path $EVID "01-private-captures\X12\$RUN"
$DER  = Join-Path $EVID '02-reviewed-derived'
```

All independently checked on laptop:

| File under the defined roots | Content and status |
|---|---|
| `$DER\$RUN-temporal-observation.json` | COMPLETE 187.03-second 13-sample chronology, 7 gesture results, per-sample controls/canvas/resource timing metadata, image names and SHA-256; 0 errors |
| `$RAW\000s.jpg` through `$RAW\180s.jpg` in 30-second increments | Seven private JPEG snapshots, around 1236×566 pixels each; never upload these raw pictures into public GitHub |
| `$DER\$RUN-visual-frame-change-and-X11-comparison.json` | 6 screenshot pairwise pixel-difference checks plus prior X11 reference stats |
| `$DER\$RUN-X01-X12-dedupe-and-value-report.json` | Scope-qualified resource-URL/asset novelty, 180s coverage and parameter label summary crosswalk |
| `$DER\X12-13-scene-parameter-labels-to-X01-raw-JS-crosswalk-2026-11-19.json` | 13 scene GUI labels matched to the prior X01 minified JS body SHA/source file; 9 numeric static defaults, all 13 slider ranges and available uniform mappings |
| `$DER\X12-GLADEYE-menu-expanded-interactive-DOM-state-2026-11-19.json` | Actual before/after **Menu** click DOM controls and links |
| `$DER\X12-GLADEYE-menu-control-uncovered-X01-X11-comparison-2026-11-19.json` | Additional /ventures, /careers, /contact menu route visibility and historical search; URL targets not independently fetched |
| `$DER\X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56.json` | Earlier true native WebGraph graph, 4 nav states and 8 edges; preserved unchanged |
| `$DER\X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56-X01-X11-state-graph-reconciliation.json` | Prior 53-report WebGraph nav graph dedup |

## 3. Network/resource novelty — strongest finding

Browser `performance.getEntriesByType('resource')` was sampled every 15 seconds and URL paths normalized (queries dropped; no response bodies downloaded by this follow-up). At the first checkpoint there were **37** resource entries; at ~15s **48**; through 180s the count stayed **48**. Therefore **no new resource URL path entered the sampled Performance list after the first 15 seconds**. This is a finite observer claim, NOT an assertion that WebGL stopped animating or that a browser performance buffer records every possible request.

Deduped 48 distinct resource paths split into **45 first-party Gladeye URLs and 3 third-party URLs**. Cross-check of first-party paths against the **X01-R2 47-response raw manifest** plus the **X11 TRUE180 49 first-party WARC response-path list** found **45/45 already known**. **0 new first-party resource paths and 0 newly extracted GLB/texture/shader bodies** from X12 temporal observation. Existing X11 raw data were reused, not duplicated. Network performance entries (where `transferBytes` may be zero for cached assets) are NOT proof of missing or zero-byte downloaded assets; exact body hash authority remains the X01/X11 raw capture.

**Two different control signatures** were observed in sampled DOM metadata: initial loading (~t=0) and a steady signature from t=15 through 180. Pointer/wheel interactions did not generate new sampled DOM-control signatures; this does NOT imply that the continuously changing canvas/render did not respond.

## 4. Dynamic visual evidence crosschecked with X11

All seven X12 screenshots have different SHA-256 hashes. The source-local screenshot QA compares successive 30-second frames using one pixel every 12 pixels, and flags average absolute RGB change >22 across channels. Six frame pairs differed in **33.94%, 37.92%, 24.13%, 37.58%, 41.87%, 34.18%** of sampled positions respectively; mean **34.94%**. The X11 historical QA contained **39.78%** across 15-second pairs in one 180s observer and **36.61%** across 60-second pairs in another run. These sample intervals, screenshot dimensions and browser settings differ, so **do not interpret numerical differences as a software quality ranking**. They corroborate time-varying visual frames, not their cause, exact camera curve, geometry transforms or new media assets.

**Seven controlled gestures:** mouse move near t=15,30,45,120,150; wheel down ~60s and wheel up ~90s. All CLI calls returned success; there is no independent proof that each gesture altered the internal GPU state. Captured real browser Canvas node and viewport geometry, but did not intercept per-frame `WebGLRenderingContext` shader instructions or camera matrices.

## 5. 13 scene-parameter names — correctly classified as structured NEW INDEX, not NEW RAW SOURCE

WebGraph previously surfaced 13 UI labels (`repeated:div`) on the Gladeye home page. A second direct search through **29 X01-R2 raw first-party JavaScript/text/CSS files** confirmed **all 13 strings already present in a previously archived original JS bundle** (`/_next/static/chunks/app/page-4c279de0997d388f.js`), whereas the **53 scoped X01–X11 derived JSON reports** did not expose that label. **Do not copy the JS body or falsely count those labels as 13 new source files.** The useful new deliverable is the machine-readable parameter index joining rendered GUI labels to prior source SHA and initial/range/possible uniform mapping.

| UI field | Static source default (if numeric) | UI slider range | Source-side binding |
|---|---:|---:|---|
| `glitchMultiplier` | 0 | 0–5 | `uGlitchMultiplier` |
| `darkenFactor` | 0.6 | 0–1 | `uDarkenFactor` |
| `shiftMultiplier` | 0 | 0–5 | `uShiftMultiplier` |
| `hoverTransitionDuration` | not statically resolved | 0–55 | ratio recalculation |
| `rollOutTransitionDuration` | not statically resolved | 0–25 | ratio recalculation |
| `exitTransitionDuration` | not statically resolved | 0–5 | ratio recalculation |
| `homeExitDelay` | not statically resolved | 0–15 | other change handler |
| `uMaxDispersedPosX` | 100 | 0–200 | `uMaxDispersedPosX` |
| `uMaxDispersedPosY` | 65 | 0–200 | `uMaxDispersedPosY` |
| `dispersalAmountMultiplier` | 1.334 | 0–2 | `uDispersalAmountMultiplier` |
| `dispersalRandomnessWeight` | 0.53 | 0–1 | `uDispersalRandomnessWeight` |
| `dispersalIsFlowerWeight` | 0 | 0–1 | `uDispersalIsFlowerWeight` |
| `dispersalPositionYWeight` | 0 | 0–1 | `uDispersalPositionYWeight` |

These are **static minified source/UI configuration observations**, not measured live uniform values or authorization to reuse original site assets.

## 6. Additional actual UI state missed by the original automatic graph

After the 180-second test, PinchTab took an interactive snapshot and clicked the public site **Menu** button (a normal safe UI action). It changed to **Close** and exposed navigable route labels `Ventures` → `/ventures`, `Careers` → `/careers`, `Contact` → `/contact` in addition to previously visible Home/About/Work and external social/map links. The original X12 four-state WebGraph graph contained none of these three routes. Scope-limited search found them absent from the 53 X01–X11 derived JSON reports and prior X01 raw home-page JS/CSS/text response bodies scanned; they are **new rendered menu route evidence in this baseline**. This comparison did **not** navigate/fetch their content; they are **not new 3D flower assets or three complete new page datasets**.

**Corrected interpretation:** `frontier-exhausted` only means the graph crawler exhausted **its own recognized navigation queue**. It does NOT establish exhaustive clickability/DOM modal overlay or image/movie/GPU states. A separate explicit menu-state test was therefore necessary. Also external social and map links were excluded from the new *first-party route* count.

## 7. Feature coverage — which capabilities were exercised and which were not

| Capability | Verified status and reason |
|---|---|
| PinchTab native Windows app, isolated authenticated loopback server and browser | PASS, Chrome for Testing 157 and official PinchTab 0.15.2; official `trustLoopbackProxy=true` for locally routed VPN |
| WebGraph `crawl` / `--single-url` / content+controls / form inspections | PASS for 4-state/8-edge main public site graph; forms zero; did not exhaust invisible menu overlay |
| Offline graph query `howto --find` | PASS; shortest 2-click path, zero further browser requests |
| PinchTab `eval`, mouse move/wheel, screenshot | PASS on continuous 180s observer, 13 metadata ticks and seven private screenshots |
| Hash/URL crosswalk and prior source parameter mapping | PASS; 45/45 site resource URLs already known, 13/13 GUI labels in prior original JS |
| Menu-expanded interactive UI state | PASS via a separate targeted click after observer; three new visible first-party nav routes absent from scoped baseline |
| WebGraph `linkcrawl`, `ask`, `recipe`, `perform`, `flow` / optional UI/MCP/keyring login | NOT executed as independent 3D extraction paths; these are alternate navigation/automation/query interfaces and/or personalized account workflows, with no proven incremental shader/GPU extraction benefit for this public canvas; `perform` may carry action side effects |
| `--cross-host` external crawler / private-provider sessions | NOT executed; would broaden into unrelated third-party services, not the designated reference scene. No missing login required for public Gladeye target |
| GPU shader-source interception, per-frame camera matrix/draw-call tracing, full WebGL offline replay | **NOT PROVIDED BY WebGraph/PinchTab DOM graph**; requires separate WebGL/GPU instrumentation stage, not claimable from X12 |

**Answer to 'all capabilities'?** Not every software feature was switched on or exercised, and it would be incorrect to claim so. All **relevant native graph capture, content, DOM querying, manual menu inspection and sampled three-minute scene observation paths** described above were exercised, while alternate interfaces/account automations were not counted as extractors. Existing X11 is a better authority for archival network response bodies and 180s WARC integrity.

## 8. Reproduction from a new conversation / after reboot

1. Read the [X12 original installation handoff](X12-PINCHTAB-WEBGRAPH-WINDOWS-LIVE-COMPLETE-REPRODUCIBLE-2026-11-19.md), this addendum, [canonical PROJECT-LOG](../../../PROJECT-LOG.md) and X11 archive handoff; inspect actual installed binaries under `$X12`, installed venv and private config (no credentials in repo).
2. Start only one approved loopback PinchTab server with the existing isolated config, verify `pinchtab health --json`, then `pinchtab nav https://www.gladeye.com/` and verify exact active `location.href`. The local VPN uses an approved loopback proxy; do NOT change global firewall, system proxy, VPN or Desktop Commander.
3. From a **supervised** shell with separate physical RAM monitoring and emergency kill of only X12-owned processes at <=100 MiB, run the own [X12 true-180 observer source](../scripts/X12-PinchTab-TRUE180-Temporal-Observer.mjs). It creates a new UTC run-id, holds the page for 0..180s, samples every 15s, and stores private JPEGs every 30s. The script alone is **not** a substitute for the external Windows physical-memory stop monitor: use the same monitored launcher pattern documented in the original X11 and X12 handoffs.
4. Run [visual QA PowerShell script](../scripts/X12-Visual-Timeline-Frame-Difference-QA.ps1) with `-Run <actual-run-id>`; per-process `-ExecutionPolicy Bypass` is used on this Windows machine without persisting a Windows-wide policy change. Verify 7 screenshots, 6 pairs and the exact method, not a numeric 'quality improvement' from X11.
5. Run [parameter/source crosswalk Node script](../scripts/X12-Scene-Parameter-Source-Crosswalk.mjs), then [X12 temporal novelty/dedup Node script](../scripts/X12-TRUE180-Novelty-X01-X11-Crosswalk.mjs) with the new run ID argument, retaining all earlier X01–X11 raw evidence unchanged. All relevant findings belong in the existing Desktop derived folder; raw site images remain under its private captures.
6. Inspect menu overlay separately for missed UI routes, and identify each path as a route/DOM-control observation rather than downloaded source media. Compare any truly new data type against X01–X11 and avoid automatic asset duplication.
7. Stop the **scoped** PinchTab 127.0.0.1:9871 server and its owned isolated Chrome browser tree. Do not terminate VPN, Desktop Commander or unrelated Windows processes. The approved test concluded with the server port CLOSED, zero X12 Chrome processes, VPN/remote connector active, and ~2,733 MiB free Windows RAM.

**Current, evidence-based disposition:** X12 graph capability and supplemental true-180 sampled observation **COMPLETE**, no proof of additional first-party JS/GLB/texture/shader resource URLs after X01/X11; 13 previously captured config names now indexed with metadata; UI overlay uncovered three additional navigational routes; GPU/state fidelity not solved. For actual 3D camera/renderer internals use the separately defined later GPU instrumentation stage. Project stage may continue to X13 HAR review with X12's explicit sampling and crawler-coverage limitations retained.
