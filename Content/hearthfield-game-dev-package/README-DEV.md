# HearthField Canvas Game - Development Package

## 🚀 Ready for Development Integration

Este paquete contiene el juego completo en modo desarrollo, listo para ser integrado en otro proyecto que también esté en desarrollo.

### Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Build para producción (cuando sea necesario)
npm run build
```

### Estructura del Proyecto

```
hearthfield-game/
├── src/                    # Código fuente del juego
│   ├── game.js            # Motor principal del juego
│   ├── classes/           # Clases del juego
│   │   ├── player.js      # Jugador
│   │   ├── enemy.js       # Enemigo
│   │   ├── bullets.js     # Sistema de bullets
│   │   ├── scoreEngine.js # Motor de puntuación y secuencias
│   │   └── ...
├── assets/                # Assets del juego
│   ├── images/           # Sprites e imágenes
│   └── audio/            # Efectos de sonido
├── index.html            # HTML principal
├── vite.config.js        # Configuración de Vite
└── package.json          # Dependencias y scripts
```

### Integración en Otro Proyecto de Desarrollo

#### Opción 1: Como Submodule
```bash
# En tu proyecto principal
git submodule add <ruta-al-repo> games/hearthfield
cd games/hearthfield
npm install
npm run dev
```

#### Opción 2: Como Microservice
```bash
# Correr el juego en puerto separado
cd hearthfield-game
npm run dev  # Corre en localhost:8080

# En tu proyecto principal, usar iframe o fetch
<iframe src="http://localhost:8080" width="800" height="600"></iframe>
```

#### Opción 3: Integración Directa
```bash
# Copiar código fuente a tu proyecto
cp -r src/ tu-proyecto/src/games/hearthfield/
cp -r assets/ tu-proyecto/public/games/hearthfield/

# Importar en tu código
import createGame from './games/hearthfield/game.js'
```

### Configuración de Desarrollo

**Vite Config** (`vite.config.js`):
```javascript
export default defineConfig({
  root: '.',
  publicDir: 'assets',
  server: {
    port: 8080,  // Cambia si hay conflicto de puertos
    open: true
  }
})
```

**Scripts disponibles**:
- `npm run dev` - Servidor de desarrollo con hot reload
- `npm run build` - Build optimizado para producción
- `npm run preview` - Preview del build de producción

### Características del Juego

- **Gameplay**: Catch/collect bullets según secuencia UI
- **4 Bullet Types**: Arrow, Heart, Tiger, Sereno
- **Progressive Difficulty**: Sistema de niveles balanceado
- **Development Features**:
  - Console logging para debugging
  - Hot reload con Vite
  - Source maps para debugging
  - Asset watching

### Personalización y Desarrollo

#### Ajustar Velocidades
```javascript
// src/classes/scoreEngine.js - línea ~252
let ARROWS = [
  [
    {speed: 2.5, q: 1, lifetime: 150}, // Ajusta aquí
    // ...
  ]
]
```

#### Añadir Nuevos Bullet Types
1. Agregar sprite en `assets/images/`
2. Añadir configuración en `scoreEngine.js`
3. Añadir función `arm*` en `enemy.js`
4. Añadir type en `bullets.js`

#### Modificar UI
```javascript
// src/classes/communications.js - para mensajes UI
// index.html - para layout principal
```

### Debugging

**Console Commands**:
```javascript
// En browser console
game.level = 5          // Saltar a nivel
game.scoreEngine.tries = 10  // Más vidas
game.player.x = 400     // Mover jugador
```

**Logging habilitado**:
- Level progression
- Bullet creation
- Sequence generation
- Army ready status

### Hot Development Features

- ✅ **Vite Hot Reload**: Cambios instantáneos
- ✅ **Source Maps**: Debug fácil
- ✅ **Console Logging**: Debugging detallado
- ✅ **Asset Watching**: Assets se recargan automáticamente
- ✅ **ES6 Modules**: Fácil importación/exportación

### Deployment

Cuando estés listo para producción:
```bash
npm run build
# Usar contenido de dist/ para deployment
```

### Compatibilidad

- **Node.js**: 16+
- **Browsers**: Modernos con Canvas 2D
- **Development**: Vite 5.x
- **Modules**: ES6

---

**¡Listo para desarrollo!** 🎮

Para preguntas específicas de integración, revisa el código fuente - está bien documentado y organizado en clases modulares.