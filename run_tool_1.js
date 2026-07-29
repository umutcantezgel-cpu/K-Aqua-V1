const fs = require('fs');
const chunks = JSON.parse(fs.readFileSync('tool_chunks_1.json', 'utf8'));
const esStr = fs.readFileSync('messages/es.json', 'utf8');

const validChunks = chunks.filter(c => esStr.includes(c.TargetContent));
console.log('Valid chunks:', validChunks.length, '/', chunks.length);
fs.writeFileSync('tool_1_valid.json', JSON.stringify(validChunks, null, 2));
