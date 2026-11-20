# DJMRN — X22 Spector.js on OWN fixture + Public WebGL2 GPU frame capture

**Date:** 2026-11-20 · **Stage:** X22 / E2  
**Status:** \`COMPLETE_SCOPE_QUALIFIED\` — independent **35/35 checks PASS**.  
**Scope:** Reuse and verify the installed official Spector.js MV3 extension, run a loopback OWN WebGL2 fixture first, then capture startup and warm/steady normal public-page WebGL2 frames of \`https://www.gladeye.com/\`, and reconcile all novel GPU evidence with X01–X21.  
**Next:** X23 Ispettore independent comparable GPU observation, if owner asks. No extension enabled permanently in personal Chrome, no private shader/body published.

## Why X21 did not need another 90-second general scan

X21 live runtime verification took about 15–17 seconds for direct WebGL2/Three/Next introspection; it did **not** itself contain a 90-second browser session. However X14 had already performed 180.28 seconds of full-resource Wappalyzer/Chrome observation, and X20 another 90-second anonymous CDP browser observation and 34/34 prior stage reconciliation. A third non-GPU browser sweep would duplicate URL/technology evidence. X22's **new GPU command and shader-program evidence** is more relevant and material than repeating a network path scan.

## Verified official free tool and safety boundary

Official upstream: [BabylonJS/Spector.js](https://github.com/BabylonJS/Spector.js) MIT license. GitHub latest official release **v0.9.33, dated 2026-09-14**, official 714810-byte asset \`spectorjs-extension-v0.9.33.zip\`. Previously downloaded owner ZIP was already present, SHA-256 \`70d7f0f31ffe7c6ad422ba23fb2dd1414d2120df5a5917236c34a015d6700a79\`. **All 22/22 ZIP entry bytes match the already extracted extension folder by SHA-256.** Its manifest reports MV3 version 0.9.33; bundle \`spector.bundle.js\` is **1,193,487 B**, SHA-256 \`cece563b656a223347af27c9f1db97c3c0225b01f2f5b400cd9deeb1b5958cca\`.

The official extension manifest has broad host permissions for HTTP(S). The extension was **not connected to personal Chrome** and permissions were **not changed globally**. It was loaded only in an **isolated dedicated Chrome for Testing 157 profile**, with an extension service worker actually observed active and capture library API validated. The anonymous Chrome process was closed after each bounded test. Node 24 and existing Puppeteer 25.16.0; no new packages, no paid provider, no account/cookie/authorization capture, no \`isolated-vm\` execution of vendor bundles. Emergency RAM stop at **100 MiB**, one browser at a time.

## OWN loopback fixture — prerequisite before touching the reference

Local original minimal WebGL2 animated triangle at \`127.0.0.1\`: **PASS** in roughly 4 seconds. Spector successfully captured 7 GL commands (\`viewport\`, \`clearColor\`, \`clear\`, \`useProgram\`, \`uniform1f\`, \`bindVertexArray\`, \`drawArrays\`) including **one real draw call**. GPU context GLSL ES 3.00, extension service worker true; min free RAM **1642 MiB**, no issues.

## Original reference page: two sequential successful captures

| Metric | Initial/cold capture | Warm/steady capture after ~11 seconds |
| --- | ---: | ---: |
| Spector total intercepted WebGL2 commands | **1,135** | **137** |
| Actual draw calls (not \`drawBuffers\`) | **16** | **16** |
| Active distinct program IDs | **11** | **11** |
| Distinct FBO IDs in draw graph | **12** | **12** |
| Final default backbuffer draw | **1** | **1** |
| \`createProgram\` | **11** | **0** |
| \`createShader\` | **22** | **0** |
| \`createTexture\` | **15** | **0** |
| \`createFramebuffer\` | **12** | **0** |
| Spector errors | **0** | **0** |
| Lowest monitored Windows free RAM | **894 MiB** | **761 MiB** |
| Elapsed browser-run wall-clock time | **12 s** | **17 s** |

Both frames have the **same 16 drawing signatures** (primitive, element count, program ID, framebuffer ID). The marked drop in total intercepted commands is due to captured resource setup in the first run, absent from the warmed run; **the Spector-instrumented capture duration is not a trustworthy uninstrumented GPU frame time or FPS**. Both captures used the same 1280×720 WebGL2 Canvas, confirmed \`window.__THREE__='154'\` and \`window.next.version='13.4.19'\`. Context renderer strings are generic \`WebKit WebGL\`/\`WebKit\`, **not a verified physical GPU brand**.

## GPU draw graph: newly established live facts

1. **Scene point-render:** initial \`drawElements\` with \`POINTS\`, \`count=960000\` (UNSIGNED_INT indexed points). This confirms **960,000 point indices in one draw**, not 960,000 unique flowers, models or objects.
2. **Overlay/vignette candidate:** another \`drawElements\` TRIANGLES with 6 indices, active \`uVignetteTexture\`, \`uShrinkFactor\`, \`uScreenResolution\`.
3. **Luminance threshold:** \`drawArrays\` TRIANGLES 3 vertices, active \`luminosityThreshold\`, \`smoothWidth\`, \`tDiffuse\`.
4. **Multilevel blur:** ten \`drawArrays\` TRIANGLES 3-vertex calls across five repeated program pairs, with \`texSize\`, \`direction\`, \`colorTexture\` uniforms. This is direct draw-graph corroboration for separable blur-style processing.
5. **Bloom combine:** one 3-vertex pass, active \`bloomStrength\`, \`bloomRadius\`, \`bloomFactors\`, \`bloomTintColors\`, and \`blurTexture1…5\`.
6. **Composition:** one 3-vertex pass with \`opacity\`/\`tDiffuse\`.
7. **Final noise output:** 3-vertex pass, active \`uNoiseDensityThreshold\`, \`uNoiseAlpha\`, \`intensity\`, \`time\`, \`tDiffuse\`. The final pass is associated with the default backbuffer.

**Shader and state evidence:** 22 shader compilation records in startup, all reported \`COMPILE_STATUS=true\`; 11 distinct WebGL program IDs referenced by draws; 62 unique active uniform names; state snapshots include blend, depth, scissor, color and framebuffer attachment metadata. Original shader source strings and translated GPU compilation content are retained **only in private original raw captures**.

## X01–X21 reconciliation: novel evidence vs re-observation

Prior X01–X19 original URL and SHA canonical authority remains **78 normalized paths** (72 observed network, 6 offline derived), **no new site resource path discovered** in X22. All 34 original X19 client JS bundles were SHA-verified again. **62/62 GPU-active uniform names** were already present in the X19 originals, so they are *not* newly downloaded JS/source objects. What is newly evidenced is their **active program ownership, real GPU invocation, target/framebuffer sequence and draw primitive topology**. X19 candidate shader/lighting modules \`889\`, \`4059\`, \`6375\` and X20 AST/REA indicators were previously static; X22 provides a new independent GPU observation channel.

Previously \`bloom\` was only **PROBABLE** in X21. X22 now **CONFIRMS an active bloom-related luminance threshold + multilevel blur + bloom-composite pipeline in the observed frame**. It does not independently prove the exact original authoring project, all shader variants or which rendering passes always occur under every scene interaction.

**Evidence identity restrictions:** The initial/steady frames do not add new HTTP response bytes, URLs, source maps or independent authored source files. The 13 render targets seen are **12 distinct WebGLFramebuffer IDs used in the captured draws plus the default backbuffer**, not 13 newly created FBOs. The initial capture issued 12 createFramebuffer calls. Time markers are instrumentation timing only.

## Acceptance, local paths, security and follow-up

Independent owner script \`X22-Independent-GPU-Frame-Reconcile.py\` passed **35/35 checks** covering official ZIP 22/22 entry SHA, MV3 version, fixture success, initial and steady raw capture hashes, exact draw count/signature alignment, source 34/34 JS rehash, 62 active uniforms in previous client JS, Bloom-specific runtime evidence and unchanged path authority.

All artifacts on laptop under:
- **Private:** \`01-private-captures/X22/\` — 12.76 MB cold raw capture, 0.33 MB warm raw capture, own fixture capture, SHA-provenance full uniform/script crosswalk. These contain third-party shader sources and MUST NOT be published wholesale.
- **Derived:** \`02-reviewed-derived/X22-CURRENT/\` — standalone own WebGL fixture, two Node capture sources, own fixture acceptance, both bounded public-frame metadata reports, independent reconciliation, independent 35/35 acceptance, this handoff. Each report lacks raw vendor shader/texture/pixel content.

The site has been inspected by Spector.js with a real hardware/browser WebGL2 context label but physical GPU model identity and performance time should be treated as **UNKNOWN** until separately corroborated. Third-party extension's host permissions remain limited to its **isolated** Chrome profile. X22 was executed, not just staged.

**Final:** \`COMPLETE_SCOPE_QUALIFIED\`. **Next X23** Ispettore independent confirmation (not automatically activated in this task). This handoff is published as owner-authored, public-safe project evidence; no raw third-party GPU content is published.
