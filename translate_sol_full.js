const fs = require('fs');
let de = JSON.parse(fs.readFileSync('solutions_de.json', 'utf8'));
let huOrig = require('./messages/hu.json').solutions;

// Recursive merge, prioritizing huOrig if it's a string, else use de structure
function mergeDeep(deObj, huObj) {
  if (typeof deObj === 'string') {
    return huObj && typeof huObj === 'string' ? huObj : deObj;
  }
  if (Array.isArray(deObj)) {
    // If it's an array of strings, keep hu if length matches?
    // Let's just manually translate the missing ones.
    return deObj.map((item, i) => {
      if (typeof item === 'string') return (huObj && huObj[i]) || item;
      if (typeof item === 'object') return mergeDeep(item, huObj && huObj[i]);
      return item;
    });
  }
  if (typeof deObj === 'object' && deObj !== null) {
    let result = {};
    for (let k in deObj) {
      result[k] = mergeDeep(deObj[k], huObj ? huObj[k] : undefined);
    }
    return result;
  }
  return deObj;
}

const merged = mergeDeep(de, huOrig);
fs.writeFileSync('solutions_merged.json', JSON.stringify(merged, null, 2));
