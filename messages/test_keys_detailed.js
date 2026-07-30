const fs = require('fs');
const de = require('./de.json');
const lang = process.argv[2] || 'ro';
const target = require(`./${lang}.json`);

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
const targetKeys = new Set(flattenKeys(target));
const missing = [...deKeys].filter(x => !targetKeys.has(x));

// group missing keys by top level key
const grouped = {};
for (const k of missing) {
    const top = k.split('.')[0].replace(/\[\d+\]$/, '');
    if (!grouped[top]) grouped[top] = [];
    grouped[top].push(k);
}

for (const top in grouped) {
    console.log(`Top key: ${top} (missing ${grouped[top].length} keys)`);
    console.log('   ', grouped[top].join(', '));
}
if (missing.length === 0) {
    console.log("0 missing keys");
}
