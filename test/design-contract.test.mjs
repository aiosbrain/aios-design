import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import test from "node:test";

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));

test("package, lockfile, and published contract identify the same patch", () => {
  const pkg = readJson("../package.json");
  const uiPkg = readJson("../react/package.json");
  const lock = readJson("../package-lock.json");
  const uiLock = readJson("../react/package-lock.json");
  const contract = readFileSync(new URL("../DESIGN.md", import.meta.url), "utf8");
  const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
  const contractVersion = contract.match(/^version:\s*([^\s]+)$/m)?.[1];
  assert.equal(pkg.version, "0.4.0");
  assert.equal(lock.version, pkg.version);
  assert.equal(lock.packages[""].version, pkg.version);
  assert.equal(uiPkg.version, pkg.version);
  assert.equal(uiLock.version, uiPkg.version);
  assert.equal(uiLock.packages[""].version, uiPkg.version);
  assert.equal(uiLock.packages[".."].version, pkg.version);
  assert.equal(contractVersion, pkg.version);
  assert.match(readme, /@aios-alpha\/design@\^0\.4\.0 @aios-alpha\/ui@\^0\.4\.0/);
  assert.match(readme, /0\.4\.0 does not change token values/);
  assert.deepEqual(pkg.dependencies, {});
  assert.equal(pkg.devDependencies["style-dictionary"], "^5.4.4");
  assert.equal(lock.packages[""].devDependencies["style-dictionary"], "^5.4.4");
  assert.equal(pkg.repository.url, "https://github.com/aiosbrain/aios-design.git");
  assert.equal(uiPkg.repository.url, pkg.repository.url);
  assert.equal(pkg.publishConfig.provenance, true);
  assert.equal(uiPkg.publishConfig.provenance, true);
});

test("consumer exceptions stay narrow and shared token literals remain forbidden", () => {
  const contract = readFileSync(new URL("../DESIGN.md", import.meta.url), "utf8");
  const section = contract.match(/### Consumer-owned colour exceptions\s+([\s\S]*?)\n\n\*\*Consumer migration/)?.[1];
  assert.ok(section, "consumer exception section must remain present");
  assert.equal(section.replace(/\s+/g, " ").trim(), [
    "The no-vendoring rule applies to values already represented by an `--aios-*` token. Consumers must",
    "reference those variables, including inside SVG and chart configuration. A consumer may own a raw",
    "colour only when it is a named third-party/provider identity colour or a fixed dark terminal/demo",
    "palette whose measured contrast cannot follow the page theme. Such values must live behind a",
    "product-prefixed semantic variable or a single named palette module, carry a local comment explaining",
    "the exception, and be covered by a test that rejects unreviewed additions. An exception is not",
    "permission to duplicate violet, accent, emerald, amber, cyan, fuchsia, destructive, surface, text,",
    "border, or effect literals.",
  ].join(" "));
  assert.match(contract, /Framework adapter ramps and decorative bokeh are derived from canonical tokens; they are not\s+exceptions/);
});

test("the built stylesheet exposes every canonical light and dark color token", () => {
  const css = readFileSync(new URL("../dist/tokens.css", import.meta.url), "utf8");
  for (const source of ["color.light.json", "color.dark.json"]) {
    const names = Object.keys(readJson(`../tokens/${source}`).color);
    assert.ok(names.length >= 20, `${source} unexpectedly lost color coverage`);
    for (const name of names) assert.match(css, new RegExp(`--aios-${name}:\\s*`));
  }
});

test("the trusted-publishing workflow gates both aligned packages", () => {
  const workflow = readFileSync(new URL("../.github/workflows/publish.yml", import.meta.url), "utf8");
  const ci = readFileSync(new URL("../.github/workflows/ci.yml", import.meta.url), "utf8");
  assert.match(workflow, /actions\/checkout@[0-9a-f]{40}/);
  assert.match(workflow, /actions\/setup-node@[0-9a-f]{40}/);
  assert.match(workflow, /npm install -g npm@11\.5\.1/);
  const tagCheck = workflow.indexOf("node scripts/verify-release-tag.mjs");
  const firstPublish = workflow.indexOf("\n            npm publish");
  assert.ok(tagCheck >= 0 && tagCheck < firstPublish, "tag/version validation must precede publishing");
  assert.match(workflow, /if npm view "@aios-alpha\/design@\$VERSION" version[^]*?else\s+npm publish\s+fi/);
  assert.match(workflow, /if npm view "@aios-alpha\/ui@\$VERSION" version[^]*?else\s+npm publish\s+fi/);
  assert.equal((workflow.match(/^\s+npm publish$/gm) ?? []).length, 2);
  assert.match(ci, /working-directory: react\s+run: \|\s+npm ci\s+npm run build\s+npm run check:exports/);
  assert.match(ci, /Verify UI publish surface\s+working-directory: react\s+run: npm pack --dry-run/);
});

test("release tag verification fails closed and accepts only the package version", () => {
  const run = (type, name) => spawnSync(process.execPath, ["scripts/verify-release-tag.mjs"], {
    cwd: new URL("..", import.meta.url),
    env: { ...process.env, GITHUB_REF_TYPE: type, GITHUB_REF_NAME: name },
    encoding: "utf8",
  });
  assert.notEqual(run("branch", "main").status, 0);
  assert.notEqual(run("tag", "v0.3.1").status, 0);
  assert.equal(run("tag", "v0.4.0").status, 0);
});

test("the brand contract stays monochrome and every asset is generated from one source", () => {
  const contract = readFileSync(new URL("../DESIGN.md", import.meta.url), "utf8");
  assert.match(contract, /^## Brand & Logo$/m, "the logo contract must stay in DESIGN.md");
  assert.match(contract, /allowed on the \*\*bare mark only\*\*/);

  const brandDir = new URL("../dist/brand/", import.meta.url);
  const mono = ["aios-mark", "aios-wordmark", "aios-lockup", "aios-lockup-stacked"];
  for (const name of mono) {
    for (const suffix of ["", "-black", "-white"]) {
      const svg = readFileSync(new URL(`${name}${suffix}.svg`, brandDir), "utf8");
      assert.doesNotMatch(svg, /linearGradient|radialGradient/, `${name}${suffix} must not carry a gradient`);
      // Exactly one ink colour per asset — a lockup can never be multicoloured.
      const inks = new Set([...svg.matchAll(/fill="([^"]+)"/g)].map((m) => m[1]).filter((v) => v !== "none"));
      assert.equal(inks.size, 1, `${name}${suffix} must use exactly one ink, got ${[...inks].join(", ")}`);
    }
    assert.match(readFileSync(new URL(`${name}.svg`, brandDir), "utf8"), /currentColor/);
    assert.match(readFileSync(new URL(`${name}-black.svg`, brandDir), "utf8"), /#0a0a0a/);
    assert.match(readFileSync(new URL(`${name}-white.svg`, brandDir), "utf8"), /#ffffff/);
  }

  // The gradient exists on exactly two assets, and both are the bare mark: the raw
  // prism mark and the square app icon. A gradient lockup must never appear here.
  const gradientAssets = readdirSync(brandDir).filter((f) =>
    readFileSync(new URL(f, brandDir), "utf8").includes("linearGradient"),
  );
  assert.deepEqual(gradientAssets.sort(), ["aios-app-icon.svg", "aios-mark-prism.svg"]);
  for (const name of gradientAssets) {
    const svg = readFileSync(new URL(name, brandDir), "utf8");
    assert.match(svg, /#8b5cf6[^]*#10b981[^]*#84cc16/);
    assert.equal((svg.match(/<path/g) ?? []).length, 1, `${name} must be the bare mark, not a lockup`);
  }

  // The React component and the SVG assets must be built from the same geometry.
  const generated = readFileSync(new URL("../react/components/aios/caret-a-path.ts", import.meta.url), "utf8");
  assert.match(generated, /GENERATED by build\/build-brand\.mjs/);
  const markSvg = readFileSync(new URL("aios-mark.svg", brandDir), "utf8");
  const pathFromSvg = markSvg.match(/ d="([^"]+)"/)[1];
  assert.ok(generated.includes(pathFromSvg), "caret-a-path.ts drifted from dist/brand/aios-mark.svg");
});
