# Deep architecture review — evidence-led operational memory (2026-10-21)

**Scope:** DJMRN Freelance Operations (private GitHub). **Research type:** multi-angle comparative reading of primary documentation, working open-source repos, practitioner case studies, and agent-memory academic work. **Status:** DESIGN VALIDATION, **not** a validated production assistant or proof of income. **Live authority:** this GitHub repo, not Notion. No Notion or other repo was modified.

## Questions being answered
1. Does a proven *exactly identical* repository exist for private freelance platforms + job applications + delivery + reusable AI experience memory? **No exact independently validated counterpart was established in this sweep.** Analogous public knowledge bases, agent task systems and operations postmortem practices can provide evidence for components, not an off-the-shelf guaranteed design.
2. Can a new assistant resume without the original chats or Notion? **Architecturally possible if** entry files, canonical records, event provenance and navigable relationships are consistently maintained. A file named AGENTS.md does not grant access or force every assistant to read it.
3. Does stored history automatically become useful memory? **No**. Retrieval quality and evidence/freshness gates must be tested separately. Academic results from other tasks cannot be extrapolated without in-repo acceptance tests.

## Primary sources actively read and reviewed

| # | Source and exact URL | Observed signal from the actual material | Transfer and limits |
|---|---|---|---|
| S01 | [GitHub Issues docs](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues) | Native issues represent tasks, allow sub-issues and dependencies, references to work and Projects board | Suitable **optional future task UI**; does not replace historical platform/archive/client-safe evidence records |
| S02 | [AGENTS.md convention](https://agents.md/) | Human README and predictable agent-oriented instruction file have separate roles; describes compatibility with many agent tools | Keep concise AGENTS and explicit real tool/read requirements; no automatic-memory claim |
| S03 | [Diátaxis](https://diataxis.fr/) | Four independent user needs: tutorials, how-to, reference, explanation; documented adoption examples | Use for content quality inside the 8 existing directories, not a new compulsory taxonomy/migration |
| S04 | [ADR community](https://adr.github.io/) and [ADR templates](https://adr.github.io/adr-templates/) | Decision rationale, alternatives/consequences/status; multiple lightweight Markdown templates | Keep DR files only for consequential choices; don't log every site click as an ADR |
| S05 | [PARA by Forte Labs](https://fortelabs.com/blog/organize-your-bookmarks-with-the-para-method-for-lightning-fast-web-browsing/) | Distinguishes active Projects and responsibilities from Resources and Archives according to actionability | **Adopt current vs historical distinction**, not literal 4-folder replacement, because 8 business domains already established |
| S06 | [Martin Fowler: Event Sourcing](https://www.martinfowler.com/eaaDev/EventSourcing.html) (2005, labeled draft by author) | Current state and path taken to reach it are different views; event replay is a technical architectural pattern | Adopt **concept of an evidence-linked chronological trail**; do not claim our Markdown log is full event sourcing with replay semantics |
| S07 | [Google SRE workbook: Postmortem Culture](https://sre.google/workbook/postmortem-culture/) | An actual outage case and comparative review show why causes, proof, assigned measurable corrective actions and review are needed | Use for rejection/failure/recovery lessons; small freelance jobs do not need heavyweight postmortem ceremony |
| S08 | [jbranchaud/til](https://github.com/jbranchaud/til) and [counting TIL entries from git](https://github.com/jbranchaud/til/blob/master/git/list-and-count-all-posts-in-til-repo.md) | A working topic-folder Markdown repository; a real note shows tracked-file queries improve count reliability versus parsing inconsistent index formatting | Adopt short, atomic lessons and link/index checks; **TIL by itself lacks client order/project lifecycle** |
| S09 | [Beads — actual public repository](https://github.com/gastownhall/beads) (redirect from old steveyegge/beads) | A maintained agent task/memory project with persistent issue/dependency graph, CLI, database-backed operations and integrations | Valuable alternative for many interdependent agents, but extra tooling, new state store and installation; **DEFER** until measured complexity |
| S10 | [A-Mem, Xu et al. 2025 full HTML paper](https://arxiv.org/html/2502.12110) | Uses structured note construction, link generation, memory evolution and semantic retrieval. Its own ablation reports improvements on tested question-answer benchmarks with links + evolution versus without | **Adopt manual relevance links/keywords first.** Benchmark is not a trial on DJMRN tasks; paper itself flags model-dependent organization quality, not production proof |
| S11 | [Generative Agents, Park et al. 2023 abstract](https://arxiv.org/abs/2304.03442) | Abstract describes experience records, reflection and retrieval in a social agent simulation | Conceptual corroboration only; **abstract inspected**, not a complete paper read or freelance case study |
| S12 | [MemGPT, Packer et al. 2023 abstract](https://arxiv.org/abs/2310.08560) | Abstract describes tiers of virtual context management for long-term dialogue | Conceptual relevance to context constraints; **abstract inspected**, no new runtime justified |

**Evidence strength tags:** S01–S09: actual docs/working public repository/practitioner primary text inspected. S10: full HTML research paper, task-transfer unverified. S11–S12: **abstract-level evidence only**. Neither open-source popularity nor academic evaluation proves a design best for this user's workflow.

## Competitive approaches and fit-for-DJMRN analysis

Evaluation criteria (weight is a **design judgment**, not an empirical score): (a) completeness of SITE→OPP→JOB→TOOL→LESSON record and handoff **25%**; (b) proof/traceability/freshness **20%**; (c) assistant-friendly targeted retrieval **20%**; (d) near-zero cost/maintenance on free-first constraints **15%**; (e) privacy/control **10%**; (f) incremental adaptability **10%**. **No artificial numerical rankings are reported without an in-context controlled test.**

| Candidate | Strengths | Main weakness against this actual goal | Decision |
|---|---|---|---|
| **A. Git-native typed Markdown/CSV, source/current/event/lesson + links** | Single authority, portable, no new infra, readable by human and tool-equipped AI, Git trace | Manual discipline; search is only as good as metadata, linking and tool access | **ADOPT / enhance** |
| B. PARA-only folder tree | Excellent actionable vs archived separation | Does not model proposal transitions, KYC uncertainty or evidence graph | Adopt principle within A, not replace |
| C. GitHub Issues + Projects as sole database | Native board and dependencies | Historical dataset/client-safe process evidence hard to normalize; duplicate facts risk with docs | **PILOT LATER** as queue VIEW if volume grows |
| D. TIL/Zettelkasten alone | Small reusable notes and crosslinks | Experience without real job/event provenance can promote guesses to fact | Adopt atomic lessons as layer of A |
| E. Beads/Dolt graph agent state | Persistent dependency graph and agent workflow | New CLI/runtime/data store/integration complexity | **DEFER**; measured multi-agent blockers needed |
| F. Full event-sourced application | Rebuild state/replay theoretically powerful | Complex guarantees, versioning, external side effects; text Git log is not full replay | **REJECT NOW** |
| G. Vector RAG / agent memory service | Semantic discovery at larger scale | Index consistency, embeddings, costs/privacy and risk of stale/hallucinated links | **DEFER** until benchmark proves keyword/manual links inadequate |
| H. Single giant Markdown / parallel Notion mirror | Easiest unstructured capture or familiar UI | Poor targeted retrieval / contradictory CURRENT state, conflicts user's explicit GitHub-only rule | **REJECT** |

## Recommended architecture — v1.2 design refinement without directory churn

**A record is an observation, not a truth forever.** Three logical layers:

1. **SOURCE / EVIDENCE (historical immutable):** URL, capture date, issuer, quote-free summary, scope and original artifact reference, may contain UNKNOWN.
2. **CANONICAL CURRENT (explicitly dated):** per SITE/account/OPP/JOB record with observed fact, provenance and the **next action**; refresh before high-stakes use.
3. **KNOWLEDGE / LESSON (curated):** scenario, keywords, validated rule, exclusions, linked event + job + tool, confidence and review trigger; generated/hypothesized lessons are not automatically accepted as proven.

**Retrieval order:** exact stable ID/permalink → current status of that entity → observed events/outcomes → relevant lessons by task keywords and crosslinks → historical background if needed → official live policy if decision requires freshness. Don't ingest 1313 sites or 400KB historical notes by default.

**Write path:** observed input → record with provenance/date → decision/approval gate → actual result → update primary entity & append event → only after observed result distill a linked, qualified lesson → Git commit & readback. One operation must not create a second live master.

### A note on apparent empirical improvement
A-Mem ablation on *its* reported evaluation categories supports trying linked notes rather than isolated snippets, but that is not evidence of success on this private repository. What matters here is a measured retrieval test with **answer correctness, citation to canonical path, UNKNOWN discipline, unnecessary files accessed and ability to detect a stale record**. Start without embeddings.

### When to change the design
- First verify **5 exact retrieval probes** documented in the linked test receipt and one actual user-authorized OPP lifecycle.
- If information is routinely not found by filename/keyword/crosslink, test a **read-only local inverted keyword index** before paid embeddings.
- If tracking many simultaneous blockers becomes painful, consider GitHub Issues/Projects as a *view* referencing canonical files; avoid two independent status stores.
- If multiple autonomous agents later need dependencies and concurrency, evaluate Beads with installation, RAM and integrity tests against the existing Git-only baseline.
- Do not use AI-generated generalizations as validated lessons without linked actual events.

## Explicit limits / audit honesty
- Search and direct source reading was performed in this turn. The prior report did **not** establish a professional breadth of research; this file supersedes its unsupported suggestion of thoroughness.
- Exa paid search returned credit-exhaustion (402). No payment was made; official webpages and public repositories were read by another available research route.
- No exact copy of the user's private business workflow was found and validated; adjacent case studies informed a purpose-built adaptation.
- No full end-to-end paid-client work, confirmed payment, autonomous-agent memory benchmark or execution on user's Windows laptop was performed.
- User prohibited additional Notion writes; none were made in this review.
