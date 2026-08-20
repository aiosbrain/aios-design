// The one rule this repo cares most about: the AIOS wordmark is NEVER coloured, and the
// lockups a UI consumes are monochrome (DESIGN.md § Brand & Logo).
//
// The node suite already asserts that over the generated SVG assets in dist/brand and over
// the export list in index.ts. Neither of those sees what React actually RENDERS. A
// component can acquire a fill through a prop, an inline style, or a defs block that no
// asset test would ever look at — and the one production violation on record arrived
// exactly that way, through inherited colour that no line in the repo authored. These
// tests read the rendered DOM.
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { AiosLogo, AiosMark } from "../index.js";
import type { AiosLogoVariant } from "../index.js";
import { WORDMARK_PATH } from "../components/aios/caret-a-path.js";

const VARIANTS: AiosLogoVariant[] = ["horizontal", "stacked", "mark", "wordmark"];

/** Any literal colour: hex, rgb()/rgba(), hsl(), or a CSS named colour we'd notice. */
const COLOUR_LITERAL = /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(|\b(?:red|blue|green|violet|lime|cyan|fuchsia|amber|emerald)\b/i;

/** The fill an element actually paints with: its own `fill`, else the nearest ancestor's. */
function resolvedFill(el: Element): string | null {
  for (let node: Element | null = el; node; node = node.parentElement) {
    const own = node.getAttribute("fill");
    if (own) return own;
    const inline = (node as HTMLElement).style?.fill;
    if (inline) return inline;
  }
  return null;
}

function renderLogo(variant: AiosLogoVariant, props: Record<string, unknown> = {}) {
  const { container } = render(<AiosLogo variant={variant} {...props} />);
  const svg = container.querySelector("svg");
  expect(svg, `variant ${variant} rendered no <svg>`).toBeTruthy();
  return svg!;
}

describe("AiosLogo", () => {
  test.each(VARIANTS)("%s renders a labelled svg with drawn geometry", (variant) => {
    const svg = renderLogo(variant);
    expect(svg.getAttribute("role")).toBe("img");
    expect(svg.getAttribute("aria-label")).toBe("AIOS");
    // A viewBox with a real, positive extent — a zero-width box renders nothing at all.
    const [, , w, h] = (svg.getAttribute("viewBox") ?? "").split(" ").map(Number);
    expect(w).toBeGreaterThan(0);
    expect(h).toBeGreaterThan(0);
    const paths = [...svg.querySelectorAll("path")];
    expect(paths.length).toBe(variant === "mark" || variant === "wordmark" ? 1 : 2);
    for (const p of paths) expect((p.getAttribute("d") ?? "").length).toBeGreaterThan(10);
  });

  test.each(VARIANTS)("%s paints every path in currentColor and carries no gradient", (variant) => {
    const svg = renderLogo(variant);
    for (const path of svg.querySelectorAll("path")) {
      expect(resolvedFill(path)).toBe("currentColor");
      expect(path.getAttribute("stroke")).toBeNull();
    }
    expect(svg.querySelector("linearGradient, radialGradient, stop")).toBeNull();
    expect(svg.outerHTML).not.toMatch(COLOUR_LITERAL);
  });

  // The retired treatment was a gradient/lime/white WORDMARK. There is deliberately no
  // gradient lockup, so wherever the wordmark geometry appears, nothing in the same svg
  // may be a gradient — including in the mark beside it.
  test.each(VARIANTS)("%s never puts a gradient in the same svg as the wordmark", (variant) => {
    const svg = renderLogo(variant);
    const hasWordmark = [...svg.querySelectorAll("path")].some(
      (p) => p.getAttribute("d") === WORDMARK_PATH,
    );
    expect(hasWordmark).toBe(variant !== "mark");
    if (hasWordmark) expect(svg.querySelector("defs")).toBeNull();
  });

  // A consumer passing `fill` (or a framework injecting one) must not be able to recolour
  // the letterforms: the <g fill="currentColor"> wrapper is what makes the ink follow the
  // surrounding text colour instead of an accent. Losing it is how Starlight's
  // --sl-color-text-accent shipped a violet wordmark.
  test("a consumer-supplied fill cannot reach the letterforms", () => {
    const svg = renderLogo("horizontal", { fill: "#8b5cf6" });
    for (const path of svg.querySelectorAll("path")) {
      expect(resolvedFill(path)).toBe("currentColor");
    }
  });

  test("className and svg props pass through to the root element", () => {
    const svg = renderLogo("horizontal", { className: "h-6", "data-testid": "logo" });
    expect(svg.getAttribute("class")).toBe("h-6");
    expect(svg.getAttribute("data-testid")).toBe("logo");
  });

  test("the default variant is the horizontal lockup", () => {
    const { container } = render(<AiosLogo />);
    expect(container.querySelector("svg")!.outerHTML).toBe(renderLogo("horizontal").outerHTML);
  });
});

describe("AiosMark", () => {
  test("is monochrome by default", () => {
    const { container } = render(<AiosMark />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-label")).toBe("AIOS");
    expect(svg.querySelector("path")!.getAttribute("fill")).toBe("currentColor");
    expect(svg.querySelector("defs")).toBeNull();
    expect(svg.outerHTML).not.toMatch(COLOUR_LITERAL);
  });

  // The prism gradient is sanctioned on the BARE mark only, and its three stops are the
  // same ones baked into dist/brand/aios-mark-prism.svg.
  test("prism paints the mark with the three canonical stops and nothing else", () => {
    const { container } = render(<AiosMark prism />);
    const svg = container.querySelector("svg")!;
    const stops = [...svg.querySelectorAll("stop")].map((s) => s.getAttribute("stop-color"));
    expect(stops).toEqual(["#8b5cf6", "#10b981", "#84cc16"]);
    const gradientId = svg.querySelector("linearGradient")!.getAttribute("id")!;
    expect(svg.querySelector("path")!.getAttribute("fill")).toBe(`url(#${gradientId})`);
    // Still one path: the prism mark is the symbol alone, never a lockup.
    expect(svg.querySelectorAll("path").length).toBe(1);
  });

  // Two marks on one page must not collide on the gradient id — a duplicate id makes the
  // second instance paint from the first's defs, which is invisible until someone changes one.
  test("two prism marks get distinct gradient ids", () => {
    const { container } = render(
      <>
        <AiosMark prism />
        <AiosMark prism />
      </>,
    );
    const ids = [...container.querySelectorAll("linearGradient")].map((g) => g.getAttribute("id"));
    expect(ids.length).toBe(2);
    expect(new Set(ids).size).toBe(2);
    for (const id of ids) expect(id).toMatch(/^aios-prism-/);
  });

  // `mono` is retired but still accepted; it must be inert, not a second colour switch.
  test("the deprecated mono prop is accepted and ignored", () => {
    const { container: withMono } = render(<AiosMark mono />);
    const { container: plain } = render(<AiosMark />);
    expect(withMono.innerHTML).toBe(plain.innerHTML);
    expect(withMono.querySelector("svg")!.hasAttribute("mono")).toBe(false);
  });
});
