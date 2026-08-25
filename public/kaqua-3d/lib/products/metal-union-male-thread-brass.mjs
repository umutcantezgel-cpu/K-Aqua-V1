/* K-Aqua 3D · Metallverschraubung Messing CW617N (Außengewinde) — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID transition-fittings/metal-union-male-thread-brass.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, ISO, SEG_INT, SEG_VIS, buildProfile, capFromProfile, createAssembly, fusionDepth, hexPrism, materials, mergeGeometries, revolve, socketOD, socketODSizes, threadProfile, threadSpec,
} from '../kaqua-3d-core.mjs';

/* == _union/params.js ================================================== */
/* K-Aqua Metallverschraubungen — gemeinsame Parametrik der Baugruppe.

   Vier Produkte teilen sie:
     metal-union-female-thread          Rp, vernickelt   AQ542xx
     metal-union-female-thread-brass    Rp, Messing      AQ532xx
     metal-union-male-thread            R,  vernickelt   AQ547xx
     metal-union-male-thread-brass      R,  Messing      AQ537xx

   Zwei Maßsätze (IG und AG), vier Artikelreihen. Die Tabellen der
   beiden Messingvarianten sind mit ihren Nicht-Messing-Zwillingen
   Zeile für Zeile identisch — nur die Codes und der Werkstoff
   unterscheiden sich.

   ── DIE BAUGRUPPE ──

   Vier Teile, von links nach rechts:

     1  PP-R-Muffe      grün, Schweißmuffe, Länge l
     2  Flachdichtung   EPDM, Dicke L − l − l1
     3  Gewindekörper   Metall, Sechskant SW1, trägt R bzw. Rp, Länge l1
     4  Überwurfmutter  Metall, Sechskant SW, liegt über 1 und 3

   Belegt durch die Maßzeichnung auf allen vier Produktseiten
   (quellen/w5-zeichnung-male.png, -fem.png): sie führt SW an den linken
   Sechskant und SW1 an den rechten, l vom linken Ende bis zur
   Dichtfläche, l1 von dort bis rechts.

   ── DIE SPALTE l ZERFÄLLT IN NORM PLUS KONSTANTE ──

   l minus die Schweißtiefe der Normreihe DVS 2207-11:

     d20  19 − 14,5 = 4,5      d40  26 − 20,5 = 5,5
     d25  22 − 16,0 = 6,0      d50  29 − 23,5 = 5,5
     d32  23 − 18,0 = 5,0      d63  32 − 27,5 = 4,5

   Über sechs Größen konstant 5,2 ± 0,8 mm. Das ist der Hals mit dem
   Dichtbund hinter der Muffe — und zugleich eine unabhängige Bestätigung
   der Schweißtiefenannahme aus Fall 4: eine zweite Tabelle, die dieselbe
   Normreihe trägt, ohne sie zu nennen.

   Daraus folgt die Lage der Mutter: sie sitzt auf genau diesem Hals,
   ihre linke Stirn liegt am Ende der Schweißmuffe. Keine Fotoableitung
   nötig — beide Summanden sind Rang 1 und Rang 2.

   ── DIE SPALTE G WIRD NICHT MODELLIERT ──
   Werte 1 · 1 1/4 · 1 1/2 · 2 · 2 1/4 · 2 3/4 Zoll.

   G bezeichnet das Kupplungsgewinde zwischen Mutter und Körper. Es
   liegt vollständig im Inneren der Mutter und bildet keine Silhouette.
   products/union (PP-R-Verschraubung, dieselbe Mutter, dieselbe
   G-Spalte) führt es ebenso mit, ohne es zu modellieren — diesem
   Vorgehen folgt die Baugruppe.

   Die Normdurchmesser nach ISO 228-1 sind trotzdem hinterlegt: sie
   tragen die Zusicherung nutWall(), die den Tippfehler bei d25 abfängt.

   ── DER TIPPFEHLER BEI d25 ──

   Drei der vier Produktseiten drucken G = 1 3/4" bei d25, die vierte
   und products/union drucken 1 1/4". Beleg
   quellen/w5-spalte-g-vier-seiten.png, alle vier bei gleicher
   Vergrößerung; die Glyphen sind eindeutig, es ist kein Lesefehler.

   Die Mehrheit ist falsch. Zwei Plausibilitätsregeln brechen (Fall 3):

     Monotonie   1 · 1,75 · 1,5 · 2 · 2,25 · 2,75 fällt zwischen d25 und
                 d32. Eine d25-Verschraubung kann kein größeres
                 Kupplungsgewinde tragen als eine d32.
     Restwand    (SW − G_außen)/2 bei d25:
                   mit 1 1/4" → (48 − 41,91)/2 = +3,05 mm
                   mit 1 3/4" → (48 − 53,74)/2 = −2,87 mm
                 Negativ heißt: das Gewinde wäre größer als die
                 Schlüsselweite, die es umschließt (Fall 31).
                 3,05 mm deckt sich mit d32 (3,10 mm).

   Gesetzt wird 1 1/4". nutWall() wirft, falls die Zahl je zurückkommt.

   ── WAS NICHT AUS DER QUELLE FOLGT ──

   Die Aufteilung von l1 auf Kupplungszone, Sechskant und Gewinde ist
   nicht tabelliert. Sie stammt aus dem Silhouettenprofil des
   Katalogfotos und ist unten je Wert begründet. Fotoableitung ist
   Rang 3 (Fall 31) — sie bestimmt hier nur Maße, die keine Tabelle
   führt, und widerspricht keinem Maß aus Rang 1 oder 2. */


/* Muffen-Außendurchmesser. NICHT gerechnet: tabelliert in
   products/socket/data.js, Spalte D, aus demselben Katalog. Der
   frühere Ansatz 1,375·d trifft nur d32 — er lag bei d20 um 1,5 mm zu
   klein und bei d63 um 2,6 mm zu groß. Das Katalogfoto bestätigt die
   Tabelle: gemessener Grünring Ø28,2 bei d20 gegen tabellierte 29. */
/* Die Tabelle steht seit dem 24.08.2026 im Core (socketOD) — die
   Anbohrsattel-Familie braucht dieselbe Reihe. Hier bleibt ein
   Durchreicher stehen, damit der Rest dieser Familie unverändert
   bleibt; der Selbsttest muss danach Zahl für Zahl dasselbe melden. */
export const SOCKET_OD = Object.fromEntries(
  socketODSizes().map((d) => [d, socketOD(d)])
);

/* Die Gewindetabelle steht seit dem 24.08.2026 im Core
   (core/geometry.js, threadSpec) — sie stand fünfmal im Produktcode
   und gehört dorthin, wo FUSION_DEPTH steht (Fall 19). */

/* Kupplungsgewinde der Mutter, ISO 228-1. Nur für die Zusicherung. */
export const NUT_THREAD_OD = {
  '1': 33.25, '1 1/4': 41.91, '1 1/2': 47.80, '1 3/4': 53.74,
  '2': 59.61, '2 1/4': 65.71, '2 3/4': 81.53,
};

/* Aufteilung von l1. Kalibriert am Silhouettenprofil des Katalogfotos
   bei d20 (siehe Prüfbericht §3), in Anteilen von l1 bzw. SW1:

     Sechskant SW1   0,21 · SW1   gemessen 5,5 mm bei SW1 = 26
     AG: Gewinde     0,53 · l1    gemessen 15,5 mm bei l1 = 29
     IG: Kupplung    0,24 · l1    gemessen  3,8 mm bei l1 = 16

   Gegenprobe für den AG-Anteil: 0,53·l1 ergibt über alle Größen
   15,4 · 16,4 · 20,1 · 23,3 · 23,3 · 26,5 mm. Die nutzbaren
   Gewindelängen nach ISO 7-1 lauten 15,0 · 16,3 · 19,1 · 21,4 · 21,4 ·
   25,7 mm. Der Anteil reproduziert eine Normreihe, die nirgends
   eingegeben wurde — das trägt ihn besser als jede Sichtprüfung. */
const HEX_LEN_OF_AF = 0.21;
const THREAD_LEN_OF_L1 = 0.53;
const COUPLING_LEN_OF_L1 = 0.24;

/* Fillet-Rückzug (Fall 23). Ein Fillet auf einem Profilpunkt zieht den
   Punkt um r·(1/sin(α/2) − 1) von seiner theoretischen Spitze weg.

     Sechskantecke   Innenwinkel 120° → α/2 = 60°  → 0,1547·r
     Whitworth-Flanke 55°             → α/2 = 27,5° → 1,1659·r

   Die Schlüsselweite ist davon NICHT betroffen — sie liegt auf der
   Flächenmitte, wo kein Fillet sitzt. Das Eckenmaß ist es sehr wohl,
   und es ist kein Katalogmaß, sondern Gegenprobe. Deshalb wird der
   Rückzug in den SOLLWERT gerechnet und nicht aus der Geometrie
   entfernt: ein realer Sechskant hat verrundete Ecken.

   threadProfile gleicht den Rückzug an den KUPPEN aus (dort liegt das
   Nennmaß), an den GRÜNDEN nicht — sie sind kein Maßort. Der Grund
   misst deshalb um 2·r·1,1659 weiter außen als die theoretische Spitze. */
const RUECKZUG_HEX = 1 / Math.sin(60 * D2R) - 1;
const RUECKZUG_FLANKE = 1 / Math.sin(27.5 * D2R) - 1;

export function unionParams(a, cfg) {
  const kind = cfg.threadKind;                 // 'R' oder 'Rp'
  const P = Object.assign({}, a);
  const d = a.d;
  const gewinde = kind === 'R' ? a.R : a.Rp;

  const th = threadSpec(gewinde);
  if (!th) throw new Error('K-Aqua Verschraubung: kein Normmaß für ' + kind + gewinde);
  P.threadKind = kind;
  P.threadLabel = gewinde;
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  /* Gewindetiefe nach Whitworth — dieselbe Formel wie in threadProfile.
     Der Kerndurchmesser ist der Nennmaßort des Innengewindes. */
  P.threadH = 0.640327 * th.pitch;
  P.threadCore = Math.round((th.od - 2 * P.threadH) * 1000) / 1000;
  /* Kuppen- und Grundradius wie in threadProfile. */
  P.threadRd = Math.max(0.3, 0.137 * th.pitch);
  P.threadRootRise = Math.round(2 * P.threadRd * RUECKZUG_FLANKE * 1000) / 1000;
  P.threadTaper = kind === 'R' ? 1 / 32 : 0;

  P.len = a.L;
  P.xEnd = a.L / 2;
  const xA = -a.L / 2;
  P.xA = xA;

  /* Längsaufteilung, ausschließlich aus der Tabelle. */
  P.sleeveLen = a.l;
  P.bodyLen = a.l1;
  P.gasketTh = a.L - a.l - a.l1;
  P.xSealA = xA + a.l;
  P.xSealB = P.xSealA + P.gasketTh;

  /* PP-R-Seite. */
  P.socket = fusionDepth(d);
  if (!P.socket) throw new Error('K-Aqua Verschraubung d' + d + ': keine Schweißtiefe in der Normreihe');
  P.sleeveOD = SOCKET_OD[d];
  if (!P.sleeveOD) throw new Error('K-Aqua Verschraubung d' + d + ': kein Muffen-Außendurchmesser tabelliert');
  P.rSleeve = P.sleeveOD / 2;
  P.wallPipe = d / 6;                          // SDR 6
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = Math.round((P.sleeveOD - d) / 2 * 10) / 10;

  /* Der Hals hinter der Muffe: l minus Schweißtiefe, über alle Größen
     rund 5 mm. Auf ihm sitzt die Mutter. */
  P.neckLen = Math.round((a.l - P.socket) * 100) / 100;
  P.xNutL = xA + P.socket;
  P.greenVisible = P.socket;
  P.greenShare = Math.round(P.socket / a.L * 1000) / 10;

  /* Sechskante. rCirc ist der UMKREIS (Eckenmaß/2) — der
     Rotationskörper darunter liegt auf dem INKREIS af/2, sonst umhüllt
     er den Sechskant und die Schlüsselflächen verschwinden (Fall 11). */
  P.afNut = a.SW;
  P.rNutCirc = a.SW / Math.sqrt(3);
  P.hexFilletNut = Math.max(0.3, a.SW * 0.03);
  P.cornerNut = Math.round((2 * (a.SW / Math.sqrt(3) - RUECKZUG_HEX * P.hexFilletNut)) * 100) / 100;
  P.afBody = a.SW1;
  P.rBodyCirc = a.SW1 / Math.sqrt(3);
  P.hexFilletBody = Math.max(0.3, a.SW1 * 0.03);
  P.cornerBody = Math.round((2 * (a.SW1 / Math.sqrt(3) - RUECKZUG_HEX * P.hexFilletBody)) * 100) / 100;

  /* Aufteilung von l1. */
  P.bodyHexLen = Math.round(HEX_LEN_OF_AF * a.SW1 * 100) / 100;
  if (kind === 'R') {
    P.threadLen = Math.round(THREAD_LEN_OF_L1 * a.l1 * 100) / 100;
    P.couplingLen = Math.round((a.l1 - P.threadLen - P.bodyHexLen) * 100) / 100;
  } else {
    P.couplingLen = Math.round(COUPLING_LEN_OF_L1 * a.l1 * 100) / 100;
    P.threadLen = Math.round((a.l1 - P.couplingLen - P.bodyHexLen) * 100) / 100;
  }
  P.turns = Math.max(3, Math.floor((P.threadLen - 1) / P.threadPitch));

  P.xCouplingEnd = P.xSealB + P.couplingLen;
  P.xBodyHexEnd = P.xCouplingEnd + P.bodyHexLen;

  /* Mutter: von der Muffenstirn bis über die Kupplungszone. */
  P.xNutR = P.xCouplingEnd;
  P.nutLen = Math.round((P.xNutR - P.xNutL) * 100) / 100;
  P.nutHexLen = Math.round(P.nutLen * 0.55 * 100) / 100;
  P.xNutHexEnd = P.xNutR - P.nutLen * 0.10;
  P.xNutHexA = P.xNutHexEnd - P.nutHexLen;

  /* Dichtbund am Halsende: größer als die Schulterbohrung der Mutter,
     kleiner als deren Inkreis. Er trägt die Dichtfläche. */
  P.rFlange = Math.min(P.rNutCirc * 0.84, P.rSleeve * 1.12);
  P.rNeck = Math.max(P.boreR + P.wallPipe * 0.8, P.rSleeve * 0.86);
  P.rNutShoulder = P.rNeck + 0.5;
  P.rCoupling = P.rFlange + 1.0;
  P.gasketOD = Math.round(2 * P.rFlange * 10) / 10;

  P.nutWall = Math.round((a.SW - 2 * P.rCoupling) / 2 * 100) / 100;
  P.aspect = Math.round(a.L / P.cornerNut * 100) / 100;

  /* ── Zusicherungen ──
     Jede fängt einen Fehler ab, der im Katalog schon vorkam. */

  if (!(P.gasketTh > 0)) {
    throw new Error('K-Aqua Verschraubung d' + d + ': L − (l + l1) = ' +
      P.gasketTh.toFixed(1) + ' mm — ohne Platz für die Dichtung ' +
      'durchdringen sich Muffe und Körper (Fall 31)');
  }
  if (!(P.neckLen > 1)) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Hals ' + P.neckLen.toFixed(1) +
      ' mm — l ist kürzer als die Schweißtiefe ' + P.socket + ' mm');
  }
  if (!(P.couplingLen > 1.5)) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Kupplungszone ' +
      P.couplingLen.toFixed(1) + ' mm trägt keine Mutter');
  }
  if (!(P.rFlange > P.rNutShoulder)) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Dichtbund Ø' +
      (2 * P.rFlange).toFixed(1) + ' hält die Mutter nicht (Schulter Ø' +
      (2 * P.rNutShoulder).toFixed(1) + ')');
  }
  if (!(P.afBody < P.afNut)) {
    throw new Error('K-Aqua Verschraubung d' + d + ': SW1 ' + a.SW1 +
      ' liegt nicht unter SW ' + a.SW + ' — die Mutter griffe nicht über den Körper');
  }
  if (!(P.threadOD < P.afBody)) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Gewinde Ø' +
      P.threadOD.toFixed(1) + ' passt nicht in den Sechskant SW1 ' + a.SW1);
  }
  /* Der d25-Tippfehler. Die Restwand über dem Kupplungsgewinde muss
     positiv sein und mindestens eine Wandstärke tragen. */
  const gOD = NUT_THREAD_OD[a.G];
  if (gOD !== undefined) {
    P.gOD = gOD;
    P.gWall = Math.round((a.SW - gOD) / 2 * 100) / 100;
    if (P.gWall < 1.5) {
      throw new Error('K-Aqua Verschraubung d' + d + ': Kupplungsgewinde G' + a.G +
        '" (Ø' + gOD.toFixed(2) + ') lässt in SW ' + a.SW + ' nur ' +
        P.gWall.toFixed(2) + ' mm Wand — Tabellenwert prüfen');
    }
  }
  if (kind === 'Rp' && !(P.threadCore > P.bore)) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Innengewindekern Ø' +
      P.threadCore.toFixed(2) + ' liegt nicht über der Rohrbohrung Ø' +
      P.bore.toFixed(2));
  }
  return P;
}


/* == _union/parts.js =================================================== */
/* K-Aqua Metallverschraubungen — gemeinsame Konturen.

   Vier Teile. Die Reihenfolge der Konturpunkte ist immer außen von
   links nach rechts, dann innen von rechts nach links — so schließt
   buildProfile die Kontur ohne Kegelfläche (Fall 21).

   Sechskant-Orientierung: hexPrism legt nach seiner internen
   rotateY(π/2) eine SCHLÜSSELFLÄCHE auf Z und eine ECKE auf Y. Ein
   Strahl in −Z misst die Schlüsselweite, ein Strahl in −Y das
   Eckenmaß. Beide Messungen zusammen beweisen, dass der Sechskant die
   Silhouette bildet und kein Zylinder ihn umhüllt (Fall 11 und 13).

   bevel = 0 an beiden Sechskanten: bevelSize nimmt vom Umkreis und
   zöge das Eckenmaß unter das Nennmaß (Fall 23). */


/* 1 · PP-R-Muffe: Schweißmuffe, Hals, Dichtbund. Länge l. */
export function buildSleeve(P) {
  const xA = P.xA;
  const xB = P.xSealA;
  const xNeck = xA + P.socket;
  const rMouth = Math.max(1.0, P.rSleeve * 0.06);
  const rSock = (x) => P.d / 2 - P.sockTaper * (x - xA);

  const outer = [
    /* Bund am Mundloch: D liegt AUF dem Bund, der Zylinder dahinter
       tiefer — nicht umgekehrt (Fall 6). */
    { a: xA, r: P.rSleeve, fillet: rMouth, w: 0 },
    { a: xA + rMouth * 0.7, r: P.rSleeve - DRAFT * rMouth * 0.7, fillet: 0.4, w: 0 },
    { a: xNeck - 1.0, r: P.rSleeve, fillet: 0.6, w: 0 },
    { a: xNeck, r: P.rNeck, fillet: 0.8, w: 0 },
    { a: xB - P.neckLen * 0.42, r: P.rNeck, fillet: 0.6, w: 0 },
    { a: xB - P.neckLen * 0.30, r: P.rFlange, fillet: 0.5, w: 0 },
    /* Die Dichtfläche bleibt plan: keine Fase am Profilende, sonst
       ragt sie über xB hinaus und macht den Dichtspalt negativ. */
    { a: xB, r: P.rFlange, fillet: 0, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.boreR, fillet: 0.6 },
    { a: xA + P.socket, r: P.boreR, fillet: 1.0 },
    { a: xA + P.socket, r: rSock(xA + P.socket), fillet: 1.0 },
    { a: xA + 2, r: rSock(xA + 2), fillet: 0.4 },
    { a: xA, r: P.d / 2 + P.lead, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  return {
    geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
    cap: capFromProfile(profile, 'x'),
    profile,
  };
}

/* 2 · Flachdichtung: Stanzteil aus EPDM, Kanten nicht verrundet.
   Dicke = L − (l + l1), also 2 bis 4 mm — genau der Bereich, den
   20-VISUELLE-REFERENZ §4.1 für Flachdichtungen nennt. */
export function buildGasket(P) {
  const xA = P.xSealA;
  const xB = P.xSealB;
  const outer = [
    { a: xA, r: P.rFlange, chamfer: 0.2, w: 0 },
    { a: xB, r: P.rFlange, chamfer: 0.2, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.boreR, chamfer: 0.2 },
    { a: xA, r: P.boreR, chamfer: 0.2 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 2 });
  return {
    geo: revolve(profile, { axis: 'x', segments: SEG_INT }),
    cap: capFromProfile(profile, 'x'),
    profile,
  };
}

/* 3 · Überwurfmutter: Sechskant SW, innen die Schulter, die hinter dem
   Dichtbund greift, und die Kupplungsbohrung.

   Der Rotationskörper liegt über der Sechskantlänge auf dem INKREIS
   (afNut/2). Läge er auf dem Umkreis, umhüllte er den Sechskant und
   die Silhouette wäre ein perfekter Kreis (Fall 11). */
export function buildNut(P) {
  const xA = P.xNutL;
  const xB = P.xNutR;
  const rIn = P.afNut / 2;
  const rRim = Math.min(rIn, P.rCoupling + Math.max(1.6, P.nutWall * 0.55));

  const outer = [
    { a: xA, r: P.rNutShoulder + Math.max(1.2, P.nutLen * 0.06), chamfer: 0.5, w: 0 },
    { a: xA + P.nutLen * 0.10, r: rIn, fillet: 0.6, w: 0 },
    { a: P.xNutHexA, r: rIn, fillet: 0.4, w: 0 },
    { a: P.xNutHexEnd, r: rIn, fillet: 0.4, w: 0 },
    { a: P.xNutHexEnd + P.nutLen * 0.04, r: rRim, fillet: 0.5, w: 0 },
    { a: xB, r: rRim, chamfer: 0.6, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.rCoupling, chamfer: 0.8 },
    { a: P.xSealA - 0.6, r: P.rCoupling, fillet: 0.6 },
    { a: P.xSealA - 0.6, r: P.rFlange + 0.35, fillet: 0.5 },
    { a: xA + P.nutLen * 0.24, r: P.rFlange + 0.35, fillet: 0.5 },
    { a: xA + P.nutLen * 0.24, r: P.rNutShoulder, fillet: 0.5 },
    { a: xA, r: P.rNutShoulder, chamfer: 0.4 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  const hex = hexPrism(P.afNut, P.nutHexLen, P.hexFilletNut, 0);
  hex.translate(P.xNutHexA, 0, 0);
  geos.push(hex);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}

/* 4 · Gewindekörper: Kupplungszone unter der Mutter, Sechskant SW1,
   dann das Gewinde.

   kind 'R'  — kegeliges Außengewinde 1:16, verjüngt zur freien Spitze.
   kind 'Rp' — zylindrisches Innengewinde in der Öffnung.

   ASSUMPTION Messebene beim Außengewinde: der Nennmaßort liegt am
   GEWINDEANFANG (Sechskantseite), von dort verjüngt sich das Gewinde
   zur Spitze. Die Tabelle führt keine Einschraublänge, und die
   Grundmaße nach ISO 7-1 stehen nicht in der Quelle — die Messebene
   ist deshalb gesetzt, nicht abgelesen. Die Messung 'gewinde' tastet
   genau diesen Ort ab. */
export function buildBody(P) {
  const xA = P.xSealB;
  const xHexA = P.xCouplingEnd;
  const xHexB = P.xBodyHexEnd;
  const xB = P.xEnd;
  const rHexIn = P.afBody / 2;
  const male = P.threadKind === 'R';

  const outer = [
    { a: xA, r: P.rFlange, fillet: 0, w: 0 },
    { a: xA + Math.min(1.2, P.couplingLen * 0.25), r: P.rCoupling - 0.4, chamfer: 0.5, w: 0 },
    { a: xHexA - 0.6, r: P.rCoupling - 0.4, fillet: 0.5, w: 0 },
    { a: xHexA, r: rHexIn, fillet: 0.5, w: 0 },
    { a: xHexB, r: rHexIn, fillet: 0.4, w: 0 },
  ];

  if (male) {
    const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'R')
      .map((p) => ({ a: xHexB + 0.8 + p.a, r: p.r, fillet: p.fillet }))
      .filter((p) => p.a <= xB - 0.8);
    /* Gewindeauslauf auf dem Kerndurchmesser, dann die Kontur. Kein
       Punkt auf demselben a wie die erste Kuppe — zwei Punkte mit
       gleichem a machen aus dem Kuppenfillet eine senkrechte Stufe und
       verschieben den Scheitel. */
    outer.push({ a: xHexB + 0.35, r: P.threadOD / 2 - P.threadH, chamfer: 0.4, w: 0 });
    thread.forEach((p) => outer.push({ ...p, w: 0 }));
    outer.push({ a: xB, r: P.threadOD / 2 - P.threadH - 0.3, chamfer: 0.4, w: 0 });
  } else {
    outer.push({ a: xHexB + Math.max(1.0, P.threadLen * 0.14), r: rHexIn * 0.96, fillet: 0.5, w: 0 });
    outer.push({ a: xB, r: rHexIn * 0.96, chamfer: 0.7, w: 0 });
  }

  const inner = [];
  if (male) {
    inner.push({ a: xB, r: P.boreR, chamfer: 0.6 });
  } else {
    /* Innengewinde von rechts nach links. threadProfile liefert ab
       a = 0 in +a; die Kontur läuft hier rückwärts, deshalb gespiegelt
       eingesetzt. Der Kern liegt auf threadOD − 2h, der Grund auf dem
       Nennmaß — siehe Kopfkommentar von threadProfile. */
    const xThA = xB - 1.2 - P.turns * P.threadPitch;
    const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'Rp')
      .map((p) => ({ a: xThA + p.a, r: p.r, fillet: p.fillet }))
      .filter((p) => p.a <= xB - 1.0);
    inner.push({ a: xB, r: P.threadOD / 2 + P.threadPitch * 0.2, chamfer: 0.9 });
    thread.slice().reverse().forEach((p) => inner.push(p));
    inner.push({ a: xThA - 0.8, r: P.threadCore / 2, fillet: 0.5 });
  }
  inner.push({ a: xHexA, r: P.boreR, fillet: 0.8 });
  inner.push({ a: xA + 1.0, r: P.boreR, chamfer: 0.5 });
  inner.push({ a: xA, r: P.boreR + 0.5, fillet: 0 });

  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  const hex = hexPrism(P.afBody, xHexB - xHexA, P.hexFilletBody, 0);
  hex.translate(xHexA, 0, 0);
  geos.push(hex);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}


/* == _union/assembly.js ================================================ */
/* K-Aqua Metallverschraubungen — gemeinsame Baugruppe und Maßtest.

   Vier Produkte rufen buildUnion() mit ihrer Tabelle, ihrem
   Gewindetyp und ihrem Werkstoffschlüssel auf. Der Bau steht genau
   einmal hier.

   Warum nicht vier Kopien in vier index.js: viermal derselbe Aufbau
   driftet — vier von 33 Fällen im Fehlerkatalog sind genau dieser
   Mechanismus (Fälle 19, 28, 32 und die drei Anzeigestring-Funde).
   Ein Begriff, der an mehreren Stellen entsteht, gehört an eine. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;
const komma = (v) => String(v).replace('.', ',');

export function buildUnion(cfg, size, variant, clipPlane) {
  const a = cfg.article(size);
  const P = unionParams(a, cfg);
  const metal = cfg.metal;                     // 'steel' oder 'brass'

  const A = createAssembly({
    name: cfg.exportName + '_d' + size,
    materials: ['pprGreen', metal, 'epdm'],
    seed: cfg.seed,
    clipPlane,
  });

  const sleeve = buildSleeve(P);
  const gasket = buildGasket(P);
  const body = buildBody(P);
  const nut = buildNut(P);

  A.part('sleeve', {
    name: 'PP_Muffe', label: 'PP-R-Muffe mit Schweißmuffe', mat: 'pprGreen',
    geo: sleeve.geo, cap: sleeve.cap,
    explode: -0.62 * P.len,
    anchor: V3(P.xA + P.socket * 0.5, P.rSleeve + 0.26 * P.len, 0),
  });
  A.part('gasket', {
    name: 'Flachdichtung', label: 'Flachdichtung EPDM, ' +
      komma(r2(P.gasketTh)) + ' mm', mat: 'epdm',
    geo: gasket.geo, cap: gasket.cap,
    explode: -0.18 * P.len,
    anchor: V3(P.xSealA, P.rFlange + 0.13 * P.len, 0),
  });
  A.part('nut', {
    name: 'Ueberwurfmutter', label: 'Überwurfmutter SW ' + P.afNut +
      ' (' + cfg.metalLabel + ')', mat: metal,
    geo: nut.geo, cap: nut.cap,
    explode: V3(-0.30 * P.len, 0.55 * P.cornerNut, 0),
    anchor: V3(P.xNutHexA + P.nutHexLen * 0.5, -(P.rNutCirc + 0.22 * P.len), 0),
  });
  A.part('body', {
    name: 'Gewindekoerper', label: 'Gewindekörper ' + P.threadKind +
      P.threadLabel + '" (' + cfg.metalLabel + ')', mat: metal,
    geo: body.geo, cap: body.cap,
    explode: 0.62 * P.len,
    anchor: V3(P.xBodyHexEnd, P.rBodyCirc + 0.20 * P.len, 0),
  });

  A.light(V3(P.xA + P.socket * 0.5, 0, 0));
  A.light(V3(P.xEnd * 0.6, 0, 0));

  A.hotspot({
    v: V3(P.xA + Math.max(3, 0.08 * P.len), P.rSleeve * 0.5, P.rSleeve * 0.84),
    n: V3(0, 0.5, 0.86),
    text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
      komma(P.socket) + ' mm nach DVS 2207-11',
  });
  A.hotspot({
    v: V3(P.xNutHexA + P.nutHexLen * 0.5, 0, P.afNut / 2),
    n: V3(0, 0.2, 0.98),
    text: 'Überwurfmutter, Schlüsselweite ' + P.afNut +
      ' — lösbar, ohne die Schweißnaht zu öffnen',
  });
  A.hotspot({
    v: V3(P.xCouplingEnd + (P.xBodyHexEnd - P.xCouplingEnd) * 0.5, 0, P.afBody / 2),
    n: V3(0, 0.24, 0.97),
    text: 'Schlüsselweite ' + P.afBody + ' am Körper — zum Gegenhalten ' +
      'beim Anziehen der Mutter',
  });
  A.hotspot({
    v: cfg.threadKind === 'R'
      ? V3(P.xEnd - P.threadLen * 0.4, P.threadOD * 0.35, P.threadOD * 0.35)
      : V3(P.xEnd - P.threadLen * 0.35, P.threadCore * 0.3, P.threadCore * 0.3),
    n: V3(0.25, 0.68, 0.69),
    text: cfg.threadKind === 'R'
      ? 'Außengewinde R' + P.threadLabel + '" nach ISO 7-1, kegelig 1:16, ' +
        P.turns + ' Gänge'
      : 'Innengewinde Rp' + P.threadLabel + '" nach ISO 228-1, zylindrisch, ' +
        P.turns + ' Gänge',
  });
  A.hotspot({
    v: V3(P.xSealA + P.gasketTh * 0.5, P.rFlange * 0.72, P.rFlange * 0.72),
    n: V3(0, 0.7, 0.71),
    text: 'Flachdichtung zwischen PP-R-Bund und Messingkörper',
  });

  const zf = P.rNutCirc + 0.12 * P.len;
  const yL = -(P.rNutCirc + 0.30 * P.len);
  A.dim({ label: 'L', value: P.len,
    a: V3(P.xA, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.11 * P.len, 0) });
  A.dim({ label: 'l', value: P.sleeveLen,
    a: V3(P.xA, yL * 0.72, zf), b: V3(P.xSealA, yL * 0.72, zf),
    off: V3(0, 0.07 * P.len, 0) });
  A.dim({ label: 'l1', value: P.bodyLen,
    a: V3(P.xSealB, yL * 0.72, zf), b: V3(P.xEnd, yL * 0.72, zf),
    off: V3(0, 0.07 * P.len, 0) });
  const xD = P.xA - 0.14 * P.len;
  A.dim({ label: 'SW', value: P.afNut,
    a: V3(xD, -P.afNut / 2, zf), b: V3(xD, P.afNut / 2, zf),
    off: V3(0.12 * P.len, 0, 0) });

  /* ── MASSTEST ──
     Jede ist()-Funktion wertet gebaute Geometrie aus. Keine gibt einen
     P.-Wert zurück außer der ausdrücklich als Parameter benannten
     Restwand (Fall 12).

     Zu jeder Sechskant- und Gewindemessung gehört eine GEGENPROBE an
     einer Stelle, wo sie einen anderen Wert liefern MUSS (Fall 25).
     Liefert das Paar zweimal dasselbe, ist der Sechskant nicht da
     beziehungsweise das Gewinde glatt. */

  const xNutMid = P.xNutHexA + P.nutHexLen * 0.5;
  const xBodyMid = P.xCouplingEnd + (P.xBodyHexEnd - P.xCouplingEnd) * 0.5;
  const strahl = (id, from, dir) => {
    const hit = A.probeAxial(id, from, dir);
    return hit || null;
  };

  const messungen = [
    { key: 'L', label: 'Gesamtlänge', soll: P.len,
      ist: () => { const b = A.boxOf(); return r2(b.max.x - b.min.x); } },

    { key: 'l', label: 'Länge PP-R-Teil', soll: P.sleeveLen,
      ist: () => { const b = A.visibleBoxOf(['sleeve']); return r2(b.max.x - b.min.x); } },

    { key: 'l1', label: 'Länge Gewindekörper', soll: P.bodyLen,
      ist: () => { const b = A.visibleBoxOf(['body']); return r2(b.max.x - b.min.x); } },

    /* Dichtungsdicke einmal am Teil selbst … */
    { key: 'dicht', label: 'Dicke der Flachdichtung', soll: r2(P.gasketTh),
      ist: () => { const b = A.visibleBoxOf(['gasket']); return r2(b.max.x - b.min.x); } },

    /* … und einmal als Abstand der beiden Nachbarn. Zwei Wege zu
       derselben Zahl: wird dieser hier negativ, durchdringen sich
       Muffe und Körper (Fall 31). */
    { key: 'spalt', label: 'Abstand Muffe zu Körper', soll: r2(P.gasketTh),
      ist: () => {
        const s = A.visibleBoxOf(['sleeve']), b = A.visibleBoxOf(['body']);
        return r2(b.min.x - s.max.x);
      } },

    /* Die Dicke allein fiele auch bei einer Dichtung richtig aus, die
       den falschen Durchmesser hat oder zum Strich entartet ist
       (Frage b). Deshalb der Außendurchmesser dazu — Strahl von außen
       auf die Mitte der Dichtung. */
    { key: 'dichtOD', label: 'Außendurchmesser der Dichtung', soll: P.gasketOD,
      ist: () => {
        const h = strahl('gasket', V3(P.xSealA + P.gasketTh * 0.5, 0, P.gasketOD),
          V3(0, 0, -1));
        return h ? r2(2 * h.z) : NaN;
      } },

    /* Die Mutter darf den Körper nicht durchdringen. Strahl von der
       ACHSE nach außen in der Kupplungszone: er trifft die
       Mutterbohrung. Sie muss über dem Außenmaß der Kupplungszone
       liegen, sonst stecken zwei Teile ineinander (Fall 31). */
    { key: 'mutterbohrung', label: 'Bohrung der Mutter über der Kupplungszone',
      soll: r2(2 * P.rCoupling),
      ist: () => {
        const h = strahl('nut', V3(P.xSealB + P.couplingLen * 0.5, 0, 0), V3(0, 0, 1));
        return h ? r2(2 * h.z) : NaN;
      } },

    /* Schlüsselweite der Mutter: Strahl in −Z auf eine Schlüsselfläche. */
    { key: 'SW', label: 'Schlüsselweite Mutter', soll: P.afNut,
      ist: () => {
        const h = strahl('nut', V3(xNutMid, 0, P.afNut), V3(0, 0, -1));
        return h ? r2(2 * h.z) : NaN;
      } },

    /* GEGENPROBE zu SW: Strahl in −Y auf eine Ecke. hexPrism legt die
       Fläche auf Z und die Ecke auf Y — der Wert MUSS hier das
       Eckenmaß sein. Käme wieder SW heraus, läge ein Zylinder über dem
       Sechskant und die Schlüsselflächen wären im Material (Fall 11). */
    { key: 'SW_ecke', label: 'Eckenmaß Mutter', soll: P.cornerNut,
      ist: () => {
        const h = strahl('nut', V3(xNutMid, P.afNut, 0), V3(0, -1, 0));
        return h ? r2(2 * h.y) : NaN;
      } },

    { key: 'SW1', label: 'Schlüsselweite Körper', soll: P.afBody,
      ist: () => {
        const h = strahl('body', V3(xBodyMid, 0, P.afBody), V3(0, 0, -1));
        return h ? r2(2 * h.z) : NaN;
      } },

    { key: 'SW1_ecke', label: 'Eckenmaß Körper', soll: P.cornerBody,
      ist: () => {
        const h = strahl('body', V3(xBodyMid, P.afBody, 0), V3(0, -1, 0));
        return h ? r2(2 * h.y) : NaN;
      } },

    /* Überdeckung der Mutter über die Kupplungszone des Körpers.
       Ein Wert, keine Ja/Nein-Prüfung (Fall 25). */
    { key: 'griff', label: 'Überdeckung Mutter über Körper', soll: r2(P.couplingLen),
      ist: () => {
        const n = A.visibleBoxOf(['nut']), b = A.visibleBoxOf(['body']);
        return r2(n.max.x - b.min.x);
      } },

    /* Grünanteil. Soll ist die Schweißtiefe der Normreihe, nicht der
       Fotowert — Begründung in params.js. visibleBoxOf, weil der
       Schnittflächen-Stencil unsichtbar ist, aber in boxOf eingeht. */
    { key: 'gruen', label: 'Sichtbare PP-R-Länge', soll: r2(P.greenVisible),
      ist: () => {
        const s = A.visibleBoxOf(['sleeve']), n = A.visibleBoxOf(['nut']);
        return r2(n.min.x - s.min.x);
      } },

    { key: 'restwand', label: 'Muffenwand (Parameter, nicht gemessen)',
      soll: P.restwand, ist: () => P.restwand },
  ];

  if (cfg.threadKind === 'R') {
    /* Außengewinde: Strahl von außen auf eine Kuppe. Der Nennmaßort
       liegt am Gewindeanfang; die Kuppe i verjüngt sich um
       2·i·pitch/32 (Kegel 1:16 auf den Durchmesser). */
    const xTh0 = P.xBodyHexEnd + 0.8;
    const kuppe = (i) => xTh0 + i * P.threadPitch;
    const sollKuppe = (i) => r2(P.threadOD - 2 * (i * P.threadPitch) / 32);
    /* Der Grund trägt keinen Scheitelausgleich — sein Fillet schiebt
       ihn um threadRootRise nach außen (params.js, Fall 23). */
    const sollGrund = (i) => r2(P.threadOD - 2 * (i * P.threadPitch) / 32
      - 2 * P.threadH + P.threadRootRise);
    const iA = 1;
    const iB = Math.max(2, P.turns - 1);

    messungen.push(
      { key: 'gewinde', label: 'Gewinde-Außendurchmesser (1. Kuppe)', soll: sollKuppe(iA),
        ist: () => {
          const h = strahl('body', V3(kuppe(iA), 0, P.threadOD), V3(0, 0, -1));
          return h ? r2(2 * h.z) : NaN;
        } },
      /* GEGENPROBE 1 — der Gewindegrund zwischen zwei Kuppen MUSS eine
         Gewindetiefe darunter liegen. Gleicher Wert wie die Kuppe
         hieße: das Gewinde ist ein glatter Kegel. */
      { key: 'gewindegrund', label: 'Gewinde-Kerndurchmesser',
        soll: sollGrund(iA + 0.5),
        ist: () => {
          const h = strahl('body', V3(kuppe(iA + 0.5), 0, P.threadOD), V3(0, 0, -1));
          return h ? r2(2 * h.z) : NaN;
        } },
      /* GEGENPROBE 2 — dieselbe Messung an der letzten Kuppe MUSS
         einen kleineren Wert liefern. Gleicher Wert hieße: der Kegel
         1:16 fehlt und das Gewinde ist zylindrisch. */
      { key: 'kegel', label: 'Verjüngung über ' + (iB - iA) + ' Gänge',
        soll: r2(2 * ((iB - iA) * P.threadPitch) / 32),
        ist: () => {
          const hA = strahl('body', V3(kuppe(iA), 0, P.threadOD), V3(0, 0, -1));
          const hB = strahl('body', V3(kuppe(iB), 0, P.threadOD), V3(0, 0, -1));
          return hA && hB ? r2(2 * (hA.z - hB.z)) : NaN;
        } },
    );
  } else {
    /* Innengewinde: Strahl von der ACHSE nach außen. Er trifft die
       Bohrungswand — und genau die ist hier gesucht (Fall 16 nutzt
       denselben Effekt umgekehrt als Fehlerquelle).

       Der engste Punkt der Bohrung ist die Kuppe des Innengewindes und
       liegt auf dem Kerndurchmesser threadOD − 2h. Diese Messung ist
       der Abtastnachweis, den threadProfile bisher nie bekommen hat
       (Fall 20) — sie hat den Versatz um eine volle Gewindetiefe
       gefunden. */
    const xTh0 = P.xEnd - 1.2 - P.turns * P.threadPitch;
    const kuppe = (i) => xTh0 + i * P.threadPitch;
    const iA = 1;

    messungen.push(
      { key: 'kern', label: 'Innengewinde-Kerndurchmesser', soll: P.threadCore,
        ist: () => {
          const h = strahl('body', V3(kuppe(iA), 0, 0), V3(0, 0, 1));
          return h ? r2(2 * h.z) : NaN;
        } },
      /* GEGENPROBE — zwischen zwei Kuppen liegt der Gewindegrund auf
         dem NENNMASS Rp, abzüglich des Fillet-Rückzugs nach innen. Der
         Strahl MUSS dort weiter fliegen. Gleicher Wert hieße: die
         Bohrung ist glatt. */
      { key: 'nenn', label: 'Innengewinde-Nenndurchmesser (Grund)',
        soll: r2(P.threadOD - P.threadRootRise),
        ist: () => {
          const h = strahl('body', V3(kuppe(iA + 0.5), 0, 0), V3(0, 0, 1));
          return h ? r2(2 * h.z) : NaN;
        } },
    );
  }

  A.measures = messungen;
  A.setExplode(0);
  A.setSection(false, clipPlane);
  A.P = P;
  return A;
}


/* == metal-union-male-thread-brass/data.js ============================= */
/* K-Aqua Metallverschraubung Messing CW617N (Außengewinde) — Artikeltabelle.

   WERKSTOFFVARIANTE. Maßtabelle und Baugruppe sind mit
   metal-union-male-thread identisch — Zeile für Zeile geprüft:
   L, l, l1, SW, SW1 und R stimmen in allen sechs Größen überein.
   Verschieden sind nur die Codereihe (AQ537xx statt AQ547xx) und der
   Werkstoff: gelbes Messing CW617N statt vernickelt.

   Beleg quellen/w5-foto-male-brass.png gegen quellen/w5-foto-male.png:
   dieselbe Gestalt, einmal goldgelb, einmal silbrig.

   PHASE 1, verifiziert am 23.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-metal-union-with-pp-r-nut-in-yellow-brass-cw617n-male-thread-….png
   (quellen/w5-metal-union-male-brass.png, Tabellenausschnitte
   quellen/w5-tabelle-maleb-a.png und -b.png).

   Spaltenköpfe wie abgebildet:
     Code · d · R · DN · G · L · l · l1 · SW · SW1 · Pack.
   6 Größen, d20 bis d63. Nach der letzten Zeile folgt der ORDER-Knopf —
   die Tabelle ist vollständig gelesen (Fall 2).

   MASSSCHLÜSSEL:
     d    Rohr-Außendurchmesser = Muffenbohrung der PP-R-Seite
     R    kegeliges Außengewinde der Metallseite, in Zoll (ISO 7-1)
     DN   Nennweite des Gewindeanschlusses, informativ
     G    Gewinde der Überwurfmutter, in Zoll
     L    Gesamtlänge
     l    Länge des PP-R-Teils bis zur Dichtfläche
     l1   Länge des Gewindekörpers ab der Dichtfläche
     SW   Schlüsselweite der Überwurfmutter
     SW1  Schlüsselweite des Gewindekörpers

   Die Zuordnung von SW und SW1 steht nicht im Text, sondern in der
   MASSZEICHNUNG unter dem Produktfoto (quellen/w5-zeichnung-male.png):
   sie führt SW an den linken Sechskant (Mutter) und SW1 an den rechten
   (Körper). Die Zeichnung ist schematisch, nicht maßstäblich — sie
   ordnet Spalten Kanten zu, sie liefert keine Proportionen.

   ── VIER GEGENPROBEN ──

   1 · l ist mit der Innengewindevariante Zeile für Zeile IDENTISCH:
       19 · 22 · 23 · 26 · 29 · 32. Die PP-R-Seite ist dieselbe; der
       ganze Längenunterschied der beiden Produkte sitzt in l1.

         L  − L_IG   13 · 14 · 17 · 18 · 18 · 22
         l1 − l1_IG  13 · 13 · 15 · 18 · 18 · 22

       Bis auf zwei Zeilen deckungsgleich. Zwei unabhängig gelesene
       Tabellen bestätigen sich damit gegenseitig.

   2 · SW und SW1 sind mit der Innengewindevariante identisch:
       38/26 · 48/32 · 54/37 · 73/47 · 85/55 · 107/64. Beide Produkte
       tragen dieselbe Mutter und denselben Körpersechskant.

   3 · l + l1 gegen L, über alle Zeilen und mit Vorzeichen (Fall 28):
         d20  19+29 = 48  L 51  → −3
         d25  22+31 = 53  L 57  → −4
         d32  23+38 = 61  L 65  → −4
         d40  26+44 = 70  L 73  → −3
         d50  29+44 = 73  L 76  → −3
         d63  32+50 = 82  L 85  → −3
       Durchgehend negativ, 3 bis 4 mm. Es fehlt ein Stück, es
       überlappt nichts. Die Lücke ist die Flachdichtung zwischen
       PP-R-Bund und Metallkörper — 3 bis 4 mm ist genau die Dicke, die
       20-VISUELLE-REFERENZ §4.1 für Flachdichtungen nennt.

   4 · l minus Schweißtiefe DVS 2207-11 ist über alle Größen konstant:
         4,5 · 6,0 · 5,0 · 5,5 · 5,5 · 4,5 mm.
       Das ist der Hals mit dem Dichtbund — und eine unabhängige
       Bestätigung der Normreihe aus einer zweiten Tabelle.

   ── TIPPFEHLER IM KATALOG: G BEI d25 ──

   Die Seite druckt bei d25 G = 1 3/4". Gesetzt ist hier 1 1/4".

   Begründung: G 1 3/4" hat nach ISO 228-1 einen Außendurchmesser von
   53,74 mm. Die Schlüsselweite der Mutter beträgt bei d25 aber 48 mm —
   das Gewinde wäre größer als die Mutter, die es umschließt. Die
   Restwand wird −2,87 mm. Zusätzlich fiele die Spalte zwischen d25 und
   d32 (1,75 gegen 1,5), was bei einer Gewindereihe nicht vorkommt.

   Mit 1 1/4" ergibt sich eine Restwand von 3,05 mm — derselbe Wert wie
   bei d32 (3,10 mm) — und die Reihe steigt monoton.

   Dieselbe Zahl steht auf der Innengewindeseite als 1 1/4" und in
   products/union/data.js als 1 1/4". Beleg für alle vier Lesungen:
   quellen/w5-spalte-g-vier-seiten.png.

   params.js wirft, falls der Wert je zurückkommt.

   ── DIE SPALTE G WIRD NICHT MODELLIERT ──
   Werte 1 · 1 1/4 · 1 1/2 · 2 · 2 1/4 · 2 3/4 Zoll.

   G ist das Kupplungsgewinde zwischen Mutter und Körper. Es liegt
   vollständig im Inneren der Mutter, bildet keine Silhouette und ist
   auch im Halbschnitt von der Mutter verdeckt. products/union führt
   dieselbe Spalte ebenso mit, ohne sie zu modellieren.

   Die Normdurchmesser sind trotzdem in _union/params.js hinterlegt —
   sie tragen die Zusicherung, die den Tippfehler oben abfängt.

   ── ARTIKELNUMMERN ──
   Die Registry führt unter article_codes_md fünf Nummern der Reihe
   AQ71Rxx aus der Markdown-Datei. Der Screenshot zeigt sechs Nummern
   der Reihe AQ547xx. Maße und Artikelnummern kommen aus dem
   Screenshot (Regel 3) — die Markdown-Dateien sind als Maßquelle
   verboten und hier auch bei den Nummern nachweislich anders.

   ASSUMPTION Muffentiefe: Normreihe DVS 2207-11. Begründung wie bei
   Winkel und T-Stück (products/tee/data.js), zusätzlich gestützt durch
   Gegenprobe 4. */

export const DATA_STATUS = 'tabelle-verifiziert-zeichnung-gelesen';
export const SIZES_SOURCE_VERIFIED = 6;

export const ARTICLES = [
  { code: 'AQ53720', d: 20, R: '1/2', dn: 15, G: '1', L: 51, l: 19, l1: 29, SW: 38, SW1: 26, pack: 100 },
  /* G im Katalog als 1 3/4 gedruckt — Tippfehler, siehe Kopfkommentar. */
  { code: 'AQ53725', d: 25, R: '3/4', dn: 20, G: '1 1/4', L: 57, l: 22, l1: 31, SW: 48, SW1: 32, pack: 100 },
  { code: 'AQ53732', d: 32, R: '1', dn: 25, G: '1 1/2', L: 65, l: 23, l1: 38, SW: 54, SW1: 37, pack: 100 },
  { code: 'AQ53740', d: 40, R: '1 1/4', dn: 32, G: '2', L: 73, l: 26, l1: 44, SW: 73, SW1: 47, pack: 25 },
  { code: 'AQ53750', d: 50, R: '1 1/2', dn: 40, G: '2 1/4', L: 76, l: 29, l1: 44, SW: 85, SW1: 55, pack: 25 },
  { code: 'AQ53763', d: 63, R: '2', dn: 50, G: '2 3/4', L: 85, l: 32, l1: 50, SW: 107, SW1: 64, pack: 18 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  R: 'Außengewinde',
  dn: 'Nennweite',
  G: 'Muttergewinde (nicht modelliert)',
  L: 'Gesamtlänge',
  l: 'Länge PP-R-Teil',
  l1: 'Länge Gewindekörper',
  SW: 'Schlüsselweite Mutter',
  SW1: 'Schlüsselweite Körper',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == metal-union-male-thread-brass/params.js =========================== */
/* K-Aqua Metallverschraubung (Außengewinde, Messing) — Parametrik.

   Die Rechnung steht in ../_union/params.js: vier Produkte teilen die
   Baugruppe, und viermal dieselbe Rechnung driftet (Fall 32). Hier
   steht nur, was dieses Produkt daran festlegt. */


export const CONFIG = { threadKind: 'R' };

export function params(dNom) {
  return unionParams(article(dNom), CONFIG);
}


/* == metal-union-male-thread-brass/parts.js ============================ */
/* K-Aqua Metallverschraubung (Außengewinde, Messing) — Konturen.

   Alle vier Teile kommen aus ../_union/parts.js. Der Unterschied
   zwischen Innen- und Außengewindevariante ist ein einziger: buildBody
   setzt bei threadKind 'R' die kegelige Außengewindekontur nach ISO 7-1,
   bei 'Rp' die zylindrische Innengewindekontur nach ISO 228-1.

   Die Paarungsregel verlangt, beide zusammen zu prüfen (Fall 10) —
   deshalb liegt der Maßtest aller vier Varianten in einer Datei:
   pruefung/w5-masstest.html. */


/* == metal-union-male-thread-brass/index.js ============================ */
/* K-Aqua Metallverschraubung Messing CW617N (Außengewinde) —
   Produktpaket nach PRODUKT-VERTRAG.md.

   Vier Teile, drei Werkstoffe. Der Halbschnitt zeigt, wie die Mutter
   hinter dem PP-R-Dichtbund greift und wo die Flachdichtung sitzt;
   die Explosionsansicht nimmt die Mutter seitlich heraus, weil sie das
   einzige lösbare Teil der Baugruppe ist. */


const product = {
  id: 'transition-fittings/metal-union-male-thread-brass',
  module: 'kaqua-metal-union-male-thread-brass',
  titleDe: 'Metallverschraubung Messing CW617N (Außengewinde)',
  titleEn: 'Metal union with PP-R nut in yellow brass CW617N (Male thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing CW617N',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'R', 'L', 'SW'],
  dimensions: ['L', 'l', 'l1', 'SW'],
  ariaFields: ['d', 'R', 'L', 'SW', 'SW1'],

  variants: [],
  states: null,

  tile: 'Außengewindeverschraubung in gelbem Messing CW617N — ' +
        'gleiche Maße wie die vernickelte Variante, anderer Werkstoff.',

  build(size, variant, clipPlane) {
    return buildUnion({
      ...CONFIG,
      article,
      metal: 'brass',
      metalLabel: 'Messing CW617N',
      exportName: 'K-Aqua_Metallverschraubung_AG_Messing',
      seed: 179,
    }, size, variant, clipPlane);
  },
};

export { product as default };
