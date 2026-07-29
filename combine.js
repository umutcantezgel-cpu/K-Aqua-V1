const fs = require('fs');
const bg = JSON.parse(fs.readFileSync('messages/bg.json', 'utf8'));
const bgKontakt = bg.kontaktBlocks;
for(let i=1; i<=4; i++) {
  const p = JSON.parse(fs.readFileSync(`kontaktBlocks_bg_${i}.json`, 'utf8'));
  Object.assign(bgKontakt, p);
}
let replacement = '  "kontaktBlocks": ' + JSON.stringify(bgKontakt, null, 2).replace(/\n/g, '\n  ') + ',';
fs.writeFileSync('kontaktBlocks_replace.txt', replacement);
