import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = .05
const METEOR_INTERVAL_MIN = 5000
const METEOR_INTERVAL_MAX = 10000
const worldElem = document.querySelector('[data-world]')



let nextMeteorTime

export function setUpMeteor(){
  nextMeteorTime = METEOR_INTERVAL_MIN
  document.querySelectorAll("[data-meteor]").forEach(meteor =>
    meteor.remove()
    )
}

export function updateMeteor(delta, speedScale){
  document.querySelectorAll('[data-meteor]').forEach(meteor => {
    incrementCustomProperty(meteor, "--left", delta * speedScale * SPEED * - 1)

    if (getCustomProperty(meteor, "--left") <= -100){
      meteor.remove()
    }
  })

  if (nextMeteorTime <= 0){
    createMeteor()
    nextMeteorTime = randomNumberBetween(METEOR_INTERVAL_MIN,METEOR_INTERVAL_MAX / speedScale)
  }
  nextMeteorTime -= delta
}


function createMeteor(){
  const meteor = document.createElement("img")
  meteor.dataset.meteor = true
  meteor.src = "imgs/meteor.png"
  meteor.classList.add("meteor")
  setCustomProperty(meteor, "--left", 100)
  worldElem.append(meteor)
}

function randomNumberBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getMeteorRecs(){
  return [...document.querySelectorAll("[data-meteor]")].map(meteor => {
    return meteor.getBoundingClientRect()
  })

}
