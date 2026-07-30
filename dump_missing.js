const fs = require('fs');
const de = require('./messages/de.json');
const my = require('./messages/my.json');

function findMissing(source, target) {
  let missing = {};
  let hasMissing = false;
  for (let key in source) {
    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      if (!target || !target[key]) {
        missing[key] = source[key];
        hasMissing = true;
      } else {
        let nested = findMissing(source[key], target[key]);
        if (nested !== null) {
          missing[key] = nested;
          hasMissing = true;
        }
      }
    } else if (Array.isArray(source[key])) {
        if (!target || !target[key]) {
            missing[key] = source[key];
            hasMissing = true;
        } else {
            // Check array elements (assuming object elements)
            let arrMissing = [];
            let arrHasMissing = false;
            for(let i=0; i<source[key].length; i++) {
                if (typeof source[key][i] === 'object' && source[key][i] !== null) {
                    if (!target[key][i]) {
                        arrMissing[i] = source[key][i];
                        arrHasMissing = true;
                    } else {
                        let nested = findMissing(source[key][i], target[key][i]);
                        if (nested !== null) {
                            arrMissing[i] = nested;
                            arrHasMissing = true;
                        } else {
                            arrMissing[i] = {}; // empty object to keep index
                        }
                    }
                } else {
                    if (target[key][i] === undefined) {
                        arrMissing[i] = source[key][i];
                        arrHasMissing = true;
                    } else {
                        arrMissing[i] = target[key][i]; // keeping it for structure? Or leave undefined
                    }
                }
            }
            if (arrHasMissing) {
                missing[key] = arrMissing;
                hasMissing = true;
            }
        }
    } else {
      if (!target || target[key] === undefined) {
        missing[key] = source[key];
        hasMissing = true;
      }
    }
  }
  return hasMissing ? missing : null;
}

const missingKeys = findMissing(de, my);
fs.writeFileSync('scratch/missing_my.json', JSON.stringify(missingKeys, null, 2));
console.log("Missing keys dumped to scratch/missing_my.json");
