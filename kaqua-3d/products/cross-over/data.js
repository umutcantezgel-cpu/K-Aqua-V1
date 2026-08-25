/* K-Aqua Überbogen — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 91, obere
   Tabelle „Cross over". Drei Größen.

   Ein Überbogen führt ein Rohr über ein kreuzendes hinweg. Seine beiden
   Enden liegen in einer Flucht und zeigen in dieselbe Richtung — anders
   als beim Winkel, wo die Bahn abgelenkt wird. Das erzwingt vier Bögen:
   hoch, wieder waagerecht, hinunter, wieder waagerecht.

   MASSSCHLÜSSEL (Maßskizze S. 91 oben):
     d   Nennmaß = Muffenbohrung
     L   Baulänge, Stirnfläche zu Stirnfläche
     H   BAUHÖHE, von der Unterkante der Muffe bis zur Oberkante des
         Scheitels — nicht die Achsanhebung
     t   gerade Strecke am Ende, vor dem ersten Bogen
     z   siehe OFFENER PUNKT

   H IST DIE BAUHÖHE. Die Skizze spannt H über das ganze Teil. Für die
   Bahn wird die ACHSANHEBUNG gebraucht; die Umrechnung steht in
   _crossover/params.js und ist gegen den Zweck des Bauteils geprüft:
   unter dem Scheitel muss ein Rohr gleicher Nennweite hindurchpassen.
   Läge H an der Achse, käme dort ein negativer Durchlass heraus.

   OFFENER PUNKT — die Spalte z ist nicht gedeutet.
   Geprüft und verworfen:
     z = L − 2t          ergäbe 62 · 72 · 80, tabelliert sind 63 · 80 · 98
     z = L − 2·Muffentiefe  ergäbe 61 · 72 · 90
   Die Differenz L − z beträgt 27 · 24 · 28 und wächst nicht mit der
   Nennweite — bei einer Einbaulänge müsste sie das. Eine Deutung, die
   über die Zeilen nicht trägt, ist keine (Fall 28). Für die Geometrie
   wird z nicht gebraucht: L, H und t bestimmen die Bahn vollständig.
   Der Wert steht hier, wird aber NICHT modelliert und NICHT gemessen
   (Fall 29). */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 3;

export const ARTICLES = [
  { code: 'AQ28720', d: 20, L: 90,  z: 63, H: 45, t: 14, kg: 0.04, pack: 140 },
  { code: 'AQ28725', d: 25, L: 104, z: 80, H: 55, t: 16, kg: 0.06, pack: 90 },
  { code: 'AQ28732', d: 32, L: 126, z: 98, H: 70, t: 23, kg: 0.13, pack: 65 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  L: 'Baulänge',
  H: 'Bauhöhe',
  t: 'gerade Endstrecke',
  z: 'z (Bedeutung offen)',
};

export function article(dNom) {
  const a = ARTICLES.find((x) => x.d === dNom);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + dNom);
  return a;
}
