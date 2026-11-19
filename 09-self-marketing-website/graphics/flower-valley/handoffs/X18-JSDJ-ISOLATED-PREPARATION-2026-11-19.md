# DJMRN — X18 jsdj preflight and installation readiness (2026-11-19)

**Status at this checkpoint: SOURCE_VERIFIED / INSTALL_PENDING_REMOTE_ACCESS / NOT OPERATIONAL.**
**Scope:** X18 / E1-E5, static discovery of dynamically referenced JavaScript and Next.js chunk dependencies, with provenance; *not* restoration of private/unserved authored source.

## Canonical sources and selection

- Existing project [EXTRACTION-RUNBOOK](../EXTRACTION-RUNBOOK.md), X18 row: jsdj source / runtime previously unverified.
- Canonical upstream: https://github.com/ejfkdev/jsdj ; npm: https://www.npmjs.com/package/@ejfkdev/jsdj .
- Official package manifest at source main branch: `@ejfkdev/jsdj`, **0.1.2**, **MPL-2.0**, Node **>=20.11**, type ESM, no direct runtime dependencies.
- Package implements 26 plugin families (documented), e.g. HTMLScriptPlugin, DynamicImportPlugin, ESMImportPlugin, WebpackPlugin and NextJSPlugin. Source maps may be restored only where available; do not fabricate recovered original files.
- Source Map Explorer X17 is distinct: the X18 software performs public client-side discovery rather than original authored code reconstruction. X18 can complement X16's 130 CDP network initiator edges but not replace evidence-based runtime observations.

## Minimal installation plan (created as owner-written code, not yet executed)

- Script: [X18-Install-Verify-jsdj.ps1](../scripts/X18-Install-Verify-jsdj.ps1). Verifies Node 20.11+, >=350 MiB physical RAM free, canonical npm package identity/version/license, exact `@ejfkdev/jsdj@0.1.2`. Uses isolated **`%LOCALAPPDATA%/DJMRN-Website-Toolkit/04-Runtimes/X18-jsdj`**, production-only npm dependencies, `--ignore-scripts --no-audit --no-fund --save-exact`, no elevation or global packages. Checks CLI `version`, plugin listing, lockfile SHA; saves `X18-INSTALL-ACCEPTANCE.json` in the owner Desktop project `02-reviewed-derived/X18-PREFLIGHT`.
- Optional native TLS sidecar deliberately **not installed**. No cookies, bypass credentials, VPN/proxy changes, Bun, Docker or web accounts needed for the first operational vertical.
- Own localhost fixture: [X18-Localhost-Fixture-Preflight.mjs](../scripts/X18-Localhost-Fixture-Preflight.mjs), deterministic HTML + static module + lazy dynamic import + own source map on `127.0.0.1` ephemeral port; bounded CLI timeout, concurrency 1, no outside-site requests, memory emergency stop below 100 MiB. Writes fixture-specific JSON plus `X18-OWN-FIXTURE-ACCEPTANCE.json` only after an actual run.

## Current evidence and blockers

- Prior X17 GitHub log confirms Node 24.22.1, npm 11.19.1, installed Chrome for Testing 157 and Python. **Do not mistake previous observations for reverified X18 laptop state.**
- On this attempted X18 preflight, new PC Remote Commander returned a gateway status once, but later repeated local read/command calls returned `RELAY_UNAVAILABLE` and then **internal tool failures**. No command output established the X18 runtime state.
- Old backup Desktop Commander device was queried read-only and is OFFLINE; it was not used to run commands or consume execution quota.
- **Not performed or asserted:** fresh local X18 inventory, npm registry on-laptop readback, isolated install, CLI version/list, functional localhost fixture, checksum validation, local X18 output folder, actual site X18 scan. No site archive, source code or user credentials were transferred.
- The only completed X18 actions in this checkpoint are official source research and committing two first-party operator/test scripts to GitHub. **Scripts in GitHub are not proof they were executed on the laptop.**

## Gate to call X18 operational

1. Restore and verify PC Remote Commander command/file transfer; preserve the established paired `PCRC-Workspace` location and normal Windows user launch (no C:\ workspace root).
2. Re-run read-only hardware/runtime inventory and check if X18 already installed to avoid duplicate installs.
3. Run verified isolated installer *once*, inspect actual exit code/CLI version, lock SHA, package integrity and local `X18-INSTALL-ACCEPTANCE.json`.
4. Run owner-only localhost fixture and require real exit 0, main HTML script and lazy import discovery, exact source-map fixture behavior and no RAM emergency.
5. Copy tests/derived technical metadata into owner local X18-PREFLIGHT. Update the canonical `PROJECT-LOG.md` stage only after real evidence is returned.
6. X18 MAIN target extraction only on separate user instruction; if running, bound requests and avoid claiming original backend/source maps. No paid or sensitive-provider features.

**Conservative decision:** `X18_PREPARED_RESEARCH_ONLY; INSTALL_UNVERIFIED; NOT_OPERATIONAL`. X17 remains the last fully accepted stage. Do not start X19.
