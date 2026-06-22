# @aios-alpha/design

The one design system for every AIOS surface — website, team brain, workspace GUI, and every scaffolded workspace. Dual-mode (light + dark), token-driven, sibling to vibrana.ai (violet + lime).

- **`DESIGN.md`** — the human- and agent-readable contract. Hand this to Claude Code / Cursor to align any UI. Pinned design contract (like `brain-api.md` is for sync).
- **`tokens/*.json`** — DTCG source of truth. Edit here, then rebuild.
- **`dist/`** — generated, do not hand-edit:
  - `tokens.css` — CSS custom properties. `:root` = light; `.dark` = dark overrides.
  - `tailwind-theme.css` — Tailwind v4 `@theme inline` bridge (shadcn utility names → `--aios-*`).
  - `tokens.pencil.json` — flat maps for the Pencil MCP `set_variables`.
- **`react/`** — `@aios-alpha/ui`, the shadcn-based React component layer.

## Build

```bash
npm install
npm run build:tokens   # regenerates everything in dist/
```

## Consume

**Next.js / Vite / any Tailwind v4 app** — in your global stylesheet, in this order:

```css
@import "@aios-alpha/design/tokens.css";
@import "@aios-alpha/design/tailwind-theme.css";
@import "tailwindcss";
```

Then use shadcn/Tailwind utilities (`bg-background`, `text-foreground`, `border-border`, `bg-primary`, `bg-lime`, `font-display`, `font-mono`, `rounded-lg`) — they resolve to the runtime `--aios-*` vars and switch when you add `class="dark"` to `<html>`. In Next, drive that with `next-themes`; elsewhere, toggle the class directly.

**Astro / Starlight** — import `tokens.css` and map the `--aios-*` vars onto Starlight's `--sl-*` variables (see `aios-website`).

**Raw CSS (no Tailwind)** — import `tokens.css` and reference `var(--aios-*)` directly.

## Light vs dark

Light is the `:root` default. Adding `class="dark"` on `<html>` swaps only color values; type, spacing, and radius are mode-independent.

## Pencil prototyping

`dist/tokens.pencil.json` holds the token values as flat maps (`colorsLight`, `colorsDark`, `font`, `text`, `space`, `radius`, `gradient`, …). With a `.pen` file open in the Pencil editor, the Pencil MCP loads these via `set_variables` so prototypes stay bound to the same tokens. See `PENCIL.md`. Tokens flow one way: `tokens/*.json` → `dist/tokens.pencil.json` → Pencil.
