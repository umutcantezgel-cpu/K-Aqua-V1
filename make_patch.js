const fs = require('fs');

const targetContent = fs.readFileSync('temp_target.txt', 'utf8');

// I will just read patch_markets.json and wrap it in {} if necessary, or just extract manually
let replacementText = fs.readFileSync('patch_markets.json', 'utf8');
if (!replacementText.trim().startsWith('{')) replacementText = '{' + replacementText;
if (!replacementText.trim().endsWith('}')) replacementText = replacementText + '}';
// However it had trailing extra `}` maybe? Let's just fix it.
try {
  JSON.parse(replacementText);
} catch(e) {
  // try removing last }
  replacementText = replacementText.trim().replace(/}$/, '');
  try {
     JSON.parse(replacementText);
  } catch (e2) {
    console.log("Still invalid JSON");
  }
}
const replacementObj = JSON.parse(replacementText);

const klimaanlagenStr = JSON.stringify(replacementObj.markets.klimaanlagen, null, 2).split('\n').map((l, i) => i===0 ? l : '    ' + l).join('\n');
const industrieStr = JSON.stringify(replacementObj.markets.industrie, null, 2).split('\n').map((l, i) => i===0 ? l : '    ' + l).join('\n');
const trinkwasserStr = JSON.stringify(replacementObj.markets.trinkwasser, null, 2).split('\n').map((l, i) => i===0 ? l : '    ' + l).join('\n');

const fullReplacement = `    "klimaanlagen": ${klimaanlagenStr},
    "industrie": ${industrieStr},
    "trinkwasser": ${trinkwasserStr}
  }
}`;

fs.writeFileSync('target_replacement.json', JSON.stringify({
  TargetFile: "/Users/umurey/Downloads/K-Aqua-V1-main/messages/ja.json",
  Instruction: "Replace klimaanlagen to end",
  Description: "Update markets",
  AllowMultiple: false,
  StartLine: 7694,
  EndLine: 7908,
  TargetContent: targetContent,
  ReplacementContent: fullReplacement
}));
