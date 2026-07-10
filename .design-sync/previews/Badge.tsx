import { Badge } from "@aios-alpha/ui";

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Badge>default</Badge>
    <Badge variant="lime">lime</Badge>
    <Badge variant="emerald">emerald</Badge>
    <Badge variant="neutral">neutral</Badge>
    <Badge variant="outline">outline</Badge>
    <Badge variant="destructive">destructive</Badge>
  </div>
);

export const InContext = () => (
  <div className="flex items-center gap-3">
    <span className="text-[length:var(--aios-text-body)] text-foreground">
      brain-api.md
    </span>
    <Badge variant="lime">v1 pinned</Badge>
    <Badge variant="neutral">contract</Badge>
  </div>
);
