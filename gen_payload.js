const fs = require('fs');

// Read current corrupted da.json to get TargetContent
const daCurrent = fs.readFileSync('messages/da.json', 'utf8').split('\n');
const targetContent = daCurrent.slice(6968, 7120).join('\n'); // Adjust lines as needed
console.log("Target lines:", targetContent.split('\n').length);

// Read da_test.json to get original text
const daTest = fs.readFileSync('messages/da_test.json', 'utf8').split('\n');
const originalText = daTest.slice(6968, 7181).join('\n'); // includes tools and valves

// Read tools_da.json and valves_da.json
const toolsDa = fs.readFileSync('tools_da.json', 'utf8');
const valvesDa = fs.readFileSync('valves_da.json', 'utf8');

// The replacement should be original text but with tools and valves replaced
// Actually, since I have original text, I can just replace tools and valves in it!
let replacementContent = originalText;

// I'll just write a script to generate the fixed da.json locally, 
// so I can see what I need to do.
