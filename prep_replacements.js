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
  // find the final closing bracket for the last block
  let lastBracket = lines.length - 1;
  while(lines[lastBracket] !== '}') {
    lastBracket--;
  }
  blocks[currentKey].end = lastBracket - 1;
}

const targets = ['products', 'about', 'trust', 'partner', 'academy', 'seoArticle', 'kontaktBlocks', 'kontaktForm', 'enterprise', 'referenzenPage', 'seoExpansion'];
const replacements = [];

const deepMissing = {};
const missingUz = JSON.parse(fs.readFileSync('missing_uz_translations.json', 'utf8'));
for (const [k, v] of Object.entries(missingUz)) {
  _.set(deepMissing, k, v);
}

for (const t of targets) {
  if (blocks[t] && deepMissing[t]) {
    const endLine = blocks[t].end;
    const blockText = lines.slice(blocks[t].start, endLine + 1).join('\n');
    let fullJsonText = `{\n${blockText}\n}`;
    if (fullJsonText.endsWith(',\n}')) {
        fullJsonText = fullJsonText.replace(/,\n\}$/, '\n}');
    }
    
    let obj;
    try {
      obj = JSON.parse(fullJsonText);
    } catch (e) {
      console.log('Error parsing block', t, e.message);
      console.log('Text:', fullJsonText);
      continue;
    }
    
    const merged = _.merge({}, obj, { [t]: deepMissing[t] });
    
    let newBlockText = JSON.stringify(merged, null, 2)
      .split('\n')
      .slice(1, -1) // remove outer { and }
      .join('\n');
    
    replacements.push({
      targetKey: t,
      startLine: blocks[t].start + 1, // 1-indexed
      endLine: endLine + 1,
      targetContent: blockText,
      replacementContent: newBlockText + (endLine === blocks[currentKey].end ? '' : ',')
    });
  }
}
fs.writeFileSync('tool_payload.json', JSON.stringify(replacements, null, 2));
console.log('Wrote', replacements.length, 'replacements to tool_payload.json');
