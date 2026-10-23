# ORSOLA-020 — Historical prompt variations and change log (before four preferred final prompts)

**Date:** 2026-10-24. **Evidence:** assistant/user chat messages from October 23–24 and previous persisted project research. This annex preserves *additional practical variants* to explain iteration. For the four main production-length prompts use [ORSOLA-016](06-ORSOLA-VIDEO-PROMPTS-EXECUTED-AND-REVISIONS-2026-10-24.md); the best versions below may be paraphrased/transcribed from chat, not verified Dola submission copies.

## A. First-scene prompt before precise Orsola website branding

**Reason for revision:** video generator could make a credible woman and camera motion but not necessarily real Orsola logo/interface. Initially the user wanted six storyboard beats transferred by the generator, with only phone/alert SFX, no music, white mouse pointer at final CTA.

```text
Create a single coherent 6-second cinematic video in 16:9 with a smooth, natural visual progression from sunrise cityscape to an overwhelmed woman at her desk, then ending on an over-the-shoulder monitor shot.

Start with a beautiful sunrise over a modern city skyline, with warm golden sunlight, soft pink and purple clouds, and distant mountains. The mood is calm for just a moment, like the beginning of a new day. The camera begins as a wide establishing shot and slowly pushes forward.

The camera smoothly transitions into the interior of a cozy modern home office / office workspace. Reveal a young woman sitting behind a computer monitor, seen first from farther back. She is already under pressure. The lighting from the sunrise outside still fills the room with warm purple-orange tones.

Push the camera closer to the woman. She looks overwhelmed, mentally overloaded, stressed, confused, and surrounded by floating app windows and productivity icons — email, calendar, chat, documents, video meetings, tasks, notes. These UI panels orbit or hover around her in a visually chaotic but elegant way. Her body language shows stress: hands on head, tense face, frustrated expression.

From approximately seconds 2 to 4, use NO MUSIC, only office ambience, phone ringing, notification beeps and busy alert sounds.

Then the camera continues forward to an over-the-shoulder monitor view, where a clean purple-and-white productivity assistant website is visible. During seconds 5–6, the WHITE computer mouse cursor visibly moves to the sign-up / start membership CTA button and stops on it, as though she is about to click; do not actually click.

Keep same woman/room/lighting across the shot, polished premium cinematic advertising realism, natural depth of field, smooth push-in camera movement, no random jumps, no extra characters, no generated speech and no background music.
```

**Supplementary short-prompt alternative (same intended scene, for constrained model context):**

```text
Generate a 6-second cinematic 16:9 commercial shot. Start with a sunrise city skyline with warm golden and purple tones. Smooth camera push-in transitions into a home office where a stressed young woman sits behind a computer, overwhelmed by floating app windows like email, calendar, chat, meetings, tasks, and notes. From seconds 2 to 4, show her frustration clearly with hands on head and confused expression while chaotic UI panels surround her. Use no music, only phone ringing, notification beeps and busy office ambience in that section. Continue pushing forward and finish on an over-the-shoulder view of her monitor showing a clean, elegant productivity assistant website/interface in purple-white tones. Maintain continuity of same woman/room/lighting and smooth camera motion. End with a small white cursor hovering over the sign-up CTA.
```

**Edit that changed the outcome:** replace generic website with name/domain/logo/instruction and URL `https://www.orsola.ai/en`; exact `Orsola`, `orsola.ai`, screen text, and cursor motion became explicit.

## B. Connection segment — short/focused fallback text (same story as full SC02)

```text
Create a 6-second cinematic 16:9 commercial video continuing from the previous Orsola scene. Keep the exact same woman only: late 20s to early 30s, light skin, slim face, dark brown hair in a loose messy bun, oversized beige knitted sweater, seated at the same desk in the same warm sunrise-lit modern apartment home-office. Floating scattered digital cards around her represent email, messages, reminders, meetings, tasks, documents, and calendar items. A glowing purple light emerges from the monitor and connects the floating cards one by one. Each connected card receives a green check mark. The woman watches with surprise and relief as everything becomes organized. At the end, all scattered cards transform into one clean unified floating list with green check marks, showing that everything has been consolidated. If the monitor is visible, it must still show the Orsola website with the Orsola logo, white-and-purple interface, the brand name "Orsola," the address "orsola.ai," and if possible the "Start with Orsola" button. No music, no narration, no dialogue. Use only subtle room ambience plus a satisfying cashier-register-style "cha-ching" confirmation sound each time a green check appears. Premium cinematic commercial realism, smooth motion, elegant purple light effects, and consistent character identity throughout.
```

**Primary requested transition:** scattered cards → purple cord/energy reaches each → synchronized soft register ping + green check → **one** list, with woman observing. Do not equate checks to real product behavior.

## C. Third-scene first version (before aviation headset requirement)

```text
Create a single coherent 6-second cinematic commercial video in 16:9, continuing directly from the previous Orsola scene. This clip must feel like the natural next moment after the scattered floating items were connected and transformed into one clean organized list. Keep the same exact female character, same room, same desk, same sunrise-to-golden-morning lighting and same premium cinematic visual world.

Show one single young professional woman in her late 20s to early 30s, light skin, slim realistic face, expressive eyebrows, natural eyes and dark brown hair in loose messy bun, wearing the same oversized soft beige knitted sweater. Her face should be photorealistic, not cartoonish.

Begin with the completed floating list beside the computer with green checkmarks and golden sunlight streaming through the full-height window. Gently pull the camera back to reveal the same woman now relaxed, refreshed, satisfied, joyful and focused on work. She works smoothly at the desktop while lifting a beautiful ceramic cup of coffee, briefly enjoying a sip and smiling gently. If computer is shown, the Orsola name, violet ring, white-purple interface, website orsola.ai should remain recognizably consistent.

Transition near the ending from the cozy office to a peaceful sunlit street, where the same woman, recognizable from the previous shots, holds a small child's hand and walks calmly together with them. End on beautiful warm golden sunlight suitable for the next logo-reveal shot.

Use natural human movement, premium cinematic commercial realism, soft golden-hour light, smooth camera pullback and match transitions, no new adult character, no wardrobe/hair/face changes, no cartoon styling, no video-generation narration/dialogue/music. Subtle room, cup and outdoor ambience are allowed.
```

**Later user-added requirement:** one-ear discreet aviation-style headset with boom mic near corner of mouth; natural *silent* lip movements implying voice command. Do NOT make her talk audibly, or drink coffee while simultaneously speaking; her fixed appearance remains the same. The preferred revised full version is SC03 in [ORSOLA-016](06-ORSOLA-VIDEO-PROMPTS-EXECUTED-AND-REVISIONS-2026-10-24.md).

## D. Fourth-scene first-outro candidate and reversal of the old storyboard

**Early final-prompt order selected by user (changes original 30-frame poster):**

```text
Create a single coherent 6-second cinematic brand outro video in 16:9, continuing naturally from the previous Orsola advertisement scene. Start from an open-air park or peaceful outdoor space; no office or person is needed. The camera pulls backward and outward, the opposite of the opening forward camera move into the building, revealing a wide golden-orange sunset, glowing modern city and distant mountains under pink-violet clouds.

After the opening 1.5–2 seconds sunset, gracefully dissolve into a deep-black, minimal cinematic background. Dispersed purple mist, fine glowing violet particles and restrained light ribbons spread around the center and lower part of the frame. The scattered energy coheres and forms a clean tilted hollow violet Orsola ring. Beneath the ring, reveal exactly "Orsola" and then "orsola.ai"; final completed brand composition centered, readable, sharply held to final frame. Never return to sunset after the logo.

No voice or dialogue, no music; only a soft backward-camera whoosh, quiet ethereal shimmer and one gentle brand-completion chime. No extra characters, inaccurate words, clutter, unrelated websites, cartoon effects or violent transitions.
```

**Why this changed:** Earlier revised Part C still board illustrated diffuse purple ring/wordmark from ~20–28s and final city sunset at ~28–30s. In the text-video continuation, the user specifically reconsidered the order, then chose **`sunset first → final frame fully formed logo/domain`** so branding was retained on-screen at the end. This is not a contradiction in user intent—it's a creative decision later than the poster.

## E. High-precision brand prompt addendum

**Literal approved identity data, from published site and brand registry:**
```text
EXACT official name (six letters, case sensitive): Orsola
EXACT domain (lowercase): orsola.ai
English home reference: https://www.orsola.ai/en
Official brand-asset candidate references:
https://www.orsola.ai/brand/orsola-logo-hero.svg
https://www.orsola.ai/brand/orsola-logo-light-beta.svg
https://www.orsola.ai/brand/orsola-mark-light.svg
```

**Creative/storyboard image instructions (NOT proof of official SVG geometry):** a luminous slightly tilted thick violet elliptical ring with clear hollow center, polished beveled/reflective dimensional thickness, controlled soft lavender highlights against almost-black background. Fluid purple haze/ribbons/particles gather into the ring, then display one large stable `Orsola` word below and smaller `orsola.ai` below that. Approximate extracted branding colors `#7133D2` and `#663399`, not owner-supplied official kit. No `Orsula`/`Orsolia`/`Orsola.com` or added `https://` in final card.

**Technical LIMIT:** an LLM prompt with SVG URL cannot force a video generator to dereference that URL or type guaranteed correct glyphs. Correct original SVG and exact text in post-production, retain cinematic light reveal as an underlying plate. This remedy prevents wasted paid/credit retries.

## F. Data retention and omissions

This annex documents additional historic variants recovered in the conversation but is **not a substitute** for a raw exported Dola prompt history. Older preproduction image-generation prompt exact strings from the first window were not available verbatim from the canonical repository in the current session. What IS recoverable now: ten storyboard PNG IDs and checksums, selected Model07, visual revisions and five current image receipts, six timed scene descriptions, four main final video prompting specifications and this comparison of earlier alternatives.

For a full forensic prompt ledger in future, export the exact text sent to provider with timestamp, chosen model/quality/duration, actual output/hash, credit ledger, and revision diff immediately after each run.
