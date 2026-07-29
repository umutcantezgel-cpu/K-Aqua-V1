const fs = require('fs');
const target = fs.readFileSync('messages/hu.json', 'utf8').split('\n').slice(3179, 3201).join('\n');
const repl = fs.readFileSync('replace_co2.txt', 'utf8');

const request = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 3180,
  EndLine: 3201,
  Instruction: 'Replace co2',
  Description: 'Replace co2 object in hu.json',
  AllowMultiple: false,
  TargetContent: target,
  ReplacementContent: repl,
  toolSummary: 'Replace co2',
  toolAction: 'Replace co2'
};
fs.writeFileSync('mcp_co2_payload.json', JSON.stringify(request));
