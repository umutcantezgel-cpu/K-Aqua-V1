const fs = require('fs');
const my = JSON.parse(fs.readFileSync('messages/my.json', 'utf8'));
const keys = Object.keys(my);
console.log(keys[keys.length - 1]);
