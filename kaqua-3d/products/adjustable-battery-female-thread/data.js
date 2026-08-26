/* K-Aqua Verstellbarer Batterieanschluss IG — Artikeltabelle.

   QUELLE: Druckkatalog S. 108, untere Tabelle „Adjustable battery
   (Female thread)". Zwei Größen. Spaltenköpfe:
     Code · d · Rp · L adjustable · L1 · kg · Pack.

   MASSSCHLÜSSEL:
     d             Nennmaß der Schweißmuffen
     Rp            Innengewinde der beiden Anschlussböcke
     L adjustable  Achsabstand der Anschlüsse, verstellbar —
                   „100-135-150": von 100 bis 150 mm, 135 als
                   Zwischenwert genannt
     L1            Gesamtlänge in der WEITESTEN Stellung (L = 150).
                   Beim Zusammenschieben ragt die durchlaufende Schiene
                   an der gegenüberliegenden Muffe VORBEI (die Schienen
                   liegen versetzt) — die Gesamtlänge schrumpft deshalb
                   nicht voll mit dem Verstellweg. Nur die
                   150er-Stellung hat einen Tabellenanker.

   Das Produktfoto AQ492G zeigt den Aufbau: ZWEI antiparallele
   Rohrschienen, auf jeder ein Anschlussbock mit SECHSKANT-Griffzone
   und Rp-Messingring; die Schienen enden außen in Schweißmuffen und
   tragen kleine Montagefüße mit Löchern. Die Verstellung ist das
   Verschieben der Schienen gegeneinander. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 2;

export const ARTICLES = [
  { code: 'AQ492G2012', d: 20, Rp: '1/2', Lmin: 100, Lmid: 135, Lmax: 150, L1: 230, kg: 0.21, pack: 1 },
  { code: 'AQ492G2512', d: 25, Rp: '1/2', Lmin: 100, Lmid: 135, Lmax: 150, L1: 230, kg: 0.23, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  Rp: 'Innengewinde',
  L: 'Achsabstand (verstellbar)',
  L1: 'Gesamtlänge',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
