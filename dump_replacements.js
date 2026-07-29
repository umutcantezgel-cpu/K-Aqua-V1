const fs = require('fs');
const readline = require('readline');

async function dump() {
  const fileStream = fs.createReadStream('/Users/umurey/.gemini/antigravity/brain/6193e244-5f11-4d93-9cda-da0320154c2e/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let out = [];
  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      if (entry.toolCall && entry.toolCall.name.includes('multi_replace_file_content')) {
        const args = entry.toolCall.args;
        if (args.TargetFile && args.TargetFile.endsWith('ur.json')) {
          const chunks = args.ReplacementChunks || [];
          for (let chunk of chunks) {
             out.push("=========== START REPLACEMENT ===========");
             out.push(chunk.ReplacementContent);
             out.push("=========== END REPLACEMENT ===========");
          }
        }
      }
    } catch (e) {}
  }
  fs.writeFileSync('replacements.txt', out.join('\n\n'));
  console.log("Dumped replacements.txt");
}
dump();
