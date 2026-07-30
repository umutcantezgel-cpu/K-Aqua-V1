const fs = require('fs');

const uk = JSON.parse(fs.readFileSync('uk.json', 'utf8'));
const lines = fs.readFileSync('/Users/umurey/.gemini/antigravity/brain/9fb6b327-b7dc-47c2-b772-0fb48424476f/.system_generated/logs/transcript.jsonl', 'utf8').trim().split('\n');

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
                       // It might end with `  }\n}` or something. We can use a regex to match the top-level keys!
                       // Actually, we can just split the content by top-level keys!
                       
                       for (const rk of rootKeys) {
                           const startStr = `"${rk}":`;
                           const startIdx = content.indexOf(startStr);
                           if (startIdx !== -1) {
                               console.log(`Found ${rk} in tool call`);
                               
                               // Find where the next top-level key starts, or end of string
                               let endIdx = content.length;
                               for (const nextRk of rootKeys) {
                                   if (nextRk === rk) continue;
                                   const nextIdx = content.indexOf(`"${nextRk}":`, startIdx + startStr.length);
                                   if (nextIdx !== -1 && nextIdx < endIdx) {
                                       endIdx = nextIdx;
                                   }
                               }
                               
                               let chunk = content.substring(startIdx + startStr.length, endIdx).trim();
                               // chunk should be a valid JSON object or array, possibly with a trailing comma.
                               chunk = chunk.replace(/,$/, '').trim();
                               // it might have an extra closing brace if it's the last one in the file
                               // try parsing it
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
                               
                               if (parsed) {
                                   if (Object.keys(parsed).length > 0) {
                                       uk[rk] = parsed;
                                       console.log(`SUCCESSFULLY MERGED ${rk}`);
                                   }
                               } else {
                                   console.log(`FAILED TO PARSE CHUNK FOR ${rk}`);
                               }
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
