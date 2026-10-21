# freelancermap — logged-in Find projects UI reference

**Observed:** 2026-10-21 · **Source:** 5 consecutive user screenshots (scrolling through the *same* live signed-in Find projects results page) · **Method:** visual reading, no authenticated browser control by assistant · **Evidence confidence:** DIRECTLY_OBSERVED_IN_USER_SCREENSHOTS.
**Scope:** visible UI ONLY, **not** a complete documented list of all available hidden options or an enduring 2027 layout guarantee.
**Why kept:** new assistant must be able to guide same search controls without asking to resend identical screenshots.

## Where controls are
- Top navigation: `Dashboard`, `Find projects`, `Upgrade` (do not click Upgrade as part of search).
- Main search input placeholder: **Search by job title, skills, or company**; black **Find projects** submit button.
- Inline link: **advanced search options** (not opened or inspected in these screenshots).
- Left side filter groups, scrolling down sidebar/page reveals all groups below.
- Result column has count, sort, active filter chips and cards. Star outline on each card is a per-project favorite affordance; clicking is a user-visible action, **not** an application submission. Details/requirements require opening card itself.

## Current screenshot state; do NOT confuse visible vs recommended

| UI/setting | Currently observed value | Specificity |
|---|---|---|
| Visible results heading | **903 jobs & projects** | As pictured, may change any moment |
| Sort | **Newest** | Appears active |
| Location scope | **Worldwide** | Active chip |
| Excluded origin | **Exclude projects from German speaking countries** | Active chip and checked left control |
| Reset | **Reset all** | Visible; **do not press** unless user wants to discard filters |
| Main search query | Field empty in shown view | No keyword text visible |
| Saved searches | **Current search**, shortened label `DJMRN - Global Re...` | Text truncated; historic saved daily alert named `DJMRN - Global Remote Tech & Creative`, likely related but identity **not proven** from truncated text |
| Saved search actions | Save/floppy icon, bell indicator with `0`, ellipsis `⋮` | No clicks; `0` meaning NOT established |
| Selected remote/freelance checkboxes | **both unchecked** | Must set on user site |
| Publication date | Slider visually at left of 0–30 range | Meaning of handle/selection unclear; **do not infer a date filter** |

### Workplace (all three visible)
| Checkbox | Visible facet count | Checked in screenshot |
|---|---:|---|
| On-site | 416 | No |
| Hybrid | 185 | No |
| **Remote** | **302** | **No** |

### Contract type (all visible)
| Checkbox | Visible facet count | Checked in screenshot |
|---|---:|---|
| **Freelance** | **659** | **No** |
| Agency contract (e.g. ANÜ) | 129 | No |
| Permanent | 115 | No |

### Publication date
- Panel title: **Publication date**.
- Units: **days**; scale tick labels **0, 6, 12, 18, 24, 30**. A single handle is visible near 0 in the captured state.
- Do not assume this represents a completed `0 days` filter or other effective date range unless result chip/updated count confirms.

### Industry (all ten visible)
| Checkbox | Facet count |
|---|---:|
| IT | 322 |
| Plant and Mechanical Engineering | 37 |
| Automotive | 36 |
| Energy Industry | 30 |
| Finance | 28 |
| Medicine and Pharmaceuticals | 27 |
| Manufacturing | 14 |
| Corporate Management | 13 |
| Electrical Engineering | 11 |
| Traffic and Logistics | 10 |

No Industry checkbox visibly selected in submitted screenshots.

### Keywords
- Panel **Keywords** includes a dropdown-style field labeled/placeholder **Keywords**; contents and available values **were not opened/seen**.

### Professional fields (visible six, + show more)
| Checkbox | Facet count |
|---|---:|
| Web and software development | 520 |
| Writing and translation services | 9 |
| Graphic design and Creative services | 24 |
| Digital Marketing | 54 |
| Engineering | 81 |
| Finance and Accounting | 23 |
- Link **show more** is visible; additional option labels/counts **not inspected**. None visibly checked.

### Country (visible six, + show more)
| Checkbox | Displayed facet count |
|---|---:|
| Germany | 12,771 |
| Switzerland | 696 |
| Austria | 417 |
| United Kingdom | 246 |
| Poland | 86 |
| USA | 76 |
- Link **show more** visible. None of these checkbox options selected in screenshots; scope `Worldwide` chip is selected above.
- **Important:** Country facet counts (e.g. Germany 12,771) **do not match** the current filtered 903 result count. Treat them as counts from a different facet scope/cached/global data, not additive or proof of 12,771 current visible results.

### Search options (3 visible)
| Checkbox | Facet count | Current checked |
|---|---:|---|
| End client projects only | 68 | **No** |
| **Exclude projects from German speaking countries** | **903** | **YES** |
| Exclude projects you've applied to | 903 | **No** |

### Popular categories (chips, not selected in screenshot)
- `Python (Programming Langua...` (truncated on chip)
- `SAP S/4HANA`
- `JavaScript`
- `Node.js`
- `Quality Management`
- `IAM`
- `Communication`
- `ISO 26262`
- `TypeScript`
- `Polarion`

## What the first results show (observation, not recommendation)
- The list begins with **Darwin Recruitment — Salesforce Marketing Cloud (DRWN)**, repeatedly posted as **On-site · Freelance** with different cities/countries shown, including **Chișinău (Moldova), Minsk region (Belarus), Sofia (Bulgaria), Warsaw (Poland), Budapest (Hungary), Bucharest (Romania), Bratislava (Slovakia), Prague (Czechia)**. Multiple location-based entries **may be one syndicated role**. Deduplicate by source URL/listing ID/requirements before treating as separate opportunities.
- Other visible cards include **Thryve — Computer Vision Engineer - Medical Sector**, Paris, **100% remote · Freelance**, Kotlin tag; **Amass Technology — Pega Architect**, Bucharest, **100% remote · Freelance**; **Phaidon EPM London — Interim QA Director**, Tampa, **On-site**; **Synergize Consulting Ltd — Cloud Operations Azure Engineer - SC Cleared**, London, **On-site**; **Berkeley Square IT Ltd — Workday Functional Consultant**, UK, **On-site / Agency contract**.
- Cards from this screenshot **were not opened**; specific job IDs, salary, actual employer eligibility and payment methods UNKNOWN. Not shortlisted as an application-worthy OPP based on title alone.

## User-guided search — recommended exact next clicks (not yet performed)
1. In **Workplace**, tick **Remote** (currently 302 shown). Let results refresh, observe count/chip.
2. In **Contract type**, tick **Freelance** (currently 659 shown). Observe **combined count**; do NOT calculate it as 302∩659 or add facet counts. Preserve **Worldwide**; temporarily keep active German-speaking exclusion to compare with current baseline.
3. Leave other fields, keyword and publication-date slider untouched for this baseline; **Newest** already active.
4. After user reports new visible total, start individual skill-specific searches one at a time rather than applying mutually restrictive professional-fields filters: `WordPress`, `AI video`, `Python`, `automation`, `video editing`, `voice over` (exact site matching behavior not assumed). Log the query, checkbox states, results count, link/ID and date for each.
5. Optional second comparison: turn off **Exclude projects from German speaking countries** only if results need expanding; German-speaking-origin does not mean a job must be in German, and conversely `Remote` does not mean Iran-eligible.
6. Save a **new** search preset only when user authorizes, avoid overwriting the older saved daily-alert preset. Existing saved-search icon/counts are not authorization to change email alert rules.

**Safety:** Browsing and filters are read-only; do not click Upgrade, apply, buy credits, send messages or assume residency eligibility. User residence and payments must be handled truthfully; verify each shortlisted listing before requesting approval to send.

## Relation to earlier GitHub memory (repository itself searched)
- `01-platforms/international/plan-a-25.csv`: external Plan A #4 freelancermap, active Basic, historic worldwide remote daily alert; no sent application proved as of that snapshot.
- `03-accounts-and-operations/freelancermap-2026-10-21-review.md`: account state, Basic restrictions, public shortlist, previous dashboard.
- `08-operations-and-continuity/sessions/FMAP-SESSION-001.md`: the live handoff journal.
- `04-opportunities/shortlists/freelancermap-2026-10-21.md`: separate public-search candidates; not results of current signed-in on-site filter.
- `08-operations-and-continuity/CURRENT-STATUS.md`: next authoritative checkpoint.
- Source of *these UI details* is the screenshots sent by user **on 2026-10-21**, not current official documentation; revisit only if site layout changes.
