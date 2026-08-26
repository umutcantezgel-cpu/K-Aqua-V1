/* K-Aqua Überbögen — gemeinsame Baugruppe.

   Zwei Produkte, ein Aufbau. Was sie unterscheidet, steckt in cfg. */

import * as THREE from 'three';
import { createAssembly, meshVolume } from '../../core/index.js';
import { crossoverParams } from './params.js';
import { buildCrossover } from './parts.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;
const komma = (v) => String(v).replace('.', ',');


export function buildUeberbogen(cfg, size, variant, clipPlane) {
  const a = cfg.article(size);
  const P = crossoverParams(a, cfg);

  const A = createAssembly({
    name: cfg.exportName + '_d' + size,
    materials: ['pprGreen'],
    seed: cfg.seed,
    clipPlane,
  });

  const body = buildCrossover(P);

  A.part('koerper', {
    name: cfg.teilName, label: cfg.teilLabel, mat: 'pprGreen',
    geo: body.geo, cap: body.cap,
    anchor: V3(-P.len * 0.34, P.hAchse + P.rScheitel + 0.22 * P.hoehe, 0),
  });

  A.light(V3(-P.len * 0.35, P.hAchse * 0.5, 0));
  A.light(V3(P.len * 0.35, P.hAchse * 0.5, 0));

  A.hotspot({
    v: V3(0, P.hAchse + P.rScheitel * 0.6, P.rScheitel * 0.8),
    n: V3(0, 0.6, 0.8),
    text: 'Scheitel — die Achse liegt hier ' + komma(r2(P.hAchse)) +
      ' mm höher als an den Enden, darunter bleiben ' +
      komma(P.durchlass) + ' mm lichte Höhe',
  });
  A.hotspot(cfg.art === 'muffe' ? {
    v: V3(-P.len / 2 + Math.max(2, 0.2 * P.socket), P.rEnd * 0.45, P.rEnd * 0.85),
    n: V3(0, 0.45, 0.89),
    text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
      komma(P.socket) + ' mm nach DVS 2207-11',
  } : {
    v: V3(-P.len / 2 + 8, P.rScheitel * 0.45, P.rScheitel * 0.85),
    n: V3(0, 0.45, 0.89),
    text: 'Spitzende zum Einschweißen, Wandstärke ' + komma(a.s) +
      ' mm — das ist SDR 6 wie bei jedem K-Aqua-Fitting',
  });

  const zf = P.rScheitel + 0.18 * P.hoehe;
  A.dim({
    label: 'L', value: P.len,
    a: V3(-P.len / 2, -P.rEnd - 0.30 * P.hoehe, zf),
    b: V3(P.len / 2, -P.rEnd - 0.30 * P.hoehe, zf),
    off: V3(0, -0.10 * P.hoehe, 0),
  });
  A.dim({
    label: 'H', value: P.hoehe,
    a: V3(-P.len / 2 - 0.12 * P.len, -P.rEnd, zf),
    b: V3(-P.len / 2 - 0.12 * P.len, P.hAchse + P.rScheitel, zf),
    off: V3(-0.06 * P.len, 0, 0),
  });

  const pos = body.geo.attributes.position.array;
  const imBand = (x0, x1) => {
    let max = 0, min = Infinity, n = 0;
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i];
      if (x < x0 || x > x1) continue;
      const r = Math.hypot(pos[i + 1], pos[i + 2]);
      if (r > max) max = r;
      if (r < min) min = r;
      n++;
    }
    return { max, min, n };
  };

  A.measures = [
    { key: 'L', label: cfg.dimensionKey.L, soll: P.len,
      ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.x - b.min.x); } },
    /* H ist die BAUHÖHE — Unterkante Anschluss bis Oberkante Scheitel.
       Genau deshalb ist es hier die Ausdehnung der Box in Y und nicht
       die Anhebung der Achse. Welche der beiden Lesarten gilt, hat die
       Massenprobe entschieden (params.js). */
    { key: 'H', label: cfg.dimensionKey.H, soll: P.hoehe,
      ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.y - b.min.y); } },
    /* DIE ENDEN LIEGEN IN EINER FLUCHT — das unterscheidet den Überbogen
       vom Winkel, wo die Bahn abgelenkt wird. Gemessen wird der
       Höhenversatz der beiden Stirnflächen: die mittlere Höhe der
       Netzpunkte am linken gegen die am rechten Ende. Ein Bogen, der
       hier danebenliegt, hat einen Vorzeichenfehler in einer der vier
       Krümmungen — und der fiele sonst nur als „sieht schief aus" auf. */
    { key: 'flucht', label: 'Höhenversatz der beiden Enden', soll: 0,
      ist: () => {
        const mitteY = (x0, x1) => {
          let s = 0, n = 0;
          for (let i = 0; i < pos.length; i += 3) {
            if (pos[i] < x0 || pos[i] > x1) continue;
            s += pos[i + 1]; n++;
          }
          return n ? s / n : NaN;
        };
        const l = mitteY(-P.len / 2, -P.len / 2 + 0.6);
        const r = mitteY(P.len / 2 - 0.6, P.len / 2);
        return r2(Math.abs(l - r));
      } },
    /* Die Achsanhebung am Scheitel: höchster Netzpunkt minus dem
       Scheitelradius. */
    { key: 'scheitel', label: 'Achsanhebung am Scheitel', soll: r2(P.hAchse),
      ist: () => r2(A.boxOf(['koerper']).max.y - P.rScheitel) },
    /* DIE MASSENPROBE, am Netz. Der Rauminhalt des gebauten Körpers mal
       0,9 g/cm³ gegen die Kilogrammangabe der Tabelle. Sie prüft Bahn,
       Wandstärken und Muffen auf einmal — und sie ist der Grund, warum
       die Deutung von H feststeht. */
    { key: 'masse', label: 'Masse aus dem Volumen (0,9 g/cm³)', soll: a.kg,
      ist: () => r2(Math.round((meshVolume(body.geo) * 0.9) / 1e6 * 1000) / 1000) },
    ...cfg.messungen(P, a, { imBand, A }),
  ];

  A.setExplode(0);
  A.setSection(false, clipPlane);
  A.P = P;
  return A;
}
