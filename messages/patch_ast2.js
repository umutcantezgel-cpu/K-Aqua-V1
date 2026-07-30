const fs = require('fs');

const kaPath = 'ka.json';
let ka = JSON.parse(fs.readFileSync(kaPath, 'utf8'));
const extracted = JSON.parse(fs.readFileSync('extracted_keys.json', 'utf8'));

const topLevelKeys = [
    "catalogx", "pages", "geo", "products", "solutions", "about", "co2", "academy", "rfq", "geoContent", "productsx", "trustx", "legal", "cookieConsent", "seo", "application", "resources", "markets", "wissen", "productNames", "customerReviews", "seoArticle", "kontaktBlocks", "kontaktForm", "enterprise", "referenzenPage", "seoExpansion"
];

for (const key of topLevelKeys) {
    if (extracted[key]) {
        if (!ka[key]) ka[key] = {};
        Object.assign(ka[key], extracted[key]);
    }
}

const de = JSON.parse(fs.readFileSync('de.json', 'utf8'));

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
    
    const pathsInDe = findPaths(de, key);
    if (pathsInDe.length === 1) {
        const path = pathsInDe[0];
        let target = ka;
        for (let i = 0; i < path.length - 1; i++) {
            if (!target[path[i]]) target[path[i]] = {};
            target = target[path[i]];
        }
        if (typeof value === 'object' && !Array.isArray(value)) {
            if (!target[path[path.length - 1]]) target[path[path.length - 1]] = {};
            Object.assign(target[path[path.length - 1]], value);
        } else {
            target[path[path.length - 1]] = value;
        }
    } else if (pathsInDe.length > 1) {
        console.log(`Ambiguous: ${key}`);
    }
}

// Write it out
fs.writeFileSync('ka_reconstructed.json', JSON.stringify(ka, null, 2));
