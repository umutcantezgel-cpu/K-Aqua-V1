const fs = require('fs');

const de = JSON.parse(fs.readFileSync('de.json', 'utf8'));
const uk = JSON.parse(fs.readFileSync('uk.json', 'utf8'));

// We will use existing extraction but translate keys. Wait, translation needs to be done.
// Let's output the structure of academy, resources, markets into a single file to translate easily.
