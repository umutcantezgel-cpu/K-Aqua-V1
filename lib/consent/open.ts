// Öffnet den Einwilligungsdialog von beliebiger Stelle aus.
//
// Der Widerruf muss so einfach erreichbar sein wie die Erteilung
// (Art. 7 Abs. 3 DSGVO). Deshalb ein Ereignis statt einer Prop-Kette: Footer,
// Datenschutzseite oder jedes Element mit data-consent-open können den Dialog
// aufrufen, ohne den Banner zu kennen.

export const CONSENT_OPEN_EVENT = 'kaqua:consent-open';

export function openConsentSettings() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
