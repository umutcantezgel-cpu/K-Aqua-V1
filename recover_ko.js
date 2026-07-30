const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('/Users/umurey/.gemini/antigravity/brain/3b662e14-cbc1-4587-86bb-288af5a54f1e/.system_generated/logs/transcript_full.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let koBlocks = [];

  for await (const line of rl) {
    if (line.includes('ko.json') && line.includes('multi_replace_file_content')) {
      try {
        const data = JSON.parse(line);
        if (data.tool_calls) {
          for (let tc of data.tool_calls) {
            if (tc.name === 'multi_replace_file_content' || tc.name === 'default_api:multi_replace_file_content') {
              if (JSON.stringify(tc.args).includes('ko.json')) {
                koBlocks.push(tc.args);
              }
            }
          }
        }
      } catch(e) {}
    }
  }
  
  fs.writeFileSync('ko_recover_log.json', JSON.stringify(koBlocks, null, 2));
  console.log('Saved ' + koBlocks.length + ' tool calls to ko_recover_log.json');
}

processLineByLine();
