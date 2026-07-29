const fs = require('fs');
const hr = require('./messages/hr.json');
hr.legal.toc = "Sadržaj";
hr.legal.eyebrow = "Pravno";
fs.writeFileSync('messages/hr.json', JSON.stringify(hr, null, 2));
console.log('patched legal');
