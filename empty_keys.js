const fs = require('fs');
const de = require('./messages/de.json');
const sr = require('./messages/sr.json');

function empty(node) {
    if (typeof node === 'string') return "";
    if (Array.isArray(node)) return node.map(empty);
    if (typeof node === 'object' && node !== null) {
        const obj = {};
        for (const [k, v] of Object.entries(node)) {
            obj[k] = empty(v);
        }
        return obj;
    }
    return node;
}

const emptyObj = empty(de);
const missingKeys = Object.keys(de).filter(k => !sr[k]);

let injectObj = {};
for (const k of missingKeys) {
    injectObj[k] = emptyObj[k];
}

let minified = JSON.stringify(injectObj);
minified = minified.substring(1, minified.length - 1);
fs.writeFileSync('inject_empty.txt', ',' + minified);
console.log("Size:", fs.statSync('inject_empty.txt').size);
