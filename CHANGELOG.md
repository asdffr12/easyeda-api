# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.16] - 2026-09-17

### Added
- `scripts/build-docs.mjs` — builds `docs/` (a machine-readable `api-index.json`
  plus human-readable `index.md` / `stats.md`) from `references/`. Supports
  `--check` to fail when the committed index has drifted from its sources.
- `scripts/lint-docs.mjs` — verifies that relative links across `references/`,
  `format/`, `guide/` and `user-guide/` actually resolve, and that no symbol name
  collides within a tree. Site-absolute links inherited from the upstream docs
  site are counted and skipped rather than reported as broken.
- `scripts/pack.mjs` — stages the publishable file set into `dist/easyeda-api/`
  and writes `dist/easyeda-api.zip` using a built-in dependency-free zip writer.
- `test/bridge.test.mjs` — 10 integration tests that boot the real bridge on an
  isolated port range and drive it with a real WebSocket client and a fake EDA
  client. Covers the handshake, `/health`, `/eda-windows`, the error paths, and a
  full `execute` → `result` round trip.
- `AGENTS.md` — repository map, where to look for what, and the rules that apply
  when changing this repo.
- GitHub Actions CI (`.github/workflows/ci.yml`): syntax check, documentation link
  lint, `docs/` freshness check, test suite, and a packaging smoke test, on
  Node 20 and 22.
- npm scripts: `test`, `lint:docs`, `build:docs`, `pack`, `pack:fast`.

### Fixed
- **`POST /execute` returned HTTP 500 instead of 503 when no EDA client was
  attached.** The check matched the literal string `not connected`, but the common
  error text is `No EDA window connected`, which does not contain that substring.
  Callers that branch on 503 to tell the user to open EasyEDA were instead treating
  it as a server fault. Now matched against the full set of "not attached" errors.
- 15 broken relative links in `guide/`: `./how-to-start` and
  `./ancillary-projects/pro-api-*` were missing the `.md` extension,
  `../reference/…` pointed at a directory that does not exist (the tree is
  `references/`), and several upstream site-style `pro-api.*` targets were
  rewritten to the actual reference pages. `npm run lint:docs` is now clean across
  394 files.
- README documented a layout that did not match the repository: `reference/`
  instead of `references/`, `server/index.mjs` instead of
  `scripts/bridge-server.mjs`, and `AGENTS.md` / `scripts/build-docs.mjs` /
  `scripts/pack.mjs` / `test/` that were referenced but never committed.

### Changed
- `docs/` is now committed rather than gitignored, so a fresh clone has a working
  API index without a build step. `dist/` remains ignored. CI enforces that the
  committed index stays in sync with `references/`.
- The bridge's port range can be overridden via `EASYEDA_BRIDGE_PORT_START` and
  `EASYEDA_BRIDGE_PORT_END`, so the test suite can run without colliding with a
  bridge the user already has open.
- Both READMEs gained a Requirements section and a Development section, and a CI
  badge.

## [1.1.15] - 2026-09-17

### Added
- Initial public open-source release.
- MIT license, contribution guide and issue templates.
- `scripts/bridge-server.mjs`: WebSocket bridge that connects AI coding tools to a
  running EasyEDA Pro instance.
- `references/`: machine-readable API reference for the EasyEDA Pro extension SDK —
  classes, interfaces, enums and types (PCB / schematic / library / system domains).
- `format/`: documentation of the on-disk EasyEDA Pro file format (project, schematic,
  PCB primitives, rules, panelisation).
- `guide/`: how-to guides — getting started, invoking APIs, extension JSON manifest,
  inline frames, i18n, error handling, marketplace publishing, stability policy.
- Bilingual README (`README.md` / `README.zh-Hans.md`).
