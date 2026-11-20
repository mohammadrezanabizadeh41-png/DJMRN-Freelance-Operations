# DJMRN X20 — Final 90-second live reference observation, REA/Wakaru/ast-grep reconciliation and closure

**Date:** 2026-11-20 · **Status:** `COMPLETE_SCOPE_QUALIFIED` for the explicitly bounded 90-second public-browser and offline semantic-analysis scope. **Next:** X21 (technology/factory triangulation). **No unpublished site source, backend, hidden GPU pipeline, or exhaustive-site coverage claimed.**

## 1. Source of truth and authorization

This owner-requested extension of X20 uses the previously verified [X01–X19 78-path URL/body-SHA provenance ledger](../evidence/X01-X19-RESOURCE-URL-SHA256-PROVENANCE.json) **unchanged**. Prior X19 closed with 34 original JS bodies processed, 457 derived Webpack modules, 670 static import hints and two genuinely new root `/matter/` PNG assets. The earlier X20 REA static study produced five selected scene-module Evidence objects plus a small owned fixture and one anonymous browser smoke test; the previous [23/23 local acceptance](../evidence/X20-INITIAL-REA-LOCAL-ACCEPTANCE.json) was independently rechecked for this extension. None of those static module representations constitute new server response files.

For the extension, anonymous Chrome for Testing 157 with already installed Puppeteer 25 was run in **one ~90-second observation window**: home view, pointer movements, wheel scroll, then `/work` with mouse/scroll. No authentication, private user data, forms, API keys, paid providers, new host permissions, permanent MCP connections or broad Chrome extensions. The browser was closed and one CDP failure to read a previously known ambient MP3 response body was retained as a limitation. Observation stopped at the 90-second target; after cleanup/reporting the rounded elapsed time was **91 seconds**.

## 2. Reconciled live results against X01–X19

| Evidence class | X20 measured | Provenance decision |
| --- | ---: | --- |
| First-party distinct normalized paths seen | 52 | **52/52 already in X01–X19** |
| New first-party network paths | **0** | No increase to 78-path canonical ledger |
| First-party HTTP 200 response events | 169 | Event count, not unique assets |
| CDP-decoded response bodies saved privately and SHA-256 verified | **46/46** | 44 same-path/same-body hashes; 2 supplemental body cases below |
| Exact previously observed response SHA matches | **44** | Repeated original-body evidence, not new files |
| Network initiator path-pairs | **50** | **50/50 already within X16's 130 pairs**, 0 novel initiator relations |
| New source-map declarations in parsed first-party scripts | **0** | No authored source-map recovery |
| Runtime checkpoints | **8** | Home Canvas=1 observed; work Canvas=0 at sampled checkpoints |
| Lowest monitored free system RAM | **965 MiB** | Above the 100 MiB emergency stop threshold |
| New verified public-JS, GLB or standalone texture *URLs* | **0** | No new scene resource route |

**Two supplementary bodies require careful identity distinctions:**

1. `https://www.gladeye.com/work` — HTTP 200 `text/html`, **957,351 bytes**, SHA-256 `2f08481df4a24a2fab50c212501fc042448d115bab306be3bb670c40ff2f1d66`; the previously archived original-body variant of this **same URL** was **648,224 bytes** (SHA-256 `180191997ba64a9dab94e70bea2f550d6a59141e2779fd2c6cca746e976d5f5a`). The changed body is real CDP-decoded evidence but might reflect different streamed/server-rendered HTML. It does **not** establish a newly authored feature or a new URL.
2. `https://www.gladeye.com/_next/image` — **182-byte** valid RIFF/WEBP VP8 image, **20×15 pixels**, SHA-256 `810a5accd053237353a62a9be4c6139d01ebb576bd07d415cdf0cde23fcd4593`. The query-sensitive optimizer path was already in the X09–X19 lineage, without an independently verified original standalone body. X20 records the first *bounded CDP-decoded body* of this path, **not** a novel image origin URL; request query parameters were deliberately not stored, so exact request-key provenance and wire-exact identity are unknown.

No new URL was added, and X01–X19 remains the one canonical normalized URL authority. The two X20 samples are recorded as supplemental body observations in [X20 independent reconciliation and acceptance](../evidence/X20-90S-INDEPENDENT-RECONCILIATION-AND-ACCEPTANCE.json), not promoted to new path identities.

## 3. Complementary static and semantic tool findings

- **REA 6.9.0** (previous X20): owner fixture + private X19 module IDs `889`, `9169`, `4059`, `4863`, `6375`. All five parsed with valid structural/semantic Evidence; module `6375` required a corrected provider timeout and retained only **600 semantic nodes** with known truncation. Earlier independent acceptance: **23/23**. Static relations and heuristic scene keywords remain candidates, not proof of observed GPU execution.
- **Wakaru 1.17.0** (official SHA-verified standalone Windows x64 ZIP): strict Webpack 5 unpack of the **same previously verified original page JS** yielded **22 module IDs, exactly the same 22** as X19's webcrack extraction (0 newly served resources). The provenance file and transformed vendor JS remain private. Wakaru's experimental Next.js RSC decoder processed the new `/work` HTML body and produced **24 RSC rows, 23 asset references, 5 script references, 0 reported decoder problems**. All **28 references** resolve to previously known X01–X19 URL paths (21 require the ordinary `/_next` URL prefix to normalize the decoded `/static/...` references). No RSC-only hint is promoted to an HTTP-verified new asset.
- **ast-grep 0.51.3** (official SHA-verified standalone Windows x64 ZIP): eight bounded AST patterns over X19 extracted code for event listeners, 3D position setters, two-argument render, WebGL `getContext`, loader calls, requestAnimationFrame and setAnimationLoop. **301 raw syntax matches** included 151 duplicate occurrences from the top-level transformed bundle files; **150 hits** remained in per-module source files. These are syntax/implementation-location hints, not 150 new features or assets. Static matcher output containing vendor snippets remains private.
- **webcrack 2.16.0**, existing Playwright/Puppeteer, X16 CDP graph and X19 SHA ledger served as baseline/observers. No unnecessary second network crawler, unknown-cost AI API, `isolated-vm` execution of vendor JS or new Chrome extension permissions were used.

## 4. Independent acceptance and reproducibility

[Acceptance JSON](../evidence/X20-90S-INDEPENDENT-RECONCILIATION-AND-ACCEPTANCE.json) independently verified **34/34 checks**: all 46 private body bytes/hashes/sizes, all 52 known URL paths, zero new paths, source-map count, all 50 network edges against X16, WebP magic/dimensions, 22/22 Wakaru/Webcrack module identity, 28/28 RSC references, ast-grep duplicate exclusion and 150 module-level matches, previous REA 23/23 and all known limitations.

Reproduction sources: [90-second Chrome/CDP owner runner](../scripts/X20-90s-Anonymous-CDP-Freshness.cjs), [ast-grep owner sweep](../scripts/X20-AST-Grep-Semantic-Pattern-Sweep.py), [independent Python reconciliation](../scripts/X20-90S-Independent-Reconciliation.py), and [sanitized live observation](../evidence/X20-LIVE-90S-SANITIZED.json). Original/decoded website response bodies, decompiled modules, RSC JSON and CLI matched snippets are stored **only** in the owner laptop's `01-private-captures/X20`; derived validation files stay in `02-reviewed-derived/X20-CURRENT`.

**Disclosures:** A CDP-decoded body is not guaranteed identical to literal compressed wire bytes; this observation is a bounded sample, not exhaustive proof of all possible site states. The `/work` HTML variant's cause is unconfirmed; image optimizer URL identity is query-sensitive. No original GPU shader authoring source, unreleased backend or protected code was recovered. X22+ graphics-frame inspectors remain separate stages.

**Decision:** `X20 COMPLETE_SCOPE_QUALIFIED` — no new original URL/path discoveries; valuable complementary RSC, semantic, AST and verified same-path body evidence; **X21 NEXT**. No payment, publication, deployment, account or OS-security changes.