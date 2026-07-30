const fs = require('fs');
let content = fs.readFileSync('hi.json', 'utf8');

const hero = fs.readFileSync('products_hero_hi.json', 'utf8');
const narrative = fs.readFileSync('products_narrative_hi.json', 'utf8');

const productsObj = `"products": {\n  "hero": ${hero.trim()},\n  "narrative": ${narrative.trim()}\n}`;

let replaced = false;
content = content.replace(/\n\}\n?$/, (match) => {
    replaced = true;
    return ',\n  ' + productsObj + '\n}\n';
});

if (replaced) {
    fs.writeFileSync('hi.json', content);
    console.log("Successfully appended products.");
}
