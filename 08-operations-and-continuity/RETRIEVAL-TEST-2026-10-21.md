# Retrieval smoke test — repository-only, 2026-10-21

**Method:** fetch the exact live GitHub source files (no external login, payment, new account, client data or Notion). This is a **five-question documentary check**, not a blind timed evaluation, an end-to-end workflow, or a semantic-search benchmark.

| Probe (new assistant's question) | Expected source-grounded answer | Exact primary source | Result from readback |
|---|---|---|---|
| 1. What is the URL of archive site #319? | **UNKNOWN**; original JobPisteur entry has no verified URL | `01-platforms/discovery/1313-sites.csv` | **PASS**, blank URL and URL_UNVERIFIED seen |
| 2. Was AddLance registration completed? | **NO confirmed registration**; researched, status RESEARCHED_NOT_REGISTERED at 2026-10-16 | `01-platforms/international/plan-a-25.csv`, A #7 | **PASS**, row read |
| 3. What happened on Jobbers? | 8 services historically published; one Excel service rejected due contact details in a screenshot; **NOT** proof of a real paid order | `01-platforms/international/plan-a-25.csv`, A #2 | **PASS**, row read |
| 4. Is there already a verified WON job or reusable confirmed lesson? | No such verified job or promoted lesson in current repository index; **this is about repo evidence, not all past user activity** | `08-operations-and-continuity/WORK-INDEX.md` + `07-lessons-and-playbooks/LESSONS-INDEX.md` | **PASS**, index entries read |
| 5. For Karlancer, did the assistant submit a proposal? | No submission confirmed in current seven-site initiative; account exists by user report; queued for review | `03-accounts-and-operations/current-7-site-queue.csv`, IR-01 | **PASS**, row read |

## Scores and qualification
5/5 documentary source-lookups matched *their expected local records*. **NOT** proof that an independent new agent can discover answers without being told the paths; no external-site account, acceptance, contract or payout has been checked. No objective retrieval latency/cost/token metrics were measured. No automated test of chain-of-thought reasoning or semantic similarity was run.

## Missing required acceptance tests
- A new assistant without prior conversation asks the five questions, finds paths unaided and cites the right date/provenance.
- The same assistant must distinguish contradiction between older Notion historical list and actual live site conditions (UNKNOWN until verified).
- User selects a real site, an actual opportunity appears, and any draft and submission/denial are recorded under one stable ID.
- Later the assistant is asked to perform *a different but similar order*, retrieves the specific LESSON, respects its scope and avoids the earlier mistake.
- Simulate a stopped write/readback conflict without duplicating event IDs; verify no secrets included.

No paid runners, hosted embeddings, account changes or automatic workflows have been activated.
