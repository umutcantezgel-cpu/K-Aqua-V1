#!/usr/bin/env node
/**
 * Gemeinsame Logik für `i18n-worklist.mjs` und `i18n-apply.mjs`.
 *
 * WAS „UNÜBERSETZT" HIER HEISST. `lib/i18n/request.ts` mischt de → en →
 * Ziellocale. Ein Wert, der in `messages/tr.json` zeichengleich mit dem
 * deutschen oder englischen Wert steht, ist deshalb nicht „schon richtig",
 * sondern genau das, was der Fallback ohnehin geliefert hätte: ein deutscher
 * oder englischer Satz auf einer türkischen Seite. Ein fehlender Schlüssel ist
 * derselbe Befund mit anderer Ursache. Beide gehören auf die Arbeitsliste,
 * unterschieden über `art`.
 *
 * WARUM NICHT JEDE GLEICHHEIT EIN MANGEL IST. „PP-R", „DIN 8077", „AQ50020",
 * „d20", „K-Aqua", „PDF" sollen in jeder Sprache gleich bleiben. Würden sie
 * gemeldet, bekäme ein Agent sie zur Übersetzung vorgelegt, gäbe sie
 * unverändert zurück, und beim nächsten Lauf stünden sie wieder da — eine
 * Schleife, die nie leer läuft. `istSprachneutral()` filtert diese Fälle,
 * und was dort nicht greift, kann eine Sprache einmalig in
 * `messages/.i18n-identisch.json` festschreiben.
 *
 * WARUM DIE ENGLISCHEN VARIANTEN FEHLEN. en-AU, en-GB-artige Dateien sind
 * absichtlich englisch; für sie ist Gleichheit mit `en.json` das Ziel und kein
 * Mangel. Sie stehen deshalb nicht in `ZIEL_LOCALES`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const MSG_DIR = path.join(REPO, 'messages');

/**
 * Ausnahmen liegen als EINE DATEI JE SPRACHE unter `messages/.i18n-identisch/`.
 *
 * Nicht als eine gemeinsame Datei: an dieser Aufgabe arbeiten zwanzig Agenten
 * gleichzeitig. Eine geteilte Datei bedeutet Lesen–Ändern–Schreiben aus zwanzig
 * Prozessen auf denselben Pfad, und der letzte Schreiber gewinnt. Je Sprache
 * eine Datei heißt: jeder Prozess fasst nur seine eigene an.
 */
export const IDENTISCH_DIR = path.join(MSG_DIR, '.i18n-identisch');

/** Quellsprachen der Merge-Kette — nie Ziel einer Übersetzung. */
export const QUELL_LOCALES = ['de', 'en'];

/**
 * Alle Locales, die übersetzt werden sollen: jede `messages/<code>.json`
 * außer den Quellsprachen und den englischen Regionalvarianten.
 */
export function zielLocales() {
  return fs
    .readdirSync(MSG_DIR)
    .filter((f) => f.endsWith('.json') && !f.startsWith('.'))
    .map((f) => f.slice(0, -'.json'.length))
    .filter((l) => !QUELL_LOCALES.includes(l))
    .filter((l) => l !== 'en' && !l.startsWith('en-'))
    .sort();
}

export function ladeJson(p, fallback = {}) {
  if (!fs.existsSync(p)) return fallback;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

export function schreibeJson(p, wert) {
  fs.writeFileSync(p, JSON.stringify(wert, null, 2) + '\n', 'utf8');
}

/** Flacht einen Nachrichtenbaum zu `{ 'a.b.c': 'Wert' }` ab. Nur Strings. */
export function flach(baum, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(baum ?? {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out[key] = v;
    else if (v && typeof v === 'object' && !Array.isArray(v)) flach(v, key, out);
  }
  return out;
}

/** Setzt `a.b.c` im Baum, legt fehlende Ebenen an. */
export function setze(baum, key, wert) {
  const teile = key.split('.');
  let knoten = baum;
  for (const t of teile.slice(0, -1)) {
    if (!knoten[t] || typeof knoten[t] !== 'object' || Array.isArray(knoten[t])) knoten[t] = {};
    knoten = knoten[t];
  }
  knoten[teile[teile.length - 1]] = wert;
}

/**
 * ICU- und Markup-Platzhalter eines Textes, sortiert.
 *
 * Vergleichsmaß für die Prüfung: `{count}`, `{name}`, `<b>` müssen in der
 * Übersetzung zeichengleich wiederkehren, sonst wirft next-intl zur Laufzeit
 * oder die Zahl verschwindet aus dem Satz.
 */
export function platzhalter(s) {
  const ph = String(s ?? '').match(/\{[a-zA-Z_][a-zA-Z0-9_]*|<\/?[a-zA-Z][a-zA-Z0-9]*>/g) ?? [];
  return ph.sort();
}

const MARKEN = [
  'k-aqua', 'kaqua', 'kwt', 'coday', 'pp-r', 'pp-rct', 'ppr', 'pprct',
  'din', 'iso', 'en', 'sdr', 'dvgw', 'skz', 'kiwa', 'bim', 'ifc', 'cad',
  'pdf', 'glb', 'gltf', 'obj', 'dxf', 'stp', 'step', 'co2', 'co₂', 'ral',
  'pn', 'dn', 'pe', 'pvc', 'pp', 'uv', 'led', 'api', 'url', 'seo', 'gmbh',
];

/**
 * Werte, die in jeder Sprache gleich stehen dürfen und deshalb nicht als
 * unübersetzt gelten: Zahlen und Maße, Artikelnummern, Nennweiten, URLs,
 * E-Mail-Adressen, sehr kurze Zeichen und reine Marken-/Normwortfolgen.
 */
export function istSprachneutral(wert) {
  const s = String(wert ?? '').trim();
  if (s.length <= 2) return true;
  if (/^[\d\s.,:;×x*/+()°%–-]+$/u.test(s)) return true;          // 20 × 2,3 / 1.000
  if (/^(AQ|BL|CU|MO|UV)[\dA-Z]+$/i.test(s)) return true;         // Artikelnummern
  if (/^d\s?\d+([–-]\s?d?\d+)?$/i.test(s)) return true;           // d20, d20–d315
  if (/^https?:\/\//i.test(s) || /^[\w.+-]+@[\w.-]+\.\w+$/.test(s)) return true;
  if (/^[+()\d\s/-]{6,}$/.test(s)) return true;                   // Telefonnummern
  const woerter = s.toLowerCase().split(/[\s/,·|-]+/).filter(Boolean);
  if (woerter.length > 0 && woerter.every((w) => MARKEN.includes(w) || /^[\d.,×x]+$/.test(w))) return true;
  return false;
}

/** Festgeschriebene Ausnahmen einer Sprache: Liste von Schlüsseln. */
export function ladeIdentischListe(locale) {
  const p = path.join(IDENTISCH_DIR, `${locale}.json`);
  const inhalt = ladeJson(p, { keys: [] });
  return Array.isArray(inhalt) ? inhalt : (inhalt.keys ?? []);
}

/** Schreibt die Ausnahmen einer Sprache zurück; legt den Ordner bei Bedarf an. */
export function speichereIdentischListe(locale, keys) {
  fs.mkdirSync(IDENTISCH_DIR, { recursive: true });
  const p = path.join(IDENTISCH_DIR, `${locale}.json`);
  schreibeJson(p, { keys: [...new Set(keys)].sort() });
}

/**
 * Die offenen Einträge einer Sprache.
 *
 * `art: 'gleich'` — Wert steht zeichengleich wie im Deutschen oder Englischen.
 * `art: 'fehlt'`  — Schlüssel fehlt ganz; die Seite zeigt dort den Fallback.
 */
export function offeneEintraege(locale) {
  const de = flach(ladeJson(path.join(MSG_DIR, 'de.json')));
  const en = flach(ladeJson(path.join(MSG_DIR, 'en.json')));
  const ziel = flach(ladeJson(path.join(MSG_DIR, `${locale}.json`)));
  const ausnahmen = new Set(ladeIdentischListe(locale));

  const eintraege = [];
  for (const key of new Set([...Object.keys(de), ...Object.keys(en)])) {
    const quelle = de[key] ?? en[key] ?? '';
    const englisch = en[key] ?? '';
    if (!quelle) continue;
    if (ausnahmen.has(key)) continue;
    if (istSprachneutral(quelle)) continue;

    const wert = ziel[key];
    if (wert === undefined) {
      eintraege.push({ key, art: 'fehlt', quelle, en: englisch });
      continue;
    }
    if (typeof wert !== 'string' || !wert.trim()) {
      eintraege.push({ key, art: 'fehlt', quelle, en: englisch });
      continue;
    }
    const w = wert.trim();
    if (w === quelle.trim() || (englisch && w === englisch.trim())) {
      eintraege.push({ key, art: 'gleich', quelle, en: englisch });
    }
  }
  eintraege.sort((a, b) => a.key.localeCompare(b.key));
  return eintraege;
}
