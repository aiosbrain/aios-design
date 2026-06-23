import * as React from "react";
import { cn } from "../../lib/utils";

export interface KpiStatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mono uppercase descriptor (muted). */
  label: string;
  /** The big serif value, e.g. "1,284". */
  value: string;
  /** The delta string, e.g. "+12%". */
  delta?: string;
  /** Direction of the delta — drives the emerald/red color. */
  deltaTone?: "up" | "down";
  /** Accent color for the sparkline (any CSS color). Defaults to emerald. */
  accent?: string;
  /** Optional sparkline bar heights (0–1). Falls back to a built-in shape. */
  spark?: number[];
}

const DEFAULT_SPARK = [0.35, 0.55, 0.45, 0.7, 0.6, 0.85, 0.75, 1];

const UP = "#10b981";
const DOWN = "#ef4444";

/** A KPI block: mono label, big serif value, a tiny accent sparkline, and a
 *  colored delta. Color lives only in the sparkline + delta — the editorial rule. */
export function KpiStat({
  label,
  value,
  delta,
  deltaTone = "up",
  accent = UP,
  spark = DEFAULT_SPARK,
  className,
  ...props
}: KpiStatProps) {
  const deltaColor = deltaTone === "up" ? UP : DOWN;
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-card",
        className,
      )}
      {...props}
    >
      <span className="font-mono text-[length:var(--aios-text-label)] uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </span>
      <span className="font-display text-[length:var(--aios-text-h1)] font-normal leading-none tracking-[-0.02em] text-foreground">
        {value}
      </span>
      <div className="flex items-end justify-between gap-3">
        {/* sparkline: a row of thin bars, accent-colored, varying heights */}
        <div
          className="flex h-7 items-end gap-[3px]"
          aria-hidden
        >
          {spark.map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full"
              style={{
                height: `${Math.max(8, Math.round(h * 100))}%`,
                backgroundColor: accent,
                opacity: 0.5 + (h * 0.5),
              }}
            />
          ))}
        </div>
        {delta ? (
          <span
            className="font-mono text-[length:var(--aios-text-small)] font-medium tabular-nums"
            style={{ color: deltaColor }}
          >
            {delta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
