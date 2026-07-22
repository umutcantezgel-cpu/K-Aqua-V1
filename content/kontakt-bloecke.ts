// content/kontakt-bloecke.ts — Slug-Typen und Konstanten des Kontakt-Layers.
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

// Kanonische Interessen: `value` wird unverändert ans CRM übermittelt und in
// kontaktBlocks.<slug>.interest referenziert; das Anzeige-Label kommt aus
// kontaktForm.interests.<key>.
export const INTERESSEN = [
  { key: "rohrsysteme", value: "Rohrsysteme" },
  { key: "trinkwassernetze", value: "Trinkwassernetze" },
  { key: "bim", value: "BIM Daten" },
  { key: "ersatzteile", value: "Ersatzteile" },
  { key: "beratung", value: "Beratung" },
] as const;

export const DIREKTWAHL_DISPLAY = "+49 (0)60 85 / 9868-410";
export const DIREKTWAHL_TEL = "+4960859868410";
