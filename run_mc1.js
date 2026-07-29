const fs = require('fs');
const mc1 = JSON.parse(fs.readFileSync('mc1.json', 'utf8'));
const esStr = fs.readFileSync('messages/es.json', 'utf8');

const validChunks = mc1.filter(c => esStr.includes(c.TargetContent));
console.log('Valid chunks:', validChunks.length, '/', mc1.length);
fs.writeFileSync('mc1_valid.json', JSON.stringify(validChunks, null, 2));
