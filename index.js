const sound = new Audio('sound.mp3')
const music = new Audio('music.mp3')
const fire = new Audio('fire.mp3')
music.loop = true
fire.loop = true

let intervalID = null
const relaxTime = 600
let isWorking = true

const durationMessage = document.querySelector('.js-duration')
const startButton = document.querySelector('.js-start-button')
const resetButton = document.querySelector('.js-reset-button')
const confirmButton = document.querySelector('.js-confirm-button')
const thirtyButton = document.querySelector('.js-thirty-button')
const sixtyButton = document.querySelector('.js-sixty-button')
const twoHoursButton = document.querySelector('.js-two-hours-button')
const stateMessage = document.querySelector('.js-state-message')
const alarmMessage = document.querySelector('.js-alarm')

let initialDuration = 1800
getInitDuration()
displayDuration(duration)
document.body.style.backgroundColor = 'rgb(96, 129, 122)'

/*
---
*/

startButton.addEventListener('click', startPause)
resetButton.addEventListener('click', reset)
confirmButton.addEventListener('click', inputConfirm)
thirtyButton.addEventListener('click', () => {
  setDuration(1800)
})
sixtyButton.addEventListener('click', () => {
  setDuration(3600)
})
twoHoursButton.addEventListener('click', () => {
  setDuration(7200)
})

/*
---
*/

function startPause() {
  if(!intervalID) {
    run()
    startButton.innerHTML = 'pause'
  } else {
    stopRun()
    startButton.innerHTML = 'continue'
  }
}

function getInitDuration() {
  duration = initialDuration
}

function displayDuration() {
  let hour = Math.floor(duration / 3600)
  let minite = Math.floor(duration % 3600 /60)
  let second = (duration % 60).toString().padStart(2, '0')
  if (hour == 0) {
    durationMessage.innerHTML = `${minite}:${second}`
  } else {
    minite = minite.toString().padStart(2, '0')
    durationMessage.innerHTML = `${hour}:${minite}:${second}`
  }
}

function run() {
  if (isWorking) {
    fire.play()
  } else {
    music.play()
  }
  intervalID = setInterval(() => {
    duration--
    displayDuration()
    if (duration == 0) {
      changeState()
      run()
    }
  }, 1000)
}

function stopRun() {
  clearInterval(intervalID)
  intervalID = null
  pauseMusic()
}

function reset() {
  stopRun()
  pauseMusic()
  music.currentTime = 0
  if (isWorking) {
    getInitDuration()
  } else {
    duration = relaxTime
  }
  displayDuration()
  startButton.innerHTML = 'start'
}

function inputConfirm() {
  stopRun()
  pauseMusic()
  music.currentTime = 0
  const inputElement = document.querySelector('.js-input-duration')
  inputValue = Number(inputElement.value)
  if (!isNaN(inputValue) && inputValue > 0) {
      initialDuration = inputValue * 60
      getInitDuration()
      displayDuration()
      startButton.innerHTML = 'start'
  }
  inputElement.value = ''
}

function setDuration(minites) {
  stopRun()
  initialDuration = minites
  getInitDuration()
  displayDuration()
  startButton.innerHTML = 'start'
}

function changeState() {
  clearInterval(intervalID)
  if (isWorking) {
    duration = relaxTime
    displayDuration()
    isWorking = false
    stateMessage.innerHTML = '-relaxing-'
    fire.pause()
    sound.play()
    music.play()
    document.body.style.backgroundColor = 'rgb(134, 130, 156)'
  } else {
    getInitDuration()
    displayDuration()
    isWorking = true
    stateMessage.innerHTML = '-working-'
    music.pause()
    music.currentTime = 0
    sound.play()
    fire.play()
    document.body.style.backgroundColor = 'rgb(96, 129, 122)'
  }
}

function pauseMusic() {
    fire.pause()
    music.pause()
}