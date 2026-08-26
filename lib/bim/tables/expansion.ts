/* Waermeausdehnung und Dehnungsausgleich.
 *
 * QUELLE: KA-Katalog_GB_06-2025_NEU.pdf
 *   S. 65 — „Linear extension compension of pp-r pipes", Formel fuer den
 *           Dehnungsschenkel, Figure 11 und 12
 *   S. 66 — „Construction of expansion bends", Figure 13 und 14
 *   S. 67 — Abschnitt 4.10 „Length Variation of K-Aqua Pipes Due to Heat"
 *
 * Seiten gerendert und von Hand uebertragen.
 *
 * DER WICHTIGSTE WERT AUF DIESEN SEITEN ist die Unterscheidung auf S. 67:
 * Monoschichtrohre dehnen sich mit 1,5·10⁻⁴ K⁻¹, K-Fiber-Rohre nur mit
 * 0,35·10⁻⁴ K⁻¹ — gut viermal weniger. Das ist der eigentliche Zweck der
 * Faserverbundlage und der Grund, warum ein K-Fiber-Strang mit deutlich
 * kuerzeren Dehnungsschenkeln auskommt. Wer fuer ein K-Fiber-Rohr mit dem
 * Kennwert des Grundwerkstoffs (1,5·10⁻⁴, Tabelle 1 auf S. 16) rechnet,
 * ueberdimensioniert um mehr als das Vierfache. */

/** Laengenausdehnungskoeffizient εt in 1/K.
 *
 *  ZUR EINHEIT — hier ist der Katalog auf S. 67 ungenau, und die Ungenauigkeit
 *  kostet den Faktor 1000: Er gibt „Δl = Linear extension in (mm)" und
 *  „L = Pipe length in (m)" an, setzt aber in Δl = εt · L · Δt einen
 *  dimensionslosen Koeffizienten ein. Rechnet man L wirklich in Metern, kommt
 *  ein Tausendstel des richtigen Werts heraus.
 *
 *  Richtig ist: εt ist 1/K, L und Δl stehen in derselben Laengeneinheit. Fuer
 *  Δl in Millimetern muss L in Millimetern eingesetzt werden. Genau das leistet
 *  `linearExpansionMm()` weiter unten — die Funktion nimmt Meter entgegen und
 *  rechnet die Umstellung selbst. */
export const EXPANSION_COEFFICIENT_PER_K = {
  /** K-Aqua Monoschichtrohre (K-Pipe, PP-R und PP-RCT). Katalog S. 67. */
  monolayer: 1.5e-4,
  /** K-Fiber-Rohre mit Faserverbundlage. Katalog S. 67. */
  fiber: 0.35e-4,
} as const;

/** Materialabhaengige Konstante C fuer die Dehnungsschenkelformel.
 *  Katalog S. 65: „C = Material depending constant for pp-r = 20". */
export const BENDING_LIMB_CONSTANT_PPR = 20;

/** Mindestabstand der beiden Schenkel eines Dehnungsbogens, als Vielfaches
 *  des Aussendurchmessers. Katalog S. 66: „Spacing B should be at least 10 x d". */
export const EXPANSION_BEND_SPACING_FACTOR = 10;

/** Anzahl 90°-Winkel fuer einen Dehnungsbogen aus Rohr und Formstuecken.
 *  Katalog S. 66: „Besides the required pipe length 4 elbows (AQ090)". */
export const EXPANSION_BEND_ELBOW_COUNT = 4;
export const EXPANSION_BEND_ELBOW_ARTICLE_PREFIX = 'AQ090';

/** Vergleich mit Stahl, Katalog S. 67: die Laengsausdehnung dieser Rohre ist
 *  „about 11 times more important than in steel pipes". */
export const EXPANSION_FACTOR_VS_STEEL = 11;

/**
 * Laengenaenderung Δl in Millimetern.
 *
 * Katalog S. 67:  Δl = εt · L · Δt
 *
 * @param lengthM      Rohrlaenge L in Metern
 * @param deltaTK      Temperaturdifferenz Δt in Kelvin
 * @param isFiber      true fuer K-Fiber-Rohre, false fuer Monoschichtrohre
 * @returns            Laengenaenderung in Millimetern
 *
 * Probe: 10 m Monoschichtrohr bei 50 K ergibt 75 mm; dasselbe als K-Fiber
 * ergibt 17,5 mm.
 */
export function linearExpansionMm(
  lengthM: number,
  deltaTK: number,
  isFiber: boolean,
): number {
  const coefficient = isFiber
    ? EXPANSION_COEFFICIENT_PER_K.fiber
    : EXPANSION_COEFFICIENT_PER_K.monolayer;
  // L von Metern in Millimeter, damit Δl in Millimetern herauskommt.
  return coefficient * (lengthM * 1000) * deltaTK;
}

/**
 * Laenge des freien Dehnungsschenkels L_s in Millimetern.
 *
 * Katalog S. 65:  L_s = C · √(d · ΔL)
 *
 * @param dMm          Rohraussendurchmesser d in Millimetern
 * @param deltaLMm     Laengenaenderung ΔL in Millimetern, aus `linearExpansionMm`
 * @returns            Schenkellaenge in Millimetern
 *
 * Figure 14 auf S. 66 stellt dieselbe Beziehung als Kurvenschar dar, dort mit
 * der Ordinate in Zentimetern. Uebernommen wird die Formel, nicht das Diagramm:
 * eine Kurve laesst sich nicht auf den Millimeter ablesen, die Formel erzeugt
 * die Kurven.
 *
 * Probe: d32 bei ΔL = 75 mm ergibt 980 mm, also rund 98 cm — das deckt sich
 * mit dem Kurvenverlauf in Figure 14.
 */
export function bendingLimbLengthMm(dMm: number, deltaLMm: number): number {
  return BENDING_LIMB_CONSTANT_PPR * Math.sqrt(dMm * deltaLMm);
}

/** Mindestabstand B der Schenkel eines Dehnungsbogens in Millimetern. */
export function expansionBendSpacingMm(dMm: number): number {
  return EXPANSION_BEND_SPACING_FACTOR * dMm;
}

/* Erlaeuterungen des Katalogs, die zur Anwendung der Formeln gehoeren. */
export const EXPANSION_NOTES = {
  principleDe:
    'Die Längenausdehnung eines PP-R-Rohres lässt sich meist durch eine Richtungsänderung ausgleichen. Das Rohr muss sich dabei in Achsrichtung frei bewegen können. Ist der Ausgleich über die Leitungsführung nicht möglich, ist ein Dehnungsbogen einzubauen. Axiale Kompensatoren sind für diesen Zweck meist ungeeignet und unwirtschaftlich.',
  principleEn:
    'The linear extension of a PP-R pipe can in most of the cases be compensated by a change in direction. Attention has to be paid to the fact that the pipeline can easily move in axial direction. Should linear extension compensation by directional change not be possible, the fitting in of an expansion bend is required. Axial bellow expansion joints are mostly unfit and uneconomical.',

  fixedPointsDe:
    'Festpunkte teilen die Leitung in Abschnitte, in denen die Dehnung stattfindet. Die Dehnung darf niemals an Einbauteilen oder Füllungen auftreten. Die Abschnitte werden von Gleitschellen geführt.',
  fixedPointsEn:
    'The fixed points must divide the pipe into sections in which contraction or expansion would take place; at any rate expansion must never occur on the inserts or on the fillings. The different pipe sections are maintained by sliding hinges.',

  planningDe:
    'Die Wärmedehnung ist bereits in der Entwurfsphase zu berücksichtigen: Lage und Führung aller Leitungsabschnitte sind daraufhin zu prüfen, ob die Dehnung aufgenommen werden kann.',
  planningEn:
    'This fact must be taken into account during the starting-up phase. Therefore, as early as in the design phase, all the alternatives regarding the position or the path of the pipes must be throughly examined in order to compensate thermal expansion in the various pipe sections.',

  bendConstructionDe:
    'Ein Dehnungsbogen lässt sich auf der Baustelle herstellen: neben der erforderlichen Rohrlänge werden vier 90°-Winkel (AQ090) benötigt. Der Schenkel L wird in Abhängigkeit von der Längenänderung ΔL bestimmt; der Abstand B soll mindestens 10 × d betragen.',
  bendConstructionEn:
    'Expansion bends can easily be made right at the site. Besides the required pipe length 4 elbows (AQ090). To construct an expansion bend, the bending limb L is calculated in dependence on the linear deformation ΔL. Spacing B should be at least 10 x d.',
} as const;

export const EXPANSION_SOURCE = 'KA-Katalog_GB_06-2025, S. 65–67';
