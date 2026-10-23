# Orsola AD-PIPELINE-001 — professional preproduction, production, edit, QA and handoff

**Date 2026-10-23 (Europe/Berlin)** · **State:** PLAN_ONLY_NO_MEDIA_RENDERED_OR_PUBLISHED.
**Scope:** bounded one-off pilot promos for G1 brand, G2 web, G3 eligible signup, G4 first meaningful task, G5 paid plan, G6 return use. No license/payment/real product login required merely for research.
**Related source-of-truth:** [Brand master and user inputs](AD-MASTER-DATA-AND-ASSET-REGISTRY.md) · [Methods and case studies](AD-CREATIVE-METHODS-REFERENCE-RESEARCH.md) · [Seedance/Runway prompt research and templates](AD-GENERATION-PROMPT-PLAYBOOK.md) · [six-pilot creative kit](INTERNATIONAL-PILOT-CREATIVE-KIT.md).

## A. End-to-end reproducible design process (stage gates)

| Gate ID | Phase and actual deliverable | Exit criterion / evidence | Who |
|---|---|---|---|
| GATE-00 | Official brand information and commercial/sample rights | approved logo/light-dark choice, exact endcard URL, identity/token usage rules; USER_REPORTED sample brand permission acknowledged | user/brand |
| GATE-01 | Six-goal brief and audience/country | one **goal per pilot**, persona, language, platform, desired CTA and market eligibility clearly separated | shared |
| GATE-02 | Ad reference and creative method shortlist | 3–5 documented reference videos per target goal when accessible; categorized technique not copied; primary platform guidance linked | assistant researches, user selects |
| GATE-03 | Creative route & copy brief | concept, 3 hooks, first-3-sec scene, approved claims/CTA, draft VO, source-to-shot map | assistant drafts, user/brand approves |
| GATE-04 | Asset map and storyboard | exact shot durations, master brand refs, public screenshots/real demo classification, aspect versions | assistant drafts, user supplies private owner assets when needed |
| GATE-05 | First-frame test + motion prototype | 1 frame + 5–7s safe generative background (if free credits verified and approved), compare quality to reference | user runs selected tool, assistant revises prompt |
| GATE-06 | Video assembly and motion polish | exact brand vector composited, real UI captured with synthetic content, timing, captions/VO/SFX | editor/user + assistant script QA |
| GATE-07 | Technical and factual QA | no fabricated claims, unreadable text, unlicensed sound, privacy leak, incorrect logo/geo CTA | shared |
| GATE-08 | Export and staged review | working edit, H264 MP4 exported to requested ratio, screenshot proof and review notes; status draft not public | user/brand |
| GATE-09 | Final sample handover if owner accepts | versioned deliverables, revised storyboard and audio/captions, explicit feedback/acceptance receipt | user; only if it occurs |

**STOP conditions:** paid tool activation without cost approval, brand-protected/private demo in public repo, fabricated screen result, globally available signup/purchase promise without accepted country availability, publication/ad spend without user authorization.

## B. One creative source -> multiple targets without losing fidelity
- Stable `LOGO/ENDCARD` and graphics from owner-approved SVG remain sharp at 1080×1920, 1920×1080 and 1080×1080; responsive typography rather than baked AI text.
- **Landscape master** 1920×1080 16:9 for landing/site/YouTube, but **portrait needs recomposition** (close-ups, big labels, repositioned UI), not simple crop.
- **Sound-on version:** human or properly licensed AI VO + consistent mix/effects; **sound-off version:** readable captions and visual storytelling. No celebrity/employee voice clone without rights.
- G1 brand could use cinematic metaphors; G4 activation must show real source verifiable UI or state `illustrative`.
- G5 subscription plans: dynamic editable table/text with release-day verified price/credits; do not bake numbers into an AI background video.
- Arabic uses RTL proofing and mixed Latin "Orsola" inspection; country eligibility remains independent of translation.

## C. Low-cost production stack comparison (NOT software status declaration)

| Workflow step | Practical free-first option | Paid/AI option only if justified | Required check |
|---|---|---|---|
| Reference discovery | Google ABCD, TikTok Top Ads with free-limited view, public Meta/Google libraries | professional research subscription only on proven need | cost and access |
| Storyboard | Markdown shot table, Figma/Canva if connected, paper/layout screenshot | design templates / agency boards | copyright and editing access |
| Logo and vector motion | SVG in local design software and NLE text/vector layers | After Effects or paid template | owner-approved brand source |
| Live product capture | browser built-in recording/OBS installed only if already available or after approval | dedicated capture software | privacy, non-personal dummy account |
| AI transition plate | user-selected Seedance/Runway *only if real free tier and commercial rights verified* | per-run credits / pro subscription | quoted cost, licensing, input limits |
| Cut/color/motion/voice | **DaVinci Resolve 21 Free** (official Windows free page), free editor or existing desktop tools | Resolve Studio, plugins, stock music, high-res VFX | device fit and actual install; no automatic upgrade |
| Subtitle/localization | manual SRT + editor captions, native review | transcription/AI VO provider | actual audio license/quality/rights |
| Technical review | local player, exported representative mobile and desktop captures | platform upload preview | quality inspection & copyright |

**Official DaVinci** https://www.blackmagicdesign.com/products/davinciresolve/edit/ : Resolve 21 and its free edition shown as available, but don't infer installed version or ability to run full Fusion on a given laptop. On low-memory devices use short 1080p timelines, half-resolution proxies / optimized media, fewer fusion nodes, basic keyframe transitions, and final source-preserving renders; verify actual hardware performance rather than assuming smooth operation.

## D. Media workspaces and filenames (all actual protected binary content stays OFF public GitHub)

```text
ORSOLA_AD_PRODUCTION/
  00-admin-private/     # brand brief, legal approvals, no credentials
  01-brand-source/      # original approved logo SVG, icons, colors, media kit
  02-site-captures/     # public Home/Features/Pricing screen stills
  03-demo-synthetic/    # private sandbox footage, sample email/calendar
  04-reference-links/   # URLs + annotated technique only
  05-still-storyboard/  # draft story images, AI frames, scene order
  06-ai-video-tests/    # prompt receipts, attempts, approved test clips
  07-live-capture/      # screen recordings with fictional details
  08-audio/             # VO, room tone, licensed SFX/music
  09-edit-timeline/     # editor project & editable compositing materials
  10-subtitles/         # EN/FR/ES/AR subtitle files
  11-export-drafts/     # versioned MP4s, DON'T automatically post
  12-reviewed-final/    # only after owner approval and QA
  13-test-receipts/     # human QA, technical checks, feedback metadata
```

**Naming:** `OR_G<goal>_<PILOT>_<SHOT/ASSET>_<EN/FR/ES/AR>_<16x9/9x16/1x1>_vNN.ext`
- `OR_G1_PA_SC01_BG_EN_16x9_v01.mp4`
- `OR_G1_PA_ENDCARD_EN_16x9_v02.png`
- `OR_G4_PD_UI-DRAFT_EN_9x16_v01.mp4`
- `OR_G1_PA_VO_EN_WAV_v01.wav`
- `OR_G1_PA_MASTER_EN_16x9_DRAFT_v01.mp4`.
Status tags `ORIGINAL`, `WORKING`, `INTERNAL_QA`, `APPROVED_SAMPLE`, `PUBLISHED` have distinct meaning; never label `PUBLISHED` without actual release.

## E. Source-to-shot acceptance checklist
For each shot record `SHOT_ID / start/end / intended story/claim / asset IDs / screenshot or concept / voice words / source URL / rights / geo / acceptance / observed failure`. Inspect:
1. **Brand:** exact wordmark and symbol from approved files, correct color and font, logo safe zone.
2. **Product truth:** is each purported app step supported and shown by real authorized synthetic account demo or clearly tagged illustration? No hallucinated fake Orsola website screen.
3. **Funnel:** matches one G1–G6 primary CTA, true landing URL, eligibility and offer.
4. **Voice:** human/pronunciation "Orsola" approved, no audio clipping, concise wording, readable subtitles.
5. **Visual:** no watermark, illegible generated UI gibberish, random extra appendages, inconsistent faces, jumping objects or font inconsistencies.
6. **Output:** frame rate/codec/aspect exactly meet chosen platform, safe zones correct, thumbnail readable, caption legible on phone.
7. **Copyright/data:** no third-party unlicensed logo/stock/clip/voice; no user emails, tokens, private client info, address or footage leaking.
8. **File integrity:** editable source project retained, final can be re-exported, version indexed, output viewed independently at full resolution.
9. **Outcome honesty:** brand approval and published ad results are separate; do not say "successful campaign" from a video render alone.
10. **Cost receipt:** note actual model credits or NLE costs; spending only with approval.

## F. Suggested first pilot contract of delivery (hypothesis, not a real order)
**P-A / G1:** original 20s conceptual brand intro with English VO/captions, 16:9 master + optional 9:16 remaster; editable storyboard + a non-sensitive media manifest + export QA checklist + optional 6-second bumper; one-off delivery, one clear review/acceptance gate. No product simulation required.
**P-D / G4:** 35–45s authentic workflow demo, requires brand-authorized test and fake inbox/calendar. Do not scope as ready without evidence.
**G3/G5:** payment/sign-up video only after actual market/checkout entitlement and approved landing page, not because worldwide audience is requested.

## G. Next user response sequence to avoid unnecessary burden
Wave A request: **tell us whether to use the live public website's logo/color/font as provisional master or provide the latest vector/media kit; choose preferred one of premium minimal / cinematic brand / clean UI / playful social; choose spoken narration or text-first.** We can start a first storyboard with current publicly verified assets even without private account.
Wave B later: sanitized real demo screenshots and current eligible signup/plan conditions **only** for actual G3/G4/G5.
Do not ask for account password, payment credentials, contract scan, real customer account exports or complete 400-page site screenshots.
