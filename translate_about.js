const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const zh = JSON.parse(fs.readFileSync('messages/zh-Hans.json', 'utf8'));

// Only copy structure for now so I can see what I need to translate.
// I will translate all string values into Chinese manually or by a simple placeholder script to speed up and then I'll use AI or my own knowledge to translate.
// Wait, I can just write out the fully translated JSON right now.

