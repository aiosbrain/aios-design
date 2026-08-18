# AIOS brand & logo audit — consolidation to one monochrome mark

**Date:** 2026-08-18 · **Trigger:** Chetan flagged that the logo in the site nav, the logo in
the shared-link OG card, and the logo in the video/campaign materials were three different
things. **Outcome:** design-system contract v0.4.0 (`DESIGN.md` § Brand & Logo) + a single
generated asset set published from `@aios-alpha/design`.

## What I found

Six mutually inconsistent AIOS logos were in circulation, with **no written logo rule anywhere**
— `DESIGN.md` had a colour palette, a type scale, and an effects layer, but nothing about the
mark, the wordmark, or the lockup. Every surface therefore invented its own.

| # | Where | What it was | Verdict |
|---|-------|-------------|---------|
| 1 | `aios-website` nav + footer (`AiosLogo.astro`) | Mono caret-A via CSS mask + live `AIOS` in Instrument Sans 600, all `currentColor` | **Correct.** This is the one Chetan likes; it became the contract. |
| 2 | `public/brand/aios-wordmark.svg` → the OG card | Custom traced letterforms: gradient `A`, lime `I`, white `OS` | **Retired.** The specific thing that was flagged. |
| 3 | `public/og.png` (via `scripts/generate-og.mjs`) | #2 on matte black, plus a violet→emerald→lime hairline rule and a lime dot | **Rebuilt** on the mono lockup. |
| 4 | `aios-marketing` campaign cover (`cover-image.html`) | A **hand-drawn stroked chevron** (`M10 108 L84 10 L158 108`, 20px round cap) + `AIOS` in Instrument **Serif** | **Retired.** Not the mark's geometry, not the brand's wordmark face. |
| 5 | `aios-team-brain/app/favicon.ico` | A plain solid white **triangle** | **Retired.** Not the caret-A at all. |
| 6 | `aios-workspace-gui/src-tauri/icons/*` | A **refracting prism with rainbow beams** on a violet-black square | **Retired.** A different symbol, and a literal reading of "prism" the brand never meant. |

Two structural causes, both now fixed:

1. **The design system shipped no brand assets.** `@aios-alpha/design` exported tokens, the
   Tailwind bridge, and Pencil variables — no logo. Any surface that needed a logo had to find
   a file in `aios-website/public/brand/` or draw one. Most drew one.
2. **The one place with a rule had it as a code comment.** `AiosLogo.astro` carries the correct
   policy ("the prism-coloured mark is reserved for the favicon — chrome stays greyscale") in a
   comment in one Astro file in one repo. Nothing propagated it.

Two smaller findings, also fixed:

- `aios-website/scripts/og-image.html` was a **dead** light-mode OG template, superseded by
  `generate-og.mjs` in PR #127 but never deleted — a second, contradictory source for the same
  artefact.
- `.claude/skills/aios-merch/reference/brand-style.md` pointed agents at the retired
  multicolour wordmark and called the prism gradient "the strongest single visual motif to
  reuse", which is how the gradient kept spreading onto type.

## The consolidation

**One logo. Monochrome. Shipped from the design system.**

- **Mark** — the caret-A, unchanged geometry. The only AIOS symbol.
- **Wordmark** — `AIOS` in Instrument Sans 600, tracking `0.01em`, outlined. Plain type, never
  custom letterforms, never recoloured. This is what the nav was already rendering as live text;
  it is now also available as a static asset, so the two can't diverge again.
- **Lockups** — horizontal (default) and stacked, both `currentColor`, with fixed metrics
  (mark = 1.30× cap height, gap = 0.78× cap height, clear space = one mark height).
- **Ink variants** — every mono asset also ships `-black` / `-white`, because `currentColor`
  does not resolve through `<img>`, a video editor, or a print RIP. This is what the video work
  needs: `aios-lockup-white.svg` drops straight into an editor.
- **Prism gradient** — allowed on the **bare mark only**, ≥48px, as a standalone moment
  (favicon, app icon, merch, hero/video sting). Never on letterforms, never inside a lockup.
  There is deliberately no gradient lockup asset to reach for.

## How it's enforced

- `DESIGN.md` § Brand & Logo is the contract, with a `logo:` frontmatter block so agents get the
  rule (including the retired-variants list) from structured data, not prose.
- `DESIGN.md` ships in the npm tarball, so any agent or repo that installs
  `@aios-alpha/design` has the current rule locally.
- Assets are **generated** — `brand/src/*.json` → `build/build-brand.mjs` → `dist/brand/*`, plus
  `react/components/aios/caret-a-path.ts` so `AiosLogo`/`AiosMark` compile from the same
  geometry. Nothing is hand-drawn or hand-edited.
- `test/design-contract.test.mjs` asserts every lockup carries exactly one ink and no gradient,
  that the prism treatment exists on exactly one asset, and that the React geometry has not
  drifted from the SVGs. CI additionally fails if the generated TS file isn't committed.
