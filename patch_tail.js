const fs = require('fs');
let hr = fs.readFileSync('messages/hr.json', 'utf8');
const insert = fs.readFileSync('scratch/tail_insert.txt', 'utf8');
hr = hr.replace(/  \}\n\}/, '  }' + insert);
fs.writeFileSync('messages/hr.json', hr);
console.log('patched');
