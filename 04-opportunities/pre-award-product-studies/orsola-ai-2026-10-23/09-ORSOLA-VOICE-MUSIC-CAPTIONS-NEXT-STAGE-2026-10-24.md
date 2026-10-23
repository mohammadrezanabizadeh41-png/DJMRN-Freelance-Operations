# ORSOLA-019 — NEXT: English voice casting, script approval, real duration conform, music/SFX and measured subtitles

**Recorded:** 2026-10-24 · **State:** `VOICE_SCRIPT_EDITORIAL_DRAFT` / `VOICE_GENERATION_NOT_VERIFIED` / `SRT_PROVISIONAL` / `FINAL_EDIT_NOT_VERIFIED`. **Owner instruction:** After user-reported video creation, start by selecting voice script, then software/voice identity, produce VO, edit into video, synchronize English subtitles, complete quality review. This is **a handoff**, not an approval of a third-party paid voice provider or silent correction to historical v02.

## A. Hard creative constraints and changing timeline

- All spoken words, on-screen website labels and subtitles should be **English**. Operational notes can be Persian.
- Narration produced **separately from generated video** (no source rendered human dialogue/lip audio requested). Sound effect timing is also edited if generator missed it.
- The previous approved 30s master **targeted** last spoken word at/before `25.000s`. Final seconds `25–30` contain **no narrated dialogue and no corresponding spoken-word subtitles**; background licensed music/ambient endcard SFX allowed.
- But production prompts were for four nominal `6s` scenes, some Dola output UI appeared `10s`; actual final master duration/joins are `UNKNOWN`. Do not assume the original 30s JSON/SRT fits until output is examined.
- Latest confirmed end sequence = **golden city-and-mountain sunset FIRST, logo full hold LAST**. This *changes* prior 30-frame/VO positioning where brand reveal preceded last-two-second sunset. Until new final picture is measured, v02 is historic estimate, not a ready-to-burn caption master.
- Brand exact spelling `Orsola`; domain `orsola.ai` and official SVG are deterministic overlay responsibilities. If logo or URL in generated clip are malformed, compositing correct original vector and text is preferred to repeat expensive video generation.

## B. Existing script, authority and rough 30s read-time cues

Read source files **without modifying them yet**:
- [AV master v02 JSON](production/PA30-MODEL07-AV-SYNC-v02-VOICE-END-25s/PA30-MODEL07-AV-MASTER-v02.json)
- [voice cues CSV v02](production/PA30-MODEL07-AV-SYNC-v02-VOICE-END-25s/PA30-MODEL07-VOICE-CUES-v02.csv)
- [estimated word timing](production/PA30-MODEL07-AV-SYNC-v02-VOICE-END-25s/PA30-MODEL07-WORDS-ESTIMATED-v02.csv)
- [master English subtitles v02 SRT](production/PA30-MODEL07-AV-SYNC-v02-VOICE-END-25s/PA30-MODEL07-SUBTITLES-MASTER-30s-v02.srt)
- [v02 folder readme](production/PA30-MODEL07-AV-SYNC-v02-VOICE-END-25s/README.md).

**Working English narration copy (not all brand/user approved):**

```text
One day. Too many tabs?
Meet Orsola.
An AI assistant for work and everyday life.
Ask about email, your calendar, or reminders—in one conversation.
Less switching. More living.
Explore Orsola.
```

| Cues / estimated previous global seconds | Spoken line | Copy status |
|---|---|---|
| 0.05–2.85 | One day. Too many tabs? | **USER_CONFIRMED exact wording**; audio timing unmeasured |
| 4.16–5.75 | Meet Orsola. | draft |
| 6.25–9.68 | An AI assistant for work and everyday life. | draft |
| 10.07–15.92 | Ask about email, your calendar, or reminders—in one conversation. | draft; illustrative features, avoid asserting verified automation |
| 17.00–19.39 | Less switching. More living. | draft; emotional claim, not measured time saving |
| 23.22–24.76 | Explore Orsola. | draft CTA; speaker intended to finish before 25s |
| 25–30 | **No spoken voice / no spoken-word subtitles** | target conditional on 30s final |

**Do NOT render final VO from this script while final picture duration/cue order is unverified.** In particular, after the user's updated outro order, `Explore Orsola` near 23.22–24.76 may or may not overlap an appropriate picture beat, so its slot must be re-approved/re-timed. If actual master is 24s, cannot retain a 25s speech endpoint; produce shorter script/cues or extend/retime picture after user choice.

## C. Minimum safe next actions / measurable acceptance

1. **Collect four actual output clips or existing joined edit** through user-supplied media (private). Probe using `ffprobe`, NLE Properties or equivalent: duration, FPS, frame dimensions, number of frames, audio streams, codec and final run time. Cross-check visual endpoint (SC04 logo **last**) and watermark. Save checksums/size in private asset ledger; GitHub only public-safe receipt.
2. **Make one picture-only master** on a consistent format and aspect. Verify join points for actual shots, not assume 3×10. If source clips differ in aspect, consciously select landscape vs portrait deliverable; never crop/letterbox blindly or call a phone screenshot the output format.
3. **Revise the actual final spoken English script** after viewing picture. Keep `One day. Too many tabs?` unless user explicitly revises. Present sentence-level choices where they affect legal claims/voice duration, obtain approval of the rest and exact pronunciation of `Orsola`.
4. **Voice casting and provider selection (FREE-FIRST):** define accent neutral/international English, perceived adult speaker gender/style, warm reliable optimistic delivery and cadence; inspect existing connected/local/free tools BEFORE new signup. Official pricing/quota/license, daily/monthly renewability, watermark, commercial-use right, per-character/credit consumption, export WAV/MP3, SSML/pause control, voice restrictions and data retention must be checked. `UNKNOWN COST = DO NOT START CHARGEABLE RUN`. Provider options and specific current free tiers are **NOT YET RESEARCHED/SELECTED** here.
5. **Run low-cost authorized voice test** only once script and appropriate no-spend tool selected; use a short test for Orsola pronunciation, pace and emotional tone; no imitation or cloning of a real person's voice without authorization. Keep original output and settings.
6. **Record one final approved VO track** in lossless WAV where feasible (e.g. 48kHz PCM) without background music; preserve start/end silence so the final last syllable lands within the approved actual-video voice boundary.
7. **Listen and measure actual waveform** for sentence/word beginnings and ends. Build versioned new master `AV-SYNC-v03` (do NOT overwrite v01/v02), derive actual SRT and per-segment SRTs if necessary; test spoken text exactly equals subtitle text.
8. **Use timecode-based NLE edit**: VIDEO clips + genuine official SVG/text overlay on V2 + A1 voice + A2 independently licensed gentle music/SFX + SUB subtitle track. Retain the desired SC01 beeps and SC02 check sounds; de-emphasize music during voice (ducking).
9. **QA** final artifact: exact brand word/site, readable graphics on phone/desktop, no generated UI claims passed as genuine app results, consistent girl and room, no unwanted watermarks under an unsupported commercial license, clear voice/music balance, text/safe margins, caption timings, export duration, no clipped audio, copyright/licensed media terms, client/brand approval before distribution.
10. **Capture real receipt** after inspection: `clip hashes / last source video duration / script version / provider and license / final voice hash and last word second / SRT cue count and end / merged MP4 metadata / final human-review approval`. Only then mark relevant production backlog tasks accordingly.

## D. Candidate software evaluation matrix (criteria; no recommendation/permission yet)

| Task | Minimum necessary ability | Reject/uncertain conditions |
|---|---|---|
| English text to speech | user-selectable voice timbre/accent and controllable pacing; export reusable speech audio; genuine permitted free/credit allotment + commercial rights if to be delivered | upgrade required, ambiguous free credits, watermark, output rights or data-use unknown, vendor charges by surprise |
| Voice timing/alignment | timecode or waveform audition and manual subtitle cue edits; optional forced alignment only if quality/rights acceptable | unverified auto-timestamps that drift from actual audio |
| Video assembly / overlays | accept actual clips/resolutions, frame-accurate trim and joins, exact text SVG overlays, independent sound tracks, compatible export on available Windows system | heavy mandatory paid subscription, exported watermark, encoding failure |
| Subtitle editing/export | SRT support, editable EN punctuation/breaks, safe title positioning, font rights, accessibility | caption end beyond audible speech or over/inside major CTA wordmark |
| Licensed background music / effects | provenance of each sound, commercial-friendly usage rights, no louder competing audio during VO | license unclear, third-party watermark, unwanted auto-generated music |
| Product authenticity | official Orsola SVG + hand-typeset `Orsola` and `orsola.ai` replacing misspelled generated lettering | relying only on high-confidence words in video generation |

**Potential categories, not selected services:** existing Windows NLE, editor supporting SRT + SVG, browser free-tier licensed TTS, local built-in voice/recording, free legitimate sound libraries. Do not imply any of these are free/compatible until actual verification against project requirements and user consent. Avoid making another agent/service stack for what an editor and one voice source can accomplish.

## E. Suggested folder naming in a user-controlled PRIVATE workspace (not yet created)

```text
Orsola-Production/
  00-storyboard-originals/
  01-video-originals/
  02-prompt-and-render-receipts/
  03-voice-tests/
  04-voice-final/
  05-licensed-sfx-music/
  06-srt-synced/
  07-editor-project/
  08-review-exports/
  09-delivery-after-approval/
```

Example final names (PLANNED, NOT CREATED):
- `OR_PA30_MODEL07_EN_VOICE_APPROVED_v01.wav`
- `OR_PA30_MODEL07_AV-MASTER-v03.json`
- `OR_PA30_MODEL07_EN_CAPTIONS_MEASURED_v03.srt`
- `OR_PA30_MODEL07_FINAL_EN_REVIEW_v01.mp4`

## F. Completion status

`USER_REPORTS_VIDEO_GENERATION_COMPLETE` → `NEEDS_ACTUAL_VIDEO_INSPECTION` → `FINAL_CUT_AND_SCRIPT_APPROVAL` → `VOICE_SELECTED_AND_LICENSE_VERIFIED` → `VO_RECORDED_AND_MEASURED` → `SRT_REGENERATED` → `MIX_AND_BRAND_COMPOSITING` → `FINAL_QA` → `EXPLICIT_USER/BRAND_DELIVERY_APPROVAL`.

Avoid writing “Voice created,” “Subtitles synchronized,” “Commercial ad finished,” or “30s joined and exported” before actual media evidence. The immediate next work is **voice/script planning against verified video timecode**.
