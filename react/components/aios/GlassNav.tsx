import * as React from "react";
import { cn } from "../../lib/utils";

export interface GlassNavProps extends React.HTMLAttributes<HTMLElement> {
  logo: React.ReactNode;
  links?: React.ReactNode;
  cta?: React.ReactNode;
}

/** logo-left / nav-center / CTA-right, backdrop-blur 12px over 85% bg.
 *  Elevation via border, not shadow. */
export function GlassNav({
  logo,
  links,
  cta,
  className,
  ...props
}: GlassNavProps) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between gap-6 rounded-xl border border-border px-5 py-3",
        "backdrop-blur-[12px]",
        className,
      )}
      style={{
        // 85%-opacity background layer; blur shows through.
        backgroundColor: "color-mix(in srgb, var(--aios-bg) 85%, transparent)",
      }}
      {...props}
    >
      <div className="flex items-center">{logo}</div>
      {links ? (
        <div className="hidden items-center gap-6 font-mono text-[var(--aios-text-small)] text-muted-foreground md:flex">
          {links}
        </div>
      ) : null}
      <div className="flex items-center gap-3">{cta}</div>
    </nav>
  );
}
