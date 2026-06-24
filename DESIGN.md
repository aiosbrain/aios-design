---
version: 0.2.0
name: AIOS Design System
description: The one design system for every AIOS surface — website, team brain, workspace GUI, and every scaffolded workspace. Dual-mode (light + dark). Editorial Minimal direction — greyscale chrome, Instrument typography, colour rationed to badges and data viz. Source of truth for tokens lives in tokens/*.json; this file is the human- and agent-readable contract.
direction: Editorial Minimal
modes:
  default-per-surface:
    website: dark
    team-brain: light
    workspace-gui: dark
    note: every surface ships BOTH modes with a toggle; the value above is only the initial default.
colors:
  light:
    bg: "#ffffff"
    surface: "#ffffff"
    elevated: "#ffffff"
    muted: "#f4f4f5"
    fg: "#1a1a1a"
    fg-secondary: "#57534e"
    fg-muted: "#a8a29e"
    border: "rgba(0, 0, 0, 0.10)"
    border-visible: "rgba(0, 0, 0, 0.14)"
    border-strong: "rgba(0, 0, 0, 0.22)"
    primary: "#0a0a0a"       # near-black pill buttons
    primary-hover: "#2a2a2a"
    primary-fg: "#ffffff"
    violet: "#7c3aed"        # brand mark, team/deliverable badges, links
    accent: "#84cc16"        # lime — status, checks, rationed live actions
    accent-fg: "#0a0a0a"
    destructive: "#ef4444"
    ring: "#1a1a1a"
    code-bg: "#f4f4f5"
  dark:
    bg: "#0b0b0b"            # matte engine steps — never pure #000
    surface: "#131313"
    elevated: "#191919"
    muted: "#191919"
    fg: "#ffffff"
    fg-secondary: "#b8b8b8"
    fg-muted: "#8a8a8a"
    border: "rgba(255, 255, 255, 0.08)"
    border-visible: "rgba(255, 255, 255, 0.14)"
    border-strong: "rgba(255, 255, 255, 0.24)"
    primary: "#ffffff"       # white pill buttons
    primary-hover: "#e5e5e5"
    primary-fg: "#0b0b0b"
    violet: "#8b5cf6"
    accent: "#84cc16"
    accent-fg: "#0b0b0b"
    destructive: "#ef4444"
    ring: "#ffffff"
    code-bg: "#131313"
  shared:
    emerald: "#10b981"
    amber: "#f59e0b"
    cyan: "#0d9488 (light) / #2dd4bf (dark)"
    fuchsia: "#c026d3 (light) / #e879f9 (dark)"
elevation:
  light: "hairline border + minimal shadow — shadow-button none, shadow-card 0 1px 2px rgba(0,0,0,.04), shadow-overlay 0 8px 32px"
  dark: "matte surface steps + border-visible; shadow-button/card none; shadow-overlay on floating menus only"
typography:
  fonts:
    display: "Instrument Serif, Georgia, Times New Roman, serif"
    body: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    mono: "JetBrains Mono, Fira Code, Consolas, monospace"
  rules:
    display-weight: 400 only for Instrument Serif — never faux-bold (font-synthesis: none)
    body-weights: "400–700 available on Instrument Sans"
  scale:
    display: { size: "clamp(3rem, 2.5rem + 2.5vw, 5rem)", weight: 400, lineHeight: 1.1, tracking: "-0.03em" }
    h1:      { size: "clamp(2.5rem, 2rem + 2.5vw, 4rem)", weight: 400, lineHeight: 1.1, tracking: "-0.02em" }
    h2:      { size: "clamp(2rem, 1.5rem + 2.5vw, 3.5rem)", weight: 400, lineHeight: 1.15, tracking: "-0.02em" }
    h3:      { size: "clamp(1.5rem, 1.3rem + 1vw, 2rem)", weight: 400, lineHeight: 1.3, tracking: "-0.01em" }
    body-lg: { size: "clamp(1.15rem, 1.05rem + 0.5vw, 1.35rem)", weight: 400, lineHeight: 1.7 }
    body:    { size: "clamp(1rem, 0.95rem + 0.25vw, 1.15rem)", weight: 400, lineHeight: 1.5 }
    small:   { size: "clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)", weight: 400, lineHeight: 1.5 }
    label:   { size: "clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem)", weight: 600, lineHeight: 1.4, tracking: "0.1em", transform: uppercase, font: mono, color: muted }
    code:    { font: mono, lineHeight: 1.6 }
spacing:
  base: "4px"
  scale: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128]
  max-width: "1200px"
  gutter: "24px"
  section-gap: "80px (48px mobile)"
radius:
  sm: "4px"
  md: "6px"
  lg: "10px"
  xl: "14px"
  2xl: "20px"
  full: "9999px"
effects:
  glow-violet: "0 0 60px rgba(139, 92, 246, 0.3)"
  glow-lime: "0 0 60px rgba(132, 204, 22, 0.3)"
  glass: "backdrop-filter: blur(12px)"
gradients:
  primary: "linear-gradient(135deg, #8b5cf6 0%, #84cc16 100%)"
  prism: "linear-gradient(135deg, #8b5cf6 0%, #10b981 50%, #84cc16 100%)"
---

## Overview

**Editorial Minimal** — greyscale canvas, Instrument Serif display + Instrument Sans body, near-black/white pill primary buttons, colour rationed to badges, KPI sparklines, and the prism mark. Dual-mode with a matte dark palette (`#0b0b0b → #131313 → #191919`).

**Personality:** editorial restraint · practitioner-built · developer-first · quietly confident.

**Semantic split (0.2.0):**
- **`primary`** — filled pill buttons and active tabs (near-black light / white dark). Not violet.
- **`violet`** — brand mark, team tier, deliverable kind, default badge tint, focus-adjacent accents.
- **`accent` (lime)** — live status, checks, rationed affirmative actions.
- **Supporting** — emerald/amber/cyan/fuchsia for kind/tier badge semantics and data viz only.

> **Source of truth:** `tokens/*.json` → `npm run build:tokens` → `dist/`. Change tokens + this file first — never hand-edit consuming repos.

---

## Color Palette

Light is `:root`; `class="dark"` on `<html>` swaps color values only.

**Chrome:** white/off-white light; matte near-black steps dark. Borders are hairline, never heavy fill shadows on cards in dark mode.

**Primary (buttons):** `#0a0a0a` light / `#ffffff` dark — editorial pills, `rounded-full`, no glow, no drop shadow.

**Violet (brand badges):** `#7c3aed` light / `#8b5cf6` dark — team tier, deliverable kind, default badge, prism mark gradient start.

**Lime (accent):** `#84cc16` — status dots, terminal live indicator, at most one filled lime action per screen.

**Supporting accents:** cyan (external/transcript), emerald (task), amber (decision), fuchsia (skill) — badge semantics and KPI sparklines only.

---

## Typography

Self-host via `@fontsource/instrument-serif`, `@fontsource/instrument-sans`, `@fontsource/jetbrains-mono` — no Google CDN.

- **Instrument Serif** — display/headings, weight 400 only. Set `font-synthesis: none` so the browser never faux-bolds.
- **Instrument Sans** — body and UI, weights 400–700.
- **JetBrains Mono** — code, eyebrows, metadata, badges.

**Tailwind v4 font-size tokens:** always `text-[length:var(--aios-text-*)]` — bare `text-[var(...)]` is parsed as a colour utility and breaks heading scale.

---

## Components (`@aios-alpha/ui`)

- **Button (primary):** near-black/white pill, `rounded-full`, no glow.
- **Button (secondary):** ghost pill, hairline `border-border`.
- **EyebrowLabel:** uppercase mono, muted greyscale (not lime).
- **StatCluster / KpiStat:** serif values, mono muted labels; colour only in KPI sparkline + delta.
- **TierBadge / KindBadge:** violet/cyan/emerald/amber/fuchsia semantics via dedicated accent tokens — never `primary`.
- **AiosMark:** prism caret-A SVG; `mono` prop for `currentColor`.
- **TerminalFrame:** mono code block, lime live dot when `status="live"`.

---

## Consumption (every AIOS surface)

In the app global stylesheet, **in this order**:

```css
@import "@aios-alpha/design/tokens.css";
@import "@aios-alpha/design/tailwind-theme.css";
@import "tailwindcss";
@source "../node_modules/@aios-alpha/ui/dist";
@custom-variant dark (&:where(.dark, .dark *));
```

Install both packages. `@aios-alpha/ui` lists `@aios-alpha/design` as a peer dependency.

**Consumer migration from 0.1.x:** if you mapped local `--accent` to `--aios-primary`, update button CTAs to keep using `--aios-primary` (now editorial black/white). Map link/highlight washes to `--aios-violet` instead. Swap Space Grotesk / Plus Jakarta Sans font imports for Instrument Serif / Instrument Sans.

---

## Do's and Don'ts

**Do**
- Ship both modes; toggle with `class="dark"` on `<html>`.
- Use `--aios-violet` for brand colour; `--aios-primary` for pill buttons only.
- Ration chromatic colour to badges, sparklines, and the prism mark.
- Self-host Instrument + JetBrains Mono; set `font-synthesis: none` on `html`.

**Don't**
- Don't use `primary` for tier/kind badges — use `violet` and supporting accent tokens.
- Don't faux-bold Instrument Serif.
- Don't use `text-[var(--aios-text-*)]` for font sizes in Tailwind v4.
- Don't hand-edit `dist/` — run `npm run build:tokens`.

---

## 0.3.0 — Effects layer

Editorial restraint extended with a subtle, rationed effects layer (light + dark, per-mode):

- **Eased off-white** — `--aios-bg: #fafaf8` (light); `surface`/`elevated` stay pure white so cards read as a free elevation step; `muted: #f3f3f0`. Dark unchanged.
- **Card glow** — graded, neutral-by-default shadows `--aios-shadow-glow-card` / `-card-hover`, plus an opt-in brand-tinted `--aios-shadow-glow-featured` / `-featured-hover` (tint ≤ .14 light / .22 dark). Colourless resting state; colour only on featured/hover.
- **Liquid glass** — `--aios-glass-bg` / `-border` / `-highlight` / `-inset` + `--aios-blur-glass` / `-glass-strong`. Recipe: `background: glass-bg; backdrop-filter: var(--aios-blur-glass) saturate(1.4); box-shadow: inset highlight + inset depth`. For nav, frosted bands, modals.

All are per-mode design-system tokens, so consumers get them for free. Compose presentation (bokeh fields, prism-border buttons, link underlines) in the consuming app referencing these tokens — never vendor the values.
