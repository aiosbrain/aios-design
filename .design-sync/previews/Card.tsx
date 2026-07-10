import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@aios-alpha/ui";

export const Basic = () => (
  <Card className="max-w-sm">
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
);

export const Pair = () => (
  <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
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
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Website</CardTitle>
        <CardDescription>
          Public OSS product site — docs and getting-started guides.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-[length:var(--aios-text-body)] text-muted-foreground">
          Astro + Starlight, themed by the same tokens.
        </p>
      </CardContent>
    </Card>
  </div>
);
