const fs = require('fs');
const de = require('./de.json');
const sk = require('./sk.json');

function flattenKeys(obj, prefix = '') {
    let keys = [];
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            keys = keys.concat(flattenKeys(obj[key], prefix + key + '.'));
        } else if (Array.isArray(obj[key])) {
            obj[key].forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    keys = keys.concat(flattenKeys(item, prefix + key + '[' + index + '].'));
                } else {
                    keys.push(prefix + key + '[' + index + ']');
                }
            });
        } else {
            keys.push(prefix + key);
        }
    }
    return keys;
}

const deKeys = new Set(flattenKeys(de));
const skKeys = new Set(flattenKeys(sk));
const missing = [...deKeys].filter(x => !skKeys.has(x));

console.log(`Missing keys: ${missing.length}`);
// Print top level missing keys to group them
const topLevelMissing = new Set(missing.map(k => k.split('.')[0].replace(/\[\d+\]$/, '')));
console.log('Top level missing areas:', [...topLevelMissing].join(', '));
