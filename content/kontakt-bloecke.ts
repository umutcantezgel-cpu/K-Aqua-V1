// content/kontakt-bloecke.ts - Slug-Typen und Konstanten des Kontakt-Layers.
// Die redaktionellen Inhalte liegen lokalisiert in messages/*.json unter
// "kontaktBlocks.<slug>.*" (de/en/ar); UI-Strings unter "kontaktForm.*".

export const KONTAKT_SLUGS = [
  "home", "unternehmen",
  "produkte_fittings", "produkte_rohre", "produkte_armaturen",
  "produkte_werkzeuge", "produkte_uebergaenge", "produkte_zubehoer",
  "katalog", "finder", "produkte",
  "academy", "referenzen", "support", "ausschreibungstexte", "service",
  "maerkte_trinkwasser", "maerkte_klima", "maerkte_industrie", "maerkte_schiffbau",
  "maerkte_landwirtschaft", "maerkte",
  "loesungen_hochhaus", "loesungen_krankenhaus", "loesungen_hotel", "loesungen",
  "co2_rechner", "trust_center", "projektanfrage", "kontakt", "news",
  "karriere", "partnerschaft", "impressum", "datenschutz", "fallback",
] as const;

export type KontaktSlug = (typeof KONTAKT_SLUGS)[number];

// Kanonische Interessen: `value` wird unverändert ans CRM übermittelt; das
// Anzeige-Label kommt aus kontaktForm.interests.<key>.
export const INTERESSEN = [
  { key: "rohrsysteme", value: "Rohrsysteme" },
  { key: "trinkwassernetze", value: "Trinkwassernetze" },
  { key: "bim", value: "BIM Daten" },
  { key: "ersatzteile", value: "Ersatzteile" },
  { key: "beratung", value: "Beratung" },
] as const;

export type InteresseValue = (typeof INTERESSEN)[number]["value"];

/**
 * Welches Interesse ein Kontaktblock vorauswählt.
 *
 * WARUM DAS HIER STEHT UND NICHT IN DEN SPRACHDATEIEN. Die Zuordnung lag bis
 * zum 30.08.2026 unter `kontaktBlocks.<slug>.interest` in messages/*.json.
 * Das war die falsche Stelle: Der Wert ist kein Anzeigetext, sondern die
 * Zeichenkette, die `KontaktForm` unverändert absendet und die in
 * `app/actions/lead.ts` im Betreff und im CRM-Feld landet. In einer
 * Sprachdatei sieht er aber wie Text aus — und wurde folgerichtig übersetzt:
 * in 49 der 65 Sprachen stand dort die Landessprache. Eine bulgarische
 * Anfrage erreichte den Vertrieb als „Neue Anfrage: Материал", eine arabische
 * als „أنظمة الأنابيب"; nach den fünf kanonischen Werten liess sich nicht mehr
 * filtern.
 *
 * Im Code kann das nicht mehr passieren: der Typ lässt nur die fünf Werte zu,
 * und es gibt nichts zu übersetzen. Die Sprachdateien behalten den Schlüssel
 * vorerst — er wird nur nicht mehr gelesen.
 */
export const KONTAKT_INTERESSE: Record<KontaktSlug, InteresseValue> = {
  home: "Rohrsysteme",
  unternehmen: "Beratung",
  produkte_fittings: "Ersatzteile",
  produkte_rohre: "Rohrsysteme",
  produkte_armaturen: "Ersatzteile",
  produkte_werkzeuge: "Beratung",
  produkte_uebergaenge: "Rohrsysteme",
  produkte_zubehoer: "Ersatzteile",
  katalog: "Beratung",
  finder: "Beratung",
  produkte: "Rohrsysteme",
  academy: "Beratung",
  referenzen: "BIM Daten",
  support: "Beratung",
  ausschreibungstexte: "BIM Daten",
  service: "Beratung",
  maerkte_trinkwasser: "Trinkwassernetze",
  maerkte_klima: "Rohrsysteme",
  maerkte_industrie: "Beratung",
  maerkte_schiffbau: "Beratung",
  maerkte_landwirtschaft: "Trinkwassernetze",
  maerkte: "Beratung",
  loesungen_hochhaus: "BIM Daten",
  loesungen_krankenhaus: "Trinkwassernetze",
  loesungen_hotel: "Beratung",
  loesungen: "Beratung",
  co2_rechner: "Beratung",
  trust_center: "BIM Daten",
  projektanfrage: "Rohrsysteme",
  kontakt: "Beratung",
  news: "Beratung",
  karriere: "Beratung",
  partnerschaft: "Beratung",
  impressum: "Beratung",
  datenschutz: "Beratung",
  fallback: "Beratung",
};

export const DIREKTWAHL_DISPLAY = "+49 (0)60 85 / 9868-410";
export const DIREKTWAHL_TEL = "+4960859868410";
