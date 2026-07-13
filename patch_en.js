const fs = require('fs');
const file = 'messages/en.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

data.resources.support.seoText = {
  "p1": "K-Aqua's technical support is the backbone of our global infrastructure projects. We know that every second counts when installing industrial piping systems and PP-R high-performance lines. Our expert team for fluid technology and polymer systems assists international general contractors, architects, and civil engineers every step of the way.",
  "p2": "From initial planning and isometric calculations to pressure loss layout and on-site welding process monitoring – we guarantee flawless implementation. Our Polypropylene Random Copolymer (PP-R) systems require the highest level of craftsmanship. That is why our Academy provides continuous training, while our support intervenes during complex thermal expansion challenges or specific fluid pressure requirements.",
  "p3": "By utilizing state-of-the-art diagnostic tools and predictive maintenance algorithms, we reduce downtime to an absolute minimum. Whether it involves cold water systems in desert regions, high-purity industrial plants, or heating networks in arctic zones – the K-Aqua support infrastructure ensures smooth operation and the uncompromising longevity of your investment."
};

fs.writeFileSync(file, JSON.stringify(data, null, 2));
