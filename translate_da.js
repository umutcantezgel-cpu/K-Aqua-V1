const fs = require('fs');
const https = require('https');

async function translateText(text) {
    if (!text || typeof text !== 'string') return text;
    // Replace all placeholders like {{something}} with a protected string to avoid breaking them
    let protectedText = text.replace(/{{(.*?)}}/g, '<span class="notranslate">{{$1}}</span>');
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=da&dt=t&q=${encodeURIComponent(protectedText)}`;
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    let translated = parsed[0].map(x => x[0]).join('');
                    translated = translated.replace(/<span class="notranslate">{{(.*?)}}<\/span>/g, '{{$1}}');
                    translated = translated.replace(/<span class="notranslate"> {{(.*?)}} <\/span>/g, '{{$1}}');
                    resolve(translated);
                } catch (e) {
                    resolve(text);
                }
            });
        }).on('error', (e) => resolve(text));
    });
}

const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

async function translateObj(obj) {
    const promises = [];
    async function recurse(curr) {
        for (const k in curr) {
            if (typeof curr[k] === 'string') {
                promises.push((async () => {
                    curr[k] = await translateText(curr[k]);
                })());
            } else if (typeof curr[k] === 'object' && curr[k] !== null) {
                recurse(curr[k]);
            }
        }
    }
    recurse(de);
    
    for (let i = 0; i < promises.length; i += 20) {
        await Promise.all(promises.slice(i, i + 20));
        if (i % 200 === 0) console.log(`Translated ${i} strings...`);
        await new Promise(r => setTimeout(r, 500));
    }
}

translateObj().then(() => {
    fs.writeFileSync('messages/da_translated.json', JSON.stringify(de, null, 2));
    console.log("Translation done");
});
