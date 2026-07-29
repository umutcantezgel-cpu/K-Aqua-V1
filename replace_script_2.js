const fs = require('fs');
const missing = fs.readFileSync('missing_kontakt_bare.json', 'utf8');

const target = `    "fallback": {
      "kicker": "Kontakt",
      "head": "Spojte sa priamo s našimi inžiniermi.",
      "short": "Priame prepojenie na inžinierov",
      "text": "Telefónne číslo, e-mail, jedno kliknutie na vašu tému. To je všetko, čo potrebujete, zvyšok si vyjasníme pri rozhovore.",
      "interest": "Poradenstvo",
      "done": "Odborný poradca vás bude kontaktovať do jedného pracovného dňa."
    }`;

const replacement = target + ',\n' + missing;

const toolCall = {
  Description: "Add missing kontakt blocks",
  Instruction: "Add 21 missing blocks to kontaktBlocks",
  ReplacementChunks: [{
    AllowMultiple: false,
    StartLine: 6700,
    EndLine: 6720,
    TargetContent: target,
    ReplacementContent: replacement
  }],
  TargetFile: "/Users/umurey/Downloads/K-Aqua-V1-main/messages/sk.json",
  toolAction: "Add missing kontaktBlocks",
  toolSummary: "Add missing kontaktBlocks"
};
fs.writeFileSync('tool_call_2.json', JSON.stringify(toolCall, null, 2));
