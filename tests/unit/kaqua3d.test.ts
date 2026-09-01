// Baut jedes Produkt der 3D-Bibliothek und prüft, dass echte Geometrie entsteht.
//
// Ohne diesen Test fällt ein kaputtes Modell erst auf, wenn ein Besucher die
// Produktseite öffnet — der Viewer zeigt dann nur einen Platzhalter.

import { describe, expect, it, beforeAll } from 'vitest';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { installDomShim } from '../helpers/domShim';

/* eslint-disable @typescript-eslint/no-explicit-any */

const LIB = pathToFileURL(
  path.join(process.cwd(), 'public', 'kaqua-3d', 'lib', 'index.mjs')
).href;

let lib: any;
let registry: any[];

beforeAll(async () => {
  installDomShim();
  lib = await import(/* @vite-ignore */ LIB);
  registry = lib.REGISTRY ?? [];
});

describe('K-Aqua 3D-Bibliothek', () => {
  it('führt Produkte in der Registry', () => {
    expect(registry.length).toBeGreaterThan(0);
  });

  it('jedes Registry-Produkt lässt sich laden und baut Geometrie', async () => {
    const fehler: string[] = [];

    for (const entry of registry) {
      try {
        const product = await lib.loadProduct(entry.id);
        const size = product.defaultSize ?? product.sizes?.[0] ?? 32;
        const assembly = product.build(size, null, null);

        let meshes = 0;
        let vertices = 0;
        assembly.root.traverse((node: any) => {
          if (node.isMesh) {
            meshes++;
            vertices += node.geometry?.attributes?.position?.count ?? 0;
          }
        });

        if (meshes === 0 || vertices === 0) {
          fehler.push(`${entry.id}: baut, aber ohne Geometrie`);
        }
      } catch (error) {
        fehler.push(`${entry.id}: ${(error as Error).message}`);
      }
    }

    expect(fehler, `Modelle mit Problemen:\n  ${fehler.join('\n  ')}`).toEqual([]);
    // Eigene Frist: dieser Test baut alle 70 Bauteile und lag mit rund fünf
    // Sekunden haarscharf an der Vorgabe — er schlug je nach Auslastung der
    // Maschine mal an, mal nicht. Er prüft, DASS jedes Modell baut, nicht wie
    // schnell; eine knappe Frist misst hier nur die Maschine.
  }, 30_000);

  it('jeder Registry-Eintrag hat die Felder, die Website und Katalog brauchen', () => {
    const unvollstaendig = registry.filter(
      (e) => !e.id || !e.slug || !e.category || !e.titleDe || !e.titleEn
    );
    expect(unvollstaendig.map((e) => e.id ?? '(ohne id)')).toEqual([]);
  });
});
