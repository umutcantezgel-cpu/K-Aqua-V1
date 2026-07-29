const fs = require('fs');
const bare = fs.readFileSync('3keys_sk_bare.json', 'utf8');

const target = `    "ishTitle": "Stretnutie odborníkov v odvetví",
    "ishText": "Sektor TGA sa stretáva na ISH vo Frankfurte, poprednom svetovom veľtrhu, kde má naša partnerská spoločnosť KESSEL pravidelné zastúpenie. Hneď ako budú potvrdené termíny pre K Aqua, zverejníme ich tu."
  }
}`;
const replacement = `    "ishTitle": "Stretnutie odborníkov v odvetví",
    "ishText": "Sektor TGA sa stretáva na ISH vo Frankfurte, poprednom svetovom veľtrhu, kde má naša partnerská spoločnosť KESSEL pravidelné zastúpenie. Hneď ako budú potvrdené termíny pre K Aqua, zverejníme ich tu."
  },\n` + bare + `\n}`;

const toolCall = {
  Description: "Add trustx, aboutx, partnerx",
  Instruction: "Add the 3 blocks to the end of the file",
  ReplacementChunks: [{
    AllowMultiple: false,
    StartLine: 7750,
    EndLine: 7760,
    TargetContent: target,
    ReplacementContent: replacement
  }],
  TargetFile: "/Users/umurey/Downloads/K-Aqua-V1-main/messages/sk.json",
  toolAction: "Add blocks",
  toolSummary: "Add blocks"
};
fs.writeFileSync('tool_call_3keys.json', JSON.stringify(toolCall, null, 2));
