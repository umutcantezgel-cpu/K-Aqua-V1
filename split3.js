const fs = require('fs');
const hu = fs.readFileSync('messages/hu.json', 'utf8').split('\n');
const chunk1 = hu.slice(3265, 3320).join('\n');
const chunk2 = hu.slice(3320, 3381).join('\n');

const replAcademy = JSON.parse(fs.readFileSync('replace_academy.txt', 'utf8')).academy;
const schulungen = JSON.stringify({ schulungen: replAcademy.schulungen }, null, 2).split('\n').slice(1, -1).map(l => '  ' + l).join('\n');

const req = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  Instruction: 'Replace wissen with schulungen',
  Description: 'Replace wissen with schulungen',
  ReplacementChunks: [
    {
      StartLine: 3266,
      EndLine: 3320,
      TargetContent: chunk1,
      ReplacementContent: "",
      AllowMultiple: false
    },
    {
      StartLine: 3321,
      EndLine: 3381,
      TargetContent: chunk2,
      ReplacementContent: schulungen,
      AllowMultiple: false
    }
  ],
  toolSummary: 'Replace wissen',
  toolAction: 'Replace wissen'
};
fs.writeFileSync('req_wissen.json', JSON.stringify(req, null, 2));
