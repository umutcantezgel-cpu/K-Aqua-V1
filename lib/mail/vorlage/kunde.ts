import { esc } from '../html';
import { STANDORT } from '@/lib/data/standort';
import { texte, fuelle } from '../texte';
import type { Mailsprache } from '../sprache';
import { FARBE, ABSTAND, SCHRIFT, ZEILE, FAMILIE, FAMILIE_AR } from './tokens';
import {
  abschnitt,
  absatz,
  auszeichnung,
  datentabelle,
  fussbereich,
  knopf,
  kopfbalken,
  trenner,
  ueberschrift,
  verweisliste,
  vertrauenszeile,
  type Datenzeile,
} from './bausteine';
import { baueDokument, satzkontext } from './rahmen';

/**
 * Die Eingangsbestätigung an den Kunden.
 *
 * Diese Mail gab es bisher nicht — der Kunde bekam nach einer Anfrage gar
 * nichts, während intern eine nackte Aufzählung an den Vertrieb ging.
 */

export interface KundenLead {
  readonly phone: string;
  readonly email: string;
  readonly interest: string;
  readonly page: string;
  readonly name?: string;
  readonly company?: string;
  readonly message?: string;
}

export interface Kundenmail {
  readonly subject: string;
  readonly html: string;
  readonly text: string;
}

/**
 * Die Quellseiten, auf denen dem Besucher „unter 24 Stunden" zugesagt wurde.
 *
 * Die Website nennt zwei verschiedene Fristen: „innerhalb eines Arbeitstages"
 * an den meisten Stellen, „< 24 Stunden" auf `/projektanfrage`. Wer von dort
 * kommt, hat die strengere Zusage gelesen — dann muss die Bestätigung sie
 * auch nennen, nicht die bequemere.
 */
const STRENGERE_ZUSAGE = new Set(['projektanfrage']);

function telHref(): string {
  return `tel:${STANDORT.telefon}`;
}

export function baueKundenbestaetigung(
  lead: KundenLead,
  sprache: Mailsprache,
  siteUrl: string
): Kundenmail {
  const t = texte(sprache);
  const k = satzkontext(sprache);
  const basis = siteUrl.replace(/\/+$/, '');
  const familie = sprache === 'ar' ? FAMILIE_AR : FAMILIE;

  const anrede = lead.name
    ? fuelle(t.kunde.anredeMitName, { name: lead.name })
    : t.kunde.anredeOhneName;

  const zusage = STRENGERE_ZUSAGE.has(lead.page)
    ? t.kunde.zusage24h
    : t.kunde.zusageArbeitstag;

  /* Die Angaben des Kunden zum Nachlesen.
     Telefon und E-Mail werden anklickbar — nicht als Bequemlichkeit, sondern
     damit der Kunde auf einen Blick prueft, ob die Nummer stimmt, die er
     getippt hat. */
  const zeilen: Datenzeile[] = [
    { label: t.kunde.labelAnliegen, wertHtml: esc(lead.interest || '—') },
  ];
  if (lead.name) zeilen.push({ label: t.kunde.labelName, wertHtml: esc(lead.name) });
  if (lead.company) zeilen.push({ label: t.kunde.labelFirma, wertHtml: esc(lead.company) });
  zeilen.push({
    label: t.kunde.labelTelefon,
    wertHtml: `<a href="tel:${esc(lead.phone.replace(/[^0-9+]/g, ''))}" style="color:${FARBE.marke};text-decoration:none;">${esc(lead.phone)}</a>`,
  });
  zeilen.push({
    label: t.kunde.labelEmail,
    wertHtml: `<a href="mailto:${esc(lead.email)}" style="color:${FARBE.marke};text-decoration:none;">${esc(lead.email)}</a>`,
  });
  if (lead.message) {
    zeilen.push({
      label: t.kunde.labelNachricht,
      wertHtml: esc(lead.message).replace(/\n/g, '<br />'),
      /* Normalgewicht: Ein mehrzeiliger Freitext in Halbfett erschlaegt alles
         um sich herum — in der Vorschau stand die ganze Kundennachricht wie
         eine Ueberschrift da. Kurze Werte vertragen die Auszeichnung, ein
         Absatz nicht. */
      leicht: true,
    });
  }

  const verweise = [
    { ...t.kunde.verweisKatalog, href: `${basis}/pdf/k-aqua-product-range-en.pdf` },
    {
      ...t.kunde.verweisZertifikate,
      href: `${basis}/pdf/${sprache === 'de' ? 'kwt-iso-zertifikat-de' : 'kwt-iso-certificates-en'}.pdf`,
    },
    { ...t.kunde.verweisDownloads, href: `${basis}/${sprache}/ressourcen/downloads` },
  ];

  const zeilenHtml = [
    kopfbalken(k, {
      logoUrl: `${basis}/mail/logo-weiss.png`,
      unterzeile: t.gemeinsam.kopfEingang,
    }),

    // Anrede, Dank
    abschnitt(
      `${ueberschrift(k, anrede, 2)}${absatz(k, t.kunde.dank, { abstandUnten: 0 })}`
    ),

    // Was als Nächstes passiert — mit der Direktwahl als Knopf
    abschnitt(
      `${trenner(0)}
       <div style="height:${ABSTAND.lg}px;line-height:${ABSTAND.lg}px;font-size:0;">&nbsp;</div>
       ${auszeichnung(k, t.kunde.weiterTitel)}
       ${absatz(k, zusage, { abstandUnten: ABSTAND.md })}
       <p style="margin:0 0 ${ABSTAND.sm}px;font-family:${familie};font-size:${SCHRIFT.zweit}px;line-height:${ZEILE.normal};color:${FARBE.textZweit};">${esc(t.kunde.eilig)}</p>
       ${knopf(k, { text: STANDORT.telefonAnzeige, href: telHref() })}`,
      { oben: 0 }
    ),

    // Die eigenen Angaben
    abschnitt(
      `${trenner(0)}
       <div style="height:${ABSTAND.lg}px;line-height:${ABSTAND.lg}px;font-size:0;">&nbsp;</div>
       ${auszeichnung(k, t.kunde.angabenTitel)}
       ${absatz(k, t.kunde.angabenHinweis, { zweit: true, abstandUnten: ABSTAND.md })}
       ${datentabelle(k, zeilen)}`,
      { oben: ABSTAND.lg }
    ),

    // Orientierung — bewusst als Textliste, nicht als Produktkacheln
    abschnitt(
      `${trenner(0)}
       <div style="height:${ABSTAND.lg}px;line-height:${ABSTAND.lg}px;font-size:0;">&nbsp;</div>
       ${auszeichnung(k, t.kunde.verweiseTitel)}
       ${absatz(k, t.kunde.verweiseHinweis, { zweit: true, abstandUnten: ABSTAND.md })}
       ${verweisliste(k, verweise)}`,
      { oben: ABSTAND.lg }
    ),

    // Gruß und Signatur
    abschnitt(
      `${trenner(0)}
       <div style="height:${ABSTAND.lg}px;line-height:${ABSTAND.lg}px;font-size:0;">&nbsp;</div>
       ${absatz(k, t.kunde.gruss, { abstandUnten: 4 })}
       <p style="margin:0 0 ${ABSTAND.md}px;font-family:${familie};font-size:${SCHRIFT.text}px;line-height:${ZEILE.normal};font-weight:700;color:${FARBE.text};">${esc(t.kunde.signatur)}</p>
       ${vertrauenszeile(k, t.gemeinsam.vertrauen)}
       <p style="margin:${ABSTAND.md}px 0 0;font-family:${familie};font-size:${SCHRIFT.klein}px;line-height:${ZEILE.normal};color:${FARBE.textSchwach};">${esc(t.kunde.automatik)}</p>`,
      { oben: ABSTAND.lg, unten: ABSTAND.lg }
    ),

    fussbereich(k, {
      firma: `${STANDORT.name} · ${STANDORT.marke}`,
      anschrift: `${STANDORT.strasse} · ${STANDORT.plz} ${STANDORT.ort} · ${STANDORT.region}`,
      kontakt:
        `<a href="${telHref()}" style="color:#C9B8DE;text-decoration:none;">${esc(STANDORT.telefonAnzeige)}</a>` +
        ` &nbsp;·&nbsp; <a href="mailto:${STANDORT.email}" style="color:#C9B8DE;text-decoration:none;">${STANDORT.email}</a>` +
        ` &nbsp;·&nbsp; <a href="${STANDORT.web}" style="color:#C9B8DE;text-decoration:none;">www.k-aqua.de</a>`,
      /* § 35a GmbHG: Rechtsform und Sitz, Registergericht und -nummer sowie
         ALLE Geschaeftsfuehrer gehoeren auf jeden Geschaeftsbrief -- und dazu
         zaehlt jede geschaeftliche E-Mail. */
      register: `${STANDORT.handelsregister.gericht} ${STANDORT.handelsregister.nummer} · Geschäftsführung: Philipp Nickel, Marcello Gallio · USt-IdNr. DE 296238486`,
      datenschutzText: t.gemeinsam.datenschutzText,
      datenschutzLinkText: t.gemeinsam.datenschutzLink,
      datenschutzHref: `${basis}/${sprache}/datenschutz`,
      linkedInText: t.gemeinsam.linkedIn,
    }),
  ].join('');

  return {
    subject: t.kunde.betreff,
    html: baueDokument({
      sprache,
      titel: t.kunde.betreff,
      vorschau: t.kunde.vorschau,
      zeilen: zeilenHtml,
    }),
    text: baueKundentext(lead, sprache, basis, anrede, zusage),
  };
}

/**
 * Die Klartextfassung.
 *
 * Kein Beiwerk: Eine Mail ohne Textteil gilt Spamfiltern als Merkmal, manche
 * Firmenclients zeigen ausschliesslich ihn, und Vorlesegeraete kommen damit
 * besser zurecht als mit einem Tabellenlayout. Sie enthaelt dieselben
 * Angaben, nur ohne Gestaltung — nicht eine gekuerzte Fassung.
 */
function baueKundentext(
  lead: KundenLead,
  sprache: Mailsprache,
  basis: string,
  anrede: string,
  zusage: string
): string {
  const t = texte(sprache);
  const z: string[] = [];

  z.push(anrede, '', t.kunde.dank, '');
  z.push(t.kunde.weiterTitel.toUpperCase(), zusage, '');
  z.push(`${t.kunde.eilig} ${STANDORT.telefonAnzeige}`, '');
  z.push(t.kunde.angabenTitel.toUpperCase());
  z.push(`${t.kunde.labelAnliegen}: ${lead.interest || '—'}`);
  if (lead.name) z.push(`${t.kunde.labelName}: ${lead.name}`);
  if (lead.company) z.push(`${t.kunde.labelFirma}: ${lead.company}`);
  z.push(`${t.kunde.labelTelefon}: ${lead.phone}`);
  z.push(`${t.kunde.labelEmail}: ${lead.email}`);
  if (lead.message) z.push(`${t.kunde.labelNachricht}: ${lead.message}`);
  z.push('');
  z.push(t.kunde.verweiseTitel.toUpperCase());
  z.push(`${t.kunde.verweisKatalog.titel}: ${basis}/pdf/k-aqua-product-range-en.pdf`);
  z.push(
    `${t.kunde.verweisZertifikate.titel}: ${basis}/pdf/${sprache === 'de' ? 'kwt-iso-zertifikat-de' : 'kwt-iso-certificates-en'}.pdf`
  );
  z.push(`${t.kunde.verweisDownloads.titel}: ${basis}/${sprache}/ressourcen/downloads`);
  z.push('', t.kunde.gruss, t.kunde.signatur, '');
  z.push('—'.repeat(40));
  z.push(`${STANDORT.name} · ${STANDORT.marke}`);
  z.push(`${STANDORT.strasse} · ${STANDORT.plz} ${STANDORT.ort}`);
  z.push(`${STANDORT.telefonAnzeige} · ${STANDORT.email} · www.k-aqua.de`);
  z.push(
    `${STANDORT.handelsregister.gericht} ${STANDORT.handelsregister.nummer} · Geschäftsführung: Philipp Nickel, Marcello Gallio · USt-IdNr. DE 296238486`
  );
  z.push(`${t.gemeinsam.datenschutzText} ${basis}/${sprache}/datenschutz`);

  return z.join('\n');
}
