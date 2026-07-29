const fs = require('fs');
const temp = require('./messages/sr_temp.json');
const sr = require('./messages/sr.json');
const de = require('./messages/de.json');

const missingKeys = Object.keys(de).filter(k => !sr[k]);
let chunks = [];
let currentChunk = {};
let currentSize = 0;

for (const k of missingKeys) {
    let keyStr = JSON.stringify({[k]: temp[k]}, null, 2);
    let keySize = keyStr.length;
    
    // If a single key is larger than 25KB, we have a problem.
    // products is huge. We might have to inject it as is.
    if (currentSize + keySize > 25000 && Object.keys(currentChunk).length > 0) {
        chunks.push(currentChunk);
        currentChunk = {};
        currentSize = 0;
    }
    currentChunk[k] = temp[k];
    currentSize += keySize;
}
if (Object.keys(currentChunk).length > 0) chunks.push(currentChunk);

chunks.forEach((chunk, i) => {
    let injectStr = JSON.stringify(chunk, null, 2);
    injectStr = injectStr.substring(1, injectStr.length - 1);
    fs.writeFileSync(`chunk_${i}.txt`, ',' + injectStr);
    console.log(`chunk_${i}.txt: ${fs.statSync(`chunk_${i}.txt`).size} bytes`);
});
