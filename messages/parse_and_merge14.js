const fs = require('fs');
const lines = fs.readFileSync('/Users/umurey/.gemini/antigravity/brain/9fb6b327-b7dc-47c2-b772-0fb48424476f/.system_generated/logs/transcript.jsonl', 'utf8').trim().split('\n');
const uk = JSON.parse(fs.readFileSync('uk.json', 'utf8'));

const rootKeys = [
  'seoExpansion', 'seo', 'refsx', 'cookieConsent', 'finderx', 'co2x', 'homedeep',
  'application', 'legal', 'aboutx', 'newsx', 'contactx', 'careerx', 'referenzenPage',
  'enterprise', 'wissen', 'customerReviews', 'kontaktForm', 'seoArticle', 'about',
  'productsx', 'solutionsx', 'trustx', 'partnerx', 'servicex', 'academyx',
  'productNames', 'kontaktBlocks', 'academy', 'resources', 'markets', 'catalogx', 'products', 'solutions'
];

for (const line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      for (const call of obj.tool_calls) {
        if (call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
           const args = call.args;
           if (args.TargetFile && args.TargetFile.includes('uk.json')) {
               let contentsToParse = [];
               if (args.ReplacementContent) contentsToParse.push(args.ReplacementContent);
               if (args.ReplacementChunks) {
                   args.ReplacementChunks.forEach(c => contentsToParse.push(c.ReplacementContent));
               }
               
               for (let content of contentsToParse) {
                   if (!content) continue;
                   if (content.startsWith('"') && content.endsWith('"')) {
                       content = content.substring(1, content.length - 1);
                   }
                   content = content.replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
                   
                   for (const rk of rootKeys) {
                       const startStr = `"${rk}":`;
                       const startIdx = content.indexOf(startStr);
                       if (startIdx !== -1) {
                           let endIdx = content.length;
                           for (const nextRk of rootKeys) {
                               if (nextRk === rk) continue;
                               const nextIdx = content.indexOf(`"${nextRk}":`, startIdx + startStr.length);
                               if (nextIdx !== -1 && nextIdx < endIdx) {
                                   endIdx = nextIdx;
                               }
                           }
                           
                           let chunk = content.substring(startIdx + startStr.length, endIdx).trim();
                           chunk = chunk.replace(/,$/, '').trim();
                           
                           // If chunk ends with something like "\n  }\n}", try to strip braces
                           let parsed = null;
                           for (let i = 0; i < 5; i++) {
                               try {
                                   parsed = JSON.parse(chunk);
                                   break;
                               } catch(e) {
                                   if (chunk.endsWith('}')) {
                                       chunk = chunk.substring(0, chunk.lastIndexOf('}')).trim();
                                   } else {
                                       break;
                                   }
                               }
                           }
                           
                           if (parsed && Object.keys(parsed).length > 0) {
                               // Only merge if not already complete or if it's missing keys
                               uk[rk] = { ...uk[rk], ...parsed };
                               console.log(`SUCCESSFULLY MERGED ${rk}`);
                           }
                       }
                   }
               }
           }
        }
      }
    }
  } catch (e) {}
}

fs.writeFileSync('uk.json', JSON.stringify(uk, null, 2), 'utf8');
