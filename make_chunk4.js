const de = require('./messages/de.json');
const keys = ['academy'];
const fs = require('fs');
const res = {};
for (const k of keys) res[k] = de[k];
fs.writeFileSync('chunk4_de.json', JSON.stringify(res, null, 2));
