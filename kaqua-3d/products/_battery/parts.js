/* K-Aqua Batterieanschlüsse — gemeinsame Kontur.

   Zwei Produkte, ein Bauelement: der WINKELBLOCK — senkrechter
   Muffenkörper (Zulauf oben), waagerechter Anschlussblock mit
   Rp-Messingring (zur Armatur, +Z). Beim festen Batterieanschluss
   sitzen zwei davon auf einem verrippten Steg; beim verstellbaren
   gleiten sie als Böcke auf Rohrschienen.

   Kein CSG: die Fuge Muffenkörper/Block macht branchJoin aus dem Core,
   wie bei jedem Abzweig. */

import * as THREE from 'three';
import {
  buildProfile, revolve, mergeGeometries, capFromProfile, branchJoin,
  threadRing, roundedPad, DRAFT, SEG_VIS, SEG_INT,
} from '../../core/index.js';

/* Ein Winkelblock, Ursprung auf der Rp-ACHSE (z = 0 ist die
   Blockmitte). Muffenachse senkrecht darüber bei y = +vAchse. */
export function buildWinkelblock(P) {
  const geos = [];

  /* Anschlussblock um Z: von hinten (−blockLen/2) nach vorn. Außen
     zylindrisch auf blockOD mit Stirnfase; innen Ringsitz und
     Durchgang. */
  const zA = -P.blockLen / 2, zB = P.blockLen / 2;
  const zRing = zB - P.ringLen;
  const blockOuter = [
    { a: zA, r: P.rBlock - 0.8, chamfer: 0.8 },
    { a: zA + 1.2, r: P.rBlock, fillet: 0.5 },
    { a: zB - 1.2, r: P.rBlock, fillet: 0.4 },
    { a: zB, r: P.rBlock - 0.6, chamfer: 0.7 },
  ];
  const blockInner = [
    { a: zB, r: P.rRing, chamfer: 0.5 },
    { a: zRing, r: P.rRing, fillet: 0.5 },
    { a: zRing, r: P.boreR, fillet: 0.8 },
    { a: (zRing + zA) / 2, r: P.boreR, fillet: 0 },
    { a: zA, r: P.boreR, fillet: 0 },
  ];
  const blockProfile = buildProfile([...blockOuter, ...blockInner], { segs: 4 });
  geos.push(revolve(blockProfile, { axis: 'z', segments: SEG_VIS }));

  /* Fuge Block ↔ Muffenkörper. Der Muffenkörper zieht sich zur Fuge um
     1,4 mm ein (Entformungskonus) — bei d25 ist die Muffe außen bündig
     mit dem Block (socketOD 35 = L1 − L), und ohne den Einzug stünde
     die Kehle seitlich über das Tabellenmaß L1 hinaus. Der erste
     Maßtest hat genau das gefangen (+6 mm). */
  const rFuge = P.rSock - 1.4;
  const kehle = branchJoin({
    mainR: P.rBlock, branchR: rFuge, filletR: Math.min(1.4, 0.10 * P.rSock),
    angle: 90, segments: SEG_VIS, uSegs: 6,
  });
  geos.push(kehle.geo);

  /* Muffenkörper um Y: von der Eintauchtiefe bis zum Mund bei
     y = vAchse + muffH…  Der Mund liegt oben. */
  const yTop = P.vAchse;
  const y0 = -kehle.insertDepth;
  const rS = (y) => P.d / 2 - P.sockTaper * (yTop - y);
  const muffOuter = [
    { a: y0, r: rFuge, fillet: 0 },
    { a: y0 + P.rSock * 0.8, r: P.rSock, fillet: 1.2 },
    { a: yTop - 2.0, r: P.rSock, fillet: 0.5 },
    { a: yTop, r: P.rSock - 0.5, chamfer: 0.6 },
  ];
  const muffInner = [
    { a: yTop, r: P.d / 2 + P.lead, fillet: 0 },
    { a: yTop - 2, r: rS(yTop - 2), fillet: 0.4 },
    { a: yTop - P.socket, r: rS(yTop - P.socket), fillet: 1.0 },
    { a: yTop - P.socket, r: P.boreR, fillet: 0.8 },
    { a: (yTop - P.socket + y0) / 2, r: P.boreR, fillet: 0 },
    { a: y0, r: P.boreR, fillet: 0 },
  ];
  const muffProfile = buildProfile([...muffOuter, ...muffInner], { segs: 4 });
  geos.push(revolve(muffProfile, { axis: 'y', segments: SEG_VIS }));

  return {
    geo: mergeGeometries(geos),
    cap: mergeGeometries([
      capFromProfile(blockProfile, 'z'),
      capFromProfile(muffProfile, 'y'),
    ].concat(kehle.cap ? [kehle.cap] : [])),
  };
}

/* Der Rp-Messingring des Blocks. threadRing kennt nur die X- und die
   Y-Achse (revolve fällt bei allem anderen still auf Y zurück — der
   erste Wurf stand deshalb QUER im Block und jede Messung las NaN).
   Also: um Y bauen, dann auf die Z-Achse drehen. */
export function buildBatterieRing(P) {
  const ring = threadRing({
    a0: P.blockLen / 2 - P.ringLen,
    a1: P.blockLen / 2,
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

/* Der verrippte Flachsteg des festen Batterieanschlusses: drei
   Balkensegmente mit zwei Lochhülsen dazwischen (echte Durchgänge ohne
   CSG), obenauf ein X-Fachwerk aus flachen Rippen — die Gestalt des
   Produktfotos. Liegt in der X-Y-Ebene, Rücken bei z = −stegT/2. */
export function buildSteg(P, xHalb) {
  const geos = [];
  const H = P.stegH, T = P.stegT, rL = P.stegLochR;
  const seg = (x0, x1) => {
    const pad = roundedPad(x1 - x0, H, T, 1.4);
    pad.translate((x0 + x1) / 2, 0, 0);
    geos.push(pad);
  };
  const hs = rL + 2.2;                    // Hülsenaußenradius
  seg(-xHalb, -P.stegLochX - hs);
  seg(-P.stegLochX + hs, P.stegLochX - hs);
  seg(P.stegLochX + hs, xHalb);
  for (const sx of [-P.stegLochX, P.stegLochX]) {
    /* Lochhülse: Ring, der die Balkenlücke füllt. */
    const huelse = buildProfile([
      { a: -T / 2, r: hs, chamfer: 0.4 },
      { a: T / 2, r: hs, chamfer: 0.4 },
      { a: T / 2, r: rL, fillet: 0 },
      { a: -T / 2, r: rL, fillet: 0 },
    ], { segs: 3 });
    const g = revolve(huelse, { axis: 'z', segments: SEG_INT });
    g.translate(sx, 0, 0);
    geos.push(g);
    /* Anschlussstücke oben/unten zwischen Hülse und Balken. */
    for (const sy of [1, -1]) {
      const brk = roundedPad(2 * hs, (H / 2 - hs) > 1 ? H / 2 - hs : 1.2, T, 0.8);
      brk.translate(sx, sy * (hs + Math.max(1.2, H / 2 - hs) / 2), 0);
      geos.push(brk);
    }
  }
  /* X-Fachwerk: je Feld (links, Mitte, rechts) zwei Diagonalrippen auf
     dem Rücken — das Muster des Produktfotos. */
  const feldW = (P.stegLochX - hs) * 0.9;
  const felder = [-(P.stegLochX + hs + feldW / 2), 0, P.stegLochX + hs + feldW / 2];
  for (const fx of felder) {
    for (const dir of [1, -1]) {
      const len = Math.hypot(feldW, H * 0.72);
      const rippe = roundedPad(len, 3, 2.0, 1.0);
      rippe.rotateZ(dir * Math.atan2(H * 0.72, feldW));
      rippe.translate(fx, 0, T / 2);
      geos.push(rippe);
    }
  }
  const geo = mergeGeometries(geos);
  return { geo, cap: null };
}
