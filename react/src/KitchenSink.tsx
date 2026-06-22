import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles, ArrowRight } from "lucide-react";
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
  PrismGlow,
  GlassNav,
} from "../index";

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <EyebrowLabel>{eyebrow}</EyebrowLabel>
        <h2 className="font-display text-[var(--aios-text-h2)] font-semibold leading-tight tracking-[-0.02em] text-foreground">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
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

export function KitchenSink() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />

      {/* Hero with PrismGlow + GlassNav */}
      <div className="relative mx-auto max-w-[1200px] px-6 pt-10">
        <PrismGlow className="left-1/4 top-0 h-[400px] w-[600px]" />
        <GlassNav
          logo={
            <span className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-foreground">
              <Sparkles className="size-5 text-primary" />
              AIOS
            </span>
          }
          links={
            <>
              <span className="cursor-pointer hover:text-foreground">Docs</span>
              <span className="cursor-pointer hover:text-foreground">Brain</span>
              <span className="cursor-pointer hover:text-foreground">
                Workspace
              </span>
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
          <h1 className="mt-4 max-w-3xl font-display text-[var(--aios-text-display)] font-bold leading-tight tracking-[-0.03em] text-foreground">
            One design system for every AIOS surface.
          </h1>
          <p className="mt-6 max-w-xl text-[var(--aios-text-body-lg)] leading-relaxed text-muted-foreground">
            Dual-mode, border-not-shadow, terminal-native. A violet-and-lime
            sibling to vibrana.ai.
          </p>
          <div className="mt-8 flex gap-3">
            <Button size="lg">Start building</Button>
            <Button size="lg" variant="secondary">
              Read the contract
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-col gap-20 px-6 pb-32">
        {/* Buttons */}
        <Section eyebrow="Primitives" title="Buttons">
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

        {/* Cards */}
        <Section eyebrow="Surfaces" title="Cards">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Individual Workspace</CardTitle>
                <CardDescription>
                  One per person — numbered folder spine, validators, sync.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--aios-text-body)] text-muted-foreground">
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
                <p className="text-[var(--aios-text-body)] text-muted-foreground">
                  Tasks, decisions, deliverables, NL query.
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
                <CardTitle>Website</CardTitle>
                <CardDescription>
                  Public OSS product site — Astro + Starlight.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--aios-text-body)] text-muted-foreground">
                  Docs and the public face of the project.
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

        {/* Inputs */}
        <Section eyebrow="Forms" title="Inputs">
          <div className="flex max-w-md flex-col gap-4">
            <Input placeholder="aios push --tier team" />
            <Input placeholder="Disabled input" disabled />
            <div className="flex gap-3">
              <Input placeholder="Query the brain…" />
              <Button>Search</Button>
            </div>
          </div>
        </Section>

        {/* Badges */}
        <Section eyebrow="Status" title="Badges">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>default</Badge>
              <Badge variant="lime">lime</Badge>
              <Badge variant="emerald">emerald</Badge>
              <Badge variant="neutral">neutral</Badge>
              <Badge variant="outline">outline</Badge>
              <Badge variant="destructive">destructive</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[var(--aios-text-small)] text-muted-foreground">
                Tier:
              </span>
              <TierBadge tier="team" />
              <TierBadge tier="external" />
              <TierBadge tier="admin" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[var(--aios-text-small)] text-muted-foreground">
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

        {/* Tabs */}
        <Section eyebrow="Navigation" title="Tabs">
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

        {/* Typography scale */}
        <Section eyebrow="Foundations" title="Typography scale">
          <div className="flex flex-col gap-3">
            <p className="font-display text-[var(--aios-text-display)] font-bold leading-tight tracking-[-0.03em]">
              Display — Space Grotesk
            </p>
            <p className="font-display text-[var(--aios-text-h1)] font-bold leading-tight tracking-[-0.02em]">
              Heading 1
            </p>
            <p className="font-display text-[var(--aios-text-h2)] font-semibold leading-tight tracking-[-0.02em]">
              Heading 2
            </p>
            <p className="font-display text-[var(--aios-text-h3)] font-semibold leading-snug tracking-[-0.01em]">
              Heading 3
            </p>
            <Separator />
            <p className="text-[var(--aios-text-body-lg)] leading-relaxed">
              Body large — Plus Jakarta Sans carries the information.
            </p>
            <p className="text-[var(--aios-text-body)] leading-normal">
              Body — neutral and highly legible for paragraphs.
            </p>
            <p className="text-[var(--aios-text-small)] text-muted-foreground">
              Small — secondary metadata.
            </p>
            <p className="font-mono text-[var(--aios-text-label)] uppercase tracking-[0.1em] text-lime">
              Label — Mono Lime Eyebrow
            </p>
          </div>
        </Section>

        {/* Code / Terminal */}
        <Section eyebrow="Developer-first" title="Code & Terminal">
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

        {/* Stat cluster */}
        <Section eyebrow="Proof" title="Stat cluster">
          <StatCluster
            stats={[
              { value: "3", label: "repos, one system" },
              { value: "2", label: "modes · light + dark" },
              { value: "v1", label: "pinned sync contract" },
            ]}
          />
        </Section>

        {/* Dialog */}
        <Section eyebrow="Overlays" title="Dialog">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open dialog</Button>
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
      </div>
    </div>
  );
}
