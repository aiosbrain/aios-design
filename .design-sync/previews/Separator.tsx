import { Separator } from "@aios-alpha/ui";

export const Horizontal = () => (
  <div className="flex max-w-md flex-col gap-4">
    <p className="text-[length:var(--aios-text-body)] text-muted-foreground">
      A hairline rule for dividing content — border-weight, never heavy.
    </p>
    <Separator />
    <p className="text-[length:var(--aios-text-body)] text-muted-foreground">
      Content continues below the rule.
    </p>
  </div>
);

export const Vertical = () => (
  <div className="flex h-6 items-center gap-4 text-[length:var(--aios-text-small)] text-muted-foreground">
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Brain</span>
    <Separator orientation="vertical" />
    <span>Workspace</span>
  </div>
);
