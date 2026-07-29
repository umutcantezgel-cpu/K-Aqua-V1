const fs = require('fs');

const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const enAU = JSON.parse(fs.readFileSync('messages/en-AU.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

const missingKeys = Object.keys(de).filter(k => !enAU.hasOwnProperty(k));

let chunks = [];
let currentChunk = {};
let currentSize = 0;
const MAX_SIZE = 15000;

function addChunk() {
    if (Object.keys(currentChunk).length > 0) {
        chunks.push(currentChunk);
        currentChunk = {};
        currentSize = 0;
    }
}

// Simple US to AU mapping
const replacements = [
    [/Catalog/g, 'Catalogue'],
    [/catalog/g, 'catalogue'],
    [/Center/g, 'Centre'],
    [/center/g, 'centre'],
    [/Color/g, 'Colour'],
    [/color/g, 'colour'],
    [/Optimize/g, 'Optimise'],
    [/optimize/g, 'optimise'],
    [/Customize/g, 'Customise'],
    [/customize/g, 'customise'],
    [/Program/g, 'Programme'],
    [/program/g, 'programme'],
    [/Labor/g, 'Labour'],
    [/labor/g, 'labour']
];

function applyAU(obj) {
    let str = JSON.stringify(obj);
    replacements.forEach(([reg, rep]) => {
        str = str.replace(reg, rep);
    });
    return JSON.parse(str);
}

for (const key of missingKeys) {
    let sourceObj = en[key] !== undefined ? en[key] : de[key];
    sourceObj = applyAU(sourceObj);
    
    if (key === 'catalogx') {
        let catObj = { ...sourceObj };
        let items = catObj.items || {};
        delete catObj.items;
        
        currentChunk[key] = catObj;
        currentChunk[key].items = {};
        addChunk();
        
        for (const [itemKey, itemVal] of Object.entries(items)) {
            let itemStr = JSON.stringify(itemVal);
            if (currentSize + itemStr.length > MAX_SIZE) {
                addChunk();
            }
            if (!currentChunk['__catalogx_items']) currentChunk['__catalogx_items'] = {};
            currentChunk['__catalogx_items'][itemKey] = itemVal;
            currentSize += itemStr.length;
        }
        addChunk();
        continue;
    }
    
    if (['solutions', 'markets', 'resources', 'kontaktBlocks'].includes(key)) {
        let rootObj = { ...sourceObj };
        let children = Object.entries(rootObj);
        let partialObj = {};
        
        // Push the empty object first so the key exists
        currentChunk[key] = {};
        addChunk();

        for (const [subKey, subVal] of children) {
            let subStr = JSON.stringify(subVal);
            if (currentSize + subStr.length > MAX_SIZE && currentSize > 0) {
                addChunk();
            }
            if (!currentChunk[`__${key}`]) currentChunk[`__${key}`] = {};
            currentChunk[`__${key}`][subKey] = subVal;
            currentSize += subStr.length;
        }
        addChunk();
        continue;
    }
    
    let objStr = JSON.stringify(sourceObj);
    if (currentSize + objStr.length > MAX_SIZE && currentSize > 0) {
        addChunk();
    }
    currentChunk[key] = sourceObj;
    currentSize += objStr.length;
}
addChunk();

chunks.forEach((c, i) => {
    fs.writeFileSync(`scratch_chunk_${i}.json`, JSON.stringify(c, null, 2));
    console.log(`Chunk ${i}: ${Object.keys(c).join(', ')} - ${JSON.stringify(c).length} bytes`);
});
