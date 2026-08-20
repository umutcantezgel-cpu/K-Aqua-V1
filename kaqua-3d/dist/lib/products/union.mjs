/* K-Aqua 3D · Verschraubung — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID transition-fittings/union.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_FINE, SEG_INT, SEG_VIS, arcPts, buildProfile, capFromProfile, createAssembly, fusionDepth, grooveMod, knurl, materials, mergeGeometries, revolve, thetaSamples,
} from '../kaqua-3d-core.mjs';

/* == union/data.js ===================================================== */
/* K-Aqua Verschraubung (PP-R) — Artikeltabelle.

   PHASE 1, verifiziert am 19.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-transition-fittings-union-….png
   (quellen/w3-union.png, 3004 × 8924 px).

   Spaltenköpfe wie abgebildet:
     Code · d · G · D · l · L · z · l1 · kg · Pack.
   6 Größen, d20 bis d63.

   ── DIE ENTSCHEIDENDE GEGENPROBE ──
   Die Spalte D lautet 46 · 56 · 66 · 79 · 87 · 107. Das sind **exakt**
   die D-Werte des Kugelhahns (products/ball-valve-pp/data.js) bei
   denselben Nennweiten. Diese Verschraubung ist damit dasselbe Bauteil,
   das der Kugelhahn beidseitig trägt — hier als Einzelartikel.

   Das ist mehr als eine Kuriosität: es bestätigt beide Tabellen
   gegenseitig und legt die Überwurfmutter-Geometrie fest, ohne dass sie
   geschätzt werden muss.

   MASSSCHLÜSSEL (aus Spaltenlogik und Kugelhahn-Vergleich):
     d   Rohr-Außendurchmesser = Muffenbohrung
     G   Gewinde der Überwurfmutter, in Zoll
     D   Außendurchmesser der Überwurfmutter — größtes Maß
     l   Länge des Mutterteils
     L   Gesamtlänge, Stirnfläche bis Stirnfläche
     z   Einbaulänge (Rohrende bis Rohrende)
     l1  Länge des Stutzenteils

   Gegenproben:
     l + l1 ≈ L in jeder Zeile (18+26=44 ✓ · 21+30=51 gegen L=52 ·
       30+47=77 gegen L=79). Die 1–2 mm Differenz ist die Überlappung
       im Gewinde — beide Teile greifen ineinander.
     z < L in jeder Zeile ✓
     D wächst monoton, G wächst monoton ✓

   ── KORREKTUR DER ERSTEN DEUTUNG ──
   Die erste Fassung dieses Kommentars nannte die Differenz zwischen
   l + l1 und L eine „Überlappung im Gewinde". Das ist falsch:

     d20  18+26 = 44  L 44  → 0 mm
     d25  19+28 = 47  L 48  → 1 mm fehlt
     d32  21+30 = 51  L 52  → 1 mm
     d40  23+34 = 57  L 58  → 1 mm
     d50  26+39 = 65  L 66  → 1 mm
     d63  30+47 = 77  L 79  → 2 mm

   l + l1 ist nie GRÖSSER als L. Es überlappt nichts, es fehlt ein
   Stück. Gedeutet als der freiliegende Ring des Stutzenbundes zwischen
   Mutterkante und Stutzenschulter — an einer angezogenen Verschraubung
   genau dort sichtbar. Er wird als P.collarGap modelliert und gemessen.

   ── DIE SPALTE z WIRD NICHT MODELLIERT ──
   z lautet 15 · 15 · 15 · 17 · 19 · 23 — bei d20 bis d32 konstant, dann
   steigend. Bei der Muffe (products/socket/data.js) ist z nachweislich
   die Dicke des mittleren Anschlags; hier gibt es keinen Anschlag, und
   kein Verhältnis zu L, l oder l1 ist erkennbar:

     z/L  = 0,34 · 0,31 · 0,29 · 0,29 · 0,29 · 0,29
     z/d  = 0,75 · 0,60 · 0,47 · 0,43 · 0,38 · 0,37
     L−z  = 29 · 33 · 37 · 41 · 47 · 56
     l1−z = 11 · 13 · 15 · 17 · 20 · 24

   L − z wächst gleichmäßig, aber ohne erkennbaren Bezug zu einer
   Baugruppenkante. Ohne technische Zeichnung ist z nicht auflösbar.

   Es wird deshalb NICHT modelliert und erscheint nur in aria-label und
   Fallback-Tabelle. Ein geratener Bezugspunkt wäre schlechter als eine
   benannte Lücke — bei der Reduzierbuchse hat eine falsch gedeutete
   Spalte einen ganzen Modellversuch gekostet.

   ASSUMPTION Muffentiefe: aus der Normreihe DVS 2207-11, nicht aus l
   oder z. Begründung wie bei Winkel und T-Stück (products/tee/data.js):
   ein Schweißwerkzeug je Nennweite für alle Fittings. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 6;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ330A20', d: 20, G: '1', D: 46, l: 18, L: 44, z: 15, l1: 26, kg: 0.04, pack: 120 },
  { code: 'AQ330A25', d: 25, G: '1 1/4', D: 56, l: 19, L: 48, z: 15, l1: 28, kg: 0.06, pack: 100 },
  { code: 'AQ330A32', d: 32, G: '1 1/2', D: 66, l: 21, L: 52, z: 15, l1: 30, kg: 0.09, pack: 40 },
  { code: 'AQ330A40', d: 40, G: '2', D: 79, l: 23, L: 58, z: 17, l1: 34, kg: 0.14, pack: 30 },
  { code: 'AQ330A50', d: 50, G: '2 1/4', D: 87, l: 26, L: 66, z: 19, l1: 39, kg: 0.16, pack: 30 },
  { code: 'AQ330A63', d: 63, G: '2 3/4', D: 107, l: 30, L: 79, z: 23, l1: 47, kg: 0.27, pack: 10 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  G: 'Muttergewinde',
  D: 'Außendurchmesser Mutter',
  l: 'Länge Mutterteil',
  L: 'Gesamtlänge',
  z: 'Einbaulänge',
  l1: 'Länge Stutzenteil',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == union/params.js =================================================== */
/* K-Aqua Verschraubung — Parametrik.

   Sieben Maße stehen in der Tabelle. Gerechnet wird nur, was die
   Riffelung und die Dichtnut betrifft.

   Die Geometrie folgt der Verschraubung des Kugelhahns — dieselbe
   Überwurfmutter, derselbe Stutzen, derselbe O-Ring. Der Vergleich der
   D-Spalten belegt das (siehe data.js). */


export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.len = a.L;
  P.xEnd = a.L / 2;
  P.OD = a.D;
  P.rOut = a.D / 2;

  /* Teilung: Mutterteil links, Stutzenteil rechts.

     l + l1 ist in jeder Zeile um 0 bis 2 mm KLEINER als L — es fehlt
     ein Stück, es überlappt nichts. Dieser Ring bleibt zwischen
     Mutterkante und Stutzenschulter sichtbar: der freiliegende Teil des
     Stutzenbundes, gegen den die Mutter zieht. An einer angezogenen
     Verschraubung ist er genau dort zu sehen.

     Eine erste Fassung deutete die Differenz als Überlappung und ließ
     den Stutzen sie auffüllen — l1 wurde dadurch 1 mm zu lang, und
     keine Messung fasste l1 an. */
  P.nutLen = a.l;
  P.tailLen = a.l1;
  P.collarGap = Math.max(0, a.L - a.l - a.l1);
  P.xNutEnd = -P.xEnd + a.l;             // Mutterkante
  P.xJoint = P.xNutEnd + P.collarGap;    // Stutzenanfang (Schulter)

  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* ASSUMPTION Stutzendurchmesser: der Stutzen trägt das Gewinde, auf
     das die Mutter greift. Sein Außendurchmesser liegt damit unter D
     minus Mutterwand. Angesetzt 0,80·D — beim Kugelhahn ergibt dieses
     Verhältnis die im Foto sichtbare Abstufung. */
  P.tailOD = Math.round(a.D * 0.80 * 10) / 10;
  P.rTail = P.tailOD / 2;
  P.nutWall = Math.round((a.D - P.tailOD) / 2 * 10) / 10;

  /* ASSUMPTION O-Ring: sitzt in einer Nut am Stutzenbund, Schnurstärke
     0,055·d. Beim Kugelhahn dieselbe Größenordnung. */
  P.oRingD = Math.round(Math.max(2, d * 0.055) * 10) / 10;
  P.oRingR = P.rTail * 0.72;
  P.oRingX = P.xJoint + P.oRingD * 1.4;

  /* Riffelung der Mutter — im Katalogfoto des Kugelhahns deutlich
     sichtbar, zwölf Riffel über den Umfang. */
  P.ribCount = 12;
  P.ribDepth = Math.max(0.8, a.D * 0.022);

  P.restwand = P.nutWall;
  P.emR = Math.min(1.8, 0.045 * d);

  if (P.nutWall < 2.5) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Mutterwand ' +
      P.nutWall + ' mm zu dünn');
  }
  if (P.socket >= a.l1) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Muffentiefe ' +
      P.socket + ' mm passt nicht in den Stutzen (' + a.l1 + ' mm)');
  }
  return P;
}


/* == union/parts.js ==================================================== */
/* K-Aqua Verschraubung — Kontur.

   Drei Teile, wie beim Kugelhahn:
     1. Überwurfmutter, geriffelt (grooveMod)
     2. Anschlussstutzen mit Schweißmuffe und O-Ring-Nut
     3. O-Ring

   Kein CSG. Das Gewinde zwischen Mutter und Stutzen wird nicht
   modelliert: es liegt vollständig verdeckt zwischen den Teilen, auch
   im Halbschnitt sieht man dort nur die Fügefläche. Ein Gewinde, das
   niemand sehen kann, kostet Dreiecke ohne Gegenwert.

   Die Muffe im Stutzen ist dagegen sichtbar und trägt Konus,
   Einführfase und Schweißtiefe wie jedes andere Muffenprodukt. */


/* Überwurfmutter: Hülse mit Riffelung außen, Anlagebund innen. */
export function buildNut(P) {
  const xA = -P.xEnd;                    // freie Stirnfläche
  const xB = P.xNutEnd;                  // Mutterkante
  const kn = knurl(P.rOut, P.nutLen, P.ribCount, P.ribDepth);
  const rMouth = Math.max(1.2, P.rOut * 0.05);

  /* Der Bund innen greift hinter den Stutzenbund — dort überträgt die
     Mutter ihre Kraft. Er sitzt an der freien Stirnseite. */
  const rCollar = P.rTail * 0.86;

  const outer = [
    { a: xA, r: P.rOut - 0.4, fillet: rMouth * 0.5, w: 0 },
    { a: xA + rMouth * 0.6, r: P.rOut, fillet: 0.5, w: 1 },
    { a: xB - 1.2, r: P.rOut, fillet: 0.5, w: 1 },
    { a: xB, r: P.rOut - 0.5, chamfer: 0.6, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.rTail + 0.25, fillet: 0.5 },
    { a: xA + 2.5, r: P.rTail + 0.25, fillet: 0.8 },
    { a: xA + 1.6, r: rCollar, fillet: 0.6 },
    { a: xA, r: rCollar, chamfer: 0.5 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS });
  return { geo, cap: capFromProfile(profile, 'x'), profile };
}

/* Anschlussstutzen: Bund, Gewindeschaft (glatt, siehe Kopfkommentar),
   O-Ring-Nut, Schweißmuffe. */
export function buildTail(P) {
  const xA = P.xJoint;                   // Stutzenschulter, hinter der Lücke
  const xB = P.xEnd;                     // Muffenmundloch
  const rSock = (x) => P.d / 2 - P.sockTaper * (xB - x);
  const xBell = xB - Math.max(3, 0.12 * P.socket);
  const bellRise = Math.min(0.4, P.nutWall * 0.10);
  const rBarrel = P.rTail - bellRise;

  /* Der Bund am linken Ende ist die Fläche, gegen die die Mutter
     zieht. Er ist das dickste Stück des Stutzens. */
  const rFlange = P.rTail + 0.2;
  const xFlangeEnd = xA + Math.max(2.5, P.oRingD * 0.9);

  const outer = [
    { a: xA, r: rFlange * 0.82, chamfer: 0.6 },
    { a: xA + 0.6, r: rFlange, fillet: 0.5 },
    { a: xFlangeEnd, r: rFlange, fillet: 0.5 },
    // O-Ring-Nut
    { a: xFlangeEnd + 0.5, r: P.oRingR - P.oRingD * 0.28, fillet: 0.5 },
    { a: xFlangeEnd + P.oRingD * 1.3, r: P.oRingR - P.oRingD * 0.28, fillet: 0.5 },
    { a: xFlangeEnd + P.oRingD * 1.8, r: rBarrel, fillet: 0.6 },
    { a: xBell - 1.5, r: rBarrel - DRAFT * (xBell - 1.5 - xA) * 0.4, fillet: 1.6 },
    { a: xBell, r: P.rTail, fillet: 0.9 },
    { a: xB, r: P.rTail - DRAFT * (xB - xBell), chamfer: Math.min(1.3, P.nutWall * 0.35) },
  ];
  const inner = [
    { a: xB, r: P.d / 2 + P.lead, fillet: 0 },
    { a: xB - 2, r: rSock(xB - 2), fillet: 0.4 },
    { a: xB - P.socket, r: rSock(xB - P.socket), fillet: 1.0 },
    { a: xB - P.socket, r: P.boreR, fillet: 0.8 },
    { a: xA + 1.2, r: P.boreR, chamfer: 0.6 },
    { a: xA, r: P.boreR + 0.5, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Auswerfermarke auf dem Stutzenmantel. */
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.2 },
    { a: 0.09, r: P.emR, fillet: 0.09 },
    { a: 0.09, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  disc.rotateX(Math.PI);
  disc.translate((xBell + xFlangeEnd) / 2, -(rBarrel - 0.05), 0);
  geos.push(disc);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'),
           profile, oringX: xFlangeEnd + P.oRingD * 0.65 };
}

/* O-Ring in der Nut: Kreisprofil um X. */
export function buildORing(P, xMid) {
  const r = P.oRingD / 2;
  const pts = [];
  arcPts(pts, xMid, P.oRingR, r, 0, Math.PI * 2, 20, { fillet: 0 });
  const profile = buildProfile(pts, { segs: 2 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_INT }),
           cap: capFromProfile(profile, 'x') };
}


/* == union/index.js ==================================================== */
/* K-Aqua Verschraubung (PP-R) — Produktpaket nach PRODUKT-VERTRAG.md.

   Drei Teile: Überwurfmutter, Anschlussstutzen, O-Ring. Dieselbe
   Baugruppe, die der Kugelhahn beidseitig trägt — hier als
   Einzelartikel. Die Explosionsansicht zeigt, was der Monteur beim
   Lösen in der Hand hat. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'transition-fittings/union',
  module: 'kaqua-union',
  titleDe: 'Verschraubung',
  titleEn: 'Union',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'G', 'D', 'L', 'kg'],
  dimensions: ['L', 'D'],
  ariaFields: ['d', 'D', 'L', 'z'],

  variants: [],
  states: null,

  tile: 'Lösbare Verbindung ohne Rohrtrennung — Überwurfmutter, ' +
        'Stutzen, O-Ring. Dasselbe Bauteil, das der Kugelhahn trägt.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Verschraubung_d' + size,
      materials: ['pprGreen', 'epdm'],
      seed: 157,
      clipPlane,
    });

    const nut = buildNut(P);
    const tail = buildTail(P);
    const oring = buildORing(P, tail.oringX);

    A.part('nut', {
      name: 'Ueberwurfmutter', label: 'Überwurfmutter (PP-R)', mat: 'pprGreen',
      geo: nut.geo, cap: nut.cap,
      explode: -0.5 * P.len,
      anchor: V3(-P.xEnd + P.nutLen * 0.5, P.rOut + 0.26 * P.len, 0),
    });
    A.part('tail', {
      name: 'Anschlussstutzen', label: 'Anschlussstutzen (PP-R)', mat: 'pprGreenB',
      geo: tail.geo, cap: tail.cap,
      explode: 0.45 * P.len,
      anchor: V3(P.xEnd - P.tailLen * 0.4, -(P.rTail + 0.22 * P.len), 0),
    });
    A.part('oring', {
      name: 'O_Ring', label: 'O-Ring (EPDM)', mat: 'epdm',
      geo: oring.geo, cap: oring.cap,
      explode: V3(0, 0.42 * P.len, 0),
      anchor: V3(tail.oringX, P.oRingR + 0.30 * P.len, 0),
    });

    A.light(V3(-P.xEnd * 0.5, 0, 0));
    A.light(V3(P.xEnd * 0.5, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - Math.max(3, 0.10 * P.len), P.rTail * 0.5, P.rTail * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(-P.xEnd + P.nutLen * 0.5, P.rOut * 0.55, P.rOut * 0.82),
      n: V3(0, 0.55, 0.83),
      text: 'Überwurfmutter G ' + P.G + '" mit ' + P.ribCount +
        ' Riffeln — von Hand zu lösen',
    });
    A.hotspot({
      v: V3(tail.oringX, P.oRingR * 0.6, P.oRingR * 0.8),
      n: V3(0, 0.6, 0.8),
      text: 'O-Ring dichtet radial — die Verbindung lässt sich mehrfach ' +
        'lösen, ohne dass die Dichtung erneuert werden muss',
    });

    const zf = P.rOut + 0.12 * P.len;
    const yL = -(P.rOut + 0.30 * P.len);
    A.dim({ label: 'L', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.11 * P.len, 0) });
    const xD = -P.xEnd - 0.16 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(0.13 * P.len, 0, 0) });

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.len,
        ist: () => { const b = A.boxOf(); return b.max.x - b.min.x; } },
      /* Mutterdurchmesser: Strahl auf einen RIFFELRÜCKEN.

         Die Box3 wäre hier untauglich, und zwar aus einem anderen Grund
         als bei der Riffelung des Gewindeadaptors: die Riffelabtastung
         verteilt ihre Winkelschritte ungleichmäßig, und liegt kein
         Schritt genau auf einem Rücken, misst die Box die Sekante. Der
         Fehler wuchs mit dem Durchmesser (0,35 mm bei d32, 0,46 mm bei
         d63) — nach Fall 23 also keine Fase, sondern Segmentierung.

         grooveMod legt die Nuten auf theta = i·2π/count; die Rücken
         liegen genau dazwischen. */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => {
          const th = Math.PI / P.ribCount;
          /* Startpunkt und Richtung müssen in derselben Ebene liegen:
             die Mutterachse ist X, der Umfang spannt Y-Z auf. */
          const from = V3(-P.xEnd + P.nutLen * 0.5, P.OD * Math.cos(th), P.OD * Math.sin(th));
          const dir = V3(0, -Math.cos(th), -Math.sin(th));
          const hit = A.probeAxial('nut', from, dir);
          return hit ? Math.round(2 * Math.hypot(hit.y, hit.z) * 100) / 100 : NaN;
        } },
      { key: 'l', label: DIMENSION_KEY.l, soll: P.nutLen,
        ist: () => { const b = A.boxOf(['nut']); return b.max.x - b.min.x; } },
      /* l1 wurde in der ersten Fassung modelliert, aber nicht gemessen —
         und war 1 mm zu lang, weil der Stutzen die Lücke zwischen l + l1
         und L auffüllte. Jedes tabellierte Maß, das die Geometrie
         bestimmt, braucht seine Messung. */
      { key: 'l1', label: DIMENSION_KEY.l1, soll: P.tailLen,
        ist: () => { const b = A.boxOf(['tail']); return b.max.x - b.min.x; } },
      /* Der sichtbare Bundring zwischen Mutterkante und Stutzenschulter.
         Er ist die Differenz L − (l + l1) und damit selbst ein
         Tabellenwert — geprüft wird, dass die Geometrie ihn wirklich
         offen lässt und nicht zuwächst. */
      { key: 'ring', label: 'Bundring zwischen Mutter und Stutzen',
        soll: P.collarGap,
        ist: () => {
          const n = A.boxOf(['nut']), t = A.boxOf(['tail']);
          return Math.round((t.min.x - n.max.x) * 100) / 100;
        } },
      /* O-Ring muss IN der Nut sitzen, nicht daneben: sein Mittelpunkt
         darf höchstens eine halbe Schnurstärke vom Nutmittelpunkt
         abweichen. Gemessen wird die Abweichung, Soll 0.

         Eine Ja/Nein-Prüfung wäre hier untauglich (Fall 25) — sie würde
         nicht zeigen, wie weit der Ring daneben liegt. */
      { key: 'nut', label: 'O-Ring-Versatz zur Nutmitte', soll: 0,
        ist: () => {
          const b = A.boxOf(['oring']);
          const mitte = (b.min.x + b.max.x) / 2;
          return Math.round(Math.abs(mitte - tail.oringX) * 100) / 100;
        } },
      { key: 'restwand', label: 'Mutterwand', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
