# Opportunity workflow — from listing to result

## Start only after a real listing is seen
Before creating an `OPP`, check whether its platform and unique job URL/listing ID already exist. Keep just one OPP primary record and link other sightings.

`DISCOVERED` → `SCREENED` → `DRAFTED` → `APPROVED_TO_SEND` → `SUBMITTED` → `REPLIED/NEGOTIATING` → `WON/LOST/EXPIRED`.

**Each transition must record time, evidence and actor.** `APPROVED_TO_SEND` requires user approval for that specific proposed action; `SUBMITTED` requires actual submission evidence. `WON` requires client-side agreement, not merely positive intent.

## Primary file
Create `04-opportunities/OPP-YYYYMMDD-NNN.md` from [template](../templates/OPPORTUNITY.md). Link account/platform review if it exists, official opportunity page, and later `JOB` if awarded. Never copy customer confidential messages/PII into repository. Use short references.

## Case-to-experience link
When refused or lost, record actual reason if known, hypothesis if not, and reusable outcome only after evidence in `07-lessons-and-playbooks/`. No fake projects or budgets.
