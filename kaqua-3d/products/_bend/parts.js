/* K-Aqua Winkelfamilie — Kontur.

   Der erste echte Belastungstest für sweepPath, und er hat eine Lücke im
   Core gefunden: sweepPath nahm einen festen Querschnitt für die ganze
   Bahn. Ein Winkel braucht einen veränderlichen — an den Stirnflächen
   die Muffenbohrung, in der Mitte die Rohrbohrung. Ohne CSG ist das der
   einzige Weg, die Muffe in eine geschlossene Kontur zu bekommen.

   sweepPath nimmt jetzt auch eine Funktion (t, i) => Punktliste. Damit
   ist der Winkel EIN Loft: Außenhaut konstant D/2, Innenhaut nach
   Position veränderlich, plus zwei Ringflächen an den Stirnflächen.

   Kein CSG, keine Boolesche Operation. */

import {
  circleLoop, bendPath, sweepPath, mergeGeometries, revolve, buildProfile,
  SEG_VIS, SEG_INT, SEG_FINE, DRAFT,
} from '../../core/index.js';
import * as THREE from 'three';

/* Innenradius über der Bahn. t läuft 0…1 von Stirnfläche A nach B.
   Der Verlauf ist symmetrisch, deshalb wird nur der Abstand zur
   näheren Stirnfläche betrachtet. */
function boreAt(P, t, pathLen) {
  const s = Math.min(t, 1 - t) * pathLen;   // Bogenlänge bis zur nächsten Stirnfläche
  const rSock = P.d / 2;
  if (s <= 0.001) return rSock + P.lead;    // Einführfase am Mundloch
  if (s <= 2) return rSock + P.lead * (1 - s / 2);
  if (s <= P.socket) return rSock - P.sockTaper * (s - 2);
  const ramp = Math.min(1, (s - P.socket) / Math.max(1.5, P.wallFitting * 0.8));
  const rEnd = P.d / 2 - P.sockTaper * (P.socket - 2);
  return rEnd + (P.boreR - rEnd) * ramp;    // Übergang auf die Rohrbohrung
}

export function buildBend(P) {
  const path = bendPath(P.leg, P.angle, P.bendR, 24, 5);
  let pathLen = 0;
  for (let i = 1; i < path.length; i++) pathLen += path[i].c.distanceTo(path[i - 1].c);

  /* Außenhaut: konstant D/2, mit 1° Entformung zu den Stirnflächen hin
     verjüngend — dieselbe Regel wie bei jedem anderen Fitting. */
  const outer = sweepPath((t) => {
    const s = Math.min(t, 1 - t) * pathLen;
    const shrink = DRAFT * Math.max(0, P.socket - s) * 0.5;
    return circleLoop(P.rOut - shrink, SEG_VIS, 0.15);
  }, path);

  const inner = sweepPath((t) => circleLoop(boreAt(P, t, pathLen), SEG_INT, 0.3),
    path, { flip: true });

  /* Ringflächen an den Stirnflächen: verbinden Außen- und Innenhaut zu
     einem geschlossenen Körper. Ohne sie ist der Winkel eine offene
     Schale und die Schnittansicht zeigt Löcher. */
  const rings = [];
  for (const [idx, flip] of [[0, true], [path.length - 1, false]]) {
    const st = path[idx];
    const t = idx === 0 ? 0 : 1;
    const rIn = boreAt(P, t, pathLen);
    const ring = new THREE.RingGeometry(rIn, P.rOut, SEG_VIS, 1);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, flip ? -1 : 1), st.t.clone().normalize());
    ring.applyQuaternion(q);
    ring.translate(st.c.x, st.c.y, st.c.z);
    const n = ring.attributes.position.count;
    ring.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.5), 1));
    rings.push(ring);
  }

  /* Auswerferstift-Marke auf dem Bogenrücken — ohne sie sieht das Teil
     nach CAD-Viewer aus. */
  const mid = path[Math.floor(path.length / 2)];
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.25 },
    { a: 0.1, r: P.emR, fillet: 0.1 },
    { a: 0.1, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  const nOut = mid.c.clone().setZ(0).normalize();
  disc.rotateX(Math.PI);
  disc.translate(nOut.x * (P.rOut - 0.05) + mid.c.x, nOut.y * (P.rOut - 0.05) + mid.c.y, 0);

  return {
    geo: mergeGeometries([outer, inner, ...rings, disc]),
    cap: null,          // Halbschnitt über DoubleSide, siehe index.js
    path, pathLen,
  };
}
