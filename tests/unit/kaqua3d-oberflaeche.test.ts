// Prüft die Oberflächen-Texturen der 3D-Modelle.
//
// Anlass ist die Prägeschrift „MADE IN GERMANY". Sie lag als Normalmap auf
// allen sechs PP-Körperwerkstoffen und traf damit 37 der 70 Produkte. Lesbar
// war sie nie: `revolve()` bildet u = θ/2π ab und v als Bogenlänge des
// Profils, der Schriftzug wurde dadurch über 212° Umfang gezogen und auf 9 %
// der Profillänge gestaucht. Sichtbar blieben Querstreifen, die wie ein
// Renderfehler wirkten.
//
// Seit dem 05.09.2026 ist sie stillgelegt — nicht gelöscht. Diese Datei hält
// beide Seiten dieser Entscheidung fest:
//
//   1. dass sie WIRKLICH aus ist, und zwar im Normalfall und ohne dass ein
//      Produkt etwas dagegen tun muss (der eigentliche Wächter),
//   2. dass der stillgelegte Generator weiter funktioniert — das war der
//      Preis dafür, ihn zu behalten, und ohne Prüfung verrottet er,
//   3. dass der Rohr-AUFDRUCK davon unberührt bleibt. Er ist eine andere
//      Sache: eigenes Band, eigener Werkstoff, korrekt ausgerichtet, und am
//      realen PP-R-Rohr steht so eine Zeile tatsächlich.

import { describe, expect, it, beforeAll } from 'vitest';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { installDomShim } from '../helpers/domShim';

/* eslint-disable @typescript-eslint/no-explicit-any */

const LIB = pathToFileURL(
  path.join(process.cwd(), 'public', 'kaqua-3d', 'lib', 'index.mjs')
).href;
const CORE = pathToFileURL(
  path.join(process.cwd(), 'public', 'kaqua-3d', 'lib', 'kaqua-3d-core.mjs')
).href;

/* Die sechs Werkstoffe, die die Prägung tragen KÖNNTEN. */
const PP_KOERPER = ['pprGreen', 'pprPurple', 'pprUvBlack', 'pprBlue', 'pprCurry', 'pprMocca'];

let lib: any;
let core: any;
let gebaut: Array<{ id: string; A: any }>;

beforeAll(async () => {
  installDomShim();
  lib = await import(/* @vite-ignore */ LIB);
  core = await import(/* @vite-ignore */ CORE);

  gebaut = [];
  for (const eintrag of lib.REGISTRY ?? []) {
    const product = await lib.loadProduct(eintrag.id);
    gebaut.push({ id: eintrag.id, A: product.build(product.defaultSize, null, null) });
  }
}, 60_000);

describe('K-Aqua 3D — Prägeschrift stillgelegt', () => {
  it('kein Produkt trägt im Normalfall eine Prägung', () => {
    const mitPraegung: string[] = [];
    for (const { id, A } of gebaut) {
      for (const key of PP_KOERPER) {
        if (A.M?.[key]?.normalMap) mitPraegung.push(`${id} (${key})`);
      }
    }

    expect(
      mitPraegung,
      'Diese Bauteile tragen wieder die Prägeschrift. Sie ist über die\n' +
        'Revolve-UVs nicht lesbar zu bekommen — wer sie zurückholen will,\n' +
        'braucht eine eigene UV-Insel oder ein Decal-Mesh (Fall 49):\n  ' +
        mitPraegung.join('\n  ')
    ).toEqual([]);
  });

  it('die Prägung lässt sich weiterhin ausdrücklich anfordern', () => {
    const ohne = core.materials(['pprGreen'], 17, {});
    const mit = core.materials(['pprGreen'], 17, { emboss: true });

    expect(ohne.pprGreen.normalMap, 'Standardaufbau darf keine Prägung tragen').toBeFalsy();
    expect(
      mit.pprGreen.normalMap,
      'Mit `emboss: true` muss der stillgelegte Generator weiterhin liefern — ' +
        'sonst ist er verrottet und gehört gelöscht statt behalten.'
    ).toBeTruthy();

    core.disposeMaterials(ohne);
    core.disposeMaterials(mit);
  });

  it('embossTexture() erzeugt weiterhin eine brauchbare Normalmap', () => {
    const t = core.embossTexture();
    expect(t, 'Ohne Canvas gibt die Funktion null zurück — der Shim muss greifen').toBeTruthy();
    /* Eine Normalmap ist keine Farbe: sRGB-Dekodierung wuerde sie
       verfaelschen. Und sie darf sich nicht kacheln, der Schriftzug soll
       genau einmal stehen. */
    expect(t.colorSpace).toBe('');
    expect(t.wrapS).toBe(t.wrapT);
    t.dispose?.();
  });
});

describe('K-Aqua 3D — Rohr-Aufdruck bleibt', () => {
  it('die Rohre führen weiterhin ihr Aufdruckband', () => {
    const rohre = gebaut.filter(({ id }) => id.startsWith('pipes/'));
    expect(rohre.length, 'Es müssen Rohre in der Registry stehen').toBeGreaterThan(0);

    const ohneBand = rohre
      .filter(({ A }) => !A.M?.pprPrint)
      .map(({ id }) => id);

    expect(
      ohneBand,
      'Diesen Rohren fehlt der Werkstoff des Aufdruckbands. Der Aufdruck ist\n' +
        'NICHT die Prägung: er sitzt auf einem eigenen flachen Band längs der\n' +
        'Rohrachse und steht so auch am realen Bauteil.\n  ' + ohneBand.join('\n  ')
    ).toEqual([]);
  });
});
