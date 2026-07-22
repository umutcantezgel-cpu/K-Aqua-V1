#!/usr/bin/env node
/**
 * Locale parity check for the three curated locales (de = reference, en, ar).
 *
 * - FAILS (exit 1) when en/ar are missing keys that de has.
 * - WARNS on values that are byte-identical to the reference locale and look
 *   untranslated (translation leakage), unless they match the allowlist of
 *   legitimately language-neutral values (numbers, norms, product codes, URLs).
 *
 * Flags:
 *   --json      print the leakage worklist as JSON (path -> value)
 *   --strict    treat leakage warnings as errors (exit 1)
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const load = (loc) => JSON.parse(readFileSync(resolve(root, 'messages', `${loc}.json`), 'utf8'));

const asJson = process.argv.includes('--json');
const strict = process.argv.includes('--strict');

function flatten(node, prefix = '', out = new Map()) {
  if (node === null || node === undefined) return out;
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') {
    out.set(prefix, String(node));
    return out;
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
    return out;
  }
  for (const [k, v] of Object.entries(node)) {
    flatten(v, prefix ? `${prefix}.${k}` : k, out);
  }
  return out;
}

// Values that are legitimately identical across locales.
const NEUTRAL = [
  /^[\d\s.,:;+\-–—·%°×xX\/()|"'&>≥≤]*$/, // numbers, ranges, punctuation only
  /^(PP-R(CT)?|PPR|SDR|PN|DN|DIN|EN\b|ISO|DVGW|SKZ|KIWA|KTW|W\s?270|FDA)[\w\s.,/:·&()+-]*$/i, // norms & codes
  /^(d\d+|LEED|BREEAM|DGNB|TCO|CO2|CO₂|UV|3D|B2B|FAQ|IT|API|RCT|HRB[\s\d]*)$/i,
  /^(K-Aqua|KWT( GmbH)?|Coday( Web( Agency)?)?|Made in Germany|Germany|NEOM|Big 5)[\w\s.,-]*$/i,
  /^https?:\/\//,
  /^[\w.-]+@[\w.-]+$/,
  /^\/[\w\-/[\]]*$/, // route paths
  /^tel:/,
  /^\+?[\d\s()/-]+$/, // phone numbers
];
// Key paths whose values are data identifiers or locale-invariant facts, not copy.
const NEUTRAL_KEYS = [
  /\.(id|val|href|url|slug|icon|key|code)(\[|$)/,
  /^footer\.address$/,
  /^footer\.copyright$/,
  /^imprint\.rows/,
  /^kontaktBlocks\..*\.interest$/, // canonical CRM values, intentionally identical
  /^enterprise\.eyebrow$/, // brand tag, stays English
  /Author$/, // reviewer names
];
const isNeutralKey = (k) => NEUTRAL_KEYS.some((re) => re.test(k));
const isNeutral = (v) => v.length <= 3 || NEUTRAL.some((re) => re.test(v.trim()));

// Rough language detectors (for classifying leakage, not gating).
const looksGerman = (v) =>
  /[äöüßÄÖÜ]/.test(v) ||
  /\b(und|für|mit|der|die|das|nicht|eine?[nmrs]?|Sie|wir|bei|von|auf|aus|zur?|im|ist|sind|werden|Ihre?)\b/.test(v);
const looksLatin = (v) => /[A-Za-z]{3,}/.test(v) && !/[؀-ۿ]/.test(v);

const de = flatten(load('de'));
const en = flatten(load('en'));
const ar = flatten(load('ar'));

let missingCount = 0;
const report = (label, keys) => {
  if (!keys.length) return;
  missingCount += keys.length;
  console.error(`\n✖ ${label}: ${keys.length} missing key(s)`);
  for (const k of keys.slice(0, 50)) console.error(`  - ${k}`);
  if (keys.length > 50) console.error(`  … and ${keys.length - 50} more`);
};

const missingIn = (target) => [...de.keys()].filter((k) => !target.has(k));
report('en.json vs de.json', missingIn(en));
report('ar.json vs de.json', missingIn(ar));

// Leakage: identical to reference and not neutral.
const leaks = { en: [], ar: [] };
for (const [k, vDe] of de) {
  const vEn = en.get(k);
  if (vEn !== undefined && vEn === vDe && !isNeutralKey(k) && !isNeutral(vEn) && looksGerman(vEn)) {
    leaks.en.push([k, vEn]);
  }
}
for (const [k, vAr] of ar) {
  const vEn = en.get(k);
  if (vEn !== undefined && vAr === vEn && !isNeutralKey(k) && !isNeutral(vAr) && looksLatin(vAr)) {
    leaks.ar.push([k, vAr]);
  }
}

if (asJson) {
  console.log(JSON.stringify(
    {
      en_german_identical: Object.fromEntries(leaks.en),
      ar_english_identical: Object.fromEntries(leaks.ar),
    },
    null,
    2,
  ));
} else {
  const warn = (label, list) => {
    if (!list.length) return;
    console.warn(`\n⚠ ${label}: ${list.length} untranslated value(s)`);
    for (const [k, v] of list.slice(0, 25)) {
      console.warn(`  - ${k} = ${v.length > 70 ? `${v.slice(0, 70)}…` : v}`);
    }
    if (list.length > 25) console.warn(`  … and ${list.length - 25} more (run with --json for full list)`);
  };
  warn('en.json contains German values identical to de.json', leaks.en);
  warn('ar.json contains English values identical to en.json', leaks.ar);
}

const leakCount = leaks.en.length + leaks.ar.length;
if (missingCount > 0 || (strict && leakCount > 0)) {
  console.error(`\nParity check failed: ${missingCount} missing, ${leakCount} leaked.`);
  process.exit(1);
}
if (!asJson) {
  console.log(`\n✓ Key parity OK (de=${de.size} keys). Leakage warnings: en=${leaks.en.length}, ar=${leaks.ar.length}.`);
}
