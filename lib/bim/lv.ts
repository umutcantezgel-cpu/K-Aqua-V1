/* Ausschreibungstexte (Leistungsverzeichnis-Positionen).
 *
 * Auf /ressourcen/ausschreibungstexte stand bisher Marketingprosa ÜBER
 * Ausschreibungstexte, aber kein einziger: keine Ordnungszahl, kein Kurz- oder
 * Langtext, keine Mengeneinheit. Beide Download-Knöpfe führten auf eine Seite
 * ohne Datei.
 *
 * Diese Datei erzeugt die Texte — und zwar AUS dem geprüften BIM-Datensatz,
 * nicht als neu geschriebene Prosa. Das ist der entscheidende Unterschied:
 * jede Angabe im Langtext hat damit ihre Herkunft per Konstruktion, und jede
 * Position trägt ihre Katalogseite als Beleg. Was der Katalog nicht führt,
 * steht auch nicht im Text — ein erfundenes „PN 20" auf einem Winkel wäre
 * genau die Art ungedeckter Zusage, die hier verschwinden soll.
 *
 * ZUR SPRACHE, ehrlich benannt: Der Marketing-Ordner enthält ausschließlich
 * englische Unterlagen (`KA-Katalog_GB_06-2025`, `Flyer_GB_2025`); die
 * Wandgrafik von 2017 ist reine Vektorgrafik ohne Textebene. Eine deutsche
 * Herstellerquelle für Produktbezeichnungen gibt es also nicht. Die deutschen
 * Bezeichnungen unten sind daher wörtliche, sachliche Übertragungen der
 * Katalogbezeichnung — nichts hinzugefügt, nichts ausgeschmückt.
 *
 * Bewusst NICHT verwendet wird `productNames` aus den Sprachdateien. Dort
 * stehen Werbetexte („Sichere PP-R Rohrstopfen für Leitungen", „Stabile PP-R
 * Rohrschellen"), und Wörter wie „sicher" oder „hochwertig" sind in einem
 * Leistungsverzeichnis keine Spezifikation. Ein Planer müsste jeden Text von
 * Hand nachbearbeiten, womit der Download seinen Zweck verlöre.
 */

import type { CatalogCategoryId } from '@/lib/data/catalog';
import { PIPE_STOCK_LENGTH_M } from '@/lib/data/catalog';
import type { BimRecord, JointType } from '@/lib/bim/product';

export type LvLang = 'de' | 'en';

/** Eine Position des Leistungsverzeichnisses — eine Artikelnummer. */
export interface LvPosition {
  /** Ordnungszahl, zweistufig: Titel.Position, etwa „03.0140". */
  oz: string;
  articleCode: string;
  productSlug: string;
  category: CatalogCategoryId;
  /** Titel (Gewerkeabschnitt), unter dem die Position steht. */
  titelNr: string;
  titelText: string;
  /** Einzeilige Kurzbezeichnung. */
  kurztext: string;
  /** Langtext, eine Angabe je Zeile. */
  langtext: string[];
  /** Mengeneinheit: „m" bei Rohren, „St" bzw. „pcs" sonst. */
  einheit: string;
  /** Fundstelle im Herstellerkatalog. */
  beleg: string;
}

/* --------------------------------------------------------------------------
 * Bezeichnungen
 * ------------------------------------------------------------------------ */

/**
 * Die sachliche Bezeichnung je Produkt, nach Kategorie und Slug.
 *
 * Grundlage ist durchgehend die Katalogbezeichnung (`BimRecord.title`). Die
 * englische Spalte gibt sie unverändert wieder, sofern sie schon sachlich ist;
 * die deutsche überträgt sie in die im Sanitärbau übliche Benennung.
 *
 * Zwei Übertragungen verdienen eine Notiz, weil sie nicht wörtlich sind:
 * „Flange Adaptor" ist der Vorschweißbund, der zusammen mit dem Losflansch
 * („Backing Flange") verbaut wird — „Flanschadapter" gibt es im deutschen
 * Sprachgebrauch nicht. Und „Weld-in Saddle" heißt Anschweißsattel; „Sattel"
 * allein wäre mehrdeutig.
 */
interface Bezeichnung {
  de: string;
  en: string;
}

const BEZEICHNUNG: Record<string, Bezeichnung> = {
  /* --- Rohre. Die Produktnamen sind Herstellerbezeichnungen und bleiben
         unübersetzt; nur „Pipe" wird zu „Rohr". */
  'k-pipe-pp-r-sdr-6': { de: 'K-Pipe Rohr PP-R SDR 6', en: 'K-Pipe PP-R SDR 6' },
  'k-pipe-pp-r-sdr-11': { de: 'K-Pipe Rohr PP-R SDR 11', en: 'K-Pipe PP-R SDR 11' },
  'k-pipe-pp-rct-sdr-74': { de: 'K-Pipe Rohr PP-RCT SDR 7,4', en: 'K-Pipe PP-RCT SDR 7.4' },
  'k-pipe-purple-pp-r-sdr-11': {
    de: 'K-Pipe Rohr PP-R SDR 11, violett (Betriebswasser)',
    en: 'K-Pipe Purple PP-R SDR 11',
  },
  'k-fiber-pipe-pp-r-sdr-6': { de: 'K-Fiber Rohr PP-R SDR 6, faserverstärkt', en: 'K-Fiber Pipe PP-R SDR 6' },
  'k-fiber-pipe-pp-r-sdr-9': { de: 'K-Fiber Rohr PP-R SDR 9, faserverstärkt', en: 'K-Fiber Pipe PP-R SDR 9' },
  'k-fiber-pipe-pp-r-sdr-11': { de: 'K-Fiber Rohr PP-R SDR 11, faserverstärkt', en: 'K-Fiber Pipe PP-R SDR 11' },
  'k-fiber-pipe-pp-r-sdr-17': { de: 'K-Fiber Rohr PP-R SDR 17, faserverstärkt', en: 'K-Fiber Pipe PP-R SDR 17' },
  'k-fiber-pipe-pp-r-sdr-74': { de: 'K-Fiber Rohr PP-R SDR 7,4, faserverstärkt', en: 'K-Fiber Pipe PP-R SDR 7.4' },
  'k-fiber-pipe-pp-rct-sdr-74': {
    de: 'K-Fiber Rohr PP-RCT SDR 7,4, faserverstärkt',
    en: 'K-Fiber Pipe PP-RCT SDR 7.4',
  },
  'k-fiber-uv-pipe-pp-r-sdr-74': {
    de: 'K-Fiber UV-Rohr PP-R SDR 7,4, faserverstärkt, UV-beständig',
    en: 'K-Fiber UV Pipe PP-R SDR 7.4',
  },
  'k-fiber-uv-pipe-pp-rct-sdr-74': {
    de: 'K-Fiber UV-Rohr PP-RCT SDR 7,4, faserverstärkt, UV-beständig',
    en: 'K-Fiber UV Pipe PP-RCT SDR 7.4',
  },
  'k-fiberclima-pipe-pp-rct-sdr-11': {
    de: 'K-Fiberclima Rohr PP-RCT SDR 11, faserverstärkt',
    en: 'K-Fiberclima Pipe PP-RCT SDR 11',
  },

  /* --- Formstücke */
  socket: { de: 'Muffe PP-R', en: 'Socket PP-R' },
  cap: { de: 'Kappe PP-R', en: 'End cap PP-R' },
  'elbow-45': { de: 'Winkel 45° PP-R', en: 'Elbow 45° PP-R' },
  'elbow-90': { de: 'Winkel 90° PP-R', en: 'Elbow 90° PP-R' },
  'elbow-45-femalemale': { de: 'Winkel 45° PP-R, Muffe/Spitzende', en: 'Elbow 45° PP-R, female/male' },
  'elbow-90-femalemale': { de: 'Winkel 90° PP-R, Muffe/Spitzende', en: 'Elbow 90° PP-R, female/male' },
  tee: { de: 'T-Stück PP-R', en: 'Equal tee PP-R' },
  'reducing-tee': { de: 'T-Stück PP-R, reduziert', en: 'Reducing tee PP-R' },
  cross: { de: 'Kreuzstück PP-R', en: 'Cross fitting PP-R' },
  'cross-over': { de: 'Überbogen PP-R', en: 'Pipe crossover PP-R' },
  'cross-over-pipe': { de: 'Überbogenrohr PP-R', en: 'Crossover pipe PP-R' },
  'reducing-bush': { de: 'Reduzierstück PP-R', en: 'Reducing bush PP-R' },
  'electrofusion-socket': { de: 'Heizwendelmuffe PP-R', en: 'Electrofusion socket PP-R' },
  // Vorschweißbund, nicht „Flanschadapter": er wird mit dem Losflansch verbaut.
  'flange-adaptor': { de: 'Vorschweißbund PP-R', en: 'Flange adaptor PP-R' },

  /* --- Übergangsformstücke */
  'adaptor-socket-female-thread': {
    de: 'Übergangsmuffe PP-R mit Innengewinde',
    en: 'Adaptor socket PP-R, female thread',
  },
  'adaptor-socket-male-thread': {
    de: 'Übergangsmuffe PP-R mit Außengewinde',
    en: 'Adaptor socket PP-R, male thread',
  },
  'elbow-90-male-thread': {
    de: 'Übergangswinkel 90° PP-R mit Außengewinde',
    en: 'Transition elbow 90° PP-R, male thread',
  },
  'elbow-bracket-90-female-thread': {
    de: 'Winkel 90° PP-R mit Innengewinde und Befestigungslasche',
    en: 'Elbow bracket 90° PP-R, female thread',
  },
  'elbow-wall-bracket-90-female-thread': {
    de: 'Wandwinkel 90° PP-R mit Innengewinde',
    en: 'Elbow/wall bracket 90° PP-R, female thread',
  },
  'metal-union-female-thread': {
    de: 'Verschraubung mit PP-R-Überwurfmutter, Innengewinde',
    en: 'Metal union with PP-R nut, female thread',
  },
  'metal-union-male-thread': {
    de: 'Verschraubung mit PP-R-Überwurfmutter, Außengewinde',
    en: 'Metal union with PP-R nut, male thread',
  },
  'metal-union-female-thread-brass': {
    de: 'Verschraubung Messing CW617N, Innengewinde',
    en: 'Metal union in brass CW617N, female thread',
  },
  'metal-union-male-thread-brass': {
    de: 'Verschraubung Messing CW617N, Außengewinde',
    en: 'Metal union in brass CW617N, male thread',
  },
  'tee-90-female-thread': { de: 'T-Stück 90° PP-R mit Innengewinde', en: 'Tee 90° PP-R, female thread' },
  'tee-90-male-thread': { de: 'T-Stück 90° PP-R mit Außengewinde', en: 'Tee 90° PP-R, male thread' },
  union: { de: 'Verschraubung PP-R', en: 'Pipe union PP-R' },
  'union-for-watermeters': { de: 'Verschraubung PP-R für Wasserzähler', en: 'Union PP-R for water meters' },

  /* --- Armaturen */
  'pp-r-ball-valve-ball-in-pp': { de: 'Kugelhahn PP-R, Kugel aus PP', en: 'Ball valve PP-R, PP core' },
  'pp-r-ball-valve-ball-in-brass-chromium-plated': {
    de: 'Kugelhahn PP-R, Kugel aus Messing, verchromt',
    en: 'Ball valve PP-R, brass core, chromium plated',
  },
  'straight-seat-valve-green-handle': {
    de: 'Geradsitzventil PP-R, Oberteil',
    en: 'Straight seat valve PP-R, upper part',
  },
  'concealed-valve-chrome-heavy-part': {
    de: 'Unterputzventil verchromt, Grundkörper',
    en: 'Concealed valve, chrome, heavy part',
  },
  'concealed-valve-chrome-light-part': {
    de: 'Unterputzventil verchromt, Oberteil',
    en: 'Concealed valve, chrome, light part',
  },
  'elongation-pieces': { de: 'Verlängerungsstück PP-R', en: 'Elongation piece PP-R' },
  'battery-female-thread': { de: 'Batterie PP-R mit Innengewinde', en: 'Battery PP-R, female thread' },
  'adjustable-battery-female-thread': {
    de: 'Batterie PP-R, verstellbar, mit Innengewinde',
    en: 'Adjustable battery PP-R, female thread',
  },
  'tee-90-female-thread-for-internal-valve': {
    de: 'T-Stück 90° PP-R mit Innengewinde für Einbauventil',
    en: 'Tee 90° PP-R, female thread, for internal valve',
  },

  /* --- Anbohrsättel */
  'weld-in-saddle': { de: 'Anschweißsattel PP-R', en: 'Weld-in saddle PP-R' },
  'weld-in-saddle-female-thread': {
    de: 'Anschweißsattel PP-R mit Innengewinde',
    en: 'Weld-in saddle PP-R, female thread',
  },
  'weld-in-saddle-male-thread': {
    de: 'Anschweißsattel PP-R mit Außengewinde',
    en: 'Weld-in saddle PP-R, male thread',
  },

  /* --- Zubehör */
  plug: { de: 'Rohrstopfen PP-R', en: 'Pipe plug PP-R' },
  'pipe-clamps': { de: 'Rohrschelle', en: 'Pipe clamp' },
  'flat-gasket': { de: 'Flachdichtung', en: 'Flat gasket' },
  'flat-gasket-for-unions-pp-r': {
    de: 'Flachdichtung für Verschraubungen PP-R',
    en: 'Flat gasket for unions PP-R',
  },
  'backing-flange-pp-steel-sfbf': {
    de: 'Losflansch PP/Stahl (SF/BF)',
    en: 'Backing flange PP-steel (SF/BF)',
  },
};

/* --------------------------------------------------------------------------
 * Titelgliederung
 * ------------------------------------------------------------------------ */

/**
 * Die Titel des Leistungsverzeichnisses, in fester Reihenfolge.
 *
 * Die Nummer ist Teil der Ordnungszahl und darf sich deshalb nicht ändern,
 * sobald ein Leistungsverzeichnis erst einmal ausgegeben wurde — eine
 * verschobene Ordnungszahl macht jeden Bezug darauf falsch.
 */
const TITEL: { id: CatalogCategoryId; nr: string; de: string; en: string }[] = [
  { id: 'pipes', nr: '01', de: 'Rohrleitungen', en: 'Pipes' },
  { id: 'fittings', nr: '02', de: 'Formstücke', en: 'Fittings' },
  { id: 'transition-fittings', nr: '03', de: 'Übergangsformstücke', en: 'Transition fittings' },
  { id: 'valves', nr: '04', de: 'Armaturen', en: 'Valves' },
  { id: 'weld-in-saddles', nr: '05', de: 'Anschweißsättel', en: 'Weld-in saddles' },
  { id: 'accessories', nr: '06', de: 'Zubehör', en: 'Accessories' },
];

/* --------------------------------------------------------------------------
 * Bausteine des Langtexts
 * ------------------------------------------------------------------------ */

const FUEGEART: Record<JointType, Bezeichnung | null> = {
  'socket-fusion': {
    de: 'Verbindung durch Muffenschweißung (Heizelement-Muffenschweißen) nach DVS 2207-11',
    en: 'Socket fusion joint (heated tool socket welding) to DVS 2207-11',
  },
  'butt-fusion': {
    de: 'Verbindung durch Heizelement-Stumpfschweißen nach DVS 2207-11',
    en: 'Butt fusion joint (heated tool butt welding) to DVS 2207-11',
  },
  electrofusion: {
    de: 'Verbindung durch Heizwendelschweißen nach DVS 2207-1',
    en: 'Electrofusion joint to DVS 2207-1',
  },
  threaded: {
    de: 'Verbindung durch Gewinde nach ISO 228-1',
    en: 'Threaded joint to ISO 228-1',
  },
  flanged: { de: 'Flanschverbindung', en: 'Flanged joint' },
  compression: { de: 'Klemmverbindung', en: 'Compression joint' },
  none: null,
};

/**
 * Die Farbkennzeichnung, wie der Katalog sie führt.
 *
 * Ein geschlossener Satz von Angaben — die Frontmatter kennt genau diese
 * Formulierungen. Eine unbekannte Angabe wird unverändert durchgereicht statt
 * geraten; sie steht dann englisch da, was ehrlicher ist als eine falsche
 * Übersetzung.
 */
function farbeDe(colour: string): string {
  const map: Record<string, string> = {
    green: 'grün',
    'green (PP-R)': 'grün (PP-R)',
    'green with 1 blue stripe': 'grün mit 1 blauem Streifen',
    'green with 1 red stripe': 'grün mit 1 rotem Streifen',
    'green with 4 blue stripes': 'grün mit 4 blauen Streifen',
    'green with 4 red stripes': 'grün mit 4 roten Streifen',
    'green with 4 grey stripes': 'grün mit 4 grauen Streifen',
    'green (PP-R) with brass threaded insert': 'grün (PP-R) mit Messing-Gewindeeinsatz',
    'green (PP-R) with brass union nut': 'grün (PP-R) mit Messing-Überwurfmutter',
    'green (PP-R nut) with metal union body': 'grün (PP-R-Mutter) mit Verschraubungskörper aus Metall',
    'green (PP-R nut) with yellow brass (CW617N) body':
      'grün (PP-R-Mutter) mit Körper aus Messing CW617N',
    'outside layer black, inside layer green': 'Außenschicht schwarz, Innenschicht grün',
    'outside layer purple, inside layer green': 'Außenschicht violett, Innenschicht grün',
  };
  return map[colour] ?? colour;
}

const WERKSTOFF: Record<string, Bezeichnung> = {
  'PP-R': {
    de: 'Polypropylen PP-R (Random-Copolymer)',
    en: 'polypropylene PP-R (random copolymer)',
  },
  'PP-RCT': {
    de: 'Polypropylen PP-RCT (Random-Copolymer, erhöhte Temperaturbeständigkeit)',
    en: 'polypropylene PP-RCT (random copolymer, raised temperature resistance)',
  },
};

/** Zahl mit deutschem Dezimalkomma bzw. englischem Punkt. */
function zahl(value: number, lang: LvLang): string {
  const s = String(value);
  return lang === 'de' ? s.replace('.', ',') : s;
}

/**
 * Dezimalpunkte in einem vorformatierten Katalogstring auf Komma umstellen.
 *
 * Die Druckstufe steht im Datensatz fertig formuliert („20°C / 1.2 MPa ·
 * 60°C / 0.6 MPa"), geht also nicht durch `zahl()`. In einem deutschen
 * Leistungsverzeichnis ist ein Punkt als Dezimaltrenner ein Zahlenfehler —
 * 1.2 liest sich als 12. Nur zwischen zwei Ziffern ersetzen, damit
 * Normbezeichnungen wie „DVS 2207-11" unberührt bleiben.
 */
function kommaText(text: string, lang: LvLang): string {
  return lang === 'de' ? text.replace(/(\d)\.(\d)/g, '$1,$2') : text;
}

/**
 * Normen entdoppeln.
 *
 * Der Katalog führt bei den Rohren „DIN 8077 / 8078" und daneben noch einmal
 * „DIN 8077" und „DIN 8078" einzeln. Dreimal dieselbe Norm in einer Zeile
 * sieht nach Unachtsamkeit aus und verlängert jeden Langtext.
 */
function normenKuerzen(standards: string[]): string[] {
  const behalten: string[] = [];
  for (const norm of standards) {
    // Deckt eine Sammelangabe diese Einzelnorm schon ab?
    const abgedeckt = standards.some((andere) => {
      if (andere === norm || !andere.includes('/')) return false;
      const [kopf] = andere.split('/');
      const praefix = (kopf ?? '').trim().replace(/\s+\S+$/, '');
      return andere
        .split('/')
        .map((teil, i) => (i === 0 ? teil.trim() : `${praefix} ${teil.trim()}`))
        .includes(norm);
    });
    if (!abgedeckt && !behalten.includes(norm)) behalten.push(norm);
  }
  return behalten;
}

/* --------------------------------------------------------------------------
 * Erzeugung
 * ------------------------------------------------------------------------ */

/** Die Bezeichnung eines Produkts, oder null, wenn keine hinterlegt ist. */
export function lvBezeichnung(slug: string, lang: LvLang): string | null {
  const b = BEZEICHNUNG[slug];
  return b ? b[lang] : null;
}

/** Alle Produkt-Slugs, für die eine Bezeichnung hinterlegt ist. */
export function lvBezeichneteSlugs(): string[] {
  return Object.keys(BEZEICHNUNG);
}

/**
 * Baut die Position zu genau einem Artikel.
 *
 * Null bei Werkzeugen: die werden gekauft, nicht ausgeschrieben. Und null,
 * wenn keine Bezeichnung hinterlegt ist — lieber keine Position als eine mit
 * geratenem Namen.
 */
export function toLvPosition(
  record: BimRecord,
  lang: LvLang,
  laufendeNummer: number,
): LvPosition | null {
  if (record.isTool) return null;

  const bezeichnung = lvBezeichnung(record.productSlug, lang);
  if (!bezeichnung) return null;

  const titel = TITEL.find((t) => t.id === record.category);
  if (!titel) return null;

  const de = lang === 'de';
  const masse = record.outerDiameterMm !== null ? `d ${zahl(record.outerDiameterMm, lang)} mm` : null;

  /* Kurztext: Bezeichnung plus Nennweite. Der Katalog führt für 262 der 546
     Nummern einen eigenen Artikelnamen mit Nennweite („Elbow 90° d32 mm"); wo
     er fehlt — bei allen Rohren —, wird die Nennweite angehängt. */
  const kurztext = masse ? `${bezeichnung}, ${masse}` : bezeichnung;

  const zeilen: string[] = [];

  const werkstoff = WERKSTOFF[record.material];
  zeilen.push(
    de
      ? `Werkstoff: ${werkstoff?.de ?? record.material}`
      : `Material: ${werkstoff?.en ?? record.material}`,
  );

  /* Die Maße unverändert aus der Artikeltabelle. Bewusst alle Spalten und
     nicht nur die drei bekannten: der Katalog führt je Produktart andere,
     und eine Auswahl hier würde stillschweigend Angaben unterschlagen. */
  const massText = record.dimensions
    .filter((d) => !['Pack.', 'kg', 'Weight', 'Water capacity'].includes(d.key))
    .map((d) => {
      const wert = typeof d.value === 'number' ? zahl(d.value, lang) : d.value;
      const einheit = d.unit ? ` ${d.unit}` : d.key === 'DN' ? '' : ' mm';
      return `${d.key} ${wert}${einheit}`;
    });
  if (massText.length) {
    zeilen.push(de ? `Maße: ${massText.join(', ')}` : `Dimensions: ${massText.join(', ')}`);
  }

  if (record.sdr !== null) {
    // `series` kommt wie `pressure` fertig formuliert aus dem Katalog („S 2.5")
    // und muss deshalb ebenfalls durch die Kommaumstellung.
    const reihe = record.series
      ? `, ${de ? 'Reihe' : 'series'} ${kommaText(record.series, lang)}`
      : '';
    zeilen.push(`SDR ${zahl(record.sdr, lang)}${reihe}`);
  }
  if (record.deviatingSeries) {
    const abw = kommaText(record.deviatingSeries, lang);
    zeilen.push(
      de
        ? `Abweichende Reihe für diese Nennweite: ${abw}`
        : `Deviating series for this size: ${abw}`,
    );
  }
  if (record.pressure) {
    const druck = kommaText(record.pressure, lang);
    zeilen.push(de ? `Zulässiger Betriebsdruck: ${druck}` : `Permissible pressure: ${druck}`);
  }

  const fuegeart = FUEGEART[record.jointType];
  if (fuegeart) zeilen.push(fuegeart[lang]);

  if (record.colour) {
    zeilen.push(
      de ? `Farbkennzeichnung: ${farbeDe(record.colour)}` : `Colour marking: ${record.colour}`,
    );
  }

  const normen = normenKuerzen(record.standards);
  if (normen.length) {
    zeilen.push(de ? `Normen: ${normen.join(', ')}` : `Standards: ${normen.join(', ')}`);
  }

  if (record.massPerMetreKg !== null) {
    zeilen.push(de ? `Gewicht: ${zahl(record.massPerMetreKg, lang)} kg/m` : `Weight: ${record.massPerMetreKg} kg/m`);
  } else if (record.massKg !== null) {
    zeilen.push(de ? `Gewicht: ${zahl(record.massKg, lang)} kg/St` : `Weight: ${record.massKg} kg/pc`);
  }
  if (record.waterCapacityLitrePerMetre !== null) {
    zeilen.push(
      de
        ? `Wasserinhalt: ${zahl(record.waterCapacityLitrePerMetre, lang)} l/m`
        : `Water capacity: ${record.waterCapacityLitrePerMetre} l/m`,
    );
  }

  const istRohr = record.category === 'pipes';
  if (istRohr) {
    const laenge = record.stockLengthM ?? PIPE_STOCK_LENGTH_M;
    zeilen.push(de ? `Lieferlänge: ${zahl(laenge, lang)} m je Stange` : `Stock length: ${laenge} m per bar`);
  }
  if (record.packUnit !== null) {
    zeilen.push(
      de
        ? `Verpackungseinheit: ${record.packUnit} ${istRohr ? 'Stangen' : 'Stück'}`
        : `Pack unit: ${record.packUnit} ${istRohr ? 'bars' : 'pcs'}`,
    );
  }

  if (record.note) {
    zeilen.push(de ? `Hinweis: ${kommaText(record.note, lang)}` : `Note: ${record.note}`);
  }
  /* Die Fußnoten stehen im Katalog englisch und werden hier NICHT übersetzt.
     Sie als deutschen Satz auszugeben hiesse, eine Herstellerangabe zu
     formulieren, die so nirgends steht — bei einer Fügeanweisung ist das
     riskant. Der Zusatz sagt deshalb, was der Leser vor sich hat. */
  for (const f of record.footnotes) {
    zeilen.push(de ? `Fußnote (Katalogwortlaut): ${f}` : `Footnote: ${f}`);
  }

  /* Widersprüche des Katalogs wandern mit in den Text. Sie zu verschweigen
     hiesse, eine Zahl als gesichert auszugeben, die es nicht ist. */
  for (const issue of record.issues) {
    const kern = `${issue.field}: ${de ? 'gedruckt' : 'printed'} ${zahl(issue.printed, lang)}, ${
      de ? 'stimmig wäre' : 'consistent would be'
    } ${zahl(issue.consistent, lang)} (${issue.source})`;
    zeilen.push(de ? `Abweichung im Katalog — ${kern}` : `Catalogue discrepancy — ${kern}`);
  }

  zeilen.push(
    de
      ? `Fabrikat: K-Aqua, Artikel ${record.articleCode}, oder gleichwertig.`
      : `Make: K-Aqua, article ${record.articleCode}, or equivalent.`,
  );
  zeilen.push(de ? `Beleg: ${record.source}` : `Source: ${record.source}`);

  return {
    oz: `${titel.nr}.${String(laufendeNummer * 10).padStart(4, '0')}`,
    articleCode: record.articleCode,
    productSlug: record.productSlug,
    category: record.category,
    titelNr: titel.nr,
    titelText: de ? titel.de : titel.en,
    kurztext,
    langtext: zeilen,
    /* Rohre sind Meterware, alles andere Stückgut. Das ist keine Konvention,
       sondern folgt der Artikeltabelle: bei Rohren zählt `Pack.` Stangen zu
       je vier Metern, bei Formstücken Stück. */
    einheit: istRohr ? 'm' : de ? 'St' : 'pcs',
    beleg: record.source,
  };
}

/**
 * Das vollständige Leistungsverzeichnis über alle Bauteile.
 *
 * Sortiert nach Titel und darin nach Produkt und Nennweite — die Reihenfolge,
 * in der ein Planer sie erwartet, und die Grundlage der Ordnungszahlen.
 */
export function buildLeistungsverzeichnis(records: BimRecord[], lang: LvLang): LvPosition[] {
  const titelIndex = new Map(TITEL.map((t, i) => [t.id, i]));

  const sortiert = [...records]
    .filter((r) => !r.isTool)
    .sort((a, b) => {
      const ta = titelIndex.get(a.category) ?? 99;
      const tb = titelIndex.get(b.category) ?? 99;
      if (ta !== tb) return ta - tb;
      if (a.productSlug !== b.productSlug) return a.productSlug.localeCompare(b.productSlug);
      return (a.outerDiameterMm ?? 0) - (b.outerDiameterMm ?? 0);
    });

  const zaehler = new Map<string, number>();
  const positionen: LvPosition[] = [];
  for (const record of sortiert) {
    const n = (zaehler.get(record.category) ?? 0) + 1;
    const position = toLvPosition(record, lang, n);
    if (!position) continue;
    zaehler.set(record.category, n);
    positionen.push(position);
  }
  return positionen;
}

/* --------------------------------------------------------------------------
 * Ausgabeformate
 * ------------------------------------------------------------------------ */

/** Das Leistungsverzeichnis als lesbarer Text, zum Übernehmen in ein AVA-System. */
export function toLvText(positionen: LvPosition[], lang: LvLang, edition: string): string {
  const de = lang === 'de';
  const zeilen: string[] = [
    de ? '# K-Aqua — Ausschreibungstexte (Leistungsverzeichnis)' : '# K-Aqua — tender texts (bill of quantities)',
    de ? `# Katalogstand: ${edition}` : `# Catalogue edition: ${edition}`,
    de ? `# Positionen: ${positionen.length}` : `# Positions: ${positionen.length}`,
    de
      ? '# Jede Angabe stammt aus dem Herstellerkatalog; die Fundstelle steht in der Position.'
      : '# Every figure is taken from the manufacturer catalogue; the source is stated in each position.',
    '',
  ];

  let titel = '';
  for (const p of positionen) {
    if (p.titelNr !== titel) {
      titel = p.titelNr;
      zeilen.push('', `${p.titelNr}  ${p.titelText.toUpperCase()}`, '');
    }
    zeilen.push(`${p.oz}  ${p.kurztext}`);
    zeilen.push(`${' '.repeat(9)}${de ? 'Mengeneinheit' : 'Unit'}: ${p.einheit}`);
    for (const l of p.langtext) zeilen.push(`${' '.repeat(9)}${l}`);
    zeilen.push('');
  }
  return zeilen.join('\n');
}

/** Dieselben Positionen als Tabelle — Semikolon und BOM, damit Excel sie öffnet. */
export function toLvCsv(positionen: LvPosition[], lang: LvLang): string {
  const de = lang === 'de';
  const kopf = de
    ? ['OZ', 'Titel', 'Kurztext', 'Mengeneinheit', 'Artikelnummer', 'Langtext', 'Beleg']
    : ['Item no.', 'Section', 'Short text', 'Unit', 'Article', 'Long text', 'Source'];

  const feld = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const zeilen = [kopf.map(feld).join(';')];
  for (const p of positionen) {
    zeilen.push(
      [
        p.oz,
        `${p.titelNr} ${p.titelText}`,
        p.kurztext,
        p.einheit,
        p.articleCode,
        p.langtext.join(' | '),
        p.beleg,
      ]
        .map(feld)
        .join(';'),
    );
  }
  // BOM: ohne ihn liest Excel die Umlaute als Mojibake.
  return '﻿' + zeilen.join('\r\n') + '\r\n';
}
