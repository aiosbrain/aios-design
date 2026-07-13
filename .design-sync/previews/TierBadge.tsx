import { TierBadge } from "@aios-alpha/ui";

export const AllTiers = () => (
  <div className="flex flex-wrap items-center gap-3">
    <TierBadge tier="team" />
    <TierBadge tier="external" />
    <TierBadge tier="admin" />
  </div>
);
