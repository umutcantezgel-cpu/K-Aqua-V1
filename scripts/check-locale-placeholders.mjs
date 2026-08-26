#!/usr/bin/env node
/**
 * Placeholder audit across all 65 locale files.
 *
 * WHY THIS EXISTS. `check-locale-parity.mjs` compares the three curated
 * locales (de, en, ar) and counts KEYS. That is the right check for what it
 * measures, but it is blind to the failure mode that actually ships: a locale
 * file with every key present and every value set to the same filler string.
 * Parity is green, the page renders, and a visitor in Yangon reads
 * „translated text" on every heading.
 *
 * Measured on 2026-08-25, before this script existed:
 *
 *   am   4173 of 5091 values (82 %)  „የተተረጎመ"                  = „translated"
 *   my   2537 of 5223 values (49 %)  „ဘာသာပြန်ဆိုထားသော စာသား"  = „translated text"
 *   km   2011 of 5523 values (36 %)  „x"
 *   lo    632 of 5127 values (12 %)  „."
 *   id    630 of 5349 values (12 %)  „-"
 *   uz    571 of 5322 values (11 %)  „Batafsil ma'lumot..."     = „More information…"
 *
 * None of that was visible from any existing check.
 *
 * WHY A PLACEHOLDER IS WORSE THAN A MISSING KEY. `lib/i18n/request.ts` merges
 * de → en → target, so anything a locale does not carry falls back to English:
 *
 *     merge({}, {k:'Deutscher Text'}, {k:'English text'}, {})       → 'English text'
 *     merge({}, {k:'Deutscher Text'}, {k:'English text'}, {k:'x'})  → 'x'
 *
 * A key that is simply absent shows usable English. A key filled with „x"
 * overrides the fallback and shows „x". The 2011 placeholders in `km.json`
 * are therefore not a gap in the translation — they are actively destroying a
 * working fallback. Deleting them would improve the page.
 *
 * That is also why `check-locale-parity.mjs` restricting itself to de, en and
 * ar is right rather than an oversight: those three are the merge chain, and
 * parity there is what guarantees every key resolves to something. The other
 * 62 locales are best-effort on top. This script covers what that leaves open.
 *
 * HOW IT DETECTS. Not by a list of known filler strings — those differ per
 * language and the next one would slip through. Instead by repetition: a real
 * translation says different things in different places, a placeholder says
 * the same thing everywhere. Any single value that fills more than a threshold
 * share of a locale's leaves is reported.
 *
 * Usage:
 *   node scripts/check-locale-placeholders.mjs            report, exit 0
 *   node scripts/check-locale-placeholders.mjs --strict   exit 1 on any finding
 *   node scripts/check-locale-placeholders.mjs --json     machine readable
 *   node scripts/check-locale-placeholders.mjs --threshold 0.02
 */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const messagesDir = resolve(root, 'messages');

const argv = process.argv.slice(2);
const asJson = argv.includes('--json');
const strict = argv.includes('--strict');

const thresholdArg = argv.indexOf('--threshold');
/** Share of a locale's leaf values one single string may occupy before it counts. */
const THRESHOLD =
  thresholdArg >= 0 && argv[thresholdArg + 1] ? Number(argv[thresholdArg + 1]) : 0.05;

/**
 * Values that legitimately repeat and must not be mistaken for filler.
 *
 * Short, language-neutral tokens turn up hundreds of times in a healthy file:
 * units, product codes, brand names, a dash meaning „not applicable". Anything
 * short enough to be a token rather than a sentence is therefore only counted
 * when it dominates outright.
 *
 * WITH ONE EXCEPTION, and it is the one that matters. A short token is still a
 * placeholder when it sits in a field that is meant to carry prose. A single
 * full stop is a plausible table cell; a single full stop as the ANSWER to a
 * frequently asked question is not.
 *
 * That exception is not hypothetical. `lo.json` carries „.“ and `id.json`
 * carries „-“ in 210 FAQ questions and 210 FAQ answers each, plus 210 SEO
 * paragraphs. Those FAQ arrays are rendered on the product pages AND reported
 * to search engines as FAQPage structured data — so both locales currently
 * publish a machine-readable FAQ whose every question is a punctuation mark.
 * A length rule alone would wave that through.
 */
const TOKEN_MAX_LENGTH = 3;
const TOKEN_THRESHOLD = 0.25;

/** Field names whose content is prose, never a token. */
const PROSE_FIELD = /^(q|a|question|answer|title\d*|desc|description|lead|text|body|intro|p\d|seo_p\d|label|name|summary|caption)$/i;

/** Strips array indices so `faq[3].q` compares as `q`. */
function fieldName(path) {
  const last = path.split('.').pop() ?? '';
  return last.replace(/\[\d+\]$/, '');
}

function leaves(node, out = []) {
  if (node === null || node === undefined) return out;
  if (typeof node === 'string') {
    if (node.trim()) out.push(node);
    return out;
  }
  if (typeof node === 'number' || typeof node === 'boolean') return out;
  if (Array.isArray(node)) {
    for (const v of node) leaves(v, out);
    return out;
  }
  for (const v of Object.values(node)) leaves(v, out);
  return out;
}

/** Where a value sits, so a finding can be acted on rather than only noted. */
function pathsOf(node, needle, prefix = '', out = []) {
  if (typeof node === 'string') {
    if (node === needle) out.push(prefix);
    return out;
  }
  if (node === null || typeof node !== 'object') return out;
  if (Array.isArray(node)) {
    node.forEach((v, i) => pathsOf(v, needle, `${prefix}[${i}]`, out));
    return out;
  }
  for (const [k, v] of Object.entries(node)) {
    pathsOf(v, needle, prefix ? `${prefix}.${k}` : k, out);
  }
  return out;
}

const findings = [];

for (const file of readdirSync(messagesDir).filter((f) => f.endsWith('.json')).sort()) {
  const locale = basename(file, '.json');
  let data;
  try {
    data = JSON.parse(readFileSync(resolve(messagesDir, file), 'utf8'));
  } catch (error) {
    findings.push({ locale, error: String(error.message).slice(0, 120) });
    continue;
  }

  const values = leaves(data);
  if (values.length === 0) continue;

  const counts = new Map();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);

  for (const [value, count] of counts) {
    const share = count / values.length;
    if (share < THRESHOLD) continue;

    const paths = pathsOf(data, value);

    // A short token needs the higher bar — unless it sits in prose fields,
    // where no token belongs at any frequency.
    if (value.length <= TOKEN_MAX_LENGTH) {
      const inProse = paths.filter((p) => PROSE_FIELD.test(fieldName(p))).length;
      if (inProse === 0 && share < TOKEN_THRESHOLD) continue;
    }

    // The top namespaces, so the report says where the gap is.
    const namespaces = new Map();
    for (const p of paths) {
      const ns = p.split(/[.[]/)[0];
      namespaces.set(ns, (namespaces.get(ns) ?? 0) + 1);
    }
    const worst = [...namespaces.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([ns, n]) => `${ns} (${n})`);

    findings.push({
      locale,
      value,
      count,
      total: values.length,
      share,
      namespaces: worst,
    });
  }
}

findings.sort((a, b) => (b.share ?? 0) - (a.share ?? 0));

if (asJson) {
  console.log(JSON.stringify(findings, null, 2));
} else if (findings.length === 0) {
  console.log('\n✓ Keine Platzhalter-Häufung in den Sprachdateien.\n');
} else {
  console.log(
    `\nPlatzhalter-Verdacht in ${new Set(findings.map((f) => f.locale)).size} von 65 Sprachdateien`,
  );
  console.log(
    `Erkannt wird ein Wert, der mehr als ${(THRESHOLD * 100).toFixed(0)} % der Textwerte einer Datei füllt.\n`,
  );
  for (const f of findings) {
    if (f.error) {
      console.log(`  ${f.locale.padEnd(9)} DEFEKTES JSON: ${f.error}`);
      continue;
    }
    const pct = `${(f.share * 100).toFixed(0)} %`;
    console.log(
      `  ${f.locale.padEnd(9)}${String(f.count).padStart(6)} von ${String(f.total).padEnd(6)}${pct.padStart(6)}   „${f.value.slice(0, 40)}“`,
    );
    console.log(`  ${''.padEnd(9)}${' '.repeat(20)}betroffen: ${f.namespaces.join(', ')}`);
  }
  console.log(
    '\nDiese Sprachfassungen werden Besuchern ausgeliefert. Die Schlüsselparität\n' +
      'schlägt darauf nicht an — sie zählt Schlüssel, nicht Inhalte.\n' +
      '\n' +
      'Zu beachten: die Rückfallkette in lib/i18n/request.ts lautet de → en →\n' +
      'Zielsprache. Ein FEHLENDER Schlüssel zeigt daher englischen Text; ein\n' +
      'Platzhalter überschreibt den Rückfall und zeigt den Platzhalter. Diese\n' +
      'Werte ersatzlos zu löschen würde die betroffenen Seiten verbessern.\n',
  );
}

if (strict && findings.length > 0) process.exit(1);
