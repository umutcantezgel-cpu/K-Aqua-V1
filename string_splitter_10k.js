const fs = require('fs');
const content = fs.readFileSync('inject_shrunk.txt', 'utf8');
const chunkSize = 10000;
let chunks = [];
for (let i = 0; i < content.length; i += chunkSize) {
    chunks.push(content.substring(i, i + chunkSize));
}
chunks.forEach((chunk, i) => {
    fs.writeFileSync(`chunk10k_${i}.txt`, chunk);
});
console.log(`Created ${chunks.length} chunks of 10KB.`);
