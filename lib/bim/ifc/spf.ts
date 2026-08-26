/* STEP Physical File — der Dateikoerper einer IFC-Datei.
 *
 * IFC ist kein eigenes Dateiformat, sondern ein Datenmodell in einer
 * Textnotation nach ISO 10303-21. Der Schreiber dafuer ist klein genug, um
 * ihn selbst zu halten: Zeilennummern vergeben, Werte richtig notieren,
 * Zeichenketten maskieren. Eine Fremdbibliothek dafuer waere mehr Abhaengigkeit
 * als Nutzen — und keine der verbreiteten laeuft im Next-Serverpfad.
 *
 * Was hier zaehlt, sind drei Feinheiten, an denen selbstgebaute Schreiber
 * ueblicherweise scheitern:
 *
 *   1. REAL braucht einen Dezimalpunkt. `63` ist ein INTEGER, `63.` ein REAL.
 *      Wer eine Nennweite als Ganzzahl schreibt, wo das Schema REAL verlangt,
 *      erzeugt eine Datei, die kein Prueflauf annimmt.
 *   2. Zeichenketten sind maskierungspflichtig: das Hochkomma wird verdoppelt,
 *      der Backslash ebenso, und alles jenseits von ASCII muss in die
 *      \X2\…\X0\-Notation. „Winkel 90° Muffe" enthaelt beides.
 *   3. GUIDs sind 22 Zeichen im IFC-eigenen Alphabet, nicht die uebliche
 *      UUID-Schreibweise.
 */

/** Verweis auf eine Zeile der Datei, also `#42`. */
export interface SpfRef {
  readonly id: number;
}

/** Ein Aufzaehlungswert, in der Datei als `.BEND.` notiert. */
export interface SpfEnum {
  readonly enumValue: string;
}

/** Eine Zahl, die ausdruecklich als REAL zu schreiben ist. */
export interface SpfReal {
  readonly real: number;
}

/**
 * Ein Wert mit ausdruecklichem Typ, in der Datei als `IFCLABEL('PP-R')`.
 *
 * IFC verlangt das ueberall dort, wo das Schema einen SELECT-Typ vorsieht —
 * bei jedem Merkmalswert etwa. Eine blosse Zeichenkette waere dort mehrdeutig
 * und wird von Pruefwerkzeugen beanstandet.
 */
export interface SpfTyped {
  readonly typeName: string;
  readonly value: SpfValue;
}

export type SpfValue =
  | SpfRef
  | SpfEnum
  | SpfReal
  | SpfTyped
  | number
  | string
  | boolean
  | null
  | undefined
  | SpfValue[];

/** `typed('IFCLABEL', 'PP-R')` schreibt `IFCLABEL('PP-R')`. */
export function typed(typeName: string, value: SpfValue): SpfTyped {
  return { typeName, value };
}

/** Kurzformen fuer die Werttypen, die hier immer wieder vorkommen. */
export const label = (v: string): SpfTyped => typed('IFCLABEL', v);
export const text = (v: string): SpfTyped => typed('IFCTEXT', v);
export const identifier = (v: string): SpfTyped => typed('IFCIDENTIFIER', v);
export const lengthMeasure = (v: number): SpfTyped =>
  typed('IFCLENGTHMEASURE', real(v));
export const positiveLength = (v: number): SpfTyped =>
  typed('IFCPOSITIVELENGTHMEASURE', real(v));
export const realMeasure = (v: number): SpfTyped => typed('IFCREAL', real(v));
export const integerMeasure = (v: number): SpfTyped => typed('IFCINTEGER', Math.round(v));
export const booleanMeasure = (v: boolean): SpfTyped => typed('IFCBOOLEAN', v);

export function ref(id: number): SpfRef {
  return { id };
}

export function enumValue(name: string): SpfEnum {
  return { enumValue: name };
}

/** Markiert eine Zahl als REAL. Ohne das wird eine ganze Zahl zum INTEGER. */
export function real(n: number): SpfReal {
  return { real: n };
}

/** Mehrere Zahlen als REAL — fuer Koordinaten und Richtungsvektoren. */
export function reals(...ns: number[]): SpfReal[] {
  return ns.map(real);
}

function isRef(v: unknown): v is SpfRef {
  return typeof v === 'object' && v !== null && 'id' in v;
}

function isEnum(v: unknown): v is SpfEnum {
  return typeof v === 'object' && v !== null && 'enumValue' in v;
}

function isReal(v: unknown): v is SpfReal {
  return typeof v === 'object' && v !== null && 'real' in v;
}

function isTyped(v: unknown): v is SpfTyped {
  return typeof v === 'object' && v !== null && 'typeName' in v;
}

/**
 * Schreibt eine Zahl als REAL nach ISO 10303-21.
 *
 * Ein REAL muss einen Dezimalpunkt tragen. `63` wird zu `63.`, `2.5` bleibt
 * `2.5`. Die Ausgabe wird auf sechs Nachkommastellen gekuerzt: Maße stehen im
 * Katalog auf ein Zehntel genau, und die Gleitkommadarstellung von etwa
 * `21.333333333333332` blaeht die Datei auf, ohne etwas hinzuzufuegen.
 */
export function formatReal(n: number): string {
  if (!Number.isFinite(n)) {
    throw new Error(`IFC: ${n} ist keine schreibbare Zahl`);
  }
  // -0 entsteht bei Spiegelungen und ist im Ergebnis dasselbe wie 0.
  const value = Object.is(n, -0) ? 0 : n;
  const rounded = Number(value.toFixed(6));
  return Number.isInteger(rounded) ? `${rounded}.` : String(rounded);
}

/**
 * Maskiert eine Zeichenkette fuer STEP.
 *
 * Hochkomma und Backslash werden verdoppelt. Zeichen jenseits von ASCII
 * gehen in die \X2\…\X0\-Notation, jeweils als UTF-16-Codeeinheiten in
 * Grossbuchstaben-Hex. Aufeinanderfolgende Sonderzeichen werden in einer
 * Sequenz zusammengefasst, wie es die Norm vorsieht.
 */
export function escapeString(text: string): string {
  let out = '';
  let unicodeRun: string[] = [];

  const flush = () => {
    if (unicodeRun.length === 0) return;
    out += `\\X2\\${unicodeRun.join('')}\\X0\\`;
    unicodeRun = [];
  };

  for (const char of text) {
    const code = char.codePointAt(0)!;
    if (code < 0x80) {
      flush();
      if (char === "'") out += "''";
      else if (char === '\\') out += '\\\\';
      else out += char;
    } else {
      // Codepunkte jenseits der Basisebene brauchen zwei UTF-16-Einheiten.
      for (let i = 0; i < char.length; i++) {
        unicodeRun.push(char.charCodeAt(i).toString(16).toUpperCase().padStart(4, '0'));
      }
    }
  }
  flush();
  return out;
}

function encode(value: SpfValue): string {
  if (value === null || value === undefined) return '$';
  if (isRef(value)) return `#${value.id}`;
  if (isEnum(value)) return `.${value.enumValue}.`;
  if (isReal(value)) return formatReal(value.real);
  if (isTyped(value)) return `${value.typeName.toUpperCase()}(${encode(value.value)})`;
  if (Array.isArray(value)) return `(${value.map(encode).join(',')})`;
  if (typeof value === 'boolean') return value ? '.T.' : '.F.';
  if (typeof value === 'number') {
    // Ganze Zahlen bleiben INTEGER. Wo das Schema REAL verlangt, muss die
    // Aufrufstelle `real()` benutzen — stillschweigend zu raten waere
    // schlimmer als der Fehler, weil die Datei dann erst beim Planer auffaellt.
    if (!Number.isInteger(value)) return formatReal(value);
    return String(value);
  }
  return `'${escapeString(value)}'`;
}

/**
 * Baut den DATA-Abschnitt einer IFC-Datei auf.
 *
 * Jede `add`-Zeile bekommt die naechste Nummer und gibt ihren Verweis zurueck.
 * Damit lassen sich Verweise beim Schreiben sofort weiterverwenden, ohne die
 * Nummern von Hand zu verwalten.
 */
export class SpfBuilder {
  private readonly lines: string[] = [];
  private nextId = 1;

  /** Haengt eine Entitaet an und liefert ihren Verweis. */
  add(type: string, ...args: SpfValue[]): SpfRef {
    const id = this.nextId++;
    this.lines.push(`#${id}=${type.toUpperCase()}(${args.map(encode).join(',')});`);
    return { id };
  }

  /** Anzahl der geschriebenen Zeilen — fuer Pruefungen und Groessenschaetzung. */
  get count(): number {
    return this.lines.length;
  }

  /** Der DATA-Abschnitt, ohne Rahmen. */
  body(): string {
    return this.lines.join('\n');
  }
}

/* --- IFC-GUID ------------------------------------------------------------
 *
 * IFC kennzeichnet jedes Objekt mit einer 22 Zeichen langen Kennung: 128 Bit,
 * in Gruppen zu 6 Bit im IFC-eigenen Alphabet geschrieben.
 *
 * Die Kennungen werden hier NICHT zufaellig erzeugt, sondern aus dem
 * Bezeichner des Objekts abgeleitet. Das hat einen praktischen Grund: eine
 * IFC-Datei, die bei jedem Abruf andere Kennungen traegt, laesst sich nicht
 * zwischenspeichern, nicht vergleichen und in keinem Planungswerkzeug
 * wiedererkennen. Zweimal dieselbe Nennweite abgerufen muss zweimal dieselbe
 * Datei ergeben.
 */

const GUID_ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$';

/** FNV-1a, 32 Bit. Vier Durchlaeufe mit verschiedenem Startwert ergeben 128 Bit. */
function fnv1a(text: string, seed: number): number {
  let hash = seed >>> 0;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

/**
 * Erzeugt eine gleichbleibende IFC-Kennung aus einem Bezeichner.
 *
 * @param seed eindeutiger Bezeichner des Objekts, z. B. `AQ09063:pipefitting`
 */
export function ifcGuid(seed: string): string {
  const words = [
    fnv1a(seed, 0x811c9dc5),
    fnv1a(seed, 0x1000193),
    fnv1a(seed, 0x9e3779b9),
    fnv1a(seed, 0x85ebca6b),
  ];

  // 128 Bit als Folge von Bits, daraus 22 Zeichen zu je 6 Bit.
  // 22 · 6 = 132; die ersten vier Bits bleiben null, wie in IFC ueblich.
  let bits = '';
  for (const word of words) bits += word.toString(2).padStart(32, '0');
  bits = '0000' + bits;

  let out = '';
  for (let i = 0; i < 132; i += 6) {
    out += GUID_ALPHABET[parseInt(bits.slice(i, i + 6), 2)];
  }
  return out;
}

/** Zeitstempel im STEP-Format `2026-08-25T07:41:00`. */
export function spfTimestamp(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, '');
}

export interface SpfHeaderOptions {
  fileName: string;
  description: string;
  timestamp: Date;
  author: string;
  organization: string;
  originatingSystem: string;
  preprocessorVersion: string;
}

/** Setzt Kopf, Rumpf und Abschluss zur fertigen Datei zusammen. */
export function assembleSpf(builder: SpfBuilder, options: SpfHeaderOptions): string {
  const s = (text: string) => `'${escapeString(text)}'`;
  return [
    'ISO-10303-21;',
    'HEADER;',
    `FILE_DESCRIPTION((${s(options.description)}),'2;1');`,
    `FILE_NAME(${s(options.fileName)},${s(spfTimestamp(options.timestamp))},` +
      `(${s(options.author)}),(${s(options.organization)}),` +
      `${s(options.preprocessorVersion)},${s(options.originatingSystem)},'');`,
    "FILE_SCHEMA(('IFC4'));",
    'ENDSEC;',
    'DATA;',
    builder.body(),
    'ENDSEC;',
    'END-ISO-10303-21;',
    '',
  ].join('\n');
}
