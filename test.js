const fs = require('fs');
const content = fs.readFileSync('messages/el.json', 'utf8');
const lines = content.split('\n');
const target = lines.slice(3630, 3763).join('\n');
fs.writeFileSync('target.txt', target);
