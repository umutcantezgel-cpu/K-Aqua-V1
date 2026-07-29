const fs = require('fs');
const temp = require('./messages/sr_temp.json');
const sr = require('./messages/sr.json');
const de = require('./messages/de.json');

const missingKeys = Object.keys(de).filter(k => !sr[k]);
let injectObj = {};
for (const k of missingKeys) {
    injectObj[k] = temp[k];
}

let minified = JSON.stringify(injectObj);
minified = minified.substring(1, minified.length - 1); // remove outer {}
fs.writeFileSync('inject_minified.txt', ',' + minified);
console.log("Size:", fs.statSync('inject_minified.txt').size);
