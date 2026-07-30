const fs = require('fs');
const de = require('./messages/de.json');
const km = require('./messages/km.json');
const brokenTopLevel = ['products', 'solutions', 'academy', 'geoContent', 'trustx', 'partnerx', 'academyx', 'servicex', 'aboutx', 'newsx', 'contactx', 'careerx', 'refsx', 'finderx', 'co2x', 'homedeep', 'resources', 'markets', 'wissen', 'seoArticle', 'referenzenPage'];

function makeEmpty(obj) {
  if (Array.isArray(obj)) return obj.map(makeEmpty);
  if (obj && typeof obj === 'object') {
    let res = {};
    for (let k in obj) res[k] = makeEmpty(obj[k]);
    return res;
  }
  return "";
}
function merge(target, source) {
  if (Array.isArray(source)) {
    if (!Array.isArray(target)) target = [];
    for (let i = 0; i < source.length; i++) target[i] = merge(target[i], source[i]);
    return target;
  } else if (source !== null && typeof source === 'object') {
    if (target === null || typeof target !== 'object' || Array.isArray(target)) target = {};
    for (const key in source) target[key] = merge(target[key], source[key]);
    return target;
  } else {
    return target !== undefined ? target : source;
  }
}

fs.writeFileSync('p_products.txt', '  "products": ' + JSON.stringify(merge(km.products, makeEmpty(de.products))) + ',\n');
fs.writeFileSync('p_solutions.txt', '  "solutions": ' + JSON.stringify(merge(km.solutions, makeEmpty(de.solutions))) + ',\n');
