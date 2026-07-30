const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const aca = de.academy;

const rootKeys = {};
for (const key of Object.keys(aca)) {
    if (key !== 'schulungen' && key !== 'zertifizierung' && key !== 'glossar') {
        rootKeys[key] = aca[key];
    }
}

fs.writeFileSync('academy_root.json', JSON.stringify(rootKeys, null, 2));
fs.writeFileSync('academy_schulungen.json', JSON.stringify(aca.schulungen, null, 2));
fs.writeFileSync('academy_zertifizierung.json', JSON.stringify(aca.zertifizierung, null, 2));
fs.writeFileSync('academy_glossar.json', JSON.stringify(aca.glossar, null, 2));
