import fs from 'fs';
import path from 'path';

const url = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
const destDir = path.resolve('public/data');
const destFile = path.join(destDir, 'countries-110m.json');

async function download() {
  console.log(`Fetching world-atlas TopoJSON from ${url}...`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    // Create the directory if it does not exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.writeFileSync(destFile, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Saved TopoJSON to ${destFile}`);
  } catch (error) {
    console.error('Error downloading TopoJSON:', error);
    process.exit(1);
  }
}

download();
