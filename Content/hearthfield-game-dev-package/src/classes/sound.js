class Sound {
  constructor (src, volume, q) {
    this.sounds = []

    for (let i = 0; i < q; i++) {
      let sound = {}
      let route = src.replace(/([#])./g, `${i}.`)

      sound = document.createElement('audio')
      sound.src = route
      sound.volume = volume
      sound.setAttribute('preload', 'auto')
      sound.setAttribute('controls', 'none')
      sound.style.display = 'none'
      
      this.sounds.push(sound)
      document.body.appendChild(sound);
    }
  }
  
  play () {

    if (this.sounds[0].paused) {
      this.sounds[0].play();
    } else {
        this.sounds[1].play()
        this.sounds[0].pause();
        this.sounds[0].currentTime = 0
    }
  }
  stop (){
    this.sound.pause();
  }
}



export default Sound