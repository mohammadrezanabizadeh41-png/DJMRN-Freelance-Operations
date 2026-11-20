# DJMRN X31 — MeshGrab official source, real owner GLB: verified partial checkpoint

> **HISTORICAL CHECKPOINT — SUPERSEDED.** The interrupted run was subsequently recovered and independently verified. The **canonical X31 FINAL** is [X31 real owner GLB + actual 90s + 121/121 acceptance + 14/14 PC↔GitHub exact handoff](X31-FULL-MESHGRAB-OWNER-GLB-90S-LIVE-X01-X30-FINAL-HANDOFF-2026-11-20.md). The PARTIAL status below documents the earlier in-progress state only; do not interpret it as current.

**Date:** 2026-11-20 UTC. **Status: PARTIAL — OWNER CAPTURE VERIFIED; X31 LIVE 90S AND FINAL PC↔GITHUB RECONCILIATION UNVERIFIED.**
**Next stage:** X31 continuation, not X32. This document must not be called a full X31 DONE receipt.

## Why X31

X30 documented the next planned independent MeshGrab owner-fixture trial. Its own independent suite was 96/96 PASS and its commercial public-site observation was a real 90.00s. X29 and X30 both omitted owner fixture GL_POINTS and expanded instancing incompletely. X31 independently tests whether MeshGrab resolves these limits rather than assuming export fidelity.

## Provenance of official tools

- Canonical public upstream: https://github.com/kmatzen/meshgrab
- GitHub tree observed 2026-11-20: `30dc6f45205407dbcf485e51e030568b4e997300`. **Tree SHA, not HEAD commit SHA.**
- Manifest version **1.1.1**, Chrome Manifest V3, MIT license, no paid subscription/API/account.
- Existing unpacked source at `%LOCALAPPDATA%\DJMRN-Website-Toolkit\04-Specialists\Sources\meshgrab\meshgrab-main` on owner PC.
- Local Git-blob checks were byte-exact for nine selected upstream files: README.md, LICENSE, PRIVACY.md, manifest.json, hooks.js, selftest.mjs, sites.js, bridge.js, popup.js. Do not infer a complete checkout pin from this subset.
- The upstream script `node selftest.mjs` was **executed locally: all checks passed, process exit 0**.
- The official `hooks.js` ignores `bufferData` uploads below **4,096 bytes** and has a **640 MiB capture cap**; its documented export is **single primitive**, lacking node/world transforms, GPU instancing semantics, interleaved buffers, and WebGPU.
- Permissions: upstream has no site host grant on installation; one-origin optional permission on explicit enable. Personal Chrome was NOT changed.

## Owner Chrome 157 execution — TWO separate attempts

### First run (failed/retained)
The unmodified optional-host permission request did not resolve within 20s in an unattended Headless Chrome 157 window. This was recorded as an **ERROR** under local `X31-OFFICIAL-MESHGRAB-REAL-OWNER-CAPTURE-INDEX.json`; later run replaced the same *current index* with its successful result. The original failure is evidenced by execution output but does not have a separately archived JSON. The failure was not due to site geometry.

### Second run (success)
A **private owner-only derived MV3 manifest** was created in an isolated test folder. Original official JS/assets remained unmodified byte-for-byte; only the copied manifest limited `host_permissions` and statically registered MAIN/ISOLATED hooks to `http://127.0.0.1/*`. This is **not the untouched upstream manifest**; do not misrepresent it as such. It requests **no commercial-site access**. No personal Chrome, VPN, WinINET, payment or accounts changed.

Two actual owner-owned synthetic WebGL2 pages loaded in Chrome 157:

1. **X29 tiny fixture negative control:** 12 real `bufferData` invocations, zero retained buffers; the official hook saw them but rejected all below 4096 bytes, thus no export. This is direct experimental confirmation of the size-floor limitation.
2. **X31 original larger fixture:** a 32×16 indexed grid (512 vertices, 2790 indices = 930 triangles, 512 UV pairs, 512 normal vectors), with five separate `GL_POINTS`, and a one-triangle base drawn with 3 instances. Official hooks captured 4 buffers, `POSITION` (6144 bytes), `NORMAL` (6144 bytes), `TEXCOORD_0` (4096 bytes), indices (5580 bytes), 12 bufferData calls, reported 512 vertices and 930 triangles. The official `buildGLB` produced a **REAL BINARY GLB**, not a synthetic mock.

Owner GLB: `X31-OWN-Official-MeshGrab-1.1.1-GRID-EXACT.glb`
- **22,940 bytes**
- **SHA256:** `c69bd5f61c6d02c320d83439f0f9058b64b7e9a99970ef2aa571ecd918f37b30`
- Saved **privately on owner PC only** at `01-private-captures\X31\OWN-GLB-EXPORT`.
- Owner runner final status **SUCCESS**, zero issues, minimum measured free RAM **2,024 MiB**, hard 100 MiB emergency stop not reached.
- Captured output summary: 512 vertices / 930 triangles / normals + UV. Small points and three instancing copies are **not demonstrated as recovered**. A separate independent GLB decoder and Khronos validator are still required before declaring specific binary semantic checks PASS.

## Live-site status and interruption

A new X31 isolated Chrome 157 **90s read-only** script was generated from X30 and passed `node --check`. It loads official MeshGrab but **does not enable its hooks on `https://www.gladeye.com/`**. Public inspection is limited to passive draw-command modes/counts, first-party resource hashes and DOM/canvas metadata, with screenshots kept private. It never calls MeshGrab capture/export or saves public GLB/OBJ/texture/shader bytes.

The script was started on owner PC via Bridgerator (Windows process PID **4296**). **The Bridgerator remote PC then disconnected while the script was executing. No final 90-second completion result or saved timeline has yet been read back.** This means the user-requested fresh X31 90s observation is **UNVERIFIED**, not passed. Do not copy forward X30's 90-second facts as X31 results. Reconnect and inspect local `X31-90S-LIVE-READONLY-MESHGRAB-UNGRANTED-X01-X30-TIMELINE.json` and process outcome, then decide whether a retry is required. Never replay an uncertain write until its result is inspected.

## PC paths and GitHub synchronization gap

Root: `C:\Users\Mrn7206\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION`

Locally created:
- `02-reviewed-derived\X31-CURRENT\X31-OWN-LargeGrid-Points-Instancing-WebGL2.html` (original owner fixture)
- `02-reviewed-derived\X31-CURRENT\X31-Official-MeshGrab-Owner-MV3-Chrome157-Real-GLB-Capture.cjs` (original Chrome runner)
- `02-reviewed-derived\X31-CURRENT\X31-OFFICIAL-MESHGRAB-REAL-OWNER-CAPTURE-INDEX.json` (real result)
- `02-reviewed-derived\X31-CURRENT\X31-Build-Official-MeshGrab-Live-ReadOnly-Runner.cjs`
- `02-reviewed-derived\X31-CURRENT\X31-Official-MeshGrab-90s-LIVE-Public-ReadOnly.cjs`
- `01-private-captures\X31\OWN-GLB-EXPORT\X31-OWN-Official-MeshGrab-1.1.1-GRID-EXACT.glb` and private screenshots
- `01-private-captures\X31\PUBLIC-90S-READONLY` (await readback)
  
**Not yet verified**: independent binary validation, freshness/90s completeness, historical cross-stage gates, GitHub exact-byte mirror of all local source/derived files. The PC-connection loss interrupted those steps. Once online, read current local files, complete validation, publish only original owner source and sanitized JSON, and independently compare raw GitHub bytes/SHA256. Vendor/commercial original assets remain private/unexported.

## No-guessing completion gate

X31 DONE requires: reconnect/readback uncertain run; one real completed 90s timeline or truthful blockage; independent GLB binary decode + Khronos validation; X01–X30 provenance comparison; tests with exact counts and failures; local+GitHub code/derived evidence with SHA reconciliation; sanitized final handoff. **Until these conditions are met, X31 is PARTIAL.**
