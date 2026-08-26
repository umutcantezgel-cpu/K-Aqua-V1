/* BIM-Daten zu einem ganzen Produkt — alle Nennweiten auf einmal.
 *
 *   /api/bim/produkt/elbow-90                → ZIP: je Nennweite eine IFC,
 *                                              dazu Tabelle, Datensatz,
 *                                              Revit-Typenkatalog, Liesmich
 *   /api/bim/produkt/elbow-90?format=json    → alle Nennweiten als Datensatz
 *   /api/bim/produkt/elbow-90?format=csv     → alle Nennweiten als Tabelle
 *   /api/bim/produkt/elbow-90?format=txt     → Revit-Typenkatalog
 *
 * Der Typenkatalog ist hier der eigentliche Gewinn: er traegt saemtliche
 * Nennweiten mit ihren Maßen und macht aus einer Revit-Familie eine
 * vollstaendige Baureihe. Auf Artikelebene waere er sinnlos — eine einzige
 * Zeile ist keine Baureihe. */

import type { NextRequest } from 'next/server';
import { buildIfcForProduct } from '@/lib/bim/export';
import { getBimRecordsForProduct, allProductSlugs } from '@/lib/bim/product';
import {
  toJsonDocument,
  toCsv,
  toRevitTypeCatalog,
  bimFileName,
} from '@/lib/bim/formats';
import { createZip, type ZipEntry } from '@/lib/bim/zip';
import {
  fileResponse,
  errorResponse,
  parseFormat,
  CATALOG_TIMESTAMP,
} from '@/lib/bim/responses';

export const runtime = 'nodejs';
export const revalidate = false;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug).trim().toLowerCase();

  const records = getBimRecordsForProduct(slug);
  if (records.length === 0) {
    return errorResponse(
      404,
      `Das Produkt „${slug}" steht nicht im Katalog.`,
      `Gültige Bezeichner: ${allProductSlugs().slice(0, 8).join(', ')} und weitere — vollständig unter /api/bim/katalog?format=json.`,
    );
  }

  const url = new URL(request.url);
  const format = parseFormat(
    url.searchParams.get('format'),
    ['zip', 'json', 'csv', 'txt'],
    'zip',
  );
  if (!format) {
    return errorResponse(
      400,
      `Unbekanntes Format „${url.searchParams.get('format')}".`,
      'Für ein Produkt gibt es zip, json, csv und txt.',
    );
  }

  if (format === 'json') {
    return fileResponse(
      JSON.stringify(toJsonDocument(records, CATALOG_TIMESTAMP), null, 2),
      bimFileName(slug, 'json'),
      'json',
    );
  }
  if (format === 'csv') {
    return fileResponse(toCsv(records), bimFileName(slug, 'csv'), 'csv');
  }
  if (format === 'txt') {
    return fileResponse(
      toRevitTypeCatalog(records),
      bimFileName(`${slug}_Typenkatalog`, 'txt'),
      'txt',
    );
  }

  /* --- Das Paket --- */
  const entries: ZipEntry[] = [];
  const notes: string[] = [];

  const built = await buildIfcForProduct(slug, { timestamp: CATALOG_TIMESTAMP });
  for (const result of built) {
    entries.push({ name: `ifc/${result.fileName}`, content: result.content });
    notes.push(`  ${result.record.articleCode.padEnd(14)}${result.shapeNote}`);
  }

  entries.push({ name: `daten/${bimFileName(slug, 'csv')}`, content: toCsv(records) });
  entries.push({
    name: `daten/${bimFileName(slug, 'json')}`,
    content: JSON.stringify(toJsonDocument(records, CATALOG_TIMESTAMP), null, 2),
  });
  entries.push({
    name: `revit/${bimFileName(`${slug}_Typenkatalog`, 'txt')}`,
    content: toRevitTypeCatalog(records),
  });
  entries.push({ name: 'LIESMICH.txt', content: readme(slug, records.length, built.length, notes) });

  const zip = createZip(entries, CATALOG_TIMESTAMP);
  return fileResponse(zip, bimFileName(slug, 'zip'), 'zip');
}

/**
 * Beipackzettel des Pakets.
 *
 * Er nennt ausdruecklich, was NICHT enthalten ist. Ein Planer, der ein
 * „BIM-Paket" oeffnet und keine .rfa findet, soll den Grund im Paket lesen
 * koennen und nicht beim Vertrieb nachfragen muessen.
 */
function readme(
  slug: string,
  articleCount: number,
  ifcCount: number,
  notes: string[],
): string {
  return [
    `K-Aqua BIM-Paket — ${slug}`,
    `Katalogstand: KA-Katalog_GB_06-2025`,
    '',
    `Artikel im Katalog: ${articleCount}`,
    `IFC-Dateien in diesem Paket: ${ifcCount}`,
    '',
    'INHALT',
    '  ifc/     je Nennweite eine IFC-4-Datei, Einheit Millimeter.',
    '           Importierbar in Revit, ArchiCAD, Allplan, Vectorworks,',
    '           prüfbar in Navisworks und Solibri.',
    '  daten/   Artikeldaten als Tabelle (Semikolon, für Excel) und als JSON.',
    '  revit/   Typenkatalog (.txt). Neben eine Revit-Familie gelegt, stellt er',
    '           dort sämtliche Nennweiten mit ihren Maßen zur Auswahl.',
    '',
    'WAS JEDE IFC-DATEI TRÄGT',
    '  Bauteiltyp und Anschlusspunkte (IfcDistributionPort)',
    '  Maße, Werkstoff, SDR, Druckstufe und Normen',
    '  Werkstoffkennwerte: Dichte, Wärmeleitfähigkeit, Längenausdehnung, E-Modul',
    '  Anwendungsklassen nach DIN EN ISO 15874-1',
    '  Halterungsabstände und Verlegehinweise',
    '  die Katalogseite, auf der jede Angabe steht',
    '',
    'GEOMETRIE JE ARTIKEL',
    ...notes,
    '',
    'WAS NICHT ENTHALTEN IST',
    '  Native Revit-Familien (.rfa, .rvt). Das ist ein geschlossenes',
    '  Binärformat und ohne Revit-Lizenz nicht erzeugbar. IFC 4 wird von Revit',
    '  eingelesen; der beiliegende Typenkatalog trägt den Datenteil.',
    '',
    'Fragen: info@k-aqua.de',
    '',
  ].join('\n');
}
