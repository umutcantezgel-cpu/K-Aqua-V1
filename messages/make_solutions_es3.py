import json

es = {
  "krankenhaus": {
    "bento": {
      "items": [
        {
          "title": "100% Resistencia a la Corrosión",
          "desc": "A diferencia de las tuberías metálicas, K Aqua es completamente inmune a la corrosión electroquímica, picaduras y agua calcárea. Sin incrustaciones, sin pérdida de presión durante 50 años de operación continua."
        },
        {
          "title": "Instalación Ultrarrápida",
          "desc": "El bajo peso propio y la técnica de soldadura homogénea reducen el tiempo de instalación hasta en un 40%. Menos días de trabajo, menor riesgo en el sitio de construcción.",
          "badge": "-40% de Tiempo"
        },
        {
          "title": "Flexibilidad Antisísmica",
          "desc": "La estructura molecular del material le permite absorber choques sísmicos y asentamientos de edificios sin romperse. Esencial para hospitales en áreas de riesgo.",
          "badge": "Grado Sísmico"
        },
        {
          "title": "Calidad de Agua Potable Certificada",
          "desc": "Cumple y supera los estándares más estrictos del mundo (DIN, DVGW, SKZ, WRAS) para el transporte de agua ultrapura y fluidos clínicos altamente sensibles."
        }
      ]
    }
  },
  "hotels": {
    "bento": {
      "items": [
        {
          "title": "Experiencia Acústica de 5 Estrellas",
          "desc": "La excelente absorción de sonido de nuestro material PP-R aísla del ruido de la descarga y del flujo. Los huéspedes adyacentes no se ven perturbados por el uso del agua."
        },
        {
          "title": "Tiempo de Inactividad Cero",
          "desc": "No hay cierres de habitaciones por roturas de tuberías o fugas estenopeicas. El sistema fusionado es monolíticamente fuerte."
        },
        {
          "title": "Mantenimiento Simplificado",
          "desc": "El sistema no requiere limpieza de sarro ni reparaciones constantes, reduciendo el personal necesario para las instalaciones a largo plazo."
        },
        {
          "title": "Operación Energéticamente Eficiente",
          "desc": "La retención de temperatura superior reduce el tamaño requerido de la planta térmica, disminuyendo la factura de calefacción y refrigeración general de la propiedad."
        }
      ]
    }
  },
  "hochhaus": {
    "bento": {
      "items": [
        {
          "title": "Arquitectura Multicapa",
          "desc": "Incorpora capas de fibra de vidrio para mantener la integridad de la forma y soportar la tremenda presión vertical y temperatura."
        },
        {
          "title": "Anclaje Eficiente",
          "desc": "La reducida expansión longitudinal disminuye la cantidad de juntas de expansión mecánicas pesadas y costosas que deben instalarse en cada eje."
        },
        {
          "title": "Instalación Segura en Altura",
          "desc": "Transportar PP-R por la grúa es mucho más fácil que llevar tuberías de acero galvanizado. Una vez posicionado, las uniones soldadas se enfrían en cuestión de minutos."
        },
        {
          "title": "Vida Útil Comprobada",
          "desc": "Instálelo una vez y olvídese. El ciclo de vida de la tubería K-AQUA coincide con la estructura del rascacielos mismo."
        }
      ]
    }
  },
  "rechenzentrum": {
    "bento": {
      "items": [
        {
          "title": "Uniones Moleculares Cero Fugas",
          "desc": "La red primaria no presenta conexiones mecánicas; una sola fusión impecable protege las salas de servidores de incidentes con agua."
        },
        {
          "title": "Reducción de Costes del Enfriador",
          "desc": "Los menores coeficientes de resistencia por fricción en las tuberías PP-R significan que las bombas de agua refrigerada trabajan menos para mover los mismos volúmenes de líquido."
        },
        {
          "title": "Sistemas Limpios, Filtros Limpios",
          "desc": "Al no producir óxido, descamación ni lodos magnéticos, K-AQUA garantiza que las mallas y bobinas de refrigeración funcionen de manera óptima indefinidamente."
        },
        {
          "title": "Punto de Rocío Controlado",
          "desc": "El material resiste inherentemente la condensación superficial, ofreciendo más flexibilidad para las estrategias de gestión del aislamiento y la temperatura en climas húmedos."
        }
      ]
    }
  },
  "vorfertigung": {
    "bento": {
      "items": [
        {
          "title": "Reducción Masiva de Residuos",
          "desc": "Los recortes de tubería en nuestra planta central están un 99% por debajo del desperdicio promedio de las obras tradicionales; toda la chatarra pura se recicla."
        },
        {
          "title": "Programación Predecible",
          "desc": "Elimina la incertidumbre por el clima adverso en la obra o los problemas laborales. Sabes exactamente cuándo llegan los colectores terminados."
        },
        {
          "title": "Verificación Integral de Calidad",
          "desc": "Probar las redes a escala de piso enteras antes de instalarlas evita pesadillas logísticas durante la fase de puesta en marcha del edificio."
        },
        {
          "title": "Conformidad Arquitectónica",
          "desc": "Tolerancias estrictas aseguradas en una fábrica garantizan que el módulo K-AQUA coincida perfectamente con el modelo 3D BIM, cada vez."
        }
      ]
    }
  }
}

with open('solutions_p3.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
