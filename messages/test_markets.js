const de = require('./de.json');
const lv = require('./lv.json');

function getMissingKeys(obj1, obj2, prefix = '') {
  let missing = [];
  for (let key in obj1) {
    if (typeof obj1[key] === 'object' && obj1[key] !== null && !Array.isArray(obj1[key])) {
      if (!obj2 || !obj2.hasOwnProperty(key)) {
        missing.push(prefix + key + ' (whole object)');
      } else {
        missing = missing.concat(getMissingKeys(obj1[key], obj2[key], prefix + key + '.'));
      }
    } else if (Array.isArray(obj1[key])) {
      if (!obj2 || !obj2.hasOwnProperty(key)) {
        missing.push(prefix + key + ' (array)');
      } else {
        for (let i = 0; i < obj1[key].length; i++) {
          if (!obj2[key][i]) {
            missing.push(prefix + key + '[' + i + ']');
          } else if (typeof obj1[key][i] === 'object' && obj1[key][i] !== null) {
            missing = missing.concat(getMissingKeys(obj1[key][i], obj2[key][i], prefix + key + '[' + i + '].'));
          }
        }
      }
    } else {
      if (!obj2 || !obj2.hasOwnProperty(key)) {
        missing.push(prefix + key);
      }
    }
  }
  return missing;
}

const missing = getMissingKeys(de.markets, lv.markets, 'markets.');
console.log(missing.join('\n'));
