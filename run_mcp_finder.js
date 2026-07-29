const fs = require('fs');
const target = fs.readFileSync('messages/hu.json', 'utf8').split('\n').slice(2207, 2213).join('\n');
const repl = fs.readFileSync('replace_finder.txt', 'utf8');

const request = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 2208,
  EndLine: 2213,
  Instruction: 'Replace finder',
  Description: 'Replace finder object in hu.json',
  AllowMultiple: false,
  TargetContent: target,
  ReplacementContent: repl,
  toolSummary: 'Replace finder',
  toolAction: 'Replace finder'
};
fs.writeFileSync('mcp_finder_payload.json', JSON.stringify(request));
