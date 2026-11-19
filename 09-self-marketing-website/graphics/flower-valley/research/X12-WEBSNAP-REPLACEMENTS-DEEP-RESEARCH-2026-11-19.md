# DJMRN — X12: Deep research on WebSnap replacement, SPA interaction graph and hybrid UX evidence

**As-of:** 2026-11-19 (Europe/Berlin). **Scope:** DJMRN Freelance Operations → 09-self-marketing-website → graphics/flower-valley → X12/E1.  
**Document type:** Evidence-based TECHNICAL RESEARCH / candidate selection and acceptance criteria, **not a runtime progress log**, not a new architectural authority, not permission to install software, click live accounts, upload data, spend money or publish extracted third-party content.  
**Canonical progress:** [PROJECT-LOG.md](../../../PROJECT-LOG.md). **Procedure:** [EXTRACTION-RUNBOOK.md](../EXTRACTION-RUNBOOK.md). **Tool catalog:** [TOOLING-DOWNLOAD-INSTALL-CATALOG.md](../../../design/home/TOOLING-DOWNLOAD-INSTALL-CATALOG.md).  
**Owner priority clarification:** X12 interaction discovery is HIGH-VALUE for hybrid, reusable, client-facing web-app and complex website workflows; impact on the original flower-background *WebGL-only* prototype alone is narrower. **X13 is RETAINED/PENDING and must not be skipped. X11 is reopened for priority review ahead of X12 deployment.**

## 1. Real use case, problem and exact requested outputs

The original X12 candidate was `uirip/websnap`: a documented Playwright/TypeScript package claiming BFS/ARIA state-tree exploration, benign action simulation, click path replay, SHA/state dedup and cycle protection, network response capture, offline HTML per state with CSS/font/image URL rewriting and JSON/state visualization.

Separate **X12/E1 contractual task** from the *broader WebSnap advertised package*:

- **P0 — mandatory X12 interaction evidence:** discover controls automatically from ARIA/DOM (not just links), modal/tab/toggle/menu and same-URL SPA views, record node identity and state hashes, record observed action edges, support bounded replay/backtracking and dedup; distinguish benign vs risky actions; output an auditable JSON graph with errors, capture provenance, coverage, and truncation reasons; start on an OWN harmless localhost fixture with no submit/login/upload and no unauthorized public-site click exploration.
- **P1 — user-relevant hybrid UX evidence:** pointer/scroll/hover/focus/keyboard/touch changes, DOM/class/style and screenshot differences, interaction timing/animation; on canvas/WebGL pages, DOM-only state hashes are insufficient: use actual browser input/frame evidence. This remains an explicitly separate measurement rather than claiming a state-graph tool recovers GPU geometry, shaders or actual camera poses.
- **P2 — extra WebSnap promised archival parity, NOT automatic X12 PASS criterion:** response/body capture, CSS url/@import/font rewrites, offline HTML *per interaction state*, effective replay with network disconnected. Requires distinct tests and potentially existing WebScrapBook/SingleFile. No candidate is known to provide all P0+P1+P2 ready-made, reliable and low-memory on this Windows PC.
- **Safety:** never treat descriptions of 'safe clicks' as authorization to click unknown actions on an authenticated live session. GET can have state effects; script-assisted .click() may bypass visibility/occlusion. Use local fixture and explicit allowlist, dedicated browser profile, localhost only, zero paid providers.

## 2. Original WebSnap availability: verified blocker

Official source https://github.com/uirip/websnap and its REST `contents`, `branches`, `releases` and `commits` checks returned only `README.md`, one `main` branch, no built/released source or usable CLI / `package.json`. `@uirip/websnap` npm request returned HTTP 404. The unscoped npm `websnap@1.1.2` is an unrelated, legacy PhantomJS/webshot screenshot package (not the advertised SPA explorer). Do NOT install it. Installing pnpm, changing Node, building a Docker image or running an old package cannot recover unpublished official source. The absence of a discoverable public package is **evidence of not publicly verifiable**, not a claim about private unpublished source.

Official claim text: https://github.com/uirip/websnap/blob/main/README.md . Availability findings were independently checked with npm from DJMRN laptop in the preceding X12 preflight.

## 3. Existing tools in DJMRN and what is actually tested

Canonical laptop/program inventory: [tool catalog](../../../design/home/TOOLING-DOWNLOAD-INSTALL-CATALOG.md), current as previously verified, not assumed running now.

- Windows 11 laptop with 8 GB physical RAM; Windows-visible RAM `6020 MiB due to shared graphics / reservation; latest checked free RAM `1701 MiB. This varies with process load.
- Installed `Node.js v24.22.1`, `npm.cmd 11.19.1`, `Python 3.14.7`, `uv`, `Chrome 157.0.8103.79`, `Playwright for Node 1.65.1` locally in `DJMRN-Website-Toolkit/03-WebGL/WebGL-Toolchain/node_modules`. `pnpm`, `pinchtab`, `pwg`, `java`, `mvn` were not on PATH during prior checks. Dedicated Playwright-managed Chromium download was previously blocked by HTTP 403; installed Chrome executable works through Playwright.
- Playwright/Chrome bounded OWN localhost fixture **actually PASSED** (previous X12 run): **7 distinct states, 16 edges, 12 changed transitions, zero errors/unsafe actions**, lowest observed free Windows RAM **1443 MiB**; script `x12-owned-fixture-state-graph.cjs` and private JSON are on laptop. This validates a deliberately constrained authored crawler, **not a generic site-wide autonomous explorer and not WebSnap deployment**.
- WebScrapBook X08 passed independent HTML/HTZ offline snapshot, but no whole-app click-state graph; SingleFile X07 passed HTML/snapshot CLI; Browsertrix X10 produced actual WACZ 10,761,586 bytes with 53 CDXJ records, but full WebGL replay did not pass and its Docker/WSL startup on X11 hit very low-RAM guards.
- SiteOne CLI/GUI, WebScoop, decant, Chrome DevTools/CDP, browser extensions and Spector provide complementary URL/resource/DOM/GPU evidence, **not proven as the complete out-of-box P0 interaction graph**.

## 4. Candidate research: evidence, dependencies, distinct usefulness and limits

### A. PinchTab WebGraph + PinchTab (X12 SELECTED FOR ACCEPTANCE, NOT INSTALLED)

**Sources:** [WebGraph repo](https://github.com/egouilliard/pinchtab-webgraph), [complete core](https://github.com/egouilliard/pinchtab-webgraph/blob/main/pinchtab_webgraph/interaction_crawl.py), [pyproject](https://github.com/egouilliard/pinchtab-webgraph/blob/main/pyproject.toml), [PinchTab](https://github.com/pinchtab/pinchtab), [Security guide](https://github.com/pinchtab/pinchtab/blob/main/docs/guides/security.md), [official Windows release v0.15.2](https://github.com/pinchtab/pinchtab/releases/tag/v0.15.2).

- Verified source code, `interaction_crawl.py`, actual test files, independent CLI and JSON graph; same-URL shell detection; DOM/ARIA controls including buttons, tabs, menus, data collections and form specs; screen identity/dedup, path replay, same-origin default, checkpointing/partial outputs; no LLM needed for base CLI.
- Python package `pinchtab-webgraph==0.1.0` declares `requires-python >=3.10`, no required Python runtime pip dependencies for base CLI; optional UI/chat/MCP bring substantial dependencies and **must not be installed in X12 first pass**. Its CLI does not directly control Playwright: requires a separate `pinchtab` executable running a bridge/server. Running a single isolated bridge, not an auto-start daemon, is preferable on Windows.
- PinchTab `v0.15.2` downloadable official `pinchtab-windows-amd64.exe` **29,242,368 bytes**, released **2026-08-26**, with `checksums.txt`. MIT source. Main repo explicitly states Windows support is **best-effort**, with primary operator testing on macOS/Linux; use `pinchtab server` or `pinchtab bridge` rather than daemon on Windows. Verify downloaded checksum against release.
- **Critical compatibility/security issue:** the WebGraph core calls PinchTab `eval` to read structured DOM/perform certain clicks; current PinchTab secure default `security.allowEvaluate=false`. Enabling JavaScript evaluate is a capability expansion; for first trial only isolated, ephemeral localhost-only configuration/profile with no personal browser accounts, no exposure to LAN/internet, explicit enable/disable and rollback. Avoid setting unsafe global defaults. Some programmatic `element.click()` calls are not guaranteed benign on arbitrary pages.
- API/bridge compatibility between these exact revisions, Python 3.14.7 compatibility, free-RAM peak and end-to-end Windows use: **UNKNOWN until acceptance**. Some repository author benchmarks describe long crawls/wedged bridges and eventual state dedupe improvements; they are not laptop-specific performance guarantees.
- Does **not** by itself guarantee P2 offline HTML/CSS/font/image rewriting and no network replay. Use existing archive tool separately only if P2 is required.
- GitHub metadata observed 2026-11-19: WebGraph 5 stars / 1 fork, last push 2026-10-15; PinchTab 10,594 stars / 789 forks, last push 2026-11-10. Popularity is not a reliability score.

### B. FlowState / wsm-browser-agent (FALLBACK)

**Sources:** https://github.com/AnujanKopu/wsm-browser-agent ; [Python deps](https://github.com/AnujanKopu/wsm-browser-agent/blob/main/pyproject.toml); [browser session source](https://github.com/AnujanKopu/wsm-browser-agent/blob/main/engine/browser/session.py).

- Real Python backend, CLI `python -m engine explore URL`, Playwright-driven automatic state discovery, DOM skeleton/visible text hashes and screenshot dHash, page/modal/auth/paywall states, per-node screenshot/optional DOM, replay paths, action/edge JSON, SQLite persistence, UI graph, conservative risky-action deny; README reports **134 backend tests**; test files confirmed to exist, but test results on owner machine **NOT RUN**.
- Python >=3.11. `pyproject.toml` pins **Python Playwright 1.60.0** and about 11 direct runtime package entries (Pydantic, SQLAlchemy+aiosqlite, Pillow, FastAPI, etc.). JS Playwright 1.65.1 currently installed does not satisfy the **Python package** requirement. Use `uv` in an isolated environment, NOT global Python changes.
- Its current `engine/browser/session.py` uses `self._playwright.chromium.launch(headless=...)`; there is no supplied `channel='chrome'` or `executable_path`. Managed browser downloads previously failed HTTP 403 in user's network context. Reuse of existing Chrome would need a **small source patch/configurable launch executable** plus regression tests, not automatic equivalence.
- Local self-host is possible, no required paid model/API in deterministic base; external model layer WIP/optional. Default budget (`250 states, 1000 actions, depth 8, 1800 seconds) is **too high for first run on a RAM-restricted laptop**; set 5–10 states, 10–20 actions, depth 1–2, <=60 sec, one browser.
- GitHub observed 2026-11-19: 0 stars, last push 2026-07-01, MIT, no verified packaged Release. Substantial actual source exists but maturity/maintenance unknown.

### C. Crawljax (REAL graph crawler but not first choice)

**Sources:** https://github.com/crawljax/crawljax ; [pom.xml](https://github.com/crawljax/crawljax/blob/master/pom.xml) ; [Releases](https://github.com/crawljax/crawljax/releases).

- Genuine purpose-built Ajax/SPA DOM state-flow graph research crawler, navigation/click state transitions and plugins. **Not a simple URL mirror**. Mature lineage (repo since 2012) and Apache-2.0 license.
- Project build specifies **Java 11**, **Maven >=3.5.0**, Selenium **4.9.0**, and devtools v112, vs owner's **Chrome 157**. Java and Maven not in PATH. Latest identified release `crawljax-5.2.3` (2023-06-01); repository latest push 2023-09-18 despite later metadata updates. Modern Chrome/driver compatibility and memory are unproven. May need Selenium/driver upgrades and changes to build; increased setup/heap/headless browser memory risk. **Do not add Java/Maven for X12 first pass**.
- GitHub observed: 560 stars, 223 forks (2026-11-19). This does not prove current-browser support.

### D. browser-whiskor (specialist OBSERVER, optional future pairing, not first-pass crawler)

**Sources:** https://github.com/torotoroTRPG/browser-whiskor ; [package.json](https://github.com/torotoroTRPG/browser-whiskor/blob/main/package.json).

- Chrome/Firefox extension + Node MCP/HTTP server; semantic state graph with React/Vue/framework component/store introspection where available; recorded states and replay path. Author explicitly recommends pairing with Playwright/Puppeteer for reliable driving; this is chiefly **perception/state management**, not drop-in generic WebSnap full autonomous mirroring.
- Node >=18 (present). v0.17.0 package. Requires extension permissions/isolated profile and server; README says an ONNX semantic model around **50 MB** is **downloaded on first start by default** (opt-out/config review before activation). External download/quota, extension permissions and RAM may be material. Avoid auto-install/enable or user-session inspection without owner approval.
- 1 GitHub star, last push 2026-08-31; MIT. Unproven on owner PC. Potential unique value for future hybrid framework-state analysis if P0 graph still misses app-specific internal state.

### E. Mirrorframe (motion/visual specialist, not entire site state crawler)

**Sources:** https://github.com/byte271/mirrorframe ; [package.json](https://github.com/byte271/mirrorframe/blob/main/package.json).

- Source `0.4.0` with Node >=18, Playwright `^1.61.1`, esbuild, pixelmatch, React, PNG. Captures computed styles, CSS/WAAPI transitions, pointer probes, scroll states, modal/toggle/tab state machines, interaction diffs, local image/font assets and visual checks. **Not guaranteed to find all site-wide navigation states**.
- Important for hybrid UX and pointer/scroll **DOM elements**. On `<canvas>`, README explicitly says it saves the currently painted frame as a **still image**, not live WebGL engine/shaders/3D dynamics.
- `package.json postinstall` executes `playwright install chromium`, which may trigger browser download and previously failed CDN/403. Do not run a default install blindly; staged package test with scripts disabled and explicit existing Chrome path must be validated before any install.
- GitHub 4 stars, latest push 2026-07-09, MIT, maintenance limited; visuals are not proof of fully interactive reproduction.

### F. ui-audit (narrow responsive state auditor)

**Source:** https://github.com/ItsAnhReal/ui-audit ; [pyproject.toml](https://github.com/ItsAnhReal/ui-audit/blob/main/pyproject.toml).
- Python >=3.11, `playwright>=1.45,<2`, supports Python 3.14 in package classifiers, accepts explicit browser path. Locates only certain safe disclosure states (ARIA expanded/haspopup, tabs, details and explicitly marked controls), across responsive widths; helps QA/hybrid delivery, **not a comprehensive general-purpose site state-machine crawler**. Small dependency footprint compared with FlowState but would overlap future QA stages.

### G. Playwright + Chrome (ALREADY INSTALLED; deterministic buildable no-new-runtime path)

**Sources:** https://playwright.dev/docs/api/class-browsercontext , https://playwright.dev/docs/api/class-page , https://playwright.dev/docs/trace-viewer .
- Real tested Chrome/Playwright engine (Node), bounded fixture graph passed. Has DOM/ARIA snapshot APIs, locator actions, event sampling, CDP, screenshots, HAR and trace, network request/response and saved page HTML.
- **Does not autonomously discover and safely graph all arbitrary app states out of the box**. Need generalized crawler logic: control selector/ARIA discovery, safety classifier, state fingerprint, BFS caps, bounded click/replay, visual/DOM comparison, rejection/unknown reporting, robust checkpoint and dedup. New logic is code project work, though **no new language/browser tool install** is needed.
- Best verified browser for RAM and cross-checking a specialist. Existing Chrome can be selected using an explicit path or Playwright Chrome channel; do not install another Chromium just to run X12.

### H. WebScrapBook / SingleFile / Browsertrix and WebScoop (complementary archives, NOT P0 replacements)

- Installed/tested X07/X08 SingleFile & WebScrapBook: HTML/HTZ resource archives, timestamps/hashes. Their archive export does not automatically yield a complete state transition graph for every SPA click.
- X10 Browsertrix: Docker-based WARC/WACZ, 53 network records captured, GLB matched X01; replay of live 3D failed QA timeout. Docker startup for X11 had severe host RAM guards; not appropriate first new X12 dependency.
- SiteOne/WebScoop are URL/resource/mirror observers and **not proven** to produce a comprehensive P0 control-click state graph.

## 5. Capability comparison (evidence classification, not invented %)

Legend: **Y** = implemented/documented in source, **P** = partial or requires configuration/code, **N** = not inherent, **U** = not independently demonstrated on owner Windows.

| Candidate | Auto SPA nodes/edges (P0) | Safe click/path/dup (P0) | DOM + screenshots (P1) | Pointer/scroll/focus motion (P1) | Complete offline per-state HTML/assets (P2) | Windows runtime owner test |
|---|---|---|---|---|---|---|
| PinchTab WebGraph + PinchTab | Y | Y; explicit action-risk guard needed | P; content graph/optional UI | P (not a full animation analyzer) | N/P via other tool | U |
| FlowState | Y | Y; action-deny + budget | Y | P | N | U |
| Crawljax | Y | Y with plugins/config | P | P | N | U |
| browser-whiskor | Y as documented, passive+explorer | P; driver pairing recommended | Y | P; observer | N | U |
| Mirrorframe | P, local DOM interaction classes | P | Y | Y for DOM/CSS, not live GPU | P for supported assets; canvas=still | U |
| ui-audit | P, disclosure-only | P | Y | P for responsive states | N | U |
| Playwright + Chrome | P; custom logic | P; custom logic | Y | Y with custom experiment | P; HAR/HTML but not full offline rewrite | **Y (bounded owner fixture)** |
| WebScrapBook / SingleFile | N | N | Y as snapshots | N | P/Y for supported static assets | **Y (X07/X08)** |
| Browsertrix | P automatic behaviors | P; not same graph schema | Y | P | WACZ but WebGL replay failed | **Y X10 archive, not X12 graph** |

A 'Y' on source capability **is not an operational PASS**; runtime cross-platform compatibility, safe results and RAM remain unverified unless specifically cited.

## 6. Hardware, resource and security feasibility for owner laptop

**Observed baseline (2026-11-19):** 8 GB physical RAM, `6,020 MiB visible Windows RAM, `1,701 MiB free during a read; these values vary. GPU AMD Vega 8 shares available resources. Docker Desktop/WSL on X11 caused host RAM to fall to emergency guard (96–70 MiB on 1536MB WSL experiment); reverted WSL configuration after stopping processes. **Do not equate package size with runtime RAM.**

Risk-ranked approach:
1. **Lowest incremental runtime cost:** existing Playwright + Chrome, owned fixture only; actual prior test min free 1,443 MiB. Needs deterministic general crawler code.
2. **Specialist candidate:** PinchTab + WebGraph native Windows, single browser/one tab, no Docker, base CLI only. 29.2 MB executable is **download size not RAM usage**. Python 3.14 bridge test + peak RAM unknown; stop if free host RAM approaches project guard.
3. **Fallback:** FlowState Python environment, isolated via uv; avoid bundled Playwright browser download until compatibility path with installed Chrome is tested. Default exploration caps far exceed safe first-test scenario.
4. **Last resort:** Crawljax Java + Selenium / ChromeDriver upgrades or Docker-backed Browsertrix; unnecessary new dependencies given already working Playwright and observed RAM crash guard.
5. **Not first-pass:** whiskor extension+MCP/model download, Mirrorframe browser postinstall, ui-audit, heavy hosted/commercial services unless distinctive evidence demanded.

**No paid consumption:** Listed core repo licenses are MIT/Apache-2.0 (Browsertrix AGPL-3.0, WebScrapBook MPL-2.0); running local open-source tools has no API billing as documented, but network/bandwidth and optional provider/model costs can be UNKNOWN. Never enable account providers, auto-credit/overages or extension access to authenticated personal browsing. **UNKNOWN cost means do not activate**.

Initial gate: isolated owner localhost fixture on `127.0.0.1`, no file:// navigation (PinchTab disables by default), isolated user-data-dir, no cookies/login, no public crawling, disabled submit/upload/download/macro, loopback-only token-protected control plane, do not reuse current personal Chrome, clean process shutdown, RAM sampled before/peak/after; rollback temporary configuration and remove test processes.

**Strict X12 acceptance:** independently detected *unknown-to-crawler* safe controls (tab, modal, toggle and same-URL changes), at least 3 unique states / multiple valid edges on owned fixture, consistent hashes/replay, zero harmful actions, positive explicit path to state, no corrupt graph or unbounded loops, deterministic JSON+timestamps+source refs, clear truncation causes; RAM headroom >= project guard at all points, complete teardown. Separate negative test on a local destructive fake button must be SKIPPED. Compare states and edges with existing Playwright test. Any P2 offline capture is a separately named and validated capability, not assumed.

## 7. Final decision, evidence strength, alternatives and stop rule

**Candidate selected, not operationally accepted:** **PinchTab WebGraph + official Windows PinchTab binary** is the closest specialist to X12 P0 with low *declared software* dependencies. Pair **with existing Playwright+Chrome** for independently verified visual/CDP/pointer/scroll evidence and to run separate local acceptance tests. If archival P2 needed, use already-installed **WebScrapBook / SingleFile** serially with source/time/state linkage; do not run all tools simultaneously on 8GB RAM.

If PinchTab's Windows bridge/evaluate-policy cannot be made secure, tested and reversible, choose **existing Playwright scripted generic crawler first**, then FlowState isolated Chrome launch patch if genuine capability gap persists. Crawljax not justified as initial install; browser-whiskor/Mirrorframe remain OPTIONAL specialized discoveries for future hybrid customer work, not a mandatory X12 chain. Do not install all candidates.

**Status:** RESEARCH/SELECTION COMPLETE, X12 replacement installation/compatibility and actual specialist crawl **NOT TESTED**; prior Playwright fixture evidence is still only a partial P0 proof. **Owner has requested return to X11 before X12 execution; X13 remains pending.**

## 8. Official evidence links / verification ledger

- Original X12 candidate: https://github.com/uirip/websnap
- PinchTab WebGraph complete source/docs/tests: https://github.com/egouilliard/pinchtab-webgraph ; https://github.com/egouilliard/pinchtab-webgraph/blob/main/pyproject.toml ; https://github.com/egouilliard/pinchtab-webgraph/blob/main/pinchtab_webgraph/interaction_crawl.py
- PinchTab Windows releases / safe defaults: https://github.com/pinchtab/pinchtab/releases/tag/v0.15.2 ; https://github.com/pinchtab/pinchtab/blob/main/docs/guides/security.md ; https://github.com/pinchtab/pinchtab/blob/main/README.md
- FlowState source/package/browser: https://github.com/AnujanKopu/wsm-browser-agent ; https://github.com/AnujanKopu/wsm-browser-agent/blob/main/pyproject.toml ; https://github.com/AnujanKopu/wsm-browser-agent/blob/main/engine/browser/session.py
- Crawljax/Maven/Java/Selenium: https://github.com/crawljax/crawljax ; https://github.com/crawljax/crawljax/blob/master/pom.xml ; https://github.com/crawljax/crawljax/releases
- browser-whiskor: https://github.com/torotoroTRPG/browser-whiskor ; https://github.com/torotoroTRPG/browser-whiskor/blob/main/package.json
- Mirrorframe: https://github.com/byte271/mirrorframe ; https://github.com/byte271/mirrorframe/blob/main/package.json
- ui-audit: https://github.com/ItsAnhReal/ui-audit ; https://github.com/ItsAnhReal/ui-audit/blob/main/pyproject.toml
- Existing browser framework: https://playwright.dev/docs/api/class-browsercontext ; https://playwright.dev/docs/trace-viewer
- Project experiments: [X10 real archive evidence](../evidence/X10-browsertrix-operational-wacz-and-qa-reconciliation.json) ; [X11 runtime blocker](../evidence/X11-archivebox-preflight-and-runtime-blocker.json) ; [X12 earlier functional proof and current correction](../../../PROJECT-LOG.md)

*Evidence taxonomy: GitHub repository code, package and release metadata = independently verified source facts; maintainer README feature claims not locally acceptance-tested = DOCUMENTED_ONLY; previous owner laptop output with checksum/test = TESTED_LOCAL; any RAM/performance prediction for new tool = UNKNOWN until measured.*
