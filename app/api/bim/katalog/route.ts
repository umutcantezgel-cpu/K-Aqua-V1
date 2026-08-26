/* Der gesamte Katalog auf einmal.
 *
 *   /api/bim/katalog                → Übersicht als JSON: was es gibt und
 *                                     unter welcher Adresse
 *   /api/bim/katalog?format=csv     → alle Artikel als Tabelle
 *   /api/bim/katalog?format=json    → alle Artikel als Datensatz
 *
 * Die Übersicht ohne Formatangabe ist bewusst der Vorgabefall: wer diese
 * Adresse zum ersten Mal aufruft, soll erfahren, was es gibt, statt eine
 * mehrere Megabyte grosse Datei zu bekommen, die er vielleicht gar nicht
 * wollte. */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  getAllBimRecords,
  getBimComponentRecords,
  allProductSlugs,
  CATALOG_EDITION,
} from '@/lib/bim/product';
import { toJsonDocument, toCsv, bimFileName } from '@/lib/bim/formats';
import {
  fileResponse,
  errorResponse,
  parseFormat,
  CATALOG_TIMESTAMP,
} from '@/lib/bim/responses';

export const runtime = 'nodejs';
export const revalidate = false;

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const raw = url.searchParams.get('format');

  if (!raw) return overview(url.origin);

  const format = parseFormat(raw, ['json', 'csv'], 'json');
  if (!format) {
    return errorResponse(
      400,
      `Unbekanntes Format „${raw}".`,
      'Für den Gesamtkatalog gibt es json und csv.',
    );
  }

  const records = getAllBimRecords();
  if (format === 'csv') {
    return fileResponse(toCsv(records), bimFileName('Katalog', 'csv'), 'csv');
  }
  return fileResponse(
    JSON.stringify(toJsonDocument(records, CATALOG_TIMESTAMP), null, 2),
    bimFileName('Katalog', 'json'),
    'json',
  );
}

/** Was es gibt, und wo. Bewusst ohne Download. */
function overview(origin: string): NextResponse {
  const all = getAllBimRecords();
  const components = getBimComponentRecords();
  const products = allProductSlugs();

  const byCategory: Record<string, number> = {};
  for (const record of all) {
    byCategory[record.category] = (byCategory[record.category] ?? 0) + 1;
  }

  return NextResponse.json(
    {
      hersteller: 'K-Aqua KWT GmbH',
      katalogstand: CATALOG_EDITION,
      artikel: all.length,
      bauteile: components.length,
      werkzeuge: all.length - components.length,
      produkte: products.length,
      artikelJeKategorie: byCategory,
      formate: {
        ifc: 'IFC 4, Einheit Millimeter, mit Anschlusspunkten und Merkmalen',
        json: 'Artikeldaten, Feldnamen nah an den IFC-Merkmalen',
        csv: 'Tabelle mit Semikolon, für Excel in deutscher Spracheinstellung',
        txt: 'Revit-Typenkatalog, je Produkt',
        zip: 'Paket je Produkt: IFC aller Nennweiten, Tabelle, Typenkatalog',
      },
      adressen: {
        artikel: `${origin}/api/bim/artikel/{Artikelnummer}`,
        artikelOhneGeometrie: `${origin}/api/bim/artikel/{Artikelnummer}?geometrie=ohne`,
        produktpaket: `${origin}/api/bim/produkt/{Produkt}`,
        typenkatalog: `${origin}/api/bim/produkt/{Produkt}?format=txt`,
        gesamttabelle: `${origin}/api/bim/katalog?format=csv`,
        gesamtdaten: `${origin}/api/bim/katalog?format=json`,
      },
      beispiele: [
        `${origin}/api/bim/artikel/AQ111P32`,
        `${origin}/api/bim/artikel/AQ09063?geometrie=ohne`,
        `${origin}/api/bim/produkt/elbow-90`,
        `${origin}/api/bim/produkt/socket?format=txt`,
      ],
      produkte_liste: products,
      hinweis:
        'Native Revit-Familien (.rfa/.rvt) sind ein geschlossenes Binärformat und ohne Revit-Lizenz nicht erzeugbar. IFC 4 wird von Revit, ArchiCAD, Allplan und Vectorworks eingelesen; der Typenkatalog trägt den Datenteil einer Familienbibliothek.',
    },
    {
      status: 200,
      headers: { 'Cache-Control': 'public, max-age=3600' },
    },
  );
}
