const fs = require('fs');
const de = require('./messages/de.json');
let km = require('./messages/km.json');

function makeEmpty(obj) {
  if (Array.isArray(obj)) return obj.map(makeEmpty);
  if (obj && typeof obj === 'object') {
    let res = {};
    for (let k in obj) res[k] = makeEmpty(obj[k]);
    return res;
  }
  return "ភាសាខ្មែរ";
}

const brokenTopLevel = [
  'products', 'solutions', 'academy', 'geoContent',
  'trustx', 'partnerx', 'academyx', 'servicex',
  'aboutx', 'newsx', 'contactx', 'careerx',
  'refsx', 'finderx', 'co2x', 'homedeep',
  'resources', 'markets', 'wissen', 'seoArticle',
  'referenzenPage'
];

let res = {};
for (let k of brokenTopLevel) res[k] = makeEmpty(de[k]);
console.log(JSON.stringify(res).length);
