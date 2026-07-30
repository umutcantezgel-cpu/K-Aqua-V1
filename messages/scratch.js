const fs = require('fs');
const en = JSON.parse(fs.readFileSync('en.json', 'utf8'));
const enZA = JSON.parse(fs.readFileSync('en-ZA.json', 'utf8'));

enZA.seoArticle.transitionFittings = en.seoArticle.transitionFittings;
enZA.seoArticle.fittings = en.seoArticle.fittings;
enZA.seoArticle.pipes = en.seoArticle.pipes;

enZA.kontaktBlocks = en.kontaktBlocks;

// Let's not write to file using script as per instruction. Just print the replacement JSON.
console.log(JSON.stringify(en.seoArticle.transitionFittings, null, 2));
