# S06 — NOVA Atelier: visual system & responsive design baseline

**Date:** 2026-11-22 | **Project:** M01 / pure HTML + CSS + JS / temporary 5-language NOVA Atelier demo.  
**Scope:** S06 design deliverables only. The canonical step PASS and tests are tracked in [03-EXECUTION-ROADMAP.md](../03-EXECUTION-ROADMAP.md); product brief stays in [S02](../01-RESEARCH-AND-BRIEF.md), route/data contract in [S05](../04-I18N-SEO-COMMERCE-SECURITY.md). No new `site/` directory or 30 pages created here.

## Chosen working visual direction — Midnight Editorial

**Judgment (not brand registration):** an editorial, restrained creative-studio experience with navy backgrounds, warm ivory text, amber highlights and a wholly original geometric orbital hero. Aim for immediate service clarity, legible conceptual work, small DEMO catalog, never imitate the heavyweight 3D Codex website. NOVA Atelier is a **provisional name**, not an authorized commercial brand. Images from S03's third-party references must not be copied.

## Evidence: editable original design deliverables

| File (S06 design folder) | Artboard | Review purpose |
|---|---|---|
| [wireframe-mobile-390.svg](wireframe-mobile-390.svg) | 390 CSS px, LTR | Phone navigation, stacked hero, six services, concept work and catalog entry |
| [wireframe-mobile-rtl-390.svg](wireframe-mobile-rtl-390.svg) | 390 CSS px, Persian draft/RTL | Mirrored information alignment; exact content/linguistic QA deferred to S07 |
| [wireframe-tablet-820.svg](wireframe-tablet-820.svg) | 820 CSS px | Two-column service cards, visible navigation/CTA and a 2-column content rhythm |
| [wireframe-desktop-1366.svg](wireframe-desktop-1366.svg) | 1366 CSS px | Bounded hero, wide navigation, three-column cards |
| [nova-hero-original.svg](nova-hero-original.svg) | 1200 × 720 vector | New decorative orbital composition, not a web image copied from others |
| [s06-responsive-proof.html](s06-responsive-proof.html) | CSS reflow 320/390/820/1366/1920 | Minimal, **design-only** semantic HTML/CSS layout proof, no framework/JavaScript/cart/routes |

Files are **source assets** for review, not proof of live website rendering. The SVGs use system fonts and geometry authored for M01; no third-party templates, photographs, stock assets or font binaries. The HTML proof is purposefully outside `site/` and **must not be treated as S08 PASS**.

## Color tokens and contrast

| Token name to implement later | Value | Role |
|---|---|---|
| `--color-bg` | `#0C1220` | canvas |
| `--color-panel` | `#172335` | service cards and navbar |
| `--color-raised` | `#202E42` | embedded surfaces and hero |
| `--color-ink` | `#F8F5EE` | main text |
| `--color-muted` | `#BECADD` | description text |
| `--color-accent` | `#F2C37A` | emphasis/button fill |
| `--color-on-accent` | `#161C29` | high-contrast CTA label |
| `--color-focus` | `#8FE5F5` | focus ring (3px + offset) |
| `--color-border` | `#425069` | decorative surfaces, **not a sufficient semantic focus boundary alone** |

**Static measured token-pair contrast** (sRGB WCAG formula; round to 2dp): ink on bg 17.17:1, muted on bg 11.29:1, ink on panel 14.52:1, muted on panel 9.55:1, accent on bg 11.45:1, dark on accent 10.44:1, focus on bg 13.08:1. Primary/secondary text samples exceed 4.5:1 for the specified pairs. Decorative border on background ≈2.30:1; **not** suitable alone for a 3:1 meaningful non-text control boundary. Final implemented buttons and actual hover/focus states require S16 WCAG audit. Source: [WCAG 2.2 contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

## Typography, layout and interaction contract

- **Font dependency: 0 new installations.** `system-ui, Segoe UI, Tahoma, Arial, sans-serif`; optional Vazirmatn for fa/ar and Inter for Latin only with licensed exact font files and tested payload. No remote Google Fonts/CDN by default.
- **Type scale:** body `clamp(1rem, .96rem + .18vw, 1.13rem)`, H1 `clamp(2.05rem, 1.2rem + 4.3vw, 4.9rem)`, H2 `clamp(1.55rem, 1.2rem + 1.55vw, 2.4rem)`; body line-height 1.6, display ~1.1. Target readable lines ≤65ch for Latin and separately evaluate Persian/Arabic in S07.
- **Spacing:** 4, 8, 12, 16, 24, 32, 48, 64 CSS px as a base rhythm; page gutter `clamp(1rem, 3.2vw, 3.2rem)`. Maximum content width **75rem** (≈1200px at default root font); keep it bounded at 1920px desktop.
- **Grid:** mobile single primary column; tablet two columns if cards have room; desktop three columns. Design-only proof uses content-based thresholds `@media(min-width:47rem)` and `@media(min-width:69rem)`, compact nav at `max-width:36rem`. These are **provisional content-breakpoints** for S08/S16 test, *not* mandatory device/user-agent breakpoints. `minmax(0,1fr)`, `min-inline-size:0`, CSS logical properties, `overflow-wrap:anywhere`.
- **Touch and keyboard:** prefer controls ≥44 ×44 CSS px (WCAG 2.2 AA has 24×24 CSS px minimum with exceptions), visible focus outline 3px `#8FE5F5`, no hover-only action, native anchors work without JS; future menu supports `aria-expanded`, Escape and correct focus order.
- **Motion:** only light CSS interaction for signaling; no compulsory video, WebGL or scroll trapping. `prefers-reduced-motion:reduce` disables decorative animation. Illustrative orbital motif can remain static.
- **Bidi:** `fa/ar` are RTL, `en/tr/de` are LTR; mirror layout alignment and directional affordances, but do not mirror logos, decorative hero and non-directional imagery. Native HTML in S08 must set `lang/dir` and style via logical properties. The Persian mobile SVG wording is an **illustration**, not a verified translation.

## Scope of future pages and states (must not be dropped)

The same visual system will serve **Home, Services, Work, Catalog, Contact, DEMO Checkout** across five locales (target 30 static HTML routes from S05). Home CTA services; six services with descriptions; three clearly labeled DEMO concept cases; six synthetic kit cards with filtering/empty/reset; mock-cart total and **persistent no-payment warning**; contact with no real submission. Mobile retains language/cart/contact access even if nav compacts. Test actual products and language equivalents later, not by believing this design proof demonstrates them.

**Visual QA / stop:** inspect individual SVGs, contrast pairs and the single-HTML proof at 320, 390, 820, 1366 and 1920 CSS px, including `dir=rtl`, JavaScript disabled, reduced-motion, image present, no page-level horizontal overflow; record results with screenshot paths and actual environment in the **existing S06 roadmap checkbox**. Any missing feature, severe overflow, clipped CTA or invisible text is a visual-stage issue to fix before final acceptance.

## Outstanding decisions / reversible handoff

- The art direction is **working / reversible**, not final owner-approved commercial identity. Color, name/brand, logo and actual original case imagery remain open for owner visual approval prior to public release. **No claim of trademark clearance or client service proof.**
- **S07:** actual 5-language copy, long German/Turkish and Arabic/Persian typography, complete navigation labels. **S08:** first real HTML file on localhost; port/network/JS/no-JS screenshot tests. **S09–S18:** functional flows, full responsive and accessibility evidence. Publication, purchase, payment/KYC and sensitive-provider activation remain explicitly out of scope.
- Tech stack unchanged M01: HTML/CSS/vanilla JS only, no paid tool, no React/WordPress/Vite, no Codex 3D branch writes. All artifacts isolated under `models/M01-vanilla-multilingual/design/`.
- Canonical external standards: [MDN `clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp); [MDN `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion); [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## S06/S10 professional visual rebuild option — owner resource correction 2026-11-22

**Do not retroactively reinterpret S06 PASS:** Original SVG/CSS visual files were created and verified for the first M01 implementation; **GIMP/Blender/Penpot/Figma were not proved to have been used then**. This is a future *quality-improvement and rebuild recipe* for the same art direction, not a new rendering dependency or replacement brand.

**New owner priority:** No permanent ban on professional offline production tools because instantaneous free RAM once measured 535MiB. User requests preflight preparation to around **2048MiB available**. New actual audit found 8GiB installed (2×4GiB), around 6020MiB Windows-visible, 1664MiB available at one snapshot, and **GIMP 3.2.8 / Blender 5.3.0 executables returned versions**. Professional combinations should be tried and benchmarked if they improve design.

**Candidate complementary pipeline for a refreshed premium NOVA concept:**
1. Keep the existing original Midnight Editorial tokens/RTL hierarchy/semantic Hero as the reference authority. If an editable design-board creates value, use authorized Penpot/Figma to explore component composition and responsive variants without duplicating the source tokens.
2. In GIMP, experiment with original textured atmospheric raster overlays, original concept-art comps and subtle backgrounds. In Blender, trial bounded original geometric/scene composition, optional pre-rendered stills or short loops for each of the three concept cases. Do not use other agencies' visual assets; provenance and license are mandatory.
3. Export optimized original static media suitable for HTML/CSS/JS, record weight, dimensions, alt/decorative classification, responsive source variants, and demonstrate meaningful artistic uplift **without increasing runtime dependency on Blender or requiring WebGL**.
4. Use Chrome/Edge/Playwright with the five languages and responsive widths, reduced-motion/no-JS alternatives, then actual Lighthouse/asset-load measures before adopting the new asset. Original S06 SVG remains an immediate rollback.
5. If actual GIMP+browser or Blender+preview parallel use is useful, **allow it after real RAM/commit/GPU responsiveness measurements**. Prepare roughly 2GiB available before an intensive session, use reversible configuration/tuning if pressure appears; no absolute rule restricting the workflow to a single app.

**Source of truth for resource policy:** [parent tool inventory and RAM correction §O](../../../tools/REGISTRY.md), [M01 tool placement §8](../02-STACK-TOOLS-AND-MCP.md), and [S10/S11/S17 stage guidance](../03-EXECUTION-ROADMAP.md). **New assets, rendering performance, cloud design permissions and pricing are not yet verified here.** No install/deploy/remote account changes are authorized by this note.
