'use strict'
console.log("Game script loaded and executing.");
import Player from './classes/player.js'
import Bullets from './classes/bullets.js'
import Star from './classes/star.js'
import Enemy from './classes/enemy.js'
import Sound from './classes/sound.js'
import ScoreEngine from './classes/scoreEngine.js'
import Animation from './classes/simpleAnimations.js'

let hf // heart field Canvas
import communications from './classes/communications.js'

// FPS tracking removed for production

class HearthField {
  constructor (canvas, quantity, starMaxVelocity, starMaxSize) {
    console.log("HearthField constructor started with canvas:", canvas);
    // Constrollers
    this.container = canvas
    this.gameRunning = false
    this.date = new Date().getSeconds()
    this.timer = 0
    this.ctx = canvas.getContext("2d");

    // Raining Setup big
    this.quantity = 15
    this.starMaxVelocity =  120
    this.starMaxSize = 96
    this.starMinSize = 48

    // Resizing background
    this.resizingBackground = false

    // Raining Setup small
    this.quantitySmall = 15
    this.starMaxVelocitySmall = 120
    this.starMaxSizeSmall = 48
    this.starMinSizeSmall = 24

    // Raining Setup behavior
    this.speed = 30
    this.speedSmall = 10
    this.direction = Math.PI / 2 
    this.depth = this.speed / 2
    this.depthSmall = this.speedSmall / 2

    // Scene Elements
    this.sceneElements = []
    this.smallAnimation = []

    this.stars = []
    this.stars2 = []

    this.updateSize(canvas)
    this.extraImages()


    // gradient clouds
    this.gradientClouds = this.ctx.createLinearGradient(0, 0.000, 0, 300);

    // Add colors
    this.gradientClouds.addColorStop(0.200, '#0D1F31');
    this.gradientClouds.addColorStop(0.500, '#343250');
    this.gradientClouds.addColorStop(1.000, '#525274');

    this.cloudPatternImage = new Image()
    this.cloudPatternImage.onload = () => {
      this.cloudPatternImage.loaded = true
    }
    this.cloudPatternImage.onerror = () => {
      console.warn('Failed to load cloud pattern image')
      this.cloudPatternImage.loaded = false
    }
    this.cloudPatternImage.loaded = false
    this.cloudPatternImage.src = './assets/images/cloud-pattern.png'


    this.animating = false

    let _this = this

    window.addEventListener('resize', () => {
      this.communicationsEngine.setState('resize')
      canvas.style.cursor = 'pointer'
      this.resizingBackground = true
      this.updateSize()
      _this.refreshMessage = true
    })

    this.createAudioLibrary((audioLibrary) => {
      console.log('Audio library created, initializing game components...')
      _this.extraImages()
      _this.audioLibrary = audioLibrary

      // Create enemy FIRST (player position depends on it)
      console.log('Creating enemy...');
      _this.enemy = _this.createEnemy()
      console.log('Enemy created:', !!_this.enemy);

      // Then create player using enemy position
      console.log('Creating player...');
      _this.player = _this.createPlayer()
      console.log('Player created:', !!_this.player);

      _this.communicationsEngine = communications.create(this.fieldWidth, this.fieldHeight, this.screenResize)
      _this.scoreEngine = new ScoreEngine(_this.enemy)

      _this.scoreEngine.buildSequence()
      this.score = 0
      console.log('Initializing scene...');
      this.initScene()
      console.log('Game initialization complete')
    })

  }

  imageCreator (route, size, columns = 1, rows = 1, x, y, settings = {}) {
    console.log('Attempting to load image with route:', route); // Log for debugging
    let img = new Image()
    img.columns = columns
    img.rows = rows
    img.size = size
    img.flip = settings.flip || false
    img.loaded = false

    // Add load event handler
    img.onload = () => {
      console.log('Image loaded successfully:', route);
      img.loaded = true
    }
    img.onerror = () => {
      console.error(`Failed to load image: ${route}`); // Enhanced error log
      img.loaded = false
    }

    img.src = route

    let image = {
      img,
      resize : function (newSize) {
        this.size = (newSize * 100) / 1920
      },
      size : size || 0,
      x,
      y,
      on: settings.on || false,
      repeat: settings.repeat || false,
      yoyo: settings.yoyo || false,
      settings
    }

    return image
  }

  extraImages () {
    console.log('Loading extra images...');
    this.focusedSquare = this.imageCreator('./assets/images/focus_square.png')
    console.log('Extra images setup complete');
  }

  createAudioLibrary (cb) {
    console.log('Creating audio library...'); // Log for debugging
    let audioLibrary = {}
    audioLibrary.normal = new Sound('./assets/audio/normal#.wav', 0.3, 2)
    audioLibrary.heart = new Sound('./assets/audio/heart#.wav', 0.4, 2)
    audioLibrary.tiger = new Sound('./assets/audio/tiger#.wav', 0.4, 2)
    audioLibrary.sereno = new Sound('./assets/audio/sereno.wav', 0.4, 1)
    audioLibrary.arrow = new Sound('./assets/audio/arrow.wav', 0.4, 1)
    cb(audioLibrary)
  }

  updateSize () {
    let width = window.innerWidth
    let height = window.innerHeight

    this.container.setAttribute('width', width)
    this.container.setAttribute('height', height)

    this.scoreCorner = width / 20
    
    this.fieldWidth = width
    this.fieldHeight = height

    this.screenResize = (this.fieldWidth * 100 / 1920) * 0.01

    // for (let i = 0; i < this.stars.length; i++) {
    //   this.stars[i].updateMaxSize(this.fieldWidth, this.fieldHeight, this.screenResize)
    // }

    if (this.communicationsEngine) {
      this.communicationsEngine.resize(this.fieldWidth, this.fieldHeight, this.screenResize)
      // this.enemy.resize(this.width, this.height, this.screenResize)
      // this.player.resize(this.enemy.x, this.enemy.y, this.screenResize)
    }
  }

  createPlayer () {
    console.log('Creating player with screenResize:', this.screenResize);
    let ship = new Image()
    let bullet1 = new Image()
    let bullet1_death = new Image()

    // Add load event handlers
    ship.onload = () => {
      console.log('Player ship image loaded')
      ship.loaded = true
    }
    ship.onerror = () => {
      console.error('Failed to load player ship image')
      ship.loaded = false
    }

    // player
    ship.src = './assets/images/spray.png'
    ship.loaded = false

    // player bullets
    bullet1_death.src = './assets/images/bullet_death.png'
    bullet1_death.columns = 16
    bullet1_death.rows = 1

    bullet1.src = './assets/images/bullet.png'
    bullet1.columns = 8
    bullet1.rows = 1

    let bullets = {
      normal: {
        img: bullet1,
        death: bullet1_death
      }
    }

    let images = {
      ship,
      bullets
    }

    // Use position relative to enemy (original logic)
    let playerX = this.enemy ? (this.enemy.x * this.screenResize) : (this.fieldWidth / 2)
    let playerY = this.enemy ? (this.enemy.y - ((this.enemy.size.h - 200) * this.screenResize)) : (this.fieldHeight - 100)

    let myPlayer = new Player( playerX, playerY, images, this.screenResize )
    return myPlayer
  }

  createEnemy () {
    console.log('Creating enemy with screenResize:', this.screenResize);
    let enemyFace = new Image()

    // enemy
    enemyFace.onload = () => {
      enemyFace.loaded = true
    }
    enemyFace.onerror = () => {
      enemyFace.loaded = false
    }
    enemyFace.loaded = false
    enemyFace.src = './assets/images/raincoat_final.png'
    enemyFace.columns = 6
    enemyFace.rows = 1

    enemyFace.adjust = {
      x : 0,
      y : 0
    }

    // enemyBullets
    // sock
    let bulletA = new Image()
    bulletA.onload = () => console.log('Wet sock bullet loaded')
    bulletA.onerror = () => console.error('Failed to load wet sock bullet')
    bulletA.src = './assets/images/wet_sock.png'
    bulletA.columns = 10
    bulletA.rows = 1

    let bulletA_D = new Image()
    bulletA_D.onload = () => console.log('Wet sock death loaded')
    bulletA_D.onerror = () => console.error('Failed to load wet sock death')
    bulletA_D.src = './assets/images/wet_sock_death.png'
    bulletA_D.columns = 8
    bulletA_D.rows = 1

    // heart
    let bullet1 = new Image()
    bullet1.onload = () => console.log('Heart bullet loaded')
    bullet1.onerror = () => console.error('Failed to load heart bullet')
    bullet1.src = './assets/images/heartB.png'
    bullet1.columns = 10
    bullet1.rows = 1

    let bullet1_D = new Image()
    bullet1_D.onload = () => console.log('Heart death loaded')
    bullet1_D.onerror = () => console.error('Failed to load heart death')
    bullet1_D.src = './assets/images/heartB_death.png'
    bullet1_D.columns = 16
    bullet1_D.rows = 1

    // tiger
    let bulletT = new Image()
    bulletT.src = './assets/images/tiger.png'
    bulletT.columns = 8
    bulletT.rows = 1

    let bulletT_D = new Image()
    bulletT_D.src = './assets/images/tiger_death.png'
    bulletT_D.columns = 8
    bulletT_D.rows = 1

    // Snow_man
    let bulletS = new Image()
    bulletS.src = './assets/images/snow_man.png'
    bulletS.columns = 8
    bulletS.rows = 1

    let bulletS_D = new Image()
    bulletS_D.src = './assets/images/snow_man_death.png'
    bulletS_D.columns = 24
    bulletS_D.rows = 1

    this.bulletsImages = {
      arrow : {
        img: bulletA,
        death: bulletA_D
      },
      heart: {
        img: bullet1,
        death: bullet1_D,
      },
      tiger: {
        img: bulletT,
        death:bulletT_D
      },
      sereno: {
        img: bulletS,
        death: bulletS_D
      }
    }

    let images = {
      enemyFace,
      bullets : this.bulletsImages
    }

    let size = {
      w: 386,
      h: 584
    }

    let myEnemy = new Enemy ( 1920 / 2, this.fieldHeight + 10, images, size, this.screenResize)
    return myEnemy
  }

  initScene () {
    console.log('initScene: Setting up stars and scene elements...');
    // Raining
    let star1 = new Image()
    let star2 = new Image()
    star1.src = './assets/images/snowflake.png'
    star1.onerror = () => { console.error("Snowflake image failed to load from:", star1.src); };
    star2.src = './assets/images/snowflake.png'
    star2.onerror = () => { console.error("Snowflake image failed to load from:", star2.src); };

    for (let i = 0; i < this.quantity; i++ ) {
      this.stars.push(new Star(this.starMinSize, this.starMaxSize, this.fieldWidth, this.fieldHeight, this.depth, star1))
    }

    for (let i = 0; i < this.quantitySmall; i++ ) {
      this.stars2.push(new Star(this.starMinSizeSmall, this.starMaxSizeSmall, this.fieldWidth, this.fieldHeight, this.depthSmall, star2))
    }
    // Finish raining

    // Start Scene Elements

    // Sky
    let cloudsHeight = 120
    let moonImage = this.imageCreator('./assets/images/moon_final.png', 128, 6, 1, (this.fieldWidth / 2) - 300, cloudsHeight - 20 )
    let leftCloudImage = this.imageCreator('./assets/images/left-cloud.png', 192, 1, 1, (this.fieldWidth / 2) - 620, cloudsHeight )
    let leftCloudTImage = this.imageCreator('./assets/images/left-cloud-2.png', 192, 1, 1, (this.fieldWidth / 2) - 940, cloudsHeight )
    let rightCloudImage = this.imageCreator('./assets/images/right-cloud-1.png', 192, 1, 1, (this.fieldWidth / 2) - 280, cloudsHeight )
    let rightCloudTImage = this.imageCreator('./assets/images/right-cloud-2.png', 192, 1, 1, (this.fieldWidth / 2), cloudsHeight )
    let rightCloudThImage = this.imageCreator('./assets/images/right-cloud-3.png', 192, 1, 1, (this.fieldWidth / 2) + 300, cloudsHeight )
    let rightCloudFImage = this.imageCreator('./assets/images/right-cloud-2.png', 192, 1, 1, (this.fieldWidth / 2) + 600, cloudsHeight )
    let rightCloudFIImage = this.imageCreator('./assets/images/right-cloud-1.png', 192, 1, 1, (this.fieldWidth / 2) + 900, cloudsHeight )
    let rightCloudFIIImage = this.imageCreator('./assets/images/right-cloud-3.png', 192, 1, 1, (this.fieldWidth / 2) + 1200, cloudsHeight )
    
    
    // Mountains
    let mountainsPosition = 40 * this.screenResize
    let mountainCityImage = this.imageCreator('./assets/images/mountain_city_final.png', 0, 1, 1, 0, this.fieldHeight - ((this.fieldHeight / 4 * 3) - mountainsPosition))
    let redCloudsImage = this.imageCreator('./assets/images/red_clouds.png', 0, 1, 1, 0 + 440, this.fieldHeight - ((this.fieldHeight / 4 * 3) - mountainsPosition))
    
    // Station
    let stationDimensions = { w: 683, h: 376 }
    let railsDimensions = { w: 1920, h: 528 }
    let advertisingDimensions = { w: 62, h: 122 }
    let stationImage = this.imageCreator('./assets/images/station_final.png', stationDimensions, 1, 1, stationDimensions.w / 2, this.fieldHeight - ((stationDimensions.h * this.screenResize)))
    let advertisingImage = this.imageCreator('./assets/images/advertising_final.png', advertisingDimensions, 16, 1, 237, this.fieldHeight - ((advertisingDimensions.h + 256) * this.screenResize))
    let railsImage = this.imageCreator('./assets/images/rails_final.png', railsDimensions, 1, 1, railsDimensions.w / 2, this.fieldHeight)

    let _this = this
    // Buses
    let busDimensions = { w: 1992, h: 187 }
    let bus1YVariable = 73

    let transmi1Settings = {
      type: 'move',
      on: false,
      endPos: { 
        x: -4600 * this.screenResize, 
        y: _this.fieldHeight - ((busDimensions.h + bus1YVariable) * this.screenResize)
      },
      motionCurve: [
        {"100": 100},
        {"60": 100},
        {"50": 60},
        {"45": 20},
        {"35": 0},
        {"25": 0},
        {"20":40},
        {"0": 40},
      ],
      duration: 9
    }

    let transmi1Image = this.imageCreator('./assets/images/metro_final.png', busDimensions, 1, 1, this.fieldWidth + 100, this.fieldHeight - ((busDimensions.h + bus1YVariable) * this.screenResize), transmi1Settings)
    
    let bus2YVariable = - 40

    let transmi2Settings = {
      type: 'move',
      flip: true,
      endPos: { 
        x: -6900 * this.screenResize, 
        y: _this.fieldHeight - ((busDimensions.h + bus2YVariable) * this.screenResize)
      },
        motionCurve: [
          {"100": 40},
          {"50": 100},
          {"0": 100}
        ],
      duration: 7
    }
    let transmi2Image = this.imageCreator('./assets/images/metro_final.png', busDimensions, 1, 1, this.fieldWidth + 100, this.fieldHeight - ((busDimensions.h + bus2YVariable) * this.screenResize), transmi2Settings)

    // Adding elements to scene
    // Clouds
    this.sceneElements.push(rightCloudFIIImage)
    this.sceneElements.push(rightCloudFIImage)
    this.sceneElements.push(rightCloudFImage)
    this.sceneElements.push(rightCloudThImage)
    this.sceneElements.push(rightCloudTImage)
    this.sceneElements.push(rightCloudImage)
    this.sceneElements.push(leftCloudTImage)
    this.sceneElements.push(leftCloudImage)
    
    this.sceneElements.push(redCloudsImage)
    this.sceneElements.push(mountainCityImage)
    this.sceneElements.push(moonImage)
    
    // Buildings
    this.sceneElements.push(railsImage)
    this.sceneElements.push(stationImage)
    
    // Animations
    this.sceneElements.push(advertisingImage)
    this.smallAnimation.push(new Animation(transmi1Image, this.screenResize))
    this.smallAnimation.push(new Animation(transmi2Image, this.screenResize))

  }

  detectCollision (destroyable, beaten) {
    if (destroyable.alive) {
      let adjust = 8
      let distance = Math.sqrt(Math.pow(destroyable.x - beaten.x, 2) + Math.pow(destroyable.y - beaten.y, 2));
      let minorDistance = (destroyable.collisionSize / 2) + (beaten.collisionSize / 2)

      // DRAW HITBOX

      // this.ctx.beginPath()
      // this.ctx.strokeStyle = "#FAFFFA"
      // this.ctx.lineWidth = 5
      // this.ctx.setLineDash([6, 4])

      // this.ctx.arc(destroyable.x, destroyable.y, (destroyable.collisionSize / 2) - adjust, 0, 2 * Math.PI);
      // this.ctx.stroke()
      // this.ctx.closePath()
      // this.ctx.beginPath()
      // this.ctx.arc(beaten.x, beaten.y, (beaten.collisionSize / 2) - adjust, 0, 2 * Math.PI);
      // this.ctx.stroke()
      // this.ctx.closePath()

      // FIN HITBOX

      if ( distance < minorDistance - (adjust * 2) ) {
        if (beaten.constructor.name === 'Enemy') {
          this.score = this.score + 100
        } else {
          this.scoreEngine.check(destroyable.type)
        }

        try {
          let sound = this.audioLibrary[destroyable.type]
          sound.play()
        } catch (e) {}

        destroyable.deathPhase()
      }
    }

  }

  spriteAnimate ( object, x, y, size = 1, time = 0, id ) {
    let tile = object.img

    // Check if image is loaded before drawing
    if (!tile.complete || tile.naturalWidth === 0) {
      return // Skip drawing if image not loaded
    }

    this.timer = this.timer > 359 ? 0 : this.timer

    let columns = tile.columns
    let rows = tile.rows
    let columnSize = tile.width / columns
    let rowSize = tile.height / rows

    let flip = tile.flip

    let frames = columns * rows

    let adjustX, adjustY

    try {
      adjustX = tile.adjust.x
      adjustY =  tile.adjust.y
    } catch (e){
      adjustX = 0
      adjustY = 0
    }

    let posImageX, posImageY

    
    if (typeof(size) === 'object') {
      let restX = size.w
      posImageX = x - (restX / 2)
      let restY = size.h * this.screenResize
      posImageY = y - restY

    } else {
      posImageX = (x - (size / 2)) + adjustX
      posImageY = ((y - (size / 2)) + adjustY) * this.screenResize
    }

    let linealLoop = Math.floor((frames) * this.timer / 360)

    let spritePosX, spritePosY


    if (object.dyingTime > 0) {
      spritePosX = columnSize * object.dyingTime - 1
      spritePosY = 0
    } else {
      spritePosX = columnSize * linealLoop
      spritePosY = rowSize * time
    }

    let spriteWidth = columnSize
    let spriteHeight = rowSize

    this.ctx.closePath()

    this.ctx.save()

    if (flip) {
      this.ctx.scale(-1, 1)
    }

    let multiplierX = this.screenResize
    let multiplierY = this.screenResize
    
    if (id === 'ui') {
      multiplierX = 1
      multiplierY = 1
      posImageY = ((y - (size / 2)) + adjustY)
    }


    this.ctx.drawImage(tile, spritePosX, spritePosY, spriteWidth, spriteHeight, posImageX * multiplierX, posImageY, spriteWidth * multiplierX, spriteHeight * multiplierY)
    this.ctx.restore()
  }

  drawStar (object) {
    // Check if star image is loaded
    if (!object.image.complete || object.image.naturalWidth === 0) {
      return
    }
    this.ctx.fillStyle = "#FAFFFA";
    this.ctx.drawImage(object.image, object.x, object.y, object.size, object.size)
  }

  drawPlayer () {
    let angle = this.player.faceTo()


    // Check if player ship image is loaded
    if (this.player.shipImage.loaded && this.player.shipImage.complete && this.player.shipImage.naturalWidth > 0) {
      this.ctx.save()
      this.ctx.translate(this.player.x, this.player.y)
      this.ctx.rotate(angle)
      this.ctx.drawImage(this.player.shipImage, 0 - (this.player.size / 2), 0 - (this.player.size / 2), this.player.size, this.player.size)
      this.ctx.closePath()
      this.ctx.restore()
    } else {
      // Draw a placeholder circle for debugging
      this.ctx.save()
      this.ctx.fillStyle = '#00FF00'
      this.ctx.beginPath()
      this.ctx.arc(this.player.x, this.player.y, this.player.size / 2, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.restore()
    }
  }

  drawEnemy () {
    // draw Enemy
    // Check if enemy image is ready, otherwise draw placeholder
    if (this.enemy.img && this.enemy.img.complete && this.enemy.img.naturalWidth > 0) {
      this.spriteAnimate(this.enemy, this.enemy.x, this.enemy.y, this.enemy.size)
    } else {
      // Draw red placeholder for enemy
      this.ctx.save()
      this.ctx.fillStyle = '#FF0000'
      this.ctx.beginPath()
      this.ctx.arc(this.enemy.x * this.screenResize, this.enemy.y * this.screenResize, 50, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.restore()
    }

    for (let i = 0; i < this.enemy.bullets.length; i++) {
      if (this.enemy.bullets[i].alive) {
        this.enemy.bullets[i].update()

        this.ctx.save()
        this.ctx.translate(this.enemy.bullets[i].x, this.enemy.bullets[i].y )
        this.ctx.rotate(this.enemy.bullets[i].angle)
        this.spriteAnimate(this.enemy.bullets[i], 0, 0, this.enemy.bullets[i].size, null, this.enemy.bullets[i].id)
        this.ctx.restore()

        this.detectCollision(this.enemy.bullets[i], this.player)
      }
    }
  }

  // Draw a vignette with next item to catch
  itemToCatch (name) {
    // this.spriteAnimate(this.bulletsImages[name], this.fieldWidth / 2, this.fieldHeight / 2, 64)
  }

  drawUI () {
    for (let i = 0; i < this.scoreEngine.UI.length; i++) {
      for (let y = 0; y < this.scoreEngine.UI[i].length; y++) {
        if (this.scoreEngine.UI[i][y].visible) {
          this.spriteAnimate(this.scoreEngine.UI[i][y], this.scoreEngine.UI[i][y].x + this.scoreCorner, this.scoreEngine.UI[i][y].y + this.scoreCorner, this.scoreEngine.UI[i][y].img.size, null, 'ui' )
        }
        if (this.scoreEngine.UI[i][y].sequenceTurn && this.scoreEngine.UI[i][y].type === "sequence") {
          this.itemToCatch(this.scoreEngine.UI[i][y].name)
          this.spriteAnimate(this.focusedSquare, this.scoreEngine.UI[i][y].x + this.scoreCorner - 16, this.scoreEngine.UI[i][y].y + this.scoreCorner - 18, 32, null, 'ui' )
        }
      }
    }
    this.drawMessage(`${this.scoreEngine.subLevel}`, this.scoreCorner, this.fieldHeight - this.scoreCorner, 'left')
  }

  drawCommunications() {
    let communicationsToDraw = this.communicationsEngine.toDraw()

    if (this.communicationsEngine.blockingBackground.show) {
      this.ctx.beginPath()
      this.ctx.rect(0, 0, this.fieldWidth, this.fieldHeight)
      this.ctx.fillStyle = this.communicationsEngine.blockingBackground.color
      this.ctx.fill()
      this.ctx.closePath()
    }

    for (let i = 0; i < communicationsToDraw.length; i++) {
      this.spriteAnimate(communicationsToDraw[i], communicationsToDraw[i].x, communicationsToDraw[i].y, communicationsToDraw[i].size)
    }
  }

  drawScene () {
    // 1. Draw moon
    let y = 123


    this.ctx.beginPath()
    this.ctx.fillStyle = this.gradientClouds
    this.ctx.rect(0, 20, this.fieldWidth, 182 * this.screenResize)
    this.ctx.fill()
    this.ctx.closePath()
    
    this.ctx.beginPath()
    if (this.cloudPatternImage.loaded && this.cloudPatternImage.complete) {
      let cloudPattern = this.ctx.createPattern(this.cloudPatternImage, 'repeat')
      this.ctx.rect(0, 20, this.fieldWidth, 182 * this.screenResize)
      this.ctx.fillStyle = cloudPattern
      this.ctx.fill()
    }
    this.ctx.closePath()


    for (let i = 0; i < this.sceneElements.length; i++) {
      this.spriteAnimate(this.sceneElements[i], this.sceneElements[i].x, this.sceneElements[i].y, this.sceneElements[i].size)
    }

    for (let i = 0; i < this.smallAnimation.length; i++) {
      if (this.smallAnimation[i].on) {
        this.smallAnimation[i].update()
      }
      this.spriteAnimate(this.smallAnimation[i], this.smallAnimation[i].x, this.smallAnimation[i].y, this.smallAnimation[i].size )
    }

    // 2. Draw streets
    // 3. Draw First-Plane
  }

  drawMessage (message, x, y, align = 'center') {
    let multiplier = 2.4 * this.screenResize

    this.ctx.textAlign = align
    this.ctx.font = `${1.2 + multiplier}em Staatliches`
    this.ctx.fillStyle = '#FAFFFA'
    this.ctx.fillText(message, x * this.screenResize, y)
    this.ctx.font = `${(1.2 + multiplier) / 2}em Staatliches`
    this.ctx.fillText('Tropel', x * this.screenResize, y - (22 + (30 * this.screenResize)))
  }

  update () {
    this.ctx.clearRect(0, 0, this.fieldWidth, this.fieldHeight);
    this.ctx.fillStyle = '#0E1F31';
    this.ctx.fillRect(0, 0, this.fieldWidth, this.fieldHeight);
    this.timer += 12 // FPS

    if (!this.updateLogCount) this.updateLogCount = 0;
    this.updateLogCount++;
    if (this.updateLogCount % 60 === 0) {
      console.log('Update loop running, timer:', this.timer, 'gameRunning:', this.gameRunning);
    }

    this.drawScene()

    // Game starts automatically now, no need for start message

    for (let i = 0; i < this.stars2.length; i++) {
      this.stars2[i].update(this.speed, this.direction)
      this.drawStar(this.stars2[i])
    }

    if (this.gameRunning && this.player && this.enemy) {
      this.player.update()
      this.drawEnemy()
      this.drawPlayer()

      // Draw custom cursor at mouse position - removed as per feedback
      // if (window.mouseX !== undefined && window.mouseY !== undefined && this.focusedSquare && this.focusedSquare.img.loaded) {
      //   this.spriteAnimate(this.focusedSquare, window.mouseX, window.mouseY, 32);
      // }
    } else if (this.gameRunning) {
      console.log('Game running but missing components:', {
        player: !!this.player,
        enemy: !!this.enemy
      })
    }

    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].update(this.speed, this.direction)
      this.drawStar(this.stars[i])
    }

    if (this.scoreEngine && this.scoreEngine.UI) {
      this.drawUI()
    }
    if (this.communicationsEngine) {
      this.drawCommunications()
    }
  }

  startGame() {
    console.log('Starting game!');
    this.gameRunning = true
    console.log('Game started, gameRunning:', this.gameRunning);
    if (this.communicationsEngine) {
      this.communicationsEngine.setState('playing')
    }
    console.log('Game running:', this.gameRunning)
  }

  switchAnimate () {
    this.animating = !this.animating

    for (let i = 0; i < this.smallAnimation.length; i++) {
      this.smallAnimation[i].init()
    }
    if (this.animating) {
      animate()
    }
  }
}

function animate () {
  if (hf) {
    hf.update()
    // FPS increment removed for production
    if (hf.animating) {
      requestAnimationFrame( animate )
    }
  }
}

function create (canvas, cb) {
  console.log("create() called with canvas", canvas);
  hf = new HearthField(canvas)
  console.log('HearthField instance created in create()');
  cb(hf)
}


// Convert paths for web
function fixAssetPath(path) {
  return path.replace('./assets/images/', './assets/images/').replace('audio/', './assets/hearthfield-game/assets/audio/');
}

// Update all image paths in the code
function updateImagePaths() {
  // This will be handled by replacing the paths in the HTML/build process
}

export default create;
