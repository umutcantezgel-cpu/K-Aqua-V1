/* Schweissparameter des K-Aqua-Rohrleitungssystems — Muffenschweissung,
 * Heizelementstumpfschweissung, Elektroschweissung.
 *
 * QUELLE: KA-Katalog_GB_06-2025_NEU.pdf, Kapitel 3 „Welding".
 * Alle Seiten wurden gerendert und die Werte Zeile fuer Zeile abgelesen; die
 * Textebene des PDF wurde nicht als Wertequelle benutzt.
 *
 * AUSGEWERTET:
 *   S. 40 — 3.1 bis 3.4.2: Schweissgeraete, Ablauf der Muffenschweissung,
 *           Heizelementtemperatur 260 °C ± 10 °C.
 *   S. 41 — Table A: Muffenschweissung, 10 Zeilen d20 bis d125.
 *           Ausserdem der Kaeltehinweis (< +5 °C → Anwaermzeit + 50 %).
 *   S. 42 — 3.5: Arbeitsschritte an der Muffenschweissmaschine AQ988125.
 *   S. 43 — 3.6: Reparatur eines Rohrlochs (15 s anwaermen, 5 min abkuehlen).
 *   S. 44 — 3.7: Elektroschweissung mit AQ990. KEINE Parametertabelle.
 *   S. 45 — 3.8: Stumpfschweissmaschine AQ989250, Anwendungsbereich d90…d250,
 *           Ablaufdiagramm (Begriffe, keine Zahlen).
 *   S. 46 — Bildstrecke Butt Fusion, Fig. 1 bis 15. Nur ein Satz Flieftext.
 *   S. 47 — Butt-Fusion-Ablauf im Text: 210 °C ± 10 °C, Anwaermdruck
 *           ≤ 0,01 N/mm², Fuegedruck 0,10 N/mm², Versatz ≤ 0,1 × s.
 *   S. 48 — Table 1 (Spaltbreiten, 5 Zeilen) und Table 2 (Stumpfschweiss-
 *           parameter OMISA SP, 6 Zeilen).
 *
 * NICHT AUSGEWERTET:
 *   S. 49 — Kapiteltrenner „4 Installation" mit Inhaltsverzeichnis. Keine Daten.
 *
 * Die Elektroschweissung hat in diesem Kapitel bewusst keine Zahlentabelle:
 * der Katalog verweist auf den Strichcode der Muffe (siehe
 * ELECTROFUSION_PARAMETER_SOURCE). Hier wird deshalb nichts gefuehrt.
 *
 * Verwendet in `Pset_KAqua_Welding` jeder erzeugten IFC-Verbindungsdatei und
 * auf /ressourcen/technik/schweissen. */

export type WeldingProcessId =
  | 'socket-fusion'
  | 'butt-fusion'
  | 'electrofusion'
  | 'hole-repair';

/* --- 1. Muffenschweissung (Table A, S. 41) -------------------------------- */

export interface SocketWeldingRow {
  /** Rohraussendurchmesser in mm; der Katalog beschriftet die Spalte „Pipe ⌀". */
  dMm: number;
  /** „Heating-up time" — Anwaermzeit am Heizelement. */
  heatingTimeS: number;
  /** „Processing time" — Umstell- und Fuegezeit zusammen; der Katalog trennt
   *  beide nicht auf. */
  processingTimeS: number;
  /** „Cooling-down time" — bis der Stoss mechanisch belastet werden darf. */
  coolingTimeMin: number;
  /** „Welding depth" — Einstecktiefe, zugleich das Mass fuer die Markierung
   *  auf dem Rohr. */
  weldingDepthMm: number;
}

/** Einheiten der Spalten von Table A, ausgeschrieben fuer IFC und Handbuch. */
export const SOCKET_WELDING_UNITS = {
  dMm: 'mm',
  heatingTimeS: 's',
  processingTimeS: 's',
  coolingTimeMin: 'min',
  weldingDepthMm: 'mm',
} as const;

export interface SocketWeldingTable {
  id: 'table-a';
  titleEn: string;
  /** Solltemperatur des Heizelements (S. 40, Abschnitt 3.4.1). */
  heatingElementTemperatureC: number;
  /** Zulaessige Abweichung in Kelvin, im Katalog als „±10° C" gedruckt. */
  heatingElementToleranceK: number;
  rows: SocketWeldingRow[];
  source: string;
}

/* Table A, S. 41. Deckt genau die Groessen ab, die polyfusionsgeschweisst
 * werden — d16 fehlt, obwohl der Katalog d16-Rohre fuehrt. Wird nicht
 * ergaenzt, siehe WELDING_ANOMALIES. */
export const SOCKET_WELDING_TABLE_A: SocketWeldingTable = {
  id: 'table-a',
  titleEn: 'Table A',
  heatingElementTemperatureC: 260,
  heatingElementToleranceK: 10,
  rows: [
    { dMm: 20, heatingTimeS: 5, processingTimeS: 4, coolingTimeMin: 2, weldingDepthMm: 14 },
    { dMm: 25, heatingTimeS: 7, processingTimeS: 4, coolingTimeMin: 2, weldingDepthMm: 15 },
    { dMm: 32, heatingTimeS: 8, processingTimeS: 6, coolingTimeMin: 4, weldingDepthMm: 17 },
    { dMm: 40, heatingTimeS: 12, processingTimeS: 6, coolingTimeMin: 4, weldingDepthMm: 18 },
    { dMm: 50, heatingTimeS: 18, processingTimeS: 6, coolingTimeMin: 4, weldingDepthMm: 20 },
    { dMm: 63, heatingTimeS: 24, processingTimeS: 8, coolingTimeMin: 6, weldingDepthMm: 26 },
    { dMm: 75, heatingTimeS: 30, processingTimeS: 8, coolingTimeMin: 6, weldingDepthMm: 29 },
    { dMm: 90, heatingTimeS: 40, processingTimeS: 8, coolingTimeMin: 6, weldingDepthMm: 32 },
    { dMm: 110, heatingTimeS: 50, processingTimeS: 10, coolingTimeMin: 8, weldingDepthMm: 35 },
    { dMm: 125, heatingTimeS: 60, processingTimeS: 10, coolingTimeMin: 8, weldingDepthMm: 41 },
  ],
  source: 'KA-Katalog_GB_06-2025, S. 41',
};

/** Kaeltezuschlag auf die Anwaermzeit. Der Katalog druckt die Regel unter
 *  Table A aus, ohne eine zweite Zahlentabelle: „If welding is to be carried
 *  out outdoors when the temperature is below +5° C, the heating up time in
 *  acc. with DVS 2207 Part 11 should be increased by 50 %."
 *  Faktor, nicht Prozentwert — 1,5 bedeutet Anwaermzeit mal 1,5. */
export const SOCKET_WELDING_COLD_WEATHER = {
  /** Ab dieser Umgebungstemperatur abwaerts gilt der Zuschlag. */
  thresholdC: 5,
  factor: 1.5,
  standard: 'DVS 2207-11',
  source: 'KA-Katalog_GB_06-2025, S. 41',
} as const;

/* --- 2. Heizelementstumpfschweissung, Spaltbreiten (Table 1, S. 48) ------- */

export interface ButtWeldingGapRow {
  /** Durchmesserbereich wortgleich wie gedruckt, z. B. „400… < 630". */
  dRangeLabelEn: string;
  /** Untere Bereichsgrenze in mm. Null = nach unten offen. */
  dMinMm: number | null;
  /** True, wenn die untere Grenze zum Bereich gehoert. */
  dMinInclusive: boolean;
  /** Obere Bereichsgrenze in mm. Null = nach oben offen. */
  dMaxMm: number | null;
  /** True bei „≤", false bei „<". */
  dMaxInclusive: boolean;
  /** Groesster zulaessiger Spalt zwischen den geplanten Fuegeflaechen. */
  gapWidthMm: number;
  /** „Panel width", wortgleich wie gedruckt. Null, wo die Zelle leer ist —
   *  der Katalog laesst sie fuer d ≤ 355 aus. */
  panelWidthLabelEn: string | null;
}

export const BUTT_WELDING_GAP_UNITS = {
  dMm: 'mm',
  gapWidthMm: 'mm',
  panelWidthMm: 'mm',
} as const;

/* Table 1, S. 48 — „Maximum Gap Widths between the Machined Welding Faces".
 * Allgemeine Tabelle nach DVS 2207-1; sie reicht bis d > 1000 mm und damit
 * weit ueber das K-Aqua-Programm hinaus (Stumpfschweissmaschine AQ989250:
 * d90 bis d250, S. 45). Der Ueberhang wird uebernommen, nicht beschnitten. */
export const BUTT_WELDING_GAP_WIDTHS: ButtWeldingGapRow[] = [
  {
    dRangeLabelEn: '≤ 355',
    dMinMm: null,
    dMinInclusive: false,
    dMaxMm: 355,
    dMaxInclusive: true,
    gapWidthMm: 0.5,
    panelWidthLabelEn: null,
  },
  {
    dRangeLabelEn: '400… < 630',
    dMinMm: 400,
    dMinInclusive: true,
    dMaxMm: 630,
    dMaxInclusive: false,
    gapWidthMm: 1.0,
    panelWidthLabelEn: '≤ 1,500',
  },
  {
    dRangeLabelEn: '630… < 800',
    dMinMm: 630,
    dMinInclusive: true,
    dMaxMm: 800,
    dMaxInclusive: false,
    gapWidthMm: 1.3,
    panelWidthLabelEn: '> 1,500 ≤ 2,000',
  },
  {
    dRangeLabelEn: '800… ≤ 1,000',
    dMinMm: 800,
    dMinInclusive: true,
    dMaxMm: 1000,
    dMaxInclusive: true,
    gapWidthMm: 1.5,
    panelWidthLabelEn: '> 2,000 ≤ 2,300',
  },
  {
    dRangeLabelEn: '> 1,000',
    dMinMm: 1000,
    dMinInclusive: false,
    dMaxMm: null,
    dMaxInclusive: false,
    gapWidthMm: 2.0,
    panelWidthLabelEn: '> 2,300 ≤ 3,000',
  },
];

/* --- 3. Heizelementstumpfschweissung, Parameter (Table 2, S. 48) ---------- */

export interface ButtWeldingParameterRow {
  /** Aussendurchmesser. Der Katalog setzt die Zelle nur in jeder zweiten Zeile
   *  und laesst sie fuer die SDR-11-Zeile leer; hier ist sie ausgeschrieben. */
  dMm: number;
  sdr: number;
  /** „Merging pressure" — Angleich- bzw. Fuegedruck am Maschinenmanometer. */
  mergingPressureBar: number;
  /** „Bead height" — Wulsthoehe am Ende des Angleichens. */
  beadHeightMm: number;
  /** „Heating time" — Anwaermzeit bei abgesenktem Druck. */
  heatingTimeS: number;
  /** „Welding pressure" — Druck waehrend Fuegen und Abkuehlen. */
  weldingPressureBar: number;
  coolingTimeMin: number;
}

export const BUTT_WELDING_PARAMETER_UNITS = {
  dMm: 'mm',
  sdr: '—',
  mergingPressureBar: 'bar',
  beadHeightMm: 'mm',
  heatingTimeS: 's',
  weldingPressureBar: 'bar',
  coolingTimeMin: 'min',
} as const;

/* Table 2, S. 48 — „Parameters for Welding Machines Type OMISA SP".
 *
 * Die Druecke sind Manometerdruecke der Hydraulik in bar und damit eine andere
 * Groesse als die Flaechenpressungen im Flieftext auf S. 47 (Anwaermen
 * ≤ 0,01 N/mm², Fuegen 0,10 N/mm²). Beide Angaben stehen nebeneinander, sie
 * widersprechen sich nicht — sie beziehen sich auf verschiedene Bezugsflaechen.
 * Deshalb sind die Flaechenpressungen getrennt in BUTT_WELDING_SETPOINTS
 * gefuehrt. */
export const BUTT_WELDING_PARAMETERS: ButtWeldingParameterRow[] = [
  {
    dMm: 160,
    sdr: 17,
    mergingPressureBar: 8,
    beadHeightMm: 1,
    heatingTimeS: 147,
    weldingPressureBar: 8,
    coolingTimeMin: 16,
  },
  {
    dMm: 160,
    sdr: 11,
    mergingPressureBar: 13,
    beadHeightMm: 1,
    heatingTimeS: 225,
    weldingPressureBar: 13,
    coolingTimeMin: 24,
  },
  {
    dMm: 200,
    sdr: 17,
    mergingPressureBar: 13,
    beadHeightMm: 1,
    heatingTimeS: 180,
    weldingPressureBar: 13,
    coolingTimeMin: 20,
  },
  {
    dMm: 200,
    sdr: 11,
    mergingPressureBar: 20,
    beadHeightMm: 1,
    heatingTimeS: 290,
    weldingPressureBar: 20,
    coolingTimeMin: 30,
  },
  {
    dMm: 250,
    sdr: 17,
    mergingPressureBar: 21,
    beadHeightMm: 1,
    heatingTimeS: 217,
    weldingPressureBar: 21,
    coolingTimeMin: 24,
  },
  // Wulsthoehe hier als „1,5" gedruckt — mit Komma, waehrend Table 1 auf
  // derselben Seite Punkte setzt. Der Wert ist eindeutig 1,5 mm.
  {
    dMm: 250,
    sdr: 11,
    mergingPressureBar: 32,
    beadHeightMm: 1.5,
    heatingTimeS: 313,
    weldingPressureBar: 32,
    coolingTimeMin: 35,
  },
];

export const BUTT_WELDING_PARAMETERS_SOURCE = 'KA-Katalog_GB_06-2025, S. 48';

/** Sollwerte der Stumpfschweissung aus dem Flieftext, S. 47. Sie gelten fuer
 *  alle Zeilen von Table 2 und stehen dort nicht als Spalte. */
export const BUTT_WELDING_SETPOINTS = {
  /** „Check the heated tool temperature (210 ± 10° C)". */
  heatedToolTemperatureC: 210,
  heatedToolToleranceK: 10,
  /** „Heating-up at a reduced pressure ≤ 0.01 N/mm²" — Obergrenze. */
  maxHeatingPressureNPerMm2: 0.01,
  /** „A bead must exist after the joining at a pressure of 0.10 N/mm²". */
  joiningPressureNPerMm2: 0.1,
  /** „Check the misalignment (max. 0.1 x wall thickness)" — Faktor auf s.
   *  Unter Table 2 auf S. 48 dieselbe Angabe mit Komma: „0,1 x wall
   *  thickness (s)". Gleicher Wert, nur andere Schreibweise. */
  maxMisalignmentFactorOfWallThickness: 0.1,
  units: {
    temperature: '°C',
    tolerance: 'K',
    pressure: 'N/mm²',
  },
  source: 'KA-Katalog_GB_06-2025, S. 47',
} as const;

/** Anwendungsbereich der Stumpfschweissmaschine, S. 45. Begrenzt, wofuer
 *  Table 2 ueberhaupt gedacht ist. */
export const BUTT_WELDING_MACHINE = {
  articleNo: 'AQ989250',
  materialsEn: 'PP-R / PP-RCT',
  dMinMm: 90,
  dMaxMm: 250,
  source: 'KA-Katalog_GB_06-2025, S. 45',
} as const;

/* --- 4. Elektroschweissung (S. 44) --------------------------------------- */

/** Der Katalog fuehrt fuer die Elektroschweissung keine Parametertabelle.
 *  Die Schweissdaten kommen vom Strichcode der Muffe oder werden von Hand
 *  nach diesem Etikett eingegeben. Es gibt hier deshalb nichts abzuleiten —
 *  jede Zahl waere erfunden. */
export const ELECTROFUSION_PARAMETER_SOURCE = {
  process: 'electrofusion' as const,
  hasCatalogueTable: false,
  machine: 'AQ990',
  /** Handschaber, im Text mit Artikelnummer genannt. */
  scraperArticleNo: 'AQ974',
  noteDe:
    'Schweissdaten stehen auf dem Strichcode-Etikett der Muffe. Sie werden ' +
    'mit dem Scanner eingelesen oder nach demselben Etikett von Hand ' +
    'eingegeben. Der Katalog druckt keine Anwaerm-, Umstell- oder ' +
    'Abkuehlzeiten fuer dieses Verfahren.',
  source: 'KA-Katalog_GB_06-2025, S. 44',
};

/* --- 5. Lochreparatur (S. 43) -------------------------------------------- */

/** Einzige Zahlenangaben des Abschnitts 3.6. */
export const HOLE_REPAIR = {
  patchArticleNos: ['AQ5937', 'AQ59311'],
  /** „Heat up the borehole and the welding plugs with the repair set for
   *  15 seconds". */
  heatingTimeS: 15,
  /** „After a cooling time of 5 minutes, remove the protruding end". */
  coolingTimeMin: 5,
  units: { time: 's', coolingTime: 'min' },
  source: 'KA-Katalog_GB_06-2025, S. 43',
} as const;

/* --- 6. Verfahrensschritte im Wortlaut ------------------------------------
 *
 * Der Katalog liegt hier als englische Fassung („GB") vor und beschreibt die
 * Ablaeufe als Flieftext mit (Fig. n)-Verweisen, NICHT als nummerierte Liste.
 * Deshalb:
 *   - `paragraphsEn` gibt die Absaetze in gedruckter Reihenfolge wortgleich
 *     wieder, samt der Tippfehler des Katalogs („Afterwords", „Allign",
 *     „It`s"). Sie werden nicht stillschweigend berichtigt.
 *     („Permissable" stand hier ebenfalls in der Aufzaehlung, kommt in den
 *     uebernommenen Absaetzen aber nicht vor: das Wort steht gedruckt nur in
 *     der Zeile unter Table 2 auf S. 48, und die ist nicht als Text
 *     uebernommen. Bei der Gegenprobe aufgefallen und entfernt — eine
 *     Zusicherung, die der Inhalt nicht deckt, ist schlimmer als keine.)
 *   - `paragraphsDe` ist null. Eine deutsche Fassung ist in diesem Dokument
 *     nicht gedruckt; eine Uebersetzung waere eine eigene Textfassung und
 *     gehoert redaktionell freigegeben, nicht hierher.
 *   - `numberedInCatalogue` ist ueberall false. Wer im Handbuch nummerierte
 *     Schritte braucht, muss sie bewusst schneiden — sie stehen so nicht im
 *     Katalog. */

export interface WeldingProcedure {
  process: WeldingProcessId;
  /** Abschnittsnummer und -ueberschrift, wie gedruckt. */
  sectionEn: string;
  paragraphsEn: string[];
  paragraphsDe: string[] | null;
  numberedInCatalogue: boolean;
  source: string;
}

export const WELDING_PROCEDURES: WeldingProcedure[] = [
  {
    process: 'socket-fusion',
    sectionEn: '3.4 Welding Procedure',
    paragraphsEn: [
      'The K-Aqua pipework is coupled by socket fusion. The welded pipes and fittings have a longitudinally overlapping connection. The heating of the pipes’ ends and fitting faucets is done by a heating element with bushes. After the necessary welding temperature is reached, the joining process is done. The pipe and fitting faucets diameters, as well as the respective heating bush diameters, are matched to build up the necessary pressure during the jointing process. The heating element is electrically heated. It complies with DVS Directive 2208 part 1 in construction and accuracy.',
      '3.4.1 Preparations: Cut the pipe using a pipe cutter that is suitable for plastic pipes (Fig. 1). The pipe end and fitting faucet, to be thoroughly cleaned with absorbent paper. Second, marking the bush depth on the pipe (Fig. 2) while bringing the heating element to 260° C (remember that the temperature tolerance is ±10° C) by checking the integrated thermometer on the heating element. Otherwise the temperature must be controlled and measured by an appropriate measuring device.',
      'Note: Must not start heating the joint parts before reaching the set temperature of 260° C. Also cleaning the mandrel and bush before each use.',
      '3.4.2 Welding: Starting with pushing the pipe and fitting ends, quickly and axially, up to the stop of the mandrel and the marked insertion depth (Fig. 3), respectively fast without torsion. The heating of the joint faces is done according to the table A. When the heating period is up, the pipe and fitting ends are pulled abruptly from the heating element (Fig. 4) and joined immediately without torsion, minding the correct insertion depth (Fig. 5 and 6).',
      'Note: We recommend fixing the two joint parts again for a certain time (the heating period). Do not expose the welded joint to mechanical stress until the cooling period is done.',
      'Note: If welding is to be carried out outdoors when the temperature is below +5° C, the heating up time in acc. with DVS 2207 Part 11 should be increased by 50 %.',
    ],
    paragraphsDe: null,
    numberedInCatalogue: false,
    source: 'KA-Katalog_GB_06-2025, S. 40-41',
  },
  {
    process: 'socket-fusion',
    sectionEn: '3.5 Socket Welding Machine Article AQ988125 - working steps welding together',
    paragraphsEn: [
      'Socket welding machine equipped with movement slides on which prismatic clamps are placed to allow an automatic self-centering of any kinds of pipes and fittings. The socket welding machine is delivered in a metal transport box.',
      'Select the pipe/fittings diameter (Fig. 1) and adjust the position of the slides (Fig. 2). Press the fitting into the clamping tool up to the stop and fix it (Fig. 3). Adjust the stop to hold the fitting. Allign the pipe axially into the fitting (Fig. 4). Check the welding plate temperature and adjust it if necessary. Move the welding plate between pipe and fitting (Fig. 5). Slide the pipe and fitting at the same time into the heating tools (Fig. 6) up to the stop.',
      'Hold this position for the heating-up time acc. to Table A (see page 41). After the heating-up time is reached move the slide back, move out the welding plate and join the pipe and fitting rapidly together (Fig. 7, 8, 9) moving the slide up to the stop. Remove the welding joint after the end of the cooling time from the clamping jaws.',
    ],
    paragraphsDe: null,
    numberedInCatalogue: false,
    source: 'KA-Katalog_GB_06-2025, S. 42',
  },
  {
    process: 'hole-repair',
    sectionEn: '3.6 Hole Repair in case of Damaged Pipe',
    paragraphsEn: [
      'In case a K-Aqua pipe is damaged, it is possible to be repaired, using a special tool, mounted on the polyfusion device with a special repair patch (type AQ5937/AQ59311).',
      'Note: The repaired part can work again under pressure.',
      'Mark the degree of the push-in depth (wall thickness) on the repair plug (Fig. 1). Distance tool to be fixed according to the wall thickness of the pipe and tighten the screw. Heat up the borehole and the welding plugs with the repair set for 15 seconds (Fig. 2).',
      'After removing the welding device, set in the repair plug precisely without twisting it (Fig. 3). After a cooling time of 5 minutes, remove the protruding end of the repair plug (Fig. 4).',
    ],
    paragraphsDe: null,
    numberedInCatalogue: false,
    source: 'KA-Katalog_GB_06-2025, S. 43',
  },
  {
    process: 'electrofusion',
    sectionEn: '3.7 Electrofusion Welding with Electrofusion Machine Type AQ990',
    paragraphsEn: [
      'Cut the pipe properly in rectangularly position. Afterwords remove the oxidation layer in the welding area. Use a hand scraper (code AQ974) or a rotary scraper (Fig. 1). Once the surface is scraped properly (Fig. 2) clean the pipe surface and the inside coupler with absorbent, lint-free and non-dyed paper (Fig. 3). Mark the depth of the coupler (Fig. 4 and 5). Slide in the coupler up to the marked position on the pipe. It`s recommended to secure the pipe against dislocation, e.g. with a pipe clamp (Fig. 6). Connect the cables to the contact pins of the coupler (Fig. 7) and start welding process (Fig. 8).',
      'You can neither insert the datas manually acc. to the datas mentioned on the barcode label of the socket or you can use the barcode reader (Fig. 9). Afterwords proceed with the welding following the steps mentioned on the welding machine (Fig. 10 and 11). At the end of the welding cycle (Fig. 12) wait for the cooling time. After the cooling time you can stress the electrofusion joint to the permissible operation pressure.',
    ],
    paragraphsDe: null,
    numberedInCatalogue: false,
    source: 'KA-Katalog_GB_06-2025, S. 44',
  },
  {
    process: 'butt-fusion',
    sectionEn: 'Butt Fusion welding procedure',
    paragraphsEn: [
      'Create permissible working conditions.',
      'Align and clamp the parts to be welded, e. g. with dollies (Fig. 1). Clean the joining faces beyond the welding area with a cleaning agent with unused, absorbent, non-fraying and non-dyed paper. Machine the joining faces, e.g. in the case of pipes using a plane (Fig. 2, 3, 4). After planing the pipe ends take out the plane (Fig. 5) and remove the chips from the welding area without touching the joining faces (Fig. 6, 7). Check the plane parallelism by moving the joining faces together (max. gap width according to Table 1), (Fig. 8). Check the misalignment (max. 0.1 x wall thickness), (Fig. 9, 10). Check the heated tool temperature (210 ± 10° C), (Fig. 11). Clean the heated tool with a cleaning agent with unused, absorbent, non-fraying and non-dyed paper and ensure extraction. Determine the movement pressure or the movement force before every welding operation and make a note of it on the welding record sheet. Determine the setting values for the alignment, heating-up and joining pressures. Stipulate the guide values according to Table 2 (Fig. 12).',
      'Move the heated tool into the welding position (Fig. 13). Align the faces to the heated tool until a bead arises (according to Table 2) (Fig. 14, 15). Heating-up at a reduced pressure ≤ 0.01 N/mm², heating-up time according to Table 2 (Fig. 16). At the end of the heating-up, detach the joining faces to be welded from the heated tool and move this out of the welding position (Fig. 17, 18, 19). Within the changeover time, quickly move together the faces to be welded until they almost touch. The faces must come into contact at a speed of nearly zero. Immediately afterwards, build up the joining pressure with a linear rise in the build-up time (Table 2), (Fig. 20). A bead must exist after the joining at a pressure of 0.10 N/mm². According to Figure 1, K must be > 0 at every point (Fig. 21, 22). Cooling under the joining pressure according to Table 2 (Fig. 23). Unclamping of the welded parts when the cooling time has elapsed (Fig. 24, 25). Complete the welding record sheet (can be provided upon request), (Fig. 26).',
    ],
    paragraphsDe: null,
    numberedInCatalogue: false,
    source: 'KA-Katalog_GB_06-2025, S. 46-47',
  },
];

/* --- Auffaelligkeiten ------------------------------------------------------
 *
 * Kein Wert wurde stillschweigend berichtigt. Was aus der Reihe faellt oder
 * fehlt, steht hier — bei K-Aqua rueckzufragen, bevor daraus ein Handbuch-
 * oder IFC-Datensatz wird. */
export interface WeldingAnomaly {
  /** Seite im Katalog, auf der die Auffaelligkeit steht. */
  page: number;
  topicDe: string;
  findingDe: string;
  /** Was hier bewusst NICHT getan wurde. */
  handlingDe: string;
}

export const WELDING_ANOMALIES: WeldingAnomaly[] = [
  {
    page: 48,
    topicDe: 'Table 1 — Luecke zwischen 355 mm und 400 mm',
    findingDe:
      'Die erste Zeile endet bei „≤ 355", die zweite beginnt bei „400… < 630". Fuer Durchmesser zwischen 356 mm und 399 mm ist keine Spaltbreite gedruckt.',
    handlingDe:
      'Nicht geschlossen. `buttWeldingGapWidthMm()` liefert fuer diesen Bereich null statt eines geschaetzten Wertes.',
  },
  {
    page: 48,
    topicDe: 'Table 2 — nur d160, d200, d250',
    findingDe:
      'Abschnitt 3.8 auf S. 45 gibt fuer die Stumpfschweissmaschine AQ989250 den Bereich d90 bis d250 an. Table 2 fuehrt Parameter nur fuer d160, d200 und d250, je in SDR 17 und SDR 11.',
    handlingDe:
      'Fuer d90, d110, d125 und d140 wird nichts gefuehrt. Weder interpoliert noch aus DVS 2207-1 ergaenzt.',
  },
  {
    page: 48,
    topicDe: 'Table 2 — Angleichdruck gleich Schweissdruck (geprueft, keine Rueckfrage noetig)',
    findingDe:
      'In allen sechs Zeilen sind „Merging pressure" und „Welding pressure" zahlengleich (8/8, 13/13, 13/13, 20/20, 21/21, 32/32). Das sah zunaechst nach einem Satzfehler aus. Die Gegenprobe am Ablaufdiagramm auf S. 45 („Process steps in heated tool butt welding", bei 3,15-facher Vergroesserung abgelesen) zeigt jedoch nur ZWEI Druckniveaus: „Hot plate contact pressure" und „Merging pressure" sind zwei Beschriftungen derselben oberen Plateaulinie, „Heating pressure" ist das einzige tiefere Niveau. Das Diagramm bestaetigt die Gleichheit also, statt ihr zu widersprechen — es ist der uebliche Druckverlauf des Heizelementstumpfschweissens.',
    handlingDe:
      'Beide Spalten bleiben getrennt gefuehrt, mit den gedruckten Werten. Die Gleichheit ist gewollt; beim Hersteller ist dazu nichts zu klaeren. Der Eintrag bleibt stehen, damit die Pruefung nicht ein zweites Mal gemacht wird.',
  },
  {
    page: 48,
    topicDe: 'Table 2 — keine Umstell- und keine Druckaufbauzeit',
    findingDe:
      'Der Ablauftext auf S. 47 verlangt Einhaltung einer „changeover time" und eines linearen Druckaufbaus in der „build-up time (Table 2)". Table 2 hat fuer beides keine Spalte.',
    handlingDe:
      'Nicht ergaenzt. Die Zeiten fehlen im Katalog und muessen aus DVS 2207-1 oder vom Hersteller nachgereicht werden.',
  },
  {
    page: 48,
    topicDe: 'Table 2 — Maschinenbezeichnung',
    findingDe:
      'Die Tabelle ist mit „Parameters for Welding Machines Type OMISA SP" ueberschrieben, waehrend Abschnitt 3.8 die Maschine AQ989250 nennt.',
    handlingDe:
      'Beide Bezeichnungen bleiben stehen — die Tabelle unter ihrem Titel, die Maschine in BUTT_WELDING_MACHINE. Es wird nicht unterstellt, dass es dasselbe Geraet ist.',
  },
  {
    page: 48,
    topicDe: 'Table 2 — Dezimaltrennzeichen',
    findingDe:
      'Die Wulsthoehe der Zeile d250/SDR 11 ist als „1,5" gedruckt, waehrend Table 1 auf derselben Seite Punkte setzt („0.5", „1.0", „1.3", „1.5", „2.0"). Ebenso unter Table 2: „0,1 x wall thickness".',
    handlingDe:
      'Reine Satzunsauberkeit, die Werte sind eindeutig. Uebernommen als 1.5 bzw. 0.1.',
  },
  {
    page: 41,
    topicDe: 'Table A — d16 fehlt',
    findingDe:
      'Table A beginnt bei d20. Der Katalog fuehrt an anderer Stelle auch d16-Rohre (siehe Halterungstabelle Figure 7, S. 63).',
    handlingDe:
      'Nicht ergaenzt. `socketWeldingParameters(16)` liefert null.',
  },
  {
    page: 41,
    topicDe: 'Table A — „Processing time" fasst zwei DVS-Zeiten zusammen',
    findingDe:
      'DVS 2207-11 unterscheidet Umstellzeit und Fuegezeit. Table A hat dafuer nur eine Spalte.',
    handlingDe:
      'Als ein Feld `processingTimeS` gefuehrt. Es wird nicht auf zwei Zeiten aufgeteilt.',
  },
  {
    page: 44,
    topicDe: 'Elektroschweissung ohne Parametertabelle',
    findingDe:
      'Abschnitt 3.7 beschreibt den Ablauf, nennt aber keine Anwaerm-, Umstell- oder Abkuehlzeiten. Die Daten stammen laut Text vom Strichcode-Etikett der Muffe.',
    handlingDe:
      'Keine Tabelle angelegt. Siehe ELECTROFUSION_PARAMETER_SOURCE.',
  },
];

/* --- Zugriffsfunktionen ---------------------------------------------------- */

/** Zeile aus Table A. Null, wenn der Durchmesser dort nicht steht — es wird
 *  weder interpoliert noch extrapoliert. */
export function socketWeldingParameters(dMm: number): SocketWeldingRow | null {
  return SOCKET_WELDING_TABLE_A.rows.find((r) => r.dMm === dMm) ?? null;
}

/** Anwaermzeit in Sekunden, bei Bedarf mit dem Kaeltezuschlag aus S. 41.
 *  `ambientC` ist die Umgebungstemperatur an der Baustelle; wird sie nicht
 *  angegeben, gilt die Tabellenzeit ohne Zuschlag. Das Ergebnis kann
 *  gebrochen sein (z. B. d20: 5 s × 1,5 = 7,5 s) — der Katalog rundet nicht,
 *  also wird hier auch nicht gerundet. */
export function socketWeldingHeatingTimeS(
  dMm: number,
  ambientC?: number,
): number | null {
  const row = socketWeldingParameters(dMm);
  if (row === null) return null;
  if (ambientC === undefined) return row.heatingTimeS;
  return ambientC < SOCKET_WELDING_COLD_WEATHER.thresholdC
    ? row.heatingTimeS * SOCKET_WELDING_COLD_WEATHER.factor
    : row.heatingTimeS;
}

/** Groesster zulaessiger Spalt nach Table 1. Null, wenn der Durchmesser in
 *  keinen gedruckten Bereich faellt — das betrifft 355 < d < 400, siehe
 *  WELDING_ANOMALIES. */
export function buttWeldingGapWidthMm(dMm: number): number | null {
  const row = BUTT_WELDING_GAP_WIDTHS.find((r) => {
    const aboveMin =
      r.dMinMm === null || (r.dMinInclusive ? dMm >= r.dMinMm : dMm > r.dMinMm);
    const belowMax =
      r.dMaxMm === null || (r.dMaxInclusive ? dMm <= r.dMaxMm : dMm < r.dMaxMm);
    return aboveMin && belowMax;
  });
  return row?.gapWidthMm ?? null;
}

/** Parameterzeile aus Table 2. SDR ist zwingend: der Katalog fuehrt jede
 *  Nennweite zweimal, und die Werte unterscheiden sich um bis zu 50 %. */
export function buttWeldingParameters(
  dMm: number,
  sdr: number,
): ButtWeldingParameterRow | null {
  return (
    BUTT_WELDING_PARAMETERS.find((r) => r.dMm === dMm && r.sdr === sdr) ?? null
  );
}

/** Alle im Katalog beschriebenen Ablaeufe eines Verfahrens, in gedruckter
 *  Reihenfolge. Die Muffenschweissung hat zwei Eintraege — Handgeraet
 *  (S. 40/41) und Maschine (S. 42). */
export function weldingProcedures(process: WeldingProcessId): WeldingProcedure[] {
  return WELDING_PROCEDURES.filter((p) => p.process === process);
}
