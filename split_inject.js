const fs = require('fs');
const de = require('./messages/de.json');
const sr = require('./messages/sr.json');
const sr_temp = require('./messages/sr_temp.json');

const missingKeys = Object.keys(de).filter(k => !sr[k]);

let batchNum = 1;
let currentBatch = {};
let count = 0;

for (const k of missingKeys) {
    currentBatch[k] = sr_temp[k];
    count++;
    
    // Group roughly by 5 keys or if it's the large products block, keep it separate
    if (count >= 3 || k === 'products' || k === 'solutions') {
        let injectStr = JSON.stringify(currentBatch, null, 2);
        injectStr = injectStr.substring(1, injectStr.length - 1);
        fs.writeFileSync(`inject_batch_${batchNum}.txt`, ',' + injectStr);
        batchNum++;
        currentBatch = {};
        count = 0;
    }
}

if (count > 0) {
    let injectStr = JSON.stringify(currentBatch, null, 2);
    injectStr = injectStr.substring(1, injectStr.length - 1);
    fs.writeFileSync(`inject_batch_${batchNum}.txt`, ',' + injectStr);
}

console.log(`Generated ${batchNum} batches.`);
