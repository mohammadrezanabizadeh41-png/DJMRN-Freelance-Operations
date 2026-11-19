# DJMRN — X17 Source Map Explorer main analysis

Date: 2026-11-19. X17 status: COMPLETE_SCOPE_QUALIFIED. X18 NEXT, not started.

## Validity
Pinned Source Map Explorer 2.5.3 Apache-2.0, isolated npm runtime, preflight compatibility gate. Original strict column-boundary checks fail on owner/upstream fixture; documented --no-border-checks used explicitly only on owner fixture.
Five operating modes: json PASS (728 B); html PASS (15590 B); tsv PASS (108 B); gzip PASS (650 B); onlyMapped PASS (647 B). Own fixture maps source modules, not reference website modules.

## Original client JS, all byte-verified files
Known first-party JS URL paths: 32. Original-body verified SHA256: 31. No verified standalone body: https://www.gladeye.com/gtm.q-c92099c696a43b1f.js.
Aggregate original bytes: 1714982. Per-file local gzip sum: 507038. Per-file local Brotli sum: 482422. Not HTTP transfer size.
Byte roles: {"NEXT_CHUNK":{"count":23,"raw":1537319,"gzip":448784,"brotli":426516},"NEXT_APP_ROUTE_CHUNK":{"count":8,"raw":177663,"gzip":58254,"brotli":55906}}. File-by-file evidence in X17-bundle-size-and-hash-inventory.json and .csv. Original JS bytes private on laptop.
Top bundles: https://www.gladeye.com/_next/static/chunks/b536a0f1-51636bd4ac051d8f.js 549571 bytes; https://www.gladeye.com/_next/static/chunks/fd9d1056-76aadce26f555392.js 160712 bytes; https://www.gladeye.com/_next/static/chunks/450-96e2a31dde902aa5.js 141609 bytes; https://www.gladeye.com/_next/static/chunks/596-40a806be0d0d2bb3.js 111113 bytes; https://www.gladeye.com/_next/static/chunks/123-3b7f3df3cc5866d7.js 102017 bytes; https://www.gladeye.com/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js 91381 bytes; https://www.gladeye.com/_next/static/chunks/app/page-4c279de0997d388f.js 82741 bytes; https://www.gladeye.com/_next/static/chunks/419-c9aec889e32d9e7b.js 81048 bytes; https://www.gladeye.com/_next/static/chunks/4b5b508e-6dceef0b9f02cb18.js 80490 bytes; https://www.gladeye.com/_next/static/chunks/773-a7b43274c5faf5a0.js 40996 bytes.

## Runtime cross-check and missing source maps
CDP first-party initiator relations in X16: 130. Request-initiation graph is not original authored module import graph.
No source map advertised across X16 ten-route scoped study: 0. No extra guessed map requests, no unpublished source/backend recovery.
Original authored JS component tree: UNKNOWN/UNAVAILABLE. No original-source treemap fabricated.
Own fixture HTML/JSON/TSV/gzip/mapped-only outputs and flags are preserved in X17-CURRENT.

## Acceptance and next step
verifiedOriginalSHA: PASS; allFiveCliModes: PASS; X16NetworkGraph: PASS; X16AdvertisedMapsAbsent: PASS; ramStopNotTriggered: PASS.
Scope-qualified means operational fixture mapping and exhaustive local SHA-backed first-party JS bundle-size audit; does not mean full reference-source or scene extraction.
Next X18 jsdj is distinct; NOT STARTED.

Official docs: https://github.com/danvk/source-map-explorer#readme
