# design-sync notes — aios-design

- The DS is two packages: tokens at repo root (`@aios-alpha/design`, style-dictionary → `dist/tokens.css`) and the React library in `react/` (`@aios-alpha/ui`). The sync targets `react/` — entry `./react/dist/index.js`, node_modules `react/node_modules`.
- **CSS must be compiled through the repo's vite/Tailwind v4 build** (`cfg.buildCmd` does it): `npx vite build --base ./ --outDir .ds-css-build` then copy the hashed CSS to `assets/compiled.css` (same dir as the emitted font files so relative `url()`s resolve). `--base ./` is required — the default base emits absolute `/assets/...` font URLs the converter can't resolve.
- **Compiled Tailwind ships only utilities used in repo sources** (components + `src/KitchenSink.tsx`). Authored previews must not rely on arbitrary/size classes outside that set — `size-8`, `size-12`, `w-[480px]`, `h-56` silently no-op (bit AiosMark + PrismGlow previews; fixed with inline styles). Prefer classes copied from KitchenSink or inline `style={{…}}`.
- `src/KitchenSink.tsx` is the canonical composition source for every component — port previews from it.
- No provider needed; no Storybook (shape=package). Playwright for the render check: cached chromium builds live in `~/Library/Caches/ms-playwright/`; chromium-1228 ⇒ playwright@1.61.0 (installed into `.ds-sync/`).
- Overlay/wide overrides in config: `Dialog` cardMode single 720x480 (radix portal escapes the card otherwise), `GlassNav` cardMode column.
- 16 compound subcomponents (CardHeader, Dialog*, Tabs* etc.) deliberately ship floor cards — their real render lives in the parent's preview.

## Known render warns

- `[FONT_MISSING] "Fira Code"` — fallback-only family in the mono token stack (`"JetBrains Mono", "Fira Code", Consolas, monospace`); JetBrains Mono ships, Fira Code never renders. Accepted.
- `(.d.ts parse check skipped — typescript not in node_modules)` on early validate runs — typescript was added to `.ds-sync/`; harmless if it reappears.

## Re-sync risks

- `react/.ds-css-build/` is gitignored build output — a fresh clone must run `cfg.buildCmd` before the converter or `cssEntry` won't exist.
- Preview content (AIOS copy in Card/Tabs/Dialog previews) mirrors KitchenSink; if the product copy or component APIs change, previews still compile but may drift from real usage — regrade on major bumps.
- The compiled-CSS utility subset grows/shrinks with repo source; a preview that graded good can lose a class if KitchenSink stops using it. The render check will catch layout collapse, not subtle degradation.
- Dark mode is verified only via tokens (light `:root` default); no dark-mode screenshot pass was run.
- `.ds-sync/` converter deps pin playwright@1.61.0 against the chromium-1228 cache — a playwright cache cleanup breaks the render check (reinstall the matching pair).
