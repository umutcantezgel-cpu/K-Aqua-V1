const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const chunks = 7;
const keys = Object.keys(de);
const chunkSize = Math.ceil(keys.length / chunks);

for (let i = 0; i < chunks; i++) {
  const chunkKeys = keys.slice(i * chunkSize, (i + 1) * chunkSize);
  const chunkObj = {};
  for (const k of chunkKeys) {
    chunkObj[k] = de[k];
  }
  fs.writeFileSync(`/Users/umurey/.gemini/antigravity/brain/31e7d92b-6868-40ed-921f-a4dc6a2f22f3/scratch/de_part${i + 1}.json`, JSON.stringify(chunkObj, null, 2));
  console.log(`Part ${i + 1} keys:`, chunkKeys.length);
}
