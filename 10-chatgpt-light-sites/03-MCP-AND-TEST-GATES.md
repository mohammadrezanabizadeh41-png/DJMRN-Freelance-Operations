# DJMRN — MCP / CLI / Test Handoff Contract for Light Websites
**Status:** proposed tool-routing and acceptance gates, **no new MCP attached**, 2026-11-21.

## One authority per capability
- **GitHub branch** = authored source, commit, test automation once approved. This project branch never modifies heavy-site files or main.
- **Bridgerator MCP currently available in this chat** = direct read/search/file edits/PowerShell on approved laptop. This is the default executor bridge.
- **Node/Python/Git/Vite/Astro/Playground** = deterministic command-line programs invoked only if present and approved. Calling them via Bridgerator is not the same as connecting them as separate ChatGPT MCP servers.
- **External MCP server** (Playwright, Chrome DevTools, WordPress, Penpot) = not available to this chat until capability/connection checks pass. Mere npm/installer download, another app's MCP client, or launching a local server does **not** make new tools appear in this conversation.
- **AI agent hosts** (Codex, Goose, gptme, OpenCode, Dyad) = alternate AI executors; none is needed as default for this project.

## Operational routing matrix
| Need | First choice now | Conditional specialized route | Only upgrade if measured gap |
|---|---|---|---|
| Read/search code | Bridgerator read/search + GitHub fetch | language-server/code-index CLI | A real multi-file navigation error |
| Write/refactor | GPT-6 constructs patch + Bridgerator edit + Git diff | VS Code tooling, optional agent | Patch workflow fails on multiple modules |
| Install dependencies | local pinned npm package after owner approval | pre-downloaded hash-verified archive | Missing runtime and license/size checked |
| Build/serve | Node/Vite or Astro CLI; single local port | WP Playground CLI for WordPress | Different architecture selected |
| Visual design | CSS/HTML, browser screenshots with approval | Penpot MCP or GrapesJS/Puck | Owner needs editable visual design iteration |
| Browser interaction | existing permitted local browser/Playwright CLI | Playwright MCP | Accessibility snapshots/tool calls measurably improve QA |
| Performance trace | Lighthouse CLI / Chromium built-in | Chrome DevTools MCP | Need trace-specific diagnostics not solved by CLI |
| WordPress edits | CLI/theme files/Playground | official WP MCP Adapter | Need authorized structured WordPress Abilities calls |
| Content and images | reviewed text/local files, free manual tools | Sharp/SVGO/GIMP | Repetitive asset transformations need automation |
| Data | JSON/fixture; no DB | PocketBase/Hono after P04 approval | Proven real persistent I/O and ownership |
| Security | secret scan, deps audit, simple test | OWASP ZAP or separate audit | Real external attack surface and authorized scope |

## Minimum acceptance test for any new MCP service
1. **Need**: state the exact tool capability missing; show failure/limitation in existing command.
2. **Source**: open official GitHub repo/releases + license; pin version/hash; audit dependency/permission, cloud telemetry/quotas and pricing. Unknown cost -> deny use.
3. **Scope**: localhost; one synthetic project folder; no personal browser profile or secrets; new account/OAuth/privilege only with owner approval.
4. **Connect**: verify client↔server handshake, list advertised tools and compare with desired function. Running a process is NOT proof that ChatGPT can invoke it.
5. **Real test**: read one synthetic file/page, perform one reversible controlled action if approved, independently check output and record elapsed/memory.
6. **Failure test**: reject out-of-scope path, unavailable port, timeout, restart; prevent duplicate action. Check disconnect/revoke option.
7. **Keep/Remove**: retain only if tool produces a tested advantage over Bridgerator + deterministic CLI; otherwise do not add it.

## Per-stage test matrix / reproducible evidence
| Build family | Smoke test | Unit/functional | Responsive/A11y | Failure/Recovery | DONE only when |
|---|---|---|---|---|---|
| A simple site | local page 200/DOM content | navigation, CTA and form fixture | 360px and desktop; keyboard, contrast | invalid form, asset 404 | real browser + successful build |
| B Astro | static generated links and routes | markdown/content validity, search when used | RTL if required, titles/metadata | broken deep link and not-found | built static output works via localhost |
| C WordPress | WordPress page and edit in local sandbox | theme.json/template, block persistence | block theme mobile, editor UX | site reset/backup; plugin compatibility | reload retains content; backup restores |
| D demo shop | 6 items, product→cart→demo receipt | quantity, exact total, empty cart, reload | mobile cart+keyboard | missing product, invalid qty, reset | zero-payment label everywhere, accurate arithmetic |
| E real store | sandbox cart/order only | idempotency/retry/refund; test-only | mobile checkout | failed payment, duplicate request | full separate security, licensing, approval gates |
| F web app | real local request and response | DB state, authz, API validation | loading/error states | restart, conflict, stale data | durable state and tested recovery |

## Example low-RAM browser QA
- Keep one Chrome/Edge process set and one test worker. Test at 360x800, 768x1024, 1366x768 without claiming exact device parity.
- For WordPress, compare SQLite/WASM results with appropriate production DB before claiming plugin/ecommerce portability.
- If tests fail because browser package is missing, stop and propose package size/rights; do not auto-download multiple browsers.
- For reduced motion, disable motion before initial render and ensure interactive features remain usable.
- Performance goals are targets, not proofs: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 on representative measured traffic/device; local Lighthouse simulation is a diagnostic only.

## Codex project firewall
- NEVER write to, edit or publish source from path 09-self-marketing-website or its original vendor assets under this project.
- No reuse of private Flower Valley evidence, screenshots, archives, shader bytes or prompts as public examples.
- Do not merge branch project/chatgpt-light-sites-20261121 into main without explicit user approval.
- If running local git, verify repository root and active branch before any write; separate project directory and server port.
- Project docs here are not the site implementation. A future pilot requires explicit project scope and local path selection.

## Evidence
- Official WordPress MCP Adapter: https://github.com/WordPress/mcp-adapter
- Official WordPress Playground CLI: https://github.com/WordPress/wordpress-playground
- Playwright MCP: https://github.com/microsoft/playwright-mcp
- Chrome DevTools MCP: https://github.com/ChromeDevTools/chrome-devtools-mcp
- Penpot MCP: https://github.com/penpot/penpot/tree/develop/mcp
- WordPress Agent Skills: https://github.com/WordPress/agent-skills

**Present state:** only Bridgerator and connected GitHub were tested as direct tools. Tool adapters and full E2E for any light website are NOT TESTED.
