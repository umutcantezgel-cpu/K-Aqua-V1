const fs = require('fs');
let content = fs.readFileSync('hi.json', 'utf8');
const vw = JSON.parse(fs.readFileSync('valves_weld_hi.json', 'utf8'));
let replaced = false;

// We need to inject valves and weldInSaddles inside "seoArticle": {
content = content.replace(/"seoArticle":\s*\{/, (match) => {
    replaced = true;
    return `"seoArticle": {\n    "valves": ${JSON.stringify(vw.valves)},\n    "weldInSaddles": ${JSON.stringify(vw.weldInSaddles)},`;
});

if (replaced) {
    fs.writeFileSync('hi.json', content);
    console.log("Successfully appended products.seoArticle chunk 2.");
} else {
    console.log("Could not find seoArticle block in hi.json");
}
