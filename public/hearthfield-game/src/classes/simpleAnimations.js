'use strict'

class Animation { 
  constructor (object) {
    let animationSettings = object.settings
    this.img = object.img

    this.type = animationSettings.type

    this.size = object.size

    this.repeat = animationSettings.repeat || 0
    this.yoyo = animationSettings.yoyo || false

    this.animationTime = animationSettings.duration || 1
    this.motionCurve = animationSettings.motionCurve || false

    this.on = object.on
    
    this.originalX = object.x
    this.originalY = object.y

    try {
      this[`init_${animationSettings.type}`](object)
    } catch (e) {
      console.log(e)
    }

  }
  
  // init common thins in an animation
  init () {
    this.timeline = 0
    this.on = true
    this.x = this.originalX
    this.y = this.originalY

    const now = Date.now();
    this.then = new Date(now + this.animationTime * 1000);
    this.timeCalc = this.then - now
    this.allTimelineMilliseconds = (this.timeCalc * 60 / 1000)
    this.fraction = Math.round(1 * 100 / this.allTimelineMilliseconds)
  }
  
  // init animation type move
  init_move (object) {
    this.init()
    
    this.startPoint = {
      x : this.originalX,
      y : this.originalY
    }

    this.endPoint = object.settings.endPos
    this.distanceX = this.endPoint.x - this.startPoint.x
    this.distanceY = this.startPoint.y - this.endPoint.y

    // linear
    if (!this.motionCurve) {
      this.speedX = this.distanceX / this.allTimelineMilliseconds
      this.speedY = this.distanceY / this.allTimelineMilliseconds
    } else {
      this.speedCurveGenerator()
    }
  }

  speedCurveGenerator () {
    let fraction = 1 * 100 / this.allTimelineMilliseconds
    this.arrayOfSpeeds = []

    for (let i = 0; i < this.motionCurve.length; i++) {
      let percentTime = Object.keys(this.motionCurve[i])[0]
      let speed = this.motionCurve[i][percentTime]

      let nextPercentTime = i < this.motionCurve.length - 1 ? Object.keys(this.motionCurve[i+1])[0] : 0
      let nextSpeed = i < this.motionCurve.length - 1 ? this.motionCurve[i+1][nextPercentTime] : 0

      let steps = percentTime - nextPercentTime

      let spaceXFraction = this.distanceX * (steps * 0.01)
      let spaceYFraction = this.distanceY * (steps * 0.01)

      let timeFraction = this.allTimelineMilliseconds * (steps * 0.01)

      let speedPercent = speed * 0.01

      let initialXSpeed = (spaceXFraction / timeFraction)
      let initialYSpeed = (spaceYFraction / timeFraction) 

      let speedUnity = ((nextSpeed - speed) / steps) * 0.01

      
      for (let y = 0; y < steps; y++) {
        let smoothPercent = speedPercent + (speedUnity * y)
        
        let smoothSpeedX = initialXSpeed * smoothPercent
        let smoothSpeedY = initialYSpeed * smoothPercent

        let speedPerPercent = {
          x : smoothSpeedX,
          y : smoothSpeedY
        }

        this.arrayOfSpeeds.push(speedPerPercent)
      }
    }
    
  }
  
  stop () {
    this.on = false
  }
  
  reload () {
    this.init()
  }

  move (lapse) {
    let myLTime = lapse * 59 / 1000
    let percent = Math.round(myLTime * 100 / this.allTimelineMilliseconds)

    if (this.motionCurve) {
      this.x += this.arrayOfSpeeds[(this.arrayOfSpeeds.length - 1) - percent].x
      this.y += this.arrayOfSpeeds[(this.arrayOfSpeeds.length - 1) - percent].y
    } else {
      this.x += this.speedX
      this.y += this.speedY
    }
  }

  animate (lapse) {
    // Look for an animation type
    try {
      this[this.type](lapse)
    } catch (e) {
      console.log(e)
    }

  }
  
  animationFinished () {
    // if the animation need to be repeated
    if (this.repeat === false) {
      this.stop()
    } else {
        if (this.repeat === true) {
          this.reload()
        } else {
          if (this.repeat > 0) {
            this.repeat -= 1
          } else {
            this.stop()
          }
        }
    }
  }
  // Calc next positions on animation
  update () {
    let lapse = this.then - Date.now()
    if ( lapse < 0){
      this.animationFinished()
    } else {
      this.animate(lapse)
    }
  }
}


export default Animation