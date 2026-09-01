// Prüft die vier Lieferfarben der Rohrserien.
//
// Der Farbwähler im 3D-Viewer schaltet zwischen Grün, Blau, Curry und Mocca
// um. Damit das trägt, müssen drei Dinge zusammenpassen, und keines davon war
// bisher geprüft:
//
//   1. genau die Rohre führen Varianten — Formstücke und Werkzeuge gibt es
//      laut Katalog nur in Grün, und ein Wähler dort wäre ein Versprechen auf
//      ein Lieferprogramm, das nicht existiert,
//   2. alle vier Schlüssel stimmen mit der Palette der Anzeige überein,
//   3. das Umschalten ändert wirklich das Material der Außenlage — sonst
//      klickt man ins Leere und das Modell bleibt grün.
//
// Punkt 3 ist der wichtigste: die Umfärbung tauscht bewusst nur Lage 0, weil
// Außen- und Innenlage sich sonst eine Materialinstanz teilen würden.

import { describe, expect, it, beforeAll } from 'vitest';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { installDomShim } from '../helpers/domShim';
import { VARIANT_IDS, VARIANT_HEX } from '../../lib/3d/variants';

/* eslint-disable @typescript-eslint/no-explicit-any */

const LIB = pathToFileURL(
  path.join(process.cwd(), 'public', 'kaqua-3d', 'lib', 'index.mjs')
).href;

/* Rohre, die bewusst KEINE Farbwahl anbieten: die beiden UV-Ausführungen sind
   außen schwarz, das Betriebswasserrohr ist violett. Das sind eigene
   Produkte, keine Farbvarianten. */
const ROHRE_OHNE_WAHL = new Set([
  'pipes/k-fiber-uv-pipe-pp-r-sdr-7-4',
  'pipes/k-fiber-uv-pipe-pp-rct-sdr-7-4',
  'pipes/k-pipe-purple-pp-r-sdr-11',
]);

let lib: any;
let registry: any[];
let produkte: Array<{ id: string; product: any }>;

beforeAll(async () => {
  installDomShim();
  lib = await import(/* @vite-ignore */ LIB);
  registry = lib.REGISTRY ?? [];

  produkte = [];
  for (const eintrag of registry) {
    produkte.push({ id: eintrag.id, product: await lib.loadProduct(eintrag.id) });
  }
}, 30_000);

const mitVarianten = () => produkte.filter(({ product }) => (product.variants?.length ?? 0) > 0);

describe('K-Aqua 3D — Lieferfarben', () => {
  it('nur Rohre bieten eine Farbwahl an', () => {
    const fremd = mitVarianten()
      .filter(({ id }) => !id.startsWith('pipes/'))
      .map(({ id }) => id);

    expect(
      fremd,
      `Diese Bauteile bieten Farben an, die es laut Katalog nicht gibt:\n  ${fremd.join('\n  ')}`
    ).toEqual([]);
  });

  it('jedes Rohr bietet die Farbwahl an, außer den bewusst einfarbigen', () => {
    const ohne = produkte
      .filter(({ id }) => id.startsWith('pipes/'))
      .filter(({ product }) => !(product.variants?.length > 0))
      .map(({ id }) => id)
      .sort();

    expect(ohne).toEqual([...ROHRE_OHNE_WAHL].sort());
  });

  it('jede Farbwahl führt genau die vier Schlüssel der Anzeige', () => {
    const fehler = mitVarianten()
      .filter(({ product }) => {
        const v = [...product.variants].sort();
        return JSON.stringify(v) !== JSON.stringify([...VARIANT_IDS].sort());
      })
      .map(({ id, product }) => `${id}: ${JSON.stringify(product.variants)}`);

    expect(fehler, `abweichende Variantenlisten:\n  ${fehler.join('\n  ')}`).toEqual([]);
  });

  it('das Umschalten ändert wirklich das Material der Außenlage', () => {
    const fehler: string[] = [];

    for (const { id, product } of mitVarianten()) {
      const size = product.defaultSize ?? product.sizes?.[0] ?? 32;
      /* Der Materialschlüssel der Außenlage, je Variante. `partsOf` gibt es
         nicht — stattdessen die erzeugten Meshes: die Außenlage ist das
         Bauteil mit dem größten Radius, und ihre Farbe unterscheidet sich
         zwischen den Varianten. */
      const farben = new Set<string>();
      for (const v of VARIANT_IDS) {
        const assembly = product.build(size, v, null);
        let aussen: any = null;
        let maxR = -Infinity;
        assembly.root.traverse((node: any) => {
          if (!node.isMesh || !node.geometry) return;
          node.geometry.computeBoundingSphere?.();
          const r = node.geometry.boundingSphere?.radius ?? -Infinity;
          if (r > maxR) {
            maxR = r;
            aussen = node;
          }
        });
        const mat = Array.isArray(aussen?.material) ? aussen.material[0] : aussen?.material;
        farben.add(mat?.color?.getHexString?.() ?? 'keine');
      }

      if (farben.size !== VARIANT_IDS.length) {
        fehler.push(`${id}: ${VARIANT_IDS.length} Varianten, aber nur ${farben.size} Farben`);
      }
    }

    expect(fehler, `Farbwahl ohne Wirkung:\n  ${fehler.join('\n  ')}`).toEqual([]);
  });

  it('die Farbnamen liegen in allen drei gepflegten Sprachen', () => {
    const fehler: string[] = [];

    for (const locale of ['de', 'en', 'ar']) {
      const daten = JSON.parse(
        readFileSync(path.join(process.cwd(), 'messages', `${locale}.json`), 'utf8')
      );
      const varianten = daten?.viewer3d?.variants;
      if (!varianten) {
        fehler.push(`${locale}: viewer3d.variants fehlt ganz`);
        continue;
      }
      if (!varianten.label) fehler.push(`${locale}: variants.label fehlt`);
      for (const id of VARIANT_IDS) {
        if (!varianten[id]) fehler.push(`${locale}: variants.${id} fehlt`);
      }
    }

    expect(fehler, `fehlende Farbnamen:\n  ${fehler.join('\n  ')}`).toEqual([]);
  });

  it('die Palette der Anzeige deckt jede Variante ab', () => {
    for (const id of VARIANT_IDS) {
      expect(VARIANT_HEX[id], `kein Farbwert für ${id}`).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});
