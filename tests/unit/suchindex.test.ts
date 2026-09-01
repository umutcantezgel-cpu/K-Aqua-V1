import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { SEARCH_INDEX } from '@/lib/search-data';
import { GENERATED_PRODUCT_ENTRIES } from '@/lib/search-products.generated';

/*
 * Waechter fuer den Suchindex.
 *
 * Der Index fuehrte 36 Produkte -- bei 73 Produktdateien. Die Haelfte des
 * Sortiments war ueber die Suche nicht auffindbar, darunter alle 14 Werkzeuge
 * und alle drei Einschweisssaettel.
 *
 * Und 32 der 36 gepflegten Eintraege zeigten auf die KATEGORIESEITE statt auf
 * die Produktseite: Wer „PP-R Winkel 90°" suchte, landete auf der
 * Fitting-Uebersicht und musste dort weitersuchen.
 *
 * Beides faellt hier auf, sobald es wiederkommt.
 */

const PRODUKTE = SEARCH_INDEX.filter((e) => e.category === 'products');

function katalogDateien(): string[] {
  const wurzel = path.join(process.cwd(), 'content', 'products');
  const treffer: string[] = [];
  for (const kategorie of fs.readdirSync(wurzel)) {
    const ordner = path.join(wurzel, kategorie);
    if (!fs.statSync(ordner).isDirectory()) continue;
    for (const datei of fs.readdirSync(ordner)) {
      if (datei.endsWith('.md') && datei !== 'index.md') treffer.push(`${kategorie}/${datei}`);
    }
  }
  return treffer;
}

describe('Suchindex — Vollstaendigkeit', () => {
  it('kennt JEDES Produkt aus dem Katalog', () => {
    const imIndex = new Set(PRODUKTE.map((e) => e.href));
    const fehlend = GENERATED_PRODUCT_ENTRIES.filter((e) => !imIndex.has(e.href)).map((e) => e.href);
    expect(fehlend, `Nicht auffindbar: ${fehlend.join(', ')}`).toEqual([]);
  });

  it('fuehrt so viele Produkte, wie der Katalog Dateien hat', () => {
    expect(PRODUKTE.length).toBe(katalogDateien().length);
  });

  it('fuehrt kein Produkt doppelt', () => {
    const adressen = PRODUKTE.map((e) => e.href);
    const doppelt = adressen.filter((h, i) => adressen.indexOf(h) !== i);
    expect([...new Set(doppelt)], `Doppelt: ${doppelt.join(', ')}`).toEqual([]);
  });
});

describe('Suchindex — jeder Treffer fuehrt zum Produkt', () => {
  /* Der eigentliche Fehler, den dieser Waechter fernhaelt. */
  it('zeigt kein Produkt mehr auf eine blosse Kategorieseite', () => {
    const nurKategorie = PRODUKTE.filter((e) => /^\/produkte\/[^/]+$/.test(e.href));
    expect(
      nurKategorie.map((e) => `${e.title.de} -> ${e.href}`),
      'Diese Eintraege fuehren auf eine Liste statt auf das Produkt'
    ).toEqual([]);
  });

  it('verweist nur auf Adressen, zu denen es eine Produktdatei gibt', () => {
    const echte = new Set(GENERATED_PRODUCT_ENTRIES.map((e) => e.href));
    const phantome = PRODUKTE.filter((e) => !echte.has(e.href)).map((e) => e.href);
    expect(phantome, `Diese Adressen gibt es nicht: ${phantome.join(', ')}`).toEqual([]);
  });
});

describe('Suchindex — erzeugte Datei ist aktuell', () => {
  /* Dasselbe prueft `npm run search:check` in der CI. Hier noch einmal, damit
     es auch beim gewoehnlichen `npm test` auffaellt. */
  it('deckt sich in der Zahl mit dem Katalog', () => {
    expect(GENERATED_PRODUCT_ENTRIES.length).toBe(katalogDateien().length);
  });

  it('gibt jedem erzeugten Eintrag Titel in de, en und ar', () => {
    for (const e of GENERATED_PRODUCT_ENTRIES) {
      for (const sprache of ['de', 'en', 'ar'] as const) {
        expect(e.title[sprache], `${e.href}: Titel ${sprache}`).toBeTruthy();
      }
    }
  });

  it('gibt jedem erzeugten Eintrag eine Adresse unter /produkte/', () => {
    for (const e of GENERATED_PRODUCT_ENTRIES) {
      expect(e.href, e.id).toMatch(/^\/produkte\/[^/]+\/[^/]+$/);
    }
  });
});
