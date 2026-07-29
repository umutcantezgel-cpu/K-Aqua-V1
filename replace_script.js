const fs = require('fs');

const targetContent = fs.readFileSync('target.txt', 'utf8');
const replacementContent = fs.readFileSync('chunk2_sk_bare.json', 'utf8') + ',\n';

const toolCall = {
  Description: "Replace kontaktBlocks, kontaktForm, referenzenPage",
  Instruction: "Replace the old short versions with the full translated versions.",
  ReplacementChunks: [{
    AllowMultiple: false,
    StartLine: 6600,
    EndLine: 6694,
    TargetContent: targetContent,
    ReplacementContent: replacementContent
  }],
  TargetFile: "/Users/umurey/Downloads/K-Aqua-V1-main/messages/sk.json",
  toolAction: "Replace the blocks",
  toolSummary: "Replace the blocks"
};

fs.writeFileSync('tool_call.json', JSON.stringify(toolCall, null, 2));
