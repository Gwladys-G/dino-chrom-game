const dinoElem = document.querySelector('[data-dino]')
const JUMP_SPEED = .45
const GRAVITY = .011
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
export function setUpDino(){
  console.log('setupDino');
  isJumping = false

}
export function updateDino(delta, speedScale){
// console.log('updatedino');
  handleRun()
  handleJump()
}
