/* Liest die Artikeltabelle aus einer Produkt-Markdown.
 *
 * Die Tabellen unter `## Article Table` in content/products/**\/*.md sind die
 * gegen den Druckkatalog verifizierte Maßquelle der Website. Fuer BIM muessen
 * sie zeilenweise zugaenglich sein — je Artikelnummer ein Satz Maße.
 *
 * Drei Eigenheiten, die ein naiver Tabellenleser falsch macht:
 *
 * 1. DEZIMALKOMMA. Der Katalog ist deutsch gesetzt: `0,02`, `102,2`, `14,6`.
 *    `parseFloat('0,02')` liefert 0 — also stillschweigend ein Bauteil ohne
 *    Gewicht. Hier wird das Komma ausdruecklich behandelt.
 *
 * 2. ABSCHNITTSZEILEN. Mitten in der Tabelle steht etwa
 *    `| **SDR 11\*** | | | ... |` und trennt die Muffenschweiß-Groessen von
 *    den Stumpfschweiß-Groessen. Diese Zeile ist kein Artikel. Alle Zeilen
 *    darunter gehoeren zum Abschnitt — was fuer die Verbindungsart und damit
 *    fuer die IFC-Anschlusspunkte entscheidend ist.
 *
 * 3. WECHSELNDE SPALTENBELEGUNG. Ober- und unterhalb einer Abschnittszeile
 *    sind unterschiedliche Spalten gefuellt; die uebrigen tragen einen
 *    Gedankenstrich. Beim Winkel 90° etwa steht oberhalb `L`, unterhalb `l`
 *    und `s`. Leere Felder werden zu null und nicht zu 0 — der Unterschied
 *    zwischen „nicht angegeben" und „null Millimeter" darf nicht verloren
 *    gehen. */

/** Ein Spaltenkopf, in Bezeichner und Einheit zerlegt. */
export interface ArticleColumn {
  /** Schluessel ohne Einheit: aus `Di (mm)` wird `Di`, aus `s min. (mm)` `s min.`. */
  key: string;
  /** Der Kopf, wie er in der Markdown steht. */
  label: string;
  /** Einheit aus der Klammer, sofern vorhanden. */
  unit: string | null;
}

export interface ArticleRow {
  /** Artikelnummer aus der ersten Spalte, ohne Fussnotenzeichen. */
  code: string;
  /** Abschnitt, unter dem die Zeile steht. Null oberhalb der ersten Abschnittszeile. */
  section: string | null;
  /**
   * Gesetzt, wenn die Artikelnummer im Katalog ein Fussnotenzeichen traegt.
   *
   * Das ist keine Formsache. Bei vier Rohrprodukten markiert das Sternchen
   * die Groessen, die es auf Anfrage in 5,80 m Stangenlaenge gibt — unter
   * einer anderen Artikelnummer. Wer das Zeichen einfach mitliest, erzeugt
   * Artikelnummern wie `AQ200P20*`, die es nicht gibt; wer es wegwirft,
   * verliert eine Lieferoption. Der Text steht in `footnotes`.
   */
  footnoteMarker: string | null;
  /** Werte je Spaltenschluessel. Null, wo der Katalog einen Gedankenstrich fuehrt. */
  values: Record<string, number | string | null>;
  /**
   * Fussnotenzeichen an einzelnen Werten, je Spaltenschluessel.
   *
   * Beim K-Fiber-Rohr SDR 11 traegt `s min.` in d20 und d25 einen Verweis auf
   * die abweichende Reihe SDR 7,4. Nur gefuellt, wo tatsaechlich ein Zeichen
   * steht — im gesamten Bestand sind das vier Zellen.
   */
  valueMarkers: Record<string, string>;
}

export interface ArticleTable {
  columns: ArticleColumn[];
  rows: ArticleRow[];
  /** Fussnoten unterhalb der Tabelle, etwa zur Verbindungsart bei SDR 11. */
  footnotes: string[];
}

/** Zeichen, die der Katalog fuer „kein Wert" setzt: Gedankenstrich, Halbgeviert-
 *  und Geviertstrich sowie der schlichte Bindestrich. */
const EMPTY_MARKERS = new Set(['–', '—', '-', '‒', '']);

/**
 * Trennt ein angehaengtes Fussnotenzeichen von einer Zelle.
 *
 * Nicht nur Artikelnummern tragen Verweise, sondern auch Zahlen. Beim
 * K-Fiber-Rohr SDR 11 steht in der Wandstaerkenspalte `2,8*` und `3,5*`, und
 * die Fussnote sagt: `SDR 7,4 - S 3,2`. Die beiden kleinsten Nennweiten
 * dieses Rohres sind also in einer anderen, dickeren Reihe gefertigt als das
 * Produkt im Namen fuehrt — 20/7,4 = 2,7 und 25/7,4 = 3,4 decken sich mit den
 * gedruckten Werten. Das ist keine Formsache: wer das Zeichen mitliest,
 * verliert die Wandstaerke ganz; wer es wortlos wegwirft, verliert den
 * Hinweis auf die abweichende Reihe.
 */
export function splitCellMarker(raw: string): { text: string; marker: string | null } {
  const text = raw.replace(/\*\*/g, '').replace(/\\/g, '').trim();
  const match = text.match(/^(.+?)(\*+)$/);
  if (!match) return { text, marker: null };
  return { text: match[1]!.trim(), marker: match[2]! };
}

/**
 * Wandelt eine Tabellenzelle in Zahl, Text oder null.
 *
 * Zahlen sind deutsch gesetzt. Ein Komma ist immer das Dezimaltrennzeichen;
 * Punkte davor waeren Tausendertrenner und fallen weg. Enthaelt die Zelle
 * kein Komma, wird sie unveraendert gelesen. Was sich nicht als Zahl lesen
 * laesst — Gewindegroessen wie `1/2"`, Kombinationsschluessel wie `20x1/2` —
 * bleibt Text. Ein angehaengtes Fussnotenzeichen wird abgetrennt; es steht
 * danach in `ArticleRow.valueMarkers`.
 */
export function parseCell(raw: string): number | string | null {
  const stripped = raw.replace(/\*\*/g, '').replace(/\\/g, '').trim();
  if (EMPTY_MARKERS.has(stripped)) return null;

  const { text, marker } = splitCellMarker(raw);
  if (!text || EMPTY_MARKERS.has(text)) {
    // Eine Zelle, die nach dem Abtrennen nichts mehr enthaelt, war nur der
    // Verweis selbst — etwa der maskierte Stern einer Fussnotenzeile.
    return marker ? stripped : null;
  }

  const normalised = text.includes(',')
    ? text.replace(/\./g, '').replace(',', '.')
    : text;

  // Nur reine Zahlen umwandeln. `20x1/2` oder `1/2"` enthalten Ziffern,
  // sind aber keine Zahlen und muessen als Text erhalten bleiben.
  if (/^-?\d+(\.\d+)?$/.test(normalised)) {
    return Number(normalised);
  }
  return text;
}

/** Zerlegt `Weight (kg/m)` in Schluessel `Weight` und Einheit `kg/m`. */
export function parseColumnHeader(raw: string): ArticleColumn {
  const label = raw.replace(/\*\*/g, '').trim();
  const match = label.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (match) {
    return { key: match[1]!.trim(), label, unit: match[2]!.trim() };
  }
  return { key: label, label, unit: null };
}

/** Teilt eine GFM-Tabellenzeile in ihre Zellen. */
function splitRow(line: string): string[] {
  return line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((c) => c.trim());
}

/** Erkennt die Trennzeile `|---|---|` unter der Kopfzeile. */
function isSeparatorRow(cells: string[]): boolean {
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c));
}

/**
 * Erkennt eine Abschnittszeile: erste Zelle gefuellt, alle uebrigen leer.
 * Beispiel: `| **SDR 11\*** |  |  |  |  |  |  |  |  |`
 */
function sectionLabel(cells: string[]): string | null {
  const [first, ...rest] = cells;
  if (!first) return null;
  const label = first.replace(/\*\*/g, '').replace(/\\/g, '').trim();
  if (!label) return null;
  const restEmpty = rest.every((c) => EMPTY_MARKERS.has(c.trim()));
  return restEmpty ? label : null;
}

/**
 * Liest die erste GFM-Tabelle nach der Ueberschrift `## Article Table`.
 * Fehlt sie, wird die erste Tabelle des Dokuments genommen, deren Kopfzeile
 * mit `Code` beginnt — einige Kategorien setzen eine andere Ueberschrift.
 *
 * @returns die Tabelle, oder null wenn das Dokument keine fuehrt
 */
export function parseArticleTable(markdown: string): ArticleTable | null {
  const lines = markdown.split(/\r?\n/);

  // Tabellenkopf suchen: eine Zeile mit Pipes, deren erste Zelle `Code` ist,
  // gefolgt von einer Trennzeile.
  let headerIndex = -1;
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i]!;
    if (!line.includes('|')) continue;
    const cells = splitRow(line);
    if (cells[0]?.replace(/\*\*/g, '').trim().toLowerCase() !== 'code') continue;
    const next = lines[i + 1]!;
    if (next.includes('|') && isSeparatorRow(splitRow(next))) {
      headerIndex = i;
      break;
    }
  }
  if (headerIndex < 0) return null;

  const headerCells = splitRow(lines[headerIndex]!);
  // Die erste Spalte ist die Artikelnummer und wird nicht als Maß gefuehrt.
  const columns = headerCells.slice(1).map(parseColumnHeader);

  const rows: ArticleRow[] = [];
  const footnotes: string[] = [];
  let section: string | null = null;

  let i = headerIndex + 2; // Kopfzeile und Trennzeile ueberspringen
  for (; i < lines.length; i++) {
    const line = lines[i]!;
    if (!line.includes('|')) break; // Tabelle zu Ende
    const cells = splitRow(line);

    const label = sectionLabel(cells);
    if (label) {
      section = label;
      continue;
    }

    const rawCode = cells[0]?.replace(/\*\*/g, '').replace(/\\/g, '').trim() ?? '';
    if (!rawCode || EMPTY_MARKERS.has(rawCode)) continue;

    // Fussnotenzeichen von der Artikelnummer trennen. `AQ200P20*` ist die
    // Nummer AQ200P20 mit einem Verweis, nicht eine Nummer mit Sternchen.
    const marked = rawCode.match(/^(.*?)(\*+)$/);
    const code = marked ? marked[1]!.trim() : rawCode;
    const footnoteMarker = marked ? marked[2]! : null;

    const values: Record<string, number | string | null> = {};
    const valueMarkers: Record<string, string> = {};
    columns.forEach((col, idx) => {
      const cell = cells[idx + 1] ?? '';
      values[col.key] = parseCell(cell);
      const { text, marker } = splitCellMarker(cell);
      if (marker && text && !EMPTY_MARKERS.has(text)) {
        valueMarkers[col.key] = marker;
      }
    });
    rows.push({ code, section, footnoteMarker, values, valueMarkers });
  }

  // Fussnoten unmittelbar unterhalb der Tabelle einsammeln. Sie tragen die
  // Angabe zur Verbindungsart, die fuer die IFC-Anschlusspunkte gebraucht wird,
  // und die Stangenlaengen-Sonderbestellung.
  //
  // Verlangt wird der maskierte Stern `\*`. So ist er im gesamten Bestand
  // gesetzt — 15 Fussnoten in 15 Dateien, ausnahmslos maskiert. Ein blosses
  // `*` waere mehrdeutig: die Abschnitte darunter fuehren Aufzaehlungen, die
  // ebenfalls mit einem Stern beginnen und keine Fussnoten sind.
  for (; i < lines.length; i++) {
    const line = lines[i]!.trim();
    if (!line) continue;
    if (line.startsWith('#')) break;
    if (/^\\\*/.test(line)) {
      footnotes.push(line.replace(/^\\\*\s*/, '').trim());
      continue;
    }
    break;
  }

  return { columns, rows, footnotes };
}

/** Sucht die Zeile zu einer Artikelnummer. */
export function findArticleRow(table: ArticleTable, code: string): ArticleRow | null {
  return table.rows.find((r) => r.code === code) ?? null;
}

/**
 * Liest einen Zahlenwert aus einer Zeile. Prueft die angegebenen Schluessel
 * der Reihe nach und gibt den ersten gefuellten zurueck.
 *
 * Gedacht fuer Spalten, die je nach Kategorie anders heissen: der
 * Aussendurchmesser steht bei Formstuecken unter `d`, bei Rohren unter `D`.
 */
export function numericValue(row: ArticleRow, ...keys: string[]): number | null {
  for (const key of keys) {
    const value = row.values[key];
    if (typeof value === 'number') return value;
  }
  return null;
}

/** Alle Abschnitte der Tabelle, in gedruckter Reihenfolge, ohne Dubletten. */
export function tableSections(table: ArticleTable): string[] {
  const seen = new Set<string>();
  for (const row of table.rows) {
    if (row.section) seen.add(row.section);
  }
  return [...seen];
}
