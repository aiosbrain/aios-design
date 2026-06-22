import * as React from "react";
import { cn } from "../../lib/utils";

export interface Stat {
  value: string;
  label: string;
}

export interface StatClusterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stats: Stat[];
}

/** Large Space Grotesk numbers with mono lime descriptors. */
export function StatCluster({ stats, className, ...props }: StatClusterProps) {
  return (
    <div
      className={cn("flex flex-wrap gap-x-12 gap-y-6", className)}
      {...props}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <span className="font-display text-[var(--aios-text-h1)] font-bold leading-tight tracking-[-0.02em] text-foreground">
            {stat.value}
          </span>
          <span className="font-mono text-[var(--aios-text-label)] uppercase tracking-[0.1em] text-lime">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
