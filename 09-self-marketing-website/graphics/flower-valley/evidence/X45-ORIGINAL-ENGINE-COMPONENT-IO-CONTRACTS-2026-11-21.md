# X45 — module boundary and I/O contracts (target behavior, not implemented code)

| Component / owner | Inputs | Output and state | Failure/fallback | Proof gate |
|---|---|---|---|---|
| PageShell | original markup, fonts, viewport | Header/hero/CTA/audio UI, intro visibility | static readable shell | G31-G35 |
| ChunkFamilyResolver | approved coherent X03/X04/X05 family SHA list | ordered 17 local scripts + provenance | pin family, stop on mismatch | G01-G03 |
| BootAdapter | registered webpack chunks, module 889 | Valley factory and audioStore-compatible exports | deterministic adapter or rebuild | G03-G06 |
| ValleyContract | HTML root, onLoaded, onIntroDone | renderer ready, intro complete, hover methods, dispose | callback error and retry path | G05-G07 |
| ResourceResolver | 10 named /valley/ paths, hash manifest | validated local ArrayBuffers/Images/AudioBuffer, no network | explicit MissingResource state | G08-G12 |
| CameraRig | camera GLB track, virtual scroll fraction | view/projection matrix per frame, timestamp | independent spline path if mapping missing | G13-G14 |
| VirtualScroller | wheel/touch delta and idle clock | bounded travel coordinate, velocity | clamp/rate fallback | G15-G17 |
| FlowerPointField | terrain and summer/winter sprite atlas, shader uniforms | points geometry, per-flower/leaf size/depth, glow | own compatible point sprites | G18-G22 |
| PointerInteraction | normalized pointer/mouse/touch/hover | repulsion vector, glow pulse, optional tilt | zero influence on leave | G21-G22 |
| EffectsComposer | scene color/depth, velocity, texture passes | bloom/blur/RGB/fog/rays/dust/vignette composite | skip noncritical passes at low quality | G23-G25 |
| HoverTransition | start/stop hover events, scene state | smooth camera ease and dispersed/return progress | interruptible resettable timeline | G26-G28 |
| AmbientAudio | verified audio asset, muted toggle, transition state | output audio gain/filter, initialized flag | silent/no crash fallback | G29-G30 |
| SceneCoordinator | all component states, requestAnimationFrame time | one authoritative frame/timeline ordering | isolate failing submodule | G07,G17,G28 |
| AdaptiveQuality | FPS, pixel ratio, device capability, memory available | adjustable DPR, points, post FX and frame budget | reduce in small steps, never crash at <100MiB | G36,G42 |
| ResourceLifecycle | resize, visibility, contextlost, unmount | correctly disposed GL/audio/timers | recreate or static fallback | G37 |
| QA EvidenceGate | original prompt sha, local hashes, replay fixtures | pass/fail artifacts and unverified markers | STOP if source changes/rights uncertain | G38-G45 |

## Ownership and authorization
- All domain semantics remain inside one locally runnable app: separate modules are code boundaries, not microservices or new agents.
- No external provider required: deterministic Python/Node for source maps, local renderer afterward.
- Private archive (vendor originals) is READ-ONLY; working copies are independent paths. Public GitHub gets only rights-safe summaries and original code written by DJMRN.
- Build/merge/deploy/publish remains outside X45; explicit approval required for consequential changes.

## State machine placeholders
- Boot states: UNINITIALIZED → CHUNKS_REGISTERED → ASSETS_READY → VALLEY_READY → INTRO_DONE; errors explicit.
- Camera states: IDLE_DRIFT | WHEEL_TOUCH_MOVING | HOVER_EASE_TO_STOP | HOVER_STOPPED | RESUMING.
- Flower states: NORMAL_GROWTH | DISPERSING | DISPERSED | REFORMING, with bounded progress and interruption handling.
- Audio states: UNINITIALIZED | MUTED | FADING_IN | PLAYING | LOWPASS_HOVER | FADING_OUT, user gesture required.
- Quality states: HIGH | MEDIUM | LOW | STATIC_FALLBACK; controlled by measured device evidence, not hardcoded optimism.

## Critical acceptance
- No class/API declaration alone proves original engine operation: require a real frame, camera movement, hover response and audio toggle.
- 20x touch multiplier is part of ORIGINAL spec and must be testable; no newer click-to-hold input contract injected here.
- 10/10 asset files exist by SHA; runtime mapping/material use remains untested.
