import json

es = {
  "zertifizierung": {
    "lab": {
      "eyebrow": "Dentro del Laboratorio",
      "title1": "La Anatomía",
      "title2": "de la Perfección.",
      "desc": "Antes de que un sistema K Aqua salga de fábrica, debe pasar por nuestro centro de pruebas interno. Una instalación altamente equipada donde sometemos los materiales a condiciones que nunca experimentarán en la realidad.",
      "items": [
        {
          "title": "MFR (Índice de Fluidez - Melt Flow Rate)",
          "desc": "Control del índice de fluidez para asegurar la viscosidad exacta durante la extrusión y en la posterior soldadura en obra."
        },
        {
          "title": "OIT (Tiempo de Inducción a la Oxidación)",
          "desc": "Análisis térmico para determinar la resistencia al envejecimiento. La prueba de que nuestros estabilizadores protegen el plástico de la degradación durante décadas."
        },
        {
          "title": "Prueba de Presión Interna a Largo Plazo",
          "desc": "Muestras de tubería se almacenan en baños de agua especiales a 95°C bajo presión extrema durante miles de horas. Sin grietas. Sin roturas."
        }
      ]
    },
    "timeline": {
      "title": "Décadas de Innovación.",
      "desc": "Nuestros estándares de calidad no se crearon de la noche a la mañana. Son el resultado de décadas de ingeniería y optimización continua de procesos.",
      "items": [
        {
          "year": "1990",
          "title": "El Nacimiento del Estándar",
          "text": "Como pioneros en la extrusión de tuberías plásticas, implementamos de manera temprana procedimientos de prueba internos que superaban con creces los requisitos de la industria en aquel momento. La base de una cultura de calidad intransigente."
        },
        {
          "year": "1995",
          "title": "Integración ISO 9001",
          "text": "Auditoría completa de nuestros sistemas de gestión de calidad según la ISO 9001. Desde entonces, cada movimiento, cada lote de materia prima, cada ajuste de máquina se documenta sistemáticamente y es completamente rastreable."
        },
        {
          "year": "2005",
          "title": "Auditorías DVGW y SKZ",
          "text": "Inclusión en el exclusivo grupo de fabricantes aprobados por DVGW y SKZ. El sello oficial de higiene absoluta, resistencia extrema a la presión y durabilidad inigualable bajo las condiciones más duras para agua potable."
        },
        {
          "year": "2015",
          "title": "Normas Globales (WRAS, KTW)",
          "text": "Expansión de certificaciones para mercados internacionales. Cumplimiento con la estricta directriz KTW (UBA) y las regulaciones WRAS británicas. K Aqua se convierte en el estándar global para megaproyectos internacionales."
        },
        {
          "year": "2024",
          "title": "Análisis de Calidad de Próxima Generación",
          "text": "Introducción de pruebas OIT (Tiempo de Inducción a la Oxidación) y MFR (Índice de Fluidez) altamente automatizadas en nuestro propio laboratorio de precisión. Análisis de fallos impulsado por IA durante la extrusión para una tasa de cero errores del 100%."
        }
      ]
    },
    "cta": {
      "title": "Calidad en la que puede confiar ciegamente.",
      "desc": "Descargue nuestros certificados oficiales o hable directamente con nuestro equipo de ingeniería sobre las especificaciones de su próximo megaproyecto.",
      "button1": "Descargar Certificados",
      "button2": "Contactar Soporte Técnico"
    }
  },
  "glossar": {
    "manifesto": {
      "eyebrow": "La Doctrina",
      "title": "La Arquitectura de la Infalibilidad.",
      "lead": "Un sistema de tuberías es el sistema cardiovascular de cualquier megaproyecto. Un fallo significa un ataque al corazón infraestructural. Por eso no hablamos de tuberías, sino de arterias industriales vitales. Cada término de este glosario representa un pilar de nuestra filosofía de Cero Errores."
    },
    "scroll": {
      "eyebrow": "Cinemática y Ciencia de Materiales",
      "title": "El Proceso K Aqua.",
      "lead": "Desde el nivel molecular del granulado hasta la prueba de presión final. Comprenda los principios físicos que hacen que nuestros sistemas sean indestructibles.",
      "items": [
        {
          "title": "Dinámica de Extrusión a Alta Presión",
          "desc": "La deformación termoplástica en nuestras plantas está sujeta a un control de temperatura preciso de 0,1 °C. Esta perfección cristalina garantiza una estructura molecular homogénea y perfecta, descartando por completo el microagrietamiento (Stress Cracking) incluso bajo fluctuaciones extremas de presión y temperatura. Cuando el material sale de nuestro extrusor, ya no es un simple plástico. Es un monolito industrial."
        },
        {
          "title": "Pruebas de Carga Hidrostática",
          "desc": "En nuestros laboratorios de pruebas, cada tubería es sometida a una simulación hidrostática que excede en gran medida las condiciones reales. Aplicamos presiones internas más allá de cualquier requisito normativo (hasta 100 bares, dependiendo de la clase SDR). Esto asegura la integridad de las uniones y la elasticidad molecular del material PP-R sobre una vida útil proyectada de más de 50 años en infraestructuras críticas."
        },
        {
          "title": "Tecnología de Soldadura por Polifusión",
          "desc": "Las uniones son el punto débil de los sistemas convencionales. K Aqua elimina este riesgo mediante la polifusión. A nivel molecular, el tubo y el accesorio se funden en una unidad inseparable y continua. No hay roscas que se corroan, ni sellos que puedan fallar. El resultado es un sistema de tuberías que se comporta como si estuviera fundido en una sola pieza."
        },
        {
          "title": "Resistencia a la Cavitación y Mecánica de Fluidos",
          "desc": "Gracias a una pared interior ultra suave (rugosidad < 0,007 mm), los tubos K Aqua minimizan casi a cero la resistencia al flujo. Esto evita la formación de biopelículas y elimina los efectos micro-cavitacionales en flujos de alta velocidad. Las pérdidas de presión en el sistema se reducen drásticamente, lo que maximiza la eficiencia energética de los sistemas de bombeo a escala industrial."
        }
      ]
    }
  }
}

with open('academy_final_es.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
