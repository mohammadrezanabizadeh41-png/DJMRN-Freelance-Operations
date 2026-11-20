# DJMRN — X34 FINAL: verified camera/animation glTF, owner 3D GPU viewer, new real 90s public timeline, X01–X33

**Local date:** 2026-11-21 (observations UTC 2026-11-20). **Status:** COMPLETE_SCOPE_QUALIFIED. **143/143 independent acceptance checks PASS.** Original public-site binary and raw animation keyframes have not been published. 

## 1. Formal mission and tool selection

Existing [sequential extraction runbook](../EXTRACTION-RUNBOOK.md) defines **X34 / E3** as: inspect publicly reachable camera/animation metadata, independent glTF validity and original/owned/authorized scene structure. **Never treat the known reference camera GLB as the flower mesh.** X35 is a distinct controlled interaction causality experiment.

Official reusable local stack **already existed on Windows** (NO install/account/API/payment necessary):
- [donmccurdy/glTF-Transform](https://github.com/donmccurdy/glTF-Transform) **4.5.1** (MIT), [upstream v4.5.1 tag](https://github.com/donmccurdy/glTF-Transform/releases/tag/v4.5.1), locally present NodeIO, core and CLI.
- [Khronos glTF-Validator](https://github.com/KhronosGroup/glTF-Validator), local package **2.0.0-dev.3.10** (Apache-2.0), genuine `validateBytes` run on 3 actual GLBs.
- [mrdoob/three.js](https://github.com/mrdoob/three.js) **0.187.0 / r187** (MIT), local `GLTFLoader` and `AnimationMixer`, driven in isolated Chrome-for-Testing 157 / AMD Radeon Vega 8 D3D11 hardware.
- Native Chrome DevTools Protocol/Playwright as already deployed for public URL performance-only network/timeline comparisons.

**No new glTF Viewer extension, program installer, Blender plugin, VS Code extension or global configuration was needed.** Instead the existing Three.js GLTFLoader provides an independently verified real local visual preview. No system VPN/proxy registry or GPU sandbox changes.

## 2. Actual historic publicly served camera GLB: provenance and structural limit

Reference `https://www.gladeye.com/valley/camera-path07.glb`, previously recorded in X01 private evidence; X34 independently re-read **the existing private original 10,132-byte GLB**. SHA256: `dab4459358d8d22ec633152119ec9939947336a0f116c7aca746407403630d4e`. Original Blender-export metadata: `Khronos glTF Blender I/O v3.2.43`, glTF **2.0**, one scene, one node, one **Perspective** camera, **zero meshes**, no flower geometry, zero textures, zero materials. Source binary is not uploaded or redistributed.

Camera metadata (independently decoded in X34, comparable with [existing independent GitHub camera metadata](../../../design/home/fernhollow-camera-path-metadata.json)):
- **Y FOV 0.399596484 radians / about 22.895 degrees**, aspect ratio `1.7777777778` (16:9), `znear≈0.1`, `zfar=1000`;
- exactly one animation containing **three separate channels**: `translation` as `VEC3`, `rotation` as `VEC4` quaternion and `scale` as `VEC3`, all **LINEAR** per glTF sampler;
- **200 keyframes**, time span **8.2916667s**, **24 samples/sec**; samples approximately `0.0416667` seconds apart (Float32 rounding). The scale samples are all identity `[1,1,1]`;
- binary geometry model is empty: the GLB is **a camera-animation resource, not a recovered flower scene**;
- **Khronos Validator: 0 errors, 0 warnings**, physical private GLB parse and glTF Transform NodeIO decode verified.

This proves the GLB's baked sampler interpolation, **not** live Three.js runtime binding, playhead speed, additional temporal easing/lerp, mouse influence, scroll mapping or actual screen-to-camera causality. These remain **UNVERIFIED** until the strictly controlled experiments in X35.

No vendor raw animation arrays, original mesh, private URLs, proprietary shaders or textures are published.

## 3. Independent authored owner animation and authentic WebGL2 visual test

[Original authored JS source](../scripts/X34-Original-OwnCamera-GLTFTransform-Khronos-And-PublicReference-Structural-Analysis.cjs) created new DJMRN **original** camera motion with 200 independent samples @24 Hz and three LINEAR translation/rotation/scale channels (NOT a copy of vendor motion). Output original owner GLB **10,140 bytes**, SHA256 `7e0785ef3c938fb0631eab9b00274aa18db4b695dbe0b21da778ed509b8bcd29`. **Khronos Validator 0 errors and 0 warnings.**

X31 original owner indexed grid MeshGrab GLB **22,940 bytes**, SHA256 `c69bd5f61c6d02c320d83439f0f9058b64b7e9a99970ef2aa571ecd918f37b30`; 512 vertices, 2,790 indices, 930 triangles, **zero camera and zero animation**. Independent validation **0 errors, 0 warnings**, one informational `UNUSED_OBJECT` UV only.

Native official `gltf-transform inspect` CLI on **both original owner GLBs** returned **exit 0**, transcripts private on owner PC.

[Local original Three.js viewer HTML](../scripts/X34-OWN-GltfLoader-AnimationMixer-Viewer.html) was served only on local `127.0.0.1` by [dedicated owner GPU test source](../scripts/X34-ThreeJS-OWN-Camera-Animation-and-X31-GLB-Viewer-GPU-Test.cjs). Chrome WebGL showed hardware **ANGLE AMD Radeon(TM) Vega 8 Graphics ... Direct3D11**, actual GLTFLoader parsed both own GLBs, one real animation clip with three tracks, and `AnimationMixer.update(2.5)` moved the animated camera. Two actual **owner-only private PNG** screenshots before and after had different SHA256 hashes. The original owner GLBs and screenshots remain in the private PC capture folder. Browser test **PASS**, no reported error, min free RAM **1958 MiB**.

[Independent structural/tool validation metadata](../evidence/X34-GLTF-TRANSFORM-KHRONOS-OWNER-ANIMATION-CAMERA-AND-PRIVATE-REFERENCE-STRUCTURE.json) | [Real owner GPU viewer results](../evidence/X34-OWN-THREEJS-GLTFLOADER-ANIMATIONMIXER-LOCAL-GPU-VIEWER-RESULT.json).

## 4. NEW 90.01 actual seconds on current public Gladeye site

An isolated Chrome157 observed `https://www.gladeye.com/` for **90.01 actual seconds** after live WebGL2/Three r154 readiness. It performed seven tracked mouse/scroll positions without RenderDoc/native GPU hooks; it neither saved vendor original raw GLB/GLSL nor published any vendor asset. No global VPN/system proxy changes; isolated browser alone used `--no-proxy-server`.

| Real phase | Actual seconds | Cumulative WebGL draw submissions |
| --- | ---: | ---: |
| initial | 3.43 | 0 |
| hover left | 18.42 | 432 |
| hover right | 29.58 | 10,800 |
| scroll +450 | 42.46 | 23,008 |
| pointer center | 55.54 | 35,520 |
| reverse scroll | 72.48 | 51,648 |
| return idle | 87.54 | 66,032 |

**New direct live camera provenance**: Chrome resource timing recorded `/valley/camera-path07.glb` in the later 6 phases, `decodedBodySize=10132`, `encodedBodySize=6288`, `transferSize=6588`. More importantly, independent live HTTP response SHA256+bytes for that resource were **identical to the original X01 archived private GLB**, as well as its historical X19 SHA/size body record: `dab4459358d8d22ec633152119ec9939947336a0f116c7aca746407403630d4e`. Thus the currently served reference **binary is unchanged** from the original captured source, not merely the same filename.

CSS/Web Animations API `document.getAnimations().length`: 7 at initial phase; 42 in each of the later six phases. **These are CSS/WAAPI animation counts, NOT decoded WebGL camera keyframes nor proof that mouse/scroll caused the GPU state.**

X01–X33 crosswalk: **46 already-known first-party URL paths, 38/38 observed response bodies exact previous SHA256+size, 37 prior X16 network-initiation edges, zero newly observed paths/edges**, no runner errors, min free RAM **1108 MiB**; user 100MiB emergency guard never triggered. Recorded three known primitive signatures; 960000 POINTS indices are **not verified flower count**.

[New X34 live 90s public read-only camera/HTTP evidence](../evidence/X34-90S-LIVE-CAMERA-RESOURCE-PUBLIC-READONLY-X01-X33-TIMELINE.json) | [Reproducible passive runner](../scripts/X34-GLTF-CAMERA-ANIMATION-90S-Public-ReadOnly.cjs).

## 5. Real independent 143/143 QA and scope limits

[Independent Python verifier](../scripts/X34-Independent-Original-GLTF-Camera-Owner-GPU-and-90S-X01-X33-Acceptance.py) **decoded three actual GLB2 binaries directly**, compared their JSON/BIN header structure with the separate glTF Transform/Khronos reports, verified original camera paths, durations, samples, interpolation, GLB hash, reference live HTTP hash, unique owner camera/motion, real Three.js GPU result, owner image SHA, 7 live phases, first-party SHA/size and initiator graph, RAM guards, and all X01–X33 local evidence and previous QA gates.

**143/143 independent PASS, zero failures, exit 0.** Historical checks confirmed: X27 49/49, X28 58/58, X29 88/88, X30 96/96, X31 121/121, X32 128/128 and X33 123/123. No assertion about true authored website camera runtime control or unreleased proprietary model recovery.

[Independent X34 acceptance](../evidence/X34-INDEPENDENT-GLTF-CAMERA-GPU-VIEWER-LIVE90-X01-X33-ACCEPTANCE.json).

## 6. On-PC artifact folders, private/public contract and X35 handoff

PC original root: `%USERPROFILE%\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION`.

- `01-private-captures\X34\OWN-GLTF-CAMERA-ANIMATION`: original DJMRN camera GLB, raw official validator outputs, Chrome own render profile, private screenshots, glTF CLI transcripts.
- `01-private-captures\X34\PUBLIC-90S-READONLY`: **private original live site screenshots and Chrome isolate profile**.
- `02-reviewed-derived\X34-CURRENT`: executable original owned scripts + HTML, sanitized glTF/camera and HTTP numerical metadata, independent QA, final handoff and PC/GitHub SHA manifest.
- Earlier `X01-REDO` private reference camera GLB and `X31` private owner Mesh GLB remain unchanged.

GitHub publishes **ONLY** own code, safe aggregated metadata, QA, final report, exact hash receipt; no proprietary raw GLB, animation keyframes, vendor shaders, original camera pixels or credentials. No new software installed, no paid service, no administrative security changes, no production site modification.

**X34 COMPLETE_SCOPE_QUALIFIED. X35 NEXT:** independent controlled behavioral experiments to correlate held/released mouse, scroll and viewport changes with observed camera/visual state, while explicitly separating site autonomous motion and true input-caused changes from inferred behavior.
