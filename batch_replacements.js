const fs = require('fs');

const reps = JSON.parse(fs.readFileSync('micro_replacements.json', 'utf8'));

// We want to group reps into batches so each batch is at most 10KB
let batches = [];
let currentBatch = [];
let currentSize = 0;

for (const r of reps) {
  const size = JSON.stringify(r).length;
  if (size > 15000) {
    // If a single replacement is > 15KB, we need to split it!
    // But since it's just one replacement chunk, we can't easily split it without changing the JSON structure.
    // Let's just put it in its own batch and hope the LLM can output 26KB.
    if (currentBatch.length > 0) {
      batches.push(currentBatch);
      currentBatch = [];
      currentSize = 0;
    }
    batches.push([r]);
  } else {
    if (currentSize + size > 15000) {
      batches.push(currentBatch);
      currentBatch = [r];
      currentSize = size;
    } else {
      currentBatch.push(r);
      currentSize += size;
    }
  }
}
if (currentBatch.length > 0) {
  batches.push(currentBatch);
}

batches.forEach((b, i) => {
  fs.writeFileSync(`batch_${i}.json`, JSON.stringify(b, null, 2));
  console.log(`Batch ${i} has ${b.length} replacements, size: ${JSON.stringify(b).length} bytes`);
});
