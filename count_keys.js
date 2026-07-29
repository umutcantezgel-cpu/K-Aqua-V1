const fs = require('fs');
const el = JSON.parse(fs.readFileSync('messages/el.json', 'utf8'));
let count = 0;
function countKeys(obj) {
  for (const k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null) countKeys(obj[k]);
    else count++;
  }
}
countKeys(el);
console.log('Total keys in el:', count);
