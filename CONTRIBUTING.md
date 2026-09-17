# Contributing

Thanks for your interest in improving `easyeda-api`.

## Ways to contribute

- **Fix documentation** — the `references/` and `format/` trees are large and generated
  from a moving upstream SDK. Corrections to signatures, types or wording are always welcome.
- **Report upstream drift** — if the EasyEDA Pro SDK changed and a reference page is now
  wrong, open an issue with the upstream version you observed.
- **Improve the bridge** — `scripts/bridge-server.mjs` is the runtime piece. Bug fixes,
  better error messages and reconnect handling are appreciated.

## Development setup

```bash
git clone https://github.com/asdffr12/easyeda-api.git
cd easyeda-api
npm install
npm run server      # starts the WebSocket bridge
npm test            # runs the bridge integration tests
```

## Pull request checklist

- [ ] Keep one logical change per pull request.
- [ ] Run `npm test` — the bridge integration tests must pass.
- [ ] Run `npm run lint:docs` if you touched markdown under `references/`, `format/`,
      `guide/` or `user-guide/` — it catches links that no longer resolve.
- [ ] Run `npm run build:docs` if you changed anything under `references/`, and commit
      the regenerated `docs/` (CI fails if the committed index is stale).
- [ ] Update `CHANGELOG.md` under an "Unreleased" heading.
- [ ] Do not paste API keys, tokens or private project data into issues or commits.

## Reporting security issues

Please do not open a public issue for security problems. Use GitHub's private
vulnerability reporting on the Security tab of this repository.

## Code of conduct

Be respectful. Assume good faith. Technical criticism is fine; personal attacks are not.
