const fs = require('fs');
const https = require('https');

async function translateText(text, targetLang = 'ro') {
    if (!text || typeof text !== 'string') return text;
    
    // Using a free Google Translate API endpoint (client=gtx)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json && json[0]) {
                        const translated = json[0].map(item => item[0]).join('');
                        resolve(translated);
                    } else {
                        resolve(text);
                    }
                } catch (e) {
                    resolve(text);
                }
            });
        }).on('error', (e) => resolve(text));
    });
}

async function translateObject(obj) {
    if (typeof obj === 'string') {
        return await translateText(obj);
    } else if (Array.isArray(obj)) {
        const newArr = [];
        for (let item of obj) {
            newArr.push(await translateObject(item));
        }
        return newArr;
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (let key in obj) {
            newObj[key] = await translateObject(obj[key]);
        }
        return newObj;
    }
    return obj;
}

async function main() {
    const flatten = (obj, prefix = '') => {
        return Object.keys(obj).reduce((acc, k) => {
            const pre = prefix.length ? prefix + '.' : '';
            if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
                Object.assign(acc, flatten(obj[k], pre + k));
            } else {
                acc[pre + k] = true;
            }
            return acc;
        }, {});
    };
    
    const unflatten = (obj) => {
        const result = {};
        for (const i in obj) {
            const keys = i.split('.');
            keys.reduce((r, e, j) => {
                return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 === j ? obj[i] : {}) : []);
            }, result);
        }
        return result;
    };
    
    const de = require('./messages/de.json');
    const ro = require('./messages/ro.json');
    
    const deFlat = flatten(de);
    const roFlat = flatten(ro);
    
    const missingKeys = Object.keys(deFlat).filter(k => !roFlat[k]);
    console.log(`Found ${missingKeys.length} missing keys`);
    
    const missingValues = {};
    for (const key of missingKeys) {
        // extract the actual value from de
        const parts = key.split('.');
        let val = de;
        for (const part of parts) val = val[part];
        missingValues[key] = val;
    }
    
    // unflatten missingValues to get the object structure
    const missingObj = unflatten(missingValues);
    
    // Now translate the object!
    console.log('Translating...');
    const translatedObj = await translateObject(missingObj);
    
    fs.writeFileSync('ro_missing_translated.json', JSON.stringify(translatedObj, null, 2));
    console.log('Done! Wrote ro_missing_translated.json');
}

main().catch(console.error);
