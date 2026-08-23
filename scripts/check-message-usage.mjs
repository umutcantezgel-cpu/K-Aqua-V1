#!/usr/bin/env node
// Findet Übersetzungsschlüssel, die der Code verlangt, die es aber in KEINER
// Sprache gibt.
//
// Der Paritätscheck vergleicht en und ar gegen de — fehlt ein Schlüssel in
// allen dreien, fällt er dort nicht auf. Genau so ist cookieConsent.privacyLink
// bis in den ausgelieferten Banner gelangt und wurde Besuchern als roher
// Schlüsselpfad angezeigt.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SOURCE_DIRS = ['app', 'components', 'lib', 'content'];
const LOCALES = ['de', 'en', 'ar'];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

function flatten(obj, prefix = '', out = new Set()) {
  // Auch in Arrays absteigen: der Code adressiert Elemente als
  // "personas.0.title", diese Schlüssel müssen als bekannt gelten.
  for (const [key, value] of Object.entries(obj ?? {})) {
    const full = prefix ? `${prefix}.${key}` : key;
    out.add(full);
    if (value && typeof value === 'object') flatten(value, full, out);
  }
  return out;
}

// Alle Schlüssel aller Sprachen — ein Schlüssel gilt als bekannt, wenn ihn
// mindestens eine Sprache kennt. Alles andere ist Sache des Paritätschecks.
const known = new Set();
for (const locale of LOCALES) {
  const file = path.join(ROOT, 'messages', `${locale}.json`);
  if (!fs.existsSync(file)) continue;
  for (const key of flatten(JSON.parse(fs.readFileSync(file, 'utf8')))) known.add(key);
}

const NS_RE = /useTranslations\(\s*['"]([^'"]+)['"]\s*\)|getTranslations\(\s*(?:\{[^}]*namespace:\s*)?['"]([^'"]+)['"]/g;
const CALL_RE = /\bt[A-Za-z]*\(\s*['"]([a-zA-Z][a-zA-Z0-9_.]*)['"]/g;
// t.has('key') prüft selbst, ob der Schlüssel existiert, und der Aufrufer
// liefert einen Rückfall. Solche Schlüssel sind bewusst optional.
const GUARD_RE = /\bt[A-Za-z]*\.has\(\s*['"]([a-zA-Z][a-zA-Z0-9_.]*)['"]/g;

const missing = new Map();
let checked = 0;

for (const dir of SOURCE_DIRS) {
  for (const file of walk(path.join(ROOT, dir))) {
    const src = fs.readFileSync(file, 'utf8');
    if (!src.includes('Translations(')) continue;
    checked++;

    const namespaces = [];
    for (const m of src.matchAll(NS_RE)) namespaces.push(m[1] ?? m[2]);
    if (namespaces.length === 0) continue;

    const guarded = new Set();
    for (const m of src.matchAll(GUARD_RE)) guarded.add(m[1]);

    for (const m of src.matchAll(CALL_RE)) {
      const key = m[1];
      // Dynamische Schlüssel (Template-Literale) lassen sich statisch nicht prüfen.
      if (!key || key.includes('${')) continue;
      if (guarded.has(key)) continue;
      // Trifft der Schlüssel unter irgendeinem Namensraum der Datei? Mehrere
      // Hooks pro Datei sind üblich, deshalb genügt ein Treffer.
      const hit = namespaces.some((ns) => known.has(`${ns}.${key}`)) || known.has(key);
      if (!hit) {
        const label = `${namespaces.join('|')} → ${key}`;
        if (!missing.has(label)) missing.set(label, new Set());
        missing.get(label).add(path.relative(ROOT, file));
      }
    }
  }
}

console.log(`Geprüft: ${checked} Dateien mit Übersetzungen · ${known.size} bekannte Schlüssel`);

if (missing.size === 0) {
  console.log('✓ Kein Schlüssel wird verlangt, den es nirgends gibt.');
  process.exit(0);
}

console.log(`\n✖ ${missing.size} Schlüssel werden verlangt, existieren aber in keiner Sprache:\n`);
for (const [label, files] of [...missing].sort()) {
  console.log(`  ${label}`);
  console.log(`      ${[...files].join(', ')}`);
}
process.exit(1);
