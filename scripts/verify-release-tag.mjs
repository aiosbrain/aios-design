import designPkg from "../package.json" with { type: "json" };
import uiPkg from "../react/package.json" with { type: "json" };

if (designPkg.version !== uiPkg.version) {
  console.error(`Refusing publish: package versions differ (@aios-alpha/design@${designPkg.version}, @aios-alpha/ui@${uiPkg.version})`);
  process.exit(1);
}

const expected = `v${designPkg.version}`;
if (process.env.GITHUB_REF_TYPE !== "tag" || process.env.GITHUB_REF_NAME !== expected) {
  console.error(`Refusing publish: expected tag ${expected}, got ${process.env.GITHUB_REF_TYPE ?? "unset"}:${process.env.GITHUB_REF_NAME ?? "unset"}`);
  process.exit(1);
}

console.log(`Release tag ${expected} matches @aios-alpha/design@${designPkg.version} and @aios-alpha/ui@${uiPkg.version}`);
