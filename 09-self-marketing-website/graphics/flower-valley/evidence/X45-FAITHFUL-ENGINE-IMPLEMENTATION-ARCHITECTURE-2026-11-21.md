# X45 — Faithful Original Fernhollow Engine Reconstruction Architecture

## Authority and non-negotiable baseline
- Original 184-line privately stored owner prompt is exact original functional specification; SHA256 e2ea5a1c99a69f0a234c9ac75435947aacda54a03c07a45e48185f33b520533d.
- Exactly 43 X44 puzzle rows; no requested later artwork or interaction changes are included in X45.
- The original engine, camera motion, flowers/leaves, scroll/touch, mouse, bloom, RGB/fog, hover dispersion, sound, desktop/mobile shell and 17 loader scripts remain target capabilities.
- X45 determines what is known and what must be investigated/built; not a runtime deployment or a code-complete engine.

## Verified REAL source inventory (not just filenames)
- 17 of 17 originally referenced JS script paths have real SHA-verified files in X01-X35.
- **Five independent coherent captures** have all 17 JS scripts in one capture family (three X03, one X04, one X05).
- Eight filenames have distinct SHA256 content across those families; BOM/newline normalization does NOT make those eight variants equal.
- X19 independently identified module **889** as high-signal scene relevant; static regex found its module definition in the archived page chunk.
- Page chunk contains string names startHoverTransition, stopHoverTransition, initAudio, camera-path07.glb and shader uniforms. These are STATIC indicators, not proof of an executable scene.
- **All TEN /valley/ original body files exist on PC and have SHA256 verified against X19 resource identities**:
  ambient MP3 3,315,774 bytes; camera-path07.glb 10,132 bytes; dust-particle.png 2,102 bytes;
  pool_summer.png 249,287 bytes; pool_winter.png 915,892 bytes; ray1.png 295,868;
  ray2.png 225,311; ray3.png 222,220; terrain.png 8,562; vignette.png 7,436.
- X19 catalog also documents other JS/CSS/font assets. Named original Anton﻿io/Manrope font files were NOT located by filename in X01-X35 inventory; five reference brand fonts are not automatically substitutes.
- WebGL2, 16 sampled draw submissions, 11 linked programs, 22 GLSL source SHA values; X48 is structural lexical source map NOT a full GLSL AST.
- Camera GLB has one perspective camera, 0 meshes, three LINEAR channels of 200 keys over ~8.291667s.
- X28 inspection also listed an OrthographicCamera, so the binding between GLB and active camera remains UNKNOWN.
- X49 geometry tool tests succeeded on OWN fixture triangle meshes but did not preserve POINTS/instancing or reconstruct commercial flower geometry.

## Target technical topology
1. **PageShell** owns original title, hero, navigation, sound toggle, responsive CSS, loader and intro UI, exactly as specified.
2. **BootstrapAdapter** registers original script order, captures Webpack require, exposes et/Y (if permitted) or compatible adapter and validates module 889.
3. **ResourceResolver** maps ten /valley URLs to SHA-pinned locally stored bytes (private test), with explicit MIME/filename handling.
4. **ValleyContract** owns constructor (root, onLoaded, onIntroDone) and startHoverTransition/stopHoverTransition and dispose.
5. **CameraRig + VirtualScroller** own GLB animation, wheel/touch 20x target, pointer tilt, idle drift and camera interpolation.
6. **FlowerPointField + Terrain** own point/sprite instances, flower and leaf atlas sampling, size growth, depth and mouse repulsion/glow.
7. **EffectsComposer** owns glow/bloom, blur/composite, RGB-split noise, fog, rays, dust and speed-linked vignette.
8. **AmbientAudio** owns AudioListener/AudioContext, muted first, fades, hover low-pass and release.
9. **SceneCoordinator** connects camera, input, transition state, audio and effects without two authoritative clocks.
10. **Quality/ResourceLifecycle** owns DPR, frame budget, resize, memory fallback, context loss and teardown.

## Minimal implementation choice — prove before reconstructing
- **Route A / private original-engine integration test:** use ONE fully coherent captured 17-chunk family, all ten SHA-confirmed assets, and a private LOCAL harness to test archived code only if execution is permitted and sandboxed. Never rewrite original evidence; copy immutable files into isolated working folder. No network calls or secrets. Verify rights before any outward publication/reuse.
- **Route B / compatibility reconstruction:** if original runtime is incomplete, incompatible, unsafe, or cannot be redistributed, implement only missing modules independently while preserving each original user-prompt contract. Prefer existing local Three.js/WebGL capability and a monolithic local app; no agent/service/plugin buildup.
- **Route C / hybrid:** keep a private original test as comparison oracle, publish only independently authored compatible code when rights are uncertain. Never claim it is the commercial binary or original authored source.
- Unknown original source bytes cannot be deduced from logs or hashes; substitute demonstrable behavior, keep origin labels explicit.

## Work sequencing: exact gates from X45-EXECUTION-CHECKLIST.csv
**P00 — source/rights:** immutable SHA, rights, selected capture family, date/view scope.
**P01 — boot/runtime:** audit 8 variant chunks, choose one of 5 complete families, require/module 889, class export, constructor/callbacks, WebGL context and first frame.
**P02 — 10 assets/font:** local resolver and SHA for all 10, exact atlases UV layout, glTF MIME filename quirk, image color space, sound loader, original fonts availability.
**P03 — camera/scroller:** perspective GLB vs orthographic runtime binding, 200-key playback, 20x touch scaling, wheel/damping/idle/pointer tilt.
**P04 — sprite flowers:** source points semantics, sprites/leaves and terrain, growth by depth, mouse repulsion/glow, instancing/normal alternatives.
**P05 — render effects/hover/audio:** composer pass order, shader output differences, ray sprites, fog/vignette, hover ease/dispersal/reversal, audio low-pass and gain.
**P06 — original UI:** cream/black page, fonts, 158u heading/CTA, 820px responsiveness, loader 1s and UI 1.6s, sound toggle.
**P07 — tests/publish gate:** Vega8/mobile frames/RAM, cleanup, human OLD/NEW image review, license check, artifact provenance and original single-file build after tests.

## Exclusions, blockers and quality control
- Do NOT import later owner requests for moon/earth/wind or altered touch behavior in baseline X45. Those are separate follow-up art directions.
- Do NOT use stage X36, visit reference site, install new tools, spend money, loosen machine security or upload raw vendor media/JS/GLSL in this stage.
- Permission statement in original prompt remains intact as a CLAIM; reuse/redistribution rights not independently confirmed, never call original engine itself contradictory.
- 90 candidate site screenshots remain OLD/NEW unverified, and 69 GitHub/PC variants remain semantically unresolved.
- 100 MiB available Windows RAM is hard emergency stop. New runtime tests in later phase need isolated own copy and reversible cleanup.
- DONE only once concrete original functionality is visible, interactive, measurable and its missing/unknown elements reported; documentation alone is X45 planning completion.

## Exact required handoff files
- See X45-DETAILED-GAP-MATRIX.csv for 43 original source pieces with evidence and still-missing connections.
- X45-EXECUTION-CHECKLIST.csv lists 46 numbered verification/build gates, all NOT_EXECUTED_IN_X45.
- X45-ASSET-MANIFEST-PUBLIC.csv names ten confirmed asset bytes and explicitly says runtime rendering untested.
- COMPONENT-CONTRACTS.md specifies I/O and failure ownership; PERFORMANCE-TEST-PLAN.md defines device QA.
- X46 must carry this evidence first and reject NONCANONICAL X44-REQUIREMENT-SOURCE-ROWS.json.
