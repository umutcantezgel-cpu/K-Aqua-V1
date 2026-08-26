/* Der eine Weg von der Artikelnummer zur fertigen Datei.
 *
 * Alles, was BIM-Dateien ausliefert — Route Handler, Produktseite,
 * Download-Center, Gesamtpaket — geht hier durch. Damit kann keine Ausgabe von
 * einer anderen abweichen, und es gibt genau eine Stelle, an der Datensatz,
 * Geometrie und Dateiformat zusammenkommen. */

import { getBimRecord, getBimRecordsForProduct, type BimRecord } from '@/lib/bim/product';
import {
  moduleSlugForProduct,
  getModuleParams,
  sizeKeyForArticle,
  buildAssembly,
} from '@/lib/bim/model3d';
import { deriveShape, type BimShape } from '@/lib/bim/geometry';
import { writeIfc, type IfcWriteResult } from '@/lib/bim/ifc/writer';

/** Wie viel Geometrie eine Datei tragen soll. */
export type GeometryLevel =
  /** Volle Form, so wie sie das 3D-Modell hergibt. */
  | 'voll'
  /**
   * Ohne Geometrie — nur Sachdaten.
   *
   * Kein Notbehelf, sondern ein eigener Anwendungsfall: fuer Massenermittlung,
   * Ausschreibung und Produktdatenpflege zaehlen Merkmale, nicht Form. Solche
   * Dateien sind wenige Kilobyte gross und laden auch in einem Modell mit
   * tausenden Bauteilen ohne Verzoegerung.
   */
  | 'ohne';

export interface BimExportOptions {
  geometry?: GeometryLevel;
  /** Zeitstempel im Dateikopf. Festlegen macht die Ausgabe wiederholbar. */
  timestamp?: Date;
  /** Adresse der Produktseite, die in die Datei geschrieben wird. */
  sourceUrl?: string;
}

export interface BimExportResult extends IfcWriteResult {
  record: BimRecord;
  shape: BimShape;
}

/**
 * Ermittelt die Form zu einem Artikel.
 *
 * Fuer Rohre genuegt die Parametrik — sie ist ohne jede Abhaengigkeit lesbar
 * und liefert Aussen- und Innenradius unmittelbar. Erst wenn das nicht traegt,
 * wird das Netz gebaut, was three.js laedt und spuerbar Zeit kostet.
 */
export async function resolveShape(
  record: BimRecord,
  level: GeometryLevel,
): Promise<BimShape> {
  if (level === 'ohne') {
    return { kind: 'none', note: 'auf Wunsch ohne Geometrie ausgeliefert' };
  }

  const moduleSlug = moduleSlugForProduct(record.productSlug);
  if (!moduleSlug) {
    return {
      kind: 'none',
      note: `Für ${record.productSlug} gibt es noch kein parametrisches Modell. Die Sachdaten sind vollständig.`,
    };
  }

  const sizeKey = await sizeKeyForArticle(moduleSlug, record.articleCode);
  if (sizeKey === null) {
    return {
      kind: 'none',
      note: `Die Nennweite ${record.outerDiameterMm ?? '—'} mm ist im Modell noch nicht angelegt. Die Sachdaten sind vollständig.`,
    };
  }

  const isPipe = record.category === 'pipes';
  const params = await getModuleParams(moduleSlug, sizeKey);

  if (isPipe && params) {
    const shape = deriveShape({
      isPipe: true,
      stockLengthM: record.stockLengthM,
      params,
      assembly: null,
    });
    if (shape.kind !== 'none') return shape;
  }

  const assembly = await buildAssembly(moduleSlug, sizeKey);
  return deriveShape({
    isPipe,
    stockLengthM: record.stockLengthM,
    params,
    assembly,
  });
}

/**
 * Baut die IFC-Datei zu einer Artikelnummer.
 *
 * @returns null, wenn die Nummer nicht im Bestand steht oder zu einem Werkzeug
 *          gehoert. Werkzeuge sind keine Bauteile im Sinne von IFC; fuer sie
 *          gibt es Datenblatt und CSV, aber keine Modelldatei.
 */
export async function buildIfcForArticle(
  articleCode: string,
  options: BimExportOptions = {},
): Promise<BimExportResult | null> {
  const record = getBimRecord(articleCode);
  if (!record || record.isTool) return null;

  const shape = await resolveShape(record, options.geometry ?? 'voll');
  const written = writeIfc({
    record,
    shape,
    timestamp: options.timestamp,
    sourceUrl: options.sourceUrl,
  });

  return { ...written, record, shape };
}

/** Alle Groessen eines Produkts, jede als eigene Datei. */
export async function buildIfcForProduct(
  productSlug: string,
  options: BimExportOptions = {},
): Promise<BimExportResult[]> {
  const records = getBimRecordsForProduct(productSlug).filter((r) => !r.isTool);
  const out: BimExportResult[] = [];
  for (const record of records) {
    const result = await buildIfcForArticle(record.articleCode, options);
    if (result) out.push(result);
  }
  return out;
}
