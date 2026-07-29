const fs = require('fs');
const sl = fs.readFileSync('messages/sl.json', 'utf8').split('\n');

const target = sl.slice(7250, 7462).join('\n');

const klima = fs.readFileSync('patch_klima.json', 'utf8').trim() + ',';
const industrie = fs.readFileSync('patch_industrie.json', 'utf8').trim() + ',';
const trink = fs.readFileSync('patch_trinkwasser.json', 'utf8').trim();

const replacementContent = klima + '\n' + industrie + '\n' + trink;

const toolCall = {
  TargetFile: "/Users/umurey/Downloads/K-Aqua-V1-main/messages/sl.json",
  Instruction: "Fix markets",
  Description: "Fix markets section completely",
  ReplacementChunks: [
    {
      StartLine: 7251,
      EndLine: 7462,
      AllowMultiple: false,
      TargetContent: target,
      ReplacementContent: replacementContent
    }
  ]
};

fs.writeFileSync('run_cleanup2.json', JSON.stringify(toolCall, null, 2));
