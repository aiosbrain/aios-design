# Changelog

## 1.0.0

### Licensing — MIT → Apache-2.0

**This release relicenses the design system from MIT to the Apache License, Version 2.0.**
It is a major version bump for exactly that reason: a license change should never arrive on
a patch or minor release, where nobody would notice it.

- **Versions published before this one remain MIT.** Nothing is retracted. If you installed
  `@aios-alpha/design` or `@aios-alpha/ui` at `0.x`, you keep those packages under MIT
  permanently.
- **Apache-2.0 is also permissive**, so for almost everyone this changes nothing in
  practice. You can still use these packages in commercial and closed-source software. The
  differences from MIT are that Apache-2.0 adds an explicit **patent grant** from
  contributors, asks you to **state what you changed**, and includes a trademark clause.
- **The repository now has an actual `LICENSE` file.** It previously published with a
  `"license": "MIT"` field in `package.json` and no license text behind it. That omission is
  fixed, and `LICENSE-MIT` records the terms the earlier releases were offered under.
- Why permissive at all, when the AIOS server is AGPL-3.0: a design system only earns its
  keep if it can be dropped into anything. See [`LICENSING.md`](LICENSING.md).

### No functional changes

Token values, CSS variables, the Tailwind bridge, brand assets, and every component API are
**unchanged from 0.5.0**. The `DESIGN.md` contract version tracks the package version and is
now `1.0.0`, but the contract itself is identical. Upgrading from `0.5.0` is a version-string
change and nothing else.
