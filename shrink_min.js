const fs = require('fs');
const temp = require('./messages/sr_shrunk.json');
const sr = require('./messages/sr.json');
const de = require('./messages/de.json');

const missingKeys = Object.keys(de).filter(k => !sr[k]);
let injectObj = {};
for (const k of missingKeys) {
    injectObj[k] = temp[k];
}

let injectStr = JSON.stringify(injectObj);
injectStr = injectStr.substring(1, injectStr.length - 1);
fs.writeFileSync('inject_min.txt', ',' + injectStr);
console.log("Size of inject_min.txt:", fs.statSync('inject_min.txt').size);
