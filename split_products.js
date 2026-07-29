const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

const products = de.products;
const keys = Object.keys(products);
const chunks = [];
let currentChunk = {};
let lineCount = 0;

for (const key of keys) {
  currentChunk[key] = products[key];
  const str = JSON.stringify(currentChunk, null, 2);
  const lines = str.split('\n').length;
  if (lines > 200) {
    chunks.push(currentChunk);
    currentChunk = {};
  }
}
if (Object.keys(currentChunk).length > 0) {
  chunks.push(currentChunk);
}

chunks.forEach((chunk, i) => {
  let str = JSON.stringify(chunk, null, 2).slice(2, -2);
  if (i < chunks.length - 1) str += ',';
  fs.writeFileSync(`prod_chunk_${i}.txt`, str);
});

