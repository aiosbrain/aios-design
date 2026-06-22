import * as React from "react";
import { cn } from "../../lib/utils";

export interface PrismGlowProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Ambient blurred prism-gradient element placed behind hero content.
 *  Decorative only — pointer-events-none, aria-hidden. */
export function PrismGlow({ className, style, ...props }: PrismGlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full opacity-40 blur-[80px]",
        className,
      )}
      style={{
        background: "var(--aios-gradient-prism)",
        ...style,
      }}
      {...props}
    />
  );
}
