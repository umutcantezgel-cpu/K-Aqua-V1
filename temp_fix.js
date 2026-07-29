const fs = require('fs');
let data = fs.readFileSync('messages/bn.json', 'utf8');
data = data.trim().replace(/}$/, '').replace(/}$/, '}\n}');
fs.writeFileSync('messages/bn.json', data);
