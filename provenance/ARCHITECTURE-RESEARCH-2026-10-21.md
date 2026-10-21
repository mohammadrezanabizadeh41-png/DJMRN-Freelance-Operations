# Architecture research — Git-based freelance operational memory

Date: 2026-10-21 · Status: RESEARCHED / SELECTIVE ADOPTION · Scope: this GitHub repository only.

## Verified models and concrete examples

| Approach | Real source | Transferable value | Trade-off / decision |
|---|---|---|---|
| GitHub docs-as-code + README | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes | Native relative links and navigation inside files | **Adopt**: preserve in-place Markdown/CSV and compact start page |
| Git file commit/blame history | https://docs.github.com/en/repositories/working-with-files/using-files/viewing-and-understanding-files | Who changed the record and when | **Adopt** with explicit evidence/time; history does not prove external action |
| GitHub Issues/Projects | https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/planning-and-tracking-work-for-your-team-or-project | Task discussions, status boards and issue templates | **Defer** to avoid two live masters while only 7 sites queued; opt in if queue grows |
| ADR / decision records | https://adr.github.io/ and https://github.com/architecture-decision-record/architecture-decision-record | Context/options/decision/consequences / supersession | **Adopt lightweight** only for consequential method/policy choices |
| Diátaxis | https://diataxis.fr/ | Separate how-to, reference, explanation and learning | **Adopt editorial guidance**, not a forced folder migration |
| AGENTS.md | https://agents.md/ | Predictable agent-specific repo instructions | **Adopt**; assistant must have tools and read files; file alone cannot force access |
| TIL collections | https://github.com/jbranchaud/til and https://github.com/thoughtbot/til | Small topic-specific reusable lessons with links | **Adopt** with direct case evidence; thoughtbot example is archived, so use as historical pattern only |
| Hosted database/agent/sync | No new provider required | Rich query/automation | **Reject for now**: introduces cost, integration and authority reconciliation before real value |

## Cost and boundaries
GitHub's Free tier advertises unlimited private repositories (https://github.com/pricing); no new paid service is necessary for Markdown/CSV and Git reads/writes. GitHub Actions for private repos use monthly minutes/storage allowances and usage beyond entitlement can be billed: https://docs.github.com/en/billing/concepts/product-billing/github-actions . Therefore **no Actions workflow, hosted runner or automatic CI was enabled** and account-level remaining quota was not claimed.

Repository secrecy is not sufficient for confidential credentials or customer documents; removing leaked secrets from Git history can require coordinated rewriting and credential rotation (https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository). Protect up front.

## Comparison and judgment
The repo already had eight good directories and historical evidence. Rebuilding it with a new hierarchy would add friction and potentially break links. Main missing pieces were stable entity relationships, CURRENT vs historical separation, short assistant retrieval, success/approval gates, and integrity checks. **Smallest adequate change:** improve current files, add navigation, templates, a decision record, research evidence and a single offline validator.

## Practical failure cases to watch
Wrong status inferred from a historical snapshot; stale platform eligibility; duplicated proposal records; two assistants overwriting the same file; missing approval for an outgoing action; accidental sensitive-data commit; current summary drifting from source record. Tests, provenance and compare-and-swap writes mitigate but cannot guarantee correct real-world outcomes.

## Review only after use
Measure recovery speed, number of factual duplications, ability to trace one genuine opportunity through a delivered order, consistency of lessons, and manual update time. Only then decide on Issues/Projects, scripts and any additional service. This research itself authorizes no activation, installation or external account action.
