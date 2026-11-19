# DJMRN — X17 | Source Map Explorer acquisition, activation and real CLI preflight

**Date:** 2026-11-19. **Mission:** DJMRN-FREELANCE-WEBSITE-001, E1/E5.  
**Status:** `X17_TOOL_READY_COMPAT_MODE_SCOPE_QUALIFIED` — installation and controlled fixture validation completed; X17's full substantive source-map component analysis has **NOT** been executed. `PROJECT-LOG.md` is the sole CURRENT stage authority.  
**Preceding stage:** [X16 scope-qualified completion](X16-TECHNICAL-HANDOFF-2026-11-19.md); public-reference source-map candidates advertised in X16: **0**.

## 1. Source, cost, rights and setup

- **Upstream authority:** [danvk/source-map-explorer](https://github.com/danvk/source-map-explorer), [official README](https://github.com/danvk/source-map-explorer/blob/master/README.md), npm `source-map-explorer@2.5.3`; license **Apache-2.0**, Node requirement `>=12`.
- **Already-downloaded source:** owner's local `Downloads/DJMRN-Website-Tools/SOURCE_ARCHIVE/danvk-source-map-explorer-v2.5.3.zip`, 5,748,362 bytes, SHA-256 `AA65D78A51EB6E19DCC3ACA2E8F0DB196483458370F39F46D90B460C7219DDAF`. This is a **source archive**, not proof of a pre-installed binary.
- **Live registry metadata verified:** version `2.5.3`, license `Apache-2.0`, npm integrity `sha512-qfUGs7UHsOBE5p/lGfQdaAj/5U/GWYBw2imEpD6UQNkqElYonkow8t+HBL1qqIl3CuGZx7n8/CQo4x1HwSHhsg==`.
- **Chosen minimal install:** `npm install --prefix <X17_LOCAL_RUNTIME> --save-exact --omit=dev --ignore-scripts --no-audit --no-fund source-map-explorer@2.5.3`. Installed **52 npm packages**, exit `0`, isolated under `%LOCALAPPDATA%/DJMRN-Website-Toolkit/04-Runtimes/X17-SourceMapExplorer/`; executable entry `node_modules/source-map-explorer/bin/cli.js`. No global install, administrator/UAC, Docker, WSL, paid service, account/API key or new browser.
- **Installed package version check:** `node bin/cli.js --version` output `2.5.3`; package manifest license `Apache-2.0`; `package-lock.json` exists, SHA-256 `5E42BF649A164CDC1EA799CAB4144DF386054C369780F86F3A3AA0DF644EDDC3`.
- **Read-only npm audit:** zero low/moderate/high/critical reported among installed production dependencies, audit exit `0`. npm still warned that older dependencies such as `glob@7`, `rimraf@2`, `inflight@1` are deprecated; audit result is not a permanent security guarantee. Avoid running untrusted map sources and do not add this dependency to the public website production bundle.

## 2. Actual CLI and file-output validation

The **first** locally-authored synthetic JS+map fixture was invalid under strict border checking: Source Map Explorer reported `generated column Infinity`. Fixes to manual end-of-line mappings did not make the strict CLI pass; this negative test is retained rather than reported as success.

A **second independent control** extracted two exact, upstream-maintained Apache-2.0 test fixtures from the owner's verified source ZIP: `tests/data/foo.min.js` (718 bytes) and `tests/data/foo.min.js.map` (1,687 bytes). The strict CLI also returned `InvalidMappingColumn / Infinity` on this upstream sample. This is a documented compatibility/validation limitation in version 2.5.3; it is not evidence of absence of map files or corrupt X15/X16 captures.

The documented explicit fallback `--no-border-checks`, **without disabling Windows security or browser protections**, worked on the upstream fixture:
- `--json`: exit `0`, a valid JSON report `official-compat-treemap.json` (768 B, SHA-256 `F9AB29825007324597144B2D37D7ED7454660DB346BD3C355DDF440338A3D105`).
- `--html`: exit `0`, a real HTML treemap `official-compat-treemap.html` (15,710 B, SHA-256 `E6D522BD22E02B4CCF7844B5EC78ED9F67D8F33FC65BEBCC9529C76D46CCBAB2`).
- CLI warned **1/718 bytes (0.14%) unmapped** in the upstream fixture; this limitation is explicit, not concealed.
- `X17-Run-SourceMapExplorer.ps1` was created as an owned, reusable wrapper with input-path existence checks, 350 MiB preflight free RAM guard, safe output-no-overwrite, and `--no-border-checks` **only when the operator sets** `-AllowNoBorderChecks`. Separate wrapper call produced the same parsed JSON with SHA `F9AB29825007324597144B2D37D7ED7454660DB346BD3C355DDF440338A3D105`.

### Local reproducibility

All fixture data, reports and runtime scripts remain on the owner's laptop:

`Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261118-NEW-EXTRACTION/02-reviewed-derived/X17-PREFLIGHT/`

Machine-readable scope-qualified tool-readiness status: `X17-PREFLIGHT-ACCEPTANCE.json`. Exact original fixture source/code, synthetic negative test, JSON treemap and HTML treemap are **local**, not public-website reference assets. Main runtime and lockfile: `%LOCALAPPDATA%/DJMRN-Website-Toolkit/04-Runtimes/X17-SourceMapExplorer/`.

## 3. X17 main-stage acceptance boundary and next work

**What is operational:** local Node 24, pinned free Source Map Explorer 2.5.3, a reproducible explicit-compat CLI run to JSON/HTML, an owner-authored checked runner, local file hashes, negative strict-test evidence, and source/licensing provenance.  
**What is not established:** valid public Gladeye source maps, target source/authoring module reconstruction, accurate absolute module-size attribution with border checks relaxed, or reconstruction of unserved server/GPU source.

**Exact X17 next action:** Use the official/owned fixture to assess module-size map behavior and byte/unmapped accounting, then consider a user-owned project bundle with a valid source map, if available. Since X16 observed zero public advertised source maps, record the target map branch as **NO_DECLARED_MAP / UNKNOWN_PRIVATE_OR_UNSERVED** rather than brute-force guessing URLs or claiming an original source-code treemap. Preserve X17 as a **separate stage**; do not prematurely execute X18 jsdj.

**Continuity:** Update only the single canonical `PROJECT-LOG.md` when the full X17 stage is completed; this document is a technical preflight handoff and does not create a parallel CURRENT tracker.
