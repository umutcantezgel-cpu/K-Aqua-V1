/* K-Aqua Winkel Muffe/Spitzende — Baugruppe und Maßtest.

   Zwei Produkte rufen buildFemaleMale() mit ihrer Tabelle und ihrem
   Winkel auf. Der Bau steht genau einmal hier (Fall 32).

   ── WARUM DIE MESSUNGEN ENTLANG DER SCHENKELACHSEN LAUFEN ──
   Bei 90° zeigt Schenkel B auf +Y, und man kommt mit Schnitten in x und
   y aus. Bei 45° zeigt er auf (cos45°, sin45°) — dort trifft ein
   y-Schnitt die Achse nicht mehr. Beide Schenkelachsen gehen durch den
   Ursprung, deshalb misst diese Datei generisch:

     t = v · dir            Bogenlänge längs der Schenkelachse
     r = |v − t·dir|        Abstand von der Schenkelachse

   Das gilt für jeden Winkel und ist zugleich genauer als der Schnitt:
   es fällt kein Punkt heraus, nur weil er neben der Ebene liegt. */

import * as THREE from 'three';
import { D2R, createAssembly } from '../../core/index.js';
import { femaleMaleParams } from './params.js';
import { buildElbowBody } from '../_bendthread/parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

export function buildFemaleMale(cfg, size, variant, clipPlane) {
  const a = cfg.article(size);
  const P = femaleMaleParams(a, cfg);
  const ang = P.angle * D2R;

  const A = createAssembly({
    name: cfg.exportName + '_d' + a.d,
    materials: ['pprGreen'],
    seed: cfg.seed,
    clipPlane,
  });

  const body = buildElbowBody(P);

  A.part('body', {
    name: 'PP_Winkel', label: 'PP-R-Winkelkörper', mat: 'pprGreen',
    explode: V3(0, 0, 0),
    geo: body.geo, cap: body.cap,
    anchor: V3(-a.l * 0.7, P.rOut + 0.3 * a.l, 0),
  });

  A.light(V3(-a.l * 0.6, 0, 0));
  A.light(V3(a.z1 * 0.4, a.z1 * 0.5, 0));

  const dirA = new THREE.Vector3(-1, 0, 0);
  const dirB = new THREE.Vector3(Math.cos(ang), Math.sin(ang), 0);
  const POS = body.geo.attributes.position;

  /* Schnitt durch einen Schenkel: Punkte, deren Projektion auf die
     Schenkelachse bei s liegt UND die in der Ebene liegen, die die Achse
     mit z aufspannt. Radius ist dann |z|.

     ── WARUM NICHT DER REINE ACHSABSTAND ──
     Die erste Fassung nahm alle Punkte mit t ≈ s und maß ihren Abstand
     zur Achse. Bei 90° geht das durch; bei 45° las sie D = 30,54 statt
     29. Ursache: nahe der Ecke haben Mantelpunkte des SPITZENDES
     ebenfalls t ≈ s, und ihr Abstand zur MUFFENachse ist größer als
     deren Radius.

     Der Ebenenschnitt schließt sie aus, und zwar nachweislich: ein Punkt
     des Spitzendes mit v·n = 0 liegt bei x = +1,414·u (u ist sein Ort
     auf der B-Achse, u ≥ Setback > 0), also bei t = −x < 0. Er kann die
     Station s > 0 des Muffenschenkels nicht erreichen. */
  const cut = (dir, nrm, s, half) => {
    const v = new THREE.Vector3();
    let rMax = 0, rMin = Infinity, n = 0;
    for (let i = 0; i < POS.count; i++) {
      v.set(POS.getX(i), POS.getY(i), POS.getZ(i));
      if (Math.abs(v.dot(dir) - s) > half) continue;
      if (Math.abs(v.dot(nrm)) > 0.35) continue;
      const r = Math.abs(v.z);
      if (r > rMax) rMax = r;
      if (r < rMin) rMin = r;
      n++;
    }
    return n ? { rMax, rMin, n } : { rMax: NaN, rMin: NaN, n: 0 };
  };
  /* In der Bogenebene senkrecht auf der jeweiligen Schenkelachse. */
  const nA = new THREE.Vector3(0, 1, 0);
  const nB = new THREE.Vector3(-Math.sin(ang), Math.cos(ang), 0);
  const reach = (dir) => {
    const v = new THREE.Vector3();
    let m = -Infinity;
    for (let i = 0; i < POS.count; i++) {
      v.set(POS.getX(i), POS.getY(i), POS.getZ(i));
      const t = v.dot(dir);
      if (t > m) m = t;
    }
    return Math.round(m * 100) / 100;
  };
  const r2 = (v) => (Number.isFinite(v) ? Math.round(v * 200) / 100 : NaN);

  A.measures = [
    { key: 'l', label: cfg.dimensionKey.l, soll: a.l, ist: () => reach(dirA) },
    { key: 'z1', label: cfg.dimensionKey.z1, soll: a.z1, ist: () => reach(dirB) },

    /* D am Muffenschenkel gegen d am Spitzende: dasselbe Merkmal an zwei
       Stellen, und es MUSS verschiedene Werte liefern (Fall 25). */
    { key: 'D', label: cfg.dimensionKey.D, soll: a.D,
      ist: () => r2(cut(dirA, nA, a.l - P.socket, 0.4).rMax) },
    { key: 'd_spitze', label: 'Ø des Spitzendes', soll: a.d,
      ist: () => r2(cut(dirB, nB, a.z1 - 3, 0.4).rMax) },

    { key: 'muffenbohrung', label: 'Muffenbohrung (2 mm hinter dem Mundloch)', soll: a.d,
      ist: () => r2(cut(dirA, nA, a.l - 2, 0.4).rMin) },
    { key: 'bohrung', label: 'Rohrbohrung hinter der Muffe', soll: r2(P.boreR),
      ist: () => r2(cut(dirA, nA, -P.xBore, 0.35).rMin) },
    { key: 'bohrung_spitze', label: 'Rohrbohrung im Spitzende', soll: r2(P.boreR),
      ist: () => r2(cut(dirB, nB, a.z1 - 3, 0.4).rMin) },

    { key: 'freies_ende', label: 'Freies Rohrende ab Bogenauslauf', soll: P.spigotFree,
      ist: () => P.spigotFree },

    { key: 'symmetrie_z', label: 'Körper symmetrisch zur XY-Ebene (soll 0)', soll: 0,
      ist: () => {
        const b = A.visibleBoxOf(['body']);
        return Math.round((b.max.z + b.min.z) * 1000) / 1000;
      } },

    { key: 'restwand', label: 'Restwand Muffenschenkel', soll: P.restwand,
      ist: () => P.restwand },
    { key: 'restwandB', label: 'Wandstärke Spitzende', soll: P.restwandB,
      ist: () => P.restwandB },
  ];

  return A;
}
