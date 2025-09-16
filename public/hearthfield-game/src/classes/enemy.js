import Bullets from './bullets.js'

class Enemy {
  constructor ( centerX, centerY, images, size, screenResize ) {
    this.bulletImages = images.bullets

    this.arsenal = {
      arrow: {
        difficulty: 0,
        img: this.bulletImages.arrow.img,
        death: this.bulletImages.arrow.death,
        deathTime: 12,
        minSpeed: 8,
        type: 'arrow'
      },
      heart: {
        difficulty: 1,
        img: this.bulletImages.heart.img,
        death: this.bulletImages.heart.death,
        deathTime: 16,
        minSpeed: 4,
        type: 'heart'
      },
      tiger: {
        difficulty: 2,
        img: this.bulletImages.tiger.img,
        death: this.bulletImages.tiger.death,
        deathTime: 14,
        minSpeed: 8,
        type: 'tiger'
      },
      sereno: {
        difficulty: 3,
        img: this.bulletImages.sereno.img,
        death: this.bulletImages.sereno.death,
        deathTime: 24,
        minSpeed: 8,
        type: 'sereno'
      },
    }

    // some bullets like tigge or serenos need max Width & height
    this.fieldWidth = centerX * 2
    this.fieldHeight = centerX * 2

    this.img = images.enemyFace

    this.heartBulletsQ = 10
    this.tigerBullets = 6

    this.bullets = []

    this.bulletLaunch = true
    this.waiting = false

    this.screenResize = screenResize

    this.size = size
    this.collisionSize = size - 36

      
    this.x = centerX
    this.y = centerY
  }

  faceTo (x = 1, y = 1) {
    let angle = Math.atan2(y - (this.y - ((this.size.h - 200) * this.screenResize)), x - this.x * this.screenResize) + (Math.PI / 2)
    return angle
  }

  resize (newWidth, newHeight, newScreenResize) { 
    this.screenResize = newScreenResize
  }

  angleToRad (deg) {
    return ((2 * Math.PI) / 360) * deg
  }

  bulletSequenceConstructor( bulletSet ) {
    this.bullets = []

    // Create all bullet types (reverting temporarily for debugging)
    this.bullets = [
      ...this.armNormal(bulletSet.normal || {speed: 0, q: 0, lifetime: 0}),
      ...this.armHearts(bulletSet.heart || {speed: 0, q: 0, lifetime: 0}),
      ...this.armTigers(bulletSet.tiger || {speed: 0, q: 0, lifetime: 0}),
      ...this.armSerenos(bulletSet.sereno || {speed: 0, q: 0, lifetime: 0})
    ]

    console.log('Enemy bullets created:', this.bullets.length, 'bullets')
    console.log('BulletSet received:', bulletSet)
  }
  // arrow
  armNormal ( {speed, lifetime, q, timeInterval} ) {
    let normalsWallet = []

    if ( q != 0) {
      let angle = 45
      let normalAngle = this.angleToRad(angle)

      for (let i = 1; i <= q; i++) {
        normalsWallet.push(new Bullets(this.arsenal.arrow, this, normalAngle, null, null, lifetime, speed, i, q, this.screenResize))
      }

    }
    
    return normalsWallet
  }
  // hearts
  armHearts ( {speed, q, lifetime, timeInterval}) {
    let angle = 0
    let spaces = (2 * Math.PI) / q
    let heartsWallet = []

    if (q != 0) {
      for (let i = 1; i <= q; i++) {
        heartsWallet.push(new Bullets(this.arsenal.heart, this, angle, null, null, lifetime, speed, null, null, this.screenResize))
        angle = spaces * i
      }
    }

    console.log('Hearts created:', heartsWallet.length, 'speed:', speed, 'q:', q)
    return heartsWallet
  }
  // tigers
  armTigers ({speed, q, angle, lifetime}) {
    let tigerWallet = []
    let fixAngle = this.angleToRad(angle)

    for (let i = 1; i <= q; i++) {
      tigerWallet.push(new Bullets(this.arsenal.tiger, this, fixAngle, this.fieldWidth, this.fieldHeight, lifetime, speed, i, q, this.screenResize ))
    }

    return tigerWallet
  }

  // Serenos
  armSerenos ({speed, q, angle, lifetime}) {  
    let serenosWallet = []
    let serenoAngle = this.angleToRad(angle)

    for (let i = 0; i < q; i++) {
      serenosWallet.push(new Bullets(this.arsenal.sereno, this, serenoAngle, this.fieldWidth, this.fieldHeight, lifetime, speed, i, q, this.screenResize))
    }

    return serenosWallet
  }

  armShip( bulletSet ) {
    this.bulletSequenceConstructor( bulletSet )
  }

  relaunch(delay) {
    this.bulletLaunch = false
    let _this = this

    if (!this.waiting) {
      this.waiting = true

      setTimeout(() => {
        _this.bulletLaunch = true
        _this.waiting = false
      }, delay * 10);
      return true
    }
    return false
  }
}

export default Enemy