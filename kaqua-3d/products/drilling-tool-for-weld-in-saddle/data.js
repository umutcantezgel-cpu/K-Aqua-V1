/* K-Aqua Anbohrwerkzeug für Sättel — PROTOTYP.
   QUELLE: S. 116: nur Code (AQ98625…63), Nennweite, Pack. Alle
   Formmaße ASSUMPTION; Anker ist die Nennweite (Fräser bohrt die
   Abzweigöffnung, Ø ≈ Abzweig-Bohrung). */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [25, 32, 40, 50, 63].map((d) => ({ key: String(d), code: 'AQ986' + d, d, pack: 1 }));
export const SIZES = ARTICLES.map((a) => a.key);
export const DIMENSION_KEY = { d: 'Nennweite' };
export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua Anbohrwerkzeug: unbekannte Größe ' + key);
  return a;
}
