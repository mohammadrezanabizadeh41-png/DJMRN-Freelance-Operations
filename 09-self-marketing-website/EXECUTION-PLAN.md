# DJMRN-FREELANCE-WEBSITE-001 — Staged execution plan (PROPOSAL, with operational readiness gates)

**Date:** 2026-11-14  
**Status:** PROPOSED, **not** an approved design/production architecture.  
**Primary manager:** owner + ChatGPT conversation; execution by official Codex Desktop/CLI on local Windows where appropriate; testing/independent readback by ChatGPT/Commander; GitHub canonical.  
**Single current project record:** [PROJECT-LOG.md](PROJECT-LOG.md). All project-specific research, decisions, test observations, milestones and handoffs must be stored **inside this project directory**, per 2026-11-14 owner's explicit new instruction. The older global freelance CURRENT-STATUS entries remain historical; do not maintain parallel routine site logs.

## Working principles
- Source always has ONE GitHub canonical repo: `mohammadrezanabizadeh41-png/DJMRN-Freelance-Operations`, directory `09-self-marketing-website/`. Don't create a fresh mirror/new repository unless specifically approved.
- Locally use one isolated, repo-backed clone/worktree when GitHub network succeeds. Temporary local directory with no Git synchronization must be clearly marked STAGING_ONLY and is not version authority.
- Exactly one primary coding agent (official Codex) at once on 8GB device. No forced agent team. Compare low/medium model effort on simple tasks; escalate only after quality failure, using quota responsibly.
- Existing ChatGPT, Codex quota authorized by owner for website development. No paid API, unknown-cost model, new cloud subscription, external tunnel, sensitive extension, public endpoint, deployment or production changes without a dedicated approval.
- All changes scoped to site directory; no fabricated marketing evidence or client claims. `AGENTS.md` contains Codex local instructions. No secrets, profile cookies, auth tokens or client files in source/logs.
- **Log each real stage:** actor, date, scope, approved action, file path, command, before/after, exact observed build/test outputs, Git commit/diff, blocker and next. No invented completion.
- **Design and code separate:** Figma is approved design authority only if owner chooses. Avoid blindly converting generated GUI HTML to production without semantic, performance and security review.

## Gates and acceptance

| Stage | Purpose | Evidence required to pass | Status |
|---|---|---|---|
| P0 | Consolidate prior official standards, tool/plugin research, governance and options in project folder | `RESEARCH-AND-TOOLS.md`, `EXECUTION-PLAN.md`, `AGENTS.md`, `PROJECT-LOG.md` stored and read back | **VERIFIED_REAL / DONE 2026-11-14** |
| P1 | Local dev readiness (not paid work) | `codex.cmd --version`, `codex.cmd login status`, `git ls-remote`, available workspace, security and resource review | PARTIAL: Codex login PASS; GitHub desktop network FAIL |
| P2 | Agree real first-slice requirements and visual choices | Approved audience/service priority, language plan, pages, truthful sample assets, contact method, motion quality, accepted design reference | OPEN |
| P3 | Figma/optional MagicPath layouts | Approved desktop + mobile wireframes, accessible font/colors/focus, component system, interactions, reduced-motion variant | NOT STARTED |
| P4 | Select smallest stack and create Git-backed workspace | Compare static HTML vs Astro vs Next.js for actual P2 needs; repo connectivity, a scoped task branch/worktree, precise commands, no new infrastructure | BLOCKED on local Git path and P2 |
| P5 | One real working vertical | Accessible responsive homepage with verified service copy, navigation and contact CTA; local server, meaningful smoke/E2E, no fake backend/login | NOT STARTED |
| P6 | Expand real content and motion | Selected case studies, EN/FA where approved, responsive images, micro-interactions, metadata, accessibility acceptance | NOT STARTED |
| P7 | Full local QA | Playwright viewport/function screenshots; Lighthouse baseline, axe+manual keyboard checks, lint/type/build, link and dependency/security checks, test report and fixes | NOT STARTED |
| P8 | Hosting readiness proposal | Provider's **official** commercial and regional eligibility, actual free limits, no overage/payment, privacy, DNS/TLS/security headers, rollback and alerting | NOT STARTED |
| P9 | Separately authorized production deploy | Reviewed commit and operator approval; deploy, verify live HTTP/SEO/TLS/mobile, keep rollback and monitoring evidence | NOT AUTHORIZED |
| P10 | Measure and refine | Search indexing/performance from actual user data, inbound contact process, conversion evidence, iterative fixes | NOT STARTED |

**Current next safe action:** P0 verified; P1 diagnose nonsecret Git-to-GitHub connectivity without changing firewall/VPN permissions. P2 owner-facing design discussion follows, then P3 and P4. Do not label project `OPERATIONAL` merely because a local Codex process can run.

## Specific Codex task packet template

Use a bounded professional brief per stage, not a single endless "build website" prompt:
```text
Project: DJMRN-FREELANCE-WEBSITE-001
Authority: existing DJMRN-Freelance-Operations GitHub repo / 09-self-marketing-website only.
Read: README.md, RESEARCH-AND-TOOLS.md, EXECUTION-PLAN.md, PROJECT-LOG.md, AGENTS.md.
Milestone: [single approved P# gate]
Goal and truthful inputs: [exact scope, allowed assets, intended pages]
Acceptance: [testable screenshot/functional/performance/accessibility behaviors]
Constraints: FREE-FIRST, no login backend unless approved, no secrets/accounts/billing,
 no site publication, no changes outside folder, mobile-first, semantic HTML, WCAG 2.2 AA target,
 real test results, owner sign-off for any consequential changes.
Do only milestone [P#]. Show changed files, commands, tests PASS/FAIL, screenshots paths,
 dependency impact, security/failure considerations, Git diff and next question.
Don't mark DONE without actual observed pass and GitHub synchronization.
```

## GitHub/network contingency — 2026-11-14
PowerShell `codex` may invoke a blocked `.ps1`; use `codex.cmd` (verified). Windows `git ls-remote https://github.com/... HEAD` failed with TCP 443 connectivity timeout (~21s). **Never** weaken Windows Defender/Firewall/PowerShell policy, copy tokens, or use a second unrelated local git history as a workaround. It is safe to keep canonical project documentation through the authenticated GitHub connector while diagnosing local network. Creating an isolated STAGING_ONLY folder for read-only instructions is permissible if needed but **not** an accepted synced codebase. Request specific approval before substantial unsynced coding or network/security changes.
