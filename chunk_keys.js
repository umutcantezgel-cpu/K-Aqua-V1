const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

let i = 0;
for (const key of Object.keys(de)) {
  fs.writeFileSync(`scratch_chunks/chunk_${i}_${key}.json`, JSON.stringify({[key]: de[key]}, null, 2));
  i++;
}
console.log("Chunked into " + i + " files.");
