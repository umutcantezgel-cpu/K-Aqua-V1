/* K-Aqua 3D · Übergangsmuffe mit Innengewinde — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID transition-fittings/adaptor-socket-female-thread.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, ISO, SEG_VIS, buildProfile, capFromProfile, createAssembly, fusionDepth, grooveMod, knurl, materials, revolve, thetaSamples, threadRing, threadSpec,
} from '../kaqua-3d-core.mjs';

/* == adaptor-socket-female-thread/data.js ============================== */
/* K-Aqua Übergangsmuffe mit Innengewinde — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 94, obere
   Tabelle „Adaptor socket (Female thread)". Zeilenfolge und Werte am
   gerenderten Seitenbild abgelesen, nicht an der Textextraktion — die
   PDF-Textreihenfolge dieser Seite ist spaltenweise und vertauscht die
   Zeilen (dieselbe Falle wie auf S. 97).

   DIE WEBSITE-SEITE ZEIGT EIN ANDERES PRODUKT. Die Aufnahme
   „…-transition-fittings-adaptor-socket-female-thread-….png" trägt
   zwar diesen Titel, aber:
     · sie hat ÜBERHAUPT KEINE Gewindespalte — bei einem Gewindefitting
       unmöglich,
     · ihre Codes lauten AQ271xx statt AQ270G,
     · sie führt 14 Größen bis d315, während das größte Gewinde des
       ganzen Katalogs 4" bei d110 ist,
     · ihre Spalten heißen d · D · L · h · L1 und ihr Foto zeigt kein
       Messing.
   Das ist die Elektroschweißmuffe. Die Welle-4-Festlegung „nur d20–d63,
   status prototyp" stützte sich auf diese Tabelle und ist damit
   gegenstandslos: der Katalog bemaßt alle zwölf Größen vollständig.

   GEGENPROBE DER LESART: auf derselben Seite steht die Übergangsmuffe
   mit AUSSENgewinde (AQ243G). Deren Tabelle stimmt mit dem bereits
   gebauten Produkt in allen zwölf Zeilen und allen acht Spalten
   überein — Wert für Wert. Beide Tabellen wurden gleich gelesen; die
   eine ist damit für die andere bürge.

   ZWEITE GEGENPROBE: der Artikelcode verschlüsselt d und Gewinde
   (AQ270G**2034** = d20 × ¾"). Über alle zwölf Zeilen deckt sich der
   Code mit der d-Spalte UND der Rp-Spalte. Der Code ist eine dritte,
   von den Zahlenspalten unabhängige Quelle.

   MASSSCHLÜSSEL (Zeichnung S. 94, Achse senkrecht gezeichnet,
   Gewinde oben, Muffe unten):
     d   Rohr-Außendurchmesser = Muffenbohrung
     Rp  zylindrisches Innengewinde in Zoll (ISO 7-1)
     D   Außendurchmesser des Bundes am Gewindeende — größtes Maß
     D1  Außendurchmesser des Muffenteils
     l   Gesamtlänge
     z   siehe OFFENER PUNKT 1
     kg  Stückgewicht, Pack. Verpackungseinheit

   BAUART, am Katalogfoto S. 94 abgelesen: der Körper ist DURCHGEHEND
   grün. Das Messing ist ein eingebetteter Ring, von dem nur die
   Stirnfläche und das Gewinde frei liegen. Das unterscheidet dieses
   Teil von der AG-Muffe, wo der Messingzapfen mit Sechskant heraussteht.
   Beide Abschnitte des Mantels tragen senkrechte Facetten.

   OFFENER PUNKT 1 — die Spalte z ist nicht gedeutet.
   Geprüft und VERWORFEN wurde: z = l − Gewindetiefe − Muffentiefe.
   Mit den echten Muffentiefen aus der Muffentabelle des Katalogs
   ((l − z)/2 der Artikel AQ270xx) ergäbe das bei d20 × ½" 13,5 mm
   gegen tabellierte 11, bei d63 × 2" 13,5 gegen 19. Eine Deutung, die
   über die Zeilen nicht trägt, ist keine (Fall 28). Für die Geometrie
   wird z nicht gebraucht; der Wert steht hier, wird aber NICHT
   modelliert und NICHT gemessen (Fall 29).

   OFFENER PUNKT 2 — l = 165 bei d110 fällt aus der Reihe.
   Drei voneinander unabhängige Anzeichen:
     · l/d fällt monoton 2,05 → 1,64 → 1,38 → 1,35 → 1,14 → 1,08 →
       1,09 → 1,02 und springt dann auf 1,50;
     · die AG-Muffe ist in jeder anderen Zeile 12–51 mm LÄNGER als die
       IG-Muffe, bei d110 wäre sie 4 mm kürzer;
     · der Steg zwischen Muffengrund und Messingring wächst über elf
       Zeilen gleichmäßig von 9 auf 25 mm und betrüge bei d110 87 mm.
   Der Katalog ist hier die einzige Quelle — die Website zeigt ein
   anderes Produkt. Also NICHT geändert: das Modell baut 165 und zeigt
   damit genau das, was im Katalog steht. Wird die Zahl korrigiert, ist
   es eine Zahl. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 12;
export const SDR = 6;

export const ARTICLES = [
  { key: '20x1/2',   code: 'AQ270G2012',  d: 20,  Rp: '1/2',     D: 35,  D1: 29,  l: 41,  z: 11, kg: 0.07, pack: 200 },
  { key: '20x3/4',   code: 'AQ270G2034',  d: 20,  Rp: '3/4',     D: 43,  D1: 34,  l: 42,  z: 11, kg: 0.10, pack: 240 },
  { key: '25x1/2',   code: 'AQ270G2512',  d: 25,  Rp: '1/2',     D: 35,  D1: 34,  l: 41,  z: 11, kg: 0.07, pack: 200 },
  { key: '25x3/4',   code: 'AQ270G2534',  d: 25,  Rp: '3/4',     D: 43,  D1: 34,  l: 41,  z: 11, kg: 0.11, pack: 180 },
  { key: '32x3/4',   code: 'AQ270G3234',  d: 32,  Rp: '3/4',     D: 43,  D1: 43,  l: 44,  z: 11, kg: 0.11, pack: 160 },
  { key: '32x1',     code: 'AQ270G321',   d: 32,  Rp: '1',       D: 50,  D1: 43,  l: 48,  z: 12, kg: 0.15, pack: 130 },
  { key: '40x1_1/4', code: 'AQ270G40114', d: 40,  Rp: '1 1/4',   D: 62,  D1: 52,  l: 54,  z: 13, kg: 0.22, pack: 70 },
  { key: '50x1_1/2', code: 'AQ270G50112', d: 50,  Rp: '1 1/2',   D: 69,  D1: 64,  l: 57,  z: 14, kg: 0.24, pack: 48 },
  { key: '63x2',     code: 'AQ270G632',   d: 63,  Rp: '2',       D: 84,  D1: 79,  l: 68,  z: 19, kg: 0.49, pack: 30 },
  { key: '75x2_1/2', code: 'AQ270G75212', d: 75,  Rp: '2 1/2',   D: 113, D1: 99,  l: 82,  z: 22, kg: 0.81, pack: 14 },
  { key: '90x3',     code: 'AQ270G903',   d: 90,  Rp: '3',       D: 129, D1: 124, l: 92,  z: 27, kg: 1.44, pack: 6 },
  { key: '110x4',    code: 'AQ270G1104',  d: 110, Rp: '4',       D: 160, D1: 151, l: 165, z: 27, kg: 2.15, pack: 4, anmerkung: 'l aus der Reihe — siehe OFFENER PUNKT 2' },
];

/* Einschraubtiefe je Gewindegröße, in mm.

   NICHT GESCHÄTZT, sondern aus dem Katalog gerechnet: die AG-Muffe auf
   DERSELBEN SEITE führt l und z, und l − z ist genau der Teil des
   Fittings, der im Gegenstück verschwindet — also die Einschraubtiefe.
   Über alle zwölf AG-Zeilen hängt l − z ausschließlich von der
   Gewindegröße ab, nie von d:
     ½" 53−40 = 13    ¾" 58−42 = 16    1" 66−48 = 18
     1¼" 74−53 = 21   1½" 77−54 = 23   2" 92−65 = 27
     2½" 112−82 = 30  3" 143−111 = 32  4" 161−124 = 37

   GEGENPROBE gegen ISO 7-1, nutzbare Gewindelänge L2: 13,2 · 14,5 ·
   16,8 · 19,1 · 19,1 · 23,4 · 26,7 · 29,8 · 35,8. Die Katalogwerte
   liegen durchweg 0–4 mm darüber, mit der Größe wachsend — genau der
   Betrag, den die Dichtfläche vor dem Gewinde zusätzlich braucht. Zwei
   unabhängige Quellen, systematischer und erklärter Versatz (Fall 23).

   ASSUMPTION: die Muffe mit Innengewinde muss den Gegenzapfen so tief
   aufnehmen können, wie er einschraubt. Die nutzbare Gewindetiefe der
   IG-Muffe wird deshalb gleich der Einschraubtiefe des AG-Zapfens
   gesetzt. Das ist eine untere Schranke, scharf ausgenutzt.

   Steht bewusst HIER und nicht im Core: es gibt genau einen Verbraucher.
   Die anderen Innengewindeprodukte (_teethread, _bracket) leiten ihre
   Gewindelänge aus einer eigenen Tabellenspalte ab und brauchen sie
   nicht. Kommt ein zweiter Verbraucher, zieht sie in den Core um. */
const THREAD_ENGAGE = {
  '1/2': 13, '3/4': 16, '1': 18, '1 1/4': 21, '1 1/2': 23,
  '2': 27, '2 1/2': 30, '3': 32, '4': 37,
};

export function threadEngage(size) {
  const v = THREAD_ENGAGE[size];
  if (!v) throw new Error('K-Aqua: keine Einschraubtiefe für Rp' + size);
  return v;
}

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  Rp: 'Innengewinde',
  D: 'Außendurchmesser Bund',
  D1: 'Außendurchmesser Muffe',
  l: 'Gesamtlänge',
  z: 'z (Bedeutung offen)',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}


/* == adaptor-socket-female-thread/params.js ============================ */
/* K-Aqua Übergangsmuffe mit Innengewinde — Parametrik.

   Aus der Tabelle kommen d, Rp, D, D1 und l. Die Gewindemaße kommen
   aus der Normtabelle im Core (threadSpec), die Muffentiefe aus
   fusionDepth — das ist (l − z)/2 der Muffentabelle des Katalogs,
   nicht geschätzt.

   Die Länge teilt sich in drei Abschnitte, alle drei aus belegten
   Zahlen und nicht aus einem Verhältnis:
     Muffe   fusionDepth(d)             Katalog, Muffentabelle
     Steg    der Rest                   ergibt sich
     Messing threadEngage(Rp) + Sitz    Katalog, AG-Tabelle S. 94 */


export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  const th = threadSpec(a.Rp);
  if (!th) throw new Error('K-Aqua: kein Normmaß für Gewinde Rp' + a.Rp);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.threadH = 0.640327 * P.threadPitch;
  P.threadRd = Math.max(0.3, 0.137 * P.threadPitch);
  P.threadCore = Math.round((th.od - 2 * P.threadH) * 1000) / 1000;
  P.threadRootRise = Math.round(2 * P.threadRd * (1 / Math.sin(27.5 * D2R) - 1) * 1000) / 1000;

  P.len = a.l;
  P.xEnd = a.l / 2;                 // +x = Gewindestirn, −x = Muffenmund
  P.OD = a.D;
  P.rCollar = a.D / 2;              // Bund am Gewindeende
  P.rSleeve = a.D1 / 2;             // Muffenteil
  P.wallSleeve = (a.D1 - a.d) / 2;

  P.socket = fusionDepth(a.d) ?? Math.max(10, a.d * 0.55);
  P.wallPipe = a.d / 6;             // SDR 6, wie bei allen Fittings
  P.bore = a.d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);  // Einführfase am Muffenmund
  P.xNenn = -P.xEnd + 1.5;          // Ebene, in der die Muffe auf d liegt

  /* Messingring: nutzbare Gewindetiefe = Einschraubtiefe des Gegen-
     zapfens (Herleitung in data.js), dazu 1,5 mm Sitz unter dem
     Gewinde, damit der Ring am Grund noch Material trägt. */
  P.threadLen = threadEngage(a.Rp);
  P.brassLen = P.threadLen + 1.5;
  P.turns = Math.max(3, Math.floor((P.threadLen - 0.6) / P.threadPitch));

  /* Ringwand: 0,14·Gewinde-Außendurchmesser, mindestens 2 mm — und in
     jedem Fall so, dass außen noch 2,5 mm PP stehen bleiben. */
  P.rBrass = Math.min(
    P.threadOD / 2 + Math.max(2.0, 0.14 * P.threadOD),
    P.rCollar - 2.5,
  );
  P.brassWall = P.rBrass - P.threadOD / 2;

  /* Der Bund umschließt den Ring und läuft 2 mm darüber hinaus. */
  P.collarLen = P.brassLen + 2;
  P.xStep = P.xEnd - P.collarLen;   // Absatz D1 → D
  P.steg = a.l - P.socket - P.brassLen;

  /* Facetten des Mantels, im Katalogfoto sichtbar. Zahl nach derselben
     Regel wie bei der AG-Muffe, hier auf den Bund bezogen, weil er die
     Silhouette trägt. Die Nuten schneiden nach INNEN — D und D1 bleiben
     die größten Maße. */
  P.ribCount = Math.max(10, Math.round((Math.PI * a.D) / 6.5));
  P.ribDepth = Math.max(0.35, a.D * 0.012);

  if (P.wallSleeve < 2.4) {
    throw new Error('K-Aqua Übergangsmuffe IG ' + a.key + ': Muffenwand ' +
      P.wallSleeve.toFixed(2) + ' mm zu dünn');
  }
  if (P.brassWall < 1.5) {
    throw new Error('K-Aqua Übergangsmuffe IG ' + a.key + ': Ringwand ' +
      P.brassWall.toFixed(2) + ' mm — D = ' + a.D + ' trägt Rp' + a.Rp + ' nicht');
  }
  if (P.steg < 3) {
    throw new Error('K-Aqua Übergangsmuffe IG ' + a.key + ': Steg ' +
      P.steg.toFixed(1) + ' mm zwischen Muffengrund und Ring zu kurz');
  }
  if (P.xStep <= -P.xEnd + P.socket) {
    throw new Error('K-Aqua Übergangsmuffe IG ' + a.key +
      ': der Bund reicht in die Schweißmuffe');
  }
  if (P.threadCore <= P.bore) {
    throw new Error('K-Aqua Übergangsmuffe IG ' + a.key + ': Gewindekern ' +
      P.threadCore.toFixed(2) + ' liegt nicht über der Bohrung ' + P.bore.toFixed(2));
  }
  return P;
}


/* == adaptor-socket-female-thread/parts.js ============================= */
/* K-Aqua Übergangsmuffe mit Innengewinde — Kontur.

   Zwei Teile, zwei Werkstoffe, aber anders gefügt als bei der AG-Muffe:
   dort steht der Messingzapfen mit Sechskant heraus, hier liegt ein
   Messingring VERSENKT im grünen Körper. Frei liegen nur seine
   Stirnfläche und das Gewinde. Genau das zeigt das Katalogfoto S. 94 —
   der Körper ist von oben bis unten grün.

   Der Ring kommt aus dem Core (threadRing). Er stand vorher zweimal im
   Produktcode und ist am 24.08.2026 dorthin gezogen; dies ist der
   dritte Verbraucher und der erste, der ihn nicht als Kopie hat. */


/* PP-Körper: Schweißmuffe unten, Bund mit Ringsitz oben, dazwischen
   der Steg. Die Facetten laufen über beide Abschnitte durch und
   schneiden nach innen — D und D1 bleiben die größten Maße. */
export function buildBody(P) {
  const xA = -P.xEnd;
  const xStep = P.xStep;
  const xRing = P.xEnd - P.brassLen;
  const rSock = (x) => P.d / 2 - P.sockTaper * (x - P.xNenn);

  const kn = knurl(P.rCollar, P.len, P.ribCount, P.ribDepth);
  const rMouth = Math.max(1.0, P.rSleeve * 0.06);

  const outer = [
    { a: xA, r: P.rSleeve, fillet: rMouth, w: 0 },
    { a: xA + rMouth * 0.7, r: P.rSleeve - DRAFT * rMouth * 0.7, fillet: 0.4, w: 1 },
    { a: xStep, r: P.rSleeve, fillet: 0.6, w: 1 },
    { a: xStep + 0.8, r: P.rCollar, fillet: 0.6, w: 1 },
    { a: P.xEnd, r: P.rCollar, chamfer: 0.7, w: 0 },
  ];
  const inner = [
    { a: P.xEnd, r: P.rBrass, chamfer: 0.5, w: 0 },
    { a: xRing, r: P.rBrass, fillet: 0.5, w: 0 },
    { a: xRing, r: P.boreR, fillet: 0.6, w: 0 },
    { a: xA + P.socket, r: P.boreR, fillet: 1.0, w: 0 },
    { a: xA + P.socket, r: rSock(xA + P.socket), fillet: 1.0, w: 0 },
    { a: P.xNenn, r: P.d / 2, fillet: 0.4, w: 0 },
    { a: xA, r: P.d / 2 + P.lead, fillet: 0, w: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, {
    axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS,
  });
  /* halfAng geht mit hinaus: nur damit weiß die Messung, WO der
     Facettenrücken liegt, und kann ihn treffen statt zu rastern. */
  return { geo, cap: capFromProfile(profile, 'x'), profile, halfAng: kn.halfAng };
}

/* Messingring mit zylindrischem Rp-Innengewinde. Der Mantel liegt
   0,15 mm unter dem Sitz im PP — threadRing bringt das mit. */
export function buildRing(P) {
  return threadRing({
    a0: P.xEnd - P.brassLen,
    a1: P.xEnd,
    rOuter: P.rBrass,
    od: P.threadOD,
    pitch: P.threadPitch,
    turns: P.turns,
    axis: 'x',
  });
}


/* == adaptor-socket-female-thread/index.js ============================= */
/* K-Aqua Übergangsmuffe mit Innengewinde — Produktpaket.

   Gegenstück zur AG-Muffe, aber anders gebaut: der Messingring liegt
   versenkt im grünen Körper. Die Explosionsansicht zieht ihn heraus —
   im geschlossenen Zustand sieht man von ihm nur die Stirnfläche. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'transition-fittings/adaptor-socket-female-thread',
  module: 'kaqua-adaptor-socket-female-thread',
  titleDe: 'Übergangsmuffe mit Innengewinde',
  titleEn: 'Adaptor socket (Female thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [d, r] = String(k).split('x');
    return 'd' + d + ' · Rp' + r.replace(/_/g, ' ') + '"';
  },
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '32x1',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'Rp', 'D', 'l', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'Rp', 'D', 'D1', 'l'],

  variants: [],
  states: null,

  tile: 'Übergang von PP-R auf Rohrgewinde — der Messingring liegt ' +
        'versenkt im grünen Körper, sichtbar nur im Schnitt.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Uebergangsmuffe_IG_' + P.key,
      materials: ['pprGreen', 'brass'],
      seed: 131,
      clipPlane,
    });

    const body = buildBody(P);
    const ring = buildRing(P);

    A.part('body', {
      name: 'PP_Koerper', label: 'PP-R-Körper mit Schweißmuffe', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      explode: -0.35 * P.len,
      anchor: V3(-P.xEnd + P.socket * 0.6, P.rSleeve + 0.26 * P.len, 0),
    });
    A.part('ring', {
      name: 'Messingring', label: 'Messingring Rp' + P.Rp + '"', mat: 'brass',
      geo: ring.geo, cap: ring.cap,
      explode: 0.7 * P.len,
      anchor: V3(P.xEnd - P.brassLen * 0.4, -(P.rCollar + 0.22 * P.len), 0),
    });

    A.light(V3(-P.xEnd * 0.6, 0, 0));
    A.light(V3(P.xEnd * 0.6, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.10 * P.len), P.rSleeve * 0.5, P.rSleeve * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.xEnd - P.brassLen * 0.5, P.threadCore * 0.42, P.threadCore * 0.30),
      n: V3(0.25, 0.8, 0.55),
      text: 'Zylindrisches Innengewinde Rp' + P.Rp + '" nach ISO 7-1, ' +
        P.turns + ' Gänge, nutzbar ' + P.threadLen + ' mm',
    });
    A.hotspot({
      v: V3(P.xStep + 0.4, P.rCollar * 0.55, P.rCollar * 0.78),
      n: V3(-0.3, 0.6, 0.74),
      text: 'Absatz vom Muffenteil D1 = ' + P.D1 + ' auf den Bund D = ' + P.OD + ' mm',
    });

    const zf = P.rCollar + 0.12 * P.len;
    const yL = -(P.rCollar + 0.30 * P.len);
    A.dim({ label: 'l', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.11 * P.len, 0) });
    const xD = P.xEnd + 0.16 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rCollar, zf), b: V3(xD, P.rCollar, zf), off: V3(-0.13 * P.len, 0, 0) });

    const strahl = (id, from, dir) => A.probeAxial(id, from, dir);

    A.measures = [
      { key: 'l', label: DIMENSION_KEY.l, soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.y - b.min.y; } },
      /* D1 lässt sich NICHT über eine Box3 messen: der Bund ist in zehn
         von zwölf Zeilen größer und würde stattdessen anschlagen.
         Nur diese Messung beweist, dass der Absatz wirklich da ist.

         Getastet wird MITTEN AUF EINER FACETTE des Rückens, ein Strahl
         je Riffel. grooveMod legt die Nuten auf k·pitch mit der
         Halbbreite halfAng; dazwischen liegt der Rücken auf dem vollen
         Radius, und thetaSamples setzt dort sechs Profilpunkte. Der
         Strahl zielt zwischen den vierten und den fünften — auf eine
         FLÄCHE, nie auf eine Kante.

         DER EIGENTLICHE FEHLER SASS WOANDERS, und er ist der Grund,
         warum drei Anläufe scheiterten: der Strahl setzte den Winkel als
         y = R·sin t, z = R·cos t an, revolve legt bei Achse x aber
         y = r·cos θ, z = r·sin θ ab. Das spiegelt den Winkel und
         verschiebt ihn um π/2. Ob das noch auf dem Rücken landet, hängt
         allein davon ab, ob π/2 ein ganzes Vielfaches der Teilung ist —
         und das ist bei acht der zwölf Größen zufällig fast der Fall.
         Daher acht scheinbar richtige Zeilen und vier falsche:

           32×1"   Teilung 15,00°  ·  90°/15,00 = 6,00   → Versatz 0
           40×1¼"  Teilung 12,00°  ·  90°/12,00 = 7,50   → ½ Teilung
           90×3"   Teilung  5,81°  ·  90°/ 5,81 = 15,50  → ½ Teilung
           110×4"  Teilung  4,67°  ·  90°/ 4,67 = 19,25  → ¼ Teilung

         Und der Fehlbetrag war in jeder betroffenen Zeile GENAU die
         doppelte Nuttiefe — ein Maß, das um exakt ein Bauteilmerkmal
         danebenliegt, misst dieses Merkmal statt des gesuchten. Diese
         Signatur hätte ich beim ersten Mal lesen müssen, statt am
         Winkelraster zu drehen.

         Die beiden vorherigen Anläufe bleiben trotzdem lehrreich: ein
         Raster aus 72 Strahlen las die Sehne statt des Scheitels, und
         der Fehler wuchs LINEAR MIT DEM RADIUS — die Handschrift eines
         Abtastfehlers, denn ein Formfehler skaliert nicht mit r, ein
         Sehnenfehler r·(1−cos(Δθ/2)) schon. Der Preis der Facettenmitte
         ist die Sehne über EINE Facette, rund drei Zehntausendstel
         Millimeter bei d90. Das rundet auf null. */
      { key: 'D1', label: DIMENSION_KEY.D1, soll: P.D1,
        ist: () => {
          /* Station dicht unter dem Absatz, nicht in der Mitte der
             Muffe. Der Mantel trägt 1° Entformungsschräge (DRAFT): vom
             Mundlochwulst läuft er leicht ein und erst am Absatz wieder
             auf volles Maß. In der Muffenmitte fehlten dadurch 0,01 mm
             bei d20 und 0,05 mm bei d110 — wieder linear mit dem
             Radius, aber diesmal ein ECHTES Merkmal des Bauteils und
             kein Messfehler. Eine Spritzgussmuffe ohne Schräge ließe
             sich nicht entformen. Gemessen wird deshalb dort, wo D1
             gilt. */
          const x = P.xStep - 1.0;
          const pitch = (2 * Math.PI) / P.ribCount;
          let best = 0;
          for (let i = 0; i < P.ribCount; i++) {
            const t = i * pitch + body.halfAng
              + (pitch - 2 * body.halfAng) * (3.5 / 6);
            /* WINKELKONVENTION: revolve legt bei Achse x ab als
               y = r·cos θ, z = r·sin θ. Der Strahl MUSS genauso rechnen.
               Er tat es zuerst umgekehrt, und das kostete drei Anläufe —
               siehe oben. */
            const cs = Math.cos(t), sn = Math.sin(t);
            const hit = strahl('body', V3(x, P.OD * cs, P.OD * sn), V3(0, -cs, -sn));
            if (hit) best = Math.max(best, Math.hypot(hit.y, hit.z));
          }
          return r2(2 * best);
        } },
      /* Muffenbohrung an der Nennebene, radial von der Achse aus
         angetastet. Der Sollwert ist das TABELLENMASS d — die Messung
         prüft das Modell gegen den Katalog, nicht gegen sich selbst. */
      { key: 'd', label: DIMENSION_KEY.d, soll: P.d,
        ist: () => {
          const hit = strahl('body', V3(P.xNenn, 0, 0), V3(0, 0, 1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
      /* Muffentiefe. Der Strahl MUSS vom Muffenmund kommen: von der
         anderen Seite läge der Absatz zum Ringsitz im Weg, und der
         liegt im selben Radiusfenster wie der Muffengrund. */
      { key: 'tiefe', label: 'Muffentiefe (Katalog-Muffentabelle)', soll: P.socket,
        ist: () => {
          const rr = (P.d / 2 + P.boreR) / 2;
          const hit = strahl('body', V3(-P.xEnd - 20, rr, 0), V3(1, 0, 0));
          return hit ? r2(hit.x + P.xEnd) : NaN;
        } },
      /* Innengewinde: Strahl von der Achse nach außen. Der engste Punkt
         der Bohrung ist die Kuppe und liegt auf dem Kerndurchmesser.
         Zweite Kuppe — die erste sitzt auf der Fuge zum Ringsitz. */
      { key: 'kern', label: 'Innengewinde-Kerndurchmesser', soll: P.threadCore,
        ist: () => {
          const x = P.xEnd - P.brassLen + 1.0 + P.threadPitch;
          const hit = strahl('ring', V3(x, 0, 0), V3(0, 0, 1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
      /* GEGENPROBE: zwischen zwei Kuppen liegt der Grund auf dem
         Nenndurchmesser, abzüglich des Fillet-Rückzugs. Der Strahl MUSS
         dort weiter fliegen — gleicher Wert hieße glatte Bohrung. */
      { key: 'nenn', label: 'Innengewinde-Nenndurchmesser (Grund)',
        soll: r2(P.threadOD - P.threadRootRise),
        ist: () => {
          const x = P.xEnd - P.brassLen + 1.0 + 1.5 * P.threadPitch;
          const hit = strahl('ring', V3(x, 0, 0), V3(0, 0, 1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
