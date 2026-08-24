#!/usr/bin/env node
// Wie viele der geplanten Produkte haben ein 3D-Modell?
//
// Quelle für den Plan: kaqua-3d/produkt-registry.json — die gepflegte Fassung.
// docs/3d-produktion/produkt-registry.json ist eine Kopie und läuft auseinander;
// steht sie da, wird sie verglichen und ein Unterschied gemeldet.
// Quelle für den Stand: public/kaqua-3d/lib/registry.mjs (die gebauten Module).
//
// Das Skript prüft ausserdem, ob eine redaktionelle Ausnahme in
// lib/3d/aliases.ts ein echtes Modell VERDECKT. Am 24.08.2026 taten das fünf
// Einträge — sie stammten aus der Zeit, als es das eigene Modell noch nicht
// gab, und resolve.ts lässt den Alias jeden Konflikt gewinnen.
//
// Aufruf: node scripts/check-3d-coverage.mjs [--offen]

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const PLAN_MAIN = path.join(ROOT, 'kaqua-3d', 'produkt-registry.json');
const PLAN_COPY = path.join(ROOT, 'docs', '3d-produktion', 'produkt-registry.json');
const PLAN_FILE = fs.existsSync(PLAN_MAIN) ? PLAN_MAIN : PLAN_COPY;
const ALIAS_FILE = path.join(ROOT, 'lib', '3d', 'aliases.ts');
const GEN_FILE = path.join(ROOT, 'lib', '3d', 'slug-map.generated.ts');
const LIB = pathToFileURL(path.join(ROOT, 'public', 'kaqua-3d', 'lib', 'index.mjs')).href;

if (!fs.existsSync(PLAN_FILE)) {
  console.error(`✖ Produktionsregistry fehlt: ${path.relative(ROOT, PLAN_FILE)}`);
  process.exit(1);
}
if (PLAN_FILE === PLAN_MAIN && fs.existsSync(PLAN_COPY)
    && fs.readFileSync(PLAN_MAIN, 'utf8') !== fs.readFileSync(PLAN_COPY, 'utf8')) {
  console.warn('⚠ kaqua-3d/produkt-registry.json und docs/3d-produktion/'
    + 'produkt-registry.json unterscheiden sich. Gerechnet wird mit der ersten.');
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


/* ── Verdeckte Modelle ──────────────────────────────────────────────────
   resolve.ts setzt { ...GENERATED_SLUG_MAP, ...SLUG_ALIASES } — der Alias
   gewinnt. Zeigt er auf ein anderes Modell als die erzeugte Zuordnung,
   verdeckt er es. Verglichen wird zusätzlich bindestrichfrei: die
   Seiten-Slugs schreiben "femalemale", die Modelle "female-male", und
   genau diese zwei Fälle gingen sonst aneinander vorbei. */
const paare = (datei) => Object.fromEntries(
  [...fs.readFileSync(datei, 'utf8').matchAll(/^\s*"([^"]+)":\s*"([^"]+)"/gm)]
    .map((m) => [m[1], m[2]]));

if (fs.existsSync(ALIAS_FILE) && fs.existsSync(GEN_FILE)) {
  const alias = paare(ALIAS_FILE);
  const erzeugt = paare(GEN_FILE);
  const flach = (x) => x.replace(/-/g, '');
  const erzeugtFlach = new Map(Object.entries(erzeugt).map(([k, v]) => [flach(k), v]));

  const verdeckt = [];
  for (const [k, v] of Object.entries(alias)) {
    const echt = erzeugt[k] ?? erzeugtFlach.get(flach(k));
    if (echt && echt !== v) verdeckt.push({ k, zeigt: v, statt: echt });
  }
  if (verdeckt.length) {
    console.error(`\n✖ ${verdeckt.length} Ausnahme(n) in lib/3d/aliases.ts verdecken ein echtes Modell:`);
    verdeckt.forEach(({ k, zeigt, statt }) =>
      console.error(`    ${k}\n      zeigt  ${zeigt}\n      statt  ${statt}`));
    console.error('\n  Diese Seiten stellen ein fremdes Bauteil dar. Eintrag entfernen'
      + '\n  (wenn die erzeugte Zuordnung greift) oder umhängen.\n');
    process.exitCode = 1;
  } else {
    console.log('✓ keine Ausnahme verdeckt ein Modell\n');
  }
}


/* ── Zweite Ausnahmetabelle: app/api/3d-view/[slug]/route.ts ────────────
   Sie ordnet Slugs auf DATEINAMEN in dist/ zu, nicht auf Produkt-IDs, und
   ist von lib/3d/aliases.ts unabhaengig. Am 24.08.2026 waren beide
   auseinandergelaufen: dort wie hier standen Ersatzzuordnungen, die
   inzwischen gebaute Modelle verdeckten. Der Test ist einfach — gibt es
   fuer den Schluessel eine eigene Datei, darf die Ausnahme nicht auf eine
   andere zeigen. */
const ROUTE_FILE = path.join(ROOT, 'app', 'api', '3d-view', '[slug]', 'route.ts');
const DIST = path.join(ROOT, 'kaqua-3d', 'dist');
if (fs.existsSync(ROUTE_FILE) && fs.existsSync(DIST)) {
  const routeAlias = Object.fromEntries(
    [...fs.readFileSync(ROUTE_FILE, 'utf8').matchAll(/^\s*'([^']+)':\s*'([^']+)',/gm)]
      .map((m) => [m[1], m[2]]));
  /* Module in dist/, einmal unter ihrem Namen und einmal bindestrichfrei —
     'elbow-45-femalemale' und 'elbow-45-female-male' sind dasselbe Teil und
     gingen sonst aneinander vorbei, genau wie bei lib/3d/aliases.ts. */
  const flach = (x) => x.replace(/-/g, '');
  const module = new Map();
  for (const f of fs.readdirSync(DIST)) {
    const m = /^kaqua-(.+)\.html$/.exec(f);
    if (m && m[1] !== '3d-galerie') module.set(flach(m[1]), m[1]);
  }
  const eigenes = (k) => module.get(flach(k));
  const verdeckt = Object.entries(routeAlias)
    .map(([k, v]) => [k, v, eigenes(k)])
    .filter(([, v, own]) => own && own !== v);
  if (verdeckt.length) {
    console.error(`✖ ${verdeckt.length} Ausnahme(n) in app/api/3d-view/[slug]/route.ts verdecken ein echtes Modell:`);
    verdeckt.forEach(([k, v, own]) =>
      console.error(`    ${k}\n      zeigt  kaqua-${v}.html\n      statt  kaqua-${own}.html`));
    console.error('');
    process.exitCode = 1;
  } else {
    console.log('✓ keine Ausnahme der API-Route verdeckt ein Modell\n');
  }
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
