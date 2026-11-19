# DJMRN — X12 Preflight: WebSnap vs PinchTab WebGraph vs existing Playwright

**Date:** 2026-11-19. **Mission:** DJMRN-FREELANCE-WEBSITE-001 / X12 / E1, after completed X11. **Status:** RESEARCH + OWN LOCAL CONTROL-FIXTURE BASELINE PASS; PinchTab WebGraph is **NOT INSTALLED / NOT YET ACCEPTANCE TESTED** on owner's Windows laptop. **Current execution state:** see sole [PROJECT-LOG](../../../PROJECT-LOG.md), not this research document.

**Reason:** X12 runbook asked for SPA state/accessibility tree exploration, safe action edges, deduplicated state hashes and replayable navigation, replacing the allegedly unpublished/unavailable `uirip/websnap` with `pinchtab-webgraph`. This assessment checks that premise, architecture, free cost, security and GPU-scene suitability before any tool installation.

## 1. Verified facts and source provenance

1. **Original WebSnap repository now public but NOT an installable source checkout:** [uirip/websnap](https://github.com/uirip/websnap) currently exposes **one commit and README.md only** in the GitHub root; no `package.json`, license text file or actual TypeScript implementation present in the default branch. README *claims* `npm install -g websnap`, `websnap open`, `websnap auto`, BFS state graph, HTTP asset capture and offline HTML rewriter, but these capabilities are not independently executable from that published README-only source. Do not change BLOCKED status to PASS merely because a README is online.
2. **npm `websnap` name is a different, old package:** Owner laptop's `npm view websnap@1.1.2` returned the maintainer `geta6`, dependencies `phantomjs@1.9.2-6` and `webshot`, last package metadata modification **2022-06-29**; npm has no repository field pointing to `uirip/websnap`. This old package is **NOT THE NEW WebSnap**. Do not install it for X12; a same-name package is not proven source identity.
3. **PinchTab WebGraph has real source and tests:** [egouilliard/pinchtab-webgraph](https://github.com/egouilliard/pinchtab-webgraph), `pyproject.toml` version **0.1.0**, **MIT**, Python **>=3.10**, base Python package **stdlib-only / dependencies=[]**. Repository contains `pinchtab_webgraph/`, `tests/`, CLI, documentation and fixture/examples. Exposes `crawl`, `linkcrawl`, `howto`, `ask`, `flow` etc. Claims interaction graph with DOM/accessibility controls, same-URL SPA transitions, safe create-form *inspection without submission*, checkpoint/dedup, offline shortest-path search, and no runtime LLM/API fees. These are **vendor-documented capabilities**, NOT tested successfully on this laptop.
4. **PinchTab is the independent browser-runtime dependency:** [pinchtab/pinchtab](https://github.com/pinchtab/pinchtab), local Go HTTP/CLI browser control, **MIT**; repo/docs say Windows binaries exist but support is **best-effort**, unlike macOS/Linux. Windows should launch `pinchtab server` directly, not rely on daemon install. Official user docs: [Getting Started](https://pinchtab.com/docs/get-started/), [Security](https://github.com/pinchtab/pinchtab/blob/main/docs/guides/security.md). Read-only laptop npm metadata: `pinchtab` **0.15.2**, repository correctly linked to official GitHub; GitHub release web page showed v0.15.1 at check; verify version/checksum/version correspondence before choosing an actual binary. Node 24 on laptop satisfies npm Node>=16; Windows CLI has **not** yet been installed or started.
5. **Existing lightweight alternative already operational:** Playwright/Chrome for Testing installed for X01/X02/X11; no new account, binary or runtime required. Playwright can gather DOM/accessibility state hashes, navigation edges and bounded screenshots but needs a small X12 orchestration script. Reuse it as objective baseline before adding a new server/daemon.

## 2. Technical fit for the actual Gladeye flower-valley mission

| Criterion | README-only `uirip/websnap` | `pinchtab-webgraph` + PinchTab | Existing deterministic Playwright/CDP |
|---|---|---|---|
| Runnable verified source | **NO** (README only; npm homonym unrelated) | **YES source exists**, Windows runtime NOT TESTED | **YES**, current laptop passes |
| New software required | Would require nonverified package | Python CLI + PinchTab Go/npm binary + local browser server | None |
| Price/licensing | README says MIT; no actual LICENSE file to independently verify | MIT source + MIT runtime, no runtime LLM cost; bandwidth/host cost not measured | Already installed, local free runtime |
| SPA click/DOM-state exploration | Claimed only | Implemented by source, **needs local acceptance** | Feasible with small deterministic script; baseline PASS |
| Reconstruct source assets / offline mirror | Claimed; unverified | NOT an asset mirror by design | Already X01-X11 archivers; no need repeat raw copies |
| Internal WebGL camera/GL shader state | NOT proven | DOM graph **cannot infer canvas-only GPU state** | CDP DOM view also limited; X22+ GPU tools required |
| State graph / action dedup | Claimed only | Purpose built, with graph/BFS/checkpoints | Manually testable; not general crawler out of box |
| Windows compatibility | Unverifiable source | Official PinchTab Windows best-effort | Proven |
| Security/RAM | Unknown | Dedicated local HTTP control server; strict session/allowDomain/token/port controls necessary | Isolated CFT profile already proven |

**Important scope fit judgment:** The target's WebGL canvas can change visually without changing the accessibility tree/DOM or URLs. A generic DOM graph tool can report ONE state despite continuous scene motion. X11 already observed WebGL 2.0 and visually different samples over 180 seconds; X02-R3 found 28 event-listener rows and 51 network requests. X12 should focus on what DOM-accessible controls and safe UI state edges genuinely add over X11, **not promise hidden GPU/shader/camera extraction**. Dedup against X01-X11; do not archive another redundant copy of every asset.

## 3. Actual local preflight performed WITHOUT new installs

**Windows host:** DJMRN-LAPTOP / 8GB physical, ~6,020 MiB OS-usable, owner emergency cutoff **100 MiB free**. Read-only scoped tool search in PATH and `%LOCALAPPDATA%\DJMRN-Website-Toolkit` returned no `pinchtab`, `pwg`, `pinchtab-webgraph` or `websnap` command and no matching top-level downloaded/toolkit item. This is a **scoped non-detection**, not proof no copy exists anywhere on disk.

**Safe owned SPA test:** On 2026-11-19, used already installed Playwright and Chrome for Testing 157 to run a self-contained HTML fixture with Home/Details tab, toggle, modal, close, and a submit button intentionally **never clicked**. Script: `%LOCALAPPDATA%\DJMRN-Website-Toolkit\04-Runtimes\ArchiveBox-X11\archivebox-js-main\tests\x12-owned-spa-interaction-fixture.test.ts`. Exact execution:

```powershell
$RUNTIME = Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\ArchiveBox-X11'
$env:PATH = "$RUNTIME\pnpm-runtime\node_modules\.bin;$env:PATH"
Set-Location "$RUNTIME\archivebox-js-main"
& "$RUNTIME\pnpm-runtime\node_modules\.bin\pnpm.cmd" exec playwright test tests/x12-owned-spa-interaction-fixture.test.ts --workers=1 --reporter=line --timeout=35000
```

**Actual result:** PASS 3.1 seconds, **4 unique state hashes and 8 safe action edges**, `danger-submit` explicitly blocked, output:

`%USERPROFILE%\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION\02-reviewed-derived\X12-owned-spa-interaction-graph-preflight-2026-11-19.json`

RAM free during test endpoint ~2,189 MiB, afterward ~2,812 MiB. This establishes a reproducible **local baseline for X12's state-dedup contract**, **not** a PinchTab WebGraph test, not the public Gladeye crawl, and not a GPU graph.

## 4. Security, cost and impact gate for a PinchTab WebGraph pilot

- **No new tool has been installed or connected** during this preflight. User approval required for PinchTab binary/npm installation and pinchtab-webgraph Python package installation, especially because they create browser-control software and local service exposure.
- The preferred technical layout, only upon approval: ONE **dedicated isolated** PinchTab/CfT profile; bind **127.0.0.1 only**, dedicated non-conflicting port, token-authenticated control plane, restrict allowed domains first to an owned localhost fixture; no personal sessions/cookies; no wide LAN binding or reverse proxy. Never share token or OTP in chat/repository; the official sample `crawl-config.json` stores a token and must remain private. Disable upload/download; avoid dangerous submit/action permissions. Note WebGraph's documented example uses `security.allowEvaluate=true`, a privileged capability: restrict to owned fixture and shut down service after test.
- PinchTab's default browser instance and WebGraph crawler overlap with existing Playwright; a second always-running browser/daemon is NOT approved. One local server/browser at a time. Monitor Windows RAM via `Win32_OperatingSystem.FreePhysicalMemory / 1024` and stop *targeted* test at <=100 MiB.
- Verify official PinchTab release SHA-256/asset matches Windows x64 (from GitHub release and published checksums) and verify Python source version/commit before installing. Do **not** `npm install -g websnap`—registry homonym unrelated. Avoid unnecessary Go compiler, Docker, WSL or paid SaaS.
- PinchTab WebGraph config sample has `blockImages=true`, `blockMedia=true` to reduce crawl load; these defaults would hide important visual/glTF/texture behavior on Gladeye. First owned DOM-only fixture can use these safe limits. If public stage is authorized later, use image/media-aware but bounded collection and compare against prior X11 instead of guessing.
- Source roles: GitHub = canonical source/tests/technical results; local source-controlled file = approved code; Notion = tool architecture rationale; Desktop owner evidence = private raw observations; PinchTab = browser executor; WebGraph = state graph analyzer/observer. They are not a second state authority and must not accumulate as duplicate generic web crawlers.

## 5. Acceptance tests, stop conditions, and next action

**Smallest vertical gate:** With user-approved and checksum-verified Windows PinchTab binary + WebGraph package, run only `--version`/`--help`, then start ONE loopback browser with empty isolated profile. Point to the same harmless locally owned fixture and extract a compact JSON graph. Verify (a) 4 expected distinct states, (b) 8 safe action transitions or document explicit semantic differences, (c) no submit/file upload/external network, (d) hashed state/dedup and replay path, (e) checkpoint and crash recovery if supported, (f) memory floor never breached, (g) stop server and Chrome after run. Compare graph results to Playwright reference before a live target run.

**Live target later, only on successful owned fixture + owner authorization for bounded interaction:** one origin `www.gladeye.com`, small depth/state/action cap, no cross-origin follow/no login/no submit/no download, record accessible controls, state hashes and edge provenance, compare to X01–X11. If only canvas changes and DOM remains unchanged, mark `TESTED_NO_DELTA_FOR_CANVAS_INTERNAL_STATE` and advance; do not build a heavy crawler to pursue an impossible accessibility-only GPU trace.

**Current stage verdict (2026-11-19):** `X12 PREFLIGHT VERIFIED; local Playwright-owned fixture PASS; original WebSnap runtime BLOCKED; PinchTab WebGraph REAL SOURCE / WINDOWS EXECUTION UNVERIFIED / INSTALL APPROVAL PENDING.` No new tool install, live X12 extraction or production change has occurred. X13 HAR Viewer remains next once X12's bounded acceptance completes or a justified BLOCKED/NO_DELTA verdict is recorded.
