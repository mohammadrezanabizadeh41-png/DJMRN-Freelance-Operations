# ORSOLA-018 — Real video-generation observations, Dola receipts, defects, costs/unknowns, lessons

**Recorded:** 2026-10-24. **Evidence categories:** `DIRECT_SCREENSHOT_VISIBLE`, `USER_REPORTED`, `EDITORIAL_INTENT`, `UNKNOWN`. Screenshots were present in the user's continuation chat (not uploaded to public GitHub as video binary or third-party footage). This log separates render attempts from actual facts about product functionality.

## 1. Why the workflow shifted from reference-image video to text-only prompting

**Initial intent:** use predesigned Model07 storyboard contact sheets or six separately cropped 01–06 keyframes as input reference images to Seedance; user shared the six-picture first scene board. The assistant at one point supplied links to a six-frame PNG ZIP from a working chat container.

**Observed constraint, USER_REPORTED:** Dola's interface did not let the user supply those storyboard images to the actual video render in the manner desired; sending text to Dola chat sometimes did generate a video and sometimes produced an error. Therefore **do not assume image conditioning, web URL reading, reference video or multi-image consistency support just because a model vendor supports them elsewhere.**

**Operational adaptation:** present one cohesive English prompt per segment, with strong visual and audio descriptions, exact Orsola name/domain, recurring character identity, camera motion, timing and negative constraints. This is an **approximation** to storyboard, not pixel-exact execution.

## 2. Attempt/result ledger

| Run ID | Segment | Evidence of input/attempt | Result actually supported | Model, credit and caveat |
|---|---|---|---|---|
| OR-VID-001A | first scene 0–6 | user pasted long cinematic video prompt into Dola; response promised ready soon | screenshot then said `I can't generate the video and didn't use any credit for this generation.` | `FAIL_USER_VISIBLE`; no credits consumed **according to Dola's text**; exact underlying error `UNKNOWN`; promised waiting time was unreliable |
| OR-VID-001B | opening scene revised | shared screenshots of user-rendered video, woman at desk, floating cards, large Orsola screen and CTA | `USER_REPORTED_SUCCESS`, still images show composition achieved; in one shot brand/logo/text look approximate and may have generation artifacts | output source MP4 `NOT_INSPECTED`, exact model/credits `UNKNOWN`; watermark `Dola AI` visible |
| OR-VID-002 | connecting cards | shared player screenshots around a violet energy line, same woman and Orsola website, green check icons on panels; user said first 2 videos are good and can follow each other | `USER_REPORTED_SUCCESS`; scene logic partially visually corroborated by screenshots | one playback UI shows `00:01` with `00:09` remaining and `00:06` with `00:04` remaining, **suggesting a nominal 10s preview**; true MP4 duration unverified; watermark visible |
| OR-VID-003A | relief/coffee/headset/mother-child | Dola screenshot explicitly displayed `Dreamina Seedance 2.0 Fast` and then `I can't generate the video and didn't use any credit for this generation.` | `FAIL_USER_VISIBLE` for this attempt only; no credited charge according to Dola | do not equate `Seedance 2.5` named in human prompts with the actual `Seedance 2.0 Fast` label shown on this run |
| OR-VID-003B | third scene continuation | user added aviation-style microphone/headset and asked full revised scene prompt; later said overall video creation complete | `PROMPT_SUPPLIED` + `USER_REPORTS_OVERALL_VIDEO_DONE`; **separate successful SC03 render not independently seen by archivist** | source clip/true character matching/voice lip motion/credits `UNKNOWN` |
| OR-VID-004 | outro | user changed scene order to broad sunset first, black+purple formation and exact Orsola brand logo/domain **LAST**; final detailed text prompt supplied | `PROMPT_SUPPLIED` + user later explicitly said videos made and video phase complete | final SC04 output/actual text glyphs/official SVG comparison/source MP4 `NOT_INSPECTED` |
| OR-VID-MASTER | combined output | user says `video completed/created` and wants voice next | `USER_REPORTED_VIDEO_STAGE_COMPLETE`, **not** `INDEPENDENTLY_VERIFIED_JOINED_30s_MASTER` | file, actual total duration, fps, ratio, joins, clip number, color and sound rights `UNKNOWN` |

## 3. Captured visual facts vs defects to inspect in actual files

**Known user-visible result snippets (from screenshots, not source MP4 metadata):**
- SC01: modern sunlit apartment desk, woman in beige knit sweater with brown updo, floating violet-white notification cards, red badges, desktop monitor and Orsola-like page. Camera perspective includes side desk and rear/shoulder monitor shot.
- Brand monitor looked **approximate** in Dola output: stylized/different ring, pseudo-spelling or incomplete detailed text possible. A readable `Start with Orsola` purple CTA is visible on one still, but true screen pixels/official web fidelity unverified. Never claim exact product UI reproduced.
- SC02: similar woman at desk, purple glowing stream from monitor toward floating panels, green check symbols; second screenshot shows her looking upward. AI-generated panel microtext is synthetic, not account evidence.
- At least one rendered screenshot has `Dola AI` watermark. This **may need removal only via authorized license/tool export**, not deceptive watermark stripping. A watermark-free public/commercial deliverable is **NOT CONFIRMED**.
- SC02 playback displayed vertical portrait-shaped preview inside phone UI, whereas working prompt requested 16:9; screenshot UI alone cannot prove source output aspect. Export ratio must be probed, not inferred.
- Photo/physical continuity across clips still needs visual QC. Textual `same woman` instructions improve odds but do not lock a face with no supplied reference.
- Scene SC03 may be visually overcrowded for 6 seconds (voice headset, coffee, work, child outdoors). Prior success/failure cannot be used to isolate the cause of Dola error.

**Audio observations:** User requested SC01 phone/notification beeps seconds 2–4, SC02 timed cash-register-like completion ticks, SC03 voice conversation indicated by headset/lips but **no generated audible words**, SC04 subdued brand swoosh/chime. Actual exported track existence, timing and license `NOT_INSPECTED`.

## 4. Tool, quota and cost governance

- **Client app:** Dola mobile app/chat is visible in screenshots, not a proven direct invocation of Seedance's full first-party creation interface.
- **Named model observed at least once:** `Dreamina Seedance 2.0 Fast` (Dola message). Other assistant text called it Seedance 2.5 or generically Seedance; do **not** assert all actual renders used one model/version.
- **Free quota:** Dola said failed runs did not consume credits; no independent quota ledger or terms, per-model commercial rights, watermarks or overage terms verified. `ACTUAL_TOTAL_SPEND=UNKNOWN`; never represent free-only generation as a proved unlimited commercial license.
- **No new paid subscription, free credit expenditure, provider connection or model activation is authorized by archiving.**

## 5. Reusable lessons, assessed and actionable

1. **A composite storyboard poster is a human review tool**, not necessarily a valid start frame for image-to-video.
2. **Verify actual provider UI capabilities**: vendor model can accept references, reseller chat might not.
3. **Separate strong text-only creative prompting from deterministic brand overlays**: generators make mistakes in logos/site URLs, so insert owner-accepted original SVG and exact manually typed `Orsola`/`orsola.ai` in edit.
4. **Keep one recurring-character continuity sheet** for facial proportions, brown updo, beige sweater, home-office; monitor identity and city window consistent.
5. **Structure text prompts around physically observable action order**, camera and sound. Do not request six unrelated scene jumps in six seconds; use a single motion progression.
6. **Time each pleasant SFX with its visible event**, e.g. green check gets soft POS confirmation, avoid repeated loud beeps once calm begins.
7. **Be explicit about VO**: no generated speech/music in footage if separate professional English VO and licensed background score will be composed after.
8. **A failure message is an attempt-level result**, not proof user account blocked permanently; distinguish unsuccessful runs from later user-reported successful footage.
9. **Capture actual media metadata before claiming done**: ffprobe/NLE project duration, fps, width×height, audio stream, resolution, encode profile, audio loudness and render hash. Do not spend model credits to repair what deterministic compositing can fix.
10. **Advertising authenticity**: generated green checks, browser screens and voice-headset visual are metaphors until authentic Orsola functionality is tested with an authorized synthetic account. Claims of unlimited/automatic real tasks, territory eligibility, exact savings are not substantiated.
11. **Lock final creative order explicitly**: confirmed `sunset → black-violet energy → stable Orsola logo/site`, supersedes prior `logo → sunset` poster direction.
12. **Do not assume four 6s prompts produce a 30s completed picture**; a displayed player seemed 10s for one segment. Build final VO/SRT timebase from actual assembled picture.

## 6. Minimal evidence follow-up when clips are available

For every video, record: `source filename, stored location (PRIVATE), SHA256, requested/actual duration, stream width/height/fps, provider/model version (if shown), generated or licensed audio, watermark/commercial usage, human character consistency, brand spelling, site URL spelling, visual storyboard match, clip transition in/out, user QA decision`.

**Do not upload media binaries or personal voice files to this PUBLIC repository merely to fulfill the archive.** Store only safe receipts and private approved pointers. Final client publishing/brand use requires separate approval.

**Related authorities:** [original pipeline QA](AD-PRODUCTION-WORKFLOW-AND-QA.md) · [latest user-reported production handoff](05-ORSOLA-015-OPERATIONAL-VIDEO-PRODUCTION-ARCHIVE-2026-10-24.md) · [exact scene intent/prompt revisions](06-ORSOLA-VIDEO-PROMPTS-EXECUTED-AND-REVISIONS-2026-10-24.md).
