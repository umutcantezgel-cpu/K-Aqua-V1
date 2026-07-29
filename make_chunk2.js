const fs = require('fs');
const de = JSON.parse(fs.readFileSync('chunk2.json', 'utf8'));

const sk = {
  kontaktBlocks: {
    home: {
      kicker: "Dopyt na projekt",
      head: "Priveďte do svojho ďalšieho megaprojektu nekompromisnú kvalitu.",
      short: "Dopyt na projekt a konzultácia",
      text: "Od prvotného návrhu rozmerov až po celosvetové dodanie včas: naši inžinieri sú pripravení hovoriť o vašich špecifikáciách. Spojte sa priamo s technickým predajom vo Waldsolmse.",
      interest: "Poradenstvo",
      done: "Zástupca K Aqua sa ozve."
    },
    about: {
      kicker: "Spoznajme sa",
      head: "Hľadáte výrobného partnera, na ktorého sa môžete spoľahnúť?",
      short: "Termín na zoznámenie",
      text: "Či už ide o projektový biznis, zmluvné vzťahy na globálnej úrovni alebo strategické partnerstvo: radi sa porozprávame o tom, ako sa naše nemecké výrobné štandardy hodia k vášmu podnikaniu.",
      interest: "Poradenstvo",
      done: "Manažér predaja bude s vami v kontakte."
    },
    news: {
      kicker: "Zostaňte informovaní",
      head: "Máte otázky k inováciám od K Aqua?",
      short: "Otázka na tím odborníkov",
      text: "Čítali ste o novej technológii kompozitných vlákien alebo máte konkrétnu otázku ohľadom najnovšieho referenčného projektu? Náš inžiniersky tím je pripravený objasniť detaily.",
      interest: "Poradenstvo",
      done: "Tím odborníkov sa vám čo najskôr ozve."
    },
    produktfinder: {
      kicker: "Technická podpora",
      head: "Nenašli ste správny rozmer?",
      short: "Požiadať o podrobnosti produktu",
      text: "Vyrábame rúry a tvarovky až do veľkosti d630 a môžeme dodať aj špeciálne veľkosti pre rozsiahle stavebné projekty. Povedzte nám, aké špecifikácie vám chýbajú.",
      interest: "Poradenstvo",
      done: "Naše inžinieringové oddelenie vám doručí chýbajúce údaje."
    },
    rohrsysteme: {
      kicker: "Systémová odbornosť",
      head: "Aké riešenie vyžaduje vaša infraštruktúra?",
      short: "Projektové poradenstvo pre potrubné siete",
      text: "Pitná voda, chladenie, poľnohospodárstvo alebo morská voda: Náš tím predaja prispôsobí materiál a tlakové hodnoty priamo vášmu technickému zadaniu.",
      interest: "Potrubné systémy",
      done: "Technický predajný inžinier sa ozve pre špecifikácie projektu."
    },
    downloads: {
      kicker: "Technické dokumenty",
      head: "Potrebujete špecifické certifikáty pre váš tender?",
      short: "Vyžiadať projektové dáta",
      text: "Na portáli na stiahnutie nenájdete úplne všetko. Ak potrebujete špeciálne skúšobné správy (DVGW, SKZ), údaje pre environmentálne certifikácie (LEED/BREEAM) alebo špecifické dáta BIM, dajte nám vedieť.",
      interest: "Dáta BIM",
      done: "Naša podpora poskytne chýbajúce údaje."
    },
    academy: {
      kicker: "K-Aqua Academy",
      head: "Chcete získať certifikáciu ako schválený inštalatér?",
      short: "Dotaz na školenie a certifikáciu",
      text: "Školíme váš inštalačný tím priamo na stavenisku alebo v našom testovacom centre vo Waldsolmse v technikách zvárania podľa smerníc DVS. Vyžiadajte si voľné termíny.",
      interest: "Poradenstvo",
      done: "Academy tím vám navrhne termíny školenia."
    },
    contact: {
      kicker: "Zákaznícky servis",
      head: "Ako vám môžeme dnes pomôcť?",
      short: "Všeobecná otázka na K Aqua",
      text: "Vyberte tému vášho záujmu a zanechajte nám stručnú správu. Zabezpečíme, aby sa vám ozval ten správny kontaktný partner – bez zdržania.",
      interest: "Poradenstvo",
      done: "Správne oddelenie vám čo najskôr odpovie."
    },
    karriere: {
      kicker: "Kariéra",
      head: "Spýtajte sa neformálne na naše voľné pozície.",
      short: "Rýchle spojenie s HR",
      text: "Nie ste si istí, či sa váš profil hodí, alebo chcete pred podaním žiadosti objasniť detaily ohľadom pracovnej rutiny? Náš HR tím ľahko odpovie na vaše otázky.",
      interest: "Poradenstvo",
      done: "Oddelenie ľudských zdrojov sa ozve pre krátky zoznamovací hovor."
    },
    partnerschaft: {
      kicker: "Staňte sa distribútorom",
      head: "Rozšírte svoj sortiment o prémiové nemecké rúry.",
      short: "Zistite podmienky pre distribútorov",
      text: "Ste veľkoobchodník a hľadáte spoľahlivého dodávateľa PP-R? Povedzte nám o svojom regióne a cieľovej skupine, prediskutujeme modely exkluzivity a obchodné podmienky.",
      interest: "Poradenstvo",
      done: "Odpovie vám manažér predaja pre obchodných partnerov."
    },
    impressum: {
      kicker: "Právne informácie",
      head: "Máte otázky týkajúce sa našich firemných informácií?",
      short: "Kontakt na sekretariát K Aqua",
      text: "Tu zanechajte svoje číslo, ak máte právne alebo formálne otázky týkajúce sa našej spoločnosti.",
      interest: "Poradenstvo",
      done: "Odpovieme vám, aby sme vašu otázku vyjasnili."
    },
    datenschutz: {
      kicker: "Ochrana údajov (GDPR)",
      head: "Porozprávajte sa s naším splnomocnencom pre ochranu údajov.",
      short: "Vyžiadať informácie o údajoch",
      text: "Vaše súkromie berieme vážne. Ak chcete informácie, vymazanie alebo podrobnosti o spracovaní vašich údajov, zanechajte tu svoje kontaktné údaje.",
      interest: "Poradenstvo",
      done: "Poverenec pre ochranu údajov sa vám čoskoro ozve."
    },
    fallback: {
      kicker: "Kontakt",
      head: "Spojte sa priamo s našimi inžiniermi.",
      short: "Priame prepojenie na inžinierov",
      text: "Telefónne číslo, e-mail, jedno kliknutie na vašu tému. To je všetko, čo potrebujete, zvyšok si vyjasníme pri rozhovore.",
      interest: "Poradenstvo",
      done: "Odborný poradca vás bude kontaktovať do jedného pracovného dňa."
    }
  },
  kontaktForm: {
    phoneLabel: "Telefón",
    phonePlaceholder: "0900 123 456",
    phoneError: "Uveďte telefónne číslo",
    emailLabel: "E-mail",
    emailPlaceholder: "nakup@firma.sk",
    emailError: "Zadajte platný e-mail",
    chipsLabel: "Čo potrebujete?",
    send: "Odoslať požiadavku",
    sendError: "Odoslanie zlyhalo. Skúste to znova, alebo nám zavolajte:",
    legal: "Žiadna reklama, žiadne poskytovanie tretím stranám.",
    legalLink: "Ochrana osobných údajov",
    doneTitle: "Ďakujeme, vaša požiadavka dorazila.",
    doneTitleSlim: "Ďakujeme, žiadosť prijatá.",
    direct: "Náhli sa to? Priama voľba",
    promise: "Odpoveď do jedného pracovného dňa",
    ccAria: "Kód krajiny",
    closeAria: "Zavrieť",
    fabAria: "Kontakt",
    interests: {
      rohrsysteme: "Potrubné systémy",
      trinkwassernetze: "Siete pitnej vody",
      bim: "Dáta BIM",
      ersatzteile: "Náhradné diely",
      beratung: "Poradenstvo"
    }
  },
  referenzenPage: {
    hero: {
      eyebrow: "Priemyselné referenčné projekty",
      titlePlain: "Technológia, ktorá sa ",
      titleAccent: "osvedčí.",
      lead: "Z Waldsolmsu do sveta: systémy K-Aqua PP-R a PP-RCT fungujú už desaťročia v mrakodrapoch, nemocniciach, priemyselných zariadeniach a lodiach, a to v podmienkach, ktoré neumožňujú druhý pokus. Technológia, ktorá sa osvedčí v každom projekte.",
      cta1: "Zobraziť referenčné projekty",
      cta2: "Vyžiadať skúšobnú správu"
    },
    manifesto: {
      title: "Doktrína presnosti",
      p1: "V odvetví, kde sa únava materiálu a korózia považujú za nevyhnutné, naša výroba nastavuje iný štandard. Nepovažujeme každú rúru za obyčajný komponent, ale za výsledok aplikovanej vedy o materiáloch. Každá šarža PP-R kopolyméru, každý zvar a každá hrúbka steny prechádza testovacím procesom, ktorý radšej akceptuje odmietnutie ako prekročenie tolerancie. Toto je základný zákon <strong>K-Aqua referenčnej triedy</strong>.",
      p2: "Naše systémy fungujú v prostrediach, kde jediný bod netesnosti ohrozuje fungovanie celej nemocnice alebo výškovej budovy. Dlhodobé testy vnútorného tlaku podľa ISO 9080 nevyužívame ako laboratórnu formalitu, ale ako prísnu požiadavku pre každú uvoľnenú dimenziu: Extrapolácia na 50-ročnú prevádzkovú životnosť pri špecifikovanej teplote a úrovni tlaku: dokumentované, overiteľné, sledovateľné.",
      p3: "Zámerne sa vyhýbame neprehľadným zmesiam materiálov. Naša receptúra je zdokumentovaná v celom výrobnom reťazci, od šarže polymérov až po konečnú dĺžku rúry. Extrúzne teploty kalibrujeme presne na stupeň, optimalizujeme strednú vrstvu kompozitu vlákien proti pozdĺžnej expanzii a zaznamenávame každý jeden zvar pomocou presných parametrov procesu. Výsledkom sú systémy, ktoré bez námahy zostávajú v normovanom rozsahu pri 70°C nepretržitej prevádzky a tlaku PN20.",
      p4: "Zabezpečenie kvality pre nás nie je podriadený testovací krok, ale súčasť každej fázy výroby. Komplexným uplatňovaním certifikácie DVGW, SKZ a KIWA na všetky relevantné rozmery proaktívne odstraňujeme všetky riziká zlyhania. Systém vyrobený podľa normy DIN 8077/8078 a trikrát certifikovaný nemôže byť nikdy identifikovaný ako slabé miesto."
    },
    metrics: {
      eyebrow: "Technické kľúčové ukazovatele",
      title1: "Nekompromisné",
      title2: "parametre",
      lead: "Naše systémy nie sú reklamované, sú testované. Toto sú kľúčové údaje našej technologickej doktríny.",
      items: {
        pressure: {
          title: "Dlhodobé testovanie tlaku podľa ISO 9080",
          desc: "Každý uvoľnený rozmer prechádza testovaním vnútorného tlaku na niekoľkých teplotných úrovniach počas tisícok prevádzkových hodín s extrapoláciou na regresnú čiaru pre životnosť 50 rokov.",
          placeholder: "Regresná krivka dlhodobého testu vnútorného tlaku"
        },
        isolation: {
          title: "Bezchybná sledovateľnosť šarží",
          desc: "Každá dĺžka potrubia má číslo šarže, ktoré možno spätne vysledovať k dodávke polyméru pre bezproblémovú dokumentáciu počas akceptácie konštrukcie a pri záruke."
        },
        tolerance: {
          title: "Tolerancia hrúbky steny v mikrometroch",
          desc: "Kontinuálne meranie hrúbky steny ultrazvukom počas extrúzie udržuje každý rozmer presne v rámci tolerancií normy DIN 8077/8078."
        },
        network: {
          title: "Globálna sieť predaja a servisu",
          desc: "Dodávame projekty vo viac ako 35 krajinách z Waldsolmsu a zabezpečujeme technické poradenstvo, školenia a dodávky náhradných dielov aj po kolaudácii budovy.",
          placeholder: "Exportná mapa predajnej siete K-Aqua"
        },
        welding: {
          title: "Nekompromisná celistvosť zvaru",
          desc: "Každé zváranie na tupo ohrievacím článkom sa riadi zdokumentovaným profilom čas-teplota-tlak. Náhodné skúšky ťahom a mikrofotografie potvrdzujú molekulárne spojenie potrubia a tvarovky: bez tesnení, bez slabých miest.",
          placeholder: "Mikrofotografia zvaru pre K-Aqua"
        }
      }
    },
    cta: {
      title1: "Pripravený na váš",
      title2: "ďalší projekt",
      lead: "Plánujete výstavbu mrakodrapu, priemyselného zariadenia alebo nemocnice? Naši inžinieri očakávajú vaše špecifikácie s testovanými a reálnymi údajmi namiesto marketingových sľubov.",
      btn1: "Vyžiadať skúšobné certifikáty",
      btn2: "Poslať špecifikácie"
    },
    icons: {
      pressure: "Gauge",
      isolation: "ShieldCheck",
      tolerance: "Ruler",
      network: "Globe2",
      welding: "Flame",
      manifesto: "Droplet",
      cta: "Factory"
    }
  }
};

fs.writeFileSync('chunk2_sk.json', JSON.stringify(sk, null, 2));
