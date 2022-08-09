import { setupGround, updateGround } from './ground.js'
import { setUpDino, updateDino, getDinoRect, setDinoLose, dinoElem } from './dino.js'
import { setUpCactus, updateCactus, getCactusRecs } from './cactus.js'
import { setUpMeteor, updateMeteor, getMeteorRecs } from './meteor.js'


const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE =.00002

const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score]');
const startScreen = document.querySelector('[data-start-screen]');
const gameMode = document.querySelector("input[name=mode]");
const gameSettings = document.getElementById("settings")
const gameWheel = document.getElementById("wheel")
const closeCross = document.getElementById("closeSettings")

const borderMode = document.querySelector("input[name=borderMode]");
const toggleCactus = document.querySelector("input[name=obsCactus]");
const toggleMeteor = document.querySelector("input[name=obsMeteor]");
const updatedGravity = document.querySelector("input[name=gravity]");


updatedGravity.addEventListener("change", (e) => { updateGravity(e)} )

function updateGravity(e){
  gravityUpdate = e.target.value
}

setPixelToWorldScale()
window.addEventListener("resize",setPixelToWorldScale)
document.addEventListener("keydown", handleStart, {once: true})

gameWheel.addEventListener('click', showSettings)
closeCross.addEventListener('click', closeSettings)

let lastTime
let speedScale
let score = 0
export let isEasy = borderMode.checked
let gravityUpdate = 0.0015

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime
  updateGround(delta, speedScale)
  updateDino(delta, speedScale,gravityUpdate)
  if (toggleCactus.checked) updateCactus(delta, speedScale)
  if (toggleMeteor.checked) updateMeteor(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  if (checkLose()) return handleLose()


  lastTime = time
  window.requestAnimationFrame(update)
}

function updateScore(delta){
  score += delta * 0.01
  scoreElem.textContent = `--   ${Math.floor(score)}   --`
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
  checkSettings()
  setUpMeteor()
  startScreen.classList.add("hide")
  gameWheel.classList.add("hide")
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

function checkLose(){
  const dinoRect = getDinoRect()
  return(
    getCactusRecs().some(rect =>
      isCollision (rect, dinoRect)
    ) ||
    getMeteorRecs().some(rect =>
      isCollision (rect, dinoRect)
    )
  )

}

function isCollision(rect1, Rect2){
  return(
    rect1.left < Rect2.right &&
    rect1.top < Rect2.bottom &&
    rect1.right > Rect2.left &&
    rect1.bottom > Rect2.top
    )
}

function handleLose(){
  setDinoLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, {once :true})
    startScreen.classList.remove("hide")
    gameWheel.classList.remove("hide")
  },1000)
}


function showSettings() {
  startScreen.classList.add("hide")
  gameWheel.classList.add("hide")
  gameSettings.classList.remove("hide")
}


function closeSettings() {
  gameSettings.classList.add("hide")
  startScreen.classList.remove("hide")
  gameWheel.classList.remove("hide")
}

function checkSettings() {
  if (toggleCactus.checked) {
    document.querySelectorAll("[data-cactus]").forEach(cactus =>
    cactus.remove()
  )}
  if (toggleMeteor.checked) {
    document.querySelectorAll("[data-meteor]").forEach(meteor =>
    meteor.remove()
    )
  }
  if( borderMode.checked)  {
    isEasy = true
    dinoElem.classList.add("border")
  } else {
    isEasy = false
    dinoElem.classList.remove("border")
  };
}
