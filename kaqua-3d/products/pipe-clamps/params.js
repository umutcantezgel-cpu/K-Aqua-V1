/* K-Aqua Rohrschelle — Parametrik.

   Die Quelle führt genau zwei Spalten, die etwas über die Gestalt sagen:
   die Nennweite d und das Gewicht kg. Jedes Geometriemaß hier ist damit
   ASSUMPTION aus dem Produktfoto — und die kg-Spalte ist die einzige
   Waage, die es dafür gibt. Sie läuft als Maß `masse` bei jedem Aufbau
   mit (index.js), über alle neun Größen.

   ── WARUM DIE WANDGESETZE NEU GEFITTET SIND (01.09.2026) ──
   Die erste Fassung rechnete `shellWall = 0,14·d` und `width = 0,68·d`.
   Beide wachsen linear mit d, die Masse also mit d³. Die Tabelle wächst
   aber nur um das Vierfache über das 5,5-fache des Durchmessers:

     d20 0,06 · d25 0,06 · d32 0,07 · d40 0,08 · d50 0,08
     d63 0,13 · d75 0,20 · d90 0,21 · d110 0,24 kg

   Gemessen an der alten Fassung: d20 −33 % · d32 −35 % · d63 +14 % ·
   d110 **+107 %** (0,497 kg gerechnet gegen 0,24 kg tabelliert). Eine
   Abweichung, die ihr Vorzeichen wechselt und mit der Größe davonläuft,
   ist kein Toleranzproblem, sondern ein falsches Gesetz.

   Der Grund steckt in der Bauart: der metallische Anteil (zwei Schrauben,
   vier Laschen, zwei Vierkantmuttern, ein Gewindestutzen) ist innerhalb
   einer Schraubenklasse nahezu konstant und trägt bei d20 den GRÖSSTEN
   Teil des Gewichts — 66 von 71 g. Der Kunststoffanteil darf deshalb nur
   flach wachsen. Beide Gesetze sind jetzt affin (fester Sockel + kleiner
   d-Anteil) und über alle neun Zeilen gefittet.

   Residuen nach dem Nachfit vom 02.09.2026 (der ballige Rücken und die
   zwei statt drei Nuten haben Volumen verschoben):

     d20 −1 % · d25 +4 % · d32 −2 % · d40 −6 % · d50 +6 %
     d63 +8 % · d75 −14 % · d90 −4 % · d110 +4 %

   Kein Vorzeichenlauf, größte Abweichung 14 % — dieselbe Güte wie bei den
   Ventilteilen (−17 · −10 · −6 · +20 %). Der Rest ist die Tabelle selbst:
   sie führt d20 und d25 mit demselben Gewicht und d40 und d50 ebenso, und
   zwischen d63 und d75 springt sie um 54 % bei nur 19 % Umfangszuwachs.
   Ein stetiges Gesetz kann diese drei Sprünge nicht treffen; d75 trägt
   deshalb dauerhaft den größten Rest.

   Folge: der ausgewiesene Außendurchmesser D ändert sich. Das ist
   zulässig — D steht in keiner Quelle, es ist ein abgeleiteter Wert. Die
   kg-Spalte dagegen ist Quelle. */

import { article } from './data.js';

/* Die gefitteten Gesetze. Sie stehen als benannte Konstanten, damit der
   Fit nachvollziehbar bleibt und nicht als Ziffern im Ausdruck versickert. */
const WAND_SOCKEL = 3.25;   // mm  Grundwandstärke
const WAND_STEIG  = 0.0535; // mm/mm  Zuwachs je mm Nennweite
const WAND_MIN    = 3.2;    // mm  spritzgusstechnische Untergrenze
const BAND_SOCKEL = 17.4;   // mm  Grundbandbreite
const BAND_STEIG  = 0.23;  // mm/mm
const BAND_MIN    = 16;     // mm

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  /* Keine Gummieinlage: das Produktfoto zeigt grüne PP-Innenflächen (M11).
     Die Schale fasst das Rohr direkt, mit 0,3 mm Einbauspiel. */
  P.rInner = d / 2;
  P.rShellIn = P.rInner + 0.3;

  P.shellWall = Math.max(WAND_MIN, Math.round((WAND_SOCKEL + WAND_STEIG * d) * 10) / 10);
  P.rOut = P.rShellIn + P.shellWall;
  P.D = Math.round(2 * P.rOut * 10) / 10;

  P.width = Math.max(BAND_MIN, Math.round(BAND_SOCKEL + BAND_STEIG * d));

  /* ASSUMPTION Schraubengröße: M8 bis d50, M10 darüber. Der Gewichts-
     sprung von 0,08 auf 0,13 kg zwischen d50 und d63 ist überproportional
     zum Umfangszuwachs und deutet genau dort auf den Wechsel. */
  P.boltM = d <= 50 ? 8 : 10;
  P.boltD = P.boltM;

  /* ── DIE VERBINDUNG NACH DEM FOTO (AQ500) ──
     Kein Sechskantkopf. Das Foto zeigt je Stoß: eine Linsenkopfschraube
     mit Kreuzschlitz, darunter eine U-Scheibe, zwei flache Stahllaschen
     über den Schalenenden und dazwischen eine schwarze Vierkantmutter in
     der Tasche. Alle Maße ASSUMPTION, aus den Bildproportionen. */
  P.headD  = Math.round(P.boltM * 1.95 * 10) / 10;  // Kopfdurchmesser
  P.headH  = Math.round(P.boltM * 0.62 * 10) / 10;  // Kopfhöhe
  P.headFlat = P.headD * 0.42;                       // ebene Kuppe oben
  P.slotW  = Math.max(0.9, P.boltM * 0.17);          // Kreuzschlitzbreite
  P.slotL  = P.headD * 0.66;                         // Kreuzschlitzlänge
  P.slotT  = Math.max(0.5, P.headH * 0.42);          // Schlitztiefe
  P.washD  = Math.round(P.boltM * 2.15 * 10) / 10;   // U-Scheibe außen
  P.washT  = Math.max(0.8, P.boltM * 0.19);

  /* Sechskantmutter, im Foto schwarz und deutlich breiter als hoch.

     BERICHTIGT 02.09.2026. Bis hierher stand hier eine VIERKANTmutter —
     eine Fehldeutung des niedrig aufgelösten Marketing-PNG, die auch in
     data.js und im Mängelregister (M11) steht. Der 9-fach-Ausschnitt von
     `public/images/produkte/pipe-clamps/studio.jpg` zeigt am Stoß drei
     Facetten mit klaren Kanten: ein Sechskant. */
  P.hexAF = Math.round(P.boltM * 1.6 * 10) / 10;
  P.hexH  = Math.round(P.boltM * 0.72 * 10) / 10;

  /* Der Gewindeüberstand unter der unteren Lasche — im Foto deutlich
     sichtbar. ASSUMPTION: knapp zwei Durchmesser. Steigung ISO metrisch
     Regelgewinde. */
  P.threadPitch = P.boltM === 8 ? 1.25 : 1.5;
  P.gewindeUeberstand = Math.round(P.boltM * 1.15 * 10) / 10;

  /* Stoßspalt: im Foto ein schmaler Schlitz, kein Scharnier. Die beiden
     Schalen sind gleichwertig; es gibt ZWEI Stöße, keinen Steg auf der
     Gegenseite. (Die frühere Fassung behauptete im Kommentar eine
     Scharnierseite und baute trotzdem vier Laschen.)

     gapDeg wird aus der Spaltweite am Außendurchmesser gerechnet, nicht
     umgekehrt — ein fester Winkel liefert bei d110 einen handbreiten
     Schlitz. */
  P.gapMM = Math.min(6, Math.max(2, Math.round(d * 0.075 * 10) / 10));
  P.gapDeg = Math.asin(Math.min(0.5, P.gapMM / 2 / P.rOut)) / (Math.PI / 180);
  /* Y-Lage der Schalenstirn an der Innenfläche — dort setzt der Steg an. */
  const yStoss = P.rShellIn * Math.tan(P.gapDeg * (Math.PI / 180));

  /* ── DER RÜCKEN (berichtigt 02.09.2026 nach studio.jpg) ──
     Kein zylindrischer Rücken mit drei Nuten, sondern eine BALLIGE
     Kontur mit ZWEI Nuten und drei Bändern: ein breites Mittelband,
     zwei schmalere Seitenbänder, die Kanten rollen ab. rOut ist der
     Scheitelradius in Bandmitte; D misst damit über den Scheitel.
     Alle vier Zahlen ASSUMPTION aus den Bildproportionen. */
  P.crownDrop = Math.max(0.4, Math.round(P.shellWall * 0.16 * 100) / 100);
  P.grooveOffset = Math.round(P.width * 0.255 * 10) / 10;
  P.grooveW = Math.max(1.0, Math.round(P.width * 0.075 * 10) / 10);
  P.grooveDepth = Math.max(0.35, Math.round(P.shellWall * 0.13 * 100) / 100);

  /* Fasen. Beide sind im Foto an den Stirnflächen deutlich zu sehen und
     standen bisher nur als Nebenprodukt der Profilkonstruktion da. */
  P.boreChamfer = Math.max(0.6, Math.round(P.shellWall * 0.22 * 10) / 10);
  P.stirnFase = Math.max(0.5, Math.round(P.shellWall * 0.18 * 10) / 10);

  /* Grüner Steg am Schalenende: die verdickte Stirn, auf der die Lasche
     aufliegt. Er beginnt an der SCHALENINNENFLÄCHE und läuft nach außen —
     nie nach innen, sonst steht er im Rohrkanal (Maß `freie-bohrung`). */
  P.stegT = Math.max(3, Math.round(P.shellWall * 0.95 * 10) / 10);
  P.stegB = Math.max(10, Math.round(P.width * 0.62));
  P.stegOut = P.rOut + Math.max(1.2, P.boltM * 0.22);

  /* Stahllasche: liegt auf dem Steg und reicht über die Schale hinaus bis
     zur Schraube. Ihre Dicke bestimmt zusammen mit dem Steg die Bauhöhe
     des Stoßes. */
  P.laschT = Math.max(1.4, Math.round(P.boltM * 0.26 * 10) / 10);
  P.laschB = Math.round(P.stegB * 0.92);

  /* Radien am Stoß, alle auf die Rohrachse bezogen.

     zScrew — die Schraubenachse liegt AUSSERHALB der Schale.

     BERICHTIGT 02.09.2026. Hier stand, das Verhältnis zScrew/rOut = 1,32
     treffe „bei d32 die Bildmessung". Das war gegen die falsche Größe
     gerechnet: der Sechskantstutzen misst im Foto 95 px gegen 574 px
     Ringbreite, sein Verhältnis AF/D trifft damit d75 bis d90 — nicht
     d32. Fall 35: ein Foto sagt nichts über Maße, solange die abgebildete
     Größe nicht bestimmt ist.

     Der Faktor bleibt, seine Begründung nicht: er stellt sicher, dass der
     Schraubenkopf die Schalenaußenfläche frei überragt. Weil die
     Schrauben absolute Maße tragen und die Schale nicht, wandert das
     Verhältnis über die Reihe — und das ist richtig so: eine M8-Schraube
     wird an einer d110-Schelle nicht größer.

     laschIn — die Innenkante der Lasche wird GERECHNET, nicht geschätzt.
     Die Lasche liegt auf der Stegoberseite bei y = yStoss + stegT. Weiter
     innen als dort, wo die Schalenaußenfläche diese Höhe erreicht, würde
     sie in die Schalenwand eintauchen — Stahl im Kunststoff. Der feste
     Bruchteil 0,74·rOut tat genau das: bei d32 lag die Innenkante 4,7 mm
     zu weit innen und die Lasche steckte in der Schale. Die 0,5 mm
     Zugabe sind gewollte Überdeckung, damit kein Spalt klafft. */
  P.zScrew = P.stegOut + P.boltD * 0.62;
  const yLasch = yStoss + P.stegT;
  P.laschIn = Math.sqrt(Math.max(1, P.rOut * P.rOut - yLasch * yLasch)) - 0.5;
  P.laschOut = P.zScrew + P.boltD * 0.9;

  /* ASSUMPTION Anschlussgewinde M8 bis d63, M10 darüber. Übliche
     Deckenbefestigung; der Sechskantstutzen sitzt auf dem geschlossenen
     Schalenrücken, nicht am Stoß. */
  P.threadM = d <= 63 ? 8 : 10;
  P.M = 'M' + P.threadM;
  P.nutAF = P.threadM === 8 ? 13 : 17;
  P.nutH = P.threadM === 8 ? 12 : 15;
  /* Der Stutzen taucht um dieses Maß in die Schale ein — er sitzt auf,
     er schwebt nicht. Wird als Maß `stutzen-sitzt` geprüft. */
  P.bossOverlap = 1.2;

  if (P.shellWall < 3) {
    throw new Error('K-Aqua Rohrschelle d' + d + ': Schalenwand ' +
      P.shellWall + ' mm zu dünn');
  }
  return P;
}
