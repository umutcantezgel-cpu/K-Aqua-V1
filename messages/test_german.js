const fs = require('fs');
const de = require('./de.json');
const vi = require('./vi.json');

function findUntranslated(deObj, targetObj, prefix = '') {
    let untranslated = [];
    for (const key in deObj) {
        if (typeof deObj[key] === 'object' && deObj[key] !== null && !Array.isArray(deObj[key])) {
            if (targetObj && targetObj[key]) {
                untranslated = untranslated.concat(findUntranslated(deObj[key], targetObj[key], prefix + key + '.'));
            }
        } else if (Array.isArray(deObj[key])) {
            deObj[key].forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    if (targetObj && targetObj[key] && targetObj[key][index]) {
                        untranslated = untranslated.concat(findUntranslated(item, targetObj[key][index], prefix + key + '[' + index + '].'));
                    }
                } else {
                    if (targetObj && targetObj[key] && deObj[key][index] === targetObj[key][index] && typeof deObj[key][index] === 'string' && deObj[key][index] !== "") {
                        // Some words might be same, but let's just log them
                        untranslated.push(prefix + key + '[' + index + ']');
                    }
                }
            });
        } else {
            if (targetObj && targetObj[key] === deObj[key] && typeof deObj[key] === 'string' && deObj[key] !== "" && deObj[key].length > 3) {
                 // Check if it's not just a brand name or number
                 if (!deObj[key].match(/^([A-Z0-9\s\.\,\-]+)$/)) {
                     untranslated.push({ key: prefix + key, val: deObj[key]});
                 }
            }
        }
    }
    return untranslated;
}

const res = findUntranslated(de, vi);
console.log(JSON.stringify(res, null, 2));
