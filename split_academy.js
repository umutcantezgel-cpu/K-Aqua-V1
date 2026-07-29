const fs = require('fs');

const hu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
const targetWissen = hu.slice(3265, 3381).join('\n'); // "wissen": { ... }
const replAcademy = JSON.parse(fs.readFileSync('replace_academy.txt', 'utf8')).academy;

const schulungen = JSON.stringify({ schulungen: replAcademy.schulungen }, null, 2).split('\n').slice(1, -1).map(l => '  ' + l).join('\n');

const req1 = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 3266,
  EndLine: 3381,
  Instruction: 'Replace wissen with schulungen',
  Description: 'Replace wissen with schulungen',
  AllowMultiple: false,
  TargetContent: targetWissen,
  ReplacementContent: schulungen,
  toolSummary: 'Replace wissen',
  toolAction: 'Replace wissen'
};
fs.writeFileSync('req1.json', JSON.stringify(req1));
