const fs = require('fs');
const smallDe = JSON.parse(fs.readFileSync('small_products.json', 'utf8'));

// I'll write a skeleton for products, and then we will manually fill it with Slovak.
const skProducts = {
  "uniqueProductContext": "Produkt {title} je dôležitou súčasťou sortimentu K Aqua {category}. Bol navrhnutý pre maximálnu životnosť a bezproblémovú integráciu, pričom spĺňa najvyššie medzinárodné štandardy pre moderné potrubné a sanitárne aplikácie. Tento konkrétny produkt môžete identifikovať a objednať pomocou čísla(čísel) výrobku: {codes}. Pre ďalšiu dokumentáciu alebo podporu kontaktujte náš technický tím.",
  "heroDesc": "Objavte špecifikácie, rozmery a oblasti použitia. Pre podrobné informácie si stiahnite technický list.",
  "articleNumbers": "Čísla výrobkov",
  "technicalSpecs": "Technické špecifikácie",
  "eyebrow": "Produkty",
  "videoGuide": "K Aqua video návod",
  "localAvailability": "Miestna dostupnosť",
  "localDesc": "Nájdite lokálnych predajcov, špecifické certifikácie a normy pre váš región.",
  "allMarkets": "Zobraziť všetkých viac ako 50 trhov",
  "title1": "PP-R/PPRCT Rúry & Tvarovky pre",
  "titleGrad": "Pitnú vodu.",
  "lead": "Kompletný potrubný systém pre teplú a studenú pitnú vodu: od rúry cez tvarovku až po technológiu zvárania. Štyri komponenty, jeden systém.",
  "ctaCatalog": "Produktový katalóg (PDF)",
  "ctaVideos": "Inštalačné videá",
  "sysEyebrow": "Systém",
  "sysTitle": "K-Aqua PP-R Rúry & Tvarovky: Štyri komponenty, jeden systém.",
  "range": [
    {
      "t": "Rúry: Jednovrstvové & Viacvrstvové",
      "d": "Jednovrstvové a sklenými vláknami vystužené viacvrstvové rúry v SDR 6, 7,4, 9, 11 a 17. Rozmery od 20 mm do 630 mm."
    },
    {
      "t": "Tvarovky & Armatúry",
      "d": "Tvarovky od 20 mm do 315 mm, doplnené o ventily, skrutkové spoje a prechodové kusy."
    },
    {
      "t": "Zváracia technika & Náradie",
      "d": "Rezné nástroje, zváračky a zváracie stroje pre polyfúzne zváranie, zváranie na tupo a elektrofúzne zváranie."
    },
    {
      "t": "Teplá & Studená voda",
      "d": "Navrhnuté pre pitnú vodu (teplú aj studenú) s vysokou teplotnou a tlakovou odolnosťou počas desaťročí."
    }
  ],
  "techEyebrow": "Technické dáta",
  "techTitle": "Rozmery & Tlakové triedy",
  "techLead": "V závislosti od typu rúry od 20 mm do 630 mm, tvarovky do 315 mm.",
  "ctaFeatures": "Vlastnosti produktu (PDF)",
  "tableHead": [
    "Komponent",
    "Rozmer",
    "Tlakové triedy"
  ],
  "tableRows": [
    ["Jednovrstvové rúry", "20 – 630 mm", "SDR 6 / 7,4 / 9 / 11 / 17"],
    ["Viacvrstvové rúry (GF-vystužené)", "20 – 630 mm", "SDR 6 / 7,4 / 9 / 11 / 17"],
    ["Tvarovky", "20 – 315 mm", "kompatibilné so systémom"],
    ["Ventily & Skrutkové spoje", "závislé od systému", "-"],
    ["Zváracia technika & Náradie", "všetky rozmery", "-"]
  ],
  "labels": {
    "applicationAreas": "Oblasti použitia",
    "advantages": "Prehľad vašich výhod",
    "technicalDescription": "Technický profil & SEO",
    "noResults": "Nenašli sa žiadne produkty",
    "searchPlaceholder": "Hľadať podľa názvu alebo čísla produktu...",
    "faqTitle": "Často kladené otázky (FAQ)",
    "faqFallbackQ1": "Aké sú hlavné výhody?",
    "faqFallbackA1": "Systém ponúka extrémnu odolnosť, odolnosť proti korózii a vynikajúce hygienické vlastnosti pre pitnú vodu.",
    "faqFallbackQ2": "Je materiál ekologický?",
    "faqFallbackA2": "Áno, PPRCT je 100% recyklovateľný a v porovnaní s kovovými rúrami má veľmi nízku uhlíkovú stopu.",
    "faqFallbackQ3": "Ako prebieha inštalácia?",
    "faqFallbackA3": "Inštalácia prebieha bezpečne a bez únikov pomocou polyfúzneho zvárania.",
    "downloads": "Na stiahnutie & Dokumenty",
    "tds": "Technický list",
    "tdsDesc": "Špecifikácie & Rozmery (PDF)",
    "cert": "Certifikáty & Normy",
    "certDesc": "ISO 9001 · 14001 · 50001 (PDF)",
    "install": "Sprievodca inštaláciou",
    "installDesc": "Návod na zváranie (PDF)",
    "range": "Produktový rad",
    "rangeDesc": "Kompletný produktový rad s rozmermi (PDF)",
    "features": "Vlastnosti produktu",
    "featuresDesc": "Vlastnosti materiálu & Výhody systému (PDF)"
  },
  "specAndDim": "Špecifikácie & Rozmery",
  "certsAndNorms": "Certifikáty & Normy",
  "approved": "schválené",
  "monitoring": "monitorované",
  "certified": "certifikované",
  "quickLinks": "Rýchle odkazy",
  "calcCo2": "Vypočítať uhlíkovú stopu (CO2)",
  "backToFinder": "Späť do vyhľadávača produktov",
  "enterpriseCore": "Enterprise Core",
  "highPerformance": "Vysokovýkonné potrubné systémy",
  "highPerformanceDesc": "Pre priemyselné aplikácie, zásobovanie pitnou vodou a klimatizáciu v extrémnych podmienkach.",
  "sysPressure": "Tlak v systéme",
  "tempMax": "Max. teplota",
  "material": "Materiál",
  "norm": "Norma",
  "certification": "Certifikácia",
  "lifespan": "Životnosť",
  "fiberTech": "Technológia kompozitných vlákien",
  "fiberTechDesc": "3-vrstvová konštrukcia pre minimalizovanú lineárnu rozťažnosť a maximálnu stabilitu pri vysokých teplotách.",
  "compliance": "Zhoda s normami (Compliance)",
  "dimensions": "Rozmery",
  "globalNetwork": "Globálna sieť",
  "globalNetworkDesc": "Systémy K Aqua sa používajú vo viac ako 40 krajinách sveta.",
  "whyChoose": "Prečo je {product} tou správnou voľbou",
  "category": {
    "allProducts": "Všetky produkty",
    "openInFinder": "Otvoriť vo vyhľadávači",
    "artNA": "Výr. č. N/A",
    "viewDetails": "Zobraziť detaily produktu",
    "learnMoreKnowledge": "Objavte PP-R potrubné systémy na portáli odborných znalostí",
    "learnMoreDesc": "Ponorte sa hlbšie do technickej dokumentácie a objavte odborné články o inštalácii, udržateľnosti a testovaní našich systémov PP-R.",
    "toKnowledgeBase": "Objavte odborné články v akadémii K-Aqua"
  },
  "hero": {
    "eyebrow": "ARCHITEKTÚRA SYSTÉMU",
    "title1": "K-AQUA: ABSOLÚTNA",
    "title2": "ARCHITEKTÚRA VODY.",
    "desc": "Presnosť na molekulárnej úrovni. Navrhnuté na večnosť. Naše potrubné systémy, tvarovky a ventily definujú globálny štandard pre priemyselnú a civilnú vodnú infraštruktúru. Bez kompromisov. Len čistý výkon."
  },
  "sticky": {
    "eyebrow": "PRODUKTOVÉ SPEKTRUM",
    "title": "NEKOMPROMISNÉ INŽINIERSTVO.",
    "lead": "Každý komponent je súčasťou uzavretého, dokonalého systému. Od miesta prívodu po koncový bod kontrolujeme prietok vody, chemikálií a plynov s neúprosnou spoľahlivosťou.",
    "items": [
      {
        "title": "PPR POTRUBNÉ SYSTÉMY: NEZNIČITEĽNÉ TEPNY",
        "desc": "Systém K Aqua PPR (polypropylén random kopolymér) je chrbticou moderného transportu tekutín. Tepelne spojený do homogénneho celku, odoláva extrémnym tlakom, chemickým útokom a tepelnému namáhaniu. Systém, ktorý nepresakuje, nekoroduje a vydrží desaťročia."
      },
      {
        "title": "TVAROVKY: GEOMETRICKÁ DOKONALOSŤ",
        "desc": "Každá tvarovka K Aqua je majstrovským dielom mechaniky tekutín. Znížená kavitácia, optimalizované hrúbky stien a presné tolerancie v rozsahu mikrometrov zaručujú minimálne tlakové straty a maximálnu bezpečnosť systému. Nenechávame prietok na náhodu."
      },
      {
        "title": "VENTILY A ARMATÚRY: ABSOLÚTNA KONTROLA",
        "desc": "Priemyselná uzatváracia a regulačná technika, ktorá funguje v najtvrdších podmienkach po celom svete. Naše guľové kohúty, šikmé sedlové ventily a spätné klapky sú testované na desaťtisíce cyklov bez straty výkonu. Maximálna tesnosť pri maximálnom zaťažení."
      },
      {
        "title": "KOMPOZITNÉ RÚRY: SYNERGIA MATERIÁLOV",
        "desc": "Hliník sa stretáva s vysokovýkonným polymérom. Viacvrstvové kompozitné rúry K Aqua kombinujú mechanickú stabilitu kovu s flexibilitou a chemickou odolnosťou plastu. 100% nepriepustné pre kyslík. Minimálna lineárna rozťažnosť. Dokonalé riešenie pre zložité systémy HVAC (vykurovanie, vetranie, klimatizácia)."
      }
    ]
  },
  "bento": {
    "eyebrow": "ÚDAJE O VÝKONE",
    "title": "TECHNOLOGICKÁ PREVAHA. PODLOŽENÁ DÁTAMI.",
    "lead": "Systémy K Aqua nie sú len potrubia. Sú to vysokovýkonné siete pre kvapaliny. Vyvinuté podľa najprísnejších nemeckých priemyselných noriem.",
    "items": [
      {
        "title": "Tepelná fúzia",
        "desc": "Homogénne zvary. Materiál sa stáva jedným celkom. Žiadne lepidlo, žiadne tesniace krúžky, ktoré môžu zlyhať. 100% bezpečnosť proti úniku na molekulárnej úrovni."
      },
      {
        "title": "Odolnosť voči korózii",
        "desc": "Absolútne odolné proti jamkovej, hrdzavej a elektrochemickej korózii. Prepravované médium zostáva vo svojom najčistejšom stave."
      },
      {
        "title": "Optimalizácia prietoku",
        "desc": "Technológia hladkých stien (drsnosť 0,007 mm) s minimálnym koeficientom trenia zabraňuje usadeninám a masívne minimalizuje tlakové straty."
      },
      {
        "title": "Odolnosť voči tlaku PN25+",
        "desc": "Navrhnuté pre maximálne zaťaženie vo výškových budovách, priemyselných zariadeniach a kritickej infraštruktúre. Navrhnuté na bezproblémovú prevádzku viac ako 50 rokov."
      }
    ]
  },
  "timeline": {
    "title": "INŠTALAČNÝ PROCES. NOVO DEFINOVANÝ.",
    "desc": "Rýchlejší. Bezpečnejší. Čistejší. Náš systém drasticky znižuje čas inštalácie a zároveň minimalizuje zdroje chýb. Chronológia efektivity.",
    "items": [
      {
        "year": "FÁZA 01",
        "title": "PLÁNOVANIE A DIMENZOVANIE",
        "text": "Presný hydraulický výpočet a návrh priemerov potrubí. Zamedzenie predimenzovania vďaka vynikajúcim prietokovým vlastnostiam."
      },
      {
        "year": "FÁZA 02",
        "title": "REZANIE A PRÍPRAVA",
        "text": "Rezanie rúr za studena bez tvorby triesok. Absolútne čisté rezné hrany zaručujú dokonalú prípravu na zváranie bez rizika kontaminácie."
      },
      {
        "year": "FÁZA 03",
        "title": "POLYFÚZNE ZVÁRANIE (NÁSTAVCE)",
        "text": "Nástroj zahreje rúru a tvarovku presne na 260°C. V priebehu niekoľkých sekúnd sa vytvorí nerozoberateľné molekulárne spojenie."
      },
      {
        "year": "FÁZA 04",
        "title": "TLAKOVÁ SKÚŠKA A PREVZATIE",
        "text": "Systém je vystavený extrémnemu skúšobnému tlaku. Žiadna tolerancia na úniky. K Aqua poskytuje 100% bezpečnosť od prvej kvapky."
      },
      {
        "year": "FÁZA 05",
        "title": "PREVÁDZKA POČAS DESAŤROČÍ",
        "text": "Bezúdržbový chod. Nízka hlučnosť. Systém s neúprosnou spoľahlivosťou funguje na pozadí tých najmodernejších budov sveta."
      }
    ]
  },
  "sysLead": "Základ nášho katalógu: štyri stavebné bloky integrovaného systému. Rúry, tvarovky, armatúry a nástroje tvoria jeden systém z PP-R a PP-RCT.",
  "narrative": {
    "sizeRange": "Tento komponent sa vyrába v širokom rozsahu menovitých rozmerov od kompaktných {minSize} mm po úctyhodných {maxSize} mm, čo zaručuje maximálnu všestrannosť v najrôznejších inštalačných scenároch.",
    "sizeSpecific": "Tento komponent je presne navrhnutý pre špecifickú menovitú veľkosť {minSize} mm a poskytuje cielený výkon pre špecializované architektúry potrubí.",
    "weights": "Materiálová efektívnosť je optimalizovaná v celom sortimente, pričom jednotkové hmotnosti sa v závislosti od zvolenej dimenzie škálujú od {minWeight} kg do {maxWeight} kg.",
    "packaging": "Logistika je optimalizovaná prostredníctvom štandardizovaných baliacich jednotiek, ktoré sú navrhnuté pre bezpečnú prepravu po celom svete a efektívnu manipuláciu na stavenisku.",
    "rowCount": "Naše technické portfólio ponúka túto konfiguráciu v {count} vysoko špecializovaných rozmerových variantoch, ktoré sú presne škálované tak, aby spĺňali hydraulické a mechanické požiadavky moderných systémov na prepravu kvapalín.",
    "intro": "Produkt {title} tvorí základný kameň vysokovýkonných riešení pre prácu s kvapalinami (fluid manažment) spoločnosti K Aqua. Oficiálne katalogizovaný pod číslami výrobkov {codes}, každý variant prechádza pred dodaním prísnymi protokolmi zabezpečenia kvality v našich nemeckých výrobných závodoch.",
    "outro": "Prostredníctvom použitia pokročilých techník spracovania polymérov zaručuje geometrická presnosť {title} optimálne prietokové charakteristiky, minimalizuje tlakové straty a úplne eliminuje riziko tvorby vodného kameňa alebo korózie počas celej životnosti. Toto nekompromisné odhodlanie (posadnutosť) o vedu o materiáloch zaisťuje, že každé spojenie si zachováva absolútnu integritu aj pri extrémnych výkyvoch teploty a tlaku. Bez ohľadu na to, či sa používa vo výškových obytných budovách, kritických zdravotníckych zariadeniach alebo náročných priemyselných spracovateľských závodoch, tento produkt prináša bezúdržbovú spoľahlivosť, ktorej môžu inžinieri a inštalatéri slepo dôverovať."
  }
};

const target = JSON.parse(fs.readFileSync('./messages/sk.json', 'utf8'));
target.products = skProducts;
fs.writeFileSync('./messages/sk.json', JSON.stringify(target, null, 2));
