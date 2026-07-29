const fs = require('fs');

const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const sq = JSON.parse(fs.readFileSync('messages/sq.json', 'utf8'));

// Keys that have missing/wrong schemas:
const keysToFix = [
  'pages', 'products', 'solutions', 'service', 'about', 'co2', 'academy',
  'geoContent', 'notFound', 'productsx', 'solutionsx', 'trustx', 'resources',
  'markets', 'kontaktBlocks', 'kontaktForm', 'enterprise', 'referenzenPage'
];

function merge(deObj, sqObj) {
  if (Array.isArray(deObj)) {
    // If it's an array, we prefer the sq array if it matches in length and has no objects
    // Actually, to be safe and ensure exact schema, let's just return deObj if sqObj is missing
    if (!sqObj || !Array.isArray(sqObj) || sqObj.length !== deObj.length) return deObj;
    // If lengths match, try to use sqObj
    let newArr = [];
    for(let i=0; i<deObj.length; i++) {
      if (typeof deObj[i] === 'object' && deObj[i] !== null) {
        newArr[i] = merge(deObj[i], sqObj[i]);
      } else {
        newArr[i] = sqObj[i] !== undefined ? sqObj[i] : deObj[i];
      }
    }
    return newArr;
  } else if (typeof deObj === 'object' && deObj !== null) {
    let newObj = {};
    for (let k in deObj) {
      if (sqObj && sqObj[k] !== undefined) {
        if (typeof deObj[k] === 'object' && deObj[k] !== null) {
          newObj[k] = merge(deObj[k], sqObj[k]);
        } else {
          newObj[k] = sqObj[k];
        }
      } else {
        newObj[k] = deObj[k];
      }
    }
    return newObj;
  }
  return sqObj !== undefined ? sqObj : deObj;
}

for (const key of keysToFix) {
  const merged = merge(de[key], sq[key]);
  fs.writeFileSync(`scratch/to_translate_${key}.json`, JSON.stringify(merged, null, 2));
}

console.log("Done preparing blocks.");
