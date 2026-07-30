const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

let count = 0;
function countKeys(d) {
  for (const k in d) {
    count++;
    if (typeof d[k] === 'object' && d[k] !== null) {
      countKeys(d[k]);
    }
  }
}
countKeys(de);
console.log("Total keys in de.json:", count);
