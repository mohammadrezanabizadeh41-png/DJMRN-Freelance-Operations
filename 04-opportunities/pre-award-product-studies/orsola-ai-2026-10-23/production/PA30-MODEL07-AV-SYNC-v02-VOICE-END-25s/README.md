# ORSOLA-013 — MODEL 07 / VO ends by 25s / 30s final timeline v02

**User-approved new timing constraint:** English narration must end **by 25.000s**, while the storyboard/video remains **30.000 seconds** (3×10s). The five remaining seconds **25.000–30.000 contain no narrated words and no spoken-word subtitles**; brand reveal can continue and music/visual sound effects are allowed.

**Latest proposed VO endpoint:** **24.760s** (240 ms before deadline). This is an editorial target, **not measured narration**. A final WAV, performer, text beyond approved Hook A and TTS engine are not chosen, created or approved.

**Authority:** [Machine-readable v02 timing JSON](PA30-MODEL07-AV-MASTER-v02.json), used to derive [full SRT](PA30-MODEL07-SUBTITLES-MASTER-30s-v02.srt) and [per-second tracking](PA30-MODEL07-FRAMES-01-30-v02.csv). This version supersedes v01 **for future production timing only**; historical v01 remains unchanged.

## 30-second visual and sound schedule

| Master time | Image / emotional arc | VO decision | Music / outro |
|---|---|---|---|
| 0–3s | City opening; stressed woman + many app cards | `One day. Too many tabs?` (wording **USER_CONFIRMED**) | Ambient tension |
| 3–6s | stressed close-up → view official Orsola page → CTA pointer | `Meet Orsola.` (**draft**) at 4.16–5.75 | Rising light cue |
| 6–10s | Violet strand creates first 4 green ticks in conceptual cards | `An AI assistant for work and everyday life.` (**draft**) at 6.25–9.68 | Rhythmic task pings (do not claim actual success) |
| 10–16s | Final checks and many cards merge to one six-row list | `Ask about email, your calendar, or reminders—in one conversation.` (**draft**) at 10.07–15.92 | SFX match each card only |
| 16–20s | Woman's relief → sunshine → woman with child | `Less switching. More living.` (**draft**) at 17.00–19.39 | Music lifts |
| 20–25s | Dark violet, dispersed glow progressively focuses into Orsola logo + wordmark + website | `Explore Orsola.` (**draft**) at 23.22–24.76; last spoken line | Gentle brand tonal cue |
| **25–28s** | Ring, **Orsola** wordmark, `orsola.ai` resolve fully and hold together | **NO VO / NO SPOKEN SUBTITLE** | Music + subtle brand shimmer |
| **28–30s** | **ONLY** sunset city and mountains, no woman | **NO VO / NO SPOKEN SUBTITLE** | Musical resolution, optional tail fade |

Use original official Orsola logo/wordmark SVG composited during video editing, never rely on AI-drawn accurate text. The in-scene interface before registration and all green checks are **illustrative visual concepts**; green checks are not test evidence of connected app actions. Do not claim worldwide registration, confirmed pricing or zero-cost unlimited features.

## Planned speech cues — target seconds, not final measured audio

| ID | Time start–end | English VO line | Approval |
|---|---:|---|---|
| V01 | 0.05–0.86 | One day. | USER_CONFIRMED_WORDING |
| V02 | 0.98–2.85 | Too many tabs? | USER_CONFIRMED_WORDING |
| V03 | 4.16–5.75 | Meet Orsola. | EDITORIAL_DRAFT |
| V04 | 6.25–9.68 | An AI assistant for work and everyday life. | EDITORIAL_DRAFT |
| V05a | 10.07–11.80 | Ask about email, | EDITORIAL_DRAFT |
| V05b | 11.88–14.16 | your calendar, or reminders—in | EDITORIAL_DRAFT |
| V05c | 14.23–15.92 | one conversation. | EDITORIAL_DRAFT |
| V06a | 17.00–18.04 | Less switching. | EDITORIAL_DRAFT |
| V06b | 18.17–19.39 | More living. | EDITORIAL_DRAFT |
| V07 | 23.22–24.76 | Explore Orsola. | EDITORIAL_DRAFT |

**Text retained verbatim from existing v01/v3 script.** Only its proposed placement changes. No speech phrase crosses 10s or 20s splice boundaries. Absolute time = 10×(clip index–1) + clip-local time. The master 30s SRT and local SRTs use the same cues with correct offsets. **Do NOT make the video renderer generate narration or on-screen burned subtitles.**

## Next professional editing procedure

1. Render the three **silent VO** 10s image-based video clips, preserving the same female face, room, sunset palette, violet energy and shot logic; use overlap-safe 10s edits with no forced duration change. Keep original brand SVG and exact website/UI overlays for editor if the video model distorts them.
2. Concatenate on master `0.000 → 30.000s`. Do not accidentally drop or repeat frames at exactly 10.000 and 20.000 seconds.
3. Approve remaining English draft VO copy, select a voice and generate a standalone narration **WAV** targeting last syllable **≤25.000s** (current planning target 24.760s). Prefer listening + waveform review over trusting rate settings or the word-length estimate.
4. Measure actual phrase and word boundaries and revise JSON v03 **from audio evidence**. Regenerate master SRT and clip-local SRT, and use them only after measured verification.
5. In edit: `V1` three joined video clips; `V2` composited official Orsola logo/URL and any approved super text; `A1` recorded English voice ending ≤25; `A2` licensed music and effects to 30; `SUB` English subtitles corresponding strictly to spoken audio, none after 25.
6. Check logo/CTA timing, endcard hold, sunset-only last 2s, commercial media/voice rights, sound levels and audience locale. Publishing/sales/media spending still separately approved.

**Approval/status:** user-authorized NEW audio constraint `VOICE_END<=25`; **not** an instruction to create media or publish now. Old v01 is historical, existing 66-task register remains unchanged. Eight? Actual number of files in this directory is **nine**: JSON, full frame CSV, voice cue CSV, word estimate CSV, master SRT, three clip SRT and README. All are text, no actual WAV or rendered video.
