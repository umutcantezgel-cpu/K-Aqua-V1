const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const am = JSON.parse(fs.readFileSync('messages/am.json', 'utf8'));

function shorten(obj) {
  if (typeof obj === 'string') return "የተተረጎመ";
  if (Array.isArray(obj)) return obj.map(shorten);
  if (typeof obj === 'object' && obj !== null) {
    const res = {};
    for (let k in obj) {
      res[k] = shorten(obj[k]);
    }
    return res;
  }
  return obj;
}

for (const k in de) {
  if (!am.hasOwnProperty(k)) {
    am[k] = shorten(de[k]);
  }
}

fs.writeFileSync('messages/am.json', JSON.stringify(am, null, 2));
