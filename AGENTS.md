# AGENTS.md

Guidance for AI coding agents working **on** this repository, and for agents
that consume this repository as a skill.

---

## What this project is

An [Agent Skills](https://agentskills.io/)-format package that teaches an AI
coding tool how to drive **EasyEDA Pro** — a browser-based EDA (electronic
design automation) application — either by calling its runtime API over a
WebSocket bridge, or by reading/writing its on-disk document formats directly.

There are two distinct consumers, and they want different things:

| Consumer | Entry point | Wants |
|---|---|---|
| AI tool using the skill | `SKILL.md` | How to connect and what to call |
| Contributor to this repo | this file | Where the data lives, how to build and test |

## Repository map

```text
SKILL.md                 The skill definition (AgentSkills format). Read this first.
AGENTS.md                You are here.
references/              Raw API reference, 346 symbols / ~135k lines.
  _index.md              Generated index of every symbol.
  _quick-reference.md    Hand-curated cheat sheet — often faster than searching.
  classes/  enums/       One markdown file per symbol.
  interfaces/  types/
format/                  EasyEDA Pro on-disk document formats.
  project/  schematic/  pcb/
guide/                   Task-oriented how-to guides (12 docs).
user-guide/              End-user documentation.
scripts/
  bridge-server.mjs      The WebSocket bridge (the runtime component).
  build-docs.mjs         Builds docs/ from references/.
  pack.mjs               Builds docs/ and produces the publishable zip.
test/
  bridge.test.mjs        Integration tests for the bridge.
docs/                    Generated. Do not edit by hand.
dist/                    Generated. Do not edit by hand.
```

## Where to look for what

Do not read `references/` linearly — it is 135k lines and will exhaust your
context. Resolve the symbol first, then open exactly one file.

| You need to… | Read |
|---|---|
| Know which class owns an API | `docs/api-index.json` (name → file), or `references/_index.md` |
| Look up one method signature | `references/classes/<ClassName>.md` |
| Find an enum's allowed values | `references/enums/<EnumName>.md` |
| Understand a `.epro`/`.esch`/`.epcb` file | `format/<project\|schematic\|pcb>/` |
| Write an EasyEDA extension | `guide/how-to-start.md`, then `guide/invoke-apis.md` |
| Understand the bridge wire protocol | Header comment of `scripts/bridge-server.mjs` |
| Handle errors from the API | `guide/error-handling.md` |
| Publish an extension | `guide/extensions-marketplace.md` |

Naming convention across the whole reference set:

- `dmt_*` — document tree (projects, boards, schematics, folders)
- `sch_*` / `ISCH_*` — schematic domain
- `pcb_*` / `IPCB_*` — PCB domain
- `lib_*` / `ELIB_*` — library / footprint domain
- `sys_*` — system services (WebSocket, window, unit, tool)
- `eda.*` — the root namespace; `eda` is an instance of the `EDA` class

## Working on this repository

```bash
npm install            # only needed for the bridge server (ws)
npm run build:docs     # regenerate docs/ from references/
npm run build:docs -- --check   # verify docs/ is not stale (used by CI)
npm test               # run the bridge integration tests
npm run pack           # build + package into dist/
```

### Rules

1. **Never hand-edit anything under `docs/` or `dist/`.** They are generated.
   Change `scripts/build-docs.mjs` or `references/` and rebuild.
2. **`references/` is upstream-generated** — treat the file layout as an
   external contract. If a page's shape surprises the parser, fix the parser
   and add a test; do not rewrite the page.
3. **`docs/` is committed on purpose.** Cloning the repo should give a working
   index without a build step. `--check` in CI keeps it honest.
4. **The bridge binds to `127.0.0.1` only.** It executes arbitrary JavaScript
   in the EasyEDA client, so it must never listen on a public interface.
   Any change that widens that surface is a security regression.
5. Keep new documentation in both languages where a translation already
   exists (`README.md` / `README.zh-Hans.md`).

### Testing

`test/bridge.test.mjs` boots the real server on an ephemeral port and drives it
with a real WebSocket client. It asserts the handshake, the health endpoint, the
"no EDA connected" error path, and a full execute → result round trip against a
fake EDA client. Add a case here for any protocol change.

## For agents consuming the skill

The skill's job is to let you operate a running EasyEDA Pro instance. The
minimum viable loop is:

```bash
npm run server                              # start the bridge (picks a free port in 49620-49629)
curl http://localhost:49620/health          # confirm service + whether an EDA window is attached
curl -X POST http://localhost:49620/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "return await eda.dmt_Project.getCurrentProjectInfo();"}'
```

The bridge only works while the `run-api-gateway.eext` extension is installed
in EasyEDA Pro and the client has connected. If `/execute` returns 503, no EDA
window is attached — tell the user to open EasyEDA, rather than retrying.
