/* K-Aqua Rohrschelle — Kontur.

   Vier Teile, vier Werkstoffe. Kein CSG:

     1. Zwei PP-Halbschalen als Teilrotationskörper. revolve() nimmt eine
        thetas-Liste — ein Bogen von gapDeg bis 180−gapDeg ist also ein
        gewöhnlicher Revolve über einen Teilwinkel, keine geschnittene
        Vollschale.
     2. Zwei Gummieinlagen, gleicher Aufbau, dünner und weiter innen.
     3. Vier Schraubenteile: zwei Sechskantköpfe (hexPrism) auf zwei
        Schäften (revolve).
     4. Ein Mutterblock unten: Sechskant mit durchgehender Bohrung.

   Die Laschen sind roundedPad-Klötze — dieselbe Funktion, mit der der
   Kugelhahn seine Hebelnabe baut. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile, hexPrism,
  roundedPad, polygonCap, D2R, SEG_VIS, SEG_INT,
} from '../../core/index.js';
import * as THREE from 'three';

/* Teilwinkel-Abtastung: von a bis b Grad, n Schritte. */
function arcThetas(aDeg, bDeg, n) {
  const out = [];
  for (let i = 0; i <= n; i++) out.push((aDeg + (bDeg - aDeg) * (i / n)) * D2R);
  return out;
}

/* Eine Halbschale: Profil in der Schnittebene (a = Rohrachse, r = Radius),
   um die X-Achse über einen Teilwinkel gedreht. */
function shellHalf(P, rIn, rOut, width, thetas, wear) {
  const x0 = -width / 2, x1 = width / 2;
  const ch = Math.min(0.8, (rOut - rIn) * 0.22);
  const profile = buildProfile([
    { a: x0, r: rIn, chamfer: ch, w: wear },
    { a: x0, r: rOut, chamfer: ch, w: wear },
    { a: x1, r: rOut, chamfer: ch, w: wear },
    { a: x1, r: rIn, chamfer: ch, w: wear },
  ], { segs: 3 });
  return { geo: revolve(profile, { axis: 'x', thetas }), profile };
}

export function buildShells(P) {
  const geos = [];
  const n = Math.max(24, Math.round(SEG_VIS / 3));
  /* Obere und untere Schale, jeweils um gapDeg von der Teilungsebene
     zurückgesetzt — dort sitzen die Laschen. */
  for (const off of [0, 180]) {
    const th = arcThetas(off + P.gapDeg, off + 180 - P.gapDeg, n);
    geos.push(shellHalf(P, P.rShellIn, P.rOut, P.width, th, 0.3).geo);
  }

  /* Vier Laschen: an jedem Schalenende ein Klotz, durch den die
     Schraube geht. Sie liegen auf der Teilungsebene z = 0. */
  for (const side of [1, -1]) {
    for (const half of [1, -1]) {
      const pad = roundedPad(P.lugLen, P.lugWidth, P.lugThick,
        Math.min(2.5, P.lugThick * 0.35));
      pad.rotateY(Math.PI / 2);
      pad.rotateX(Math.PI / 2);
      const rMid = (P.rShellIn + P.rOut) / 2;
      pad.translate(0, half * (rMid + P.lugLen * 0.12), side * (P.lugThick * 0.5 + rMid * 0.06));
      geos.push(pad);
    }
  }
  return { geo: mergeGeometries(geos), cap: null };
}

export function buildRubber(P) {
  const geos = [];
  const n = Math.max(20, Math.round(SEG_INT / 2));
  for (const off of [0, 180]) {
    const th = arcThetas(off + P.gapDeg + 1, off + 179 - P.gapDeg, n);
    geos.push(shellHalf(P, P.rInner, P.rShellIn, P.width * 0.92, th, 0.1).geo);
  }
  return { geo: mergeGeometries(geos), cap: null };
}

/* Zwei Schrauben: Sechskantkopf plus Schaft, liegend in Z-Richtung.

   Jede Seite wird in IHRER Richtung aufgebaut, ohne Spiegelung nach dem
   Verschieben. Ein rotateY(pi) nach dem translate dreht um die Welt-Y-
   Achse und wirft die Schraube auf die Gegenseite zurück — beide lägen
   dann übereinander bei +z, und eine Lasche bliebe ohne Schraube.
   Reihenfolge von Drehung und Verschiebung ist nicht vertauschbar. */
export function buildBolts(P) {
  const geos = [];
  const rMid = (P.rShellIn + P.rOut) / 2;
  const len = P.lugThick * 2 + rMid * 0.12 + 4;
  const y = rMid + P.lugLen * 0.12;

  for (const side of [1, -1]) {
    /* Profil einmal je Seite: Kopf am aeusseren Ende, Schaft zur Mitte.
       Beides in der Profilkoordinate a aufgebaut, danach in Z gedreht —
       das Vorzeichen steckt im Profil, nicht in einer Nachdrehung. */
    const head = hexPrism(P.boltHeadAF, P.boltHeadH, 0.3, 0);
    const shaft = revolve(buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: P.boltD / 2, chamfer: 0.4 },
      { a: len, r: P.boltD / 2, chamfer: 0.5 },
      { a: len, r: 0, fillet: 0 },
    ], { segs: 3 }), { axis: 'x', segments: 24 });

    const g = mergeGeometries([head, shaft]);
    /* Kopf sitzt bei a = 0, Schaft laeuft nach +a. Die Achse X wird zu
       Z: fuer side = +1 nach +Z, fuer side = -1 nach -Z. Genau dafuer
       gibt es zwei verschiedene Rotationen, keine Spiegelung. */
    g.rotateY(side > 0 ? Math.PI / 2 : -Math.PI / 2);
    g.translate(0, y, side * (len + P.boltHeadH));
    geos.push(g);
  }
  return { geo: mergeGeometries(geos), cap: null };
}

/* Mutterblock unten: Sechskant mit DURCHGEHENDER Gewindebohrung.

   Die Bohrung ist Teil der Kontur, kein nachtraeglicher Abzug: ein
   THREE.Shape mit Sechskant-Aussenkontur und Kreis-Innenkontur wird in
   einem Zug trianguliert — dasselbe Verfahren wie plateWithHoles beim
   Bundflansch. Kein CSG.

   Eine erste Fassung erzeugte die Bohrung separat und gab sie neben der
   Geometrie zurueck, ohne sie zu verbauen. Der Block war massiv,
   waehrend der Hotspot ein Innengewinde behauptete. Deshalb liefert
   diese Funktion nur EINE Geometrie — es gibt nichts, was der Aufrufer
   vergessen koennte. */
export function buildNutBlock(P) {
  const h = P.nutH;
  const bevel = 0.4;
  const R = P.nutAF / Math.sqrt(3);               // Umkreis des Sechskants
  const rBore = P.threadM / 2;

  /* Bevel-Kompensation wie in plateWithHoles: ExtrudeGeometry addiert
     nach aussen, also Aussenkontur kleiner und Innenkontur groesser. */
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const t = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const rr = R - bevel;
    const x = rr * Math.cos(t), yy = rr * Math.sin(t);
    if (i === 0) shape.moveTo(x, yy); else shape.lineTo(x, yy);
  }
  shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, 0, rBore + bevel, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.1, h - bevel * 2), bevelEnabled: true,
    bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 20,
  });
  /* Extrusion laeuft in +Z; die Blockachse soll senkrecht nach unten
     zeigen. Erst drehen, dann verschieben. */
  geo.rotateX(Math.PI / 2);
  const top = -(P.rOut + h * 0.05);
  geo.translate(0, top - h + bevel, 0);
  const n = geo.attributes.position.count;
  geo.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.4), 1));
  if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  return { geo, cap: null, rBore, top, bottom: top - h };
}
