const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const it = JSON.parse(fs.readFileSync('messages/it.json', 'utf8'));

function extractMissing(obj1, obj2) {
  let missing = {};
  for (const key in obj1) {
    if (obj2[key] === undefined) {
      missing[key] = obj1[key];
    } else if (typeof obj1[key] === 'object' && obj1[key] !== null && !Array.isArray(obj1[key])) {
      const nested = extractMissing(obj1[key], obj2[key]);
      if (Object.keys(nested).length > 0) {
        missing[key] = nested;
      }
    } else if (Array.isArray(obj1[key])) {
        // Only array elements that are missing based on index
        if (!Array.isArray(obj2[key])) {
            missing[key] = obj1[key];
        } else if (obj1[key].length > obj2[key].length) {
            missing[key] = missing[key] || [];
            for (let i = obj2[key].length; i < obj1[key].length; i++) {
                missing[key][i] = obj1[key][i];
            }
        }
    }
  }
  return missing;
}

const missingIT = extractMissing(de, it);
fs.writeFileSync('/tmp/missing_it.json', JSON.stringify(missingIT, null, 2));
console.log("Missing extracted to /tmp/missing_it.json");
