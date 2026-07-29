const fs = require('fs');
const temp = require('./messages/sr_temp.json');
const sr = require('./messages/sr.json');
const de = require('./messages/de.json');

const missingKeys = Object.keys(de).filter(k => !sr[k]);
let chunks = [];
let currentChunk = {};
let count = 0;

for (const k of missingKeys) {
    currentChunk[k] = temp[k]; // Use the fully translated/shrunk version? Let's use the full version from sr_temp.json
    count++;
    if (count === 8) {
        chunks.push(currentChunk);
        currentChunk = {};
        count = 0;
    }
}
if (count > 0) chunks.push(currentChunk);

chunks.forEach((chunk, i) => {
    let injectStr = JSON.stringify(chunk, null, 2);
    injectStr = injectStr.substring(1, injectStr.length - 1);
    fs.writeFileSync(`chunk_${i}.txt`, ',' + injectStr);
    console.log(`chunk_${i}.txt: ${fs.statSync(`chunk_${i}.txt`).size} bytes`);
});
