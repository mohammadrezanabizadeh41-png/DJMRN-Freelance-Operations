# DJMRN — X11 ArchiveBox JS | Complete Setup Audit, Actual Tests & Next-Assistant Handoff

**Status date:** 2026-11-19  
**Selected tool and only X11 implementation in focus:** **ArchiveBox JS `0.1.0`** (official [ArchiveBox/archivebox-js](https://github.com/ArchiveBox/archivebox-js), browser extension, AGPL-3.0).  
**Operational state at this handoff's original creation:** **BUILT / INSTALLED / WORKING ON OWN LOCAL FIXTURE / NOT YET VERIFIED ON LIVE REFERENCE**. **2026-11-19 update:** This is historical setup readiness; LIVE reference was subsequently verified and X11 completed. Read [X11 LIVE 180s completion / exact rerun procedure](X11-ARCHIVEBOX-JS-LIVE-180S-REPRODUCIBLE-COMPLETION-2026-11-19.md) and current [PROJECT-LOG](../../../PROJECT-LOG.md) before taking further action. Do not interpret historical PENDING sentences below as current.  
**Canonical current project progress:** [PROJECT-LOG](../../../PROJECT-LOG.md); [X11 sequence](../EXTRACTION-RUNBOOK.md); [official tool registry](../../../design/home/TOOLING-DOWNLOAD-INSTALL-CATALOG.md).  
**Important owner correction:** Older ArchiveBox server `0.9.77` **is NOT the implementation selected for X11**. It was blocked by Docker/WSL RAM and Unix dependencies; Python `abx-dl` alternative installed packages but CLI cannot start on native Windows. ArchiveBox **JS**, not original ArchiveBox, passed the actual local capture tests and must remain the focus. The user's speech-to-text sometimes renders JS as "GS"; it means the same **archivebox-js** browser version.

## 1. Why X11 exists: intended data, not just an installer

Original ArchiveBox-type goals for this flower-valley research: a repeatable record of *what the browser actually received and rendered*, including original request/response bodies, WARC/WACZ, URL, timestamp, resource graph, screenshot, rendered DOM, Console, integrity/fixity, replay off the network, manifest of capture stages and comparisons across runs. A professional reusable capture tool for future client projects is the longer-term goal.

ArchiveBox JS can **observe and preserve** many of these outputs and has numerous specialized plugin sources. It cannot infer hidden server data, reconstruct all GPU render commands/shader source or camera trajectories merely from a WACZ, or guarantee offline reproduction of animated WebGL. A source code file existing on disk is **not** proof its plugin behavior ran successfully.

**Task sequencing:** finish ArchiveBox JS source/install readiness and document it, THEN separately plan authorized live reference site capture and measure incremental X11 evidence against X01–X10; X12 interactive SPA state-graph and X13 independent sanitized HAR review remain distinct and pending. No autonomous live website crawl, login/session reuse or publication under this handoff.

## 2. What was actually installed on the owner's laptop

Environment: Lenovo Ryzen 5 3500U, AMD Vega 8 shared-memory GPU, **8GB physical RAM**, Windows 11 Pro. Instantaneous last observed Windows free RAM ~1.44–1.54GB, C: free ~97.94–97.98GB; these values are not peak RAM guarantees. User's previous X11 emergency rule: stop unsafe Docker/WSL operation at about **100MiB free Windows memory**; browser tool testing should maintain much more headroom, one isolated browser at a time.

All paths below are relative to this **single X11 runtime root**:

`%LOCALAPPDATA%\DJMRN-Website-Toolkit\04-Runtimes\ArchiveBox-X11\`

| File/folder | Actual role and status |
|---|---|
| `archivebox-js-main.zip` | Official ArchiveBox JS `main` source snapshot; intact 43,354,771-B ZIP, CRC PASS, SHA256 `3058d4cffee4f1113b06aeb9b3abb8a4243b14eedceccd2862208495cc00f2f4`. GitHub HEAD at verification `5a90961db5c5fca4eca0eaef129fc674aaf27420`; ZIP has a separately recorded SHA, and a file-by-file commit cross-check was not performed. |
| `archivebox-js-main\` | Extracted source, package version 0.1.0, full upstream JS project. Source-owned 48 plugin folders/configs present. |
| `archivebox-js-main\pnpm-lock.yaml` and `node_modules\` | Lockfile and installed JS dependencies; pnpm install reported **770 packages** (physical `.pnpm` store has 772 package directories by separate counting method). No mandatory fresh browser download is needed to *run the already built extension*. |
| `pnpm-runtime\node_modules\.bin\pnpm.cmd` | Locally installed `pnpm 10.33.2`; did not replace globally configured Node/npm. |
| `archivebox-js-main\.output\chrome-mv3\manifest.json` | **Actual built Chrome Manifest V3 extension, version 0.1.0**: 234 output files / **170,980,490 bytes**, 5 WASM files, all checked Manifest references exist. |
| `ChromeForTesting-157.0.8103.78-win64.zip` | Google official 209,854,321-B intact CfT archive, SHA256 `5f6ec40206407112702e163bf694d07f9fdc8ccbd346c70ce61fa62f716493f9`. |
| `ChromeForTesting-157\chrome-win64\chrome.exe` | Separate working **Chrome for Testing** executable; mandatory for automated unpacked-extension test on Chrome 157, rather than personal branded Chrome. |
| `Launch-ArchiveBox-JS.cmd` | Manual launcher opens the built extension via dedicated CfT profile `chrome-archivebox-js-profile`. **Launcher was directly smoke-tested: exit 0 and isolated Chrome process tree appeared; scoped tree was closed afterward**. User profile in normal Chrome was not changed. |
| `reports\local-dom-pass-001\` | Actual local WACZ 14,635 B + JSON 5,688 B; 5 resources, real DOM/WARC/offline replay PASS. |
| `reports\local-multiplugin-pass-001\` | Actual local WACZ 60,297 B + JSON 7,561 B; 11 selected plugin IDs, 8 resources, 5 capture hooks passed. |
| `reports\local-multiplugin-pass-002\` | Repeated local WACZ 60,288 B + JSON 7,561 B; same 11 selected plugin IDs/8 resources/5 succeeded hooks. |
| `reports\X11-archivebox-js-install-audit-2026-11-19.json` | Full local plugin-source/dependency/bundle inventory. |
| `reports\X11-all-upstream-source-and-hash-index-2026-11-19.json` | Seven selected source archives with SHA256 and ZIP CRC results. |
| `sources-python\` and `abx-dl-venv\` | Secondary Python ArchiveBox family source and isolated packages. **Kept for provenance; not active X11 runtime on Windows** due POSIX failure. |

Source and build size are different things; 170MB of browser extension does NOT imply 170MB RAM usage. Bundled media/analysis artifacts include FFmpeg WASM (~32MB), ONNX runtime WASM (~28MB), OCR model (~16.7MB), MuPDF WASM (~10.4MB), Pyodide WASM (~8.6MB), article/SEO handlers and specialized media/yt-dlp/PDF resources. Presence checked; performance of heavy specialist processing on Vega 8/8GB RAM **not yet measured**.

Node 24.22.1 and Python 3.14.7 were already present on laptop. `pnpm 10.33.2`, project dependencies, downloaded source snapshot, CfT and extension build are the new verified components. Running normal Chrome 157 with Playwright `--load-extension` initially timed out after 90s; changing the test to use isolated official CfT yielded a PASS. Do not reinstall Chrome or Docker.

## 3. 48 ArchiveBox JS plugins: exact inventory, dependency and execution truth

**Every one of the 48 source plugin directories contains its `config.json`**, and the complete browser bundle is present. **Only a subset actually received an individual proof of execution**. Some plugins are *derived viewers* or parsers that don't have their own browser folder/daemon; `networktiming` and `ssl` have no `browser/` directory; this is not itself a missing install.

Review the [entire 48-row plugin matrix](../research/X11-ARCHIVEBOX-JS-48-PLUGIN-CAPABILITY-MATRIX-2026-11-19.md) and the [machine-readable 48-plugin source/build inventory](../evidence/X11-archivebox-js-48-plugin-source-install-inventory-2026-11-19.json) **before claiming a specific plugin fully operational**.

Major plugin functions present in source include:
- HTTP resources: chrome navigation, original/rendered DOM, screenshots, console, headers, responses, redirects, network timing, network/DNS/TLS/certificate inspection, hashes/integrity.
- Metadata and derivatives: title, favicon, document accessibility tree, page manifest, parsed links, RSS, robots, SEO, article text via readability/mercury/defuddle, archive text search, SingleFile, PDF.
- Interactions: cookie-banner blocker, modal closure, infinite scroll, Browsertrix behaviors.
- Specialized output: source file capture, web archive import, media, yt-dlp/FFmpeg, gallery/forum/thread download, academic paper parsing, Git, Google Docs/Drive, Dropbox.
- The account-connected/external-provider plugins are **source present, not activated**, and do not authorize personal session or sensitive data access. Do not install or enable everything simultaneously; heavy OCR/media and account tools require explicit independent use-case and validation.

**Manifest privileges:** `storage`, `unlimitedStorage`, `tabs`, `debugger`, `downloads`, `declarativeNetRequestWithHostAccess`, with host permission `<all_urls>`. This is a broad browser-control extension. Only use it in dedicated user-data-dir, on authorized test pages; do not share private raw WACZ or browser login/cookies to GitHub.

## 4. Reproducible runtime test and negatives (DO NOT RELABEL)

| Test | Real result | Evidence |
|---|---|---|
| Official upstream `tests/dom-capture-live.test.ts`, browser launch changed to CfT | **PASS 16.0s** | 5 resources, WACZ 14,635B, source WARC+DOM, offline replay with **zero external HTTP requests** |
| Locally adapted `tests/x11-multiprovider-local.test.ts` | **PASS 13.4s** | 11 selected plugins, 8 resources, 60,297-B WACZ, 5 actual capture hooks succeeded: consolelog, Chrome navigate/settle, screenshot and DOM |
| Same multiprovider test repeated | **PASS 12.8s** | Same 11 plugin IDs and 8 resource count; 60,288-B WACZ, 5 hooks passed |
| WACZ digest and extracted content comparison | **PASS on selected content parity** | Original HTML SHA256 `388ff5f1722343ed5a03986a1e0c9452e2139171f8af172a03d5f52f235349d0`; SVG SHA256 `19c572e87b87944dd788c42c1c08ed6f41ca9b567c9ba4c7445cdae49036effb`, DOM/PDF? **Only JPEG, PNG, DOM were independently identical**, do not imply PDF. Whole WACZ ZIP differs due timestamps and changing localhost port. |
| First test of 9 derived viewers, `tests/x11-installed-viewer-audit.test.ts` | **FAIL overall: 125-second timeout** | headers/responses/hashes/screenshot/consolelog/title opened before timeout; networktiming/accessibility/singlefile remain not verified. |
| Follow-up bounded 6-viewer test `tests/x11-six-viewers-bounded.test.ts` | **PASS 7.6s**, exit 0, 6/6 | headers/responses/hashes/screenshot/consolelog/title each visible on local WACZ offline; free RAM after ~1,477MiB |
| Launcher `Launch-ArchiveBox-JS.cmd` manual smoke | **PASS startup smoke only** | CfT dedicated profile launched, 15 Chrome related processes observed, then only matching tree stopped; not evidence of actual manual capture UI use. |
| Live third-party reference, full X01–X10 incremental comparison | **NOT DONE** | Do not assert capture of unseen target resources. |
| All 48 plugins each invoked and accepted | **NOT DONE** | 48 configs / sources ≠ 48 tested outputs. |
| GPU/WASM/FFmpeg/OCR, very large live page, full WebGL replay | **NOT DONE** | Heavy bundled modules present, but actual performance/fidelity unknown. |

Full earlier local machine evidence [X11 core WACZ acceptance](../evidence/X11-archivebox-js-windows-local-capture-pass-2026-11-19.json). Captures remain **private** on the laptop; GitHub has sanitized metadata, file hashes and reproducible test/audit logic, not arbitrary third-party/raw WACZ payloads.

## 5. Source acquisition and specific Python fallback blocker

Seven selected source/archive artifacts exist, with all checksums and valid ZIP CRCs for ZIP files: see [X11 seven-source SHA256 registry](../evidence/X11-archivebox-full-source-archives-sha256-2026-11-19.json). This includes ArchiveBox original source only to preserve evidence of earlier attempt, not to reactivate it.

Pinned `abx-dl 1.13.369`, `abx-plugins 1.13.776`, `abxpkg 1.13.101` source tarballs were successfully verified. PyPI download for exact `abxbus 2.5.91` sdist was unsuccessful, but **full official GitHub source ZIP** `abxbus-2.5.91-git-02f2800d.zip` (1,241,046B, SHA256 `74bc840ed92c1196ae86174f275fed915d349dbb74afcda2cc29a36ecb009c29`) exists and was validated against commit `02f2800dade5526c72092ef412134c70016605d7`, ZIP CRC PASS, 347 entries. No further download is required for the selected pinned source set.

Python `abx-dl --help` / `--version` fails before run on native Windows: `ModuleNotFoundError: No module named 'pwd'` via `abxpkg`; upstream also uses POSIX `fcntl`/UID operations. **Never mark abx-dl functional, or install more Python packages expecting a simple fix**; for X11 the functional route is ArchiveBox JS browser build.

## 6. Desktop project evidence copied for continuity

Actual user-facing project root:

`%USERPROFILE%\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION\`

Files from the X11 local acceptance were **copied (not moved/removed)** into:

- `01-private-captures\X11\archivebox-js-local-validation-20261119\local-dom-pass-001\`: `dom-contract.wacz` and matching private JSON
- `01-private-captures\X11\archivebox-js-local-validation-20261119\local-multiplugin-pass-001\`: first 11-selection test WACZ+JSON
- `01-private-captures\X11\archivebox-js-local-validation-20261119\local-multiplugin-pass-002\`: repeat WACZ+JSON
- `02-reviewed-derived\X11-archivebox-js-install-audit-2026-11-19.json`
- `02-reviewed-derived\X11-all-upstream-source-and-hash-index-2026-11-19.json`
- `02-reviewed-derived\X11-python-pinned-source-downloads-2026-11-19.json`

There is **no real live-target X11 scene capture** in these copied paths. Their names explicitly identify the local validation fixture. Do not count them as new WebGL data.

## 7. Startup instructions after owner gives activation order

This is an **isolated, working build**: do NOT run `pnpm install` / `pnpm build` for ordinary future use unless source changes.

1. Windows: double-click `%LOCALAPPDATA%\DJMRN-Website-Toolkit\04-Runtimes\ArchiveBox-X11\Launch-ArchiveBox-JS.cmd`. Launcher verifies CfT exe and built MV3 manifest, then starts CfT with:
   `--user-data-dir="%LOCALAPPDATA%\DJMRN-Website-Toolkit\04-Runtimes\ArchiveBox-X11\chrome-archivebox-js-profile"`
   `--disable-extensions-except="...\archivebox-js-main\.output\chrome-mv3"`
   `--load-extension="...\archivebox-js-main\.output\chrome-mv3"`
2. A startup smoke succeeded, but **do not claim manual UI archival PASS** from that alone. Use a known harmless localhost fixture, no auth, open extension ArchiveBox JS's `studio.html`, select minimal capture plugins, record only approved URL, export WACZ, import and replay network-off.
3. After local startup check, the *next separate authorized mission* may target the published reference in a bounded scope: cap tabs/depth/requests, no login/post/submission, monitor free RAM, stop at owner's 100MiB emergency rule and avoid resource hogs simultaneously; retain primary WACZ privately and save only redacted summary/hash to project GitHub.
4. Compare new assets against X01–X10 by URL, MIME, response body SHA-256 and new behaviors; **new data must have a named URL/source and hash**. Independently examine redacted HAR in X13, not by exposing private headers in GitHub.
5. For reproducibility, launch a single isolated CfT browser at a time and run one bounded test; do not start ArchiveBox server/Docker/WSL to assist this JS route.

**Developer rerun of installed local six-viewer test** (from PowerShell, project source dir):
`$ROOT = Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\ArchiveBox-X11'`  
`$env:PATH = "$ROOT\pnpm-runtime\node_modules\.bin;$env:PATH"`  
`Set-Location "$ROOT\archivebox-js-main"`  
`& "$ROOT\pnpm-runtime\node_modules\.bin\pnpm.cmd" exec playwright test tests/x11-six-viewers-bounded.test.ts --workers=1 --reporter=line --timeout=60000`

Test harness in JS source: `tests/dom-capture-live.test.ts` (CfT launch adaptation), `tests/x11-multiprovider-local.test.ts`, `tests/x11-installed-viewer-audit.test.ts` (9-viewer timeout retained for negative evidence), and `tests/x11-six-viewers-bounded.test.ts` (6/6 PASS).

## 8. Readiness matrix, next action and honest stop conditions

| Dimension | Decision |
|---|---|
| Local full JS source, lockfile, output build | **PASS** |
| All 48 plugin configs/source folders | **PASS** for existence and dependency metadata, not all runtime hooks |
| Core capture/WARC/WACZ offline replay | **PASS** on own harmless fixture |
| Six key offline viewer smoke | **PASS** on same fixture |
| Provenance/checksum/source package inventory | **PASS** for seven pinned archives |
| Pinned Python alternate abx-dl native Windows | **BLOCKED**, not required by JS route |
| Real reference scene capture for additional assets | **PENDING user’s next activation/extraction mission** |
| All 48 plugins independently functional, no account permissions | **NOT VERIFIED**; specialized plugins may not be applicable/compatible |
| WebGL camera/GPU motion full replay | **NOT VERIFIED**; different specialist test |
| Current stage verdict | **X11 TOOL INSTALL/BASE-RUNTIME ACCEPTED; FULL TARGET EXTRACTION NOT STARTED** |

**Do not repeat 26-minute dependency installation.** **Do not recenter original ArchiveBox or Python abx-dl.** Do not quietly equate file/bundle presence with functional coverage. Advance from the **ArchiveBox JS already built and locally proven** state.

### Canonical companion files
- [Current 48-plugin capability matrix](../research/X11-ARCHIVEBOX-JS-48-PLUGIN-CAPABILITY-MATRIX-2026-11-19.md)
- [Public 48-plugin source/build inventory](../evidence/X11-archivebox-js-48-plugin-source-install-inventory-2026-11-19.json)
- [Pinned full source/index SHA-256](../evidence/X11-archivebox-full-source-archives-sha256-2026-11-19.json)
- [Actual local WACZ/replay acceptance](../evidence/X11-archivebox-js-windows-local-capture-pass-2026-11-19.json)
- [Reproducible source integrity script](../scripts/X11-audit-archivebox-source-archives.py)
- [Reproducible JS bundle/plugin script](../scripts/X11-audit-archivebox-js-install.py)

**Handoff: ready for the next assistant to read, launch and continue X11 with ArchiveBox JS, without rebuilding the already tested foundation.**
