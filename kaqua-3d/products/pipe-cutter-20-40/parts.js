import * as THREE from 'three';
import { mergeGeometries, roundedPad } from '../../core/index.js';
import { buildGriff } from '../_handtools/parts.js';

/* Schere: Obergriff mit Klinge, Untergriff mit Amboss-Halbschale. */
export function buildSchere(P) {
  const geos = [];
  const oben = buildGriff(P.griffL, P.griffB, P.griffT);
  oben.rotateZ(-0.30);
  oben.translate(6, 8, 0);
  geos.push(oben);
  const klinge = roundedPad(P.klingeL, P.klingeH, P.klingeT, 6);
  klinge.rotateZ(0.5);
  klinge.translate(-P.klingeL * 0.42, P.klingeH * 0.25, 0);
  geos.push(klinge);
  const unten = buildGriff(P.griffL, P.griffB, P.griffT);
  unten.rotateZ(0.34);
  unten.translate(6, -10, 0);
  geos.push(unten);
  /* Amboss: C-förmige Auflage aus drei Pads. */
  const auflage = roundedPad(P.ambossR * 1.7, 14, P.griffT, 5);
  auflage.rotateZ(-0.25);
  auflage.translate(-P.ambossR, -P.ambossR * 0.72, 0);
  geos.push(auflage);
  const horn = roundedPad(14, P.ambossR, P.griffT, 5);
  horn.translate(-P.ambossR * 1.55, -P.ambossR * 0.2, 0);
  geos.push(horn);
  /* Gelenkbolzen. */
  const bolzen = roundedPad(16, 16, P.griffT + 6, 8);
  bolzen.translate(4, 0, 0);
  geos.push(bolzen);
  return { geo: mergeGeometries(geos), cap: null };
}
