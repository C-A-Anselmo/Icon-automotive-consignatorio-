/* ==========================================================================
   ICON-automotive · cars-data.js
   CATÁLOGO DE AUTOS (editable)
   --------------------------------------------------------------------------
   Todo lo que se ve en el catálogo (index.html) y en la ficha completa
   (car.html) sale de este archivo. No hay HTML de autos escrito a mano.

   IMÁGENES: cada auto tiene 4 imágenes. Para usar archivos locales, cambiá
   la dirección "https://images.unsplash.com/..." por una ruta como
   "images/cars/sedan-1.jpg". Las fotos de ejemplo son de Unsplash.
   ¡Importante! Si cambiás una foto, actualizá también su texto "alt".

   DATOS: son valores de EJEMPLO para pruebas. Reemplazalos por los reales.
   ========================================================================== */

/* Helper para armar la URL de Unsplash (solo para las fotos de ejemplo). */
const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

/* Nombres que se muestran en la grilla de especificaciones (no tocar las claves). */
const SPEC_LABELS = {
  engine: "Motor",
  horsepower: "Potencia",
  transmission: "Transmisión",
  drivetrain: "Tracción",
  fuel: "Combustible",
  mileage: "Kilometraje",
  color: "Color",
  doors: "Puertas",
  seats: "Asientos",
  acceleration: "0–100 km/h",
  topSpeed: "Velocidad máx."
};

const CARS = [
  /* ------------------------------ 1 · SEDÁN DE LUJO ------------------------------ */
  {
    id: "sedan-s500",
    type: "Sedán de lujo",
    brand: "Mercedes-Benz",
    model: "S 500 4MATIC",
    year: 2023,
    price: 118000, // en USD, sin puntos ni símbolos
    images: [
      { src: U("1618843479313-40f8afb4b4d8"), alt: "Sedán de lujo negro, vista frontal tres cuartos" },
      { src: U("1617531653332-bd46c24f2068"), alt: "Sedán de lujo, vista lateral en movimiento" },
      { src: U("1563720223185-11003d516935"), alt: "Interior de cuero de un sedán de lujo" },
      { src: U("1606016159991-dfe4f2746ad5"), alt: "Detalle de la parte trasera de un sedán premium" }
    ],
    specs: {
      engine: "3.0 L 6 cilindros en línea turbo + EQ Boost",
      horsepower: "429 hp",
      transmission: "Automática de 9 velocidades",
      drivetrain: "Integral (AWD)",
      fuel: "Nafta (híbrido suave)",
      mileage: "12.500 km",
      color: "Negro Obsidiana",
      doors: "4",
      seats: "5",
      acceleration: "4,9 s",
      topSpeed: "250 km/h (limitada)"
    },
    description: "Un sedán pensado para viajar en silencio y con total comodidad. Combina un motor suave y potente con una cabina de cuero, suspensión neumática y asistentes de conducción de última generación.",
    features: [
      "Suspensión neumática adaptativa",
      "Asientos de cuero con masaje y ventilación",
      "Pantalla central OLED y panel digital",
      "Sonido envolvente de 15 parlantes",
      "Faros Digital Light con asistente de luz alta",
      "Techo panorámico corredizo"
    ],
    details: [
      { title: "Motor y rendimiento", rows: [
        ["Cilindrada", "2.999 cc"], ["Par máximo", "520 Nm"], ["Sistema híbrido", "Mild hybrid de 48 V (+22 hp temporales)"],
        ["Aceleración 0–100 km/h", "4,9 s"], ["Velocidad máxima", "250 km/h (limitada)"] ] },
      { title: "Transmisión y chasis", rows: [
        ["Caja", "Automática de 9 velocidades"], ["Tracción", "Integral permanente 4MATIC"],
        ["Suspensión", "Neumática con control electrónico"], ["Frenos", "Discos ventilados en las 4 ruedas"], ["Llantas", "20 pulgadas de aleación"] ] },
      { title: "Dimensiones y capacidades", rows: [
        ["Largo", "5.289 mm"], ["Ancho", "1.954 mm"], ["Alto", "1.503 mm"], ["Distancia entre ejes", "3.216 mm"],
        ["Baúl", "550 L"], ["Peso", "2.040 kg"], ["Tanque", "76 L"] ] },
      { title: "Consumo y emisiones", rows: [
        ["Consumo combinado", "8,4 L/100 km"], ["Emisiones de CO₂", "190 g/km"] ] },
      { title: "Garantía e historial", rows: [
        ["Dueños anteriores", "1"], ["Service oficial", "Completo, con registros"], ["Garantía ICON", "12 meses o 20.000 km"], ["Inspección previa", "150 puntos aprobada"] ] }
    ],
    equipment: [
      { title: "Exterior", items: ["Faros Digital Light", "Llantas de 20\"", "Techo panorámico", "Cierre de baúl eléctrico"] },
      { title: "Interior", items: ["Cuero Nappa", "Climatizador de 4 zonas", "Iluminación ambiental de 64 colores", "Volante calefaccionado"] },
      { title: "Tecnología", items: ["Pantalla OLED de 12,8\"", "Apple CarPlay y Android Auto", "Carga inalámbrica", "Sonido de 15 parlantes"] },
      { title: "Seguridad", items: ["Frenado automático de emergencia", "Control de crucero adaptativo", "Cámara 360°", "9 airbags"] }
    ]
  },

  /* ------------------------------ 2 · DEPORTIVO ------------------------------ */
  {
    id: "deportivo-911",
    type: "Deportivo",
    brand: "Porsche",
    model: "911 Carrera S",
    year: 2022,
    price: 162500,
    images: [
      { src: U("1503376780353-7e6692767b70"), alt: "Deportivo coupé en carretera, vista frontal" },
      { src: U("1544636331-e26879cd4d9b"), alt: "Deportivo coupé, vista lateral" },
      { src: U("1580274455191-1c62238fa333"), alt: "Detalle de faros y capot de un deportivo" },
      { src: U("1614162692292-7ac56d7f7f1e"), alt: "Parte trasera de un deportivo de alto rendimiento" }
    ],
    specs: {
      engine: "3.0 L 6 cilindros bóxer biturbo",
      horsepower: "443 hp",
      transmission: "Doble embrague PDK de 8 velocidades",
      drivetrain: "Trasera (RWD)",
      fuel: "Nafta",
      mileage: "8.200 km",
      color: "Verde Brillante",
      doors: "2",
      seats: "4 (2+2)",
      acceleration: "3,5 s",
      topSpeed: "308 km/h"
    },
    description: "Un deportivo que se maneja todos los días. Motor bóxer trasero, respuesta inmediata y una carrocería que combina diseño clásico con aerodinámica activa. Equipado con paquete Sport Chrono.",
    features: [
      "Paquete Sport Chrono",
      "Escape deportivo con válvulas",
      "Asientos deportivos Plus de 18 posiciones",
      "Alerón trasero activo",
      "Frenos de alto rendimiento",
      "Sistema de elevación del tren delantero"
    ],
    details: [
      { title: "Motor y rendimiento", rows: [
        ["Cilindrada", "2.981 cc"], ["Par máximo", "530 Nm"], ["Relación de compresión", "10,2:1"],
        ["Aceleración 0–100 km/h", "3,5 s"], ["Velocidad máxima", "308 km/h"] ] },
      { title: "Transmisión y chasis", rows: [
        ["Caja", "PDK de doble embrague, 8 velocidades"], ["Tracción", "Trasera con diferencial autoblocante"],
        ["Suspensión", "PASM con control electrónico"], ["Frenos", "Discos perforados de 350 mm"], ["Llantas", "20\" delanteras / 21\" traseras"] ] },
      { title: "Dimensiones y capacidades", rows: [
        ["Largo", "4.519 mm"], ["Ancho", "1.852 mm"], ["Alto", "1.298 mm"], ["Distancia entre ejes", "2.450 mm"],
        ["Baúl delantero", "132 L"], ["Peso", "1.515 kg"], ["Tanque", "64 L"] ] },
      { title: "Consumo y emisiones", rows: [
        ["Consumo combinado", "10,0 L/100 km"], ["Emisiones de CO₂", "227 g/km"] ] },
      { title: "Garantía e historial", rows: [
        ["Dueños anteriores", "1"], ["Service oficial", "Completo, con registros"], ["Garantía ICON", "12 meses o 20.000 km"], ["Inspección previa", "150 puntos aprobada"] ] }
    ],
    equipment: [
      { title: "Exterior", items: ["Faros LED Matrix", "Alerón trasero activo", "Llantas de 20\"/21\"", "Pinzas de freno en color"] },
      { title: "Interior", items: ["Asientos Sport Plus", "Volante GT deportivo", "Cuero y Race-Tex", "Cronógrafo en el tablero"] },
      { title: "Tecnología", items: ["Pantalla táctil de 10,9\"", "Apple CarPlay", "Sonido Bose Surround", "Navegación online"] },
      { title: "Seguridad", items: ["Control de estabilidad PSM", "Asistente de frenado", "Cámara de estacionamiento", "Airbags frontales y laterales"] }
    ]
  },

  /* ------------------------------ 3 · SUV PREMIUM ------------------------------ */
  {
    id: "suv-sport",
    type: "SUV premium",
    brand: "Range Rover",
    model: "Sport P400",
    year: 2023,
    price: 139900,
    images: [
      { src: U("1606664515524-ed2f786a0bd6"), alt: "SUV premium oscuro, vista frontal tres cuartos" },
      { src: U("1519641471654-76ce0107ad1b"), alt: "SUV premium en un camino, vista lateral" },
      { src: U("1533473359331-0135ef1b58bf"), alt: "Interior espacioso de un SUV de lujo" },
      { src: U("1551830820-330a71b99659"), alt: "SUV de lujo estacionado, vista trasera" }
    ],
    specs: {
      engine: "3.0 L 6 cilindros en línea turbo MHEV",
      horsepower: "395 hp",
      transmission: "Automática de 8 velocidades",
      drivetrain: "Integral (AWD)",
      fuel: "Nafta (híbrido suave)",
      mileage: "15.300 km",
      color: "Negro Santorini",
      doors: "5",
      seats: "5",
      acceleration: "5,4 s",
      topSpeed: "242 km/h"
    },
    description: "Un SUV que resuelve la ciudad, la ruta y el camino de tierra con el mismo nivel de confort. Cabina amplia y silenciosa, tracción integral inteligente y una posición de manejo elevada.",
    features: [
      "Suspensión neumática con altura variable",
      "Modos Terrain Response",
      "Techo panorámico fijo",
      "Asientos delanteros calefaccionados y ventilados",
      "Sistema de sonido Meridian",
      "Cámara 3D de visión periférica"
    ],
    details: [
      { title: "Motor y rendimiento", rows: [
        ["Cilindrada", "2.996 cc"], ["Par máximo", "550 Nm"], ["Sistema híbrido", "Mild hybrid de 48 V"],
        ["Aceleración 0–100 km/h", "5,4 s"], ["Velocidad máxima", "242 km/h"] ] },
      { title: "Transmisión y chasis", rows: [
        ["Caja", "Automática de 8 velocidades"], ["Tracción", "Integral con reductora electrónica"],
        ["Suspensión", "Neumática, altura regulable"], ["Frenos", "Discos ventilados de gran diámetro"], ["Llantas", "21 pulgadas de aleación"] ] },
      { title: "Dimensiones y capacidades", rows: [
        ["Largo", "4.946 mm"], ["Ancho", "2.047 mm"], ["Alto", "1.820 mm"], ["Distancia entre ejes", "2.997 mm"],
        ["Baúl", "647 L"], ["Peso", "2.310 kg"], ["Tanque", "90 L"] ] },
      { title: "Consumo y emisiones", rows: [
        ["Consumo combinado", "10,2 L/100 km"], ["Emisiones de CO₂", "235 g/km"] ] },
      { title: "Garantía e historial", rows: [
        ["Dueños anteriores", "1"], ["Service oficial", "Completo, con registros"], ["Garantía ICON", "12 meses o 20.000 km"], ["Inspección previa", "150 puntos aprobada"] ] }
    ],
    equipment: [
      { title: "Exterior", items: ["Faros Pixel LED", "Llantas de 21\"", "Techo panorámico", "Estribos laterales"] },
      { title: "Interior", items: ["Cuero Windsor", "Climatizador de 4 zonas", "Portón trasero eléctrico", "Iluminación ambiental"] },
      { title: "Tecnología", items: ["Pantalla curva de 13,1\"", "Sonido Meridian", "Carga inalámbrica", "Conectividad Apple y Android"] },
      { title: "Seguridad", items: ["Frenado autónomo de emergencia", "Control de crucero adaptativo", "Cámara 3D", "Monitoreo de punto ciego"] }
    ]
  }
];
