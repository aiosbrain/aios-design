# AIOS Design System — build conventions

**Aesthetic: Editorial Minimal.** Greyscale chrome; color is rationed to badges, status dots, and data viz. Primary actions are near-black pills (white in dark mode) — no glows, no drop shadows, elevation comes from hairline borders. Display type is Instrument Serif (single weight, never bold it), body/UI is Instrument Sans, labels/code are JetBrains Mono.

## Setup

No provider is required — components work standalone. Light is the default; add `class="dark"` on `<html>` to switch the whole tree to dark mode (all tokens flip automatically). Fonts self-host through `styles.css`; never pull Google Fonts.

## Styling idiom

Tailwind utilities over semantic tokens. Style your own layout glue with these families (all resolve to `--aios-*` CSS variables):

- Surfaces: `bg-background`, `bg-card`, `bg-muted`, `bg-popover`, `bg-primary`, `bg-transparent`
- Text: `text-foreground`, `text-muted-foreground`, `text-primary-foreground`, `text-card-foreground`, `text-destructive`
- Borders: `border-border` (the hairline), `border-input`
- Accent hues (badges/data-viz ONLY, never large fills): `bg-/text-/border-` + `violet`, `lime`, `emerald`, `cyan`, `amber`, `fuchsia`
- Fonts: `font-display` (Instrument Serif — headings), `font-mono` (JetBrains Mono — eyebrows, labels, code); body is Instrument Sans by default
- Type scale via tokens: `text-[length:var(--aios-text-display)]` and the same pattern with `--aios-text-h1/h2/h3/body-lg/body/small/label`

Heading recipe: `font-display font-normal leading-tight tracking-[-0.02em] text-foreground`. Eyebrow/label recipe: `font-mono text-[length:var(--aios-text-label)] uppercase tracking-[0.1em] text-muted-foreground` (or use `EyebrowLabel`).

**Caveat — the shipped stylesheet is compiled, not a full Tailwind runtime.** Only utilities used by the library itself are guaranteed present. The families enumerated above are safe; for one-off sizes/positions prefer inline `style={{…}}` or `var(--aios-*)` values over exotic arbitrary-value classes.

Raw CSS variables (for inline styles / custom CSS): colors `--aios-bg`, `--aios-fg`, `--aios-fg-muted`, `--aios-border`, `--aios-primary`, `--aios-primary-hover`; radii `--aios-radius-sm/md/lg/xl/2xl/full`; fonts `--aios-font-display/body/mono`; layout `--aios-layout-max-width`, `--aios-layout-gutter`.

## Where the truth lives

Read `styles.css` → `_ds_bundle.css` (all tokens are defined in its `:root` / `.dark` blocks) before inventing a value. Each component ships `<Name>.prompt.md` with its props and working examples — compose from those.

## Idiomatic build snippet

```tsx
const { GlassNav, AiosMark, Button, EyebrowLabel, Card, CardHeader, CardTitle, CardDescription } = window.AiosUI;

<div className="min-h-screen bg-background text-foreground">
  <GlassNav
    logo={<span className="flex items-center gap-2"><AiosMark className="size-5" /><span className="font-display text-xl tracking-tight">AIOS</span></span>}
    cta={<Button size="sm">Get started</Button>}
  />
  <main className="mx-auto flex max-w-[880px] flex-col gap-6 px-8 py-20">
    <EyebrowLabel>Foundations</EyebrowLabel>
    <h1 className="font-display text-[length:var(--aios-text-h1)] font-normal leading-tight tracking-[-0.02em]">
      One design system for every AIOS surface.
    </h1>
    <Card>
      <CardHeader>
        <CardTitle>Team Brain</CardTitle>
        <CardDescription>The one shared hub.</CardDescription>
      </CardHeader>
    </Card>
  </main>
</div>
```

AIOS-specific parts: `TierBadge` (`team`/`external`/`admin`), `KindBadge` (content kinds), `KpiStat` (metric card with sparkline — pass a hex `accent`), `StatCluster`, `TerminalFrame`/`CodeBlock` (mono code frames), `PrismGlow` (decorative hero glow — give it explicit inline width/height and position it absolutely behind content).
