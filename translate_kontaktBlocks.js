const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8')).kontaktBlocks;
fs.writeFileSync('de_kontaktBlocks.json', JSON.stringify(de, null, 2));
