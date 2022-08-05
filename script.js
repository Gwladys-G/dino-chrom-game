import { setupGround, updateGround } from './ground.js'
import { setUpDino, updateDino } from './dino.js'
import { setUpCactus, updateCactus } from './cactus.js'


const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE =.00002

const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score]');
const startScreen = document.querySelector('[data-start-screen]');

setPixelToWorldScale()
window.addEventListener("resize",setPixelToWorldScale)
document.addEventListener("keydown", handleStart, {once: true})


let lastTime
let speedScale
let score = 0

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime
  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)

  lastTime = time
  window.requestAnimationFrame(update)
}

function updateScore(delta){
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

function updateSpeedScale(delta){
  speedScale += delta * SPEED_SCALE_INCREASE
}

function handleStart(){
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setUpDino()
  setUpCactus()
  startScreen.classList.add("hide")
  window.requestAnimationFrame(update)
}

function setPixelToWorldScale(){
  let worldToPixelScale
  if(window.innerWidth/window.innerHeight < WORLD_WIDTH/WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    setPixelToWorldScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}
