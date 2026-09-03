/* Ausschreibungstexte — das Leistungsverzeichnis.
 *
 *   /api/bim/lv                        → Übersicht: was es gibt, unter welcher
 *                                        Adresse, und ein Auszug zum Ansehen
 *   /api/bim/lv?format=txt             → alle Positionen als Text
 *   /api/bim/lv?format=csv             → dieselben Positionen als Tabelle
 *   /api/bim/lv?format=json            → als Datensatz, für AVA-Werkzeuge
 *   …&sprache=en                       → englische Fassung
 *   …&produkt=elbow-90                 → nur dieses Produkt
 *   …&kategorie=pipes                  → nur diese Kategorie
 *
 * Wie bei den übrigen BIM-Routen ist die Übersicht ohne Formatangabe der
 * Vorgabefall: wer die Adresse zum ersten Mal aufruft, soll sehen, was es
 * gibt, statt ungefragt eine halbe Megabyte Text zu bekommen.
 *
 * GAEB DA XML fehlt hier bewusst. Es liesse sich schreiben, aber ohne die
 * amtliche Schemadatei und ohne ein AVA-System zum Probeimport waere die
 * Datei ungeprüft — und eine ungeprüfte Zusage ist genau das, was auf diesen
 * Seiten verschwinden soll. Text, Tabelle und Datensatz sind vollständig
 * prüfbar und decken den Bedarf: jedes AVA-System liest sie ein.
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  getBimComponentRecords,
  getBimRecordsForProduct,
  allProductSlugs,
  CATALOG_EDITION,
} from '@/lib/bim/product';
import {
  buildLeistungsverzeichnis,
  toLvText,
  toLvCsv,
  type LvLang,
} from '@/lib/bim/lv';
import { bimFileName } from '@/lib/bim/formats';
import { fileResponse, errorResponse, parseFormat } from '@/lib/bim/responses';
import type { CatalogCategoryId } from '@/lib/data/catalog';

export const runtime = 'nodejs';
export const revalidate = false;

const KATEGORIEN: CatalogCategoryId[] = [
  'pipes',
  'fittings',
  'transition-fittings',
  'valves',
  'weld-in-saddles',
  'accessories',
];

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const raw = url.searchParams.get('format');

  const sprache: LvLang = url.searchParams.get('sprache') === 'en' ? 'en' : 'de';
  const produkt = url.searchParams.get('produkt')?.trim().toLowerCase() ?? null;
  const kategorie = url.searchParams.get('kategorie')?.trim().toLowerCase() ?? null;

  if (kategorie && !(KATEGORIEN as string[]).includes(kategorie)) {
    return errorResponse(
      400,
      `Unbekannte Kategorie „${kategorie}".`,
      `Gültig: ${KATEGORIEN.join(', ')}. Werkzeuge stehen nicht im Leistungsverzeichnis — sie werden gekauft, nicht ausgeschrieben.`,
    );
  }

  let records = produkt ? getBimRecordsForProduct(produkt) : getBimComponentRecords();
  if (produkt && records.length === 0) {
    return errorResponse(
      404,
      `Das Produkt „${produkt}" steht nicht im Katalog.`,
      `Gültige Bezeichner: ${allProductSlugs().slice(0, 8).join(', ')} und weitere — vollständig unter /api/bim/katalog?format=json.`,
    );
  }
  if (kategorie) records = records.filter((r) => r.category === kategorie);

  const positionen = buildLeistungsverzeichnis(records, sprache);

  if (!raw) return uebersicht(url.origin, positionen.length);

  const format = parseFormat(raw, ['txt', 'csv', 'json'], 'txt');
  if (!format) {
    return errorResponse(
      400,
      `Unbekanntes Format „${raw}".`,
      'Für die Ausschreibungstexte gibt es txt, csv und json.',
    );
  }

  if (positionen.length === 0) {
    return errorResponse(
      404,
      'Zu dieser Auswahl gibt es keine Positionen.',
      'Werkzeuge stehen nicht im Leistungsverzeichnis.',
    );
  }

  const bereich = [
    'Ausschreibungstexte',
    produkt ?? kategorie ?? 'Gesamt',
    sprache.toUpperCase(),
  ].join('_');

  if (format === 'csv') {
    return fileResponse(toLvCsv(positionen, sprache), bimFileName(bereich, 'csv'), 'csv');
  }
  if (format === 'json') {
    return fileResponse(
      JSON.stringify(
        {
          hersteller: 'K-Aqua KWT GmbH',
          katalogstand: CATALOG_EDITION,
          sprache,
          hinweis:
            'Jede Angabe stammt aus dem Herstellerkatalog; die Fundstelle steht als „beleg" in jeder Position.',
          positionen,
        },
        null,
        2,
      ),
      bimFileName(bereich, 'json'),
      'json',
    );
  }
  return fileResponse(
    toLvText(positionen, sprache, CATALOG_EDITION),
    bimFileName(bereich, 'txt'),
    'txt',
  );
}

/** Was es gibt, und wo. Bewusst ohne Download. */
function uebersicht(origin: string, anzahl: number): NextResponse {
  return NextResponse.json(
    {
      hersteller: 'K-Aqua KWT GmbH',
      katalogstand: CATALOG_EDITION,
      positionen: anzahl,
      grundlage:
        'Die Texte entstehen aus dem katalogverifizierten Artikeldatensatz. Was der Katalog nicht führt, steht auch nicht im Text.',
      mengeneinheiten: {
        pipes: 'm — Rohre sind Meterware',
        sonstige: 'St',
      },
      formate: {
        txt: 'Leistungsverzeichnis als Text, zum Übernehmen in ein AVA-System',
        csv: 'dieselben Positionen als Tabelle, Semikolon und BOM für Excel',
        json: 'als Datensatz, je Position Ordnungszahl, Kurz- und Langtext, Einheit, Beleg',
      },
      sprachen: ['de', 'en'],
      beispiele: [
        `${origin}/api/bim/lv?format=txt`,
        `${origin}/api/bim/lv?format=csv&sprache=en`,
        `${origin}/api/bim/lv?format=txt&produkt=elbow-90`,
        `${origin}/api/bim/lv?format=json&kategorie=pipes`,
      ],
      nichtEnthalten: {
        gaeb:
          'GAEB DA XML wird derzeit nicht ausgeliefert. Ohne die amtliche Schemadatei und einen Probeimport in ein AVA-System liesse sich die Datei nicht prüfen, und eine ungeprüfte Datei wäre eine Zusage ohne Deckung.',
        werkzeuge:
          'Schweißgeräte, Scheren und Schaber stehen nicht im Leistungsverzeichnis — sie werden gekauft, nicht ausgeschrieben.',
      },
    },
    { headers: { 'Cache-Control': 'public, max-age=3600' } },
  );
}
