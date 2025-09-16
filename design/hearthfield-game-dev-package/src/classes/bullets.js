class Bullets {
  constructor (bullet, ship, angle, maxW, maxH, lifetime, speed, timeInterval, q, screenResize) {
    const TYPES = {
      "normal" : {
        speed: 8,
        size: 64,
        collisionSize: 64,
        force: 2,
        livedTime: 0,
        timeOfLife: 120,
        deathTime: bullet.deathTime,
        dyingTime: 0,
        delay: 1,
        eq: function (bullet) {
          bullet.livedTime += bullet.delay

          if (bullet.alive) {
            bullet.distance = bullet.distance + bullet.speed
            bullet.x = bullet.startX + ( Math.cos(bullet.angle - (Math.PI / 2)) * bullet.distance)
            bullet.y = bullet.startY + ( Math.sin(bullet.angle - (Math.PI / 2)) * bullet.distance)
          } else {
            bullet.dyingTime++
            if ( bullet.dyingTime >= bullet.deathTime) {
              bullet.x = -200
              bullet.y = -200
            }
          }
          
          if (bullet.livedTime >= bullet.timeOfLife) {
            bullet.reload()
          }

        },

        reload: function (bullet) {
          bullet.livedTime = 0
          bullet.startX = bullet.ship.x
          bullet.startY = bullet.ship.y
          bullet.angle = bullet.ship.faceTo()
          bullet.distance = 0;
          bullet.alive = true
          bullet.img = bullet.live
          bullet.dyingTime = 0
        }
      },
      "arrow" : {
        speed : speed,
        size: 128,
        collisionSize: 64,
        force: 2,
        livedTime: 0,
        timeOfLife: lifetime,
        deathTime: bullet.deathTime,
        dyingTime: 0,
        delay: 1,
        direction: 0,
        started: false,
        eq: function (bullet) {
          bullet.livedTime += bullet.delay
          bullet.distance = bullet.distance + bullet.speed
          
          if (bullet.alive) {
            bullet.x = bullet.startX + (( Math.cos(bullet.angle - (Math.PI / 2)) * bullet.distance))
            bullet.y = bullet.startY + (( Math.sin(bullet.angle - (Math.PI / 2)) * bullet.distance))
            
          } else {
            if (!bullet.falling) {
              bullet.falling = true
              bullet.fallingPos = {x : bullet.x, y: bullet.y}
              bullet.distance = 0
            }

            bullet.x = bullet.fallingPos.x + ( Math.cos((-1 * bullet.angle) - (Math.PI / 2)) * bullet.distance / 4)
            bullet.y = bullet.fallingPos.y + bullet.distance * 1.6
          }
          
          if (bullet.livedTime >= bullet.timeOfLife) {
            bullet.reload()
          }

        },
        reload: function (bullet) {
          bullet.livedTime = 0
          bullet.distance = 0;
          bullet.startX = (bullet.ship.x) * bullet.screenResize
          bullet.startY = bullet.ship.y - ((this.ship.size.h - 200) * bullet.screenResize)
          bullet.angle = bullet.ship.faceTo(window.mouseX, window.mouseY)
          bullet.alive = true
          bullet.img = bullet.live
          bullet.dyingTime = 0
          bullet.falling = false
        }
      },
      "heart" : {
        speed : speed - 3,
        originalSpeed : speed - 3,
        size: 128,
        force: 2,
        livedTime: 0,
        timeOfLife: lifetime,
        collisionSize: 128,
        deathTime: bullet.deathTime,
        dyingTime: 0,
        delay: 1,
        direction: 0,
        eq: function (bullet) {
          bullet.livedTime += bullet.delay
          bullet.distance += bullet.speed + ( 3 * Math.sin(bullet.angleToRad(bullet.livedTime * 16 )))

          if (bullet.alive) {
            bullet.x = bullet.startX + ( Math.cos(bullet.angle - (Math.PI / 2)) * bullet.distance)
            bullet.y = bullet.startY + ( Math.sin(bullet.angle - (Math.PI / 2)) * bullet.distance)
          } else {
            bullet.dyingTime++
            bullet.fallingPos = {x : bullet.x, y: bullet.y}
            bullet.distance = 0

            if ( bullet.dyingTime >= bullet.deathTime) {
              bullet.x = -200
              bullet.y = -200
            }
          }

          if (bullet.livedTime >= bullet.timeOfLife) {
            bullet.reload()
          }

        },
        reload: function (bullet) {
          // bullet.startX = (bullet.ship.x + (this.size / 2)) * bullet.screenResize
          // bullet.startY = bullet.ship.y
          bullet.startX = bullet.ship.x * bullet.screenResize
          bullet.startY = bullet.ship.y - ((this.ship.size.h - 200) * bullet.screenResize)
          bullet.distance = 0
          bullet.waiting = false
          bullet.livedTime = 0
          bullet.img = bullet.live
          bullet.alive = true
          bullet.dyingTime = 0
          bullet.sin = 0
        }
      },
      "tiger" : {
        speed : speed + (Math.random() * 4),
        size: 128,
        force: 10,
        delay: 1,
        livedTime: 0,
        timeOfLife: lifetime + (Math.random() * lifetime),
        collisionSize: 128,
        deathTime: bullet.deathTime,
        direction: 0,
        started: false,
        eq: function (bullet) {
          bullet.livedTime += bullet.delay

          if (bullet.livedTime > bullet.position && !bullet.started) {
            bullet.reload()
            bullet.started = true
          }

          if (bullet.started) {

            bullet.distance += bullet.speed
            bullet.x = bullet.startX + (Math.cos(bullet.angle) * bullet.distance)
            bullet.y = bullet.startY + (Math.sin(bullet.angle) * bullet.distance)

            if (bullet.livedTime >= bullet.timeOfLife) {
              bullet.reload()
            }
          } else {
            bullet.x = -1000
            bullet.y = -1000
          }

        },
        reload: function (bullet) {
          if ( Math.random() * 2 <= 1) {
            bullet.startX = Math.random() * bullet.maxDistance.w
            bullet.startY = 0 - bullet.size
          } else {
            bullet.startX = 0 - bullet.size
            bullet.startY = Math.random() * bullet.maxDistance.h
          }
          bullet.dyingTime = 0
          bullet.distance = 0
          bullet.livedTime = 0
          bullet.alive = true
          bullet.img = bullet.live
        }
      },
      "sereno" : {
        speed : speed,
        size: 256,
        force: 10,
        delay: 1,
        livedTime: 0,
        timeOfLife: lifetime + (Math.random() * lifetime),
        collisionSize: 192,
        myAngle: 270,
        deathTime: bullet.deathTime,
        direction: 0,
        started : false,
        eq: function (bullet) {
          bullet.livedTime += bullet.delay
          bullet.distance += bullet.speed / 2

          if (bullet.livedTime > bullet.position && !bullet.started) {
            bullet.reload()
            bullet.started = true
          }

          if (bullet.started) {
            if (bullet.alive) {
              let rotationX = (Math.cos(bullet.angleToRad(bullet.livedTime * 2.5)) * 200) 
              let rotationY = (Math.sin(bullet.angleToRad(bullet.livedTime * 2.5)) * 200)
              bullet.x = (bullet.startX + ( Math.cos(bullet.angle + bullet.angleToRad(bullet.myAngle)) * bullet.distance)) + ( rotationX )
              bullet.y = (bullet.startY + (Math.sin(bullet.angle + bullet.angleToRad(bullet.myAngle)) * bullet.distance)) + ( rotationY )
            } else {
              bullet.dyingTime++
              bullet.fallingPos = {x : bullet.x, y: bullet.y}
              bullet.distance = 0
  
              if ( bullet.dyingTime >= bullet.deathTime) {
                bullet.x = -200
                bullet.y = -200
              }
            }
            if (bullet.livedTime >= bullet.timeOfLife) {
              bullet.reload()
            }
          } else {
            bullet.x = -1000
            bullet.y = -1000
          }
        },
        reload: function (bullet) {
          bullet.startX = Math.random() * bullet.maxDistance.w
          bullet.startY = bullet.maxDistance.h + bullet.size 
          bullet.dyingTime = 0
          bullet.distance = 0
          bullet.livedTime = 0
          bullet.alive = true
          bullet.img = bullet.live
        }
      },
      eSnake: {},
      eLaser: {}
    }
    
    this.clockSide = Math.random() * 2 > 1 ? -1 : 1
    // Define recarga
    this.alive = false
    this.reloading = false

    this.screenResize = screenResize

    // tipo de bala
    this.type = bullet.type

    this.death = bullet.death
    this.live = bullet.img

    this.img = this.live

    this.ship = ship
    this.falling = false
    this.id = 'bullet'

    // bullets with random position
    this.maxDistance = this.getMaxDistance(maxW, maxH)
    this.maxH = maxH

    this.force = TYPES[this.type].force
    this.speed = TYPES[this.type].speed
    this.originalSpeed = TYPES[this.type].speed
    this.size = TYPES[this.type].size
    this.delay = TYPES[this.type].delay
    this.eq = TYPES[this.type].eq
    this.myAngle = TYPES[this.type].myAngle
    
    this.started = TYPES[this.type].started

    this.collisionSize = TYPES[this.type].collisionSize * this.screenResize
    this.myReload = TYPES[this.type].reload

    // special move
    this.sin = TYPES[this.type].sin
    this.position = (lifetime / q) * timeInterval
    
    
    // life animation
    this.timeOfLife = TYPES[this.type].timeOfLife
    this.livedTime = TYPES[this.type].livedTime
    
    // death animation
    this.deathTime = TYPES[this.type].deathTime
    this.dyingTime = TYPES[this.type].dyingTime
    this.timeInterval = timeInterval

    
    this.x = 0
    this.y = 0

    this.distance = 0
    this.angle = angle

    // this.startX = ship.x * this.screenResize
    // this.startY = ship.y * this.screenResize

    this.reload(this)
  }

  angleToRad (deg) {
    return (Math.PI / 180) * deg
  }

  getMaxDistance (w, h) {
    let maxW = w ? w : window.innerWidth
    let maxH = h ? h : window.innerHeight

    return {
      w : maxW,
      h : maxH
    }
  }

  deathPhase() {
    this.alive = false
    this.img = this.death
  }

  update () {
    this.eq(this)
  }

  reload () {
    this.myReload(this)
  }
}

export default Bullets