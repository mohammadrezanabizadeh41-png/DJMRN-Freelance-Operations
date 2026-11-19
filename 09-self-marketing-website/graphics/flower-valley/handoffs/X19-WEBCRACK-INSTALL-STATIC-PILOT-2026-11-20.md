# DJMRN — X19: webcrack installation, operational readiness, and SHA-verified static pilots

**Date:** 2026-11-20 (Europe/Berlin). **Status:** `X19_STATIC_TOOL_READY / TWO_CLIENT_PILOTS_PASS / FULL_X19_EXTRACTION_PENDING`. **Last completed sequential extraction stage:** X18 (scope-qualified with known `/work` timeout); X20 not started.

## 1. Exact planned scope and authorities
- [EXTRACTION-RUNBOOK X19](../EXTRACTION-RUNBOOK.md): examine selected legitimately delivered first-party JS bundle structure, use constrained static processing, document deobfuscation/webpack module hypotheses, imports/exports and limitations. No private authoring repository/source maps/hidden server backend can be recovered by assumption.
- The [X01–X18 SHA/URL provenance crosswalk](../evidence/X01-X18-RESOURCE-URL-SHA256-PROVENANCE.json) is the canonical derived baseline for source path and first-seen identity. Original source-response bytes reside only in the owner Windows private archive.
- [Official webcrack](https://github.com/j4k0xb/webcrack) with [CLI documentation](https://webcrack.netlify.app/docs/guide/cli) and official npm `webcrack@2.16.0` are the documented tools. No other webcrack fork or paid website required.

## 2. Verified requirements and exact installation
- Official package name/version: `webcrack@2.16.0`; license MIT; Node engine permits Node 22, 24 (and current package may support Node 26). Owner laptop Node v24.22.1 and npm v11.19.1 verified live via Bridgerator 1.1.19, PowerShell 5.1.
- Existing owner download `Downloads/DJMRN-Website-Tools/SOURCE_ARCHIVE/webcrack-2.16.0.tgz` SHA256 `979F66CE4C10BE28F502AB461CD1006027A88AD625F0D4DC68E7F84B38D788AB`; independently calculated SHA512 SRI `sha512-sQx0otp+7W8MgOWjdpc+5dqGna1GRK4tx55SyRohtq4g4A1aXbqu0TLfqvIsY/PllBZgSfvV5h0nDE0iwC8gbA==`, **exactly equal to npm canonical registry metadata**. Archive tar listing 168 entries, exit 0. No duplicate archive download.
- Isolated installation: `%LOCALAPPDATA%/DJMRN-Website-Toolkit/04-Runtimes/X19-webcrack` using installed Node/npm; local tgz `npm install --prefix <runtime> --save-exact --omit=dev --omit=optional --ignore-scripts --no-audit --no-fund <verified local tgz>`. 46 packages installed, npm exit 0, CLI version 2.16.0/help exit 0. Exact lock SHA256 `32EE386E514FC79A52653778483481D65E78F2A46F7203B2E846D489F477AE40`.
- Independent live npm audit at installation checkpoint: 0 current vulnerabilities (0 high/critical). No global install, UAC elevation, Windows service, firewall/proxy/VPN change, Docker, Bun, external AI service or paid credit. Memory free at final checkpoint around 2296 MiB; at least 100 MiB emergency stop remains the project rule.
- Repeatable installer/verification source: [X19-Verified-Isolated-Webcrack-Installer.ps1](../scripts/X19-Verified-Isolated-Webcrack-Installer.ps1), run `-Mode Verify` completed successfully after installation; [actual install acceptance JSON](../evidence/X19-INSTALL-ACCEPTANCE.json).

## 3. Functional owner fixture (not vendor source)
- [Owner-only webpack fixture script](../scripts/X19-Owner-Webcrack-Static-Fixture.mjs) used `webcrack(...,{ deobfuscate:false, unminify:true, unpack:true, jsx:false })` with no executable evaluation of client code.
- **PASS:** webcrack detected `webpack` format, unpacked **two** owner-written modules, generated `101.js`, `102.js`, `bundle.json` and `deobfuscated.js`; parsed code output 725 B. [Owner fixture acceptance](../evidence/X19-OWN-FIXTURE-ACCEPTANCE.json) includes exact SHA and counts.

## 4. Two real original-response pilot checks (privacy-safe)
- [Selected original-JS pilot](../scripts/X19-Selected-Verified-JS-Static-Pilot.mjs) reads only two existing SHA-verified first-party JS response bodies from local X17 evidence; confirms each exact URL and SHA against the X01–X18 crosswalk; no new network download.
- X01 first-seen `/_next/static/chunks/webpack-a76c04a7ba9aa4ef.js`: original response 3,962 bytes, SHA256 `e9ee6b17ba7c4f30a892a7ccae50aba9a432407fa9f5fa956e03d6607b46801c`; **PASS** static AST code output 6,707 B; no standalone module bundle recognized (webpack runtime loader, not assumed to contain authored module collection).
- X16 first-seen `/_next/static/chunks/app/work/%5Bwork%5D/page-af89f4191159d0b5.js`: original response 16,851 bytes, SHA256 `7a47436417afa2e2da87a0ab8ae5d229784ea973f0e305a8753febe3e499cb5d`; **PASS**, `webpack` pattern detected, **13 structural module entries** unpacked, transformed top-level 31,016 bytes. Full generated code/module files saved **only** to owner private `01-private-captures/X19/selected-static-bundles/`.
- [Pilot acceptance metadata](../evidence/X19-SELECTED-ORIGINAL-JS-STATIC-PILOT.json): 2/2 success, 8/8 internal pilot checks. **Novelty classification:** `COMPLEMENTARY_STRUCTURE_NOT_NEW_VENDOR_BYTES` — 13 split module representations are not 13 newly downloaded site assets, not real recovered original TypeScript and not a separate HTML/GLB/texture discovery.

## 5. Optional native feature, safety, and outstanding stage work
- `webcrack` optionally loads `isolated-vm-6` on Node 24 to dynamically evaluate specific string-array decoders. This native add-on was intentionally **not installed**: not required for the X19 static webpack/unminify/unpack vertical, and would add native install script/compiler/security cost. No claim is made that dynamic obfuscator decoder works. `--no-deobfuscate`/`deobfuscate:false` was explicit for each test. More advanced decoding is a separate dependency and risk review if an actual input warrants it.
- Remaining X19 MAIN: select prioritized scene-related or larger SHA-verified JS bundles after comparing full X01–X18 evidence; run bounded static CLI only without evaluating third-party code, cross-reference module IDs and likely exported interfaces with X16 CDP, X18 jsdj and X01 scene/camera/GLB evidence, record per-claim confidence and counterevidence. Do not invent private backend/module author names, scene shader source or 1:1 reconstructed source.
- No new X19 target resource URL/body was downloaded. X19 setup and actual bounded pilot are complete; **full X19 stage is NOT marked DONE**, X20 NOT STARTED. Maintain X18 as last fully accepted extraction stage.

## 6. Local destinations
- Preflight acceptance, owner fixture script and owner fixture output: `Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261118-NEW-EXTRACTION/02-reviewed-derived/X19-PREFLIGHT/`.
- Verified tool runtime/lockfile: `%LOCALAPPDATA%/DJMRN-Website-Toolkit/04-Runtimes/X19-webcrack/`.
- Transformed private first-party JS outputs: `Desktop/DJMRN-Website-Reference-Evidence/fernhollow-gladeye-20261118-NEW-EXTRACTION/01-private-captures/X19/selected-static-bundles/`.

**Outcome:** `X19_STATIC_TOOL_READY` — complete, repeatable free tool preparation and owner/runtime pilots; full extraction next, not silently completed.
