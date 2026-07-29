const fs = require('fs');
const temp = require('./messages/sr_temp.json');

function shrink(node) {
    if (typeof node === 'string') {
        if (node.length > 30) {
            return node.substring(0, 30) + "...";
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
fs.writeFileSync('messages/sr_shrunk.json', JSON.stringify(shrunk, null, 2));

const de = require('./messages/de.json');
const missingKeys = Object.keys(de).filter(k => {
    // we will inject everything that is in sr_shrunk but not in sr
    const sr = require('./messages/sr.json');
    return !sr[k];
});

let injectObj = {};
for (const k of missingKeys) {
    injectObj[k] = shrunk[k];
}

let injectStr = JSON.stringify(injectObj, null, 2);
injectStr = injectStr.substring(1, injectStr.length - 1);
fs.writeFileSync('inject_shrunk.txt', ',' + injectStr);

console.log("Size of inject_shrunk.txt:", fs.statSync('inject_shrunk.txt').size);
