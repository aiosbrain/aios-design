// The published surface of @aios-alpha/ui: what is exported, that every exported
// component actually mounts, and that nothing in the default surface is coloured.
//
// `npm run check:exports` only proves dist/index.js can be imported. It never calls a
// component, so a component that throws on mount (a bad hook order, a missing context,
// a null deref in default props) ships green. These tests mount every one of them.
import type * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import * as ui from "../index.js";

/** Every name index.ts exports, in the order it exports them. Adding a component means
 *  adding it here AND to FIXTURES below — that is the point: a new export cannot reach
 *  npm without a test that mounts it. */
const EXPECTED_EXPORTS = [
  "cn",
  "Button",
  "buttonVariants",
  "Card",
  "CardHeader",
  "CardTitle",
  "CardDescription",
  "CardContent",
  "CardFooter",
  "Input",
  "Badge",
  "badgeVariants",
  "Tabs",
  "TabsList",
  "TabsTrigger",
  "TabsContent",
  "Separator",
  "Dialog",
  "DialogTrigger",
  "DialogClose",
  "DialogPortal",
  "DialogOverlay",
  "DialogContent",
  "DialogHeader",
  "DialogTitle",
  "DialogDescription",
  "EyebrowLabel",
  "StatCluster",
  "TierBadge",
  "KindBadge",
  "TerminalFrame",
  "CodeBlock",
  "PrismGlow",
  "GlassNav",
  "AiosLogo",
  "AiosMark",
  "KpiStat",
];

/** Non-component exports: helpers, not things to mount. */
const HELPERS = new Set(["cn", "buttonVariants", "badgeVariants"]);

const {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CodeBlock,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  EyebrowLabel,
  GlassNav,
  Input,
  KindBadge,
  KpiStat,
  PrismGlow,
  Separator,
  StatCluster,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TerminalFrame,
  TierBadge,
  AiosLogo,
  AiosMark,
} = ui;

/** A mountable example of each exported component, wrapped in whatever context the
 *  underlying Radix primitive requires. */
const FIXTURES: Record<string, React.ReactElement> = {
  Button: <Button>Push</Button>,
  Card: <Card>card</Card>,
  CardHeader: <CardHeader>header</CardHeader>,
  CardTitle: <CardTitle>title</CardTitle>,
  CardDescription: <CardDescription>description</CardDescription>,
  CardContent: <CardContent>content</CardContent>,
  CardFooter: <CardFooter>footer</CardFooter>,
  Input: <Input placeholder="type here" />,
  Badge: <Badge>badge</Badge>,
  Tabs: <Tabs defaultValue="a">tabs</Tabs>,
  TabsList: (
    <Tabs defaultValue="a">
      <TabsList>list</TabsList>
    </Tabs>
  ),
  TabsTrigger: (
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">tab a</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
  TabsContent: (
    <Tabs defaultValue="a">
      <TabsContent value="a">panel a</TabsContent>
    </Tabs>
  ),
  Separator: <Separator />,
  Dialog: <Dialog open>dialog</Dialog>,
  DialogTrigger: (
    <Dialog>
      <DialogTrigger>open</DialogTrigger>
    </Dialog>
  ),
  DialogClose: (
    <Dialog open>
      <DialogClose>close</DialogClose>
    </Dialog>
  ),
  DialogPortal: (
    <Dialog open>
      <DialogPortal>
        <div>portal</div>
      </DialogPortal>
    </Dialog>
  ),
  DialogOverlay: (
    <Dialog open>
      <DialogOverlay />
    </Dialog>
  ),
  DialogContent: (
    <Dialog open>
      <DialogContent>
        <DialogTitle>title</DialogTitle>
      </DialogContent>
    </Dialog>
  ),
  DialogHeader: <DialogHeader>header</DialogHeader>,
  DialogTitle: (
    <Dialog open>
      <DialogContent>
        <DialogTitle>title</DialogTitle>
      </DialogContent>
    </Dialog>
  ),
  DialogDescription: (
    <Dialog open>
      <DialogContent>
        <DialogTitle>title</DialogTitle>
        <DialogDescription>description</DialogDescription>
      </DialogContent>
    </Dialog>
  ),
  EyebrowLabel: <EyebrowLabel>eyebrow</EyebrowLabel>,
  StatCluster: <StatCluster stats={[{ value: "12", label: "repos" }]} />,
  TierBadge: <TierBadge tier="team" />,
  KindBadge: <KindBadge kind="decision" />,
  TerminalFrame: <TerminalFrame code="aios push" />,
  CodeBlock: <CodeBlock code="aios pull" />,
  PrismGlow: <PrismGlow />,
  GlassNav: <GlassNav logo={<AiosLogo />} links={<a href="#docs">Docs</a>} cta={<Button>Start</Button>} />,
  AiosLogo: <AiosLogo />,
  AiosMark: <AiosMark />,
  KpiStat: <KpiStat label="pushes" value="1,284" delta="+12%" />,
};

describe("export surface", () => {
  test("index.ts exports exactly the documented set", () => {
    expect(Object.keys(ui).sort()).toEqual([...EXPECTED_EXPORTS].sort());
    for (const name of EXPECTED_EXPORTS) expect(ui[name as keyof typeof ui]).toBeTruthy();
  });

  // DESIGN.md § Brand & Logo: "never ship one from @aios-alpha/ui — the component library
  // is for interfaces, and interfaces are monochrome. It is assets-only on purpose."
  test("no display lockup is exported", () => {
    for (const name of Object.keys(ui)) expect(name).not.toMatch(/display|prism.*lockup/i);
  });

  test("every component export has a mountable fixture", () => {
    const components = EXPECTED_EXPORTS.filter((name) => !HELPERS.has(name));
    expect(Object.keys(FIXTURES).sort()).toEqual([...components].sort());
  });

  test.each(Object.keys(FIXTURES))("%s mounts and renders DOM", (name) => {
    const { baseElement } = render(FIXTURES[name]);
    // baseElement covers portalled content (Dialog renders into document.body).
    expect(baseElement.textContent!.length + baseElement.querySelectorAll("*").length).toBeGreaterThan(0);
  });

  // The whole default surface is monochrome: colour arrives through token-backed
  // Tailwind classes the consumer's theme resolves, never as a literal in our markup.
  // AiosMark's opt-in `prism` is the single sanctioned exception, and it is not default.
  test.each(Object.keys(FIXTURES))("%s renders no gradient and no literal colour", (name) => {
    const { baseElement } = render(FIXTURES[name]);
    const html = baseElement.innerHTML;
    expect(html).not.toMatch(/<linearGradient|<radialGradient/i);
    // KpiStat's delta/sparkline inks and TerminalFrame's status glow are the documented
    // literals (see token-literals.test.ts); everything else must be class-driven.
    if (!["KpiStat", "TerminalFrame", "CodeBlock"].includes(name)) {
      expect(html).not.toMatch(/#[0-9a-f]{3,8}\b|\brgba?\(/i);
    }
  });
});
