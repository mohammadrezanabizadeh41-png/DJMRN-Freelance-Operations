# DJMRN X33 FINAL — RenderDoc MCP v0.3.0 authentic owner Vega 8 Replay and X01–X32 90-second public-only comparison

**Date:** 2026-11-20 UTC. **Status:** COMPLETE_SCOPE_QUALIFIED. **123/123 independent checks PASS.** No new software or driver installed, no proprietary third-party GPU asset captured/published.

## 1. What X33 does (as specified, not invented)

Existing canonical [extraction runbook](../EXTRACTION-RUNBOOK.md): **X33 / E2** = independently test `RenderDoc MCP v0.3.0` on a genuine **owner-created GPU capture** obtained in X32, verify actual MCP client ↔ server linking and native GPU replay, and distinguish genuine open/draw/pipeline data from a superficial `tools/list` success. It explicitly warns of **RenderDoc version 1.43 bundled by MCP vs capture made with RenderDoc 1.47**; demands genuine replay or specific `BLOCKED_GPU/FILE_VERSION`, and prohibits forced DLL version swaps. X34 remains separate as the next animation/glTF analysis stage.

**Original upstream:** [JiaboLi-GitHub/renderdoc-mcp](https://github.com/JiaboLi-GitHub/renderdoc-mcp), MIT, [official v0.3.0 release](https://github.com/JiaboLi-GitHub/renderdoc-mcp/releases/tag/v0.3.0), release published 2026-04-02; tag commit `50fd55cade854ed24ce8c853fd2dbda04a4b0bdb`. The existing **20,660,742-byte zip** `renderdoc-mcp-windows-x64-v0.3.0.zip` was verified using the **official published .sha256 release manifest** with exact SHA-256:

`08cc5ffe4a9eeb34308096e72830461b36d81102fd9f1477cebcb6179e8f6e02`.

Bundled source README v0.3.0 documents **52 MCP tools**; newer upstream master documentation may mention **59 tools**, but **that is not the installed v0.3.0 inventory**. Current officially listed v0.3.1 is a distinct later release (2026-04-10), but was **not installed**: the already-installed free MIT version met this trial's real use case. No paid plan/credit/payment is relevant.

**Already installed on PC:** `%LOCALAPPDATA%\DJMRN-Website-Toolkit\04-Specialists\RenderDoc-MCP-v0.3.0-Prebuilt\app\renderdoc-mcp-windows-x64-v0.3.0\bin` includes exact release `renderdoc-mcp.exe`, `renderdoc-cli.exe`, private bundled 1.43 `renderdoc.dll`, `renderdoc.json`. The Codex installer `install-codex.ps1` was reviewed but **NOT executed**; no permanent Codex user config, PATH, skill folder, ChatGPT permission or global settings were changed. Only a task-scoped, actual Python MCP client started the local stdio server and used it, then cleanly closed it. No RenderDoc DLL replacement, no admin rights, no Vulkan registry modification.

## 2. Actual 1.47 → 1.43 cross-version GPU replay: WORKS FOR THIS FILE

X32's **real owner-created**, hardware-D3D11 original capture is the 44,495-byte `X32-OWN-D3D11-Vega8_capture.rdc` (owner-PC only). Its SHA-256 is `b5fe755c5085eae72ee54347656afac070521cf78ffdabadcfa1605ddd8ddae4`.

**First independent CLI trial**: bundled `renderdoc-cli.exe` 1.43 opened this capture, `info` returned **D3D11 / degraded=no / 5 events / 3 draws**, exit 0. `draws` listed event 10 2790 indices, event 13 five points, event 16 three instances. `resources` returned eleven GPU resources, four actual buffers of 14,336 / 5,580 / 140 / 84 bytes; target `768×480 R8G8B8A8_UNORM`. `pipeline -e 2` returned VS=46 and PS=47 (main) with a valid render target; `pass-stats` returned one synthetic RT0 pass, three draws, and dimensions. Original screenshot/GPU data stayed private on PC.

**Second, genuine MCP protocol trial**: original owner-created [stdio JSON-RPC client](../scripts/X33-Real-RenderDoc-MCP-Owner-RDC-JSONRPC-Client.py) launched **the actual binary** `renderdoc-mcp.exe` using private local pipes and verified:

- `initialize` protocol 2025-03-26 succeeded; running MCP server advertised 52 real tools. The server reports internal version `1.0.0`, which is its serverInfo version; **not** a contradiction of the package tag v0.3.0.
- **21 actual `tools/call` requests** successfully returned structured results, not merely a static tool list: `open_capture`, `get_capture_info`, `list_draws`, `list_events`, `get_pipeline_state` (two event positions), `list_resources`, `get_stats`, `get_log`, `get_draw_info` (EIDs 10/13/16), `goto_event`, `get_bindings`, `get_shader` (VS/PS reflection), `list_passes`, `get_pass_statistics`, `get_pass_deps`, `get_resource_info`, `pick_pixel`.
- **Real GPU replay content:** 5 events, indexed grid 2790 indices/930 triangles, 5 points, instanced triangle draw `VertexCountPerInstance=3` and `InstanceCount=3`; these exactly match independently decoded X32 native D3D11 XML original `DrawIndexed / Draw / DrawInstanced`.
- Actual **11 resources**, 4 original buffers and `768×480` swapchain. Pipeline identifies Vertex Shader `ResourceId::46` and Pixel Shader `ResourceId::47`, each entry `main`; VS reflection contains original `SV_InstanceID`. Pixel shader's output semantic is `SV_Target`.
- `get_pass_statistics` sees one synthetic pass, 3 draws, 1 attachment. The reported tool heuristic `totalTriangles=934` **does not equal** independently known owner geometry **930 grid + 3 instanced = 933 triangle instances** (5 points are not triangles). This discrepancy is kept explicitly as a **tool-statistic interpretation limit**, not hidden.
- `pick_pixel(event=16, x=4,y=4)` returned original-own framebuffer RGBA float approximately `0.0392,0.0706,0.1412,1.0`; original clear color in C++ `0.04,0.07,0.14,1.0`. 0 GPU debug messages returned. **This is a real GPU pixel query, not an inferred visual effect from website screenshots.**

No forced compatibility workaround. Real 1.43 runtime replay of the specific 1.47 RDC therefore works; **general backward compatibility for every RDC is still UNVERIFIED**.

[Public, numerically sanitized X33 GPU replay/ANGLE comparison](../evidence/X33-SANITIZED-AUTHENTIC-MCP-REPLAY-90S-X01-X32-CROSSWALK.json). Private full JSON-RPC transcript never published.

## 3. Fresh actual 90-second GLadeye public observation, cross-reference X01–X32

Separate new Chrome157 isolated **read-only numerical** observer (no RenderDoc MCP injection or capture of the commercial process) visited `https://www.gladeye.com/` and observed **90.01 actual seconds** after WebGL2/Three r154 readiness; real Playwright cursor/scroll events, seven timestamped snapshots, zero errors, and **minimum 1199 MiB free RAM**, safely above hard stop 100MiB. Only isolated Chrome's `--no-proxy-server` option was used: **system VPN/proxy remains unchanged**.

| Phase | Real second | Cumulative instrumented WebGL draw submissions |
| --- | ---: | ---: |
| Initial | 3.41 | 0 |
| Hover left | 16.56 | 5,408 |
| Hover right | 29.58 | 17,520 |
| Scroll +450 | 42.48 | 29,712 |
| Pointer center | 55.55 | 42,048 |
| Scroll -450 | 72.48 | 58,224 |
| Return idle | 87.55 | 72,528 |

After warm-up, three known **distinct primitive signatures** (not three draws per frame) remain consistent with history: `POINTS drawElements(960000 indices)`, `TRIANGLES drawElements(6)` and `TRIANGLES drawArrays(3)`. X28's independent real per-frame authority remains **16 draw calls per frame**. The 960000 indices are **not independently verified flower count**.

First-party resource comparison to X19 original body archive: **46 known URL paths**, **35/35 exact original body SHA-256+size**, zero previously unknown URL paths. X16 initiator graph: **37 known edges**, zero new. The smaller sampled 35 hash-verified bodies vs X32 38 is a fresh-session coverage difference, not evidence of missing original files. Two site screenshots and all raw vendor assets remain private only, no proprietary model/GLB/texture/shader source published.

[New X33 90-second safe metadata evidence](../evidence/X33-90S-LIVE-READONLY-RENDERDOC-MCP-NO-VENDOR-INJECTION-X01-X32-TIMELINE.json) | [Reproducible public passive observer](../scripts/X33-RenderDoc-MCP-90s-Public-ReadOnly.cjs)

## 4. Independent historical test gate

A separate [owner-origin source verifier](../scripts/X33-Independent-Real-MCP-Private-Source-To-Public-X01-X32-Audit.py) actually parses **private MCP raw JSON-RPC**, native X32 XML, the real RDC/ZIP SHA256, 90-second live evidence, private screenshot SHA, X19/X16 hashes and previous stage records. Results:

**123/123 independent checks PASS**, zero failed; stable derived JSON ties its timestamp to X33 original observation, not acceptance reruns. Historical X27 49/49; X28 58/58; X29 88/88; X30 96/96; X31 121/121; X32 128/128 records remain intact and validated. X1–X32 derived local stage file presence verified. The resulting public artifact retains **no private source path, raw proprietary shader, full frame, client credential or original capture payload**.

[Independent X33 123/123 acceptance](../evidence/X33-INDEPENDENT-X01-X32-MCP-REPLAY-AND-LIVE-ACCEPTANCE.json).

## 5. Storage, authority, security and next step

Owner-PC root:
`%USERPROFILE%\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION`

- `01-private-captures\X33\OWN-RENDERDOC-MCP`: full original JSON-RPC tool reply transcript, local-only replay source and owner test state.
- `01-private-captures\X33\PUBLIC-90S-READONLY`: private browser profile and real raw screenshots.
- `02-reviewed-derived\X33-CURRENT`: runnable owner-authored scripts, safe summaries, independent acceptance, PC-GitHub exact bytes receipt and final report.
- Existing `01-private-captures\X32\OWN-RENDERDOC`: original private `X32-OWN-D3D11-Vega8_capture.rdc`, original GPU XML and thumbnail; not republished or modified.

Canonical published derived code/reports are under established GitHub `09-self-marketing-website/graphics/flower-valley/` (`scripts/`, `evidence/`, `handoffs/`); existing [PROJECT-LOG.md](../../../PROJECT-LOG.md) and extraction runbook are the only running status authorities. No new plugin/account install, purchases/credits, system security changes, production deployment, Codex user profile modification or external output publication. No commercial original GPU render capture is claimed.

**Scope status: X33 COMPLETE_SCOPE_QUALIFIED** (actual stdio MCP↔owner hardware GPU Replay, 21 meaningful tool calls, safe 90.01s live crosswalk, 123/123 acceptance). **X34 NEXT**: only publicly available or owned/authorized camera/animation/glTF metadata and standalone viewer/validator tests. No pre-authorized vendor asset reconstruction.
