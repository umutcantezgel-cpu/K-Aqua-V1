const fs = require('fs');
const target = fs.readFileSync('messages/hu.json', 'utf8').split('\n').slice(2238, 2243).join('\n');
const repl = fs.readFileSync('replace_trust.txt', 'utf8');

const request = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 2239,
  EndLine: 2243,
  Instruction: 'Replace trustAndCases',
  Description: 'Replace trustAndCases object in hu.json',
  AllowMultiple: false,
  TargetContent: target,
  ReplacementContent: repl,
  toolSummary: 'Replace trustAndCases',
  toolAction: 'Replace trustAndCases'
};
fs.writeFileSync('mcp_trust_payload.json', JSON.stringify(request));
