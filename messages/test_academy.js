const de = require('./de.json');
const target = require('./zh-Hant.json');
function findMissing(obj1, obj2, prefix = '') {
  let missing = [];
  for (let key in obj1) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (obj2[key] === undefined) {
      missing.push(fullKey);
    } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
      missing = missing.concat(findMissing(obj1[key], obj2[key], fullKey));
    }
  }
  return missing;
}
console.log(findMissing(de.academy, target.academy).join('\n'));
