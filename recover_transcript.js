const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('/Users/umurey/.gemini/antigravity/brain/6193e244-5f11-4d93-9cda-da0320154c2e/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let urState = fs.readFileSync('messages/ur_temp.json', 'utf8');

  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      // Check if it is a toolCall block
      if (entry.toolCall && entry.toolCall.name.includes('multi_replace_file_content')) {
        const args = entry.toolCall.args;
        if (args.TargetFile && args.TargetFile.endsWith('ur.json')) {
          const chunks = args.ReplacementChunks || [];
          for (let chunk of chunks) {
             const target = chunk.TargetContent;
             const repl = chunk.ReplacementContent;
             if (urState.includes(target)) {
                 urState = urState.replace(target, repl);
             } else {
                 console.log("Could not find target:", target.substring(0, 50));
             }
          }
        }
      }
    } catch (e) {}
  }
  fs.writeFileSync('recovered_ur.json', urState);
  console.log("Recovered size:", urState.length);
}
processLineByLine();
