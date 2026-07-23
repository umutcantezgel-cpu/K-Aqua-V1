export type RegionId = "dach" | "europa" | "nahost" | "global";

export interface Region {
  id: RegionId;
  /** UI-Label kommt aus i18n (regions-Namespace), NICHT aus diesem Feld. */
  labelKey: RegionId;
}

export type CrisisContext = "water-scarcity" | "tsunami" | "el-nino" | "earthquake" | "infrastructure-decay" | "none";

export interface GeoHub {
  slug: string; // e.g. "uae"
  name: string; // e.g. "Vereinigte Arabische Emirate"
  region: RegionId;
  crisisContext: CrisisContext; 
  description: string; // General description of challenges in this Hub
}

export interface GeoMarket {
  slug: string;            // URL-Segment, kanonisch deutsch (z. B. "dubai")
  hubSlug: string;         // Link to GeoHub
  city: string;            // Eigenname — bleibt unübersetzt im Datensatz
  country: string;         // Eigenname
  region: RegionId;
  lat: number;             // für Globus-flyTo + Haversine
  lon: number;
  regulator: string;       // lokale Aufsicht/Norm-Regime — // TODO(content): fachlich prüfen
  norms: string[];         // einschlägige Normen — // TODO(content): fachlich prüfen
  water: string;           // Wasserprofil + Materialantwort
  focus: string[];         // typische Projekttypen vor Ort
  note: string;            // Logistik-/Lieferhinweis ab Waldsolms
}

export const WALDSOLMS = { lat: 50.37, lon: 8.51 } as const;

export const REGIONS: Region[] = [
  { id: "dach", labelKey: "dach" },
  { id: "europa", labelKey: "europa" },
  { id: "nahost", labelKey: "nahost" },
  { id: "global", labelKey: "global" },
];

export const GEO_HUBS: GeoHub[] = [
  {
    slug: "deutschland",
    name: "Deutschland",
    region: "dach",
    crisisContext: "infrastructure-decay",
    description: "Der Heimatmarkt erfordert smarte Lösungen gegen den Sanierungsstau in der Trinkwasser- und Heizungsinfrastruktur."
  },
  {
    slug: "oesterreich",
    name: "Österreich",
    region: "dach",
    crisisContext: "none",
    description: "Premium-Qualität für langlebige Wasser- und Fernwärmenetze in alpinen Regionen."
  },
  {
    slug: "schweiz",
    name: "Schweiz",
    region: "dach",
    crisisContext: "none",
    description: "Höchste Hygieneanforderungen für Spital- und Wohnbau mit Schweizer Normenkonformität."
  },
  {
    slug: "uae",
    name: "Vereinigte Arabische Emirate",
    region: "nahost",
    crisisContext: "water-scarcity",
    description: "Extreme Hitze und fast vollständige Abhängigkeit von entsalztem Meerwasser fordern höchste Materialbeständigkeit gegen Chloride und Hitze."
  },
  {
    slug: "ksa",
    name: "Saudi-Arabien",
    region: "nahost",
    crisisContext: "water-scarcity",
    description: "Das enorme Wachstum der Vision 2030 kombiniert mit akuter Wasserknappheit macht kreislauffähige und leckagefreie Systeme unverzichtbar."
  },
  {
    slug: "katar",
    name: "Katar",
    region: "nahost",
    crisisContext: "water-scarcity",
    description: "Stark schwankende Netztemperaturen im Sommer erfordern Langzeit-Druckstandfestigkeit von PP-RCT."
  },
  {
    slug: "chile",
    name: "Chile",
    region: "global",
    crisisContext: "el-nino",
    description: "Klimatische Extreme wie El Niño und Dürren verlangen extrem widerstandsfähige Rohrsysteme für die Wasserversorgung."
  },
  {
    slug: "japan",
    name: "Japan",
    region: "global",
    crisisContext: "tsunami",
    description: "Duktile PP-R Materialien widerstehen seismischen Bewegungen und sind resistent bei Tsunamis."
  },
  {
    slug: "uk",
    name: "Vereinigtes Königreich",
    region: "europa",
    crisisContext: "infrastructure-decay",
    description: "Inkrustationsfreie Systeme verhindern Kesselstein in veralteten, harten Wasserinfrastrukturen."
  },
  {
    slug: "frankreich",
    name: "Frankreich",
    region: "europa",
    crisisContext: "none",
    description: "ACS-konforme Rohrnetz-Lösungen für Großprojekte und Wohnquartiere."
  },
  {
    slug: "italien",
    name: "Italien",
    region: "europa",
    crisisContext: "none",
    description: "Sanierung der Po-Ebene-Infrastruktur durch inkrustationsfreie Trinkwassersysteme."
  },
  {
    slug: "polen",
    name: "Polen",
    region: "europa",
    crisisContext: "infrastructure-decay",
    description: "Schnell verlegbare Systeme für den stark wachsenden, modernisierenden Wohnungsmarkt."
  },
  {
    slug: "tschechien",
    name: "Tschechien",
    region: "europa",
    crisisContext: "none",
    description: "Starker Sanierungsmarkt im Gründerzeitbestand."
  },
  {
    slug: "kuwait",
    name: "Kuwait",
    region: "nahost",
    crisisContext: "water-scarcity",
    description: "Leckagefreie Installationen für extrem heißes Klima und entsalztes Wasser."
  },
  {
    slug: "oman",
    name: "Oman",
    region: "nahost",
    crisisContext: "water-scarcity",
    description: "Langlebige Systeme zur Erhaltung der kostbaren Grund- und Aflaj-Wasserressourcen."
  },
  {
    slug: "bahrain",
    name: "Bahrain",
    region: "nahost",
    crisisContext: "water-scarcity",
    description: "Vollständig entsalztes Netz profitiert von korrosionsfreien PP-R Systemen."
  },
  {
    slug: "jordanien",
    name: "Jordanien",
    region: "nahost",
    crisisContext: "water-scarcity",
    description: "Als eines der wasserärmsten Länder der Welt ist die Reduzierung von Leckagen auf unter 2 % lebensnotwendig."
  },
  {
    slug: "aegypten",
    name: "Ägypten",
    region: "nahost",
    crisisContext: "water-scarcity",
    description: "Wachstumsstädte am Nil und Roten Meer erfordern hochskalierbare, hygienische Wasserinfrastruktur."
  },
  {
    slug: "tuerkei",
    name: "Türkei",
    region: "nahost",
    crisisContext: "earthquake",
    description: "Duktiles Rohrverhalten ist Pflicht bei stark erdbebengefährdeter Infrastruktur."
  },
  {
    slug: "singapur",
    name: "Singapur",
    region: "global",
    crisisContext: "none",
    description: "Höchste Ansprüche an Hygiene und Langzeit-Druckstandfestigkeit in tropischer Dauerwärme."
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    region: "global",
    crisisContext: "none",
    description: "Tropische UV- und alterungsbeständige Netzwerke."
  },
  {
    slug: "indien",
    name: "Indien",
    region: "global",
    crisisContext: "water-scarcity",
    description: "Druckstoßfeste Schweißverbindungen für monsun-geprägte Intervallversorgung."
  },
  {
    slug: "suedafrika",
    name: "Südafrika",
    region: "global",
    crisisContext: "water-scarcity",
    description: "Nach 'Day Zero' ist Wassereffizienz durch leckagefreie Systeme absolute Staatsräson."
  },
  {
    slug: "kenia",
    name: "Kenia",
    region: "global",
    crisisContext: "water-scarcity",
    description: "Robuste Wasserversorgung für extrem schnell wachsende Metropolen in Ostafrika."
  }
];

export const GEO_MARKETS: GeoMarket[] = [
  /* ---------- DACH ---------- */
  {
    slug: "frankfurt",
    hubSlug: "deutschland",
    city: "Frankfurt am Main",
    country: "Deutschland",
    region: "dach",
    lat: 50.11,
    lon: 8.68,
    regulator: "DVGW / Trinkwasserverordnung (TrinkwV)",
    norms: ["DIN EN ISO 15874", "DVGW W 544", "KTW-BWGL Bewertungsgrundlage"],
    water: "Hartes Wasser (14–20 °dH) — korrosionsfreies PP-R/PP-RCT verhindert Kalk-Inkrustation an rauen Metalloberflächen.",
    focus: ["Hochhaus-Steigleitungen (Bankenviertel)", "Hotel- & Bürosanierung", "Rechenzentrums-Kühlwasser"],
    note: "Im Rhein-Main-Gebiet liefert K-Aqua ab Werk Waldsolms — oft am selben Tag."
  },
  {
    slug: "berlin",
    hubSlug: "deutschland",
    city: "Berlin",
    country: "Deutschland",
    region: "dach",
    lat: 52.52,
    lon: 13.41,
    regulator: "DVGW / TrinkwV, Berliner Wasserbetriebe",
    norms: ["DIN EN ISO 15874", "DVGW W 544", "DIN 1988 (TRWI)"],
    water: "Mittelhartes Wasser aus Uferfiltrat — hygienische Neutralität des PP verhindert Biofilmbildung in weitläufigen Netzen.",
    focus: ["Wohnquartier-Neubau", "Schul- & Verwaltungsbau", "Bestandssanierung Altbau"],
    note: "Großprojekte in der Hauptstadtregion werden über Speditionspartner in 24 h beliefert."
  },
  {
    slug: "muenchen",
    hubSlug: "deutschland",
    city: "München",
    country: "Deutschland",
    region: "dach",
    lat: 48.14,
    lon: 11.58,
    regulator: "DVGW / TrinkwV, SWM",
    norms: ["DIN EN ISO 15874", "DVGW W 544", "DIN 1988 (TRWI)"],
    water: "Weiches Alpenwasser mit niedrigem pH-Spielraum — PP is beständig, wo Kupfer auf erhöhte Löslichkeit trifft.",
    focus: ["Premium-Wohnbau", "Klinik- & Laborbau", "Brauerei- & Prozesswasser"],
    note: "Süddeutschland-Logistik über Nachtsprung; Schweißtechnik-Schulung vor Ort buchbar."
  },
  {
    slug: "hamburg",
    hubSlug: "deutschland",
    city: "Hamburg",
    country: "Deutschland",
    region: "dach",
    lat: 53.55,
    lon: 9.99,
    regulator: "DVGW / TrinkwV, Hamburg Wasser",
    norms: ["DIN EN ISO 15874", "DVGW W 544", "DIN 1988 (TRWI)"],
    water: "Weiches bis mittelhartes Grundwasser — geschmacksneutrale PP-Systeme erhalten die hohe Rohwasserqualität.",
    focus: ["HafenCity-Neubau", "Hotellerie", "Maritime Versorgungstechnik"],
    note: "Norddeutschland ab Lager; Großdimensionen d250+ projektbezogen direkt ab Extrusion."
  },
  {
    slug: "wien",
    hubSlug: "oesterreich",
    city: "Wien",
    country: "Österreich",
    region: "dach",
    lat: 48.21,
    lon: 16.37,
    regulator: "ÖVGW / Trinkwasserverordnung (AT)",
    norms: ["ÖNORM EN ISO 15874", "ÖVGW W 1.303", "ÖNORM B 2531"],
    water: "Hochquellwasser mit exzellenter Güte — Werterhalt durch absolut inerte Rohrwerkstoffe.",
    focus: ["Gemeindebau-Sanierung", "Hotel- & Gewerbeprojekte", "Fernwärme-Subverteilung"],
    note: "EU-Binnenmarkt: keine Zollformalitäten, Lieferung 48 h."
  },
  {
    slug: "zuerich",
    hubSlug: "schweiz",
    city: "Zürich",
    country: "Schweiz",
    region: "dach",
    lat: 47.38,
    lon: 8.54,
    regulator: "SVGW / TBDV",
    norms: ["SN EN ISO 15874", "SVGW W3", "SIA 385"],
    water: "See- und Quellwasser-Mix — Schweizer Hygieneanforderungen verlangen zertifizierte Materialneutralität.",
    focus: ["Hochpreis-Wohnbau", "Banken- & Bürosanierung", "Spitalbau"],
    note: "Exportabwicklung inkl. Schweizer Konformitätsnachweisen aus einer Hand."
  },
  /* ---------- Europa ---------- */
  {
    slug: "london",
    hubSlug: "uk",
    city: "London",
    country: "Vereinigtes Königreich",
    region: "europa",
    lat: 51.51,
    lon: -0.13,
    regulator: "WRAS — Water Regulations Approval Scheme",
    norms: ["BS EN ISO 15874", "BS 7291 Referenzrahmen", "Water Fittings Regulations 1999"],
    water: "Sehr hartes Wasser (Themse-Becken) — PP-RCT bleibt frei von Kesselstein-Anhaftung und Querschnittsverengung.",
    focus: ["High-Rise Residential", "Heritage-Sanierung", "Distriktweite Heißwassernetze"],
    note: "WRAS-konforme Dokumentation und englischsprachige Datenblätter verfügbar."
  },
  {
    slug: "paris",
    hubSlug: "frankreich",
    city: "Paris",
    country: "Frankreich",
    region: "europa",
    lat: 48.86,
    lon: 2.35,
    regulator: "ACS — Attestation de Conformité Sanitaire",
    norms: ["NF EN ISO 15874", "ACS-Zulassung", "DTU 60.1"],
    water: "Hartes Seine-Wasser mit Kalkfracht — glatte PP-Innenflächen halten Druckverluste über Jahrzehnte konstant.",
    focus: ["Grand-Paris-Wohnquartiere", "Hotel- & Denkmalsanierung", "Olympia-Nachnutzung"],
    note: "ACS-Konformitätsnachweise und französische Verlegerichtlinien im Lieferumfang."
  },
  {
    slug: "mailand",
    hubSlug: "italien",
    city: "Mailand",
    country: "Italien",
    region: "europa",
    lat: 45.46,
    lon: 9.19,
    regulator: "DM 174/2004 (Trinkwasserkontakt, IT)",
    norms: ["UNI EN ISO 15874", "DM 174/2004", "UNI 9182"],
    water: "Grundwasser aus der Po-Ebene mit hoher Härte — inkrustationsfreie Systeme senken Wartungskosten spürbar.",
    focus: ["Hochhaus-Cluster Porta Nuova", "Mode- & Retail-Flagships", "Industrie Norditalien"],
    note: "Alpen-Transit-Logistik 48–72 h; italienische Unterlagen verfügbar."
  },
  {
    slug: "warschau",
    hubSlug: "polen",
    city: "Warschau",
    country: "Polen",
    region: "europa",
    lat: 52.23,
    lon: 21.01,
    regulator: "PZH-Hygienezertifikat (Państwowy Zakład Higieny)",
    norms: ["PN-EN ISO 15874", "PZH-Atest", "Warunki Techniczne"],
    water: "Weichsel-Uferfiltrat — wachstumsstarker Wohnungsmarkt mit hohem Bedarf an schnell verlegbaren Systemen.",
    focus: ["Wohnquartier-Neubau", "Logistik- & Industriehallen", "Modernisierung Plattenbau"],
    note: "EU-Logistik 24–48 h; polnischsprachige Verarbeitungsrichtlinien vorhanden."
  },
  {
    slug: "prag",
    hubSlug: "tschechien",
    city: "Prag",
    country: "Tschechien",
    region: "europa",
    lat: 50.08,
    lon: 14.44,
    regulator: "SZÚ-Hygienezulassung (CZ)",
    norms: ["ČSN EN ISO 15874", "SZÚ-Attest", "Vyhláška 409/2005"],
    water: "Moldau-Talsperrenwasser — stabile Qualität, starker Sanierungsmarkt im Gründerzeitbestand.",
    focus: ["Altbau-Strangsanierung", "Hotellerie", "Automotive-Zulieferindustrie"],
    note: "Nachbarmarkt ab Werk: Lieferung in 24 h, technische Hotline auf Deutsch und Englisch."
  },
  /* ---------- Naher & Mittlerer Osten ---------- */
  {
    slug: "dubai",
    hubSlug: "uae",
    city: "Dubai",
    country: "VAE",
    region: "nahost",
    lat: 25.2,
    lon: 55.27,
    regulator: "DEWA — Dubai Electricity & Water Authority",
    norms: ["ISO 15874", "DEWA Water Code", "Dubai Building Code"],
    water: "Entsalztes Meerwasser mit hoher Chloridfracht und Dauertemperaturen >30 °C — das Kernszenario für PP-RCT-Temperaturreserven.",
    focus: ["Super-High-Rise-Türme", "Hotel-Resorts", "District Cooling Make-up"],
    note: "Seefracht-FCL ab Hamburg; Stumpfschweiß-Supervision auf der Baustelle buchbar."
  },
  {
    slug: "abudhabi",
    hubSlug: "uae",
    city: "Abu Dhabi",
    country: "VAE",
    region: "nahost",
    lat: 24.45,
    lon: 54.38,
    regulator: "DoE Abu Dhabi / Estidama",
    norms: ["ISO 15874", "Estidama Pearl Rating", "ADQCC-Konformität"],
    water: "Entsalzungswasser mit Nachhärtung — Estidama-Nachhaltigkeitspunkte honorieren recycelbare Rohrwerkstoffe.",
    focus: ["Regierungs- & Kulturbauten", "Saadiyat-Resorts", "Industriezonen KIZAD"],
    note: "Pearl-Rating-Dokumentation (Materialtransparenz) liegt dem Angebot bei."
  },
  {
    slug: "doha",
    hubSlug: "katar",
    city: "Doha",
    country: "Katar",
    region: "nahost",
    lat: 25.29,
    lon: 51.53,
    regulator: "Kahramaa — Qatar General Electricity & Water Corp.",
    norms: ["ISO 15874", "QCS 2024 (Qatar Construction Specifications)", "Kahramaa-Zulassung"],
    water: "Zu 99 % entsalztes Wasser, Netztemperaturen bis 40 °C im Sommer — Langzeit-Druckstandfestigkeit ist das zentrale Auswahlkriterium.",
    focus: ["Lusail-Stadtentwicklung", "Stadien-Nachnutzung", "Hospitality"],
    note: "QCS-konforme Einreichunterlagen und Drittprüfberichte verfügbar."
  },
  {
    slug: "riad",
    hubSlug: "ksa",
    city: "Riad",
    country: "Saudi-Arabien",
    region: "nahost",
    lat: 24.71,
    lon: 46.68,
    regulator: "SASO / Saudi Water Authority",
    norms: ["SASO ISO 15874", "Saudi Building Code (SBC 701)", "SASO Quality Mark"],
    water: "Mix aus Entsalzung (SWCC-Pipelines) und fossilem Grundwasser — extreme Sommerhitze verlangt PP-RCT-Reserven.",
    focus: ["Vision-2030-Giga-Projekte", "King Salman Park", "Wohnstadt-Erweiterungen"],
    note: "SASO-Zertifizierung und SABER-Registrierung werden projektbezogen bereitgestellt."
  },
  {
    slug: "dschidda",
    hubSlug: "ksa",
    city: "Dschidda",
    country: "Saudi-Arabien",
    region: "nahost",
    lat: 21.49,
    lon: 39.19,
    regulator: "SASO / SWCC",
    norms: ["SASO ISO 15874", "SBC 701", "SWCC-Anschlussrichtlinien"],
    water: "Rotmeer-Entsalzung mit hoher Salzfracht im Umfeld — absolute Korrosionsfreiheit ist hier ein KO-Kriterium gegen Metall.",
    focus: ["Jeddah Central Project", "Hafen- & Logistikbauten", "Pilger-Hospitality (Makkah-Korridor)"],
    note: "Seefracht direkt nach Jeddah Islamic Port; arabischsprachige Datenblätter in Arbeit."
  },
  {
    slug: "neom",
    hubSlug: "ksa",
    city: "NEOM / The Line",
    country: "Saudi-Arabien",
    region: "nahost",
    lat: 27.96,
    lon: 35.27,
    regulator: "NEOM Authority / SASO",
    norms: ["ISO 15874", "NEOM Design Codes", "LEED/Estidama-Äquivalente"],
    water: "100 % erneuerbar betriebene Entsalzung geplant — das Projekt fordert vollständig kreislauffähige Materialien: Recycling-Code 5 inklusive.",
    focus: ["Linearstadt-Infrastruktur", "Oxagon-Industriehafen", "Trojena-Bergresorts"],
    note: "Frühe Planungsphase: K-Aqua unterstützt mit EPD-Daten und parametrischen Rohrnetz-Modellen."
  },
  {
    slug: "kuwait",
    hubSlug: "kuwait",
    city: "Kuwait-Stadt",
    country: "Kuwait",
    region: "nahost",
    lat: 29.38,
    lon: 47.99,
    regulator: "MEW — Ministry of Electricity & Water",
    norms: ["ISO 15874", "MEW-Spezifikationen", "Kuwait Building Code"],
    water: "Entsalztes Golfwasser, gemischt mit Brackwasser — chloridresistente Kunststoffsysteme sind Standardempfehlung.",
    focus: ["Silk-City-Planung", "Wohnstädte (PAHW)", "Öl- & Gas-Begleitinfrastruktur"],
    note: "MEW-Präqualifikation über lokale Partner; Lieferung via Shuwaikh Port."
  },
  {
    slug: "maskat",
    hubSlug: "oman",
    city: "Maskat",
    country: "Oman",
    region: "nahost",
    lat: 23.59,
    lon: 58.41,
    regulator: "Nama Water Services (vormals Diam)",
    norms: ["ISO 15874", "Oman Plumbing Code", "Nama-Materialzulassung"],
    water: "Entsalzung plus Aflaj-Tradition — Oman honoriert langlebige, wartungsarme Systeme in öffentlichen Ausschreibungen.",
    focus: ["Hafenstadt Duqm", "Hotel- & Tourismusprojekte", "Moschee- & Kulturbauten"],
    note: "GCC-Logistikkorridor via Jebel Ali; technische Abnahme nach Nama-Protokoll."
  },
  {
    slug: "manama",
    hubSlug: "bahrain",
    city: "Manama",
    country: "Bahrain",
    region: "nahost",
    lat: 26.23,
    lon: 50.59,
    regulator: "EWA — Electricity & Water Authority",
    norms: ["ISO 15874", "EWA-Spezifikationen", "Bahrain Building Code"],
    water: "Vollständig entsalztes Netz mit hohen Sommertemperaturen — PP-RCT hält die Druckreserve, wo PVC altert.",
    focus: ["Bahrain Bay", "Bankenviertel-Sanierung", "Inselerschließungen"],
    note: "Kompakter Markt mit kurzen Wegen — Komplettpakete inkl. Schweißtechnik-Verleih."
  },
  {
    slug: "amman",
    hubSlug: "jordanien",
    city: "Amman",
    country: "Jordanien",
    region: "nahost",
    lat: 31.95,
    lon: 35.93,
    regulator: "WAJ — Water Authority of Jordan / Miyahuna",
    norms: ["JS EN ISO 15874", "WAJ-Standards", "Jordanian Plumbing Code"],
    water: "Eines der wasserärmsten Länder der Welt — leckagefreie Schweißverbindungen sind aktive Wassersparpolitik (Non-Revenue Water < 2 %).",
    focus: ["Disi-Pipeline-Subnetze", "Krankenhaus- & Universitätsbau", "Flüchtlingsstadt-Infrastruktur"],
    note: "Entwicklungsbank-finanzierte Projekte: K-Aqua liefert Tender-konforme Dokumentation."
  },
  {
    slug: "kairo",
    hubSlug: "aegypten",
    city: "Kairo",
    country: "Ägypten",
    region: "nahost",
    lat: 30.04,
    lon: 31.24,
    regulator: "HCWW — Holding Company for Water & Wastewater",
    norms: ["ES ISO 15874 (EOS)", "HCWW-Spezifikationen", "Egyptian Code of Practice"],
    water: "Nilwasser mit saisonaler Trübung — glatte PP-Oberflächen minimieren Ablagerung in der Hausinstallation.",
    focus: ["New Administrative Capital", "Wohnstädte (NUCA)", "Hotel-Korridor Rotes Meer"],
    note: "EOS-Registrierung über lokale Partner; Mittelmeer-Seefracht ab Hamburg 10–14 Tage."
  },
  {
    slug: "istanbul",
    hubSlug: "tuerkei",
    city: "Istanbul",
    country: "Türkei",
    region: "nahost",
    lat: 41.01,
    lon: 28.98,
    regulator: "İSKİ / TSE-Zertifizierung",
    norms: ["TS EN ISO 15874", "TSE K 309", "İSKİ-Anschlussrichtlinien"],
    water: "Talsperrenwasser mit saisonalen Schwankungen — erdbebensicheres, duktiles Rohrverhalten ist Planungskriterium.",
    focus: ["Hotelkomplexe", "Hochhaus-Wohnbau", "Krankenhaus-Neubauten"],
    note: "Flexible Lieferketten über Landweg (5–7 Tage) oder Seefracht."
  },
  /* ---------- Afrika & Asien-Pazifik ---------- */
  {
    slug: "singapur",
    hubSlug: "singapur",
    city: "Singapur",
    country: "Singapur",
    region: "global",
    lat: 1.35,
    lon: 103.82,
    regulator: "PUB — Public Utilities Board",
    norms: ["SS 636", "ISO 15874", "PUB Stamp of Compliance"],
    water: "NEWater & entsalztes Wasser, tropische Dauerwärme — höchste Anforderungen an Langzeit-Druckstandfestigkeit.",
    focus: ["Public Housing (HDB)", "Marina-Hochhäuser", "Halbleiter-Reinstwasser-Vorstufen"],
    note: "Seefracht ab Hamburg; vollständige PUB-Einreichunterlagen verfügbar."
  },
  {
    slug: "kualalumpur",
    hubSlug: "malaysia",
    city: "Kuala Lumpur",
    country: "Malaysia",
    region: "global",
    lat: 3.14,
    lon: 101.69,
    regulator: "SPAN — National Water Services Commission",
    norms: ["MS ISO 15874", "SPAN-Produktzulassung", "UBBL Building By-Laws"],
    water: "Tropisches Oberflächenwasser, hohe Umgebungsfeuchte — UV- und alterungsbeständige Systeme sind Standard.",
    focus: ["TRX-Finanzdistrikt", "Mixed-Use-Türme", "Industriekorridor Johor"],
    note: "SPAN-Listung über Distributionspartner; ASEAN-Drehkreuz für die Region."
  },
  {
    slug: "mumbai",
    hubSlug: "indien",
    city: "Mumbai",
    country: "Indien",
    region: "global",
    lat: 19.08,
    lon: 72.88,
    regulator: "BIS — Bureau of Indian Standards",
    norms: ["IS 15801", "ISO 15874", "NBC India (Plumbing)"],
    water: "Monsun-geprägte Talsperrenversorgung mit Intervallbetrieb — druckstoßfeste Schweißverbindungen zählen doppelt.",
    focus: ["High-Rise Redevelopment", "Krankenhaus- & Pharmabau", "Smart-Cities-Programm"],
    note: "BIS-Konformität projektbezogen; technische Schulung remote + vor Ort."
  },
  {
    slug: "kapstadt",
    hubSlug: "suedafrika",
    city: "Kapstadt",
    country: "Südafrika",
    region: "global",
    lat: -33.92,
    lon: 18.42,
    regulator: "SABS / SANS-Normenwerk",
    norms: ["SANS 15874", "SABS-Zulassung", "SANS 10252-1"],
    water: "Wasserknappheit nach „Day Zero\" — leckagefreie Schweißverbindungen sind hier Wassersparpolitik.",
    focus: ["Krankenhaus- & Hotelbau", "Township-Infrastruktur", "Weingut-Prozesswasser"],
    note: "Projektgeschäft mit lokalem Partnernetz; Schulung der Schweißteams inklusive."
  },
  {
    slug: "nairobi",
    hubSlug: "kenia",
    city: "Nairobi",
    country: "Kenia",
    region: "global",
    lat: -1.29,
    lon: 36.82,
    regulator: "KEBS — Kenya Bureau of Standards",
    norms: ["KS ISO 15874", "KEBS Diamond Mark", "NCA-Baurichtlinien"],
    water: "Talsperren- und Grundwasser-Mix in schnell wachsender Metropole — robuste, einfach schulbare Verbindungstechnik gefragt.",
    focus: ["Affordable-Housing-Programm", "Tatu City", "Kranken- & Bildungsbauten"],
    note: "Ostafrika-Hub: Lieferung via Mombasa; Schweißtraining als Capacity Building."
  }
];

export function haversineKm(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number }
): number {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return Math.round(6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h))));
}

export function nearestMarkets(slug: string, n = 3): GeoMarket[] {
  const me = GEO_MARKETS.find((g) => g.slug === slug);
  if (!me) return [];
  return GEO_MARKETS.filter((g) => g.slug !== slug)
    .map((g) => ({ g, d: haversineKm(me, g) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, n)
    .map((x) => x.g);
}
