const fs = require('fs');
const repl = fs.readFileSync('replace_about.txt', 'utf8');

const target = `      "list2Desc": "A kockázatok célzott azonosítása és intézkedések végrehajtása az energiahatékonyság optimalizálása érdekében."
    }`;

const replStr = `      "list2Desc": "A kockázatok célzott azonosítása és intézkedések végrehajtása az energiahatékonyság optimalizálása érdekében."
    }${repl}`;

const request = {
  TargetFile: '/Users/umurey/Downloads/K-Aqua-V1-main/messages/hu.json',
  StartLine: 2998,
  EndLine: 2999,
  Instruction: 'Append to about',
  Description: 'Append missing keys to about object',
  AllowMultiple: false,
  TargetContent: target,
  ReplacementContent: replStr,
  toolSummary: 'Replace about',
  toolAction: 'Replace about'
};
fs.writeFileSync('mcp_about_payload.json', JSON.stringify(request));
