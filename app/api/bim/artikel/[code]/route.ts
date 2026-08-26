/* BIM-Daten zu einer einzelnen Artikelnummer.
 *
 *   /api/bim/artikel/AQ09063                    → IFC 4 mit Geometrie
 *   /api/bim/artikel/AQ09063?geometrie=ohne     → IFC 4 nur mit Sachdaten
 *   /api/bim/artikel/AQ09063?format=json        → Datensatz
 *   /api/bim/artikel/AQ09063?format=csv         → eine Tabellenzeile
 *
 * Die Dateien entstehen bei jedem Abruf neu aus denselben Quellen, aus denen
 * auch die Produktseite ihre Zahlen nimmt. Deshalb kann eine heruntergeladene
 * Datei nicht von der Seite abweichen — es gibt kein erzeugtes Dateigut, das
 * veralten koennte. */

import type { NextRequest } from 'next/server';
import { buildIfcForArticle, type GeometryLevel } from '@/lib/bim/export';
import { getBimRecord } from '@/lib/bim/product';
import { toJsonArticle, toCsv, bimFileName } from '@/lib/bim/formats';
import {
  fileResponse,
  errorResponse,
  parseFormat,
  CATALOG_TIMESTAMP,
} from '@/lib/bim/responses';

// Die 3D-Module werden ueber das Dateisystem geladen und three.js rechnet in
// Node. Beides gibt es in der Edge-Laufzeit nicht.
export const runtime = 'nodejs';

// Der Katalog ist zur Bauzeit fest; eine Antwort darf beliebig lange stehen.
export const revalidate = false;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code: rawCode } = await params;
  const code = decodeURIComponent(rawCode).trim().toUpperCase();

  const record = getBimRecord(code);
  if (!record) {
    return errorResponse(
      404,
      `Die Artikelnummer ${code} steht nicht im Katalog.`,
      'Die gültigen Nummern stehen unter /api/bim/katalog?format=json.',
    );
  }

  const url = new URL(request.url);
  const format = parseFormat(url.searchParams.get('format'), ['ifc', 'json', 'csv'], 'ifc');
  if (!format) {
    return errorResponse(
      400,
      `Unbekanntes Format „${url.searchParams.get('format')}".`,
      'Für einen einzelnen Artikel gibt es ifc, json und csv.',
    );
  }

  if (format === 'json') {
    return fileResponse(
      JSON.stringify(toJsonArticle(record), null, 2),
      bimFileName(code, 'json'),
      'json',
    );
  }

  if (format === 'csv') {
    return fileResponse(toCsv([record]), bimFileName(code, 'csv'), 'csv');
  }

  if (record.isTool) {
    return errorResponse(
      409,
      `${code} ist ein Werkzeug und damit kein Bauteil im Sinne von IFC.`,
      'Für Werkzeuge gibt es Datenblatt und Tabelle: ?format=json oder ?format=csv.',
    );
  }

  const geometryParam = (url.searchParams.get('geometrie') ?? 'voll').toLowerCase();
  if (geometryParam !== 'voll' && geometryParam !== 'ohne') {
    return errorResponse(
      400,
      `Unbekannte Geometriestufe „${geometryParam}".`,
      'Möglich sind voll (mit Form) und ohne (nur Sachdaten).',
    );
  }

  const result = await buildIfcForArticle(code, {
    geometry: geometryParam as GeometryLevel,
    timestamp: CATALOG_TIMESTAMP,
    sourceUrl: `${url.origin}/de/produkte/${record.category}/${record.productSlug}`,
  });

  if (!result) {
    return errorResponse(500, `Zu ${code} ließ sich keine IFC-Datei erzeugen.`);
  }

  return fileResponse(result.content, result.fileName, 'ifc');
}
