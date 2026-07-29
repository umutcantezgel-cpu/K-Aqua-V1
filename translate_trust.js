const fs = require('fs');

const translated = {
  "trustAndCases": {
    "eyebrow": "Esettanulmányok",
    "title": "Ahol a minőség számít.",
    "lead": "A nemzetközi megaprojektektől a luxusszállodákig. A K-Aqua a megbízható csőrendszerek első számú választása világszerte.",
    "trustTitle": "Tanúsítványok, amelyekre építhet",
    "iso9001": "ISO 9001 - Minőségirányítás",
    "iso14001": "ISO 14001 - Környezetközpontú irányítás",
    "iso50001": "ISO 50001 - Energiagazdálkodás",
    "madeInGermany": "Made in Germany",
    "case1Title": "Global Data Center",
    "case1Desc": "PP-R csőrendszer egy 50 MW-os hűtőkörhöz.",
    "case2Title": "Luxus Resort Maldív-szigetek",
    "case2Desc": "Karbantartásmentes ivóvízhálózat szélsőséges éghajlati viszonyok között.",
    "case3Title": "Gyógyszeripari Gyár",
    "case3Desc": "Nagy tisztaságú folyamatvíz-vezetékek az FDA szabványoknak megfelelően."
  }
};

const lines = JSON.stringify(translated, null, 2).split('\n');
const inner = lines.slice(1, -1).map(l => '  ' + l).join('\n');
fs.writeFileSync('replace_trust.txt', inner);
