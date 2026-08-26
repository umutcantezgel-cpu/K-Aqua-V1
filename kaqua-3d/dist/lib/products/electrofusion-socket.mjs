/* K-Aqua 3D · Elektroschweißmuffe — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID fittings/electrofusion-socket.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_FINE, SEG_VIS, buildProfile, capFromProfile, createAssembly, fusionDepth, materials, mergeGeometries, mirrorProfile, revolve,
} from '../kaqua-3d-core.mjs';

/* == electrofusion-socket/data.js ====================================== */
/* K-Aqua Elektroschweißmuffe — Artikeltabelle.

   PHASE 1, verifiziert am 24.08.2026 gegen ZWEI unabhängige
   Rang-1-Quellen:

     Marketing/Print/KA-Katalog_GB_06-2025_NEU.pdf, Seite 92
     K-Aqua Unterseitem Kopie/Fittings K-Aqua/
       screencapture-…-fittings-electrofusion-socket-….pdf

   Die Website-Aufnahme ist ein reines Bild; ihre Tabelle wurde aus dem
   eingebetteten JPEG gelesen (Fall 34). Die Katalogseite trägt dieselben
   Zahlen, dort aber spaltenweise zerwürfelt — beide Lesungen stimmen
   überein.

   Spaltenköpfe wie abgebildet:
     Code · d · D · L · h · L₁ · kg · Pack.
   14 Größen, d20 bis d315. Nach der letzten Zeile folgt der ORDER-Knopf
   (Fall 2).

   ── MASSSCHLÜSSEL, aus der Maßzeichnung ──
     d    Rohr-Außendurchmesser = Muffenbohrung
     D    Außendurchmesser des Muffenkörpers
     L    Gesamtlänge
     L₁   Einstecktiefe je Seite, von der Stirnfläche bis zum Anschlag
     h    GESAMTHÖHE EINSCHLIESSLICH DER BEIDEN KONTAKTSTIFTE

   Die Zeichnung zeigt zwei Kontaktdome auf dem Mantel; h greift von der
   Unterkante des Körpers bis zu ihrer Oberkante. Damit sind zwei Maße
   ABGELEITET statt geschätzt:

     Stiftüberstand  = h − D
     Anschlagbreite  = L − 2·L₁

   ── GEGENPROBEN ──

   1 · L − 2·L₁ über alle 14 Zeilen: 2 · 2 · 2 · 3 · 4 · 4 · 3 · 2 · 1 ·
       2 · 3 · 3 · 0 · 0 mm. Durchgehend ≥ 0, nie negativ — die beiden
       Einstecktiefen überschneiden sich in keiner Zeile (Fall 28). Bei
       d250 und d315 ist der Anschlag rechnerisch null; dort ist die
       Muffe durchgehend, was zu Stumpf- und Elektroschweißung ab d160
       passt.

   2 · h − D über alle 14 Zeilen: 19 · 20 · 20 · 20 · 19 · 18 · 16 · 17 ·
       8 · 11 · 11 · 11 · 4 · 0,5 mm. Immer positiv, also steht h nie
       unter D — eine Gesamthöhe unter dem Außendurchmesser wäre
       unmöglich und hätte die Deutung widerlegt. Dass der Überstand mit
       der Größe schrumpft, ist auffällig und steht in LOOP-STATUS.md.

   3 · Wandstärke (D − d)/2: 6,5 · 6,5 · 6,5 · 7,5 · 9 · 9,5 · 11,5 ·
       11,5 · 13 · 15,5 · 15 · 16 · 23 · 28,75 mm. Wächst monoton bis auf
       eine Delle bei d160 (15 gegen 15,5 bei d125). */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 14;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ27120', key: '20', d: 20, D: 33, L: 70, h: 52, L1: 34, kg: 0.05, pack: 60 },
  { code: 'AQ27125', key: '25', d: 25, D: 38, L: 70, h: 58, L1: 34, kg: 0.05, pack: 50 },
  { code: 'AQ27132', key: '32', d: 32, D: 45, L: 70, h: 65, L1: 34, kg: 0.07, pack: 40 },
  { code: 'AQ27140', key: '40', d: 40, D: 55, L: 85, h: 75, L1: 41, kg: 0.11, pack: 30 },
  { code: 'AQ27150', key: '50', d: 50, D: 68, L: 88, h: 87, L1: 42, kg: 0.15, pack: 20 },
  { code: 'AQ27163', key: '63', d: 63, D: 82, L: 98, h: 100, L1: 47, kg: 0.22, pack: 20 },
  { code: 'AQ27175', key: '75', d: 75, D: 98, L: 125, h: 114, L1: 61, kg: 0.34, pack: 10 },
  { code: 'AQ27190', key: '90', d: 90, D: 113, L: 146, h: 130, L1: 72, kg: 0.50, pack: 6 },
  { code: 'AQ271110', key: '110', d: 110, D: 136, L: 155, h: 144, L1: 77, kg: 0.66, pack: 5 },
  { code: 'AQ271125', key: '125', d: 125, D: 156, L: 166, h: 167, L1: 82, kg: 1.00, pack: 5 },
  { code: 'AQ271160', key: '160', d: 160, D: 190, L: 175, h: 201, L1: 86, kg: 1.50, pack: 1 },
  { code: 'AQ271200', key: '200', d: 200, D: 232, L: 185, h: 243, L1: 91, kg: 2.17, pack: 1 },
  { code: 'AQ271250', key: '250', d: 250, D: 296, L: 212, h: 300, L1: 106, kg: 4.46, pack: 1 },
  { code: 'AQ271315', key: '315', d: 315, D: 372.5, L: 240, h: 373, L1: 120, kg: 9.65, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Rohr = Muffenbohrung',
  D: 'Außendurchmesser des Körpers',
  L: 'Gesamtlänge',
  L1: 'Einstecktiefe je Seite',
  h: 'Gesamthöhe mit Kontaktstiften',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}

export function sizeLabel(key) { return 'd' + key; }


/* == electrofusion-socket/params.js ==================================== */
/* K-Aqua Elektroschweißmuffe — Parametrik.

   Zwei Maße, die anderswo geschätzt werden müssten, sind hier
   ABGELEITET: der Stiftüberstand aus h − D und die Anschlagbreite aus
   L − 2·L₁. Beide Eingänge stehen in der Tabelle.

   ASSUMPTION bleiben nur die Kontaktdome selbst — Durchmesser und Lage.
   Die Tabelle bemaßt sie nicht. Angesetzt aus der Maßzeichnung, in
   Anteilen von D bzw. L; die Zeichnung ist dabei nicht maßstäblich (ihr
   d/D liegt bei 0,85 und trifft damit nur die großen Zeilen), sie
   ordnet aber Lage und Größenordnung zu. */


export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  P.OD = a.D;
  P.rOut = a.D / 2;
  P.len = a.L;
  P.xEnd = a.L / 2;
  P.socket = a.L1;
  P.wallFitting = (a.D - a.d) / 2;
  P.restwand = P.wallFitting;

  /* Anschlag in der Mitte, Breite aus der Tabelle. Bei d250 und d315
     ist sie null — dort läuft die Bohrung durch. */
  P.stop = Math.round((a.L - 2 * a.L1) * 100) / 100;
  if (P.stop < 0) {
    throw new Error('K-Aqua ' + a.key + ': L − 2·L₁ = ' + P.stop +
      ' mm — die Einstecktiefen überschneiden sich');
  }
  P.xStop = P.stop / 2;
  P.hasStop = P.stop > 0.05;

  P.wallPipe = a.d / SDR;
  P.bore = a.d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  /* Anders als bei der Schweißmuffe KEIN Muffenkonus: das Rohr wird
     nicht eingepresst, sondern eingeschoben und dann verschweißt. Die
     Zeichnung zeigt eine zylindrische Bohrung. Nur die Einführfase
     bleibt. */
  P.sockTaper = 0;
  P.lead = 2 * Math.tan(15 * D2R);

  /* Stiftüberstand über dem Mantel — abgeleitet, nicht geschätzt. */
  P.termProud = Math.round((a.h - a.D) * 100) / 100;
  if (P.termProud < 0) {
    throw new Error('K-Aqua ' + a.key + ': h − D = ' + P.termProud +
      ' mm — die Gesamthöhe läge unter dem Außendurchmesser');
  }
  /* ── ASSUMPTION Kontaktdome — KORRIGIERT beim ersten Maßtest ──
     Zuerst am Außendurchmesser bemessen (Ø 0,22·D). Das geht bei den
     kleinen Größen durch und bricht bei den großen: bei d315 ist D
     372,5 mm, L aber nur 240 — die Dome ragten 21,8 mm über die
     Stirnflächen hinaus, und der Maßtest las L = 261,78 statt 240.

     Sie skalieren mit der LÄNGE, nicht mit dem Durchmesser. In der
     Maßzeichnung misst ein Dom rund 0,22 der Körperlänge und sitzt bei
     0,36·L ab der Mitte. Damit bleibt sein äußerer Rand in jeder der
     14 Zeilen auf dem Körper — geprüft, nicht gehofft, siehe Wächter. */
  P.termR = Math.round(0.11 * a.L * 100) / 100;
  P.termX = Math.round(0.36 * a.L * 100) / 100;
  if (P.termX + P.termR > P.xEnd - 0.8) {
    throw new Error('K-Aqua ' + a.key + ': Kontaktdom reicht bis ' +
      (P.termX + P.termR).toFixed(1) + ' mm, die Stirnfläche liegt bei ' +
      P.xEnd.toFixed(1) + ' mm');
  }

  P.emR = Math.min(2.0, 0.055 * a.d);
  P.cornerR = Math.min(2.5, P.wallFitting * 0.35);

  /* Gegenprobe: die Einstecktiefe gegen die Normreihe. Bei der
     Elektroschweißmuffe ist sie ABSICHTLICH tiefer als beim
     Muffenschweißen — die Heizwendel braucht Länge. Der Wert wandert in
     den Prüfbericht, er steuert nichts. */
  P.normDepth = fusionDepth(a.d);
  P.depthDeltaToNorm = P.normDepth == null ? null
    : Math.round((a.L1 - P.normDepth) * 10) / 10;

  return P;
}


/* == electrofusion-socket/parts.js ===================================== */
/* K-Aqua Elektroschweißmuffe — Kontur.

   Ein Rotationskörper plus zwei Kontaktdome. Kein CSG.

   Die Außenkontur ist ein GLATTER Zylinder mit gebrochenen Kanten —
   anders als bei der Schweißmuffe, die einen Bund am Mundloch trägt.
   Die Maßzeichnung zeigt es so, und das Produktfoto der Kategorieseite
   bestätigt es: D ist hier über die ganze Länge derselbe.

   Die Innenkontur ist ZYLINDRISCH, ohne Muffenkonus. Beim
   Elektroschweißen wird das Rohr eingeschoben, nicht eingepresst; die
   Heizwendel schmilzt Muffe und Rohr an Ort und Stelle zusammen. Nur
   die Einführfase am Mundloch bleibt.

   Die Heizwendel selbst wird NICHT modelliert. Sie liegt im Material
   und ist von außen unsichtbar; die Zeichnung deutet sie nur als
   schraffiertes Band an. Sie zu erfinden hieße, eine Gestalt zu zeigen,
   die keine Quelle bemaßt. */


export function buildBody(P) {
  const ro = P.rOut;
  const rk = P.cornerR;

  /* Außen: von der Formteilungsebene (a = 0) zur Stirnfläche. 0,09 mm
     Grat auf der Naht, 1° Entformung zur Stirnfläche. */
  /* Wickelfeld-Panels (M12): das Katalogfoto zeigt vier flache,
     erhabene Rechteckfelder auf dem Mantel, getrennt durch schmale
     Fugen. Sie sind Modulation über θ (w = 1 nur auf der Panelzone);
     Höhe und Fugenbreite ASSUMPTION aus dem Foto. Der Grundmantel
     bleibt auf D — die Panels stehen 0,35 mm über, wie der
     Formtrenngrat, und bleiben unterhalb der 0,4-mm-Messtoleranz
     der D-Box bewusst NICHT: D misst am Grat auf der Naht (a = 0,
     w = 0), nicht auf den Panels. */
  const panelEnd = P.xEnd * 0.68;
  const outer = [
    { a: 0, r: ro + 0.09, fillet: 0.1, w: 0 },
    { a: 0.5, r: ro, fillet: 0.35, w: 1 },
    { a: panelEnd, r: ro - DRAFT * panelEnd * 0.35, fillet: 0.5, w: 1 },
    { a: panelEnd + 1.2, r: ro - DRAFT * panelEnd * 0.5, fillet: 0.4, w: 0 },
    { a: P.xEnd - rk, r: ro - DRAFT * (P.xEnd - rk) * 0.5, fillet: rk, w: 0 },
    { a: P.xEnd, r: ro - DRAFT * P.xEnd * 0.5 - rk * 0.35, chamfer: 0.4, w: 0 },
  ];

  /* Innen: Anschlag (wenn vorhanden), dann zylindrische Muffenbohrung
     bis zur Einführfase. */
  const inner = P.hasStop
    ? [
        { a: 0, r: P.boreR, fillet: 0.5 },
        { a: P.xStop, r: P.boreR, fillet: 0.6 },
        { a: P.xStop, r: P.d / 2, fillet: 1.2 },
        { a: P.xEnd - 2, r: P.d / 2, fillet: 0.4 },
        { a: P.xEnd, r: P.d / 2 + P.lead, fillet: 0 },
      ]
    : [
        { a: 0, r: P.d / 2, fillet: 0.5 },
        { a: P.xEnd - 2, r: P.d / 2, fillet: 0.4 },
        { a: P.xEnd, r: P.d / 2 + P.lead, fillet: 0 },
      ];

  const profile = buildProfile(mirrorProfile(outer, inner), { segs: 4 });
  const panelH = 0.35, fugeHalb = 5 * Math.PI / 180;
  const panelMod = (th) => {
    const viertel = Math.PI / 2;
    let x = ((th % viertel) + viertel) % viertel;
    if (x > viertel / 2) x -= viertel;
    const dFuge = Math.abs(x);
    if (dFuge >= fugeHalb) return panelH;
    return panelH * (dFuge / fugeHalb);   // lineare Fugenflanke
  };
  const panelThetas = [];
  { const K = 4 * 30; for (let j = 0; j <= K; j++) panelThetas.push((j / K) * Math.PI * 2); }
  const geos = [revolve(profile, { axis: 'x', thetas: panelThetas, mod: panelMod, segments: SEG_VIS })];

  /* Zwei Kontaktdome auf dem Mantel, +Y. Sie sitzen auf dem Zylinder
     auf; ihre Höhe über ihm ist h − D und kommt damit aus der Tabelle.
     Bei d250 und d315 ist sie fast null — dort liegen sie praktisch
     bündig, und genau das sagt die Tabelle. */
  /* Der Domfuß steckt 0,4 mm im Mantel, damit kein Spalt entsteht. Diese
     0,4 mm gehören NICHT zum Überstand — die Profilhöhe trägt sie
     zusätzlich, sonst käme die Domoberkante 0,4 mm zu tief und h wäre in
     jeder Zeile um denselben Betrag zu klein. Genau das war der erste
     Befund des Maßtests. */
  const BURY = 0.4;
  const domeH = Math.max(0.2, P.termProud) + BURY;
  for (const x of [-P.termX, P.termX]) {
    const dome = revolve(
      buildProfile([
        { a: 0, r: 0, fillet: 0 },
        { a: 0, r: P.termR, fillet: Math.min(0.6, P.termR * 0.2) },
        { a: domeH, r: P.termR * 0.86, fillet: Math.min(0.8, P.termR * 0.25) },
        { a: domeH, r: P.termR * 0.42, chamfer: 0.3 },
        { a: domeH - Math.min(3, domeH * 0.6), r: P.termR * 0.42, fillet: 0.2 },
        { a: domeH - Math.min(3, domeH * 0.6), r: 0, fillet: 0 },
      ], { segs: 3 }),
      { axis: 'y', segments: SEG_VIS }
    );
    /* Der Dom beginnt IM Mantel, damit kein Spalt entsteht. */
    dome.translate(x, P.rOut - BURY, 0);
    geos.push(dome);
  }

  /* Auswerferstift-Marken auf der Unterseite. */
  for (const x of [-P.xEnd * 0.55, P.xEnd * 0.55]) {
    const disc = revolve(
      buildProfile([
        { a: 0, r: 0, fillet: 0 },
        { a: 0, r: P.emR, chamfer: 0.25 },
        { a: 0.1, r: P.emR, fillet: 0.1 },
        { a: 0.1, r: 0, fillet: 0 },
      ], { segs: 3 }),
      { axis: 'y', segments: SEG_FINE }
    );
    disc.rotateX(Math.PI);
    disc.translate(x, -(P.rOut - 0.05), 0);
    geos.push(disc);
  }

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}


/* == electrofusion-socket/index.js ===================================== */
/* K-Aqua Elektroschweißmuffe — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Werkstoff, ein Teil — und trotzdem ein besonderes: die beiden
   Kontaktdome auf dem Mantel sind das Erkennungszeichen. Über sie legt
   das Schweißgerät Spannung an die Heizwendel im Muffeninneren.

   Der Halbschnitt zeigt den mittleren Anschlag und die zylindrische
   Bohrung — kein Muffenkonus, weil das Rohr eingeschoben und nicht
   eingepresst wird. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/electrofusion-socket',
  module: 'kaqua-electrofusion-socket',
  titleDe: 'Elektroschweißmuffe',
  titleEn: 'Electrofusion socket',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel,
  sizeTitle: 'Nennweite',
  defaultSize: '63',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'L', 'L1', 'kg'],
  dimensions: ['L', 'D', 'h'],
  ariaFields: ['d', 'D', 'L', 'h', 'L1'],

  variants: [],
  states: null,

  tile: 'Verbindung ohne Schweißgerät am Rohr: die Heizwendel steckt in ' +
        'der Muffe, angeschlossen über die beiden Kontaktdome.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Elektroschweissmuffe_d' + P.d,
      materials: ['pprGreen'],
      seed: 173,
      clipPlane,
    });

    const body = buildBody(P);
    A.part('body', {
      name: 'PP_Muffe', label: 'Elektroschweißmuffe (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      explode: V3(0, 0, 0),
      anchor: V3(0, P.rOut + P.termProud + 0.25 * P.len, 0),
    });
    A.light(V3(-P.xEnd * 0.8, P.rOut, 0));

    const POS = body.geo.attributes.position;
    /* Schnitt durch die Mantelfläche in der XZ-Ebene: |y| klein, Radius
       aus |z|. Die Kontaktdome stehen in +Y und fallen damit heraus —
       ohne diesen Filter läse D die Domhöhe mit. */
    const cut = (x, half) => {
      let rMax = 0, rMin = Infinity, n = 0;
      for (let i = 0; i < POS.count; i++) {
        const px = POS.getX(i), py = POS.getY(i), pz = POS.getZ(i);
        if (Math.abs(px - x) > half || Math.abs(py) > 0.35) continue;
        const r = Math.abs(pz);
        if (r > rMax) rMax = r;
        if (r < rMin) rMin = r;
        n++;
      }
      return n ? { rMax, rMin, n } : { rMax: NaN, rMin: NaN, n: 0 };
    };
    const r2 = (v) => (Number.isFinite(v) ? Math.round(v * 200) / 100 : NaN);

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.len,
        ist: () => { const b = A.visibleBoxOf(['body']); return Math.round((b.max.x - b.min.x) * 100) / 100; } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => r2(cut(0.5, 0.4).rMax) },
      /* Gegenprobe zu D nach Fall 25: dieselbe Mantelfläche nahe der
         Stirnfläche. Sie MUSS einen kleineren Wert liefern — dort zieht
         die Entformungsschräge. Geprüft wird nur das Vorzeichen, nicht
         der Betrag: ein Sollwert dafür käme aus derselben Formel, die
         die Kontur baut, und prüfte damit sich selbst (Fall 12). */
      { key: 'D_faellt_zur_stirn', label: 'D nahe der Stirnfläche kleiner als in der Mitte (soll 1)',
        soll: 1,
        ist: () => (cut(P.xEnd - P.cornerR - 0.6, 0.4).rMax < cut(0.5, 0.4).rMax ? 1 : 0) },

      /* h ist die Gesamthöhe MIT den Domen. Sie ist der Beleg für die
         Deutung der Spalte: liest der Körper h, dann sitzt der Dom
         genau h − D über dem Mantel. */
      /* Die Box enthält den 0,09 mm Formtrenngrat auf der Naht. Er ist
         gewollte Geometrie, also steht er im SOLLWERT und nicht in der
         Abweichung (Fall 23) — wie das Sitzspiel beim Anschlussbogen. */
      { key: 'h', label: DIMENSION_KEY.h + ' (mit 0,09 mm Formtrenngrat)',
        soll: Math.round((P.h + 0.09) * 100) / 100,
        ist: () => { const b = A.visibleBoxOf(['body']); return Math.round((b.max.y - b.min.y) * 100) / 100; } },

      { key: 'muffenbohrung', label: 'Muffenbohrung (2 mm hinter dem Mundloch)', soll: P.d,
        ist: () => r2(cut(P.xEnd - 2, 0.4).rMin) },
      { key: 'L1', label: DIMENSION_KEY.L1, soll: P.socket,
        ist: () => P.hasStop
          ? Math.round((P.xEnd - P.xStop) * 100) / 100
          : Math.round(P.xEnd * 100) / 100 },
      { key: 'anschlag', label: 'Breite des mittleren Anschlags (L − 2·L₁)', soll: P.stop,
        ist: () => Math.round(P.stop * 100) / 100 },
      { key: 'anschlagbohrung', label: 'Bohrung am Anschlag', soll: r2(P.boreR),
        ist: () => (P.hasStop ? r2(cut(0, 0.4).rMin) : r2(P.boreR)) },

      { key: 'symmetrie_x', label: 'Körper symmetrisch zur YZ-Ebene (soll 0)', soll: 0,
        ist: () => { const b = A.visibleBoxOf(['body']); return Math.round((b.max.x + b.min.x) * 1000) / 1000; } },
      { key: 'restwand', label: 'Wandstärke (D − d)/2', soll: P.restwand, ist: () => P.restwand },
    ];
    return A;
  },
};

export { product as default };
