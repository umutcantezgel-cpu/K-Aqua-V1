/* Werkstoffkennwerte PP-R und PP-RCT.
 *
 * QUELLE — und zwar die einzige: KA-Katalog_GB_06-2025_NEU.pdf,
 *   Tabelle 1 „Physical properties PP-R"   auf Seite 16
 *   Tabelle 4 „Physical properties PP-RCT" auf Seite 22
 *
 * ABGETIPPT, NICHT EXTRAHIERT. Die Textebene des Katalogs verliert saemtliche
 * Hoch- und Tiefstellungen. Sie liefert dort, wo im Druck W·m⁻¹·K⁻¹ steht, die
 * Zeichenfolge `WK-1m-1`; aus 1,5·10⁻⁴ K⁻¹ wird `*10-4K-1`, aus >10¹² Ω wird
 * `> 1012`. Wer den Textlayer uebernimmt, schreibt in jede erzeugte IFC-Datei
 * eine falsche Einheit und eine um acht Zehnerpotenzen falsche Zahl. Beide
 * Seiten wurden deshalb gerendert und die Werte von Hand uebertragen.
 *
 * Diese Datei ist die Referenz fuer die Werkstoffangaben in
 * `Pset_MaterialCommon`, `Pset_MaterialThermal` und `Pset_MaterialMechanical`.
 * Im 3D-Baum steht als Dichte das Literal 0.9 g/cm³ (900 kg/m³) fuer die
 * Massenprobe — der Katalog nennt 905 kg/m³. Fuer die Pruefschranke dort ist
 * der Unterschied belanglos, fuer eine veroeffentlichte Werkstoffangabe nicht.
 * Veroeffentlicht wird 905. */

export type BimMaterialId = 'PP-R' | 'PP-RCT';

/** Ein Kennwert, wie er im Katalog steht — Wert, Einheit und Pruefnorm. */
export interface MaterialProperty {
  /** Stabiler Schluessel; wird nie uebersetzt und nie umbenannt. */
  key: string;
  labelDe: string;
  labelEn: string;
  /** Zahl, wo eine Zahl steht. Sonst der Text des Katalogs (z. B. „NO break"). */
  value: number | string;
  /** SI-Einheit ausgeschrieben. Leerer String, wo der Katalog keine fuehrt. */
  unit: string;
  /** Pruefbedingung, wie im Katalog geklammert. */
  condition?: string;
  /** Pruefnorm laut Katalogspalte „Test Method". */
  testMethod: string;
  /** Nur gesetzt, wo der Druck selbst zu beanstanden ist. */
  note?: string;
}

export interface BimMaterial {
  id: BimMaterialId;
  /** Kurzbezeichnung, wie sie in IfcMaterial.Name steht. */
  name: string;
  nameDe: string;
  nameEn: string;
  properties: MaterialProperty[];
  /** Seitenbeleg im Katalog. */
  source: string;
}

/* Tabelle 1, Seite 16. Reihenfolge wie im Druck. */
const PP_R_PROPERTIES: MaterialProperty[] = [
  {
    key: 'density',
    labelDe: 'Dichte',
    labelEn: 'Density',
    value: 905,
    unit: 'kg/m³',
    testMethod: 'ISO 1183',
  },
  {
    key: 'melt_flow_rate',
    labelDe: 'Schmelzflussrate',
    labelEn: 'Melt Flow Rate',
    value: 0.25,
    unit: 'g/10 min',
    condition: '230 °C / 2,16 kg',
    testMethod: 'ISO 1133',
  },
  {
    key: 'flexural_modulus',
    labelDe: 'Biege-E-Modul',
    labelEn: 'Flexural Modulus',
    value: 800,
    unit: 'MPa',
    condition: '2 mm/min',
    testMethod: 'ISO 178',
  },
  {
    key: 'tensile_modulus',
    labelDe: 'Zug-E-Modul',
    labelEn: 'Tensile Modulus',
    value: 900,
    unit: 'MPa',
    condition: '1 mm/min',
    testMethod: 'ISO 527',
  },
  {
    key: 'tensile_strain_at_yield',
    labelDe: 'Streckdehnung',
    labelEn: 'Tensile Strain at Yield',
    value: 13.5,
    unit: '%',
    condition: '50 mm/min',
    testMethod: 'ISO 527-2',
  },
  {
    key: 'tensile_stress_at_yield',
    labelDe: 'Streckspannung',
    labelEn: 'Tensile Stress at Yield',
    value: 25,
    unit: 'MPa',
    condition: '50 mm/min',
    testMethod: 'ISO 527-2',
    // Der Druck auf S. 16 beschriftet diese Zeile ein zweites Mal als
    // „Tensile Strain at Yield", gibt aber MPa als Einheit an. Die
    // Gegentabelle fuer PP-RCT auf S. 22 fuehrt denselben Wert von 25 MPa
    // korrekt als „Tensile Stress at Yield". Uebernommen wird die
    // physikalisch richtige Bezeichnung; der Wert bleibt unveraendert.
    note: 'Katalog S. 16 beschriftet die Zeile als „Tensile Strain at Yield“ bei Einheit MPa; S. 22 fuehrt denselben Wert als „Tensile Stress at Yield“.',
  },
  {
    key: 'thermal_conductivity',
    labelDe: 'Wärmeleitfähigkeit',
    labelEn: 'Thermal Conductivity',
    value: 0.24,
    unit: 'W/(m·K)',
    testMethod: 'DIN 52612',
  },
  {
    key: 'thermal_expansion',
    labelDe: 'Längenausdehnungskoeffizient',
    labelEn: 'Coefficient of Thermal Expansion',
    value: 1.5e-4,
    unit: '1/K',
    condition: '0 °C bis 70 °C',
    testMethod: 'DIN 53752',
  },
  {
    key: 'charpy_unnotched_23',
    labelDe: 'Schlagzähigkeit Charpy, ungekerbt',
    labelEn: 'Charpy Impact Strength, unnotched',
    value: 'kein Bruch',
    unit: '',
    condition: '23 °C',
    testMethod: 'ISO 179/1eU',
  },
  {
    key: 'charpy_unnotched_0',
    labelDe: 'Schlagzähigkeit Charpy, ungekerbt',
    labelEn: 'Charpy Impact Strength, unnotched',
    value: 'kein Bruch',
    unit: '',
    condition: '0 °C',
    testMethod: 'ISO 179/1eU',
  },
  {
    key: 'charpy_unnotched_m20',
    labelDe: 'Schlagzähigkeit Charpy, ungekerbt',
    labelEn: 'Charpy Impact Strength, unnotched',
    value: 40,
    unit: 'kJ/m²',
    condition: '−20 °C',
    testMethod: 'ISO 179/1eU',
  },
  {
    key: 'charpy_notched_23',
    labelDe: 'Kerbschlagzähigkeit Charpy',
    labelEn: 'Charpy Impact Strength, notched',
    value: 20,
    unit: 'kJ/m²',
    condition: '23 °C',
    testMethod: 'ISO 179/1eA',
  },
  {
    key: 'charpy_notched_0',
    labelDe: 'Kerbschlagzähigkeit Charpy',
    labelEn: 'Charpy Impact Strength, notched',
    value: 3.5,
    unit: 'kJ/m²',
    condition: '0 °C',
    testMethod: 'ISO 179/1eA',
  },
  {
    key: 'charpy_notched_m20',
    labelDe: 'Kerbschlagzähigkeit Charpy',
    labelEn: 'Charpy Impact Strength, notched',
    value: 2,
    unit: 'kJ/m²',
    condition: '−20 °C',
    testMethod: 'ISO 179/1eA',
  },
];

/* Tabelle 4, Seite 22. Reihenfolge wie im Druck. */
const PP_RCT_PROPERTIES: MaterialProperty[] = [
  {
    key: 'density',
    labelDe: 'Dichte',
    labelEn: 'Density',
    value: 905,
    unit: 'kg/m³',
    testMethod: 'ISO 1183',
  },
  {
    key: 'melt_flow_rate',
    labelDe: 'Schmelzflussrate',
    labelEn: 'Melt Flow Rate',
    value: 0.3,
    unit: 'g/10 min',
    condition: '230 °C / 2,16 kg',
    testMethod: 'ISO 1133',
  },
  {
    key: 'tensile_stress_at_yield',
    labelDe: 'Streckspannung',
    labelEn: 'Tensile Stress at Yield',
    value: 25,
    unit: 'MPa',
    condition: '50 mm/min',
    testMethod: 'ISO 527-2',
  },
  {
    key: 'tensile_strain_at_yield',
    labelDe: 'Streckdehnung',
    labelEn: 'Tensile Strain at Yield',
    value: 10,
    unit: '%',
    condition: '50 mm/min',
    testMethod: 'ISO 527-2',
  },
  {
    key: 'tensile_modulus',
    labelDe: 'Zug-E-Modul',
    labelEn: 'Modulus of Elasticity in Tension',
    value: 900,
    unit: 'MPa',
    condition: '1 mm/min',
    testMethod: 'ISO 527',
  },
  {
    key: 'charpy_notched_23',
    labelDe: 'Kerbschlagzähigkeit Charpy',
    labelEn: 'Charpy Impact Strength, notched',
    value: 40,
    unit: 'kJ/m²',
    condition: '+23 °C',
    testMethod: 'ISO 179/1eA',
  },
  {
    key: 'charpy_notched_0',
    labelDe: 'Kerbschlagzähigkeit Charpy',
    labelEn: 'Charpy Impact Strength, notched',
    value: 4,
    unit: 'kJ/m²',
    condition: '0 °C',
    testMethod: 'ISO 179/1eA',
  },
  {
    key: 'charpy_notched_m20',
    labelDe: 'Kerbschlagzähigkeit Charpy',
    labelEn: 'Charpy Impact Strength, notched',
    value: 2,
    unit: 'kJ/m²',
    condition: '−20 °C',
    testMethod: 'ISO 179/1eA',
  },
  {
    key: 'thermal_expansion',
    labelDe: 'Mittlerer Längenausdehnungskoeffizient',
    labelEn: 'Mean Linear Thermal Coefficient of Expansion',
    value: 1.5e-4,
    unit: '1/K',
    condition: '0 °C bis 70 °C',
    testMethod: 'DIN 53752',
  },
  {
    key: 'thermal_conductivity',
    labelDe: 'Wärmeleitfähigkeit',
    labelEn: 'Thermal Conductivity',
    value: 0.24,
    unit: 'W/(m·K)',
    testMethod: 'DIN 52612 Teil 1',
  },
  {
    key: 'surface_resistance',
    labelDe: 'Oberflächenwiderstand',
    labelEn: 'Surface Resistance',
    value: '> 1·10¹²',
    unit: 'Ω',
    testMethod: 'DIN 53482 / VDE 0303 Teil 2',
  },
];

export const BIM_MATERIALS: Record<BimMaterialId, BimMaterial> = {
  'PP-R': {
    id: 'PP-R',
    name: 'PP-R',
    nameDe: 'Polypropylen-Random-Copolymer (PP-R)',
    nameEn: 'Polypropylene Random Copolymer (PP-R)',
    properties: PP_R_PROPERTIES,
    source: 'KA-Katalog_GB_06-2025, S. 16, Tabelle 1',
  },
  'PP-RCT': {
    id: 'PP-RCT',
    name: 'PP-RCT',
    nameDe: 'Polypropylen-Random-Copolymer mit erhöhter Kristallinität (PP-RCT)',
    nameEn: 'Polypropylene Random Crystallinity Temperature (PP-RCT)',
    properties: PP_RCT_PROPERTIES,
    source: 'KA-Katalog_GB_06-2025, S. 22, Tabelle 4',
  },
};

/* Zeitstandfestigkeit aus dem Saeulendiagramm auf S. 22, in bar.
 * Der Katalog nennt dort ausserdem die Mindestanforderungen: 20 bar bei
 * 20 °C und 10 bar bei 70 °C. Bemerkenswert und bewusst so uebernommen:
 * bei 20 °C liegt PP-R hoeher als PP-RCT, erst bei 70 und 95 °C dreht sich
 * das Verhaeltnis. Genau das ist der Grund fuer die Werkstoffwahl. */
export const CREEP_STRENGTH_BAR = {
  '20C_50a': { 'PP-R': 30.9, 'PP-RCT': 29.2, minimum: 20 },
  '70C_50a': { 'PP-R': 10.2, 'PP-RCT': 12.9, minimum: 10 },
  '95C_5a': { 'PP-R': 6.2, 'PP-RCT': 8.5, minimum: null },
} as const;

/* Zeitstandinnendruck nach ISO 9080, 50 Jahre bei 70 °C — Fliesstext S. 22. */
export const ISO_9080_70C_50A_MPA = { 'PP-R': 3.2, 'PP-RCT': 5.0 } as const;

/* --- Direktzugriffe fuer den IFC-Schreiber -------------------------------
 * Beide Werkstoffe teilen diese Kennwerte. Sie stehen hier einzeln, damit der
 * IFC-Schreiber sie nicht aus der Merkmalsliste heraussuchen muss. Aendert
 * sich einer, aendert er sich in der Liste oben mit. */

/** IfcMaterialProperties → Pset_MaterialCommon.MassDensity, in kg/m³. */
export const MASS_DENSITY_KG_M3 = 905;

/** Pset_MaterialThermal.ThermalConductivity, in W/(m·K). */
export const THERMAL_CONDUCTIVITY_W_MK = 0.24;

/** Pset_MaterialThermal.ThermalExpansionCoefficient, in 1/K. */
export const THERMAL_EXPANSION_PER_K = 1.5e-4;

/** Pset_MaterialMechanical.YoungModulus, in MPa. */
export const YOUNG_MODULUS_MPA = 900;

export function getBimMaterial(id: BimMaterialId): BimMaterial {
  return BIM_MATERIALS[id];
}

/** Ordnet die Werkstoffangabe aus der Produkt-Frontmatter einer Kennung zu.
 *  Frontmatter fuehrt Schreibweisen wie „PP-R", „PP-RCT", „PP-R / PP-RCT".
 *  Ohne erkennbare Angabe wird PP-R angenommen — das ist der Grundwerkstoff
 *  des Systems; PP-RCT fuehrt der Katalog immer ausdruecklich. */
export function resolveMaterialId(raw: string | undefined): BimMaterialId {
  if (raw && /PP-?RCT/i.test(raw)) return 'PP-RCT';
  return 'PP-R';
}
