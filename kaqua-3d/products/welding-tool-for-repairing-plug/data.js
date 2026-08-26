/* K-Aqua Schweißwerkzeug für Reparaturstopfen — PROTOTYP.
   QUELLE: S. 116: Code AQ9837/AQ98311, d 7/11, Pack 1 — sonst nichts.
   Formmaße ASSUMPTION; Anker ist der Stopfendurchmesser d. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [
  { key: '7', code: 'AQ9837', d: 7, pack: 1 },
  { key: '11', code: 'AQ98311', d: 11, pack: 1 },
];
export const SIZES = ARTICLES.map((a) => a.key);
export const DIMENSION_KEY = { d: 'Stopfen-Ø' };
export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua Reparaturwerkzeug: unbekannte Größe ' + key);
  return a;
}
