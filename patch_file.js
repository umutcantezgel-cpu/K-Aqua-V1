const fs = require('fs');
let lines = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
const seo2 = fs.readFileSync('seo2.json', 'utf8');

// Insert seo2 before "fittings": {
const insertIndex = lines.findIndex(l => l.startsWith('    "fittings": {'));
lines.splice(insertIndex, 0, seo2.slice(2, -2) + ','); // slice off opening and closing brace of seo2
fs.writeFileSync('messages/hu.json', lines.join('\n'));
