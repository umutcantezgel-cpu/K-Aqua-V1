const fs = require('fs');
const path = '/Users/umurey/.gemini/antigravity/brain/77e8e05b-cc51-4c15-aea9-7c53a358f3dd/.system_generated/logs/transcript.jsonl';
let lt_text = fs.readFileSync('lt.json', 'utf-8');

const lines = fs.readFileSync(path, 'utf-8').split('\n');
for (const line of lines) {
    if (!line) continue;
    try {
        const entry = JSON.parse(line);
        if (entry.type === 'PLANNER_RESPONSE' && entry.tool_calls) {
            for (const call of entry.tool_calls) {
                if (call.name === 'multi_replace_file_content' || call.name === 'replace_file_content') {
                    const args = call.args;
                    let targetFile = args.TargetFile || args.targetFile || "";
                    if (targetFile.includes('lt.json')) {
                        let chunks = args.ReplacementChunks || args.replacementChunks || [];
                        if (typeof chunks === 'string') {
                            try {
                                // Fix unescaped newlines inside the JSON string
                                chunks = chunks.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
                                chunks = JSON.parse(chunks);
                            } catch(e) {
                                console.log("Error parsing chunk string", e.message);
                                continue;
                            }
                        }
                        
                        if (call.name === 'replace_file_content') {
                            chunks = [args];
                        }

                        for (const chunk of chunks) {
                            const target = chunk.TargetContent || chunk.targetContent || "";
                            const repl = chunk.ReplacementContent || chunk.replacementContent || "";
                            if (target && lt_text.includes(target)) {
                                lt_text = lt_text.replace(target, repl);
                            }
                        }
                    }
                }
            }
        }
    } catch(e) {
        console.log("Error line", e.message);
    }
}
fs.writeFileSync('lt_recovered.json', lt_text);
console.log("Recovery done");
