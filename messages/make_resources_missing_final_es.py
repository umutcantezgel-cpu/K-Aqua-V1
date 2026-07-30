import json

es = {
  "common": {
    "eyebrow": "RECURSO K Aqua",
    "subtitle": "Ingeniería Alemana.",
    "lead": "Este módulo proporciona seguridad sin compromisos para los proyectos más exigentes a nivel mundial. Fabricado bajo los estándares industriales más estrictos para durar generaciones. Donde el fallo de materiales no es una opción.",
    "btnProject": "Solicitar Proyecto",
    "btnData": "Datos Técnicos",
    "valEyebrow": "Ingeniería Alemana",
    "valTitle": "Seguridad sin compromisos.",
    "valLead": "Cuando los contratistas generales internacionales planifican megaproyectos de miles de millones, no confían en promesas, confían en datos duros.",
    "valCardTitle": "Promesa de Valor 0{item}",
    "valCardDesc": "Cada elemento sale de nuestra fábrica con una tolerancia de Cero Errores absoluta. Fabricación de precisión según los estándares alemanes más estrictos para un mantenimiento 100% libre de problemas.",
    "authTitle": "La autoridad industrial para {module}.",
    "authP1": "Durante décadas, hemos combinado el orgullo artesanal con la tecnología de fabricación altamente automatizada de última generación en nuestra sede en el corazón de Alemania.",
    "authP2": "En uso en los desiertos más duros y en las zonas climáticas más extremas del mundo, nuestro material demuestra su valía todos los días. Establecemos el estándar que el resto del mundo sigue.",
    "list1": "Probado según DIN EN ISO 15874",
    "list2": "Vida útil > 50 años",
    "list3": "Libre de mantenimiento y resistente a la corrosión",
    "placeholder": "Marcador de posición para activo visual",
    "ctaTitle": "¿Listo para una calidad sin compromisos?",
    "ctaLead": "Hable con nuestro equipo de ingeniería sobre su próximo megaproyecto."
  },
  "ausschreibungstexte": {
    "meta": {
      "title": "Textos Oficiales de Licitación para Sistemas de Tuberías PP-R",
      "desc": "Descargue los textos detallados de licitación de K-Aqua. Ofrecemos seguridad sin compromisos a través de la Ingeniería Alemana para sus megaproyectos globales."
    },
    "timeline": {
      "title": "De la licitación a la eternidad.",
      "desc": "Un texto de licitación de K Aqua no es un simple documento. Es el código fuente para la realidad construida. Define, protege y dicta todo el ciclo de vida de un edificio, desde el primer boceto hasta décadas de uso.",
      "items": [
        {
          "year": "Fase 1: Parametrización",
          "title": "La definición de la perfección.",
          "text": "El proceso comienza en la planificación MEP. Definición exacta de tamaños nominales, clases de presión (PN) y clases SDR para agua fría y caliente. No dejamos zonas grises. Cada accesorio, cada abrazadera, cada casquillo se registra con precisión matemática."
        },
        {
          "year": "Fase 2: Adjudicación",
          "title": "Sumisión sin compromisos.",
          "text": "Gracias a la estructura granular y cristalina de nuestros textos, las ofertas se vuelven genuinamente comparables. Los precios de dumping (dumping-prices) causados por materiales inferiores u omisiones ocultas se notan inmediatamente. El grano se separa de la paja."
        },
        {
          "year": "Fase 3: Ejecución",
          "title": "Un plan maestro para la obra.",
          "text": "Los textos de licitación sirven como un código legal vinculante para la dirección de obra y los instaladores. Cada soldadura, cada fijación debe cumplir con las directrices DVS especificadas. Las desviaciones se hacen imposibles."
        },
        {
          "year": "Fase 4: Ciclo de vida",
          "title": "+50 Años de absoluta libertad de mantenimiento.",
          "text": "El resultado de una especificación perfecta es un sistema libre de errores durante décadas. Máxima resistencia a la corrosión, incrustación y degradación química. Seguridad intergeneracional, ingeniería en Alemania."
        }
      ]
    }
  }
}

with open('resources_missing_final_es.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
