const fs = require('fs');
const fast = JSON.parse(fs.readFileSync('translated_fast.json', 'utf8'));

const append1 = ',\n  "academyx": ' + JSON.stringify(fast.academyx, null, 2).replace(/\n/g, '\n  ') +
                ',\n  "legal": ' + JSON.stringify(fast.legal, null, 2).replace(/\n/g, '\n  ') + '\n}';

fs.writeFileSync('append1.txt', append1);
