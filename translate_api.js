const fs = require('fs');
const https = require('https');

async function translateText(text, targetLang = 'sk') {
  if (typeof text !== 'string' || !text.trim()) return text;
  
  // Use a public translation API format (MyMemory or similar, or Google Translate free endpoint)
  // We'll use a simple Google Translate fetch hack
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const translated = parsed[0].map(item => item[0]).join('');
          resolve(translated);
        } catch (e) {
          resolve(text); // Fallback to original on error
        }
      });
    }).on('error', () => resolve(text));
  });
}

async function translateObj(obj) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === 'string') {
        obj[i] = await translateText(obj[i]);
      } else if (typeof obj[i] === 'object' && obj[i] !== null) {
        await translateObj(obj[i]);
      }
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = await translateText(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        await translateObj(obj[key]);
      }
    }
  }
}

async function run() {
  const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
  const targetKeys = ['trustx', 'partnerx', 'academyx', 'aboutx', 'legal', 'resources', 'markets', 'productsx'];
  const extracted = {};
  for (const k of targetKeys) {
    if (de[k]) extracted[k] = JSON.parse(JSON.stringify(de[k]));
  }
  
  console.log('Starting translation...');
  await translateObj(extracted);
  
  fs.writeFileSync('translated_missing.json', JSON.stringify(extracted, null, 2));
  console.log('Translation complete! Saved to translated_missing.json');
}

run();
