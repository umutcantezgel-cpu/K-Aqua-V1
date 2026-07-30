const fs = require('fs');

const logPath = '/Users/umurey/.gemini/antigravity/brain/d0897114-d182-4b18-a066-5892d8a60c80/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(logPath, 'utf8').split('\n').filter(Boolean);

let ka = fs.readFileSync('ka.json', 'utf8');

let applied = 0;
let skipped = 0;
let ambiguous = 0;

for (const line of lines) {
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            for (const call of obj.tool_calls) {
                if (call.name === 'replace_file_content' && call.args.TargetFile && call.args.TargetFile.endsWith('ka.json')) {
                    const target = call.args.TargetContent;
                    const replacement = call.args.ReplacementContent;
                    
                    const occurrences = ka.split(target).length - 1;
                    if (occurrences === 1) {
                        ka = ka.replace(target, replacement);
                        applied++;
                    } else if (occurrences > 1) {
                        ambiguous++;
                        // If ambiguous, we try to use the fact that replace() replaces the FIRST one. But this is dangerous.
                        // Let's just log it.
                        console.log("AMBIGUOUS:", target.trim());
                    } else {
                        skipped++;
                    }
                }
                else if (call.name === 'multi_replace_file_content' && call.args.TargetFile && call.args.TargetFile.endsWith('ka.json')) {
                    if (call.args.ReplacementChunks) {
                        for (const chunk of call.args.ReplacementChunks) {
                            const occurrences = ka.split(chunk.TargetContent).length - 1;
                            if (occurrences === 1) {
                                ka = ka.replace(chunk.TargetContent, chunk.ReplacementContent);
                                applied++;
                            } else if (occurrences > 1) {
                                ambiguous++;
                                console.log("AMBIGUOUS:", chunk.TargetContent.trim());
                            } else {
                                skipped++;
                            }
                        }
                    }
                }
            }
        }
    } catch(e) {}
}

console.log(`Applied ${applied} edits. Skipped ${skipped} edits. Ambiguous ${ambiguous}`);
fs.writeFileSync('ka_recovered_safe.json', ka);
