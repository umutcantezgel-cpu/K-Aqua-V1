const fs = require('fs');
const missing = JSON.parse(fs.readFileSync('missing_de.json', 'utf8'));
const keys = Object.keys(missing);
const chunkSize = 200;
let chunkIndex = 1;

for (let i = 0; i < keys.length; i += chunkSize) {
  const chunk = {};
  for (let j = i; j < i + chunkSize && j < keys.length; j++) {
    chunk[keys[j]] = missing[keys[j]];
  }
  fs.writeFileSync(`missing_de_part${chunkIndex}.json`, JSON.stringify(chunk, null, 2));
  chunkIndex++;
}
console.log('Split into', chunkIndex - 1, 'parts');
