const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const am = JSON.parse(fs.readFileSync('messages/am.json', 'utf8'));

const missingKeys = Object.keys(de).filter(k => !am.hasOwnProperty(k));

function shorten(obj) {
  if (typeof obj === 'string') return "ቧ";
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

let outStr = "";
missingKeys.forEach(k => {
  outStr += `,\n  "${k}": ` + JSON.stringify(shorten(de[k]));
});

fs.writeFileSync('remaining.json', outStr);
