const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const key = process.argv[2];
console.log(JSON.stringify({[key]: de[key]}, null, 2));
