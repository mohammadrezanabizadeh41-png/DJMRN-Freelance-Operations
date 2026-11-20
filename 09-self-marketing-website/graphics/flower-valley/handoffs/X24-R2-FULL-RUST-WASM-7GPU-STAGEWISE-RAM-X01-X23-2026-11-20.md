# DJMRN — X24-R2 full Rust/WASM debugger, seven full GPU packets, progressive RAM preservation

Date: 2026-11-20. Status: COMPLETE_SCOPE_QUALIFIED_FULL_RUST_WASM_AND_7GPU_STREAMED.
**Independent acceptance 248/248 PASS. X25 next; X23 R1/R2 and X24 R1 preserved unchanged.**

## Official source, installation, compiled UI and replay

- Official MIT source: https://github.com/Snowapril/webgd, Git main tree 7cd385690d6f3f5ff67fdf8faa6640b210451b80; no runnable asset found on official GitHub Releases.
- Official webgd source archive SHA-256 ea311807a17681f725daf818db4e9aeb498cd435e655235c8b11ad16c128059d; all 101 source ZIP members SHA-matched extracted files; Cargo.lock SHA a58a54f96c46ec917e9a771e8a5b5f7c1a4f750ff9b2aa8d6e805c5c87b7ddd3.
- Installed official Rustc/Cargo 1.100.0, wasm32-unknown-unknown, wasm-bindgen 0.2.130, portable w64devkit GCC 16.2/DLLTool; five installer/toolchain artifact SHA values match upstream official values.
- Native Cargo smoke compiled and executed; cargo fetch --locked, cargo build --locked for webgd-ui wasm32, and cargo test --locked ALL returned exit 0. Two early Windows linker failures were resolved by an owner-only Rustc wrapper/self-contained build environment; vendor original source and Cargo.lock were not modified.
- Compiled and installed full extension/ui with index.html, main.js, webgd_ui.js and webgd_ui_bg.wasm. Full Rust/egui browser UI was opened in an isolated anonymous Chrome for Testing 157 and its actual Capture button captured/replayed an OWN WebGL2 fixture frame. Visual UI observation shows 34 events, 2 draws/dispatches, 17 resources, zero replay errors or warnings. Own fixture screenshot retained privately, not uploaded.

| Generated UI file | Bytes | SHA-256 |
|---|---:|---|
| index.html | 469 | 712d34e4e0be611fb87766d52c5c9b8823fc25944fb5b3324d20e94cea8358bb |
| main.js | 48 | 90f7fa81cb159599ea6c0da03bf965d37320956056fb977044c83d10f26c24c3 |
| webgd_ui.js | 175851 | 2a54152f7afd55fa6b86c5e9a97d984b1c9eb6150ffd516a0e311a0ade7d7f82 |
| webgd_ui_bg.wasm | 51867289 | 2f0dfdd14fba5d579d8d923596f180e0b5376a69dd3bd982f4525b70935beb2b |

## Real-site GPU extraction and stepwise RAM adjustments

- Preserved explicit user **per-packet ceiling 1,000,000,000 bytes** and **100 MiB free-RAM hard-stop**; did not lower GL capture quality, texture counts, shaders, framebuffer content or target number of 7 frames.
- Stage S1 changed only the Node transfer mechanism: stream 2MiB chunks to disk with fs.writeSync, per-file incremental SHA256 and fsync. This removed the previous in-memory parts[] and Buffer.concat copies. Three complete 137MB files were captured; the fourth was correctly stopped at 99 MiB free RAM. Three previous complete files remain intact.
- Stage S2 added only page CDP HeapProfiler.collectGarbage and Node global.gc between completed files, after disk fsync/SHA. No GPU source/data reduction. Seven full frames were then captured with no emergency stop or capture error; lowest free physical RAM **250 MiB**.
- In S2 memory recovery after the seven files was [2362, 2262, 2168, 2055, 2131, 1998, 1969] MiB; average increase from targeted transient garbage collection **283.1 MiB**. No additional RAM restriction was necessary.
- The nominal page observation window was 90s with all seven capture requests scheduled by t=87; data transfer extended the ACTUAL observed session to **125.60 seconds**, with four frames completed before 90s and three after. This is NOT an exactly 90s session and is NOT every rendered GPU frame.
- Total seven private GPU WGDW binaries **960,061,412 bytes**, all saved at full length and independently SHA256 checked and parsed to complete WGDW v1 termination; no packet exceeded the 1GB cap.

| Capture | Completed t(s) | Full original bytes | WebGL calls in frame | Draws | Free RAM after GC (MiB) | Full source SHA-256 |
|---|---:|---:|---:|---:|---:|---|
| baseline | 22.67 | 137,151,592 | 137 | 16 | 2362 | 2f7c05dde22baf73e9dc05dc29a376d4c462f25c7f4498fe1027d7ce8d34d945 |
| pointer_left | 39.74 | 137,151,630 | 138 | 16 | 2262 | 412482769ed15dfcff8464ec44a5d872b520f27749fe89a7693ee5779f5d44e8 |
| pointer_right | 56.66 | 137,151,630 | 138 | 16 | 2168 | c8157da23467525766afc0669ec8448ac9b19bdebf9cedbed17fe46f9dd7d3db |
| wheel_450 | 74.19 | 137,151,621 | 138 | 16 | 2055 | 592572866feb0e070498864b920246cd37fd09fcc1f8a41890e9fe81788d2fe5 |
| pointer_center | 91.43 | 137,151,659 | 139 | 16 | 2131 | d37bec31a3624f9e7f30e8c6d4bc35d9e72c889e79ed01f62fc2e51ca21451ff |
| wheel_800 | 107.93 | 137,151,621 | 138 | 16 | 1998 | 254816e7ca3d26c055961e6f1a95edbcd0991d046c63b396e271fe5d26e613bc |
| pointer_reverse | 125.15 | 137,151,659 | 139 | 16 | 1969 | b0c91c16359252907c76031c49d7cafcd54b734cdec0550ca4422ee55538c2a5 |

## X01–X23 independent evidence crosswalk

- Seven GPU packets were independently decoded. Each includes 315 setup commands, 92 pre-frame snapshot commands, 137–139 frame WebGL calls, 16 real draws, 11 programs, 22 shaders, 96 Uniform Location objects, 20 textures, 20 buffers, 13 framebuffers, 13 renderbuffers, 11 VAOs, and 144 complete GPU blob records totalling 137,009,984 bytes per frame.
- Every frame matches authoritative X22 Spector on **22/22 shader SHA256**, **16/16 draw mode+count signatures**, **62/62 normalized Uniform names**. Consistent with prior X23 Ispettore records. The novel evidence is a larger set of independent full GPU replay-wire state snapshots and the safe memory workflow, not a recovered original authoring repository.
- Public HTTP records: 46 known first-party URLs, 38/38 repeat body SHA+byte-length hashes, and 37/37 existing X16 initiator edges. No novel original site URL, HTTP body source hash or shader source SHA. Canonical original X01–X19 78-path URL/SHA authority unchanged; X19 34 original JavaScript source files independently rehashed.
- Previous acceptances preserved: X23 R1 114/114, X23 R2 358/358, X24 R1 66/66. This is an ADDENDUM to X24, not overwriting previous evidence.

## Evidence locations, reproduction and limitations

- PC derived: Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261118-NEW-EXTRACTION/02-reviewed-derived/X24-CURRENT/X24-R2-FULL-RUST-WASM-2026-11-20.
- PC PRIVATE original WGDW raw: 01-private-captures/X24/full-rust-wasm-2026-11-20/live-90s-stage1-streaming and live-90s-stage2-gc.
- Installed compiled Rust/WASM: AppData/Local/DJMRN-Website-Toolkit/04-Specialists/Sources/webgd/webgd-main/extension/ui. Large WASM binary (~51.9MB) installed locally; source/build scripts and hashes sufficient for GitHub provenance.
- Full reproducibility: owner Rust build wrapper, original-source SHA auditor, full egui UI own-fixture browser test, original S1 and improved S2 capture runners, seven-frame independent decoder/crosscheck, report builder and on-demand GUI launcher. GUI launcher only opens Chrome extension and public site on user invocation and includes a 100MiB emergency guard.
- The full Rust/egui UI captured/replayed an OWN fixture; public Gladeye seven frames were captured using the official webgd JS hook and independently decoded. Do NOT claim that full egui replay was verified for all seven 137MB public-site files.
- Private raw vendor GPU WGDW, GLSL text, texture pixels, screenshots, tool install payloads and failed build logs STAY on laptop; GitHub holds only owner code, derived metadata and integrity SHA manifest. No cost or automatic paid usage.

**Final scoped X24-R2 status: 248/248 PASS, seven full GPU frames, RAM floor 250 MiB. No further restrictive settings needed for this completed run.**
