# DJMRN — X14 | Wappalyzer native Windows + 180s live fingerprinting + X01–X13 novelty audit

**Date:** 2026-11-19. **Scope:** project DJMRN-FREELANCE-WEBSITE-001, reference `https://www.gladeye.com/`, stage X14 / E1. **Verdict:** COMPLETE for the stated **client-visible framework/library/technology signature fingerprinting** objective; NOT complete GPU shader, camera, proprietary site source or backend inspection. Current stage ownership: [PROJECT-LOG](../../../PROJECT-LOG.md). Next sequence: **X15 coverage reconciliation**.

**Critical distinction:** Wappalyzer is a *technology classifier*, not an asset mirroring tool. A detected technology name is not itself a new software file. This investigation used BOTH the upstream Wappalyzer CLI and its native fingerprint rules with a full-resource, continuously open Chromium tab over 180s. Only network response bodies independently verified absent from historical hash indexes were stored privately. Never publish raw Gladeye JS/CSS/HTML/screenshots from the owner's evidence folder to GitHub.

## 1. Original tool choice, upstream provenance and free cost

- Project runbook X14 originally identified **'Wappalyzer community source fork'**. Since original Wappalyzer product/repository is now proprietary, selected [HTTPArchive/wappalyzer](https://github.com/HTTPArchive/wappalyzer), the publicly maintained fork used by HTTP Archive crawls, NOT a purported current official Wappalyzer desktop app/API. Repo source pinned to exact local git HEAD **`35b0847c01c118055c42596d5c6d01f60f15d706`**.
- **LICENSE is GPL-3.0** in this source fork. This is free software with redistribution obligations; the project does not embed or redistribute its code or proprietary Gladeye bodies into the site's own code repository. No paid Wappalyzer API/lookup, SaaS credit, OAuth, cloud account or private cookies used.
- Source JSON fingerprint catalog from upstream: **27 technology rules files** (alphabet buckets), **3,463 compiled technologies**, **108 categories**, **2,929 JS property-chain checks**, and **822 DOM selector fingerprint rules** at this pinned commit. The high rule count describes capability, NOT technologies detected at Gladeye.
- Dependency: Node **24.22.1** (fork `package.json` engine requires >=24), Puppeteer **~25.16.0**. Already installed **Chrome for Testing v157** from X11, no new Chrome download, GPU and WebGL kept on. Installed only **27 production npm packages** using `PUPPETEER_SKIP_DOWNLOAD=1 npm install --omit=dev --ignore-scripts --no-audit --no-fund --prefer-offline`; no dev/Selenium/Docker/WSL dependencies, persistent daemon or personal Chrome profile.

## 2. Reusable Windows runtime paths and important browser flags

```powershell
$RT = Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X14-Wappalyzer'
$SOURCE = Join-Path $RT 'wappalyzer-httparchive-source'
$ENV:CHROMIUM_BIN = Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\ArchiveBox-X11\ChromeForTesting-157\chrome-win64\chrome.exe'
$ENV:CHROMIUM_ARGS = '--headless=new --disable-extensions --no-first-run --no-default-browser-check'
$ENV:PUPPETEER_SKIP_DOWNLOAD = '1'
$EVID = Join-Path $env:USERPROFILE 'Desktop\DJMRN-Website-Reference-Evidence\fernhollow-gladeye-20261118-NEW-EXTRACTION'
```

**Safety/compatibility:** Upstream CLI default Chromium args include `--disable-gpu`, `--no-sandbox`, `--disable-web-security`, `--ignore-certificate-errors`; these could undermine 3D observation and browser security. We explicitly **overrode Chromium launch args** in this owner's environment with the narrower safe set above (do not copy upstream defaults). Upstream Puppeteer driver's own `ignoreHTTPSErrors` setting is still part of its source; no Windows system-wide firewall/TLS/proxy policy was modified. Browser was disposable, anonymous, one profile, no connected accounts. Owner-defined emergency stop at **100 MiB of Windows free physical RAM** monitored externally; never triggered.

## 3. Native upstream CLI acceptance — independent initial test

Run from `$SOURCE`: `node cli.js https://www.gladeye.com/ --pretty --max-wait=45000 --defer=1000 --max-urls=1`, with the environment above. **PASS** on actual public page, about 10.7s; **12 reported technologies/signals**: `Node.js`, `Three.js` version **154**, `React`, `Vercel`, `Next.js` version **13.4.19**, `Priority Hints`, `Google Tag Manager`, `Google Analytics`, `HSTS`, `Webpack`, `Open Graph`, `Module Federation`.

Original native CLI output stored only locally under `$EVID/02-reviewed-derived/X14-Wappalyzer-official-CLI-Gladeye-first-scan-2026-11-19.json`. **Do not equate list of 12 heuristic matches with 12 verified server components**. Upstream CLI's request interception aborts images, fonts, CSS and other resources and is not a sufficient observer of dynamic 3D visuals. Therefore the second test used the fork's **same native browser Driver and Wappalyzer signature engine** but allowed full browser resources during the 180s study.

## 4. Live 180.28-second native Puppeteer/Wappalyzer engine acceptance

Own source: [X14-Wappalyzer-Native-TRUE180.mjs](../scripts/X14-Wappalyzer-Native-TRUE180.mjs). Runtime original `$RT/scripts/x14-wappalyzer-live180.mjs`; no patched/distributed third-party fork code. Initializes `src/drivers/driver.js` and `src/js/wappalyzer.js`, opens ONE live Gladeye browser tab, keeps the site for at least 180s, applies the full compiled fingerprint catalog over **HTML, CSS, meta tags, HTTP response headers, script URLs, browser runtime JS globals and DOM properties/attributes/text**, and in-memory first-party JS body signature matching. Also samples DOM-control signatures and network resource URL paths. No raw original site JavaScript/HTML stored during signature matching; only derived matches, byte hashes and limited source attribution.

**Accepted run:** `X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z`. Exactly **180.28 seconds** of browser observation; **13 checkpoints** t=0,15,…,180; **4 private screenshots** at 0,60,120,180; safe pointer movement, Menu open/close and scroll actions, WebGL 2.0 Canvas visible t=15 onward; **0 observer errors**, loopback services untouched, VPN and Remote Desktop Commander preserved. At least ~1.4 GiB Windows RAM free was observed during the run; the 100 MiB emergency stop was not reached. Following completion Chrome for Testing process count was 0 and free RAM returned above 2.5 GiB.

**Timeline file:** `$EVID/02-reviewed-derived/X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z-technology-timeline.json` (~64 kB). **Fingerprint provenance file:** same prefix `-fingerprint-evidence.json`. Four JPEG screenshots live only at `$EVID/01-private-captures/X14/<RUN>/000s.jpg, 060s.jpg, 120s.jpg, 180s.jpg`. Original on-disk evidence remains private. Browser returned **13 stable detections** from t≈15 through t=180 (the same 12 plus **Tailwind CSS**, whose CSS fingerprint was not observable in the more aggressively intercepted upstream CLI). In-memory evaluated **27** first-party JS responses and saved **only their SHA-256/size/path**; **25 SHA-256 values exactly matched X01 captured JS** and 2 did not.

## 5. Tech stack evidence matrix — what to trust

| Technology / signal | Wappalyzer output & provenance | Evidence confidence & rebuild relevance |
|---|---|---|
| **Three.js** | version **154**; direct runtime JS `THREE.REVISION`/`__THREE__` and/or DOM signatures. 4 earlier derived reports and 1 original X01 JS body also referenced relevant rule hints. | **STRONG client-side technology signal**, version directly reported by live browser; high-priority for independent 3D prototype, NOT exact custom shader/GPU camera data. |
| **Next.js** | version **13.4.19** from response headers/runtime JS properties; earlier 37 derived JSON reports and 2 raw X01 source bodies contained Next.js indicators. | **STRONG framework fingerprint**, not a source repository or definitive hosting backend version. |
| **React** | inferred by Next.js Wappalyzer rule; 6 older derived reports, 7 old raw hits | Expected frontend dependency, not independently observed React package version. |
| **Webpack** | inferred by Next.js and Module Federation rule; prior 31 derived references | Bundler signal; no exact configuration recovered. |
| **Tailwind CSS** | **extra live-scan finding**, CSS `--tw-rotate` / `--tw-translate` family signature; 2 old derived reports and 4 old raw CSS/JS/HTML references. | **Heuristic CSS fingerprint**; useful layout approach, no exact Tailwind version inferred. |
| **Vercel** | HTTP response-header fingerprint; earlier raw source references to Vercel | Public hosting/deployment signal only, not proof of private infrastructure. |
| **Module Federation** | JavaScript text pattern such as `data-webpack` | **POTENTIAL FALSE POSITIVE** in generic Webpack/Next bundle; do not claim microfrontend servers/remote module architecture. |
| **Node.js** | implied by Next.js rule, no direct backend source | **NOT PROOF** production server runs Node. |
| **Google Tag Manager / Analytics** | HTML/JS signatures | Site analytics instrumentation, NOT a required dependency to reproduce flower WebGL behavior. |
| **HSTS / Priority Hints / Open Graph** | headers/DOM metadata | Security/performance/metadata; not a renderer or 3D software package. |

The Wappalyzer output value `confidence:100` means *its own pattern score*, **not certainty of framework usage or proof of the actual GPU engine**. Three.js r154 and Next.js 13.4.19 are the actionable highest-value clues, but direct original-source/version corroboration remains separate from reconstructing complete scene semantics.

## 6. Exact X01–X13 reconciliation and genuinely new raw site data

Own analysis: [X14-Compare-Fingerprints-X01-X13.mjs](../scripts/X14-Compare-Fingerprints-X01-X13.mjs). Parsed **68 prior X01–X13 derived JSON reports, 0 parsing failures**, together with X01 original **47-response** raw-body manifest, X02 **51-entry** HAR, X11 **54-response** WARC comparison, X12 **13-tick** temporal resources and X13 **46 unique first-party URL path** observations. Baseline indexed **48 unique first-party resource paths**; X14 full-resource browser observed **53 unique first-party paths**, of which **46** already known, **7** absent from this prior index. Derived crosswalk `$EVID/02-reviewed-derived/X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z-X01-X13-novelty-and-tech-provenance.json`.

**Seven new URL paths were verified beyond a simple link discovery:** 2 Next.js first-party JavaScript route modules (`/careers` and `/contact`), 2 CSS bundles, and 3 HTML pages (`/careers`, `/contact`, `/ventures`). They first appeared during browser interactions/Next route prefetch; none is proved to be a new 3D GLB, texture or shader. Own [X14 exact seven-response verification/archiver](../scripts/X14-Verify-Store-New-FirstParty-Responses.mjs) re-requested ONLY these exact same-origin URLs in an anonymous isolated browser, received **7/7 HTTP 200**, computed response byte SHA-256, crosschecked **1,683 indexed earlier hash strings** from X01/X11 and scoped X01–X13 derived reports. **0 exact hash matches; 7 unique body files successfully saved and re-hashed on owner disk, 0 errors.**

| New private resource | Retrieved size (B) | SHA-256 |
|---|---:|---|
| `/_next/static/chunks/app/careers/page-ed4d364c5468127c.js` | 9,511 | `8c5161f611218635c78af4cbaca83353239d0d4f23b6a1d7809d6efede8fe6bd` |
| `/_next/static/chunks/app/contact/page-c27772baecf4a1c8.js` | 1,575 | `68207d296645c3759c1689aa42a72a0b21ba0c3acd6c27a94f6ba472371528cc` |
| `/_next/static/css/0b3a3a603128fa66.css` | 1,980 | `b94a40e504539b9188c5ae14422ae0c0d0d9d863f98df63738ec89255cf9a99c` |
| `/_next/static/css/9085b6f617458941.css` | 8,214 | `44169e6d0f12fe9adcf8025a665c2e46e35b05db2d3e0548d101d6c5d416ea58` |
| `/careers` HTML | 211,312 | `71256b59fdadfe943d1f9929b80572dff4b363f4dab2e583e13d3f0f33b89ab2` |
| `/contact` HTML | 44,919 | `6502cda0ee6b38cf4764f698422a0b62e04ddbfdc637bc1830b761523d059f92` |
| `/ventures` HTML | 70,179 | `b6d76a7e257d7beb566caeb15736bcfac45b59cf426d47cd668252340d155657` |

**All original response bodies stored privately** in `$EVID/01-private-captures/X14/X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z/verified-new-first-party/` under deterministic hash filenames. The URL-to-hash-to-private-file mapping is `$EVID/02-reviewed-derived/X14-WAPPALYZER-TRUE180-2026-11-19T14-32-05-339Z-seven-candidate-url-response-hash-verification.json`. Do NOT infer stored paths from URLs; use this manifest to retrieve files. Private file integrity recheck: **7/7 SHA-256 PASS**, all source bodies exist. They are **nav/page structure assets**, not novel flower renderer binary data. Never push raw third-party copyright content to GitHub. Note the comparison is scoped to 1,683 indexed hashes; absence from that index is not evidence a resource never existed anywhere else.

## 7. Exact rerun without unnecessary reinstall

Existing own [X14-supervised Windows launcher](../scripts/X14-Supervised-Wappalyzer-Windows-Runner.ps1) is installed at `$RT/Run-X14-Wappalyzer.ps1`. Tested `preflight` PASS (source commit, Node version, Puppeteer runtime, source scripts and reused Chrome exist). **The consolidated `-Mode run` launcher itself was NOT independently E2E-tested**; the exact native browser script under an external 100 MiB RAM monitor **DID PASS 180.28s**. When repeating, expect site versions and signatures to change; new run IDs and new comparisons are required.

```powershell
$RT = Join-Path $env:LOCALAPPDATA 'DJMRN-Website-Toolkit\04-Runtimes\X14-Wappalyzer'
$S = Join-Path $RT 'Run-X14-Wappalyzer.ps1'
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $S -Mode preflight
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $S -Mode run
# After inspecting a completed run, compare to historical evidence:
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $S -Mode compare -RunId '<verified-X14-run-id>'
# Only re-fetch seven explicitly identified new links if absolutely necessary:
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $S -Mode verify-new-assets -RunId '<verified-X14-run-id>'
```

Raw scripts and owned runner were committed: [native 180s tester](../scripts/X14-Wappalyzer-Native-TRUE180.mjs), [dedup/provenance analyzer](../scripts/X14-Compare-Fingerprints-X01-X13.mjs), [selective response archiver](../scripts/X14-Verify-Store-New-FirstParty-Responses.mjs), [Windows runner](../scripts/X14-Supervised-Wappalyzer-Windows-Runner.ps1). Running the full vendor CLI with its legacy security-weakening defaults or downloading another Chromium is **NOT** necessary for these accepted capabilities. Optional full DNS/robots `--probe` / recursive multi-host scanning and browser-extension installation were NOT performed, since they are not needed to classify the original three-dimensional client runtime; do not claim every Wappalyzer feature was exercised.

## 8. Evidence-driven stage disposition / next X15

X14 is **COMPLETE** for detecting public framework/library signals with a live 180s native source and signature matcher, and for selective deduped download of new first-party related response bodies. The two main contributions are (1) a new, confidence-qualified **framework/software stack matrix with version hints** and (2) seven genuinely newly archived nav/CSS/HTML response bodies in the scoped private evidence index. No new original 3D GLB, textures, GLSL compiled shaders, exact GPU command buffers, internal camera transforms or backend source proved by X14. Stage **X15 NEXT** should reconcile all X01–X14 capture tools and explicitly define coverage denominator, novelty per tool and missing/UNKNOWN assets; don't imply exhaustive extraction from one site's public route or from signature heuristics.
