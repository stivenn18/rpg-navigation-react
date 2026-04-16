## 👥 Integrantes

| Nombre | GitHub |
|--------|--------|
| Stiven Mora Bárcenas | [@stivenn18](https://github.com/stivenn18) |
| Jose Jhardiher Giraldo Muñoz | [@MunGZar](https://github.com/MunGZar) |

---

# ☠ Cavernas de Umbrath

> *Un oscuro laberinto aguarda tu llegada. Sólo los valientes se atreven a descender a sus profundidades.*

**Cavernas de Umbrath** es un juego de rol (RPG) de exploración textual desarrollado con React. El jugador asume el rol de un aventurero que desciende a un laberinto de cámaras interconectadas, navegando entre ellas mediante una brújula direccional. Cada habitación revela su historia a través de descripciones atmosféricas, y el mapa del mundo permite al jugador ver en todo momento dónde se encuentra dentro de las cavernas.

No hay combate, no hay inventario: solo la oscuridad, la narrativa y la decisión de qué puerta cruzar a continuación.

---

## 🗺 El Mundo del Juego

Las cavernas están compuestas por **5 salas únicas** conectadas entre sí mediante un sistema de direcciones cardinales (Norte, Sur, Este, Oeste):

| Sala | Icono | Descripción breve | Salidas disponibles |
|---|---|---|---|
| Entrada de la Cueva | 🗺️ | El punto de partida. Aire frío, musgo y sombras. | Norte → Pasillo |
| Pasillo de las Sombras | 🕯️ | El nodo central. Antorchas que parpadean en cada dirección. | Norte, Sur, Este, Oeste |
| Gran Biblioteca | 📚 | Miles de libros polvorientos con magia ancestral. | Oeste → Pasillo |
| Celda Olvidada | ⛓️ | Una habitación húmeda con marcas en las paredes. | Este → Pasillo |
| Salón del Trono | 💀 | El corazón de la oscuridad. Un trono de hueso de obsidiana. | Sur → Pasillo |

El **Pasillo de las Sombras** actúa como hub central desde el que se puede alcanzar cualquier otra sala. El objetivo es explorar todas las habitaciones y descubrir la historia que esconde cada una.

---

## 🛠 Stack Tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| React | ^19.2.4 | Librería de UI |
| React Router DOM | ^7.6.0 | Sistema de rutas y navegación |
| Zustand | ^5.0.5 | Estado global del juego |
| Context API | — | Modo oscuro/claro (ThemeContext) |
| Vite | ^8.0.4 | Bundler y servidor de desarrollo |
| CSS Variables | — | Sistema de temas (Calabozo / Pergamino) |
| Google Fonts | — | Tipografías Cinzel + Crimson Text |

---

## 📦 Instalación y puesta en marcha

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior (incluido con Node.js)

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/stivenn18/rpg-navigation-react.git

# 2. Entra al directorio del proyecto
cd rpg-navigation-react

# 3. Instala las dependencias
npm install

# 4. Inicia el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo con hot-reload
npm run build     # Compila el proyecto para producción en /dist
npm run preview   # Previsualiza el build de producción localmente
npm run lint      # Ejecuta ESLint sobre el código fuente
```

---

## 🗂 Estructura del Proyecto

```
rpg-navigation-react/
│
├── public/
│   ├── favicon.svg          # Ícono de la pestaña del navegador
│   └── icons.svg            # Íconos SVG del proyecto
│
├── src/
│   │
│   ├── data/
│   │   └── worldMap.js      # JSON del mapa de las cavernas + función getRoom()
│   │
│   ├── store/
│   │   └── gameStore.js     # Store de Zustand: estado global del juego
│   │
│   ├── context/
│   │   └── ThemeContext.jsx # Context API para el modo oscuro/claro
│   │
│   ├── components/
│   │   ├── Navbar.jsx           # Barra de navegación principal
│   │   ├── PublicLayout.jsx     # Layout para rutas públicas (/)
│   │   └── ProtectedLayout.jsx  # Layout protegido con redirección a /
│   │
│   ├── pages/
│   │   ├── HomePage.jsx     # Pantalla de inicio — formulario del aventurero
│   │   ├── GamePage.jsx     # Pantalla de exploración — sala actual + brújula
│   │   └── MapPage.jsx      # Pantalla del mapa — todas las salas del mundo
│   │
│   ├── assets/
│   │   └── hero.png         # Imagen de recurso visual
│   │
│   ├── App.jsx              # Configuración del router y ThemeProvider
│   ├── App.css              # Estilos globales y sistema de temas CSS
│   └── main.jsx             # Punto de entrada de la aplicación React
│
├── index.html               # HTML raíz con script anti-flicker de tema
├── vite.config.js           # Configuración de Vite
├── eslint.config.js         # Configuración de ESLint
├── package.json             # Dependencias y scripts del proyecto
└── README.md                # Este archivo
```

---

## 🧱 Jerarquía de Componentes

A continuación se muestra el árbol completo de renderizado de la aplicación, desde el punto de entrada hasta cada hoja:

```
main.jsx
└── <StrictMode>
    └── <App>
        └── <ThemeProvider>           ← Context API: provee isDark + toggleTheme
            └── <RouterProvider>      ← React Router v7: gestiona todas las rutas
                │
                ├── [Ruta pública]
                │   └── <PublicLayout>
                │       ├── <Navbar>          → Links: Inicio / Toggle tema
                │       └── <Outlet>
                │           └── <HomePage>    → Ruta "/"
                │               └── Formulario de nombre del jugador
                │
                └── [Rutas protegidas]
                    └── <ProtectedLayout>     → Redirige a "/" si no hay playerName
                        ├── <Navbar>          → Links: Inicio / Explorar / Mapa / Badge / Salir
                        └── <Outlet>
                            ├── <GamePage>    → Ruta "/game"
                            │   ├── Header (playerName + locationId)
                            │   ├── RoomCard  → Muestra icono, nombre y descripción
                            │   └── CompassGrid
                            │       ├── Botón Norte  (activo o deshabilitado)
                            │       ├── Botón Sur    (activo o deshabilitado)
                            │       ├── Botón Este   (activo o deshabilitado)
                            │       └── Botón Oeste  (activo o deshabilitado)
                            │
                            └── <MapPage>     → Ruta "/map"
                                ├── Header del mapa
                                └── worldMap.map() →
                                    └── MapCard × 5 salas
                                        ├── 🚩 Badge "ESTÁS AQUÍ" (condicional)
                                        ├── Icono + Título + Descripción
                                        └── Tags de conexiones cardinales
```

---

## 🔄 Flujo de Estado

El estado del juego vive en un único store de **Zustand** (`gameStore.js`) y fluye de la siguiente manera:

```
gameStore (Zustand)
├── playerName: string         ← Nombre del aventurero (vacío = no autenticado)
├── currentLocationId: string  ← ID de la sala actual (inicia en "entrada")
│
├── setPlayerName(name)        ← Llamado desde HomePage al comenzar
├── move(direction)            ← Llamado desde GamePage al presionar brújula
│     └── Consulta worldMap → obtiene nextRoomId → actualiza currentLocationId
└── reset()                   ← Llamado desde Navbar al salir / reiniciar
```

**ThemeContext** gestiona el tema visual de forma independiente:

```
ThemeContext (Context API)
├── isDark: boolean            ← true = Calabozo (dark) | false = Pergamino (light)
├── toggleTheme()              ← Alterna el tema y persiste en localStorage
└── useEffect → aplica clase "dark" o "light" en <html>
```

---

## 🛡 Protección de Rutas

Las rutas `/game` y `/map` están envueltas por `<ProtectedLayout>`. Si `playerName` está vacío en el store, el componente ejecuta un `<Navigate to="/" replace />` inmediato, evitando el acceso sin nombre de jugador.

```jsx
// ProtectedLayout.jsx
if (!playerName) {
  return <Navigate to="/" replace />;
}
```

---

## 🎨 Sistema de Temas

La aplicación cuenta con dos temas intercambiables desde la Navbar:

| Tema | Clase en `<html>` | Paleta | Tipografía |
|---|---|---|---|
| 🌑 **Calabozo** (oscuro) | `.dark` | Negros, púrpuras profundos, acento violeta | Cinzel + Crimson Text |
| ☀ **Pergamino** (claro) | `.light` | Beiges, marrones cálidos, acento sepia | Cinzel + Crimson Text |

El tema se persiste en `localStorage` bajo la clave `rpg-theme`. Para evitar el *flash of unstyled content* (FOUC), `index.html` incluye un script inline que aplica la clase del tema **antes** de que React hidrate el DOM:

```html
<script>
  (function () {
    var theme = localStorage.getItem("rpg-theme");
    var isDark = theme ? theme === "dark" : true;
    document.documentElement.classList.add(isDark ? "dark" : "light");
  })();
</script>
```

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos para el curso de **Frontend — 6° Semestre**.

---

<div align="center">
  <sub>☠ Forjado en las sombras con React + Zustand + React Router v7 ☠</sub>
</div>
