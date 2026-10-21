# Quality checks and recovery rules

## Immediate non-invasive tests
From a local clone with Python installed, run:
```sh
python scripts/validate_repository.py
```
No package install, internet request, external API, account action or billable GitHub Action is involved.

**Assertions:** 1313 consecutive archive IDs (one missing URL at source #319), A=25, B=17, 42 unique Plan entries, practical queue=7 (4 international + 3 Iranian), and required navigation/template files exist. Fails with a nonzero code on violated conditions.

## Practical acceptance test before calling system useful
For a real user-selected site, read the quick handoff, inspect latest account evidence, link at least one genuine opportunity, record an approved/not-approved proposal, and capture the actual result as an event. A new assistant must be able to identify last action and next safe step using this repo alone. No false sample client or fabricated award.

## Security and operational checklist
- Do not commit personal financial records, KYC, private correspondence, session data, client deliverables or secrets. `.gitignore` is only a guardrail, not a security boundary.
- Ask for approval before any actual submit/contract/payment/publication/account change.
- Read first-party platform current terms before a consequential application; known prices/limits must include source and date.
- GitHub commit + branch head + target files readback is the write success gate.
- Mark attempted but failed writes `UNVERIFIED`, don't create phantom success.
- Check the canonical record before adding a duplicate; use correction event rather than erasure.

## Deferred, not activated
GitHub Issues, Projects board, Actions/CI, hosted DB, agents, automatic monitoring/sync, customer files upload. Activation requires an actual use case, verified plan/quota and user approval. Private GitHub Actions use minutes/storage allowances and can bill for overages — not enabled by this revision.
