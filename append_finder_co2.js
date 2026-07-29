const fs = require('fs');
let hu = JSON.parse(fs.readFileSync('messages/hu.json', 'utf8'));
const finderx = JSON.parse(fs.readFileSync('finderx_hu.json', 'utf8'));
const co2x = JSON.parse(fs.readFileSync('co2x_hu.json', 'utf8'));

hu.finderx = finderx.finderx;
hu.co2x = co2x.co2x;
fs.writeFileSync('messages/hu.json', JSON.stringify(hu, null, 2));
