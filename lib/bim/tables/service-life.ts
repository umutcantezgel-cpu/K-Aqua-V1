/* Zeitstandverhalten — zulaessiger Betriebsdruck ueber Temperatur und Lebensdauer.
 *
 * QUELLE: KA-Katalog_GB_06-2025_NEU.pdf, Kapitel 1 „K-Aqua-Features":
 *   Tabelle 2 „Allowable operation pressures for PP-R pipes, conveying water,
 *              Safety factor (SF) = 1,25"   — S. 18 (10-50 °C) und S. 19 (60-95 °C)
 *   Tabelle 3 „… PP-R …, Safety factor (SF) = 1,5"
 *                                           — S. 20 (10-50 °C) und S. 21 (60-95 °C)
 *   Tabelle 5 „… PP-RCT …, Safety factor (SF) = 1,25"
 *                                           — S. 24 (10-50 °C) und S. 25 (60-95 °C)
 *   Tabelle 5 „… PP-RCT …, Safety factor (SF) = 1,5"
 *                                           — S. 26 (10-50 °C) und S. 27 (60-95 °C)
 * Alle vier mit dem Normbeleg DIN 8077:2008-09 in der Kopfzeile.
 *
 * ABGETIPPT, NICHT EXTRAHIERT. Die Textebene des Katalogs liest diese Tabellen
 * spaltenweise statt zeilenweise und verliert dabei stillschweigend Zeilen; die
 * Zuordnung Temperatur/Jahre/Rohrreihe geht verloren. Ein aus dem Textlayer
 * gezogener Wert steht mit hoher Wahrscheinlichkeit in der falschen Zelle — und
 * ein zu hoher zulaessiger Betriebsdruck ist der gefaehrlichste Fehler, den
 * diese Datenbasis enthalten kann. Alle zehn Seiten wurden deshalb gerendert
 * (Seitenbild und zusaetzlich jeder Temperaturblock bei 3,3-facher
 * Vergroesserung) und Zeile fuer Zeile abgelesen.
 *
 * EINHEIT: bar. Der Katalog schreibt sie in die Kopfzeile jeder Tabelle
 * („Allowable operation pressure bar"), nicht in MPa. Der Fliesstext auf S. 22
 * nennt dieselbe Sache in MPa (5 MPa fuer PP-RCT bei 70 °C/50 Jahre gegenueber
 * 3,2 MPa fuer PP-R) — das ist die Vergleichsspannung, nicht der Tabellenwert,
 * und wird hier nicht vermischt.
 *
 * NICHT UEBERNOMMEN — die Diagramme dieses Abschnitts:
 *   S. 17  Figure 1 „Reference curves for expected strength of PP-R"   (Regressionskurven)
 *   S. 23  Figure 2 „Reference curves for expected strength of PP-RCT" (Regressionskurven)
 *   S. 22  Saeulendiagramm PP-RCT gegen PP-R bei 20/70/95 °C
 * Aus einer doppellogarithmischen Kurvenschar Zahlen abzugreifen hiesse, Werte
 * zu erfinden, die so nirgends gedruckt stehen. Wer die Kurven braucht, nimmt
 * die Seiten selbst.
 *
 * Verwendet fuer `Pset_KAqua_ServiceLife` in jeder erzeugten IFC-Rohrdatei und
 * auf /ressourcen/technik/zeitstandverhalten. */

import type { BimMaterialId } from '@/lib/bim/tables/material';

/** Die beiden Sicherheitsbeiwerte, zu denen der Katalog Tabellen fuehrt. */
export type SafetyFactor = 1.25 | 1.5;

export type ServiceLifeTableId =
  | 'pp-r-sf-1.25'
  | 'pp-r-sf-1.5'
  | 'pp-rct-sf-1.25'
  | 'pp-rct-sf-1.5';

/** Eine Spalte der Tabellen: Rohrreihe S mit dem zugehoerigen SDR. */
export interface PipeSeriesColumn {
  /** Rohrreihe S, wie in der Kopfzeile „Pipe series S" gedruckt. */
  s: number;
  /** Durchmesser-/Wanddickenverhaeltnis SDR aus der Zeile darunter. */
  sdr: number;
}

/* Alle vier Tabellen tragen dieselbe Kopfzeile, in derselben Reihenfolge, von
 * der duennsten zur dicksten Wand. Deshalb steht die Spaltenbelegung einmal
 * hier und nicht viermal in den Tabellen. */
export const PIPE_SERIES_COLUMNS: readonly PipeSeriesColumn[] = [
  { s: 20, sdr: 41 },
  { s: 16, sdr: 33 },
  { s: 12.5, sdr: 26 },
  { s: 8.3, sdr: 17.6 },
  { s: 8, sdr: 17 },
  { s: 5, sdr: 11 },
  { s: 4, sdr: 9 },
  { s: 3.2, sdr: 7.4 },
  { s: 2.5, sdr: 6 },
  { s: 2, sdr: 5 },
];

/** Eine gedruckte Zeile: eine Temperatur, eine Lebensdauer, zehn Druecke. */
export interface ServiceLifeRow {
  /** Betriebstemperatur in °C aus der Spalte „Temperature °C". */
  temperatureC: number;
  /** Lebensdauer in Jahren aus der Spalte „Years of service". */
  serviceLifeYears: number;
  /** Zulaessiger Betriebsdruck in bar, spaltengleich zu PIPE_SERIES_COLUMNS. */
  pressuresBar: number[];
  /** Gesetzt, wo der Katalog Jahreszahl und Werte klammert — siehe
   *  CONDITIONAL_ROW_CONDITION. Diese Zeilen gelten nicht unbedingt. */
  conditional?: true;
}

export interface ServiceLifeTable {
  id: ServiceLifeTableId;
  material: BimMaterialId;
  safetyFactor: SafetyFactor;
  /** Tabellenbezeichnung, wie gedruckt. Siehe TABLE_NUMBERING_NOTE. */
  captionEn: string;
  /** Normbeleg aus der Kopfzeile der Katalogseite. */
  standard: string;
  /** Einheit der Werte. Der Katalog fuehrt bar, nicht MPa. */
  unit: 'bar';
  rows: ServiceLifeRow[];
  source: string;
}

/* Die Fussnote a), gleichlautend unter allen vier Tabellen. Sie haengt an der
 * geklammerten 10-Jahres-Zeile bei 95 °C. Ohne diesen Nachweis darf der Wert
 * nicht angesetzt werden — deshalb liefern ihn die Standardzugriffe nicht. */
export const CONDITIONAL_ROW_CONDITION = {
  en: 'The values between parentheses apply in cases where it can be demonstrated that the test was carried out for more than a year at 110° C',
  de: 'Die geklammerten Werte gelten nur, wenn nachgewiesen ist, dass die Pruefung laenger als ein Jahr bei 110 °C durchgefuehrt wurde.',
} as const;

/* Tabelle 2, S. 18-19 — PP-R, SF = 1,25. */
const PP_R_SF_1_25: ServiceLifeTable = {
  id: 'pp-r-sf-1.25',
  material: 'PP-R',
  safetyFactor: 1.25,
  captionEn: 'Table 2 - Allowable operation pressures for PP-R pipes, conveying water, Safety factor (SF) = 1,25',
  standard: 'DIN 8077:2008-09',
  unit: 'bar',
  rows: [
    { temperatureC: 10, serviceLifeYears: 1, pressuresBar: [5.3, 6.6, 8.4, 12.6, 13.3, 21.1, 26.5, 33.4, 42.1, 53.0] },
    { temperatureC: 10, serviceLifeYears: 5, pressuresBar: [4.9, 6.2, 7.9, 11.9, 12.5, 19.8, 25.0, 31.5, 39.7, 49.9] },
    { temperatureC: 10, serviceLifeYears: 10, pressuresBar: [4.8, 6.1, 7.7, 11.6, 12.2, 19.3, 24.4, 30.7, 38.6, 48.7] },
    { temperatureC: 10, serviceLifeYears: 25, pressuresBar: [4.7, 5.9, 7.4, 11.2, 11.8, 18.7, 23.6, 29.7, 37.4, 47.0] },
    { temperatureC: 10, serviceLifeYears: 50, pressuresBar: [4.5, 5.7, 7.2, 10.9, 11.5, 18.2, 23.0, 28.9, 36.4, 45.9] },
    { temperatureC: 10, serviceLifeYears: 100, pressuresBar: [4.4, 5.6, 7.0, 10.7, 11.2, 17.8, 22.4, 28.2, 35.5, 44.7] },

    { temperatureC: 20, serviceLifeYears: 1, pressuresBar: [4.5, 5.6, 7.1, 10.8, 11.3, 18.0, 22.6, 28.5, 35.9, 45.2] },
    { temperatureC: 20, serviceLifeYears: 5, pressuresBar: [4.2, 5.3, 6.7, 10.1, 10.6, 16.9, 21.3, 26.8, 33.7, 42.5] },
    { temperatureC: 20, serviceLifeYears: 10, pressuresBar: [4.1, 5.2, 6.5, 9.9, 10.4, 16.4, 20.7, 26.1, 32.8, 41.4] },
    { temperatureC: 20, serviceLifeYears: 25, pressuresBar: [3.9, 5.0, 6.3, 9.5, 10.0, 15.9, 20.0, 25.2, 31.7, 39.9] },
    { temperatureC: 20, serviceLifeYears: 50, pressuresBar: [3.8, 4.8, 6.1, 9.3, 9.7, 15.4, 19.5, 24.5, 30.9, 38.9] },
    { temperatureC: 20, serviceLifeYears: 100, pressuresBar: [3.7, 4.7, 6.0, 9.0, 9.5, 15.0, 18.9, 23.9, 30.1, 37.8] },

    { temperatureC: 30, serviceLifeYears: 1, pressuresBar: [3.8, 4.8, 6.1, 9.2, 9.6, 15.3, 19.2, 24.2, 30.5, 38.5] },
    { temperatureC: 30, serviceLifeYears: 5, pressuresBar: [3.6, 4.5, 5.7, 8.6, 9.0, 14.3, 18.0, 22.7, 28.6, 36.0] },
    { temperatureC: 30, serviceLifeYears: 10, pressuresBar: [3.5, 4.4, 5.5, 8.4, 8.8, 13.9, 17.5, 22.1, 27.8, 35.0] },
    { temperatureC: 30, serviceLifeYears: 25, pressuresBar: [3.3, 4.2, 5.3, 8.1, 8.4, 13.4, 16.9, 21.3, 26.8, 33.8] },
    { temperatureC: 30, serviceLifeYears: 50, pressuresBar: [3.2, 4.1, 5.2, 7.8, 8.2, 13.0, 16.4, 20.7, 26.1, 32.9] },
    { temperatureC: 30, serviceLifeYears: 100, pressuresBar: [3.1, 4.0, 5.0, 7.6, 8.0, 12.7, 16.0, 20.1, 25.4, 31.9] },

    { temperatureC: 40, serviceLifeYears: 1, pressuresBar: [3.2, 4.1, 5.1, 7.8, 8.2, 13.0, 16.3, 20.6, 25.9, 32.6] },
    { temperatureC: 40, serviceLifeYears: 5, pressuresBar: [3.0, 3.8, 4.8, 7.3, 7.6, 12.1, 15.3, 19.2, 24.2, 30.5] },
    { temperatureC: 40, serviceLifeYears: 10, pressuresBar: [2.9, 3.7, 4.7, 7.1, 7.4, 11.8, 14.8, 18.7, 23.5, 29.6] },
    { temperatureC: 40, serviceLifeYears: 25, pressuresBar: [2.8, 3.5, 4.5, 6.8, 7.1, 11.3, 14.3, 18.0, 22.6, 28.5] },
    { temperatureC: 40, serviceLifeYears: 50, pressuresBar: [2.7, 3.4, 4.3, 6.6, 6.9, 11.0, 13.9, 17.4, 22.0, 27.7] },
    { temperatureC: 40, serviceLifeYears: 100, pressuresBar: [2.6, 3.3, 4.2, 6.4, 6.7, 10.7, 13.5, 16.9, 21.4, 26.9] },

    { temperatureC: 50, serviceLifeYears: 1, pressuresBar: [2.7, 3.4, 4.3, 6.6, 6.9, 11.0, 13.8, 17.4, 21.9, 27.6] },
    { temperatureC: 50, serviceLifeYears: 5, pressuresBar: [2.5, 3.2, 4.0, 6.1, 6.4, 10.2, 12.9, 16.2, 20.4, 25.7] },
    { temperatureC: 50, serviceLifeYears: 10, pressuresBar: [2.5, 3.1, 3.9, 5.9, 6.2, 9.9, 12.5, 15.7, 19.8, 25.0] },
    { temperatureC: 50, serviceLifeYears: 25, pressuresBar: [2.4, 3.0, 3.8, 5.7, 6.0, 9.5, 12.0, 15.1, 19.0, 24.0] },
    { temperatureC: 50, serviceLifeYears: 50, pressuresBar: [2.3, 2.9, 3.6, 5.5, 5.8, 9.2, 11.6, 14.7, 18.5, 23.3] },
    { temperatureC: 50, serviceLifeYears: 100, pressuresBar: [2.2, 2.8, 3.5, 5.4, 5.6, 9.0, 11.3, 14.2, 17.9, 22.6] },

    { temperatureC: 60, serviceLifeYears: 1, pressuresBar: [2.3, 2.9, 3.6, 5.5, 5.8, 9.2, 11.6, 14.7, 18.5, 23.3] },
    { temperatureC: 60, serviceLifeYears: 5, pressuresBar: [2.1, 2.7, 3.4, 5.1, 5.4, 8.6, 10.8, 13.6, 17.2, 21.6] },
    { temperatureC: 60, serviceLifeYears: 10, pressuresBar: [2.1, 2.6, 3.3, 5.0, 5.2, 8.3, 10.5, 13.2, 16.6, 21.0] },
    { temperatureC: 60, serviceLifeYears: 25, pressuresBar: [2.0, 2.5, 3.1, 4.8, 5.0, 8.0, 10.1, 12.7, 16.0, 20.1] },
    { temperatureC: 60, serviceLifeYears: 50, pressuresBar: [1.9, 2.4, 3.0, 4.6, 4.9, 7.7, 9.7, 12.3, 15.5, 19.5] },

    { temperatureC: 70, serviceLifeYears: 1, pressuresBar: [1.9, 2.4, 3.1, 4.6, 4.9, 7.8, 9.8, 12.3, 15.5, 19.6] },
    { temperatureC: 70, serviceLifeYears: 5, pressuresBar: [1.8, 2.2, 2.8, 4.3, 4.5, 7.2, 9.1, 11.4, 14.4, 18.1] },
    { temperatureC: 70, serviceLifeYears: 10, pressuresBar: [1.7, 2.2, 2.7, 4.2, 4.4, 7.0, 8.8, 11.1, 13.9, 17.5] },
    { temperatureC: 70, serviceLifeYears: 25, pressuresBar: [1.5, 1.9, 2.4, 3.6, 3.8, 6.0, 7.6, 9.6, 12.1, 15.2] },
    { temperatureC: 70, serviceLifeYears: 50, pressuresBar: [1.2, 1.6, 2.0, 3.0, 3.2, 5.1, 6.4, 8.1, 10.2, 12.8] },

    { temperatureC: 80, serviceLifeYears: 1, pressuresBar: [1.6, 2.0, 2.6, 3.9, 4.1, 6.5, 8.2, 10.3, 13.0, 16.4] },
    { temperatureC: 80, serviceLifeYears: 5, pressuresBar: [1.4, 1.8, 2.3, 3.4, 3.6, 5.7, 7.2, 9.1, 11.5, 14.5] },
    { temperatureC: 80, serviceLifeYears: 10, pressuresBar: [1.2, 1.5, 1.9, 2.9, 3.0, 4.8, 6.1, 7.7, 9.7, 12.2] },
    { temperatureC: 80, serviceLifeYears: 25, pressuresBar: [0.9, 1.2, 1.5, 2.3, 2.4, 3.9, 4.9, 6.2, 7.8, 9.8] },

    { temperatureC: 95, serviceLifeYears: 1, pressuresBar: [1.1, 1.4, 1.8, 2.7, 2.9, 4.6, 5.8, 7.3, 9.2, 11.6] },
    { temperatureC: 95, serviceLifeYears: 5, pressuresBar: [0.7, 0.9, 1.2, 1.8, 1.9, 3.1, 3.9, 4.9, 6.2, 7.8] },
    { temperatureC: 95, serviceLifeYears: 10, conditional: true, pressuresBar: [0.6, 0.8, 1.0, 1.5, 1.6, 2.6, 3.3, 4.1, 5.2, 6.6] },
  ],
  source: 'KA-Katalog_GB_06-2025, S. 18-19',
};

/* Tabelle 3, S. 20-21 — PP-R, SF = 1,5. */
const PP_R_SF_1_5: ServiceLifeTable = {
  id: 'pp-r-sf-1.5',
  material: 'PP-R',
  safetyFactor: 1.5,
  captionEn: 'Table 3 - Allowable operation pressures for PP-R pipes, conveying water, Safety factor (SF) = 1,5',
  standard: 'DIN 8077:2008-09',
  unit: 'bar',
  rows: [
    { temperatureC: 10, serviceLifeYears: 1, pressuresBar: [4.4, 5.5, 7.0, 10.5, 11.1, 17.5, 22.1, 27.8, 35.1, 44.1] },
    { temperatureC: 10, serviceLifeYears: 5, pressuresBar: [4.1, 5.2, 6.6, 9.9, 10.4, 16.5, 20.8, 26.2, 33.0, 41.6] },
    { temperatureC: 10, serviceLifeYears: 10, pressuresBar: [4.0, 5.1, 6.4, 9.7, 10.1, 16.1, 20.3, 25.6, 32.2, 40.5] },
    { temperatureC: 10, serviceLifeYears: 25, pressuresBar: [3.9, 4.9, 6.2, 9.3, 9.8, 15.6, 19.6, 24.7, 31.1, 39.2] },
    { temperatureC: 10, serviceLifeYears: 50, pressuresBar: [3.8, 4.8, 6.0, 9.1, 9.6, 15.2, 19.1, 24.1, 30.3, 38.2] },
    { temperatureC: 10, serviceLifeYears: 100, pressuresBar: [3.7, 4.6, 5.9, 8.9, 9.3, 14.8, 18.6, 23.5, 29.6, 37.2] },

    { temperatureC: 20, serviceLifeYears: 1, pressuresBar: [3.7, 4.7, 5.9, 9.0, 9.4, 15.0, 18.8, 23.7, 29.9, 37.7] },
    { temperatureC: 20, serviceLifeYears: 5, pressuresBar: [3.5, 4.4, 5.6, 8.4, 8.9, 14.1, 17.7, 22.3, 28.1, 35.4] },
    { temperatureC: 20, serviceLifeYears: 10, pressuresBar: [3.4, 4.3, 5.4, 8.2, 8.6, 13.7, 17.2, 21.7, 27.4, 34.5] },
    { temperatureC: 20, serviceLifeYears: 25, pressuresBar: [3.3, 4.1, 5.2, 7.9, 8.3, 13.2, 16.6, 21.0, 26.4, 33.3] },
    { temperatureC: 20, serviceLifeYears: 50, pressuresBar: [3.2, 4.0, 5.1, 7.7, 8.1, 12.9, 16.2, 20.4, 25.7, 32.4] },
    { temperatureC: 20, serviceLifeYears: 100, pressuresBar: [3.1, 3.9, 5.0, 7.5, 7.9, 12.5, 15.8, 19.9, 25.0, 31.5] },

    { temperatureC: 30, serviceLifeYears: 1, pressuresBar: [3.2, 4.0, 5.0, 7.6, 8.0, 12.7, 16.0, 20.2, 25.4, 32.0] },
    { temperatureC: 30, serviceLifeYears: 5, pressuresBar: [3.0, 3.7, 4.7, 7.2, 7.5, 11.9, 15.0, 18.9, 23.8, 30.0] },
    { temperatureC: 30, serviceLifeYears: 10, pressuresBar: [2.9, 3.6, 4.6, 7.0, 7.3, 11.6, 14.6, 18.4, 23.2, 29.2] },
    { temperatureC: 30, serviceLifeYears: 25, pressuresBar: [2.8, 3.5, 4.4, 6.7, 7.0, 11.2, 14.1, 17.7, 22.3, 28.1] },
    { temperatureC: 30, serviceLifeYears: 50, pressuresBar: [2.7, 3.4, 4.3, 6.5, 6.8, 10.9, 13.7, 17.2, 21.7, 27.4] },
    { temperatureC: 30, serviceLifeYears: 100, pressuresBar: [2.6, 3.3, 4.2, 6.3, 6.6, 10.6, 13.3, 16.8, 21.1, 26.6] },

    { temperatureC: 40, serviceLifeYears: 1, pressuresBar: [2.7, 3.4, 4.3, 6.5, 6.8, 10.8, 13.6, 17.1, 21.6, 27.2] },
    { temperatureC: 40, serviceLifeYears: 5, pressuresBar: [2.5, 3.2, 4.0, 6.0, 6.3, 10.1, 12.7, 16.0, 20.2, 25.4] },
    { temperatureC: 40, serviceLifeYears: 10, pressuresBar: [2.4, 3.1, 3.9, 5.9, 6.2, 9.8, 12.3, 15.5, 19.6, 24.7] },
    { temperatureC: 40, serviceLifeYears: 25, pressuresBar: [2.3, 2.9, 3.7, 5.6, 5.9, 9.4, 11.9, 15.0, 18.8, 23.7] },
    { temperatureC: 40, serviceLifeYears: 50, pressuresBar: [2.3, 2.9, 3.6, 5.5, 5.8, 9.2, 11.5, 14.5, 18.3, 23.1] },
    { temperatureC: 40, serviceLifeYears: 100, pressuresBar: [2.2, 2.8, 3.5, 5.3, 5.6, 8.9, 11.2, 14.1, 17.8, 22.4] },

    { temperatureC: 50, serviceLifeYears: 1, pressuresBar: [2.3, 2.8, 3.6, 5.5, 5.7, 9.1, 11.5, 14.5, 18.2, 23.0] },
    { temperatureC: 50, serviceLifeYears: 5, pressuresBar: [2.1, 2.7, 3.4, 5.1, 5.3, 8.5, 10.7, 13.5, 17.0, 21.4] },
    { temperatureC: 50, serviceLifeYears: 10, pressuresBar: [2.0, 2.6, 3.3, 4.9, 5.2, 8.2, 10.4, 13.1, 16.5, 20.8] },
    { temperatureC: 50, serviceLifeYears: 25, pressuresBar: [2.0, 2.5, 3.1, 4.7, 5.0, 7.9, 10.0, 12.6, 15.9, 20.0] },
    { temperatureC: 50, serviceLifeYears: 50, pressuresBar: [1.9, 2.4, 3.0, 4.6, 4.8, 7.7, 9.7, 12.2, 15.4, 19.4] },
    { temperatureC: 50, serviceLifeYears: 100, pressuresBar: [1.8, 2.3, 2.9, 4.5, 4.7, 7.5, 9.4, 11.8, 14.9, 18.8] },

    { temperatureC: 60, serviceLifeYears: 1, pressuresBar: [1.9, 2.4, 3.0, 4.6, 4.8, 7.7, 9.7, 12.2, 15.4, 19.4] },
    { temperatureC: 60, serviceLifeYears: 5, pressuresBar: [1.8, 2.2, 2.8, 4.3, 4.5, 7.1, 9.0, 11.3, 14.3, 18.0] },
    { temperatureC: 60, serviceLifeYears: 10, pressuresBar: [1.7, 2.2, 2.7, 4.1, 4.3, 6.9, 8.7, 11.0, 13.9, 17.5] },
    { temperatureC: 60, serviceLifeYears: 25, pressuresBar: [1.6, 2.1, 2.6, 4.0, 4.2, 6.6, 8.4, 10.5, 13.3, 16.7] },
    { temperatureC: 60, serviceLifeYears: 50, pressuresBar: [1.6, 2.0, 2.5, 3.8, 4.0, 6.4, 8.1, 10.2, 12.9, 16.2] },

    { temperatureC: 70, serviceLifeYears: 1, pressuresBar: [1.6, 2.0, 2.5, 3.9, 4.1, 6.5, 8.1, 10.3, 12.9, 16.3] },
    { temperatureC: 70, serviceLifeYears: 5, pressuresBar: [1.5, 1.9, 2.4, 3.6, 3.8, 6.0, 7.5, 9.5, 12.0, 15.1] },
    { temperatureC: 70, serviceLifeYears: 10, pressuresBar: [1.4, 1.8, 2.3, 3.5, 3.6, 5.8, 7.3, 9.2, 11.6, 14.6] },
    { temperatureC: 70, serviceLifeYears: 25, pressuresBar: [1.2, 1.5, 2.0, 3.0, 3.1, 5.0, 6.3, 8.0, 10.0, 12.7] },
    { temperatureC: 70, serviceLifeYears: 50, pressuresBar: [1.0, 1.3, 1.7, 2.5, 2.6, 4.2, 5.3, 6.7, 8.5, 10.7] },

    { temperatureC: 80, serviceLifeYears: 1, pressuresBar: [1.3, 1.7, 2.1, 3.2, 3.4, 5.4, 6.8, 8.6, 10.8, 13.7] },
    { temperatureC: 80, serviceLifeYears: 5, pressuresBar: [1.2, 1.5, 1.9, 2.9, 3.0, 4.8, 6.0, 7.6, 9.6, 12.1] },
    { temperatureC: 80, serviceLifeYears: 10, pressuresBar: [1.0, 1.2, 1.6, 2.4, 2.5, 4.0, 5.1, 6.4, 8.1, 10.2] },
    { temperatureC: 80, serviceLifeYears: 25, pressuresBar: [0.8, 1.0, 1.2, 1.9, 2.0, 3.2, 4.1, 5.1, 6.5, 8.1] },

    { temperatureC: 95, serviceLifeYears: 1, pressuresBar: [0.9, 1.2, 1.5, 2.3, 2.4, 3.8, 4.8, 6.1, 7.6, 9.6] },
    { temperatureC: 95, serviceLifeYears: 5, pressuresBar: [0.6, 0.8, 1.0, 1.5, 1.6, 2.6, 3.2, 4.1, 5.2, 6.5] },
    { temperatureC: 95, serviceLifeYears: 10, conditional: true, pressuresBar: [0.5, 0.6, 0.8, 1.3, 1.3, 2.2, 2.7, 3.4, 4.3, 5.5] },
  ],
  source: 'KA-Katalog_GB_06-2025, S. 20-21',
};

/* Tabelle 5 (erste dieses Namens), S. 24-25 — PP-RCT, SF = 1,25. */
const PP_RCT_SF_1_25: ServiceLifeTable = {
  id: 'pp-rct-sf-1.25',
  material: 'PP-RCT',
  safetyFactor: 1.25,
  captionEn: 'Table 5 - Allowable operation pressures for PP-RCT, conveying water, Safety factor (SF) = 1,25',
  standard: 'DIN 8077:2008-09',
  unit: 'bar',
  rows: [
    { temperatureC: 10, serviceLifeYears: 1, pressuresBar: [5.7, 7.2, 9.1, 13.7, 14.4, 22.8, 28.8, 36.2, 45.6, 57.4] },
    { temperatureC: 10, serviceLifeYears: 5, pressuresBar: [5.5, 7.0, 8.8, 13.3, 14.0, 22.1, 27.9, 35.1, 44.2, 55.7] },
    { temperatureC: 10, serviceLifeYears: 10, pressuresBar: [5.5, 6.9, 8.7, 13.1, 13.8, 21.9, 27.5, 34.7, 43.7, 55.0] },
    { temperatureC: 10, serviceLifeYears: 25, pressuresBar: [5.4, 6.8, 8.5, 12.9, 13.5, 21.5, 27.1, 34.1, 42.9, 54.0] },
    { temperatureC: 10, serviceLifeYears: 50, pressuresBar: [5.3, 6.7, 8.4, 12.7, 13.4, 21.2, 26.7, 33.6, 42.3, 53.3] },
    { temperatureC: 10, serviceLifeYears: 100, pressuresBar: [5.2, 6.6, 8.3, 12.6, 13.2, 20.9, 26.3, 33.2, 41.8, 52.6] },

    { temperatureC: 20, serviceLifeYears: 1, pressuresBar: [5.0, 6.3, 7.9, 11.9, 12.5, 19.9, 25.0, 31.5, 39.7, 50.0] },
    { temperatureC: 20, serviceLifeYears: 5, pressuresBar: [4.8, 6.1, 7.6, 11.6, 12.1, 19.3, 24.2, 30.5, 38.5, 48.4] },
    { temperatureC: 20, serviceLifeYears: 10, pressuresBar: [4.7, 6.0, 7.5, 11.4, 12.0, 19.0, 23.9, 30.1, 37.9, 47.8] },
    { temperatureC: 20, serviceLifeYears: 25, pressuresBar: [4.6, 5.9, 7.4, 11.2, 11.7, 18.6, 23.5, 29.6, 37.2, 46.9] },
    { temperatureC: 20, serviceLifeYears: 50, pressuresBar: [4.6, 5.8, 7.3, 11.0, 11.6, 18.4, 23.1, 29.2, 36.7, 46.2] },
    { temperatureC: 20, serviceLifeYears: 100, pressuresBar: [4.5, 5.7, 7.2, 10.9, 11.4, 18.1, 22.8, 28.8, 36.2, 45.6] },

    { temperatureC: 30, serviceLifeYears: 1, pressuresBar: [4.3, 5.4, 6.8, 10.3, 10.8, 17.2, 21.7, 27.3, 34.4, 43.3] },
    { temperatureC: 30, serviceLifeYears: 5, pressuresBar: [4.1, 5.2, 6.6, 10.0, 10.5, 16.6, 20.9, 26.4, 33.2, 41.8] },
    { temperatureC: 30, serviceLifeYears: 10, pressuresBar: [4.1, 5.1, 6.5, 9.8, 10.3, 16.4, 20.6, 26.0, 32.7, 41.2] },
    { temperatureC: 30, serviceLifeYears: 25, pressuresBar: [4.0, 5.0, 6.4, 9.6, 10.1, 16.1, 20.2, 25.5, 32.1, 40.4] },
    { temperatureC: 30, serviceLifeYears: 50, pressuresBar: [3.9, 5.0, 6.3, 9.5, 10.0, 15.8, 19.9, 25.1, 31.6, 39.8] },
    { temperatureC: 30, serviceLifeYears: 100, pressuresBar: [3.9, 4.9, 6.2, 9.4, 9.8, 15.6, 19.7, 24.8, 31.2, 39.3] },

    { temperatureC: 40, serviceLifeYears: 1, pressuresBar: [3.7, 4.6, 5.9, 8.9, 9.3, 14.8, 18.6, 23.5, 29.6, 37.2] },
    { temperatureC: 40, serviceLifeYears: 5, pressuresBar: [3.5, 4.5, 5.7, 8.6, 9.0, 14.3, 18.0, 22.6, 28.5, 35.9] },
    { temperatureC: 40, serviceLifeYears: 10, pressuresBar: [3.5, 4.4, 5.6, 8.4, 8.8, 14.1, 17.7, 22.3, 28.1, 35.4] },
    { temperatureC: 40, serviceLifeYears: 25, pressuresBar: [3.4, 4.3, 5.4, 8.3, 8.7, 13.8, 17.3, 21.8, 27.5, 34.6] },
    { temperatureC: 40, serviceLifeYears: 50, pressuresBar: [3.4, 4.3, 5.4, 8.1, 8.5, 13.6, 17.1, 21.5, 27.1, 34.1] },
    { temperatureC: 40, serviceLifeYears: 100, pressuresBar: [3.3, 4.2, 5.3, 8.0, 8.4, 13.3, 16.8, 21.2, 26.7, 33.6] },

    { temperatureC: 50, serviceLifeYears: 1, pressuresBar: [3.1, 4.0, 5.0, 7.6, 8.0, 12.6, 15.9, 20.1, 25.3, 31.8] },
    { temperatureC: 50, serviceLifeYears: 5, pressuresBar: [3.0, 3.8, 4.8, 7.3, 7.7, 12.2, 15.3, 19.3, 24.3, 30.6] },
    { temperatureC: 50, serviceLifeYears: 10, pressuresBar: [3.0, 3.7, 4.7, 7.2, 7.5, 12.0, 15.1, 19.0, 23.9, 30.1] },
    { temperatureC: 50, serviceLifeYears: 25, pressuresBar: [2.9, 3.7, 4.6, 7.0, 7.4, 11.7, 14.7, 18.6, 23.4, 29.5] },
    { temperatureC: 50, serviceLifeYears: 50, pressuresBar: [2.9, 3.6, 4.6, 6.9, 7.2, 11.5, 14.5, 18.3, 23.0, 29.0] },
    { temperatureC: 50, serviceLifeYears: 100, pressuresBar: [2.8, 3.5, 4.5, 6.8, 7.1, 11.3, 14.3, 18.0, 22.6, 28.5] },

    { temperatureC: 60, serviceLifeYears: 1, pressuresBar: [2.7, 3.4, 4.2, 6.4, 6.7, 10.7, 13.5, 17.0, 21.4, 27.0] },
    { temperatureC: 60, serviceLifeYears: 5, pressuresBar: [2.5, 3.2, 4.1, 6.2, 6.5, 10.3, 13.0, 16.3, 20.6, 25.9] },
    { temperatureC: 60, serviceLifeYears: 10, pressuresBar: [2.5, 3.2, 4.0, 6.1, 6.4, 10.1, 12.7, 16.0, 20.2, 25.5] },
    { temperatureC: 60, serviceLifeYears: 25, pressuresBar: [2.4, 3.1, 3.9, 5.9, 6.2, 9.9, 12.4, 15.7, 19.8, 24.9] },
    { temperatureC: 60, serviceLifeYears: 50, pressuresBar: [2.4, 3.0, 3.8, 5.8, 6.1, 9.7, 12.2, 15.4, 19.4, 24.5] },

    { temperatureC: 70, serviceLifeYears: 1, pressuresBar: [2.2, 2.8, 3.6, 5.4, 5.7, 9.0, 11.3, 14.3, 18.0, 22.7] },
    { temperatureC: 70, serviceLifeYears: 5, pressuresBar: [2.1, 2.7, 3.4, 5.2, 5.4, 8.6, 10.9, 13.7, 17.3, 21.7] },
    { temperatureC: 70, serviceLifeYears: 10, pressuresBar: [2.1, 2.6, 3.3, 5.1, 5.3, 8.5, 10.7, 13.5, 16.9, 21.3] },
    { temperatureC: 70, serviceLifeYears: 25, pressuresBar: [2.0, 2.6, 3.3, 5.0, 5.2, 8.3, 10.4, 13.1, 16.5, 20.8] },
    { temperatureC: 70, serviceLifeYears: 50, pressuresBar: [2.0, 2.5, 3.2, 4.9, 5.1, 8.1, 10.2, 12.9, 16.2, 20.5] },

    { temperatureC: 80, serviceLifeYears: 1, pressuresBar: [1.8, 2.3, 3.0, 4.5, 4.7, 7.5, 9.5, 11.9, 15.0, 18.9] },
    { temperatureC: 80, serviceLifeYears: 5, pressuresBar: [1.8, 2.2, 2.8, 4.3, 4.5, 7.2, 9.0, 11.4, 14.4, 18.1] },
    { temperatureC: 80, serviceLifeYears: 10, pressuresBar: [1.7, 2.2, 2.8, 4.2, 4.4, 7.0, 8.9, 11.2, 14.1, 17.7] },
    { temperatureC: 80, serviceLifeYears: 25, pressuresBar: [1.7, 2.1, 2.7, 4.1, 4.3, 6.9, 8.6, 10.9, 13.7, 17.2] },

    { temperatureC: 95, serviceLifeYears: 1, pressuresBar: [1.4, 1.7, 2.2, 3.4, 3.5, 5.6, 7.1, 8.9, 11.2, 14.2] },
    { temperatureC: 95, serviceLifeYears: 5, pressuresBar: [1.3, 1.7, 2.1, 3.2, 3.3, 5.3, 6.7, 8.5, 10.7, 13.5] },
    { temperatureC: 95, serviceLifeYears: 10, conditional: true, pressuresBar: [1.3, 1.6, 2.1, 3.1, 3.3, 5.2, 6.6, 8.3, 10.5, 13.2] },
  ],
  source: 'KA-Katalog_GB_06-2025, S. 24-25',
};

/* Tabelle 5 (zweite dieses Namens), S. 26-27 — PP-RCT, SF = 1,5. */
const PP_RCT_SF_1_5: ServiceLifeTable = {
  id: 'pp-rct-sf-1.5',
  material: 'PP-RCT',
  safetyFactor: 1.5,
  captionEn: 'Table 5 - Allowable operation pressures for PP-RCT, conveying water, Safety factor (SF) = 1,5',
  standard: 'DIN 8077:2008-09',
  unit: 'bar',
  rows: [
    { temperatureC: 10, serviceLifeYears: 1, pressuresBar: [4.7, 6.0, 7.5, 11.4, 12.0, 19.0, 24.0, 30.2, 38.0, 47.9] },
    { temperatureC: 10, serviceLifeYears: 5, pressuresBar: [4.6, 5.8, 7.3, 11.1, 11.6, 18.4, 23.2, 29.3, 36.9, 46.4] },
    { temperatureC: 10, serviceLifeYears: 10, pressuresBar: [4.5, 5.7, 7.2, 10.9, 11.5, 18.2, 22.9, 28.9, 36.4, 45.8] },
    { temperatureC: 10, serviceLifeYears: 25, pressuresBar: [4.5, 5.6, 7.1, 10.7, 11.3, 17.9, 22.5, 28.4, 35.7, 45.0] },
    { temperatureC: 10, serviceLifeYears: 50, pressuresBar: [4.4, 5.5, 7.0, 10.6, 11.1, 17.7, 22.2, 28.0, 35.3, 44.4] },
    { temperatureC: 10, serviceLifeYears: 100, pressuresBar: [4.3, 5.5, 6.9, 10.5, 11.0, 17.4, 21.9, 27.6, 34.8, 43.8] },

    { temperatureC: 20, serviceLifeYears: 1, pressuresBar: [4.1, 5.2, 6.6, 9.9, 10.4, 16.6, 20.9, 26.3, 33.1, 41.7] },
    { temperatureC: 20, serviceLifeYears: 5, pressuresBar: [4.0, 5.0, 6.4, 9.6, 10.1, 16.0, 20.2, 25.4, 32.0, 40.4] },
    { temperatureC: 20, serviceLifeYears: 10, pressuresBar: [3.9, 5.0, 6.3, 9.5, 10.0, 15.8, 19.9, 25.1, 31.6, 39.8] },
    { temperatureC: 20, serviceLifeYears: 25, pressuresBar: [3.9, 4.9, 6.1, 9.3, 9.8, 15.5, 19.6, 24.6, 31.0, 39.1] },
    { temperatureC: 20, serviceLifeYears: 50, pressuresBar: [3.8, 4.8, 6.1, 9.2, 9.6, 15.3, 19.3, 24.3, 30.6, 38.5] },
    { temperatureC: 20, serviceLifeYears: 100, pressuresBar: [3.8, 4.7, 6.0, 9.1, 9.5, 15.1, 19.0, 24.0, 30.2, 38.0] },

    { temperatureC: 30, serviceLifeYears: 1, pressuresBar: [3.6, 4.5, 5.7, 8.6, 9.0, 14.3, 18.1, 22.7, 28.7, 36.1] },
    { temperatureC: 30, serviceLifeYears: 5, pressuresBar: [3.4, 4.3, 5.5, 8.3, 8.7, 13.9, 17.4, 22.0, 27.7, 34.9] },
    { temperatureC: 30, serviceLifeYears: 10, pressuresBar: [3.4, 4.3, 5.4, 8.2, 8.6, 13.6, 17.2, 21.7, 27.3, 34.4] },
    { temperatureC: 30, serviceLifeYears: 25, pressuresBar: [3.3, 4.2, 5.3, 8.0, 8.4, 13.4, 16.9, 21.2, 26.8, 33.7] },
    { temperatureC: 30, serviceLifeYears: 50, pressuresBar: [3.3, 4.1, 5.2, 7.9, 8.3, 13.2, 16.6, 20.9, 26.4, 33.2] },
    { temperatureC: 30, serviceLifeYears: 100, pressuresBar: [3.2, 4.1, 5.1, 7.8, 8.2, 13.0, 16.4, 20.6, 26.0, 32.7] },

    { temperatureC: 40, serviceLifeYears: 1, pressuresBar: [3.1, 3.9, 4.9, 7.4, 7.8, 12.3, 15.5, 19.6, 24.6, 31.0] },
    { temperatureC: 40, serviceLifeYears: 5, pressuresBar: [2.9, 3.7, 4.7, 7.1, 7.5, 11.9, 15.0, 18.9, 23.8, 29.9] },
    { temperatureC: 40, serviceLifeYears: 10, pressuresBar: [2.9, 3.7, 4.6, 7.0, 7.4, 11.7, 14.7, 18.6, 23.4, 29.5] },
    { temperatureC: 40, serviceLifeYears: 25, pressuresBar: [2.8, 3.6, 4.5, 6.9, 7.2, 11.5, 14.4, 18.2, 22.9, 28.9] },
    { temperatureC: 40, serviceLifeYears: 50, pressuresBar: [2.8, 3.5, 4.5, 6.8, 7.1, 11.3, 14.2, 17.9, 22.6, 28.4] },
    { temperatureC: 40, serviceLifeYears: 100, pressuresBar: [2.8, 3.5, 4.4, 6.7, 7.0, 11.1, 14.0, 17.6, 22.2, 28.0] },

    { temperatureC: 50, serviceLifeYears: 1, pressuresBar: [2.6, 3.3, 4.2, 6.3, 6.6, 10.5, 13.3, 16.7, 21.0, 26.5] },
    { temperatureC: 50, serviceLifeYears: 5, pressuresBar: [2.5, 3.2, 4.0, 6.1, 6.4, 10.1, 12.8, 16.1, 20.3, 25.5] },
    { temperatureC: 50, serviceLifeYears: 10, pressuresBar: [2.5, 3.1, 3.9, 6.0, 6.3, 10.0, 12.6, 15.8, 19.9, 25.1] },
    { temperatureC: 50, serviceLifeYears: 25, pressuresBar: [2.4, 3.0, 3.8, 5.8, 6.1, 9.7, 12.3, 15.5, 19.5, 24.6] },
    { temperatureC: 50, serviceLifeYears: 50, pressuresBar: [2.4, 3.0, 3.8, 5.7, 6.0, 9.6, 12.1, 15.2, 19.2, 24.2] },
    { temperatureC: 50, serviceLifeYears: 100, pressuresBar: [2.3, 2.9, 3.7, 5.7, 5.9, 9.4, 11.9, 15.0, 18.9, 23.8] },

    { temperatureC: 60, serviceLifeYears: 1, pressuresBar: [2.2, 2.8, 3.5, 5.3, 5.6, 8.9, 11.2, 14.2, 17.8, 22.5] },
    { temperatureC: 60, serviceLifeYears: 5, pressuresBar: [2.1, 2.7, 3.4, 5.1, 5.4, 8.6, 10.8, 13.6, 17.1, 21.6] },
    { temperatureC: 60, serviceLifeYears: 10, pressuresBar: [2.1, 2.6, 3.3, 5.0, 5.3, 8.4, 10.6, 13.4, 16.8, 21.2] },
    { temperatureC: 60, serviceLifeYears: 25, pressuresBar: [2.0, 2.6, 3.2, 4.9, 5.2, 8.2, 10.4, 13.1, 16.5, 20.7] },
    { temperatureC: 60, serviceLifeYears: 50, pressuresBar: [2.0, 2.5, 3.2, 4.8, 5.1, 8.1, 10.2, 12.8, 16.2, 20.4] },

    { temperatureC: 70, serviceLifeYears: 1, pressuresBar: [1.8, 2.3, 3.0, 4.5, 4.7, 7.5, 9.4, 11.9, 15.0, 18.9] },
    { temperatureC: 70, serviceLifeYears: 5, pressuresBar: [1.8, 2.2, 2.8, 4.3, 4.5, 7.2, 9.1, 11.4, 14.4, 18.1] },
    { temperatureC: 70, serviceLifeYears: 10, pressuresBar: [1.7, 2.2, 2.8, 4.2, 4.4, 7.0, 8.9, 11.2, 14.1, 17.8] },
    { temperatureC: 70, serviceLifeYears: 25, pressuresBar: [1.7, 2.1, 2.7, 4.1, 4.3, 6.9, 8.7, 10.9, 13.8, 17.4] },
    { temperatureC: 70, serviceLifeYears: 50, pressuresBar: [1.7, 2.1, 2.7, 4.0, 4.2, 6.8, 8.5, 10.7, 13.5, 17.0] },

    { temperatureC: 80, serviceLifeYears: 1, pressuresBar: [1.5, 1.9, 2.5, 3.7, 3.9, 6.2, 7.9, 9.9, 12.5, 15.8] },
    { temperatureC: 80, serviceLifeYears: 5, pressuresBar: [1.5, 1.9, 2.3, 3.6, 3.7, 6.0, 7.5, 9.5, 12.0, 15.1] },
    { temperatureC: 80, serviceLifeYears: 10, pressuresBar: [1.4, 1.8, 2.3, 3.5, 3.7, 5.9, 7.4, 9.3, 11.7, 14.8] },
    { temperatureC: 80, serviceLifeYears: 25, pressuresBar: [1.4, 1.8, 2.2, 3.4, 3.6, 5.7, 7.2, 9.1, 11.4, 14.4] },

    { temperatureC: 95, serviceLifeYears: 1, pressuresBar: [1.1, 1.4, 1.8, 2.8, 2.9, 4.7, 5.9, 7.4, 9.4, 11.8] },
    { temperatureC: 95, serviceLifeYears: 5, pressuresBar: [1.1, 1.4, 1.7, 2.6, 2.8, 4.4, 5.6, 7.1, 8.9, 11.2] },
    { temperatureC: 95, serviceLifeYears: 10, conditional: true, pressuresBar: [1.1, 1.3, 1.7, 2.6, 2.7, 4.3, 5.5, 6.9, 8.7, 11.0] },
  ],
  source: 'KA-Katalog_GB_06-2025, S. 26-27',
};

export const SERVICE_LIFE_TABLES: Record<ServiceLifeTableId, ServiceLifeTable> = {
  'pp-r-sf-1.25': PP_R_SF_1_25,
  'pp-r-sf-1.5': PP_R_SF_1_5,
  'pp-rct-sf-1.25': PP_RCT_SF_1_25,
  'pp-rct-sf-1.5': PP_RCT_SF_1_5,
};

/* --- Auffaelligkeiten des Drucks ------------------------------------------
 *
 * Nichts davon ist hier ausgebessert. Der Katalog ist die maßgebliche Quelle;
 * eine stillschweigende Korrektur waere eine fuenfte, erfundene Datenfassung.
 *
 * 1. DOPPELTE TABELLENNUMMER. Der Katalog druckt „Table 5" zweimal: auf S. 24
 *    fuer PP-RCT mit SF = 1,25 und auf S. 26 fuer PP-RCT mit SF = 1,5. Eine
 *    „Table 6" gibt es nicht. Bei PP-R sind die beiden Sicherheitsbeiwerte
 *    dagegen sauber als Tabelle 2 und Tabelle 3 getrennt. Vermutlich ein
 *    Satzfehler auf S. 26; unterschieden werden die beiden hier ueber die id,
 *    nicht ueber die gedruckte Nummer. Bei K-Aqua rueckzufragen.
 *
 * 2. NORMBELEG FUER PP-RCT. Beide PP-RCT-Tabellen tragen denselben Beleg wie
 *    die PP-R-Tabellen: DIN 8077:2008-09. Ob diese Ausgabe PP-RCT bereits
 *    fuehrt, laesst sich am Katalog nicht erkennen — der Fliesstext auf S. 22
 *    schreibt, PP-RCT sei „recently" in EN ISO 15874 aufgenommen worden.
 *    Uebernommen wird der gedruckte Beleg. Ebenfalls rueckzufragen.
 *
 * 3. RAGGED GRID. Das Raster ist nicht rechteckig, und zwar in allen vier
 *    Tabellen gleich: 10-50 °C fuehren 1/5/10/25/50/100 Jahre, 60 und 70 °C
 *    enden bei 50 Jahren, 80 °C bei 25 Jahren, 95 °C bei 5 Jahren zuzueglich
 *    der geklammerten 10-Jahres-Zeile. Es fehlt also nichts — der Katalog
 *    weist fuer 80 und 95 °C schlicht keine 50- oder 100-Jahres-Werte aus.
 *    Deshalb wird nicht extrapoliert; die Zugriffe geben dort null zurueck.
 *
 * 4. GLEICHE WERTE IN AUFEINANDERFOLGENDEN ZEILEN. Etwa PP-RCT/SF 1,25 bei
 *    80 °C: 1 und 5 Jahre stehen beide auf 1,8 bar in Reihe S 20. Das tritt
 *    durchgehend in den flachen Bereichen auf und ist eine Folge der Rundung
 *    auf 0,1 bar, kein Fehler.
 *
 * 5. Geprueft und ohne Befund: In keiner der 1880 Zellen bricht ein Wert die
 *    Monotonie — nicht mit steigender Lebensdauer, nicht mit steigender
 *    Temperatur, nicht ueber die Spalten hinweg. Die Tabellenpaare gleichen
 *    Werkstoffs verhalten sich zueinander etwa wie 1,5 : 1,25, also 1,2 zu 1.
 *    „Etwa": Jede Tabelle ist einzeln auf 0,1 bar gerundet, nicht auseinander
 *    gerechnet. In den untersten Zeilen weicht das Verhaeltnis deshalb um bis
 *    zu einen Rundungsschritt ab — groesster Fall PP-R bei 95 °C, geklammerte
 *    10-Jahres-Zeile, Reihe S 16: 0,8 bar gegen 0,6 bar. Bei absoluten Werten
 *    unter 1 bar ist das die Aufloesung des Drucks, kein Widerspruch. */
export const TABLE_NUMBERING_NOTE =
  'Der Katalog druckt sowohl auf S. 24 (SF 1,25) als auch auf S. 26 (SF 1,5) „Table 5". Eine Table 6 existiert nicht.';

/** Waehlt die Tabelle. Werkstoff und Sicherheitsbeiwert bestimmen sie eindeutig. */
export function getServiceLifeTable(
  material: BimMaterialId,
  safetyFactor: SafetyFactor,
): ServiceLifeTable {
  if (material === 'PP-RCT') {
    return safetyFactor === 1.25 ? PP_RCT_SF_1_25 : PP_RCT_SF_1_5;
  }
  return safetyFactor === 1.25 ? PP_R_SF_1_25 : PP_R_SF_1_5;
}

/* SDR 17,6 und SDR 7,4 sind als Gleitkommazahl nicht exakt darstellbar. Ein
 * aus der Rohrreihe gerechneter SDR (2·S + 1) trifft den hier gespeicherten
 * Literalwert deshalb nicht zwingend bitgenau; ein Vergleich mit === wuerde
 * gerade bei diesen beiden Spalten gelegentlich danebengreifen. */
const NUMERIC_TOLERANCE = 1e-9;

/** Spaltenindex zu einem SDR. Null, wenn der Katalog die Reihe nicht fuehrt. */
export function columnIndexBySdr(sdr: number): number | null {
  const index = PIPE_SERIES_COLUMNS.findIndex(
    (column) => Math.abs(column.sdr - sdr) < NUMERIC_TOLERANCE,
  );
  return index < 0 ? null : index;
}

/** Spaltenindex zu einer Rohrreihe S. Null, wenn nicht gefuehrt. */
export function columnIndexByPipeSeries(s: number): number | null {
  const index = PIPE_SERIES_COLUMNS.findIndex(
    (column) => Math.abs(column.s - s) < NUMERIC_TOLERANCE,
  );
  return index < 0 ? null : index;
}

/** Die unbedingt geltende Zeile zu Temperatur und Lebensdauer, oder null.
 *  Geklammerte Zeilen bleiben ausgeschlossen — siehe `conditionalRow`. */
export function findRow(
  table: ServiceLifeTable,
  temperatureC: number,
  serviceLifeYears: number,
): ServiceLifeRow | null {
  return (
    table.rows.find(
      (row) =>
        row.temperatureC === temperatureC &&
        row.serviceLifeYears === serviceLifeYears &&
        row.conditional === undefined,
    ) ?? null
  );
}

/** Zulaessiger Betriebsdruck in bar, wie gedruckt. Null, wenn die Kombination
 *  im Katalog fehlt — es wird weder interpoliert noch extrapoliert. Das ist
 *  der Zugang, den Planungsdaten benutzen sollten: IFC-Merkmale, Datenblatt,
 *  technisches Handbuch. */
export function allowablePressureBar(
  table: ServiceLifeTable,
  temperatureC: number,
  serviceLifeYears: number,
  sdr: number,
): number | null {
  const column = columnIndexBySdr(sdr);
  if (column === null) return null;
  const row = findRow(table, temperatureC, serviceLifeYears);
  return row?.pressuresBar[column] ?? null;
}

/** Die geklammerte Zeile mitsamt ihrer Bedingung. Getrennt gefuehrt, weil ihre
 *  Werte ohne den Nachweis nach CONDITIONAL_ROW_CONDITION nicht gelten und
 *  daher nie unbemerkt in eine Auslegung wandern duerfen. */
export function conditionalRow(
  table: ServiceLifeTable,
  temperatureC: number,
  serviceLifeYears: number,
): { row: ServiceLifeRow; conditionDe: string; conditionEn: string } | null {
  const row = table.rows.find(
    (candidate) =>
      candidate.temperatureC === temperatureC &&
      candidate.serviceLifeYears === serviceLifeYears &&
      candidate.conditional === true,
  );
  if (row === undefined) return null;
  return {
    row,
    conditionDe: CONDITIONAL_ROW_CONDITION.de,
    conditionEn: CONDITIONAL_ROW_CONDITION.en,
  };
}

/** Die gedruckten Temperaturen einer Tabelle, in Reihenfolge des Drucks. */
export function printedTemperaturesC(table: ServiceLifeTable): number[] {
  const seen: number[] = [];
  for (const row of table.rows) {
    if (!seen.includes(row.temperatureC)) seen.push(row.temperatureC);
  }
  return seen;
}

/** Die unbedingt gefuehrten Lebensdauern zu einer Temperatur. Leer, wenn die
 *  Temperatur nicht gedruckt ist. Das Raster ist nicht rechteckig (Punkt 3
 *  oben), deshalb muss diese Liste je Temperatur abgefragt werden. */
export function printedServiceLifeYears(
  table: ServiceLifeTable,
  temperatureC: number,
): number[] {
  return table.rows
    .filter((row) => row.temperatureC === temperatureC && row.conditional === undefined)
    .map((row) => row.serviceLifeYears);
}
