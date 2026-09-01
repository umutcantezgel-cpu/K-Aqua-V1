import type { LeadUrteil } from './spam';
import { baueInterneAnfrage, type InterneAnfrage } from './vorlage/intern';

/**
 * Betreff und Rumpf der internen Anfrage-Mail an den Vertrieb.
 *
 * Der Rumpf war bis hierher eine nackte Folge aus `<h2>` und `<p><strong>`
 * ohne `<html>`, ohne Rahmen und ohne Absenderkennung. Er liegt jetzt in
 * `vorlage/intern.ts` — dort steht auch, warum diese Mail anders aufgebaut ist
 * als die Bestätigungen an Kunden: Sie wird täglich gelesen und muss in zwei
 * Sekunden erfassbar sein, nicht hübsch.
 *
 * Diese Datei behält ihre beiden Exporte, damit `app/actions/lead.ts`
 * unverändert bleibt.
 */

export interface LeadDaten {
  readonly phone: string;
  readonly email: string;
  readonly interest: string;
  readonly page: string;
  readonly name?: string;
  readonly company?: string;
  readonly message?: string;
  readonly pfad: string;
  readonly sprache: string;
  readonly zeit: string;
}

export function leadBetreff(daten: LeadDaten, urteil: LeadUrteil): string {
  const kern = `Neue Anfrage: ${daten.interest || 'Kontakt'} (${daten.page})`;
  // Der Vertrieb soll die Auffaelligkeit schon in der Betreffzeile sehen, ohne
  // die Mail oeffnen zu muessen.
  return urteil.art === 'verdaechtig' ? `[PRUEFEN] ${kern}` : kern;
}

function alsAnfrage(daten: LeadDaten): InterneAnfrage {
  return daten;
}

export function leadRumpf(daten: LeadDaten, urteil: LeadUrteil): string {
  const hinweis = urteil.art === 'verdaechtig' ? urteil.hinweis : null;
  return baueInterneAnfrage(alsAnfrage(daten), hinweis).html;
}

/** Die Klartextfassung derselben Nachricht. */
export function leadKlartext(daten: LeadDaten, urteil: LeadUrteil): string {
  const hinweis = urteil.art === 'verdaechtig' ? urteil.hinweis : null;
  return baueInterneAnfrage(alsAnfrage(daten), hinweis).text;
}
