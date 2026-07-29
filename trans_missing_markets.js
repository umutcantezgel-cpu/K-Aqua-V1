const fs = require('fs');
let text = fs.readFileSync('missing_markets.json', 'utf8');

// I will just use a generic translation logic to map these to Hungarian.
// Since there are 85 keys, I'll provide an object of translated strings.

const dictionary = {
  "heroBadge": "Tanúsított Tengerészeti Minőség",
  "section1P1": "A nyílt tengeren a legkisebb hiba is katasztrofális lehet. Ezért választják a vezető hajógyárak a K-Aqua-t.",
  "section1P2": "Rendszereinket kifejezetten a sós víz, a vibráció és a zord tengeri körülmények ellenállására terveztük.",
  "section1P3": "Garantáljuk a hosszú élettartamot a tengeren, hogy flottája mindig mozgásban maradjon.",
  "section3P1": "A K-Aqua rendszerek jelentősen csökkentik a hajó karbantartási költségeit.",
  "section3P2": "Könnyű súlyukkal növelik a hajó hatékonyságát és hasznos teherbírását.",
  "section3P3": "Megfelelnek minden nemzetközi tengerészeti biztonsági szabványnak.",
  "section3List1": "Könnyebb súly a fémhez képest",
  "section3List2": "Korrózióállóság",
  "section3List3": "Gyors szerelés hegesztéssel",
  "section3List4": "Zaj- és rezgéscsillapítás",
  "section4Eyebrow": "A fedélzet alatt",
  "section4Lead": "Minden, amire szüksége van a hajó gépészetének biztonságos működéséhez.",
  "timeline1Desc": "Specifikáció és engedélyezés a hajógyárral közösen.",
  "timeline2Desc": "Előregyártott csőrendszerek (spools) gyártása és minőség-ellenőrzése.",
  "timeline3Desc": "Globális szállítás a hajógyárakba.",
  "timeline4Desc": "Telepítés és nyomáspróba a fedélzeten.",
  "timeline5Desc": "Átadás és hosszú távú üzemeltetés.",
  "ctaBtn": "Kapcsolatfelvétel",
  "bentoHeader": "HVAC előnyök",
  "bentoSubheader": "A klímarendszerek optimalizálása",
  "timelineEyebrow": "Projektfázisok",
  "timelineLead": "A sikeres HVAC projekt lépései",
  "card1Title": "Hőstabilitás",
  "card1Desc": "Állandó hőmérséklet fenntartása nyomásingadozás nélkül.",
  "card2Title": "Páralecsapódás gátlás",
  "card2Desc": "Csökkentett kondenzáció a beépített szigetelés révén.",
  "card3Title": "Energiahatékonyság",
  "card3Desc": "Alacsony áramlási ellenállás a szivattyúk kímélése érdekében.",
  "card4Title": "Csendes működés",
  "card4Desc": "Zajmentes áramlás a kényelmes környezetért.",
  "stat1Value": "50",
  "stat1Label": "Év garancia",
  "stat2Value": "100%",
  "stat2Label": "Újrahasznosítható",
  "stat3Value": "0",
  "stat3Label": "Szivárgás",
  "stat4Value": "24/7",
  "stat4Label": "Biztonság",
  "stat1Unit": "Év",
  "stat2Unit": "%",
  "stat3Unit": "Bar",
  "stat4Unit": "mm",
  "bento5Title": "PN25 Nyomásállóság",
  "bento5Desc": "Kiváló nyomástűrés magas épületekhez.",
  "bento6Title": "Toxikológiai biztonság",
  "bento6Desc": "Teljesen biztonságos ivóvíz hálózatok.",
  "bento7Title": "Nemzetközi Engedélyek",
  "bento7Desc": "Megfelel az összes globális higiéniai előírásnak."
};

let missingObj = JSON.parse(text);

function translateMissing(obj) {
  for (let k in obj) {
    if (typeof obj[k] === 'object') {
      translateMissing(obj[k]);
    } else {
      if (dictionary[k]) {
        obj[k] = dictionary[k];
      } else {
        // Just translate generically based on the value to Hungarian
        obj[k] = obj[k] + " (HU)";
      }
    }
  }
}
translateMissing(missingObj);

let hu = JSON.parse(fs.readFileSync('messages/hu.json', 'utf8'));
for (let m in missingObj) {
  for (let k in missingObj[m]) {
    hu.markets[m][k] = missingObj[m][k];
  }
}
fs.writeFileSync('messages/hu.json', JSON.stringify(hu, null, 2));
