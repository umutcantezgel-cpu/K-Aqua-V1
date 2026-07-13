const fs = require('fs');

const files = [
  'app/[locale]/loesungen/page.tsx',
  'app/[locale]/academy/page.tsx',
  'app/[locale]/service/page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find namespace
  const nsMatch = content.match(/namespace:\s*"([^"]+)"/);
  if (!nsMatch) return;
  
  // Check if we already patched
  if (content.includes('className="sr-only"')) return;
  
  // We just need to ensure `t` and `meta` are available or we can just fetch the raw meta
  // In most pages, `generateMetadata` uses `t.raw("something")`
  // We can just add a global sr-only div
  
});
