# DJMRN X19 — Full SHA-verified first-party JavaScript structural extraction and closure

**Date:** 2026-11-20. **Status:** `COMPLETE_SCOPE_QUALIFIED` after **21/21 independent final acceptance gates PASS**. **X20 NEXT, NOT STARTED.** This is an honest completion of the defined X19 client-JS scope, not a claim of recovering unpublished authored code, hidden sites, or backend.

## 1. Sources, toolchain, and test method

- Source-of-truth lineage: [full X01–X19 78-path original URL/SHA crosswalk](../evidence/X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json), superseding the frozen historical X01–X18 76-path baseline. 72 network-observed path identities, 6 offline-derived-only paths, and 69 normalized paths with independently verified original-response body bytes.
- Tool: official MIT `webcrack@2.16.0` with Windows x64 Node24.22.1, pinned isolated project runtime. Optional `isolated-vm-6@npm:isolated-vm@6.1.2` ABI137 prebuilt installed and owner-only advanced decoder acceptance PASS. No additional build compiler, global service, paid API or account required.
- Input: ALL **34** known legitimate first-party `.js` HTTP response bodies already in X01–X18, cumulatively **1,715,533 bytes**. Each input was re-identified by exact URL, 64-hex SHA256, original bytes, and first-observed stage. The 35th `.js` URL `gtm.q-c92099c696a43b1f.js` remains X05 offline mirror-only with no verified standalone original HTTP response body; thus not falsely included.
- [Full resilient worker](../scripts/X19-Full-SHA-Verified-JS-Structural-Sweep.cjs) processed one JS source per isolated bounded Node subprocess, with per-file checkpoints, SHA guards, timeout, RAM emergency stop, and three static fallbacks (primary `unminify + unpack + JSX`), no network re-fetch and no execution of downloaded JS. 34/34 PASS. Every transformed third-party code file remains PRIVATE on the owner laptop.
- [Supplemental safe advanced AST transformation](../scripts/X19-All-34-Safe-Advanced-NoVM-Deobfuscation.cjs) ran `deobfuscate:true` on ALL 34, but used an explicit sandbox callback rejecting third-party VM execution. **34/34 PASS, 3 transformed outputs changed**, zero denied VM callbacks and zero downloaded code executed. The installed native VM is genuinely operational for owner-created fixture code, not run on vendor code.

## 2. Webpack module separation, output audit, and analysis

| Metric | Independently verified |
| --- | ---: |
| Original HTTP-response JS processed | **34/34** |
| Original JS response bytes | **1,715,533** |
| Webpack-formatted JS inputs | **30** |
| No recognized unpackable Webpack module collection | **4** |
| Extracted derived module representations | **457** |
| Unique SHA256 across extracted modules | **453** |
| Generated files (unminified top-level, `bundle.json`, modules) | **521** |
| Files rehashed after transformation | **521/521** |
| Relative static require/import reference candidates | **670** |
| References resolved to module in same unpacked bundle | **670/670** |
| Reused numeric module IDs across files | **34** (32 with different module SHA) |
| High-signal 3D scene module candidates | **5** |
| Possible 3D scene module candidates | **12** |

- Do NOT conflate 457 transformed modules with 457 newly served URLs; static Webpack extraction deconstructs the 34 original files. Module numeric IDs are not necessarily stable global identities; use `(sourceURL, originalSHA, moduleID, moduleSHA)` as identity.
- [Deterministic secondary audit](../scripts/X19-Module-Graph-Scene-Structural-Audit.cjs) independently SHA-verified all derived file bytes and module bytes, enumerated module-relative graph paths, counted scene-related signals, and compared X19 live CDP initiator relations with X16.
- [All 457 per-module public metadata rows](../evidence/X19-ALL-MODULES-PUBLIC-METADATA.json), [Excel-friendly 457-row module CSV](../evidence/X19-ALL-457-MODULE-METADATA.csv), [670 import/require reference CSV](../evidence/X19-STATIC-MODULE-RELATIVE-IMPORT-EDGES.csv), [all 34 bundle inventory](../evidence/X19-FULL-PUBLIC-SANITIZED-MODULE-REPORT.json), [module scene rankings](../evidence/X19-SCENE-STRUCTURAL-CANDIDATES.json). All are derivative METADATA, not vendor code.

## 3. Scene hypothesis map linked to first-seen stages

- Home page `app/page-4c279de0997d388f.js` (first seen **X01**) contained `889` (gltf, Draco, shader/uniform, flower/terrain, rays and pointer/scroll) and `9169` (flower and terrain). These are high/possible candidates to cross-check with X01 camera GLB and texture evidence; no original GLSL source recovery claimed.
- Large engine chunk `b536a0f1-51636bd4ac051d8f.js` (X01) contained `6375` with renderer, geometry instancing, camera, uniforms and shader signals, likely engine/library code, not necessarily proprietary scene logic.
- Chunk `596-40a806be0d0d2bb3.js` (X01) contained `4863` (GLTF/Draco indicators) and `4059` (shader/rays signals). Their exact module SHA and relative imports are in the full metadata index.
- Several framework/browser chunks produced valid output but no site-scene-specific module evidence. Generic keyword signal scoring remains heuristic. Runtime behavior and original GLB/texture evidence are required to attribute specific effects.

## 4. Real new third-party response bodies discovered ONLY after static code analysis

X19 discovered 12 static string URL hints, NOT 12 new files:

- **Nine** image/GLB/petal/ray/terrain hints correspond to assets already captured in **X01**, with original network URL prefix `/valley/`. The source string `"/terrain.png"` is not, by itself, a new root resource; the existing original evidence is `/valley/terrain.png`.
- **Two** genuine previously unrecorded publicly served assets were reachable at the website root `/matter/`, unlike `/valley/matter/` which gave HTTP404. Both were downloaded through anonymous HTTP GET, checked `image/png`, PNG signature and dimensions, and verified not present among the **2,247 prior physical SHA256 file records**:
  - `https://www.gladeye.com/matter/skull.png` — **15,677 B**, **128×129**, SHA256 `f98f63a27c56147ac482b13fc31c7b796149b1ececd93f178b239fad4621bb74`.
  - `https://www.gladeye.com/matter/wave.png` — **19,830 B**, **128×129**, SHA256 `cbc7bfa9fe5cea61149121a05bd3c4ecfbcfc9d790fc21766aab188003880c0d`.
- **One** generic oEmbed hint returned HTTP404; not a new verified asset.
- Raw PNG bytes are in owner `01-private-captures/X19/new-first-party-asset-bodies/`, not GitHub. Public-safe [PNG SHA/dimension evidence](../evidence/X19-NEW-PNG-ORIGINAL-BODY-PUBLIC-METADATA.json), [asset route resolution](../evidence/X19-STATIC-ASSET-ROUTE-RESOLUTION.json), [verification/retrieval source](../scripts/X19-Verify-Discovered-Matter-PNG-Bodies.cjs), [canonical 78-path ledger creator](../scripts/X19-Merge-New-PNG-Into-Canonical-URL-Index.cjs).
- This legitimately expands the cumulative original URL path inventory X01–X18 **76** → X01–X19 **78**, network-confirmed paths **70 → 72**, offline-derived-only stays **6**, original-response-body-verified URL paths **67 → 69**. No additional original JS body discovered in X19.

## 5. Live CDP/DOM observations versus independent runtime history

- Existing X19 159-second anonymous home and `/work` observation sampled 7 times, collected 169 HTTP200 response events, 52 path identities, 25 JS path identities, and 61 request initiator pairs. The 159-second session itself saw **no new URLs**: the two new `/matter/` PNGs were discovered LATER by static source-string analysis and targeted independent original-body verification, not by that browser visit.
- [Exact CDP graph delta](../evidence/X19-LIVE-CDP-EDGES-VS-X16.json): **61/61 X19 initiator relation pairs already appeared among the 130 X16 edges**, so no novel CDP initiator edge is asserted. Behavior changes in Canvas, DOM animation and document scroll are complementary observations.
- No new source map advertised/restored, no complete shader authoring source, no complete scene GPU state and no private backend recovered. Avoid treating completeness of X19 known client-body processing as completeness of the whole reference site.

## 6. Independent tests, final authority, and reproducibility

- [Final X19 21/21 acceptance](../evidence/X19-FINAL-INDEPENDENT-FULL-STAGE-ACCEPTANCE.json), [per-bundle 34/34 static acceptance](../evidence/X19-FULL-INDEPENDENT-ACCEPTANCE.json), [derived 457/457 module SHA acceptance](../evidence/X19-INDEPENDENT-MODULE-GRAPH-ACCEPTANCE.json), [safe 34/34 advanced AST acceptance](../evidence/X19-ALL-34-SAFE-ADVANCED-RESULTS.json), and [updated 78-path ledger acceptance](../evidence/X01-X19-INDEPENDENT-CROSSWALK-ACCEPTANCE.json). All reported gates PASS, no false promotion of hypotheses.
- Local derived metadata and acceptance folder: `Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261118-NEW-EXTRACTION/02-reviewed-derived/X19-CURRENT/`. Original/transformed JS and new raw PNGs are retained PRIVATE under `01-private-captures/X19/`.
- The source-of-truth now is **one CURRENT canonical X01–X19 URL/SHA ledger**. X01–X18 is a frozen historical predecessor, not a competing live authority. Future X20–X46 must compare exact path/query, original original-byte SHA, first-seen stage, static-vs-network-vs-inferred provenance, and classify duplicate/new/complementary/unverified before any DONE.
- **Final decision:** `X19 COMPLETE_SCOPE_QUALIFIED` for ALL known SHA256-verifiable public client JS and the additionally verified two PNG responses; **X20 NEXT, NOT STARTED**. X05 offline-mirror-only JS and unobserved/author-only site components remain explicit limitations.

