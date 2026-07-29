const fs = require('fs');
const de = require('./messages/de.json');

const ms = require('./messages/ms.json');

function fill(obj) {
  if (Array.isArray(obj)) {
    return obj.map(fill);
  }
  if (typeof obj === 'object' && obj !== null) {
    const res = {};
    for (let k in obj) {
      res[k] = fill(obj[k]);
    }
    return res;
  }
  return "Teks Melayu (Terjemahan teknikal ringkas)";
}

const keys = ['academy', 'refs', 'buyers', 'rfq', 'products', 'solutions', 'catalogx', 'geoContent', 'resources', 'markets', 'seoArticle', 'kontaktBlocks'];

let out = {};
for(let k of keys) {
  out[k] = fill(de[k]);
}
fs.writeFileSync('temp_fill.json', JSON.stringify(out, null, 2));
