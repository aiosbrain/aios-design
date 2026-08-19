# Changelog

## 0.6.0

### Licensing — MIT → Apache-2.0

**This release relicenses the design system from MIT to the Apache License, Version 2.0.**

> **Note on versioning.** This shipped briefly as `1.0.0` on the reasoning that a license
> change should never arrive quietly on a patch or minor. That reasoning is sound, but the
> conclusion was not: `1.0.0` is a statement about API *maturity*, and this package is still
> moving weekly. Spending the 1.0 milestone on a licensing event conflated "the terms
> changed" with "the API is now stable". The release is therefore `0.6.0`, and the loud
> signal lives here and in the README instead of in the version number. `1.0.0` is
> **deprecated** on npm and points at `^0.6.0`; anyone who installed it keeps working.

- **Versions published at `0.5.0` and earlier remain MIT.** Nothing is retracted. If you
  installed `@aios-alpha/design` or `@aios-alpha/ui` at those versions, you keep those
  packages under MIT permanently.
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
now `0.6.0`, but the contract itself is identical. Upgrading from `0.5.0` is a version-string
and licensing change, and nothing else.
