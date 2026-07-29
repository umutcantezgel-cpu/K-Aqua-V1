const fs = require('fs');
const content = fs.readFileSync('inject_minified.txt', 'utf8');
const chunkSize = 25000;
let chunks = [];
for (let i = 0; i < content.length; i += chunkSize) {
    chunks.push(content.substring(i, i + chunkSize));
}
chunks.forEach((chunk, i) => {
    fs.writeFileSync(`chunk_${i}.txt`, chunk);
});
console.log(`Created ${chunks.length} chunks.`);
