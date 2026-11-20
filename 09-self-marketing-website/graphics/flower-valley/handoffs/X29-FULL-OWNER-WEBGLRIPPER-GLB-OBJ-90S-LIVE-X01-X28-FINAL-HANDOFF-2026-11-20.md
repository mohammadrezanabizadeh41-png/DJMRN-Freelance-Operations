# DJMRN — X29 FINAL: WebGLRipper 1.3.2 geometry-recovery boundaries; REAL owner fixture, 90-second live read-only, X01–X28 reconciliation

**Date:** 2026-11-20 UTC  
**Status:** **COMPLETE_SCOPE_QUALIFIED — 88/88 independent acceptance checks PASS**  
**Authority:** GitHub contains owner source/reviewed derived data and official runbook; PC contains original owner GLB/OBJ/ZIP, full private screenshots and browser evidence; original commercial site geometry is NOT exported to this project.

## 1. Verified official tool and installation

- Canonical upstream: [int3re/WebGLRipper](https://github.com/int3re/WebGLRipper), MIT License, official Git HEAD **`7fe32c9616f55f3aa80ace68a4b79d0cb7b5a849`**, **v1.3.2** in Manifest V3, **72 tracked files**. Original official repository cloned on laptop to `%LOCALAPPDATA%\DJMRN-Website-Toolkit\04-Specialists\Sources\WebGLRipper\source-7fe32c9616f5`.
- An older already-installed WebGLRipper extension also declared v1.3.2 but 20/24 installed files were not byte-identical to pinned canonical source; left unchanged. **The proven captures use the pinned official source** in a fresh anonymous isolated Chrome for Testing 157 profile. Broad all-URLs permission never enabled in personal Chrome.
- Existing Chrome for Testing, Puppeteer, Playwright Core 1.65.1, Python 3.14.7 and Git reused. **No paid provider, upgrade, new personal account, or privilege escalation.**
- Official upstream browser suite with installed Chrome 157: i18n test **exit 0**; `node tests/run-chrome.mjs --no-three` **170 passed / 1 failed**; failing WebM turntable recording case disclosed, not hidden. CDN-dependent official three.js test intentionally skipped. This single test failure does **not** imply all upstream feature tests pass; the X29 geometry task was independently verified on original owner inputs.

## 2. REAL original owner-owned WebGL2 fixture and exported geometry

Original owner code: [fixture HTML](../fixtures/X29-OWN-Controlled-WebGL2-Mesh-Points-Instancing-Fixture.html), [real official-extension Chrome runner](../scripts/X29-OWN-Official-WebGLRipper-Real-GLB-OBJ-Runner.cjs), [independent binary decoder](../scripts/X29-Independent-OWN-GLB-OBJ-Geometry-Decoder.py).

Ground truth: **3 distinct WebGL2 draw calls** each render cycle:
1. Four unique vertices, **6 triangle indices = two triangles**, four UV pairs, 2×2 checker Texture.
2. **5 GL_POINTS**.
3. One three-index base triangle drawn with **3 instances** (3 logical triangles).

Actual official WebGLRipper replied `ready`, `1 WebGL context`, `Recording a frame`, `Recorded 2 meshes from 3 draw calls`, `Saved 2 meshes and 1 texture`. Original privately retained ZIP `webglripper_127.0.0.1_20261120-205751.zip`, **3,236 bytes**, SHA256 **`e9364b91483129e7e7c2602a943b302852e665664c24418812c7d4cfc3540662`**, min free memory **2,029 MiB**.

The independent stdlib Python GLB2/OBJ/PNG decoder read **actual ZIP binary** and verified:
- GLB 2.0 valid, 2 meshes, 2 nodes, 2 materials and 1 texture.
- Mesh 0: mode 4 TRIANGLES, **4 positions, 6 indices, 2 triangles, 4 UV pairs, 4 normals**, exact owner source XY bounds `[-.96,-.55]..[-.46,.50]`.
- Mesh 1: TRIANGLES, **3 positions, 3 indices, 1 triangle**; base geometry only.
- OBJ `mesh_000.obj`: 4v/4vt/4vn/2 faces; `mesh_001.obj`: 3v/3vt/3vn/1 face; scene OBJ: 7v/7vt/7vn/3 faces.
- PNG actually decodes header as **2×2 pixels / 79 bytes**.

**Measured extraction boundary:** none of five original **GL_POINTS** survived as glTF POINTS primitive. The real **3-instance** draw became **one uninstanced base triangle**: 2 of 3 copies absent. These are real limitations for *this* owner fixture and tool version, not a claim about every scene. Texture/UV/position triangle recovery succeeded for this simple indexed fixture. No proprietary live site model geometry was exported.

## 3. Newly confirmed 90.01-second live site inspection (READ-ONLY)

The corrected **official WebGLRipper MV3** Chrome157 runner activated on `https://www.gladeye.com/`, after the proxy/desktop connection issue was resolved. It sent only extension `hello`, never WebGLRipper `capture` or `export` command on the commercial site. A WebGL2 instrumentation wrapper observed primitive submission counts; Playwright provided real mouse/scroll actions. Original live observed UTC **2026-11-20 17:53:34.675Z**; observed duration **90.01 sec**; `stopReason=COMPLETED_90_SECONDS`, **zero instrument errors**; 100MiB RAM free hard emergency stop never reached (**minimum 1,244MiB**). The original result, logs and 2 screenshots are persisted on laptop. Browser 1280×720, one WebGL2 canvas, **Three.js r154**, WebGLRipper official `ready` / **1 real context**.

| User input phase (candidate) | Actual observation second | Cumulative draw submissions since instrumentation | Distinct GPU primitive signatures |
| --- | ---: | ---: | ---: |
| Initial baseline | 3.41 | 0 (warm-up; do not invent an early draw) | 0 |
| Hover left | 16.58 | 7,552 | 3 |
| Hover right | 29.59 | 19,760 | 3 |
| Scroll +450 | 42.52 | 31,920 | 3 |
| Pointer center | 55.55 | 44,256 | 3 |
| Scroll -450 | 72.47 | 60,432 | 3 |
| Return idle | 87.58 | 70,672 | 3 |

Every post-warmup phase has the same three distinct GPU draw signatures:
- `drawElements(GL_POINTS, count=960000)`, GL mode 0;
- `drawElements(GL_TRIANGLES, count=6)`, GL mode 4;
- `drawArrays(GL_TRIANGLES, count=3)`, GL mode 4.

These **three distinct signatures are NOT the same thing as three draw calls per frame**: the prior full GPU record X28 independently found **16 draw calls per frame**, comprised of one POINTS indexed draw, one six-index triangles draw and 14 three-vertex triangles draws, with **11 GPU programs, 22 original shader hashes and 62 Uniform names**. X29 monitored cumulative signatures and did not independently derive a reliable frame rate or number of actual flowers. `960000` represents submitted indices, **not 960000 flowers**. Specific visual dispersal/return cause remains **UNVERIFIED**.

## 4. X01–X28 cross-stage provenance

- Canonical X19 resource inventory: **78 previously known first-party network paths**; this new 90s X29 observed **46 of those known paths; ZERO novel paths**.
- X29 retrieved and independently SHA256+byte-size matched **38/38** HTTP response bodies to X19 ORIGINAL HTTP variants (not mirrored/rewritten hash references); **0 new original variants**.
- X16 historical initiator network graph: **37 observed preexisting edges**, **0 new edges**.
- All original local X01–X14 private stage directories and derived X15–X29 folders still present; X23, X24, X28 private captures preserved.
- Existing X27 **49/49** PASS and X28 **58/58** PASS confirmed from original independent acceptance files; X28 dual 90-second Spector/Ispettore baselines and draw signatures consulted.
- Two X29 private screenshots are SHA256 verified, size checked and retained on owner PC only; metadata/hashes published but **no raw screenshot images publicly copied**.
- Official WebGLRipper license and permissions, source pin and binary fixture all verified.

## 5. Independent quality gates

Owner original acceptance source: [X29 standalone X01–X28 geometry/live validator](../scripts/X29-Independent-X01-X28-WebGLRipper-OWN-GLTF-And-Live-90s-Acceptance.py). **88 distinct automated checks, all passed** (PC Python3 exit code 0). Full check names/evidence in [acceptance JSON](../evidence/X29-INDEPENDENT-X01-X28-OWN-GLTF-90S-ACCEPTANCE.json) and [crosswalk JSON](../evidence/X29-SANITIZED-90S-WEBGLRIPPER-GEOMETRY-X01-X28-CROSSWALK.json).

**Known caveats:** a WebM turntable *upstream* test failure, CDN-dependent upstream three.js test not run, WebGLRipper export limitations for POINTS/instancing in this fixture, X29 3.41s initial warm-up count zero, no guaranteed exact causality of visual particle dispersal, no GPU timer/FPS measurement, no attempt to reconstruct copyrighted original scene geometry. No new feature/license charge. Scope-qualified DONE means *geometry recovery boundaries on OWNER fixture + 90s live nonexpressive metadata study*, not “full target scene GLB recovered”.

## 6. Output locations and continuation

Private owner originals:
`C:\Users\Mrn7206\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION\01-private-captures\X29`

Source/reviewed derived owner evidence:
`C:\Users\Mrn7206\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION\02-reviewed-derived\X29-CURRENT`

GitHub code under `09-self-marketing-website/graphics/flower-valley/scripts/X29-*`, owner HTML fixture under `fixtures/`, derived outputs under `evidence/`, this final report under `handoffs/`, with [EXTRACTION-RUNBOOK](../EXTRACTION-RUNBOOK.md) and [Project Log](../../../PROJECT-LOG.md) updated. GitHub published owner-code and derived JSON compared to PC byte-exact via downloadable raw GitHub responses; manifest records hashes.

**Next scope: X30 separate independent comparison on the same OWN controlled fixture.** It is not part of X29; do not transfer site vendor assets into it.
