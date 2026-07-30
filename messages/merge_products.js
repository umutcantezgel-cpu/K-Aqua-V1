const fs = require('fs');
const et = JSON.parse(fs.readFileSync('et.json'));
const de = JSON.parse(fs.readFileSync('de.json'));
const et_temp = JSON.parse('{' + fs.readFileSync('temp_products_et.json') + '}');

function mergeDeep(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      mergeDeep(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
}

// Revert to German structure
et.products = JSON.parse(JSON.stringify(de.products));

// Apply translated chunks
mergeDeep(et.products, et_temp.products);

// And the ones I fixed in fix_products_1, 2, 3, 4
et.products.narrative = {
  "sizeRange": "Seda komponenti toodetakse laias nimimõõtude vahemikus, alates kompaktsest {minSize} mm kuni märkimisväärse {maxSize} mm-ni, mis tagab maksimaalse mitmekülgsuse kõige erinevamates paigaldusstsenaariumites.",
  "sizeSpecific": "See komponent on täpselt kavandatud spetsiifilise nimimõõdu {minSize} mm jaoks, pakkudes sihipärast jõudlust spetsialiseeritud torustikuarhitektuuridele.",
  "weights": "Materjali efektiivsus on optimeeritud kogu tootevalikus, kusjuures ühiku kaalud varieeruvad sõltuvalt valitud mõõtmest alates {minWeight} kg kuni {maxWeight} kg.",
  "packaging": "Logistikat optimeeritakse standardiseeritud pakkeüksuste abil, mis on loodud turvaliseks ülemaailmseks transpordiks ja tõhusaks käsitsemiseks ehitusplatsil.",
  "rowCount": "Meie tehniline portfell pakub seda konfiguratsiooni {count} kõrgelt spetsialiseeritud mõõtmevariandina, mis on täpselt skaleeritud, et vastata kaasaegsete vedelikutranspordisüsteemide hüdraulilistele ja mehaanilistele nõuetele.",
  "intro": "Toode {title} on K-Aqua kõrgjõudlusega vedelikuhalduse lahenduste nurgakivi. Ametlikult kataloogitud artiklinumbritega {codes}, läbib iga variant enne tarnimist ranged kvaliteedi tagamise protokollid meie Saksamaa tootmisüksustes.",
  "outro": "Kasutades täiustatud polümeeride töötlemise tehnikaid, tagab {title} geomeetriline täpsus optimaalsed vooluomadused, minimeerib rõhukadusid ja välistab täielikult katlakivi või korrosiooni riski kogu tööea jooksul. See kompromissitu pühendumine materjaliteadusele tagab, et iga ühendus säilitab absoluutse terviklikkuse ka äärmuslike termiliste ja rõhu kõikumiste korral. Olenemata sellest, kas seda kasutatakse elamutes, kriitilistes tervishoiuasutustes või nõudlikes tööstuslikes töötlemisjaamades, pakub see toode hooldusvaba usaldusväärsust, millele insenerid ja paigaldajad võivad pimesi loota."
};
et.products.uniqueProductContext = "Toode {title} on K-Aqua {category} tootevaliku oluline osa. See on loodud maksimaalse vastupidavuse ja sujuva integreerimise tagamiseks ning vastab kõrgeimatele rahvusvahelistele standarditele kaasaegsete torustiku- ja sanitaartehniliste rakenduste jaoks. Saate selle konkreetse toote tuvastada ja tellida artiklinumbri(te) abil: {codes}. Lisadokumentatsiooni või toe saamiseks võtke palun ühendust meie tehnilise meeskonnaga.";
et.products.heroDesc = "Avastage spetsifikatsioonid, mõõtmed ja rakendusvaldkonnad. Üksikasjaliku teabe saamiseks laadige alla tehniline andmeleht.";
et.products.articleNumbers = "Artiklinumbrid";
et.products.technicalSpecs = "Tehnilised spetsifikatsioonid";
et.products.eyebrow = "Tooted";
et.products.videoGuide = "K-Aqua videojuhend";
et.products.localAvailability = "Kohalik kättesaadavus";
et.products.localDesc = "Leidke oma piirkonna kohalikud edasimüüjad, spetsiifilised heakskiidud ja standardid.";
et.products.allMarkets = "Vaata kõiki 50+ turgu";
et.products.title1 = "PP-R/PPRCT torud ja liitmikud";
et.products.titleGrad = "Joogiveele.";
et.products.lead = "Täielik torustikusüsteem kuumale ja külmale joogiveele: alates torust kuni liitmiku ja keevitustehnoloogiani. Neli ehitusplokki, üks süsteem.";
et.products.ctaCatalog = "Tootekataloog (PDF)";
et.products.ctaVideos = "Paigaldusvideod";
et.products.sysEyebrow = "Süsteem";
et.products.sysTitle = "K-Aqua PP-R torud ja liitmikud: Neli ehitusplokki, üks süsteem.";

et.products.range = [
  {
    "t": "Torud: Mono ja mitmekihilised",
    "d": "Monokiht- ja klaaskiuga tugevdatud mitmekihilised torud klassides SDR 6, 7.4, 9, 11 ja 17. Mõõtmed 20 mm kuni 630 mm."
  },
  {
    "t": "Liitmikud ja armatuurid",
    "d": "Liitmikud mõõtmetes 20 mm kuni 315 mm, täiendatud ventiilide, keermesliidete ja üleminekudetailidega."
  },
  {
    "t": "Keevitustehnoloogia ja tööriistad",
    "d": "Lõiketööriistad, keevitusseadmed ja keevitusmasinad muhv-, põkk- ja elektrikeevitusprotsessideks."
  },
  {
    "t": "Kuum ja külm vesi",
    "d": "Mõeldud joogivee (kuum ja külm) jaoks, pakkudes suurt temperatuuri- ja rõhukindlust aastakümneteks."
  }
];

et.products.techEyebrow = "Tehnilised andmed";
et.products.techTitle = "Mõõtmed ja rõhuklassid";
et.products.techLead = "Sõltuvalt torutüübist 20 mm kuni 630 mm, liitmikud kuni 315 mm.";

et.products.bento = {
  "eyebrow": "JÕUDLUSANDMED",
  "title": "TEHNOLOOGILINE ÜLEOLEK. ANDMEPÕHINE.",
  "lead": "K-Aqua süsteemid ei ole lihtsalt torud. Need on kõrgjõudlusega vedelikuvõrgud. Välja töötatud vastavalt rangeimatele Saksa tööstusstandarditele.",
  "items": [
    {
      "title": "Termiline sulandumine",
      "desc": "Homogeensed keevisõmblused. Materjal muutub üheks. Pole liimi, pole tihendusrõngaid, mis võiksid puruneda. 100% lekkekindlus molekulaarsel tasemel."
    },
    {
      "title": "Korrosiooniimmuunsus",
      "desc": "Absoluutselt vastupidav punktkorrosiooni, rooste ja elektrokeemilise korrosiooni suhtes. Transporditav meedium jääb puhtaimasse olekusse."
    },
    {
      "title": "Voolu optimeerimine",
      "desc": "Siseseinade tehnoloogia (karedus 0,007 mm) minimaalse hõõrdeteguriga hoiab ära ladestumise ja minimeerib massiliselt rõhukadu."
    },
    {
      "title": "Rõhukindlus PN25+",
      "desc": "Kavandatud maksimaalseks koormuseks kõrghoonetes, tööstusrajatistes ja kriitilises infrastruktuuris. Loodud enam kui 50-aastaseks tõrgeteta tööks."
    }
  ]
};

fs.writeFileSync('et.json', JSON.stringify(et, null, 2) + '\n');
