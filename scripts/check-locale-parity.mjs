import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MESSAGES_DIR = path.join(__dirname, '../messages');

function getDeepKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys.push(...getDeepKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
  }
  return keys;
}

try {
  if (!fs.existsSync(MESSAGES_DIR)) {
    console.log(`Messages directory not found at ${MESSAGES_DIR}. Skipping.`);
    process.exit(0);
  }

  const files = fs.readdirSync(MESSAGES_DIR)
    .filter(file => file.endsWith('.json'));

  if (files.length <= 1) {
    console.log('0 or 1 locale files found. Nothing to compare.');
    process.exit(0);
  }

  const fileKeysMap = {};
  let allKeysSet = new Set();
  let hasDiscrepancy = false;

  for (const file of files) {
    const filePath = path.join(MESSAGES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    let data;
    try {
      data = JSON.parse(content);
    } catch (err) {
      console.error(`Error parsing JSON in file: ${file}`, err);
      process.exit(1);
    }

    const keys = getDeepKeys(data);
    fileKeysMap[file] = new Set(keys);
    keys.forEach(k => allKeysSet.add(k));
  }

  // Compare each file against the union of all keys
  for (const file of files) {
    const keys = fileKeysMap[file];
    const missing = [...allKeysSet].filter(k => !keys.has(k));

    if (missing.length > 0) {
      console.error(`\x1b[31mError: Locale file "${file}" is missing keys:\x1b[0m`);
      missing.forEach(k => console.error(`  - ${k}`));
      hasDiscrepancy = true;
    }
  }

  if (hasDiscrepancy) {
    console.error('\x1b[31mLocale parity check failed. Locales are not synchronized.\x1b[0m');
    process.exit(1);
  } else {
    console.log('\x1b[32mLocale parity check passed successfully. All files have identical keys.\x1b[0m');
    process.exit(0);
  }
} catch (error) {
  console.error('An unexpected error occurred during locale parity check:', error);
  process.exit(1);
}
