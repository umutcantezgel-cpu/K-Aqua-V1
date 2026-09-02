import { describe, it, expect } from 'vitest';
import { GET } from '@/app/api/bim/artikel/[code]/route';
import { getBimRecord } from '@/lib/bim/product';
import type { NextRequest } from 'next/server';

/*
 * Die BIM-Route zu einer einzelnen Artikelnummer.
 *
 * Der Druckkatalog fuehrt die Nummern mit dem Werkstoffbuchstaben
 * (`AQ045P110`), die Website ohne (`AQ045110`); dazu kommen die Farbvarianten
 * (`CU045P110`). Wer aus dem Katalog abtippte, bekam 404.
 *
 * Geloest wird das mit einer 308-Umleitung und NICHT damit, den Vergleich in
 * `getBimRecord` aufzuweichen. Aufgeweicht wuerde er `AQ200P20` (PP-R, SDR 6)
 * und `AQ20020` (PP-RCT, SDR 7,4) zusammenlegen — zwei verschiedene Rohre.
 * Und es bleibt EINE Adresse je Artikel, statt dass dieselbe IFC-Datei unter
 * vier Nummern erreichbar waere.
 */

function anfrage(code: string, query = ''): NextRequest {
  return new Request(
    `https://k-aqua.de/api/bim/artikel/${encodeURIComponent(code)}${query}`,
  ) as unknown as NextRequest;
}

const hole = (code: string, query = '') =>
  GET(anfrage(code, query), { params: Promise.resolve({ code }) });

describe('BIM-Artikelroute — Nummernauflösung', () => {
  it('liefert die Website-Nummer unverändert aus', async () => {
    const a = await hole('AQ045110', '?format=json');
    expect(a.status).toBe(200);
    const d = await a.json();
    expect(d.articleNumber).toBe('AQ045110');
  });

  it('leitet die Herstellerschreibweise dauerhaft auf die kanonische Nummer', async () => {
    const a = await hole('AQ045P110', '?format=json');
    expect(a.status).toBe(308);
    expect(a.headers.get('location')).toContain('/api/bim/artikel/AQ045110');
    // Die Abfrage muss den Umzug überleben, sonst käme statt JSON eine IFC.
    expect(a.headers.get('location')).toContain('format=json');
  });

  it('leitet auch die Farbvariante auf das Grundprodukt', async () => {
    const a = await hole('CU045P110');
    expect(a.status).toBe(308);
    expect(a.headers.get('location')).toContain('/api/bim/artikel/AQ045110');
  });

  /*
   * DER TEST, DER DIE UMLEITUNG BEGRENZT.
   *
   * `AQ200P20` ist selbst eine gültige Website-Nummer — das PP-R-Rohr SDR 6.
   * Sie darf NICHT auf `AQ20020` (PP-RCT, SDR 7,4) umgeleitet werden. Ein
   * Planer, der die falsche Wandstärke ins Modell holt, merkt es erst auf der
   * Baustelle.
   */
  it('leitet AQ200P20 nicht um — die Nummer gibt es selbst', async () => {
    const a = await hole('AQ200P20', '?format=json');
    expect(a.status).toBe(200);
    const d = await a.json();
    expect(d.articleNumber).toBe('AQ200P20');
    expect(d.productSlug).toBe('k-pipe-pp-r-sdr-6');
  });

  it('AQ20020 bleibt das PP-RCT-Rohr', async () => {
    const d = await (await hole('AQ20020', '?format=json')).json();
    expect(d.productSlug).toBe('k-pipe-pp-rct-sdr-74');
  });

  it('bleibt bei einer unbekannten Nummer beim 404', async () => {
    const a = await hole('AQ999999', '?format=json');
    expect(a.status).toBe(404);
  });
});

describe('BIM-Ausgabe — der Artikelname liegt in allen drei Formaten', () => {
  /* Alle drei oder keins. Wer ihn in der CSV findet und im Modell nicht,
     meldet einen Fehler. */

  it('JSON trägt Produktname UND Artikelbezeichnung', async () => {
    const d = await (await hole('AQ045110', '?format=json')).json();
    expect(d.product).toBe('PP-R Standard Elbow 45°');
    expect(d.articleName).toBe('Elbow 45° d110 mm');
  });

  it('CSV trägt eine eigene Spalte Artikelbezeichnung', async () => {
    const csv = await (await hole('AQ045110', '?format=csv')).text();
    const [kopf, zeile] = csv.split('\n');
    const spalte = kopf!.split(';').indexOf('Artikelbezeichnung');
    expect(spalte).toBeGreaterThan(-1);
    expect(zeile!.split(';')[spalte]).toContain('Elbow 45° d110 mm');
  });

  it('IFC trägt ihn im Bauteilnamen und als Eigenschaft', async () => {
    const ifc = await (await hole('AQ045110', '?geometrie=ohne')).text();
    expect(ifc).toContain('Elbow 45\\X2\\00B0\\X0\\ d110 mm AQ045110');
    expect(ifc).toContain('Artikelbezeichnung');
  });

  it('lässt den Namen weg, wo die Herstellerliste die Nummer nicht führt', async () => {
    // Alle 175 Rohre. Der Fehlerfall ist ein fehlender Name, nie ein falscher.
    const d = await (await hole('AQ111P20', '?format=json')).json();
    expect(getBimRecord('AQ111P20')).not.toBeNull();
    expect(d.articleName).toBeNull();
    expect(d.product).toBeTruthy();
  });
});
