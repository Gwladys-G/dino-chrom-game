import { setupGround, updateGround } from './ground.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30

const worldElem = document.querySelector('[data-world]');

setPixelToWorldScale()
window.addEventListener("resize",setPixelToWorldScale)
document.addEventListener("keydown", handleStart, {once: true})


let lastTime
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime
  // console.log(delta)
  updateGround(delta, 1)

  lastTime = time
  window.requestAnimationFrame(update)
}


function handleStart(){
  lastTime = null
  setupGround()
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
