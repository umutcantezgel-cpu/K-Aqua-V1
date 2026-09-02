/* Pruefung des Artikeltabellen-Lesers gegen den echten Produktbestand.
 *
 * Der Leser ist die Bruecke zwischen der katalogverifizierten Markdown und
 * jeder erzeugten BIM-Datei. Liest er eine Zeile falsch, steht die falsche
 * Zahl in einer IFC-Datei, die ein Planer in sein Gebaeudemodell einsetzt.
 * Deshalb wird hier nicht an Beispieltext geprueft, sondern an allen 73
 * Produktdateien — und zwar auf Deckungsgleichheit mit den Artikelnummern
 * im Frontmatter, die aus demselben Katalog stammen, aber unabhaengig
 * gepflegt werden. Beide Bestaende muessen sich gegenseitig bestaetigen.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import {
  parseArticleTable,
  parseCell,
  parseColumnHeader,
  findArticleRow,
  numericValue,
  tableSections,
  type ArticleTable,
} from '@/lib/bim/article-table';

const PRODUCTS_DIR = path.resolve(__dirname, '../../content/products');

interface ProductFile {
  slug: string;
  category: string;
  markdown: string;
  frontmatterCodes: string[];
  table: ArticleTable | null;
}

function loadProducts(): ProductFile[] {
  const out: ProductFile[] = [];
  for (const category of readdirSync(PRODUCTS_DIR)) {
    let files: string[];
    try {
      files = readdirSync(path.join(PRODUCTS_DIR, category));
    } catch {
      continue; // index.md auf oberster Ebene ist kein Verzeichnis
    }
    for (const file of files) {
      if (!file.endsWith('.md') || file === 'index.md') continue;
      const markdown = readFileSync(path.join(PRODUCTS_DIR, category, file), 'utf8');
      const match = markdown.match(/article_codes:\s*\[([^\]]*)\]/s);
      const frontmatterCodes = match
        ? match[1]!
            .split(',')
            .map((s) => s.trim().replace(/^["']|["']$/g, ''))
            .filter(Boolean)
        : [];
      out.push({
        slug: file.replace(/\.md$/, ''),
        category,
        markdown,
        frontmatterCodes,
        table: parseArticleTable(markdown),
      });
    }
  }
  return out;
}

const PRODUCTS = loadProducts();

describe('Zellen lesen', () => {
  it('liest das deutsche Dezimalkomma als Dezimaltrenner', () => {
    // parseFloat('0,02') gaebe 0 — ein Bauteil ohne Gewicht.
    expect(parseCell('0,02')).toBe(0.02);
    expect(parseCell('102,2')).toBe(102.2);
    expect(parseCell('14,6')).toBe(14.6);
    expect(parseCell('1,30')).toBe(1.3);
  });

  it('liest Zahlen ohne Komma unveraendert', () => {
    expect(parseCell('20')).toBe(20);
    expect(parseCell('300')).toBe(300);
  });

  it('macht aus jedem Leerzeichen-Ersatz des Katalogs null, nicht null Millimeter', () => {
    for (const dash of ['–', '—', '-', '‒', '', '   ']) {
      expect(parseCell(dash)).toBeNull();
    }
  });

  it('laesst Gewinde- und Kombinationsangaben als Text stehen', () => {
    expect(parseCell('1/2"')).toBe('1/2"');
    expect(parseCell('20x1/2')).toBe('20x1/2');
    expect(parseCell('3/4"')).toBe('3/4"');
  });

  it('entfernt Auszeichnung aus der Zelle', () => {
    expect(parseCell('**SDR 11**')).toBe('SDR 11');
    // Der maskierte Stern verliert die Maskierung und bleibt als Zeichen
    // stehen. Er gilt bewusst nicht als „kein Wert": ein Stern in einer
    // Datenzelle waere ein Verweis, kein leeres Feld.
    expect(parseCell('\\*')).toBe('*');
  });
});

describe('Spaltenkoepfe lesen', () => {
  it('trennt Einheit vom Bezeichner', () => {
    expect(parseColumnHeader('Di (mm)')).toEqual({
      key: 'Di',
      label: 'Di (mm)',
      unit: 'mm',
    });
    expect(parseColumnHeader('Weight (kg/m)')).toEqual({
      key: 'Weight',
      label: 'Weight (kg/m)',
      unit: 'kg/m',
    });
    expect(parseColumnHeader('s min. (mm)')).toEqual({
      key: 's min.',
      label: 's min. (mm)',
      unit: 'mm',
    });
  });

  it('laesst Koepfe ohne Einheit unveraendert', () => {
    expect(parseColumnHeader('DN')).toEqual({ key: 'DN', label: 'DN', unit: null });
    expect(parseColumnHeader('Pack.')).toEqual({
      key: 'Pack.',
      label: 'Pack.',
      unit: null,
    });
  });
});

describe('Der gesamte Produktbestand', () => {
  it('haelt 73 Produktdateien', () => {
    expect(PRODUCTS).toHaveLength(73);
  });

  it('fuehrt in jeder Datei eine lesbare Artikeltabelle', () => {
    const ohne = PRODUCTS.filter((p) => !p.table).map((p) => `${p.category}/${p.slug}`);
    expect(ohne).toEqual([]);
  });

  it('liest genau 580 Artikelzeilen — so viele, wie der Bestand Artikelnummern führt', () => {
    const zeilen = PRODUCTS.reduce((s, p) => s + (p.table?.rows.length ?? 0), 0);
    const codes = PRODUCTS.reduce((s, p) => s + p.frontmatterCodes.length, 0);
    expect(zeilen).toBe(580);
    expect(zeilen).toBe(codes);
  });

  it('deckt sich in jeder Datei mit den Artikelnummern des Frontmatters', () => {
    // Die entscheidende Pruefung. Tabelle und Frontmatter sind zwei getrennt
    // gepflegte Abschriften desselben Katalogs. Stimmen sie ueberein, ist die
    // Wahrscheinlichkeit eines unentdeckten Lesefehlers gering.
    const abweichungen: string[] = [];
    for (const p of PRODUCTS) {
      const ausTabelle = p.table!.rows.map((r) => r.code);
      if (JSON.stringify(ausTabelle) !== JSON.stringify(p.frontmatterCodes)) {
        abweichungen.push(
          `${p.category}/${p.slug}: Tabelle [${ausTabelle.join(',')}] vs. Frontmatter [${p.frontmatterCodes.join(',')}]`,
        );
      }
    }
    expect(abweichungen).toEqual([]);
  });

  it('laesst kein Fussnotenzeichen in einer Artikelnummer stehen', () => {
    for (const p of PRODUCTS) {
      for (const row of p.table!.rows) {
        expect(row.code).not.toMatch(/[*\\]/);
        expect(row.code.length).toBeGreaterThan(0);
      }
    }
  });

  it('gibt jeder Zeile einen Wert je Spalte', () => {
    for (const p of PRODUCTS) {
      const keys = p.table!.columns.map((c) => c.key);
      for (const row of p.table!.rows) {
        expect(Object.keys(row.values).sort()).toEqual([...keys].sort());
      }
    }
  });

  it('vergibt innerhalb einer Datei eindeutige Artikelnummern', () => {
    for (const p of PRODUCTS) {
      const codes = p.table!.rows.map((r) => r.code);
      expect(new Set(codes).size).toBe(codes.length);
    }
  });

  it('vergibt Artikelnummern über den Bestand hinweg eindeutig — bis auf zwei bekannte Dublettenseiten', () => {
    /* Zwei Produktseiten sind Reste des Zusammenlegens:
     *   fittings/elbow-90-large-sizes.md      — 7 Nummern, alle auch in elbow-90.md
     *   fittings/reducing-tee-large-sizes.md  — 27 Nummern, alle auch in reducing-tee.md
     *
     * Beim Katalogabgleich wurden die großen Nennweiten als Abschnitt
     * `**SDR 11***` in die Hauptdatei uebernommen; die eigenstaendigen
     * Seiten blieben stehen. Die Hauptdateien sind jeweils die Obermenge
     * (elbow-90: 14 Zeilen gegen 7, reducing-tee: 37 gegen 27).
     *
     * Fuer BIM ist das nicht hinnehmbar: eine Artikelnummer muss auf genau
     * ein Produkt fuehren, sonst ist /api/bim/[slug]/[article] mehrdeutig.
     * Bis die beiden Seiten zusammengelegt sind, wird der Zustand hier
     * festgehalten — so faellt jede NEUE Dublette sofort auf.
     */
    const bekannteDublettenseiten = new Set([
      'elbow-90-large-sizes',
      'reducing-tee-large-sizes',
    ]);

    const vorkommen = new Map<string, string[]>();
    for (const p of PRODUCTS) {
      for (const row of p.table!.rows) {
        vorkommen.set(row.code, [...(vorkommen.get(row.code) ?? []), p.slug]);
      }
    }

    const unerwartet: string[] = [];
    for (const [code, slugs] of vorkommen) {
      if (slugs.length === 1) continue;
      const ohneBekannte = slugs.filter((s) => !bekannteDublettenseiten.has(s));
      // Zulaessig ist nur: genau eine Hauptseite plus bekannte Dublettenseiten.
      if (ohneBekannte.length !== 1) {
        unerwartet.push(`${code}: ${slugs.join(', ')}`);
      }
    }
    expect(unerwartet).toEqual([]);
  });

  it('macht jede Dublettenseite zur echten Teilmenge ihrer Hauptseite', () => {
    // Solange das gilt, geht beim Zusammenlegen kein Artikel verloren.
    const paare: [string, string][] = [
      ['elbow-90-large-sizes', 'elbow-90'],
      ['reducing-tee-large-sizes', 'reducing-tee'],
    ];
    for (const [dublette, haupt] of paare) {
      const d = PRODUCTS.find((p) => p.slug === dublette)!;
      const h = PRODUCTS.find((p) => p.slug === haupt)!;
      const hauptCodes = new Set(h.frontmatterCodes);
      const fehlend = d.frontmatterCodes.filter((c) => !hauptCodes.has(c));
      expect(fehlend).toEqual([]);
      expect(h.frontmatterCodes.length).toBeGreaterThan(d.frontmatterCodes.length);
    }
  });

  it('hängt an jedes Fussnotenzeichen auch einen Fussnotentext', () => {
    for (const p of PRODUCTS) {
      const markiert = p.table!.rows.some((r) => r.footnoteMarker);
      if (markiert) {
        expect(p.table!.footnotes.length).toBeGreaterThan(0);
      }
    }
  });

  it('findet einen Aussendurchmesser für jede Zeile — bei Formstücken unter d, bei Rohren unter D', () => {
    // Werkzeuge fuehren keine Nennweite; sie sind auch keine BIM-Bauteile.
    const ohneDurchmesser: string[] = [];
    for (const p of PRODUCTS) {
      if (p.category === 'tools') continue;
      for (const row of p.table!.rows) {
        if (numericValue(row, 'd', 'D') === null) {
          ohneDurchmesser.push(`${p.category}/${p.slug}:${row.code}`);
        }
      }
    }
    // Übergangsstücke und Zubehör führen teils Kombinationsschlüssel wie
    // `20x1/2` statt einer Zahl. Das ist zulässig, muss aber bekannt bleiben.
    expect(ohneDurchmesser.length).toBeLessThan(60);
  });
});

describe('Abschnitte innerhalb einer Tabelle', () => {
  const elbow = PRODUCTS.find((p) => p.slug === 'elbow-90')!;

  it('erkennt die SDR-11-Abschnittszeile als Abschnitt, nicht als Artikel', () => {
    const codes = elbow.table!.rows.map((r) => r.code);
    expect(codes).not.toContain('SDR 11*');
    expect(tableSections(elbow.table!)).toContain('SDR 11*');
  });

  it('ordnet die großen Nennweiten dem SDR-11-Abschnitt zu', () => {
    // Diese Groessen werden stumpf- oder elektrogeschweisst statt gemufft —
    // eine andere Verbindungsart und damit ein anderer IFC-Anschlusspunkt.
    const d160 = findArticleRow(elbow.table!, 'AQ090160');
    expect(d160?.section).toBe('SDR 11*');
    const d20 = findArticleRow(elbow.table!, 'AQ09020');
    expect(d20?.section).toBeNull();
  });

  it('liest die Fussnote zur Verbindungsart mit', () => {
    expect(elbow.table!.footnotes.join(' ')).toMatch(/butt-fusion or electrofusion/i);
  });

  it('behält die wechselnde Spaltenbelegung als null statt als Null', () => {
    const d20 = findArticleRow(elbow.table!, 'AQ09020')!;
    const d160 = findArticleRow(elbow.table!, 'AQ090160')!;
    // Oberhalb des Abschnitts: L gefuellt, l und s leer.
    expect(d20.values['L']).toBe(27);
    expect(d20.values['l']).toBeNull();
    expect(d20.values['s']).toBeNull();
    // Unterhalb: umgekehrt.
    expect(d160.values['L']).toBeNull();
    expect(d160.values['l']).toBe(143);
    expect(d160.values['s']).toBe(14.6);
  });
});

describe('Sonderbestellung 5,80 m', () => {
  const sdr6 = PRODUCTS.find((p) => p.slug === 'k-pipe-pp-r-sdr-6')!;

  it('trennt Artikelnummer und Fussnotenzeichen', () => {
    const row = findArticleRow(sdr6.table!, 'AQ200P20');
    expect(row).not.toBeNull();
    expect(row!.footnoteMarker).toBe('*');
    // Und die unmarkierten Groessen tragen kein Zeichen.
    expect(findArticleRow(sdr6.table!, 'AQ200P110')!.footnoteMarker).toBeNull();
  });

  it('bewahrt die Lieferoption im Fussnotentext', () => {
    expect(sdr6.table!.footnotes.join(' ')).toMatch(/5,80 meter length/i);
    expect(sdr6.table!.footnotes.join(' ')).toMatch(/AQ258P/);
  });

  it('liest die Rohrmaße vollständig', () => {
    const row = findArticleRow(sdr6.table!, 'AQ200P20')!;
    expect(row.values['D']).toBe(20);
    expect(row.values['DN']).toBe(12);
    expect(row.values['Di']).toBe(13.2);
    expect(row.values['s min.']).toBe(3.4);
    expect(row.values['Weight']).toBe(0.18);
    expect(row.values['Water capacity']).toBe(0.14);
  });
});

describe('Rohwerte für die Anzeige', () => {
  const elbow45 = PRODUCTS.find((p) => p.slug === 'elbow-45')!;
  const sdr6 = PRODUCTS.find((p) => p.slug === 'k-pipe-pp-r-sdr-6')!;

  it('bewahrt das deutsche Dezimalkomma', () => {
    const row = findArticleRow(elbow45.table!, 'AQ04520')!;
    expect(row.values['kg']).toBe(0.02);
    expect(row.rawValues['kg']).toBe('0,02');
  });

  /* Der Fall, der den Rohwert ueberhaupt noetig macht: Als Zahl ist 0,10
     gleich 0.1 — die gedruckte Nachkommastelle ist futsch, und keine
     Formatierung kann sie zurueckholen, weil sie in der Zahl nicht mehr
     drinsteht. */
  it('bewahrt die nachlaufende Null', () => {
    const row = findArticleRow(elbow45.table!, 'AQ04550')!;
    expect(row.values['kg']).toBe(0.1);
    expect(row.rawValues['kg']).toBe('0,10');
  });

  it('laesst Nicht-Zahlen unangetastet', () => {
    const row = findArticleRow(elbow45.table!, 'AQ04520')!;
    // Ganze Zahlen bleiben, wie sie gedruckt sind.
    expect(row.rawValues['d']).toBe('20');
    expect(row.rawValues['Pack.']).toBe('300');
  });

  /* Das Fussnotenzeichen steht in `valueMarkers` und wird bei der Anzeige
     eigens gesetzt — stuende es auch im Rohwert, erschiene es doppelt. */
  it('haelt das Fussnotenzeichen aus dem Rohwert heraus', () => {
    const row = findArticleRow(sdr6.table!, 'AQ200P20')!;
    expect(row.footnoteMarker).toBe('*');
    expect(row.rawValues['D']).toBe('20');
    expect(row.rawValues['D']).not.toContain('*');
  });

  it('fuehrt fuer jede Spalte jeder Zeile einen Rohwert', () => {
    for (const p of PRODUCTS) {
      if (!p.table) continue;
      const spalten = p.table.columns.map((c) => c.key);
      for (const row of p.table.rows) {
        for (const s of spalten) {
          expect(typeof row.rawValues[s], `${p.slug} ${row.code} ${s}`).toBe('string');
        }
      }
    }
  });
});
