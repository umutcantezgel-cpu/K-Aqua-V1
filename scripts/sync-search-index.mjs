#!/usr/bin/env node
// Erzeugt Sucheintraege fuer JEDES Produkt aus content/products.
//
// WARUM ES DAS BRAUCHT
// lib/search-data.ts ist ein von Hand gepflegter Index. Er fuehrte 36
// Produkte -- bei 73 Produktdateien. Die Haelfte des Sortiments war ueber die
// Suche nicht auffindbar, darunter alle 14 Werkzeuge und alle drei
// Einschweisssaettel. Und weil der Index neben dem Katalog gepflegt wird,
// lief er bei jedem neuen Produkt weiter auseinander.
//
// WARUM ERZEUGT UND NICHT VON HAND ERGAENZT
// lib/search-data.ts wird von Client-Komponenten importiert (GlobalSearch,
// SearchModal). getAllProducts() aus lib/products.ts liest das Dateisystem
// und kann dort nicht hinein. Die Bruecke ist eine erzeugte Datei -- dasselbe
// Muster wie lib/3d/slug-map.generated.ts, das scripts/sync-3d-registry.mjs
// erzeugt und das die CI mit --check bewacht.
//
// WAS DIESES SKRIPT NICHT TUT
// Es fasst keine handgeschriebene Datei an. Es schreibt genau eine erzeugte
// Datei und liest sonst nur. Die 36 gepflegten Eintraege in
// lib/search-data.ts bleiben unangetastet und haben Vorrang: Sie tragen
// Beschreibungen, Schlagwoerter und Fundstellen in drei Sprachen, die aus der
// Frontmatter nicht abzuleiten sind. Erzeugt wird nur, was fehlt.
//
// Aufruf: node scripts/sync-search-index.mjs [--check]

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
// Laeuft unter tsx (siehe package.json), damit die erzeugte TS-Datei direkt
// importierbar ist. Die Alternative — die Aliasse hier ein zweites Mal aus der
// TSV abzuleiten — hiesse, die Normalform und die Mehrdeutigkeitspruefung zu
// verdoppeln. Genau das darf es kein zweites Mal geben.
import { ARTICLE_NAMES, ARTICLE_CODE_ALIASES } from '../lib/article-names.generated.ts';

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'content', 'products');
const OUT = path.join(ROOT, 'lib', 'search-products.generated.ts');

/** Kategoriebezeichnungen fuer Herkunftspfad und Abzeichen. */
const KATEGORIE = {
  pipes: { de: 'Rohre', en: 'Pipes', ar: 'الأنابيب' },
  fittings: { de: 'Fittings', en: 'Fittings', ar: 'الوصلات' },
  valves: { de: 'Armaturen', en: 'Valves', ar: 'الصمامات' },
  'transition-fittings': { de: 'Übergangsstücke', en: 'Transition Fittings', ar: 'وصلات انتقالية' },
  tools: { de: 'Werkzeuge', en: 'Tools', ar: 'الأدوات' },
  'weld-in-saddles': { de: 'Einschweißsättel', en: 'Weld-in Saddles', ar: 'سروج اللحام' },
  accessories: { de: 'Zubehör', en: 'Accessories', ar: 'الملحقات' },
};

/**
 * Umgekehrte Aliasliste: Website-Nummer -> alle Schreibweisen, unter denen der
 * Hersteller oder eine Farbvariante sie fuehrt.
 *
 * `AQ045110` -> `AQ045P110` (Herstellerschreibweise mit Werkstoffbuchstaben),
 * `CU045P110`, `BL045P110`, `MO045P110` (Farbvarianten).
 *
 * Nummern, deren Normalform im Bestand mehrdeutig ist, stehen hier NICHT drin
 * — `sync-article-names.ts` weigert sich, sie aufzuloesen. `AQ200P20` (PP-R,
 * SDR 6) und `AQ20020` (PP-RCT, SDR 7,4) sind zwei verschiedene Rohre auf zwei
 * verschiedenen Seiten; sie ueber eine Toleranz zu verschmelzen hiesse, einem
 * Einkaeufer das falsche Rohr zu zeigen.
 */
const SCHREIBWEISEN = new Map();
for (const [schreibweise, ziel] of Object.entries(ARTICLE_CODE_ALIASES)) {
  if (!SCHREIBWEISEN.has(ziel)) SCHREIBWEISEN.set(ziel, []);
  SCHREIBWEISEN.get(ziel).push(schreibweise);
}

/**
 * Der Stamm eines Artikelnamens — der Name ohne die Nennweite.
 *
 * Aus „Winkel 45° d20 mm", „Winkel 45° d25 mm", ... wird einmal „winkel 45°".
 * Die volle Liste waere 886 Schlagwoerter fuer 34 Produkte, fast alle
 * Beinahe-Dubletten; die Staemme sind 296. Die Nennweite geht dabei nicht
 * verloren: Sie steht im Titel, in den Spezifikationen und in jeder einzelnen
 * Artikelnummer.
 *
 * Was der Stamm BEHAELT, ist alles Unterscheidende, das keine Nennweite ist —
 * `Abpresszapfen 1/2` behaelt das Zollgewinde, `Kappe (SDR 11)` die Reihe.
 */
function stamm(name) {
  return name
    .replace(/\s*d\s*\d+[\d\/x.,-]*\s*mm.*$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function produktdateien() {
  const treffer = [];
  for (const kategorie of fs.readdirSync(CONTENT)) {
    const ordner = path.join(CONTENT, kategorie);
    if (!fs.statSync(ordner).isDirectory()) continue;
    for (const datei of fs.readdirSync(ordner)) {
      if (!datei.endsWith('.md') || datei === 'index.md') continue;
      treffer.push({ kategorie, datei, pfad: path.join(ordner, datei) });
    }
  }
  return treffer.sort((a, b) => `${a.kategorie}/${a.datei}`.localeCompare(`${b.kategorie}/${b.datei}`));
}

/**
 * Erste beschreibende Zeile aus dem Fliesstext.
 *
 * Genommen wird die erste Zeile nach der H1, die kein Titel, keine Tabelle und
 * keine Liste ist. Fehlt sie, bleibt die Beschreibung leer -- lieber nichts
 * als ein erfundener Satz.
 */
function ersteBeschreibung(markdown) {
  const zeilen = markdown.split('\n');
  for (const roh of zeilen) {
    const z = roh.trim();
    if (!z || z.startsWith('#') || z.startsWith('|') || z.startsWith('-') || z.startsWith('*')) continue;
    return z.replace(/\*\*/g, '').replace(/\s+/g, ' ').slice(0, 220);
  }
  return '';
}

/** Nennweiten aus der Artikeltabelle, fuer die Spezifikationszeile. */
function nennweiten(markdown) {
  const treffer = markdown.match(/^##\s*Available Sizes\s*\n([^\n]+)/m);
  return treffer?.[1]?.trim() ?? '';
}

const eintraege = [];
for (const { kategorie, pfad } of produktdateien()) {
  const roh = fs.readFileSync(pfad, 'utf8');
  const { data, content } = matter(roh);

  const slug = String(data.slug ?? '').replace(/^.*\//, '') || path.basename(pfad, '.md');
  const href = `/produkte/${kategorie}/${slug}`;
  const kat = KATEGORIE[kategorie] ?? { de: kategorie, en: kategorie, ar: kategorie };

  const titelEn = String(data.title ?? slug);
  const titelDe = String(data.titleDE ?? titelEn);
  const titelAr = String(data.titleAR ?? titelEn);

  const codes = Array.isArray(data.article_codes) ? data.article_codes.map(String) : [];

  // Die Herstellerschreibweisen und die Farbvarianten zu den Nummern dieses
  // Produkts. Ein Treffer auf einer Artikelnummer wiegt 250 Punkte und ist
  // damit die staerkste Achse der Suchmaschine (lib/search-engine.ts) — wer
  // `AQ045P110` aus dem Druckkatalog abtippt, landet ohne eine Zeile Engine
  // auf dem richtigen Produkt.
  const weitereNummern = [
    ...new Set(codes.flatMap((c) => SCHREIBWEISEN.get(c.toUpperCase()) ?? [])),
  ].filter((n) => !codes.includes(n));

  // Die Artikelnamen des Herstellers, je Sprache und ohne Nennweite.
  // „T-Stück" ist, was ein Einkaeufer tippt — nicht „PP-R Reducing Tee".
  const artikelnamen = [
    ...new Set(
      codes
        .map((c) => ARTICLE_NAMES[c.toUpperCase()])
        .filter(Boolean)
        .flatMap((n) => [n.de, n.en, n.fr].filter(Boolean))
        .map(stamm)
        .filter((n) => n.length > 2)
    ),
  ].sort();

  const beschreibung = ersteBeschreibung(content);
  const groessen = nennweiten(content);

  // Schlagwoerter: Titelwoerter, Kategorie und Artikelnummern. Die
  // Artikelnummern sind der wertvollste Teil -- die Suchmaschine wertet einen
  // Treffer darauf mit 250 Punkten (lib/search-engine.ts).
  const schlagwoerter = [
    ...new Set(
      [
        ...titelDe.toLowerCase().split(/[^a-zäöüß0-9]+/),
        ...titelEn.toLowerCase().split(/[^a-z0-9]+/),
        kategorie,
        kat.de.toLowerCase(),
        ...artikelnamen,
      ].filter((w) => w.length > 2)
    ),
  ];

  const spezifikationen = [];
  if (data.colour) spezifikationen.push(String(data.colour));
  if (groessen) spezifikationen.push(groessen);
  if (Array.isArray(data.standards)) spezifikationen.push(...data.standards.map(String));
  if (data.source) spezifikationen.push(String(data.source));

  eintraege.push({
    id: `gen_${kategorie.replace(/-/g, '_')}_${slug.replace(/-/g, '_')}`,
    category: 'products',
    title: { de: titelDe, en: titelEn, ar: titelAr },
    description: { de: beschreibung, en: beschreibung, ar: beschreibung },
    origin: {
      section: kat,
      path: {
        de: `K-Aqua > Produkte > ${kat.de} > ${titelDe}`,
        en: `K-Aqua > Products > ${kat.en} > ${titelEn}`,
        ar: `K-Aqua > المنتجات > ${kat.ar} > ${titelAr}`,
      },
    },
    keywords: schlagwoerter,
    href,
    badge: kat,
    ...(spezifikationen.length ? { specs: spezifikationen } : {}),
    ...(codes.length || weitereNummern.length
      ? { articleCodes: [...codes, ...weitereNummern] }
      : {}),
  });
}

const datei = `// ERZEUGT — nicht von Hand ändern.
// Quelle: content/products/**/*.md (Frontmatter und erster Absatz)
//         lib/article-names.generated.ts (Herstellerschreibweisen und -namen)
// Neu erzeugen mit: npm run search:sync
//
// Diese Datei schließt die Lücke im Suchindex: lib/search-data.ts pflegt 36
// Produkte von Hand, der Katalog führt ${eintraege.length}. Die gepflegten Einträge haben
// VORRANG — sie tragen Beschreibungen, Schlagwörter und Fundstellen in drei
// Sprachen, die aus der Frontmatter nicht abzuleiten sind. Hier stehen alle
// Produkte; zusammengeführt wird in lib/search-data.ts nach \`href\`.
//
// Die Beschreibung ist auf allen drei Sprachen der englische Katalogtext.
// Das ist bewusst so: Ein Eintrag mit englischer Beschreibung ist auffindbar,
// ein fehlender Eintrag nicht. Wo eine gepflegte deutsche Beschreibung
// existiert, gewinnt sie ohnehin.

import type { SearchEntry } from './search-data';

export const GENERATED_PRODUCT_ENTRIES: SearchEntry[] = ${JSON.stringify(eintraege, null, 2)};

export const GENERATED_PRODUCT_COUNT = ${eintraege.length};
`;

const pruefen = process.argv.includes('--check');
const vorhanden = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';

if (pruefen) {
  if (vorhanden !== datei) {
    console.error('✗ lib/search-products.generated.ts ist nicht aktuell.');
    console.error('  Neu erzeugen mit: npm run search:sync');
    process.exit(1);
  }
  console.log(`✓ Suchindex aktuell (${eintraege.length} Produkte)`);
  process.exit(0);
}

fs.writeFileSync(OUT, datei);
console.log(`✓ lib/search-products.generated.ts erzeugt (${eintraege.length} Produkte)`);
