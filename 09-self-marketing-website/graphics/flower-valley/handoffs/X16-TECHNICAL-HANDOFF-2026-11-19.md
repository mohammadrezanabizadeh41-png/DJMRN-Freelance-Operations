# DJMRN X16 — Client-side JS, CDP Sources and Source Map Study

Date: 2026-11-19. Scope: E1/E5 X16. Result: COMPLETE_SCOPE_QUALIFIED. Next: X17 NOT STARTED.

## Scope and authority
Procedure: graphics/flower-valley/EXTRACTION-RUNBOOK.md. Progress authority: PROJECT-LOG.md.
Original captures stay private on owner Windows; this handoff includes derived technical metadata only.
Chrome for Testing 157, installed Puppeteer, Node 24.22.1, 10 anonymous public routes, zero paid tools, no UAC/privilege change.
Official references: https://chromedevtools.github.io/devtools-protocol/tot/Debugger/ and https://chromedevtools.github.io/devtools-protocol/tot/Network/ and https://developer.chrome.com/docs/devtools/developer-resources/

## Offline original-byte verification
X15 observed JavaScript paths: 31. Byte/SHA-verified existing: 30. One old body gap: https://www.gladeye.com/gtm.q-c92099c696a43b1f.js.
X16 acquired 1 new first-party route chunk stored PRIVATE: https://www.gladeye.com/_next/static/chunks/app/work/%5Bwork%5D/page-af89f4191159d0b5.js SHA256=7a47436417afa2e2da87a0ab8ae5d229784ea973f0e305a8753febe3e499cb5d bytes=16851.
X16 union: 32 known unique JS paths; 31 verified original HTTP body files, 1 not available as a verified standalone file.
X15 missing body is not a SHA corruption or proof of absent source.
Path-role classification: {"NEXT_CHUNK":23,"NEXT_APP_ROUTE_CHUNK":7,"NEXT_CLIENT_JS":1,"UNKNOWN":1}. Per-resource CSV: X16-per-js-source-map-status.csv.

## Browser and runtime graph
Ten of ten public navigations HTTP 200 in 58 seconds: /, /work, /about, /careers, /contact, /ventures, /work/hypercinema, /work/into-the-amazon, /work/the-dj-and-the-war-crimes, /work/where-opportunity-takes-root.
CDP Debugger.scriptParsed events: 444; Network first-party response events: 490; JS request events: 235; unique live JS paths: 30.
Distinct first-party source-to-request initiator edges: 130; by kind: {"other":20,"parser":73,"script":37}. These are network initiation relationships, NOT an exact authored module graph.
First-party subresource non-200: [{"url":"https://www.gladeye.com/_next/image","status":404},{"url":"https://www.gladeye.com/_next/image","status":502}]. No recorded first-party loadingFailed events or collection errors.
Minimum Windows RAM free 515 MiB; emergency threshold 100 MiB never reached. Chrome process closed by runner.
Static delivered bundle hints: {"webpackChunk_N_E":29,"nextRuntime":1,"react":27,"scrollListener":6,"animationLoop":5,"webpackRequire":3,"glsl":3,"threeEngine":1}. They are heuristic string matches; not source ownership proof.

## Source maps and recoverability
Offline JS sourceMappingURL comments (X15 + X16 stored bodies): 0.
Debugger sourceMapURL in inspected scripts: 0. SourceMap or X-SourceMap headers in inspected JS responses: 0.
Advertised first-party map candidates: 0. No map request was made for a guessed unadvertised name. This does NOT demonstrate no map exists outside the observed scope.
No original private backend modules, original authoring repository, unpublished maps, precise WebGL frames or hidden server code were recovered.

## Original recreation implications and X17 readiness
Observed Next.js-style static and app chunk paths, a webpack chunk runtime initiator, and previously fingerprinted Three.js r154 / Next.js 13.4.19 (X14 evidence; version signature still requires independent validation).
Rebuild DJMRN original site in our own code. Do not redistribute target vendor JS or treat minified public bundles as permissively licensed.
X17 Source Map Explorer can validate a locally owned synthetic map fixture first; no target advertised source map has been verified available. Preserve exact absent-map limitation.

## Local evidence files
X16-DevTools-Sources-CDP-Inspector.cjs: authored executable inspector.
X16-offline-byte-verified-js-inventory.json: SHA, roles, sourceMappingURL, static heuristics.
X16-script-parsed-and-network.json and X16-script-init-network-graph.json: CDP evidence; graph CSV.
X16-source-map-reachability.json and X16-per-js-source-map-status.csv: source-map inventory and per-script status.
X16-new-js-response-bodies-local-only.json: SHA manifest; original bytes privately stored in 01-private-captures/X16.
X16-live-summary.json: route status, script events, RAM evidence.
X16-independent-acceptance.json: final acceptance and limitations.

Status: COMPLETE_SCOPE_QUALIFIED. X17 next; not executed.

