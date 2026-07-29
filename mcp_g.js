const fs = require('fs');
const g = fs.readFileSync('g_out.txt', 'utf8');

const request = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 3524,
  EndLine: 3524,
  Instruction: 'Inject glossar',
  Description: 'Inject glossar',
  AllowMultiple: false,
  TargetContent: '    },',
  ReplacementContent: '    },\n' + g,
  toolSummary: 'Inject glossar',
  toolAction: 'Inject glossar'
};
fs.writeFileSync('mcp_g_payload.json', JSON.stringify(request));
