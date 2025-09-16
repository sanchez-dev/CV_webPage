# Canvas Game - HearthField

Juego 2D extraído del tema Folium. Es un shooter espacial con elementos nostálgicos donde el jugador controla una nave que dispara a objetivos que caen desde arriba.

## Características del Juego

- **Motor de juego**: Canvas 2D con animaciones sprite
- **Jugador**: Nave controlada por mouse que dispara proyectiles
- **Enemigos**: Personaje animado que lanza diferentes tipos de proyectiles
- **Sistema de puntuación**: Engine de score con secuencias específicas
- **Audio**: Efectos de sonido usando Web Audio API
- **Escenario**: Ambiente nocturno urbano con elementos animados

## Estructura de Clases

- `HearthField` - Clase principal del motor de juego
- `Player` - Jugador/nave espacial
- `Enemy` - Enemigo principal
- `Bullets` - Sistema de proyectiles
- `Star` - Partículas de fondo (lluvia/nieve)
- `Sound` - Motor de audio
- `ScoreEngine` - Sistema de puntuación
- `Animation` - Animaciones de elementos de escena
- `Communications` - Sistema de comunicación/UI

## Assets Necesarios

### Imágenes de Jugador
- `spray.png` - Nave del jugador
- `bullet.png` - Proyectil normal (8 frames)
- `bullet_death.png` - Explosión proyectil (16 frames)

### Imágenes de Enemigo
- `raincoat_final.png` - Personaje enemigo (6 frames)
- `wet_sock.png` - Proyectil calcetín (10 frames)
- `heartB.png` - Proyectil corazón (10 frames)
- `tiger.png` - Proyectil tigre (8 frames)
- `snow_man.png` - Proyectil muñeco (8 frames)
- Y sus respectivas animaciones de muerte

### Escenario
- `moon_final.png` - Luna (6 frames)
- `station_final.png` - Estación
- `rails_final.png` - Rieles
- `metro_final.png` - Metro/bus
- Nubes, montañas, publicidad animada

### Audio
- `normal#.wav` - Sonido proyectil normal
- `heart#.wav` - Sonido corazón
- `tiger#.wav` - Sonido tigre
- `sereno.wav` - Sonido sereno
- `arrow.wav` - Sonido flecha

## Tecnologías

- JavaScript ES6+ con módulos CommonJS
- Canvas 2D API
- Web Audio API
- RequestAnimationFrame para loop de juego