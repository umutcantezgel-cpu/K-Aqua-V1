// Prüft die Ausschreibungstexte.
//
// Auf /ressourcen/ausschreibungstexte stand Marketingprosa über
// Ausschreibungstexte, aber kein einziger. Die Positionen entstehen jetzt aus
// dem geprüften Katalogdatensatz — dieser Test hält fest, dass sie das auch
// bleiben.
//
// Der wichtigste Punkt ist der letzte: ein Leistungsverzeichnis ist eine
// Spezifikation, keine Werbung. Sobald ein Wort wie „hochwertig" in einen
// Langtext gerät, ist der Text für einen Planer unbrauchbar — er müsste jede
// Position von Hand nachbearbeiten.

import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../../app/api/bim/lv/route';
import { getBimComponentRecords, getBimRecord, CATALOG_EDITION } from '../../lib/bim/product';
import {
  buildLeistungsverzeichnis,
  toLvPosition,
  toLvText,
  toLvCsv,
  lvBezeichnung,
} from '../../lib/bim/lv';

const bauteile = getBimComponentRecords();
const lvDe = buildLeistungsverzeichnis(bauteile, 'de');
const lvEn = buildLeistungsverzeichnis(bauteile, 'en');

describe('K-Aqua — Ausschreibungstexte', () => {
  it('jedes Bauteil bekommt eine Position', () => {
    /* Fällt ein Produkt heraus, fehlt ihm die Bezeichnung — dann steht es
       stillschweigend nicht mehr im Leistungsverzeichnis. Genau das soll hier
       auffallen und nicht erst dem Planer. */
    const ohneBezeichnung = [
      ...new Set(
        bauteile.filter((r) => !lvBezeichnung(r.productSlug, 'de')).map((r) => r.productSlug),
      ),
    ];

    expect(
      ohneBezeichnung,
      `ohne deutsche Bezeichnung:\n  ${ohneBezeichnung.join('\n  ')}`,
    ).toEqual([]);
    expect(lvDe).toHaveLength(bauteile.length);
    expect(lvEn).toHaveLength(bauteile.length);
  });

  it('keine Ordnungszahl kommt doppelt vor', () => {
    const oz = lvDe.map((p) => p.oz);
    expect(new Set(oz).size).toBe(oz.length);
  });

  it('jede Position trägt Kurztext, Einheit, Langtext und Beleg', () => {
    const fehler: string[] = [];
    for (const p of lvDe) {
      if (!p.kurztext.trim()) fehler.push(`${p.oz}: kein Kurztext`);
      if (!p.einheit) fehler.push(`${p.oz}: keine Mengeneinheit`);
      if (p.langtext.length < 3) fehler.push(`${p.oz}: Langtext zu dünn`);
      if (!p.beleg.includes('KA-Katalog')) fehler.push(`${p.oz}: kein Katalogbeleg`);
      // Der Werkstoff ist die erste Angabe jeder Position.
      if (!p.langtext[0]?.startsWith('Werkstoff:')) fehler.push(`${p.oz}: kein Werkstoff`);
    }
    expect(fehler, `unvollständige Positionen:\n  ${fehler.join('\n  ')}`).toEqual([]);
  });

  it('Rohre sind Meterware, alles andere Stückgut', () => {
    const falsch = lvDe
      .filter((p) => (p.category === 'pipes' ? p.einheit !== 'm' : p.einheit !== 'St'))
      .map((p) => `${p.oz} ${p.category} → ${p.einheit}`);
    expect(falsch, `falsche Mengeneinheit:\n  ${falsch.join('\n  ')}`).toEqual([]);
  });

  it('kein Werbewort steht in einem Ausschreibungstext', () => {
    /* Genau der Grund, warum `productNames` aus den Sprachdateien hier NICHT
       verwendet wird: dort steht „Sichere PP-R Rohrstopfen für Leitungen". */
    /* Ganze Wörter, nicht Teilstrings. Ein erster Anlauf suchte nach
       „stabil" und schlug bei „UV-stabilisierte Außenschicht" an — einer
       Werkstoffangabe aus dem Katalog. Die Endungen decken die deutsche
       Adjektivbeugung ab, ohne Ableitungen wie „Stabilität" zu fangen. */
    const stamm = [
      'hochwertig',
      'sicher',
      'stabil',
      'perfekt',
      'optimal',
      'innovativ',
      'zuverlässig',
      'premium',
      'führend',
      'bewährt',
    ];
    const verboten = stamm.map((s) => ({
      wort: s,
      re: new RegExp(`\\b${s}(e|er|es|en|em)?\\b`, 'i'),
    }));

    const treffer: string[] = [];
    for (const p of lvDe) {
      const text = [p.kurztext, ...p.langtext].join(' ');
      for (const { wort, re } of verboten) {
        if (re.test(text)) treffer.push(`${p.oz}: „${wort}"`);
      }
    }
    expect(treffer, `Werbeworte im LV-Text:\n  ${treffer.join('\n  ')}`).toEqual([]);
  });

  it('der deutsche Text benutzt durchgehend das Dezimalkomma', () => {
    /* Ein Punkt als Dezimaltrenner ist in einem deutschen Leistungsverzeichnis
       ein Zahlenfehler — 1.2 liest sich als 12.
       Ein erster Anlauf prüfte nur an EINEM Rohr und nur die Einheiten mm, kg
       und l/m. Er ging durch, während in jeder Rohrposition „20°C / 1.2 MPa"
       stand: die Druckstufe ist ein vorformatierter Katalogstring und lief an
       der Zahlformatierung vorbei. Jetzt über ALLE Positionen und ohne
       Einheitenliste. */
    const rohr = getBimRecord('AQ111P32');
    expect(rohr).not.toBeNull();
    expect(toLvPosition(rohr!, 'de', 1)!.langtext.join('\n')).toContain('2,9');

    const treffer: string[] = [];
    for (const p of lvDe) {
      for (const zeile of p.langtext) {
        // Normbezeichnungen und Artikelnummern sind keine Dezimalzahlen; die
        // Prüfung greift nur, wo eine Ziffer direkt auf einen Punkt und wieder
        // eine Ziffer folgt.
        if (/\d\.\d/.test(zeile)) treffer.push(`${p.oz}: ${zeile}`);
      }
    }
    expect(treffer.slice(0, 8), `Dezimalpunkt im deutschen Text:\n  ${treffer.slice(0, 8).join('\n  ')}`).toEqual(
      [],
    );
  });

  it('keine Norm steht doppelt in einer Position', () => {
    /* Der Katalog führt bei den Rohren „DIN 8077 / 8078" und daneben noch
       einmal „DIN 8077" und „DIN 8078" einzeln — dreimal dieselbe Norm. */
    const treffer: string[] = [];
    for (const p of lvDe) {
      const zeile = p.langtext.find((l) => l.startsWith('Normen: '));
      if (!zeile) continue;
      const normen = zeile.slice('Normen: '.length).split(', ');
      if (new Set(normen).size !== normen.length) treffer.push(`${p.oz}: ${zeile}`);
      if (normen.includes('DIN 8077 / 8078') && normen.includes('DIN 8077')) {
        treffer.push(`${p.oz}: Sammelnorm und Einzelnorm nebeneinander`);
      }
    }
    expect(treffer.slice(0, 5), `doppelte Normen:\n  ${treffer.slice(0, 5).join('\n  ')}`).toEqual([]);
  });

  it('die Artikelnummer und der Gleichwertigkeitsvorbehalt stehen in jeder Position', () => {
    /* Ohne „oder gleichwertig" wäre die Position eine unzulässige
       Produktvorgabe; ohne die Artikelnummer wäre sie nicht nachvollziehbar. */
    const fehler = lvDe
      .filter((p) => {
        const t = p.langtext.join(' ');
        return !t.includes(p.articleCode) || !t.includes('oder gleichwertig');
      })
      .map((p) => p.oz);
    expect(fehler, `ohne Artikel oder Gleichwertigkeitsvorbehalt:\n  ${fehler.join('\n  ')}`).toEqual(
      [],
    );
  });

  it('die Textausgabe enthält jede Position und jeden Titel', () => {
    const text = toLvText(lvDe, 'de', CATALOG_EDITION);
    expect(text).toContain('ROHRLEITUNGEN');
    expect(text).toContain('FORMSTÜCKE');
    expect(text).toContain('ARMATUREN');
    for (const p of [lvDe[0]!, lvDe[Math.floor(lvDe.length / 2)]!, lvDe[lvDe.length - 1]!]) {
      expect(text).toContain(p.oz);
      expect(text).toContain(p.kurztext);
    }
  });

  it('die Tabelle öffnet sich in Excel und hat je Position eine Zeile', () => {
    const csv = toLvCsv(lvDe, 'de');
    expect(csv.startsWith('﻿'), 'BOM fehlt — Excel liest sonst Mojibake').toBe(true);
    expect(csv.split('\r\n').filter(Boolean)).toHaveLength(lvDe.length + 1);
    // Semikolon als Trenner, sonst zerlegt Excel deutsche Dezimalzahlen falsch.
    expect(csv.split('\r\n')[0]).toContain(';');
  });

  it('Werkzeuge stehen nicht im Leistungsverzeichnis', () => {
    // Schweißgeräte und Scheren werden gekauft, nicht ausgeschrieben.
    expect(lvDe.every((p) => p.category !== 'tools')).toBe(true);
  });
});

/* Die Auslieferung selbst.
 *
 * Ein Route-Handler ist eine gewöhnliche Funktion — sie lässt sich ohne Server
 * aufrufen. Das ist hier mehr als Formsache: die beiden Knöpfe dieser Seite
 * zeigten jahrelang auf eine Adresse ohne Datei, und genau das soll nie wieder
 * unbemerkt bleiben. */
describe('K-Aqua — Ausschreibungstexte, Auslieferung', () => {
  const anfrage = (query: string) =>
    GET(new NextRequest(`https://k-aqua.de/api/bim/lv${query}`));

  it('liefert ohne Formatangabe eine Übersicht statt einer großen Datei', async () => {
    const res = await anfrage('');
    expect(res.status).toBe(200);
    const daten = await res.json();
    expect(daten.positionen).toBe(lvDe.length);
    expect(daten.formate).toHaveProperty('txt');
    // Was es nicht gibt, wird benannt statt verschwiegen.
    expect(daten.nichtEnthalten.gaeb).toContain('GAEB DA XML');
  });

  it('liefert den Text als Datei zum Speichern', async () => {
    const res = await anfrage('?format=txt');
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/plain');
    expect(res.headers.get('Content-Disposition')).toContain('attachment');
    const text = await res.text();
    expect(text).toContain('ROHRLEITUNGEN');
    expect(text.length).toBeGreaterThan(10_000);
  });

  it('grenzt auf ein Produkt und auf eine Kategorie ein', async () => {
    const produkt = await (await anfrage('?format=json&produkt=elbow-90')).json();
    expect(produkt.positionen.length).toBeGreaterThan(0);
    expect(produkt.positionen.every((p: { productSlug: string }) => p.productSlug === 'elbow-90')).toBe(
      true,
    );

    const kategorie = await (await anfrage('?format=json&kategorie=pipes')).json();
    expect(kategorie.positionen.every((p: { einheit: string }) => p.einheit === 'm')).toBe(true);
  });

  it('meldet unbekannte Eingaben, statt still etwas Leeres zu liefern', async () => {
    expect((await anfrage('?format=xml')).status).toBe(400);
    expect((await anfrage('?format=txt&kategorie=tools')).status).toBe(400);
    expect((await anfrage('?format=txt&produkt=gibtesnicht')).status).toBe(404);
  });

  it('liefert die englische Fassung auf Wunsch', async () => {
    const text = await (await anfrage('?format=txt&sprache=en')).text();
    expect(text).toContain('PIPES');
    expect(text).toContain('Material:');
    expect(text).not.toContain('Werkstoff:');
  });
});
