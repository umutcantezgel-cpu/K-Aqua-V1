const fs = require('fs');
const vm = require('vm');
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
                   
                   let firstIdx = -1;
                   for (const rk of rootKeys) {
                       const idx = content.indexOf(`"${rk}":`);
                       if (idx !== -1 && (firstIdx === -1 || idx < firstIdx)) {
                           firstIdx = idx;
                       }
                   }
                   
                   if (firstIdx !== -1) {
                       let clean = content.substring(firstIdx);
                       // We can try to evaluate it in a vm context.
                       // Wrap it in a return statement.
                       // Sometimes it has extra closing braces at the end. We'll strip them one by one.
                       clean = clean.replace(/^[}\s,]+/, '').replace(/[}\s,]+$/, '');
                       let parsed = null;
                       
                       for (let i = 0; i < 5; i++) {
                           try {
                               const script = new vm.Script(`({${clean}})`);
                               parsed = script.runInNewContext();
                               break;
                           } catch (e) {
                               // if syntax error, maybe remove the last '}'
                               const lastBraceIdx = clean.lastIndexOf('}');
                               if (lastBraceIdx !== -1) {
                                   clean = clean.substring(0, lastBraceIdx).trim();
                                   clean = clean.replace(/,+$/, '');
                               } else {
                                   break;
                               }
                           }
                       }
                       
                       if (parsed) {
                           for (const key in parsed) {
                               console.log(`Merged key: ${key}`);
                               uk[key] = parsed[key];
                           }
                       } else {
                           console.log(`Still failed to eval: ${args.Instruction}`);
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
