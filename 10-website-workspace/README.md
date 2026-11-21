# DJMRN — Website Workspace (parent program, structural registration)

**Status:** STRUCTURE-ONLY / source references, not a second site codebase or a new progress log.
**Created:** 2026-11-21. **Project desktop identity:** `DJMRN-Website-Workspace`.
**Scope:** Parent Codex workspace for website creation, multi-site extraction/research, source reconstruction, compositional prototyping, review, and eventual QA.

## The folder structure and why

```text
10-website-workspace/
  README.md
  00-program/                        parent scope, authority and source routing
  01-reference-sites/                independent reference-site extraction cases
    gladeye-fernhollow/              current X01-X46 historical project
  02-main-website/                   DJMRN's own service-first website work
  03-shared-source-library/          provenance-aware cross-site reuse, only when justified
  04-prototype-lab/                  future runnable scenes and graphical comparisons
  05-quality-delivery/               actual QA and delivery candidates
```

The matching **local desktop folder** has additional nested source-extraction, evidence analysis, reconstruction, visual review, future-change, site design, implementation, demos, test and release-candidate folders. This GitHub subtree records the parent topology only; it does **not** mirror the private local directories or duplicate large source data.

The order is purposeful: program identity and evidence authority first → capture/analysis per external reference site → main authored website code → proven reusable patterns → runnable previews → QA/delivery. Each reference site gets a unique case folder. The first one is `gladeye-fernhollow`; future reference studies become siblings instead of overwriting that case.

## Canonical references (existing, not copied here)

- **DJMRN website code, roadmap and prior project history:** [09-self-marketing-website](../09-self-marketing-website/). This remains the canonical code location; this new parent does not supersede it.
- **Source/extraction evidence and existing stage handoffs:** [graphics/flower-valley](../09-self-marketing-website/graphics/flower-valley/) and [evidence](../09-self-marketing-website/graphics/flower-valley/evidence/). Private original site bytes remain exclusively in the owner's PC archive.
- **Original 184-line Fernhollow owner prompt:** immutable **private PC source**, with pinned SHA256 `e2ea5a1c99a69f0a234c9ac75435947aacda54a03c07a45e48185f33b520533d`; NOT uploaded.
- **Codex source-discovery package X46:** private PC `OFFLINE-CODEX-HANDOFF/X46/` under the historical extraction root; includes `00-START-CODEX.md`, a searchable **10,669-entry** source index and a read-only two-repository GitHub tree snapshot (**1,234 entries**).
- **Original reconstruction plan:** X44 **43 original puzzle pieces**, X45 **46 test/build gates** (not yet executed); X46 handoff and visual-review specification are not proof of a working scene.
- **Central operational continuity:** [CURRENT-STATUS.md](https://github.com/mohammadrezanabizadeh41-png/DJMRN-Intelligent-Assistant/blob/main/07-operations-and-continuity/CURRENT-STATUS.md). Do not create a competing program progress log.

## Source access, case boundaries and future use

The local workspace's private `00-program/WORKSPACE-SOURCES.json` and per-case `PROJECT.json` link to actual PC archive roots, the X46 source manifest/query tool, GitHub resources, original hashes and uncertainties. Neither the PC archive nor its private paths, credentials, raw shaders, assets, media or screenshots are uploaded to this GitHub skeleton.

Codex must verify its **own** GitHub access; a ChatGPT GitHub connection does not automatically provide credentials to the standalone desktop runtime. When reading evidence, search the index just in time, verify exact source SHA, distinguish observed vendor behavior from owner prompt and later creative changes, and preserve the original baseline. Add a new reference case only for an actual site, with independent identity, source path, provenance and rights.

## Decisions and constraints

- **Existing architecture reused:** one parent local workspace, one existing GitHub repository, no parallel authoritative website history, new repo, sync daemon, cloud database, agent framework or bulk file copy.
- **Separate purpose:** `01-reference-sites` analyzes external reference sites; `02-main-website` implements DJMRN's own site; `04-prototype-lab` holds self-authored comparisons. Inputs can be combined with provenance, not indiscriminately merged.
- **Privacy/rights:** unverified third-party runtime/media rights mean private analysis only; no original code/asset publication from this registration.
- **Operational state:** workspace structure exists; Codex UI project registration and eventual graphical build/46 runtime gates must be independently verified, not claimed by this README.
- **Future changes:** extensions/art direction go into independent, approved workstreams without rewriting original extraction source records.

This subtree intentionally contains **only parent-project structure registration and directory placeholders**, not a second stage log, new extraction reports, or a replacement for the existing `09-self-marketing-website` project.
