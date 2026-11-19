# DJMRN X18 — Dynamic JavaScript discovery and source-map reachability

**Date:** 2026-11-20. **Status:** COMPLETE_SCOPE_QUALIFIED_WITH_KNOWN_WORK_TIMEOUT. **Next:** X19 NOT STARTED.

## Installation and real operational checks
- Bridgerator 1.1.19 connected to DJMRN-LAPTOP. Node 24.22.1 / npm 11.19.1. Software: official @ejfkdev/jsdj v0.1.2, MPL-2.0; isolated in the project toolkit, no UAC or paid API.
- 26 plugin names loaded; upstream package has 0 direct runtime dependencies. On-laptop npm audit reported 0 current vulnerabilities.
- Independent owner-only localhost test: 9 requests, 3 JS URLs, 1 source map and 1 restored OWN source file, exit code 0; test guards all passed.

## Main first-party public scan
- 10 of 10 designated X16 public routes attempted using anonymous GET/HEAD only on gladeye.com and www.gladeye.com; no cookies, private accounts or third-party hosts.
- Main plus targeted focused retry: 9 routes completed jsdj PASS, 1 route had a bounded timeout (/work). Original+focused scan requests recorded: 419.
- Independent /work fallback verified original public HTML response HTTP 200, 957351 bytes, 5 unique first-party script src paths; SHA256 2f08481df4a24a2fab50c212501fc042448d115bab306be3bb670c40ff2f1d66. It does not replace complete jsdj recursive crawl.
- The live plugin output contains 8 actual .js-path entries after excluding 6 HTML/route entries mistakenly mixed into plugin URL lists. Scanner JS dependency edges are static discovery/provenance, not complete executed module imports.

## Newly verified response bodies
- 3 genuinely additional JS files not in X16, HTTP200 and SHA256 verified: https://www.gladeye.com/_next/static/chunks/pages/_error-c92d5c4bb2b49926.js (247 B; f14770f5d6c8bdfca9b141ecf8dc9fe91349bd42161ae146646ab4e7305429a2); https://www.gladeye.com/_next/static/p2bqUOtISlsUD-1MiVjOb/_buildManifest.js (224 B; ecfebbfba964a258fc10a7c6d854248d7246c17c734a2d7abb17a262e6872aba); https://www.gladeye.com/_next/static/p2bqUOtISlsUD-1MiVjOb/_ssgManifest.js (80 B; 678f6ce2cb80b1fe72fc67e7412be6e2ab6ada083111b64f7c40d35e3cba5e00).
- X16 baseline was 31 SHA-verified body files within 32 observed JS paths. X18 adds 3 = 34 SHA-verified original bodies in 35 known JS paths, one unresolved previous path https://www.gladeye.com/gtm.q-c92099c696a43b1f.js.
- Raw vendor bytes saved ONLY in owner private capture folder, not GitHub. Public metadata in X18-public-sanitized-discovery.json and CSV.

## Full offline plugin sweep and findings
- All 34 SHA-verified first-party JS bodies inspected with 26 jsdj plugins. Plugin errors: 0.
- 4 static pattern edges, 3 unique potential target paths. These are HYPOTHESES, not witnessed runtime loads or confirmed available assets.
- Draco decoder and wrapper candidate paths came from bundle 596 via UniversalURLPlugin; HEAD failed for one and returned HTTP404 for other. BuildManifest-generated nested _error path also returned HTTP404; no asset existence claimed.
- X16 independently recorded 130 CDP first-party network initiator edges; that runtime observation is not equivalent to the static jsdj hints.

## Source-map scope and honest limitations
- Original target publicly advertised/reachable Source Map candidates: 0 in this jsdj pass, as previously zero declared during X16. New/restored original authored sources: 0.
- Source maps named by patterns or sibling probes are NOT the original private authoring source; no proprietary React TypeScript/GLSL server-side source claimed. Owner fixture map is separate and valid.
- Two bounded full /work jsdj attempts timed out; we closed via verifiable HTML fallback and prior X16 CDP data, not by claiming 10/10 jsdj PASS.

## Reproducibility and durable project state
- Exact local X18 install and localhost fixtures in 02-reviewed-derived/X18-PREFLIGHT/. Main route metadata, final acceptance, static plugin output, sanitized JSON+CSV and this handoff in 02-reviewed-derived/X18-CURRENT/.
- Full vendor responses and owner runtime cache in 01-private-captures/X18/ and 01-private-captures/X18-FOCUSED-RETRY/. These stay outside public GitHub.
- Tools and scripts: X18-Install-Verify-jsdj.ps1, X18-Localhost-Fixture-Preflight.mjs, X18-Bounded-FirstParty-Main-Scan.mjs plus cache patch, X18-Offline-Jsdj-All-Verified-Bundles.mjs plus the 34-file extension patch, X18-Work-Public-HTML-Fallback.mjs, X18-Verify-New-FirstParty-JS-Bodies.mjs, X18-Finalize-Independent-Acceptance.mjs.

## Acceptance gates
- sourceAuthorityX16: PASS
- jsdjInstalledPinned: PASS
- ownerFixtureRun: PASS
- tenRoutesAttempted: PASS
- nineMainOrFocusedRoutesPass: PASS
- workHTMLFallback: PASS
- allNewJSOriginalSHA: PASS
- offlineAllVerifiedJs: PASS
- sourceMapEvidenceBounded: PASS
- allRawFilesPrivate: PASS
- hostScopeAndEmergencyMemory: PASS

**Final decision:** COMPLETE_SCOPE_QUALIFIED_WITH_KNOWN_WORK_TIMEOUT. No X19 execution; X19 is next when requested.
