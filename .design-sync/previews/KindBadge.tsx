import { KindBadge } from "@aios-alpha/ui";

export const AllKinds = () => (
  <div className="flex flex-wrap items-center gap-3">
    <KindBadge kind="deliverable" />
    <KindBadge kind="transcript" />
    <KindBadge kind="decision" />
    <KindBadge kind="task" />
    <KindBadge kind="skill" />
    <KindBadge kind="artifact" />
  </div>
);
