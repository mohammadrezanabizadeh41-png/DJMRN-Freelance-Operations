# DJMRN — X22 Full 90-Second Live GPU Observation and X01–X21 Reconciliation

**Date:** 2026-11-20
**Status:** COMPLETE_SCOPE_QUALIFIED — 87/87 independent checks passed.
**Target:** https://www.gladeye.com/ (public homepage)
**Scope:** One continuous 90.01-second anonymous Chrome session with seven individually captured Spector.js GPU frames. This is NOT a continuous capture of every frame during 90 seconds.

## Scope, tooling and safety

- Reused the already SHA-verified Spector.js 0.9.33 extension and Chrome for Testing 157. No software install, payment, account authentication, persistent Chrome extension permission or production change.
- Continuous public homepage browsing: **90.01 seconds** after WebGL2 scene readiness; wall time **94.95 seconds** including startup and cleanup.
- Seven Spector captures at elapsed t=5.04, 18.07, 32.09, 46.10, 60.10, 74.09, 88.04 seconds. Between checkpoints we moved the pointer and issued two mouse-wheel events. No pages beyond public homepage opened.
- One isolated anonymous temporary browser profile, 100 MiB emergency-stop threshold, minimum free physical RAM **777 MiB**, 0 analysis/observer errors.

## Frame-by-frame GPU results

| Time s | Action | GL commands | Draw calls | Programs | Shader SHA identities | Active Uniform names |
| ---: | --- | ---: | ---: | ---: | ---: | ---: |
| 5.04 | Warm initial | 137 | 16 | 11 | 22 | 62 |
| 18.07 | Pointer left | 138 | 16 | 11 | 22 | 62 |
| 32.09 | Pointer right | 138 | 16 | 11 | 22 | 62 |
| 46.10 | Mouse wheel +450 | 138 | 16 | 11 | 22 | 62 |
| 60.10 | Pointer center | 139 | 16 | 11 | 22 | 62 |
| 74.09 | Mouse wheel +800 | 138 | 16 | 11 | 22 | 62 |
| 88.04 | Pointer reverse | 139 | 16 | 11 | 22 | 62 |

The normalized primitive/program/draw-count signatures were identical in all seven captures: one drawElements POINTS draw with 960000 point indices, another six-index TRIANGLES draw, and fourteen full-screen drawArrays TRIANGLES calls of 3 vertices each. Program IDs 0–10 appeared across all seven samples. Twelve offscreen FBO IDs occurred per frame, cycling between the two stored GPU-framebuffer identity groups, plus a final draw to the default backbuffer.

Every one of the **22 shader source SHA-256 fingerprints** was identical across all seven new captures and matched the existing short X22 capture. **No new shader code** was discovered in this run. No new GPU program or shader was compiled within these seven warm snapshots; their initialization had been captured separately in earlier X22 startup evidence.

## New temporal parameter evidence

Across all seven captures, **96 unique (program ID, Uniform name) pairs** were independently compared: **6 changed**, **90 did not change**. Changed groups:
- Program 0: modelViewMatrix, uContainerPos, uMousePosition, uTime.
- Program 1: uShrinkFactor.
- Program 10: time.

| Elapsed s | uTime | uContainerPos.z | uMousePosition |
| ---: | ---: | ---: | --- |
| 5.04 | 0.8492 | -0.0020 | (0, 0) |
| 18.07 | 14.0035 | -18.1615 | (0.7806, -0.3203) |
| 32.09 | 28.0120 | -39.5499 | (-0.7340, 0.2539) |
| 46.10 | 42.0383 | -61.0376 | (-0.7969, 0.2778) |
| 60.10 | 55.9650 | -82.5396 | (-0.0844, -0.0125) |
| 74.09 | 70.0038 | -103.8974 | (-0.0469, -0.0278) |
| 88.04 | 83.9587 | -125.5093 | (0.7094, 0.4467) |

The measured GPU Uniform uContainerPos is a container position parameter; it is NOT independently verified as the actual camera transform. Earlier X21 also established a distinct glTF/Blender-exported camera animation with a separate 8.291667s duration; do not conflate those two sources.

The sampled uDispersalProgress remained 0 in all seven frames. Sampled uFlowerBloomDistance=24, uLeafGrowDistance=55, bloomStrength=0.5 and bloomRadius approximately 0.2 remained constant. Their constancy in this particular session does not imply permanent immutability in all possible site states. The DOM scrollY was still 0 at sampled times, even after the two wheel events; wheel input did not prove DOM vertical scrolling.

## Comprehensive canonical X01–X21 crosswalk

| Evidence stages | Existing authority | Delta established by new X22 90s pass |
| --- | --- | --- |
| X01–X13 | Historical original body captures, HAR/archives, DOM/scene labels; the X12 thirteen scene names existed in X01 original JS | No new original file/URL |
| X14 | Wappalyzer 13 public technology signatures, Next.js 13.4.19, Three.js r154 | Runtime corroboration |
| X15 | Consolidated path and original-body provenance | Canonical path count remains 78 |
| X16 | 130 DevTools initiator path-pairs | 37/37 observed pairs already known, zero new network pair |
| X17 | Prior source-map inventory and absence of supplied source maps | Runtime shader capture does not imply a released author source-map |
| X18 | Public JS detector and route-candidate scans integrated in X19 authority | No new JS path |
| X19 | 34 SHA-verified original first-party JS bodies / 457 derived modules / canonical 78 paths | 34/34 source hashes reverified; all 62 active Uniform names already present |
| X20 | Earlier 90s browser scan, 52 known paths, 34/34 accepted, semantic and RSC evidence | 46 currently observed paths are a home-scoped subset, all known |
| X21 | 45/45 confirmed factory, renderer, WebGL2 and camera exporter evidence | 90s GPU temporal corroboration |
| Prior X22 | Two 12s/17s short captures and 35/35 acceptance | 22/22 shader hashes and base draw topology unchanged |

Current first-party network observations:
- **47 first-party response events**, **46 unique normalized URLs**, **0 previously unknown URLs**.
- **38 CDP-decoded response bodies hashed**, **38/38 had exact SHA and byte length in the canonical X01–X19 original-body ledger**. **0 newly verified original resource bodies**.
- **37 unique request-initiator relations** observed, **all 37 already among X16's 130 relations**.
- 78 total canonical X01–X19 paths unchanged. This sampling did not re-read all 78 over the wire, nor independently re-execute each historical X01–X21 extraction tool; it reconciled the aggregate canonical lineage and its relevant specialized source/technology/GPU artifacts.

The genuine newly acquired evidence is the time series of six changing program/Uniform pairs, dynamic uContainerPos and mouse input, stable 16-draw rendering architecture, and runtime confirmation over the full 90s window. The site’s unpublished original author source and private backend were not accessed or recovered.

## Local evidence inventory and privacy

On laptop in the DJMRN-Website-Reference-Evidence project:

**Derived analysis:** 02-reviewed-derived/X22-CURRENT/X22-LIVE-90S/
- X22-Full-90s-Spector-GPU-Network-Probe.cjs — owner-authored capture runner.
- X22-90S-SANITIZED-GPU-AND-NETWORK-TIMELINE.json — seven sampled GPU frame metadata, shader SHA hashes, Uniform names, URL/hash evidence. No raw shader source or pixel textures.
- X22-90S-LOCAL-PRIVATE-INDEX.json — local private cross-reference and SHA filenames.
- X22-90s-Independent-X01-X21-Crosswalk.py — owner-authored independent verifier.
- X22-90S-INDEPENDENT-X01-X21-RECONCILIATION.json — **87/87 acceptance** and historical crosswalk.
- This report.

**Private raw data:** 01-private-captures/X22/live-90s/ — seven Spector raw capture JSON files, possibly containing website GLSL text, compiler translations and GPU texture metadata. Keep these on the private laptop; do not bulk-publish them.

The latest independent acceptance status is **COMPLETE_SCOPE_QUALIFIED, 87/87 checks passed**. The public-safe report is now registered in the project GitHub lineage; raw third-party materials remain only on the owner's laptop.
