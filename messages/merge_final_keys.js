const fs = require('fs');

function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

let lt = JSON.parse(fs.readFileSync('lt.json', 'utf8'));
let patch = JSON.parse(fs.readFileSync('patch_final_keys.json', 'utf8'));

lt.solutions = deepMerge(lt.solutions, patch);

fs.writeFileSync('lt.json', JSON.stringify(lt, null, 2));
