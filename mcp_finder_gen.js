const fs = require('fs');
const hu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
const target = hu.slice(2207, 2238).join('\n'); // 2208 to 2238 (inclusive) -> array index 2207 to 2237. wait, slice(2207, 2238) is 31 lines. Let's check exactly.

const repl = `{
  "eyebrow": "Termékkereső",
  "title1": "Nincs több PDF sivatag.",
  "titleGrad": "Azonnali Adatok.",
  "lead": "A 220 oldalas katalógusok helyett: Szűrje az egész PP-R/PPRCT-rendszert interaktívan. Dimenzió, nyomásfokozat, falvastagság, minden élőben.",
  "type": "Terméktípus",
  "types": {
    "mono": "PP-R Egyrétegű (Monolayer)",
    "fiber": "PPRCT Szálerősítésű (Faserverbund, GF)",
    "fitting": "Idomok (Formteile)"
  },
  "sdr": "Nyomásfokozat (SDR)",
  "maxD": "Max. Külső átmérő",
  "upTo": "eddig:",
  "maxDAria": "Maximális külső átmérő milliméterben",
  "found": "cikkváltozat található. Mindegyik azonnal elérhető falvastagsággal, belső átmérővel és névleges nyomással.",
  "catalog": "Katalógus (PDF)",
  "tableHead": [
    "Típus",
    "d (mm)",
    "SDR",
    "Fal (mm)",
    "di (mm)",
    "Névleges nyomás"
  ],
  "more": "+ {n} további. Finomítsa a szűrőket a teljes listához.",
  "none": "Nincs találat. Lazítson a szűrőkön.",
  "nextEyebrow": "Gondoljon Előre",
  "nextTitle": "Mennyire klímabarát az Ön tervezése?",
  "nextLead": "Vigye át a dimenziót és hosszt közvetlenül a CO₂-kalkulátorba, és hasonlítsa össze rézzel, rozsdamentes acéllal és PVC-vel.",
  "nextCta": "Tovább a CO₂-Kalkulátorhoz"
}`;

const replacement = '  "finder": ' + JSON.stringify(JSON.parse(repl), null, 2).split('\n').join('\n  ') + ',';

const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 2208,
  EndLine: 2238,
  Instruction: 'Replace finder',
  Description: 'Update finder object',
  AllowMultiple: false,
  TargetContent: target,
  ReplacementContent: replacement,
  toolSummary: 'Replace finder',
  toolAction: 'Replace finder'
};

fs.writeFileSync('mcp_finder.json', JSON.stringify(req, null, 2));
