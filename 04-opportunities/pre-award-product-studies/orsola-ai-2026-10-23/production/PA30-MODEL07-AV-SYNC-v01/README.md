# ORSOLA-011 | 30-second Model 07 master timing Bible | v01

Status: PROVISIONAL_TIMING_NOT_VOICE_ALIGNED. Model 07 selected by user. 3 silent 10-second videos; English VO made separately, mixed later; subtitle captions laid in post-production. Do not instruct video generator to speak.
Source text from original 20-second v3; exact Hook A One day. Too many tabs? USER_CONFIRMED, other five lines DRAFT awaiting user approval.

## Absolute cue times: DRAFT, not actual recorded audio
| Cue | Master seconds | Literal spoken text | State |
|---|---|---|---|
| V01 | 0.05–0.85 | One day. | USER_CONFIRMED |
| V02 | 0.95–2.80 | Too many tabs? | USER_CONFIRMED |
| V03 | 7.00–8.55 | Meet Orsola. | DRAFT |
| V04 | 10.05–12.95 | An AI assistant for work and everyday life. | DRAFT |
| V05a | 13.08–14.58 | Ask about email, | DRAFT |
| V05b | 14.65–17.00 | your calendar, or reminders—in | DRAFT |
| V05c | 17.08–18.64 | one conversation. | DRAFT |
| V06a | 20.05–21.04 | Less switching. | DRAFT |
| V06b | 21.10–22.18 | More living. | DRAFT |
| V07 | 28.05–29.22 | Explore Orsola. | DRAFT |

## One source of truth
PA30-Model07-AV-MASTER-v01.json contains 30 numbered frames, 3 times 10s clips, existing graphic text and required correction, spoken cue overlaps. Per-second CSV and all SRT files are companion exports. Word-ESTIMATE CSV is not forced alignment: values were split by written character length and are for planning only.
Master absolute time = (clip number minus 1)*10 + local time. Three video clips span [0,10),[10,20),[20,30) with 30.000 exclusive upper limit. Provisional video rate 30 fps, must be locked to editor/renderer later. Crossfades must not alter 30s duration; no VO phrase straddles 10 or 20s.
Master SRT 0–30s is intended for assembled 30s export. Clip C01/C02/C03 SRT files start from local 00:00 for each 10-second video. Place voice on independent A1 track, music/SFX on A2, product/site/logo/approved text in separate video overlays, subtitles on own SUB track.

## Quality issues to resolve BEFORE actual voice/video
1. Generated image has One day graphic at 3–4 seconds, Too many tabs? graphic at 4–5. Approved Hook A must be SPOKEN at 0–3; graphic wording should be shifted to first 3 seconds, not the VO shifted later.
2. Other headlines YOUR LIFE IN FOCUS, A MORE CONNECTED YOU, Clearer minds, Across all your devices, From chaos to clarity, etc are UNAPPROVED and in some cases unverified marketing claims. They are not part of the VO text. See CSV rows and review flags.
3. Generated Orsola symbol and logo are NOT verified authentic SVG; replace with official site source in editor. UI email/calendar/reminder concept panels do not prove functioning live integration. Real UI requires authorized source/sandbox and owner review.
4. Music/fx and deliberate silence are normal: 3–7 secs, 22–28 secs. Subtitles should appear only during audible speech, not every second, and avoid colliding with large screen text.
5. Build and listen to the final English voice WAV before asserting time fit or word accuracy. Adjust actual times with waveform or forced alignment; regenerate SRT from approved JSON; verify on real merged render. Do not mistake estimated per-word times for measured readings.
6. Exact tagline CTA and all other VO lines beyond Hook A remain draft. No video, voice, subtitle burn-in, image generation, paid calls or account action has been performed by creating these text files.

## Text files in this directory
- PA30-Model07-AV-MASTER-v01.json (canonical source)
- PA30-Model07-second-by-second-v01.csv (30 storyboard cells)
- PA30-Model07-voice-words-ESTIMATE-v01.csv (approximate individual word timing)
- PA30-Model07-subtitles-MASTER-DRAFT-v01.srt (30-second master)
- PA30-Model07-C01-00-10s-DRAFT.srt (clip 1 local)
- PA30-Model07-C02-10-20s-DRAFT.srt (clip 2 local)
- PA30-Model07-C03-20-30s-DRAFT.srt (clip 3 local)

Related Orsola v3 text: ../../AD-PILOT-PA-STORYBOARD-v3-HOOK-A-SELECTED.md
Related visual library: ../../AD-PA30-VISUAL-STORYBOARD-ASSET-RECEIPT-2026-10-23.md
Selected 3 split boards backed up in ChatGPT Library under /Orsola-Project/Selected-Model07-3x10s. Their actual image binary is not yet in this public GitHub repo.
