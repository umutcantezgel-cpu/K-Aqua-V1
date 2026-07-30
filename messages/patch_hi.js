const fs = require('fs');
let content = fs.readFileSync('hi.json', 'utf8');
let markets = fs.readFileSync('markets_formatted.json', 'utf8');
let kb = fs.readFileSync('hi_kontaktBlocks_tmp_indented.txt', 'utf8');
content = content.replace('  "kontaktForm": {', markets + '\n' + kb + '\n  "kontaktForm": {');
fs.writeFileSync('hi.json', content);
