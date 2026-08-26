/* K-Aqua Rohrschaber — PROTOTYP.
   QUELLE: S. 114: Code AQ974 „Pipe scraper", Pack 1. Der Registry-Slug
   heißt historisch 'pipe-cutter-50-125-114' (aus dem Website-Scrape);
   das PRODUKT ist der Schaber — die Prosa wurde bereits am 24.08.
   berichtigt (Commit fa1d510d), hier folgt das Modell. Gestalt nach
   Katalogrender (flacher roter Schaber mit Stahlklinge). */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [ { key: 'schaber', code: 'AQ974', pack: 1 } ];
export const SIZES = ['schaber'];
export const DIMENSION_KEY = {};
export function article() { return ARTICLES[0]; }
