/**
 * Katalogwerte anzeigen, ohne sie zu verfälschen.
 *
 * Die Artikeltabellen sind deutsch gesetzt: `0,62`, `290,60`, `102,2`. Wer
 * daraus über `values` rendert, zeigt `0.62` und verliert bei `290,60` die
 * nachlaufende Null — `parseCell` hat aus der Zelle eine Zahl gemacht, und
 * die Zahl der gedruckten Nachkommastellen steckt in ihr nicht mehr drin.
 * `Intl.NumberFormat` rettet das nicht, es kann sie nur raten.
 *
 * Deshalb wird hier nicht gerechnet, sondern ausschliesslich das Trennzeichen
 * getauscht — auf dem Rohwert aus `ArticleRow.rawValues`.
 */

/**
 * Was eine Zelle sein kann, vollständig erhoben über alle 73 Produktdateien
 * (28 Formen, 4142 Zellen):
 *
 *   Dezimalzahl   `0,62` `14,6` `290,60` `13,43`          1067x
 *   Ganzzahl      `40` `140` `1`                          2831x
 *   Gedankenstrich`–`                                      348x
 *   Zollmass      `1/2 "` `1 1/4 "` `2 "` `1 3/4`          117x
 *   Gewinde       `G 1/2` `G 3/4 "`                          6x
 *   Bereich       `40 - 63` `160-250x25` `100-135-150`      25x
 *   Kürzel        `SF` `BF` `SF/BF`                         10x
 *
 * Umgesetzt wird NUR die reine Dezimalzahl. Alles andere geht unverändert
 * durch — ein Tausenderpunkt kommt im ganzen Bestand nicht vor (der grösste
 * Wert vor dem Komma hat drei Stellen), und in `160-250x25` oder `1/2 "` hätte
 * ein Trennzeichentausch nichts zu suchen.
 */
const REINE_DEZIMALZAHL = /^(\d+),(\d+)$/;

/**
 * Das Dezimaltrennzeichen der Zielsprache, aus `Intl` abgeleitet statt aus
 * einer gepflegten Liste — 41 der 65 Sprachen setzen das Komma, 23 den Punkt,
 * und eine Liste wäre spätestens bei der nächsten neuen Sprache falsch.
 *
 * `fa` ist die einzige Sprache im Bestand, die weder `.` noch `,` liefert,
 * sondern das arabisch-indische `٫`. Dort bleibt der Katalogwert stehen, wie
 * der Hersteller ihn druckt: Die Ziffern der Tabelle sind durchweg westlich,
 * und ein `0٫62` aus westlichen Ziffern mit persischem Trenner wäre ein
 * Mischsatz, den niemand so schreibt — schlechter lesbar als das Original und
 * gegen den Druckkatalog nicht mehr abgleichbar.
 */
function trennzeichen(locale: string): '.' | ',' | null {
  let gesetzt: string;
  try {
    gesetzt = new Intl.NumberFormat(locale).format(1.1);
  } catch {
    return null;
  }
  const t = gesetzt.slice(1, -1);
  return t === '.' || t === ',' ? t : null;
}

/**
 * Einen Katalogwert für die Anzeige aufbereiten.
 *
 * @param raw Die Zelle, wie sie in der Markdown steht (`ArticleRow.rawValues`).
 * @param locale Die Sprache des Besuchers.
 */
export function formatCatalogNumber(raw: string, locale: string): string {
  const wert = raw.trim();
  const treffer = REINE_DEZIMALZAHL.exec(wert);
  if (!treffer) return wert;

  const t = trennzeichen(locale);
  if (t === null || t === ',') return wert;

  return `${treffer[1]}${t}${treffer[2]}`;
}
