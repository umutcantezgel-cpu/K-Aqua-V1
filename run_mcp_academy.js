const fs = require('fs');
const target = fs.readFileSync('messages/hu.json', 'utf8').split('\n').slice(3264, 3434).join('\n');
const repl = fs.readFileSync('replace_academy.txt', 'utf8').split('\n').slice(1, -1).map(l => '  ' + l).join('\n');

const request = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 3265,
  EndLine: 3434,
  Instruction: 'Replace academy',
  Description: 'Replace academy object in hu.json',
  AllowMultiple: false,
  TargetContent: target,
  ReplacementContent: repl,
  toolSummary: 'Replace academy',
  toolAction: 'Replace academy'
};
fs.writeFileSync('mcp_academy_payload.json', JSON.stringify(request));
