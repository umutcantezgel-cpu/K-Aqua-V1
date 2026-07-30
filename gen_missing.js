const fs = require('fs');
const de = require('./messages/de.json');
const km = require('./messages/km.json');

const brokenTopLevel = [
  'products', 'solutions', 'academy', 'geoContent',
  'trustx', 'partnerx', 'academyx', 'servicex',
  'aboutx', 'newsx', 'contactx', 'careerx',
  'refsx', 'finderx', 'co2x', 'homedeep',
  'resources', 'markets', 'wissen', 'seoArticle',
  'referenzenPage'
];

let out = "";
for (let i = 0; i < brokenTopLevel.length; i++) {
  const key = brokenTopLevel[i];
  const objStr = JSON.stringify(de[key], null, 2);
  out += `  "${key}": ` + objStr;
  if (i < brokenTopLevel.length - 1) {
    out += ",\n";
  }
}
fs.writeFileSync('missing.txt', out);
