const fs = require('fs');
let lt = fs.readFileSync('lt.json', 'utf8');
const p1 = fs.readFileSync('patch_markets_1.json', 'utf8');
const p2 = fs.readFileSync('patch_markets_2.json', 'utf8');
const combined = p1 + p2;

lt = lt.replace('"kontaktBlocks": {\n', combined + ',\n  "kontaktBlocks": {\n');
fs.writeFileSync('lt.json', lt);
