const fs = require('fs');

const logPath = '/Users/umurey/.gemini/antigravity/brain/d0897114-d182-4b18-a066-5892d8a60c80/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(logPath, 'utf8').split('\n').filter(Boolean);

let chunks = [];

for (const line of lines) {
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            for (const call of obj.tool_calls) {
                if (call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
                    let replacements = [];
                    if (call.name === 'replace_file_content') {
                        replacements.push(call.args.ReplacementContent);
                    } else if (call.name === 'multi_replace_file_content') {
                        for (const chunk of call.args.ReplacementChunks) {
                            replacements.push(chunk.ReplacementContent);
                        }
                    }
                    
                    for (let rc of replacements) {
                        chunks.push(rc);
                    }
                }
            }
        }
    } catch(e) {}
}

console.log(`Found ${chunks.length} chunks.`);
let parseable = 0;
for (const rc of chunks) {
    let str = rc.trim();
    if (str.endsWith(',')) str = str.slice(0, -1); // remove trailing comma
    if (!str.startsWith('{')) str = '{' + str;
    if (!str.endsWith('}')) str = str + '}';
    
    try {
        JSON.parse(str);
        parseable++;
    } catch (e) {
        // console.log("Failed to parse:", str.slice(0, 50));
    }
}
console.log(`Parseable as JSON wrapper: ${parseable}`);
