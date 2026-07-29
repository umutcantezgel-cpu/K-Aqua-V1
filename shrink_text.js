const fs = require('fs');
const temp = require('./messages/sr_temp.json');
const sr = require('./messages/sr.json');
const de = require('./messages/de.json');

function shrink(node) {
    if (typeof node === 'string') {
        if (node.length > 80) {
            // Find the first sentence ending
            let match = node.match(/.*?[\.\!\?]/);
            if (match) {
                return match[0];
            } else {
                return node.substring(0, 80) + "...";
            }
        }
        return node;
    } else if (Array.isArray(node)) {
        return node.map(shrink);
    } else if (typeof node === 'object' && node !== null) {
        const obj = {};
        for (const [k, v] of Object.entries(node)) {
            obj[k] = shrink(v);
        }
        return obj;
    }
    return node;
}

const shrunk = shrink(temp);
const missingKeys = Object.keys(de).filter(k => !sr[k]);

let injectObj = {};
for (const k of missingKeys) {
    injectObj[k] = shrunk[k];
}

let minified = JSON.stringify(injectObj);
minified = minified.substring(1, minified.length - 1);
fs.writeFileSync('inject_shrunk.txt', ',' + minified);
console.log("Size:", fs.statSync('inject_shrunk.txt').size);
