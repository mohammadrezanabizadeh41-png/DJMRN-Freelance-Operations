# DJMRN — X21 Technology / Renderer / Authoring Pipeline Triangulation

**Date:** 2026-11-20  
**Stage:** X21 / E1/E5  
**Local execution state:** \`COMPLETE_SCOPE_QUALIFIED\` — 45/45 SHA/evidence/coverage assertions passed.  
**Scope qualification:** Publicly delivered client, browser WebGL context, one captured camera GLB, existing X14–X20 source evidence only. X22 Spector GPU command tracing and proprietary backend/source recovery **not part of X21**.  
**GitHub:** Public owner-authored handoff in the project stage lineage; original vendor material remains private on owner's laptop.

## 1. Preflight, tools and activation

The live Runbook defines X21 as *triangulating client engine vs. authoring technology vs. backend*, using **DevTools + X14–X20 + package fingerprints**, and requiring per-claim **CONFIRMED / PROBABLE / UNKNOWN**, signatures and counterevidence. Existing installed capability fully satisfied it; **no additional program, Chrome extension or MCP integration was needed or installed**.

- **Observer:** existing Chrome for Testing **157** and Puppeteer **25.16.0** (isolated, anonymous, extensions disabled, GPU enabled, TLS checks enabled). A fresh 5-checkpoint public home/work browser probe was activated and finished in approximately **15 seconds**, 0 runtime errors, 842 MiB minimum monitored free Windows RAM, owned browser cleaned.
- **Classifier:** the existing GPL-3.0 **HTTPArchive/wappalyzer** fork at source commit \`35b0847c01c118055c42596d5c6d01f60f15d706\`, initially live-tested in X14. Classifier evidence is corroborated, not accepted as absolute.
- **Offline analysis and provenance:** X19 SHA-verified original 34 client JS bodies, webcrack 2.16.0 derived modules, X20 REA 6.9.0 evidence, Wakaru 1.17.0 strict Webpack comparison, ast-grep 0.51.3 source-pattern results, and X20 RSC decoder outputs. No vendor JS was executed by Node or a model; the website runs only in ordinary isolated Chromium.
- **Policy:** 100 MiB free-RAM emergency threshold, one browser at a time, 60-second browser watchdog, public browsing only, no secret/cookie/header capture, no paid API, no installation of Spector (reserved for X22), no system security changes.

Upstream primary documentation: [HTTPArchive Wappalyzer source](https://github.com/HTTPArchive/wappalyzer), [Chrome CDP](https://chromedevtools.github.io/devtools-protocol/), [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer), [Next.js 13 App Router and RSC](https://nextjs.org/docs/13/app), [Khronos Blender glTF Exporter](https://github.com/KhronosGroup/glTF-Blender-IO), [glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.pdf).

## 2. Findings with bounded confidence

| Layer / question | Conclusion | Evidence class | Caveat |
| --- | --- | --- | --- |
| Frontend framework | **Next.js 13.4.19, App Router active** | **CONFIRMED** | Five live \`window.next.version=13.4.19\`, \`appDir=true\` states; exact \`window.next\` version marker in X19 SHA-verified original JS; X14 header/Wappalyzer agrees |
| Frontend architecture | **React plus Next.js RSC** | **CONFIRMED** | X14 React signal; X21 home \`__next_f\` RSC carrier; X20 Wakaru decoded 24 /work rows, 23 asset refs, 5 script refs |
| Bundler | **Webpack 5-style chunks** | **CONFIRMED** | \`webpackChunk_N_E\` live 5/5; 22/22 Wakaru strict-vs-X19 webcrack page module IDs identical |
| 3D runtime library | **Three.js r154 in home client** | **CONFIRMED** | Three's internal \`window.__THREE__='154'\` live 3/3 home observations, matched to SHA-verified X19 engine module 6375 and X14 Wappalyzer |
| Graphics context | **WebGL 2.0 and GLSL ES 3.00 context** | **CONFIRMED** | Three home Canvas contexts were queried directly through normal read-only browser code, 1280×720 drawing buffer |
| Shaders | **Vertex and fragment GLSL templates in delivered JS** | **CONFIRMED source presence** | Verified module 4059 has multiple shader properties and GLSL vertex/fragment statements; no actual GPU program/pass mapping until X22 |
| Postprocessing effects | **Bloom/glow-related scene pipeline candidates** | **PROBABLE** | X19 verified modules 4059/889 contain bloom and shader/uniform signatures, but presence in bundle does not prove a particular frame renders the effect |
| Asset loaders | **glTF plus Draco decoder/loading support** | **CONFIRMED code presence** | Modules 889/4863; the specific camera GLB lists no Draco extension, so do not claim camera file compressed with Draco |
| Renderer performance | **Instancing API provided by bundled Three.js runtime** | **CONFIRMED capability** | The engine includes InstancedMesh/InstancedBuffer code, but active flower instances/draw-call counts not observed |
| DOM motion | **Home animation activity increases upon interaction** | **CONFIRMED observation** | 7 → 42 \`document.getAnimations()\` objects across home samples; cannot conclude specific animation middleware or per-frame camera motion |
| CSS system | **Tailwind-like generated CSS** | **PROBABLE** | Independent X14 CSS fingerprint only; no exact Tailwind version or authored design system extracted |
| Public delivery | **Vercel response headers, Next.js header** | **CONFIRMED delivery evidence** | Does not prove which backend server/runtime/database serves all requests |
| Backend/DB/Node runtime | **Unknown** | **UNKNOWN** | Node.js inferred from framework is not backend provenance |
| Exact React version | **Unknown** | **UNKNOWN** | No reliable direct version string |
| GSAP / Framer Motion / precise animation engine | **Unknown** | **UNKNOWN** | No authenticated package identity or active function attribution |
| react-three/fiber / Drei | **Unknown** | **UNKNOWN** | React+Three co-presence does not prove these wrappers |
| Microfrontends / Module Federation | **Unknown** | **UNKNOWN** | X14 signature can false-positive on generic Webpack data |
| GPU draw programs/pass chain | **Unknown** | **UNKNOWN** | Requires X22 frame capture with Spector after owner fixture validation |

**Critically, browser-reported GLSL ES 3.00 describes the active WebGL2 context, *not* the source language generation or compile result for every custom site shader.** Generic code present in the runtime is never treated as definitive active scene usage.

## 3. New authoring/exporter evidence directly from an existing GLB

Previous canonical source: \`https://www.gladeye.com/valley/camera-path07.glb\`. Original 10,132-byte GLB was SHA-verified against X01–X19 authority (**SHA256 \`dab4459358d8d22ec633152119ec9939947336a0f116c7aca746407403630d4e\`**), then the glTF JSON and typed animation accessors were independently decoded **offline without executing a file**.

- glTF **2.0**; \`asset.generator = Khronos glTF Blender I/O v3.2.43\`. This confirms the file's **Blender glTF exporter**. It does **not** establish the Blender desktop application's version or that any other model came from Blender.
- One perspective camera; vertical FOV **22.89519°**, aspect **16:9**, z-near **0.1**, z-far **1000**.
- One animation named \`Action.001\`: three \`translation\`, \`rotation\`, \`scale\` channels, **200 LINEAR keyframes per channel** between **0 and 8.291667 seconds**. Scale remains [1,1,1]; the original camera trajectory is *only a reference for an original independent path*.
- The GLB includes no \`extensionsUsed\` and no meshes. It proves an exported animated camera, not exported flower geometry or Draco compression.

This is **additional X21 structured evidence about a previously known original GLB**, not a newly downloaded site asset.

## 4. Route separation and rebuild design implications

Live home: one **1280×720** WebGL2 Canvas and a small DOM shell; client-side Three.js module present and active WebGL context. Live \`/work\`: no Canvas during the two recorded samples, while the page has many HTML image and heading elements and normal scroll. X20 already observed 52 repeated URLs, zero new URL paths and 50/50 initiator edges repeating X16.

A *simple original* implementation direction is a modular Next/React site with a route-specific WebGL2/Three hero component and separate DOM-heavy portfolio pages. Use a glTF-compatible 3D camera path authored independently. Shader and glow refinements require prototype measurement. There is no evidence-based reason yet to adopt a backend DB, multi-agent architecture, microfrontends, GSAP, react-three/fiber or a Blender install as prerequisites for the X21 **analysis** task.

## 5. Evidence and acceptance

On the owner's laptop:
- \`02-reviewed-derived/X21-CURRENT/X21-LIVE-READONLY-TECH-AND-WEBGL-STATE.json\` — read-only runtime observations; no raw site code.
- \`02-reviewed-derived/X21-CURRENT/X21-TECHNOLOGY-AND-FACTORY-EVIDENCE-MATRIX.json\` — **20 claims: 11 CONFIRMED, 2 PROBABLE, 7 UNKNOWN**, with supporting provenance and counterevidence.
- \`02-reviewed-derived/X21-CURRENT/X21-INDEPENDENT-ACCEPTANCE.json\` — **45/45 checks** spanning SHA, WebGL, Next/Three versions, original GLB export, RSC, shader definitions and evidence limits.
- \`02-reviewed-derived/X21-CURRENT/X21-Live-ReadOnly-Technology-Probe.cjs\` and \`X21-Independently-Triangulate-Technology.py\` — owner-authored reproduction scripts.

The existing **78 normalized URL paths / 72 network-observed / 6 offline-derived** authority was not modified. X22 and X23 GPU metadata captures are **separate** and were not triggered. **X21 is locally complete for its defined and bounded research scope**, without asserting a complete private-site reconstruction.

