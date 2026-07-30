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
           const args = {};
           for (const k in call.args) {
              try { args[k] = JSON.parse(call.args[k]); } catch(e) { args[k] = call.args[k]; }
           }
           
           if (args.TargetFile && args.TargetFile.endsWith('uk.json')) {
               let contentsToParse = [];
               if (args.ReplacementContent) contentsToParse.push(args.ReplacementContent);
               if (args.ReplacementChunks) {
                   args.ReplacementChunks.forEach(c => contentsToParse.push(c.ReplacementContent));
               }
               
               for (let content of contentsToParse) {
                   if (!content) continue;
                   
                   // Find the first occurrence of a root key definition
                   let firstIdx = -1;
                   for (const rk of rootKeys) {
                       const idx = content.indexOf(`"${rk}": {`);
                       if (idx !== -1 && (firstIdx === -1 || idx < firstIdx)) {
                           firstIdx = idx;
                       }
                   }
                   
                   if (firstIdx !== -1) {
                       let clean = content.substring(firstIdx);
                       // It might end with some unmatched braces because it was replacing closing braces.
                       // Just try JSON.parse with varying numbers of closing braces until it works.
                       let parsed = null;
                       const attempts = [
                           `{${clean}}`,
                           `{${clean}}}`,
                           `{${clean}}}}`,
                           `{${clean.replace(/,+$/, '')}}`,
                           `{${clean.substring(0, clean.lastIndexOf('}'))}}`,
                           `{${clean.substring(0, clean.lastIndexOf('}')).substring(0, clean.substring(0, clean.lastIndexOf('}')).lastIndexOf('}'))}}`
                       ];
                       for (const attempt of attempts) {
                           try {
                               parsed = JSON.parse(attempt);
                               break;
                           } catch (e) {}
                       }
                       if (parsed) {
                           for (const key in parsed) {
                               console.log(`Merged key: ${key}`);
                               uk[key] = parsed[key];
                           }
                       } else {
                           console.log(`Still failed to parse: ${args.Instruction}`);
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
