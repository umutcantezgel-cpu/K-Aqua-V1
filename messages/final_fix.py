import json

with open('es-419.json', 'r') as f:
    es = json.load(f)

# Hard reset the events array
es['solutions']['vorfertigung']['timeline']['events'] = [
  {
    "title": "Fase 1: Ingeniería y BIM",
    "desc": "Integración perfecta en los modelos arquitectónicos. Detección de colisiones y simulación de flujo.",
    "date": "Semanas 1-2"
  },
  {
    "title": "Fase 2: Corte CNC",
    "desc": "Corte milimétrico de los materiales PPR-C utilizando sistemas CNC guiados por láser.",
    "date": "Semana 3"
  },
  {
    "title": "Fase 3: Polifusión",
    "desc": "Soldaduras robóticas y artesanales maestras bajo condiciones climáticas estrictamente controladas en el entorno del taller.",
    "date": "Semanas 4-5"
  },
  {
    "title": "Fase 4: Control de Calidad y Prueba de Presión",
    "desc": "Pruebas de carga bajo presión extrema. Cada conexión es registrada y verificada.",
    "date": "Semana 6"
  },
  {
    "title": "Fase 5: Logística Global",
    "desc": "Embalaje seguro y envío mundial con entrega Just-in-Time en el sitio de construcción.",
    "date": "Semana 7+"
  }
]

with open('es-419.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
