const fs = require('fs');
const lines = fs.readFileSync('/Users/umurey/.gemini/antigravity/brain/9fb6b327-b7dc-47c2-b772-0fb48424476f/.system_generated/logs/transcript.jsonl', 'utf8').trim().split('\n');
require('child_process').execSync('git checkout uk.json');
let ukContent = fs.readFileSync('/Users/umurey/Downloads/K-Aqua-V1-main/messages/uk.json', 'utf8');

for (const line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      for (const call of obj.tool_calls) {
        if (call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
           const args = {};
           for (const k in call.args) {
              try {
                  args[k] = JSON.parse(call.args[k]);
              } catch (e) {
                  args[k] = call.args[k];
              }
           }
           
           if (args.TargetFile && args.TargetFile.endsWith('uk.json')) {
              let replaced = false;
              if (call.name === 'replace_file_content') {
                  const targetContent = args.TargetContent;
                  const replacementContent = args.ReplacementContent;
                  if (targetContent) {
                      if (ukContent.includes(targetContent)) {
                          if (args.AllowMultiple) {
                              ukContent = ukContent.split(targetContent).join(replacementContent);
                          } else {
                              ukContent = ukContent.replace(targetContent, replacementContent);
                          }
                          replaced = true;
                      }
                  }
              } else if (call.name === 'multi_replace_file_content') {
                  for (const chunk of args.ReplacementChunks) {
                      const targetContent = chunk.TargetContent;
                      const replacementContent = chunk.ReplacementContent;
                      if (targetContent) {
                          if (ukContent.includes(targetContent)) {
                              if (chunk.AllowMultiple) {
                                  ukContent = ukContent.split(targetContent).join(replacementContent);
                              } else {
                                  ukContent = ukContent.replace(targetContent, replacementContent);
                              }
                              replaced = true;
                          }
                      }
                  }
              }
              console.log(`${replaced ? '✅' : '❌'} ${args.Instruction}`);
           }
        }
      }
    }
  } catch (e) {
  }
}
fs.writeFileSync('uk.json', ukContent, 'utf8');
