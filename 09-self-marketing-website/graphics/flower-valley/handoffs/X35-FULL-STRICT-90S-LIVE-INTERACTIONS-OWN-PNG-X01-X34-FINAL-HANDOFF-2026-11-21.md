# DJMRN X35 FINAL — Strict 90.006s live interaction experiment, WebGL visual deltas, independent X01–X34 acceptance

**Local date:** 2026-11-21. **Status:** **COMPLETE_SCOPE_QUALIFIED**, **391/391 independent QA checks PASS**, **24/24 genuine timed input phases**, no reported execution error, **142/142 independent private-image checks PASS** including all **23/23 consecutive 192×108 RGB image differences**.

## 1. Canonical scope and what is actually demonstrated

The existing [sequential EXTRACTION-RUNBOOK](../EXTRACTION-RUNBOOK.md) defines **X35 / E3** as rigorous timed **idle / pointer left-right / hold / release / drag / click / scroll / focus / hover / exit / resize / mobile touch / reduced-motion experiments**, with timestamped evidence, and **explicit disambiguation of input-related versus autonomous animation**.

X35 implemented one **real 90.006-second isolated session** on `https://www.gladeye.com/`, with 24 phase actions including two repetitions of the left/right sequence and no-input holds. It uses *observed event dispatch and frame changes* to quantify **association**, not to falsely assert an exact private three.js camera position, application source condition, or a statistically isolated randomized A/B causal effect.

**Evidence/limits distinction:** Input `isTrusted` observed = browser dispatched real CDP/Playwright events. WebGL draw counter continuing with zero new mousemove = **continuous rendering without new mousemove**, **NOT necessarily autonomous camera movement**. PNG changes can be due to background particles, time-varying shading, loading, automatic camera or input. A single ordered run cannot identify an exact camera path or prove input-to-camera causality. Mobile is **Chrome touch emulation**, not physical device hardware. This qualified conclusion is part of the successful scope, not an omitted defect.

## 2. Official sources, local free stack and setup audit

Original official sources:
- [Playwright](https://github.com/microsoft/playwright), locally **1.65.1**, Apache-2.0, official version [v1.65.1 tag](https://github.com/microsoft/playwright/releases/tag/v1.65.1), GitHub tag SHA `bbd948344ea9a60bf1e6f125c02ca99b2b51593b`. [Mouse](https://playwright.dev/docs/api/class-mouse) and [Emulation](https://playwright.dev/docs/emulation) documentation support mouse.move/down/up/click/wheel and responsive/device/touch/reduced-motion configurations.
- [ChromeDevTools/devtools-protocol](https://github.com/ChromeDevTools/devtools-protocol), **BSD-3-Clause**. [Official Emulation domain](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/) supports controlled device metrics, simulated touch and media features through CDP.
- [sharp](https://github.com/lovell/sharp), locally **0.35.5**, Apache-2.0, [v0.35.5](https://github.com/lovell/sharp/releases/tag/v0.35.5), upstream tag SHA `9aac0c92b97e11d4e7d189ba81046271826118cf`. Used to downsample original PNGs offline for exact independent per-channel image comparison.
- Existing Chrome for Testing 157 browser and previously configured Puppeteer/CDP; existing X19 SHA-256 and X16 network initiation records used as baseline.

No app installer, browser extension, paid account, subscription, global Playwright change, Chrome GPU sandbox relaxation, local proxy/VPN change, RenderDoc injection or persistent system configuration change. Only an **isolated task-scoped browser profile** was created; all experimental browser processes were closed after the 90s run. The 100MiB RAM emergency guard was active; **minimum free RAM 854MiB**.

## 3. Twenty-four timed real interactions, original WebGL draw and event evidence

[Reproducible owner-authored strict Playwright/CDP runner](../scripts/X35-Strict-90S-Public-Replicated-Input-Interaction-CDP-Playwright.cjs). **24 of 24** planned timestamped states were sampled within the public **90.006 actual seconds**; WebGL2/three.js `r154` and on-site canvas were observed, and vendor shaders/geometry/texture bodies were not copied or exported.

| Interaction | Evidence and result |
| --- | --- |
| Initial idle A/B | Both had **zero trusted mousemove**. Images changed a mere **0.1083 mean RGB absolute difference** between first two snapshots; startup warm-up is a known confound. |
| Move left/right, then no movement holds | First left/right delivered 8 then 16 trusted mousemove events, with held counts unchanged. During left hold **1,904 additional WebGL draw submissions**; during right hold **3,392** with **zero new mousemove** in either hold. This **proves continuous draw submission in pointer idle**, not autonomous camera movement. |
| Repeat left/right (independent dispatch repetition in same session) | Trusted mousemove counts **24** and **32**; original expected repeat dispatch verified, but the second stimuli are not a randomized matched control session. |
| Drag press/move/release | Trusted pointerdown, **12 additional drag mousemove**, and pointerup verified. |
| Click, scroll, keyboard focus, exit | Trusted click; wheel counts **1 then 2** for opposite scroll directions; Tab keydown; exit movement returned trusted mouse motion. These are browser events, not proof of a changed camera. |
| Resize and restore | Browser viewport changed **1280×720 → 960×600 → 1280×720** and window resize events observed. |
| Reduced motion on/off | `matchMedia('(prefers-reduced-motion: reduce)').matches` changed **false → true → false**. **Whether the GL engine respects that CSS media preference remains UNVERIFIED**; draw calls continued. |
| Mobile viewport and simulated touch | CDP switched to **390×844 with touch capability**. Trusted `touchstart` count 1 then 2, `touchend` count 1 then 2, and **8 trusted touchmove** events during synthetic swipe. Physical-phone behavior NOT tested. |

**Draw observations:** Three known primitive signatures persisted; late cumulative observed WebGL draws **68,792**. As in prior stages, `POINTS drawElements(960000 indices)` must **not** be interpreted as a verified number of flowers. Pointer hold visual changes (on the raster) occurred while new mouse movement counts were exactly zero, which establishes **autonomous screen-content updates/rendering**, not the specific cause or camera motion.

## 4. Independent visual readback — 142 original screenshot tests and pixel differences

Each of the **24 experimental screenshots** is stored **privately on the owner PC** as original PNG (no screenshot is pushed to GitHub). Visual delta source code [X35 independent offline 24-image verifier](../scripts/X35-Independent-Private-PNG-Visual-Delta-Recheck.cjs) re-reads every actual PNG, recomputes its SHA-256 and file size, reconstructs **192×108 RGB** samples, and independently recalculates all **23 consecutive pixel-array mean absolute differences** and percentage of components varying more than 15 levels.

Result: **142/142 cross-checks PASS**, including exact-match deltas to original live-session values. Those checks are incorporated into **391/391 consolidated independent QA PASS**. No proprietary image pixels, vendor model or GL shader code appear in public output.

Examples of **associations, not causal attribution**:
- Two early idle captures: mean absolute RGB **0.1083**.
- Pointer-left first active interval: **29.5333** (substantial warm-up/time confound).
- First pointer-left hold: **21.97**, while pointer movement counter stayed unchanged.
- Mobile simulated swipe versus preceding tap: **5.3725**; both include time evolution and viewport emulation.

All original RGB arrays and screenshots remain private; GitHub publishes **only numeric differences and hashes**.

[Independent screenshot recheck result](../evidence/X35-INDEPENDENT-ALL-PNG-SCREEN-DELTA-CROSSCHECK.json).

## 5. Actual comparison with X01–X34 and source of truth

New **90.006s** site run: **46 known first-party paths, 34/34 SHA-256+byte-size verified previous X19 body versions, 37 X16-known initiator edges, zero new paths or edges**, zero runtime issues. The smaller sample set 34 than X34's 38 is **session-network coverage**, not missing site dependencies.

`/valley/camera-path07.glb` response SHA-256 again equals the previously archived camera-path version from X01/X34, not evidence of site runtime playhead motion. Previous historical independent QA records were independently loaded and checked: **X27 49/49, X28 58/58, X29 88/88, X30 96/96, X31 121/121, X32 128/128, X33 123/123, X34 143/143**, and X01–X34 on-PC stage-derived evidence presence. Current consolidated [391/391 independent X35 acceptance](../evidence/X35-INDEPENDENT-STRICT-PUBLIC-INPUT-MOTION-X01-X34-ACCEPTANCE.json) exits 0. This verifies provenance/continuity; it does not mean all arbitrary external data was reproduced or that browser test results prove every original experiment.

## 6. Exact PC/GitHub split and next action

PC root: `%USERPROFILE%\Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION`

- `01-private-captures\X35\PUBLIC-STRICT-BEHAVIOR-90S`: the 24 real original site PNGs and private isolated browser profile (NOT uploaded).
- `02-reviewed-derived\X35-CURRENT`: original code, 90-second numerical input and site SHA trace, independent 391 QA, independent RGB recheck, git-to-PC byte receipt and final report.
- Existing X01–X34 archive and GitHub evidence remain **undisturbed**, source-of-truth references retained.

**X35 COMPLETE_SCOPE_QUALIFIED. X36 NEXT:** human-visible independent time-series / screen-region video capture with timestamp and repeated input windows; later X40 optical flow. Neither will by itself reveal exact authored camera 3D transform. Proper causal test in a subsequent phase would require randomized repeated independent sessions, synchronized control/experimental conditions or app-owned camera instrumentation when authorization is granted.

No publication of vendor original visual frames, raw screenshot pixels, proprietary GLB/geometry, shaders, textures, session tokens or browser profile. No payment, production change, external write to Gladeye, tool privileges or Windows/driver/VPN changes.
