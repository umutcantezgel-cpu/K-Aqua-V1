const fs = require('fs');

const el = JSON.parse(fs.readFileSync('messages/el.json', 'utf8'));

// 1. Fill basic strings in products
el.products.narrative = {
  "sizeRange": "Διαθέσιμο από d20 mm έως d250 mm",
  "sizeSpecific": "Ειδική διάσταση για βιομηχανικά έργα",
  "weights": "Βάρη και δεδομένα συσκευασίας κατόπιν αιτήματος",
  "packaging": "Συσκευασία σε χαρτοκιβώτια προστατευμένα από UV",
  "rowCount": "Πλήθος ανά συσκευασία",
  "intro": "Η σειρά K-Aqua προσφέρει την κορυφαία ποιότητα στη διαχείριση ρευστών. Κάθε εξάρτημα παράγεται υπό τις αυστηρότερες προδιαγραφές.",
  "outro": "Για περισσότερες πληροφορίες ή τεχνικά σχέδια, επικοινωνήστε με το τμήμα μηχανικών μας."
};
el.products.uniqueProductContext = "Το προϊόν αυτό έχει σχεδιαστεί για να καλύπτει τις πιο απαιτητικές προδιαγραφές της αγοράς.";
el.products.heroDesc = "Απόλυτη Αρχιτεκτονική του Νερού. Ακρίβεια σε μοριακό επίπεδο.";
el.products.articleNumbers = "Κωδικοί Προϊόντων";
el.products.technicalSpecs = "Τεχνικές Προδιαγραφές";
el.products.eyebrow = "ΠΡΟΪΟΝΤΑ K-AQUA";
el.products.videoGuide = "Οδηγός Εγκατάστασης (Βίντεο)";
el.products.localAvailability = "Διαθεσιμότητα";
el.products.localDesc = "Επικοινωνήστε με τον τοπικό διανομέα για χρόνο παράδοσης.";
el.products.allMarkets = "Παγκόσμια Αγορά";
el.products.title1 = "ΚΟΡΥΦΑΙΑ";
el.products.titleGrad = "ΠΟΙΟΤΗΤΑ";
el.products.lead = "Όλα τα εξαρτήματα κατασκευάζονται στη Γερμανία.";
el.products.ctaCatalog = "Λήψη Καταλόγου";
el.products.ctaVideos = "Όλα τα Βίντεο";
el.products.sysEyebrow = "ΟΛΟΚΛΗΡΩΜΕΝΟ ΣΥΣΤΗΜΑ";
el.products.sysTitle = "Η ΤΕΛΕΙΑ ΕΝΩΣΗ.";
el.products.range = "Διαστάσεις";
el.products.techEyebrow = "ΤΕΧΝΙΚΑ ΣΤΟΙΧΕΙΑ";
el.products.techTitle = "Δεδομένα Απόδοσης.";
el.products.techLead = "Αντοχή χωρίς συμβιβασμούς.";
el.products.ctaFeatures = "Όλα τα χαρακτηριστικά";
el.products.tableHead = "Χαρακτηριστικό";
el.products.tableRows = "Τιμή";

el.products.specAndDim = "Προδιαγραφές & Διαστάσεις";
el.products.certsAndNorms = "Πιστοποιητικά & Πρότυπα";
el.products.approved = "Εγκεκριμένο";
el.products.monitoring = "Συνεχής Έλεγχος";
el.products.certified = "Πιστοποιημένο";
el.products.quickLinks = "Γρήγοροι Σύνδεσμοι";
el.products.calcCo2 = "Υπολογισμός CO2";
el.products.backToFinder = "Επιστροφή στην Αναζήτηση";
el.products.enterpriseCore = "Βιομηχανικός Πυρήνας";
el.products.highPerformance = "Υψηλή Απόδοση";
el.products.highPerformanceDesc = "Τα προϊόντα μας ανταπεξέρχονται στις πιο σκληρές βιομηχανικές συνθήκες.";
el.products.sysPressure = "Πίεση Συστήματος";
el.products.tempMax = "Μέγιστη Θερμοκρασία";
el.products.material = "Υλικό";
el.products.norm = "Πρότυπο (Norm)";
el.products.certification = "Πιστοποίηση";
el.products.lifespan = "Διάρκεια Ζωής";
el.products.fiberTech = "Τεχνολογία Fiber";
el.products.fiberTechDesc = "Σωλήνες ενισχυμένοι με υαλονήματα για μειωμένη γραμμική διαστολή.";
el.products.compliance = "Συμμόρφωση";
el.products.dimensions = "Διαστάσεις";
el.products.globalNetwork = "Παγκόσμιο Δίκτυο";
el.products.globalNetworkDesc = "Εξάγουμε σε περισσότερες από 50 χώρες.";
el.products.whyChoose = "Γιατί να επιλέξετε K-Aqua;";
el.products.sysLead = "Το θεμέλιο του καταλόγου μας: Τέσσερα δομικά στοιχεία ενός ολοκληρωμένου συστήματος PP-R.";

// Now write it back
fs.writeFileSync('messages/el.json', JSON.stringify(el, null, 2));
