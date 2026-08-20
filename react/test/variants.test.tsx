// Variant and prop APIs: every documented variant must produce a DISTINGUISHABLE result,
// and the mappings that carry meaning (tier, kind, delta direction) must map to what
// DESIGN.md says they map to. A variant that silently collapses onto another one is a
// design-system bug that looks like nothing in review.
import { act, render, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import {
  Badge,
  Button,
  GlassNav,
  KindBadge,
  KpiStat,
  PrismGlow,
  Separator,
  StatCluster,
  TerminalFrame,
  TierBadge,
  badgeVariants,
  buttonVariants,
  cn,
} from "../index.js";

const classesOf = (html: HTMLElement, selector = "*") =>
  (html.querySelector(selector)!.getAttribute("class") ?? "").split(/\s+/);

describe("Button", () => {
  const VARIANTS = ["default", "secondary", "ghost", "link", "destructive"] as const;
  const SIZES = ["sm", "md", "lg"] as const;

  test("every variant produces a distinct class string", () => {
    const rendered = VARIANTS.map((variant) => buttonVariants({ variant }));
    expect(new Set(rendered).size).toBe(VARIANTS.length);
  });

  test("every size produces a distinct class string", () => {
    const rendered = SIZES.map((size) => buttonVariants({ size }));
    expect(new Set(rendered).size).toBe(SIZES.length);
  });

  test("the default variant is the editorial primary pill at size md", () => {
    expect(buttonVariants({})).toBe(buttonVariants({ variant: "default", size: "md" }));
    const { container } = render(<Button>Push</Button>);
    const cls = classesOf(container, "button");
    expect(cls).toContain("bg-primary");
    expect(cls).toContain("text-primary-foreground");
    expect(cls).toContain("rounded-full");
    expect(cls).toContain("h-10");
  });

  // The editorial direction is explicit that buttons carry no glow and no drop shadow.
  test.each(VARIANTS)("%s carries no shadow or glow", (variant) => {
    expect(buttonVariants({ variant })).not.toMatch(/\bshadow-|drop-shadow/);
  });

  test("consumer classes win over the variant's own", () => {
    const { container } = render(<Button className="rounded-none">Push</Button>);
    const cls = classesOf(container, "button");
    // twMerge must drop the variant's rounded-full, not keep both.
    expect(cls).toContain("rounded-none");
    expect(cls).not.toContain("rounded-full");
  });

  test("asChild renders the child element instead of a button", () => {
    const { container } = render(
      <Button asChild>
        <a href="/docs">Docs</a>
      </Button>,
    );
    expect(container.querySelector("button")).toBeNull();
    const anchor = container.querySelector("a")!;
    expect(anchor.getAttribute("href")).toBe("/docs");
    expect(anchor.getAttribute("class")).toContain("bg-primary");
  });

  test("the ref reaches the underlying element and handlers fire", () => {
    const onClick = vi.fn();
    let node: HTMLButtonElement | null = null;
    const { container } = render(
      <Button ref={(el) => { node = el; }} onClick={onClick}>
        Push
      </Button>,
    );
    expect(node).toBe(container.querySelector("button"));
    fireEvent.click(container.querySelector("button")!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("Badge", () => {
  const VARIANTS = ["default", "lime", "emerald", "neutral", "destructive", "outline"] as const;

  test("every variant produces a distinct class string", () => {
    expect(new Set(VARIANTS.map((variant) => badgeVariants({ variant }))).size).toBe(VARIANTS.length);
  });

  test("the default badge is the violet brand pill", () => {
    const { container } = render(<Badge>tier</Badge>);
    const cls = classesOf(container, "span");
    expect(cls).toContain("text-violet");
    expect(cls).toContain("rounded-full");
  });
});

describe("TierBadge", () => {
  // docs/tier-vocabulary.md: team / external / admin. The colour mapping is contract.
  const EXPECTED: Record<string, string> = {
    team: "text-violet",
    external: "text-cyan",
    admin: "text-muted-foreground",
  };

  test.each(Object.entries(EXPECTED))("%s renders its label in %s", (tier, ink) => {
    const { container } = render(<TierBadge tier={tier} />);
    const span = container.querySelector("span")!;
    expect(span.textContent).toBe(tier);
    expect(span.getAttribute("class")).toContain(ink);
  });

  test("the three tiers are visually distinct from each other", () => {
    const inks = Object.keys(EXPECTED).map(
      (tier) => render(<TierBadge tier={tier} />).container.querySelector("span")!.getAttribute("class"),
    );
    expect(new Set(inks).size).toBe(3);
  });

  // Default-deny: an unknown tier must fall back to the LEAST permissive-looking styling,
  // never to the team/external brand inks that read as "shared".
  test("an unrecognised tier falls back to the neutral admin styling", () => {
    const { container } = render(<TierBadge tier="superuser" />);
    const cls = container.querySelector("span")!.getAttribute("class")!;
    expect(cls).toContain("text-muted-foreground");
    expect(cls).not.toMatch(/text-violet|text-cyan/);
  });
});

describe("KindBadge", () => {
  const EXPECTED: Record<string, string> = {
    deliverable: "text-violet",
    transcript: "text-cyan",
    decision: "text-amber",
    task: "text-emerald",
    skill: "text-fuchsia",
    artifact: "text-muted-foreground",
  };

  test.each(Object.entries(EXPECTED))("%s renders in %s", (kind, ink) => {
    const { container } = render(<KindBadge kind={kind} />);
    expect(container.querySelector("span")!.getAttribute("class")).toContain(ink);
  });

  test("all six kinds are distinguishable", () => {
    const inks = Object.keys(EXPECTED).map(
      (kind) => render(<KindBadge kind={kind} />).container.querySelector("span")!.getAttribute("class"),
    );
    expect(new Set(inks).size).toBe(6);
  });

  test("an unknown kind falls back to artifact", () => {
    const unknown = render(<KindBadge kind="wat" />).container.querySelector("span")!.getAttribute("class");
    const artifact = render(<KindBadge kind="artifact" />).container.querySelector("span")!.getAttribute("class");
    expect(unknown).toBe(artifact);
  });
});

describe("KpiStat", () => {
  test("delta direction drives the ink, and only the delta and sparkline carry colour", () => {
    const up = render(<KpiStat label="pushes" value="1,284" delta="+12%" deltaTone="up" />);
    const down = render(<KpiStat label="pushes" value="1,284" delta="-4%" deltaTone="down" />);
    const deltaOf = (r: ReturnType<typeof render>) =>
      [...r.container.querySelectorAll("span")].find((s) => s.textContent!.includes("%"))!;
    expect(deltaOf(up).style.color).toBe("rgb(16, 185, 129)"); // emerald
    expect(deltaOf(down).style.color).toBe("rgb(239, 68, 68)"); // red
    // The label and the big value stay token-driven, never inline-coloured.
    for (const span of up.container.querySelectorAll("span")) {
      if (!span.textContent!.includes("%") && span.textContent) expect(span.style.color).toBe("");
    }
  });

  test("no delta renders no delta element", () => {
    const { container } = render(<KpiStat label="pushes" value="12" />);
    expect([...container.querySelectorAll("span")].some((s) => s.textContent!.includes("%"))).toBe(false);
  });

  test("sparkline heights are clamped into 8%..100% for out-of-range data", () => {
    const { container } = render(
      <KpiStat label="pushes" value="12" spark={[-5, 0, 0.5, 1, 42]} accent="#84cc16" />,
    );
    const bars = [...container.querySelectorAll("[aria-hidden] span")] as HTMLElement[];
    expect(bars.length).toBe(5);
    const heights = bars.map((b) => Number.parseInt(b.style.height, 10));
    expect(heights).toEqual([8, 8, 50, 100, 100]);
    for (const bar of bars) {
      expect(bar.style.backgroundColor).toBe("rgb(132, 204, 22)");
      const opacity = Number(bar.style.opacity);
      expect(opacity).toBeGreaterThanOrEqual(0.5);
      expect(opacity).toBeLessThanOrEqual(1);
    }
  });
});

describe("PrismGlow", () => {
  test("is decorative, non-interactive, and paints the gradient token", () => {
    const { container } = render(<PrismGlow />);
    const div = container.firstElementChild as HTMLElement;
    expect(div.getAttribute("aria-hidden")).toBe("true");
    expect(div.className).toContain("pointer-events-none");
    // The gradient comes from the token bridge, never from a literal in this repo.
    expect(div.style.background).toBe("var(--aios-gradient-prism)");
  });

  test("a consumer style merges without dropping the gradient", () => {
    const { container } = render(<PrismGlow style={{ width: "20rem" }} />);
    const div = container.firstElementChild as HTMLElement;
    expect(div.style.width).toBe("20rem");
    expect(div.style.background).toBe("var(--aios-gradient-prism)");
  });
});

describe("GlassNav", () => {
  test("renders logo, links and CTA, and elevates with a border rather than a shadow", () => {
    const { container, getByText } = render(
      <GlassNav logo={<span>LOGO</span>} links={<a href="#docs">Docs</a>} cta={<Button>Start</Button>} />,
    );
    expect(getByText("LOGO")).toBeTruthy();
    expect(getByText("Docs")).toBeTruthy();
    expect(getByText("Start")).toBeTruthy();
    const nav = container.querySelector("nav")!;
    expect(nav.className).toContain("border-border");
    expect(nav.className).not.toMatch(/\bshadow-/);
    expect((nav as HTMLElement).style.backgroundColor).toContain("var(--aios-bg)");
  });

  test("the links slot is omitted entirely when no links are given", () => {
    const { container } = render(<GlassNav logo={<span>LOGO</span>} />);
    expect(container.querySelector("nav")!.querySelectorAll("div").length).toBe(2);
  });
});

describe("TerminalFrame", () => {
  test("live and static status render different dots", () => {
    const live = render(<TerminalFrame code="aios push" status="live" />).container.outerHTML;
    const still = render(<TerminalFrame code="aios push" status="static" />).container.outerHTML;
    expect(live).toContain("bg-lime");
    expect(still).not.toContain("bg-lime");
    expect(live).not.toBe(still);
  });

  test("the copy button copies the code body", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const { getByLabelText } = render(<TerminalFrame code="aios pull --tier team" />);
    fireEvent.click(getByLabelText("Copy"));
    expect(writeText).toHaveBeenCalledWith("aios pull --tier team");
  });

  // The copy confirmation lives in a .then() callback: without awaiting it, the button
  // silently never acknowledges the copy and no assertion notices.
  test("the copy button confirms, then reverts after the timeout", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      const writeText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
      const { container, getByLabelText } = render(<TerminalFrame code="aios push" />);
      const copyIcon = container.querySelector("button svg")!.getAttribute("class");
      await act(async () => {
        fireEvent.click(getByLabelText("Copy"));
      });
      const confirmedIcon = container.querySelector("button svg")!;
      expect(confirmedIcon.getAttribute("class")).not.toBe(copyIcon);
      expect(confirmedIcon.getAttribute("class")).toContain("text-lime");
      await act(async () => {
        vi.advanceTimersByTime(1600);
      });
      expect(container.querySelector("button svg")!.getAttribute("class")).toBe(copyIcon);
    } finally {
      vi.useRealTimers();
    }
  });

  test("the filename defaults to terminal and the code body is rendered verbatim", () => {
    const { container } = render(<TerminalFrame code="aios push" />);
    expect(container.textContent).toContain("terminal");
    expect(container.querySelector("pre code")!.textContent).toBe("aios push");
  });
});

describe("Separator", () => {
  test("orientation changes the axis classes and the a11y role", () => {
    const horizontal = render(<Separator />).container.firstElementChild!;
    const vertical = render(<Separator orientation="vertical" />).container.firstElementChild!;
    expect(horizontal.className).toContain("h-px");
    expect(vertical.className).toContain("w-px");
    expect(horizontal.className).not.toBe(vertical.className);
    // decorative defaults to true, so the separator is hidden from assistive tech.
    expect(horizontal.getAttribute("role")).toBe("none");
    const semantic = render(<Separator decorative={false} />).container.firstElementChild!;
    expect(semantic.getAttribute("role")).toBe("separator");
  });
});

describe("StatCluster", () => {
  test("renders one value/label pair per stat", () => {
    const { container } = render(
      <StatCluster stats={[{ value: "12", label: "repos" }, { value: "99%", label: "coverage" }]} />,
    );
    expect(container.querySelectorAll("span").length).toBe(4);
    expect(container.textContent).toBe("12repos99%coverage");
  });

  test("an empty stat list renders an empty cluster rather than throwing", () => {
    const { container } = render(<StatCluster stats={[]} />);
    expect(container.firstElementChild!.children.length).toBe(0);
  });
});

describe("cn", () => {
  test("resolves conflicting tailwind utilities last-wins", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-violet", false && "text-cyan", undefined)).toBe("text-violet");
  });
});
