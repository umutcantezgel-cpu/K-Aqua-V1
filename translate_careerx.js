const fs = require('fs');
const de = require('./messages/de.json').careerx;

const hu = JSON.parse(JSON.stringify(de));
hu.areaEyebrow = "Munkaterületek";
hu.areaTitle = "Hol fog dolgozni a K-Aqua-nál.";
hu.areaLead = "A kreativitás és a tapasztalat jelentik piacvezető megoldásaink alapját: négy terület viszi ezeket, az egész waldsolms-i gyáron keresztül.";
hu.areas[0].t = "Gyártás és Termelés";
hu.areas[0].d = "Akár napi 14 000 méteres teljesítményű extrudáló berendezések beállítása, üzemeltetése és felügyelete, emellett fröccsöntés idomokhoz d20-tól d315-ig.";
hu.areas[0].p = "Műszaki érzék, gondosság, hajlandóság a többműszakos munkára";
hu.areas[1].t = "Technika és Karbantartás";
hu.areas[1].d = "Az extruderek, szerszámok és perifériák működésben tartása: karbantartás, hibaelemzés és folyamatos fejlesztés a GENAU alapján.";
hu.areas[1].p = "Képzettség mechatronikai, elektronikai vagy fémipari területen: az okok megtalálása a tünetek toldozgatása helyett";
hu.areas[2].t = "Értékesítés és Alkalmazástechnika";
hu.areas[2].d = "Projektek kísérése Frankfurttól a Közel-Keletig: tanácsadás a méretekről, SDR osztályokról és hegesztéstechnikáról, közvetlenül a gyártótól.";
hu.areas[2].p = "Műszaki tanácsadói kompetencia, a nyelvtudás előnyt jelent";
hu.areas[3].t = "Adminisztráció és Kereskedelem";
hu.areas[3].d = "Rendelésfeldolgozás, beszerzés és szervezés: azok a folyamatok, amelyek a minőséget összeegyeztethetővé teszik a költségekkel és a határidőkkel.";
hu.areas[3].p = "Strukturált munkavégzés, a tiszta folyamatok szeretete";

hu.areaNote = "Nem találja a profilját? A spontán jelentkezéseket is kifejezetten várjuk, a vállalat folyamatosan növekszik.";
hu.whyEyebrow = "Miért a K-Aqua";
hu.whyTitle = "Négy ok, hogy nálunk dolgozzon.";
hu.why[0].t = "Növekvő piaci pozíció";
hu.why[0].d = "Egy erős pozíció, amelyet folyamatosan bővítünk: az Ön munkája láthatóan hozzájárul a sikerhez.";
hu.why[1].t = "A biztonság mint rendszer";
hu.why[1].d = "A GENAU a munkavédelmet napi gyakorlattá teszi: a veszélyek jelentése kötelező és komolyan veszik, mindenki által, mindenki számára.";
hu.why[2].t = "Termék szubsztanciával";
hu.why[2].d = "Csövek, amelyeket 50 éves üzemre terveztek, és világszerte kórházakban és szállodákban működnek: eredmények, amelyek megmaradnak.";
hu.why[3].t = "Juttatások, amelyek nettóban is érezhetők";
hu.why[3].d = "Adómentes extrák a juttatási kártyától (Sachbezugskarte) a JobRad-ig: számolja ki fent, mit hoz az Ön csomagja.";

hu.procEyebrow = "Jelentkezési folyamat";
hu.procTitle = "Három lépés a szerződésig.";
hu.proc[0].t = "Jelentkezés elküldése";
hu.proc[0].d = "E-mailben Andrea Nickel részére: a CV-generátorral vagy közvetlen jelentkezéssel erről az oldalról. Nincs szükség regényes motivációs levélre.";
hu.proc[1].t = "Beszélgetés lebonyolítása";
hu.proc[1].d = "Hamarosan jelentkezünk, és őszintén tisztázzuk a mindennapokat, akár telefonon is a +49 (0)60 85 / 9868-410 számon.";
hu.proc[2].t = "A gyár megismerése";
hu.proc[2].d = "A döntés előtt megismerheti a gyártást és a csapatot Waldsolmsban. Ezután következik a szerződéses ajánlat.";
hu.procContact = "Kapcsolattartó: Andrea Nickel · andrea.nickel@k-aqua.de";

const textHu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
let start = textHu.findIndex(l => l.includes('"trust": {'));
if (start === -1) {
  start = textHu.findIndex(l => l.includes('"imprint": {'));
}
const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: start + 1,
  EndLine: start + 1,
  Instruction: 'Inject careerx',
  Description: 'Update careerx translation',
  AllowMultiple: false,
  TargetContent: textHu[start],
  ReplacementContent: '  "careerx": ' + JSON.stringify(hu, null, 2).split('\n').join('\n  ') + ',\n' + textHu[start]
};
fs.writeFileSync('mcp_careerx.json', JSON.stringify(req, null, 2));
