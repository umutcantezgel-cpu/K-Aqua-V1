const fs = require('fs');
const de = require('./messages/de.json');

const brokenTopLevel = [
  'products', 'solutions', 'academy', 'geoContent',
  'trustx', 'partnerx', 'academyx', 'servicex',
  'aboutx', 'newsx', 'contactx', 'careerx',
  'refsx', 'finderx', 'co2x', 'homedeep',
  'resources', 'markets', 'wissen', 'seoArticle',
  'referenzenPage'
];

let currentChunk = 0;
let out = "";
let linesCount = 0;

function flush(isLast) {
    fs.writeFileSync(`chunk_${currentChunk}.txt`, out + (isLast ? "\n}" : ""));
    console.log(`chunk_${currentChunk}.txt: ${linesCount} lines`);
    currentChunk++;
    out = "";
    linesCount = 0;
}

for (let i = 0; i < brokenTopLevel.length; i++) {
  const key = brokenTopLevel[i];
  const objStr = JSON.stringify(de[key], null, 2);
  const block = `  "${key}": ` + objStr + (i < brokenTopLevel.length - 1 ? ",\n" : "");
  
  const lines = block.split('\n').length;
  if (linesCount + lines > 800 && linesCount > 0) {
      flush(false);
  }
  
  out += block;
  linesCount += lines;
}
flush(true);
