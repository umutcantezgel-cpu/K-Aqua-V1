const fs = require('fs');
const transcriptFile = '/Users/umurey/.gemini/antigravity/brain/41445957-e43c-4533-84bb-172e10f2dd06/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(transcriptFile, 'utf8').trim().split('\n');

let hiJsonContent = fs.readFileSync('hi.json', 'utf8');

for (const line of lines) {
    if (!line) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.role === 'assistant' && obj.tool_calls) {
            for (const call of obj.tool_calls) {
                if (call.function && call.function.name === 'default_api:multi_replace_file_content') {
                    const args = JSON.parse(call.function.arguments);
                    if (args.TargetFile && args.TargetFile.endsWith('hi.json') && args.ReplacementChunks) {
                        for (const chunk of args.ReplacementChunks) {
                            if (chunk.TargetContent && chunk.ReplacementContent) {
                                hiJsonContent = hiJsonContent.replace(chunk.TargetContent, chunk.ReplacementContent);
                            }
                        }
                    }
                } else if (call.function && call.function.name === 'default_api:replace_file_content') {
                    const args = JSON.parse(call.function.arguments);
                    if (args.TargetFile && args.TargetFile.endsWith('hi.json')) {
                        if (args.TargetContent && args.ReplacementContent) {
                            hiJsonContent = hiJsonContent.replace(args.TargetContent, args.ReplacementContent);
                        }
                    }
                }
            }
        }
    } catch(e) {}
}

fs.writeFileSync('hi_recovered.json', hiJsonContent);
console.log('Recovery attempted. Size:', hiJsonContent.length);
