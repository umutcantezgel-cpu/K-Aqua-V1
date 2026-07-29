const fs = require('fs');
const target = fs.readFileSync('target.txt', 'utf8');
const replacement = fs.readFileSync('t_productsx.json', 'utf8').trim().replace(/,\s*$/, '');
const call = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/el.json',
  Instruction: 'Replace productsx',
  Description: 'Inject productsx',
  ReplacementChunks: [{
    AllowMultiple: false,
    StartLine: 3631,
    EndLine: 3763,
    TargetContent: target,
    ReplacementContent: replacement
  }]
};
fs.writeFileSync('call.json', JSON.stringify(call, null, 2));
