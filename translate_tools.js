const fs = require('fs');
const de = require('./products_de.json');
fs.writeFileSync('tools_de.json', JSON.stringify(de.tools, null, 2));
fs.writeFileSync('valves_de.json', JSON.stringify(de.valves, null, 2));
