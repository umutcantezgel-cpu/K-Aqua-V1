const fs = require('fs');
const https = require('https');

async function translateText(text, targetLang) {
    if (!text || typeof text !== 'string') return text;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    const translated = parsed[0].map(x => x[0]).join('');
                    resolve(translated);
                } catch (e) {
                    resolve(text);
                }
            });
        }).on('error', (e) => resolve(text));
    });
}

const data = JSON.parse(fs.readFileSync('missing_ro.json', 'utf8'));

async function translateObj(obj) {
    const promises = [];
    async function recurse(curr) {
        for (const k in curr) {
            if (typeof curr[k] === 'string') {
                const original = curr[k];
                promises.push(
                    translateText(original, 'ro').then(res => {
                        curr[k] = res;
                    })
                );
            } else if (typeof curr[k] === 'object' && curr[k] !== null) {
                recurse(curr[k]);
            }
        }
    }
    recurse(obj);
    
    // Process in batches of 20 to avoid rate limit
    for (let i = 0; i < promises.length; i += 20) {
        await Promise.all(promises.slice(i, i + 20));
        console.log(`Translated ${Math.min(i + 20, promises.length)} / ${promises.length}`);
        await new Promise(r => setTimeout(r, 1000));
    }
}

translateObj(data).then(() => {
    fs.writeFileSync('translated_ro.json', JSON.stringify(data, null, 2));
    console.log("DONE");
});
