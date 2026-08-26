import { mergeGeometries, roundedPad } from '../../core/index.js';

export function buildKasten(P) {
  const geos = [];
  const korpus = roundedPad(P.kastenB, P.kastenH, P.kastenT, 14);
  geos.push(korpus);
  const deckel = roundedPad(P.kastenB * 0.9, 24, P.kastenT * 0.9, 8);
  deckel.translate(0, P.kastenH / 2 + 10, 0);
  geos.push(deckel);
  return { geo: mergeGeometries(geos), cap: null };
}

export function buildFront(P) {
  const geos = [];
  const display = roundedPad(P.kastenB * 0.42, 40, 4, 3);
  display.translate(-P.kastenB * 0.12, P.kastenH * 0.18, P.kastenT / 2 + 1);
  geos.push(display);
  const tasten = roundedPad(P.kastenB * 0.3, 26, 4, 3);
  tasten.translate(P.kastenB * 0.2, -P.kastenH * 0.05, P.kastenT / 2 + 1);
  geos.push(tasten);
  return { geo: mergeGeometries(geos), cap: null };
}
