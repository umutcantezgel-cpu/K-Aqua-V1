const fs = require('fs');
const de = require('./messages/de.json').finder;

const translated = {
  "finder": {
    "eyebrow": "Termékkereső",
    "title1": "A tökéletes",
    "titleGrad": "rendszer. Azonnal.",
    "lead": "Szűrje rendszereinket csőtípus, nyomásosztály (SDR) és átmérő alapján, hogy pontosan megtalálja projektje igényeinek megfelelő megoldást.",
    "type": "Csőtípus",
    "types": {
      "all": "Összes típus",
      "faser": "Szálerősítésű csövek (Faser)",
      "stabi": "Stabi (Alumínium betétes)",
      "standard": "Standard (Egyrétegű)"
    },
    "sdr": "SDR (Nyomásosztály)",
    "maxD": "Max. Külső Átmérő (mm)",
    "upTo": "-ig",
    "maxDAria": "Válassza ki a maximális átmérőt",
    "found": "Megfelelő csövek",
    "catalog": "Teljes katalógus letöltése",
    "tableHead": {
      "name": "Termék",
      "sdr": "SDR",
      "range": "Mérettartomány",
      "app": "Alkalmazás"
    },
    "more": "További részletek",
    "none": "Nincs találat a megadott feltételekkel. Kérjük, módosítsa a szűrőket.",
    "nextEyebrow": "Telepítés",
    "nextTitle": "A hibátlan kapcsolat",
    "nextLead": "A K-Aqua rendszereket úgy tervezték, hogy másodpercek alatt homogénen hegeszthetők legyenek.",
    "nextCta": "Ismerje meg a hegesztési eljárásokat"
  }
};

const lines = JSON.stringify(translated, null, 2).split('\n');
const inner = lines.slice(1, -1).map(l => '  ' + l).join('\n');
fs.writeFileSync('replace_finder.txt', inner);
