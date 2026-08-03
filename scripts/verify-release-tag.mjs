import pkg from "../package.json" with { type: "json" };

const expected = `v${pkg.version}`;
if (process.env.GITHUB_REF_TYPE !== "tag" || process.env.GITHUB_REF_NAME !== expected) {
  console.error(`Refusing publish: expected tag ${expected}, got ${process.env.GITHUB_REF_TYPE ?? "unset"}:${process.env.GITHUB_REF_NAME ?? "unset"}`);
  process.exit(1);
}

console.log(`Release tag ${expected} matches @aios-alpha/design@${pkg.version}`);
