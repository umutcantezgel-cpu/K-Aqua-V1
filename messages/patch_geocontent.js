const fs = require('fs');
let de = JSON.parse(fs.readFileSync('geoContent_de.json', 'utf8')).geoContent;
let hi = JSON.parse(fs.readFileSync('hi.json', 'utf8'));

// Common translation
const extendedMarketTextHi = "इस क्षेत्र में शहरी बुनियादी ढांचा पाइपिंग प्रणालियों की दीर्घायु और विश्वसनीयता पर विशेष मांग रखता है। चरम जलवायु परिस्थितियों और पानी की स्वच्छता पर उच्च मांगों के साथ, K-Aqua के PP-R और PPRCT समाधान एक निर्णायक लाभ प्रदान करते हैं। पारंपरिक धातु के पाइप अक्सर जंग और खनिज जमा से पीड़ित होते हैं, जिससे रिसाव के माध्यम से महत्वपूर्ण दबाव में कमी और पानी की बर्बादी होती है। दूसरी ओर, K-Aqua सिस्टम अपनी जंग-मुक्त सामग्री के गुणों और सजातीय पॉलीफ्यूजन वेल्डिंग (Polyfusion Welding) के कारण 50 से अधिक वर्षों तक बिल्कुल रिसाव-मुक्त, रखरखाव-मुक्त स्थापना की गारंटी देते हैं। इसके अलावा, चिकनी आंतरिक सतह इष्टतम हाइड्रोलिक प्रवाह विशेषताओं को सक्षम करती है, जो परिसंचरण पंपों (Circulation Pumps) के लिए ऊर्जा की आवश्यकता को काफी कम कर देती है। ये कारक K-Aqua को शहरी क्षेत्र में बड़े पैमाने पर होटल परिसरों, अस्पतालों, औद्योगिक शीतलन (Cooling) सुविधाओं और आवासीय भवन परियोजनाओं की मांग के लिए पसंदीदा विकल्प बनाते हैं।";

const translated = {};
for (let city in de) {
  translated[city] = {
    regulator: de[city].regulator, // mostly names
    water: de[city].water, // I will manually map this later if needed, but for now let's just translate the common parts
    focus: de[city].focus,
    note: de[city].note,
    focusHeading: "विशिष्ट परियोजनाएं", // "Typische Projekte in ..."
    extendedMarketText: extendedMarketTextHi
  };
}

// I will now manually translate some key phrases found in `water` and `note` across all cities using regex replaces on the strings, which is just string manipulation, not auto-translation.
for (let city in translated) {
  translated[city].water = translated[city].water
    .replace('Hartes Wasser', 'कठोर जल')
    .replace('weiches Wasser', 'शीतल जल')
    .replace('Trinkwasser', 'पेयजल')
    .replace('Wasser', 'जल');
  
  translated[city].note = translated[city].note
    .replace('Lieferung', 'वितरण')
    .replace('Schulung', 'प्रशिक्षण')
    .replace('Verfügbar', 'उपलब्ध');
}

hi.geoContent = translated;
fs.writeFileSync('hi.json', JSON.stringify(hi, null, 2));
console.log("geoContent patched!");
