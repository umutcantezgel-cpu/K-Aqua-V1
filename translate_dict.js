const fs = require('fs');
const dict = {
  "PP-R Armaturen & Ventile für Rohrsysteme": "Valvula dhe armatura PP-R për sisteme tubacionesh",
  "Entdecken Sie hochwertige Armaturen und Ventile von K-Aqua. Maximale Sicherheit und Langlebigkeit durch German Engineering für anspruchsvolle Rohrnetze.": "Zbuloni valvula dhe armatura me cilësi të lartë nga K-Aqua. Siguri maksimale dhe jetëgjatësi nëpërmjet inxhinierisë gjermane për rrjetet më kërkuese të tubacioneve.",
  "Unter höchstem Druck.": "Nën presionin më të lartë.",
  "Willkommen in der obersten Liga der Strömungstechnik. K Aqua Ventile und Armaturen sind nicht einfach nur Komponenten. Sie sind das unbestechliche Herzstück globaler Infrastruktur. Gefertigt für die Ewigkeit.": "Mirësevini në ligën e lartë të teknologjisë së rrjedhjes. Valvulat dhe armaturat K Aqua nuk janë thjesht komponentë. Ato janë zemra e pakompromistë e infrastrukturës globale. Të prodhuara për t'i rezistuar kohës.",
  "In der industriellen Strömungstechnik ist ein Ventil niemals nur ein Schalter für Flüssigkeiten. Es ist der kritische Knotenpunkt, an dem kinetische Energie, extremer Druck, thermische Ausdehnung und chemische Aggressivität aufeinandertreffen.": "Në teknologjinë industriale të rrjedhjes, një valvul nuk është kurrë vetëm një çelës për lëngjet. Është pika kritike ku takohen energjia kinetike, presioni ekstrem, zgjerimi termik dhe agresiviteti kimik.",
  "Hier trennt sich banale Massenware von echter Ingenieurskunst. Unsere Armaturen sind massiv überdimensioniert, paranoid genau gefertigt und für Szenarien gebaut, die andere Hersteller als \"unmöglich\" bezeichnen würden. Das verstehen wir unter <span class=\"text-foreground font-bold\">German Engineering</span>.": "Këtu ndahet produkti i lirë masiv nga inxhinieria e vërtetë. Armaturat tona janë masivisht të mbidimensionuara, të prodhuara me saktësi paranojake dhe të ndërtuara për skenarë që prodhuesit e tjerë do t'i konsideronin si \"të pamundura\". Kjo është ajo që ne kuptojmë me <span class=\"text-foreground font-bold\">inxhinieri gjermane</span>.",
  "Vom Rohstoff bis zur unzerstörbaren Armatur.": "Nga lënda e parë te armatura e pashkatërrueshme.",
  "Begleiten Sie den Entstehungsprozess eines K Aqua Ventils. Ein kompromissloser Weg durch Hitze, Druck und mikroskopische Präzision.": "Ndiqni procesin e krijimit të një valvule K Aqua. Një rrugë pa kompromise përmes nxehtësisë, presionit dhe saktësisë mikroskopike.",
  "Unsere Ventile und Armaturen beginnen ihre Existenz als reines, industriell geprüftes Hochleistungs-Material. Durch strenge spektralanalytische Untersuchungen garantieren wir bereits vor dem ersten Fräskopf-Einsatz, dass absolut keine mikrostrukturellen Schwachstellen vorhanden sind. Dies ist die unverhandelbare Grundlage für die spätere absolute Korrosionsbeständigkeit und mechanische Integrität im jahrelangen Dauereinsatz.": "Valvulat dhe armaturat tona e fillojnë ekzistencën e tyre si material me performancë të lartë, të pastër dhe të testuar në mënyrë industriale. Nëpërmjet analizave strikte spektrale ne garantojmë para çdo prerjeje që nuk ka absolutisht asnjë dobësi në mikrostrukturë. Kjo është baza e panegociueshme për rezistencën e plotë kundër korrozionit dhe integritetin mekanik në përdorim afatgjatë.",
  "Hochpräzise CNC-Bearbeitung": "Përpunim me precizion të lartë CNC",
  "Jedes einzelne Bauteil wird in unserem Werk auf hochmodernen 5-Achs-CNC-Bearbeitungszentren mit einer absurden Toleranz von unter einem tausendstel Millimeter aus dem Vollen gefertigt. Diese kompromisslose Präzision sorgt dafür, dass Dichtflächen perfekt aufeinanderliegen. Sie eliminiert Leckagerisiken vollständig und garantiert einen absolut reibungslosen, seidenweichen und verschleißfreien Betrieb, auch noch nach Jahrzehnten.": "Çdo komponent i vetëm prodhohet në fabrikën tonë nga qendra jashtëzakonisht moderne CNC me 5 akse me një tolerancë absurde prej më pak se një e mijta e milimetrit. Ky precizion pa kompromise siguron që sipërfaqet izoluese të përshtaten në mënyrë të përkryer. Kjo eliminon plotësisht rrezikun e rrjedhjeve dhe garanton një funksionim plotësisht të pandërprerë, të qetë e pa konsum, edhe pas dekadash.",
  "Kavitationsfreie Strömung": "Rrjedhje pa kavitacion",
  "Ein Ventil ist nur so gut wie sein inneres Strömungsprofil. Mithilfe fortschrittlichster numerischer Strömungsmechanik (CFD) haben wir die internen Konturen so gestaltet, dass Turbulenzen und Kavitation praktisch ausgeschlossen sind. Das bedeutet weniger Druckverlust im Gesamtsystem und absolute Geräuschminimierung selbst bei höchsten Fließgeschwindigkeiten.": "Një valvul është aq e mirë sa edhe profili i saj i brendshëm i rrjedhjes. Duke përdorur mekanikën më të avancuar të rrjedhjes kompjuterike (CFD), ne kemi formuar konturet e brendshme në mënyrë të atillë që turbulencat dhe kavitacioni janë praktikisht të pamundura. Kjo do të thotë më pak humbje presioni në të gjithë sistemin dhe minimizim absolut i zhurmave edhe në shpejtësi ekstreme të rrjedhjes.",
  "100% Endprüfung. Keine Ausnahmen.": "Testim përfundimtar 100%. Asnjë përjashtim.",
  "Stichproben reichen nicht aus, wenn Milliarden-Infrastrukturen auf dem Spiel stehen. Bevor eine Armatur das K Aqua Werk verlässt, wird sie einem vollautomatisierten, robotischen Prüfzyklus unterzogen, der die realen Belastungen um ein Vielfaches übersteigt. Hydraulische Hochdrucktests, Helium-Vakuum-Lecktests und thermische Schockprüfungen garantieren unsere legendäre Null Fehler-Quote.": "Provat e rastësishme nuk mjaftojnë kur janë në rrezik infrastruktura me vlerë miliarda. Përpara se një armaturë të dalë nga fabrika K Aqua, ajo i nënshtrohet një cikli të plotë, të automatizuar dhe robotik testimi, i cili tejkalon ngarkesat reale me shumë herë. Testimet hidraulike të presionit të lartë, testimi i rrjedhjeve me vakuum heliumi dhe testet termike të shokut garantojnë kuotën tonë legjendare të zero defekteve.",
  "Anatomie der Zuverlässigkeit": "Anatomia e besueshmërisë",
  "Die innere Architektur unserer Armaturen ist konsequent auf <span class=\"font-semibold\">Totraumfreiheit</span> getrimmt. Stagnationszonen, in denen sich Bakterien wie Legionellen vermehren könnten, sind geometrisch eliminiert.": "Arkitektura e brendshme e armaturave tona është drejtuar vazhdimisht drejt <span class=\"font-semibold\">mungesës së hapësirës së vdekur</span>. Zonat e stagnimit ku bakteret si Legionella mund të shumoheshin, eliminohen gjeometrikisht.",
  "Das Wasser schießt in einer perfekt geführten laminaren Strömung durch den Ventilkörper. Die massiven Dichtsitze sind selbstreinigend und schließen selbst nach dem millionsten Zyklus hermetisch ab.": "Uji ecën nëpër trupin e valvulës me një rrjedhje të përkryer laminare. Sediljet masive izoluese vetëpastrohen dhe mbyllen hermetikisht edhe pas ciklit të një miliontë.",
  "geprüfte Trinkwasserhygiene nach höchsten Standards": "higjienë e testuar për ujë të pijshëm sipas standardeve më të larta",
  "Die nackten Zahlen der Überlegenheit.": "Të dhënat e thjeshta të epërsisë.",
  "Wenn Marketing-Phrasen enden, sprechen die Daten. Entdecken Sie die technischen Parameter, die unsere Ventile zur ultimativen Wahl für Megaprojekte machen.": "Kur fjalët e marketingut mbarojnë, flasin të dhënat. Zbuloni parametrat teknikë që i bëjnë valvulat tona zgjedhjen përfundimtare për megaprojekte.",
  "Entwickelt für dauerhafte Hochdruckanwendungen jenseits der Norm. Die Wandstärken und Gewindekonstruktionen sind so massiv ausgelegt, dass sie selbst bei extremen Druckspitzen und Wasserschlägen nicht im Geringsten nachgeben. Ein monolithischer Block der Sicherheit.": "Të zhvilluara për aplikime të vazhdueshme të presionit të lartë përtej normës. Trashësia e mureve dhe strukturat e filetimit janë aq masive sa nuk dorëzohen aspak edhe gjatë pikave ekstreme të presionit dhe goditjeve të ujit. Një bllok monolit i sigurisë.",
  "Thermische Souveränität": "Sovranitet termik",
  "Von eisiger Kälte bis hin zu kochenden Vorlauftemperaturen. Das High End-Material behält seine volle Elastizität, versprödet nicht und widersteht thermischer Ausdehnung extrem effektiv.": "Nga i ftohti i akullt deri tek temperaturat përvëluese të rrjedhës. Materiali i lartë e ruan plotësisht elasticitetin e tij, nuk bëhet i brishtë dhe i reziston zgjerimit termik jashtëzakonisht efektivisht.",
  "Korrosion ist ein Konzept aus der Vergangenheit. Unsere Armaturen sind immun gegen aggressive Bodenbeschaffenheiten, harte Wässer und chlorhaltige Desinfektionsmaßnahmen. Kein Rosten, kein Lochfraß.": "Korrozioni është një koncept i së kaluarës. Armaturat tona janë imune ndaj kushteve agresive të tokës, ujërave të forta dhe masave dezinfektuese që përmbajnë klor. Pa ndryshk, pa korrozion pikësor.",
  "Die Genese": "Gjeneza",
  "Der unerbittliche Entstehungsprozess in vier Phasen. Nur die besten Komponenten überleben diesen Stresstest.": "Procesi i pashpirt i formimit në katër faza. Vetëm komponentët më të mirë i mbijetojnë këtij testi të stresit.",
  "Materialauswahl": "Zgjedhja e materialit",
  "Präzisionsguss": "Kallëp precizioni",
  "Jedes Gehäuse wird unter extremem Druck geformt, um Lufteinschlüsse zu eliminieren. Das Resultat ist ein absolut homogener Ventilkörper von beispielloser Dichte.": "Çdo trup formohet nën presion ekstrem për të eliminuar përfshirjet e ajrit. Rezultati është një trup i valvulës absolutisht homogjen me një dendësi të pashembullt.",
  "CNC-Endbearbeitung": "Përpunim përfundimtar me CNC",
  "Die Dichtflächen werden auf Bruchteile eines Millimeters genau plangefräst. Diese mikroskopische Genauigkeit ist das Geheimnis unserer leichtgängigen und verschleißfreien Mechanik.": "Sipërfaqet e izolimit frezohen me saktësi në fraksione të milimetrit. Kjo saktësi mikroskopike është sekreti i mekanikës sonë që ecën lehtë dhe pa u konsumuar.",
  "Montage & Schweißung": "Montimi dhe Saldimi",
  "Die massiven Dichtungspakete werden eingesetzt, und das Gehäuse wird per Ultraschallschweißen hermetisch versiegelt. Manipulation oder Lockerung sind ab diesem Moment physikalisch ausgeschlossen.": "Paketat masive të izolimit vendosen, dhe trupi izolohet hermetikisht me anë të saldimit me ultratinguj. Nga ky moment, manipulimi ose lirimi janë fizikisht të pamundura.",
  "Hochdruck-Audit": "Audit i Presionit të Lartë",
  "In der finalen Phase wird jedes Ventil weit über den Nenndruck hinaus belastet. Nur Einheiten, die diesen gnadenlosen Test ohne den kleinsten Druckabfall bestehen, erhalten das K Aqua Qualitätssiegel.": "Në fazën finale, çdo valvul vihet nën ngarkesë shumë më të lartë se presioni nominal. Vetëm njësitë që kalojnë këtë test të pamëshirshëm pa rënien më të vogël të presionit marrin vulën e cilësisë së K Aqua.",
  "Systemintegrität garantiert": "Integriteti i sistemit i garantuar",
  "Sie haben die anatomische Analyse abgeschlossen. Die Konstruktion ist verifiziert. Sind Sie bereit, diese Qualität in Ihrem nächsten Großprojekt zu spezifizieren?": "Keni përfunduar analizën anatomike. Konstruksioni është i verifikuar. Jeni gati ta specifikoni këtë cilësi në megaprojektin tuaj të ardhshëm?",
  "Ventilspezifikationen prüfen": "Kontrollo specifikimet e valvulës",
  "Im Finder öffnen": "Hap në produkt-gjetësin",
  "In der Wissensbasis mehr erfahren": "Zbuloni më shumë në bazën e njohurive",
  "Entdecken Sie in detaillierten Artikeln, warum PP-R und unsere innovativen Fertigungsprozesse die Lebensdauer und Sicherheit moderner Rohrsysteme revolutionieren.": "Zbuloni në artikuj të detajuar pse PP-R dhe proceset tona inovative të prodhimit po revolucionarizojnë jetëgjatësinë dhe sigurinë e sistemeve moderne të tubave.",
  "Fittings & Formteile für Kunststoffrohrsysteme": "Fitingjet & Pjesët për sistemet e tubave plastikë",
  "Hochwertige Fittings für K-Aqua PP-R Rohre. Komplette Lösungen für sichere, homogene und dichte Verbindungen.": "Fitingje me cilësi të lartë për tubat K-Aqua PP-R. Zgjidhje të plota për lidhje të sigurta, homogjene dhe të izoluara.",
  "Der perfekte Verbund.": "Lidhja e përsosur.",
  "Ein Rohrsystem ist nur so stark wie seine Verbindungen. K-Aqua Fittings verschmelzen molekular mit dem Rohr zu einer untrennbaren, 100% dichten Einheit. Für eine Strömung ohne Widerstand.": "Një sistem tubacionesh është aq i fortë sa lidhjet e tij. Fitingjet K-Aqua bashkohen në mënyrë molekulare me tubin në një njësi të pandashme dhe 100% të izoluar. Për një rrjedhje pa pengesa.",
  "Komplettes Sortiment.": "Sortiment i plotë.",
  "Von Winkeln und T-Stücken bis hin zu Reduktionen. Ein durchdachtes System für jede architektonische Herausforderung.": "Nga bërrylat dhe T-të deri tek reduktimet. Një sistem i mirëmenduar për çdo sfidë arkitekturore.",
  "Nahtlose Integration": "Integrim pa probleme",
  "Perfekte Geometrie für turbulenzfreien Fluss": "Gjeometri perfekte për rrjedhje pa turbulenca",
  "Integrität": "Integriteti",
  "100% Leckagefreiheit durch Polydiffusion": "100% liri nga rrjedhjet nëpërmjet polidifuzionit",
  "Die innere Geometrie unserer Formteile minimiert Reibungsverluste und sorgt für eine effiziente Strömungsdynamik.": "Gjeometria e brendshme e pjesëve tona minimizon humbjet nga fërkimi dhe siguron një dinamikë efikase të rrjedhjes.",
  "Im Polydiffusionsverfahren verschmelzen Rohr und Fitting. Das Resultat ist ein homogenes Netzwerk ohne mechanische Schwachstellen.": "Në procesin e polidifuzionit, tubi dhe fitingu shkrihen. Rezultati është një rrjet homogjen pa pika të dobëta mekanike.",
  "Vielfalt": "Shumëllojshmëri",
  "Für komplexe Verteilungsnetzwerke": "Për rrjete të përbëra shpërndarjeje",
  "Umfassendes Fitting-Sortiment": "Gamë e plotë fitingjesh",
  "Ob Standard-Muffen, Kreuzstücke oder Verteiler – K-Aqua bietet für jede Installationsanforderung das passende Spritzgussteil.": "Pavarësisht nëse bëhet fjalë për mufa standarde, kryqe ose shpërndarës – K-Aqua ofron pjesën e përshtatshme me injeksion për çdo nevojë instalimi.",
  "Die evolutionäre Verbindung.": "Lidhja evolucionare.",
  "Schritt für Schritt zur perfekten Einheit. Der Schweißprozess, der jahrzehntelange Dichtigkeit garantiert.": "Hap pas hapi drejt njësisë së përsosur. Procesi i saldimit që garanton izolim për dekada me radhë.",
  "Ein sauberer, rechtwinkliger Schnitt ist die Basis. K-Aqua Rohrscheren garantieren einen gratfreien Rand für das perfekte Einführen in das Fitting.": "Një prerje e pastër, me kënd të drejtë është baza. Gërshërët e tubave K-Aqua garantojnë një buzë pa ashkla për futjen e përsosur në fiting.",
  "Molekulare Verschmelzung": "Shkrirje molekulare",
  "Rohr und Fitting werden präzise ineinandergefügt. Die Makromoleküle verbinden sich, und nach kurzer Abkühlzeit entsteht eine untrennbare, homogene Materialeinheit.": "Tubi dhe fitingu bashkohen me saktësi në njëri-tjetrin. Makromolekulat lidhen dhe pas një kohe të shkurtër ftohjeje krijohet një njësi materiali homogjen e pandashme.",
  "Volle Belastbarkeit": "Aftësi e plotë mbajtëse",
  "Bereits kurz nach dem Abkühlen kann das System dem vollen Betriebs- und Prüfdruck ausgesetzt werden.": "Fill pas ftohjes, sistemi mund t'i nënshtrohet presionit të plotë të punës dhe të testimit.",
  "Tiefenanalyse": "Analiza e Thellë",
  "Sind Sie bereit, Ihr Netzwerk mit homogenen Verbindungen zu sichern?": "A jeni gati të siguroni rrjetin tuaj me lidhje homogjene?",
  "Fittings im Katalog finden": "Gjej fitingjet në katalog",
  "K-Aqua PP-R Rohre: Trinkwasser & Industrie": "Tubat K-Aqua PP-R: Ujë i pijshëm & Industri",
  "Extrudierte PP-R und PP-RCT Rohre für höchste Ansprüche in Trinkwasser, Heizung und Klimatechnik. Langlebig, hygienisch und effizient.": "Tubat e ekstruduar PP-R dhe PP-RCT për kërkesat më të larta në ujin e pijshëm, ngrohjen dhe klimatizimin. Të qëndrueshëm, higjienikë dhe efikasë.",
  "Die absolute Basis.": "Baza absolute.",
  "Unsere extrudierten Rohrleitungen bilden das Rückgrat jeder Installation. Ob reines PP-R für sauberes Trinkwasser oder faserverstärktes PPRCT für extreme Temperaturen – wir liefern den perfekten Leitungsstrang.": "Tubat tanë të ekstruduar formojnë shtyllën kurrizore të çdo instalimi. Pavarësisht nëse është PP-R e pastër për ujë të pijshëm të pastër ose PPRCT i përforcuar me fibër për temperatura ekstreme - ne ofrojmë linjën e përsosur të tubacioneve.",
  "Verschiedene SDR-Klassen für jede Druckanforderung.": "Klasa të ndryshme SDR për çdo kërkesë presioni.",
  "Das glatte Innere des Rohrs minimiert den Reibungswiderstand und sorgt so für geringeren Energieverbrauch der Pumpen.": "Pjesa e brendshme e lëmuar e tubit minimizon rezistencën e fërkimit, duke siguruar kështu një konsum më të ulët të energjisë për pompat.",
  "Langlebigkeit": "Jetëgjatësia",
  "Garantierte Lebensdauer von über 50 Jahren": "Jetëgjatësi e garantuar mbi 50 vjet",
  "Extrusionspräzision": "Precizion i Ekstrudimit",
  "Hochpräzise Wandstärken über hunderte Meter": "Trashësi muri tepër precize për qindra metra",
  "Modernste Extrusionsanlagen und Lasermessungen während der Produktion gewährleisten engste Toleranzen und gleichbleibende Druckfestigkeit.": "Pajisjet më të avancuara të ekstrudimit dhe matjet me laser gjatë prodhimit sigurojnë tolerancat më të rrepta dhe qëndrueshmëri konstante në presion.",
  "Die Pipeline der Innovation.": "Linja e Inovacionit.",
  "Wie aus polymerem Granulat eine Hochleistungsleitung entsteht.": "Si krijohet një tub i performancës së lartë nga granula polimerike.",
  "Reinraum-Rohstoff": "Lënda e parë në dhomë të pastër",
  "Nur hochwertigstes, spezifiziertes Polypropylen-Granulat wird in unsere Silos gefüllt, um höchste Materialreinheit zu gewährleisten.": "Vetëm granula polipropileni të një cilësie të lartë, të specifikuara, mbushin silotët tanë për të garantuar pastërtinë më të madhe të materialit.",
  "Ultraschall & Laser": "Ultratinguj & Laser",
  "Online-Messung für mikrometergenaue Kontrolle": "Matje Online për kontroll të saktë mikrometrik",
  "Noch während der Extrusion überwachen Ultraschall- und Lasersysteme lückenlos Außendurchmesser und Wandstärke des heißen Rohres.": "Gjatë vetë procesit të ekstrudimit, sistemet me ultratinguj dhe laser monitorojnë në mënyrë të pandërprerë diametrin e jashtëm dhe trashësinë e murit të tubit të nxehtë.",
  "Vakuumkalibrierung": "Kalibrimi me vakuum",
  "Das Rohr durchläuft ein Vakuum-Wasserbad, in dem es definiert abkühlt und seine exakte, endgültige Form und dimensionale Stabilität erhält.": "Tubi kalon përmes një banje uji në vakuum, ku ftohet në mënyrë të përcaktuar dhe merr formën e tij ekzakte dhe përfundimtare si dhe stabilitetin dimensional.",
  "Spezialisierte Schichten": "Shtresat e specializuara",
  "Unsere Faserverbundrohre (PPRCT) erhalten in einem Co-Extrusionsverfahren eine mittlere, glasfaserverstärkte Schicht, die die Längsausdehnung bei Hitze massiv reduziert.": "Tubat tanë të përforcuar me fibër qelqi (PPRCT) marrin në një proces ko-ekstrudimi një shtresë të mesme, të përforcuar, e cila redukton në mënyrë masive zgjerimin linear nga nxehtësia.",
  "Dimensionale Stabilität": "Stabilitet dimensional",
  "Rohrdaten durchsuchen": "Kërkoni të dhënat e tubave",
  "Übergangsfittings: PP-R zu Metall | K-Aqua": "Fitingjet Kalimtare: PP-R te Metali | K-Aqua",
  "Sichere Verbindungen zwischen Kunststoff und Metall. Hochwertige DZR-Messing-Einsätze für perfekte Integration in bestehende Systeme.": "Lidhje të sigurta ndërmjet plastikës dhe metalit. Shtojca prej tunxhi DZR të cilësisë së lartë për një integrim të përsosur në sistemet ekzistuese.",
  "Brückenköpfe aus Messing.": "Koka ure prej tunxhi.",
  "Dort, wo Kunststoff auf Metall trifft, darf es keine Schwachstellen geben. Unsere Übergangsfittings mit verdrehsicheren Messingeinsätzen bilden die perfekte Schnittstelle.": "Atje ku plastika takohet me metalin, nuk duhet të ketë asnjë pikë të dobët. Fitingjet tona kalimtare me shtojca tunxhi rezistente ndaj përdredhjes formojnë urën e përsosur.",
  "Verdrehsicher": "Të sigurt kundër përdredhjes",
  "Gegen massive Drehmomente geschützt": "Të mbrojtur kundër momenteve masive rrotulluese",
  "Korrosionsfrei": "Pa korrozion",
  "Das tief eingebettete DZR-Messingprofil trotzt den Hebelkräften großer Rohrzangen und verhindert ein Lösen der Metall-Kunststoff-Verbindung.": "Profili thellësisht i rrënjosur i tunxhit DZR u reziston forcave levë të darëve të mëdha të tubave dhe pengon lirimin e lidhjes metal-plastikë.",
  "Übergangsfittings im Katalog": "Fitingjet kalimtare në katalog"
};

const prod = JSON.parse(fs.readFileSync('scratch/to_translate_products.json', 'utf8'));

function translate(obj) {
  if (typeof obj === 'string') {
    if (dict[obj]) {
      return dict[obj];
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => translate(item));
  }
  if (typeof obj === 'object' && obj !== null) {
    let newObj = {};
    for (let k in obj) {
      newObj[k] = translate(obj[k]);
    }
    return newObj;
  }
  return obj;
}

const translated = translate(prod);
fs.writeFileSync('scratch/products_sq.json', JSON.stringify(translated, null, 2));
