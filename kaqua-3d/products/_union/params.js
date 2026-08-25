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

import { D2R, fusionDepth, socketOD, socketODSizes, threadSpec } from '../../core/index.js';

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
