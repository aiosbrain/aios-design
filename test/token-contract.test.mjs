// Token-contract invariants.
//
// design-contract.test.mjs guards the RELEASE surface (versions, publish workflow, brand
// ink). This file guards the TOKEN surface: the three-way agreement between
// tokens/*.json (the source of truth), dist/* (what consumers actually import), and
// DESIGN.md (what agents and humans read as the contract). Every assertion here fails
// on a real drift a reviewer would otherwise have to catch by eye.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";

const at = (path) => fileURLToPath(new URL(path, import.meta.url));
const read = (path) => readFileSync(at(path), "utf8");
const readJson = (path) => JSON.parse(read(path));

/** Flatten a DTCG token group to dotted leaf paths -> $value. */
const leaves = (group, prefix = "") => {
  const out = {};
  for (const [key, node] of Object.entries(group)) {
    if (node && typeof node === "object" && "$value" in node) out[prefix + key] = node.$value;
    else if (node && typeof node === "object") Object.assign(out, leaves(node, `${prefix}${key}.`));
  }
  return out;
};

/** Every `--custom-property:` declared anywhere in a stylesheet. */
const declaredVars = (css) => new Set([...css.matchAll(/--([a-zA-Z0-9-]+)\s*:/g)].map((m) => m[1]));
/** Every `var(--custom-property)` referenced in a stylesheet. */
const referencedVars = (css) => new Set([...css.matchAll(/var\(\s*--([a-zA-Z0-9-]+)/g)].map((m) => m[1]));

test("light and dark declare exactly the same token keys — no mode-only orphans", () => {
  const light = leaves(readJson("../tokens/color.light.json"));
  const dark = leaves(readJson("../tokens/color.dark.json"));
  const lightOnly = Object.keys(light).filter((k) => !(k in dark));
  const darkOnly = Object.keys(dark).filter((k) => !(k in light));
  // A key present in one mode only is invisible in code review and produces an
  // undefined custom property the moment a consumer toggles into the other mode.
  assert.deepEqual(lightOnly, [], "tokens present in light but missing from dark");
  assert.deepEqual(darkOnly, [], "tokens present in dark but missing from light");
  assert.ok(Object.keys(light).length >= 30, "colour coverage unexpectedly shrank");

  // Same rule at the stylesheet level: the `.dark` block may only OVERRIDE properties
  // `:root` already defines. A dark-only property is a token a light-mode page cannot see.
  const css = read("../dist/tokens.css");
  const root = declaredVars(css.slice(css.indexOf(":root {"), css.indexOf(".dark {")));
  const darkBlock = declaredVars(css.slice(css.indexOf(".dark {")));
  const notInRoot = [...darkBlock].filter((v) => !root.has(v));
  assert.deepEqual(notInRoot, [], ".dark declares properties :root never defines");
});

test("every var() in the Tailwind bridge resolves to a token the stylesheet declares", () => {
  const tokens = declaredVars(read("../dist/tokens.css"));
  const bridge = read("../dist/tailwind-theme.css");
  const missing = [...referencedVars(bridge)].filter((v) => !tokens.has(v));
  // A typo here is silent: Tailwind emits `background: var(--aios-bgg)`, the browser
  // drops the declaration, and the surface renders transparent instead of erroring.
  assert.deepEqual(missing, [], "tailwind-theme.css points at tokens that do not exist");
  assert.ok(referencedVars(bridge).size >= 30, "the bridge unexpectedly stopped mapping tokens");

  // tokens.css must be self-contained too — it is imported first, with nothing before it.
  const selfMissing = [...referencedVars(read("../dist/tokens.css"))].filter((v) => !tokens.has(v));
  assert.deepEqual(selfMissing, [], "tokens.css references a custom property it never declares");
});

test("every declared package export path resolves to a file that was built", () => {
  const pkg = readJson("../package.json");
  for (const [subpath, target] of Object.entries(pkg.exports)) {
    assert.ok(target.startsWith("./"), `${subpath} must map to a relative path`);
    if (!subpath.includes("*")) {
      assert.ok(existsSync(at(`../${target.slice(2)}`)), `export "${subpath}" -> ${target} is missing`);
      continue;
    }
    // A glob export is only useful if the directory behind it actually ships something.
    const dir = target.slice(2, target.indexOf("*"));
    assert.ok(readdirSync(at(`../${dir}`)).length > 0, `export "${subpath}" -> ${dir} is empty`);
  }
  // `files` decides what npm uploads; an export outside it publishes a broken package.
  const shipped = new Set(pkg.files);
  for (const target of Object.values(pkg.exports)) {
    const top = target.slice(2).split("/")[0];
    assert.ok(shipped.has(top) || shipped.has(target.slice(2)), `${target} is exported but not in "files"`);
  }
});

test("DESIGN.md restates token values without drifting from tokens/*.json", () => {
  const md = read("../DESIGN.md");
  const frontmatter = md.slice(0, md.indexOf("\n---", 4));

  // colours: the frontmatter documents a subset of each mode, quoted, two-space indented.
  // Literal patterns rather than `new RegExp(`...${mode}...`)`: the interpolation is provably
  // safe (the loop iterates a literal array) but a dynamically built regex is indistinguishable
  // from injection to a static analyser, and this is a two-element set.
  const MODE_BLOCK = {
    light: /^  light:\n([\s\S]*?)(?=^  [a-z]+:)/m,
    dark: /^  dark:\n([\s\S]*?)(?=^  [a-z]+:)/m,
  };
  for (const mode of ["light", "dark"]) {
    const block = frontmatter.match(MODE_BLOCK[mode])?.[1];
    assert.ok(block, `DESIGN.md must keep documenting the ${mode} palette`);
    const documented = Object.fromEntries(
      [...block.matchAll(/^ {4}([a-z0-9-]+): "([^"]+)"/gm)].map((m) => [m[1], m[2]]),
    );
    assert.ok(Object.keys(documented).length >= 15, `${mode} palette documentation shrank`);
    const tokens = readJson(`../tokens/color.${mode}.json`).color;
    for (const [name, value] of Object.entries(documented)) {
      assert.ok(tokens[name], `DESIGN.md documents ${mode}.${name}, which no longer exists in tokens/`);
      assert.equal(tokens[name].$value, value, `${mode}.${name} drifted between DESIGN.md and tokens/`);
    }
  }

  // type scale: `display: { size: "clamp(...)", weight: 400, ... }`
  const type = readJson("../tokens/type.json");
  const scale = [...frontmatter.matchAll(/^ {4}([a-z0-9-]+): +\{ size: "([^"]+)", weight: (\d+)/gm)];
  assert.ok(scale.length >= 8, "the documented type scale shrank");
  for (const [, name, size, weight] of scale) {
    assert.equal(type.text[name]?.$value, size, `text.${name} drifted between DESIGN.md and tokens/`);
    assert.ok(Object.values(type.weight).some((w) => String(w.$value) === weight), `weight ${weight} is not a token`);
  }

  // radius + gradients are documented as flat scalars.
  const radius = readJson("../tokens/radius.json").radius;
  const radiusBlock = frontmatter.match(/^radius:\n([\s\S]*?)(?=^[a-z]+:)/m)[1];
  for (const [, name, value] of radiusBlock.matchAll(/^ {2}([a-z0-9]+): "([^"]+)"/gm)) {
    assert.equal(radius[name]?.$value, value, `radius.${name} drifted between DESIGN.md and tokens/`);
  }
  const gradient = readJson("../tokens/gradient.json").gradient;
  const gradientBlock = frontmatter.match(/^gradients:\n([\s\S]*)$/m)[1];
  const documentedGradients = [...gradientBlock.matchAll(/^ {2}([a-z-]+): "([^"]+)"/gm)];
  assert.ok(documentedGradients.length >= 2, "the documented gradients shrank");
  for (const [, name, value] of documentedGradients) {
    assert.equal(gradient[name]?.$value, value, `gradient.${name} drifted between DESIGN.md and tokens/`);
  }
});

test("every brand asset DESIGN.md advertises is actually published under the exports map", () => {
  const md = read("../DESIGN.md");
  const pkg = readJson("../package.json");
  const brandTarget = pkg.exports["./brand/*"];
  assert.equal(brandTarget, "./dist/brand/*", "the brand export moved — update this test with it");

  const advertised = [...md.matchAll(/@aios-alpha\/design\/brand\/([A-Za-z0-9._-]+\.svg)/g)].map((m) => m[1]);
  assert.ok(advertised.length >= 8, "DESIGN.md stopped listing the brand assets");
  const built = new Set(readdirSync(at("../dist/brand")));
  for (const file of new Set(advertised)) {
    // DESIGN.md is the contract consumers copy import paths out of. A name that never
    // reaches dist/ is a 404 in every downstream repo, and nothing else catches it.
    assert.ok(built.has(file), `DESIGN.md advertises brand/${file}, which the build never produces`);
  }

  // The ink-variant promise DESIGN.md makes: "every currentColor asset also ships
  // -black.svg (#0a0a0a) and -white.svg (#ffffff)" — because currentColor does not
  // inherit through <img>, CSS background-image, print, or video.
  const currentColorAssets = [...built].filter((f) =>
    readFileSync(at(`../dist/brand/${f}`), "utf8").includes("currentColor"),
  );
  assert.ok(currentColorAssets.length >= 5, "the currentColor asset set unexpectedly shrank");
  for (const file of currentColorAssets) {
    const base = file.replace(/\.svg$/, "");
    for (const ink of ["black", "white"]) {
      assert.ok(built.has(`${base}-${ink}.svg`), `${file} is currentColor but has no -${ink} ink variant`);
    }
  }
});

test("the Pencil variable map covers every token, in both modes", () => {
  const pencil = readJson("../dist/tokens.pencil.json");
  const expect = (mapKey, sourceFile, group) => {
    const tokens = Object.keys(leaves(readJson(`../tokens/${sourceFile}`)[group]));
    assert.deepEqual(Object.keys(pencil[mapKey]).sort(), tokens.sort(), `${mapKey} drifted from ${sourceFile}`);
  };
  expect("colorsLight", "color.light.json", "color");
  expect("colorsDark", "color.dark.json", "color");
  expect("shadowsLight", "color.light.json", "shadow");
  expect("shadowsDark", "color.dark.json", "shadow");
  expect("font", "type.json", "font");
  expect("text", "type.json", "text");
  expect("space", "space.json", "space");
  expect("radius", "radius.json", "radius");
  expect("gradient", "gradient.json", "gradient");
  // Pencil is a design-tool consumer: a token missing here silently reverts a designer
  // to a hard-coded hex, which is the exact vendoring DESIGN.md forbids.
  assert.deepEqual(Object.keys(pencil.colorsLight).sort(), Object.keys(pencil.colorsDark).sort());
});
