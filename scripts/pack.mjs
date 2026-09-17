#!/usr/bin/env node
/**
 * pack.mjs
 *
 * Packages the skill into a publishable directory plus a zip archive.
 *
 * Steps:
 *   1. build docs/          (skipped with --fast)
 *   2. copy the publishable file set into dist/easyeda-api/
 *   3. zip dist/easyeda-api/ -> dist/easyeda-api.zip
 *
 * The zip is written by a small built-in writer (deflate is not required for
 * a handful of markdown files, and this keeps the project dependency-free).
 *
 * Usage:
 *   node scripts/pack.mjs          # build docs, then pack
 *   node scripts/pack.mjs --fast   # pack only (assumes docs/ is current)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PKG_DIR = path.join(DIST, 'easyeda-api');
const ZIP_PATH = path.join(DIST, 'easyeda-api.zip');
const FAST = process.argv.includes('--fast');

/** Everything that ships. Paths are relative to the repo root. */
const INCLUDE_FILES = [
  'SKILL.md',
  'AGENTS.md',
  'README.md',
  'README.zh-Hans.md',
  'LICENSE',
  'CHANGELOG.md',
  'package.json',
  'scripts/bridge-server.mjs',
];
const INCLUDE_DIRS = ['docs', 'format', 'guide', 'references', 'user-guide'];

// ─── minimal ZIP writer (store method, UTF-8 names) ─────────────────

let CRC_TABLE = null;
function crc32(buf) {
  if (!CRC_TABLE) {
    CRC_TABLE = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      CRC_TABLE[n] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ buf[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

function makeZip(entries) {
  const now = new Date();
  const dosTime = ((now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2)) & 0xffff;
  const dosDate = (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()) & 0xffff;

  const localChunks = [];
  const centralChunks = [];
  let offset = 0;

  for (const { name, data } of entries) {
    const nameBuf = Buffer.from(name, 'utf8');
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);      // version needed
    local.writeUInt16LE(0x0800, 6);  // general purpose flag: UTF-8 filename
    local.writeUInt16LE(0, 8);       // method 0 = store
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);      // extra length
    localChunks.push(local, nameBuf, data);

    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4);         // version made by
    cd.writeUInt16LE(20, 6);         // version needed
    cd.writeUInt16LE(0x0800, 8);
    cd.writeUInt16LE(0, 10);
    cd.writeUInt16LE(dosTime, 12);
    cd.writeUInt16LE(dosDate, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(data.length, 20);
    cd.writeUInt32LE(data.length, 24);
    cd.writeUInt16LE(nameBuf.length, 28);
    cd.writeUInt16LE(0, 30);         // extra
    cd.writeUInt16LE(0, 32);         // comment
    cd.writeUInt16LE(0, 34);         // disk number start
    cd.writeUInt16LE(0, 36);         // internal attrs
    cd.writeUInt32LE(0, 38);         // external attrs
    cd.writeUInt32LE(offset, 42);    // local header offset
    centralChunks.push(cd, nameBuf);

    offset += local.length + nameBuf.length + data.length;
  }

  const central = Buffer.concat(centralChunks);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(central.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  return Buffer.concat([...localChunks, central, end]);
}

// ─── helpers ────────────────────────────────────────────────────────

function walk(absDir, relPrefix, out) {
  for (const name of fs.readdirSync(absDir).sort()) {
    const abs = path.join(absDir, name);
    const rel = `${relPrefix}/${name}`;
    const st = fs.statSync(abs);
    if (st.isDirectory()) walk(abs, rel, out);
    else if (st.isFile()) out.push({ rel, abs });
  }
}

function rmrf(target) {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

// ─── main ───────────────────────────────────────────────────────────

function main() {
  if (!FAST) {
    console.log('▶ Building docs…');
    execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'build-docs.mjs')], { stdio: 'inherit' });
  } else if (!fs.existsSync(path.join(ROOT, 'docs', 'api-index.json'))) {
    console.error('❌ docs/api-index.json is missing. Run without --fast, or run: npm run build:docs');
    process.exit(1);
  }

  console.log('▶ Staging files…');
  rmrf(PKG_DIR);
  fs.mkdirSync(PKG_DIR, { recursive: true });

  const files = [];
  for (const f of INCLUDE_FILES) {
    const abs = path.join(ROOT, f);
    if (!fs.existsSync(abs)) {
      console.warn(`   ⚠️  skip missing file: ${f}`);
      continue;
    }
    files.push({ rel: f, abs });
  }
  for (const d of INCLUDE_DIRS) {
    const abs = path.join(ROOT, d);
    if (!fs.existsSync(abs)) {
      console.warn(`   ⚠️  skip missing dir: ${d}/`);
      continue;
    }
    walk(abs, d, files);
  }

  if (files.length === 0) {
    console.error('❌ Nothing to package.');
    process.exit(1);
  }

  const zipEntries = [];
  for (const { rel, abs } of files) {
    const data = fs.readFileSync(abs);
    const outAbs = path.join(PKG_DIR, rel);
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });
    fs.writeFileSync(outAbs, data);
    zipEntries.push({ name: `easyeda-api/${rel}`, data });
  }

  console.log(`▶ Zipping ${zipEntries.length} files…`);
  const zip = makeZip(zipEntries);
  fs.writeFileSync(ZIP_PATH, zip);

  const kb = (n) => (n / 1024).toFixed(1) + ' KB';
  console.log('');
  console.log(`✅ Packaged ${zipEntries.length} files`);
  console.log(`   dist/easyeda-api/      (directory)`);
  console.log(`   dist/easyeda-api.zip   ${kb(zip.length)}`);
  console.log('');
  console.log('   Publish with:  npx clawhub@latest publish dist/easyeda-api/');
  console.log('   Or upload:     https://clawhub.ai/upload');
}

main();
