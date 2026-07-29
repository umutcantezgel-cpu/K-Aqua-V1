const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const el = JSON.parse(fs.readFileSync('messages/el.json', 'utf8'));

// Copy structure from de but translate values
function copyTranslate(obj, translations) {
  // We'll just provide an explicit object since it's safer
}

el.products.pipes = {
  "meta": { "title": "Σωλήνες PP-R & PP-RCT | K-Aqua", "desc": "Γερμανικοί σωλήνες K-Aqua." },
  "hero": { "eyebrow": "ΣΩΛΗΝΕΣ K-AQUA", "title": "ΑΘΡΑΥΣΤΕΣ ΦΛΕΒΕΣ.", "lead": "Ο κορμός του συστήματος." },
  "sticky": {
    "eyebrow": "ΠΟΙΟΤΗΤΑ", "title": "Premium PPR-C", "lead": "100% παρθένο υλικό.",
    "items": [
      { "title": "Αντοχή", "desc": "Μεγάλη διάρκεια ζωής" },
      { "title": "Υγιεινή", "desc": "Ιδανικό για πόσιμο νερό" },
      { "title": "Ηχομόνωση", "desc": "Αθόρυβη λειτουργία" },
      { "title": "Οικονομία", "desc": "Εξοικονόμηση ενέργειας" }
    ]
  },
  "timeline": {
    "title": "Τεχνολογία Fiber", "desc": "Δομή 3 στρωμάτων.",
    "items": [
      { "title": "Εσωτερικό", "desc": "PP-R για υγιεινή" },
      { "title": "Μέση", "desc": "Μίγμα PP-R/Fiberglass" },
      { "title": "Εξωτερικό", "desc": "PP-R για προστασία" },
      { "title": "Πλεονέκτημα", "desc": "Μειωμένη διαστολή" },
      { "title": "Αποτέλεσμα", "desc": "Σταθερότητα" }
    ]
  },
  "bento": {
    "eyebrow": "ΣΕΙΡΕΣ", "title": "Η σωστή σωλήνα.", "lead": "SDR 6 έως SDR 11.",
    "items": [
      { "title": "SDR 6", "desc": "Μέγιστη πίεση (κρύο/ζεστό)" },
      { "title": "SDR 7.4", "desc": "Γενικής χρήσης" },
      { "title": "SDR 9", "desc": "Βελτιστοποιημένη ροή" },
      { "title": "SDR 11", "desc": "Για κρύο νερό" }
    ]
  },
  "cta": { "title": "Δείτε τους Σωλήνες", "desc": "Λήψη καταλόγου.", "primary": "Κατάλογος" }
};

el.products.fittings = {
  "meta": { "title": "Εξαρτήματα (Fittings) | K-Aqua", "desc": "Εξαρτήματα PP-R." },
  "hero": { "eyebrow": "ΕΞΑΡΤΗΜΑΤΑ", "title": "ΓΕΩΜΕΤΡΙΚΗ ΤΕΛΕΙΟΤΗΤΑ.", "lead": "Ομοιογενής ένωση." },
  "intro": { "eyebrow": "ΑΣΦΑΛΕΙΑ", "title": "Η Ένωση.", "lead": "Το μυστικό.", "text1": "Θερμική συγκόλληση.", "text2": "Καθόλου διαρροές." },
  "sticky": {
    "eyebrow": "ΤΕΧΝΟΛΟΓΙΑ", "title": "Γιατί υπερτερούν.", "lead": "Σχεδιασμένα για ροή.",
    "items": [
      { "title": "Ροή", "desc": "Λεία επιφάνεια" },
      { "title": "Σχεδιασμός", "desc": "Χωρίς νεκρά σημεία" },
      { "title": "Βάρος", "desc": "Ελαφριά" },
      { "title": "Αντοχή", "desc": "Υψηλή κρούση" }
    ]
  },
  "bento": {
    "eyebrow": "ΕΦΑΡΜΟΓΕΣ", "title": "Λύσεις.", "lead": "Έχουμε το σωστό εξάρτημα.",
    "items": [
      { "title": "Γωνίες", "desc": "Για αλλαγή κατεύθυνσης" },
      { "title": "Ταφ", "desc": "Διακλαδώσεις" },
      { "title": "Μούφες", "desc": "Ενώσεις" },
      { "title": "Συστολές", "desc": "Αλλαγή διατομής" }
    ]
  },
  "timeline": {
    "title": "Εγκατάσταση", "desc": "Σε δευτερόλεπτα.",
    "items": [
      { "title": "Βήμα 1", "desc": "Προετοιμασία" },
      { "title": "Βήμα 2", "desc": "Θέρμανση" },
      { "title": "Βήμα 3", "desc": "Ένωση" },
      { "title": "Βήμα 4", "desc": "Ψύξη" },
      { "title": "Βήμα 5", "desc": "Έλεγχος" }
    ]
  },
  "depth": { "title": "Μοριακή Ένωση", "text": "Τα υλικά ενώνονται μοριακά.", "badge": "100% Ασφαλές" },
  "cta": { "title": "Βρείτε Εξαρτήματα", "desc": "Δείτε τον κατάλογο.", "primary": "Κατάλογος", "secondary": "Προδιαγραφές" }
};

fs.writeFileSync('messages/el.json', JSON.stringify(el, null, 2));
