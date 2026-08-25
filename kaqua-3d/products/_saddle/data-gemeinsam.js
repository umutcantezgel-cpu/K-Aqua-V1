/* K-Aqua Anbohrsättel — was die drei Tabellen gemeinsam haben.

   Der Katalog führt drei Sättel auf den Seiten 102 und 103:

     AQ130S   Anbohrsattel mit Schweißmuffe        11 Größen   S. 102
     AQ270S   Anbohrsattel mit Innengewinde         4 Größen   S. 102
     AQ243S   Anbohrsattel mit Außengewinde         4 Größen   S. 103

   DIE PRÄFIXE BESTÄTIGEN SICH GEGENSEITIG. 130 ist im ganzen Katalog
   das T-Stück, 270 das Innengewinde-Übergangsstück, 243 das
   Außengewinde-Übergangsstück (AQ130xx · AQ270G · AQ243G). Bei den
   Sätteln steht genau dasselbe Muster mit angehängtem S. Das ist eine
   von den Zahlenspalten unabhängige Bestätigung, welche Tabelle welches
   Gewinde führt.

   SPALTE d IST EIN BEREICH, kein Einzelmaß: „40 - 63", „75 - 125",
   „160 - 250". Gemeint ist das Hauptrohr, auf das der Sattel gesetzt
   wird. Ein Sattel hat eine gekrümmte Unterseite; welche Krümmung bei
   einem Bereich gilt, sagt der Katalog nicht. Siehe ANNAHME in
   params.js.

   SPALTE h IST EINE REINE FUNKTION VON d2, über alle elf Zeilen der
   AQ130S-Tabelle:

       d2    25    32    40    50    63
       h     29    35    38    39    45

   Das gilt auch dort, wo d1 und d2 auseinanderfallen. AQ130S406332
   führt d1 = 32, aber d2 = 25 und h = 29 — wie die Zeilen mit d1 = 20
   und d1 = 25 derselben Rohrgruppe. Wäre h vom Abzweig bestimmt, müsste
   es dort 35 lauten. Es tut es nicht.

   GEGENPROBE ÜBER DIE TABELLEN HINWEG: die Gewindesättel führen bei
   denselben d2 durchweg höhere h.

       d2    AQ130S (Muffe)   AQ270S/AQ243S (Gewinde)   Differenz
       25          29                    43                 14
       32          35                    50                 15

   Eine nahezu konstante Differenz — der eingebettete Messingteil baut
   auf, unabhängig von der Fußgröße. Das stützt beide Deutungen: h ist
   die Gesamthöhe, und d2 bestimmt den Unterbau.

   ZWEI AUFFÄLLIGKEITEN, dokumentiert statt aufgelöst:

   1. DIE SPALTE DES AUSSENGEWINDE-SATTELS HEISST „Rp". Seite 103 trägt
      die Überschrift „Weld-in saddle (Male thread)", die Spalte aber
      Rp — die Bezeichnung für ein zylindrisches INNENgewinde
      (ISO 7-1). Ein Außengewinde hieße R. Das Produktfoto zeigt
      eindeutig einen Messing-Außengewindezapfen, und das Präfix AQ243
      steht im ganzen Katalog für Außengewinde. Der Spaltenkopf ist
      offenbar aus der Innengewinde-Tabelle übernommen. Das Modell baut
      ein AUSSENgewinde R; der Widerspruch steht hier.

   2. DIE SPALTE HEISST „-d2", MIT FÜHRENDEM STRICH, auf beiden
      Gewindeseiten. Bei der Muffentabelle heißt sie schlicht d2. Ein
      Bindestrich vor einem Spaltennamen hat keine erkennbare Bedeutung;
      möglicherweise ein Satzrest. Die Werte sind in allen drei Tabellen
      dieselbe Größenreihe (25 · 32 · 40 · 50 · 63), deshalb wird die
      Spalte einheitlich als d2 geführt. */

/* ── WAS DIE ZEICHNUNG NICHT HERGIBT ──────────────────────────────────

   DIE SATTELZEICHNUNG IST EINE MASSSTABSLOSE SCHABLONE und in allen
   drei Tabellen unverändert dieselbe. Auf Vektorebene nachgemessen:

       d2-Hilfslinien   S.102 oben  295,99 / 337,83   Spannweite 41,84 pt
                        S.102 unten 573,70 / 615,54   Spannweite 41,84 pt
                        S.103       241,80 / 283,64   Spannweite 41,84 pt
       d-Hilfslinien    jeweils exakt 26,51 pt

   Nur das rechte Maß wechselt (d1 40,10 · Rp 32,43 · Rp 35,36). Aus den
   Proportionen dieser Figur darf deshalb NICHTS abgeleitet werden, und
   eine der drei Zeichnungen kann die andere nicht bestätigen — sie ist
   dieselbe Datei.

   Dazu kommt: die Zeichnung trägt ein drittes Maß, schlicht „d", dessen
   Hilfslinie auf der Durchgangsbohrung liegt (Ø rund 26 pt). In der
   Tabelle ist d aber 40–63 bis 160–250, also der Rohrbereich — das
   größte Maß der Tabelle und überhaupt kein Merkmal des Fittings. In
   der Zeichnung ist d das kleinste der drei Durchmesser, in der Tabelle
   das größte. Die Pfeilansätze kodieren also nachweislich nicht, was
   das Symbol bezeichnet.

   d2 IST KEIN AUSSENMASS. Das entscheidet die Tabelle, nicht die
   Zeichnung: in NEUN der elf Zeilen ist d2 zahlengleich mit d1. Ein
   Außendurchmesser und die von ihm umschlossene Bohrung desselben Teils
   können über eine ganze Baureihe nicht gleich sein — dazwischen liegt
   immer eine Wand. Und AQ130S406332 führt d2 = 25 bei d1 = 32, also
   kleiner als die Bohrung, die es umschließen müsste.

   d2 trägt damit dieselbe Nennweiten-Semantik wie d1: beide kommen aus
   der PP-R-Reihe 20 · 25 · 32 · 40 · 50 · 63. d2 ist die Größe des
   Stutzens am HAUPTROHR, d1 die des Abzweigs.

   h ENDET AM KUNSTSTOFF, NICHT AM MESSING. Bei den Gewindesätteln führen
   AQ270S (Innengewinde) und AQ243S (Außengewinde) durchweg DIESELBEN h
   (43 bei d2 = 25, 50 bei d2 = 32), obwohl der Außengewindezapfen rund
   15 mm weiter aufbaut. In der Zeichnung S. 103 endet die h-Hilfslinie
   an der Schulter, an der das Messing beginnt, nicht an der Gewindespitze.
   h misst also die Höhe des KUNSTSTOFFKÖRPERS über der Rohraußenfläche.
   Beim Muffensattel fällt das mit der Gesamthöhe zusammen, beim
   AG-Sattel nicht.

   OFFENER PUNKT — EIN SCHWEISSWERKZEUG FEHLT. Seite 115 führt neun
   Schweißwerkzeuge für Anbohrsättel, und über die AQ130S-Tabelle allein
   passen sie lückenlos auf die neun (d, d2)-Paare. Nimmt man die
   Gewindesättel hinzu, entsteht ein zehntes Paar: AQ270S406334 und
   AQ243S406334 führen (40–63, d2 = 32). Für den Bereich 40–63 gibt es
   auf S. 115 aber nur AQ98504006325, also 40–63 × 25. Entweder ist die
   Werkzeugliste unvollständig, oder die Gewindesättel dieser Größe
   werden anders gefügt. NICHT aufgelöst.

   ── Höhe über der Rohroberfläche, je Fußgröße — aus der AQ130S-Tabelle
   abgelesen und über alle elf Zeilen bestätigt. Steht hier, weil alle
   drei Produkte dieselbe Reihe brauchen (Fall 19). */
export const H_JE_FUSS = { 25: 29, 32: 35, 40: 38, 50: 39, 63: 45 };

/* Die drei Rohrgruppen, als Zahlenpaar statt als Zeichenkette. */
export const ROHRGRUPPEN = {
  '40-63': { min: 40, max: 63 },
  '75-125': { min: 75, max: 125 },
  '160-250': { min: 160, max: 250 },
};

export function rohrgruppe(bereich) {
  const g = ROHRGRUPPEN[bereich];
  if (!g) throw new Error('K-Aqua Anbohrsattel: unbekannte Rohrgruppe ' + bereich);
  return g;
}
