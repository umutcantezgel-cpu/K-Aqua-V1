import {
  ARTICLE_NAMES,
  ARTICLE_CODE_ALIASES,
  type ArticleNameRecord,
} from './article-names.generated';

/**
 * Zugriff auf die offiziellen Artikelnamen des Herstellers.
 *
 * Rein und ohne Dateisystemzugriff — die Auflösung und die
 * Mehrdeutigkeitsprüfung sind bereits zur Erzeugungszeit passiert
 * (`scripts/sync-article-names.ts`). Damit ist dieses Modul aus Client-Code
 * importierbar, und eine mehrdeutige Zuordnung kann den Browser gar nicht
 * erreichen — sie bricht vorher die CI.
 */

/** Der Aussendurchmesser-Strich, den die Artikeltabellen für „nicht angegeben" führen. */
export const KEIN_NAME = '–';

function normalisiereCode(code: string): string {
  return code.trim().toUpperCase();
}

/**
 * Die Website-Artikelnummer zu einer beliebigen Schreibweise.
 *
 * Versteht die Herstellerschreibweise mit Werkstoffbuchstaben (`AQ045P110`)
 * und die Farbvarianten (`CU041P20`). Gibt `null`, wenn die Nummer weder
 * bekannt noch auflösbar ist.
 *
 * WICHTIG: Hier wird NICHT normalisiert im Sinne von „P entfernen". Die
 * Aliasliste ist zur Erzeugungszeit entstanden und enthält nur eindeutig
 * aufgelöste Paare. Eine Nummer, deren Normalform im Bestand mehrdeutig ist
 * — `AQ200P20` gegen `AQ20020`, PP-R gegen PP-RCT — steht dort bewusst nicht
 * drin und bleibt hier ohne Antwort.
 */
export function resolveArticleCode(code: string): string | null {
  const c = normalisiereCode(code);
  if (c in ARTICLE_NAMES) return c;
  return ARTICLE_CODE_ALIASES[c] ?? null;
}

/**
 * Die Sprachkette für einen Artikelnamen.
 *
 * Ziel → Basissprache → Englisch → Deutsch.
 *
 * Die Basissprache steht hier und nicht bei next-intl, weil `fr-SN` dort NICHT
 * von `fr` erbt (`lib/i18n/request.ts:24-32`): Beide sind eigenständige
 * Locales mit eigener Sprachdatei, und der Basissprachzweig greift für `fr-SN`
 * gar nicht erst. Ohne diese Zeile bekämen 16 westafrikanische Märkte
 * englische Artikelnamen, während Frankreich französische sieht.
 *
 * Englisch vor Deutsch — das ist die Regel des Auftraggebers und zugleich die,
 * die `lib/i18n/request.ts:90` für die ganze Website führt.
 */
function ausRecord(record: ArticleNameRecord, locale: string): string {
  const l = locale.toLowerCase();
  const basis = l.split('-')[0] ?? '';
  if (l === 'de' || basis === 'de') return record.de;
  if ((l === 'fr' || basis === 'fr') && record.fr) return record.fr;
  return record.en || record.de;
}

/**
 * Der Artikelname in der Sprache des Besuchers, oder `null`.
 *
 * `null` heisst: Die Herstellerliste führt diese Nummer nicht. Das trifft
 * heute 284 von 580 Nummern — darunter alle 175 Rohre, für die es in der
 * Lieferung keine einzige Zeile gibt.
 */
export function articleName(code: string, locale: string): string | null {
  const aufgeloest = resolveArticleCode(code);
  if (!aufgeloest) return null;
  const record = ARTICLE_NAMES[aufgeloest];
  return record ? ausRecord(record, locale) : null;
}

/**
 * Trägt mindestens eine dieser Nummern einen Namen?
 *
 * Entscheidet, ob die Bezeichnungsspalte in der Artikeltabelle überhaupt
 * erscheint. Die Abdeckung ist praktisch alles-oder-nichts: 31 Produktdateien
 * sind vollständig gedeckt, 39 gar nicht, 3 teilweise. Eine Spalte aus lauter
 * Gedankenstrichen auf den Rohrseiten wäre Ballast.
 */
export function hasAnyArticleName(codes: readonly string[]): boolean {
  return codes.some((c) => articleName(c, 'en') !== null);
}

/** Alle Namen eines Produkts, fertig für die Tabellenkomponente. */
export function articleNamesFor(
  codes: readonly string[],
  locale: string
): Record<string, string> {
  const namen: Record<string, string> = {};
  for (const c of codes) {
    const name = articleName(c, locale);
    if (name) namen[normalisiereCode(c)] = name;
  }
  return namen;
}

export { ARTICLE_NAMES, ARTICLE_CODE_ALIASES };
export type { ArticleNameRecord };
