/* K-Aqua 3D · Batterieanschluss mit Innengewinde — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID valves/battery-female-thread.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_INT, SEG_VIS, branchJoin, buildProfile, capFromProfile, createAssembly, fusionDepth, materials, mergeGeometries, revolve, roundedPad, socketOD, threadRing, threadSpec,
} from '../kaqua-3d-core.mjs';

/* == _battery/parts.js ================================================= */
/* K-Aqua Batterieanschlüsse — gemeinsame Kontur.

   Zwei Produkte, ein Bauelement: der WINKELBLOCK — senkrechter
   Muffenkörper (Zulauf oben), waagerechter Anschlussblock mit
   Rp-Messingring (zur Armatur, +Z). Beim festen Batterieanschluss
   sitzen zwei davon auf einem verrippten Steg; beim verstellbaren
   gleiten sie als Böcke auf Rohrschienen.

   Kein CSG: die Fuge Muffenkörper/Block macht branchJoin aus dem Core,
   wie bei jedem Abzweig. */


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


/* == battery-female-thread/data.js ===================================== */
/* K-Aqua Batterieanschluss mit Innengewinde — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 108,
   mittlere Tabelle „Battery (Female thread)". Zwei Größen. Textebene
   am 25.08.2026 ausgelesen; Spaltenköpfe wie abgebildet:
     Code · d · Rp · L · L1 · kg · Pack.

   MASSSCHLÜSSEL (Skizze S. 108: zwei Rp-Marken, drei d-Marken, L und
   L1 über die Breite):
     d    Nennmaß der Schweißmuffen (oben, Zulauf)
     Rp   Innengewinde der beiden Anschlussblöcke (vorn, zur Armatur)
     L    Achsabstand der beiden Rp-Anschlüsse — 150 mm, das
          Standard-Armaturenmaß
     L1   Gesamtlänge über die Blöcke

   DIE GEGENPROBE, die die Blockdicke festlegt: L1 − L = 35 in beiden
   Zeilen — exakt das D der ½"-Gewindereihe (AQ270G/AQ243G: ½" → 35).
   Die Endblöcke sind die bekannten ½"-Griffzonenkörper; ihre Dicke ist
   damit KEINE Annahme.

   Das Produktfoto AQ490G zeigt das Teil EINTEILIG: zwei Winkelblöcke
   (Muffe oben, Rp vorn), verbunden durch einen verrippten Flachsteg
   mit zwei Montagelöchern. Werkstoffe: PP-R grün + zwei Messingringe.

   kg 0,18/0,19 bei Pack 1: die Massenprobe unten rechnet das Netz
   dagegen (PP 0,9 · Messing 8,4 g/cm³). */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 2;

export const ARTICLES = [
  { code: 'AQ490G2012', d: 20, Rp: '1/2', L: 150, L1: 185, kg: 0.18, pack: 1 },
  { code: 'AQ490G2512', d: 25, Rp: '1/2', L: 150, L1: 185, kg: 0.19, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  Rp: 'Innengewinde',
  L: 'Achsabstand der Anschlüsse',
  L1: 'Gesamtlänge',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == battery-female-thread/params.js =================================== */
/* K-Aqua Batterieanschluss IG — Parametrik.

   Aus der Tabelle kommen d, Rp, L und L1; der Blockdurchmesser ist
   über L1 − L = 35 = D(½") der Gewindereihe belegt (data.js). Was das
   Foto beisteuert, ist als ASSUMPTION mit Herleitung markiert. */


export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  const th = threadSpec(a.Rp);
  if (!th) throw new Error('K-Aqua Batterie: kein Normmaß für Rp' + a.Rp);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.threadCore = Math.round((th.od - 2 * 0.640327 * th.pitch) * 100) / 100;

  P.len = a.L1;
  P.xEnd = a.L1 / 2;
  P.xAchse = a.L / 2;                    // Rp-Achsen bei ±L/2

  /* Der Block: Ø 35 = D(½") — belegt, keine Annahme. Er liegt
     waagerecht, Rp-Öffnung nach vorn (+Z). */
  P.blockOD = a.L1 - a.L;
  P.rBlock = P.blockOD / 2;

  /* Muffenkörper oben: Außen-Ø aus der Normreihe. */
  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.sockOD = socketOD(d) ?? Math.round(d * 1.45);
  P.rSock = P.sockOD / 2;
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* ASSUMPTION Bauhöhen, aus dem Produktfoto (Kasten B/H ≈ 2,09 bei
     L1 = 185 → Gesamthöhe ≈ 88 mm):
       Muffenmund bis Muffenachse? — der Muffenkörper steht senkrecht,
       seine Höhe = Schweißtiefe + Grund + Fuge. Rp-Achse liegt
       DARUNTER; Achsversatz v ≈ 45 mm. Die Massenprobe hält die
       Annahme fest. */
  P.vAchse = 45;                          // Muffenachse (oben) → Rp-Achse
  P.muffH = P.socket + 6;                 // Muffenkörper über der Fuge
  P.blockLen = Math.round(P.blockOD * 1.05);   // Blocktiefe in Z, aus dem Foto
  /* Ringlänge: erste Annahme 0,62·Block wog +16/+20 % gegen die
     kg-Spalte — die Massenprobe hat sie auf 0,50·Block geschärft. */
  P.ringLen = Math.round(P.blockLen * 0.50);

  /* Messingring: Sitz wie bei der IG-Muffe (threadRing bringt die
     0,15-mm-Senkung mit). */
  P.rRing = Math.min(P.threadOD / 2 + Math.max(2.0, 0.14 * P.threadOD), P.rBlock - 2.5);
  P.turns = Math.max(4, Math.floor((P.ringLen - 2) / P.threadPitch));

  /* Steg: Flachbalken mit Fachwerkrippen und zwei Montagelöchern —
     alles ASSUMPTION aus dem Foto. */
  P.stegH = 26;
  P.stegT = 7;
  P.stegLochR = 3.2;
  P.stegLochX = 37;                       // Lochabstand von der Mitte

  if (P.rRing <= P.threadOD / 2 + 1.2) {
    throw new Error('K-Aqua Batterie d' + d + ': Ringwand zu dünn');
  }
  if (P.vAchse < P.rSock + P.rBlock * 0.4) {
    throw new Error('K-Aqua Batterie d' + d + ': Achsversatz trägt die Körper nicht');
  }
  return P;
}


/* == battery-female-thread/parts.js ==================================== */
/* K-Aqua Batterieanschluss IG — Konturen.

   Alles kommt aus ../_battery/: der Winkelblock (Muffe oben, Rp vorn),
   der Messingring und der verrippte Steg. Eigene Geometrie hat dieses
   Produkt nicht — es ist die feste Anordnung zweier Winkelblöcke. */


/* == battery-female-thread/index.js ==================================== */
/* K-Aqua Batterieanschluss mit Innengewinde — Produktpaket.

   Ein H-förmiges, einteiliges Spritzgussteil: zwei Winkelblöcke
   (Schweißmuffe oben, Rp-Anschluss vorn) auf einem verrippten Flachsteg
   mit zwei Montagelöchern. L = 150 ist der Standard-Armaturenabstand;
   die Blockdicke ist über L1 − L = D(½") belegt (data.js).

   Die Massenprobe ist hier die schärfste Zusicherung: das Teil wiegt
   laut Katalog 0,18/0,19 kg, und die beiden Messingringe (8,4 g/cm³)
   tragen davon etwa die Hälfte — eine falsche Ringgröße oder ein
   falscher Steg fliegt sofort auf. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

function netzVolumen(geo) {
  const p = geo.attributes.position.array;
  const idx = geo.index ? geo.index.array : null;
  const n = idx ? idx.length : p.length / 3;
  let v = 0;
  for (let i = 0; i < n; i += 3) {
    const a = (idx ? idx[i] : i) * 3;
    const b = (idx ? idx[i + 1] : i + 1) * 3;
    const c = (idx ? idx[i + 2] : i + 2) * 3;
    v += (
      p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1])
      - p[a + 1] * (p[b] * p[c + 2] - p[b + 2] * p[c])
      + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c])
    ) / 6;
  }
  return Math.abs(v);
}

const product = {
  id: 'valves/battery-female-thread',
  module: 'kaqua-battery-female-thread',
  titleDe: 'Batterieanschluss mit Innengewinde',
  titleEn: 'Battery (Female thread)',
  category: 'valves',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 20,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'Rp', 'L', 'L1', 'kg'],
  dimensions: ['L', 'L1'],
  ariaFields: ['d', 'Rp', 'L', 'L1'],

  variants: [],
  states: null,

  tile: 'Zwei Rp-Anschlüsse im Standardabstand 150 mm auf einem ' +
        'verrippten Steg — die Wandplatte für die Armatur.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Batterie_d' + size,
      materials: ['pprGreen', 'brass'],
      seed: 181,
      clipPlane,
    });

    const blockL = buildWinkelblock(P);
    const blockR = buildWinkelblock(P);
    blockL.geo.translate(-P.xAchse, 0, 0);
    if (blockL.cap) blockL.cap.translate(-P.xAchse, 0, 0);
    blockR.geo.translate(P.xAchse, 0, 0);
    if (blockR.cap) blockR.cap.translate(P.xAchse, 0, 0);
    const steg = buildSteg(P, P.xAchse - P.rBlock * 0.4);
    /* Der Steg sitzt hinter den Blöcken, auf halber Höhe. */
    steg.geo.translate(0, P.vAchse * 0.45, -P.rBlock + P.stegT * 0.4);

    const ringL = buildBatterieRing(P);
    const ringR = buildBatterieRing(P);
    ringL.geo.translate(-P.xAchse, 0, 0);
    if (ringL.cap) ringL.cap.translate(-P.xAchse, 0, 0);
    ringR.geo.translate(P.xAchse, 0, 0);
    if (ringR.cap) ringR.cap.translate(P.xAchse, 0, 0);

    /* Ein Teil, drei Geometrien: Spritzguss kennt hier keine Fuge —
       beide Blöcke und der Steg laufen als EIN Part, damit die
       Werkstoffzahl stimmt (Foto: grün + Messing, sonst nichts). */
    A.part('koerper', {
      name: 'Batteriekoerper', label: 'Batteriekörper (PP-R)', mat: 'pprGreen',
      geo: mergeGeometries([blockL.geo, blockR.geo, steg.geo]),
      cap: mergeGeometries([blockL.cap, blockR.cap].filter(Boolean)),
      anchor: V3(-P.xAchse - P.rBlock * 0.4, P.vAchse + 0.14 * P.len, 0),
    });
    A.part('ringL', {
      name: 'MessingringL', label: 'Messingring Rp' + P.Rp + '" links', mat: 'brass',
      geo: ringL.geo, cap: ringL.cap,
      explode: V3(0, 0, 0.4 * P.len),
      anchor: V3(-P.xAchse, -P.rBlock - 0.1 * P.len, P.blockLen / 2),
    });
    A.part('ringR', {
      name: 'MessingringR', label: 'Messingring Rp' + P.Rp + '" rechts', mat: 'brass',
      geo: ringR.geo, cap: ringR.cap,
      explode: V3(0, 0, 0.55 * P.len),
    });

    A.light(V3(-P.xAchse, P.vAchse * 0.5, 0));
    A.light(V3(P.xAchse, P.vAchse * 0.5, 0));

    A.hotspot({
      v: V3(0, P.vAchse * 0.45 + P.stegH * 0.3, -P.rBlock + P.stegT + 1),
      n: V3(0, 0.2, 1),
      text: 'Verrippter Montagesteg mit zwei Schraublöchern — er hält den ' +
        'Achsabstand L = ' + P.L + ' mm beim Einputzen',
    });
    A.hotspot({
      v: V3(P.xAchse, 0, P.blockLen / 2),
      n: V3(0, 0, 1),
      text: 'Rp ' + P.Rp + '" Innengewinde im Messingring — hier schraubt ' +
        'der S-Anschluss der Armatur ein',
    });

    const zf = P.rBlock + 6;
    A.dim({ label: 'L', value: P.L,
      a: V3(-P.xAchse, -P.rBlock - 14, zf), b: V3(P.xAchse, -P.rBlock - 14, zf),
      off: V3(0, -8, 0) });
    A.dim({ label: 'L1', value: P.L1,
      a: V3(-P.xEnd, -P.rBlock - 26, zf), b: V3(P.xEnd, -P.rBlock - 26, zf),
      off: V3(0, -8, 0) });

    A.measures = [
      { key: 'L1', label: DIMENSION_KEY.L1, soll: P.L1,
        ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.x - b.min.x); } },
      /* L: Abstand der Rp-Achsen — gemessen an den beiden Ringen. */
      { key: 'L', label: DIMENSION_KEY.L, soll: P.L,
        ist: () => {
          const l = A.boxOf(['ringL']), r = A.boxOf(['ringR']);
          return r2(((r.min.x + r.max.x) / 2) - ((l.min.x + l.max.x) / 2));
        } },
      /* Blockdurchmesser — die belegte Gegenprobe L1 − L = D(½"). */
      { key: 'block', label: 'Anschlussblock-Ø (= L1 − L)', soll: P.blockOD,
        ist: () => {
          const b = A.boxOf(['koerper']);
          return r2(b.max.x - b.min.x - P.L);
        } },
      { key: 'kern', label: 'Rp-Kerndurchmesser', soll: P.threadCore,
        ist: () => {
          const arr = ringL.geo.attributes.position.array;
          /* Fenster bodennah mit 1 mm Abstand — wie beim Innenventil-T:
             mündungsnah läuft das Gewinde aus (Δ −0,52 im zweiten Lauf),
             direkt am Boden liegt der Übergang zum Grund (7,35 im
             ersten). */
          const z0 = P.blockLen / 2 - P.ringLen + 1.0 + P.threadPitch * 0.6;
          const z1 = z0 + P.threadPitch * 1.8;
          let min = Infinity;
          for (let i = 0; i < arr.length; i += 3) {
            const z = arr[i + 2];
            if (z < z0 || z > z1) continue;
            const r = Math.hypot(arr[i] + P.xAchse, arr[i + 1]);
            if (r < min) min = r;
          }
          return isFinite(min) ? r2(2 * min) : NaN;
        } },
      /* DIE MASSENPROBE: Netzvolumen × Dichte gegen die kg-Spalte.
         Messing trägt hier rund die Hälfte des Gewichts. */
      { key: 'masse', label: 'Masse aus dem Volumen (PP 0,9 · CuZn 8,4)', soll: P.kg,
        ist: () => {
          let g = 0;
          for (const t of A.parts) {
            const dichte = /Messing/i.test(t.label || '') ? 8.4 : 0.9;
            let v = 0;
            t.obj.traverse((o) => { if (o.isMesh) v += netzVolumen(o.geometry); });
            g += (v * dichte) / 1e6;
          }
          return r2(g * 100) / 100;
        } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
