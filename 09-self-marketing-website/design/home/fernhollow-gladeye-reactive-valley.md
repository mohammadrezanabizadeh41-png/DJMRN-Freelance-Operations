# DJMRN — P3-H interactive valley / flower-particle background reference

**DESIGN REFERENCE ID (file slug):** `fernhollow-gladeye-reactive-valley`  
**Date observed:** 2026-11-17 (user's local Windows PC)  
**STATUS:** `RESEARCHED — NOT OWNER-APPROVED / NOT BUILT / NOT LICENSED FOR COPYING / NOT PERFORMANCE-QA-PASSED`  
**Scope:** the **living flower valley BACKGROUND and its interactions ONLY**. The user's three separate VP→SC→SV interface prompts have not yet been provided. Do NOT adopt Fernhollow/Gladeye's studio name, logo, heading, font, site navigation, CTA copy, layout or compiled software. No site source or production assets were changed.

**خلاصهٔ فارسی:** این پرونده مرجع فنی و گرافیکی پس‌زمینهٔ زندهٔ گل‌ها برای مرحلهٔ P3 سایت DJMRN است. رفتار ماوس/اسکرول/هاور و منابع عمومیِ دیده‌شده با مرورگر واقعی بررسی شده‌اند؛ خودِ موتور و فایل‌های اختصاصی سایت برای کپی‌برداری یا انتشار تأیید مجوز نشده‌اند. پس‌زمینه باید مستقلاً بازطراحی شود و با سه رابط خدمات، زبان‌ها و موبایل سازگار باشد.

## 1. Provenance, raw prompt and audit artifacts

**Canonical requirements:** [MASTER-ROADMAP §1C-H/I/J + B03/B04/B05/B06/B09/B12](../../MASTER-ROADMAP.md). **Only dated project progress:** [PROJECT-LOG.md](../../PROJECT-LOG.md). This file is the **single source-design record**, not a second project log or a second architecture decision. Browser script: [fernhollow-valley-audit.cjs](fernhollow-valley-audit.cjs), an **original DJMRN read-only audit utility**.

| Source | What it supports | Reuse rights |
|---|---|---|
| Owner-pasted 184-line prompt titled `Fernhollow — Night Flower Valley Hero (exact recreation prompt)`, with interface HTML | The author's detailed claims, descriptions, sample API calls and UI scaffold | Owner says prompt is free to *use*; public redistribution rights remain **UNVERIFIED** |
| https://www.gladeye.com/ (actual original public page) | Independent evidence from live Edge browser observations and response headers | **NO VERIFIED DJMRN LICENSE** for Gladeye scene/JS/shaders/GLB/PNG/MP3 |
| https://promptmotionsite.com/fernhollow (public catalog/reference page) | Location and wording of Fernhollow reference; earlier browser screenshot loaded blank in test | Its public prompt availability is not proof the page chunk, embedded HTML or imported assets may be republished |
| Three.js official https://github.com/mrdoob/three.js/blob/dev/LICENSE | Three.js library MIT licensing, **not Gladeye's particular artwork, scene or third-party sounds** | Valid for using upstream Three.js under MIT terms |
| Three.js resource lifecycle https://threejs.org/manual/pages/how-to-dispose-of-objects.html | Need to dispose geometries/materials/textures as appropriate | Technical documentation |

**Private local owner-prompt copy, verified:** `~/Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261117/owner-supplied-Fernhollow-prompt-PRIVATE.txt` (184 lines, **13,241 bytes**, SHA-256 `E2EA5A1C99A69F0A234C9AC75435947AACDA54A03C07A45E48185F33B520533D`). This includes the exact **owner-supplied text and interface HTML**; it is stored on the owner's Windows PC, **not published in this public GitHub repo** pending verified redistribution permission. Owner needs to back up this local study archive separately if device-level redundancy is desired. Neither a prompt nor external URLs establish a working imported engine.

**Local research archive (owner's PC; supporting OBSERVATIONS, not alternative authority):** `~/Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261117/`
- `browser-audit.json` (first observed desktop/mobile state, requests, interaction snapshots, short frame interval sample)
- `browser-audit-recheck.json` (SECOND INDEPENDENT LIVE RUN **PASS**: committed script copied to Windows, `node --check` EXIT 0, test exit 0, six new screenshots, 51 network response records, 0 page JS errors, 0 failed requests, WebGL2 detected on both desktop and mobile emulation)
- `desktop-00-loaded.jpg`, `desktop-01-pointer-left.jpg`, `desktop-02-pointer-right.jpg`, `desktop-03-wheel-forward.jpg`, `desktop-04-wheel-backward.jpg`, `desktop-05-cta-hover.jpg`, `desktop-06-background-click.jpg`
- `mobile-00-loaded.jpg`, `mobile-01-tap.jpg`, `comparison-contact-sheet.jpg`, `screenshot-checksums.json`
- `fernhollow-valley-audit.cjs` (local copy of the linked read-only research script; **not** site application source)

**Verifiably packaged private local evidence:** `~/Desktop/DJMRN-Website-Reference-Evidence/DJMRN-fernhollow-valley-study-20261117-PRIVATE.zip` — **2,036,056 bytes, 21 entries**, SHA-256 `A13AC484BB726F652E258E9713557D7B0A51673313FB596727BB7EAE314600B9`; includes raw owner-pasted prompt, source-free research script, JSON and JPEG observations, but **not** Gladeye engine JS, audio, model, binary textures, browser session or cookies. Not mirrored to GitHub/cloud; safeguard as private study, not public distributable media.

These screenshots and public site's proprietary assets are **not committed to the public repo**. The filenames and screenshot SHA-256 values can be checked in the local JSON. The contact sheet's mobile thumbnails were resized into landscape cells, **so their distorted aspect ratio is an artifact of that contact sheet**; inspect original portrait files before judging mobile design.

## 2. Fact vs author claim vs unknown

| Detail | Provenance / confidence |
|---|---|
| Original site serves a real scene drawing to a full-screen `canvas` using **WebGL 2.0** | **OBSERVED**, Edge isolated browser, Chromium WebGL 2.0, desktop 1280×800; mobile-emulated 390×844 |
| Dark, immersive floral tunnel/valley, dark center and glowing richly colored flowers; blurred near flowers and apparent depth | **VISUALLY OBSERVED** from multiple real screenshots |
| Mouse-left and mouse-right positions had distinct rendered floral distributions | **OBSERVED ASSOCIATION**, not controlled causal proof; autonomous motion also runs |
| Scrolling wheel changes the rendered view while DOM `scrollY=0`, `scrollHeight=800` | **OBSERVED**; consistent with virtual camera scrolling rather than ordinary document scroll |
| Hovering the `Explore our work` CTA greatly dispersed/dimmed flower imagery into sparse colored glows; scene recovered after leaving | **DIRECTLY VISUALLY OBSERVED** in desktop screenshots |
| An unqualified click on empty canvas causes an intentional flower effect | **NOT VERIFIED**. The trial click left URL unchanged; automatic animation prevents assigning any visual change to the click |
| Texture atlas, glow fog, particle effects and camera spline are used in the given way | **PROMPT CLAIMS + NETWORK EVIDENCE** for textures and path GLB; implementation internals not audited |
| `startHoverTransition()`, `stopHoverTransition()`, camera and `audioStore()` are callable public API on the current live site | **PROMPT-SUPPLIED SOURCE CLAIM**. Not verified in live JS object model; do not rely on names outside original runtime |
| Three.js exactly `r154`, flower vertex count, GPU precision, shader logic and the original module ID `889` | **PROMPT CLAIMS ONLY**. No source-code binary audit was performed |
| Owner has commercial/public code and media redistribution rights to Gladeye's engine | **UNKNOWN / DENY COPYING**, despite prompt statement `used with permission` |
| Entire self-contained HTML engine present in pasted content | **FALSE FOR PROVIDED EXCERPT**: the pasted HTML references `/_next/static/chunks/*.js` and `valley/` assets; no compiled engine chunks/asset bytes/base64 payloads were supplied |

## 3. Executed browser experiments — independent real I/O

Test machine: authorized `DJMRN-LAPTOP` Windows 11; **Microsoft Edge 157**, via installed Playwright Core and remote Desktop Commander. An **isolated browser context** was used; no authenticated tabs or cookies were transferred, no source bundles/GLB/MP3/assets were exported. Windows-MCP was independently used to capture the owner's desktop as proof that the Chat→Desktop Commander→local Windows visual path actually works. Windows Commander/OpenDesk were previously tested for desktop UI automation, but weren't needed to duplicate this specific browser test.

| Scenario | Actual outcome |
|---|---|
| Open site, wait for render, screenshot | HTTP 200; screen displays original Gladeye flower valley, readable centered title and CTA; 1 canvas, WebGL 2.0, no captured page JS errors |
| Move pointer left then right | Different pink/purple/yellow foreground clustering and apparent camera/view response; screenshots `desktop-01` and `desktop-02` |
| Wheel +640 then -400 | Different flower / orange glow camera views; the page did not scroll in conventional document space |
| Hover main CTA | Valley visibly transitions from dense flowers to sparse luminous floating dots (strong test evidence for user-selected *hover-dispersion effect*) |
| Click empty lower corner | URL remains `https://www.gladeye.com/`; no independently isolated canvas-click effect confirmed |
| Mobile Chromium emulation 390×844, touch enabled, reduced-motion preference | HTTP 200, WebGL 2.0 canvas drawn; controls `Home`, `Menu`, `Unmute audio`, `Explore our work`; no captured JS page errors. **Not** a real mobile hardware test; default scene continues to render with `prefers-reduced-motion: reduce` set |
| Short `requestAnimationFrame` sampling (61 intervals) | median **16.7 ms**, p95 **33.4 ms**, maximum **50 ms** in one desktop sample; **NOT** a general FPS benchmark or full stability acceptance |

**Network — initial observation:** 51 HTTP responses: 27 JavaScript, 8 PNG images, 4 WOFF2 fonts, 3 CSS, 3 Next.js component responses, 2 text/plain, 1 HTML, 1 SVG, 1 MP3 audio, 1 GLB model. **0 recorded failed requests and 0 JavaScript errors** in the desktop run. This is proof of resource types and requests, not ownership, license or full source availability.

### Exactly 10 observed original `/valley/` resource paths (DO NOT COPY INTO SITE)

| Category | Public browser-request path | `Content-Length` header, if present |
|---|---|---:|
| Spline / camera model | `/valley/camera-path07.glb` | absent/unknown |
| Floral sprite atlas A | `/valley/flowers/pool_winter.png` | 915,892 bytes |
| Floral sprite atlas B | `/valley/flowers/pool_summer.png` | 249,287 bytes |
| Terrain texture | `/valley/terrain.png` | 8,562 bytes |
| Vignette | `/valley/vignette.png` | 7,436 bytes |
| Light ray 1 | `/valley/rays/ray1.png` | 295,868 bytes |
| Light ray 2 | `/valley/rays/ray2.png` | 225,311 bytes |
| Light ray 3 | `/valley/rays/ray3.png` | 222,220 bytes |
| Dust particles | `/valley/dust-particle.png` | 2,102 bytes |
| Ambient audio | `/valley/audio/ge-ambient.mp3` | 3,315,774 bytes |

*These ten paths and sizes are **network metadata only**. No binary was saved to GitHub or the study archive. Summed declared `Content-Length` for the eight PNGs is ~1.93 MB and MP3 ~3.32 MB, **excluding unknown-size GLB, JS and many other resources**. Do not advertise this as complete page weight. The first 10.7-second navigation measurement included a **fixed ten-second intentional wait** and is NOT measured load time.*

The public page served WebGL2 desktop viewport 1280×800 and emulated mobile 390×844. Browser hardware and HTTP caching can change timing and rendering. Where only a screenshot differs, dynamic animation is a confound; repeat with controlled sampling if a causal quantitative interaction metric becomes necessary.

## 4. What DJMRN should actually reproduce (original implementation proposal, not copy)

**KEEP (owner-selected):** a dark luminous layered flower field, the perception of forward camera movement/valley depth, pointer-based particle separation and glow, subtle tilt, gentle idle motion, dramatic `focused/hover` dispersion into sparse light orbits, and optional restrained scroll response. High-level light/fog/dust atmosphere is a reference to synthesize originally, NOT an excuse to copy exact atlases or fragment shaders.

**CHANGE:** make it a **single background scene** underneath the existing DJMRN's three **service-selection interactions**, not a standalone Gladeye clone. Site architecture stays `HOME → VP (8 portals) → SC (24 corridors revealed inside same homepage) → SV (52 service windows) → 0..n truthful samples → return`. Pointer and wheel events must not steal control from focused menus, text, form inputs or touch navigation. Background reaction can dim/slow/disperse when a service window opens, then smoothly recover when closed. Do not hardcode Fernhollow's wordmark/hero/CTA.

**CREATE FROM SCRATCH:** custom owned/licensed floral textures or procedural point sprites, a simple free-form spline in code (no third-party GLB), camera motion and lighting, independent shader/glow rules or CSS/Canvas variant, pause/resume and reduced motion with a static fallback. Asset provenance must be checked at B09. **No professional photos are required to begin**.

**Proposed minimal behavior/state contract for P3 critique:**

| State / input | Proposed DJMRN action | Accessibility/failure contract |
|---|---|---|
| `IDLE` / no input | Slow low-amplitude drift, optional background bloom | Static/low-power fallback; no mandatory motion |
| `POINTER_MOVE` | Limited-radius push and glow, bounded camera tilt; pointer does not trigger service change | Hover is decorative; identical service selection available with touch/keyboard |
| `SCROLL` | Optional path advance **only in intentionally interactive area** | Ordinary page/service scroll wins when content needs scrolling |
| `VP/SC/SV_FOCUS` / selected item | Fade or disperse flowers to create readable foreground and stable contrast; gradually pause camera | No overlay trapping focus; back/escape restores prior state |
| `RETURN` / exit selection | Restore background level, path and prior focus without unexpected page jump | Back/forward deep links remain intact |
| `TOUCH` | Tap selects services; background response only if non-conflicting; swipe must not hijack all page scroll | Mobile typography, targets and normal vertical scrolling work |
| `REDUCED_MOTION / WEBGL_UNAVAILABLE` | Use static original still or light CSS/Canvas variant (no auto-flight) | All 8 portals, SCs, SVs and sample links remain visible and functional |
| `AUDIO` (optional/deferred) | Muted by default, opt-in audio with visible pause/mute control | Never start audio without user gesture or hide essential content behind sound |

**Implementation alternatives for future separate approval (smallest-first):**
- **A: CSS/SVG + 2D Canvas procedural particles**: first zero-specialized-engine visual/interaction test; may suffice for some glow, cursor force, 2.5D layers. Easier mobile/reduced-motion, may fail true 3D flythrough.
- **B: Three.js MIT + original WebGL2 point-sprite shader/instancing, one renderer and simple camera spline**: most plausible if owner insists on true 3D valley and real dispersal. Introduce only after A's visual prototype shows it cannot satisfy the chosen design; original sprites/geometry and carefully bounded glow instead of reusing Gladeye bundles. THREE has MIT licensing, *not* their texture/shader rights.
- **C: Original Gladeye compiled webpack bundle/asset repackaging**: **REJECTED/UNAUTHORIZED** until a verifiable license grants DJMRN copying, modification, public redistribution and commercial use of every component. Code hidden behind a public webpage, or user-given prompt claiming permission, does not resolve that.

**Resource/performance targets — PROPOSALS, NOT TEST RESULTS:** One render loop/scene shared across UI states; cap devicePixelRatio and scene density on weak hardware; adaptive canvas resolution; no mandatory expensive RGB split or multiple postprocess passes; monitor long tasks, GPU resource disposal and low-memory browser behavior on the owner's 8 GB RAM Windows laptop and on a physical phone. Prefer CSS/native UI over GPU-rendered text. Support English first with subsequent en/fa/ar/fr/de/nl translation and RTL/LTR layout; avoid embedding user-facing text in shaders.

## 5. Verification and owner approval gates — future work, not yet PASS

- **P3 / B05–B06 + RQ05/RQ06:** inspect owner's other **three distinct interaction prompts**, determine which trigger should disperse flowers, choose final aesthetic/strength/camera angle/shape palette, compare 2D and original 3D miniature studies, obtain **owner visual approval**.
- **B09 / rights:** verify source license for any proposed outside asset (including font, texture, audio, models). No loading/saving proprietary Gladeye binaries as DJMRN inputs.
- **P4/P5 / separate Codex authorization:** choose stack, create one original background slice + `HOME→VP→SC→SV→back` route with live input; no P5 build commissioned yet.
- **T34–T40 where applicable:** inspect preview/keyboard/touch/RTL/LTR, reduced motion, CTA and input focus, esc/back/history, background state transitions, mobile/tablet/notebook/desktop viewport matrix, 8GB laptop stability, real screenshot and browser test evidence. Treat desktop mini-scene rendering as DESIGN progress, not completion of site.
- **Unknowns to resolve if needed:** exact intended flower species/visual language for DJMRN, density and palette, whether user wants a new **click-to-ripple** effect (not verified in source), acoustic role, and permitted asset creation method. No forced owner questionnaire: decide one item when it becomes necessary.

**Final honest state:** **OBSERVED original site behavior + prompt captured privately + reproduction study recorded; DJMRN background NOT created; commercial reuse permission for original assets NOT verified; no production edits, payments, installs, external publication or merged code.**
