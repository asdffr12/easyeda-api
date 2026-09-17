#!/usr/bin/env node
/**
 * lint-docs.mjs
 *
 * Checks that relative markdown links inside the documentation trees resolve.
 *
 * The reference set is large (~350 files) and is regenerated from a moving
 * upstream SDK, so link rot creeps in silently: a renamed symbol leaves every
 * cross-reference pointing at nothing, and nothing else in the toolchain
 * notices. This is the check that catches it.
 *
 * Checks:
 *   - relative links point at a file that exists
 *   - no duplicate symbol names across a tree (would make links ambiguous)
 *
 * External links (http/https) and pure anchors (#foo) are ignored — they are
 * not verifiable offline.
 *
 * Usage:
 *   node scripts/lint-docs.mjs            # report and exit non-zero on problems
 *   node scripts/lint-docs.mjs --no-fail  # report only
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TREES = ['references', 'format', 'guide', 'user-guide'];
const NO_FAIL = process.argv.includes('--no-fail');

const LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;

function walk(dir, out) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir).sort()) {
    const abs = path.join(dir, name);
    const st = fs.statSync(abs);
    if (st.isDirectory()) walk(abs, out);
    else if (st.isFile() && name.endsWith('.md')) out.push(abs);
  }
  return out;
}

function checkLinks(abs) {
  const src = fs.readFileSync(abs, 'utf8');
  const dir = path.dirname(abs);
  const broken = [];
  let siteAbsolute = 0;

  for (const m of src.matchAll(LINK_RE)) {
    let target = m[1].trim();
    if (!target) continue;
    if (/^(https?:|mailto:|tel:|#)/i.test(target)) continue;

    // Site-absolute paths (/en/..., /storage/...) are artefacts of the upstream
    // documentation site these pages were exported from. They are not
    // filesystem paths, so resolving them locally is meaningless — counted
    // separately rather than reported as broken.
    if (target.startsWith('/')) {
      siteAbsolute++;
      continue;
    }

    // Strip anchor / query before resolving.
    target = target.split('#')[0].split('?')[0];
    if (!target) continue;

    let decoded = target;
    try {
      decoded = decodeURIComponent(target);
    } catch {
      /* keep raw on malformed escapes */
    }

    const resolved = path.resolve(dir, decoded);
    if (!fs.existsSync(resolved)) {
      broken.push({ raw: m[1], missing: path.relative(ROOT, resolved).split(path.sep).join('/') });
    }
  }
  return { broken, siteAbsolute };
}

function main() {
  const files = [];
  for (const tree of TREES) {
    const abs = path.join(ROOT, tree);
    if (!fs.existsSync(abs)) {
      console.error(`❌ expected documentation tree is missing: ${tree}/`);
      process.exit(1);
    }
    walk(abs, files);
  }

  if (files.length === 0) {
    console.error('❌ no markdown files found to lint');
    process.exit(1);
  }

  let totalBroken = 0;
  let totalSiteAbsolute = 0;
  const offenders = [];

  for (const abs of files) {
    const { broken, siteAbsolute } = checkLinks(abs);
    totalSiteAbsolute += siteAbsolute;
    if (broken.length) {
      totalBroken += broken.length;
      offenders.push({ file: path.relative(ROOT, abs).split(path.sep).join('/'), broken });
    }
  }

  // Duplicate names within a tree make a link target ambiguous.
  const dupes = [];
  for (const tree of ['references/classes', 'references/enums', 'references/interfaces', 'references/types']) {
    const abs = path.join(ROOT, tree);
    if (!fs.existsSync(abs)) continue;
    const seen = new Map();
    for (const name of fs.readdirSync(abs).filter((f) => f.endsWith('.md'))) {
      const key = name.toLowerCase();
      if (seen.has(key)) dupes.push(`${tree}: ${name} collides with ${seen.get(key)}`);
      else seen.set(key, name);
    }
  }

  const note = totalSiteAbsolute
    ? `\n   ℹ️  ${totalSiteAbsolute} site-absolute link(s) (/en/…, /storage/…) skipped — these come from the upstream docs site.`
    : '';

  const problems = totalBroken + dupes.length;
  if (problems === 0) {
    console.log(`✅ ${files.length} markdown files checked — no broken relative links, no duplicate names.${note}`);
    return;
  }

  console.error(`❌ ${files.length} files checked, ${problems} problem(s):\n`);

  for (const { file, broken } of offenders.slice(0, 15)) {
    console.error(`  ${file}  (${broken.length})`);
    for (const b of broken.slice(0, 5)) console.error(`     → ${b.raw}  ⇒ missing ${b.missing}`);
    if (broken.length > 5) console.error(`     … and ${broken.length - 5} more`);
  }
  if (offenders.length > 15) console.error(`  … and ${offenders.length - 15} more files with broken links`);

  for (const d of dupes) console.error(`  duplicate: ${d}`);

  if (NO_FAIL) {
    console.error('\n(--no-fail: reporting only)');
    return;
  }
  process.exit(1);
}

main();
