# Operational memory retrieval protocol — v1.2

**Authority:** this private GitHub repository only for freelance operations. External articles/Notion/Drive = historical evidence where needed; not required and never automatically written. **Scope:** any AI helper with verified access to the repo.

## 0. Safety on every answer
- Need to know if something *happened*? Use the **primary operational record + dated evidence**, not a historical source entry or an assistant's inference.
- Need to know if you **may do something now** (country/KYC/bid fee/payout)? Past evidence is not enough: retrieve latest official platform information where necessary, confirm free cost and obtain user approval before action.
- No record / no read permission = `UNKNOWN` or `UNVERIFIED`. No generated contracts, bid receipts, income, or completed jobs.
- Never paste credentials, private client details, sessions, sensitive documents into Git; a private repository is not a vault.

## 1. Small-context read path
```
README → PROJECT-RULES → CURRENT-STATUS → WORK-INDEX
  ↳ one entity primary file (ACCOUNT or OPP or JOB)
    ↳ linked 1–3 evidence/event notes
      ↳ candidate lessons by task keyword, type, tool, failure mode
        ↳ official website if live condition matters
```
Only open broad historical archives **for background** or a source-sequence lookup. Read `AGENTS.md` and this protocol for assistant behavior; use `ARCHITECTURE.md` for architecture changes.

## 2. Three retrieval modes
1. **Exact:** identifier (e.g., historical #319), source URL, named site, OPP-/JOB-/LESSON-ID. Prefer exact repository path and citation.
2. **State/decision:** canonical current entity, date of observation, account/approval/evidence status; don't confuse a source snapshot with status now.
3. **Similar case:** search 2–5 keywords for domain, tool, error, deliverable, locale, outcome; from `LESSONS-INDEX.md` open linked note, inspect original JOB/EVT and exclusions.

## 3. What makes a reusable memory
Capture *only actual evidence-backed experiences* with attributes:
`id`, `scenario`, `keywords`, `problem`, `attempted_action`, `observed_result`, `why (known or hypothesis)`, `context_limit`, `evidence_refs`, `related_tool`, `linked_job/event`, `confidence`, `recheck_trigger`, `next_time_checklist`.
An unverified interpretation stays CANDIDATE and may be searched but never asserted as tested guidance. If a new case contradicts an old lesson, add an evidence-linked amendment/superseding lesson, not silently rewrite history.

## 4. Response format for an assistant
```
Question:
Direct answer:
Status: DIRECTLY_OBSERVED / USER_REPORTED / HISTORICAL_SOURCE / UNVERIFIED
Evidence: [relative Git path], source observation date (and external URL if needed)
Uncertainty / applicability:
Safe next step:
```
For a high-stakes or external action, ask exact approval even if the record says a different action was previously approved.

## 5. Retrieval testing and promotion gate
See [read-only test cases](RETRIEVAL-TEST-2026-10-21.md). Five sampled questions check historical distinctions and no false offers. A **real user-selected** opportunity/job cycle with success/failure evidence remains mandatory before claiming reliable operational learning. A-Mem benchmark results cannot substitute for this test.

## 6. Scaling only if measured
If 20+ verified lessons become hard to find using manual keywords/links, propose an *optional offline read-only inverted index* as next comparison. Never build embeddings, database or agent workflow without cost, privacy, resource and retrieval-quality evaluation.
