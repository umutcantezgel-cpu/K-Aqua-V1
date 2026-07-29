const fs = require('fs');
const translated = {
  "hero": {
    "eyebrow": "A K-Aqua Doktrína",
    "title1": "Német Mérnöki Munka.",
    "title2": "Kompromisszumok nélkül.",
    "desc": "Nem kötünk kompromisszumokat. Mi határozzuk meg a PP-R csőrendszerek globális szabványát. Üdvözöljük a német mérnöki tudomány epicentrumában."
  },
  "intro": {
    "title1": "MI NEMCSAK VIZET VEZETÜNK.",
    "title2": "MI IRÁNYÍTJUK AZT.",
    "desc": "Több mint 30 éve gyártunk olyan csőrendszereket, amelyek az örökkévalóságnak készültek. Nincs helye a hibáknak. Nincs helye a középszerűségnek. Csak tiszta, kérlelhetetlen precizitás, amely minden egyes idomban megnyilvánul."
  },
  "material": {
    "eyebrow": "Anyagtudomány",
    "title1": "Polypropylene Random Kopolimer.",
    "title2": "Szabadjára engedve.",
    "p1": "A PP-R Typ 3 nem egyszerűen egy műanyag. Ez egy rendkívül komplex, hőre lágyuló anyag, amelyet molekuláris szinten uralunk.",
    "p2": "Az etilén monomerek stratégiai elrendezésével a propilén láncban páratlan ütésállóságot érünk el, még mínusz fokokban is. Granulátumaink kizárólag a nyersanyaggyártók globális elitjétől származnak. Minden egyes tételt differenciális pásztázó kalorimetriával (DSC) és folyásmutató (MFR) tesztekkel elemzünk. Ami akár egy ezrelékkel is eltér a specifikációinktól, azt könyörtelenül kiselejtezzük.",
    "items": [
      {
        "title": "Extrém Moláris Tömeg",
        "desc": "Garantálja a maximális kúszásszilárdságot és az abszolút ellenállást a feszültségkorróziós repedésekkel szemben extrém nyomások alatt."
      },
      {
        "title": "Kristályos Optimalizáció",
        "desc": "A tökéletes termodinamikai egyensúly. Maximális rugalmasság a radikális telepítési feltételekhez, egyidejű axiális merevséggel."
      }
    ]
  },
  "timeline": {
    "title": "A Tökéletesség Evolúciója",
    "desc": "Feltartóztathatatlan felemelkedés a globális piaci erőhöz. Minden évtized egy mérföldkő a technológiai fölényben.",
    "items": [
      {
        "year": "1990",
        "title": "A Tolerancianélküliség Eredete",
        "text": "Ahol mások kompromisszumokat kötöttek, mi meghúztunk egy piros vonalat. A K-Aqua alapítása egyetlen, megrendíthetetlen elven alapult: Hibátlan csőrendszerek. Első extrudereink olyan precizitással működtek, ami sokkolta a piacot."
      },
      {
        "year": "2005",
        "title": "A Polipropilén Forradalom",
        "text": "Nem voltunk hajlandók elfogadni a status quót. A saját fejlesztésű PP-R keverékünk bevezetésével újraértelmeztük a termikus stabilitást. Míg a versenytársak termékei nyomás alatt összeomlottak, a mi rendszereink sztoikusan sértetlenek maradtak. A polimer kémia diadala."
      },
      {
        "year": "2015",
        "title": "Az Építészeti Szimbiózis",
        "text": "Dubai felhőkarcolóitól a Ruhr-vidék ipari létesítményeiig: A K-Aqua a pusztíthatatlan infrastruktúra szinonimájává vált. PPRCT szálkompozit csöveink forradalmasították a magasépítést. Kisebb hőtágulás, nagyobb átfolyás, abszolút dominancia."
      },
      {
        "year": "2026",
        "title": "A Molekuláris Diktatúra",
        "text": "Ma már a gyártás minden aspektusát mi irányítjuk. A nyers granulátum kiválasztásától a végső ellenőrzésig rendszereink diktatórikus minőségellenőrzés alatt állnak. Az eredmény? Egy garantált élettartam, amely generációkat túlél."
      }
    ]
  }
};

const lines = JSON.stringify(translated, null, 2).split('\n');
const inner = lines.slice(1, -1).map(l => '  ' + l).join('\n');
fs.writeFileSync('replace_about.txt', ',' + '\n' + inner);
