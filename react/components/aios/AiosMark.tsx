import * as React from "react";
import { CARET_A_PATH, CARET_A_VIEWBOX } from "./caret-a-path.js";

export interface AiosMarkProps extends React.SVGProps<SVGSVGElement> {
  /** Render the prism gradient instead of `currentColor`.
   *  Sanctioned on the BARE mark only, at 48px or larger — never inside a lockup
   *  and never next to type. See DESIGN.md § Brand & Logo. */
  prism?: boolean;
  /** @deprecated The mark is monochrome by default now; drop this prop. */
  mono?: boolean;
}

/** The AIOS caret-A brand mark — the only AIOS symbol.
 *  Geometry is generated from brand/src/mark-caret-a.json, so it cannot drift from
 *  the SVG assets published at `@aios-alpha/design/brand/*`.
 *  Size via `className` (e.g. size-6); ink follows `currentColor` unless `prism`. */
export function AiosMark({ prism = false, mono, className, ...props }: AiosMarkProps) {
  void mono; // accepted and ignored — monochrome is the default
  // Stable-ish unique id so multiple instances don't clash on the gradient defs.
  const gid = React.useId().replace(/:/g, "");
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={CARET_A_VIEWBOX}
      role="img"
      aria-label="AIOS"
      className={className}
      {...props}
    >
      {prism && (
        <defs>
          <linearGradient id={`aios-prism-${gid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8b5cf6" />
            <stop offset="0.5" stopColor="#10b981" />
            <stop offset="1" stopColor="#84cc16" />
          </linearGradient>
        </defs>
      )}
      <path fill={prism ? `url(#aios-prism-${gid})` : "currentColor"} d={CARET_A_PATH} />
    </svg>
  );
}
