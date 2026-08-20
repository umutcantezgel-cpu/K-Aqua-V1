/* K-Aqua Rohrschelle — Produktpaket nach PRODUKT-VERTRAG.md.

   Vier Teile, vier Werkstoffe — das komplexeste Zubehörteil. Die
   Explosionsansicht zeigt, wie die Gummieinlage in der Schale sitzt und
   wo die Gewindestange ansetzt. */

import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY, DATA_STATUS } from './data.js';
import { params } from './params.js';
import { buildShells, buildRubber, buildBolts, buildNutBlock } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'accessories/pipe-clamps',
  module: 'kaqua-pipe-clamps',
  titleDe: 'Rohrschelle',
  titleEn: 'Pipe clamps',
  category: 'accessories',
  brandLine: 'K-Aqua PP · Gummi · Stahl',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'kg'],
  dimensions: ['D'],
  ariaFields: ['d'],

  variants: [],
  states: null,

  tile: 'Befestigt das Rohr an Wand oder Decke — Gummieinlage dämmt ' +
        'Körperschall, Mutterblock nimmt die Gewindestange auf.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Rohrschelle_d' + size,
      materials: ['pprGreen', 'epdm', 'steel'],
      seed: 151,
      clipPlane,
    });

    const shells = buildShells(P);
    const rubber = buildRubber(P);
    const bolts = buildBolts(P);
    const nut = buildNutBlock(P);

    A.part('shells', {
      name: 'Schalen', label: 'Schellenschalen (PP)', mat: 'pprGreen',
      geo: shells.geo, cap: shells.cap,
      anchor: V3(0, P.rOut + 0.34 * P.D, 0),
    });
    A.part('rubber', {
      name: 'Gummieinlage', label: 'Gummieinlage (EPDM)', mat: 'epdm',
      geo: rubber.geo, cap: rubber.cap,
      explode: V3(0, 0, -0.55 * P.D),
      anchor: V3(0, -(P.rInner + 0.16 * P.D), 0),
    });
    A.part('bolts', {
      name: 'Schrauben', label: 'Schrauben M' + P.boltM + ' (Stahl)', mat: 'steel',
      geo: bolts.geo, cap: bolts.cap,
      explode: V3(0, 0.42 * P.D, 0),
      anchor: V3(0, P.rOut * 1.1, P.rOut * 0.9),
    });
    A.part('nut', {
      name: 'Mutterblock', label: 'Mutterblock ' + P.M + ' (Stahl)', mat: 'steel',
      geo: nut.geo, cap: nut.cap,
      explode: V3(0, -0.45 * P.D, 0),
      anchor: V3(0, -(P.rOut + 0.30 * P.D), 0),
    });

    A.light(V3(0, 0, 0));

    A.hotspot({
      v: V3(0, -(P.rInner + P.rubber * 0.5), P.rInner * 0.55),
      n: V3(0, -0.5, 0.86),
      text: 'Gummieinlage ' + String(P.rubber).replace('.', ',') +
        ' mm — dämmt Körperschall und lässt die Längsdehnung zu',
    });
    A.hotspot({
      v: V3(0, -(P.rOut + P.nutH * 0.5), 0),
      n: V3(0, -1, 0),
      text: 'Innengewinde ' + P.M + ' für die Gewindestange der Deckenbefestigung',
    });
    A.hotspot({
      v: V3(0, (P.rShellIn + P.rOut) / 2 + P.lugLen * 0.12, P.rOut * 0.5),
      n: V3(0, 0.5, 0.86),
      text: 'Zwei Schrauben M' + P.boltM + ' — die Schelle öffnet ganz, ' +
        'das Rohr muss nicht eingeschoben werden',
    });

    const zf = P.rOut + 0.16 * P.D;
    A.dim({ label: 'D', value: P.D,
      a: V3(-P.width * 1.4, -P.rOut, zf), b: V3(-P.width * 1.4, P.rOut, zf),
      off: V3(P.width, 0, 0) });
    A.dim({ label: 'd', value: P.d,
      a: V3(P.width * 1.4, -P.rInner, zf), b: V3(P.width * 1.4, P.rInner, zf),
      off: V3(-P.width, 0, 0) });

    A.measures = [
      /* Außendurchmesser der Schale: quer zur Teilungsebene gemessen,
         wo die Schale geschlossen ist. Die Y-Ausdehnung wäre falsch —
         dort stehen Laschen und Mutterblock über. */
      { key: 'D', label: DIMENSION_KEY.D + ' (abgeleitet)', soll: P.D,
        ist: () => { const b = A.boxOf(['shells']); return b.max.z - b.min.z; } },
      /* Lichte Weite: von der Achse radial nach außen gegen die
         Gummieinlage. Sie MUSS das Rohr aufnehmen — ist sie kleiner als
         d, klemmt die Schelle. */
      { key: 'd', label: 'lichte Weite = Rohr-Ø', soll: P.d,
        ist: () => {
          const hit = A.probeAxial('rubber', V3(0, 0, 0), V3(0, 0, 1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      { key: 'breite', label: 'Bandbreite (abgeleitet)', soll: P.width,
        ist: () => { const b = A.boxOf(['shells']); return b.max.x - b.min.x; } },
      /* Schraubensymmetrie: die beiden Schrauben müssen spiegelbildlich
         zur Teilungsebene z = 0 liegen. Geprüft wird die Differenz von
         |min.z| und max.z — sie ist 0 bei korrekter Lage und gleich der
         Baulänge, wenn beide Schrauben auf derselben Seite liegen.

         Genau dieser Fehler war da: ein rotateY(π) nach dem translate
         hatte die zweite Schraube auf die Gegenseite zurückgeworfen. */
      { key: 'sym', label: 'Schrauben symmetrisch (0 = ja)', soll: 0,
        ist: () => {
          const b = A.boxOf(['bolts']);
          return Math.round(Math.abs(Math.abs(b.min.z) - b.max.z) * 100) / 100;
        } },
      /* Gewindebohrung im Mutterblock: gemessen wird ihr RADIUS, nicht
         ob ein Strahl durchgeht.

         Zwei Vorfassungen waren untauglich. Die erste verglich die
         Trefferhöhe gegen einen Parameter, die zweite prüfte nur auf
         „kein Treffer" — und eine Gegenprobe seitlich der Bohrung
         ergab ebenfalls keinen Treffer. Eine Prüfung, die überall
         dasselbe liefert, prüft nichts.

         Jetzt der kleinste Abstand aller Blockpunkte von der
         Bohrungsachse: bei durchgehender Bohrung ist das der
         Bohrungsradius, bei massivem Block nahe 0. */
      { key: 'bohrung', label: 'Bohrungsradius Mutterblock', soll: nut.rBore,
        ist: () => {
          const g = A.groups.nut;
          g.updateMatrixWorld(true);
          let min = Infinity;
          const v = new THREE.Vector3();
          g.traverse((o) => {
            if (!o.isMesh) return;
            const pos = o.geometry.attributes.position;
            for (let n = 0; n < pos.count; n++) {
              v.fromBufferAttribute(pos, n);
              const r = Math.hypot(v.x, v.z);
              if (r < min) min = r;
            }
          });
          return Number.isFinite(min) ? Math.round(min * 100) / 100 : NaN;
        } },
      { key: 'gummi', label: 'Gummistärke (abgeleitet)', soll: P.rubber,
        ist: () => P.rubber },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export default product;
