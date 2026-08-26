/* Bekannte Widersprueche im Herstellerkatalog.
 *
 * Der Katalog KA-Katalog_GB_06-2025 ist die maßgebliche Quelle. An einigen
 * wenigen Stellen widerspricht er sich selbst — eine Spalte passt nicht zu den
 * beiden anderen derselben Zeile. Solche Stellen werden hier gefuehrt, nicht
 * stillschweigend ausgebessert. Drei Gruende:
 *
 *   1. Wer den Katalog korrigiert, erschafft eine weitere Datenfassung. Der
 *      Bestand hat davon schon genug.
 *   2. Ein Planer, der eine IFC-Datei gegen das Datenblatt haelt, muss
 *      dieselbe Zahl finden.
 *   3. Nur eine benannte Abweichung laesst sich beim Hersteller klaeren.
 *
 * Zugleich darf ein widerspruechlicher Wert nicht unbemerkt in ein
 * Gebaeudemodell wandern. Deshalb traegt jeder Eintrag neben dem gedruckten
 * Wert auch die rechnerisch stimmige Lesart und die Begruendung. Die
 * BIM-Ausgabe liefert den gedruckten Wert und den Hinweis dazu.
 *
 * tests/unit/bim-product.test.ts prueft, dass die Rechenproben ueber den
 * gesamten Bestand GENAU diese Stellen finden und keine weitere. Taucht eine
 * neue auf, faellt der Test — sie muss dann geprueft und hier eingetragen
 * werden, statt unbemerkt durchzulaufen. */

export interface CatalogIssue {
  /** Artikelnummer, auf die sich der Widerspruch bezieht. */
  articleCode: string;
  /** Betroffene Spalte, im Wortlaut des Katalogs. */
  field: string;
  /** Der Wert, wie er im Katalog gedruckt ist. */
  printed: number;
  /** Der Wert, den die uebrigen Spalten derselben Zeile ergeben. */
  consistent: number;
  /** Fundstelle, an der die Abweichung visuell geprueft wurde. */
  source: string;
  /** Worin der Widerspruch besteht und wie er nachgerechnet wurde. */
  explanationDe: string;
}

/* Der Wasserinhalt bei d315 — ein Satzfehler, der sich durch drei Tabellen zieht.
 *
 * Drei verschiedene Rohrprodukte fuehren in ihrer d315-Zeile denselben
 * Wasserinhalt von 39,39 l/m, obwohl sie drei verschiedene Innendurchmesser
 * haben:
 *
 *   AQ200315    S. 76   Di 232,80   →  π/4 · Di² = 42,57 l/m
 *   AQ200F315   S. 78   Di 229,8    →                41,48 l/m
 *   AQ207PF315  S. 79   Di 229,8    →                41,48 l/m
 *
 * Hoechstens einer dieser drei Werte koennte 39,39 lauten, und keiner tut es.
 * 39,39 l/m entspraeche einem Innendurchmesser von 224,0 mm, den keine der
 * drei Zeilen fuehrt. In jeder anderen Zeile aller drei Tabellen trifft die
 * Rechnung auf zwei Nachkommastellen genau — bei d250 etwa 25,90 gegen
 * gedruckte 25,89. Der Wert ist also offenkundig einmal falsch gesetzt und
 * dann in die beiden anderen Tabellen uebernommen worden.
 *
 * Alle drei Zeilen wurden vergroessert gerendert und abgelesen. */
export const CATALOG_ISSUES: CatalogIssue[] = [
  {
    articleCode: 'AQ200315',
    field: 'Water capacity (l/m)',
    printed: 39.39,
    consistent: 42.57,
    source: 'KA-Katalog_GB_06-2025, S. 76, visuell geprüft',
    explanationDe:
      'Die Zeile ist in sich stimmig: D = 315, Di = 232,80 und s min. = 41,1 ergeben 232,80 + 2 · 41,1 = 315,0. Allein der Wasserinhalt passt nicht — π/4 · 232,80² sind 42,57 l/m, gedruckt stehen 39,39. Die Zeile darüber (d250, Di 181,6) trifft mit gedruckten 25,89 gegen gerechnete 25,90 exakt.',
  },
  {
    articleCode: 'AQ200F315',
    field: 'Di (mm)',
    printed: 229.8,
    consistent: 228.8,
    source: 'KA-Katalog_GB_06-2025, S. 78, visuell geprüft',
    explanationDe:
      'Die Zeile gibt D = 315 und s min. = 43,1. Daraus folgt Di = 315 − 2 · 43,1 = 228,8; gedruckt steht 229,8. Für die Wandstärke spricht das Verhältnis d/s = 7,31, das sich mit allen dreizehn übrigen Zeilen derselben Tabelle deckt (7,25 bis 7,33). Ein Di von 229,8 ergäbe s = 42,6 und damit d/s = 7,39, was aus der Reihe fiele. Zum Vergleich: die Schwesterzeile AQ200315 auf S. 76 führt für dieselbe Nennweite Di = 232,80 bei s = 41,1 und ist in sich stimmig.',
  },
  {
    articleCode: 'AQ200F315',
    field: 'Water capacity (l/m)',
    printed: 39.39,
    consistent: 41.12,
    source: 'KA-Katalog_GB_06-2025, S. 78, visuell geprüft',
    explanationDe:
      'Zweiter Widerspruch in derselben Zeile, unabhängig vom ersten. Der Wasserinhalt folgt aus π/4 · Di²: für das rechnerisch stimmige Di = 228,8 sind das 41,12 l/m, für das gedruckte Di = 229,8 wären es 41,48 l/m. Gedruckt stehen 39,39 — derselbe Wert, den auch die d315-Zeilen auf S. 76 und S. 79 führen, obwohl deren Innendurchmesser abweichen.',
  },
  {
    articleCode: 'AQ207PF315',
    field: 'Di (mm)',
    printed: 229.8,
    consistent: 228.8,
    source: 'KA-Katalog_GB_06-2025, S. 79 (untere Tabelle), visuell geprüft',
    explanationDe:
      'Dieselbe Abweichung wie bei AQ200F315: D = 315 und s min. = 43,1 ergeben Di = 228,8, gedruckt steht 229,8. Die PP-R- und die PP-RCT-Ausführung des K-Fiber-Rohres SDR 7,4 führen für d315 dieselben Maße; der Satzfehler steht in beiden Tabellen.',
  },
  {
    articleCode: 'AQ207PF315',
    field: 'Water capacity (l/m)',
    printed: 39.39,
    consistent: 41.12,
    source: 'KA-Katalog_GB_06-2025, S. 79 (untere Tabelle), visuell geprüft',
    explanationDe:
      'Dieselbe Abweichung wie bei AQ200F315: gedruckt 39,39 l/m gegen rechnerisch 41,12 l/m aus dem stimmigen Innendurchmesser von 228,8 mm.',
  },
];

/** Alle Widersprueche zu einer Artikelnummer. Leer, wenn keine gefuehrt sind. */
export function issuesForArticle(code: string): CatalogIssue[] {
  return CATALOG_ISSUES.filter((i) => i.articleCode === code);
}

/** Artikelnummern, zu denen ein Widerspruch gefuehrt wird. */
export function articlesWithIssues(): string[] {
  return [...new Set(CATALOG_ISSUES.map((i) => i.articleCode))].sort();
}
