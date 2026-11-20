# DJMRN — X23 Independent Ispettore 90-Second GPU Audit and X01–X22 Crosswalk

**Date:** 2026-11-20
**Status:** COMPLETE_SCOPE_QUALIFIED — 114/114 independent acceptance checks PASS
**Reference:** https://www.gladeye.com/ (public anonymous homepage only)
**Next stage:** X24 (NOT STARTED).

## 1. Official source, existing install, environment, and tests

The official upstream is [velvetfrustum/ispettore](https://github.com/velvetfrustum/ispettore), Apache-2.0, release v0.1.1 from October 13, 2026. The owner's prior source archive was already downloaded and extracted. Its SHA-256 is **ca49c6a4f24a3872ef2a24f792f2598374a17591124ece702c56017d9b8973df**; **all 168 of 168 files matched** the extracted source folder. No extra software, npm packages, payment, API account, or upgrade was needed.

Source and built Chrome extension: AppData/Local/DJMRN-Website-Toolkit/04-Specialists/Sources/Ispettore/ispettore-0.1.1/ and its dist folder. **Release-version caveat:** the release source is tagged **v0.1.1**, but the original packaged MV3 manifest version field says **0.1.0**. We did not alter this upstream metadata. Browser integration: Chrome for Testing 157 with a disposable isolated anonymous profile only. The upstream extension requests activeTab, downloads, scripting, sidePanel, storage, and broad HTTP(S)/file host matches, but none were granted permanently to the personal Chrome profile.

The existing source's **npm run test:unit** completed with **245 PASS / 0 FAIL**. A genuine owner-original WebGL2 loopback triangle was first captured using the extension's page API: one frame, **7 WebGL commands**, 2 events, no errors, and a positively observed extension service worker. The subsequent live-site capture worked directly via the early-injected Ispettore page API. The live session's service-worker target was not visible in its one startup sample (MV3 worker lifetime may be intermittent), so we base activation claims on the actual successful seven WebGL frame packages, not that target state.

## 2. User-requested full 90-second real-site session

The main public homepage remained continuously open for **90.01 seconds** after readiness, with **seven discrete Ispettore GPU frame snapshots** after deliberate pointer/wheel interactions. Total execution wall time was **95.58 seconds** including initial load and cleanup. No authenticated access, hidden backend, private data, production change or paid capability was used. Owner's free-RAM emergency stop threshold remained 100 MiB; minimum free RAM was **719 MiB**.

| Elapsed sec | Interaction | GL commands | Draw calls | GPU programs | GPU events | Private preview blobs |
| ---: | --- | ---: | ---: | ---: | ---: | ---: |
| 7.26 | Baseline | 137 | 16 | 11 | 30 | 2 |
| 20.09 | Pointer left | 138 | 16 | 11 | 30 | 2 |
| 34.22 | Pointer right | 138 | 16 | 11 | 30 | 2 |
| 48.14 | Wheel +450 | 138 | 16 | 11 | 30 | 2 |
| 62.06 | Pointer center | 139 | 16 | 11 | 30 | 2 |
| 76.12 | Wheel +800 | 138 | 16 | 11 | 30 | 2 |
| 89.10 | Pointer reverse | 139 | 16 | 11 | 30 | 2 |

Each frame contains **16 draw events + 14 clear events**, 11 WebGL programs, and **22 unique GPU shader sources** (11 vertex / 11 fragment) whose source SHA-256 fingerprints exactly match all 22 previously captured X22 Spector.js shaders. No GPU commands reported failure. No actual GPU hardware duration was available; instrumented CPU command times must NOT be reported as native FPS/frame render timings. The 90-second observation consists of seven captured single frames inside a continuous page session, not nonstop tracing of every GPU frame for 90 seconds.

## 3. New complementary semantic and scene data

Ispettore independently reports the live browser scene as one **Points** draw and fifteen **Mesh** draws; all sixteen were associated with Three.js **ShaderMaterial**. The first one uses drawElements in POINTS mode with **960,000 indices**, not verified as 960,000 separate flowers. A secondary layer is a PlaneGeometry mesh. Other passes use full-screen triangular Mesh geometry.

The following **named render steps** occur in the observed draw pipeline:

- EffectComposer (scene / offscreen composition)
- UnrealBloomPass.bright (luminance threshold)
- UnrealBloomPass.h0, v0; h1, v1; h2, v2; h3, v3; h4, v4 (five horizontal and five vertical blur steps)
- Bloom (combine)
- Later EffectComposer and final Canvas output

There are **15 distinct semantic step names** in the 16 actual draw events, including a repeated EffectComposer step. These are direct Ispettore runtime annotations and constitute *new derived semantic metadata*, not newly downloaded original graphics project source. Ispettore's tested target is Three.js r184; the Gladeye browser reports r154 and is a documented **best-effort** adapter range. This does not change the independent confirmation of underlying GL commands, shader hashes and render passes.

### Precise independent comparison with X22

**All seven Ispettore WebGL command-count samples equal X22 Spector.js corresponding command counts:** 137 / 138 / 138 / 138 / 139 / 138 / 139. All **16 primitive/count draw signatures** match per frame. The exact **22 shader-source SHA-256 values** independently match Spector's previous first/steady captures. Both observe 11 active program records; program object IDs are local to each inspector and should not be compared literally across different extensions.

This complements X22's uniform-level evidence: active bloom threshold, blur, bloom composition, scene particle uniforms, time/mouse and final noise. The new data from X23 is semantic object/material/pass grouping, 30 event types per sampled frame, and two independently baked GPU preview blob records per frame. The previews and original shader source remain PRIVATE locally.

## 4. X01–X22 cross-stage and original bytes reconciliation

The **one canonical original site resource authority remains X01–X19 78-path URL+SHA ledger**, with **72 actual first-party network-observed paths and 6 offline-derived-only paths**. X23 did **not** add a new original HTTP path/body or source map.

- Earlier X01–X13 supplied raw website captures, GLB metadata, DOM/scene labels and their baseline.
- X14–X15 supplied 13 public stack fingerprints and original-body deduplication.
- X16 supplied 130 path-to-script initiator relations; **all 37/37 observed X23 live relations** were previously known.
- X17–X18 included source map and public script scans; no private authoring source was recovered here.
- X19 supplied 34 independent original JS bodies (all **34 SHA-verified again**); 457 derived module views are not new originals.
- X20 supplied CDP/AST/REA browser semantics; no new website file downloaded here.
- X21 previously passed 45/45 stack/factory checks, with Next.js 13.4.19, Three.js r154, WebGL2 and a previously known Blender-exported camera GLB.
- X22 previously passed 87/87 full 90-second Spector acceptance. New X23 compares every captured frame's actual primitive/count and per-shader SHA against X22, not merely summaries.

This X23 page observed **47 first-party HTTP response events**, **46 known paths**, **38 exact previously validated response body SHA+byte-length matches** and **37 previously known network initiator pairs**. New original paths = **0**, new original body hashes = **0**, new GPU shader-source identities = **0**, new initiator pairs = **0**. No source-authority duplicate ledger should be created.

**Evidence classification:** NEW_DERIVED_GPU_SEMANTIC_METADATA for Ispettore object/material/EffectComposer/UnrealBloomPass step labels and event/readback summaries; CORROBORATED for actual 16-draw/11-program/22-identical-shader topology; REPEATED for network URLs and raw body SHA; UNKNOWN for the unpublished author project, physical GPU benchmark, exhaustiveness beyond the homepage and every interaction state.

## 5. Files, privacy and acceptance

**Laptop root:** Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261118-NEW-EXTRACTION.

**Private original Ispettore data:** 01-private-captures/X23 contains one own WebGL fixture GPU packet and seven third-party raw GPU frame JSON packets under live-90s. Each live raw packet is about 1.55–2.04 MB and may contain original GLSL, shader translations and baked GPU graphics. None should be uploaded to a public repository. Original official test output is also private.

**Owner-derived public-safe data:** 02-reviewed-derived/X23-CURRENT and its X23-LIVE-90S subdirectory contain runnable X23 fixture and 90s Chrome probes, official source/install/test metadata, sanitized seven-frame GPU timelines, the independent cross-stage reconciliation, a full 114/114 check ledger, and this handoff.

GitHub destination is the SAME active DJMRN-Freelance-Operations website project and its existing graphics/flower-valley/handoffs, evidence and scripts folders, plus the single established EXTRACTION-RUNBOOK and website PROJECT-LOG current stage records. The SHA publication manifest records original laptop SHA-256, published UTF-8 SHA-256 and Git object identity and isolates metadata novelty from legacy source fingerprints.

**Stage completion:** COMPLETE_SCOPE_QUALIFIED, 114/114 checks PASS; source installer integrity 168/168; upstream unit tests 245/245 PASS; real 90.01-second public browser observation 7/7; independent Spector.js GPU comparison 7/7. X24 next, not started. No claim to recover the private authored original website.
