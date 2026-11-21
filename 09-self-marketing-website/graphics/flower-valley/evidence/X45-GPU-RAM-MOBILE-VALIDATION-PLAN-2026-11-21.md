# X45 — planned performance and operational QA (no benchmark executed)

## PC constraints and stop rules
- Host: Lenovo 81W1, Ryzen 5 3500U, Vega 8 iGPU, 8GiB installed RAM (usable Windows memory around 6GiB).
- RAM available when X45 began was around 1.2GiB; this is OBSERVED CONTEXT, not future guaranteed capacity.
- Emergency stop if Windows available RAM drops below **100 MiB**; do not force override. Throttle one level at a time and preserve capture quality.
- Don't open multiple heavy browsers/inspectors concurrently; close only processes explicitly allowed, keep VPN and remote connection intact.
- X45 performed **NO** browser/GPU benchmark. All tests below are PENDING for actual build/own harness.

## Provisional acceptance measurements (targets, NOT achieved results)
| Check | Measurement | Proposed pass and fallback |
|---|---|---|
| First usable frame | elapsed time and exceptions on cold start | no fatal error; loader either resolves or exposes failure UI |
| Desktop frame rate | FPS median and 1% low after warmup | aim stable ≥30 FPS for accessible motion; reduce DPR/points/bloom if missed |
| Mobile frame rate | real 390x844 phone + one low tier | aim stable ≥24 FPS or static graceful fallback without touch traps |
| Process RAM | working set + available Windows MiB | >100MiB free hard threshold maintained |
| GPU budget | draw calls, framebuffer size, texture bytes | compare against archived 16 sampled draws but treat as reference observation only |
| Camera input | wheel / touch / idle / pointer tilt | bounded deterministic motion, tested 20x original touch setting |
| Bloom and ray toggles | before/after GPU frame timings | turn off costly noncritical passes adaptively |
| Resize/context lost | recreate canvas, audio and GL textures | no crash and memory return |
| Hover interruption | enter/leave rapidly and during scene loading | no frozen camera/ghost sprites, audio filter restored |
| Sound toggle | user gesture then mute/unmute, fade/lowpass | no autoplay and no crash on denied audio |
| Responsive layout | desktop and 820px, 390px phone | visible headline/CTA, scroll and sound controls not obscured |
| One-file build | local-only self-contained generated artifact | 10 asset SHA references correct and no missing script/runtime error |

## Staged quality adaptation
1. Measure at original target presentation; change no settings until it fails target or available RAM warning.
2. Lower postprocessing resolution/DPR modestly, retest; preserve source geometry density until needed.
3. If still failing, reduce bloom iterations/ray count/dust points incrementally, always record the delta.
4. Only then reduce point-sprite count/animation complexity. Preserve near-field flowers and camera action.
5. At or below 100MiB free: STOP heavy render test, snapshot status, recover memory; do not force program continuation.
6. For WebGL absence or reduced motion, present original page text/CTA with bounded static scene substitute.

## Evidence each test must leave
- Device model, OS/browser version, usable/free RAM, frame budget, render resolution, shader/asset hashes, deterministic input script and result.
- Before/after screenshots PRIVATE (old/new version only after owner labels), original 17-chunk family ID and config.
- Error collection includes non-GPU JS exceptions, missing imports/media, WebGL context loss, audio unlock failure and cleanup.
- Do not assert the benchmark passed until these measurements actually exist.
