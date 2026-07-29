const fs = require('fs');
let tools = fs.readFileSync('tools_da.json', 'utf8').trim();
let valves = fs.readFileSync('valves_da.json', 'utf8').trim();

const content = '  "tools": ' + tools + ',\n  "valves": ' + valves + ',';
fs.writeFileSync('new_block.txt', content);
