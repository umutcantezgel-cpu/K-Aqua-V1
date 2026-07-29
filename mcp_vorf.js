const fs = require('fs');
const target = fs.readFileSync('messages/hu.json', 'utf8').split('\n').slice(1556, 1576).join('\n');
const repl = fs.readFileSync('replace_vorf.txt', 'utf8');

const request = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 1557,
  EndLine: 1576,
  Instruction: 'Replace vorfertigung',
  Description: 'Replace vorfertigung object in hu.json',
  AllowMultiple: false,
  TargetContent: target,
  ReplacementContent: repl,
  toolSummary: 'Replace vorfertigung',
  toolAction: 'Replace vorfertigung'
};
fs.writeFileSync('mcp_vorf_payload.json', JSON.stringify(request));
