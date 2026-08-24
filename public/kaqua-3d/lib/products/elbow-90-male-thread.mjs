/* K-Aqua 3D · Winkel 90° mit Außengewinde — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID transition-fittings/elbow-90-male-thread.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, ISO, SEG_FINE, SEG_INT, SEG_VIS, bendPath, buildProfile, capFromProfile, circleLoop, createAssembly, fusionDepth, hexPrism, knurl, materials, mergeGeometries, revolve, sweepPath, threadProfile,
} from '../kaqua-3d-core.mjs';

/* == _bend/params.js =================================================== */
/* K-Aqua Winkelfamilie — Parametrik.

   Gemeinsam für Winkel 45° und 90°. Aus der Tabelle kommen d, D, das
   Schenkelmaß (bei 45° Spalte l, bei 90° Spalte L) und z.

   Die Muffentiefe wird NICHT geschätzt, sondern gerechnet: Schenkel − z.
   Gegenprobe gegen die Normreihe DVS 2207-11 steht in P.depthDeltaToNorm
   und erscheint im Prüfbericht. */


export function bendParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);
  const { d, D } = a;

  P.angle = opt.angle;
  P.leg = a.leg;                       // Achsenschnittstelle bis Stirnfläche
  P.OD = D;
  P.wallFitting = (D - d) / 2;
  /* Muffentiefe aus der Normreihe, nicht aus leg − z. Begründung im
     Kopfkommentar von products/tee/data.js: die Tiefe ist durch das
     Schweißwerkzeug je Nennweite festgelegt und muss bei Muffe, Winkel
     und T-Stück gleich sein. Die Muffentabelle belegt die Reihe exakt;
     leg − z streut bei Winkel und T-Stück um bis zu 3 mm. */
  P.socket = fusionDepth(d) ?? (a.leg - a.z);
  P.socketFromTable = a.leg - a.z;     // Gegenprobe, erscheint im Prüfbericht

  P.wallPipe = d / (opt.sdr ?? 6);
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.rOut = D / 2;

  P.sockTaper = Math.tan(0.6 * D2R);   // 0,6° Muffenkonus
  P.lead = 2 * Math.tan(15 * D2R);     // Einführfase 15° × 2 mm
  P.restwand = P.wallFitting;

  /* ASSUMPTION Bogenradius. Die Tabelle führt keinen. Angesetzt 0,5·d,
     begrenzt auf das, was der Schenkel hergibt (bendPath rechnet den
     Verbrauch R·tan(α/2) und bricht sonst ab). 0,5·d ist der Wert, bei
     dem die Außenkontur im Katalogfoto sichtbar rund über die Ecke
     läuft, ohne dass der Bogen in die Muffe hineinreicht.
     Gegen die Zeichnung zu verifizieren. */
  const maxR = (a.leg - P.socket - 1.5) / Math.tan((opt.angle * D2R) / 2);
  P.bendR = Math.max(d * 0.22, Math.min(d * 0.5, maxR));

  P.emR = Math.min(2.0, 0.05 * d);
  const norm = fusionDepth(d);
  P.normDepth = norm;
  P.depthDeltaToNorm = norm == null ? null
    : Math.round((P.socketFromTable - norm) * 10) / 10;

  if (P.restwand < 3) {
    throw new Error('K-Aqua Winkel d' + d + ': Restwand ' + P.restwand.toFixed(2) + ' mm < 3 mm');
  }
  if (P.socket <= 0 || P.socket >= a.leg) {
    throw new Error('K-Aqua Winkel d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht zum Schenkel ' + a.leg + ' mm');
  }
  return P;
}


/* == _bend/parts.js ==================================================== */
/* K-Aqua Winkelfamilie — Kontur.

   Der erste echte Belastungstest für sweepPath, und er hat eine Lücke im
   Core gefunden: sweepPath nahm einen festen Querschnitt für die ganze
   Bahn. Ein Winkel braucht einen veränderlichen — an den Stirnflächen
   die Muffenbohrung, in der Mitte die Rohrbohrung. Ohne CSG ist das der
   einzige Weg, die Muffe in eine geschlossene Kontur zu bekommen.

   sweepPath nimmt jetzt auch eine Funktion (t, i) => Punktliste. Damit
   ist der Winkel EIN Loft: Außenhaut konstant D/2, Innenhaut nach
   Position veränderlich, plus zwei Ringflächen an den Stirnflächen.

   Kein CSG, keine Boolesche Operation. */


/* Innenradius über der Bahn. t läuft 0…1 von Stirnfläche A nach B.
   Der Verlauf ist symmetrisch, deshalb wird nur der Abstand zur
   näheren Stirnfläche betrachtet. */
function boreAt(P, t, pathLen) {
  const s = Math.min(t, 1 - t) * pathLen;   // Bogenlänge bis zur nächsten Stirnfläche
  const rSock = P.d / 2;
  if (s <= 0.001) return rSock + P.lead;    // Einführfase am Mundloch
  if (s <= 2) return rSock + P.lead * (1 - s / 2);
  if (s <= P.socket) return rSock - P.sockTaper * (s - 2);
  const ramp = Math.min(1, (s - P.socket) / Math.max(1.5, P.wallFitting * 0.8));
  const rEnd = P.d / 2 - P.sockTaper * (P.socket - 2);
  return rEnd + (P.boreR - rEnd) * ramp;    // Übergang auf die Rohrbohrung
}

export function buildBend(P) {
  const path = bendPath(P.leg, P.angle, P.bendR, 24, 5);
  let pathLen = 0;
  for (let i = 1; i < path.length; i++) pathLen += path[i].c.distanceTo(path[i - 1].c);

  /* Außenhaut: konstant D/2, mit 1° Entformung zu den Stirnflächen hin
     verjüngend — dieselbe Regel wie bei jedem anderen Fitting. */
  const outer = sweepPath((t) => {
    const s = Math.min(t, 1 - t) * pathLen;
    const shrink = DRAFT * Math.max(0, P.socket - s) * 0.5;
    return circleLoop(P.rOut - shrink, SEG_VIS, 0.15);
  }, path);

  const inner = sweepPath((t) => circleLoop(boreAt(P, t, pathLen), SEG_INT, 0.3),
    path, { flip: true });

  /* Ringflächen an den Stirnflächen: verbinden Außen- und Innenhaut zu
     einem geschlossenen Körper. Ohne sie ist der Winkel eine offene
     Schale und die Schnittansicht zeigt Löcher. */
  const rings = [];
  for (const [idx, flip] of [[0, true], [path.length - 1, false]]) {
    const st = path[idx];
    const t = idx === 0 ? 0 : 1;
    const rIn = boreAt(P, t, pathLen);
    const ring = new THREE.RingGeometry(rIn, P.rOut, SEG_VIS, 1);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, flip ? -1 : 1), st.t.clone().normalize());
    ring.applyQuaternion(q);
    ring.translate(st.c.x, st.c.y, st.c.z);
    const n = ring.attributes.position.count;
    ring.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.5), 1));
    rings.push(ring);
  }

  /* Auswerferstift-Marke auf dem Bogenrücken — ohne sie sieht das Teil
     nach CAD-Viewer aus. */
  const mid = path[Math.floor(path.length / 2)];
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.25 },
    { a: 0.1, r: P.emR, fillet: 0.1 },
    { a: 0.1, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  const nOut = mid.c.clone().setZ(0).normalize();
  disc.rotateX(Math.PI);
  disc.translate(nOut.x * (P.rOut - 0.05) + mid.c.x, nOut.y * (P.rOut - 0.05) + mid.c.y, 0);

  return {
    geo: mergeGeometries([outer, inner, ...rings, disc]),
    cap: null,          // Halbschnitt über DoubleSide, siehe index.js
    path, pathLen,
  };
}


/* == elbow-90-male-thread/data.js ====================================== */
/* K-Aqua Winkel 90° mit Außengewinde — Artikeltabelle.

   PHASE 1, verifiziert am 23.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-elbow-90-male-thread-….png
   (quellen/w4-elbow-male.png, 3004 × 8724 px). Ausschnitte:
   Tabelle quellen/w4-tabelle-elbow-male.png, Zeichnung
   quellen/w4-zeichnung-elbow-male.png. Vollständiger Befund in
   pruefung/w4-elbow-90-male-phase1.md.

   Spaltenköpfe wie abgebildet: Code · d · R · D · l · z · L₁ · z₁ · kg · Pack.
   Nach der letzten Zeile folgt der ORDER-Knopf — die Tabelle ist zu Ende
   gelesen (Fall 2). Es sind 4 Größen, wie im Arbeitsauftrag.

   MASSSCHLÜSSEL:
     d   Rohr-Außendurchmesser = Muffenbohrung
     R   Rohrgewinde in Zoll (kegelig, ISO 7-1 / DIN 2999)
     D   Außendurchmesser des Muffenschenkels
     l   Achse des Gewindeschenkels bis Stirnfläche der Muffe
     z   Achse des Gewindeschenkels bis Muffengrund
     L1  Achse des Muffenschenkels bis Ende des PP-R-Körpers
         (die Zeichnung schreibt sie `L`, die Tabelle `L₁` — dieselbe
          Kante, zwei Schreibweisen. Im Modell heißt sie durchgehend L1,
          Fall 19.)
     z1  Achse des Muffenschenkels bis Gewindespitze

   GEGENPROBE 1 — l − z trifft die Normreihe DVS 2207-11 (Fall 4):
     d20  14 gegen 14,5   ·  d25  16 gegen 16  ·  d32  18 gegen 18
   Die Muffentiefe kommt trotzdem aus fusionDepth(d); der Tabellenwert
   wandert als P.socketFromTable in den Prüfbericht.

   GEGENPROBE 2 — z1 − L1 ist die Gewindelänge, über ALLE Zeilen
   durchgerechnet und im Vorzeichen geprüft (Fall 28):
     15 · 15 · 16 · 18
   Die Differenz folgt R, nicht d: Zeile 2 und 3 haben dasselbe d25 und
   verschiedene Werte (15 gegen 16), Zeile 1 und 2 verschiedene d bei
   gleichem Wert. Die Reihe entspricht den Gewindelängen nach ISO 7-1
   (R ½" ≈ 15, R ¾" ≈ 16, R 1" ≈ 18). Damit ist getragen: das PP-R endet
   bei L1, das Gewinde beginnt dort und läuft bis z1.

   GEGENPROBE 3 — Plausibilität (Fall 3): D > d und D > Gewinde-Ø in
   jeder Zeile, l > z in jeder Zeile, L1 > D/2 in jeder Zeile.

   KEIN SECHSKANT. Die Zeichnung führt keine Spalte SW und zeigt keinen
   Sechskant; das Foto bestätigt einen runden Messingzapfen. Anders als
   adaptor-socket-male-thread und tee-90-male-thread braucht dieses Teil
   weder hexPrism noch knurl.

   ── DAS KATALOGFOTO GEHÖRT ZU KEINER ZEILE ──
   Die Größenbestimmung nach Fall 35 wurde durchgeführt und ist negativ
   ausgegangen. An der Silhouette gemessen: Gewinde-Ø/D = 0,746 (Tabelle
   0,616…0,778, passt), aber Gewindelänge/D = 0,758 gegen 0,419…0,517
   und z1/D = 1,98 gegen 1,535…1,690. Das freiliegende Gewinde ist
   47–80 % länger, als jede Zeile zulässt; auch unentzerrt bleibt der
   Abstand. Gegenprobe über die Steigung: 0,107 gemessen gegen 0,069…0,087.
   Nach Fall 31 gewinnt das Tabellenmaß (Rang 1) gegen die Fotoableitung
   (Rang 3); der Widerspruch wird dokumentiert, nicht aufgelöst. Aus dem
   Foto kommt deshalb KEIN Längenmaß, nur die Gestalt: zwei Werkstoffe,
   kein Sechskant, glatter PP-Körper mit Absatz.

   Auch die ZEICHNUNG ist nicht maßstäblich — geprüft: d/D 0,645,
   l/D 0,727, z1/D 1,364 gegen die Tabellenwerte. Sie legt fest, welches
   Maß wo liegt, nicht wie groß es ist.

   ASSUMPTION Gewindemaße: die Tabelle nennt nur die Zollgröße. Kern- und
   Steigungsmaße kommen aus ISO 7-1. Das ist Norm, keine Schätzung — die
   Zollangabe bestimmt sie eindeutig.

   Anmerkung zur Wiederholung: dieselbe ISO-7-1-Tabelle steht auch in
   adaptor-socket-male-thread/data.js, _teethread/params.js und
   _union/params.js. Vier Produkte, eine Norm — ein Kandidat für den
   Core (Fall 19). Nicht in dieser Runde, weil die Migration alle vier
   Gewindeprodukte anfasst; als Nachtrag im Prüfbericht vermerkt. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 4;
export const ANGLE = 90;
export const SDR = 6;

/* Außendurchmesser und Steigung je Gewindegröße, ISO 7-1 / DIN 2999. */
export const THREAD = {
  '1/2': { od: 20.955, pitch: 1.814 },
  '3/4': { od: 26.441, pitch: 1.814 },
  '1': { od: 33.249, pitch: 2.309 },
};

export const ARTICLES = [
  { key: '20x1/2', code: 'AQ092G2012', d: 20, R: '1/2', D: 29, l: 28, z: 14, L1: 34, z1: 49, kg: 0.09, pack: 180 },
  { key: '25x1/2', code: 'AQ092G2512', d: 25, R: '1/2', D: 34, l: 32, z: 16, L1: 38, z1: 53, kg: 0.10, pack: 150 },
  { key: '25x3/4', code: 'AQ092G2534', d: 25, R: '3/4', D: 34, l: 32, z: 16, L1: 40, z1: 56, kg: 0.15, pack: 100 },
  { key: '32x1', code: 'AQ092G321', d: 32, R: '1', D: 43, l: 38, z: 20, L1: 48, z1: 66, kg: 0.21, pack: 60 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  R: 'Rohrgewinde',
  D: 'Außendurchmesser Muffenschenkel',
  l: 'Schenkelmaß Muffe l',
  z: 'Einbaulänge z',
  L1: 'Schenkelmaß PP-R-Körper L₁',
  z1: 'Achse bis Gewindespitze z₁',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}


/* == elbow-90-male-thread/params.js ==================================== */
/* K-Aqua Winkel 90° mit Außengewinde — Parametrik.

   Zwei Werkstoffe, zwei Nennweiten (d und R), UNGLEICHE SCHENKEL.

   Die Fachlogik des Winkels kommt aus products/_bend/params.js — dieselbe
   Muffentiefenregel, dieselbe Restwandprüfung, dieselbe Gegenprobe gegen
   die Normreihe. Hier kommt nur dazu, was der Gewindeschenkel braucht.

   ── Warum bendPath geändert werden musste ──
   Bis zum 23.08.2026 nahm bendPath EIN Schenkelmaß für beide Seiten. Das
   trägt jeden Winkel mit gleichen Enden, aber nicht diesen: der
   Muffenschenkel misst l, der Gewindeschenkel L1, und die beiden sind
   verschieden (28 gegen 34 bei d20). bendPath hat jetzt ein sechstes
   Argument LB; ohne Angabe bleibt das Verhalten das alte. */


export function params(key) {
  const a = article(key);

  /* Der Winkelteil: _bend rechnet mit `leg` und `z`. Für diesen Winkel
     ist `leg` der MUFFENSCHENKEL l — der kürzere der beiden und damit
     der, an dem der Bogenradius sich messen lassen muss. */
  const P = bendParams({ d: a.d, D: a.D, leg: a.l, z: a.z }, { angle: ANGLE, sdr: SDR });
  Object.assign(P, a);
  P.l = a.l;
  P.leg = a.l;

  const th = THREAD[a.R];
  if (!th) throw new Error('K-Aqua: kein Normmaß für Gewinde R' + a.R);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;

  /* Gewindelänge aus der Tabelle, nicht geschätzt: z1 − L1. Die Deutung
     ist über alle vier Zeilen gerechnet (data.js, Gegenprobe 2). */
  P.threadLen = a.z1 - a.L1;
  P.turns = Math.max(4, Math.round(P.threadLen / P.threadPitch));
  if (P.threadLen <= 0) {
    throw new Error('K-Aqua ' + a.key + ': z1 − L1 = ' + P.threadLen +
      ' mm — die Gewindelänge kann nicht null oder negativ sein');
  }

  /* ASSUMPTION Messingeinsatz. Die Tabelle nennt nur, wo das PP endet
     (L1) und wo das Gewinde aufhört (z1). Wie tief der Einsatz im PP
     steckt und wie dick er ist, steht nirgends.

     Angesetzt:
       Außendurchmesser = Gewinde-Ø + 1,2 mm Verankerungsschulter. Die
       Zeichnung zeigt im Schnitt eine gezahnte Verankerung, die über dem
       Gewindedurchmesser liegt; 0,6 mm je Seite ist das kleinste Maß,
       das die Zähne trägt und in jeder Zeile unter D bleibt (geprüft:
       14,08 · 14,08 · 16,82 · 20,74 gegen D/2 14,5 · 17 · 17 · 21,5).
       Einbautiefe = 0,55 · Gewinde-Ø, mindestens 6 mm. Das ist die
       Länge, über die die Zeichnung die Zähne zeigt. */
  P.rInsertOut = P.threadOD / 2 + 0.6;
  P.insertDepth = Math.max(6, P.threadOD * 0.55);

  /* Wand des PP über dem Einsatz. Restwandregel für Fittings: ≥ 3 mm.
     0,11 · d liegt bei d32 darüber und bildet den etwas kräftigeren
     Körper ab, den das Foto dort zeigt. */
  P.wallB = Math.max(3, 0.11 * a.d);
  P.rLegB = P.rInsertOut + P.wallB;
  P.restwandB = P.wallB;

  if (P.rLegB > P.rOut + 0.001) {
    throw new Error('K-Aqua ' + a.key + ': Gewindeschenkel Ø ' +
      (2 * P.rLegB).toFixed(2) + ' mm über dem Muffenschenkel D ' + a.D +
      ' mm — dann ist D nicht mehr das größte Maß');
  }

  /* Bogenradius: er muss in BEIDE Schenkel passen. _bend rechnet ihn nur
     gegen den ersten; hier kommt der Gewindeschenkel dazu, dessen freier
     Raum bei L1 − Einbautiefe endet. */
  const maxRA = (a.l - P.socket - 1.5) / Math.tan((ANGLE * D2R) / 2);
  const maxRB = (a.L1 - P.insertDepth - 1.5) / Math.tan((ANGLE * D2R) / 2);
  P.bendR = Math.max(a.d * 0.22, Math.min(a.d * 0.5, maxRA, maxRB));

  /* Muffengrund: flacher Ringabsatz mit kurzem Übergang auf die
     Rohrbohrung. Über eine Bahn lässt sich keine Kante bauen, die genau
     null Länge hat — groundLen ist die kürzeste, die die Bahnabtastung
     noch auflöst. Der Messpunkt liegt DAVOR, siehe index.js. */
  P.rSockGround = a.d / 2 - P.sockTaper * (P.socket - 2);
  P.groundLen = 1.0;
  P.probeR = P.rSockGround - 0.15;

  /* Absatz am PP-Ende: der breitere Ring, den das Foto kurz vor dem
     Messing zeigt. 0,3 mm über der Mantelfläche, wie der Bund am
     Mundloch jeder Muffe (Formensprache §2.1). */
  P.collarLen = Math.min(0.28 * a.L1, 8);
  /* Auf D gedeckelt: D ist ein Katalogmaß, und ein Absatz, der es
     überschreitet, macht den Gewindeschenkel zum größten Maß des Teils.
     Bei d25 × R¾" greift der Deckel (17,12 → 17,00). */
  P.collarR = Math.min(P.rLegB + 0.3, P.rOut);

  P.emR = Math.min(2.0, 0.05 * a.d);

  if (P.insertDepth >= a.L1 - P.bendR) {
    throw new Error('K-Aqua ' + a.key + ': Messingeinsatz ' +
      P.insertDepth.toFixed(1) + ' mm reicht in den Bogen hinein');
  }
  if (P.rInsertOut <= P.boreR + 1) {
    throw new Error('K-Aqua ' + a.key + ': Messingeinsatz Ø ' +
      (2 * P.rInsertOut).toFixed(1) + ' mm trägt die Bohrung ' +
      P.bore.toFixed(1) + ' mm nicht');
  }
  return P;
}


/* == elbow-90-male-thread/parts.js ===================================== */
/* K-Aqua Winkel 90° mit Außengewinde — Kontur.

   Zwei Teile, zwei Werkstoffe:
     1. PP-R-Körper: Winkel mit Schweißmuffe am einen Schenkel und
        Aufnahme für den Messingeinsatz am anderen
     2. Messingeinsatz: verzahnter Schaft im PP, davor das kegelige
        R-Gewinde (threadProfile)

   Keine neue Geometriefunktion. Der Winkel ist EIN Loft über eine
   Gerade-Bogen-Gerade-Bahn wie in products/_bend/parts.js; neu ist nur,
   dass die beiden Schenkel verschieden lang sind und verschiedene Enden
   haben. Kein CSG, kein Sechskant, keine Riffelung — Zeichnung und Foto
   zeigen einen glatten Körper und einen runden Zapfen.

   Die Funktionsnamen weichen bewusst von _bend/parts.js ab: der Bau
   verkettet Familien- und Produktdateien zu EINEM flachen Skript, und
   `boreAt` gibt es dort schon. */


const smooth = (u) => {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
};

const SEAT_RAMP = 1.2;      // Übergang Einsatzsitz → Rohrbohrung
const SHOULDER = 3.0;       // Kegelschulter vom Gewindeschenkel auf den Bogen

/* Innenradius über der Bahn. sA ist die Bogenlänge ab der Stirnfläche
   der Muffe, sB die ab dem PP-Ende am Gewindeschenkel. Anders als beim
   symmetrischen Winkel sind die beiden Enden verschieden: vorne eine
   Schweißmuffe, hinten der Sitz für den Messingeinsatz. */
function boreAlong(P, sA, sB) {
  if (sA <= 0.001) return P.d / 2 + P.lead;
  if (sA <= 2) return P.d / 2 + P.lead * (1 - sA / 2);
  if (sA <= P.socket) return P.d / 2 - P.sockTaper * (sA - 2);
  if (sA <= P.socket + P.groundLen) {
    return P.rSockGround + (P.boreR - P.rSockGround) *
      smooth((sA - P.socket) / P.groundLen);
  }
  if (sB <= P.insertDepth) return P.rInsertOut + 0.05;
  if (sB <= P.insertDepth + SEAT_RAMP) {
    return (P.rInsertOut + 0.05) + (P.boreR - P.rInsertOut - 0.05) *
      smooth((sB - P.insertDepth) / SEAT_RAMP);
  }
  return P.boreR;
}

/* Außenradius über der Bahn. Der Muffenschenkel trägt D, der
   Gewindeschenkel den schlankeren Körper über dem Einsatz, davor der
   Absatz, den das Foto zeigt. */
function skinAlong(P, sA, sB, legB) {
  if (sA <= P.socket) return P.rOut - DRAFT * (P.socket - sA) * 0.5;
  if (sB <= P.collarLen) return P.collarR;
  if (sB <= P.collarLen + 1.2) {
    return P.collarR + (P.rLegB - P.collarR) * smooth((sB - P.collarLen) / 1.2);
  }
  if (sB >= legB - SHOULDER && sB <= legB) {
    return P.rLegB + (P.rOut - P.rLegB) * smooth((sB - (legB - SHOULDER)) / SHOULDER);
  }
  if (sB > legB) return P.rOut;
  return P.rLegB;
}

export function buildElbowBody(P) {
  const path = bendPath(P.l, 90, P.bendR, 24, 40, P.L1);
  let pathLen = 0;
  for (let i = 1; i < path.length; i++) pathLen += path[i].c.distanceTo(path[i - 1].c);

  /* Die beiden Endzonen dürfen sich nicht überschneiden — sonst
     überschreibt die eine die andere und die Bohrung bekommt eine Stufe,
     die niemand angeordnet hat. */
  const need = P.socket + P.groundLen + P.insertDepth + SEAT_RAMP;
  if (need >= pathLen) {
    throw new Error('K-Aqua ' + P.key + ': Muffe und Einsatzsitz brauchen ' +
      need.toFixed(1) + ' mm, die Bahn ist ' + pathLen.toFixed(1) + ' mm lang');
  }

  const legB = P.L1 - P.bendR;   // gerader Teil des Gewindeschenkels

  const outer = sweepPath((t) => {
    const sA = t * pathLen;
    return circleLoop(skinAlong(P, sA, pathLen - sA, legB), SEG_VIS, 0.15);
  }, path);

  const inner = sweepPath((t) => {
    const sA = t * pathLen;
    return circleLoop(boreAlong(P, sA, pathLen - sA), SEG_INT, 0.3);
  }, path, { flip: true });

  /* Ringflächen an beiden Stirnflächen. Ohne sie ist der Winkel eine
     offene Schale und die Schnittansicht zeigt Löcher. */
  const rings = [];
  for (const [idx, flip] of [[0, true], [path.length - 1, false]]) {
    const st = path[idx];
    const sA = idx === 0 ? 0 : pathLen;
    const rIn = boreAlong(P, sA, pathLen - sA);
    const rOutHere = skinAlong(P, sA, pathLen - sA, legB);
    const ring = new THREE.RingGeometry(rIn, rOutHere, SEG_VIS, 1);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, flip ? -1 : 1), st.t.clone().normalize());
    ring.applyQuaternion(q);
    ring.translate(st.c.x, st.c.y, st.c.z);
    const n = ring.attributes.position.count;
    ring.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.5), 1));
    rings.push(ring);
  }

  /* Auswerferstift-Marke auf dem Bogenrücken — ohne sie sieht das Teil
     nach CAD-Viewer aus (Visuelle Referenz §2.2). */
  const mid = path[Math.floor(path.length / 2)];
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.25 },
    { a: 0.1, r: P.emR, fillet: 0.1 },
    { a: 0.1, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  const nOut = mid.c.clone().setZ(0).normalize();
  disc.rotateX(Math.PI);
  disc.translate(nOut.x * (P.rOut - 0.05) + mid.c.x, nOut.y * (P.rOut - 0.05) + mid.c.y, 0);

  return { geo: mergeGeometries([outer, inner, ...rings, disc]), cap: null, path, pathLen };
}

/* Messingeinsatz. Achse ist +Y — das ist der Gewindeschenkel der Bahn.
   Der Schaft trägt drei Ringzähne; die Zeichnung zeigt sie im Schnitt
   als Verankerung im PP. Sichtbar ist außen nur das Gewinde. */
export function buildStud(P) {
  const rThread = P.threadOD / 2;
  const yRoot = P.L1 - P.insertDepth;
  const step = P.insertDepth / 3;

  const teeth = [];
  for (let k = 0; k < 3; k++) {
    teeth.push({ a: yRoot + step * (k + 0.35), r: P.rInsertOut, fillet: 0.2 });
    teeth.push({ a: yRoot + step * (k + 0.75), r: P.rInsertOut - 0.9, fillet: 0.2 });
  }

  /* Gewindekontur ab dem PP-Ende bis zur Spitze, kegelig 1:16. */
  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'R')
    .map((p) => ({ a: P.L1 + p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= P.z1);

  const outer = [
    { a: yRoot, r: P.rInsertOut - 0.9, chamfer: 0.4 },
    ...teeth,
    { a: P.L1 - 0.8, r: P.rInsertOut, fillet: 0.3 },
    { a: P.L1, r: Math.min(P.rInsertOut, rThread + P.threadPitch * 0.2), chamfer: 0.5 },
    ...thread,
    { a: P.z1, r: rThread * 0.93 - P.threadLen / 32, chamfer: 0.8 },
  ];
  const inner = [
    { a: P.z1, r: P.boreR + 0.4, fillet: 0.5 },
    { a: P.L1, r: P.boreR, fillet: 0.6 },
    { a: yRoot, r: P.boreR, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  return {
    geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
    cap: capFromProfile(profile, 'y'),
    profile, yRoot,
  };
}


/* == elbow-90-male-thread/index.js ===================================== */
/* K-Aqua Winkel 90° mit Außengewinde — Produktpaket nach PRODUKT-VERTRAG.md.

   Verbundteil aus PP-R-Winkel und Messingeinsatz. Der Winkel ist EIN
   Loft über eine Bahn mit UNGLEICHEN SCHENKELN — der erste im Katalog.

   Der Messingeinsatz steckt im PP; sichtbar ist außen nur das Gewinde.
   Im Halbschnitt wird die Verzahnung sichtbar, mit der er im Körper
   sitzt — das ist der Punkt, den das Katalogfoto nicht zeigt. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'transition-fittings/elbow-90-male-thread',
  module: 'kaqua-elbow-90-male-thread',
  titleDe: 'Winkel 90° mit Außengewinde',
  titleEn: 'Elbow 90° (Male thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [d, r] = String(k).split('x');
    return 'd' + d + ' · R' + r + '"';
  },
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '25x3/4',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'R', 'D', 'l', 'kg'],
  dimensions: ['l', 'z1'],
  ariaFields: ['d', 'R', 'D', 'l', 'z', 'L1', 'z1'],

  variants: [],
  states: null,

  tile: 'Richtungswechsel mit Rohrgewinde: Schweißmuffe am einen Schenkel, ' +
        'Messingzapfen am anderen. Im Schnitt wird seine Verzahnung im PP sichtbar.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Winkel' + ANGLE + '_AG_' + String(P.key).replace('/', '-'),
      materials: ['pprGreen', 'brass'],
      seed: 131,
      clipPlane,
    });

    const body = buildElbowBody(P);
    const stud = buildStud(P);

    /* ── Silhouetten-Abtastung statt Strahl am PP-Körper ──
       Ein Raycast von außen lief hier zunächst durch die Außenhaut
       hindurch und traf erst die Bohrung. Ursache war die Wicklung in
       sweepPath — sie ist im Core behoben (Fall 39), und ein Strahl
       träfe jetzt richtig.

       Die Abtastung der Punktwolke bleibt trotzdem: sie liefert Werte
       statt Treffer/kein Treffer (Fall 25), ist unabhängig von Wicklung
       und Materialseite, und sie kann dieselbe Stelle in zwei um 90°
       gedrehten Ebenen messen — das ist der Nachweis, den ein einzelner
       Strahl nicht führen kann (Fall 11). Vorgehen nach
       20-VISUELLE-REFERENZ §6. */
    const POS = body.geo.attributes.position;
    /* Schenkel A liegt auf −X, Schenkel B auf +Y. Ein reiner x-Schnitt
       fängt aber auch Punkte des anderen Schenkels und des Bogens ein —
       ein Zylinder um Y reicht in x bis ±r. Deshalb zusätzlich die
       Querebene: Schenkel A wird bei y ≈ 0 abgetastet, Schenkel B bei
       x ≈ 0. In beiden Fällen ist der Radius dann |z|, und circleLoop
       legt bei 96 Segmenten Punkte exakt auf ±z (Fall 27: keine
       Sekante). Geprüft: in dieser Querebene liegt kein Punkt des
       jeweils anderen Schenkels und keiner des Bogens. */
    const slab = (achse, wert, halb, ebene) => {
      const querZ = ebene === 'z0';   // Radius aus |y| statt aus |z|
      let rMax = 0, rMin = Infinity, n = 0;
      for (let i = 0; i < POS.count; i++) {
        const x = POS.getX(i), y = POS.getY(i), z = POS.getZ(i);
        const s = achse === 'x' ? x : y;
        const q = querZ ? z : (achse === 'x' ? y : x);
        if (Math.abs(s - wert) > halb || Math.abs(q) > 0.35) continue;
        const r = querZ ? Math.abs(y) : Math.abs(z);
        if (r > rMax) rMax = r;
        if (r < rMin) rMin = r;
        n++;
      }
      return n ? { rMax, rMin, n } : { rMax: NaN, rMin: NaN, n: 0 };
    };
    const r2 = (v) => (Number.isFinite(v) ? Math.round(v * 200) / 100 : NaN);

    A.part('body', {
      name: 'PP_Winkel', label: 'PP-R-Winkelkörper', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      explode: V3(-0.35 * P.l, -0.20 * P.z1, 0),
      anchor: V3(-P.l * 0.7, P.rOut + 0.28 * P.l, 0),
    });
    A.part('stud', {
      name: 'Messingeinsatz', label: 'Messingeinsatz R' + P.R + '"', mat: 'brass',
      geo: stud.geo, cap: stud.cap,
      /* Der Zapfen sitzt in +Y — er muss auch in +Y auseinanderfahren.
         Eine Zahl würde ihn in X versetzen und quer durch den Winkel
         ziehen. */
      explode: V3(0, 0.55 * P.z1, 0),
      anchor: V3(P.rLegB + 0.30 * P.z1, P.z1 * 0.85, 0),
    });

    A.light(V3(-P.l * 0.6, 0, 0));
    A.light(V3(0, P.z1 * 0.6, 0));

    A.hotspot({
      v: V3(-P.l + Math.max(3, 0.12 * P.l), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(0, P.L1 + P.threadLen * 0.5, P.threadOD * 0.46),
      n: V3(0.35, 0.2, 0.91),
      text: 'Kegeliges Rohrgewinde R' + P.R + '" nach ISO 7-1, ' +
        P.turns + ' Gänge, Steigung ' + String(P.threadPitch).replace('.', ',') +
        ' mm, Gewindelänge ' + P.threadLen + ' mm',
    });
    A.hotspot({
      v: V3(0, P.L1 - P.insertDepth * 0.5, P.rLegB * 0.92),
      n: V3(0.2, -0.2, 0.96),
      text: 'Messingeinsatz mit Ringzähnen im PP-R verankert, ' +
        'Einbautiefe ' + P.insertDepth.toFixed(1).replace('.', ',') + ' mm',
    });

    /* Bemaßung: Muffenschenkel entlang −X, Gesamthöhe des
       Gewindeschenkels entlang +Y. Beide Linien liegen vor der
       Silhouette. */
    const zf = P.rOut + 0.16 * P.l;
    const yL = -(P.rOut + 0.34 * P.l);
    A.dim({ label: 'l', value: P.l,
      a: V3(-P.l, yL, zf), b: V3(0, yL, zf), off: V3(0, 0.12 * P.l, 0) });
    const xR = P.rOut + 0.30 * P.l;
    A.dim({ label: 'z₁', value: P.z1,
      a: V3(xR, 0, zf), b: V3(xR, P.z1, zf), off: V3(0.12 * P.l, 0, 0) });

    A.measures = [
      /* ── Die vier Katalogmaße, jedes an der Geometrie abgetastet ── */
      { key: 'l', label: DIMENSION_KEY.l, soll: P.l,
        ist: () => { const b = A.visibleBoxOf(['body']); return Math.abs(b.min.x); } },
      { key: 'L1', label: DIMENSION_KEY.L1, soll: P.L1,
        ist: () => { const b = A.visibleBoxOf(['body']); return b.max.y; } },
      { key: 'z1', label: DIMENSION_KEY.z1, soll: P.z1,
        ist: () => { const b = A.visibleBoxOf(['stud']); return b.max.y; } },
      /* Gewindelänge als eigenständiges Maß: die Differenz zweier
         GEMESSENER Kanten, nicht zweier Tabellenwerte (Fall 14). Sie
         beweist, dass der Zapfen genau so weit aus dem PP ragt, wie
         z1 − L1 verlangt. */
      { key: 'ueberstand', label: 'Freiliegendes Gewinde z₁ − L₁', soll: P.threadLen,
        ist: () => A.visibleBoxOf(['stud']).max.y - A.visibleBoxOf(['body']).max.y },

      /* D am Nennmaßort: bei sA = Muffentiefe, wo die 1°-Entformung
         ausgelaufen ist (Fall 15). Nicht über eine Box3 — die erfässt
         auch Bogen und Gewindeschenkel und wäre gegen einen zu dünnen
         Muffenschenkel blind (Fall 13). */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.D,
        ist: () => r2(slab('x', -P.l + P.socket, 0.4).rMax) },
      /* GEGENPROBE zu D (Fall 25): dieselbe Abtastung an zwei anderen
         Stellen MUSS zwei andere Werte liefern — am Absatz vor dem
         Messing und am schlankeren Körper darüber. Käme dreimal D
         heraus, tastet die Messung nicht den Ort ab, den sie nennt. */
      { key: 'D_kragen', label: 'Ø Absatz vor dem Messing', soll: r2(P.collarR),
        ist: () => r2(slab('y', P.L1 - P.collarLen * 0.5, 0.4).rMax) },
      { key: 'D_schenkelB', label: 'Ø Gewindeschenkel über dem Einsatz', soll: r2(P.rLegB),
        ist: () => r2(slab('y', P.L1 - P.collarLen - 4, 0.4).rMax) },
      /* Was die Abtastung bei y ≈ 0 NICHT finden kann (Fall 13): eine
         Silhouette, die nur in dieser einen Ebene stimmt — ein Sechskant
         über Ecke oder ein ovaler Querschnitt liest sich dort wie ein
         Kreis. Deshalb dieselbe Stelle noch einmal um 90° gedreht, in
         der Ebene z ≈ 0. Erst das Paar beweist den runden Schenkel. */
      { key: 'D_quer', label: 'D um 90° gedreht gemessen', soll: P.D,
        ist: () => r2(slab('x', -P.l + P.socket, 0.4, 'z0').rMax) },

      /* Muffenbohrung am Nennmaßort: 2 mm hinter dem Mundloch, hinter
         der Einführfase. Dort muss das Rohr d passen. */
      { key: 'muffenbohrung', label: 'Muffenbohrung (2 mm hinter dem Mundloch)', soll: P.d,
        ist: () => r2(slab('x', -P.l + 2, 0.4).rMin) },
      /* GEGENPROBE: kurz vor dem Bogen ist die Rohrbohrung erreicht —
         ein deutlich anderer Wert. */
      { key: 'bohrung', label: 'Rohrbohrung vor dem Bogen', soll: r2(P.boreR),
        ist: () => r2(slab('x', -(P.bendR + 1.6), 0.4).rMin) },

      /* Muffentiefe: gesucht ist die Stelle, an der die Bohrung auf die
         Hälfte zwischen Muffen- und Rohrmaß abgefallen ist. Der
         Grundübergang ist ein symmetrischer Smoothstep über groundLen,
         seine Mitte liegt also genau groundLen/2 hinter dem Muffengrund
         — dieser bekannte Betrag wird abgezogen. Gemessen wird die
         gebaute Punktwolke, gerechnet nur die Umrechnung. */
      { key: 'tiefe', label: 'Muffentiefe (abgetastet)', soll: P.socket,
        ist: () => {
          const rMid = (P.rSockGround + P.boreR) / 2;
          const reihen = new Map();
          for (let i = 0; i < POS.count; i++) {
            if (Math.abs(POS.getY(i)) > 0.35) continue;
            const x = POS.getX(i);
            if (x < -P.l + 2.5 || x > -P.bendR - 0.2) continue;
            const k = Math.round(x * 50) / 50;
            const r = Math.abs(POS.getZ(i));
            const cur = reihen.get(k);
            if (cur === undefined || r < cur) reihen.set(k, r);
          }
          const xs = [...reihen.keys()].sort((a, b) => a - b);
          for (let i = 1; i < xs.length; i++) {
            const r0 = reihen.get(xs[i - 1]), r1 = reihen.get(xs[i]);
            if (r0 >= rMid && r1 < rMid) {
              const f = (r0 - rMid) / (r0 - r1);
              const xc = xs[i - 1] + f * (xs[i] - xs[i - 1]);
              return Math.round((xc + P.l - P.groundLen / 2) * 100) / 100;
            }
          }
          return NaN;
        } },

      /* ── Der Gewindescheitel, abgetastet (Fall 20) ──
         Der Strahl fährt die zweite Kuppe an; die erste liegt auf der
         Profilfuge zum PP-Ende. Der Kegel 1:16 verjüngt sie gegenüber
         dem Nennmaß um 2·pitch/32. */
      { key: 'gewinde', label: 'Gewinde-Außendurchmesser R' + P.R + '" (2. Kuppe)',
        soll: Math.round((P.threadOD - 2 * P.threadPitch / 32) * 100) / 100,
        ist: () => {
          const hit = A.probeAxial('stud',
            V3(0, P.L1 + P.threadPitch, P.threadOD), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      /* GEGENPROBE: der Grund zwischen zwei Kuppen MUSS eine
         Gewindetiefe tiefer liegen. Gleicher Wert hieße, das Gewinde ist
         ein glatter Kegel (Fall 25). */
      { key: 'gewindegrund', label: 'Gewinde-Kerndurchmesser',
        soll: (() => {
          const h = 0.640327 * P.threadPitch;
          const rd = Math.max(0.3, 0.137 * P.threadPitch);
          return Math.round((P.threadOD - 2 * (1.5 * P.threadPitch) / 32 - 2 * h
            + 2 * rd * (1 / Math.sin(27.5 * Math.PI / 180) - 1)) * 100) / 100;
        })(),
        ist: () => {
          const hit = A.probeAxial('stud',
            V3(0, P.L1 + 1.5 * P.threadPitch, P.threadOD), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },

      /* Wandstärken sind per Definition Parameter, keine Messungen —
         und heißen deshalb so (Fall 12, zulässige Ausnahme). */
      { key: 'restwand', label: 'Restwand Muffenschenkel', soll: P.restwand, ist: () => P.restwand },
      { key: 'restwandB', label: 'Restwand über dem Einsatz', soll: P.restwandB, ist: () => P.restwandB },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
