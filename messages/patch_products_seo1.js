const fs = require('fs');
let content = fs.readFileSync('hi.json', 'utf8');

const pf = JSON.parse(fs.readFileSync('pipes_fittings_hi.json', 'utf8'));

let replaced = false;
content = content.replace(/"products":\s*\{/, (match) => {
    replaced = true;
    return `"products": {\n  "seoArticle": {\n    "pipes": ${JSON.stringify(pf.pipes)},\n    "fittings": ${JSON.stringify(pf.fittings)}\n  },`;
});

if (replaced) {
    fs.writeFileSync('hi.json', content);
    console.log("Successfully appended products.seoArticle chunk 1.");
} else {
    console.log("Could not find products block in hi.json");
}
