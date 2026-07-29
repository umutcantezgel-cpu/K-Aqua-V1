const fs = require('fs');
const de = require('./messages/de.json').partnerx;

const hu = JSON.parse(JSON.stringify(de));
hu.ecoEyebrow = "A KESSEL ökoszisztéma";
hu.ecoTitle = "Miből profitálnak a K-Aqua ügyfelek.";
hu.ecoLead = "A KESSEL évtizedek alatt építette fel egy prémium márka infrastruktúráját. A K-Aqua ugyanezt a hozzáállást hozza a vízellátásba.";
hu.eco[0].t = "ISH Frankfurt";
hu.eco[0].d = "A KESSEL jelen van az épületgépészeti (TGA) iparág vezető világkiállításán, azon a színpadon, ahol a vízelvezetés és a vízellátás együtt jelenik meg.";
hu.eco[1].t = "Tervezői Portál (PlanerPortal)";
hu.eco[1].d = "A szakmai tervezők digitális platformja a mindennapi tervezői elköteleződés központja: példakép a K-Aqua digitális eszközei számára.";
hu.eco[2].t = "Ügyfélfórum (KundenForum)";
hu.eco[2].d = "Személyes és hibrid képzések dedikált helyszíneken, többek között Lentingben és Hamburgban. A tudástranszfer elköteleződést jelent.";
hu.eco[3].t = "Tervezési kézikönyv";
hu.eco[3].d = "A KESSEL szerkesztett tervezési tudásbázisa referenciaként szolgál arra, hogyan bővíti a K-Aqua tervezői tudásbázisát: az Akadémiától a mérettáblázatokig.";

hu.flowEyebrow = "Két áramlat, egy épület";
hu.flowTitle = "Ellátás be, vízelvezetés ki.";
hu.flowLead = "Minden épületnek mindkét irányra szüksége van. A partnerség a teljes vízi utat lefedi egy közös mérnöki DNS-sel.";
hu.flow[0].t = "K-Aqua: Vezető a vízellátásban";
hu.flow[0].d = "Ivóvízellátás d20–d630: Csövek, idomok, szerelvények és hegesztéstechnika, Waldsolmsban gyártva.";
hu.flow[1].t = "KESSEL: Vezető a vízelvezetésben";
hu.flow[1].d = "A vízelvezetési technológia prémium gyártója: visszatorlódás elleni védelem, átemelő berendezések, leválasztók. Az épületgépészeti iparág tekintélye.";
hu.flow[2].t = "Közös szakma";
hu.flow[2].d = "A tervezők és kivitelezők egy értékközösséggel dolgoznak együtt: azonos minőségi filozófia, összehangolt támogatás, rövid utak.";

hu.roadEyebrow = "Közös Útiterv";
hu.roadTitle = "A képzési videótól a konfigurátorig.";
hu.road[0].t = "Akadémia és Videók";
hu.road[0].d = "Négy hegesztési eljárás videós dokumentációja plusz kvíz: ma is elérhető, építkezésre optimalizálva.";
hu.road[0].s = "Ma";
hu.road[1].t = "Hegesztéstechnikai Támogatás";
hu.road[1].d = "Eszközök, szerszámok és betanítás az Ön csapata számára, közvetlenül a gyártótól.";
hu.road[1].s = "Ma";
hu.road[2].t = "Digitális Tervezőeszközök";
hu.road[2].d = "Termékkereső, CO₂-kalkulátor és Trust Center mint önkiszolgáló felületek, bővítés alatt a PlanerPortal mintájára.";
hu.road[2].s = "Bővítés alatt";
hu.road[3].t = "Parametrikus Csőhálózat Konfigurátor";
hu.road[3].d = "A jövőkép: Csőhálózatok parametrikus konfigurálása, majd azok közvetlen átvitele darabjegyzékbe és ajánlatkérésbe.";
hu.road[3].s = "Jövőkép";

hu.specEyebrow = "Az Ön specifikációjához";
hu.specTitle = "Adatok oda, ahol a döntések születnek.";
hu.specLead = "A termékspecifikációkról az AVA és CAD szoftverekben döntenek. Oda szállítunk.";
hu.spec[0].t = "GAEB kiírási szövegek";
hu.spec[0].d = "Kész szövegek az Ön teljesítménykiírásaihoz: az RFP-csomag része a Trust Centerben.";
hu.spec[1].t = "BIM és CAD adatok";
hu.spec[1].d = "Tervezési adatok a modellalapú munkához, kérésre az értékesítésen keresztül, a bővítés folyamatban van.";
hu.spec[2].t = "Adatlapok és Minták";
hu.spec[2].d = "Termékkatalógus és tulajdonságok PDF formátumban, minták és projekt tanácsadás közvetlenül a gyártól.";

const textHu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
let start = textHu.findIndex(l => l.includes('"trust": {'));
if (start === -1) {
  start = textHu.findIndex(l => l.includes('"imprint": {'));
}
const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: start + 1,
  EndLine: start + 1,
  Instruction: 'Inject partnerx',
  Description: 'Update partnerx translation',
  AllowMultiple: false,
  TargetContent: textHu[start],
  ReplacementContent: '  "partnerx": ' + JSON.stringify(hu, null, 2).split('\n').join('\n  ') + ',\n' + textHu[start]
};
fs.writeFileSync('mcp_partnerx.json', JSON.stringify(req, null, 2));
