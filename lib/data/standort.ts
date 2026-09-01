/**
 * Stammdaten des Standorts — eine Quelle, ein Wert.
 *
 * Belegt aus `Marketing/Print/KA-Katalog_GB_06-2025_NEU.pdf`, Seite 3 und
 * Seite 121:
 *
 *   KWT GmbH · Auweg 3 · 35647 Waldsolms-Brandoberndorf · Germany
 *   Tel. +49 (0)60 85 / 9868-410 · Fax +49 (0)60 85 / 9868-420
 *   info@k-aqua.de · support@k-aqua.de · www.k-aqua.de
 *
 * Warum diese Datei nötig war: Im Code standen ZWEI verschiedene
 * Telefonnummern (+49 6085 9868-410 im Schema, im Footer und auf der
 * Kontaktseite, daneben +49 6085 9869-0 im Kartenbaustein), DREI Schreibweisen
 * des Orts und VIER verschiedene Koordinatenpaare für dasselbe Werk. Für
 * lokales Ranking ist genau das der schädlichste Einzelfehler: Google gleicht
 * Name, Adresse und Telefonnummer über alle Fundstellen ab, und
 * Widersprüche kosten Vertrauen in den Eintrag.
 */

export const STANDORT = {
  name: 'KWT GmbH',
  marke: 'K-Aqua',
  strasse: 'Auweg 3',
  plz: '35647',
  /** Mit Bindestrich — so schreibt es der Katalog. */
  ort: 'Waldsolms-Brandoberndorf',
  region: 'Hessen',
  land: 'DE',

  /** E.164 für `tel:`-Links und Schema.org. */
  telefon: '+4960859868410',
  /** Schreibweise für die Anzeige, wie im Katalog. */
  telefonAnzeige: '+49 (0)60 85 / 9868-410',
  fax: '+4960859868420',
  faxAnzeige: '+49 (0)60 85 / 9868-420',

  email: 'info@k-aqua.de',
  support: 'support@k-aqua.de',
  web: 'https://www.k-aqua.de',

  /**
   * Handelsregister.
   *
   * Hier stand `HRB 5421`, und das war falsch. Der Quellenvermerk oben nennt
   * den Herstellerkatalog — der enthält aber ueberhaupt keine Registernummer;
   * sein Text ist auslesbar („Auweg 3", „9868-410" stehen darin), „HRB" und
   * „Wetzlar" kommen nirgends vor. Die Zahl war also unbelegt.
   *
   * Richtig ist `HRB 6732`, mit drei uebereinstimmenden Belegen: dem Impressum
   * dieser Website (`messages/{de,en,ar}.json`, `legal.impressum`) und zwei
   * unabhaengigen Registerauskuenften, die zusaetzlich Anschrift und beide
   * Geschaeftsfuehrer bestaetigen.
   *
   * Das ist keine Formalie: § 35a GmbHG verlangt die Registernummer auf jedem
   * Geschaeftsbrief, und dazu zaehlt jede geschaeftliche E-Mail.
   */
  handelsregister: { gericht: 'Amtsgericht Wetzlar', nummer: 'HRB 6732' },

  /**
   * Werkskoordinaten. Vom Auftraggeber bestätigt: der Wert der bestehenden
   * Website ist richtig, nicht aus dem Marketing-Material abzuleiten.
   *
   * Übernommen aus dem `LocalBusiness`-Knoten in `lib/seo/schema.ts` — das
   * war die Fassung, die tatsächlich als strukturierte Daten veröffentlicht
   * wurde und die Suchmaschinen kennen. Die drei abweichenden Kopien im Code
   * (50.37/8.51 · 50.49/8.51 · 50.487/8.485) ziehen jetzt hierauf.
   */
  geo: { lat: 50.418, lon: 8.473 },
} as const;

/** Ein Zeilenumbruch-freundliches Adressarray für Karten und Impressum. */
export const STANDORT_ADRESSE = [
  STANDORT.name,
  STANDORT.strasse,
  `${STANDORT.plz} ${STANDORT.ort}`,
] as const;

/** Google-Maps-Link auf die geprüfte Anschrift statt auf rohe Koordinaten. */
export const STANDORT_KARTEN_URL =
  'https://maps.google.com/?q=' +
  encodeURIComponent(`${STANDORT.name}, ${STANDORT.strasse}, ${STANDORT.plz} ${STANDORT.ort}`);
