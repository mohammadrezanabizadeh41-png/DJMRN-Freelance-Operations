# ORSOLA-016 — English video prompt archive: production iterations, four final scene specifications and reusable logic

**Recorded:** 2026-10-24 · **Goal:** G1/P-A Model07 · **Source:** text of assistant prompts/user-directed revisions in project-continuation chat plus older repository records. **Archival honesty:** These are the prompts *supplied* to the user, not byte-verified copies of the exact text actually pasted into every Dola render. The original Dola submission text/log and output MP4s have NOT been read back by this archivist.

## Prompt evolution / requirements (retain why each prompt changed)

| Revision | Trigger | Preserved change | Evidence |
|---|---|---|---|
| SC01-A initial scene | 3×2 01–06 storyboard image: sunrise → stressed woman → monitor | six-second continuous camera push; 2–4s telephone/ringing/alert sounds; no music; white mouse pointer to signup CTA at seconds 5–6 | User-supplied storyboard and dialogue. |
| SC01-B branded monitor | Dola chat could generate text-to-video but did not accept storyboard image for model input | added exact `Orsola`, `orsola.ai`, official-home style, purple-ring mark, white-violet homepage, call-to-action `Start with Orsola`; avoid generic website; admitted generator cannot ensure exact text | Prompt supplied before user shared first output images. |
| SC02-A continuity | First render showed specific woman + home-office | repeat physical appearance and room description: brown messy bun, realistic expressive face, beige knit sweater, morning light, city view; same Orsola screen | User-provided stills of first rendered video; next prompt. |
| SC02-B completed cards | Need visual orchestration and sonic payoff | purple energy from monitor connects floating notifications sequentially; each obtains green check and small cash-register-like `cha-ching`; six cards merge to *one* organized list | User refinements and corresponding second playback screenshots. |
| SC03-A life balance | Same woman should become relaxed, drink coffee, work, then walk with child | warm sunlit room, coffee, smile, same face/costume, exterior mother-child scene, sunlight transition; photoreal rather than cartoon | User direction and assistant prompt. |
| SC03-B voice visual | User wanted capability for voice assistant conveyed visually | small single-ear aviation-style headset with boom mic, visible natural lip motion, no generated dialogue, continue coffee & child sequence | Final revised third scene prompt supplied. Dola screenshot showed one unsuccessful attempt with no credits reported consumed; failure cause unknown. |
| SC04-A branded outro | Chose panorama then dark energy/brand, or alternatively sunset last | camera reverses opening move, pulls outward from park to city and mountains, violet light concentrates into logo | User picked sunset FIRST then brand LAST. |
| SC04-B precision | User demanded name/logo/domain not misspelled | detailed tilted hollow violet ring, `Orsola` (6 letters) and `orsola.ai` (exact lowercase domain), SVG reference URLs, typography and logo hold in final frame | Final fourth-scene prompt supplied; AI text rendering still not guaranteed. |

**Audio policy:** generation scenes are silent of VO and music; selectively permit phone/alerts SC01, confirmation SFX SC02, room/coffee/outdoor ambience SC03, soft brand shimmer SC04. External English VO/music and measured subtitles are separate. The original master 30s ending-voice-by-25 requirement was not waived.

---

## SC01 — 6s opening, from panoramic sunrise into stressed workday and Orsola CTA

**Status:** `PROMPT_DELIVERED`; user reported first video generated satisfactorily (not independently verified). **Aspect:** 16:9 requested. **Site:** https://www.orsola.ai/en.

```text
Create a single coherent 6-second cinematic commercial video in 16:9. The video begins with a beautiful sunrise over a modern city skyline, with warm golden sunlight, pink and purple clouds, and distant mountains, creating the feeling of the start of a new day. The camera slowly pushes forward from this wide establishing shot and smoothly transitions into a modern apartment / home-office interior. Inside, reveal a young woman sitting behind a computer monitor at her desk. She looks stressed, overwhelmed, mentally overloaded, and confused. Her expression is tense and frustrated, and she is surrounded by floating app interface cards and productivity icons such as email, calendar, chat, reminders, documents, meetings, and task windows, visually showing that she is lost in too many tools and notifications. Keep the same woman, same room, same lighting, and smooth cinematic continuity throughout the whole 6 seconds.

From around seconds 2 to 4, there must be no music at all. Use only stressful sound design: subtle office ambience, phone ringing, digital notification beeps, alert sounds, and a busy, cluttered atmosphere that emphasizes pressure and confusion.

As the camera keeps moving forward, transition into an over-the-shoulder view of the computer monitor. On the monitor, clearly show the official-looking Orsola website homepage, not a generic website. The monitor should display a clean, modern white-and-purple productivity assistant website with visible Orsola branding. In the top-left area of the screen, clearly show the Orsola logo: a purple circular ring icon followed by the word “Orsola” in a clean modern sans-serif style. The website should visibly feel like the real Orsola brand and interface. Show a polished homepage hero section with elegant purple gradient graphics and organized productivity elements. Make the page look like a premium AI assistant website for work and everyday life.

The visible website content on the screen should include a large clean hero headline similar to an official brand homepage, such as “Everything you need, in one place” or “Your AI assistant for a calmer, more focused day,” plus a clear call-to-action button that reads “Start with Orsola” or “Get started.” Also show the website address “orsola.ai” visible on the page or in the browser area. The page should visually support the brand identity with white background, purple accents, minimal elegant layout, soft tech graphics, and productivity-related UI cards.

During seconds 5 and 6, clearly show the white computer cursor moving toward the call-to-action sign-up button on the website and stopping on it, as if the woman is about to click and sign up. The final moment should end with the cursor resting on the button while the woman is looking at the screen. The website on the monitor must look branded and recognizable as Orsola, with its logo, name, and orsola.ai visible. Overall style should be premium cinematic commercial realism, emotionally expressive, smooth camera motion, realistic lighting, soft depth of field, polished tech-commercial aesthetics, no random scene changes, no extra characters, and no background music.
```

**Later tightening in the subsequent master rendering prompt:** explicitly referenced `https://www.orsola.ai/en`, spelling `Orsola`, and headline `Your AI personal & professional assistant` or `From conversation to completion`. Scene/alert/cursor logic stays as above. A more detailed official-site variant was also supplied:
```text
CRITICAL WEBSITE AND BRAND REQUIREMENT: The monitor must display the Orsola website, not a generic or anonymous AI dashboard. The official website reference is https://www.orsola.ai/en and the brand name is spelled exactly "Orsola". If website access is supported, use that public homepage as the visual reference. Otherwise create the closest possible faithful representation using the following specific brand details. Show a polished, predominantly white website with clean typography, violet-purple gradients, and modern assistant visual elements. The header contains a recognizable violet circular-ring-style Orsola brand symbol next to "Orsola". The hero message reads "Your AI personal & professional assistant", supported by refined purple graphics. Show a prominent rounded purple button labeled "Start with Orsola"; show "orsola.ai" in the browser address area. During seconds 5–6 the WHITE ARROW CURSOR moves toward the CTA and stops on hover without clicking or opening another page. All visible website language is English; no music, no spoken dialogue, no subtitles.
```

## SC02 — 6s connecting the six floating cards / sequential checkmarks → one list

**Status:** `PROMPT_DELIVERED`; user reported first two videos fit together, shared SC02 stills from actual player (not independently verified video). **Critical reusable details:** stable woman, connected violet wave, audible per-check POS-style confirmation, **metaphorical illustration**, not authenticated Orsola task-completion evidence.

```text
Create a single coherent 6-second cinematic commercial video in 16:9, continuing directly from the previous Orsola scene. Keep the same exact female character, the same room, the same sunrise mood, the same modern apartment home-office, and the same premium cinematic style throughout the entire clip.

CRITICAL CHARACTER CONSISTENCY:
Show only one woman and keep her visually identical throughout the whole video. She is a young professional woman in her late 20s to early 30s, with light skin, a slim face, expressive eyebrows, slightly worried but intelligent eyes, natural features, and dark brown hair tied in a loose messy bun. She is wearing an oversized soft beige knitted sweater. Her face should look realistic, tired, stressed, and mentally overloaded at first, then gradually shift toward surprise, relief, and cautious hope. Do not generate a different woman, do not add extra characters, and do not change her hair, face, clothing, or environment.

SCENE AND ENVIRONMENT:
She is seated at the same desk in the same warm, elegant, modern apartment / home-office at sunrise, with large floor-to-ceiling windows, soft golden morning light, a faint city skyline outside, and a clean stylish desk setup. The lighting should remain warm and cinematic, mixing natural sunrise tones with subtle purple digital accents.

VISUAL STORY:
At the start of the clip, the woman is still surrounded by scattered floating digital cards and interface panels in the air around her. These represent email, messages, reminders, tasks, calendar items, meetings, and documents. They are visually separate and somewhat chaotic, floating at different positions around her. She looks at them with confusion and stress.

Then a glowing intelligent PURPLE LIGHT emerges from the computer monitor, like a digital energy line or elegant flowing connection beam. This purple light moves outward from the monitor and begins connecting the scattered floating cards one by one. The motion should feel smooth, elegant, and intelligent, like one assistant connecting all her tools into one system. As each card gets connected by the purple line, that card becomes organized and receives a clear GREEN CHECK MARK.

The connections should happen progressively and clearly, with multiple items being linked in sequence. The woman slightly raises her head and watches with surprise as the floating elements around her begin to make sense. Her expression gradually changes from overwhelmed and confused to amazed, relieved, and hopeful. She remains seated in the same place, observing the transformation happening around her.

As the purple connection light continues, all the scattered cards become aligned and organized. At the end of the clip, the floating cards smoothly merge and transform into one clean unified floating list in the air near her, with neatly aligned list rows and a prominent GREEN CHECK MARK beside the completed unified list. The final result should clearly show that all the scattered tasks and messages have been consolidated into one organized workflow list.

MONITOR / WEBSITE CONSISTENCY:
If the monitor is visible at any point, it must continue showing the same Orsola website identity from the previous scene, not a generic site. The screen should show a clean white-and-purple branded AI assistant website with the name “Orsola”, a purple circular-ring style logo, and the website address “orsola.ai”. If readable, include the “Start with Orsola” button. The screen must feel like the same branded Orsola homepage already introduced in the previous shot.

CAMERA:
Use smooth cinematic motion and coherent visual storytelling. The framing can remain a medium shot or a slightly over-the-shoulder angle, but it must clearly show the woman, the floating scattered cards, the purple connection light, the green check marks, and the final unified list. No random cuts, no chaotic camera shake, and no confusing transitions. The transformation should be visually easy to understand.

SOUND DESIGN:
No background music. No narration. No dialogue. No singing.
Use subtle room ambience only.
As soon as the purple light starts connecting the floating items, add satisfying confirmation sounds each time a green check mark appears. These sounds should feel like a pleasant cashier-register / checkout / point-of-sale “cha-ching” confirmation sound, soft but recognizable, timed to each successful green check. The sound should communicate progress, completion, and order. As the linking continues, let these confirmation sounds repeat rhythmically with the green checks, creating a satisfying sense that the scattered items are being connected and completed.

STYLE:
Premium cinematic commercial realism, polished technology advertisement, elegant visual effects, warm sunrise light, refined purple glow, emotionally clear storytelling, soft depth of field, realistic human performance, and highly consistent character identity.

AVOID:
No extra characters, no new faces, no character switching, no different outfit, no distorted anatomy, no random websites, no anonymous branding, no unrelated logos, no unreadable final list, no comedy tone, no horror tone, no background music, and no abrupt cuts.
```

## SC03 — 6s golden sunlight, woman using headset/voice, coffee, outdoor mother-child

**Status:** `PROMPT_DELIVERED`; **one screenshot** of Dola `Dreamina Seedance 2.0 Fast` failure stated `I can't generate the video and didn't use any credit`. Whether a later retry succeeded is `USER_REPORTS_ALL_VIDEO_CREATED` but not independently verified. The first SC03 version omitted headset; user required headset/visible speaking, so below is the revised preferred SC03 version.

```text
Create a beautiful, photorealistic, 6-second cinematic commercial video in 16:9 widescreen, continuing naturally from the previous Orsola advertisement scene. Preserve the exact same visual world, female character, apartment, desk, monitor, window, sunrise lighting, and premium commercial realism.

CHARACTER CONTINUITY — VERY IMPORTANT:
The protagonist is the same young professional woman from the previous scenes, approximately 28–32 years old, with fair natural skin, a softly oval and slender face, delicate realistic facial features, expressive dark eyebrows, brown eyes, a straight natural nose, and medium-to-dark brown hair loosely gathered into a slightly untidy high bun, with a few soft strands framing her face. She wears the same oversized cream-beige knitted sweater with long sleeves.
Her appearance must remain natural, realistic, recognizable, and consistent. Maintain authentic skin texture, realistic human proportions, natural expressions, and believable movements. Do not create a new woman, change her facial structure, hairstyle, outfit, or age. Avoid cartoonish, plastic-looking, overly stylized, or artificial faces.

SETTING AND STORY:
The video begins immediately after the previous sequence, where scattered floating productivity cards have been connected by glowing purple energy and transformed into one neat, unified checklist with green completion marks.
The organized floating list is briefly visible beside her computer. Beautiful golden sunlight streams through the same large floor-to-ceiling windows, creating a luminous, hopeful atmosphere. The camera gently moves away from the completed list, passing through a warm natural sunlight flare, and slowly pulls back to reveal the woman in the same home-office environment.
She is now completely relaxed, refreshed, confident, and genuinely happy. Her stressful expression has disappeared, replaced by a warm, naturally radiant smile and a feeling of deep satisfaction.

NEW FEATURE — VOICE ASSISTANT INTERACTION:
The woman is now wearing a small, elegant, professional single-ear aviation-style headset, with a slim adjustable microphone boom positioned naturally near the corner of her mouth. The headset is lightweight, modern, discreet, and realistic, like a professional pilot or communication headset, not oversized headphones or a helmet.
Show her comfortably interacting with the Orsola AI assistant through this headset. Her lips move naturally as though she is speaking a short voice command. She smiles slightly while speaking and looks toward her computer monitor, demonstrating effortless hands-free voice interaction.
Her movements should communicate that she can organize her work and interact with her AI assistant simply by speaking, without struggling with multiple applications.
Do not generate audible speech or spoken dialogue. The visual mouth movement alone should communicate voice interaction, allowing professional narration to be added separately later.

COFFEE, PRODUCTIVITY, AND HAPPINESS:
The camera continues a smooth cinematic pullback as golden sunlight illuminates her face and sweater. She works confidently and comfortably at her computer, with the small headset microphone still visible.
A beautiful ceramic cup of freshly prepared cappuccino or latte sits beside her keyboard, with delicate steam rising from the warm coffee.
She briefly lifts the cup, enjoys a natural sip of coffee, then smiles with genuine satisfaction and returns her attention to the monitor. She can alternate between gently using the mouse or keyboard, speaking naturally through her headset, and enjoying her coffee.
Her gestures must feel realistic and effortless. She should not drink and speak at the exact same moment.
If the computer monitor is visible, preserve the established Orsola branding: a clean white-and-purple interface, the violet circular Orsola symbol, the name "Orsola", and a tidy organized workflow. The website identity should match https://www.orsola.ai/en. Do not introduce unrelated websites, random branding, or fictitious detailed interface text.

OUTDOOR LIFESTYLE TRANSITION:
Toward the final part of the clip, create a gentle cinematic match transition from the warm office sunlight to a beautiful, peaceful, sunlit city street.
Briefly show the same recognizable woman, still wearing her familiar beige sweater and hairstyle, now outdoors, gently holding hands with a small child as they walk together along a lovely tree-lined pedestrian street.
She looks peaceful, happy, carefree, and emotionally fulfilled. The child walks naturally beside her. Their movements should be subtle, realistic, and affectionate, communicating a balanced life with more time for meaningful personal moments.
The camera moves slightly behind them, capturing their relaxed walking silhouettes in the warm golden sunlight.

FINAL TRANSITION:
Finish with a beautiful, clean shot of warm golden sunlight glowing through the trees and across the peaceful street. The golden light gently fills the camera lens, creating an elegant luminous transition suitable for the next Orsola logo-reveal sequence.
Do not show the final logo animation yet. End with a calm, radiant, emotionally satisfying golden-light composition.

CINEMATIC DIRECTION AND TIMING:
0–1 second: Start from the completed organized floating checklist and transition naturally toward beautiful golden sunlight.
1–4 seconds: Smooth camera pullback reveals the same woman, now happy and productive, wearing her discreet single-ear headset and speaking naturally into its microphone. Show her enjoying coffee and working comfortably at her computer.
4–5 seconds: Graceful warm-light transition to the same woman peacefully walking outdoors while holding a small child's hand.
5–6 seconds: Beautiful golden sunlight fills the scene, creating a clean and uplifting transition into the next advertisement sequence.

SOUND DESIGN:
No background music, no narration, no audible speech, and no singing.
Use only subtle natural sounds: peaceful morning room ambience, very light keyboard movements, a gentle ceramic coffee-cup sound, and soft outdoor ambience during the walking moment.
The atmosphere should feel calm, positive, relaxed, and satisfying. Do not include telephone ringing, stressful alarms, chaotic notifications, or loud effects.

VISUAL QUALITY:
Premium live-action cinematic realism, natural human appearance, believable headset and microphone design, realistic coffee drinking, soft golden-hour lighting, authentic facial expressions, beautiful natural lens flare, realistic depth of field, smooth cinematic camera movements, consistent environment, warm refined color grading, and polished international technology-advertising aesthetics.
Prioritize recognizable character continuity, natural voice-assistant interaction, emotional transformation, coffee enjoyment, and the peaceful golden ending.
Avoid additional adult characters, changes in the woman's identity, exaggerated smiles, unnatural lip movements, incorrect headset placement, extra fingers, distorted hands, cartoon-like textures, artificial facial features, duplicate objects, random websites, unnecessary floating interface clutter, subtitles, watermarks added by the scene, abrupt camera changes, and background music.
```

## SC04 — 6s sunset FIRST, exact Orsola logo LAST

**Status:** `PROMPT_DELIVERED`; user explicitly selected `sunset → dark violet → logo remains last`, then asked for a detailed logo specification. Storyboard has a reference *conceptual* tilted purple glowing hollow ring, not proof of current official SVG geometry. Thus where generator cannot fetch SVG, visually imitate concept and **correct with official SVG in editor**.

```text
Create a single, seamless, premium cinematic brand-outro video, exactly 6 seconds long, in 16:9 widescreen. This is the final sequence of a professional Orsola AI assistant advertisement. Preserve the established cinematic color grading, golden sunset atmosphere, rich violet highlights, elegant camera movement, and sophisticated visual style of the previous scenes.

OPENING — THE REVERSE CINEMATIC CAMERA MOVEMENT:
Begin outdoors in a beautiful open-air park or peaceful urban landscape, naturally continuing from the previous scene where a mother and child were walking together. No characters need to appear in this closing sequence. The camera smoothly pulls backward and outward, the visual opposite of the opening advertisement shot where the camera traveled from the distant city into an apartment. As the camera retreats, reveal an increasingly spectacular panoramic view: a beautiful modern city skyline nestled among distant mountain ranges, dramatic golden-orange sunset light on the horizon, soft pink and violet clouds, subtle atmospheric haze, and warm glowing sunlight reflecting across the city.

TRANSITION — SUNSET INTO PURE DARKNESS:
After approximately two seconds, gracefully transition from the panoramic sunset into a sophisticated, minimalist, almost-black environment. Use a deep charcoal-black background with a very subtle dark-violet undertone, approximately #08050F to #1B1627. The background must remain clean, dark, and uncluttered. Begin with a delicate, diffuse cloud of purple luminous mist suspended in darkness. Tiny violet particles, thin flowing light ribbons, and softly glowing energy appear across the center and lower part of the screen.

CRITICAL — OFFICIAL ORSOLA BRAND IDENTITY:
The brand being revealed is named exactly: Orsola.
The official website domain is exactly: orsola.ai.
The official English website is: https://www.orsola.ai/en.
Official brand artwork references:
https://www.orsola.ai/brand/orsola-logo-hero.svg
https://www.orsola.ai/brand/orsola-logo-light-beta.svg
https://www.orsola.ai/brand/orsola-mark-light.svg
If access to these official SVG resources is supported, use them as the authoritative reference for actual logo geometry, proportions, and typography. Otherwise follow the visual instructions below matching the selected Orsola storyboard as closely as possible.

LOGO GEOMETRY — PRECISE VISUAL DESCRIPTION:
The featured animated concept logo is an elegant, continuous, three-dimensional violet elliptical ring with an open, hollow center. The ring resembles a slightly tilted, thick, smooth, luminous circular band viewed at a subtle three-quarter angle. It must remain a complete closed ring, not a letter, spiral, broken circle, crescent, or chain. Its outer silhouette is smooth and refined; inner opening clearly visible and unobstructed. It has sculpted thickness, a subtle beveled surface, smooth curvature, delicate reflective highlights, and realistic depth. Use Orsola-inspired violet palette: primary #7133D2, deep purple #663399, bright lavender #A875FF, pale-violet highlights #D5BBFF. These are creative-animation guidance; authentic brand SVG overrides them for exact colors/shape. Center remains dark, showing black background. Do not produce a solid disc, spherical orb, infinity symbol, letter O, or generic loading spinner.

LOGO FORMATION ANIMATION:
Violet particles and flowing luminous ribbons initially drift across the dark background. Gradually dispersed energy moves toward center. Thin purple light spirals inward and traces a smooth elliptical-ring outline. As energy gathers, the ring becomes dimensional, luminous and recognizable; a gentle highlight travels around its polished surface. A soft violet pulse marks final completion. No violent explosions, strobes, or childish fantasy treatment.

EXACT BRAND NAME — TYPOGRAPHY IS CRITICAL:
Reveal the single brand word, spelled EXACTLY "Orsola".
Exactly six Latin letters: Capital O, then lowercase r, s, o, l, a. O-r-s-o-l-a.
Only first letter uppercase. Not "Orsula", "Orsolia", "Orsala", "Orsolla", or "Orsola AI". Elegant single centered modern sans-serif white/pale lavender wordmark below ring; clean spacing, crisp and readable, no scrambled letters. Real official wordmark overrides generated type if available.

EXACT WEBSITE DOMAIN — SECOND TYPOGRAPHY REQUIREMENT:
Directly below wordmark reveal EXACTLY "orsola.ai".
All lowercase: o-r-s-o-l-a, a period, a-i. One line, centered, smaller than brand name, clear legible on mobile. No "www.", "https://", "/en", spaces, extra characters or wrong domain endings.

FINAL BRAND COMPOSITION:
Three elements only: completed luminous violet ring, exact "Orsola", exact "orsola.ai". Centered balanced vertical lockup occupying central safe portion of widescreen frame; generous negative space, dark background, restrained lower purple haze, subtle particles that do not obscure text. Once completed, logo and both text lines stay stable, crisp, stationary. END ON FULLY COMPLETED BRAND; DO NOT RETURN TO SUNSET.

PRECISE SIX-SECOND TIMING:
0.0–1.8s: photoreal golden sunset, smooth backward outward pull from park to expanding city-and-mountain panorama.
1.8–2.4s: sunset dissolves to deep black, delicate violet mist and particles.
2.4–4.1s: glowing energy condenses to tilted hollow violet ring.
4.1–5.2s: ring fully forms, "Orsola" and "orsola.ai" appear successively.
5.2–6.0s: stable readable brand lockup; final subtle shimmer then settle.

SOUND:
No narration/dialogue/singing/music. Soft airy whoosh on sunset pullback, delicate crystalline/electronic gathering tone, gentle confirmation chime upon completed logo. Leave room for separately licensed music and voiceover in post.

AVOID:
Wrong or duplicated letters, unrelated brands, generic logos, altered domain, cartoon effects, distracting text/extra tagline, unreadable overglow, abrupt cuts, clutter, flicker, false official identity assertions, return to sunset after lockup.
```

## Archive notes / future reproducibility

1. SC01/SC02 were revised several times through ordinary Persian conversation; each previous intermediate draft had related but not identical timing/wording. The four long scene texts above capture the **substantive final production intent** and main supplied prompts, with SC01 and SC04 descriptions partially normalized for archival readability. **Do not label them byte-identical Dola submitted prompts** unless actual Dola text is exported and compared.
2. Character matching with text only is **best-effort**, even if `same exact woman` appears in a prompt. For reproducible face, if another engine allows it, use ethically/rightfully available reference images, character reference or video-to-video techniques; Dola chat in this project was reported not to accept supplied images.
3. An external URL inside an LLM video prompt is **not proof** the generation engine can open that URL, retrieve its SVG or render exact letters. SVG overlay and manually set `Orsola`/`orsola.ai` are the deterministic quality gate.
4. “Checks completed” is visual metaphor, not evidence that actual emails, calendar events, or tasks were run. No false interface claims in final advertised version.
5. Unreported model identifier, render mode, seed, frame count, credits consumed, output hashes and exact clip lengths = `UNKNOWN`. See [render receipts](08-ORSOLA-VIDEO-RUN-RECEIPTS-AND-LESSONS-2026-10-24.md).

**Supplement (ORSOLA-020 — intermediate historical prompt variants):** [Earlier sunrise/connecting/coffee/outro prompt drafts and change rationale](10-ORSOLA-PROMPT-VARIANTS-AND-DECISION-DIFFS-2026-10-24.md). This preserves reusable variants without claiming that every exact provider-submitted prompt was exported.
