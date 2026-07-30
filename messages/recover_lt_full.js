const fs = require('fs');

function recover() {
    const logPath = '/Users/umurey/.gemini/antigravity/brain/77e8e05b-cc51-4c15-aea9-7c53a358f3dd/.system_generated/logs/transcript_full.jsonl';
    let content = fs.readFileSync('lt.json', 'utf-8');
    
    const lines = fs.readFileSync(logPath, 'utf-8').split('\n');
    let applyCount = 0;
    
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
                            
                            // Handle replace_file_content which doesn't have ReplacementChunks array
                            if (call.name === 'replace_file_content') {
                                chunks = [args];
                            }
                            
                            if (typeof chunks === 'string') {
                                try {
                                    // Fix newline escapes if needed, though transcript_full might have valid JSON
                                    chunks = chunks.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
                                    chunks = JSON.parse(chunks);
                                } catch (e) {
                                    console.error("Error parsing chunks string:", e.message);
                                    continue;
                                }
                            }
                            
                            if (Array.isArray(chunks)) {
                                for (const chunk of chunks) {
                                    const target = chunk.TargetContent || chunk.targetContent || '';
                                    const repl = chunk.ReplacementContent || chunk.replacementContent || '';
                                    
                                    if (target && content.includes(target)) {
                                        content = content.replace(target, repl);
                                        applyCount++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.error("Error parsing log line:", e.message);
        }
    }
    
    fs.writeFileSync('lt_recovered.json', content);
    console.log(`Recovery completed. Applied ${applyCount} replacements.`);
}

recover();
