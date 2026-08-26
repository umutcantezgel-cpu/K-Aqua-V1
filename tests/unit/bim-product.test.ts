/* Pruefung der BIM-Datensatzschicht.
 *
 * Diese Schicht verbindet vier Quellen zu je einem Datensatz pro
 * Artikelnummer. Geprueft wird nicht, ob die Quellen stimmen — das leisten
 * bim-tables und bim-article-table —, sondern ob die Verbindung haelt:
 * Faellt eine Zuordnung aus, steht in der IFC-Datei ein Bauteil ohne
 * Werkstoff, ohne Norm oder mit der Verbindungsart einer anderen Groesse.
 */

import { describe, it, expect } from 'vitest';
import {
  getBimRecord,
  getAllBimRecords,
  getBimComponentRecords,
  getBimRecordsForProduct,
  allArticleCodes,
  allProductSlugs,
  productSlugForArticle,
  articleCodesForProduct,
  isFiberPipe,
  CATALOG_EDITION,
} from '@/lib/bim/product';
import { EXPANSION_COEFFICIENT_PER_K } from '@/lib/bim/tables/expansion';
import { CATALOG_ISSUES, issuesForArticle } from '@/lib/bim/known-issues';

const ALL = getAllBimRecords();

describe('Umfang des Bestands', () => {
  it('fuehrt 73 Produkte', () => {
    expect(allProductSlugs()).toHaveLength(73);
  });

  it('loest 580 Tabellenzeilen zu 546 eindeutigen Artikelnummern auf', () => {
    // 34 Nummern stehen auf zwei Seiten — den beiden Resten des
    // Zusammenlegens. Der Datensatz fuehrt jede Nummer genau einmal.
    expect(ALL).toHaveLength(546);
    expect(allArticleCodes()).toHaveLength(546);
  });

  it('trennt Bauteile von Werkzeugen', () => {
    const werkzeuge = ALL.filter((r) => r.isTool);
    expect(werkzeuge).toHaveLength(37);
    expect(getBimComponentRecords()).toHaveLength(509);
    // Kein Werkzeug darf in die IFC-Ausgabe geraten.
    expect(getBimComponentRecords().some((r) => r.isTool)).toBe(false);
  });

  it('ordnet jede doppelt vergebene Nummer der Hauptseite zu, nie der Dublettenseite', () => {
    expect(productSlugForArticle('AQ090250')).toBe('elbow-90');
    expect(productSlugForArticle('AQ13011063')).toBe('reducing-tee');
    for (const code of allArticleCodes()) {
      const slug = productSlugForArticle(code);
      expect(slug).not.toBe('elbow-90-large-sizes');
      expect(slug).not.toBe('reducing-tee-large-sizes');
    }
  });

  it('gibt zu jeder Artikelnummer einen Datensatz und zu keiner erfundenen', () => {
    for (const code of allArticleCodes()) {
      expect(getBimRecord(code)).not.toBeNull();
    }
    expect(getBimRecord('AQ000000')).toBeNull();
    expect(getBimRecord('')).toBeNull();
  });
});

describe('Belegpflicht', () => {
  it('nennt zu jedem Datensatz eine Katalogseite', () => {
    // Ohne Fundstelle laesst sich eine Zahl nicht nachpruefen. Jede Angabe,
    // die in ein Gebaeudemodell wandert, muss rueckverfolgbar sein.
    const ohne = ALL.filter((r) => !/S\.\s*\d+/.test(r.source)).map((r) => r.articleCode);
    expect(ohne).toEqual([]);
  });

  it('nennt zu jedem Datensatz die Katalogausgabe', () => {
    for (const r of ALL) {
      expect(r.catalogEdition).toBe(CATALOG_EDITION);
      expect(r.source).toContain('KA-Katalog_GB_06-2025');
    }
  });

  it('gibt jedem Datensatz mindestens eine Norm', () => {
    for (const r of ALL) {
      expect(r.standards.length).toBeGreaterThan(0);
    }
  });

  it('nennt in keiner Normenliste eine Norm doppelt', () => {
    for (const r of ALL) {
      expect(new Set(r.standards).size).toBe(r.standards.length);
    }
  });
});

describe('Rohre — der vollstaendigste Datensatz', () => {
  const rohre = ALL.filter((r) => r.category === 'pipes');

  it('fuehrt 175 Rohrartikel', () => {
    expect(rohre).toHaveLength(175);
  });

  it('gibt jedem Rohr Aussen- und Innendurchmesser, Wandstaerke und SDR', () => {
    for (const r of rohre) {
      expect(r.outerDiameterMm).toBeGreaterThan(0);
      expect(r.innerDiameterMm).toBeGreaterThan(0);
      expect(r.wallThicknessMm).toBeGreaterThan(0);
      expect(r.sdr).toBeGreaterThan(0);
    }
  });

  it('haelt d, di und s widerspruchsfrei — ausser an den registrierten Katalogstellen', () => {
    // Die schaerfste Pruefung des ganzen Bestands: sie faellt bei jedem
    // Zahlendreher in einer der drei Spalten. Der Katalog fuehrt `s min.`,
    // also die Mindestwandstaerke — deshalb eine Toleranz von 0,3 mm.
    //
    // Es darf keine unbenannte Abweichung geben. Taucht eine neue auf, muss
    // sie geprueft und in lib/bim/known-issues.ts eingetragen werden.
    const gefunden: string[] = [];
    for (const r of rohre) {
      const gerechnet = r.innerDiameterMm! + 2 * r.wallThicknessMm!;
      if (Math.abs(gerechnet - r.outerDiameterMm!) > 0.3) gefunden.push(r.articleCode);
    }
    const registriert = CATALOG_ISSUES.filter((i) => i.field === 'Di (mm)').map(
      (i) => i.articleCode,
    );
    expect(gefunden.sort()).toEqual(registriert.sort());
  });

  it('bestaetigt den Wasserinhalt aus dem Innendurchmesser — ausser an den registrierten Stellen', () => {
    // Wasserinhalt je Meter = π/4 · di² · 1 m. Eine unabhaengige Gegenprobe
    // zweier Katalogspalten gegeneinander. Sie trifft im ganzen Bestand auf
    // unter einem Prozent genau — bis auf die eine Zeile, in der schon der
    // Innendurchmesser nicht stimmt.
    const gefunden: string[] = [];
    for (const r of rohre) {
      const gerechnetLitre = (Math.PI / 4) * (r.innerDiameterMm! / 1000) ** 2 * 1000;
      const abweichung =
        Math.abs(gerechnetLitre - r.waterCapacityLitrePerMetre!) /
        r.waterCapacityLitrePerMetre!;
      if (abweichung > 0.03) gefunden.push(r.articleCode);
    }
    const registriert = CATALOG_ISSUES.filter(
      (i) => i.field === 'Water capacity (l/m)',
    ).map((i) => i.articleCode);
    expect(gefunden.sort()).toEqual(registriert.sort());
  });

  it('bestaetigt die SDR-Stufe aus d und s — und erkennt die abweichenden Nennweiten', () => {
    // SDR ist definitionsgemaess d/s. Weicht der ausgewiesene Wert stark ab,
    // ist entweder die Wandstaerke falsch gelesen — oder die Nennweite ist
    // laut Katalog in einer anderen Reihe gefertigt als das Produkt im Namen
    // fuehrt. Genau diese Faelle traegt `deviatingSeries`.
    const unerklaert: string[] = [];
    for (const r of rohre) {
      const gerechnet = r.outerDiameterMm! / r.wallThicknessMm!;
      const abweichung = Math.abs(gerechnet - r.sdr!) / r.sdr!;
      if (abweichung > 0.12 && !r.deviatingSeries) unerklaert.push(r.articleCode);
    }
    expect(unerklaert).toEqual([]);
  });

  it('belegt jede Reihenabweichung mit d/s statt mit der nominalen Reihe', () => {
    // Vier Artikel: d20 und d25 zweier SDR-11-Faserverbundrohre. Der Katalog
    // vermerkt „SDR 7,4 - S 3,2" — und 20/2,8 = 7,14 sowie 25/3,5 = 7,14
    // bestaetigen das aus den Maßen heraus.
    const abweichend = rohre.filter((r) => r.deviatingSeries);
    expect(abweichend).toHaveLength(4);
    for (const r of abweichend) {
      expect(r.deviatingSeries).toMatch(/SDR\s*7[.,]4/);
      const gerechnet = r.outerDiameterMm! / r.wallThicknessMm!;
      expect(gerechnet).toBeGreaterThan(6.9);
      expect(gerechnet).toBeLessThan(7.6);
      // Und die nominale Reihe des Produkts ist wirklich eine andere.
      expect(r.sdr).toBe(11);
    }
  });

  it('gibt jedem Rohr Gewicht je Meter, Wasserinhalt und Stangenlaenge', () => {
    for (const r of rohre) {
      expect(r.massPerMetreKg).toBeGreaterThan(0);
      expect(r.waterCapacityLitrePerMetre).toBeGreaterThan(0);
      expect(r.stockLengthM).toBeGreaterThan(0);
    }
  });

  it('gibt jedem Rohr Halterungsabstaende, sonst keinem Bauteil', () => {
    // Der Katalog fuehrt Halterungsabstaende nur fuer Rohre.
    const mitAbstand = ALL.filter((r) => r.supportSpacingCm.length > 0);
    expect(mitAbstand.every((r) => r.category === 'pipes')).toBe(true);
    expect(mitAbstand.length).toBeGreaterThan(140);
  });

  it('laesst Halterungsabstaende mit steigender Temperatur nie wachsen', () => {
    for (const r of ALL) {
      for (let i = 1; i < r.supportSpacingCm.length; i++) {
        expect(r.supportSpacingCm[i]!.spacingCm).toBeLessThanOrEqual(
          r.supportSpacingCm[i - 1]!.spacingCm,
        );
      }
    }
  });

  it('gibt K-Fiber-Rohren den kleineren Ausdehnungskoeffizienten', () => {
    for (const r of rohre) {
      const erwartet = isFiberPipe(r.productSlug)
        ? EXPANSION_COEFFICIENT_PER_K.fiber
        : EXPANSION_COEFFICIENT_PER_K.monolayer;
      expect(r.expansionCoefficientPerK).toBe(erwartet);
    }
    // Und es gibt tatsaechlich beide Bauarten im Bestand.
    const fiber = rohre.filter((r) => isFiberPipe(r.productSlug));
    expect(fiber.length).toBeGreaterThan(0);
    expect(fiber.length).toBeLessThan(rohre.length);
  });
});

describe('Verbindungsart je Groesse, nicht je Produkt', () => {
  it('unterscheidet beim selben Winkel gemufft von stumpfgeschweisst', () => {
    // Derselbe Artikel in zwei Nennweiten, zwei Verbindungsarten. Wer das
    // je Produkt statt je Groesse entscheidet, gibt der Haelfte den falschen
    // Anschluss — und damit die falschen IFC-Anschlusspunkte.
    expect(getBimRecord('AQ09020')!.jointType).toBe('socket-fusion');
    expect(getBimRecord('AQ09020')!.section).toBeNull();
    expect(getBimRecord('AQ090250')!.jointType).toBe('butt-fusion');
    expect(getBimRecord('AQ090250')!.section).toBe('SDR 11*');
  });

  it('macht jede Zeile im SDR-11-Abschnitt zur Stumpfschweissung', () => {
    for (const r of ALL) {
      if (r.section && /SDR\s*11/i.test(r.section)) {
        expect(r.jointType).toBe('butt-fusion');
      }
    }
  });

  it('gibt Uebergangsstuecken ein Gewinde', () => {
    const uebergang = ALL.filter((r) => r.category === 'transition-fittings');
    expect(uebergang.length).toBeGreaterThan(0);
    for (const r of uebergang) {
      expect(['threaded', 'flanged', 'butt-fusion']).toContain(r.jointType);
    }
  });

  it('gibt Werkzeugen keine Verbindungsart', () => {
    for (const r of ALL.filter((x) => x.isTool)) {
      expect(r.jointType).toBe('none');
    }
  });
});

describe('Was der Katalog nicht fuehrt, wird nicht erfunden', () => {
  it('laesst die Druckstufe bei Formstuecken leer', () => {
    // Die Formstueckseiten S. 84–92 nennen keine Druckstufe. Nach
    // DIN EN ISO 15874 folgt das Formstueck der Anwendungsklasse des Systems.
    const winkel = getBimRecord('AQ09063')!;
    expect(winkel.category).toBe('fittings');
    expect(winkel.pressure).toBeNull();
  });

  it('fuellt die Druckstufe bei jedem Rohr', () => {
    for (const r of ALL.filter((x) => x.category === 'pipes')) {
      expect(r.pressure).toBeTruthy();
      expect(r.pressure).toMatch(/MPa/);
    }
  });

  it('laesst nicht gefuehrte Maße als null stehen, nie als null Millimeter', () => {
    // Beim Winkel d63 fuehrt der Katalog kein `s`; ein 0 stuende fuer eine
    // Wandstaerke von null und waere schlicht falsch.
    const winkel = getBimRecord('AQ09063')!;
    expect(winkel.wallThicknessMm).toBeNull();
    expect(winkel.dimensions.find((d) => d.key === 's')).toBeUndefined();
  });

  it('nimmt in die Maßliste nur gefuellte Spalten auf', () => {
    for (const r of ALL) {
      for (const d of r.dimensions) {
        expect(d.value).not.toBeNull();
      }
    }
  });
});

describe('Registrierte Katalogwidersprueche', () => {
  it('reicht jeden Eintrag an den Datensatz durch', () => {
    for (const issue of CATALOG_ISSUES) {
      const r = getBimRecord(issue.articleCode);
      expect(r, `Artikel ${issue.articleCode} aus known-issues fehlt im Bestand`).not.toBeNull();
      expect(r!.issues.map((i) => i.field)).toContain(issue.field);
    }
  });

  it('laesst die gedruckten Werte unveraendert stehen', () => {
    // Der Katalog bleibt maßgeblich. Der Datensatz traegt den Widerspruch als
    // Hinweis, nicht als stillschweigende Korrektur — sonst faende ein Planer
    // im Datenblatt eine andere Zahl als in der IFC-Datei.
    const r = getBimRecord('AQ207PF315')!;
    expect(r.innerDiameterMm).toBe(229.8);
    expect(r.waterCapacityLitrePerMetre).toBe(39.39);
    expect(r.issues).toHaveLength(2);
  });

  it('begruendet jeden Eintrag und nennt die Fundstelle', () => {
    for (const issue of CATALOG_ISSUES) {
      expect(issue.source).toMatch(/S\.\s*\d+/);
      expect(issue.source).toContain('visuell geprüft');
      // Jede Beanstandung muss nachrechenbar begruendet sein, nicht bloss
      // behauptet — sonst ist sie fuer den Hersteller nicht pruefbar.
      expect(issue.explanationDe.length).toBeGreaterThan(120);
      expect(issue.printed).not.toBe(issue.consistent);
    }
  });

  it('laesst den ganz ueberwiegenden Bestand unbeanstandet', () => {
    // Drei Artikel von 546 — und alle drei sind die d315-Zeile eines Rohres.
    const betroffen = ALL.filter((r) => r.issues.length > 0);
    expect(betroffen).toHaveLength(3);
    expect(betroffen.every((r) => r.outerDiameterMm === 315)).toBe(true);
    expect(issuesForArticle('AQ09063')).toEqual([]);
  });

  it('deckt den durchgehenden Satzfehler beim Wasserinhalt auf', () => {
    // Drei Rohre mit drei verschiedenen Innendurchmessern drucken denselben
    // Wasserinhalt. Hoechstens einer koennte stimmen; keiner tut es.
    const d315 = ALL.filter((r) => r.outerDiameterMm === 315 && r.category === 'pipes');
    const mitFehler = d315.filter((r) =>
      r.issues.some((i) => i.field === 'Water capacity (l/m)'),
    );
    expect(mitFehler).toHaveLength(3);
    expect(new Set(mitFehler.map((r) => r.waterCapacityLitrePerMetre))).toEqual(
      new Set([39.39]),
    );
    // … bei drei verschiedenen Innendurchmessern.
    expect(new Set(mitFehler.map((r) => r.innerDiameterMm)).size).toBeGreaterThan(1);
  });
});

describe('Produktbezogener Zugriff', () => {
  it('liefert alle Groessen eines Produkts in gedruckter Reihenfolge', () => {
    const codes = articleCodesForProduct('elbow-90');
    expect(codes[0]).toBe('AQ09020');
    expect(codes).toHaveLength(14);
    const records = getBimRecordsForProduct('elbow-90');
    expect(records.map((r) => r.articleCode)).toEqual(codes);
  });

  it('staffelt die Nennweiten eines Produkts aufsteigend', () => {
    for (const slug of allProductSlugs()) {
      const durchmesser = getBimRecordsForProduct(slug)
        .map((r) => r.outerDiameterMm)
        .filter((d): d is number => d !== null);
      const sortiert = [...durchmesser].sort((a, b) => a - b);
      expect(durchmesser).toEqual(sortiert);
    }
  });

  it('gibt zu einem unbekannten Produkt eine leere Liste', () => {
    expect(getBimRecordsForProduct('gibt-es-nicht')).toEqual([]);
    expect(articleCodesForProduct('gibt-es-nicht')).toEqual([]);
  });
});
