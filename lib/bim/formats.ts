/* Die Datenformate neben IFC.
 *
 * IFC traegt Geometrie und Merkmale, ist aber nicht das, womit ein Planer
 * seinen Arbeitstag verbringt. Fuer Massenermittlung, Kalkulation und
 * Bauteillisten zaehlen Tabellen; fuer Revit zaehlt der Typenkatalog.
 *
 * Anders als IFC decken diese Formate den GESAMTEN Katalog ab — auch die
 * Artikel ohne 3D-Modell und die Werkzeuge. Sie brauchen keine Geometrie und
 * damit keine der Einschraenkungen, die dort gelten. */

import type { BimRecord } from '@/lib/bim/product';
import { CATALOG_EDITION } from '@/lib/bim/product';
import {
  BIM_MATERIALS,
  MASS_DENSITY_KG_M3,
  THERMAL_CONDUCTIVITY_W_MK,
  YOUNG_MODULUS_MPA,
} from '@/lib/bim/tables/material';

/* --------------------------------------------------------------------------
 * JSON
 * ------------------------------------------------------------------------ */

/**
 * Ein Artikel als strukturierter Datensatz.
 *
 * Die Feldnamen sind bewusst englisch und nah an den IFC-Merkmalsnamen
 * gehalten (`NominalDiameter`, `WallThickness`, `PressureRating`). So laesst
 * sich der Satz ohne Umbenennen auf ein Product Data Template abbilden, und
 * wer die JSON-Fassung neben der IFC-Datei liest, findet dieselben Namen.
 */
export interface BimJsonArticle {
  articleNumber: string;
  product: string;
  productSlug: string;
  category: string;
  manufacturer: string;
  material: string;
  colour: string | null;
  nominalDiameter: number | null;
  outerDiameter: number | null;
  innerDiameter: number | null;
  wallThickness: number | null;
  sdr: number | null;
  series: string | null;
  pressureRating: string | null;
  jointType: string;
  standards: string[];
  massKg: number | null;
  massPerMetreKg: number | null;
  waterCapacityLitrePerMetre: number | null;
  packUnit: number | null;
  stockLengthM: number | null;
  thermalExpansionCoefficientPerK: number;
  supportSpacing: { temperatureC: number; spacingMm: number }[];
  dimensions: Record<string, number | string>;
  /** Fundstelle im Herstellerkatalog. */
  source: string;
  catalogEdition: string;
  /** Nennweiten, die laut Katalog in einer anderen Reihe gefertigt sind. */
  deviatingSeries: string | null;
  /** Stellen, an denen der Katalog sich selbst widerspricht. */
  catalogIssues: { field: string; printed: number; consistent: number; note: string }[];
  isTool: boolean;
}

export function toJsonArticle(record: BimRecord): BimJsonArticle {
  const dimensions: Record<string, number | string> = {};
  for (const d of record.dimensions) {
    dimensions[d.unit ? `${d.key} (${d.unit})` : d.key] = d.value;
  }

  return {
    articleNumber: record.articleCode,
    product: record.title,
    productSlug: record.productSlug,
    category: record.category,
    manufacturer: 'K-Aqua KWT GmbH',
    material: record.material,
    colour: record.colour,
    nominalDiameter: record.nominalDiameterDn,
    outerDiameter: record.outerDiameterMm,
    innerDiameter: record.innerDiameterMm,
    wallThickness: record.wallThicknessMm,
    sdr: record.sdr,
    series: record.series,
    pressureRating: record.pressure,
    jointType: record.jointType,
    standards: record.standards,
    massKg: record.massKg,
    massPerMetreKg: record.massPerMetreKg,
    waterCapacityLitrePerMetre: record.waterCapacityLitrePerMetre,
    packUnit: record.packUnit,
    stockLengthM: record.stockLengthM,
    thermalExpansionCoefficientPerK: record.expansionCoefficientPerK,
    supportSpacing: record.supportSpacingCm.map((s) => ({
      temperatureC: s.temperatureC,
      spacingMm: s.spacingCm * 10,
    })),
    dimensions,
    source: record.source,
    catalogEdition: record.catalogEdition,
    deviatingSeries: record.deviatingSeries,
    catalogIssues: record.issues.map((i) => ({
      field: i.field,
      printed: i.printed,
      consistent: i.consistent,
      note: i.explanationDe,
    })),
    isTool: record.isTool,
  };
}

export interface BimJsonDocument {
  manufacturer: string;
  catalogEdition: string;
  /** Zeitpunkt der Erzeugung, ISO-8601. */
  generated: string;
  /** Werkstoffkennwerte, die fuer alle Artikel gelten. */
  materials: {
    id: string;
    name: string;
    massDensityKgM3: number;
    thermalConductivityWmK: number;
    youngModulusMPa: number;
    source: string;
  }[];
  articleCount: number;
  articles: BimJsonArticle[];
}

export function toJsonDocument(records: BimRecord[], generated: Date): BimJsonDocument {
  return {
    manufacturer: 'K-Aqua KWT GmbH',
    catalogEdition: CATALOG_EDITION,
    generated: generated.toISOString(),
    materials: (['PP-R', 'PP-RCT'] as const).map((id) => ({
      id,
      name: BIM_MATERIALS[id].nameDe,
      massDensityKgM3: MASS_DENSITY_KG_M3,
      thermalConductivityWmK: THERMAL_CONDUCTIVITY_W_MK,
      youngModulusMPa: YOUNG_MODULUS_MPA,
      source: BIM_MATERIALS[id].source,
    })),
    articleCount: records.length,
    articles: records.map(toJsonArticle),
  };
}

/* --------------------------------------------------------------------------
 * CSV
 * ------------------------------------------------------------------------ */

/** Spalten der Tabellenausgabe, in dieser Reihenfolge. */
const CSV_COLUMNS: { header: string; get: (r: BimRecord) => string | number | null }[] = [
  { header: 'Artikelnummer', get: (r) => r.articleCode },
  { header: 'Produkt', get: (r) => r.title },
  { header: 'Kategorie', get: (r) => r.category },
  { header: 'Werkstoff', get: (r) => r.material },
  { header: 'Farbe', get: (r) => r.colour },
  { header: 'd (mm)', get: (r) => r.outerDiameterMm },
  { header: 'DN', get: (r) => r.nominalDiameterDn },
  { header: 'di (mm)', get: (r) => r.innerDiameterMm },
  { header: 's (mm)', get: (r) => r.wallThicknessMm },
  { header: 'SDR', get: (r) => r.sdr },
  { header: 'Reihe', get: (r) => r.series },
  { header: 'Druckstufe', get: (r) => r.pressure },
  { header: 'Verbindungsart', get: (r) => r.jointType },
  { header: 'Gewicht (kg/St)', get: (r) => r.massKg },
  { header: 'Gewicht (kg/m)', get: (r) => r.massPerMetreKg },
  { header: 'Wasserinhalt (l/m)', get: (r) => r.waterCapacityLitrePerMetre },
  { header: 'Verpackungseinheit', get: (r) => r.packUnit },
  { header: 'Lieferlänge (m)', get: (r) => r.stockLengthM },
  { header: 'Normen', get: (r) => r.standards.join(' / ') },
  { header: 'Katalogfundstelle', get: (r) => r.source },
  { header: 'Hinweis', get: (r) => r.deviatingSeries ?? (r.issues.length ? 'siehe Kataloghinweis' : null) },
];

/**
 * Erzeugt die Tabellenausgabe.
 *
 * Semikolon als Trenner, Komma als Dezimaltrenner und ein BOM am Anfang —
 * dieselbe Schreibweise wie beim CO₂-Rechner der Seite (lib/co2-share.ts).
 * Das ist die Fassung, die Excel in deutscher Spracheinstellung ohne
 * Importdialog richtig oeffnet; mit Punkt und Komma vertauscht landet jede
 * Wandstaerke in der falschen Spalte.
 */
export function toCsv(records: BimRecord[]): string {
  const escape = (value: string | number | null): string => {
    if (value === null || value === undefined) return '';
    const text = typeof value === 'number' ? String(value).replace('.', ',') : value;
    return /[;"\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  const lines = [CSV_COLUMNS.map((c) => escape(c.header)).join(';')];
  for (const record of records) {
    lines.push(CSV_COLUMNS.map((c) => escape(c.get(record))).join(';'));
  }
  return `﻿${lines.join('\r\n')}\r\n`;
}

/* --------------------------------------------------------------------------
 * Revit-Typenkatalog
 * ------------------------------------------------------------------------ */

/** Eine Spalte des Typenkatalogs mit Revit-Typangabe und Einheit. */
interface TypeCatalogColumn {
  name: string;
  /** Revit-Parametertyp, z. B. LENGTH oder OTHER. */
  type: 'LENGTH' | 'OTHER' | 'NUMBER';
  /** Einheit; bei OTHER leer. */
  unit: '' | 'MILLIMETERS' | 'METERS';
  get: (r: BimRecord) => number | string | null;
}

const TYPE_CATALOG_COLUMNS: TypeCatalogColumn[] = [
  { name: 'Artikelnummer', type: 'OTHER', unit: '', get: (r) => r.articleCode },
  { name: 'd', type: 'LENGTH', unit: 'MILLIMETERS', get: (r) => r.outerDiameterMm },
  { name: 'di', type: 'LENGTH', unit: 'MILLIMETERS', get: (r) => r.innerDiameterMm },
  { name: 's', type: 'LENGTH', unit: 'MILLIMETERS', get: (r) => r.wallThicknessMm },
  { name: 'DN', type: 'OTHER', unit: '', get: (r) => r.nominalDiameterDn },
  { name: 'SDR', type: 'OTHER', unit: '', get: (r) => r.sdr },
  { name: 'Werkstoff', type: 'OTHER', unit: '', get: (r) => r.material },
  { name: 'Gewicht', type: 'OTHER', unit: '', get: (r) => r.massKg ?? r.massPerMetreKg },
  { name: 'Verbindungsart', type: 'OTHER', unit: '', get: (r) => r.jointType },
];

/**
 * Erzeugt einen Revit-Typenkatalog.
 *
 * WARUM DAS DER RICHTIGE WEG IST: Eine native Revit-Familie (.rfa) ist ein
 * geschlossenes Binaerformat und laesst sich ohne Revit-Lizenz nicht erzeugen.
 * Der Typenkatalog dagegen ist eine schlichte Textdatei, die Revit neben eine
 * Familie legt und beim Laden ausliest — damit stehen dort saemtliche
 * Nennweiten mit ihren Maßen zur Auswahl. Das ist der Datenteil einer
 * Familienbibliothek, und den kann man ehrlich liefern.
 *
 * Aufbau: die Kopfzeile beginnt mit einem Komma (die erste Spalte traegt den
 * Typennamen und bleibt unbenannt), danach je Spalte `Name##TYP##EINHEIT`.
 * Zahlen mit Punkt als Dezimaltrenner — Revit liest die Datei unabhaengig von
 * der Spracheinstellung immer so.
 */
export function toRevitTypeCatalog(records: BimRecord[]): string {
  /* Aufgenommen wird nur eine Spalte, die JEDER Artikel dieses Produkts
   * fuellt — nicht eine, die wenigstens einer fuellt.
   *
   * Der Unterschied ist folgenreich: Revit legt einen Typ nicht an, wenn in
   * seiner Zeile ein Wert fehlt. Beim Winkel 90° etwa fuehrt der Katalog eine
   * Wandstaerke nur fuer die vier stumpfgeschweissten Nennweiten ab d160; die
   * zehn gemufften Groessen haben dort einen Gedankenstrich. Eine Spalte `s`
   * wuerde also genau die zehn Groessen verschwinden lassen, die am
   * haeufigsten verbaut werden — und zwar wortlos.
   *
   * Was dabei verloren geht, ist keine Angabe, sondern eine Spalte: die
   * Wandstaerke steht weiterhin in der Tabelle, im Datensatz und in jeder
   * IFC-Datei. */
  const columns = TYPE_CATALOG_COLUMNS.filter((c) =>
    records.every((r) => {
      const value = c.get(r);
      return value !== null && value !== undefined && value !== '';
    }),
  );

  const header =
    ',' + columns.map((c) => `${c.name}##${c.type}##${c.unit}`).join(',');

  const lines = [header];
  for (const record of records) {
    const typeName = record.outerDiameterMm !== null
      ? `d${record.outerDiameterMm}`
      : record.articleCode;
    const values = columns.map((c) => {
      const value = c.get(record);
      if (value === null || value === undefined) return '';
      // Punkt als Dezimaltrenner, und niemals ein Komma im Wert — es waere
      // der Spaltentrenner.
      return String(value).replace(',', '.');
    });
    lines.push([typeName, ...values].join(','));
  }
  return lines.join('\r\n') + '\r\n';
}

/* --------------------------------------------------------------------------
 * Dateinamen
 * ------------------------------------------------------------------------ */

/** Einheitlicher Dateiname fuer jede Ausgabe. */
export function bimFileName(
  scope: string,
  extension: 'json' | 'csv' | 'txt' | 'ifc' | 'zip',
): string {
  const safe = scope.replace(/[^A-Za-z0-9_-]+/g, '-').replace(/^-|-$/g, '');
  return `K-Aqua_${safe}.${extension}`;
}
