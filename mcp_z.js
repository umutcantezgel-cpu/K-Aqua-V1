const fs = require('fs');
const z = fs.readFileSync('z_out.txt', 'utf8');

const request = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 3394,
  EndLine: 3394,
  Instruction: 'Inject zertifizierung',
  Description: 'Inject zertifizierung',
  AllowMultiple: false,
  TargetContent: '    },',
  ReplacementContent: '    },\n' + z,
  toolSummary: 'Inject zertifizierung',
  toolAction: 'Inject zertifizierung'
};
fs.writeFileSync('mcp_z_payload.json', JSON.stringify(request));
