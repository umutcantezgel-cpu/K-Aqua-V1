/* K-Aqua Winkel 90° mit Gewindeschenkel — gemeinsame Kontur.

   Ein 90°-Winkel, dessen zwei Schenkel VERSCHIEDEN sind: vorne eine
   Schweißmuffe für das Rohr, hinten ein Sitz für ein Messingteil. Beide
   Schenkel haben eigene Länge (die Bahn bekommt LB) und eigenen
   Außendurchmesser.

   Drei Produkte teilen ihn:
     transition-fittings/elbow-90-male-thread          Messingzapfen AG
     transition-fittings/elbow-bracket-90-female-thread      Ring IG
     transition-fittings/elbow-wall-bracket-90-female-thread Ring IG + Lasche

   Sie unterscheiden sich im Messingteil und in der Lasche, nicht im
   Körper. Dreimal dieselbe Rechnung würde driften (Fall 32) — deshalb
   steht sie hier und nicht dreimal im Produkt.

   Herkunft: bis zum 24.08.2026 stand dieser Körper in
   products/elbow-90-male-thread/parts.js. Beim Bau der beiden Laschen
   stellte sich heraus, dass er unverändert für sie taugt; verschoben,
   nicht umgeschrieben.

   Was das Produkt über P steuert:
     l, L1            Schenkelmaße ab der Achsenschnittstelle (A, B)
     rOut, rLegB      Außenradien der beiden Schenkel
     collarLen,
     collarR          Absatz vor dem Messing; collarLen = 0 heißt keiner
     socket,
     rSockGround,
     groundLen        Muffe am Schenkel A
     insertDepth,
     rInsertOut       Sitz des Messingteils am Schenkel B
     bendR, emR       Bogenradius, Auswerfermarke

   Kein CSG: Außenhaut, Innenhaut und zwei Ringflächen ergeben einen
   geschlossenen Körper. */

import {
  DRAFT, SEG_FINE, SEG_INT, SEG_VIS, bendPath, buildProfile,
  circleLoop, mergeGeometries, revolve, sweepPath,
} from '../../core/index.js';
import * as THREE from 'three';

/* Weiche Blende 0…1, für die Übergänge zwischen den Zonen. */
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
  /* Der Winkel kommt aus P, damit auch die 45°-Varianten diesen Körper
     tragen. Ohne P.angle bleibt es bei 90 — die drei Gewindeprodukte
     bauen damit Zeichen für Zeichen wie vorher. */
  const path = bendPath(P.l, P.angle ?? 90, P.bendR, 24, 40, P.L1);
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
