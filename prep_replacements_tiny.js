const fs = require('fs');
const _ = require('lodash');

const lines = fs.readFileSync('messages/uz.json', 'utf8').split('\n');
const topLevelRegex = /^  \"([a-zA-Z0-9_]+)\": \{/;
let currentKey = null;
const blocks = {};
for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(topLevelRegex);
  if (match) {
    if (currentKey) {
      blocks[currentKey].end = i - 1;
    }
    currentKey = match[1];
    blocks[currentKey] = { start: i };
  }
}
if (currentKey) {
  let lastBracket = lines.length - 1;
  while(lines[lastBracket] !== '}') {
    lastBracket--;
  }
  blocks[currentKey].end = lastBracket - 1;
}

const targets = ['products', 'about', 'trust', 'partner', 'academy', 'seoArticle', 'kontaktBlocks', 'kontaktForm', 'enterprise', 'referenzenPage', 'seoExpansion'];
const replacements = [];
const deepMissing = JSON.parse(fs.readFileSync('missing_uz_translations_full.json', 'utf8'));

for (const t of targets) {
  if (blocks[t] && deepMissing[t]) {
    const endLine = blocks[t].end;
    let targetContent = lines[endLine];
    if (!targetContent.trim().startsWith('}')) {
       targetContent = lines.slice(endLine - 1, endLine + 1).join('\n');
    }
    const missingJsonStr = JSON.stringify(deepMissing[t], null, 2);
    const innerProps = missingJsonStr.split('\n').slice(1, -1).map(l => '  ' + l).join('\n');
    
    let rep = targetContent.replace('}', ',' + '\n' + innerProps + '\n  }');
    
    replacements.push({
      TargetContent: targetContent,
      ReplacementContent: rep,
      StartLine: endLine + 1,
      EndLine: endLine + 1
    });
  }
}

if (deepMissing['geoContent']) {
   const geoStr = JSON.stringify({ geoContent: deepMissing['geoContent'] }, null, 2);
   const inner = geoStr.split('\n').slice(1, -1).map(l => '  ' + l).join('\n');
   replacements.push({
      TargetContent: '}',
      ReplacementContent: ',\n' + inner + '\n}',
      StartLine: lines.length, 
      EndLine: lines.length
   });
}

fs.writeFileSync('tool_payload_tiny.json', JSON.stringify(replacements, null, 2));
