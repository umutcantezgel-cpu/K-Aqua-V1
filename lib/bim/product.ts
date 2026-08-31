/* Der BIM-Datensatz je Artikelnummer.
 *
 * Hier laufen die Quellen zusammen. Die Schicht haelt selbst KEINE Maße —
 * sie liest, verbindet und belegt:
 *
 *   Artikelnummern, Katalogmaße, Farbe, Normen  → content/products/**\/*.md
 *   Werkstoff, SDR, S-Reihe, Druckstufe, Länge  → lib/data/catalog.ts
 *   Werkstoffkennwerte, Systemtabellen          → lib/bim/tables/*
 *   Geometrieparameter                          → public/kaqua-3d/lib (spaeter)
 *
 * `lib/data/products.ts` bleibt bewusst aussen vor: dort wird die Wandstaerke
 * als `d/SDR` gerechnet, nicht dem Katalog entnommen. Fuer eine Darstellung
 * genuegt das, fuer eine Datei, die in ein Gebaeudemodell wandert, nicht. */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { CATALOG, type CatalogItem, type CatalogCategoryId } from '@/lib/data/catalog';
import {
  parseArticleTable,
  numericValue,
  type ArticleRow,
  type ArticleTable,
} from '@/lib/bim/article-table';
import { resolveMaterialId, type BimMaterialId } from '@/lib/bim/tables/material';
import { EXPANSION_COEFFICIENT_PER_K } from '@/lib/bim/tables/expansion';
import {
  selectSupportTable,
  conservativeSupportSpacingCm,
  type SupportSpacingTable,
} from '@/lib/bim/tables/support-spacing';
import { standardsForScope, standardCodes, type StandardEntry } from '@/lib/bim/tables/standards';
import { issuesForArticle, type CatalogIssue } from '@/lib/bim/known-issues';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'products');

/** Ausgabe des Katalogs, aus dem alle Zahlen stammen. */
export const CATALOG_EDITION = 'KA-Katalog_GB_06-2025';

/**
 * Verbindungsart des Artikels. Bestimmt, welche Anschlusspunkte die
 * IFC-Datei bekommt und wie der Ausschreibungstext die Verlegung beschreibt.
 */
export type JointType =
  | 'socket-fusion'
  | 'butt-fusion'
  | 'electrofusion'
  | 'threaded'
  | 'flanged'
  | 'compression'
  | 'none';

/** Ein Katalogmaß mit Bezeichner und Einheit, so wie es im Druck steht. */
export interface BimDimension {
  key: string;
  label: string;
  value: number | string;
  unit: string | null;
}

export interface BimRecord {
  /** Artikelnummer — der Schluessel des Datensatzes. */
  articleCode: string;
  /** Kanonischer Produkt-Slug, ohne Kategorie. */
  productSlug: string;
  category: CatalogCategoryId;
  title: string;

  /* --- Maße, so weit der Katalog sie fuehrt. Null heisst: nicht angegeben. */
  /** Aussendurchmesser d in mm. Bei Rohren traegt die Spalte den Kopf `D`. */
  outerDiameterMm: number | null;
  /** Innendurchmesser di in mm. */
  innerDiameterMm: number | null;
  /** Wandstaerke s in mm — aus dem Katalog, nicht aus d/SDR gerechnet. */
  wallThicknessMm: number | null;
  /** Nennweite DN, sofern der Katalog sie fuehrt. */
  nominalDiameterDn: number | null;
  /** Saemtliche Spalten der Artikeltabelle, unveraendert. */
  dimensions: BimDimension[];

  /* --- Sachdaten */
  material: BimMaterialId;
  /** Farbkennzeichnung laut Frontmatter, z. B. „green with 1 blue stripe". */
  colour: string | null;
  sdr: number | null;
  /** S-Reihe, z. B. „S 2.5". */
  series: string | null;
  /**
   * Druckstufe als Katalogtext, z. B. „20°C / 2.0 MPa · 70°C / 1.0 MPa".
   *
   * Nur bei Rohren gefuellt. Die Formstueckseiten des Katalogs (S. 84–92)
   * fuehren bewusst keine Druckstufe: nach DIN EN ISO 15874 richtet sich das
   * Formstueck nach der Anwendungsklasse des Systems, nicht nach einem eigenen
   * Wert. Hier wird deshalb nichts ergaenzt — ein erfundenes „PN 20" auf einem
   * Winkel waere eine Zusage, die der Katalog nicht deckt.
   */
  pressure: string | null;
  /** Anmerkung des Katalogs zum Produkt, etwa zur Fuegetechnik großer Nennweiten. */
  note: string | null;
  standards: string[];
  jointType: JointType;
  /** Abschnitt der Artikeltabelle, unter dem die Zeile steht. */
  section: string | null;
  /**
   * Abweichende Reihe fuer genau diese Nennweite, wenn der Katalog eine
   * fuehrt. Beim K-Fiber-Rohr SDR 11 sind d20 und d25 in SDR 7,4 / S 3,2
   * gefertigt — dickwandiger als der Produktname erwarten laesst. Ohne diesen
   * Hinweis stuende in der IFC-Datei der falsche Wandaufbau.
   */
  deviatingSeries: string | null;

  /* --- Mengen */
  /** Stueckgewicht in kg. Null bei Rohren — dort gilt `massPerMetreKg`. */
  massKg: number | null;
  /** Gewicht je Meter in kg/m. Nur bei Rohren. */
  massPerMetreKg: number | null;
  /** Wasserinhalt in l/m. Nur bei Rohren. */
  waterCapacityLitrePerMetre: number | null;
  /** Verpackungseinheit in Stueck. */
  packUnit: number | null;
  /** Stangenlaenge in m. Nur bei Rohren. */
  stockLengthM: number | null;

  /* --- Systemdaten, auf diesen Artikel aufgeloest */
  /** Laengenausdehnungskoeffizient in 1/K — K-Fiber unterscheidet sich deutlich. */
  expansionCoefficientPerK: number;
  /** Halterungsabstaende in cm je Temperatur. Leer, wo der Katalog nichts fuehrt. */
  supportSpacingCm: { temperatureC: number; spacingCm: number }[];

  /* --- Belege */
  /** Fundstelle im Katalog, z. B. „KA-Katalog_GB_06-2025, S. 85". */
  source: string;
  catalogEdition: string;
  /** Fussnoten der Artikeltabelle, etwa zur Verbindungsart oder Sonderlaenge. */
  footnotes: string[];
  /**
   * Stellen, an denen der Katalog sich in dieser Zeile selbst widerspricht.
   * Die Maße oben bleiben so, wie sie gedruckt sind; der Hinweis wandert
   * mit in jede erzeugte Datei, damit die Abweichung sichtbar bleibt.
   */
  issues: CatalogIssue[];

  /** true, wenn der Artikel kein Bauteil im Sinne von IFC ist (Werkzeuge). */
  isTool: boolean;
}

/* --------------------------------------------------------------------------
 * Einlesen und Zwischenspeichern
 * ------------------------------------------------------------------------ */

interface LoadedProduct {
  slug: string;
  category: CatalogCategoryId;
  title: string;
  colour: string | null;
  standards: string[];
  source: string;
  table: ArticleTable;
  spec: ProductSpec;
}

/**
 * Die Kenndaten, die jede Rohr-Markdown direkt unter der Ueberschrift fuehrt:
 *
 *   S 5 - Working pressure: 20°C / 1.2 MPa - 60°C / 0.6 MPa
 *   Length: 4 m per bar.
 *
 * Diese Zeilen sind der Katalogtext in der verifizierten Quelldatei — und
 * damit die bessere Quelle als `lib/data/catalog.ts`, das eine abgeleitete
 * Zweitfassung ist.
 *
 * NACHTRAG 31.08.2026: Die frueher hier vermerkte Luecke ist geschlossen —
 * `k-fiber-pipe-pp-r-sdr-6` steht jetzt auch in catalog.ts (13 statt 12
 * Rohre). Der Vorrang der Markdown-Quelle bleibt trotzdem richtig: sie ist
 * die verifizierte Fassung, catalog.ts die abgeleitete.
 */
interface ProductSpec {
  /** S-Reihe, z. B. „S 5". */
  series: string | null;
  /** Druckstufe im Katalogwortlaut, z. B. „20°C / 1.2 MPa · 60°C / 0.6 MPa". */
  pressure: string | null;
  /** Stangenlaenge in m. */
  stockLengthM: number | null;
}

function parseProductSpec(markdown: string): ProductSpec {
  const spec: ProductSpec = { series: null, pressure: null, stockLengthM: null };

  const line = markdown.match(
    /^\s*S\s*([\d.,]+)\s*-\s*Working pressure:\s*(.+?)\s*$/im,
  );
  if (line) {
    spec.series = `S ${line[1]!.replace(',', '.')}`;
    // Der Katalog trennt die beiden Betriebspunkte mit einem Bindestrich;
    // in catalog.ts steht dafuer ein Mittelpunkt. Vereinheitlicht auf den
    // Mittelpunkt, damit beide Bestaende denselben Text zeigen.
    spec.pressure = line[2]!.replace(/\s+-\s+/g, ' · ').trim();
  }

  const length = markdown.match(/^\s*Length:\s*([\d.,]+)\s*m\b/im);
  if (length) {
    const n = Number(length[1]!.replace(',', '.'));
    if (Number.isFinite(n)) spec.stockLengthM = n;
  }

  return spec;
}

let cache: Map<string, LoadedProduct> | null = null;
let articleIndex: Map<string, string> | null = null;

/**
 * Produktseiten, die dieselben Artikelnummern noch einmal fuehren.
 *
 * Beim Katalogabgleich wanderten die großen Nennweiten als Abschnitt
 * `SDR 11*` in die Hauptdatei; die eigenstaendigen Seiten blieben stehen.
 * Fuer BIM muss eine Artikelnummer auf genau ein Produkt fuehren, sonst waere
 * /api/bim/[slug]/[article] mehrdeutig. Deshalb gewinnt beim Aufbau des
 * Artikelverzeichnisses immer die Hauptseite.
 *
 * Belegt in tests/unit/bim-article-table.test.ts: beide Seiten sind echte
 * Teilmengen ihrer Hauptseite, es geht dabei kein Artikel verloren.
 */
const SUPERSEDED_PRODUCT_SLUGS = new Set([
  'elbow-90-large-sizes',
  'reducing-tee-large-sizes',
]);

function loadAll(): Map<string, LoadedProduct> {
  if (cache) return cache;
  const map = new Map<string, LoadedProduct>();

  for (const category of fs.readdirSync(CONTENT_DIR)) {
    const dir = path.join(CONTENT_DIR, category);
    if (!fs.statSync(dir).isDirectory()) continue;

    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md') || file === 'index.md') continue;
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      const table = parseArticleTable(content);
      if (!table) continue;

      const slug = file.replace(/\.md$/, '');
      map.set(slug, {
        slug,
        category: category as CatalogCategoryId,
        title: typeof data.title === 'string' ? data.title : slug,
        colour: typeof data.colour === 'string' ? data.colour : null,
        standards: Array.isArray(data.standards) ? (data.standards as string[]) : [],
        source: typeof data.source === 'string' ? data.source : CATALOG_EDITION,
        table,
        spec: parseProductSpec(content),
      });
    }
  }

  cache = map;
  return map;
}

function buildArticleIndex(): Map<string, string> {
  if (articleIndex) return articleIndex;
  const index = new Map<string, string>();

  for (const product of loadAll().values()) {
    for (const row of product.table.rows) {
      const existing = index.get(row.code);
      if (existing && !SUPERSEDED_PRODUCT_SLUGS.has(existing)) continue;
      index.set(row.code, product.slug);
    }
  }

  articleIndex = index;
  return index;
}

/* --------------------------------------------------------------------------
 * Ableitungen
 * ------------------------------------------------------------------------ */

function findCatalogItem(slug: string): CatalogItem | null {
  for (const category of CATALOG) {
    const hit = category.items.find((i) => i.slug === slug);
    if (hit) return hit;
  }
  return null;
}

/** Liest die SDR-Stufe als Zahl. `catalog.ts` fuehrt sie teils als Text. */
function parseSdr(raw: number | string | undefined): number | null {
  if (typeof raw === 'number') return raw;
  if (typeof raw !== 'string') return null;
  const n = Number(raw.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

/**
 * Liest die SDR-Stufe aus dem Produkt-Slug.
 *
 * Das ist kein Raten: der Slug traegt die Reihe, weil der Produktname sie
 * traegt — `k-fiber-pipe-pp-r-sdr-74` heisst „K-Fiber Pipe PP-R SDR 7,4", und
 * dieser Name kommt aus dem Katalog. Gebraucht wird das nur dort, wo
 * `catalog.ts` keinen Eintrag hat.
 *
 * `-sdr-74` steht fuer SDR 7,4: der Slug kann kein Komma fuehren.
 */
function sdrFromSlug(slug: string): number | null {
  const match = slug.match(/sdr-(\d+)/i);
  if (!match) return null;
  const raw = match[1]!;
  // 74 → 7,4. Zweistellige Werte ab 60 gibt es als SDR nicht; die einzige
  // zweistellige Schreibweise im Bestand ist 74.
  if (raw === '74') return 7.4;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

/**
 * Bestimmt die Verbindungsart.
 *
 * Die Reihenfolge ist bewusst: der Tabellenabschnitt schlaegt alles andere.
 * Ein Winkel d20 wird gemufft, derselbe Winkel in d160 steht unter
 * `SDR 11*` und wird laut Fussnote stumpf- oder elektrogeschweisst. Wer nur
 * nach dem Produkt entscheidet, gibt beiden Groessen denselben Anschluss —
 * und damit der Haelfte den falschen.
 */
export function deriveJointType(
  slug: string,
  category: CatalogCategoryId,
  row: ArticleRow,
): JointType {
  // Werkzeuge zuerst. Eine Elektroschweissmaschine traegt „electrofusion" im
  // Namen und bekaeme sonst die Verbindungsart des Bauteils, das sie schweisst.
  if (category === 'tools') return 'none';

  if (row.section && /SDR\s*11/i.test(row.section)) return 'butt-fusion';
  if (/electrofusion|elektro/i.test(slug)) return 'electrofusion';
  if (/flange|flansch/i.test(slug)) return 'flanged';
  if (/thread|gewinde|union|verschraubung/i.test(slug)) return 'threaded';
  if (category === 'transition-fittings') return 'threaded';
  if (category === 'accessories') {
    // Rohrschellen und Dichtungen werden nicht verschweisst; Stopfen schon.
    return /plug|stopfen|cap/i.test(slug) ? 'socket-fusion' : 'none';
  }
  return 'socket-fusion';
}

/** Ordnet der Kategorie die einschlaegigen Normen zu. */
function standardsFor(category: CatalogCategoryId, jointType: JointType): StandardEntry[] {
  const scopes: StandardEntry['scope'][] = ['drinking-water'];
  if (category === 'pipes') scopes.push('pipes');
  else scopes.push('fittings');
  if (jointType !== 'none' && jointType !== 'threaded') scopes.push('welding');
  if (jointType === 'threaded') scopes.push('threads', 'welding');
  return standardsForScope(...scopes);
}

/** K-Fiber-Rohre tragen eine Faserverbundlage und dehnen sich viermal weniger. */
export function isFiberPipe(slug: string): boolean {
  return /fiber/i.test(slug);
}

/** Halterungsabstaende fuer diesen Artikel, auf die Katalogtemperaturen aufgeloest. */
function resolveSupportSpacing(
  slug: string,
  category: CatalogCategoryId,
  outerDiameterMm: number | null,
  pressure: string | null,
): { temperatureC: number; spacingCm: number }[] {
  // Der Katalog fuehrt Halterungsabstaende nur fuer Rohre.
  if (category !== 'pipes' || outerDiameterMm === null) return [];

  // Druckstufe aus dem Katalogtext, z. B. „20°C / 2.0 MPa · 70°C / 1.0 MPa".
  const match = pressure?.match(/(\d+[.,]\d+)\s*MPa/);
  const pressureMpa = match ? Number(match[1]!.replace(',', '.')) : 1.0;

  const table: SupportSpacingTable = selectSupportTable(isFiberPipe(slug), pressureMpa);
  const out: { temperatureC: number; spacingCm: number }[] = [];
  for (const temperatureC of table.temperaturesC) {
    const spacingCm = conservativeSupportSpacingCm(table, outerDiameterMm, temperatureC);
    if (spacingCm !== null) out.push({ temperatureC, spacingCm });
  }
  return out;
}

/* --------------------------------------------------------------------------
 * Oeffentliche Schnittstelle
 * ------------------------------------------------------------------------ */

/** Alle Produkt-Slugs, die eine Artikeltabelle fuehren. */
export function allProductSlugs(): string[] {
  return [...loadAll().keys()].sort();
}

/** Alle Artikelnummern des Bestands, eindeutig, kanonisch zugeordnet. */
export function allArticleCodes(): string[] {
  return [...buildArticleIndex().keys()].sort();
}

/** Der Produkt-Slug, unter dem eine Artikelnummer kanonisch gefuehrt wird. */
export function productSlugForArticle(code: string): string | null {
  return buildArticleIndex().get(code) ?? null;
}

/** Alle Artikelnummern eines Produkts, in gedruckter Reihenfolge. */
export function articleCodesForProduct(slug: string): string[] {
  return loadAll().get(slug)?.table.rows.map((r) => r.code) ?? [];
}

/**
 * Baut den vollstaendigen BIM-Datensatz zu einer Artikelnummer.
 *
 * @param code Artikelnummer, z. B. `AQ09063`
 * @returns der Datensatz, oder null wenn die Nummer nicht im Bestand steht
 */
export function getBimRecord(code: string): BimRecord | null {
  const slug = productSlugForArticle(code);
  if (!slug) return null;

  const product = loadAll().get(slug);
  if (!product) return null;

  const row = product.table.rows.find((r) => r.code === code);
  if (!row) return null;

  const catalogItem = findCatalogItem(slug);

  // Der Aussendurchmesser steht bei Formstuecken unter `d`, bei Rohren unter
  // `D` — der Katalog setzt beide Koepfe fuer dieselbe Groesse.
  const outerDiameterMm = numericValue(row, 'd', 'D');
  const innerDiameterMm = numericValue(row, 'di', 'Di', 'd1');
  const wallThicknessMm = numericValue(row, 's', 's min.');
  const nominalDiameterDn = numericValue(row, 'DN');

  const dimensions: BimDimension[] = product.table.columns
    .map((col) => ({
      key: col.key,
      label: col.label,
      value: row.values[col.key],
      unit: col.unit,
    }))
    .filter((d): d is BimDimension => d.value !== null && d.value !== undefined);

  const jointType = deriveJointType(slug, product.category, row);
  const material = resolveMaterialId(catalogItem?.material);

  // Reihenfolge der Quellen: die Produkt-Markdown ist die verifizierte
  // Fassung, `catalog.ts` die abgeleitete. Deshalb zuerst die Markdown.
  const pressure = product.spec.pressure ?? catalogItem?.pressure ?? null;
  const series = product.spec.series ?? catalogItem?.series ?? null;

  // Traegt der Wandstaerkenwert dieser Zeile ein Fussnotenzeichen, gilt fuer
  // diese Nennweite eine andere Reihe. Der Text steht in den Fussnoten.
  const deviatingSeries = row.valueMarkers['s min.'] ?? row.valueMarkers['s']
    ? (product.table.footnotes.find((f) => /SDR|S\s*\d/i.test(f)) ?? null)
    : null;

  // Normen: die Frontmatter fuehrt je Produkt eine Auswahl, der Katalog auf
  // S. 34 die vollstaendige Liste. Beide werden zusammengefuehrt, damit weder
  // eine produktspezifische Angabe verloren geht noch eine Systemnorm fehlt.
  const standards = [
    ...new Set([...product.standards, ...standardCodes(standardsFor(product.category, jointType))]),
  ];

  const stockLengthM =
    product.spec.stockLengthM ??
    (catalogItem?.len
      ? Number(catalogItem.len.replace(/[^\d.,]/g, '').replace(',', '.')) || null
      : null);

  return {
    articleCode: code,
    productSlug: slug,
    category: product.category,
    title: product.title,

    outerDiameterMm,
    innerDiameterMm,
    wallThicknessMm,
    nominalDiameterDn,
    dimensions,

    material,
    colour: product.colour,
    sdr: parseSdr(catalogItem?.sdr) ?? sdrFromSlug(slug),
    series,
    pressure,
    note: catalogItem?.note ?? null,
    standards,
    jointType,
    section: row.section,
    deviatingSeries,

    massKg: numericValue(row, 'kg'),
    massPerMetreKg: numericValue(row, 'Weight', 'kg/m'),
    waterCapacityLitrePerMetre: numericValue(row, 'Water capacity'),
    packUnit: numericValue(row, 'Pack.'),
    stockLengthM,

    expansionCoefficientPerK: isFiberPipe(slug)
      ? EXPANSION_COEFFICIENT_PER_K.fiber
      : EXPANSION_COEFFICIENT_PER_K.monolayer,
    supportSpacingCm: resolveSupportSpacing(
      slug,
      product.category,
      outerDiameterMm,
      pressure,
    ),

    source: product.source,
    catalogEdition: CATALOG_EDITION,
    footnotes: product.table.footnotes,
    issues: issuesForArticle(code),

    isTool: product.category === 'tools',
  };
}

/** Alle Datensaetze eines Produkts, in gedruckter Reihenfolge. */
export function getBimRecordsForProduct(slug: string): BimRecord[] {
  return articleCodesForProduct(slug)
    .map((code) => getBimRecord(code))
    .filter((r): r is BimRecord => r !== null);
}

/** Der gesamte Bestand. Fuer Gesamtausgaben — CSV, Paket, Pruefungen. */
export function getAllBimRecords(): BimRecord[] {
  return allArticleCodes()
    .map((code) => getBimRecord(code))
    .filter((r): r is BimRecord => r !== null);
}

/** Nur die Bauteile: Werkzeuge sind keine IFC-Objekte. */
export function getBimComponentRecords(): BimRecord[] {
  return getAllBimRecords().filter((r) => !r.isTool);
}
