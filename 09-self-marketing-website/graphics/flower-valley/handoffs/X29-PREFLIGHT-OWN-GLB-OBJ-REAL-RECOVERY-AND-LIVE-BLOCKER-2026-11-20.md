# DJMRN X29 — Real WebGLRipper owner-fixture export and public-site blocker (2026-11-20)

**State: PARTIAL / OWNER-GEOMETRY-VERIFIED / PUBLIC-90S NOT COMPLETED. Do NOT mark X29 DONE or proceed to X30.**

## Scope and user authorization

The owner requested X29 preflight, official source/plugin verification, installation/configuration, real GPU geometry recovery tests on an **OWNER-GENERATED WebGL2 fixture**, up-to-90-second public site metadata observation, comparison to X01–X28, all durable PC and GitHub records. Only authorized owner geometry may be exported and shared. Commercial Gladeye original GLB/OBJ/vertex buffers/Shader source must NOT be exported to the project; public site metadata is read-only.

## Official source and security

- Official source: https://github.com/int3re/WebGLRipper ; upstream canonical **HEAD 7fe32c9616f55f3aa80ace68a4b79d0cb7b5a849** from successful real Windows `git ls-remote`, then verified against local cloned repo `git rev-parse HEAD`.
- Source currently tagged inside manifest as **1.3.2, Chrome Manifest V3**, MIT. Official tree cloned to owner PC: `%LOCALAPPDATA%\DJMRN-Website-Toolkit\04-Specialists\Sources\WebGLRipper\source-7fe32c9616f5`, **72 Git-tracked files** including real browser test suite.
- An older installed `04-Specialists\Extensions\WebGLRipper` also declared v1.3.2 but **was not byte-identical to current canonical source** (20 out of 24 installed files differed or were untracked). Retained unchanged; experimental browser loads verified pinned canonical source, not personal Chrome, with no paid install/upgrades.
- The extension has broad `<all_urls>` host access and `storage` permission, plus optional download/history access. **Only a disposable isolated Chrome for Testing 157 profile** was used. On the public site, do not send the capture command or export any original vendor geometry. Official MIT/release security is NOT evidence of safety across arbitrary third-party sites.
- Existing Node/Python/Chrome157/Puppeteer/Playwright reused, no paid credit or provider activated.
- Official source and limitations: https://github.com/int3re/WebGLRipper#limitations ; Khronos GLB 2.0: https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html .

## Source-native browser tests

Actual upstream test suite executed on PC against pinned source with Chrome 157 and `CHROME` pointing to existing Chrome for Testing: `node tests/i18n-check.mjs` **exit 0**; `node tests/run-chrome.mjs --no-three` **170 PASS, 1 FAIL, exit 1**. The sole reported failure was **`V in the preview records a turntable video (WebM)`**, unrelated to geometric export but not suppressed. Logs saved as local owner evidence:
`X29-CURRENT/X29-OFFICIAL-I18N-CHECK-LOCAL-PRIVATE.txt`, `X29-CURRENT/X29-OFFICIAL-CHROME-OWN-FIXTURES-LOCAL-PRIVATE.txt`.
Upstream three.js CDN-dependent browser test explicitly skipped (`--no-three`); no claim of full native-suite success.

## Actual OWN WebGL2 geometry capture and exact file decoding

Original owner source on PC `X29-CURRENT/X29-OWN-Controlled-WebGL2-Mesh-Points-Instancing-Fixture.html` and `X29-CURRENT/X29-OWN-Official-WebGLRipper-Real-GLB-OBJ-Runner.cjs`. Verified WebGL2 renders **exactly three draw submissions per frame**:
1. textured quad = 4 unique vertices, **6 indices = 2 triangles**, 4 UV pairs;
2. **5 `GL_POINTS`**;
3. 3-index triangle with **3 instanced copies** (`drawElementsInstanced`).

The genuine official extension in isolated Chrome reported `ready; contexts:1, canvases:1`, then `Recording a frame`, `Recorded 2 meshes from 3 draw calls`, `Reading texture 1 of 1`, `Building GLB`, `Packing .zip`, and `Saved 2 meshes and 1 texture`. Real owner-origin ZIP downloaded locally as **`webglripper_127.0.0.1_20261120-205751.zip`**, **3,236 bytes**, SHA256 **`e9364b91483129e7e7c2602a943b302852e665664c24418812c7d4cfc3540662`**. No third-party content. Minimum free RAM **2,029 MiB**; zero runner issues. Unpacked ZIP read-only using Python stdlib `zipfile`, `struct` and Khronos GLB2 header/accessors:
- Valid GLB2 header, **2 mesh primitives, 2 nodes, 2 materials, 1 embedded texture, 0 cameras**.
- `mesh_000`: TRIANGLES (mode=4), **4 vertices, 6 indices, 2 triangles, 4 UV pairs, 4 normals**; vertex XY bound `[-0.96,-0.55]..[-0.46,0.50]`, exact original.
- `mesh_001`: TRIANGLES (mode=4), **3 vertices, 3 indices, 1 triangle, 3 UV pairs, 3 normals**; vertex XY `[0.45,-0.30]..[0.64,-0.02]`, one base copy.
- OBJ `mesh_000.obj` = 4v/4vt/4vn/2 faces, `mesh_001.obj` = 3v/3vt/3vn/1 face; `scene.obj` = 7v/7vt/7vn/3 faces.
- PNG `textures/tex_000.png`, actual **2×2**, **79 bytes**. GLB contains 1 texture.
- **POINTS lost:** 0 exported glTF POINTS primitives, vs actual 5 owner points submitted.
- **Instancing not reproduced:** the 3 draws represented by the instanced submission are represented by just **one base triangle** in GLB (not three rendered copies).
- Therefore geometry recovery is accurate for this simple indexed, UV-mapped quad; POINTS and per-instance duplication require separate original implementation/metadata. Do **not** claim universal mesh accuracy, fully preserved instancing, or direct recovery of original flower geometry.

Owner-derived numeric receipt is recorded in local file `X29-CURRENT/X29-OWN-REAL-GLB-OBJ-INDEPENDENT-DECODED-GEOMETRY.json` and Python source `X29-CURRENT/X29-Independent-OWN-GLB-OBJ-Geometry-Decoder.py`. Original owner ZIP resides in sibling `01-private-captures/X29/own-fixture-export`.

## Public 90-second observation — INCOMPLETE

The first X29 isolated WebGLRipper + Spector read-only live visit **failed on `https://www.gladeye.com/` navigation**: `Navigation timeout of 24000 ms exceeded`, **0 GPU frames**, about 29s wall time, only 1 first-party path seen before failure, free RAM minimum 1,933MiB; did NOT run 90s. Logs retained at `X29-CURRENT/PUBLIC-LIVE-90S/X29-PUBLIC-READONLY-90S-LOCAL-PRIVATE-INDEX.json`, and its sanitized paired JSON. The owner PC remote connection also intermittently dropped during retries; the 90-second commercial-site metadata target remains **NOT VERIFIED**. No GLB/OBJ of vendor content was captured or exported. Historical X28 public 2×90s GPU evidence remains untouched, but it is NOT a substitute for a new X29 observation.

## Rights, failure modes and next steps

- Original sources/fixtures/test outputs and real small ZIP created and saved on the owner PC; stage folder `02-reviewed-derived/X29-CURRENT` exists next to X01–X28. Do not alter historical data.
- The X29 canonical state is **PARTIAL**, not DONE. Once reliable PC network connectivity is restored: rerun isolated WebGLRipper activation and browser 90s **read-only**, verify `hello` with one WebGL2 context, collect only nonexpressive program/attribute/draw metadata; crosscheck X19 response SHA/X16 initiators/X22–X28 shader/draw evidence; independently verify all original owner-private and safe Git source hashes and all X01–X29 directories; publish full source files, acceptance manifest, final runbook and project log with evidence. Do not mark completion without proof.
- Source-native test suite video/WebM failure should be disclosed and optionally isolated on OWN scene; no tool upgrade solely to fix an unrelated demo video.
- X30 remains NEXT AFTER VERIFIED X29, not an active new stage.

**External sources:** [official MIT WebGLRipper](https://github.com/int3re/WebGLRipper); [official technical architecture](https://int3re.github.io/WebGLRipper/how-it-works.html); [Khronos glTF 2.0](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html).