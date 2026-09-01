import { esc, escMehrzeilig } from '../html';
import { interneTexte, fuelle } from '../texte';
import { FARBE, ABSTAND, BREITE, SCHRIFT, ZEILE, FAMILIE } from './tokens';
import {
  abschnitt,
  auszeichnung,
  datentabelle,
  hinweiskasten,
  kopfbalkenText,
  trenner,
  type Datenzeile,
  type Satzkontext,
} from './bausteine';
import { baueDokument } from './rahmen';

/**
 * Die beiden internen Mails: Anfrage an den Vertrieb, Bewerbung an die
 * Personalabteilung.
 *
 * DIESE MAILS WERDEN TÄGLICH GELESEN. Damit gilt hier ein anderer Maßstab als
 * bei den Bestätigungen an Kunden und Bewerber: Sie müssen in zwei Sekunden
 * erfassbar sein, nicht schön. Konkret heißt das drei Dinge:
 *
 * 1. **Telefonnummer und E-Mail stehen ganz oben, groß und anklickbar.** Der
 *    Vertrieb ruft zurück — er liest nicht. Vorher standen sie mitten in einer
 *    Aufzählung zwischen „Interesse" und „Quellseite".
 * 2. **Die Nachricht des Kunden steht ungekürzt und abgesetzt.** Sie ist der
 *    einzige Teil, den wirklich jemand lesen muss.
 * 3. **Die Herkunft (Quellseite, Sprache, Zeit) steht klein am Fuß.** Sie ist
 *    nützlich, wenn man sie braucht, und Ballast, wenn nicht — vorher stand
 *    sie prominent im Hauptteil.
 *
 * Immer Deutsch: Empfänger sind Vertrieb und Personalabteilung in Waldsolms.
 */

/** Interne Mails sind immer deutsch und laufen von links nach rechts. */
const K: Satzkontext = { sprache: 'de', dir: 'ltr' };

export interface InterneAnfrage {
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

export interface InterneMail {
  readonly html: string;
  readonly text: string;
}

/**
 * Die Kontaktzeile ganz oben.
 *
 * Groß gesetzt und anklickbar — auf dem Telefon wählt ein Tipp die Nummer, am
 * Rechner öffnet er das Wählprogramm. Das ist der Grund, warum diese Mail
 * überhaupt gelesen wird.
 */
function kontaktkopf(anfrage: InterneAnfrage): string {
  const t = interneTexte();
  const sauber = anfrage.phone.replace(/[^0-9+]/g, '');
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="padding:0 0 ${ABSTAND.sm}px;">
      <p style="margin:0 0 2px;font-family:${FAMILIE};font-size:${SCHRIFT.klein}px;line-height:1.2;letter-spacing:0.1em;text-transform:uppercase;color:${FARBE.textZweit};">${esc(t.labelTelefon)}</p>
      <a href="tel:${esc(sauber)}" style="font-family:${FAMILIE};font-size:26px;line-height:1.2;font-weight:700;color:${FARBE.marke};text-decoration:none;">${esc(anfrage.phone)}</a>
    </td>
  </tr>
  <tr>
    <td style="padding:0;">
      <p style="margin:0 0 2px;font-family:${FAMILIE};font-size:${SCHRIFT.klein}px;line-height:1.2;letter-spacing:0.1em;text-transform:uppercase;color:${FARBE.textZweit};">${esc(t.labelEmail)}</p>
      <a href="mailto:${esc(anfrage.email)}" style="font-family:${FAMILIE};font-size:${SCHRIFT.lead}px;line-height:1.3;font-weight:600;color:${FARBE.marke};text-decoration:none;word-break:break-all;">${esc(anfrage.email)}</a>
    </td>
  </tr>
</table>`;
}

export function baueInterneAnfrage(
  anfrage: InterneAnfrage,
  auffaelligkeit: string | null
): InterneMail {
  const t = interneTexte();

  /* Wer und was — knapp, ohne die Kontaktdaten zu wiederholen. */
  const wer: Datenzeile[] = [{ label: t.labelAnliegen, wertHtml: esc(anfrage.interest || '—') }];
  if (anfrage.name) wer.push({ label: t.labelName, wertHtml: esc(anfrage.name) });
  if (anfrage.company) wer.push({ label: t.labelFirma, wertHtml: esc(anfrage.company) });

  const herkunft: Datenzeile[] = [
    { label: t.labelQuellseite, wertHtml: esc(anfrage.page), leicht: true },
    { label: t.labelSprache, wertHtml: esc(anfrage.sprache || '—'), leicht: true },
    { label: t.labelZeit, wertHtml: esc(anfrage.zeit), leicht: true },
  ];
  if (anfrage.pfad) {
    herkunft.push({ label: t.labelPfad, wertHtml: esc(anfrage.pfad), leicht: true });
  }

  const zeilen = [
    kopfbalkenText(K, t.anfrageTitel),

    // Auffaelligkeit zuerst, wenn es eine gibt — sonst uebersieht man sie.
    auffaelligkeit
      ? abschnitt(hinweiskasten(K, fuelle(t.warnhinweis, { grund: auffaelligkeit })), {
          oben: ABSTAND.lg,
        })
      : '',

    // DAS WICHTIGSTE ZUERST: Rufnummer und Adresse.
    abschnitt(kontaktkopf(anfrage), { oben: auffaelligkeit ? ABSTAND.md : ABSTAND.lg }),

    abschnitt(`${trenner(0)}<div style="height:${ABSTAND.md}px;font-size:0;line-height:0;">&nbsp;</div>${datentabelle(K, wer)}`, {
      oben: ABSTAND.md,
    }),

    // Die Nachricht — der einzige Teil, den wirklich jemand lesen muss.
    anfrage.message
      ? abschnitt(
          `${auszeichnung(K, t.labelNachricht)}
           <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
             <tr>
               <td width="3" style="width:3px;background-color:${FARBE.akzent};font-size:0;line-height:0;">&nbsp;</td>
               <td style="padding:0 0 0 ${ABSTAND.md}px;font-family:${FAMILIE};font-size:${SCHRIFT.text}px;line-height:${ZEILE.weit};color:${FARBE.text};">${escMehrzeilig(anfrage.message)}</td>
             </tr>
           </table>`,
          { oben: ABSTAND.lg }
        )
      : '',

    // Herkunft klein und ganz unten.
    abschnitt(
      `${trenner(0)}
       <div style="height:${ABSTAND.md}px;font-size:0;line-height:0;">&nbsp;</div>
       ${auszeichnung(K, t.herkunftTitel)}
       ${datentabelle(K, herkunft)}`,
      { oben: ABSTAND.lg, unten: ABSTAND.lg }
    ),
  ].join('');

  return {
    html: baueDokument({
      sprache: 'de',
      titel: t.anfrageTitel,
      // Die Vorschauzeile im Posteingang zeigt sofort, worum es geht und von wem.
      vorschau: `${anfrage.interest || 'Kontakt'} · ${anfrage.company || anfrage.name || anfrage.email} · ${anfrage.phone}`,
      zeilen,
    }),
    text: baueInternenText(anfrage, auffaelligkeit),
  };
}

function baueInternenText(anfrage: InterneAnfrage, auffaelligkeit: string | null): string {
  const t = interneTexte();
  const z: string[] = [];
  if (auffaelligkeit) z.push(`!! ${fuelle(t.warnhinweis, { grund: auffaelligkeit })}`, '');
  z.push(t.anfrageTitel.toUpperCase(), '');
  z.push(`${t.labelTelefon}: ${anfrage.phone}`);
  z.push(`${t.labelEmail}: ${anfrage.email}`);
  z.push('');
  z.push(`${t.labelAnliegen}: ${anfrage.interest || '—'}`);
  if (anfrage.name) z.push(`${t.labelName}: ${anfrage.name}`);
  if (anfrage.company) z.push(`${t.labelFirma}: ${anfrage.company}`);
  if (anfrage.message) z.push('', `${t.labelNachricht}:`, anfrage.message);
  z.push('', t.herkunftTitel.toUpperCase());
  z.push(`${t.labelQuellseite}: ${anfrage.page}`);
  z.push(`${t.labelSprache}: ${anfrage.sprache || '—'}`);
  z.push(`${t.labelZeit}: ${anfrage.zeit}`);
  if (anfrage.pfad) z.push(`${t.labelPfad}: ${anfrage.pfad}`);
  return z.join('\n');
}

/** Der Kopfbalken der internen Mails kommt ohne Logo aus — sie gehen ins Haus. */
export function interneVorschaubreite(): number {
  return BREITE.aussen;
}
