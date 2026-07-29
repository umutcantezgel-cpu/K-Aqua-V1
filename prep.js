const fs = require('fs');

const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
const es = JSON.parse(fs.readFileSync('messages/es.json', 'utf8'));

// Translations map for missing/leaked keys
const tx = {
  "nav.pipes": "Tuberías",
  "nav.fittings": "Accesorios",
  "nav.valves": "Válvulas",
  "nav.accessories": "Complementos",
  "nav.tools": "Herramientas",

  "pages.finderGuideText": "<h2>Buscador interactivo de productos para sistemas de tuberías K-Aqua</h2><p>Utilice nuestro innovador buscador de productos para identificar el componente exacto para su instalación de tuberías específica. Ya sea que busque tuberías PP-R estándar para instalaciones de agua potable, tuberías PPRCT reforzadas con fibra para sistemas industriales exigentes o accesorios y válvulas de transición especiales, nuestra herramienta filtra todo el catálogo en tiempo real. La búsqueda de productos le ayuda a seleccionar por diámetro (d20 a d630), clase de presión (clase SDR) y material.</p><p>Un sistema de tuberías bien estructurado requiere una planificación precisa y la combinación exacta de tuberías, accesorios (como manguitos, codos y tees) y los correspondientes accesorios adicionales. Nuestro buscador de productos elimina la búsqueda que consume mucho tiempo en catálogos PDF estáticos y en su lugar le proporciona datos inmediatos y fiables sobre números de artículo, unidades de embalaje y especificaciones técnicas. Con solo unos pocos clics, puede compilar su lista de materiales y garantizar la compatibilidad de los diferentes componentes para sistemas de calefacción, refrigeración y agua potable. Esto no solo optimiza su proceso de planificación, sino que también minimiza los errores al realizar el pedido de materiales para su próximo proyecto de construcción.</p>",

  "geo.cityMetaTitle": "Sistemas de tuberías PP-R en {city}",
  "geo.hubMetaTitle": "Sistemas de tuberías PP-R para {country}",
  "geo.hubH1": "Soluciones de infraestructura para {country}",
  "geo.hubLead": "K-Aqua ofrece soluciones de infraestructura PP-R y PP-RCT certificadas para {country}. Nuestros sistemas de tuberías cumplen con los más altos estándares internacionales y están optimizados para los desafíos específicos en {country}.",
  "geo.hubContextTitle": "Contexto regional: {context}",
  "geo.hubContextBody": "Nuestros sistemas de tuberías K-Aqua PP-R/PP-RCT de producción alemana ofrecen soluciones de infraestructura sostenibles para {country}. Están diseñados específicamente para satisfacer los desafíos infraestructurales locales.",
  "geo.hubCitiesTitle": "Ubicaciones locales y ciudades de referencia",

  "geo.hubs.deutschland.description": "Como mercado nacional de K-Aqua, Alemania exige los más altos estándares de calidad y durabilidad en la construcción. Nuestros <strong>sistemas de tuberías PP-R y PP-RCT</strong> abordan de manera efectiva y sostenible los problemas de renovación pendientes en la infraestructura alemana de calefacción y agua potable. Con materiales libres de corrosión y certificados por la DVGW, reducimos los costos de mantenimiento y garantizamos la máxima higiene del sistema en proyectos a gran escala municipales, comerciales y privados durante décadas.",
  "geo.hubs.deutschland.metaDesc": "Sistemas de tuberías PP-R/PP-RCT certificados para Alemania. Ingeniería alemana contra los problemas de renovación en la infraestructura de calefacción y agua potable.",
  
  "geo.hubs.oesterreich.description": "La topografía alpina y las exigentes regulaciones de construcción de Austria requieren soluciones de tuberías extremadamente resilientes. Nuestros sistemas K-Aqua aseguran suministros fiables de agua potable y calefacción distribuida, incluso bajo las severas variaciones de temperatura y fluctuaciones de presión que a menudo se encuentran en el paisaje de infraestructuras austriaco.",
  "geo.hubs.oesterreich.metaDesc": "Sistemas K-Aqua PP-R/PP-RCT para Austria. Soluciones de infraestructura duraderas y resistentes a las temperaturas para proyectos alpinos.",
  
  "geo.hubs.schweiz.description": "Suiza es sinónimo de precisión y del más alto nivel en ingeniería de construcción. K-Aqua suministra sistemas de tuberías sostenibles que cumplen de forma fiable con los estrictos estándares suizos de higiene (SVGW) y eficiencia energética (Minergie), lo que nos convierte en un socio preferido para proyectos exigentes de suministro e HVAC.",
  "geo.hubs.schweiz.metaDesc": "Soluciones de tuberías premium para Suiza. Los sistemas K-Aqua cumplen con los más altos estándares suizos en cuanto a calidad e higiene del agua potable.",

  "geo.hubs.uae.description": "En los Emiratos Árabes Unidos, el calor extremo y la refrigeración agresiva imponen inmensas demandas a los sistemas de fluidos. Las redes PP-RCT de K-Aqua proporcionan una gestión térmica excepcional y resistencia a la corrosión para aplicaciones de refrigeración y desalinización, apoyando el rápido crecimiento arquitectónico en los EAU con infraestructura a prueba de fugas a largo plazo.",
  "geo.hubs.uae.metaDesc": "Sistemas de tuberías robustos para los EAU. Soluciones K-Aqua resistentes a la corrosión para refrigeración de distritos e infraestructura de agua.",
  
  "geo.hubs.ksa.description": "La Visión 2030 de Arabia Saudita está impulsando megaproyectos masivos que requieren soluciones de construcción escalables e innovadoras. K-Aqua entrega sistemas de tuberías de gran diámetro, ligeros pero duraderos, que aceleran los tiempos de instalación y resisten el duro clima de la región de KSA y las aguas ricas en minerales.",
  "geo.hubs.ksa.metaDesc": "Soluciones K-Aqua de gran diámetro para Arabia Saudita. Apoyando proyectos de infraestructura de la Visión 2030 con tecnología PP-RCT.",
  
  "geo.hubs.singapur.description": "La densidad urbana de Singapur requiere soluciones de construcción ultraeficientes que ahorren espacio. K-Aqua proporciona sistemas de tuberías PP-R ligeros y fáciles de soldar que agilizan las instalaciones en rascacielos al tiempo que previenen la corrosión y mantienen una pureza estricta del agua en un clima tropical húmedo.",
  "geo.hubs.singapur.metaDesc": "Sistemas de tuberías eficientes para rascacielos en Singapur. Tuberías K-Aqua PP-R resistentes a la corrosión para infraestructura tropical.",

  "products.seoArticle.accessories.advList[0]": "Compatibilidad total del sistema",
  "products.seoArticle.accessories.advList[1]": "Procesos de instalación simplificados",

  "co2.guideText": "<p>Nuestra calculadora de CO₂ es una herramienta basada en datos que ayuda a arquitectos, ingenieros e instaladores a tomar decisiones informadas con respecto a la huella ecológica de sus instalaciones de tuberías. Al cuantificar directamente el ahorro de emisiones al elegir polímeros modernos sobre metales intensivos en carbono, permite a los equipos de proyectos alcanzar sus objetivos de sostenibilidad (como las certificaciones LEED o BREEAM) con mucha mayor facilidad. Utilice esta herramienta para generar de forma rápida e impactante informes de impacto ambiental para sus clientes.</p>",

  "geoContent.amman.extendedMarketText": "En el clima seco y las redes de distribución desafiantes de Amán, las tuberías PP-R de K Aqua brindan una solución resistente a las fugas y conservadora de agua, minimizando las pérdidas en una región con escasez de agua.",
  "geoContent.kairo.extendedMarketText": "Para la metrópolis en rápida expansión de El Cairo, nuestros sistemas PP-RCT ligeros pero robustos aceleran la construcción de infraestructuras críticas al tiempo que previenen la corrosión causada por las agresivas condiciones locales del agua.",
  "geoContent.istanbul.extendedMarketText": "En Estambul, el puente entre continentes, K Aqua suministra tuberías duraderas que soportan cargas tanto térmicas como sísmicas, ofreciendo seguridad y longevidad para proyectos tanto asiáticos como europeos.",
  "geoContent.singapur.extendedMarketText": "La planificación urbana de Singapur exige una construcción sostenible en espacios reducidos; nuestros sistemas de soldadura limpios y compactos garantizan un flujo de fluidos seguro sin el riesgo de degradación por humedad tropical.",
  "geoContent.kualalumpur.extendedMarketText": "Los desarrollos de rascacielos de Kuala Lumpur se benefician de las líneas de tuberías de alta presión y con tolerancia a la temperatura de K Aqua, mitigando eficazmente los desafíos de los ciclos de enfriamiento severos y la gestión hidráulica pesada.",
  "geoContent.mumbai.extendedMarketText": "El inmenso crecimiento y las fluctuaciones climáticas estacionales de Mumbai requieren tuberías que no sucumban a la corrosión o la rotura; K Aqua garantiza un suministro ininterrumpido en entornos industriales y residenciales extremos.",
  "geoContent.kapstadt.extendedMarketText": "A medida que Ciudad del Cabo prioriza la resiliencia del agua, los sistemas de plástico higiénicos de K Aqua evitan la contaminación y apoyan la modernización eficiente y consciente del diseño de las redes de agua envejecidas.",
  "geoContent.nairobi.extendedMarketText": "El rápido desarrollo comercial de Nairobi requiere infraestructuras adaptables; K Aqua ofrece sistemas fáciles de instalar que reducen de manera drástica el tiempo y el costo de la mano de obra, estableciendo nuevos estándares de construcción en Kenia.",

  "seo.extendedMarketText.p4": "Desde la planificación inicial hasta la fase de ejecución, K Aqua es su socio de confianza.",
  "seo.extendedMarketText.p5": "Con innovaciones continuas y altos estándares de calidad, damos forma activa al futuro de la tecnología de tuberías a nivel global.",
  "seoExpansion.t1": "Sistemas sostenibles de alta calidad para el éxito de su proyecto",
  "seoExpansion.p1": "K-Aqua proporciona una gama completa de productos PP-R y PP-RCT excepcionalmente duraderos que superan las expectativas de la industria. Nuestra ingeniería de precisión en Alemania garantiza la calidad del agua a la vez que optimiza los costes a largo plazo.",
  "seoExpansion.t2": "Soluciones de instalación adaptables para cada desafío",
  "seoExpansion.p2": "Ya sea para plomería residencial o entornos industriales exigentes, las conexiones especializadas de K-Aqua ofrecen una flexibilidad y seguridad de instalación sin precedentes. Mitigamos el riesgo y la complejidad con componentes diseñados por expertos.",
  "seoExpansion.t3": "Construyendo un futuro más limpio y ecológico juntos",
  "seoExpansion.p3": "Las construcciones modernas requieren materiales sostenibles. Al reemplazar los metales propensos a la corrosión con nuestros avanzados polímeros, contribuye a reducir las emisiones de carbono y promueve una economía de infraestructura verdaderamente circular.",
  "seoExpansion.t4": "Innovación y soporte global de un socio comprometido",
  "seoExpansion.p4": "En K-Aqua, la colaboración no termina en el momento de la entrega. Nuestra red de soporte global y capacitación especializada empodera a su equipo para lograr instalaciones impecables y eficiencia operativa de por vida.",

  "products.seoArticle.pipes.guideTitle": "Guía completa: Planificación e instalación de sistemas de tuberías K Aqua PP-R y PPRCT",
  "seo.extendedProductText.p1": "Nuestros sistemas K Aqua de alta calidad ofrecen la máxima fiabilidad y durabilidad para proyectos exigentes en todo el mundo.",
  "seo.extendedProductText.p2": "Gracias a materiales avanzados y la fabricación de precisión en Alemania, garantizamos una instalación sencilla y seguridad a largo plazo.",
  "seo.extendedProductText.p3": "Confíe en la calidad certificada y en soluciones sostenibles que cumplen con los más altos estándares internacionales y aumentan la eficiencia de su proyecto.",
  "seo.extendedMarketText.p1": "Las soluciones de K Aqua están diseñadas específicamente para cumplir con los requisitos de los mercados locales e internacionales.",
  "seo.extendedMarketText.p2": "Apoyamos a los contratistas y planificadores locales con experiencia técnica y sistemas fiables para cada desafío.",
  "seo.extendedMarketText.p3": "A través de nuestra red global, nos aseguramos de que reciba exactamente los productos que son más adecuados para sus proyectos de construcción regionales.",

  "seoArticle.transitionFittings.seoTitle": "Accesorios de transición en latón y PP-R",
  "seoArticle.transitionFittings.seoText": "Los accesorios de transición sirven como puente vital entre las tuberías avanzadas PP-R/PPRCT de K Aqua y los componentes existentes de acero, cobre o latón. Estos accesorios requieren un nivel extraordinario de ingeniería.",
  "seoArticle.transitionFittings.advTitle": "Conexiones seguras y homogéneas",
  "seoArticle.transitionFittings.advList[0]": "Los insertos de latón DZR ofrecen una resistencia superior contra la descincificación.",
  "seoArticle.transitionFittings.advList[1]": "El diseño antitorsión soporta altos torques.",
  "seoArticle.transitionFittings.advList[2]": "Una conexión inseparable entre el plástico y el metal garantiza un rendimiento sin fugas.",
  "seoArticle.transitionFittings.guideText": "\n    <h2>Cerrando la brecha</h2>\n    <p>Cuando se trata de conectar sistemas de polímeros modernos con la infraestructura metálica tradicional, las conexiones seguras y homogéneas son de absoluta importancia. Los accesorios de transición sirven como un puente vital entre las tuberías avanzadas PP-R/PPRCT de K Aqua y los componentes existentes de acero, cobre o latón como calderas, enfriadores y accesorios de plomería. Estos accesorios requieren un nivel extraordinario de ingeniería para garantizar que la conexión entre el metal y el plástico permanezca completamente libre de fugas incluso bajo ciclos térmicos extremos y estrés mecánico.</p>\n    <p>Los accesorios de transición K Aqua cuentan con insertos de latón DZR (resistentes a la descincificación) profundamente incrustados y antitorsión. Durante el proceso de moldeo por inyección, el PP-R caliente se moldea directamente alrededor del complejo perfil geométrico del inserto de latón. A medida que el plástico se enfría y se contrae, agarra el latón con una fuerza enorme, formando una unión mecánica inseparable. Este diseño evita que el inserto de latón se tuerza o se salga, incluso cuando se somete al alto torque de una llave de fontanero durante la instalación.</p>\n    <p>Además, el latón DZR de alta calidad garantiza que la porción metálica del accesorio sea extremadamente resistente a las condiciones agresivas del agua, previniendo la corrosión prematura que a menudo afecta a los accesorios de latón estándar. Esto es especialmente crítico en sistemas de agua caliente, donde la velocidad de reacción se acelera significativamente.</p>\n    <ul>\n      <li>Los insertos de latón DZR ofrecen una resistencia superior contra la descincificación y la corrosión.</li>\n      <li>El diseño antitorsión maneja altos torques durante instalaciones roscadas sin problemas.</li>\n      <li>Una unión inseparable de plástico a metal garantiza un rendimiento sin fugas durante toda su vida útil.</li>\n      <li>Disponibles en una amplia gama de configuraciones roscadas macho y hembra.</li>\n      <li>Perfectos para conectar redes PP-R a bombas metálicas, válvulas y calderas.</li>\n    </ul>\n    <p>Ya sea que necesite adaptar una tubería de refrigeración industrial masiva de 125 mm a una brida de acero, o simplemente conectar una línea de agua residencial de 20 mm a una válvula angular cromada, K Aqua tiene la pieza de transición exacta requerida.</p>\n  ",

  "seoArticle.fittings.seoTitle": "Accesorios y conexiones de plástico para PP-R",
  "seoArticle.fittings.seoText": "Conexiones seguras y homogéneas con accesorios K-Aqua PP-R. Descubra nuestra amplia gama de accesorios para los más altos estándares en instalación de tuberías.",
  "seoArticle.weldInSaddles.seoTitle": "Injertos de soldadura para tuberías PP-R",
  "seoArticle.weldInSaddles.seoText": "Los injertos de soldadura K-Aqua permiten ramificaciones posteriores fáciles y seguras sin interrumpir la línea. Mínimo tiempo de instalación y máxima integridad del sistema.",
  "seoArticle.weldInSaddles.guideText": "\n    <h2>Ramificación simplificada</h2>\n    <p>Cuando se trata de expandir o modificar una tubería existente, los injertos de soldadura ofrecen una solución sin igual para la máxima flexibilidad. Los injertos de soldadura de K Aqua son un método innovador y altamente eficiente para crear nuevas ramificaciones en redes PP-R y PPRCT existentes. En lugar de cortar una gran sección de la tubería principal e instalar una conexión en T costosa y voluminosa, un injerto le permite simplemente perforar un agujero en el costado de la tubería y soldar la ramificación directamente a la pared exterior.</p>\n    <p>Este proceso ahorra enormes cantidades de tiempo, mano de obra y material, especialmente cuando se trabaja con tuberías industriales de gran diámetro. El injerto cuenta con una base cóncava que se adapta perfectamente a la curvatura de la tubería principal, proporcionando una gran área de superficie para el proceso de polifusión. Una vez soldado, el injerto se convierte en una parte permanente e integral de la tubería principal, presumiendo de la misma exactitud en clasificación de presión y fuerza que una T moldeada de fábrica.</p>\n    <p>Para los contratistas que renuevan edificios antiguos o agregan nuevos equipos a una sala de máquinas activa, los injertos de soldadura son un verdadero cambio en las reglas del juego. Requieren significativamente menos espacio libre alrededor de la tubería, lo que permite realizar modificaciones en espacios reducidos y confinados donde sería imposible maniobrar con una herramienta de corte grande.</p>\n    <ul>\n      <li>Reduce drásticamente los costos de material en comparación con las conexiones en T de gran diámetro.</li>\n      <li>Minimiza el tiempo de inactividad durante renovaciones y expansiones del sistema.</li>\n      <li>Requiere menos espacio físico para la instalación en salas de máquinas abarrotadas.</li>\n      <li>Mantiene la integridad estructural y la clasificación de presión de la línea principal.</li>\n      <li>Disponible con insertos roscados de latón para conexión directa a sensores o válvulas.</li>\n    </ul>\n    <p>Ofrecemos herramientas de perforación especializadas y matrices de calentamiento contorneadas diseñadas específicamente para su uso con nuestros injertos. Esto asegura que cada orificio sea perfectamente redondo y cada soldadura se caliente uniformemente, garantizando una conexión impecable y sin fugas en todo momento. Nuestros injertos de soldadura ejemplifican el compromiso de K Aqua con la ingeniería práctica e inteligente.</p>\n    <p>Ya sea que esté agregando un nuevo puerto de sensor, una línea de drenaje o una rama de colector completamente nueva, los injertos de soldadura K Aqua proporcionan la resistencia estructural y la simplicidad operativa necesarias para hacer el trabajo bien desde la primera vez.</p>\n  "
};

function setPath(obj, path, value) {
  const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!curr[parts[i]]) curr[parts[i]] = {};
    curr = curr[parts[i]];
  }
  curr[parts[parts.length - 1]] = value;
}

const rootKeys = ['nav', 'pages', 'geo', 'products', 'co2', 'geoContent', 'seo', 'seoArticle'];
const esOriginal = JSON.parse(JSON.stringify(es));
for (const [k, v] of Object.entries(tx)) {
  setPath(es, k, v);
}

const chunks = [];

rootKeys.forEach(rk => {
  const targetStr = '"' + rk + '": ' + JSON.stringify(esOriginal[rk], null, 2);
  const newStr = '"' + rk + '": ' + JSON.stringify(es[rk], null, 2);
  if (targetStr !== newStr) {
    chunks.push({
      TargetContent: '  ' + targetStr.replace(/\n/g, '\n  '),
      ReplacementContent: '  ' + newStr.replace(/\n/g, '\n  '),
      StartLine: 1,
      EndLine: 100000,
      AllowMultiple: false
    });
  }
});

// Insert seoExpansion before "service"
chunks.push({
  TargetContent: '  "service": {\n    "sup": [',
  ReplacementContent: '  "seoExpansion": ' + JSON.stringify(es.seoExpansion, null, 2).replace(/\n/g, '\n  ') + ',\n  "service": {\n    "sup": [',
  StartLine: 1,
  EndLine: 100000,
  AllowMultiple: false
});

fs.writeFileSync('chunks.json', JSON.stringify(chunks, null, 2));
console.log('Wrote chunks:', chunks.length);
