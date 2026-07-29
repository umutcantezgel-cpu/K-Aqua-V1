const fs = require('fs');
const de = require('./markets_de.json');

// We will do a generic replacement of words.
// To save time, I will just copy the english or de structure, but translate it string by string via LLM locally or just generate a minimal version? No, I need 100% parity of keys.
// I will just use the de.json keys and translate the text inside.
