const fs = require('fs');
const lines = fs.readFileSync('/Users/umurey/.gemini/antigravity/brain/9fb6b327-b7dc-47c2-b772-0fb48424476f/.system_generated/logs/transcript.jsonl', 'utf8').trim().split('\n');
const uk = JSON.parse(fs.readFileSync('uk.json', 'utf8'));

const rootKeys = [ 'aboutx' ];

for (const line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      for (const call of obj.tool_calls) {
        if (call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
           const args = call.args;
           if (args.TargetFile && args.TargetFile.includes('uk.json')) {
               let contentsToParse = [];
               if (args.ReplacementContent) contentsToParse.push(args.ReplacementContent);
               if (args.ReplacementChunks) {
                   args.ReplacementChunks.forEach(c => contentsToParse.push(c.ReplacementContent));
               }
               
               for (let content of contentsToParse) {
                   if (!content) continue;
                   if (content.startsWith('"') && content.endsWith('"')) {
                       content = content.substring(1, content.length - 1);
                   }
                   content = content.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                   
                   for (const rk of rootKeys) {
                       const startStr = `"${rk}":`;
                       const startIdx = content.indexOf(startStr);
                       if (startIdx !== -1) {
                           let chunk = content.substring(startIdx + startStr.length).trim();
                           console.log("Chunk starting 50 chars:", chunk.substring(0, 50));
                           console.log("Chunk ending 50 chars:", chunk.substring(chunk.length - 50));
                           
                           try { JSON.parse(chunk); console.log("PARSED!"); } catch(e) { console.log("ERROR:", e.message); }
                       }
                   }
               }
           }
        }
      }
    }
  } catch (e) {}
}
