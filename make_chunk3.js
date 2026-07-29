const de = require('./messages/de.json');
const keys = ['finder'];
const fs = require('fs');
const res = {};
for (const k of keys) res[k] = de[k];
fs.writeFileSync('chunk3_de.json', JSON.stringify(res, null, 2));
