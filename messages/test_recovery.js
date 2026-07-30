const fs = require('fs');
const logPath = '/Users/umurey/.gemini/antigravity/brain/77e8e05b-cc51-4c15-aea9-7c53a358f3dd/.system_generated/logs/transcript_full.jsonl';
let content = fs.readFileSync('lt_base.json', 'utf-8');
const lines = fs.readFileSync(logPath, 'utf-8').split('\n');
for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const entry = JSON.parse(line);
        if (entry.type === 'PLANNER_RESPONSE' && entry.tool_calls) {
            for (const call of entry.tool_calls) {
                if (call.name === 'multi_replace_file_content' || call.name === 'replace_file_content') {
                    const args = call.args;
                    const targetFile = args.TargetFile || args.targetFile || '';
                    if (targetFile.includes('lt.json')) {
                        let chunks = args.ReplacementChunks || args.replacementChunks;
                        if (call.name === 'replace_file_content') { chunks = [args]; }
                        if (Array.isArray(chunks)) {
                            for (const chunk of chunks) {
                                const target = chunk.TargetContent || chunk.targetContent || '';
                                if (target) {
                                    if (content.includes(target)) {
                                        content = content.replace(target, chunk.ReplacementContent || chunk.replacementContent || '');
                                    } else {
                                        console.log("FAILED TARGET:", target.substring(0, 100).replace(/\n/g, '\\n'));
                                        console.log("-------------------");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {}
}
