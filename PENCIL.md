# Pencil prototyping setup

Pencil's MCP can only act on a `.pen` file that is **open in the Pencil editor app**. Every Pencil MCP tool (even `get_guidelines`) errors with "A file needs to be open in the editor" until then. Opening the file is the one step an agent cannot do for you.

The source file (`aios-design.pen`) is **committed to this repo via Git LFS** — it is the source of truth for the product mockups and the Team Brain network-graph prototypes. So a fresh clone already has it; you just need Git LFS installed to materialize and open it.

## One-time setup (you do this)

1. Install **[Git LFS](https://git-lfs.com)** if you haven't: `git lfs install` (once per machine). If you cloned this repo *before* installing LFS, run `git lfs pull` — until then `aios-design.pen` is a tiny text pointer, not the real binary. (See the README's Prerequisites.)
2. Open the **Pencil.dev** desktop app, then open `aios-design.pen` from this folder (`aios-design/`). *(Starting a brand-new file instead? Save it with that exact name so it lands as the LFS-tracked file.)*
3. Leave it open and tell Claude "the pen file is open."

> Every Pencil save commits as a small LFS pointer plus a deduplicated LFS object, so the ~2 MB binary never bloats normal git history.

## What the agent does next (automated, once the file is open)

1. `get_editor_state({ include_schema: true })` — load the current `.pen` schema (required before any other Pencil tool).
2. `get_guidelines()` — load authoring conventions.
3. `set_variables(...)` — load `dist/tokens.pencil.json`:
   - `colorsLight` / `colorsDark` → color variables (two modes)
   - `font`, `text`, `weight`, `leading`, `tracking` → typography
   - `space`, `radius`, `gradient`, `glow` → layout + effects
4. `batch_design(...)` — build a **component sheet** (buttons, cards, inputs, badges, nav, eyebrow label, stat cluster, code block / terminal frame) and **canonical screens** (marketing hero, dashboard, workspace GUI shell) in both light and dark.
5. `get_screenshot` / `snapshot_layout` — verify the prototype matches the `@aios/ui` React output and `DESIGN.md`.

Tokens flow one way: `tokens/*.json` → `dist/tokens.pencil.json` → Pencil. Pencil is a prototyping/preview surface, never a second source of truth — change values in `tokens/` and rebuild, then re-run `set_variables`.
