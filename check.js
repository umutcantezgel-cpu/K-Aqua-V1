const fs = require('fs');
const s2a = JSON.parse('{' + fs.readFileSync('s2a_fixed.txt', 'utf8') + '}');
const german = {};
function findGerman(obj, path='') {
  for (const k in obj) {
    if (typeof obj[k] === 'string') {
      if (obj[k].match(/\b(der|die|das|und|in|zu|für|auf|mit)\b/i) && !obj[k].match(/\b(og|i|til|for|på|med)\b/i)) {
        german[path + '.' + k] = obj[k];
      }
    } else if (typeof obj[k] === 'object') {
      findGerman(obj[k], path ? path + '.' + k : k);
    }
  }
}
findGerman(s2a);
console.log(Object.keys(german).length + ' strings found.');
