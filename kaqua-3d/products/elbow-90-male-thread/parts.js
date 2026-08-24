/* K-Aqua Winkel 90° mit Außengewinde — Kontur.

   Zwei Teile, zwei Werkstoffe:
     1. PP-R-Körper: Winkel mit Schweißmuffe am einen Schenkel und
        Aufnahme für den Messingeinsatz am anderen
     2. Messingeinsatz: verzahnter Schaft im PP, davor das kegelige
        R-Gewinde (threadProfile)

   Keine neue Geometriefunktion. Der Winkel ist EIN Loft über eine
   Gerade-Bogen-Gerade-Bahn wie in products/_bend/parts.js; neu ist nur,
   dass die beiden Schenkel verschieden lang sind und verschiedene Enden
   haben. Kein CSG, kein Sechskant, keine Riffelung — Zeichnung und Foto
   zeigen einen glatten Körper und einen runden Zapfen.

   Die Funktionsnamen weichen bewusst von _bend/parts.js ab: der Bau
   verkettet Familien- und Produktdateien zu EINEM flachen Skript, und
   `boreAt` gibt es dort schon. */

import * as THREE from 'three';
import {
  DRAFT, SEG_FINE, SEG_INT, SEG_VIS, bendPath, buildProfile,
  capFromProfile, circleLoop, mergeGeometries, revolve, sweepPath,
  threadProfile
} from '../../core/index.js';

const smooth = (u) => {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
};

const SEAT_RAMP = 1.2;      // Übergang Einsatzsitz → Rohrbohrung
const SHOULDER = 3.0;       // Kegelschulter vom Gewindeschenkel auf den Bogen

/* Innenradius über der Bahn. sA ist die Bogenlänge ab der Stirnfläche
   der Muffe, sB die ab dem PP-Ende am Gewindeschenkel. Anders als beim
   symmetrischen Winkel sind die beiden Enden verschieden: vorne eine
   Schweißmuffe, hinten der Sitz für den Messingeinsatz. */
function boreAlong(P, sA, sB) {
  if (sA <= 0.001) return P.d / 2 + P.lead;
  if (sA <= 2) return P.d / 2 + P.lead * (1 - sA / 2);
  if (sA <= P.socket) return P.d / 2 - P.sockTaper * (sA - 2);
  if (sA <= P.socket + P.groundLen) {
    return P.rSockGround + (P.boreR - P.rSockGround) *
      smooth((sA - P.socket) / P.groundLen);
  }
  if (sB <= P.insertDepth) return P.rInsertOut + 0.05;
  if (sB <= P.insertDepth + SEAT_RAMP) {
    return (P.rInsertOut + 0.05) + (P.boreR - P.rInsertOut - 0.05) *
      smooth((sB - P.insertDepth) / SEAT_RAMP);
  }
  return P.boreR;
}

/* Außenradius über der Bahn. Der Muffenschenkel trägt D, der
   Gewindeschenkel den schlankeren Körper über dem Einsatz, davor der
   Absatz, den das Foto zeigt. */
function skinAlong(P, sA, sB, legB) {
  if (sA <= P.socket) return P.rOut - DRAFT * (P.socket - sA) * 0.5;
  if (sB <= P.collarLen) return P.collarR;
  if (sB <= P.collarLen + 1.2) {
    return P.collarR + (P.rLegB - P.collarR) * smooth((sB - P.collarLen) / 1.2);
  }
  if (sB >= legB - SHOULDER && sB <= legB) {
    return P.rLegB + (P.rOut - P.rLegB) * smooth((sB - (legB - SHOULDER)) / SHOULDER);
  }
  if (sB > legB) return P.rOut;
  return P.rLegB;
}

export function buildElbowBody(P) {
  const path = bendPath(P.l, 90, P.bendR, 24, 40, P.L1);
  let pathLen = 0;
  for (let i = 1; i < path.length; i++) pathLen += path[i].c.distanceTo(path[i - 1].c);

  /* Die beiden Endzonen dürfen sich nicht überschneiden — sonst
     überschreibt die eine die andere und die Bohrung bekommt eine Stufe,
     die niemand angeordnet hat. */
  const need = P.socket + P.groundLen + P.insertDepth + SEAT_RAMP;
  if (need >= pathLen) {
    throw new Error('K-Aqua ' + P.key + ': Muffe und Einsatzsitz brauchen ' +
      need.toFixed(1) + ' mm, die Bahn ist ' + pathLen.toFixed(1) + ' mm lang');
  }

  const legB = P.L1 - P.bendR;   // gerader Teil des Gewindeschenkels

  const outer = sweepPath((t) => {
    const sA = t * pathLen;
    return circleLoop(skinAlong(P, sA, pathLen - sA, legB), SEG_VIS, 0.15);
  }, path);

  const inner = sweepPath((t) => {
    const sA = t * pathLen;
    return circleLoop(boreAlong(P, sA, pathLen - sA), SEG_INT, 0.3);
  }, path, { flip: true });

  /* Ringflächen an beiden Stirnflächen. Ohne sie ist der Winkel eine
     offene Schale und die Schnittansicht zeigt Löcher. */
  const rings = [];
  for (const [idx, flip] of [[0, true], [path.length - 1, false]]) {
    const st = path[idx];
    const sA = idx === 0 ? 0 : pathLen;
    const rIn = boreAlong(P, sA, pathLen - sA);
    const rOutHere = skinAlong(P, sA, pathLen - sA, legB);
    const ring = new THREE.RingGeometry(rIn, rOutHere, SEG_VIS, 1);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, flip ? -1 : 1), st.t.clone().normalize());
    ring.applyQuaternion(q);
    ring.translate(st.c.x, st.c.y, st.c.z);
    const n = ring.attributes.position.count;
    ring.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.5), 1));
    rings.push(ring);
  }

  /* Auswerferstift-Marke auf dem Bogenrücken — ohne sie sieht das Teil
     nach CAD-Viewer aus (Visuelle Referenz §2.2). */
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

  return { geo: mergeGeometries([outer, inner, ...rings, disc]), cap: null, path, pathLen };
}

/* Messingeinsatz. Achse ist +Y — das ist der Gewindeschenkel der Bahn.
   Der Schaft trägt drei Ringzähne; die Zeichnung zeigt sie im Schnitt
   als Verankerung im PP. Sichtbar ist außen nur das Gewinde. */
export function buildStud(P) {
  const rThread = P.threadOD / 2;
  const yRoot = P.L1 - P.insertDepth;
  const step = P.insertDepth / 3;

  const teeth = [];
  for (let k = 0; k < 3; k++) {
    teeth.push({ a: yRoot + step * (k + 0.35), r: P.rInsertOut, fillet: 0.2 });
    teeth.push({ a: yRoot + step * (k + 0.75), r: P.rInsertOut - 0.9, fillet: 0.2 });
  }

  /* Gewindekontur ab dem PP-Ende bis zur Spitze, kegelig 1:16. */
  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'R')
    .map((p) => ({ a: P.L1 + p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= P.z1);

  const outer = [
    { a: yRoot, r: P.rInsertOut - 0.9, chamfer: 0.4 },
    ...teeth,
    { a: P.L1 - 0.8, r: P.rInsertOut, fillet: 0.3 },
    { a: P.L1, r: Math.min(P.rInsertOut, rThread + P.threadPitch * 0.2), chamfer: 0.5 },
    ...thread,
    { a: P.z1, r: rThread * 0.93 - P.threadLen / 32, chamfer: 0.8 },
  ];
  const inner = [
    { a: P.z1, r: P.boreR + 0.4, fillet: 0.5 },
    { a: P.L1, r: P.boreR, fillet: 0.6 },
    { a: yRoot, r: P.boreR, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  return {
    geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
    cap: capFromProfile(profile, 'y'),
    profile, yRoot,
  };
}
