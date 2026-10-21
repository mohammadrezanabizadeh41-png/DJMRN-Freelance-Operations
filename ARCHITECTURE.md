# Architecture v1.1 — Git-native operational memory

**Decision:** evolve existing 8 operational directories in place. No microservices, database, sync daemon, wiki duplication, agent framework, external automation, or second project repository. GitHub is the project’s durable operational home.

## Layers / actual responsibilities

| Layer | Current location | Owned fact |
|---|---|---|
| Source archive | `01-platforms/discovery`, `02-screening/historical` | What was recorded historically, never current eligibility |
| Platform and account | `03-accounts-and-operations` | User-specific account evidence, registration readiness, gates and next task |
| Lead to sale | `04-opportunities` | Real advertisement, draft, approval and proposal lifecycle |
| Awarded delivery | `05-client-projects` | Contract-scoped tasks, approved tools, milestones, QA and closure |
| Reusable know-how | `06-tooling`, `07-lessons-and-playbooks` | Proven tool use and independently reusable lessons |
| Control and trace | `08-operations-and-continuity` | Work index, current status, dated event trail, decisions, handoff |
| Rules / metadata | root documents, `templates/`, `provenance/`, `scripts/` | Invariants, simple creation templates, source citations, validation |

## Entities and links
- **PLATFORM** identity: canonical domain/URL + aliases; historical 1313 number is an archive sequence, **not** a permanent account ID.
- **ACCOUNT**: one actual registration/profile/verification snapshot, evidence and timestamp. Never infer payout from login success.
- **OPP-YYYYMMDD-NNN**: one *real* opportunity identified by source URL/listing ID. Proposal states are part of same record while volume is small.
- **JOB-YYYY-NNN**: only upon user-confirmed award/contract; links back to OPP and approval. No fictitious customers.
- **TOOL** record: actual approved software/service, version and purpose, linked to JOB.
- **LESSON-YYYY-NNN**: a repeatable finding derived from specific evidence/event, including failed approaches; not every observation is proven advice.
- **EVT-YYYYMMDD-NNN**: recorded fact/action with provenance; one activity log initially.
- **DR-####**: consequential operating/architecture decision, with context, alternatives, owner, status, reversibility.

## Data lifecycle / authority
Source→Screen→Opportunity→Proposal Draft→Human Approval→Submission→Client Response→Awarded Job→Execute→QA→Delivery→Payment Evidence→Lesson.
These are **logical states**, never claims that the sequence has occurred. Proposal submission cannot happen without a user approval receipt; award cannot happen because a proposal was sent; payment cannot be inferred from an agreed invoice.

**One real activity = one primary record + one small event entry.** When a stage changes, edit that record; don't create competing versions. Work index is a navigational *projection* with file links (not a second source of truth). Git commits provide history.

## Fault modes and recovery
- Interrupted write → retrieve branch head/file; compare before retry; don't blindly resend.
- Concurrent writes → use expected branch head; on conflict fetch, reconcile, then retry.
- Historical contradiction → preserve both historical citations and label CURRENT uncertain until verified.
- Duplicate job → match source listing URL/site ID; if same listing, link existing OPP rather than creating a second one.
- Mistaken identity/secret in file → stop, protect account, coordinate remediation; do not suppose deleting the file deletes Git history.
- Stale page/alert → add `last_checked`, `freshness` and re-check before a consequential action.

## Why these patterns
- Git-native docs-as-code and GitHub's file history for traceability.
- Decision Record pattern for meaningful decisions, not every checkbox.
- Diátaxis for keeping reference / task steps / explanation distinct, when actually writing new documentation.
- TIL-style tiny evidence-backed lessons categorized by real jobs.
- AGENTS.md for handoff text; **not** a guarantee that every chat assistant automatically reads it.
- GitHub Issues/Projects are OPTIONAL *views or active task queues*, not second canonical records; do not create until a measured need exists.

## Review gates
First useful manual operation → full read/write/readback → one client-work or source review → measure friction. Only add Issues/Projects/automation/DB if observed retrieval/synchronization pain justifies it and user explicitly approves its activation.

[Research and citations](provenance/ARCHITECTURE-RESEARCH-2026-10-21.md) · [Decision DR-0001](08-operations-and-continuity/decisions/DR-0001-github-operational-authority.md).

## 2026-10-21 deep-review follow-up — v1.2 retrieval architecture

A further **direct, multi-source research review** identified that *storing documents* and *retrieving dependable experience* are different problems. Preserve these three boundaries: **historical evidence**, **dated operational state**, **curated scenario-specific lessons**. Short targeted retrieval + explicit provenance outrank expensive semantic search for the present seven-site queue. See [full source-assessed research](provenance/ARCHITECTURE-RESEARCH-2026-10-21-DEEP-REVIEW.md), [assistant memory retrieval protocol](08-operations-and-continuity/MEMORY-RETRIEVAL-PROTOCOL.md) and [five repository readback probes](08-operations-and-continuity/RETRIEVAL-TEST-2026-10-21.md).

This does **not** assert that the architecture is empirically best or that the assistant has automatic persistent knowledge. Validate real work before adding more systems.
