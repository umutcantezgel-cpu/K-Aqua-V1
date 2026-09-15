#!/usr/bin/env node
/**
 * Lesende Auswertung des Übersetzungsstands. Grundlage von `i18n-worklist.mjs`.
 *
 * DIESE BIBLIOTHEK SCHREIBT NICHT. Sie hat kein `writeFileSync`, und das ist
 * Absicht: Die Übersetzung selbst wird von Hand gemacht (siehe
 * `docs/i18n/ANTIGRAVITY-UEBERSETZUNGSAUFTRAG.md`, Abschnitt 0). Kein Skript
 * dieses Repos darf eine Datei unter `messages/` verändern. Was hier
 * entsteht, ist ausschließlich ein Befund zum Nachlesen.
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
 * unverändert zurück, und der Befund würde nie leer. `istSprachneutral()`
 * filtert diese Fälle. Bleibt darüber hinaus ein Wert, der in einer Sprache
 * zu Recht gleich lautet, meldet ihn der übersetzende Agent in seinem
 * Abschlussbericht statt ihn in eine Datei einzutragen.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const MSG_DIR = path.join(REPO, 'messages');


/** Quellsprachen der Merge-Kette — nie Ziel einer Übersetzung. */
export const QUELL_LOCALES = ['de', 'en'];

/**
 * Alle Locales, die übersetzt werden sollen: jede `messages/<code>.json` außer
 * den Quellsprachen und den englischen Regionalvarianten. Letztere sind
 * absichtlich englisch — für sie ist Gleichheit mit `en.json` das Ziel.
 */
export function zielLocales() {
  return fs
    .readdirSync(MSG_DIR)
    .filter((f) => f.endsWith('.json') && !f.startsWith('.'))
    .map((f) => f.slice(0, -'.json'.length))
    .filter((l) => !QUELL_LOCALES.includes(l))
    .filter((l) => !l.startsWith('en-'))
    .sort();
}

export function ladeJson(p, fallback = {}) {
  if (!fs.existsSync(p)) return fallback;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

/**
 * Flacht einen Nachrichtenbaum zu `{ 'a.b.c': 'Wert' }` ab.
 *
 * ARRAYS WERDEN MITGENOMMEN, mit dem Index als Pfadstück
 * (`catalogx.items.…faq.0.q`). Das ist kein Detail: 2341 der 5243 deutschen
 * Textwerte — 45 % — liegen in Arrays, nämlich die FAQ-Blöcke aller Produkte.
 * Eine Fassung, die Arrays überspringt, hält diese Hälfte des Bestands für
 * nicht vorhanden und meldet Sprachen als fertig, in denen kein einziges FAQ
 * übersetzt ist.
 */
export function flach(baum, prefix = '', out = {}) {
  const eintraege = Array.isArray(baum)
    ? baum.map((v, i) => [String(i), v])
    : Object.entries(baum ?? {});
  for (const [k, v] of eintraege) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out[key] = v;
    else if (v && typeof v === 'object') flach(v, key, out);
  }
  return out;
}

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
 * Schlüssel, deren Wert im Code gebraucht wird und niemals übersetzt werden darf.
 *
 * WARUM DAS EIGENS GEPRÜFT WIRD. `referenzenPage.icons.cta` hat den Wert
 * „Factory". Das ist kein Wort, sondern der Name einer Lucide-Komponente. Wird
 * daraus „مصنع", verschwindet das Icon — ohne Fehlermeldung, ohne Absturz, nur
 * eine leere Stelle auf der Seite. Dasselbe gilt für
 * `application.portal.jobs.0.id` = „prod" (Nachschlage-Schlüssel),
 * `legal.datenschutz.sections.0.id` = „sec-1" (Sprunganker) und
 * `contactx.routes.0.href` (mailto-Adresse).
 *
 * Gemessen am 2026-09-01: 2452 der offenen Einträge fallen unter dieses Muster.
 * Auf einer Übersetzerliste wären sie nicht Arbeit, sondern eine Falle.
 */
const SCHLUESSEL_TABU = /(^|\.)(id|href|src|icon|slug|type|lang|key|name|ref|anchor|code|goto)$|\.icons?\./;

/**
 * Schlüssel, deren Wert in JEDER Sprache zeichengleich bleibt.
 *
 * Anders als `SCHLUESSEL_TABU` geht es hier nicht um Bezeichner im Code,
 * sondern um Inhalte, die aus rechtlichen oder fachlichen Gründen nicht
 * übersetzt werden: die Impressumsangaben nach § 5 DDG (Firmierung, Anschrift,
 * Geschäftsführer, Handelsregister, USt-IdNr.), der Urhebervermerk,
 * Messing-Legierungsbezeichnungen nach EN 12164/12165, Zertifikatsmarken und
 * die Symbolspalten des Glossars.
 *
 * Ohne diese Liste stünden sie in allen 59 Sprachen dauerhaft auf der
 * Arbeitsliste — knapp tausend Einträge, die niemand je abarbeiten darf.
 */
const SCHLUESSEL_INVARIANT = new Set([
  'imprint.rows.0.1',
  'imprint.rows.1.1',
  'imprint.rows.2.1',
  'imprint.rows.3.1',
  'imprint.rows.4.1',
  'legal.impressum.sections.1.content',
  'footer.copyright',
  'footer.attribution.texts.2',
  'footer.badges.0.t',
  'academyx.gloss.2.0',
  'academyx.gloss.3.0',
  'academyx.gloss.5.0',
  'products.transitionFittings.stats.items.4.value',
  'productsx.anchors.0.t',
  'servicex.sup.0.c',
]);

/** Zertifizierungssysteme und Werkstoffkürzel: Eigennamen, bleiben gleich. */
const EIGENNAMEN = new Set([
  'leed', 'breeam', 'dgnb', 'genau', 'minergie',
  'pvc-u', 'pvc-c', 'ppr-c', 'hdpe', 'pe 100 (hdpe)',
]);

/**
 * Werte, die in jeder Sprache gleich stehen dürfen und deshalb nicht als
 * unübersetzt gelten: Zahlen und Maße, Artikelnummern, Nennweiten, URLs,
 * E-Mail-Adressen, sehr kurze Zeichen, Normbezeichnungen, Zeitcodes und reine
 * Marken-/Normwortfolgen. `key` ist optional; wird er übergeben, greift
 * zusätzlich das Schlüsselmuster oben.
 */
export function istSprachneutral(wert, key = '') {
  const s = String(wert ?? '').trim();
  if (s.length <= 2) return true;
  if (key && (SCHLUESSEL_TABU.test(key) || SCHLUESSEL_INVARIANT.has(key))) return true;
  if (EIGENNAMEN.has(s.toLowerCase())) return true;
  if (/^[\d\s.,:;×x*/+()°%–-]+$/u.test(s)) return true;          // 20 × 2,3 / 1.000
  if (/^(AQ|BL|CU|MO|UV)[\dA-Z]+$/i.test(s)) return true;         // Artikelnummern
  if (/^d\s?\d+([–-]\s?d?\d+)?$/i.test(s)) return true;           // d20, d20–d315
  if (/^https?:\/\//i.test(s) || /^[\w.+-]+@[\w.-]+\.\w+$/.test(s)) return true;
  if (/^(mailto:|tel:|\/|#)/i.test(s)) return true;               // Pfade, mailto, Anker
  if (/^[+()\d\s/-]{6,}$/.test(s)) return true;                   // Telefonnummern
  if (/^(ISO|DIN|EN|DVS|DVGW|SDR|PN|DN|ASTM|SASO|SVGW|KTW|SKZ)[\s\d]/i.test(s)) return true;
  if (/^T[+-]\d/.test(s)) return true;                            // Zeitcodes T+0:15
  if (/^[<>≈~]?\s*[\d.,]+\s*(%|W\/\(m·K\)|MB|GB|KB|mm|bar|°C|kg)?$/i.test(s)) return true;
  if (/W\/\(m·K\)/.test(s)) return true;                          // Wärmeleitwerte
  if (/^(PDF|XLSX|ZIP|DOCX|CSV|GLB|OBJ)[,\s]/i.test(s)) return true; // „PDF, 42 MB"
  if (/^[A-Z]{2}\d{6,}$/.test(s)) return true;                    // USt-IdNr. DE296238486
  const woerter = s.toLowerCase().split(/[\s/,·|-]+/).filter(Boolean);
  if (woerter.length > 0 && woerter.every((w) => MARKEN.includes(w) || /^[\d.,×x]+$/.test(w))) return true;
  return false;
}

export function fuellstrings(zielFlach, deFlach, enFlach) {
  const proWert = new Map();
  for (const [key, wert] of Object.entries(zielFlach)) {
    if (typeof wert !== 'string') continue;
    const w = wert.trim();
    if (!w) continue;
    if (!proWert.has(w)) proWert.set(w, []);
    proWert.get(w).push(key);
  }
  const verdaechtig = new Set();
  for (const [wert, keys] of proWert) {
    if (keys.length < 8) continue;
    const quellen = new Set(keys.map((k) => (deFlach[k] ?? enFlach[k] ?? '').trim()).filter(Boolean));
    if (quellen.size >= 8) verdaechtig.add(wert);
  }
  return verdaechtig;
}

/**
 * Die offenen Einträge einer Sprache.
 *
 * `art: 'gleich'`      — Wert steht zeichengleich wie im Deutschen/Englischen.
 * `art: 'fehlt'`       — Schlüssel fehlt ganz; die Seite zeigt den Fallback.
 * `art: 'platzhalter'` — Wert ist ein Füllstring (siehe `fuellstrings`).
 */
export function offeneEintraege(locale) {
  const de = flach(ladeJson(path.join(MSG_DIR, 'de.json')));
  const en = flach(ladeJson(path.join(MSG_DIR, 'en.json')));
  const ziel = flach(ladeJson(path.join(MSG_DIR, `${locale}.json`)));
  const fueller = fuellstrings(ziel, de, en);

  const eintraege = [];
  for (const key of new Set([...Object.keys(de), ...Object.keys(en)])) {
    const quelle = de[key] ?? en[key] ?? '';
    const englisch = en[key] ?? '';
    if (!quelle) continue;
    if (istSprachneutral(quelle, key)) continue;

    const wert = ziel[key];
    if (wert === undefined || typeof wert !== 'string') {
      eintraege.push({ key, art: 'fehlt', quelle, en: englisch });
      continue;
    }
    // Ein VORHANDENER leerer Wert ist eine Entscheidung, kein Versäumnis.
    // Beispiel `about.genauManagement` im Arabischen: Deutsch setzt die
    // Überschrift aus „Das " + „GENAU" + „ Management System" zusammen. Die
    // arabische Wortstellung verlangt das Gegenteil, also steht dort alles in
    // title1 („نظام إدارة ") und title2 ist absichtlich leer. Ergebnis auf der
    // Seite: „نظام إدارة GENAU". Wer das als Lücke meldet, lässt es jemanden
    // „reparieren" und zerstört damit eine richtige Übersetzung.
    if (!wert.trim()) continue;
    const w = wert.trim();
    if (w === quelle.trim() || (englisch && w === englisch.trim())) {
      eintraege.push({ key, art: 'gleich', quelle, en: englisch });
    } else if (fueller.has(w)) {
      eintraege.push({ key, art: 'platzhalter', quelle, en: englisch });
    }
  }
  eintraege.sort((a, b) => a.key.localeCompare(b.key));
  return eintraege;
}
