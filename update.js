const fs = require('fs');
const filePath = 'messages/et.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data.resources = {
  support: {
    title: "Tehniline tugi",
    metaDesc: "Saage kasu K-Aqua tehnilisest toest. Toetame teie suurprojekte Saksa insenerikunsti, hüdraulilise disaini ja kohapealse keevitustoe abil.",
    seoText: {
      p1: "K Aqua tehniline tugi on meie ülemaailmsete taristuprojektide selgroog. Teame, et tööstuslike torusüsteemide ja PP-R suure jõudlusega torustike paigaldamisel on iga sekund arvel. Meie vedelikutehnoloogia ja polümeersüsteemide ekspertmeeskond on rahvusvahelistele peatöövõtjatele, arhitektidele ja ehitusinseneridele igal sammul abiks.",
      p2: "Alates esmasest planeerimisest ja isomeetrilisest arvutamisest kuni rõhukao arvutamise kavandamiseni ning keevitusprotsesside kohapealse järelevalveni: garanteerime veatu paigalduse. Meie polüpropüleenist juhusliku kopolümeeri (PP-R) süsteemid nõuavad kõrgeimat käsitöö täpsust. Seetõttu pakub meie Akadeemia pidevaid koolitusi, samal ajal kui tugi sekkub keerukate termiliste joonpaisumiste või spetsiifiliste voolurõhunõuete korral.",
      p3: "Kasutades uusimaid diagnostikavahendeid ja prognoosivaid hooldusalgoritme, vähendame seisakuid absoluutse miinimumini. Olenemata sellest, kas tegemist on külmaveesüsteemidega kõrbepiirkondades, ülipuhaste tööstusrajatiste või küttevõrkudega arktilistes tsoonides: K Aqua tugitaristu tagab teie investeeringu sujuva toimimise ja kompromissitu pikaealisuse."
    },
    sticky: {
      items: [
        { title: "Ennetav süsteemi monitooring", desc: "Meie algoritmid analüüsivad pidevalt kõrvalekaldeid infrastruktuuris. Enne kriitilise seisundi saavutamist sekkub meie 3. taseme meeskond. Nulltolerants viivitustele. Nulltolerants riketele. Tegutseme enne, kui viga tekib." },
        { title: "Militaarsed reageerimisajad", desc: "SLA ei ole meile suunis, vaid füüsikaline seadus. Kriitiliste juhtumite korral garanteerime esmase reageerimise millisekundites ja kohese eskaleerimise pühendunud vaneminseneridele. Ei mingeid ootejärjekordi, vaid kohene tegutsemine." },
        { title: "Arhitektuuri auditid", desc: "Teie süsteeme testitakse vastavalt Saksa insenerikunsti rangeimatele standarditele. Skaleeritavust, liiasust ja tõrkekindlust kontrollitakse halastamatute koormustestidega. Nõrkused kõrvaldatakse, mitte ei hallata." },
        { title: "Otsene ligipääs arendajatele", desc: "Unustage tavaline klienditugi. Keeruliste süsteemiintegratsioonide korral suhtlete otse meie tuumikarendajatega. Ei mingit esimese taseme filtrit, vaid toores, filtreerimata tehniline ekspertiis koheseks probleemilahenduseks lähtekoodi tasemel." }
      ],
      eyebrow: "Eskalatsiooniprotokollid",
      title: "Suveräänsus kriisis",
      lead: "Kuidas me säilitame süsteemi terviklikkuse äärmuslikes koormustingimustes."
    },
    timeline: {
      items: [
        { year: "T-0:00", title: "Kõrvalekallete tuvastamine", text: "Automatiseeritud süsteemid tuvastavad andmevoos mikrokõrvalekaldeid ammu enne nähtavat riket." },
        { year: "T+0:02", title: "Diagnostiline triaaž", text: "AI-põhine logianalüüs isoleerib veavektori. Määramine täpselt sobivale spetsialistide klastrile." },
        { year: "T+0:15", title: "Sekkumine", text: "Kiirparanduste paigaldamine või liikluse automaatne ümbersuunamine liiastele kõrge käideldavusega sõlmedele." },
        { year: "T+1:00", title: "Algpõhjuse analüüs", text: "Juhtumi kohtuekspertiisiline uurimine. Tuumikarhitektuuri muutmine püsivaks ennetamiseks." },
        { year: "T+4:00", title: "Surmajärgne (Post-Mortem) protokoll", text: "Üksikasjalik tehniline aruanne krüptograafilise allkirjaga absoluutse läbipaistvuse ja auditi turvalisuse tagamiseks." }
      ],
      title: "Hädaolukord: Sekkumise kroonika",
      desc: "Iga sekund loeb. Meie standardiseeritud protseduur kriitilise süsteemianomaalia korral. Külmalt arvestatud. Halastamatult teostatud."
    },
    hero: {
      eyebrow: "Tehniline tugi",
      title1: "Tugi, mis",
      title2: "mõtleb kaasa.",
      desc: "Alates torude paigutusest kuni hoone vastuvõtmiseni: meie tehniline tugi on planeerijatele ja paigaldajatele abiks PP-R projekti igas etapis, olles otseliinil inseneridega, kes süsteemi arendasid. Tugi, mis mõtleb kaasa, alates planeerimisest kuni kasutuselevõtuni.",
      btnPrimary: "Esita projektipäring",
      btnGhost: "Vaata teenuseid"
    },
    intro: {
      title1: "Tugi ei ole kõnekeskus.",
      title2: "See on inseneride meeskond.",
      p1: "Me ei pea tehnilist tuge allutatud teenuseks, vaid iga projekti lahutamatuks osaks. Kui ehitusplatsil on keevisõmblus ebaselge või survekatse ei vasta ootustele, on iga tund arvel.",
      p2: "Meie insenerid tunnevad iga partiid, iga standardit ja meie süsteemide iga töötlemisjuhist omast käest. Nad kontrollivad isomeetriat, arvutavad ümber rõhukadusid ja on kasutuselevõtmisel otse toru juures.",
      p3: "See on Saksa insenerikunsti standard, mida rakendatakse reaalsetel ehitusplatsidel, mitte serveririiulitel."
    },
    bento: {
      eyebrow: "Teenused lühidalt",
      title: "Tugi kogu projekti vältel",
      lead: "Alates esialgsest planeerimisest kuni jooksva hoolduseni: meie meeskond saadab teie PP-R süsteemi igas etapis.",
      items: [
        { title: "Hüdrauliline disain ja isomeetria", desc: "Kontrollime teie planeerimisdokumente, arvutame ümber rõhukaod ja mõõtmed ning esitame enne ehituse algust usaldusväärse materjalide loendi." },
        { title: "Keevitustehniline tugi", desc: "Meie tehnikud on abiks muhv- ja küttekeha põkk-keevitusel kohapeal, kontrollivad protsessi parameetreid ja koolitavad vajadusel teie paigaldusmeeskonda otse ehitusplatsil." },
        { title: "Survetest ja vastuvõtmine", desc: "Aitame teostada ja dokumenteerida surveproovi vastavalt DIN 1988 nõuetele ja esitame hoone vastuvõtmiseks vajalikud katseprotokollid." },
        { title: "Varuosade ja tarvikute teenindus", desc: "Kiire liitmike, ventiilide ja originaaltarvikute kohaletoimetamine, isegi olemasolevatele süsteemidele ja vanematele K-Aqua partiidele." },
        { title: "Kaugdiagnostika ja kohapealne tugi", desc: "Töötlemist puudutavate ebaselgete küsimuste või testimistulemuste korral helistab meie tehniline tugi lühikese etteteatamisega tagasi, kaasates vajadusel kohapealset eksperti." }
      ]
    },
    metrics: {
      badge: "Usaldusväärsus numbrites",
      title1: "Testitud",
      title2: "Töökindlus.",
      p1: "Töötame vastavalt Saksa insenerikunsti põhimõtetele: see, mida me tarnime, peab vastu pidama, kõikides ehitusplatsitingimustes.",
      p2: "Iga K-Aqua süsteem on DVGW, SKZ ja KIWA sertifikaadiga. Iga partii on jälgitav, iga keevisõmblus dokumenteeritav.",
      items: [
        "Vastus tehnilistele päringutele ühe tööpäeva jooksul",
        "Üle 50 aasta dokumenteeritud süsteemi eluiga nõuetekohasel paigaldamisel",
        "Otseliin tehnilisse müüki ilma ootejärjekorrata",
        "Koolitused ja sertifitseerimised K-Aqua Akadeemia kaudu"
      ]
    },
    cta: {
      title1: "Valmis oma",
      title2: "järgmiseks",
      title3: "projektiks?",
      desc: "Laske oma projekti toetada inseneridel, kes mitte ainult ei müü PP-R süsteeme, vaid arendavad ja toodavad neid ise.",
      btnPrimary: "Alusta päringut",
      btnGhost: "Võta ekspertidega ühendust"
    },
    metaTitle: "PP-R torusüsteemide tehniline tugi ja teenindus"
  },
  downloads: {
    title: "Allalaadimised",
    metaDesc: "K Aqua Allalaadimised: Kompromissitu ohutus läbi Saksa insenerikunsti globaalsetele suurprojektidele. Laadige brošüürid ja andmelehed kohe alla.",
    cta: {
      title: "Kvaliteet, mida võite pimesi usaldada.",
      desc: "Laadige alla meie ametlikud sertifikaadid või rääkige otse meie insenerimeeskonnaga oma järgmise suurprojekti spetsifikatsioonidest.",
      btn: "Hinda projekti"
    },
    meta: {
      title: "Allalaadimised | K Aqua",
      desc: "K Aqua Allalaadimised: Kompromissitu ohutus läbi Saksa insenerikunsti globaalsetele suurprojektidele. Laadige brošüürid ja andmelehed kohe alla."
    },
    hero: {
      eyebrow: "K Aqua Ressursid",
      title1: "Allalaadimised.",
      title2: "Projekteeritud Saksamaal.",
      desc: "See moodul pakub kompromissitut turvalisust maailma kõige nõudlikumatele projektidele. Toodetud vastavalt rangeimatele tööstusstandarditele, et kesta põlvkondi. Seal, kus materjali purunemine pole valik, algavad meie spetsifikatsioonid.",
      cta1: "Küsi projekti kohta",
      cta2: "Mine dokumentide juurde"
    },
    timeline: {
      title: "Täpsuse evolutsioon.",
      desc: "Kuidas oleme torustikusüsteemide standardeid 30 aastat ümber defineerinud.",
      items: [
        { year: "1995", title: "Esimene tehniline dokumentatsioon", text: "Plasttorude ekstrusiooni pioneerina määratlesime Saksamaal esimesed PP-R torusüsteemide standardid. Meie spetsifikatsioonidest sai tööstusharu plaan." },
        { year: "2008", title: "ISO testimine ja globaalsed normid", text: "Rahvusvahelise laienemisega kohandati meie tehnilisi andmelehti ülemaailmsete standarditega, alati eeldusega: Saksa standard on absoluutne lähtepunkt, ilma eranditeta." },
        { year: "2015", title: "BIM ja digitaalsed kaksikud", text: "Kõrgtäpsete ehitusinfo mudelite (BIM) andmete tutvustamine. Miljardiprojekte planeeritakse nüüd virtuaalselt K Aqua süsteemidega enne, kui reaalsuses lüüakse esimene labidas maasse." },
        { year: "2026", title: "Reaalajas andmed ja ennustav analüütika", text: "Meie tänased kataloogid ja tehnilised lehed on dünaamilised andmemudelid, mis integreerivad globaalsete installatsioonide reaalajas jõudlusnäitajaid. Saksa inseneriteadus digitaalajastul." }
      ]
    },
    sticky: {
      eyebrow: "Sügavad ülevaated",
      title: "Saksa insenerikunsti DNA.",
      lead: "K Aqua andmeleht on enamat kui arvude veerud. See on lubadus, et iga paigaldatud osa toimib täpselt nii, nagu insenerid on arvutanud.",
      items: [
        { title: "Meie spetsifikatsioonide anatoomia", desc: "K Aqua andmeleht ei ole pelgalt paber. See on tuhandete tundide pikkuste raskete koormustestide destilleeritud tulemus. Dokumenteerime tolerantse mikromeetri vahemikus, sest suurprojektide puhul võib ühe millimeetri hälve kaasa tuua katastroofilisi tagajärgi." },
        { title: "Materjaliteadus: PPRCT numbrites", desc: "Meie allalaadimised pakuvad põhjalikke molekulaarseid analüüse. Saate täpselt teada, miks meie PPRCT materjali kristalliline struktuur püsib stabiilsena üle 50 aasta pideval 90°C koormusel. Andmed, mis annavad ehitusinseneridele absoluutse kindluse." },
        { title: "Hüdrauliline täpsus", desc: "Voolukiirused, rõhukao tabelid, kavitatsiooni piirid. Meie dokumendid pakuvad vedelike mehaanikat akadeemilisel tasemel, mis on ette valmistatud koheseks praktiliseks kasutamiseks. Loodud pilvelõhkujatele, kus vett tuleb transportida vastu ekstreemset gravitatsiooni." },
        { title: "Testitud. Ülemaailmselt.", desc: "SKZ, DVGW, WRAS, KIWA: meie allalaadimiste jaotis on globaalsete kvaliteedimärkide varakamber. Iga sertifikaat on kirjalik tõend meie kompromissitu null-vea poliitikast." }
      ]
    },
    bento: {
      eyebrow: "Andmebaas",
      title: "Spetsifikatsioonid ilma kompromissideta.",
      lead: "Kui rahvusvahelised peatöövõtjad kavandavad miljardiprojekte, ei tugine nad lubadustele, vaid karmidele faktidele. Siit leiate tehnilised parameetrid, mis määravad meie turuliidri positsiooni.",
      items: [
        { title: "Tehnilised andmelehed", desc: "Mikromeetritäpsed mõõtmed, rõhukao tabelid ja termilise paisumise koefitsiendid. Piibel igale planeerijale." },
        { title: "Sertifikaadid ja standardid", desc: "Kirjalik tõestus meie nulltolerantsist vigade suhtes. Dokumenteeritud ohutus vastavalt ISO, DVGW, SKZ jt nõuetele." },
        { title: "BIM ja CAD mudelid", desc: "Meie torusüsteemide ülitäpsed digitaalsed kaksikud sujuvaks integreerimiseks Revitisse ja ArchiCADi." },
        { title: "Tootekataloogid 2026", desc: "Kogu K Aqua portfell enam kui 500 leheküljel. Alates 20 mm torust kuni 500 mm tööstusventiilini, täielikult dokumenteeritud." }
      ]
    },
    methodology: {
      subtitle: "K Aqua metodoloogia",
      title: "Miks on meie andmed puutumatud.",
      p1: "Ehitustööstuses saavad vead sageli nähtavaks alles aastaid pärast valmimist. Kui torustikusüsteem ebaõnnestub 50-korruselise pilvelõhkuja seintes, ulatub kahjusumma miljonitesse.",
      p2: "Just seetõttu teostame oma süsteemidele ekstreemseid vananemisteste. Simuleerime oma kõrgsurvelaborites 50-aastast pidevat koormust. Tulemused voolavad otse meie tehnilistesse dokumentidesse.",
      card1: { title: "99.9%", desc: "Mõõtmete täpsus ekstrusioonil, mis on dokumenteeritud igas partiis." },
      card2: { title: "0 viga", desc: "Tolerants meie rahvusvahelistes testisertifikaatides." }
    },
    files: {
      eyebrow: "Otsene juurdepääs",
      title: "Olulised allalaadimised.",
      lead: "Laadige otse alla olulisemad spetsifikatsioonid.",
      items: [
        { title: "Peakataloog 2026", type: "PDF, 42 MB" },
        { title: "PPRCT tehnilised spetsifikatsioonid", type: "PDF, 12 MB" },
        { title: "Rõhukao tabelid", type: "XLSX, 2 MB" },
        { title: "BIM/Revit raamatukogu", type: "ZIP, 850 MB" },
        { title: "SKZ sertifikaat (GER)", type: "PDF, 1 MB" },
        { title: "DVGW joogivee luba", type: "PDF, 1.5 MB" }
      ]
    }
  },
  bim: {
    title: "BIM andmed",
    metaDesc: "K Aqua BIM andmed: Kompromissitu ohutus läbi Saksa insenerikunsti globaalsetele suurprojektidele. Hankige juurdepääs meie BIM-andmebaasile.",
    sticky: {
      items: [
        { title: "Maksimaalne andmesügavus (LOI 500)", desc: "Meie BIM-mudelid pakuvad mitte ainult ülitäpset geomeetrilist esitust (LOD), vaid eelkõige ületamatut infosügavust (LOI). Iga toru, iga liitmik ja iga klapp sisaldab kõiki kriitilisi metaandmeid: materjali spetsifikatsioonid, surveklassid, termilise paisumise koefitsiendid ja täpsed tootenumbrit automatiseeritud pakkumiste tegemiseks." },
        { title: "Kokkupõrkevaba planeerimine", desc: "Miljardiprojektides pole kokkupõrgete tuvastamine läbiräägitav. Meie natiivsed Revit- ja IFC-failid garanteerivad sujuva integreerimise teie Navisworks'i või Solibri'ga. Täpsed välisläbimõõdud, sealhulgas keevisõmbluste tolerantsid, hoiavad ära kulukad üllatused ehitusplatsil." },
        { title: "Parameetriline intelligentsus", desc: "K Aqua BIM perekonnad on täielikult parameetrilised. Need kohanduvad dünaamiliselt torude marsruutimise, kaldete ja mõõtmetega. Integreeritud automaatne marsruutimine valib automaatselt õiged reduktorid ja paindenurgad vastavalt DIN EN ISO 15874 rangetele juhistele." },
        { title: "Elutsükli ja rajatiste haldus", desc: "Digitaalne kaksik ei lõpe hoone üleandmisega. Meie BIM-objektid ühilduvad COBiega ning annavad hoonehaldajatele (Facility Management) kõik vajalikud hooldusintervallid, sertifikaadid ja tööandmed, et tagada üle 50-aastane turvaline elutsükkel." }
      ],
      eyebrow: "Töövoo tipptase",
      title: "Digitaalsed kaksikud täiuslikkuseni.",
      lead: "Sissevaade andmesügavusse, mis kõrvaldab erinevuse planeerimise ja reaalsuse vahel."
    },
    timeline: {
      items: [
        { year: "1. faas", title: "Kontseptsioon ja ehitustehniline planeerimine (TGA)", text: "K Aqua baasgeomeetriate integreerimine varajasse disaini. Kiire koguste arvutamine ja esialgne kokkupõrkekontroll marsruudi kontseptsiooni jaoks TGA üldplaanis." },
        { year: "2. faas", title: "Rakendusplaneerimine", text: "Üleminek tasemele LOI 400. Täpsed spetsifikatsioonid, voolukiirused ja rõhukao arvutused liiguvad otse hoone hüdraulilisse võrguarvutusse." },
        { year: "3. faas", title: "Pakkumine ja hange", text: "Veatute materjalide nimekirjade (BOM) automatiseeritud loomine otse mudelist. Igale liitmikule on lisatud K Aqua tootenumber ja VDI 3805 andmed." },
        { year: "4. faas", title: "Eelvalmistamine ja paigaldus", text: "Isomeetriliste jooniste eksportimine tööstuslikuks kokkupanekuks. Millimeetritäpsed poolijoonised minimeerivad keevitustööd ehitusplatsil absoluutse miinimumini." },
        { year: "5. faas", title: "Tegelik (As-Built) olukord ja käitamine", text: "As-Built mudeli üleandmine. Digitaalne kaksik on rajatiste halduse tõe ainus allikas kogu hoone elutsükli vältel." }
      ],
      title: "K Aqua BIM andmete elutsükkel",
      desc: "Alates esimesest visandist kuni aastakümnetepikkuse toimimiseni. Meie andmed saadavad teie projekti igas etapis."
    },
    hero: {
      desc: "See moodul pakub kompromissitut turvalisust maailma kõige nõudlikumatele projektidele. Toodetud vastavalt rangeimatele tööstusstandarditele, et kesta põlvkondi. Laadige alla digitaalne kaksik, kus materjali ebaõnnestumine pole valik.",
      btnPrimary: "BIM Raamatukogu (Revit/IFC)",
      btnGhost: "Küsi BIM konsultatsiooni"
    },
    intro: {
      title1: "Meie torusüsteemide DNA.",
      title2: "Nüüd pilves.",
      p1: "Me ei mõista BIM-i lihtsalt kui 3D-joonist. K Aqua jaoks on Building Information Modeling meie kompromissitu tootmistäpsuse ülekandmine digitaalsesse ruumi. Kui rahvusvahelised peatöövõtjad kavandavad pilvelõhkujaid, andmekeskusi või kõrge turvalisusega laboreid, ei vaja nad hinnangulisi väärtusi, vaid nad vajavad andmetena füüsilist reaalsust.",
      p2: "Meie andmekogumid on aastakümnete pikkuse Saksa insenerikunsti tulemus. Iga seina paksus, iga vedeliku dünaamika ja iga soojuslik omadus on meie inseneride poolt kinnitatud ja natiivselt perekondadesse tõlgitud."
    },
    bento: {
      items: [
        { title: "Natiivsed Revit® perekonnad", desc: "Konversioonikadusid ei ole. Programmeeritud otse .rfa ja .rvt failidena kõrgeima jõudluse ja algsete marsruutimiseelistuste tagamiseks." },
        { title: "VDI 3805 ühilduvus", desc: "Standardiseeritud tooteandmed sujuvaks andmevahetuseks kogu TGA ahelas." },
        { title: "IFC4 testimine", desc: "Maksimaalne koostalitlusvõime läbi avatud BIM standardite (OpenBIM). Garanteeritud loetavus ArchiCADis, Allplanis ja Vectorworks'is." },
        { title: "Täpsed termilised andmed", desc: "Integreeritud arvutusmudelid pikipaisumise, soojusjuhtivuse (0,24 W/mK) ja torude hõõrderõhu languse jaoks." }
      ]
    },
    cta: {
      title: "Laadige alla K Aqua BIM pakett.",
      desc: "Täielik juurdepääs kõigile natiivsetele Revit perekondadele, IFC failidele ja VDI 3805 andmekogumitele. Planeerijatele ja inseneridele tasuta.",
      btnPrimary: "Mine allalaadimiskeskusesse",
      btnOutline: "Võta ühendust BIM-i juhiga"
    }
  },
  common: {
    eyebrow: "K Aqua RESSURSS",
    subtitle: "Projekteeritud Saksamaal.",
    lead: "See moodul pakub kompromissitut turvalisust maailma kõige nõudlikumatele projektidele. Toodetud vastavalt rangeimatele tööstusstandarditele, et kesta põlvkondi. Seal, kus materjali ebaõnnestumine ei ole valik.",
    btnProject: "Projektipäring",
    btnData: "Tehnilised andmed",
    valEyebrow: "Saksa insenerikunst",
    valTitle: "Ohutus ilma kompromissideta.",
    valLead: "Kui rahvusvahelised peatöövõtjad kavandavad miljardiprojekte, ei tugine nad lubadustele, vaid karmidele faktidele.",
    valCardTitle: "Väärtuspakkumine 0{item}",
    valCardDesc: "Iga element väljub meie tehasest absoluutse null-vea tolerantsiga. Täppistoodetud vastavalt rangeimatele Saksamaa standarditele 100% hooldusvabaks kasutamiseks.",
    authTitle: "Tööstuslik autoriteet {module} valdkonnas.",
    authP1: "Aastakümneid oleme ühendanud käsitööuhkuse ja kaasaegseima, kõrgelt automatiseeritud tootmistehnoloogia oma põhitehases Saksamaa südames.",
    authP2: "Kasutusel maailma karmimates kõrbes ja äärmuslikes kliimatingimustes, tõestab meie materjal end iga päev uuesti. Seame standardi, mida ülejäänud maailm järgib.",
    list1: "Testitud vastavalt DIN EN ISO 15874",
    list2: "Eluiga > 50 aastat",
    list3: "Hooldus- ja korrosioonivaba",
    placeholder: "Visuaalse vara kohatäide",
    ctaTitle: "Valmis kompromissituks kvaliteediks?",
    ctaLead: "Rääkige meie insenerimeeskonnaga oma järgmisest suurprojektist."
  },
  ausschreibungstexte: {
    meta: {
      title: "Ametlikud hanketekstid PP-R torusüsteemidele",
      desc: "Laadige alla üksikasjalikud K-Aqua hanketekstid. Pakume teie globaalsetele suurprojektidele kompromissitut ohutust läbi Saksa insenerikunsti."
    },
    timeline: {
      items: [
        { year: "1. faas: Parameetrite seadmine", title: "Täiuslikkuse definitsioon.", text: "Protsess algab TGA planeerimisest. Nimiläbimõõtude, surveklasside (PN) ja SDR klasside täpne määratlus kuuma ja külma vee jaoks. Me ei jäta halle alasid. Iga liitmik, iga klamber, iga muhv salvestatakse matemaatiliselt täpselt." },
        { year: "2. faas: Hanked", title: "Esitamine ilma kompromissideta.", text: "Meie tekstide teralise ja kristallselge struktuuri kaudu muutuvad pakkumised tõeliselt võrreldavaks. Alamkvaliteedilistest materjalidest või varjatud tegematajätmistest tingitud dumpinghinnad torkavad kohe silma. Nisu eraldatakse aganatest." },
        { year: "3. faas: Teostamine", title: "Ehitusplatsi plaan.", text: "Hanketekstid on siduv juriidiline reeglistik objektijuhile ja paigaldajatele. Iga keevisõmblus ja kinnitus peab vastama määratud DVS juhistele. Kõrvalekalded muudetakse võimatuks." },
        { year: "4. faas: Elutsükkel", title: "50+ aastat absoluutset hooldusvabadust.", text: "Veatu spetsifikatsiooni tulemuseks on süsteem, mis jääb aastakümneteks veavabaks. Maksimaalne vastupidavus korrosioonile, inkrustatsioonile ja keemilisele lagunemisele. Põlvkondadeülene ohutus, arendatud Saksamaal." }
      ],
      title: "Hankest igavikuni.",
      desc: "K Aqua hanketekst ei ole lihtsalt dokument. See on ehitatud reaalsuse lähtekood. See määratleb, kaitseb ja dikteerib hoone kogu elutsükli, alates esimesest visandist kuni aastakümnetepikkuse kasutuseni."
    },
    hero: {
      eyebrow: "K Aqua Ressursikeskus",
      title1: "Hanketekstid.",
      title2: "Projekteeritud Saksamaal.",
      desc: "Arhitektuur saab alguse mõttest. Inseneriteadus algab spetsifikatsioonist. Meie K-Aqua hanketekstid on õiguslikult siduv alus PP-R torusüsteemidele ilma kompromissideta. Millimeetritäpsed. VOB-iga ühilduvad. Vaieldamatud.",
      cta1: "Laadi alla GAEB tekstid",
      cta2: "Küsige planeerimisnõustamist"
    },
    manifesto: {
      title1: "Mitmõttelisuse lõpp.",
      title2: "Absoluutse kontrolli algus.",
      p1: "Hoonearhitektuuris ja tööstustehaste inseneriteaduses on ebamäärased formulatsioonid suurim eksistentsiaalne oht. Üksik ebatäpne sõna tööde kirjelduses võib tähendada erinevust aastakümneid kestva hooldusvaba süsteemi ja katastroofiliste veekahjustuste vahel 50-korruselises pilvelõhkujas.",
      p2: "Sellepärast me ei kirjuta hanketekste niisama, me <span class=\"text-foreground font-medium font-semibold\">projekteerime</span> neid. Nagu iga K Aqua torutükk, arendatakse ka meie digitaalsed andmepaketid Saksamaal ning neid testitakse ja kontrollitakse äärmuslikes tingimustes. Need tõlgivad füüsilise üleoleku juriidiliseks ja majanduslikuks vaieldamatuseks."
    },
    bento: {
      eyebrow: "Andmete arhitektuur",
      title: "Spetsifikatsioonid, mis kaitsevad.",
      lead: "Arendatud TGA spetsialistidele, arhitektidele ja visiooniga inseneridele, kes ei salli vigu miljardiprojektide planeerimisel.",
      items: [
        { title: "VOB/C ja DIN 18381 ühilduv", desc: "Iga üksik positsioon vastab täpselt viimastele ehitustööde hanke- ja lepingu eeskirjadele. Olete juriidiliselt absoluutselt turvalisel poolel ja minimeerite drastiliselt vastutusriski." },
        { title: "Natiivsed GAEB formaadid", desc: "XML, d81, d83. Täiuslik impordi ühilduvus ORCA, RIB iTWO, Nevarise ja kõigi tavaliste AVA süsteemide jaoks. Puuduvad süntaksivead ega lahendusvariandid." },
        { title: "Tootjaneutraalsed variandid", desc: "Avalike hangete jaoks pakume juriidiliselt turvalisi, täiesti tootjaneutraalseid kirjeldusi, mis seavad esmaklassilise standardi ilma hankereegleid rikkumata." },
        { title: "Üksikasjalik tarvikute maatriks", desc: "Komplekssest liitmikust kuni sulgeventiilini ja termodünaamilise kinnitusklambrini: kogu ökosüsteemi sujuv katvus hoiab ära kallid lisakulutused." },
        { title: "BIM-iga valmis integratsioon", desc: "Ühendage meie hanketekstid sujuvalt meie väga detailsete Revit-mudelitega, et tagada järjepidev ja kokkupõrkevaba 5D planeerimine reaalajas." }
      ]
    },
    grid: {
      title: "Teenuse positsiooni anatoomia.",
      desc: "Me ei jäta midagi juhuse hooleks. Iga teenuse positsioon on Saksa insenerikunsti meistriteos, kokku surutud teksti vormi. Siin on see, mida meie tekstid üksikasjalikult katavad:",
      items: [
        { title: "Torusüsteemid SDR 6 / SDR 7.4", desc: "PN 20. Kiudkomposiittehnoloogia koos integreeritud pikipaisumise minimeerimisega maksimaalse mõõtmete stabiilsuse tagamiseks." },
        { title: "Elektrikeevitusmuhvid", desc: "Täisautomaatne keevitusdokumentatsioon ja 100% homogeensed, püsivad ning lekkekindlad ühendused." },
        { title: "Ülemineku keermesliited", desc: "Tsingikaota premium-messing (DZR), püsivalt ja lahutamatult valatud PP-R maatriksisse." },
        { title: "Sulgeventiilid", desc: "Hooldusvabad kuul- ja kaldistmega ventiilid, voolule optimeeritud ja minimaalse surnud ruumiga leegionäride haiguse vältimiseks." },
        { title: "Jaotussüsteemid", desc: "Modulaarsed suure võimsusega kollektorid keeruliste tõusutorude ja korruste ühenduste jaoks suurtes projektides." },
        { title: "Isolatsioon vastavalt GEG-ile", desc: "Integreeritud spetsifikatsioonid soojuskao ja kondensaadi moodustumise (kastepunkti allapoole langemise) rangeks vältimiseks." },
        { title: "Tulekaitsemansetid", desc: "R90/R120 nõuetele vastavad, väga reageerivad vaheseinasüsteemid ohutuks seina ja lae läbiviiguks." },
        { title: "Süsteemi kinnitused", desc: "Täpsed fikseeritud ja liikuvate tugede spetsifikatsioonid soojusliku pikenemise kontrollitud neelamiseks." }
      ]
    },
    cta: {
      title: "Alustage spetsifikatsiooniga.",
      desc: "Juurdepääs meie täielikule ja pidevalt uuendatavale hanketekstide raamatukogule. Garanteeritult vigadeta, standarditele vastavad ja valmis kasutamiseks teie järgmises rahvusvahelises suurprojektis.",
      btn1: "Allalaadimisportaali",
      btn2: "Võtke ühendust nõustamismeeskonnaga"
    },
    deep: {
      items: [
        { title: "Absoluutne õiguskindlus (VOB/C)", desc: "Rahvusvaheliste suurprojektide planeerimisel on ebaselgus vaenlane. Üksik puuduv sõna tööde kirjelduses võib tähendada erinevust aastakümneid kestva hooldusvaba süsteemi ja katastroofilise miljonitesse ulatuva kahju vahel. Meie hanketekstid on standardiseeritud millimeetri täpsusega vastavalt VOB/C ja DIN 18381 nõuetele. Iga teenuse kirjeldus on kalibreeritud nii, et tehnilised lüngad, tõlgendamisruum ja juriidilised hallid alad on täielikult välistatud. See tagab, et paberil määratud kvaliteet on täpselt see kvaliteet, mis paigaldatakse ehitusplatsile." },
        { title: "100% GAEB ja ÖNORM ühilduvus", desc: "Kaasaegne planeerimisprotsess nõuab sujuvat andmevoogu. Meie andmestikud ei ole lihtsalt tekst; need on kõrgelt struktureeritud ja masinloetavad artefaktid, mis on loodud koheseks integreerimiseks igasse professionaalsesse AVA-tarkvarasse (hange, lepingute sõlmimine, arveldus). Pakume natiivseid vorminguid (GAEB 90, GAEB 2000, GAEB DA XML) samuti Datanormi ja ÖNORM-i. Ei mingit konversioonikadu. Ei mingit käsitsi tehtavat järelvalvetöö. Digitaalne töövoog, mis tõstab planeerimisprotsessi tõhusust kuni 40%, välistades matemaatiliselt edastusvead." },
        { title: "Materjali spetsifikatsioon: PPR-C (Tüüp 3)", desc: "Veeinfrastruktuur on hoone närvisüsteem. Meie teenuse positsioonid defineerivad selgelt ja ühemõtteliselt meie polüpropüleen juhusliku kopolümeeri (PPR-C Type 3) parema molekulaarse struktuuri. Need fikseerivad sellised otsustavad parameetrid nagu roomamistugevus, roomekäitumine ja termiline joonpaisumine. Vaid selle kompromissitu detailsuse kaudu saate tõhusalt kaitsta oma projekti madalama kvaliteediga derivaatide ja ohtlike plagiaatide eest, mis vääramatult ebaõnnestuksid 20-baariste tipprõhkude või temperatuurikõikumiste korral." },
        { title: "Termodünaamiline ja akustiline täpsus", desc: "Kvaliteetne arhitektuur nõuab esmaklassilist füüsikat. Professionaalne hange ei hõlma mitte ainult paljast torusüsteemi, vaid kogu füüsikalist ökosüsteemi. Meie tekstid sisaldavad üksikasjalikke spetsifikatsioone soojuskao koefitsientide kohta vastavalt hooneenergia seadusele (GEG) / EnEV-le, samuti rangeid heliisolatsiooni väärtusi (DIN 4109). See tagab, et teie süsteem pole mitte ainult mehaaniliselt äärmiselt vastupidav, vaid ka termodünaamiliselt väga tõhus ja toimib akustiliselt absoluutses preemiumsegmendis (sosina standard)." },
        { title: "Jätkusuutlikkuse mõõdikud (ESG ja LEED)", desc: "Ehituse tulevik on ringne ja CO2 optimeeritud. Tänapäeval peavad hanked tõendama rohelisi standardeid. K Aqua tekstid integreerivad täielikud EPD-d (Environmental Product Declarations) ja elutsükli analüüsid. Defineerime ekstrusioonis täpse ökoloogilise jalajälje, ringlussevõetavuse ja energiatõhususe. Ideaalne hoonetele, mida testitakse vastavalt DGNB, LEED, BREEAM või WELL standarditele. Määrake roheline jõudlus, mitte ainult rohelised lubadused." }
      ]
    }
  }
};
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
