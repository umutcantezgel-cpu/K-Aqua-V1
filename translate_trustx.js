const fs = require('fs');
const de = require('./messages/de.json').trustx;

const hu = JSON.parse(JSON.stringify(de));
hu.stakeEyebrow = "Az Ön Beszerzési Központjának";
hu.stakeTitle = "Minden szerepkör mást vizsgál.";
hu.stakeLead = "Egy B2B beszerzési bizottság átlagosan 11-20 személyből áll. A műszaki, beszerzési és fenntarthatósági szakembereknek különböző bizonyítékokra van szükségük. Íme az útmutató.";
hu.stakeHead = ["Szerepkör", "Mi a fontos", "Releváns igazolások"];

hu.stakeRows[0] = ["Mérnök / Tervező", "Nyomásfokozatok és méretek (d20–d630), toxicitásmentesség, hegeszthetőség, tételhossz", "ISO 9001 · DIN 8077/8078 · DIN EN ISO 15874 · Mérettáblázatok"];
hu.stakeRows[1] = ["Beszerzés", "Szállítási képesség, kockázatcsökkentés, szigorú RFP kritériumok, teljes birtoklási költség (TCO)", "ISO 9001, mint „belépő\" · Minőségbiztosítási kézikönyv · GAEB szövegek"];
hu.stakeRows[2] = ["Fenntarthatóság / Megfelelőség", "CO₂ lábnyom, Scope-1/2/3 kibocsátások, zöld beszerzés, gyártási energiahatékonyság", "ISO 14001 · ISO 50001 · EPD (EN 15804) · Scope-3 adatok kérésre"];

hu.statEyebrow = "Miért Önkiszolgáló";
hu.statTitle = "A beszerzés megváltozott.";
hu.stats[0].l = "a B2B vásárlók aránya, akik névtelenül kutatnak az értékesítés megkeresése előtt";
hu.stats[1].l = "érdekelt fél alkotja egy projekt tipikus beszerzési központját";
hu.stats[2].l = "érintkezési pontot is magában foglalhat egy B2B vásárlási döntés";
hu.stats[3].l = "a B2B ügyfelek aránya, akik előnyben részesítik az igazoltan fenntartható beszállítókat";

hu.statNote = "A mutatók iparági tanulmányokból származnak a B2B beszerzésről. Ezért minden igazolás letölthető itt, ahelyett, hogy „írásos kérésre\" lenne elérhető.";

hu.instEyebrow = "Vizsgáló Partnerek";
hu.instTitle = "Kik állnak a tanúsítványok mögött.";
hu.inst[0].t = "DAkkS által akkreditált vizsgálat";
hu.inst[0].d = "Az ISO 9001, 14001 és 50001 tanúsítványok a Német Akkreditáló Testület (DAkkS) által akkreditált tanúsító cégtől származnak: érvényes 2025/10-től 2028/10-ig.";
hu.inst[1].t = "SKZ: Dél-német Műanyagipari Központ";
hu.inst[1].d = "A csőrendszerek minőségbiztosítását a neves Műanyagvizsgáló Intézet kíséri: független tesztek önfényezés helyett.";
hu.inst[2].t = "DVGW / KTW: Ivóvíz érintkezés";
hu.inst[2].d = "Az ivóvízzel való érintkezésre vonatkozó megfelelőségi nyilatkozatok az RFP dokumentumcsomag részét képezik, és kérésre biztosítjuk őket.";

hu.auditEyebrow = "Audit Menetrend";
hu.auditTitle = "Az ajánlatkéréstől a jóváhagyásig.";
hu.auditLead = "Így zajlik egy beszállítói minősítés a K-Aqua-nál: tervezhetően és várakozási idők nélkül.";
hu.audit[0].t = "Dokumentumcsomag összeállítása";
hu.audit[0].d = "Állítsa össze fentebb az RFP-csomagját: Tanúsítványok, GENAU-irányelvek, EPD, GAEB és minőségbiztosítási kézikönyv, ZIP formátumban igényelve.";
hu.audit[1].t = "Kérdések tisztázása";
hu.audit[1].d = "A minőségbiztosítási és műszaki támogatás egy munkanapon belül válaszol a support@k-aqua.de címen.";
hu.audit[2].t = "Gyári audit egyeztetése";
hu.audit[2].d = "Auditálja a gyártást, a vizsgáló labort és a GENAU gyakorlatot a helyszínen Waldsolms-ban: időpont egyeztetés alapján.";
hu.audit[3].t = "Jóváhagyás és Újraminősítés";
hu.audit[3].d = "A listázás után felügyeleti auditok kísérik a tanúsítványok 3 éves ciklusát. Az Ön dokumentumai aktuálisak maradnak.";

hu.faqEyebrow = "Megfelelőségi GYIK";
hu.faqTitle = "A leggyakoribb ellenőrzési kérdések.";
hu.faq[0].q = "Meddig érvényesek az ISO tanúsítványok?";
hu.faq[0].a = "Három évig. A jelenlegi ciklus 2025/10-től 2028/10-ig tart, a tanúsító cég éves felügyeleti auditjaival kísérve.";
hu.faq[1].q = "Mit jelent a „DAkkS-akkreditált\"?";
hu.faq[1].a = "A Német Akkreditáló Testület (DAkkS) Németország nemzeti akkreditáló testülete. Magukat a tanúsító cégeket ellenőrzi. Az akkreditáció nemzetközileg is megbízhatóvá teszi a tanúsítványt.";
hu.faq[2].q = "Hogyan ellenőrizhetem a tanúsítványt?";
hu.faq[2].a = "Minden tanúsítvány tartalmaz egy tanúsítványszámot (pl. Q-2025-6732) és a kiállító testületet. Ezzel a két adattal az érvényesség közvetlenül a tanúsító cégnél ellenőrizhető. Vagy érdeklődjön a support@k-aqua.de címen.";
hu.faq[3].q = "Vannak Scope-3 és EPD nyersadatok?";
hu.faq[3].a = "Igen, a Scope-3 kibocsátási adatokat és az EPD nyersadatokat kérésre rendelkezésre bocsátjuk. Proaktív átláthatóság a kötelezettségteljesítés helyett: Fenntarthatósági csapata megbízható számokat kap a saját mérlegéhez.";
hu.faq[4].q = "Biztosítanak GAEB kiírási szövegeket?";
hu.faq[4].a = "Igen, a GAEB szövegek az RFP dokumentumcsomag részét képezik. Ezzel a K-Aqua rendszer zökkenőmentesen bekerül az Ön AVA-szoftverébe és a teljesítménykiírásokba.";
hu.faq[5].q = "Mi az az EN 15804 szerinti EPD?";
hu.faq[5].a = "Egy (III. típusú) környezetvédelmi terméknyilatkozat az életciklusra vonatkozó, ellenőrzött életciklus-értékelési adatokkal. Ez képezi az adatbázist az épületteljesítmény-tanúsítványokhoz, mint például a LEED, a BREEAM és a DGNB, valamint a CO₂-alapú beszerzési modellekhez.";

const textHu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
let start = textHu.findIndex(l => l.includes('"trust": {'));
if (start === -1) {
  start = textHu.findIndex(l => l.includes('"imprint": {'));
}
const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: start + 1,
  EndLine: start + 1,
  Instruction: 'Inject trustx',
  Description: 'Update trustx translation',
  AllowMultiple: false,
  TargetContent: textHu[start],
  ReplacementContent: '  "trustx": ' + JSON.stringify(hu, null, 2).split('\n').join('\n  ') + ',\n' + textHu[start]
};
fs.writeFileSync('mcp_trustx.json', JSON.stringify(req, null, 2));
