const fs = require('fs');
const de = require('./messages/de.json').solutionsx;

const hu = JSON.parse(JSON.stringify(de));
hu.segEyebrow = "Alkalmazási Területek";
hu.segTitle = "Bevált ott, ahol a víz kritikus.";
hu.segLead = "A K-Aqua rendszerek világszerte működnek a kórházaktól az üvegházakig tartó projektekben. Minden terület az anyag más-más erősségét használja ki.";

hu.segments[0].t = "Kórházak és Egészségügyi Épületek";
hu.segments[0].d = "A higiénia itt nem alku tárgya: A sima belső felület (0,007 mm) gátolja a biofilm és lerakódások képződését, az anyag íz- és szagtalan marad.";
hu.segments[0].pts = ["Higiéniai semlegesség", "Korróziómentes: nincs lyukkorrózió", "Referencia: Fokvárosi új kórház"];

hu.segments[1].t = "Szállodák és Lakóépületek";
hu.segments[1].d = "Melegvíz-keringetés éjjel-nappal: az alacsony hővezető képesség tartósan energiát takarít meg, a PPRCT bírja a 70 °C-os folyamatos üzemet.";
hu.segments[1].pts = ["Termikus hatékonyság", "PPRCT cirkulációhoz", "Referencia: Isztambuli szállodakomplexum"];

hu.segments[2].t = "Ipari és Kereskedelmi Épületek";
hu.segments[2].d = "Ellenáll oldószereknek, lúgoknak és savaknak. Ahol a fémcsövek korrodálnak, a polipropilén sértetlen marad.";
hu.segments[2].pts = ["Kémiai ellenállás", "Hosszú karbantartási intervallumok", "Folyamat- és ipari víz"];

hu.segments[3].t = "Üvegházak és Mezőgazdaság";
hu.segments[3].d = "UV-stabilizált változatok üvegházi és szabadtéri öntözéshez: könnyű, gyorsan telepíthető, fagyállóbb, mint a merev rendszerek.";
hu.segments[3].pts = ["UV-álló kivitel", "Alacsony súly", "Referenciaprogramból származó terület"];

hu.segments[4].t = "Önkormányzati Infrastruktúra";
hu.segments[4].d = "Ellátóvezetékek és hálózatok nagy méretekben d630-ig: tompahegesztéssel homogén, tartósan tömített szakaszokká alakítva.";
hu.segments[4].pts = ["d 630 mm-ig", "Tompahegesztés (Butt Fusion)", "Referencia: Szingapúri infrastruktúra"];

hu.segments[5].t = "Felújítás és Csere";
hu.segments[5].d = "Korrodált fém vagy PVC meglévő csövek cseréje: a sárgaréz menetes átmeneti idomok tisztán csatlakoztatják a meglévőt az új rendszerhez.";
hu.segments[5].pts = ["Átmenetek fém menetekre", "Szakaszonkénti felújítás", "Korróziós probléma tartósan megoldva"];

hu.cmpEyebrow = "Anyagösszehasonlítás";
hu.cmpTitle = "PP-R/PPRCT összehasonlítva.";
hu.cmpLead = "Négy csőanyag, nyolc kritérium: egyszerűsített összehasonlítás kiindulópontként a projektspecifikus anyagválasztáshoz.";
hu.cmpHead = ["Kritérium", "K-Aqua PP-R/PPRCT", "Réz", "Rozsdamentes acél", "PVC-C"];

hu.cmpRows[0] = ["Korrózió", "korróziómentes: immunis az elektrokémiai korrózióra", "Lyukkorrózió lehetséges", "ellenálló (minőségfüggő)", "korróziómentes"];
hu.cmpRows[1] = ["Lerakódás és Biofilm", "nagyon alacsony: belső érdesség 0,007 mm", "lehetséges", "alacsony", "alacsony"];
hu.cmpRows[2] = ["Hővezető képesség", "0,24 W/(m·K): alacsony veszteségek", "≈ 390 W/(m·K)", "≈ 15 W/(m·K)", "≈ 0,14 W/(m·K)"];
hu.cmpRows[3] = ["Sűrűség / Súly", "0,905 g/cm³", "8,9 g/cm³", "7,9 g/cm³", "1,55 g/cm³"];
hu.cmpRows[4] = ["Csatlakozástechnika", "anyagzáróan hegesztett: homogén szakasz", "forrasztott / préselt", "préselt / hegesztett", "ragasztott"];
hu.cmpRows[5] = ["Íz és Szag", "semleges", "Fémkibocsátás lehetséges", "semleges", "semleges"];
hu.cmpRows[6] = ["CO₂ (Telepítés)", "alacsony, hasonlítsa össze a CO₂-kalkulátorban", "magas", "magas", "közepes"];
hu.cmpRows[7] = ["Újrahasznosítás", "Kód 5, fajtánként tiszta: 100 % gyártási hulladék a körforgásban", "Fémhulladék körforgás", "Fémhulladék körforgás", "korlátozott"];

hu.cmpNote = "Egyszerűsített összehasonlítás tipikus anyagjellemzőkkel; az anyagválasztás projektspecifikus marad. A CO₂-összehasonlítás számadatai: lásd a CO₂-kalkulátort és az EPD-adatlapokat.";
hu.lifeEyebrow = "Életciklus";
hu.lifeTitle = "A nyersgáztól az újrahasznosított anyagig.";
hu.lifeLead = "Felelősség a teljes ciklus során: négy állomás, amely a terméket ökológiailag fenntarthatóvá teszi.";

hu.life[0].t = "Nyersanyag történettel";
hu.life[0].d = "A polipropilén olyan gázokból származik, amelyeket korábban haszontalanul elégettek. Az anyagként való hasznosítás a forrásnál csökkenti a légszennyezést.";
hu.life[1].t = "Körforgásos gyártás";
hu.life[1].d = "A waldsolms-i termelés zárt vízkörfolyamattal hűt, így védi a folyókat, patakokat és tavakat; az energiahatékonyságot az ISO 50001 szabályozza.";
hu.life[2].t = "50 év üzemben";
hu.life[2].d = "A DIN 8077/8078 időállósági görbéi alapján 50 éves üzemidőre tervezve: könnyen karbantartható, kopásálló, öregedésálló.";
hu.life[3].t = "Vissza a körforgásba";
hu.life[3].d = "5-ös újrahasznosítási kód: fajtánként szétválasztható a PP-rezyklátum iránti nagy kereslet mellett. A vágási hulladékok és termelési selejtek 100%-a újrahasznosításra kerül.";

const textHu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
let start = textHu.findIndex(l => l.includes('"trust": {'));
if (start === -1) {
  start = textHu.findIndex(l => l.includes('"imprint": {'));
}
const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: start + 1,
  EndLine: start + 1,
  Instruction: 'Inject solutionsx',
  Description: 'Update solutionsx translation',
  AllowMultiple: false,
  TargetContent: textHu[start],
  ReplacementContent: '  "solutionsx": ' + JSON.stringify(hu, null, 2).split('\n').join('\n  ') + ',\n' + textHu[start]
};
fs.writeFileSync('mcp_solutionsx.json', JSON.stringify(req, null, 2));
