# DJMRN X36 FINAL — ScreenToGif genuine native screen ROI clip, exact frame timings, real 90s public-site comparison, X01–X35 continuity

**Date:** 2026-11-21 local PC. **Scope:** X36 / E3–E4, [sequential Extraction Runbook](../EXTRACTION-RUNBOOK.md).
**Status:** **COMPLETE_SCOPE_QUALIFIED; 323/323 independent QA PASS**, no new public/production website writes. **X37 NEXT**.

## 1. Mission, official tool and truthful blocker recovery

X36 calls for a **human-visible region/ROI actual Windows screen capture separate from Playwright screenshot automation**, timecodes/resolution/FPS, and explicit comparison to X35 screenshot sequence. It does NOT claim original code, geometry, actual camera matrices or proof of input-caused movement.

Official [NickeManarin/ScreenToGif](https://github.com/NickeManarin/ScreenToGif) [v2.43.2 release](https://github.com/NickeManarin/ScreenToGif/releases/tag/2.43.2) portable x64 and [official command-line startup parameters](https://github.com/NickeManarin/ScreenToGif/wiki/Startup-parameters):
- Previously installed **Light.Portable.x64.zip** `5,296,103 bytes`, official SHA256 `455999ae2672728ee7da6438896207193e7586ad7370000f0e2cdbdc8df822a2`. It raised actual system warning **.NET Desktop Runtime missing**; `dotnet` not installed. Thus **Light was NOT claimed to be usable**.
- Chose instead official **Full.Portable.x64.zip**, **73,035,883 bytes**, upstream GitHub release SHA256 **`42a0b53d67ecae22698b4881ffb2c9c7a9049663f5fbdd2edb779e1971000664`**, downloaded with interrupted transfer resumed and **verified byte-exact SHA256 before extraction**; extracted only within `%LOCALAPPDATA%\DJMRN-Website-Toolkit\01-Analysis\ScreenToGif-FULL-v2.43.2` (self-contained ~183MB ScreenToGif.exe). No system-wide .NET installation or elevated privilege. Actual executable file version 2.43.2.
- Official supported `-n -o screen -r left,top,width,height -f 6fps -l 00:00:18 -c` CLI was **actually invoked and recorded**, not merely discovered. Preflight 5 seconds produced 25 real original cache frames, later closed.
- No paid services, subscription or credentials. Existing local Chrome for Testing v157, Playwright 1.65.1, Sharp 0.35.5, Python 3.14, and earlier X16/X19 provenance reused. No RenderDoc capture, GPU inspector, vendor code injection, global proxy/VPN or security change.

## 2. Critical false-first-capture detection, rejection and valid retake

**First candidate is explicitly INVALID for website video**, although ScreenToGif itself ran: the native 32-second screen capture launched during the 90s Chrome observation accidentally recorded the **MLM VPN foreground window** instead of the behind-the-scenes Gladeye browser. A real original private frame was inspected and showed VPN, so this was **not accepted as site evidence**, not placed in public GitHub or mixed into the final archive. No VPN app was closed or reconfigured. The test ScreenToGif editor was closed to free memory.

**Corrective capture:** relaunched independent visible Chrome v157, waited until `gladeye.com` and the animated flower scene appeared, explicitly moved this **Chrome** window into the foreground, launched a second actual official ScreenToGif recorder via its documented CLI, and refocused Chrome. Original first/middle/last PNGs from the corrected recording were reviewed privately and each visibly showed Gladeye flowering 3D site. Original corrected frame sequence was **copied and verified in owner-only X36 archive**. The first failed capture remains classified as `REJECTED_FOREGROUND_MISMATCH`, not a successful sample.

**Native corrected ScreenToGif source:** independent actual cache project under `%TEMP%\ScreenToGif\Recording\2026-11-21 01-10-17`; **108 original PNG frames, 108 distinct SHA256 hashes**, all 108 originals persisted under `01-private-captures\X36\SCREEN-TO-GIF-REAL-FRAMES` plus the **actual original project JSON with per-frame delays** (all image bytes PRIVATE; never published). Exactly **875×512 physical pixels** due to Windows display **DPI 120 / 125% scaling** of the configured logical **700×410** region. Note original ROI contains a small left-edge strip of desktop alongside the site; it is **not a clean full-browser export**.

The actual **original ScreenToGif `Project.json` 108 per-frame `Frames[].Delay` entries** (not inferred NTFS write timestamps) give: **sum 17,962 ms / 17.962 sec, median delay 166 ms, min 150 ms, max 184 ms, mean effective FPS 6.0127** (6 fps configured maximum, any near-6 rounding is actual timing accounting). [Native timecode/ROI data](../evidence/X36-ORIGINAL-SCREENTOGIF-NATIVE-108-FRAME-DURATIONS.json). Frame timing is the recording project's durations, not independent vsync/device timestamp measurement.

[Independent native frame importer and SHA archival code](../scripts/X36-Independent-ScreenToGif-Native-Frame-Archive.py) | [native original per-frame provenance](../evidence/X36-ORIGINAL-SCREENTOGIF-REAL-NATIVE-FRAMES-SANITIZED-PROVENANCE.json) | [project duration interpreter](../scripts/X36-Independent-Native-ScreenToGif-Project-Frame-Timings.py).

## 3. Independent consecutive frame differences and comparison with X35

[Native real ScreenToGif frame RGB auditor](../scripts/X36-Independent-Native-ScreenToGif-Frame-Temporal-RGB.cjs) independently decoded all **108 original native screen frames**, rechecked every real PNG SHA256, resized private screen image for analysis to **128×72 RGB**, and computed **107 true consecutive native image differences**:
- **Mean adjacent frame MAE 12.3028**, median **12.236**, 90th percentile **15.5843**, maximum **16.3464**; **107/107 adjacent pairs MAE greater than 1 and 5**, therefore video frames are not static placeholders.
- Previous X35 used **24 sparse Playwright screenshots / 23 consecutive pairs** spanning its own 90-second browser experiment, with a **median screenshot-pair MAE 23.5754** on its separate **192×108** downsampling.
- These image-difference magnitudes **cannot be directly interpreted as better/worse motion or camera acceleration**, because X35 and X36 use different capture positions, image downsample resolutions, time spacing and different site sessions. The meaningful advancement is **108 physically screen-captured frames + 107 temporal pairs and authentic Frame Delay metadata**, compared with X35 sparse screenshots and user-input trace.
- No original source screenshot pixels or native ScreenToGif project file shipped to GitHub.

[Independent RGB/temporal metric evidence](../evidence/X36-INDEPENDENT-NATIVE-FRAME-TEMPORAL-RGB-X35-CROSSWALK.json).

## 4. Separate NEW 90.008-second live website metadata run, comparison X01–X35

[Actual original Playwright/CDP-visible 90s-run source](../scripts/X36-Independent-Visible-Chrome-ScreenToGif-90S-Site-Runner.cjs) opened the real public `https://www.gladeye.com/` with isolated **visible** Chrome 157, instrumented **only aggregate WebGL draw signatures / browser input-event counts / HTTP SHA+size**, and executed **14 scheduled phases** across **90.008 actual seconds**. Read-only public site, no vendor WebGL extraction, RenderDoc injection, frame/texture/shader duplication or calls to external paid APIs.

Observed first-party **46 previously known URL paths, 38/38 exact previous X19 HTTP body SHA256+length**, **37 X16-known initiation edges, 0 new paths or edges**, unchanged known original `/valley/camera-path07.glb` SHA, no runner issues; **minimum free RAM 1083 MiB** while official guard remained **100MiB**. Native ScreenToGif first attempt was made during this run but **invalidated** as the foreground app was VPN. **The valid 17.962-second video was recorded separately afterwards**; the live 90-second instrumentation and real video are **not falsely labeled as a synchronized 90-second video timeline**. Separate browse and retake was necessary to ensure genuine visible provenance and browser foreground.

There were real trusted pointer events and scroll events during the 90-second run; draw calls continued during fixed pointer holds. As in X35 this **only demonstrates continued rendering**, NOT whether the actual Three.js camera responds to that input.

[New public metadata trace](../evidence/X36-NEW-90S-LIVE-PUBLIC-WEBGL-AND-NATIVE-ROI-OBSERVATION.json).

## 5. Authentic independent QA; origin and archive

[Final independent Python auditor](../scripts/X36-Independent-Native-Video-Site-X01-X35-Acceptance.py) reloaded current **real 90-second Chrome trace**, original native ScreenToGif copies and 108 SHA256 matches, 107 temporal data checks, original private project per-frame delays, and X01–X35 local derived-stage presence, including historical acceptance snapshots X27 49/49, X28 58/58, X29 88/88, X30 96/96, X31 121/121, X32 128/128, X33 123/123, X34 143/143 and X35 391/391. **323/323 checks PASS; 0 failures.** No assertion that native recording proves original authored camera motion, exact optical flow or per-frame GPU timing.

Root `%USERPROFILE%\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION`:
- `01-private-captures\X36\SCREEN-TO-GIF-REAL-FRAMES`: **108 original native PNGs** + ScreenToGif original Project.json, all local/private.
- `01-private-captures\X36\PUBLIC-90S-BROWSER`: isolated site browser profile/temporary files private.
- `02-reviewed-derived\X36-CURRENT`: owner-authored source code, numerically sanitized timecode/ROI/frame hashes/image motion summaries, public site 90s hash provenance, independent X01–X35 acceptance, report, byte-identity receipts.

**X36 COMPLETE_SCOPE_QUALIFIED. X37 NEXT:** independently evaluate ShareX portable 22.4.0 (already present) as an alternative Windows capture mechanism; compare window/region provenance, timestamp/frame capture and fidelity to genuine ScreenToGif X36, WITHOUT duplicating capture tools unnecessarily. Follow X38 for FFmpeg normalized frame strips; X40 for tentative optical flow (no exact camera-pose inference).

No new expenses, no persistent background workers, no changed VPN/security settings. Stop the two X36 original test GUI/processes before declaring DONE and re-check RAM.
