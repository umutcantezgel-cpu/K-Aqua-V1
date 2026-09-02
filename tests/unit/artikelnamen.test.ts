import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  articleName,
  resolveArticleCode,
  hasAnyArticleName,
  articleNamesFor,
  ARTICLE_NAMES,
  ARTICLE_CODE_ALIASES,
} from '@/lib/article-names';
import { ARTICLE_NAME_COUNT, ARTICLE_ALIAS_COUNT } from '@/lib/article-names.generated';
import { parseArticleTable } from '@/lib/bim/article-table';

/*
 * Waechter fuer die Artikelnamen des Herstellers.
 *
 * Der wichtigste Test dieser Datei ist der auf die 21 mehrdeutigen
 * Normalformen. Die Herstellerliste schreibt Artikelnummern mit einem
 * Werkstoffbuchstaben P, die Website nur bei Rohren -- dort aber
 * bedeutungstragend: AQ200P20 ist PP-R SDR 6, AQ20020 ist PP-RCT SDR 7,4,
 * zwei verschiedene Produkte mit verschiedenen Wandstaerken.
 *
 * Die Zuordnung darf sie unter keinen Umstaenden verschmelzen. Ein falscher
 * Artikelname auf einer Bestellung ist eine zurueckgehende Palette; ein
 * fehlender ist eine Luecke. Die Asymmetrie ist Absicht.
 */

// ── Bestand einlesen, wie der Generator es tut ─────────────────────────────

const PRODUKTE = path.join(process.cwd(), 'content', 'products');

interface Bestandsartikel {
  code: string;
  kategorie: string;
  slug: string;
}

function bestand(): Bestandsartikel[] {
  const raus: Bestandsartikel[] = [];
  for (const kategorie of fs.readdirSync(PRODUKTE)) {
    const ordner = path.join(PRODUKTE, kategorie);
    if (!fs.statSync(ordner).isDirectory()) continue;
    for (const datei of fs.readdirSync(ordner)) {
      if (!datei.endsWith('.md') || datei === 'index.md') continue;
      const { data, content } = matter(fs.readFileSync(path.join(ordner, datei), 'utf8'));
      const slug = String(data.slug ?? '').replace(/^.*\//, '') || path.basename(datei, '.md');
      for (const row of parseArticleTable(content)?.rows ?? []) {
        raus.push({ code: row.code, kategorie, slug });
      }
    }
  }
  return raus;
}

const BESTAND = bestand();
const CODES = new Set(BESTAND.map((a) => a.code));

function normalform(code: string): string {
  return code.trim().toUpperCase().replace(/\s+/g, '').replace(/P/g, '');
}

describe('Eindeutigkeit — die Rohrsicherung', () => {
  const gruppen = new Map<string, string[]>();
  for (const c of CODES) {
    const n = normalform(c);
    gruppen.set(n, [...(gruppen.get(n) ?? []), c]);
  }
  const mehrdeutig = [...gruppen.entries()].filter(([, v]) => v.length > 1);

  it('findet genau 21 mehrdeutige Normalformen mit 42 Nummern', () => {
    // Aendert sich diese Zahl, hat jemand Artikelnummern angefasst — dann
    // gehoert die Zuordnung neu angesehen, nicht die Zahl angepasst.
    expect(mehrdeutig.length).toBe(21);
    expect(mehrdeutig.reduce((s, [, v]) => s + v.length, 0)).toBe(42);
  });

  it('betrifft ausschliesslich Rohre', () => {
    const kat = new Map(BESTAND.map((a) => [a.code, a.kategorie]));
    for (const [, codes] of mehrdeutig) {
      for (const c of codes) expect(kat.get(c), c).toBe('pipes');
    }
  });

  /* DER TEST, DER DEN GANZEN ENTWURF RECHTFERTIGT. */
  it('gibt keiner mehrdeutigen Nummer einen Namen', () => {
    for (const [n, codes] of mehrdeutig) {
      for (const c of codes) {
        expect(ARTICLE_NAMES[c], `${c} (Normalform ${n})`).toBeUndefined();
        expect(articleName(c, 'de'), c).toBeNull();
      }
    }
  });

  it('loest eine mehrdeutige Nummer nicht auf, statt zu raten', () => {
    expect(resolveArticleCode('AQ200P20')).toBeNull();
    expect(resolveArticleCode('AQ20020')).toBeNull();
    expect(resolveArticleCode('AQ200PFUV20')).toBeNull();
  });

  /* Liefert der Hersteller eines Tages Rohre, bricht dieser Test und erzwingt
     eine bewusste Entscheidung statt einer stillen Verschmelzung. */
  it('gibt KEINEM Rohr einen Namen', () => {
    const rohre = BESTAND.filter((a) => a.kategorie === 'pipes').map((a) => a.code);
    expect(rohre.length).toBe(175);
    const benannt = rohre.filter((c) => ARTICLE_NAMES[c]);
    expect(benannt, `Diese Rohre haben plötzlich Namen: ${benannt.join(', ')}`).toEqual([]);
  });
});

describe('Zuordnung', () => {
  it('trifft 262 Nummern', () => {
    expect(ARTICLE_NAME_COUNT).toBe(262);
    expect(Object.keys(ARTICLE_NAMES).length).toBe(ARTICLE_NAME_COUNT);
  });

  it('zeigt nur auf Nummern, die es im Bestand wirklich gibt', () => {
    for (const c of Object.keys(ARTICLE_NAMES)) expect(CODES.has(c), c).toBe(true);
  });

  it('versteht die Herstellerschreibweise mit P', () => {
    expect(resolveArticleCode('AQ045P110')).toBe('AQ045110');
    expect(resolveArticleCode('AQ041P20')).toBe('AQ04120');
    // Auch wenn das P hinter dem Gewinde-G steht.
    expect(resolveArticleCode('AQ090GP2012')).toBe('AQ090G2012');
  });

  it('loest Farbvarianten auf ihren Grundartikel auf', () => {
    expect(resolveArticleCode('CU041P20')).toBe('AQ04120');
    expect(resolveArticleCode('BL041P20')).toBe('AQ04120');
  });

  it('fuehrt 720 Aliasse, alle auf echte Nummern', () => {
    expect(ARTICLE_ALIAS_COUNT).toBe(720);
    for (const [alias, ziel] of Object.entries(ARTICLE_CODE_ALIASES)) {
      expect(CODES.has(ziel), `${alias} -> ${ziel}`).toBe(true);
      // Kein Alias darf selbst eine Website-Nummer verdecken.
      expect(CODES.has(alias), `Alias ${alias} ist selbst eine Bestandsnummer`).toBe(false);
    }
  });

  /* BH045P20 traegt ein unbekanntes Kuerzel und kein Farbwort. Bis der
     Hersteller erklaert, was BH ist, bekommt es keinen Alias. */
  it('legt fuer das unbekannte Kuerzel BH keinen Alias an', () => {
    expect(ARTICLE_CODE_ALIASES['BH045P20']).toBeUndefined();
  });
});

describe('Textqualität', () => {
  const werte = Object.values(ARTICLE_NAMES);

  it('hat ueberall Deutsch und Englisch', () => {
    for (const r of werte) {
      expect(r.de.trim().length).toBeGreaterThan(0);
      expect(r.en.trim().length).toBeGreaterThan(0);
    }
  });

  /* Kein Eintrag ohne Franzoesisch.
   *
   * Es war einer: AQ045125, dessen franzoesische Zelle eine FREMDE Massangabe
   * trug ("Coude 45° d20 mm d125 mm") und deshalb verworfen wurde. Die Zelle
   * ist inzwischen in content/artikelnamen/korrekturen.tsv richtiggestellt —
   * nicht in der Quelle, denn dort brächte die naechste Lieferung den Fehler
   * still zurueck.
   *
   * Die leere Liste ist kein Selbstzweck: Sie faellt auf, sobald eine neue
   * Lieferung eine franzoesische Zelle beschaedigt. */
  it('hat keinen Eintrag ohne Franzoesisch', () => {
    const ohne = Object.entries(ARTICLE_NAMES).filter(([, r]) => !r.fr).map(([c]) => c);
    expect(ohne).toEqual([]);
  });

  it('enthaelt keinen Namen ohne Buchstaben', () => {
    for (const r of werte) {
      for (const s of [r.de, r.en, r.fr ?? 'x']) {
        expect(/[^\W\d_]/u.test(s), JSON.stringify(s)).toBe(true);
      }
    }
  });

  /* React entschaerft JSX, aber Suchindex, CSV- und IFC-Ausgabe nicht. */
  it('enthaelt keine Zeichen, die eine Ausgabe zerlegen', () => {
    for (const r of werte) {
      for (const s of [r.de, r.en, r.fr ?? '']) {
        expect(s).not.toMatch(/[\t\r\n<>&`]/);
        expect(s).not.toContain('${');
      }
    }
  });

  /* 326 Zeilen der Quelle tragen ein doppeltes Anfuehrungszeichen. Es muss den
     Rundlauf TSV -> erzeugte TS -> Import unveraendert ueberstehen. */
  it('ueberliefert Anfuehrungszeichen unveraendert', () => {
    const mitAnfuehrung = werte.filter((r) => r.de.includes('"'));
    expect(mitAnfuehrung.length).toBeGreaterThan(50);
    const probe = Object.entries(ARTICLE_NAMES).find(([, r]) => r.de.includes('1/2"'));
    expect(probe).toBeDefined();
  });

  it('traegt keine ueberzaehligen Leerzeichen', () => {
    for (const r of werte) {
      for (const s of [r.de, r.en, r.fr ?? '']) {
        expect(s).not.toMatch(/\s{2,}/);
        expect(s).toBe(s.trim());
      }
    }
  });
});

describe('Sprachkette', () => {
  const c = 'AQ04520';

  it('gibt jeder Sprache das Richtige', () => {
    expect(articleName(c, 'de')).toBe('Winkel 45° d20 mm');
    expect(articleName(c, 'en')).toBe('Elbow 45° d20 mm');
    expect(articleName(c, 'fr')).toBe('Coude 45° d20 mm');
  });

  /* Die Zeile, die es sonst nirgends gibt: fr-SN erbt in
     lib/i18n/request.ts:24-32 NICHT von fr. Ohne die Basissprachaufloesung
     hier bekaemen 16 westafrikanische Maerkte Englisch. */
  it('gibt fr-SN Franzoesisch', () => {
    expect(articleName(c, 'fr-SN')).toBe('Coude 45° d20 mm');
  });

  /* Die Regel des Auftraggebers: im Zweifel Englisch, nicht Deutsch. */
  it('gibt jeder anderen Sprache Englisch', () => {
    for (const l of ['ja', 'ar', 'pl', 'tr', 'zh-Hans', 'es-419']) {
      expect(articleName(c, l), l).toBe('Elbow 45° d20 mm');
    }
  });

  /* Der Rueckfall auf Englisch, wo Franzoesisch fehlt.
   *
   * Heute greift er an keiner einzigen Nummer — seit der Korrektur von
   * AQ045125 traegt jeder Eintrag Franzoesisch. Ein Test an einem einzelnen
   * Beispiel waere damit ins Leere gelaufen und haette geloescht werden
   * muessen. Geprueft wird deshalb die REGEL ueber den ganzen Bestand: Sie
   * gilt auch dann noch, wenn morgen wieder eine Zelle fehlt, und sie faengt
   * den Tag, an dem jemand die `record.fr`-Bedingung in `ausRecord` entfernt
   * — dann kaeme dort `undefined` heraus statt des englischen Namens. */
  it('gibt fuer Franzoesisch immer fr, sonst en — ueber den ganzen Bestand', () => {
    for (const [code, r] of Object.entries(ARTICLE_NAMES)) {
      expect(articleName(code, 'fr'), code).toBe(r.fr ?? r.en);
      expect(articleName(code, 'fr-SN'), code).toBe(r.fr ?? r.en);
    }
  });

  it('gibt null fuer eine unbekannte Nummer', () => {
    expect(articleName('GIBTSNICHT', 'de')).toBeNull();
    expect(articleName('AQ97040', 'de')).toBeNull(); // Werkzeug, nicht in der Liste
  });
});

describe('Die Entscheidung über die Spalte', () => {
  /* Die Abdeckung ist praktisch alles-oder-nichts. Genau deshalb erscheint die
     Spalte je Produkt und nicht global: 39 Seiten saehen sonst eine Spalte aus
     lauter Gedankenstrichen. */
  it('teilt die Produkte in 31 voll, 39 leer, 3 teilweise', () => {
    const jeSlug = new Map<string, string[]>();
    for (const a of BESTAND) jeSlug.set(a.slug, [...(jeSlug.get(a.slug) ?? []), a.code]);

    let voll = 0;
    let leer = 0;
    let teils = 0;
    for (const codes of jeSlug.values()) {
      const mit = codes.filter((c) => ARTICLE_NAMES[c]).length;
      if (mit === 0) leer++;
      else if (mit === codes.length) voll++;
      else teils++;
    }
    expect({ voll, leer, teils }).toEqual({ voll: 31, leer: 39, teils: 3 });
  });

  it('zeigt die Spalte bei Fittings, nicht bei Rohren', () => {
    const fittings = BESTAND.filter((a) => a.slug === 'elbow-45').map((a) => a.code);
    const rohre = BESTAND.filter((a) => a.slug === 'k-pipe-pp-r-sdr-11').map((a) => a.code);
    expect(hasAnyArticleName(fittings)).toBe(true);
    expect(hasAnyArticleName(rohre)).toBe(false);
  });

  it('liefert die Namen fertig je Nummer', () => {
    const namen = articleNamesFor(['AQ04520', 'AQ04525', 'GIBTSNICHT'], 'de');
    expect(namen['AQ04520']).toBe('Winkel 45° d20 mm');
    expect(namen['GIBTSNICHT']).toBeUndefined();
  });
});
