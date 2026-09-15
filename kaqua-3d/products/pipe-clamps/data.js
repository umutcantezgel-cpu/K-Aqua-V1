/* K-Aqua Rohrschelle — Artikeltabelle.

   PHASE 1, verifiziert am 19.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-pipe-clamps-….png
   (quellen/w2-pipe-clamp.png, 3004 × 9734 px).

   Spaltenköpfe wie abgebildet:  Code · d · kg · Pack.
   9 Größen, d20 bis d110.

   ── WAS DAS FOTO ZEIGT ──
   Gestaltquelle ist seit dem 02.09.2026 die hoch aufgelöste Aufnahme
   `public/images/produkte/pipe-clamps/studio.jpg` (900 × 900 px). Sie lag
   unbenutzt im Repository, während die Modellarbeit gegen die kleinere
   Kopie in `Marketing/Produktbilder/` lief — und sie widerlegt drei
   Angaben, die vorher hier standen (Gummieinlage, drei Rückenrillen,
   Vierkantmutter).

   Zu sehen sind:

     1. zwei GLEICHE grüne PP-Halbschalen — kein Scharnier, keine
        Fußplatte. Beide Stöße sind gleich ausgeführt.
     2. ein BALLIGER Rücken: Scheitel in Bandmitte, zu den Kanten
        abfallend, mit ZWEI Längsnuten und drei Bändern (ein breites
        Mittelband, zwei schmalere Seitenbänder)
     3. je Stoß zwei flache STAHLLASCHEN, die in einem runden Paddel um
        die Schraubenbohrung enden
     4. je Stoß eine LINSENKOPFSCHRAUBE mit KREUZSCHLITZ und U-Scheibe —
        kein Sechskantkopf; ihr GEWINDE tritt unter der unteren Lasche
        sichtbar heraus
     5. je Stoß eine schwarze SECHSKANTMUTTER im Stoßspalt. Die frühere
        Lesart „Vierkantmutter" stammt aus dem kleinen Bild; der
        9-fach-Ausschnitt zeigt drei Facetten mit klaren Kanten.
     6. auf dem geschlossenen Rücken ein SECHSKANTSTUTZEN mit
        Anschlussgewinde für die Gewindestange
     7. deutliche FASEN an Bohrungskante und Schalenstirn
     8. KEINE Gummieinlage — die Schaleninnenflächen sind grünes PP

   Damit ist die Schelle das komplexeste Zubehörteil des Katalogs: sieben
   Teile aus drei Werkstoffen.

   ── WELCHE GRÖSSE DAS FOTO ZEIGT ──
   Der Sechskantstutzen misst 95 px gegen 574 px Ringbreite. Sein
   Verhältnis Schlüsselweite zu Außendurchmesser trifft damit d75 bis d90,
   nicht die Standardgröße d32. Wer Proportionen aus diesem Bild ableitet,
   muss sie gegen diese Zeilen halten (Fall 35).

   ── KEINE GEOMETRIEMASSE IN DER QUELLE, ABER EINE WAAGE ──
   Die Tabelle führt Nennweite und Gewicht. Jedes Formmaß ist damit
   ASSUMPTION aus dem Foto — die kg-Spalte ist die einzige Gegenprobe,
   die es gibt, und sie läuft als Maß `masse` bei jedem Aufbau mit.

   Gewichtsverlauf: 0,06 · 0,06 · 0,07 · 0,08 · 0,08 · 0,13 · 0,20 ·
   0,21 · 0,24 kg. Über das 5,5-fache des Durchmessers wächst das
   Gewicht nur auf das Vierfache — deutlich flacher als jede Geometrie,
   die linear mit d skaliert. Die Wand- und Bandgesetze sind daran
   gefittet (Herleitung und Residuen in params.js).

   Der Sprung von d50 (0,08) auf d63 (0,13) ist mit +63 % Masse bei nur
   +26 % Umfang auffällig groß; dort wechselt offenbar die
   Schraubengröße von M8 auf M10. Als ASSUMPTION in params.js
   berücksichtigt. */

export const DATA_STATUS = 'verifiziert-ohne-masse';
export const SIZES_SOURCE_VERIFIED = 9;

export const ARTICLES = [
  { code: 'AQ50020', d: 20, kg: 0.06, pack: 100 },
  { code: 'AQ50025', d: 25, kg: 0.06, pack: 100 },
  { code: 'AQ50032', d: 32, kg: 0.07, pack: 75 },
  { code: 'AQ50040', d: 40, kg: 0.08, pack: 50 },
  { code: 'AQ50050', d: 50, kg: 0.08, pack: 50 },
  { code: 'AQ50063', d: 63, kg: 0.13, pack: 50 },
  { code: 'AQ50075', d: 75, kg: 0.2, pack: 25 },
  { code: 'AQ50090', d: 90, kg: 0.21, pack: 25 },
  { code: 'AQ500110', d: 110, kg: 0.24, pack: 25 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennweite',
  D: 'Außendurchmesser Schelle',
  B: 'Bandbreite',
  M: 'Anschlussgewinde',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
