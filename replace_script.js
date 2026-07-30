const fs = require('fs');
let txt = fs.readFileSync('step1_replacement.txt', 'utf8');
let km = fs.readFileSync('messages/km.json', 'utf8');

let lines = km.split('\n');
let before = lines.slice(0, 5530).join('\n');
let final = before + '\n' + txt;
fs.writeFileSync('messages/km.json', final);
