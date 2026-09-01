/**
 * Schreibt alle Mailvorlagen als HTML-Dateien, damit man sie ansehen kann,
 * ohne eine einzige Mail zu verschicken.
 *
 *   npm run mail:preview
 *
 * Diagnosewerkzeug, kein Aenderungsskript: Es liest die Vorlagen und schreibt
 * Dateien in ein Ausgabeverzeichnis ausserhalb des Projekts. Es fasst keine
 * Quelldatei an.
 *
 * BILDER: Die Vorlagen verweisen auf `/mail/logo-dunkel.png` unter der
 * Basisadresse. In der Vorschau zeigt das ins Leere, solange kein Server
 * laeuft — und genau so soll man sie sich auch einmal ansehen. Die meisten
 * Empfaenger bekommen die Mail zuerst OHNE Bilder, und der Kopf muss auch dann
 * tragen.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { baueKundenbestaetigung } from '../lib/mail/vorlage/kunde';
import { baueBewerbungsbestaetigung } from '../lib/mail/vorlage/bewerber';
import { baueInterneAnfrage } from '../lib/mail/vorlage/intern';
import { MAILSPRACHEN, type Mailsprache } from '../lib/mail/sprache';

const AUSGABE =
  process.env.MAIL_PREVIEW_DIR ??
  path.join(process.env.TMPDIR ?? '/tmp', 'kaqua-mail-vorschau');

const BASIS = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://k-aqua.de';

/** Beispieldaten, die alle optionalen Felder belegen. */
const BEISPIEL_LEAD = {
  phone: '+49 171 1234567',
  email: 'einkauf@musterbau.de',
  interest: 'Rohrsysteme',
  page: 'produkte_rohre',
  name: 'Andrea Kowalski',
  company: 'Musterbau Haustechnik GmbH',
  message:
    'Wir planen die Trinkwasserinstallation für ein Wohnquartier mit 180 Einheiten.\nBenötigt werden d32 bis d110, Liefertermin voraussichtlich Q2.\nKönnen Sie uns ein Angebot und die passenden Ausschreibungstexte zusenden?',
};

/** Derselbe Lead ohne optionale Felder — der karge Fall muss auch tragen. */
const BEISPIEL_KNAPP = {
  phone: '+49 171 1234567',
  email: 'einkauf@musterbau.de',
  interest: 'Beratung',
  page: 'home',
};

/** Was der Server einer Anfrage hinzufuegt. */
const HERKUNFT = {
  pfad: 'https://k-aqua.de/de/produkte/pipes',
  sprache: 'de-DE',
  zeit: '2026-09-01T14:32:00.000Z',
};

const BEISPIEL_BEWERBUNG = {
  jobId: 'Verfahrensmechaniker Kunststofftechnik',
  firstName: 'Erika',
  lastName: 'Mustermann',
  email: 'erika.mustermann@beispiel.de',
  phone: '+49 160 9876543',
  startDate: '01.01.2027',
  cvDateiname: 'Lebenslauf_Mustermann.pdf',
  cvGroesse: 348_000,
};

function alsText(text: string): string {
  const maskiert = text.replace(
    /[&<>]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] ?? c
  );
  return `<pre style="font:14px/1.6 ui-monospace,Menlo,monospace;padding:24px;white-space:pre-wrap;">${maskiert}</pre>`;
}

function schreibe(name: string, html: string): void {
  const ziel = path.join(AUSGABE, name);
  writeFileSync(ziel, html, 'utf8');
  console.log(`  ${ziel}`);
}

function main(): void {
  mkdirSync(AUSGABE, { recursive: true });
  console.log('\nK-Aqua — Mailvorschau\n');
  console.log('Geschrieben:');

  for (const sprache of MAILSPRACHEN as readonly Mailsprache[]) {
    const voll = baueKundenbestaetigung(BEISPIEL_LEAD, sprache, BASIS);
    schreibe(`kunde-${sprache}.html`, voll.html);
    schreibe(`kunde-${sprache}.txt.html`, alsText(voll.text));

    const knapp = baueKundenbestaetigung(BEISPIEL_KNAPP, sprache, BASIS);
    schreibe(`kunde-${sprache}-knapp.html`, knapp.html);

    const bewerbung = baueBewerbungsbestaetigung(BEISPIEL_BEWERBUNG, sprache, BASIS);
    schreibe(`bewerber-${sprache}.html`, bewerbung.html);
  }

  /* Die internen Mails sind immer deutsch — sie gehen an Vertrieb und
     Personalabteilung in Waldsolms. Einmal unauffaellig, einmal mit
     Spam-Verdacht, weil der Warnkasten sonst nie zu sehen ist. */
  const intern = baueInterneAnfrage({ ...BEISPIEL_LEAD, ...HERKUNFT }, null);
  schreibe('intern-anfrage.html', intern.html);
  schreibe('intern-anfrage.txt.html', alsText(intern.text));

  const internVerdacht = baueInterneAnfrage(
    { ...BEISPIEL_LEAD, ...HERKUNFT },
    'Formular in 340 ms abgeschickt (Schwelle 1500 ms).'
  );
  schreibe('intern-anfrage-verdacht.html', internVerdacht.html);

  console.log('\nIm Browser oeffnen:');
  console.log(`  open ${AUSGABE}\n`);
}

main();
