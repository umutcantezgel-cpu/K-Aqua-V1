import json

es = {
  "title": "Datos BIM",
  "metaDesc": "Datos BIM de K Aqua: Seguridad sin compromisos gracias a la Ingeniería Alemana para megaproyectos globales. Acceda a nuestra base de datos BIM.",
  "sticky": {
    "items": [
      {
        "title": "Máxima Profundidad de Datos (LOI 500)",
        "desc": "Nuestros modelos BIM ofrecen no solo una representación geométrica de alta precisión (LOD), sino, sobre todo, una profundidad de información inigualable (LOI). Cada tubo, cada accesorio y cada válvula contiene todos los metadatos críticos: especificaciones del material, presiones nominales, coeficientes de expansión térmica y números de artículo exactos para licitaciones automatizadas."
      },
      {
        "title": "Planificación libre de colisiones",
        "desc": "En los proyectos de miles de millones, la detección de colisiones no es negociable. Nuestros archivos nativos Revit e IFC garantizan una integración perfecta en Navisworks o Solibri. Los diámetros exteriores exactos, incluidas las tolerancias de la costura de soldadura, evitan costosas sorpresas en la obra."
      },
      {
        "title": "Inteligencia Paramétrica",
        "desc": "Las familias BIM de K Aqua son completamente paramétricas. Se adaptan dinámicamente al trazado, la pendiente y las dimensiones de la tubería. El enrutamiento automático selecciona automáticamente las reducciones y los ángulos de flexión correctos de acuerdo con las estrictas especificaciones de la norma DIN EN ISO 15874."
      },
      {
        "title": "Gestión del Ciclo de Vida y de Instalaciones",
        "desc": "El gemelo digital no termina con la entrega del edificio. Nuestros objetos BIM son compatibles con COBie y proporcionan a la gestión de instalaciones todos los intervalos de mantenimiento, certificados y datos operativos necesarios para un ciclo de vida seguro de más de 50 años."
      }
    ],
    "eyebrow": "Excelencia en el Flujo de Trabajo",
    "title": "Gemelos digitales a la perfección.",
    "lead": "Un vistazo a la profundidad de datos que elimina la diferencia entre planificación y realidad."
  },
  "timeline": {
    "items": [
      {
        "year": "Fase 1",
        "title": "Concepto y Planificación MEP",
        "text": "Integración de las geometrías básicas de K Aqua en el diseño inicial. Cálculo rápido de cantidades y primera verificación de colisiones para el concepto de rutas en el plan maestro MEP."
      },
      {
        "year": "Fase 2",
        "title": "Planificación Detallada",
        "text": "Transición a LOI 400. Las especificaciones exactas, las velocidades de flujo y los cálculos de caída de presión fluyen directamente en el cálculo de la red hidráulica del edificio."
      },
      {
        "year": "Fase 3",
        "title": "Licitación y Adjudicación",
        "text": "Generación automatizada y sin errores de Listas de Materiales (BOM) directamente desde el modelo. Cada accesorio está vinculado a su número de artículo de K Aqua y datos VDI 3805."
      },
      {
        "year": "Fase 4",
        "title": "Prefabricación y Montaje",
        "text": "Exportación de dibujos isométricos para la prefabricación industrial. Los planos de bobinas milimétricos minimizan los trabajos de soldadura en la obra a un mínimo absoluto."
      },
      {
        "year": "Fase 5",
        "title": "As-Built y Operación",
        "text": "Entrega del modelo As-Built (Tal como se construyó). El gemelo digital sirve como única fuente de verdad para la gestión de instalaciones durante toda la vida útil del edificio."
      }
    ],
    "title": "El Ciclo de Vida de los Datos BIM K Aqua",
    "desc": "Desde el primer boceto hasta décadas de operación. Nuestros datos acompañan su proyecto en cada fase."
  },
  "hero": {
    "desc": "Este módulo ofrece una seguridad sin compromisos para los proyectos más exigentes a nivel mundial. Fabricado según los estándares industriales más estrictos para durar generaciones. Descargue el gemelo digital allí donde el fallo de materiales no sea una opción.",
    "btnPrimary": "Biblioteca BIM (Revit/IFC)",
    "btnGhost": "Solicitar Consultoría BIM"
  },
  "intro": {
    "title1": "El ADN de nuestros sistemas de tuberías.",
    "title2": "Ahora en la nube.",
    "p1": "No consideramos el BIM como un mero dibujo en 3D. Para K Aqua, el Modelado de Información de Construcción es la transferencia de nuestra precisión de fabricación sin compromisos al espacio digital. Cuando los contratistas generales internacionales planifican rascacielos, centros de datos o laboratorios de alta seguridad, no necesitan valores estimados, necesitan la realidad física en forma de datos.",
    "p2": "Nuestros conjuntos de datos son el resultado de décadas de ingeniería alemana. Cada espesor de pared, cada dinámica de fluidos y cada propiedad térmica ha sido validada por nuestros ingenieros y traducida nativamente en familias digitales."
  },
  "bento": {
    "items": [
      {
        "title": "Familias Nativas Revit®",
        "desc": "Sin pérdida de conversión. Programadas directamente como .rfa y .rvt para el máximo rendimiento y preferencias de enrutamiento nativas."
      },
      {
        "title": "Conformidad VDI 3805",
        "desc": "Datos de productos estandarizados para un intercambio de datos fluido en toda la cadena MEP."
      },
      {
        "title": "Certificación IFC4",
        "desc": "Máxima interoperabilidad a través de estándares BIM abiertos (OpenBIM). Legible de forma garantizada en ArchiCAD, Allplan y Vectorworks."
      },
      {
        "title": "Datos térmicos exactos",
        "desc": "Modelos de cálculo integrados para la expansión lineal, conductividad térmica (0.24 W/mK) y caída de presión por fricción de tuberías."
      }
    ]
  },
  "cta": {
    "title": "Descargue el Paquete BIM K Aqua.",
    "desc": "Acceso completo a todas las familias Revit nativas, archivos IFC y conjuntos de datos VDI 3805. Gratuito para planificadores e ingenieros.",
    "btnPrimary": "Ir al Centro de Descargas",
    "btnOutline": "Contactar al Gestor BIM"
  }
}

with open('resources_bim_es.json', 'w') as f:
    json.dump({"bim": es}, f, indent=2, ensure_ascii=False)
