# DJMRN — X23 Rerun (R2): 1 GB Transfer, 100 MiB RAM Stop, Expanded 90s GPU/Scene Extraction

**Date:** 2026-11-20. **Stage:** X23 R2 (earlier X23 R1 and later X24 retained unchanged).
**Status:** COMPLETE_SCOPE_QUALIFIED_RERUN_1GB; **358/358 independent acceptance PASS**.
**Site:** https://www.gladeye.com/ public anonymous homepage.

## Preflight, official source, installation

- Official velvetfrustum/ispettore v0.1.1, Apache-2.0: https://github.com/velvetfrustum/ispettore
- Original local source ZIP SHA256: ca49c6a4f24a3872ef2a24f792f2598374a17591124ece702c56017d9b8973df; 168/168 extracted source files match.
- Original packaged Chrome MV3 manifest field remains 0.1.0 even though release tag v0.1.1; the discrepancy is not rewritten.
- Existing built dist was loaded only into an isolated anonymous Chrome for Testing 157 browser; no permanent install, paid tool, new account or personal-Chrome permission.
- Reran upstream native unit tests: 245 PASS, 0 FAIL. No additional dependencies required.
- User-authorized transfer ceiling **1,000,000,000 bytes per packet**, instead of old X23 20,000,000-byte packet guard; RAM emergency termination at **100 MiB free**.
- In R2, largest GPU raw packet was 2,162,869 B, so no packet hit even the old 20 MB limit; the real expansion is additional captured frames and complete scene snapshots, NOT an unsupported claim that older data was cut off.

## Real-site time and capture coverage

- Live Chrome session completed with **91.27 seconds** after site readiness (90-second target; full last scene snapshot finishes slightly after t=90s); total wall time 95.77 seconds.
- **15 complete separate one-frame GPU captures** at multiple pointer, hover and wheel conditions; **3 complete scene and texture previews** and **3 browser screenshots** saved privately.
- This is 15 GPU frames sampled during a continuous webpage session, **not every frame of a 90-second continuous GPU trace**.
- No runner errors; free RAM floor **807 MiB**, never below user's 100 MiB emergency limit; no GPU raw packet rejected for its size.

| Interaction | t(s) | GL commands | Draws | Programs | GPU blobs |
|---|---:|---:|---:|---:|---:|
| baseline | 7.45 | 137 | 16 | 11 | 2 |
| pointer_high_left | 12.38 | 138 | 16 | 11 | 2 |
| pointer_mid_right | 17.47 | 138 | 16 | 11 | 2 |
| scroll_down_250 | 23.31 | 138 | 16 | 11 | 2 |
| pointer_low_left | 29.20 | 139 | 16 | 11 | 2 |
| scroll_up_300 | 35.30 | 138 | 16 | 11 | 2 |
| pointer_high_right | 41.20 | 139 | 16 | 11 | 2 |
| wheel_450 | 47.22 | 138 | 16 | 11 | 2 |
| pointer_bottom | 52.96 | 142 | 16 | 11 | 3 |
| wheel_reverse | 59.02 | 138 | 16 | 11 | 2 |
| pointer_left | 65.03 | 142 | 16 | 11 | 3 |
| wheel_800 | 71.22 | 138 | 16 | 11 | 2 |
| pointer_right | 77.16 | 139 | 16 | 11 | 2 |
| wheel_up | 83.12 | 138 | 16 | 11 | 2 |
| pointer_reverse | 89.11 | 139 | 16 | 11 | 2 |

Every captured frame has **16 real draws + 14 clear events**, **11 WebGL programs** and **22 shader-source SHA256 values identical to X22 Spector**. All 15 draw mode/count signatures match X22; there are no new original vendor shader SHA identities.

## New GPU semantics recovered by R2

**Offscreen render target transition:** in samples 1–4, three draw slots were annotated EffectComposer.rt2; beginning around **t=29.20s** the corresponding slots used EffectComposer.rt1 in all later frames. All other pass order, real draw primitives/counts and 22 shader hashes remain identical. This is evidence of runtime framebuffer destination switching, not a recovered original author code change.

**Two transient uniform-update samples:** at pointer_bottom t≈52.96s and pointer_left t≈65.03s the GPU command count rose to **142**. Compared with baseline 137, there are **+1 uniformMatrix4fv, +3 uniform1f, +1 uniform2f** updates and **3 small GPU blobs** instead of 2. This adds evidence of changing runtime uniform states, not additional shader source or geometry draws.

## Three complete Ispettore scene/state/texture snapshots

| Moment | Original snapshot size | Nodes | Texture records | GPU programs |
|---|---:|---:|---:|---:|
| baseline | 7,496,189 bytes | 7 | 17 | 11 |
| wheel_450 | 7,394,072 bytes | 7 | 17 | 11 |
| pointer_reverse | 6,931,344 bytes | 7 | 17 | 11 |

- Every snapshot shows **7 Three.js scene nodes**, including Scene, Object3D, PerspectiveCamera, Points and Mesh; a separate composer camera is annotated as **OrthographicCamera**.
- **17 GPU texture records**, each with both preview and full preview, no preview errors; **one WebGLRenderer**, **11 programs** and one known camera-path07.glb model record (10,132 bytes, previously indexed).
- Texture dimensions across 17 records: 1x1, 1280x720, 1500x1312, 1500x1312, 125x88, 640x360, 640x360, 640x360, 320x180, 320x180, 160x90, 160x90, 80x45, 80x45, 40x23, 40x23, 1280x720. Some repeated sizes correspond to distinct GPU targets; they are NOT independently downloaded website HTTP assets.
- All 3 complete raw scene JSON packets and 3 PNG screenshot artifacts are kept on owner laptop with exact SHA256, and never uploaded as original third-party graphics assets.

## X01–X22 and original website data reconciliation

- The canonical **X01–X19 78-path original URL+SHA ledger** remains the single authority (72 network-observed plus 6 offline-derived). No new original URL or vendor source body was verified in R2.
- Public homepage network had 46 known original site paths and **36/36 response body SHA+byte-length repeats** from this R2 run. Earlier X23 R1 observed 38; do not extrapolate 36 as full network coverage.
- **37/37 network initiator relationships** already occur in X16's canonical graph; 34/34 original JS files in X19 were rehashed and unchanged.
- Historic X21 45/45 and X22 87/87 acceptance, and the original X23 R1 114/114, remain intact.
- The same 22/22 shader hashes and 16/16 draw mode/count signatures were validated against authoritative X22 original Spector raw capture for all 15 independently captured R2 frames.
- Ispettore's Three.js scene labeling on the site's r154 runtime is best effort (newer r184 has upstream regression tests). Hardware GPU duration and FPS cannot be inferred from CPU issue times.

## Local authoritative raw files, privacy, reproduction, GitHub publication

Local project: Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261118-NEW-EXTRACTION.
New private directory: 01-private-captures/X23/rerun-1gb-2026-11-20, containing **15 original GPU JSON packets, 3 complete scene-and-texture original JSON snapshots and 3 private PNG screenshot files**.
New derived directory: 02-reviewed-derived/X23-CURRENT/X23-RERUN-1GB-2026-11-20, containing full original owner-authored runner code, acceptance generator, report builder, sanitized data, 358/358 acceptance, source/tool receipt and publication manifest.
Public GitHub paths in the same flower-valley/ tree contain ONLY owner-authored scripts, hashes, deterministic derived metadata and this handoff. **NO original GLSL text, raw Ispettore GPU packet, texture pixel previews or screenshot image bytes are published**.
Existing X23 R1 stage record is preserved as historical evidence; X23 R2 adds an explicitly dated addendum. Later X24 record remains unchanged; X25 remains next.

**Scoped completion: 358 of 358 independently verified conditions; complete within the demonstrated 15-frame/three-scene sample, not exhaustive every possible website scene, animation state or backend.**
