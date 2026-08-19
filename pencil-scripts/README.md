# Pencil generator scripts

Scripts that run inside **Pencil's** script runtime (see `../PENCIL.md`), not Node and not a
browser. They read the injected `pencil` global (`pencil.input`, `pencil.width`, `pencil.height`)
and hand nodes back with a **top-level `return`**.

That shape is required by the runtime and is invalid in ordinary JavaScript, so general-purpose
linters flag these files. `.codacy.yaml` excludes this directory for exactly that reason — don't
"fix" the `return` or declare `pencil`, or the script stops working where it actually runs.

These are design source, not shipped code: `package.json`'s `files` allowlist keeps them out of
the npm tarball.

| Script | What it generates |
|---|---|
| `hero-dots.js` | The hero dot grid — a `spacing`-parameterised field of 3px dots, capped at 1000 nodes. |
