/* Druckverlust und Fliessgeschwindigkeit in K-Aqua-Rohren und -Formteilen.
 *
 * QUELLE: KA-Katalog_GB_06-2025_NEU.pdf, Abschnitt 4.6 „Pressure loss pipes"
 * und 4.7 „Pressure Loss Fitting":
 *   S. 52 - 53  SDR 6    d20 - d125
 *   S. 54 - 56  SDR 7,4  d20 - d250
 *   S. 57 - 59  SDR 11   d20 - d250
 *   S. 60       Figure 4 — Widerstandsbeiwerte r der Formteile
 *
 * Alle acht Tabellenseiten wurden gerendert und in Baendern bei 3,3-facher
 * Vergroesserung Zeile fuer Zeile abgetippt. Werte genau wie gedruckt.
 *
 * KEINE DIAGRAMME: Im Bereich S. 52 - 60 fuehrt der Katalog ausschliesslich
 * Zahlentabellen, keine Kennlinienblaetter. Es wurde also nichts aus Kurven
 * abgelesen. Figure 4 auf S. 60 ist trotz der Piktogramme eine Tabelle.
 *
 * Die Tabellen gelten fuer die im Kopf jeder Tabelle genannten Stoffwerte —
 * Wasser bei 20 °C. Der Katalog fuehrt keine Umrechnung auf andere
 * Temperaturen, deshalb steht hier auch keine. Wer mit Warmwasser rechnet,
 * braucht eine eigene Berechnung; diese Datei liefert sie nicht.
 *
 * Verwendet fuer `Pset_KAqua_FlowProperties` der erzeugten IFC-Rohrdateien und
 * fuer die Auslegungstabellen im technischen Handbuch. */

/* --- Typen ---------------------------------------------------------------- */

export type PressureLossTableId = 'sdr-6' | 'sdr-7.4' | 'sdr-11';

export interface PipeDimension {
  /** Aussendurchmesser d in mm — Beschriftung der Spalte „Dimension". */
  outerDiameterMm: number;
  /** Wanddicke e in mm — zweite Kopfzeile „Wall thickness". */
  wallThicknessMm: number;
}

/** Stoffwerte aus der Kopfzeile ueber jeder Tabelle. Sie stehen im Katalog nur
 *  einmal je Rohrreihe, nicht je Seite, und gelten fuer alle Folgeseiten. */
export interface FluidConditions {
  temperatureC: number;
  /** Rohrrauheit k. Einheit im Katalog: mm. */
  roughnessMm: number;
  /** Dichte des Wassers. Einheit im Katalog: kg/m³. */
  densityKgPerM3: number;
  /** Kinematische Viskositaet. Einheit im Katalog: m²/s.
   *  Gedruckt als „1.004E-06 m²/s". */
  kinematicViscosityM2PerS: number;
}

/** Eine Tabellenzelle. `null` heisst: der Katalog laesst das Feld leer, fuehrt
 *  diese Kombination aus Volumenstrom und Nennweite also nicht. Kein Wert 0. */
export type Cell = number | null;

export interface PressureLossRow {
  /** Volumenstrom V in l/s — erste Spalte. */
  flowLps: number;
  /** Derselbe Volumenstrom in m³/h — zweite Spalte, ebenfalls gedruckt. */
  flowM3PerH: number;
  /* Zu `r` und `v`: Beide Felder folgen der Spaltenreihenfolge von
   * `dimensions`. Fuehrende und eingeschlossene Leerfelder stehen als `null`;
   * NACHLAUFENDE Leerfelder sind weggelassen, das Feld ist dann kuerzer als
   * `dimensions`. Das haelt die Zeilen lesbar — in diesen Tabellen faellt
   * links die kleine Nennweite weg (Geschwindigkeit zu hoch) und rechts die
   * grosse (Volumenstrom zu klein), und die rechte Seite ist die laengere.
   * `pressureLossAt()` behandelt Fehlstellen und Ueberlaenge gleich. */
  /** Rohrreibungsgefaelle R in mbar/m. */
  r: readonly Cell[];
  /** Fliessgeschwindigkeit v in m/s. */
  v: readonly Cell[];
}

export interface PressureLossTable {
  id: PressureLossTableId;
  /** SDR der Rohrreihe, wie in der Ueberschrift genannt. */
  sdr: number;
  /** SDR-Bezeichnung genau wie gedruckt — der Katalog schreibt „SDR 7,4". */
  sdrLabel: string;
  dimensions: readonly PipeDimension[];
  conditions: FluidConditions;
  rows: readonly PressureLossRow[];
  source: string;
}

/* --- SDR 6, S. 52 - 53 ---------------------------------------------------
 *
 * Einzige der drei Reihen, die bei d125 endet. Der Katalog fuehrt fuer SDR 6
 * keine Nennweiten ueber d125 — nicht ergaenzt, nicht extrapoliert. */
const SDR_6: PressureLossTable = {
  id: 'sdr-6',
  sdr: 6,
  sdrLabel: 'SDR 6',
  dimensions: [
    { outerDiameterMm: 20, wallThicknessMm: 3.4 },
    { outerDiameterMm: 25, wallThicknessMm: 4.2 },
    { outerDiameterMm: 32, wallThicknessMm: 5.4 },
    { outerDiameterMm: 40, wallThicknessMm: 6.7 },
    { outerDiameterMm: 50, wallThicknessMm: 8.3 },
    { outerDiameterMm: 63, wallThicknessMm: 10.5 },
    { outerDiameterMm: 75, wallThicknessMm: 12.5 },
    { outerDiameterMm: 90, wallThicknessMm: 15.0 },
    { outerDiameterMm: 110, wallThicknessMm: 18.3 },
    { outerDiameterMm: 125, wallThicknessMm: 20.8 },
  ],
  conditions: {
    temperatureC: 20,
    roughnessMm: 0.007,
    densityKgPerM3: 998.29,
    kinematicViscosityM2PerS: 1.004e-6,
  },
  rows: [
    // --- S. 52 ---
    { flowLps: 0.01, flowM3PerH: 0.04, r: [0.15, 0.05, 0.02, 0.01], v: [0.07, 0.05, 0.03, 0.02] },
    { flowLps: 0.02, flowM3PerH: 0.07, r: [0.45, 0.16, 0.05, 0.02, 0.01], v: [0.15, 0.09, 0.06, 0.04, 0.02] },
    { flowLps: 0.03, flowM3PerH: 0.11, r: [0.87, 0.3, 0.1, 0.03, 0.01], v: [0.22, 0.14, 0.08, 0.05, 0.03] },
    { flowLps: 0.04, flowM3PerH: 0.14, r: [1.39, 0.48, 0.15, 0.05, 0.02, 0.01], v: [0.29, 0.18, 0.11, 0.07, 0.05, 0.03] },
    { flowLps: 0.05, flowM3PerH: 0.18, r: [2.02, 0.69, 0.22, 0.08, 0.03, 0.01], v: [0.37, 0.23, 0.14, 0.09, 0.06, 0.04] },
    { flowLps: 0.06, flowM3PerH: 0.22, r: [2.74, 0.94, 0.3, 0.1, 0.04, 0.01, 0.01], v: [0.44, 0.28, 0.17, 0.11, 0.07, 0.04, 0.03] },
    { flowLps: 0.07, flowM3PerH: 0.25, r: [3.55, 1.21, 0.39, 0.13, 0.05, 0.02, 0.01], v: [0.51, 0.32, 0.2, 0.13, 0.08, 0.05, 0.04] },
    { flowLps: 0.08, flowM3PerH: 0.29, r: [4.46, 1.51, 0.48, 0.17, 0.06, 0.02, 0.01], v: [0.58, 0.37, 0.23, 0.14, 0.09, 0.06, 0.04] },
    { flowLps: 0.09, flowM3PerH: 0.32, r: [5.45, 1.85, 0.59, 0.2, 0.07, 0.02, 0.01], v: [0.66, 0.42, 0.25, 0.16, 0.1, 0.06, 0.05] },
    { flowLps: 0.1, flowM3PerH: 0.36, r: [6.52, 2.21, 0.7, 0.24, 0.08, 0.03, 0.01, 0.01], v: [0.73, 0.46, 0.28, 0.18, 0.11, 0.07, 0.05, 0.04] },
    { flowLps: 0.12, flowM3PerH: 0.43, r: [8.92, 3.01, 0.95, 0.33, 0.11, 0.04, 0.02, 0.01], v: [0.88, 0.55, 0.34, 0.22, 0.14, 0.09, 0.06, 0.04] },
    { flowLps: 0.14, flowM3PerH: 0.5, r: [11.66, 3.92, 1.23, 0.42, 0.15, 0.05, 0.02, 0.01], v: [1.02, 0.65, 0.4, 0.25, 0.16, 0.1, 0.07, 0.05] },
    { flowLps: 0.16, flowM3PerH: 0.58, r: [14.71, 4.93, 1.55, 0.53, 0.18, 0.06, 0.03, 0.01], v: [1.17, 0.74, 0.45, 0.29, 0.18, 0.12, 0.08, 0.06] },
    { flowLps: 0.18, flowM3PerH: 0.65, r: [18.07, 6.05, 1.89, 0.65, 0.22, 0.08, 0.03, 0.01, 0.01], v: [1.32, 0.83, 0.51, 0.32, 0.21, 0.13, 0.09, 0.06, 0.04] },
    { flowLps: 0.2, flowM3PerH: 0.72, r: [21.75, 7.26, 2.27, 0.78, 0.27, 0.09, 0.04, 0.02, 0.01], v: [1.46, 0.92, 0.57, 0.36, 0.23, 0.14, 0.1, 0.07, 0.05] },
    { flowLps: 0.3, flowM3PerH: 1.08, r: [44.65, 14.77, 4.58, 1.56, 0.53, 0.18, 0.08, 0.03, 0.01, 0.01], v: [2.19, 1.39, 0.85, 0.54, 0.34, 0.22, 0.15, 0.11, 0.07, 0.05] },
    { flowLps: 0.4, flowM3PerH: 1.44, r: [74.89, 24.6, 7.58, 2.56, 0.87, 0.29, 0.13, 0.05, 0.02, 0.01], v: [2.92, 1.85, 1.13, 0.72, 0.46, 0.29, 0.2, 0.14, 0.09, 0.07] },
    { flowLps: 0.5, flowM3PerH: 1.8, r: [112.32, 36.68, 11.24, 3.78, 1.28, 0.43, 0.19, 0.08, 0.03, 0.02], v: [3.65, 2.31, 1.42, 0.9, 0.57, 0.36, 0.25, 0.18, 0.12, 0.09] },
    { flowLps: 0.6, flowM3PerH: 2.16, r: [156.82, 50.97, 15.55, 5.21, 1.76, 0.59, 0.26, 0.11, 0.04, 0.02], v: [4.38, 2.77, 1.7, 1.08, 0.68, 0.43, 0.31, 0.21, 0.14, 0.11] },
    { flowLps: 0.7, flowM3PerH: 2.52, r: [208.34, 67.43, 20.49, 6.85, 2.3, 0.77, 0.34, 0.14, 0.05, 0.03], v: [5.12, 3.23, 1.98, 1.26, 0.8, 0.51, 0.36, 0.25, 0.17, 0.13] },
    { flowLps: 0.8, flowM3PerH: 2.88, r: [266.84, 86.05, 26.05, 8.68, 2.91, 0.97, 0.42, 0.18, 0.07, 0.04], v: [5.85, 3.7, 2.27, 1.44, 0.91, 0.58, 0.41, 0.28, 0.19, 0.15] },
    { flowLps: 0.9, flowM3PerH: 3.24, r: [332.29, 106.8, 32.22, 10.72, 3.58, 1.2, 0.52, 0.22, 0.08, 0.05], v: [6.58, 4.16, 2.55, 1.62, 1.03, 0.65, 0.46, 0.32, 0.21, 0.16] },
    { flowLps: 1.0, flowM3PerH: 3.6, r: [404.65, 129.67, 39.01, 12.94, 4.32, 1.44, 0.63, 0.26, 0.1, 0.06], v: [7.31, 4.62, 2.83, 1.8, 1.14, 0.72, 0.51, 0.35, 0.24, 0.18] },
    { flowLps: 1.1, flowM3PerH: 3.96, r: [483.92, 154.66, 46.4, 15.36, 5.11, 1.7, 0.74, 0.31, 0.12, 0.07], v: [8.04, 5.08, 3.12, 1.98, 1.26, 0.79, 0.56, 0.39, 0.26, 0.2] },
    { flowLps: 1.2, flowM3PerH: 4.32, r: [570.09, 181.75, 54.4, 17.97, 5.97, 1.98, 0.86, 0.36, 0.14, 0.08], v: [8.77, 5.54, 3.4, 2.16, 1.37, 0.87, 0.61, 0.42, 0.28, 0.22] },
    { flowLps: 1.3, flowM3PerH: 4.68, r: [663.13, 210.95, 62.99, 20.77, 6.89, 2.29, 0.99, 0.42, 0.16, 0.09], v: [9.5, 6.01, 3.68, 2.34, 1.48, 0.94, 0.66, 0.46, 0.31, 0.24] },
    { flowLps: 1.4, flowM3PerH: 5.04, r: [763.06, 242.24, 72.18, 23.75, 7.86, 2.61, 1.13, 0.47, 0.18, 0.1], v: [10.23, 6.47, 3.97, 2.52, 1.6, 1.01, 0.71, 0.5, 0.33, 0.26] },
    { flowLps: 1.6, flowM3PerH: 5.76, r: [null, 311.09, 92.33, 30.28, 10.0, 3.31, 1.43, 0.6, 0.23, 0.12], v: [null, 7.39, 4.53, 2.88, 1.83, 1.15, 0.81, 0.57, 0.38, 0.29] },
    { flowLps: 1.8, flowM3PerH: 6.48, r: [null, 388.29, 114.85, 37.56, 12.37, 4.08, 1.76, 0.74, 0.28, 0.15], v: [null, 8.32, 5.1, 3.24, 2.05, 1.3, 0.92, 0.64, 0.43, 0.33] },
    { flowLps: 2.0, flowM3PerH: 7.2, r: [null, 473.81, 139.72, 45.56, 14.97, 4.93, 2.13, 0.89, 0.34, 0.18], v: [null, 9.24, 5.67, 3.6, 2.28, 1.44, 1.02, 0.71, 0.47, 0.37] },
    { flowLps: 2.2, flowM3PerH: 7.92, r: [null, 567.64, 166.93, 54.3, 17.8, 5.85, 2.52, 1.05, 0.4, 0.22], v: [null, 10.17, 6.23, 3.96, 2.51, 1.59, 1.12, 0.78, 0.52, 0.4] },
    { flowLps: 2.4, flowM3PerH: 8.64, r: [null, null, 196.48, 63.77, 20.85, 6.84, 2.94, 1.22, 0.47, 0.25], v: [null, null, 6.8, 4.32, 2.74, 1.73, 1.22, 0.85, 0.57, 0.44] },
    // --- S. 53 ---
    { flowLps: 2.6, flowM3PerH: 9.36, r: [null, null, 228.36, 73.96, 24.14, 7.9, 3.4, 1.41, 0.54, 0.29], v: [null, null, 7.37, 4.68, 2.97, 1.88, 1.32, 0.92, 0.61, 0.48] },
    { flowLps: 2.8, flowM3PerH: 10.08, r: [null, null, 262.57, 84.87, 27.65, 9.04, 3.88, 1.61, 0.61, 0.33], v: [null, null, 7.93, 5.04, 3.2, 2.02, 1.43, 0.99, 0.66, 0.51] },
    { flowLps: 3.0, flowM3PerH: 10.8, r: [null, null, 299.11, 96.51, 31.38, 10.24, 4.39, 1.82, 0.69, 0.38], v: [null, null, 8.5, 5.4, 3.42, 2.17, 1.53, 1.06, 0.71, 0.55] },
    { flowLps: 3.5, flowM3PerH: 12.6, r: [null, null, 400.59, 128.74, 41.7, 13.56, 5.8, 2.4, 0.91, 0.49], v: [null, null, 9.92, 6.3, 3.99, 2.53, 1.78, 1.24, 0.83, 0.64] },
    { flowLps: 4.0, flowM3PerH: 14.4, r: [null, null, 516.57, 165.44, 53.41, 17.31, 7.39, 3.05, 1.15, 0.62], v: [null, null, 11.33, 7.2, 4.57, 2.89, 2.04, 1.41, 0.95, 0.73] },
    { flowLps: 4.5, flowM3PerH: 16.2, r: [null, null, null, 206.6, 66.5, 21.49, 9.16, 3.78, 1.42, 0.77], v: [null, null, null, 8.1, 5.14, 3.25, 2.29, 1.59, 1.06, 0.82] },
    { flowLps: 5.0, flowM3PerH: 18.0, r: [null, null, null, 252.22, 80.96, 26.09, 11.1, 4.57, 1.72, 0.93], v: [null, null, null, 9.0, 5.71, 3.61, 2.55, 1.77, 1.18, 0.92] },
    { flowLps: 5.5, flowM3PerH: 19.8, r: [null, null, null, 302.28, 96.79, 31.12, 13.22, 5.43, 2.04, 1.1], v: [null, null, null, 9.9, 6.28, 3.97, 2.8, 1.95, 1.3, 1.01] },
    { flowLps: 6.0, flowM3PerH: 21.6, r: [null, null, null, 356.78, 113.99, 36.57, 15.51, 6.36, 2.39, 1.29], v: [null, null, null, 10.8, 6.85, 4.33, 3.06, 2.12, 1.42, 1.1] },
    { flowLps: 6.5, flowM3PerH: 23.4, r: [null, null, null, null, 132.56, 42.44, 17.97, 7.36, 2.76, 1.49], v: [null, null, null, null, 7.42, 4.69, 3.31, 2.3, 1.54, 1.19] },
    { flowLps: 7.0, flowM3PerH: 25.2, r: [null, null, null, null, 152.49, 48.73, 20.61, 8.43, 3.16, 1.7], v: [null, null, null, null, 7.99, 5.05, 3.57, 2.48, 1.65, 1.28] },
    { flowLps: 7.5, flowM3PerH: 27.0, r: [null, null, null, null, 173.78, 55.44, 23.42, 9.57, 3.58, 1.93], v: [null, null, null, null, 8.56, 5.41, 3.82, 2.65, 1.77, 1.37] },
    { flowLps: 8.0, flowM3PerH: 28.8, r: [null, null, null, null, 196.43, 62.57, 26.39, 10.77, 4.03, 2.17], v: [null, null, null, null, 9.13, 5.77, 4.07, 2.83, 1.89, 1.46] },
    { flowLps: 8.5, flowM3PerH: 30.6, r: [null, null, null, null, 220.43, 70.11, 29.54, 12.04, 4.5, 2.42], v: [null, null, null, null, 9.7, 6.14, 4.33, 3.01, 2.01, 1.56] },
    { flowLps: 9.0, flowM3PerH: 32.4, r: [null, null, null, null, 245.8, 78.06, 32.86, 13.38, 4.99, 2.68], v: [null, null, null, null, 10.27, 6.5, 4.58, 3.18, 2.13, 1.65] },
    { flowLps: 9.5, flowM3PerH: 34.2, r: [null, null, null, null, null, 86.43, 36.34, 14.79, 5.51, 2.96], v: [null, null, null, null, null, 6.86, 4.84, 3.36, 2.25, 1.74] },
    { flowLps: 10.0, flowM3PerH: 36.0, r: [null, null, null, null, null, 95.22, 40.0, 16.26, 6.05, 3.25], v: [null, null, null, null, null, 7.22, 5.09, 3.54, 2.36, 1.83] },
    { flowLps: 10.5, flowM3PerH: 37.8, r: [null, null, null, null, null, 104.42, 43.82, 17.8, 6.62, 3.55], v: [null, null, null, null, null, 7.58, 5.35, 3.71, 2.48, 1.92] },
    { flowLps: 11.0, flowM3PerH: 39.6, r: [null, null, null, null, null, 114.03, 47.82, 19.4, 7.21, 3.87], v: [null, null, null, null, null, 7.94, 5.6, 3.89, 2.6, 2.01] },
    { flowLps: 11.5, flowM3PerH: 41.4, r: [null, null, null, null, null, 124.06, 51.98, 21.07, 7.83, 4.19], v: [null, null, null, null, null, 8.3, 5.86, 4.07, 2.72, 2.11] },
    { flowLps: 12.0, flowM3PerH: 43.2, r: [null, null, null, null, null, 134.49, 56.31, 22.81, 8.46, 4.53], v: [null, null, null, null, null, 8.66, 6.11, 4.24, 2.84, 2.2] },
    { flowLps: 12.5, flowM3PerH: 45.0, r: [null, null, null, null, null, 145.34, 60.8, 24.61, 9.12, 4.88], v: [null, null, null, null, null, 9.02, 6.37, 4.42, 2.95, 2.29] },
    { flowLps: 13.0, flowM3PerH: 46.8, r: [null, null, null, null, null, 156.61, 65.47, 26.48, 9.81, 5.25], v: [null, null, null, null, null, 9.38, 6.62, 4.6, 3.07, 2.38] },
    { flowLps: 13.5, flowM3PerH: 48.6, r: [null, null, null, null, null, 168.28, 70.3, 28.41, 10.52, 5.62], v: [null, null, null, null, null, 9.74, 6.88, 4.77, 3.19, 2.47] },
    { flowLps: 14.0, flowM3PerH: 50.4, r: [null, null, null, null, null, 180.37, 75.3, 30.41, 11.25, 6.01], v: [null, null, null, null, null, 10.11, 7.13, 4.95, 3.31, 2.56] },
    { flowLps: 14.5, flowM3PerH: 52.2, r: [null, null, null, null, null, null, 80.47, 32.48, 12.0, 6.41], v: [null, null, null, null, null, null, 7.38, 5.13, 3.43, 2.65] },
    { flowLps: 15.0, flowM3PerH: 54.0, r: [null, null, null, null, null, null, 85.8, 34.61, 12.78, 6.83], v: [null, null, null, null, null, null, 7.64, 5.31, 3.54, 2.75] },
    { flowLps: 16.0, flowM3PerH: 57.6, r: [null, null, null, null, null, null, 96.97, 39.06, 14.41, 7.69], v: [null, null, null, null, null, null, 8.15, 5.66, 3.78, 2.93] },
    { flowLps: 17.0, flowM3PerH: 61.2, r: [null, null, null, null, null, null, 108.8, 43.78, 16.13, 8.6], v: [null, null, null, null, null, null, 8.66, 6.01, 4.02, 3.11] },
    { flowLps: 18.0, flowM3PerH: 64.8, r: [null, null, null, null, null, null, 121.31, 48.76, 17.94, 9.56], v: [null, null, null, null, null, null, 9.17, 6.37, 4.25, 3.29] },
    { flowLps: 19.0, flowM3PerH: 68.4, r: [null, null, null, null, null, null, 134.47, 54.0, 19.85, 10.57], v: [null, null, null, null, null, null, 9.68, 6.72, 4.49, 3.48] },
    { flowLps: 20.0, flowM3PerH: 72.0, r: [null, null, null, null, null, null, 148.31, 59.49, 21.84, 11.63], v: [null, null, null, null, null, null, 10.19, 7.07, 4.73, 3.66] },
    { flowLps: 21.0, flowM3PerH: 75.6, r: [null, null, null, null, null, null, null, 65.25, 23.93, 12.73], v: [null, null, null, null, null, null, null, 7.43, 4.96, 3.84] },
    { flowLps: 22.0, flowM3PerH: 79.2, r: [null, null, null, null, null, null, null, 71.27, 26.12, 13.88], v: [null, null, null, null, null, null, null, 7.78, 5.2, 4.03] },
    { flowLps: 23.0, flowM3PerH: 82.8, r: [null, null, null, null, null, null, null, 77.54, 28.39, 15.08], v: [null, null, null, null, null, null, null, 8.13, 5.44, 4.21] },
    { flowLps: 24.0, flowM3PerH: 86.4, r: [null, null, null, null, null, null, null, 84.08, 30.75, 16.33], v: [null, null, null, null, null, null, null, 8.49, 5.67, 4.39] },
    { flowLps: 25.0, flowM3PerH: 90.0, r: [null, null, null, null, null, null, null, 90.87, 33.21, 17.63], v: [null, null, null, null, null, null, null, 8.84, 5.91, 4.58] },
  ],
  source: 'KA-Katalog_GB_06-2025, S. 52-53',
};

/* --- SDR 7,4, S. 54 - 56 -------------------------------------------------
 *
 * Die Wanddicken sind nicht d/SDR, sondern die auf Normmass aufgerundeten
 * Werte — d20 traegt 2,8 mm statt der rechnerischen 2,70 mm. So gedruckt,
 * so uebernommen. */
const SDR_7_4: PressureLossTable = {
  id: 'sdr-7.4',
  sdr: 7.4,
  sdrLabel: 'SDR 7,4',
  dimensions: [
    { outerDiameterMm: 20, wallThicknessMm: 2.8 },
    { outerDiameterMm: 25, wallThicknessMm: 3.5 },
    { outerDiameterMm: 32, wallThicknessMm: 4.4 },
    { outerDiameterMm: 40, wallThicknessMm: 5.5 },
    { outerDiameterMm: 50, wallThicknessMm: 6.9 },
    { outerDiameterMm: 63, wallThicknessMm: 8.6 },
    { outerDiameterMm: 75, wallThicknessMm: 10.3 },
    { outerDiameterMm: 90, wallThicknessMm: 12.3 },
    { outerDiameterMm: 110, wallThicknessMm: 15.1 },
    { outerDiameterMm: 125, wallThicknessMm: 17.1 },
    { outerDiameterMm: 160, wallThicknessMm: 21.6 },
    { outerDiameterMm: 200, wallThicknessMm: 27.4 },
    { outerDiameterMm: 250, wallThicknessMm: 34.2 },
  ],
  conditions: {
    temperatureC: 20,
    roughnessMm: 0.007,
    densityKgPerM3: 998.29,
    kinematicViscosityM2PerS: 1.004e-6,
  },
  rows: [
    // --- S. 54 ---
    { flowLps: 0.01, flowM3PerH: 0.04, r: [0.1, 0.04, 0.01], v: [0.06, 0.04, 0.02] },
    { flowLps: 0.02, flowM3PerH: 0.07, r: [0.3, 0.11, 0.03, 0.01], v: [0.12, 0.08, 0.05, 0.03] },
    { flowLps: 0.03, flowM3PerH: 0.11, r: [0.58, 0.21, 0.06, 0.02], v: [0.18, 0.12, 0.07, 0.05] },
    { flowLps: 0.04, flowM3PerH: 0.14, r: [0.93, 0.33, 0.1, 0.04, 0.01], v: [0.25, 0.16, 0.09, 0.06, 0.04] },
    { flowLps: 0.05, flowM3PerH: 0.18, r: [1.34, 0.47, 0.15, 0.05, 0.02], v: [0.31, 0.2, 0.12, 0.08, 0.05] },
    { flowLps: 0.06, flowM3PerH: 0.22, r: [1.82, 0.64, 0.2, 0.07, 0.03, 0.01], v: [0.37, 0.24, 0.14, 0.09, 0.06, 0.04] },
    { flowLps: 0.07, flowM3PerH: 0.25, r: [2.36, 0.83, 0.25, 0.09, 0.03, 0.01], v: [0.43, 0.28, 0.17, 0.11, 0.07, 0.04] },
    { flowLps: 0.08, flowM3PerH: 0.29, r: [2.96, 1.04, 0.32, 0.11, 0.04, 0.01], v: [0.49, 0.31, 0.19, 0.12, 0.08, 0.05] },
    { flowLps: 0.09, flowM3PerH: 0.32, r: [3.61, 1.26, 0.38, 0.14, 0.05, 0.02], v: [0.55, 0.35, 0.21, 0.14, 0.09, 0.05] },
    { flowLps: 0.1, flowM3PerH: 0.36, r: [4.32, 1.51, 0.46, 0.16, 0.06, 0.02, 0.01], v: [0.61, 0.39, 0.24, 0.15, 0.1, 0.06, 0.04] },
    { flowLps: 0.12, flowM3PerH: 0.43, r: [5.9, 2.05, 0.62, 0.22, 0.08, 0.03, 0.01], v: [0.74, 0.47, 0.28, 0.18, 0.12, 0.07, 0.05] },
    { flowLps: 0.14, flowM3PerH: 0.5, r: [7.7, 2.67, 0.81, 0.28, 0.1, 0.03, 0.02], v: [0.86, 0.55, 0.33, 0.21, 0.14, 0.08, 0.06] },
    { flowLps: 0.16, flowM3PerH: 0.58, r: [9.7, 3.36, 1.01, 0.35, 0.13, 0.04, 0.02], v: [0.98, 0.63, 0.38, 0.24, 0.16, 0.1, 0.07] },
    { flowLps: 0.18, flowM3PerH: 0.65, r: [11.91, 4.11, 1.24, 0.43, 0.15, 0.05, 0.02, 0.01], v: [1.11, 0.71, 0.43, 0.27, 0.17, 0.11, 0.08, 0.05] },
    { flowLps: 0.2, flowM3PerH: 0.72, r: [14.32, 4.94, 1.48, 0.52, 0.18, 0.06, 0.03, 0.01], v: [1.23, 0.79, 0.47, 0.3, 0.19, 0.12, 0.09, 0.06] },
    { flowLps: 0.3, flowM3PerH: 1.08, r: [29.3, 10.01, 2.98, 1.03, 0.36, 0.12, 0.05, 0.02, 0.01], v: [1.84, 1.18, 0.71, 0.45, 0.29, 0.18, 0.13, 0.09, 0.06] },
    { flowLps: 0.4, flowM3PerH: 1.44, r: [49.02, 16.64, 4.92, 1.7, 0.59, 0.2, 0.09, 0.04, 0.01, 0.01], v: [2.46, 1.57, 0.95, 0.61, 0.39, 0.24, 0.17, 0.12, 0.08, 0.06] },
    { flowLps: 0.5, flowM3PerH: 1.8, r: [73.35, 24.77, 7.29, 2.5, 0.87, 0.29, 0.13, 0.05, 0.02, 0.01], v: [3.07, 1.96, 1.18, 0.76, 0.49, 0.3, 0.22, 0.15, 0.1, 0.08] },
    { flowLps: 0.6, flowM3PerH: 2.16, r: [102.21, 34.36, 10.06, 3.45, 1.2, 0.39, 0.17, 0.07, 0.03, 0.02], v: [3.68, 2.36, 1.42, 0.91, 0.58, 0.36, 0.26, 0.18, 0.12, 0.09] },
    { flowLps: 0.7, flowM3PerH: 2.52, r: [135.57, 45.4, 13.24, 4.52, 1.57, 0.51, 0.23, 0.09, 0.04, 0.02, 0.01], v: [4.3, 2.75, 1.66, 1.06, 0.68, 0.42, 0.3, 0.21, 0.14, 0.11, 0.07] },
    { flowLps: 0.8, flowM3PerH: 2.88, r: [173.38, 57.86, 16.82, 5.73, 1.98, 0.64, 0.28, 0.12, 0.05, 0.03, 0.01], v: [4.91, 3.14, 1.89, 1.21, 0.78, 0.49, 0.34, 0.24, 0.16, 0.12, 0.07] },
    { flowLps: 0.9, flowM3PerH: 3.24, r: [215.63, 71.73, 20.78, 7.06, 2.43, 0.79, 0.35, 0.15, 0.06, 0.03, 0.01], v: [5.53, 3.54, 2.13, 1.36, 0.87, 0.55, 0.39, 0.27, 0.18, 0.14, 0.08] },
    { flowLps: 1.0, flowM3PerH: 3.6, r: [262.3, 87.0, 25.14, 8.52, 2.93, 0.95, 0.42, 0.17, 0.07, 0.04, 0.01], v: [6.14, 3.93, 2.37, 1.51, 0.97, 0.61, 0.43, 0.3, 0.2, 0.15, 0.09] },
    { flowLps: 1.1, flowM3PerH: 3.96, r: [313.36, 103.67, 29.87, 10.11, 3.47, 1.12, 0.49, 0.21, 0.08, 0.04, 0.01], v: [6.75, 4.32, 2.6, 1.67, 1.07, 0.67, 0.47, 0.33, 0.22, 0.17, 0.1] },
    { flowLps: 1.2, flowM3PerH: 4.32, r: [368.81, 121.73, 34.99, 11.82, 4.05, 1.31, 0.58, 0.24, 0.09, 0.05, 0.02, 0.01], v: [7.37, 4.72, 2.84, 1.82, 1.17, 0.73, 0.52, 0.36, 0.24, 0.19, 0.11, 0.07] },
    { flowLps: 1.3, flowM3PerH: 4.68, r: [428.65, 141.17, 40.48, 13.65, 4.67, 1.51, 0.66, 0.28, 0.11, 0.06, 0.02, 0.01], v: [7.98, 5.11, 3.08, 1.97, 1.26, 0.79, 0.56, 0.39, 0.26, 0.2, 0.12, 0.08] },
    { flowLps: 1.4, flowM3PerH: 5.04, r: [492.86, 162.0, 46.35, 15.6, 5.33, 1.72, 0.76, 0.31, 0.12, 0.07, 0.02, 0.01], v: [8.6, 5.5, 3.31, 2.12, 1.36, 0.85, 0.6, 0.42, 0.28, 0.22, 0.13, 0.08] },
    { flowLps: 1.6, flowM3PerH: 5.76, r: [634.39, 207.77, 59.21, 19.86, 6.77, 2.18, 0.96, 0.4, 0.15, 0.08, 0.03, 0.01], v: [9.82, 6.29, 3.78, 2.42, 1.55, 0.97, 0.69, 0.48, 0.32, 0.25, 0.15, 0.1] },
    { flowLps: 1.8, flowM3PerH: 6.48, r: [793.36, 259.03, 73.57, 24.61, 8.37, 2.69, 1.18, 0.49, 0.19, 0.1, 0.03, 0.01], v: [11.05, 7.07, 4.26, 2.73, 1.75, 1.09, 0.77, 0.54, 0.36, 0.28, 0.17, 0.11] },
    { flowLps: 2.0, flowM3PerH: 7.2, r: [null, 315.77, 89.4, 29.83, 10.12, 3.24, 1.42, 0.59, 0.23, 0.12, 0.04, 0.01], v: [null, 7.86, 4.73, 3.03, 1.94, 1.21, 0.86, 0.6, 0.4, 0.31, 0.19, 0.12] },
    { flowLps: 2.2, flowM3PerH: 7.92, r: [null, 377.96, 106.7, 35.52, 12.02, 3.85, 1.68, 0.69, 0.27, 0.14, 0.04, 0.02, 0.01], v: [null, 8.65, 5.2, 3.33, 2.14, 1.34, 0.95, 0.65, 0.44, 0.34, 0.21, 0.13, 0.08] },
    { flowLps: 2.4, flowM3PerH: 8.64, r: [null, 445.6, 125.47, 41.67, 14.08, 4.5, 1.96, 0.81, 0.31, 0.17, 0.05, 0.02, 0.01], v: [null, 9.43, 5.68, 3.63, 2.33, 1.46, 1.03, 0.71, 0.48, 0.37, 0.22, 0.14, 0.09] },
    { flowLps: 2.6, flowM3PerH: 9.36, r: [null, 518.69, 145.71, 48.3, 16.29, 5.19, 2.26, 0.93, 0.36, 0.19, 0.06, 0.02, 0.01], v: [null, 10.22, 6.15, 3.94, 2.53, 1.58, 1.12, 0.77, 0.52, 0.4, 0.24, 0.16, 0.1] },
    // --- S. 55 ---
    { flowLps: 2.8, flowM3PerH: 10.08, r: [null, null, 167.4, 55.38, 18.64, 5.93, 2.58, 1.06, 0.41, 0.22, 0.07, 0.02, 0.01], v: [null, null, 6.62, 4.24, 2.72, 1.7, 1.2, 0.83, 0.56, 0.43, 0.26, 0.17, 0.11] },
    { flowLps: 3.0, flowM3PerH: 10.8, r: [null, null, 190.56, 62.93, 21.15, 6.72, 2.92, 1.2, 0.46, 0.25, 0.08, 0.03, 0.01], v: [null, null, 7.1, 4.54, 2.91, 1.82, 1.29, 0.89, 0.6, 0.46, 0.28, 0.18, 0.12] },
    { flowLps: 3.5, flowM3PerH: 12.6, r: [null, null, 254.82, 83.82, 28.07, 8.89, 3.86, 1.58, 0.61, 0.33, 0.1, 0.03, 0.01], v: [null, null, 8.28, 5.3, 3.4, 2.12, 1.51, 1.04, 0.7, 0.54, 0.33, 0.21, 0.14] },
    { flowLps: 4.0, flowM3PerH: 14.4, r: [null, null, 328.14, 107.58, 35.9, 11.33, 4.91, 2.01, 0.77, 0.42, 0.12, 0.04, 0.02], v: [null, null, 9.46, 6.06, 3.89, 2.43, 1.72, 1.19, 0.8, 0.62, 0.37, 0.24, 0.15] },
    { flowLps: 4.5, flowM3PerH: 16.2, r: [null, null, 410.53, 134.19, 44.65, 14.06, 6.07, 2.49, 0.95, 0.51, 0.15, 0.05, 0.02], v: [null, null, 10.65, 6.81, 4.37, 2.73, 1.94, 1.34, 0.9, 0.69, 0.42, 0.27, 0.17] },
    { flowLps: 5.0, flowM3PerH: 18.0, r: [null, null, null, 163.65, 54.32, 17.05, 7.36, 3.01, 1.15, 0.62, 0.18, 0.07, 0.02], v: [null, null, null, 7.57, 4.86, 3.03, 2.15, 1.49, 1.0, 0.77, 0.47, 0.3, 0.19] },
    { flowLps: 5.5, flowM3PerH: 19.8, r: [null, null, null, 195.95, 64.88, 20.32, 8.75, 3.57, 1.36, 0.73, 0.22, 0.08, 0.03], v: [null, null, null, 8.33, 5.34, 3.34, 2.37, 1.64, 1.1, 0.85, 0.51, 0.33, 0.21] },
    { flowLps: 6.0, flowM3PerH: 21.6, r: [null, null, null, 231.09, 76.36, 23.86, 10.26, 4.18, 1.6, 0.86, 0.26, 0.09, 0.03], v: [null, null, null, 9.08, 5.83, 3.64, 2.58, 1.79, 1.2, 0.93, 0.56, 0.36, 0.23] },
    { flowLps: 6.5, flowM3PerH: 23.4, r: [null, null, null, 269.06, 88.73, 27.68, 11.89, 4.84, 1.84, 0.99, 0.29, 0.1, 0.04], v: [null, null, null, 9.84, 6.32, 3.95, 2.8, 1.93, 1.3, 1.0, 0.61, 0.39, 0.25] },
    { flowLps: 7.0, flowM3PerH: 25.2, r: [null, null, null, 309.86, 102.0, 31.76, 13.62, 5.54, 2.11, 1.13, 0.34, 0.12, 0.04], v: [null, null, null, 10.6, 6.8, 4.25, 3.01, 2.08, 1.4, 1.08, 0.65, 0.42, 0.27] },
    { flowLps: 7.5, flowM3PerH: 27.0, r: [null, null, null, null, 116.17, 36.1, 15.47, 6.28, 2.39, 1.28, 0.38, 0.13, 0.05], v: [null, null, null, null, 7.29, 4.55, 3.23, 2.23, 1.5, 1.16, 0.7, 0.45, 0.29] },
    { flowLps: 8.0, flowM3PerH: 28.8, r: [null, null, null, null, 131.24, 40.72, 17.42, 7.07, 2.68, 1.44, 0.43, 0.15, 0.05], v: [null, null, null, null, 7.77, 4.86, 3.44, 2.38, 1.6, 1.24, 0.75, 0.48, 0.31] },
    { flowLps: 8.5, flowM3PerH: 30.6, r: [null, null, null, null, 147.2, 45.6, 19.49, 7.9, 3.0, 1.6, 0.48, 0.17, 0.06], v: [null, null, null, null, 8.26, 5.16, 3.66, 2.53, 1.7, 1.31, 0.79, 0.51, 0.33] },
    { flowLps: 9.0, flowM3PerH: 32.4, r: [null, null, null, null, 164.05, 50.75, 21.67, 8.77, 3.32, 1.78, 0.53, 0.18, 0.06], v: [null, null, null, null, 8.74, 5.46, 3.87, 2.68, 1.8, 1.39, 0.84, 0.54, 0.35] },
    { flowLps: 9.5, flowM3PerH: 34.2, r: [null, null, null, null, 181.8, 56.16, 23.96, 9.69, 3.67, 1.96, 0.58, 0.2, 0.07], v: [null, null, null, null, 9.23, 5.77, 4.09, 2.83, 1.9, 1.47, 0.89, 0.57, 0.37] },
    { flowLps: 10.0, flowM3PerH: 36.0, r: [null, null, null, null, 200.45, 61.84, 26.35, 10.65, 4.03, 2.15, 0.64, 0.22, 0.08], v: [null, null, null, null, 9.72, 6.07, 4.3, 2.98, 2.0, 1.54, 0.93, 0.6, 0.39] },
    { flowLps: 10.5, flowM3PerH: 37.8, r: [null, null, null, null, 219.98, 67.78, 28.86, 11.65, 4.4, 2.35, 0.69, 0.24, 0.08], v: [null, null, null, null, 10.2, 6.37, 4.52, 3.13, 2.1, 1.62, 0.98, 0.63, 0.41] },
    { flowLps: 11.0, flowM3PerH: 39.6, r: [null, null, null, null, null, 73.99, 31.48, 12.7, 4.79, 2.56, 0.76, 0.26, 0.09], v: [null, null, null, null, null, 6.68, 4.73, 3.27, 2.2, 1.7, 1.03, 0.66, 0.42] },
    { flowLps: 11.5, flowM3PerH: 41.4, r: [null, null, null, null, null, 80.46, 34.2, 13.78, 5.2, 2.77, 0.82, 0.29, 0.1], v: [null, null, null, null, null, 6.98, 4.95, 3.42, 2.3, 1.78, 1.07, 0.69, 0.44] },
    { flowLps: 12.0, flowM3PerH: 43.2, r: [null, null, null, null, null, 87.2, 37.04, 14.91, 5.62, 3.0, 0.88, 0.31, 0.11], v: [null, null, null, null, null, 7.28, 5.16, 3.57, 2.4, 1.85, 1.12, 0.72, 0.46] },
    { flowLps: 12.5, flowM3PerH: 45.0, r: [null, null, null, null, null, 94.2, 39.98, 16.09, 6.06, 3.23, 0.95, 0.33, 0.11], v: [null, null, null, null, null, 7.59, 5.38, 3.72, 2.5, 1.93, 1.17, 0.75, 0.48] },
    { flowLps: 13.0, flowM3PerH: 46.8, r: [null, null, null, null, null, 101.46, 43.03, 17.3, 6.51, 3.47, 1.02, 0.36, 0.12], v: [null, null, null, null, null, 7.89, 5.59, 3.87, 2.6, 2.01, 1.21, 0.79, 0.5] },
    { flowLps: 13.5, flowM3PerH: 48.6, r: [null, null, null, null, null, 108.99, 46.19, 18.56, 6.98, 3.71, 1.09, 0.38, 0.13], v: [null, null, null, null, null, 8.19, 5.81, 4.02, 2.7, 2.08, 1.26, 0.82, 0.52] },
    { flowLps: 14.0, flowM3PerH: 50.4, r: [null, null, null, null, null, 116.78, 49.46, 19.86, 7.46, 3.97, 1.17, 0.41, 0.14], v: [null, null, null, null, null, 8.5, 6.02, 4.17, 2.8, 2.16, 1.31, 0.85, 0.54] },
    { flowLps: 14.5, flowM3PerH: 52.2, r: [null, null, null, null, null, 124.83, 52.84, 21.2, 7.96, 4.23, 1.24, 0.43, 0.15], v: [null, null, null, null, null, 8.8, 6.24, 4.32, 2.9, 2.24, 1.35, 0.88, 0.56] },
    { flowLps: 15.0, flowM3PerH: 54.0, r: [null, null, null, null, null, 133.14, 56.33, 22.59, 8.48, 4.5, 1.32, 0.46, 0.16], v: [null, null, null, null, null, 9.1, 6.45, 4.47, 3.0, 2.32, 1.4, 0.91, 0.58] },
    { flowLps: 16.0, flowM3PerH: 57.6, r: [null, null, null, null, null, 150.56, 63.62, 25.48, 9.55, 5.07, 1.49, 0.52, 0.18], v: [null, null, null, null, null, 9.71, 6.88, 4.76, 3.2, 2.47, 1.49, 0.97, 0.62] },
    { flowLps: 17.0, flowM3PerH: 61.2, r: [null, null, null, null, null, 169.03, 71.35, 28.54, 10.69, 5.67, 1.66, 0.58, 0.2], v: [null, null, null, null, null, 10.32, 7.31, 5.06, 3.4, 2.63, 1.59, 1.03, 0.66] },
    { flowLps: 18.0, flowM3PerH: 64.8, r: [null, null, null, null, null, null, 79.51, 31.77, 11.88, 6.3, 1.84, 0.64, 0.22], v: [null, null, null, null, null, null, 7.74, 5.36, 3.6, 2.78, 1.68, 1.09, 0.69] },
    { flowLps: 19.0, flowM3PerH: 68.4, r: [null, null, null, null, null, null, 88.09, 35.16, 13.14, 6.96, 2.03, 0.71, 0.24], v: [null, null, null, null, null, null, 8.17, 5.66, 3.8, 2.93, 1.77, 1.15, 0.73] },
    { flowLps: 20.0, flowM3PerH: 72.0, r: [null, null, null, null, null, null, 97.11, 38.73, 14.45, 7.65, 2.23, 0.78, 0.26], v: [null, null, null, null, null, null, 8.6, 5.95, 4.0, 3.09, 1.87, 1.21, 0.77] },
    { flowLps: 21.0, flowM3PerH: 75.6, r: [null, null, null, null, null, null, 106.56, 42.46, 15.83, 8.38, 2.44, 0.85, 0.29], v: [null, null, null, null, null, null, 9.04, 6.25, 4.2, 3.24, 1.96, 1.27, 0.81] },
    { flowLps: 22.0, flowM3PerH: 79.2, r: [null, null, null, null, null, null, 116.44, 46.35, 17.26, 9.13, 2.66, 0.92, 0.31], v: [null, null, null, null, null, null, 9.47, 6.55, 4.4, 3.4, 2.05, 1.33, 0.85] },
    { flowLps: 23.0, flowM3PerH: 82.8, r: [null, null, null, null, null, null, 126.75, 50.41, 18.76, 9.92, 2.89, 1.0, 0.34], v: [null, null, null, null, null, null, 9.9, 6.85, 4.6, 3.55, 2.15, 1.39, 0.89] },
    { flowLps: 24.0, flowM3PerH: 86.4, r: [null, null, null, null, null, null, 137.49, 54.64, 20.31, 10.73, 3.12, 1.08, 0.37], v: [null, null, null, null, null, null, 10.33, 7.14, 4.8, 3.71, 2.24, 1.45, 0.93] },
    { flowLps: 25.0, flowM3PerH: 90.0, r: [null, null, null, null, null, null, null, 59.03, 21.93, 11.58, 3.36, 1.17, 0.39], v: [null, null, null, null, null, null, null, 7.44, 5.0, 3.86, 2.33, 1.51, 0.97] },
    { flowLps: 26.0, flowM3PerH: 93.6, r: [null, null, null, null, null, null, null, 63.59, 23.6, 12.46, 3.62, 1.25, 0.42], v: [null, null, null, null, null, null, null, 7.74, 5.2, 4.02, 2.43, 1.57, 1.0] },
    // --- S. 56 ---
    { flowLps: 27.0, flowM3PerH: 97.2, r: [null, null, null, null, null, null, null, 68.31, 25.34, 13.37, 3.88, 1.34, 0.45], v: [null, null, null, null, null, null, null, 8.04, 5.4, 4.17, 2.52, 1.63, 1.04] },
    { flowLps: 28.0, flowM3PerH: 100.8, r: [null, null, null, null, null, null, null, 73.2, 27.13, 14.31, 4.15, 1.43, 0.48], v: [null, null, null, null, null, null, null, 8.34, 5.6, 4.32, 2.61, 1.69, 1.08] },
    { flowLps: 29.0, flowM3PerH: 104.4, r: [null, null, null, null, null, null, null, 78.26, 28.98, 15.28, 4.42, 1.53, 0.52], v: [null, null, null, null, null, null, null, 8.63, 5.8, 4.48, 2.71, 1.75, 1.12] },
    { flowLps: 30.0, flowM3PerH: 108.0, r: [null, null, null, null, null, null, null, 83.48, 30.9, 16.28, 4.71, 1.63, 0.55], v: [null, null, null, null, null, null, null, 8.93, 6.0, 4.63, 2.8, 1.81, 1.16] },
    { flowLps: 32.0, flowM3PerH: 115.2, r: [null, null, null, null, null, null, null, 94.42, 34.9, 18.37, 5.31, 1.83, 0.62], v: [null, null, null, null, null, null, null, 9.53, 6.4, 4.94, 2.99, 1.93, 1.24] },
    { flowLps: 34.0, flowM3PerH: 122.4, r: [null, null, null, null, null, null, null, 106.01, 39.14, 20.59, 5.94, 2.05, 0.69], v: [null, null, null, null, null, null, null, 10.12, 6.8, 5.25, 3.17, 2.05, 1.31] },
    { flowLps: 36.0, flowM3PerH: 129.6, r: [null, null, null, null, null, null, null, null, 43.61, 22.93, 6.6, 2.27, 0.76], v: [null, null, null, null, null, null, null, null, 7.2, 5.56, 3.36, 2.17, 1.39] },
    { flowLps: 38.0, flowM3PerH: 136.8, r: [null, null, null, null, null, null, null, null, 48.32, 25.38, 7.3, 2.51, 0.84], v: [null, null, null, null, null, null, null, null, 7.6, 5.87, 3.55, 2.29, 1.47] },
    { flowLps: 40.0, flowM3PerH: 144.0, r: [null, null, null, null, null, null, null, null, 53.27, 27.96, 8.03, 2.76, 0.93], v: [null, null, null, null, null, null, null, null, 8.0, 6.18, 3.73, 2.42, 1.54] },
    { flowLps: 42.0, flowM3PerH: 151.2, r: [null, null, null, null, null, null, null, null, 58.45, 30.67, 8.8, 3.02, 1.01], v: [null, null, null, null, null, null, null, null, 8.4, 6.49, 3.92, 2.54, 1.62] },
    { flowLps: 44.0, flowM3PerH: 158.4, r: [null, null, null, null, null, null, null, null, 63.87, 33.49, 9.6, 3.29, 1.1], v: [null, null, null, null, null, null, null, null, 8.8, 6.8, 4.11, 2.66, 1.7] },
    { flowLps: 46.0, flowM3PerH: 165.6, r: [null, null, null, null, null, null, null, null, 69.53, 36.43, 10.43, 3.57, 1.2], v: [null, null, null, null, null, null, null, null, 9.2, 7.1, 4.29, 2.78, 1.78] },
    { flowLps: 48.0, flowM3PerH: 172.8, r: [null, null, null, null, null, null, null, null, 75.42, 39.5, 11.3, 3.86, 1.29], v: [null, null, null, null, null, null, null, null, 9.6, 7.41, 4.48, 2.9, 1.85] },
    { flowLps: 50.0, flowM3PerH: 180.0, r: [null, null, null, null, null, null, null, null, 81.54, 42.68, 12.19, 4.17, 1.39], v: [null, null, null, null, null, null, null, null, 10.0, 7.72, 4.67, 3.02, 1.93] },
    { flowLps: 52.0, flowM3PerH: 187.2, r: [null, null, null, null, null, null, null, null, null, 45.99, 13.13, 4.48, 1.5], v: [null, null, null, null, null, null, null, null, null, 8.03, 4.85, 3.14, 2.01] },
    { flowLps: 54.0, flowM3PerH: 194.4, r: [null, null, null, null, null, null, null, null, null, 49.41, 14.09, 4.81, 1.61], v: [null, null, null, null, null, null, null, null, null, 8.34, 5.04, 3.26, 2.08] },
    { flowLps: 56.0, flowM3PerH: 201.6, r: [null, null, null, null, null, null, null, null, null, 52.96, 15.09, 5.15, 1.72], v: [null, null, null, null, null, null, null, null, null, 8.65, 5.23, 3.38, 2.16] },
    { flowLps: 58.0, flowM3PerH: 208.8, r: [null, null, null, null, null, null, null, null, null, 56.63, 16.12, 5.49, 1.83], v: [null, null, null, null, null, null, null, null, null, 8.96, 5.41, 3.5, 2.24] },
    { flowLps: 60.0, flowM3PerH: 216.0, r: [null, null, null, null, null, null, null, null, null, 60.41, 17.18, 5.85, 1.95], v: [null, null, null, null, null, null, null, null, null, 9.27, 5.6, 3.62, 2.32] },
    { flowLps: 62.0, flowM3PerH: 223.2, r: [null, null, null, null, null, null, null, null, null, 64.32, 18.28, 6.22, 2.07], v: [null, null, null, null, null, null, null, null, null, 9.57, 5.79, 3.74, 2.39] },
    { flowLps: 64.0, flowM3PerH: 230.4, r: [null, null, null, null, null, null, null, null, null, 68.35, 19.41, 6.6, 2.2], v: [null, null, null, null, null, null, null, null, null, 9.88, 5.97, 3.87, 2.47] },
    { flowLps: 66.0, flowM3PerH: 237.6, r: [null, null, null, null, null, null, null, null, null, 72.5, 20.57, 6.99, 2.33], v: [null, null, null, null, null, null, null, null, null, 10.19, 6.16, 3.99, 2.55] },
    { flowLps: 68.0, flowM3PerH: 244.8, r: [null, null, null, null, null, null, null, null, null, null, 21.77, 7.39, 2.46], v: [null, null, null, null, null, null, null, null, null, null, 6.35, 4.11, 2.63] },
    { flowLps: 70.0, flowM3PerH: 252.0, r: [null, null, null, null, null, null, null, null, null, null, 22.99, 7.81, 2.6], v: [null, null, null, null, null, null, null, null, null, null, 6.53, 4.23, 2.7] },
    { flowLps: 72.0, flowM3PerH: 259.2, r: [null, null, null, null, null, null, null, null, null, null, 24.26, 8.23, 2.73], v: [null, null, null, null, null, null, null, null, null, null, 6.72, 4.35, 2.78] },
    { flowLps: 74.0, flowM3PerH: 266.4, r: [null, null, null, null, null, null, null, null, null, null, 25.55, 8.66, 2.88], v: [null, null, null, null, null, null, null, null, null, null, 6.91, 4.47, 2.86] },
    // 76,00 l/s fehlt im Katalog — siehe FLOW_SEQUENCE_GAPS.
    { flowLps: 78.0, flowM3PerH: 280.8, r: [null, null, null, null, null, null, null, null, null, null, 28.24, 9.56, 3.17], v: [null, null, null, null, null, null, null, null, null, null, 7.28, 4.71, 3.01] },
    { flowLps: 80.0, flowM3PerH: 288.0, r: [null, null, null, null, null, null, null, null, null, null, 29.63, 10.03, 3.33], v: [null, null, null, null, null, null, null, null, null, null, 7.47, 4.83, 3.09] },
    { flowLps: 82.0, flowM3PerH: 295.2, r: [null, null, null, null, null, null, null, null, null, null, 31.05, 10.51, 3.48], v: [null, null, null, null, null, null, null, null, null, null, 7.65, 4.95, 3.17] },
    { flowLps: 84.0, flowM3PerH: 302.4, r: [null, null, null, null, null, null, null, null, null, null, 32.51, 11.0, 3.64], v: [null, null, null, null, null, null, null, null, null, null, 7.84, 5.07, 3.24] },
    { flowLps: 86.0, flowM3PerH: 309.6, r: [null, null, null, null, null, null, null, null, null, null, 34.0, 11.49, 3.81], v: [null, null, null, null, null, null, null, null, null, null, 8.03, 5.19, 3.32] },
    { flowLps: 88.0, flowM3PerH: 316.8, r: [null, null, null, null, null, null, null, null, null, null, 35.52, 12.0, 3.97], v: [null, null, null, null, null, null, null, null, null, null, 8.21, 5.31, 3.4] },
    { flowLps: 90.0, flowM3PerH: 324.0, r: [null, null, null, null, null, null, null, null, null, null, 37.08, 12.52, 4.14], v: [null, null, null, null, null, null, null, null, null, null, 8.4, 5.44, 3.47] },
  ],
  source: 'KA-Katalog_GB_06-2025, S. 54-56',
};

/* --- SDR 11, S. 57 - 59 -------------------------------------------------- */
const SDR_11: PressureLossTable = {
  id: 'sdr-11',
  sdr: 11,
  sdrLabel: 'SDR 11',
  dimensions: [
    { outerDiameterMm: 20, wallThicknessMm: 1.9 },
    { outerDiameterMm: 25, wallThicknessMm: 2.3 },
    { outerDiameterMm: 32, wallThicknessMm: 2.9 },
    { outerDiameterMm: 40, wallThicknessMm: 3.7 },
    { outerDiameterMm: 50, wallThicknessMm: 4.6 },
    { outerDiameterMm: 63, wallThicknessMm: 5.8 },
    { outerDiameterMm: 75, wallThicknessMm: 6.8 },
    { outerDiameterMm: 90, wallThicknessMm: 8.2 },
    { outerDiameterMm: 110, wallThicknessMm: 10.0 },
    { outerDiameterMm: 125, wallThicknessMm: 11.4 },
    { outerDiameterMm: 160, wallThicknessMm: 14.6 },
    { outerDiameterMm: 200, wallThicknessMm: 18.2 },
    { outerDiameterMm: 250, wallThicknessMm: 22.7 },
  ],
  conditions: {
    temperatureC: 20,
    roughnessMm: 0.007,
    densityKgPerM3: 998.29,
    kinematicViscosityM2PerS: 1.004e-6,
  },
  rows: [
    // --- S. 57 ---
    { flowLps: 0.01, flowM3PerH: 0.04, r: [0.06, 0.02, 0.01], v: [0.05, 0.03, 0.02] },
    { flowLps: 0.02, flowM3PerH: 0.07, r: [0.18, 0.06, 0.02, 0.01], v: [0.1, 0.06, 0.04, 0.02] },
    { flowLps: 0.03, flowM3PerH: 0.11, r: [0.34, 0.12, 0.04, 0.01], v: [0.15, 0.09, 0.06, 0.04] },
    { flowLps: 0.04, flowM3PerH: 0.14, r: [0.54, 0.18, 0.06, 0.02, 0.01], v: [0.19, 0.12, 0.07, 0.05, 0.03] },
    { flowLps: 0.05, flowM3PerH: 0.18, r: [0.78, 0.27, 0.08, 0.03, 0.01], v: [0.24, 0.15, 0.09, 0.06, 0.04] },
    { flowLps: 0.06, flowM3PerH: 0.22, r: [1.05, 0.36, 0.11, 0.04, 0.01, 0.01], v: [0.29, 0.18, 0.11, 0.07, 0.05, 0.03] },
    { flowLps: 0.07, flowM3PerH: 0.25, r: [1.36, 0.46, 0.14, 0.05, 0.02, 0.01], v: [0.34, 0.21, 0.13, 0.08, 0.05, 0.03] },
    { flowLps: 0.08, flowM3PerH: 0.29, r: [1.7, 0.58, 0.18, 0.06, 0.02, 0.01], v: [0.39, 0.24, 0.15, 0.1, 0.06, 0.04] },
    { flowLps: 0.09, flowM3PerH: 0.32, r: [2.07, 0.7, 0.22, 0.08, 0.03, 0.01], v: [0.44, 0.28, 0.17, 0.11, 0.07, 0.04] },
    { flowLps: 0.1, flowM3PerH: 0.36, r: [2.48, 0.84, 0.26, 0.09, 0.03, 0.01, 0.01], v: [0.49, 0.31, 0.19, 0.12, 0.08, 0.05, 0.03] },
    { flowLps: 0.12, flowM3PerH: 0.43, r: [3.38, 1.14, 0.35, 0.13, 0.04, 0.02, 0.01], v: [0.58, 0.37, 0.22, 0.14, 0.09, 0.06, 0.04] },
    { flowLps: 0.14, flowM3PerH: 0.5, r: [4.4, 1.48, 0.46, 0.16, 0.06, 0.02, 0.01], v: [0.68, 0.43, 0.26, 0.17, 0.11, 0.07, 0.05] },
    { flowLps: 0.16, flowM3PerH: 0.58, r: [5.54, 1.86, 0.57, 0.2, 0.07, 0.02, 0.01], v: [0.78, 0.49, 0.3, 0.19, 0.12, 0.08, 0.05] },
    { flowLps: 0.18, flowM3PerH: 0.65, r: [6.79, 2.27, 0.7, 0.25, 0.09, 0.03, 0.01, 0.01], v: [0.87, 0.55, 0.33, 0.22, 0.14, 0.09, 0.06, 0.04] },
    { flowLps: 0.2, flowM3PerH: 0.72, r: [8.16, 2.72, 0.83, 0.3, 0.1, 0.04, 0.02, 0.01], v: [0.97, 0.61, 0.37, 0.24, 0.15, 0.1, 0.07, 0.05] },
    { flowLps: 0.3, flowM3PerH: 1.08, r: [16.61, 5.5, 1.67, 0.59, 0.21, 0.07, 0.03, 0.01, 0.01], v: [1.46, 0.92, 0.56, 0.36, 0.23, 0.14, 0.1, 0.07, 0.05] },
    { flowLps: 0.4, flowM3PerH: 1.44, r: [27.68, 9.11, 2.75, 0.97, 0.34, 0.11, 0.05, 0.02, 0.01], v: [1.94, 1.22, 0.74, 0.48, 0.31, 0.19, 0.14, 0.09, 0.06] },
    { flowLps: 0.5, flowM3PerH: 1.8, r: [41.3, 13.53, 4.07, 1.43, 0.49, 0.17, 0.07, 0.03, 0.01, 0.01], v: [2.43, 1.53, 0.93, 0.6, 0.38, 0.24, 0.17, 0.12, 0.08, 0.06] },
    { flowLps: 0.6, flowM3PerH: 2.16, r: [57.42, 18.73, 5.61, 1.97, 0.68, 0.23, 0.1, 0.04, 0.02, 0.01], v: [2.91, 1.84, 1.11, 0.72, 0.46, 0.29, 0.2, 0.14, 0.09, 0.07] },
    { flowLps: 0.7, flowM3PerH: 2.52, r: [75.99, 24.69, 7.37, 2.58, 0.89, 0.3, 0.13, 0.05, 0.02, 0.01], v: [3.4, 2.14, 1.3, 0.84, 0.54, 0.34, 0.24, 0.16, 0.11, 0.09] },
    { flowLps: 0.8, flowM3PerH: 2.88, r: [97.01, 31.41, 9.34, 3.27, 1.12, 0.37, 0.16, 0.07, 0.03, 0.01], v: [3.88, 2.45, 1.48, 0.96, 0.61, 0.39, 0.27, 0.19, 0.13, 0.1] },
    { flowLps: 0.9, flowM3PerH: 3.24, r: [120.44, 38.87, 11.53, 4.02, 1.37, 0.46, 0.2, 0.08, 0.03, 0.02, 0.01], v: [4.37, 2.75, 1.67, 1.08, 0.69, 0.43, 0.3, 0.21, 0.14, 0.11, 0.07] },
    { flowLps: 1.0, flowM3PerH: 3.6, r: [146.28, 47.08, 13.93, 4.85, 1.65, 0.55, 0.24, 0.1, 0.04, 0.02, 0.01], v: [4.85, 3.06, 1.85, 1.2, 0.76, 0.48, 0.34, 0.24, 0.16, 0.12, 0.07] },
    { flowLps: 1.1, flowM3PerH: 3.96, r: [174.52, 56.03, 16.53, 5.74, 1.96, 0.65, 0.28, 0.12, 0.05, 0.02, 0.01], v: [5.34, 3.37, 2.04, 1.32, 0.84, 0.53, 0.37, 0.26, 0.17, 0.13, 0.08] },
    { flowLps: 1.2, flowM3PerH: 4.32, r: [205.14, 65.7, 19.34, 6.71, 2.28, 0.76, 0.32, 0.14, 0.05, 0.03, 0.01], v: [5.82, 3.67, 2.23, 1.44, 0.92, 0.58, 0.41, 0.28, 0.19, 0.15, 0.09] },
    { flowLps: 1.3, flowM3PerH: 4.68, r: [238.15, 76.11, 22.36, 7.74, 2.63, 0.87, 0.37, 0.16, 0.06, 0.03, 0.01], v: [6.31, 3.98, 2.41, 1.56, 0.99, 0.63, 0.44, 0.31, 0.2, 0.16, 0.1] },
    { flowLps: 1.4, flowM3PerH: 5.04, r: [273.54, 87.24, 25.57, 8.84, 3.0, 0.99, 0.42, 0.18, 0.07, 0.04, 0.01], v: [6.79, 4.28, 2.6, 1.68, 1.07, 0.67, 0.47, 0.33, 0.22, 0.17, 0.1] },
    { flowLps: 1.6, flowM3PerH: 5.76, r: [351.43, 111.67, 32.61, 11.25, 3.8, 1.25, 0.54, 0.23, 0.09, 0.05, 0.01], v: [7.76, 4.9, 2.97, 1.92, 1.22, 0.77, 0.54, 0.38, 0.25, 0.2, 0.12] },
    { flowLps: 1.8, flowM3PerH: 6.48, r: [438.78, 138.97, 40.45, 13.91, 4.69, 1.54, 0.66, 0.28, 0.11, 0.06, 0.02, 0.01], v: [8.73, 5.51, 3.34, 2.16, 1.38, 0.87, 0.61, 0.42, 0.28, 0.22, 0.13, 0.09] },
    { flowLps: 2.0, flowM3PerH: 7.2, r: [535.58, 169.14, 49.09, 16.84, 5.67, 1.86, 0.79, 0.33, 0.13, 0.07, 0.02, 0.01], v: [9.7, 6.12, 3.71, 2.4, 1.53, 0.96, 0.68, 0.47, 0.31, 0.24, 0.15, 0.1] },
    { flowLps: 2.2, flowM3PerH: 7.92, r: [641.81, 202.17, 58.51, 20.03, 6.73, 2.21, 0.94, 0.39, 0.15, 0.08, 0.03, 0.01], v: [10.67, 6.73, 4.08, 2.64, 1.68, 1.06, 0.74, 0.52, 0.35, 0.27, 0.16, 0.1] },
    { flowLps: 2.4, flowM3PerH: 8.64, r: [null, 238.06, 68.72, 23.48, 7.87, 2.58, 1.1, 0.46, 0.18, 0.1, 0.03, 0.01], v: [null, 7.34, 4.45, 2.88, 1.84, 1.16, 0.81, 0.56, 0.38, 0.29, 0.18, 0.11] },
    { flowLps: 2.6, flowM3PerH: 9.36, r: [null, 276.78, 79.71, 27.18, 9.1, 2.97, 1.26, 0.53, 0.2, 0.11, 0.03, 0.01], v: [null, 7.95, 4.82, 3.11, 1.99, 1.25, 0.88, 0.61, 0.41, 0.32, 0.19, 0.12] },
    // --- S. 58 ---
    { flowLps: 2.8, flowM3PerH: 10.08, r: [null, 318.35, 91.49, 31.14, 10.4, 3.4, 1.44, 0.6, 0.23, 0.13, 0.04, 0.01], v: [null, 8.57, 5.19, 3.35, 2.14, 1.35, 0.95, 0.66, 0.44, 0.34, 0.21, 0.13] },
    { flowLps: 3.0, flowM3PerH: 10.8, r: [null, 362.76, 104.04, 35.35, 11.79, 3.84, 1.63, 0.68, 0.26, 0.14, 0.04, 0.02, 0.01], v: [null, 9.18, 5.56, 3.59, 2.29, 1.45, 1.01, 0.71, 0.47, 0.37, 0.22, 0.14, 0.09] },
    { flowLps: 3.5, flowM3PerH: 12.6, r: [null, 486.16, 138.82, 47.0, 15.62, 5.07, 2.15, 0.9, 0.34, 0.19, 0.06, 0.02, 0.01], v: [null, 10.71, 6.49, 4.19, 2.68, 1.69, 1.18, 0.82, 0.55, 0.43, 0.26, 0.17, 0.11] },
    { flowLps: 4.0, flowM3PerH: 14.4, r: [null, null, 178.44, 60.21, 19.95, 6.46, 2.73, 1.14, 0.43, 0.24, 0.07, 0.03, 0.01], v: [null, null, 7.42, 4.79, 3.06, 1.93, 1.35, 0.94, 0.63, 0.49, 0.3, 0.19, 0.12] },
    { flowLps: 4.5, flowM3PerH: 16.2, r: [null, null, 222.89, 74.99, 24.77, 8.01, 3.38, 1.41, 0.53, 0.29, 0.09, 0.03, 0.01], v: [null, null, 8.35, 5.39, 3.44, 2.17, 1.52, 1.06, 0.71, 0.55, 0.33, 0.21, 0.14] },
    { flowLps: 5.0, flowM3PerH: 18.0, r: [null, null, 272.15, 91.32, 30.09, 9.7, 4.08, 1.7, 0.64, 0.35, 0.11, 0.04, 0.01], v: [null, null, 9.27, 5.99, 3.82, 2.41, 1.69, 1.18, 0.79, 0.61, 0.37, 0.24, 0.15] },
    { flowLps: 5.5, flowM3PerH: 19.8, r: [null, null, 326.21, 109.21, 35.9, 11.55, 4.85, 2.02, 0.76, 0.41, 0.13, 0.04, 0.02], v: [null, null, 10.2, 6.59, 4.21, 2.65, 1.86, 1.29, 0.86, 0.67, 0.41, 0.26, 0.17] },
    { flowLps: 6.0, flowM3PerH: 21.6, r: [null, null, null, 128.65, 42.2, 13.55, 5.69, 2.36, 0.89, 0.48, 0.15, 0.05, 0.02], v: [null, null, null, 7.19, 4.59, 2.89, 2.03, 1.41, 0.94, 0.73, 0.45, 0.29, 0.18] },
    { flowLps: 6.5, flowM3PerH: 23.4, r: [null, null, null, 149.64, 48.99, 15.7, 6.58, 2.73, 1.03, 0.56, 0.17, 0.06, 0.02], v: [null, null, null, 7.79, 4.97, 3.13, 2.2, 1.53, 1.02, 0.79, 0.48, 0.31, 0.2] },
    { flowLps: 7.0, flowM3PerH: 25.2, r: [null, null, null, 172.17, 56.26, 17.99, 7.53, 3.12, 1.18, 0.64, 0.2, 0.07, 0.02], v: [null, null, null, 8.39, 5.35, 3.37, 2.36, 1.65, 1.1, 0.85, 0.52, 0.33, 0.21] },
    { flowLps: 7.5, flowM3PerH: 27.0, r: [null, null, null, 196.24, 64.02, 20.44, 8.55, 3.53, 1.33, 0.72, 0.22, 0.08, 0.03], v: [null, null, null, 8.99, 5.74, 3.61, 2.53, 1.76, 1.18, 0.91, 0.56, 0.36, 0.23] },
    { flowLps: 8.0, flowM3PerH: 28.8, r: [null, null, null, 221.85, 72.27, 23.03, 9.62, 3.97, 1.5, 0.81, 0.25, 0.08, 0.03], v: [null, null, null, 9.58, 6.12, 3.86, 2.7, 1.88, 1.26, 0.98, 0.6, 0.38, 0.24] },
    { flowLps: 8.5, flowM3PerH: 30.6, r: [null, null, null, 249.01, 80.99, 25.78, 10.76, 4.44, 1.67, 0.9, 0.28, 0.09, 0.03], v: [null, null, null, 10.18, 6.5, 4.1, 2.87, 2.0, 1.34, 1.04, 0.63, 0.4, 0.26] },
    { flowLps: 9.0, flowM3PerH: 32.4, r: [null, null, null, null, 90.2, 28.67, 11.95, 4.93, 1.85, 1.0, 0.31, 0.1, 0.04], v: [null, null, null, null, 6.88, 4.34, 3.04, 2.12, 1.41, 1.1, 0.67, 0.43, 0.27] },
    { flowLps: 9.5, flowM3PerH: 34.2, r: [null, null, null, null, 99.89, 31.7, 13.2, 5.44, 2.04, 1.1, 0.34, 0.11, 0.04], v: [null, null, null, null, 7.27, 4.58, 3.21, 2.23, 1.49, 1.16, 0.71, 0.45, 0.29] },
    { flowLps: 10.0, flowM3PerH: 36.0, r: [null, null, null, null, 110.06, 34.89, 14.52, 5.97, 2.24, 1.21, 0.37, 0.13, 0.04], v: [null, null, null, null, 7.65, 4.82, 3.38, 2.35, 1.57, 1.22, 0.74, 0.48, 0.3] },
    { flowLps: 10.5, flowM3PerH: 37.8, r: [null, null, null, null, 120.71, 38.22, 15.89, 6.53, 2.45, 1.32, 0.4, 0.14, 0.05], v: [null, null, null, null, 8.03, 5.06, 3.55, 2.47, 1.65, 1.28, 0.78, 0.5, 0.32] },
    { flowLps: 11.0, flowM3PerH: 39.6, r: [null, null, null, null, 131.84, 41.69, 17.32, 7.12, 2.67, 1.44, 0.44, 0.15, 0.05], v: [null, null, null, null, 8.41, 5.3, 3.72, 2.59, 1.73, 1.34, 0.82, 0.52, 0.33] },
    { flowLps: 11.5, flowM3PerH: 41.4, r: [null, null, null, null, 143.45, 45.32, 18.81, 7.72, 2.89, 1.56, 0.47, 0.16, 0.06], v: [null, null, null, null, 8.8, 5.54, 3.88, 2.7, 1.81, 1.4, 0.86, 0.55, 0.35] },
    { flowLps: 12.0, flowM3PerH: 43.2, r: [null, null, null, null, 155.54, 49.08, 20.36, 8.35, 3.13, 1.69, 0.51, 0.17, 0.06], v: [null, null, null, null, 9.18, 5.78, 4.05, 2.82, 1.89, 1.46, 0.89, 0.57, 0.36] },
    { flowLps: 12.5, flowM3PerH: 45.0, r: [null, null, null, null, 168.11, 53.0, 21.96, 9.0, 3.37, 1.82, 0.55, 0.19, 0.06], v: [null, null, null, null, 9.56, 6.02, 4.22, 2.94, 1.96, 1.52, 0.93, 0.59, 0.38] },
    { flowLps: 13.0, flowM3PerH: 46.8, r: [null, null, null, null, 181.16, 57.06, 23.63, 9.68, 3.62, 1.95, 0.59, 0.2, 0.07], v: [null, null, null, null, 9.94, 6.27, 4.39, 3.06, 2.04, 1.58, 0.97, 0.62, 0.4] },
    { flowLps: 13.5, flowM3PerH: 48.6, r: [null, null, null, null, 194.69, 61.26, 25.35, 10.38, 3.88, 2.09, 0.63, 0.22, 0.07], v: [null, null, null, null, 10.33, 6.51, 4.56, 3.17, 2.12, 1.65, 1.0, 0.64, 0.41] },
    { flowLps: 14.0, flowM3PerH: 50.4, r: [null, null, null, null, null, 65.61, 27.13, 11.1, 4.14, 2.23, 0.68, 0.23, 0.08], v: [null, null, null, null, null, 6.75, 4.73, 3.29, 2.2, 1.71, 1.04, 0.67, 0.43] },
    { flowLps: 14.5, flowM3PerH: 52.2, r: [null, null, null, null, null, 70.1, 28.97, 11.84, 4.42, 2.38, 0.72, 0.24, 0.08], v: [null, null, null, null, null, 6.99, 4.9, 3.41, 2.28, 1.77, 1.08, 0.69, 0.44] },
    { flowLps: 15.0, flowM3PerH: 54.0, r: [null, null, null, null, null, 74.74, 30.87, 12.61, 4.7, 2.53, 0.76, 0.26, 0.09], v: [null, null, null, null, null, 7.23, 5.07, 3.53, 2.36, 1.83, 1.12, 0.71, 0.46] },
    { flowLps: 16.0, flowM3PerH: 57.6, r: [null, null, null, null, null, 84.46, 34.84, 14.22, 5.3, 2.85, 0.86, 0.29, 0.1], v: [null, null, null, null, null, 7.71, 5.4, 3.76, 2.52, 1.95, 1.19, 0.76, 0.49] },
    { flowLps: 17.0, flowM3PerH: 61.2, r: [null, null, null, null, null, 94.75, 39.04, 15.91, 5.92, 3.18, 0.96, 0.33, 0.11], v: [null, null, null, null, null, 8.19, 5.74, 4.0, 2.67, 2.07, 1.27, 0.81, 0.52] },
    { flowLps: 18.0, flowM3PerH: 64.8, r: [null, null, null, null, null, 105.62, 43.47, 17.7, 6.58, 3.53, 1.06, 0.36, 0.12], v: [null, null, null, null, null, 8.67, 6.08, 4.23, 2.83, 2.19, 1.34, 0.86, 0.55] },
    { flowLps: 19.0, flowM3PerH: 68.4, r: [null, null, null, null, null, 117.06, 48.13, 19.58, 7.27, 3.9, 1.17, 0.4, 0.14], v: [null, null, null, null, null, 9.16, 6.42, 4.47, 2.99, 2.32, 1.41, 0.9, 0.58] },
    { flowLps: 20.0, flowM3PerH: 72.0, r: [null, null, null, null, null, 129.09, 53.03, 21.55, 7.99, 4.29, 1.29, 0.44, 0.15], v: [null, null, null, null, null, 9.64, 6.75, 4.7, 3.14, 2.44, 1.49, 0.95, 0.61] },
    { flowLps: 21.0, flowM3PerH: 75.6, r: [null, null, null, null, null, 141.69, 58.15, 23.61, 8.75, 4.69, 1.41, 0.48, 0.16], v: [null, null, null, null, null, 10.12, 7.09, 4.94, 3.3, 2.56, 1.56, 1.0, 0.64] },
    { flowLps: 22.0, flowM3PerH: 79.2, r: [null, null, null, null, null, null, 63.51, 25.77, 9.54, 5.11, 1.53, 0.52, 0.18], v: [null, null, null, null, null, null, 7.43, 5.17, 3.46, 2.68, 1.64, 1.05, 0.67] },
    { flowLps: 23.0, flowM3PerH: 82.8, r: [null, null, null, null, null, null, 69.09, 28.01, 10.36, 5.55, 1.66, 0.56, 0.19], v: [null, null, null, null, null, null, 7.77, 5.41, 3.62, 2.8, 1.71, 1.09, 0.7] },
    { flowLps: 24.0, flowM3PerH: 86.4, r: [null, null, null, null, null, null, 74.9, 30.34, 11.21, 6.0, 1.8, 0.61, 0.21], v: [null, null, null, null, null, null, 8.11, 5.64, 3.77, 2.93, 1.79, 1.14, 0.73] },
    { flowLps: 25.0, flowM3PerH: 90.0, r: [null, null, null, null, null, null, 80.95, 32.76, 12.1, 6.47, 1.94, 0.65, 0.22], v: [null, null, null, null, null, null, 8.44, 5.88, 3.93, 3.05, 1.86, 1.19, 0.76] },
    { flowLps: 26.0, flowM3PerH: 93.6, r: [null, null, null, null, null, null, 87.22, 35.28, 13.02, 6.96, 2.08, 0.7, 0.24], v: [null, null, null, null, null, null, 8.78, 6.11, 4.09, 3.17, 1.93, 1.24, 0.79] },
    // --- S. 59 ---
    { flowLps: 27.0, flowM3PerH: 97.2, r: [null, null, null, null, null, null, 93.72, 37.88, 13.97, 7.46, 2.23, 0.75, 0.25], v: [null, null, null, null, null, null, 9.12, 6.35, 4.24, 3.29, 2.01, 1.28, 0.82] },
    { flowLps: 28.0, flowM3PerH: 100.8, r: [null, null, null, null, null, null, 100.46, 40.57, 14.95, 7.99, 2.38, 0.8, 0.27], v: [null, null, null, null, null, null, 9.46, 6.58, 4.4, 3.41, 2.08, 1.33, 0.85] },
    { flowLps: 29.0, flowM3PerH: 104.4, r: [null, null, null, null, null, null, 107.42, 43.36, 15.96, 8.52, 2.54, 0.86, 0.29], v: [null, null, null, null, null, null, 9.79, 6.82, 4.56, 3.54, 2.16, 1.38, 0.88] },
    { flowLps: 30.0, flowM3PerH: 108.0, r: [null, null, null, null, null, null, 114.61, 46.23, 17.01, 9.08, 2.71, 0.91, 0.31], v: [null, null, null, null, null, null, 10.13, 7.05, 4.72, 3.66, 2.23, 1.43, 0.91] },
    { flowLps: 32.0, flowM3PerH: 115.2, r: [null, null, null, null, null, null, null, 52.25, 19.2, 10.24, 3.05, 1.02, 0.35], v: [null, null, null, null, null, null, null, 7.52, 5.03, 3.9, 2.38, 1.52, 0.97] },
    { flowLps: 34.0, flowM3PerH: 122.4, r: [null, null, null, null, null, null, null, 58.62, 21.51, 11.46, 3.41, 1.14, 0.39], v: [null, null, null, null, null, null, null, 7.99, 5.34, 4.14, 2.53, 1.62, 1.03] },
    { flowLps: 36.0, flowM3PerH: 129.6, r: [null, null, null, null, null, null, null, 65.36, 23.96, 12.76, 3.79, 1.27, 0.43], v: [null, null, null, null, null, null, null, 8.46, 5.66, 4.39, 2.68, 1.71, 1.09] },
    { flowLps: 38.0, flowM3PerH: 136.8, r: [null, null, null, null, null, null, null, 72.45, 26.53, 14.12, 4.19, 1.4, 0.47], v: [null, null, null, null, null, null, null, 8.93, 5.97, 4.63, 2.83, 1.81, 1.16] },
    { flowLps: 40.0, flowM3PerH: 144.0, r: [null, null, null, null, null, null, null, 79.9, 29.22, 15.54, 4.6, 1.54, 0.52], v: [null, null, null, null, null, null, null, 9.4, 6.29, 4.88, 2.98, 1.9, 1.22] },
    { flowLps: 42.0, flowM3PerH: 151.2, r: [null, null, null, null, null, null, null, 87.71, 32.05, 17.03, 5.04, 1.68, 0.57], v: [null, null, null, null, null, null, null, 9.87, 6.6, 5.12, 3.13, 2.0, 1.28] },
    { flowLps: 44.0, flowM3PerH: 158.4, r: [null, null, null, null, null, null, null, 95.87, 35.0, 18.59, 5.49, 1.84, 0.62], v: [null, null, null, null, null, null, null, 10.34, 6.92, 5.36, 3.27, 2.09, 1.34] },
    { flowLps: 46.0, flowM3PerH: 165.6, r: [null, null, null, null, null, null, null, null, 38.08, 20.21, 5.97, 1.99, 0.67], v: [null, null, null, null, null, null, null, null, 7.23, 5.61, 3.42, 2.19, 1.4] },
    { flowLps: 48.0, flowM3PerH: 172.8, r: [null, null, null, null, null, null, null, null, 41.28, 21.9, 6.46, 2.15, 0.72], v: [null, null, null, null, null, null, null, null, 7.55, 5.85, 3.57, 2.28, 1.46] },
    { flowLps: 50.0, flowM3PerH: 180.0, r: [null, null, null, null, null, null, null, null, 44.61, 23.66, 6.97, 2.32, 0.78], v: [null, null, null, null, null, null, null, null, 7.86, 6.1, 3.72, 2.38, 1.52] },
    { flowLps: 52.0, flowM3PerH: 187.2, r: [null, null, null, null, null, null, null, null, 48.07, 25.48, 7.5, 2.5, 0.84], v: [null, null, null, null, null, null, null, null, 8.17, 6.34, 3.87, 2.47, 1.58] },
    { flowLps: 54.0, flowM3PerH: 194.4, r: [null, null, null, null, null, null, null, null, 51.65, 27.37, 8.05, 2.68, 0.9], v: [null, null, null, null, null, null, null, null, 8.49, 6.58, 4.02, 2.57, 1.64] },
    { flowLps: 56.0, flowM3PerH: 201.6, r: [null, null, null, null, null, null, null, null, 55.36, 29.32, 8.61, 2.86, 0.96], v: [null, null, null, null, null, null, null, null, 8.8, 6.83, 4.17, 2.66, 1.7] },
    { flowLps: 58.0, flowM3PerH: 208.8, r: [null, null, null, null, null, null, null, null, 59.2, 31.34, 9.2, 3.06, 1.02], v: [null, null, null, null, null, null, null, null, 9.12, 7.07, 4.32, 2.76, 1.76] },
    { flowLps: 60.0, flowM3PerH: 216.0, r: [null, null, null, null, null, null, null, null, 63.16, 33.42, 9.8, 3.25, 1.09], v: [null, null, null, null, null, null, null, null, 9.43, 7.31, 4.47, 2.85, 1.82] },
    { flowLps: 62.0, flowM3PerH: 223.2, r: [null, null, null, null, null, null, null, null, 67.24, 35.57, 10.42, 3.46, 1.16], v: [null, null, null, null, null, null, null, null, 9.75, 7.56, 4.61, 2.95, 1.89] },
    { flowLps: 64.0, flowM3PerH: 230.4, r: [null, null, null, null, null, null, null, null, 71.46, 37.78, 11.06, 3.67, 1.23], v: [null, null, null, null, null, null, null, null, 10.06, 7.8, 4.76, 3.04, 1.95] },
    { flowLps: 66.0, flowM3PerH: 237.6, r: [null, null, null, null, null, null, null, null, null, 40.06, 11.72, 3.88, 1.3], v: [null, null, null, null, null, null, null, null, null, 8.05, 4.91, 3.14, 2.01] },
    { flowLps: 68.0, flowM3PerH: 244.8, r: [null, null, null, null, null, null, null, null, null, 42.4, 12.4, 4.11, 1.37], v: [null, null, null, null, null, null, null, null, null, 8.29, 5.06, 3.23, 2.07] },
    { flowLps: 70.0, flowM3PerH: 252.0, r: [null, null, null, null, null, null, null, null, null, 44.81, 13.1, 4.33, 1.45], v: [null, null, null, null, null, null, null, null, null, 8.53, 5.21, 3.33, 2.13] },
    { flowLps: 75.0, flowM3PerH: 270.0, r: [null, null, null, null, null, null, null, null, null, 51.12, 14.91, 4.93, 1.64], v: [null, null, null, null, null, null, null, null, null, 9.14, 5.58, 3.57, 2.28] },
    { flowLps: 80.0, flowM3PerH: 288.0, r: [null, null, null, null, null, null, null, null, null, 57.84, 16.85, 5.56, 1.85], v: [null, null, null, null, null, null, null, null, null, 9.75, 5.95, 3.81, 2.43] },
    { flowLps: 85.0, flowM3PerH: 306.0, r: [null, null, null, null, null, null, null, null, null, 64.96, 18.9, 6.23, 2.07], v: [null, null, null, null, null, null, null, null, null, 10.36, 6.33, 4.04, 2.59] },
    { flowLps: 90.0, flowM3PerH: 324.0, r: [null, null, null, null, null, null, null, null, null, null, 21.06, 6.93, 2.3], v: [null, null, null, null, null, null, null, null, null, null, 6.7, 4.28, 2.74] },
    { flowLps: 95.0, flowM3PerH: 342.0, r: [null, null, null, null, null, null, null, null, null, null, 23.33, 7.67, 2.55], v: [null, null, null, null, null, null, null, null, null, null, 7.07, 4.52, 2.89] },
    { flowLps: 100.0, flowM3PerH: 360.0, r: [null, null, null, null, null, null, null, null, null, null, 25.72, 8.45, 2.8], v: [null, null, null, null, null, null, null, null, null, null, 7.44, 4.76, 3.04] },
    // d250: R und v tragen hier beide 3.35. Bei 4-facher Vergroesserung geprueft,
    // beide Nachbarzeilen fuegen sich stetig ein — Zufall, kein Satzfehler.
    { flowLps: 110.0, flowM3PerH: 396.0, r: [null, null, null, null, null, null, null, null, null, null, 30.85, 10.11, 3.35], v: [null, null, null, null, null, null, null, null, null, null, 8.19, 5.23, 3.35] },
    { flowLps: 120.0, flowM3PerH: 432.0, r: [null, null, null, null, null, null, null, null, null, null, 36.42, 11.92, 3.94], v: [null, null, null, null, null, null, null, null, null, null, 8.93, 5.71, 3.65] },
    { flowLps: 130.0, flowM3PerH: 468.0, r: [null, null, null, null, null, null, null, null, null, null, 42.45, 13.87, 4.58], v: [null, null, null, null, null, null, null, null, null, null, 9.67, 6.18, 3.95] },
    { flowLps: 140.0, flowM3PerH: 504.0, r: [null, null, null, null, null, null, null, null, null, null, 48.94, 15.96, 5.26], v: [null, null, null, null, null, null, null, null, null, null, 10.42, 6.66, 4.26] },
    { flowLps: 150.0, flowM3PerH: 540.0, r: [null, null, null, null, null, null, null, null, null, null, 55.87, 18.2, 5.99], v: [null, null, null, null, null, null, null, null, null, null, 11.16, 7.14, 4.56] },
    { flowLps: 160.0, flowM3PerH: 576.0, r: [null, null, null, null, null, null, null, null, null, null, 63.26, 20.58, 6.76], v: [null, null, null, null, null, null, null, null, null, null, 11.91, 7.61, 4.87] },
    { flowLps: 170.0, flowM3PerH: 612.0, r: [null, null, null, null, null, null, null, null, null, null, 71.1, 23.1, 7.58], v: [null, null, null, null, null, null, null, null, null, null, 12.65, 8.09, 5.17] },
  ],
  source: 'KA-Katalog_GB_06-2025, S. 57-59',
};

export const PRESSURE_LOSS_TABLES: Record<PressureLossTableId, PressureLossTable> = {
  'sdr-6': SDR_6,
  'sdr-7.4': SDR_7_4,
  'sdr-11': SDR_11,
};

/* --- Luecken in der Volumenstromfolge -------------------------------------
 *
 * Die Volumenstromspalte laeuft in erkennbaren Schrittweiten. An einer Stelle
 * fehlt ein Schritt. Nicht ergaenzt — der Katalog fuehrt die Zeile nicht, und
 * eine erfundene Zeile waere eine Interpolation. Hier nur festgehalten, damit
 * niemand die Luecke fuer einen Uebertragungsfehler haelt.
 *
 * Bei K-Aqua rueckzufragen. */
export interface FlowSequenceGap {
  table: PressureLossTableId;
  /** Fehlender Volumenstrom in l/s, gemessen an der Schrittweite ringsum. */
  missingFlowLps: number;
  /** Die im Katalog benachbarten Zeilen. */
  betweenLps: readonly [number, number];
  stepLps: number;
  noteDe: string;
}

export const FLOW_SEQUENCE_GAPS: readonly FlowSequenceGap[] = [
  {
    table: 'sdr-7.4',
    missingFlowLps: 76.0,
    betweenLps: [74.0, 78.0],
    stepLps: 2.0,
    noteDe:
      'Ab 36,00 l/s zaehlt die Tabelle durchgehend in Schritten von 2,00 l/s, bis 90,00 l/s die letzte Zeile bildet. Genau ein Schritt fehlt: auf 74,00 folgt unmittelbar 78,00. Bei 3,3-facher Vergroesserung ist der Zeilenwechsel eindeutig, die Zeile 76,00 l/s ist nicht gedruckt. Vermutlich beim Satz ausgefallen. Ein Vergleich mit SDR 11 hilft nicht: jene Tabelle geht nach 70,00 l/s auf Schritte von 5,00 l/s ueber und fuehrt weder 74,00 noch 78,00.',
  },
];

/* --- Zugriff auf die Rohrtabellen ----------------------------------------- */

export function getPressureLossTable(id: PressureLossTableId): PressureLossTable {
  return PRESSURE_LOSS_TABLES[id];
}

/** Waehlt die Tabelle zur Rohrreihe. Null, wenn der Katalog fuer diesen SDR
 *  keine Druckverlusttabelle fuehrt — etwa SDR 9 oder SDR 17, die es als
 *  Rohrsortiment gibt, aber nicht in Abschnitt 4.6. */
export function selectPressureLossTable(sdr: number): PressureLossTable | null {
  if (sdr === 6) return SDR_6;
  if (sdr === 7.4) return SDR_7_4;
  if (sdr === 11) return SDR_11;
  return null;
}

/** Spaltenindex des Aussendurchmessers, oder -1. */
export function dimensionIndex(table: PressureLossTable, outerDiameterMm: number): number {
  return table.dimensions.findIndex((d) => d.outerDiameterMm === outerDiameterMm);
}

export interface PressureLossPoint {
  /** Rohrreibungsgefaelle in mbar/m. */
  rMbarPerM: number;
  /** Fliessgeschwindigkeit in m/s. */
  vMPerS: number;
}

/** Wert wie gedruckt. Null, wenn der Katalog die Kombination nicht fuehrt —
 *  weder der Volumenstrom, noch die Nennweite, noch das einzelne Feld. Es wird
 *  weder interpoliert noch extrapoliert.
 *
 *  Die Kuerzung nachlaufender Leerfelder wird hier aufgeloest: ein Index
 *  jenseits der Feldlaenge ist derselbe Fall wie ein gedrucktes Leerfeld. */
export function pressureLossAt(
  table: PressureLossTable,
  outerDiameterMm: number,
  flowLps: number,
): PressureLossPoint | null {
  const col = dimensionIndex(table, outerDiameterMm);
  if (col < 0) return null;
  const row = table.rows.find((entry) => entry.flowLps === flowLps);
  if (row === undefined) return null;
  const r = row.r[col] ?? null;
  const v = row.v[col] ?? null;
  if (r === null || v === null) return null;
  return { rMbarPerM: r, vMPerS: v };
}

/** Alle Volumenstroeme in l/s, fuer die der Katalog zu dieser Nennweite Werte
 *  fuehrt — aufsteigend, in gedruckter Reihenfolge. Leer, wenn die Nennweite
 *  in der Tabelle nicht vorkommt. */
export function tabulatedFlowsLps(
  table: PressureLossTable,
  outerDiameterMm: number,
): number[] {
  const col = dimensionIndex(table, outerDiameterMm);
  if (col < 0) return [];
  return table.rows
    .filter((row) => (row.r[col] ?? null) !== null)
    .map((row) => row.flowLps);
}

/** Groesster tabellierter Volumenstrom, dessen Fliessgeschwindigkeit die
 *  Grenze nicht ueberschreitet. Reine Auswahl unter gedruckten Zeilen, keine
 *  Rechnung: das Ergebnis ist immer eine Zeile, die so im Katalog steht.
 *
 *  Gedacht fuer die Vordimensionierung — eine Geschwindigkeitsgrenze ist der
 *  uebliche erste Filter, und der Katalog gibt selbst keine an. Die Grenze
 *  muss also aus der Planung kommen, nicht aus dieser Datei. */
export function largestFlowBelowVelocity(
  table: PressureLossTable,
  outerDiameterMm: number,
  maxVelocityMPerS: number,
): { flowLps: number; point: PressureLossPoint } | null {
  const col = dimensionIndex(table, outerDiameterMm);
  if (col < 0) return null;
  let best: { flowLps: number; point: PressureLossPoint } | null = null;
  for (const row of table.rows) {
    const r = row.r[col] ?? null;
    const v = row.v[col] ?? null;
    if (r === null || v === null) continue;
    if (v > maxVelocityMPerS) continue;
    if (best === null || row.flowLps > best.flowLps) {
      best = { flowLps: row.flowLps, point: { rMbarPerM: r, vMPerS: v } };
    }
  }
  return best;
}

/* --- Formteile, Figure 4 auf S. 60 ---------------------------------------
 *
 * Widerstandsbeiwerte r, dimensionslos. Der Katalog nennt sie „Coefficient of
 * resistance (r)" und gibt keine Formel dazu an; die Umrechnung in einen
 * Druckverlust steht in Abschnitt 4.7 nicht und wird hier deshalb auch nicht
 * angeboten.
 *
 * ACHTUNG bei den T-Stuecken: Der Katalog fuehrt „Identical 90° Tee" dreimal
 * und „Reduced 90° Tee" dreimal, mit unterschiedlichen Beiwerten. Die Zeilen
 * unterscheiden sich AUSSCHLIESSLICH durch das Pfeilbild in der Spalte
 * „Symbol" — der Text ist identisch. `flowPatternDe` beschreibt deshalb nur,
 * welche Pfeile gedruckt sind; welcher hydraulische Fall damit gemeint ist
 * (Trennung, Vereinigung, Durchgang), sagt der Katalog nicht aus, und es wird
 * hier auch nicht hineingedeutet. Wer den Beiwert zuordnen muss, sieht sich
 * Figure 4 auf S. 60 an. `figureRow` gibt die Druckreihenfolge wieder. */
export interface FittingResistance {
  /** Zeilennummer in Figure 4, von oben gezaehlt. Einziges eindeutiges
   *  Merkmal bei den sechs gleichnamigen T-Stueck-Zeilen. */
  figureRow: number;
  /** Benennung genau wie gedruckt (englisch). */
  descriptionEn: string;
  /** Deutsche Entsprechung fuer die Oberflaeche. */
  descriptionDe: string;
  /** Beschreibung des gedruckten Pfeilbildes, nicht seiner Deutung.
   *  Null, wo das Symbol kein Pfeilbild traegt. */
  flowPatternDe: string | null;
  /** Widerstandsbeiwert r, dimensionslos. Gedruckt mit Dezimalkomma. */
  r: number;
}

export const FITTING_RESISTANCES: readonly FittingResistance[] = [
  { figureRow: 1, descriptionEn: 'Coupling pipe', descriptionDe: 'Muffe', flowPatternDe: 'ein Pfeil waagerecht nach links', r: 0.25 },
  { figureRow: 2, descriptionEn: '90° Elbow', descriptionDe: 'Winkel 90°', flowPatternDe: null, r: 2.0 },
  { figureRow: 3, descriptionEn: '45° Elbow', descriptionDe: 'Winkel 45°', flowPatternDe: null, r: 0.6 },
  { figureRow: 4, descriptionEn: 'Identical 90° Tee', descriptionDe: 'T-Stueck 90°, durchgehend gleiche Nennweite', flowPatternDe: 'Durchgang: Pfeil nach links; Abgang: Pfeil nach unten', r: 1.8 },
  { figureRow: 5, descriptionEn: 'Reduced 90° Tee', descriptionDe: 'T-Stueck 90°, reduziert', flowPatternDe: 'Durchgang: Pfeil nach links; Abgang: Pfeil nach unten', r: 3.6 },
  { figureRow: 6, descriptionEn: 'Identical 90° Tee', descriptionDe: 'T-Stueck 90°, durchgehend gleiche Nennweite', flowPatternDe: 'Durchgang: Pfeil nach links; Abgang: Pfeil nach oben', r: 1.3 },
  { figureRow: 7, descriptionEn: 'Reduced 90° Tee', descriptionDe: 'T-Stueck 90°, reduziert', flowPatternDe: 'Durchgang: Pfeil nach links; Abgang: Pfeil nach oben', r: 2.6 },
  { figureRow: 8, descriptionEn: 'Identical 90° Tee', descriptionDe: 'T-Stueck 90°, durchgehend gleiche Nennweite', flowPatternDe: 'Durchgang: zwei Pfeile aufeinander zu; Abgang: Pfeil nach unten', r: 4.2 },
  { figureRow: 9, descriptionEn: 'Reduced 90° Tee', descriptionDe: 'T-Stueck 90°, reduziert', flowPatternDe: 'Durchgang: zwei Pfeile aufeinander zu; Abgang: Pfeil nach unten', r: 9.0 },
  { figureRow: 10, descriptionEn: 'Identical 90° Tee', descriptionDe: 'T-Stueck 90°, durchgehend gleiche Nennweite', flowPatternDe: 'Durchgang: zwei Pfeile voneinander weg; Abgang: Pfeil nach oben', r: 2.2 },
  { figureRow: 11, descriptionEn: 'Reduced 90° Tee', descriptionDe: 'T-Stueck 90°, reduziert', flowPatternDe: 'Durchgang: zwei Pfeile voneinander weg; Abgang: Pfeil nach oben', r: 5.0 },
  { figureRow: 12, descriptionEn: 'Male threaded 90° Tee', descriptionDe: 'T-Stueck 90° mit Aussengewinde-Abgang', flowPatternDe: null, r: 0.8 },
  { figureRow: 13, descriptionEn: 'Concentric reduction pipe up 2 dim.', descriptionDe: 'Konzentrische Reduktion um 2 Dimensionen', flowPatternDe: null, r: 0.55 },
  { figureRow: 14, descriptionEn: 'Concentric reduction pipe up 3 dim.', descriptionDe: 'Konzentrische Reduktion um 3 Dimensionen', flowPatternDe: null, r: 0.85 },
  { figureRow: 15, descriptionEn: 'Male threaded joint', descriptionDe: 'Uebergang mit Aussengewinde', flowPatternDe: null, r: 0.4 },
  { figureRow: 16, descriptionEn: 'Reduced male threaded joint', descriptionDe: 'Uebergang mit Aussengewinde, reduziert', flowPatternDe: null, r: 0.85 },
  { figureRow: 17, descriptionEn: 'Male threaded elbow', descriptionDe: 'Winkel mit Aussengewinde', flowPatternDe: null, r: 2.2 },
  { figureRow: 18, descriptionEn: 'Reduced male threaded elbow', descriptionDe: 'Winkel mit Aussengewinde, reduziert', flowPatternDe: null, r: 3.5 },
];

export const FITTING_RESISTANCES_SOURCE = 'KA-Katalog_GB_06-2025, S. 60, Figure 4';

/** Beiwert einer Figure-4-Zeile. Ueber `figureRow` statt ueber den Namen, weil
 *  sechs Zeilen denselben Namen tragen und sich nur im Symbol unterscheiden. */
export function fittingResistanceByRow(figureRow: number): FittingResistance | null {
  return FITTING_RESISTANCES.find((f) => f.figureRow === figureRow) ?? null;
}

/** Alle Zeilen zu einer Benennung. Bei den T-Stuecken sind das drei; welche
 *  davon gilt, entscheidet das Symbol in Figure 4, nicht diese Funktion. */
export function fittingResistancesByName(descriptionEn: string): FittingResistance[] {
  return FITTING_RESISTANCES.filter((f) => f.descriptionEn === descriptionEn);
}

/* --- Strukturpruefung ------------------------------------------------------
 *
 * Kein Ersatz fuer den Abgleich mit dem Druck, aber sie faengt die Fehlerart
 * ab, die beim Abtippen breiter Tabellen am leichtesten passiert und am
 * schwersten auffaellt: eine um ein Feld verschobene Zeile. Verschiebt sich
 * eine Zeile, stimmen R- und v-Laenge nicht mehr ueberein.
 *
 * Aufzurufen aus einem Test oder einem Pflegeskript, nicht zur Laufzeit. */
export function validatePressureLossTables(): string[] {
  const problems: string[] = [];
  for (const table of Object.values(PRESSURE_LOSS_TABLES)) {
    const width = table.dimensions.length;
    const seen = new Set<number>();
    let previousFlow = Number.NEGATIVE_INFINITY;
    for (const row of table.rows) {
      const at = `${table.id} @ ${row.flowLps} l/s`;
      if (row.r.length !== row.v.length) {
        problems.push(`${at}: R hat ${row.r.length} Felder, v hat ${row.v.length}.`);
      }
      if (row.r.length > width || row.v.length > width) {
        problems.push(`${at}: mehr Felder als die Tabelle Spalten hat (${width}).`);
      }
      if (seen.has(row.flowLps)) problems.push(`${at}: Volumenstrom doppelt.`);
      seen.add(row.flowLps);
      if (row.flowLps <= previousFlow) {
        problems.push(`${at}: Volumenstrom nicht aufsteigend.`);
      }
      previousFlow = row.flowLps;
      // Der Katalog druckt beide Spalten gemeinsam; ein einzeln besetztes Feld
      // waere ein Uebertragungsfehler, kein Katalogbefund.
      for (let i = 0; i < row.r.length; i += 1) {
        const hasR = (row.r[i] ?? null) !== null;
        const hasV = (row.v[i] ?? null) !== null;
        if (hasR !== hasV) {
          const d = table.dimensions[i]?.outerDiameterMm ?? i;
          problems.push(`${at}, d${d}: R und v nicht gemeinsam besetzt.`);
        }
      }
    }
  }
  return problems;
}
