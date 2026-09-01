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
  kopfbalken,
  trenner,
  ueberschrift,
  vertrauenszeile,
  type Datenzeile,
} from './bausteine';
import { baueDokument, satzkontext } from './rahmen';

/**
 * Die Eingangsbestätigung an den Bewerber.
 *
 * DUZT, im Unterschied zur Kundenmail. Das Bewerberportal duzt durchgängig
 * („Werde Teil unseres Teams", „Ziehe deinen Lebenslauf hierhin", „Vielen
 * Dank für deine Bewerbung"), und diese Mail ist dessen unmittelbare
 * Fortsetzung — sie kommt Sekunden nach dem Klick auf „Absenden". Ein Wechsel
 * ins Sie genau an dieser Stelle würde befremden.
 *
 * NENNT KEINE FRIST. Für Bewerbungen macht die Website nirgends eine Zusage
 * zur Antwortzeit — weder im Code noch in den Sprachdateien. Eine hier
 * erfundene Frist wäre nicht abgestimmt und würde beim ersten Überschreiten
 * Vertrauen kosten. Die Mail sagt stattdessen, was wirklich passiert.
 */

export interface BewerbungsDaten {
  readonly jobId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone?: string;
  readonly startDate?: string;
  /** Dateiname des hochgeladenen Lebenslaufs, falls einer kam. */
  readonly cvDateiname?: string;
  /** Größe in Byte, für die Anzeige. */
  readonly cvGroesse?: number;
}

export interface Bewerbermail {
  readonly subject: string;
  readonly html: string;
  readonly text: string;
}

function lesbareGroesse(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Beschreibt, was angekommen ist.
 *
 * Absichtlich konkret: Dateiname und Größe. Wer eine Bewerbung abschickt, hat
 * genau eine Sorge — ob die Datei wirklich angekommen ist. Ein „Unterlagen
 * erhalten" beantwortet das nicht, ein „Lebenslauf_Mueller.pdf, 340 kB"
 * schon.
 */
function unterlagenText(d: BewerbungsDaten, sprache: Mailsprache): string {
  const t = texte(sprache);
  if (d.cvDateiname) {
    const groesse = typeof d.cvGroesse === 'number' ? ` (${lesbareGroesse(d.cvGroesse)})` : '';
    return `${d.cvDateiname}${groesse}`;
  }
  return t.bewerber.unterlagenBaukasten;
}

export function baueBewerbungsbestaetigung(
  d: BewerbungsDaten,
  sprache: Mailsprache,
  siteUrl: string
): Bewerbermail {
  const t = texte(sprache);
  const k = satzkontext(sprache);
  const basis = siteUrl.replace(/\/+$/, '');
  const familie = sprache === 'ar' ? FAMILIE_AR : FAMILIE;

  const anrede = fuelle(t.bewerber.anredeMitName, { name: d.firstName });

  const zeilen: Datenzeile[] = [
    { label: t.bewerber.labelStelle, wertHtml: esc(d.jobId) },
    { label: t.bewerber.labelName, wertHtml: esc(`${d.firstName} ${d.lastName}`) },
    {
      label: t.bewerber.labelEmail,
      wertHtml: `<a href="mailto:${esc(d.email)}" style="color:${FARBE.marke};text-decoration:none;">${esc(d.email)}</a>`,
    },
  ];
  if (d.phone) zeilen.push({ label: t.bewerber.labelTelefon, wertHtml: esc(d.phone) });
  if (d.startDate) zeilen.push({ label: t.bewerber.labelEintritt, wertHtml: esc(d.startDate) });
  zeilen.push({
    label: t.bewerber.labelUnterlagen,
    wertHtml: esc(unterlagenText(d, sprache)),
  });

  const jobsAdresse = 'jobs@k-aqua.de';

  const zeilenHtml = [
    kopfbalken(k, {
      logoUrl: `${basis}/mail/logo-dunkel.png`,
      unterzeile: t.gemeinsam.kopfEingang,
    }),

    abschnitt(`${ueberschrift(k, anrede, 2)}${absatz(k, t.bewerber.dank, { abstandUnten: 0 })}`),

    abschnitt(
      `${trenner(0)}
       <div style="height:${ABSTAND.lg}px;line-height:${ABSTAND.lg}px;font-size:0;">&nbsp;</div>
       ${auszeichnung(k, t.bewerber.weiterTitel)}
       ${absatz(k, t.bewerber.weiterText, { abstandUnten: 0 })}`,
      { oben: 0 }
    ),

    abschnitt(
      `${trenner(0)}
       <div style="height:${ABSTAND.lg}px;line-height:${ABSTAND.lg}px;font-size:0;">&nbsp;</div>
       ${auszeichnung(k, t.bewerber.angabenTitel)}
       ${datentabelle(k, zeilen)}`,
      { oben: ABSTAND.lg }
    ),

    abschnitt(
      `${trenner(0)}
       <div style="height:${ABSTAND.lg}px;line-height:${ABSTAND.lg}px;font-size:0;">&nbsp;</div>
       ${auszeichnung(k, t.bewerber.fragenTitel)}
       <p style="margin:0;font-family:${familie};font-size:${SCHRIFT.text}px;line-height:${ZEILE.normal};color:${FARBE.text};">${esc(t.bewerber.fragenText)} <a href="mailto:${jobsAdresse}" style="color:${FARBE.marke};font-weight:700;">${jobsAdresse}</a></p>`,
      { oben: ABSTAND.lg }
    ),

    abschnitt(
      `${trenner(0)}
       <div style="height:${ABSTAND.lg}px;line-height:${ABSTAND.lg}px;font-size:0;">&nbsp;</div>
       ${absatz(k, t.bewerber.gruss, { abstandUnten: 4 })}
       <p style="margin:0 0 ${ABSTAND.md}px;font-family:${familie};font-size:${SCHRIFT.text}px;line-height:${ZEILE.normal};font-weight:700;color:${FARBE.text};">${esc(t.bewerber.signatur)}</p>
       ${vertrauenszeile(k, t.gemeinsam.vertrauen)}
       <p style="margin:${ABSTAND.md}px 0 0;font-family:${familie};font-size:${SCHRIFT.klein}px;line-height:${ZEILE.normal};color:${FARBE.textSchwach};">${esc(t.bewerber.automatik)}</p>`,
      { oben: ABSTAND.lg, unten: ABSTAND.lg }
    ),

    fussbereich(k, {
      firma: `${STANDORT.name} · ${STANDORT.marke}`,
      anschrift: `${STANDORT.strasse} · ${STANDORT.plz} ${STANDORT.ort} · ${STANDORT.region}`,
      kontakt:
        `<a href="tel:${STANDORT.telefon}" style="color:#C9B8DE;text-decoration:none;">${esc(STANDORT.telefonAnzeige)}</a>` +
        ` &nbsp;·&nbsp; <a href="mailto:${jobsAdresse}" style="color:#C9B8DE;text-decoration:none;">${jobsAdresse}</a>` +
        ` &nbsp;·&nbsp; <a href="${STANDORT.web}" style="color:#C9B8DE;text-decoration:none;">www.k-aqua.de</a>`,
      register: `${STANDORT.handelsregister.gericht} ${STANDORT.handelsregister.nummer} · Geschäftsführung: Philipp Nickel, Marcello Gallio · USt-IdNr. DE 296238486`,
      datenschutzText: t.gemeinsam.datenschutzText,
      datenschutzLinkText: t.gemeinsam.datenschutzLink,
      datenschutzHref: `${basis}/${sprache}/datenschutz`,
      linkedInText: t.gemeinsam.linkedIn,
    }),
  ].join('');

  return {
    subject: t.bewerber.betreff,
    html: baueDokument({
      sprache,
      titel: t.bewerber.betreff,
      vorschau: t.bewerber.vorschau,
      zeilen: zeilenHtml,
    }),
    text: baueBewerbertext(d, sprache, basis, anrede),
  };
}

function baueBewerbertext(
  d: BewerbungsDaten,
  sprache: Mailsprache,
  basis: string,
  anrede: string
): string {
  const t = texte(sprache);
  const z: string[] = [];

  z.push(anrede, '', t.bewerber.dank, '');
  z.push(t.bewerber.weiterTitel.toUpperCase(), t.bewerber.weiterText, '');
  z.push(t.bewerber.angabenTitel.toUpperCase());
  z.push(`${t.bewerber.labelStelle}: ${d.jobId}`);
  z.push(`${t.bewerber.labelName}: ${d.firstName} ${d.lastName}`);
  z.push(`${t.bewerber.labelEmail}: ${d.email}`);
  if (d.phone) z.push(`${t.bewerber.labelTelefon}: ${d.phone}`);
  if (d.startDate) z.push(`${t.bewerber.labelEintritt}: ${d.startDate}`);
  z.push(`${t.bewerber.labelUnterlagen}: ${unterlagenText(d, sprache)}`);
  z.push('');
  z.push(`${t.bewerber.fragenTitel} ${t.bewerber.fragenText} jobs@k-aqua.de`);
  z.push('', t.bewerber.gruss, t.bewerber.signatur, '');
  z.push('—'.repeat(40));
  z.push(`${STANDORT.name} · ${STANDORT.marke}`);
  z.push(`${STANDORT.strasse} · ${STANDORT.plz} ${STANDORT.ort}`);
  z.push(`${STANDORT.telefonAnzeige} · jobs@k-aqua.de · www.k-aqua.de`);
  z.push(
    `${STANDORT.handelsregister.gericht} ${STANDORT.handelsregister.nummer} · Geschäftsführung: Philipp Nickel, Marcello Gallio · USt-IdNr. DE 296238486`
  );
  z.push(`${t.gemeinsam.datenschutzText} ${basis}/${sprache}/datenschutz`);

  return z.join('\n');
}
