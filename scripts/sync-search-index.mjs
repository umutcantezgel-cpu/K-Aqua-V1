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
    ...(codes.length ? { articleCodes: codes } : {}),
  });
}

const datei = `// ERZEUGT — nicht von Hand ändern.
// Quelle: content/products/**/*.md (Frontmatter und erster Absatz)
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
