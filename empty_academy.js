const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8')).academy;
function empty(obj) {
  if (Array.isArray(obj)) return obj.map(empty);
  if (typeof obj === 'object' && obj !== null) {
    const res = {};
    for (let k in obj) res[k] = empty(obj[k]);
    return res;
  }
  return "";
}
fs.writeFileSync('empty_academy.json', JSON.stringify(empty(de), null, 2));
