const de = require('./messages/de.json');
const keys = ['menu', 'navigation', 'seo', 'quote', 'markets', 'resources', 'wissen', 'bim', 'ausschreibungstexte'];
const res = {};
for (const k of keys) res[k] = de[k];
const fs = require('fs');
fs.writeFileSync('chunk7_de.json', JSON.stringify(res, null, 2));
