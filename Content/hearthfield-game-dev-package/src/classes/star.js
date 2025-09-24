class Star {
  constructor ( minSize, maxSize, maxW, maxH, depth = 5, image) {
    this.maxW = maxW
    this.maxH = maxH
    this.x = this.randomStart(maxW)
    this.y = this.randomStart(maxH)
    this.size = (Math.random() * maxSize) + minSize
    this.direction = 0;
    this.image = image
  }

  randomStart (maxValue) {
    return Math.random() * maxValue
  }

  updateMaxSize (newMaxW, newMaxH, percent) {
    this.maxW = newMaxW
    this.maxH = newMaxH
    this.size = this.size * percent
  }

  update(speed, direction) {
    this.y = this.y + (speed + this.size / 32) * Math.sin(direction )
    this.x = this.x + (speed + this.size / 32) * Math.cos(direction )
    if (this.y > this.maxH) { 
      this.y = - this.size + this.randomStart(100)
      this.x = this.randomStart(this.maxW)
    } 
  }
}

export default Star