#!/usr/bin/env node
/**
 * Prüft die Rückgabe eines Übersetzungs-Agenten und spielt sie ein.
 *
 * Der Agent schreibt eine Datei
 *   { "locale": "tr", "uebersetzungen": { "<key>": "<Text>", … } }
 * und ruft dieses Skript darauf auf. Nichts wird ungeprüft übernommen — die
 * Prüfungen decken genau die Fehler ab, die in den bisherigen Läufen wirklich
 * aufgetreten sind:
 *
 *  1. ERFUNDENE SCHLÜSSEL. Ein Modell, das 220 Einträge übersetzen soll,
 *     erfindet gelegentlich einen 221. Schlüssel oder verschreibt sich in
 *     einem Pfad. Angenommen wird nur, was in der aktuellen Arbeitsliste
 *     steht — damit kann dieses Skript auch keine bereits fertige Übersetzung
 *     überschreiben.
 *  2. VERLORENE PLATZHALTER. `{count}` oder `<b>` fallen beim Übersetzen weg
 *     oder werden mitübersetzt. next-intl wirft dann zur Laufzeit, und zwar
 *     erst auf der Unterseite, die niemand aufruft. Verglichen wird
 *     zeichengenau gegen die Quelle.
 *  3. UNVERÄNDERTE RÜCKGABE. Wer den deutschen Satz zurückgibt, hat nichts
 *     übersetzt — der Eintrag stünde beim nächsten Lauf wieder auf der Liste
 *     und die Schleife liefe endlos. Solche Werte werden abgewiesen. Ist der
 *     Wert in dieser Sprache tatsächlich identisch (Eigenname, Norm), trägt
 *     ihn `--identisch <key>` einmalig in die Ausnahmeliste ein.
 *
 * Aufruf:
 *   node scripts/i18n-apply.mjs lauf.json
 *   node scripts/i18n-apply.mjs lauf.json --identisch nav.bim --identisch nav.cad
 *   node scripts/i18n-apply.mjs lauf.json --trocken     (nur prüfen, nichts schreiben)
 *
 * Exit 0 = alles sauber eingespielt · 3 = teilweise, Bericht beachten
 *      2 = Eingabedatei unbrauchbar.
 */

import path from 'node:path';
import {
  MSG_DIR, ladeJson, schreibeJson, setze, platzhalter,
  offeneEintraege, ladeIdentischListe, speichereIdentischListe,
} from './i18n-lib.mjs';

const argv = process.argv.slice(2);
const datei = argv.find((a) => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== '--identisch');
const trocken = argv.includes('--trocken');
const alsIdentisch = argv.reduce((acc, a, i) => (a === '--identisch' && argv[i + 1] ? [...acc, argv[i + 1]] : acc), []);

if (!datei) {
  console.error('Aufruf: node scripts/i18n-apply.mjs <datei.json> [--identisch <key>]… [--trocken]');
  process.exit(2);
}

let eingabe;
try {
  eingabe = ladeJson(path.resolve(datei), null);
} catch (e) {
  console.error(`Eingabedatei ist kein gültiges JSON: ${e.message}`);
  process.exit(2);
}
if (!eingabe || typeof eingabe !== 'object') {
  console.error('Eingabedatei fehlt oder ist leer.');
  process.exit(2);
}

const locale = eingabe.locale;
const uebersetzungen = eingabe.uebersetzungen;
if (typeof locale !== 'string' || !uebersetzungen || typeof uebersetzungen !== 'object') {
  console.error('Eingabe braucht { "locale": "<code>", "uebersetzungen": { … } }.');
  process.exit(2);
}

const zielDatei = path.join(MSG_DIR, `${locale}.json`);
const offen = new Map(offeneEintraege(locale).map((e) => [e.key, e]));

// Als identisch festgeschriebene Schlüssel zuerst vermerken. Sie werden danach
// still übergangen statt abgewiesen — ein Agent darf Festschreibung und
// Übersetzungen in einem Aufruf schicken, ohne dafür Exitcode 3 zu ernten.
const festgeschrieben = new Set();
if (alsIdentisch.length && !trocken) {
  const bestand = ladeIdentischListe(locale);
  const gueltig = alsIdentisch.filter((k) => offen.has(k));
  speichereIdentischListe(locale, [...bestand, ...gueltig]);
  for (const k of gueltig) {
    offen.delete(k);
    festgeschrieben.add(k);
  }
  console.log(`als identisch festgeschrieben: ${gueltig.length}`);
}

const baum = ladeJson(zielDatei);
const abgewiesen = [];
let uebernommen = 0;

for (const [key, wert] of Object.entries(uebersetzungen)) {
  if (festgeschrieben.has(key)) continue;
  const eintrag = offen.get(key);
  if (!eintrag) {
    abgewiesen.push({ key, grund: 'steht nicht auf der Arbeitsliste' });
    continue;
  }
  if (typeof wert !== 'string' || !wert.trim()) {
    abgewiesen.push({ key, grund: 'leer' });
    continue;
  }
  const a = platzhalter(eintrag.quelle).join('|');
  const b = platzhalter(wert).join('|');
  if (a !== b) {
    abgewiesen.push({ key, grund: `Platzhalter weichen ab (Quelle: ${a || '—'}, Rückgabe: ${b || '—'})` });
    continue;
  }
  const w = wert.trim();
  if (w === eintrag.quelle.trim() || (eintrag.en && w === eintrag.en.trim())) {
    abgewiesen.push({ key, grund: 'unverändert gegenüber de/en — mit --identisch festschreiben, falls korrekt' });
    continue;
  }
  // Führende und schließende Leerzeichen der QUELLE übernehmen, nicht die der
  // Rückgabe. Mehrere Überschriften sind aus zwei Schlüsseln zusammengesetzt
  // („GENAU" + „ Management System"), und das trennende Leerzeichen steht im
  // zweiten Wert. Wer hier trimmt, klebt die Wörter zusammen; wer die Rückgabe
  // ungeprüft nimmt, verliert das Leerzeichen bei jedem Modell, das trimmt.
  const fuehrend = eintrag.quelle.match(/^\s*/)[0];
  const schliessend = eintrag.quelle.match(/\s*$/)[0];
  setze(baum, key, fuehrend + w + schliessend);
  uebernommen++;
}

if (!trocken && uebernommen > 0) {
  schreibeJson(zielDatei, baum);
  ladeJson(zielDatei); // Gegenprobe: die geschriebene Datei parst.
}

console.log(`${locale}: ${uebernommen} übernommen, ${abgewiesen.length} abgewiesen${trocken ? ' (Trockenlauf)' : ''}`);
for (const a of abgewiesen.slice(0, 25)) console.log(`  ✗ ${a.key} — ${a.grund}`);
if (abgewiesen.length > 25) console.log(`  … und ${abgewiesen.length - 25} weitere`);

process.exit(abgewiesen.length ? 3 : 0);
