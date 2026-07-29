const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

const manifesto = {
  eyebrow: "Το Μανιφέστο",
  title: "Η γνώση είναι η βάση μας.",
  lead: "Στην K Aqua, πιστεύουμε ότι η συνεχής εκπαίδευση οδηγεί στην τελειότητα."
};

const scroll = de.academy.glossar.scroll;
scroll.eyebrow = "Κινηματική & Επιστήμη Υλικών";
scroll.title = "Η Διαδικασία K Aqua.";
scroll.lead = "Από το μόριο έως την τελική δοκιμή.";
scroll.items[0].title = "Εξώθηση υπό Υψηλή Πίεση";
scroll.items[0].desc = "Ακριβής έλεγχος θερμοκρασίας.";
scroll.items[1].title = "Υδροστατικές Δοκιμές";
scroll.items[1].desc = "Προσομοίωση ακραίων συνθηκών.";
scroll.items[2].title = "Συγκόλληση Πολυφασικής Σύντηξης";
scroll.items[2].desc = "Ομοιογενής μοριακή σύνδεση.";
scroll.items[3].title = "Αντίσταση στη Σπηλαίωση";
scroll.items[3].desc = "Ελαχιστοποίηση της αντίστασης ροής.";

fs.writeFileSync('rep_academy.txt', 
`      "manifesto": ${JSON.stringify(manifesto, null, 2).replace(/\n/g, '\n      ')},
      "scroll": ${JSON.stringify(scroll, null, 2).replace(/\n/g, '\n      ')},
      "bento": {`);
