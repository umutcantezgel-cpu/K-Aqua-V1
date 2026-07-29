const fs = require('fs');

const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const enAU = JSON.parse(fs.readFileSync('messages/en-AU.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

const missingKeys = Object.keys(de).filter(k => !enAU.hasOwnProperty(k));

let currentObj = {};
let fileIndex = 0;
let currentSize = 0;
const MAX_SIZE = 25000;

function flush() {
    if (Object.keys(currentObj).length > 0) {
        fs.writeFileSync(`insert_${fileIndex}.json`, JSON.stringify(currentObj, null, 2));
        console.log(`insert_${fileIndex}.json: ${currentSize} bytes`);
        fileIndex++;
        currentObj = {};
        currentSize = 0;
    }
}

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
    
    if (key === 'catalogx' || key === 'solutions' || key === 'markets' || key === 'resources' || key === 'kontaktBlocks') {
        let rootObj = { ...sourceObj };
        let children;
        if (key === 'catalogx') {
            children = Object.entries(rootObj.items || {});
            delete rootObj.items;
            currentObj[key] = rootObj;
            currentObj[key].items = {};
        } else {
            children = Object.entries(rootObj);
            currentObj[key] = {};
        }
        
        for (const [subKey, subVal] of children) {
            let subStr = JSON.stringify(subVal);
            if (currentSize + subStr.length > MAX_SIZE && currentSize > 0) flush();
            
            if (key === 'catalogx') {
                if (!currentObj['__catalogx_items']) currentObj['__catalogx_items'] = {};
                currentObj['__catalogx_items'][subKey] = subVal;
            } else {
                if (!currentObj[`__${key}`]) currentObj[`__${key}`] = {};
                currentObj[`__${key}`][subKey] = subVal;
            }
            currentSize += subStr.length;
        }
        continue;
    }
    
    let objStr = JSON.stringify(sourceObj);
    if (currentSize + objStr.length > MAX_SIZE && currentSize > 0) flush();
    
    currentObj[key] = sourceObj;
    currentSize += objStr.length;
}
flush();
