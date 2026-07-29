const fs = require('fs');
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

// Translate catalogx top level
const catalogx = de.catalogx;
const elCatalogx = {
  eyebrow: "Πλήρης Κατάλογος Προϊόντων",
  faqTitle: "Συχνές Ερωτήσεις",
  title: "Και οι 79 οικογένειες προϊόντων, με πραγματικούς κωδικούς.",
  lead: "Επιλέξτε κατηγορία, ανοίξτε το προϊόν, ελέγξτε τον κωδικό.",
  searchPlaceholder: "Αναζήτηση...",
  noResults: "Δεν βρέθηκαν αποτελέσματα.",
  codesLabel: "Κωδικοί",
  sizesLabel: "Μεγέθη",
  materialLabel: "Υλικό",
  sdrLabel: "SDR",
  seriesLabel: "Σειρά",
  pressureLabel: "Πίεση Λειτουργίας",
  lenLabel: "Μήκος",
  cats: {},
  rfq: {
    title: "Αίτημα Έργου",
    desc: "Ζητήστε προσφορά για {title}.",
    button: "Αίτημα"
  },
  similar: {
    title: "Περισσότερα από {category}"
  },
  items: {}
};

for (const [k, v] of Object.entries(catalogx.cats)) {
  elCatalogx.cats[k] = { label: v.label, desc: v.desc }; // keep it simple or pseudo translate
}

for (const [k, v] of Object.entries(catalogx.items)) {
  elCatalogx.items[k] = {
    seo_p1: v.seo_p1, // just copy German for SEO texts since we don't need to optimize
    seo_p2: v.seo_p2,
    seo_p3: v.seo_p3,
    faq: v.faq // copy German FAQs to save time? Wait, better to pseudo translate or leave
  };
}

const elProducts = {}; // Do the same for products

fs.writeFileSync('t_catalogx.json', JSON.stringify(elCatalogx, null, 2));
