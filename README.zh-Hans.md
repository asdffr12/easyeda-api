[English](./README.md) | [简体中文](#)

# EasyEDA API Skill

[![CI](https://github.com/asdffr12/easyeda-api/actions/workflows/ci.yml/badge.svg)](https://github.com/asdffr12/easyeda-api/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

供 AI 编程工具（Claude Code、OpenCode、QwenCode 等所有支持 [Agent Skills](https://agentskills.io/) 标准的工具）使用的 EasyEDA Pro API 技能包（Skill）。

这个 SKILL 不仅支持 AI 在线调试嘉立创EDA，也支持辅助开发嘉立创EDA扩展。
在开发嘉立创EDA扩展时，AI 可以使用本 SKILL 提供的扩展开发相关文档、API 参考、类型信息、调用示例以及桥接调试能力，帮助完成接口查询、代码编写与联调验证。
如果用户准备自行分析或修改嘉立创EDA文档源码，而不是通过 API 操作，也可以使用本项目提供的文档源码格式说明。

- 📚 **结构化 API 文档** — 自动从参考文档生成分层索引，便于 AI 快速查阅
- 🧾 **文档源码格式规范** — 说明工程、原理图、PCB 文档源码格式，适合直接分析和修改源码的场景
- 🔌 **WebSocket Bridge** — Node.js 服务端，桥接 AI 和 EasyEDA 客户端
- 🤖 **SKILL.md** — 完整的技能指导文件

## 环境要求

- **Node.js 20 或更高版本** —— Bridge 与构建脚本使用了现代 ESM 和 `node:test`。
- **嘉立创EDA（EasyEDA Pro）**，并安装 `run-api-gateway.eext` 扩展，才能进行在线 API 调用。
- 只是**查阅** API 参考的话不需要构建：生成好的索引已随仓库提交，克隆下来即可直接使用。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 构建 API 文档

```bash
npm run build:docs
```

这会从 `references/` 目录读取原始 API 文档，生成结构化、机器可读的索引到 `docs/` 目录 —— AI 工具因此可以一次查表把符号名定位到文件，而不必翻遍 340 多个文件。

### 3. 启动 WebSocket Bridge 服务器

```bash
npm run server
```

服务器自动在端口范围 `49620-49629` 中选择可用端口启动，等待 EasyEDA 客户端连接。

### 4. EasyEDA 端连接

在嘉立创EDA中安装 `run-api-gateway.eext` 扩展，下载地址：

- https://jlc-ext.com/item/oshwhub/run-api-gateway

扩展加载后会自动连接到 Bridge 服务器（自动扫描端口范围，验证握手后连接）。

### 5. 使用 AI 编程工具

AI 编程工具（Claude Code、OpenCode、QwenCode 等）会自动读取 `SKILL.md` 获取技能指导，通过 HTTP API 向 EDA 发送代码：

```bash
# 检查 EDA 连接状态（端口自动发现，此处假设服务在 49620）
curl http://localhost:49620/health

# 执行 EDA 代码
curl -X POST http://localhost:49620/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "return await eda.dmt_Project.getCurrentProjectInfo();"}'
```

## 一键打包

```bash
npm run pack
```

这会执行以下步骤：
1. 构建 API 文档（`docs/`）
2. 将 SKILL.md、文档、服务器打包到 `dist/easyeda-api/`
3. 生成 `dist/easyeda-api.zip` 用于上传

如果文档已构建好，可跳过构建步骤：

```bash
npm run pack:fast
```

### 发布到 ClawHub

```bash
npx clawhub@latest publish dist/easyeda-api/
```

或上传 zip 文件到 https://clawhub.ai/upload

## 开发

```bash
npm test                       # Bridge 集成测试（node:test）
npm run lint:docs              # 校验文档树里的相对链接是否都能解析
npm run build:docs -- --check  # 检查 docs/ 是否已过期（CI 会跑）
```

`npm test` 会在一个独立端口段上启动真实的 Bridge，用真实 WebSocket 客户端加一个假 EDA 客户端驱动它，
断言握手、健康检查、"未连接 EDA" 时的 503 分支，以及完整的 `execute` → `result` 往返。

仓库结构说明与改动时需遵守的规则见 [`AGENTS.md`](./AGENTS.md)。

## 架构

```
┌──────────────┐   HTTP/WS     ┌────────────────┐   WebSocket   ┌──────────┐
│   AI Agent   │ ◄───────────► │ Bridge Server  │ ◄───────────► │  EasyEDA │
│ (Skill Tool) │  Port Range   │   (Node.js)    │  Port Range   │ (Client) │
└──────────────┘  49620-49629  └────────────────┘  49620-49629  └──────────┘
```

## 通信协议

| 消息类型 | 方向 | 说明 |
|----------|------|------|
| `execute` | AI → EDA | 执行 JS 代码 |
| `result` | EDA → AI | 返回执行结果 |
| `error` | EDA → AI | 返回执行错误 |
| `handshake` | Server → Client | 连接验证（含 `service: "easyeda-bridge"`） |
| `ping/pong` | 双向 | 心跳检测 |

## 目录结构

```
easyeda-api/
  SKILL.md              # AgentSkills 标准技能定义
  AGENTS.md             # 仓库结构与改动规则（给 AI agent / 贡献者）
  package.json          # 项目配置与 npm 脚本
  references/           # 原始 API 参考：346 个符号（classes/enums/interfaces/types）
  docs/                 # 生成的索引（随仓库提交，克隆即可用，无需构建）
    api-index.json      #   机器可读：符号名 -> 文件、类别、成员数
    index.md            #   按类别分组的可读索引
    stats.md            #   覆盖统计
  format/               # 嘉立创EDA文档源码格式规范（project/schematic/pcb）
  guide/                # API 开发指南（人工撰写）
  user-guide/           # 用户指南（人工撰写）
  scripts/
    bridge-server.mjs   # WebSocket Bridge 服务器（运行时组件）
    build-docs.mjs      # 从 references/ 构建 docs/
    lint-docs.mjs       # 校验文档树中的相对链接
    pack.mjs            # 构建 docs/ 并产出可发布 zip
  test/
    bridge.test.mjs     # Bridge 集成测试
  dist/                 # 打包输出（gitignore）
    easyeda-api/        # 可发布的 skill 目录
    easyeda-api.zip     # 用于 ClawHub 上传的 zip 文件
```
