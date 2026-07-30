const fs = require('fs');

const logPath = '/Users/umurey/.gemini/antigravity/brain/d0897114-d182-4b18-a066-5892d8a60c80/.system_generated/logs/transcript.jsonl';
const logData = fs.readFileSync(logPath, 'utf-8');

const lines = logData.split('\n');
let kaContent = fs.readFileSync('ka.json', 'utf-8');

// I should probably just extract the LAST full version of ka.json if they read it,
// or extract all modifications. But wait, did they ever read the full file?
// Let's check for 'run_command' output that cat'ed the file, or maybe we can reconstruct it.

console.log('Finding all write_to_file and replace_file_content for ka.json...');
let modCount = 0;
for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const entry = JSON.parse(line);
    if (entry.tool_calls) {
      for (const call of entry.tool_calls) {
        if (call.name === 'write_to_file' && call.args && call.args.TargetFile && call.args.TargetFile.includes('ka.json')) {
            console.log('write_to_file at step', entry.step_index);
            kaContent = call.args.CodeContent;
            modCount++;
        }
      }
    }
  } catch(e) {}
}

console.log('Found', modCount, 'write_to_file calls');
