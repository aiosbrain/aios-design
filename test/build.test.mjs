// Build determinism.
//
// dist/ is gitignored: every consumer gets whatever `prepare` produced on the publish
// runner, and nobody reviews it. So the only thing standing between a token edit and a
// surprise in a published package is that the build is a pure function of tokens/ and
// brand/src/. This file re-runs both builds IN-PROCESS (so they are actually exercised,
// not merely shelled out to) and asserts the bytes do not move.
//
// These tests mutate dist/, which sibling test files read. `npm test` and
// `npm run test:coverage` both pass --test-concurrency=1 for that reason.
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import test from "node:test";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));

/** Every file under dir (one level of subdirectories), as relative path -> contents. */
const snapshot = (dir, prefix = "") => {
  const out = {};
  for (const entry of readdirSync(dir).sort()) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) Object.assign(out, snapshot(full, `${prefix}${entry}/`));
    else out[prefix + entry] = readFileSync(full, "utf8");
  }
  return out;
};

test("the token build is deterministic and regenerates every published artifact", async () => {
  const before = snapshot(dist);
  assert.ok(Object.keys(before).length > 0, "dist/ is empty — run `npm run build` first");

  await import("../build/build.mjs");

  const after = snapshot(dist);
  for (const file of ["tokens.css", "tailwind-theme.css", "tokens.pencil.json"]) {
    assert.ok(after[file], `build.mjs did not produce ${file}`);
    assert.equal(after[file], before[file], `${file} is not reproducible from tokens/`);
  }
  // The two intermediate stylesheets the build concatenates must not survive into the
  // package — they are `files: ["dist"]`, so a leaked temp file ships to npm.
  assert.ok(!after["_root.css"] && !after["_dark.css"], "build.mjs leaked an intermediate stylesheet");
});

test("the brand build is deterministic and every asset is regenerated from brand/src", async () => {
  const before = snapshot(join(dist, "brand"));
  assert.ok(Object.keys(before).length >= 20, "dist/brand is missing assets — run `npm run build` first");

  await import("../build/build-brand.mjs");

  const after = snapshot(join(dist, "brand"));
  // Byte equality, not just "an SVG exists": the lockup metrics are floating-point
  // arithmetic over the source geometry, and a rounding change would otherwise ship
  // a silently different logo to every AIOS surface at once.
  assert.deepEqual(Object.keys(after).sort(), Object.keys(before).sort(), "the brand asset set changed");
  for (const [file, svg] of Object.entries(after)) {
    assert.equal(svg, before[file], `dist/brand/${file} is not reproducible from brand/src`);
  }
});
