/* K-Aqua Überbögen — Kontur.

   Beide Produkte sind ein Sweep über dieselbe Bahn: außen eine Haut,
   innen eine Bohrung, an beiden Stirnflächen ein Ring. Dasselbe Muster
   wie beim Winkel (_bendthread/parts.js) — der Unterschied ist die Bahn
   und der Verlauf der Radien über sie.

   Kein CSG. */

import * as THREE from 'three';
import {
  bridgePath, circleLoop, mergeGeometries, polygonCap, sweepPath,
  DRAFT, SEG_VIS, SEG_INT,
} from '../../core/index.js';

const smooth = (u) => {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
};

const RAMPE = 2.5;   // Übergang Muffe → Bogenrohr

/* Außenradius über der Bahn. sA ist die Bogenlänge ab der einen
   Stirnfläche, sB die ab der anderen. Der Überbogen ist symmetrisch,
   deshalb genügt das Minimum von beiden. */
function hautAn(P, sA, sB) {
  const s = Math.min(sA, sB);
  if (P.socket <= 0) return P.rScheitel;              // Rohr: durchgehend
  if (s <= P.socket) return P.rEnd - DRAFT * (P.socket - s) * 0.4;
  if (s <= P.socket + RAMPE) {
    return P.rEnd + (P.rScheitel - P.rEnd) * smooth((s - P.socket) / RAMPE);
  }
  return P.rScheitel;
}

/* Innenradius über der Bahn. */
function bohrungAn(P, sA, sB) {
  const s = Math.min(sA, sB);
  if (P.socket <= 0) return P.boreR;                  // Rohr: durchgehend
  if (s <= 0.001) return P.d / 2 + P.lead;
  if (s <= 2) return P.d / 2 + P.lead * (1 - s / 2);
  if (s <= P.socket) return P.d / 2 - P.sockTaper * (s - 2);
  if (s <= P.socket + RAMPE) {
    const r0 = P.d / 2 - P.sockTaper * (P.socket - 2);
    return r0 + (P.boreR - r0) * smooth((s - P.socket) / RAMPE);
  }
  return P.boreR;
}

export function buildCrossover(P) {
  const path = bridgePath(P.len, P.hAchse, P.tEnde, 16, P.socket > 0 ? 8 : 20);
  let bahnLen = 0;
  for (let i = 1; i < path.length; i++) bahnLen += path[i].c.distanceTo(path[i - 1].c);

  const outer = sweepPath((t) => {
    const sA = t * bahnLen;
    return circleLoop(hautAn(P, sA, bahnLen - sA), SEG_VIS, 0.12);
  }, path);

  const inner = sweepPath((t) => {
    const sA = t * bahnLen;
    return circleLoop(bohrungAn(P, sA, bahnLen - sA), SEG_INT, 0.3);
  }, path, { flip: true });

  /* Ringflächen an beiden Stirnflächen — ohne sie ist der Bogen eine
     offene Schale und der Schnitt zeigt Löcher. */
  const geos = [outer, inner];
  for (const [idx, flip] of [[0, true], [path.length - 1, false]]) {
    const st = path[idx];
    const sA = idx === 0 ? 0 : bahnLen;
    const ring = new THREE.RingGeometry(
      bohrungAn(P, sA, bahnLen - sA), hautAn(P, sA, bahnLen - sA), SEG_VIS, 1
    );
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, flip ? -1 : 1), st.t.clone().normalize()
    );
    ring.applyQuaternion(q);
    ring.translate(st.c.x, st.c.y, st.c.z);
    const n = ring.attributes.position.count;
    ring.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n), 1));
    geos.push(ring);
  }

  /* Schnittkappe. Die Ebene z = 0 enthält die ganze Bahn, schneidet den
     Schlauch also der Länge nach auf — und zwar auf BEIDEN Seiten der
     Bahn. Die Kappe besteht deshalb aus zwei Bändern, nicht aus einem:
     je eines zwischen Haut und Bohrung links und rechts der Mittellinie.
     Mit nur einem Band bliebe die halbe Wand im Schnitt offen. */
  const bandA = [], bohrA = [], bandB = [], bohrB = [];
  path.forEach((st, i) => {
    const sA = (i / (path.length - 1)) * bahnLen;
    const rH = hautAn(P, sA, bahnLen - sA);
    const rB = bohrungAn(P, sA, bahnLen - sA);
    const nx = -st.t.y, ny = st.t.x;          // Normale in der Bahnebene
    bandA.push([st.c.x + nx * rH, st.c.y + ny * rH]);
    bohrA.push([st.c.x + nx * rB, st.c.y + ny * rB]);
    bandB.push([st.c.x - nx * rH, st.c.y - ny * rH]);
    bohrB.push([st.c.x - nx * rB, st.c.y - ny * rB]);
  });
  const cap = mergeGeometries([
    polygonCap([...bandA, ...bohrA.slice().reverse()]),
    polygonCap([...bandB, ...bohrB.slice().reverse()]),
  ]);

  return { geo: mergeGeometries(geos), cap, bahn: path, bahnLen };
}
