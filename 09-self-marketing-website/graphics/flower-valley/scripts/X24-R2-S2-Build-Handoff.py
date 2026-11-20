#!/usr/bin/env python3
"""DJMRN X24 R2: sanitized Markdown handoff built only from independently verified owner metadata."""
from pathlib import Path
import json
H=Path.home()
R=H/"Desktop"/"DJMRN-Website-Reference-Evidence"/"fernhollow-gladeye-20261118-NEW-EXTRACTION"
D=R/"02-reviewed-derived"/"X24-CURRENT"/"X24-R2-FULL-RUST-WASM-2026-11-20"
def load(name):return json.loads((D/name).read_text(encoding="utf-8"))
a=load("X24-R2-S2-INDEPENDENT-ACCEPTANCE.json")
v=load("X24-R2-S2-SEVEN-FULL-WGDW-INDEPENDENT-X01-X23-CROSSWALK.json")
assert a["passed"]==a["total"]==248 and not a["failed"]
frames=v["frames"]
ui=v["fullUi"]
lines=[
"# DJMRN — X24-R2 full Rust/WASM debugger, seven full GPU packets, progressive RAM preservation",
"",
"Date: 2026-11-20. Status: COMPLETE_SCOPE_QUALIFIED_FULL_RUST_WASM_AND_7GPU_STREAMED.",
"**Independent acceptance 248/248 PASS. X25 next; X23 R1/R2 and X24 R1 preserved unchanged.**",
"",
"## Official source, installation, compiled UI and replay",
"",
"- Official MIT source: https://github.com/Snowapril/webgd, Git main tree 7cd385690d6f3f5ff67fdf8faa6640b210451b80; no runnable asset found on official GitHub Releases.",
"- Official webgd source archive SHA-256 ea311807a17681f725daf818db4e9aeb498cd435e655235c8b11ad16c128059d; all 101 source ZIP members SHA-matched extracted files; Cargo.lock SHA a58a54f96c46ec917e9a771e8a5b5f7c1a4f750ff9b2aa8d6e805c5c87b7ddd3.",
"- Installed official Rustc/Cargo 1.100.0, wasm32-unknown-unknown, wasm-bindgen 0.2.130, portable w64devkit GCC 16.2/DLLTool; five installer/toolchain artifact SHA values match upstream official values.",
"- Native Cargo smoke compiled and executed; cargo fetch --locked, cargo build --locked for webgd-ui wasm32, and cargo test --locked ALL returned exit 0. Two early Windows linker failures were resolved by an owner-only Rustc wrapper/self-contained build environment; vendor original source and Cargo.lock were not modified.",
"- Compiled and installed full extension/ui with index.html, main.js, webgd_ui.js and webgd_ui_bg.wasm. Full Rust/egui browser UI was opened in an isolated anonymous Chrome for Testing 157 and its actual Capture button captured/replayed an OWN WebGL2 fixture frame. Visual UI observation shows 34 events, 2 draws/dispatches, 17 resources, zero replay errors or warnings. Own fixture screenshot retained privately, not uploaded.",
"",
"| Generated UI file | Bytes | SHA-256 |",
"|---|---:|---|"
]
for name,f in ui["builtUIFiles"].items():
 lines.append("| "+name+" | "+str(f["bytes"])+" | "+f["sha256"]+" |")
lines += [
"",
"## Real-site GPU extraction and stepwise RAM adjustments",
"",
"- Preserved explicit user **per-packet ceiling 1,000,000,000 bytes** and **100 MiB free-RAM hard-stop**; did not lower GL capture quality, texture counts, shaders, framebuffer content or target number of 7 frames.",
"- Stage S1 changed only the Node transfer mechanism: stream 2MiB chunks to disk with fs.writeSync, per-file incremental SHA256 and fsync. This removed the previous in-memory parts[] and Buffer.concat copies. Three complete 137MB files were captured; the fourth was correctly stopped at 99 MiB free RAM. Three previous complete files remain intact.",
"- Stage S2 added only page CDP HeapProfiler.collectGarbage and Node global.gc between completed files, after disk fsync/SHA. No GPU source/data reduction. Seven full frames were then captured with no emergency stop or capture error; lowest free physical RAM **250 MiB**.",
"- In S2 memory recovery after the seven files was [2362, 2262, 2168, 2055, 2131, 1998, 1969] MiB; average increase from targeted transient garbage collection **283.1 MiB**. No additional RAM restriction was necessary.",
"- The nominal page observation window was 90s with all seven capture requests scheduled by t=87; data transfer extended the ACTUAL observed session to **125.60 seconds**, with four frames completed before 90s and three after. This is NOT an exactly 90s session and is NOT every rendered GPU frame.",
"- Total seven private GPU WGDW binaries **960,061,412 bytes**, all saved at full length and independently SHA256 checked and parsed to complete WGDW v1 termination; no packet exceeded the 1GB cap.",
"",
"| Capture | Completed t(s) | Full original bytes | WebGL calls in frame | Draws | Free RAM after GC (MiB) | Full source SHA-256 |",
"|---|---:|---:|---:|---:|---:|---|",
]
for f in frames:
 lines.append("| {} | {:.2f} | {:,} | {} | {} | {} | {} |".format(
  f["name"],f["completedSecond"],f["bytes"],f["frameCalls"],f["realDraws"],
  f["ramRecovery"]["freeAfterGC"],f["sha256"]))
lines += [
"",
"## X01–X23 independent evidence crosswalk",
"",
"- Seven GPU packets were independently decoded. Each includes 315 setup commands, 92 pre-frame snapshot commands, 137–139 frame WebGL calls, 16 real draws, 11 programs, 22 shaders, 96 Uniform Location objects, 20 textures, 20 buffers, 13 framebuffers, 13 renderbuffers, 11 VAOs, and 144 complete GPU blob records totalling 137,009,984 bytes per frame.",
"- Every frame matches authoritative X22 Spector on **22/22 shader SHA256**, **16/16 draw mode+count signatures**, **62/62 normalized Uniform names**. Consistent with prior X23 Ispettore records. The novel evidence is a larger set of independent full GPU replay-wire state snapshots and the safe memory workflow, not a recovered original authoring repository.",
"- Public HTTP records: 46 known first-party URLs, 38/38 repeat body SHA+byte-length hashes, and 37/37 existing X16 initiator edges. No novel original site URL, HTTP body source hash or shader source SHA. Canonical original X01–X19 78-path URL/SHA authority unchanged; X19 34 original JavaScript source files independently rehashed.",
"- Previous acceptances preserved: X23 R1 114/114, X23 R2 358/358, X24 R1 66/66. This is an ADDENDUM to X24, not overwriting previous evidence.",
"",
"## Evidence locations, reproduction and limitations",
"",
"- PC derived: Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261118-NEW-EXTRACTION/02-reviewed-derived/X24-CURRENT/X24-R2-FULL-RUST-WASM-2026-11-20.",
"- PC PRIVATE original WGDW raw: 01-private-captures/X24/full-rust-wasm-2026-11-20/live-90s-stage1-streaming and live-90s-stage2-gc.",
"- Installed compiled Rust/WASM: AppData/Local/DJMRN-Website-Toolkit/04-Specialists/Sources/webgd/webgd-main/extension/ui. Large WASM binary (~51.9MB) installed locally; source/build scripts and hashes sufficient for GitHub provenance.",
"- Full reproducibility: owner Rust build wrapper, original-source SHA auditor, full egui UI own-fixture browser test, original S1 and improved S2 capture runners, seven-frame independent decoder/crosscheck, report builder and on-demand GUI launcher. GUI launcher only opens Chrome extension and public site on user invocation and includes a 100MiB emergency guard.",
"- The full Rust/egui UI captured/replayed an OWN fixture; public Gladeye seven frames were captured using the official webgd JS hook and independently decoded. Do NOT claim that full egui replay was verified for all seven 137MB public-site files.",
"- Private raw vendor GPU WGDW, GLSL text, texture pixels, screenshots, tool install payloads and failed build logs STAY on laptop; GitHub holds only owner code, derived metadata and integrity SHA manifest. No cost or automatic paid usage.",
"",
"**Final scoped X24-R2 status: 248/248 PASS, seven full GPU frames, RAM floor 250 MiB. No further restrictive settings needed for this completed run.**",
]
out=D/"X24-R2-FULL-RUST-WASM-7GPU-STAGEWISE-RAM-X01-X23-2026-11-20.md"
out.write_text("\n".join(lines)+"\n",encoding="utf-8")
print("X24_R2_HANDOFF_WRITTEN",out,"bytes",out.stat().st_size,"frames",len(frames))
