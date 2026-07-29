const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const sk = JSON.parse(fs.readFileSync('messages/sk.json', 'utf8'));

function findMissing(deObj, skObj, path = '') {
  let missing = [];
  for (let key in deObj) {
    if (skObj === undefined || skObj[key] === undefined) {
      missing.push(path ? `${path}.${key}` : key);
    } else if (typeof deObj[key] === 'object' && deObj[key] !== null) {
      missing = missing.concat(findMissing(deObj[key], skObj[key], path ? `${path}.${key}` : key));
    }
  }
  return missing;
}

const missing = findMissing(de, sk);
const missingTopLevel = new Set(missing.map(p => p.split('.')[0]));
console.log("Missing top-level segments:");
for (let key of missingTopLevel) {
  const allForThis = missing.filter(p => p.startsWith(key + '.') || p === key);
  console.log(`- ${key}: ${allForThis.length} keys missing`);
}
