/* K-Aqua T-Stück 90° mit Innengewinde für Innenventil — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 108, obere
   Tabelle. Vier Größen.

   DAS IST KEIN ÜBERGANGSSTÜCK, SONDERN EIN VENTILKÖRPER. Der Katalog
   führt es unter „K-Aqua-Valves", nicht unter den Übergangsfittings, und
   zwei Spalten sagen warum:

     D1 = 45  in ALLEN vier Zeilen
     h  = 33  in ALLEN vier Zeilen

   Beide sind konstant, während d von 20 auf 32 und G von ¾" auf 1"
   wächst. Ein Abzweig, dessen Außendurchmesser und Höhe sich über die
   Baureihe nicht ändern, ist keine Muffe und kein Gewindeanschluss — er
   ist die Aufnahme für ein GENORMTES Ventiloberteil, das auf jede
   Nennweite passen muss.

   G STATT Rp. Die Spalte heißt G, nicht Rp. Beide bezeichnen
   zylindrische Rohrgewinde mit denselben Nennmaßen, aber Rp (ISO 7-1)
   dichtet IM Gewinde, G (ISO 228-1) nicht — es dichtet an einer
   Planfläche. Genau das braucht ein eingeschraubtes Ventiloberteil, das
   auf seiner Schulter abdichtet. Der Katalog benutzt den Unterschied
   also bewusst; das gewöhnliche T-Stück mit Innengewinde auf S. 99
   führt Rp.

   MASSSCHLÜSSEL (Maßskizze S. 108 oben):
     d   Nennmaß Durchgang
     G   Gewinde der Ventilaufnahme
     D   Außendurchmesser der Durchgangsmuffe
     L   Baulänge Durchgang, Stirnfläche zu Stirnfläche
     D1  Außendurchmesser des Ventildoms — konstant 45
     z   Einbaulänge Durchgang
     h   Achse Durchgang bis Stirnfläche des Doms — konstant 33

   OFFENER PUNKT — der Bezugspunkt von z.
   L − z beträgt 34 · 37 · 36 · 36, ist also nahezu, aber nicht ganz
   konstant. Wäre z die übliche Einbaulänge (L minus zweimal
   Muffentiefe), müsste die Differenz 29 · 32 · 36 · 36 lauten, also mit
   der Nennweite wachsen. Bei d20 und d25 weicht sie um 5 mm ab. Vier
   Zeilen reichen nicht, um den Bezugspunkt festzunageln. Für die
   Geometrie wird z nicht gebraucht — L, D, D1 und h bestimmen den Körper
   vollständig; z steht als Gegenprobe daneben (Fall 29). */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 4;

export const ARTICLES = [
  { code: 'AQ599A2034', d: 20, G: '3/4', D: 33, L: 80, D1: 45, z: 46, h: 33, kg: 0.11, pack: 100 },
  { code: 'AQ599A2534', d: 25, G: '3/4', D: 36, L: 80, D1: 45, z: 43, h: 33, kg: 0.12, pack: 80 },
  { code: 'AQ599A3234', d: 32, G: '3/4', D: 43, L: 75, D1: 45, z: 39, h: 33, kg: 0.14, pack: 80 },
  { code: 'AQ599A321',  d: 32, G: '1',   D: 44, L: 94, D1: 45, z: 58, h: 33, kg: 0.19, pack: 80 },
].map((a) => ({ ...a, key: a.d + 'x' + a.G.replace('/', '_') }));

/* Selbstprüfung der Transkription: D1 und h MÜSSEN konstant sein — das
   ist die Aussage, auf der die ganze Deutung ruht. */
ARTICLES.forEach((a) => {
  if (a.D1 !== 45 || a.h !== 33) {
    throw new Error('K-Aqua Innenventil-T ' + a.code +
      ': D1/h sind nicht 45/33 — die Deutung als genormte Ventilaufnahme fällt');
  }
});

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Durchgang',
  G: 'Gewinde der Ventilaufnahme',
  D: 'Außendurchmesser Durchgangsmuffe',
  L: 'Baulänge',
  D1: 'Außendurchmesser Ventildom',
  h: 'Achse bis Domstirnfläche',
  z: 'z (Bezugspunkt offen)',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}
