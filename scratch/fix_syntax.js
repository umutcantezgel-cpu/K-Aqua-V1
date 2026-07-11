const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./app', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regex to match the botched snippet:
    // }: { params: Promise<{ locale: string }> }) {
    //   const { locale } = await params;
    //   return constructMetadata({
    //     ...
    //   });
    // }
    
    const badRegex = /\}:\s*\{\s*params:\s*Promise<\{\s*locale:\s*string\s*\}>\s*\}\)\s*\{\s*const\s*\{\s*locale\s*\}\s*=\s*await\s*params;\s*return\s*constructMetadata\(\{[\s\S]*?\}\);\s*\}/g;

    if (badRegex.test(content)) {
      console.log(`Fixing: ${filePath}`);
      const newContent = content.replace(badRegex, '');
      fs.writeFileSync(filePath, newContent, 'utf8');
    }
  }
});
