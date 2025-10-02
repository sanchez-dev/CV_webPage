import Bullets from './bullets.js'

class Ship {
  constructor ( directionPointX, directionPointY, images, screenFactor ) {
    this.directionPointX = directionPointX
    this.directionPointY = directionPointY

    this.originalSize = 160

    this.size = this.originalSize * screenFactor
    this.collisionSize = this.size * 0.60

    this.shape = {}
    this.direction = this.faceTo()
    this.x = window.mouseX || - 100
    this.y = window.mouseY || - 100

    this.shipImage = images.ship
    this.bulletImages = images.bullets

    this.arsenal = {
      normal: {
        img: this.bulletImages.normal.img,
        death: this.bulletImages.normal.death,
        deathTime: 20,
        type: 'normal'
      }
    }

    this.bulletLaunch = true

    this.normalBullets = []
  }

  resize (enemyX, enemyY, screenFactor) {
    this.size = this.originalSize * screenFactor
    // this.directionPointX = enemyX
    // this.directionPointX = enemyY
  }


  faceTo () {
    let angle = Math.atan2(this.directionPointY - this.y, this.directionPointX - this.x) + (Math.PI / 2)
    return angle
  }

  update() {
    this.x = window.mouseX || 0
    this.y = window.mouseY || 0
  }
}

export default Ship