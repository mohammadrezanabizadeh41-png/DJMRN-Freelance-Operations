# DJMRN — X27 FULL HANDOFF: Official GLSL Shader Editor, OWN Shader live-edit proof, 90-second read-only GLSL observations and X01–X26 crosswalk

Date: 2026-11-20. **Status: COMPLETE_SCOPE_QUALIFIED_LEGACY_MV2_SOURCE_ONLY / OWN_SHADER_EDIT_PASS / LIVE_90S_PASS. 49/49 independent acceptance PASS. X28 NEXT.**

## Official upstream source, installation and compatibility

- Official GitHub https://github.com/spite/ShaderEditorExtension ; pinned revision 564f6c1922b1dcf98813e6940d1e91995495e6dc ; MIT license.
- Independently downloaded official pinned ZIP: **5,315,076 bytes, SHA256 a31afb158856c00d0837a75cf91055d50d9327779366e86a7bfcf4e758194d74**, 43 official extracted files in existing owner local toolkit at LOCALAPPDATA/DJMRN-Website-Toolkit/04-Specialists/Sources/ShaderEditorExtension/source-564f6c1922b1. Earlier original ShaderEditorExtension-master snapshot retained untouched.
- Extension v1.0.17 **Manifest V2**. Permissions http://*/*, https://*/*, webNavigation, storage; content_script matches all URLs in all frames. Chrome for Testing 157 cannot execute original Manifest V2: official https://developer.chrome.com/docs/extensions/develop/migrate/mv2-deprecation-timeline . Upstream original is **SOURCE_ONLY / LEGACY_INCOMPATIBLE**. No unsafe MV2 bypass, downgrade, forced port, permission increase or personal Chrome installation.
- Functional alternative uses pre-existing isolated Chrome for Testing 157 and Puppeteer; original owner-written WebGL2 compile/relink and passive on-document-start source digest observer. No new paid tooling, model API, package installation, OS policy or Chrome-wide permission change.

## Working OWN WebGL2 GLSL editor proof

- The fixture X27-OWN-WebGL2-Live-Shader-Editor-Fixture.html contains completely ORIGINAL owner-authored GLSL ES 3.00 vertex+fragment source for a full-screen canvas.
- Actual WebGL2 pixels: initial Shader red center [255,0,0,255]; valid fragment source hot-edit compiled and linked green [0,255,0,255]; intentionally invalid source correctly **rejected**, maintaining existing green pixel [0,255,0,255]; original valid red source reapplied and rendered [255,0,0,255].
- This demonstrates live compile, shader replacement, error detection, no-break rollback and recovery **ONLY on the OWN fixture**; never edited the commercial site's GLSL or installed old extension in site browser.

## Actual public live investigation — 90 seconds

- Public homepage https://www.gladeye.com/ visited anonymously in isolated Chrome157 at 1280x720, **90.00 continuous observed seconds**; 7 discrete source/compiler/program windows at baseline, pointer-left, pointer-right, wheel450, pointer-center, wheel800, pointer-reverse.
- Web Crypto SHA256 of original GL shaderSource arguments computed **inside the browser**, only source digests/UTF8 source lengths/line counts, shader kind and compile status/program attachment and link outcomes saved. No raw proprietary vendor GLSL was transmitted to output files.
- Every one of 7 windows contained **22 unique SHA256 original shader fingerprints**, exactly **22/22 matching historical X22 Spector.js 90s canonical SHA list**, 11 vertex + 11 fragment GLSL ES3.00 shaders. All **22 compile status PASS** and **11 program links PASS**; two attached Shader IDs per program.
- **77,136 intercepted Draws** across observation windows, each conforming with X22–X26 topology: 16 Draws per inferred cycle = 1 POINTS and 15 TRIANGLES. These are aggregated draw event counts, NOT individual complete-frame exports, NOT independently measured FPS and NOT newly recovered geometry.
- Free RAM at worst **1,690 MiB** (user emergency-stop 100MiB not reached), 7/7 samples, 0 runtime errors; two private screenshots stored only on PC. No commercial Shader programs or source changed. Browser isolated session closed.

## Reconciliation with existing X01–X26 source authorities

- **X01–X19:** prior canonical inventory still has 78 original first-party paths; 46/46 X27 observed paths previously known. No new source URL.
- **X16:** all 37 observed runtime initiator edges previously established; zero new edges.
- **X19:** 38/38 original HTTP response body SHA256 plus lengths match original canonical variants; zero new original content SHA.
- **X22:** actual 22-of-22 WebGL shader SHA256 match canonical 90s Spector public evidence, source Git Blob 9828d8854721fd2d7cb44987bef836edc47e8e4d; full prior metadata and 16 Draw/11 program/22 Shader topology retained.
- **X23:** previous independently observed Ispettore composer/bloom semantic pass annotations retained. X27 does not replace it.
- **X24:** seven original binary WGDW GPU captures preserved in PC private storage, never published or overwritten.
- **X25:** previous numeric Uniform and Framebuffer attachment GPU observer evidence retained; X27 adds compiler/link outcome and independent shader digest validation.
- **X26:** previous actual OWN pixel-overdraw fixture and 90.01s BLEND/DEPTH time-windowed evidence remain current; X27 adds OWN editable GLSL and vendor shader-source read-only observations.
- True X27 novelty: an **operational rollback-safe modern WebGL2 OWN shader hot-edit capability** plus 7 time-windowed metadata reads for all 22 live GLSL3.00 source hashes and all 11 program links. No new original proprietary shader, asset, URL, shader body or network edge.

## Data organization and evidence

- Private owner PC derived stage: Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261118-NEW-EXTRACTION/02-reviewed-derived/X27-CURRENT.
- Private images: .../01-private-captures/X27/shader-editor-2026-11-20 (two PNG only PC). Original official ZIP and source remain in the toolkit.
- Public owner-authored source: X27-WebGL2-Shaders-OWN-Editor-And-Live-90s-Runner.cjs; X27-OWN-WebGL2-Live-Shader-Editor-Fixture.html; X27-Independent-X01-X26-Shader-Reconciliation.py.
- Public structural evidence: X27-OFFICIAL-SOURCE-SECURITY-COMPATIBILITY-RECEIPT.json; X27-X22-CANONICAL-22-SHADER-SHA256-REFERENCE.json; X27-SANITIZED-90S-SHADER-COMPILE-LINK-X01-X26-CROSSWALK.json; X27-INDEPENDENT-ACCEPTANCE.json; the source-to-Git exact local-byte receipt will be added after publishing.
- Re-run OWN editor test by node X27-WebGL2-Shaders-OWN-Editor-And-Live-90s-Runner.cjs --fixture. Re-run live site only intentionally with --live and RAM guard. Re-run independent historical test with py -3 X27-Independent-X01-X26-Shader-Reconciliation.py. Test outputs deterministic with original observation timestamp and byte-identical on repeat, no external network or paid usage.
- Independent 49/49 PASS. No credential, login session, original shader text, site screenshot, GPU original binary or third-party texture published publicly.

**Decision: X27 COMPLETE_SCOPE_QUALIFIED; historical MV2 Shader Editor source installed but unavailable for direct Chrome157 activation; OWN editor real I/O with compile error recovery works; 90s external site read-only shader verification PASS; canonical X01–X26 preserved. X28 NEXT.**
