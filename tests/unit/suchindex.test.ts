import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { SEARCH_INDEX } from '@/lib/search-data';
import { GENERATED_PRODUCT_ENTRIES } from '@/lib/search-products.generated';
import { ARTICLE_CODE_ALIASES } from '@/lib/article-names.generated';
import { searchKAqua } from '@/lib/search-engine';

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

/*
 * Herstellerschreibweisen im Index.
 *
 * Der Druckkatalog fuehrt die Nummern mit dem Werkstoffbuchstaben —
 * `AQ045P110`. Die Website fuehrt sie ohne — `AQ045110`. Wer aus dem Katalog
 * abtippt, fand bisher nichts.
 *
 * Geloest wurde das im INDEX, nicht in der Maschine. Eine P-Toleranz in
 * `stripAlphanumeric()` haette fuer JEDE Achse gegolten — Titel, Schlagwoerter,
 * Spezifikationen — und `AQ200P20` und `AQ20020` haetten identische Punkte
 * bekommen. Genau die Verschmelzung, die es zu verhindern gilt.
 */
describe('Suchindex — Herstellerschreibweisen und Farbvarianten', () => {
  const nachAdresse = new Map(PRODUKTE.map((e) => [e.href, e]));
  const nummern = (href: string) => nachAdresse.get(href)?.articleCodes ?? [];

  it('führt die P-Schreibweise neben der Website-Nummer', () => {
    const winkel = nummern('/produkte/fittings/elbow-45');
    expect(winkel).toContain('AQ045110');
    expect(winkel).toContain('AQ045P110');
  });

  it('führt die Farbvarianten auf dasselbe Produkt', () => {
    const winkel = nummern('/produkte/fittings/elbow-45');
    for (const variante of ['CU045P20', 'BL045P20', 'MO045P20']) {
      expect(winkel, variante).toContain(variante);
    }
  });

  /*
   * DER TEST, DER DEN GANZEN ENTWURF RECHTFERTIGT.
   *
   * `AQ200P20` ist das PP-R-Rohr SDR 6, `AQ20020` das PP-RCT-Rohr SDR 7,4 —
   * zwei verschiedene Werkstoffe, zwei verschiedene Wandstaerken, zwei
   * verschiedene Produktseiten. Ohne den Eindeutigkeitszwang in
   * `sync-article-names.ts` haette die tolerante Zuordnung sie zusammengelegt,
   * und ein Einkaeufer haette das falsche Rohr bestellt.
   *
   * Im Bestand gibt es 21 solcher Gruppen mit 42 Nummern, ausnahmslos Rohre.
   */
  it('legt AQ200P20 und AQ20020 NICHT zusammen — verschiedene Rohre', () => {
    const ppr = nummern('/produkte/pipes/k-pipe-pp-r-sdr-6');
    const pprct = nummern('/produkte/pipes/k-pipe-pp-rct-sdr-74');

    expect(ppr).toContain('AQ200P20');
    expect(ppr).not.toContain('AQ20020');

    expect(pprct).toContain('AQ20020');
    expect(pprct).not.toContain('AQ200P20');
  });

  /*
   * Nachgemessen, bevor dieser Test seine Form fand: 163 Artikelnummern lagen
   * SCHON VORHER auf je zwei Produktseiten — `AQ200PFUV20` etwa auf dem
   * K-Fiber-UV-Rohr PP-R und auf dem PP-RCT, `AQ79090` auf dem Losflansch und
   * auf dem Bundbund. Das steht so in der Frontmatter der Produktdateien und
   * ist ein Mangel des Katalogs, nicht der Suche.
   *
   * Zu verlangen, dass gar keine Nummer doppelt liegt, hiesse einen Test
   * schreiben, der von Anfang an rot ist. Verlangt wird deshalb das, was diese
   * Arbeit tatsaechlich zusichern kann: Eine Aliasnummer darf keine
   * Doppelbelegung erzeugen, die es ohne sie nicht gaebe. Gemessen: 62
   * Aliasnummern liegen doppelt, alle 62 erben es von ihrer Zielnummer, null
   * sind neu.
   */
  it('erzeugt durch die Aliasse KEINE neue Doppelbelegung', () => {
    const besitzer = new Map<string, Set<string>>();
    for (const e of PRODUKTE) {
      for (const c of e.articleCodes ?? []) {
        if (!besitzer.has(c)) besitzer.set(c, new Set());
        besitzer.get(c)!.add(e.href);
      }
    }
    const doppelt = new Map(
      [...besitzer].filter(([, hrefs]) => hrefs.size > 1).map(([c, h]) => [c, [...h]])
    );

    const selbstVerschuldet: string[] = [];
    for (const [code, hrefs] of doppelt) {
      const ziel = ARTICLE_CODE_ALIASES[code];
      if (!ziel) continue; // keine Aliasnummer — die Doppelung stand vorher da
      if ((doppelt.get(ziel) ?? []).length > 1) continue; // von der Zielnummer geerbt
      selbstVerschuldet.push(`${code} -> ${ziel}: ${hrefs.join(' + ')}`);
    }
    expect(selbstVerschuldet).toEqual([]);
  });

  it('nagelt die vorbestehenden Doppelbelegungen der Frontmatter fest', () => {
    // Damit sie nicht still weiterwachsen. Sinkt die Zahl, hat jemand den
    // Katalog aufgeraeumt und darf sie hier senken.
    const ohneAlias = new Map<string, Set<string>>();
    for (const e of PRODUKTE) {
      for (const c of e.articleCodes ?? []) {
        if (ARTICLE_CODE_ALIASES[c]) continue;
        if (!ohneAlias.has(c)) ohneAlias.set(c, new Set());
        ohneAlias.get(c)!.add(e.href);
      }
    }
    const doppelt = [...ohneAlias].filter(([, h]) => h.size > 1);
    expect(doppelt.length).toBe(163);
  });

  /*
   * Ohne die Zusammenfuehrung in `lib/search-data.ts` blieb die halbe Arbeit
   * wirkungslos: Wo ein gepflegter Eintrag dieselbe Adresse bedient, entfiel
   * der erzeugte ganz — und das trifft ausgerechnet die 36 gepflegten
   * Produkte, darunter alle Rohre.
   */
  it('ergänzt auch die von Hand gepflegten Einträge', () => {
    const gepflegteAdressen = GENERATED_PRODUCT_ENTRIES.map((e) => e.href).filter((href) => {
      const imIndex = nachAdresse.get(href);
      const erzeugt = GENERATED_PRODUCT_ENTRIES.find((e) => e.href === href);
      return imIndex && erzeugt && imIndex.id !== erzeugt.id;
    });
    expect(gepflegteAdressen.length).toBeGreaterThan(0);

    for (const href of gepflegteAdressen) {
      const erzeugt = GENERATED_PRODUCT_ENTRIES.find((e) => e.href === href)!;
      const imIndex = nachAdresse.get(href)!;
      for (const c of erzeugt.articleCodes ?? []) {
        expect(imIndex.articleCodes ?? [], `${href} · ${c}`).toContain(c);
      }
    }
  });

  it('lässt Titel und Beschreibung der gepflegten Einträge unangetastet', () => {
    const gepflegt = PRODUKTE.filter((e) => !e.id.startsWith('gen_'));
    expect(gepflegt.length).toBeGreaterThan(0);
    for (const e of gepflegt) {
      const erzeugt = GENERATED_PRODUCT_ENTRIES.find((g) => g.href === e.href);
      if (!erzeugt) continue;
      expect(e.title, e.href).not.toEqual(erzeugt.title);
    }
  });

  /*
   * Artikelnamen als Schlagwoerter. „T-Stück" ist, was ein Einkaeufer tippt —
   * nicht „PP-R Reducing Tee". Ohne Nennweite: die volle Liste waeren 886
   * Beinahe-Dubletten, die Staemme sind 296.
   */
  it('führt die Artikelnamen des Herstellers als Schlagwörter', () => {
    const tstueck = nachAdresse.get('/produkte/fittings/reducing-tee')?.keywords ?? [];
    expect(tstueck.some((k) => k.includes('t-stück'))).toBe(true);
    expect(tstueck.some((k) => k.includes('té'))).toBe(true);

    const winkel = nachAdresse.get('/produkte/fittings/elbow-45')?.keywords ?? [];
    expect(winkel).toContain('winkel 45°');
    expect(winkel).toContain('coude 45°');
  });

  it('lässt keine Nennweite in die Namensschlagwörter durch', () => {
    // Die Nennweite steht im Titel, in den Spezifikationen und in jeder
    // Artikelnummer. Im Schlagwort waere sie 590 Beinahe-Dubletten.
    const verdaechtig = PRODUKTE.flatMap((e) =>
      (e.keywords ?? []).filter((k) => /\sd\s?\d+\s*mm/i.test(k)).map((k) => `${e.href}: ${k}`)
    );
    expect(verdaechtig).toEqual([]);
  });
});

/*
 * Der Beweis am Ende der Kette: nicht was im Index steht, sondern was die
 * Suchmaschine daraus macht.
 *
 * `lib/search-engine.ts` ist dafür NICHT angefasst worden. Die
 * Artikelnummernachse (:210) vergleicht bereits exakt; stehen beide
 * Schreibweisen im Index, trifft `AQ045P110` mit 250 Punkten ohne eine Zeile
 * Engine. Eine P-Toleranz in `stripAlphanumeric()` einzubauen wäre der Fehler
 * gewesen: Sie gälte für jede Achse, und `AQ200P20` und `AQ20020` bekämen
 * identische Punktzahlen.
 */
describe('Suche — die Herstellernummer führt zum richtigen Produkt', () => {
  const ersterTreffer = (q: string) =>
    searchKAqua({ query: q, locale: 'de', maxResults: 5 })[0];

  it('AQ045P110 aus dem Druckkatalog führt zum Winkel 45°', () => {
    const t = ersterTreffer('AQ045P110');
    expect(t?.entry.href).toBe('/produkte/fittings/elbow-45');
    expect(t?.matchedField).toBe('articleCodes');
  });

  it('die Website-Schreibweise führt zum selben Produkt', () => {
    expect(ersterTreffer('AQ045110')?.entry.href).toBe('/produkte/fittings/elbow-45');
  });

  it('die Farbvariante CU045P20 führt zum Grundprodukt', () => {
    expect(ersterTreffer('CU045P20')?.entry.href).toBe('/produkte/fittings/elbow-45');
  });

  it('AQ200P20 führt zum PP-R-Rohr, NICHT zum PP-RCT-Rohr', () => {
    const t = ersterTreffer('AQ200P20');
    expect(t?.entry.href).toBe('/produkte/pipes/k-pipe-pp-r-sdr-6');
    expect(t?.matchedField).toBe('articleCodes');
  });

  it('AQ20020 führt zum PP-RCT-Rohr, NICHT zum PP-R-Rohr', () => {
    const t = ersterTreffer('AQ20020');
    expect(t?.entry.href).toBe('/produkte/pipes/k-pipe-pp-rct-sdr-74');
    expect(t?.matchedField).toBe('articleCodes');
  });

  it('der Artikelname des Herstellers findet das Produkt', () => {
    const treffer = searchKAqua({ query: 'T-Stück', locale: 'de', maxResults: 10 });
    expect(treffer.some((t) => t.entry.href.includes('/tee'))).toBe(true);
  });
});
