# Pencil prototyping setup

Pencil's MCP can only act on a `.pen` file that is **open in the Pencil editor app**. Every Pencil MCP tool (even `get_guidelines`) errors with "A file needs to be open in the editor" until then. Creating/opening the file is the one step an agent cannot do for you.

## One-time setup (you do this)

1. Open the **Pencil.dev** desktop app.
2. Create a new file and save it as `aios.pen` in this folder (`aios-design/`).
3. Leave it open and tell Claude "the pen file is open."

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
