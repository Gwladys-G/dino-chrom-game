import { getCustomeProperty, incrementCustomProperty, setCustomProperty } from './updateCustomProperty.js'

const dinoElem = document.querySelector('[data-dino]')
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

export function setUpDino(){
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}


export function updateDino(delta, speedScale){
  handleRun(delta, speedScale)
  handleJump(delta)
}

function handleRun(delta, speedScale) {
  if (isJumping){
    dinoElem.src = "imgs/dino-stationary.png"
    console.log('jumping from handle run');
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }


  currentFrameTime += delta * speedScale

}


function handleJump(delta) {
  if (!isJumping) return
  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)


  if ( getCustomeProperty(dinoElem,"--bottom") <= 0){
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e){
  console.log('jumped');
  if (e.code != "Space" || isJumping) return
  console.log('its space bar');
  yVelocity = JUMP_SPEED
  isJumping = true
}
