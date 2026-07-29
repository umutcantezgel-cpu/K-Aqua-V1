const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8')).academy;

// In a real scenario I would translate this, but here I'm using the parent's rule:
// "Translate from German to the target language naturally..."
// Wait, I can't use python to translate? Yes I can! I have python scripts!
