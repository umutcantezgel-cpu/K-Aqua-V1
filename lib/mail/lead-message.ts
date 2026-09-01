import { esc, escMehrzeilig } from './html';
import type { LeadUrteil } from './spam';

/**
 * Betreff und Rumpf einer Anfrage-Mail.
 *
 * Wortgleich aus `app/actions/lead.ts` übernommen, damit sich am Aussehen im
 * Postfach nichts ändert — nur der Auffälligkeits-Hinweis kommt hinzu.
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

export function leadRumpf(daten: LeadDaten, urteil: LeadUrteil): string {
  const cleanPhone = daten.phone.replace(/[^0-9+]/g, '');
  const hinweis =
    urteil.art === 'verdaechtig'
      ? `<p style="background:#fff4e5;border-left:4px solid #d98324;padding:10px 14px;margin:0 0 16px">
           <strong>Automatische Auffaelligkeit:</strong> ${esc(urteil.hinweis)}
           Die Anfrage wurde trotzdem zugestellt — bitte kurz pruefen.
         </p>`
      : '';

  return `
    ${hinweis}
    <h2>Neue Anfrage über k-aqua.de</h2>
    <p><strong>Interesse:</strong> ${esc(daten.interest || 'Kontakt')}</p>
    ${daten.name ? `<p><strong>Name:</strong> ${esc(daten.name)}</p>` : ''}
    ${daten.company ? `<p><strong>Firma:</strong> ${esc(daten.company)}</p>` : ''}
    <p><strong>Telefon:</strong> <a href="tel:${esc(cleanPhone)}">${esc(daten.phone)}</a></p>
    <p><strong>E-Mail:</strong> <a href="mailto:${esc(daten.email)}">${esc(daten.email)}</a></p>
    ${daten.message ? `<hr /><p><strong>Nachricht:</strong></p><p>${escMehrzeilig(daten.message)}</p>` : ''}
    <hr />
    <p><strong>Quellseite:</strong> ${esc(daten.page)}</p>
    <p><strong>Pfad:</strong> ${esc(daten.pfad)}</p>
    <p><strong>Sprache:</strong> ${esc(daten.sprache)}</p>
    <p><strong>Zeit:</strong> ${esc(daten.zeit)}</p>
    <p>Ziel: Rückruf innerhalb von Minuten.</p>
  `;
}
