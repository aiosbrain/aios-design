// AIOS brand-asset build.
// Source of truth: brand/src/*.json (geometry only — no colour, no layout constants).
// Outputs (all generated — never hand-edit the SVGs):
//   dist/brand/aios-mark.svg            caret-A, currentColor
//   dist/brand/aios-mark-prism.svg      caret-A, prism gradient (the ONE sanctioned colour use)
//   dist/brand/aios-wordmark.svg        "AIOS" outlines, currentColor
//   dist/brand/aios-lockup.svg          mark + wordmark, horizontal, currentColor
//   dist/brand/aios-lockup-stacked.svg  mark over wordmark, currentColor
//   dist/brand/aios-app-icon.svg        square canvas, prism mark — favicons + app icons
//   dist/brand/aios-app-icon-mono.svg   square canvas, currentColor mark
// Each currentColor asset also ships -black (#0a0a0a) and -white (#ffffff) ink
// variants, because `currentColor` does not inherit through <img>, CSS
// background-image, or any non-web consumer (video editors, print, merch).
//
// Every lockup is single-colour by contract (DESIGN.md § Brand & Logo). There is
// deliberately no gradient lockup and no gradient wordmark — the gradient is only
// ever allowed on the bare mark.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = (f) => JSON.parse(readFileSync(join(root, 'brand', 'src', f), 'utf8'));
const out = join(root, 'dist', 'brand');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const mark = src('mark-caret-a.json');
const word = src('wordmark-aios.json');

// --- Lockup metrics (the only tunable constants; see DESIGN.md § Brand & Logo) ---
// Mark ink height as a multiple of the wordmark cap height, and the optical gap
// between mark ink and wordmark ink, expressed in cap heights. Both were matched
// to the shipped website nav lockup so the static assets and the live component
// are the same lockup.
const MARK_TO_CAP = 1.3;
const GAP_TO_CAP = 0.78;
const STACK_GAP_TO_CAP = 0.52;

// Ink bounds, measured once by build/gen-wordmark-path.py and the source SVG.
const MARK_INK = { x0: 85, y0: 156.38, x1: 915, y1: 843.53 };
const WORD_INK = { x0: 28, y0: -731, x1: 2420, y1: 10 };

const markW = MARK_INK.x1 - MARK_INK.x0;
const markH = MARK_INK.y1 - MARK_INK.y0;
const capH = -WORD_INK.y0; // baseline is y=0, cap ascends to -731
const wordW = WORD_INK.x1 - WORD_INK.x0;

const markScale = (MARK_TO_CAP * capH) / markH;
const gap = GAP_TO_CAP * capH;

const PRISM = [
  ['0', '#8b5cf6'],
  ['0.5', '#10b981'],
  ['1', '#84cc16'],
];

const round = (n) => Number(n.toFixed(2));

const svg = ({ viewBox, label, body, width, height }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" fill="none" role="img" aria-label="${label}">\n${body}\n</svg>\n`;

const write = (name, content) => {
  writeFileSync(join(out, name), content);
  console.log(`✓ dist/brand/${name}`);
};

// `currentColor` only resolves when the SVG is inlined or used as a mask. Anything
// that loads the file as an image — <img>, background-image, a video editor, a
// print RIP — needs the ink baked in, so every mono asset ships three files.
const INKS = { black: '#0a0a0a', white: '#ffffff' };
const writeMono = (name, content) => {
  write(`${name}.svg`, content);
  for (const [variant, ink] of Object.entries(INKS)) {
    write(`${name}-${variant}.svg`, content.replaceAll('currentColor', ink));
  }
};

// --- Mark, mono ---------------------------------------------------------------
const markViewBox = `${MARK_INK.x0} ${round(MARK_INK.y0)} ${round(markW)} ${round(markH)}`;
writeMono(
  'aios-mark',
  svg({
    viewBox: markViewBox,
    width: round(markW),
    height: round(markH),
    label: 'AIOS',
    body: `  <path fill="currentColor" d="${mark.path}"/>`,
  }),
);

// --- Mark, prism (the single sanctioned colour treatment) ----------------------
write(
  'aios-mark-prism.svg',
  svg({
    viewBox: markViewBox,
    width: round(markW),
    height: round(markH),
    label: 'AIOS',
    body: `  <defs>
    <linearGradient id="aios-prism" x1="0" y1="0" x2="1" y2="0">
${PRISM.map(([o, c]) => `      <stop offset="${o}" stop-color="${c}"/>`).join('\n')}
    </linearGradient>
  </defs>
  <path fill="url(#aios-prism)" d="${mark.path}"/>`,
  }),
);

// --- Wordmark, mono -----------------------------------------------------------
writeMono(
  'aios-wordmark',
  svg({
    viewBox: `${WORD_INK.x0} ${WORD_INK.y0} ${round(wordW)} ${round(WORD_INK.y1 - WORD_INK.y0)}`,
    width: round(wordW),
    height: round(WORD_INK.y1 - WORD_INK.y0),
    label: 'AIOS',
    body: `  <path fill="currentColor" d="${word.path}"/>`,
  }),
);

// --- Horizontal lockup --------------------------------------------------------
{
  // Mark ink centred on the wordmark cap height, wordmark left edge after the gap.
  const scaledMarkH = markH * markScale;
  const capMid = WORD_INK.y0 / 2;
  const markTop = capMid - scaledMarkH / 2;
  const markTx = -MARK_INK.x0 * markScale;
  const markTy = markTop - MARK_INK.y0 * markScale;
  const wordDx = markW * markScale + gap - WORD_INK.x0;

  const w = markW * markScale + gap + wordW;
  const y0 = Math.min(markTop, WORD_INK.y0);
  const y1 = Math.max(markTop + scaledMarkH, WORD_INK.y1);

  writeMono(
    'aios-lockup',
    svg({
      viewBox: `0 ${round(y0)} ${round(w)} ${round(y1 - y0)}`,
      width: round(w),
      height: round(y1 - y0),
      label: 'AIOS',
      body: `  <g fill="currentColor">
    <path transform="translate(${round(markTx)} ${round(markTy)}) scale(${round(markScale)})" d="${mark.path}"/>
    <path transform="translate(${round(wordDx)} 0)" d="${word.path}"/>
  </g>`,
    }),
  );
}

// --- Stacked lockup -----------------------------------------------------------
{
  // Mark sits above the wordmark, both horizontally centred on the wordmark ink.
  const stackMarkScale = (1.55 * capH) / markH;
  const scaledMarkW = markW * stackMarkScale;
  const scaledMarkH = markH * stackMarkScale;
  const stackGap = STACK_GAP_TO_CAP * capH;

  const w = Math.max(scaledMarkW, wordW);
  const markX = (w - scaledMarkW) / 2;
  const wordX = (w - wordW) / 2 - WORD_INK.x0;
  // Place the wordmark baseline so the mark's top lands at y=0.
  const baseline = scaledMarkH + stackGap + capH;

  writeMono(
    'aios-lockup-stacked',
    svg({
      viewBox: `0 0 ${round(w)} ${round(baseline + WORD_INK.y1)}`,
      width: round(w),
      height: round(baseline + WORD_INK.y1),
      label: 'AIOS',
      body: `  <g fill="currentColor">
    <path transform="translate(${round(markX - MARK_INK.x0 * stackMarkScale)} ${round(-MARK_INK.y0 * stackMarkScale)}) scale(${round(stackMarkScale)})" d="${mark.path}"/>
    <path transform="translate(${round(wordX)} ${round(baseline)})" d="${word.path}"/>
  </g>`,
    }),
  );
}

// --- App icon -----------------------------------------------------------------
// Favicons and OS app icons need a square canvas with breathing room, not the tight
// ink crop the other assets use. One canonical square so no surface invents its own.
{
  const BOX = 1000;
  const INSET = 0.68; // mark ink occupies 68% of the square's larger dimension
  const scale = (INSET * BOX) / Math.max(markW, markH);
  const tx = (BOX - markW * scale) / 2 - MARK_INK.x0 * scale;
  const ty = (BOX - markH * scale) / 2 - MARK_INK.y0 * scale;
  const transform = `translate(${round(tx)} ${round(ty)}) scale(${round(scale)})`;

  write(
    'aios-app-icon.svg',
    svg({
      viewBox: `0 0 ${BOX} ${BOX}`,
      width: BOX,
      height: BOX,
      label: 'AIOS',
      body: `  <defs>
    <linearGradient id="aios-prism" x1="0" y1="0" x2="1" y2="0">
${PRISM.map(([o, c]) => `      <stop offset="${o}" stop-color="${c}"/>`).join('\n')}
    </linearGradient>
  </defs>
  <path fill="url(#aios-prism)" transform="${transform}" d="${mark.path}"/>`,
    }),
  );
  writeMono(
    'aios-app-icon-mono',
    svg({
      viewBox: `0 0 ${BOX} ${BOX}`,
      width: BOX,
      height: BOX,
      label: 'AIOS',
      body: `  <path fill="currentColor" transform="${transform}" d="${mark.path}"/>`,
    }),
  );
}

// --- Generated geometry for the React package ---------------------------------
// @aios-alpha/ui inlines the mark path so it needs no asset loader. Emitting it
// here is what keeps the component and the SVG assets from drifting apart.
writeFileSync(
  join(root, 'react', 'components', 'aios', 'caret-a-path.ts'),
  `// GENERATED by build/build-brand.mjs — do not edit.\n` +
    `// Source geometry: brand/src/mark-caret-a.json (see DESIGN.md § Brand & Logo).\n` +
    `export const CARET_A_VIEWBOX = "${markViewBox}";\n` +
    `export const CARET_A_PATH =\n  "${mark.path}";\n` +
    `export const WORDMARK_VIEWBOX = "${WORD_INK.x0} ${WORD_INK.y0} ${round(wordW)} ${round(WORD_INK.y1 - WORD_INK.y0)}";\n` +
    `export const WORDMARK_PATH =\n  "${word.path}";\n` +
    `/** Lockup metrics, in wordmark cap heights. See DESIGN.md § Brand & Logo. */\n` +
    `export const LOCKUP = { markToCap: ${MARK_TO_CAP}, gapToCap: ${GAP_TO_CAP}, stackGapToCap: ${STACK_GAP_TO_CAP} } as const;\n`,
);
console.log('✓ react/components/aios/caret-a-path.ts');
