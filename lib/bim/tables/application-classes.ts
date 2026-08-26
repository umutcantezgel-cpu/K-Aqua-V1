/* Anwendungsklassen nach DIN EN ISO 15874-1.
 *
 * QUELLE: KA-Katalog_GB_06-2025_NEU.pdf, Seite 51, Abschnitt 4.5 „Operation
 * Conditions", Figure 3. Seite gerendert und von Hand uebertragen.
 *
 * Diese Tabelle beantwortet die Frage, die ein TGA-Planer als erstes an ein
 * Rohrsystem stellt: Welchen Betriebsdruck darf ich bei welcher Temperatur
 * ueber welche Lebensdauer ansetzen? Sie speist `Pset_KAqua_Application` in
 * jeder erzeugten IFC-Datei und die Seite /ressourcen/technik/anwendungsklassen.
 *
 * Zur Nummerierung: Der Katalog fuehrt die Klassen 1, 2, 4 und 5. Klasse 3
 * fehlt nicht versehentlich — sie ist in DIN EN ISO 15874-1 fuer
 * Niedertemperatur-Fussbodenheizung vorgesehen und wird von K-Aqua nicht
 * gesondert ausgewiesen, weil Klasse 4 sie abdeckt. Es wird hier nichts
 * ergaenzt, was der Katalog nicht fuehrt. */

/** Ein Temperaturabschnitt des Betriebskollektivs. */
export interface TemperatureSegment {
  /** Betriebstemperatur in °C. */
  temperatureC: number;
  /** Dauer in Jahren, ueber die diese Temperatur anliegt. */
  years: number;
}

export interface ApplicationClass {
  /** Klassennummer nach DIN EN ISO 15874-1. */
  id: 1 | 2 | 4 | 5;
  /** Auslegungstemperatur T_D in °C. Bei mehrstufigen Klassen der Hoechstwert. */
  designTemperatureC: number;
  /** Betriebsdauer bei T_D in Jahren. Null bei mehrstufigem Kollektiv. */
  designServiceLifeYears: number | null;
  /** Das vollstaendige Betriebskollektiv. Einstufige Klassen fuehren einen Eintrag. */
  collective: TemperatureSegment[];
  /** T_max in °C — hoechste betriebsmaessige Temperatur. */
  maxTemperatureC: number;
  /** Betriebsdauer bei T_max in Jahren. */
  maxServiceLifeYears: number;
  /** T_mal in °C — Stoerfalltemperatur, hoechstens 100 °C. */
  malfunctionTemperatureC: number;
  /** Zulaessige Gesamtdauer bei T_mal in Stunden, ueber die Lebensdauer. */
  malfunctionServiceLifeHours: number;
  applicationDe: string;
  applicationEn: string;
  /** Zulaessiger Betriebsdruck p_D in bar, PP-R-Rohrsystem SDR 6. */
  pressurePpRSdr6Bar: number;
  /** Zulaessiger Betriebsdruck p_D in bar, PP-RCT-Rohrsystem SDR 7,4. */
  pressurePpRctSdr74Bar: number;
}

export const APPLICATION_CLASSES: ApplicationClass[] = [
  {
    id: 1,
    designTemperatureC: 60,
    designServiceLifeYears: 49,
    collective: [{ temperatureC: 60, years: 49 }],
    maxTemperatureC: 80,
    maxServiceLifeYears: 1,
    malfunctionTemperatureC: 95,
    malfunctionServiceLifeHours: 100,
    applicationDe: 'Warmwasserversorgung (60 °C)',
    applicationEn: 'Hot water supply (60 °C)',
    pressurePpRSdr6Bar: 10,
    pressurePpRctSdr74Bar: 10,
  },
  {
    id: 2,
    designTemperatureC: 70,
    designServiceLifeYears: 49,
    collective: [{ temperatureC: 70, years: 49 }],
    maxTemperatureC: 80,
    maxServiceLifeYears: 1,
    malfunctionTemperatureC: 95,
    malfunctionServiceLifeHours: 100,
    applicationDe: 'Warmwasserversorgung (70 °C)',
    applicationEn: 'Hot water supply (70 °C)',
    pressurePpRSdr6Bar: 8,
    pressurePpRctSdr74Bar: 10,
  },
  {
    id: 4,
    designTemperatureC: 60,
    designServiceLifeYears: null,
    collective: [
      { temperatureC: 20, years: 2.5 },
      { temperatureC: 40, years: 20 },
      { temperatureC: 60, years: 25 },
    ],
    maxTemperatureC: 70,
    maxServiceLifeYears: 2.5,
    malfunctionTemperatureC: 100,
    malfunctionServiceLifeHours: 100,
    applicationDe: 'Fußbodenheizung und Niedertemperatur-Heizkörperanschlüsse',
    applicationEn: 'Floor heating and low temperature radiator connections',
    pressurePpRSdr6Bar: 10,
    pressurePpRctSdr74Bar: 10,
  },
  {
    id: 5,
    designTemperatureC: 80,
    designServiceLifeYears: null,
    collective: [
      { temperatureC: 20, years: 14 },
      { temperatureC: 60, years: 25 },
      { temperatureC: 80, years: 10 },
    ],
    maxTemperatureC: 90,
    maxServiceLifeYears: 1,
    malfunctionTemperatureC: 100,
    malfunctionServiceLifeHours: 100,
    applicationDe: 'Heizkörperanschlüsse mit hoher Temperatur',
    applicationEn: 'High temperature radiator connections',
    pressurePpRSdr6Bar: 6,
    pressurePpRctSdr74Bar: 8,
  },
];

/* Anmerkungen des Katalogs, woertlich sinngemaess uebertragen. Sie gehoeren
 * zur Tabelle: ohne sie ist die Tabelle nicht richtig lesbar. */
export const APPLICATION_CLASS_NOTES = {
  /* Fussnote a) zu Klasse 1 und 2 */
  nationalChoiceDe:
    'Je nach nationaler Regelung ist entweder Anwendungsklasse 1 oder Anwendungsklasse 2 zu wählen.',
  nationalChoiceEn:
    'Pertinent to the national regulations either application class 1 or application class 2 may be selected.',

  /* Fussnote b) zu Klasse 4 und 5 */
  collectiveDe:
    'Liegt für einen Anwendungsbereich mehr als eine Betriebstemperatur vor, sind die zugehörigen Betriebsdauern zu addieren. Das Temperaturkollektiv der Klasse 5 über 50 Jahre besteht aus 14 Jahren bei 20 °C, 25 Jahren bei 60 °C, 10 Jahren bei 80 °C, 1 Jahr bei 90 °C und 100 Stunden bei 100 °C.',
  collectiveEn:
    'If there is more than one operational temperature for one application area the corresponding service life time should be summed. The temperature collective for class 5 over 50 years consists of 14 years at 20 °C, 25 years at 60 °C, 10 years at 80 °C, 1 year at 90 °C and 100 h at 100 °C.',

  /* Erlaeuterung zu T_mal */
  malfunctionDe:
    'T_mal ist die höchste zulässige Temperatur, etwa bei Ausfall der Regelung, maximal 100 °C. Die zulässigen 100 Stunden gelten über 50 Jahre; ein einzelner Störfall soll 3 Stunden nicht überschreiten.',
  malfunctionEn:
    'T_mal indicates the highest allowed temperature, for example at disruption of the controlling, max 100 °C. The 100 h apply over 50 years, whereas single breakdown segments should not exceed 3 hours.',

  /* REMARK des Katalogs */
  remarkDe:
    'Die Norm gilt nicht, wenn für T_D, T_max oder T_mal höhere Werte angesetzt werden als in der Tabelle angegeben.',
  remarkEn:
    'This norm does not apply when higher values are assigned to T_D, T_max and T_mal than those quoted on the table.',

  /* Einleitungssatz zu den Druckstufen */
  pressureRangeDe:
    'Für jede Anwendungsklasse gilt je nach Anwendung ein zulässiger Betriebsdruck p_D von 4 bar, 6 bar, 8 bar oder 10 bar.',
  pressureRangeEn:
    'For each application class an allowable operating pressure p_D of 4 bar, 6 bar, 8 bar or 10 bar applies, depending on the application.',
} as const;

/** Umrechnung, wie sie der Katalog auf S. 51 in der Fussnote angibt:
 *  1 bar = 10⁵ N/m² = 0,01 MPa. */
export const BAR_TO_MPA = 0.01;

export function getApplicationClass(id: 1 | 2 | 4 | 5): ApplicationClass | undefined {
  return APPLICATION_CLASSES.find((c) => c.id === id);
}

/** Zulaessiger Betriebsdruck fuer einen Werkstoff in einer Anwendungsklasse.
 *  Der Katalog weist die Druecke nur fuer die beiden Leitkombinationen aus —
 *  PP-R in SDR 6 und PP-RCT in SDR 7,4. Fuer andere SDR-Stufen fuehrt er
 *  keinen Wert, und es wird hier auch keiner gerechnet: Zeitstandverhalten
 *  laesst sich nicht linear ueber SDR skalieren. Rueckgabe dann null. */
export function allowablePressureBar(
  classId: 1 | 2 | 4 | 5,
  material: 'PP-R' | 'PP-RCT',
  sdr: number,
): number | null {
  const cls = getApplicationClass(classId);
  if (!cls) return null;
  if (material === 'PP-R' && sdr === 6) return cls.pressurePpRSdr6Bar;
  if (material === 'PP-RCT' && sdr === 7.4) return cls.pressurePpRctSdr74Bar;
  return null;
}
