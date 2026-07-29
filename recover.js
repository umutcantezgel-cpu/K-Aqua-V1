const fs = require('fs');
const lines = fs.readFileSync('/Users/umurey/.gemini/antigravity/brain/7bbf7f2d-b7a3-4108-a366-86602ddcfa71/.system_generated/logs/transcript.jsonl', 'utf8').split('\n').filter(Boolean);
let patches = [];
for (let line of lines) {
  try {
    let obj = JSON.parse(line);
    if (obj.type === 'MODEL_RESPONSE' && obj.tool_calls) {
      for (let tc of obj.tool_calls) {
        if (tc.name === 'multi_replace_file_content' && tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('zh-Hans.json')) {
          patches.push(tc.args.ReplacementChunks);
        }
      }
    }
  } catch(e) {}
}
console.log('Found ' + patches.length + ' patch tool calls');
fs.writeFileSync('/tmp/patches.json', JSON.stringify(patches, null, 2));
