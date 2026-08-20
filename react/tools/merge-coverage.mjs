// Run the @aios-alpha/ui component suite under coverage and fold its lcov records into
// the repo-root coverage/lcov.info that the Team Brain's scanner reads.
//
// Why merge rather than report separately: the scanner reads exactly ONE file,
// coverage/lcov.info, and sums every LF/LH record in it (aios-team-brain
// ingestion/aios_ingest/analyzers/codebase.py). Until this ran, that file contained only
// build/** + scripts/** — so the repo reported ~99% coverage while the React component
// library, the other published package in this repo, contributed nothing to the
// denominator and had no tests at all. Appending here is what puts react/ into the number.
//
// Lives in react/tools/ on purpose: it is release tooling, not shipped source, and it must
// not land in either coverage denominator (the root node run instruments build/** and
// scripts/**; the vitest run instruments index.ts, components/** and lib/**).
import { existsSync, readFileSync, appendFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const reactDir = fileURLToPath(new URL("..", import.meta.url));
const repoRoot = fileURLToPath(new URL("../../", import.meta.url));
const rootLcov = `${repoRoot}coverage/lcov.info`;
const uiLcov = `${reactDir}coverage/lcov.info`;

const run = (args, cwd) => {
  // `npm` is `npm.cmd` on Windows, which is the only reason a shell was needed. Naming the
  // binary directly lets us keep shell:false everywhere, so args can never be re-parsed.
  const bin = process.platform === "win32" ? "npm.cmd" : "npm";
  const res = spawnSync(bin, args, { cwd, stdio: "inherit", shell: false });
  if (res.status !== 0) process.exit(res.status ?? 1);
};

// The root CI job and the brain's scan-on-merge job both install only the root package, so
// react/ may have no node_modules at this point. Install it here rather than making the
// coverage number depend on which job happened to run first.
if (!existsSync(`${reactDir}node_modules/vitest`)) {
  console.log("react/: installing devDependencies for the component suite…");
  run(["ci", "--prefix", reactDir], repoRoot);
}

run(["run", "--prefix", reactDir, "test:coverage"], repoRoot);

if (!existsSync(uiLcov)) {
  console.error(`expected ${uiLcov} — the component suite reported no coverage.`);
  process.exit(1);
}
if (!existsSync(rootLcov)) {
  console.error(`expected ${rootLcov} — run the node suite under coverage first.`);
  process.exit(1);
}

// Paths in the merged file are repo-relative so a reader can tell which package a record
// came from. The scanner only sums LF/LH, but a human reading the file should not have to
// guess whether `button.tsx` is ours.
const records = readFileSync(uiLcov, "utf8").replace(/^SF:/gm, "SF:react/");
appendFileSync(rootLcov, records.endsWith("\n") ? records : `${records}\n`);

const totals = (file) => {
  const counts = { LF: 0, LH: 0 };
  for (const line of readFileSync(file, "utf8").split("\n")) {
    if (line.startsWith("LF:")) counts.LF += Number(line.slice(3));
    else if (line.startsWith("LH:")) counts.LH += Number(line.slice(3));
  }
  return counts;
};

const ui = totals(uiLcov);
const merged = totals(rootLcov);
const pct = (c) => (c.LF ? ((c.LH / c.LF) * 100).toFixed(2) : "0.00");
console.log(
  `\ncoverage/lcov.info now covers both published packages:\n` +
    `  @aios-alpha/ui  ${ui.LH}/${ui.LF} lines (${pct(ui)}%)\n` +
    `  repo total      ${merged.LH}/${merged.LF} lines (${pct(merged)}%)`,
);
