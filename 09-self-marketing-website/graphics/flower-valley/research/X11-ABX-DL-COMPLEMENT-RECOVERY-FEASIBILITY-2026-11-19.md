# DJMRN X11 — Can Blocked abx-dl / Original ArchiveBox Complement Working ArchiveBox JS?

**Date:** 2026-11-19  
**Class:** RESEARCH / feasibility / **NOT an install authorization or runtime PASS**  
**Current canonical X11 tool:** **ArchiveBox JS 0.1.0** (official Chrome MV3/browser capture), proven locally on Windows, retained unchanged.  
**Other blocked siblings:** (1) **abx-dl 1.13.369 + abx-plugins 1.13.776** — Python CLI blocked on native Windows, (2) **original ArchiveBox 0.9.77** — Docker/WSL RAM guard and native POSIX blocker. This analysis answers *both* so the wording "blocked one" cannot cause the wrong ArchiveBox to be activated.  
**Handoff:** [X11 JS complete setup](../handoffs/X11-ARCHIVEBOX-JS-COMPLETE-SETUP-AND-READINESS-2026-11-19.md).  
**Owner goal:** Potential additional data for 3D/2D/hybrid websites and future client captures, while preserving working JS tool, free-first, avoiding duplicated code/downloads and a second uncontrolled browser.

## 1. Executive outcome

**YES, abx-dl has potentially complementary extractor functionality, but NO, the already installed native-Windows CLI does NOT work.** It can plausibly run under a **separate genuine Linux userspace (a new lightweight WSL distro without Docker)**, but that route has not been installed or acceptance-tested, and concurrent execution with ArchiveBox JS/Chrome is a **RAM risk**. The *original full ArchiveBox server* is even less suitable on this 8GB/low-free-RAM laptop and should remain blocked.

**Highest-fit decision now:** **ArchiveBox JS remains the SINGLE X11 primary runtime.** Prefer extending it with **selectively valuable post-processing/hook capabilities that can run serially or in existing Playwright/Node/Python**; full Linux abx-dl is **CONDITIONAL CANDIDATE only** if one unique data output demonstrably exceeds existing X01–X10/X11 capabilities. Do not install all 96 Python plugins or run two Chrome browsers simultaneously. Do not claim direct plugin compatibility between Python abx-plugins and JS's bundled plugin system.

## 2. What actually failed and how it was rechecked

Owner-laptop read-only checks completed 2026-11-19:

- WSL 3.0.5.0, kernel 6.18.58.1-1. **Only registered distro is \`docker-desktop\`, stopped, WSL2**; no separately usable Ubuntu/Debian Linux distro currently installed. Default \`.wslconfig\` (read, NOT changed): \`[wsl2] memory=2048MB; processors=2; swap=4GB; [experimental] autoMemoryReclaim=dropCache\`. This is a **global WSL2 VM limit**, including Docker's WSL VM; changing it would affect other WSL workloads.
- Windows visible RAM **6,020 MiB** on 8GB physical hardware (Vega iGPU shared memory), instantaneously free **1,461–1,504 MiB** during these checks; ~97.92GB C: free. **Do not derive predicted peak use from these readings.**
- Isolated native Python 3.14.7 venv installed exactly \`abx-dl=1.13.369\`, \`abx-plugins=1.13.776\`, \`abxpkg=1.13.101\`, \`abxbus=2.5.91\`. Running \`abx-dl --version\` again **FAILED exit code 1**, \`ModuleNotFoundError: No module named 'pwd'\` while importing \`abxpkg/binprovider.py\`. Confirmed official source imports \`fcntl\`, uses \`os.geteuid()/os.getuid()/os.chown()/os.setgid()\`, and expects Unix ownership. Hence \`pip install pwd\`, a fake shim, \`--no-install\`, PATH changes, and more Windows dependencies do NOT constitute a verified fix; the CLI fails before argument handling.
- **Narrow/import-only secondary probe passed:** \`python -c "import abx_plugins.plugins.base.utils"\`, \`python -c "import abx_plugins.plugins.search_backend_sqlite.search"\` and \`python -c "import abxbus"\` each exited **0** in installed Windows venv. This proves some component modules import independently, NOT that hook scripts have run or can parse JS WACZ automatically.
- Original ArchiveBox server still explicitly described upstream as **not officially supported natively on Windows**, needing Linux/macOS/Docker/WSL or Cygwin; official minimum 1GB RAM, 2GB+ recommended for full ArchiveBox (do not transfer this exact requirement to abx-dl). A prior Docker/WSL attempt with host memory dropping to ~70–96MiB free was aborted, retaining owner guard.
- The current fully built **ArchiveBox JS 0.1.0** and dedicated official Chrome for Testing 157 remain operational for **OWN fixture** WARC/WACZ, rendered DOM, screenshots, offline replay and repeatable content hashes. No new live target capture was executed during this feasibility review.

### Official source references

- [abx-dl README + standalone CLI, selected plugins, \`--no-install\`, \`MEMORY_LIMIT\`/ \`MEMORY_MIN_FREE\`](https://github.com/ArchiveBox/abx-dl/blob/main/README.md): plugin runner defaults to **all plugins with auto-install**, which is **not** appropriate in an unconditional first run. It supports targeted \`--plugins=...\` and \`--no-install\` after CLI can start under compatible OS.
- [abx-dl pinned pyproject requirements](https://github.com/ArchiveBox/abx-dl/blob/main/pyproject.toml)
- [abxpkg POSIX source](https://github.com/ArchiveBox/abxpkg/blob/main/abxpkg/binprovider.py)
- [abx-plugins official source](https://github.com/ArchiveBox/abx-plugins)
- [ArchiveBox JS separate browser-oriented plugin runtime](https://github.com/ArchiveBox/archivebox-js/blob/main/abx-plugins/README.md)
- [ArchiveBox server installation](https://docs.archivebox.io/dev/Install.html)
- [Microsoft WSL advanced settings](https://learn.microsoft.com/en-us/windows/wsl/wsl-config)
- [Microsoft WSL1 versus WSL2 compatibility/memory](https://learn.microsoft.com/en-us/windows/wsl/compare-versions)

## 3. Actual Python-vs-JS plugin overlap, not invented independent-tool counts

Both official upstream plugin source directories enumerated and compared from GitHub at research time:

| Item | Count |
|---|---:|
| Python \`abx-plugins\` source plugin folders | **96** |
| ArchiveBox JS bundled/source plugin folders | **48** |
| Identical directory names in both repositories | **41** |
| Present only in Python directory names | **55** |
| Present only in JS directory names | **7** |

**Important:** 55 Python-only folders include internal backends, importers, cloud/sensitive-account integrations, AI/provider-dependent skills, and multi-stage pipelines. They do **not** mean 55 new, locally testable, free, independently useful extractors. Python-only examples:
\`archivedotorg,archiveimport,autosummary,autotag,base,box,browserharness,caddl,calendar,canva,chrome_mhtml,chrome_screencast,claudechrome,claudecode,claudecodecleanup,claudecodeextract,drawio,excalidraw,figma,googledrive,iclouddrive,importer_readwise,importer_rss,importer_search,importer_sheets,importers_browser,iwork,mega,microsoft365,miro,mobilesize,nextcloud,notion,onedrive,opencode,opendataloader,opentimestamps,packageregistry,playwright,podcast_archiver,protondocs,protondrive,puppeteer,search_backend_ripgrep,search_backend_sonic,search_backend_sqlite,sourcemaps,stagehand,tldraw,tlsnotary,trafilatura,twocaptcha,ublock,wetransfer,wget\`.
JS-only names: \`browsertrix_behaviors,gdrive,manifest,networktiming,robots,rss,search_contents\`.
Shared names include \`chrome,dom,screenshot,consolelog,headers,responses,hashes,singlefile,pdf,seo,gallerydl,forumdl,papersdl,git,media,ytdlp\`. Do NOT install duplicates to double-count outputs.

## 4. Source-inspected uniquely relevant candidates and additional prerequisites

All rows here are **SOURCE DOCUMENTED / NOT WINDOWS END-TO-END ACCEPTED**. Not every hook creates a new independent network fact. Consult actual files before using.

| Python-only plugin | Actual source behavior | Extra dependency/constraint | Priority for Night Flower Valley |
|---|---|---|---|
| [sourcemaps](https://github.com/ArchiveBox/abx-plugins/tree/main/abx_plugins/plugins/sourcemaps) | Python hook (~7.8kB) finds \`sourceMappingURL\` from recorded JavaScript bodies / response plugin, fetches/preserves published Source Maps | Requires recorded responses; network access to map URL; no guarantee target publishes source maps; Python script relies on abx-plugins config/emitter and \`rich-click\`. **High conditional** if any public *.map links actually exist. |
| [chrome_mhtml](https://github.com/ArchiveBox/abx-plugins/tree/main/abx_plugins/plugins/chrome_mhtml) | Node hook (~6kB) invokes \`Page.captureSnapshot({format:'mhtml'})\` over Chrome CDP | Requires session/Chrome state from Python chrome plugin, but the CDP primitive also exists in existing Playwright Chrome; direct port/adaptation must be tested. **Medium** if WACZ + SingleFile not enough. |
| [mobilesize](https://github.com/ArchiveBox/abx-plugins/tree/main/abx_plugins/plugins/mobilesize) | Temporarily resizes active tab to trigger responsive network requests, retaining mobile-dependent resources in recorder | Needs same active Chrome tab/recorder, cannot just run on an unrelated private Chrome profile; current Playwright already has mobile viewport coverage. **Medium** for breakpoint-specific missing assets. |
| [chrome_screencast](https://github.com/ArchiveBox/abx-plugins/tree/main/abx_plugins/plugins/chrome_screencast) | Node hook + Chrome CDP streams low-resolution JPEGs for **live admin preview**, not durable full-fidelity WebGL recording | Active Chrome CDP session; performance and retained-frame semantics must be tested. **Low/Medium**, existing X01 camera/interaction experiments preferable for high-quality frames. |
| [wget](https://github.com/ArchiveBox/abx-plugins/tree/main/abx_plugins/plugins/wget) | External wget mirror/WARC, JS/Python wrapper | Requires OS \`wget\` binary (provider \`env,apt,brew\`); overlaps existing X08/X09 and JS WARC. **Low incremental**, unless specific missing static resources are identified. |
| [search_backend_sqlite](https://github.com/ArchiveBox/abx-plugins/tree/main/abx_plugins/plugins/search_backend_sqlite) | Python SQLite FTS5 indexing of archived text and metadata | Python module import **PASS** natively on owner Windows; actual hook requires compatible archive file layout, snapshot ID and input pipeline; JS WACZ is not magically compatible. **Medium** for long-term multi-client archive corpus, lower immediate X11 value. |
| [trafilatura](https://github.com/ArchiveBox/abx-plugins/tree/main/abx_plugins/plugins/trafilatura) | Extracts saved article HTML to text/Markdown/HTML/CSV/JSON/XML | \`trafilatura==2.3.1\` plus \`lxml==6.1.3\` via uv per config; useful for content-centric client sites rather than the 3D reference. **Low now, medium later**. |
| [opentimestamps](https://github.com/ArchiveBox/abx-plugins/tree/main/abx_plugins/plugins/opentimestamps) | Optional trusted timestamp proof from saved manifest | Requires \`opentimestamps-client==0.7.2\` and network/blockchain proof; not necessary for initial extraction; additional service/cost conditions must be verified before enabling. |
| [opendataloader](https://github.com/ArchiveBox/abx-plugins/tree/main/abx_plugins/plugins/opendataloader) | Structured PDF text/tables, OCR-assisted | Requires \`opendataloader-pdf==2.5.20\` and **Java >=11** per config; extra RAM and process cost. **Not a flower-valley X11 default**. |
| [autosummary/autotag](https://github.com/ArchiveBox/abx-plugins/tree/main/abx_plugins/plugins/autosummary) | AI-generated summaries/tags using configured OpenCode provider | Provider/credits/permissions UNKNOWN; **DENY until independently verified and approved**, redundant to local deterministic source analysis for X11. |
| [Cloud/account plugins](https://github.com/ArchiveBox/abx-plugins) | Figma, Canva, Google Drive, Dropbox, Notion, OneDrive, etc. | Needs authorized service/account sessions; **NOT permitted by an archiving install**, not necessary for anonymous public flower-valley research. |

The existence of a plugin folder is NOT proof of install, correct dependency resolution, operational memory headroom, content fidelity or authorization. Some scripts use abxpkg's executable shebang and framework-specific environment/config/record contracts even if their Python/Node imports happen to succeed. ArchiveBox JS bundles a *separate*, not wire-compatible plugin runtime; a manual bridging adapter or targeted CDP equivalent must be deliberately tested.

## 5. Feasible execution paths ranked by smallest real working value

### A. LOWEST CHANGE / RECOMMENDED: ArchiveBox JS + existing Node/Playwright targeted supplement

- Continue to run only the already accepted ArchiveBox JS capture as the primary X11 source-of-truth for WACZ/DOM/network/screenshots.
- For a proven missing output, use **existing** Playwright/Chrome CDP APIs or a small native Python postprocessor **serially** (never two simultaneous browser trees by default). Examples: \`Page.captureSnapshot\` MHTML, source-map presence check on already recorded JS, phone breakpoint capture/replay, SQLite indexing of extracted plain text. Each requires a small interface and separate tests; **NOT implemented** by this report.
- Distinguish new data from transformations of the same saved bytes. For every addition record URL, MIME, source response SHA256, extraction tool/version, process memory and selected output status. Reuse existing X01–X10 artifacts before acquiring duplicates.
- Does not require WSL distro, Docker, new Chrome profile, Java or a second 96-plugin runtime. Keep X12 for automated SPA state graph and X13 for HAR sanitization.

### B. CONDITIONALLY POSSIBLE: Fresh lightweight Linux distro under WSL2 (NO Docker) for *abx-dl only*

**Prerequisite NOT PRESENT**: existing WSL distros list contains ONLY stopped \`docker-desktop\`. Must install/import a genuine supported distro (Debian or Ubuntu), create user and isolated Python environment, use pinned versions, install only exact required external binaries. This is a new distro/system setup, not a Windows pip fix.

Current global \`%USERPROFILE%\.wslconfig\`: \`memory=2048MB,processors=2,swap=4GB\` (X10 resource policy). Current Windows free RAM ~1.46–1.50GiB. Running a Linux VM capped at 2GB plus a second Chrome risks host RAM exhaustion; swap might prevent an immediate crash but cannot guarantee acceptable performance. **No new distro was installed and no RAM-safe Linux runtime test performed**; do not call this operational. A lightweight CLI-only subset might fit if *serially* run with ArchiveBox JS closed, but there is NO measured minimum for this machine.

**If the owner separately approves distro installation and the test has clear incremental value**, the minimal vertical proof should be:
1. Back up current \`.wslconfig\`, document distro name/WSL version and explicit RAM limit; no Docker daemon, no permanent service, no imported personal browser profile.
2. First measure idle WSL Linux memory, Windows free RAM, swap/commit and clean teardown **before installing abx-dl**; stop if host free RAM is near guard (100MiB emergency threshold, with much earlier soft warning).
3. Inside Linux with compatible \`uv\` and Python >=3.12 <3.15, install *pinned* abx-dl in venv. Verify \`abx-dl --version\`, \`abx-dl --help\` and \`abx-dl plugins\`; if CLI fails, stop and preserve logs.
4. Test an owned harmless localhost page with **one non-browser plugin** first, e.g. \`--plugins=title,wget --no-install\` only after the Linux \`wget\` binary is available and plugin config resolves. Verify real output bytes, JSONL state, timestamps and file hashes. Do not run default auto-install all plugins.
5. Terminate WSL distro and confirm RAM reclaimed; only after successful low-memory CLI trial compare one genuinely novel plugin against JS WACZ output and decide whether this second runtime is worth maintaining.
6. Import only sanitized evidence metadata into GitHub; keep WACZ, cookies, headers and source response bodies private.

**WSL1** may use less VM memory but has narrower Linux syscall compatibility; acceptance is UNKNOWN for abx-dl and its dependencies and it is NOT the default recommended route. **Cygwin/MSYS2** emulation introduces new Python/package-manager and browser inconsistencies, no verified working installation for these pinned versions; not better first choice.

### C. NOT RECOMMENDED: Original full ArchiveBox 0.9 server / Docker on current laptop

Upstream original server has DB/UI/collection and extra features but official *native Windows* support absent; at least 1GB RAM minimum / 2GB+ recommended **for original ArchiveBox**, separate from abx-dl. Previously Docker/WSL setup hit emergency ~70–96MiB free. Since ArchiveBox JS already preserves the core X11 evidence and original Docker variant duplicates capture, no present incremental value justifies restarting it on the low-headroom machine.

## 6. Decision matrix and actual operational gate

| Option | Unique value | Existing prerequisites | New setup | Current status |
|---|---|---|---|---|
| **ArchiveBox JS 0.1.0** | WACZ/WARC, DOM, screenshots, 48 source plugin types (subset proved) | CfT, Node, pnpm, built MV3 present | None | **CURRENT / LOCAL CAPTURE PASS** |
| Individual Python plugin module imports | Potential standalone postprocess; one SQLite module import PASS | Existing Windows Python venv | Adapter/input contract + test needed | **PARTIAL READ-ONLY IMPORT PASS**, not extraction success |
| Targeted Playwright/CDP complements | MHTML, source-map detection, responsive capture, streaming | Existing Node Playwright/Chrome | Small deterministic code + tests only | **FEASIBLE / NOT IMPLEMENTED HERE** |
| **abx-dl under separate WSL2 distro** | Genuine 96-plugin ecosystem + JSONL, installers and CLI control | WSL host installed, but ONLY docker-desktop distro | Separate distro, Linux Python, dependencies, resource acceptance | **CONDITIONAL / NOT INSTALLED / NO PASS** |
| **Native Windows abx-dl CLI** | Same Python ecosystem if it worked | Packages installed | Would require unsupported upstream POSIX port | **BLOCKED, directly retested exit 1** |
| **Original ArchiveBox 0.9 server/Docker** | Database/API/multi-user archive collections | Docker/WSL tool exists but stopped | Large, memory-heavy stack | **STILL BLOCKED / NO REAL CAPTURE** |

**Final recommendation:** No second full archiver activated. The best next experiment is to measure one **specific missing evidence category** (likely published Source Maps or responsive network assets) using current JS + Playwright, **not** to install a Linux distro now. If it is genuinely unavailable and source plugin output cannot be reproduced by already installed tools, seek owner approval for a **bounded single-plugin abx-dl WSL2 trial**, with strict memory and cleanup.

## 7. Evidence integrity, cost and security controls

- All core repositories reviewed are public open source; existing capture path has zero API cost. New full WSL distro may incur installation/network/storage/CPU/RAM overhead (not a paid cloud service). Optional provider-based AI and external timestamp/notary/network services have **unverified cost/quota** and remain **DENIED until verification/approval**.
- Do not change global \`.wslconfig\`, install a new distro, start Docker, authorize accounts or grant additional browser permissions solely because this research concludes "theoretically possible"; this report is research, not owner approval for system changes.
- WACZ and raw HAR stay on laptop; never publish sensitive headers or third-party payload to GitHub. Separate JS and future Python output folders and give each archive a source/time SHA256 in the canonical project record.
- Follow X11 [full setup handoff](../handoffs/X11-ARCHIVEBOX-JS-COMPLETE-SETUP-AND-READINESS-2026-11-19.md), [48-plugin matrix](./X11-ARCHIVEBOX-JS-48-PLUGIN-CAPABILITY-MATRIX-2026-11-19.md), [project log](../../../PROJECT-LOG.md). X12 and X13 remain pending; neither gets skipped by this decision.

**No changes made during this analysis:** no Linux distribution install, no Docker start, no provider access, no modification of existing Chrome profiles, no plugin package upgrade, no actual target crawl, no use of extra quota. Native Python CLI import/exit and separate plugin-module imports are the only new execution probes.
