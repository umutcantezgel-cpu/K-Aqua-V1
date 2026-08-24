/* K-Aqua Winkel Muffe/Spitzende — Parametrik.

   Zwei Produkte, ein Körper:
     fittings/elbow-45-female-male   AQ041, 45°
     fittings/elbow-90-female-male   AQ091, 90°

   Ein Winkel, dessen einer Schenkel eine SCHWEISSMUFFE ist und dessen
   anderer ein ROHRENDE (Spitzende) — es steckt in die Muffe des nächsten
   Teils. Damit kommt der Körper aus ../_bendthread/parts.js unverändert
   zurecht: dort ist Schenkel A ohnehin eine Muffe, und Schenkel B braucht
   nur einen Sitz von der Tiefe null, dann bleibt er durchgehend Rohr.

   ── MASSSCHLÜSSEL ──
     d    Rohr-Außendurchmesser. Gilt für BEIDE Enden: die Muffe nimmt
          ihn auf, das Spitzende hat ihn.
     D    Außendurchmesser des Fittings am Muffenschenkel
     l    Achse bis Stirnfläche der Muffe
     z    Einbaulänge der Muffe
     z₁   Achse bis Spitze des Rohrendes

   ── l − z TRIFFT DIE NORMREIHE, UND ZWAR BESSER ALS ANDERSWO ──

     45°  d20  20 − 5  = 15      Normreihe DVS 2207-11: 14,5
          d25  22 − 6  = 16                              16,0
     90°  d20  27 − 12 = 15                              14,5
          d25  30 − 14 = 16                              16,0

   Vier von vier Zeilen auf 0…0,5 mm. Die Muffentiefe kommt trotzdem aus
   fusionDepth(d); der Tabellenwert wandert als socketFromTable in den
   Prüfbericht (Fall 4).

   ── D DECKT SICH MIT DER MUFFENTABELLE ──
   29 bei d20, 34 bei d25 — dieselben Werte wie products/socket. Der
   Muffenschenkel ist derselbe Körper wie beim einfachen Winkel.

   ── ASSUMPTION Einstecktiefe des Spitzendes ──
   Die Tabelle bemaßt sie nicht. Das Rohrende soll in die Muffe des
   Gegenstücks passen, also ist seine nutzbare Länge die Muffentiefe.
   Angesetzt wird die volle freie Länge z₁ − (Bogenauslauf); geprüft wird
   nur, dass sie die Normtiefe TRÄGT — reicht sie nicht, wirft die
   Parametrik. */

import { D2R, fusionDepth } from '../../core/index.js';

export function femaleMaleParams(a, cfg) {
  const P = Object.assign({}, a);
  const d = a.d;

  P.angle = cfg.angle;
  P.l = a.l;                     // Schenkel A: Muffe
  P.L1 = a.z1;                   // Schenkel B: Rohrende
  P.rOut = a.D / 2;
  P.rLegB = d / 2;               // das Spitzende IST ein Rohr
  P.OD = a.D;

  P.socket = fusionDepth(d);
  if (!P.socket) throw new Error('K-Aqua Winkel M/S d' + d + ': keine Schweißtiefe in der Normreihe');
  P.socketFromTable = a.l - a.z;
  P.depthDeltaToNorm = Math.round((P.socketFromTable - P.socket) * 10) / 10;

  P.wallPipe = d / 6;            // SDR 6
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.wallFitting = (a.D - d) / 2;
  P.restwand = P.wallFitting;
  P.restwandB = P.wallPipe;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  P.rSockGround = d / 2 - P.sockTaper * (P.socket - 2);
  P.groundLen = 1.0;
  P.probeR = P.rSockGround - 0.15;

  /* Kein Messingsitz und kein Absatz: Schenkel B ist durchgehend Rohr.
     insertDepth = 0 schaltet die Sitzzone in boreAlong ab, rInsertOut
     auf die Rohrbohrung gesetzt macht auch die Übergangsrampe wirkungslos. */
  P.insertDepth = 0;
  P.rInsertOut = P.boreR;
  P.collarLen = 0;
  P.collarR = P.rLegB;

  const halb = Math.tan((P.angle * D2R) / 2);
  const maxRA = (a.l - P.socket - 1.5) / halb;
  const maxRB = (a.z1 - 1.5) / halb;
  P.bendR = Math.max(d * 0.22, Math.min(d * 0.5, maxRA, maxRB));

  P.emR = Math.min(2.0, 0.05 * d);

  /* Das freie Rohrende ab dem Bogenauslauf. Es muss die Normtiefe
     tragen, sonst passt das Teil in kein Gegenstück. */
  P.spigotFree = Math.round((a.z1 - P.bendR) * 10) / 10;
  if (P.spigotFree < P.socket) {
    throw new Error('K-Aqua ' + a.key + ': freies Rohrende ' + P.spigotFree +
      ' mm trägt die Muffentiefe ' + P.socket + ' mm nicht');
  }

  /* Messstation für die Rohrbohrung am Muffenschenkel: hinter der Muffe,
     vor dem Bogen. */
  /* Der gerade Teil des Schenkels endet am SETBACK, nicht bei bendR:
     der Bogen frisst R·tan(α/2). Bei 90° sind beide gleich, bei 45° ist
     der Setback nur 41 % von R — mit bendR gerechnet lag die Grenze
     6 mm zu weit außen und der Wächter schlug an. */
  const setback = P.bendR * halb;
  const lo = -a.l + P.socket + P.groundLen;
  const hi = -setback;
  if (!(hi > lo)) {
    throw new Error('K-Aqua ' + a.key + ': kein freier Rohrabschnitt zwischen ' +
      'Muffe und Bogen (' + lo.toFixed(1) + ' … ' + hi.toFixed(1) + ')');
  }
  P.xBore = Math.round(((lo + hi) / 2) * 100) / 100;
  return P;
}
