export const worldMap = [
  {
    id: "entrada",
    nombre: "Entrada de la Cueva",
    descripcion:
      "Un arco de piedra antiguo cubierto de musgo. El aire es frío y huele a tierra húmeda. Sientes que algo te observa desde las sombras.",
    icono: "🗺️",
    direcciones: { norte: "pasillo", sur: null, este: null, oeste: null },
  },
  {
    id: "pasillo",
    nombre: "Pasillo de las Sombras",
    descripcion:
      "Un pasillo largo con antorchas que parpadean. Las llamas proyectan figuras retorcidas sobre las paredes de piedra. Hay puertas en cada dirección.",
    icono: "🕯️",
    direcciones: {
      norte: "trono",
      sur: "entrada",
      este: "biblioteca",
      oeste: "celda",
    },
  },
  {
    id: "biblioteca",
    nombre: "Gran Biblioteca",
    descripcion:
      "Miles de libros polvorientos llenan las paredes hasta el techo. El conocimiento aquí es tan antiguo que el aire mismo parece impregnado de magia.",
    icono: "📚",
    direcciones: { norte: null, sur: null, este: null, oeste: "pasillo" },
  },
  {
    id: "celda",
    nombre: "Celda Olvidada",
    descripcion:
      "Una habitación pequeña y húmeda. Las marcas en las paredes cuentan historias de quienes estuvieron aquí antes. El silencio pesa.",
    icono: "⛓️",
    direcciones: { norte: null, sur: null, este: "pasillo", oeste: null },
  },
  {
    id: "trono",
    nombre: "Salón del Trono",
    descripcion:
      "Un salón majestuoso que roba el aliento. Un trono de hueso preside la estancia desde un pedestal de obsidiana. Este es el corazón de la oscuridad.",
    icono: "💀",
    direcciones: { norte: null, sur: "pasillo", este: null, oeste: null },
  },
];

export const getRoom = (id) => worldMap.find((room) => room.id === id);
