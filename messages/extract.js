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

const merged = {};

for (const rc of chunks) {
    let str = rc.trim();
    if (str.endsWith(',')) str = str.slice(0, -1);
    
    // We try to make it a valid JSON object by wrapping it
    let attempt1 = '{' + str + '}';
    let attempt2 = '{' + str + '}}';
    let attempt3 = '{"_tmp": {' + str + '}}';
    
    let parsed = null;
    try {
        parsed = JSON.parse(attempt1);
    } catch (e1) {
        try { parsed = JSON.parse(attempt2); } catch(e2) {
            try { parsed = JSON.parse(attempt3); } catch(e3) {}
        }
    }
    
    if (parsed) {
        Object.assign(merged, parsed);
    }
}

fs.writeFileSync('extracted_keys.json', JSON.stringify(merged, null, 2));
console.log(Object.keys(merged).length, 'keys extracted');
