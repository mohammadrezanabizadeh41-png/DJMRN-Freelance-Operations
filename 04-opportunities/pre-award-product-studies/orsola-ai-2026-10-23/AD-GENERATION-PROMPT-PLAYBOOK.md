# Orsola PROMPTS-001 — AI advertising creative prompt system and reusable prompt experiments

**Date 2026-10-23 · Status:** RESEARCHED_TEMPLATE_AND_DRAFT_PROMPTS; NO VIDEO MODEL INVOKED, NO OUTPUT/QUALITY VERIFIED, NO SPEND.
**Related:** [Asset ID register](AD-MASTER-DATA-AND-ASSET-REGISTRY.md) · [Creative techniques and campaigns](AD-CREATIVE-METHODS-REFERENCE-RESEARCH.md) · [six sample video scripts](INTERNATIONAL-PILOT-CREATIVE-KIT.md).
**Instruction:** A technically plausible prompt is NOT a "successful ad prompt" until specific generated output is observed, quality tested, and campaign impact measured. Official provider sample prompts demonstrate features but not the conversion impact of an Orsola ad.

## 1. 2026 current first-party video-model reference research
- **Seedance 2.5** (ByteDance Seed, announced 2026-07-31): https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5 . Official documentation reports single-pass videos up to 30s, multi-round extension, up to 30 image/10 video/10 audio references, timestamp-specific edits, clay render/motion references and maintained character continuity. Public access reported via **Jimeng AI and Doubao Pro**, planned API via BytePlus ModelArk. **This is NOT confirmation of free access on any specific user account, nor ability to export commercially without license review.**
- **Seedance 2.0** (announced 2026-02-12) official https://seed.bytedance.com/en/blog/seedance-2-0-official-launch ; older platform 15s support and 9 images/3 video/3 audio references. Avoid assuming unofficial reseller offers are equivalent or legal.
- **Runway Gen-4 official prompting** https://help.runwayml.com/hc/en-us/articles/39789879462419-Gen-4-Video-Prompting-Guide : a clean starting image + simple motion-focused text prompt; 5/10-second clip guidance, positive phrasing, add one camera/subject/style movement at a time. Other versions differ.
- **Editing/compositing**: Blackmagic official DaVinci Resolve free editor page https://www.blackmagicdesign.com/products/davinciresolve/edit/ ; precise brand vectors, subtitles, end card and verified UI should be layered in an NLE/motion compositor rather than "hallucinated" inside AI video.
- Prompt limits/credit costs/availability of any product are UNKNOWN for user's account. Free-first: no paid generative run before checking quota and explicit decision. No model-generated fake brand testimonials.

## 2. Master prompt structure ("Director's Brief")
Write prompts in **separate levels** to keep references, controllability and video safety:
1. **Input state:** goal G1–G6, persona, placement, ratio, duration, target language, target CTA, offer/geo eligibility, source asset IDs.
2. **Creative thesis:** one audience pain, one truthful benefit, one emotional angle, hook.
3. **Factual claim file:** OFFICIAL_VENDOR_CLAIM or DEMO_OBSERVED with source; blocked terms and user-visible mockup labels.
4. **Still frame / reference composition:** real source logo kept separate; use generated reference frame only for background/action scene; image/clip IDs.
5. **Motion shot prompt:** one principal subject, physical action, camera, timeline, light, texture, transition, end framing, reserved overlay area.
6. **Narration and text:** draft voiceover in separate file; exact text and final logo composite, avoid relying on generation to spell.
7. **Limits and QC:** no fake product UI or fictitious metrics, privacy, licensing; test 1 cheap 4–8s shot, then extend.
8. **Experiment record:** model/version, date, account/service, credit quote/cost, references, prompt hash, seed if tool supports, output ID, visual defects, human QA, revised version. No invented outcome.

### Reusable Director's Brief prompt for LLM storyboards
```text
You are a senior creative director and compliance-aware SaaS advertising strategist.
BRAND: Orsola, AI personal & professional assistant. Use only the verified facts and
brand-kit URLs supplied by the operator. The operator reports rights to prepare brand
samples; do not infer approval to publish.
GOAL: {G1 brand | G2 website | G3 eligible signup | G4 activation |
       G5 paid subscription | G6 returning use}.
PERSONA: {one persona}  REGION: {creative region vs verified service eligibility}
LANGUAGE: {locale}  PLACEMENT: {platform/ratio}
RUNTIME: {seconds}  CTA: {one CTA matching goal}
ASSET IDs: {B-..., S-...}; EVIDENCE: {source links or real demo proof}.
Generate THREE original hook directions, then for the best one provide:
- one-sentence concept, story arc, shot-by-shot seconds and image/action
- voiceover transcript, exact short on-screen text, soundtrack/SFX notes
- which scenes require real UI vs illustrative background (mark simulations)
- ending brand lockup and one CTA
- potential misleading claims/availability problems and safer wording
- exact assets needed + a compact editing-ready shot manifest.
DO NOT fabricate logos, ROI percentages, testimonials, app-store release or access
worldwide. No audience 'winner' inference without real campaign results.
```

## 3. Asset-grounded Seedance 2.5 scene prompt template
For a service that accepts reference tokens, the UI may call assets `@Image 1`, `@Video 1`. Replace token notation only with **what that particular tool supports**. Do not assume every reseller offers Seedance 2.5's full multimodal API.

```text
TASK: Generate a cinematic 6-second background shot for a licensed Orsola
brand-concept advertisement. Aspect ratio {16:9 or 9:16}.
REFERENCE: @Image 1 is the approved background art direction or brand-color
reference, NOT a reference to invent a software interface.
SUBJECT: a realistic contemporary desk with floating translucent task cards
symbolizing email, calendar and documents.
CAMERA: smooth slow dolly in, subtle parallax, end on an uncluttered central
composition with negative space reserved for a separately composited brand logo.
MOVEMENT: scattered generic cards align into a calm readable hierarchy,
following natural easing and consistent lighting.
LOOK: restrained premium technology commercial, subtle purple highlights,
soft global illumination, believable materials and physically coherent motion.
STORY ARC: 0-2s scattered tasks, 2-4s organize, 4-6s calm still frame.
DELIVERY: clean background plate, no rendered interface text, no simulated
brand wordmark; exact brand SVG, voice, copy and CTA are added in editing.
```

**Engineering:** if a generated frame contains illegible pseudo-UI or a false Orsola mark, reject that frame and redo without logo/text; do NOT present it as a real app recording. Use one motion action per short clip for predictable results. For Runway Gen-4 substitute a simpler positive prompt, focusing on image + camera movement, e.g. "Smooth camera push in as the translucent task cards settle into an organized grid, premium cinematic lighting, restrained violet accents, no words intended in the motion layer" — use a clean initial image, keep text for post-production.

## 4. Six objective-specific *creative* video shot prompts (candidate, not executed)

### G1 — AWARENESS / 6s cinematic metaphor plate
```text
Create a 6-second global AI productivity brand-film opening in 16:9.
A contemporary neutral workspace with scattered translucent planning,
email and calendar cards. In a smooth match-cut motion, the cards converge
into a subtle violet-lit central hub. Premium restrained commercial art
direction, realistic glass and paper textures, gentle shallow depth of field,
deliberate camera dolly-in, readable negative space at the right for a logo
added later. Three visual beats: fragmentation / motion / clarity.
No photoreal claims of actual software behavior, no model-generated UI words.
```
**After edit:** exact approved brand logo + "Meet Orsola" + "Explore Orsola".

### G2 — WEBSITE DISCOVERY / 7s smooth transition plate
```text
A 7-second elegant SaaS website teaser transition. Begin on a modern monitor
showing a neutral placeholder grid (not a fabricated existing product page).
Camera glides laterally as translucent icons for messaging, calendar and
documents float toward a simple organized center; finish with a clean empty
monitor area suitable for replacing with a real screenshot of the public
Orsola Features page in editing. Light studio palette, subtle violet tint,
soft realistic screen reflections, continuous smooth motion, 16:9.
```
**After edit:** place true S-001/S-002 site captures; close with official `orsola.ai` URL.

### G3 — SIGNUP / 5s onboarding concept only (service geo pending)
```text
Minimal 5-second motion design of three neatly arranged, abstract steps
coming into focus, a person moving from curiosity to understanding using a
computer, calm visual rhythm, warm neutral lighting with violet accent,
negative space for post-produced numbered labels, portrait 9:16, smooth
locked tracking camera, no synthetic checkout or sign-up UI.
```
**After edit:** use only product-owner-verified real signup steps and eligible CTA. Otherwise "Explore Orsola" conceptual sample. Do not hallucinate registration success.

### G4 — ACTIVATION / 6s transitional human scene, not the app result
```text
Photoreal six-second human-story transition: a busy freelance professional
notices a new fictional client request, glances at a neutral calendar with
no readable names, then relaxes and turns attention to a laptop. Medium
shot to shoulder-level push-in, natural indirect daylight, believable human
movement, documentary realism, portrait 9:16, no computer text generated.
```
**After edit:** cross-cut with **actual approved synthetic-account recording** for email → calendar → prepared draft → review. If unavailable use a clearly labeled UI concept and do not claim task passed.

### G5 — SUBSCRIPTION / 6s premium utility motif, NOT billing screen
```text
Six-second polished motion-background plate: separate small abstract
workflows gently stack into a stable organized system on a premium
minimalist desktop, violet ambient highlights and clean white/purple
geometry. Smooth 3D parallax, deliberate camera orbit of less than twenty
degrees, held central space for an externally composited plan comparison.
No prices, numbers, charts or UI text rendered by the model.
```
**After edit:** insert only a current approved plan table, precise subscription CTA for a confirmed eligible market. No "best price" or subscription purchase claimed.

### G6 — RETENTION / 5s micro-routine motif, not an observed result
```text
Five-second calm cinematic morning shot: a fictional knowledge worker
organizes their work desk and turns to a laptop as a generic reminder card
glides into a neat stack, warm natural daylight, simple deliberate action,
locked camera with gentle depth shift, restrained violet brand accents,
leave clean top-safe-space for editor-added title, no readable generated UI.
```
**After edit:** live approved reminder feature if available; no implication of medical reminder performance.

## 5. Layer-specific prompts and test harness

**Still image/storyboard keyframe:** "Generate one clean, original premium SaaS motion-style *background* frame with 30% negative space for typography; composition needs to survive 16:9 and 9:16 crops; brand accent violet, modern real desk; avoid generating actual brand logos or UI text." Add exact SVG separately.

**VO script polishing (not voice cloning):** 
```text
Polish this {seconds}-second Orsola ad narration for international English.
Read naturally at a controlled conversational pace, concise clear vocabulary,
one emotion and one CTA. Preserve factual meaning and all caveats.
Output spoken words only plus an estimated read length, subtitle segments
and pronunciation note for "Orsola". Do not assert unavailable mobile apps,
worldwide signups, zero error or quantitative time saving.
Source script: {APPROVED DRAFT}
```

**Caption/localization adaptation:**
```text
Transcreate the approved Orsola master EN video to {FR|ES|AR}, not a literal
word-for-word swap. Preserve timestamps if feasible, user action, CTA and
factual limits. Provide per-shot voice line, on-screen text, punctuation,
line-break suggestions and terms requiring brand QA. Arabic: mark RTL/mixed
Latin product name/layout issues. Do not invent new regional offers.
```

**Prompt output review:**
- Is the logo editable and exact from brand SVG rather than generated pixels?
- Could a viewer mistake generated background for an actual Orsola app demo?
- Are the story, subject and CTA clearly legible at mobile size?
- Did the model invent words, social proof, prices, medical use, customer names or features?
- Is movement physically smooth, shot continuity controlled, source asset rights tracked?
- Does the clip preserve correct aspect/crop and reserved readable text zone?
- Can the frame be recreated or corrected without paying for repeated full-length generations?

## 6. Experiment records and version policy
`PROMPT_ID, GOAL_ID, SHOT_ID, MODEL_PROVIDER, MODEL_VERSION, DATE, LANGUAGE, ASPECT, DURATION_S, REF_IDS, REF_LICENSE_STATUS, PROMPT_TEXT_SHA256, SEED_IF_SUPPORTED, COST_QUOTE, CREDITS_CONSUMED_ACTUAL, OUTPUT_PATH_PRIVATE, QA_FACTS, QA_VISUAL, QA_SOUND, QA_CAPTION, ARTIFACTS_REJECTED, NEXT_REVISION, PERSON_APPROVING`.
- State `RESEARCHED` now; `RUN_REQUESTED` after user action; `OUTPUT_OBSERVED` only after real generation; `ACCEPTED_FOR_SAMPLE` only after review.
- Hold one variable fixed per experiment: compare two hooks with same audience/offer/visual basis rather than entirely different videos.
- Don't copy a competitor's exact prompt or paid creative. Reusable public-provider examples are **prompting patterns**, not a third party's licensed ad reproduction.
- No private reference images, brand master binaries, audio clips or paid generator API tokens in this public GitHub project.

**NEXT:** acquire [Wave A official brand approval](AD-MASTER-DATA-AND-ASSET-REGISTRY.md), select M02+M03 for pilot P-A, create a manual still storyboard and test at most a small low-cost 5–7s background on a verified free tool before any full-video render.

## 2026-10-23 New creative lane prompt guard
New human-first ad theme `L-SIMPLE-001` uses [twelve human-use stories and hooks](AD-SCENARIO-LAB-UNIVERSAL-USE-CASES-AND-COMPETITOR-INSIGHTS.md), [current hybrid P-A storyboard with English VO](AD-DIRECTION-DECISION-AND-PILOT-PA-STORYBOARD-v1.md), [honest competitor comparison](AD-LANE-SIMPLICITY-TIME-VALUE-COMPETITOR-RESEARCH.md).
For AI motion prompts: visually portray fewer task cards **as a metaphor**, NOT a measured claim of fewer minutes or money; do not generate a "competitor vs Orsola" time counter, purchased software logos, false billing data, already-activated reminders, synthetic real UI or perfect automated phone actions. Production status remains **NO_VIDEO_GENERATED**.
