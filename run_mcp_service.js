const fs = require('fs');
const target = fs.readFileSync('target_service.txt', 'utf8');
const repl = fs.readFileSync('replace_service.txt', 'utf8');

const request = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 2085,
  EndLine: 2094,
  Instruction: 'Replace service',
  Description: 'Replace service object in hu.json',
  AllowMultiple: false,
  TargetContent: target,
  ReplacementContent: repl,
  toolSummary: 'Replace service',
  toolAction: 'Replace service'
};
fs.writeFileSync('mcp_service_payload.json', JSON.stringify(request));
