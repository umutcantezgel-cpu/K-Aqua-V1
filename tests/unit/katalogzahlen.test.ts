import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { parseArticleTable } from '../../lib/bim/article-table';
import { formatCatalogNumber } from '../../lib/catalog-format';

/**
 * Anzeige von Katalogwerten.
 *
 * Der Fehler, gegen den diese Datei steht: `parseCell` macht aus `0,02` die
 * Zahl `0.02` und aus `2,70` die Zahl `2.7`. Wer daraus rendert, zeigt auf der
 * deutschen Seite einen englischen Dezimalpunkt und verliert die nachlaufende
 * Null. Deshalb wird nicht gerechnet, sondern nur das Trennzeichen getauscht.
 */

describe('formatCatalogNumber', () => {
  it('lässt deutsche Werte auf der deutschen Seite unangetastet', () => {
    expect(formatCatalogNumber('0,02', 'de')).toBe('0,02');
    expect(formatCatalogNumber('14,6', 'de')).toBe('14,6');
    expect(formatCatalogNumber('290,60', 'de')).toBe('290,60');
  });

  it('setzt den Punkt in Sprachen, die ihn führen', () => {
    expect(formatCatalogNumber('0,02', 'en')).toBe('0.02');
    expect(formatCatalogNumber('14,6', 'en')).toBe('14.6');
    expect(formatCatalogNumber('13,43', 'ar')).toBe('13.43');
  });

  it('behält die nachlaufende Null — genau das kann Intl.NumberFormat nicht', () => {
    // `Number('290,60'.replace(',','.'))` ist 290.6; die Zahl der gedruckten
    // Nachkommastellen steckt in der Zahl nicht mehr drin.
    expect(formatCatalogNumber('290,60', 'en')).toBe('290.60');
    expect(formatCatalogNumber('0,10', 'en')).toBe('0.10');
    expect(formatCatalogNumber('2,70', 'en')).toBe('2.70');
  });

  it('behält das Komma in den 41 Sprachen, die es führen', () => {
    expect(formatCatalogNumber('0,62', 'fr')).toBe('0,62');
    expect(formatCatalogNumber('0,62', 'fr-SN')).toBe('0,62');
    expect(formatCatalogNumber('0,62', 'tr')).toBe('0,62');
  });

  it('rührt Zollmaße, Gewinde, Bereiche und Kürzel nicht an', () => {
    for (const wert of ['1/2 "', '1 1/4 "', '2 "', '1 3/4', 'G 1/2', 'G 3/4 "']) {
      expect(formatCatalogNumber(wert, 'en')).toBe(wert);
      expect(formatCatalogNumber(wert, 'de')).toBe(wert);
    }
    for (const wert of ['40 - 63', '160-250x25', '100-135-150', 'SF/BF', 'BF', '–']) {
      expect(formatCatalogNumber(wert, 'en')).toBe(wert);
    }
  });

  it('lässt Ganzzahlen unverändert — dort gibt es nichts zu tauschen', () => {
    expect(formatCatalogNumber('40', 'en')).toBe('40');
    expect(formatCatalogNumber('300', 'de')).toBe('300');
  });

  it('behält bei fa den Katalogwert, statt einen Mischsatz zu erzeugen', () => {
    // `Intl.NumberFormat('fa')` liefert das arabisch-indische ٫. Die Ziffern
    // der Tabelle sind aber durchweg westlich — `0٫62` wäre unlesbarer als
    // das Original und gegen den Druckkatalog nicht mehr abgleichbar.
    expect(new Intl.NumberFormat('fa').format(1.1).slice(1, -1)).toBe('٫');
    expect(formatCatalogNumber('0,62', 'fa')).toBe('0,62');
  });

  it('fällt bei einer unbekannten Sprachkennung auf den Katalogwert zurück', () => {
    expect(formatCatalogNumber('0,62', 'nicht-eine-sprache!!')).toBe('0,62');
  });
});

describe('formatCatalogNumber gegen den echten Bestand', () => {
  function alleRohwerte(): string[] {
    const werte: string[] = [];
    for (const kat of readdirSync('content/products')) {
      let dateien: string[] = [];
      try {
        dateien = readdirSync(join('content/products', kat)).filter((f) => f.endsWith('.md'));
      } catch {
        continue;
      }
      for (const f of dateien) {
        const md = matter(readFileSync(join('content/products', kat, f), 'utf8')).content;
        const tabelle = parseArticleTable(md);
        if (!tabelle) continue;
        for (const zeile of tabelle.rows) werte.push(...Object.values(zeile.rawValues));
      }
    }
    return werte;
  }

  const werte = alleRohwerte();

  it('findet über alle 73 Produktdateien Zellen zum Prüfen', () => {
    expect(werte.length).toBeGreaterThan(4000);
  });

  it('erzeugt in KEINER Sprache einen Wert mit zwei Trennzeichen', () => {
    // Der Schaden, den ein unvorsichtiger Ersatz anrichtet: aus `160-250x25`
    // oder `1 1/2 "` darf nie `160.250x25` werden.
    for (const sprache of ['de', 'en', 'fr', 'ar', 'fa', 'tr']) {
      for (const roh of werte) {
        const aus = formatCatalogNumber(roh, sprache);
        const trenner = (aus.match(/[.,]/g) ?? []).length;
        expect(trenner, `${roh} → ${aus} (${sprache})`).toBeLessThanOrEqual(1);
      }
    }
  });

  it('ändert an jedem Wert höchstens ein einziges Zeichen', () => {
    for (const roh of werte) {
      const aus = formatCatalogNumber(roh, 'en');
      expect(aus.length, roh).toBe(roh.trim().length);
      const abweichungen = [...roh.trim()].filter((z, i) => z !== aus[i]).length;
      expect(abweichungen, `${roh} → ${aus}`).toBeLessThanOrEqual(1);
    }
  });

  it('lässt auf der deutschen Seite jeden Wert exakt so, wie er im Katalog steht', () => {
    for (const roh of werte) expect(formatCatalogNumber(roh, 'de')).toBe(roh.trim());
  });
});
