/* K-Aqua Anschlussbogen und Wandscheibe 90° IG — Parametrik.

   Zwei Produkte, ein Körper:
     transition-fittings/elbow-bracket-90-female-thread        AQ090G
     transition-fittings/elbow-wall-bracket-90-female-thread   AQ472G

   Sie unterscheiden sich in genau einem Merkmal — die Wandscheibe trägt
   eine Lasche mit Schraubloch. Zweimal dieselbe Rechnung würde driften
   (Fall 32).

   ── MASSSCHLÜSSEL, beide Tabellen gleich ──
     d    Rohr-Außendurchmesser = Muffenbohrung
     Rp   zylindrisches Innengewinde, in Zoll (ISO 228-1)
     D    Außendurchmesser des GEWINDESCHENKELS (senkrecht, +Y)
     L    Achse bis Stirnfläche des Gewindeschenkels
     z    Achse bis Schulter, wo der Messingring beginnt
     h    Achse bis Unterkante des Teils
     D₁   Außendurchmesser des MUFFENSCHENKELS (waagrecht, −X)
     L₁   Achse bis Stirnfläche der Muffe
     z₁   Achse bis Muffengrund

   Die Zuordnung von D zum Gewindeschenkel und D₁ zur Muffe steht in der
   Maßzeichnung: D ist oben über dem senkrechten Schenkel angesetzt, D₁
   rechts am waagrechten. Gegenprobe über die Zahlen: D₁ hängt allein an
   d (20→29, 25→34, 32→43, in allen fünf Zeilen), D dagegen wächst mit
   dem Gewinde (25×½"→35 gegen 25×¾"→43). Ein vertauschtes Paar würde
   diese Abhängigkeit zerreißen (Fall 28).

   ── L − z IST DIE RINGHÖHE ──
   Dieselbe Rolle, die beim T-Stück mit Innengewinde h − z₁ spielt
   (products/tee-90-female-thread). Werte:

     AQ090G  14 · 14 · 11 · 15 · 17 mm
     AQ472G  14 · 14 · 15 · 15 · 15 mm

   Die 11 mm bei AQ090G2534 fallen aus der Reihe — ½" bekommt dort 14.
   Der Wert ist KEIN Lesefehler: Druckkatalog S. 95 und die
   Website-Aufnahme führen ihn beide, Zeile für Zeile identisch. Zwei
   unabhängige Rang-1-Quellen bestätigen sich, also folgt das Modell der
   Tabelle (Fall 31).

   ── MUFFENTIEFE AUS DER NORMREIHE, NICHT AUS L₁ − z₁ ──
   Wie überall im Katalog: fusionDepth(d). Der Tabellenwert L₁ − z₁
   wandert als socketFromTable in den Prüfbericht (Fall 4). Gegenprobe:

     d20  27 − 11 = 16      Normreihe DVS 2207-11: 14,5
     d25  30 − 14 = 16  ·  32 − 19 = 13                16,0
     d32  36,5 − 18 = 18,5  ·  39,5 − 17 = 22,5        18,0

   Die Streuung ist größer als beim Winkel (dort ±1,5 mm). Sie steht so
   im Prüfbericht; modelliert wird die Norm, weil das Schweißwerkzeug je
   Nennweite dasselbe ist.

   ── h IST NICHT GEDEUTET (Fall 29) ──
   Die naheliegende Deutung „Achse bis Unterkante" wurde am gebauten
   Modell GEPRÜFT und ist WIDERLEGT: die Unterkante liegt in jeder
   Größe bei genau D₁/2 — 14,5 · 17 · 17 · 21,5 · 21,5 — die Tabelle
   führt aber 13 · 15 · 20 · 18 · 20. Nur eine Zeile (d25×¾") liegt
   über D₁/2, vier darunter; unter den Radius des Muffenschenkels kann
   die Unterkante eines Winkels nicht rutschen.

   Was h bezeichnet, ist damit offen und wird NICHT angesetzt. Die
   Zeichnung ist schematisch und zeigt h zwar unterhalb der Mittellinie,
   liefert aber keine Proportionen (dasselbe Bild wie beim Winkel mit
   Außengewinde).

   EIN Teil von h ist trotzdem belegt, und zwar der, den die Wandscheibe
   braucht: h ist bei AQ472G in jeder vergleichbaren Zeile genau 2 mm
   größer als bei AQ090G (15/17/22/22 gegen 13/15/20/20). Der Körper ist
   derselbe, also sind diese 2 mm das, was die Lasche unter ihm
   hervorsteht. Eine DIFFERENZ ist auch dann verwertbar, wenn der
   Bezugspunkt unbekannt ist — sie hebt ihn heraus. */

import { D2R, fusionDepth, threadSpec } from '../../core/index.js';

export function bracketParams(a, cfg) {
  const P = Object.assign({}, a);
  const d = a.d;

  const th = threadSpec(a.Rp);
  if (!th) throw new Error('K-Aqua Anschlussbogen: kein Normmaß für Rp' + a.Rp);
  P.threadKind = 'Rp';
  P.threadLabel = a.Rp;
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.threadH = 0.640327 * th.pitch;
  P.threadCore = Math.round((th.od - 2 * P.threadH) * 1000) / 1000;

  /* Schenkel A = Muffe (−X), Schenkel B = Gewinde (+Y). Die Namen sind
     die von _bendthread/parts.js, damit derselbe Körper trägt. */
  P.l = a.L1;
  P.L1 = a.L;
  P.rOut = a.D1 / 2;
  P.rLegB = a.D / 2;
  P.OD = a.D1;

  P.socket = fusionDepth(d);
  if (!P.socket) throw new Error('K-Aqua Anschlussbogen d' + d + ': keine Schweißtiefe in der Normreihe');
  P.socketFromTable = a.L1 - a.z1;
  P.depthDeltaToNorm = Math.round((P.socketFromTable - P.socket) * 10) / 10;

  P.wallPipe = d / 6;                      // SDR 6
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.wallFitting = (a.D1 - d) / 2;
  P.restwand = P.wallFitting;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  P.rSockGround = d / 2 - P.sockTaper * (P.socket - 2);
  P.groundLen = 1.0;
  P.probeR = P.rSockGround - 0.15;

  /* Ring aus Messing. Höhe aus der Tabelle (L − z), Außendurchmesser
     wie beim Gewinde-T-Stück: Gewinde-Ø plus Wand, gedeckelt so, dass
     über dem Ring 1,1 mm PP bleiben. */
  P.ringHeight = Math.round((a.L - a.z) * 10) / 10;
  P.insertDepth = P.ringHeight;
  P.brassOD = Math.min(a.D - 2.2, P.threadOD + 2 * Math.max(2.2, 0.09 * P.threadOD));
  P.brassR = P.brassOD / 2;
  P.rInsertOut = P.brassR;
  P.brassBottom = a.z;
  P.brassTop = a.L;
  P.restwandB = Math.round((a.D - P.brassOD) / 2 * 100) / 100;

  /* Gänge über die tragende Gewindelänge, mindestens drei — wie im
     Gewinde-T-Stück. */
  P.threadLen = P.ringHeight - 2.0;
  P.turns = Math.max(3, Math.floor((P.threadLen - 0.6) / P.threadPitch));

  /* KEIN Absatz vor dem Messing. Foto AQ090GP und das Katalogfoto S. 95
     zeigen einen glatten Zylinder bis zur Stirnfläche. collarLen = 0
     schaltet die Absatzzone in skinAlong ab. */
  P.collarLen = 0;
  P.collarR = P.rLegB;

  /* Bogenradius: er muss in BEIDE Schenkel passen. Der Muffenschenkel
     gibt l − socket her, der Gewindeschenkel L1 − Ringhöhe. */
  const maxRA = a.L1 - P.socket - 1.5;
  const maxRB = a.L - P.ringHeight - 1.5;
  P.bendR = Math.max(d * 0.22, Math.min(d * 0.5, maxRA, maxRB));

  P.emR = Math.min(2.0, 0.05 * d);

  /* Messstation für die Rohrbohrung: auf dem geraden Muffenschenkel,
     hinter der Muffe und vor dem Bogen. Das Fenster ist eng — bei
     d25×½" 0,5 mm breit — deshalb genau die Mitte. */
  const boreLo = -a.L1 + P.socket + P.groundLen;
  const boreHi = -P.bendR;
  P.xBore = Math.round(((boreLo + boreHi) / 2) * 100) / 100;
  if (!(boreHi > boreLo)) {
    throw new Error('K-Aqua ' + a.key + ': kein freier Rohrabschnitt zwischen ' +
      'Muffe und Bogen (' + boreLo.toFixed(1) + ' … ' + boreHi.toFixed(1) + ')');
  }

  if (P.restwandB < 1.0) {
    throw new Error('K-Aqua ' + a.key + ': PP über dem Messingring ' +
      P.restwandB.toFixed(2) + ' mm — zu dünn');
  }
  if (P.restwand < 3) {
    throw new Error('K-Aqua ' + a.key + ': Restwand Muffenschenkel ' +
      P.restwand.toFixed(2) + ' mm < 3 mm');
  }

  P.hasLug = !!cfg.lug;
  if (P.hasLug) lugParams(P, a);
  return P;
}

/* ── ASSUMPTION Lasche ──
   KEINE Spalte bemaßt sie. Die einzige Quelle ist das Foto
   Marketing/Produktbilder/grün (RAL 6024)/AQ472G …png und das
   Katalogfoto S. 95 — beide Drei-Viertel-Ansichten mit Perspektive. Die
   abgebildete Größe ließ sich nach Fall 35 NICHT bestimmen.

   Ein Maß kommt trotzdem aus der Tabelle, und es ist das wichtigste:
   h ist bei AQ472G in jeder vergleichbaren Zeile genau 2 mm größer als
   bei AQ090G (15/17/22/22 gegen 13/15/20/20). Der Körper ist derselbe,
   also sind diese 2 mm das, was die Lasche unter ihm hervorsteht.

   Alles Übrige ist am Foto abgegriffen, in Anteilen des
   Gewindeschenkel-Durchmessers D, und trägt die Unsicherheit der
   Perspektive:

     Plattenmitte ab der Achse   0,30 · D
     Plattenradius               0,70 · D   reicht bis unter den Bogen
     Lochdurchmesser             0,20 · D   ein Loch, nahe dem freien Ende
     Lochmitte ab der Achse      0,72 · D

   Der Plattenradius ist so gewählt, dass die Platte den Körper in JEDER
   Größe erreicht und mit ihm verschmilzt. Die erste Fassung setzte sie
   weiter außen an — sie schwebte dann frei neben dem Winkel, und das
   sah man erst in der Sichtprobe, nicht im Maßtest (Fall 38).

   NICHT modelliert, weil aus einem einzigen Blickwinkel nicht
   auflösbar: die Einbuchtung an der Oberkante der Platte, die auf dem
   Foto wie eine zweite, offene Befestigung aussieht. Sie steht als
   offener Punkt in LOOP-STATUS.md. */
function lugParams(P, a) {
  P.lugProud = 2.0;                          // aus h(AQ472G) − h(AQ090G)
  P.lugThick = Math.max(3.0, 0.10 * a.D);
  P.lugCenterX = Math.round(0.30 * a.D * 10) / 10;
  P.lugPadR = Math.round(0.70 * a.D * 10) / 10;
  P.lugHoleD = Math.round(0.20 * a.D * 10) / 10;
  P.lugHoleX = Math.round(0.72 * a.D * 10) / 10;
  /* Die Platte muss den Körper erreichen, sonst schwebt sie. Der
     Körper reicht am Boden bis −rOut in −X; die Platte beginnt bei
     lugCenterX − lugPadR und muss darüber hinausgehen. */
  if (P.lugCenterX - P.lugPadR > -P.rOut * 0.5) {
    throw new Error('K-Aqua ' + a.key + ': Lasche beginnt bei x = ' +
      (P.lugCenterX - P.lugPadR).toFixed(1) + ' und erreicht den Körper nicht');
  }
}
