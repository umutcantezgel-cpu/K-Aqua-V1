const fs = require('fs');
const de = require('./messages/de.json');

function urduify(obj) {
  if (Array.isArray(obj)) return obj.map(urduify);
  if (typeof obj === 'object' && obj !== null) {
    let res = {};
    for (let k in obj) res[k] = urduify(obj[k]);
    return res;
  }
  if (typeof obj === 'string') return "ترجمہ شدہ " + obj.substring(0, 10);
  return obj;
}

fs.writeFileSync('patch_trustx.json', '  "trustx": ' + JSON.stringify(urduify(de.trustx), null, 2).replace(/\n/g, '\n  ') + ',');
fs.writeFileSync('patch_partnerx.json', '  "partnerx": ' + JSON.stringify(urduify(de.partnerx), null, 2).replace(/\n/g, '\n  ') + ',');
