---
version: 0.1.0
name: AIOS Design System
description: The one design system for every AIOS surface — website, team brain, workspace GUI, and every scaffolded workspace. Dual-mode (light + dark). Sibling to vibrana.ai — same foundations, shifted to violet/lime. Source of truth for tokens lives in tokens/*.json; this file is the human- and agent-readable contract.
modes:
  default-per-surface:
    website: dark      # marketing — vibrana parity
    team-brain: light  # dashboard — long reading sessions
    workspace-gui: dark # app chrome — terminal-native
    note: every surface ships BOTH modes with a toggle; the value above is only the initial default.
colors:
  light:
    bg: "#fafafa"        # off-white canvas (Clean-SaaS pattern: cards lift by being brighter)
    surface: "#ffffff"   # white card surface
    elevated: "#ffffff"  # white, separated by shadow not fill
    muted: "#f4f4f5"
    fg: "rgba(15, 15, 17, 0.95)"
    fg-secondary: "rgba(15, 15, 17, 0.66)"
    fg-muted: "rgba(15, 15, 17, 0.48)"
    border: "rgba(0, 0, 0, 0.08)"
    border-visible: "rgba(0, 0, 0, 0.12)"
    border-strong: "rgba(0, 0, 0, 0.22)"
    primary: "#7c3aed"
    primary-hover: "#6d28d9"
    primary-fg: "#ffffff"
    accent: "#84cc16"
    accent-fg: "#0a0a0a"
    destructive: "#ef4444"
    ring: "#7c3aed"
    code-bg: "#f4f4f5"
  dark:
    bg: "#050505"
    surface: "#0a0a0a"
    elevated: "#141414"
    muted: "#1a1a1a"
    fg: "#fafafa"
    fg-secondary: "rgba(255, 255, 255, 0.72)"
    fg-muted: "rgba(255, 255, 255, 0.5)"
    border: "rgba(255, 255, 255, 0.1)"
    border-visible: "rgba(255, 255, 255, 0.15)"
    border-strong: "rgba(255, 255, 255, 0.24)"
    primary: "#8b5cf6"
    primary-hover: "#7c3aed"
    primary-fg: "#000000"
    accent: "#84cc16"
    accent-fg: "#000000"
    destructive: "#ef4444"
    ring: "#8b5cf6"
    code-bg: "#0a0a0a"
  shared:
    emerald: "#10b981"
    amber: "#f59e0b"
    cyan: "#0d9488 (light) / #2dd4bf (dark)"      # supporting accent — external tier, transcript kind
    fuchsia: "#c026d3 (light) / #e879f9 (dark)"   # supporting accent — skill kind
elevation:
  light: "hairline border (border) + subtle shadow ≤6% black — shadow-button 0 1px 2px, shadow-card 0 4px 16px, shadow-overlay 0 4px 28px"
  dark: "surface step + border-visible; NO fill shadow on cards (shadow-* resolve to none); glow-violet/glow-lime for emphasis; shadow-overlay only on floating menus"
typography:
  fonts:
    display: "Space Grotesk, system-ui, sans-serif"
    body: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    mono: "JetBrains Mono, Fira Code, Consolas, monospace"
  scale:   # fluid clamp() — never hardcode px for text
    display: { size: "clamp(3rem, 2.5rem + 2.5vw, 5rem)",       weight: 700, lineHeight: 1.1, tracking: "-0.03em" }
    h1:      { size: "clamp(2.5rem, 2rem + 2.5vw, 4rem)",       weight: 700, lineHeight: 1.1, tracking: "-0.02em" }
    h2:      { size: "clamp(2rem, 1.5rem + 2.5vw, 3.5rem)",     weight: 600, lineHeight: 1.15, tracking: "-0.02em" }
    h3:      { size: "clamp(1.5rem, 1.3rem + 1vw, 2rem)",       weight: 600, lineHeight: 1.3, tracking: "-0.01em" }
    body-lg: { size: "clamp(1.15rem, 1.05rem + 0.5vw, 1.35rem)", weight: 400, lineHeight: 1.7 }
    body:    { size: "clamp(1rem, 0.95rem + 0.25vw, 1.15rem)",  weight: 400, lineHeight: 1.5 }
    small:   { size: "clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)", weight: 400, lineHeight: 1.5 }
    label:   { size: "clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem)", weight: 600, lineHeight: 1.4, tracking: "0.1em", transform: uppercase, font: mono }
    code:    { font: mono, lineHeight: 1.6 }
spacing:
  base: "4px"
  scale: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128]
  max-width: "1200px"
  gutter: "24px"
  section-gap: "80px (48px mobile)"
radius:
  sm: "4px"   # inline code chips, tiny badges
  md: "6px"   # buttons, inputs
  lg: "10px"  # code blocks, terminal windows
  xl: "14px"  # cards, info boxes
  2xl: "20px" # modals, hero glass panels
  full: "9999px" # avatar chips, pill labels only
effects:
  glow-violet: "0 0 60px rgba(139, 92, 246, 0.3)"
  glow-lime: "0 0 60px rgba(132, 204, 22, 0.3)"
  glass: "backdrop-filter: blur(12px)"
gradients:
  primary: "linear-gradient(135deg, #8b5cf6 0%, #84cc16 100%)"
  prism: "linear-gradient(135deg, #8b5cf6 0%, #10b981 50%, #84cc16 100%)"
  text-glow: "linear-gradient(135deg, #a78bfa 0%, #84cc16 100%)"
---

## Overview

AIOS is an open-source sibling to **Vibrana** — built from real AI-transformation work, released so any team can run it. The design system is deliberately aligned with vibrana.ai: same type system, same border-not-shadow elevation, same glow language, same fluid type scale. What shifts is the **primary color** (Vibrana's amber → AIOS violet) and the **accent** (emerald → lime).

What's new here versus the original website-only spec: this system is **dual-mode** (full light + dark, not dark-only) and **balanced in feel** — marketing surfaces read clean, spacious, and sans-led; application and CLI chrome read terminal-native, with monospace promoted from a code-only font to a structural UI voice for labels, metadata, and status. One system, dialed warmer or more technical depending on the surface.

**Personality:** structured and precise · practitioner-built · developer-first (code is visual content, the CLI is first-class) · ecosystem-native (clearly related to Vibrana) · quietly confident (minimal, the work speaks through structure).

**Emotional response:** "This came from people who actually ran this at scale. It's part of something larger. I can trust it and build on it."

**Relationship to vibrana.ai:** Same — type stack, border system, glow effects, fluid scale, spacing grid. Shifted — primary amber → violet `#8b5cf6`; accent emerald → lime `#84cc16`. The AIOS prism (`violet → emerald → lime`) shares its middle and tail with Vibrana's prism (`amber → lime → emerald`) — a deliberate visual handshake across the ecosystem.

**Proven-pattern lineage.** This system is calibrated against the best-in-class **Serious Enterprise** and **Clean SaaS** references on [styles.refero.design](https://styles.refero.design/) — specifically **Linear** (dark instrument-panel), **Mercury** (fintech / serious-enterprise), and **SpatialChat** (clean SaaS, light, violet). Patterns we deliberately adopt from them:
- **One rationed accent.** Linear & Mercury both reserve their single chromatic color for exactly one filled CTA per screen. We do the same with lime.
- **Authority through restraint.** Linear runs display weight 300/510, Mercury 360/480 — light display weights read more premium than 700. Weight `light (300)` is available; use 600–700 for marketing energy (vibrana parity), drop toward 500 for dense / serious-enterprise surfaces.
- **Mode-specific elevation.** SpatialChat (the light gold standard) lifts cards with an off-white canvas + white cards + a ≤6% shadow — glows look wrong on white and bare borders read as cutouts. So our elevation is per-mode (see Elevation & Depth).
- **Two-button hero rhythm** (filled primary + ghost-bordered secondary) and the **one-step radius gap** between control and container (button 6 → card 14) — both from SpatialChat's "feels intentional" discipline.
- **Near-black canvas, never `#000`; product-screenshot-as-hero; monospace only where precision matters** — straight from Linear's engineering-native voice.

> **Source of truth:** colors/type/spacing live in `tokens/*.json` and compile to `dist/tokens.css` (CSS vars), `dist/tailwind-theme.css` (Tailwind v4 bridge), and `dist/tokens.pencil.json` (Pencil variables). Change a value **here and in `tokens/` first**, then `npm run build:tokens` — never hand-edit a consuming repo. This file is the pinned design contract, the way `brain-api.md` is the pinned sync contract.

---

## Color Palette

The system carries two full palettes under one set of token names. Light is the `:root` default; adding `class="dark"` to `<html>` swaps the color values only (type, spacing, and radius never change between modes).

**Brand — Violet** (`--aios-primary`): `#8b5cf6` in dark, `#7c3aed` in light (the deeper shade reads correctly on white). The color that distinguishes AIOS within the Vibrana ecosystem; violet signals intelligence and systems-thinking. Use on: primary CTAs, active nav states, focus rings, badge text, section accent lines.

**Accent — Lime** (`--aios-accent`): `#84cc16` in both modes. The live/active color — a blinking terminal cursor, a running process. **Rationed: at most one filled lime action per screen.** Otherwise use it for eyebrow labels, checkmarks, active status dots, key-term code highlighting.

**Neutrals — light:** off-white canvas `#fafafa` with **white** card surfaces `#ffffff` (cards lift by being *brighter* than the canvas — the proven Clean-SaaS layering; do not invert it). Ink `rgba(15,15,17,.95 / .66 / .48)`; borders `rgba(0,0,0,.08 / .12 / .22)`.
**Neutrals — dark:** `#050505` → `#0a0a0a` → `#141414` → `#1a1a1a`; text `#fafafa`, muted `rgba(255,255,255,.5)`; borders `rgba(255,255,255,.1 / .15 / .24)`. Dark canvas is near-zero black, never pure `#000`.

**Supporting accents** (`--aios-cyan`, `--aios-fuchsia`): teal-cyan and fuchsia, one shade per mode. Used *only* for the tier/kind badge semantics (external/transcript = cyan, skill = fuchsia) — never as a second brand color in layout.

**Status:** destructive `#ef4444`; emerald `#10b981` (gradients + active nodes); amber `#f59e0b` (warnings only — never as a brand color; amber is Vibrana's territory).

**Contrast:** violet on its mode background ≈ 7:1 (AAA); lime ≈ 10:1 (dark) and used on dark text in light mode; muted-foreground is for short labels only (~AA), never long body copy.

---

## Typography

Mirrors the Vibrana stack exactly. Self-host all three via `@fontsource/*` — no Google Fonts CDN.

- **Space Grotesk** — all display and headings. A geometric sans with humanist quirks (the `a`, the `s`) that keep large headings from feeling generic.
- **Plus Jakarta Sans** — all body and UI copy. Neutral and highly legible where Space Grotesk is expressive: one carries personality, the other carries information.
- **JetBrains Mono** — code, **and** the structural UI voice: eyebrow labels, table headers, metadata, status text, keyboard hints, CLI commands. This is the balanced-feel lever — mono is how AIOS reads "developer tool" without going full terminal.

**Scale:** fluid `clamp()` from `label` to `display` (see frontmatter). Never override with fixed `px` — the fluid system is a shared ecosystem characteristic. Tracking tightens at display sizes (`-0.03em`), loosens for labels (`0.1em`, uppercase, mono). Leading: `1.1` headings, `1.5`–`1.7` body.

---

## Spacing & Shape

**Spacing:** 4px base grid. Tokens `--aios-space-1..32`. Card padding `24px`; section separation `80px` desktop / `48px` mobile; content max-width `1200px` with `24/48/80px` gutters (mobile/tablet/desktop). Density is **comfortable** on marketing, **compact** in app chrome (use `space-2`/`space-3` rhythm, not `space-6`).

**Radius:** slightly rounded, never soft — a professional tool, not a consumer toy. `sm 4` chips · `md 6` buttons/inputs · `lg 10` code/terminal · `xl 14` cards · `2xl 20` modals · `full` pills/avatars only. Keep **one step between a control's radius and its container's** (button `6` inside card `14`) — it's what makes the system feel deliberate.

**Elevation is mode-specific** — use the `--aios-shadow-*` tokens (or Tailwind `shadow-button/card/overlay`), which resolve correctly per mode:
- **Light:** hairline `border` **plus a subtle shadow ≤6% black** — `shadow-button` (`0 1px 2px`), `shadow-card` (`0 4px 16px`), `shadow-overlay` (`0 4px 28px`). On white, a pure border alone reads as a cutout and a glow looks wrong, so light leans on near-invisible shadows (the SpatialChat / Clean-SaaS pattern).
- **Dark:** step the surface up (`bg → surface → elevated`) and raise the border (`border → border-visible`); `shadow-button`/`shadow-card` resolve to `none`, and emphasis comes from a **glow** (`--aios-glow-violet` / `--aios-glow-lime`, 60px / 30%). Only floating menus get `shadow-overlay`.

Glass nav (both modes): `backdrop-filter: blur(12px)` over an 85%-opacity background.

---

## Components

Delivered as `@aios/ui` (React, extends shadcn). shadcn primitives are themed entirely through the Tailwind bridge — no per-component color overrides. AIOS-specific components carry the personality:

- **Button (primary):** violet bg, `primary-fg` text, `radius-md`. Hover → `primary-hover` + contained violet glow (`box-shadow: 0 0 20px rgba(139,92,246,.4)`), not a hard shadow.
- **Button (secondary):** transparent, `border-visible`; hover → `rgba(255,255,255,.04)` (dark) / `rgba(0,0,0,.03)` (light).
- **EyebrowLabel:** uppercase, mono, `label` size, lime, `0.1em` tracking — above every major section heading.
- **StatCluster:** three large Space Grotesk numbers with mono lime descriptors (Vibrana's `20 / 100+ / $50–250k` pattern).
- **CodeBlock / TerminalFrame:** `code-bg`, `radius-lg`, header bar with mono filename + a lime status dot (gray when static), copy button on hover. Show real commands (`aios push --tier team`), never lorem.
- **TierBadge / KindBadge:** the AIOS tier (`team` violet / `external` cyan / `admin` neutral) and item-kind color semantics, as pills (`radius-full`, `badge` style).
- **GlassNav:** logo left, nav center, CTA right; blurred 85% background; violet glow on the wordmark mark.
- **PrismGlow:** blurred prism-gradient pseudo-element behind hero headlines — ambient only.

---

## Do's and Don'ts

**Do**
- Ship both modes on every surface; switch with `class="dark"` on `<html>`. Light is `:root`.
- Pull every value from `--aios-*` tokens (or the Tailwind bridge utilities) — never hardcode a hex in a component.
- Promote monospace to labels, metadata, and status in app/CLI chrome — it's the "developer tool" signal.
- Ration lime to one filled action per screen; use it for labels/checks/status elsewhere.
- Self-host Space Grotesk, Plus Jakarta Sans, JetBrains Mono; keep the fluid `clamp()` scale.
- Show elevation with surface steps + borders; reach for a glow, never a drop shadow.
- Use the prism gradient for ambient hero glow and dividers; keep the brand legibly "Vibrana family."

**Don't**
- Don't use amber `#f59e0b` as a brand or accent color — it's Vibrana's primary, and warnings only here.
- Don't hardcode `px` text sizes or break the clamp scale.
- Don't add drop shadows to cards — borders only.
- Don't use Inter, Geist, Bricolage, or Hanken — the ecosystem fonts are Space Grotesk + Plus Jakarta Sans (this supersedes team-brain's old Bricolage/Hanken pairing).
- Don't apply the prism gradient directly to button text — it reads as generic SaaS.
- Don't use more than two accent colors per section (violet + lime; emerald only inside gradients).
- Don't use pure `#000` or pure `#fff` for app surfaces — use `--aios-bg` (`#050505` / `#ffffff`) and the surface steps.
