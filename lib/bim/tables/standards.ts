/* Normen und Regelwerke des K-Aqua-Rohrleitungssystems.
 *
 * QUELLE: KA-Katalog_GB_06-2025_NEU.pdf, S. 34, Abschnitt 2.2 „Standards".
 * Seite gerendert und von Hand uebertragen.
 *
 * Diese Liste ist die maßgebliche Fassung. In der Produkt-Frontmatter unter
 * `standards:` steht je Produkt eine Teilmenge davon; widersprechen sich
 * beide, gilt der Katalog.
 *
 * Verwendet in `Pset_KAqua_Article`, im Ausschreibungs-Langtext und auf
 * /ressourcen/technik/normen. */

export interface StandardEntry {
  /** Normbezeichnung, wie sie zu zitieren ist. */
  code: string;
  titleDe: string;
  titleEn: string;
  /** Teile der Norm, sofern der Katalog sie einzeln auffuehrt. */
  parts?: { part: string; titleDe: string; titleEn: string }[];
  /** Grob, wofuer die Norm gilt — steuert die Zuordnung zum Produkt. */
  scope: 'system' | 'pipes' | 'fittings' | 'drinking-water' | 'welding' | 'threads';
}

export const STANDARDS: StandardEntry[] = [
  {
    code: 'ISO 15874',
    titleDe:
      'Kunststoff-Rohrleitungssysteme für die Warm- und Kaltwasserinstallation – Polypropylen (PP)',
    titleEn:
      'Plastic piping system for hot and cold water installations – Polypropylene (PP)',
    scope: 'system',
    parts: [
      { part: 'Teil 1', titleDe: 'Allgemeines', titleEn: 'General' },
      { part: 'Teil 2', titleDe: 'Rohre', titleEn: 'Pipes' },
      { part: 'Teil 3', titleDe: 'Formstücke', titleEn: 'Fittings' },
      {
        part: 'Teil 5',
        titleDe: 'Gebrauchstauglichkeit des Systems',
        titleEn: 'Fitness for purpose of the system',
      },
      {
        part: 'Teil 7',
        titleDe: 'Empfehlungen zur Konformitätsbewertung',
        titleEn: 'Recommendations for the assessment of conformity',
      },
    ],
  },
  {
    code: 'DIN 8077',
    titleDe: 'Rohre aus Polypropylen (PP) – PP-H, PP-B, PP-R, PP-RCT – Maße',
    titleEn: 'Polypropylene (PP) pipes – PP-H, PP-B, PP-R, PP-RCT – dimensions',
    scope: 'pipes',
  },
  {
    code: 'DIN 8078',
    titleDe:
      'Rohre aus Polypropylen (PP) – PP-H, PP-B, PP-R, PP-RCT – Allgemeine Güteanforderungen und Prüfung',
    titleEn:
      'Polypropylene (PP) pipes – PP-H, PP-B, PP-R, PP-RCT – general quality requirements and testing',
    scope: 'pipes',
  },
  {
    code: 'DIN 16962',
    titleDe:
      'Rohrverbindungen und Rohrleitungsteile für Druckrohrleitungen aus Polypropylen (PP)',
    titleEn: 'Pipe joints and components for pressure systems of Polypropylene (PP)',
    scope: 'fittings',
  },
  {
    code: 'DIN 16928',
    titleDe:
      'Rohre aus thermoplastischen Kunststoffen, Rohrverbindungen, Rohrleitungsteile, Verlegung; Allgemeine Richtlinien',
    titleEn:
      'Pipes of Thermoplastic Materials, Pipe Joints, Elements for Pipes, Laying; General Directions',
    scope: 'system',
  },
  {
    code: 'DVGW W 544',
    titleDe: 'Kunststoffrohrsysteme für Trinkwasser – Rohre',
    titleEn: 'Plastic pipe systems for drinking water – pipes',
    scope: 'drinking-water',
  },
  {
    code: 'DVGW W 534',
    titleDe: 'Kunststoffrohrsysteme für Trinkwasser – Formstücke',
    titleEn: 'Plastic pipe systems for drinking water – fittings',
    scope: 'drinking-water',
  },
  {
    code: 'DVGW W 270',
    titleDe: 'Bewertung des mikrobiologischen Wachstums',
    // Der Katalog druckt „Assesment" mit einem s. Uebernommen wird die
    // richtige Schreibweise; der Sachverhalt bleibt unveraendert.
    titleEn: 'Assessment of microbiological growth',
    scope: 'drinking-water',
  },
  {
    code: 'DVS 2207-11',
    titleDe:
      'Muffenschweißen, Heizelementstumpfschweißen und Elektroschweißen von Rohren und Formstücken aus Polypropylen',
    titleEn:
      'Socket welding, butt-welding and electrofusion welding of Polypropylene pipes and components',
    scope: 'welding',
  },
  {
    code: 'DVS 2208-1',
    titleDe:
      'Maschinen und Geräte für das Schweißen von Rohren und Formstücken aus Polypropylen',
    titleEn: 'Machines and tools for the welding of Polypropylene pipes and components',
    scope: 'welding',
  },
  {
    code: 'ISO 7 / EN 10226',
    titleDe: 'Rohrgewinde für im Gewinde dichtende Verbindungen',
    titleEn: 'Pipe threads where pressure tight joints are done on the thread',
    scope: 'threads',
  },
  {
    code: 'EN ISO 228',
    titleDe: 'Rohrgewinde für nicht im Gewinde dichtende Verbindungen',
    titleEn: 'Pipe threads where pressure tight joints are not made on the threads',
    scope: 'threads',
  },
];

/* Abschnitt 2.1 „Quality Assurance Systems", S. 34. Die Fremdueberwachung
 * gehoert zur Normenlage: sie belegt, dass die Konformitaet nicht nur erklaert,
 * sondern geprueft wird. */
export const QUALITY_SUPERVISION = {
  /** Fremdueberwachende Stellen laut Katalog. */
  bodies: ['SKZ', 'IMA'],
  /** Zulassende Stelle laut Katalog. */
  authorizedBy: 'DVGW',
  textDe:
    'Die Fremdüberwachung für Rohre und Formstücke der Trinkwasser-Kalt- und -Warmwasserinstallation erfolgt durch SKZ oder IMA, die von der DVGW als überwachende Organisation zugelassen sind. Die externe Überwachung prüft die Qualitätssicherungssysteme, mit denen Prüfmittel und Verfahren die Installationsnormen sowie Hygiene- und Toxizitätsprüfungen absichern.',
  textEn:
    'The external supervision for pipes & fittings for potable cold & hot water system certificates from abroad are given by SKZ or IMA, who is authorized by the DVGW (German institute for gas and water) as controlling organization. External supervision aims to audit quality assurance systems by which test equipments and procedures verify installation standards, as well as hygienic and toxicity tests.',
} as const;

export const STANDARDS_SOURCE = 'KA-Katalog_GB_06-2025, S. 34';

/** Normen, die fuer eine Produktkategorie gelten. Die Systemnormen gelten
 *  immer; hinzu kommt, was zur Kategorie passt. */
export function standardsForScope(
  ...scopes: StandardEntry['scope'][]
): StandardEntry[] {
  const wanted = new Set<StandardEntry['scope']>(['system', ...scopes]);
  return STANDARDS.filter((s) => wanted.has(s.scope));
}

/** Kurzform fuer IFC-Merkmale und Ausschreibungstexte: nur die Bezeichnungen. */
export function standardCodes(entries: StandardEntry[] = STANDARDS): string[] {
  return entries.map((e) => e.code);
}
