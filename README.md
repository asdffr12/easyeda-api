[English](#) | [简体中文](./README.zh-Hans.md)

# EasyEDA API Skill

[![CI](https://github.com/asdffr12/easyeda-api/actions/workflows/ci.yml/badge.svg)](https://github.com/asdffr12/easyeda-api/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

An EasyEDA Pro API skill package for AI coding tools such as Claude Code, OpenCode, QwenCode, and any other tool that supports the [Agent Skills](https://agentskills.io/) standard.

This skill supports both online debugging of EasyEDA Pro through AI and extension development for EasyEDA Pro.
When developing EasyEDA extensions, AI can use the extension-development documentation, API references, type information, usage examples, and bridge debugging capabilities provided by this skill to help with API lookup, code generation, and integration debugging.
If you want to analyze or modify EasyEDA document source files directly instead of operating through the API, this project also provides documentation for the source file formats.

- 📚 **Structured API documentation** — Automatically builds hierarchical indexes from reference docs for fast AI lookup
- 🧾 **Document source format specifications** — Explains project, schematic, and PCB source formats for direct source analysis and modification
- 🔌 **WebSocket Bridge** — A Node.js server that bridges AI tools and the EasyEDA client
- 🤖 **SKILL.md** — A complete skill instruction file

## Requirements

- **Node.js 20 or newer** — the bridge and the build scripts use modern ESM and `node:test`.
- **EasyEDA Pro** with the `run-api-gateway.eext` extension installed, for live API access.
- No build step is required to *read* the API reference: the generated index in
  `docs/` is committed, so a fresh clone is usable immediately.

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Build API documentation

```bash
npm run build:docs
```

This reads the raw API documentation from the `references/` directory and generates a
structured, machine-readable index into the `docs/` directory — so an AI tool can resolve a
symbol name to a file in one lookup instead of scanning 340+ files.

### 3. Start the WebSocket Bridge server

```bash
npm run server
```

The server automatically chooses an available port in the `49620-49629` range and waits for the EasyEDA client to connect.

### 4. Connect from EasyEDA

Install the `run-api-gateway.eext` extension in EasyEDA. Download:

- https://jlcext.com/item/oshwhub-official/run-api-gateway

After the extension is loaded, it connects to the Bridge server automatically by scanning the port range and verifying the handshake.

### 5. Use from an AI coding tool

AI coding tools such as Claude Code, OpenCode, and QwenCode automatically read `SKILL.md` for instructions, then use the HTTP API to send code to EasyEDA:

```bash
# Check EasyEDA connection status (assuming the service is on port 49620)
curl http://localhost:49620/health

# Execute EasyEDA code
curl -X POST http://localhost:49620/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "return await eda.dmt_Project.getCurrentProjectInfo();"}'
```

## One-Command Packaging

```bash
npm run pack
```

This performs the following steps:
1. Build API documentation (`docs/`)
2. Package `SKILL.md`, documentation, and the server into `dist/easyeda-api/`
3. Generate `dist/easyeda-api.zip` for upload

If the documentation has already been built, you can skip that step:

```bash
npm run pack:fast
```

### Publish to ClawHub

```bash
npx clawhub@latest publish dist/easyeda-api/
```

Or upload the zip file at https://clawhub.ai/upload

## Development

```bash
npm test                       # bridge integration tests (node:test)
npm run lint:docs              # verify relative links in the doc trees resolve
npm run build:docs -- --check  # fail if docs/ is stale (run by CI)
```

`npm test` boots the real bridge on an isolated port range and drives it with a real
WebSocket client plus a fake EDA client. It asserts the handshake, the health endpoint,
the "no EDA attached" → 503 path, and a full `execute` → `result` round trip.

See [`AGENTS.md`](./AGENTS.md) for a map of the repository and the rules that apply when
changing it.

## Architecture

```
┌──────────────┐   HTTP/WS     ┌────────────────┐   WebSocket   ┌──────────┐
│   AI Agent   │ ◄───────────► │ Bridge Server  │ ◄───────────► │  EasyEDA │
│ (Skill Tool) │  Port Range   │   (Node.js)    │  Port Range   │ (Client) │
└──────────────┘  49620-49629  └────────────────┘  49620-49629  └──────────┘
```

## Communication Protocol

| Message Type | Direction | Description |
|--------------|-----------|-------------|
| `execute` | AI → EDA | Execute JavaScript code |
| `result` | EDA → AI | Return execution result |
| `error` | EDA → AI | Return execution error |
| `handshake` | Server → Client | Connection verification (includes `service: "easyeda-bridge"`) |
| `ping/pong` | Bidirectional | Heartbeat |

## Directory Structure

```text
easyeda-api/
  SKILL.md              # AgentSkills standard skill definition
  AGENTS.md             # Repository map + rules for AI agents and contributors
  package.json          # Project configuration and npm scripts
  references/           # Raw API reference: 346 symbols (classes/enums/interfaces/types)
  docs/                 # Generated index — committed, so no build step is needed to read it
    api-index.json      #   machine-readable: name -> file, kind, member count
    index.md            #   human-readable index grouped by kind
    stats.md            #   coverage statistics
  format/               # EasyEDA document source format specs (project/schematic/pcb)
  guide/                # API development guides
  user-guide/           # User guides
  scripts/
    bridge-server.mjs   # WebSocket bridge server (the runtime component)
    build-docs.mjs      # Builds docs/ from references/
    lint-docs.mjs       # Verifies relative links in the doc trees resolve
    pack.mjs            # Builds docs/ and produces the publishable zip
  test/
    bridge.test.mjs     # Bridge integration tests
  dist/                 # Packaging output (gitignored)
    easyeda-api/        # Publishable skill directory
    easyeda-api.zip     # Zip archive for ClawHub upload
```