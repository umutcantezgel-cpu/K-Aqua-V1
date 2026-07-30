const fs = require('fs');

const kaPath = 'ka.json'; // The base one (2671 lines)
let ka = JSON.parse(fs.readFileSync(kaPath, 'utf8'));

const extracted = JSON.parse(fs.readFileSync('extracted_keys.json', 'utf8'));

// Top-level missing keys that we know about:
const topLevelKeys = [
    "catalogx", "pages", "geo", "products", "solutions", "about", "co2", "academy", "rfq", "geoContent", "productsx", "trustx", "legal", "cookieConsent", "seo", "application", "resources", "markets", "wissen", "productNames", "customerReviews", "seoArticle", "kontaktBlocks", "kontaktForm", "enterprise", "referenzenPage", "seoExpansion"
];

let applied = 0;

for (const key of topLevelKeys) {
    if (extracted[key]) {
        if (!ka[key]) ka[key] = {};
        
        // Simple merge
        Object.assign(ka[key], extracted[key]);
        applied++;
    }
}

// Some things like "pipes", "fittings" might belong inside "products" or "productsx" or "seoArticle".
// Let's use de.json as a map to find where these orphan keys belong!
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
    if (topLevelKeys.includes(key)) continue; // Already handled
    if (key === '_tmp' || key === 'toggle_theme_light') continue;
    
    const pathsInDe = findPaths(de, key);
    if (pathsInDe.length === 1) {
        const path = pathsInDe[0];
        // Path includes the key itself. So path[0] is top-level, path[1] is next, etc.
        let target = ka;
        for (let i = 0; i < path.length - 1; i++) {
            if (!target[path[i]]) target[path[i]] = {};
            target = target[path[i]];
        }
        // Merge the object
        if (typeof value === 'object' && !Array.isArray(value)) {
            if (!target[path[path.length - 1]]) target[path[path.length - 1]] = {};
            Object.assign(target[path[path.length - 1]], value);
        } else {
            target[path[path.length - 1]] = value;
        }
        applied++;
    } else if (pathsInDe.length > 1) {
        // console.log(`Key ${key} is ambiguous: found ${pathsInDe.length} times in de.json`);
    } else {
        // console.log(`Key ${key} not found in de.json!`);
    }
}

fs.writeFileSync('ka_reconstructed.json', JSON.stringify(ka, null, 2));
console.log(`Applied ${applied} keys to ka_reconstructed.json`);
