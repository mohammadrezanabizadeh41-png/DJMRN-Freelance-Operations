# DJMRN — X26: Official WebGL Insight, controlled Overdraw, 90-second WebGL2 site observation, X01–X25 reconciliation

Date: 2026-11-20. Status: COMPLETE_SCOPE_QUALIFIED, legacy MV2 unsupported / modern WebGL2 observer PASS. Acceptance **48/48 PASS**. X27 NEXT.

## Official upstream, source installation, compatibility

- Canonical MIT source: https://github.com/3Dparallax/insight ; pinned commit cbe4463869bbf543106d672790f82155a22844f8 ; upstream last push 2021-09-30. Official README explicitly describes project as DEPRECATED and no longer available on the Chrome Web Store.
- Downloaded official pinned source ZIP on PC: 525,048 bytes, SHA256 23820d60993ec466a754d394e2072d8411d50b82aa267bc40bac9b8a1c1d4989. Extracted 79 files. Source remains unmodified under %LOCALAPPDATA%\DJMRN-Website-Toolkit\04-Specialists\Sources\webgl-insight\source-cbe4463869bb ; ZIP is preserved alongside.
- Actual manifest: version 1.0.3, **Manifest V2**, permissions tabs/storage, content script matches ALL_URLS, legacy CSP permits unsafe-eval. Official Overdraw Inspector intercepts and changes shaders/blend/depth states: it is not a passive pixel observer.
- Chrome for Testing 157 does not support the original MV2 extension. The official Chrome MV2 phase-out is documented at https://developer.chrome.com/docs/extensions/develop/migrate/mv2-deprecation-timeline . Therefore no forced legacy extension activation, no outdated browser downgrade, no profile/OS policy change, no forced port, no login and no paid service.
- Alternative used: already-installed Chrome for Testing 157 + existing Puppeteer; a minimal original DJMRN JavaScript on-document-start WebGL2 draw/state proxy in an isolated anonymous browser. No new npm package required. This is a complementary tool, not a false claim that original WebGL Insight ran on site.

## Owned controlled actual per-pixel overdraw test

- The self-authored 64x64 pixel WebGL2 fixture renders 3 simple full-screen triangle draws with progressively restricted scissor areas (64x64, 32x64, 32x32), using additive color increment and readPixels. It is our OWN source, not recovered third-party geometry or shaders.
- Ground truth: 2048 pixels drawn once, 1024 pixels drawn twice and 1024 pixels drawn three times, totaling 4096 pixels. Real GPU/WebGL readback matches expected exactly.
- Observer tested twice over 5.01 seconds; two recorded samples, zero runtime errors.
- True per-pixel overdraw measurement applies ONLY to this owned synthetic scene, NOT the target commercial site.

## Actual public live observation

- Target public anonymous site: https://www.gladeye.com/ . Modern isolated Chrome for Testing 157 at 1280x720 viewport; document-start WebGL2 method interception without shader modification.
- Real continuous site observation 90.01 seconds; seven independently sampled draw-state windows at ~10.27, 24.29, 37.28, 50.33, 63.28, 76.32, 88.30 sec. Actions include baseline, pointer left/right, scroll 450, pointer center, scroll 800 and pointer reverse.
- **77,648 total intercepted draw calls**. All seven windows are multiples of previously established 16 draws per rendering cycle. Exactly one POINTS draw and 15 TRIANGLES-mode draws per inferred cycle: this totals approximately 4853 complete 16-draw cycles in observed windows. The inferred cycles are **not independent measured FPS**, and these are NOT seven independently replayable GPU frames.
- **14,559 Draw calls observed with blending enabled = three per inferred cycle. 9,706 Draw calls observed with depth writes disabled = two per inferred cycle**; those two draws also have blending enabled. Full per-window target/program-state counts and Framebuffer binding transitions are in the sanitized crosswalk.
- The additive blend signature ONE/ONE/FUNC_ADD was not seen in this instrumented trace. Absence does NOT mean there is no bloom (existing X23 postprocessing/bloom evidence remains).
- **No exact live pixel overdraw heatmap** or fragment counts or native GPU timer measurements. Draw-state signals show overdraw RISKS only; blend/depth settings are not, by themselves, proof of redundant pixel work or a site performance defect.
- RAM emergency stop at 100 MiB free enforced. Lowest observed free RAM was **1,916 MiB**. Seven samples completed, no runtime errors. No unnecessary change to viewport, shadow, shaders, texture resolution or GPU fidelity.

## X01–X25 independent evidence provenance

- Original X01–X19 canonical network ledger still contains 78 first-party URLs; all 46 observed current site paths were known and none new.
- All **29/29** observed first-party response body SHA256+size identities exactly matched original historical X19 body variants; zero new original response SHA. All **37/37** observed initiator edges matched X16; zero new edge.
- Prior X22 Spector: 16 draw calls per full frame, 11 programs, 22 shader hashes and 62 normalized Uniform names (authoritative existing historical evidence), unchanged.
- Prior X23 Ispettore: stable Bloom/EffectComposer render pass metadata and source hashes, unchanged.
- Prior X24 webgd: seven original WGDW GPU packet files totaling 960,061,412 private bytes still present, not overwritten or uploaded to public GitHub.
- Prior X25 WebGL Developer Tool: seven frame metadata, numeric 29 active Uniform names, 13 Framebuffer attachment resources and historical 36/36 independent acceptance, unchanged.
- X26 newly adds **time-windowed BLEND / DEPTH_TEST / depth-mask / Framebuffer target dynamics** as an independent observer plus an own-GPU true overdraw fixture. It does NOT recover new original assets, original shaders or full authored geometry.
- All **48/48** new independent X26 comparisons and safety checks passed, fully separate from old stages.

## Files, preservation, replay and safety

- Owner local derived folder: Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION\02-reviewed-derived\X26-CURRENT.
- Owner local private screenshots: ...\01-private-captures\X26\webgl-insight-legacy-and-webgl2-2026-11-20 ; 2 private PNG images (never public).
- Owner source in GitHub scripts/: X26-WebGL2-Overdraw-Risk-90s-Runner.cjs ; X26-OWN-WebGL2-Controlled-Overdraw-Fixture.html ; X26-Independent-X01-X25-Reconciliation.py .
- Safe numerical evidence in GitHub evidence/: X26-OFFICIAL-SOURCE-SECURITY-INSTALL-RECEIPT.json ; X26-SANITIZED-90S-SEVEN-SAMPLES-X01-X25-CROSSWALK.json ; X26-INDEPENDENT-ACCEPTANCE.json ; subsequent public source-to-Git blob SHA256 manifest after publication.
- Reproduce historical check on PC: py -3 X26-Independent-X01-X25-Reconciliation.py ; this check is read-only, never revisits the site.
- Reproduce OWN fixture: node X26-WebGL2-Overdraw-Risk-90s-Runner.cjs --fixture . Live recapture, if intentionally required, uses --live with anonymous isolated Chrome and 100 MiB RAM stop.
- Neither individual vendor shader source, textures, raw site GPU packets, original screenshots, original vendor ZIP nor private browser credentials are published. No background job left running. No paid services, overages, OS permissions or personal Chrome modifications.

Decision: original WebGL Insight extension = **SOURCE_ONLY / CHROME157 INCOMPATIBLE**; our OWN measured pixel-overdraw fixture = **PASS**; original site 90.01s WebGL2 draw-state capture = **PASS**; independent X01–X25 reconciliation = **48/48 PASS**. **X26 COMPLETE_SCOPE_QUALIFIED. X27 NEXT.**
