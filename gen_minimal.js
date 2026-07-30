const fs = require('fs');
const de = require('./messages/de.json');

function minifyObj(obj) {
  if (Array.isArray(obj)) {
    return obj.map(minifyObj);
  } else if (obj !== null && typeof obj === 'object') {
    const res = {};
    for (const key in obj) {
      res[key] = minifyObj(obj[key]);
    }
    return res;
  } else {
    return "ភាសាខ្មែរ"; // "Khmer language" in Khmer
  }
}

const km = require('./messages/km.json');
const brokenTopLevel = [
  'products', 'solutions', 'academy', 'geoContent',
  'trustx', 'partnerx', 'academyx', 'servicex',
  'aboutx', 'newsx', 'contactx', 'careerx',
  'refsx', 'finderx', 'co2x', 'homedeep',
  'resources', 'markets', 'wissen', 'seoArticle',
  'referenzenPage'
];

for (const key of brokenTopLevel) {
  km[key] = minifyObj(de[key]);
}

fs.writeFileSync('minimal_missing.json', JSON.stringify(km, null, 2));
