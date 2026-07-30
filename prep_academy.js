const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8')).academy;

const translated = {
  "schulungen": {
    "meta": {
      "title": "K Aqua Academy | Schulungen",
      "desc": "Die K Aqua Academy bietet Zertifizierungsschulungen für die Installation von PP-R und PP-RCT Rohrsystemen."
    },
    "hero": {
      "eyebrow": "K AQUA ACADEMY",
      "title1": "Wissen ist Macht.",
      "title2": "Präzision ist Pflicht.",
      "desc": "Die K Aqua Academy in Waldsolms ist das Epizentrum für angewandte Polymer-Technik in der Haus- und Industrieinstallation. Wir schulen nicht einfach Handwerker – wir bilden zertifizierte Experten aus, die komplexe Leitungssysteme mit chirurgischer Präzision realisieren. Unser Versprechen: Wer unsere Academy verlässt, beherrscht das Material.",
      "cta1": "Schulung anfragen",
      "cta2": "Trainingsinhalte"
    },
    "manifesto": {
      "eyebrow": "Die Doktrin",
      "title1": "Keine Kompromisse.",
      "title2": "Keine Ausnahmen.",
      "title3": "Nur zertifizierte Perfektion.",
      "lead": "Theorie ist gut. Praxis ist entscheidend.",
      "p1": "Ein Hightech-Rohrsystem ist nur so leistungsfähig wie der Fachmann, der es installiert. Wir tolerieren keine Halbwahrheiten. In unseren Trainingszentren verschmelzen theoretisches Tiefenwissen und kompromisslose praktische Anwendung. Wir dekonstruieren die Physik hinter Polypropylen Random Copolymerisat und lehren die Thermodynamik des perfekten Schweißvorgangs.",
      "p2": "Unter realen Baustellenbedingungen trainieren Sie die Verarbeitung von Dimensionen bis d355mm. Jeder Handgriff, jede Temperatureinstellung, jede Abkühlphase wird analysiert und perfektioniert. Unser Ziel: absolute Leckagefreiheit und maximale Systemlebensdauer in Ihren Projekten."
    },
    "bento": {
      "eyebrow": "Das Curriculum",
      "title": "Wissen, das installiert werden kann.",
      "lead": "Unsere Module sind brutal fokussiert. Kein Marketing-Gerede, sondern harte, anwendbare Fakten für den Baufortschritt.",
      "items": [
        {
          "t": "Grundlagen der Polymerchemie",
          "d": "Das molekulare Verhalten von PP-R und PP-RCT unter thermischer Belastung."
        },
        {
          "t": "Heizelement-Muffenschweißen",
          "d": "Die perfekte homogene Verbindung für Dimensionen d20 bis d125. Temperaturführung und Fügedrücke."
        },
        {
          "t": "Heizwendelschweißen",
          "d": "Elektroschweißen für die Industrie. Fehlerfreie Vorbereitung, Oxidationsschicht-Entfernung und Scanner-Protokollierung."
        },
        {
          "t": "Stumpfschweißen (Butt-Welding)",
          "d": "Die Königsdisziplin für Großrohre bis d355mm. Schweißdruck-Berechnungen und CNC-gesteuerte Maschinenbedienung."
        }
      ]
    },
    "typography": {
      "title": "Zertifizierte Kompetenz",
      "t1": "Werkszertifikat nach DVS 2207-11.",
      "t2": "Der Beweis für elitäres Handwerk."
    },
    "curriculum": {
      "eyebrow": "Trainingsinhalte",
      "title": "Von der Theorie zur perfekten Schweißnaht",
      "lead": "Unser Curriculum deckt den gesamten Zyklus der Kunststoff-Installation ab.",
      "items": [
        "Werkstoffkunde: Eigenschaften und Vorteile von PP-R und PP-RCT.",
        "Systemübersicht: Rohre, Fittings und Sonderbauteile.",
        "Verarbeitungstechnik I: Muffenschweißung (d20-d125).",
        "Verarbeitungstechnik II: Heizwendelschweißung (Elektromuffen).",
        "Verarbeitungstechnik III: Stumpfschweißung (bis d355).",
        "Spezialanwendungen: Einschweißsättel und Reparaturtechniken.",
        "Werkzeugkunde: Handhabung, Wartung und Kalibrierung.",
        "Planungsgrundlagen: Längenausdehnung, Befestigungstechnik und Druckverlust.",
        "Qualitätssicherung: Druckprüfung, Spülen und Inbetriebnahme.",
        "Zertifizierungsprüfung: Theoretischer und praktischer Abschlusstest."
      ]
    },
    "sticky": {
      "eyebrow": "Zielgruppen",
      "title": "Für wen wir das machen.",
      "lead": "Unser Wissenstransfer ist zielgruppenspezifisch kalibriert.",
      "items": [
        {
          "t": "Installateure & Anlagenbauer",
          "d": "Das praktische Rüstzeug für die fehlerfreie und effiziente Montage auf der Baustelle."
        },
        {
          "t": "Planer & Ingenieure",
          "d": "Tiefgreifendes Systemverständnis für die hydraulische Auslegung und TGA-Planung."
        },
        {
          "t": "Bauleiter & Supervisoren",
          "d": "Fokus auf Qualitätssicherung, Bauüberwachung und Abnahmeprotokolle."
        },
        {
          "t": "Vertriebspartner",
          "d": "Die technischen Argumente für den Vertrieb von Premium-Rohrsystemen."
        }
      ]
    },
    "timeline": {
      "title": "Der Weg zum K Aqua Zertifikat",
      "desc": "Ein strukturierter Prozess, der Fachwissen garantiert und Pfusch eliminiert.",
      "items": [
        {
          "title": "Anmeldung",
          "desc": "Wählen Sie Ihren Schulungstermin in Waldsolms oder fragen Sie ein In-House-Training an."
        },
        {
          "title": "Theorie-Modul",
          "desc": "Kompakte, hochdichte Wissensvermittlung durch unsere Master-Trainer."
        },
        {
          "title": "Praxis-Drill",
          "desc": "Intensives Hands-on Training an Schweißmaschinen unter realen Bedingungen."
        },
        {
          "title": "Prüfung",
          "desc": "Strenge Evaluierung der theoretischen Kenntnisse und praktischen Schweißnähte."
        },
        {
          "title": "Zertifizierung",
          "desc": "Aushändigung des persönlichen K Aqua Zertifikats und der ID-Card für Baustellen."
        }
      ]
    },
    "spec": {
      "eyebrow": "Rahmendaten",
      "title": "Die Fakten zur Schulung.",
      "lead": "Präzise Planung für maximale Effizienz.",
      "desc": "Unsere Schulungen sind auf Wissensvermittlung, nicht auf Zeitverschwendung ausgelegt.",
      "items": [
        {
          "t": "Dauer",
          "d": "1 bis 2 Tage, abhängig vom gewählten Modul (Grundlagen bis Stumpfschweißen)."
        },
        {
          "t": "Ort",
          "d": "K Aqua Academy in Waldsolms (Deutschland) oder als dediziertes In-House Training auf Ihrer Großbaustelle weltweit."
        },
        {
          "t": "Gruppengröße",
          "d": "Maximal 10 Teilnehmer pro Instructor, um eine individuelle und intensive Betreuung während der Praxisphasen zu garantieren."
        }
      ]
    },
    "cta": {
      "title": "Trainingskalender",
      "title1": "Werden Sie zum",
      "title2": "System-Experten.",
      "desc": "Reservieren Sie jetzt Ihren Platz in der K Aqua Academy oder fordern Sie ein maßgeschneidertes Training für Ihr Team an.",
      "button": "Kontakt aufnehmen"
    }
  },
  "zertifizierung": {
    "meta": {
      "title": "K Aqua | Systemzertifizierung",
      "desc": "Umfassende Zertifizierungen und Systemprüfungen für höchste Sicherheit in der TGA."
    },
    "hero": {
      "eyebrow": "SYSTEMZERTIFIZIERUNG",
      "title1": "Normen sind gut.",
      "title2": "K Aqua ist besser.",
      "desc": "Wir begnügen uns nicht mit dem Erreichen von Standards – wir definieren sie. Jedes K Aqua System durchläuft Prüfprotokolle, die weit über die gesetzlichen Vorgaben hinausgehen. Vertrauen ist gut. Ein zertifiziertes Qualitätssicherungs-System nach DIN EN ISO 9001 ist besser.",
      "cta1": "Zertifikate ansehen",
      "cta2": "Prüfverfahren"
    },
    "manifesto": {
      "eyebrow": "Der Maßstab",
      "title1": "Absolute ",
      "title2": "Kompromisslosigkeit.",
      "lead": "Sicherheit lässt sich nicht behaupten. Man muss sie beweisen.",
      "p1": "Egal ob Trinkwasserhygiene, Druckbelastbarkeit oder thermische Stabilität: Unsere Rohre und Fittings sind nicht einfach nur getestet. Sie sind unter brutalsten Bedingungen auf die Probe gestellt und von den strengsten internationalen Prüfinstituten für gut befunden worden."
    },
    "bento": {
      "eyebrow": "Die Prüfinstanzen",
      "title": "Global geprüft. Global zugelassen.",
      "lead": "Wir stellen uns den härtesten Prüfinstituten der Welt. Ohne Ausnahme.",
      "items": [
        {
          "t": "DVGW",
          "d": "Die höchste deutsche Instanz für Gas und Wasser. Unser Siegel für absolute Trinkwasserhygiene."
        },
        {
          "t": "SKZ",
          "d": "Das Kunststoff-Zentrum. Unabhängige Überwachung unserer mechanischen und thermischen Eigenschaften."
        },
        {
          "t": "TÜV",
          "d": "Zertifizierung unserer Managementsysteme (ISO 9001, 14001, 50001)."
        },
        {
          "t": "Internationale Normen",
          "d": "Entspricht ISO 15874, DIN 8077/8078 und vielen weiteren globalen Standards."
        },
        {
          "t": "Hygiene-Institute",
          "d": "Toxikologische Unbedenklichkeit und Lebensmittelechtheit (KTW/W270) bestätigt."
        }
      ]
    },
    "certifications": {
      "eyebrow": "Zertifikate",
      "title": "Der dokumentierte Beweis.",
      "lead": "Unsere aktuellen Zulassungen und Zertifikate zum Download.",
      "items": [
        {
          "t": "Managementsysteme",
          "d": "ISO 9001 (Qualität), ISO 14001 (Umwelt), ISO 50001 (Energie)."
        },
        {
          "t": "Systemzulassungen PP-R",
          "d": "DVGW, SKZ, und internationale Approbationen für K Aqua Standard."
        },
        {
          "t": "Systemzulassungen PPRCT",
          "d": "Zulassungen für K Aqua Faserverbundrohre (Faser & Faser UV)."
        },
        {
          "t": "Hygiene-Zertifikate",
          "d": "Prüfzeugnisse zur hygienischen Unbedenklichkeit für Trinkwasser-Installationen."
        }
      ]
    },
    "lab": {
      "eyebrow": "Qualitätssicherung",
      "title1": "Das K Aqua",
      "title2": "Prüflabor.",
      "lead": "Vertrauen ist gut, Kontrolle ist besser. Das Herz unserer Qualitätssicherung.",
      "desc": "Bevor auch nur ein Meter Rohr unser Werk verlässt, muss er die Hölle unseres internen Labors überstehen. Wir simulieren Jahrzehnte der Alterung in Wochen.",
      "items": [
        {
          "t": "Zeitstand-Innendruckversuch",
          "d": "Brutale Druck- und Temperaturprofile über 1000 Stunden und mehr. Wir testen die Langzeitfestigkeit des Materials bis zur Zerstörung."
        },
        {
          "t": "Schlagzugversuch",
          "d": "Simulierte mechanische Überlastung, selbst bei extremen Minustemperaturen. Ein Beweis für die überlegene Zähigkeit unserer PP-R Matrix."
        },
        {
          "t": "Schmelzindex & DSC",
          "d": "Molekulare Kontrolle der Rohgranulate. Wir überprüfen die rheologischen und thermodynamischen Eigenschaften jeder einzelnen Charge."
        }
      ]
    },
    "timeline": {
      "title": "Der QS-Prozess",
      "desc": "Lückenlose Überwachung von der Anlieferung bis zum Versand.",
      "items": [
        {
          "title": "Wareneingangsprüfung",
          "desc": "Laboranalyse der PP-R Granulate (MFR, OIT) vor der Freigabe für die Produktion."
        },
        {
          "title": "Inline-Monitoring",
          "desc": "Ultraschall-Messung von Wandstärke und Durchmesser direkt in der Extrusionslinie. In Echtzeit."
        },
        {
          "title": "Batch-Testing",
          "desc": "Stichprobenartige Entnahme und mechanisch/thermische Prüfung im hauseigenen Labor."
        },
        {
          "title": "Externe Überwachung",
          "desc": "Regelmäßige, unangekündigte Audits durch unabhängige Institute wie SKZ oder DVGW."
        },
        {
          "title": "Traceability",
          "desc": "Vollständige Rückverfolgbarkeit jedes Rohres und Fittings durch permanente Markierung."
        }
      ]
    },
    "cta": {
      "title": "Dokumentation",
      "title1": "Benötigen Sie",
      "title2": "spezifische Zertifikate?",
      "desc": "Für internationale Projekte stellen wir Ihnen gerne länderspezifische Zulassungen und detaillierte Prüfberichte zur Verfügung.",
      "button1": "Trust Center besuchen",
      "button2": "Support kontaktieren"
    }
  },
  "glossar": {
    "meta": {
      "title": "K Aqua | Polymer-Glossar",
      "desc": "Das Fachlexikon für PP-R und PP-RCT Rohrsysteme."
    },
    "hero": {
      "eyebrow": "DAS GLOSSAR",
      "title1": "Die Sprache der",
      "title2": "Polymer-Ingenieure.",
      "desc": "Hier erklären wir die Fachbegriffe, physikalischen Effekte und normativen Standards, die die Welt der Premium-Kunststoffrohrsysteme definieren. Kein Buzzword-Bingo. Nur harte Definitionen.",
      "cta1": "Begriffe durchsuchen",
      "cta2": "FAQ ansehen"
    },
    "manifesto": {
      "eyebrow": "Terminologie",
      "title": "Wissen ist",
      "text": "Definitionsmacht.",
      "lead": "Wer die Begriffe beherrscht, beherrscht das System.",
      "p": "In der Gebäudetechnik und im industriellen Rohrleitungsbau ist Präzision nicht nur eine Frage des Werkzeugs, sondern auch der Sprache. Unser Glossar schafft Klarheit in einer Welt voller Abkürzungen und Normen."
    },
    "scroll": {
      "eyebrow": "Kernbegriffe",
      "title": "Die DNA unseres Systems",
      "lead": "Die wichtigsten Konzepte, kurz und prägnant.",
      "items": [
        {
          "title": "PP-R (Polypropylen Random Copolymer)",
          "desc": "Ein thermoplastischer Kunststoff, der durch die Copolymerisation von Propylen und Ethylen entsteht. Er zeichnet sich durch hohe Schlagzähigkeit, exzellente chemische Beständigkeit und thermische Stabilität aus. Der Goldstandard für Sanitär- und Heizungsrohre."
        },
        {
          "title": "PP-RCT (Polypropylene Random Copolymer with modified Crystallinity and Temperature resistance)",
          "desc": "Die Evolution von PP-R. Durch eine spezielle Kristallstruktur bietet PP-RCT eine noch höhere Druckfestigkeit bei hohen Temperaturen. Dies ermöglicht dünnere Wandstärken bei gleicher Belastbarkeit und damit einen höheren Durchfluss."
        },
        {
          "title": "Faserverbundrohr (Faser-Rohr)",
          "desc": "Ein mehrschichtiges Rohr, bei dem die mittlere Schicht mit speziellen Glasfasern compoundiert ist. Dies reduziert die thermische Längenausdehnung drastisch (um bis zu 75% im Vergleich zu Vollkunststoffrohren) und erhöht die Biegesteifigkeit, was zu größeren Befestigungsabständen führt."
        },
        {
          "title": "SDR (Standard Dimension Ratio)",
          "desc": "Das Verhältnis von Rohraußendurchmesser zur Wandstärke (SDR = d / s). Ein kleinerer SDR-Wert bedeutet eine dickere Wandung und damit eine höhere Druckbeständigkeit. Typische K Aqua Werte sind SDR 6, SDR 7.4, SDR 9 und SDR 11."
        }
      ]
    },
    "bento": {
      "eyebrow": "Physik & Verarbeitung",
      "title": "Die Wissenschaft der Installation.",
      "lead": "Hinter jeder perfekten Schweißnaht steckt angewandte Physik.",
      "items": [
        {
          "t": "Homogene Verschweißung",
          "d": "Der Prozess, bei dem Rohr und Fitting durch Wärmezufuhr aufgeschmolzen und ohne Zusatzstoffe auf molekularer Ebene unlösbar miteinander verbunden werden."
        },
        {
          "t": "Thermische Längenausdehnung",
          "d": "Die physikalische Eigenschaft von Materialien, sich bei Erwärmung auszudehnen. Bei Kunststoffrohren ist dieser Faktor bei der Planung von Dehnungsausgleichern (Biegeschenkel, U-Bögen) zwingend zu berücksichtigen."
        },
        {
          "t": "Kavitation",
          "d": "Die Bildung und das schlagartige Zusammenfallen von dampfgefüllten Hohlräumen (Blasen) in strömenden Flüssigkeiten. Verursacht durch lokale Druckabfälle (z.B. in Pumpen oder Armaturen) und kann zu schweren Materialschäden führen. Die glatten Innenwände von PP-R Rohren minimieren Kavitationsrisiken."
        },
        {
          "t": "Inkrustation",
          "d": "Ablagerung von harten Krusten (z.B. Kalk) an den Innenwänden von Rohren, die den Querschnitt verengen und den Druckverlust erhöhen. Die extrem geringe Oberflächenrauheit von K Aqua Rohren (0,007 mm) verhindert Inkrustation effektiv."
        },
        {
          "t": "Zeitstand-Innendruckfestigkeit",
          "d": "Das Maß für die Lebensdauer eines Rohres unter einer konstanten inneren Druck- und Temperaturbelastung über einen langen Zeitraum (typischerweise auf 50 Jahre extrapoliert)."
        }
      ]
    },
    "timeline": {
      "title": "Normen & Richtlinien",
      "desc": "Das regulatorische Fundament unserer Branche.",
      "items": [
        {
          "title": "ISO 15874",
          "desc": "Internationale Norm für Kunststoff-Rohrleitungssysteme für die Warm- und Kaltwasserinstallation – Polypropylen (PP)."
        },
        {
          "title": "DIN 8077 / DIN 8078",
          "desc": "Deutsche Industrienormen, die die Maße (8077) sowie die allgemeinen Güteanforderungen und Prüfungen (8078) für Rohre aus Polypropylen (PP) definieren."
        },
        {
          "title": "DVS 2207-11",
          "desc": "Richtlinie des Deutschen Verbandes für Schweißen und verwandte Verfahren. Sie definiert die exakten Parameter (Temperatur, Zeit, Druck) für das Schweißen von Rohren und Formteilen aus PP."
        },
        {
          "title": "TrinkwV",
          "desc": "Die deutsche Trinkwasserverordnung, die höchste Anforderungen an die Hygiene und die verwendeten Materialien (wie K Aqua PP-R) in der Trinkwasserinstallation stellt."
        }
      ]
    },
    "conclusion": {
      "title": "Klarheit statt Verwirrung.",
      "p1": "Die Kunststoffrohr-Industrie ist komplex, aber sie darf nicht kompliziert sein.",
      "p2": "Wenn Sie einen Begriff vermissen oder tiefergehende technische Fragen haben, zögern Sie nicht, unser Engineering-Team zu kontaktieren.",
      "p3": "Wir sprechen Ihre Sprache.",
      "p4": "Wir liefern Antworten."
    },
    "cta": {
      "title": "Weiterbildung",
      "title1": "Vom Begriff",
      "title2": "zur Anwendung.",
      "desc": "Besuchen Sie die K Aqua Academy und lernen Sie die praktische Umsetzung dieser Konzepte in unseren Intensiv-Schulungen.",
      "button": "Zur Academy"
    }
  },
  "lead": "Die K Aqua Academy ist das Epizentrum für angewandte Polymer-Technik. Wir bilden zertifizierte Experten aus, die komplexe Leitungssysteme mit chirurgischer Präzision realisieren. ",
  "videos": [
    {
      "t": "Heizelement-Muffenschweißen",
      "s": "Der Standardprozess für Dimensionen d20 bis d125. Präzise Temperaturführung, exakte Fügedrücke und die perfekte homogene Verbindung."
    },
    {
      "t": "Heizwendelschweißen",
      "s": "Elektroschweißen für die Industrie und Großbaustellen. Fehlerfreie Vorbereitung, Oxidationsschicht-Entfernung und lückenlose Scanner-Protokollierung."
    },
    {
      "t": "Stumpfschweißen (Butt-Welding)",
      "s": "Die Königsdisziplin für Großrohre bis d355mm. Schweißdruck-Berechnungen, Abkühlzeiten und CNC-gesteuerte Maschinenbedienung."
    },
    {
      "t": "Installation von Einschweißsätteln",
      "s": "Nachträgliche Abzweige effizient und sicher herstellen. Die richtige Bohrtechnik, das Anwärmen der Sattelfläche und die homogene Verschmelzung."
    }
  ],
  "quiz": [
    {
      "q": "Welche Temperatur ist für das Heizelement-Muffenschweißen von PP-R zwingend vorgeschrieben?",
      "o": [
        "200°C ± 10°C",
        "260°C ± 10°C",
        "300°C ± 10°C"
      ],
      "c": 1
    },
    {
      "q": "Was ist der Hauptvorteil eines PP-RCT Faserverbundrohres im Vergleich zu einem PP-R Vollkunststoffrohr?",
      "o": [
        "Geringeres Gewicht bei gleichem Durchmesser",
        "Höhere chemische Beständigkeit gegen Säuren",
        "Deutlich reduzierte thermische Längenausdehnung"
      ],
      "c": 2
    },
    {
      "q": "Wie wird die Oxidationsschicht vor dem Heizwendelschweißen (Elektromuffenschweißen) korrekt entfernt?",
      "o": [
        "Durch Abwischen mit Aceton oder Isopropanol",
        "Durch mechanisches Schälen mit einem geeigneten Rotationsschälgerät",
        "Durch Erhitzen der Rohroberfläche mit einem Heißluftföhn"
      ],
      "c": 1
    },
    {
      "q": "Welcher SDR-Wert (Standard Dimension Ratio) steht für die höchste Druckbeständigkeit?",
      "o": [
        "SDR 11",
        "SDR 7.4",
        "SDR 6"
      ],
      "c": 2
    },
    {
      "q": "Warum ist die homogene Verschmelzung bei PP-R Systemen mechanischen Verbindungen (z.B. Pressen) überlegen?",
      "o": [
        "Sie geht schneller und erfordert keine speziellen Werkzeuge.",
        "Sie verbindet Rohr und Fitting auf molekularer Ebene zu einer Einheit, ohne zusätzliche Dichtungen, die ermüden könnten.",
        "Sie ermöglicht eine nachträgliche, einfache Demontage der Verbindung."
      ],
      "c": 1
    }
  ]
};

// Translate the strings to Burmese here!
translated.schulungen.meta.title = "K Aqua အကယ်ဒမီ | သင်တန်းများ";
translated.schulungen.meta.desc = "K Aqua အကယ်ဒမီသည် PP-R နှင့် PP-RCT ပိုက်စနစ်များ တပ်ဆင်ခြင်းအတွက် အသိအမှတ်ပြု သင်တန်းများကို ပေးသည်။";
translated.schulungen.hero.eyebrow = "K AQUA အကယ်ဒမီ";
translated.schulungen.hero.title1 = "အသိပညာသည် စွမ်းအားဖြစ်သည်။";
translated.schulungen.hero.title2 = "တိကျမှုသည် မဖြစ်မနေလိုအပ်သည်။";
translated.schulungen.hero.desc = "Waldsolms ရှိ K Aqua အကယ်ဒမီသည် အိမ်တွင်းနှင့် စက်မှုလုပ်ငန်း တပ်ဆင်မှုများတွင် အသုံးပြုသည့် ပိုလီမာနည်းပညာအတွက် ဗဟိုဌာနဖြစ်သည်။ ကျွန်ုပ်တို့သည် လက်မှုပညာရှင်များကို သင်ကြားပေးရုံသာမက ရှုပ်ထွေးသော ပိုက်စနစ်များကို ခွဲစိတ်မှုကဲ့သို့ တိကျမှုဖြင့် အကောင်အထည်ဖော်နိုင်သော အသိအမှတ်ပြု ကျွမ်းကျင်သူများကို လေ့ကျင့်ပေးပါသည်။ ကျွန်ုပ်တို့၏ ကတိကဝတ်: ကျွန်ုပ်တို့၏ အကယ်ဒမီမှ ထွက်ခွာသူတိုင်းသည် ပစ္စည်းကို ကျွမ်းကျင်စွာ ကိုင်တွယ်နိုင်ရမည်။";
translated.schulungen.hero.cta1 = "သင်တန်းတောင်းဆိုရန်";
translated.schulungen.hero.cta2 = "သင်တန်းအကြောင်းအရာ";

translated.schulungen.manifesto.eyebrow = "အယူဝါဒ";
translated.schulungen.manifesto.title1 = "အလျှော့ပေးမှု မရှိ။";
translated.schulungen.manifesto.title2 = "ခြွင်းချက် မရှိ။";
translated.schulungen.manifesto.title3 = "အသိအမှတ်ပြု ပြီးပြည့်စုံမှုသာ။";
translated.schulungen.manifesto.lead = "သီအိုရီသည် ကောင်းမွန်သည်။ လက်တွေ့လုပ်ဆောင်မှုသည် အရေးကြီးသည်။";
translated.schulungen.manifesto.p1 = "အဆင့်မြင့် ပိုက်စနစ်တစ်ခုသည် ၎င်းကို တပ်ဆင်သည့် ကျွမ်းကျင်ပညာရှင်ကဲ့သို့သာ စွမ်းဆောင်ရည် ရှိသည်။ တစ်ပိုင်းတစ်စ အမှန်တရားများကို ကျွန်ုပ်တို့ လက်မခံပါ။ ကျွန်ုပ်တို့၏ သင်တန်းစင်တာများတွင် နက်ရှိုင်းသော သီအိုရီဆိုင်ရာ အသိပညာနှင့် အလျှော့မပေးသော လက်တွေ့အသုံးချမှုတို့ ပေါင်းစပ်ထားသည်။ ကျွန်ုပ်တို့သည် Polypropylene Random Copolymer ၏ ရူပဗေဒကို ခွဲခြမ်းစိတ်ဖြာပြီး ပြီးပြည့်စုံသော ဂဟေဆက်ခြင်းလုပ်ငန်းစဉ်၏ သာမိုဒိုင်းနမစ်ကို သင်ကြားပေးသည်။";
translated.schulungen.manifesto.p2 = "စစ်မှန်သော ဆောက်လုပ်ရေးဆိုက် အခြေအနေများအောက်တွင် d355mm အထိ အရွယ်အစားများကို ကိုင်တွယ်လေ့ကျင့်ရမည်။ လှုပ်ရှားမှုတိုင်း၊ အပူချိန် သတ်မှတ်ချက်တိုင်း၊ အအေးခံသည့် အဆင့်တိုင်းကို ခွဲခြမ်းစိတ်ဖြာပြီး ပြီးပြည့်စုံအောင် လုပ်ဆောင်သည်။ ကျွန်ုပ်တို့၏ ရည်မှန်းချက်: သင့်ပရောဂျက်များတွင် အကြွင်းမဲ့ ယိုစိမ့်မှုကင်းစင်ရေးနှင့် စနစ်၏ အမြင့်ဆုံးသက်တမ်း။";

translated.schulungen.bento.eyebrow = "သင်ရိုးညွှန်းတမ်း";
translated.schulungen.bento.title = "တပ်ဆင်နိုင်သော အသိပညာ။";
translated.schulungen.bento.lead = "ကျွန်ုပ်တို့၏ မော်ဂျူးများသည် အလွန်အမင်း အာရုံစိုက်ထားသည်။ ဈေးကွက်ရှာဖွေရေး စကားလုံးများ မဟုတ်ဘဲ၊ ဆောက်လုပ်ရေးတိုးတက်မှုအတွက် ခိုင်မာပြီး အသုံးချနိုင်သော အချက်အလက်များသာ။";
translated.schulungen.bento.items[0].t = "ပိုလီမာ ဓာတုဗေဒ အခြေခံများ";
translated.schulungen.bento.items[0].d = "အပူဒဏ်အောက်တွင် PP-R နှင့် PP-RCT ၏ မော်လီကျူး အမူအကျင့်များ။";
translated.schulungen.bento.items[1].t = "Socket Fusion ဂဟေဆက်ခြင်း";
translated.schulungen.bento.items[1].d = "d20 မှ d125 အရွယ်အစားများအတွက် ပြီးပြည့်စုံသော တစ်သားတည်းဖြစ်သည့် ဆက်စပ်မှု။ အပူချိန် ထိန်းချုပ်မှုနှင့် ဆက်စပ်ဖိအားများ။";
translated.schulungen.bento.items[2].t = "Electrofusion ဂဟေဆက်ခြင်း";
translated.schulungen.bento.items[2].d = "စက်မှုလုပ်ငန်းအတွက် လျှပ်စစ်ဂဟေဆက်ခြင်း။ အမှားအယွင်းကင်းသော ကြိုတင်ပြင်ဆင်မှု၊ အောက်ဆိုဒ်လွှာ ဖယ်ရှားခြင်းနှင့် စကင်နာ မှတ်တမ်းတင်ခြင်း။";
translated.schulungen.bento.items[3].t = "Butt ဂဟေဆက်ခြင်း (Butt-Welding)";
translated.schulungen.bento.items[3].d = "d355mm အထိ ကြီးမားသော ပိုက်များအတွက် အမြင့်မားဆုံး ကျွမ်းကျင်မှု။ ဂဟေဖိအား တွက်ချက်မှုများနှင့် CNC ထိန်းချုပ်စက် လည်ပတ်ခြင်း။";

translated.schulungen.typography.title = "အသိအမှတ်ပြု အရည်အချင်း";
translated.schulungen.typography.t1 = "DVS 2207-11 အရ စက်ရုံလက်မှတ်။";
translated.schulungen.typography.t2 = "ထိပ်တန်း လက်မှုပညာ၏ သက်သေ။";

translated.schulungen.curriculum.eyebrow = "သင်တန်းအကြောင်းအရာ";
translated.schulungen.curriculum.title = "သီအိုရီမှ ပြီးပြည့်စုံသော ဂဟေဆက်ခြင်းအထိ";
translated.schulungen.curriculum.lead = "ကျွန်ုပ်တို့၏ သင်ရိုးညွှန်းတမ်းသည် ပလပ်စတစ် တပ်ဆင်မှု သံသရာတစ်ခုလုံးကို လွှမ်းခြုံထားသည်။";
translated.schulungen.curriculum.items = [
  "ပစ္စည်းသိပ္ပံ: PP-R နှင့် PP-RCT ၏ ဂုဏ်သတ္တိများနှင့် အားသာချက်များ။",
  "စနစ်ခြုံငုံသုံးသပ်ချက်: ပိုက်များ၊ fittings များနှင့် အထူးအစိတ်အပိုင်းများ။",
  "လုပ်ဆောင်မှုနည်းပညာ I: Socket fusion (d20-d125)။",
  "လုပ်ဆောင်မှုနည်းပညာ II: Electrofusion (လျှပ်စစ်ဆော့ကတ်များ)။",
  "လုပ်ဆောင်မှုနည်းပညာ III: Butt ဂဟေဆက်ခြင်း (d355 အထိ)။",
  "အထူးအသုံးချမှုများ: ဂဟေဆက်ကုန်းနှီးများနှင့် ပြုပြင်ရေးနည်းပညာများ။",
  "ကိရိယာ အသိပညာ: ကိုင်တွယ်ခြင်း၊ ပြုပြင်ထိန်းသိမ်းခြင်းနှင့် ချိန်ညှိခြင်း။",
  "စီစဉ်ခြင်း အခြေခံများ: အလျားလိုက် ကျယ်ပြန့်မှု၊ တွယ်ဆက်နည်းပညာနှင့် ဖိအားကျဆင်းမှု။",
  "အရည်အသွေး အာမခံချက်: ဖိအားစမ်းသပ်ခြင်း၊ ဆေးကြောခြင်းနှင့် စတင်လည်ပတ်ခြင်း။",
  "အသိအမှတ်ပြု စာမေးပွဲ: သီအိုရီနှင့် လက်တွေ့ နောက်ဆုံးစမ်းသပ်မှု။"
];

translated.schulungen.sticky.eyebrow = "ပစ်မှတ်အုပ်စုများ";
translated.schulungen.sticky.title = "ကျွန်ုပ်တို့ မည်သူ့အတွက် လုပ်ဆောင်သနည်း။";
translated.schulungen.sticky.lead = "ကျွန်ုပ်တို့၏ အသိပညာလွှဲပြောင်းမှုကို ပစ်မှတ်အုပ်စုအလိုက် တိကျစွာ ချိန်ညှိထားသည်။";
translated.schulungen.sticky.items[0].t = "တပ်ဆင်သူများနှင့် အလုပ်ရုံတည်ဆောက်သူများ";
translated.schulungen.sticky.items[0].d = "ဆောက်လုပ်ရေးဆိုက်တွင် အမှားအယွင်းကင်းပြီး ထိရောက်စွာ တပ်ဆင်ရန်အတွက် လက်တွေ့ကျသော ကိရိယာများ။";
translated.schulungen.sticky.items[1].t = "စီစဉ်သူများနှင့် အင်ဂျင်နီယာများ";
translated.schulungen.sticky.items[1].d = "ဟိုက်ဒရောလစ် ဒီဇိုင်းနှင့် TGA အစီအစဉ်ဆွဲခြင်းအတွက် နက်ရှိုင်းသော စနစ်နားလည်မှု။";
translated.schulungen.sticky.items[2].t = "ဆောက်လုပ်ရေးမန်နေဂျာများနှင့် ကြီးကြပ်သူများ";
translated.schulungen.sticky.items[2].d = "အရည်အသွေး အာမခံချက်၊ ဆောက်လုပ်ရေး ကြီးကြပ်မှုနှင့် လက်ခံမှု မှတ်တမ်းများအပေါ် အာရုံစိုက်ခြင်း။";
translated.schulungen.sticky.items[3].t = "ဖြန့်ဖြူးရေးလုပ်ဖော်ကိုင်ဖက်များ";
translated.schulungen.sticky.items[3].d = "ပရီမီယံ ပိုက်စနစ်များ ရောင်းချခြင်းအတွက် နည်းပညာပိုင်းဆိုင်ရာ အထောက်အထားများ။";

translated.schulungen.timeline.title = "K Aqua လက်မှတ်ဆီသို့ လမ်းကြောင်း";
translated.schulungen.timeline.desc = "ကျွမ်းကျင်မှုကို အာမခံပြီး အမှားအယွင်းများကို ဖယ်ရှားပေးသည့် စနစ်တကျ လုပ်ငန်းစဉ်။";
translated.schulungen.timeline.items[0].title = "စာရင်းသွင်းခြင်း";
translated.schulungen.timeline.items[0].desc = "Waldsolms တွင် သင်၏ သင်တန်းရက်ကို ရွေးချယ်ပါ သို့မဟုတ် In-House လေ့ကျင့်ရေးကို တောင်းဆိုပါ။";
translated.schulungen.timeline.items[1].title = "သီအိုရီ မော်ဂျူး";
translated.schulungen.timeline.items[1].desc = "ကျွန်ုပ်တို့၏ Master သင်တန်းဆရာများမှတဆင့် ကျစ်လစ်သိပ်သည်းပြီး မြင့်မားသော အသိပညာလွှဲပြောင်းမှု။";
translated.schulungen.timeline.items[2].title = "လက်တွေ့ လေ့ကျင့်မှု";
translated.schulungen.timeline.items[2].desc = "စစ်မှန်သော အခြေအနေများအောက်တွင် ဂဟေဆော်စက်များဖြင့် ပြင်းထန်သော လက်တွေ့လေ့ကျင့်မှု။";
translated.schulungen.timeline.items[3].title = "စာမေးပွဲ";
translated.schulungen.timeline.items[3].desc = "သီအိုရီ အသိပညာနှင့် လက်တွေ့ ဂဟေဆက်မှုများကို တင်းကျပ်စွာ အကဲဖြတ်ခြင်း။";
translated.schulungen.timeline.items[4].title = "အသိအမှတ်ပြုခြင်း";
translated.schulungen.timeline.items[4].desc = "ကိုယ်ပိုင် K Aqua လက်မှတ်နှင့် ဆောက်လုပ်ရေးဆိုက်များအတွက် ID ကတ် ထုတ်ပေးခြင်း။";

translated.schulungen.spec.eyebrow = "အဓိက အချက်အလက်များ";
translated.schulungen.spec.title = "သင်တန်းအကြောင်း အချက်အလက်များ။";
translated.schulungen.spec.lead = "အမြင့်ဆုံး ထိရောက်မှုအတွက် တိကျသော အစီအစဉ်ဆွဲခြင်း။";
translated.schulungen.spec.desc = "ကျွန်ုပ်တို့၏ သင်တန်းများသည် အချိန်ဖြုန်းရန်မဟုတ်ဘဲ အသိပညာပေးရန် ဒီဇိုင်းထုတ်ထားပါသည်။";
translated.schulungen.spec.items[0].t = "ကြာချိန်";
translated.schulungen.spec.items[0].d = "ရွေးချယ်ထားသော မော်ဂျူးပေါ်မူတည်၍ (အခြေခံမှ Butt ဂဟေဆက်ခြင်းအထိ) ၁ ရက်မှ ၂ ရက်။";
translated.schulungen.spec.items[1].t = "နေရာ";
translated.schulungen.spec.items[1].d = "Waldsolms (ဂျာမနီ) ရှိ K Aqua အကယ်ဒမီ သို့မဟုတ် ကမ္ဘာတစ်ဝှမ်းရှိ သင်၏ အကြီးစား ဆောက်လုပ်ရေးဆိုက်တွင် သီးသန့် In-House လေ့ကျင့်ရေးအဖြစ်။";
translated.schulungen.spec.items[2].t = "အဖွဲ့အရွယ်အစား";
translated.schulungen.spec.items[2].d = "လက်တွေ့လေ့ကျင့်ချိန်အတွင်း တစ်ဦးချင်းနှင့် အနီးကပ် ကြီးကြပ်မှုကို သေချာစေရန် သင်တန်းဆရာတစ်ဦးလျှင် အများဆုံး သင်တန်းသား ၁၀ ဦး။";

translated.schulungen.cta.title = "သင်တန်းပြက္ခဒိန်";
translated.schulungen.cta.title1 = "စနစ်ကျွမ်းကျင်သူ ";
translated.schulungen.cta.title2 = "တစ်ဦး ဖြစ်လာပါ။";
translated.schulungen.cta.desc = "K Aqua အကယ်ဒမီတွင် သင့်နေရာကို ယခုပင် ကြိုတင်မှာယူပါ သို့မဟုတ် သင့်အဖွဲ့အတွက် စိတ်ကြိုက်ပြင်ဆင်ထားသော သင်တန်းကို တောင်းဆိုပါ။";
translated.schulungen.cta.button = "ဆက်သွယ်ရန်";

// Zertifizierung
translated.zertifizierung.meta.title = "K Aqua | စနစ် အသိအမှတ်ပြုခြင်း";
translated.zertifizierung.meta.desc = "TGA တွင် အမြင့်ဆုံး လုံခြုံရေးအတွက် ပြည့်စုံသော အသိအမှတ်ပြုမှုများနှင့် စနစ်စစ်ဆေးမှုများ။";
translated.zertifizierung.hero.eyebrow = "စနစ် အသိအမှတ်ပြုခြင်း";
translated.zertifizierung.hero.title1 = "စံနှုန်းများသည် ကောင်းမွန်သည်။";
translated.zertifizierung.hero.title2 = "K Aqua က ပိုကောင်းသည်။";
translated.zertifizierung.hero.desc = "ကျွန်ုပ်တို့သည် စံနှုန်းများကို ပြည့်မီရုံဖြင့် မကျေနပ်ပါ - ၎င်းတို့ကို ကျွန်ုပ်တို့ သတ်မှတ်သည်။ K Aqua စနစ်တိုင်းသည် တရားဝင် လိုအပ်ချက်များထက် ကျော်လွန်သော စမ်းသပ်မှု လုပ်ငန်းစဉ်များကို ဖြတ်သန်းရသည်။ ယုံကြည်မှုသည် ကောင်းမွန်သည်။ DIN EN ISO 9001 အရ အသိအမှတ်ပြု အရည်အသွေး အာမခံစနစ်သည် ပိုကောင်းသည်။";
translated.zertifizierung.hero.cta1 = "လက်မှတ်များကို ကြည့်ရှုရန်";
translated.zertifizierung.hero.cta2 = "စမ်းသပ်မှု လုပ်ငန်းစဉ်များ";

translated.zertifizierung.manifesto.eyebrow = "စံသတ်မှတ်ချက်";
translated.zertifizierung.manifesto.title1 = "အကြွင်းမဲ့ ";
translated.zertifizierung.manifesto.title2 = "အလျှော့မပေးမှု။";
translated.zertifizierung.manifesto.lead = "လုံခြုံရေးကို ပြောရုံဖြင့် မရပါ။ သက်သေပြရမည်။";
translated.zertifizierung.manifesto.p1 = "သောက်သုံးရေ သန့်ရှင်းမှု၊ ဖိအားခံနိုင်ရည် သို့မဟုတ် အပူတည်ငြိမ်မှုဖြစ်စေ: ကျွန်ုပ်တို့၏ ပိုက်များနှင့် fittings များကို စမ်းသပ်ရုံသာ မဟုတ်ပါ။ ၎င်းတို့ကို အလွန်ပြင်းထန်သော အခြေအနေများအောက်တွင် စမ်းသပ်ထားပြီး အပြင်းထန်ဆုံး နိုင်ငံတကာ စမ်းသပ်ရေး အင်စတီကျုများမှ အတည်ပြုထားသည်။";

translated.zertifizierung.bento.eyebrow = "စမ်းသပ်ရေး အင်စတီကျုများ";
translated.zertifizierung.bento.title = "ကမ္ဘာတစ်ဝှမ်း စမ်းသပ်ပြီး ကမ္ဘာတစ်ဝှမ်း အတည်ပြုထားသည်။";
translated.zertifizierung.bento.lead = "ခြွင်းချက်မရှိဘဲ ကမ္ဘာပေါ်ရှိ အပြင်းထန်ဆုံး စမ်းသပ်ရေး အင်စတီကျုများကို ကျွန်ုပ်တို့ ရင်ဆိုင်ပါသည်။";
translated.zertifizierung.bento.items[0].t = "DVGW";
translated.zertifizierung.bento.items[0].d = "ဓာတ်ငွေ့နှင့် ရေအတွက် အမြင့်ဆုံး ဂျာမန် အာဏာပိုင်။ အကြွင်းမဲ့ သောက်သုံးရေ သန့်ရှင်းမှုအတွက် ကျွန်ုပ်တို့၏ တံဆိပ်။";
translated.zertifizierung.bento.items[1].t = "SKZ";
translated.zertifizierung.bento.items[1].d = "ပလပ်စတစ် စင်တာ။ ကျွန်ုပ်တို့၏ စက်ပိုင်းဆိုင်ရာနှင့် အပူပိုင်းဆိုင်ရာ ဂုဏ်သတ္တိများကို လွတ်လပ်စွာ စောင့်ကြည့်လေ့လာခြင်း။";
translated.zertifizierung.bento.items[2].t = "TÜV";
translated.zertifizierung.bento.items[2].d = "ကျွန်ုပ်တို့၏ စီမံခန့်ခွဲမှုစနစ်များ (ISO 9001, 14001, 50001) ကို အသိအမှတ်ပြုခြင်း။";
translated.zertifizierung.bento.items[3].t = "နိုင်ငံတကာ စံနှုန်းများ";
translated.zertifizierung.bento.items[3].d = "ISO 15874, DIN 8077/8078 နှင့် အခြားသော ကမ္ဘာလုံးဆိုင်ရာ စံနှုန်းများစွာနှင့် ကိုက်ညီသည်။";
translated.zertifizierung.bento.items[4].t = "သန့်ရှင်းရေး အင်စတီကျုများ";
translated.zertifizierung.bento.items[4].d = "အဆိပ်အတောက်ကင်းစင်မှုနှင့် အစားအသောက် ဘေးကင်းရေး (KTW/W270) အတည်ပြုထားသည်။";

translated.zertifizierung.certifications.eyebrow = "လက်မှတ်များ";
translated.zertifizierung.certifications.title = "မှတ်တမ်းတင်ထားသော သက်သေ။";
translated.zertifizierung.certifications.lead = "ဒေါင်းလုဒ်လုပ်ရန် ကျွန်ုပ်တို့၏ လက်ရှိ ခွင့်ပြုချက်များနှင့် လက်မှတ်များ။";
translated.zertifizierung.certifications.items[0].t = "စီမံခန့်ခွဲမှု စနစ်များ";
translated.zertifizierung.certifications.items[0].d = "ISO 9001 (အရည်အသွေး), ISO 14001 (ပတ်ဝန်းကျင်), ISO 50001 (စွမ်းအင်)။";
translated.zertifizierung.certifications.items[1].t = "စနစ် ခွင့်ပြုချက်များ PP-R";
translated.zertifizierung.certifications.items[1].d = "DVGW, SKZ နှင့် K Aqua Standard အတွက် နိုင်ငံတကာ ခွင့်ပြုချက်များ။";
translated.zertifizierung.certifications.items[2].t = "စနစ် ခွင့်ပြုချက်များ PPRCT";
translated.zertifizierung.certifications.items[2].d = "K Aqua အမျှင်ပေါင်းစပ်ပိုက်များ (Fibre & Fibre UV) အတွက် ခွင့်ပြုချက်များ။";
translated.zertifizierung.certifications.items[3].t = "သန့်ရှင်းရေး လက်မှတ်များ";
translated.zertifizierung.certifications.items[3].d = "သောက်သုံးရေ တပ်ဆင်မှုများအတွက် သန့်ရှင်းရေး ဘေးကင်းမှုဆိုင်ရာ စမ်းသပ်မှု လက်မှတ်များ။";

translated.zertifizierung.lab.eyebrow = "အရည်အသွေး အာမခံချက်";
translated.zertifizierung.lab.title1 = "K Aqua";
translated.zertifizierung.lab.title2 = "စမ်းသပ် ဓာတ်ခွဲခန်း။";
translated.zertifizierung.lab.lead = "ယုံကြည်မှုသည် ကောင်းမွန်သည်၊ ထိန်းချုပ်မှုသည် ပိုကောင်းသည်။ ကျွန်ုပ်တို့၏ အရည်အသွေး အာမခံချက်၏ နှလုံးသား။";
translated.zertifizierung.lab.desc = "ပိုက်တစ်မီတာပင် ကျွန်ုပ်တို့စက်ရုံမှ မထွက်ခွာမီ၊ ၎င်းသည် ကျွန်ုပ်တို့၏ အတွင်းပိုင်း ဓာတ်ခွဲခန်း၏ ငရဲကို ဖြတ်သန်းရမည်ဖြစ်သည်။ ရက်သတ္တပတ် အနည်းငယ်အတွင်း ဆယ်စုနှစ်များစွာ ကြာရှည်ခံမှုကို ကျွန်ုပ်တို့ ပုံဖော်စမ်းသပ်သည်။";
translated.zertifizierung.lab.items[0].t = "အချိန်အလိုက် ဖိအားခံနိုင်ရည် စမ်းသပ်မှု";
translated.zertifizierung.lab.items[0].d = "နာရီ 1000 နှင့် အထက် ပြင်းထန်သော ဖိအားနှင့် အပူချိန် အခြေအနေများ။ ပစ္စည်းပျက်စီးသွားသည်အထိ ရေရှည် ကြံ့ခိုင်မှုကို ကျွန်ုပ်တို့ စမ်းသပ်သည်။";
translated.zertifizierung.lab.items[1].t = "သက်ရောက်မှု ဆွဲဆန့်စမ်းသပ်မှု";
translated.zertifizierung.lab.items[1].d = "အလွန်အမင်း အနှုတ်အပူချိန်များတွင်ပင် စက်ပိုင်းဆိုင်ရာ ဝန်ပိုမှုကို ပုံဖော်ခြင်း။ ကျွန်ုပ်တို့၏ PP-R matrix ၏ သာလွန်သော ကြံ့ခိုင်မှုအတွက် သက်သေ။";
translated.zertifizierung.lab.items[2].t = "အရည်ပျော်မှု အညွှန်းကိန်း & DSC";
translated.zertifizierung.lab.items[2].d = "ကုန်ကြမ်းများကို မော်လီကျူးအဆင့် ထိန်းချုပ်ခြင်း။ အသုတ်တိုင်း၏ rheological နှင့် thermodynamic ဂုဏ်သတ္တိများကို ကျွန်ုပ်တို့ စစ်ဆေးသည်။";

translated.zertifizierung.timeline.title = "QS လုပ်ငန်းစဉ်";
translated.zertifizierung.timeline.desc = "ပေးပို့မှုမှ တင်ပို့မှုအထိ အဆက်မပြတ် စောင့်ကြည့်ခြင်း။";
translated.zertifizierung.timeline.items[0].title = "အဝင်ကုန်စည် စစ်ဆေးခြင်း";
translated.zertifizierung.timeline.items[0].desc = "ထုတ်လုပ်မှုအတွက် ခွင့်ပြုချက်မပေးမီ PP-R အစေ့လေးများ (MFR, OIT) ကို ဓာတ်ခွဲခန်း ခွဲခြမ်းစိတ်ဖြာခြင်း။";
translated.zertifizierung.timeline.items[1].title = "Inline စောင့်ကြည့်ခြင်း";
translated.zertifizierung.timeline.items[1].desc = "ထုတ်လုပ်မှုလိုင်းတွင် တိုက်ရိုက် နံရံအထူနှင့် အချင်းကို အာထရာဆောင်းဖြင့် တိုင်းတာခြင်း။ အချိန်နှင့်တပြေးညီ။";
translated.zertifizierung.timeline.items[2].title = "အသုတ်လိုက် စမ်းသပ်ခြင်း";
translated.zertifizierung.timeline.items[2].desc = "ကျပန်းနမူနာယူခြင်းနှင့် အိမ်တွင်း ဓာတ်ခွဲခန်းတွင် စက်ပိုင်းဆိုင်ရာ/အပူပိုင်းဆိုင်ရာ စမ်းသပ်ခြင်း။";
translated.zertifizierung.timeline.items[3].title = "ပြင်ပ စောင့်ကြည့်ခြင်း";
translated.zertifizierung.timeline.items[3].desc = "SKZ သို့မဟုတ် DVGW ကဲ့သို့သော လွတ်လပ်သော အင်စတီကျုများမှ ပုံမှန်၊ ကြိုတင်မအသိပေးဘဲ စစ်ဆေးမှုများ။";
translated.zertifizierung.timeline.items[4].title = "ခြေရာခံနိုင်မှု";
translated.zertifizierung.timeline.items[4].desc = "အမြဲတမ်း အမှတ်အသားဖြင့် ပိုက်နှင့် fitting တိုင်း၏ အပြည့်အဝ ခြေရာခံနိုင်မှု။";

translated.zertifizierung.cta.title = "စာရွက်စာတမ်း";
translated.zertifizierung.cta.title1 = "သီးခြား လက်မှတ်များ ";
translated.zertifizierung.cta.title2 = "လိုအပ်ပါသလား။";
translated.zertifizierung.cta.desc = "နိုင်ငံတကာ ပရောဂျက်များအတွက်၊ ကျွန်ုပ်တို့သည် နိုင်ငံအလိုက် ခွင့်ပြုချက်များနှင့် အသေးစိတ် စမ်းသပ်မှု အစီရင်ခံစာများကို ပေးဆောင်ရန် ဝမ်းမြောက်ပါသည်။";
translated.zertifizierung.cta.button1 = "Trust Center သို့ ဝင်ရောက်ရန်";
translated.zertifizierung.cta.button2 = "အကူအညီရယူရန်";

// Glossar
translated.glossar.meta.title = "K Aqua | ပိုလီမာ ဝေါဟာရ";
translated.glossar.meta.desc = "PP-R နှင့် PP-RCT ပိုက်စနစ်များအတွက် ကျွမ်းကျင်သူ အဘိဓာန်။";
translated.glossar.hero.eyebrow = "ဝေါဟာရ";
translated.glossar.hero.title1 = "ပိုလီမာ အင်ဂျင်နီယာများ၏";
translated.glossar.hero.title2 = "ဘာသာစကား။";
translated.glossar.hero.desc = "ဤနေရာတွင် ကျွန်ုပ်တို့သည် ပရီမီယံ ပလပ်စတစ်ပိုက်စနစ်များ၏ ကမ္ဘာကို သတ်မှတ်ပေးသော နည်းပညာဆိုင်ရာ ဝေါဟာရများ၊ ရူပဗေဒဆိုင်ရာ အကျိုးသက်ရောက်မှုများနှင့် စံသတ်မှတ်ချက်များကို ရှင်းပြပါသည်။ ရှုပ်ထွေးသော စကားလုံးများ မရှိပါ။ ခိုင်မာသော အဓိပ္ပါယ်ဖွင့်ဆိုချက်များသာ။";
translated.glossar.hero.cta1 = "ဝေါဟာရများကို ရှာဖွေရန်";
translated.glossar.hero.cta2 = "FAQ များကို ကြည့်ရန်";

translated.glossar.manifesto.eyebrow = "ဝေါဟာရဗေဒ";
translated.glossar.manifesto.title = "အသိပညာသည်";
translated.glossar.manifesto.text = "အဓိပ္ပါယ်ဖွင့်ဆိုနိုင်စွမ်း ဖြစ်သည်။";
translated.glossar.manifesto.lead = "ဝေါဟာရများကို ကျွမ်းကျင်သူသည် စနစ်ကို ကျွမ်းကျင်သည်။";
translated.glossar.manifesto.p = "အဆောက်အဦနည်းပညာနှင့် စက်မှုလုပ်ငန်းသုံး ပိုက်လိုင်း တည်ဆောက်မှုတွင် တိကျမှုသည် ကိရိယာများ၏ ကိစ္စသာမက ဘာသာစကား၏ ကိစ္စလည်း ဖြစ်သည်။ အတိုကောက်များနှင့် စံနှုန်းများ ပြည့်နှက်နေသော ကမ္ဘာတွင် ကျွန်ုပ်တို့၏ ဝေါဟာရအဘိဓာန်သည် ရှင်းလင်းမှုကို ဖန်တီးပေးပါသည်။";

translated.glossar.scroll.eyebrow = "အဓိက ဝေါဟာရများ";
translated.glossar.scroll.title = "ကျွန်ုပ်တို့ စနစ်၏ DNA";
translated.glossar.scroll.lead = "အရေးအကြီးဆုံး အယူအဆများ၊ တိုတိုနှင့် ရှင်းရှင်း။";
translated.glossar.scroll.items[0].title = "PP-R (Polypropylene Random Copolymer)";
translated.glossar.scroll.items[0].desc = "Propylene နှင့် ethylene တို့ကို copolymerization ပြုလုပ်ခြင်းဖြင့် ဖန်တီးထားသော အပူခံပလပ်စတစ်တစ်ခု။ ၎င်းသည် မြင့်မားသော ကြံ့ခိုင်မှု၊ အလွန်ကောင်းမွန်သော ဓာတုဗေဒ ခံနိုင်ရည်နှင့် အပူပိုင်းဆိုင်ရာ တည်ငြိမ်မှုတို့ကြောင့် လူသိများသည်။ သန့်ရှင်းရေးနှင့် အပူပေးပိုက်များအတွက် ရွှေစံနှုန်းဖြစ်သည်။";
translated.glossar.scroll.items[1].title = "PP-RCT (Polypropylene Random Copolymer with modified Crystallinity and Temperature resistance)";
translated.glossar.scroll.items[1].desc = "PP-R ၏ ဆင့်ကဲဖြစ်စဉ်။ အထူးပုံဆောင်ခဲဖွဲ့စည်းပုံမှတဆင့်၊ PP-RCT သည် မြင့်မားသောအပူချိန်များတွင် ပိုမိုမြင့်မားသော ဖိအားခံနိုင်ရည်ကို ပေးသည်။ ၎င်းသည် တူညီသော ခံနိုင်ရည်ဖြင့် ပိုပါးသော နံရံအထူကို ခွင့်ပြုပေးပြီး ထို့ကြောင့် ပိုမိုမြင့်မားသော စီးဆင်းမှုကို ရရှိစေသည်။";
translated.glossar.scroll.items[2].title = "အမျှင်ပေါင်းစပ်ပိုက် (Fibre-Pipe)";
translated.glossar.scroll.items[2].desc = "အလယ်လွှာကို အထူးဖန်မျှင်များဖြင့် ပေါင်းစပ်ထားသော အလွှာပေါင်းစုံ ပိုက်တစ်ခု။ ၎င်းသည် အပူကြောင့် အလျားလိုက် ကျယ်ပြန့်မှုကို သိသိသာသာ လျှော့ချပေးပြီး (ပလပ်စတစ်ပိုက်အပြည့်နှင့် နှိုင်းယှဉ်ပါက 75% အထိ) ကွေးညွှတ်နိုင်စွမ်းကို တိုးမြှင့်ပေးကာ ပိုမိုကြီးမားသော တွယ်ဆက်မှု အကွာအဝေးကို ရရှိစေသည်။";
translated.glossar.scroll.items[3].title = "SDR (Standard Dimension Ratio)";
translated.glossar.scroll.items[3].desc = "ပိုက်အပြင်ဘက် အချင်းနှင့် နံရံအထူ၏ အချိုး (SDR = d / s)။ သေးငယ်သော SDR တန်ဖိုးသည် ပိုထူသောနံရံကို ဆိုလိုပြီး ထို့ကြောင့် ဖိအားခံနိုင်ရည် ပိုမြင့်မားသည်။ ပုံမှန် K Aqua တန်ဖိုးများမှာ SDR 6, SDR 7.4, SDR 9 နှင့် SDR 11 ဖြစ်သည်။";

translated.glossar.bento.eyebrow = "ရူပဗေဒ & လုပ်ဆောင်မှု";
translated.glossar.bento.title = "တပ်ဆင်ခြင်းဆိုင်ရာ သိပ္ပံ။";
translated.glossar.bento.lead = "ပြီးပြည့်စုံသော ဂဟေဆက်မှုတိုင်း၏ နောက်ကွယ်တွင် အသုံးချ ရူပဗေဒ ရှိပါသည်။";
translated.glossar.bento.items[0].t = "တစ်သားတည်းဖြစ်အောင် ဂဟေဆက်ခြင်း";
translated.glossar.bento.items[0].d = "အပူပေးခြင်းဖြင့် ပိုက်နှင့် fitting ကို အရည်ပျော်စေပြီး ထပ်ဆောင်းပစ္စည်းများမပါဘဲ မော်လီကျူးအဆင့်တွင် ခွဲခြား၍မရအောင် ပေါင်းစပ်သည့် လုပ်ငန်းစဉ်။";
translated.glossar.bento.items[1].t = "အပူကြောင့် အလျားလိုက် ကျယ်ပြန့်မှု";
translated.glossar.bento.items[1].d = "အပူပေးသောအခါ ပစ္စည်းများ ကျယ်ပြန့်လာသည့် ရူပဗေဒဆိုင်ရာ ဂုဏ်သတ္တိ။ ပလပ်စတစ်ပိုက်များနှင့်အတူ၊ ချဲ့ထွင်မှုလျော်ကြေးပေးစနစ်များ (ကွေးထားသော အပိုင်းများ၊ U-ကွေးများ) ကို စီစဉ်သည့်အခါ ဤအချက်ကို ထည့်သွင်းစဉ်းစားရန် မရှိမဖြစ် လိုအပ်ပါသည်။";
translated.glossar.bento.items[2].t = "Cavitation";
translated.glossar.bento.items[2].d = "စီးဆင်းနေသော အရည်များတွင် ရေနွေးငွေ့ပြည့်နေသော အခေါင်းပေါက်များ (ပူဖောင်းများ) ဖြစ်ပေါ်လာပြီး ရုတ်တရက် ပြိုကျခြင်း။ ဒေသတွင်း ဖိအားကျဆင်းမှုများ (ဥပမာ- ပန့်များ သို့မဟုတ် အဆို့ရှင်များတွင်) ကြောင့် ဖြစ်ပေါ်ပြီး ပြင်းထန်သော ပစ္စည်းပျက်စီးမှုကို ဖြစ်စေနိုင်သည်။ K Aqua ပိုက်များ၏ ချောမွေ့သော အတွင်းနံရံများသည် cavitation အန္တရာယ်များကို အနည်းဆုံးဖြစ်စေသည်။";
translated.glossar.bento.items[3].t = "Incrustation";
translated.glossar.bento.items[3].d = "ပိုက်များ၏ အတွင်းနံရံများတွင် မာကျောသော အပေါ်ယံလွှာများ (ဥပမာ- ထုံး) အနည်ထိုင်ခြင်းဖြစ်ပြီး အချင်းဝက်ကို ကျဉ်းစေကာ ဖိအားကျဆင်းမှုကို တိုးစေသည်။ K Aqua ပိုက်များ၏ အလွန်နိမ့်သော မျက်နှာပြင်ကြမ်းတမ်းမှု (0.007 မီလီမီတာ) သည် incrustation ကို ထိရောက်စွာ ကာကွယ်ပေးသည်။";
translated.glossar.bento.items[4].t = "အချိန်အလိုက် အတွင်းဖိအား ခံနိုင်ရည်";
translated.glossar.bento.items[4].d = "ကာလကြာရှည်စွာ (ပုံမှန်အားဖြင့် နှစ် 50 သို့ ခန့်မှန်းတွက်ချက်သည်) ကိန်းသေ အတွင်းဖိအားနှင့် အပူချိန် အခြေအနေများအောက်တွင် ပိုက်တစ်ခု၏ သက်တမ်းကို တိုင်းတာခြင်း။";

translated.glossar.timeline.title = "စံနှုန်းများနှင့် လမ်းညွှန်ချက်များ";
translated.glossar.timeline.desc = "ကျွန်ုပ်တို့ လုပ်ငန်း၏ စည်းမျဉ်းစည်းကမ်း အခြေခံအုတ်မြစ်။";
translated.glossar.timeline.items[0].title = "ISO 15874";
translated.glossar.timeline.items[0].desc = "ရေပူနှင့် ရေအေး တပ်ဆင်မှုအတွက် ပလပ်စတစ် ပိုက်စနစ်များအတွက် နိုင်ငံတကာ စံနှုန်း – Polypropylene (PP)။";
translated.glossar.timeline.items[1].title = "DIN 8077 / DIN 8078";
translated.glossar.timeline.items[1].desc = "Polypropylene (PP) ဖြင့်ပြုလုပ်သော ပိုက်များအတွက် အတိုင်းအတာ (8077) နှင့် ယေဘုယျ အရည်အသွေး လိုအပ်ချက်များနှင့် စမ်းသပ်မှုများ (8078) ကို သတ်မှတ်ထားသော ဂျာမန် စက်မှုစံနှုန်းများ။";
translated.glossar.timeline.items[2].title = "DVS 2207-11";
translated.glossar.timeline.items[2].desc = "ဂဟေဆက်ခြင်းနှင့် ဆက်စပ်လုပ်ငန်းစဉ်များအတွက် ဂျာမန်အသင်း၏ လမ်းညွှန်ချက်။ ၎င်းသည် PP ဖြင့် ပြုလုပ်ထားသော ပိုက်များနှင့် fittings များကို ဂဟေဆက်ရန်အတွက် တိကျသော ကန့်သတ်ချက်များ (အပူချိန်၊ အချိန်၊ ဖိအား) ကို သတ်မှတ်သည်။";
translated.glossar.timeline.items[3].title = "TrinkwV";
translated.glossar.timeline.items[3].desc = "ဂျာမန် သောက်သုံးရေ စည်းမျဉ်းဖြစ်ပြီး သောက်သုံးရေ တပ်ဆင်မှုများတွင် သန့်ရှင်းရေးနှင့် အသုံးပြုထားသော ပစ္စည်းများ (K Aqua PP-R ကဲ့သို့) အပေါ် အမြင့်ဆုံး တောင်းဆိုမှုများကို သတ်မှတ်သည်။";

translated.glossar.conclusion.title = "ရှုပ်ထွေးမှုအစား ရှင်းလင်းမှု။";
translated.glossar.conclusion.p1 = "ပလပ်စတစ်ပိုက် လုပ်ငန်းသည် ရှုပ်ထွေးသော်လည်း ခက်ခဲရန် မလိုပါ။";
translated.glossar.conclusion.p2 = "အကယ်၍ သင်သည် အသုံးအနှုန်းတစ်ခု လွတ်သွားပါက သို့မဟုတ် နက်ရှိုင်းသော နည်းပညာဆိုင်ရာ မေးခွန်းများ ရှိပါက၊ ကျွန်ုပ်တို့၏ အင်ဂျင်နီယာအဖွဲ့ထံ ဆက်သွယ်ရန် မတွန့်ဆုတ်ပါနှင့်။";
translated.glossar.conclusion.p3 = "ကျွန်ုပ်တို့သည် သင့်ဘာသာစကားကို ပြောဆိုပါသည်။";
translated.glossar.conclusion.p4 = "ကျွန်ုပ်တို့ အဖြေများ ပေးပါသည်။";

translated.glossar.cta.title = "ဆက်လက်ပညာသင်ကြားခြင်း";
translated.glossar.cta.title1 = "အယူအဆမှ ";
translated.glossar.cta.title2 = "အသုံးချမှုသို့။";
translated.glossar.cta.desc = "K Aqua အကယ်ဒမီသို့ သွားရောက်ပြီး ကျွန်ုပ်တို့၏ ပြင်းထန်သော သင်တန်းများတွင် ဤအယူအဆများ၏ လက်တွေ့အကောင်အထည်ဖော်မှုကို လေ့လာပါ။";
translated.glossar.cta.button = "အကယ်ဒမီသို့";

translated.lead = "K Aqua အကယ်ဒမီသည် အသုံးချ ပိုလီမာနည်းပညာ၏ ဗဟိုဌာနဖြစ်သည်။ ကျွန်ုပ်တို့သည် ရှုပ်ထွေးသော ပိုက်စနစ်များကို ခွဲစိတ်မှုကဲ့သို့ တိကျမှုဖြင့် အကောင်အထည်ဖော်နိုင်သော အသိအမှတ်ပြု ကျွမ်းကျင်သူများကို လေ့ကျင့်ပေးပါသည်။";

translated.videos[0].t = "Socket Fusion ဂဟေဆက်ခြင်း";
translated.videos[0].s = "d20 မှ d125 အရွယ်အစားများအတွက် စံလုပ်ငန်းစဉ်။ တိကျသော အပူချိန် ထိန်းချုပ်မှု၊ တိကျသော ဆက်စပ်ဖိအားများနှင့် ပြီးပြည့်စုံသော တစ်သားတည်းဖြစ်သည့် ဆက်စပ်မှု။";
translated.videos[1].t = "Electrofusion ဂဟေဆက်ခြင်း";
translated.videos[1].s = "စက်မှုလုပ်ငန်းနှင့် အကြီးစား ဆောက်လုပ်ရေးဆိုက်များအတွက် လျှပ်စစ်ဂဟေဆက်ခြင်း။ အမှားအယွင်းကင်းသော ကြိုတင်ပြင်ဆင်မှု၊ အောက်ဆိုဒ်လွှာ ဖယ်ရှားခြင်းနှင့် ပြီးပြည့်စုံသော စကင်နာ မှတ်တမ်းတင်ခြင်း။";
translated.videos[2].t = "Butt ဂဟေဆက်ခြင်း (Butt-Welding)";
translated.videos[2].s = "d355mm အထိ ကြီးမားသော ပိုက်များအတွက် အမြင့်မားဆုံး ကျွမ်းကျင်မှု။ ဂဟေဖိအား တွက်ချက်မှုများ၊ အအေးခံချိန်များနှင့် CNC ထိန်းချုပ်စက် လည်ပတ်ခြင်း။";
translated.videos[3].t = "ဂဟေဆက်ကုန်းနှီးများ တပ်ဆင်ခြင်း";
translated.videos[3].s = "နောက်ဆက်တွဲ အကိုင်းအခက်များကို ထိရောက်စွာနှင့် လုံခြုံစွာ ဖန်တီးပါ။ မှန်ကန်သော တူးဖော်မှုနည်းပညာ၊ ကုန်းနှီးမျက်နှာပြင်ကို အပူပေးခြင်းနှင့် တစ်သားတည်းဖြစ်အောင် ပေါင်းစပ်ခြင်း။";

translated.quiz[0].q = "PP-R ၏ socket fusion ဂဟေဆက်ခြင်းအတွက် မည်သည့် အပူချိန်ကို မဖြစ်မနေ လိုအပ်သနည်း။";
translated.quiz[0].o = [
  "200°C ± 10°C",
  "260°C ± 10°C",
  "300°C ± 10°C"
];
translated.quiz[0].c = 1;

translated.quiz[1].q = "PP-R ပလပ်စတစ်ပိုက်အပြည့်နှင့် နှိုင်းယှဉ်ပါက PP-RCT အမျှင်ပေါင်းစပ်ပိုက်၏ အဓိကအားသာချက်မှာ အဘယ်နည်း။";
translated.quiz[1].o = [
  "တူညီသောအချင်းတွင် အလေးချိန် ပိုပေါ့ခြင်း",
  "အက်ဆစ်များအပေါ် ဓာတုဗေဒ ခံနိုင်ရည် ပိုမြင့်မားခြင်း",
  "အပူကြောင့် အလျားလိုက် ကျယ်ပြန့်မှုကို သိသိသာသာ လျှော့ချထားခြင်း"
];
translated.quiz[1].c = 2;

translated.quiz[2].q = "Electrofusion ဂဟေဆက်ခြင်း (လျှပ်စစ်ဆော့ကတ် ဂဟေဆက်ခြင်း) မတိုင်မီ အောက်ဆိုဒ်လွှာကို မည်သို့ မှန်ကန်စွာ ဖယ်ရှားသနည်း။";
translated.quiz[2].o = [
  "Acetone သို့မဟုတ် isopropanol ဖြင့် သုတ်ခြင်းဖြင့်",
  "သင့်လျော်သော လှည့်ပတ်အခွံခွာကိရိယာဖြင့် စက်ပိုင်းဆိုင်ရာ အခွံခွာခြင်းဖြင့်",
  "ပိုက်မျက်နှာပြင်ကို အပူပေးသေနတ်ဖြင့် အပူပေးခြင်းဖြင့်"
];
translated.quiz[2].c = 1;

translated.quiz[3].q = "မည်သည့် SDR တန်ဖိုး (Standard Dimension Ratio) သည် အမြင့်ဆုံး ဖိအားခံနိုင်ရည်ကို ကိုယ်စားပြုသနည်း။";
translated.quiz[3].o = [
  "SDR 11",
  "SDR 7.4",
  "SDR 6"
];
translated.quiz[3].c = 2;

translated.quiz[4].q = "PP-R စနစ်များတွင် တစ်သားတည်းဖြစ်အောင် ပေါင်းစပ်ခြင်းသည် စက်ပိုင်းဆိုင်ရာ ချိတ်ဆက်မှုများ (ဥပမာ ဖိခြင်း) ထက် အဘယ်ကြောင့် ပိုသာလွန်သနည်း။";
translated.quiz[4].o = [
  "၎င်းသည် ပိုမိုမြန်ဆန်ပြီး အထူးကိရိယာများ မလိုအပ်ပါ။",
  "၎င်းသည် ပိုက်နှင့် fitting ကို မော်လီကျူးအဆင့်တွင် အစိတ်အပိုင်းတစ်ခုအဖြစ် ပေါင်းစပ်ပေးကာ၊ ပျက်စီးနိုင်သော အပိုဆောင်း တံဆိပ်များ မလိုအပ်ပါ။",
  "၎င်းသည် ချိတ်ဆက်မှုကို နောက်ပိုင်းတွင် အလွယ်တကူ ဖြုတ်ပစ်ရန် ခွင့်ပြုသည်။"
];
translated.quiz[4].c = 1;

const myStr = fs.readFileSync('messages/my.json', 'utf8');
const my = JSON.parse(myStr);
my.academy = translated;

// Format replacement to fit inside my.json cleanly
const jsonString = JSON.stringify(my.academy, null, 2);
fs.writeFileSync('academy_replacement.txt', jsonString);

// find start and end of academy in my.json to see how many lines to replace
const lines = myStr.split('\n');
const startIdx = lines.findIndex(l => l === '  "academy": {');
const endIdx = lines.findIndex((l, i) => i > startIdx && l === '  },'); // First match should be the end of academy, actually wait
// Wait, 'academy' is followed by 'geoContent' in my.json?
// Let's print out what we found
console.log(startIdx, endIdx);

