const fs = require('fs');
const target = fs.readFileSync('target_hochhaus.txt', 'utf8');
const repl = fs.readFileSync('replace_hochhaus.txt', 'utf8');

const request = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 1793,
  EndLine: 1878,
  Instruction: 'Replace hochhaus',
  Description: 'Replace hochhaus object in hu.json',
  AllowMultiple: false,
  TargetContent: target,
  ReplacementContent: repl,
  toolSummary: 'Replace hochhaus',
  toolAction: 'Replace hochhaus'
};
fs.writeFileSync('mcp_hochhaus_payload.json', JSON.stringify(request));
