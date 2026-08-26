/* K-Aqua Verstellbarer Batterieanschluss — Kontur.

   Zwei gleiche SCHLITTEN, antiparallel: je ein Rohrstück mit
   Schweißmuffe am Außenende, darauf ein Anschlussbock mit
   Sechskant-Griffzone und Rp-Messingring (nach vorn, +Z), darunter ein
   Montagefuß. Verschieben der Schlitten gegeneinander verstellt den
   Anschlussabstand L — die Variantenachse des Produkts.

   Der Sechskant ist hier BELEGT: das Produktfoto AQ492G zeigt klar
   gefaste Griffköpfe (die Sechskant-Ausführung der Gewindefamilie). */

import * as THREE from 'three';
import {
  buildProfile, revolve, mergeGeometries, capFromProfile, branchJoin,
  threadRing, hexPrism, roundedPad, SEG_VIS, SEG_INT,
} from '../../core/index.js';

/* Ein Schlitten entlang X, Muffenmund bei x = 0 (nach −X offen), Rohr
   nach +X, Gesamtlänge len. Der Bock sitzt bei xBock, Rp nach +Z. */
export function buildSchlitten(P, len, xBock) {
  const geos = [];

  /* Muffenkörper + Rohrschiene als ein Rotationsprofil um X. */
  const rS = (x) => P.d / 2 - P.sockTaper * (0 - x) * -1;
  const outer = [
    { a: 0, r: P.rSock - 0.4, chamfer: 0.5 },
    { a: 1.0, r: P.rSock, fillet: 0.4 },
    { a: P.muffH - 1.5, r: P.rSock, fillet: 1.2 },
    { a: P.muffH + 2.5, r: P.rohrOD / 2, fillet: 1.0 },
    { a: len - 0.8, r: P.rohrOD / 2, chamfer: 0.6 },
  ];
  const inner = [
    { a: len - 0.8, r: P.schienenBore / 2, fillet: 0 },
    { a: (len + P.socket) / 2, r: P.schienenBore / 2, fillet: 0 },
    { a: P.socket, r: P.schienenBore / 2, fillet: 0.8 },
    { a: P.socket, r: P.d / 2 - P.sockTaper * P.socket, fillet: 1.0 },
    { a: 2, r: P.d / 2 - P.sockTaper * 2, fillet: 0.4 },
    { a: 0, r: P.d / 2 + P.lead, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  geos.push(revolve(profile, { axis: 'x', segments: SEG_VIS }));

  /* Anschlussbock: senkrechter Stutzen vom Rohr nach +Z mit
     Sechskantkopf. Die Fuge macht branchJoin (Hauptachse = Rohr). */
  const kehle = branchJoin({
    mainR: P.rohrOD / 2, branchR: P.rBlock * 0.55, filletR: 1.6,
    angle: 90, segments: SEG_INT, uSegs: 5,
  });
  kehle.geo.rotateX(-Math.PI / 2);          // Abzweig zeigt nach +Z
  kehle.geo.translate(xBock, 0, 0);
  geos.push(kehle.geo);

  const zBock0 = P.rohrOD / 2 - 1;
  const zKopf0 = zBock0 + P.bockH - P.bockLen * 0.55;
  const zTop = zBock0 + P.bockH;
  /* Hals unterm Kopf. */
  const hals = buildProfile([
    { a: zBock0 - 2, r: P.rBlock * 0.70, fillet: 0 },
    { a: zKopf0 + 1, r: P.rBlock * 0.70, fillet: 0.5 },
    { a: zKopf0 + 1, r: P.boreR * 0.9, fillet: 0 },
    { a: zBock0 - 2, r: P.boreR * 0.9, fillet: 0 },
  ], { segs: 3 });
  const halsGeo = revolve(hals, { axis: 'y', segments: SEG_INT });
  halsGeo.rotateX(Math.PI / 2);
  halsGeo.translate(xBock, 0, 0);
  geos.push(halsGeo);

  /* Sechskantkopf um die Z-Achse: hexPrism baut in +X, also drehen. */
  const kopfLen = zTop - zKopf0;
  /* bevel = 0: das Eckenmaß IST das Katalogmaß D = 35 der ½"-Reihe,
     und der Extrusions-bevel bläht den Querschnitt (erster Wurf: beide
     Strahlmaße +1,2 = 2·bevel). Die hexPrism-Doku sagt es ausdrücklich. */
  const kopf = hexPrism(P.afBlock, kopfLen, 0.4, 0);
  kopf.rotateY(-Math.PI / 2);               // +X → +Z
  kopf.translate(xBock, 0, zKopf0);
  geos.push(kopf);
  /* Ringsitz-Hülse im Kopf (innen), damit der Messingring gefasst ist. */
  const sitz = buildProfile([
    { a: zTop, r: P.rRing + 0.6, fillet: 0 },
    { a: zTop - P.ringLen - 1, r: P.rRing + 0.6, fillet: 0.4 },
    { a: zTop - P.ringLen - 1, r: P.boreR * 0.9, fillet: 0 },
    { a: zTop, r: P.boreR * 0.9, fillet: 0 },
  ], { segs: 3 });
  const sitzGeo = revolve(sitz, { axis: 'y', segments: SEG_INT });
  sitzGeo.rotateX(Math.PI / 2);
  sitzGeo.translate(xBock, 0, 0);
  geos.push(sitzGeo);

  /* Montagefüße: das Foto zeigt mehrere über die Länge — je Schlitten
     zwei, unter dem Bock und auf halber Schiene. */
  for (const fx of [xBock, xBock + (len - xBock) * 0.55]) {
    const fuss = roundedPad(P.fussB, P.fussH, P.fussT, 1.2);
    fuss.rotateX(Math.PI / 2);
    fuss.translate(fx, -(P.rohrOD / 2 + P.fussH * 0.1), -P.rohrOD / 2 + P.fussT / 2);
    geos.push(fuss);
  }

  return {
    geo: mergeGeometries(geos),
    cap: capFromProfile(profile, 'x'),
    zTop,
  };
}

/* Der Rp-Ring im Kopf, um Z (gebaut um Y, gedreht — threadRing kennt
   nur X und Y, siehe _battery/parts.js). */
export function buildBockRing(P, zTop) {
  const ring = threadRing({
    a0: zTop - P.ringLen,
    a1: zTop,
    rOuter: P.rRing,
    od: P.threadOD,
    pitch: P.threadPitch,
    turns: P.turns,
    axis: 'y',
  });
  ring.geo.rotateX(Math.PI / 2);
  if (ring.cap) ring.cap.rotateX(Math.PI / 2);
  return ring;
}
