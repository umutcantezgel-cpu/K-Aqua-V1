const fs = require('fs');
const de = require('./messages/de.json').productsx;

const hu = JSON.parse(JSON.stringify(de));
hu.pipesEyebrow = "Csőválaszték";
hu.pipesTitle = "Rendszer. Anyag. Kategória.";
hu.pipesLead = "A PP-R alap polimerből (egy rétegű) az üvegszállal erősített PPRCT kompozitig a maximális hőállóság érdekében. Minden alkalmazáshoz a megfelelő cső.";

hu.pipes[0].t = "K-Pipe PP-R Monolayer";
hu.pipes[0].d = "A bevált szabvány hideg- és melegvízhez. Egyrétegű szerkezet, teljes SDR sávszélesség a szokásos méretekben: gazdaságos lakó- és kereskedelmi épületekhez.";
hu.pipes[1].t = "K-Fiber Pipe (PP-R/GF)";
hu.pipes[1].d = "Szálerősítésű kompozit. A beépített üvegszálas réteg minimalizálja a hőtágulást, és ideális felszálló vezetékekhez és melegvíz hálózatokhoz.";
hu.pipes[2].t = "K-Stabi Pipe (PP-R/ALU)";
hu.pipes[2].d = "Középső alumíniumréteg a 100%-os oxigéndiffúzió-mentességért. Szabványos légkondicionáló és fűtési rendszerekhez, formatartó a látható szereléseknél.";
hu.pipes[3].t = "K-Pipe PPRCT (High Temp)";
hu.pipes[3].d = "Legmagasabb hőmérsékleti tartalék a módosított kristályszerkezetnek köszönhetően. Folyamatos üzem 70 °C-on és 10 bar nyomáson 50 éven keresztül (SDR 7.4).";

hu.dimEyebrow = "Dimenzió Táblázatok";
hu.dimTitle = "Minden dimenzió, minden falvastagság.";
hu.dimLead = "Válassza ki a nyomásfokozatot. A táblázat az összes elérhető dimenziót mutatja falvastagsággal, belső átmérővel, névleges nyomással, víztartalommal és métersúllyal.";
hu.dimTabAria = "Nyomásfokozat kiválasztása";
hu.dimHead = ["d (mm)", "Fal s (mm)", "di (mm)", "Névleges nyomás", "Víztartalom (l/m)", "Súly (kg/m)"];
hu.dimNote = "Számított értékek az SDR geometriából (s = d/SDR, sűrűség 0,905 g/cm³) a DIN 8077 sorozatok alapján. A termékkatalógus és a projektspecifikus adatlapok a kötelező érvényűek.";

hu.anchorsTitle = "Kötelező érvényű tervezési sarokpontok a programból";
hu.anchors[0].t = "K-Fiber Pipe PP-R · SDR 6";
hu.anchors[0].c = "2,0 MPa folyamatos üzem 20 °C-on: Hidegvíz az 50 éves tervezési horizonton túl.";
hu.anchors[1].t = "K-Pipe PPRCT · SDR 7,4";
hu.anchors[1].c = "1,0 MPa folyamatos üzem 70 °C-on: Melegvíz és zirkuláció tartalékveszteség nélkül.";

hu.matEyebrow = "Anyagadatok";
hu.matTitle = "Mi teszi az anyagot kiválóvá.";
hu.matLead = "A PP-R/PPRCT rendszer legfontosabb paraméterei, és hogy miért számítanak a tervezésnél.";
hu.matHead = ["Tulajdonság", "Érték", "Jelentés az Ön projektje számára"];

hu.matRows[0] = ["Sűrűség", "0,905 g/cm³", "Körülbelül egytizede a rézének: könnyű szállítás, egyszerű szerelés emelőeszközök nélkül kis és közepes méreteknél."];
hu.matRows[1] = ["Belső érdesség", "0,007 mm", "Rendkívül sima felület: minimális nyomásveszteség, szinte semmi lerakódás vagy biofilm képződés."];
hu.matRows[2] = ["Hővezető képesség", "0,24 W/(m·K)", "Alacsony hőveszteség melegvíz keringetésnél: tartós energiamegtakarítás a fémhez képest."];
hu.matRows[3] = ["Hőtágulás (Monolayer)", "≈ 0,15 mm/(m·K)", "Szerkezetileg kompenzálva tágulási hurkokkal és fix pontokkal."];
hu.matRows[4] = ["Hőtágulás (K-Fiber, GF)", "≈ 0,04 mm/(m·K)", "Körülbelül egynegyede a Monolayer értékének: nagyobb bilincstávolságok, nyugodtabb csővezeték-kép."];
hu.matRows[5] = ["Közeg hőmérséklet", "hidegtől 70 °C-ig folyamatos üzem", "Ivóvíz meleg és hideg; Tervezési sarokpont: PPRCT SDR 7,4 70 °C · 10 bar."];
hu.matRows[6] = ["Kémiai ellenállás", "Oldószerek, lúgok, savak", "Technikai műanyagként szokatlanul ellenálló: korróziómentes, nincs lyukkorrózió veszély."];
hu.matRows[7] = ["Újrahasznosítás", "Kód 5 (PP)", "Fajtánként szétválasztható; a gyártási hulladék 100%-a visszakerül az anyagkörforgásba."];

hu.fitEyebrow = "Idomok és Rendszerkomponensek";
hu.fitTitle = "A rendszer a cső körül.";
hu.fitLead = "Idomok d20-tól d315-ig, szerelvények, átmenetek és a teljes hegesztéstechnika: minden egy kézből, minden rendszer-kompatibilis.";

hu.fitGroups[0].t = "Idomok d20-d315";
hu.fitGroups[0].items = ["90°-os és 45°-os könyök", "T-idomok, szűkített is", "Karmantyúk és csúszó karmantyúk", "Szűkítők", "Végelzárók"];
hu.fitGroups[1].t = "Átmenetek és Csavarzatok";
hu.fitGroups[1].items = ["Átmeneti idomok sárgaréz belső menettel", "Átmeneti idomok sárgaréz külső menettel", "Csavarzatok (bontható)", "Csatlakozás meglévő fém csővezetékekhez"];
hu.fitGroups[2].t = "Szerelvények";
hu.fitGroups[2].items = ["Szelepek", "Golyóscsapok", "Elzárók felszálló- és elosztó vezetékekhez"];
hu.fitGroups[3].t = "Hegesztéstechnika és Szerszámok";
hu.fitGroups[3].items = ["Kézi hegesztőgépek (d63-ig)", "Tokos hegesztőgépek", "Elektrofúziós hegesztőgépek", "Tompahegesztő gépek nagy méretekhez", "Csővágók és vágószerszámok"];

hu.normEyebrow = "Szabványok és Tanúsítványok";
hu.normTitle = "Tesztelve a szabályozások alapján.";
hu.normLead = "A K-Aqua rendszert a csővezeték-technológia vonatkozó szabványai szerint gyártják és tesztelik. Minden tétel az ISO-9001 minőségi előírások alapján.";
hu.normHead = ["Szabvány", "Cím", "Jelentőség"];

hu.norms[0] = ["DIN 8077", "Polipropilén csövek: Méretek", "Meghatározza az átmérő- és falvastagság-sorozatokat (SDR) PP csövekhez."];
hu.norms[1] = ["DIN 8078", "Polipropilén csövek: Követelmények", "Általános minőségi követelmények és tesztek PP-R/PPRCT csövekhez."];
hu.norms[2] = ["DIN EN ISO 15874", "Műanyag csőrendszerek", "Rendszerszabvány polipropilénből készült hideg- és melegvíz telepítésekhez."];
hu.norms[3] = ["DVS 2207-11", "PP hegesztése", "Irányértékek tokos-, elektro- és tompahegesztéshez: az Akadémia tartalmának alapja."];
hu.norms[4] = ["DVGW / KTW", "Ivóvíz érintkezés", "Megfelelőségi nyilatkozatok ivóvízzel való érintkezéshez: kérhető a Trust Center-ben."];
hu.norms[5] = ["EN 15804", "EPD (Typ III)", "Környezetvédelmi terméknyilatkozatok, mint adatbázis LEED, BREEAM és DGNB rendszerekhez."];
hu.norms[6] = ["ISO 9001 / 14001 / 50001", "Irányítási rendszerek", "Minőség, Környezet és Energia: háromszorosan vizsgált 2025 októbere óta, DAkkS-akkreditált."];
hu.norms[7] = ["GENAU", "Integrált Irányítási Rendszer", "A House of KWT házon belüli rendszere, amely egyesíti a munkavédelmet, a környezetet és az energiát a mindennapokban."];

hu.faqEyebrow = "Gyakori Kérdések";
hu.faqTitle = "Válaszok tervezéshez és beszerzéshez.";

hu.faq[0].q = "Milyen közegekre tervezték a rendszert?";
hu.faq[0].a = "Ivóvízhez (meleg és hideg) magas hőmérséklet- és nyomásállósággal évtizedeken át. A PP oldószerekkel, lúgokkal és savakkal szembeni ellenállása miatt ipari alkalmazások is lehetségesek; ezeket projektspecifikusan vizsgáljuk meg Önnel.";
hu.faq[1].q = "Mit jelentenek az öt SDR-osztály?";
hu.faq[1].a = "Az SDR a külső átmérő és a falvastagság (d/s) aránya. Kisebb SDR = vastagabb fal = magasabb névleges nyomás: SDR 6 megfelel PN 20-nak, SDR 17 megfelel PN 6-nak. Így alkalmazásonként pontosan azt a tartalékot választhatja, amire szüksége van, túlméretezés nélkül.";
hu.faq[2].q = "Mikor Monolayer, mikor K-Fiber?";
hu.faq[2].a = "A Monolayer a gazdaságos szabvány a legtöbb alkalmazáshoz. Az üvegszállal erősített kompozit körülbelül egynegyedére csökkenti a hőtágulást, nagyobb bilincstávolságokat tesz lehetővé, és nagy méreteknél és melegvíznél is formatartó marad. Ideális választás felszálló vezetékekhez, cirkulációhoz és d ≥ 160 átmérőkhöz.";
hu.faq[3].q = "Hogyan csatlakoznak a csövek?";
hu.faq[3].a = "Anyagzáró hegesztéssel: Tokos hegesztés kézzel (d63-ig) vagy géppel, elektrofúziós hegesztés fűtőszálas idomokkal és tompahegesztés nagy méretekhez (d630-ig). A megfelelő eszközök és szerszámok a program részét képezik; az Akadémia videón is bemutatja mind a négy eljárást.";
hu.faq[4].q = "A rendszer ivóvíz-kompatibilis?";
hu.faq[4].a = "A rendszert ivóvízre fejlesztették ki; a polipropilén íz- és szagtalan. Az ivóvízzel való érintkezésre vonatkozó megfelelőségi nyilatkozatokat (DVGW/KTW) a Trust Center-ben bocsátjuk rendelkezésre az RFP dokumentumcsomag részeként.";
hu.faq[5].q = "Milyen élettartamon alapul a tervezés?";
hu.faq[5].a = "A nyomásfokozatok a DIN 8077/8078 időtállósági regressziós görbéin alapulnak, 50 éves működési idő tervezési horizontjával, beleértve a biztonsági tényezőt is. A két program-sarokpont: SDR 6, 20 bar 20 °C-on és PPRCT SDR 7,4, 10 bar 70 °C-on.";
hu.faq[6].q = "Hol kapok kötelező érvényű cikkadatokat?";
hu.faq[6].a = "A termékkeresőben élőben szűrheti az összes változatot és exportálhatja CSV formátumban. A termékkatalógus (PDF) biztosítja a kötelező értékeket; projekt feltételekhez a projektkérés öt lépésben közvetlenül az értékesítéshez vezet. Válasz egy munkanapon belül.";

const textHu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
let start = textHu.findIndex(l => l.includes('"trust": {'));
if (start === -1) {
  start = textHu.findIndex(l => l.includes('"trustx": {'));
}
if (start === -1) {
  start = textHu.findIndex(l => l.includes('"imprint": {'));
}
const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: start + 1,
  EndLine: start + 1,
  Instruction: 'Inject productsx',
  Description: 'Update productsx translation',
  AllowMultiple: false,
  TargetContent: textHu[start],
  ReplacementContent: '  "productsx": ' + JSON.stringify(hu, null, 2).split('\n').join('\n  ') + ',\n' + textHu[start],
  toolSummary: 'Inject productsx',
  toolAction: 'Inject productsx'
};
fs.writeFileSync('mcp_productsx.json', JSON.stringify(req, null, 2));
