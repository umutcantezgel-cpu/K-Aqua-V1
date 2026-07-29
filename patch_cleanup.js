const fs = require('fs');
const sl = fs.readFileSync('messages/sl.json', 'utf8').split('\n');

const dup_target = sl.slice(7250, 7328).join('\n'); // The whole block

const old_industrie_target = sl.slice(7400, 7444).join('\n');
const replacement = fs.readFileSync('patch_industrie.json', 'utf8').trim();

const toolCall = {
  TargetFile: "/Users/umurey/Downloads/K-Aqua-V1-main/messages/sl.json",
  Instruction: "Fix industrie",
  Description: "Fix duplicate and patch old industrie",
  ReplacementChunks: [
    {
      StartLine: 7251,
      EndLine: 7328,
      AllowMultiple: false,
      TargetContent: dup_target,
      ReplacementContent: ""
    },
    {
      StartLine: 7401,
      EndLine: 7444,
      AllowMultiple: false,
      TargetContent: old_industrie_target,
      ReplacementContent: replacement
    }
  ]
};

fs.writeFileSync('run_cleanup.json', JSON.stringify(toolCall, null, 2));
