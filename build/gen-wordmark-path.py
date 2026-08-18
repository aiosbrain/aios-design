#!/usr/bin/env python3
"""One-shot generator for the AIOS wordmark outline.

Converts the literal string "AIOS" set in Instrument Sans 600 into a single SVG
path, so the static wordmark asset needs no font embedded and no font installed.
Output is committed to brand/src/wordmark-aios.json — rerun only if the
typeface, weight, or tracking in DESIGN.md's logo contract changes.

    python3 build/gen-wordmark-path.py <path-to-instrument-sans-600.woff2>
"""
import json
import sys

from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Identity

TEXT = "AIOS"
# Optical tracking for the lockup. DESIGN.md: wordmark tracking 0.01em.
TRACKING_EM = 0.01


def main(font_path: str) -> None:
    font = TTFont(font_path)
    upem = font["head"].unitsPerEm
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]

    pen_out = SVGPathPen(glyph_set)
    x = 0.0
    for ch in TEXT:
        name = cmap[ord(ch)]
        # Flip Y so the path sits in SVG coordinates (y down) with baseline at 0.
        tpen = TransformPen(pen_out, Identity.translate(x, 0).scale(1, -1))
        glyph_set[name].draw(tpen)
        x += hmtx[name][0] + TRACKING_EM * upem

    advance = x - TRACKING_EM * upem  # no trailing tracking after the final glyph
    ascender = font["hhea"].ascent
    descender = font["hhea"].descent

    out = {
        "text": TEXT,
        "font": "Instrument Sans",
        "weight": 600,
        "trackingEm": TRACKING_EM,
        "unitsPerEm": upem,
        "advance": round(advance, 2),
        "capHeight": font["OS/2"].sCapHeight,
        "ascender": ascender,
        "descender": descender,
        "path": pen_out.getCommands(),
    }
    with open("brand/src/wordmark-aios.json", "w") as fh:
        json.dump(out, fh, indent=2)
    print(f"✓ brand/src/wordmark-aios.json ({len(out['path'])} chars, advance {advance:.0f}/{upem})")


if __name__ == "__main__":
    main(sys.argv[1])
