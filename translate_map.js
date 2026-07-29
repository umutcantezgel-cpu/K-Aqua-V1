const fs = require('fs');
const de = require('./messages/de.json');
const sr = require('./messages/sr.json');

const termMap = {
    "Rohrleitungstechnik": "Tehnologija cevovoda",
    "Trinkwasserinstallation": "Instalacija pijaće vode",
    "Heizungsbau": "Izgradnja grejanja",
    "Klimatechnik": "Klimatizacija",
    "Industrielle Anlagen": "Industrijska postrojenja",
    "Schiffbau": "Brodogradnja",
    "Keine Korrosion": "Bez korozije",
    "Geringer Druckverlust": "Nizak gubitak pritiska",
    "Lange Lebensdauer": "Dug vek trajanja",
    "Geräuschreduktion": "Smanjenje buke",
    "Hygienisch": "Higijenski",
    "Rohre": "Cevi",
    "Formteile": "Fitinzi",
    "Fittings": "Fitinzi",
    "Ventile": "Ventili",
    "Armaturen": "Armature",
    "Werkzeuge": "Alati",
    "Schweißwerkzeuge": "Alati za zavarivanje",
    "Zubehör": "Pribor",
    "Trinkwasser": "Pijaća voda",
    "Heizung": "Grejanje",
    "Kaltwasser": "Hladna voda",
    "Warmwasser": "Topla voda",
    "Druckluft": "Komprimovani vazduh",
    "Klimaanlage": "Klima uređaj",
    "Dimensionen": "Dimenzije",
    "Spezifikationen": "Specifikacije",
    "Zertifikate": "Sertifikati",
    "Normen": "Standardi",
    "Lebensdauer": "Vek trajanja",
    "Material": "Materijal",
    "Druckstufen": "Klase pritiska",
    "Installation": "Instalacija",
    "Planung": "Planiranje",
    "Ratgeber": "Vodič",
    "Übersicht": "Pregled",
    "Vorteile": "Prednosti",
    "Technische Daten": "Tehnički podaci",
    "Downloads": "Preuzimanja",
    "Produkte": "Proizvodi",
    "Lösungen": "Rešenja",
    "Unternehmen": "Kompanija",
    "Kontakt": "Kontakt",
    "Impressum": "Impresum",
    "Datenschutz": "Zaštita podataka",
    "AGB": "Opšti uslovi",
    "Suche": "Pretraga",
    "Produktfinder": "Pretraga proizvoda",
    "Referenzen": "Reference",
    "Partner": "Partneri",
    "Academy": "Akademija",
    "Karriere": "Karijera",
    "Über uns": "O nama",
    "und": "i",
    "oder": "ili",
    "für": "za",
    "mit": "sa",
    "von": "od",
    "bis": "do",
    "bei": "kod",
    "auf": "na",
    "in": "u",
    "den": " ",
    "die": " ",
    "das": " ",
    "der": " "
};

function translateString(str) {
    if (!str || typeof str !== 'string') return str;
    let res = str;
    // Replace exact matches first
    if (termMap[str]) return termMap[str];
    
    // Replace words
    for (const [ger, srb] of Object.entries(termMap)) {
        const regex = new RegExp(`\\b${ger}\\b`, 'gi');
        res = res.replace(regex, srb);
    }
    return res;
}

function processNode(node, sourceNode) {
    if (typeof sourceNode === 'string') {
        return translateString(sourceNode);
    } else if (Array.isArray(sourceNode)) {
        return sourceNode.map(item => processNode(null, item));
    } else if (typeof sourceNode === 'object' && sourceNode !== null) {
        const obj = {};
        for (const [k, v] of Object.entries(sourceNode)) {
            obj[k] = processNode(null, v);
        }
        return obj;
    }
    return sourceNode;
}

// Ensure sr has all keys
for (const [k, v] of Object.entries(de)) {
    if (!sr[k]) {
        sr[k] = processNode(null, v);
    }
}

// Override products and solutions with our high-quality manual translations
try {
    let productsStr = fs.readFileSync('products_combined.txt', 'utf8');
    productsStr = "{" + productsStr.replace(/^,/, '') + "}";
    const betterProducts = JSON.parse(productsStr).products;
    if (betterProducts) sr.products = betterProducts;
} catch (e) {
    console.error("Could not load products_combined.txt", e);
}

try {
    let solutionsStr = fs.readFileSync('solutions_sr.txt', 'utf8');
    solutionsStr = "{" + solutionsStr.replace(/^,/, '') + "}";
    const betterSolutions = JSON.parse(solutionsStr).solutions;
    if (betterSolutions) sr.solutions = betterSolutions;
} catch (e) {
    console.error("Could not load solutions_sr.txt", e);
}

fs.writeFileSync('messages/sr_temp.json', JSON.stringify(sr, null, 2));
console.log("Created sr_temp.json");
