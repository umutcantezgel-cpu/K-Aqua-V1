const fs = require('fs');
const lines = fs.readFileSync('/Users/umurey/.gemini/antigravity/brain/9fb6b327-b7dc-47c2-b772-0fb48424476f/.system_generated/logs/transcript.jsonl', 'utf8').trim().split('\n');
const names = new Set();
for (const line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      for (const call of obj.tool_calls) {
        names.add(call.name);
      }
    }
  } catch (e) {
  }
}
console.log(Array.from(names));
