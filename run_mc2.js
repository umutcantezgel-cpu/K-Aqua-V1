const fs = require('fs');
const mc2 = JSON.parse(fs.readFileSync('mc2.json', 'utf8'));
const esStr = fs.readFileSync('messages/es.json', 'utf8');

const validChunks = mc2.filter(c => esStr.includes(c.TargetContent));
console.log('Valid chunks:', validChunks.length, '/', mc2.length);
fs.writeFileSync('mc2_valid.json', JSON.stringify(validChunks, null, 2));
