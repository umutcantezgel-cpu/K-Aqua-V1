const fs = require('fs');
const de = require('./messages/de.json').geoContent;

const hu = JSON.parse(JSON.stringify(de));

const extText = "Ennek a régiónak a városi infrastruktúrája különleges követelményeket támaszt a csővezeték-rendszerek tartósságával és megbízhatóságával szemben. Az extrém éghajlati viszonyok és a víz higiéniájával szembeni magas követelmények miatt a K-Aqua PP-R és PPRCT megoldásai döntő előnyt jelentenek. A hagyományos fémcsövek gyakran szenvednek korróziótól és ásványi lerakódásoktól, ami jelentős nyomásveszteséghez és a szivárgások miatti vízpazarláshoz vezet. A K-Aqua rendszerek ezzel szemben korróziómentes anyaguknak és a homogén polifúziós hegesztésnek köszönhetően abszolút tömített, karbantartásmentes telepítést garantálnak több mint 50 évre. Ezenkívül a sima belső felület optimális hidraulikus áramlási tulajdonságokat tesz lehetővé, ami drasztikusan csökkenti a keringető szivattyúk energiaigényét. Ezek a tényezők teszik a K-Aqua-t az elsődleges választássá nagy szállodakomplexumok, kórházak, ipari hűtőrendszerek és igényes lakóépítési projektek számára a városi szektorban.";

const cities = {
  frankfurt: "Frankfurt", berlin: "Berlin", muenchen: "München", hamburg: "Hamburg",
  wien: "Bécs", zuerich: "Zürich", london: "London", paris: "Párizs", mailand: "Milánó",
  warschau: "Varsó", prag: "Prága", dubai: "Dubai", abudhabi: "Abu Dhabi", doha: "Doha",
  riad: "Rijád", dschidda: "Dzsidda", neom: "NEOM", kuwait: "Kuvait", maskat: "Maszkat",
  manama: "Manáma", amman: "Amman", kairo: "Kairó", istanbul: "Isztambul", singapur: "Szingapúr",
  kualalumpur: "Kuala Lumpur", mumbai: "Mumbai", kapstadt: "Fokváros", nairobi: "Nairobi"
};

for (const key of Object.keys(hu)) {
  if (hu[key].extendedMarketText) {
    hu[key].extendedMarketText = extText;
    hu[key].focusHeading = `Tipikus projektek itt: ${cities[key]}`;
  }
}

// I will now hand-translate the short properties for the 28 cities directly here.
hu.frankfurt.water = "Közép-hesseni vízellátás: magas minőségi követelmények, hangsúly a tartós, korróziómentes és karbantartásmentes rendszereken az ivóvízhálózatokban.";
hu.frankfurt.focus = ["Kereskedelmi magasépítés (pl. Mainhattan)", "Repülőtéri és logisztikai infrastruktúra", "Ipari üzemek a Rajna-Majna vidéken"];
hu.frankfurt.note = "A Waldsolms-i gyár közelsége garantálja a legrövidebb szállítási utakat és az azonnali gyártói támogatást.";

hu.berlin.water = "Vegyes vízellátás (talajvíz és felszíni víz): a mészlerakódásokkal szembeni ellenálló képesség és a rugalmasság a régi hálózatok felújításánál döntő jelentőségű.";
hu.berlin.focus = ["Középületek és minisztériumok", "Kórházépítés (pl. Charité bővítések)", "Városi lakóépületek felújítása"];
hu.berlin.note = "Nagykereskedelmi és közvetlen szállítási logisztika kiterjedt projekttámogatással.";

hu.muenchen.water = "Magas vízkeménység az Elő-Alpokból (Mangfall-völgy): a vízkőlerakódás megakadályozása a csövekben és idomokban elengedhetetlen.";
hu.muenchen.focus = ["Technológiai ipari központok", "Élvonalbeli orvostudományi és kutatási létesítmények", "Exkluzív lakóépületek"];
hu.muenchen.note = "Nagy sűrűségű bajorországi telepítői hálózat KESSEL-szinergiákkal (Lenting).";

hu.hamburg.water = "Kiváló minőségű talajvíz: fókusz a higiénián és a kikötői környezetben a sós víz közelsége miatti tartósságon.";
hu.hamburg.focus = ["Kikötővárosi fejlesztések (HafenCity)", "Tengerészeti és hajógyári infrastruktúra", "Nagy szállodai és turisztikai projektek"];
hu.hamburg.note = "Exportközpont a nemzetközi szállításokhoz (tengeri árufuvarozás) és erős regionális értékesítés.";

hu.wien.water = "Első osztályú hegyi forrásvíz (Alpok): A higiénia és az ízsemlegesség megőrzése a legfontosabb (0,007 mm érdesség).";
hu.wien.focus = ["Önkormányzati lakásépítés és felújítás", "Történelmi középületek modernizálása", "Szálloda- és wellness szektor"];
hu.wien.note = "Az osztrák piac zökkenőmentes kiszolgálása ÖNORM és DAkkS szabványokkal.";

hu.zuerich.water = "Szigorú svájci higiéniai és környezetvédelmi szabványok: alacsony CO2-kibocsátás (EPD) és tanúsított biztonság (SVGW, ha alkalmazható).";
hu.zuerich.focus = ["Minőségi iroda- és pénzügyi épületek", "Gyógyszeripari laboratóriumok", "Luxus lakóparkok"];
hu.zuerich.note = "Közvetlen szállítások Svájcba, beleértve a vámügyintézést és a helyi projektkísérést.";

hu.london.water = "Öregedő városi infrastruktúra: az utólagos felszereléshez és az új építésekhez nagy tartósságra és szivárgásmentességre van szükség (WRAS konformitás).";
hu.london.focus = ["Canary Wharf és City magasépítés", "Egészségügyi ellátás (NHS projektek)", "Tömegközlekedési csomópontok (pl. Crossrail)"];
hu.london.note = "UK specifikus tanúsítványok és metrikus/birodalmi átmenetek rendelkezésre állnak.";

hu.paris.water = "Összetett vízellátó hálózat: a régi épületek és a modern (pl. Grand Paris Express) felújítások rugalmas csatlakozásokat igényelnek.";
hu.paris.focus = ["Nagy sport- és kulturális események infrastruktúrája", "Kereskedelmi és divatközpontok", "Banlieue revitalizációs projektek"];
hu.paris.note = "Francia nyelvű műszaki dokumentáció (CSTB/NF minősítések).";

hu.mailand.water = "Észak-olaszországi ipari központ: robusztus megoldások az ipari vízhez és az ivóvízhez meleg éghajlaton.";
hu.mailand.focus = ["Ipari és gyártó létesítmények", "Divat- és tervező negyedek irodaépületei", "Egészségügyi komplexumok"];
hu.mailand.note = "Kiszolgálás regionális forgalmazókon keresztül, dedikált projekttámogatással.";

hu.warschau.water = "Erős modernizáció és növekedés: fókusz az energiahatékonyságon és a hosszú élettartamon az új negyedekben.";
hu.warschau.focus = ["Modern üzleti és IT-parkok", "Infrastrukturális korszerűsítés", "Kiterjedt lakóövezetek"];
hu.warschau.note = "Erős jelenlét a kelet-európai növekedési piacon GAEB kompatibilis kiírásokkal.";

hu.prag.water = "Történelmi központ modern kiegészítésekkel: fókusz a megbízhatóságon és a rezgéselnyelésen a szállítmányozás/ipari területeken.";
hu.prag.focus = ["Történelmi épületek felújítása", "Nagy turisztikai szállodák", "Új ipari parkok a periférián"];
hu.prag.note = "Közeli szállítási útvonalak és szoros műszaki együttműködés a tervezőkkel.";

hu.dubai.water = "Színtiszta sótalanított tengervíz, extrém hőség, magas páratartalom: Maximális korrózióállóság, UV-stabilitás és PPRCT a magas hőmérsékletekhez.";
hu.dubai.focus = ["Luxus szállodák és üdülők", "Szuper magas felhőkarcolók (Super-talls)", "Óriási bevásárlóközpontok és hűtőközpontok"];
hu.dubai.note = "Megbízható referenciák a Közel-Keleten; dedikált logisztika és helyszíni képzés.";

hu.abudhabi.water = "Sótalanítás, víztakarékossági fókusz (Estidama): szivárgásmentesség (homogén hegesztés) elengedhetetlen a zöld épületekhez.";
hu.abudhabi.focus = ["Kormányzati és adminisztratív komplexumok", "Kulturális negyedek (pl. Saadiyat Island)", "Nagy kórházi projektek"];
hu.abudhabi.note = "Közvetlen támogatás zöld épület minősítésekhez (EPD adatokkal).";

hu.doha.water = "Gyors növekedés, 100% sótalanítás: a legmagasabb megbízhatóság a sport-, oktatási és egészségügyi infrastruktúrában.";
hu.doha.focus = ["Sportlétesítmények és stadionok környéke", "Oktatási város (Education City)", "Fejlett egészségügyi központok"];
hu.doha.note = "Projektek erős helyi jelenléttel és magas QA követelményekkel (ISO/DAkkS).";

hu.riad.water = "Nagyszabású infrastrukturális átalakulás (Vision 2030): rendkívül forró klíma, igény a méretezhetőségre (d630-ig) és a megbízhatóságra.";
hu.riad.focus = ["Nagy lakó- és vegyes használatú (Mixed-use) projektek", "Új pénzügyi központok (KAFD)", "Infrastruktúra a metróhoz és közlekedéshez"];
hu.riad.note = "SASO megfelelőség és jelentős kapacitások biztosítva a waldsolmsi gyárból.";

hu.dschidda.water = "Magas páratartalom és sótartalom a Vörös-tenger partján: A korróziómentes PP-R felváltja a hagyományos fémeket.";
hu.dschidda.focus = ["Tengerparti fejlesztések és luxusvillák", "Logisztikai és kikötői létesítmények", "Kereskedelmi tornyok"];
hu.dschidda.note = "Fókuszban a tengerparti környezettel szembeni ellenálló képesség; helyi partnerek bevonásával.";

hu.neom.water = "Futurisztikus mega-projekt, fókusz a 100%-os fenntarthatóságon és zöld energián: A körforgásos (újrahasznosítható) és EPD-igazolt PP-R kötelező.";
hu.neom.focus = ["THE LINE infrastruktúra", "Oxagon ipari város", "Trojena hegyi üdülő"];
hu.neom.note = "A legmagasabb fenntarthatósági és innovációs szabványok; projektigazgatás Németországból.";

hu.kuwait.water = "Erős hőingadozások, 100% sótalanítás: A hőtágulás kezelése (K-Fiber) kritikus a biztonság szempontjából.";
hu.kuwait.focus = ["Kormányzati és olajipari központok", "Nagy egészségügyi városok", "Egyetemi kampuszok"];
hu.kuwait.note = "Helyi minisztériumi engedélyek (MEW stb.) támogatott beszerzése.";

hu.maskat.water = "Változó víznyomás, sótartalmú környezet: Robusztus hegesztési varratok (PN20) és UV-védelem elengedhetetlen a tetőtéri telepítéseknél.";
hu.maskat.focus = ["Turisztikai és vendéglátóipari projektek", "Lakóépület-fejlesztések", "Repülőtér bővítések"];
hu.maskat.note = "A régió növekvő piaca, műszaki támogatással ellátva.";

hu.manama.water = "Szigetállam magas sótartalommal, sótalanítás: Korrózióállóság a szálloda- és luxus szektorban.";
hu.manama.focus = ["Mesterséges szigetek fejlesztése", "Pénzügyi kikötő épületek", "Kereskedelmi központok"];
hu.manama.note = "Szoros együttműködés a helyi fejlesztőkkel a specifikációtól a telepítésig.";

hu.amman.water = "Extrém vízhiány, vízellátás szivattyúzással és tartályokkal: Nulla szivárgás a legfontosabb prioritás a vízmegőrzés érdekében.";
hu.amman.focus = ["Központi kórházak (NGO/nemzeti)", "Lakótömbök víztároló rendszerekkel", "Önkormányzati vízelosztás"];
hu.amman.note = "Oktatás és képzés a helyi szerelők számára a hibamentes telepítés érdekében.";

hu.kairo.water = "Nílusból származó víz és új városfejlesztések (Új Főváros): Hatalmas volumenigény (d630-ig) megbízható nyomásállósággal.";
hu.kairo.focus = ["Új Közigazgatási Főváros épületei", "Nagy kiterjedésű lakóparkok", "Kulturális intézmények (Nagy Egyiptomi Múzeum)"];
hu.kairo.note = "Magas gyártási kapacitás Waldsolmsban biztosítja az időben történő szállítást.";

hu.istanbul.water = "Földrengésveszélyes zóna: A PP-R/PPRCT csövek és a hegesztett kötések nagyobb rugalmassága és szeizmikus ellenálló képessége fémekhez képest.";
hu.istanbul.focus = ["Mega kórházak (City Hospitals)", "Hatalmas lakó- és bevásárlókomplexumok", "Közlekedési infrastruktúra (repülőterek)"];
hu.istanbul.note = "Széleskörű tapasztalat nagy léptékű törökországi projektekben.";

hu.singapur.water = "NEWater és sótalanított víz, trópusi állandó meleg: legmagasabb követelmények a hosszú távú nyomásállósággal szemben.";
hu.singapur.focus = ["Állami lakásépítés (HDB)", "Marina felhőkarcolók", "Félvezető ipari tisztavíz-előrendszerek"];
hu.singapur.note = "Tengeri fuvardíj Hamburgból; teljes PUB benyújtási dokumentáció rendelkezésre áll.";

hu.kualalumpur.water = "Trópusi felszíni víz, magas környezeti páratartalom: az UV- és öregedésálló rendszerek alapvetőek.";
hu.kualalumpur.focus = ["TRX pénzügyi negyed", "Vegyes használatú tornyok", "Johor ipari folyosó"];
hu.kualalumpur.note = "SPAN listázás disztribúciós partnereken keresztül; ASEAN csomópont a régió számára.";

hu.mumbai.water = "Monszun által befolyásolt gátas vízellátás szakaszos üzemmel: a nyomáslökéseknek ellenálló hegesztési kötések kétszeresen is számítanak.";
hu.mumbai.focus = ["Magasépítésű rehabilitáció (Redevelopment)", "Kórház- és gyógyszeripari építés", "Smart Cities program"];
hu.mumbai.note = "BIS megfelelőség projektenként; műszaki képzés távolról + a helyszínen.";

hu.kapstadt.water = "Vízhiány a „Day Zero\" után: a szivárgásmentes hegesztett kötések itt a víztakarékossági politika részét képezik.";
hu.kapstadt.focus = ["Kórház- és szállodaépítés", "Township infrastruktúra", "Borászatok technológiai vize"];
hu.kapstadt.note = "Projektüzlet helyi partnerhálózattal; a hegesztőcsapatok képzése is biztosított.";

hu.nairobi.water = "Gát- és talajvíz keveréke egy gyorsan növekvő metropoliszban: robusztus, könnyen oktatható csatlakozástechnika a követelmény.";
hu.nairobi.focus = ["Megfizethető lakhatási program (Affordable Housing)", "Tatu City", "Kórházak és oktatási épületek"];
hu.nairobi.note = "Kelet-afrikai csomópont: szállítás Mombasán keresztül; hegesztési képzés mint kapacitásfejlesztés.";

const textHu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
let start = textHu.findIndex(l => l.includes('"trust": {'));
if (start === -1) {
  start = textHu.findIndex(l => l.includes('"imprint": {'));
}
const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: start + 1,
  EndLine: start + 1,
  Instruction: 'Inject geoContent',
  Description: 'Update geoContent translation',
  AllowMultiple: false,
  TargetContent: textHu[start],
  ReplacementContent: '  "geoContent": ' + JSON.stringify(hu, null, 2).split('\n').join('\n  ') + ',\n' + textHu[start]
};
fs.writeFileSync('mcp_geoContent.json', JSON.stringify(req, null, 2));
