const fs = require('fs');
const extracted = JSON.parse(fs.readFileSync('extracted_keys.json', 'utf8'));

for (const key of ["transitionFittings", "tools", "weldInSaddles", "fittings", "valves", "accessories"]) {
    const value = extracted[key];
    console.log(`Key: ${key}`);
    console.log(`Value exists? ${!!value}`);
    if (value) {
        console.log(`seoTitle: ${!!value.seoTitle}, seoText: ${!!value.seoText}, guideText: ${!!value.guideText}, label: ${!!value.label}`);
    }
}
