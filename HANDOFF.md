# AIOS Design System — HANDOFF

**Status (2026-06-23): rollout complete.** `@aios-alpha/design@0.1.0` + `@aios-alpha/ui@0.1.0` on npm; repo `AIOS-alpha/aios-design` (public). **P1 website ✅** (#4). **P2 team-brain ✅** (#68). **P3 workspace GUI ✅** (#86). **P4 ✅** — website Design System doc (#5), root `CLAUDE.md` + `/docs-sync` Audit 7, scaffold rules + `docs/design-system.md` (AIO-83). Trusted Publishing wired; npm web-UI Trusted Publisher link still pending. Epic **W2.5** (Linear AIO-79..83).

**Org scope is `@aios-alpha`** (npm org `aios-alpha`), NOT `@aios`. Consume: `npm i @aios-alpha/design @aios-alpha/ui`; in a Tailwind v4 global stylesheet → `@import "@aios-alpha/design/tokens.css"; @import "@aios-alpha/design/tailwind-theme.css"; @import "tailwindcss"; @source "<rel>/node_modules/@aios-alpha/ui/dist"; @custom-variant dark (&:where(.dark,.dark *));`. Light = `:root`; `class="dark"` on `<html>` switches.

## What this is
One token-driven, **dual-mode (light + dark)** design system for every AIOS surface (website, team-brain, workspace GUI, scaffolded workspaces). Sibling to **vibrana.ai** (violet + lime), more indie-dev. Prototypable in Pencil, expressed as React components extending shadcn, documented in an agent-readable `DESIGN.md`.

## Locked decisions (do not relitigate)
- **Type:** Space Grotesk (display) · Plus Jakarta Sans (body/UI) · JetBrains Mono (code + structural labels).
- **Feel:** balanced — clean/sans-led marketing; terminal-native app chrome (mono labels, status dots, tighter radius); lime rationed to one CTA/screen.
- **Delivery:** standalone `aios-design` package (DTCG → Style Dictionary) + `@aios-alpha/ui` (shadcn + AIOS skin) + `aios-design.pen`.
- **Color:** primary violet `#8b5cf6` (dark) / `#7c3aed` (light); accent lime `#84cc16`; cyan/fuchsia = supporting (tier/kind badges only). Light = off-white canvas `#fafafa` + white cards + ≤6% shadow; dark = near-black `#050505` + borders + glow.
- Calibrated against Refero **Serious Enterprise + Clean SaaS** exemplars: Linear, Mercury, SpatialChat (see DESIGN.md "Proven-pattern lineage").

## Done (P0)
| Artifact | Where |
|---|---|
| DTCG token sources (light+dark) | `tokens/*.json` |
| Build → CSS vars / Tailwind theme / Pencil vars | `build/build.mjs` → `npm run build:tokens` → `dist/{tokens.css,tailwind-theme.css,tokens.pencil.json}` |
| Canonical dual-mode contract | `DESIGN.md` |
| `@aios-alpha/ui` shadcn + AIOS components | `react/` — verified both modes (`react/preview-*.png`, `react/refined-*.png`) |
| Consumption + Pencil docs | `README.md`, `PENCIL.md` |

Kitchen-sink reference: `cd react && npm run dev` → http://localhost:5173/ (toggle top-right flips light/dark).

## Next (in order) — epic W2.5
- **W2.5.5 Pencil prototype — ✅ DONE (AIO-79).** Built in `aios-design.pen`: token variables loaded as `mode:light`/`mode:dark` themes (colors as themed arrays; rgba→hex+alpha; added `*-tint` badge fills + theme-aware `shadow-card-color`/`glow-violet-color`/`dot-glow-lime` so a single tree renders correct per-mode elevation). Reusable components: `Button/Primary`, `Button/Secondary`, `Pill`, `Card`, `TerminalFrame`. Two **component sheets** (light + dark: buttons, cards, inputs, badges incl. tier/kind, tabs, stat cluster, terminal, type). Six **canonical screens** = {Marketing Hero, Dashboard, Workspace GUI} × {light, dark}, each a top-level frame. Pattern: build light frame → `Copy` with `theme:{mode:"dark"}` so variables auto-resolve. Verified by `get_screenshot` against `react/refined-*.png` (the kitchen-sink renders) — parity holds.
  - ⚠️ **Disk persistence:** the Pencil app holds the doc in its live session; `aios-design.pen` on disk stays ~260 B until you **Save (⌘S) in the Pencil app**. Save before committing or the prototype is lost.
  - ⚠️ **Pencil MCP gotcha (didn't bite this run — bridge was already correct):** `Failed to access file .` = bridge mismatch, not a missing file. Fix: enable **only** the `claudeCodeCLI` Pencil integration (disable it in Cursor/Claude Desktop — see Pencil `config.json` `enabledIntegrations`), `pkill -f "pencil/mcp"`, then ONE `/mcp` reconnect with `aios-design.pen` open + focused.
- **W2.5.6 P1 — website — 🟡 PR OPEN, blocked on publish (AIO-80).** PR [aios-alpha.github.io#4](https://github.com/AIOS-alpha/aios-alpha.github.io/pull/4), branch `feat/w2.5.6-design-tokens` (worktree `../aios-website-design`). `src/styles/design-tokens.css` now `@import`s `@aios-alpha/design/tokens.css` + a legacy-name alias shim (so `custom.css`/`global.css` are untouched, now mode-aware). Docs get real light/dark (Starlight light ramp + AIOS violet/fonts; `data-theme→.dark` bridge script in `astro.config.mjs`). Landing stays dark-first. Verified locally via a `file:../aios-design` link (astro build clean, both modes confirmed). Follow-ups noted in the PR: landing light variant; `aios-wordmark.svg` → `currentColor`.

### ⛔ Publish gate (decided 2026-06-22: publish to npm)
Every consumer (website→Pages, team-brain→Railway, workspace GUI→Tauri) builds from its **own** checkout — none can see the sibling `aios-design/` at build time. So the rollout is gated on npm:
- **`@aios-alpha/design`** is publish-ready (`publishConfig.access:public`; `npm pack` = clean 11 kB: dist/, tokens/, DESIGN.md, README.md). Blocked only on **`npm login` + `npm publish`** (user-only; needs the free `aios` org if username≠`aios`).
- **`@aios-alpha/ui`** (the `react/` lib) is **NOT yet publishable**: its source uses `@/…` path aliases (`@/components/...`, `@/lib/utils`) that only resolve via its tsconfig — shipped raw they break for consumers. It needs a **bundling build** (tsup or vite lib mode) emitting JS + d.ts with aliases resolved, before P2/P3 can consume it. (P1/website doesn't need `@aios-alpha/ui` — CSS only.)
- Per-repo PRs pin `@aios-alpha/design@^0.1.0`; CI goes green once published + `npm install` refreshes the lockfile.

- **W2.5.6 P1 — (orig note) website** (smallest diff): import `tokens.css` + `tailwind-theme.css`; keep Starlight `--sl-*` mapping; add light mode.
- **W2.5.7 P2 — team-brain**: swap `@theme` for token imports; add dark mode (next-themes); migrate `.prism-*` → `@aios-alpha/ui`; Bricolage/Hanken → Space Grotesk/Plus Jakarta.
- **W2.5.8 P3 — workspace GUI** (biggest): add Tailwind v4 + shadcn + `@aios-alpha/ui` to `gui/client`; replace `app.css`; add light mode.
- **W2.5.9 P4 — scaffold**: ship `@aios-alpha/ui` + tokens into `aios-workspace/scaffold`; website Design System doc; note in root CLAUDE.md + docs-sync.

Each P1–P4 in its own git worktree off `origin/main`, one PR per repo.

## Open input (non-blocking)
Chetan's design deck (light, purple) — not in any repo or Drive; awaited via Slack. When it lands, reconcile against the light palette (likely only a nudge).
