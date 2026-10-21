# DR-0001 — Use one private GitHub repo as freelance operational authority

**Status:** ACCEPTED (user directive, 2026-10-21)
**Scope:** Freelance operations only. **Recorded:** 2026-10-21.

## Context
Separate Notion work histories and chat windows were making practical registration, proposal, project and lesson continuity difficult. This repository had a good first historical archive, but lacked a consistent navigational handoff/record lifecycle. The user explicitly declared GitHub the ongoing practical memory and requested no additional Notion writes.

## Decision
Keep one private GitHub repository, the existing eight domains, Git-native Markdown/CSV, `CURRENT-STATUS`, `WORK-INDEX`, evidence-linked entity records, sequential event history, reusable lessons, and a small manual stdlib validator. Notion is historical input only and is neither a required step nor a write target for this freelance mission. No automatic sync.

## Alternatives considered
- **Notion + GitHub dual writes:** more source conflict / account context switching; not selected.
- **GitHub Issues/Projects for everything:** convenient UI but splits canonical facts and may require extra state reconciliation; defer until real need.
- **New SQLite/Supabase service or agent workflow:** unnecessary cost/maintenance and migration before first operational value; defer.
- **Single giant Markdown log:** simplest initial form but poor retrieval, weak differentiation between account/lead/order/lesson; use typed files plus concise activity log.

## Consequences and risks
Pros: durable diffable audit, zero new paid provider or deployment, minimal context handoff, easy manual editing. Cons: manual index updates, no real-time sync, conflicts possible with concurrent assistants, Git history can retain committed secrets, and format validation requires human/stdlib command unless later approved automation is deployed.

## Verification / exit
Manual repo-file fetch, count-check imported CSVs, compare Git head/commit, then prove usability with one real case selected by user. Revisit architecture only when repeated friction is measured. Do not create paid automation or duplicate authority without new approval.
