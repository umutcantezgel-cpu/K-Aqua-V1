const fs = require('fs');

const kaPath = 'ka.json';
let ka = JSON.parse(fs.readFileSync(kaPath, 'utf8'));
const extracted = JSON.parse(fs.readFileSync('extracted_keys.json', 'utf8'));
const de = JSON.parse(fs.readFileSync('de.json', 'utf8'));

const topLevelKeys = ["catalogx", "pages", "geo", "products", "solutions", "about", "co2", "academy", "rfq", "geoContent", "productsx", "trustx", "legal", "cookieConsent", "seo", "application", "resources", "markets", "wissen", "productNames", "customerReviews", "seoArticle", "kontaktBlocks", "kontaktForm", "enterprise", "referenzenPage", "seoExpansion"];

for (const key of topLevelKeys) {
    if (extracted[key]) {
        if (!ka[key]) ka[key] = {};
        Object.assign(ka[key], extracted[key]);
    }
}

function findPaths(obj, keyToFind, currentPath = []) {
    let paths = [];
    if (typeof obj !== 'object' || obj === null) return paths;
    for (const [k, v] of Object.entries(obj)) {
        const newPath = [...currentPath, k];
        if (k === keyToFind) {
            paths.push(newPath);
        }
        paths = paths.concat(findPaths(v, keyToFind, newPath));
    }
    return paths;
}

for (const [key, value] of Object.entries(extracted)) {
    if (topLevelKeys.includes(key) || key === '_tmp' || key === 'toggle_theme_light') continue;
    
    // Custom routing for ambiguous keys
    let targetPath = null;
    
    if (["transitionFittings", "tools", "weldInSaddles", "fittings", "valves", "accessories"].includes(key)) {
        if (value.seoTitle || value.seoText || value.guideText || value.advTitle) {
            targetPath = ["seoArticle", key];
        } else if (value.label && value.desc) {
            targetPath = ["productsx", "labels", key];
        }
    } else if (["hero", "heroSubtitle", "heroDesc", "intro", "bento", "bentoSection", "range", "tableHead", "sticky", "timeline", "items"].includes(key)) {
        // These are too generic, but maybe they were nested in products?
        // Wait, "products" was already handled as a topLevelKey!
        // So the nested objects inside products should ALREADY be inside extracted["products"]!
        // Wait, in my extract.js, I parsed the replacement strings. 
        // If I replaced just "hero": { ... }, it ended up at the root of extracted_keys.json!
    }
    
    if (!targetPath) {
        const pathsInDe = findPaths(de, key);
        if (pathsInDe.length === 1) targetPath = pathsInDe[0];
    }
    
    if (targetPath) {
        let target = ka;
        for (let i = 0; i < targetPath.length - 1; i++) {
            if (!target[targetPath[i]]) target[targetPath[i]] = {};
            target = target[targetPath[i]];
        }
        const lastKey = targetPath[targetPath.length - 1];
        if (typeof value === 'object' && !Array.isArray(value)) {
            if (!target[lastKey]) target[lastKey] = {};
            Object.assign(target[lastKey], value);
        } else {
            target[lastKey] = value;
        }
    }
}

fs.writeFileSync('ka_reconstructed.json', JSON.stringify(ka, null, 2));
