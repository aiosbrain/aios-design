import { cn } from "../../lib/utils";

export type Kind =
  | "deliverable"
  | "transcript"
  | "decision"
  | "task"
  | "skill"
  | "artifact";

/* Color semantics adapted from aios-team-brain/components/kind-badge.tsx,
   re-expressed through the AIOS bridge tokens (no raw tailwind palette names):
     deliverable -> violet (primary)   transcript  -> cyan
     decision    -> amber               task        -> emerald
     skill       -> fuchsia             artifact    -> neutral */
const KIND_STYLES: Record<Kind, string> = {
  deliverable: "border-primary/25 bg-primary/10 text-primary",
  transcript: "border-cyan/30 bg-cyan/10 text-cyan",
  decision: "border-amber/30 bg-amber/10 text-amber",
  task: "border-emerald/30 bg-emerald/10 text-emerald",
  skill: "border-fuchsia/30 bg-fuchsia/10 text-fuchsia",
  artifact: "border-input bg-muted text-muted-foreground",
};

export interface KindBadgeProps {
  kind: Kind | string;
  className?: string;
}

/** Full-radius item-kind pill (deliverable/transcript/decision/task/skill/artifact). */
export function KindBadge({ kind, className }: KindBadgeProps) {
  const style = KIND_STYLES[kind as Kind] ?? KIND_STYLES.artifact;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider",
        style,
        className,
      )}
    >
      {kind}
    </span>
  );
}
