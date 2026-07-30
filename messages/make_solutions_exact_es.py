import json

es = {
  "krankenhaus": {
    "specs": {
      "therm": {
        "title": "Resistencia Térmica",
        "items": [
          {
            "label": "Temperatura de funcionamiento continuo",
            "value": "70°C"
          },
          {
            "label": "Temperatura máxima en caso de avería",
            "value": "95°C (100h)"
          },
          {
            "label": "Conductividad térmica",
            "value": "0.24 W/mK"
          },
          {
            "label": "Coeficiente de expansión lineal",
            "value": "0.15 mm/mK"
          }
        ]
      },
      "mech": {
        "title": "Propiedades Mecánicas",
        "items": [
          {
            "label": "Densidad",
            "value": "0.895 g/cm³"
          },
          {
            "label": "Resistencia a la tracción",
            "value": "23 MPa"
          },
          {
            "label": "Alargamiento a la rotura",
            "value": "> 50%"
          },
          {
            "label": "Módulo de elasticidad",
            "value": "800 MPa"
          }
        ]
      }
    }
  },
  "hotels": {
    "textSection": {
      "h3": "Conexiones Soldadas Homogéneas: El Fin de las Fugas",
      "p5": "El eslabón más débil de cualquier sistema de tuberías es la conexión. Las roscas se corroen, los anillos de sellado se vuelven porosos, las uniones adhesivas se fatigan debido a los ciclos térmicos.",
      "p6": "Utilizamos el principio de fusión molecular. El tubo y el accesorio se calientan térmicamente a exactamente 260°C y luego se unen. En fracciones de segundo, las cadenas de polímeros de ambos componentes se funden en una unidad monolítica e inseparable. El resultado: ya no hay una \"conexión\". El tubo y el accesorio son una sola pieza continua de material. Sin sellos, sin puntos débiles, con una fiabilidad del 100%."
    },
    "perf": {
      "items": [
        {
          "val": "0.007",
          "unit": "mm",
          "title": "Rugosidad superficial",
          "desc": "Resistencia absoluta a biopelículas e incrustaciones."
        },
        {
          "val": "100",
          "unit": "%",
          "title": "Fusión Homogénea",
          "desc": "Conexiones soldadas que se fusionan a nivel molecular."
        },
        {
          "val": ">50",
          "unit": "J",
          "title": "Años de Vida Útil",
          "desc": "Probado y certificado según las normas ISO más estrictas."
        },
        {
          "val": "0",
          "unit": "",
          "title": "Mantenimiento",
          "desc": "Instale, selle y olvídese para siempre."
        }
      ]
    },
    "research": {
      "eyebrow": "Investigación y Desarrollo",
      "items": [
        "Expansión lineal reducida (Valor Alfa: 0.035 mm/mK)",
        "Mayor sección de flujo gracias a paredes más finas con la misma presión nominal",
        "Resistencia completa a compuestos de cloro en el área de piscinas de hoteles",
        "Toxicológicamente seguro, aprobado para uso alimentario"
      ]
    },
    "certs": {
      "eyebrow": "Cumplimiento y Certificaciones",
      "lead": "Los proyectos internacionales requieren aprobaciones internacionales. K Aqua está globalmente probada, certificada y aprobada por las autoridades reguladoras más estrictas."
    }
  },
  "vorfertigung": {
    "visual": {
      "title1": "La Estética de la",
      "title2": "Fusión Molecular.",
      "p1": "Observe la soldadura de un módulo prefabricado de K Aqua bajo el microscopio. No encontrará una costura. Verá una sola pieza homogénea de material.",
      "p2": "Este proceso requiere no solo maquinaria altamente sofisticada, sino también el ojo entrenado y la mano firme de nuestros soldadores de plásticos certificados. Cada parámetro: temperatura, tiempo de calentamiento, presión de unión y tiempo de enfriamiento, es monitoreado meticulosamente.",
      "p3": "Es esta obsesión microscópica por los detalles la que hace posible nuestra garantía macroscópica de más de 50 años de funcionamiento sin problemas.",
      "items": [
        "Fresado de precisión de los extremos del tubo",
        "Calentamiento controlado por computadora (260°C)",
        "Unión exacta bajo alta presión"
      ]
    },
    "timeline": {
      "events": {
        "0": {
          "title": "Fase 1: Ingeniería y BIM",
          "desc": "Integración perfecta en los modelos arquitectónicos. Detección de colisiones y simulación de flujo.",
          "date": "Semanas 1-2"
        },
        "1": {
          "title": "Fase 2: Corte CNC",
          "desc": "Corte milimétrico de los materiales PPR-C utilizando sistemas CNC guiados por láser.",
          "date": "Semana 3"
        },
        "2": {
          "title": "Fase 3: Polifusión",
          "desc": "Soldaduras robóticas y artesanales maestras bajo condiciones climáticas estrictamente controladas en el entorno del taller.",
          "date": "Semanas 4-5"
        },
        "3": {
          "title": "Fase 4: Control de Calidad y Prueba de Presión",
          "desc": "Pruebas de carga bajo presión extrema. Cada conexión es registrada y verificada.",
          "date": "Semana 6"
        },
        "4": {
          "title": "Fase 5: Logística Global",
          "desc": "Embalaje seguro y envío mundial con entrega Just-in-Time en el sitio de construcción.",
          "date": "Semana 7+"
        }
      }
    },
    "manifesto": {
      "eyebrow": "El Manifiesto de la Durabilidad",
      "p1": "Los módulos prefabricados de K Aqua no están hechos para la media. Están diseñados para lo extremo. Ya sea que las temperaturas exteriores en Dubái suban a 50°C o caigan por debajo del punto de congelación en los inviernos escandinavos, la integridad de nuestras estructuras de polipropileno permanece intacta.",
      "p2": "Nuestros sistemas de agua potable cumplen con los requisitos de higiene más estrictos a nivel mundial, incluidos KTW-BWGL y W270. El material no libera ningún olor, sabor o contaminante al agua. Previene proactivamente el crecimiento de legionela gracias a su superficie interna extremadamente lisa, que no ofrece caldo de cultivo para biopelículas.",
      "p3": "Al mismo tiempo, nuestras tuberías industriales de agua de refrigeración y calefacción son capaces de soportar los productos químicos más agresivos. Las clasificaciones SDR (Relación de Dimensión Estándar) de nuestros tubos permiten un ajuste exacto a los perfiles de presión y temperatura específicos de su proyecto.",
      "p4": "No vemos la prefabricación como un mero servicio, sino como una responsabilidad arquitectónica. Cada módulo que llega a la obra está inmediatamente listo para su instalación (Plug & Play). Reduce el tiempo de instalación hasta en un 70%, minimiza el desperdicio a cero y elimina la necesidad de almacenamiento a gran escala en el sitio de construcción."
    }
  },
  "hochhaus": {
    "data": {
      "eyebrow": "Los Datos",
      "lead": "Los contratistas generales no creen en promesas de marketing. Creen en la resistencia a la tracción, curvas de fluencia, resistencia a la presión dinámica y pruebas FNCT (Full Notch Creep Tests).",
      "h3_1": "Resistencia Molecular",
      "p1": "La vida útil de una tubería de plástico bajo presión y temperatura está determinada por su resistencia a la presión interna hidrostática a largo plazo (curvas de fluencia). Las especificaciones estándar de la industria asumen una vida útil operativa de 50 años. Nuestras pruebas de laboratorio internas y simulaciones de envejecimiento termo-oxidativo verifican una capacidad de carga para una vida útil de más de 100 años. El material PPRCT de K Aqua retrasa significativamente el inicio de la degradación termo-oxidativa, incluso en líneas de circulación con temperaturas permanentemente altas.",
      "h3_2": "Dinámica de Fluidos Hidráulicos",
      "p2": "Las tuberías de metal se vuelven ásperas con los años debido a la corrosión y la incrustación. La pérdida de fricción de la tubería aumenta, la sección transversal se estrecha y el requerimiento de energía para las bombas aumenta explosivamente. Las tuberías de K Aqua tienen una rugosidad superficial absoluta de k = 0,007 mm. Esta superficie lisa como un espejo permanece absolutamente constante durante toda su vida útil. El resultado: pérdida de presión mínima, ahorro masivo de energía durante la operación de bombeo e higiene absoluta, ya que ni biopelículas ni legionela pueden adherirse.",
      "stats": [
        {
          "label": "Densidad (g/cm³)",
          "val": "0.905",
          "standard": "ISO 1183"
        },
        {
          "label": "Índice de fluidez (g/10min)",
          "val": "0.3",
          "standard": "ISO 1133"
        },
        {
          "label": "Módulo E de tracción (MPa)",
          "val": "800 / 900 (RCT)",
          "standard": "ISO 527"
        },
        {
          "label": "Conductividad térmica (W/mK)",
          "val": "0.24",
          "standard": "DIN 52612"
        },
        {
          "label": "Coeficiente de expansión lineal (mm/mK)",
          "val": "0.15 (Estándar) / 0.035 (Fibra)",
          "standard": "DIN 53752"
        },
        {
          "label": "Rugosidad superficial k (mm)",
          "val": "0.007",
          "standard": "Banco de pruebas"
        },
        {
          "label": "Resistencia química",
          "val": "Valor de pH de 1 a 14",
          "standard": "DIN 8078"
        }
      ]
    }
  }
}

with open('solutions_missing_exact_es.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
