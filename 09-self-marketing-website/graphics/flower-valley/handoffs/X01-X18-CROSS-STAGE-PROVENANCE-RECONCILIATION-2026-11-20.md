# DJMRN X01-X18 — Cross-stage resource identity and evidence delta

**Verified scope:** COMPLETE_SCOPE_QUALIFIED. **Current sequential stage:** X18. X19 is next, not executed.

## Grounded totals
- X01-X15 local capture files rehashed: 2247/2247 (size 331355219 bytes). Unique file SHA-256 values: 1409. Duplicate physical copies: 838. Tool source, archive, fixtures and snapshots INCLUDED in this physical count, not unique website resources.
- X15 canonical URL inventory: 72 paths (66 network-observed, 6 offline-derived-only). Original HTTP response-body paths: 63, independently validated variants: 64.
- X16 verified first-seen HTTP original JS: 1. X18 verified first-seen original JS: 3. Total known path union: 76, network-confirmed 70, offline-derived-only 6. This is scoped path identity, NOT full website completeness.
- Chronological first-observed paths: X01:46, X03:2, X05:6, X09:4, X11:1, X14:7, X15:6, X16:1, X18:3.
- From the 31 SHA-verified X17 JS bodies, 25 were already EXACT original URL+SHA captures in X01.

## X18 three-body true novelty relative to X01-X15
- https://www.gladeye.com/_next/static/chunks/pages/_error-c92d5c4bb2b49926.js — 247 bytes; SHA256 f14770f5d6c8bdfca9b141ecf8dc9fe91349bd42161ae146646ab4e7305429a2; previously observed URL: false; SHA in prior 2247 physical files: 0; relation: NEW_URL_AND_NEW_BYTES.
- https://www.gladeye.com/_next/static/p2bqUOtISlsUD-1MiVjOb/_buildManifest.js — 224 bytes; SHA256 ecfebbfba964a258fc10a7c6d854248d7246c17c734a2d7abb17a262e6872aba; previously observed URL: false; SHA in prior 2247 physical files: 0; relation: NEW_URL_AND_NEW_BYTES.
- https://www.gladeye.com/_next/static/p2bqUOtISlsUD-1MiVjOb/_ssgManifest.js — 80 bytes; SHA256 678f6ce2cb80b1fe72fc67e7412be6e2ab6ada083111b64f7c40d35e3cba5e00; previously observed URL: false; SHA in prior 2247 physical files: 0; relation: NEW_URL_AND_NEW_BYTES.

## Identity policy: do not inflate extraction
- Same URL path + same original-response SHA256 = old content, independently corroborated. A new tool observing it does not create a new website file.
- Same URL path + different original-response SHA256 = new byte version/response body (not necessarily new URL); preserve both SHA variants.
- New URL + old original-body SHA256 = new routing reference to previously known bytes; do not double-count as new content.
- New URL + new SHA256 absent in earlier verified capture index = new evidenced client-delivered asset within our scope.
- Metadata-only HAR, scriptParsed, inferred plugin URL, rewritten local mirror, WARC container digest and owner-created test fixtures cannot masquerade as original response bodies.
- X15 path normalization removes query parameters. Image optimizer query variants need separate query-aware tracking before declaring equality.

## What each stage contributes in the same evidence system
- **X01**: original first-party JS, CSS, camera GLB, flower/terrain/ray textures and WebGL interface observations.
- **X02**: CDP network and script initiator timing to complement captured body bytes.
- **X03**: SiteOne independent static/browser capture, polyfill JS and font otherwise outside original X01 set.
- **X04**: integrity and backup of previously captured files, not 341 newly unique website assets.
- **X05**: Decant DOM/tokens and screenshots; six derived paths including local mirrored GTM, not HTTP-original responses.
- **X06**: WebScoop independent capture and exact previously observed JS body repetition.
- **X07**: SingleFile page snapshots, script preservation and offline WebGL limits.
- **X08**: WebScrapBook archive; downloaded source-package files do not represent new vendor site assets.
- **X09**: HTTrack mirror, original URL hints and image optimizer variants; rewritten local bodies cannot be presumed original.
- **X10**: Browsertrix WACZ response indexing; archive SHA and individual HTTP body SHA are different identities.
- **X11**: ArchiveBox WARC, HTTP records and temporal state observations.
- **X12**: PinchTab DOM/SPA state graph, temporal scene parameter interaction.
- **X13**: HAR/CDP timing and request waterfall, mostly metadata not raw bodies.
- **X14**: Wappalyzer tech signature hints and verified selected original body captures.
- **X15**: canonical cross-stage X01-X14 original URL/byte integrity: 72 paths, 66 network, 6 derived, 63 original-body URLs.
- **X16**: DevTools 10-route source inspection, 130 initiator edges, 1 new original first-party JS response.
- **X17**: original JS sizes and owned fixture Source Map Explorer; target original maps not available.
- **X18**: live jsdj plugin scan and offline all-34 JS audit, 3 new original small Next.js responses; /work full jsdj timeout.

## Consequences for scene and website design
- Preserve X01 first-party GLB camera animation, flower texture atlases, audio, terrain/rays and shader interface evidence as original baseline. X02/X11/X12/X13 CDP, temporal and DOM state evidence adds complementary interactive understanding, not additional unique geometry files.
- X14 technical fingerprints, X16 request-initiator graph and X18 Next.js manifests add framework/runtime mapping. The three X18 verified new JS files are tiny framework/manifest documents, NOT demonstrated new flower/terrain/GLB assets.
- X05 gtm.q mirror file exists as independently hashed offline artifact, but X15 path remains OFFLINE_DERIVED_PATH_ONLY and original source HTTP body provenance UNKNOWN; not a missing local file nor a verified original response.
- X18 unserved Draco/manifest-relative candidate addresses are hypotheses. X18 /work full recursive jsdj timeout remains a documented gap, partially complemented by a separate HTML GET and earlier CDP visit.
- No original authoring TypeScript/GLSL or backend/source maps are recovered. Avoid substituting tool capability for asset discovery.

## Files and traceability
- X01-X18-RESOURCE-URL-SHA256-PROVENANCE.json: each path first seen, stage sightings, original-body SHA variants, path classification and evidence tiers.
- X01-X18-RESOURCE-FIRST-SEEN-AND-SHA.csv: compact human-readable exact-first-seen and original hash audit.
- X01-X18-INDEPENDENT-CROSSWALK-ACCEPTANCE.json: physical rehash count, scope denominator, 12 acceptance checks and failures.
- Reproducer is owner-authored X01-X18-Canonical-Dedupe-And-Hash-Crosswalk.mjs in existing project scripts. It performs read-only rehash of existing local source bodies and metadata, not website recrawling.
- Original third-party bytes remain PRIVATE in the owner Windows archive. Only these metadata and owner-authored tools may be published to the GitHub project.

Acceptance gates: x15All2247PhysicalBytesSHAStillValid=true; x15OriginalHTTPBodiesStillValid=true; x15OriginalPaths63=true; x15PathScope72=true; x15Network66=true; x15DerivedOnly6=true; x16NewOriginalPathOne=true; x18NewOriginalPathsThree=true; x17ReusedExactX01SourceBodies25=true; stageChronologyX16BeforeX17=true; x18All34VerifiedBodiesInspected=true; union76PathIdentifiers=true; noOverstatementOfSiteCompleteness=true.