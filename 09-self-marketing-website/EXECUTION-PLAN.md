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
| P1 | Local dev readiness (not paid work) | `codex.cmd --version`, `codex.cmd login status`, `git ls-remote`, available workspace, security and resource review | **VERIFIED_REAL / DONE 2026-11-14** (current WinINET proxy applied to Git command only; clean sparse clone, Codex GUI project created) |
| P2 | Agree real first-slice requirements and visual choices | Approved audience/service priority, language plan, pages, truthful sample assets, contact method, motion quality, accepted design reference | OPEN |
| P3 | Figma/optional MagicPath layouts | Approved desktop + mobile wireframes, accessible font/colors/focus, component system, interactions, reduced-motion variant | NOT STARTED |
| P4 | Select smallest stack and create Git-backed workspace | Compare static HTML vs Astro vs Next.js for actual P2 needs; repo connectivity, a scoped task branch/worktree, precise commands, no new infrastructure | **PARTIAL:** existing repo cloned, local task branch created; stack choice awaits P2 and P3 |
| P5 | One real working vertical | Accessible responsive homepage with verified service copy, navigation and contact CTA; local server, meaningful smoke/E2E, no fake backend/login | NOT STARTED |
| P6 | Expand real content and motion | Selected case studies, EN/FA where approved, responsive images, micro-interactions, metadata, accessibility acceptance | NOT STARTED |
| P7 | Full local QA | Playwright viewport/function screenshots; Lighthouse baseline, axe+manual keyboard checks, lint/type/build, link and dependency/security checks, test report and fixes | NOT STARTED |
| P8 | Hosting readiness proposal | Provider's **official** commercial and regional eligibility, actual free limits, no overage/payment, privacy, DNS/TLS/security headers, rollback and alerting | NOT STARTED |
| P9 | Separately authorized production deploy | Reviewed commit and operator approval; deploy, verify live HTTP/SEO/TLS/mobile, keep rollback and monitoring evidence | NOT AUTHORIZED |
| P10 | Measure and refine | Search indexing/performance from actual user data, inbound contact process, conversion evidence, iterative fixes | NOT STARTED |

**Current next safe action:** P0 and P1 verified. Codex desktop project created for exact existing checkout, model chosen. Run one bounded read-only Codex requirements/toolchain review; P2 owner-facing scope/design sign-off follows, then P3 and P4. Do not label website `OPERATIONAL` merely because local Codex project can run.

## Model routing, quota and desktop operating policy — VERIFIED 2026-11-14

**Observed in the actual ChatGPT Desktop Codex model picker:** Default; GPT-6.1 Sol; GPT-6 Astra; GPT-6.1 Terra; GPT-6 Sol; GPT-6 Luna; GPT-5.6 Sol, Terra and Luna. The **old default** from `%USERPROFILE%\.codex\config.toml` was `gpt-6.1-terra` with `model_reasoning_effort="ultra"`—too costly to apply indiscriminately. Through the desktop model picker, **GPT-6 Luna / Medium** was selected, then verified in both the Codex UI and the actual config as:

```toml
model = "gpt-6-luna"
model_reasoning_effort = "medium"
```

**Usage snapshot from actual desktop account Usage UI (Plus):** five-hour limit **100% left**; weekly limit **100% left**; **0 purchased credits**. A percentage does not prove an exact number of requests or future resets. Codex and Work consume plan allowances; DO NOT buy credits, trigger auto-pay, use API-key billing, spend on third-party models, or enable Fast/Ultrafast. Only included Plus quota has been authorized for this project.

**Official model+reasoning references (2026-11-14):**
- OpenAI [Work and Codex model picker / per-model effort guidance](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex).
- OpenAI [Managing usage with GPT-6 Astra](https://help.openai.com/en/articles/20001516-managing-usage-with-gpt-6-astra-in-work-and-codex): *estimated* Plus local messages per five-hour window: GPT-6.1 Sol ~15–160; GPT-6 Luna ~350–3000. These ranges are not a personal guarantee, and weekly limits also apply. Multi-step/context-heavy tasks may exhaust usage faster.
- OpenAI [Model selection guide](https://developers.openai.com/api/docs/guides/model-selection): Luna for focused scoped work; GPT-6.1 Sol for complex website-from-brief technical coordination; Astra for rare difficult reasoning.
- OpenAI [Codex usage in your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) and [Credits policy](https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-personal-plans): plan allowance first, optional additional paid credits separately governed.

**Decision: one primary coding agent, task-level models.**
- **Default `GPT-6 Luna / Medium`:** repository orientation, read-only inspection, building tightly specified components, responsive CSS, writing deterministic tests, reviewing small diffs, fixing simple verified issues. Use small prompts and acceptance criteria.
- **Upgrade a *specific* task to `GPT-6.1 Sol / Medium` only as needed:** overall frontend architecture and technology choice after real requirements, cross-page state/data flows, complex animation/interaction tradeoffs, hard debugging, meaningful security and accessibility reviews. Move back to Luna for routine implementation afterward. If changing the persistent default in the GUI, verify both app selection and config, and record task-level rationale.
- **Terra / Low-Medium:** optional for genuine screen/computer-use tasks; no need to add another default just because available.
- **Astra / Low-Medium:** exceptional, after observed inability of Sol to meet precise acceptance; explicitly measure quota impact.
- **Ultra, Ultrafast and high reasoning by default: DISABLED/NOT SELECTED.** Fast mode remains off. Low/Medium tests come before escalating.
- Monitor current usage through desktop Usage; compare scoped tasks by real `git diff`, Playwright/Lighthouse/axe results, correction count and time/allowance. Model cost/performance from API tariff is NOT the same as Codex subscription message consumption.

**Codex desktop project and Git checkout — DIRECTLY_OBSERVED:**
- Existing repository cloned successfully at `C:\Users\Mrn7206\Documents\Codex\DJMRN-Freelance-Operations` using **temporary command-scoped Git HTTP proxy** resolved from existing Windows WinINET settings; original direct `github.com:443` timeout was due to Git not using that route for that attempt. Command-scoped `git ls-remote` and shallow/sparse clone succeeded; no global Git proxy, VPN, firewall, PowerShell policy or credential change made.
- Sparse checkout only `09-self-marketing-website` plus standard root metadata; full source authority remains GitHub. Clone HEAD `72a027a5362fa0c78437b96d3695374a120035e7` at creation, working branch `codex/freelance-website-foundation` created locally; clean `git status`. No push/merge.
- ChatGPT Desktop Codex project **`DJMRN Freelance Website`** created in the UI with source folder set to that existing repo, and appeared as active project with GPT-6 Luna Medium. This is the first real UI project creation; no website source code produced yet.
- Check existing owner-run code and hooks before trusting a local folder. Initial sparse checkout showed only repo documents/website sources and stock `.git/hooks/*.sample` (not active Git hooks); no custom autorun under `.vscode`, `.codex` or `.agents` observed in that local checkout.
- GitHub source is NOT independently synchronized until the next fetch/pull readback after this documentation update; use scoped proxy and confirm branch/HEAD. Do not publish production or send network data outside the approved repo.

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
