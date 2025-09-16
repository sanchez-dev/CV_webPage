'use strict'

class ScoreEngine {
  constructor (enemy) {
    this.enemy = enemy
    this.bullets = enemy.arsenal
    this.bulletsMax = 0
    this.startingLevel = 0
    this.level = this.startingLevel
    this.restarTries = 5
    this.tries = this.restarTries
    this.itemsUI = []
    this.bulletsNames = []

    // Define bullet order explicitly to avoid JavaScript object iteration issues
    this.bulletsNames = ['arrow', 'heart', 'tiger', 'sereno']
    this.itemsUI = [...this.bulletsNames]
    this.bulletsMax = this.bulletsNames.length

    console.log('Bullets order:', this.bulletsNames)
    this.subLevel = 0
    this.itemsUI.push('tries')

    // Actual sequence place
    this.actualSequence = []
    this.actualSequenceItem = 'arrow'
    this.actualPhasePlace = 0
    this.UIActualSequence = []
    
    // uiLives
    this.uiLives = []

    // mainUI
    // 1: lives | 2: sequence
    this.UI = [[], []]

    // Waves
    this.wave = 0
    this.waveLength = 10 // wace size
    this.maxItems = 6 // max sequence lenght

    this.createUI()
  }

  createUI () {
    let _this = this

    this.uiItemSize = 32

    this.createUIImages((uiImages) => {
      let itemGap = 8
      _this.uiImages = uiImages

      console.log('UI Images created:', Object.keys(uiImages))

      // tries
      let space = 0
      for (let i = 0; i < this.tries; i++) {
        _this.uiLives.push(_this.createUIDrawable(_this.uiImages['tries'].size * i + space, 0, _this.uiImages['tries'], 'tries'))
        space += itemGap
      }

      _this.UI[0] = _this.uiLives
      console.log('Lives UI created:', _this.uiLives.length, 'elements')
      // _this.buildSequence()

    })
  }

  createUIDrawable (column, row, img, type, name) {
    let uiTryImage = {
      img,
      x : column,
      y : row,
      name,
      type : type,
      visible : true,
      sequenceTurn : false,
      shutDown : function () {
        this.visible = false
      },
      turnOn : function () {
        this.visible = true
      },
      focused : function () {
        this.sequenceTurn = true
      },
      noFocused : function () {
        this.sequenceTurn = false
      },
    }

    return uiTryImage
  }

  createUIImages (cb) {
    let uiImages = {}

    for (let i = 0; i < this.itemsUI.length; i++)  {
      uiImages[this.itemsUI[i]] = this.createUIImage(this.itemsUI[i])
    } 

    cb(uiImages)
  }

  createUIImage (name, col = 6, row = 1) {
    let uiItem = new Image()

    // Map names to correct asset file names
    const nameMapping = {
      'arrow': 'arrow_icon',
      'heart': 'heart_icon',
      'tiger': 'tiger_icon',
      'sereno': 'sereno_icon',
      'tries': 'tries_icon'
    }

    const fileName = nameMapping[name] || `${name}_icon`
    uiItem.src = `/hearthfield-game/assets/images/${fileName}.png`
    uiItem.size = 32
    uiItem.columns = col
    uiItem.rows = 1
    uiItem.type = 'UI'

    console.log(`Loading UI icon: ${uiItem.src}`)

    return uiItem
  }

  reduceTries () {
    this.tries--
    if (this.tries < 0) {
      this.restart ()
    } else {
      let rest = (this.uiLives.length - this.tries)
      this.uiLives[this.uiLives.length - rest].shutDown()
    }
  }

  turnOnTries () {
    this.tries = this.restarTries
    for (let i = 0; i < this.uiLives.length; i++) {
      this.uiLives[i].turnOn()
    }
  }

  restart () {
    this.level = this.startingLevel
    this.subLevel = 0
    this.actualPhasePlace = 0
    this.turnOnTries()
    this.buildSequence()
  }

  buildSequence () {
    console.log('Building sequence...')
    this.wave = 0
    let _this = this
    this.createWaveSequence((waveSequence) => {
      console.log('Wave sequence created:', waveSequence)
      _this.waveSequence = waveSequence
      _this.setActualSequence(waveSequence, (actualSequence) => {
        console.log('Actual sequence set:', actualSequence)
        _this.actualSequence = actualSequence
      })
    })
  }
  
  setActualSequence(waveSequence, cb) {
    let actualPhase = this.waveSequence[this.wave]
    this.actualPhase = actualPhase
    this.updateEnemyDifficult()

    this.drawActualSequence (actualPhase, () => {
      this.UI[1][this.actualPhasePlace].focused()
      cb(actualPhase)
    })
  }
  
  drawActualSequence (actualSequence, cb) {
    let spaceX = 8
    let itemGapX = 24
    let itemGapY = 20

    this.UIActualSequence = []

    for (let i = 0; i < actualSequence.length; i++) {
      let img = this.createUIDrawable(this.uiImages[actualSequence[i]].size * i + spaceX, this.uiImages[actualSequence[i]].size * 1 + itemGapY, this.uiImages[actualSequence[i]], 'sequence', actualSequence[i])
      this.UIActualSequence.push(img)
      spaceX += itemGapX
    }

    this.UI[1] = this.UIActualSequence
    cb()
  }

  createWaveSequence (cb) {
    // Crea una secuencia de diez X mini-secuencias

    let possibles = this.createPossibleList()

    let levelIndex = Math.min(this.level, possibles.length - 1)
    let levelPosibilities = possibles[levelIndex]
    console.log('Using level index:', levelIndex, 'Possibilities:', levelPosibilities)
    let waveSequence = []

    
    for (let i = 0; i < this.waveLength; i++) {
      let sequenceSize = 3 + ( Math.ceil( i * 3 / 10))

      sequenceSize = sequenceSize > this.maxItems ? this.maxItems : sequenceSize
      
      let smallSequence

      do {
        smallSequence = []
        for (let i = 0; i < sequenceSize; i++) {
          let randomItem = Math.floor(Math.random() * levelPosibilities.length)
          smallSequence.push(levelPosibilities[randomItem])
        }
      } while (smallSequence.every( (val, i, arr) => val === arr[0] ))
      waveSequence.push(smallSequence)
    }

    cb(waveSequence)
  }

  createPossibleList () {
    let b = this.bulletsNames

    let posibleWallet = [
      [b[0], b[1]],              // Level 0: arrow, heart (wet_sock, heartB)
      [b[0], b[1]],              // Level 1: arrow, heart (continuar básicos)
      [b[1], b[2]],              // Level 2: heart, tiger (heartB, tiger)
      [b[1], b[2]],              // Level 3: heart, tiger (heartB, tiger) - como esperabas
      [b[0], b[2]],              // Level 4: arrow, tiger (wet_sock, tiger)
      [b[1], b[2], b[3]],        // Level 5: heart, tiger, sereno (introducir sereno)
      [b[0], b[1], b[2]],        // Level 6: arrow, heart, tiger
      [b[1], b[2], b[3]],        // Level 7: heart, tiger, sereno
      [b[0], b[2], b[3]],        // Level 8: arrow, tiger, sereno
      [b[0], b[1], b[3]],        // Level 9: arrow, heart, sereno
      [b[0], b[1], b[2], b[3]],  // Level 10+: todos los bullets
    ]

    console.log('Current level:', this.level, 'Available bullets:', posibleWallet[this.level])
    return posibleWallet
  }

  updateEnemyDifficult () {
    let ARROWS = [
      [
        {speed: 2.5, q: 1, lifetime: 150 },

        {speed: 2.6, q: 1, lifetime: 148 },
        {speed: 2.7, q: 1, lifetime: 146 },
        {speed: 2.8, q: 1, lifetime: 144 },
        {speed: 2.9, q: 1, lifetime: 142 },
        {speed: 3.0, q: 1, lifetime: 140 },

        {speed: 3.1, q: 1, lifetime: 138 },
        {speed: 3.2, q: 1, lifetime: 136 },
        {speed: 3.3, q: 1, lifetime: 134 },
        {speed: 3.4, q: 1, lifetime: 132 },
        {speed: 3.5, q: 1, lifetime: 130 },
      ],
      [
        {speed: 9, q: 1, lifetime: 75 },

        {speed: 9.2, q: 1, lifetime: 75 },
        {speed: 9.6, q: 1, lifetime: 75 },
        {speed: 10, q: 1, lifetime: 75 },
        {speed: 10.4, q: 1, lifetime: 75 },
        {speed: 10.8, q: 1, lifetime: 75 },

        {speed: 11.0, q: 1, lifetime: 75 },
        {speed: 11.0, q: 1, lifetime: 75 },
        {speed: 11.3, q: 1, lifetime: 75 },
        {speed: 11.6, q: 1, lifetime: 75 },
        {speed: 11.6, q: 1, lifetime: 75 },
      ],
      [
        {speed: 9, q: 0, lifetime: 90 },

        {speed: 9.2, q: 0, lifetime: 90 },
        {speed: 9.6, q: 0, lifetime: 90 },
        {speed: 10, q: 0, lifetime: 90 },
        {speed: 10.4, q: 0, lifetime: 90 },
        {speed: 10.8, q: 0, lifetime: 90 },

        {speed: 11.0, q: 0, lifetime: 90 },
        {speed: 11.0, q: 0, lifetime: 90 },
        {speed: 11.3, q: 0, lifetime: 90 },
        {speed: 11.6, q: 0, lifetime: 90 },
        {speed: 11.6, q: 1, lifetime: 90 },
      ],
      [
        {speed: 9, q: 0, lifetime: 90 },

        {speed: 9.2, q: 0, lifetime: 90 },
        {speed: 9.6, q: 0, lifetime: 90 },
        {speed: 10, q: 0, lifetime: 90 },
        {speed: 10.4, q: 0, lifetime: 90 },
        {speed: 10.8, q: 0, lifetime: 90 },

        {speed: 11.0, q: 0, lifetime: 90 },
        {speed: 11.0, q: 0, lifetime: 90 },
        {speed: 11.3, q: 0, lifetime: 90 },
        {speed: 11.6, q: 0, lifetime: 90 },
        {speed: 6, q: 1, lifetime: 280 },
      ],
    ]

    let HEARTS = [
      [
        {speed: -0.5, q: 3, lifetime: 350, timeInterval: 100 },

        {speed: -0.6, q: 4, lifetime: 340, timeInterval: 100 },
        {speed: -0.7, q: 4, lifetime: 330, timeInterval: 100 },
        {speed: -0.8, q: 5, lifetime: 320, timeInterval: 100 },
        {speed: -0.9, q: 5, lifetime: 310, timeInterval: 100 },
        {speed: -1.0, q: 6, lifetime: 300, timeInterval: 100 },

        {speed: -1.1, q: 6, lifetime: 290, timeInterval: 100 },
        {speed: -1.2, q: 7, lifetime: 280, timeInterval: 100 },
        {speed: -1.3, q: 8, lifetime: 270, timeInterval: 100 },
        {speed: -1.4, q: 8, lifetime: 260, timeInterval: 100 },
        {speed: -1.5, q: 9, lifetime: 250, timeInterval: 100 },
      ],
      [
        {speed: -1.0, q: 3, lifetime: 280, timeInterval: 100 },

        {speed: -1.2, q: 4, lifetime: 270, timeInterval: 100 },
        {speed: -1.4, q: 4, lifetime: 260, timeInterval: 100 },
        {speed: -1.6, q: 5, lifetime: 250, timeInterval: 100 },
        {speed: -1.8, q: 5, lifetime: 240, timeInterval: 100 },
        {speed: -2.0, q: 6, lifetime: 230, timeInterval: 100 },

        {speed: -2.2, q: 6, lifetime: 220, timeInterval: 100 },
        {speed: -2.4, q: 7, lifetime: 210, timeInterval: 100 },
        {speed: -2.6, q: 7, lifetime: 200, timeInterval: 100 },
        {speed: -2.8, q: 8, lifetime: 190, timeInterval: 100 },
        {speed: -3.0, q: 8, lifetime: 180, timeInterval: 100 },
      ],
      [
        {speed: -2.5, q: 5, lifetime: 280, timeInterval: 100 },

        {speed: -2.7, q: 6, lifetime: 270, timeInterval: 100 },
        {speed: -2.9, q: 6, lifetime: 260, timeInterval: 100 },
        {speed: -3.1, q: 7, lifetime: 250, timeInterval: 100 },
        {speed: -3.3, q: 7, lifetime: 240, timeInterval: 100 },
        {speed: -3.5, q: 8, lifetime: 230, timeInterval: 100 },

        {speed: -3.7, q: 8, lifetime: 220, timeInterval: 100 },
        {speed: -3.9, q: 9, lifetime: 210, timeInterval: 100 },
        {speed: -4.1, q: 9, lifetime: 200, timeInterval: 100 },
        {speed: -4.3, q: 10, lifetime: 190, timeInterval: 100 },
        {speed: -4.5, q: 10, lifetime: 180, timeInterval: 100 },
      ],
      [
        {speed:  1, q: 10, lifetime: 340 },

        {speed:  0, q: 11, lifetime: 340 },
        {speed:  -1, q: 12, lifetime: 340 },
        {speed:  -1.1, q: 13, lifetime: 340 },
        {speed:  -1.2, q: 14, lifetime: 340 },
        {speed:  -1.3, q: 15, lifetime: 340 },

        {speed:  -1.4, q: 16, lifetime: 340 },
        {speed:  -1.5, q: 17, lifetime: 340 },
        {speed:  -1.6, q: 18, lifetime: 340 },
        {speed:  -1.7, q: 19, lifetime: 340 },
        {speed:  -1.8, q: 20, lifetime: 340 },

      ],
    ]

    let TIGERS = [
      [
        {speed: 1.8, q: 0, angle: 40, lifetime: 450,  timeInterval: 1800 },

        {speed: 1.9, q: 0, angle: 40, lifetime: 440,  timeInterval: 1750 },
        {speed: 2.0, q: 0, angle: 40, lifetime: 430,  timeInterval: 1700 },
        {speed: 2.1, q: 0, angle: 40, lifetime: 420,  timeInterval: 1650 },
        {speed: 2.2, q: 0, angle: 40, lifetime: 410,  timeInterval: 1600 },
        {speed: 2.3, q: 0, angle: 40, lifetime: 400,  timeInterval: 1550 },

        {speed: 2.4, q: 0, angle: 40, lifetime: 390,  timeInterval: 1500 },
        {speed: 2.5, q: 0, angle: 40, lifetime: 380,  timeInterval: 1450 },
        {speed: 2.6, q: 0, angle: 40, lifetime: 370,  timeInterval: 1400 },
        {speed: 2.7, q: 1, angle: 40, lifetime: 360,  timeInterval: 1350 },
        {speed: 2.8, q: 1, angle: 40, lifetime: 350,  timeInterval: 1300 },
      ],
      [
        {speed: 7, q: 6, angle: 40, lifetime: 140,  timeInterval: 500 },

        {speed: 7, q: 6, angle: 40, lifetime: 140,  timeInterval: 500 },
        {speed: 7, q: 6, angle: 40, lifetime: 139,  timeInterval: 500 },
        {speed: 7, q: 6, angle: 40, lifetime: 138,  timeInterval: 500 },
        {speed: 7.3, q: 7, angle: 40, lifetime: 137,  timeInterval: 500 },
        {speed: 7.6, q: 7, angle: 40, lifetime: 136,  timeInterval: 500 },

        {speed: 8, q: 7, angle: 40, lifetime: 135,  timeInterval: 700 },
        {speed: 8.3, q: 8, angle: 40, lifetime: 134,  timeInterval: 700 },
        {speed: 8.7, q: 8, angle: 40, lifetime: 133,  timeInterval: 650 },
        {speed: 9.4, q: 8, angle: 40, lifetime: 132,  timeInterval: 650 },
        {speed: 10, q: 8, angle: 40, lifetime: 131,  timeInterval: 600 },
      ],
      [
        {speed: 7, q: 6, angle: 40, lifetime: 140,  timeInterval: 500 },

        {speed: 7, q: 6, angle: 40, lifetime: 140,  timeInterval: 500 },
        {speed: 7, q: 6, angle: 40, lifetime: 139,  timeInterval: 500 },
        {speed: 7, q: 6, angle: 40, lifetime: 138,  timeInterval: 500 },
        {speed: 7.3, q: 7, angle: 40, lifetime: 137,  timeInterval: 500 },
        {speed: 7.6, q: 7, angle: 40, lifetime: 136,  timeInterval: 500 },

        {speed: 8, q: 7, angle: 40, lifetime: 135,  timeInterval: 700 },
        {speed: 8.3, q: 8, angle: 40, lifetime: 134,  timeInterval: 700 },
        {speed: 8.7, q: 8, angle: 40, lifetime: 133,  timeInterval: 650 },
        {speed: 9.4, q: 8, angle: 40, lifetime: 132,  timeInterval: 650 },
        {speed: 10, q: 8, angle: 40, lifetime: 131,  timeInterval: 600 },
      ],
      [
        {speed: 8, q: 0, angle: 40, lifetime: 220,  timeInterval: 900 },

        {speed: 8, q: 0, angle: 40, lifetime: 220,  timeInterval: 1000 },
        {speed: 8, q: 0, angle: 40, lifetime: 220,  timeInterval: 1000 },
        {speed: 8, q: 0, angle: 40, lifetime: 220,  timeInterval: 1000 },
        {speed: 8, q: 0, angle: 40, lifetime: 220,  timeInterval: 1000 },
        {speed: 8, q: 0, angle: 40, lifetime: 220,  timeInterval: 1000 },

        {speed: 8, q: 0, angle: 40, lifetime: 220,  timeInterval: 1000 },
        {speed: 8, q: 0, angle: 40, lifetime: 220,  timeInterval: 1000 },
        {speed: 8, q: 0, angle: 40, lifetime: 220,  timeInterval: 1000 },
        {speed: 8, q: 1, angle: 40, lifetime: 220,  timeInterval: 1000 },
        {speed: 8, q: 1, angle: 40, lifetime: 220,  timeInterval: 1000 },
      ],
    ]

    let SERENOS = [
      [
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },

        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },

        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
      ],
      [
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },

        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },

        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 8, q: 1, angle: 0, lifetime: 400,  timeInterval: 850 },
      ],
      [
        {speed: 8, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },

        {speed: 9, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 10, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 11, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 12, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 13, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },

        {speed: 13, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 13, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 13, q: 0, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 13, q: 1, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 13, q: 2, angle: 0, lifetime: 400,  timeInterval: 850 },
      ],
      [
        {speed: 9, q: 3, angle: 0, lifetime: 400,  timeInterval: 850 },

        {speed: 9, q: 3, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 9, q: 4, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 9.3, q: 4, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 9.6, q: 5, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 10, q: 5, angle: 0, lifetime: 400,  timeInterval: 850 },

        {speed: 10, q: 6, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 10, q: 6, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 10.5, q: 6, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 10.5, q: 7, angle: 0, lifetime: 400,  timeInterval: 850 },
        {speed: 11, q: 7, angle: 0, lifetime: 400,  timeInterval: 850 },
      ],
    ]
    
    // Ensure we don't access out of bounds arrays
    let maxLevel = Math.min(this.level, HEARTS.length - 1)
    let maxWave = Math.min(this.wave, HEARTS[maxLevel].length - 1)

    // Get configurations for all bullet types
    let configurations = {
      arrow: ARROWS[maxLevel][maxWave],
      heart: HEARTS[maxLevel][maxWave],
      tiger: TIGERS[maxLevel][maxWave],
      sereno: SERENOS[maxLevel][maxWave]
    }

    // Create armyReady - temporarily using all types to debug
    let armyReady = {
      normal: configurations.arrow,
      heart: configurations.heart,
      tiger: configurations.tiger,
      sereno: configurations.sereno
    }

    console.log('Current sequence:', this.actualPhase)
    console.log('Army ready (all types):', armyReady)

    this.enemy.armShip(armyReady)

  }

  upLevel () {
    this.actualPhasePlace = 0
    this.subLevel++

    if (this.subLevel % 3 === 0 ) {
      this.wave = 0
      this.actualSequence = this.waveSequence[this.wave]
      this.level++
      console.log('🎉 LEVEL UP! New level:', this.level, 'SubLevel:', this.subLevel)

      this.buildSequence()

    } else {
      this.wave++
      this.actualSequence = this.waveSequence[this.wave]
      console.log('Wave progress:', this.wave, 'SubLevel:', this.subLevel)

      this.setActualSequence(this.actualSequence, (actual) => {
      })
    }
  }

  check (collisionedObject) {
    this.actualSequenceItem = this.actualPhase[this.actualPhasePlace]


    if (collisionedObject === this.actualSequenceItem) {

      for (let i = 0; i < this.UI[1].length; i++) {
        this.UI[1][i].noFocused()
      }

      if (this.actualPhasePlace === this.actualSequence.length - 1 ) {
        this.upLevel()
      } else {
        this.actualPhasePlace++
        this.UI[1][this.actualPhasePlace].focused()
        // Relanza bullets para continuar el juego
        this.releaseBullets()
      }
    } else {
      this.reduceTries()
    }
  }

  releaseBullets() {
    // Recrear los bullets con la configuración actual
    this.updateEnemyDifficult()
  }

  getSequence () {
    return this.SEQUENCE_LIST[this.level]
  }
}

export default ScoreEngine