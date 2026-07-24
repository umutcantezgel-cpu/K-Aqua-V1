import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NEXT_APP_DIR = path.join(__dirname, '.next', 'server', 'app');

function scanDirectory(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanDirectory(filePath, fileList);
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = scanDirectory(NEXT_APP_DIR);
const pages = [];
const titles = new Map();
const descriptions = new Map();

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  // Simple regex for parsing HTML just for auditing
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  // Match the first h1
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  
  const title = titleMatch ? titleMatch[1].trim() : '';
  const desc = descMatch ? descMatch[1].trim() : '';
  
  // Clean up h1 text (remove nested tags like span)
  let h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

  const relativePath = path.relative(NEXT_APP_DIR, file);
  
  // Only care about de/en/ar pages
  if (!relativePath.startsWith('de/') && !relativePath.startsWith('en/') && !relativePath.startsWith('ar/')) continue;
  
  pages.push({ path: relativePath, title, desc, h1 });
  
  if (title) {
    if (!titles.has(title)) titles.set(title, []);
    titles.get(title).push(relativePath);
  }
  if (desc) {
    if (!descriptions.has(desc)) descriptions.set(desc, []);
    descriptions.get(desc).push(relativePath);
  }
}

console.log(`Scanned ${pages.length} localized pages.`);

console.log("\n--- MISSING OR POOR H1 ---");
pages.forEach(p => {
  if (!p.h1) {
    console.log(`[MISSING H1] ${p.path}`);
  } else if (!p.h1.toLowerCase().includes('pp-r') && !p.h1.toLowerCase().includes('k-aqua') && !p.h1.toLowerCase().includes('pipe') && !p.h1.toLowerCase().includes('rohr') && !p.h1.toLowerCase().includes('أنابيب')) {
    // Flag if H1 doesn't have keywords
    console.log(`[NO KEYWORDS IN H1] ${p.path} -> "${p.h1}"`);
  }
});

console.log("\n--- DUPLICATE TITLES ---");
for (const [title, paths] of titles.entries()) {
  if (paths.length > 1 && title !== '404') {
    // Only flag if it's not the exact same parameterized route (e.g. dynamic vs static fallback)
    // Wait, in build output, there might be [slug].html and actual slugs.
    // Let's just print them to analyze.
    const nonDynamicPaths = paths.filter(p => !p.includes('['));
    if (nonDynamicPaths.length > 1) {
      console.log(`[DUPLICATE TITLE] "${title}" found in ${nonDynamicPaths.length} pages.`);
      nonDynamicPaths.forEach(p => console.log(`  - ${p}`));
    }
  }
}

console.log("\n--- DUPLICATE DESCRIPTIONS ---");
for (const [desc, paths] of descriptions.entries()) {
  if (paths.length > 1) {
    const nonDynamicPaths = paths.filter(p => !p.includes('['));
    if (nonDynamicPaths.length > 1) {
      console.log(`[DUPLICATE DESC] "${desc}" found in ${nonDynamicPaths.length} pages.`);
    }
  }
}

console.log("\n--- MISSING META DESC ---");
pages.forEach(p => {
  if (!p.desc) {
    console.log(`[MISSING DESC] ${p.path}`);
  }
});
