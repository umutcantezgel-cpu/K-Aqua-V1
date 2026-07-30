import json

es = {
  "meta": {
    "title": "Certificados y Normas | K Aqua",
    "desc": "DVGW, SKZ, ISO y más. Descubra la seguridad sin compromisos y la calidad de la Ingeniería Alemana de los sistemas de tuberías de K Aqua."
  },
  "hero": {
    "eyebrow": "Estándares de Ingeniería Alemana",
    "title1": "Certificados.",
    "title2": "Ingeniería Alemana.",
    "desc": "Este módulo ofrece una seguridad sin compromisos para los proyectos más exigentes a nivel mundial. Fabricado de acuerdo con los estándares industriales más estrictos para durar generaciones. Porque el fallo de materiales nunca es una opción.",
    "cta1": "Solicitar Proyecto",
    "cta2": "Manual Técnico"
  },
  "manifesto": {
    "title1": "Un certificado es solo un papel.",
    "title2": "El proceso detrás de él está forjado en acero.",
    "p1": "Muchos fabricantes ven las normas como el objetivo final. Nosotros las consideramos el límite inferior absoluto. Nuestras tolerancias internas son muchas veces más estrictas que lo que exigen DVGW, ISO o SKZ. Cuando un tubo de K Aqua sale de nuestra fábrica, ha sido analizado a nivel molecular, torturado con presiones extremas y llevado al límite absoluto térmicamente."
  },
  "bento": {
    "eyebrow": "Los Pilares de la Seguridad",
    "title": "El ADN de un sistema de tuberías perfecto.",
    "lead": "Cuando contratistas generales internacionales planifican proyectos de miles de millones, no confían en promesas de marketing. Exigen datos sólidos y físicamente medibles.",
    "items": [
      {
        "title": "Resistencia a Presión Extrema",
        "desc": "Probado para cargas continuas hasta PN20/PN25. Nuestras pruebas de presión de rotura demuestran reservas muy superiores a las normas. Las roturas de tuberías son cosa del pasado."
      },
      {
        "title": "Soberanía Térmica",
        "desc": "Durabilidad permanente de -20°C a +95°C. Sin fatiga del material ni debilitamiento estructural, incluso frente a choques térmicos extremos."
      },
      {
        "title": "Higiene Absoluta",
        "desc": "Sin corrosión. Sin incrustaciones. Apto para uso alimentario, toxicológicamente inofensivo y resistente al crecimiento de legionela."
      },
      {
        "title": "Protección contra Incendios (B1/B2)",
        "desc": "Clasificado según DIN 4102. Ignífugo y con emisión mínima de humo para la máxima seguridad en infraestructuras críticas."
      },
      {
        "title": "Garantía de Ciclo de Vida",
        "desc": "Vida útil definida de 50 años de acuerdo con el estándar ISO más estricto. Sin embargo, en la realidad arquitectónica, está construido para sobrevivir generaciones."
      }
    ]
  },
  "certifications": {
    "eyebrow": "Las Autoridades",
    "title": "Los auditores más duros del mundo.",
    "lead": "Solo quienes aprueban las auditorías externas más críticas pueden llevar el sello 'Ingeniería Alemana'. Estas son las instituciones que validan nuestra calidad.",
    "items": [
      {
        "title": "DVGW: La Más Alta Instancia",
        "p1": "La Asociación Técnica Alemana del Gas y del Agua (DVGW) establece el estándar más estricto a nivel mundial para la higiene del agua potable y la resistencia de los materiales.",
        "p2": "Nuestra prueba DVGW garantiza que los sistemas de tuberías de K Aqua no liberen sustancias tóxicas ni promuevan el crecimiento microbiológico en condiciones extremas. Cada lote se somete a pruebas hidrostáticas a largo plazo (prueba de resistencia a presión interna) a 95°C."
      },
      {
        "title": "SKZ: Supervisión Independiente",
        "p1": "El Centro de Plásticos de Alemania del Sur (SKZ) actúa como nuestro auditor incorruptible. Su monitoreo externo asegura lo que nuestros propios laboratorios ya exigen.",
        "p2": "La resistencia al impacto, la resistencia a la tracción y el comportamiento térmico se prueban mediante análisis DSC (Calorimetría de Barrido Diferencial). La marca SKZ es prueba de perfección mecánica mucho más allá de la norma DIN EN ISO 15874."
      },
      {
        "title": "KTW-BWGL: Pureza Absoluta",
        "p1": "Criterios de evaluación de la Agencia Federal de Medio Ambiente de Alemania para plásticos y otros materiales orgánicos en contacto con agua potable.",
        "p2": "Usamos exclusivamente polipropileno de alta pureza (PP-R / PPRCT) sin aditivos nocivos ni metales pesados. ¿El resultado? Calidad de agua de manantial directamente desde el grifo. Sin alteraciones de olor o sabor."
      },
      {
        "title": "ISO 9001 y 14001: Excelencia Sistemática",
        "p1": "La calidad no es una coincidencia, sino un proceso absolutamente reproducible. Nuestra certificación ISO 9001 acredita una gestión de calidad integral desde la recepción de materias primas hasta la entrega global.",
        "p2": "Con la ISO 14001, demostramos que el máximo rendimiento industrial y la responsabilidad medioambiental van de la mano. Menor consumo de energía, uso eficiente de recursos y una reciclabilidad del 100% en nuestros productos de polipropileno."
      }
    ]
  }
}

with open('academy_zertifizierung_es.json', 'w') as f:
    json.dump({"zertifizierung": es}, f, indent=2, ensure_ascii=False)
