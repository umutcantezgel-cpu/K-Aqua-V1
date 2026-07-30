const fs = require('fs');
let content = fs.readFileSync('ka.json', 'utf8');
const replacement = fs.readFileSync('patch_kontakt2.txt', 'utf8');
content = content.replace('"kontaktBlocks": {', '"kontaktBlocks": {\n' + replacement + ',');
fs.writeFileSync('ka.json', content);
