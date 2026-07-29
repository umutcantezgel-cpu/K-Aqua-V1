const fs = require('fs');
const target = `      {
        "q": "Mi történik a megadott adataimmal?",
        "a": "Az ezen az oldalon lévő űrlap nem ment el semmilyen adatot szerveren. Csak egy 'mailto' linket generál, amely megnyitja a helyi e-mail programját. Az adatok csak akkor kerülnek továbbításra, amikor elküldi az e-mailt."
      }`;
const repl = `      {
        "q": "Mi történik a megadott adataimmal?",
        "a": "Az ezen az oldalon lévő űrlap nem ment el semmilyen adatot szerveren. Csak egy 'mailto' linket generál, amely megnyitja a helyi e-mail programját. Az adatok csak akkor kerülnek továbbításra, amikor elküldi az e-mailt."
      },
      {
        "q": "Mennyire biztonságosak az adataim?",
        "a": "Az Ön által megadott adatok nem kerülnek mentésre a szerveren, hanem közvetlenül az Ön e-mail programjába kerülnek, ahonnan biztonságosan elküldheti nekünk a kérést. Adatait szigorúan bizalmasan kezeljük, a hatályos GDPR irányelveknek megfelelően."
      }`;

const request = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 2521,
  EndLine: 2524,
  Instruction: 'Replace rfq faqs',
  Description: 'Add missing faq',
  AllowMultiple: false,
  TargetContent: target,
  ReplacementContent: repl,
  toolSummary: 'Replace rfq',
  toolAction: 'Replace rfq'
};
fs.writeFileSync('mcp_rfq_payload.json', JSON.stringify(request));
