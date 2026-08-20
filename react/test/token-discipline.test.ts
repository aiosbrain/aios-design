// @vitest-environment node
// Token discipline over the component sources.
//
// DESIGN.md: values that a token already represents must be referenced through that token,
// including inside SVG and inline style. A hex literal in a component is a fork of the
// design system that no consumer can retheme and no token change can reach. These two
// tests are the ratchet: the exceptions are enumerated, so a NEW literal fails even though
// the existing ones are grandfathered and named.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

const root = fileURLToPath(new URL("..", import.meta.url));

function sources(dir: string, out: Record<string, string> = {}) {
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) sources(rel, out);
    else if (/\.tsx?$/.test(entry.name)) out[rel] = readFileSync(join(root, rel), "utf8");
  }
  return out;
}

const SOURCES: Record<string, string> = {
  ...sources("components"),
  ...sources("lib"),
  "index.ts": readFileSync(join(root, "index.ts"), "utf8"),
};

/** Files allowed to contain a raw colour, and the exact literals each may contain.
 *  Each entry is a deliberate, documented exception — not a licence to add more. */
const COLOUR_EXCEPTIONS: Record<string, string[]> = {
  // The prism gradient stops, byte-identical to dist/brand/aios-mark-prism.svg. They are
  // brand geometry generated alongside the SVG assets, not a themeable surface colour.
  "components/aios/AiosMark.tsx": ["#8b5cf6", "#10b981", "#84cc16"],
  // Data-viz inks: delta up/down. Editorial rule rations colour to data viz, and these are
  // the same two values the brain's charts use. Candidates for a --aios-* data token.
  "components/aios/KpiStat.tsx": ["#10b981", "#ef4444"],
  // The live-status dot's glow, inside an arbitrary Tailwind shadow value. This duplicates
  // --aios-lime and should migrate to color-mix() against the token.
  "components/aios/TerminalFrame.tsx": ["rgba(132,204,22,0.6)"],
};

// No \b before rgb/hsl: the one in TerminalFrame sits inside an arbitrary Tailwind
// value (shadow-[0_0_8px_rgba(...)]) where the preceding char is a word char.
const COLOUR_LITERAL = /#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi;
/** A fresh, non-global matcher — `.test()` on a /g regex is stateful and would skip files. */
const hasColourLiteral = (src: string) => new RegExp(COLOUR_LITERAL.source, "i").test(src);

describe("colour literals", () => {
  test("only the enumerated files carry raw colour", () => {
    const offenders = Object.keys(SOURCES).filter((file) => hasColourLiteral(SOURCES[file]));
    expect(offenders.sort()).toEqual(Object.keys(COLOUR_EXCEPTIONS).sort());
  });

  test.each(Object.entries(COLOUR_EXCEPTIONS))("%s carries only its documented literals", (file, allowed) => {
    const found = [...new Set(SOURCES[file].match(COLOUR_LITERAL) ?? [])];
    expect(found.sort()).toEqual([...allowed].sort());
  });
});

describe("theme mode comes from the token bridge", () => {
  // Light/dark is a `.dark` class on <html> that reroutes the --aios-* variables. A
  // component that reads the mode itself (matchMedia, a theme context, localStorage)
  // renders a second source of truth that the bridge cannot switch.
  test("no component detects or stores the colour mode", () => {
    for (const [file, src] of Object.entries(SOURCES)) {
      expect(src, `${file} must not detect the colour mode`).not.toMatch(
        /matchMedia|prefers-color-scheme|localStorage|document\.documentElement/,
      );
    }
  });

  test("dark-mode differences are expressed as `dark:` variants, and there are some", () => {
    const darkVariants = Object.values(SOURCES).flatMap((src) => src.match(/dark:[\w[\]().\/-]+/g) ?? []);
    expect(darkVariants.length).toBeGreaterThan(0);
    // A `dark:` utility carrying a hex would defeat the bridge entirely.
    for (const variant of darkVariants) expect(variant).not.toMatch(/#[0-9a-f]{3,8}/i);
  });
});

describe("typography and spacing come from tokens", () => {
  // Sizes are set as text-[length:var(--aios-text-*)] so a type-scale change in
  // tokens/type.json reaches every component. A bare text-[15px] is a fork.
  // The three badge pills predate the label token and still set text-[11px] directly.
  // Enumerated so they cannot spread: any other file with a raw px size fails here.
  const PX_SIZE_EXCEPTIONS = [
    "components/aios/KindBadge.tsx",
    "components/aios/TierBadge.tsx",
    "components/ui/badge.tsx",
  ];

  test("raw px font sizes are confined to the enumerated badge pills", () => {
    const offenders = Object.keys(SOURCES).filter((file) =>
      /text-\[\d+px\]|fontSize:\s*["'`]?\d/.test(SOURCES[file]),
    );
    expect(offenders.sort()).toEqual([...PX_SIZE_EXCEPTIONS].sort());
  });

  test("every arbitrary text-[length:...] value resolves through an --aios-* token", () => {
    const lengths = Object.values(SOURCES).flatMap((src) => src.match(/text-\[length:[^\]]+\]/g) ?? []);
    expect(lengths.length).toBeGreaterThan(0);
    for (const length of lengths) expect(length).toMatch(/var\(--aios-[\w-]+\)/);
  });
});
