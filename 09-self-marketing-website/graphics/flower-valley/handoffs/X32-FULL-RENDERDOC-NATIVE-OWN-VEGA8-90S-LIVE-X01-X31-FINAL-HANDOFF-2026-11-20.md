# DJMRN X32 FINAL — RenderDoc 1.47 hardware D3D11 owner capture, independent replay, Chrome ANGLE, fresh 90s live X01–X31 crosswalk

**Date:** 2026-11-20 UTC. **Status:** COMPLETE_SCOPE_QUALIFIED — **128/128 independent checks PASS**, no failed checks, native hardware capture and replay verified. No commercial website native RenderDoc injection/capture.

## 1. Canonical scope, new capability, official tool and free-first source

The [sequential EXTRACTION-RUNBOOK](../EXTRACTION-RUNBOOK.md) defines **X32 / E2** as: attempt local native GPU frame capture on an authorized **owner-created scene**, and verify browser ANGLE/native graphics API feasibility. It specifies **RenderDoc GUI 1.47** portable/extracted, without assuming native driver registration. X33 is separately reserved for RenderDoc-MCP replay integration.

Official source: [baldurk/renderdoc](https://github.com/baldurk/renderdoc), **MIT** ([official v1.47 LICENSE](https://github.com/baldurk/renderdoc/blob/v1.47/LICENSE.md)); observed annotated tag object `f259f1ea6c226a19f870a75d6b3b69b5182acc19`. **Actual installed executable:** `renderdoccmd x64 v1.47 built from b0e1370309f7d7bf986a73830446ca39d9b8c1fd`, returned exit 0. The local qrenderdoc.exe Windows metadata independently identifies v1.47; RenderDoc GUI launched and observed in a running desktop window. The existing files were already extracted from `RenderDoc-1.47-Windows-x64.msi`; **no new installer, update, purchase, license key, account, DLL replacement or driver install**.

Source and binaries:
`%LOCALAPPDATA%\DJMRN-Website-Toolkit\04-Specialists\RenderDoc-MSI-Extract\PFiles\RenderDoc\` (qrenderdoc.exe, renderdoccmd.exe, renderdoc.dll, renderdoc_app.h). Existing **w64devkit g++ 2.11.0** compiled original D3D11 fixture. Official upstream release warns about potential AMD Windows driver bugs, so complex shader-debugger reliability is not assumed.

**Vulkan gate:** `renderdoccmd vulkanlayer --explain` found a **missing system Vulkan layer registration** requiring Administrator and system registration. We did NOT register, change policies, modify graphics drivers/registry, disable Windows security or lower Chrome's GPU sandbox. **Native D3D11 succeeded without that change.** This is a specific untested Vulkan path, not an X32 GPU hardware failure.

## 2. Actual ORIGINAL Vega 8 hardware frame: owner-created D3D11 native workload

[Owner original C++ source](../scripts/X32-OWN-RenderDoc-Native-D3D11-Grid-Points-Instancing.cpp) uses Microsoft D3D11 APIs; no proprietary app code. The actual x64 compiled executable uses D3D11 hardware (no software/WARP fallback) and Windows feature level **0xb000 / 11.0**, on **AMD Radeon(TM) Vega 8 Graphics**. It renders:
- An indexed 32×16 grid (**512 vertices, 2790 indices, 930 triangles**);
- **5 points** in D3D11 `POINTLIST`;
- A 3-vertex triangle with **3 genuine instances** in `DrawInstanced`.

The authorized owner executable was launched with RenderDoc's own `renderdoccmd capture -w` and an **explicit private output path**. The injected RenderDoc API reported **1.7.0**, `EndFrameCapture result=1`, `numCaptures=1`, successful process **exit 0**. The captured file was saved as **`X32-OWN-D3D11-Vega8_capture.rdc`**, **44,495 bytes**, private on owner PC.

Independent proof beyond a file extension:
- `renderdoccmd replay -l 1 -w 640 -h 360 <owner.rdc>` **exit 0**.
- `renderdoccmd convert -f <owner.rdc> -c xml -o <private.xml>` **exit 0**, real **263,565-byte** output.
- `renderdoccmd thumb ... -f png <owner.rdc>` **exit 0**, actual **13,786-byte PNG**.
- XML identifies **D3D11 hardware**, AMD Vega 8 adapter, 34 native command chunks, 4 created buffers, live shaders and input layout, OMSetRenderTargets, ClearRenderTargetView, viewport, 3 primitive-topology switches, `DrawIndexed(IndexCount=2790)`, `Draw(VertexCount=5)`, `DrawInstanced(VertexCountPerInstance=3, InstanceCount=3)`, `IDXGISwapChain::Present`, and EndCapture. The program used a real color render target and live GPU draw calls. The GUI process was also opened using the captured owner file.
- **No original third-party model, frame or shader was captured**.

This demonstrates that **native D3D11 frame capture records POINTS and instancing command semantics** in the controlled owner fixture, while prior independent GLB exporters X29–X31 omitted such semantics for their separate owner WebGL2 fixtures. It does NOT prove GLB reconstructability, complete browser RenderDoc injection, vendor geometry retrieval or identical renderer pipelines.

[Official build, license, SHA and private artifact receipt](../evidence/X32-OFFICIAL-RENDERDOC-1.47-SOURCE-LOCAL-PREFLIGHT-AND-OWNER-RECEIPT.json)

## 3. Separate original owner Chrome157/ANGLE browser-backend probe

[Independent owner-only browser probe](../scripts/X32-OWN-Chrome157-ANGLE-D3D11-WebGL2-Feasibility.cjs) ran the X31 original 512-vertex WebGL2 page over `127.0.0.1` in an isolated Chrome-for-Testing 157 profile with `--use-angle=d3d11`, but **without bypassing Chrome GPU sandbox or injecting RenderDoc**. Real WebGL2 rendered 16 frames; unmasked renderer returned:

`ANGLE (AMD, AMD Radeon(TM) Vega 8 Graphics (0x000015D8) Direct3D11 vs_5_0 ps_5_0, D3D11)`

CDP reported AMD Vega 8 device and driver `31.0.21024.2004`. Probe completed `SUCCESS`, zero issues, minimum free RAM 2,303 MiB.

**Honest compatibility boundary:** Chrome's actual ANGLE=D3D11 backend is verified, and the separate native hardware D3D11 capture works; however, **a full RenderDoc capture of Chrome's GPU subprocess was NOT attempted or proven**. No `--disable-gpu-sandbox`, AppInit DLL system registry injection, admin policy change or untrusted Chrome-GPU hook was introduced solely to claim that feature.

[Actual ANGLE owner evidence](../evidence/X32-OWN-CHROME157-ANGLE-D3D11-WEBGL2-FEASIBILITY.json)

## 4. New true 90-second PUBLIC site comparison, fully read-only

A new anonymous isolated Chrome157 public observer visited `https://www.gladeye.com/`, with **NO RenderDoc injection and NO extension capture**. It reused the historically proven own draw-call read-only CDP/Playwright observation schedule; phase labels are **input windows, not proven causes of proprietary animation**.

Measured **90.00 seconds** after page WebGL2+Three.js r154 readiness, **7 real windows**, **zero errors** and min free RAM **1,410 MiB**, safely above the 100MiB user emergency guard. No Windows proxy/VPN changes; only isolated Chrome `--no-proxy-server` for network readiness.

| Phase | Observed second | Cumulative instrumented WebGL draws |
| --- | ---: | ---: |
| Initial | 3.42 | 0 |
| Hover left | 16.59 | 1,936 |
| Hover right | 29.63 | 12,560 |
| Scroll +450 | 42.48 | 23,344 |
| Pointer center | 55.57 | 35,104 |
| Scroll -450 | 72.47 | 50,048 |
| Return idle | 87.54 | 63,584 |

Three **distinct GPU primitive signatures** after warmup: indexed `POINTS count 960000`, indexed `TRIANGLES count 6`, array `TRIANGLES count 3`. Distinct signatures **are not 3 draw calls/frame**; X28 remains authoritative for 16 draws/frame, 11 GPU programs and 22 shader hashes. `960000` is **GPU submitted indices, not 960000 flowers**.

Compared directly with original X19 first-party URL/body baselines and X16 initiator graph: **46 previously known paths**, **38/38 exact original response-body SHA256+bytes**, **37 known initiator edges**, **0 new paths/edges**. Two screenshots remain strictly private and were independently SHA/size checked. No vendor GLB, shader body, texture pixels or GPU pipeline capture performed.

[Actual X32 public 90s result](../evidence/X32-90S-LIVE-READONLY-RENDERDOC-NO-VENDOR-INJECTION-X01-X31-TIMELINE.json) | [Reproducible passive runner](../scripts/X32-Native-RenderDoc-Feasibility-90s-Public-ReadOnly.cjs) | [Original runner builder](../scripts/X32-Build-90S-Public-ReadOnly-Runner.cjs)

## 5. Independent acceptance, X01–X31 continuity, limitations

[Independent runnable Python source](../scripts/X32-Independent-Owner-RenderDoc-90S-Live-X01-X31-Acceptance.py) parsed real XML/RDC/PNG and new live timeline, verified hardware adapter, native draw signatures/instance counts, preservation of the X31 fixture ground truth, ANGLE renderer, no sandbox changes, exact screenshot hashes and previous X27–X31 acceptance status; also checked the existence of all X01–X31 reviewed-derived local stages.

**128 distinct checks, 128 PASS, 0 FAIL; Python exit 0.** The previous original stage gates remain **X27 49/49, X28 58/58, X29 88/88, X30 96/96, X31 121/121**.

[128/128 independent JSON receipt](../evidence/X32-INDEPENDENT-X01-X31-NATIVE-RENDERDOC-REAL-90S-ACCEPTANCE.json).

**Known bounded limitations:** GUI RenderDoc opened owner capture and CLI replay succeeded, but no independent full per-shader debugging/texture-pixel history proof; Chrome GPU-subprocess RenderDoc capture **NOT TESTED**; Vulkan layer requires admin registration **NOT AUTHORIZED/PERFORMED**, AMD Windows driver known upstream caveat; actual original proprietary client-source geometry and shader causality remain UNVERIFIED. No paid charges, credential access, consumer-browser permissions, GPU-sandbox relaxation, global VPN modifications or publication.

## 6. Private/public storage and handoff

Owner PC root: `C:\Users\Mrn7206\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION`

- `01-private-captures\X32\OWN-RENDERDOC`: owner compiled EXE, **original private 44,495-byte RDC**, converted XML, thumbnail, GUI screenshot and Chrome owned test profile. They are not uploaded to public GitHub.
- `01-private-captures\X32\PUBLIC-90S-READONLY`: private site screenshots, isolated Chrome profile.
- `02-reviewed-derived\X32-CURRENT`: verified original owner source, passive runner/build script, preflight, sanitized evidence, checks and this handoff.

GitHub `09-self-marketing-website/graphics/flower-valley/`: publish only own reproducible scripts, derived numerical JSON, cross-stage acceptance, manifest and final handoff in established `scripts/`, `evidence/`, `handoffs/`. This work makes **X32 complete for its specified native owner GPU capture and browser backend feasibility**; not an unrestricted vendor-site scene export.

**Next conditional stage from existing plan: X33 RenderDoc-MCP real replay linking.** The previously downloaded MCP bundle includes a different RenderDoc core version 1.43, so full 1.47 RDC compatibility must be tested before claiming successful agent replay, and DLL-swapping must not be used to force it.
