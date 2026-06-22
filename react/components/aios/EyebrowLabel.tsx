import * as React from "react";
import { cn } from "../../lib/utils";

export interface EyebrowLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

/** Uppercase mono lime eyebrow with 0.1em tracking — sits above section headings. */
export function EyebrowLabel({
  className,
  children,
  ...props
}: EyebrowLabelProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[var(--aios-text-label)] font-semibold uppercase tracking-[0.1em] text-lime",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
