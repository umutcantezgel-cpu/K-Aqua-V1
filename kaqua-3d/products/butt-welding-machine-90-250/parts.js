import {
  mergeGeometries, roundedPad, revolve, buildProfile, SEG_INT,
} from '../../core/index.js';

/* Rote Bank mit Klemmbacken-Paaren (Halbring-Backen angedeutet). */
export function buildBank(P) {
  const geos = [];
  const bett = roundedPad(P.bettL, P.bettB, P.bettH, 8);
  geos.push(bett);
  for (const fx of [-P.bettL * 0.36, P.bettL * 0.36]) {
    const fuss = roundedPad(P.bettB * 0.85, 24, P.bettH, 6);
    fuss.rotateZ(Math.PI / 2);
    fuss.translate(fx, -P.bettB * 0.15 - 12, 0);
    geos.push(fuss);
  }
  return { geo: mergeGeometries(geos), cap: null };
}

export function buildBacken(P) {
  const geos = [];
  for (const fx of P.backenX) {
    const backe = revolve(buildProfile([
      { a: -9, r: P.backenR, chamfer: 2 },
      { a: 9, r: P.backenR, chamfer: 2 },
      { a: 9, r: P.backenR * 0.42, fillet: 0 },
      { a: -9, r: P.backenR * 0.42, fillet: 0 },
    ], { segs: 3 }), { axis: 'x', segments: SEG_INT });
    backe.translate(fx, P.backenR * 0.55, 0);
    geos.push(backe);
  }
  return { geo: mergeGeometries(geos), cap: null };
}
