# DJMRN — Creative Source Map (P3/B05–B06, B14–B15)

**Status: OWNER-REQUESTED SOURCE-ARTIFACT STRUCTURE / EMPTY OF APPROVED DESIGNS — 2026-11-16.**
This is a **versioned design-source directory**, **NOT** another project status log, database, agent memory, build queue, or alternative architecture authority. The canonical structure and sign-off rules remain in [MASTER-ROADMAP.md](../MASTER-ROADMAP.md), §1C H–I, and all stage checkpoints stay ONLY in [PROJECT-LOG.md](../PROJECT-LOG.md).

## Purpose and scope

Preserve enough inputs and provenance to continue after a chat/context change without restarting: user's exact selection of source concepts/prompts, desired components and transformations, approved **original DJMRN synthesis**, references and usage rights, actual deliverable paths/URLs/commit hashes, recorded tests and next dependency. Do not confuse an external visual example with a completed original DJMRN portfolio sample.

**Website IA is FIXED:** single DJMRN home with 8 `VP01–VP08` service portals → 24 `SC01–SC24` corridors revealed **inside the same main homepage** → individual `SV01–SV52` service window with description and 0–many gallery items → separately branded demo route/immersive sample when appropriate → visible return to originating service. A video service may have a distinctive fullscreen cinematic showcase with replay/close/back, controls and a reduced-motion fallback; specialized exhibitions are not eight independent site-navigation systems.

## Source branches — create ONLY on first real input

```text
09-self-marketing-website/
├── MASTER-ROADMAP.md                 # Requirements and canonical design gates
├── PROJECT-LOG.md                    # ONLY chronological site checkpoint
├── design/
│   ├── README.md                     # THIS source-map convention (not a status log)
│   ├── home/                         # Create at first real home prompt/visual candidate
│   │   └── <design-id>.md            # One live design-source record per candidate
│   ├── services/                     # Create by actual VP/SV, never prefill all 52
│   │   └── VP04-video-motion/
│   │       └── SV19-video-production/
│   │           └── <design-id>.md
│   └── samples/                      # Sample-specific display/branding design sources
│       └── <sample-id>/
│           └── <design-id>.md
└── <approved-app-source-and-assets>/ # Real files at source paths selected in P4/P5
```

This tree is illustrative: the **only path created at this stage is `design/README.md`**. Do not create empty per-service files/directories, copy third-party templates, or choose an app framework now. Existing code/asset directories and canonical GitHub paths win over illustrative names.

## Minimal source record for each REAL owner-supplied design

Create or update a single Markdown record at its corresponding actual branch. Use these fields, **with real values rather than placeholders at publication**:

| Field | Required semantics |
|---|---|
| `Design ID / Parent` | Stable slug + HOME or VP##/SC##/SV##/SAMPLE-ID from roadmap; which other approved design it extends |
| `Status / owner gate` | INPUT / RESEARCHED / PROPOSED / APPROVED / BUILT / TESTED / SUPERSEDED; only owner may approve final design |
| `Owner intent` | Exact selected pieces of each reference and desired changed behavior; distinguish user facts from synthesis judgment |
| `Source refs & prompts` | Original page URLs/titles/credits and dated observations; store actual prompt text **only if owned or publicly redistributable**; otherwise store approved original rewritten spec + reference and rights status, NOT gated text |
| `Rights, price and reuse` | Per code, prompt, font, image, model, video and background: license/source, free eligibility, attribution and NO-COPY restrictions; UNKNOWN = DENY importing |
| `Visual/interaction spec` | Layout, typography/RTL, color, 2D/2.5D/3D, motion, pointer/scroll/camera, hierarchy, back/deep-link and fallback contracts |
| `Resolved outputs` | Exact GitHub-relative source/asset path(s), prototype/preview and screenshot path(s), external live URL only if published and verified, commit hash; mark `NOT_CREATED` honestly |
| `Test / dependencies / next` | Actual local/build/browser evidence (or NOT_RUN), T##, low-power/mobile/a11y/SEO checks, next owner action and supersession link |

**Do not duplicate source blobs or progress narratives in this record.** Production code/assets/tests live at their actual repo paths; the source record links to them. Git commits own revision history; `PROJECT-LOG.md` owns approval/dated progress. When a design is replaced, mark the old record `SUPERSEDED` and link the new one; retain provenance rather than rewriting history.

## Delivery/continuity workflow (one small vertical before scaling)

1. Owner submits links/screenshots/permitted prompts and the exact part wanted from each source (home, background, 3D, service showcase, sample display, etc.).
2. Research and rights-check each component; separate layout/navigation/motion/media from reusable code and identify unlicensed or unknown-cost inputs.
3. Combine into an **original** unified visual and interaction specification; build missing pieces from scratch. Compare simplest accessible native/CSS option vs WebGL if needed; record source provenance.
4. Owner reviews a home + one selected VP→SC→SV + one sample-showcase preview. Only owner-selected design becomes `APPROVED`.
5. Separately authorized Codex project implements the **single** working slice in site source. Record exact paths, screenshots, build tests, commit, and later optional URL after actual authorized publication. Run actual browser T34–T40; reserve `TESTED` for real evidence.
6. For a new chat, **first** read live roadmap + latest `PROJECT-LOG.md`; open only the relevant design record and linked approved files. Never infer completed design from a prompt alone.

## Specialized exhibition policy / truthful showcase labels

A service's gallery may use a different art direction, interaction, full-screen video theater, audio player, 3D scene or branded nested demo **without losing the main DJMRN route/return**. A real customer project, self-initiated original concept, licensed template-derived demo, and placeholder are **four different statuses** and MUST not be conflated. Template-based demos can be shown as clearly labeled `TEMPLATE-BASED CONCEPT / CUSTOMIZABLE DEMO`, with license checks and visible truthful limitations. Do NOT imply paid client results, fabricated ownership, live implementations or earned testimonials. Future client-specific customization is a possible service, not a pre-completed customer deliverable.

Avoid autoplay with sound, inaccessible all-screen effects, compulsory 3D, blocking transitions, and unlicensed copied backgrounds. Motion must have pause/reduced-motion support and controls; focus/keyboard/touch/fallback and Persian RTL must remain functional. See WCAG 2.2 https://www.w3.org/TR/wcag/ and MDN View Transitions https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using .

## Storage and cost policy

- GitHub remains the **only canonical website source and durable versioned prompt/design artifact store**; Notion is for broader approved architecture/decisions, not media backups. Do not add a SaaS registry, second repo, project database or agent memories.
- Git text files may contain owner-authored/prompts or third-party text ONLY when its applicable license actually permits repository publication. **This is a public repository**: do not commit paid/private prompts with redistribution restrictions, credentials, cookies, customer assets or unauthorized media. For excluded input, keep a rights-aware URL/identifier and synthesize an original permitted spec; private authorized storage must be separately chosen before claiming full backup.
- Store small licensed assets only when needed and permissible; GitHub recommends <=1 MB per Git object and enforces 100 MB per file. Video/large models may need an owner-approved external asset store or Git LFS with verified storage/bandwidth terms **BEFORE** use. Until then, mark asset `EXTERNAL_NOT_ARCHIVED` with non-sensitive origin, checksum if available and retrieval owner, rather than asserting recovery.
- Zero new paid provider, plan upgrade, credits/overage, publishing, sensitive integration, schema change or Codex delegation without a separate explicit user gate.
