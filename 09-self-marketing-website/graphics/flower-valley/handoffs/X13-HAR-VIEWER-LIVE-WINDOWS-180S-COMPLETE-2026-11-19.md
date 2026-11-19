# DJMRN — X13 HAR Viewer: Windows setup, independent HAR visual QA, 180-second CDP capture, X01–X12 dedup

**Date:** 2026-11-19. **Mission:** DJMRN-FREELANCE-WEBSITE-001 / E1 / X13. **Disposition:** **COMPLETE for X13's explicitly defined *sanitized HAR, independent waterfall review, header-risk assessment and novel evidence crosswalk* objective**. This technical procedure is NOT the canonical current status authority: read [PROJECT-LOG](../../../PROJECT-LOG.md) and [X00–X46 runbook](../EXTRACTION-RUNBOOK.md). **Reference:** public anonymous https://www.gladeye.com/. **Next:** X14 framework/library heuristics, not claimed here.

> No raw third-party site HTML/JS/images/GLB, HAR containing cookies/tokens, screenshots or local private profile data are published in the GitHub repository. The captured local HAR is intentionally **metadata-only**. X13 is not a source asset duplicator, 3D camera recorder or GPU shader extraction tool.

## 1. X12 completion gate audited before X13

- Checked live Notion **Persistent Operating Memory** and **Tool Governance & Architecture Intelligence**. Read GitHub's current canonical runbook and latest PROJECT-LOG stage entries. Confirmed older X12 'pending install' notes superseded by later operational results; the main [X12 real live Windows handoff](X12-PINCHTAB-WEBGRAPH-WINDOWS-LIVE-COMPLETE-REPRODUCIBLE-2026-11-19.md) and [X12 full 187-second correction and novelty audit](X12-TRUE180-EXTRACTION-DELTA-AND-COVERAGE-AUDIT-2026-11-19.md) exist.
- Verified **all nine selected X12 derived artifacts on owner Desktop**: 65,124-byte 4-state graph, 5,990-byte X01–X11 state crosswalk, 192,800-byte TRUE180 timeline, 8,609-byte dedup/value crosswalk, 3,000-byte visual QA, 10,829-byte 13-parameter source index, 5,625-byte before/after Menu DOM, 2,638-byte three-route gap analysis, 16,146-byte offline handoff. Verified all **seven private X12 temporal JPEGs** exist, official PinchTab `--version` = **0.15.2**, `venv/Scripts/pwg.exe` exists; old port `9871` is stopped. VPN and Desktop Commander remain online.
- **X12 evidence meaning:** 187.03s of observation in 13 samples/7 private frames, seven mouse/wheel actions; 45/45 first-party network resource URL paths already existed in X01/X11. All 13 scene GUI labels had been in X01 raw JS, now indexed with 9 static defaults and 13 slider ranges; Menu reveals /ventures, /careers, /contact absent from the earlier four-state crawler graph. GPU camera/shader values still NOT extracted. X12 completion is limited to its specified DOM/SPA graph and sampled observation, not exhaustive GPU reverse engineering.

## 2. Official X13 tool and the smallest working Windows installation

**Chosen upstream:** [janodvarko/harviewer](https://github.com/janodvarko/harviewer), author Jan Odvarko, BSD licensed (`webapp/license.txt`); `package.json` version **3.0.0-alpha.0**. The pinned locally verified source HEAD is **`579969c6bb5537e0ddb358c6a273325eed16fe18`**. Upstream README includes 2016 stable viewer notes and old Node/npm development/build dependencies. **Do NOT run broad `npm install` or Selenium builds for this mission**: full source `webapp/index.html`, RequireJS, jQuery, CSS and HAR Viewer scripts exist and work as **static files** with current browsers. This is a legacy frontend; keep only on local loopback; do not expose a web server on LAN/public IP or connect authenticated browsing sessions.

**Windows root:**

```powershell
$X13=Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X13-HARViewer'
$UPSTREAM=Join-Path $X13 'harviewer-source'
$WEB=Join-Path $UPSTREAM 'webapp'
$VIEWER=Join-Path $X13 'Run-X13-HAR-Viewer.ps1'
$EVID=Join-Path $env:USERPROFILE 'Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION'
```

Initial source retrieval was a successful scoped shallow Git clone of `https://github.com/janodvarko/harviewer.git`; verified `.git`, README, BSD license, index HTML and bundled static JS/CSS. Python **3.14** was already on laptop, Node **24.22.1**, Chrome for Testing **157**, and Playwright were already installed from earlier stages. **No new build dependencies, subscription, private accounts, VPN change, Docker, WSL or external upload needed.**

**Run and inspect viewer (browser local only):**

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $VIEWER -Mode status
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $VIEWER -Mode start
# Open URL on owner's laptop browser: http://127.0.0.1:9876/index.html
# Paste the SANITIZED local HAR JSON into the text area; click Preview
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $VIEWER -Mode stop
```

Launcher source is committed [here](../scripts/X13-Start-Stop-Local-HAR-Viewer.ps1); it checks server ownership before any stop. Underlying canonical static server is Python `-m http.server 9876 --bind 127.0.0.1 --directory <webapp>`; `npm start` from upstream is **NOT required**. The source-page title displays unbuilt `@VERSION@` placeholder, a **cosmetic build token**, but runtime rendering is functional. One server/browser worker at a time; laptop RAM owner emergency stop boundary remains **100 MiB free**.

## 3. HAR Viewer actual independent UI tests (not just source inspection)

Original historic X02 HAR path `$EVID/01-private-captures/X02/X02-2026-11-18T17-49-35-108Z/sanitized-metadata-only.har`: 44,699 bytes, HAR **1.2**, **51 entries**, created by `DJMRN-CDP-METADATA-ONLY`, 0 `pages`, statuses 49 HTTP 200 / 2 HTTP 204, no sensitive headers, cookie arrays, POST body, response text or query URL indicators in the scanned file. The isolated loopback HAR Viewer served HTTP **200**, an automated real Chrome for Testing + Playwright test pasted the HAR in the actual text input and clicked **Preview**, successfully rendered **69 HTML table rows and 12 tables**; **0 JavaScript errors and 0 external requests** (remote requests blocked in acceptance browser). Old X02 viewer report under `$EVID/02-reviewed-derived/X13-HARViewer-X02-real-HAR-render-2026-11-19.json`.

Same real UI integration PASS after importing X13's new 111,656-byte metadata HAR: **69 table rows / 12 tables, zero JS errors and zero external HTTP**, visible request durations / HTTP statuses / media resources. New viewer test output `$EVID/02-reviewed-derived/X13-HARViewer-X13-TRUE180-real-HAR-render-2026-11-19.json`. Actual [Playwright acceptance test](../scripts/X13-HAR-Viewer-Playwright-Acceptance.test.ts) can be rerun against either via `DJMRN_HAR_INPUT=<absolute HAR path>`. It requires the X13 local viewer already running at 127.0.0.1:9876 and existing X11 Playwright worktree for dependency resolution. Interface presence does NOT mean every undocumented viewer feature was separately tested.

## 4. Fresh bounded 180-second CDP capture and exact evidence

**Capture source:** own [X13-Record-Sanitized-CDP-HAR-180.mjs](../scripts/X13-Record-Sanitized-CDP-HAR-180.mjs). Runs in preinstalled ArchiveBox JS Playwright Node environment using Chrome for Testing and CDP `Network.requestWillBeSent`, `responseReceived`, `loadingFinished`, `loadingFailed`. Opens a fresh, isolated, anonymous browser tab, captures **method, sanitized URL, type, response status, MIME, allowed ordinary headers, encoded size, CDP phase timing and available sanitized JS initiator call-frame paths** in memory; explicitly does NOT save request/response bodies, cookie/auth headers, raw query strings, request postData, private browser profile. Third-party paths are reduced to hostname + `[external-path-redacted]`. No new original site source copied. A separate PowerShell supervisor checked OS free physical RAM every two seconds and would kill only the test process at <=100 MiB; **minimum seen 1,509 MiB** and stop never triggered.

Observed `https://www.gladeye.com/` for **180.05 seconds** after load; 13 checkpoints at t=0,15,…,180s, five normal pointer/wheel gestures at 30/60/90/120/150s; initial page canvas not yet ready at t=0, **one Canvas and WebGL 2.0 by t=15 through the end**, `scrollY=0` at sampled checkpoints (scroll input is not proof it navigated). By t=15 the browser had **51 requests** and stayed at 51 until t=180. Hence this capture covers **180s of browser observation**, NOT 180 seconds of *new HTTP requests*, and says nothing about whether GPU animation continued without network fetches.

**Accepted run ID:** `X13-HAR-CDP-TRUE180-2026-11-19T12-39-13-668Z` (UTC string in run name).

**Private normalized HAR file:** `$EVID/01-private-captures/X13/X13-HAR-CDP-TRUE180-2026-11-19T12-39-13-668Z/gladeye-X13-redacted-metadata-only.har`.

**Verified size:** 111,656 bytes. **SHA-256:** `a31b8b140ef149179a2cbbc471c7844eac591129c69792070bf2600769d289fa`. **No redaction assertion failures**. Separate derived report `$EVID/02-reviewed-derived/X13-HAR-CDP-TRUE180-2026-11-19T12-39-13-668Z-capture-and-waterfall.json`, with exact phase/timing, call-frame, security protocol, request-type and sampled context metadata; capture status `LIVE_180_CDP_HAR_PASS`, 0 errors.

**Actual network observation:** **51 requests**, **47 first-party requests (46 unique first-party path URLs)**, **4 third-party requests**, **49 HTTP 200 / 2 HTTP 204**, **0 failures**. Resource type distribution: 27 Script, 3 Stylesheet, 4 Font, 8 Image, 1 Document, 1 Other, 6 Fetch and 1 Ping; MIME includes one `model/gltf-binary`, one `audio/mpeg`, three `text/x-component`, 27 JavaScript, 3 CSS, 4 fonts, 8 PNG, 1 SVG and 2 `text/plain`. **30 request records have JavaScript initiator call-frame information**. The per-session request duration median approximately **500.59 ms**, p90 **2,882.47 ms** (not a benchmark; cache/VPN changes between runs). TLS metadata is sanitized if available in CDP. HAR standard entries include `_initiatorStack`, `_resourceType`, `_tls` extra metadata; the standard upstream HAR Viewer ignores unsupported custom fields but still renders request timings.

## 5. Independent X01–X12 crosswalk and genuinely new data

Own [X13-Compare-HAR-X01-X12-Waterfall.mjs](../scripts/X13-Compare-HAR-X01-X12-Waterfall.mjs) reads X13 metadata HAR and crosschecks original **X01-R2 47-row response-body manifest**, earlier **X02 51-entry sanitized HAR**, **X11 54-response WARC hash/path crosswalk** (itself compared with X01–X10), and X12's 13 temporal resource observations. Combined baseline indexed **48 unique first-party normalized paths**. X13 showed **46 unique first-party paths, all 46/46 already known** from that baseline, **0 genuinely new first-party source URL path observations and 0 newly downloaded GLB/texture/JS/shader bodies**. The old X02 HAR MIME set already contained every MIME type seen in X13: **zero new MIME types**. Four third-party events had their paths redacted and cannot be used as site-asset discovery.

Derived crosswalk `$EVID/02-reviewed-derived/X13-HAR-CDP-TRUE180-2026-11-19T12-39-13-668Z-X01-X12-HAR-novelty-and-waterfall.json`. **Complementary evidence type** is request-phase waterfall, status/TLS/protocol/encoded-size metadata, 30 JS call-frame-to-request links and an independent privacy-cleaned HAR that can be browsed offline. Some network and script initiator data already existed in X02 analysis (including an X02-R3 runtime report with 28 event-listener rows), so do NOT claim all 30 call-frame relations are absolutely new across the project without a one-by-one callsite comparison. A change in latency or encoding alone is not newly discovered implementation functionality.

**Header/privacy risk assessment:** Sanitized original X02 HAR had 0 flagged sensitive values by the scoped checks. X13 input collector **never persisted** Authorization/Cookie/Set-Cookie, POST bodies, URL query values, request header values other than an explicit small whitelist, or response content, and the generated HAR passed **0 flagged sensitive fields** checks; the source and final HAR stay local. This is an assessment of the **stored files**, not a claim that the remote server sends no sensitive headers or that automated redaction is perfect for every possible custom data type. HAR files are sensitive in general; do not publish them or submit them to public viewer websites. Official Chrome instructions support sanitized HAR export by default; [Chrome DevTools HAR documentation](https://developer.chrome.com/docs/devtools/network/reference).

## 6. Exact rerun procedure and failure modes

1. Verify owner Windows >100 MiB free RAM, VPN + Remote Desktop Commander connected. Check X12 records and X11 baseline SHA/paths. No Windows-wide security changes, new plugins, paid credits, KYC or login.
2. Verify HAR Viewer commit/working static files, use local launcher `-Mode start` to open `http://127.0.0.1:9876/index.html`; only the dedicated HAR Viewer source is served (no local project folder or private files are HTTP-exposed).
3. For an independent new 180s CDP trace **only if needed**, start from installed ArchiveBox JS workspace: `Set-Location "$env:LOCALAPPDATA\DJMRN-Website-Toolkit\04-Runtimes\ArchiveBox-X11\archivebox-js-main"`; run `node tests/x13-gladeye-sanitized-cdp-180.mjs` with an **external OS free-RAM monitor** exactly as in X11/X12. GitHub owner-created script is committed; copy into that local tests path if migrating/rebuilding the runtime.
4. The script creates one fresh X13 private `*.har` plus one derived waterfall summary (zero bodies, cookies/secret headers), timestamped UTC. Verify 13 time samples/180s, 51 or site-current request count, **privacy gates**, SHA and status. Do not reuse exact old measurements as fresh test claims.
5. Run the [X13 dedup source script](../scripts/X13-Compare-HAR-X01-X12-Waterfall.mjs) from the X13 local runtime, passing its UTC run ID. Compare new URL paths/initiator stack evidence to X01–X12 rather than re-downloading the same source assets.
6. Feed the **locally sanitized HAR** into HAR Viewer's text box and click Preview; independently confirm real request rows/statuses/waterfall and browser console; test old X02 and new X13 examples, with no external viewer requests.
7. Stop only the verified 127.0.0.1:9876 owned Python static server (`-Mode stop`), close isolated test Chrome, verify RAM and VPN/Remote Commander remain healthy. Never kill other Chrome/Node processes.

**Known limits:** Legacy HAR Viewer v3.0.0-alpha.0 shows raw `@VERSION@` placeholder without build but is functional; no need to install obsolete npm/Selenium. 180s browser observation is sampling; no frame-by-frame GPU activity or live camera matrices extracted. CDP network timing estimates may be missing (-1) for cached/reused connections. Header risk check covers stored HAR fields only. Stage X13 is COMPLETE *for its defined HTTP Archive viewer and sanitized waterfall capability*; **X14 framework fingerprinting is NEXT**, not a new GPU animation analysis.

## 7. Post-acceptance viewer launcher lifecycle correction (2026-11-19)

An end-to-end `status → stop → start → stop` check exposed an output-stream lifetime issue: launching static Python by **`py.exe`** as an intermediate process from a nested PowerShell command could hold the invoking terminal open until the local server was terminated, even though HTTP 200 and HAR parsing worked. This was a launcher **process-handle issue**, not a HAR source integrity or extraction failure.

Corrected the owner-written [local HAR Viewer launcher](../scripts/X13-Start-Stop-Local-HAR-Viewer.ps1) to resolve the exact Python 3.14 executable through `py.exe -3.14 -c 'import sys;print(sys.executable)'`, then start **`python.exe` directly** as the serving process with its stdout/stderr directed to local logs. The corrected **start and stop lifecycle PASS** in one complete isolated test, return code 0 for both and port `127.0.0.1:9876` closed afterward; test runtime ~7.69 seconds. The listener's process name/commandline is verified before stop. No modification to global Windows PowerShell ExecutionPolicy, VPN, Desktop Commander or existing X11/X12 tools. This correction is reflected both in the local runtime launcher and GitHub's script.
