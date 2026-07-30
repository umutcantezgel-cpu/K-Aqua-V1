import json

es = {
  "home": {
    "kicker": "Contactar a Ventas Técnicas",
    "head": "¿Necesita asesoramiento sobre nuestro sistema PP-R?",
    "short": "Asesoramiento sobre el sistema PP-R",
    "text": "Déjenos su número de teléfono y el tema de su consulta. Uno de nuestros asesores técnicos de su región le llamará a la brevedad.",
    "interest": "Asesoramiento",
    "done": "Se ha puesto en contacto con éxito. Nos pondremos en contacto a la brevedad."
  },
  "unternehmen": {
    "kicker": "Sobre K-Aqua",
    "head": "¿Desea saber más sobre nuestra capacidad de producción en Alemania?",
    "short": "Información sobre nuestra planta en Alemania",
    "text": "Si está planificando un gran proyecto, con gusto organizaremos una visita a la planta o una videollamada para presentarle nuestros procesos de extrusión y control de calidad.",
    "interest": "Asesoramiento",
    "done": "Nuestro equipo se pondrá en contacto para programar una visita a la fábrica."
  },
  "produkte_fittings": {
    "kicker": "Accesorios y Piezas Especiales",
    "head": "¿Preguntas sobre nuestra técnica de soldadura de accesorios?",
    "short": "Técnica de soldadura para accesorios y piezas",
    "text": "Ya sea fusión por manguito, fusión a tope o soldadura por electrofusión: si tiene dudas sobre el proceso de soldadura óptimo para sus diámetros, le asesoraremos de inmediato.",
    "interest": "Redes de agua potable",
    "done": "Un experto en soldadura se comunicará con usted."
  },
  "produkte_rohre": {
    "kicker": "Tubos PP-R",
    "head": "¿Cuál es la clase SDR adecuada para su presión?",
    "short": "Determine la clase SDR correcta",
    "text": "SDR 6, 7.4 u 11: si tiene dudas sobre la presión nominal requerida, infórmenos sobre la temperatura de flujo y la presión máxima. Nosotros calcularemos el resto.",
    "interest": "Redes de agua potable",
    "done": "Un experto le llamará para definir la clase de tubería."
  },
  "produkte_armaturen": {
    "kicker": "Válvulas y Llaves",
    "head": "¿Busca válvulas PPRC resistentes y seguras?",
    "short": "Determine los parámetros para sus válvulas",
    "text": "Nuestras válvulas de asiento inclinado y válvulas de bola están diseñadas para garantizar una vida útil máxima y evitar el estancamiento. Le ayudamos a seleccionar la válvula adecuada.",
    "interest": "Redes de agua potable",
    "done": "Se ha enviado su solicitud sobre válvulas."
  },
  "produkte_werkzeuge": {
    "kicker": "Herramientas de Soldadura",
    "head": "¿Necesita herramientas de montaje para su equipo en obra?",
    "short": "Herramientas para soldadura PP-R",
    "text": "Desde máquinas de soldar hasta equipos de fusión a tope. Póngase en contacto con nosotros si necesita alquilar o comprar equipos profesionales para K-Aqua.",
    "interest": "Asesoramiento",
    "done": "Un miembro de soporte técnico se comunicará para el suministro de herramientas."
  },
  "produkte_uebergaenge": {
    "kicker": "Uniones y Conexiones Metálicas",
    "head": "¿Cómo conectar K-Aqua con instalaciones metálicas existentes?",
    "short": "Uniones a tubos metálicos",
    "text": "Utilizamos latón DZR libre de deszinquificación. Envíenos el tipo de rosca o brida requerida y le indicaremos la pieza de transición óptima.",
    "interest": "Asesoramiento",
    "done": "Nos comunicaremos para asesorarle sobre conexiones de transición."
  },
  "produkte_zubehoer": {
    "kicker": "Accesorios y Soportes",
    "head": "¿Tendido correcto de tubos con abrazaderas y rieles?",
    "short": "Determine las distancias entre abrazaderas",
    "text": "Le asesoramos sobre distancias de sujeción, puntos fijos y puntos deslizantes para guiar de manera segura la expansión térmica de los tubos PP-R.",
    "interest": "Asesoramiento",
    "done": "Un técnico se contactará para discutir los detalles de montaje."
  },
  "katalog": {
    "kicker": "Catálogo",
    "head": "¿No encontró un artículo específico?",
    "short": "Solicite una pieza especial o el catálogo",
    "text": "A veces, un número de artículo en la lista de materiales no es unívoco. Envíenos su lista y nuestro equipo de ventas identificará los componentes K-Aqua correspondientes.",
    "interest": "Asesoramiento",
    "done": "Nuestro departamento de ventas está revisando su lista de materiales."
  },
  "finder": {
    "kicker": "Buscador de Productos",
    "head": "¿Necesita ayuda con la selección de productos?",
    "short": "Le ayudamos a encontrar los componentes correctos",
    "text": "Explíquenos brevemente el caso de uso. Nuestros especialistas en productos encontrarán la combinación de componentes adecuada para su aplicación.",
    "interest": "Asesoramiento",
    "done": "Un especialista en productos se pondrá en contacto con usted."
  },
  "produkte": {
    "kicker": "Resumen de Productos",
    "head": "¿Requiere una cotización para un proyecto completo?",
    "short": "Obtenga un presupuesto general",
    "text": "Suba aquí su lista de materiales en la próxima página o indíquenos el alcance en una llamada. Calcularemos una cotización completa que incluye tubos y accesorios.",
    "interest": "Redes de agua potable",
    "done": "Ventas confirmará la recepción para comenzar el presupuesto."
  },
  "academy": {
    "kicker": "K-Aqua Academy",
    "head": "¿Desea capacitar y certificar a sus instaladores?",
    "short": "Inscriba a su equipo en nuestra Academia",
    "text": "Solo las uniones soldadas correctamente garantizan durabilidad. Llevamos a cabo cursos de certificación DVS en nuestras instalaciones o directamente en su obra.",
    "interest": "Asesoramiento",
    "done": "El equipo de la Academia le llamará para planificar su capacitación."
  },
  "referenzen": {
    "kicker": "Referencias de Proyectos",
    "head": "¿Desea hablar sobre un proyecto de referencia específico?",
    "short": "Conozca más sobre nuestros megaproyectos",
    "text": "Conectamos con gusto a nuestros gerentes de proyectos que han supervisado hospitales o rascacielos. Obtenga conocimientos de primera mano.",
    "interest": "Asesoramiento",
    "done": "Nuestro gerente de proyectos internacional se comunicará con usted."
  },
  "support": {
    "kicker": "Soporte Técnico",
    "head": "¿Problemas en la obra? Nuestros ingenieros están aquí.",
    "short": "Línea directa para urgencias en obra",
    "text": "¿Preguntas sobre el protocolo de soldadura o una prueba de presión fallida? Indique brevemente el problema y un ingeniero de soporte llamará de inmediato.",
    "interest": "Asesoramiento",
    "done": "El soporte técnico ha sido notificado y le llamará en breve."
  },
  "ausschreibungstexte": {
    "kicker": "Licitaciones",
    "head": "¿Problemas integrando los formatos GAEB?",
    "short": "Ayuda con textos de licitación GAEB/Datanorm",
    "text": "Si su software (por ej. ORCA, RIB) reporta un error al importar nuestros textos, le ayudaremos de inmediato a adaptar el formato.",
    "interest": "Datos BIM",
    "done": "Nuestro equipo de datos BIM le brindará soporte en breve."
  },
  "service": {
    "kicker": "Servicios para Constructores",
    "head": "¿Necesita que calculemos isometrías y tuberías?",
    "short": "Solicite cálculos isométricos",
    "text": "Ofrecemos soporte de planificación de extremo a extremo. Hable con nosotros sobre la creación de un modelo CAD/BIM y listas de materiales exactas.",
    "interest": "Asesoramiento",
    "done": "Un asesor de servicios de planificación está asignado a su caso."
  },
  "maerkte_trinkwasser": {
    "kicker": "Agua Potable",
    "head": "Máxima higiene para el suministro de agua.",
    "short": "Consulte sobre normativas de agua potable (DVGW)",
    "text": "¿Necesita una aclaración sobre los estándares KTW y las directrices DVGW para su proyecto? Le llamaremos para confirmar la aplicabilidad.",
    "interest": "Redes de agua potable",
    "done": "Nos comunicaremos para asesorarle sobre el suministro de agua potable."
  },
  "maerkte_klima": {
    "kicker": "Calefacción y Refrigeración",
    "head": "Sistemas PP-R para agua fría y bombas de calor.",
    "short": "Sistemas de agua de refrigeración y aislamiento",
    "text": "¿Dudas sobre la prevención de condensación y cálculos de caída de presión? Nuestros técnicos térmicos dimensionarán su sistema y tuberías.",
    "interest": "Sistemas de tuberías",
    "done": "Un ingeniero térmico le contactará a la brevedad."
  },
  "maerkte_industrie": {
    "kicker": "Fluidos Industriales",
    "head": "Transporte de químicos y lodos abrasivos.",
    "short": "Verificación de resistencia química",
    "text": "El PP-R es altamente resistente, pero los químicos específicos necesitan validación. Envíenos su concentración química y verificaremos nuestra tabla de resistencias de inmediato.",
    "interest": "Asesoramiento",
    "done": "Nuestro laboratorio probará la resistencia y se comunicará con usted."
  },
  "maerkte_schiffbau": {
    "kicker": "Construcción Naval",
    "head": "Resistencia a la vibración para redes de buques.",
    "short": "Solicitar certificados navales",
    "text": "Ya sea agua gris, negra o de lastre: indíquenos la clase del buque. Le enviaremos los certificados de clasificación correspondientes (DNV, Lloyd's) para nuestro sistema.",
    "interest": "Asesoramiento",
    "done": "Un experto naval le enviará los certificados relevantes."
  },
  "maerkte_landwirtschaft": {
    "kicker": "Agricultura e Invernaderos",
    "head": "Redes de riego robustas para un rendimiento máximo.",
    "short": "Diseño de sistemas de riego",
    "text": "Indíquenos el tamaño y los requerimientos de agua. Diseñaremos una red PP-R duradera, resistente a las heladas que evita el crecimiento de algas por su opacidad total.",
    "interest": "Redes de agua potable",
    "done": "Nos pondremos en contacto en breve para discutir su red de riego."
  },
  "maerkte": {
    "kicker": "Mercados Regionales",
    "head": "Hable con un especialista de exportación para su región.",
    "short": "Logística y aprobaciones para su país",
    "text": "Exportamos a nivel mundial. Indíquenos su país de destino y le informaremos sobre normas locales, distribuidores y plazos realistas de transporte marítimo.",
    "interest": "Asesoramiento",
    "done": "Un gerente de exportaciones para su región se pondrá en contacto."
  },
  "loesungen_hochhaus": {
    "kicker": "Construcción de Rascacielos",
    "head": "Estabilización de presión en conductos verticales extremos.",
    "short": "Cálculo de pérdida de presión en rascacielos",
    "text": "La hidromecánica en edificios altos no tolera errores. Indíquenos la altura y número de pisos, y le ayudaremos con válvulas reductoras de presión y curvas de expansión.",
    "interest": "Datos BIM",
    "done": "Un especialista en hidráulica de rascacielos le contactará."
  },
  "loesungen_krankenhaus": {
    "kicker": "Hospitales",
    "head": "Prevención de legionela en operaciones clínicas.",
    "short": "Higiene del agua potable para clínicas",
    "text": "Proteger a los pacientes inmunocomprometidos es primordial. Le asesoraremos sobre tuberías en anillo, reducción de espacios muertos y desinfección térmica con nuestro sistema PP-R.",
    "interest": "Redes de agua potable",
    "done": "Un experto en higiene del agua potable se pondrá en contacto pronto."
  },
  "loesungen_hotel": {
    "kicker": "Hoteles y Resorts",
    "head": "Desacoplamiento acústico para el descanso de sus huéspedes.",
    "short": "Aislamiento acústico en hoteles",
    "text": "El ruido en las habitaciones contiguas provoca quejas. Indíquenos la estructura de las paredes, y recomendaremos soportes insonorizados y la optimización del flujo.",
    "interest": "Asesoramiento",
    "done": "Le contactaremos para optimizar el aislamiento acústico de su hotel."
  },
  "loesungen": {
    "kicker": "Soluciones Especiales",
    "head": "Sistemas personalizados para proyectos complejos.",
    "short": "Asesoramiento técnico para proyectos especiales",
    "text": "¿Las soluciones estándar no son suficientes? Esboce su desafío, nuestro departamento de diseño desarrollará colectores y componentes personalizados.",
    "interest": "Asesoramiento",
    "done": "Nuestro departamento de diseño revisará su solicitud y se pondrá en contacto."
  },
  "co2_rechner": {
    "kicker": "Ahorro de CO2",
    "head": "Validemos la huella de carbono de su proyecto.",
    "short": "Solicite un balance detallado de CO2",
    "text": "La calculadora proporciona estimaciones iniciales. Envíenos su lista de materiales exacta, y crearemos un certificado detallado de ahorro de CO2 en comparación con las tuberías de metal.",
    "interest": "Asesoramiento",
    "done": "Un responsable de sostenibilidad se pondrá en contacto."
  },
  "trust_center": {
    "kicker": "Certificados y Normas",
    "head": "¿Necesita un certificado específico para la inspección final?",
    "short": "Solicite certificados para aceptación de obra",
    "text": "Si el inspector de obra solicita pruebas específicas (DVGW, SKZ, KIWA), háganos saber qué estándar requiere. Le enviaremos el PDF más reciente.",
    "interest": "Datos BIM",
    "done": "Ubicaremos el certificado correspondiente y se lo enviaremos."
  },
  "projektanfrage": {
    "kicker": "Inicio del Proyecto",
    "head": "Dénos los datos clave, le proporcionaremos un presupuesto inicial.",
    "short": "Estimación rápida para constructores",
    "text": "Cargue sus planos en el siguiente paso o indíquenos el tipo de uso y metros cuadrados por teléfono. Le daremos una cotización preliminar.",
    "interest": "Sistemas de tuberías",
    "done": "El equipo del proyecto se pondrá en contacto para discutir el presupuesto."
  },
  "kontakt": {
    "kicker": "Línea Directa",
    "head": "El camino más corto a la central de K Aqua.",
    "short": "Le llamamos directamente a la obra",
    "text": "Sin esperas. Ingrese su número e indíquenos brevemente el tema. Un asesor técnico o de ventas especializado se comunicará con usted de inmediato.",
    "interest": "Asesoramiento",
    "done": "Hemos recibido su solicitud. Un asesor se comunicará pronto."
  },
  "news": {
    "kicker": "Prensa y Medios",
    "head": "¿Preguntas sobre un comunicado de prensa o un nuevo producto?",
    "short": "Contacto con Relaciones Públicas",
    "text": "Para imágenes en alta resolución, entrevistas con la gerencia, o información de fondo sobre nuestras innovaciones, deje sus datos de contacto.",
    "interest": "Asesoramiento",
    "done": "Nuestro departamento de prensa se pondrá en contacto con usted en breve."
  },
  "karriere": {
    "kicker": "Carreras en K-Aqua",
    "head": "Haga una pregunta informal sobre nuestras vacantes.",
    "short": "Línea directa al Departamento de Recursos Humanos",
    "text": "¿No está seguro si su perfil encaja o quiere aclarar detalles de trabajo antes de postularse? Nuestro equipo de RR. HH. responderá sus preguntas fácilmente por teléfono.",
    "interest": "Asesoramiento",
    "done": "Recursos Humanos le contactará para conocerle brevemente."
  },
  "partnerschaft": {
    "kicker": "Convertirse en Distribuidor",
    "head": "Amplíe su catálogo con tuberías premium alemanas.",
    "short": "Consultar condiciones para distribuidores",
    "text": "¿Es usted un mayorista que busca un proveedor confiable de PP-R? Indíquenos su región y mercado objetivo, y discutiremos modelos de exclusividad y condiciones comerciales.",
    "interest": "Asesoramiento",
    "done": "Nuestro director de ventas para asociaciones se comunicará con usted."
  },
  "impressum": {
    "kicker": "Legal",
    "head": "¿Preguntas sobre la información de nuestra empresa?",
    "short": "Contacto con la Secretaría K Aqua",
    "text": "Deje su número de teléfono aquí si tiene alguna pregunta legal o formal sobre nuestra empresa.",
    "interest": "Asesoramiento",
    "done": "Nos comunicaremos para aclarar sus inquietudes."
  },
  "datenschutz": {
    "kicker": "Privacidad de Datos",
    "head": "Hable con nuestro responsable de protección de datos.",
    "short": "Solicite información sobre sus datos",
    "text": "Tomamos en serio su privacidad. Si desea solicitar acceso, eliminación o detalles sobre el procesamiento de sus datos, deje sus datos de contacto.",
    "interest": "Asesoramiento",
    "done": "El responsable de protección de datos se pondrá en contacto con usted."
  },
  "fallback": {
    "kicker": "Contacto",
    "head": "Hable directamente con nuestros ingenieros.",
    "short": "Línea directa a nuestros ingenieros",
    "text": "Un número de teléfono, un email, un clic en su tema. Eso es todo, nosotros aclararemos el resto durante la llamada.",
    "interest": "Asesoramiento",
    "done": "Un asesor experto se pondrá en contacto con usted dentro de un día hábil."
  }
}

with open('kontakt_blocks_es.json', 'w') as f:
    json.dump({"kontaktBlocks": es}, f, indent=2, ensure_ascii=False)
