// content/kontakt-bloecke.ts — typisierte Content Map.
// REGEL: Jeder Eintrag redaktionell einzigartig. Kein Keyword-Template, sonst Boilerplate-Risiko bei Google.

export type KontaktSlug = 
  | "home" | "unternehmen" 
  | "produkte_fittings" | "produkte_rohre" | "produkte_armaturen" 
  | "produkte_werkzeuge" | "produkte_uebergaenge" | "produkte_zubehoer" 
  | "katalog" | "finder" | "produkte" 
  | "academy" | "referenzen" | "support" | "ausschreibungstexte" | "service"
  | "maerkte_trinkwasser" | "maerkte_klima" | "maerkte_industrie" | "maerkte_schiffbau" 
  | "maerkte_landwirtschaft" | "maerkte" 
  | "loesungen_hochhaus" | "loesungen_krankenhaus" | "loesungen_hotel" | "loesungen" 
  | "co2_rechner" | "trust_center" | "projektanfrage" | "kontakt" | "news" 
  | "karriere" | "partnerschaft" | "impressum" | "datenschutz" | "fallback";

export interface KontaktContent {
  kicker: string;
  head: string;      
  short: string;     
  text: string;      
  interest: string;  
  done: string;      
}

export const KONTAKT: Record<KontaktSlug, KontaktContent> = {
  home: {
    kicker: "Direktkontakt",
    head: "Starten Sie Ihr naechstes Rohrprojekt mit belastbaren Zahlen.",
    short: "Sprechen Sie direkt mit der Produktion",
    text: "Uebergeben Sie uns grobe Parameter wie Rohrdurchmesser und Trassenlaenge. Wir prüfen die Fertigungskapazitaeten in unserem deutschen Werk und nennen Ihnen realistische Lieferzeiten.",
    interest: "Rohrsysteme",
    done: "Einer unserer Ingenieure prüft Ihre Parameter und meldet sich zeitnah.",
  },
  unternehmen: {
    kicker: "Werksführung & Beratung",
    head: "Lernen Sie die Fertigung hinter K-Aqua persönlich kennen.",
    short: "Termin für Werksbesuch vereinbaren",
    text: "Als familiengefuehrtes Unternehmen oeffnen wir unsere Tore gerne für Planer und Bauherren. Hinterlassen Sie Ihre Kontaktdaten, um einen Besuch im Werk Waldsolms abzustimmen.",
    interest: "Beratung",
    done: "Wir melden uns zur Koordination Ihres Besuchstermins in Waldsolms.",
  },
  produkte_fittings: {
    kicker: "Formteile & Fittings",
    head: "Stücklistenprüfung für Ihre Fittings und Verbindungen.",
    short: "Fittings für Ihr PP-R System anfragen",
    text: "Senden Sie uns die Dimensionen und Mengen Ihrer benoetigten Formteile. Wir schaetzen die Lieferbarkeit und empfehlen auf Wunsch Optimierungen für den hydraulischen Abgleich.",
    interest: "Ersatzteile",
    done: "Unser Technischer Vertrieb meldet sich, um die Stückliste zu besprechen.",
  },
  produkte_rohre: {
    kicker: "PP-R Rohre",
    head: "Dimensionierung und Lieferzeit für Ihr Leitungsprojekt.",
    short: "Fragen zu PP-R Rohren für Ihr Projekt",
    text: "Nennen Sie uns Druckstufe, Medium und Trassenlaenge grob per Telefon. Unsere Ingenieure prüfen Dimensionierung und Verfügbarkeit ab Werk und nennen Ihnen einen belastbaren Liefertermin.",
    interest: "Rohrsysteme",
    done: "Ein Ingenieur aus dem Leitungsbau meldet sich innerhalb eines Arbeitstages.",
  },
  produkte_armaturen: {
    kicker: "Ventile & Armaturen",
    head: "Die passende Armatur für Ihre hydraulischen Anforderungen.",
    short: "Armaturen für komplexe Netze finden",
    text: "Absperr-, Regel- oder Spezialventile: Beschreiben Sie uns kurz den maximalen Betriebsdruck und das Fördermedium. Wir leiten Ihnen die passenden Datenblätter und Verfügbarkeiten weiter.",
    interest: "Ersatzteile",
    done: "Ein Ventil-Experte sendet Ihnen in Kürze die gewünschten Spezifikationen.",
  },
  produkte_werkzeuge: {
    kicker: "Schweisswerkzeuge",
    head: "Sichern Sie sich das richtige Werkzeug für absolut dichte Nähte.",
    short: "Schweißwerkzeuge leihen oder kaufen",
    text: "Ob Muffenschweißen oder Heizwendel-Technik: Teilen Sie uns mit, welche Dimensionen auf der Baustelle anstehen. Wir kümmern uns um die passenden Maschinen zur Miete oder zum Kauf.",
    interest: "Beratung",
    done: "Unser Equipment-Team prüft den Bestand und meldet sich zeitnah.",
  },
  produkte_uebergaenge: {
    kicker: "Systemübergänge",
    head: "Sichere Materialübergänge von Metall auf Kunststoff.",
    short: "Übergangsstücke für Ihre Installation",
    text: "Geben Sie uns die genauen Gewindemaße und das Material der Bestandsrohre durch. Wir empfehlen Ihnen korrosionsfreie Übergänge, die dauerhaft Dichtigkeit garantieren.",
    interest: "Rohrsysteme",
    done: "Ein Techniker meldet sich bei Ihnen zur Auswahl des passenden Übergangs.",
  },
  produkte_zubehoer: {
    kicker: "Zubehör & Befestigung",
    head: "Komplettieren Sie Ihre Installation mit originalem Zubehör.",
    short: "Befestigungen und Zubehör anfragen",
    text: "Von Rohrschellen bis hin zu Isolationsmaterial: Nennen Sie uns Ihren Bedarf. Wir sorgen dafür, dass das Zubehör nahtlos zum restlichen K-Aqua System passt.",
    interest: "Ersatzteile",
    done: "Ihr Zubehör-Angebot wird gerade zusammengestellt.",
  },
  katalog: {
    kicker: "Gesamtkatalog",
    head: "Alle Artikelnummern und Maße für Ihre Beschaffung.",
    short: "Unterstützung bei der Artikelsuche",
    text: "Finden Sie ein spezielles Sondermaß nicht im Katalog? Beschreiben Sie uns kurz das benötigte Bauteil, wir durchsuchen unser gesamtes Inventar für Sie.",
    interest: "Beratung",
    done: "Wir recherchieren das gewünschte Bauteil und rufen Sie an.",
  },
  finder: {
    kicker: "Produktfinder",
    head: "Lassen Sie uns die Suche nach dem passenden System abkürzen.",
    short: "Direkthilfe beim Produktfinder",
    text: "Wenn Ihre Parameter (Temperatur, Druck, Medium) grenzwertig sind, übernehmen wir gerne die Auslegung. Ein Anruf spart oft Stunden der Eigenrecherche.",
    interest: "Beratung",
    done: "Ein Systemplaner ruft Sie zur genauen Auslegung zurück.",
  },
  produkte: {
    kicker: "Produktsortiment",
    head: "Fragen zur Kompatibilität unserer PP-R Komponenten?",
    short: "Systemberatung für K-Aqua Produkte",
    text: "Geben Sie uns einen kurzen Überblick, welche Systeme Sie verbinden möchten. Wir zeigen Ihnen, wie Sie mit unserem Portfolio eine homogene und dichte Anlage aufbauen.",
    interest: "Rohrsysteme",
    done: "Wir melden uns mit technischen Details zur Systemkompatibilität.",
  },
  academy: {
    kicker: "Schulung & Zertifizierung",
    head: "Buchen Sie ein Praxisseminar für Ihre Monteure.",
    short: "Plätze in der K-Aqua Academy anfragen",
    text: "Sichern Sie die Gewährleistung durch fachgerechte Verarbeitung. Nennen Sie uns die Anzahl Ihrer Mitarbeiter und wir schlagen Ihnen Termine für eine Inhouse- oder Werks-Schulung vor.",
    interest: "Beratung",
    done: "Das Academy-Team meldet sich mit Terminvorschlägen zur Schulung.",
  },
  referenzen: {
    kicker: "Ähnliche Projekte",
    head: "Profitieren Sie von unseren Erfahrungswerten aus Referenzbauten.",
    short: "Erfahrungswerte für Ihr Projekt anfragen",
    text: "Planen Sie einen ähnlichen Hochhausbau oder eine Industriehalle? Wir teilen gerne anonymisierte Lessons-Learned und Best-Practices aus den hier gezeigten Großprojekten mit Ihnen.",
    interest: "BIM Daten",
    done: "Ein Projektleiter meldet sich für einen Erfahrungsaustausch.",
  },
  support: {
    kicker: "Technischer Support",
    head: "Soforthilfe bei Herausforderungen auf der Baustelle.",
    short: "Schnelle Problemlösung für Monteure",
    text: "Gibt es Probleme bei der Schweißnaht oder unklare Druckprüfungsergebnisse? Hinterlassen Sie Ihre Nummer, unser technischer Support ruft umgehend für eine Ferndiagnose zurück.",
    interest: "Beratung",
    done: "Der technische Support wurde alarmiert und ruft in Kürze zurück.",
  },
  ausschreibungstexte: {
    kicker: "LV-Texte & Planung",
    head: "Erhalten Sie herstellerneutrale Ausschreibungstexte in Minuten.",
    short: "Hilfe bei der Leistungsverzeichnis-Erstellung",
    text: "Wir stellen Ihnen VOB-konforme GAEB-Dateien oder Word-Vorlagen für Ihr LV zur Verfügung. Nennen Sie uns die Projektart, und wir senden Ihnen maßgeschneiderte Textbausteine.",
    interest: "BIM Daten",
    done: "Die passenden LV-Texte werden Ihnen zeitnah zugesendet.",
  },
  service: {
    kicker: "Vor-Ort Service",
    head: "Unterstützung durch K-Aqua Techniker auf Ihrer Baustelle.",
    short: "Baustelleneinweisung anfragen",
    text: "Benötigt Ihr Team eine Einweisung an den Maschinen direkt am Einbauort? Wir koordinieren einen unserer Richtmeister, der Ihr Projekt in der kritischen Startphase begleitet.",
    interest: "Beratung",
    done: "Unser Service-Team prüft die Verfügbarkeit eines Richtmeisters.",
  },
  maerkte_trinkwasser: {
    kicker: "Null Leckage Netze",
    head: "Jedes verlorene Prozent Trinkwasser kostet Ihr Netz bares Geld.",
    short: "Verlustrechnung für Ihr Trinkwassernetz",
    text: "Schildern Sie uns kurz Netzgröße und Klimazone. Wir rechnen Ihnen vor, wie viel Wasser und Budget ein K-Aqua Feld gegenüber dem Bestand sichert, inklusive Betriebsjahren.",
    interest: "Trinkwassernetze",
    done: "Ein Netzplaner meldet sich innerhalb eines Arbeitstages mit einer ersten Verlustrechnung.",
  },
  maerkte_klima: {
    kicker: "HVAC & Kühlung",
    head: "Sichern Sie hohe Durchflussmengen ohne Korrosionsrisiko.",
    short: "Kühlkreisläufe effizienter planen",
    text: "Nennen Sie uns die Kühlleistung und Vorlauftemperatur. Wir legen den Querschnitt so aus, dass Kavitation und Druckverluste in Ihrem Klimasystem minimiert werden.",
    interest: "Rohrsysteme",
    done: "Ein HVAC-Experte wird sich zur Querschnittsauslegung melden.",
  },
  maerkte_industrie: {
    kicker: "Industrieanlagen",
    head: "Chemische Beständigkeit für anspruchsvolle Fördermedien.",
    short: "Beständigkeitsprüfung anfragen",
    text: "Verarbeiten Sie aggressive Säuren, Laugen oder Reinstwasser? Senden Sie uns die chemische Zusammensetzung, und unser Labor bestätigt Ihnen schriftlich die Beständigkeit unserer PP-R Rohre.",
    interest: "Beratung",
    done: "Unser Labor prüft die Beständigkeit und meldet sich bei Ihnen.",
  },
  maerkte_schiffbau: {
    kicker: "Schiffbau & Marine",
    head: "Leichtbau und Vibrationsresistenz für Schiffsnetze.",
    short: "Schiffbau-Zulassungen anfordern",
    text: "Egal ob Grau-, Schwarz- oder Ballastwasser: Teilen Sie uns die Schiffsklasse mit. Wir senden Ihnen die entsprechenden Klassifizierungszertifikate (DNV, Lloyd's) für unser System.",
    interest: "Beratung",
    done: "Ein Marine-Experte schickt Ihnen die relevanten Zertifikate.",
  },
  maerkte_landwirtschaft: {
    kicker: "Agrar & Gewächshäuser",
    head: "Robuste Bewässerungsnetze für maximale Erträge.",
    short: "Bewässerungssysteme auslegen lassen",
    text: "Nennen Sie uns Hektarzahl und Wasserbedarf. Wir konzipieren ein frostsicheres, langlebiges PP-R Netz, das Verstopfungen durch Algenwachstum durch vollkommene Lichtundurchlässigkeit verhindert.",
    interest: "Trinkwassernetze",
    done: "Wir melden uns in Kürze zur Besprechung Ihres Bewässerungsnetzes.",
  },
  maerkte: {
    kicker: "Regionale Märkte",
    head: "Sprechen Sie mit einem Export-Spezialisten für Ihre Region.",
    short: "Logistik und Zulassung für Ihr Land",
    text: "Wir exportieren weltweit. Nennen Sie uns das Zielland, und wir informieren Sie über lokale Normen, Vertriebspartner vor Ort und realistische Seefracht-Laufzeiten ab unserem Werk.",
    interest: "Beratung",
    done: "Ein Export-Manager für Ihre Region wird sich mit Ihnen in Verbindung setzen.",
  },
  loesungen_hochhaus: {
    kicker: "Hochhausbau",
    head: "Druckstabilisation in extremen Steigleitungen.",
    short: "Druckverlust in Hochhäusern berechnen",
    text: "Die Hydromechanik im Hochhausbau duldet keine Fehler. Nennen Sie uns Gebäudehöhe und Etagenanzahl, wir helfen bei der Positionierung von Druckminderern und Dehnungsbögen.",
    interest: "BIM Daten",
    done: "Ein Spezialist für Hochhaus-Hydraulik meldet sich zur Besprechung.",
  },
  loesungen_krankenhaus: {
    kicker: "Krankenhäuser",
    head: "Keimfreiheit und Legionellen-Prävention im Klinikbetrieb.",
    short: "Trinkwasserhygiene für Kliniken",
    text: "Der Schutz immungeschwächter Patienten hat oberste Priorität. Wir beraten Sie zu Ringleitungen, Totraumvermeidung und der thermischen Desinfektion mit unserem PP-R System.",
    interest: "Trinkwassernetze",
    done: "Ein Experte für Trinkwasserhygiene wird sich umgehend melden.",
  },
  loesungen_hotel: {
    kicker: "Hotelanlagen",
    head: "Akustische Entkopplung für ungestörten Schlaf Ihrer Gäste.",
    short: "Schallschutz im Hotelbau",
    text: "Fließgeräusche in angrenzenden Zimmern führen zu Beschwerden. Nennen Sie uns die Wandaufbauten, und wir empfehlen schallisolierende Befestigungen und Strömungsoptimierungen.",
    interest: "Beratung",
    done: "Wir melden uns zur Optimierung des Schallschutzes in Ihrer Anlage.",
  },
  loesungen: {
    kicker: "Speziallösungen",
    head: "Individuelle Systemlösungen für komplexe Bauvorhaben.",
    short: "Technische Beratung für Ihr Spezialprojekt",
    text: "Standardlösungen reichen für Ihr Vorhaben nicht aus? Skizzieren Sie uns die Herausforderung, unsere Konstruktionsabteilung entwirft maßgeschneiderte Verteiler und Sonderbauteile.",
    interest: "Beratung",
    done: "Unsere Konstruktionsabteilung sichtet Ihre Anfrage und meldet sich.",
  },
  co2_rechner: {
    kicker: "CO2 Ersparnis",
    head: "Lassen Sie uns den Fußabdruck Ihres Projekts validieren.",
    short: "Detaillierte CO2-Bilanz anfordern",
    text: "Der Rechner liefert erste Richtwerte. Senden Sie uns die genaue Stückliste, und wir erstellen ein detailliertes Zertifikat über die CO2-Einsparung gegenüber metallischen Rohren für Ihr Nachhaltigkeitsaudit.",
    interest: "Beratung",
    done: "Ein Nachhaltigkeitsbeauftragter meldet sich zur Zertifikatserstellung.",
  },
  trust_center: {
    kicker: "Zertifikate & Normen",
    head: "Benötigen Sie ein spezifisches Zertifikat für die Bauabnahme?",
    short: "Zertifikate für Bauabnahme anfordern",
    text: "Falls der Prüfer auf der Baustelle nach einem bestimmten Nachweis fragt (DVGW, SKZ, KIWA), nennen Sie uns die Norm. Wir senden Ihnen das tagesaktuelle Dokument direkt als PDF zu.",
    interest: "BIM Daten",
    done: "Wir suchen das passende Zertifikat heraus und senden es Ihnen zu.",
  },
  projektanfrage: {
    kicker: "Projektstart",
    head: "Übergeben Sie uns die Eckdaten, wir liefern ein erstes Budget.",
    short: "Schnelle Budgetschätzung für Bauherren",
    text: "Laden Sie im nächsten Schritt Ihre Pläne hoch, oder geben Sie uns vorab per Telefon die groben Quadratmeter und Nutzungsart durch. Wir geben Ihnen einen ersten preislichen Rahmen.",
    interest: "Rohrsysteme",
    done: "Das Projektteam meldet sich zur Besprechung des Budgets.",
  },
  kontakt: {
    kicker: "Direkter Draht",
    head: "Ihr kürzester Weg in die K-Aqua Zentrale.",
    short: "Wir rufen Sie auf der Baustelle an",
    text: "Keine Warteschleifen. Tragen Sie Ihre Nummer ein und geben Sie das grobe Thema vor. Der passende Fachberater aus dem Vertrieb oder der Technik meldet sich umgehend.",
    interest: "Beratung",
    done: "Ihre Anfrage ist eingegangen. Der passende Berater meldet sich gleich.",
  },
  news: {
    kicker: "Presse & Medien",
    head: "Fragen zu einer Pressemitteilung oder Produktneuheit?",
    short: "Kontakt zur Unternehmenskommunikation",
    text: "Für hochauflösende Bilder, Interviews mit der Geschäftsführung oder technische Hintergrundinfos zu unseren Neuerungen, hinterlassen Sie einfach Ihre Kontaktdaten.",
    interest: "Beratung",
    done: "Unsere Presseabteilung wird sich in Kürze mit Ihnen in Verbindung setzen.",
  },
  karriere: {
    kicker: "Karriere bei K-Aqua",
    head: "Stellen Sie eine informelle Frage zu unseren Vakanzen.",
    short: "Kurzer Draht zur Personalabteilung",
    text: "Sie sind sich unsicher, ob Ihr Profil passt, oder möchten vor der Bewerbung Details zum Arbeitsalltag klären? Unser HR-Team beantwortet Ihre Fragen ganz unkompliziert per Telefon.",
    interest: "Beratung",
    done: "Die Personalabteilung meldet sich für ein kurzes Kennenlernen.",
  },
  partnerschaft: {
    kicker: "Händler werden",
    head: "Erweitern Sie Ihr Sortiment um deutsches Premium-Rohr.",
    short: "Konditionen für Vertriebspartner anfragen",
    text: "Sie sind Großhändler und suchen nach einem verlässlichen PP-R Lieferanten? Nennen Sie uns Ihre Region und Zielgruppe, wir besprechen Exklusivitätsmodelle und Händlerkonditionen.",
    interest: "Beratung",
    done: "Unser Vertriebsleiter für Partnerschaften meldet sich bei Ihnen.",
  },
  impressum: {
    kicker: "Rechtliches",
    head: "Fragen zu unseren Unternehmensangaben?",
    short: "Kontakt zum K-Aqua Sekretariat",
    text: "Hinterlassen Sie hier Ihre Nummer, wenn Sie rechtliche oder formelle Rückfragen zu unserem Unternehmen haben.",
    interest: "Beratung",
    done: "Wir melden uns zur Klärung Ihrer Rückfrage.",
  },
  datenschutz: {
    kicker: "Datenschutz",
    head: "Sprechen Sie mit unserem Datenschutzbeauftragten.",
    short: "Auskunft über Ihre Daten anfordern",
    text: "Wir nehmen Ihre Privatsphäre ernst. Wenn Sie Auskunft, Löschung oder Details zur Verarbeitung Ihrer Daten wünschen, hinterlassen Sie bitte Ihre Kontaktdaten.",
    interest: "Beratung",
    done: "Der Datenschutzbeauftragte meldet sich umgehend bei Ihnen.",
  },
  fallback: {
    kicker: "Kontakt",
    head: "Sprechen Sie direkt mit unseren Ingenieuren.",
    short: "Direkter Draht zu unseren Ingenieuren",
    text: "Telefonnummer, Email, ein Klick auf Ihr Thema. Mehr braucht es nicht, den Rest klären wir im Gespräch.",
    interest: "Beratung",
    done: "Ein Fachberater meldet sich innerhalb eines Arbeitstages bei Ihnen.",
  },
};

export const INTERESSEN = ["Rohrsysteme", "Trinkwassernetze", "BIM Daten", "Ersatzteile", "Beratung"] as const;
export const DIREKTWAHL = "+49 6085 999 99 99";
