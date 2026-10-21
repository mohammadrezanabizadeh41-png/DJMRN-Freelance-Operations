# Minimal operational repository architecture

```
README.md / PROJECT-RULES.md / ARCHITECTURE.md / AGENTS.md
01-platforms/            1313 historical sites; country/group lists; active account catalogs
02-screening/            historical 198/62/45 and dated evaluations; decision reasons
03-accounts-and-operations/ seven-site work queue; registered vs verified
04-opportunities/        one file per real job lead and application lifecycle
05-client-projects/      one folder per accepted real contract; delivery and QA
06-tooling/              software/version/licence/approval used for actual work
07-lessons-and-playbooks/ evidence-backed lessons and repeatable methods
08-operations-and-continuity/ CURRENT, append-only activity, handoff
provenance/              Notion source URLs, boundaries and import receipts
templates/               schemas for events, opportunities and jobs
```

## Data model
PlatformIdentity = URL/name/aliases, not eligibility. PlatformMembership = user account-specific separately sourced state. Opportunity = one real listing with source permalink. Proposal = one user-approved outgoing application. Job = awarded contract. ToolUse = approved installation/version/impact linked to job. Event = immutable observed action/evidence. Lesson = tested inference tied to event.

**One source of truth per fact class, Git history + explicit CURRENT, no parallel database, agent framework or new services.** CSV is readable seed format; detailed work Markdown. Only if measured volume/search/reliability requires, propose DB/automation later with approval.

## Fast handoff
Read 4 files first; drill to selected platform. Compact status avoids scanning 1313 records for each chat. Run migration integrity validation before claim of 1313 completeness; use actual GitHub readback. Never treat frozen Notion exports as live verification.
