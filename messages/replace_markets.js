const fs = require('fs');
let content = fs.readFileSync('hi.json', 'utf8');
let markets = fs.readFileSync('markets_formatted.json', 'utf8');
content = content.replace('  "kontaktBlocks": {', markets + '\n  "kontaktBlocks": {');
fs.writeFileSync('hi.json', content);
