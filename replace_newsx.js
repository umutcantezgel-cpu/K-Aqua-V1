const fs = require('fs');
const newsx = fs.readFileSync('newsx_bare.json', 'utf8');

const target = `    }\n  }\n}`;
const replacement = `    }\n  },\n` + newsx + `\n}`;

const toolCall = {
  Description: "Add newsx",
  Instruction: "Add newsx block to the end of the file",
  ReplacementChunks: [{
    AllowMultiple: false,
    StartLine: 7122,
    EndLine: 7132,
    TargetContent: target,
    ReplacementContent: replacement
  }],
  TargetFile: "/Users/umurey/Downloads/K-Aqua-V1-main/messages/sk.json",
  toolAction: "Add newsx",
  toolSummary: "Add newsx"
};
fs.writeFileSync('tool_call_newsx.json', JSON.stringify(toolCall, null, 2));
