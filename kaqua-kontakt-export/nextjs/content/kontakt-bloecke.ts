// content/kontakt-bloecke.ts — typisierte Content Map.
// REGEL: Jeder Eintrag redaktionell einzigartig. Kein Keyword-Template, sonst Boilerplate-Risiko bei Google.
export type KontaktSlug = "rohr" | "netz" | "bim" | "fallback"; // pro neuer Seite erweitern -> Build erzwingt Pflege

export interface KontaktContent {
  kicker: string;
  head: string;      // volle Headline (block, modal)
  short: string;     // Kurzform (band, hero, row, sticky, fab)
  text: string;      // 2-3 Saetze, greift das konkrete Problem der Seite auf
  interest: string;  // vorbelegter Chip
  done: string;      // Bestaetigungstext nach Absenden
}

export const KONTAKT: Record<KontaktSlug, KontaktContent> = {
  rohr: {
    kicker: "Rohrleitungen",
    head: "Dimensionierung und Lieferzeit fuer Ihr Leitungsprojekt.",
    short: "Fragen zu Rohrleitungen fuer Ihr Projekt",
    text: "Nennen Sie uns Druckstufe, Medium und Trassenlaenge grob per Telefon. Unsere Ingenieure pruefen Dimensionierung und Verfuegbarkeit ab Werk und nennen Ihnen einen belastbaren Liefertermin.",
    interest: "Rohrsysteme",
    done: "Ein Ingenieur aus dem Leitungsbau meldet sich innerhalb eines Arbeitstages.",
  },
  netz: {
    kicker: "Null Leckage Netze",
    head: "Jedes verlorene Prozent Trinkwasser kostet Ihr Netz bares Geld.",
    short: "Verlustrechnung fuer Ihr Trinkwassernetz",
    text: "Schildern Sie uns kurz Netzgroesse und Klimazone. Wir rechnen Ihnen vor, wie viel Wasser und Budget ein K Aqua Feld gegenueber dem Bestand sichert, inklusive Betriebsjahren.",
    interest: "Trinkwassernetze",
    done: "Ein Netzplaner meldet sich innerhalb eines Arbeitstages mit einer ersten Verlustrechnung.",
  },
  bim: {
    kicker: "BIM Scanner",
    head: "Ihre Planung verdient pruffaehige BIM Daten ab Tag eins.",
    short: "Revit und IFC Daten fuer Ihre Planung",
    text: "Hinterlassen Sie Kontakt und Projektphase. Sie erhalten Zugang zu unseren Revit und IFC Bibliotheken sowie einen Ansprechpartner fuer die Modellpruefung Ihres Projekts.",
    interest: "BIM Daten",
    done: "Unser BIM Team meldet sich innerhalb eines Arbeitstages mit Ihren Bibliothekszugaengen.",
  },
  fallback: {
    kicker: "Kontakt",
    head: "Sprechen Sie direkt mit unseren Ingenieuren.",
    short: "Direkter Draht zu unseren Ingenieuren",
    text: "Telefonnummer, Email, ein Klick auf Ihr Thema. Mehr braucht es nicht, den Rest klaeren wir im Gespraech.",
    interest: "Beratung",
    done: "Ein Fachberater meldet sich innerhalb eines Arbeitstages bei Ihnen.",
  },
};

export const INTERESSEN = ["Rohrsysteme", "Trinkwassernetze", "BIM Daten", "Ersatzteile", "Beratung"] as const;
export const DIREKTWAHL = "+49 6085 999 99 99";
