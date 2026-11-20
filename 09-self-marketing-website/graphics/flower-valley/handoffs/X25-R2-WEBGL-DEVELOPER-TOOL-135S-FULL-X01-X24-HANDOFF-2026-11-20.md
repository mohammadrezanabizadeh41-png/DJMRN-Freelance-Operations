# DJMRN — X25-R2: WebGL Developer Tool, full 135-second live observer and X01–X24 reconciliation

**Date:** 2026-11-20. **Status:** COMPLETE_SCOPE_QUALIFIED_7_OF_7. **Independent acceptance: 36/36 PASS. X26 NEXT.**

## Official source, installation, activation and security

- Official GitHub: https://github.com/srinivas-86/webgl-developer-tool, source commit cc9317e6e6805beb16968f2cbd19dcbfe0c064e4; version 0.1.0, actual MIT license including original Ben Vanik BSD-3-Clause attribution. No paid API or external service.
- Pinned archive 158,767 bytes, SHA-256 2dfd529dd3c8e4a44ee1f1997adc9bb6deed66f2e73a77c92ca75454b31ccbf5; source extracted under existing local toolkit 04-Specialists/Sources/webgl-developer-tool/source-cc9317e6.
- Node 24.22.1 and npm 11.19.1 already installed; npm ci --ignore-scripts --no-audit --no-fund --maxsockets=2 --prefer-offline completed with 96 packages and exit 0; npm test exit 0 (31 passed/0 failed, 10 suites passed/0 failed per actual output); npm run build:all exit 0.
- Generated built official standalone Embed IIFE and Chrome MV3 extension. Extension requires activeTab/scripting and uses broad all-URL content matching; installed/tested only in isolated anonymous Chrome for Testing 157, not personal Chrome. For accurate pre-context WebGL2 interception, used the official compiled Embed on document-start, rather than activating action icon after original scene context was created.
- Source and runtime role: OBSERVER, not canonical source authority; no change to OS-level security, accounts or billing. Upstream native GPU timer queries are explicitly FUTURE features, and cannot be claimed to measure real GPU execution time.

## Own synthetic WebGL2 fixture

- Owner-created two-pass WebGL2 triangle with real framebuffer + renderbuffer attachment, two Draw commands, a program, two shaders and Uniform values.
- Official tool captured 2/2 real frames; each 14 WebGL calls, 2 Draws, 1 program, 2 shaders, 1 framebuffer, 0 GL errors.
- Initial own fixture test captured two frames but only observed 3.55s against 4s target; timing corrected and independent rerun completed 4.01 seconds PASS. Test output and local private screenshot preserved.

## Public site: two REAL runs, historical shortfall and verified extended closure

- X25 R1 first run observed public https://www.gladeye.com/ for 90.01s: 5/7 captures succeeded; baseline and pointer-left missed because inspector/frame scene had not warmed up. Preserved seven historical metadata and run records in X25-R1-90S-5OF7-HISTORICAL. This is not represented as full success.
- X25 R2 explicitly shifted sampling to t=40,55,70,85,100,115,130 seconds, observation 135s. **7/7 real discrete complete frames; 0 operational errors**. Top-level navigation was HTTP 304 (cache revalidation), while 45 first-party fetched asset paths returned HTTP 200. Native WebGL2 context active and actual 3D canvas running.
- Kept user 100-MiB-free-RAM emergency stop monitored at 500ms intervals. Absolute minimum **970 MiB physical RAM free**; did not reduce GPU capture precision or quality and did not need stricter RAM throttles. Separate Chrome profile and preframe GC only. Existing X01–X24 captures left intact.
- Seven sampled frames do NOT constitute capture of every rendered frame across the 135 seconds.

| Sample | Requested t(s) | Real capture t(s) | GL calls | Draw | Programs | Shaders | Framebuffers | Free RAM after (MiB) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| baseline | 40 | 40.70 | 182 | 16 | 11 | 22 | 13 | 1312 |
| pointer_left | 55 | 55.71 | 182 | 16 | 11 | 22 | 13 | 1309 |
| pointer_right | 70 | 70.69 | 182 | 16 | 11 | 22 | 13 | 1314 |
| wheel_450 | 85 | 85.74 | 183 | 16 | 11 | 22 | 13 | 1306 |
| pointer_center | 100 | 100.69 | 183 | 16 | 11 | 22 | 13 | 1297 |
| wheel_800 | 115 | 115.77 | 183 | 16 | 11 | 22 | 13 | 1307 |
| pointer_reverse | 130 | 130.64 | 183 | 16 | 11 | 22 | 13 | 1306 |

## New X25 data versus X01–X24

- **29 DISTINCT ACTIVE UNIFORM NAMES** across 11 sampled live programs, including values and numerical element types recorded per frame; X24 previously recorded 62 normalized uniform-location names across compiled shader objects. Differences are coverage semantics.
- Repeat-measured original running scene uniforms at 1280x720: bloomStrength ~0.5, luminosityThreshold ~0.4, uNoiseAlpha ~0.02, uNoiseDensityThreshold ~0.33358675, uScreenResolution [1280,720]. Active time uniform progresses 42.15 → 132.16 during R2.
- 13 independently inspected framebuffer resource versions in each frame, with color/depth/stencil attachment property names and framebufferTexture2D/framebufferRenderbuffer call metadata. Useful complementary view of postprocessing passes; no invented pixel data.
- CPU-instrumented GL call timings and call-function frequency histogram per frame captured. They **are not native GPU profiler measurements or valid standalone FPS**.
- Independent X24 agreement, each stable sample: **16 Draw, 11 Programs, 22 Shaders, 13 Framebuffers and 20 Buffers**. X25 reports 16 tracked Texture versions while X24 WebGD wire had 20 actual Texture objects and 11 VAOs: tooling/counting semantics differ, not grounds to discard either observer.
- Instrumented inspector signaled **29 GL errors per frame (28 code 1286 INVALID_FRAMEBUFFER_OPERATION and 1 code 1282 INVALID_OPERATION)**; 7-frame total 203. **Do not attribute these to original site's bugs**: own fixture showed 0, instrumented FBO/mirror state can alter WebGL behavior. This caveat remains unresolved and must not be hidden.
- Original canonical X01–X19 resource index **78 paths** unchanged. X25 observed 45 first-party paths, **0 novel paths**; 26/26 real HTTP source body SHA-256 and byte sizes matched original historical bodies, **0 novel SHA**; 37/37 first-party CDP initiator edges repeated X16, **0 novel edges**. Historical R1 was 46 paths and 38 identical old source-body hashes. No source maps, original authored site repo, new vendor shaders or standalone original site assets recovered.
- Earlier X23 R1 114/114, X23 R2 358/358, X24 R1 66/66 and X24 R2 248/248 preserved. **X25 independent acceptance 36/36 PASS**, based on actual X25 evidence.

## Durable evidence and reproducibility

- Owner-authored live executor: [X25-WebGL-Developer-Tool-90s-Runner.cjs](../scripts/X25-WebGL-Developer-Tool-90s-Runner.cjs). Run from the same local toolkit and reference-evidence layout with Node --expose-gc; --fixture and --live are separate entrypoints.
- Owner-authored two-pass fixture: [X25-OWN-WebGL2-MultiPass-Fixture.html](../scripts/X25-OWN-WebGL2-MultiPass-Fixture.html).
- Deterministic independent cross-stage Python audit: [X25-R2-Independent-X01-X24-Reconciliation.py](../scripts/X25-R2-Independent-X01-X24-Reconciliation.py); on Windows invoked by py -3 because bare python resolved to an unavailable Microsoft Store alias.
- Full seven-frame public DERIVED metadata + actual per-uniform numbers/FBO attachment metadata/call timing: [X25-R2-SANITIZED-7FRAME-X01-X24-CROSSWALK.json](../evidence/X25-R2-SANITIZED-7FRAME-X01-X24-CROSSWALK.json).
- Independent source and measured install receipts: [X25-R2-OFFICIAL-SOURCE-BUILD-AND-SECURITY-PUBLIC.json](../evidence/X25-R2-OFFICIAL-SOURCE-BUILD-AND-SECURITY-PUBLIC.json); [36/36 acceptance](../evidence/X25-R2-INDEPENDENT-ACCEPTANCE.json).
- Individual seven ~59KB per-frame GPU-observer JSON files, full test/build logs, first failed R1 archived run, saved screenshots remain **local only** at relative PC path 02-reviewed-derived/X25-CURRENT. Screenshot images remain local private under 01-private-captures/X25.
- Existing X24 private original site WGDW 960,061,412 bytes and X01–X24 source archives remain in their original PC directories. **No raw vendor GLSL, textures, captures, screenshots, compiled third-party packages or private browse data published in GitHub.**

## Final boundaries and successor

This is a successful 135-second multi-sample **observation stage**, not an extraction of the commercial website's original editable source or continuously every GPU frame. 29 observed GL errors require independently controlled corroboration and may be instrumentation artifacts. No native GPU timer data; performance observations are CPU-side. Tool stays ON_DEMAND, and X26 next is investigation of legacy WebGL Insight/overdraw compatibility without browser downgrade.

**Final X25-R2: source/license verified, fixture 2/2, live 7/7, 36/36 checks, minimum free RAM 970 MiB, canonical X01–X24 preserved.**