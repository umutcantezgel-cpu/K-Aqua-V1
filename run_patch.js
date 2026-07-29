const fs = require('fs');

const sl = fs.readFileSync('messages/sl.json', 'utf8').split('\n');

const schiffbau_target = sl.slice(7191, 7193).join('\n');
const schiffbau_replacement = `    "schiffbau": {
      "heroBadge": "Nemški inženiring. Globalni vpliv.",
      "metaTitle": "Ladjedelniška infrastruktura",`;

const klima_target = sl.slice(7249, 7293).join('\n');
const klima_replacement = fs.readFileSync('patch_klima.json', 'utf8').trim();

const toolCall = {
  TargetFile: "/Users/umurey/Downloads/K-Aqua-V1-main/messages/sl.json",
  Instruction: "Patch markets",
  Description: "Patch markets missing keys",
  ReplacementChunks: [
    {
      StartLine: 7192,
      EndLine: 7193,
      AllowMultiple: false,
      TargetContent: schiffbau_target,
      ReplacementContent: schiffbau_replacement
    },
    {
      StartLine: 7250,
      EndLine: 7293,
      AllowMultiple: false,
      TargetContent: klima_target,
      ReplacementContent: klima_replacement
    }
  ]
};

fs.writeFileSync('run_patch.json', JSON.stringify(toolCall, null, 2));
