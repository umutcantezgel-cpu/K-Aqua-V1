#!/usr/bin/env node
// Wie viele der geplanten Produkte haben ein 3D-Modell?
//
// Quelle für den Plan: docs/3d-produktion/produkt-registry.json (71 Produkte).
// Quelle für den Stand: public/kaqua-3d/lib/registry.mjs (die gebauten Module).
//
// Aufruf: node scripts/check-3d-coverage.mjs [--offen]

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const PLAN_FILE = path.join(ROOT, 'docs', '3d-produktion', 'produkt-registry.json');
const LIB = pathToFileURL(path.join(ROOT, 'public', 'kaqua-3d', 'lib', 'index.mjs')).href;

if (!fs.existsSync(PLAN_FILE)) {
  console.error(`✖ Produktionsregistry fehlt: ${path.relative(ROOT, PLAN_FILE)}`);
  process.exit(1);
}

const plan = JSON.parse(fs.readFileSync(PLAN_FILE, 'utf8'));
const geplant = Array.isArray(plan) ? plan : (plan.produkte ?? plan.products ?? []);
const { REGISTRY } = await import(LIB);
const gebaut = new Set(REGISTRY.map((e) => e.id));

const nachKategorie = new Map();
for (const p of geplant) {
  const kat = p.category ?? 'ohne';
  if (!nachKategorie.has(kat)) nachKategorie.set(kat, { fertig: [], offen: [] });
  (gebaut.has(p.id) ? nachKategorie.get(kat).fertig : nachKategorie.get(kat).offen).push(p);
}

const fertigGesamt = geplant.filter((p) => gebaut.has(p.id)).length;
const balken = (n, gesamt, breite = 24) => {
  const voll = gesamt === 0 ? 0 : Math.round((n / gesamt) * breite);
  return '█'.repeat(voll) + '░'.repeat(breite - voll);
};

console.log(`\nK-Aqua 3D — Stand der Produktion\n${'─'.repeat(58)}`);
for (const [kat, { fertig, offen }] of [...nachKategorie].sort()) {
  const gesamt = fertig.length + offen.length;
  console.log(
    `  ${kat.padEnd(20)} ${balken(fertig.length, gesamt)} ${String(fertig.length).padStart(2)}/${String(gesamt).padEnd(3)}`
  );
}
console.log('─'.repeat(58));
console.log(`  ${'Gesamt'.padEnd(20)} ${balken(fertigGesamt, geplant.length)} ${fertigGesamt}/${geplant.length}\n`);

// Modelle in der Bibliothek, die im Plan fehlen — deutet auf einen veralteten Plan hin
const imPlan = new Set(geplant.map((p) => p.id));
const verwaist = [...gebaut].filter((id) => !imPlan.has(id));
if (verwaist.length) {
  console.log(`⚠ ${verwaist.length} gebaute Modelle stehen nicht im Plan:`);
  verwaist.forEach((id) => console.log(`    ${id}`));
  console.log('');
}

if (process.argv.includes('--offen')) {
  console.log('Noch zu bauen:\n');
  for (const [kat, { offen }] of [...nachKategorie].sort()) {
    if (!offen.length) continue;
    console.log(`  ${kat}`);
    offen.forEach((p) => console.log(`    ${(p.title_de ?? p.slug ?? p.id).slice(0, 52).padEnd(54)} ${p.id}`));
    console.log('');
  }
}
