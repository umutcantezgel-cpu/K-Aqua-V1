/**
 * Schalter für Inhalte, deren Veröffentlichung an einer Freigabe hängt.
 *
 * Bewusst Konstanten und keine Umgebungsvariablen: sie sind zur Bauzeit
 * auswertbar, stehen im Diff, sind im Review nachvollziehbar, und Next.js
 * entfernt die toten Zweige beim Bauen. Wer später ohne Deploy schalten will,
 * ersetzt den Wert durch `process.env.NEXT_PUBLIC_…` — dann aber mit Vorgabe
 * „aus".
 *
 * Warum zwei Schalter und nicht einer: Auf `/referenzen` stehen zwei sehr
 * verschiedene Dinge direkt untereinander. Die vier Projekte aus dem
 * Herstellerkatalog (Seite 7) sind belegt und tragen ihre Fundstelle sichtbar
 * mit sich. Die Städtekacheln und Kartenpunkte sind es nicht — für keine von
 * ihnen liegt im freigegebenen Material ein Beleg vor. Ein gemeinsamer
 * Schalter würde das Belegte mit dem Unbelegten wegwerfen.
 */

/**
 * Die vier im Herstellerkatalog KA-Katalog_GB_06-2025, S. 7 benannten
 * Projekte (Diyar Al Muharaq, Al Kout Mall, Jahra Hospital, Blue Lagoon
 * Resort) samt der dort eingebetteten Aufnahmen.
 *
 * Der Hersteller nennt sie selbst öffentlich, und die Fundstelle steht unter
 * dem Block. Sollte sich herausstellen, dass für die Bauherren zusätzlich eine
 * schriftliche Freigabe nötig ist, genügt hier `false`.
 */
export const ZEIGE_BELEGTE_REFERENZEN = true;

/**
 * Städtekacheln (`refs.projects`), die Referenzkarte und jede andere
 * namentliche Projektbehauptung ohne Beleg.
 *
 * Steht auf `false`, bis die Bestätigungen der Bauherren vorliegen. Solange
 * kann niemand versehentlich eine unbelegte Behauptung wieder einbauen — der
 * Weg zurück ist eine Ein-Zeilen-Änderung.
 */
export const ZEIGE_UNBELEGTE_REFERENZEN = false;
