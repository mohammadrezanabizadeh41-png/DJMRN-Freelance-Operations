# DJMRN — X24 webgd WebGL2/WASM Feasibility, Live 90-Second Observation and X01–X23 Crosswalk

**Date:** 2026-11-20
**Stage:** X24 / E2 — Snowapril/webgd, third independent WebGL2/WebGPU debugger family
**Status:** **COMPLETE_SCOPE_QUALIFIED_JS_HOOK; FULL_RUST_UI_REPLAY_BLOCKED_DEPENDENCIES**
**Independent acceptance:** **66/66 PASS**
**Reference:** https://www.gladeye.com/ — publicly accessible homepage only
**Next runbook stage:** X25 feasibility/fixture work, not started. Optional X24 full Rust UI/replay activation remains DEFERRED, not claimed completed.

## 1. Source search, official authority, pre-existing installation and cost/security decision

The official source is https://github.com/Snowapril/webgd, MIT licensed. GitHub Releases API returned no published GitHub release assets during this check. The author describes a Chrome MV3 WebGL2/WebGPU capture extension plus a Rust/egui/WASM GPU replay and inspection UI. Its current Git main recursive tree has SHA **7cd385690d6f3f5ff67fdf8faa6640b210451b80**.

The owner's laptop ALREADY had source in AppData/Local/DJMRN-Website-Toolkit/04-Specialists/Sources/webgd/webgd-main and original archive in Downloads/DJMRN-Website-Tools/SOURCE_ARCHIVE/Snowapril-webgd-main.zip; ZIP SHA-256 **ea311807a17681f725daf818db4e9aeb498cd435e655235c8b11ad16c128059d**. Independent per-file SHA-256 matched **101 of 101 archived files**, and five important local files independently matched the corresponding official GitHub Git blob identities: extension/hook.js, manifest.json, bridge.js, background.js and docs/wire-format.md. Official hook SHA-256 = **7a23c86d7c785825191317b6b10b204a76c648c7df4b3a7f56849025f6aa0241**.

**Full UI prerequisites blocked, not silently installed:** rustc, cargo and wasm-bindgen commands were absent, and the generated extension/ui/webgd_ui_bg.wasm binary did not exist. The official build flow would require Rust/Cargo, wasm32-unknown-unknown, pinned wasm-bindgen CLI and compilation of a substantial WASM/egui replay tool. The project X24 Runbook explicitly advises NOT installing Rust solely for a redundant observer without a separate architecture and cost/performance approval. On this 8 GiB Windows laptop, no unnecessary Rust toolchain, Docker, dependency download, new provider or paid capability was activated.

The official **unmodified JavaScript hook.js** was instead activated via an isolated fresh anonymous Chrome for Testing 157 profile loading the existing webgd MV3 extension/ directory at document_start. Its capture message channel was observed by owner-written page listeners, and resulting WGDW wire bytes were saved privately. This is a real official webgd JS capture, but **not** full compiled Rust UI or graphical GPU replay. No persistent webgd permissions were granted to personal Chrome; the broad content-script host match applied only to the ephemeral isolated browser session.

## 2. Safe owner WebGL2 fixture validates the actual capture mechanism

The owner’s existing WebGL2 triangle loopback page (from the X22 fixture) was visited in isolated Chrome with webgd enabled. Its WebGL2 context and hook successfully activated. A real single-frame WGDW v1 file of **931,231 bytes** was recorded and hashed:
**ae28f1f6309b23b3ebafcef0f705bab31cf99ce7f92270aa3b7a2b72748c3ad3**.

The independent owner-developed Python WGDW decoder, based on the official hook.js and docs/wire-format.md, parsed it to completion: **14 setup calls, 7 pre-frame snapshot calls, 7 frame calls, one actual triangle draw**, 23 binary blobs and 9 object records. No vendor Rust decoder or CLI was available; this custom metadata-only decoder does **not** provide the full authored webgd UI/replay experience. Its code and resulting metadata are recorded under X24 in PC and GitHub. The original fixture wire bytes remain private locally.

## 3. First real public site observation: full 90.01 seconds

An anonymous Chrome session continuously held https://www.gladeye.com/ open for **90.01 seconds**, testing webgd capture at seven scheduled pointer/wheel checkpoints. The official hook created a capture at each, but all seven WGDW packets **exceeded the owner's conservative 60 MiB per-capture transfer cap**, so no full raw GPU packets were moved to local storage from this first full 90s run. **Do not misstate 7 requested captures as 7 saved or fully analyzed GPU frames.** The safety gate was deliberate; it did not prove failure of the webgd interception machinery.

The 90s site observer also recorded first-party HTTP responses and X16-style initiator edges:
- **46 unique known site paths**, 0 new first-party original URL paths.
- **38/38 HTTP response-body SHA256+byte-length repeats** against the canonical X01–X19 original-body lineage; 0 new original data.
- **37/37 runtime initiator edge pairs** already present among X16's 130 canonical network edge pairs.
- **Minimum free RAM 648 MiB**, above the hard 100 MiB emergency limit. No safety interruption; browser/session closed. 7 attempted raw transfers rejected by size policy; page live session itself completed.

This first session's evidence is the full 90-second browser observation plus bounded **capture-size blocker evidence**, not full GPU capture data.

## 4. One additional short live test under a safer expanded 140 MiB cap — success

A separate, **23.32-second** anonymous public-site diagnostic allowed a single raw frame transfer up to 140 MiB (not seven large transfers). One real complete vendor-site WGDW v1 capture succeeded:
- File: private local X24/one-frame-safe-limit/X24-WEBGD-RAW-01-baseline.webgd
- **137,151,592 bytes** (approximately 130.80 MiB)
- SHA-256 **62e5e9fb1d580900697265f50a706546ed23532a2e652194529eda4d57a0f5b9**
- One capture, no errors, **minimum free RAM 734 MiB** in this supplementary run, Chrome closed safely.

The independent read-only Python decoder fully traversed the raw WGDW binary and validated its magic, version, string table, wire record sections and terminating marker. Structured results:
- **315 setup WebGL calls**
- **92 pre-frame GPU state snapshot calls**
- **137 actual frame calls, including 16 real draw calls**
- **213 registered API objects** including **11 programs**, **22 shaders**, **96 Uniform Location objects**, **20 textures**, **20 buffers**, **13 framebuffers**, **13 renderbuffers** and **11 VAOs**.
- **144 blob records** containing **137,009,984 bytes** of pre-frame/resource data, largest individual blob **14,745,600 bytes**. These blob bytes are raw private GPU resource contents, NOT newly discovered website URL assets and NOT published.
- Main drawElements POINTS pass **960,000 point indices** — NOT proof of 960,000 flowers — followed by one drawElements TRIANGLES count 6 and fourteen fullscreen drawArrays TRIANGLES counts 3.

## 5. Full X01–X23 cross-check and novelty classification

**Independent third-family confirmation:** all 22 original shader strings extracted in the official WGDW setup section were SHA-256 hashed by the owner decoder and **exactly matched the 22 SHA values in X22 Spector.js**; **0 new authored shader source identity**. All 16 frame draw method/mode/index-count signatures exactly matched the X22 recorded GPU frame. X23 Ispettore previously had matched the same 22 shader SHA and 16-draw program topology. Each instrument runs independently but captures the same underlying public website and Chrome rendering architecture.

**Uniform name discrepancies resolved:** webgd wire has **96 getUniformLocation calls and 62 unique names**; X22 reported 62 names. Their only 2 notation differences are **bloomFactors[0] / bloomTintColors[0]** versus **bloomFactors / bloomTintColors**. Stripping the WebGL indexed-array [0] suffix produces **62/62 exact name matches**. These are not new Uniform definitions.

**New derived GPU resource evidence:** Unlike X22/X23's primarily active draw/semantic timeline, webgd's replay-oriented full wire capture preserves an independent pre-frame registry/snapshot of **20 textures, 20 buffers, 13 FBOs, 13 renderbuffers, 11 VAOs, 92 snapshot calls and 144 binary GPU blobs**. This gives a concrete inspection input for future independent GPU resource analysis. The original vendor GPU bytes and GLSL source are private on the laptop; only hashes, object counts, call names and numeric metadata are publishable.

**Prior authorities preserved:** X19 has 34/34 original JS SHA-verified again. The single X01–X19 78-path original URL/SHA authority (72 public network paths + 6 offline-derived-only) remains unchanged. X20 previous acceptance 34/34; X21 45/45; X22 87/87; X23 114/114. The X24 webgd session adds zero new original HTTP asset path, zero new original response body SHA, zero new network initiator pair, zero new shader source SHA and zero new Uniform definition after normalized array syntax. No duplicate canonical source registry was created.

**Novelty codes:**
- NEW_DERIVED_GPU_REPLAY_STATE: independent WGDW pre-frame GPU resources, snapshot data and object identity ledger.
- CORROBORATED_INDEPENDENT: exact 22 shader hashes, 16 draw signatures, WebGL call frame count and 62 normalized Uniform names.
- REPEATED: 46 URLs, 38 response hashes, 37 network edges.
- BLOCKED_FULL_UI: no Rust compiler, wasm32 target/bindgen CLI and generated webgd UI WASM; no native replay/geometry/timer claims.
- NOT_CAPTURED: first 90s seven large raw GPU files rejected by 60 MiB gate; only the separate additional safe single-frame transfer is complete.

## 6. Evidence, safe publication and acceptance

**Owner laptop root:** Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261118-NEW-EXTRACTION
**X24 derived metadata and scripts:** 02-reviewed-derived/X24-CURRENT
**Private complete raw captures:** 01-private-captures/X24 and its one-frame-safe-limit subfolder.

Safe public owner-created artifacts: capture runner scripts (owner WebGL2 fixture, full 90s browser observation, one-frame 140 MiB retry), read-only WGDW decoder, independent X01–X23 verifier, source/missing-tool feasibility record, three sanitized frame/network metadata JSONs, SHA-256 original-to-Git blob publication manifest, this handoff, current Runbook X24 stage row, and website PROJECT-LOG stage closure. **No raw .webgd bytes, vendor shader-source text, raw third-party GPU textures or session secrets** may enter GitHub.

**Acceptance:** **66/66 independent checks PASS** for scoped X24 JavaScript hook feasibility, independently decoded public-site GPU capture, provenance, safety constraints and source-boundary. Stage status is **COMPLETE_SCOPE_QUALIFIED_JS_HOOK** while **FULL_RUST_UI_REPLAY_BLOCKED_DEPENDENCIES** remains an explicit deferred sub-capability. This is not a fabricated successful Rust build. Per sequential Runbook, X25 is the next new-stage review; a separate approval/necessity test would be needed before revisiting the expensive Rust build.
