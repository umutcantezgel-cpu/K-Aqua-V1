/* Chemische Bestaendigkeit von PP gegenueber Medien.
 *
 * QUELLE: KA-Katalog_GB_06-2025_NEU.pdf, Abschnitt 1.14 „Table of chemical
 * resistance for PP", S. 28 bis 30. Die Tabelle laeuft ueber drei Seiten mit je
 * zwei Spaltenbloecken durch; sie ist hier seitenweise abgelegt, damit jeder
 * Wert eine Seitenzahl traegt.
 *
 * Alle drei Seiten wurden gerendert und Zeile fuer Zeile abgelesen. Die
 * Textebene des PDF wurde nicht verwendet: sie liest die Bloecke spaltenweise
 * und wirft die Klammerzusaetze („A (80° C)") von ihren Zellen los.
 *
 * Der Katalog stellt der Tabelle voran: „This chart shows the chemical
 * resistance of polypropylene resin under static conditions and not under
 * pressure." Die Werte gelten also fuer das drucklose, ruhende Medium. Fuer
 * druckbeaufschlagte Leitungen sind sie eine Vorauswahl, keine Freigabe —
 * siehe GENERAL_NOTES unten.
 *
 * Bezugsnorm der Pruefung ist laut Abschnitt 1.2 des Katalogs ISO TR
 * 10358:1993, gemessen bei 20, 60 und 100 °C.
 *
 * Verwendet fuer die Medienauswahl im technischen Handbuch und als Grundlage
 * der Eignungshinweise in `Pset_KAqua_Medium`. */

/** Spaltentemperaturen der Tabelle in °C, in gedruckter Reihenfolge. */
export const CHEMICAL_RESISTANCE_TEMPERATURES_C = [20, 60, 100] as const;

export type ChemicalResistanceTemperature =
  (typeof CHEMICAL_RESISTANCE_TEMPERATURES_C)[number];

/* Zellinhalte der Bewertungsspalten, genau in den Formen, die im Katalog
 * vorkommen.
 *
 * Die Klammerform „A (80° C)" steht im Druck fuer eine Bewertung, die der
 * Katalog nicht bei der Spaltentemperatur, sondern bei der eingeklammerten
 * Temperatur angibt. Sie ist deshalb ein eigener Code und darf nicht auf das
 * blosse Buchstabenkuerzel eingedampft werden — sonst wandert eine bei 80 °C
 * gemessene Bewertung als 60-°C-Wert in eine Planung.
 *
 * '-' ist der gedruckte Bindestrich: der Katalog fuehrt fuer diese Kombination
 * keinen Wert. '' steht fuer eine im Druck leer gebliebene Zelle; das kommt nur
 * einmal vor (Oleum, S. 29) und ist dort als Satzfehler vermerkt. */
export type ResistanceCode =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'A(40)'
  | 'A(80)'
  | 'B(10)'
  | 'B(80)'
  | 'D(70)'
  | 'D(80)'
  | '-'
  | '';

/** Die vier Bewertungsstufen des Katalogs. */
export type ResistanceRating = 'A' | 'B' | 'C' | 'D';

export interface DecodedResistance {
  /** null, wenn der Katalog keinen Wert fuehrt (Bindestrich oder leere Zelle). */
  rating: ResistanceRating | null;
  /** Temperatur in °C aus dem Klammerzusatz; null, wenn die Bewertung fuer die
   *  Spaltentemperatur gilt. */
  qualifierTemperatureC: number | null;
}

const RATING_DECODE: Record<ResistanceCode, DecodedResistance> = {
  A: { rating: 'A', qualifierTemperatureC: null },
  B: { rating: 'B', qualifierTemperatureC: null },
  C: { rating: 'C', qualifierTemperatureC: null },
  D: { rating: 'D', qualifierTemperatureC: null },
  'A(40)': { rating: 'A', qualifierTemperatureC: 40 },
  'A(80)': { rating: 'A', qualifierTemperatureC: 80 },
  'B(10)': { rating: 'B', qualifierTemperatureC: 10 },
  'B(80)': { rating: 'B', qualifierTemperatureC: 80 },
  'D(70)': { rating: 'D', qualifierTemperatureC: 70 },
  'D(80)': { rating: 'D', qualifierTemperatureC: 80 },
  '-': { rating: null, qualifierTemperatureC: null },
  '': { rating: null, qualifierTemperatureC: null },
};

/* --- Legende ---------------------------------------------------------------
 *
 * Ohne diese vier Erklaerungen ist die Tabelle wertlos: „A" heisst nicht
 * „bestaendig" im umgangssprachlichen Sinn, sondern „vernachlaessigbare
 * Einwirkung", und selbst „B" verlangt laut Katalog eigene Versuche. Die
 * englischen Texte stehen unveraendert auf S. 30; die deutschen Fassungen sind
 * Uebersetzungen der Redaktion und stehen so NICHT im Katalog. */
export interface ResistanceLegendEntry {
  code: ResistanceRating;
  headingEn: string;
  headingDe: string;
  descriptionEn: string;
  descriptionDe: string;
}

export const RESISTANCE_LEGEND: readonly ResistanceLegendEntry[] = [
  {
    code: 'A',
    headingEn: 'Negligible effect',
    headingDe: 'Vernachlaessigbare Einwirkung',
    descriptionEn:
      'The material should be suitable for all applications where these environmental conditions exist.',
    descriptionDe:
      'Der Werkstoff sollte fuer alle Anwendungen geeignet sein, in denen diese Umgebungsbedingungen herrschen.',
  },
  {
    code: 'B',
    headingEn: 'Limited absorption or attack',
    headingDe: 'Begrenzte Aufnahme oder begrenzter Angriff',
    descriptionEn:
      'The material should be suitable for most applications but the user is advised to carry out his/her own tests to determine the suitability of polypropylene in a particular environment.',
    descriptionDe:
      'Der Werkstoff sollte fuer die meisten Anwendungen geeignet sein; dem Anwender wird empfohlen, die Eignung von Polypropylen im konkreten Medium durch eigene Versuche zu bestimmen.',
  },
  {
    code: 'C',
    headingEn: 'Extensive absorption and/or rapid permeation',
    headingDe: 'Starke Aufnahme und/oder rasche Permeation',
    descriptionEn:
      'The material should be suitable for applications where only intermittent service is involved, or where the swelling produced has no detrimental effect on the part. The user should carry out his/her own tests to determine the suitability of polypropylene in a particular environment.',
    descriptionDe:
      'Der Werkstoff sollte nur fuer Anwendungen mit zeitweiligem Betrieb geeignet sein oder dort, wo die entstehende Quellung das Bauteil nicht beeintraechtigt. Der Anwender sollte die Eignung von Polypropylen im konkreten Medium durch eigene Versuche bestimmen.',
  },
  {
    code: 'D',
    headingEn: 'Extensive attack',
    headingDe: 'Starker Angriff',
    descriptionEn:
      'The specimen dissolves or disintegrates. Polypropylene is not recommended.',
    descriptionDe:
      'Der Probekoerper loest sich auf oder zerfaellt. Polypropylen wird nicht empfohlen.',
  },
];

/* Fussnote (a), S. 30. Sie haengt an der Konzentrationsangabe, nicht an der
 * Bewertung — deshalb steht sie im Feld `conc` mit im Text. */
export const FOOTNOTE_A_EN = 'May produce cracking in material under stress';
export const FOOTNOTE_A_DE =
  'Kann im Werkstoff unter Spannung Rissbildung hervorrufen';

/** Die drei Vorbehalte, die der Katalog der Tabelle beistellt (S. 30). Sie
 *  gehoeren in jede Ausgabe der Daten, weil sie den Geltungsbereich der
 *  Bewertungen begrenzen. */
export const GENERAL_NOTES: readonly { en: string; de: string }[] = [
  {
    en: 'This chart shows the chemical resistance of polypropylene resin under static conditions and not under pressure.',
    de: 'Diese Tabelle zeigt die chemische Bestaendigkeit von Polypropylen unter statischen Bedingungen und nicht unter Druck.',
  },
  {
    en: 'Note: the user is advised to carry out his/her own tests to determine the suitability of polypropylene in a particular environment.',
    de: 'Hinweis: Dem Anwender wird empfohlen, die Eignung von Polypropylen im konkreten Medium durch eigene Versuche zu bestimmen.',
  },
  {
    en: 'Note: This table should be used only as a guide. Polypropylene subjected to mechanical stress may behave different and show different result. For any doubts we recommend to contact the K-Aqua Customer Service.',
    de: 'Hinweis: Diese Tabelle ist nur als Anhalt zu verwenden. Mechanisch beanspruchtes Polypropylen kann sich anders verhalten und zu abweichenden Ergebnissen fuehren. In Zweifelsfaellen wird empfohlen, den K-Aqua-Kundendienst einzuschalten.',
  },
];

/* --- Datenzeilen ---------------------------------------------------------- */

export interface ChemicalResistanceRow {
  /** Medienbezeichnung genau wie gedruckt (englisch), einschliesslich der im
   *  Katalog enthaltenen Schreibfehler. Sie ist der Schluessel in die Quelle. */
  name: string;
  /** Deutsche Bezeichnung, von der Redaktion ergaenzt — sie steht NICHT im
   *  Katalog. null, wo die gedruckte Bezeichnung keine eindeutige deutsche
   *  Entsprechung hat und eine Uebersetzung eine Auslegung waere. */
  nameDe: string | null;
  /** Konzentrationsangabe wie gedruckt, samt Fussnotenzeichen „(a)" und
   *  Angaben wie „Satd." oder „fuming". null, wenn die Zelle leer ist. */
  conc: string | null;
  /** Bewertungen in Spaltenreihenfolge: [20 °C, 60 °C, 100 °C]. */
  ratings: readonly [ResistanceCode, ResistanceCode, ResistanceCode];
  /** Auffaelligkeit im Druck. Der Wert bleibt so, wie er gedruckt ist; hier
   *  steht, was daran nicht stimmt. */
  noteDe?: string;
}

export interface ChemicalResistancePage {
  page: number;
  source: string;
  rows: readonly ChemicalResistanceRow[];
}

/* S. 28 — linker Block: Acetic acid bis Calcium phosphate;
 *         rechter Block: Calcium sulfate bis Fruit juices. */
const PAGE_28: ChemicalResistancePage = {
  page: 28,
  source: 'KA-Katalog_GB_06-2025, S. 28',
  rows: [
    { name: 'Acetic acid (glacial)', nameDe: 'Essigsaeure (Eisessig)', conc: '97', ratings: ['A', 'B(80)', '-'] },
    { name: 'Acetic acid', nameDe: 'Essigsaeure', conc: '50', ratings: ['A', 'A(80)', '-'] },
    { name: 'Acetic acid', nameDe: 'Essigsaeure', conc: '40', ratings: ['A', '-', '-'] },
    { name: 'Acetic acid', nameDe: 'Essigsaeure', conc: '10', ratings: ['A', 'A', '-'] },
    { name: 'Acetone', nameDe: 'Aceton', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Acetophenone', nameDe: 'Acetophenon', conc: '100', ratings: ['B', 'B', '-'] },
    {
      name: 'Acriflavine (2 % solution in H2O)',
      nameDe: 'Acriflavin (2-%-Loesung in Wasser)',
      conc: '2',
      ratings: ['A', 'A', '-'],
      noteDe:
        'Die 100-°C-Zelle traegt zweizeilig „-" und darunter „(80° C)". Ein Bindestrich bedeutet „kein Wert" — ein Temperaturzusatz dazu ergibt keinen Sinn. Uebernommen ist der Bindestrich; der Zusatz ist bei K-Aqua rueckzufragen.',
    },
    { name: 'Acrylic emulsions', nameDe: 'Acrylemulsionen', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Aluminum chloride', nameDe: 'Aluminiumchlorid', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Aluminum fluoride', nameDe: 'Aluminiumfluorid', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Aluminum sulfate', nameDe: 'Aluminiumsulfat', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Alums (all types)', nameDe: 'Alaune (alle Arten)', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Ammonia (aqueous)', nameDe: 'Ammoniak (waessrig)', conc: '30', ratings: ['A', '-', '-'] },
    { name: 'Ammonia gas (dry)', nameDe: 'Ammoniakgas (trocken)', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Ammonium carbonate', nameDe: 'Ammoniumcarbonat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Ammonium chloride', nameDe: 'Ammoniumchlorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Ammonium fluoride', nameDe: 'Ammoniumfluorid', conc: '20', ratings: ['A', 'A', '-'] },
    { name: 'Ammonium hydroxide', nameDe: 'Ammoniumhydroxid', conc: '10', ratings: ['A', 'A', '-'] },
    { name: 'Ammonium metaphosphate', nameDe: 'Ammoniummetaphosphat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Ammonium nitrate', nameDe: 'Ammoniumnitrat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Ammonium persulfate', nameDe: 'Ammoniumpersulfat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Ammonium sulfate', nameDe: 'Ammoniumsulfat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Ammonium sulfide', nameDe: 'Ammoniumsulfid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Ammonium thiocyanate', nameDe: 'Ammoniumthiocyanat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Amyl acetate', nameDe: 'Amylacetat', conc: '100', ratings: ['B', 'C', '-'] },
    { name: 'Amyl alcohol', nameDe: 'Amylalkohol', conc: '100', ratings: ['A', 'B', '-'] },
    { name: 'Amyl chloride', nameDe: 'Amylchlorid', conc: '100', ratings: ['C', 'C', '-'] },
    { name: 'Aniline', nameDe: 'Anilin', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Anisole', nameDe: 'Anisol', conc: '100', ratings: ['B', 'B', '-'] },
    { name: 'Antimony chloride', nameDe: 'Antimonchlorid', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Aviation fuel (115/145 octane)', nameDe: 'Flugbenzin (115/145 Oktan)', conc: '100', ratings: ['B', 'C', '-'] },
    { name: 'Aviation turbine fuel', nameDe: 'Flugturbinenkraftstoff', conc: '100', ratings: ['B', 'C', '-'] },
    { name: 'Barium carbonate', nameDe: 'Bariumcarbonat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Barium chloride', nameDe: 'Bariumchlorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Barium hydroxide', nameDe: 'Bariumhydroxid', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Barium sulfate', nameDe: 'Bariumsulfat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Barium sulfide', nameDe: 'Bariumsulfid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Beer', nameDe: 'Bier', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Benzene', nameDe: 'Benzol', conc: '100', ratings: ['B', 'C', 'C'] },
    {
      name: 'Benzoic acid',
      nameDe: 'Benzoesaeure',
      conc: 'A',
      ratings: ['A', '-', '-'],
      noteDe:
        'In der Konzentrationsspalte steht „A" — ein Bewertungskuerzel an einer Stelle, an der eine Konzentration stehen muss. Sehr wahrscheinlich ist die ganze Zeile um eine Spalte nach links verrutscht; dann waeren die richtigen Werte 20 °C = A, 60 °C = A, 100 °C = -. Gedruckt uebernommen, bei K-Aqua rueckzufragen.',
    },
    { name: 'Benzyl alcohol', nameDe: 'Benzylalkohol', conc: null, ratings: ['A', 'A(80)', '-'] },
    { name: 'Bismuth carbonate', nameDe: 'Bismutcarbonat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Borax', nameDe: 'Borax', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Boric acid', nameDe: 'Borsaeure', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Brine', nameDe: 'Salzsole', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Bromine liquid', nameDe: 'Brom (fluessig)', conc: '100', ratings: ['D', '-', '-'] },
    { name: 'Bromine water', nameDe: 'Bromwasser', conc: '(a)', ratings: ['C', '-', '-'] },
    { name: 'Butyl acetate', nameDe: 'Butylacetat', conc: '100', ratings: ['C', 'C', '-'] },
    { name: 'Butyl alcohol', nameDe: 'Butylalkohol', conc: '100', ratings: ['A', 'A', '-'] },
    {
      name: 'Calcium carbonate',
      nameDe: 'Calciumcarbonat',
      conc: 'Stad.',
      ratings: ['A', 'A', '-'],
      noteDe:
        'Konzentration gedruckt als „Stad."; in allen uebrigen Zeilen heisst es „Satd." (gesaettigt). Offensichtlicher Setzfehler, unveraendert uebernommen.',
    },
    { name: 'Calcium chlorate', nameDe: 'Calciumchlorat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Calcium chloride', nameDe: 'Calciumchlorid', conc: '50', ratings: ['A', 'A', '-'] },
    { name: 'Calcium hydroxide', nameDe: 'Calciumhydroxid', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Calcium hypochlorite bleach', nameDe: 'Calciumhypochlorit-Bleiche', conc: '20(a)', ratings: ['A', 'B', '-'] },
    { name: 'Calcium nitrate', nameDe: 'Calciumnitrat', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Calcium phosphate', nameDe: 'Calciumphosphat', conc: '50', ratings: ['A', '-', '-'] },

    { name: 'Calcium sulfate', nameDe: 'Calciumsulfat', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Calcium sulfite', nameDe: 'Calciumsulfit', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Carbon dioxide (dry)', nameDe: 'Kohlendioxid (trocken)', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Carbon dioxide (wet)', nameDe: 'Kohlendioxid (feucht)', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Carbon disulfide', nameDe: 'Schwefelkohlenstoff', conc: '100', ratings: ['B', 'C', '-'] },
    { name: 'Carbon monoxide', nameDe: 'Kohlenmonoxid', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Carbon tetrachloride', nameDe: 'Tetrachlorkohlenstoff', conc: '100', ratings: ['C', 'C', 'C'] },
    { name: 'Carbonic acid', nameDe: 'Kohlensaeure', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Castor oil', nameDe: 'Rizinusoel', conc: null, ratings: ['A', '-', '-'] },
    { name: 'Cetyl alcohol', nameDe: 'Cetylalkohol', conc: '100', ratings: ['A', '-', '-'] },
    { name: 'Chlorine (gas)', nameDe: 'Chlor (gasfoermig)', conc: '100', ratings: ['D', 'D', '-'] },
    { name: 'Chlorobenzene', nameDe: 'Chlorbenzol', conc: '100', ratings: ['C', 'C', '-'] },
    { name: 'Chloroform', nameDe: 'Chloroform', conc: '100', ratings: ['C', 'D', 'D'] },
    { name: 'Chlorosulfonic acid', nameDe: 'Chlorsulfonsaeure', conc: '100', ratings: ['D', 'D', 'D'] },
    { name: 'Chrome alum', nameDe: 'Chromalaun', conc: null, ratings: ['A', 'A', '-'] },
    {
      name: 'Chromic acid',
      nameDe: 'Chromsaeure',
      conc: '80(a)',
      ratings: ['A', '-', '-'],
      noteDe:
        'Bei 80 % fehlt der 60-°C-Wert, waehrend die schwaecheren Konzentrationen 50 % und 10 % dort „A" fuehren. Der Katalog laesst offen, ob keine Pruefung vorliegt oder der Wert verlorengegangen ist.',
    },
    { name: 'Chromic acid', nameDe: 'Chromsaeure', conc: '50(a)', ratings: ['A', 'A', '-'] },
    { name: 'Chromic acid', nameDe: 'Chromsaeure', conc: '10(a)', ratings: ['A', 'A', '-'] },
    { name: 'Chromic/sulfuric acid', nameDe: 'Chromsaeure/Schwefelsaeure', conc: null, ratings: ['D', 'D', '-'] },
    { name: 'Cider', nameDe: 'Apfelwein', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Citric acid', nameDe: 'Zitronensaeure', conc: '10', ratings: ['A', 'A', '-'] },
    { name: 'Copper chloride', nameDe: 'Kupferchlorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Copper cyanide', nameDe: 'Kupfercyanid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Copper fluoride', nameDe: 'Kupferfluorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Copper nitrate', nameDe: 'Kupfernitrat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Copper sulfate', nameDe: 'Kupfersulfat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Cottonseed oil', nameDe: 'Baumwollsaatoel', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Cuprous chloride', nameDe: 'Kupfer(I)-chlorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Cyclohexanol', nameDe: 'Cyclohexanol', conc: '100', ratings: ['A', 'B', '-'] },
    { name: 'Cyclohexanone', nameDe: 'Cyclohexanon', conc: '100', ratings: ['B', 'C', '-'] },
    { name: 'Decalin', nameDe: 'Dekalin', conc: '100', ratings: ['C', 'C', 'C'] },
    { name: 'Detergents', nameDe: 'Detergenzien', conc: '2', ratings: ['A', 'A', 'A'] },
    { name: 'Developers (photographic)', nameDe: 'Entwickler (fotografisch)', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Dibutyl phthalate', nameDe: 'Dibutylphthalat', conc: '100', ratings: ['A', 'B', 'D'] },
    { name: 'Dichloroethylene', nameDe: 'Dichlorethylen', conc: '100', ratings: ['A', '-', '-'] },
    { name: 'Diethanolamine', nameDe: 'Diethanolamin', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Diisooctyl phthalate', nameDe: 'Diisooctylphthalat', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Emulsifiers', nameDe: 'Emulgatoren', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Ethanolamine', nameDe: 'Ethanolamin', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Ethyl acetate', nameDe: 'Ethylacetat', conc: '100', ratings: ['B', 'B', '-'] },
    { name: 'Ethyl alcohol', nameDe: 'Ethylalkohol', conc: '96', ratings: ['A', 'A(80)', '-'] },
    { name: 'Ethyl chloride', nameDe: 'Ethylchlorid', conc: '100', ratings: ['C', 'C', '-'] },
    { name: 'Ethylene dichloride', nameDe: 'Ethylendichlorid', conc: '100', ratings: ['B', '-', '-'] },
    { name: 'Ethylene glycol', nameDe: 'Ethylenglykol', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Ethylene oxide', nameDe: 'Ethylenoxid', conc: '100', ratings: ['B(10)', '-', '-'] },
    { name: 'Ethyl ether', nameDe: 'Diethylether', conc: '100', ratings: ['B', '-', '-'] },
    { name: 'Fatty acids (C6)', nameDe: 'Fettsaeuren (C6)', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Ferric chloride', nameDe: 'Eisen(III)-chlorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Ferric nitrate', nameDe: 'Eisen(III)-nitrat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Ferric sulfate', nameDe: 'Eisen(III)-sulfat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Ferrous chloride', nameDe: 'Eisen(II)-chlorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Ferrous sulfate', nameDe: 'Eisen(II)-sulfat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Fluorosilicic acid', nameDe: 'Hexafluorokieselsaeure', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Formaldehyde', nameDe: 'Formaldehyd', conc: '40', ratings: ['A', 'A', '-'] },
    { name: 'Formic acid', nameDe: 'Ameisensaeure', conc: '100', ratings: ['A', '-', '-'] },
    { name: 'Formic acid', nameDe: 'Ameisensaeure', conc: '10', ratings: ['A', 'A', '-'] },
    { name: 'Fructose', nameDe: 'Fructose', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Fruit juices', nameDe: 'Fruchtsaefte', conc: null, ratings: ['A', 'A', '-'] },
  ],
};

/* S. 29 — linker Block: Furfural bis Nitric acid (fuming);
 *         rechter Block: Nitric acid 70 % bis Sodium bisulfite. */
const PAGE_29: ChemicalResistancePage = {
  page: 29,
  source: 'KA-Katalog_GB_06-2025, S. 29',
  rows: [
    { name: 'Furfural', nameDe: 'Furfural', conc: '100', ratings: ['C', 'C', '-'] },
    { name: 'Gas liquor', nameDe: 'Gaswasser', conc: null, ratings: ['C', '-', '-'] },
    {
      name: 'Gasoline',
      nameDe: 'Benzin',
      conc: '100',
      ratings: ['B', 'C', 'C'],
      noteDe:
        'Die Tabelle fuehrt dieselbe Sache zweimal: „Gasoline" (hier) und „Petrol" (S. 29, rechter Block). Bei 20 und 60 °C stimmen beide ueberein (B / C), bei 100 °C weicht „Gasoline" mit „C" von „Petrol" mit „-" ab. Beide Zeilen sind gedruckt uebernommen.',
    },
    { name: 'Gearbox oil', nameDe: 'Getriebeoel', conc: '100', ratings: ['A', 'B', '-'] },
    { name: 'Gelatin', nameDe: 'Gelatine', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Glucose', nameDe: 'Glucose', conc: '20', ratings: ['A', 'A', '-'] },
    { name: 'Glycerin', nameDe: 'Glycerin', conc: '100', ratings: ['A', 'A', 'A'] },
    { name: 'Glycol', nameDe: 'Glykol', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Hexane', nameDe: 'Hexan', conc: '100', ratings: ['A', 'B', '-'] },
    { name: 'Hydrobromic acid', nameDe: 'Bromwasserstoffsaeure', conc: '50(a)', ratings: ['A', 'A', '-'] },
    {
      name: 'Hydrobromic acid',
      nameDe: 'Bromwasserstoffsaeure',
      conc: '30(a)',
      ratings: ['A', 'B', 'D'],
      noteDe:
        'Die schwaechere 30-%-Loesung ist schlechter bewertet als die staerkere 50-%-Loesung derselben Saeure (60 °C: B statt A; 100 °C: D statt keine Angabe). Das widerspricht der sonst durchgaengigen Ordnung der Tabelle. Gedruckt uebernommen.',
    },
    { name: 'Hydrobromic acid', nameDe: 'Bromwasserstoffsaeure', conc: '20', ratings: ['A', 'A(80)', '-'] },
    { name: 'Hydrobromic acid', nameDe: 'Bromwasserstoffsaeure', conc: '10', ratings: ['A', 'A(80)', 'B'] },
    { name: 'Hydrobromic acid', nameDe: 'Bromwasserstoffsaeure', conc: '2', ratings: ['A', 'A', 'A'] },
    { name: '50-50 HCl-HNO3', nameDe: 'Salzsaeure/Salpetersaeure 50:50', conc: '(a)', ratings: ['B', 'D(80)', '-'] },
    { name: 'Hydrofluoric acid', nameDe: 'Flusssaeure', conc: '40', ratings: ['A', '-', '-'] },
    {
      name: 'Hydrofluoric acid',
      nameDe: 'Flusssaeure',
      conc: '60(a)',
      ratings: ['A', 'A(40)', '-'],
      noteDe:
        'Zwei Auffaelligkeiten: die Zeilenfolge 40 % vor 60 % laeuft der sonst fallenden Konzentrationsordnung entgegen, und die staerkere 60-%-Loesung traegt bei 60 °C einen Wert („A", gemessen bei 40 °C), waehrend die schwaechere 40-%-Loesung dort keinen fuehrt. Gedruckt uebernommen.',
    },
    { name: 'Hydrogen chloride gas (dry)', nameDe: 'Chlorwasserstoffgas (trocken)', conc: '100', ratings: ['A', 'A', '-'] },
    {
      name: 'Hydrogen peroxide',
      nameDe: 'Wasserstoffperoxid',
      conc: '30',
      ratings: ['A', '-', 'D'],
      noteDe:
        'Bei 60 °C fehlt der Wert, bei 100 °C steht „D". Eine Luecke zwischen zwei bewerteten Spalten; der Katalog erklaert sie nicht.',
    },
    { name: 'Hydrogen peroxide', nameDe: 'Wasserstoffperoxid', conc: '10', ratings: ['A', 'B', '-'] },
    { name: 'Hydrogen peroxide', nameDe: 'Wasserstoffperoxid', conc: '3', ratings: ['A', '-', '-'] },
    { name: 'Hydrogen sulfide', nameDe: 'Schwefelwasserstoff', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Hydroquinone', nameDe: 'Hydrochinon', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Inks', nameDe: 'Tinten', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Iodine tincture', nameDe: 'Jodtinktur', conc: null, ratings: ['A', '-', '-'] },
    { name: 'Isooctane', nameDe: 'Isooctan', conc: '100', ratings: ['C', 'C', '-'] },
    { name: 'Isopropyl alcohol', nameDe: 'Isopropylalkohol', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Ketones', nameDe: 'Ketone', conc: null, ratings: ['A', '-', '-'] },
    { name: 'Lactic acid', nameDe: 'Milchsaeure', conc: '20', ratings: ['A', 'A', '-'] },
    { name: 'Lanolin', nameDe: 'Lanolin (Wollwachs)', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Lead acetate', nameDe: 'Bleiacetat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Linseed oil', nameDe: 'Leinoel', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Lubricating oil', nameDe: 'Schmieroel', conc: '100', ratings: ['A', 'B', '-'] },
    {
      name: 'Magenta dye (aqueous solution)',
      nameDe: 'Magenta-Farbstoff (waessrige Loesung)',
      conc: '2',
      ratings: ['A', 'A', '-'],
      noteDe:
        'Die 60-°C-Zelle traegt gedruckt „A some staining" — die einzige Zelle der ganzen Tabelle mit Freitext. Hier ist nur das Kuerzel „A" abgelegt; der Zusatz besagt, dass der Werkstoff sich anfaerbt. Die 100-°C-Zelle zeigt zwei Bindestriche untereinander, was ein Umbruchartefakt der zweizeiligen Zeile ist und einen Wert bedeutet.',
    },
    { name: 'Magnesium carbonate', nameDe: 'Magnesiumcarbonat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Magnesium chloride', nameDe: 'Magnesiumchlorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Magnesium hydroxide', nameDe: 'Magnesiumhydroxid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Magnesium nitrate', nameDe: 'Magnesiumnitrat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Magnesium sulfate', nameDe: 'Magnesiumsulfat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Magnesium sulfite', nameDe: 'Magnesiumsulfit', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Meat juices', nameDe: 'Fleischsaefte', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Mercuric chloride', nameDe: 'Quecksilber(II)-chlorid', conc: '40', ratings: ['A', 'A', '-'] },
    { name: 'Mercuric cyanide', nameDe: 'Quecksilber(II)-cyanid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Mercurous nitrate', nameDe: 'Quecksilber(I)-nitrat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Mercury', nameDe: 'Quecksilber', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Methyl alcohol', nameDe: 'Methylalkohol', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Methylene chloride', nameDe: 'Methylenchlorid', conc: '100', ratings: ['A', '-', '-'] },
    { name: 'Methyl ethyl ketone', nameDe: 'Methylethylketon', conc: '100', ratings: ['A', 'B', '-'] },
    { name: 'Milk and its products', nameDe: 'Milch und Milcherzeugnisse', conc: null, ratings: ['A', 'A', 'A'] },
    { name: 'Mineral oil', nameDe: 'Mineraloel', conc: '100', ratings: ['A', 'B', '-'] },
    { name: 'Molasses', nameDe: 'Melasse', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Motor oil', nameDe: 'Motoroel', conc: '100', ratings: ['A', 'B', '-'] },
    { name: 'Naphthalene', nameDe: 'Naphthalin', conc: '100', ratings: ['A', 'A', 'A'] },
    { name: 'Nickel chloride', nameDe: 'Nickelchlorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Nickel nitrate', nameDe: 'Nickelnitrat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Nickel sulfate', nameDe: 'Nickelsulfat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Nitric acid', nameDe: 'Salpetersaeure', conc: 'fuming', ratings: ['D', 'D', 'D'] },

    { name: 'Nitric acid', nameDe: 'Salpetersaeure', conc: '70(a)', ratings: ['C', 'D', '-'] },
    { name: 'Nitric acid', nameDe: 'Salpetersaeure', conc: '60', ratings: ['A', 'D(80)', '-'] },
    { name: 'Nitric acid', nameDe: 'Salpetersaeure', conc: '10', ratings: ['A', 'A', 'A'] },
    { name: '50-50 HNO3-HCl', nameDe: 'Salpetersaeure/Salzsaeure 50:50', conc: '(a)', ratings: ['B', 'D(80)', '-'] },
    { name: '50-50 HNO3-H2SO4', nameDe: 'Salpetersaeure/Schwefelsaeure 50:50', conc: '(a)', ratings: ['C', 'D(80)', '-'] },
    { name: 'Nitrobenzene', nameDe: 'Nitrobenzol', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Oleic acid', nameDe: 'Oelsaeure', conc: null, ratings: ['A', 'B', '-'] },
    {
      name: 'Oleum',
      nameDe: 'Oleum (rauchende Schwefelsaeure)',
      conc: null,
      ratings: ['', '-', 'D'],
      noteDe:
        'Die 20-°C-Zelle ist im Druck vollstaendig leer — nicht einmal ein Bindestrich steht dort; die einzige solche Zelle der ganzen Tabelle. Zugleich traegt ausgerechnet die 100-°C-Spalte ein „D", waehrend 60 °C leer bleibt. Sehr wahrscheinlich ist die Zeile um eine Spalte nach rechts verrutscht. Gedruckt uebernommen, bei K-Aqua rueckzufragen. Bis dahin ist Oleum unabhaengig von der Temperatur als ungeeignet zu behandeln.',
    },
    { name: 'Olive oil', nameDe: 'Olivenoel', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Oxalic acid (aqueous)', nameDe: 'Oxalsaeure (waessrig)', conc: '50', ratings: ['A', 'B', '-'] },
    { name: 'Paraffin', nameDe: 'Paraffin', conc: '100', ratings: ['A', 'B', '-'] },
    { name: 'Paraffin wax', nameDe: 'Paraffinwachs', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Petrol', nameDe: 'Benzin', conc: '100', ratings: ['B', 'C', '-'] },
    { name: 'Petroleum ether (boiling point 100°-140° C)', nameDe: 'Petrolether (Siedebereich 100 bis 140 °C)', conc: '100', ratings: ['C', 'C', '-'] },
    { name: 'Phenol', nameDe: 'Phenol', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Phosphoric acid', nameDe: 'Phosphorsaeure', conc: '95', ratings: ['A', 'A', '-'] },
    { name: 'Plating solutions, brass', nameDe: 'Galvanikbaeder, Messing', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Plating solutions, cadmium', nameDe: 'Galvanikbaeder, Cadmium', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Plating solutions, chromium', nameDe: 'Galvanikbaeder, Chrom', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Plating solutions, copper', nameDe: 'Galvanikbaeder, Kupfer', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Plating solutions, gold', nameDe: 'Galvanikbaeder, Gold', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Plating solutions, indium', nameDe: 'Galvanikbaeder, Indium', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Plating solutions, lead', nameDe: 'Galvanikbaeder, Blei', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Plating solutions, nickel', nameDe: 'Galvanikbaeder, Nickel', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Plating solutions, rhodium', nameDe: 'Galvanikbaeder, Rhodium', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Plating solutions, silver', nameDe: 'Galvanikbaeder, Silber', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Plating solutions, tin', nameDe: 'Galvanikbaeder, Zinn', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Plating solutions, zinc', nameDe: 'Galvanikbaeder, Zink', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Potassium bicarbonate', nameDe: 'Kaliumhydrogencarbonat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Potassium borate', nameDe: 'Kaliumborat', conc: '1', ratings: ['A', 'A', '-'] },
    { name: 'Potassium bromate', nameDe: 'Kaliumbromat', conc: '10', ratings: ['A', 'A', '-'] },
    { name: 'Potassium bromide', nameDe: 'Kaliumbromid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Potassium carbonate', nameDe: 'Kaliumcarbonat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Potassium chlorate', nameDe: 'Kaliumchlorat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Potassium chloride', nameDe: 'Kaliumchlorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Potassium chromate', nameDe: 'Kaliumchromat', conc: '40', ratings: ['A', 'A', '-'] },
    { name: 'Potassium cyanide', nameDe: 'Kaliumcyanid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Potassium dichromate', nameDe: 'Kaliumdichromat', conc: '40', ratings: ['A', 'A', '-'] },
    { name: 'Potassium ferri-/ferrocyanide', nameDe: 'Kaliumhexacyanidoferrat(III)/(II)', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Potassium fluoride', nameDe: 'Kaliumfluorid', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Potassium hydroxide', nameDe: 'Kaliumhydroxid', conc: '50', ratings: ['A', 'A', '-'] },
    { name: 'Potassium hydroxide', nameDe: 'Kaliumhydroxid', conc: '10', ratings: ['A', 'A', 'A'] },
    { name: 'Potassium nitrate', nameDe: 'Kaliumnitrat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Potassium perborate', nameDe: 'Kaliumperborat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Potassium perchlorate', nameDe: 'Kaliumperchlorat', conc: '10', ratings: ['A', 'A', '-'] },
    { name: 'Potassium permanganate', nameDe: 'Kaliumpermanganat', conc: '20', ratings: ['A', 'A', '-'] },
    { name: 'Potassium sulfate', nameDe: 'Kaliumsulfat', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Potassium sulfide', nameDe: 'Kaliumsulfid', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Potassium sulfite', nameDe: 'Kaliumsulfit', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Propyl alcohol', nameDe: 'Propylalkohol', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Pyridine', nameDe: 'Pyridin', conc: '100', ratings: ['A', '-', '-'] },
    { name: 'Silicone oil', nameDe: 'Silikonoel', conc: '100', ratings: ['A', 'A', '-'] },
    { name: 'Soap solution (concentrated)', nameDe: 'Seifenloesung (konzentriert)', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Sodium acetate', nameDe: 'Natriumacetat', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Sodium bicarbonate', nameDe: 'Natriumhydrogencarbonat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Sodium bisulfate', nameDe: 'Natriumhydrogensulfat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Sodium bisulfite', nameDe: 'Natriumhydrogensulfit', conc: 'Satd.', ratings: ['A', 'A', '-'] },
  ],
};

/* S. 30 — linker Block: Sodium borate bis Xylene;
 *         rechter Block: Yeast bis Zinc sulfate (nur vier Zeilen), darunter
 *         Fussnote, Legende und Hinweise. */
const PAGE_30: ChemicalResistancePage = {
  page: 30,
  source: 'KA-Katalog_GB_06-2025, S. 30',
  rows: [
    { name: 'Sodium borate', nameDe: 'Natriumborat', conc: null, ratings: ['A', 'A', '-'] },
    {
      name: 'Sodium bromide oil solution',
      nameDe: null,
      conc: null,
      ratings: ['A', 'A', '-'],
      noteDe:
        'Die gedruckte Bezeichnung ist nicht eindeutig aufzuloesen: Natriumbromid ist ein Salz und bildet keine Oelloesung. Deshalb bleibt das deutsche Feld leer, statt eine Deutung zu erfinden.',
    },
    { name: 'Sodium carbonate', nameDe: 'Natriumcarbonat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Sodium chlorate', nameDe: 'Natriumchlorat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Sodium chloride', nameDe: 'Natriumchlorid', conc: 'Satd.', ratings: ['A', 'A', 'A'] },
    {
      name: 'Sodium chlorite',
      nameDe: 'Natriumchlorit',
      conc: '2',
      ratings: ['A', 'A(80)', '-'],
      noteDe:
        'Diese Zeile traegt den Klammerzusatz „(80° C)" in der 60-°C-Spalte, die drei folgenden Natriumchlorit-Zeilen (5, 10 und 20 %) dagegen in der 20-°C-Spalte. In einer der beiden Gruppen sind die Spalten offenbar vertauscht. Alle vier Zeilen sind gedruckt uebernommen; welche Gruppe stimmt, ist bei K-Aqua zu klaeren.',
    },
    { name: 'Sodium chlorite', nameDe: 'Natriumchlorit', conc: '5', ratings: ['A(80)', 'A', '-'] },
    { name: 'Sodium chlorite', nameDe: 'Natriumchlorit', conc: '10', ratings: ['A(80)', 'A', '-'] },
    { name: 'Sodium chlorite', nameDe: 'Natriumchlorit', conc: '20', ratings: ['A(80)', 'A', '-'] },
    { name: 'Sodium cyanide', nameDe: 'Natriumcyanid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Sodium dichromate', nameDe: 'Natriumdichromat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Sodium ferricyanide', nameDe: 'Natriumhexacyanidoferrat(III)', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    {
      name: 'Sodium ferrocyanicle',
      nameDe: 'Natriumhexacyanidoferrat(II)',
      conc: 'Satd.',
      ratings: ['A', 'A', '-'],
      noteDe:
        'Gedruckt „ferrocyanicle"; gemeint ist „ferrocyanide". Der Name ist unveraendert uebernommen, damit die Zeile in der Quelle wiederzufinden ist.',
    },
    { name: 'Sodium fluoride', nameDe: 'Natriumfluorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Sodium hydroxide', nameDe: 'Natriumhydroxid', conc: '50', ratings: ['A', 'A', '-'] },
    { name: 'Sodium hydroxide', nameDe: 'Natriumhydroxid', conc: '10', ratings: ['A', 'A', 'A'] },
    { name: 'Sodium hypochlorite', nameDe: 'Natriumhypochlorit', conc: '20', ratings: ['A', 'B', 'B'] },
    { name: 'Sodium nitrate', nameDe: 'Natriumnitrat', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Sodium nitrite', nameDe: 'Natriumnitrit', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Sodium silicate', nameDe: 'Natriumsilikat', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Sodium sulfate', nameDe: 'Natriumsulfat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Sodium sulfide', nameDe: 'Natriumsulfid', conc: '25', ratings: ['A', 'A', '-'] },
    { name: 'Sodium sulfite', nameDe: 'Natriumsulfit', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Stannic chloride', nameDe: 'Zinn(IV)-chlorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Stannous chloride', nameDe: 'Zinn(II)-chlorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Starch', nameDe: 'Staerke', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Sugars and syrups', nameDe: 'Zucker und Sirupe', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Sulfamic acid', nameDe: 'Amidosulfonsaeure', conc: null, ratings: ['A', 'A(80)', '-'] },
    { name: 'Sulfates of Calcium and magnesium', nameDe: 'Sulfate von Calcium und Magnesium', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Sulfates of potassium and sodium', nameDe: 'Sulfate von Kalium und Natrium', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Sulfur', nameDe: 'Schwefel', conc: null, ratings: ['A', 'A', '-'] },
    {
      name: 'Sulfuric acid',
      nameDe: 'Schwefelsaeure',
      conc: '98(a)',
      ratings: ['C', '-', 'D'],
      noteDe:
        'Bei 60 °C fehlt der Wert, bei 100 °C steht „D". Wie bei Wasserstoffperoxid 30 % eine Luecke zwischen zwei bewerteten Spalten. Fuer die Planung ist der 60-°C-Fall damit nicht belegt.',
    },
    { name: 'Sulfuric acid', nameDe: 'Schwefelsaeure', conc: '60', ratings: ['A', 'B(80)', '-'] },
    { name: 'Sulfuric acid', nameDe: 'Schwefelsaeure', conc: '50', ratings: ['A', 'B', '-'] },
    { name: 'Sulfuric acid', nameDe: 'Schwefelsaeure', conc: '10', ratings: ['A', 'A', 'A'] },
    { name: '50-50 H2SO4/HNO3', nameDe: 'Schwefelsaeure/Salpetersaeure 50:50', conc: '(a)', ratings: ['C', 'D(80)', '-'] },
    { name: 'Tallow', nameDe: 'Talg', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Tannic acid', nameDe: 'Gerbsaeure', conc: '10', ratings: ['A', 'A', '-'] },
    { name: 'Tartaric acid', nameDe: 'Weinsaeure', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Tetrahydrofuran', nameDe: 'Tetrahydrofuran', conc: '100', ratings: ['C', 'C', 'C'] },
    { name: 'Tetralin', nameDe: 'Tetralin', conc: '100', ratings: ['C', 'C', 'C'] },
    { name: 'Toluene', nameDe: 'Toluol', conc: '100', ratings: ['C', 'C', '-'] },
    {
      name: 'Transformer oil',
      nameDe: 'Transformatorenoel',
      conc: '100',
      ratings: ['A', 'C', '-'],
      noteDe:
        'Sprung von „A" auf „C" ueber die Stufe „B" hinweg. Die uebrigen Oele der Tabelle (Mineraloel, Motoroel, Schmieroel, Getriebeoel) gehen von A auf B. Gedruckt uebernommen.',
    },
    { name: 'Trichloroacetic acid', nameDe: 'Trichloressigsaeure', conc: '10', ratings: ['A', 'A', '-'] },
    { name: 'Trichloroethylene', nameDe: 'Trichlorethylen', conc: '100', ratings: ['A', 'A(80)', '-'] },
    { name: 'Turpentine', nameDe: 'Terpentin', conc: '100', ratings: ['C', 'C', 'C'] },
    { name: 'Urea', nameDe: 'Harnstoff', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Urine', nameDe: 'Urin', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Water (distilled, soft, hard and vapor)', nameDe: 'Wasser (destilliert, weich, hart und dampffoermig)', conc: null, ratings: ['A', 'A', 'A'] },
    {
      name: 'Wet chlorine gas',
      nameDe: 'Feuchtes Chlorgas',
      conc: null,
      ratings: ['-', 'D(70)', '-'],
      noteDe:
        'Bei 20 °C fehlt der Wert, obwohl bei 70 °C „D" steht. Die Zeile „Chlorine (gas)" auf S. 28 fuehrt bei 20 °C „D". Fuer feuchtes Chlorgas ist bei 20 °C damit nichts belegt; die Trockengas-Zeile ist kein Ersatz.',
    },
    { name: 'Whiskey', nameDe: 'Whiskey', conc: null, ratings: ['A', 'A', 'A'] },
    { name: 'White Paraffin', nameDe: 'Weisses Paraffin', conc: '100', ratings: ['A', 'B(80)', '-'] },
    { name: 'White spirit', nameDe: 'Testbenzin', conc: '100', ratings: ['B', 'C', '-'] },
    { name: 'Wines', nameDe: 'Weine', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Xylene', nameDe: 'Xylol', conc: '100', ratings: ['C', 'C', 'C'] },

    { name: 'Yeast', nameDe: 'Hefe', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Zinc chloride', nameDe: 'Zinkchlorid', conc: 'Satd.', ratings: ['A', 'A', '-'] },
    { name: 'Zinc oxide', nameDe: 'Zinkoxid', conc: null, ratings: ['A', 'A', '-'] },
    { name: 'Zinc sulfate', nameDe: 'Zinksulfat', conc: 'Satd.', ratings: ['A', 'A', '-'] },
  ],
};

export const CHEMICAL_RESISTANCE_PAGES: readonly ChemicalResistancePage[] = [
  PAGE_28,
  PAGE_29,
  PAGE_30,
];

/** Eine Zeile samt ihrer Herkunft. */
export interface ChemicalResistanceEntry extends ChemicalResistanceRow {
  page: number;
  source: string;
}

/** Die vollstaendige Tabelle in gedruckter Reihenfolge, jede Zeile mit
 *  Seitenbeleg. */
export const CHEMICAL_RESISTANCE_PP: readonly ChemicalResistanceEntry[] =
  CHEMICAL_RESISTANCE_PAGES.flatMap((table) =>
    table.rows.map((row) => ({ ...row, page: table.page, source: table.source })),
  );

/* --- Zugriff -------------------------------------------------------------- */

/** Zerlegt einen Zellcode in Bewertung und Klammertemperatur. */
export function decodeResistance(code: ResistanceCode): DecodedResistance {
  return RATING_DECODE[code];
}

/** Alle Zeilen zu einem Medium — ein Medium kann mit mehreren Konzentrationen
 *  gefuehrt sein (Essigsaeure etwa mit 97, 50, 40 und 10 %). Der Vergleich
 *  laeuft ueber die gedruckte englische Bezeichnung, ohne Ruecksicht auf
 *  Gross- und Kleinschreibung. */
export function findMedium(name: string): ChemicalResistanceEntry[] {
  const needle = name.trim().toLowerCase();
  return CHEMICAL_RESISTANCE_PP.filter(
    (entry) => entry.name.toLowerCase() === needle,
  );
}

/** Zellcode einer Zeile bei einer der drei Spaltentemperaturen. */
export function resistanceCodeAt(
  row: ChemicalResistanceRow,
  temperatureC: ChemicalResistanceTemperature,
): ResistanceCode {
  switch (temperatureC) {
    case 20:
      return row.ratings[0];
    case 60:
      return row.ratings[1];
    case 100:
      return row.ratings[2];
  }
}

/** Bewertung einer Zeile bei einer Spaltentemperatur. null, wenn der Katalog
 *  fuer diese Kombination nichts fuehrt — es wird weder aus der Nachbarspalte
 *  noch aus einer anderen Konzentration abgeleitet. */
export function resistanceRatingAt(
  row: ChemicalResistanceRow,
  temperatureC: ChemicalResistanceTemperature,
): ResistanceRating | null {
  return decodeResistance(resistanceCodeAt(row, temperatureC)).rating;
}

/** Trifft zu, wenn die Konzentrationsangabe die Fussnote (a) traegt: das
 *  Medium kann im Werkstoff unter Spannung Rissbildung hervorrufen. Der
 *  Hinweis haengt an der Zeile, nicht an einer einzelnen Temperatur. */
export function hasStressCrackingFootnote(row: ChemicalResistanceRow): boolean {
  return row.conc !== null && row.conc.includes('(a)');
}

/* --- Beanstandete Druckstellen --------------------------------------------
 *
 * Diese Zeilen sind so abgelegt, wie sie gedruckt sind, und tragen zusaetzlich
 * ein `noteDe`. Stillschweigend zu korrigieren hiesse, eine eigene Fassung der
 * Herstellerangabe zu erfinden; zugleich darf eine offenkundig verrutschte
 * Zeile nicht unbemerkt in ein Gebaeudemodell wandern.
 *
 * Zwei Faelle sind so schwer, dass sie eine Rueckfrage bei K-Aqua verlangen,
 * bevor die Zeile ueberhaupt fuer eine Medienfreigabe herangezogen wird:
 * „Benzoic acid" (S. 28) und „Oleum" (S. 29). Bei beiden ist der Spaltenbezug
 * gestoert, nicht nur ein einzelnes Zeichen. */
export const ROWS_NEEDING_CLARIFICATION: readonly { name: string; conc: string | null; page: number }[] = [
  { name: 'Benzoic acid', conc: 'A', page: 28 },
  { name: 'Oleum', conc: null, page: 29 },
];

/** Alle Zeilen, an denen beim Abgleich mit dem Druck etwas aufgefallen ist. */
export function rowsWithPrintNotes(): ChemicalResistanceEntry[] {
  return CHEMICAL_RESISTANCE_PP.filter((entry) => entry.noteDe !== undefined);
}
