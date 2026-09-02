/**
 * Erzeugt `lib/article-names.generated.ts` aus der Herstellerliste.
 *
 *   npm run names:sync    erzeugen
 *   npm run names:check   pruefen, ob die erzeugte Datei aktuell ist (CI)
 *
 * ZWEI EINGABEN, nicht eine: die TSV des Herstellers UND die Artikeltabellen
 * unter `content/products/`. Damit schlaegt `--check` auch an, wenn jemand
 * eine Artikelnummer in einer Markdown aendert — nicht nur bei einer neuen
 * Lieferung des Herstellers.
 *
 * Laeuft als TypeScript ueber `tsx`, damit `parseArticleTable()` aus
 * `lib/bim/article-table.ts` wiederverwendet werden kann. Den Tabellenparser
 * ein zweites Mal zu schreiben waere die Sorte Verdopplung, die still
 * auseinanderlaeuft — und dieser hier ist gegen alle 73 Produktdateien
 * getestet.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { parseArticleTable, type ArticleTable } from '../lib/bim/article-table';

const WURZEL = process.cwd();
const TSV = path.join(WURZEL, 'content', 'artikelnamen', 'artikeltexte-2026-08.tsv');
const KORREKTUREN = path.join(WURZEL, 'content', 'artikelnamen', 'korrekturen.tsv');
const PRODUKTE = path.join(WURZEL, 'content', 'products');
const ZIEL = path.join(WURZEL, 'lib', 'article-names.generated.ts');

/** Farbkuerzel und das Wort, das im Namen stehen muss. Zweites Signal. */
const FARBKUERZEL: Record<string, readonly string[]> = {
  CU: ['curry'],
  BL: ['blau', 'blue', 'bleu'],
  MO: ['mocca', 'moka'],
  UV: ['schwarz', 'black', 'noir'],
};

interface Herstellerzeile {
  readonly nummer: string;
  readonly de: string;
  readonly en: string;
  readonly fr: string;
}

interface Websiteartikel {
  readonly code: string;
  readonly slug: string;
  readonly kategorie: string;
  /** Aussendurchmesser aus der `d`- bzw. `D`-Spalte, fuer die Gegenprobe. */
  readonly d: number | null;
}

// ── Einlesen ───────────────────────────────────────────────────────────────

function leseTsv(pfad: string): Herstellerzeile[] {
  const roh = fs.readFileSync(pfad, 'utf8').replace(/\n$/, '');
  const zeilen = roh.split('\n');
  const zeilen_ = zeilen.slice(1); // Kopfzeile
  return zeilen_.map((z) => {
    const f = z.split('\t');
    return {
      nummer: (f[0] ?? '').trim(),
      // Ueberzaehlige Leerzeichen normalisieren — 36 Zeilen tragen welche.
      // Das ist Formatierung, keine Textaenderung.
      de: (f[1] ?? '').replace(/\s+/g, ' ').trim(),
      en: (f[2] ?? '').replace(/\s+/g, ' ').trim(),
      fr: (f[3] ?? '').replace(/\s+/g, ' ').trim(),
    };
  }).filter((z) => z.nummer.length > 0);
}

function leseWebsiteartikel(): Websiteartikel[] {
  const artikel: Websiteartikel[] = [];
  for (const kategorie of fs.readdirSync(PRODUKTE)) {
    const ordner = path.join(PRODUKTE, kategorie);
    if (!fs.statSync(ordner).isDirectory()) continue;
    for (const datei of fs.readdirSync(ordner)) {
      if (!datei.endsWith('.md') || datei === 'index.md') continue;
      const roh = fs.readFileSync(path.join(ordner, datei), 'utf8');
      const { data, content } = matter(roh);
      const slug = String(data.slug ?? '').replace(/^.*\//, '') || path.basename(datei, '.md');
      const tabelle: ArticleTable | null = parseArticleTable(content);
      const dSpalte = tabelle?.columns.find((c) => c.key === 'd' || c.key === 'D');
      for (const zeile of tabelle?.rows ?? []) {
        const wert = dSpalte ? zeile.values[dSpalte.key] : null;
        artikel.push({
          code: zeile.code,
          slug,
          kategorie,
          d: typeof wert === 'number' ? wert : null,
        });
      }
    }
  }
  return artikel;
}

// ── Normalform ─────────────────────────────────────────────────────────────

/**
 * Die Normalform einer Artikelnummer.
 *
 * Trimmen, Grossschreibung, Leerzeichen weg, dann JEDES `P` entfernen.
 *
 * Das `P` ist der Werkstoffbuchstabe des Herstellers. Er steht in dessen
 * Liste durchgaengig, auf der Website nur bei Rohren — dort aber
 * BEDEUTUNGSTRAGEND: `AQ200P20` ist PP-R SDR 6, `AQ20020` ist PP-RCT SDR 7,4,
 * zwei verschiedene Produkte mit verschiedenen Wandstaerken.
 *
 * Diese Funktion darf sie deshalb NICHT unterscheiden — sie soll sie
 * ausdruecklich zusammenwerfen, damit die Kollision auffaellt und die
 * Zuordnung sie verweigert. Die Sicherheit liegt in der Eindeutigkeitspruefung
 * unten, nicht in einer klugen Normalform.
 */
function normalform(code: string): string {
  return code.trim().toUpperCase().replace(/\s+/g, '').replace(/P/g, '');
}

/** Grundnummer einer Farbvariante: CU041P20 -> AQ041P20. */
function grundnummer(code: string): string {
  return 'AQ' + code.slice(2);
}

// ── Pruefer ────────────────────────────────────────────────────────────────

function hatBuchstaben(s: string): boolean {
  return /[^\W\d_]/u.test(s);
}

function massTokens(s: string): number {
  return (s.match(/\bd\s?\d+/gi) ?? []).length;
}

/** Der einzelne Aussendurchmesser aus einem Namen, sofern es genau einen gibt. */
function einzelmass(s: string): number | null {
  const treffer = s.match(/\bd\s?(\d+)/gi) ?? [];
  if (treffer.length !== 1) return null;
  const zahl = treffer[0]?.match(/(\d+)/)?.[1];
  return zahl ? Number(zahl) : null;
}

// ── Erzeugen ───────────────────────────────────────────────────────────────

/**
 * Verletzt diese Zeile — ungeachtet jeder Korrektur — einen der Pruefer?
 *
 * Braucht die Verfallspruefung der Korrekturen: Eine Korrektur zu einer
 * inzwischen sauberen Zeile ist tot und muss auffallen.
 */
function verletztEinenPruefer(z: Herstellerzeile): boolean {
  for (const [sprache, wert] of [
    ['de', z.de],
    ['en', z.en],
    ['fr', z.fr],
  ] as const) {
    if (!wert) continue;
    if (!hatBuchstaben(wert)) return true;
    if (sprache !== 'de' && massTokens(wert) > massTokens(z.de)) return true;
  }
  return false;
}

interface Ergebnis {
  readonly namen: Record<string, { de: string; en: string; fr?: string; source: string }>;
  readonly aliasse: Record<string, string>;
  readonly diagnose: string[];
}

function erzeuge(): Ergebnis {
  const zeilen = leseTsv(TSV);
  const korrekturen = fs.existsSync(KORREKTUREN) ? leseTsv(KORREKTUREN) : [];
  const artikel = leseWebsiteartikel();

  const namen: Ergebnis['namen'] = {};
  const aliasse: Ergebnis['aliasse'] = {};
  const diagnose: string[] = [];

  // Normalform -> Website-Nummern. Mehrfachbelegung = mehrdeutig.
  const nachNormalform = new Map<string, Set<string>>();
  const nachCode = new Map<string, Websiteartikel>();
  for (const a of artikel) {
    const n = normalform(a.code);
    if (!nachNormalform.has(n)) nachNormalform.set(n, new Set());
    nachNormalform.get(n)!.add(a.code);
    nachCode.set(a.code, a);
  }
  const mehrdeutig = new Set(
    [...nachNormalform.entries()].filter(([, s]) => s.size > 1).map(([n]) => n)
  );
  diagnose.push(
    `Mehrdeutige Normalformen im Bestand: ${mehrdeutig.size} Gruppen, ` +
      `${[...mehrdeutig].reduce((s, n) => s + nachNormalform.get(n)!.size, 0)} Nummern. ` +
      `Diese bekommen NIE einen Namen.`
  );

  // Korrekturen vorbereiten und pruefen
  const korrekturNach = new Map(korrekturen.map((k) => [k.nummer, k]));
  const korrekturBenutzt = new Set<string>();
  const korrekturHinfaellig: string[] = [];

  let gegengeprueft = 0;
  let widersprueche = 0;
  const verworfen: string[] = [];
  const waisen: string[] = [];

  for (const zeile of zeilen) {
    const korrektur = korrekturNach.get(zeile.nummer);
    const wirksam: Herstellerzeile = korrektur
      ? { ...zeile, de: korrektur.de || zeile.de, en: korrektur.en || zeile.en, fr: korrektur.fr || zeile.fr }
      : zeile;

    // Prüfer 1: Buchstabenzwang
    const felder: Array<['de' | 'en' | 'fr', string]> = [
      ['de', wirksam.de],
      ['en', wirksam.en],
      ['fr', wirksam.fr],
    ];
    const brauchbar: Partial<Record<'de' | 'en' | 'fr', string>> = {};
    for (const [sprache, wert] of felder) {
      if (!wert) continue;
      if (!hatBuchstaben(wert)) {
        verworfen.push(`${zeile.nummer} ${sprache}: ohne Buchstaben (${JSON.stringify(wert)})`);
        continue;
      }
      // Prüfer 2: Massangaben gegen die deutsche Zelle
      if (sprache !== 'de' && massTokens(wert) > massTokens(wirksam.de)) {
        verworfen.push(
          `${zeile.nummer} ${sprache}: mehr Massangaben als im Deutschen (${JSON.stringify(wert)})`
        );
        continue;
      }
      brauchbar[sprache] = wert;
    }
    /* Eine Korrektur ist erst dann gerechtfertigt, wenn die ROHZEILE
       tatsaechlich einen Pruefer verletzt. Faende der Generator an der
       unkorrigierten Zeile nichts mehr auszusetzen, haette der Hersteller den
       Fehler in einer neuen Lieferung behoben — und die Korrektur wuerde ab
       da still einen Text festhalten, den niemand mehr geprueft hat. Der
       Befund unten wirft dann, und die Zeile gehoert geloescht. */
    if (korrektur) {
      if (verletztEinenPruefer(zeile)) korrekturBenutzt.add(zeile.nummer);
      else korrekturHinfaellig.push(zeile.nummer);
    }

    const istFarbe = !zeile.nummer.startsWith('AQ');
    const zielnummer = istFarbe ? grundnummer(zeile.nummer) : zeile.nummer;
    const n = normalform(zielnummer);

    if (mehrdeutig.has(n)) {
      verworfen.push(`${zeile.nummer}: Normalform ${n} ist im Bestand mehrdeutig`);
      continue;
    }
    const treffer = [...(nachNormalform.get(n) ?? [])][0];
    if (!treffer) {
      waisen.push(zeile.nummer);
      continue;
    }

    if (istFarbe) {
      // Zweites Signal: Das Farbwort muss zum Kuerzel passen.
      const kuerzel = zeile.nummer.slice(0, 2);
      const woerter = FARBKUERZEL[kuerzel];
      if (!woerter) {
        verworfen.push(`${zeile.nummer}: unbekanntes Kuerzel ${kuerzel}, kein Alias`);
        continue;
      }
      const text = `${wirksam.de} ${wirksam.en} ${wirksam.fr}`.toLowerCase();
      if (!woerter.some((w) => text.includes(w))) {
        verworfen.push(`${zeile.nummer}: Farbwort passt nicht zu ${kuerzel}, kein Alias`);
        continue;
      }
      aliasse[zeile.nummer.toUpperCase()] = treffer;
      continue;
    }

    // Grundprogramm: Name setzen, plus Alias fuer die Herstellerschreibweise
    if (!brauchbar.de || !brauchbar.en) {
      verworfen.push(`${zeile.nummer}: kein brauchbarer deutscher oder englischer Name`);
      continue;
    }

    // Prüfer 3: Massangabe gegen die Zeile
    const artikelZeile = nachCode.get(treffer);
    const mass = einzelmass(wirksam.de);
    if (mass !== null && artikelZeile?.d !== null && artikelZeile?.d !== undefined) {
      gegengeprueft++;
      if (mass !== artikelZeile.d) {
        widersprueche++;
        verworfen.push(
          `${zeile.nummer}: Mass im Namen (d${mass}) widerspricht der Zeile ${treffer} (d${artikelZeile.d})`
        );
        continue;
      }
    }

    namen[treffer] = {
      de: brauchbar.de,
      en: brauchbar.en,
      ...(brauchbar.fr ? { fr: brauchbar.fr } : {}),
      source: zeile.nummer,
    };
    if (zeile.nummer.toUpperCase() !== treffer) {
      aliasse[zeile.nummer.toUpperCase()] = treffer;
    }
  }

  // Eine Korrektur, die nichts korrigiert, ist verrottet — in beiden
  // Spielarten. Beides bricht die Erzeugung und damit die CI.
  if (korrekturHinfaellig.length > 0) {
    throw new Error(
      `Die Herstellerliste ist an ${korrekturHinfaellig.join(', ')} inzwischen sauber. ` +
        `Diese Korrekturzeilen in content/artikelnamen/korrekturen.tsv sind hinfaellig und gehoeren geloescht.`
    );
  }
  for (const k of korrekturen) {
    if (!korrekturBenutzt.has(k.nummer)) {
      throw new Error(
        `Korrektur fuer ${k.nummer} gehoert zu keiner Zeile der Herstellerliste. ` +
          `Entweder ist die Nummer falsch geschrieben, oder der Hersteller hat sie entfernt.`
      );
    }
  }
  if (korrekturen.length > 0) {
    diagnose.push(`Korrigierte Herstellerzeilen: ${korrekturen.length} (content/artikelnamen/korrekturen.tsv).`);
  }

  diagnose.push(`Zuordnung gegen die d-Spalte geprueft: ${gegengeprueft}, Widersprueche: ${widersprueche}.`);
  diagnose.push(`Waisen (keine Website-Nummer): ${waisen.length}.`);
  if (verworfen.length > 0) {
    diagnose.push(`Verworfene Zellen und Zeilen: ${verworfen.length}`);
    for (const v of verworfen.slice(0, 40)) diagnose.push(`  - ${v}`);
    if (verworfen.length > 40) diagnose.push(`  ... und ${verworfen.length - 40} weitere`);
  }

  // Website-Nummern ohne Namen, nach Kategorie
  const ohneNamen = artikel.filter((a) => !namen[a.code]);
  const nachKategorie = new Map<string, number>();
  for (const a of ohneNamen) nachKategorie.set(a.kategorie, (nachKategorie.get(a.kategorie) ?? 0) + 1);
  diagnose.push(
    `Website-Nummern ohne Namen: ${ohneNamen.length} von ${artikel.length} ` +
      `(${[...nachKategorie.entries()].sort().map(([k, v]) => `${k} ${v}`).join(', ')})`
  );

  return { namen, aliasse, diagnose };
}

// ── Ausgabe ────────────────────────────────────────────────────────────────

function baueDatei(e: Ergebnis): string {
  const namenSortiert = Object.keys(e.namen).sort();
  const aliasSortiert = Object.keys(e.aliasse).sort();

  const namenBlock = namenSortiert
    .map((c) => `  ${JSON.stringify(c)}: ${JSON.stringify(e.namen[c])},`)
    .join('\n');
  const aliasBlock = aliasSortiert
    .map((c) => `  ${JSON.stringify(c)}: ${JSON.stringify(e.aliasse[c])},`)
    .join('\n');

  return `// ERZEUGT — nicht von Hand ändern.
// Quelle: content/artikelnamen/artikeltexte-2026-08.tsv und content/products/**/*.md
// Neu erzeugen mit: npm run names:sync
//
// BEFUND DIESER ERZEUGUNG — Teil des Diffs, damit eine neue Lieferung mit
// einer neuen Auffälligkeit die CI bricht, bis jemand hingesehen hat:
//
${e.diagnose.map((d) => `//   ${d}`).join('\n')}

export type ArticleNameLocale = 'de' | 'en' | 'fr';

export interface ArticleNameRecord {
  readonly de: string;
  readonly en: string;
  /** Fehlt, wo die Herstellerliste keinen brauchbaren französischen Text führt. */
  readonly fr?: string;
  /** Nummer, unter der der Hersteller den Namen führt — mit Werkstoffbuchstaben P. */
  readonly source: string;
}

/**
 * Website-Artikelnummer → Name.
 *
 * Nur EINDEUTIG aufgelöste Zuordnungen. Trifft eine Normalform mehrere
 * Website-Nummern, steht hier nichts — der Fehlerfall ist ein fehlender Name,
 * nie ein falscher.
 */
export const ARTICLE_NAMES: Readonly<Record<string, ArticleNameRecord>> = {
${namenBlock}
};

/** Herstellerschreibweise und Farbvariante → Website-Artikelnummer. */
export const ARTICLE_CODE_ALIASES: Readonly<Record<string, string>> = {
${aliasBlock}
};

export const ARTICLE_NAME_SOURCE = 'artikeltexte-2026-08.tsv';
export const ARTICLE_NAME_COUNT = ${namenSortiert.length};
export const ARTICLE_ALIAS_COUNT = ${aliasSortiert.length};
`;
}

function main(): void {
  const pruefen = process.argv.includes('--check');
  const ergebnis = erzeuge();
  const datei = baueDatei(ergebnis);
  const vorhanden = fs.existsSync(ZIEL) ? fs.readFileSync(ZIEL, 'utf8') : '';

  if (pruefen) {
    if (vorhanden !== datei) {
      console.error('✗ lib/article-names.generated.ts ist nicht aktuell.');
      console.error('  Neu erzeugen mit: npm run names:sync');
      process.exit(1);
    }
    console.log(
      `✓ Artikelnamen aktuell (${Object.keys(ergebnis.namen).length} Namen, ` +
        `${Object.keys(ergebnis.aliasse).length} Aliasse)`
    );
    return;
  }

  fs.writeFileSync(ZIEL, datei, 'utf8');
  console.log(
    `✓ lib/article-names.generated.ts erzeugt — ` +
      `${Object.keys(ergebnis.namen).length} Namen, ${Object.keys(ergebnis.aliasse).length} Aliasse`
  );
  console.log();
  for (const d of ergebnis.diagnose) console.log(`  ${d}`);
}

main();
