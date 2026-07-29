const fs = require('fs');
let data = JSON.parse(fs.readFileSync('messages/is.json', 'utf8'));

// Delete corrupted trust and partner
delete data.trust;
delete data.partner;

// Load translated content
const academyObj = require('./tmp_academy_is.json'); 
const otherObj = require('./tmp_other_is.json');

Object.assign(data, otherObj); // wait I'll construct it in JS

fs.writeFileSync('messages/is.json', JSON.stringify(data, null, 2));
