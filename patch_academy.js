const fs = require('fs');
const ro = JSON.parse(fs.readFileSync('messages/ro.json', 'utf8'));
const academy = JSON.parse(fs.readFileSync('ro_academy.json', 'utf8'));
ro.academy = academy.academy;
fs.writeFileSync('messages/ro.json', JSON.stringify(ro, null, 2));
