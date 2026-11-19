# DJMRN — X11 ArchiveBox JS live-site 180-second capture | Reproducible execution and handoff

**Date:** 2026-11-19. **Project:** DJMRN-FREELANCE-WEBSITE-001 / P3-H.8 / B11. **Stage disposition:** \`X11 TARGET-SPECIFIC EXECUTION COMPLETE / VALIDATED / HANDOFF TO X12\`. **Canonical status authority:** [existing PROJECT-LOG](../../../PROJECT-LOG.md); this document is a *technical procedure and immutable evidence reference*, not a second progress ledger. **Reference:** public anonymous https://www.gladeye.com/ (interactive background behavior only). **Source tool:** [ArchiveBox/archivebox-js](https://github.com/ArchiveBox/archivebox-js), JS browser edition \`0.1.0\`, Chromium extension + WARC/WACZ. **No raw third-party site assets, raw WACZ, private prompt, personal profile/session or cookies published here.**

> This handoff supersedes only the **live-target PENDING** assertions in the earlier [X11 installation/fixture readiness handoff](X11-ARCHIVEBOX-JS-COMPLETE-SETUP-AND-READINESS-2026-11-19.md). The previous document remains valid for setup/install history, checksums and local fixture proof. The official full ArchiveBox server \`0.9.77\` and native-Windows \`abx-dl\` CLI remain **BLOCKED**, not the operational X11 executor. This stage does **not** establish full WebGL replay, exact GPU commands/camera curves, or all 48 source plugin runtime success.

## 1. Host and hard operational rules

- Owner laptop: Windows 11 Pro; Lenovo Ryzen 5 3500U / integrated Vega 8; **8,192 MiB installed** in two 4GB DIMMs; OS exposed approximately **6,020 MiB** (approximately 2,172 MiB hardware/GPU reserved). Physical installed RAM and OS-usable RAM are different measurements.
- RAM emergency cutoff set explicitly by owner to **100 MiB free Windows physical RAM**. Earlier scripts used **450 MiB**, which stopped initial attempts prematurely. The existing bounded scripts were subsequently changed from \`free<=450\` to \`free<=100\`; newly added timed tests use \`freemem()/1048576 <= 100\`, sampled with an interval (typically 900 ms). **An observed minimum above 100 does not guarantee all transient memory spikes were sampled.**
- Before capture, user closed ChatGPT Desktop. On owner request, stopped Phone Link and Codex Sandbox Service; WSL Service stop was denied by current service privileges and was not forced. VPN (MLM VPN / Lantern / Xray), Remote Desktop Commander connector, and dependent Node/PowerShell processes were **protected and left running**. At first successful rerun RAM free ~2,988 MiB. After final tests Chrome/CfT closed and RAM returned to ~2.9GB.
- Run **one isolated Chrome for Testing at a time, one Playwright worker**, no Docker/WSL, no privileged personal Chrome profile, no account login, no paid APIs, no unattended broad crawler. Stop the targeted Chrome context only when at the 100 MiB cutoff. Do not kill all \`node.exe\`, \`cmd.exe\` or PowerShell: those may host Desktop Commander.
- No prior X11 raw artifacts were deleted or overwritten; each run has a unique UTC-stamped directory. Archive files are strictly local/private. Original website content is not licensed by being browser-accessible and must not be copied into publicly published DJMRN pages.

## 2. Exact canonical local paths

Use the actual Windows user profile, avoiding hardcoded usernames for **roots**:

\`\`\`powershell
$RUNTIME = Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\ArchiveBox-X11'
$SOURCE  = Join-Path $RUNTIME 'archivebox-js-main'
$CFT     = Join-Path $RUNTIME 'ChromeForTesting-157\chrome-win64\chrome.exe'
$EXT     = Join-Path $SOURCE '.output\chrome-mv3'
$EVID    = Join-Path $env:USERPROFILE 'Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION'
$env:PATH = "$RUNTIME\pnpm-runtime\node_modules\.bin;$env:PATH"
Set-Location $SOURCE
# Inspect RAM without guessing:
$os = Get-CimInstance Win32_OperatingSystem
[math]::Round($os.FreePhysicalMemory/1024) # MiB free
\`\`\`

Verified on 2026-11-19: \`$CFT\`, \`$EXT\`, \`$SOURCE\`, successful test scripts, main raw WACZ and derived report files exist. Local project layout:

- \`$EVID\00-source-prompt\` — original owner-supplied private prompt, preserved.
- \`$EVID\01-private-captures\X01\` through \`X10\` (including \`X01-REDO\`, \`X02-R2\`, \`X02-R3\`) — earlier snapshots, manifests, captured browser responses.
- \`$EVID\01-private-captures\SUPPLEMENTAL-TEMPORAL-AUDIT\TEMPORAL-2026-11-18T19-45-59-405Z\` — earlier, separate **132.92 s** Playwright visual/interaction timeline: 12 JPEGs, 51 network requests, mouse/scroll/drag samples, NOT an ArchiveBox JS recording.
- \`$EVID\01-private-captures\X11\` — X11 run-specific WACZ and private observed images; never upload to public GitHub.
- \`$EVID\02-reviewed-derived\` — sanitized machine-readable summaries, comparative hashes, readiness report and QA.
- \`$EVID\03-codex-handoff\` — reserved for later reviewed build instructions; **not** a destination for dumping raw site assets.

**Final authoritative X11 long-recording run ID:**
\`X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z\`

**Final raw WACZ:**
\`$EVID\01-private-captures\X11\X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z\gladeye-true180-archivebox.wacz\`

Verified **10,596,487 bytes**, **SHA-256 \`75c0e48927bfd77bf8de7a43747d79cea6e0b9445b4e8e3d9a9581ddae60a106\`**. On a new Windows session verify:

\`\`\`powershell
Get-Item "$EVID\01-private-captures\X11\X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z\gladeye-true180-archivebox.wacz" | Select-Object Length
Get-FileHash -Algorithm SHA256 "$EVID\01-private-captures\X11\X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z\gladeye-true180-archivebox.wacz"
\`\`\`

## 3. Timeline of actual tests, including important failures

| Execution | Verified observed outcome | Why it matters |
|---|---|---|
| Initial X11 live-site \`x11-gladeye-live-bounded.test.ts\` with old guard | **Stopped early:** browser capture reached only ~439 MiB free; 41 requests; no successful target WACZ. | Script used 450 MiB, not owner's later 100 MiB cutoff. |
| Low-memory variant \`x11-gladeye-lowmem.test.ts\` | **Stopped early** at ~446 MiB free, ~31 requests; no WACZ. | Failure was policy threshold, not proof ArchiveBox JS could not record. |
| Host RAM audit and user-directed scoped cleanup | OS ~6,020 MiB visible of 8,192 installed; user closed Desktop ChatGPT; approved optional Phone Link and Codex sandbox stop; no VPN/remote-connector stop. | ~2.9–3.0 GiB free enabled bounded retries without WSL/Docker. |
| Live bounded after **100 MiB** guard | **PASS:** \`X11-ArchiveBoxJS-GLADEYE-2026-11-19T10-41-26-976Z\`; 8,216,422-B WACZ, 43 WARC responses, 47 resources, minimum free 1,299 MiB. | Real target, actual WACZ, DOM + screenshot + console hooks. |
| Extended plugin run | **PASS:** \`X11-ArchiveBoxJS-EXTENDED-GLADEYE-2026-11-19T10-44-16-260Z\`; 9,840,441-B WACZ, 51 WARC responses, 56 captured resources, min free 1,400 MiB. | Selected 22 plugin IDs; TLS 4 origins, extra icon/SEO capture; \`manifest\` returned \`noresults\`. |
| First 180-sec observation \`x11-gladeye-180s-observed-archive.test.ts\` | **PASS as timeline:** 180.13 s, 13 sampled JPEGs at 15-sec spacing, recorded WebGL 2.0, pointer, wheel and drag; separate 9,898,077-B WACZ but **archive did NOT span 180 s**. | Demonstrated dynamic visual change but exposed false assumption: setting \`BROWSERTRIX_BEHAVIOR_SECONDS=180\` sets a maximum, not guaranteed duration. Actual Browsertrix hook returned after ~614 ms. |
| Pause/Resume recorder acceptance \`x11-archivebox-pause-recorder-acceptance.test.ts\` | **PASS:** held CaptureEngine attached across ~11.7s Pause; later \`/robots.txt\` request was recorded; WARC response date span 19.677s; min free 1,253 MiB. | Proved how to keep the **actual archive recorder** alive while the scene runs. |
| First wide \`x11-gladeye-180s-true-recorder.test.ts\` trial | **FAIL / no 180s capture:** Playwright 280s timeout before first frame, due to wrong selector \`input[aria-label="INFINISCROLL_EXPAND_DETAILS"]\` for a checkbox rendered without \`aria-label\`. Min free ~1,422 MiB. | Corrected to scoped \`.config-field input[type="checkbox"]\`; set studio default timeout to 9s, similarly corrected MEDIA_FETCH_MISSING. Keep failure evidence. |
| Corrected wide TRUE180 run | **PASS:** \`X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z\`, complete WACZ, 31 extra plugin selections plus Chrome core, 13 temporal checkpoints, min free **1,168 MiB**; archive WARC response date span **206.625 s**. | Actual 180+ sec recording including interaction, with additional completion hooks after Resume. |
| Archive checks and offline display | **PASS with exclusions:** 54 WARC response records (49 first-party, 5 third-party); explicit late \`/robots.txt\` at approx 182.06 s proves end-of-window capture; 18/20 offline viewers visible, 0 outgoing HTTP in viewer test. | Viewer \`networktiming\` and \`media\` still UNVERIFIED, not falsely PASS. |
| Final dedup and source plugin audit | **PASS** read 60 earlier X01–X10 JSON/manifest evidence files (UTF-8 and BOM UTF-16 supported), 0 parsing errors; hash-aware classification; all 48 plugin source/config directories audited. | Prevent duplicates and avoid equating plugin existence/viewer availability with executed extractor. |

During the final selected run: \`cap.state="complete"\`, \`captureResourceCount=122\`, 54 WARC responses, WACZ 10.596 MB, end-of-window network probe and selected 31 plugins + Chrome. Final exported native generated resources included \`consolelog\`, \`sslcerts\`, \`browsertrix_behaviors\`, \`infiniscroll\`, \`screenshot\` (JPEG & PNG), \`dom\`, \`search_contents\`, and empty-result artifact metadata for cookie/modal handling. **Do not confuse resources counted by CaptureEngine, WARC responses, source files and plugin-generated artifacts.**

## 4. Exact reproduction commands (no reinstall)

From a newly authorized Windows PowerShell session, first assign the three variables in §2, then run tests **serially**, not in parallel:

\`\`\`powershell
# Lightweight live-site capture (100 MiB emergency monitor)
& "$RUNTIME\pnpm-runtime\node_modules\.bin\pnpm.cmd" exec playwright test tests/x11-gladeye-live-bounded.test.ts --workers=1 --reporter=line --timeout=115000

# Extended static/short capture, only if another comparison sample is needed
& "$RUNTIME\pnpm-runtime\node_modules\.bin\pnpm.cmd" exec playwright test tests/x11-gladeye-extended-plugins.test.ts --workers=1 --reporter=line --timeout=180000

# Small, isolated proof the ArchiveBox recorder remains live while CaptureEngine is PAUSED:
& "$RUNTIME\pnpm-runtime\node_modules\.bin\pnpm.cmd" exec playwright test tests/x11-archivebox-pause-recorder-acceptance.test.ts --workers=1 --reporter=line --timeout=80000

# Main accepted 180-second actual recorder + scene interaction test:
& "$RUNTIME\pnpm-runtime\node_modules\.bin\pnpm.cmd" exec playwright test tests/x11-gladeye-180s-true-recorder.test.ts --workers=1 --reporter=line --timeout=280000

# Offline 20-viewer smoke for the pinned final WACZ:
& "$RUNTIME\pnpm-runtime\node_modules\.bin\pnpm.cmd" exec playwright test tests/x11-gladeye-true180-offline-viewers.test.ts --workers=1 --reporter=line --timeout=170000
\`\`\`

**Important:** The accepted TRUE180 Playwright test pins the local Chrome for Testing path \`C:/Users/Mrn7206/AppData/Local/.../ArchiveBox-X11\` and **automatically creates a NEW UTC run directory**; on a different username/machine adapt the test's \`rt\` to the valid runtime location *after reading it*. Its 180s frame samples are emitted to console, but the \`Pause\` + browser instrumentation + final \`Resume\` method is key. Do not infer a new run succeeded because this old one did. Tests/companion scripts live **locally** in \`$SOURCE\tests\` and \`$SOURCE\scripts\`, not automatically synchronized to GitHub. The record here is a reconstruction guide, not a claim that those full scripts were committed.

### How TRUE180 works internally

1. Launch isolated \`ChromeForTesting-157\` with \`.output/chrome-mv3\` unpacked extension; separate temporary profile, no logged-in account or existing cookies.
2. Open public reference \`https://www.gladeye.com/\` in a browser tab; open extension \`studio.html\` through its service worker origin.
3. Select bounded relevant plugins in studio, configure narrow limits for Browser Behaviors, Infinite Scroll and Embedded Media. Keep shared WARC network recorder primary.
4. Choose the already-open reference tab in studio and click \`Capture tab\`. **Immediately press \`Pause\` while hook runner is active.** This pauses hook sequence but leaves attached \`CaptureRecorder\` alive; the separate ~12s acceptance test proved it.
5. Reload target while attached to record actual navigation. For **0..180 s**, collect timestamped page state and Chrome WebGL status every 15 s; include deliberate pointer left/right/center, wheel forward/backward and drag samples. Temporarily capture JPEG images for visual comparison. At all times sample Windows RAM ~900ms and close *only the owned isolated browser context* if free RAM reaches **<=100 MiB**.
6. Just after ~180s issue one *explicit synthetic* same-origin GET \`/robots.txt\` to prove the WARC recorder has not already closed. **Never classify this probe as newly discovered 3D runtime asset.**
7. Press \`Resume\`; allow real hooks and final archival export to complete. Download \`.wacz\`, compute SHA-256, check \`cap.state\`, WARC response date span, source-host categories, screenshot/DOM/hash/resource records.
8. Stop/close isolated Chrome. Verify RAM, VPN and Remote Desktop Commander process continuity. Distinguish \`PASS_TIMELINE\` from \`PASS_ARCHIVE_TIMESPAN\`.

**Failure mode:** Wrong CSS selector blocked initial multi-plugin test until timeout; fix was using the actual checkbox input rather than assuming aria-label. Browsertrix \`180\` setting **alone** was insufficient; it ended in under one second despite 180s cap. Ordinary browser network \`response\` event counts include initial, reload and third-party exchanges and are not unique-asset counts.

## 5. The actual 48-plugin audit and applicability

Authoritative *local*, complete source-by-source audit:

\`$EVID\02-reviewed-derived\X11-archivebox-js-48-plugin-reference-and-auth-readiness-2026-11-19.json\`

- 48 source/config plugin directories present; **32 selected source categories** (31 user-selectable extras plus mandatory Chrome). 16 excluded as irrelevant/duplicative/specialist for this public home reference.
- Runtime hook results grouped by plugin: **12 distinct plugins with succeeded hook**, 5 plugins reported \`noresults\`/non-success; 15 selected viewers had no independent capture-time hook to prove. 18/20 tested offline views visible; \`networktiming\` and \`media\` not verified. \`noresults\` is often the correct absence of an applicable manifest/feed/modal, not a generic failure.
- Selected specialist views/outputs in this case include: screenshots, rendered DOM, network headers/responses, console, integrity, TLS, DNS, SEO/favicons, scroll, Browsertrix behavior, search index, original/redirect/HTML-link/DOM-link/plain-text/singlefile/accessibility viewers where available. \`search_contents\` indexed 5 documents. Capturing \`sslcerts\` and new screenshots is extra evidence, **not** recovered private GPU source.
- Not applicable to this target: Google Drive share export, Google Docs/Sheets/Slides exporter, Dropbox share export, Git repository checkout, forum/gallery/papers, PDF/OCR, yt-dlp; sources are preserved, not disabled globally. **No Gmail sign-in/API token/OTP/provider activation is necessary for Gladeye**. If another future authorized target is a private Drive/Docs/Dropbox URL, owner must sign in themselves in a separate limited browser context; no credentials transferred to assistant.
- \`Embedded media\` was deliberately configured **not to fetch missing media** during the long expensive run (bounded URL/MB settings). This is **NOT full independent media-downloader acceptance**; already captured existing media from X01/X10 still available as previous evidence.
- Whole-site GPU replay and every plugin's private-account behavior **remain unverified**. No provider-paid usage.

## 6. Deduplication against X01–X10 and dynamic-value analysis

**Local deterministic scripts:**

\`$SOURCE\scripts\x11-compare-all-prior-evidence.mjs\` — reads X01–X10 existing derived JSON and bounded private capture manifests; supports UTF-8 and UTF-16 BOM; recursively indexes prior hashes + URL/path references, parses WARC responses in final WACZ through \`fflate\` + \`warcio\`; uses exact **SHA-256** (content equality), same URL/path, previously observed URLs without bodies, and earlier X11 SHA comparison. Writes one derived *crosswalk*, and writes only selected first-party *non-duplicate* bodies to each run's private \`novel-body-files\` folder. Do not upload those bytes. It reads sources, it does **not** silently create an alternate canonical status log.

\`\`\`powershell
$RUNID='X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z'
$env:DJMRN_X11_RUN_REPORT = Join-Path "$EVID\02-reviewed-derived" "$RUNID-true180-recording-and-scene.json"
node scripts/x11-compare-all-prior-evidence.mjs
Remove-Item Env:DJMRN_X11_RUN_REPORT
\`\`\`

The final crosswalk is:

\`$EVID\02-reviewed-derived\X11-ARCHIVEBOX-TRUE180-2026-11-19T11-06-37-431Z-X01-X10-dedupe-crosswalk.json\`

Verified **60 prior metadata/manifest files parsed, 0 errors**, 1,531 prior distinct SHA observations (from all applicable indexed entries), 108 known URL+hash references. Final WARC had 54 response records: **49 first party**, 5 third party. First-party outcomes after semantic-classification correction:

| Comparison category | Count | Meaning |
|---|---:|---|
| Exact prior byte hash match | **45** | Reuse prior evidence; no additional separate body copy. |
| Same home path with differing bytes | **2** | The home \`/\` HTML / server component response changed; **new 3D behavior unverified**. |
| \`/robots.txt\` first stored body for an earlier known URL | **1** | Explicit end-of-window probe, *not* autonomous 3D discovery. |
| \`/favicon.ico\` new URL+byte hash against available baseline records | **1** | UI icon, not flower model/texture/shader. |

**Two home body diffs:** \`$SOURCE\scripts\x11-analyze-home-deltas.mjs\` compared old private X01-R2 bytes to X11. HTML 35,758 bytes vs 35,758 bytes shared 19,538-B prefix, 10,310-B suffix, ~87% same-position bytes. Other home path response 19,020 vs 18,998 bytes, shared 7,077-B prefix and 4,163-B suffix. **Neither yielded additional recognized static-resource reference paths.** Dynamic page/content bytes are not proof of new GLB/JS/texture. A file-hash-only difference (especially screenshot/DOM) is not proof of novel content.

**Important dedup nuance:** Existing prior raw captures and derived reports sometimes contain URL without body hash. Treat them as \`KNOWN_URL_FIRST_BODY_CAPTURE\` when a new body is received, not \`NEW_URL\`. Earlier analysis initially misclassified \`robots.txt\` as new; corrected evidence is in latest crosswalk. No destructive cleanup; historic run artifacts remain.

## 7. Three-minute screen analysis is NOT equal to new network content

Earlier independently performed 132.92s timeline existed before X11. New X11 observer:

\`X11-ArchiveBoxJS-180S-2026-11-19T10-55-23-638Z\`

captured **13 JPEG states at 0,15,...,180 s**, including mouse movement and wheel/drag. WebGL 2.0 observed; network response-event count reached 100 including reload/third parties, then remained stable through later interactions. ArchiveBox JS *in that early attempt* closed its recorder too early — its WACZ did not itself span 180 s. It is still valid as a **timed visual observer** and should not be mislabeled.

Corrected TRUE180 recorded at least **206.625 seconds of WARC response timestamps**, including deliberately requested \`/robots.txt\` near t=182.06s; 180-second scene-checkpoint loop and later export hooks. Console/screenshot/TLS/index outputs reside in the WACZ.

Visual comparison derived report:

\`$EVID\02-reviewed-derived\X11-temporal-frame-change-visual-qa-2026-11-19.json\`

Using Windows \`System.Drawing.Bitmap\` and **sampled pixels every 12 pixels**, mean RGB absolute difference **>22** used to count changed positions. Across 12 consecutive 15-sec pairs **39.78% mean changed positions**; across 3 minute-spaced TRUE180 pairs **36.61% mean changed positions**. This is strong evidence of continued **visual changes**; it cannot alone assign cause to camera flight, scene geometry, pointer feedback or GPU postprocessing; JPEG compression and browser interaction also affect pixel statistics. Screenshots remain private.

Further local derived files for TRUE180:
- \`$RUNID-true180-recording-and-scene.json\` — time samples, RAM, source/URL types, hook outcomes, late probe and WACZ metrics.
- \`$RUNID-X01-X10-dedupe-crosswalk.json\` — provenance, SHA/path decision per WARC response, private file references.
- \`$RUNID-home-response-delta-analysis.json\` — exact prior-versus-current home response byte comparison.
- \`$RUNID-offline-viewer-smoke.json\` — 18/20 viewer visibility and **zero external HTTP**.
- \`X11-archivebox-js-48-plugin-reference-and-auth-readiness-2026-11-19.json\` — complete per-plugin local source/config/auth audit.

## 8. What is and is not declared DONE

**PASS / practical value:** ArchiveBox JS native Windows build and real live reference capture; WACZ SHA-256 and package integrity; ~180s continuous recorder and scene observations; controlled interactions; X01–X10 metadata/hash crosswalk; nonduplicative private storage; 48 source plugin audit; 18 verified offline views; no paid accounts; return to healthy free RAM, remote/VPN retained. **X11 is complete for its defined archive/extraction capability and can advance to X12.**

**NOT claimed:** Exhaustive enumeration of every server resource / never-triggered UI path; GPU shader command stream or precise camera animation recovery; browser WebGL offline fidelity; all 48 plugin hooks passed; external cloud/private account features tested; no future drift of reference site; publication rights for source assets.

**New-window resume:** Read this document, current \`PROJECT-LOG.md\`, \`EXTRACTION-RUNBOOK.md\` and original source/setup handoff. Verify the final \`WACZ\` path/bytes/hash and current RAM. Prefer **using completed existing X11 data** for X12; rerun 180s only if a specific missing artifact is proven. **NEXT is X12 PinchTab WebGraph**, currently a **candidate replacement** for unavailable/unpublished \`uirip/websnap\`; verify official source/release/Windows CLI, evaluate free/privacy/RAM/overlap vs existing Playwright/CDP/Chrome, and pass a harmless **owned/local SPA fixture** before any safe bounded public reference interactions. PinchTab is a browser control/state tool, **not an offline mirror or GPU shader extractor**. X13 redacted HAR review remains after X12.

## 9. Safeguards / reproducibility warnings

1. Long capture success depends on **Pause immediately after Capture tab; Resume after the 180s observation and late probe**. Merely setting Browsertrix \`BROWSERTRIX_BEHAVIOR_SECONDS\` to 180 does not hold capture active.
2. The local test file(s) are on Windows under the X11 source; GitHub technical narrative is not an automatic backup of complete executable test source. If reproducibility must extend beyond that laptop, migrate reviewed **owner-written** test harness files to the project through a separate audited commit (never import third-party raw captured bodies).
3. Test requires a real running Chrome for Testing and built extension, one browser profile, enough disk storage, working target connection, no personal browser accounts. Use only read-only checks on X01–X10; do not delete or overwrite prior captures.
4. Do not generalize first-party WARC response count to unique 3D assets: duplicates, HTML/RSC, favicons, robots and third-party telemetry have distinct semantics.
5. Never claim the 48-plugin source count equals 48 tested extractors. Preserve \`noresults\`, unverified viewer and media fallback status.
6. Network recorder and sampled DOM/CDP/screenshot are **observation**, not the source authority for the eventual original DJMRN app; build independent licensed assets/design.
