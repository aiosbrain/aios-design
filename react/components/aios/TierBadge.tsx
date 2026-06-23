import { cn } from "../../lib/utils";

export type Tier = "team" | "external" | "admin";

const TIER_STYLES: Record<Tier, string> = {
  // team -> violet, external -> cyan, admin -> neutral
  team: "border-violet/30 bg-violet/10 text-violet",
  external: "border-cyan/30 bg-cyan/10 text-cyan",
  admin: "border-input bg-muted text-muted-foreground",
};

export interface TierBadgeProps {
  tier: Tier | string;
  className?: string;
}

/** Full-radius tier pill: team (violet) / external (cyan) / admin (neutral). */
export function TierBadge({ tier, className }: TierBadgeProps) {
  const style = TIER_STYLES[tier as Tier] ?? TIER_STYLES.admin;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider",
        style,
        className,
      )}
    >
      {tier}
    </span>
  );
}
