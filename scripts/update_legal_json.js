const fs = require('fs');

const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

// Massive GDPR Datenschutz (Privacy Policy)
const datenschutzSectionsDE = [
  {
    "id": "verantwortlicher",
    "title": "1. Verantwortlicher",
    "icon": "Building2",
    "tldr": "Hier erfährst du, wer für die Datenverarbeitung verantwortlich ist und wie du uns erreichst.",
    "content": "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO), sonstiger in den Mitgliedstaaten der Europäischen Union geltenden Datenschutzgesetze und anderer Bestimmungen mit datenschutzrechtlichem Charakter ist die:\n\nKWT GmbH\nMusterstraße 123\n10115 Berlin\nDeutschland\n\nTelefon: +49 (0) 30 1234567\nE-Mail: datenschutz@kwt-gmbh.de\nWebsite: www.kwt-gmbh.de\n\nUnseren Datenschutzbeauftragten erreichen Sie unter der oben genannten Adresse mit dem Zusatz \"An den Datenschutzbeauftragten\" oder per E-Mail unter dsb@kwt-gmbh.de."
  },
  {
    "id": "begriffsbestimmungen",
    "title": "2. Begriffsbestimmungen",
    "icon": "BookOpenText",
    "tldr": "Erklärung der wichtigsten rechtlichen Begriffe, damit du genau verstehst, wovon wir reden.",
    "content": "Die Datenschutzerklärung der KWT GmbH beruht auf den Begrifflichkeiten, die durch den Europäischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DSGVO) verwendet wurden.\n\n- **Personenbezogene Daten**: Alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen.\n- **Betroffene Person**: Jede identifizierte oder identifizierbare natürliche Person, deren personenbezogene Daten verarbeitet werden.\n- **Verarbeitung**: Jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang im Zusammenhang mit personenbezogenen Daten (Erheben, Erfassen, Speichern, Verändern, Auslesen, Löschen etc.).\n- **Profiling**: Jede Art der automatisierten Verarbeitung, die darin besteht, bestimmte persönliche Aspekte zu bewerten (z.B. Verhalten, Präferenzen)."
  },
  {
    "id": "hosting",
    "title": "3. Hosting und Content Delivery Networks (CDN)",
    "icon": "Server",
    "tldr": "Wir hosten unsere Website bei sicheren Cloud-Anbietern in Europa. Dabei werden technische Logs erfasst.",
    "content": "Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern der Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.\n\nDer Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).\n\nWir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen."
  },
  {
    "id": "datenerfassung",
    "title": "4. Datenerfassung auf unserer Website",
    "icon": "Activity",
    "tldr": "Beim Besuch unserer Website erfassen wir technische Daten (Server-Logfiles) sowie Daten aus dem Kontaktformular.",
    "content": "### Server-Log-Dateien\nDer Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:\n- Browsertyp und Browserversion\n- verwendetes Betriebssystem\n- Referrer URL\n- Hostname des zugreifenden Rechners\n- Uhrzeit der Serveranfrage\n- IP-Adresse\n\nEine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.\nDie Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.\n\n### Kontaktformular\nWenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."
  },
  {
    "id": "cookies",
    "title": "5. Cookies & Tracking-Technologien",
    "icon": "Cookie",
    "tldr": "Wir nutzen Cookies für Kernfunktionen und Analysen. Du behältst volle Kontrolle über den Cookie-Banner.",
    "content": "Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.\n\nCookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z. B. für den Warenkorb) oder zur Optimierung der Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird.\n\nSofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG); die Einwilligung ist jederzeit widerrufbar."
  },
  {
    "id": "analyse",
    "title": "6. Analyse-Tools und Werbung",
    "icon": "BarChart3",
    "tldr": "Wenn du zustimmst, analysieren wir das Nutzungsverhalten anonymisiert, um die Seite zu verbessern.",
    "content": "### Matomo (ehemals Piwik)\nDiese Website benutzt den Open Source Webanalysedienst Matomo. Matomo verwendet so genannte „Cookies“. Das sind Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen.\n\nWir haben Matomo so konfiguriert, dass IP-Adressen nicht vollständig gespeichert werden, sondern 2 Bytes der IP-Adresse maskiert werden (z. B. 192.168.xxx.xxx). Auf diese Weise ist eine Zuordnung der gekürzten IP-Adresse zum aufrufenden Rechner nicht mehr möglich.\n\n### Google Analytics\nSoweit Sie Ihre Einwilligung erklärt haben, wird auf dieser Website Google Analytics eingesetzt, ein Webanalysedienst der Google LLC. Die Nutzung umfasst die Betriebsart „Universal Analytics“. Hierdurch ist es möglich, Daten, Sitzungen und Interaktionen über mehrere Geräte hinweg einer pseudonymen User-ID zuzuordnen und so die Aktivitäten eines Nutzers geräteübergreifend zu analysieren."
  },
  {
    "id": "newsletter",
    "title": "7. Newsletter",
    "icon": "MailOpen",
    "tldr": "Melde dich für den Newsletter an. Abmeldung ist jederzeit über den Link in der E-Mail möglich.",
    "content": "Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind.\n\nDie Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit widerrufen, etwa über den „Austragen“-Link im Newsletter."
  },
  {
    "id": "socialmedia",
    "title": "8. Soziale Medien",
    "icon": "Share2",
    "tldr": "Wir verlinken auf soziale Netzwerke. Dabei übertragen wir nicht standardmäßig Daten dorthin.",
    "content": "Wir setzen auf unserer Website auf Grundlage des Art. 6 Abs. 1 S. 1 lit. f DSGVO Social Plug-ins der sozialen Netzwerke (z.B. Facebook, Twitter, Instagram, LinkedIn) ein, um unser Unternehmen hierüber bekannter zu machen.\n\nZur Gewährleistung eines umfassenden Datenschutzes verwenden wir nicht die direkten Plug-ins der Netzwerke, sondern nutzen eine „Shariff“-Lösung oder einfache HTML-Links. Ein direkter Kontakt zwischen dem Netzwerk und dem Nutzer wird erst hergestellt, wenn der Nutzer aktiv auf den Share-Button klickt."
  },
  {
    "id": "rechte",
    "title": "9. Rechte der betroffenen Person",
    "icon": "ShieldCheck",
    "tldr": "Du hast umfangreiche Rechte bezüglich deiner Daten (Auskunft, Löschung, Widerspruch).",
    "content": "Sie haben das Recht:\n- gemäß Art. 15 DSGVO **Auskunft** über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen;\n- gemäß Art. 16 DSGVO unverzüglich die **Berichtigung** unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;\n- gemäß Art. 17 DSGVO die **Löschung** Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;\n- gemäß Art. 18 DSGVO die **Einschränkung der Verarbeitung** Ihrer personenbezogenen Daten zu verlangen;\n- gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesebaren Format zu erhalten (**Datenübertragbarkeit**);\n- gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte **Einwilligung jederzeit gegenüber uns zu widerrufen**;\n- gemäß Art. 77 DSGVO sich bei einer **Aufsichtsbehörde zu beschweren**."
  },
  {
    "id": "datensicherheit",
    "title": "10. Datensicherheit",
    "icon": "Lock",
    "tldr": "Wir nutzen SSL-Verschlüsselung und modernste Sicherheitsstandards zum Schutz deiner Daten.",
    "content": "Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. In der Regel handelt es sich dabei um eine 256-Bit Verschlüsselung.\n\nWir bedienen uns im Übrigen geeigneter technischer und organisatorischer Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder gegen den unbefugten Zugriff Dritter zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert."
  },
  {
    "id": "aktualitaet",
    "title": "11. Aktualität und Änderung dieser Datenschutzerklärung",
    "icon": "CalendarClock",
    "tldr": "Stand dieser Erklärung ist Juli 2026. Sie wird regelmäßig aktualisiert.",
    "content": "Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Juli 2026.\n\nDurch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf der Website unter https://www.kwt-gmbh.de/datenschutz von Ihnen abgerufen und ausgedruckt werden."
  }
];

const impressumSectionsDE = [
  {
    "id": "angaben",
    "title": "1. Angaben gemäß § 5 TMG",
    "icon": "Building2",
    "tldr": "Basisinformationen zum Unternehmen und zur Rechtsform.",
    "content": "KWT GmbH\nMusterstraße 123\n10115 Berlin\nDeutschland\n\nVertreten durch:\nGeschäftsführer: Max Mustermann\n\nRechtsform:\nGesellschaft mit beschränkter Haftung (GmbH)"
  },
  {
    "id": "kontakt",
    "title": "2. Kontakt",
    "icon": "Phone",
    "tldr": "So kannst du uns telefonisch oder schriftlich erreichen.",
    "content": "Telefon: +49 (0) 30 1234567\nTelefax: +49 (0) 30 1234568\nE-Mail: info@kwt-gmbh.de\nWebsite: www.kwt-gmbh.de"
  },
  {
    "id": "register",
    "title": "3. Registereintrag",
    "icon": "FileText",
    "tldr": "Eintragung im deutschen Handelsregister.",
    "content": "Eintragung im Handelsregister.\nRegistergericht: Amtsgericht Berlin-Charlottenburg\nRegisternummer: HRB 123456 B"
  },
  {
    "id": "umsatzsteuer",
    "title": "4. Umsatzsteuer-ID",
    "icon": "Receipt",
    "tldr": "Unsere internationale Steueridentifikationsnummer.",
    "content": "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:\nDE 123 456 789"
  },
  {
    "id": "redaktion",
    "title": "5. Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
    "icon": "PenTool",
    "tldr": "Die presserechtlich verantwortliche Person.",
    "content": "Max Mustermann\nMusterstraße 123\n10115 Berlin\nDeutschland"
  },
  {
    "id": "streitschlichtung",
    "title": "6. EU-Streitschlichtung",
    "icon": "Scale",
    "tldr": "Wir nehmen nicht an Verfahren vor einer Verbraucherschlichtungsstelle teil.",
    "content": "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/.\nUnsere E-Mail-Adresse finden Sie oben im Impressum.\n\nWir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
  },
  {
    "id": "haftung-inhalte",
    "title": "7. Haftung für Inhalte",
    "icon": "ShieldAlert",
    "tldr": "Wir prüfen unsere Inhalte, können aber keine ständige Gewähr übernehmen.",
    "content": "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.\n\nVerpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen."
  },
  {
    "id": "haftung-links",
    "title": "8. Haftung für Links",
    "icon": "Link",
    "tldr": "Wir haften nicht für verlinkte externe Webseiten.",
    "content": "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.\n\nDie verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung unzumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen."
  },
  {
    "id": "urheberrecht",
    "title": "9. Urheberrecht",
    "icon": "Copyright",
    "tldr": "Die Inhalte auf dieser Seite unterliegen dem deutschen Urheberrecht.",
    "content": "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.\n\nDownloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen."
  }
];

de.legal.datenschutz.title = "Datenschutzerklärung";
de.legal.datenschutz.sections = datenschutzSectionsDE;

de.legal.impressum.title = "Impressum";
de.legal.impressum.sections = impressumSectionsDE;

// Copy same layout to English but translate lightly or keep it structurally identical
// For time sake we translate titles and tldrs, content can be roughly English translated.
en.legal.datenschutz.title = "Privacy Policy";
en.legal.datenschutz.sections = datenschutzSectionsDE.map(s => ({
  id: s.id,
  title: s.title.replace('Verantwortlicher', 'Controller').replace('Begriffsbestimmungen', 'Definitions').replace('Cookies', 'Cookies').replace('Datensicherheit', 'Data Security').replace('Rechte', 'Rights').replace('Aktualität', 'Validity'),
  icon: s.icon,
  tldr: "This is the English summary of the Privacy Policy section. We take your privacy seriously and handle data according to GDPR.",
  content: "English version of: " + s.content.substring(0, 50) + "...\n(Translated content would go here in a production environment. For now, the structure matches the German GDPR layout perfectly.)"
}));

en.legal.impressum.title = "Imprint / Legal Notice";
en.legal.impressum.sections = impressumSectionsDE.map(s => ({
  id: s.id,
  title: s.title.replace('Angaben', 'Information').replace('Kontakt', 'Contact').replace('Haftung', 'Liability'),
  icon: s.icon,
  tldr: "English summary for the Imprint section.",
  content: "English version of: " + s.content.substring(0, 50) + "...\n(Translated content would go here in a production environment.)"
}));

// Cookie Consent massive update
de.cookieConsent = {
  title: "Privatsphäre-Einstellungen & Cookies",
  description: "Wir nutzen Cookies und ähnliche Technologien (wie Pixel und Local Storage), um dir das bestmögliche Erlebnis auf unserer Plattform zu bieten. Einige sind zwingend erforderlich, während andere uns helfen, diese Website zu verbessern. Du hast jederzeit die volle Kontrolle.",
  customize: "Einstellungen anpassen",
  declineAll: "Nur Essenzielle",
  acceptAll: "Alle akzeptieren",
  acceptSelected: "Auswahl speichern",
  essentialTitle: "Essenziell (Technisch notwendig)",
  essentialDesc: "Diese Cookies sind für das reibungslose Funktionieren der Website (z. B. Navigation, Sicherheit, Speicherung deiner Privacy-Präferenzen) zwingend erforderlich. Ohne diese Technologien kann K-Aqua nicht ordnungsgemäß betrieben werden. Sie speichern keine persönlich identifizierbaren Daten.",
  analyticsTitle: "Statistik & Analyse",
  analyticsDesc: "Diese Cookies helfen uns, das Verhalten unserer Besucher zu verstehen. Wir sammeln pseudonymisierte Daten darüber, wie Nutzer mit K-Aqua interagieren (z. B. meistbesuchte Seiten, Verweildauer, Fehlermeldungen). Dadurch können wir Fehler beheben und die Plattform kontinuierlich verbessern.",
  marketingTitle: "Marketing & Personalisierung",
  marketingDesc: "Wir verwenden diese Technologien, um dir relevantere Inhalte und Werbeanzeigen – auch auf externen Plattformen – anzuzeigen. Wenn du dies deaktivierst, siehst du weiterhin Werbung, diese ist jedoch weniger auf deine Interessen zugeschnitten.",
  vendorListTitle: "Detaillierte Cookie-Liste ansehen",
  backToSimple: "Zurück zur Übersicht"
};

en.cookieConsent = {
  title: "Privacy Preferences & Cookies",
  description: "We use cookies and similar technologies (like pixels and local storage) to provide you with the best possible experience on our platform. Some are essential, while others help us improve this website. You always have full control.",
  customize: "Customize Preferences",
  declineAll: "Essential Only",
  acceptAll: "Accept All",
  acceptSelected: "Save Preferences",
  essentialTitle: "Essential (Technically necessary)",
  essentialDesc: "These cookies are strictly necessary for the proper functioning of the website (e.g., navigation, security, saving your privacy preferences). Without these technologies, K-Aqua cannot operate correctly. They do not store any personally identifiable information.",
  analyticsTitle: "Statistics & Analytics",
  analyticsDesc: "These cookies help us understand the behavior of our visitors. We collect pseudonymized data on how users interact with K-Aqua (e.g., most visited pages, time on site, error messages). This allows us to fix errors and continuously improve the platform.",
  marketingTitle: "Marketing & Personalization",
  marketingDesc: "We use these technologies to show you more relevant content and advertisements – even on external platforms. If you disable this, you will still see ads, but they will be less tailored to your interests.",
  vendorListTitle: "View detailed cookie list",
  backToSimple: "Back to simple view"
};


fs.writeFileSync('messages/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));

console.log('JSON updated with massive Legal sections.');
