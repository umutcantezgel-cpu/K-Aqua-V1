/* Halterungsabstaende — Abstand zwischen den Rohrbefestigungen.
 *
 * QUELLE: KA-Katalog_GB_06-2025_NEU.pdf, Abschnitt 4.9 „Distance Between the
 * Supporting Points":
 *   Figure 7  auf S. 63 — K-Pipe,       2,0 MPa
 *   Figure 8  auf S. 63 — K-Pipe,       1,0 MPa
 *   Figure 9  auf S. 64 — K-Fiber Pipe, 2,0 MPa
 *   Figure 10 auf S. 64 — K-Fiber Pipe, 1,6 MPa
 *
 * Alle vier Seiten wurden gerendert und Zeile fuer Zeile abgetippt.
 * Werte in Zentimetern, genau wie gedruckt.
 *
 * Der Katalog stellt den Tabellen voran: „The type and number of the pipe
 * fixings depend on the type of structure and on the longitudinal expansion.
 * The fixed points must divide the pipe into sections in which contraction or
 * expansion would take place." Diese Tabellen sind also Erfahrungswerte fuer
 * den Regelfall, kein Ersatz fuer die Festpunktplanung.
 *
 * Verwendet in `Pset_KAqua_Installation` jeder erzeugten IFC-Rohrdatei und auf
 * /ressourcen/technik/halterungsabstaende. */

export type SupportSpacingTableId =
  | 'k-pipe-2.0'
  | 'k-pipe-1.0'
  | 'k-fiber-2.0'
  | 'k-fiber-1.6';

export interface SupportSpacingTable {
  id: SupportSpacingTableId;
  /** Rohrbauart, wie der Katalog sie in der Bildunterschrift nennt. */
  pipeTypeDe: string;
  pipeTypeEn: string;
  /** Druckstufe in MPa, auf die sich die Tabelle bezieht. */
  pressureMpa: number;
  /** Spaltentemperaturen in °C, in gedruckter Reihenfolge. */
  temperaturesC: number[];
  /** Zeilen: Aussendurchmesser d in mm → Abstaende in cm, spaltengleich. */
  rows: { d: number; spacingCm: number[] }[];
  source: string;
  figure: string;
}

/* Figure 7, S. 63 — K-Pipe (Monoschicht), 2,0 MPa.
 * Einzige Tabelle, die d16 fuehrt; dafuer endet sie bei d125. */
const K_PIPE_2_0: SupportSpacingTable = {
  id: 'k-pipe-2.0',
  pipeTypeDe: 'K-Pipe',
  pipeTypeEn: 'K-Pipe',
  pressureMpa: 2.0,
  temperaturesC: [20, 30, 40, 50, 60, 70, 80],
  rows: [
    { d: 16, spacingCm: [60, 60, 60, 55, 45, 45, 40] },
    { d: 20, spacingCm: [65, 65, 60, 60, 60, 55, 50] },
    { d: 25, spacingCm: [75, 75, 70, 70, 65, 60, 55] },
    { d: 32, spacingCm: [90, 90, 85, 85, 80, 75, 70] },
    { d: 40, spacingCm: [110, 110, 105, 100, 95, 90, 85] },
    { d: 50, spacingCm: [125, 120, 115, 110, 105, 100, 90] },
    { d: 63, spacingCm: [140, 135, 130, 125, 120, 115, 105] },
    { d: 75, spacingCm: [155, 150, 145, 135, 130, 125, 115] },
    { d: 90, spacingCm: [165, 160, 155, 145, 140, 130, 120] },
    { d: 110, spacingCm: [185, 180, 170, 165, 155, 150, 140] },
    { d: 125, spacingCm: [190, 185, 180, 170, 160, 155, 150] },
  ],
  source: 'KA-Katalog_GB_06-2025, S. 63',
  figure: 'Figure 7',
};

/* Figure 8, S. 63 — K-Pipe (Monoschicht), 1,0 MPa.
 * Reicht bis d315, fuehrt dafuer nur Temperaturen bis 60 °C. */
const K_PIPE_1_0: SupportSpacingTable = {
  id: 'k-pipe-1.0',
  pipeTypeDe: 'K-Pipe',
  pipeTypeEn: 'K-Pipe',
  pressureMpa: 1.0,
  temperaturesC: [20, 30, 40, 50, 60],
  rows: [
    { d: 20, spacingCm: [60, 55, 50, 45, 40] },
    { d: 25, spacingCm: [75, 70, 65, 60, 55] },
    { d: 32, spacingCm: [90, 85, 75, 70, 65] },
    { d: 40, spacingCm: [100, 95, 90, 85, 75] },
    { d: 50, spacingCm: [120, 115, 105, 100, 90] },
    { d: 63, spacingCm: [140, 130, 120, 110, 100] },
    { d: 75, spacingCm: [150, 145, 135, 125, 115] },
    { d: 90, spacingCm: [160, 155, 150, 145, 130] },
    { d: 110, spacingCm: [180, 170, 160, 155, 140] },
    { d: 125, spacingCm: [190, 185, 175, 165, 150] },
    { d: 160, spacingCm: [200, 195, 185, 175, 160] },
    // d200 bei 50 °C: der Katalog druckt 245. Siehe SUSPECT_VALUES unten.
    { d: 200, spacingCm: [245, 235, 225, 245, 205] },
    { d: 250, spacingCm: [275, 265, 255, 245, 235] },
    { d: 315, spacingCm: [290, 280, 270, 260, 250] },
  ],
  source: 'KA-Katalog_GB_06-2025, S. 63',
  figure: 'Figure 8',
};

/* Figure 9, S. 64 — K-Fiber Pipe (Faserverbund), 2,0 MPa. */
const K_FIBER_2_0: SupportSpacingTable = {
  id: 'k-fiber-2.0',
  pipeTypeDe: 'K-Fiber Pipe',
  pipeTypeEn: 'K-Fiber Pipe',
  pressureMpa: 2.0,
  temperaturesC: [20, 30, 40, 50, 60, 70, 80],
  rows: [
    { d: 20, spacingCm: [100, 90, 85, 85, 80, 70, 65] },
    { d: 25, spacingCm: [105, 100, 95, 90, 85, 80, 75] },
    { d: 32, spacingCm: [120, 115, 110, 105, 100, 95, 90] },
    { d: 40, spacingCm: [130, 125, 120, 115, 110, 105, 100] },
    { d: 50, spacingCm: [150, 145, 140, 135, 130, 125, 120] },
    { d: 63, spacingCm: [160, 155, 150, 145, 140, 135, 130] },
    { d: 75, spacingCm: [180, 175, 170, 165, 160, 155, 145] },
    { d: 90, spacingCm: [190, 185, 180, 175, 170, 165, 150] },
    { d: 110, spacingCm: [200, 195, 190, 180, 175, 170, 160] },
    { d: 125, spacingCm: [220, 210, 205, 195, 185, 175, 165] },
    { d: 160, spacingCm: [220, 210, 205, 195, 185, 175, 165] },
    { d: 200, spacingCm: [245, 235, 230, 220, 210, 200, 190] },
    { d: 250, spacingCm: [275, 265, 255, 245, 235, 225, 210] },
    { d: 315, spacingCm: [310, 300, 290, 275, 265, 260, 250] },
  ],
  source: 'KA-Katalog_GB_06-2025, S. 64',
  figure: 'Figure 9',
};

/* Figure 10, S. 64 — K-Fiber Pipe (Faserverbund), 1,6 MPa. */
const K_FIBER_1_6: SupportSpacingTable = {
  id: 'k-fiber-1.6',
  pipeTypeDe: 'K-Fiber Pipe',
  pipeTypeEn: 'K-Fiber Pipe',
  pressureMpa: 1.6,
  temperaturesC: [20, 30, 40, 50, 60, 70, 80],
  rows: [
    { d: 20, spacingCm: [80, 80, 75, 75, 70, 60, 55] },
    { d: 25, spacingCm: [95, 90, 85, 80, 75, 70, 65] },
    { d: 32, spacingCm: [110, 105, 100, 95, 90, 85, 80] },
    { d: 40, spacingCm: [120, 115, 110, 105, 100, 95, 90] },
    { d: 50, spacingCm: [140, 135, 130, 125, 120, 115, 110] },
    { d: 63, spacingCm: [150, 145, 140, 135, 130, 125, 120] },
    { d: 75, spacingCm: [165, 160, 155, 150, 145, 140, 130] },
    { d: 90, spacingCm: [175, 170, 165, 160, 155, 150, 135] },
    { d: 110, spacingCm: [185, 180, 175, 165, 160, 155, 145] },
    { d: 125, spacingCm: [205, 195, 190, 180, 170, 160, 150] },
    { d: 160, spacingCm: [205, 195, 190, 180, 170, 160, 150] },
    { d: 200, spacingCm: [230, 220, 210, 200, 190, 180, 170] },
    { d: 250, spacingCm: [250, 240, 230, 220, 210, 200, 185] },
    { d: 315, spacingCm: [290, 285, 275, 265, 255, 250, 240] },
  ],
  source: 'KA-Katalog_GB_06-2025, S. 64',
  figure: 'Figure 10',
};

export const SUPPORT_SPACING_TABLES: Record<SupportSpacingTableId, SupportSpacingTable> = {
  'k-pipe-2.0': K_PIPE_2_0,
  'k-pipe-1.0': K_PIPE_1_0,
  'k-fiber-2.0': K_FIBER_2_0,
  'k-fiber-1.6': K_FIBER_1_6,
};

/* --- Beanstandete Druckwerte ---------------------------------------------
 *
 * Ein Wert im Katalog ist mit hoher Wahrscheinlichkeit ein Satzfehler. Er wird
 * hier so gefuehrt, wie er gedruckt ist — der Katalog ist die maßgebliche
 * Quelle, und stillschweigend zu korrigieren hiesse, eine eigene fuenfte
 * Datenfassung zu erfinden. Zugleich darf ein zu weiter Halterungsabstand
 * nicht unbemerkt in eine Planung wandern. Deshalb: gedruckt gefuehrt,
 * ausdruecklich markiert, und `conservativeSupportSpacingCm()` gibt einen
 * belastbaren Ersatzwert zurueck.
 *
 * Bei K-Aqua rueckzufragen. */
export interface SuspectValue {
  table: SupportSpacingTableId;
  d: number;
  temperatureC: number;
  printed: number;
  reasonDe: string;
  /** Belastbarer Ersatz: der Wert der naechstniedrigeren Temperaturspalte. */
  conservative: number;
}

export const SUSPECT_VALUES: SuspectValue[] = [
  {
    table: 'k-pipe-1.0',
    d: 200,
    temperatureC: 50,
    printed: 245,
    reasonDe:
      'Bei 3,3-facher Vergrößerung eindeutig als 245 gedruckt. Der Wert liegt über dem der 40-°C-Spalte (225) und ist mit dem der 20-°C-Spalte identisch — in jeder anderen Zeile aller vier Tabellen fällt der Abstand mit steigender Temperatur monoton. Vermutlich ein Satzfehler; plausibel wäre 215.',
    conservative: 225,
  },
];

/* Hinweis ohne Beanstandung: In Figure 9 und Figure 10 tragen d125 und d160
 * dieselben Abstaende. Das steht in beiden Tabellen uebereinstimmend so und
 * wird deshalb nicht als Fehler behandelt, sondern als bewusst konservative
 * Angabe des Herstellers uebernommen. */

/** Waehlt die zutreffende Tabelle. K-Fiber-Rohre tragen die Faserlage und
 *  haben eigene Tabellen; die Druckstufe entscheidet ueber die Spaltengruppe. */
export function selectSupportTable(
  isFiber: boolean,
  pressureMpa: number,
): SupportSpacingTable {
  if (isFiber) return pressureMpa >= 2.0 ? K_FIBER_2_0 : K_FIBER_1_6;
  return pressureMpa >= 2.0 ? K_PIPE_2_0 : K_PIPE_1_0;
}

/** Abstand in cm, wie gedruckt. Null, wenn die Kombination im Katalog fehlt —
 *  es wird weder interpoliert noch extrapoliert. */
export function supportSpacingCm(
  table: SupportSpacingTable,
  d: number,
  temperatureC: number,
): number | null {
  const col = table.temperaturesC.indexOf(temperatureC);
  if (col < 0) return null;
  const row = table.rows.find((r) => r.d === d);
  return row?.spacingCm[col] ?? null;
}

/** Wie `supportSpacingCm`, ersetzt aber beanstandete Werte durch den
 *  belastbaren Ersatz. Das ist der Zugang, den Planungsdaten benutzen
 *  sollten — IFC-Merkmale, Datenblatt, technisches Handbuch. */
export function conservativeSupportSpacingCm(
  table: SupportSpacingTable,
  d: number,
  temperatureC: number,
): number | null {
  const suspect = SUSPECT_VALUES.find(
    (s) => s.table === table.id && s.d === d && s.temperatureC === temperatureC,
  );
  if (suspect) return suspect.conservative;
  return supportSpacingCm(table, d, temperatureC);
}
