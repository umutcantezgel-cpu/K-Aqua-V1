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
 * BILDER: Die Vorlagen verweisen auf `/mail/logo-weiss.png` unter der
 * Basisadresse. In der Vorschau zeigt das ins Leere, solange kein Server
 * laeuft — und genau so soll man sie sich auch einmal ansehen. Die meisten
 * Empfaenger bekommen die Mail zuerst OHNE Bilder, und der Kopf muss auch dann
 * tragen.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { baueKundenbestaetigung } from '../lib/mail/vorlage/kunde';
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
    schreibe(`kunde-${sprache}.txt.html`, `<pre>${voll.text.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] ?? c)}</pre>`);

    const knapp = baueKundenbestaetigung(BEISPIEL_KNAPP, sprache, BASIS);
    schreibe(`kunde-${sprache}-knapp.html`, knapp.html);
  }

  console.log('\nIm Browser oeffnen:');
  console.log(`  open ${AUSGABE}\n`);
}

main();
