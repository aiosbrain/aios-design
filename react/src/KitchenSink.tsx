import { useEffect, useState } from "react";
import { Moon, Sun, ArrowRight } from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  EyebrowLabel,
  StatCluster,
  TierBadge,
  KindBadge,
  TerminalFrame,
  GlassNav,
  AiosMark,
  KpiStat,
  cn,
} from "../index";

/* ----------------------------------------------------------------------------
   Sidebar navigation model
---------------------------------------------------------------------------- */

interface NavItem {
  id: string;
  label: string;
}
interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    label: "Get Started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "foundations", label: "Foundations" },
    ],
  },
  {
    label: "Primitives",
    items: [
      { id: "button", label: "Button" },
      { id: "badge", label: "Badge" },
      { id: "input", label: "Input" },
      { id: "card", label: "Card" },
      { id: "tabs", label: "Tabs" },
      { id: "dialog", label: "Dialog" },
      { id: "separator", label: "Separator" },
    ],
  },
  {
    label: "AIOS Components",
    items: [
      { id: "logo-eyebrow", label: "Logo & Eyebrow" },
      { id: "tier-kind", label: "Tier & Kind Badges" },
      { id: "stat-cluster", label: "Stat Cluster" },
      { id: "kpi-stat", label: "KPI Stat" },
      { id: "terminal-code", label: "Terminal & Code" },
      { id: "ask-brain", label: "Ask Brain" },
    ],
  },
];

const ALL_IDS = NAV.flatMap((g) => g.items.map((i) => i.id));

/* ----------------------------------------------------------------------------
   Hooks
---------------------------------------------------------------------------- */

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Trigger band sits near the top of the viewport for a docs feel.
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function useDarkMode() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return [dark, setDark] as const;
}

/* ----------------------------------------------------------------------------
   Building blocks
---------------------------------------------------------------------------- */

function WordmarkLockup({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span className="flex items-center gap-2">
      <AiosMark className={size === "sm" ? "size-5" : "size-6"} />
      <span
        className={cn(
          "font-display font-normal tracking-tight text-foreground",
          size === "sm" ? "text-xl" : "text-2xl",
        )}
      >
        AIOS
      </span>
    </span>
  );
}

function Sidebar({ active }: { active: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-[var(--aios-bg)] lg:flex">
      <div className="flex h-16 shrink-0 items-center border-b border-border px-5">
        <WordmarkLockup size="sm" />
        <span className="ml-2 font-mono text-[length:var(--aios-text-label)] uppercase tracking-[0.1em] text-muted-foreground">
          UI
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {NAV.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="px-2 pb-2 font-mono text-[length:var(--aios-text-label)] uppercase tracking-[0.1em] text-muted-foreground">
              {group.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={cn(
                        "block rounded-md px-2 py-1.5 text-[14px] leading-snug transition-colors",
                        isActive
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function ThemeToggle({
  dark,
  setDark,
}: {
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
}) {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => setDark((d) => !d)}
      className="fixed right-6 top-6 z-50"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      {dark ? "Light" : "Dark"}
    </Button>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <EyebrowLabel>{eyebrow}</EyebrowLabel>
        <h2 className="font-display text-[length:var(--aios-text-h2)] font-normal leading-tight tracking-[-0.02em] text-foreground">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Page
---------------------------------------------------------------------------- */

export function KitchenSink() {
  const [dark, setDark] = useDarkMode();
  const active = useScrollSpy(ALL_IDS);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar active={active} />
      <ThemeToggle dark={dark} setDark={setDark} />

      {/* Main column, cleared of the sidebar */}
      <main className="lg:pl-64">
        {/* ---------- Hero ---------- */}
        <section
          id="introduction"
          className="relative isolate scroll-mt-24 overflow-hidden"
        >
          {/* Animated spotlight glow — soft pastel emerald/violet/cyan blend.
              z-0 (inside the isolated section) sits above the matte canvas but
              below the z-10 hero content. */}
          <div
            aria-hidden
            className="aios-spotlight pointer-events-none absolute left-1/2 top-10 z-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full opacity-30 blur-[64px] dark:opacity-40"
            style={{
              background:
                "radial-gradient(closest-side at 32% 42%, #8b5cf6 0%, rgba(139,92,246,0.55) 45%, transparent 80%), radial-gradient(closest-side at 68% 52%, #10b981 0%, rgba(16,185,129,0.55) 45%, transparent 80%), radial-gradient(closest-side at 50% 30%, #22d3ee 0%, rgba(34,211,238,0.5) 45%, transparent 82%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[880px] px-8 pt-10">
            <GlassNav
              logo={<WordmarkLockup size="sm" />}
              links={
                <>
                  <a href="#button" className="cursor-pointer hover:text-foreground">
                    Primitives
                  </a>
                  <a
                    href="#logo-eyebrow"
                    className="cursor-pointer hover:text-foreground"
                  >
                    AIOS
                  </a>
                  <a
                    href="#terminal-code"
                    className="cursor-pointer hover:text-foreground"
                  >
                    Code
                  </a>
                </>
              }
              cta={
                <Button size="sm">
                  Get started <ArrowRight className="size-4" />
                </Button>
              }
            />

            <div className="relative py-20">
              <EyebrowLabel>Open-source AI transformation toolkit</EyebrowLabel>
              <h1 className="mt-4 max-w-3xl font-display text-[length:var(--aios-text-display)] font-normal leading-tight tracking-[-0.03em] text-foreground">
                One design system for every AIOS surface.
              </h1>
              <p className="mt-6 max-w-xl text-[length:var(--aios-text-body-lg)] leading-relaxed text-muted-foreground">
                Greyscale canvas, color that earns its place. An editorial,
                dual-mode system, token-driven and sibling to vibrana.ai.
              </p>
              <div className="mt-8 flex gap-3">
                <Button size="lg">Start building</Button>
                <Button size="lg" variant="secondary">
                  Read the contract
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Sections ---------- */}
        <div className="mx-auto flex max-w-[880px] flex-col gap-20 px-8 pb-32">
          {/* Foundations / Typography */}
          <Section
            id="foundations"
            eyebrow="Foundations"
            title="Typography scale"
          >
            <div className="flex flex-col gap-3">
              <p className="font-display text-[length:var(--aios-text-display)] font-normal leading-tight tracking-[-0.03em]">
                Display — Instrument Serif
              </p>
              <p className="font-display text-[length:var(--aios-text-h1)] font-normal leading-tight tracking-[-0.02em]">
                Heading 1
              </p>
              <p className="font-display text-[length:var(--aios-text-h2)] font-normal leading-tight tracking-[-0.02em]">
                Heading 2
              </p>
              <p className="font-display text-[length:var(--aios-text-h3)] font-normal leading-snug tracking-[-0.01em]">
                Heading 3
              </p>
              <Separator />
              <p className="text-[length:var(--aios-text-body-lg)] leading-relaxed">
                Body large — Instrument Sans carries the information.
              </p>
              <p className="text-[length:var(--aios-text-body)] leading-normal">
                Body — neutral and highly legible for paragraphs.
              </p>
              <p className="text-[length:var(--aios-text-small)] text-muted-foreground">
                Small — secondary metadata.
              </p>
              <p className="font-mono text-[length:var(--aios-text-label)] uppercase tracking-[0.1em] text-muted-foreground">
                Label — Mono muted eyebrow
              </p>
            </div>
          </Section>

          {/* Buttons */}
          <Section id="button" eyebrow="Primitives" title="Button">
            <div className="flex flex-wrap items-center gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Section>

          {/* Badges */}
          <Section id="badge" eyebrow="Status" title="Badge">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>default</Badge>
              <Badge variant="lime">lime</Badge>
              <Badge variant="emerald">emerald</Badge>
              <Badge variant="neutral">neutral</Badge>
              <Badge variant="outline">outline</Badge>
              <Badge variant="destructive">destructive</Badge>
            </div>
          </Section>

          {/* Inputs */}
          <Section id="input" eyebrow="Forms" title="Input">
            <div className="flex max-w-md flex-col gap-4">
              <Input placeholder="aios push --tier team" />
              <Input placeholder="Disabled input" disabled />
              <div className="flex gap-3">
                <Input placeholder="Query the brain…" />
                <Button>Search</Button>
              </div>
            </div>
          </Section>

          {/* Cards */}
          <Section id="card" eyebrow="Surfaces" title="Card">
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Individual Workspace</CardTitle>
                  <CardDescription>
                    One per person — numbered folder spine, validators, sync.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[length:var(--aios-text-body)] text-muted-foreground">
                    You decide what leaves your machine.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="secondary">
                    Explore
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Team Brain</CardTitle>
                  <CardDescription>
                    The one shared hub — tier-tagged pushes from every workspace.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[length:var(--aios-text-body)] text-muted-foreground">
                    Tasks, decisions, deliverables, NL query.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="secondary">
                    Explore
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </Section>

          {/* Tabs */}
          <Section id="tabs" eyebrow="Navigation" title="Tabs">
            <Tabs defaultValue="overview" className="max-w-xl">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tiers">Tiers</TabsTrigger>
                <TabsTrigger value="spine">Spine</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                Three parts: Workspace, Team Brain, Website. A context monorepo,
                not a build monorepo.
              </TabsContent>
              <TabsContent value="tiers">
                Every piece of content carries a tier: team, external, admin.
              </TabsContent>
              <TabsContent value="spine">
                A six-folder pipeline: context, inbox, work, log, shared,
                personal.
              </TabsContent>
            </Tabs>
          </Section>

          {/* Dialog */}
          <Section id="dialog" eyebrow="Overlays" title="Dialog">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="self-start">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Push to Team Brain?</DialogTitle>
                  <DialogDescription>
                    This will sync all team-tagged items in 2-work/ to the shared
                    hub. Admin-tier content is never sent.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-3">
                  <Button variant="secondary" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">Confirm push</Button>
                </div>
              </DialogContent>
            </Dialog>
          </Section>

          {/* Separator */}
          <Section id="separator" eyebrow="Layout" title="Separator">
            <div className="flex flex-col gap-4">
              <p className="text-[length:var(--aios-text-body)] text-muted-foreground">
                A hairline rule for dividing content — border-weight, never heavy.
              </p>
              <Separator />
              <div className="flex h-6 items-center gap-4 text-[length:var(--aios-text-small)] text-muted-foreground">
                <span>Docs</span>
                <Separator orientation="vertical" />
                <span>Brain</span>
                <Separator orientation="vertical" />
                <span>Workspace</span>
              </div>
            </div>
          </Section>

          {/* ====== AIOS COMPONENTS ====== */}

          {/* Logo & Eyebrow */}
          <Section
            id="logo-eyebrow"
            eyebrow="AIOS Components"
            title="Logo & Eyebrow"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardContent className="flex flex-col items-start gap-6 p-6">
                  <span className="flex items-center gap-3">
                    <AiosMark className="size-10" />
                    <span className="font-display text-[length:var(--aios-text-h2)] font-normal tracking-tight text-foreground">
                      AIOS
                    </span>
                  </span>
                  <span className="flex items-center gap-3 text-muted-foreground">
                    <AiosMark className="size-10" mono />
                    <span className="font-mono text-[length:var(--aios-text-small)] uppercase tracking-[0.1em]">
                      mono — currentColor
                    </span>
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-start gap-4 p-6">
                  <EyebrowLabel>Mono muted eyebrow</EyebrowLabel>
                  <p className="font-display text-[length:var(--aios-text-h3)] font-normal leading-snug tracking-[-0.01em] text-foreground">
                    Eyebrows sit above headings, in JetBrains Mono with 0.1em
                    tracking.
                  </p>
                  <EyebrowLabel>Sync contract · v1</EyebrowLabel>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Tier & Kind Badges */}
          <Section
            id="tier-kind"
            eyebrow="AIOS Components"
            title="Tier & Kind Badges"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="w-12 font-mono text-[length:var(--aios-text-small)] text-muted-foreground">
                  Tier:
                </span>
                <TierBadge tier="team" />
                <TierBadge tier="external" />
                <TierBadge tier="admin" />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="w-12 font-mono text-[length:var(--aios-text-small)] text-muted-foreground">
                  Kind:
                </span>
                <KindBadge kind="deliverable" />
                <KindBadge kind="transcript" />
                <KindBadge kind="decision" />
                <KindBadge kind="task" />
                <KindBadge kind="skill" />
                <KindBadge kind="artifact" />
              </div>
            </div>
          </Section>

          {/* Stat Cluster — wrapped in a Card */}
          <Section
            id="stat-cluster"
            eyebrow="AIOS Components"
            title="Stat Cluster"
          >
            <Card>
              <CardContent className="p-8">
                <StatCluster
                  stats={[
                    { value: "3", label: "repos, one system" },
                    { value: "2", label: "modes · light + dark" },
                    { value: "v1", label: "pinned sync contract" },
                  ]}
                />
              </CardContent>
            </Card>
          </Section>

          {/* KPI Stat — new signature component */}
          <Section id="kpi-stat" eyebrow="AIOS Components" title="KPI Stat">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KpiStat
                label="Items synced"
                value="1,284"
                delta="+12%"
                deltaTone="up"
                accent="#10b981"
                spark={[0.3, 0.5, 0.45, 0.6, 0.55, 0.8, 0.7, 1]}
              />
              <KpiStat
                label="Queries"
                value="237"
                delta="+31%"
                deltaTone="up"
                accent="#8b5cf6"
                spark={[0.2, 0.35, 0.3, 0.5, 0.6, 0.75, 0.85, 1]}
              />
              <KpiStat
                label="Decisions"
                value="48"
                delta="+6%"
                deltaTone="up"
                accent="#22d3ee"
                spark={[0.5, 0.45, 0.6, 0.55, 0.7, 0.65, 0.8, 0.85]}
              />
              <KpiStat
                label="Tasks done"
                value="91"
                delta="−4%"
                deltaTone="down"
                accent="#84cc16"
                spark={[0.8, 0.75, 0.85, 0.7, 0.65, 0.6, 0.55, 0.5]}
              />
            </div>
          </Section>

          {/* Terminal & Code */}
          <Section
            id="terminal-code"
            eyebrow="Developer-first"
            title="Terminal & Code"
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <TerminalFrame
                filename="~/workspace"
                status="live"
                code={`$ aios push --tier team
→ scanning 2-work/ for team-tagged deliverables
→ 4 items staged
✓ pushed to team-brain (v1 contract)`}
              />
              <TerminalFrame
                filename="brain-api.md"
                status="static"
                code={`POST /v1/ingest
{ "tier": "team", "kind": "deliverable" }
# admin-tier content rejected at boundary (422)`}
              />
            </div>
          </Section>

          {/* Ask Brain — composite */}
          <Section id="ask-brain" eyebrow="AIOS Components" title="Ask Brain">
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    placeholder="Ask the brain anything…"
                    className="flex-1"
                  />
                  <Button className="shrink-0">
                    Ask the brain <ArrowRight className="size-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "What did we decide about pricing?",
                    "Open tasks for this week",
                    "Latest deliverables",
                  ].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="rounded-full border border-border bg-transparent px-3 py-1.5 text-[length:var(--aios-text-small)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>
        </div>
      </main>
    </div>
  );
}
