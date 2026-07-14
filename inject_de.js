const fs = require('fs');

const data = JSON.parse(fs.readFileSync('messages/de.json', 'utf-8'));

const guideTexts = {
  pipes: `
    <h2>Das Fundament der modernen Haustechnik</h2>
    <p>Überlegene Rohrleitungstechnik für jedes Projekt ist nicht nur ein Slogan, sondern die Kernphilosophie der PP-R und PP-RCT Systeme von K-Aqua. Bei der Planung eines robusten, zukunftssicheren Sanitär- oder Industrierohrnetzes ist die Wahl des richtigen Basismaterials die wichtigste Entscheidung. Die Standard-PP-R- (Polypropylen-Random-Copolymer) und die fortschrittlichen PP-RCT-Rohre (Polypropylen-Random-Copolymer mit modifizierter Kristallinität und Temperaturbeständigkeit) von K-Aqua bieten eine revolutionäre Alternative zu herkömmlichen metallischen Rohrsystemen wie Kupfer, verzinktem Stahl oder Edelstahl.</p>
    <p>Der Hauptvorteil unserer Kunststoffrohrsysteme ist ihre absolute Immunität gegen galvanische Korrosion und chemischen Abbau. In Regionen mit stark aggressivem, hartem oder saurem Wasser kommt es bei Metallrohren unweigerlich zu Lochfraß, Kalkablagerungen und schließlich zu katastrophalen Ausfällen. K-Aqua Rohre hingegen behalten über ihre gesamte Lebensdauer eine völlig glatte, inerte Innenoberfläche, für die unter normalen Betriebsbedingungen eine Garantie von über 50 Jahren gilt.</p>
    <p>Diese spiegelglatte Innenoberfläche verhindert nicht nur die Anhaftung von Biofilmen und Kalkablagerungen, sondern verringert auch die innere Reibung erheblich. Das bedeutet, dass Zirkulationspumpen weniger Energie benötigen, um das Wasser durch das Gebäude zu bewegen, was zu erheblichen langfristigen Betriebseinsparungen führt.</p>
    <ul>
      <li>Außergewöhnliche Langlebigkeit mit einer garantierten Leistung von über 50 Jahren.</li>
      <li>Hervorragende Beständigkeit gegen chemische Korrosion und strukturellen Abbau.</li>
      <li>Geringe Wärmeleitfähigkeit für bessere Isolierung und Energieeinsparung.</li>
      <li>Völlig ungiftig, wodurch die Reinheit und der Geschmack des Trinkwassers erhalten bleiben.</li>
      <li>Recycelbarer und umweltfreundlicher Produktionsprozess.</li>
    </ul>
    <p>Darüber hinaus hat PP-R von Natur aus eine geringe Wärmeleitfähigkeit, was bedeutet, dass heißes Wasser länger heiß und kaltes Wasser länger kalt bleibt, was die erforderliche Dicke der Außenisolierung drastisch reduziert und gleichzeitig Kondensation bei Kaltwasseranwendungen verhindert. Egal, ob es sich um ein komplexes Hochhaus, eine Industrieanlage oder ein Fernwärmenetz handelt, unsere Rohre bieten die Zuverlässigkeit und Sicherheit, die Sie benötigen. Die Installation ist unkompliziert und hocheffizient, sodass die Arbeitskosten minimiert und die Qualität des Endergebnisses maximiert werden.</p>
    <p>K-Aqua Rohre stellen den Höhepunkt der deutschen Ingenieurskunst dar und wurden sorgfältig entwickelt, um den anspruchsvollsten physikalischen und chemischen Belastungen standzuhalten. Sie sind die ideale Wahl für jeden Bauunternehmer, der ein System bauen möchte, das über Generationen hält, ohne dass ständige Wartung und Reparatur erforderlich sind.</p>
  `,
  fittings: `
    <h2>Sichere Verbindungen</h2>
    <p>Sichere und homogene Verbindungen bilden das entscheidende Bindeglied in jedem zuverlässigen Rohrnetz. Die wahre Stärke des K-Aqua-Rohrleitungssystems liegt in seiner revolutionären Verbindungstechnik. Im Gegensatz zu herkömmlichen Systemen, die auf mechanischer Kompression, Lötzinn oder flüchtigen chemischen Klebstoffen beruhen, nutzt K-Aqua die thermische Polyfusion. Unser umfassendes Sortiment an Formteilen – von einfachen Bögen und T-Stücken bis hin zu komplexen Verteilern und Gewindeübergangsstücken – ist so konzipiert, dass es auf molekularer Ebene direkt mit dem Rohr verschmolzen wird.</p>
    <p>Beim Muffenschweißverfahren werden sowohl die Außenwand des Rohres als auch die Innenwand des Fittings gleichzeitig auf exakt 260°C erhitzt. Beim Zusammenschieben vernetzen sich die geschmolzenen Polymerketten und erstarren zu einer durchgehenden, homogenen Masse. Die resultierende Verbindung ist optisch und physisch kaum vom Rohr selbst zu unterscheiden und wird zum stärksten Punkt im gesamten Netzwerk. Dadurch wird das Risiko von Mikrolecks, die bei Press- oder Stecksystemen nach jahrelangem Gebrauch häufig auftreten, vollständig ausgeschlossen.</p>
    <p>Dadurch entfällt der Bedarf an Gummi-O-Ringen, Dichtungen oder internen Dichtungen vollständig, die sich im Laufe der Jahrzehnte der thermischen Zyklen unweigerlich verschlechtern, austrocknen oder versagen. Da der Fitting über das Rohr gleitet, gibt es absolut keine Verringerung des inneren Querschnitts, was bedeutet, dass es an den Verbindungsstellen zu keiner Durchflussbeschränkung oder keinem Druckverlust kommt.</p>
    <ul>
      <li>Dauerhafte molekulare Verbindungen, die das Risiko von Undichtigkeiten eliminieren.</li>
      <li>Keine Verringerung des Durchflussdurchmessers, wodurch der Wasserdruck erhalten bleibt.</li>
      <li>Beständigkeit gegen extreme Druckspitzen und Wasserschlageffekte.</li>
      <li>Schneller, effizienter Installationsprozess im Vergleich zum Löten oder Gewindeschneiden.</li>
      <li>Umfassende Formen- und Winkelvielfalt für jedes architektonische Layout.</li>
    </ul>
    <p>Darüber hinaus verfügen unsere Übergangsfittings für den Anschluss an bestehende metallische Infrastrukturen über tief eingebettete, verdrehsichere DZR-Messingeinsätze, die extremen Drehmomenten bei der Installation schwerer Ventile und Sanitärarmaturen problemlos standhalten. Jedes Formteil wird strengen Maß- und Belastungstests unterzogen, bevor es unser Werk verlässt, um sicherzustellen, dass es auf Ihrer Baustelle einwandfrei funktioniert.</p>
    <p>Wer sich für K-Aqua Fittings entscheidet, investiert in die Integrität des gesamten Sanitärsystems. Unsere konsequente Qualitätskontrolle stellt sicher, dass jede Verbindung, die Sie herstellen, eine ist, um die Sie sich nie wieder Sorgen machen müssen, und bietet eine dauerhafte Lösung für alle Anwendungen.</p>
  `,
  valves: `
    <h2>Absolute Durchflusskontrolle</h2>
    <p>Präzise Steuerung und langlebige Funktion sind für das Management moderner Sanitärnetze unerlässlich. Ein effektives Fluidmanagement erfordert robuste, zuverlässige Kontrollpunkte, die sich nahtlos in das Hauptverteilungsnetz integrieren lassen. K-Aqua bietet eine umfassende Palette an Hochleistungs-Absperrarmaturen, einschließlich Kugelhähnen mit vollem Durchgang, Unterputzventilen und Präzisionsventilen, die alle speziell für die direkte Polyfusion in PP-R-Rohrleitungen entwickelt wurden.</p>
    <p>Indem wir den Ventilkörper aus genau demselben PP-R-Polymer wie die umgebenden Rohre herstellen, eliminieren wir die Notwendigkeit von Gewindeübergangsstücken bei der Installation von Absperrpunkten. Dies beschleunigt die Installationszeit drastisch, senkt die Materialkosten und beseitigt potenzielle Schwachstellen im System. Die internen mechanischen Komponenten – wie die präzisionsgefertigten Messingkugeln, Edelstahlspindeln und hochwertigen Teflon-Sitzringe (PTFE) – sind so konstruiert, dass sie jahrzehntelang einen unglaublich reibungslosen, wartungsfreien Betrieb bieten.</p>
    <p>Im Gegensatz zu herkömmlichen metallischen Schiebern, die nach jahrelanger Inaktivität häufig klemmen oder an der Stopfbuchse undicht werden, sind die kunststoffgekapselten Ventile von K-Aqua immun gegen äußere Korrosion und eignen sich daher perfekt für feuchte Maschinenräume, erdverlegte Installationen oder feuchte Industrieumgebungen.</p>
    <ul>
      <li>Das Design mit vollem Durchgang verhindert jegliche Einschränkung des Flüssigkeitsstroms.</li>
      <li>Korrosionsbeständige Kunststoffgehäuse schützen interne Metallkomponenten.</li>
      <li>Direkte Polyfusion eliminiert die Notwendigkeit gefährdeter Schraubverbindungen.</li>
      <li>Ergonomische Griffe und Feinmechanik sorgen für eine reibungslose Bedienung.</li>
      <li>Erhältlich in einer Vielzahl von Größen, um sowohl den Bedürfnissen im Wohn- als auch im Industriebereich gerecht zu werden.</li>
    </ul>
    <p>Unser Design mit vollem Durchgang stellt sicher, dass bei geöffnetem Ventil der hydraulische Durchfluss nicht eingeschränkt wird, wodurch der optimale Systemdruck aufrechterhalten und die Effizienz der Zirkulationspumpen maximiert wird. Egal, ob Sie eine einzelne Sanitärarmatur isolieren oder die Hauptversorgungsleitung eines Gewerbegebäudes steuern müssen, K-Aqua-Ventile liefern die erforderliche Zuverlässigkeit und Leistung.</p>
    <p>Jedes Ventil wird vor dem Verpacken strengen Drucktests unterzogen, um sicherzustellen, dass es unseren kompromisslosen Qualitätsstandards entspricht. Vertrauen Sie auf K-Aqua, wenn es um die Kontrollmechanismen geht, mit denen Ihre Flüssigkeitsnetzwerke Tag für Tag und Jahr für Jahr sicher und effizient arbeiten.</p>
  `,
  weldInSaddles: `
    <h2>Einfaches Abzweigen</h2>
    <p>Wenn es um die Erweiterung oder Modifikation einer bestehenden Pipeline geht, bieten Weld-in Saddles (Einschweißsättel) für maximale Flexibilität eine beispiellose Lösung. Die Einschweißsättel von K-Aqua sind eine innovative und hocheffiziente Methode zur Schaffung neuer Abzweige in bestehenden PP-R- und PP-RCT-Netzwerken. Anstatt einen großen Abschnitt des Hauptrohrs abzuschneiden und ein sperriges, teures T-Stück zu installieren, können Sie mit einem Sattel einfach ein Loch in die Seite des Rohrs bohren und den Abzweig direkt auf die Außenwand schweißen.</p>
    <p>Dieser Prozess spart enorm viel Zeit, Arbeit und Material, insbesondere bei der Arbeit mit Industrierohren mit großem Durchmesser. Der Sattel verfügt über eine konkave Basis, die perfekt an die Krümmung des Hauptrohrs angepasst ist und eine große Oberfläche für den Polyfusionsprozess gewährleistet. Einmal verschweißt, wird der Sattel zu einem permanenten, integralen Bestandteil des Hauptrohrs und weist die exakt gleiche Festigkeit und Druckfestigkeit wie ein werkseitig geformtes T-Stück auf.</p>
    <p>Für Bauunternehmer, die ältere Gebäude nachrüsten oder einem aktiven Maschinenraum neue Geräte hinzufügen, sind Einschweißsättel ein absoluter Wendepunkt. Sie benötigen deutlich weniger Platz um das Rohr herum und ermöglichen Änderungen auch in engen, beengten Räumen, in denen das Manövrieren eines großen Schneidwerkzeugs unmöglich wäre.</p>
    <ul>
      <li>Reduziert die Materialkosten drastisch im Vergleich zu T-Stücken mit großem Durchmesser.</li>
      <li>Minimiert Ausfallzeiten bei Nachrüstungen und Systemerweiterungen.</li>
      <li>Erfordert weniger physischen Platz für die Installation in überfüllten Maschinenräumen.</li>
      <li>Erhält die strukturelle Integrität und Druckstufe der Hauptleitung.</li>
      <li>Erhältlich mit Messing-Gewindeeinsätzen zum direkten Anschluss an Sensoren oder Ventile.</li>
    </ul>
    <p>Wir bieten spezielle Bohrwerkzeuge und konturierte Heizmatrizen an, die speziell für die Verwendung mit unseren Sätteln entwickelt wurden. Dies stellt sicher, dass jedes Loch perfekt rund ist und jede Schweißnaht gleichmäßig erhitzt wird, was jedes Mal eine makellose, leckagefreie Verbindung garantiert. Unsere Einschweißsättel verkörpern das Engagement von K-Aqua für praktisches, intelligentes Engineering.</p>
    <p>Egal, ob Sie einen neuen Sensoranschluss, eine Entwässerungsleitung oder einen völlig neuen Verteilerabzweig hinzufügen, K-Aqua-Einschweißsättel bieten die strukturelle Festigkeit und betriebliche Einfachheit, die erforderlich sind, um die Arbeit beim ersten Mal richtig zu erledigen.</p>
  `,
  tools: `
    <h2>Präzision in jedem Schnitt</h2>
    <p>Höchste Präzision für die perfekte Verbindung ist das Markenzeichen unserer Werkzeuge. Die Zuverlässigkeit jedes Polyfusions-Sanitärsystems hängt vollständig von der Präzision der Installationswerkzeuge ab. K-Aqua bietet eine umfassende Palette professioneller Schneid- und Schweißgeräte, die entwickelt wurden, um menschliche Fehler zu beseitigen und perfekte, homogene Verbindungen an jedem einzelnen Anschluss zu garantieren, von 20-mm-Wohnleitungen bis hin zu massiven 250-mm-Industriehauptleitungen.</p>
    <p>Eine makellose Schweißnaht beginnt mit einem perfekt rechtwinkligen, sauberen Schnitt. Unsere Ratschen- und Rotationsrohrschneider sorgen für eine gratfreie, 90-Grad-Kante, die unbedingt erforderlich ist, damit das Rohr richtig in der Muffe sitzt. Wenn ein Rohr schräg geschnitten wird, ist die resultierende Schweißnaht ungleichmäßig, was möglicherweise zu Durchflussbeschränkungen oder langfristigen strukturellen Ausfällen führt. Unsere Fräser sind aus gehärtetem Stahl gebaut, um den Strapazen auf der Baustelle standzuhalten.</p>
    <p>Für den Schweißprozess verfügen die Handschweißmaschinen und die hochleistungsfähigen hydraulischen Schweißstationen von K-Aqua über elektronisch gesteuerte Heizelemente. Diese Thermostate halten strikt die für eine optimale molekulare Bindung erforderliche kritische Temperatur von 260°C aufrecht und verhindern so, dass sich der Kunststoff durch Überhitzung zersetzt oder durch Unterhitzung spröde, schwache Verbindungen entstehen.</p>
    <ul>
      <li>Elektronisch geregelte Thermostate garantieren präzise Schweißtemperaturen.</li>
      <li>Eine hochwertige Teflonbeschichtung (PTFE) verhindert das Anhaften von Kunststoff an den Matrizen.</li>
      <li>Ratschenrohrschneider reduzieren die Ermüdung der Hände und sorgen für perfekt quadratische Schnitte.</li>
      <li>Hochleistungs-Hydraulikgeräte bieten die immense Kraft, die für Rohre mit großem Durchmesser benötigt wird.</li>
      <li>Elektroschweißmaschinen bieten automatisiertes, dokumentiertes Schweißen für kritische Anwendungen.</li>
    </ul>
    <p>Die Heizmatrizen selbst sind mit hochwertigem, antihaftbeschichtetem Teflon (PTFE) beschichtet, um eine saubere Wärmeübertragung zu gewährleisten und ein Reißen des geschmolzenen Kunststoffs beim Entfernen zu verhindern. Durch den Einsatz originaler automatisierter Elektroschweißmaschinen, Stumpfschweißgeräte und spezieller Sattelwerkzeuge von K-Aqua können Auftragnehmer ihre Effizienz vor Ort maximieren, körperliche Ermüdung deutlich reduzieren und ihren Kunden eine dokumentierte, 100% auslaufsichere Qualitätssicherung bieten.</p>
    <p>Die Investition in professionelle K-Aqua Werkzeuge ist eine Investition in die Langlebigkeit und Integrität Ihrer Arbeit. Sie sind so konzipiert, dass sie selbst in den rauesten Umgebungen zuverlässig funktionieren und sicherstellen, dass Sie bei jedem Projekt, unabhängig von Umfang oder Komplexität, in Deutschland entwickelte Perfektion liefern können.</p>
  `,
  accessories: `
    <h2>Der letzte Schliff</h2>
    <p>Accessories (Zubehör) für eine normgerechte Installation machen aus einem funktionalen Sanitärsystem ein professionelles Meisterwerk. Während Rohre und Formteile den Kern des Netzwerks bilden, ist das unterstützende Zubehör von entscheidender Bedeutung, um Wärmeausdehnungen auszugleichen, Vibrationen zu mindern und eine sichere Integration in die Gebäudeinfrastruktur zu gewährleisten. K-Aqua bietet ein umfassendes Ökosystem an Zubehör, das so konzipiert ist, dass es perfekt mit unseren PP-R- und PP-RCT-Produkten harmoniert.</p>
    <p>Einer der wichtigsten Aspekte bei jeder Warmwasser- oder Heizungsanlage ist die Beherrschung der Längenausdehnung der Rohre. Unsere speziellen Rohrschellen sind so konstruiert, dass sie entweder als Festpunkte oder als Schiebeführungen fungieren, sodass sich das Rohr sanft ausdehnen und zusammenziehen kann, ohne die Verbindungen oder die Gebäudestruktur durch Belastung zu beschädigen. Diese Klemmen verfügen über dicke Gummiauskleidungen, die eine hervorragende Schalldämmung bieten und die Übertragung von Strömungsgeräuschen durch die Wände verhindern.</p>
    <p>Darüber hinaus umfasst unser Sortiment hochwertige EPDM-Flachdichtungen, spezielle Vorschweißflansche mit Stahlkern für Industrieanschlüsse und robuste Reparaturstopfen, die schnelle und dauerhafte Reparaturen ermöglichen, falls ein Rohr während des Baus versehentlich durchbohrt wird.</p>
    <ul>
      <li>Akustisch ausgekleidete Rohrschellen eliminieren die Übertragung von Strömungsgeräuschen.</li>
      <li>Richtige Verankerungssysteme steuern Wärmeausdehnung und -kontraktion sicher.</li>
      <li>Stahlverstärkte Vorschweißflansche gewährleisten eine sichere Verbindung zu schweren Maschinen.</li>
      <li>Hochwertige EPDM-Dichtungen sorgen für belastbare, langlebige Abdichtungen an Flanschverbindungen.</li>
      <li>Spezielle Reparaturstopfen bieten eine dauerhafte Lösung für versehentliche Bohrlöcher.</li>
    </ul>
    <p>Die Verwendung von generischem oder inkompatiblem Zubehör kann die Leistung eines Premium-Rohrleitungssystems stark beeinträchtigen. Die Verwendung von Schellen ohne Gummiauskleidung an einer Warmwasserleitung kann beispielsweise zu störenden Klickgeräuschen bei der Ausdehnung des Rohrs führen, während eine unsachgemäße Verankerung dazu führen kann, dass sich das Rohr bei thermischer Belastung verbiegt oder sogar reißt. K-Aqua-Zubehör wird strengen Tests unterzogen, um sicherzustellen, dass es unseren anspruchsvollen Standards entspricht.</p>
    <p>Durch die Verwendung unseres kompletten Zubehörsortiments können Installateure sicherstellen, dass ihre Arbeit die örtlichen Bauvorschriften und Industriestandards nicht nur erfüllt, sondern übertrifft. Es ist die Liebe zu diesen kleinen Details, die eine wirklich professionelle Installation ausmacht und einen jahrzehntelangen, einwandfreien Betrieb garantiert.</p>
  `,
  transitionFittings: `
    <h2>Die Lücke schließen</h2>
    <p>Wenn es darum geht, moderne Polymersysteme mit traditioneller metallischer Infrastruktur zu verbinden, sind sichere und homogene Verbindungen von absoluter Bedeutung. Übergangsfittings dienen als entscheidende Brücke zwischen den fortschrittlichen PP-R/PP-RCT-Rohren von K-Aqua und vorhandenen Stahl-, Kupfer- oder Messingkomponenten wie Kesseln, Kühlern und Sanitärarmaturen. Diese Beschläge erfordern ein außergewöhnliches Maß an Technik, um sicherzustellen, dass die Verbindung zwischen Metall und Kunststoff auch unter extremen thermischen Zyklen und mechanischer Beanspruchung absolut dicht bleibt.</p>
    <p>K-Aqua-Übergangsfittings verfügen über tief eingebettete, verdrehsichere DZR-Messingeinsätze (Dezincification Resistant). Während des Spritzgussverfahrens wird das heiße PP-R direkt um das komplexe geometrische Profil des Messingeinsatzes geformt. Wenn der Kunststoff abkühlt und schrumpft, greift er das Messing mit enormer Kraft und bildet so eine untrennbare mechanische Verbindung. Dieses Design verhindert, dass sich der Messingeinsatz verdreht oder herauszieht, selbst wenn er bei der Installation dem hohen Drehmoment eines Klempnerschlüssels ausgesetzt ist.</p>
    <p>Darüber hinaus stellt das hochwertige DZR-Messing sicher, dass der metallische Teil des Fittings äußerst widerstandsfähig gegen aggressive Wasserbedingungen ist, wodurch die vorzeitige Korrosion verhindert wird, die Standard-Messingfittings häufig plagt. Dies ist insbesondere in Warmwassersystemen von entscheidender Bedeutung, in denen die Reaktionsgeschwindigkeit deutlich beschleunigt wird.</p>
    <ul>
      <li>DZR-Messingeinsätze bieten überlegene Beständigkeit gegen Entzinkung und Korrosion.</li>
      <li>Das verdrehsichere Design hält hohen Drehmomenten bei Gewindeinstallationen problemlos stand.</li>
      <li>Eine untrennbare Verbindung zwischen Kunststoff und Metall gewährleistet eine lebenslange, leckagefreie Leistung.</li>
      <li>Erhältlich in einer großen Auswahl an Konfigurationen mit Außen- und Innengewinde.</li>
      <li>Perfekt für den Anschluss von PP-R-Netzen an metallische Pumpen, Ventile und Kessel.</li>
    </ul>
    <p>Egal, ob Sie eine massive 125-mm-Industriekühlleitung an einen Stahlflansch anpassen oder einfach eine 20-mm-Wohnwasserleitung an ein Chrom-Eckventil anschließen müssen, K-Aqua bietet das exakt erforderliche Übergangsstück. Unser umfangreicher Katalog umfasst gerade Adapter, Gewindebögen, Wandplattenhalterungen und robuste Metallverschraubungen und gewährleistet absolute Vielseitigkeit auf der Baustelle.</p>
    <p>Wenn Sie K-Aqua-Übergangsfittings vertrauen, beseitigen Sie das schwächste Glied in hybriden Sanitärsystemen. Unser kompromissloser Ansatz bei der Herstellung garantiert, dass der Übergang zwischen Metall und Polymer so stark und zuverlässig ist wie das Rohr selbst und bietet sowohl dem Installateur als auch dem Endverbraucher Sicherheit.</p>
  `
};

if (!data.seoArticle) data.seoArticle = {};
if (!data.seoArticle.transitionFittings) {
  data.seoArticle.transitionFittings = {
    advTitle: "Sichere und homogene Verbindungen",
    advList: [
      "DZR-Messingeinsätze bieten überlegene Beständigkeit gegen Entzinkung.",
      "Das verdrehsichere Design hält hohen Drehmomenten stand.",
      "Eine untrennbare Verbindung zwischen Kunststoff und Metall gewährleistet eine leckagefreie Leistung."
    ],
    seoText: "Übergangsfittings dienen als entscheidende Brücke zwischen den fortschrittlichen PP-R/PP-RCT-Rohren von K-Aqua und vorhandenen Stahl-, Kupfer- oder Messingkomponenten. Diese Beschläge erfordern ein außergewöhnliches Maß an Technik."
  };
}

for (const [cat, text] of Object.entries(guideTexts)) {
  if (!data.seoArticle[cat]) data.seoArticle[cat] = {};
  data.seoArticle[cat].guideText = text;
}

fs.writeFileSync('messages/de.json', JSON.stringify(data, null, 2));
console.log('de.json injected');
