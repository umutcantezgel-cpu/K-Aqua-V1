const fs = require('fs');
let content = fs.readFileSync('hi.json', 'utf8');
const aft = JSON.parse(fs.readFileSync('acc_fall_tools_hi.json', 'utf8'));

let replaced = false;

content = content.replace(/"seoArticle":\s*\{/, (match) => {
    replaced = true;
    return `"seoArticle": {\n    "accessories": ${JSON.stringify(aft.accessories)},\n    "fallback": ${JSON.stringify(aft.fallback)},\n    "tools": ${JSON.stringify(aft.tools)},`;
});

if (replaced) {
    fs.writeFileSync('hi.json', content);
    console.log("Successfully appended products.seoArticle chunk 3.");
} else {
    console.log("Could not find seoArticle block in hi.json");
}
