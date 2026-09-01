// Prüft die Bemaßung der 3D-Modelle.
//
// Der Viewer hat die Maßangaben lange nur als Textliste ausgegeben und die
// Geometriefelder `a`/`b`/`off` weggeworfen — der Knopf hieß „Bemaßung" und
// zeichnete keine. Seit das behoben ist, hängt die Anzeige an drei Zusagen der
// Produktmodule, und keine davon war bisher geprüft:
//
//   1. jedes Modul führt einen `dimensionKey` mit Klartextnamen,
//   2. jedes Maß-Label lässt sich darin nachschlagen,
//   3. `buildDimLines` macht aus den Angaben echte Linien.
//
// Punkt 2 ist der eigentliche Grund für diese Datei: `elbow-90-male-thread`
// beschriftet sein Maß mit „z₁" (tiefgestellte Ziffer), sein `dimensionKey`
// führt aber „z1". Ohne Normalisierung fehlt genau dort der Klartextname, und
// das fällt von Hand niemandem auf.

import { describe, expect, it, beforeAll } from 'vitest';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { installDomShim } from '../helpers/domShim';

/* eslint-disable @typescript-eslint/no-explicit-any */

const LIB = pathToFileURL(
  path.join(process.cwd(), 'public', 'kaqua-3d', 'lib', 'index.mjs')
).href;

/* Bauteile, die bewusst keine Maßangaben führen — Werkzeuge, Maschinen und
   einige Formteile. Der Viewer blendet den Bemaßungsknopf dort blass aus und
   erklärt es im Titel. Die Liste steht hier ausgeschrieben, damit ein Zuwachs
   eine bewusste Entscheidung bleibt und die Aussage des Knopfes stimmt. */
const OHNE_MASSE = new Set([
  'butt-welding-machine-90-250',
  'concealed-valve-chrome-heavy-part',
  'concealed-valve-chrome-light-part',
  'drilling-tool-for-weld-in-saddle',
  'elbow-45-female-male',
  'elbow-90-female-male',
  'elbow-bracket-90-female-thread',
  'elbow-wall-bracket-90-female-thread',
  'electrofusion-machine',
  'electrofusion-socket',
  'hand-welding-machine-20-32',
  'hand-welding-machine-20-63',
  'hand-welding-machine-mirror-50-125',
  'pipe-cutter-20-40',
  'pipe-cutter-50-125',
  'pipe-cutter-50-125-114',
  'repairing-plug',
  'straight-seat-valve-green-handle',
  'welding-machine-50-125',
  'welding-tool',
  'welding-tool-for-repairing-plug',
  'welding-tool-for-weld-in-saddles',
]);

/* Maß-Labels, die sich bewusst nicht auflösen lassen. `reducing-tee`
   beschriftet die Gesamtlänge je nach Ausführung mit „L" (Muffe) oder „2·z"
   (Spitzende); sein DIMENSION_KEY führt beide nicht, weil dort nur die
   Einzelmaße stehen. Der Viewer zeigt dann das Symbol allein — richtig, aber
   dürftig. Gehört der 3D-Sitzung gemeldet, nicht hier repariert. */
const OHNE_KLARTEXT = new Set(['fittings/reducing-tee: L']);

/* Dieselbe Auflösung wie `massName` in components/3d/Native3DCanvas.tsx —
   inklusive Normalisierung tiefgestellter Ziffern und der Rückwärtssuche über
   das letzte Wort des Klartextnamens. */
const TIEFZAHL: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
  '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
};
const nachAscii = (s: string) => [...s].map((c) => TIEFZAHL[c] ?? c).join('');

function klartext(schluessel: Record<string, unknown>, label: string): string | null {
  const ascii = nachAscii(label);
  const direkt = schluessel[label] ?? schluessel[ascii];
  if (typeof direkt === 'string') return direkt;
  for (const wert of Object.values(schluessel)) {
    if (typeof wert !== 'string') continue;
    const letztes = wert.trim().split(/\s+/).pop();
    if (letztes === label || letztes === ascii) return wert;
  }
  return null;
}

/** Der Blattname der Produkt-ID: aus `fittings/socket` wird `socket`. */
const blatt = (id: string) => id.split('/').pop() ?? id;

let lib: any;
let registry: any[];
/** Je Produkt einmal gebaut — das Bauen ist der teure Teil. */
let gebaut: Array<{ id: string; product: any; assembly: any }>;

beforeAll(async () => {
  installDomShim();
  lib = await import(/* @vite-ignore */ LIB);
  registry = lib.REGISTRY ?? [];

  gebaut = [];
  for (const eintrag of registry) {
    const product = await lib.loadProduct(eintrag.id);
    const size = product.defaultSize ?? product.sizes?.[0] ?? 32;
    gebaut.push({ id: eintrag.id, product, assembly: product.build(size, null, null) });
  }
}, 30_000);

describe('K-Aqua 3D — Bemaßung', () => {
  /* Nur Bauteile mit Maßangaben brauchen die Klartexttabelle. Sieben
     Werkzeugmaschinen führen weder das eine noch das andere — für die wäre
     die Forderung sinnlos. */
  it('jedes Bauteil mit Maßen führt auch Klartextnamen dafür', () => {
    const fehler = gebaut
      .filter(({ assembly }) => assembly.dims?.length > 0)
      .filter(({ product }) => {
        const k = product?.dimensionKey;
        return !k || typeof k !== 'object' || Object.keys(k).length === 0;
      })
      .map(({ id }) => id);

    expect(fehler, `mit Maßen, aber ohne dimensionKey:\n  ${fehler.join('\n  ')}`).toEqual([]);
  });

  it('jedes Maß-Label lässt sich zu einem Klartextnamen auflösen', () => {
    const fehler: string[] = [];

    for (const { id, product, assembly } of gebaut) {
      const schluessel = product.dimensionKey ?? {};
      for (const spec of assembly.dims ?? []) {
        if (klartext(schluessel, spec.label)) continue;
        const marke = `${id}: ${spec.label}`;
        if (OHNE_KLARTEXT.has(marke)) continue;
        fehler.push(`${marke} — kein Klartextname auflösbar`);
      }
    }

    expect(fehler, `unauflösbare Maß-Labels:\n  ${fehler.join('\n  ')}`).toEqual([]);
  });

  it('genau die bekannten Bauteile führen keine Maßangaben', () => {
    const ist = gebaut
      .filter(({ assembly }) => !(assembly.dims?.length > 0))
      .map(({ id }) => blatt(id))
      .sort();

    expect(ist).toEqual([...OHNE_MASSE].sort());
  });

  it('buildDimLines macht aus jeder Maßangabe eine sichtbare Linie', () => {
    expect(typeof lib.buildDimLines).toBe('function');

    const fehler: string[] = [];

    for (const { id, assembly } of gebaut) {
      const specs = assembly.dims ?? [];
      if (!specs.length) continue;

      const linien = lib.buildDimLines(specs, { scale: 100 });

      if (linien.entries.length !== specs.length) {
        fehler.push(`${id}: ${linien.entries.length} Einträge für ${specs.length} Maße`);
      }
      // Startzustand aus: der Viewer schaltet sie erst über den Knopf ein.
      if (linien.group.visible !== false) fehler.push(`${id}: Gruppe startet sichtbar`);
      if (!(linien.geos?.length > 0)) fehler.push(`${id}: keine Geometrie erzeugt`);

      for (const e of linien.entries) {
        if (!Number.isFinite(e.value)) fehler.push(`${id}: „${e.label}" hat keinen Zahlenwert`);
        if (!e.v || !Number.isFinite(e.v.x)) fehler.push(`${id}: „${e.label}" ohne Mittelpunkt`);
        if (!e.unit) fehler.push(`${id}: „${e.label}" ohne Einheit`);
      }
    }

    expect(fehler, `Maßlinien mit Problemen:\n  ${fehler.join('\n  ')}`).toEqual([]);
  });
});
