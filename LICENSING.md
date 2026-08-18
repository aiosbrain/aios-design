# Licensing

The AIOS Design System is open source, licensed under the **Apache License, Version 2.0**.

Copyright (C) 2026 Chetan Nandakumar and John Ellison.

---

## What is under which license

| Path | License |
| --- | --- |
| Everything in this repository | `Apache-2.0` |

**Why permissive, when the AIOS server is AGPL-3.0.** This is a design system meant to be
embedded in other people's interfaces. Tokens and components only earn their keep if they
can be dropped into anything, so a copyleft license here would defeat the purpose. The
split across the organization is deliberate: the server is AGPL because we host it, and
the things designed to be embedded are Apache-2.0 because we want them embedded.

Prior published versions declared MIT. **They remain MIT** — the relicense is
going-forward only and takes nothing away. See [`LICENSE-MIT`](LICENSE-MIT), which also
records an honest note: this repository never had a LICENSE file, and the MIT grant existed
only as a `package.json` field. That is now fixed.

---

## What this means for you

Apache-2.0 lets you use, modify, and redistribute this in commercial and closed-source
software. Your obligations are to keep the license and copyright notices, state what you
changed, and not use the project's trademarks to endorse your work. It also grants you a
patent license from the contributors.

There is no commercial license to buy and no free-license form to request. There is nothing
to negotiate — that is the point of a permissive license.

---

## The dependency-direction rule

Two licenses in one organization means one rule, and it only runs one way:

> **An Apache-2.0 package must never import from an AGPL-3.0 package.**
> Apache → AGPL is fine. AGPL → Apache is a license violation.

The reason is that the AGPL is contagious across a combined program and Apache-2.0 is not.
An AGPL module pulled into an Apache-2.0 package makes that package's Apache grant
undeliverable — we would be promising permissions on code we cannot grant them for. The
reverse is harmless: AGPL code may absorb Apache-2.0 code, and the result is AGPL.

The same rule holds across repositories in the `aiosbrain` organization. An Apache-2.0
repo may not depend on an AGPL-3.0 one.

For this repository the rule binds in the direction that matters most: **nothing here may
depend on the AGPL-licensed AIOS server code.** It does not today, and it should never
need to — a design system that reached into a server's internals would be broken on
architectural grounds long before it was broken on licensing grounds.

---

## Versioning of the license change

The relicense ships as a **major version bump**, not a patch or minor release, and it is
called out in the changelog and release notes. Quietly changing a license on a patch bump
is the one move in this whole exercise that genuinely annoys people, so we are not doing
it.

---

## Third-party components

[`NOTICE`](NOTICE) records the components carrying an attribution obligation.

---

## Contributing

Contributions are accepted under `Apache-2.0`. A Contributor License Agreement will be
introduced once our company is formed, at which point contributors will be asked to sign
one.
