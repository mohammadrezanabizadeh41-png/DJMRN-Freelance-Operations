# DJMRN X28 — Spector.js + Ispettore + Playwright, real 2 x 90-second 8-phase GPU observation and X01–X27 crosswalk

Date: 2026-11-20. **Status: COMPLETE_SCOPE_QUALIFIED; independent 58/58 PASS; X29 NEXT.**

## Mission, real preflight and cost/security

Explicit owner authorization: study X28 requirements; inspect/download/install/activate required source/plugins/config as appropriate; conduct an actual live public site observation for up to 90 seconds per inspector, compare previous X01–X27 evidence, preserve PC raw private evidence and fully register all publishable derived code, documentation and SHA checks in the existing project GitHub. Never publish original commercial shaders/texture pixels, use paid/unknown-cost services or change browser security/account rights.

Two existing tools met the need and were REUSED without further downloads:
- Official MIT Spector.js from https://github.com/BabylonJS/Spector.js version **0.9.33**, Chrome Manifest V3; installed standalone bundle SHA256 cece563b656a223347af27c9f1db97c3c0225b01f2f5b400cd9deeb1b5958cca, 1,193,487 B.
- Official Apache-2.0 Ispettore from https://github.com/velvetfrustum/ispettore tagged **v0.1.1**, previously pinned 168/168 source files, archive SHA256 ca49c6a4f24a3872ef2a24f792f2598374a17591124ece702c56017d9b8973df; built MV3 dist manifest lists **0.1.0**. Previous native tests 245/245 PASS; upstream Three.js r184 regression target means site r154 semantic annotations remain best effort.
- Playwright Core **v1.65.1** already installed, connected through Chrome CDP to existing Puppeteer-launched Chrome for Testing 157, independently controlled mouse/scroll. Official https://playwright.dev/docs/api/class-mouse.
- Strictly sequential isolated Chrome profiles, never Spector + Ispettore together. Each observer had same 1280x720 viewport and eight timed Playwright input windows. No npm install, no upgrade, no extension activation on personal Chrome, no credit/cost, no security downgrade. 100 MiB free RAM emergency stop.

## Two actual live GPU captures and cross-inspector reproduction

The public anonymous URL https://www.gladeye.com/ was actually open and rendering for **90.01s with Spector and 90.48s with Ispettore** (two separate serial visits; not a single shared physical frame). Eight independent GPU frame captures per tool, at t 6, 18, 30, 42, 54, 66, 78 and 86 seconds. Inputs: Normal; hover left and right; mouse sweep and scroll forward as *Dispersal candidate*; scroll reversal, pointer off and idle as *Return candidate*. No claim that particular flower animations were unequivocally triggered or reversed.

- Both tools captured **16 real draws per frame**, identical draw opcode/mode/count lists at every matched phase. The exact GL command counts per frame agree as **137, 138, 138, 138, 138, 138, 139, 138**. No new GPU draw pass or Shader was observed from these inputs.
- Spector: **11 programs, 22 GLSL-source SHA256 (all exact matches with historical X22), 62 Uniform names**, 15 framebuffer bind operations and 14 clear operations per captured frame; 12 framebuffer tokens in current-frame draws versus 13 allocated FBO resources in older X24 full setup. Every full frame contains one indexed POINTS draw using 960,000 submitted indices (NOT independently measured flower count) and 15 remaining draws. Per-frame raw site GPU packets stored PRIVATE on PC. No new original shaders or asset body.
- Ispettore: **30 GPU events per frame** (16 draw + 14 clear), 11 programs, 2 preview blobs per frame, **no native GPU timing** available. Three full private scene snapshots at Normal, Dispersal candidate scroll and Return candidate idle: **1 renderer, 1 model, 17 textures, 11 programs, 7 scene objects and OrthographicCamera** each; Three.js r154. Full scene original pixels/assets on PC only.
- Minimum free RAM during Spector **1,668 MiB**; during Ispettore **1,305 MiB**, both safely above owner 100 MiB emergency hard stop. Zero runtime capture errors.

## New phase-dependent actual numeric GPU evidence

An independent OFFLINE Python analyzer read 8 private Spector GPU captures, recognized 119 per-draw numeric Uniform pairs, and compared values to the Normal baseline (tolerance 1e-5). Five varying names are modelViewMatrix, time, uTime, uMousePosition and uContainerPos. A sixth, **uShrinkFactor**, changes at the scroll candidate and initial return: 0 at Normal, both Hover and mouse sweep; **0.000679689401** after scroll down, **0.000737012597** after scroll up, then extremely close to zero after pointer out and Return idle. This supports a transient parameter reaction to the combined input/time sequence, without proving the actual full flower-scattering logic or even that the visual animation was caused uniquely by the scroll. These selected numeric values and all changed Uniform names appear in the sanitized crosswalk, not original GLSL text.

Sixteen full-page site screenshots (eight per tool) kept PRIVATE on PC; owner PowerShell System.Drawing sampling tool compared 24-pixel grid RGB deltas to each observer's own Normal baseline. The derived numeric differences are public, NOT original screenshots or their pixel matrix. Continuous animation/time can produce differences without any interaction. Thus **visual dispersal confirmation = UNVERIFIED; full scene return confirmation = UNVERIFIED**. No GPU timer/FPS; recorded CPU instrumented durations are not reliable native GPU timing or direct benchmark comparison.

## X01–X27 comparison / reproducibility

- X01–X19 canonical resource ledger still contains **78 original first-party paths**. Both new observers saw **46 existing first-party paths**; zero novel first-party URL.
- X16 historic initiator graph: **37/37** observed edges known on each run; zero new network edge.
- X19 original HTTP body SHA256+exact byte-size: Spector **32/32**, Ispettore **38/38**, all preexisting original content variants, zero new original body.
- X22 independent old Spector Shader source digests: **22/22** exact current matches on **all eight** X28 Spector captures. X23 previous Three.js bloom labels remain historical authority, not invented newly. X24 seven original full GPU WGDW packets still privately stored. X25 numerical Uniform/FBO and X26 blend/depth/OWN overdraw fixtures preserved. X27 OWN shader hot-edit and 49/49 acceptance preserved. Previous X01–X27 stage folders still present.
- New **58/58** independent acceptance checks PASS: two actual 90s sessions, serial observer separation, exact phase schedule, 8+8 original private GPU captures SHA256+bytes, three private Ispettore full-scene SHA256+bytes, 16 private screenshots SHA256, exact 8x8 draw opcode/mode/count correspondence, 22 original Shader hashes, 3 full scene render/texture counts, old URL/body/edge provenance, RAM guard, zero site raw asset publication, license/permissions/versions and preservation of historical stages.
- X28 offline crosswalk deterministic across repeated runs using the original Spector observation timestamp, with no extra live visit. Network source capture changed nothing on the site.

## Source, evidence paths and privacy

Owner PC derived stage: Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261118-NEW-EXTRACTION/02-reviewed-derived/X28-CURRENT
Private original GPU/camera screenshots: sibling 01-private-captures/X28/SPECTOR-90S and 01-private-captures/X28/ISPETTORE-90S.

Owner source: X28-Build-Independent-Phase-Runners.py; X28-Spector-Playwright-90s-Phase-Capture.cjs; X28-Ispettore-Playwright-90s-Phase-Capture.cjs; X28-Private-Screenshot-Sampled-RGB-Comparison.ps1; X28-Independent-X01-X27-Dual-GPU-Phase-Reconcile.py.
Publishable derived evidence: X28-OFFICIAL-TOOLS-SOURCE-LICENSE-SECURITY-PREFLIGHT.json; both separate Spector/Ispettore sanitized 90s timelines; X28-SANITIZED-PRIVATE-SCREENSHOT-VISUAL-DELTA.json; X28-SANITIZED-EIGHT-PHASE-DUAL-INSPECTOR-GPU-GRAPH-X01-X27-CROSSWALK.json; X28-INDEPENDENT-ACCEPTANCE.json; final 12-artifact exact PC/Git SHA manifest after publication.
Reproduction: from X28-CURRENT run Python stage runner builder to regenerate two X28 runners WITHOUT modifying X22/X23 originals; run Node Spector first, close, then run Node Ispettore. Run PowerShell screenshot sampler and finally Python independent crosswalk. Only the two capture runners contact the public site; offline verification never does.

**Decision:** X28 COMPLETE_SCOPE_QUALIFIED: accurate new evidence about stable Render Graph across four input hypotheses and transient interaction/time-related Uniform changes. No false claim of definitive dispersal, native GPU performance, texture pixel ownership or exact original site 3D implementation. X29 NEXT.
