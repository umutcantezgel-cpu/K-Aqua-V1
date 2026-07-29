const fs = require('fs');

const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const enAU = JSON.parse(fs.readFileSync('messages/en-AU.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

const missingKeys = Object.keys(de).filter(k => !enAU.hasOwnProperty(k));

const replacements = [
    [/Catalog/g, 'Catalogue'], [/catalog/g, 'catalogue'],
    [/Center/g, 'Centre'], [/center/g, 'centre'],
    [/Color/g, 'Colour'], [/color/g, 'colour'],
    [/Optimize/g, 'Optimise'], [/optimize/g, 'optimise'],
    [/Customize/g, 'Customise'], [/customize/g, 'customise'],
    [/Program/g, 'Programme'], [/program/g, 'programme'],
    [/Labor/g, 'Labour'], [/labor/g, 'labour']
];

function applyAU(obj) {
    let str = JSON.stringify(obj);
    replacements.forEach(([reg, rep]) => { str = str.replace(reg, rep); });
    return JSON.parse(str);
}

let patches = [];
let currentPatch = [];
let currentSize = 0;
const MAX_SIZE = 25000;

function flushPatch(target, isInitial = false) {
    if (currentPatch.length > 0) {
        let replacementStr = currentPatch.join(",\n");
        if (isInitial) {
            // appending to end of file
            patches.push({
                type: 'append',
                replacement: ",\n" + replacementStr
            });
        } else {
            // replacing a placeholder
            patches.push({
                type: 'replace',
                target: target,
                replacement: replacementStr
            });
        }
        currentPatch = [];
        currentSize = 0;
    }
}

// 1. First, we append catalogx without items, and all other small keys
let topLevel = [];
for (const key of missingKeys) {
    let obj = applyAU(en[key] !== undefined ? en[key] : de[key]);
    
    if (['catalogx', 'solutions', 'markets', 'resources', 'kontaktBlocks'].includes(key)) {
        let clone = { ...obj };
        if (key === 'catalogx') clone.items = { "__PLACEHOLDER_catalogx__": true };
        else if (key === 'solutions') clone = { "__PLACEHOLDER_solutions__": true };
        else if (key === 'markets') clone = { "__PLACEHOLDER_markets__": true };
        else if (key === 'resources') clone = { "__PLACEHOLDER_resources__": true };
        else if (key === 'kontaktBlocks') clone = { "__PLACEHOLDER_kontaktBlocks__": true };
        
        let str = `"${key}": ` + JSON.stringify(clone, null, 2);
        topLevel.push(str);
    } else {
        let str = `"${key}": ` + JSON.stringify(obj, null, 2);
        topLevel.push(str);
    }
}

// Split topLevel into chunks of 25KB
for (let i = 0; i < topLevel.length; i++) {
    let str = topLevel[i];
    if (currentSize + str.length > MAX_SIZE && currentSize > 0) {
        flushPatch(null, true);
    }
    currentPatch.push(str);
    currentSize += str.length;
}
flushPatch(null, true);

// Now for the huge objects, we generate replace patches
const hugeKeys = ['catalogx', 'solutions', 'markets', 'resources', 'kontaktBlocks'];
for (const key of hugeKeys) {
    let obj = applyAU(en[key] !== undefined ? en[key] : de[key]);
    let children = (key === 'catalogx') ? Object.entries(obj.items) : Object.entries(obj);
    let target = `"__PLACEHOLDER_${key}__": true`;
    
    for (let i = 0; i < children.length; i++) {
        const [subKey, subVal] = children[i];
        let str = `"${subKey}": ` + JSON.stringify(subVal, null, 2);
        
        if (currentSize + str.length > MAX_SIZE && currentSize > 0) {
            // Need to place a new placeholder for the NEXT chunk
            let nextPlaceholder = `"__PLACEHOLDER_${key}_${i}__": true`;
            currentPatch.push(nextPlaceholder);
            flushPatch(target, false);
            target = nextPlaceholder;
        }
        currentPatch.push(str);
        currentSize += str.length;
    }
    flushPatch(target, false);
}

fs.writeFileSync('patches.json', JSON.stringify(patches, null, 2));
console.log(`Generated ${patches.length} patches.`);
