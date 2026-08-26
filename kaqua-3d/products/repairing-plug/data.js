/* K-Aqua Reparaturstopfen — PROTOTYP.
   QUELLE: S. 116: Code AQ5937/AQ59311, d 7/11, Pack 1 — sonst nichts.
   Das Katalogbild (Kontaktbogen s116-04) zeigt einen LANGEN GRÜNEN
   KEGELSTAB — nicht den Pilz mit Innensechskant, den die Visuelle
   Referenz §4.1 beschrieb (dort berichtigt). Der Stab wird in die
   Leckbohrung geschweißt und abgeschnitten. Länge ASSUMPTION. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [
  { key: '7', code: 'AQ5937', d: 7, pack: 1 },
  { key: '11', code: 'AQ59311', d: 11, pack: 1 },
];
export const SIZES = ARTICLES.map((a) => a.key);
export const DIMENSION_KEY = { d: 'Stopfen-Ø' };
export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua Reparaturstopfen: unbekannte Größe ' + key);
  return a;
}
