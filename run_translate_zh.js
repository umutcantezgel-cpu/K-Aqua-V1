const fs = require('fs');
const https = require('https');

async function translateText(text, targetLang = 'zh-CN') {
  if (typeof text !== 'string' || !text.trim()) return text;
  
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          let translated = parsed[0].map(item => item[0]).join('');
          
          // Fix formatting issues from translation if necessary
          // e.g., < span > to <span>
          translated = translated.replace(/<\s*span\s*>/g, '<span>').replace(/<\s*\/\s*span\s*>/g, '</span>');
          translated = translated.replace(/<\s*strong\s*>/g, '<strong>').replace(/<\s*\/\s*strong\s*>/g, '</strong>');
          translated = translated.replace(/<\s*br\s*>/g, '<br>');
          translated = translated.replace(/{\s*([^}]+)\s*}/g, '{$1}'); // Fix template variables like { count } -> {count}
          
          resolve(translated);
        } catch (e) {
          resolve(text);
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
  const targetKeys = [
    'about', 'academy', 'geoContent', 'productsx', 'solutionsx', 
    'trustx', 'partnerx', 'academyx', 'servicex', 'aboutx', 
    'newsx', 'contactx', 'careerx', 'legal', 'seo', 
    'application', 'menu', 'quote', 'resources', 'markets', 
    'wissen', 'catalogx', 'products', 'solutions'
  ];
  
  const extracted = {};
  for (const k of targetKeys) {
    if (de[k]) extracted[k] = JSON.parse(JSON.stringify(de[k]));
  }
  
  console.log('Starting translation...');
  await translateObj(extracted);
  
  fs.writeFileSync('/tmp/translated_zh.json', JSON.stringify(extracted, null, 2));
  console.log('Translation complete! Saved to /tmp/translated_zh.json');
}

run();
