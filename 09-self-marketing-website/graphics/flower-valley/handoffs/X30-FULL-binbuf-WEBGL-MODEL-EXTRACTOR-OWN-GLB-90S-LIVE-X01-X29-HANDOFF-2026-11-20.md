# DJMRN X30 — Final independent WebGL geometry fidelity and public 90s observation

**Date:** 2026-11-20. **Status: COMPLETE_SCOPE_QUALIFIED, 96/96 independent checks PASS.** **X31 next, not started.**

## 1. Source, setup, licensing, costs and security

Official upstream: https://github.com/binbuf/webgl-model-extractor — MIT, Chrome Manifest V3, package version 0.7.0. The built extension is named "WebGL Ripper", but it is a SEPARATE repository and implementation from X29's int3re/WebGLRipper 1.3.2. GitHub HEAD observed 2026-11-20: 458c5890b85c9fccf193e6f72e9ab15914196d3f. A previously extracted source snapshot already existed on PC under %LOCALAPPDATA%/DJMRN-Website-Toolkit/04-Specialists/Sources/WebGLModelExtractor/webgl-model-extractor-main with dist/chrome build, node_modules and local gltf-validator. No reinstall, npm download, paid tools or credit consumption. Five representative source files (README, package, build, main entry, official driver) were verified Git-Blob-byte-exact against live GitHub; original snapshot has no .git directory, so an entire-tree pinned commit match is NOT claimed.

Source-native PC tests: node --test test/unit.test.mjs = **54 pass / 54 tests / 0 fail / 0 skipped**, actual exit 0. The upstream Playwright browser test suite was not repeated because its own Chromium build was unavailable; instead the previously installed Chrome for Testing 157 was used for an original, real owner-fixture browser export. Official MV3 extension requests all-URLs host access, storage, context menus and activeTab; only the isolated disposable Chrome profile loaded it. No user personal-Chrome permissions, WinINET registry, account setting, billing or provider entitlement changed.

## 2. Real OWNER WebGL2 fixture export; X29 versus X30

Reused original unchanged DJMRN X29 fixture with 3 WebGL2 submissions: four-position indexed quad (6 indices = 2 triangles; four UV pairs; 2x2 own texture), five GL_POINTS, and a triangle drawn via drawElementsInstanced with 3 instances. Official binbuf MV3 extension was activated only on this locally hosted OWNER synthetic fixture, reported one hooked WebGL2 context, advanced through official capture stages to done with 0 errors, and actually saved an OWNER-ORIGINAL .glb file (2,192 bytes, SHA256 8011f38f77a9f0eaec9c20f3facd1b6ce7cb7821612df64a6c8c21cd19ed4fcc). Minimum free RAM 2,538 MiB.

The independently decoded X30 GLB2 has 2 meshes, 2 nodes, 1 scene, 1 material, 1 texture/image, 2 TRIANGLES primitives. The quad has EXACT 4 positions, 6 indices, 2 triangles, 4 UV pairs and same original bounds; the base instanced triangle has 3 positions, 3 indices, 1 triangle and 3 UV pairs. **Five original GL_POINTS were absent from output; three instances were reduced to one base copy; no NORMAL attribute survived.** X29's independently decoded owner GLB also had 2 triangle meshes, 2 nodes, one texture and omitted points and two instances, but retained 7 normals. The README claim of instancing expansion was therefore NOT reproduced on this fixture. Do not extrapolate a single tested fixture's limitation to all scenes. Capture GLB size is not an accuracy metric.

A separate installed Khronos glTF validator examined BOTH real owner-generated original binaries: **X29 0 errors / 0 warnings; X30 0 errors / 0 warnings**. glTF format validity does not prove correct geometry/instance semantics. The X29 owner's original ZIP (3,236 bytes) remains unchanged.

## 3. Real fresh public site investigation: 90.00 seconds

Two earlier attempts with the extension hooked failed to see a ready WebGL2 context in the initial 15s and extended 65s startup windows; both failure reports remain preserved. A controlled A/B using anonymous Chrome with and without the MV3 extension showed public-site Next.js JS subresources stalled in BOTH cases, so no extension blame was inferred. Local WinINET was enabled for proxy 127.0.0.1:20809. We did NOT edit/disable system or VPN settings. We tested a CHROME-ISOLATED ONLY --no-proxy-server launch argument. The official MV3 extension + website then loaded one WebGL2 Canvas and Three.js r154 with one hooked extension context, no page errors. That is an observed fix in a disposable test browser only.

A NEW 90.00-second clock was started AFTER the target fully loaded; only then the X30 read-only live observer ran. During this window we did not invoke the model-extractor capture action on commercial Gladeye or export any site proprietary GLB, OBJ, GL shaders or textures. Seven 1280x720 phase-input windows were observed (real browser mouse move/scroll):
- Initial at 3.41s: 0 accumulated draw submissions (warm-up, not fabricated);
- Hover left at 16.55s: 5,008 cumulative draw submissions;
- Hover right at 29.59s: 15,456;
- Scroll down at 42.46s: 26,496;
- Pointer center at 55.53s: 38,176;
- Scroll up at 72.46s: 53,152;
- Return idle at 87.54s: 66,928.

Six post-warmup frames shared three DISTINCT WebGL draw primitive signatures: drawElements POINTS mode 0 index count 960000; drawElements TRIANGLES mode 4 index count 6; drawArrays TRIANGLES mode 4 count 3. **Three different signatures DO NOT mean three draw calls per frame**; X28 full per-frame Spector/Ispettore capture proved 16 draw calls, 11 programs and 22 original shader hashes. The 960000 count is submitted point indices, NOT a validated flower count. Hover/dispersal/return label inputs are observations; causal original proprietary algorithms remain unverified.

**Live result: 90.00 seconds, 7 actual snapshots, 0 runner errors, minimum RAM free 1433MiB (user hard stop 100MiB).** Independent original first-party site body provenance: 46 previously known paths out of X19's canonical 78, 37/37 actual source HTTP-body SHA256+bytes exact to X19, 37 known X16 initiator network edges, ZERO new path/edge. X29 had 38/38 observed hashes; X30's 37/37 is one fewer observed body, NOT a mismatch. Both original site screenshots are PRIVATE on PC with independently matched SHA256 and dimensions. No unlicensed vendor raw model/texture/shader export.

## 4. Independent acceptance and historical continuity

Owner Python acceptance script executed with **96 of 96 distinct checks PASS, exit 0**. Validated official selected source exact blobs, version/license/security, official 54 unit tests and log hash, real browser original owner GLB SHA and decoded accessors, point/instance/normal loss, Khronos validator, true new 90-second site timings, 3 draw signatures and X28's 16 draw/frame authority, X19/X16 historic network SHA/edge provenance, screenshot hashes, original stage dirs X01–X30, previous X27 49/49, X28 58/58, X29 88/88, X29 owner ZIP and prior PC/Git manifest continuity, no vendor asset export and no paid tool usage.

Private X30 owner GLB and private live screenshots: C:\Users\Mrn7206\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION\01-private-captures\X30

X30 own scripts, derived numeric evidence, source preflight, official tests receipt and this handoff: C:\Users\Mrn7206\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION\02-reviewed-derived\X30-CURRENT

Primary evidence filenames:
- X30-INDEPENDENT-X01-X29-REAL-OWN-GLB-90S-ACCEPTANCE.json
- X30-SANITIZED-OWN-GLB-POINTS-INSTANCING-X01-X29-90S-CROSSWALK.json
- X30-INDEPENDENT-OWN-GLB-GEOMETRY-TRANSFORM-AND-X29-COMPARISON.json
- X30-OWN-X29-vs-X30-KHRONOS-GLTF-COMPLIANCE.json
- X30-90S-LIVE-READONLY-MODEL-EXTRACTOR-METADATA-X01-X29-TIMELINE.json
- X30-OFFICIAL-binbuf-SOURCE-LICENSE-SECURITY-FREE-PREFLIGHT.json
- X30-LIVE-SITE-EXTENSION-vs-BASELINE-LOAD-DIAGNOSTIC.json
- X30-LIVE-DIRECT-NO-PROXY-EXTENSION-LOAD-DIAGNOSTIC.json

**Definition of X30 DONE:** measured geometry recovery boundaries on the owner synthetic fixture + verified real 90s nonexpressive live study + historically consistent evidence and private/public separation. It does NOT mean full third-party scene geometry recovered. **X31 independent MeshGrab OWN-fixture trial is next and not started.**
