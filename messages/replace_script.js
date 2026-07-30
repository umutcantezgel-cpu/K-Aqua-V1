const fs = require('fs');

const currentAbout = fs.readFileSync('current_about.txt', 'utf8');
const newAbout = fs.readFileSync('about_ka.json', 'utf8');
const file = fs.readFileSync('ka.json', 'utf8');

const replaced = file.replace(currentAbout, newAbout);
fs.writeFileSync('ka.json', replaced);
