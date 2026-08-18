import * as React from "react";
import {
  CARET_A_PATH,
  CARET_A_VIEWBOX,
  LOCKUP,
  WORDMARK_PATH,
  WORDMARK_VIEWBOX,
} from "./caret-a-path.js";

export type AiosLogoVariant = "horizontal" | "stacked" | "mark" | "wordmark";

export interface AiosLogoProps extends React.SVGProps<SVGSVGElement> {
  /** Which lockup to render. Default `horizontal` — the one chrome should use. */
  variant?: AiosLogoVariant;
}

const [mvX, mvY, mvW, mvH] = CARET_A_VIEWBOX.split(" ").map(Number);
const [wvX, wvY, wvW, wvH] = WORDMARK_VIEWBOX.split(" ").map(Number);
const capH = -wvY; // wordmark baseline is y=0; the cap ascends to wvY

/** The canonical AIOS logo lockup — caret-A mark plus the `AIOS` wordmark, in
 *  `currentColor`. Single-colour by contract: there is no gradient lockup, and the
 *  wordmark is never recoloured (DESIGN.md § Brand & Logo).
 *
 *  Geometry and spacing come from the same generated source as the published SVG
 *  assets, so this component and `@aios-alpha/design/brand/*` are the same lockup.
 *  Size it by setting `height` via `className`; width follows the aspect ratio.
 *
 *  For the bare mark in its one sanctioned colour treatment (favicon, app icon,
 *  merch, hero sting, ≥48px), use `AiosMark` with `prism`. */
export function AiosLogo({ variant = "horizontal", className, ...props }: AiosLogoProps) {
  const svg = (viewBox: string, body: React.ReactNode) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      role="img"
      aria-label="AIOS"
      className={className}
      {...props}
    >
      <g fill="currentColor">{body}</g>
    </svg>
  );

  if (variant === "mark") {
    return svg(CARET_A_VIEWBOX, <path d={CARET_A_PATH} />);
  }
  if (variant === "wordmark") {
    return svg(WORDMARK_VIEWBOX, <path d={WORDMARK_PATH} />);
  }

  if (variant === "stacked") {
    const scale = (1.55 * capH) / mvH;
    const markW = mvW * scale;
    const markH = mvH * scale;
    const gap = LOCKUP.stackGapToCap * capH;
    const w = Math.max(markW, wvW);
    const baseline = markH + gap + capH;
    return svg(
      `0 0 ${w} ${baseline + wvH + wvY}`,
      <>
        <path
          transform={`translate(${(w - markW) / 2 - mvX * scale} ${-mvY * scale}) scale(${scale})`}
          d={CARET_A_PATH}
        />
        <path transform={`translate(${(w - wvW) / 2 - wvX} ${baseline})`} d={WORDMARK_PATH} />
      </>,
    );
  }

  // horizontal — mark ink optically centred on the wordmark cap height
  const scale = (LOCKUP.markToCap * capH) / mvH;
  const markW = mvW * scale;
  const markH = mvH * scale;
  const gap = LOCKUP.gapToCap * capH;
  const markTop = wvY / 2 - markH / 2;
  const w = markW + gap + wvW;
  const y0 = Math.min(markTop, wvY);
  const y1 = Math.max(markTop + markH, wvY + wvH);
  return svg(
    `0 ${y0} ${w} ${y1 - y0}`,
    <>
      <path
        transform={`translate(${-mvX * scale} ${markTop - mvY * scale}) scale(${scale})`}
        d={CARET_A_PATH}
      />
      <path transform={`translate(${markW + gap - wvX} 0)`} d={WORDMARK_PATH} />
    </>,
  );
}
