const fs = require('fs');
let text = fs.readFileSync('messages/el.json', 'utf8');
const start = text.indexOf('"maerkte_marine"');
const badStr = 'Πείτε μας την κλάση του πλοτα ORCA, RIB iTWO και AVA. Χωρίς σφάλματα σύνταξης."';
text = text.replace(badStr, 'Πείτε μας την κλάση του πλοίου. Θα σας στείλουμε τα αντίστοιχα πιστοποιητικά (DNV, Lloyd\\'s).",\n      "interest": "Συμβουλευτική",\n      "done": "Ένας ειδικός στη ναυτιλία θα σας στείλει τα σχετικά πιστοποιητικά."\n    }\n  }');
// wait, we also need to drop the rest of the array that was merged.
// Actually, let's just use regex to replace from "maerkte_marine" to the end of the file.
