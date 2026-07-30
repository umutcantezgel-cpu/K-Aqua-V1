const fs = require('fs');
const lines = fs.readFileSync('/Users/umurey/.gemini/antigravity/brain/9fb6b327-b7dc-47c2-b772-0fb48424476f/.system_generated/logs/transcript.jsonl', 'utf8').trim().split('\n');
const uk = JSON.parse(fs.readFileSync('uk.json', 'utf8'));

for (const line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      for (const call of obj.tool_calls) {
        if (call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
           const args = {};
           for (const k in call.args) {
              try { args[k] = JSON.parse(call.args[k]); } catch(e) { args[k] = call.args[k]; }
           }
           
           if (args.TargetFile && args.TargetFile.endsWith('uk.json')) {
               let contentsToParse = [];
               if (args.ReplacementContent) contentsToParse.push(args.ReplacementContent);
               if (args.ReplacementChunks) {
                   args.ReplacementChunks.forEach(c => contentsToParse.push(c.ReplacementContent));
               }
               
               for (let content of contentsToParse) {
                   if (!content) continue;
                   // Strip everything before the first top-level key: e.g. "key": {
                   // This is tricky because there might be multiple keys.
                   // Let's just use a regex to find all "key": { ... } blocks.
                   // Actually, if we just strip the leading '}' or '},' it might be valid JSON if wrapped in {}.
                   content = content.replace(/^[}\s,]+/, ''); // remove leading closing braces/commas
                   content = content.replace(/[}\s,]+$/, ''); // remove trailing closing braces/commas
                   
                   // Now if we wrap it in {}, it MIGHT be valid json.
                   let jsonStr = '{' + content + '}';
                   try {
                       const parsed = JSON.parse(jsonStr);
                       for (const key in parsed) {
                           console.log(`Merged key: ${key}`);
                           uk[key] = parsed[key];
                       }
                   } catch (e) {
                       // Try cleaning up a bit more: sometimes there are extra unmatched braces.
                       // Just do a fallback: try to extract specific root keys.
                       console.log(`Failed to parse directly: ${args.Instruction}`);
                       // It's possible the content is like '"key": { ... }'
                   }
               }
           }
        }
      }
    }
  } catch (e) {}
}

fs.writeFileSync('uk_merged.json', JSON.stringify(uk, null, 2), 'utf8');
