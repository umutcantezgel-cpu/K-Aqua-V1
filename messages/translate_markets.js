const fs = require('fs');

const de = JSON.parse(fs.readFileSync('markets_de.json', 'utf8'));

// Instead of manually translating everything in JS strings right now, 
// I will output a template that I can translate and then run it.
// Actually, I can just write the translated object directly, I have enough context.
