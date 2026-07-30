const fs = require('fs');
const lines = fs.readFileSync('/Users/umurey/.gemini/antigravity/brain/9fb6b327-b7dc-47c2-b772-0fb48424476f/.system_generated/logs/transcript.jsonl', 'utf8').trim().split('\n');
for (const line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      for (const call of obj.tool_calls) {
        if (call.name === 'replace_file_content') {
           const args = {};
           for (const k in call.args) {
              try { args[k] = JSON.parse(call.args[k]); } catch(e) { args[k] = call.args[k]; }
           }
           if (args.TargetFile && args.TargetFile.endsWith('uk.json')) {
              console.log("=== Target Content ===");
              console.log(JSON.stringify(args.TargetContent));
              return;
           }
        }
      }
    }
  } catch (e) {
  }
}
