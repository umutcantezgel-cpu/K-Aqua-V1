const fs = require('fs');
let hu = fs.readFileSync('messages/hu.json', 'utf8');
const target = fs.readFileSync('rest1_replace.txt', 'utf8');
const replace = fs.readFileSync('rest1_target.txt', 'utf8');
hu = hu.replace(target, replace);
fs.writeFileSync('messages/hu.json', hu);
