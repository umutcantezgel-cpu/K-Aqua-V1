import {
  mergeGeometries, roundedPad, loft,
} from '../../core/index.js';

/* Flacher Schaberkörper (rot) mit Stahlklinge vorn. */
export function buildSchaber(P) {
  const sek = (x, b, d, y0) => ({ x, pts: [
    { a: -d / 2 + y0, r: -b / 2 }, { a: -d / 2 + y0, r: b / 2 },
    { a: d / 2 + y0, r: b / 2 }, { a: d / 2 + y0, r: -b / 2 },
    { a: -d / 2 + y0, r: -b / 2 },
  ] });
  const koerper = loft([
    sek(0, P.breite * 0.7, P.dicke * 0.8, 2),
    sek(P.laenge * 0.35, P.breite, P.dicke, 0),
    sek(P.laenge * 0.8, P.breite * 0.9, P.dicke * 0.75, -2),
    sek(P.laenge, P.breite * 0.82, P.dicke * 0.5, -5),
  ]);
  return { geo: koerper, cap: null };
}

export function buildKlinge(P) {
  const k = roundedPad(16, P.klingenB, 2.2, 1.2);
  k.rotateY(Math.PI / 2);
  k.rotateZ(Math.PI / 2);
  k.translate(P.laenge + 5, -8, 0);
  return { geo: k, cap: null };
}
