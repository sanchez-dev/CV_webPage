# HearthField Canvas Game - Deployment Guide

## Production Build Ready ✅

This package contains a production-ready build of the HearthField Canvas Game.

### What's Included

- **dist/index.html**: Main game file
- **dist/assets/**: Optimized JavaScript bundle (41KB)
- **dist/images/**: All game sprites and graphics
- **dist/audio/**: Sound effects
- **hearthfield-game-production.zip**: Complete package ready for deployment

### Deployment Instructions

#### Option 1: Simple Web Server
1. Extract `hearthfield-game-production.zip`
2. Upload the `dist/` folder contents to your web server
3. Access `index.html` in a web browser

#### Option 2: Integrate into Existing Website
1. Copy `dist/` contents to your desired directory
2. Include the game in an iframe or directly embed the HTML

#### Option 3: CDN Deployment
- Upload to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)
- The game is fully self-contained with no external dependencies

### Game Features

- **Catch/Collect Gameplay**: Player catches bullets according to UI sequence
- **4 Bullet Types**: Arrow (wet_sock), Heart, Tiger, Sereno (snow_man)
- **Progressive Difficulty**: 10+ levels with increasing complexity
- **Balanced Speed**: Optimized for accessibility and fun
- **No Debug Interface**: Clean production build

### Technical Details

- **Framework**: Vanilla JavaScript + Canvas API
- **Build Tool**: Vite
- **Size**: ~41KB minified JavaScript + assets
- **Browser Support**: Modern browsers with Canvas 2D support
- **Mobile Friendly**: Responsive design

### Game Controls

- **Mouse**: Move player
- **Click**: Collect bullets
- **Space**: Start/Resume game (if needed)

### File Structure

```
dist/
├── index.html          # Main game file
├── assets/
│   └── index-*.js      # Optimized game code
├── images/             # Game sprites
│   ├── raincoat_final.png  # Enemy
│   ├── spray.png           # Player
│   ├── wet_sock.png        # Arrow bullets
│   ├── heartB.png          # Heart bullets
│   ├── tiger.png           # Tiger bullets
│   ├── snow_man.png        # Sereno bullets
│   └── *_icon.png         # UI icons
└── audio/              # Sound effects
    ├── arrow.wav
    ├── heart0.wav
    ├── tiger0.wav
    └── sereno.wav
```

### Performance

- Optimized bullet speeds for smooth gameplay
- Progressive difficulty scaling
- Efficient sprite rendering
- ~10KB gzipped JavaScript

### Support

For integration questions or customizations, refer to the source code or contact the development team.

---

**Ready to deploy!** 🚀