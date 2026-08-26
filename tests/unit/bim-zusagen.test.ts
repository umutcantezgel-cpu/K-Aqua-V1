/* Wacht darüber, dass die BIM-Seite nur zusagt, was ausgeliefert wird.
 *
 * Der alte Seitentext versprach in allen 65 Sprachen native Revit-Familien
 * (.rfa/.rvt), VDI-3805-Datensätze, COBie-Kompatibilität, eine DWG-Bibliothek
 * und LOD/LOI-Stufen. Nichts davon existierte. Solche Zusagen entstehen nicht
 * aus böser Absicht, sondern weil jemand eine Marketingseite schreibt, ohne
 * nachzusehen, was dahinterliegt — und weil es 65 Dateien sind, die niemand
 * gemeinsam liest.
 *
 * Dieser Test liest sie gemeinsam. Er schlägt fehl, sobald eine dieser
 * Zusagen zurückkehrt — in irgendeiner Sprache.
 *
 * WAS ERLAUBT IST: die Zeichenfolge „.rfa" in genau einem Satz, nämlich dem,
 * der erklärt, WARUM es keine nativen Revit-Familien gibt. Diese Erklärung
 * gehört auf die Seite: ein Planer, der sie sucht und nicht findet, soll den
 * Grund lesen können, statt beim Vertrieb nachzufragen.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const MESSAGES_DIR = path.resolve(__dirname, '../../messages');

/** Zusagen, für die es keine Deckung gibt und auch keine geben wird. */
const OHNE_DECKUNG = [
  { begriff: 'vdi 3805', grund: 'Die Spezifikation ist kostenpflichtig; ohne sie wäre jede Konformitätsaussage unbelegt.' },
  { begriff: 'vdi3805', grund: 'wie VDI 3805' },
  { begriff: 'cobie', grund: 'Ein Format für die Betreiberübergabe, nicht für Herstellerdaten.' },
  { begriff: 'autocad', grund: 'Es wird keine DWG-Bibliothek ausgeliefert.' },
  { begriff: '.rvt', grund: 'Ein Revit-Projektdateiformat, ohne Revit-Lizenz nicht erzeugbar.' },
  { begriff: 'auto-routing', grund: 'Setzt eine native Familie voraus, die es nicht gibt.' },
];

/** Stufenangaben, die eine Prüfung behaupten, die niemand vorgenommen hat. */
const UNBELEGTE_STUFEN = ['lod 300', 'lod 400', 'lod 500', 'loi 300', 'loi 400', 'loi 500'];

interface LocaleBim {
  locale: string;
  bim: Record<string, unknown> | null;
  blob: string;
}

function ladeAlle(): LocaleBim[] {
  return readdirSync(MESSAGES_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => {
      const locale = f.replace(/\.json$/, '');
      const data = JSON.parse(readFileSync(path.join(MESSAGES_DIR, f), 'utf8'));
      const bim = data?.resources?.bim ?? null;
      return { locale, bim, blob: bim ? JSON.stringify(bim) : '' };
    });
}

const ALLE = ladeAlle();
const MIT_BIM = ALLE.filter((l) => l.bim !== null);

describe('BIM-Seitentext — Deckung der Zusagen', () => {
  it('führt den Block in allen 65 Sprachdateien', () => {
    expect(ALLE).toHaveLength(65);
    expect(MIT_BIM).toHaveLength(65);
  });

  for (const { begriff, grund } of OHNE_DECKUNG) {
    it(`sagt „${begriff}" in keiner Sprache zu — ${grund}`, () => {
      const treffer = MIT_BIM.filter((l) => l.blob.toLowerCase().includes(begriff)).map(
        (l) => l.locale,
      );
      expect(treffer).toEqual([]);
    });
  }

  it('behauptet keine LOD- oder LOI-Stufe', () => {
    const treffer: string[] = [];
    for (const l of MIT_BIM) {
      const low = l.blob.toLowerCase();
      for (const stufe of UNBELEGTE_STUFEN) {
        if (low.includes(stufe)) treffer.push(`${l.locale}: ${stufe}`);
      }
    }
    expect(treffer).toEqual([]);
  });

  it('nennt „DWG" nur, wo es um Formate geht, die es nicht gibt — also nirgends', () => {
    // „DWG" steht nirgends mehr als Zusage. Der Begriff taucht in keinem
    // erklärenden Satz auf, weil er dort auch nicht nötig ist.
    const treffer = MIT_BIM.filter((l) => /\bdwg\b/i.test(l.blob)).map((l) => l.locale);
    expect(treffer).toEqual([]);
  });

  it('nennt „.rfa" höchstens einmal, und nur in der Erklärung', () => {
    // Die Erklärung steht in bento.items[2] — der Kachel, die den Revit-Weg
    // beschreibt. Steht „.rfa" woanders, ist es wieder eine Zusage.
    const fehler: string[] = [];
    for (const l of MIT_BIM) {
      const anzahl = (l.blob.match(/\.rfa/gi) ?? []).length;
      if (anzahl === 0) continue; // zulässig: manche Sprachen formulieren ohne die Endung
      if (anzahl > 1) {
        fehler.push(`${l.locale}: ${anzahl}× .rfa`);
        continue;
      }
      const bento = (l.bim as { bento?: { items?: { desc?: string }[] } }).bento;
      const erklaerung = bento?.items?.[2]?.desc ?? '';
      if (!erklaerung.includes('.rfa')) {
        fehler.push(`${l.locale}: .rfa steht außerhalb von bento.items[2]`);
      }
    }
    expect(fehler).toEqual([]);
  });
});

describe('BIM-Seitentext — Struktur und Substanz', () => {
  const de = MIT_BIM.find((l) => l.locale === 'de')!;

  function pfade(o: unknown, p = ''): string[] {
    if (o && typeof o === 'object' && !Array.isArray(o)) {
      return Object.entries(o).flatMap(([k, v]) => pfade(v, p ? `${p}.${k}` : k));
    }
    if (Array.isArray(o)) return o.flatMap((v, i) => pfade(v, `${p}[${i}]`));
    return [p];
  }

  const dePfade = pfade(de.bim);

  it('führt in jeder Sprache dieselben Pfade wie die deutsche Vorlage', () => {
    const fehler: string[] = [];
    for (const l of MIT_BIM) {
      if (l.locale === 'de') continue;
      const vorhanden = new Set(pfade(l.bim));
      const fehlend = dePfade.filter((p) => !vorhanden.has(p));
      if (fehlend.length > 0) {
        fehler.push(`${l.locale}: ${fehlend.length} Pfade fehlen (${fehlend[0]} …)`);
      }
    }
    expect(fehler).toEqual([]);
  });

  it('hält in jeder Sprache die Zahl der Einträge je Liste', () => {
    for (const l of MIT_BIM) {
      const b = l.bim as {
        sticky?: { items?: unknown[] };
        timeline?: { items?: unknown[] };
        bento?: { items?: unknown[] };
      };
      expect(b.sticky?.items, `${l.locale}: sticky.items`).toHaveLength(4);
      expect(b.timeline?.items, `${l.locale}: timeline.items`).toHaveLength(5);
      expect(b.bento?.items, `${l.locale}: bento.items`).toHaveLength(4);
    }
  });

  it('trägt in jeder Sprache die belegten Kennzahlen unverändert', () => {
    // Zahlen sind sprachunabhängig. Geht eine beim Übersetzen verloren oder
    // wird sie verfälscht, steht auf der Seite eine andere Aussage als in
    // den Dateien, die sie beschreibt.
    const fehler: string[] = [];
    for (const l of MIT_BIM) {
      for (const zahl of ['546', '905', '15874', 'IFC 4', '06-2025']) {
        if (!l.blob.includes(zahl)) fehler.push(`${l.locale}: „${zahl}" fehlt`);
      }
    }
    expect(fehler).toEqual([]);
  });

  it('ist in keiner Sprache ein Platzhalter geblieben', () => {
    /* Erkannt wird ein Platzhalter daran, dass sich derselbe Wert wieder und
     * wieder findet — nicht an der Textlänge.
     *
     * Die Länge war der erste Versuch und ging schief: `my.json` trug
     * neunundvierzigmal „ဘာသာပြန်ဆိုထားသော စာသား" („übersetzter Text"), und
     * weil dieser Platzhalter lang ist, kam der Block auf 1887 Zeichen und
     * rutschte unter jeder Längenschwelle durch. Ein echter Text wiederholt
     * sich nicht; ein Platzhalter tut nichts anderes. */
    const fehler: string[] = [];
    for (const l of MIT_BIM) {
      const werte: string[] = [];
      const sammeln = (o: unknown): void => {
        if (typeof o === 'string') {
          if (o.trim()) werte.push(o);
        } else if (Array.isArray(o)) {
          o.forEach(sammeln);
        } else if (o && typeof o === 'object') {
          Object.values(o).forEach(sammeln);
        }
      };
      sammeln(l.bim);
      if (werte.length === 0) continue;

      const haeufigkeit = new Map<string, number>();
      for (const w of werte) haeufigkeit.set(w, (haeufigkeit.get(w) ?? 0) + 1);
      const groesste = Math.max(...haeufigkeit.values());
      if (groesste / werte.length > 0.3) {
        fehler.push(`${l.locale}: ${groesste} von ${werte.length} Werten identisch`);
      }
    }
    expect(fehler).toEqual([]);
  });

  it('ist außerhalb von de nirgends deutscher Text geblieben', () => {
    const deutsch = (de.bim as { bento: { items: { title: string }[] } }).bento.items[0]!
      .title;
    const treffer = MIT_BIM.filter(
      (l) =>
        l.locale !== 'de' &&
        (l.bim as { bento?: { items?: { title?: string }[] } }).bento?.items?.[0]?.title ===
          deutsch,
    ).map((l) => l.locale);
    expect(treffer).toEqual([]);
  });
});
