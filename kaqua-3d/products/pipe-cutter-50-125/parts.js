import * as THREE from 'three';
import {
  buildProfile, revolve, mergeGeometries, roundedPad, arcPts, SEG_INT,
} from '../../core/index.js';
import { buildRundgriff } from '../_handtools/parts.js';

/* C-Bügel als Bogenzug aus Pads, Schneidrad, Kurbelgriff. */
export function buildSchneider(P) {
  const geos = [];
  const N = 9;
  for (let i = 0; i < N; i++) {
    const t = (i / (N - 1)) * Math.PI * 1.25 - Math.PI * 0.15;
    const seg = roundedPad(P.buegelR * 0.42, P.buegelB, P.buegelT, 5);
    seg.rotateZ(t + Math.PI / 2);
    seg.translate(P.buegelR * Math.cos(t), P.buegelR * Math.sin(t), 0);
    geos.push(seg);
  }
  /* Schneidrad unten. */
  const rad = revolve(buildProfile([
    { a: -3, r: 16, chamfer: 1 },
    { a: 3, r: 16, chamfer: 1 },
    { a: 3, r: 4, fillet: 0 },
    { a: -3, r: 4, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_INT });
  rad.rotateX(Math.PI / 2);
  rad.translate(P.buegelR * Math.cos(-Math.PI * 0.15), P.buegelR * Math.sin(-Math.PI * 0.15) - 10, 0);
  geos.push(rad);
  /* Kurbelgriff oben. */
  const griff = buildRundgriff(P.griffL, P.griffR);
  griff.rotateZ(-Math.PI / 2 - 0.5);
  griff.translate(-P.buegelR * 0.7, P.buegelR * 0.85, 0);
  geos.push(griff);
  return { geo: mergeGeometries(geos), cap: null };
}
