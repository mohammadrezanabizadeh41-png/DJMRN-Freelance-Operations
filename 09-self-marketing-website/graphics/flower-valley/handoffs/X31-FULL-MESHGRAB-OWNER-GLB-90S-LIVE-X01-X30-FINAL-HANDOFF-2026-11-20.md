# DJMRN X31 FINAL — MeshGrab official 1.1.1; real OWN WebGL2 GLB; fresh 90s public read-only; X01–X30 reconciliation

**Date:** 2026-11-20 UTC. **Status: COMPLETE_SCOPE_QUALIFIED.**
**Independent acceptance:** **121 / 121 PASS**, Python exit code 0.
**PC ↔ GitHub source/evidence exact byte matches:** **14 / 14 verified** (12 source/result files plus manifest generator and manifest).
**Commercial site asset capture:** **ZERO** (read-only public metadata only).

## 1. Why X31, provenance, installation & license

The X30 final checkpoint explicitly defined the next stage as an independent `MeshGrab` trial. The official upstream is [kmatzen/meshgrab](https://github.com/kmatzen/meshgrab), **MIT**, Manifest V3 version **1.1.1**. Public GitHub official tree identified: `30dc6f45205407dbcf485e51e030568b4e997300` (tree hash, **not** a commit id). Nine source files (README, LICENSE, PRIVACY, manifest, hooks, selftest, sites, bridge, popup) had **exact matching original Git-blob hashes** between installed PC source and official GitHub. This does **not** assert complete upstream checkout identity. Official source previously existed in `%LOCALAPPDATA%\DJMRN-Website-Toolkit\04-Specialists\Sources\meshgrab\meshgrab-main`. No new downloads, npm dependencies, paid services or account access needed.

The official `node selftest.mjs` completed with **all checks passed, exit 0**. The source catches uploads >=4,096 bytes only, caps retained buffer copy at 640 MiB, and exports one selected primitive, so it cannot by default preserve complex multi-object scenes or world transforms.

Original manifest requests per-origin optional permission. The **first headless automation attempt** failed because its permission prompt never settled within 20 seconds. Failure was disclosed; this did not prove anything about source geometry. The **successful retry** copied all original official JS/assets verbatim into a **private isolated Chrome 157 extension directory** and changed **only the private copy's manifest** to grant `http://127.0.0.1/*` and install the official main/bridge hooks at `document_start`. The original source and personal Chrome remained unchanged; **no public site host permission was granted**. This is a test-specific derived manifest and must never be described as the unmodified manifest.

## 2. Real original controlled owner fixture and exact GLB

[OWNER fixture HTML](../fixtures/X31-OWN-LargeGrid-Points-Instancing-WebGL2.html) generates a 32×16 grid with **512 vertices, 2790 submitted indices = 930 triangles**, 512 normals and 512 UV pairs, plus **5 GL_POINTS** and a **3-instance triangle draw**, using original project-authored code. [Actual isolated Chrome 157 runner](../scripts/X31-Official-MeshGrab-Owner-MV3-Chrome157-Real-GLB-Capture.cjs) served this fixture locally.

- **Negative control** reused unchanged X29 small fixture: MeshGrab observed **12 bufferData** calls but retained **0 buffers**, showing the 4096-byte floor matters for genuinely small geometry.
- **Positive control:** MeshGrab observed **12 bufferData** calls, retained **4 buffers** (6144-byte position, 6144-byte normal, 4096-byte UV, 5580-byte indices), inferred **512 vertices and 930 triangles**, and generated a **real binary GLB**.
- Real owner GLB: `X31-OWN-Official-MeshGrab-1.1.1-GRID-EXACT.glb` — **22,940 bytes**, SHA256 `c69bd5f61c6d02c320d83439f0f9058b64b7e9a99970ef2aa571ecd918f37b30`; saved **only on owner's PC**.
- [Independent stdlib Python GLB2 decoder](../scripts/X31-Independent-Real-Owner-GLB-And-X01-X30-Acceptance.py) actually decoded the binary and verified primitive/index/accessor layout, indexed triangles, floats, bounds, per-vertex normals/UV and owner ground truth. It confirmed a **single TRIANGLES primitive** containing the grid. **No POINTS primitive** and **no restored three instance copies** appear in the final GLB. These are limitations measured on this test fixture; do not extrapolate universal inability across all scenes/tools.
- [Khronos glTF validator](../scripts/X31-Own-Khronos-GLTF-Validator.cjs) was executed against this actual original binary: **0 errors, 0 warnings, 1 informational UNUSED_OBJECT** for unused TEXCOORD_0. Format validity does not imply perfect scene semantics.
- Owner export finished **SUCCESS with 0 runner issues** and minimum **2,024 MiB free RAM**, safely above the configured **100 MiB hard stop**.

[Owner capture index](../evidence/X31-OFFICIAL-MESHGRAB-REAL-OWNER-CAPTURE-INDEX.json) | [GLB2 decoder 52/52 PASS](../evidence/X31-INDEPENDENT-REAL-OWNER-GLB-AND-X01-X30-ACCEPTANCE.json) | [Khronos result](../evidence/X31-OWN-KHRONOS-GLTF-VALIDATOR.json)

## 3. New authentic 90-second commercial live-site observation

Source: `https://www.gladeye.com/`. A separate, fresh anonymous Chrome 157 loaded **official MeshGrab but did not grant the third-party site's origin**, so the extension hooks remained absent on commercial content. The observer used previously reviewed X30 passive drawing-command instrumentation, and real Playwright pointer and scroll inputs. **No MeshGrab vendor capture/download/export**; no website proprietary geometry, vertex buffers, shaders, textures or GLB/OBJ saved. Only public nonexpressive GPU draw modes/counts, first-party resource hash/length and screen hashes published; original screenshots private on owner PC.

**New actual measurement:** 2026-11-20 UTC, stop **COMPLETED_90_SECONDS**, **exact 90.00-second clock after page WebGL2/Three.js r154 readiness**, **7 phases**, **0 runner errors**. RAM min **1,104 MiB**; no 100MiB stop, and no Windows proxy/VPN changes. Chrome-only `--no-proxy-server` was used to avoid inherited proxy stall.

| Phase | Actual observed second | Cumulative WebGL draw calls since instrumentation |
| --- | ---: | ---: |
| Initial | 3.41 | 0 |
| Hover left | 16.55 | 0 |
| Hover right | 29.59 | 0 |
| Scroll +450 | 42.46 | 5,568 |
| Pointer center | 55.56 | 16,672 |
| Scroll -450 | 72.48 | 31,616 |
| Idle return | 87.55 | 45,104 |

Zero pre-warmup draws are an **honest zero** from this observer, not evidence of no rendering overall. After warmup, observed **three distinct primitive draw signatures**: `drawElements(POINTS,960000)`, `drawElements(TRIANGLES,6)`, `drawArrays(TRIANGLES,3)`. These are signatures, **not three draw calls per frame**. X28's independent full-frame authority remains **16 draw calls per frame** with 11 programs and 22 shader hashes. Index count `960000` is **not flower count**.

Original X19 first-party resource inventory had 78 paths; X31 observed **46 known paths, 0 new paths**, and **38/38 original HTTP response body SHA256+byte sizes exactly matched** original X19 variants. X16 network graph cross-check: **37 observed known initiator edges, 0 new edges**. Both private screenshots' actual bytes/hash were checked against their recorded metadata. All seven phases explicitly confirmed that the commercial site **did not receive MeshGrab page hooks**.

[Real X31 live raw-safe metadata timeline](../evidence/X31-90S-LIVE-READONLY-MESHGRAB-UNGRANTED-X01-X30-TIMELINE.json) | [Real browser source](../scripts/X31-Official-MeshGrab-90s-LIVE-Public-ReadOnly.cjs) | [Reproducible X30→X31 builder](../scripts/X31-Build-Official-MeshGrab-Live-ReadOnly-Runner.cjs)

## 4. Historical cross-stage QA and final verified gate

- Valid original historical acceptance records confirmed: **X27 49/49, X28 58/58, X29 88/88, X30 96/96** with status PASS and no failed checks.
- New owner binary independent checks **52/52 PASS**; fresh live + historical checks **69/69 PASS**; combined **121/121 PASS**. Independent source: [X31 live + historical acceptance script](../scripts/X31-Independent-X01-X30-OWN-GLB-90s-LIVE-Acceptance.py). [Actual 121/121 acceptance record](../evidence/X31-INDEPENDENT-X01-X30-OWN-GLB-90S-LIVE-ACCEPTANCE.json).
- **14/14 GitHub files byte-exact** against the corresponding original owner-PC files, validated using Git blob SHA computed independently on PC and the matching actual GitHub Contents API blob SHA read back after each commit. The source and receipt are [X31 exact reconciliation script](../scripts/X31-Independent-PC-GitHub-Byte-Exact-Reconcile.py) and [full 12-file original matrix](../evidence/X31-PC-GITHUB-BYTE-EXACT-SHA256-MANIFEST.json); plus these two artifacts themselves were subsequently verified against GitHub with exact blob SHA. The two Windows Python-generated JSON files used **CRLF**; they were corrected in GitHub rather than silently accepting a byte mismatch.

**Scope qualification:** This is NOT a complete source/geometry reconstruction of the commercial site and NOT proof that user interaction causes a particular proprietary shader response. It is a **successful independent owner geometry fidelity measurement + actual public-site 90-second metadata observation + historical PC/GitHub reconciliation**. The tool's small-buffer floor, one-mesh export and loss of points/instancing in this controlled fixture are important evidence for an original implementation.

## 5. Storage and authority

Owner PC extraction root:
`C:\Users\Mrn7206\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION`

- `01-private-captures\X31\OWN-GLB-EXPORT`: original owner GLB, isolated Chrome profile, private owner screenshot, derived local-only manifest.
- `01-private-captures\X31\PUBLIC-90S-READONLY`: private site screenshots, isolated Chrome profile.
- `02-reviewed-derived\X31-CURRENT`: owner fixture, executable scripts, sanitized metadata, SHA/acceptance manifests and this final report.

GitHub canonical derived implementation:
`09-self-marketing-website/graphics/flower-valley/` → original owner `fixtures/`, X31 `scripts/`, sanitized `evidence/`, this `handoffs/` report. **No proprietary third-party raw GLB, textures, shaders or screenshots published.** GitHub is the canonical project code/report authority; PC retains private source captures and original owner export.

## 6. Failure notes, costs and what X31 does not warrant

- An initial optional-origin permission attempt failed under headless Chrome; recorded and explicitly replaced by a narrower private derived manifest. The official upstream source remained original.
- Temporary remote Bridgerator disconnection **after starting the live runner** did not invalidate the run: the resulting process was later independently read back with **exit 0**, 90s, seven phases, 0 issues.
- No new paid tools, subscriptions, credit-consuming providers, Windows security bypasses, permanent proxies, personal browser permissions, server deployments or public releases.
- X31 does not authorize archiving/scraping proprietary scene geometry from Gladeye. Next development should use original meshes/particles informed by verified nonexpressive behavior, with runtime and mobile tests, rather than pretending a proprietary scene clone was recovered.

**Final status: COMPLETE_SCOPE_QUALIFIED — 121/121 QA PASS, owner REAL GLB and public real 90s observed, 14/14 PC↔GitHub byte-exact, no vendor asset export.**
