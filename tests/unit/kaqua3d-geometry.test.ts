// Hält die Geometriekosten der 3D-Bibliothek im Blick.
//
// Der Viewer baut jedes Modell im Browser aus Parametern auf. Wird die
// Segmentzahl eines Bauteils erhöht, fällt das nirgends auf — bis ein
// Besucher auf einem älteren Gerät die Produktseite öffnet und der Aufbau
// spürbar hakt. Dieser Test macht die Kosten sichtbar und deckelt sie.
//
// Die Grenzen sind bewusst großzügig über den heutigen Werten gesetzt: Sie
// sollen eine Entgleisung fangen, nicht jede Feinjustierung blockieren.

import { describe, expect, it, beforeAll } from 'vitest';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { installDomShim } from '../helpers/domShim';

/* eslint-disable @typescript-eslint/no-explicit-any */

const LIB = pathToFileURL(
  path.join(process.cwd(), 'public', 'kaqua-3d', 'lib', 'index.mjs')
).href;

/** Obergrenze je Einzelmodell in der Standardgröße. */
const MAX_VERTICES_PER_PRODUCT = 400_000;

/** Obergrenze über die gesamte Bibliothek — fängt eine schleichende Zunahme. */
const MAX_VERTICES_TOTAL = 4_000_000;

let lib: any;
let registry: any[];

beforeAll(async () => {
  installDomShim();
  lib = await import(/* @vite-ignore */ LIB);
  registry = lib.REGISTRY ?? [];
});

describe('K-Aqua 3D — Geometriebudget', () => {
  it('hält jedes Modell und die Summe im Rahmen', async () => {
    const rows: { id: string; verts: number; meshes: number }[] = [];

    for (const entry of registry) {
      const id = entry.id ?? entry;
      const product = await lib.loadProduct(id);
      const size = product.defaultSize ?? product.sizes?.[0] ?? 32;
      // `build()` liefert eine Baugruppe; der Szenenbaum hängt an `.root`.
      const assembly = product.build(size, null, null);

      let verts = 0;
      let meshes = 0;
      assembly.root.traverse((node: any) => {
        if (node.isMesh) {
          meshes++;
          verts += node.geometry?.attributes?.position?.count ?? 0;
        }
      });
      rows.push({ id, verts, meshes });
    }

    rows.sort((a, b) => b.verts - a.verts);
    const total = rows.reduce((sum, r) => sum + r.verts, 0);

    // Die Erhebung gehört ins Protokoll: Wer die Segmentzahlen anfasst, sieht
    // beim nächsten Lauf sofort, was es gekostet hat.
    const top = rows.slice(0, 8)
      .map((r) => `${String(r.verts).padStart(8)}  ${String(r.meshes).padStart(3)} Meshes  ${r.id}`)
      .join('\n');
    console.log(
      `\n3D-Geometrie — ${rows.length} Produkte, ${total.toLocaleString('de-DE')} Vertices gesamt\n${top}`
    );

    const heaviest = rows[0];
    expect(heaviest).toBeDefined();
    expect(
      heaviest!.verts,
      `Schwerstes Modell "${heaviest!.id}" überschreitet das Budget`
    ).toBeLessThanOrEqual(MAX_VERTICES_PER_PRODUCT);

    expect(total, 'Gesamtgeometrie der Bibliothek überschreitet das Budget')
      .toBeLessThanOrEqual(MAX_VERTICES_TOTAL);
  }, 180_000);
});
