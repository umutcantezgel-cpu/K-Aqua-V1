const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

const resources = de.resources;
// Pseudo-translate / translate
resources.hero.eyebrow = "Πόροι";
resources.hero.title1 = "Λήψεις.";
resources.hero.title2 = "Έγγραφα & Δεδομένα.";
resources.hero.desc = "Όλα τα τεχνικά έγγραφα, CAD, και πιστοποιητικά για τους μηχανικούς.";
resources.manifesto.title1 = "Τέλος της ασάφειας.";
resources.manifesto.title2 = "Αρχή της απόλυτης ελέγχου.";
resources.manifesto.p1 = "Στην αρχιτεκτονική και τη βιομηχανία, οι ασαφείς διατυπώσεις είναι κίνδυνος.";
resources.manifesto.p2 = "Γι' αυτό γράφουμε τα κείμενά μας με ακρίβεια γερμανικής μηχανικής.";
resources.bento.eyebrow = "Αρχιτεκτονική";
resources.bento.title = "Προδιαγραφές που προστατεύουν.";
resources.bento.lead = "Σχεδιασμένο για μηχανικούς.";
resources.grid.title = "Ανατομία.";
resources.grid.desc = "Όλα στην εντέλεια.";
resources.cta.title = "Ξεκινήστε τώρα.";
resources.cta.desc = "Αποκτήστε πρόσβαση στη βιβλιοθήκη μας.";
resources.cta.btn1 = "Λήψη";
resources.cta.btn2 = "Επικοινωνία";

fs.writeFileSync('rep_resources.txt', `  "resources": ${JSON.stringify(resources, null, 2)}\n}`);
