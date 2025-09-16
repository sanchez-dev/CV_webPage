'use strict'
// this module create a communication (to costumer) engine

let communicationsEngine

class Communications {
  constructor (width, height, screenResize) {
    this.UIElements = {}
    this.UI = []
    this.width = width
    this.height = height
    this.screenResize = screenResize

    this.STATES = {
      start : this.startState.bind(this),
      onboarding : this.onboardingState.bind(this),
      playing : this.playingState.bind(this),
      pause : this.pauseState.bind(this),
      resize : this.resizeState.bind(this),
    }

    this.blockingBackground = {
      show: false
    }

    this.imagesCatalog = this.createImages()
    this.setState('start')
  }

  createImage (src, name, columns, rows, settings, x, y) {
    // Images to communications 
    let img = new Image()
    img.src = src

    img.columns = columns || 1
    img.rows = rows || 1

    let imgSize = {
      w: settings.w,
      h: settings.h
    }

    x = settings.x
    y = settings.y
    
    let image = {
      name: name,
      img: img,
      size: imgSize,
      x: x,
      y: y,
    }

    return image
  }
  
  createImages (){
    let messageSettings = {
      x: 1920 / 2, 
      y: this.height / 2 + (120 * this.screenResize), 
      w: 528,
      h: 290
    }

    let startMessage = this.createImage('/hearthfield-game/assets/images/click_start_final.png', 'startMessage', 5, 1, messageSettings)
    let resizeMessage = this.createImage('/hearthfield-game/assets/images/reload_message.png', 'resizeMessage', 1, 1, messageSettings)

    this.UIElements[startMessage.name] = startMessage
    this.UIElements[resizeMessage.name] = resizeMessage

  }

  setState(state) {
    let newState = state || 'start'
    this.STATES[newState]()
  }

  newBlockingBackground (color, closer) {
    this.blockingBackground = {
      color
    }

    this.blockingBackground.show = true

    if (closer) {
    }
  }

  resize(width, height, percent) {
    this.width = width
    this.height = height
  
    // for ( let i = 0; i < this.UI.length; i++) {
    //   this.UI[i].setSize(percent)
    // }
  }

  resizeState() {
    this.state = 'resize'
    let color = '#0D1F2D'
    this.UI = []
    this.UI.push(this.UIElements['resizeMessage'])
    this.newBlockingBackground(color)

  }
  
  startState() {
    console.log('start')
    this.state = 'start'
    this.UI = []
    // Removed startMessage - game starts automatically now
  }
  
  playingState() {
    console.log('playing')
    this.state = 'playing'
    this.UI = []
  }
  
  onboardingState() {
    console.log('onboarding')
    this.state = 'onboarding'
    this.UI = []
  }
  
  pauseState() {
    this.state = 'pause'
    this.UI = []
  }
  
  toDraw () {
    return this.UI
  }
}

function create (width, height, resize) {
  communicationsEngine = new Communications(width, height, resize)
  return communicationsEngine
}

export default {
  create,
  communicationsEngine
}