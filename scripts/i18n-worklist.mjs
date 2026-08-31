#!/usr/bin/env node
/**
 * Arbeitsliste der noch nicht übersetzten Werte einer Sprache.
 *
 * Wird von den Übersetzungs-Agenten am Anfang JEDER Runde aufgerufen. Die
 * Liste wird jedes Mal frisch aus `messages/` errechnet, nie aus einer
 * zwischengespeicherten Datei — damit zwei Agenten, die versehentlich
 * dieselbe Sprache greifen, sich nicht gegenseitig alte Stände einspielen,
 * und damit ein Abbruch mitten im Lauf nichts kaputtmacht: was schon
 * eingespielt ist, taucht beim nächsten Aufruf nicht mehr auf.
 *
 * Aufruf:
 *   node scripts/i18n-worklist.mjs tr                 → Zusammenfassung
 *   node scripts/i18n-worklist.mjs tr --out lauf.json → Datei für den Agenten
 *   node scripts/i18n-worklist.mjs tr --limit 200     → nur die ersten 200
 *   node scripts/i18n-worklist.mjs --alle             → Zählung aller Sprachen
 *
 * Exitcode 0, wenn die Sprache fertig ist (0 offene Einträge), sonst 1.
 * Genau daran hängt die Abbruchbedingung der Agentenschleife.
 */

import fs from 'node:fs';
import { offeneEintraege, zielLocales } from './i18n-lib.mjs';

const argv = process.argv.slice(2);
const flagWert = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};

if (argv.includes('--alle')) {
  const zeilen = [];
  let summe = 0;
  for (const locale of zielLocales()) {
    const e = offeneEintraege(locale);
    summe += e.length;
    zeilen.push({
      locale,
      offen: e.length,
      fehlt: e.filter((x) => x.art === 'fehlt').length,
      gleich: e.filter((x) => x.art === 'gleich').length,
    });
  }
  zeilen.sort((a, b) => b.offen - a.offen);
  if (argv.includes('--json')) {
    console.log(JSON.stringify({ summe, sprachen: zeilen }, null, 2));
  } else {
    console.log('Sprache    offen   davon fehlend   davon gleich wie de/en');
    for (const z of zeilen) {
      console.log(
        `${z.locale.padEnd(9)} ${String(z.offen).padStart(6)}   ${String(z.fehlt).padStart(13)}   ${String(z.gleich).padStart(22)}`
      );
    }
    console.log(`\n${zeilen.length} Sprachen, ${summe} offene Einträge gesamt.`);
    console.log(`fertig: ${zeilen.filter((z) => z.offen === 0).length}`);
  }
  process.exit(summe === 0 ? 0 : 1);
}

const locale = argv.find((a) => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== '--out' && argv[argv.indexOf(a) - 1] !== '--limit');
if (!locale) {
  console.error('Aufruf: node scripts/i18n-worklist.mjs <locale> [--out datei.json] [--limit N]');
  process.exit(2);
}

// de und en sind die Quellen der Merge-Kette, en-AU/en-US/… sind absichtlich
// englisch. Für sie gibt es nichts zu übersetzen, und eine Liste auszugeben
// hieße, einen Agenten stundenlang gegen seinen eigenen Quelltext arbeiten zu
// lassen.
if (!zielLocales().includes(locale)) {
  console.error(`"${locale}" ist keine Zielsprache. Gültig: ${zielLocales().join(' ')}`);
  process.exit(2);
}

let eintraege = offeneEintraege(locale);
const gesamt = eintraege.length;
const limit = Number(flagWert('--limit') ?? 0);
if (limit > 0) eintraege = eintraege.slice(0, limit);

const out = flagWert('--out');
if (out) {
  fs.writeFileSync(
    out,
    JSON.stringify({ locale, gesamt, geliefert: eintraege.length, eintraege }, null, 2),
    'utf8'
  );
  console.log(`${locale}: ${gesamt} offen, ${eintraege.length} in ${out} geschrieben.`);
} else {
  console.log(`${locale}: ${gesamt} offene Einträge`);
  console.log(`  fehlend: ${eintraege.filter((e) => e.art === 'fehlt').length}`);
  console.log(`  gleich wie de/en: ${eintraege.filter((e) => e.art === 'gleich').length}`);
}

process.exit(gesamt === 0 ? 0 : 1);
