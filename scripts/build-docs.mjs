#!/usr/bin/env node
/**
 * build-docs.mjs
 *
 * Builds a structured, machine-readable API index from the raw reference
 * markdown in `references/` into `docs/`.
 *
 * Why this exists: the raw reference set is 340+ individual markdown files
 * (~135k lines). An AI coding tool that has to open them one by one burns its
 * context budget before it finds the right symbol. This script emits a compact
 * hierarchical index so a tool can resolve a name to a file in a single lookup
 * and then read only the one file it actually needs.
 *
 * Outputs (all under docs/):
 *   index.md         — human-readable index grouped by kind
 *   api-index.json   — machine-readable index (name -> file, kind, members)
 *   quick-reference.md — copied from references/_quick-reference.md
 *   stats.md         — coverage statistics
 *
 * Usage:
 *   node scripts/build-docs.mjs           # build docs/
 *   node scripts/build-docs.mjs --check   # verify docs/ matches sources (CI)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REF_DIR = path.join(ROOT, 'references');
const OUT_DIR = path.join(ROOT, 'docs');
const CHECK = process.argv.includes('--check');

const KINDS = [
  { dir: 'classes', kind: 'class', heading: '类 (Classes)', note: '包含全部方法与属性' },
  { dir: 'enums', kind: 'enum', heading: '枚举 (Enums)', note: '枚举成员与取值' },
  { dir: 'interfaces', kind: 'interface', heading: '接口 (Interfaces)', note: '包含全部属性' },
  { dir: 'types', kind: 'type', heading: '类型别名 (Type Aliases)', note: '结构化类型定义' },
];

/** Strip markdown escapes that the upstream doc generator adds. */
function unescapeMd(s) {
  return s.replace(/\\_/g, '_').replace(/\\\*/g, '*').replace(/\\`/g, '`');
}

/**
 * Parse one reference markdown file.
 *
 * The layout is produced by the upstream doc tool and is stable:
 *   line 1  "# <Name> class|enum|interface|type alias"
 *   line 2  short description
 *   then    "## Signature" fenced block, "## Remarks", member tables
 *
 * @param {string} file absolute path
 * @param {string} kind one of class|enum|interface|type
 */
function parseRefFile(file, kind) {
  const src = fs.readFileSync(file, 'utf8');
  const lines = src.split(/\r?\n/);

  let title = '';
  let description = '';
  let signature = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!title && line.startsWith('# ')) {
      title = unescapeMd(line.slice(2)).trim();
      // description = first non-empty, non-heading line after the title
      for (let j = i + 1; j < lines.length; j++) {
        const cand = lines[j].trim();
        if (!cand) continue;
        if (cand.startsWith('#')) break;
        description = cand;
        break;
      }
      continue;
    }

    if (!signature && line.trim() === '## Signature') {
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].startsWith('```')) {
          const buf = [];
          for (let k = j + 1; k < lines.length && !lines[k].startsWith('```'); k++) buf.push(lines[k]);
          signature = buf.join('\n').trim();
          break;
        }
      }
    }
  }

  // Drop the trailing kind word: " class" / " enum" / " interface" /
  // " type alias" / " variable" / " namespace" / " function"
  const name = title
    .replace(/\s+(class|enum|interface|type alias|type|variable|namespace|function)$/i, '')
    .trim();

  // Member count = markdown links to sibling member anchors inside tables.
  const members = (src.match(/\]\(\.\/[^)]+\.md\)/g) || []).length;

  const sections = [];
  for (const m of src.matchAll(/^##\s+(.+)$/gm)) {
    const h = m[1].trim();
    if (h !== 'Signature' && h !== 'Remarks') sections.push(h);
  }

  return {
    name,
    kind,
    file: path.relative(ROOT, file).split(path.sep).join('/'),
    description,
    signature,
    members,
    sections,
  };
}

/** Walk references/ and parse everything. */
function collect() {
  const entries = [];
  const problems = [];

  if (!fs.existsSync(REF_DIR)) {
    problems.push(`references/ directory not found at ${REF_DIR}`);
    return { entries, problems };
  }

  for (const { dir, kind } of KINDS) {
    const abs = path.join(REF_DIR, dir);
    if (!fs.existsSync(abs)) {
      problems.push(`references/${dir}/ is missing`);
      continue;
    }
    const files = fs.readdirSync(abs).filter((f) => f.endsWith('.md')).sort();
    if (files.length === 0) problems.push(`references/${dir}/ contains no markdown files`);

    for (const f of files) {
      const parsed = parseRefFile(path.join(abs, f), kind);
      // A missing description is tolerated (a few upstream pages have none);
      // a missing name means the file layout changed and we must not guess.
      if (!parsed.name) problems.push(`${dir}/${f}: could not determine symbol name`);
      entries.push(parsed);
    }
  }

  return { entries, problems };
}

/** Render docs/index.md */
function renderIndex(entries) {
  const byKind = new Map(KINDS.map((k) => [k.kind, []]));
  for (const e of entries) byKind.get(e.kind)?.push(e);

  const L = [];
  L.push('# EasyEDA Pro API 文档索引');
  L.push('');
  L.push('> 本文件由 `scripts/build-docs.mjs` 自动生成，请勿手动编辑。');
  L.push('> 机器可读版本见 [`api-index.json`](./api-index.json)。');
  L.push('');
  L.push('全局变量 `eda` 是 `EDA` 类的实例，所有 API 通过 `eda.xxx` 调用，例如：');
  L.push('');
  L.push('```js');
  L.push('await eda.dmt_Project.getCurrentProjectInfo();');
  L.push('await eda.sys_WebSocket.register();');
  L.push('```');
  L.push('');
  L.push('## 总览');
  L.push('');
  L.push('| 类别 | 数量 | 说明 |');
  L.push('|------|------|------|');
  for (const k of KINDS) {
    const n = (byKind.get(k.kind) || []).length;
    L.push(`| ${k.heading} | ${n} | ${k.note} |`);
  }
  L.push(`| **合计** | **${entries.length}** | |`);
  L.push('');

  for (const k of KINDS) {
    const list = byKind.get(k.kind) || [];
    if (list.length === 0) continue;
    L.push(`## ${k.heading}`);
    L.push('');
    L.push('| 名称 | 描述 | 成员数 | 文档 |');
    L.push('|------|------|--------|------|');
    for (const e of list) {
      const desc = (e.description || '').replace(/\|/g, '\\|').slice(0, 80);
      const rel = e.file.replace(/^references\//, '../references/');
      L.push(`| \`${e.name}\` | ${desc} | ${e.members} | [md](${rel}) |`);
    }
    L.push('');
  }

  L.push('---');
  L.push('');
  L.push('生成命令：`npm run build:docs`');
  L.push('');
  return L.join('\n');
}

/** Render docs/stats.md */
function renderStats(entries) {
  const byKind = new Map();
  for (const e of entries) byKind.set(e.kind, (byKind.get(e.kind) || 0) + 1);

  const withMembers = entries.filter((e) => e.members > 0);
  const totalMembers = entries.reduce((a, e) => a + e.members, 0);
  const top = [...entries].sort((a, b) => b.members - a.members).slice(0, 20);

  const L = [];
  L.push('# API 覆盖统计');
  L.push('');
  L.push('> 由 `scripts/build-docs.mjs` 自动生成。');
  L.push('');
  L.push('| 指标 | 数值 |');
  L.push('|------|------|');
  L.push(`| 符号总数 | ${entries.length} |`);
  for (const [kind, n] of [...byKind].sort()) L.push(`| 其中 ${kind} | ${n} |`);
  L.push(`| 有成员的符号 | ${withMembers.length} |`);
  L.push(`| 成员合计 | ${totalMembers} |`);
  L.push('');
  L.push('## 成员最多的 20 个符号');
  L.push('');
  L.push('| 符号 | 类别 | 成员数 |');
  L.push('|------|------|--------|');
  for (const e of top) L.push(`| \`${e.name}\` | ${e.kind} | ${e.members} |`);
  L.push('');
  return L.join('\n');
}

function main() {
  const { entries, problems } = collect();

  if (entries.length === 0) {
    console.error('❌ No reference entries found. Is references/ populated?');
    for (const p of problems) console.error('   - ' + p);
    process.exit(1);
  }

  const outputs = new Map();
  outputs.set('index.md', renderIndex(entries));
  outputs.set('stats.md', renderStats(entries));
  outputs.set(
    'api-index.json',
    JSON.stringify(
      {
        source: 'references/',
        generator: 'scripts/build-docs.mjs',
        counts: KINDS.reduce((acc, k) => {
          acc[k.kind] = entries.filter((e) => e.kind === k.kind).length;
          return acc;
        }, {}),
        total: entries.length,
        entries: entries.map((e) => ({
          name: e.name,
          kind: e.kind,
          file: e.file,
          description: e.description,
          members: e.members,
          sections: e.sections,
        })),
      },
      null,
      2
    ) + '\n'
  );

  // quick-reference is authored, not generated — copy it through
  const qr = path.join(REF_DIR, '_quick-reference.md');
  if (fs.existsSync(qr)) outputs.set('quick-reference.md', fs.readFileSync(qr, 'utf8'));

  if (CHECK) {
    let stale = 0;
    for (const [name, content] of outputs) {
      const target = path.join(OUT_DIR, name);
      if (!fs.existsSync(target)) {
        console.error(`❌ docs/${name} is missing — run: npm run build:docs`);
        stale++;
        continue;
      }
      if (fs.readFileSync(target, 'utf8') !== content) {
        console.error(`❌ docs/${name} is out of date — run: npm run build:docs`);
        stale++;
      }
    }
    if (stale > 0) process.exit(1);
    console.log(`✅ docs/ is up to date (${entries.length} symbols).`);
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [name, content] of outputs) {
    fs.writeFileSync(path.join(OUT_DIR, name), content);
  }

  const counts = KINDS.map((k) => `${entries.filter((e) => e.kind === k.kind).length} ${k.kind}`).join(', ');
  console.log(`✅ Built docs/ from ${entries.length} symbols (${counts})`);
  console.log(`   → docs/index.md, docs/api-index.json, docs/stats.md`);
  if (problems.length) {
    console.warn(`\n⚠️  ${problems.length} warning(s):`);
    for (const p of problems.slice(0, 20)) console.warn('   - ' + p);
    if (problems.length > 20) console.warn(`   ... and ${problems.length - 20} more`);
  }
}

main();
