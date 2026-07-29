const fs = require('fs');
const ur = JSON.parse(fs.readFileSync('./messages/ur.json', 'utf8'));
const chunk7 = JSON.parse(fs.readFileSync('nav_chunk7_ur.json', 'utf8'));
const chunk8 = JSON.parse(fs.readFileSync('nav_chunk8_ur.json', 'utf8'));

Object.assign(ur, chunk7);
Object.assign(ur, chunk8);

fs.writeFileSync('./messages/ur.json', JSON.stringify(ur, null, 2));
