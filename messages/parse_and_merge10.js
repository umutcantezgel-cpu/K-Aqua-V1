const fs = require('fs');

const lines = fs.readFileSync('/Users/umurey/.gemini/antigravity/brain/9fb6b327-b7dc-47c2-b772-0fb48424476f/.system_generated/logs/transcript.jsonl', 'utf8').trim().split('\n');

for (const line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      for (const call of obj.tool_calls) {
        if (call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
           console.log("typeof ReplacementContent:", typeof call.args.ReplacementContent);
           console.log("ReplacementContent value snippet:", call.args.ReplacementContent.substring(0, 50));
           break;
        }
      }
    }
  } catch (e) {}
}
