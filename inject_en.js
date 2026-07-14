const fs = require('fs');

const data = JSON.parse(fs.readFileSync('messages/en.json', 'utf-8'));

const guideTexts = {
  pipes: `
    <h2>The Foundation of Modern Plumbing</h2>
    <p>Superior Piping Technology for Every Project is not just a slogan; it is the core philosophy behind K-Aqua's PP-R and PP-RCT systems. When designing a robust, future-proof plumbing or industrial piping network, selecting the right base material is the most critical decision. K-Aqua’s standard PP-R (Polypropylene Random Copolymer) and advanced PP-RCT (Polypropylene Random Copolymer with modified crystallinity and Temperature resistance) pipes offer a revolutionary alternative to traditional metallic piping systems such as copper, galvanized steel, or stainless steel.</p>
    <p>The primary advantage of our plastic piping systems is their absolute immunity to galvanic corrosion and chemical degradation. In regions with highly aggressive, hard, or acidic water conditions, metallic pipes will inevitably suffer from pitting, scale buildup, and eventually catastrophic failure. K-Aqua pipes, however, maintain a completely smooth, inert inner surface throughout their entire service life, which is guaranteed to exceed 50 years under standard operating conditions.</p>
    <p>This mirror-like internal finish not only prevents biofilm adherence and scale accumulation but also significantly reduces internal friction. This means that circulation pumps require less energy to move water through the building, leading to substantial long-term operational savings.</p>
    <ul>
      <li>Exceptional longevity with over 50 years of guaranteed performance.</li>
      <li>Superior resistance to chemical corrosion and structural degradation.</li>
      <li>Low thermal conductivity for better insulation and energy savings.</li>
      <li>Completely non-toxic, preserving the purity and taste of drinking water.</li>
      <li>Recyclable and environmentally friendly production process.</li>
    </ul>
    <p>Furthermore, PP-R has a naturally low thermal conductivity, meaning hot water stays hot longer and cold water stays cold, drastically reducing the required thickness of external insulation while simultaneously preventing condensation in chilled water applications. Whether you are dealing with a complex high-rise residential project, an industrial plant, or a district heating network, our pipes provide the reliability and peace of mind you need. Installation is straightforward and highly efficient, ensuring that labor costs are minimized while the quality of the final result is maximized.</p>
    <p>K-Aqua pipes represent the pinnacle of German engineering, designed meticulously to withstand the most demanding physical and chemical stresses. They are the ideal choice for any contractor looking to build a system that lasts for generations without the need for constant maintenance and repair.</p>
  `,
  fittings: `
    <h2>Connecting with Confidence</h2>
    <p>Secure and Homogeneous Connections form the vital link in any reliable pipe network. The true strength of the K-Aqua piping system lies in its revolutionary joining technology. Unlike traditional systems that rely on mechanical compression, solder, or volatile chemical glues, K-Aqua utilizes thermal polyfusion. Our comprehensive range of fittings—from simple elbows and tees to complex manifolds and threaded transition pieces—is designed to be molecularly fused directly to the pipe.</p>
    <p>During the socket welding process, both the outer wall of the pipe and the inner wall of the fitting are heated simultaneously to exactly 260°C. When pushed together, the melted polymer chains cross-link and solidify as one continuous, homogeneous mass. The resulting joint is virtually indistinguishable from the pipe itself and becomes the strongest point in the entire network. This completely eliminates the risk of micro-leaks that often occur with press or push-fit systems after years of use.</p>
    <p>This completely eliminates the need for rubber O-rings, gaskets, or internal seals that will inevitably degrade, dry out, or fail over decades of thermal cycling. Because the fitting slides over the pipe, there is absolutely no reduction in internal cross-sectional area, meaning zero flow restriction or pressure loss at the joints.</p>
    <ul>
      <li>Permanent molecular bonds that eliminate the risk of leaks.</li>
      <li>No reduction in flow diameter, preserving water pressure.</li>
      <li>Resistance to extreme pressure spikes and water hammer effects.</li>
      <li>Fast, efficient installation process compared to soldering or threading.</li>
      <li>Comprehensive variety of shapes and angles for any architectural layout.</li>
    </ul>
    <p>Additionally, for connections to existing metallic infrastructure, our transition fittings feature deeply embedded, rotation-proof DZR brass inserts that easily withstand extreme torque during the installation of heavy valves and sanitary fixtures. Every fitting undergoes strict dimensional and stress testing before leaving our facility, ensuring that when it arrives on your job site, it will perform flawlessly.</p>
    <p>Choosing K-Aqua fittings means investing in the integrity of the entire plumbing system. Our dedication to quality control ensures that each connection you make is one you will never have to worry about again, providing an enduring solution for all fluid transport applications.</p>
  `,
  valves: `
    <h2>Absolute Flow Control</h2>
    <p>Precise Control and Durable Function are essential for managing modern plumbing networks. Effective fluid management requires robust, reliable control points that can seamlessly integrate into the main distribution network. K-Aqua provides a comprehensive suite of high-performance shut-off valves, including full-bore ball valves, concealed stop valves, and precision globe valves, all designed specifically for direct polyfusion into PP-R pipelines.</p>
    <p>By manufacturing the valve body from the exact same PP-R polymer as the surrounding pipes, we eliminate the need for threaded transition fittings when installing shut-off points. This dramatically speeds up installation time, reduces material costs, and removes potential weak points in the system. The internal mechanical components—such as the precision-machined brass balls, stainless steel stems, and high-grade Teflon (PTFE) seating rings—are engineered to provide decades of incredibly smooth, maintenance-free operation.</p>
    <p>Unlike traditional metallic gate valves that often seize up or leak around the packing gland after years of inactivity, K-Aqua plastic-encapsulated valves are immune to external corrosion, making them perfect for damp mechanical rooms, buried installations, or humid industrial environments.</p>
    <ul>
      <li>Full-bore design prevents any restriction of fluid flow.</li>
      <li>Corrosion-resistant plastic bodies protect internal metal components.</li>
      <li>Direct polyfusion eliminates the need for vulnerable threaded joints.</li>
      <li>Ergonomic handles and precision engineering ensure smooth operation.</li>
      <li>Available in a wide range of sizes to suit both residential and industrial needs.</li>
    </ul>
    <p>Our full-bore design ensures that when the valve is open, there is zero restriction to the hydraulic flow, maintaining optimal system pressure and maximizing the efficiency of circulation pumps. Whether you need to isolate a single bathroom fixture or control the main supply line of a commercial building, K-Aqua valves deliver the reliability and performance required.</p>
    <p>Every valve is rigorously pressure-tested prior to packaging, ensuring that it meets our uncompromising standards for quality. Trust in K-Aqua to provide the control mechanisms that keep your fluid networks operating safely and efficiently day after day, year after year.</p>
  `,
  weldInSaddles: `
    <h2>Branching Made Simple</h2>
    <p>When it comes to expanding or modifying an existing pipeline, Weld-in Saddles for maximum flexibility offer an unparalleled solution. K-Aqua weld-in saddles are an innovative and highly efficient method for creating new branches in existing PP-R and PP-RCT networks. Instead of cutting a large section of the main pipe and installing a bulky, expensive tee fitting, a saddle allows you to simply drill a hole into the side of the pipe and fuse the branch directly onto the exterior wall.</p>
    <p>This process saves a tremendous amount of time, labor, and material, especially when working with large-diameter industrial pipes. The saddle is designed with a concave base that perfectly matches the curvature of the main pipe, ensuring a vast surface area for the polyfusion process. Once welded, the saddle becomes a permanent, integral part of the main pipe, exhibiting the exact same strength and pressure resistance as a factory-molded tee.</p>
    <p>For contractors retrofitting older buildings or adding new equipment to an active mechanical room, weld-in saddles are an absolute game-changer. They require significantly less clearance around the pipe, allowing modifications to be made even in tight, confined spaces where maneuvering a large cutting tool would be impossible.</p>
    <ul>
      <li>Drastically reduces material costs compared to large-diameter tees.</li>
      <li>Minimizes downtime during retrofits and system expansions.</li>
      <li>Requires less physical space for installation in crowded mechanical rooms.</li>
      <li>Maintains the structural integrity and pressure rating of the main pipeline.</li>
      <li>Available with threaded brass inserts for direct connection to sensors or valves.</li>
    </ul>
    <p>We provide specialized drilling tools and contoured heating matrices specifically designed to work in tandem with our saddles. This ensures that every hole is perfectly round and every weld is uniformly heated, guaranteeing a flawless, leak-proof connection every single time. Our weld-in saddles embody K-Aqua's commitment to practical, intelligent engineering.</p>
    <p>Whether you are adding a new sensor port, a drainage line, or a completely new distribution branch, K-Aqua weld-in saddles provide the structural strength and operational simplicity needed to get the job done right the first time.</p>
  `,
  tools: `
    <h2>Precision in Every Cut and Weld</h2>
    <p>Professional Tools for Flawless Installation are the unsung heroes of any successful plumbing project. The reliability of any polyfusion plumbing system is entirely dependent on the precision of the installation tools. K-Aqua provides a comprehensive suite of professional-grade cutting and welding equipment designed to eliminate human error and guarantee perfect, homogeneous joints on every single connection, from 20mm residential lines up to massive 250mm industrial mains.</p>
    <p>A flawless weld begins with a perfectly square, clean cut. Our ratcheting and rotary pipe cutters ensure a burr-free, 90-degree edge, which is absolutely vital for the pipe to seat correctly inside the fitting socket. If a pipe is cut at an angle, the resulting weld will be uneven, potentially leading to flow restrictions or long-term structural failures. Our cutters are built from hardened steel to withstand the rigors of the construction site.</p>
    <p>For the fusion process, K-Aqua hand welding machines and heavy-duty hydraulic welding stations feature electronically controlled heating elements. These thermostats strictly maintain the critical 260°C temperature required for optimal molecular bonding, preventing the plastic from degrading due to overheating or forming brittle, weak joints due to underheating.</p>
    <ul>
      <li>Electronically regulated thermostats guarantee precise welding temperatures.</li>
      <li>High-quality Teflon (PTFE) coating prevents plastic from sticking to the dies.</li>
      <li>Ratcheting pipe cutters reduce hand fatigue and ensure perfectly square cuts.</li>
      <li>Heavy-duty hydraulic rigs provide the immense force needed for large-diameter pipes.</li>
      <li>Electrofusion machines offer automated, documented welding for critical applications.</li>
    </ul>
    <p>The heating matrices themselves are coated in high-quality, non-stick Teflon (PTFE), ensuring clean heat transfer and preventing molten plastic from tearing upon removal. By utilizing original K-Aqua automated electrofusion machines, butt-welding rigs, and specialized saddle tools, contractors can maximize their on-site efficiency, significantly reduce physical fatigue, and provide their clients with documented, 100% leak-proof quality assurance.</p>
    <p>Investing in K-Aqua professional tools is investing in the longevity and integrity of your work. They are engineered to perform reliably in the harshest environments, ensuring that you can deliver German-engineered perfection on every project, regardless of scale or complexity.</p>
  `,
  accessories: `
    <h2>The Finishing Touches</h2>
    <p>Accessories for a standard-compliant installation are what elevate a functional plumbing system into a professional, enduring masterpiece. While pipes and fittings form the core of the network, the supporting accessories are absolutely critical for accommodating thermal expansion, mitigating vibration, and ensuring secure integration into the building's infrastructure. K-Aqua provides a comprehensive ecosystem of accessories designed to work in perfect harmony with our PP-R and PP-RCT products.</p>
    <p>One of the most important considerations in any hot water or heating installation is managing the linear expansion of the pipes. Our specialized pipe clamps are engineered to act as either fixed anchors or sliding guides, allowing the pipe to expand and contract smoothly without causing damaging stress to the joints or the building structure. These clamps feature thick rubber linings that provide excellent acoustic insulation, preventing the transmission of flow noise through the walls.</p>
    <p>Furthermore, our range includes high-grade EPDM flat gaskets, specialized backing flanges with steel cores for industrial connections, and robust repair plugs that allow for quick, permanent fixes if a pipe is accidentally punctured during construction.</p>
    <ul>
      <li>Acoustically lined pipe clamps eliminate the transmission of flow noise.</li>
      <li>Proper anchoring systems safely manage thermal expansion and contraction.</li>
      <li>Steel-reinforced backing flanges ensure secure connections to heavy machinery.</li>
      <li>High-quality EPDM gaskets provide resilient, long-lasting seals at flanged joints.</li>
      <li>Specialized repair plugs offer a permanent solution for accidental drill punctures.</li>
    </ul>
    <p>Using generic or incompatible accessories can severely compromise the performance of a premium piping system. For example, using clamps without rubber linings on a hot water line can lead to irritating clicking noises as the pipe expands, while improper anchoring can cause the pipe to bow or even snap under thermal stress. K-Aqua accessories are rigorously tested to ensure they meet our exacting standards.</p>
    <p>By utilizing our complete range of accessories, installers can ensure that their work not only meets but exceeds local building codes and industry standards. It is the attention to these small details that defines a truly professional installation and guarantees decades of flawless operation.</p>
  `,
  transitionFittings: `
    <h2>Bridging the Gap</h2>
    <p>When connecting modern polymer systems to traditional metallic infrastructure, Secure and Homogeneous Connections are absolutely paramount. Transition fittings serve as the critical bridge between K-Aqua's advanced PP-R/PP-RCT pipes and existing steel, copper, or brass components such as boilers, chillers, and sanitary fixtures. These fittings require an extraordinary level of engineering to ensure that the union between metal and plastic remains completely leak-proof under extreme thermal cycling and mechanical stress.</p>
    <p>K-Aqua transition fittings feature deeply embedded, rotation-proof DZR (Dezincification Resistant) brass inserts. During the injection molding process, the hot PP-R is formed directly around the complex geometric profile of the brass insert. As the plastic cools and shrinks, it grips the brass with immense force, creating an inseparable mechanical bond. This design prevents the brass insert from twisting or pulling out, even when subjected to the high torque of a plumber's wrench during installation.</p>
    <p>Furthermore, the high-quality DZR brass ensures that the metallic portion of the fitting is highly resistant to aggressive water conditions, preventing the premature corrosion that often plagues standard brass fittings. This is especially crucial in hot water systems where the rate of chemical reaction is significantly accelerated.</p>
    <ul>
      <li>DZR brass inserts provide superior resistance to dezincification and corrosion.</li>
      <li>Rotation-proof design easily withstands high torque during threaded installations.</li>
      <li>Inseparable bond between plastic and metal ensures a lifetime of leak-free performance.</li>
      <li>Available in a massive variety of male and female threaded configurations.</li>
      <li>Perfect for connecting PP-R networks to metallic pumps, valves, and boilers.</li>
    </ul>
    <p>Whether you need to adapt a massive 125mm industrial cooling main to a steel flange or simply connect a 20mm residential water line to a chrome angle valve, K-Aqua provides the exact transition piece required. Our extensive catalog includes straight adaptors, threaded elbows, wall-plate brackets, and heavy-duty metal unions, ensuring complete versatility on the job site.</p>
    <p>By trusting K-Aqua transition fittings, you eliminate the weakest link in hybrid plumbing systems. Our uncompromising approach to manufacturing guarantees that the transition between metal and polymer is as strong and reliable as the pipe itself, providing peace of mind for both the installer and the end-user.</p>
  `
};

if (!data.seoArticle) data.seoArticle = {};
if (!data.seoArticle.transitionFittings) {
  data.seoArticle.transitionFittings = {
    advTitle: "Secure and Homogeneous Connections",
    advList: [
      "DZR brass inserts provide superior resistance to dezincification.",
      "Rotation-proof design easily withstands high torque.",
      "Inseparable bond between plastic and metal ensures leak-free performance."
    ],
    seoText: "Transition fittings serve as the critical bridge between K-Aqua's advanced PP-R/PP-RCT pipes and existing steel, copper, or brass components. These fittings require an extraordinary level of engineering to ensure that the union between metal and plastic remains completely leak-proof."
  };
}

for (const [cat, text] of Object.entries(guideTexts)) {
  if (!data.seoArticle[cat]) data.seoArticle[cat] = {};
  data.seoArticle[cat].guideText = text;
}

fs.writeFileSync('messages/en.json', JSON.stringify(data, null, 2));
console.log('en.json injected');
