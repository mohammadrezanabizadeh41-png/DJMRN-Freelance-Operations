# DJMRN — X12 PinchTab WebGraph | Windows Installation, Live SPA Graph, Dedup and Rerun Handoff

**Date:** 2026-11-19. **Mission:** DJMRN-FREELANCE-WEBSITE-001 / Flower Valley / X12 E1. **Stage verdict:** **X12 selected SPA nav/content graph extraction PASS on owner's Windows and live public reference; local-first.** This document is reproducibility/provenance, not an alternate CURRENT progress ledger. **Canonical current status:** [PROJECT-LOG](../../../PROJECT-LOG.md); [X00–X46 runbook](../EXTRACTION-RUNBOOK.md). X11 archive/time-series run is complete and independent: [X11 handoff](X11-ARCHIVEBOX-JS-LIVE-180S-REPRODUCIBLE-COMPLETION-2026-11-19.md).

> X12 was created for **navigation/SPA DOM-control state and content graphs**, not for complete extraction of a GPU animation, private code, shader pipeline or camera timing. X11 had already captured 180 seconds of WebGL page behavior. Never treat WebGraph's page states as 3D camera states. No raw third-party network body, screenshot, login, token or account data is committed to public GitHub.

## 1. Why the replacement and what was installed

Original `uirip/websnap` GitHub default branch was README-only with no runnable source or package. The npm name `websnap@1.1.2` refers to an unrelated old PhantomJS/webshot program. **Do not install that homonym.** The approved alternative consists of:

- **PinchTab**, official [pinchtab/pinchtab](https://github.com/pinchtab/pinchtab), **v0.15.2 MIT**, official signed GitHub release Windows amd64 executable, installed locally after checksum verification. The downloaded file is `pinchtab-windows-amd64-v0.15.2.exe`; a byte-identical `pinchtab.exe` local executable copy enables WebGraph CLI subprocess calls. Both are local Windows binaries, no Docker/WSL or Go build.
- Official `v0.15.2/checksums.txt` expected **SHA-256 `387e6d49b70fe6e82247391275123abe45922bebcb6f6316f3837413661e8703`** for the Windows x64 executable; actual hash matched. Binary size **29,242,368 bytes**. `pinchtab --version` returned `0.15.2`. Release link: `https://github.com/pinchtab/pinchtab/releases/tag/v0.15.2`. License: [MIT](https://github.com/pinchtab/pinchtab/blob/main/LICENSE). Official Windows support is best-effort but **this exact hardware successfully executed the tool**.
- **PinchTab WebGraph**, source [egouilliard/pinchtab-webgraph](https://github.com/egouilliard/pinchtab-webgraph), **version 0.1.0 MIT**. Actual source shallow-cloned to local folder, Git HEAD **`542f44d82d062ac4416ff1c99b08dc444ba1633c`**, full CLI source and tests present. Installed in a dedicated Python 3.14.7 venv using `python -m pip install --no-deps -e <local-source-folder>`. Python `pwg --help` and `pwg crawl --help` passed after UTF-8 console adjustment; no paid models/API or Docker. This package is an ANALYZER/OBSERVER. PinchTab is the local browser EXECUTOR. GitHub is project source authority, Notion holds rationale, desktop holds private evidence.

## 2. Paths and security architecture

**Runtime root**, using actual owner Windows environment:

```powershell
$RT = Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X12-PinchTab-WebGraph'
$PT = Join-Path $RT 'pinchtab.exe'
$PWG = Join-Path $RT 'venv\Scripts\pwg.exe'
$env:PINCHTAB_CONFIG = Join-Path $RT 'private\pinchtab-config.json'
$env:PATH = "$RT;$RT\venv\Scripts;$env:PATH"
$env:PYTHONIOENCODING = 'utf-8'
$env:PYTHONUTF8 = '1'
$EV = Join-Path $env:USERPROFILE 'Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION\02-reviewed-derived'
```

Runtime contents: `pinchtab.exe`, original release-named binary, `pinchtab-v0.15.2-checksums.txt`, `pinchtab-webgraph-source/` cloned from upstream, `venv/`, private `private/pinchtab-config.json`, dedicated `state/`, `profiles/`, `logs/`, owned `fixture/`, `reports/`, own scripts `Run-X12-PinchTab-WebGraph.ps1` and `scripts/x12-compare-and-summarize.mjs`. Private config contains locally generated PinchTab bearer token and **MUST NEVER be uploaded or printed**.

Verified local security posture after startup: `server.bind=127.0.0.1`, port `9871`, authenticated API, default IDPI on and server reports `GUARDED`; target allowlist only `127.0.0.1`, `localhost`, `::1`, `www.gladeye.com`, `gladeye.com`; `security.allowEvaluate=true` needed for graph's DOM inspection; **upload and download disabled**. Browser uses already installed isolated Chrome for Testing v157 from X11, not user's personal Chrome profile. `blockImages=false`, `blockMedia=false` for 3D-site relevance. No Gmail, Dropbox, OAuth, KYC, account login, password or credit needed. Optional keyring/login, FastAPI UI, MCP and Anthropic extras were not installed: they are unrelated interfaces/authenticated workflows, not additional extractor data required for this website. One loopback service/browser at a time; release RAM after work.

**Windows VPN complication:** first public navigation returned `403 navigation connected to blocked remote IP 127.0.0.1`; Windows DNS resolved `www.gladeye.com` to public Vercel endpoints, Windows direct HTTP returned 200, and system proxy was enabled with loopback host. The official PinchTab Go SSRF guard saw the local VPN proxy as the browser connection endpoint. Targeted correction: set `security.trustLoopbackProxy=true` in the **isolated X12 config only** and restart PinchTab; leave SSRF/IDPI generally enabled and domain allowlist restricted. VPN remained active. After this correction PinchTab successfully navigated to `https://www.gladeye.com/`, title and **one canvas** confirmed. No Windows-wide proxy/firewall/security configuration was changed.

**Windows console complication:** initial WebGraph `--help` raised `UnicodeEncodeError` under cp1252 when printing unicode arrows. Setting `PYTHONUTF8=1`, `PYTHONIOENCODING=utf-8` solved the CLI error; the package installation itself had already succeeded. During `git clone`, PowerShell with `$ErrorActionPreference=Stop` treated ordinary Git stderr `Cloning into ...` as a script error, but `.git`, `pyproject.toml` and exact HEAD were subsequently verified; do not re-download merely because of that warning.

## 3. Official source/test contract and observed failures

WebGraph CLI expects **an already-running separate PinchTab local HTTP bridge**, and the executable **must be named `pinchtab`** or reachable on PATH; the source clone alone is insufficient. PinchTab server must be started as `pinchtab server` on Windows, not daemon mode. Its `pwg crawl` supports `--single-url`, `--max-states`, `--max-visits`, `--max-depth`, `--dump-controls`, `--capture-content`, `--read-forms`, `--checkpoint-every`, and `--max-restarts`.

**Critical discovery:** `--single-url` WebGraph mode deliberately DOES NOT navigate to the supplied `--start` URL; it reads the active PinchTab tab and dispatches JS clicks. Start with `pinchtab nav <target>` and **verify `location.href`** before `pwg crawl --start <same-url> --single-url`. First local trials returned only `1 state / 2 edges` due to reusing prior tab; this did not prove WebGraph incapable. Another first owned fixture did not expose selected ARIA markers; in single-URL mode the state signature is structurally deduped by active ARIA view, so visually changed text alone may be collapsed. The corrected owned fixture uses `<role=tab aria-selected>` and `aria-current` markers.

### Actual owned control fixture acceptance

- Owned local HTTP fixture served on `127.0.0.1:9874/stateful.html`; only local test HTML/JS, no remote network or credentials, intentionally has 4 tab views. Recorded file: `<RT>/fixture/stateful.html`.
- Explicit `pinchtab nav http://127.0.0.1:9874/stateful.html` then `pwg crawl --start http://127.0.0.1:9874/stateful.html --server http://127.0.0.1:9871 --out <RT>/reports/owned-fixture-aria-actual --single-url --max-states 25 --max-visits 100 --max-depth 4 --checkpoint-every 2 --dump-controls --capture-content --read-forms --capture-form-states --max-restarts 0`.
- **PASS: 4 state nodes, 16 safe action edges, 0 create/submit triggers, status `frontier-exhausted`; minimum observed free Windows RAM 2,353 MiB.** Verify `#audit[data-submits]` remained `0`. Local graph copied to existing desktop `02-reviewed-derived/X12-PinchTab-WebGraph-OWN-SPA-state-graph-PASS-2026-11-19.json`. This is WebGraph's actual output, distinct from earlier Playwright-owned baseline 4 states/8 edges.

## 4. Live reference execution, exact commands and results

After public navigation corrected above, active tab verified as `https://www.gladeye.com/` via `pinchtab eval location.href`. Interactive snapshot initially reported links `Home`, `About`, button `Menu` and image nodes. This target has WebGL canvas and time-varying GPU visuals, but WebGraph's navigation graph does not measure those internal state transitions.

```powershell
& $PT server --bind 127.0.0.1 --port 9871  # start as a local foreground server, or use the provided launcher
& $PT nav 'https://www.gladeye.com/' --timeout 45 --json
& $PT eval 'location.href'                 # must be the exact URL before single-url
& $PWG crawl --start 'https://www.gladeye.com/' --server 'http://127.0.0.1:9871' --out (Join-Path $EV 'X12-PINCHTAB-WEBGRAPH-GLADEYE-<NEW-UTC-RUN-ID>') --single-url --max-states 120 --max-visits 500 --max-depth 6 --checkpoint-every 3 --dump-controls --capture-content --read-forms --capture-form-states --max-restarts 0 --render-ms 1500
```

**Actual successful run:** `X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56` (local time Europe? owner Windows reported +03:30; do not infer UTC from this filename). **Graph file** `$EV\X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56.json` is **65,124 bytes**, SHA-256 **`bbe90ea5fca8d4e4f7f74c7778232093844c8862a1a59b11f177d8dc31563d32`**. Status `meta.complete=true`, `meta.stopped=frontier-exhausted`, **4 page/UI states / 8 directed action edges / 0 form triggers**; four page state URLs: `/`, `/about`, `/work`, `/work/where-opportunity-takes-root`. No cap reached. Source data/collections collected at each state, 102 total control observations, 17 collection groups and 271 sampled content items **not unique assets (can repeat)**. Lowest sampled Windows free RAM **1,917 MiB**, never hit emergency 100 MiB.

**Offline query accepted (zero browser calls):**

```powershell
& $PWG howto (Join-Path $EV 'X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56.json') --find 'Where Opportunity Takes Root' --limit 2
```

Result: two matching repeated-list items in the `Work` state, shortest route from Home via About to Work in **two clicks**, explicit console `answered offline from cache — 0 browser calls`. The `howto --goal 'About'` query returned no trigger because `--goal` searches create-form triggers (none in this target), not generic navigation; use `--find` or offline paths for this use case.

## 5. Deduplication with X01–X11 and unique contribution

Deterministic script is committed in [X12-Compare-WebGraph-X01-X11.mjs](../scripts/X12-Compare-WebGraph-X01-X11.mjs), local operational copy `$RT\scripts\x12-compare-and-summarize.mjs`. It reads the existing desktop derived X01–X11 JSON reports, collects absolute first-party URL references, crosschecks X11 final WARC first-party response paths, and writes one local JSON crosswalk. Rerun with `node $RT\scripts\x12-compare-and-summarize.mjs <X12_RUN_ID>`.

Verified **53 scoped prior JSON files parsed; zero parse failures** (the earlier X11 comparison had different scope with 60 baseline metadata/manifest files: do not conflate denominators). The prior baseline metadata/WARC already contained `/`, `/about`, `/work`; the nested case project path `/work/where-opportunity-takes-root` was absent from **the scoped 53-report metadata and final X11 WARC response-path list**, so it is a new graph destination relative to that evidence. This does not prove nobody previously saw the URL, and this case-study page is NOT a new 3D flower texture/model/shader.

New technical evidence TYPE: explicit action-edge navigation graph, accessibility/control inventories, content collection structures and offline shortest-click query, **not another downloaded network asset mirror**. No new GLB/texture/GLSL/camera curve proved. WebGraph does not recover GPU draw commands. The graph's site marketing copy and case content are local evidence only; public GitHub carries sanitized summaries and own tooling scripts.

**Local crosswalk file:** `$EV\X12-PINCHTAB-WEBGRAPH-GLADEYE-2026-11-19T15-21-56-X01-X11-state-graph-reconciliation.json`. Preserve previous X01–X11 raw evidence unchanged. Do not dump duplicate HTML responses/GLB assets from X12; downstream GPU stages X22+ handle internal 3D analysis.

## 6. Re-entry and reusable script

**Locally installed:** `$RT\Run-X12-PinchTab-WebGraph.ps1`, committed owner-created script [X12-Run-PinchTab-WebGraph.ps1](../scripts/X12-Run-PinchTab-WebGraph.ps1). Modes: `preflight`, `start`, `run`, `stop`; run mode supports configurable `-MaxStates`, `-MaxVisits`, `-MaxDepth`, uses loopback PinchTab and existing CfT, owner-defined 100 MiB physical memory emergency stop, unique time-stamped graph output and optional deterministic compare script. The fixed Windows tool/profile paths resolve via `$env:LOCALAPPDATA` and `$env:USERPROFILE`.

```powershell
$RT = Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X12-PinchTab-WebGraph'
$S  = Join-Path $RT 'Run-X12-PinchTab-WebGraph.ps1'
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $S -Mode preflight
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $S -Mode start
# One complete new actual capture when truly needed (avoid duplicates otherwise):
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $S -Mode run -MaxStates 120 -MaxVisits 500 -MaxDepth 6
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $S -Mode stop
```

**PowerShell execution policy caveat:** unsigned `.ps1` files were blocked by current Windows PowerShell policy. Running only the trusted local launcher with **per-process** `-ExecutionPolicy Bypass` passed; **no machine/user system-wide ExecutionPolicy was modified**. Launcher `-Mode preflight` and `-Mode stop` accepted on the owner laptop; `start` was rechecked separately, while the new combined `-Mode run` path is reconstructed from the individually successful commands and **must not be labeled separately E2E-tested until run**. If launch fails, fall back to exact manual CLI commands above, do not re-download verified source.

**100 MiB rule:** the guard watches Windows `Win32_OperatingSystem.FreePhysicalMemory` while owned nav/crawler subprocesses run and terminates the targeted X12 process at <=100 MiB. It does not terminate VPN, Desktop Commander, shared Node/CMD/PowerShell or unrelated user processes. Sampling cannot guarantee detecting every subsecond spike. After one accepted trial, stop the idle local browser-control service to free memory; installed binaries, app config and graph remain durable.

## 7. Scope verdict and next stage

**X12 = OPERATIONAL COMPLETE for public browser SPA/action/content graph with a verified local fixture and live Gladeye capture; HTML/DOM graph not complete GPU reconstruction.** Confirmed working: official pinned Windows PinchTab; Python WebGraph; private tokenized loopback service; own-ARIA fixture; public target; 4-state/8-edge graph; offline search; X01–X11 dedup report; RAM safety; stop/restart route. Remaining scoped limitations: no shader/camera internal state from WebGraph, no personal account provider integrations needed, no guaranteed site-wide exhaustive path coverage, no forms triggered on live site, screenshot/video offline reproduction belongs to X11/X22+.

**NEXT X13:** independent HAR Viewer and privacy-redacted network waterfall validation under existing runbook. Do not start unnecessary new general browser agents, WSL, Docker or paid services, and do not confuse graph state count with number of GPU frames.
