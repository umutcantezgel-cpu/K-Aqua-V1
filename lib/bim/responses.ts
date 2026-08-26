/* Gemeinsame Antwortlogik der BIM-Routen.
 *
 * Alle BIM-Downloads gehen denselben Weg: Format bestimmen, Datei erzeugen,
 * mit den richtigen Koepfen ausliefern. Diese Datei haelt die Teile, die sonst
 * in jeder Route noch einmal stuenden — und damit auseinanderlaufen wuerden.
 *
 * Zum Zwischenspeichern: Die Dateien haengen ausschliesslich am Katalogstand
 * und am Quellcode, nicht an Sitzung oder Zeit. Sie duerfen deshalb lange
 * vorgehalten werden. Der Zeitstempel im Dateikopf wird bewusst am
 * Katalogstand festgemacht und nicht auf die Uhr gesetzt: sonst waere jede
 * Antwort eine andere Datei, und weder Zwischenspeicher noch ETag traegen. */

import { NextResponse } from 'next/server';

/** Alle Formate, die die BIM-Routen ausliefern. */
export type BimFormat = 'ifc' | 'json' | 'csv' | 'txt' | 'zip';

/**
 * Fester Zeitstempel fuer jede erzeugte Datei.
 *
 * Er steht fuer den Stand des Herstellerkatalogs (Ausgabe 06-2025), nicht fuer
 * den Zeitpunkt des Abrufs. Damit ist jede Datei bei gleichem Katalogstand
 * byteweise gleich — Voraussetzung dafuer, dass Zwischenspeicher und
 * Versionsvergleiche ueberhaupt etwas nuetzen.
 */
export const CATALOG_TIMESTAMP = new Date('2025-06-01T00:00:00Z');

const CONTENT_TYPES: Record<BimFormat, string> = {
  // Es gibt keinen bei der IANA eingetragenen Typ fuer IFC-SPF. Verbreitet
  // sind application/x-step und application/ifc; letzterer ist der, den
  // buildingSMART und die Planungswerkzeuge erwarten.
  ifc: 'application/ifc; charset=utf-8',
  json: 'application/json; charset=utf-8',
  csv: 'text/csv; charset=utf-8',
  txt: 'text/plain; charset=utf-8',
  zip: 'application/zip',
};

/** Ein Jahr — die Dateien aendern sich nur mit dem Katalog oder dem Code. */
const CACHE_CONTROL = 'public, max-age=31536000, immutable';

/**
 * Liefert eine erzeugte Datei aus.
 *
 * `Content-Disposition: attachment` ist Absicht: eine IFC- oder CSV-Datei soll
 * beim Anklicken gespeichert und nicht im Browserfenster angezeigt werden.
 */
export function fileResponse(
  content: string | Buffer,
  fileName: string,
  format: BimFormat,
): NextResponse {
  const body = typeof content === 'string' ? Buffer.from(content, 'utf8') : content;
  return new NextResponse(new Uint8Array(body), {
    status: 200,
    headers: {
      'Content-Type': CONTENT_TYPES[format],
      'Content-Length': String(body.length),
      // Beide Formen: die einfache fuer aeltere Browser, die
      // RFC-5987-Form fuer Umlaute im Dateinamen.
      'Content-Disposition':
        `attachment; filename="${asciiFileName(fileName)}"; ` +
        `filename*=UTF-8''${encodeURIComponent(fileName)}`,
      'Cache-Control': CACHE_CONTROL,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

/** Fasst einen Dateinamen auf reines ASCII zusammen, fuer den einfachen Kopf. */
function asciiFileName(name: string): string {
  return name
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/Ä/g, 'Ae')
    .replace(/Ö/g, 'Oe')
    .replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'ss')
    .replace(/[^\x20-\x7E]/g, '_')
    .replace(/["\\]/g, '_');
}

/**
 * Antwort auf eine unbrauchbare Anfrage.
 *
 * Absichtlich gespraechig: wer eine BIM-Datei abruft, sitzt in einem
 * Planungswerkzeug oder einem Skript und hat keine Oberflaeche, die ihm
 * weiterhilft. Ein blosses 404 laesst ihn raten, ob die Artikelnummer falsch
 * ist, das Format nicht unterstuetzt wird oder der Dienst nicht laeuft.
 */
export function errorResponse(
  status: number,
  message: string,
  hint?: string,
): NextResponse {
  return NextResponse.json(
    { error: message, ...(hint ? { hinweis: hint } : {}) },
    {
      status,
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}

/** Liest den Formatwunsch aus der Anfrage. */
export function parseFormat(
  raw: string | null,
  allowed: BimFormat[],
  fallback: BimFormat,
): BimFormat | null {
  if (!raw) return fallback;
  const value = raw.toLowerCase().trim();
  // `gltf` und `glb` sind bewusst nicht dabei: die liefert der Viewer.
  const normalised = value === 'ifc4' ? 'ifc' : value;
  return (allowed as string[]).includes(normalised) ? (normalised as BimFormat) : null;
}
