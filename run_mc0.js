const fs = require('fs');
const chunks = JSON.parse(fs.readFileSync('tool_chunks_1.json', 'utf8'));

// Fix chunk 4
chunks[4].TargetContent = '  "service": {\n    "eyebrow": "Servicio",';
chunks[4].ReplacementContent = `  "seoExpansion": {
    "t1": "Sistemas sostenibles de alta calidad para el éxito de su proyecto",
    "p1": "K-Aqua proporciona una gama completa de productos PP-R y PP-RCT excepcionalmente duraderos que superan las expectativas de la industria. Nuestra ingeniería de precisión en Alemania garantiza la calidad del agua a la vez que optimiza los costes a largo plazo.",
    "t2": "Soluciones de instalación adaptables para cada desafío",
    "p2": "Ya sea para plomería residencial o entornos industriales exigentes, las conexiones especializadas de K-Aqua ofrecen una flexibilidad y seguridad de instalación sin precedentes. Mitigamos el riesgo y la complejidad con componentes diseñados por expertos.",
    "t3": "Construyendo un futuro más limpio y ecológico juntos",
    "p3": "Las construcciones modernas requieren materiales sostenibles. Al reemplazar los metales propensos a la corrosión con nuestros avanzados polímeros, contribuye a reducir las emisiones de carbono y promueve una economía de infraestructura verdaderamente circular.",
    "t4": "Innovación y soporte global de un socio comprometido",
    "p4": "En K-Aqua, la colaboración no termina en el momento de la entrega. Nuestra red de soporte global y capacitación especializada empodera a su equipo para lograr instalaciones impecables y eficiencia operativa de por vida."
  },
  "service": {
    "eyebrow": "Servicio",`;

const esStr = fs.readFileSync('messages/es.json', 'utf8');
const validChunks = chunks.filter(c => esStr.includes(c.TargetContent));
console.log('Valid chunks:', validChunks.length, '/', chunks.length);
fs.writeFileSync('mc0_valid.json', JSON.stringify(validChunks, null, 2));
